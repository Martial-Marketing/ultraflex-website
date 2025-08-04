<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        // Common membership plans for all locations
        $membershipPlans = [
            [
                'id' => 1,
                'name' => 'Day Pass',
                'price' => 12,
                'period' => 'day',
                'features' => ['Single Day Access', 'Top-Quality Equipment', 'Changing Rooms', 'Free Parking'],
                'popular' => false
            ],
            [
                'id' => 2,
                'name' => 'Weekly Pass',
                'price' => 22.50,
                'period' => 'week',
                'features' => ['7 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Free Parking'],
                'popular' => false
            ],
            [
                'id' => 3,
                'name' => 'Monthly Pass',
                'price' => 45,
                'period' => 'month',
                'features' => ['30 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                'popular' => false
            ],
            [
                'id' => 4,
                'name' => 'Monthly Direct Debit',
                'price' => 38.50,
                'period' => 'month',
                'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Value'],
                'popular' => true
            ],
            [
                'id' => 5,
                'name' => '3 Month Pass',
                'price' => 130,
                'period' => '3 months',
                'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                'popular' => false
            ],
            [
                'id' => 6,
                'name' => '6 Month Pass',
                'price' => 230,
                'period' => '6 months',
                'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                'popular' => false
            ],
            [
                'id' => 7,
                'name' => '12 Month Pass',
                'price' => 420,
                'period' => '12 months',
                'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Annual Value'],
                'popular' => false
            ],
            [
                'id' => 8,
                'name' => 'Student Monthly Rolling',
                'price' => 40,
                'period' => 'month',
                'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'All Equipment Access', 'Martial Arts Area'],
                'popular' => false
            ],
        ];

        // Real UltraFlex locations data
        $locations = [
            [
                'id' => 1,
                'name' => 'ULTRAFLEX WEST LEEDS',
                'address' => 'West Park Ring Road, Leeds LS16 6EB, UK',
                'phone' => '0113 256 5107',
                'image' => '/Images/newimages/West Leeds/processed-87E9C2AC-91E6-4D66-A554-A14A6884F806.jpeg',
                'slug' => 'west-leeds',
                'hours' => [
                    'weekdays' => '06:00 - 22:00',
                    'weekends' => '08:00 - 20:00'
                ]
            ],
            [
                'id' => 2,
                'name' => 'ULTRAFLEX NORTH LEEDS',
                'address' => 'Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK',
                'phone' => '0113 513 7669',
                'image' => '/Images/newimages/North Leeds/processed-2FB70114-A5B3-421F-B18F-9259B02EAE0F.jpeg',
                'slug' => 'north-leeds',
                'hours' => [
                    'weekdays' => '06:00 - 22:00',
                    'weekends' => '06:00 - 20:00'
                ]
            ],
            [
                'id' => 3,
                'name' => 'ULTRAFLEX NORMANTON',
                'address' => 'High Street, Normanton WF6 2DB, UK',
                'phone' => '+44 1924 890 123',
                'image' => '/Images/newimages/Normanton/original-9952D7AA-91CB-428C-B334-0861B2D6D9CA.jpeg',
                'slug' => 'normanton',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 4,
                'name' => 'ULTRAFLEX ROTHERHAM',
                'address' => 'Moorgate Street, Rotherham S60 2EY, UK',
                'phone' => '+44 1709 456 789',
                'image' => '/Images/newimages/Rotherham/processed-02A9E771-ED62-4062-A773-9CC3BF76DD80.jpeg',
                'slug' => 'rotherham',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 5,
                'name' => 'ULTRAFLEX YORK',
                'address' => 'Clifton Moor Centre, York YO30 4WR, UK',
                'phone' => '+44 1904 567 890',
                'image' => '/Images/newimages/York/processed-1C75D3B5-0121-44DC-9A0C-46E5DD1CDE59.jpeg',
                'slug' => 'york',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 6,
                'name' => 'ULTRAFLEX HULL',
                'address' => 'Jameson Street, Hull HU1 3DX, UK',
                'phone' => '+44 1482 678 901',
                'image' => '/Images/newimages/Hull/processed-1BE59C03-0910-444C-B36D-32C70D815526.jpeg',
                'slug' => 'hull',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 7,
                'name' => 'ULTRAFLEX DURHAM',
                'address' => 'North Road, Durham DH1 4SQ, UK',
                'phone' => '+44 1913 789 012',
                'image' => '/Images/newimages/Durham/original-78FD4345-1F1E-4451-8ED1-86D9844C4727.jpeg',
                'slug' => 'durham',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 8,
                'name' => 'ULTRAFLEX DERBY',
                'address' => 'St Peters Street, Derby DE1 2AB, UK',
                'phone' => '+44 1332 890 123',
                'image' => '/Images/derby/ForGallery/DSC07346.jpg',
                'slug' => 'derby',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 9,
                'name' => 'ULTRAFLEX ATHENS (GREECE)',
                'address' => 'Vouliagmenis Avenue, Glyfada 166 74, Greece',
                'phone' => '+30 210 901 2345',
                'image' => '/Images/athens/HeroBG/DSC07413.jpg',
                'slug' => 'athens-greece',
                'hours' => [
                    'weekdays' => '6:00 AM - 11:00 PM',
                    'weekends' => '7:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 10,
                'name' => 'ULTRAFLEX LINCOLN',
                'address' => 'High Street, Lincoln LN5 7PJ, UK',
                'phone' => '+44 1522 012 345',
                'image' => '/Images/newimages/Lincoln/processed-4B4F47FA-F1B6-46E4-9870-983DC13A0EA9.jpeg',
                'slug' => 'lincoln',
                'hours' => [
                    'weekdays' => '5:00 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ],
            [
                'id' => 11,
                'name' => 'ULTRAFLEX WEST LONDON',
                'address' => 'Westfield Shopping Centre, London W12 7GF, UK',
                'phone' => '+44 20 3456 7890',
                'image' => '/Images/westlondon/DSC06653-2.jpg',
                'slug' => 'west-london',
                'hours' => [
                    'weekdays' => '5:30 AM - 11:00 PM',
                    'weekends' => '6:00 AM - 10:00 PM'
                ]
            ]
        ];

        return Inertia::render('Locations/Index', [
            'locations' => $locations,
            'membershipPlans' => $membershipPlans,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function show($location)
    {
        // Define location-specific data
        $locationData = [];
        
        switch ($location) {
            case 'west-leeds':
                $locationData = [
                    'id' => 1,
                    'name' => 'ULTRAFLEX WEST LEEDS',
                    'address' => 'West Park Ring Road, Leeds LS16 6EB, UK',
                    'phone' => '0113 256 5107',
                    'email' => 'leeds@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/West Leeds/processed-87E9C2AC-91E6-4D66-A554-A14A6884F806.jpeg',
                    'gallery' => [
                        '/Images/newimages/West Leeds/processed-87E9C2AC-91E6-4D66-A554-A14A6884F806.jpeg',
                        '/Images/newimages/West Leeds/processed-0450649E-F70E-4964-B65D-4EFEC111EC96.jpeg',
                        '/Images/newimages/West Leeds/processed-CFF78B9F-6230-4E23-8A81-D514407375F3.jpeg',
                        '/Images/newimages/West Leeds/processed-D1018833-8E96-476D-BBD7-936806F64B5A.jpeg'
                    ],
                    'slug' => 'west-leeds',
                    'hours' => [
                        'monday' => '06:00 – 22:00',
                        'tuesday' => '06:00 – 22:00',
                        'wednesday' => '06:00 – 22:00',
                        'thursday' => '06:00 – 22:00',
                        'friday' => '06:00 – 22:00',
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Sophia',
                        'bio' => 'UltraFlex Gym in Leeds is regarded as one of the best gyms in Leeds. Our team ensures members can train on top-quality equipment manufactured by the best brand names in the world.',
                        'image' => '/images/managers/sophia.jpg',
                        'experience' => '15+ years experience'
                    ],
                ];
                break;
                
            case 'north-leeds':
                $locationData = [
                    'id' => 2,
                    'name' => 'ULTRAFLEX NORTH LEEDS',
                    'address' => 'Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK',
                    'phone' => '0113 513 7669',
                    'email' => 'northleeds@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/North Leeds/processed-2FB70114-A5B3-421F-B18F-9259B02EAE0F.jpeg',
                    'gallery' => [
                        '/Images/newimages/North Leeds/processed-2FB70114-A5B3-421F-B18F-9259B02EAE0F.jpeg',
                        '/Images/newimages/North Leeds/processed-5EFB986F-A01D-45B4-A639-78BD17AAC227.jpeg',
                        '/Images/newimages/North Leeds/processed-7BA4ED86-23D3-4781-AAA2-EC6614277661.jpeg',
                        '/Images/newimages/North Leeds/processed-10DD967D-7D5C-41F4-B422-BE3971C0DCA1.jpeg',
                        '/Images/newimages/North Leeds/processed-76AF2E09-9ADF-4BBF-9ACA-3162D41E1A55.jpeg',
                        '/Images/newimages/North Leeds/processed-99B601E2-5AD9-470A-8CAF-FC423FC51595.jpeg',
                        '/Images/newimages/North Leeds/processed-BF2DD4B5-1FE7-426D-9754-34E76EF8EE78.jpeg',
                        '/Images/newimages/North Leeds/processed-D9B9ADBE-7CB6-41CD-B6EC-6C35A5F1619A.jpeg',
                        '/Images/newimages/North Leeds/processed-D99ED15F-94AE-4A73-A44C-86D2C965A647.jpeg',
                        '/Images/newimages/North Leeds/processed-ECF0163A-CC4D-4873-ABFB-B89375B52D5F.jpeg',
                        '/Images/newimages/North Leeds/processed-F7B287EF-8436-4457-8B69-A199088FB54B.jpeg',
                        '/Images/newimages/North Leeds/processed-F86F9272-4DEC-484E-8C3F-6E06A7D47E71.jpeg'
                    ],
                    'slug' => 'north-leeds',
                    'hours' => [
                        'monday' => '06:00 – 22:00',
                        'tuesday' => '06:00 – 22:00',
                        'wednesday' => '06:00 – 22:00',
                        'thursday' => '06:00 – 22:00',
                        'friday' => '06:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '06:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Curtis Ryan',
                        'bio' => 'UltraFlex North Leeds is our brand new site which is opening soon in Seacroft, Leeds. This is going to be our biggest and best site yet and just like our other sites, members can train on top-quality equipment manufactured by the best brand names in the world. Whatever the type of physical training you seek, we can provide it.',
                        'image' => '/images/managers/curtis.jpg',
                        'experience' => '12+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 12.50,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Top-Quality Equipment', 'Changing Rooms', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 25.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 52.50,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 48.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 280.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 505.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Mark Thompson',
                            'rating' => 5,
                            'comment' => 'Excited for this new location to open! From what I\'ve seen, it\'s going to be the biggest and best UltraFlex site yet.',
                            'date' => '2025-06-25'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Lisa Johnson',
                            'rating' => 5,
                            'comment' => 'Perfect location in Seacroft. Can\'t wait to train on the top-quality equipment they\'re installing.',
                            'date' => '2025-06-23'
                        ],
                        [
                            'id' => 3,
                            'name' => 'David Wilson',
                            'rating' => 5,
                            'comment' => 'Great to have a premium gym coming to North Leeds. The facilities look amazing!',
                            'date' => '2025-06-21'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Emma Roberts',
                            'rating' => 5,
                            'comment' => 'Love that they\'ll have all types of physical training available. Perfect for my varied workout routine.',
                            'date' => '2025-06-19'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 53.8371,
                        'lng' => -1.4909
                    ]
                ];
                break;
                
            case 'normanton':
                $locationData = [
                    'id' => 3,
                    'name' => 'ULTRAFLEX NORMANTON',
                    'address' => 'High Street, Normanton WF6 2DB, UK',
                    'phone' => '0192 489 5794',
                    'email' => 'normanton@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/Normanton/original-9952D7AA-91CB-428C-B334-0861B2D6D9CA.jpeg',
                    'gallery' => [
                        '/Images/newimages/Normanton/original-9952D7AA-91CB-428C-B334-0861B2D6D9CA.jpeg',
                        '/Images/newimages/Normanton/original-E7E9CE73-12D7-4640-B9A1-97459375660B.jpeg',
                        '/Images/newimages/Normanton/processed-4A39A08A-E6DE-494A-A832-CFA100002638.jpeg',
                        '/Images/newimages/Normanton/processed-4DBB0340-4911-4E16-9359-803AE95C5B41.jpeg',
                        '/Images/newimages/Normanton/processed-32C97997-5EDB-4C17-B558-98833B55CCDE.jpeg',
                        '/Images/newimages/Normanton/processed-36B198E1-BDA5-4A5A-AE2A-11C1E320ACAA.jpeg',
                        '/Images/newimages/Normanton/processed-73E3DEE0-247C-4414-8BFD-685E2FD01BB9.jpeg',
                        '/Images/newimages/Normanton/processed-2452478C-43F1-4675-8B5B-C6FA2C4E01E8.jpeg',
                        '/Images/newimages/Normanton/processed-B81487A2-CC31-40AD-BB62-F83139D88FB1.jpeg',
                        '/Images/newimages/Normanton/processed-D7A5E938-2961-4A96-B14E-530269D9A7E6.jpeg',
                        '/Images/newimages/Normanton/processed-EEC257EE-7EED-41B9-A145-9FADF54E81E9.jpeg'
                    ],
                    'slug' => 'normanton',
                    'hours' => [
                        'monday' => '06:00 – 22:00',
                        'tuesday' => '06:00 – 22:00',
                        'wednesday' => '06:00 – 22:00',
                        'thursday' => '06:00 – 22:00',
                        'friday' => '06:00 – 22:00',
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Shaun Howe',
                        'bio' => 'UltraFlex Normanton offers great location and free parking for all our members. We provide top-quality equipment and excellent facilities in the heart of Normanton.',
                        'image' => '/images/managers/shaun.jpg',
                        'experience' => '10+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 12.50,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Standard Equipment', 'Changing Rooms', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 25.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'Standard Equipment', 'All Facilities', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 48.50,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'Standard Equipment', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 44.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'Standard Equipment', 'All Facilities', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 250.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'Standard Equipment', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 435.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'Standard Equipment', 'All Facilities', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => 'GOLD Day Pass',
                            'price' => 15.00,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Premium Equipment', 'Priority Access', 'Free Parking', 'Towel Service'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'GOLD Weekly Pass',
                            'price' => 30.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'Premium Equipment', 'Priority Access', 'Personal Training Discounts'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'GOLD Monthly Rolling Pass',
                            'price' => 54.50,
                            'period' => 'month',
                            'features' => ['Monthly Rolling', 'Premium Equipment', 'Priority Access', 'Exclusive Classes', 'Personal Training Discounts'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'GOLD Monthly Direct Debit',
                            'price' => 49.50,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Premium Equipment', 'Priority Access', 'Exclusive Classes', 'Best GOLD Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => 'GOLD 6 Month Pass',
                            'price' => 300.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'Premium Equipment', 'Priority Access', 'All GOLD Benefits'],
                            'popular' => false
                        ],
                        [
                            'id' => 12,
                            'name' => 'GOLD 12 Month Pass',
                            'price' => 485.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'Premium Equipment', 'Priority Access', 'Best GOLD Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'James Parker',
                            'rating' => 5,
                            'comment' => 'Great location in Normanton with excellent free parking. The GOLD membership is definitely worth the upgrade!',
                            'date' => '2025-06-25'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Lisa Thompson',
                            'rating' => 5,
                            'comment' => 'Love the convenient location and the equipment is top quality. Free parking makes it so easy to visit.',
                            'date' => '2025-06-22'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Robert Wilson',
                            'rating' => 5,
                            'comment' => 'The GOLD membership perks are fantastic. Priority access and exclusive classes make the difference.',
                            'date' => '2025-06-20'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Sarah Mitchell',
                            'rating' => 5,
                            'comment' => 'Perfect gym in Normanton. Great opening hours and the staff are always helpful.',
                            'date' => '2025-06-18'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 53.7085,
                        'lng' => -1.4168
                    ]
                ];
                break;
                
            case 'rotherham':
                $locationData = [
                    'id' => 4,
                    'name' => 'ULTRAFLEX ROTHERHAM',
                    'address' => 'Moorgate Street, Rotherham S60 2EY, UK',
                    'phone' => '0170 937 7311',
                    'email' => 'rotherham@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/Rotherham/processed-02A9E771-ED62-4062-A773-9CC3BF76DD80.jpeg',
                    'gallery' => [
                        '/Images/newimages/Rotherham/processed-02A9E771-ED62-4062-A773-9CC3BF76DD80.jpeg',
                        '/Images/newimages/Rotherham/processed-3A62DA5E-9C09-488E-91E2-F2C204D74006.jpeg',
                        '/Images/newimages/Rotherham/processed-686C8E39-68D6-4118-8892-326CFF49BCD3.jpeg',
                        '/Images/newimages/Rotherham/processed-C23EEF4E-7957-40BF-A09E-999F4E17257B.jpeg',
                        '/Images/newimages/Rotherham/processed-E7CC8E8F-586F-4CF5-B707-641A064EC19D.jpeg'
                    ],
                    'slug' => 'rotherham',
                    'hours' => [
                        'monday' => '05:00 – 22:00',
                        'tuesday' => '05:00 – 22:00',
                        'wednesday' => '05:00 – 22:00',
                        'thursday' => '05:00 – 22:00',
                        'friday' => '05:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '06:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Morgan Hudson',
                        'bio' => 'UltraFlex Rotherham offers great location and free parking for all our members. We provide top-quality equipment and excellent facilities with early opening times from 5 AM to accommodate all schedules.',
                        'image' => '/images/managers/morgan.jpg',
                        'experience' => '8+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 16.00,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'All Equipment Access', 'Changing Rooms', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 23.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'All Facilities', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 50.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', '12 Month Contract', 'All Equipment Access', 'All Facilities', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 265.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 435.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => 'Student Monthly Rolling',
                            'price' => 46.00,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling Direct Debit', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student 6 Month Pass',
                            'price' => 246.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£246)', '£41 per month equivalent', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student 9 Month Pass',
                            'price' => 360.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£360)', '£40 per month equivalent', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Student 12 Month Pass',
                            'price' => 468.00,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Direct Debit (£468 total)', '£39 per month', 'Best Student Value'],
                            'popular' => false
                        ]
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Tom Anderson',
                            'rating' => 5,
                            'comment' => 'Perfect location in Rotherham with excellent free parking. Love that they open at 5 AM - great for early morning workouts!',
                            'date' => '2025-06-26'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Kelly Roberts',
                            'rating' => 5,
                            'comment' => 'As a student, the student membership options are fantastic value. Great facilities and the staff are always helpful.',
                            'date' => '2025-06-24'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Steve Johnson',
                            'rating' => 5,
                            'comment' => 'Great location with easy access. The early opening hours fit perfectly with my work schedule.',
                            'date' => '2025-06-22'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Amy Wilson',
                            'rating' => 5,
                            'comment' => 'Excellent gym with top-quality equipment. Free parking is a huge plus and the opening hours are very convenient.',
                            'date' => '2025-06-20'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 53.4326,
                        'lng' => -1.3568
                    ]
                ];
                break;
                
            case 'york':
                $locationData = [
                    'id' => 5,
                    'name' => 'ULTRAFLEX YORK',
                    'address' => 'Clifton Moor Centre, York YO30 4WR, UK',
                    'phone' => '+44 1904 567 890',
                    'email' => 'york@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/York/processed-1C75D3B5-0121-44DC-9A0C-46E5DD1CDE59.jpeg',
                    'gallery' => [
                        '/Images/newimages/York/processed-1C75D3B5-0121-44DC-9A0C-46E5DD1CDE59.jpeg',
                        '/Images/newimages/York/processed-4FB818B1-CB0B-4226-93DE-ECBF23EF0630.jpeg',
                        '/Images/newimages/York/processed-5EF5877A-43FD-48A2-BFD3-9D3DD634C60B.jpeg'
                    ],
                    'slug' => 'york',
                    'hours' => [
                        'monday' => '06:00 – 22:00',
                        'tuesday' => '06:00 – 22:00',
                        'wednesday' => '06:00 – 22:00',
                        'thursday' => '06:00 – 22:00',
                        'friday' => '06:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Jason Milner',
                        'bio' => 'UltraFlex Gym in York is rated as one of the best gyms in York, providing members with versatile and top-of-the-line equipment to train on. From 100kg dumbbells to yoga mats, our gym offers something for everyone! The gym location near the city centre also makes it easy for city dwellers looking for a place close by where they can work out after their long day at the office.',
                        'image' => '/images/managers/jason.jpg',
                        'experience' => '11+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 12.00,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Versatile Equipment', '100kg Dumbbells to Yoga Mats', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 25.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'City Centre Location', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 52.50,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Knowledgeable Staff', 'Something for Everyone'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 47.50,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', '12 Month Contract', 'All Equipment Access', 'Expert Staff Support', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '3 Month Pass',
                            'price' => 155.00,
                            'period' => '3 months',
                            'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'Professional Guidance'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 290.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Fitness Goal Support'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 520.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student 6 Month Pass',
                            'price' => 260.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£260)', '£43.33 per month equivalent', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student 9 Month Pass',
                            'price' => 375.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£375)', '£42.00 per month equivalent', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Student 12 Month Pass',
                            'price' => 465.00,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£465)', '£39.00 per month equivalent', 'Best Student Value'],
                            'popular' => false
                        ]
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Charlotte Evans',
                            'rating' => 5,
                            'comment' => 'Definitely one of the best gyms in York! The equipment range is incredible - from 100kg dumbbells to yoga mats, they really do have something for everyone.',
                            'date' => '2025-06-26'
                        ],
                        [
                            'id' => 2,
                            'name' => 'James Mitchell',
                            'rating' => 5,
                            'comment' => 'Perfect location near the city centre. So convenient to pop in after work! The staff are knowledgeable and really help with fitness goals.',
                            'date' => '2025-06-24'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Sophie Turner',
                            'rating' => 5,
                            'comment' => 'As a student, the membership rates are very affordable. Great value for money and the experienced staff really help you get started.',
                            'date' => '2025-06-22'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Robert Davis',
                            'rating' => 5,
                            'comment' => 'Fantastic gym with versatile equipment. The location is excellent for city dwellers and free parking is a huge bonus!',
                            'date' => '2025-06-20'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 54.0059,
                        'lng' => -1.0810
                    ]
                ];
                break;
                
            case 'hull':
                $locationData = [
                    'id' => 6,
                    'name' => 'ULTRAFLEX HULL',
                    'address' => 'Jameson Street, Hull HU1 3DX, UK',
                    'phone' => '+44 1482 678 901',
                    'email' => 'hull@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/Hull/processed-1BE59C03-0910-444C-B36D-32C70D815526.jpeg',
                    'gallery' => [
                        '/Images/newimages/Hull/processed-1BE59C03-0910-444C-B36D-32C70D815526.jpeg',
                        '/Images/newimages/Hull/processed-5B47D6DE-4D02-4629-863B-AB810E138281.jpeg',
                        '/Images/newimages/Hull/processed-8D6FE96B-F41C-4941-AE4D-00FF9FD3AE37.jpeg',
                        '/Images/newimages/Hull/processed-15D8AB96-044B-42F8-B235-0E7C848EDA0D.jpeg',
                        '/Images/newimages/Hull/processed-27DF3E0C-2CC7-42AD-8751-F6E124F08F5D.jpeg',
                        '/Images/newimages/Hull/processed-929C5668-A369-4F9F-97C0-AED066790558.jpeg'
                    ],
                    'slug' => 'hull',
                    'hours' => [
                        'monday' => '05:00 – 22:00',
                        'tuesday' => '05:00 – 22:00',
                        'wednesday' => '05:00 – 22:00',
                        'thursday' => '05:00 – 22:00',
                        'friday' => '05:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '06:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Tronn Bramhill',
                        'bio' => 'UltraFlex Hull provides exceptional fitness facilities in the heart of Hull. Our modern equipment and experienced team create the perfect environment for achieving your fitness goals.',
                        'image' => '/images/managers/tronn.jpg',
                        'experience' => '11+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 12.50,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Top-Quality Equipment', 'Changing Rooms', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 26.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Cardio Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 53.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 48.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 280.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 510.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ]
                ];
                break;
                
            case 'durham':
                $locationData = [
                    'id' => 7,
                    'name' => 'ULTRAFLEX DURHAM',
                    'address' => 'North Road, Durham DH1 4SQ, UK',
                    'phone' => '+44 1913 789 012',
                    'email' => 'durham@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/Durham/original-78FD4345-1F1E-4451-8ED1-86D9844C4727.jpeg',
                    'gallery' => [
                        '/Images/newimages/Durham/original-78FD4345-1F1E-4451-8ED1-86D9844C4727.jpeg',
                        '/Images/newimages/Durham/original-84A42F17-F135-4479-ACEE-E12FF6107430.jpeg',
                        '/Images/newimages/Durham/original-765B73B8-3555-41E6-B680-3C38DED8D5F0.jpeg',
                        '/Images/newimages/Durham/original-1606B7A3-C5DB-4DD9-9C05-B4E4FF463A44.jpeg',
                        '/Images/newimages/Durham/original-B7A6D0E9-9780-4912-B146-A2796C6DBD7D.jpeg'
                    ],
                    'slug' => 'durham',
                    'hours' => [
                        'monday' => '05:00 – 22:00',
                        'tuesday' => '05:00 – 22:00',
                        'wednesday' => '05:00 – 22:00',
                        'thursday' => '05:00 – 22:00',
                        'friday' => '05:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '06:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Mark Bailes',
                        'bio' => 'UltraFlex Durham offers a premium fitness experience in the historic city of Durham. Our facility combines modern equipment with expert guidance to help members achieve their fitness goals.',
                        'image' => '/images/managers/mark.jpg',
                        'experience' => '9+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 11.50,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Top-Quality Equipment', 'Changing Rooms', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 24.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Cardio Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 50.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 270.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 490.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ]
                ];
                break;
                
            case 'derby':
                $locationData = [
                    'id' => 8,
                    'name' => 'ULTRAFLEX DERBY',
                    'address' => 'St Peters Street, Derby DE1 2AB, UK',
                    'phone' => '+44 1332 890 123',
                    'email' => 'derby@ultraflexgym.co.uk',
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
                    'slug' => 'derby',
                    'hours' => [
                        'monday' => '05:00 – 22:00',
                        'tuesday' => '05:00 – 22:00',
                        'wednesday' => '05:00 – 22:00',
                        'thursday' => '05:00 – 22:00',
                        'friday' => '05:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '06:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Ian Evans',
                        'bio' => 'UltraFlex Derby provides our members with a comprehensive fitness experience in the heart of the city. Our facility features state-of-the-art equipment and a welcoming atmosphere for fitness enthusiasts of all levels.',
                        'image' => '/images/managers/ian.jpg',
                        'experience' => '10+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 12.00,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'Top-Quality Equipment', 'Changing Rooms', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 25.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Cardio Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 52.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 275.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 500.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ]
                ];
                break;

            case 'athens-greece':
                $locationData = [
                    'id' => 9,
                    'name' => 'ULTRAFLEX ATHENS (GREECE)',
                    'address' => 'Vouliagmenis Avenue, Glyfada 166 74, Greece',
                    'phone' => '+30 210 901 2345',
                    'email' => 'athens@ultraflexgym.co.uk',
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
                    'slug' => 'athens-greece',
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
                        'name' => 'Dimitris Papadopoulos',
                        'bio' => 'UltraFlex Athens is currently under development and will be our first international location! This exciting new facility in Glyfada will bring the UltraFlex experience to Greece, featuring state-of-the-art equipment and premium amenities. Stay tuned for updates on our grand opening!',
                        'image' => '/images/managers/dimitris.jpg',
                        'experience' => '16+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Pre-Launch Registration',
                            'price' => 0,
                            'period' => 'registration',
                            'features' => ['Early Access Registration', 'Opening Day Notifications', 'Special Launch Offers', 'VIP Opening Event Invite'],
                            'popular' => true
                        ],
                        [
                            'id' => 2,
                            'name' => 'Founding Member (Day Pass)',
                            'price' => 15,
                            'period' => 'day',
                            'features' => ['Coming Soon', 'Founding Member Benefits', 'Premium Equipment Access', 'Mediterranean Fitness Experience'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Founding Member (Monthly)',
                            'price' => 65,
                            'period' => 'month',
                            'features' => ['Coming Soon', 'Founding Member Discount', 'All Equipment Access', 'International UltraFlex Standards'],
                            'popular' => false
                        ]
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Maria Konstantinou',
                            'rating' => 5,
                            'comment' => 'So excited for UltraFlex to open in Athens! Finally, a premium gym chain is coming to Greece. Can\'t wait for the opening!',
                            'date' => '2025-06-25'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Nikos Petridis',
                            'rating' => 5,
                            'comment' => 'The location in Glyfada is perfect! Looking forward to experiencing the UltraFlex quality we\'ve heard so much about.',
                            'date' => '2025-06-22'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Elena Dimitriou',
                            'rating' => 5,
                            'comment' => 'Pre-registered already! This will be a game-changer for fitness in Athens. The international standards are exactly what we need.',
                            'date' => '2025-06-20'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Kostas Andreou',
                            'rating' => 5,
                            'comment' => 'Finally, a world-class gym is coming to Greece! The Glyfada location is ideal and I can\'t wait for the grand opening.',
                            'date' => '2025-06-18'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 37.8651,
                        'lng' => 23.7622
                    ],
                    'developmentUpdates' => [
                        [
                            'date' => '2025-06-01',
                            'update' => 'Construction phase begins - Foundation work in progress'
                        ],
                        [
                            'date' => '2025-05-15',
                            'update' => 'Building permits approved - Ready to start construction'
                        ],
                        [
                            'date' => '2025-04-20',
                            'update' => 'Location secured in prime Glyfada area'
                        ],
                        [
                            'date' => '2025-03-10',
                            'update' => 'UltraFlex announces expansion to Greece'
                        ]
                    ]
                ];
                break;
                
            case 'lincoln':
                $locationData = [
                    'id' => 10,
                    'name' => 'ULTRAFLEX LINCOLN',
                    'address' => 'High Street, Lincoln LN5 7PJ, UK',
                    'phone' => '+44 1522 012 345',
                    'email' => 'lincoln@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/Lincoln/processed-4B4F47FA-F1B6-46E4-9870-983DC13A0EA9.jpeg',
                    'gallery' => [
                        '/Images/newimages/Lincoln/processed-4B4F47FA-F1B6-46E4-9870-983DC13A0EA9.jpeg',
                        '/Images/newimages/Lincoln/processed-4CB42C14-ABF7-4379-AB13-509CA5CEB016.jpeg',
                        '/Images/newimages/Lincoln/processed-38D17425-57E0-4119-BD1C-54053605DD0A.jpeg',
                        '/Images/newimages/Lincoln/processed-95FD96E0-A8DE-4649-BF40-7ECA577FA1D3.jpeg',
                        '/Images/newimages/Lincoln/processed-7468998F-6368-4178-8FB4-D437F39F9884.jpeg',
                        '/Images/newimages/Lincoln/processed-B5F4A1CC-91C3-48E8-8773-C723A38B9528.jpeg',
                        '/Images/newimages/Lincoln/processed-C64B65BB-67FB-4387-BA65-2CB3D05B66FB.jpeg',
                        '/Images/newimages/Lincoln/processed-DDDEB120-7C53-41E5-B9FE-4AFA7C028F78.jpeg'
                    ],
                    'slug' => 'lincoln',
                    'hours' => [
                        'monday' => '24/7 (Full Access) | 06:00 - 22:00 (Day Access)',
                        'tuesday' => '24/7 (Full Access) | 06:00 - 22:00 (Day Access)',
                        'wednesday' => '24/7 (Full Access) | 06:00 - 22:00 (Day Access)',
                        'thursday' => '24/7 (Full Access) | 06:00 - 22:00 (Day Access)',
                        'friday' => '24/7 (Full Access) | 06:00 - 22:00 (Day Access)',
                        'saturday' => '24/7 (Full Access) | 06:00 - 20:00 (Day Access)',
                        'sunday' => '24/7 (Full Access) | 06:00 - 20:00 (Day Access)'
                    ],
                    'manager' => [
                        'name' => 'Lynsey Hind',
                        'bio' => 'Welcome to UltraFlex Lincoln! Ultra Flex Gym in Lincoln is the very first 24hr UltraFlex. It is known for its state-of-the-art facilities and supportive fitness community. Catering to beginners, seasoned athletes, and bodybuilders alike, it offers a comprehensive range of cutting-edge equipment and additional facilities to enhance the membership experience.',
                        'image' => '/images/managers/lynsey.jpg',
                        'experience' => '12+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => '12 Month Day Access - Monthly Direct Debit',
                            'price' => 49.99,
                            'period' => 'month',
                            'features' => ['12 Month Contract', 'Day Access Only', 'Mon-Fri: 06:00-22:00', 'Sat-Sun: 06:00-20:00', 'State-of-the-art Equipment'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => '12 Month 24hr Access - Monthly Direct Debit',
                            'price' => 54.99,
                            'period' => 'month',
                            'features' => ['12 Month Contract', '24/7 Access', 'Train Anytime', 'First 24hr UltraFlex', 'Complete Flexibility'],
                            'popular' => true
                        ],
                        [
                            'id' => 3,
                            'name' => '12 Month Pass - Paid in Full',
                            'price' => 530.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Best Annual Value', 'No Monthly Payments'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '6 Month Pass - Paid in Full',
                            'price' => 295.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'No Monthly Payments', 'Flexible Option'],
                            'popular' => false
                        ]
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'James Harrison',
                            'rating' => 5,
                            'comment' => 'Amazing to have the first 24hr UltraFlex! Perfect for my shift work - I can train at 3am if I want to. State-of-the-art facilities are incredible.',
                            'date' => '2025-06-26'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Sophie Clarke',
                            'rating' => 5,
                            'comment' => 'The supportive fitness community here is fantastic. Whether you\'re a beginner or seasoned athlete, everyone feels welcome.',
                            'date' => '2025-06-24'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Marcus Thompson',
                            'rating' => 5,
                            'comment' => 'As a bodybuilder, the cutting-edge equipment and 24/7 access is exactly what I needed. Lincoln\'s gym scene has been transformed!',
                            'date' => '2025-06-22'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Rachel Davis',
                            'rating' => 5,
                            'comment' => 'The welcoming environment really motivates you to achieve your fitness goals. Great to have day access option too for those who prefer regular hours.',
                            'date' => '2025-06-20'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 53.2307,
                        'lng' => -0.5406
                    ]
                ];
                break;

            case 'west-london':
                $locationData = [
                    'id' => 11,
                    'name' => 'ULTRAFLEX WEST LONDON',
                    'address' => 'Westfield Shopping Centre, London W12 7GF, UK',
                    'phone' => '+44 20 3456 7890',
                    'email' => 'westlondon@ultraflexgym.co.uk',
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
                    'slug' => 'west-london',
                    'hours' => [
                        'monday' => '05:30 – 22:30',
                        'tuesday' => '05:30 – 22:30',
                        'wednesday' => '05:30 – 22:30',
                        'thursday' => '05:30 – 22:30',
                        'friday' => '05:30 – 22:30',
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Oliver Harrison',
                        'bio' => 'UltraFlex West London is our premier location in the heart of London, situated in the iconic Westfield Shopping Centre. We provide world-class fitness facilities with extended opening hours to accommodate the busy London lifestyle.',
                        'image' => '/images/managers/oliver.jpg',
                        'experience' => '15+ years experience'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Day Pass',
                            'price' => 12.50,
                            'period' => 'day',
                            'features' => ['Single Day Access', 'All Equipment Access', 'Westfield Location', 'Extended Hours'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 27.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Premium London Location', 'Early Opening 05:30'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['No Contract', 'Monthly Rolling', 'All Equipment Access', 'Maximum Flexibility', 'Central London Location'],
                            'popular' => true
                        ],
                        [
                            'id' => 4,
                            'name' => '6 Month Pass',
                            'price' => 245.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Best Value Option', '£40.83 per month equivalent'],
                            'popular' => false
                        ]
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Alexandra Sterling',
                            'rating' => 5,
                            'comment' => 'Perfect location in Westfield! So convenient for shopping and working out. The early 5:30 AM opening is brilliant for my morning routine before work in the city.',
                            'date' => '2025-06-26'
                        ],
                        [
                            'id' => 2,
                            'name' => 'James Whitfield',
                            'rating' => 5,
                            'comment' => 'Love the no-contract monthly rolling option - perfect for my London lifestyle. Extended hours until 22:30 means I can train after long work days.',
                            'date' => '2025-06-24'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Sophie Cambridge',
                            'rating' => 5,
                            'comment' => 'Amazing gym in the heart of West London. The location in Westfield makes it so easy to combine with other activities. Top-quality equipment!',
                            'date' => '2025-06-22'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Michael Thornton',
                            'rating' => 5,
                            'comment' => 'The 6-month pass is excellent value at just over £40 per month. Great facilities and the extended weekend hours work perfectly with my schedule.',
                            'date' => '2025-06-20'
                        ]
                    ],
                    'coordinates' => [
                        'lat' => 51.5074,
                        'lng' => -0.2296
                    ]
                ];
                break;
                
            default:
                // Default to West Leeds data for other locations
                $locationData = [
                    'id' => 1,
                    'name' => 'ULTRAFLEX WEST LEEDS',
                    'address' => 'West Park Ring Road, Leeds LS16 6EB, UK',
                    'phone' => '0113 256 5107',
                    'email' => 'leeds@ultraflexgym.co.uk',
                    'image' => '/Images/westleeds/UFG (100) (2).jpg',
                    'gallery' => [
                        '/Images/westleeds/westleeds/ForGallery/DSC07341.jpg',
                        '/Images/westleeds/westleeds/ForGallery/DSC07345.jpg',
                        '/Images/westleeds/westleeds/ForGallery/DSC07346.jpg',
                        '/Images/westleeds/westleeds/ForGallery/DSC07349.jpg',
                        '/Images/westleeds/westleeds/ForGallery/DSC07350.jpg',
                        '/Images/westleeds/westleeds/ForGallery/DSC07359 (1).jpg',
                        '/Images/westleeds/westleeds/ForGallery/DSC07359.jpg',
                        '/Images/westleeds/UFG (100) (2).jpg'
                    ],
                    'slug' => 'west-leeds',
                    'hours' => [
                        'monday' => '06:00 – 22:00',
                        'tuesday' => '06:00 – 22:00',
                        'wednesday' => '06:00 – 22:00',
                        'thursday' => '06:00 – 22:00',
                        'friday' => '06:00 – 22:00',
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'James Mitchell',
                        'bio' => 'UltraFlex Gym in Leeds is regarded as one of the best gyms in Leeds. Our team ensures members can train on top-quality equipment manufactured by the best brand names in the world.',
                        'image' => '/images/managers/james.jpg',
                        'experience' => '15+ years experience'
                    ],
                ];
        }
        
        // Common data for all locations
        $commonData = [
            'equipment' => [
                ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                ['name' => 'Martial Arts Area', 'icon' => 'users', 'available' => true],
                ['name' => 'Physiotherapy Clinic', 'icon' => 'users', 'available' => true],
                ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                ['name' => 'WiFi', 'icon' => 'wifi', 'available' => true],
            ],
            'amenities' => [
                'Top-quality equipment from best brand names',
                'Comfortable changing rooms',
                'Martial arts area',
                'Physiotherapy clinic',
                'Free on-site parking',
                'Easy public transport access'
            ],
            'trainers' => [
                [
                    'id' => 1,
                    'name' => 'Sarah Wilson',
                    'image' => '/images/trainers/sarah.jpg',
                    'specialties' => ['Strength Training', 'Weight Loss'],
                    'slug' => 'sarah-wilson'
                ],
                [
                    'id' => 2,
                    'name' => 'Mike Thompson',
                    'image' => '/images/trainers/mike.jpg',
                    'specialties' => ['Martial Arts', 'Functional Training'],
                    'slug' => 'mike-thompson'
                ],
                [
                    'id' => 3,
                    'name' => 'Dr. Emma Roberts',
                    'image' => '/images/trainers/emma.jpg',
                    'specialties' => ['Physiotherapy', 'Injury Recovery'],
                    'slug' => 'emma-roberts'
                ]
            ],
            'gallery' => [
                '/images/gallery/west-leeds-machines.jpg',
                '/images/gallery/west-leeds-changing.jpg',
                '/images/gallery/west-leeds-martial-arts.jpg',
                '/images/gallery/west-leeds-physio.jpg',
                '/images/gallery/west-leeds-parking.jpg',
                '/images/gallery/west-leeds-exterior.jpg'
            ],
            'membershipPlans' => [
                [
                    'id' => 1,
                    'name' => 'Day Pass',
                    'price' => 12,
                    'period' => 'day',
                    'features' => ['Single Day Access', 'Top-Quality Equipment', 'Changing Rooms', 'Free Parking'],
                    'popular' => false
                ],
                [
                    'id' => 2,
                    'name' => 'Weekly Pass',
                    'price' => 22.50,
                    'period' => 'week',
                    'features' => ['7 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Free Parking'],
                    'popular' => false
                ],
                [
                    'id' => 3,
                    'name' => 'Monthly Pass',
                    'price' => 45,
                    'period' => 'month',
                    'features' => ['30 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                    'popular' => false
                ],
                [
                    'id' => 4,
                    'name' => 'Monthly Direct Debit',
                    'price' => 38.50,
                    'period' => 'month',
                    'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Value'],
                    'popular' => true
                ],
                [
                    'id' => 5,
                    'name' => '3 Month Pass',
                    'price' => 130,
                    'period' => '3 months',
                    'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                    'popular' => false
                ],
                [
                    'id' => 6,
                    'name' => '6 Month Pass',
                    'price' => 230,
                    'period' => '6 months',
                    'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                    'popular' => false
                ],
                [
                    'id' => 7,
                    'name' => '12 Month Pass',
                    'price' => 420,
                    'period' => '12 months',
                    'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Annual Value'],
                    'popular' => false
                ],
                [
                    'id' => 8,
                    'name' => 'Student Monthly Rolling',
                    'price' => 40,
                    'period' => 'month',
                    'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'All Equipment Access', 'Martial Arts Area'],
                    'popular' => false
                ],
                [
                    'id' => 9,
                    'name' => 'Student 6 Month Pass',
                    'price' => 210,
                    'period' => '6 months',
                    'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area'],
                    'popular' => false
                ],
                [
                    'id' => 10,
                    'name' => 'Student 9 Month Pass',
                    'price' => 310,
                    'period' => '9 months',
                    'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area'],
                    'popular' => false
                ],
                [
                    'id' => 11,
                    'name' => 'Student 12 Month Pass',
                    'price' => 380,
                    'period' => '12 months',
                    'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Best Student Value'],
                    'popular' => false
                ]
            ],
            'virtualTour' => 'https://www.youtube.com/embed/sample-virtual-tour'
        ];

        // Add default reviews and coordinates if not specified
        if (!isset($locationData['reviews'])) {
            $commonData['reviews'] = [
                [
                    'id' => 1,
                    'name' => 'Emma Davis',
                    'rating' => 5,
                    'comment' => 'UltraFlex Leeds truly is one of the best gyms in Leeds! The equipment quality is outstanding and the martial arts area is fantastic.',
                    'date' => '2025-06-20'
                ],
                [
                    'id' => 2,
                    'name' => 'David Brown',
                    'rating' => 5,
                    'comment' => 'Great location with free parking. Easy to get to after work and the changing rooms are very comfortable.',
                    'date' => '2025-06-18'
                ],
                [
                    'id' => 3,
                    'name' => 'Sarah Johnson',
                    'rating' => 5,
                    'comment' => 'The physiotherapy clinic is excellent and having access to top brand equipment makes all the difference in my training.',
                    'date' => '2025-06-15'
                ],
                [
                    'id' => 4,
                    'name' => 'Mark Wilson',
                    'rating' => 5,
                    'comment' => 'Perfect for dropping in after work. The public transport links are great and free parking is a huge bonus!',
                    'date' => '2025-06-12'
                ]
            ];
        }

        if (!isset($locationData['coordinates'])) {
            $commonData['coordinates'] = [
                'lat' => 53.8508,
                'lng' => -1.6044
            ];
        }

        $locationData = array_merge($commonData, $locationData);

        return Inertia::render('Locations/Show', [
            'location' => $locationData,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}