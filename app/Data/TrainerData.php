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
                'bio' => 'Andy Cowell - Personal Trainer at UltraFlex Gym, North Leeds. With over 30 years in the fitness industry, I\'ve been a dedicated Personal Trainer at UltraFlex Gym since it opened its doors. I specialise in bodybuilding, weight loss, strength training, and general well-being, creating personalised training programmes tailored to each client\'s unique goals. I also train individuals for competitions and photo shoots, helping them achieve peak physical condition and confidence. In addition to fitness training, I provide expert nutritional and supplement guidance for an all-round approach to health. I\'m skilled in injury rehabilitation as well, assisting clients in recovering safely while regaining strength and mobility. Having faced my own challenges with weight at 18, when I weighed 23 stone, I understand the struggles many people face and am passionate about helping others overcome their obstacles. Join me at UltraFlex, and let\'s take the first step towards a healthier, stronger you!',
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
                'bio' => 'I\'m Ali Mardomi a certified Level 2 and Level 3 personal trainer and nutrition with over 23 years of experience helping clients crush their fitness goals, whether it\'s stepping on stage for competitions, dominating a race, or simply looking and feeling their best. Over the years, I\'ve coached everyone from first time gym goers to seasoned athletes, including dozens of clients preparing for competitions like bodybuilding shows . One of my proudest moments? Watching a client go from struggling with their first bicep curls to standing on the podium with a trophy in hand. (I may have shed a tear don\'t tell anyone!) As a coach, I make fitness both effective and enjoyable. I\'ve helped people transform not just their bodies but their confidence, guiding them to push past self-doubt and smash limits they didn\'t even know they had. One time, a client told me they only joined for "a little weight loss," and two years later, they were competing in a physique competition. Talk about a glow-up! With 23 years in the game and certifications in personal training, I\'ve got the knowledge and the experience to optimize every session. Whether you\'re chasing a medal or just want to feel stronger and healthier, I\'ll create a plan that works for you. Ready to take that first step? Let\'s turn your goals into reality—and have a little fun while we\'re at it! Ready to level up your fitness? Drop me a message on Instagram or WhatsApp to book your personal training session!',
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
                'bio' => 'Hi, I\'m Zarina, Face to Face and Online Personal Trainer. With over 10 years experience in the Industry. My background is in Bodybuilding , Nutrition and Martial Arts. My affinity for Health and Wellbeing ,is reflected in my approach when working with clients. Though I am extremely results oriented, and have created many excellent Body Transformations , my work has a great emphasis on nutrition, and creating excellent lifestyle habits rendering my clients able to live a Happier, stronger more functional life. My clients range from 16 yrs to 70 yrs plus, and vary from students to Company CEO\'s. If you are looking for help to improve your shape , your health and abilities in the gym message me for a complimentary session and chat about how I can support you. Wishing you Great Health, Zarina PT',
                'specialties' => ['Bodybuilding', 'Nutrition', 'Martial Arts', 'Lifestyle Habits'],
                'certifications' => [],
                'locationSlug' => 'west-leeds',
                'contact' => ['instagram' => 'https://instagram.com/zarina_rashid_', 'phone' => '+447954848477']
            ],
            [
                'id' => 802,
                'name' => 'Holly McV',
                'slug' => 'holly-mcv',
                'image' => '/Images/Picture1.webp',
                'bio' => 'Hiya, my names Holly and I\'m a fully qualified personal trainer! I have around 5 years of experience training, and teaching myself everything as a beginner to where I am now! My passion for fitness started when I first starting lifting weights, from this day onwards I feel in the love with the gym. This love soon turned into a passion of wanting to help and teach others, alongside achieving some amazing physical but also mental goals! My aim as your trainer and friend is to help reach your goals, teach you, show you, work on building up your confidence and self esteem, and make some incredible changes both body and mind! Your journey with me includes support from me 24/7, keeping you motivated, teaching you, showing you, educating you, designing fitness programmes for you, and of course making each session fun and enjoyable! When you start with me we are working on life long habits, maintaining balance so you can enjoy the gym as well as life! Remember your goals do not need to stop you from enjoying your life. Here we will work together to find that balance! I can\'t do this on my own, so I need us to work together as a team to make these goals achieveable. We will work together to get you exactly where you want to be, this is all about you so bring on the journey.',
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
                'bio' => 'Dan, what do you specialise in? Who do you help? Will you coach me I\'m not a bodybuilder? These are all questions I get asked every week. I\'ve helped hundreds and hundreds of happy people in the gym and online to get to where they never imagined, mentally and physically. Now with a dedicated office space at @ultraflexgymyork I can really take the time to meet in person all my clients in a safe space to build on their plans and goals. My specialty is honestly finding a way to get through to my client, have fun working with them and understand them. Online Apps can make you a solid training program that is probably better than your bog standard local fitness centre personal trainer. That\'s all great, try them if you want. But What these things can not do, is dedicate their time and understanding to you with a personality, REAL experience and all the support you need! Think of it like this. For the price you pay someone in a gym for one hour per week of their time, you get a truly custom plan we make for YOU through a number of conversations. We set you up on our coaching app and keep that daily support and contact there to guarantee you success. Knowledge is one piece of the puzzle, service, people skills and actually knowing how to coach a range of people makes you a good coach.',
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
                'bio' => 'Hi, My name is Adam. I was born and raised in Poland, fell in love with York and have been living here for the past 7 years. When I was 17, my Mum told me she could bench press 80kg when she was my age and this was the beginning of a lifelong fitness journey. For over 15 years I\'ve been studying gym science, graduated in Physical Education and Sports Science, eventually obtaining Personal Trainer qualification and turned my passion into a full time job, which was one of the best decisions in my life. Since then I\'ve helped over 50 people get stronger, leaner, confident and competent to lift safely and efficiently. I champion myself in adapting training to fit your lifestyle, level of experience, overall shape and working around your limitations. Feel free to look at testimonials on my Google page: Professor Personal Training https://g.co/kgs/jrn2q1k You can contact me on: adamgucwa.pt@gmail.com 07763 249793 Looking forward to working with you!',
                'specialties' => ['Strength', 'Technique', 'Body Recomposition', 'Safe Lifting'],
                'certifications' => ['PT Qualified', 'Physical Education & Sports Science Degree'],
                'locationSlug' => 'york',
                'contact' => ['email' => 'adamgucwa.pt@gmail.com', 'phone' => '+447763249793', 'website' => 'https://g.co/kgs/jrn2q1k']
            ],
            [
                'id' => 205,
                'name' => 'Eddie Sykes',
                'slug' => 'eddie-sykes',
                'image' => '/Images/unnamed (2).webp',
                'bio' => '\'\'You are never too old to set a new goal or to dream a new dream\'\' 10 years of success with my own gym left me wanting more from my own personal brand. I was comfortable and settled but the desire to help others on a more personal level burns deeper inside. I\'m buzzing to announce that as part of my new business launch I will be training clients 1-1 out of @ultraflexgymyork as of Monday 14th October. Availability really is limited as I\'ll only be there a couple of days a week as I am working hard behind the scenes on setting up my new online coaching business and putting all the systems in place to make this all as personalised and as unique as possible. So drop me a DM, an email or a WhatsApp if you want to level up your physique and mindset, have better workouts and learn how to train hard and efficiently no matter on your goals…. The 1-1 training aspect has always been a big passion of mine. I have been in the fitness industry nearly 20 years and have had success with so many different clients who are all individuals with their own aims of what they want to achieve. I\'m on my own journey with my own set plans so motivation is high as I push on with my training and my physique to be the best I can possibly be. Let\'s all just be the best we can be! I genuinely look forward to this new chapter in my career and bringing some of my own team to UltraFlex York and also meeting and training new faces and physiques too.',
                'specialties' => ['1-1 Training', 'Online Coaching', 'Physique Training', 'Mindset'],
                'certifications' => [],
                'locationSlug' => 'york',
                'contact' => []
            ],
            // Hull
            [
                'id' => 302,
                'name' => 'Leon',
                'slug' => 'leon',
                'image' => '/Images/unnamed (1) (2).webp',
                'bio' => 'Hi I\'m Leon, I have been a personal trainer and online coach for over 10 years. I\'ve been competing as a body builder for over 12 years and I am also a 2x Britain Champion. 
I am passionate about helping people achieve their goals whether that be to just lose some weight and feel better, get in shape for a holiday or to compete on stage. 
Please feel free to contact me for more info on my 1-1 personal training or online coaching. 
Mobile: 07591768918 
Email: elitephysiquecoaching@gmail.com
Instagram: @elite_physique_coaching',
                'specialties' => ['Bodybuilding', 'Fat Loss', 'Contest Prep'],
                'certifications' => [],
                'locationSlug' => 'hull',
                'contact' => ['email' => 'elitephysiquecoaching@gmail.com', 'instagram' => 'https://instagram.com/elite_physique_coaching', 'phone' => '07591768918']
            ],
            [
                'id' => 303,
                'name' => 'Stevie',
                'slug' => 'stevie',
                'image' => '/Images/PTS/Picture2.webp',
                'bio' => 'I am Stevie, I am a certified personal trainer with over 5 years of experience in the fitness industry and a certificate in nutrition. I am passionate about helping individuals achieve lasting transformations, I have a centred approach around education, empowerment and personalised support. Whether you are looking to build muscle, reduce body fat, or create a sustainable fitness routine I will work closely with you to design tailored programs that fit your unique goals and lifestyle. Commit to fostering long-term health and well-being, I strive to inspire and guide clients toward making meaningful, positive changes in their lives through fitness. 
Contact info: 
Instagram @smphysiquecoaching',
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
                'bio' => 'Hi, I\'m Jack –
I am based at Ultraflex Lincoln. I feel so privileged to work from a top facility I love the atmosphere and sense  community that has been established in such a short space of time. 
I am experienced coach with over 10 years in the fitness industry.
As a competitive natural bodybuilder with a background in rugby and cycling, I bring a hybrid approach to performance, helping people of all ages and abilities achieve powerful transformations. 
My Specialties:
✅ Fat Loss & Body Transformations
✅ Strength & Conditioning
✅ Goal Setting & Accountability
✅ Hybrid Performance Coaching
I love being part of people\'s fitness journeys and watching them grow in strength, confidence, and mindset.
If you see me around the gym, come and say hello — I\'m always happy to chat!
Let\'s smash your goals together!
 
📞 07398 688747
📧 jackbennettpt86@gmail.com',
                'specialties' => ['Fat Loss', 'Body Transformation', 'Strength & Conditioning', 'Hybrid Performance'],
                'certifications' => ['Natural Bodybuilding Competitor'],
                'locationSlug' => 'lincoln',
                'contact' => ['email' => 'jackbennettpt86@gmail.com', 'phone' => '07398 688747']
            ],
            [
                'id' => 401,
                'name' => 'Dawid',
                'slug' => 'dawid',
                'image' => '/Images/PTS/Picture4.webp',
                'bio' => 'I\'m Dawid, a personal trainer at UltraFlex with over 20 years of experience in the gym. I hold Level 2 Gym Instructor and Level 3 Personal Trainer qualifications and specialise in helping clients transform their physiques and elevate their training while maintaining balance in life. Whether you\'re a beginner or an experienced athlete, I\'ll guide you to achieve your best results.

I focus on personal training, performance development, and mental resilience. Together, we\'ll tailor a program that fits your lifestyle and works around your goals—not the other way around.

Ready to unlock your full potential? Contact me to book a session:
Phone: +44 7986 989636
Email: trenujedawid90@gmail.com',
                'specialties' => ['Physique Transformation', 'Performance', 'Mindset'],
                'certifications' => ['Level 2', 'Level 3'],
                'locationSlug' => 'lincoln',
                'contact' => ['phone' => '+44 7986 989636', 'email' => 'trenujedawid90@gmail.com']
            ],
            [
                'id' => 402,
                'name' => 'Joanna Sirostan',
                'slug' => 'joanna-sirostan',
                'image' => '/Images/PTS/Picture5.webp',
                'bio' => 'Hi, I\'m Joanna! As a busy mum to a little girl, I understand the challenges of balancing family life with personal wellness. Staying fit not only benefits me but also sets a strong example for my daughter.

I\'m a certified Personal Trainer, with a Level 2 Fitness Instructor and Level 3 Personal Trainer certification, as well as a Level 1 Precision Nutrition qualification. My fitness journey began at 25 with home workouts, especially during my pregnancy. This sparked my passion for fitness and led me to gym training, where I found my true calling: helping others achieve their fitness goals.

I specialise in creating a supportive environment where my clients can thrive. My focus is on transforming habits and tackling challenges together. I\'m dedicated to unlocking your potential and guiding you towards a healthier, happier life. Whether you want to build strength, lose weight, or simply improve your overall well-being, I\'m here to provide the motivation and expertise you need.

Join me on this transformative journey, and together, we can discover the best version of yourself!

Instagram: @joanna_sirostan  
Tel. Number: 07853804211',
                'specialties' => ['Habit Change', 'Strength', 'Wellness'],
                'certifications' => ['Level 2', 'Level 3', 'PN L1'],
                'locationSlug' => 'lincoln',
                'contact' => ['instagram' => 'https://instagram.com/joanna_sirostan', 'phone' => '07853804211']
            ],
            [
                'id' => 403,
                'name' => 'Dale Bowman',
                'slug' => 'dale-bowman',
                'image' => '/Images/PTS/Picture6.webp',
                'bio' => 'I am a highly experienced Personal Trainer with a Bachelor\'s (Hons) in Sports Development and Coaching, a Level 3 PT certification, and a Nutrition Diploma. As a competitive bodybuilder who has reached the PCA Brits and PCA Worlds, I bring a wealth of knowledge in physique transformation, strength training, and competition prep.
I specialise in coaching individuals over 30, from beginners looking to get fitter and stronger to those aiming for high-level body recomposition or even stepping on stage. My training programs are tailored to suit each client\'s goals, lifestyle, and experience level, ensuring a sustainable and effective approach to fitness.
My coaching services include one-to-one personal training, structured training plans, nutrition coaching, body recomposition guidance, and competition preparation. I also run group training classes, creating a motivating and supportive environment for clients to push their limits.
Having helped over 100+ clients transform their physiques, I focus on delivering expert guidance, accountability, and progressive training strategies. Whether your goal is fat loss, muscle gain, improving overall fitness, or stepping into the competitive world of bodybuilding, I will provide the knowledge, support, and structure to get you there.Your fitness journey starts now—let\'s achieve results together! Dale Bowman 07784355668 dbfitness.lincoln@gmail.com',
                'specialties' => ['Contest Prep', 'Strength', 'Nutrition'],
                'certifications' => ['Level 3', 'Nutrition Diploma'],
                'locationSlug' => 'lincoln',
                'contact' => ['email' => 'dbfitness.lincoln@gmail.com', 'phone' => '07784355668', 'name' => 'Dale Bowman']
            ],
            [
                'id' => 404,
                'name' => 'TC',
                'slug' => 'tc',
                'image' => '/Images/PTS/Picture7.webp',
                'bio' => 'I\'m a Level 3 personal trainer with three years of professional experience and a solid 20-year history as a dedicated gym user. 
My coaching is shaped by my diverse background and life experiences from various jobs. I\'m passionate about helping clients achieve sustainable, long-term mental and physical transformations. I\'m also committed to continuously furthering my education to provide the best possible support for my clients.
Outside of the gym, I\'m actively involved in football and give back to the community through a charity football team. 
As a husband, father of three, and dog dad, I understand the importance of balancing fitness with everyday life. 
tccoaching85@gmail.com 
@coach_by_tc',
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
                'bio' => 'MIRELLA INGAMELLS 
FITNESS COACH 
FORMER PRO FITNESS MODEL
MIRELLA FITNESS LTD  / STRONG BEATS SKINNY®
 
 
As both a coach and athlete, Mirella knows the power of training with purpose and she\'s dedicated to helping women unlock their full potential through lifting. With over 15 years of experience training clients worldwide, both in person and online, she specialises in strength and conditioning, empowering women to build strength and confidence through effective weight training.
 
Her approach goes beyond "fad diets" or chasing a bikini body. Instead, Mirella focuses on helping her clients push past their limits, achieve lasting results, and create a lifestyle that feels sustainable and enjoyable.
 
Mirella proudly placed 2nd at the WBFF World Championships in Las Vegas, and continues to train with a focus on strength, empowerment, and practicing what she preaches.
 
After spending the last 10 years in Ibiza training clients, teaching classes, and hosting wellness retreats, Mirella is now based at Ultraflex Lincoln. She\'s excited to share her passion and inspire more women to lift, get strong, and transform both body and mind.
mirella@mirellafitness.com

https://www.instagram.com/mirella_fitness?igsh=MWYyZnFka21yYmx1bQ== 
https://www.facebook.com/MirellaFitness',
                'specialties' => ['Strength & Conditioning', 'Women\'s Lifting', 'Confidence Building'],
                'certifications' => [],
                'locationSlug' => 'lincoln',
                'gender' => 'Female',
                'experience' => 'Strength and conditioning coach with over 15 years helping women worldwide build strength, confidence and a sustainable lifting lifestyle.',
                'contact' => ['email' => 'mirella@mirellafitness.com', 'instagram' => 'https://www.instagram.com/mirella_fitness?igsh=MWYyZnFka21yYmx1bQ==', 'facebook' => 'https://www.facebook.com/MirellaFitness']
            ],
            // Durham
            [
                'id' => 501,
                'name' => 'James Tindale',
                'slug' => 'james-tindale',
                'image' => '/Images/PTS/Picture8.webp',
                'bio' => '',
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
                'bio' => '',
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
                'bio' => '',
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
                'bio' => '',
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
                'bio' => '',
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
                'bio' => 'Dazz Kent specialises in the fields of general population transformations, nutrition, and stress management; his integrated approach to treatment and education has changed the lives of many of his clients.


Contact details:
 07738689130
 Dazzkentfitness@gmail.com
 @dazzkent (Instagram)',
                'specialties' => ['Transformations', 'Nutrition', 'Stress Management'],
                'certifications' => [],
                'locationSlug' => 'derby',
                'contact' => ['instagram' => 'https://instagram.com/dazzkent', 'email' => 'Dazzkentfitness@gmail.com', 'phone' => '07738689130']
            ],
            [
                'id' => 602,
                'name' => 'Damon Hauge',
                'slug' => 'damon-hauge',
                'image' => '/Images/PTS/Picture14.webp',
                'bio' => 'Damon Hauge 
Ex-professional boxer. I have been involved in sport and exercise all my life. I am passionate about health and fitness, and love to share my experience, knowledge and expertise in training and nutrition. If you want to take your training to the next level, get in touch. 
Contact: 
Phone 07460834333
email dhtraining@gmail.com
Insta @d.htraining',
                'specialties' => ['Boxing', 'Nutrition', 'Strength & Conditioning'],
                'certifications' => [],
                'locationSlug' => 'derby',
                'contact' => ['instagram' => 'https://instagram.com/d.htraining', 'email' => 'dhtraining@gmail.com', 'phone' => '07460834333']
            ],
            // West London
            [
                'id' => 701,
                'name' => 'Allan',
                'slug' => 'allan',
                'image' => '/Images/PTS/Picture15.webp',
                'bio' => 'Are you getting the most out of every session?
Are you getting the most out of every rep?
There\'s no secret code to getting stronger, fitter, or losing those last few pounds. But there is one thing that often gets overlooked:
The fundamentals — and execution.
Understanding how to optimise muscle growth, train efficiently, and get the best out of both weight and cardio training is what truly makes the difference. That\'s where having a Personal Trainer can really help.
Like Michael Jordan said:
"You can practice shooting eight hours a day, but if your technique is wrong, then all you become good at is shooting the wrong way."
When you master the basics, that\'s when real results kick in.
It\'s about knowing how to:
Execute each rep properly
Target the right muscles for growth
Push your body effectively to drop stubborn fat
These are the things I focus on with every client. I\'ll be by your side to guide you, push you, and make sure your training works for you.
So, let\'s get to work. Let\'s hit that goal you\'ve set — and go beyond it.
— Allan, Personal Trainer at Ultraflex West London
Email: Contact@avtfitness.com
Phone: 07714 245 383
Website: www.avtfitness.com
Instagram: @avidity.fitness.uk',
                'specialties' => ['Strength', 'Execution', 'Fat Loss'],
                'certifications' => ['Qualified in Sports Nutrition for Physique Athletes', 'Contest Prep Coach', 'Hypertrophy Training Specialist'],
                'locationSlug' => 'west-london',
                'contact' => ['instagram' => 'https://instagram.com/avidity.fitness.uk', 'email' => 'Contact@avtfitness.com', 'phone' => '07714 245 383', 'website' => 'https://www.avtfitness.com']
            ],
        ];
    }
}
