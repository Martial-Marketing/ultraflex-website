<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\NutritionController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Homepage
Route::get('/', [HomeController::class, 'index'])->name('home');

// Locations
Route::get('/locations', [LocationController::class, 'index'])->name('locations.index');
Route::get('/locations/{location}', [LocationController::class, 'show'])->name('locations.show');

// Personal Trainers
Route::get('/trainers', [TrainerController::class, 'index'])->name('trainers.index');
Route::get('/trainers/{trainer}', [TrainerController::class, 'show'])->name('trainers.show');
Route::post('/trainers/{trainer}/contact', [TrainerController::class, 'contact'])->name('trainers.contact');

// Equipment
Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment.index');
Route::get('/equipment/{equipment}', [EquipmentController::class, 'show'])->name('equipment.show');

// Virtual Tours
Route::get('/tours', [TourController::class, 'index'])->name('tours.index');

// News/Blog
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{article}', [NewsController::class, 'show'])->name('news.show');

// Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Authentication Routes
Route::get('/login', [LoginController::class, 'index'])->name('auth.login');
Route::post('/login', [LoginController::class, 'store'])->name('auth.login.store');
Route::post('/logout', [LoginController::class, 'destroy'])->name('auth.logout');

Route::get('/register', [RegisterController::class, 'index'])->name('auth.register');
Route::post('/register', [RegisterController::class, 'store'])->name('auth.register.store');

// Protected Member Routes
Route::middleware(['auth'])->group(function () {
    
    // Members Hub
    Route::get('/members', [MemberController::class, 'index'])->name('members.index');
    
    // Workouts
    Route::get('/members/workouts', [WorkoutController::class, 'index'])->name('members.workouts');
    Route::get('/members/workouts/{id}', [WorkoutController::class, 'show'])->name('members.workouts.show');
    
    // Nutrition
    Route::get('/members/nutrition', [NutritionController::class, 'index'])->name('members.nutrition');
    Route::get('/members/nutrition/calculator', [NutritionController::class, 'calculator'])->name('members.nutrition.calculator');
    Route::get('/members/nutrition/calculator/diet', [NutritionController::class, 'dietCalculator'])->name('members.nutrition.calculator.diet');
    Route::get('/members/nutrition/calculator/bodyfat', [NutritionController::class, 'bodyFatCalculator'])->name('members.nutrition.calculator.bodyfat');
    Route::get('/members/nutrition/{id}', [NutritionController::class, 'show'])->name('members.nutrition.show');
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    
});

// Example page with layout
Route::get('/example-with-layout', function (Request $request) {
    return inertia('Example/WithLayout', [
        'auth' => [
            'user' => $request->user()
        ]
    ]);
})->name('example.layout');

// Example contact page with layout
Route::get('/example-contact-with-layout', function (Request $request) {
    return inertia('Example/ContactWithLayout', [
        'auth' => [
            'user' => $request->user()
        ],
        'locations' => [
            [
                'id' => 1,
                'name' => 'Downtown Location',
                'address' => '123 Main Street, Downtown',
                'phone' => '(555) 123-4567',
                'email' => 'downtown@ultraflex.com',
                'coordinates' => ['lat' => 40.7128, 'lng' => -74.0060]
            ],
            [
                'id' => 2,
                'name' => 'Westside Location', 
                'address' => '456 West Avenue, Westside',
                'phone' => '(555) 234-5678',
                'email' => 'westside@ultraflex.com',
                'coordinates' => ['lat' => 40.7580, 'lng' => -73.9855]
            ]
        ],
        'generalContact' => [
            'phone' => '(555) 123-4567',
            'email' => 'info@ultraflex.com',
            'address' => '123 Main Street, Downtown, NY 10001'
        ]
    ]);
})->name('example.contact.layout');

// require __DIR__.'/auth.php'; // Remove this line if auth.php doesn't exist