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

# Check if cwebp is available
try {
    & cwebp -version | Out-Null
}
catch {
    Write-Host "Error: cwebp not found. Please install WebP tools and add to PATH."
    Write-Host "Download from: https://developers.google.com/speed/webp/download"
    exit 1
}

# Initialize log file
Clear-Content -Path $logFile -ErrorAction SilentlyContinue
Add-Content -Path $logFile -Value "Image Conversion Log - $(Get-Date)"
Add-Content -Path $logFile -Value "=" * 50

# Create image mapping file
$mappingFile = "image-mapping.txt"
Clear-Content -Path $mappingFile -ErrorAction SilentlyContinue
Add-Content -Path $mappingFile -Value "Original Image -> New WebP Image"
Add-Content -Path $mappingFile -Value "=" * 50

# Location mapping
$locationMap = @{
    "westleeds" = "westleeds"
    "northleeds" = "northleeds"
    "westlondon" = "westlondon"
    "athens" = "athens"
    "derby" = "derby"
    "durham" = "durham"
    "hull" = "hull"
    "lincoln" = "lincoln"
    "normanton" = "normanton"
    "rotherham" = "rotherham"
    "york" = "york"
}

$converted = 0
$failed = 0

foreach ($location in $locationMap.Keys) {
    $locationDir = Join-Path $sourceDir $location
    
    if (Test-Path $locationDir) {
        Write-Host "Processing location: $location"
        
        # Get all image files
        $imageFiles = Get-ChildItem -Path $locationDir -Recurse -Include "*.jpg", "*.jpeg", "*.png"
        
        foreach ($imageFile in $imageFiles) {
            $seoName = Get-SeoFilename -originalPath $imageFile.Name -locationName $location
            $outputFile = Join-Path $locationDir "$seoName.webp"
            
            # Add to mapping file
            Add-Content -Path $mappingFile -Value "$($imageFile.FullName) -> $outputFile"
            
            if (Convert-ToWebP -inputFile $imageFile.FullName -outputFile $outputFile) {
                $converted++
            } else {
                $failed++
            }
        }
    }
}

# Also process general images
$generalImages = Get-ChildItem -Path "$sourceDir\newimages" -Include "*.jpg", "*.jpeg", "*.png" -ErrorAction SilentlyContinue
foreach ($imageFile in $generalImages) {
    $seoName = "gym-equipment"
    $outputFile = Join-Path $imageFile.Directory "$seoName.webp"
    
    Add-Content -Path $mappingFile -Value "$($imageFile.FullName) -> $outputFile"
    
    if (Convert-ToWebP -inputFile $imageFile.FullName -outputFile $outputFile) {
        $converted++
    } else {
        $failed++
    }
}

Write-Host "Conversion complete!"
Write-Host "Converted: $converted images"
Write-Host "Failed: $failed images"
Write-Host "Check logs: $logFile and image-mapping.txt"