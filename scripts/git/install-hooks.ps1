<#
.SYNOPSIS
    Installs commit-hygiene Git hooks for the marketing-site repository.

.DESCRIPTION
    Sets git core.hooksPath to .githooks/ so the repo-local hooks
    (pre-commit, commit-msg) are active. Run this once after cloning
    or whenever hooks are updated.

    The install is repo-local — it does not touch your global git
    config and does not affect other repositories on your machine.

.EXAMPLE
    pwsh scripts/git/install-hooks.ps1
#>

$ErrorActionPreference = 'Stop'
$repoRoot = git rev-parse --show-toplevel 2>$null

if (-not $repoRoot) {
    Write-Error "Not inside a Git repository. Run this from the legendary-arena-website repo root."
    exit 1
}

$hooksDir = Join-Path $repoRoot '.githooks'

if (-not (Test-Path $hooksDir)) {
    Write-Error "Hooks directory not found: $hooksDir"
    exit 1
}

# Verify hook files exist
$requiredHooks = @('pre-commit', 'commit-msg')
foreach ($hook in $requiredHooks) {
    $hookPath = Join-Path $hooksDir $hook
    if (-not (Test-Path $hookPath)) {
        Write-Error "Missing hook file: $hookPath"
        exit 1
    }
}

# Set core.hooksPath (repo-local, not global)
git config core.hooksPath .githooks
$currentPath = git config core.hooksPath

if ($currentPath -ne '.githooks') {
    Write-Error "Failed to set core.hooksPath. Current value: $currentPath"
    exit 1
}

Write-Host ""
Write-Host "Marketing-site commit hygiene hooks installed." -ForegroundColor Green
Write-Host ""
Write-Host "  Hooks directory: .githooks/"
Write-Host "  core.hooksPath:  $currentPath"
Write-Host ""
Write-Host "Installed hooks:" -ForegroundColor Cyan
foreach ($hook in $requiredHooks) {
    Write-Host "  - $hook"
}
Write-Host ""
Write-Host "Commit message format (enforced):" -ForegroundColor Cyan
Write-Host "  WP-NNN[a-z]?: <present-tense summary>   (site changes, WP work)"
Write-Host "  ROADMAP: <summary>                       (roadmap-only)"
Write-Host "  INFRA: <summary>                         (tooling, hooks, CI)"
Write-Host "  SPEC: <summary>                          (governance doc corrections)"
Write-Host ""
Write-Host "Full contract: docs/ai/REFERENCE/01.3-commit-hygiene.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "To bypass hooks in an emergency: git commit --no-verify" -ForegroundColor Yellow
Write-Host "  (Prohibited under normal operation — see 01.3 Emergency Override)" -ForegroundColor Yellow
Write-Host ""
