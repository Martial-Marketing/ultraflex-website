const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing images
const sourceDir = path.join(__dirname, '..', 'public', 'Images');
const logFile = path.join(__dirname, 'conversion-log.txt');
const mappingFile = path.join(__dirname, 'image-mapping.txt');

// Location mapping
const locationMap = {
    'westleeds': 'westleeds',
    'northleeds': 'northleeds', 
    'westlondon': 'westlondon',
    'athens': 'athens',
    'derby': 'derby',
    'durham': 'durham',
    'hull': 'hull',
    'lincoln': 'lincoln',
    'normanton': 'normanton',
    'rotherham': 'rotherham',
    'york': 'york'
};

// Function to generate SEO-friendly filename
function getSeoFilename(originalPath, locationName) {
    const filename = path.parse(originalPath).name;
    const directory = path.dirname(originalPath);
    
    // Determine if it's gym/exercise/equipment image based on directory or filename
    if (directory.includes('ForGallery') || directory.includes('newimages') || 
        filename.includes('DSC') || filename.includes('processed') || filename.includes('original')) {
        return `gym-in-${locationName}`;
    } else if (filename.includes('workout') || filename.includes('exercise') || filename.includes('training')) {
        return `exercise-in-${locationName}`;
    } else if (filename.includes('equipment') || filename.includes('machine') || filename.includes('MultiStation')) {
        return `equipment-in-${locationName}`;
    } else {
        return `gym-in-${locationName}`;
    }
}

// Function to convert image to WebP
async function convertToWebP(inputFile, outputFile) {
    try {
        await sharp(inputFile)
            .webp({ quality: 85 })
            .toFile(outputFile);
        
        console.log(`✅ Converted: ${inputFile} -> ${outputFile}`);
        fs.appendFileSync(logFile, `SUCCESS: ${inputFile} -> ${outputFile}\n`);
        return true;
    } catch (error) {
        console.log(`❌ Failed: ${inputFile} - ${error.message}`);
        fs.appendFileSync(logFile, `FAILED: ${inputFile} - ${error.message}\n`);
        return false;
    }
}

// Function to get all image files recursively
function getImageFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            getImageFiles(fullPath, files);
        } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Main conversion function
async function convertImages() {
    // Initialize log files
    fs.writeFileSync(logFile, `Image Conversion Log - ${new Date()}\n${'='.repeat(50)}\n`);
    fs.writeFileSync(mappingFile, `Original Image -> New WebP Image\n${'='.repeat(50)}\n`);
    
    let converted = 0;
    let failed = 0;
    let imageCounter = {};
    
    console.log('🔍 Starting image conversion process...');
    
    // Process location-specific images
    for (const [location, locationName] of Object.entries(locationMap)) {
        const locationDir = path.join(sourceDir, location);
        
        if (fs.existsSync(locationDir)) {
            console.log(`📂 Processing location: ${location}`);
            
            const imageFiles = getImageFiles(locationDir);
            
            for (const imageFile of imageFiles) {
                const seoName = getSeoFilename(imageFile, locationName);
                
                // Add counter to avoid duplicate names
                const key = `${locationName}-${seoName}`;
                imageCounter[key] = (imageCounter[key] || 0) + 1;
                
                const finalName = imageCounter[key] > 1 ? 
                    `${seoName}-${imageCounter[key]}` : seoName;
                
                const outputFile = path.join(path.dirname(imageFile), `${finalName}.webp`);
                
                // Add to mapping file
                fs.appendFileSync(mappingFile, `${imageFile} -> ${outputFile}\n`);
                
                if (await convertToWebP(imageFile, outputFile)) {
                    converted++;
                } else {
                    failed++;
                }
            }
        }
    }
    
    // Process general images (newimages, workout, nutritionn, etc.)
    const generalDirs = ['newimages', 'workout', 'nutritionn', 'Clothing', 'logo'];
    
    for (const dirName of generalDirs) {
        const generalDir = path.join(sourceDir, dirName);
        
        if (fs.existsSync(generalDir)) {
            console.log(`📂 Processing general directory: ${dirName}`);
            
            const imageFiles = getImageFiles(generalDir);
            
            for (const imageFile of imageFiles) {
                let seoName;
                
                if (dirName === 'workout') {
                    seoName = 'workout-exercise';
                } else if (dirName === 'nutritionn') {
                    seoName = 'nutrition-guide';
                } else if (dirName === 'Clothing') {
                    seoName = 'ultraflex-clothing';
                } else if (dirName === 'logo') {
                    seoName = 'ultraflex-logo';
                } else {
                    // For newimages, determine location from subdirectory
                    const subDir = path.basename(path.dirname(imageFile));
                    const locationName = subDir.toLowerCase().replace(/\s+/g, '');
                    seoName = getSeoFilename(imageFile, locationName);
                }
                
                // Add counter to avoid duplicate names
                const key = `general-${seoName}`;
                imageCounter[key] = (imageCounter[key] || 0) + 1;
                
                const finalName = imageCounter[key] > 1 ? 
                    `${seoName}-${imageCounter[key]}` : seoName;
                
                const outputFile = path.join(path.dirname(imageFile), `${finalName}.webp`);
                
                // Add to mapping file
                fs.appendFileSync(mappingFile, `${imageFile} -> ${outputFile}\n`);
                
                if (await convertToWebP(imageFile, outputFile)) {
                    converted++;
                } else {
                    failed++;
                }
            }
        }
    }
    
    console.log('\n🎉 Conversion complete!');
    console.log(`📈 Converted: ${converted} images`);
    console.log(`❌ Failed: ${failed} images`);
    console.log(`📝 Check logs: ${logFile} and ${mappingFile}`);
}

// Run the conversion
convertImages().catch(console.error);