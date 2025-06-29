<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    public function index()
    {
        // Sample recipe data - replace with actual database queries
        $recipes = [
            [
                'id' => 1,
                'title' => 'Protein Power Bowl',
                'description' => 'A nutrient-dense bowl packed with lean protein and fresh vegetables',
                'image' => 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '15 min',
                'cookTime' => '10 min',
                'servings' => 2,
                'calories' => 450,
                'protein' => 35,
                'carbs' => 40,
                'fat' => 18,
                'category' => 'Muscle Gain',
                'difficulty' => 'Easy',
                'ingredients' => ['Grilled chicken breast', 'Quinoa', 'Black beans', 'Avocado', 'Cherry tomatoes'],
                'instructions' => ['Cook quinoa according to package instructions', 'Grill chicken breast', 'Assemble bowl with ingredients']
            ],
            [
                'id' => 2,
                'title' => 'Green Smoothie Energy',
                'description' => 'Refreshing smoothie perfect for pre-workout fuel',
                'image' => 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '5 min',
                'cookTime' => '0 min',
                'servings' => 1,
                'calories' => 250,
                'protein' => 15,
                'carbs' => 35,
                'fat' => 8,
                'category' => 'Pre-Workout',
                'difficulty' => 'Easy',
                'ingredients' => ['Spinach', 'Banana', 'Protein powder', 'Almond milk', 'Chia seeds'],
                'instructions' => ['Blend all ingredients until smooth', 'Add ice if desired', 'Serve immediately']
            ],
            [
                'id' => 3,
                'title' => 'Salmon & Sweet Potato',
                'description' => 'Perfectly balanced meal with omega-3s and complex carbs',
                'image' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '10 min',
                'cookTime' => '25 min',
                'servings' => 2,
                'calories' => 520,
                'protein' => 40,
                'carbs' => 45,
                'fat' => 22,
                'category' => 'Post-Workout',
                'difficulty' => 'Medium',
                'ingredients' => ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Olive oil', 'Herbs'],
                'instructions' => ['Bake sweet potato at 400°F', 'Pan-sear salmon', 'Steam broccoli', 'Serve together']
            ],
            [
                'id' => 4,
                'title' => 'Greek Yogurt Parfait',
                'description' => 'High-protein snack with probiotics and antioxidants',
                'image' => 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '5 min',
                'cookTime' => '0 min',
                'servings' => 1,
                'calories' => 320,
                'protein' => 25,
                'carbs' => 30,
                'fat' => 12,
                'category' => 'Healthy Snacks',
                'difficulty' => 'Easy',
                'ingredients' => ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Almonds'],
                'instructions' => ['Layer yogurt in glass', 'Add berries and granola', 'Drizzle with honey', 'Top with almonds']
            ],
            [
                'id' => 5,
                'title' => 'Chicken Meal Prep',
                'description' => 'Weekly meal prep with balanced macronutrients',
                'image' => 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '20 min',
                'cookTime' => '45 min',
                'servings' => 5,
                'calories' => 400,
                'protein' => 35,
                'carbs' => 35,
                'fat' => 15,
                'category' => 'Meal Prep',
                'difficulty' => 'Medium',
                'ingredients' => ['Chicken thighs', 'Brown rice', 'Mixed vegetables', 'Seasonings'],
                'instructions' => ['Season and bake chicken', 'Cook rice in bulk', 'Roast vegetables', 'Portion into containers']
            ],
            [
                'id' => 6,
                'title' => 'Veggie Buddha Bowl',
                'description' => 'Plant-based bowl loaded with nutrients and fiber',
                'image' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '15 min',
                'cookTime' => '20 min',
                'servings' => 2,
                'calories' => 380,
                'protein' => 18,
                'carbs' => 55,
                'fat' => 14,
                'category' => 'Weight Loss',
                'difficulty' => 'Easy',
                'ingredients' => ['Quinoa', 'Chickpeas', 'Kale', 'Tahini', 'Colorful vegetables'],
                'instructions' => ['Cook quinoa and chickpeas', 'Massage kale with dressing', 'Arrange in bowl', 'Drizzle with tahini']
            ]
        ];

        return Inertia::render('Members/Nutrition-Index', [
            'recipes' => $recipes,
        ]);
    }
}