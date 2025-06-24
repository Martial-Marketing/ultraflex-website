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
                'image' => '/images/trainers/sarah.jpg',
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
                'image' => '/images/trainers/mike.jpg',
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
                'image' => '/images/trainers/emma.jpg',
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
                'image' => '/images/trainers/james.jpg',
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
            ['name' => 'Downtown UltraFlex', 'slug' => 'downtown-ultraflex'],
            ['name' => 'Westside UltraFlex', 'slug' => 'westside-ultraflex'],
            ['name' => 'North UltraFlex', 'slug' => 'north-ultraflex']
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
        // In a real app, you'd fetch this from the database by slug
        $trainerData = [
            'id' => 1,
            'name' => 'Sarah Johnson',
            'image' => '/images/trainers/sarah.jpg',
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
        ];

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