const fs = require('fs');

// Read the LocationController file
const filePath = '../app/Http/Controllers/LocationController.php';
let content = fs.readFileSync(filePath, 'utf8');

// Define replacement mappings based on our conversion results
const replacements = [
    // West Leeds
    { from: '/Images/newimages/West Leeds/processed-87E9C2AC-91E6-4D66-A554-A14A6884F806.jpeg', to: '/Images/newimages/West Leeds/gym-in-westleeds' },
    { from: '/Images/newimages/West Leeds/processed-0450649E-F70E-4964-B65D-4EFEC111EC96.jpeg', to: '/Images/newimages/West Leeds/gym-in-westleeds-2' },
    { from: '/Images/newimages/West Leeds/processed-CFF78B9F-6230-4E23-8A81-D514407375F3.jpeg', to: '/Images/newimages/West Leeds/gym-in-westleeds-3' },
    { from: '/Images/newimages/West Leeds/processed-D1018833-8E96-476D-BBD7-936806F64B5A.jpeg', to: '/Images/newimages/West Leeds/gym-in-westleeds-4' },
    
    // North Leeds
    { from: '/Images/newimages/North Leeds/processed-2FB70114-A5B3-421F-B18F-9259B02EAE0F.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds' },
    { from: '/Images/newimages/North Leeds/processed-5EFB986F-A01D-45B4-A639-78BD17AAC227.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-2' },
    { from: '/Images/newimages/North Leeds/processed-7BA4ED86-23D3-4781-AAA2-EC6614277661.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-3' },
    { from: '/Images/newimages/North Leeds/processed-10DD967D-7D5C-41F4-B422-BE3971C0DCA1.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-4' },
    { from: '/Images/newimages/North Leeds/processed-76AF2E09-9ADF-4BBF-9ACA-3162D41E1A55.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-5' },
    { from: '/Images/newimages/North Leeds/processed-99B601E2-5AD9-470A-8CAF-FC423FC51595.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-6' },
    { from: '/Images/newimages/North Leeds/processed-BF2DD4B5-1FE7-426D-9754-34E76EF8EE78.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-7' },
    { from: '/Images/newimages/North Leeds/processed-D9B9ADBE-7CB6-41CD-B6EC-6C35A5F1619A.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-8' },
    { from: '/Images/newimages/North Leeds/processed-D99ED15F-94AE-4A73-A44C-86D2C965A647.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-9' },
    { from: '/Images/newimages/North Leeds/processed-ECF0163A-CC4D-4873-ABFB-B89375B52D5F.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-10' },
    { from: '/Images/newimages/North Leeds/processed-F7B287EF-8436-4457-8B69-A199088FB54B.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-11' },
    { from: '/Images/newimages/North Leeds/processed-F86F9272-4DEC-484E-8C3F-6E06A7D47E71.jpeg', to: '/Images/newimages/North Leeds/gym-in-northleeds-12' },
    
    // Normanton
    { from: '/Images/newimages/Normanton/original-9952D7AA-91CB-428C-B334-0861B2D6D9CA.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton' },
    { from: '/Images/newimages/Normanton/original-E7E9CE73-12D7-4640-B9A1-97459375660B.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-2' },
    { from: '/Images/newimages/Normanton/processed-2452478C-43F1-4675-8B5B-C6FA2C4E01E8.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-3' },
    { from: '/Images/newimages/Normanton/processed-32C97997-5EDB-4C17-B558-98833B55CCDE.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-4' },
    { from: '/Images/newimages/Normanton/processed-36B198E1-BDA5-4A5A-AE2A-11C1E320ACAA.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-5' },
    { from: '/Images/newimages/Normanton/processed-4A39A08A-E6DE-494A-A832-CFA100002638.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-6' },
    { from: '/Images/newimages/Normanton/processed-4DBB0340-4911-4E16-9359-803AE95C5B41.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-7' },
    { from: '/Images/newimages/Normanton/processed-73E3DEE0-247C-4414-8BFD-685E2FD01BB9.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-8' },
    { from: '/Images/newimages/Normanton/processed-B81487A2-CC31-40AD-BB62-F83139D88FB1.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-9' },
    { from: '/Images/newimages/Normanton/processed-D7A5E938-2961-4A96-B14E-530269D9A7E6.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-10' },
    { from: '/Images/newimages/Normanton/processed-EEC257EE-7EED-41B9-A145-9FADF54E81E9.jpeg', to: '/Images/newimages/Normanton/gym-in-normanton-11' },
    
    // Rotherham
    { from: '/Images/newimages/Rotherham/processed-02A9E771-ED62-4062-A773-9CC3BF76DD80.jpeg', to: '/Images/newimages/Rotherham/gym-in-rotherham' },
    { from: '/Images/newimages/Rotherham/processed-3A62DA5E-9C09-488E-91E2-F2C204D74006.jpeg', to: '/Images/newimages/Rotherham/gym-in-rotherham-2' },
    { from: '/Images/newimages/Rotherham/processed-686C8E39-68D6-4118-8892-326CFF49BCD3.jpeg', to: '/Images/newimages/Rotherham/gym-in-rotherham-3' },
    { from: '/Images/newimages/Rotherham/processed-C23EEF4E-7957-40BF-A09E-999F4E17257B.jpeg', to: '/Images/newimages/Rotherham/gym-in-rotherham-4' },
    { from: '/Images/newimages/Rotherham/processed-E7CC8E8F-586F-4CF5-B707-641A064EC19D.jpeg', to: '/Images/newimages/Rotherham/gym-in-rotherham-5' },
    
    // York
    { from: '/Images/newimages/York/processed-1C75D3B5-0121-44DC-9A0C-46E5DD1CDE59.jpeg', to: '/Images/newimages/York/gym-in-york' },
    { from: '/Images/newimages/York/processed-4FB818B1-CB0B-4226-93DE-ECBF23EF0630.jpeg', to: '/Images/newimages/York/gym-in-york-2' },
    { from: '/Images/newimages/York/processed-5EF5877A-43FD-48A2-BFD3-9D3DD634C60B.jpeg', to: '/Images/newimages/York/gym-in-york-3' },
    
    // Hull
    { from: '/Images/newimages/Hull/processed-15D8AB96-044B-42F8-B235-0E7C848EDA0D.jpeg', to: '/Images/newimages/Hull/gym-in-hull' },
    { from: '/Images/newimages/Hull/processed-1BE59C03-0910-444C-B36D-32C70D815526.jpeg', to: '/Images/newimages/Hull/gym-in-hull-2' },
    { from: '/Images/newimages/Hull/processed-27DF3E0C-2CC7-42AD-8751-F6E124F08F5D.jpeg', to: '/Images/newimages/Hull/gym-in-hull-3' },
    { from: '/Images/newimages/Hull/processed-5B47D6DE-4D02-4629-863B-AB810E138281.jpeg', to: '/Images/newimages/Hull/gym-in-hull-4' },
    { from: '/Images/newimages/Hull/processed-8D6FE96B-F41C-4941-AE4D-00FF9FD3AE37.jpeg', to: '/Images/newimages/Hull/gym-in-hull-5' },
    { from: '/Images/newimages/Hull/processed-929C5668-A369-4F9F-97C0-AED066790558.jpeg', to: '/Images/newimages/Hull/gym-in-hull-6' },
    
    // Durham
    { from: '/Images/newimages/Durham/original-1606B7A3-C5DB-4DD9-9C05-B4E4FF463A44.jpeg', to: '/Images/newimages/Durham/gym-in-durham' },
    { from: '/Images/newimages/Durham/original-765B73B8-3555-41E6-B680-3C38DED8D5F0.jpeg', to: '/Images/newimages/Durham/gym-in-durham-2' },
    { from: '/Images/newimages/Durham/original-78FD4345-1F1E-4451-8ED1-86D9844C4727.jpeg', to: '/Images/newimages/Durham/gym-in-durham-3' },
    { from: '/Images/newimages/Durham/original-84A42F17-F135-4479-ACEE-E12FF6107430.jpeg', to: '/Images/newimages/Durham/gym-in-durham-4' },
    { from: '/Images/newimages/Durham/original-B7A6D0E9-9780-4912-B146-A2796C6DBD7D.jpeg', to: '/Images/newimages/Durham/gym-in-durham-5' },
    
    // Lincoln
    { from: '/Images/newimages/Lincoln/processed-38D17425-57E0-4119-BD1C-54053605DD0A.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln' },
    { from: '/Images/newimages/Lincoln/processed-4B4F47FA-F1B6-46E4-9870-983DC13A0EA9.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-2' },
    { from: '/Images/newimages/Lincoln/processed-4CB42C14-ABF7-4379-AB13-509CA5CEB016.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-3' },
    { from: '/Images/newimages/Lincoln/processed-7468998F-6368-4178-8FB4-D437F39F9884.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-4' },
    { from: '/Images/newimages/Lincoln/processed-95FD96E0-A8DE-4649-BF40-7ECA577FA1D3.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-5' },
    { from: '/Images/newimages/Lincoln/processed-B5F4A1CC-91C3-48E8-8773-C723A38B9528.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-6' },
    { from: '/Images/newimages/Lincoln/processed-C64B65BB-67FB-4387-BA65-2CB3D05B66FB.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-7' },
    { from: '/Images/newimages/Lincoln/processed-DDDEB120-7C53-41E5-B9FE-4AFA7C028F78.jpeg', to: '/Images/newimages/Lincoln/gym-in-lincoln-8' },
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
console.log('LocationController has been updated with WebP image paths.');