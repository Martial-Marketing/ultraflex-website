<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $locations = [
            [ 'id'=>1,'name'=>'ULTRAFLEX WEST LEEDS','slug'=>'west-leeds','address'=>'Cape Mills, Coal Hill Ln, Leeds LS28 5NA','phone'=>'0113 256 5107','email'=>'leeds@ultraflexgym.co.uk','coordinates'=>['lat'=>53.8508,'lng'=>-1.6044] ],
            [ 'id'=>2,'name'=>'ULTRAFLEX NORTH LEEDS','slug'=>'north-leeds','address'=>'Limewood Approach, Seacroft, Leeds LS14 1NH','phone'=>'0113 513 7669','email'=>'northleeds@ultraflexgym.co.uk','coordinates'=>['lat'=>53.8371,'lng'=>-1.4909] ],
            [ 'id'=>3,'name'=>'ULTRAFLEX NORMANTON','slug'=>'normanton','address'=>'Ripley Dr, Normanton WF6 1QT','phone'=>'0192 489 5794','email'=>'normanton@ultraflexgym.co.uk','coordinates'=>['lat'=>53.7085,'lng'=>-1.4168] ],
            [ 'id'=>4,'name'=>'ULTRAFLEX ROTHERHAM','slug'=>'rotherham','address'=>'175 Effingham St, Rotherham S65 1BL','phone'=>'0170 937 7311','email'=>'rotherham@ultraflexgym.co.uk','coordinates'=>['lat'=>53.4326,'lng'=>-1.3568] ],
            [ 'id'=>5,'name'=>'ULTRAFLEX YORK','slug'=>'york','address'=>'10 Layerthorpe, York YO31 7YW','phone'=>'+44 1904 567 890','email'=>'york@ultraflexgym.co.uk','coordinates'=>['lat'=>54.0059,'lng'=>-1.0810] ],
            [ 'id'=>6,'name'=>'ULTRAFLEX HULL','slug'=>'hull','address'=>'Business Park, 261 Hawthorn Avenue Trackside, Hull HU3 5EN','phone'=>'+44 1482 678 901','email'=>'hull@ultraflexgym.co.uk','coordinates'=>['lat'=>53.7443,'lng'=>-0.3325] ],
            [ 'id'=>7,'name'=>'ULTRAFLEX DURHAM','slug'=>'durham','address'=>'Mandale Business Park, Unit 28D, Kent House, Durham DH1 1TH','phone'=>'+44 1913 789 012','email'=>'durham@ultraflexgym.co.uk','coordinates'=>['lat'=>54.7760,'lng'=>-1.5733] ],
            [ 'id'=>8,'name'=>'ULTRAFLEX DERBY','slug'=>'derby','address'=>'Chequers Rd, Derby DE21 6EN','phone'=>'+44 1332 890 123','email'=>'derby@ultraflexgym.co.uk','coordinates'=>['lat'=>52.9225,'lng'=>-1.4746] ],
            [ 'id'=>9,'name'=>'ULTRAFLEX ATHENS (GREECE)','slug'=>'athens-greece','address'=>'Ethnarchou Makariou 16, Peristeri 121 32, Greece','phone'=>'+30 210 901 2345','email'=>'athens@ultraflexgym.co.uk','coordinates'=>['lat'=>37.8651,'lng'=>23.7622] ],
            [ 'id'=>10,'name'=>'ULTRAFLEX LINCOLN','slug'=>'lincoln','address'=>'3 Pioneer Way, Lincoln LN6 3DH','phone'=>'+44 1522 012 345','email'=>'lincoln@ultraflexgym.co.uk','coordinates'=>['lat'=>53.2307,'lng'=>-0.5406] ],
            [ 'id'=>11,'name'=>'ULTRAFLEX WEST LONDON','slug'=>'west-london','address'=>'Point West, 2, Packet Boat Ln, Uxbridge UB8 2JP','phone'=>'+44 20 3456 7890','email'=>'westlondon@ultraflexgym.co.uk','coordinates'=>['lat'=>51.5074,'lng'=>-0.2296] ],
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
            'location_id' => 'required|integer',
            'g_recaptcha_response' => 'nullable|string'
        ]);

        // Verify Google reCAPTCHA v2 token if provided
        $recaptcha = $request->input('g_recaptcha_response');
        if ($recaptcha) {
            $secret = config('services.recaptcha.secret') ?? env('RECAPTCHA_SECRET');
            if ($secret) {
                try {
                    $verify = \Illuminate\Support\Facades\Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                        'secret' => $secret,
                        'response' => $recaptcha,
                        'remoteip' => $request->ip(),
                    ]);
                    $valid = $verify->ok() && ($verify->json('success') === true);
                    if (! $valid) {
                        return back()->withErrors(['captcha' => 'CAPTCHA verification failed. Please try again.'])->withInput();
                    }
                } catch (\Throwable $e) {
                    return back()->withErrors(['captcha' => 'CAPTCHA service error. Please try again later.'])->withInput();
                }
            }
        }

        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Maybe use a service like ContactForm::create($request->all())

        // For now, just return success
        return redirect()->back()->with('success', 'Thank you for your message! We\'ll get back to you soon.');
    }
}