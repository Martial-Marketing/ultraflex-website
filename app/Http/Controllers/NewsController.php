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
            'content' => '
                <p>We\'re excited to announce the launch of our new HIIT classes starting this month. These high-intensity interval training sessions are designed to maximize your workout efficiency and help you burn calories fast.</p>
                
                <h2>What is HIIT?</h2>
                <p>High-Intensity Interval Training (HIIT) is a form of cardiovascular exercise that alternates between short bursts of intense activity and periods of rest or lower-intensity exercise.</p>
                
                <h2>Benefits of HIIT</h2>
                <ul>
                    <li>Burns more calories in less time</li>
                    <li>Improves cardiovascular health</li>
                    <li>Builds lean muscle mass</li>
                    <li>Boosts metabolism for hours after workout</li>
                </ul>
                
                <h2>Class Schedule</h2>
                <p>Our HIIT classes will be available at all UltraFlex locations:</p>
                <ul>
                    <li>Monday, Wednesday, Friday: 6:00 AM, 12:00 PM, 6:00 PM</li>
                    <li>Tuesday, Thursday: 7:00 AM, 5:30 PM</li>
                    <li>Saturday: 9:00 AM, 11:00 AM</li>
                    <li>Sunday: 10:00 AM</li>
                </ul>
            ',
            'excerpt' => 'Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast.',
            'date' => 'June 20, 2025',
            'image' => '/images/news/hiit.jpg',
            'author' => [
                'name' => 'Sarah Johnson',
                'image' => '/images/authors/sarah.jpg',
                'bio' => 'Certified Personal Trainer and HIIT specialist with 8+ years of experience.'
            ],
            'slug' => 'new-hiit-classes-starting-this-month',
            'category' => 'Classes',
            'readTime' => '3 min read',
            'tags' => ['HIIT', 'Classes', 'Cardio', 'Training'],
            'relatedArticles' => [
                [
                    'id' => 2,
                    'title' => 'Summer Fitness Challenge 2025',
                    'slug' => 'summer-fitness-challenge-2025',
                    'image' => '/images/news/challenge.jpg',
                    'date' => 'June 15, 2025'
                ],
                [
                    'id' => 3,
                    'title' => 'Nutrition Workshop: Meal Prep Mastery',
                    'slug' => 'nutrition-workshop-meal-prep-mastery',
                    'image' => '/images/news/nutrition-workshop.jpg',
                    'date' => 'June 12, 2025'
                ]
            ]
        ];

        return Inertia::render('News/Show', [
            'article' => $articleData
        ]);
    }
}