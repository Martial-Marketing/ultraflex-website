<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $locations = [
            [ 'id'=>1,'name'=>'ULTRAFLEX WEST LEEDS','slug'=>'west-leeds','address'=>'West Park Ring Road, Leeds LS16 6EB, UK','phone'=>'0113 256 5107','email'=>'leeds@ultraflexgym.co.uk','coordinates'=>['lat'=>53.8508,'lng'=>-1.6044] ],
            [ 'id'=>2,'name'=>'ULTRAFLEX NORTH LEEDS','slug'=>'north-leeds','address'=>'Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK','phone'=>'0113 513 7669','email'=>'northleeds@ultraflexgym.co.uk','coordinates'=>['lat'=>53.8371,'lng'=>-1.4909] ],
            [ 'id'=>3,'name'=>'ULTRAFLEX NORMANTON','slug'=>'normanton','address'=>'High Street, Normanton WF6 2DB, UK','phone'=>'0192 489 5794','email'=>'normanton@ultraflexgym.co.uk','coordinates'=>['lat'=>53.7085,'lng'=>-1.4168] ],
            [ 'id'=>4,'name'=>'ULTRAFLEX ROTHERHAM','slug'=>'rotherham','address'=>'Moorgate Street, Rotherham S60 2EY, UK','phone'=>'0170 937 7311','email'=>'rotherham@ultraflexgym.co.uk','coordinates'=>['lat'=>53.4326,'lng'=>-1.3568] ],
            [ 'id'=>5,'name'=>'ULTRAFLEX YORK','slug'=>'york','address'=>'Clifton Moor Centre, York YO30 4WR, UK','phone'=>'+44 1904 567 890','email'=>'york@ultraflexgym.co.uk','coordinates'=>['lat'=>54.0059,'lng'=>-1.0810] ],
            [ 'id'=>6,'name'=>'ULTRAFLEX HULL','slug'=>'hull','address'=>'Jameson Street, Hull HU1 3DX, UK','phone'=>'+44 1482 678 901','email'=>'hull@ultraflexgym.co.uk','coordinates'=>['lat'=>53.7443,'lng'=>-0.3325] ],
            [ 'id'=>7,'name'=>'ULTRAFLEX DURHAM','slug'=>'durham','address'=>'North Road, Durham DH1 4SQ, UK','phone'=>'+44 1913 789 012','email'=>'durham@ultraflexgym.co.uk','coordinates'=>['lat'=>54.7760,'lng'=>-1.5733] ],
            [ 'id'=>8,'name'=>'ULTRAFLEX DERBY','slug'=>'derby','address'=>'St Peters Street, Derby DE1 2AB, UK','phone'=>'+44 1332 890 123','email'=>'derby@ultraflexgym.co.uk','coordinates'=>['lat'=>52.9225,'lng'=>-1.4746] ],
            [ 'id'=>9,'name'=>'ULTRAFLEX ATHENS (GREECE)','slug'=>'athens-greece','address'=>'Vouliagmenis Avenue, Glyfada 166 74, Greece','phone'=>'+30 210 901 2345','email'=>'athens@ultraflexgym.co.uk','coordinates'=>['lat'=>37.8651,'lng'=>23.7622] ],
            [ 'id'=>10,'name'=>'ULTRAFLEX LINCOLN','slug'=>'lincoln','address'=>'High Street, Lincoln LN5 7PJ, UK','phone'=>'+44 1522 012 345','email'=>'lincoln@ultraflexgym.co.uk','coordinates'=>['lat'=>53.2307,'lng'=>-0.5406] ],
            [ 'id'=>11,'name'=>'ULTRAFLEX WEST LONDON','slug'=>'west-london','address'=>'Westfield Shopping Centre, London W12 7GF, UK','phone'=>'+44 20 3456 7890','email'=>'westlondon@ultraflexgym.co.uk','coordinates'=>['lat'=>51.5074,'lng'=>-0.2296] ],
            [ 'id'=>999,'name'=>'Head Office','slug'=>'head-office','address'=>'UltraFlex Head Office, 123 Fitness Street, London','phone'=>'+44 20 1234 5678','email'=>'headoffice@ultraflex.com','coordinates'=>['lat'=>51.509865,'lng'=>-0.118092] ],
        ];

        return Inertia::render('Contact/Index', [
            'locations' => $locations,
            'locationOptions' => collect($locations)->map(fn($l) => [
                'id' => $l['id'],
                'name' => $l['name']
            ])->values(),
            'generalContact' => [
                'phone' => '+44 20 1234 5678',
                'email' => 'info@ultraflex.com',
                'address' => 'UltraFlex Head Office, 123 Fitness Street, London'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
            'location_id' => 'nullable|integer'
        ]);

        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Maybe use a service like ContactForm::create($request->all())

        // For now, just return success
        return redirect()->back()->with('success', 'Thank you for your message! We\'ll get back to you soon.');
    }
}