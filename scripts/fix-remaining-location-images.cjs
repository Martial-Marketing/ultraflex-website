const fs = require('fs');
const path = require('path');

// Read the LocationController file
const controllerPath = 'C:\\Projects\\ULTRAFLEX\\app\\Http\\Controllers\\LocationController.php';
let content = fs.readFileSync(controllerPath, 'utf8');

// Define replacements for Derby, Athens, Lincoln, and West London gallery images
const replacements = [
    // Derby gallery images
    {
        search: "'/Images/derby/ForGallery/DSC07341.jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-5.webp'"
    },
    {
        search: "'/Images/derby/ForGallery/DSC07345.jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-6.webp'"
    },
    {
        search: "'/Images/derby/ForGallery/DSC07346.jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-4.webp'"
    },
    {
        search: "'/Images/derby/ForGallery/DSC07349.jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-7.webp'"
    },
    {
        search: "'/Images/derby/ForGallery/DSC07350.jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-8.webp'"
    },
    {
        search: "'/Images/derby/ForGallery/DSC07359 (1).jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-9.webp'"
    },
    {
        search: "'/Images/derby/ForGallery/DSC07359.jpg'",
        replace: "'/Images/derby/ForGallery/gym-in-derby-10.webp'"
    },
    // Derby main image in show method
    {
        search: "'image' => '/Images/derby/ForGallery/DSC07346.jpg'",
        replace: "'image' => '/Images/derby/ForGallery/gym-in-derby-4.webp'"
    },
    
    // Athens gallery images
    {
        search: "'/Images/athens/ForGallery/DSC07341.jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-5.webp'"
    },
    {
        search: "'/Images/athens/ForGallery/DSC07345.jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-6.webp'"
    },
    {
        search: "'/Images/athens/ForGallery/DSC07346.jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-4.webp'"
    },
    {
        search: "'/Images/athens/ForGallery/DSC07349.jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-7.webp'"
    },
    {
        search: "'/Images/athens/ForGallery/DSC07350.jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-8.webp'"
    },
    {
        search: "'/Images/athens/ForGallery/DSC07359 (1).jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-9.webp'"
    },
    {
        search: "'/Images/athens/ForGallery/DSC07359.jpg'",
        replace: "'/Images/athens/ForGallery/gym-in-athens-10.webp'"
    },

    // Lincoln gallery images (assuming similar pattern)
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-2'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-2.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-3'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-3.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-4'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-4.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-5'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-5.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-6'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-6.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-7'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-7.webp'"
    },
    {
        search: "'/Images/newimages/Lincoln/gym-in-lincoln-8'",
        replace: "'/Images/newimages/Lincoln/gym-in-lincoln-8.webp'"
    },

    // West London gallery images
    {
        search: "'/Images/westlondon/gym-in-westlondon'",
        replace: "'/Images/westlondon/gym-in-westlondon.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-2'",
        replace: "'/Images/westlondon/gym-in-westlondon-2.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-3'",
        replace: "'/Images/westlondon/gym-in-westlondon-3.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-4'",
        replace: "'/Images/westlondon/gym-in-westlondon-4.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-5'",
        replace: "'/Images/westlondon/gym-in-westlondon-5.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-6'",
        replace: "'/Images/westlondon/gym-in-westlondon-6.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-7'",
        replace: "'/Images/westlondon/gym-in-westlondon-7.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-8'",
        replace: "'/Images/westlondon/gym-in-westlondon-8.webp'"
    },
    {
        search: "'/Images/westlondon/gym-in-westlondon-9'",
        replace: "'/Images/westlondon/gym-in-westlondon-9.webp'"
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
console.log(`✅ LocationController.php updated with .webp extensions for Derby, Athens, Lincoln, and West London!`);