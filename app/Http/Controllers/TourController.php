<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TourController extends Controller
{
    public function index()
    {
        $tours = [
            [
                'id' => 1,
                'locationName' => 'Downtown UltraFlex',
                'locationSlug' => 'downtown-ultraflex',
                'image' => '/images/tours/downtown-hero.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/downtown',
                'duration' => '5-7 minutes',
                'highlights' => [
                    'State-of-the-art cardio zone',
                    'Olympic weightlifting platform',
                    'Luxury changing rooms',
                    'Rooftop yoga studio'
                ],
                'featured' => true
            ],
            [
                'id' => 2,
                'locationName' => 'Westside UltraFlex',
                'locationSlug' => 'westside-ultraflex',
                'image' => '/images/tours/westside-hero.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/westside',
                'duration' => '4-6 minutes',
                'highlights' => [
                    'Indoor climbing wall',
                    'Functional training area',
                    'Steam room and sauna',
                    'Juice bar and café'
                ],
                'featured' => false
            ],
            [
                'id' => 3,
                'locationName' => 'North UltraFlex',
                'locationSlug' => 'north-ultraflex',
                'image' => '/images/tours/north-hero.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/north',
                'duration' => '6-8 minutes',
                'highlights' => [
                    'Swimming pool and aqua classes',
                    'Spin studio with virtual rides',
                    'Recovery and massage therapy',
                    'Outdoor training area'
                ],
                'featured' => true
            ]
        ];

        $tourFeatures = [
            [
                'title' => '360° Views',
                'description' => 'Get a complete view of every area in our gyms',
                'icon' => 'camera'
            ],
            [
                'title' => 'Interactive Hotspots',
                'description' => 'Click on equipment and areas for detailed information',
                'icon' => 'cursor'
            ],
            [
                'title' => 'High Definition',
                'description' => 'Crystal clear imagery that shows every detail',
                'icon' => 'eye'
            ],
            [
                'title' => 'Mobile Friendly',
                'description' => 'Take tours on any device, anywhere, anytime',
                'icon' => 'smartphone'
            ]
        ];

        return Inertia::render('Tours/Index', [
            'tours' => $tours,
            'tourFeatures' => $tourFeatures,
            'featuredTours' => array_filter($tours, fn($tour) => $tour['featured'])
        ]);
    }
}