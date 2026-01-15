# Remove all drop-shadow glow effects from TSX files

$files = Get-ChildItem -Path 'c:\Projects\ULTRAFLEX\resources\js' -Filter '*.tsx' -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $updated = $content
    
    # Remove all drop-shadow-[...] patterns
    $updated = $updated -replace 'drop-shadow-\[0_0_\d+px_rgba\(\d+,\d+,\d+,[\d.]+\)\]\s*', ''
    $updated = $updated -replace 'drop-shadow-\[0_\d+_\d+px_rgba\(\d+,\d+,\d+,[\d.]+\)\]\s*', ''
    $updated = $updated -replace 'drop-shadow-lg\s*', ''
    $updated = $updated -replace 'drop-shadow\s*', ''
    
    if ($content -ne $updated) {
        Set-Content -Path $file.FullName -Value $updated -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Glow effects removed from all TSX files"
