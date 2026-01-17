<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ImageService;
use App\Data\TrainerData;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class LocationController extends Controller
{
    // Single source of truth for gallery images (matches Gallery route in web.php)
    // Using Google Drive folder URLs instead of individual image links
    private static $galleryFolders = [
        'derby' => 'https://drive.google.com/drive/folders/1JmzFTv4D-kld1hSNdSG9tVbElRVFAxad?usp=sharing',
        'durham' => 'https://drive.google.com/drive/folders/1i1AdRjfrPRN9RuaR2pfS9kVpy7hTU8c7?usp=sharing',
        'hull' => 'https://drive.google.com/drive/folders/13urI3KB9HRbs9iavLuPBxtD-czG7W8R1?usp=sharing',
        'lincoln' => 'https://drive.google.com/drive/folders/1G7BpbUGe9PbTaggMLySIIihD5xkOQuq4?usp=sharing',
        'normanton' => 'https://drive.google.com/drive/folders/1v8mVJh5ll5jKfdS3NS5COqTxP4RWDBh7?usp=sharing',
        'north-leeds' => 'https://drive.google.com/drive/folders/1kEbrWC9mlXsODYIRB-bj5I7WPtkwxSmz?usp=sharing',
        'rotherham' => 'https://drive.google.com/drive/folders/15T5XVB9S6VRLVnI0mfkzMIr5FSq4PZ8x?usp=sharing',
        'west-leeds' => 'https://drive.google.com/drive/folders/1_yBydxdAVuVW4QBvdPr2yQQKEaIKhUEd?usp=sharing',
        'west-london' => 'https://drive.google.com/drive/folders/1yIjAoIaLC0wiuS7NezEJkhqBLXGtPV4U?usp=sharing',
        'york' => 'https://drive.google.com/drive/folders/196kxhVOgqFLaGfFG6sZV1sa9a13Zuc9b?usp=sharing',
    ];

    private static function galleryFolderUrl(string $slug): ?string
    {
        return self::$galleryFolders[$slug] ?? null;
    }

    private static function encodeGalleryPath(string $p): string
    {
        $p = str_replace('\\', '/', $p);
        $parts = array_values(array_filter(explode('/', $p), fn($x) => $x !== ''));
        $encoded = array_map('rawurlencode', $parts);
        return implode('/', $encoded);
    }

    /**
     * Returns an array of public URLs for a location gallery based on local folders in public/Images/Gallery.
     * This mirrors the folder discovery + slugging logic used in the /gallery route.
     */
    private static function localGalleryImages(string $locationSlug): array
    {
        $galleryBase = public_path('Images/Gallery');
        if (!File::isDirectory($galleryBase)) {
            return [];
        }

        $allDirs = glob($galleryBase . '/*', GLOB_ONLYDIR) ?: [];
        $slugToFolder = [];

        foreach ($allDirs as $dir) {
            $folder = basename($dir);
            $slug = Str::slug($folder, '-');
            $slugToFolder[$slug] = $folder;
        }

        if (!isset($slugToFolder[$locationSlug])) {
            return [];
        }

        $folder = $slugToFolder[$locationSlug];
        $absDir = $galleryBase . DIRECTORY_SEPARATOR . $folder;
        if (!File::isDirectory($absDir)) {
            return [];
        }

        $allowedExt = ['webp', 'jpg', 'jpeg', 'png', 'gif'];
        $urls = [];

        foreach (File::allFiles($absDir) as $file) {
            $ext = strtolower($file->getExtension());
            if (!in_array($ext, $allowedExt, true)) {
                continue;
            }

            $relFromGallery = str_replace('\\', '/', $folder . '/' . $file->getRelativePathname());
            $urls[] = '/Images/Gallery/' . self::encodeGalleryPath($relFromGallery);
        }

        usort($urls, function ($a, $b) {
            return strcasecmp($a, $b);
        });

        return $urls;
    }

    public function index()
    {
        // Common membership plans for all locations (global carousel)
        // Removed location-specific 'Martial Arts Area' reference to avoid inaccurate claims for gyms without that facility.
        $membershipPlans = [
            [
                'id' => 2,
                'name' => 'Weekly Pass',
                'price' => 22.50,
                'period' => 'week',
                'features' => ['7 Days Access', 'All Equipment Access', 'Free Parking'],
                'popular' => false
            ],
            [
                'id' => 3,
                'name' => 'Monthly Rolling Direct Debit',
                'price' => 45,
                'period' => 'month',
                'features' => ['Rolling Contract', 'All Equipment Access'],
                'popular' => false
            ],
            [
                'id' => 4,
                'name' => 'Monthly Direct Debit',
                'price' => 38.50,
                'period' => 'month',
                'features' => ['Min 12 Month Commitment', 'All Equipment Access', 'Best Value'],
                'popular' => true
            ],
            [
                'id' => 5,
                'name' => '3 Month Pass',
                'price' => 130,
                'period' => '3 months',
                'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access'],
                'popular' => false
            ],
            [
                'id' => 6,
                'name' => '6 Month Pass',
                'price' => 230,
                'period' => '6 months',
                'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access'],
                'popular' => false
            ],
            [
                'id' => 7,
                'name' => '12 Month Pass',
                'price' => 420,
                'period' => '12 months',
                'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Best Annual Value'],
                'popular' => false
            ],
            [
                'id' => 8,
                'name' => 'Student Monthly Rolling',
                'price' => 40,
                'period' => 'month',
                'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'All Equipment Access'],
                'popular' => false
            ],
        ];

        // Real ULTRAFLEX locations data
        $locations = [
            [
                'id' => 1,
                'name' => 'ULTRAFLEX WEST LEEDS',
                'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
                'phone' => '0113 256 5107',
                'image' => '/Images/Cards-Images/west-leeds.webp',
                'slug' => 'west-leeds',
                'hours' => [
                    'weekdays' => '05:30 - 22:00',
                    'weekends' => '08:00 - 20:00'
                ]
            ],
            [
                'id' => 2,
                'name' => 'ULTRAFLEX NORTH LEEDS',
                'address' => 'Limewood Approach, Seacroft, Leeds LS14 1NH',
                'phone' => '0113 513 7671',
                // Updated processed hero image
                'image' => '/Images/Cards-Images/north-leeds.jpeg',
                'slug' => 'north-leeds',
                'hours' => [
                    'weekdays' => '05:00 - 22:00',
                    'weekends' => '06:00 - 20:00'
                ]
            ],
            [
                'id' => 3,
                'name' => 'ULTRAFLEX NORMANTON',
                'address' => 'Ripley Dr, Normanton WF6 1QT',
                'phone' => '01924 895794',
                'image' => '/Images/Cards-Images/normanton.webp',
                'slug' => 'normanton',
                'hours' => [
                    'weekdays' => '06:00 - 22:00',
                    'weekends' => '08:00 - 20:00'
                ]
            ],
            [
                'id' => 4,
                'name' => 'ULTRAFLEX ROTHERHAM',
                'address' => '175 Effingham St, Rotherham S65 1BL',
                'phone' => '0170 937 7311',
                'image' => '/Images/Cards-Images/rotherham.webp',
                'slug' => 'rotherham',
                'hours' => [
                    'weekdays' => '05:00 - 22:00',
                    'weekends' => '06:00 - 20:00'
                ]
            ],
            [
                'id' => 5,
                'name' => 'ULTRAFLEX YORK',
                'address' => '10 Layerthorpe, York YO31 7YW',
                'phone' => '01904 623383',
                'image' => '/Images/Cards-Images/york.webp',
                'slug' => 'york',
                'hours' => [
                    'weekdays' => '05:00 - 23:00',
                    'weekends' => '08:00 - 20:00'
                ]
            ],
            [
                'id' => 6,
                'name' => 'ULTRAFLEX HULL',
                'address' => 'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN',
                'phone' => '01482 327874',
                // Updated processed hero image
                'image' => '/Images/Cards-Images/hull.jpeg',
                'slug' => 'hull',
                'hours' => [
                    'weekdays' => '05:00 - 22:00',
                    'weekends' => '06:00 - 20:00'
                ]
            ],
            [
                'id' => 7,
                'name' => 'ULTRAFLEX DURHAM',
                'address' => 'Mandale Business Park, Unit 28D, Kent House, Durham DH1 1TH',
                'phone' => '0191 3898321',
                // Updated processed hero image
                'image' => '/Images/Cards-Images/durham.jpeg',
                'slug' => 'durham',
                'hours' => [
                    'weekdays' => '05:00 - 22:00',
                    'weekends' => '07:00 - 20:00'
                ]
            ],
            [
                'id' => 8,
                'name' => 'ULTRAFLEX DERBY',
                'address' => 'Chequers Rd, Derby DE21 6EN',
                'phone' => '07395616771',
                // Updated processed hero image
                'image' => '/Images/Cards-Images/derby.jpeg',
                'slug' => 'derby',
                'hours' => [
                    'weekdays' => '05:00 - 22:00',
                    'weekends' => '07:00 - 20:00'
                ]
            ],
            [
                'id' => 9,
                'name' => 'ULTRAFLEX ATHENS (GREECE)',
                'address' => 'Ethnarchou Makariou 16, Peristeri 121 32, Greece',
                'phone' => '+30 21 0578 5856',
                'image' => '/Images/Cards-Images/athens.webp',
                'slug' => 'athens-greece',
                'hours' => [
                    'weekdays' => '6:00 AM - 12:00 AM',
                    'weekends' => 'Sat: 9:00 AM - 10:00 PM, Sun: 10:00 AM - 8:00 PM'
                ]
            ],
            [
                'id' => 10,
                'name' => 'ULTRAFLEX LINCOLN',
                'address' => '3 Pioneer Way, Lincoln LN6 3DH',
                'phone' => '01522 454320',
                // Updated processed hero image (Jan 12 2026 change request)
                'image' => '/Images/Cards-Images/processed-7CE97793-CFE2-44A3-9BC7-AC26D84DB463%20(1).webp',
                'slug' => 'lincoln',
                'hours' => [
                    'weekdays' => 'Day Access: 6am - 10pm',
                    'weekends' => 'Day Access: 8am - 10pm'
                ],
                'features' => ['Full Access Members: Mon-Sun 24hrs']
            ],
            [
                'id' => 11,
                'name' => 'ULTRAFLEX WEST LONDON',
                'address' => 'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP',
                'phone' => '01895 436000',
                // Updated processed hero image (Oct 8 2025 change request)
                'image' => '/Images/Cards-Images/west-london.webp',
                'slug' => 'west-london',
                'hours' => [
                    'weekdays' => '05:30 - 22:30',
                    'weekends' => '08:00 - 20:00'
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
        // Capability map (only boxing retained, martial arts removed per instructions)
        $capabilities = [
            'york' => ['boxing' => true],
            // Other locations currently have no dedicated boxing area
        ];

        // Helper to clean and augment membership plan feature lists
        $processPlans = function(array $plans, bool $hasBoxing, string $slug = '') use (&$location) {
            return array_map(function($plan) use ($hasBoxing, $slug, $location) {
                if (isset($plan['features']) && is_array($plan['features'])) {
                    // Remove any legacy martial arts strings (case-insensitive contains 'martial')
                    $plan['features'] = array_values(array_filter(array_map(function($f){
                        return preg_match('/martial/i', $f) ? null : $f;
                    }, $plan['features'])));
                    
                    // West Leeds: never add boxing (it's a partner service, not membership benefit)
                    $currentSlug = $slug ?: $location;
                    if ($currentSlug === 'west-leeds') {
                        // Remove any existing boxing references
                        $plan['features'] = array_values(array_filter($plan['features'], function($f) {
                            return stripos($f, 'boxing') === false;
                        }));
                    } elseif ($hasBoxing) {
                        $hasBoxingFeature = false;
                        foreach ($plan['features'] as $f) {
                            if (stripos($f, 'boxing') !== false) { $hasBoxingFeature = true; break; }
                        }
                        if (!$hasBoxingFeature) {
                            $plan['features'][] = 'Boxing Area';
                        }
                    }
                }
                return $plan;
            }, $plans);
        };

        // Define location-specific data
        $locationData = [];
        
        switch ($location) {
            case 'west-leeds':
                $locationData = [
                    'id' => 1,
                    'name' => 'ULTRAFLEX WEST LEEDS',
                    'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
                    'phone' => '0113 256 5107',
                    'email' => 'leeds@ULTRAFLEXgym.co.uk',
                    'image' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('west-leeds'),
                    'slug' => 'west-leeds',
                    // West Leeds drone video tour (updated Jan 12 2026)
                    'virtualTour' => 'https://www.youtube.com/embed/hvSoOHsIh28?rel=0&modestbranding=1',
                    'hours' => [
                        'monday' => '05:30 – 22:00',
                        'tuesday' => '05:30 – 22:00',
                        'wednesday' => '05:30 – 22:00',
                        'thursday' => '05:30 – 22:00',
                        'friday' => '05:30 – 22:00',
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Sophia',
                        'bio' => 'As the Manager of ULTRAFLEX West Leeds, I’m proud to lead the team at the very first ULTRAFLEX gym established in the UK on 17th January 2017. Since opening our doors, West Leeds has built a strong reputation as a cornerstone of the ULTRAFLEX community—known for our unbeatable atmosphere, elite equipment, and commitment to helping people at all levels of fitness achieve real results. My journey with ULTRAFLEX has been driven by a passion for creating an environment where members feel empowered, supported, and motivated. Whether you\'re stepping into the gym for the first time or preparing for your next competition, we’re here to provide expert guidance, a welcoming community, and world-class facilities. I oversee day-to-day operations, member engagement, staff development, and community outreach, ensuring ULTRAFLEX West Leeds continues to set the standard for excellence in fitness. I’m proud of our diverse membership base—from beginners to IFBB pros—and the culture of respect, discipline, and dedication that makes our gym more than just a place to train. ULTRAFLEX West Leeds is where it all started—and under my management, we continue to innovate, grow, and lead the way for all the ULTRAFLEX gyms across the UK.',
                        'image' => '/Images/newimages/unnamed.webp',
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
                        // Ostas Boxing (Martial Arts)
                        [ 'label' => 'Ostas Boxing Instagram', 'url' => 'https://www.instagram.com/ostasboxing', 'type' => 'instagram' ],
                        
                        // Pudsey Judo Club (Martial Arts)
                        [ 'label' => 'Pudsey Judo Club Facebook', 'url' => 'https://www.facebook.com/pudseyjudoclub', 'type' => 'facebook' ],
                        [ 'label' => 'Pudsey Judo Club Instagram', 'url' => 'https://www.instagram.com/pudseyjudoclub', 'type' => 'instagram' ],
                        
                        // Smitin Hair Systems (Hair Services)
                        [ 'label' => 'Smitin Hair Systems Email', 'url' => 'mailto:Smitinhairsystems@outlook.com', 'type' => 'email' ],
                        [ 'label' => 'Smitin Hair Systems Instagram', 'url' => 'https://www.instagram.com/smitin_hairsystems', 'type' => 'instagram' ],
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 25.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'All Facilities', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 47.50,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 40.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Contract', 'All Equipment Access', 'All Facilities', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '3 Month Pass',
                            'price' => 140.00,
                            'period' => '3 months',
                            'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 250.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 450.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student Monthly Rolling',
                            'price' => 42.50,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling Direct Debit', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student 6 Month Pass',
                            'price' => 225.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£225)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Student 9 Month Pass',
                            'price' => 325.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£325)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => 'Student 12 Month Pass',
                            'price' => 400.00,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£400)', 'Best Student Value'],
                            'popular' => false
                        ],
                    ],
                    // Trainers dynamically injected from App\Data\TrainerData based on locationSlug
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+-+Gym+in+Leeds/@53.8145635,-1.8008911,12z/data=!4m10!1m2!2m1!1sULTRAFLEX+Gym+west+Leeds!3m6!1s0x487be20054e5db95:0xb639aa48f8129fed!8m2!3d53.8145635!4d-1.6608154!15sChhVbHRyYUZsZXggR3ltIHdlc3QgTGVlZHNaGiIYdWx0cmFmbGV4IGd5bSB3ZXN0IGxlZWRzkgEDZ3ltmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ4a2NWVllXbGxaTVZaQ1lsZHNNMkp0VW5SVlZUbHhWRlJTTkZGV1JSQULgAQD6AQUIwwEQQg!16s%2Fg%2F11c319zc40?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'north-leeds':
                $locationData = [
                    'id' => 2,
                    'name' => 'ULTRAFLEX NORTH LEEDS',
                    'address' => 'Limewood Approach, Seacroft, Leeds LS14 1NH',
                    'phone' => '0113 513 7671',
                    'email' => 'northleeds@ULTRAFLEXgym.co.uk',
                    'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg',
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('north-leeds'),
                    'slug' => 'north-leeds',
                    // YouTube link (direct) for North Leeds virtual tour
                    'virtualTour' => 'https://youtu.be/VgF1a6XxAkc?si=Ki3Z0VdqdKVocs52',
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
                        'name' => 'Curtis',
                        'bio' => 'Hello and welcome to ULTRAFLEX North Leeds I’m Curtis and I cannot wait to welcome you through our doors. Now of course I am bias but when becoming a member at North Leeds you are joining the best gym in country, with a friendly face to welcome you on every visit and staff on hand all the time to make sure your experience with us is the best every time we really do ensure that all your sessions are amazing. Do not just take my word for it thought, come down, check us out and I know you’ll never need to look for another gym again.',
                        'image' => '/Images/North Leeds Gym Manager.webp',
                        'experience' => ''
                    ],
                    // Services & partners for North Leeds
                    'services' => [
                        ['name' => 'Regen Physio', 'description' => 'Physiotherapy & rehab services supporting recovery.'],
                        ['name' => 'IMA', 'description' => 'Specialist coaching / instruction (details forthcoming).'],
                        ['name' => 'Ultra Car Wash', 'description' => 'Convenient on-site car wash service while you train.'],
                        [
                            'name' => 'Brotherhood Barbers (North Leeds)',
                            'description' => 'On-site barbers. Booking via Booksy. Instagram @brotherhood.leeds • TikTok @brotherhoodbarbers',
                            'logo' => '/Images/york/BROTHERHOOD no back ground .webp'
                        ]
                    ],
                    'serviceLinks' => [
                        ['label' => 'Regen Physio Link', 'url' => 'https://bit.ly/m/RegenPhysio', 'type' => 'external'],
                        ['label' => 'Ultra Car Wash Instagram', 'url' => 'https://www.instagram.com/ultracarwashnorthleeds', 'type' => 'external'],
                        ['label' => 'IMA Instagram', 'url' => 'https://www.instagram.com/IMA.leeds', 'type' => 'external'],
                        ['label' => 'Brotherhood Barbers – Book Now', 'url' => 'https://brotherhoodbarbershopleeds.booksy.com/a/', 'type' => 'external'],
                        ['label' => 'Brotherhood Barbers – Instagram', 'url' => 'https://instagram.com/brotherhood.leeds', 'type' => 'external'],
                        ['label' => 'Brotherhood Barbers – TikTok', 'url' => 'https://www.tiktok.com/@brotherhoodbarbers', 'type' => 'external']
                    ],
                    'features' => [
                        'Sauna',
                        'Ice Bath',
                        'Sunbed'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 27.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'Martial Arts Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 52.00,
                            'period' => 'month',
                            'features' => ['Min 12 Month Commitment', 'All Equipment Access', 'Martial Arts Area', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 299.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 540.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Lewis Williams',
                            'rating' => 5,
                            'comment' => 'Just joined this week after over a year out of the gym, and honestly best decision I\'ve made in a long time. Staff are great and the equipment is next level. Not only do they have everything you\'ll ever need they\'ve got 3 or 4 of it, so you\'re not stood around waiting for machines. Couldn\'t recommend any more highly',
                            'date' => '3 months ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Cameron Coid PT',
                            'rating' => 5,
                            'comment' => 'Hands down the best gym in Leeds & probably the north west of England. Fully loaded with the best equipment & supplements, staff are helpful & friendly too.',
                            'date' => '2 months ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Chris Scott',
                            'rating' => 5,
                            'comment' => 'Best gym in leeds, friendly environment 💪',
                            'date' => 'a month ago'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Andrew Firth',
                            'rating' => 5,
                            'comment' => 'Let\'s not be silly, I\'m 54 and struggle to reach my shoes. 5* is because the two lads on the desk were amazing when my daughter left important uni watch/tracker behind. Left a busy desk to help her out. Top dad points for me driving extra 2hrs to go and pick it up - but could have been much worse had the lads not offered to have a hunt around. Spot on!',
                            'date' => 'a month ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 53.8371,
                        'lng' => -1.4909
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+Gym+North+Leeds/@53.8310007,-1.4685853,17z/data=!3m1!4b1!4m6!3m5!1s0x48795bdf67a4199d:0x161674f7e205d7b2!8m2!3d53.8309976!4d-1.4660104!16s%2Fg%2F11kbymfhg8?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'normanton':
                $locationData = [
                    'id' => 3,
                    'name' => 'ULTRAFLEX NORMANTON',
                    'address' => 'Ripley Dr, Normanton WF6 1QT',
                    'phone' => '01924 895794',
                    'email' => 'normanton@ULTRAFLEXgym.co.uk',
                    'image' => '/Images/newimages/Normanton/gym-in-normanton.webp',
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('normanton'),
                    'slug' => 'normanton',
                    // Scene3D tour link
                    'virtualTour' => 'https://my.scene3d.co.uk/tour/ULTRAFLEX-normanton-2022',
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
                        'bio' => 'Welcome to our gym! I’m thrilled to have you as part of our community and can’t wait for you to experience everything we have to offer. What makes our gym so special isn’t just the state-of-the-art equipment, but the welcoming atmosphere where everyone—from beginners to seasoned athletes—can feel comfortable and supported. I truly believe fitness should be fun, motivating, and something you look forward to each day. That’s why we’ve built a team of friendly, knowledgeable staff and trainers who are always here to help you reach your goals. Whether you’re lifting, cycling, stretching, or just starting your journey, you’ll always find encouragement here. A little about me—I’m passionate about health, wellness, and helping people discover what works best for them. I love seeing members achieve milestones, big or small, and I’m always up for a chat about training, nutrition, or even just your favorite workout playlist. The best way to reach me is by stopping by the front desk for a quick hello, or you can drop me an email or call anytime—I’m always happy to help. Thank you for choosing our gym. I’m excited to see you around and to be part of your fitness journey!',
                        'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                        'experience' => ''
                    ],
                    // Newly added structured fields for Normanton
                    'features' => [
                        '1 Female Recovery Room',
                        '1 Male Recovery Room',
                        'Sauna',
                        'Ice Bath'
                    ],
                    // Override equipment and amenities to remove physio and WiFi for Normanton
                    'equipment' => [
                        ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                        ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                        ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                        ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                        ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                    ],
                    'amenities' => [
                        'Top-quality equipment from best brand names',
                        'Comfortable changing rooms',
                        'Free on-site parking',
                        'Easy public transport access'
                    ],
                    // Services & Partners: Normanton — only AmyClark Hair
                    'services' => [
                        [
                            'name' => 'AmyClark Hair',
                            'description' => 'Professional hair services available at ULTRAFLEX Normanton.',
                            'icon' => null
                        ],
                    ],
                    'serviceLinks' => [
                        ['label' => 'AmyClark Hair Instagram', 'url' => 'https://www.instagram.com/amyclark_hair', 'type' => 'external'],
                        ['label' => 'AmyClark Hair - Book Appointments (Booksy)', 'url' => 'https://booksy.com', 'type' => 'external'],
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 27.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'World Class Equipment', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 52.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'World Class Equipment'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Min 12 Month Commitment', 'World Class Equipment', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 269.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'World Class Equipment'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 465.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'World Class Equipment', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'GOLD Weekly Pass',
                            'price' => 32.50,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'Recovery Room Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'GOLD Monthly Rolling Pass',
                            'price' => 59.00,
                            'period' => 'month',
                            'features' => ['Rolling Direct Debit', 'Recovery Room Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'GOLD 12 Month Direct Debit',
                            'price' => 53.00,
                            'period' => 'month',
                            'features' => ['12 Month Contract', 'Recovery Room Access', 'Best GOLD Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => 'GOLD 6 Month Pass',
                            'price' => 324.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'Recovery Room Access', 'All GOLD Benefits'],
                            'popular' => false
                        ],
                        [
                            'id' => 12,
                            'name' => 'GOLD 12 Month Pass',
                            'price' => 519.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'Recovery Room Access', 'Best GOLD Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Alex Bard',
                            'rating' => 5,
                            'comment' => "If you're looking for a gym that has it all, ULTRAFLEX Gym in Normanton is the place to be! The atmosphere is amazing, with a strong community vibe that makes working out enjoyable. The staff are incredibly friendly, always ready to help and make you feel welcome. The gym is packed with high-quality equipment for both weight training and cardio. The sauna is a great addition, perfect for unwinding after a tough session. Clean, well-maintained, and spacious – this gym truly stands out. Highly recommend it to anyone serious about their fitness journey!",
                            'date' => '9 months ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Ben D',
                            'rating' => 5,
                            'comment' => "Best gym I've been to. Equipment is top of the range and always expanding. Good atmosphere, never too busy from what I've seen and there's more than enough stations to get quality sessions in even at peak times. Layout of the gym is bang on – everything is where you'd expect it to be, 10/10.",
                            'date' => '1 year ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Kieran Broughan',
                            'rating' => 5,
                            'comment' => 'Possibly the best gym i have been in, the equipment & machines are like state of the art! Hat off to Charlie.',
                            'date' => 'Edited 2 years ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 53.7085,
                        'lng' => -1.4168
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+Normanton/@53.7018856,-1.4042812,17z/data=!3m1!4b1!4m6!3m5!1s0x48795da40af09e07:0x586579d496b76ed3!8m2!3d53.7018825!4d-1.4017063!16s%2Fg%2F11fdkx44lv?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'rotherham':
                $locationData = [
                    // Add gallery field for Rotherham
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('rotherham'),
                    'id' => 4,
                    'name' => 'ULTRAFLEX ROTHERHAM',
                    'address' => '175 Effingham St, Rotherham S65 1BL',
                    'phone' => '0170 937 7311',
                    'email' => 'rotherham@ULTRAFLEXgym.co.uk',
                    'image' => '/Images/newimages/Rotherham/gym-in-rotherham.webp',
                    'gallery' => [
                        '/Images/newimages/Rotherham/gym-in-rotherham-3.webp',
                        '/Images/newimages/Rotherham/gym-in-rotherham-4.webp',
                        '/Images/newimages/Rotherham/gym-in-rotherham-5.webp',
                        '/Images/newimages/Rotherham/2.webp',
                        '/Images/newimages/Rotherham/3.webp',
                        '/Images/newimages/Rotherham/4.webp',
                        '/Images/newimages/Rotherham/5.webp',
                        '/Images/newimages/Rotherham/WhatsApp Image 2026-01-05 at 11.02.36 AM.webp',
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
                        'bio' => 'Hi all, I’m Morgan the manager at ULTRAFLEX Rotherham and I take great pride in the continuation of building and progressing our reputation that we have earned for being one of the best training facilities around, I’m passionate that I am able to contribute to this gym that many members find as a second home, and creating a space where you are all able to fit right into the community. I work closely with our staff team in ensuring that our gym is accommodating for all, and standards are pushed and maintained to exceed expectations across all aspects. Fitness and training has always played a key role for me personally, and speaking from experience 6 years ago I was drawn into what ULTRAFLEX Rotherham had to offer to me as a member, and I soon realised that it was the best around, for what started as a personal fitness journey I soon realised that I wanted to be in a position where I could grow both physically and mentally, which years later has led me to be in the position where I feel proud to be able to manage this world renowned facility and how important it is to be able to create an environment that supports our members individual journeys. Throughout my duration of being a part of ULTRAFLEX Rotherham, whether that being member or manager it has been amazing to witness just how ULTRAFLEX has evolved and the impact it has on the people that spend their time here. I’m excited to see what else lies ahead and hopefully we’ll see you down here.',
                        'image' => '/Images/managers/morgan.jpg',
                    ],
                    'services' => [
                        [
                            'name' => 'rnr body therapy',
                            'description' => 'Sports massage services.',
                            'icon' => null,
                            'category' => 'Sports Massage'
                        ],
                        [
                            'name' => 'Podcast Room',
                            'description' => 'Available to book in gym.',
                            'icon' => null,
                            'category' => 'Facilities'
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'rnr body therapy Website', 'url' => 'https://www.rnrbodytherapy.co.uk', 'type' => 'website' ]
                    ],
                    'features' => [
                        'Sauna & Ice Bath'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 25.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'All Facilities', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Contract', 'All Equipment Access', 'All Facilities', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 285.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 465.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => 'Student Monthly Rolling',
                            'price' => 46.00,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student 6 Month Pass',
                            'price' => 246.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£246)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student 9 Month Pass',
                            'price' => 360.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£360)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Student 12 Month Pass',
                            'price' => 468.00,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£468)', 'All Equipment Access', 'Best Student Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => '60 + Years Rolling Membership',
                            'price' => 52.00,
                            'period' => 'month',
                            'features' => ['Must be 60+', 'Valid ID Required', 'Monthly Rolling', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 12,
                            'name' => '60 + Years 12 Month Membership',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Must be 60+', 'Valid ID Required', '12 Month Direct Debit', 'All Equipment Access', 'Best Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Tyler Tee',
                            'rating' => 5,
                            'comment' => "I often visit, usually grab a weekly pass, which by the way is fantastic value for money. This place never disappoints, always a great atmosphere and I've been fortunate enough to bump into Kuba a few times. I'd highly recommend – every other gym will disappoint you after a visit!",
                            'date' => '5 months ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'benjamin wild',
                            'rating' => 5,
                            'comment' => "I've signed up and had my first session. I was so scared to join at first as I thought it would be full of big scary guys. It is full of big guys but they're not scary. In fact, everyone was great and friendly. The equipment is clean and well looked after and the staff were incredibly helpful. I can't wait to be a regular face here.",
                            'date' => '4 months ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Samuel Pitchford',
                            'rating' => 5,
                            'comment' => 'Excellent gym, well catered for most people\'s needs. Huge range of equipment. Friendly staff.',
                            'date' => '2 weeks ago'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Quinten',
                            'rating' => 5,
                            'comment' => 'This was probably the best gym I have ever seen. Also employees are strict on clean stuff (that is not something you often see these days).',
                            'date' => '1 month ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Billy',
                            'rating' => 5,
                            'comment' => "If you’re looking for a gym that offers not only top-tier equipment but also a welcoming community, Ultra Flex Rotherham is the place to be. I’ve been going since I was 15, and in that time, I’ve met so many amazing people, made lifelong friends, and seen insane progress in my fitness journey. The staff here are incredible – they’re not just employees, they’re genuinely great people who are always willing to lend a hand, offer advice, or just check in with you. It’s that personal touch that really sets this gym apart. As for the equipment, it’s simply the best I’ve ever used. Whether you’re a seasoned gym-goer or a beginner, this place has everything you need to succeed. Highly recommend!",
                            'date' => '9 months ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Connor John',
                            'rating' => 5,
                            'comment' => 'Had the pleasure of training at this amazing gym and also had the chance to meet Kuba! What a gym!',
                            'date' => '10 months ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 53.4326,
                        'lng' => -1.3568
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+-+Gym+in+Rotherham/@53.4380464,-1.3554535,17z/data=!3m1!4b1!4m6!3m5!1s0x48797709d1450b65:0x25be57d0fbe940e3!8m2!3d53.4380432!4d-1.3528786!16s%2Fg%2F11gp35wlzk?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'york':
                $locationData = [
                    // Add gallery field for York
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('york'),
                    'id' => 5,
                    'name' => 'ULTRAFLEX YORK',
                    'address' => '10 Layerthorpe, York YO31 7YW',
                    'phone' => '+44 1904 623383',
                    'email' => 'york@ULTRAFLEXgym.co.uk',
                    'image' => '/Images/newimages/York/gym-in-york.webp',
                    'slug' => 'york',
                    // Provided Matterport link (updated)
                    'virtualTour' => 'https://my.matterport.com/show/?m=kZ7SPKSyTMt&back=1',
                    'hours' => [
                        'monday' => '05:00 – 23:00',
                        'tuesday' => '05:00 – 23:00',
                        'wednesday' => '05:00 – 23:00',
                        'thursday' => '05:00 – 23:00',
                        'friday' => '05:00 – 23:00',
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Liam',
                        'bio' => 'Hi, I\'m Liam, and I\'d like to give you the warmest welcome to ULTRAFLEX York - the gym where everyone fits in, whether you\'re lifting 5kg, 50kg, or just lifting your mood for the day. We\'re proud to be more than just a place to train. We\'re a community, a support system, and occasionally... a group of people bonding over how sore leg day made us. What I love most about ULTRAFLEX York is that it\'s truly for everyone. First-time gym-goer? Perfect. Seasoned lifter? You\'ll feel right at home. Someone who comes purely for a walk and a chat? We\'ve got a spot for you too. Our members are friendly, our atmosphere is welcoming, and our equipment - well, there\'s a lot of it, and it\'s all top-notch. I\'m usually buzzing around the gym floor, talking to members, organising the weight plates, or trying to resist the protein Cookies. If you ever need help, advice, or just want someone to celebrate a PB with, come find me. And if you prefer messages over conversations (absolutely no judgement - I love a good email), you can reach our team on this email address york@ULTRAFLEXgym.co.uk We\'re proud to have you as part of the family - now let\'s make some progress, have some laughs, and enjoy the journey together.',
                        'image' => '/Images/managers/liam.jpg',
                        'experience' => null
                    ],
                    'services' => [
                        [
                            'name' => 'Regen Physio',
                            'description' => 'Physiotherapy & rehab services supporting recovery.',
                            'icon' => null
                        ],
                        [
                            'name' => 'The Yorkshire Clipper',
                            'description' => 'On-site barber services for member convenience.',
                            'icon' => null
                        ],
                        [
                            'name' => 'Fika Aesthetics',
                            'description' => 'Professional aesthetics services for beauty and wellness.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'Regen Physio', 'url' => 'https://bit.ly/m/RegenPhysio', 'type' => 'website', 'category' => 'Physiotherapy & Recovery' ],
                        [ 'label' => 'The Yorkshire Clipper Instagram', 'url' => 'https://www.instagram.com/the_yorkshireclipper/', 'type' => 'instagram' ],
                        [ 'label' => 'The Yorkshire Clipper Website', 'url' => 'https://www.theyorkshireclipper.co.uk/', 'type' => 'website' ],
                        [ 'label' => 'Fika Aesthetics Website', 'url' => 'https://www.fikaaesthetics.co.uk/', 'type' => 'website' ]
                    ],
                    'features' => [
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 27.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'City Centre Location', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'Knowledgeable Staff'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 50.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Commitment', 'All Equipment Access', 'Expert Staff Support', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '3 Month Pass',
                            'price' => 165.00,
                            'period' => '3 months',
                            'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'Professional Guidance'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 299.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 545.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student Monthly Rolling',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student 6 Month Pass',
                            'price' => 275.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£275)', '£45.83 per month equivalent', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Student 9 Month Pass',
                            'price' => 395.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£395)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => 'Student 12 Month Pass',
                            'price' => 497.50,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£497.50)', 'Best Student Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Taylor Shields',
                            'rating' => 5,
                            'comment' => "The best gym in York by far since signing up I’ve met my goals and imma keep pushing all staff friendly and chatty aswell help you out whenever you need a hand with anything",
                            'date' => 'a month ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Lily Pearson',
                            'rating' => 5,
                            'comment' => "Tried many gyms across York however this is by far the best🙌 great atmosphere and every piece of equipment you could ever need 🤌🏼 …",
                            'date' => 'a month ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Reening Lau',
                            'rating' => 5,
                            'comment' => "Came down for a visit since I would be leaving York after finishing university and was quite impressed with the facilities here. It's basically a powerlifter/weightlifter's heaven. Barbells are from Rogue Fitness and are pretty good and there are an assortment of machines to target each specific body part. It wasn't too crowded when I visited but I should say this gym gets a lot of traffic during the weekdays. Cardio stuff is upstairs but who uses them anyways? Membership is a little bit more expensive as compared to Swift Fitness but you get what you pay for: more squat racks and dedicated spaces for lifting massive weights. If I was a working adult, this would be my go to gym.",
                            'date' => '6 years ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Alex Bard',
                            'rating' => 5,
                            'comment' => "ULTRAFLEX is an amazing place to workout and the staff is super helpful, encouraging, and friendly. They know how to push you to the limit in the best way possible with your workouts. This gym has the best energy, staff, and feel. Everything is so clean , you will not leave disappointed! Such a family vibe as soon as you walk in the doors – I highly recommend checking this gym out.",
                            'date' => '4 years ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 54.0059,
                        'lng' => -1.0810
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+-+Gym+in+York/@53.9620338,-1.0749673,17z/data=!3m1!4b1!4m6!3m5!1s0x487931d9a664f0c1:0xa5b0aa55abc8b897!8m2!3d53.9620307!4d-1.0723924!16s%2Fg%2F11h7fzf0w2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'hull':
                $locationData = [
                    // Add gallery field for Hull
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('hull'),
                    'id' => 6,
                    'name' => 'ULTRAFLEX HULL',
                    'address' => 'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN',
                    'phone' => '01482 327874',
                    'email' => 'hull@ULTRAFLEXgym.co.uk',
                    // Updated primary image for Hull location
                    'image' => '/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.jpeg',
                    'gallery' => [
                        'https://www.dropbox.com/scl/fi/in4ej490anf23ipvx8ewi/IMG-4.jpg?rlkey=v2ampzl63i13a2ab1y6fhnuw2&raw=1',
                        'https://www.dropbox.com/scl/fi/8whbqkx4jslrx9ec3q9fv/IMG-15.jpg?rlkey=0fdsni86elpsj5ap9e3x59gux&raw=1',
                        'https://www.dropbox.com/scl/fi/k809s2y4onmg0h55ygydy/IMG-19.jpg?rlkey=5nn6hfdtcosuek7pq3zke98cf&raw=1',
                        'https://www.dropbox.com/scl/fi/13i8gj5zsb3ss58ed4lle/IMG-27.jpg?rlkey=lwexgkujdo64u8p51bz5hswn7&raw=1',
                        'https://www.dropbox.com/scl/fi/8n1f55sclfuhw9lxyqp7d/IMG-34.jpg?rlkey=j8lx1534nrioyz17ki4yjdifw&raw=1',
                        'https://www.dropbox.com/scl/fi/1p7l0kjuy4z0ghy5utb1r/Photo-07-10-2025-16-46-52.jpg?rlkey=vzzyp8up3az298uoq2l91vfmr&raw=1',
                    ],
                    'slug' => 'hull',
                    // Hull drone tour video
                    'virtualTour' => 'https://www.youtube.com/embed/xJI-E8q2b9o',
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
                        'bio' => 'Welcome to ULTRAFLEX Gym Hull, the ultimate training facility for those serious about fitness. My name is Tronn (yes, it’s a strange name, yes, it is my real name!) and I’ve been the manager of this incredible facility for over 3 years now. Whether you\'re a competitive athlete, aspiring bodybuilder, or just beginning your fitness journey, ULTRAFLEX Hull is designed to help you push boundaries and achieve real results. Our state-of-the-art gym is packed with industry-leading equipment, an intense training atmosphere, and a community that thrives on hard work and dedication. We offer a full range of strength and conditioning machines, free weights, cardio equipment, and specialist areas for functional and combat training. At ULTRAFLEX, every detail is designed to support performance, progress, and passion. This isn’t just a place to work out – it’s where you transform both body and mind. Our expert team of personal trainers, coaches, and athletes are on hand to guide, motivate, and challenge you. Whether your goals are to build muscle, lose fat, increase endurance, or simply become the best version of yourself, you’ll find the tools and support here to make it happen. Located in the heart of Hull with ample parking and flexible memberships, ULTRAFLEX Gym is open seven days a week to fit around your lifestyle. We also host regular seminars, competitions, and events to keep your training fresh and focused.',
                        'image' => '/Images/Hull Gym Manager.webp',
                        'experience' => ''
                    ],
                    'features' => [
                        'Industry-Leading Equipment',
                        'Functional & Combat Training Areas',
                        'Strength & Conditioning Machines',
                        'Free Weights & Cardio Zones',
                        'Sauna & Ice Bath',
                        'Seminars, Competitions & Events'
                    ],
                    // Override equipment and amenities to remove physio and WiFi for Hull
                    'equipment' => [
                        ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                        ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                        ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                        ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                        ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                    ],
                    'amenities' => [
                        'Top-quality equipment from best brand names',
                        'Comfortable changing rooms',
                        'Free on-site parking',
                        'Easy public transport access'
                    ],
                    'services' => [
                        ['name' => 'Sports Rehab Massage', 'description' => 'Professional sports massage and rehabilitation services.']
                    ],
                    'serviceLinks' => [],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 22.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Cardio Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '1 Month Pass',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['1 Month Access', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => '12 month Direct Debit',
                            'price' => 41.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Contract', 'All Equipment Access', 'Cardio Area', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 230.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 450.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'John Higgins',
                            'rating' => 5,
                            'comment' => 'Best gym in Hull by far (for bodybuilding and resistance training in particular). Has everything you need, and more. I paid for a month and once that is up, I\'ll most likely get the 12 month contract. Great atmosphere too. Other members actually put things back here, and properly so you\'re not fatiguing yourself by unracking or putting weights back for other people. I feel quite lucky to have this gym in walking distance.',
                            'date' => '4 months ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Chris Rowse',
                            'rating' => 5,
                            'comment' => 'THIS, IS, ULTRAFLEX!! We visited ULTRAFLEX Hull for the third time today completing two sessions - legs before lunch, and then upper body in the afternoon. We were blown away when we visited the gym last month, and we couldn\'t wait to return. The gym is modern, filled with high-end equipment, and has a great clientele. The staff are friendly, approachable, and really helpful. The only thing stopping us getting a monthly membership is logistics, or we would definitely be signing on the dotted line. See you again soon.',
                            'date' => 'Edited 4 months ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Sebby',
                            'rating' => 5,
                            'comment' => 'Amazing gym, staff are helpful and know what they\'re talking about and the equipment is all high quality and easy to use.',
                            'date' => 'Recent review'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Katrina Henderson',
                            'rating' => 5,
                            'comment' => 'If I could award more than 5 stars I would. The gym, staff, equipment are second to none. I have only been in for a few days and it\'s always spotless with never a weight left out of place. Everyone is friendly and willing to help. Changing rooms are clean and fresh, what more could you ask for? Definitely recommend to friends, keep up the good work guys.',
                            'date' => 'Recent review'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Christopher Rudd',
                            'rating' => 5,
                            'comment' => "Great gym with loads of quality machines, free weights and squat racks that's reasonably priced. Plenty of space even at peak times. The recovery room is a great feature as well. I was very impressed. Will definitely use this gym again if I'm in the area. Really impressive.",
                            'date' => '9 months ago'
                        ],
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+Hull/@53.7370945,-0.3793473,17z/data=!3m1!4b1!4m6!3m5!1s0x4878bf4224c223bf:0xdf1edfef5956e5db!8m2!3d53.7370945!4d-0.3793473!16s%2Fg%2F11h_46zghn?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'durham':
                $locationData = [
                    // Add gallery field for Durham
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('durham'),
                    'id' => 7,
                    'name' => 'ULTRAFLEX DURHAM',
                    'address' => 'Mandale Business Park, Unit 28D, Kent House, Durham DH1 1TH',
                    'phone' => '0191 3898321',
                    'email' => 'durham@ULTRAFLEXgym.co.uk',
                    // Updated primary image for Durham location
                    'image' => '/Images/original-787FADAA-6849-48F3-B005-6AD9FB2E74C4-min-min.jpeg',
                    'gallery' => [
                        'https://www.dropbox.com/scl/fi/dc9atjt8rd3pin3f648hc/8-Section-MultiStation.jpg?rlkey=22vqm74lx6pgez24xf6t32nck&raw=1',
                        'https://www.dropbox.com/scl/fi/ll3hf7q5ae7hj8ira9434/25m-Functional-Track-2.jpg?rlkey=oppe2pit4pouqh5m2f6vs5w85&raw=1',
                        'https://www.dropbox.com/scl/fi/quahvezf56f39ofjw5lxz/Cardio-Funcional-Rig-Area.jpg?rlkey=sdrc370l253hldilmh3dy3k4c&raw=1',
                        'https://www.dropbox.com/scl/fi/7vgj42v57vs67mt23wo44/Hardcore-Corner1.jpg?rlkey=no4rwbnkyuww20kbfcxeql2d4&raw=1',
                        'https://www.dropbox.com/scl/fi/jhzucrz3vc6xeh1tp4wyc/Lifting-Platforms.jpg?rlkey=bkgk20wvhvk2lraj25yxldu5c&raw=1',
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
                        'saturday' => '07:00 – 20:00',
                        'sunday' => '07:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Mark Bailes',
                        'bio' => 'I have been working here for 5 years since we opened in 2020. I have worked in the gym industry now for 20 years and have a lot of knowledge and experience, I am also a qualified level 3 personal trainer and offer 1 to 1 sessions in the gym. I am also a competitive bodybuilder who can offer training and nutrition advice if required. I am a very friendly and approachable person and will go out of my way to help anyone who requires any assistance.',
                        'image' => '/Images/Durham Gym Manager.webp',
                        'experience' => ''
                    ],
                    'services' => [
                        ['name' => 'Regen Physio', 'description' => 'Physiotherapy & rehab services supporting recovery.'],
                        ['name' => 'Baxters Barbers', 'description' => 'On-site barber services for members.']
                    ],
                    'serviceLinks' => [
                        ['label' => 'Regen Physio', 'url' => 'https://bit.ly/m/RegenPhysio', 'type' => 'website', 'category' => 'Physiotherapy & Recovery'],
                        ['label' => 'Baxters Barbers Instagram', 'url' => 'https://www.instagram.com/Baxters_barbers', 'type' => 'external']
                    ],
                    'features' => [
                        'Sauna & Ice Bath'
                    ],
                    'membershipPlans' => [
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
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 54.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 48.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Commitment', 'All Equipment Access', 'Cardio Area', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 250.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 435.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => 'Student 6 Month Pass',
                            'price' => 200.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£200)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student 9 Month Pass',
                            'price' => 285.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£285)', 'All Equipment Access'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Kai Edwards',
                            'rating' => 5,
                            'comment' => 'ULTRAFLEX Durham is an excellent gym and easily one of the best in the area. The whole place is spotless, with equipment that is well-maintained and laid out so everything is easy to access. The atmosphere is welcoming from the moment you walk in. Tracey on the front desk deserves a special mention - she was incredibly helpful, friendly, and had an amazing attitude that set the tone for the whole visit. Her approach made the experience even better. Overall, ULTRAFLEX Durham is a top-quality gym that is a pleasure to train in. Me and a friend both got a day pass and could not recommend it enough.',
                            'date' => '4 weeks ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'IFBB PRO JAMES HOLLINGSHEAD',
                            'rating' => 5,
                            'comment' => 'Incredible gym. One of the owners Anth is full of wisdom. Huge selection of equipment. I visit every now and then from afar and never fail to have a great time. Spoilt for choice. A true haven under one roof. Everything is looked after and the selection of equipment is hand picked by great eyes with years of experience. Lucky to have such an epic playground if you are local. Take advantage of it! 100% or nothing x',
                            'date' => '3 weeks ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Lewis Barter',
                            'rating' => 5,
                            'comment' => 'Amazing gym, all the kit you could want, particularly fond of the Hardcore Corner with the oldschool kit. Great facilities and super friendly staff. I travel here a few times a year, 100% worth the 5 hour drive.',
                            'date' => '4 weeks ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Charlie Cook',
                            'rating' => 5,
                            'comment' => 'ULTRAFLEX is by far the best gym in the North East. They have got all of the equipment you need for a serious workout, the rules on reracking weights are enforced so you are not chasing down missing dumbbells and the staff are all quality people.',
                            'date' => '1 month ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Lewis Williams',
                            'rating' => 5,
                            'comment' => 'Just joined this week after over a year out of the gym, and honestly best decision I\'ve made in a long time. Staff are great and the equipment is next level. Not only do they have everything you\'ll ever need they\'ve got 3 or 4 of it, so you\'re not stood around waiting for machines. Couldn\'t recommend any more highly',
                            'date' => '3 months ago'
                        ],
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+-+Gym+in+Durham/@54.7885757,-1.5341394,17z/data=!3m1!4b1!4m6!3m5!1s0x487e7ddf0af67a83:0xc2c9d1ae77103247!8m2!3d54.7885757!4d-1.5341394!16s%2Fg%2F11fs7zcll9?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'derby':
                $locationData = [
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('derby'),
                    'id' => 8,
                    'name' => 'ULTRAFLEX DERBY',
                    'address' => 'Chequers Rd, Derby DE21 6EN',
                    'phone' => '07395616771',
                    'email' => 'derby@ULTRAFLEXgym.co.uk',
                    // Updated primary image for Derby location
                    'image' => '/Images/processed-5AB78E5E-3190-4963-8AAF-9B3B527D73AD-min-min.jpeg',
                    'slug' => 'derby',
                    // YouTube link
                    'virtualTour' => 'https://www.youtube.com/embed/VKlANmwoDPQ',
                    'hours' => [
                        'monday' => '05:00 – 22:00',
                        'tuesday' => '05:00 – 22:00',
                        'wednesday' => '05:00 – 22:00',
                        'thursday' => '05:00 – 22:00',
                        'friday' => '05:00 – 22:00',
                        'saturday' => '07:00 – 20:00',
                        'sunday' => '07:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Ian',
                        'bio' => 'Welcome to ULTRAFLEX Derby. With over 200 pieces of the best gym machinery from several different brands, a full sized boxing ring, and powerlifting cage, located in a 20k sq ft facility, you are entering the best equipped gym in the Midlands. Here we bring the best training experience for everyone, an amazing team to support you and provide the perfect environment no matter what you’re training for. Tired of messy gyms? Here we work hard to provide you with the cleanest facility, no more looking for weights or attachments, all weights are kept in order, and leaving weights out isn’t tolerated. Looking for more than just a gym? Come sit down and relax in one of our 3 saunas, enjoy a shake with a brownie after a hard workout (healthier options available). For those braver souls out there, we also have ice baths available to help with your recovery. On site we also have an Osteopath, Sports Massage and Therapy, and blood testing available. All this in one place! If you ever need anything come see us. If you would like to enquire or ever need to reach me, please contact me on derby@ULTRAFLEXgym.co.uk.',
                        'image' => '/Images/managers/ian.jpg',
                        'experience' => null
                    ],
                    'services' => [
                        [
                            'name' => 'House of Wellness',
                            'description' => 'Blood testing and wellness diagnostics.',
                            'icon' => null,
                            'category' => 'Blood Testing & Analysis'
                        ],
                        [
                            'name' => 'Elite Osteo Midlands',
                            'description' => 'On-site osteopathy supporting recovery and performance.',
                            'icon' => null,
                            'category' => 'Chiropractor'
                        ],
                        [
                            'name' => 'Fusion Rehab',
                            'description' => 'Sports therapy and rehabilitation services.',
                            'icon' => null,
                            'category' => 'Sports Massage'
                        ]
                    ],
                    'serviceLinks' => [
                        [ 'label' => 'House of Wellness Website', 'url' => 'https://houseofwellnessuk.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAPV8XRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadoxQLPcJPZSxe_bCZJ5NleoeS29Yl_wnSygMe3k8darDkaqERV3xJRsNyh8w_aem_F7jZqj8tQpBFDvHZsaXa9Q', 'type' => 'website' ],
                        [ 'label' => 'House of Wellness Instagram', 'url' => 'https://www.instagram.com/houseofwellnessuk', 'type' => 'instagram' ],
                        [ 'label' => 'House of Wellness TikTok', 'url' => 'https://www.tiktok.com/@houseofwellnessuk', 'type' => 'tiktok' ],
                        [ 'label' => 'Elite Osteo Midlands Instagram', 'url' => 'https://www.instagram.com/eliteosteo.midlands', 'type' => 'instagram' ],
                        [ 'label' => 'Elite Osteo Midlands Website', 'url' => 'https://eliteosteo.co.uk', 'type' => 'website' ],
                        [ 'label' => 'Fusion Rehab Instagram', 'url' => 'https://www.instagram.com/Fusion_rehab_', 'type' => 'instagram' ]
                    ],
                    'features' => [
                        'Sauna & Ice Bath'
                    ],
                    'equipment' => [
                        ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                        ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                        ['name' => 'Boxing Area', 'icon' => 'users', 'available' => true],
                        ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                        ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                        ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                    ],
                    'amenities' => [
                        'Top-quality equipment from best brand names',
                        'Comfortable changing rooms',
                        'Boxing area',
                        'Free on-site parking',
                        'Easy public transport access'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 29.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Cardio Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 56.00,
                            'period' => 'month',
                            'features' => ['Rolling Contract', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => '1 Month Pass',
                            'price' => 62.00,
                            'period' => 'month',
                            'features' => ['1 Month Access', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => '12 month Direct Debit',
                            'price' => 54.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Commitment', 'All Equipment Access', 'Cardio Area', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 315.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 570.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Students and Blue Light - Rolling',
                            'price' => 49.00,
                            'period' => 'month',
                            'features' => ['Student & Blue Light Discount', 'Valid ID Required', 'Monthly Rolling Direct Debit', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Students and Blue Light - 12 month Direct Debit',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['Student & Blue Light Discount', 'Valid ID Required', '12 Month Direct Debit', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Boxing, MMA & Gym',
                            'price' => 66.00,
                            'period' => 'month',
                            'features' => ['Boxing Access', 'MMA Access', 'Full Gym Membership'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Callan Doherty',
                            'rating' => 5,
                            'comment' => 'Top Class Gym! World Class Facilities! Best Set Up I Have Ever Experienced! Great, Friendly Staff! Highly Recommend! No Better Place To Guide You To Your Goals! Would give a 10x Star Rating If Possible. Credit To Owner + Staff.',
                            'date' => '1 month ago'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Dan Saunders',
                            'rating' => 5,
                            'comment' => "Excellent gym ... Equipment is unbelievable and more than enough equipment regardless of how busy it can potentially get... Great atmosphere and the staff are very welcoming and can't do enough to help! Can't recommend highly enough!!",
                            'date' => '3 months ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Heine Kaas',
                            'rating' => 5,
                            'comment' => 'This is really a prime gym, the service is amazing, machines are great. And they keep it so clean. If you are in UK, jump on the train ride and get to Derby, it will be worth it!',
                            'date' => '1 month ago'
                        ],
                        [
                            'id' => 4,
                            'name' => 'UncrowndKing',
                            'rating' => 5,
                            'comment' => 'Out of all the gyms I have been to this has been the best in terms of equipment available. Joe has been amazing with her customer service. Megan the cleaner does a great job of keeping the equipment clean. Also like to add how delicious their protein shake was - 53g of PROTEIN!',
                            'date' => '5 months ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Lee Desoiza',
                            'rating' => 5,
                            'comment' => 'What an amazing gym. Every piece of kit from every top quality brand. I would move to Derby just to train here everyday.',
                            'date' => '1 month ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Eesah Najib',
                            'rating' => 5,
                            'comment' => 'Great gym, in my opinion best in the UK. Very clean and friendly environment. The staff are amazing, great customer service especially from the two Lukes on the front desk. Met the gym owner Charles and he is a top man, goes out of his way for all the members in the gym to make sure the gym is the best it can be.',
                            'date' => '6 months ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 52.9219,
                        'lng' => -1.4758
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+Derby/@52.9209207,-1.4514623,17z/data=!3m1!4b1!4m6!3m5!1s0x4879f1ba94609079:0x22c967098ab40dcd!8m2!3d52.9209175!4d-1.4488874!16s%2Fg%2F11vb8bxxlh?coh=277535&entry=tts&g_ep=EgoyMDI1MTIwOS4wIPu8ASoKLDEwMDc5MjA3M0gBUAM%3D&skid=00b71a2c-ba9f-4c14-8f06-71774134c920'
                ];
                break;

            case 'athens-greece':
                $locationData = [
                    // Add gallery field for Athens
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('athens-greece'),
                    'id' => 9,
                    'name' => 'ULTRAFLEX ATHENS (GREECE)',
                    'address' => 'Ethnarchou Makariou 16, Peristeri 121 32, Greece',
                    'phone' => '+30 21 0578 5856',
                    'email' => 'athens@ULTRAFLEXgym.co.uk',
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
                        'monday' => '6:00 AM - 12:00 AM',
                        'tuesday' => '6:00 AM - 12:00 AM',
                        'wednesday' => '6:00 AM - 12:00 AM',
                        'thursday' => '6:00 AM - 12:00 AM',
                        'friday' => '6:00 AM - 12:00 AM',
                        'saturday' => '9:00 AM - 10:00 PM',
                        'sunday' => '10:00 AM - 8:00 PM'
                    ],
                    'manager' => null,
                    'membershipPlans' => [],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Maria Konstantinou',
                            'rating' => 5,
                            'comment' => 'So excited for ULTRAFLEX to open in Athens! Finally, a premium gym chain is coming to Greece. Can\'t wait for the opening!',
                            'date' => '2025-06-25'
                        ],
                        [
                            'id' => 2,
                            'name' => 'Nikos Petridis',
                            'rating' => 5,
                            'comment' => 'The location in Glyfada is perfect! Looking forward to experiencing the ULTRAFLEX quality we\'ve heard so much about.',
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
                            'update' => 'ULTRAFLEX announces expansion to Greece'
                        ]
                    ]
                ];
                break;
                
            case 'lincoln':
                $locationData = [
                    // Add gallery field for Lincoln
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('lincoln'),
                    'id' => 10,
                    'name' => 'ULTRAFLEX LINCOLN',
                    'address' => '3 Pioneer Way, Lincoln LN6 3DH',
                    'phone' => '01522 454320',
                    'email' => 'lincoln@ULTRAFLEXgym.co.uk',
                    // Updated primary image for Lincoln location (replaced per user request Jan 12 2026)
                    'image' => '/Images/newimages/processed-7CE97793-CFE2-44A3-9BC7-AC26D84DB463.webp',
                    'gallery' => [
                        '/Images/newimages/Lincoln/gym-in-lincoln-3.webp',
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
                        'monday' => 'Day Access: 6am - 10pm',
                        'tuesday' => 'Day Access: 6am - 10pm',
                        'wednesday' => 'Day Access: 6am - 10pm',
                        'thursday' => 'Day Access: 6am - 10pm',
                        'friday' => 'Day Access: 6am - 10pm',
                        'saturday' => 'Day Access: 8am - 10pm',
                        'sunday' => 'Day Access: 8am - 10pm'
                    ],
                    'manager' => [
                        'name' => 'Lynsey Hind',
                        'bio' => "I’m proud to be the Gym Manager here at ULTRAFLEX – the friendliest, most motivating place to train!\nFrom the moment you walk through the doors, you’re part of the family. Our amazing team is always ready with a smile, a helping hand, and encouragement to keep you progressing toward your goals.\nWe’ve built an environment where everyone works together – no egos, just great vibes, hard work, and a shared love for health & fitness. Whether you’re lifting big, starting your journey, or just here for a feel-good session, you’ll always feel welcome.\nOutside of the gym, I’m a proud mum to Ava-Lily, my eight-year-old daughter who has a real need for speed. Most weekends you’ll find us at the track, where she’s racing her go-kart with the same determination and focus we value so much in the gym.\nFor me, both work and home life are about dedication, community, and enjoying the journey – and that’s exactly what we aim to bring to every member’s experience at ULTRAFLEX.\nIt’s all about community, support, and results – and we can’t wait to welcome you in.",
                        // TODO: Manager image missing (lynsey.jpg). Add file to public/Images/managers or update path.
                        'image' => null,
                        'experience' => ''
                    ],
                    'features' => [
                        'Full Access Members: Mon-Sun 24hrs',
                        'Barbershop (BLNK Barbers)',
                        'Wide Range of Personal Trainers (Bodybuilding to General Health & Weight Loss)',
                        'Sauna & Ice Bath'
                    ],
                    'services' => [
                        ['name' => 'BLNK Barbers', 'description' => 'In-gym barbershop providing grooming services for members.', 'icon' => '✂️'],
                        ['name' => 'Sports Massage', 'description' => 'Professional sports massage and recovery services.', 'icon' => '🩺']
                    ],
                    'serviceLinks' => [
                        ['label' => 'BLNK Barbers Website', 'url' => 'https://www.blnkbarbers.com', 'type' => 'external'],
                        ['label' => 'BLNK Barbers Booking', 'url' => 'https://www.blnkbarbers.com/book/shops/IONEJG/services', 'type' => 'external'],
                        ['label' => 'Sports Massage - The Recovery Hub', 'url' => 'https://linktr.ee/Therecoveryhub_UF?utm_source=linktree_profile_share&ltsid=b2001f13-c003-4d72-b057-d5f49113b697', 'type' => 'external']
                    ],
                    'equipment' => [
                        ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                        ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                        ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                        ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                        ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                    ],
                    'amenities' => [
                        'Top-quality equipment from best brand names',
                        'Comfortable changing rooms',
                        'Free on-site parking',
                        'Easy public transport access'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 1,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 54.99,
                            'period' => 'month',
                            'features' => ['Monthly Rolling', 'Day Access Only', 'Mon-Fri: 06:00-22:00', 'Sat-Sun: 06:00-20:00', 'State-of-the-art Equipment'],
                            'popular' => false
                        ],
                        [
                            'id' => 2,
                            'name' => 'Monthly Rolling 24hr Direct Debit',
                            'price' => 65.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling', '24/7 Access', 'Train Anytime', 'First 24hr ULTRAFLEX', 'Complete Flexibility'],
                            'popular' => true
                        ],
                        [
                            'id' => 3,
                            'name' => '12 month Direct Debit',
                            'price' => 49.99,
                            'period' => 'month',
                            'features' => ['12 Month Contract', 'Day Access Only', 'Mon-Fri: 06:00-22:00', 'Sat-Sun: 06:00-20:00', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 4,
                            'name' => '12 Month 24hr Direct Debit',
                            'price' => 54.99,
                            'period' => 'month',
                            'features' => ['12 Month Contract', '24/7 Access', 'Train Anytime', 'First 24hr ULTRAFLEX', 'Complete Flexibility'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => '12 Month Pass - Paid in Full',
                            'price' => 530.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'Day Access Only', 'All Equipment Access', 'Best Annual Value', 'No Monthly Payments'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month 24hr Pass - Paid in Full',
                            'price' => 590.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', '24/7 Access', 'Best 24hr Annual Value', 'No Monthly Payments'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '6 Month Pass - Paid in Full',
                            'price' => 270.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'Day Access Only', 'All Equipment Access', 'No Monthly Payments'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => '6 Month 24hr Pass - Paid in Full',
                            'price' => 300.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', '24/7 Access', 'No Monthly Payments'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student Monthly Rolling',
                            'price' => 48.60,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'Day Access Only'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'Student Monthly Rolling 24hr',
                            'price' => 58.50,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', '24/7 Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => 'Student 6 Month Pass - Paid in Full',
                            'price' => 265.50,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'Day Access Only', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 12,
                            'name' => 'Student 6 Month Pass - Paid in Full 24hr',
                            'price' => 319.50,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', '24/7 Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 13,
                            'name' => 'Student 12 Month Pass - Paid in Full',
                            'price' => 477.00,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'Day Access Only', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 14,
                            'name' => 'Student 12 Month Pass - Paid in Full 24hr',
                            'price' => 531.00,
                            'period' => '12 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', '24/7 Access'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'James Harrison',
                            'rating' => 5,
                            'comment' => 'Amazing to have the first 24hr ULTRAFLEX! Perfect for my shift work - I can train at 3am if I want to. State-of-the-art facilities are incredible.',
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
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+Lincoln/@53.2010099,-0.5950846,17z/data=!3m1!4b1!4m6!3m5!1s0x4878453a2df04e4d:0x2e4b6b6facf2e70d!8m2!3d53.2010068!4d-0.5902137!16s%2Fg%2F11wg7fn_1m?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;

            case 'west-london':
                $locationData = [
                    // Add gallery field for West London
                    'gallery' => [],
                    'galleryFolderUrl' => self::galleryFolderUrl('west-london'),
                    'id' => 11,
                    'name' => 'ULTRAFLEX WEST LONDON',
                    'address' => 'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP',
                    'phone' => '01895 436000',
                    'email' => 'westlondon@ULTRAFLEXgym.co.uk',
                    // Updated primary image for West London location (replaced per user request Oct 8 2025)
                    'image' => '/Images/processed-463489D0-F620-407E-BED0-4EB177EDCAC4 (1).webp',
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
                        'bio' => 'I’ve been part of this gym for almost three years, starting on front of house before stepping into the role of General Manager when we became ULTRAFLEX West London. During that time, I’ve had the chance to get to know our members and experience first-hand what makes this place so special. For me, it’s never been just a gym—it’s a community and a second home. This gym has also played a huge role in my personal journey. After being diagnosed with cancer last year, the support I received from members and staff was a lifeline. That experience made me even more determined to give back and to work as hard as I can to create the best possible environment for everyone who walks through the doors. My role is about more than just running the site. I care deeply about supporting our staff, maintaining high standards, and making sure our members feel welcome, motivated, and valued. I like to lead by example—whether that’s being on the gym floor, putting weights away, or simply having a chat with members—because the little things matter. ULTRAFLEX West London is a place I care deeply about, and I’ll always work hard to make sure it remains somewhere both staff and members can enjoy, feel valued, and be proud to be part of.',
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
                            'description' => 'Aesthetics treatments',
                            'icon' => null
                        ],
                        [
                            'name' => 'Faded Group Barber',
                            'description' => 'Professional barber services on-site for member convenience.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        // Head2Heel Physio
                        [ 'label' => 'Head2Heel Physio Instagram', 'url' => 'https://www.instagram.com/Head2Heal.Clinic', 'type' => 'instagram' ],
                        [ 'label' => 'Head2Heel Physio Phone', 'url' => 'tel:07951472144', 'type' => 'phone' ],
                        // NMK Aesthetics
                        [ 'label' => 'NMK Aesthetics Instagram', 'url' => 'https://www.instagram.com/nmk_aesthetics', 'type' => 'instagram' ],
                        [ 'label' => 'NMK Aesthetics Website', 'url' => 'https://nmkaesthetics.com/', 'type' => 'website' ],
                        [ 'label' => 'NMK Aesthetics Phone', 'url' => 'tel:07377190361', 'type' => 'phone' ],
                        // Faded Group Barber
                        [ 'label' => 'Faded Group Barber Instagram', 'url' => 'https://www.instagram.com/fadedgroup_uxbridge', 'type' => 'instagram' ],
                        [ 'label' => 'Faded Group Barber Phone', 'url' => 'tel:07900626284', 'type' => 'phone' ]
                    ],
                    'features' => [
                        'Sauna & Ice Bath'
                    ],
                    'equipment' => [
                        ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                        ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                        ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                        ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                        ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                    ],
                    'amenities' => [
                        'Top-quality equipment from best brand names',
                        'Comfortable changing rooms',
                        'Free on-site parking',
                        'Easy public transport access'
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 30.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Premium London Location', 'Early Opening 05:30'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass Rolling',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['No Contract', 'Monthly Rolling', 'All Equipment Access', 'Maximum Flexibility'],
                            'popular' => true
                        ],
                        [
                            'id' => 4,
                            'name' => '12 month Direct Debit',
                            'price' => 50.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Commitment', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 315.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 570.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => 'Student Monthly Rolling',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Monthly Rolling', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'Student 6 Month Pass',
                            'price' => 250.00,
                            'period' => '6 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£250)', 'All Equipment Access'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'Student 9 Month Pass',
                            'price' => 350.00,
                            'period' => '9 months',
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full (£350)', 'All Equipment Access'],
                            'popular' => false
                        ],
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
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/ULTRAFLEX+-+Gym+in+West+London/@51.5199897,-0.4833574,17z/data=!3m1!4b1!4m6!3m5!1s0x48766e049076b79b:0x50c88ea22ee842ae!8m2!3d51.5199864!4d-0.4807825!16s%2Fg%2F1tj88y5l?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            default:
                // Default to West Leeds data for other locations
                $locationData = [
                    'id' => 1,
                    'name' => 'ULTRAFLEX WEST LEEDS',
                    'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
                    'phone' => '0113 256 5107',
                    'email' => 'leeds@ULTRAFLEXgym.co.uk',
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
                        'bio' => 'ULTRAFLEX Gym in Leeds is regarded as one of the best gyms in Leeds. Our team ensures members can train on top-quality equipment manufactured by the best brand names in the world.',
                        'image' => '/Images/managers/james.jpg',
                        'experience' => '15+ years experience'
                    ],
                ];
        }
        
        // Post-process: remove static martial arts feature/equipment references and inject boxing capability where applicable
        $slug = isset($locationData['slug']) ? $locationData['slug'] : $location;
        $hasBoxing = isset($capabilities[$slug]['boxing']) ? $capabilities[$slug]['boxing'] : false;

        // Clean equipment list
        if (isset($locationData['features']) && is_array($locationData['features'])) {
            $locationData['features'] = array_values(array_filter(array_map(function($f){
                return preg_match('/martial/i', $f) ? null : $f;
            }, $locationData['features'])));
            if ($hasBoxing) {
                $already = false; foreach ($locationData['features'] as $f) { if (stripos($f, 'boxing') !== false) { $already = true; break; } }
                if (!$already) { $locationData['features'][] = 'Boxing Area'; }
            }
        }

        if (isset($locationData['membershipPlans'])) {
            $locationData['membershipPlans'] = $processPlans($locationData['membershipPlans'], $hasBoxing, $slug);
        }

        // Common data for all locations
        $commonData = [
            'signupUrl' => 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2',
            'equipment' => [
                ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                // Conditionally add Boxing Area (filter out null later)
                $hasBoxing ? ['name' => 'Boxing Area', 'icon' => 'users', 'available' => true] : null,
                ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
            ],
            'amenities' => [
                'Top-quality equipment from best brand names',
                'Comfortable changing rooms',
                $hasBoxing ? 'Boxing area' : null,
                'Free on-site parking',
                'Easy public transport access'
            ],
            // New placeholder structured fields (can be overridden per location case)
            'features' => [], // e.g. ['24/7 Access', 'Competition Grade Equipment']
            'services' => [], // e.g. [['name' => 'Physiotherapy', 'description' => 'On-site rehab specialists']]
            'serviceLinks' => [], // e.g. [['label' => 'Book PT Session', 'url' => '/services/personal-training']]
            // Use dynamic trainers only; no placeholders to avoid duplication
            'trainers' => [],
            'gallery' => [],
            'membershipPlans' => [
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
                    'name' => 'Monthly Rolling Direct Debit',
                    'price' => 45,
                    'period' => 'month',
                    'features' => ['Rolling Contract', 'All Equipment Access', 'Martial Arts Area'],
                    'popular' => false
                ],
                [
                    'id' => 4,
                    'name' => 'Monthly Direct Debit',
                    'price' => 38.50,
                    'period' => 'month',
                    'features' => ['Min 12 Month Commitment', 'All Equipment Access', 'Martial Arts Area', 'Best Value'],
                    'popular' => true
                ],
                [
                    'id' => 5,
                    'name' => '3 Month Pass',
                    'price' => 130,
                    'period' => '3 months',
                    'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area'],
                    'popular' => false
                ],
                [
                    'id' => 6,
                    'name' => '6 Month Pass',
                    'price' => 230,
                    'period' => '6 months',
                    'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area'],
                    'popular' => false
                ],
                [
                    'id' => 7,
                    'name' => '12 Month Pass',
                    'price' => 420,
                    'period' => '12 months',
                    'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Best Annual Value'],
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
                    'comment' => 'ULTRAFLEX Leeds truly is one of the best gyms in Leeds! The equipment quality is outstanding and the martial arts area is fantastic.',
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

        // Ensure a display name always exists on the location data (fallback to uppercase slug pattern if missing)
        if (!isset($locationData['name']) && isset($locationData['slug'])) {
            $locationData['name'] = 'ULTRAFLEX ' . strtoupper(str_replace('-', ' ', $locationData['slug']));
        }

        // Normalize virtual tour URLs (convert short YouTube or watch urls to embed form)
        if (isset($locationData['virtualTour']) && is_string($locationData['virtualTour']) && $locationData['virtualTour']) {
            $vt = $locationData['virtualTour'];
            // youtu.be/<id>
            if (preg_match('#https?://youtu\.be/([A-Za-z0-9_-]+)#', $vt, $m)) {
                $locationData['virtualTour'] = 'https://www.youtube.com/embed/' . $m[1];
            }
            // youtube.com/watch?v=<id>
            elseif (preg_match('#https?://(www\.)?youtube\.com/watch\?v=([A-Za-z0-9_-]+)#', $vt, $m)) {
                $locationData['virtualTour'] = 'https://www.youtube.com/embed/' . $m[2];
            }
        }


        // --- Inject dynamic trainers for this location (real data) ---
        // Centralised in App\Data\TrainerData to allow reuse by TrainerController.
        $allTrainers = \App\Data\TrainerData::all();
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

        // Filter null equipment/amenities introduced by conditional capability logic
        if (isset($commonData['equipment'])) {
            $commonData['equipment'] = array_values(array_filter($commonData['equipment'], function($e){ return $e !== null; }));
        }
        if (isset($commonData['amenities'])) {
            $commonData['amenities'] = array_values(array_filter($commonData['amenities'], function($a){ return $a !== null; }));
        }
        $locationData = array_merge($commonData, $locationData);

        // Ensure location page galleries are connected to their respective local gallery folders.
        // If a matching folder exists under public/Images/Gallery, prefer it over any legacy/empty arrays.
        $finalSlug = $locationData['slug'] ?? $location;
        $localGallery = self::localGalleryImages($finalSlug);
        if (count($localGallery) > 0) {
            $locationData['gallery'] = $localGallery;
        }

        return Inertia::render('Locations/Show', [
            'location' => $locationData,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}


