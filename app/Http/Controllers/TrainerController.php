<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerController extends Controller
{
    public function index()
    {
        // Use real trainers from centralised data (those actually attached to locations).
        $raw = \App\Data\TrainerData::all();

        // Map slug -> display name for locations used elsewhere (keep limited to ones present in trainer data)
        $locationNames = [
            'north-leeds' => 'ULTRAFLEX NORTH LEEDS',
            'york' => 'ULTRAFLEX YORK',
            'hull' => 'ULTRAFLEX HULL',
            'lincoln' => 'ULTRAFLEX LINCOLN',
            'durham' => 'ULTRAFLEX DURHAM',
            'derby' => 'ULTRAFLEX DERBY',
            'west-london' => 'ULTRAFLEX WEST LONDON',
        ];

        $trainers = array_map(function($t) use ($locationNames) {
            $t['locationSlug'] = $t['locationSlug'] ?? null;
            $t['location'] = $t['locationSlug'] && isset($locationNames[$t['locationSlug']]) ? $locationNames[$t['locationSlug']] : null;
            // Provide placeholders for required frontend fields not yet captured for real trainers
            $t['gender'] = $t['gender'] ?? 'Male'; // default placeholder
            $t['rating'] = $t['rating'] ?? 5.0;
            $t['reviewCount'] = $t['reviewCount'] ?? 0;
            $t['experience'] = $t['experience'] ?? '';
            $t['certifications'] = $t['certifications'] ?? [];
            return $t;
        }, $raw);

        // Build locations list only for locations that actually have trainers
        $locations = [];
        foreach ($trainers as $t) {
            if ($t['locationSlug'] && $t['location']) {
                $locations[$t['locationSlug']] = ['name' => $t['location'], 'slug' => $t['locationSlug']];
            }
        }
        $locations = array_values($locations);

        // Aggregate distinct specialties (case-sensitive as entered)
        $specialtySet = [];
        foreach ($trainers as $t) {
            if (!empty($t['specialties']) && is_array($t['specialties'])) {
                foreach ($t['specialties'] as $s) {
                    $specialtySet[$s] = true;
                }
            }
        }
        $specialties = array_keys($specialtySet);

        return Inertia::render('Trainers/Index', [
            'trainers' => $trainers,
            'locations' => $locations,
            'specialties' => $specialties
        ]);
    }

    public function show($trainer)
    {
        $raw = \App\Data\TrainerData::all();
        $indexed = [];
        foreach ($raw as $t) {
            if (isset($t['slug'])) {
                $indexed[$t['slug']] = $t;
            }
        }

        if (!isset($indexed[$trainer])) {
            abort(404, 'Trainer not found');
        }

        $base = $indexed[$trainer];

        // Map location names (reuse mapping from index)
        $locationNames = [
            'north-leeds' => 'ULTRAFLEX NORTH LEEDS',
            'york' => 'ULTRAFLEX YORK',
            'hull' => 'ULTRAFLEX HULL',
            'lincoln' => 'ULTRAFLEX LINCOLN',
            'durham' => 'ULTRAFLEX DURHAM',
            'derby' => 'ULTRAFLEX DERBY',
            'west-london' => 'ULTRAFLEX WEST LONDON',
        ];
        $base['location'] = $base['locationSlug'] && isset($locationNames[$base['locationSlug']]) ? $locationNames[$base['locationSlug']] : null;

        // Enrich with extended fields (placeholder or synthesized) to satisfy Trainer Show page expectations
        $base['detailedBio'] = $base['detailedBio'] ?? ($base['bio'] . ' This profile is being expanded. More background, coaching philosophy, and achievements will be added soon.');
        $base['gender'] = $base['gender'] ?? 'Male';
        $base['rating'] = $base['rating'] ?? 5.0;
        $base['reviewCount'] = $base['reviewCount'] ?? 0;
        $base['experience'] = $base['experience'] ?? '';
        $base['certifications'] = $base['certifications'] ?? [];
        $base['qualifications'] = $base['qualifications'] ?? ($base['certifications'] ?? []);
        $base['philosophy'] = $base['philosophy'] ?? 'Coaching focused on sustainable progress, proper technique, and building confidence.';
        $base['achievements'] = $base['achievements'] ?? [];
        $base['socialMedia'] = $base['contact'] ?? [];
        $base['contact'] = $base['contact'] ?? [];
        $base['sessionTypes'] = $base['sessionTypes'] ?? [
            ['type' => '1:1 Personal Training Session', 'duration' => '60 minutes', 'price' => 40],
            ['type' => 'Consultation & Goal Setting', 'duration' => '45 minutes', 'price' => 25],
        ];
        // Basic structured weekly availability (placeholder)
        $base['availability'] = $base['availability'] ?? [
            ['day' => 'Monday', 'times' => ['6:00 AM', '7:00 AM', '5:00 PM']],
            ['day' => 'Tuesday', 'times' => ['6:00 AM', '7:00 AM', '5:00 PM']],
            ['day' => 'Wednesday', 'times' => ['6:00 AM', '7:00 AM', '5:00 PM']],
            ['day' => 'Thursday', 'times' => ['6:00 AM', '7:00 AM', '5:00 PM']],
            ['day' => 'Friday', 'times' => ['6:00 AM', '7:00 AM']],
            ['day' => 'Saturday', 'times' => ['9:00 AM', '10:00 AM']],
            ['day' => 'Sunday', 'times' => ['Not Available']],
        ];
        $base['testimonials'] = $base['testimonials'] ?? [];

        return Inertia::render('Trainers/Show', [
            'trainer' => $base
        ]);
    }

    public function contact(Request $request, $trainer)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
            'preferred_session' => 'nullable|string|max:255',
        ]);

        // Here you would typically:
        // 1. Save the enquiry to database
        // 2. Send email to trainer
        // 3. Send confirmation email to client

        return redirect()->back()->with('success', 'Your message has been sent! The trainer will get back to you within 24 hours.');
    }
}