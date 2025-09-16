const fs = require('fs');
const path = require('path');

// Helper function to update a file
function updateFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return 0;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let totalReplacements = 0;
    
    replacements.forEach(replacement => {
        const beforeCount = (content.match(new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        content = content.replaceAll(replacement.from, replacement.to);
        if (beforeCount > 0) {
            console.log(`${path.basename(filePath)}: Replaced ${beforeCount} occurrences: ${replacement.from} -> ${replacement.to}`);
            totalReplacements += beforeCount;
        }
    });
    
    if (totalReplacements > 0) {
        fs.writeFileSync(filePath, content);
    }
    
    return totalReplacements;
}

// Define replacement mappings
const replacements = [
    // Logo images
    { from: '/Images/logo/ultra-flex-200x167 (1).png', to: '/Images/logo/ultraflex-logo' },
    { from: '/Images/ultra-flex-200x167.webp', to: '/Images/logo/ultraflex-logo' },
    
    // Location images from carousel and welcome pages
    { from: '/Images/westleeds/UFG (100) (2).jpg', to: '/Images/westleeds/gym-in-westleeds' },
    { from: "/Images/westleeds/UFG (100) (2).jpg", to: '/Images/westleeds/gym-in-westleeds' },
    
    { from: '/Images/northleeds/DSC07392 (1).jpg', to: '/Images/northleeds/gym-in-northleeds' },
    { from: "/Images/northleeds/DSC07392 (1).jpg", to: '/Images/northleeds/gym-in-northleeds' },
    
    { from: '/Images/normanton/IMG_(61) (1).jpg', to: '/Images/normanton/gym-in-normanton' },
    { from: "/Images/normanton/IMG_(61) (1).jpg", to: '/Images/normanton/gym-in-normanton' },
    
    { from: '/Images/rotherham/IMG (19) (4).jpg', to: '/Images/rotherham/gym-in-rotherham' },
    { from: "/Images/rotherham/IMG (19) (4).jpg", to: '/Images/rotherham/gym-in-rotherham' },
    
    { from: '/Images/york/ForGallery/DSC07349.jpg', to: '/Images/york/ForGallery/gym-in-york-6' },
    { from: "/Images/york/ForGallery/DSC07349.jpg", to: '/Images/york/ForGallery/gym-in-york-6' },
    
    { from: '/Images/hull/IMG (19) (5).jpg', to: '/Images/hull/gym-in-hull-22' },
    { from: "/Images/hull/IMG (19) (5).jpg", to: '/Images/hull/gym-in-hull-22' },
];

// List of files to update
const filesToUpdate = [
    '../resources/js/components/ui/Footer.tsx',
    '../resources/js/components/ui/Navbar.tsx',
    '../resources/js/sections/HomepageCarousel.tsx',
    '../resources/js/pages/Welcome.tsx'
];

let totalReplacements = 0;

console.log('Updating frontend component image references...\n');

filesToUpdate.forEach(filePath => {
    const count = updateFile(filePath, replacements);
    totalReplacements += count;
});

console.log(`\nBulk replacement complete! Total replacements: ${totalReplacements}`);
console.log('Frontend components have been updated with WebP image paths.');