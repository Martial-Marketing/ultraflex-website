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
                'image' => '/Images/Picture3.webp',
                'bio' => 'With over 30 years in the fitness industry, I’ve been a dedicated Personal Trainer at UltraFlex Gym since it opened its doors. I specialise in bodybuilding, weight loss, strength training, and general well-being, creating personalised training programmes tailored to each client’s unique goals. I also train individuals for competitions and photo shoots, helping them achieve peak physical condition and confidence. In addition to fitness training, I provide expert nutritional and supplement guidance for an all-round approach to health. I\'m skilled in injury rehabilitation as well, assisting clients in recovering safely while regaining strength and mobility. Having faced my own challenges with weight at 18, when I weighed 23 stone, I understand the struggles many people face and am passionate about helping others overcome their obstacles. Join me at UltraFlex, and let\'s take the first step towards a healthier, stronger you! ',
                'specialties' => ['Bodybuilding', 'Weight Loss', 'Strength', 'Rehab'],
                'certifications' => [],
                'locationSlug' => 'north-leeds',
                // location name will be injected in controllers from slug mapping
                'contact' => []
            ],
            [
                'id' => 102,
                'name' => 'Ali Mardomi',
                'slug' => 'ali-mardomi',
                'image' => '/Images/Picture4.webp',
                'bio' => 'I\'m a certified Level 2 and Level 3 personal trainer and nutrition with over 23 years of experience helping clients crush their fitness goals, whether it’s stepping on stage for competitions, dominating a race, or simply looking and feeling their best. I\'ve coached everyone from first time gym goers to seasoned athletes, including dozens of clients preparing for bodybuilding shows. As a coach, I make fitness both effective and enjoyable, helping people transform not just their bodies but their confidence. Ready to level up your fitness? Drop me a message to book a personal training session!',
                'specialties' => ['Contest Prep', 'Bodybuilding', 'General Fitness'],
                'certifications' => ['Level 2', 'Level 3', 'Nutrition'],
                'locationSlug' => 'north-leeds',
                'contact' => ['instagram' => 'https://instagram.com/alimardomi', 'phone' => '+447427288885']
            ],
            // West Leeds (added)
            [
                'id' => 801,
                'name' => 'Zarina',
                'slug' => 'zarina',
                'image' => '/Images/Picture2.webp',
                'bio' => 'Hi, I\'m Zarina, Face to Face and Online Personal Trainer. With over 10 years experience in the industry. My background is in Bodybuilding, Nutrition and Martial Arts. My affinity for Health and Wellbeing is reflected in my approach when working with clients. Though I am extremely results oriented, and have created many excellent Body Transformations, my work has a great emphasis on nutrition, and creating excellent lifestyle habits rendering my clients able to live a Happier, stronger more functional life. My clients range from 16 yrs to 70 yrs plus, and vary from students to Company CEOs. If you are looking for help to improve your shape, your health and abilities in the gym message me for a complimentary session and chat about how I can support you. Wishing you Great Health, Zarina PT.',
                'specialties' => ['Bodybuilding', 'Nutrition', 'Lifestyle Habits'],
                'certifications' => [],
                'locationSlug' => 'west-leeds',
                'contact' => ['instagram' => 'https://instagram.com/zarina_rashid_', 'phone' => '+447954848477']
            ],
            [
                'id' => 802,
                'name' => 'Holly McV',
                'slug' => 'holly-mcv',
                'image' => '/Images/Picture1.webp',
                'bio' => 'Hiya, my name\'s Holly and I’m a fully qualified personal trainer! I have around 5 years of experience training, and teaching myself everything as a beginner to where I am now. My aim as your trainer and friend is to help reach your goals, teach you, show you, work on building up your confidence and self esteem, and make some incredible changes both body and mind. Your journey with me includes support 24/7, motivation, education, tailored programmes, and making each session fun and enjoyable. We\'ll build lifelong habits and find balance so you can enjoy the gym as well as life.',
                'specialties' => ['Confidence Building', 'Lifestyle Coaching', 'Body Recomposition'],
                'certifications' => ['PT Qualified'],
                'locationSlug' => 'west-leeds',
                'contact' => ['instagram' => 'https://instagram.com/hollymcvfitnesscoach', 'facebook' => 'https://facebook.com/hollymcvfitnesscoach', 'email' => 'hollymcvfitnesscoach@gmail.com']
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
                'image' => '/Images/Picture5.webp',
                'bio' => 'I\'ve helped hundreds of happy people in the gym and online get where they never imagined, mentally and physically. My specialty is finding a way to get through to my client, have fun working with them and understand them. Apps can\'t dedicate time and understanding to you with a personality, REAL experience and all the support you need. For the price you pay in a gym for one hour per week, you get a truly custom plan we make for YOU, daily support through our coaching app, and guaranteed success. Knowledge is one piece of the puzzle—service, people skills and actually knowing how to coach a range of people makes you a good coach.',
                'specialties' => ['General Population', 'Accountability', 'Online Coaching'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => []
            ],
            [
                'id' => 203,
                'name' => 'Natalie',
                'slug' => 'natalie',
                'image' => '/Images/Picture6.webp',
                'bio' => 'If you’re looking to boost your confidence at the gym and achieve your best shape ever, you’ve come to the right place. I focus on empowering women to become the best versions of themselves by showing them that they can reach their goals without giving up the foods they enjoy. With years of experience in competitive bodybuilding and winning shows in the bikini category, I can help you go from general holiday condition to extreme stage condition. Book a consultation to discuss your goals and create a plan!',
                'specialties' => ['Female Physique', 'Contest Prep', 'Body Recomposition'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => ['instagram' => 'https://instagram.com/levelupfitness_bynat']
            ],
            [
                'id' => 204,
                'name' => 'Adam Gucwa',
                'slug' => 'adam-gucwa',
                'image' => '/Images/Picture7.webp',
                'bio' => 'Born and raised in Poland, living in York for 7 years. Over 15 years studying gym science with a degree in Physical Education and Sports Science; PT qualified. I\'ve helped over 50 people get stronger, leaner, confident and competent to lift safely and efficiently. I adapt training to fit your lifestyle, experience, shape and limitations.',
                'specialties' => ['Strength', 'Technique', 'Body Recomposition'],
                'certifications' => ['PT Qualified'],
                'locationSlug' => 'york',
                'contact' => ['email' => 'adamgucwa.pt@gmail.com', 'phone' => '+447763249793', 'website' => 'https://g.co/kgs/jrn2q1k']
            ],
            // Hull
            [
                'id' => 302,
                'name' => 'Leon',
                'slug' => 'leon',
                'image' => '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp',
                'bio' => 'I\'m a personal trainer and online coach for over 10 years, and have been competing as a body builder for over 12 years. I am a 2x Britain Champion. I help people achieve their goals from fat loss to stage prep.',
                'specialties' => ['Bodybuilding', 'Fat Loss', 'Contest Prep'],
                'certifications' => [],
                'locationSlug' => 'hull',
                'contact' => ['email' => 'elitephysiquecoaching@gmail.com', 'instagram' => 'https://instagram.com/elite_physique_coaching', 'phone' => '+447591768918']
            ],
            [
                'id' => 303,
                'name' => 'Stevie',
                'slug' => 'stevie',
                'image' => '/Images/PTS/Picture2.webp',
                'bio' => 'Certified personal trainer with over 5 years of experience and a certificate in nutrition. Passionate about helping individuals achieve lasting transformations with education, empowerment and personalised support.',
                'specialties' => ['Nutrition', 'Sustainable Change', 'Muscle Gain'],
                'certifications' => ['Nutrition Certificate'],
                'locationSlug' => 'hull',
                'contact' => ['instagram' => 'https://instagram.com/smphysiquecoaching']
            ],
            // Lincoln
            [
                'id' => 401,
                'name' => 'Dawid',
                'slug' => 'dawid',
                'image' => '/Images/PTS/Picture4.webp',
                'bio' => 'I’m a personal trainer at UltraFlex with over 20 years of experience in the gym. Level 2 Gym Instructor and Level 3 Personal Trainer qualified. I specialise in helping clients transform their physiques and elevate their training while maintaining balance in life. I focus on personal training, performance development, and mental resilience.',
                'specialties' => ['Physique Transformation', 'Performance', 'Mindset'],
                'certifications' => ['Level 2', 'Level 3'],
                'locationSlug' => 'lincoln',
                'contact' => ['phone' => '+447986989636', 'email' => 'trenujedawid90@gmail.com']
            ],
            [
                'id' => 402,
                'name' => 'Joanna Sirostan',
                'slug' => 'joanna-sirostan',
                'image' => '/Images/PTS/Picture5.webp',
                'bio' => 'I’m a certified Personal Trainer, Level 2 Fitness Instructor, Level 3 PT, and Precision Nutrition Level 1. I specialise in creating a supportive environment where clients can thrive, focusing on transforming habits and tackling challenges together to unlock your potential and guide you towards a healthier, happier life.',
                'specialties' => ['Habit Change', 'Strength', 'Wellness'],
                'certifications' => ['Level 2', 'Level 3', 'PN L1'],
                'locationSlug' => 'lincoln',
                'contact' => ['instagram' => 'https://instagram.com/joanna_sirostan', 'phone' => '+447853804211']
            ],
            [
                'id' => 403,
                'name' => 'Dale Bowman',
                'slug' => 'dale-bowman',
                'image' => '/Images/PTS/Picture6.webp',
                'bio' => 'Highly experienced PT with a Bachelor\'s (Hons) in Sports Development and Coaching, Level 3 PT certification, and a Nutrition Diploma. Competitive bodybuilder (PCA Brits and PCA Worlds). Specialises in coaching individuals over 30 for body recomposition, strength, and contest prep through tailored training, nutrition coaching, and group classes.',
                'specialties' => ['Contest Prep', 'Strength', 'Nutrition'],
                'certifications' => ['Level 3', 'Nutrition Diploma'],
                'locationSlug' => 'lincoln',
                'contact' => ['email' => 'dbfitness.lincoln@gmail.com', 'phone' => '+447784355668', 'name' => 'Dale Bowman']
            ],
            [
                'id' => 404,
                'name' => 'TC',
                'slug' => 'tc',
                'image' => '/Images/PTS/Picture7.webp',
                'bio' => 'Level 3 personal trainer with three years of professional experience and a solid 20-year history as a dedicated gym user. Passionate about helping clients achieve sustainable, long-term mental and physical transformations. Involved in football and community charity team; husband and father of three.',
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
                'image' => '/Images/PTS/Picture8.webp',
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
                'image' => '/Images/PTS/Picture9.webp',
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
                'image' => '/Images/PTS/Picture10.webp',
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
                'image' => '/Images/PTS/Picture11.webp',
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
                'image' => '/Images/PTS/Picture12.webp',
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
                'image' => '/Images/PTS/Picture13.webp',
                'bio' => 'Specialises in general population transformations, nutrition, and stress management; his integrated approach to treatment and education has changed the lives of many clients.',
                'specialties' => ['Transformations', 'Nutrition', 'Stress Management'],
                'certifications' => [],
                'locationSlug' => 'derby',
                'contact' => ['instagram' => 'https://instagram.com/dazzkent', 'email' => 'Dazzkentfitness@gmail.com', 'phone' => '+447738689130']
            ],
            [
                'id' => 602,
                'name' => 'Damon Hauge',
                'slug' => 'damon-hauge',
                'image' => '/Images/PTS/Picture14.webp',
                'bio' => 'Ex-professional boxer passionate about health and fitness, sharing experience, knowledge and expertise in training and nutrition. If you want to take your training to the next level, get in touch.',
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
                'image' => '/Images/PTS/Picture15.webp',
                'bio' => 'Are you getting the most out of every session and every rep? The fundamentals and execution unlock real results. I focus on execution, targeting the right muscles, and pushing effectively to drop stubborn fat. I\'ll guide you and make sure your training works for you. Let’s hit your goal — and go beyond it.',
                'specialties' => ['Strength', 'Execution', 'Fat Loss'],
                'certifications' => [],
                'locationSlug' => 'west-london',
                'contact' => ['instagram' => 'https://instagram.com/avidity.fitness.uk', 'email' => 'Contact@avtfitness.com', 'phone' => '+447714245383', 'website' => 'https://www.avtfitness.com']
            ],
        ];
    }
}
