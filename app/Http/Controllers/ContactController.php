<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $locations = [
            [
                'id' => 1,
                'name' => 'Downtown UltraFlex',
                'address' => '123 Main St, City Center',
                'phone' => '+44 20 1234 5678',
                'email' => 'downtown@ultraflex.com',
                'coordinates' => [
                    'lat' => 51.5074,
                    'lng' => -0.1278
                ]
            ],
            [
                'id' => 2,
                'name' => 'Westside UltraFlex',
                'address' => '456 West Ave, Westside',
                'phone' => '+44 20 2345 6789',
                'email' => 'westside@ultraflex.com',
                'coordinates' => [
                    'lat' => 51.5155,
                    'lng' => -0.1426
                ]
            ],
            [
                'id' => 3,
                'name' => 'North UltraFlex',
                'address' => '789 North Blvd, Uptown',
                'phone' => '+44 20 3456 7890',
                'email' => 'north@ultraflex.com',
                'coordinates' => [
                    'lat' => 51.5287,
                    'lng' => -0.1318
                ]
            ]
        ];

        return Inertia::render('Contact/Index', [
            'locations' => $locations,
            'generalContact' => [
                'phone' => '+44 20 1234 5678',
                'email' => 'info@ultraflex.com',
                'address' => 'UltraFlex Head Office, 123 Fitness Street, London'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Maybe use a service like ContactForm::create($request->all())

        // For now, just return success
        return redirect()->back()->with('success', 'Thank you for your message! We\'ll get back to you soon.');
    }
}