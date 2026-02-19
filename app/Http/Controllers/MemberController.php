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

        $workoutCategories = [
            [
                'name' => 'Core',
                'description' => 'Sculpt and strengthen your core',
                'count' => 1,
                'color' => 'bg-white/10',
                'icon' => 'C'
            ],
            [
                'name' => 'Strength',
                'description' => 'Build muscle and power',
                'count' => 5,
                'color' => 'bg-white/10',
                'icon' => 'S'
            ],
            [
                'name' => 'Competition',
                'description' => 'Elite competition preparation',
                'count' => 1,
                'color' => 'bg-white/10',
                'icon' => 'C'
            ]
        ];

        $featuredContent = [
            'workoutCategories' => $workoutCategories,
            'nutrition' => [
                [
                    'id' => 1,
                    'title' => 'ULTRAFLEX Cut',
                    'image' => '/Images/nutritionn/UF-Cut.jpg',
                    'prepTime' => '12 weeks',
                    'calories' => '1800-2200',
                    'goal' => 'Fat Loss'
                ],
                [
                    'id' => 2,
                    'title' => 'ULTRAFLEX Bulk',
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
                    'avatar' => $user->profile_image ?? null,
                    // Required fields in frontend types
                    'email_verified_at' => optional($user->email_verified_at)?->toISOString(),
                    'created_at' => $user->created_at?->toISOString(),
                    'updated_at' => $user->updated_at?->toISOString(),
                    // Extra UI fields tolerated by index signature
                    'memberSince' => $user->created_at->format('M Y'),
                    'membershipType' => 'Premium',
                    'profileImage' => $user->profile_image ?? null,
                ]
            ],
            'workoutStats' => $workoutStats,
            'recentActivity' => $recentActivity,
            'featuredContent' => $featuredContent,
        ]);
    }
}