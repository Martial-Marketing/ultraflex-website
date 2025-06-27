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
            'muscleGroups' => ['Legs', 'Cardio', 'Lower Body'],
            'description' => 'Professional grade treadmill with advanced features for all fitness levels.',
            'detailedDescription' => 'The Treadmill Pro 3000 is engineered for both casual joggers and serious runners. With its powerful motor, advanced cushioning system, and comprehensive workout programs, this machine delivers a superior cardiovascular workout experience. The large running surface and intuitive controls make it perfect for users of all fitness levels.',
            'difficulty' => 'Beginner',
            'slug' => 'treadmill-pro-3000',
            'brand' => 'FitnessPro',
            'features' => [
                'Heart rate monitor with chest strap compatibility',
                'Multiple workout programs (12 preset programs)',
                'Incline adjustment up to 15%',
                'Speed range: 0.5 - 12 mph',
                'Cushioned running surface with FlexDeck technology',
                'Large LCD display with workout metrics',
                'Emergency stop safety key',
                'Built-in speakers and device holder'
            ],
            'specifications' => [
                'Motor Power' => '3.0 CHP continuous duty',
                'Running Surface' => '22" x 60"',
                'Speed Range' => '0.5 - 12 mph',
                'Incline Range' => '0 - 15%',
                'Maximum User Weight' => '350 lbs',
                'Dimensions' => '84" L x 39" W x 70" H',
                'Weight' => '285 lbs',
                'Power Requirements' => '120V, 20 amp dedicated circuit',
                'Warranty' => 'Lifetime frame, 25 years motor, 1 year parts & labor'
            ],
            'instructions' => [
                'Step onto the treadmill and attach the safety clip to your clothing',
                'Press the Start/Stop button to begin the belt movement',
                'Begin with a slow walking pace (2-3 mph) to warm up',
                'Gradually increase speed using the speed controls as desired',
                'Use the incline controls to add resistance and simulate hills',
                'Monitor your heart rate using the built-in sensors or chest strap',
                'To stop, gradually reduce speed and press the Stop button',
                'Allow the belt to come to a complete stop before stepping off'
            ],
            'safetyTips' => [
                'Always use the safety clip - it will stop the treadmill if you fall',
                'Never step on or off a moving treadmill',
                'Start slowly and gradually increase intensity',
                'Keep your eyes forward, not down at your feet',
                'Stay hydrated and take breaks as needed',
                'Ensure proper footwear with good grip',
                'Keep the emergency stop button within easy reach',
                'Do not use while under the influence of alcohol or medication'
            ],
            'locations' => [
                ['name' => 'Downtown UltraFlex', 'slug' => 'downtown', 'quantity' => 5],
                ['name' => 'Westside UltraFlex', 'slug' => 'westside', 'quantity' => 3],
                ['name' => 'North UltraFlex', 'slug' => 'north', 'quantity' => 4]
            ],
            'relatedEquipment' => [
                [
                    'id' => 2,
                    'name' => 'Elliptical Cross-Trainer',
                    'image' => '/images/equipment/elliptical.jpg',
                    'slug' => 'elliptical-cross-trainer',
                    'category' => 'Cardio'
                ],
                [
                    'id' => 3,
                    'name' => 'Stationary Bike Pro',
                    'image' => '/images/equipment/stationary-bike.jpg',
                    'slug' => 'stationary-bike-pro',
                    'category' => 'Cardio'
                ],
                [
                    'id' => 4,
                    'name' => 'Rowing Machine Elite',
                    'image' => '/images/equipment/rowing-machine.jpg',
                    'slug' => 'rowing-machine-elite',
                    'category' => 'Cardio'
                ],
                [
                    'id' => 5,
                    'name' => 'StairMaster Climber',
                    'image' => '/images/equipment/stairmaster.jpg',
                    'slug' => 'stairmaster-climber',
                    'category' => 'Cardio'
                ]
            ]
        ];

        return Inertia::render('Equipment/Show', [
            'equipment' => $equipmentData
        ]);
    }
}