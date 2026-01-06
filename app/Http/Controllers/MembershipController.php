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
                    ['id'=>2,'name'=>'Weekly Pass','price'=>25.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','All Facilities','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>47.50,'period'=>'month','features'=>['30 Days Access','All Equipment Access','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit (12 mth)','price'=>40.00,'period'=>'month','features'=>['Monthly Direct Debit','12 Month Contract','All Equipment Access','All Facilities','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'3 Month Pass','price'=>140.00,'period'=>'3 months','features'=>['3 Months Access','Payment in Full','All Equipment Access','All Facilities'],'popular'=>false],
                    ['id'=>6,'name'=>'6 Month Pass','price'=>250.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','All Facilities'],'popular'=>false],
                    ['id'=>7,'name'=>'12 Month Pass','price'=>450.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','All Equipment Access','All Facilities'],'popular'=>false],
                    ['id'=>8,'name'=>'Student Monthly Rolling','price'=>42.50,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling Direct Debit','All Equipment Access','All Facilities'],'popular'=>false],
                    ['id'=>9,'name'=>'Student 6 Month Pass','price'=>225.00,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full (£225)','All Equipment Access'],'popular'=>false],
                    ['id'=>10,'name'=>'Student 9 Month Pass','price'=>325.00,'period'=>'9 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full (£325)','All Equipment Access'],'popular'=>false],
                    ['id'=>11,'name'=>'Student 12 Month Pass','price'=>400.00,'period'=>'12 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full (£400)','Best Student Value'],'popular'=>false],
                ],
            ],
            'north-leeds' => [
                'id' => 2,
                'name' => 'ULTRAFLEX NORTH LEEDS',
                'plans' => [
                    ['id'=>2,'name'=>'Weekly Pass','price'=>27.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>55.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>52.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','All Equipment Access','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>299.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','Group Classes'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>540.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','All Equipment Access','Group Classes','Best Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'Student Monthly Rolling','price'=>45.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                ],
            ],
            'normanton' => [
                'id' => 3,
                'name' => 'ULTRAFLEX NORMANTON',
                'plans' => [
                    ['id'=>2,'name'=>'Weekly Pass','price'=>27.00,'period'=>'week','features'=>['7 Days Access','Standard Equipment','All Facilities','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>52.00,'period'=>'month','features'=>['30 Days Access','Standard Equipment','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>47.00,'period'=>'month','features'=>['Monthly Rolling Contract','Min 12 Month Commitment','Standard Equipment','All Facilities','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>269.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','Standard Equipment','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>465.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','Standard Equipment','All Facilities','Best Annual Value'],'popular'=>false],
                    ['id'=>8,'name'=>'GOLD Weekly Pass','price'=>32.50,'period'=>'week','features'=>['7 Days Access','Premium Equipment','Priority Access','Personal Training Discounts'],'popular'=>false],
                    ['id'=>9,'name'=>'GOLD Monthly Rolling Pass','price'=>59.00,'period'=>'month','features'=>['Monthly Rolling','Premium Equipment','Priority Access','Exclusive Classes','Personal Training Discounts'],'popular'=>false],
                    ['id'=>10,'name'=>'GOLD Monthly Direct Debit','price'=>53.00,'period'=>'month','features'=>['Monthly Rolling Contract','Premium Equipment','Priority Access','Exclusive Classes','Best GOLD Value'],'popular'=>false],
                    ['id'=>11,'name'=>'GOLD 6 Month Pass','price'=>324.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','Premium Equipment','Priority Access','All GOLD Benefits'],'popular'=>false],
                    ['id'=>12,'name'=>'GOLD 12 Month Pass','price'=>519.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','Premium Equipment','Priority Access','Best GOLD Annual Value'],'popular'=>false],
                ],
            ],
            'rotherham' => [
                'id' => 4,
                'name' => 'ULTRAFLEX ROTHERHAM',
                'plans' => [
                    ['id'=>2,'name'=>'Weekly Pass','price'=>25.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','All Facilities','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>55.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit','price'=>50.00,'period'=>'month','features'=>['12 Month Direct Debit','Min 12 Month Commitment','All Equipment Access','All Facilities','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>285.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','All Equipment Access','All Facilities','Group Classes'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>465.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','All Equipment Access','All Facilities','Best Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'Student Monthly Rolling','price'=>46.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','All Equipment Access'],'popular'=>false],
                    ['id'=>8,'name'=>'Student 6 Month Pass','price'=>246.00,'period'=>'6 months','features'=>['6 Months Access','Payment in Full','Student Discount','All Equipment Access'],'popular'=>false],
                    ['id'=>9,'name'=>'Student 9 Month Pass','price'=>360.00,'period'=>'9 months','features'=>['9 Months Access','Payment in Full','Student Discount','All Equipment Access'],'popular'=>false],
                    ['id'=>10,'name'=>'Student 12 Month Pass','price'=>468.00,'period'=>'12 months','features'=>['12 Months Access','Payment in Full','Student Discount','All Equipment Access'],'popular'=>false],
                ],
            ],
            'york' => [
                'id' => 5,
                'name' => 'ULTRAFLEX YORK',
                'plans' => [
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
                    ['id'=>2,'name'=>'Weekly Pass','price'=>22.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Cardio Area','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>45.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Rolling Direct Debit','price'=>47.00,'period'=>'month','features'=>['Monthly Rolling','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>5,'name'=>'12 Month Direct Debit','price'=>41.00,'period'=>'month','features'=>['12 Month Contract','All Equipment Access','Cardio Area','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>6,'name'=>'6 Month Pass','price'=>230.00,'period'=>'6 months','features'=>['Payment in Full','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>7,'name'=>'12 Month Pass','price'=>450.00,'period'=>'12 months','features'=>['Payment in Full','All Equipment Access','Cardio Area','Best Annual Value'],'popular'=>false],
                ],
            ],
            'durham' => [
                'id' => 7,
                'name' => 'ULTRAFLEX DURHAM',
                'plans' => [
                    ['id'=>2,'name'=>'Weekly Pass','price'=>24.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Cardio Area','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>54.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Direct Debit (12mth)','price'=>48.00,'period'=>'month','features'=>['12 Month Contract','All Equipment Access','Cardio Area','Group Classes','Best Value'],'popular'=>true],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>250.00,'period'=>'6 months','features'=>['Payment in Full','All Equipment Access'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>435.00,'period'=>'12 months','features'=>['Payment in Full','All Equipment Access','Best Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'Student 6 Month Pass','price'=>200.00,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full'],'popular'=>false],
                    ['id'=>8,'name'=>'Student 9 Month Pass','price'=>285.00,'period'=>'9 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full'],'popular'=>false],
                ],
            ],
            'derby' => [
                'id' => 8,
                'name' => 'ULTRAFLEX DERBY',
                'plans' => [
                    ['id'=>2,'name'=>'Weekly Pass','price'=>29.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Cardio Area','Free Parking'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Pass','price'=>62.00,'period'=>'month','features'=>['30 Days Access','All Equipment Access','Cardio Area','Group Classes'],'popular'=>false],
                    ['id'=>4,'name'=>'Monthly Rolling','price'=>56.00,'period'=>'month','features'=>['Monthly Rolling','All Equipment Access','Best Value'],'popular'=>false],
                    ['id'=>5,'name'=>'12 Month Direct Debit','price'=>54.00,'period'=>'month','features'=>['12 Month Contract','All Equipment Access','Best Value'],'popular'=>true],
                    ['id'=>6,'name'=>'6 Month Pass','price'=>315.00,'period'=>'6 months','features'=>['Payment in Full','All Equipment Access'],'popular'=>false],
                    ['id'=>7,'name'=>'12 Month Pass','price'=>570.00,'period'=>'12 months','features'=>['Payment in Full','All Equipment Access','Best Annual Value'],'popular'=>false],
                    ['id'=>8,'name'=>'Student Monthly Rolling','price'=>49.00,'period'=>'month','features'=>['Student & Blue Light Discount','Valid ID Required','Monthly Rolling'],'popular'=>false],
                    ['id'=>9,'name'=>'Student 12 Month Direct Debit','price'=>45.00,'period'=>'month','features'=>['Student & Blue Light Discount','Valid ID Required','12 Month Contract'],'popular'=>false],
                    ['id'=>10,'name'=>'Boxing, MMA & Gym','price'=>66.00,'period'=>'month','features'=>['Boxing Access','MMA Access','Full Gym Membership'],'popular'=>false],
                ],
            ],
            'athens-greece' => [
                'id' => 9,
                'name' => 'ULTRAFLEX ATHENS (GREECE)',
                'plans' => [
                    ['id'=>1,'name'=>'Pre-Launch Registration','price'=>0,'period'=>'registration','features'=>['Early Access Registration','Opening Day Notifications','Special Launch Offers','VIP Opening Event Invite'],'popular'=>true],
                    ['id'=>3,'name'=>'Founding Member (Monthly)','price'=>65,'period'=>'month','features'=>['Coming Soon','Founding Member Discount','All Equipment Access','International UltraFlex Standards'],'popular'=>false],
                ],
            ],
            'lincoln' => [
                'id' => 10,
                'name' => 'ULTRAFLEX LINCOLN',
                'plans' => [
                    ['id'=>1,'name'=>'Monthly Rolling Direct Debit','price'=>54.99,'period'=>'month','features'=>['Monthly Rolling','Day Access Only','Mon-Fri: 06:00-22:00','Sat-Sun: 06:00-20:00'],'popular'=>false],
                    ['id'=>2,'name'=>'Monthly Rolling 24hr Direct Debit','price'=>65.00,'period'=>'month','features'=>['Monthly Rolling','24/7 Access','Train Anytime','First 24hr UltraFlex'],'popular'=>true],
                    ['id'=>3,'name'=>'12 Month Direct Debit','price'=>49.99,'period'=>'month','features'=>['12 Month Contract','Day Access Only','Mon-Fri: 06:00-22:00','Sat-Sun: 06:00-20:00','Best Value'],'popular'=>true],
                    ['id'=>4,'name'=>'12 Month 24hr Direct Debit','price'=>54.99,'period'=>'month','features'=>['12 Month Contract','24/7 Access','Train Anytime','First 24hr UltraFlex'],'popular'=>false],
                    ['id'=>5,'name'=>'12 Month Pass - Paid in Full','price'=>530.00,'period'=>'12 months','features'=>['Payment in Full','All Equipment Access','Best Annual Value'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month 24hr Pass - Paid in Full','price'=>590.00,'period'=>'12 months','features'=>['Payment in Full','24/7 Access','Best 24hr Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'6 Month Pass - Paid in Full','price'=>270.00,'period'=>'6 months','features'=>['Payment in Full','All Equipment Access'],'popular'=>false],
                    ['id'=>8,'name'=>'6 Month 24hr Pass - Paid in Full','price'=>300.00,'period'=>'6 months','features'=>['Payment in Full','24/7 Access'],'popular'=>false],
                    ['id'=>9,'name'=>'Student Monthly Rolling','price'=>48.60,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','Day Access Only'],'popular'=>false],
                    ['id'=>10,'name'=>'Student Monthly Rolling 24hr','price'=>58.50,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling','24/7 Access'],'popular'=>false],
                    ['id'=>11,'name'=>'Student 6 Month Pass - Paid in Full','price'=>265.50,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full'],'popular'=>false],
                    ['id'=>12,'name'=>'Student 6 Month 24hr Pass - Paid in Full','price'=>319.50,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full','24/7 Access'],'popular'=>false],
                    ['id'=>13,'name'=>'Student 12 Month Pass - Paid in Full','price'=>477.00,'period'=>'12 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full'],'popular'=>false],
                    ['id'=>14,'name'=>'Student 12 Month 24hr Pass - Paid in Full','price'=>531.00,'period'=>'12 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full','24/7 Access'],'popular'=>false],
                ],
            ],
            'west-london' => [
                'id' => 11,
                'name' => 'ULTRAFLEX WEST LONDON',
                'plans' => [
                    ['id'=>2,'name'=>'Weekly Pass','price'=>30.00,'period'=>'week','features'=>['7 Days Access','All Equipment Access','Premium London Location','Early Opening 05:30'],'popular'=>false],
                    ['id'=>3,'name'=>'Monthly Rolling','price'=>55.00,'period'=>'month','features'=>['No Contract','Monthly Rolling','All Equipment Access','Maximum Flexibility'],'popular'=>true],
                    ['id'=>4,'name'=>'12 Month Direct Debit','price'=>50.00,'period'=>'month','features'=>['12 Month Contract','All Equipment Access','Best Value'],'popular'=>false],
                    ['id'=>5,'name'=>'6 Month Pass','price'=>315.00,'period'=>'6 months','features'=>['Payment in Full','All Equipment Access'],'popular'=>false],
                    ['id'=>6,'name'=>'12 Month Pass','price'=>570.00,'period'=>'12 months','features'=>['Payment in Full','All Equipment Access','Best Annual Value'],'popular'=>false],
                    ['id'=>7,'name'=>'Student Monthly Rolling','price'=>45.00,'period'=>'month','features'=>['Student Discount','Valid Student ID Required','Monthly Rolling'],'popular'=>false],
                    ['id'=>8,'name'=>'Student 6 Month Pass','price'=>250.00,'period'=>'6 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full'],'popular'=>false],
                    ['id'=>9,'name'=>'Student 9 Month Pass','price'=>350.00,'period'=>'9 months','features'=>['Student Discount','Valid Student ID Required','Payment in Full'],'popular'=>false],
                ],
            ],
        ];

        // Filter out any plan representing a Day Pass (no schedule gating)
        $locations = collect($locations)->map(function ($loc) {
            if (isset($loc['plans']) && is_array($loc['plans'])) {
                $loc['plans'] = array_values(array_filter($loc['plans'], function ($p) {
                    if (stripos($p['name'], 'day pass') !== false) {
                        return false;
                    }
                    return true;
                }));
            }
            return $loc;
        })->toArray();

        $locationsList = collect($locations)->map(function ($data, $slug) {
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
            'auth' => ['user' => auth()->user()],
        ]);
    }
}
