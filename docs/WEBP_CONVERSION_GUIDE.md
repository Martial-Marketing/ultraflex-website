# Image Conversion Documentation & Instructions

## 🚀 WebP Conversion Process

### Step 1: Install WebP Tools
Download Google's WebP tools from: https://developers.google.com/speed/webp/download
Extract and add `cwebp.exe` to your PATH or place in project root.

### Step 2: Run Conversion Script
```powershell
# Navigate to project root
cd C:\Projects\ULTRAFLEX

# Run the conversion script
.\scripts\convert-to-webp.ps1
```

### Step 3: Manual Conversion (Alternative)
If the script doesn't work, use this command pattern:
```powershell
# Convert single image
cwebp -q 85 "input.jpg" -o "output-name"

# Batch convert in directory
Get-ChildItem -Filter "*.jpg" | ForEach-Object { 
    cwebp -q 85 $_.FullName -o ($_.BaseName) 
}
```

## 📋 Required Image Conversions & Renaming

### Locations (Priority 1)
```
OLD: /Images/newimages/West Leeds/processed-87E9C2AC-91E6-4D66-A554-A14A6884F806.jpeg
NEW: /Images/newimages/West Leeds/gym-in-westleeds

OLD: /Images/newimages/North Leeds/processed-2FB70114-A5B3-421F-B18F-9259B02EAE0F.jpeg  
NEW: /Images/newimages/North Leeds/gym-in-northleeds

OLD: /Images/newimages/Normanton/original-9952D7AA-91CB-428C-B334-0861B2D6D9CA.jpeg
NEW: /Images/newimages/Normanton/gym-in-normanton

OLD: /Images/newimages/Rotherham/processed-02A9E771-ED62-4062-A773-9CC3BF76DD80.jpeg
NEW: /Images/newimages/Rotherham/gym-in-rotherham

OLD: /Images/newimages/York/processed-1C75D3B5-0121-44DC-9A0C-46E5DD1CDE59.jpeg
NEW: /Images/newimages/York/gym-in-york

OLD: /Images/newimages/Hull/processed-1BE59C03-0910-444C-B36D-32C70D815526.jpeg
NEW: /Images/newimages/Hull/gym-in-hull

OLD: /Images/newimages/Durham/original-78FD4345-1F1E-4451-8ED1-86D9844C4727.jpeg
NEW: /Images/newimages/Durham/gym-in-durham

OLD: /Images/newimages/Lincoln/processed-4B4F47FA-F1B6-46E4-9870-983DC13A0EA9.jpeg
NEW: /Images/newimages/Lincoln/gym-in-lincoln
```

### Gallery Images (Priority 2)
```
OLD: /Images/york/ForGallery/DSC07349.jpg
NEW: /Images/york/ForGallery/gym-in-york-1

OLD: /Images/york/ForGallery/DSC07350.jpg  
NEW: /Images/york/ForGallery/gym-in-york-2

OLD: /Images/hull/IMG (19) (5).jpg
NEW: /Images/hull/gym-in-hull-facility

OLD: /Images/durham/8 Section MultiStation.jpg
NEW: /Images/durham/equipment-in-durham-multistation
```

### Workout Images (Priority 3)
```
OLD: /Images/workout/UF-Abs.jpg
NEW: /Images/workout/exercise-abs-ultraflex

OLD: /Images/workout/Contest-Prep-768x432.jpg
NEW: /Images/workout/exercise-contest-prep-ultraflex
```

### Logo Images (Priority 4)
```
OLD: /Images/logo/ultra-flex-200x167 (1).png
NEW: /Images/logo/ultraflex-logo

OLD: /Images/ultra-flex-200x167.webp
NEW: /Images/ultraflex-chatbot-logo
```

## 🔧 Code Updates Required

After converting images, update these files:
- ✅ LocationController.php (partially updated)
- ❌ TourController.php (200+ references)
- ❌ WorkoutController.php (10+ references)
- ✅ Navbar.tsx (updated)
- ✅ AIChatbotFAQ.tsx (updated)
- ❌ Footer.tsx (needs update)
- ❌ Welcome.tsx (needs update)
- ❌ HomepageCarousel.tsx (needs update)

## 📊 Progress Tracking

### Completed:
- [x] Created conversion script
- [x] Updated 2 LocationController images  
- [x] Updated Navbar logo
- [x] Updated Chatbot logo
- [x] Created ImageService helper

### Remaining:
- [ ] Convert 200+ images to WebP
- [ ] Rename with SEO conventions
- [ ] Update remaining 150+ code references
- [ ] Test all image loading
- [ ] Verify WebP fallback works

## 🎯 Expected Results

After completion:
- ✅ 30-50% smaller image file sizes
- ✅ SEO-friendly image names
- ✅ No visible file extensions
- ✅ Improved page load speeds
- ✅ Better search engine ranking