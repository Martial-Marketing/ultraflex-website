<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    public function index()
    {
        // Sample workout data - replace with actual database queries
        $workouts = [
            [
                'id' => 1,
                'title' => 'Full Body Strength Training',
                'description' => 'Build muscle and increase strength with this comprehensive workout',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop&crop=center',
                'duration' => '45 min',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Dumbbells', 'Barbell', 'Bench'],
                'targetMuscles' => ['Chest', 'Back', 'Legs', 'Arms'],
                'calories' => 350
            ],
            [
                'id' => 2,
                'title' => 'High-Intensity Cardio Blast',
                'description' => 'Burn calories and improve cardiovascular health',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
                'duration' => '30 min',
                'difficulty' => 'Advanced',
                'type' => 'HIIT',
                'equipment' => ['None'],
                'targetMuscles' => ['Full Body'],
                'calories' => 400
            ],
            [
                'id' => 3,
                'title' => 'Morning Yoga Flow',
                'description' => 'Start your day with gentle stretches and mindfulness',
                'image' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop&crop=center',
                'duration' => '20 min',
                'difficulty' => 'Beginner',
                'type' => 'Yoga',
                'equipment' => ['Yoga Mat'],
                'targetMuscles' => ['Core', 'Flexibility'],
                'calories' => 120
            ],
            [
                'id' => 4,
                'title' => 'Core Power Pilates',
                'description' => 'Strengthen your core and improve posture',
                'image' => 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=400&fit=crop&crop=center',
                'duration' => '35 min',
                'difficulty' => 'Intermediate',
                'type' => 'Pilates',
                'equipment' => ['Mat', 'Resistance Band'],
                'targetMuscles' => ['Core', 'Glutes'],
                'calories' => 200
            ],
            [
                'id' => 5,
                'title' => 'Upper Body Pump',
                'description' => 'Focus on building strong arms, chest, and back',
                'image' => 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=400&fit=crop&crop=center',
                'duration' => '40 min',
                'difficulty' => 'Intermediate',
                'type' => 'Strength',
                'equipment' => ['Dumbbells', 'Pull-up Bar'],
                'targetMuscles' => ['Chest', 'Back', 'Arms', 'Shoulders'],
                'calories' => 300
            ],
            [
                'id' => 6,
                'title' => 'Flexibility & Mobility',
                'description' => 'Improve range of motion and prevent injury',
                'image' => 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=400&fit=crop&crop=center',
                'duration' => '25 min',
                'difficulty' => 'Beginner',
                'type' => 'Flexibility',
                'equipment' => ['Yoga Mat', 'Foam Roller'],
                'targetMuscles' => ['Full Body'],
                'calories' => 100
            ]
        ];

        return Inertia::render('Members/Workouts-Index', [
            'workouts' => $workouts,
        ]);
    }
}