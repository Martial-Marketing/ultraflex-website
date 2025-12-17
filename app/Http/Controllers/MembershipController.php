<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MembershipController extends Controller
{
    /**
     * Display membership plans across locations with a location selector.
     * NOTE: This is a lightweight extraction of plan data; for full DRYness,
     * consider refactoring shared plan definitions to config or a service.
     */
    public function index()
    {
        $locations = [
            'west-leeds' => [
                'id' => 1,
                'name' => 'ULTRAFLEX WEST LEEDS',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12,'period'=>'day','features'=>['Single Day Access','Top-Quality Equipment','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>22.50,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>45,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>38.50,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','All Equipment Access','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'3 Month Pass','price'=>130,'period'=>'3 months','features'=>['3 Months Access','Payment in Full','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>6,'name'=>'6 Month Pass','price'=>230,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>7,'name'=>'12 Month Pass','price'=>420,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','All Equipment Access','Group Classes','Best Annual Value'],'popular'=>false],
                    ['id'=>8,'name'=>'Student Monthly Rolling','price'=>40,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access','Boxing Area'],'popular'=>false],
                ],
            ],
            'north-leeds' => [
                'id' => 2,
                'name' => 'ULTRAFLEX NORTH LEEDS',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12.50,'period'=>'day','features'=>['Single Day Access','Top-Quality Equipment','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>25.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>52.50,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>48.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','All Equipment Access','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>280.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>505.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','All Equipment Access','Group Classes','Best Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'Student Monthly Rolling','price'=>45.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
            'normanton' => [
                'id' => 3,
                'name' => 'ULTRAFLEX NORMANTON',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12.50,'period'=>'day','features'=>['Single Day Access','Standard Equipment','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>25.00,'period'=>'week','features'=>['7 Days Access','Standard Equipment','All Facilities','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>48.50,'period'=>'month','features'=>['30 Days Access','Standard Equipment','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>44.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','Standard Equipment','All Facilities','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>250.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','Standard Equipment','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>435.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','Standard Equipment','All Facilities','Best Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'GOLD Day Pass','price'=>15.00,'period'=>'day','features'=>['Single Day Access','Premium Equipment','Priority Access','Free Parking','Towel Service'],'popular'=>false],
                    ['id'=>8,'name'=>'GOLD Weekly Pass','price'=>30.00,'period'=>'week','features'=>['7 Days Access','Premium Equipment','Priority Access','Personal Training Discounts'],'popular'=>false],
                    ['id'=>9,'name'=>'GOLD Monthly Rolling Pass','price'=>54.50,'period'=>'month','features'=>['Monthly Rolling','Premium Equipment','Priority Access','Exclusive Classes','Personal Training Discounts'],'popular'=>false],
                    ['id'=>10,'name'=>'GOLD Monthly Direct Debit','price'=>49.50,'period'=>'month','features'=>['Monthly Rolling Contract','Premium Equipment','Priority Access','Exclusive Classes','Best GOLD Value'],'popular'=>false],
                ],
            ],
            'rotherham' => [
                'id' => 4,
                'name' => 'ULTRAFLEX ROTHERHAM',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>16.00,'period'=>'day','features'=>['Single Day Access','All Equipment Access','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>23.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','All Facilities','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>50.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>45.00,'period'=>'month','features'=>['Monthly Rolling Contract','12 Month Contract','All Equipment Access','All Facilities','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>46.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
            'york' => [
                'id' => 5,
                'name' => 'ULTRAFLEX YORK',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12.00,'period'=>'day','features'=>['Single Day Access','Versatile Equipment','100kg Dumbbells to Yoga Mats','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>25.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','City Centre Location','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>52.50,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Knowledgeable Staff','Something for Everyone'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>47.50,'period'=>'month','features'=>['Monthly Rolling Contract','12 Month Contract','All Equipment Access','Expert Staff Support','Best Value','Boxing Area'],'popular'=>true],
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>46.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access','Boxing Area'],'popular'=>false],
                ],
            ],
            'hull' => [
                'id' => 6,
                'name' => 'ULTRAFLEX HULL',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12.50,'period'=>'day','features'=>['Single Day Access','Top-Quality Equipment','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>26.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Cardio Area','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>53.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>48.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','All Equipment Access','Cardio Area','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>47.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
            'durham' => [
                'id' => 7,
                'name' => 'ULTRAFLEX DURHAM',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>11.50,'period'=>'day','features'=>['Single Day Access','Top-Quality Equipment','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>24.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Cardio Area','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>50.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>45.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','All Equipment Access','Cardio Area','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>45.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
            'derby' => [
                'id' => 8,
                'name' => 'ULTRAFLEX DERBY',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12.00,'period'=>'day','features'=>['Single Day Access','Top-Quality Equipment','Changing Rooms','Free Parking'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>25.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Cardio Area','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>52.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>47.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','All Equipment Access','Cardio Area','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>47.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
            'athens-greece' => [
                'id' => 9,
                'name' => 'ULTRAFLEX ATHENS (GREECE)',
                'plans' => [
                    ['id'=>1,'name'=>'Pre-Launch Registration','price'=>0,'period'=>'registration','features'=>['Early Access Registration','Opening Day Notifications','Special Launch Offers','VIP Opening Event Invite'],'popular'=>true],
                    ['id'=>2,'name'=>'Founding Member (Day Pass)','price'=>15,'period'=>'day','features'=>['Coming Soon','Founding Member Benefits','Premium Equipment Access','Mediterranean Fitness Experience'],'popular'=>false],
                    ['id'=>3,'name'=>'Founding Member (Monthly)','price'=>65,'period'=>'month','features'=>['Coming Soon','Founding Member Discount','All Equipment Access','International UltraFlex Standards'],'popular'=>false],
                ],
            ],
            'lincoln' => [
                'id' => 10,
                'name' => 'ULTRAFLEX LINCOLN',
                'plans' => [
                    ['id'=>1,'name'=>'12 Month Day Access - Monthly Direct Debit','price'=>49.99,'period'=>'month','features'=>['12 Month Contract','Day Access Only','Mon-Fri: 06:00-22:00','Sat-Sun: 06:00-20:00','State-of-the-art Equipment'],'popular'=>false],
                    ['id'=>2,'name'=>'12 Month 24hr Access - Monthly Direct Debit','price'=>54.99,'period'=>'month','features'=>['12 Month Contract','24/7 Access','Train Anytime','First 24hr UltraFlex','Complete Flexibility'],'popular'=>true],
                    // General paid-in-full options
                    ['id'=>3,'name'=>'12 Month Pass - Paid in Full','price'=>530.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','All Equipment Access','Best Annual Value','No Monthly Payments'],'popular'=>false],
                    ['id'=>4,'name'=>'6 Month Pass - Paid in Full','price'=>295.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','No Monthly Payments','Flexible Option'],'popular'=>false],

                    // Existing student monthly (to be replaced on go-live)
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>49.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','Day Access Only'],'popular'=>false,'live_until'=>'2025-12-01 00:00:00'],

                    // New Student plans (go-live January 19th 2026)
                    ['id'=>101,'name'=>'Student Monthly Rolling','price'=>48.60,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','Day Access Only'],'popular'=>false],
                    ['id'=>102,'name'=>'Student Monthly Rolling 24hr','price'=>58.50,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','24/7 Access'],'popular'=>true],
                    ['id'=>103,'name'=>'Student 6 Month Pass - Paid in Full','price'=>265.50,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full','All Equipment Access'],'popular'=>false],
                    ['id'=>104,'name'=>'Student 6 Month Pass - Paid in Full 24hr','price'=>319.50,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full','24/7 Access'],'popular'=>false],
                    ['id'=>105,'name'=>'Student 12 Month Pass - Paid in Full','price'=>477.00,'period'=>'12 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full','All Equipment Access'],'popular'=>false],
                    ['id'=>106,'name'=>'Student 12 Month Pass - Paid in Full 24hr','price'=>531.00,'period'=>'12 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full','24/7 Access'],'popular'=>false],
                ],
            ],
            'west-london' => [
                'id' => 11,
                'name' => 'ULTRAFLEX WEST LONDON',
                'plans' => [
                    ['id'=>1,'name'=>'Day Pass','price'=>12.50,'period'=>'day','features'=>['Single Day Access','All Equipment Access','Westfield Location','Extended Hours'],'popular'=>false],
                    ['id'=>2,'name'=>'Weekly Pass','price'=>27.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Premium London Location','Early Opening 05:30'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Rolling','price'=>45.00,'period'=>'month','features'=>['No Contract','Monthly Rolling','All Equipment Access','Maximum Flexibility','Central London Location'],'popular'=>true],
                    ['id'=>4,'name'=>'6 Month Pass','price'=>245.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','Best Value Option','£40.83 per month equivalent'],'popular'=>false],
                    ['id'=>5,'name'=>'Student Monthly Rolling','price'=>43.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
        ];

        // Filter out any plan representing a Day Pass (no schedule gating)
        $locations = collect($locations)->map(function($loc){
            if(isset($loc['plans']) && is_array($loc['plans'])) {
                $loc['plans'] = array_values(array_filter($loc['plans'], function($p){
                    // remove all day pass variants
                    if (stripos($p['name'], 'day pass') !== false) {
                        return false;
                    }
                    // Show all other plans immediately (no schedule gating)
                    return true;
                }));
            }
            return $loc;
        })->toArray();

        $locationsList = collect($locations)->map(function($data, $slug){
            return [
                'id' => $data['id'],
                'name' => $data['name'],
                'slug' => $slug,
                'planCount' => count($data['plans']),
            ];
        })->values();

        return Inertia::render('Membership/Index', [
            'locations' => $locationsList,
            'plansByLocation' => $locations,
            'auth' => [ 'user' => auth()->user() ],
        ]);
    }
}
