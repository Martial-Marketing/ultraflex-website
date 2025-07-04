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
                'image' => 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=400&h=300&fit=crop',
                'category' => 'Cardio',
                'muscleGroups' => ['Legs', 'Cardio'],
                'description' => 'Professional grade treadmill with advanced features.',
                'difficulty' => 'Beginner',
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 5],
                    ['name' => 'ULTRAFLEX NORTH LEEDS', 'slug' => 'north-leeds', 'quantity' => 3]
                ],
                'slug' => 'treadmill-pro-3000',
                'brand' => 'FitnessPro',
                'features' => ['Heart rate monitor', 'Multiple programs', 'Incline adjustment']
            ],
            [
                'id' => 2,
                'name' => 'Power Rack Elite',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
                'category' => 'Strength',
                'muscleGroups' => ['Full Body', 'Strength'],
                'description' => 'Heavy-duty power rack for serious strength training.',
                'difficulty' => 'Intermediate',
                'locations' => [
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 2],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 3]
                ],
                'slug' => 'power-rack-elite',
                'brand' => 'StrengthMax',
                'features' => ['Adjustable safety bars', 'Pull-up station', 'Olympic bar compatible']
            ],
            [
                'id' => 3,
                'name' => 'Elliptical Cross-Trainer',
                'image' => 'https://images.unsplash.com/photo-1571388208655-016de64b5675?w=400&h=300&fit=crop',
                'category' => 'Cardio',
                'muscleGroups' => ['Full Body', 'Cardio'],
                'description' => 'Low-impact cardio machine for full-body workout.',
                'difficulty' => 'Beginner',
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 4],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 3],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 2]
                ],
                'slug' => 'elliptical-cross-trainer',
                'brand' => 'CardioMax',
                'features' => ['Dual action handles', 'Variable resistance', 'Heart rate monitoring']
            ],
            [
                'id' => 4,
                'name' => 'Olympic Barbell Set',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
                'category' => 'Strength',
                'muscleGroups' => ['Full Body', 'Strength'],
                'description' => 'Professional Olympic barbell with weight plates.',
                'difficulty' => 'Intermediate',
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 8],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 6],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 10]
                ],
                'slug' => 'olympic-barbell-set',
                'brand' => 'IronCore',
                'features' => ['45lb Olympic bar', 'Rubber coated plates', 'Knurled grip']
            ],
            [
                'id' => 5,
                'name' => 'Cable Machine System',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                'category' => 'Functional',
                'muscleGroups' => ['Full Body', 'Functional'],
                'description' => 'Versatile cable system for functional training.',
                'difficulty' => 'Intermediate',
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 3],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 2],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 4]
                ],
                'slug' => 'cable-machine-system',
                'brand' => 'FuncFit',
                'features' => ['Dual cable system', 'Multiple attachments', 'Adjustable height']
            ],
            [
                'id' => 6,
                'name' => 'Rowing Machine Elite',
                'image' => 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=400&h=300&fit=crop',
                'category' => 'Cardio',
                'muscleGroups' => ['Full Body', 'Cardio'],
                'description' => 'Premium rowing machine for full-body cardio.',
                'difficulty' => 'Intermediate',
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 6],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 4],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 5]
                ],
                'slug' => 'rowing-machine-elite',
                'brand' => 'RowPro',
                'features' => ['Air resistance', 'Performance monitor', 'Ergonomic handle']
            ]
        ];

        $categories = ['Cardio', 'Strength', 'Functional', 'Flexibility'];
        $muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'];
        $locations = [
            ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds'],
            ['name' => 'ULTRAFLEX NORTH LEEDS', 'slug' => 'north-leeds'],
            ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton'],
            ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham'],
            ['name' => 'ULTRAFLEX YORK', 'slug' => 'york'],
            ['name' => 'ULTRAFLEX HULL', 'slug' => 'hull'],
            ['name' => 'ULTRAFLEX DURHAM', 'slug' => 'durham'],
            ['name' => 'ULTRAFLEX DERBY', 'slug' => 'derby'],
            ['name' => 'ULTRAFLEX ATHENS (GREECE)', 'slug' => 'athens-greece'],
            ['name' => 'ULTRAFLEX LINCOLN', 'slug' => 'lincoln'],
            ['name' => 'ULTRAFLEX WEST LONDON', 'slug' => 'west-london'],
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
        // Define all equipment data
        $allEquipmentData = [
            'treadmill-pro-3000' => [
                'id' => 1,
                'name' => 'Treadmill Pro 3000',
                'image' => 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=600&h=400&fit=crop',
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
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 5],
                    ['name' => 'ULTRAFLEX NORTH LEEDS', 'slug' => 'north-leeds', 'quantity' => 3],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 4]
                ],
                'relatedEquipment' => [
                    [
                        'id' => 3,
                        'name' => 'Elliptical Cross-Trainer',
                        'image' => 'https://images.unsplash.com/photo-1571388208655-016de64b5675?w=300&h=200&fit=crop',
                        'slug' => 'elliptical-cross-trainer',
                        'category' => 'Cardio'
                    ],
                    [
                        'id' => 6,
                        'name' => 'Rowing Machine Elite',
                        'image' => 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=300&h=200&fit=crop',
                        'slug' => 'rowing-machine-elite',
                        'category' => 'Cardio'
                    ]
                ]
            ],
            'power-rack-elite' => [
                'id' => 2,
                'name' => 'Power Rack Elite',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
                'video' => '/videos/power-rack-demo.mp4',
                'category' => 'Strength',
                'muscleGroups' => ['Full Body', 'Strength', 'Chest', 'Back', 'Legs'],
                'description' => 'Heavy-duty power rack for serious strength training and Olympic lifting.',
                'detailedDescription' => 'The Power Rack Elite is built for serious strength athletes and powerlifters. Constructed with heavy-gauge steel and featuring adjustable safety bars, this rack provides the ultimate platform for squats, bench press, and Olympic lifts. The integrated pull-up station and multiple bar storage options make it a complete strength training solution.',
                'difficulty' => 'Intermediate',
                'slug' => 'power-rack-elite',
                'brand' => 'StrengthMax',
                'features' => [
                    'Heavy-gauge steel construction (11-gauge)',
                    'Adjustable safety bars with 2-inch spacing',
                    'Integrated pull-up station with multiple grip positions',
                    'Olympic bar storage pegs',
                    'Weight plate storage horns',
                    'Band anchor points for resistance training',
                    'Dip attachment compatible',
                    'Maximum weight capacity: 1000 lbs'
                ],
                'specifications' => [
                    'Frame Material' => '11-gauge steel tubing',
                    'Dimensions' => '48" W x 54" D x 90" H',
                    'Weight Capacity' => '1000 lbs',
                    'Safety Bar Range' => '12" - 84" height',
                    'Pull-up Bar Height' => '90"',
                    'Footprint' => '48" x 54"',
                    'Weight' => '350 lbs',
                    'Assembly Required' => 'Yes (2-3 hours)',
                    'Warranty' => 'Lifetime frame warranty'
                ],
                'instructions' => [
                    'Set the safety bars to appropriate height for your exercise',
                    'Load the Olympic bar with desired weight plates',
                    'Position yourself correctly within the rack',
                    'Maintain proper form throughout the movement',
                    'Use a spotter for maximum weight attempts',
                    'Re-rack the bar safely after completing your set',
                    'Adjust safety bar height between different exercises',
                    'Store weight plates on designated horns when finished'
                ],
                'safetyTips' => [
                    'Always set safety bars 2-3 inches below your lowest point',
                    'Check that all pins and bars are properly secured',
                    'Use collars to secure weight plates on the bar',
                    'Never exceed the maximum weight capacity',
                    'Ensure adequate clearance around the rack',
                    'Inspect equipment before each use',
                    'Use proper lifting technique and form',
                    'Have a spotter for heavy lifts'
                ],
                'locations' => [
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 2],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 1],
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 3]
                ],
                'relatedEquipment' => [
                    [
                        'id' => 4,
                        'name' => 'Olympic Barbell Set',
                        'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop',
                        'slug' => 'olympic-barbell-set',
                        'category' => 'Strength'
                    ]
                ]
            ],
            'elliptical-cross-trainer' => [
                'id' => 3,
                'name' => 'Elliptical Cross-Trainer',
                'image' => 'https://images.unsplash.com/photo-1571388208655-016de64b5675?w=600&h=400&fit=crop',
                'video' => '/videos/elliptical-demo.mp4',
                'category' => 'Cardio',
                'muscleGroups' => ['Full Body', 'Cardio', 'Legs', 'Arms'],
                'description' => 'Low-impact cardio machine providing full-body workout with minimal joint stress.',
                'detailedDescription' => 'The Elliptical Cross-Trainer offers an efficient, low-impact cardiovascular workout that engages both upper and lower body muscles. With its smooth, natural elliptical motion, this machine provides an excellent alternative to running while being easier on joints. Perfect for users of all fitness levels seeking effective cardio training.',
                'difficulty' => 'Beginner',
                'slug' => 'elliptical-cross-trainer',
                'brand' => 'CardioMax',
                'features' => [
                    'Dual action handles for upper body engagement',
                    '20 resistance levels for varied intensity',
                    'Large stride length (20 inches)',
                    'Heart rate monitoring with contact sensors',
                    '15 preset workout programs',
                    'LCD display with workout metrics',
                    'Water bottle holder and device shelf',
                    'Transport wheels for easy moving'
                ],
                'specifications' => [
                    'Stride Length' => '20 inches',
                    'Resistance Levels' => '20 magnetic levels',
                    'Maximum User Weight' => '300 lbs',
                    'Dimensions' => '70" L x 28" W x 67" H',
                    'Weight' => '150 lbs',
                    'Power' => 'Self-powered (no plug required)',
                    'Display' => 'LCD with backlight',
                    'Programs' => '15 preset programs',
                    'Warranty' => '2 years parts, 1 year labor'
                ],
                'instructions' => [
                    'Step onto the foot pedals and grasp the moving handles',
                    'Select your desired program or manual mode',
                    'Begin with slow, comfortable movements to warm up',
                    'Gradually increase resistance and speed as desired',
                    'Maintain upright posture throughout your workout',
                    'Use the heart rate sensors to monitor intensity',
                    'Cool down by reducing resistance and speed gradually',
                    'Step off carefully when the pedals come to a stop'
                ],
                'safetyTips' => [
                    'Always hold the handles when stepping on or off',
                    'Start with low resistance until comfortable with the motion',
                    'Keep your back straight and core engaged',
                    'Avoid leaning heavily on the handles',
                    'Ensure feet are properly positioned on pedals',
                    'Stop immediately if you feel dizzy or unwell',
                    'Keep loose clothing away from moving parts',
                    'Maintain a steady, controlled pace'
                ],
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 4],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 3],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 2]
                ],
                'relatedEquipment' => [
                    [
                        'id' => 1,
                        'name' => 'Treadmill Pro 3000',
                        'image' => 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=300&h=200&fit=crop',
                        'slug' => 'treadmill-pro-3000',
                        'category' => 'Cardio'
                    ]
                ]
            ],
            'olympic-barbell-set' => [
                'id' => 4,
                'name' => 'Olympic Barbell Set',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop',
                'video' => '/videos/barbell-demo.mp4',
                'category' => 'Strength',
                'muscleGroups' => ['Full Body', 'Strength', 'Chest', 'Back', 'Legs', 'Arms'],
                'description' => 'Professional Olympic barbell with rubber-coated weight plates for serious strength training.',
                'detailedDescription' => 'Our Olympic Barbell Set represents the gold standard in strength training equipment. The 45-pound Olympic bar features premium knurling for superior grip and is rated for heavy lifting. The rubber-coated weight plates protect floors and reduce noise while providing precise weight increments for progressive overload training.',
                'difficulty' => 'Intermediate',
                'slug' => 'olympic-barbell-set',
                'brand' => 'IronCore',
                'features' => [
                    '45lb Olympic barbell (7 feet long)',
                    'Rubber-coated weight plates for floor protection',
                    'Dual knurling pattern for secure grip',
                    'Rotating sleeves with quality bearings',
                    'Color-coded plates for easy identification',
                    'Available in 2.5lb to 45lb increments',
                    'Chrome finish for durability',
                    'IWF (International Weightlifting Federation) specifications'
                ],
                'specifications' => [
                    'Bar Length' => '7 feet (84 inches)',
                    'Bar Weight' => '45 lbs (20 kg)',
                    'Bar Diameter' => '28mm grip, 50mm sleeves',
                    'Sleeve Length' => '16 inches each side',
                    'Maximum Load Capacity' => '1500 lbs',
                    'Knurling' => 'Dual knurl marks',
                    'Finish' => 'Chrome plated',
                    'Plate Sizes' => '2.5, 5, 10, 25, 35, 45 lbs',
                    'Warranty' => 'Lifetime bar warranty, 1 year plates'
                ],
                'instructions' => [
                    'Load weight plates evenly on both sides of the bar',
                    'Secure plates with appropriate collars',
                    'Use proper lifting technique for your exercise',
                    'Maintain control of the bar throughout the movement',
                    'Work with a spotter for heavy lifts',
                    'Return plates to storage after use',
                    'Clean the bar with appropriate equipment cleaner',
                    'Inspect bar and plates regularly for damage'
                ],
                'safetyTips' => [
                    'Always use collars to secure weight plates',
                    'Check bar condition before each use',
                    'Load and unload plates carefully',
                    'Never drop the loaded bar',
                    'Use proper lifting form to prevent injury',
                    'Work within your strength limits',
                    'Have a spotter for bench press and heavy squats',
                    'Store plates properly when not in use'
                ],
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 8],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 6],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 10]
                ],
                'relatedEquipment' => [
                    [
                        'id' => 2,
                        'name' => 'Power Rack Elite',
                        'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
                        'slug' => 'power-rack-elite',
                        'category' => 'Strength'
                    ]
                ]
            ],
            'cable-machine-system' => [
                'id' => 5,
                'name' => 'Cable Machine System',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
                'video' => '/videos/cable-machine-demo.mp4',
                'category' => 'Functional',
                'muscleGroups' => ['Full Body', 'Functional', 'Core', 'Arms', 'Chest', 'Back'],
                'description' => 'Versatile cable system for functional training and targeted muscle development.',
                'detailedDescription' => 'The Cable Machine System offers unparalleled versatility in strength and functional training. With dual cable towers and an extensive selection of attachments, this machine enables hundreds of exercise variations. Perfect for rehabilitation, sport-specific training, and general fitness, it provides constant tension throughout the full range of motion.',
                'difficulty' => 'Intermediate',
                'slug' => 'cable-machine-system',
                'brand' => 'FuncFit',
                'features' => [
                    'Dual cable system with independent operation',
                    '19 height adjustment positions per tower',
                    'Weight stack of 200 lbs per tower',
                    'Wide variety of attachments included',
                    'Smooth, precise cable action',
                    'Heavy-duty construction',
                    'Compact footprint design',
                    'Quick attachment change system'
                ],
                'specifications' => [
                    'Weight Stack' => '200 lbs per tower (400 lbs total)',
                    'Adjustment Positions' => '19 per tower',
                    'Height Range' => '6 inches to 84 inches',
                    'Dimensions' => '120" L x 48" W x 84" H',
                    'Weight' => '850 lbs',
                    'Cable Length' => '12 feet per tower',
                    'Maximum User Height' => '6\'8"',
                    'Attachments Included' => '12 different attachments',
                    'Warranty' => '3 years frame, 1 year parts'
                ],
                'instructions' => [
                    'Select appropriate weight on the weight stack',
                    'Attach desired handle or bar to the cable',
                    'Adjust cable height to match your exercise',
                    'Position yourself with proper stance and posture',
                    'Perform the exercise with controlled movements',
                    'Focus on feeling the targeted muscle groups',
                    'Complete your set and return weight slowly',
                    'Change attachments and height as needed'
                ],
                'safetyTips' => [
                    'Ensure attachments are properly secured',
                    'Check cables for fraying or damage',
                    'Use controlled movements - avoid jerky motions',
                    'Don\'t allow weights to slam down',
                    'Maintain proper posture throughout exercises',
                    'Start with lighter weights to learn proper form',
                    'Keep the exercise area clear of other people',
                    'Stop if you experience any unusual resistance'
                ],
                'locations' => [
                    ['name' => 'ULTRAFLEX WEST LEEDS', 'slug' => 'west-leeds', 'quantity' => 3],
                    ['name' => 'ULTRAFLEX NORMANTON', 'slug' => 'normanton', 'quantity' => 2],
                    ['name' => 'ULTRAFLEX ROTHERHAM', 'slug' => 'rotherham', 'quantity' => 4]
                ],
                'relatedEquipment' => [
                    [
                        'id' => 2,
                        'name' => 'Power Rack Elite',
                        'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
                        'slug' => 'power-rack-elite',
                        'category' => 'Strength'
                    ]
                ]
            ],
            'rowing-machine-elite' => [
                'id' => 6,
                'name' => 'Rowing Machine Elite',
                'image' => 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=600&h=400&fit=crop',
                'video' => '/videos/rowing-machine-demo.mp4',
                'category' => 'Cardio',
                'muscleGroups' => ['Full Body', 'Cardio', 'Back', 'Legs', 'Arms', 'Core'],
                'description' => 'Premium rowing machine delivering full-body cardio workout with air resistance.',
                'detailedDescription' => 'The Rowing Machine Elite provides one of the most complete cardiovascular and strength workouts available. Using air resistance that responds to your effort level, this machine engages 86% of your body\'s muscles with each stroke. The smooth, quiet operation and advanced performance monitor make it perfect for both beginners and elite athletes.',
                'difficulty' => 'Intermediate',
                'slug' => 'rowing-machine-elite',
                'brand' => 'RowPro',
                'features' => [
                    'Air resistance with responsive flywheel',
                    'Advanced performance monitor (PM5)',
                    'Ergonomic handle with comfortable grip',
                    'Adjustable footrests with secure straps',
                    'Quick assembly and easy storage',
                    'Smooth aluminum rail with stainless steel track',
                    'Flexible footrests accommodate users of all sizes',
                    'Smartphone compatibility for tracking'
                ],
                'specifications' => [
                    'Resistance Type' => 'Air resistance',
                    'Dimensions' => '96" L x 24" W x 36" H',
                    'Machine Weight' => '57 lbs',
                    'Maximum User Weight' => '500 lbs',
                    'Minimum User Height' => '5\'0"',
                    'Seat Height' => '14 inches',
                    'Monitor' => 'PM5 Performance Monitor',
                    'Storage' => 'Separates into two pieces',
                    'Warranty' => '5 years frame, 2 years parts'
                ],
                'instructions' => [
                    'Secure your feet in the footrests with straps',
                    'Grab the handle with an overhand grip',
                    'Start in the "catch" position with knees bent',
                    'Drive with your legs first, then lean back slightly',
                    'Pull the handle to your lower chest/upper abdomen',
                    'Reverse the motion: arms, body, then legs',
                    'Maintain a smooth, rhythmic stroke rate',
                    'Monitor your form and pace on the display'
                ],
                'safetyTips' => [
                    'Warm up with 5-10 minutes of easy rowing',
                    'Keep your back straight throughout the stroke',
                    'Don\'t grip the handle too tightly',
                    'Use your legs as the primary power source',
                    'Avoid rowing with just your arms and back',
                    'Stay hydrated during longer sessions',
                    'Stop if you experience any pain or discomfort',
                    'Cool down with light rowing and stretching'
                ],
                'locations' => [
                    ['name' => 'Downtown UltraFlex', 'slug' => 'downtown', 'quantity' => 6],
                    ['name' => 'Westside UltraFlex', 'slug' => 'westside', 'quantity' => 4],
                    ['name' => 'North UltraFlex', 'slug' => 'north', 'quantity' => 5]
                ],
                'relatedEquipment' => [
                    [
                        'id' => 1,
                        'name' => 'Treadmill Pro 3000',
                        'image' => 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=300&h=200&fit=crop',
                        'slug' => 'treadmill-pro-3000',
                        'category' => 'Cardio'
                    ],
                    [
                        'id' => 3,
                        'name' => 'Elliptical Cross-Trainer',
                        'image' => 'https://images.unsplash.com/photo-1571388208655-016de64b5675?w=300&h=200&fit=crop',
                        'slug' => 'elliptical-cross-trainer',
                        'category' => 'Cardio'
                    ]
                ]
            ]
        ];

        // Get the equipment data based on the slug
        $equipmentData = $allEquipmentData[$equipment] ?? null;

        // If equipment not found, you might want to handle this with a 404
        if (!$equipmentData) {
            abort(404, 'Equipment not found');
        }

        return Inertia::render('Equipment/Show', [
            'equipment' => $equipmentData
        ]);
    }
}