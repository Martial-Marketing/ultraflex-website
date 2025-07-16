<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GymRulesController extends Controller
{
    public function index()
    {
        return Inertia::render('GymRules');
    }
}
