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
                'id' => 5,
                'locationName' => 'ULTRAFLEX YORK',
                'locationSlug' => 'york',
                'image' => '/Images/york/ForGallery/DSC07349.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/york',
                'duration' => '5-7 minutes',
                'address' => 'Clifton Moor Centre, York YO30 4WR, UK',
                'phone' => '+44 1904 567 890',
                'email' => 'york@ultraflexgym.co.uk',
                'highlights' => [
                    'Professional grade equipment',
                    'Spacious training areas',
                    'Modern facilities',
                    'Expert training support'
                ],
                'featured' => true
            ],
            [
                'id' => 6,
                'locationName' => 'ULTRAFLEX HULL',
                'locationSlug' => 'hull',
                'image' => '/Images/hull/IMG (19) (5).jpg',
                'tourUrl' => 'https://tour.ultraflex.com/hull',
                'duration' => '4-6 minutes',
                'address' => 'Jameson Street, Hull HU1 3DX, UK',
                'phone' => '+44 1482 678 901',
                'email' => 'hull@ultraflexgym.co.uk',
                'highlights' => [
                    'Central location',
                    'State-of-the-art equipment',
                    'Flexible training options',
                    'Professional atmosphere'
                ],
                'featured' => false
            ],
            [
                'id' => 7,
                'locationName' => 'ULTRAFLEX DURHAM',
                'locationSlug' => 'durham',
                'image' => '/Images/durham/8 Section MultiStation.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/durham',
                'duration' => '6-8 minutes',
                'address' => 'North Road, Durham DH1 4SQ, UK',
                'phone' => '+44 1913 789 012',
                'email' => 'durham@ultraflexgym.co.uk',
                'highlights' => [
                    '8 Section MultiStation',
                    'Comprehensive training zones',
                    'Premium equipment',
                    'Spacious layout'
                ],
                'featured' => true
            ],
            [
                'id' => 8,
                'locationName' => 'ULTRAFLEX DERBY',
                'locationSlug' => 'derby',
                'image' => '/Images/derby/ForGallery/DSC07346.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/derby',
                'duration' => '5-7 minutes',
                'address' => 'St Peters Street, Derby DE1 2AB, UK',
                'phone' => '+44 1332 890 123',
                'email' => 'derby@ultraflexgym.co.uk',
                'highlights' => [
                    'City center location',
                    'Modern training equipment',
                    'Flexible workout spaces',
                    'Professional environment'
                ],
                'featured' => false
            ],
            [
                'id' => 9,
                'locationName' => 'ULTRAFLEX ATHENS (GREECE)',
                'locationSlug' => 'athens-greece',
                'image' => '/Images/athens/HeroBG/DSC07413.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/athens',
                'duration' => '6-8 minutes',
                'address' => 'Vouliagmenis Avenue, Glyfada 166 74, Greece',
                'phone' => '+30 210 901 2345',
                'email' => 'athens@ultraflexgym.co.uk',
                'highlights' => [
                    'Mediterranean location',
                    'International standards',
                    'Premium facilities',
                    'Coastal proximity'
                ],
                'featured' => true
            ],
            [
                'id' => 10,
                'locationName' => 'ULTRAFLEX LINCOLN',
                'locationSlug' => 'lincoln',
                'image' => '/Images/lincoln/ForGallery/DSC07350.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/lincoln',
                'duration' => '4-6 minutes',
                'address' => 'High Street, Lincoln LN5 7PJ, UK',
                'phone' => '+44 1522 012 345',
                'email' => 'lincoln@ultraflexgym.co.uk',
                'highlights' => [
                    'High Street location',
                    'Accessible facilities',
                    'Quality equipment',
                    'Welcoming environment'
                ],
                'featured' => false
            ],
            [
                'id' => 11,
                'locationName' => 'ULTRAFLEX WEST LONDON',
                'locationSlug' => 'west-london',
                'image' => '/Images/westlondon/DSC06653-2.jpg',
                'tourUrl' => 'https://tour.ultraflex.com/west-london',
                'duration' => '7-9 minutes',
                'address' => 'Westfield Shopping Centre, London W12 7GF, UK',
                'phone' => '+44 20 3456 7890',
                'email' => 'westlondon@ultraflexgym.co.uk',
                'highlights' => [
                    'Shopping center location',
                    'Premium London facility',
                    'Convenient access',
                    'Modern amenities'
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

    public function show($slug)
    {
        $tours = [
            'york' => [
                'id' => 5,
                'locationName' => 'ULTRAFLEX YORK',
                'locationSlug' => 'york',
                'image' => '/Images/york/ForGallery/DSC07349.jpg',
                'gallery' => [
                    '/Images/york/ForGallery/DSC07341.jpg',
                    '/Images/york/ForGallery/DSC07345.jpg',
                    '/Images/york/ForGallery/DSC07346.jpg',
                    '/Images/york/ForGallery/DSC07349.jpg',
                    '/Images/york/ForGallery/DSC07350.jpg',
                    '/Images/york/ForGallery/DSC07359 (1).jpg',
                    '/Images/york/ForGallery/DSC07359.jpg'
                ],
                'address' => 'Clifton Moor Centre, York YO30 4WR, UK',
                'phone' => '+44 1904 567 890',
                'email' => 'york@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/york'
            ],
            'hull' => [
                'id' => 6,
                'locationName' => 'ULTRAFLEX HULL',
                'locationSlug' => 'hull',
                'image' => '/Images/hull/IMG (19) (5).jpg',
                'gallery' => [
                    '/Images/hull/hull/ForGallery/DSC07341.jpg',
                    '/Images/hull/hull/ForGallery/DSC07345.jpg',
                    '/Images/hull/hull/ForGallery/DSC07346.jpg',
                    '/Images/hull/hull/ForGallery/DSC07349.jpg',
                    '/Images/hull/hull/ForGallery/DSC07350.jpg',
                    '/Images/hull/hull/ForGallery/DSC07359 (1).jpg',
                    '/Images/hull/hull/ForGallery/DSC07359.jpg',
                    '/Images/hull/IMG (19) (5).jpg'
                ],
                'address' => 'Jameson Street, Hull HU1 3DX, UK',
                'phone' => '+44 1482 678 901',
                'email' => 'hull@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/hull'
            ],
            'durham' => [
                'id' => 7,
                'locationName' => 'ULTRAFLEX DURHAM',
                'locationSlug' => 'durham',
                'image' => '/Images/durham/8 Section MultiStation.jpg',
                'gallery' => [
                    '/Images/durham/durham/ForGallery/DSC07341.jpg',
                    '/Images/durham/durham/ForGallery/DSC07345.jpg',
                    '/Images/durham/durham/ForGallery/DSC07346.jpg',
                    '/Images/durham/durham/ForGallery/DSC07349.jpg',
                    '/Images/durham/durham/ForGallery/DSC07350.jpg',
                    '/Images/durham/durham/ForGallery/DSC07359 (1).jpg',
                    '/Images/durham/durham/ForGallery/DSC07359.jpg',
                    '/Images/durham/8 Section MultiStation.jpg'
                ],
                'address' => 'North Road, Durham DH1 4SQ, UK',
                'phone' => '+44 1913 789 012',
                'email' => 'durham@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/durham'
            ],
            'derby' => [
                'id' => 8,
                'locationName' => 'ULTRAFLEX DERBY',
                'locationSlug' => 'derby',
                'image' => '/Images/derby/ForGallery/DSC07346.jpg',
                'gallery' => [
                    '/Images/derby/ForGallery/DSC07341.jpg',
                    '/Images/derby/ForGallery/DSC07345.jpg',
                    '/Images/derby/ForGallery/DSC07346.jpg',
                    '/Images/derby/ForGallery/DSC07349.jpg',
                    '/Images/derby/ForGallery/DSC07350.jpg',
                    '/Images/derby/ForGallery/DSC07359 (1).jpg',
                    '/Images/derby/ForGallery/DSC07359.jpg'
                ],
                'address' => 'St Peters Street, Derby DE1 2AB, UK',
                'phone' => '+44 1332 890 123',
                'email' => 'derby@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/derby'
            ],
            'athens-greece' => [
                'id' => 9,
                'locationName' => 'ULTRAFLEX ATHENS (GREECE)',
                'locationSlug' => 'athens-greece',
                'image' => '/Images/athens/HeroBG/DSC07413.jpg',
                'gallery' => [
                    '/Images/athens/ForGallery/DSC07341.jpg',
                    '/Images/athens/ForGallery/DSC07345.jpg',
                    '/Images/athens/ForGallery/DSC07346.jpg',
                    '/Images/athens/ForGallery/DSC07349.jpg',
                    '/Images/athens/ForGallery/DSC07350.jpg',
                    '/Images/athens/ForGallery/DSC07359 (1).jpg',
                    '/Images/athens/ForGallery/DSC07359.jpg',
                    '/Images/athens/HeroBG/DSC07413.jpg'
                ],
                'address' => 'Vouliagmenis Avenue, Glyfada 166 74, Greece',
                'phone' => '+30 210 901 2345',
                'email' => 'athens@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/athens'
            ],
            'lincoln' => [
                'id' => 10,
                'locationName' => 'ULTRAFLEX LINCOLN',
                'locationSlug' => 'lincoln',
                'image' => '/Images/lincoln/ForGallery/DSC07350.jpg',
                'gallery' => [
                    '/Images/lincoln/ForGallery/DSC07341.jpg',
                    '/Images/lincoln/ForGallery/DSC07345.jpg',
                    '/Images/lincoln/ForGallery/DSC07346.jpg',
                    '/Images/lincoln/ForGallery/DSC07349.jpg',
                    '/Images/lincoln/ForGallery/DSC07350.jpg',
                    '/Images/lincoln/ForGallery/DSC07359 (1).jpg',
                    '/Images/lincoln/ForGallery/DSC07359.jpg'
                ],
                'address' => 'High Street, Lincoln LN5 7PJ, UK',
                'phone' => '+44 1522 012 345',
                'email' => 'lincoln@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/lincoln'
            ],
            'west-london' => [
                'id' => 11,
                'locationName' => 'ULTRAFLEX WEST LONDON',
                'locationSlug' => 'west-london',
                'image' => '/Images/westlondon/DSC06653-2.jpg',
                'gallery' => [
                    '/Images/westlondon/DSC06653-2.jpg',
                    '/Images/westlondon/DSC06686.jpg',
                    '/Images/westlondon/DSC06788-2.jpg',
                    '/Images/westlondon/DSC07359 (1).jpg',
                    '/Images/westlondon/DSC07359.jpg',
                    '/Images/westlondon/DSC07371.jpg',
                    '/Images/westlondon/DSC07372.jpg'
                ],
                'address' => 'Westfield Shopping Centre, London W12 7GF, UK',
                'phone' => '+44 20 3456 7890',
                'email' => 'westlondon@ultraflexgym.co.uk',
                'tourUrl' => 'https://tour.ultraflex.com/west-london'
            ]
        ];

        $tour = $tours[$slug] ?? null;

        if (!$tour) {
            abort(404);
        }

        return Inertia::render('Tours/Show', [
            'tour' => $tour
        ]);
    }
}