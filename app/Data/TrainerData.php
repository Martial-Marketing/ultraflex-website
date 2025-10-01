<?php

namespace App\Data;

class TrainerData
{
    /**
     * Return the unified list of real trainers across locations.
     * This was extracted from LocationController to allow reuse by TrainerController.
     */
    public static function all(): array
    {
        return [
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
                // location name will be injected in controllers from slug mapping
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
            // Durham
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
    }
}
