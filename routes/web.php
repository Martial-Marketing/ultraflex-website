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
use App\Http\Controllers\Auth\SocialAuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\File;

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
Route::get('/login', [LoginController::class, 'index'])->name('login'); // alias conventional
Route::post('/login', [LoginController::class, 'store'])->name('auth.login.store');
Route::post('/logout', [LoginController::class, 'destroy'])->name('auth.logout');

// Social Authentication (Google)
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store'])->name('auth.register.store');

// Email Verification
Route::middleware('auth')->group(function () {
    Route::get('/verify-email', function (Request $request) {
        return inertia('Auth/VerifyEmail', [
            'status' => session('status'),
        ]);
    })->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect()->route('dashboard', ['verified' => 1]);
    })->middleware(['signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return back();
        }
        $request->user()->sendEmailVerificationNotification();
        return back()->with('status', 'verification-link-sent');
    })->name('verification.send');

    // Password Confirmation
    Route::get('/confirm-password', function () {
        return inertia('Auth/ConfirmPassword');
    })->name('password.confirm');

    Route::post('/confirm-password', function (Request $request) {
        $request->validate(['password' => 'required']);
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            return back()->withErrors(['password' => __('auth.password')]);
        }
        session(['auth.password_confirmed_at' => time()]);
        return redirect()->intended();
    });

    // Settings - Profile
    Route::get('/settings/profile', function (Request $request) {
        return inertia('Settings/Profile', [
            'user' => $request->user(),
        ]);
    });
    Route::patch('/settings/profile', function (Request $request) {
        $user = $request->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);
        $emailChanged = $validated['email'] !== $user->email;
        $user->fill($validated);
        if ($emailChanged) {
            $user->email_verified_at = null; // force re-verify
        }
        $user->save();
        return redirect('/settings/profile');
    });
    Route::delete('/settings/profile', function (Request $request) {
        $request->validate(['password' => 'required']);
        $user = $request->user();
        if (! Auth::guard('web')->validate([
            'email' => $user->email,
            'password' => $request->password,
        ])) {
            return back()->withErrors(['password' => 'Incorrect password']);
        }
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    });

    // Settings - Password
    Route::get('/settings/password', function () {
        return inertia('Settings/Password');
    });
    Route::put('/settings/password', function (Request $request) {
        $validated = $request->validate([
            'current_password' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $validated['current_password'],
        ])) {
            return back()->withErrors(['current_password' => 'Incorrect password']);
        }
        $request->user()->update([
            'password' => $validated['password'],
        ]);
        return redirect('/settings/password');
    });
});

// Password Reset (guest)
Route::get('/forgot-password', function () {
    return inertia('Auth/ForgotPassword');
})->middleware('guest')->name('password.request');

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);
    $status = Password::sendResetLink($request->only('email'));
    return $status === Password::RESET_LINK_SENT
        ? back()->with(['status' => __($status)])
        : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

Route::get('/reset-password/{token}', function (string $token) {
    return inertia('Auth/ResetPassword', ['token' => $token]);
})->middleware('guest')->name('password.reset');

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => $password,
            ])->save();
        }
    );

    return $status == Password::PASSWORD_RESET
        ? redirect()->route('login')->with('status', __($status))
        : back()->withErrors(['email' => [__($status)]]);
})->middleware('guest')->name('password.update');

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

    // User dashboard (generic dashboard route expected by tests)
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
});

// Admin dashboard (if needed) - assuming separate middleware in future
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

// Gym Rules & Etiquette
Route::get('/gymrules', [\App\Http\Controllers\GymRulesController::class, 'index'])->name('gymrules');

// Basic legal pages (placeholder inertia routes)
Route::get('/privacy', function (Request $request) {
    return inertia('Legal/Privacy', [
        'auth' => ['user' => $request->user()],
    ]);
})->name('privacy');

Route::get('/terms', function (Request $request) {
    return inertia('Legal/Terms', [
        'auth' => ['user' => $request->user()],
    ]);
})->name('terms');

Route::get('/cookies', function (Request $request) {
    return inertia('Legal/Cookies', [
        'auth' => ['user' => $request->user()],
    ]);
})->name('cookies');

Route::get('/accessibility', function (Request $request) {
    return inertia('Legal/Accessibility', [
        'auth' => ['user' => $request->user()],
    ]);
})->name('accessibility');

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

use App\Http\Controllers\AboutController;
use App\Http\Controllers\MembershipController;
// About Us
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Membership Location Selector
Route::get('/membership', [MembershipController::class, 'index'])->name('membership');

// Gallery
Route::get('/gallery', function (Request $request) {
    // For demo purposes gather some images from public Images directories
    $base = public_path('Images');
    $patterns = [
        $base.'/york/*.webp',
        $base.'/hull/*.webp',
        $base.'/durham/*.webp',
        $base.'/lincoln/*.webp',
        $base.'/rotherham/*.webp',
        $base.'/westleeds/*.webp',
    ];
    $images = [];
    foreach ($patterns as $pattern) {
        foreach (glob($pattern) as $match) {
            $rel = str_replace(public_path(), '', $match);
            $images[] = $rel;
            if (count($images) >= 40) break 2; // cap
        }
    }
    return inertia('Gallery/Index', [
        'images' => $images,
        'auth' => ['user' => $request->user()],
    ]);
})->name('gallery.index');