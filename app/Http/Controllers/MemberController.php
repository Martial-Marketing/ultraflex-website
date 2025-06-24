<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        
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
            ]
        ];

        $featuredContent = [
            'workouts' => [
                [
                    'id' => 1,
                    'title' => 'Full Body HIIT',
                    'image' => '/images/workouts/hiit.jpg',
                    'duration' => '30 min',
                    'difficulty' => 'Intermediate',
                    'type' => 'HIIT'
                ]
            ],
            'nutrition' => [
                [
                    'id' => 1,
                    'title' => 'Post-Workout Protein Bowl',
                    'image' => '/images/nutrition/protein-bowl.jpg',
                    'prepTime' => '15 min',
                    'calories' => 350,
                    'goal' => 'Muscle Gain'
                ]
            ]
        ];

        return Inertia::render('Members/Index', [
            'workoutStats' => $workoutStats,
            'recentActivity' => $recentActivity,
            'featuredContent' => $featuredContent
        ]);
    }
}