<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    public function index()
    {
        return Inertia::render('Members/Nutrition/Index', [
            'recipes' => [], // Your recipe data
            'goals' => ['High Protein', 'Low Carb', 'Bulking', 'Cutting'],
            'prepTimes' => ['Under 15 mins', '30 mins', '60 mins+']
        ]);
    }
}