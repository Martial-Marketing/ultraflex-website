<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\NewsController; // to access posts

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $locations = LocationController::locationsIndexCards();

        // Fetch latest news articles (top 3 by date / id desc)
        $newsController = app(NewsController::class);
        $allPosts = $newsController->posts();
        // Sort by publishedAt/updatedAt fallback then take 3
        $latest = collect($allPosts)
            ->sortByDesc(fn($p) => $p['publishedAt'] ?? $p['date'] ?? '1970-01-01')
            ->take(3)
            ->map(fn($p) => [
                'id' => $p['id'],
                'title' => $p['title'],
                'excerpt' => $p['excerpt'],
                'date' => $p['date'],
                'image' => $p['image'],
                'readTime' => $p['readTime'],
                'slug' => $p['slug'],
                'category' => $p['category']
            ])->values()->all();

        return Inertia::render('Welcome', [
            'auth' => [
                'user' => auth()->user()
            ],
            'latestNews' => $latest,
            'locations' => $locations,
        ]);
    }
}
