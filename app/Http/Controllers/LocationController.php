<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ImageService;

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
                // Updated processed hero image
                'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg',
                'features' => ['Single Day Access', 'All Equipment Access', 'Visitor Friendly'],
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
                'image' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
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
                // Updated processed hero image
                'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg',
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
                'image' => '/Images/newimages/Normanton/gym-in-normanton.webp',
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
                'image' => '/Images/newimages/Rotherham/gym-in-rotherham.webp',
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
                'image' => '/Images/newimages/York/gym-in-york.webp',
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
                // Updated processed hero image
                'image' => '/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.jpeg',
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
                // Updated processed hero image
                'image' => '/Images/original-787FADAA-6849-48F3-B005-6AD9FB2E74C4-min-min.jpeg',
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
                // Updated processed hero image
                'image' => '/Images/processed-5AB78E5E-3190-4963-8AAF-9B3B527D73AD-min-min.jpeg',
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
                'image' => '/Images/athens/HeroBG/gym-in-athens-16.webp',
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
                // Updated processed hero image
                'image' => '/Images/processed-3CBED414-67C5-41E8-A885-3D42BA69744C-min-min.jpeg',
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
                // Updated processed hero image
                'image' => '/Images/processed-F7DB5741-8540-4974-9CCC-A37F83D8733B-min-min.jpeg',
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
                    'image' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
                    'gallery' => [
                        '/Images/newimages/West Leeds/gym-in-westleeds.webp',
                        '/Images/newimages/West Leeds/gym-in-westleeds-2.webp',
                        '/Images/newimages/West Leeds/gym-in-westleeds-3.webp',
                        '/Images/newimages/West Leeds/gym-in-westleeds-4.webp'
                    ],
                    'slug' => 'west-leeds',
                    // Provided Matterport link
                    'virtualTour' => 'https://my.matterport.com/show/?m=8gw4DT8ZmVc&back=1',
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
                        'bio' => 'As the Manager of Ultraflex West Leeds, I’m proud to lead the team at the very first Ultraflex gym established in the UK on 17th January 2017. Since opening our doors, West Leeds has built a strong reputation as a cornerstone of the Ultraflex community—known for our unbeatable atmosphere, elite equipment, and commitment to helping people at all levels of fitness achieve real results.\n\nMy journey with Ultraflex has been driven by a passion for creating an environment where members feel empowered, supported, and motivated. Whether you\'re stepping into the gym for the first time or preparing for your next competition, we’re here to provide expert guidance, a welcoming community, and world-class facilities.\n\nI oversee day-to-day operations, member engagement, staff development, and community outreach, ensuring Ultraflex West Leeds continues to set the standard for excellence in fitness. I’m proud of our diverse membership base—from beginners to IFBB pros—and the culture of respect, discipline, and dedication that makes our gym more than just a place to train.\n\nUltraflex West Leeds is where it all started—and under my management, we continue to innovate, grow, and lead the way for all the Ultraflex gyms across the UK.',
                        'image' => '/Images/managers/sophia.jpg',
                        'experience' => null
                    ],
                    'services' => [
                        [
                            'name' => 'Ostas Boxing',
                            'description' => 'Boxing coaching and training development based within the facility.',
                            'icon' => null
                        ],
                        [
                            'name' => 'Smitin Hair Systems',
                            'description' => 'Specialist hair system services and consultation.',
                            'icon' => null
                        ],
                        [
                            'name' => 'Pudsey Judo Club',
                            'description' => 'Local judo club partnership promoting grappling and discipline.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'RnR Bodytherapy Website', 'url' => 'https://www.rnrbodytherappy.co.uk', 'type' => 'website' ],
                        [ 'label' => 'Ostas Boxing Instagram', 'url' => 'https://www.instagram.com/ostasboxing', 'type' => 'instagram' ],
                        [ 'label' => 'Smitin Hair Systems Email', 'url' => 'mailto:Smitinhairsystems@outlook.com', 'type' => 'email' ],
                        [ 'label' => 'Smitin Hair Systems Instagram', 'url' => 'https://www.instagram.com/smitin_hairsystems', 'type' => 'instagram' ],
                        [ 'label' => 'Pudsey Judo Club Facebook', 'url' => 'https://www.facebook.com/pudseyjudoclub', 'type' => 'facebook' ],
                        [ 'label' => 'Pudsey Judo Club Instagram', 'url' => 'https://www.instagram.com/pudseyjudoclub', 'type' => 'instagram' ],
                        [ 'label' => 'Ostas Boxing Instagram (Alt)', 'url' => 'https://www.instagram.com/ostasboxing', 'type' => 'instagram' ]
                    ],
                    'trainers' => [
                        [
                            'id' => 1,
                            'name' => 'Zarina Rashid',
                            'slug' => 'zarina-rashid',
                            'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                            'bio' => "Hi, I'm Zarina, Face to Face and Online Personal Trainer. With over 10 years experience in the Industry. My background is in Bodybuilding, Nutrition and Martial Arts. My affinity for Health and Wellbeing is reflected in my approach when working with clients. Though I am extremely results oriented, and have created many excellent Body Transformations, my work has a great emphasis on nutrition, and creating excellent lifestyle habits rendering my clients able to live a Happier, stronger more functional life. My clients range from 16 yrs to 70 yrs plus, and vary from students to Company CEO's. If you are looking for help to improve your shape, your health and abilities in the gym message me for a complimentary session and chat about how I can support you.",
                            'specialties' => ['Bodybuilding', 'Nutrition', 'Martial Arts', 'Lifestyle Coaching'],
                            'certifications' => [],
                            'experienceYears' => 10,
                            'contact' => [
                                'instagram' => 'https://www.instagram.com/zarina_rashid_',
                                'phone' => '+447954848477'
                            ],
                            'availability' => 'Accepting Clients'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Holly McV Fitness',
                            'slug' => 'holly-mcv-fitness',
                            'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                            'bio' => "Hiya, my name's Holly and I’m a fully qualified personal trainer! I have around 5 years of experience training, and teaching myself everything as a beginner to where I am now! My passion for fitness started when I first started lifting weights; from this day onwards I fell in love with the gym. This love soon turned into a passion of wanting to help and teach others, alongside achieving some amazing physical but also mental goals! My aim as your trainer and friend is to help reach your goals, teach you, show you, work on building up your confidence and self esteem, and make some incredible changes both body and mind! Your journey with me includes support 24/7—keeping you motivated, teaching you, showing you, educating you, designing fitness programmes for you, and of course making each session fun and enjoyable! When you start with me we are working on life long habits, maintaining balance so you can enjoy the gym as well as life! Remember your goals do not need to stop you from enjoying your life. Here we will work together to find that balance! I can’t do this on my own, so I need us to work together as a team to make these goals achievable. We will work together to get you exactly where you want to be, this is all about you so bring on the journey.",
                            'specialties' => ['Confidence Building', 'Strength Training', 'Habit Coaching', 'Lifestyle Balance'],
                            'certifications' => ['Fully Qualified Personal Trainer'],
                            'experienceYears' => 5,
                            'contact' => [
                                'instagram' => 'https://www.instagram.com/hollymcvfitnesscoach',
                                'facebook' => 'https://www.facebook.com/hollymcvfitnesscoach',
                                'email' => 'hollymcvfitnesscoach@gmail.com'
                            ],
                            'availability' => 'Accepting Clients'
                        ]
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
                    'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg',
                    'gallery' => [
                        '/Images/newimages/North Leeds/gym-in-northleeds.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-2.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-3.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-4.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-5.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-6.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-7.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-8.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-9.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-10.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-11.webp',
                        '/Images/newimages/North Leeds/gym-in-northleeds-12.webp'
                    ],
                    'slug' => 'north-leeds',
                    // YouTube link (direct) for North Leeds virtual tour
                    'virtualTour' => 'https://youtu.be/VgF1a6XxAkc?si=Ki3Z0VdqdKVocs52',
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
                        'name' => 'Curtis',
                        'bio' => 'Hello and welcome to UltraFlex North Leeds I’m Curtis and I cannot wait to welcome you through our doors. Now of course I am bias but when becoming a member at North Leeds you are joining the best gym in country, with a friendly face to welcome you on every visit and staff on hand all the time to make sure your experience with us is the best every time we really do ensure that all your sessions are amazing. Do not just take my word for it thought, come down, check us out and I know you’ll never need to look for another gym again.',
                        'image' => '/Images/North Leeds Gym Manager.webp',
                        'experience' => ''
                    ],
                    // Services & partners for North Leeds
                    'services' => [
                        ['name' => 'Levels Barbers', 'description' => 'On-site barber services for members.'],
                        ['name' => 'Regen Physio', 'description' => 'Physiotherapy & rehab services supporting recovery.'],
                        ['name' => 'IMA', 'description' => 'Specialist coaching / instruction (details forthcoming).'],
                        ['name' => 'Ultra Car Wash', 'description' => 'Convenient on-site car wash service while you train.']
                    ],
                    'serviceLinks' => [
                        ['label' => 'Levels Barbers Instagram', 'url' => 'https://www.instagram.com/levelsbarbershopnorthleeds', 'type' => 'external'],
                        ['label' => 'Regen Physio Link', 'url' => 'https://bit.ly/m/RegenPhysio', 'type' => 'external'],
                        ['label' => 'Ultra Car Wash Instagram', 'url' => 'https://www.instagram.com/ultracarwashnorthleeds', 'type' => 'external'],
                        ['label' => 'IMA Instagram', 'url' => 'https://www.instagram.com/IMA.leeds', 'type' => 'external']
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
                    'image' => '/Images/newimages/Normanton/gym-in-normanton.webp',
                    'gallery' => [
                        '/Images/newimages/Normanton/gym-in-normanton.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-2.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-6.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-7.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-4.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-5.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-8.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-3.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-9.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-10.webp',
                        '/Images/newimages/Normanton/gym-in-normanton-11.webp'
                    ],
                    'slug' => 'normanton',
                    // Scene3D tour link
                    'virtualTour' => 'https://my.scene3d.co.uk/tour/ultraflex-normanton-2022',
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
                        'name' => 'Shaun',
                        'bio' => 'Welcome to our gym! I’m thrilled to have you as part of our community and can’t wait for you to experience everything we have to offer. What makes our gym so special isn’t just the state-of-the-art equipment, but the welcoming atmosphere where everyone—from beginners to seasoned athletes—can feel comfortable and supported.\n\nI truly believe fitness should be fun, motivating, and something you look forward to each day. That’s why we’ve built a team of friendly, knowledgeable staff and trainers who are always here to help you reach your goals. Whether you’re lifting, cycling, stretching, or just starting your journey, you’ll always find encouragement here.\n\nA little about me—I’m passionate about health, wellness, and helping people discover what works best for them. I love seeing members achieve milestones, big or small, and I’m always up for a chat about training, nutrition, or even just your favorite workout playlist.\n\nThe best way to reach me is by stopping by the front desk for a quick hello, or you can drop me an email or call anytime—I’m always happy to help.\n\nThank you for choosing our gym. I’m excited to see you around and to be part of your fitness journey!',
                        'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                        'experience' => ''
                    ],
                    // Newly added structured fields for Normanton
                    'features' => [
                        'Male & Female Recovery Rooms',
                        'Sauna',
                        'Ice Bath'
                    ],
                    // Location Services intentionally left blank as requested
                    'services' => [],
                    'serviceLinks' => [
                        // House of Wellness
                        ['label' => 'House of Wellness (Bloods)', 'url' => 'https://houseofwellness.com', 'type' => 'external'],
                        ['label' => 'House of Wellness Facebook', 'url' => 'https://www.facebook.com/HouseOfWellnessUK', 'type' => 'external'],
                        ['label' => 'House of Wellness Instagram', 'url' => 'https://www.instagram.com/houseofwellnessuk', 'type' => 'external'],
                        ['label' => 'House of Wellness TikTok', 'url' => 'https://www.tiktok.com/@houseofwellnessuk', 'type' => 'external'],
                        // Elite Osteo Midlands
                        ['label' => 'Elite Osteo Midlands Website', 'url' => 'https://eliteosteo.co.uk', 'type' => 'external'],
                        ['label' => 'Elite Osteo Midlands Instagram', 'url' => 'https://www.instagram.com/eliteosteo.midlands', 'type' => 'external'],
                        // Fusion Rehab
                        ['label' => 'Fusion Rehab Instagram', 'url' => 'https://www.instagram.com/Fusion_rehab_', 'type' => 'external']
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
                    'image' => '/Images/newimages/Rotherham/gym-in-rotherham.webp',
                    'gallery' => [
                        '/Images/newimages/Rotherham/gym-in-rotherham.webp',
                        '/Images/newimages/Rotherham/gym-in-rotherham-2.webp',
                        '/Images/newimages/Rotherham/gym-in-rotherham-3.webp',
                        '/Images/newimages/Rotherham/gym-in-rotherham-4.webp',
                        '/Images/newimages/Rotherham/gym-in-rotherham-5.webp'
                    ],
                    'slug' => 'rotherham',
                    // Provided Matterport link (updated)
                    'virtualTour' => 'https://my.matterport.com/show/?m=qcrWz3BZzrj&back=1',
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
                        'name' => 'Morgan',
                        'bio' => 'Hi all, I’m Morgan the manager at Ultraflex Rotherham and I take great pride in the continuation of building and progressing our reputation that we have earned for being one of the best training facilities around, I’m passionate that I am able to contribute to this gym that many members find as a second home, and creating a space where you are all able to fit right into the community. I work closely with our staff team in ensuring that our gym is accommodating for all, and standards are pushed and maintained to exceed expectations across all aspects. Fitness and training has always played a key role for me personally, and speaking from experience 6 years ago I was drawn into what Ultraflex Rotherham had to offer to me as a member, and I soon realised that it was the best around, for what started as a personal fitness journey I soon realised that I wanted to be in a position where I could grow both physically and mentally, which years later has led me to be in the position where I feel proud to be able to manage this world renowned facility and how important it is to be able to create an environment that supports our members individual journeys. Throughout my duration of being a part of Ultraflex Rotherham, whether that being member or manager it has been amazing to witness just how Ultraflex has evolved and the impact it has on the people that spend their time here. I’m excited to see what else lies ahead and hopefully we’ll see you down here.',
                        'image' => '/Images/managers/morgan.jpg',
                        'experience' => ''
                    ],
                    'features' => [
                        '2x Posing Rooms',
                        'Recovery Room (Infrared Sauna & Ice Bath)'
                    ],
                    'services' => [
                        [
                            'name' => 'RnR Bodytherapy',
                            'description' => 'Sports massage service supporting recovery and performance.'
                        ]
                    ],
                    'serviceLinks' => [
                        [
                            'label' => 'RnR Bodytherapy Website',
                            'url' => 'https://www.rnrbodytherappy.co.uk',
                            'type' => 'external'
                        ]
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
                    'image' => '/Images/newimages/York/gym-in-york.webp',
                    'gallery' => [
                        '/Images/newimages/York/gym-in-york.webp',
                        '/Images/newimages/York/gym-in-york-2.webp',
                        '/Images/newimages/York/gym-in-york-3.webp'
                    ],
                    'slug' => 'york',
                    // Provided Matterport link (updated)
                    'virtualTour' => 'https://my.matterport.com/show/?m=kZ7SPKSyTMt&back=1',
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
                        'name' => 'Jason',
                        'bio' => 'Welcome to UltraFlex York, my name is Jason and I\'m your General Manager. I\'ve been running the York UltraFlex for two years now and in that time I\'ve seen so much re-investment into the gym and the facilities here which makes my job infinitely easier. In total over two years, we have added over a dozen new items of top-quality kit from cardio equipment to strength training to an entire new area dedicated to Boxing and Martial Arts. I\'ve never worked in a business that consistently re-invests like UltraFlex and it reflects with the loyalty and community that our members feel here. We have some of the best PTs in the business and as an ex-Fighter I train with our Thai Boxing Coach as well as our PT who was England NABBA Winner & UK NABBA Winner. I personally could not imagine training anywhere else now that I’ve been exposed to UltraFlex gyms.\n\nWe are always active on our socials and respond to DMs straight away as well as encouraging members to tag us in their workouts or comps. We regularly host Open Days and Member Giveaways as well as charity events and member socials which are great meet and greets for the members and staff.\n\nAny information you need you can email us on york@ultraflexgym.co.uk or drop us a message on any of our socials.',
                        'image' => '/Images/managers/jason.jpg',
                        'experience' => null
                    ],
                    'services' => [
                        [
                            'name' => 'Regen Physio',
                            'description' => 'Physiotherapy and rehabilitation clinic for injury prevention and performance.',
                            'icon' => null
                        ],
                        [
                            'name' => 'The Yorkshire Clipper',
                            'description' => 'On-site barber services for member convenience.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'Regen Physio Instagram', 'url' => 'https://www.instagram.com/regenphysio/', 'type' => 'instagram' ],
                        [ 'label' => 'Regen Physio Email', 'url' => 'mailto:info@regenphysio.co.uk', 'type' => 'email' ],
                        [ 'label' => 'Regen Physio Website', 'url' => 'https://www.regenphysio.co.uk/clinics/york', 'type' => 'website' ],
                        [ 'label' => 'The Yorkshire Clipper Instagram', 'url' => 'https://www.instagram.com/the_yorkshireclipper/', 'type' => 'instagram' ],
                        [ 'label' => 'The Yorkshire Clipper Website', 'url' => 'https://booksy.com/en-gb/55134_the-yorkshire-clipper_barber_1498807_york', 'type' => 'website' ]
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
                    // Updated primary image for Hull location
                    'image' => '/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.jpeg',
                    'gallery' => [
                        '/Images/newimages/Hull/gym-in-hull-2.webp',
                        '/Images/newimages/Hull/gym-in-hull-4.webp',
                        '/Images/newimages/Hull/gym-in-hull-5.webp',
                        '/Images/newimages/Hull/gym-in-hull.webp',
                        '/Images/newimages/Hull/gym-in-hull-3.webp',
                        '/Images/newimages/Hull/gym-in-hull-6.webp'
                    ],
                    'slug' => 'hull',
                    // Provided Matterport link (updated)
                    'virtualTour' => 'https://my.matterport.com/show/?m=nfWTbfybzYt&back=1',
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
                        'name' => 'Tronn',
                        'bio' => 'Welcome to Ultraflex Gym Hull, the ultimate training facility for those serious about fitness.\n\nMy name is Tronn (yes, it’s a strange name, yes, it is my real name!) and I’ve been the manager of this incredible facility for over 3 years now.\n\nWhether you\'re a competitive athlete, aspiring bodybuilder, or just beginning your fitness journey, Ultraflex Hull is designed to help you push boundaries and achieve real results. Our state-of-the-art gym is packed with industry-leading equipment, an intense training atmosphere, and a community that thrives on hard work and dedication.\n\nWe offer a full range of strength and conditioning machines, free weights, cardio equipment, and specialist areas for functional and combat training. At Ultraflex, every detail is designed to support performance, progress, and passion. This isn’t just a place to work out – it’s where you transform both body and mind.\n\nOur expert team of personal trainers, coaches, and athletes are on hand to guide, motivate, and challenge you. Whether your goals are to build muscle, lose fat, increase endurance, or simply become the best version of yourself, you’ll find the tools and support here to make it happen.\n\nLocated in the heart of Hull with ample parking and flexible memberships, Ultraflex Gym is open seven days a week to fit around your lifestyle. We also host regular seminars, competitions, and events to keep your training fresh and focused.',
                        'image' => '/Images/Hull Gym Manager.webp',
                        'experience' => ''
                    ],
                    'features' => [
                        'Industry-Leading Equipment',
                        'Intense Training Atmosphere',
                        'Functional & Combat Training Areas',
                        'Strength & Conditioning Machines',
                        'Free Weights & Cardio Zones',
                        'Seminars, Competitions & Events'
                    ],
                    'services' => [],
                    'serviceLinks' => [],
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
                    // Updated primary image for Durham location
                    'image' => '/Images/original-787FADAA-6849-48F3-B005-6AD9FB2E74C4-min-min.jpeg',
                    'gallery' => [
                        '/Images/newimages/Durham/gym-in-durham-3.webp',
                        '/Images/newimages/Durham/gym-in-durham-4.webp',
                        '/Images/newimages/Durham/gym-in-durham-2.webp',
                        '/Images/newimages/Durham/gym-in-durham.webp',
                        '/Images/newimages/Durham/gym-in-durham-5.webp'
                    ],
                    'slug' => 'durham',
                    // YouTube link
                    'virtualTour' => 'https://www.youtube.com/embed/JpALX5roRKE',
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
                        'bio' => 'I have been working here for 5 years since we opened in 2020.\n\nI have worked in the gym industry now for 20 years and have a lot of knowledge and experience, I am also a qualified level 3 personal trainer and offer 1 to 1 sessions in the gym.\n\nI am also a competitive bodybuilder who can offer training and nutrition advice if required.\n\nI am a very friendly and approachable person and will go out of my way to help anyone who requires any assistance.',
                        'image' => '/Images/Durham Gym Manager.webp',
                        'experience' => ''
                    ],
                    'services' => [
                        ['name' => 'Baxters Barbers', 'description' => 'On-site barber services for members.'],
                        ['name' => 'Regen Physio (George)', 'description' => 'Physiotherapy and rehabilitation support from George.']
                    ],
                    'serviceLinks' => [
                        ['label' => 'Baxters Barbers Instagram', 'url' => 'https://www.instagram.com/Baxters_barbers', 'type' => 'external'],
                        ['label' => 'Regen Physio (George) Instagram', 'url' => 'https://www.instagram.com/George_regendurham', 'type' => 'external']
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
                    // Updated primary image for Derby location
                    'image' => '/Images/processed-5AB78E5E-3190-4963-8AAF-9B3B527D73AD-min-min.jpeg',
                    'gallery' => [
                        '/Images/derby/ForGallery/gym-in-derby-5.webp',
                        '/Images/derby/ForGallery/gym-in-derby-6.webp',
                        '/Images/derby/ForGallery/gym-in-derby-4.webp',
                        '/Images/derby/ForGallery/gym-in-derby-7.webp',
                        '/Images/derby/ForGallery/gym-in-derby-8.webp',
                        '/Images/derby/ForGallery/gym-in-derby-9.webp',
                        '/Images/derby/ForGallery/gym-in-derby-10.webp'
                    ],
                    'slug' => 'derby',
                    // YouTube link
                    'virtualTour' => 'https://www.youtube.com/embed/VKlANmwoDPQ',
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
                        'name' => 'Ian',
                        'bio' => 'Welcome to Ultraflex Derby. With over 200 pieces of the best gym machinery from several different brands, a full sized boxing ring, and powerlifting cage, located in a 20k sq ft facility, you are entering the best equipped gym in the Midlands. Here we bring the best training experience for everyone, an amazing team to support you and provide the perfect environment no matter what you’re training for. Tired of messy gyms? Here we work hard to provide you with the cleanest facility, no more looking for weights or attachments, all weights are kept in order, and leaving weights out isn’t tolerated.\n\nLooking for more than just a gym? Come sit down and relax in one of our 3 saunas, enjoy a shake with a brownie after a hard workout (healthier options available). For those braver souls out there, we also have ice baths available to help with your recovery. On site we also have an Osteopath, Sports Massage and Therapy, and blood testing available. All this in one place!\n\nIf you ever need anything come see us. If you would like to enquire or ever need to reach me, please contact me on derby@ultraflexgym.co.uk.',
                        'image' => '/Images/managers/ian.jpg',
                        'experience' => null
                    ],
                    'services' => [
                        [
                            'name' => 'House of Wellness',
                            'description' => 'Blood testing and wellness diagnostics.',
                            'icon' => null
                        ],
                        [
                            'name' => 'Elite Osteo Midlands',
                            'description' => 'On-site osteopathy supporting recovery and performance.',
                            'icon' => null
                        ],
                        [
                            'name' => 'Fusion Rehab',
                            'description' => 'Sports therapy and rehabilitation services.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'House of Wellness Facebook', 'url' => 'https://www.facebook.com/houseofwellnessuk', 'type' => 'facebook' ],
                        [ 'label' => 'House of Wellness Instagram', 'url' => 'https://www.instagram.com/houseofwellnessuk', 'type' => 'instagram' ],
                        [ 'label' => 'House of Wellness TikTok', 'url' => 'https://www.tiktok.com/@houseofwellnessuk', 'type' => 'tiktok' ],
                        [ 'label' => 'House of Wellness Website', 'url' => 'https://houseofwellness.com', 'type' => 'website' ],
                        [ 'label' => 'Elite Osteo Midlands Instagram', 'url' => 'https://www.instagram.com/eliteosteo.midlands', 'type' => 'instagram' ],
                        [ 'label' => 'Elite Osteo Midlands Website', 'url' => 'https://eliteosteo.co.uk', 'type' => 'website' ],
                        [ 'label' => 'Fusion Rehab Instagram', 'url' => 'https://www.instagram.com/Fusion_rehab_', 'type' => 'instagram' ]
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
                        '/Images/athens/ForGallery/gym-in-athens-5.webp',
                        '/Images/athens/ForGallery/gym-in-athens-6.webp',
                        '/Images/athens/ForGallery/gym-in-athens-4.webp',
                        '/Images/athens/ForGallery/gym-in-athens-7.webp',
                        '/Images/athens/ForGallery/gym-in-athens-8.webp',
                        '/Images/athens/ForGallery/gym-in-athens-9.webp',
                        '/Images/athens/ForGallery/gym-in-athens-10.webp',
                        '/Images/athens/HeroBG/DSC07413.jpg'
                    ],
                    'slug' => 'athens-greece',
                    // Coming soon – awaiting YouTube drone tour
                    'virtualTour' => null,
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
                        'image' => '/Images/managers/dimitris.jpg',
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
                    // Updated primary image for Lincoln location
                    'image' => '/Images/processed-3CBED414-67C5-41E8-A885-3D42BA69744C-min-min.jpeg',
                    'gallery' => [
                        '/Images/newimages/Lincoln/gym-in-lincoln-2.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln-3.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln-5.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln-4.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln-6.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln-7.webp',
                        '/Images/newimages/Lincoln/gym-in-lincoln-8.webp'
                    ],
                    'slug' => 'lincoln',
                    // YouTube link
                    'virtualTour' => 'https://www.youtube.com/embed/u3qFZpkqxyI',
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
                        'bio' => "💪 I’m proud to be the Gym Manager here at Ultraflex – the friendliest, most motivating place to train!\nFrom the moment you walk through the doors, you’re part of the family. Our amazing team is always ready with a smile, a helping hand, and a bit of encouragement to keep you smashing your goals.\nWe’ve built an environment where everyone works together – no egos, just great vibes, hard work, and a shared love for health & fitness. Whether you’re lifting big, starting your journey, or just here for a feel-good session, you’ll always feel welcome.\nOutside of the gym, life is just as full of energy. I’m a proud mum to Ava-Lily, my eight-year-old daughter who has a real need for speed. Most weekends you’ll find us at the track, where she’s racing her go-kart with the same determination and focus we value so much in the gym.\nFor me, both work and home life are about dedication, community, and enjoying the journey – and that’s exactly what we aim to bring to every member’s experience at Ultraflex.\nIt’s all about community, support, and results – and we can’t wait to welcome you in! 💥\nIf you need any more information, then please feel free to contact me:\nEmail: l.hind@ultraflexgym.co.uk\nPhone: 07926 528367\n#Ultraflex #GymManagerLife #FitnessFamily #CommunityVibes #MumLife #KartingKid #StrongerTogether",
                        // TODO: Manager image missing (lynsey.jpg). Add file to public/Images/managers or update path.
                        'image' => null,
                        'experience' => ''
                    ],
                    'features' => [
                        '24hr Access',
                        'Barbershop (BLNK Barbers)',
                        'The Recovery Hub',
                        'Supplements Shop',
                        'Clothing Area',
                        'GSN Food',
                        'Wide Range of Personal Trainers (Bodybuilding to General Health & Weight Loss)'
                    ],
                    'services' => [
                        ['name' => 'BLNK Barbers', 'description' => 'In-gym barbershop providing grooming services for members.', 'icon' => '✂️'],
                        ['name' => 'The Recovery Hub', 'description' => 'Physio & recovery services (location moving upstairs - update pending).', 'icon' => '🩺']
                    ],
                    'serviceLinks' => [
                        ['label' => 'BLNK Barbers Website', 'url' => 'https://www.blnkbarbers.com', 'type' => 'external'],
                        ['label' => 'BLNK Barbers Booking', 'url' => 'https://www.blnkbarbers.com/book/shops/IONEJG/services', 'type' => 'external'],
                        ['label' => 'The Recovery Hub Linktree', 'url' => 'https://linktr.ee/Therecoveryhub_UF?utm_source=linktree_profile_share&ltsid=b2001f13-c003-4d72-b057-d5f49113b697', 'type' => 'external']
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
                    // Updated primary image for West London location
                    'image' => '/Images/processed-F7DB5741-8540-4974-9CCC-A37F83D8733B-min-min.jpeg',
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
                    // West London tour video nearly ready (placeholder null)
                    'virtualTour' => null,
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
                        'name' => 'Tiff Nelhams',
                        'bio' => 'Tiff is the manager at Ultra Flex West London and has an impressive background in fitness, clinical massage and physiotherapy. She has worked in gyms, sports therapy clinics and hospitals in both operational and treatment capacities, including in-patient and out-patient settings in NHS hospitals and clinics and in private hospitals in London. In these roles she has worked as an occupational physiotherapist, assisting patients in their recovery from surgeries and helping them regain or improve abilities to carry out everyday tasks.\n\nHaving been a fitness instructor and sports therapist since 2016, Tiff combines her clinical knowledge with her training experience to support members with injury rehab, prehab and training performance. Alongside her clinical and gym-based experience, she has also worked in the aesthetic industry, using her knowledge of muscle anatomy to deliver safe and effective facial treatments.\n\nTiff is fully committed to creating an inclusive and supportive environment at Ultra Flex West London, ensuring that every member feels welcome to train and progress within the facility. Her holistic understanding of physical health, rehabilitation and performance makes her a valuable asset to the Ultra Flex team.',
                        'image' => '/Images/managers/tiff.jpg',
                        'experience' => null
                    ],
                    // Added structured partner services for West London
                    'services' => [
                        [
                            'name' => 'Head2Heel Physio',
                            'description' => 'Physiotherapy and rehab support for injury recovery and performance optimisation.',
                            'icon' => null
                        ],
                        [
                            'name' => 'NMK Aesthetics',
                            'description' => 'Aesthetic treatments delivered with anatomical expertise for safe, effective results.',
                            'icon' => null
                        ],
                        [
                            'name' => 'Faded Group Barber',
                            'description' => 'Professional barber services on-site for member convenience.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'Head2Heel Physio Instagram', 'url' => 'https://www.instagram.com/Head2Heal.Clinic', 'type' => 'instagram' ],
                        [ 'label' => 'Head2Heel Physio Phone', 'url' => 'tel:07951472144', 'type' => 'phone' ],
                        [ 'label' => 'NMK Aesthetics Instagram', 'url' => 'https://www.instagram.com/nmk_aesthetics', 'type' => 'instagram' ],
                        [ 'label' => 'NMK Aesthetics Website', 'url' => 'https://nmkaesthetics.com/', 'type' => 'website' ],
                        [ 'label' => 'NMK Aesthetics Phone', 'url' => 'tel:07377190361', 'type' => 'phone' ],
                        [ 'label' => 'Faded Group Barber Instagram', 'url' => 'https://www.instagram.com/fadedgroup_uxbridge', 'type' => 'instagram' ],
                        [ 'label' => 'Faded Group Barber Phone', 'url' => 'tel:07900626284', 'type' => 'phone' ]
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
                    // Provided Matterport link (default West Leeds)
                    'virtualTour' => 'https://my.matterport.com/show/?m=8gw4DT8ZmVc&back=1',
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
                        'image' => '/Images/managers/james.jpg',
                        'experience' => '15+ years experience'
                    ],
                ];
        }
        
        // Common data for all locations
        $commonData = [
            'signupUrl' => 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2',
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
            // New placeholder structured fields (can be overridden per location case)
            'features' => [], // e.g. ['24/7 Access', 'Competition Grade Equipment']
            'services' => [], // e.g. [['name' => 'Physiotherapy', 'description' => 'On-site rehab specialists']]
            'serviceLinks' => [], // e.g. [['label' => 'Book PT Session', 'url' => '/services/personal-training']]
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
            // Removed placeholder; per-location cases now define virtualTour (can be null)
            'virtualTour' => $locationData['virtualTour'] ?? null
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


        // --- Inject dynamic trainers for this location (real data) ---
        // NOTE: Bios trimmed to 2-3 sentences for card display; full versions can later move to a dedicated config or DB.
        $allTrainers = [
            // North Leeds
            [
                'id' => 101,
                'name' => 'Andy Cowell',
                'slug' => 'andy-cowell',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Over 30 years experience in bodybuilding, weight loss, strength and wellbeing. Also coaches competition and photo-shoot prep with nutrition, supplement and injury rehab guidance.',
                'specialties' => ['Bodybuilding', 'Weight Loss', 'Strength', 'Rehab'],
                'certifications' => [],
                'locationSlug' => 'north-leeds',
                'contact' => ['instagram' => null]
            ],
            [
                'id' => 102,
                'name' => 'Ali Mardomi',
                'slug' => 'ali-mardomi',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => '23+ years coaching from first-time gym goers to stage competitors. Focus on effective, enjoyable training and confidence-building transformations.',
                'specialties' => ['Contest Prep', 'Bodybuilding', 'General Fitness'],
                'certifications' => ['Level 2', 'Level 3', 'Nutrition'],
                'locationSlug' => 'north-leeds',
                'contact' => ['instagram' => 'https://instagram.com/alimardomi']
            ],
            // York
            [
                'id' => 201,
                'name' => 'Harry Strike',
                'slug' => 'harry-strike',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Dedicated PT helping clients achieve sustainable physical and mental progress through structured plans and in-person support.',
                'specialties' => ['Body Recomposition', 'Mindset', 'Lifestyle Coaching'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => []
            ],
            [
                'id' => 202,
                'name' => 'Dan',
                'slug' => 'dan',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Coaches a wide range of people in-person and online using a highly personal, service-focused approach beyond generic app programming.',
                'specialties' => ['General Population', 'Accountability', 'Online Coaching'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => []
            ],
            [
                'id' => 203,
                'name' => 'Natalie',
                'slug' => 'natalie',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Bikini category champion helping women build confidence and elite stage or holiday condition while keeping lifestyle balance.',
                'specialties' => ['Female Physique', 'Contest Prep', 'Body Recomposition'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => ['instagram' => 'https://instagram.com/levelupfitness_bynat']
            ],
            [
                'id' => 204,
                'name' => 'Adam Gucwa',
                'slug' => 'adam-gucwa',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Physical Education & Sports Science background; 15+ years helping clients get stronger, leaner and lift safely with adaptive programming.',
                'specialties' => ['Strength', 'Technique', 'Body Recomposition'],
                'certifications' => ['PT Qualified'],
                'locationSlug' => 'york',
                'contact' => ['email' => 'adamgucwa.pt@gmail.com']
            ],
            // Hull
            [
                'id' => 301,
                'name' => 'Luke Masters',
                'slug' => 'luke-masters',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => '5+ years coaching helping clients gain strength and confidence in their physiques.',
                'specialties' => ['Strength', 'Confidence Building'],
                'certifications' => [],
                'locationSlug' => 'hull',
                'contact' => ['instagram' => 'https://instagram.com/luke_masters_physique']
            ],
            [
                'id' => 302,
                'name' => 'Leon',
                'slug' => 'leon',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => '10+ years PT and 12+ years competitive bodybuilding; 2x Britain Champion guiding goals from fat loss to stage prep.',
                'specialties' => ['Bodybuilding', 'Fat Loss', 'Contest Prep'],
                'certifications' => [],
                'locationSlug' => 'hull',
                'contact' => ['email' => 'elitephysiquecoaching@gmail.com', 'instagram' => 'https://instagram.com/elite_physique_coaching']
            ],
            [
                'id' => 303,
                'name' => 'Stevie',
                'slug' => 'stevie',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Certified PT & nutrition certified—focus on education, empowerment and sustainable physique change.',
                'specialties' => ['Nutrition', 'Sustainable Change', 'Muscle Gain'],
                'certifications' => ['Nutrition Certificate'],
                'locationSlug' => 'hull',
                'contact' => ['instagram' => 'https://instagram.com/smphysiquecoaching']
            ],
            [
                'id' => 304,
                'name' => 'Cody Wilks',
                'slug' => 'cody-wilks',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Blends in-person coaching with app-based programming, tailored training, nutrition, weekly check-ins and education resources.',
                'specialties' => ['Hybrid Coaching', 'Body Transformation'],
                'certifications' => [],
                'locationSlug' => 'hull',
                'contact' => ['instagram' => 'https://instagram.com/codywilkscoachpt']
            ],
            // Lincoln
            [
                'id' => 401,
                'name' => 'Dawid',
                'slug' => 'dawid',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => '20+ years experience focusing on physique transformation, performance development and balanced lifestyle training.',
                'specialties' => ['Physique Transformation', 'Performance', 'Mindset'],
                'certifications' => ['Level 2', 'Level 3'],
                'locationSlug' => 'lincoln',
                'contact' => []
            ],
            [
                'id' => 402,
                'name' => 'Joanna Sirostan',
                'slug' => 'joanna-sirostan',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Level 2 & 3 PT with Precision Nutrition L1 helping clients build habits, strength and sustainable wellness.',
                'specialties' => ['Habit Change', 'Strength', 'Wellness'],
                'certifications' => ['Level 2', 'Level 3', 'PN L1'],
                'locationSlug' => 'lincoln',
                'contact' => ['instagram' => 'https://instagram.com/joanna_sirostan']
            ],
            [
                'id' => 403,
                'name' => 'Dale Bowman',
                'slug' => 'dale-bowman',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Experienced competitive bodybuilder offering tailored training, nutrition coaching and competition preparation.',
                'specialties' => ['Contest Prep', 'Strength', 'Nutrition'],
                'certifications' => ['Nutrition Diploma'],
                'locationSlug' => 'lincoln',
                'contact' => ['email' => 'dbfitness.lincoln@gmail.com', 'phone' => '+447784355668']
            ],
            [
                'id' => 404,
                'name' => 'TC',
                'slug' => 'tc',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Level 3 PT with 3 years professional experience and 20 years training; promotes sustainable mental and physical transformations.',
                'specialties' => ['Lifestyle Coaching', 'Strength', 'Body Recomposition'],
                'certifications' => ['Level 3'],
                'locationSlug' => 'lincoln',
                'contact' => ['email' => 'tccoaching85@gmail.com', 'instagram' => 'https://instagram.com/coach_by_tc']
            ],
            // Durham (removed Racheal Turnbull as requested)
            [
                'id' => 501,
                'name' => 'James Tindale',
                'slug' => 'james-tindale',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Provides results-focused coaching and physique development with accountability.',
                'specialties' => ['Physique', 'Accountability'],
                'certifications' => [],
                'locationSlug' => 'durham',
                'contact' => ['instagram' => 'https://instagram.com/jamestindalefitness']
            ],
            [
                'id' => 502,
                'name' => 'Ashton Alderson',
                'slug' => 'ashton-alderson',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Coaches clients through structured training and progressive performance methods.',
                'specialties' => ['Performance', 'Strength'],
                'certifications' => [],
                'locationSlug' => 'durham',
                'contact' => ['instagram' => 'https://instagram.com/Ashtonaldersonfitness']
            ],
            [
                'id' => 503,
                'name' => 'Christopher',
                'slug' => 'christopher',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Delivers tailored coaching focused on technique, progression and consistency.',
                'specialties' => ['Technique', 'Progressive Training'],
                'certifications' => [],
                'locationSlug' => 'durham',
                'contact' => ['instagram' => 'https://instagram.com/khifiewest_']
            ],
            [
                'id' => 504,
                'name' => 'Conrad Ashton',
                'slug' => 'conrad-ashton',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Personal training with emphasis on effective execution and client education.',
                'specialties' => ['Execution', 'Client Education'],
                'certifications' => [],
                'locationSlug' => 'durham',
                'contact' => ['instagram' => 'https://instagram.com/ashtonpersonaltraining']
            ],
            [
                'id' => 505,
                'name' => 'Wendy McCready',
                'slug' => 'wendy-mccready',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'IFBB Pro offering elite physique coaching and stage preparation.',
                'specialties' => ['IFBB Prep', 'Physique'],
                'certifications' => ['IFBB Pro'],
                'locationSlug' => 'durham',
                'contact' => ['instagram' => 'https://instagram.com/ifbbprowendymccready']
            ],
            // Derby
            [
                'id' => 601,
                'name' => 'Dazz Kent',
                'slug' => 'dazz-kent',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'Specialises in general population transformations, nutrition and stress management.',
                'specialties' => ['Transformations', 'Nutrition', 'Stress Management'],
                'certifications' => [],
                'locationSlug' => 'derby',
                'contact' => ['instagram' => 'https://instagram.com/dazzkent', 'email' => 'Dazzkentfitness@gmail.com', 'phone' => '+447738689130']
            ],
            [
                'id' => 602,
                'name' => 'Damon Hauge',
                'slug' => 'damon-hauge',
                'image' => '/Images/trainers/damon-hauge.webp',
                'bio' => 'Ex-professional boxer sharing extensive training and nutrition knowledge for next-level results.',
                'specialties' => ['Boxing', 'Nutrition', 'Strength & Conditioning'],
                'certifications' => [],
                'locationSlug' => 'derby',
                'contact' => ['instagram' => 'https://instagram.com/d.htraining', 'email' => 'dhtraining@gmail.com', 'phone' => '+447460834333']
            ],
            // West London
            [
                'id' => 701,
                'name' => 'Allan',
                'slug' => 'allan',
                'image' => '/Images/trainers/allan.webp',
                'bio' => 'Focuses on mastery of fundamentals, precise execution and efficient progress toward strength, fat loss and performance goals.',
                'specialties' => ['Strength', 'Execution', 'Fat Loss'],
                'certifications' => [],
                'locationSlug' => 'west-london',
                'contact' => ['instagram' => 'https://instagram.com/avidity.fitness.uk', 'email' => 'Contact@avtfitness.com', 'phone' => '+447714245383', 'website' => 'https://www.avtfitness.com']
            ],
        ];
        // If trainers already defined in the specific location case (e.g. West Leeds), merge them with dynamic ones.
        $dynamicForLocation = array_values(array_filter($allTrainers, function($trainer) use ($locationData) {
            return isset($trainer['locationSlug']) && isset($locationData['slug']) && $trainer['locationSlug'] === $locationData['slug'];
        }));

        if (isset($locationData['trainers']) && is_array($locationData['trainers']) && count($locationData['trainers']) > 0) {
            // Avoid duplicate slugs when merging
            $existingSlugs = array_column($locationData['trainers'], 'slug');
            foreach ($dynamicForLocation as $t) {
                if (!in_array($t['slug'], $existingSlugs, true)) {
                    $locationData['trainers'][] = $t;
                }
            }
        } else {
            $locationData['trainers'] = $dynamicForLocation;
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