# PowerShell script to convert images to WebP format
# Requires: Install WebP tools from Google (cwebp.exe)

# Download WebP tools from: https://developers.google.com/speed/webp/download
# Extract and add to PATH or place cwebp.exe in this directory

$sourceDir = "public\Images"
$logFile = "conversion-log.txt"

# Function to convert image to WebP
function Convert-ToWebP {
    param(
        [string]$inputFile,
        [string]$outputFile
    )
    
    try {
        # Convert with 85% quality (good balance of size/quality)
        & cwebp -q 85 "$inputFile" -o "$outputFile"
        Write-Host "Converted: $inputFile -> $outputFile"
        Add-Content -Path $logFile -Value "SUCCESS: $inputFile -> $outputFile"
        return $true
    }
    catch {
        Write-Host "Failed: $inputFile"
        Add-Content -Path $logFile -Value "FAILED: $inputFile - $($_.Exception.Message)"
        return $false
    }
}

# Function to generate SEO-friendly filename
function Get-SeoFilename {
    param(
        [string]$originalPath,
        [string]$locationName
    )
    
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($originalPath)
    $directory = Split-Path $originalPath -Parent
    
    # Determine if it's gym/exercise/equipment image based on directory or filename
    if ($directory -match "ForGallery|newimages" -or $filename -match "DSC|processed|original") {
        return "gym-in-$locationName"
    }
    elseif ($filename -match "workout|exercise|training") {
        return "exercise-in-$locationName"
    }
    elseif ($filename -match "equipment|machine|MultiStation") {
        return "equipment-in-$locationName"
    }
    else {
        return "gym-in-$locationName"
    }
}

# Main conversion process
Write-Host "🚀 Starting WebP conversion process..."
Add-Content -Path $logFile -Value "WebP Conversion Started: $(Get-Date)"

# Get all image files
$imageExtensions = @("*.jpg", "*.jpeg", "*.png")
$allImages = @()

foreach ($ext in $imageExtensions) {
    $allImages += Get-ChildItem -Path $sourceDir -Filter $ext -Recurse
}

Write-Host "📊 Found $($allImages.Count) images to convert"

$converted = 0
$failed = 0

foreach ($image in $allImages) {
    # Extract location from path
    $relativePath = $image.FullName.Replace((Get-Location).Path + "\public\Images\", "")
    $locationName = ($relativePath -split "\\|/")[0].ToLower()
    
    # Generate SEO filename
    $seoName = Get-SeoFilename -originalPath $relativePath -locationName $locationName
    
    # Create unique filename if duplicate
    $counter = 1
    $finalSeoName = $seoName
    $outputDir = Split-Path $image.FullName -Parent
    
    while (Test-Path "$outputDir\$finalSeoName.webp") {
        $finalSeoName = "$seoName-$counter"
        $counter++
    }
    
    $outputPath = "$outputDir\$finalSeoName.webp"
    
    if (Convert-ToWebP -inputFile $image.FullName -outputFile $outputPath) {
        $converted++
        
        # Log the mapping for code updates
        Add-Content -Path "image-mapping.txt" -Value "$($image.FullName) -> $outputPath"
    }
    else {
        $failed++
    }
}

Write-Host "Conversion complete!"
Write-Host "Converted: $converted images"
Write-Host "Failed: $failed images"
Write-Host "Check logs: $logFile and image-mapping.txt"