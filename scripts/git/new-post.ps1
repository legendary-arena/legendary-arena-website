<#
.SYNOPSIS
    Create a new blog post from the Hugo archetype with the correct
    date-prefixed filename and open it for editing.

.DESCRIPTION
    Wrapper around `hugo new posts/...` that enforces the slug
    convention from `docs/04-CONTENT-CONVENTIONS.md` §Slugs:
    `YYYY-MM-DD-<kebab-case-slug>.md`. Front-matter is populated from
    `archetypes/posts.md`.

    Pairs with the `POST:` commit lane defined in
    `docs/ai/REFERENCE/01.3-commit-hygiene.md` §New blog post.

.PARAMETER Slug
    Kebab-case slug without date prefix or .md extension. The script
    normalizes the slug (lowercase, spaces -> hyphens, strips invalid
    characters) and prepends today's date.

.PARAMETER Date
    Optional explicit date (YYYY-MM-DD). Defaults to today.

.PARAMETER NoEdit
    Skip opening the new file in $env:EDITOR / VS Code.

.EXAMPLE
    pwsh scripts/git/new-post.ps1 -Slug "trail-running-shoes"
    # Creates content/posts/<today>-trail-running-shoes.md
    # Opens it in your editor.

.EXAMPLE
    pwsh scripts/git/new-post.ps1 -Slug "summer-sale" -Date 2026-06-01 -NoEdit
    # Creates content/posts/2026-06-01-summer-sale.md without opening.
#>
param(
    [Parameter(Mandatory)][string]$Slug,
    [string]$Date,
    [switch]$NoEdit
)

$ErrorActionPreference = 'Stop'

$repoRoot = git rev-parse --show-toplevel 2>$null
if (-not $repoRoot) {
    Write-Error "Not inside a Git repository."
    exit 1
}

# Normalize slug: lowercase, spaces/underscores -> hyphens, strip anything
# outside [a-z0-9-], collapse repeated hyphens, trim hyphens.
$normalized = $Slug.ToLowerInvariant()
$normalized = $normalized -replace '[\s_]+', '-'
$normalized = $normalized -replace '[^a-z0-9-]', ''
$normalized = $normalized -replace '-+', '-'
$normalized = $normalized.Trim('-')

if (-not $normalized) {
    Write-Error "Slug normalized to empty string. Provide alphanumeric/kebab input."
    exit 1
}

if (-not $Date) {
    $Date = (Get-Date).ToString('yyyy-MM-dd')
}
if ($Date -notmatch '^\d{4}-\d{2}-\d{2}$') {
    Write-Error "Date must be YYYY-MM-DD. Got: $Date"
    exit 1
}

$relPath = "posts/$Date-$normalized.md"
$absPath = Join-Path $repoRoot "content/$relPath"

if (Test-Path $absPath) {
    Write-Error "Post already exists: $absPath"
    exit 1
}

$hugo = Get-Command hugo -ErrorAction SilentlyContinue
if (-not $hugo) {
    Write-Error "hugo not found in PATH. Install Hugo or use the Hugo extended binary in the repo."
    exit 1
}

Push-Location $repoRoot
try {
    Write-Host "Creating post from archetype: $relPath" -ForegroundColor Cyan
    & hugo new $relPath
    if ($LASTEXITCODE -ne 0) {
        Write-Error "hugo new failed (exit $LASTEXITCODE)."
        exit 1
    }
}
finally {
    Pop-Location -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Created: $absPath" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Fill in title, description, tags, categories in front-matter."
Write-Host "  2. Write the post body."
Write-Host "  3. Place any images under static/images/posts/$normalized/ (see 04-CONTENT-CONVENTIONS.md §Images)."
Write-Host "  4. Commit with the POST: lane:"
Write-Host "       pwsh scripts/git/wp-commit.ps1 -Files `"content/$relPath`" -Message `"POST: $Date — <summary>`"" -ForegroundColor Gray
Write-Host ""

if (-not $NoEdit) {
    $editor = $env:EDITOR
    if (-not $editor) {
        $code = Get-Command code -ErrorAction SilentlyContinue
        if ($code) { $editor = 'code' }
    }
    if ($editor) {
        Write-Host "Opening in $editor..." -ForegroundColor DarkGray
        & $editor $absPath
    } else {
        Write-Host "No editor found (set `$env:EDITOR or install VS Code 'code' CLI to auto-open)." -ForegroundColor Yellow
    }
}
