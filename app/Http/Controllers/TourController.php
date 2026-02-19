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
                'image' => '/Images/Cards-Images/york.webp',
        // Updated to Matterport link supplied
        'tourUrl' => 'https://my.matterport.com/show/?m=kZ7SPKSyTMt&back=1',
                'address' => '10 Layerthorpe, York YO31 7YW',
                'phone' => '+44 1904 567 890',
                'email' => 'york@ultraflexgym.co.uk',
                'highlights' => [
                    'Professional grade equipment',
                    'Spacious training areas',
                    'Modern facilities',
                    'Expert training support'
                ]
            ],
            [
                'id' => 6,
                'locationName' => 'ULTRAFLEX HULL',
                'locationSlug' => 'hull',
                // Updated primary image for Hull tour card
                'image' => '/Images/Cards-Images/hull.webp',
                // Updated to Matterport link supplied
                'tourUrl' => 'https://my.matterport.com/show/?m=nfWTbfybzYt&back=1',
                'address' => 'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN',
                'phone' => '+44 1482 678 901',
                'email' => 'hull@ultraflexgym.co.uk',
                'highlights' => [
                    'Central location',
                    'State-of-the-art equipment',
                    'Flexible training options',
                    'Professional atmosphere'
                ]
            ],
            [
                'id' => 7,
                'locationName' => 'ULTRAFLEX DURHAM',
                'locationSlug' => 'durham',
                // Updated primary image for Durham tour card
                'image' => '/Images/Cards-Images/durham.webp',
                // Updated to YouTube link supplied
                'tourUrl' => 'https://youtu.be/JpALX5roRKE',
                'address' => 'North Road, Durham DH1 4SQ, UK',
                'phone' => '+44 1913 789 012',
                'email' => 'durham@ultraflexgym.co.uk',
                'highlights' => [
                    '8 Section MultiStation',
                    'Comprehensive training zones',
                    'Premium equipment',
                    'Spacious layout'
                ]
            ],
            [
                'id' => 8,
                'locationName' => 'ULTRAFLEX DERBY',
                'locationSlug' => 'derby',
                // Updated primary image for Derby tour card
                'image' => '/Images/Cards-Images/derby.webp',
                // Updated to YouTube link supplied
                'tourUrl' => 'https://youtu.be/VKlANmwoDPQ',
                'address' => 'St Peters Street, Derby DE1 2AB, UK',
                'phone' => '+44 1332 890 123',
                'email' => 'derby@ultraflexgym.co.uk',
                'highlights' => [
                    'City center location',
                    'Modern training equipment',
                    'Flexible workout spaces',
                    'Professional environment'
                ]
            ],
            [
                'id' => 9,
                'locationName' => 'ULTRAFLEX ATHENS (GREECE)',
                'locationSlug' => 'athens-greece',
                'image' => '/Images/Cards-Images/athens.webp',
                // Pending drone tour upload (placeholder)
                'tourUrl' => null,
                'address' => 'Vouliagmenis Avenue, Glyfada 166 74, Greece',
                'phone' => '+30 210 901 2345',
                'email' => 'athens@ultraflexgym.co.uk',
                'highlights' => [
                    'Mediterranean location',
                    'International standards',
                    'Premium facilities',
                    'Coastal proximity'
                ]
            ],
            [
                'id' => 10,
                'locationName' => 'ULTRAFLEX LINCOLN',
                'locationSlug' => 'lincoln',
                // Updated primary image for Lincoln tour card
                'image' => '/Images/Cards-Images/processed-7CE97793-CFE2-44A3-9BC7-AC26D84DB463%20(1).webp',
                // Temporary YouTube fallback while waiting for tour video
                'tourUrl' => 'https://youtu.be/u3qFZpkqxyI',
                'address' => 'High Street, Lincoln LN5 7PJ, UK',
                'phone' => '+44 1522 012 345',
                'email' => 'lincoln@ultraflexgym.co.uk',
                'highlights' => [
                    'High Street location',
                    'Accessible facilities',
                    'Quality equipment',
                    'Welcoming environment'
                ]
            ],
            [
                'id' => 11,
                'locationName' => 'ULTRAFLEX WEST LONDON',
                'locationSlug' => 'west-london',
                // Updated primary image for West London tour card
                'image' => '/Images/Cards-Images/west-london.webp',
                // Updated tour video nearly ready - placeholder until launch
                'tourUrl' => null,
                'address' => 'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP',
                'phone' => '+44 20 3456 7890',
                'email' => 'westlondon@ultraflexgym.co.uk',
                'highlights' => [
                    'Shopping center location',
                    'Premium London facility',
                    'Convenient access',
                    'Modern amenities'
                ]
            ],
            // Add missing locations based on LocationController
            [
                'id' => 1,
                'locationName' => 'ULTRAFLEX WEST LEEDS',
                'locationSlug' => 'west-leeds',
                'image' => '/Images/Cards-Images/west-leeds.webp',
                // Provided Matterport link
                'tourUrl' => 'https://my.matterport.com/show/?m=8gw4DT8ZmVc&back=1',
                'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
                'phone' => '0113 256 5107',
                'email' => 'leeds@ultraflexgym.co.uk',
                'highlights' => [
                    'Top-quality fitness machines',
                    'Martial arts area',
                    'Free on-site parking',
                    'Expert staff'
                ]
            ],
            [
                'id' => 2,
                'locationName' => 'ULTRAFLEX NORTH LEEDS',
                'locationSlug' => 'north-leeds',
                'image' => '/Images/Cards-Images/north-leeds.webp',
                // Provided YouTube link
                'tourUrl' => 'https://youtu.be/VgF1a6XxAkc?si=Ki3Z0VdqdKVocs52',
                'address' => 'Limewood Approach, Seacroft, Leeds LS14 1NH',
                'phone' => '0113 513 7671',
                'email' => 'northleeds@ultraflexgym.co.uk',
                'highlights' => [
                    'Brand new site',
                    'All equipment access',
                    'Martial arts area',
                    'Free parking'
                ]
            ],
            [
                'id' => 3,
                'locationName' => 'ULTRAFLEX NORMANTON',
                'locationSlug' => 'normanton',
                'image' => '/Images/Cards-Images/normanton.webp',
                // Provided link (scene3d)
                'tourUrl' => 'https://my.scene3d.co.uk/tour/ultraflex-normanton-2022',
                'address' => 'Ripley Dr, Normanton WF6 1QT',
                'phone' => '+44 1924 890 123',
                'email' => 'normanton@ultraflexgym.co.uk',
                'highlights' => [
                    'Central Normanton location',
                    'Standard & GOLD memberships',
                    'Free parking',
                    'Group classes'
                ]
            ],
            [
                'id' => 4,
                'locationName' => 'ULTRAFLEX ROTHERHAM',
                'locationSlug' => 'rotherham',
                'image' => '/Images/Cards-Images/rotherham.webp',
                // Provided Matterport link
                'tourUrl' => 'https://my.matterport.com/show/?m=qcrWz3BZzrj&back=1',
                'address' => '175 Effingham St, Rotherham S65 1BL',
                'phone' => '+44 1709 456 789',
                'email' => 'rotherham@ultraflexgym.co.uk',
                'highlights' => [
                    'Early opening hours',
                    'Student memberships',
                    'Free parking',
                    'Top-quality equipment'
                ]
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
            'tourFeatures' => $tourFeatures
        ]);
    }

    public function show($slug)
    {
        $tours = [
            'york' => [
                'id' => 5,
                'locationName' => 'ULTRAFLEX YORK',
                'locationSlug' => 'york',
                'image' => '/Images/newimages/York/gym-in-york.webp',
                'gallery' => [
                    '/Images/york/ForGallery/gym-in-york-3',
                    '/Images/york/ForGallery/gym-in-york-4',
                    '/Images/york/ForGallery/gym-in-york-5',
                    '/Images/york/ForGallery/gym-in-york-6.webp',
                    '/Images/york/ForGallery/gym-in-york-7',
                    '/Images/york/ForGallery/gym-in-york-8',
                    '/Images/york/ForGallery/gym-in-york-9'
                ],
                'address' => '10 Layerthorpe, York YO31 7YW',
                'phone' => '+44 1904 567 890',
                'email' => 'york@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=kZ7SPKSyTMt&back=1'
            ],
            'hull' => [
                'id' => 6,
                'locationName' => 'ULTRAFLEX HULL',
                'locationSlug' => 'hull',
                // Updated primary image for Hull tour detail
                'image' => '/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.webp',
                'gallery' => [
                    '/Images/hull/hull/ForGallery/DSC07341.jpg',
                    '/Images/hull/hull/ForGallery/DSC07345.jpg',
                    '/Images/hull/hull/ForGallery/DSC07346.jpg',
                    '/Images/hull/hull/ForGallery/DSC07349.jpg',
                    '/Images/hull/hull/ForGallery/DSC07350.jpg',
                    '/Images/hull/hull/ForGallery/DSC07359 (1).jpg',
                    '/Images/hull/hull/ForGallery/DSC07359.jpg',
                    // Keeping old image at end of gallery for now (optional removal later)
                    '/Images/hull/gym-in-hull-22.webp'
                ],
                'address' => 'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN',
                'phone' => '+44 1482 678 901',
                'email' => 'hull@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=nfWTbfybzYt&back=1'
            ],
            'durham' => [
                'id' => 7,
                'locationName' => 'ULTRAFLEX DURHAM',
                'locationSlug' => 'durham',
                // Updated primary image for Durham tour detail
                'image' => '/Images/original-787FADAA-6849-48F3-B005-6AD9FB2E74C4-min-min.webp',
                'gallery' => [
                    '/Images/durham/durham/ForGallery/DSC07341.jpg',
                    '/Images/durham/durham/ForGallery/DSC07345.jpg',
                    '/Images/durham/durham/ForGallery/DSC07346.jpg',
                    '/Images/durham/durham/ForGallery/DSC07349.jpg',
                    '/Images/durham/durham/ForGallery/DSC07350.jpg',
                    '/Images/durham/durham/ForGallery/DSC07359 (1).jpg',
                    '/Images/durham/durham/ForGallery/DSC07359.jpg',
                    // Retaining previous webp image at end of gallery for now
                    '/Images/durham/equipment-in-durham.webp'
                ],
                'address' => 'Mandale Business Park, Unit 28D, Kent House, Durham DH1 1TH',
                'phone' => '+44 1913 789 012',
                'email' => 'durham@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/JpALX5roRKE'
            ],
            'derby' => [
                'id' => 8,
                'locationName' => 'ULTRAFLEX DERBY',
                'locationSlug' => 'derby',
                // Updated primary image for Derby tour detail
                'image' => '/Images/processed-5AB78E5E-3190-4963-8AAF-9B3B527D73AD-min-min.webp',
                'gallery' => [
                    '/Images/derby/ForGallery/gym-in-derby-4',
                    '/Images/derby/ForGallery/gym-in-derby-5',
                    '/Images/derby/ForGallery/gym-in-derby-6.webp',
                    '/Images/derby/ForGallery/gym-in-derby-7',
                    '/Images/derby/ForGallery/gym-in-derby-8',
                    '/Images/derby/ForGallery/gym-in-derby-9',
                    '/Images/derby/ForGallery/gym-in-derby-10'
                ],
                'address' => 'Chequers Rd, Derby DE21 6EN',
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
                'address' => 'Ethnarchou Makariou 16, Peristeri 121 32, Greece',
                'phone' => '+30 210 901 2345',
                'email' => 'athens@ultraflexgym.co.uk',
                'tourUrl' => null
            ],
            'lincoln' => [
                'id' => 10,
                'locationName' => 'ULTRAFLEX LINCOLN',
                'locationSlug' => 'lincoln',
                // Updated primary image for Lincoln tour detail
                'image' => '/Images/processed-3CBED414-67C5-41E8-A885-3D42BA69744C-min-min.webp',
                'gallery' => [
                    '/Images/lincoln/ForGallery/gym-in-lincoln-3',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-4',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-5',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-6',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-7.webp',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-8',
                    '/Images/lincoln/ForGallery/gym-in-lincoln-9'
                ],
                'address' => '3 Pioneer Way, Lincoln LN6 3DH',
                'phone' => '+44 1522 012 345',
                'email' => 'lincoln@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/u3qFZpkqxyI'
            ],
            'west-london' => [
                'id' => 11,
                'locationName' => 'ULTRAFLEX WEST LONDON',
                'locationSlug' => 'west-london',
                // Updated primary image for West London tour detail
                'image' => '/Images/processed-F7DB5741-8540-4974-9CCC-A37F83D8733B-min-min.webp',
                'gallery' => [
                    '/Images/westlondon/gym-in-westlondon.webp',
                    '/Images/westlondon/gym-in-westlondon-2',
                    '/Images/westlondon/gym-in-westlondon-3',
                    '/Images/westlondon/gym-in-westlondon-4',
                    '/Images/westlondon/gym-in-westlondon-5',
                    '/Images/westlondon/gym-in-westlondon-6',
                    '/Images/westlondon/gym-in-westlondon-7'
                ],
                'address' => 'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP',
                'phone' => '+44 20 3456 7890',
                'email' => 'westlondon@ultraflexgym.co.uk',
                'tourUrl' => null
            ],
            // Add missing locations based on LocationController
            'west-leeds' => [
                'id' => 1,
                'locationName' => 'ULTRAFLEX WEST LEEDS',
                'locationSlug' => 'west-leeds',
                'image' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
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
                'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
                'phone' => '0113 256 5107',
                'email' => 'leeds@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.matterport.com/show/?m=8gw4DT8ZmVc&back=1'
            ],
            'north-leeds' => [
                'id' => 2,
                'locationName' => 'ULTRAFLEX NORTH LEEDS',
                'locationSlug' => 'north-leeds',
                'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.webp',
                'gallery' => [
                    '/Images/northleeds/northleeds/ForGallery/DSC07341.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07345.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07346.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07349.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07350.jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07359 (1).jpg',
                    '/Images/northleeds/northleeds/ForGallery/DSC07359.jpg',
                    '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.webp'
                ],
                'address' => 'Limewood Approach, Seacroft, Leeds LS14 1NH',
                'phone' => '0113 513 7671',
                'email' => 'northleeds@ultraflexgym.co.uk',
                'tourUrl' => 'https://youtu.be/VgF1a6XxAkc?si=Ki3Z0VdqdKVocs52'
            ],
            'normanton' => [
                'id' => 3,
                'locationName' => 'ULTRAFLEX NORMANTON',
                'locationSlug' => 'normanton',
                'image' => '/Images/newimages/Normanton/gym-in-normanton.webp',
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
                'address' => 'Ripley Dr, Normanton WF6 1QT',
                'phone' => '+44 1924 890 123',
                'email' => 'normanton@ultraflexgym.co.uk',
                'tourUrl' => 'https://my.scene3d.co.uk/tour/ultraflex-normanton-2022'
            ],
            'rotherham' => [
                'id' => 4,
                'locationName' => 'ULTRAFLEX ROTHERHAM',
                'locationSlug' => 'rotherham',
                'image' => '/Images/newimages/Rotherham/gym-in-rotherham.webp',
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
                'address' => '175 Effingham St, Rotherham S65 1BL',
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