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
use Illuminate\Support\Facades\Route;

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
Route::get('/login', function () {
    return inertia('Auth/Login');
})->name('auth.login');

Route::get('/register', function () {
    return inertia('Auth/Register');
})->name('auth.register');

// Protected Member Routes
Route::middleware(['auth'])->group(function () {
    
    // Members Hub
    Route::get('/members', [MemberController::class, 'index'])->name('members.index');
    
    // Workouts
    Route::get('/members/workouts', [WorkoutController::class, 'index'])->name('members.workouts');
    
    // Nutrition
    Route::get('/members/nutrition', [NutritionController::class, 'index'])->name('members.nutrition');
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    
});


Route::post('/register', function (Request $request) {
    return redirect()->back()->with('success', 'Registration form submitted!');
})->name('register.store');
// require __DIR__.'/auth.php'; // Remove this line if auth.php doesn't exist