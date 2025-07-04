<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $workoutStats = [
            'totalWorkouts' => 45,
            'thisWeek' => 3,
            'favoriteWorkout' => 'Strength Training',
            'totalHours' => 67
        ];

        $recentActivity = [
            [
                'id' => 1,
                'type' => 'workout',
                'title' => 'Upper Body Strength',
                'date' => '2 hours ago',
                'duration' => '45 min'
            ],
            [
                'id' => 2,
                'type' => 'nutrition',
                'title' => 'Protein Smoothie Recipe',
                'date' => 'Yesterday',
                'duration' => null
            ],
            [
                'id' => 3,
                'type' => 'workout',
                'title' => 'HIIT Cardio Session',
                'date' => '2 days ago',
                'duration' => '30 min'
            ]
        ];

        $featuredContent = [
            'workouts' => [
                [
                    'id' => 1,
                    'title' => 'ABS WORKOUT',
                    'image' => '/Images/workout/UF-Abs.jpg',
                    'duration' => '30 min',
                    'difficulty' => 'Intermediate',
                    'type' => 'Core'
                ],
                [
                    'id' => 2,
                    'title' => 'ARMS WORKOUT',
                    'image' => '/Images/workout/UF-ARMS-.png',
                    'duration' => '45 min',
                    'difficulty' => 'Intermediate',
                    'type' => 'Strength'
                ]
            ],
            'nutrition' => [
                [
                    'id' => 1,
                    'title' => 'UltraFlex Cut',
                    'image' => '/Images/nutritionn/UF-Cut.jpg',
                    'prepTime' => '12 weeks',
                    'calories' => '1800-2200',
                    'goal' => 'Fat Loss'
                ],
                [
                    'id' => 2,
                    'title' => 'UltraFlex Bulk',
                    'image' => '/Images/nutritionn/UF-Bulk.jpg',
                    'prepTime' => '16 weeks',
                    'calories' => '2800-3500',
                    'goal' => 'Muscle Gain'
                ]
            ]
        ];

        return Inertia::render('Members/Index', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'memberSince' => $user->created_at->format('M Y'),
                    'membershipType' => 'Premium',
                    'profileImage' => $user->profile_image ?? null,
                ]
            ],
            'workoutStats' => $workoutStats,
            'recentActivity' => $recentActivity,
            'featuredContent' => $featuredContent
        ]);
    }
}