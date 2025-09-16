const fs = require('fs');

// Read the WorkoutController file
const filePath = '../app/Http/Controllers/WorkoutController.php';
let content = fs.readFileSync(filePath, 'utf8');

// Define replacement mappings based on our conversion results
const replacements = [
    // Workout images
    { from: '/Images/workout/UF-Abs.jpg', to: '/Images/workout/workout-exercise-2' },
    { from: '/Images/workout/UF-ARMS-.png', to: '/Images/workout/workout-exercise-3' },
    { from: '/Images/workout/UF-BACK.png', to: '/Images/workout/workout-exercise-4' },
    { from: '/Images/workout/UF-Chest-1-.png', to: '/Images/workout/workout-exercise-5' },
    { from: '/Images/workout/UF-legs-.png', to: '/Images/workout/workout-exercise-6' },
    { from: '/Images/workout/UF-Shoulders.png', to: '/Images/workout/workout-exercise-7' },
    { from: '/Images/workout/Contest-Prep-768x432.jpg', to: '/Images/workout/workout-exercise' },
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
console.log('WorkoutController has been updated with WebP image paths.');