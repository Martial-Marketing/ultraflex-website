<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    public function index()
    {
        // Real workout data based on UltraFlex programs
        $workouts = [
            [
                'id' => 1,
                'title' => 'ABS WORKOUT',
                'description' => 'Sculpt and strengthen your core with targeted abdominal exercises',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Core',
                'equipment' => ['Mat', 'Medicine Ball', 'Ab Wheel'],
                'targetMuscles' => ['Abs', 'Core', 'Obliques'],
                'videoLinks' => ['https://youtu.be/p35TqPT2x_g', 'https://youtu.be/9YYaAzaSbHE']
            ],
            [
                'id' => 2,
                'title' => 'ARMS WORKOUT',
                'description' => 'Build powerful biceps, triceps, and forearms',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Dumbbells', 'Barbell', 'Cable Machine'],
                'targetMuscles' => ['Biceps', 'Triceps', 'Forearms'],
                'videoLinks' => [
                    'https://youtu.be/A88KMLpQ6nk',
                    'https://youtu.be/6tqw20euw2M',
                    'https://youtu.be/GKPaqjkYaIY',
                    'https://youtu.be/ZcBqA0p6IIM',
                    'https://youtu.be/2qhE7JnnwnM',
                    'https://youtu.be/CZGMv87OZ0g',
                    'https://youtu.be/kjpzFfZSmiU',
                    'https://youtu.be/dmLttCxXnBE',
                    'https://youtu.be/lCRnAtHAvWs',
                    'https://youtu.be/BlAXY9rk4r8'
                ]
            ],
            [
                'id' => 3,
                'title' => 'BACK WORKOUT',
                'description' => 'Develop a strong and wide back with compound movements',
                'image' => 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Advanced',
                'type' => 'Strength',
                'equipment' => ['Pull-up Bar', 'Barbell', 'Cable Machine', 'Dumbbells'],
                'targetMuscles' => ['Lats', 'Rhomboids', 'Traps', 'Lower Back'],
                'videoLinks' => [
                    'https://youtu.be/7f615JNrqdQ',
                    'https://youtu.be/EiHpTYvSgRw',
                    'https://youtu.be/iFKQCUjhc_8',
                    'https://youtu.be/5On4JVxgmAI',
                    'https://youtu.be/uW4tO3GyIFk',
                    'https://youtu.be/2RjQC2cByww',
                    'https://youtu.be/cjc_W_PlzU0',
                    'https://youtu.be/qlIvuqHi1Ic',
                    'https://youtu.be/C21SlvzrxHo',
                    'https://youtu.be/bWbbSyIUDvA',
                    'https://youtu.be/zHNGzq1ZxDo',
                    'https://youtu.be/qT-BjESsQ50',
                    'https://youtu.be/8bDVCtVXDGM',
                    'https://youtu.be/Ar74l1V-dcs',
                    'https://youtu.be/kAUH6rLNWhQ'
                ]
            ],
            [
                'id' => 4,
                'title' => 'CHEST WORKOUT',
                'description' => 'Build a powerful chest with pressing movements and isolation exercises',
                'image' => 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Barbell', 'Dumbbells', 'Bench', 'Cable Machine'],
                'targetMuscles' => ['Pectorals', 'Anterior Deltoids', 'Triceps'],
                'videoLinks' => [
                    'https://youtu.be/4Wi8vIApknY',
                    'https://youtu.be/9pMQCZBRRs4',
                    'https://youtu.be/HUDuxMVW6C8',
                    'https://youtu.be/03fb6Bdi804',
                    'https://youtu.be/PjlXtxRXJHU',
                    'https://youtu.be/lLWnQ837un8',
                    'https://youtu.be/ZJAvTv7L7hc',
                    'https://youtu.be/Q92P2kjQJhw',
                    'https://youtu.be/BxMycL6PEWg'
                ]
            ],
            [
                'id' => 5,
                'title' => 'LEGS WORKOUT',
                'description' => 'Power up your lower body with squats, deadlifts, and leg isolation',
                'image' => 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Advanced',
                'type' => 'Strength',
                'equipment' => ['Barbell', 'Dumbbells', 'Leg Press', 'Squat Rack'],
                'targetMuscles' => ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
                'videoLinks' => [
                    'https://youtu.be/yhXvDOJRcX4',
                    'https://youtu.be/Icb_fq2yXZk',
                    'https://youtu.be/RR9TNQcqexY',
                    'https://youtu.be/_5B2AwA8vKE',
                    'https://youtu.be/OWL84VQJnPo',
                    'https://youtu.be/maq6g5DWbng',
                    'https://youtu.be/lujGa5WwtB8',
                    'https://youtu.be/8Jvz7Ih9s3s',
                    'https://youtu.be/6uHRFgQHwDs',
                    'https://youtu.be/QbvAh_aRWGA',
                    'https://youtu.be/WMEAfmhEoKg',
                    'https://youtu.be/rr8_suFwxxI',
                    'https://youtu.be/56lhH2oK2p0',
                    'https://youtu.be/TbEQh_gfhQw',
                    'https://youtu.be/03ZkHCXovYc',
                    'https://youtu.be/X5rf6cDQluw',
                    'https://youtu.be/1nh7ymbABXY',
                    'https://youtu.be/ihi01nuMVM0',
                    'https://youtu.be/opsibwL7_6k',
                    'https://youtu.be/McSfNQY5IyY',
                    'https://youtu.be/-3SGJWh9a8g',
                    'https://youtu.be/FLYwAQhHdVc',
                    'https://youtu.be/tZqhAn-APZE',
                    'https://youtu.be/I7BAJRA3c1g',
                    'https://youtu.be/31zcjMBA3hk',
                    'https://youtu.be/eWtS2IZE6DA'
                ]
            ],
            [
                'id' => 6,
                'title' => 'SHOULDER WORKOUT',
                'description' => 'Build impressive deltoids with pressing and lateral movements',
                'image' => 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Dumbbells', 'Barbell', 'Cable Machine'],
                'targetMuscles' => ['Deltoids', 'Rotator Cuff', 'Traps'],
                'videoLinks' => [
                    'https://youtu.be/8KMIcOKmFD0',
                    'https://youtu.be/JITeLkRsOh4',
                    'https://youtu.be/m5yWt8A4GQM',
                    'https://youtu.be/5rv2OnMsd1I',
                    'https://youtu.be/i6RC9ifs4D4'
                ]
            ],
            [
                'id' => 7,
                'title' => 'CONTEST PREP',
                'description' => 'Elite competition preparation program for serious athletes looking to compete at the highest level',
                'image' => '/Images/workout/Contest-Prep-768x432.jpg',
                'difficulty' => 'Expert',
                'type' => 'Competition',
                'equipment' => ['Full Gym Access', 'All Equipment'],
                'targetMuscles' => ['Full Body', 'Competition Focus']
            ]
        ];

        return Inertia::render('Members/Workouts-Index', [
            'workouts' => $workouts,
        ]);
    }
    
    public function show($id)
    {
        // Real workout data based on UltraFlex programs
        $workouts = [
            [
                'id' => 1,
                'title' => 'ABS WORKOUT',
                'description' => 'Sculpt and strengthen your core with targeted abdominal exercises',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Core',
                'equipment' => ['Mat', 'Medicine Ball', 'Ab Wheel'],
                'targetMuscles' => ['Abs', 'Core', 'Obliques'],
                'videoLinks' => ['https://youtu.be/p35TqPT2x_g', 'https://youtu.be/9YYaAzaSbHE']
            ],
            [
                'id' => 2,
                'title' => 'ARMS WORKOUT',
                'description' => 'Build powerful biceps, triceps, and forearms',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Dumbbells', 'Barbell', 'Cable Machine'],
                'targetMuscles' => ['Biceps', 'Triceps', 'Forearms'],
                'videoLinks' => [
                    'https://youtu.be/A88KMLpQ6nk',
                    'https://youtu.be/6tqw20euw2M',
                    'https://youtu.be/GKPaqjkYaIY',
                    'https://youtu.be/ZcBqA0p6IIM',
                    'https://youtu.be/2qhE7JnnwnM',
                    'https://youtu.be/CZGMv87OZ0g',
                    'https://youtu.be/kjpzFfZSmiU',
                    'https://youtu.be/dmLttCxXnBE',
                    'https://youtu.be/lCRnAtHAvWs',
                    'https://youtu.be/BlAXY9rk4r8'
                ]
            ],
            [
                'id' => 3,
                'title' => 'BACK WORKOUT',
                'description' => 'Develop a strong and wide back with compound movements',
                'image' => 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Advanced',
                'type' => 'Strength',
                'equipment' => ['Pull-up Bar', 'Barbell', 'Cable Machine', 'Dumbbells'],
                'targetMuscles' => ['Lats', 'Rhomboids', 'Traps', 'Lower Back'],
                'videoLinks' => [
                    'https://youtu.be/7f615JNrqdQ',
                    'https://youtu.be/EiHpTYvSgRw',
                    'https://youtu.be/iFKQCUjhc_8',
                    'https://youtu.be/5On4JVxgmAI',
                    'https://youtu.be/uW4tO3GyIFk',
                    'https://youtu.be/2RjQC2cByww',
                    'https://youtu.be/cjc_W_PlzU0',
                    'https://youtu.be/qlIvuqHi1Ic',
                    'https://youtu.be/C21SlvzrxHo',
                    'https://youtu.be/bWbbSyIUDvA',
                    'https://youtu.be/zHNGzq1ZxDo',
                    'https://youtu.be/qT-BjESsQ50',
                    'https://youtu.be/8bDVCtVXDGM',
                    'https://youtu.be/Ar74l1V-dcs',
                    'https://youtu.be/kAUH6rLNWhQ'
                ]
            ],
            [
                'id' => 4,
                'title' => 'CHEST WORKOUT',
                'description' => 'Build a powerful chest with pressing movements and isolation exercises',
                'image' => 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Barbell', 'Dumbbells', 'Bench', 'Cable Machine'],
                'targetMuscles' => ['Pectorals', 'Anterior Deltoids', 'Triceps'],
                'videoLinks' => [
                    'https://youtu.be/4Wi8vIApknY',
                    'https://youtu.be/9pMQCZBRRs4',
                    'https://youtu.be/HUDuxMVW6C8',
                    'https://youtu.be/03fb6Bdi804',
                    'https://youtu.be/PjlXtxRXJHU',
                    'https://youtu.be/lLWnQ837un8',
                    'https://youtu.be/ZJAvTv7L7hc',
                    'https://youtu.be/Q92P2kjQJhw',
                    'https://youtu.be/BxMycL6PEWg'
                ]
            ],
            [
                'id' => 5,
                'title' => 'LEGS WORKOUT',
                'description' => 'Power up your lower body with squats, deadlifts, and leg isolation',
                'image' => 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Advanced',
                'type' => 'Strength',
                'equipment' => ['Barbell', 'Dumbbells', 'Leg Press', 'Squat Rack'],
                'targetMuscles' => ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
                'videoLinks' => [
                    'https://youtu.be/yhXvDOJRcX4',
                    'https://youtu.be/Icb_fq2yXZk',
                    'https://youtu.be/RR9TNQcqexY',
                    'https://youtu.be/_5B2AwA8vKE',
                    'https://youtu.be/OWL84VQJnPo',
                    'https://youtu.be/maq6g5DWbng',
                    'https://youtu.be/lujGa5WwtB8',
                    'https://youtu.be/8Jvz7Ih9s3s',
                    'https://youtu.be/6uHRFgQHwDs',
                    'https://youtu.be/QbvAh_aRWGA',
                    'https://youtu.be/WMEAfmhEoKg',
                    'https://youtu.be/rr8_suFwxxI',
                    'https://youtu.be/56lhH2oK2p0',
                    'https://youtu.be/TbEQh_gfhQw',
                    'https://youtu.be/03ZkHCXovYc',
                    'https://youtu.be/X5rf6cDQluw',
                    'https://youtu.be/1nh7ymbABXY',
                    'https://youtu.be/ihi01nuMVM0',
                    'https://youtu.be/opsibwL7_6k',
                    'https://youtu.be/McSfNQY5IyY',
                    'https://youtu.be/-3SGJWh9a8g',
                    'https://youtu.be/FLYwAQhHdVc',
                    'https://youtu.be/tZqhAn-APZE',
                    'https://youtu.be/I7BAJRA3c1g',
                    'https://youtu.be/31zcjMBA3hk',
                    'https://youtu.be/eWtS2IZE6DA'
                ]
            ],
            [
                'id' => 6,
                'title' => 'SHOULDER WORKOUT',
                'description' => 'Build impressive deltoids with pressing and lateral movements',
                'image' => 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Dumbbells', 'Barbell', 'Cable Machine'],
                'targetMuscles' => ['Deltoids', 'Rotator Cuff', 'Traps'],
                'videoLinks' => [
                    'https://youtu.be/8KMIcOKmFD0',
                    'https://youtu.be/JITeLkRsOh4',
                    'https://youtu.be/m5yWt8A4GQM',
                    'https://youtu.be/5rv2OnMsd1I',
                    'https://youtu.be/i6RC9ifs4D4'
                ]
            ],
            [
                'id' => 7,
                'title' => 'CONTEST PREP',
                'description' => 'Elite competition preparation program for serious athletes looking to compete at the highest level',
                'image' => '/Images/workout/Contest-Prep-768x432.jpg',
                'difficulty' => 'Expert',
                'type' => 'Competition',
                'equipment' => ['Full Gym Access', 'All Equipment'],
                'targetMuscles' => ['Full Body', 'Competition Focus'],
                'detailedDescription' => 'UltraFlex Contest Prep is our most elite program, designed specifically for athletes preparing for bodybuilding, physique, or fitness competitions. This comprehensive program combines advanced training methodologies with precise nutritional guidance and mental preparation strategies.

Our contest prep program is built on years of experience working with competitive athletes at all levels, from local competitions to professional stages. We understand that preparing for a contest requires more than just training hard – it demands a scientific approach to every aspect of your preparation.

The program includes periodized training phases that progressively build muscle while simultaneously reducing body fat to competition levels. Our experienced coaches work with you to develop a customized approach that takes into account your individual body type, strengths, weaknesses, and competition timeline.

Training sessions focus on muscle symmetry, proportion, and conditioning. We emphasize both the development of muscle mass in lagging areas and the refinement of already strong points. Posing practice is integrated throughout the program to ensure you present your physique at its absolute best on stage.

Nutritional guidance is provided by certified sports nutritionists who specialize in contest preparation. We create detailed meal plans that are adjusted weekly based on your progress, ensuring optimal muscle preservation while achieving the low body fat levels required for competition.

Mental preparation is often overlooked but crucial for contest success. Our program includes strategies for maintaining motivation during the challenging phases of prep, managing stress, and developing the confidence needed to perform on stage.

Peak week protocols are carefully planned and executed to ensure you arrive at your competition in optimal condition. We handle every detail from water manipulation to carbohydrate loading, taking the guesswork out of this critical final phase.',
                'faq' => [
                    [
                        'question' => 'How long before my competition should I start contest prep?',
                        'answer' => 'Contest prep duration varies based on your starting condition and competition goals. Generally, we recommend 12-20 weeks for most athletes. Those with more body fat to lose or less competitive experience may benefit from a longer prep period of 20-24 weeks. We assess each individual\'s starting point during the initial consultation to determine the optimal timeline.'
                    ],
                    [
                        'question' => 'What experience level is required for contest prep?',
                        'answer' => 'While contest prep is our most advanced program, we work with athletes at various experience levels. However, we recommend having at least 1-2 years of consistent training experience and a solid understanding of nutrition basics before beginning contest preparation. First-time competitors are welcome and receive additional guidance throughout the process.'
                    ],
                    [
                        'question' => 'Is cardio included in the contest prep program?',
                        'answer' => 'Yes, cardiovascular training is a crucial component of contest prep. We start with moderate amounts and adjust frequency, intensity, and duration based on your progress. Our approach prioritizes muscle preservation while effectively reducing body fat. The cardio prescription is individualized and modified weekly based on your results.'
                    ],
                    [
                        'question' => 'Do you provide posing coaching?',
                        'answer' => 'Absolutely! Posing is an integral part of contest preparation. We provide comprehensive posing instruction including mandatory poses for your division, routine choreography, stage presence training, and practice sessions. Many competitions are won or lost based on posing, so we ensure you\'re fully prepared to showcase your physique effectively.'
                    ],
                    [
                        'question' => 'What ongoing support is provided during prep?',
                        'answer' => 'Contest prep requires constant monitoring and adjustment. You\'ll receive weekly check-ins with progress photos, measurements, and weight tracking. Nutrition and training plans are adjusted based on your progress. We also provide 24/7 support via messaging for questions or concerns that arise between sessions. Peak week includes daily communication to ensure everything goes perfectly.'
                    ]
                ]
            ]
        ];

        // Find the workout by ID
        $workout = collect($workouts)->firstWhere('id', (int)$id);

        if (!$workout) {
            abort(404, 'Workout not found');
        }

        return Inertia::render('Members/Workouts-Show', [
            'workout' => $workout,
        ]);
    }
}