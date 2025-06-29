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
                    'title' => 'Full Body HIIT',
                    'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
                    'duration' => '30 min',
                    'difficulty' => 'Intermediate',
                    'type' => 'HIIT'
                ],
                [
                    'id' => 2,
                    'title' => 'Strength Training Basics',
                    'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop&crop=center',
                    'duration' => '45 min',
                    'difficulty' => 'Beginner',
                    'type' => 'Strength'
                ]
            ],
            'nutrition' => [
                [
                    'id' => 1,
                    'title' => 'Post-Workout Protein Bowl',
                    'image' => 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop&crop=center',
                    'prepTime' => '15 min',
                    'calories' => 350,
                    'goal' => 'Muscle Gain'
                ],
                [
                    'id' => 2,
                    'title' => 'Green Energy Smoothie',
                    'image' => 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&h=400&fit=crop&crop=center',
                    'prepTime' => '5 min',
                    'calories' => 180,
                    'goal' => 'Energy Boost'
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