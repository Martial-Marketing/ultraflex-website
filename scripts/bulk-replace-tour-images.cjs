const fs = require('fs');

// Read the TourController file
const filePath = '../app/Http/Controllers/TourController.php';
let content = fs.readFileSync(filePath, 'utf8');

// Define replacement mappings based on our conversion results
const replacements = [
    // York
    { from: '/Images/york/ForGallery/DSC07349.jpg', to: '/Images/york/ForGallery/gym-in-york-6' },
    { from: '/Images/york/ForGallery/DSC07341.jpg', to: '/Images/york/ForGallery/gym-in-york-3' },
    { from: '/Images/york/ForGallery/DSC07345.jpg', to: '/Images/york/ForGallery/gym-in-york-4' },
    { from: '/Images/york/ForGallery/DSC07346.jpg', to: '/Images/york/ForGallery/gym-in-york-5' },
    { from: '/Images/york/ForGallery/DSC07350.jpg', to: '/Images/york/ForGallery/gym-in-york-7' },
    { from: '/Images/york/ForGallery/DSC07359 (1).jpg', to: '/Images/york/ForGallery/gym-in-york-8' },
    { from: '/Images/york/ForGallery/DSC07359.jpg', to: '/Images/york/ForGallery/gym-in-york-9' },
    { from: '/Images/york/ForGallery/DSC07371.jpg', to: '/Images/york/ForGallery/gym-in-york-10' },
    { from: '/Images/york/ForGallery/DSC07372.jpg', to: '/Images/york/ForGallery/gym-in-york-11' },
    
    // Hull
    { from: '/Images/hull/IMG (19) (5).jpg', to: '/Images/hull/gym-in-hull-22' },
    
    // Durham
    { from: '/Images/durham/8 Section MultiStation.jpg', to: '/Images/durham/equipment-in-durham' },
    
    // Derby
    { from: '/Images/derby/ForGallery/DSC07346.jpg', to: '/Images/derby/ForGallery/gym-in-derby-6' },
    { from: '/Images/derby/ForGallery/DSC07341.jpg', to: '/Images/derby/ForGallery/gym-in-derby-4' },
    { from: '/Images/derby/ForGallery/DSC07345.jpg', to: '/Images/derby/ForGallery/gym-in-derby-5' },
    { from: '/Images/derby/ForGallery/DSC07349.jpg', to: '/Images/derby/ForGallery/gym-in-derby-7' },
    { from: '/Images/derby/ForGallery/DSC07350.jpg', to: '/Images/derby/ForGallery/gym-in-derby-8' },
    { from: '/Images/derby/ForGallery/DSC07359 (1).jpg', to: '/Images/derby/ForGallery/gym-in-derby-9' },
    { from: '/Images/derby/ForGallery/DSC07359.jpg', to: '/Images/derby/ForGallery/gym-in-derby-10' },
    { from: '/Images/derby/ForGallery/DSC07371.jpg', to: '/Images/derby/ForGallery/gym-in-derby-11' },
    { from: '/Images/derby/ForGallery/DSC07372.jpg', to: '/Images/derby/ForGallery/gym-in-derby-12' },
    
    // Athens
    { from: '/Images/athens/HeroBG/DSC07413.jpg', to: '/Images/athens/HeroBG/gym-in-athens-16' },
    { from: '/Images/athens/ForGallery/DSC07341.jpg', to: '/Images/athens/ForGallery/gym-in-athens-4' },
    { from: '/Images/athens/ForGallery/DSC07345.jpg', to: '/Images/athens/ForGallery/gym-in-athens-5' },
    { from: '/Images/athens/ForGallery/DSC07346.jpg', to: '/Images/athens/ForGallery/gym-in-athens-6' },
    { from: '/Images/athens/ForGallery/DSC07349.jpg', to: '/Images/athens/ForGallery/gym-in-athens-7' },
    { from: '/Images/athens/ForGallery/DSC07350.jpg', to: '/Images/athens/ForGallery/gym-in-athens-8' },
    { from: '/Images/athens/ForGallery/DSC07359 (1).jpg', to: '/Images/athens/ForGallery/gym-in-athens-9' },
    { from: '/Images/athens/ForGallery/DSC07359.jpg', to: '/Images/athens/ForGallery/gym-in-athens-10' },
    { from: '/Images/athens/ForGallery/DSC07371.jpg', to: '/Images/athens/ForGallery/gym-in-athens-11' },
    { from: '/Images/athens/ForGallery/DSC07372.jpg', to: '/Images/athens/ForGallery/gym-in-athens-12' },
    
    // Lincoln
    { from: '/Images/lincoln/ForGallery/DSC07350.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-7' },
    { from: '/Images/lincoln/ForGallery/DSC07341.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-3' },
    { from: '/Images/lincoln/ForGallery/DSC07345.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-4' },
    { from: '/Images/lincoln/ForGallery/DSC07346.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-5' },
    { from: '/Images/lincoln/ForGallery/DSC07349.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-6' },
    { from: '/Images/lincoln/ForGallery/DSC07359 (1).jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-8' },
    { from: '/Images/lincoln/ForGallery/DSC07359.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-9' },
    { from: '/Images/lincoln/ForGallery/DSC07371.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-10' },
    { from: '/Images/lincoln/ForGallery/DSC07372.jpg', to: '/Images/lincoln/ForGallery/gym-in-lincoln-11' },
    
    // West London
    { from: '/Images/westlondon/DSC06653-2.jpg', to: '/Images/westlondon/gym-in-westlondon' },
    { from: '/Images/westlondon/DSC06686.jpg', to: '/Images/westlondon/gym-in-westlondon-2' },
    { from: '/Images/westlondon/DSC06788-2.jpg', to: '/Images/westlondon/gym-in-westlondon-3' },
    { from: '/Images/westlondon/DSC07359 (1).jpg', to: '/Images/westlondon/gym-in-westlondon-4' },
    { from: '/Images/westlondon/DSC07359.jpg', to: '/Images/westlondon/gym-in-westlondon-5' },
    { from: '/Images/westlondon/DSC07371.jpg', to: '/Images/westlondon/gym-in-westlondon-6' },
    { from: '/Images/westlondon/DSC07372.jpg', to: '/Images/westlondon/gym-in-westlondon-7' },
    { from: '/Images/westlondon/GWAPOJAYJAY.png', to: '/Images/westlondon/gym-in-westlondon-8' },
    { from: '/Images/westlondon/WEST LONDON.png', to: '/Images/westlondon/gym-in-westlondon-9' },
    
    // West Leeds
    { from: '/Images/westleeds/UFG (100) (2).jpg', to: '/Images/westleeds/gym-in-westleeds' },
    
    // North Leeds
    { from: '/Images/northleeds/DSC07392 (1).jpg', to: '/Images/northleeds/gym-in-northleeds' },
    
    // Normanton
    { from: '/Images/normanton/IMG_(61) (1).jpg', to: '/Images/normanton/gym-in-normanton' },
    
    // Rotherham
    { from: '/Images/rotherham/IMG (19) (4).jpg', to: '/Images/rotherham/gym-in-rotherham' },
];

// Apply all replacements
let replacementCount = 0;
replacements.forEach(replacement => {
    const beforeCount = (content.match(new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    content = content.replaceAll(replacement.from, replacement.to);
    const afterCount = (content.match(new RegExp(replacement.to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (beforeCount > 0) {
        console.log(`Replaced ${beforeCount} occurrences: ${replacement.from} -> ${replacement.to}`);
        replacementCount += beforeCount;
    }
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content);

console.log(`\nBulk replacement complete! Total replacements: ${replacementCount}`);
console.log('TourController has been updated with WebP image paths.');