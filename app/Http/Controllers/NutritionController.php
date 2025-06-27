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
                'image' => '/Images/nutrition1.jpg',
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
                'image' => '/Images/nutrition2.jpg',
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
                'image' => '/Images/nutrition3.jpg',
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
            ]
        ];

        return Inertia::render('Members/Nutrition-Index', [
            'recipes' => $recipes,
        ]);
    }
}