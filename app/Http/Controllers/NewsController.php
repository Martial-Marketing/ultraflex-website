<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $articles = [
            [
                'id' => 1,
                'title' => 'New HIIT Classes Starting This Month',
                'excerpt' => 'Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast.',
                'content' => 'We\'re excited to announce the launch of our new HIIT classes starting this month. These high-intensity interval training sessions are designed to maximize your workout efficiency and help you burn calories fast...',
                'date' => 'June 20, 2025',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
                'author' => 'Sarah Johnson',
                'slug' => 'new-hiit-classes-starting-this-month',
                'category' => 'Classes',
                'readTime' => '3 min read',
                'featured' => true
            ],
            [
                'id' => 2,
                'title' => 'UltraFlex Expansion: Coming to Southside',
                'excerpt' => 'We\'re excited to announce our newest location opening in the Southside district this fall.',
                'content' => 'After months of planning and construction, we\'re thrilled to announce that UltraFlex will be opening its fourth location in the vibrant Southside district this fall...',
                'date' => 'June 18, 2025',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
                'author' => 'Mike Chen',
                'slug' => 'ultraflex-expansion-coming-to-southside',
                'category' => 'News',
                'readTime' => '5 min read',
                'featured' => false
            ],
            [
                'id' => 3,
                'title' => 'Summer Fitness Challenge 2025',
                'excerpt' => 'Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals.',
                'content' => 'Summer is here and we\'re launching our biggest fitness challenge yet! The Summer Fitness Challenge 2025 is designed to help you achieve your fitness goals...',
                'date' => 'June 15, 2025',
                'image' => 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop',
                'author' => 'Emma Davis',
                'slug' => 'summer-fitness-challenge-2025',
                'category' => 'Events',
                'readTime' => '4 min read',
                'featured' => true
            ],
            [
                'id' => 4,
                'title' => 'Nutrition Workshop: Meal Prep Mastery',
                'excerpt' => 'Learn how to meal prep like a pro with our certified nutritionists.',
                'content' => 'Join our certified nutritionists for an interactive workshop on meal prep mastery. Learn the secrets to preparing healthy, delicious meals...',
                'date' => 'June 12, 2025',
                'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
                'author' => 'Dr. Lisa Thompson',
                'slug' => 'nutrition-workshop-meal-prep-mastery',
                'category' => 'Nutrition',
                'readTime' => '2 min read',
                'featured' => false
            ],
            [
                'id' => 5,
                'title' => 'Strength Training Fundamentals',
                'excerpt' => 'Master the basics of strength training with our comprehensive guide for beginners.',
                'content' => 'Our comprehensive guide covers everything you need to know about strength training fundamentals...',
                'date' => 'June 10, 2025',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop',
                'author' => 'James Rodriguez',
                'slug' => 'strength-training-fundamentals',
                'category' => 'Training Tips',
                'readTime' => '6 min read',
                'featured' => false
            ],
            [
                'id' => 6,
                'title' => 'Yoga and Mindfulness Workshop',
                'excerpt' => 'Discover the benefits of combining yoga practice with mindfulness meditation.',
                'content' => 'Join us for a transformative workshop combining yoga practice with mindfulness meditation...',
                'date' => 'June 8, 2025',
                'image' => 'https://images.unsplash.com/photo-1506629905607-45a87a2b8082?w=600&h=400&fit=crop',
                'author' => 'Emma Davis',
                'slug' => 'yoga-and-mindfulness-workshop',
                'category' => 'Classes',
                'readTime' => '4 min read',
                'featured' => false
            ]
        ];

        $categories = ['All', 'News', 'Classes', 'Events', 'Nutrition', 'Training Tips'];

        return Inertia::render('News/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'featuredArticles' => array_filter($articles, fn($article) => $article['featured'])
        ]);
    }

    public function show($article)
    {
        // Define all article data
        $allArticleData = [
            'new-hiit-classes-starting-this-month' => [
                'id' => 1,
                'title' => 'New HIIT Classes Starting This Month',
                'content' => 'We\'re excited to announce the launch of our new HIIT classes starting this month. These high-intensity interval training sessions are designed to maximize your workout efficiency and help you burn calories fast.

What is HIIT?

High-Intensity Interval Training (HIIT) is a form of cardiovascular exercise that alternates between short bursts of intense activity and periods of rest or lower-intensity exercise. This method has been proven to be one of the most effective ways to improve cardiovascular fitness while building lean muscle mass.

Benefits of HIIT

Our HIIT classes offer numerous benefits that make them perfect for people with busy schedules. You\'ll burn more calories in less time compared to traditional steady-state cardio. The intense intervals boost your metabolism for hours after your workout, a phenomenon known as the "afterburn effect."

Additionally, HIIT training improves cardiovascular health, builds lean muscle mass, and enhances your body\'s ability to use oxygen efficiently. These classes are suitable for all fitness levels, as our certified trainers will provide modifications for every exercise.

Class Schedule and What to Expect

Our HIIT classes will be available at all UltraFlex locations with the following schedule:

Monday, Wednesday, Friday: 6:00 AM, 12:00 PM, 6:00 PM
Tuesday, Thursday: 7:00 AM, 5:30 PM  
Saturday: 9:00 AM, 11:00 AM
Sunday: 10:00 AM

Each class is 45 minutes long and includes a warm-up, high-intensity intervals, and a cool-down period. Bring water, a towel, and prepare to sweat! Our state-of-the-art facilities provide everything else you need.

Getting Started

Ready to transform your fitness routine? Sign up for your first HIIT class today. New members can try their first class for free, and we offer package deals for those ready to commit to their fitness journey.',
                'excerpt' => 'Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast.',
                'date' => 'June 20, 2025',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
                'author' => 'Sarah Johnson',
                'authorImage' => 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=100&h=100&fit=crop&crop=face',
                'authorBio' => 'Sarah is a certified Personal Trainer and HIIT specialist with over 8 years of experience in the fitness industry. She holds certifications in NASM-CPT and specializes in high-intensity training methods. Sarah is passionate about helping clients achieve their fitness goals through efficient, science-based workout programs.',
                'slug' => 'new-hiit-classes-starting-this-month',
                'category' => 'Classes',
                'readTime' => '3 min read',
                'featured' => true,
                'tags' => ['HIIT', 'Classes', 'Cardio', 'Training', 'High-Intensity'],
                'publishedAt' => 'June 20, 2025',
                'updatedAt' => 'June 21, 2025',
                'views' => 1247,
                'likes' => 89,
                'comments' => [
                    [
                        'id' => 1,
                        'name' => 'Mike Rodriguez',
                        'email' => 'mike.r@email.com',
                        'comment' => 'I\'ve been doing HIIT for 3 months now and the results are incredible! Can\'t wait for these new class times.',
                        'date' => 'June 21, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Jennifer Walsh',
                        'email' => 'jen.walsh@email.com', 
                        'comment' => 'Finally! A Sunday morning class that fits my schedule. Sarah is an amazing instructor.',
                        'date' => 'June 21, 2025'
                    ],
                    [
                        'id' => 3,
                        'name' => 'David Kim',
                        'email' => 'david.kim@email.com',
                        'comment' => 'New to HIIT but excited to try it out. Are these classes beginner-friendly?',
                        'date' => 'June 22, 2025'
                    ]
                ],
                'relatedArticles' => [
                    [
                        'id' => 3,
                        'title' => 'Summer Fitness Challenge 2025',
                        'excerpt' => 'Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals.',
                        'slug' => 'summer-fitness-challenge-2025',
                        'image' => 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop',
                        'category' => 'Events',
                        'date' => 'June 15, 2025',
                        'readTime' => '4 min read'
                    ],
                    [
                        'id' => 5,
                        'title' => 'Strength Training Fundamentals',
                        'excerpt' => 'Master the basics of strength training with our comprehensive guide for beginners.',
                        'slug' => 'strength-training-fundamentals',
                        'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop',
                        'category' => 'Training Tips',
                        'date' => 'June 10, 2025',
                        'readTime' => '6 min read'
                    ]
                ]
            ],
            'ultraflex-expansion-coming-to-southside' => [
                'id' => 2,
                'title' => 'UltraFlex Expansion: Coming to Southside',
                'content' => 'After months of planning and construction, we\'re thrilled to announce that UltraFlex will be opening its fourth location in the vibrant Southside district this fall.

A New Chapter for UltraFlex

This expansion represents a significant milestone in our mission to make high-quality fitness accessible to everyone in our community. The new Southside location will feature our most advanced facilities yet, with cutting-edge equipment and innovative class offerings.

What to Expect at Southside UltraFlex

The new 25,000 square foot facility will include:

- State-of-the-art cardio and strength training equipment
- Dedicated functional training area
- Two group fitness studios with premium sound systems
- Full-service locker rooms with luxury amenities
- Juice bar and healthy snack station
- Outdoor training space for boot camps and yoga
- Kids\' play area for parents who work out

Our signature classes including HIIT, Yoga, Pilates, and strength training will all be available from day one. We\'re also introducing new programs exclusive to the Southside location, including outdoor adventure training and specialized athletic performance coaching.

Construction Progress and Timeline

Construction is currently ahead of schedule, with the grand opening planned for September 15, 2025. The facility will feature the latest in sustainable building practices, including energy-efficient lighting, eco-friendly flooring materials, and a rainwater collection system for landscape irrigation.

Early Bird Membership

Starting July 1st, we\'ll be offering exclusive founding member rates for the Southside location. Founding members will receive significant discounts on membership fees, priority class booking, and access to special events and workshops.

Community Partnership

We\'re committed to being a positive force in the Southside community. Our facility will host free community fitness events, partner with local schools for youth programs, and support neighborhood health initiatives.',
                'excerpt' => 'We\'re excited to announce our newest location opening in the Southside district this fall.',
                'date' => 'June 18, 2025',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop',
                'author' => 'Mike Chen',
                'authorImage' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
                'authorBio' => 'Mike Chen is the Director of Operations at UltraFlex, overseeing facility development and member experience across all locations. With a background in business development and fitness industry management, Mike is passionate about creating spaces that inspire health and wellness.',
                'slug' => 'ultraflex-expansion-coming-to-southside',
                'category' => 'News',
                'readTime' => '5 min read',
                'featured' => false,
                'tags' => ['Expansion', 'News', 'Southside', 'Facilities', 'Community'],
                'publishedAt' => 'June 18, 2025',
                'updatedAt' => 'June 18, 2025',
                'views' => 892,
                'likes' => 156,
                'comments' => [
                    [
                        'id' => 1,
                        'name' => 'Amanda Torres',
                        'email' => 'amanda.torres@email.com',
                        'comment' => 'This is exactly what Southside needed! Can\'t wait for the opening.',
                        'date' => 'June 18, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Robert Kim',
                        'email' => 'robert.kim@email.com',
                        'comment' => 'Love that you\'re including a kids\' area. Finally a gym where I can bring my family!',
                        'date' => 'June 19, 2025'
                    ]
                ],
                'relatedArticles' => [
                    [
                        'id' => 1,
                        'title' => 'New HIIT Classes Starting This Month',
                        'excerpt' => 'Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast.',
                        'slug' => 'new-hiit-classes-starting-this-month',
                        'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
                        'category' => 'Classes',
                        'date' => 'June 20, 2025',
                        'readTime' => '3 min read'
                    ]
                ]
            ],
            'summer-fitness-challenge-2025' => [
                'id' => 3,
                'title' => 'Summer Fitness Challenge 2025',
                'content' => 'Summer is here and we\'re launching our biggest fitness challenge yet! The Summer Fitness Challenge 2025 is designed to help you achieve your fitness goals while having fun and building community with fellow members.

Challenge Overview

Running from July 1st through August 31st, this 8-week challenge is open to all UltraFlex members regardless of fitness level. Participants will compete in teams of 4-6 people, encouraging accountability and support throughout the program.

How It Works

The challenge incorporates multiple fitness components:

Weekly Workout Goals: Complete a minimum number of workouts each week across different categories (cardio, strength, flexibility)
Nutrition Tracking: Log your meals and hit daily nutrition targets
Step Challenge: Daily step goals with team competitions
Specialty Classes: Attend featured classes each week for bonus points
Community Service: Participate in fitness-related volunteer activities

Teams earn points for each completed activity, with bonus points for consistency and team participation. The scoring system is designed to reward effort and improvement rather than just raw performance.

Prizes and Recognition

We\'ve partnered with local businesses to offer amazing prizes:

Grand Prize Team: $500 gift cards each to premium athletic wear store
Individual Category Winners: Fitness equipment packages worth $300
Weekly Challenge Winners: Healthy meal prep services
Participation Prizes: UltraFlex merchandise and guest passes

But the real prize is the transformation you\'ll experience over these 8 weeks!

Getting Started

Registration opens June 25th at all UltraFlex locations and online. The registration fee is just $25 per person, which includes:

- Custom challenge t-shirt
- Weekly group coaching sessions
- Access to exclusive challenge app
- Nutrition consultation with our registered dietitian
- Body composition analysis at start and finish

Join the Movement

This challenge is about more than just competition – it\'s about building lasting healthy habits and connecting with our amazing UltraFlex community. Whether you\'re just starting your fitness journey or you\'re a seasoned athlete, this challenge will push you to new heights.',
                'excerpt' => 'Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals.',
                'date' => 'June 15, 2025',
                'image' => 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=500&fit=crop',
                'author' => 'Emma Davis',
                'authorImage' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
                'authorBio' => 'Emma Davis is our Wellness Program Director, specializing in creating engaging fitness challenges and community events. With her background in exercise science and group fitness, Emma loves helping members achieve their goals through fun, inclusive programs.',
                'slug' => 'summer-fitness-challenge-2025',
                'category' => 'Events',
                'readTime' => '4 min read',
                'featured' => true,
                'tags' => ['Challenge', 'Summer', 'Community', 'Competition', 'Team'],
                'publishedAt' => 'June 15, 2025',
                'updatedAt' => 'June 16, 2025',
                'views' => 2156,
                'likes' => 298,
                'comments' => [
                    [
                        'id' => 1,
                        'name' => 'Jessica Martinez',
                        'email' => 'jessica.m@email.com',
                        'comment' => 'I\'m so excited for this! Already started putting together my team.',
                        'date' => 'June 15, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Carlos Rodriguez',
                        'email' => 'carlos.r@email.com',
                        'comment' => 'This is exactly the motivation I needed. Count me in!',
                        'date' => 'June 16, 2025'
                    ],
                    [
                        'id' => 3,
                        'name' => 'Alicia Wang',
                        'email' => 'alicia.wang@email.com',
                        'comment' => 'Love that this focuses on improvement rather than just performance. Perfect for beginners like me!',
                        'date' => 'June 16, 2025'
                    ]
                ],
                'relatedArticles' => [
                    [
                        'id' => 1,
                        'title' => 'New HIIT Classes Starting This Month',
                        'excerpt' => 'Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast.',
                        'slug' => 'new-hiit-classes-starting-this-month',
                        'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
                        'category' => 'Classes',
                        'date' => 'June 20, 2025',
                        'readTime' => '3 min read'
                    ],
                    [
                        'id' => 4,
                        'title' => 'Nutrition Workshop: Meal Prep Mastery',
                        'excerpt' => 'Learn how to meal prep like a pro with our certified nutritionists.',
                        'slug' => 'nutrition-workshop-meal-prep-mastery',
                        'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
                        'category' => 'Nutrition',
                        'date' => 'June 12, 2025',
                        'readTime' => '2 min read'
                    ]
                ]
            ],
            'nutrition-workshop-meal-prep-mastery' => [
                'id' => 4,
                'title' => 'Nutrition Workshop: Meal Prep Mastery',
                'content' => 'Join our certified nutritionists for an interactive workshop on meal prep mastery. Learn the secrets to preparing healthy, delicious meals that fuel your fitness goals and simplify your busy lifestyle.

Why Meal Prep Matters

Meal preparation is one of the most effective strategies for maintaining a healthy diet and achieving your fitness goals. When you have nutritious meals ready to go, you\'re less likely to reach for processed foods or make impulsive food choices that don\'t align with your health objectives.

Our research shows that members who consistently meal prep are 3x more likely to stick to their nutrition goals and see faster results from their training programs.

What You\'ll Learn

This hands-on workshop covers everything you need to become a meal prep pro:

Planning and Shopping: How to plan balanced meals for the week, create efficient shopping lists, and choose the best ingredients for your goals.

Prep Techniques: Time-saving cooking methods, proper food storage, and batch cooking strategies that maximize your prep time.

Recipe Development: Learn to modify your favorite recipes to make them healthier and more meal-prep friendly.

Portion Control: Understanding proper portion sizes and how to meal prep for different caloric needs and fitness goals.

Food Safety: Proper storage techniques, shelf life guidelines, and how to keep your prepped meals fresh and safe.

Workshop Details

Date: Saturday, July 6th, 2025
Time: 10:00 AM - 2:00 PM
Location: UltraFlex Downtown (Kitchen Studio)
Cost: $45 for members, $65 for non-members
Includes: All ingredients, containers, recipe booklet, and a take-home meal

During the workshop, you\'ll prepare 4 different meals that you can take home, plus get templates for dozens of other meal prep combinations. Our registered dietitians will be there to answer questions about nutrition for your specific goals.

Registration and Special Offers

Space is limited to 20 participants to ensure personalized attention. Register at the front desk or online by June 30th. 

Members who attend the workshop will receive a 20% discount on our meal prep container sets and a free nutrition consultation to create a personalized meal plan.',
                'excerpt' => 'Learn how to meal prep like a pro with our certified nutritionists.',
                'date' => 'June 12, 2025',
                'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop',
                'author' => 'Dr. Lisa Thompson',
                'authorImage' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
                'authorBio' => 'Dr. Lisa Thompson is a registered dietitian and nutrition consultant with over 10 years of experience in sports nutrition and meal planning. She holds a PhD in Nutritional Sciences and specializes in helping athletes and fitness enthusiasts optimize their performance through proper nutrition.',
                'slug' => 'nutrition-workshop-meal-prep-mastery',
                'category' => 'Nutrition',
                'readTime' => '2 min read',
                'featured' => false,
                'tags' => ['Nutrition', 'Meal Prep', 'Workshop', 'Healthy Eating', 'Cooking'],
                'publishedAt' => 'June 12, 2025',
                'updatedAt' => 'June 12, 2025',
                'views' => 756,
                'likes' => 124,
                'comments' => [
                    [
                        'id' => 1,
                        'name' => 'Maria Gonzalez',
                        'email' => 'maria.g@email.com',
                        'comment' => 'Perfect timing! I\'ve been struggling with meal prep. Can\'t wait to learn proper techniques.',
                        'date' => 'June 12, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Tony Chen',
                        'email' => 'tony.chen@email.com',
                        'comment' => 'Dr. Thompson\'s nutrition advice has been game-changing for my training. Highly recommend!',
                        'date' => 'June 13, 2025'
                    ]
                ],
                'relatedArticles' => [
                    [
                        'id' => 3,
                        'title' => 'Summer Fitness Challenge 2025',
                        'excerpt' => 'Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals.',
                        'slug' => 'summer-fitness-challenge-2025',
                        'image' => 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop',
                        'category' => 'Events',
                        'date' => 'June 15, 2025',
                        'readTime' => '4 min read'
                    ]
                ]
            ],
            'strength-training-fundamentals' => [
                'id' => 5,
                'title' => 'Strength Training Fundamentals',
                'content' => 'Master the basics of strength training with our comprehensive guide for beginners. Whether you\'re new to the gym or looking to refine your technique, this guide covers everything you need to know to start building strength safely and effectively.

Getting Started with Strength Training

Strength training, also known as resistance training, involves exercises that improve strength and endurance by working your muscles against resistance. This resistance can come from free weights, machines, resistance bands, or even your own body weight.

The benefits of strength training extend far beyond building muscle. Regular resistance training improves bone density, boosts metabolism, enhances functional movement, and can help prevent injuries in daily activities and sports.

Basic Principles

Progressive Overload: Gradually increasing the weight, frequency, or number of repetitions to continuously challenge your muscles.

Proper Form: Quality always trumps quantity. Perfect your technique with lighter weights before progressing to heavier loads.

Rest and Recovery: Muscles grow during rest periods, not during workouts. Allow 48-72 hours between training the same muscle groups.

Consistency: Regular training 2-3 times per week will yield better results than sporadic intense sessions.

Essential Exercises for Beginners

Start with these fundamental movements that work multiple muscle groups:

Squats: The king of lower body exercises, working your quadriceps, hamstrings, and glutes.
Deadlifts: A full-body movement that primarily targets your posterior chain.
Push-ups: A versatile upper body exercise that can be modified for any fitness level.
Rows: Essential for building back strength and improving posture.
Planks: Core strengthening that improves stability and supports all other movements.

Programming Your Workouts

As a beginner, start with 2-3 full-body workouts per week. Each session should include:

- 5-10 minute warm-up
- 4-6 strength exercises
- 2-3 sets of 8-12 repetitions
- 10-15 minute cool-down and stretching

Focus on learning proper form with bodyweight exercises or light weights before adding significant resistance.

Safety and Injury Prevention

Always warm up before lifting and cool down afterward. If you\'re unsure about proper form, consider working with a personal trainer for your first few sessions. Listen to your body and don\'t train through pain.

Our certified trainers at UltraFlex are always available to help you perfect your technique and design a program that fits your goals and fitness level.',
                'excerpt' => 'Master the basics of strength training with our comprehensive guide for beginners.',
                'date' => 'June 10, 2025',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=500&fit=crop',
                'author' => 'James Rodriguez',
                'authorImage' => 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&h=100&fit=crop&crop=face',
                'authorBio' => 'James Rodriguez is a Certified Strength and Conditioning Specialist (CSCS) with 5+ years of experience in athletic performance and strength training. He specializes in helping beginners build a strong foundation while working with athletes to optimize their performance.',
                'slug' => 'strength-training-fundamentals',
                'category' => 'Training Tips',
                'readTime' => '6 min read',
                'featured' => false,
                'tags' => ['Strength Training', 'Beginners', 'Fundamentals', 'Safety', 'Technique'],
                'publishedAt' => 'June 10, 2025',
                'updatedAt' => 'June 11, 2025',
                'views' => 1834,
                'likes' => 267,
                'comments' => [
                    [
                        'id' => 1,
                        'name' => 'Rachel Thompson',
                        'email' => 'rachel.t@email.com',
                        'comment' => 'This is exactly what I needed as a complete beginner. Thank you for breaking it down so clearly!',
                        'date' => 'June 10, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Michael Johnson',
                        'email' => 'michael.j@email.com',
                        'comment' => 'Great reminder about progressive overload. I see too many people trying to lift too heavy too soon.',
                        'date' => 'June 11, 2025'
                    ],
                    [
                        'id' => 3,
                        'name' => 'Sophie Williams',
                        'email' => 'sophie.w@email.com',
                        'comment' => 'James, could you do a follow-up article on programming for intermediate lifters?',
                        'date' => 'June 11, 2025'
                    ]
                ],
                'relatedArticles' => [
                    [
                        'id' => 1,
                        'title' => 'New HIIT Classes Starting This Month',
                        'excerpt' => 'Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast.',
                        'slug' => 'new-hiit-classes-starting-this-month',
                        'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
                        'category' => 'Classes',
                        'date' => 'June 20, 2025',
                        'readTime' => '3 min read'
                    ]
                ]
            ],
            'yoga-and-mindfulness-workshop' => [
                'id' => 6,
                'title' => 'Yoga and Mindfulness Workshop',
                'content' => 'Join us for a transformative workshop combining yoga practice with mindfulness meditation. This unique experience is designed to help you develop both physical flexibility and mental clarity, creating a deeper mind-body connection.

The Mind-Body Connection

In our fast-paced world, it\'s easy to become disconnected from our bodies and caught up in mental chatter. Yoga and mindfulness practices offer powerful tools for reuniting mind and body, creating a sense of inner peace and improved overall well-being.

Research shows that combining yoga with mindfulness meditation can reduce stress hormones, improve sleep quality, boost immune function, and increase emotional resilience. This workshop will teach you practical techniques you can use both on and off the mat.

What to Expect

Our 3-hour workshop includes:

Gentle Yoga Flow: A sequence of poses designed to increase flexibility, strength, and body awareness. Suitable for all levels with modifications provided.

Mindfulness Meditation: Learn various meditation techniques including breathing exercises, body scans, and mindful movement.

Yoga Philosophy: Brief introduction to the philosophical foundations of yoga and how they apply to modern life.

Integration Practices: Techniques for bringing mindfulness into your daily routine and regular workouts.

The workshop will be led by Emma Davis, our experienced yoga instructor, along with guest meditation teacher Dr. Sarah Chen, who specializes in mindfulness-based stress reduction.

Workshop Benefits

Participants often experience:

- Reduced stress and anxiety
- Improved flexibility and balance
- Better sleep quality
- Enhanced focus and concentration
- Greater emotional regulation
- Deeper connection to their body and breath

No prior yoga or meditation experience is necessary. We provide all equipment including mats, blocks, and bolsters.

Practical Information

Date: Sunday, July 14th, 2025
Time: 2:00 PM - 5:00 PM
Location: UltraFlex North (Studio A)
Cost: $35 for members, $50 for non-members
Includes: All equipment, guided practice recordings, and herbal tea

Wear comfortable clothing that allows for movement. We recommend arriving 15 minutes early to get settled and set intentions for your practice.

Taking It Home

All participants will receive recordings of the guided meditations and a handout with yoga sequences you can practice at home. We\'ll also provide information about our ongoing yoga and meditation classes for those who want to continue their practice.',
                'excerpt' => 'Discover the benefits of combining yoga practice with mindfulness meditation.',
                'date' => 'June 8, 2025',
                'image' => 'https://images.unsplash.com/photo-1506629905607-45a87a2b8082?w=800&h=500&fit=crop',
                'author' => 'Emma Davis',
                'authorImage' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
                'authorBio' => 'Emma Davis is a certified yoga instructor (RYT-500) and wellness coach with over 10 years of experience. She specializes in integrating mindfulness practices with physical movement to help students develop greater body awareness and emotional balance.',
                'slug' => 'yoga-and-mindfulness-workshop',
                'category' => 'Classes',
                'readTime' => '4 min read',
                'featured' => false,
                'tags' => ['Yoga', 'Mindfulness', 'Meditation', 'Wellness', 'Workshop'],
                'publishedAt' => 'June 8, 2025',
                'updatedAt' => 'June 8, 2025',
                'views' => 623,
                'likes' => 98,
                'comments' => [
                    [
                        'id' => 1,
                        'name' => 'Jennifer Liu',
                        'email' => 'jennifer.liu@email.com',
                        'comment' => 'I\'ve been wanting to try meditation but didn\'t know where to start. This sounds perfect!',
                        'date' => 'June 8, 2025'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Mark Stevens',
                        'email' => 'mark.stevens@email.com',
                        'comment' => 'Emma\'s yoga classes have been life-changing for my stress levels. Can\'t wait for this workshop!',
                        'date' => 'June 9, 2025'
                    ]
                ],
                'relatedArticles' => [
                    [
                        'id' => 3,
                        'title' => 'Summer Fitness Challenge 2025',
                        'excerpt' => 'Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals.',
                        'slug' => 'summer-fitness-challenge-2025',
                        'image' => 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop',
                        'category' => 'Events',
                        'date' => 'June 15, 2025',
                        'readTime' => '4 min read'
                    ]
                ]
            ]
        ];

        // Get the article data based on the slug
        $articleData = $allArticleData[$article] ?? null;

        // If article not found, you might want to handle this with a 404
        if (!$articleData) {
            abort(404, 'Article not found');
        }

        return Inertia::render('News/Show', [
            'article' => $articleData
        ]);
    }
}