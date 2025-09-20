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
        // Validate first so field errors are preserved by Inertia
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        try {
            // Create a new user (avoid mass-assigning non-fillable attributes)
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_role' => 'user', // Default role must match enum
            ]);

            // Mark email as verified explicitly, then save
            $user->email_verified_at = now();
            $user->save();

            // Log the user in
            Auth::login($user);

            // Redirect to members hub with a success flash for the toast system
            return redirect()->route('members.index')->with('success', 'Welcome to UltraFlex!');
        } catch (\Throwable $e) {
            \Log::error('Registration failed', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return redirect()->route('auth.register')
                ->withInput()
                ->with('error', 'Registration is temporarily unavailable. Please try again shortly.');
        }
    }
}
