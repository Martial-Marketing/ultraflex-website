<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ImageService;
use App\Data\TrainerData;

class LocationController extends Controller
{
    // Single source of truth for gallery images (matches Gallery route in web.php)
    private static $externalImages = [
        // Derby: images provided via Dropbox; use raw=1 for inline display
        'derby' => [
            'https://www.dropbox.com/scl/fi/rskqdsy7pojj730bmntbx/DSC05684.jpeg?rlkey=pt39pjwzhadxjjxsvuuczh2gx&raw=1',
            'https://www.dropbox.com/scl/fi/qcs42onp3nbkbv4nrdx6x/DSC05689.jpeg?rlkey=v71ce5fb1baaiop6ipzslzdt2&raw=1',
            'https://www.dropbox.com/scl/fi/dk7xkz7ujqnb0z3p4m72b/DSC05697.jpeg?rlkey=0dh2nrsg9jok1xl9k5r6nrhpm&raw=1',
            'https://www.dropbox.com/scl/fi/5piandw32oii9rga1ei4s/DSC05724.jpeg?rlkey=guze3apjq3lpjylussgutzwla&raw=1',
            'https://www.dropbox.com/scl/fi/659v2gmy5imo5l6nyo3bq/DSC05731.jpeg?rlkey=i5eo1nih41kf3f0h1sg8tnxvr&raw=1',
            'https://www.dropbox.com/scl/fi/oa8w66dddjmx8ev3tfzc2/DSC05733.jpeg?rlkey=jag7gsha5op6ey6oaa6hqux0z&raw=1',
            'https://www.dropbox.com/scl/fi/ju6r5fo6t751pvmy59l8t/DSC05739.jpeg?rlkey=3f69e5eaj0nfgnjrr0z9nb2gc&raw=1',
            'https://www.dropbox.com/scl/fi/6vidj6dx9ibkkr6iksyls/DSC05762.jpeg?rlkey=oidthpzom5098daiujk83v34l&raw=1',
            'https://www.dropbox.com/scl/fi/wwbcch5jllmvq2yi3bivu/DSC05764.jpeg?rlkey=1xofpyqh6zilpjkxh4iypufda&raw=1',
            'https://www.dropbox.com/scl/fi/hhmgdgsyesw7m8c111byy/DSC05780.jpeg?rlkey=tuasn0bzhws9xrgsvu55gy7eh&raw=1',
            'https://www.dropbox.com/scl/fi/oz0bw7b05l0ps7ofuzi8b/DSC05805.jpeg?rlkey=h8gj3w261j7q78z6wtmjwbks7&raw=1',
            'https://www.dropbox.com/scl/fi/p3qdj1oompuvpo2d1esoa/DSC05816.jpeg?rlkey=7zwmduvng2v7frznxx8otl923&raw=1',
            'https://www.dropbox.com/scl/fi/tbo66lbci5nz6fjkx0yx8/DSC05818.jpeg?rlkey=5nkbxp3ckou9e0fd3u8gxgru3&raw=1',
            'https://www.dropbox.com/scl/fi/j2oanoz5d2x04fjv4eq5t/DSC05828.jpeg?rlkey=9wxnsf6gx7l2htpty3vnh3cbf&raw=1',
        ],
        // Hull: images provided via Dropbox
        'hull' => [
            'https://www.dropbox.com/scl/fi/in4ej490anf23ipvx8ewi/IMG-4.jpg?rlkey=v2ampzl63i13a2ab1y6fhnuw2&raw=1',
            'https://www.dropbox.com/scl/fi/8whbqkx4jslrx9ec3q9fv/IMG-15.jpg?rlkey=0fdsni86elpsj5ap9e3x59gux&raw=1',
            'https://www.dropbox.com/scl/fi/k809s2y4onmg0h55ygydy/IMG-19.jpg?rlkey=5nn6hfdtcosuek7pq3zke98cf&raw=1',
            'https://www.dropbox.com/scl/fi/13i8gj5zsb3ss58ed4lle/IMG-27.jpg?rlkey=lwexgkujdo64u8p51bz5hswn7&raw=1',
            'https://www.dropbox.com/scl/fi/8n1f55sclfuhw9lxyqp7d/IMG-34.jpg?rlkey=j8lx1534nrioyz17ki4yjdifw&raw=1',
            'https://www.dropbox.com/scl/fi/1p7l0kjuy4z0ghy5utb1r/Photo-07-10-2025-16-46-52.jpg?rlkey=vzzyp8up3az298uoq2l91vfmr&raw=1',
        ],
        // Lincoln: images provided via Dropbox
        'lincoln' => [
            'https://www.dropbox.com/scl/fi/eq90b2fzy2eur6fyab9d6/ultraflex-full-8.jpg?rlkey=ei4vcglt6cf2z7eihho9xm2cy&raw=1',
            'https://www.dropbox.com/scl/fi/zvenze3pz13k34lua8bcs/ultraflex-full-4637.jpg?rlkey=yp2nux73846dzdrc9rxmhi5iu&raw=1',
            'https://www.dropbox.com/scl/fi/4ay06ko4jyu0z819axnhn/ultraflex-full-4711.jpg?rlkey=5pbfodxwu6ea3gndx2den7z34&raw=1',
            'https://www.dropbox.com/scl/fi/qio6w7qnyuw8t2zn0ye2r/ultraflex-full-4722.jpg?rlkey=wy66dnev34w6xz3y4j9cj0ayl&raw=1',
            'https://www.dropbox.com/scl/fi/7a45mbgqyv386r8jzex0b/ultraflex-full-4814.jpg?rlkey=kxpwzpc0irruwaoz0m5vp20qg&raw=1',
            'https://www.dropbox.com/scl/fi/4mvjodehjwj6g6avnvyta/ultraflex-full-4849.jpg?rlkey=ws4ut5m8hut0oa9fo04pky9h1&raw=1',
            'https://www.dropbox.com/scl/fi/dij1ym92btemztkask47v/ultraflex-full-4859.jpg?rlkey=67f1lm89u453da197ihz9dycw&raw=1',
            'https://www.dropbox.com/scl/fi/pdulj4pozuwoqjnez6ety/Ultraflex-2.jpg?rlkey=8womnmv9x3x86ci3f6h10wfbs&raw=1',
            'https://www.dropbox.com/scl/fi/bcctusmubqmrfhqs1ys5d/Ultraflex-5036.jpg?rlkey=61cmlq3znsrjdg7nbmdf5804a&raw=1',
            'https://www.dropbox.com/scl/fi/i1ds1aspf6gz4m2wvjpuk/Ultraflex-5042.jpg?rlkey=oe7nv0al7g8xxauvr3jfl5l6w&raw=1',
            'https://www.dropbox.com/scl/fi/b2tdsb0uudvolgqe370so/Ultraflex-5065.jpg?rlkey=emtzmggg3luetgepkma4tvrfn&raw=1',
            'https://www.dropbox.com/scl/fi/lk0kgnz8r8ar97xtmwacy/Ultraflex-5123.jpg?rlkey=f4pm0ra903itoo8kl4rigsh4q&raw=1',
            'https://www.dropbox.com/scl/fi/6a03y29gms5kjtv3yail8/Ultraflex-5163.jpg?rlkey=8y9e5v6opmgn8lgwwj2dv56tx&raw=1',
        ],
        // Normanton: images provided via Dropbox
        'normanton' => [
            'https://www.dropbox.com/scl/fi/y1nva7472ko6hgbgr0nze/Ultraflex-5183.jpg?rlkey=by2cb42i3g48nphfwg01ahpd9&raw=1',
            'https://www.dropbox.com/scl/fi/5xdd95r5tjj0hm07yczpj/IMG_-58.jpg?rlkey=pzx38w997h2wv9mwn6v7fnsp5&raw=1',
            'https://www.dropbox.com/scl/fi/opc56ztx9i10xuskj7zqt/IMG_-61.jpg?rlkey=w26853ezlwwqt1hgvv4t89atw&raw=1',
            'https://www.dropbox.com/scl/fi/54o1rm8vx5qt5ol1vhyq4/IMG_-63.jpg?rlkey=qez2uxt3j12qgbf7ybhb5skit&raw=1',
            'https://www.dropbox.com/scl/fi/pql53de11puhvlyps9cye/IMG_-65.jpg?rlkey=ssrjtiph9ryu7w2hi66tngu7g&raw=1',
            'https://www.dropbox.com/scl/fi/3czoeor6fhhnpitehsjgd/IMG_-82.jpg?rlkey=t327tzcp5ncgq0icr5ratchp6&raw=1',
            'https://www.dropbox.com/scl/fi/qg45a4eaoopgkwmydlmch/IMG_1272.jpg?rlkey=0wh8thn17wh43hx6cylooildw&raw=1',
        ],
        // North Leeds: images provided via Dropbox
        'north-leeds' => [
            'https://www.dropbox.com/scl/fi/dh3c9ym12pfmbjjbgn9w0/IMG_1296.jpg?rlkey=it8aqy0b7lcpte9yt4c7wp871&raw=1',
            'https://www.dropbox.com/scl/fi/so5n3eq32g17l0cm6377b/DSC07346.jpg?rlkey=dq07yp23ugzd038a1ayrjfit5&raw=1',
            'https://www.dropbox.com/scl/fi/eygd360cvsm3foacxmp1q/DSC07348.jpg?rlkey=ikplg2gq38jccibktmupdu7z8&raw=1',
            'https://www.dropbox.com/scl/fi/6nh9d3unh9b086lf8yvbc/DSC07349.jpg?rlkey=pk4lqyxmuuefnak4nmermiqxb&raw=1',
            'https://www.dropbox.com/scl/fi/qe49fw3vow7fav598zpb1/DSC07384.jpg?rlkey=gxnszyjrh7zv5axuptys9twly&raw=1',
            'https://www.dropbox.com/scl/fi/sha3y5chtjlo8wpszv1zy/DSC07391.jpg?rlkey=ch7ac551fz15myu4bcbp4pwbx&raw=1',
            'https://www.dropbox.com/scl/fi/fj9wnuv1vpnm3jpapsn3e/DSC07399.jpg?rlkey=ennklsvx3nvajzlwepzdcz4sg&raw=1',
        ],
        // Rotherham: images provided via Dropbox + local newimages (4th & 5th removed per request)
        'rotherham' => [
            'https://www.dropbox.com/scl/fi/dcymdsets91jgp3xzsq8k/akv_podcast_-2.jpg?rlkey=9yjsf5d1xm6hqynfvx6ou0w8z&raw=1',
            'https://www.dropbox.com/scl/fi/6ez6s9nwdm30y50t24l2d/IMG-61.jpg?rlkey=ie8y4r3fand8iptdw14s5zqob&raw=1',
            'https://www.dropbox.com/scl/fi/gff5pf1juakxwldmj18on/IMG-120.jpg?rlkey=anzt4ypn6mo8ryji2cyalk60z&raw=1',
            'https://www.dropbox.com/scl/fi/k329igqoefpf7d4czai46/Photo-17-06-2025-17-04-51.jpg?rlkey=hc53w58w1ur335fz9pijlxi40&raw=1',
            '/Images/newimages/Rotherham/2.webp',
            '/Images/newimages/Rotherham/3.webp',
            '/Images/newimages/Rotherham/4.webp',
            '/Images/newimages/Rotherham/5.webp',
            '/Images/newimages/Rotherham/WhatsApp Image 2026-01-05 at 11.02.36 AM.webp',
        ],
        // West Leeds: images provided via Dropbox
        'west-leeds' => [
            'https://www.dropbox.com/scl/fi/s187094gha1c3y4bhr12b/Posing-studio.jpg?rlkey=f87yqpdytcj9s8l2jj8w9wm3f&raw=1',
            'https://www.dropbox.com/scl/fi/tiljdrvr1u10fqqb36h9q/_AKD0960-copy.jpg?rlkey=lbs8vodcj7s6f2plpqex0gdm8&raw=1',
            'https://www.dropbox.com/scl/fi/tbgxyomvrkrd8hiop6f55/_AKD1151-copy.jpg?rlkey=p1886ygiwuhxkicq9axeqb0sh&raw=1',
            'https://www.dropbox.com/scl/fi/7ncm853bz8kibb6e9mklx/_AKD1366-copy.jpg?rlkey=v2kd6gq9oyomcdrcmqtv9wl61&raw=1',
            'https://www.dropbox.com/scl/fi/ijy5qlknnvrmwae7s5e42/_AKD1461-copy.jpg?rlkey=6fu0b0tblss8a6mxru1kzn48u&raw=1',
            'https://www.dropbox.com/scl/fi/4t7quluixrtw50f2u9f3l/UFG-64.jpg?rlkey=9sws7hvp60j55njw88r92dg1v&raw=1',
            'https://www.dropbox.com/scl/fi/7me7ulnm7dqwym8url73c/UFG-100.jpg?rlkey=z80cjsqxarpam0gmwrqecr2da&raw=1',
        ],
        // West London: images provided via Dropbox
        'west-london' => [
            'https://www.dropbox.com/scl/fi/4f1xj9rve5h8z9euxcgr0/Photo-03-09-2025-14-02-45.jpg?rlkey=yjkkh0nesax6pfzvqryp4eyrx&raw=1',
            'https://www.dropbox.com/scl/fi/i3frbh1ac99ipf46hvklw/Photo-03-09-2025-14-02-51.jpg?rlkey=2f6t6gbw9gbsc5gkzypwhaxds&raw=1',
            'https://www.dropbox.com/scl/fi/frmjggmrr5069uzrj6oz1/Photo-03-09-2025-14-03-03.jpg?rlkey=9zftb1e1twqoghwud61snd2xk&raw=1',
            'https://www.dropbox.com/scl/fi/tmtxltzqy8o25tqi9pukz/Photo-03-09-2025-14-03-12.jpg?rlkey=s9u303dm4eg1kdpvjnwnu6lhn&raw=1',
            'https://www.dropbox.com/scl/fi/a4jg3q9b38lzcs64tfahs/Photo-03-09-2025-14-08-02.jpg?rlkey=dkya08c7rd4ljo4s81hkq29sp&raw=1',
        ],
        // York: images provided via Dropbox
        'york' => [
            'https://www.dropbox.com/scl/fi/epsqmglmx84fhzffwf95j/IMG-14.jpg?rlkey=xqk38evqjmya93dcdrwctsf7u&raw=1',
            'https://www.dropbox.com/scl/fi/r090st20jw5arucxlk4px/IMG-34.jpg?rlkey=3ch59042gck1y9qunj4ic4j96&raw=1',
            'https://www.dropbox.com/scl/fi/dnf8vehb7rokdswh0ux9s/IMG-48.jpg?rlkey=2l3hyi59sm89t6s5hp51xvrvi&raw=1',
        ],
        // Durham: images provided via Dropbox
        'durham' => [
            'https://www.dropbox.com/scl/fi/dc9atjt8rd3pin3f648hc/8-Section-MultiStation.jpg?rlkey=22vqm74lx6pgez24xf6t32nck&raw=1',
            'https://www.dropbox.com/scl/fi/ll3hf7q5ae7hj8ira9434/25m-Functional-Track-2.jpg?rlkey=oppe2pit4pouqh5m2f6vs5w85&raw=1',
            'https://www.dropbox.com/scl/fi/quahvezf56f39ofjw5lxz/Cardio-Funcional-Rig-Area.jpg?rlkey=sdrc370l253hldilmh3dy3k4c&raw=1',
            'https://www.dropbox.com/scl/fi/7vgj42v57vs67mt23wo44/Hardcore-Corner1.jpg?rlkey=no4rwbnkyuww20kbfcxeql2d4&raw=1',
            'https://www.dropbox.com/scl/fi/jhzucrz3vc6xeh1tp4wyc/Lifting-Platforms.jpg?rlkey=bkgk20wvhvk2lraj25yxldu5c&raw=1',
        ],
    ];

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
                'name' => 'Monthly Pass',
                'price' => 45,
                'period' => 'month',
                'features' => ['30 Days Access', 'All Equipment Access', 'Group Classes'],
                'popular' => false
            ],
            [
                'id' => 4,
                'name' => 'Monthly Direct Debit',
                'price' => 38.50,
                'period' => 'month',
                'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Group Classes', 'Best Value'],
                'popular' => true
            ],
            [
                'id' => 5,
                'name' => '3 Month Pass',
                'price' => 130,
                'period' => '3 months',
                'features' => ['3 Months Access', 'Payment in Full', 'All Equipment Access', 'Group Classes'],
                'popular' => false
            ],
            [
                'id' => 6,
                'name' => '6 Month Pass',
                'price' => 230,
                'period' => '6 months',
                'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Group Classes'],
                'popular' => false
            ],
            [
                'id' => 7,
                'name' => '12 Month Pass',
                'price' => 420,
                'period' => '12 months',
                'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Group Classes', 'Best Annual Value'],
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

        // Real UltraFlex locations data
        $locations = [
            [
                'id' => 1,
                'name' => 'ULTRAFLEX WEST LEEDS',
                'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
                'phone' => '0113 256 5107',
                'image' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
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
                'phone' => '0113 513 7669',
                // Updated processed hero image
                'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg',
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
                'image' => '/Images/newimages/Normanton/gym-in-normanton.webp',
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
                'phone' => '+44 1709 456 789',
                'image' => '/Images/newimages/Rotherham/gym-in-rotherham.webp',
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
                'phone' => '+44 1904 567 890',
                'image' => '/Images/newimages/York/gym-in-york.webp',
                'slug' => 'york',
                'hours' => [
                    'weekdays' => '05:00 - 22:00',
                    'weekends' => '08:00 - 20:00'
                ]
            ],
            [
                'id' => 6,
                'name' => 'ULTRAFLEX HULL',
                'address' => 'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN',
                'phone' => '01482 327874',
                // Updated processed hero image
                'image' => '/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.jpeg',
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
                'phone' => '+44 1913 789 012',
                // Updated processed hero image
                'image' => '/Images/original-787FADAA-6849-48F3-B005-6AD9FB2E74C4-min-min.jpeg',
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
                'image' => '/Images/processed-5AB78E5E-3190-4963-8AAF-9B3B527D73AD-min-min.jpeg',
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
                'address' => '3 Pioneer Way, Lincoln LN6 3DH',
                'phone' => '+44 1522 012 345',
                // Updated processed hero image (Oct 8 2025 change request)
                'image' => '/Images/processed-E72B606D-BB53-4CB2-90BA-4EB35AC99920.webp',
                'slug' => 'lincoln',
                'hours' => [
                    'weekdays' => '06:00 - 22:00',
                    'weekends' => '06:00 - 20:00'
                ]
            ],
            [
                'id' => 11,
                'name' => 'ULTRAFLEX WEST LONDON',
                'address' => 'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP',
                'phone' => '01895 436000',
                // Updated processed hero image (Oct 8 2025 change request)
                'image' => '/Images/processed-463489D0-F620-407E-BED0-4EB177EDCAC4 (1).webp',
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
            'west-leeds' => ['boxing' => true],
            'york' => ['boxing' => true],
            // Other locations currently have no dedicated boxing area
        ];

        // Helper to clean and augment membership plan feature lists
        $processPlans = function(array $plans, bool $hasBoxing) {
            return array_map(function($plan) use ($hasBoxing) {
                if (isset($plan['features']) && is_array($plan['features'])) {
                    // Remove any legacy martial arts strings (case-insensitive contains 'martial')
                    $plan['features'] = array_values(array_filter(array_map(function($f){
                        return preg_match('/martial/i', $f) ? null : $f;
                    }, $plan['features'])));
                    if ($hasBoxing) {
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
                    'email' => 'leeds@ultraflexgym.co.uk',
                    'image' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
                    'gallery' => isset(self::$externalImages['west-leeds']) ? self::$externalImages['west-leeds'] : [],
                    'slug' => 'west-leeds',
                    // West Leeds drone video tour (converted to embed format for proper iframe display)
                    'virtualTour' => 'https://www.youtube.com/embed/hvSoOHsIh28',
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
                        'bio' => 'As the Manager of Ultraflex West Leeds, I’m proud to lead the team at the very first Ultraflex gym established in the UK on 17th January 2017. Since opening our doors, West Leeds has built a strong reputation as a cornerstone of the Ultraflex community—known for our unbeatable atmosphere, elite equipment, and commitment to helping people at all levels of fitness achieve real results. My journey with Ultraflex has been driven by a passion for creating an environment where members feel empowered, supported, and motivated. Whether you\'re stepping into the gym for the first time or preparing for your next competition, we’re here to provide expert guidance, a welcoming community, and world-class facilities. I oversee day-to-day operations, member engagement, staff development, and community outreach, ensuring Ultraflex West Leeds continues to set the standard for excellence in fitness. I’m proud of our diverse membership base—from beginners to IFBB pros—and the culture of respect, discipline, and dedication that makes our gym more than just a place to train. Ultraflex West Leeds is where it all started—and under my management, we continue to innovate, grow, and lead the way for all the Ultraflex gyms across the UK.',
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
                        ],
                        [
                            'name' => 'Regen Physio',
                            'description' => 'Physiotherapy and rehabilitation clinic supporting injury recovery and performance.',
                            'icon' => null
                        ]
                    ],
                    'serviceLinks' => [
                        // Regen Physio (Physiotherapy)
                        [ 'label' => 'Regen Physio Website', 'url' => 'https://www.regenphysio.co.uk/', 'type' => 'website' ],
                        
                        // Ostas Boxing (Martial Arts)
                        [ 'label' => 'Ostas Boxing Instagram', 'url' => 'https://www.instagram.com/ostasboxing', 'type' => 'instagram' ],
                        [ 'label' => 'Ostas Boxing Instagram (Alt)', 'url' => 'https://www.instagram.com/ostasboxing', 'type' => 'instagram' ],
                        
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
                            'name' => 'Monthly Pass',
                            'price' => 47.50,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit (12 mth)',
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
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+-+Gym+in+Leeds/@53.8145635,-1.8008911,12z/data=!4m10!1m2!2m1!1sUltraFlex+Gym+west+Leeds!3m6!1s0x487be20054e5db95:0xb639aa48f8129fed!8m2!3d53.8145635!4d-1.6608154!15sChhVbHRyYUZsZXggR3ltIHdlc3QgTGVlZHNaGiIYdWx0cmFmbGV4IGd5bSB3ZXN0IGxlZWRzkgEDZ3ltmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ4a2NWVllXbGxaTVZaQ1lsZHNNMkp0VW5SVlZUbHhWRlJTTkZGV1JSQULgAQD6AQUIwwEQQg!16s%2Fg%2F11c319zc40?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'north-leeds':
                $locationData = [
                    'id' => 2,
                    'name' => 'ULTRAFLEX NORTH LEEDS',
                    'address' => 'Limewood Approach, Seacroft, Leeds LS14 1NH',
                    'phone' => '0113 513 7669',
                    'email' => 'northleeds@ultraflexgym.co.uk',
                    'image' => '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg',
                    'gallery' => isset(self::$externalImages['north-leeds']) ? self::$externalImages['north-leeds'] : [],
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
                        'bio' => 'Hello and welcome to UltraFlex North Leeds I’m Curtis and I cannot wait to welcome you through our doors. Now of course I am bias but when becoming a member at North Leeds you are joining the best gym in country, with a friendly face to welcome you on every visit and staff on hand all the time to make sure your experience with us is the best every time we really do ensure that all your sessions are amazing. Do not just take my word for it thought, come down, check us out and I know you’ll never need to look for another gym again.',
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
                            'name' => 'Monthly Pass',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 52.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 299.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 540.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Martial Arts Area', 'Group Classes', 'Best Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Ewan Hetherington',
                            'rating' => 5,
                            'comment' => 'I trained here for 6 months from Sept 2024-March 2025 and have been going to the gym since July 2021. This is easily the best gym I have ever trained at with the best equipment available for each body part. Can wait to get back training there when back at uni in September this year. Just seen new recovery place has been built which is sick. Only critique would be that sometimes the music is stupidly loud but it does help squeeze some extra reps.',
                            'date' => '5 months ago'
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
                            'name' => 'khudaja liton',
                            'rating' => 5,
                            'comment' => 'The best gym by far in Leeds, with the most amazing equipment. You are never waiting for a machine and if you are, you will be talking away to the friendly members (no matter how scary they actually look).',
                            'date' => '2 months ago'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Ali Mardomi',
                            'rating' => 5,
                            'comment' => "One of the best gyms I've ever had the privilege to train in 21 years experience. Super well equipped, with Hoist, Hammer Strength, Nautilus and other such high quality equipment. Awesome range of machines, lots of space, great parking spaces. Very friendly staff and management. If you're a serious athlete or serious about training, I'd highly recommend UltraFlex Gym North Leeds.",
                            'date' => '2 years ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Botond Molnar',
                            'rating' => 5,
                            'comment' => 'The ultimate gym experience you only see on the US bodybuilding videos. Machines that you have never seen before and the atmosphere is energetic and vibrant. Get your ass down and get to work.',
                            'date' => '4 months ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Kelly Ashton',
                            'rating' => 5,
                            'comment' => 'A phenomenal space with so much equipment to choose from. Every area has been well thought out down to the smallest detail, the place is next level! Sun beds, saunas, ice baths and The Savvy Baker offering up protein-fuelled brownies and smoothies – it is well worth a visit.',
                            'date' => '2 years ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 53.8371,
                        'lng' => -1.4909
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+Gym+North+Leeds/@53.8310007,-1.4685853,17z/data=!3m1!4b1!4m6!3m5!1s0x48795bdf67a4199d:0x161674f7e205d7b2!8m2!3d53.8309976!4d-1.4660104!16s%2Fg%2F11kbymfhg8?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'normanton':
                $locationData = [
                    // Add gallery field for Normanton
                    'gallery' => isset(self::$externalImages['normanton']) ? self::$externalImages['normanton'] : [],
                    'id' => 3,
                    'name' => 'ULTRAFLEX NORMANTON',
                    'address' => 'Ripley Dr, Normanton WF6 1QT',
                    'phone' => '01924 895794',
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
                            'description' => 'Professional hair services available at UltraFlex Normanton.',
                            'icon' => null
                        ],
                    ],
                    'serviceLinks' => [
                        ['label' => 'AmyClark Hair Instagram', 'url' => 'https://www.instagram.com/amyclark_hair', 'type' => 'external'],
                        // Booking platform link: update to the exact profile URL if provided
                        ['label' => 'Book Appointments (Booksy)', 'url' => 'https://booksy.com', 'type' => 'external'],
                    ],
                    'membershipPlans' => [
                        [
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 27.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'Standard Equipment', 'All Facilities', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 52.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'Standard Equipment', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Min 12 Month Commitment', 'Standard Equipment', 'All Facilities', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 269.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'Standard Equipment', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 6,
                            'name' => '12 Month Pass',
                            'price' => 465.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'Standard Equipment', 'All Facilities', 'Best Annual Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => 'GOLD Weekly Pass',
                            'price' => 32.50,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'Premium Equipment', 'Priority Access', 'Personal Training Discounts'],
                            'popular' => false
                        ],
                        [
                            'id' => 9,
                            'name' => 'GOLD Monthly Rolling Pass',
                            'price' => 59.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling', 'Premium Equipment', 'Priority Access', 'Exclusive Classes', 'Personal Training Discounts'],
                            'popular' => false
                        ],
                        [
                            'id' => 10,
                            'name' => 'GOLD Monthly Direct Debit',
                            'price' => 53.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling Contract', 'Premium Equipment', 'Priority Access', 'Exclusive Classes', 'Best GOLD Value'],
                            'popular' => false
                        ],
                        [
                            'id' => 11,
                            'name' => 'GOLD 6 Month Pass',
                            'price' => 324.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'Premium Equipment', 'Priority Access', 'All GOLD Benefits'],
                            'popular' => false
                        ],
                        [
                            'id' => 12,
                            'name' => 'GOLD 12 Month Pass',
                            'price' => 519.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'Premium Equipment', 'Priority Access', 'Best GOLD Annual Value'],
                            'popular' => false
                        ],
                    ],
                    'reviews' => [
                        [
                            'id' => 1,
                            'name' => 'Alex Bard',
                            'rating' => 5,
                            'comment' => "If you're looking for a gym that has it all, UltraFlex Gym in Normanton is the place to be! The atmosphere is amazing, with a strong community vibe that makes working out enjoyable. The staff are incredibly friendly, always ready to help and make you feel welcome. The gym is packed with high-quality equipment for both weight training and cardio. The sauna is a great addition, perfect for unwinding after a tough session. Clean, well-maintained, and spacious – this gym truly stands out. Highly recommend it to anyone serious about their fitness journey!",
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
                            'id' => 3,
                            'name' => 'L',
                            'rating' => 5,
                            'comment' => 'Great gym, fab equipment – a little pricey but overall good.',
                            'date' => '6 months ago'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Antony Sykes',
                            'rating' => 5,
                            'comment' => 'Superb gym with top quality equipment and lots of it so no need to wait around. Would be even better if they fitted a water cooler',
                            'date' => '5 months ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Kieran Broughan',
                            'rating' => 5,
                            'comment' => 'Possibly the best gym i have been in, the equipment & machines are like state of the art! Hat off to Charlie.',
                            'date' => 'Edited 2 years ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Warren Ackroyd',
                            'rating' => 5,
                            'comment' => 'Love this Gym. Staff are amazing. The gym is always clean. Music is excellent for working out to. Showers are clean & brilliant. Clientele in the gym is all helpful too. Everyone loves working out & this shows, vibe is amazing.',
                            'date' => '2 years ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 53.7085,
                        'lng' => -1.4168
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+Normanton/@53.7018856,-1.4042812,17z/data=!3m1!4b1!4m6!3m5!1s0x48795da40af09e07:0x586579d496b76ed3!8m2!3d53.7018825!4d-1.4017063!16s%2Fg%2F11fdkx44lv?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'rotherham':
                $locationData = [
                    // Add gallery field for Rotherham
                    'gallery' => isset(self::$externalImages['rotherham']) ? self::$externalImages['rotherham'] : [],
                    'id' => 4,
                    'name' => 'ULTRAFLEX ROTHERHAM',
                    'address' => '175 Effingham St, Rotherham S65 1BL',
                    'phone' => '0170 937 7311',
                    'email' => 'rotherham@ultraflexgym.co.uk',
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
                        'bio' => 'Hi all, I’m Morgan the manager at Ultraflex Rotherham and I take great pride in the continuation of building and progressing our reputation that we have earned for being one of the best training facilities around, I’m passionate that I am able to contribute to this gym that many members find as a second home, and creating a space where you are all able to fit right into the community. I work closely with our staff team in ensuring that our gym is accommodating for all, and standards are pushed and maintained to exceed expectations across all aspects. Fitness and training has always played a key role for me personally, and speaking from experience 6 years ago I was drawn into what Ultraflex Rotherham had to offer to me as a member, and I soon realised that it was the best around, for what started as a personal fitness journey I soon realised that I wanted to be in a position where I could grow both physically and mentally, which years later has led me to be in the position where I feel proud to be able to manage this world renowned facility and how important it is to be able to create an environment that supports our members individual journeys. Throughout my duration of being a part of Ultraflex Rotherham, whether that being member or manager it has been amazing to witness just how Ultraflex has evolved and the impact it has on the people that spend their time here. I’m excited to see what else lies ahead and hopefully we’ll see you down here.',
                        'image' => '/Images/managers/morgan.jpg',
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
                            'name' => 'Monthly Pass',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'All Facilities', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit (12 mth)',
                            'price' => 50.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Contract', 'All Equipment Access', 'All Facilities', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 5,
                            'name' => '6 Month Pass',
                            'price' => 285.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'All Facilities', 'Group Classes'],
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
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+-+Gym+in+Rotherham/@53.4380464,-1.3554535,17z/data=!3m1!4b1!4m6!3m5!1s0x48797709d1450b65:0x25be57d0fbe940e3!8m2!3d53.4380432!4d-1.3528786!16s%2Fg%2F11gp35wlzk?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'york':
                $locationData = [
                    // Add gallery field for York
                    'gallery' => isset(self::$externalImages['york']) ? self::$externalImages['york'] : [],
                    'id' => 5,
                    'name' => 'ULTRAFLEX YORK',
                    'address' => '10 Layerthorpe, York YO31 7YW',
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
                        'saturday' => '08:00 – 20:00',
                        'sunday' => '08:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Jason',
                        'bio' => 'I am the general manager at UltraFlex Gym York. I\'ve been running the York UltraFlex for two years now and in that time I\'ve seen so much re-investment into the gym and the facilities here which makes my job infinitely easier. In total over two years, we have added over a dozen new items of top-quality kit from cardio equipment to strength training to an entire new area dedicated to Boxing. I\'ve never worked in a business that consistently re-invests like UltraFlex and it reflects with the loyalty and community that our members feel here. We have some of the best PTs in the business and as an ex-Fighter I train with our Thai Boxing Coach as well as our PT who was England NABBA Winner & UK NABBA Winner. I personally could not imagine training anywhere else now that I’ve been exposed to UltraFlex gyms. We are always active on our socials and respond to DMs straight away as well as encouraging members to tag us in their workouts or comps. We regularly host Open Days and Member Giveaways as well as charity events and member socials which are great meet and greets for the members and staff. Any information you need you can email us on york@ultraflexgym.co.uk or drop us a message on any of our socials.',
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
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 27.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'City Centre Location', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 55.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Knowledgeable Staff', 'Something for Everyone'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit (12 mth)',
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
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Fitness Goal Support'],
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
                            'name' => 'Paul Riley',
                            'rating' => 5,
                            'comment' => "This is definitely not an economy option - £9.25 for a day pass - but this has to be one of the best equipped gyms I've ever been to, so it was well worth it. The range of machines and equipment they have is emense and its modern, well maintained and clean. Even the dumbells are racked in the right order. The place was busy, but there were still no waits for machines.",
                            'date' => '2 years ago'
                        ],
                        [
                            'id' => 3,
                            'name' => 'Lily Pearson',
                            'rating' => 5,
                            'comment' => "Tried many gyms across York however this is by far the best🙌 great atmosphere and every piece of equipment you could ever need 🤌🏼 …",
                            'date' => 'a month ago'
                        ],
                        [
                            'id' => 4,
                            'name' => 'Reening Lau',
                            'rating' => 5,
                            'comment' => "Came down for a visit since I would be leaving York after finishing university and was quite impressed with the facilities here. It's basically a powerlifter/weightlifter's heaven. Barbells are from Rogue Fitness and are pretty good and there are an assortment of machines to target each specific body part. It wasn't too crowded when I visited but I should say this gym gets a lot of traffic during the weekdays. Cardio stuff is upstairs but who uses them anyways? Membership is a little bit more expensive as compared to Swift Fitness but you get what you pay for: more squat racks and dedicated spaces for lifting massive weights. If I was a working adult, this would be my go to gym.",
                            'date' => '6 years ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Jonathan Elliott',
                            'rating' => 5,
                            'comment' => "Excellent gym, has made my student experience in York worthwhile! Absolutely love this gym and the people with it. Jason and the team do an amazing job making me feel welcome, and even gave me a discount when it was my birthday for some of their clothing! Couldn't recommend more.\n\nJonny",
                            'date' => 'Edited 8 months ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Alex Bard',
                            'rating' => 5,
                            'comment' => "UltraFlex is an amazing place to workout and the staff is super helpful, encouraging, and friendly. They know how to push you to the limit in the best way possible with your workouts. This gym has the best energy, staff, and feel. Everything is so clean , you will not leave disappointed! Such a family vibe as soon as you walk in the doors – I highly recommend checking this gym out.",
                            'date' => '4 years ago'
                        ],
                    ],
                    'coordinates' => [
                        'lat' => 54.0059,
                        'lng' => -1.0810
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+-+Gym+in+York/@53.9620338,-1.0749673,17z/data=!3m1!4b1!4m6!3m5!1s0x487931d9a664f0c1:0xa5b0aa55abc8b897!8m2!3d53.9620307!4d-1.0723924!16s%2Fg%2F11h7fzf0w2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'hull':
                $locationData = [
                    // Add gallery field for Hull
                    'gallery' => isset(self::$externalImages['hull']) ? self::$externalImages['hull'] : [],
                    'id' => 6,
                    'name' => 'ULTRAFLEX HULL',
                    'address' => 'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN',
                    'phone' => '01482 327874',
                    'email' => 'hull@ultraflexgym.co.uk',
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
                        'bio' => 'Welcome to Ultraflex Gym Hull, the ultimate training facility for those serious about fitness. My name is Tronn (yes, it’s a strange name, yes, it is my real name!) and I’ve been the manager of this incredible facility for over 3 years now. Whether you\'re a competitive athlete, aspiring bodybuilder, or just beginning your fitness journey, Ultraflex Hull is designed to help you push boundaries and achieve real results. Our state-of-the-art gym is packed with industry-leading equipment, an intense training atmosphere, and a community that thrives on hard work and dedication. We offer a full range of strength and conditioning machines, free weights, cardio equipment, and specialist areas for functional and combat training. At Ultraflex, every detail is designed to support performance, progress, and passion. This isn’t just a place to work out – it’s where you transform both body and mind. Our expert team of personal trainers, coaches, and athletes are on hand to guide, motivate, and challenge you. Whether your goals are to build muscle, lose fat, increase endurance, or simply become the best version of yourself, you’ll find the tools and support here to make it happen. Located in the heart of Hull with ample parking and flexible memberships, Ultraflex Gym is open seven days a week to fit around your lifestyle. We also host regular seminars, competitions, and events to keep your training fresh and focused.',
                        'image' => '/Images/Hull Gym Manager.webp',
                        'experience' => ''
                    ],
                    'features' => [
                        'Industry-Leading Equipment',
                        'Functional & Combat Training Areas',
                        'Strength & Conditioning Machines',
                        'Free Weights & Cardio Zones',
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
                            'name' => 'Monthly Pass',
                            'price' => 45.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Rolling Direct Debit',
                            'price' => 47.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => '12 Month Direct Debit',
                            'price' => 41.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Contract', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 230.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 450.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Annual Value'],
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
                            'comment' => 'THIS, IS, ULTRAFLEX!! We visited UltraFlex Hull for the third time today completing two sessions - legs before lunch, and then upper body in the afternoon. We were blown away when we visited the gym last month, and we couldn\'t wait to return. The gym is modern, filled with high-end equipment, and has a great clientele. The staff are friendly, approachable, and really helpful. The only thing stopping us getting a monthly membership is logistics, or we would definitely be signing on the dotted line. See you again soon.',
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
                            'id' => 4,
                            'name' => 'Jordan Fawcett',
                            'rating' => 5,
                            'comment' => 'Really good gym, only draw back is the lockers need updating, they\'re pretty small and some are damaged but overall the variety and quality of equipment and facilities is top notch.',
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
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+Hull/@53.7370945,-0.3793473,17z/data=!3m1!4b1!4m6!3m5!1s0x4878bf4224c223bf:0xdf1edfef5956e5db!8m2!3d53.7370945!4d-0.3793473!16s%2Fg%2F11h_46zghn?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'durham':
                $locationData = [
                    // Add gallery field for Durham
                    'gallery' => isset(self::$externalImages['durham']) ? self::$externalImages['durham'] : [],
                    'id' => 7,
                    'name' => 'ULTRAFLEX DURHAM',
                    'address' => 'Mandale Business Park, Unit 28D, Kent House, Durham DH1 1TH',
                    'phone' => '0191 3898321',
                    'email' => 'durham@ultraflexgym.co.uk',
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
                        ['name' => 'Baxters Barbers', 'description' => 'On-site barber services for members.'],
                        ['name' => 'Regen Physio', 'description' => 'Physiotherapy and rehabilitation support.']
                    ],
                    'serviceLinks' => [
                        ['label' => 'Baxters Barbers Instagram', 'url' => 'https://www.instagram.com/Baxters_barbers', 'type' => 'external'],
                        ['label' => 'Regen Physio Instagram', 'url' => 'https://www.instagram.com/George_regendurham', 'type' => 'external']
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
                            'name' => 'Monthly Pass',
                            'price' => 54.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Cardio Area'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit (12mth)',
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
                            'comment' => 'Ultraflex Durham is an excellent gym and easily one of the best in the area. The whole place is spotless, with equipment that is well-maintained and laid out so everything is easy to access. The atmosphere is welcoming from the moment you walk in. Tracey on the front desk deserves a special mention - she was incredibly helpful, friendly, and had an amazing attitude that set the tone for the whole visit. Her approach made the experience even better. Overall, Ultraflex Durham is a top-quality gym that is a pleasure to train in. Me and a friend both got a day pass and could not recommend it enough.',
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
                            'id' => 4,
                            'name' => 'Anthony North East',
                            'rating' => 5,
                            'comment' => 'It is insanely expensive for a gym but that is reflected in the machines: Hammer Strength, Cybex, Atlantis, Nautilus - all the best machines and loads to choose from. It is also nice that they open on Christmas and let anyone train for free for a few hours on Christmas.',
                            'date' => '1 week ago'
                        ],
                        [
                            'id' => 5,
                            'name' => 'Charlie Cook',
                            'rating' => 5,
                            'comment' => 'UltraFlex is by far the best gym in the North East. They have got all of the equipment you need for a serious workout, the rules on reracking weights are enforced so you are not chasing down missing dumbbells and the staff are all quality people.',
                            'date' => '1 month ago'
                        ],
                        [
                            'id' => 6,
                            'name' => 'Ewan Hetherington',
                            'rating' => 5,
                            'comment' => 'I trained here for 6 months from Sept 2024 to March 2025 and have been going to the gym since July 2021. This is easily the best gym I have ever trained at with the best equipment available for each body part. Can\'t wait to get back training there when back at uni in September this year. Just seen a new recovery place has been built which is sick. Only critique would be that sometimes the music is stupidly loud but it does help squeeze some extra reps.',
                            'date' => '5 months ago'
                        ],
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+-+Gym+in+Durham/@54.7885757,-1.5341394,17z/data=!3m1!4b1!4m6!3m5!1s0x487e7ddf0af67a83:0xc2c9d1ae77103247!8m2!3d54.7885757!4d-1.5341394!16s%2Fg%2F11fs7zcll9?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            case 'derby':
                $locationData = [
                    // Add gallery field for Derby
                    'gallery' => isset(self::$externalImages['derby']) ? self::$externalImages['derby'] : [],
                    'id' => 8,
                    'name' => 'ULTRAFLEX DERBY',
                    'address' => 'Chequers Rd, Derby DE21 6EN',
                    'phone' => '07395616771',
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
                        'saturday' => '07:00 – 20:00',
                        'sunday' => '07:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Ian',
                        'bio' => 'Welcome to Ultraflex Derby. With over 200 pieces of the best gym machinery from several different brands, a full sized boxing ring, and powerlifting cage, located in a 20k sq ft facility, you are entering the best equipped gym in the Midlands. Here we bring the best training experience for everyone, an amazing team to support you and provide the perfect environment no matter what you’re training for. Tired of messy gyms? Here we work hard to provide you with the cleanest facility, no more looking for weights or attachments, all weights are kept in order, and leaving weights out isn’t tolerated. Looking for more than just a gym? Come sit down and relax in one of our 3 saunas, enjoy a shake with a brownie after a hard workout (healthier options available). For those braver souls out there, we also have ice baths available to help with your recovery. On site we also have an Osteopath, Sports Massage and Therapy, and blood testing available. All this in one place! If you ever need anything come see us. If you would like to enquire or ever need to reach me, please contact me on derby@ultraflexgym.co.uk.',
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
                            'id' => 2,
                            'name' => 'Weekly Pass',
                            'price' => 29.00,
                            'period' => 'week',
                            'features' => ['7 Days Access', 'All Equipment Access', 'Cardio Area', 'Free Parking'],
                            'popular' => false
                        ],
                        [
                            'id' => 3,
                            'name' => 'Monthly Pass',
                            'price' => 62.00,
                            'period' => 'month',
                            'features' => ['30 Days Access', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Rolling',
                            'price' => 56.00,
                            'period' => 'month',
                            'features' => ['Monthly Rolling', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => 'Monthly Direct Debit',
                            'price' => 54.00,
                            'period' => 'month',
                            'features' => ['Monthly Direct Debit', '12 Month Commitment', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Value'],
                            'popular' => true
                        ],
                        [
                            'id' => 6,
                            'name' => '6 Month Pass',
                            'price' => 315.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes'],
                            'popular' => false
                        ],
                        [
                            'id' => 7,
                            'name' => '12 Month Pass',
                            'price' => 570.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Cardio Area', 'Group Classes', 'Best Annual Value'],
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
                            'name' => 'Students and Blue Light - Direct Debit',
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
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+Derby/@52.9209207,-1.4514623,17z/data=!3m1!4b1!4m6!3m5!1s0x4879f1ba94609079:0x22c967098ab40dcd!8m2!3d52.9209175!4d-1.4488874!16s%2Fg%2F11vb8bxxlh?coh=277535&entry=tts&g_ep=EgoyMDI1MTIwOS4wIPu8ASoKLDEwMDc5MjA3M0gBUAM%3D&skid=00b71a2c-ba9f-4c14-8f06-71774134c920'
                ];
                break;

            case 'athens-greece':
                $locationData = [
                    // Add gallery field for Athens
                    'gallery' => isset(self::$externalImages['athens-greece']) ? self::$externalImages['athens-greece'] : [],
                    'id' => 9,
                    'name' => 'ULTRAFLEX ATHENS (GREECE)',
                    'address' => 'Ethnarchou Makariou 16, Peristeri 121 32, Greece',
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
                    'manager' => null,
                    'membershipPlans' => [],
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
                    // Add gallery field for Lincoln
                    'gallery' => isset(self::$externalImages['lincoln']) ? self::$externalImages['lincoln'] : [],
                    'id' => 10,
                    'name' => 'ULTRAFLEX LINCOLN',
                    'address' => '3 Pioneer Way, Lincoln LN6 3DH',
                    'phone' => '+44 1522 012 345',
                    'email' => 'lincoln@ultraflexgym.co.uk',
                    // Updated primary image for Lincoln location (replaced per user request Oct 8 2025)
                    'image' => '/Images/processed-E72B606D-BB53-4CB2-90BA-4EB35AC99920.webp',
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
                        'monday' => '06:00 – 22:00',
                        'tuesday' => '06:00 – 22:00',
                        'wednesday' => '06:00 – 22:00',
                        'thursday' => '06:00 – 22:00',
                        'friday' => '06:00 – 22:00',
                        'saturday' => '06:00 – 20:00',
                        'sunday' => '06:00 – 20:00'
                    ],
                    'manager' => [
                        'name' => 'Lynsey Hind',
                        'bio' => "I’m proud to be the Gym Manager here at Ultraflex – the friendliest, most motivating place to train!\nFrom the moment you walk through the doors, you’re part of the family. Our amazing team is always ready with a smile, a helping hand, and encouragement to keep you progressing toward your goals.\nWe’ve built an environment where everyone works together – no egos, just great vibes, hard work, and a shared love for health & fitness. Whether you’re lifting big, starting your journey, or just here for a feel-good session, you’ll always feel welcome.\nOutside of the gym, I’m a proud mum to Ava-Lily, my eight-year-old daughter who has a real need for speed. Most weekends you’ll find us at the track, where she’s racing her go-kart with the same determination and focus we value so much in the gym.\nFor me, both work and home life are about dedication, community, and enjoying the journey – and that’s exactly what we aim to bring to every member’s experience at Ultraflex.\nIt’s all about community, support, and results – and we can’t wait to welcome you in.",
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
                            'features' => ['Monthly Rolling', '24/7 Access', 'Train Anytime', 'First 24hr UltraFlex', 'Complete Flexibility'],
                            'popular' => true
                        ],
                        [
                            'id' => 3,
                            'name' => '12 Month Direct Debit',
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
                            'features' => ['12 Month Contract', '24/7 Access', 'Train Anytime', 'First 24hr UltraFlex', 'Complete Flexibility'],
                            'popular' => false
                        ],
                        [
                            'id' => 5,
                            'name' => '12 Month Pass - Paid in Full',
                            'price' => 530.00,
                            'period' => '12 months',
                            'features' => ['12 Months Access', 'Payment in Full', 'All Equipment Access', 'Best Annual Value', 'No Monthly Payments'],
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
                            'features' => ['6 Months Access', 'Payment in Full', 'All Equipment Access', 'No Monthly Payments', 'Flexible Option'],
                            'popular' => false
                        ],
                        [
                            'id' => 8,
                            'name' => '6 Month 24hr Pass - Paid in Full',
                            'price' => 300.00,
                            'period' => '6 months',
                            'features' => ['6 Months Access', 'Payment in Full', '24/7 Access', 'No Monthly Payments', 'Flexible Option'],
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
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'All Equipment Access'],
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
                            'features' => ['Student Discount', 'Valid Student ID Required', 'Payment in Full', 'All Equipment Access'],
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
                    ],
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+Lincoln/@53.2010099,-0.5950846,17z/data=!3m1!4b1!4m6!3m5!1s0x4878453a2df04e4d:0x2e4b6b6facf2e70d!8m2!3d53.2010068!4d-0.5902137!16s%2Fg%2F11wg7fn_1m?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;

            case 'west-london':
                $locationData = [
                    // Add gallery field for West London
                    'gallery' => isset(self::$externalImages['west-london']) ? self::$externalImages['west-london'] : [],
                    'id' => 11,
                    'name' => 'ULTRAFLEX WEST LONDON',
                    'address' => 'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP',
                    'phone' => '01895 436000',
                    'email' => 'westlondon@ultraflexgym.co.uk',
                    // Updated primary image for West London location (replaced per user request Oct 8 2025)
                    'image' => '/Images/processed-463489D0-F620-407E-BED0-4EB177EDCAC4 (1).webp',
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
                        'bio' => 'I’ve been part of this gym for almost three years, starting on front of house before stepping into the role of General Manager when we became Ultraflex West London. During that time, I’ve had the chance to get to know our members and experience first-hand what makes this place so special. For me, it’s never been just a gym—it’s a community and a second home. This gym has also played a huge role in my personal journey. After being diagnosed with cancer last year, the support I received from members and staff was a lifeline. That experience made me even more determined to give back and to work as hard as I can to create the best possible environment for everyone who walks through the doors. My role is about more than just running the site. I care deeply about supporting our staff, maintaining high standards, and making sure our members feel welcome, motivated, and valued. I like to lead by example—whether that’s being on the gym floor, putting weights away, or simply having a chat with members—because the little things matter. Ultraflex West London is a place I care deeply about, and I’ll always work hard to make sure it remains somewhere both staff and members can enjoy, feel valued, and be proud to be part of.',
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
                            'features' => ['No Contract', 'Monthly Rolling', 'All Equipment Access', 'Maximum Flexibility', 'Central London Location'],
                            'popular' => true
                        ],
                        [
                            'id' => 4,
                            'name' => 'Monthly Direct Debit',
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
                    'mapUrl' => 'https://www.google.com/maps/place/UltraFlex+-+Gym+in+West+London/@51.5199897,-0.4833574,17z/data=!3m1!4b1!4m6!3m5!1s0x48766e049076b79b:0x50c88ea22ee842ae!8m2!3d51.5199864!4d-0.4807825!16s%2Fg%2F1tj88y5l?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                ];
                break;
                
            default:
                // Default to West Leeds data for other locations
                $locationData = [
                    'id' => 1,
                    'name' => 'ULTRAFLEX WEST LEEDS',
                    'address' => 'Cape Mills, Coal Hill Ln, Leeds LS28 5NA',
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
            $locationData['membershipPlans'] = $processPlans($locationData['membershipPlans'], $hasBoxing);
        }

        // Common data for all locations
        $commonData = [
            'signupUrl' => 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2',
            'equipment' => [
                ['name' => 'Top-Quality Fitness Machines', 'icon' => 'dumbbell', 'available' => true],
                ['name' => 'Cardio Equipment', 'icon' => 'waves', 'available' => true],
                // Conditionally add Boxing Area (filter out null later)
                $hasBoxing ? ['name' => 'Boxing Area', 'icon' => 'users', 'available' => true] : null,
                ['name' => 'Physiotherapy Clinic', 'icon' => 'users', 'available' => true],
                ['name' => 'Comfortable Changing Rooms', 'icon' => 'shower', 'available' => true],
                ['name' => 'Free On-Site Parking', 'icon' => 'car', 'available' => true],
                ['name' => 'Easy Public Transport Access', 'icon' => 'users', 'available' => true],
                ['name' => 'WiFi', 'icon' => 'wifi', 'available' => true],
            ],
            'amenities' => [
                'Top-quality equipment from best brand names',
                'Comfortable changing rooms',
                $hasBoxing ? 'Boxing area' : null,
                'Physiotherapy clinic',
                'Free on-site parking',
                'Easy public transport access'
            ],
            // New placeholder structured fields (can be overridden per location case)
            'features' => [], // e.g. ['24/7 Access', 'Competition Grade Equipment']
            'services' => [], // e.g. [['name' => 'Physiotherapy', 'description' => 'On-site rehab specialists']]
            'serviceLinks' => [], // e.g. [['label' => 'Book PT Session', 'url' => '/services/personal-training']]
            // Use dynamic trainers only; no placeholders to avoid duplication
            'trainers' => [],
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

        return Inertia::render('Locations/Show', [
            'location' => $locationData,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}