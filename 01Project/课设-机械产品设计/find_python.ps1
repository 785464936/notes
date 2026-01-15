# Try to find Python in common locations
$pythonPaths = @(
    "C:\Python3*\python.exe",
    "C:\Python*\python.exe",
    "C:\Program Files\Python*\python.exe",
    "C:\Program Files (x86)\Python*\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python*\python.exe"
)

$found = $false
foreach ($pattern in $pythonPaths) {
    $files = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue
    if ($files) {
        Write-Output "Found Python at: $($files[0].FullName)"
        $found = $true
        break
    }
}

if (-not $found) {
    Write-Output "Python not found in common locations"
}

# Also check if pip is available
try {
    $pipVersion = pip --version 2>&1
    Write-Output "Pip is available: $pipVersion"
} catch {
    Write-Output "Pip not available"
}