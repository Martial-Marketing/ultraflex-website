const fs = require('fs');
const path = require('path');

// Read the TourController file
const controllerPath = 'C:\\Projects\\ULTRAFLEX\\app\\Http\\Controllers\\TourController.php';
let content = fs.readFileSync(controllerPath, 'utf8');

// Define replacements for tour images that should have .webp extensions
const replacements = [
    // York tour
    {
        search: "'/Images/york/ForGallery/gym-in-york-6'",
        replace: "'/Images/york/ForGallery/gym-in-york-6.webp'"
    },
    
    // Hull tour
    {
        search: "'/Images/hull/gym-in-hull-22'",
        replace: "'/Images/hull/gym-in-hull-22.webp'"
    },
    
    // Durham tour
    {
        search: "'/Images/durham/equipment-in-durham'",
        replace: "'/Images/durham/equipment-in-durham.webp'"
    },
    
    // Derby tour
    {
        search: "'/Images/derby/ForGallery/gym-in-derby-6'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-6.webp'"
    },
    
    // Athens tour
    {
        search: "'/Images/athens/HeroBG/gym-in-athens-16'",
        replace: "'/Images/athens/HeroBG/gym-in-athens-16.webp'"
    },
    
    // Lincoln tour
    {
        search: "'/Images/lincoln/ForGallery/gym-in-lincoln-7'",
        replace: "'/Images/lincoln/ForGallery/gym-in-lincoln-7.webp'"
    },
    
    // West London tour
    {
        search: "'/Images/westlondon/gym-in-westlondon'",
        replace: "'/Images/westlondon/gym-in-westlondon.webp'"
    },
    
    // West Leeds tour
    {
        search: "'/Images/westleeds/gym-in-westleeds'",
        replace: "'/Images/westleeds/gym-in-westleeds.webp'"
    },
    
    // North Leeds tour
    {
        search: "'/Images/northleeds/gym-in-northleeds'",
        replace: "'/Images/northleeds/gym-in-northleeds.webp'"
    },
    
    // Normanton tour
    {
        search: "'/Images/normanton/gym-in-normanton'",
        replace: "'/Images/normanton/gym-in-normanton.webp'"
    },
    
    // Rotherham tour
    {
        search: "'/Images/rotherham/gym-in-rotherham'",
        replace: "'/Images/rotherham/gym-in-rotherham.webp'"
    }
];

// Apply replacements
let replacementCount = 0;
replacements.forEach(replacement => {
    const originalContent = content;
    content = content.replace(new RegExp(replacement.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement.replace);
    if (content !== originalContent) {
        const matches = (originalContent.match(new RegExp(replacement.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        replacementCount += matches;
        console.log(`✓ Replaced ${matches} occurrence(s) of: ${replacement.search}`);
    }
});

// Write the updated content back to the file
fs.writeFileSync(controllerPath, content, 'utf8');

console.log(`\n🎉 Total replacements made: ${replacementCount}`);
console.log(`✅ TourController.php updated with .webp extensions for all tour images!`);