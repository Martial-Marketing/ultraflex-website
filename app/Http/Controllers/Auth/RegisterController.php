<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    /**
     * Display the registration form.
     */
    public function index(): Response
    {
        return Inertia::render('Auth/Register', [
            'auth' => ['user' => null]
        ]);
    }

    /**
     * Handle user registration.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        try {
            $user = User::create([
                'name'              => $validated['name'],
                'email'             => $validated['email'],
                'password'          => Hash::make($validated['password']),
                'user_role'         => 'member',
                'email_verified_at' => now(),
            ]);

            Auth::login($user, true);

            return redirect()->route('members.index')->with('success', 'Welcome to ULTRAFLEX!');

        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage());

            return back()
                ->withInput($request->only('name', 'email'))
                ->withErrors(['email' => 'Registration failed. Please try again.']);
        }
    }
}
