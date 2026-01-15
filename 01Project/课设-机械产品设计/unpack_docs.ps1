Add-Type -AssemblyName System.IO.Compression.FileSystem

# Create output directories
[System.IO.Directory]::CreateDirectory("D:\NOTES\01Project\课设-机械产品设计\unpacked_template") | Out-Null
[System.IO.Directory]::CreateDirectory("D:\NOTES\01Project\课设-机械产品设计\unpacked_current") | Out-Null

# Use cmd to get file list
$output = cmd /c "cd /d D:\NOTES\01Project\课设-机械产品设计 && dir /b *.docx"
$files = $output -split "`n"

Write-Output "Files found: $($files.Count)"
foreach ($file in $files) {
    Write-Output "  $file"
}

if ($files.Count -ge 2) {
    # Unpack first file (template)
    $templatePath = "D:\NOTES\01Project\课设-机械产品设计\" + $files[0]
    Write-Output "`nUnpacking template: $templatePath"
    [System.IO.Compression.ZipFile]::ExtractToDirectory($templatePath, "D:\NOTES\01Project\课设-机械产品设计\unpacked_template")

    # Unpack second file (current)
    $currentPath = "D:\NOTES\01Project\课设-机械产品设计\" + $files[1]
    Write-Output "Unpacking current: $currentPath"
    [System.IO.Compression.ZipFile]::ExtractToDirectory($currentPath, "D:\NOTES\01Project\课设-机械产品设计\unpacked_current")

    Write-Output "`nUnpacking complete"
} else {
    Write-Output "Error: Need at least 2 .docx files"
}