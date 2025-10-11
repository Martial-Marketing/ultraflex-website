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
use Illuminate\Support\Str;

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
    $base = public_path('Images');

    // External image overrides per location (used while awaiting new local uploads)
    $externalImages = [
        // Derby: images provided via Dropbox; use raw=1 for inline display
        'derby' => [
            'https://www.dropbox.com/scl/fi/rskqdsy7pojj730bmntbx/DSC05684.jpeg?rlkey=pt39pjwzhadxjjxsvuuczh2gx&raw=1',
            'https://www.dropbox.com/scl/fi/qcs42onp3nbkbv4nrdx6x/DSC05689.jpeg?rlkey=v71ce5fb1baaiop6ipzslzdt2&raw=1',
            'https://www.dropbox.com/scl/fi/dk7xkz7ujqnb0z3p4m72b/DSC05697.jpeg?rlkey=0dh2nrsg9jok1xl9k5r6nrhpm&raw=1',
            'https://www.dropbox.com/scl/fi/5piandw32oii9rga1ei4s/DSC05724.jpeg?rlkey=guze3apjq3lpjylussgutzwla&raw=1',
            'https://www.dropbox.com/scl/fi/659v2gmy5imo5l6nyo3bq/DSC05731.jpeg?rlkey=i5eo1nih41kf3f0h1sg8tnxvr&raw=1',
            'https://www.dropbox.com/scl/fi/oa8w66dddjmx8ev3tfzc2/DSC05733.jpeg?rlkey=jag7gsha5op6ey6oaa6hqux0z&raw=1',
            'https://www.dropbox.com/scl/fi/ju6r5fo6t751pvmy59l8t/DSC05739.jpeg?rlkey=3f69e5eaj0nfgnjrr0z9nb2gc&raw=1',
            'https://www.dropbox.com/scl/fi/6vidj6dx9ibkkr6iksyls/DSC05762.jpeg?rlkey=oidthpzom5098daiujk83v34l&raw=1',
            'https://www.dropbox.com/scl/fi/wwbcch5jllmvq2yi3bivu/DSC05764.jpeg?rlkey=1xofpyqh6zilpjkxh4iypufda&raw=1',
            'https://www.dropbox.com/scl/fi/hhmgdgsyesw7m8c111byy/DSC05780.jpeg?rlkey=tuasn0bzhws9xrgsvu55gy7eh&raw=1',
            'https://www.dropbox.com/scl/fi/oz0bw7b05l0ps7ofuzi8b/DSC05805.jpeg?rlkey=h8gj3w261j7q78z6wtmjwbks7&raw=1',
            'https://www.dropbox.com/scl/fi/p3qdj1oompuvpo2d1esoa/DSC05816.jpeg?rlkey=7zwmduvng2v7frznxx8otl923&raw=1',
            'https://www.dropbox.com/scl/fi/tbo66lbci5nz6fjkx0yx8/DSC05818.jpeg?rlkey=5nkbxp3ckou9e0fd3u8gxgru3&raw=1',
            'https://www.dropbox.com/scl/fi/j2oanoz5d2x04fjv4eq5t/DSC05828.jpeg?rlkey=9wxnsf6gx7l2htpty3vnh3cbf&raw=1',
        ],
        // Hull: images provided via Dropbox
        'hull' => [
            'https://www.dropbox.com/scl/fi/in4ej490anf23ipvx8ewi/IMG-4.jpg?rlkey=v2ampzl63i13a2ab1y6fhnuw2&raw=1',
            'https://www.dropbox.com/scl/fi/8whbqkx4jslrx9ec3q9fv/IMG-15.jpg?rlkey=0fdsni86elpsj5ap9e3x59gux&raw=1',
            'https://www.dropbox.com/scl/fi/k809s2y4onmg0h55ygydy/IMG-19.jpg?rlkey=5nn6hfdtcosuek7pq3zke98cf&raw=1',
            'https://www.dropbox.com/scl/fi/13i8gj5zsb3ss58ed4lle/IMG-27.jpg?rlkey=lwexgkujdo64u8p51bz5hswn7&raw=1',
            'https://www.dropbox.com/scl/fi/8n1f55sclfuhw9lxyqp7d/IMG-34.jpg?rlkey=j8lx1534nrioyz17ki4yjdifw&raw=1',
            'https://www.dropbox.com/scl/fi/1p7l0kjuy4z0ghy5utb1r/Photo-07-10-2025-16-46-52.jpg?rlkey=vzzyp8up3az298uoq2l91vfmr&raw=1',
        ],
        // Lincoln: images provided via Dropbox
        'lincoln' => [
            'https://www.dropbox.com/scl/fi/eq90b2fzy2eur6fyab9d6/ultraflex-full-8.jpg?rlkey=ei4vcglt6cf2z7eihho9xm2cy&raw=1',
            'https://www.dropbox.com/scl/fi/zvenze3pz13k34lua8bcs/ultraflex-full-4637.jpg?rlkey=yp2nux73846dzdrc9rxmhi5iu&raw=1',
            'https://www.dropbox.com/scl/fi/4ay06ko4jyu0z819axnhn/ultraflex-full-4711.jpg?rlkey=5pbfodxwu6ea3gndx2den7z34&raw=1',
            'https://www.dropbox.com/scl/fi/qio6w7qnyuw8t2zn0ye2r/ultraflex-full-4722.jpg?rlkey=wy66dnev34w6xz3y4j9cj0ayl&raw=1',
            'https://www.dropbox.com/scl/fi/7a45mbgqyv386r8jzex0b/ultraflex-full-4814.jpg?rlkey=kxpwzpc0irruwaoz0m5vp20qg&raw=1',
            'https://www.dropbox.com/scl/fi/4mvjodehjwj6g6avnvyta/ultraflex-full-4849.jpg?rlkey=ws4ut5m8hut0oa9fo04pky9h1&raw=1',
            'https://www.dropbox.com/scl/fi/dij1ym92btemztkask47v/ultraflex-full-4859.jpg?rlkey=67f1lm89u453da197ihz9dycw&raw=1',
            'https://www.dropbox.com/scl/fi/pdulj4pozuwoqjnez6ety/Ultraflex-2.jpg?rlkey=8womnmv9x3x86ci3f6h10wfbs&raw=1',
            'https://www.dropbox.com/scl/fi/bcctusmubqmrfhqs1ys5d/Ultraflex-5036.jpg?rlkey=61cmlq3znsrjdg7nbmdf5804a&raw=1',
            'https://www.dropbox.com/scl/fi/i1ds1aspf6gz4m2wvjpuk/Ultraflex-5042.jpg?rlkey=oe7nv0al7g8xxauvr3jfl5l6w&raw=1',
            'https://www.dropbox.com/scl/fi/b2tdsb0uudvolgqe370so/Ultraflex-5065.jpg?rlkey=emtzmggg3luetgepkma4tvrfn&raw=1',
            'https://www.dropbox.com/scl/fi/lk0kgnz8r8ar97xtmwacy/Ultraflex-5123.jpg?rlkey=f4pm0ra903itoo8kl4rigsh4q&raw=1',
            'https://www.dropbox.com/scl/fi/6a03y29gms5kjtv3yail8/Ultraflex-5163.jpg?rlkey=8y9e5v6opmgn8lgwwj2dv56tx&raw=1',
        ],
        // Normanton: images provided via Dropbox
        'normanton' => [
            'https://www.dropbox.com/scl/fi/y1nva7472ko6hgbgr0nze/Ultraflex-5183.jpg?rlkey=by2cb42i3g48nphfwg01ahpd9&raw=1',
            'https://www.dropbox.com/scl/fi/5xdd95r5tjj0hm07yczpj/IMG_-58.jpg?rlkey=pzx38w997h2wv9mwn6v7fnsp5&raw=1',
            'https://www.dropbox.com/scl/fi/opc56ztx9i10xuskj7zqt/IMG_-61.jpg?rlkey=w26853ezlwwqt1hgvv4t89atw&raw=1',
            'https://www.dropbox.com/scl/fi/54o1rm8vx5qt5ol1vhyq4/IMG_-63.jpg?rlkey=qez2uxt3j12qgbf7ybhb5skit&raw=1',
            'https://www.dropbox.com/scl/fi/pql53de11puhvlyps9cye/IMG_-65.jpg?rlkey=ssrjtiph9ryu7w2hi66tngu7g&raw=1',
            'https://www.dropbox.com/scl/fi/3czoeor6fhhnpitehsjgd/IMG_-82.jpg?rlkey=t327tzcp5ncgq0icr5ratchp6&raw=1',
            'https://www.dropbox.com/scl/fi/qg45a4eaoopgkwmydlmch/IMG_1272.jpg?rlkey=0wh8thn17wh43hx6cylooildw&raw=1',
        ],
        // North Leeds: images provided via Dropbox
        'north-leeds' => [
            'https://www.dropbox.com/scl/fi/dh3c9ym12pfmbjjbgn9w0/IMG_1296.jpg?rlkey=it8aqy0b7lcpte9yt4c7wp871&raw=1',
            'https://www.dropbox.com/scl/fi/so5n3eq32g17l0cm6377b/DSC07346.jpg?rlkey=dq07yp23ugzd038a1ayrjfit5&raw=1',
            'https://www.dropbox.com/scl/fi/eygd360cvsm3foacxmp1q/DSC07348.jpg?rlkey=ikplg2gq38jccibktmupdu7z8&raw=1',
            'https://www.dropbox.com/scl/fi/6nh9d3unh9b086lf8yvbc/DSC07349.jpg?rlkey=pk4lqyxmuuefnak4nmermiqxb&raw=1',
            'https://www.dropbox.com/scl/fi/qe49fw3vow7fav598zpb1/DSC07384.jpg?rlkey=gxnszyjrh7zv5axuptys9twly&raw=1',
            'https://www.dropbox.com/scl/fi/sha3y5chtjlo8wpszv1zy/DSC07391.jpg?rlkey=ch7ac551fz15myu4bcbp4pwbx&raw=1',
            'https://www.dropbox.com/scl/fi/fj9wnuv1vpnm3jpapsn3e/DSC07399.jpg?rlkey=ennklsvx3nvajzlwepzdcz4sg&raw=1',
        ],
        // Rotherham: images provided via Dropbox
        'rotherham' => [
            'https://www.dropbox.com/scl/fi/dcymdsets91jgp3xzsq8k/akv_podcast_-2.jpg?rlkey=9yjsf5d1xm6hqynfvx6ou0w8z&raw=1',
            'https://www.dropbox.com/scl/fi/6ez6s9nwdm30y50t24l2d/IMG-61.jpg?rlkey=ie8y4r3fand8iptdw14s5zqob&raw=1',
            'https://www.dropbox.com/scl/fi/gff5pf1juakxwldmj18on/IMG-120.jpg?rlkey=anzt4ypn6mo8ryji2cyalk60z&raw=1',
            'https://www.dropbox.com/scl/fi/oyftrquqn3j0k1erwrvyd/Large-cardio-area.jpg?rlkey=gpo0n5hihpw8kg3kz3mvn91ar&raw=1',
            'https://www.dropbox.com/scl/fi/ewlhimnxuun0a6090zjr6/Photo-17-06-2025-17-04-51-1.jpg?rlkey=s37s5dj3bmkigzyy4i0ayqcu8&raw=1',
            'https://www.dropbox.com/scl/fi/k329igqoefpf7d4czai46/Photo-17-06-2025-17-04-51.jpg?rlkey=hc53w58w1ur335fz9pijlxi40&raw=1',
        ],
        // West Leeds: images provided via Dropbox
        'west-leeds' => [
            'https://www.dropbox.com/scl/fi/s187094gha1c3y4bhr12b/Posing-studio.jpg?rlkey=f87yqpdytcj9s8l2jj8w9wm3f&raw=1',
            'https://www.dropbox.com/scl/fi/tiljdrvr1u10fqqb36h9q/_AKD0960-copy.jpg?rlkey=lbs8vodcj7s6f2plpqex0gdm8&raw=1',
            'https://www.dropbox.com/scl/fi/tbgxyomvrkrd8hiop6f55/_AKD1151-copy.jpg?rlkey=p1886ygiwuhxkicq9axeqb0sh&raw=1',
            'https://www.dropbox.com/scl/fi/7ncm853bz8kibb6e9mklx/_AKD1366-copy.jpg?rlkey=v2kd6gq9oyomcdrcmqtv9wl61&raw=1',
            'https://www.dropbox.com/scl/fi/ijy5qlknnvrmwae7s5e42/_AKD1461-copy.jpg?rlkey=6fu0b0tblss8a6mxru1kzn48u&raw=1',
            'https://www.dropbox.com/scl/fi/4t7quluixrtw50f2u9f3l/UFG-64.jpg?rlkey=9sws7hvp60j55njw88r92dg1v&raw=1',
            'https://www.dropbox.com/scl/fi/7me7ulnm7dqwym8url73c/UFG-100.jpg?rlkey=z80cjsqxarpam0gmwrqecr2da&raw=1',
        ],
        // West London: images provided via Dropbox
        'west-london' => [
            'https://www.dropbox.com/scl/fi/4f1xj9rve5h8z9euxcgr0/Photo-03-09-2025-14-02-45.jpg?rlkey=yjkkh0nesax6pfzvqryp4eyrx&raw=1',
            'https://www.dropbox.com/scl/fi/i3frbh1ac99ipf46hvklw/Photo-03-09-2025-14-02-51.jpg?rlkey=2f6t6gbw9gbsc5gkzypwhaxds&raw=1',
            'https://www.dropbox.com/scl/fi/frmjggmrr5069uzrj6oz1/Photo-03-09-2025-14-03-03.jpg?rlkey=9zftb1e1twqoghwud61snd2xk&raw=1',
            'https://www.dropbox.com/scl/fi/tmtxltzqy8o25tqi9pukz/Photo-03-09-2025-14-03-12.jpg?rlkey=s9u303dm4eg1kdpvjnwnu6lhn&raw=1',
            'https://www.dropbox.com/scl/fi/a4jg3q9b38lzcs64tfahs/Photo-03-09-2025-14-08-02.jpg?rlkey=dkya08c7rd4ljo4s81hkq29sp&raw=1',
        ],
        // York: images provided via Dropbox
        'york' => [
            'https://www.dropbox.com/scl/fi/epsqmglmx84fhzffwf95j/IMG-14.jpg?rlkey=xqk38evqjmya93dcdrwctsf7u&raw=1',
            'https://www.dropbox.com/scl/fi/r090st20jw5arucxlk4px/IMG-34.jpg?rlkey=3ch59042gck1y9qunj4ic4j96&raw=1',
            'https://www.dropbox.com/scl/fi/dnf8vehb7rokdswh0ux9s/IMG-48.jpg?rlkey=2l3hyi59sm89t6s5hp51xvrvi&raw=1',
        ],
        // Durham: images provided via Dropbox
        'durham' => [
            'https://www.dropbox.com/scl/fi/dc9atjt8rd3pin3f648hc/8-Section-MultiStation.jpg?rlkey=22vqm74lx6pgez24xf6t32nck&raw=1',
            'https://www.dropbox.com/scl/fi/ll3hf7q5ae7hj8ira9434/25m-Functional-Track-2.jpg?rlkey=oppe2pit4pouqh5m2f6vs5w85&raw=1',
            'https://www.dropbox.com/scl/fi/quahvezf56f39ofjw5lxz/Cardio-Funcional-Rig-Area.jpg?rlkey=sdrc370l253hldilmh3dy3k4c&raw=1',
            'https://www.dropbox.com/scl/fi/7vgj42v57vs67mt23wo44/Hardcore-Corner1.jpg?rlkey=no4rwbnkyuww20kbfcxeql2d4&raw=1',
            'https://www.dropbox.com/scl/fi/jhzucrz3vc6xeh1tp4wyc/Lifting-Platforms.jpg?rlkey=bkgk20wvhvk2lraj25yxldu5c&raw=1',
        ],
        // add more locations here as needed, e.g. 'york' => ['https://...']
    ];

    // Discover first-level location folders under public/Images
    $allDirs = glob($base.'/*', GLOB_ONLYDIR) ?: [];
    // Allowlist of known location folder names (case-insensitive match)
    $allowed = [
        'derby', 'durham', 'hull', 'lincoln', 'normanton', 'north leeds', 'rotherham', 'west leeds', 'west london', 'york'
    ];
    $allowedSlugs = array_map(function ($n) { return Str::slug($n, '-'); }, $allowed);
    $locationDirs = array_values(array_filter($allDirs, function ($dir) use ($allowed) {
        $name = strtolower(basename($dir));
        return in_array($name, $allowed, true);
    }));
    $locations = [];
    foreach ($locationDirs as $dir) {
        $folder = basename($dir);
        $slug = Str::slug($folder, '-');
        // Use external images (if any) to show counts/cover while local images are hidden
        $count = isset($externalImages[$slug]) ? count($externalImages[$slug]) : 0;
        $coverImage = $count > 0 ? $externalImages[$slug][0] : null;
        $locations[] = [
            'slug' => $slug,
            'name' => ucwords(str_replace(['-', '_'], ' ', $folder)),
            'count' => $count,
            'coverImage' => $coverImage,
        ];
    }

    // Add virtual locations for any external-images slugs that don't have a local folder
    $presentSlugs = array_map(function ($loc) { return $loc['slug']; }, $locations);
    foreach ($externalImages as $slug => $imgs) {
        if (in_array($slug, $presentSlugs, true)) continue;
        // Only include if allowed
        if (!in_array($slug, $allowedSlugs, true)) continue;
        $count = count($imgs);
        $locations[] = [
            'slug' => $slug,
            'name' => ucwords(str_replace(['-', '_'], ' ', $slug)),
            'count' => $count,
            'coverImage' => $count > 0 ? $imgs[0] : null,
        ];
    }
    // Sort locations by name
    usort($locations, function($a, $b) {
        return strcasecmp($a['name'], $b['name']);
    });

    // Optional selected location via query string
    $selectedSlug = $request->query('loc');
    $selected = null;
    $images = [];
    if ($selectedSlug) {
        // Find matching directory by slug
        foreach ($locationDirs as $dir) {
            $folder = basename($dir);
            if (Str::slug($folder, '-') === $selectedSlug) {
                $selected = [
                    'slug' => $selectedSlug,
                    'name' => ucwords(str_replace(['-', '_'], ' ', $folder)),
                ];
                // Return external images if configured for this location (no local disk scan)
                $images = $externalImages[$selectedSlug] ?? [];
                break;
            }
        }
        // If no matching folder, but we have external images for this slug, still allow viewing
        if (!$selected && isset($externalImages[$selectedSlug])) {
            $selected = [
                'slug' => $selectedSlug,
                'name' => ucwords(str_replace(['-', '_'], ' ', $selectedSlug)),
            ];
            $images = $externalImages[$selectedSlug] ?? [];
        }
    } // When not selected, we intentionally leave $images empty so images are only shown inside a chosen folder

    return inertia('Gallery/Index', [
        'images' => $images,
        'locations' => $locations,
        'selected' => $selected,
        'auth' => ['user' => $request->user()],
    ]);
})->name('gallery.index');