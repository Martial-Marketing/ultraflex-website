<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index()
    {
        // Sample data - replace with your actual data from database
        $equipment = [
            [
                'id' => 1,
                'name' => 'Treadmill Pro 3000',
                'image' => '/images/equipment/treadmill.jpg',
                'category' => 'Cardio',
                'muscleGroups' => ['Legs', 'Cardio'],
                'description' => 'Professional grade treadmill with advanced features.',
                'difficulty' => 'Beginner',
                'locations' => [
                    ['name' => 'Downtown UltraFlex', 'slug' => 'downtown', 'quantity' => 5],
                    ['name' => 'Westside UltraFlex', 'slug' => 'westside', 'quantity' => 3]
                ],
                'slug' => 'treadmill-pro-3000',
                'brand' => 'FitnessPro',
                'features' => ['Heart rate monitor', 'Multiple programs', 'Incline adjustment']
            ],
            [
                'id' => 2,
                'name' => 'Power Rack Elite',
                'image' => '/images/equipment/power-rack.jpg',
                'category' => 'Strength',
                'muscleGroups' => ['Full Body', 'Strength'],
                'description' => 'Heavy-duty power rack for serious strength training.',
                'difficulty' => 'Intermediate',
                'locations' => [
                    ['name' => 'Downtown UltraFlex', 'slug' => 'downtown', 'quantity' => 2],
                    ['name' => 'North UltraFlex', 'slug' => 'north', 'quantity' => 3]
                ],
                'slug' => 'power-rack-elite',
                'brand' => 'StrengthMax',
                'features' => ['Adjustable safety bars', 'Pull-up station', 'Olympic bar compatible']
            ]
        ];

        $categories = ['Cardio', 'Strength', 'Functional', 'Flexibility'];
        $muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'];
        $locations = [
            ['name' => 'Downtown UltraFlex', 'slug' => 'downtown'],
            ['name' => 'Westside UltraFlex', 'slug' => 'westside'],
            ['name' => 'North UltraFlex', 'slug' => 'north']
        ];

        return Inertia::render('Equipment/Index', [
            'equipment' => $equipment,
            'categories' => $categories,
            'muscleGroups' => $muscleGroups,
            'locations' => $locations
        ]);
    }

    public function show($equipment)
    {
        // Sample data for individual equipment page
        $equipmentData = [
            'id' => 1,
            'name' => 'Treadmill Pro 3000',
            'image' => '/images/equipment/treadmill.jpg',
            'video' => '/videos/treadmill-demo.mp4',
            'category' => 'Cardio',
            'muscleGroups' => ['Legs', 'Cardio'],
            'description' => 'Professional grade treadmill with advanced features for all fitness levels.',
            'difficulty' => 'Beginner',
            'brand' => 'FitnessPro',
            'features' => [
                'Heart rate monitor',
                'Multiple workout programs',
                'Incline adjustment up to 15%',
                'Speed up to 12 mph',
                'Cushioned running surface'
            ],
            'locations' => [
                ['name' => 'Downtown UltraFlex', 'slug' => 'downtown', 'quantity' => 5],
                ['name' => 'Westside UltraFlex', 'slug' => 'westside', 'quantity' => 3]
            ],
            'tips' => [
                'Start with a 5-minute warm-up walk',
                'Keep your posture upright',
                'Land on the middle of your feet',
                'Use the safety clip at all times'
            ],
            'commonMistakes' => [
                'Holding onto the handrails while running',
                'Looking down at your feet',
                'Taking too long strides',
                'Starting too fast'
            ]
        ];

        return Inertia::render('Equipment/Show', [
            'equipment' => $equipmentData
        ]);
    }
}