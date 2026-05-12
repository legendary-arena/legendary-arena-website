#requires -Version 7
<#
.SYNOPSIS
    Pre-drafting hygiene gate for the marketing repo (read-only).

.DESCRIPTION
    Runs the 5 checks documented in
    docs/ai/REFERENCE/01.0-pre-drafting-hygiene.md and emits a
    binary GO / STOP verdict before any new WP drafting begins.

    This script is READ-ONLY: it never runs `git pull`, never
    modifies branches, never deletes anything. It only reads state
    (status, fetch, ls-remote, gh pr list) and reports.

    Companion to docs/ai/REFERENCE/01.0-pre-drafting-hygiene.md.
    Run before opening any new WP drafting session in this repo.

.NOTES
    Exit codes:
      0 = GO (all checks passed)
      1 = STOP (at least one check failed)

    Expected runtime: ~5-15 seconds (network calls: git fetch + gh).
#>

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

# Configuration
$repoPath = 'C:\www\legendary-arena-com'
$expectedRemoteSubstring = 'legendary-arena/legendary-arena-website'

# ---------- Helpers ----------

function Fail($reason) {
    Write-Host ''
    Write-Host 'STATUS: STOP' -ForegroundColor Red
    Write-Host "REASON: $reason" -ForegroundColor Red
    Write-Host 'EXIT_CODE: 1' -ForegroundColor Red
    Write-Host ''
    Pop-Location -ErrorAction SilentlyContinue
    exit 1
}

function Pass($msg) {
    Write-Host "  [PASS] $msg" -ForegroundColor Green
}

function Info($msg) {
    Write-Host "  [INFO] $msg" -ForegroundColor Cyan
}

function Section($name) {
    Write-Host ''
    Write-Host "=== $name ===" -ForegroundColor Yellow
}

function Assert-LastExit($context) {
    if ($LASTEXITCODE -ne 0) {
        Fail "Command failed in $context (exit $LASTEXITCODE)"
    }
}

# ---------- Setup ----------

# Tool availability pre-check (prevents confusing downstream failures)
foreach ($cmd in @('git', 'gh', 'node')) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Fail "Required tool not found in PATH: $cmd. Install and re-run."
    }
}

if (-not (Test-Path $repoPath)) {
    Fail "Repo path not found: $repoPath"
}

