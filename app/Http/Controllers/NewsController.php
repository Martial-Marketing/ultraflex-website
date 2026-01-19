<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $posts = $this->posts();
        $articles = collect($posts)->map(fn($p) => [
            'id' => $p['id'],
            'title' => $p['title'],
            'excerpt' => $p['excerpt'],
            'content' => $p['content'],
            'date' => $p['date'],
            'image' => $p['image'],
            'author' => $p['author'],
            'slug' => $p['slug'],
            'category' => $p['category'],
            'readTime' => $p['readTime'],
            'featured' => $p['featured'] ?? false,
        ])->values()->all();

        $categories = array_values(array_unique(array_merge(['All'], collect($posts)->pluck('category')->all())));

        return Inertia::render('News/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'featuredArticles' => array_filter($articles, fn($article) => $article['featured'])
        ]);
    }

    public function show(string $slug)
    {
        $posts = $this->posts();
        if (!isset($posts[$slug])) {
            abort(404);
        }
        return Inertia::render('News/Show', [
            'article' => $posts[$slug]
        ]);
    }

    public function posts(): array
    {
        return [
            '10-minute-power-hour-quick-hit-workouts' => [
                'id' => 1,
                'title' => 'The 10-Minute Power Hour: ULTRAFLEX’s Quick-Hit Workouts for Busy People',
                'slug' => '10-minute-power-hour-quick-hit-workouts',
                'category' => 'Training',
                'featured' => true,
                'date' => 'Oct 8, 2025',
                'readTime' => '5 min read',
                'author' => 'ULTRAFLEX Performance Team',
                'authorImage' => '/Images/newimages/West Leeds/gym-in-westleeds.webp',
                'authorBio' => 'ULTRAFLEX Performance Coaches combine decades of practical experience with evidence-based methods to help members train smarter in less time.',
                'image' => '/Images/news/gym-in-lincoln-3.webp',
                'excerpt' => 'Short on time? Harness metabolic ignition with focused 10‑minute HIIT protocols that drive EPOC and build a more efficient engine.',
                'content' => implode("\n\n", [
                    'Struggling to find time? Life is demanding, but your fitness shouldn’t pay the price. Ten minutes is enough—when intensity, movement selection and intent are dialed in.',
                    'The secret is High-Intensity Interval Training (HIIT) driving EPOC (Excess Post-Exercise Oxygen Consumption). You finish in 10, but your metabolism keeps humming for hours as your body restores oxygen balance and repairs tissue.',
                    'ULTRAFLEX 10‑Minute Routines:',
                    'Lunch Break Blitz (Full Body) – 60s on / 15s transition, 2 rounds:\n1. Squat Jumps\n2. Push-Ups (knees or toes)\n3. Mountain Climbers\n4. Reverse Lunges (alternating)\n5. Burpees',
                    'Morning Igniter (Core & Mobility):\n1. High Plank (30s)\n2. Spiderman Planks (30s)\n3. Glute Bridge (60s)\n4. World’s Greatest Stretch (1 min/side)\n5. Hollow Body Hold (max)',
                    'Progression Tips: Track total quality reps, reduce transitions, or add a weighted vest sparingly. Master intent before load.',
                    'Ten minutes executed with precision beats sixty minutes of distracted, low-effort volume. Consistency + density = change.'
                ]),
                'tags' => ['HIIT', 'Efficiency', 'Metabolism', 'Time-Crunched'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
            'strength-vs-cardio-ULTRAFLEX-showdown' => [
                'id' => 2,
                'title' => 'Strength vs. Cardio: The Ultimate ULTRAFLEX Showdown',
                'slug' => 'strength-vs-cardio-ULTRAFLEX-showdown',
                'category' => 'Training',
                'featured' => true,
                'date' => 'Oct 8, 2025',
                'readTime' => '6 min read',
                'author' => 'ULTRAFLEX Coaching Team',
                'authorImage' => '/Images/newimages/North Leeds/gym-in-northleeds.webp',
                'authorBio' => 'Our coaching collective specialises in hybrid performance—strength, conditioning and sustainable physique development.',
                'image' => '/Images/news/gym-in-rotherham.webp',
                'excerpt' => 'Strength builds the metabolic foundation; cardio expands the engine. The magic is programming synergy—not choosing a side.',
                'content' => implode("\n\n", [
                    'The debate is tired: weight rack or treadmill? At ULTRAFLEX, it’s integration over isolation—stimulus pairing for accelerated adaptation.',
                    'Team Strength (The Sculptor): Lean mass elevates basal metabolic rate, drives insulin sensitivity, fortifies joints and bone density. It is the chassis on which all performance sits.',
                    'Team Cardio (The Engine): Aerobic capacity improves VO2 max, recovery between sets, mitochondrial efficiency and systemic health markers.',
                    'Goal-Based Ratios:\n• Sustainable Fat Loss: ~70% strength / 30% cardio\n• Endurance Focus: ~70% cardio / 30% strength\n• Longevity & General Health: 50 / 50 hybrid\n• Hybrid Performance: Periodised blocks emphasising one quality while maintaining the other.',
                    'Implementation Layer: Pair lower-body strength with upper-body conditioning days to spread fatigue. Anchor progressive overload while rotating conditioning modalities (row, sled, assault bike).',
                    'Synergy > Purism. Programme both with intent and your progress compounds.'
                ]),
                'tags' => ['Strength', 'Cardio', 'Hybrid', 'Programming'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
            'science-of-gains-master-progressive-overload' => [
                'id' => 3,
                'title' => 'The Science of Gains: Master Progressive Overload and Stop Wasting Workouts',
                'slug' => 'science-of-gains-master-progressive-overload',
                'category' => 'Training',
                'featured' => true,
                'date' => 'Oct 8, 2025',
                'readTime' => '7 min read',
                'author' => 'ULTRAFLEX Performance Team',
                'authorImage' => '/Images/newimages/North Leeds/gym-in-northleeds-2.webp',
                'authorBio' => 'ULTRAFLEX coaches engineer evidence-based progression models that turn effort into measurable adaptation.',
                'image' => '/Images/news/gym-in-northleeds-5.webp',
                'excerpt' => 'If your loads and reps are static, so are your results. Progressive Overload is the engine—master the levers, stop spinning your wheels.',
                'content' => implode("\n\n", [
                    'If you\'re still lifting the same weight for the same reps you were three months ago, you’re training to maintain, not to grow. Progressive Overload (P.O.) is the non‑negotiable driver of continued adaptation.',
                    'What It Really Is: Gradually increasing stress on the musculoskeletal system so repair demands exceed prior baseline, forcing adaptation. Muscle only upgrades when compelled.',
                    'ULTRAFLEX 5 Methods of Progressive Overload:',
                    '1. Increase Resistance (Weight): Add 2.5–5 lbs once you own the top of the rep range with clean form.\n2. Increase Volume: More quality reps or an extra working set when RIR (reps in reserve) > 2.\n3. Increase Density: Same total work—less rest—raising metabolic stress without changing load.\n4. Increase Frequency: Hit the target muscle 3x/week instead of 2x—distributed fatigue, higher weekly stimulus.\n5. Increase Time Under Tension: Controlled eccentrics (2–4s) amplify mechanical tension.',
                    'Pick ONE primary lever each mesocycle. Stacking all five simultaneously = recovery debt and stalled progress.',
                    'Execution Checklist:\n• Log every working set.\n• Maintain 1–3 RIR on hypertrophy sets.\n• Deload every 5–7 weeks or upon systemic fatigue markers (sleep disruption, joint irritation, plateau).',
                    'Progress isn’t accidental—it’s architected.'
                ]),
                'tags' => ['Progressive Overload', 'Strength', 'Hypertrophy', 'Programming'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
            'pre-workout-fuel-vs-post-workout-repair' => [
                'id' => 4,
                'title' => 'Pre-Workout Fuel vs. Post-Workout Repair: Maximising Every Session',
                'slug' => 'pre-workout-fuel-vs-post-workout-repair',
                'category' => 'Nutrition',
                'featured' => false,
                'date' => 'Oct 8, 2025',
                'readTime' => '6 min read',
                'author' => 'ULTRAFLEX Nutrition Team',
                'authorImage' => '/Images/newimages/Lincoln/gym-in-lincoln-2.webp',
                'authorBio' => 'Our nutrition specialists design fuelling frameworks that convert training stimulus into adaptation.',
                'image' => '/Images/newimages/North Leeds/gym-in-northleeds-4.webp',
                'excerpt' => 'Pre primes performance. Post rebuilds and accelerates readiness. Nail both windows and compound session quality over time.',
                'content' => implode("\n\n", [
                    'Are you eating with intent—or just eating? Precision nutrition turns a good session into a great one.',
                    'Pre-Workout Goal: Stable energy + minimal GI stress.',
                    'What to Consume: Rapid-to-moderate digesting carbohydrates to top off muscle glycogen + ~20–25g lean protein to blunt muscle protein breakdown.',
                    'Timing: 60–90 min pre = small mixed meal (e.g., rice + chicken + fruit). <30 min = easily digested carbs (banana, hydrolysed carb powder).',
                    'Intra (if >75–90 min or high density): 10–20g cyclic dextrin + electrolytes.',
                    'Post-Workout Priority: Replenish glycogen and initiate Muscle Protein Synthesis.',
                    'What to Consume: 3–4:1 carb:protein ratio using high-GI carbs + fast protein (whey isolate).',
                    'The Window: The “30‑minute anabolic window” is overstated—but earlier intake accelerates total recovery curve. Aim for within 1–2 hours.',
                    'Principle: Consistency of pre/post strategy > perfection of a single meal.'
                ]),
                'tags' => ['Nutrition', 'Recovery', 'Fueling', 'Performance'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
            'sleep-recovery-secret-weapon' => [
                'id' => 5,
                'title' => 'Beyond the Basics: Sleep & Recovery—The Overlooked Secret Weapon',
                'slug' => 'sleep-recovery-secret-weapon',
                'category' => 'Recovery',
                'featured' => false,
                'date' => 'Oct 8, 2025',
                'readTime' => '7 min read',
                'author' => 'ULTRAFLEX Recovery Team',
                'authorImage' => '/Images/newimages/Rotherham/gym-in-rotherham-2.webp',
                'authorBio' => 'Recovery strategists focused on nervous system balance, tissue regeneration and readiness metrics.',
                'image' => '/Images/newimages/West Leeds/gym-in-westleeds-2.webp',
                'excerpt' => 'You don’t grow in the gym—you grow when you recover. Sleep is the amplifier; structured recovery prevents systemic fatigue.',
                'content' => implode("\n\n", [
                    'You train hard. But are you creating conditions for adaptation? Growth, neural recalibration and tissue repair occur when you\'re not lifting.',
                    'Sleep Hormone Cocktail: Deep sleep pulses Growth Hormone, optimises testosterone, and suppresses cortisol—foundations for recomposition.',
                    'Beyond Sleep: Active recovery (walking / light cycle), myofascial release, and parasympathetic activation keep tissue pliable and CNS fresh.',
                    'ULTRAFLEX 5-Step Sleep Hygiene Protocol:\n1. Cool Room (slightly below typical daytime comfort).\n2. Consistent Sleep/Wake Schedule—even weekends.\n3. Screen Dim + Blue Light Reduction 60 mins pre-bed.\n4. Magnesium (if deficient) + calming pre-sleep routine.\n5. Diaphragmatic Breathing: 5 minutes to cue parasympathetic dominance.',
                    'System Audit Markers: Elevated resting HR, mood volatility, plateaus = recovery debt signals.',
                    'Recovery isn’t passive—it’s a programmed variable.'
                ]),
                'tags' => ['Sleep', 'Recovery', 'Hormones', 'Readiness'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
            'consistency-conundrum-3-pillars' => [
                'id' => 6,
                'title' => 'The Consistency Conundrum: 3 Pillars to Never Missing Workouts',
                'slug' => 'consistency-conundrum-3-pillars',
                'category' => 'Mindset',
                'featured' => false,
                'date' => 'Oct 8, 2025',
                'readTime' => '5 min read',
                'author' => 'ULTRAFLEX Coaching Team',
                'authorImage' => '/Images/newimages/Lincoln/gym-in-lincoln.webp',
                'authorBio' => 'We build durable training identities—habits that sustain performance through life demands.',
                'image' => '/Images/newimages/North Leeds/gym-in-northleeds-3.webp',
                'excerpt' => 'Motivation fades. Identity and structured friction reduction keep you showing up when emotion dips.',
                'content' => implode("\n\n", [
                    'Motivation is transient; consistency is engineered. Treat attendance as the primary KPI.',
                    'Pillar 1 – Progress > Perfection: A shortened session beats a skipped session. The all‑or‑nothing fallacy kills training momentum.',
                    'Pillar 2 – Identity-Based Goals: Shift from outcome (“lose 10 lbs”) to identity (“I am an athlete who doesn\'t miss Monday”). Identity cements behaviour.',
                    'Pillar 3 – The 5-Minute Rule: Commit to starting. After 5 minutes you can stop—momentum almost always carries you through.',
                    'Consistency is a system: environment design, friction reduction, and ritualised cues.'
                ]),
                'tags' => ['Consistency', 'Habits', 'Mindset', 'Discipline'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
            'rest-days-secret-weapon' => [
                'id' => 7,
                'title' => 'Rest Days Are NOT a Weakness: Your Secret Weapon for Stronger Sessions',
                'slug' => 'rest-days-secret-weapon',
                'category' => 'Recovery',
                'featured' => false,
                'date' => 'Oct 8, 2025',
                'readTime' => '6 min read',
                'author' => 'ULTRAFLEX Recovery Team',
                'authorImage' => '/Images/newimages/Rotherham/gym-in-rotherham-3.webp',
                'authorBio' => 'We optimise training cadence—strategic rest drives peak performance output.',
                'image' => '/Images/newimages/West Leeds/gym-in-westleeds-3.webp',
                'excerpt' => 'Rest isn’t retreat—it’s strategic recalibration. Under‑recover and progress plateaus despite effort.',
                'content' => implode("\n\n", [
                    'Hustle culture glorifies nonstop training. Physiology disagrees. Without recovery consolidation, stimulus equals fatigue— not adaptation.',
                    'Muscle Rebuild: Resistance training creates micro‑trauma; rest enables protein synthesis phases to complete. Chronic disruption = stagnation.',
                    'CNS Reset: High-intensity frequency taxes neural drive. Signs of CNS fatigue: mood dip, sleep fragmentation, bar speed decay.',
                    'Active Rest Framework: Low‑impact locomotion (walk, light cycle), mobility flow, tissue quality work. Move nutrients in; move waste out.',
                    'Prescription: 1–2 full rest days weekly + deload weeks strategically. Recovery scales progress— not weakness.',
                    'Rest with intent; return with capacity.'
                ]),
                'tags' => ['Rest', 'Recovery', 'Programming', 'CNS'],
                'publishedAt' => '2025-10-08',
                'updatedAt' => '2025-10-08',
                'views' => 0,
                'likes' => 0,
                'comments' => [],
                'relatedArticles' => []
            ],
        ];
    }
}