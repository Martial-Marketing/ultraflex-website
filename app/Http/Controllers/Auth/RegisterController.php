<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    // Show the registration form
    public function index()
    {
        return Inertia::render('Auth/Register', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    // Store registration data
    public function store(Request $request)
    {
        // Simple validation
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => 'member', // Set default role
            'email_verified_at' => now(), // Auto-verify email for simplicity
        ]);

        // Log the user in
        Auth::login($user);

        // Redirect to members hub
        return redirect()->route('members.index')->with('success', 'Welcome to UltraFlex!');
    }
}
