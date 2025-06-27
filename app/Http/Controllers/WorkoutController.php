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
                'image' => '/Images/workout1.jpg',
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
                'image' => '/Images/workout2.jpg',
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
                'image' => '/Images/workout3.jpg',
                'duration' => '20 min',
                'difficulty' => 'Beginner',
                'type' => 'Yoga',
                'equipment' => ['Yoga Mat'],
                'targetMuscles' => ['Core', 'Flexibility'],
                'calories' => 120
            ]
        ];

        return Inertia::render('Members/Workouts-Index', [
            'workouts' => $workouts,
        ]);
    }
}