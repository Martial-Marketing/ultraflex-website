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
                'bio' => 'With over 30 years in the fitness industry, I\'ve been a dedicated Personal Trainer at ULTRAFLEX Gym since it opened its doors. I specialise in bodybuilding, weight loss, strength training, and general well-being, creating personalised training programmes tailored to each client\'s unique goals. I also train individuals for competitions and photo shoots, helping them achieve peak physical condition and confidence. In addition to fitness training, I provide expert nutritional and supplement guidance for an all-round approach to health. I\'m skilled in injury rehabilitation as well, assisting clients in recovering safely while regaining strength and mobility. Having faced my own challenges with weight at 18, when I weighed 23 stone, I understand the struggles many people face and am passionate about helping others overcome their obstacles. Join me at ULTRAFLEX, and let\'s take the first step towards a healthier, stronger you! ',
                'specialties' => ['Bodybuilding', 'Weight Loss', 'Strength', 'Rehab'],
                'certifications' => [],
                'locationSlug' => 'north-leeds',
                // location name will be injected in controllers from slug mapping
                'contact' => ['email' => 'andycowellpt@gmail.com', 'phone' => '+447714401637']
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
                'image' => '/Images/original-89A5DC61-CEB4-4CFE-9D4F-125BA7320B03.webp',
                'bio' => 'I\'ve been personal training male and female clients of all different ages, for almost three years. Focusing on improving overall body composition, maximising muscle gain, fat loss, sleep, nutrition and macros, mindset, stress management, and confidence. I am constantly working to expand my knowledge and understanding of the many facets of health and fitness through seminars and workshops with some of the best coaches and trainers in the world. After competing in Men\'s Physique in 2017, coming in 3rd, I gained knowledge in this division in regards to diet and posing. I am currently working towards competing in Classic Physique next year. If you want to achieve the results you desire and improve your lifestyle overall, then contact me for a free session and consultation.',
                'specialties' => ['Body Recomposition', 'Muscle Gain', 'Fat Loss', 'Nutrition & Macros', 'Mindset', 'Stress Management'],
                'certifications' => ['Men\'s Physique Competitor (3rd Place, 2017)'],
                'locationSlug' => 'york',
                'contact' => [
                    'email' => 'harry-strike@hotmail.co.uk'
                ]
            ],
            [
                'id' => 202,
                'name' => 'Dan',
                'slug' => 'dan',
                'image' => '/Images/Picture5.webp',
                'bio' => 'I\'ve helped hundreds of happy people in the gym and online get where they never imagined, mentally and physically. Now with a dedicated office space at ULTRAFLEX York I can really take the time to meet in person all my clients in a safe space to build on their plans and goals. My specialty is honestly finding a way to get through to my client, have fun working with them and understand them. Online Apps can make you a solid training program but they can\'t dedicate their time and understanding to you with a personality, REAL experience and all the support you need. For the price you pay someone in a gym for one hour per week of their time, you get a truly custom plan we make for YOU through conversations. We set you up on our coaching app and keep that daily support and contact there to guarantee you success. Knowledge is one piece of the puzzle, service, people skills and actually knowing how to coach a range of people makes you a good coach.',
                'specialties' => ['General Population', 'Accountability', 'Online Coaching', 'Custom Programming'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => []
            ],

            [
                'id' => 204,
                'name' => 'Adam Gucwa',
                'slug' => 'adam-gucwa',
                'image' => '/Images/Picture7.webp',
                'bio' => 'My name is Adam. I was born and raised in Poland, fell in love with York and have been living here for the past 7 years. When I was 17, my Mum told me she could bench press 80kg when she was my age and this was the beginning of a lifelong fitness journey. For over 15 years I\'ve been studying gym science, graduated in Physical Education and Sports Science, eventually obtaining Personal Trainer qualification and turned my passion into a full time job, which was one of the best decisions in my life. Since then I\'ve helped over 50 people get stronger, leaner, confident and competent to lift safely and efficiently. I champion myself in adapting training to fit your lifestyle, level of experience, overall shape and working around your limitations.',
                'specialties' => ['Strength', 'Technique', 'Body Recomposition', 'Safe Lifting'],
                'certifications' => ['PT Qualified', 'Physical Education & Sports Science Degree'],
                'locationSlug' => 'york',
                'contact' => ['email' => 'adamgucwa.pt@gmail.com', 'phone' => '+447763249793', 'website' => 'https://g.co/kgs/jrn2q1k']
            ],
            // Hull
            [
                'id' => 302,
                'name' => 'Leon',
                'slug' => 'leon',
                'image' => '/Images/unnamed (1) (2).webp',
                'bio' => 'Hi I\'m Leon, I have been a personal trainer and online coach for over 10 years. I\'ve been competing as a body builder for over 12 years and I am also a 2x Britain Champion. I am passionate about helping people achieve their goals whether that be to just lose some weight and feel better, get in shape for a holiday or to compete on stage. Please feel free to contact me for more info on my 1-1 personal training or online coaching.',
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
                'id' => 400,
                'name' => 'Jack Bennett',
                'slug' => 'jack-bennett',
                'image' => '/Images/unnamed (1) (1).webp',
                'bio' => 'Hi, I\'m Jack - I am based at Ultraflex Lincoln. I feel so privileged to work from a top facility I love the atmosphere and sense community that has been established in such a short space of time. I am experienced coach with over 10 years in the fitness industry. As a competitive natural bodybuilder with a background in rugby and cycling, I bring a hybrid approach to performance, helping people of all ages and abilities achieve powerful transformations. My specialties include Fat Loss & Body Transformations, Strength & Conditioning, Goal Setting & Accountability, and Hybrid Performance Coaching. I love being part of people\'s fitness journeys and watching them grow in strength, confidence, and mindset. If you see me around the gym, come and say hello - I\'m always happy to chat! Let\'s smash your goals together!',
                'specialties' => ['Fat Loss', 'Body Transformation', 'Strength & Conditioning', 'Hybrid Performance'],
                'certifications' => ['Natural Bodybuilding Competitor'],
                'locationSlug' => 'lincoln',
                'contact' => ['email' => 'jackbennettpt86@gmail.com', 'phone' => '+447398688747']
            ],
            [
                'id' => 401,
                'name' => 'Dawid',
                'slug' => 'dawid',
                'image' => '/Images/PTS/Picture4.webp',
                'bio' => 'I\'m a personal trainer at ULTRAFLEX with over 20 years of experience in the gym. Level 2 Gym Instructor and Level 3 Personal Trainer qualified. I specialise in helping clients transform their physiques and elevate their training while maintaining balance in life. I focus on personal training, performance development, and mental resilience.',
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
            [
                'id' => 405,
                'name' => 'Mirella Ingamells',
                'slug' => 'mirella-ingamells',
                'image' => '/Images/PTS/Mirella pic 1.webp',
                'bio' => 'Mirella is a strength and conditioning coach, former professional fitness model, and founder of Mirella Fitness Ltd / Strong Beats Skinny. With over 15 years of experience coaching women worldwide, both in person and online, she specialises in helping women build strength, confidence and power through effective weight training. Her coaching goes beyond fad diets or chasing a quick-fix bikini body; she focuses on purposeful training, sustainable nutrition and creating a lifestyle that feels enjoyable and achievable long term. After placing 2nd at the WBFF World Championships in Las Vegas and spending 10 years in Ibiza training clients, teaching classes and hosting wellness retreats, Mirella now coaches from ULTRAFLEX Lincoln—dedicated to helping women lift, get strong and transform both body and mind.',
                'specialties' => ['Strength & Conditioning', 'Women\'s Lifting', 'Confidence Building'],
                'certifications' => [],
                'locationSlug' => 'lincoln',
                'gender' => 'Female',
                'experience' => 'Strength and conditioning coach with over 15 years helping women worldwide build strength, confidence and a sustainable lifting lifestyle.',
                'contact' => ['email' => 'mirella@mirellafitness.com', 'instagram' => 'https://www.instagram.com/mirella_fitness', 'facebook' => 'https://www.facebook.com/MirellaFitness']
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
                'image' => '/Images/unnamed (1).webp',
                'bio' => 'IFBB Pro coach with extensive experience in competitive bodybuilding and client transformations.',
                'specialties' => ['IFBB Pro Coaching', 'Bodybuilding', 'Contest Prep'],
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
                'certifications' => ['Qualified in Sports Nutrition for Physique Athletes', 'Contest Prep Coach', 'Hypertrophy Training Specialist'],
                'locationSlug' => 'west-london',
                'contact' => ['instagram' => 'https://instagram.com/avidity.fitness.uk', 'email' => 'Contact@avtfitness.com', 'phone' => '+447714245383', 'website' => 'https://www.avtfitness.com']
            ],
        ];
    }
}
