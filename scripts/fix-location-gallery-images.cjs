const fs = require('fs');
const path = require('path');

// Read the LocationController file
const controllerPath = 'C:\\Projects\\ULTRAFLEX\\app\\Http\\Controllers\\LocationController.php';
let content = fs.readFileSync(controllerPath, 'utf8');

// Define replacements for gallery images that should have .webp extensions
const replacements = [
    // Normanton
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton.webp'"
    },
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton-2'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton-2.webp'"
    },
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton-3'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton-3.webp'"
    },
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton-4'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton-4.webp'"
    },
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton-5'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton-5.webp'"
    },
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton-6'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton-6.webp'"
    },
    {
        search: "'/Images/newimages/Normanton/gym-in-normanton-7'",
        replace: "'/Images/newimages/Normanton/gym-in-normanton-7.webp'"
    },
    // Rotherham 
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-2'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-2.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-3'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-3.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-4'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-4.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-5'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-5.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-6'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-6.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-7'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-7.webp'"
    },
    {
        search: "'/Images/newimages/Rotherham/gym-in-rotherham-8'",
        replace: "'/Images/newimages/Rotherham/gym-in-rotherham-8.webp'"
    },
    // York
    {
        search: "'/Images/newimages/York/gym-in-york'",
        replace: "'/Images/newimages/York/gym-in-york.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-2'",
        replace: "'/Images/newimages/York/gym-in-york-2.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-3'",
        replace: "'/Images/newimages/York/gym-in-york-3.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-4'",
        replace: "'/Images/newimages/York/gym-in-york-4.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-5'",
        replace: "'/Images/newimages/York/gym-in-york-5.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-6'",
        replace: "'/Images/newimages/York/gym-in-york-6.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-7'",
        replace: "'/Images/newimages/York/gym-in-york-7.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-8'",
        replace: "'/Images/newimages/York/gym-in-york-8.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-9'",
        replace: "'/Images/newimages/York/gym-in-york-9.webp'"
    },
    {
        search: "'/Images/newimages/York/gym-in-york-10'",
        replace: "'/Images/newimages/York/gym-in-york-10.webp'"
    },
    // Hull
    {
        search: "'/Images/newimages/Hull/gym-in-hull'",
        replace: "'/Images/newimages/Hull/gym-in-hull.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-2'",
        replace: "'/Images/newimages/Hull/gym-in-hull-2.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-3'",
        replace: "'/Images/newimages/Hull/gym-in-hull-3.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-4'",
        replace: "'/Images/newimages/Hull/gym-in-hull-4.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-5'",
        replace: "'/Images/newimages/Hull/gym-in-hull-5.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-6'",
        replace: "'/Images/newimages/Hull/gym-in-hull-6.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-7'",
        replace: "'/Images/newimages/Hull/gym-in-hull-7.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-8'",
        replace: "'/Images/newimages/Hull/gym-in-hull-8.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-9'",
        replace: "'/Images/newimages/Hull/gym-in-hull-9.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-10'",
        replace: "'/Images/newimages/Hull/gym-in-hull-10.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-11'",
        replace: "'/Images/newimages/Hull/gym-in-hull-11.webp'"
    },
    {
        search: "'/Images/newimages/Hull/gym-in-hull-12'",
        replace: "'/Images/newimages/Hull/gym-in-hull-12.webp'"
    },
    // Durham
    {
        search: "'/Images/newimages/Durham/gym-in-durham'",
        replace: "'/Images/newimages/Durham/gym-in-durham.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-2'",
        replace: "'/Images/newimages/Durham/gym-in-durham-2.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-3'",
        replace: "'/Images/newimages/Durham/gym-in-durham-3.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-4'",
        replace: "'/Images/newimages/Durham/gym-in-durham-4.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-5'",
        replace: "'/Images/newimages/Durham/gym-in-durham-5.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-6'",
        replace: "'/Images/newimages/Durham/gym-in-durham-6.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-7'",
        replace: "'/Images/newimages/Durham/gym-in-durham-7.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-8'",
        replace: "'/Images/newimages/Durham/gym-in-durham-8.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-9'",
        replace: "'/Images/newimages/Durham/gym-in-durham-9.webp'"
    },
    {
        search: "'/Images/newimages/Durham/gym-in-durham-10'",
        replace: "'/Images/newimages/Durham/gym-in-durham-10.webp'"
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
console.log(`✅ LocationController.php updated with .webp extensions for gallery images!`);