<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Members/Workouts/Index', [
            'workouts' => [], // Your workout data
            'types' => ['Full Body', 'Upper/Lower Split', 'Push/Pull/Legs'],
            'goals' => ['Muscle Gain', 'Fat Loss', 'Endurance'],
            'durations' => ['30 mins', '60 mins', '90 mins']
        ]);
    }
}