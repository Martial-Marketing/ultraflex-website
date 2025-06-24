<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        // Sample data - replace with your actual data
        $locations = [
            [
                'id' => 1,
                'name' => 'Downtown UltraFlex',
                'address' => '123 Main St, City Center',
                'phone' => '+44 20 1234 5678',
                'image' => '/images/locations/downtown.jpg',
                'slug' => 'downtown-ultraflex',
                'hours' => [
                    'weekdays' => '6:00 AM - 11:00 PM',
                    'weekends' => '7:00 AM - 10:00 PM'
                ]
            ],
            // Add more locations...
        ];

        return Inertia::render('Locations/Index', [
            'locations' => $locations
        ]);
    }

    public function show($location)
    {
        // Sample data - replace with your actual data
        $locationData = [
            'id' => 1,
            'name' => 'Downtown UltraFlex',
            'address' => '123 Main St, City Center',
            'phone' => '+44 20 1234 5678',
            'email' => 'downtown@ultraflex.com',
            'image' => '/images/locations/downtown.jpg',
            'logo' => '/images/logos/downtown.png',
            'hours' => [
                'monday' => '6:00 AM - 11:00 PM',
                'tuesday' => '6:00 AM - 11:00 PM',
                'wednesday' => '6:00 AM - 11:00 PM',
                'thursday' => '6:00 AM - 11:00 PM',
                'friday' => '6:00 AM - 11:00 PM',
                'saturday' => '7:00 AM - 10:00 PM',
                'sunday' => '7:00 AM - 10:00 PM'
            ],
            'manager' => [
                'name' => 'Sarah Johnson',
                'bio' => 'Experienced fitness professional with 10+ years in the industry.',
                'image' => '/images/managers/sarah.jpg',
                'experience' => '10+ years experience'
            ],
            'equipment' => [],
            'trainers' => [],
            'reviews' => [],
            'gallery' => [],
            'membershipPlans' => [],
            'coordinates' => [
                'lat' => 51.5074,
                'lng' => -0.1278
            ]
        ];

        return Inertia::render('Locations/Show', [
            'location' => $locationData
        ]);
    }
}