<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerController extends Controller
{
    public function index()
    {
        $trainers = [
            [
                'id' => 1,
                'name' => 'Sarah Johnson',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face',
                'bio' => 'Certified personal trainer with 8+ years of experience specializing in strength training and weight loss.',
                'specialties' => ['Strength Training', 'Weight Loss', 'Functional Training'],
                'gender' => 'Female',
                'location' => 'Downtown UltraFlex',
                'locationSlug' => 'downtown-ultraflex',
                'rating' => 4.9,
                'reviewCount' => 127,
                'experience' => '8+ years experience',
                'certifications' => ['ACSM-CPT', 'NASM-CES', 'Precision Nutrition Level 1'],
                'slug' => 'sarah-johnson'
            ],
            [
                'id' => 2,
                'name' => 'Mike Chen',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face',
                'bio' => 'Former competitive bodybuilder turned personal trainer, specializing in muscle building and nutrition.',
                'specialties' => ['Bodybuilding', 'Nutrition Coaching', 'Strength & Conditioning'],
                'gender' => 'Male',
                'location' => 'Westside UltraFlex',
                'locationSlug' => 'westside-ultraflex',
                'rating' => 4.8,
                'reviewCount' => 89,
                'experience' => '6+ years experience',
                'certifications' => ['NSCA-CSCS', 'ISSN-CNS', 'NASM-CPT'],
                'slug' => 'mike-chen'
            ],
            [
                'id' => 3,
                'name' => 'Emma Davis',
                'image' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face',
                'bio' => 'Yoga instructor and wellness coach passionate about helping clients achieve balance in fitness and life.',
                'specialties' => ['Yoga', 'Pilates', 'Flexibility Training', 'Wellness Coaching'],
                'gender' => 'Female',
                'location' => 'North UltraFlex',
                'locationSlug' => 'north-ultraflex',
                'rating' => 5.0,
                'reviewCount' => 156,
                'experience' => '10+ years experience',
                'certifications' => ['RYT-500', 'Pilates Method Alliance', 'ACE-CPT'],
                'slug' => 'emma-davis'
            ],
            [
                'id' => 4,
                'name' => 'James Rodriguez',
                'image' => 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=500&fit=crop&crop=face',
                'bio' => 'High-performance coach specializing in athletic training and sports-specific conditioning.',
                'specialties' => ['Athletic Performance', 'Sports Conditioning', 'Injury Prevention'],
                'gender' => 'Male',
                'location' => 'Downtown UltraFlex',
                'locationSlug' => 'downtown-ultraflex',
                'rating' => 4.9,
                'reviewCount' => 73,
                'experience' => '5+ years experience',
                'certifications' => ['CSCS', 'USAW-L1', 'FMS-L2'],
                'slug' => 'james-rodriguez'
            ]
        ];

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

        $specialties = [
            'Strength Training',
            'Weight Loss',
            'Bodybuilding',
            'Nutrition Coaching',
            'Yoga',
            'Pilates',
            'Athletic Performance',
            'Functional Training',
            'Sports Conditioning',
            'Flexibility Training',
            'Wellness Coaching',
            'Injury Prevention'
        ];

        return Inertia::render('Trainers/Index', [
            'trainers' => $trainers,
            'locations' => $locations,
            'specialties' => $specialties
        ]);
    }

    public function show($trainer)
    {
        // Define all trainer data
        $allTrainersData = [
            'sarah-johnson' => [
                'id' => 1,
                'name' => 'Sarah Johnson',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=face',
                'bio' => 'Certified personal trainer with 8+ years of experience specializing in strength training and weight loss.',
                'detailedBio' => 'Sarah began her fitness journey over a decade ago and has since become one of the most sought-after personal trainers in the city. With a background in exercise science and multiple certifications, she brings both knowledge and passion to every session. Sarah believes in creating sustainable, enjoyable fitness routines that fit into her clients\' busy lives.',
                'specialties' => ['Strength Training', 'Weight Loss', 'Functional Training'],
                'gender' => 'Female',
                'location' => 'Downtown UltraFlex',
                'locationSlug' => 'downtown-ultraflex',
                'rating' => 4.9,
                'reviewCount' => 127,
                'experience' => '8+ years experience',
                'certifications' => ['ACSM-CPT', 'NASM-CES', 'Precision Nutrition Level 1'],
                'qualifications' => [
                    'B.S. Exercise Science - University of London',
                    'Certified Strength & Conditioning Specialist',
                    'Precision Nutrition Level 1 Coach'
                ],
                'philosophy' => 'I believe fitness should be challenging, fun, and sustainable. My goal is to help you build not just a stronger body, but also the confidence and knowledge to maintain your results for life.',
                'achievements' => [
                    'Helped over 500 clients achieve their fitness goals',
                    'Featured in Fitness Magazine as "Trainer of the Year" 2023',
                    'Continuing education in sports nutrition and injury prevention'
                ],
                'socialMedia' => [
                    'instagram' => 'https://instagram.com/sarahj_fitness',
                    'facebook' => 'https://facebook.com/sarahjohnsonpt'
                ],
                'sessionTypes' => [
                    [
                        'type' => 'Personal Training Session',
                        'duration' => '60 minutes',
                        'price' => 65
                    ],
                    [
                        'type' => 'Small Group Training (2-4 people)',
                        'duration' => '60 minutes',
                        'price' => 35
                    ],
                    [
                        'type' => 'Initial Consultation & Assessment',
                        'duration' => '90 minutes',
                        'price' => 50
                    ]
                ],
                'availability' => [
                    [
                        'day' => 'Monday',
                        'times' => ['6:00 AM', '7:00 AM', '12:00 PM', '5:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Tuesday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Wednesday',
                        'times' => ['6:00 AM', '7:00 AM', '12:00 PM', '5:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Thursday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Friday',
                        'times' => ['6:00 AM', '7:00 AM', '12:00 PM', '5:00 PM']
                    ],
                    [
                        'day' => 'Saturday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM']
                    ],
                    [
                        'day' => 'Sunday',
                        'times' => ['Not Available']
                    ]
                ],
                'testimonials' => [
                    [
                        'id' => 1,
                        'name' => 'Jessica Miller',
                        'rating' => 5,
                        'comment' => 'Sarah completely transformed my approach to fitness. I\'ve lost 30 pounds and gained so much confidence!',
                        'date' => 'May 15, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Tom Wilson',
                        'rating' => 5,
                        'comment' => 'Best trainer I\'ve ever worked with. Sarah makes every session challenging but fun.',
                        'date' => 'April 22, 2025'
                    ],
                    [
                        'id' => 3,
                        'name' => 'Amanda Clarke',
                        'rating' => 5,
                        'comment' => 'Sarah\'s knowledge of nutrition and training is incredible. Highly recommend!',
                        'date' => 'April 8, 2025'
                    ]
                ]
            ],
            'mike-chen' => [
                'id' => 2,
                'name' => 'Mike Chen',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=face',
                'bio' => 'Former competitive bodybuilder turned personal trainer, specializing in muscle building and nutrition.',
                'detailedBio' => 'Mike\'s journey began in competitive bodybuilding where he learned the science behind muscle growth and nutrition. After retiring from competition, he dedicated his life to helping others achieve their physique goals. His approach combines proven bodybuilding techniques with modern sports science to deliver exceptional results.',
                'specialties' => ['Bodybuilding', 'Nutrition Coaching', 'Strength & Conditioning'],
                'gender' => 'Male',
                'location' => 'Westside UltraFlex',
                'locationSlug' => 'westside-ultraflex',
                'rating' => 4.8,
                'reviewCount' => 89,
                'experience' => '6+ years experience',
                'certifications' => ['NSCA-CSCS', 'ISSN-CNS', 'NASM-CPT'],
                'qualifications' => [
                    'B.S. Kinesiology - California State University',
                    'Certified Sports Nutritionist',
                    'Former NPC Bodybuilding Competitor'
                ],
                'philosophy' => 'Building muscle is both an art and a science. I help you master both the physical training and the mental discipline needed to transform your physique.',
                'achievements' => [
                    'Helped 300+ clients build their dream physiques',
                    'NPC Bodybuilding Champion 2019',
                    'Certified Sports Nutrition Specialist'
                ],
                'socialMedia' => [
                    'instagram' => 'https://instagram.com/mikechen_fit',
                    'facebook' => 'https://facebook.com/mikechenbodybuilding'
                ],
                'sessionTypes' => [
                    [
                        'type' => 'Bodybuilding Training Session',
                        'duration' => '75 minutes',
                        'price' => 70
                    ],
                    [
                        'type' => 'Nutrition Consultation',
                        'duration' => '60 minutes',
                        'price' => 60
                    ],
                    [
                        'type' => 'Physique Assessment',
                        'duration' => '90 minutes',
                        'price' => 55
                    ]
                ],
                'availability' => [
                    [
                        'day' => 'Monday',
                        'times' => ['7:00 AM', '8:00 AM', '1:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Tuesday',
                        'times' => ['7:00 AM', '8:00 AM', '1:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Wednesday',
                        'times' => ['7:00 AM', '8:00 AM', '1:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Thursday',
                        'times' => ['7:00 AM', '8:00 AM', '1:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Friday',
                        'times' => ['7:00 AM', '8:00 AM', '1:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Saturday',
                        'times' => ['9:00 AM', '10:00 AM', '11:00 AM']
                    ],
                    [
                        'day' => 'Sunday',
                        'times' => ['Not Available']
                    ]
                ],
                'testimonials' => [
                    [
                        'id' => 1,
                        'name' => 'David Rodriguez',
                        'rating' => 5,
                        'comment' => 'Mike helped me gain 15 pounds of muscle in 6 months. His nutrition knowledge is incredible!',
                        'date' => 'May 20, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Alex Thompson',
                        'rating' => 5,
                        'comment' => 'Best bodybuilding coach I\'ve worked with. Mike knows how to push you to your limits.',
                        'date' => 'April 15, 2025'
                    ]
                ]
            ],
            'emma-davis' => [
                'id' => 3,
                'name' => 'Emma Davis',
                'image' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&crop=face',
                'bio' => 'Yoga instructor and wellness coach passionate about helping clients achieve balance in fitness and life.',
                'detailedBio' => 'Emma discovered yoga during a stressful period in her corporate career and it completely transformed her life. She left the corporate world to pursue her passion for wellness and has since helped hundreds of clients find balance, flexibility, and peace through mindful movement practices.',
                'specialties' => ['Yoga', 'Pilates', 'Flexibility Training', 'Wellness Coaching'],
                'gender' => 'Female',
                'location' => 'North UltraFlex',
                'locationSlug' => 'north-ultraflex',
                'rating' => 5.0,
                'reviewCount' => 156,
                'experience' => '10+ years experience',
                'certifications' => ['RYT-500', 'Pilates Method Alliance', 'ACE-CPT'],
                'qualifications' => [
                    'RYT-500 Yoga Teacher Training',
                    'Pilates Method Alliance Certification',
                    'Wellness Coach Certification'
                ],
                'philosophy' => 'True fitness comes from harmony between mind, body, and spirit. I help you develop strength, flexibility, and inner peace through mindful movement.',
                'achievements' => [
                    'Trained over 1000 students in yoga and wellness',
                    'Featured in Yoga Journal Magazine',
                    'Wellness retreat leader in Bali and Costa Rica'
                ],
                'socialMedia' => [
                    'instagram' => 'https://instagram.com/emma_yogaflow',
                    'facebook' => 'https://facebook.com/emmadaviswellness'
                ],
                'sessionTypes' => [
                    [
                        'type' => 'Private Yoga Session',
                        'duration' => '60 minutes',
                        'price' => 55
                    ],
                    [
                        'type' => 'Pilates Session',
                        'duration' => '60 minutes',
                        'price' => 60
                    ],
                    [
                        'type' => 'Wellness Consultation',
                        'duration' => '90 minutes',
                        'price' => 45
                    ]
                ],
                'availability' => [
                    [
                        'day' => 'Monday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM', '4:00 PM', '5:00 PM']
                    ],
                    [
                        'day' => 'Tuesday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM', '4:00 PM', '5:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Wednesday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM', '4:00 PM', '5:00 PM']
                    ],
                    [
                        'day' => 'Thursday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM', '4:00 PM', '5:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Friday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM', '4:00 PM']
                    ],
                    [
                        'day' => 'Saturday',
                        'times' => ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM']
                    ],
                    [
                        'day' => 'Sunday',
                        'times' => ['10:00 AM', '11:00 AM', '12:00 PM']
                    ]
                ],
                'testimonials' => [
                    [
                        'id' => 1,
                        'name' => 'Sarah Martinez',
                        'rating' => 5,
                        'comment' => 'Emma\'s classes are transformative. I\'ve never felt more balanced and centered.',
                        'date' => 'May 18, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Jennifer Liu',
                        'rating' => 5,
                        'comment' => 'Amazing instructor! Emma helped me overcome years of back pain through yoga.',
                        'date' => 'April 25, 2025'
                    ]
                ]
            ],
            'james-rodriguez' => [
                'id' => 4,
                'name' => 'James Rodriguez',
                'image' => 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&h=600&fit=crop&crop=face',
                'bio' => 'High-performance coach specializing in athletic training and sports-specific conditioning.',
                'detailedBio' => 'James has worked with professional athletes across multiple sports, helping them achieve peak performance and prevent injuries. His background in sports science and hands-on experience with elite athletes gives him unique insights into what it takes to excel in competitive environments.',
                'specialties' => ['Athletic Performance', 'Sports Conditioning', 'Injury Prevention'],
                'gender' => 'Male',
                'location' => 'Downtown UltraFlex',
                'locationSlug' => 'downtown-ultraflex',
                'rating' => 4.9,
                'reviewCount' => 73,
                'experience' => '5+ years experience',
                'certifications' => ['CSCS', 'USAW-L1', 'FMS-L2'],
                'qualifications' => [
                    'M.S. Sports Performance - University of Texas',
                    'Certified Strength & Conditioning Specialist',
                    'Olympic Weightlifting Coach Level 1'
                ],
                'philosophy' => 'Every athlete has untapped potential. My job is to unlock that potential through scientific training methods and relentless dedication to improvement.',
                'achievements' => [
                    'Trained 5 professional athletes to championship level',
                    'Reduced injury rates by 40% in client athletes',
                    'Published research on sports performance optimization'
                ],
                'socialMedia' => [
                    'instagram' => 'https://instagram.com/jamesrodriguez_performance',
                    'facebook' => 'https://facebook.com/jamesrodriguezcoach'
                ],
                'sessionTypes' => [
                    [
                        'type' => 'Athletic Performance Training',
                        'duration' => '90 minutes',
                        'price' => 80
                    ],
                    [
                        'type' => 'Sports-Specific Conditioning',
                        'duration' => '75 minutes',
                        'price' => 75
                    ],
                    [
                        'type' => 'Movement Assessment',
                        'duration' => '60 minutes',
                        'price' => 65
                    ]
                ],
                'availability' => [
                    [
                        'day' => 'Monday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Tuesday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Wednesday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM']
                    ],
                    [
                        'day' => 'Thursday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM', '7:00 PM']
                    ],
                    [
                        'day' => 'Friday',
                        'times' => ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM']
                    ],
                    [
                        'day' => 'Saturday',
                        'times' => ['8:00 AM', '9:00 AM', '10:00 AM']
                    ],
                    [
                        'day' => 'Sunday',
                        'times' => ['Not Available']
                    ]
                ],
                'testimonials' => [
                    [
                        'id' => 1,
                        'name' => 'Marcus Johnson',
                        'rating' => 5,
                        'comment' => 'James took my athletic performance to the next level. His training methods are incredible!',
                        'date' => 'May 12, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Lisa Chen',
                        'rating' => 5,
                        'comment' => 'Best sports performance coach I\'ve worked with. James knows how to push athletes safely.',
                        'date' => 'April 30, 2025'
                    ]
                ]
            ]
        ];

        // Get the trainer data based on the slug
        $trainerData = $allTrainersData[$trainer] ?? null;

        // If trainer not found, you might want to handle this with a 404
        if (!$trainerData) {
            abort(404, 'Trainer not found');
        }

        return Inertia::render('Trainers/Show', [
            'trainer' => $trainerData
        ]);
    }

    public function contact(Request $request, $trainer)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
            'preferred_session' => 'nullable|string|max:255',
        ]);

        // Here you would typically:
        // 1. Save the enquiry to database
        // 2. Send email to trainer
        // 3. Send confirmation email to client

        return redirect()->back()->with('success', 'Your message has been sent! The trainer will get back to you within 24 hours.');
    }
}