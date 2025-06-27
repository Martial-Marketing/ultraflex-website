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
                'image' => '/images/news/hiit.jpg',
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
                'image' => '/images/news/expansion.jpg',
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
                'image' => '/images/news/challenge.jpg',
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
                'image' => '/images/news/nutrition-workshop.jpg',
                'author' => 'Dr. Lisa Thompson',
                'slug' => 'nutrition-workshop-meal-prep-mastery',
                'category' => 'Nutrition',
                'readTime' => '2 min read',
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
        // In a real app, you'd fetch this from the database by slug
        $articleData = [
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
            'image' => '/images/news/hiit.jpg',
            'author' => 'Sarah Johnson',
            'authorImage' => '/images/authors/sarah.jpg',
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
                    'id' => 2,
                    'title' => 'Summer Fitness Challenge 2025',
                    'excerpt' => 'Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals.',
                    'slug' => 'summer-fitness-challenge-2025',
                    'image' => '/images/news/challenge.jpg',
                    'category' => 'Events',
                    'date' => 'June 15, 2025',
                    'readTime' => '4 min read'
                ],
                [
                    'id' => 3,
                    'title' => 'Nutrition Workshop: Meal Prep Mastery',
                    'excerpt' => 'Learn how to meal prep like a pro with our certified nutritionists.',
                    'slug' => 'nutrition-workshop-meal-prep-mastery',
                    'image' => '/images/news/nutrition-workshop.jpg',
                    'category' => 'Nutrition',
                    'date' => 'June 12, 2025',
                    'readTime' => '2 min read'
                ],
                [
                    'id' => 4,
                    'title' => 'Strength Training Fundamentals',
                    'excerpt' => 'Master the basics of strength training with our comprehensive guide for beginners.',
                    'slug' => 'strength-training-fundamentals',
                    'image' => '/images/news/strength-training.jpg',
                    'category' => 'Training Tips',
                    'date' => 'June 10, 2025',
                    'readTime' => '6 min read'
                ]
            ]
        ];

        return Inertia::render('News/Show', [
            'article' => $articleData
        ]);
    }
}