Push-Location $repoPath
try {
    Section 'Pre-Drafting Hygiene Gate (read-only)'
    Write-Host "Repo: $repoPath"

    # ---------- Check 0: Repository identity ----------
    Section 'Check 0: Repository identity (must be marketing repo)'

    # Normalize both expected and actual paths (handles trailing slashes,
    # symlinks, mixed-separator paths). Case-insensitive on Windows by default.
    $normalizedExpected = [IO.Path]::GetFullPath($repoPath).TrimEnd('\')

    # 0a: cwd matches expected path (normalized)
    $normalizedCurrent = [IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\')
    if ($normalizedCurrent -ne $normalizedExpected) {
        Fail "Wrong working directory.`n  Expected: $normalizedExpected`n  Actual:   $normalizedCurrent"
    }

    # 0b: we're actually inside a git working tree (not just a path that happens to exist)
    git rev-parse --is-inside-work-tree 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Fail 'Not inside a git repository (git rev-parse failed).'
    }

    # 0c: git root matches expected (catches nested-repo execution, worktree path mismatch, folder aliasing)
    $gitRoot = git rev-parse --show-toplevel 2>$null
    Assert-LastExit 'git rev-parse --show-toplevel'
    $normalizedGitRoot = [IO.Path]::GetFullPath($gitRoot).TrimEnd('\')
    if ($normalizedGitRoot -ne $normalizedExpected) {
        Fail "Git root mismatch.`n  Expected: $normalizedExpected`n  Actual:   $normalizedGitRoot"
    }

    # 0d: origin remote points at the marketing repo
    $originUrl = git remote get-url origin 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $originUrl) {
        Fail 'No origin remote configured.'
    }
    if ($originUrl -notmatch $expectedRemoteSubstring) {
        Fail "Origin does not match marketing repo.`n  Expected substring: $expectedRemoteSubstring`n  Actual origin: $originUrl"
    }

    # 0e: structural sanity — key marketing-repo file is present
    # (catches: stale checkout, accidental file deletion, wrong fork without the doc tree)
    if (-not (Test-Path 'docs/03-ROADMAP.md')) {
        Fail 'Expected marketing repo structure not found (docs/03-ROADMAP.md missing). Possible stale checkout or wrong fork.'
    }

    Pass "Repository identity verified ($originUrl)"

    # ---------- Check 1: Working tree clean + stable ----------
    Section 'Check 1: Working tree clean and stable'

    # 1a: No modifications, no untracked
    $porcelain = git status --porcelain
    Assert-LastExit 'git status --porcelain'
    if ($porcelain) {
        Fail "Working tree not clean. Commit/stash/discard before drafting:`n$porcelain"
    }

    # 1b: HEAD on a named branch (not detached)
    $currentBranch = git symbolic-ref --short HEAD 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $currentBranch) {
        Fail 'HEAD is detached. Switch to a named branch before drafting.'
    }

    # 1c: No rebase/merge/cherry-pick in progress
    # State-file detection is deterministic and locale-safe
    $gitDir = git rev-parse --git-dir
    Assert-LastExit 'git rev-parse --git-dir'

    $inProgress = @()
    if (Test-Path (Join-Path $gitDir 'rebase-merge')) { $inProgress += 'interactive rebase' }
    if (Test-Path (Join-Path $gitDir 'rebase-apply')) { $inProgress += 'rebase' }
    if (Test-Path (Join-Path $gitDir 'MERGE_HEAD'))   { $inProgress += 'merge' }
    if (Test-Path (Join-Path $gitDir 'CHERRY_PICK_HEAD')) { $inProgress += 'cherry-pick' }
    if (Test-Path (Join-Path $gitDir 'REVERT_HEAD'))  { $inProgress += 'revert' }
    if (Test-Path (Join-Path $gitDir 'BISECT_LOG'))   { $inProgress += 'bisect' }

    if ($inProgress.Count -gt 0) {
        Fail "Git operation in progress: $($inProgress -join ', '). Complete or abort before drafting."
    }

    Pass "Working tree clean; on branch '$currentBranch'; no operations in progress"

    # ---------- Check 2: Canonical synced with origin (read-only) ----------
    Section 'Check 2: Canonical synced with origin'

    git fetch origin main 2>&1 | Out-Null
    Assert-LastExit 'git fetch origin main'

    # left-right count: "ahead\tbehind" relative to origin/main
    $aheadBehind = git rev-list --left-right --count 'HEAD...origin/main'
    Assert-LastExit 'git rev-list --left-right --count'

    $parts = $aheadBehind -split '\s+'
    $commitsAhead = [int]$parts[0]
    $commitsBehind = [int]$parts[1]

    if ($commitsAhead -gt 0 -and $commitsBehind -gt 0) {
        Fail "DIVERGED: local is $commitsAhead ahead and $commitsBehind behind origin/main. Resolve before drafting (do NOT --rebase or --merge into draft state)."
    }
    if ($commitsBehind -gt 0) {
        Fail "Local is $commitsBehind commit(s) behind origin/main. Run 'git pull --ff-only origin main' to sync, then re-run this gate."
    }
    if ($commitsAhead -gt 0) {
        Info "Local is $commitsAhead commit(s) ahead of origin/main (intentional local work). Drafting OK if you plan to push these; otherwise resolve first."
    }

    Pass "Local sync verified: ahead=$commitsAhead, behind=$commitsBehind"

    # ---------- Check 3: Claude branch hygiene ----------
    Section 'Check 3: Claude branch hygiene'

    $rawBranches = git branch --list 'claude/*'
    Assert-LastExit 'git branch --list claude/*'

    $claudeBranches = @($rawBranches | ForEach-Object {
        ($_.Trim() -replace '^[\*\+\s]+', '')
    } | Where-Object { $_ -like 'claude/*' })
    $branchCount = $claudeBranches.Count

    # Unmerged-work exception: ANY branch ahead of origin/main with no merged PR = FAIL
    $unmergedBranches = @()
    foreach ($branch in $claudeBranches) {
        $ahead = [int](git rev-list --count "origin/main..$branch" 2>$null)
        if ($ahead -gt 0) {
            # Check for a merged PR with this branch as head.
            # PowerShell does NOT throw on native command non-zero exit, so we
            # check $LASTEXITCODE explicitly. A gh CLI failure here must NOT
            # be silently treated as "no merged PR" — that would mask
            # infrastructure failure as governance failure (false STOP).
            $mergedCountRaw = gh pr list --state merged --search "head:$branch" --json number --jq 'length' 2>$null
            if ($LASTEXITCODE -ne 0) {
                Fail "GitHub CLI query failed for branch '$branch'. Ensure 'gh' is authenticated ('gh auth status'). This is an infrastructure failure, not a governance failure — fix gh, then re-run the gate."
            }
            $mergedCount = if ($mergedCountRaw) { [int]$mergedCountRaw } else { 0 }
            if ($mergedCount -eq 0) {
                $unmergedBranches += "$branch ($ahead commit(s) ahead, no merged PR)"
            }
        }
    }

    if ($unmergedBranches.Count -gt 0) {
        Fail "claude/* branch(es) with unmerged work:`n  $($unmergedBranches -join "`n  ")`nClose via the close-ritual (see 01.0 §Closing a claude/* branch) before drafting."
    }

    # Tiered threshold rule
    if ($branchCount -ge 5) {
        Fail "$branchCount accumulated claude/* branches (threshold: 5). Run 'node scripts/prune-empty-claude-branch.mjs --execute' before drafting."
    }

    Pass "$branchCount claude/* branch(es) present; no unmerged work"

    # ---------- Check 4: Open PR overlap on governance surfaces ----------
    Section 'Check 4: Open PR overlap'

    # Sensitive paths split into exact files vs directory prefixes
    $sensitiveFiles = @(
        'docs/03-ROADMAP.md',
        'docs/01-VISION.md',
        'docs/STATUS.md'
    )
    $sensitiveDirs = @(
        'docs/ai/work-packets/'
    )

    $prsJson = ''
    try {
        $prsJson = gh pr list --state open --json number,title,headRefName 2>$null
    } catch {
        $prsJson = ''
    }

    if (-not $prsJson -or $prsJson -eq '[]') {
        Pass 'No open PRs'
    } else {
        $openPrs = @($prsJson | ConvertFrom-Json)
        Info "$($openPrs.Count) open PR(s) — computing file overlap..."

        # HashSet deduplicates if a single PR triggers multiple matches per file
        # (e.g., file matches both an exact-file pattern AND a dir prefix)
        $overlapSet = New-Object 'System.Collections.Generic.HashSet[string]'

        foreach ($pr in $openPrs) {
            $branch = $pr.headRefName
            git fetch origin $branch 2>&1 | Out-Null
            if ($LASTEXITCODE -ne 0) {
                Info "  Skipping PR #$($pr.number) (couldn't fetch $branch)"
                continue
            }
            $changedFiles = git diff "origin/main...origin/$branch" --name-only 2>$null
            if ($LASTEXITCODE -ne 0) { continue }

            foreach ($file in $changedFiles) {
                $hit = $false

                # Exact file match
                if ($file -in $sensitiveFiles) { $hit = $true }

                # Directory prefix match (path-segment safe via explicit trailing slash)
                foreach ($dir in $sensitiveDirs) {
                    if ($file.StartsWith($dir)) { $hit = $true }
                }

                if ($hit) {
                    [void]$overlapSet.Add("PR #$($pr.number) ($($pr.title)) -> $file")
                }
            }
        }

        if ($overlapSet.Count -gt 0) {
            $overlapList = ($overlapSet | Sort-Object) -join "`n  "
            Fail "Open PR(s) overlap drafting surfaces:`n  $overlapList`nMerge or wait before drafting (or fold the PR's work into your draft if scope is genuinely shared)."
        }
        Pass 'No file overlap with open PRs'
    }

    # ---------- Check 5: Single-session invariant ----------
    Section 'Check 5: Single-session invariant'

    $worktreePorcelain = git worktree list --porcelain
    Assert-LastExit 'git worktree list --porcelain'

    $claudeWorktreeCount = ($worktreePorcelain | Select-String '^branch refs/heads/claude/').Count

    if ($claudeWorktreeCount -gt 1) {
        $claudeWtList = git worktree list | Select-String 'claude/' | ForEach-Object { '  ' + $_.ToString().Trim() }
        Fail "Multiple active claude/* worktrees ($claudeWorktreeCount detected):`n$($claudeWtList -join "`n")`nClose all but one via the close-ritual before drafting."
    }

    Pass "$claudeWorktreeCount active claude/* worktree(s); single-session invariant holds"

    # ---------- All checks passed ----------
    Section 'Verdict'
    Write-Host 'STATUS: GO' -ForegroundColor Green
    Write-Host 'EXIT_CODE: 0' -ForegroundColor Green
    Write-Host 'All hygiene checks passed. Safe to begin WP drafting.'
    Write-Host ''

    # Baseline capture for the WP body
    $sha = git rev-parse HEAD
    Write-Host 'Baseline SHA (record in WP §Context or §Assumes):' -ForegroundColor Gray
    Write-Host "  $sha" -ForegroundColor White
    Write-Host ''
}
finally {
    Pop-Location -ErrorAction SilentlyContinue
}

exit 0
