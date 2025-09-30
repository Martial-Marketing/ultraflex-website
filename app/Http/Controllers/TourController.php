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
                'image' => '/Images/york/ForGallery/gym-in-york-6.webp',
        // Updated to Matterport link supplied
        'tourUrl' => 'https://my.matterport.com/show/?m=kZ7SPKSyTMt&back=1',
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
                'image' => '/Images/hull/gym-in-hull-22.webp',
                // Updated to Matterport link supplied
                'tourUrl' => 'https://my.matterport.com/show/?m=nfWTbfybzYt&back=1',
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
                'image' => '/Images/durham/equipment-in-durham.webp',
                // Updated to YouTube link supplied
                'tourUrl' => 'https://youtu.be/JpALX5roRKE',
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
                'image' => '/Images/derby/ForGallery/gym-in-derby-6.webp',
                // Updated to YouTube link supplied
                'tourUrl' => 'https://youtu.be/VKlANmwoDPQ',
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
                'image' => '/Images/athens/HeroBG/gym-in-athens-16.webp',
                // Pending drone tour upload (placeholder)
                'tourUrl' => null,
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
                'image' => '/Images/lincoln/ForGallery/gym-in-lincoln-7.webp',
                // Temporary YouTube fallback while waiting for tour video
                'tourUrl' => 'https://youtu.be/u3qFZpkqxyI',
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
                'image' => '/Images/westlondon/gym-in-westlondon.webp',
                // Updated tour video nearly ready - placeholder until launch
                'tourUrl' => null,
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
            ],
            // Add missing locations based on LocationController
            [
                'id' => 1,
                'locationName' => 'ULTRAFLEX WEST LEEDS',
                'locationSlug' => 'west-leeds',
                'image' => '/Images/westleeds/gym-in-westleeds.webp',
                // Provided Matterport link
                'tourUrl' => 'https://my.matterport.com/show/?m=8gw4DT8ZmVc&back=1',
                'duration' => '5-7 minutes',
                'address' => 'West Park Ring Road, Leeds LS16 6EB, UK',
                'phone' => '0113 256 5107',
                'email' => 'leeds@ultraflexgym.co.uk',
                'highlights' => [
                    'Top-quality fitness machines',
                    'Martial arts area',
                    'Free on-site parking',
                    'Expert staff'
                ],
                'featured' => false
            ],
            [
                'id' => 2,
                'locationName' => 'ULTRAFLEX NORTH LEEDS',
                'locationSlug' => 'north-leeds',
                'image' => '/Images/northleeds/gym-in-northleeds.webp',
                // Provided YouTube link
                'tourUrl' => 'https://youtu.be/VgF1a6XxAkc?si=Ki3Z0VdqdKVocs52',
                'duration' => '5-7 minutes',
                'address' => 'Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK',
                'phone' => '0113 513 7669',
                'email' => 'northleeds@ultraflexgym.co.uk',
                'highlights' => [
                    'Brand new site',
                    'All equipment access',
                    'Martial arts area',
                    'Free parking'
                ],
                'featured' => false
            ],
            [
                'id' => 3,
                'locationName' => 'ULTRAFLEX NORMANTON',
                'locationSlug' => 'normanton',
                'image' => '/Images/normanton/gym-in-normanton.webp',
                // Provided link (scene3d)
                'tourUrl' => 'https://my.scene3d.co.uk/tour/ultraflex-normanton-2022',
                'duration' => '4-6 minutes',
                'address' => 'High Street, Normanton WF6 2DB, UK',
                'phone' => '+44 1924 890 123',
                'email' => 'normanton@ultraflexgym.co.uk',
                'highlights' => [
                    'Central Normanton location',
                    'Standard & GOLD memberships',
                    'Free parking',
                    'Group classes'
                ],
                'featured' => false
            ],
            [
                'id' => 4,
                'locationName' => 'ULTRAFLEX ROTHERHAM',
                'locationSlug' => 'rotherham',
                'image' => '/Images/rotherham/gym-in-rotherham.webp',
                // Provided Matterport link
                'tourUrl' => 'https://my.matterport.com/show/?m=qcrWz3BZzrj&back=1',
                'duration' => '5-7 minutes',
                'address' => 'Moorgate Street, Rotherham S60 2EY, UK',
                'phone' => '+44 1709 456 789',
                'email' => 'rotherham@ultraflexgym.co.uk',
                'highlights' => [
                    'Early opening hours',
                    'Student memberships',
                    'Free parking',
                    'Top-quality equipment'
                ],
                'featured' => false
            ],
            // ...existing code for other locations...
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
                'image' => '/Images/york/ForGallery/gym-in-york-6.webp',
                'gallery' => [
                    '/Images/york/ForGallery/gym-in-york-3',
                    '/Images/york/ForGallery/gym-in-york-4',
                    '/Images/york/ForGallery/gym-in-york-5',
                    '/Images/york/ForGallery/gym-in-york-6.webp',
                    '/Images/york/ForGallery/gym-in-york-7',
                    '/Images/york/ForGallery/gym-in-york-8',
                    '/Images/york/ForGallery/gym-in-york-9'
                ],
                'address' => 'Clifton Moor Centre, York YO30 4WR, UK',
                'phone' => '+44 1904 567 890',
                'email' => 'york@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=kZ7SPKSyTMt&back=1'
            ],
            'hull' => [
                'id' => 6,
                'locationName' => 'ULTRAFLEX HULL',
                'locationSlug' => 'hull',
                'image' => '/Images/hull/gym-in-hull-22.webp',
                'gallery' => [
                    '/Images/hull/hull/ForGallery/DSC07341.jpg',
                    '/Images/hull/hull/ForGallery/DSC07345.jpg',
                    '/Images/hull/hull/ForGallery/DSC07346.jpg',
                    '/Images/hull/hull/ForGallery/DSC07349.jpg',
                    '/Images/hull/hull/ForGallery/DSC07350.jpg',
                    '/Images/hull/hull/ForGallery/DSC07359 (1).jpg',
                    '/Images/hull/hull/ForGallery/DSC07359.jpg',
                    '/Images/hull/gym-in-hull-22.webp'
                ],
                'address' => 'Jameson Street, Hull HU1 3DX, UK',
                'phone' => '+44 1482 678 901',
                'email' => 'hull@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=nfWTbfybzYt&back=1'
            ],
            'durham' => [
                'id' => 7,
                'locationName' => 'ULTRAFLEX DURHAM',
                'locationSlug' => 'durham',
                'image' => '/Images/durham/equipment-in-durham.webp',
                'gallery' => [
                    '/Images/durham/durham/ForGallery/DSC07341.jpg',
                    '/Images/durham/durham/ForGallery/DSC07345.jpg',
                    '/Images/durham/durham/ForGallery/DSC07346.jpg',
                    '/Images/durham/durham/ForGallery/DSC07349.jpg',
                    '/Images/durham/durham/ForGallery/DSC07350.jpg',
                    '/Images/durham/durham/ForGallery/DSC07359 (1).jpg',
                    '/Images/durham/durham/ForGallery/DSC07359.jpg',
                    '/Images/durham/equipment-in-durham.webp'
                ],
                'address' => 'North Road, Durham DH1 4SQ, UK',
                'phone' => '+44 1913 789 012',
                'email' => 'durham@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/JpALX5roRKE'
            ],
            'derby' => [
                'id' => 8,
                'locationName' => 'ULTRAFLEX DERBY',
                'locationSlug' => 'derby',
                'image' => '/Images/derby/ForGallery/gym-in-derby-6.webp',
                'gallery' => [
                    '/Images/derby/ForGallery/gym-in-derby-4',
                    '/Images/derby/ForGallery/gym-in-derby-5',
                    '/Images/derby/ForGallery/gym-in-derby-6.webp',
                    '/Images/derby/ForGallery/gym-in-derby-7',
                    '/Images/derby/ForGallery/gym-in-derby-8',
                    '/Images/derby/ForGallery/gym-in-derby-9',
                    '/Images/derby/ForGallery/gym-in-derby-10'
                ],
                'address' => 'St Peters Street, Derby DE1 2AB, UK',
                'phone' => '+44 1332 890 123',
                'email' => 'derby@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/VKlANmwoDPQ'
            ],
            'athens-greece' => [
                'id' => 9,
                'locationName' => 'ULTRAFLEX ATHENS (GREECE)',
                'locationSlug' => 'athens-greece',
                'image' => '/Images/athens/HeroBG/gym-in-athens-16.webp',
                'gallery' => [
                    '/Images/athens/ForGallery/gym-in-athens-4',
                    '/Images/athens/ForGallery/gym-in-athens-5',
                    '/Images/athens/ForGallery/gym-in-athens-6',
                    '/Images/athens/ForGallery/gym-in-athens-7',
                    '/Images/athens/ForGallery/gym-in-athens-8',
                    '/Images/athens/ForGallery/gym-in-athens-9',
                    '/Images/athens/ForGallery/gym-in-athens-10',
                    '/Images/athens/HeroBG/gym-in-athens-16.webp'
                ],
                'address' => 'Vouliagmenis Avenue, Glyfada 166 74, Greece',
                'phone' => '+30 210 901 2345',
                'email' => 'athens@ultraflexgym.co.uk',
                'tourUrl' => null
            ],
            'lincoln' => [
                'id' => 10,
                'locationName' => 'ULTRAFLEX LINCOLN',
                'locationSlug' => 'lincoln',
                'image' => '/Images/lincoln/ForGallery/gym-in-lincoln-7.webp',
                'gallery' => [
                    '/Images/lincoln/ForGallery/gym-in-lincoln-3',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-4',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-5',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-6',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-7.webp',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-8',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-9'
                ],
                'address' => 'High Street, Lincoln LN5 7PJ, UK',
                'phone' => '+44 1522 012 345',
                'email' => 'lincoln@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/u3qFZpkqxyI'
            ],
            'west-london' => [
                'id' => 11,
                'locationName' => 'ULTRAFLEX WEST LONDON',
                'locationSlug' => 'west-london',
                'image' => '/Images/westlondon/gym-in-westlondon.webp',
                'gallery' => [
                    '/Images/westlondon/gym-in-westlondon.webp',
                    '/Images/westlondon/gym-in-westlondon-2',
                    '/Images/westlondon/gym-in-westlondon-3',
                    '/Images/westlondon/gym-in-westlondon-4',
                    '/Images/westlondon/gym-in-westlondon-5',
                    '/Images/westlondon/gym-in-westlondon-6',
                    '/Images/westlondon/gym-in-westlondon-7'
                ],
                'address' => 'Westfield Shopping Centre, London W12 7GF, UK',
                'phone' => '+44 20 3456 7890',
                'email' => 'westlondon@ultraflexgym.co.uk',
                'tourUrl' => null
            ],
            // Add missing locations based on LocationController
            'west-leeds' => [
                'id' => 1,
                'locationName' => 'ULTRAFLEX WEST LEEDS',
                'locationSlug' => 'west-leeds',
                'image' => '/Images/westleeds/gym-in-westleeds.webp',
                'gallery' => [
                    '/Images/westleeds/westleeds/ForGallery/DSC07341.jpg',
                    '/Images/westleeds/westleeds/ForGallery/DSC07345.jpg',
                    '/Images/westleeds/westleeds/ForGallery/DSC07346.jpg',
                    '/Images/westleeds/westleeds/ForGallery/DSC07349.jpg',
                    '/Images/westleeds/westleeds/ForGallery/DSC07350.jpg',
                    '/Images/westleeds/westleeds/ForGallery/DSC07359 (1).jpg',
                    '/Images/westleeds/westleeds/ForGallery/DSC07359.jpg',
                    '/Images/westleeds/gym-in-westleeds.webp'
                ],
                'address' => 'West Park Ring Road, Leeds LS16 6EB, UK',
                'phone' => '0113 256 5107',
                'email' => 'leeds@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=8gw4DT8ZmVc&back=1'
            ],
            'north-leeds' => [
                'id' => 2,
                'locationName' => 'ULTRAFLEX NORTH LEEDS',
                'locationSlug' => 'north-leeds',
                'image' => '/Images/northleeds/gym-in-northleeds.webp',
                'gallery' => [
                    '/Images/northleeds/northleeds/ForGallery/DSC07341.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07345.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07346.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07349.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07350.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07359 (1).jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07359.jpg',
                    '/Images/northleeds/gym-in-northleeds.webp'
                ],
                'address' => 'Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK',
                'phone' => '0113 513 7669',
                'email' => 'northleeds@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/VgF1a6XxAkc?si=Ki3Z0VdqdKVocs52'
            ],
            'normanton' => [
                'id' => 3,
                'locationName' => 'ULTRAFLEX NORMANTON',
                'locationSlug' => 'normanton',
                'image' => '/Images/normanton/gym-in-normanton.webp',
                'gallery' => [
                    '/Images/normanton/normanton/ForGallery/DSC07341.jpg',
                    '/Images/normanton/normanton/ForGallery/DSC07345.jpg',
                    '/Images/normanton/normanton/ForGallery/DSC07346.jpg',
                    '/Images/normanton/normanton/ForGallery/DSC07349.jpg',
                    '/Images/normanton/normanton/ForGallery/DSC07350.jpg',
                    '/Images/normanton/normanton/ForGallery/DSC07359 (1).jpg',
                    '/Images/normanton/normanton/ForGallery/DSC07359.jpg',
                    '/Images/normanton/gym-in-normanton.webp'
                ],
                'address' => 'High Street, Normanton WF6 2DB, UK',
                'phone' => '+44 1924 890 123',
                'email' => 'normanton@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.scene3d.co.uk/tour/ultraflex-normanton-2022'
            ],
            'rotherham' => [
                'id' => 4,
                'locationName' => 'ULTRAFLEX ROTHERHAM',
                'locationSlug' => 'rotherham',
                'image' => '/Images/rotherham/gym-in-rotherham.webp',
                'gallery' => [
                    '/Images/rotherham/rotherham/ForGallery/DSC07341.jpg',
                    '/Images/rotherham/rotherham/ForGallery/DSC07345.jpg',
                    '/Images/rotherham/rotherham/ForGallery/DSC07346.jpg',
                    '/Images/rotherham/rotherham/ForGallery/DSC07349.jpg',
                    '/Images/rotherham/rotherham/ForGallery/DSC07350.jpg',
                    '/Images/rotherham/rotherham/ForGallery/DSC07359 (1).jpg',
                    '/Images/rotherham/rotherham/ForGallery/DSC07359.jpg',
                    '/Images/rotherham/gym-in-rotherham.webp'
                ],
                'address' => 'Moorgate Street, Rotherham S60 2EY, UK',
                'phone' => '+44 1709 456 789',
                'email' => 'rotherham@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=qcrWz3BZzrj&back=1'
            ],
            // ...existing code for other locations...
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