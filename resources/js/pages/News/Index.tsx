import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    author: string;
    slug: string;
    category: string;
    readTime: string;
    featured: boolean;
}

interface NewsIndexProps {
    articles: Article[];
    categories: string[];
    featuredArticles: Article[];
    auth: {
        user: any;
    };
}

export default function NewsIndex({ articles, categories, featuredArticles, auth }: NewsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;

    // Filter articles based on search and category
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.author.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Paginate articles
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'News': 'bg-red-700/20 text-red-700 backdrop-blur-sm border border-red-700/30',
            'Classes': 'bg-green-700/20 text-green-400 backdrop-blur-sm border border-green-700/30',
            'Events': 'bg-purple-700/20 text-purple-400 backdrop-blur-sm border border-purple-700/30',
            'Nutrition': 'bg-orange-700/20 text-orange-400 backdrop-blur-sm border border-orange-700/30',
            'Training Tips': 'bg-red-700/20 text-red-700 backdrop-blur-sm border border-red-700/30',
        };
        return colors[category] || 'bg-white/10 text-gray-300 backdrop-blur-sm border border-white/20';
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Latest News - ULTRAFLEX">
                <meta name="description" content="Stay updated with the latest news, fitness tips, and announcements from ULTRAFLEX. Read our blog for expert advice and community updates." />
            </Head>

            <div className="min-h-screen relative">
                {/* Global Animated Background */}
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                {/* All content with higher z-index */}
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative py-20 overflow-hidden">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&q=80)'
                            }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
                        
                        {/* Hero particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 15 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${2 + Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="container mx-auto px-6 text-center relative z-10">
                            <h1 className="text-5xl font-bold mb-6">
                                <span className="text-white animate-pulse">Latest</span>{' '}
                                <span className="text-red-700 animate-pulse">News</span>{' '}
                                <span className="text-white animate-pulse">&</span>{' '}
                                <span className="text-white animate-pulse">Updates</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Stay informed with the latest fitness trends, ULTRAFLEX updates, class schedules, 
                                nutrition tips, and community news.
                            </p>
                        </div>
                    </section>

                    {/* Featured Articles */}
                    {featuredArticles.length > 0 && (
                        <section className="py-16 bg-black/20 backdrop-blur-md">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold mb-12">
                                    <span className="text-red-700 animate-pulse">Featured</span>{' '}
                                    <span className="text-white animate-pulse">Stories</span>
                                </h2>
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {featuredArticles.slice(0, 2).map((article) => (
                                        <Card key={article.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="relative h-64 bg-gray-800 overflow-hidden">
                                                <img 
                                                    src={article.image} 
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Featured badge */}
                                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-red-700/20">
                                                    Featured
                                                </div>
                                                
                                                {/* Category badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                                                        {article.category}
                                                    </span>
                                                </div>

                                                {/* Read overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                        Read Article
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                                    <span>
                                                        {article.date}
                                                    </span>
                                                    <span>
                                                        {article.readTime}
                                                    </span>
                                                    <span>
                                                        {article.author}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-700 transition-colors duration-300">{article.title}</h3>
                                                <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">{article.excerpt}</p>
                                                
                                                <Link href={`/news/${article.slug}`}>
                                                    <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Read More
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Search and Filter */}
                    <section className="py-8 bg-black/40 backdrop-blur-md border-b border-white/10">
                        <div className="container mx-auto px-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                {/* Search */}
                                <div className="relative flex-1 max-w-md">
                                    <Input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                    />
                                </div>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                                                selectedCategory === category
                                                    ? 'bg-gradient-to-r from-red-700 to-red-800 text-white border border-red-700/20'
                                                    : 'bg-white/10 text-gray-300 hover:bg-red-700/20 hover:text-red-700 border border-white/20 hover:border-red-700/30'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mt-4 text-gray-300">
                                Showing {filteredArticles.length} of {articles.length} articles
                            </div>
                        </div>
                    </section>

                    {/* Articles Grid */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            {filteredArticles.length === 0 ? (
                                <div className="text-center py-16">
                                    <h3 className="text-2xl font-semibold text-white mb-2">No articles found</h3>
                                    <p className="text-gray-300 mb-6">
                                        Try adjusting your search terms or category filter
                                    </p>
                                    <Button 
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCategory('All');
                                            setCurrentPage(1);
                                        }}
                                        variant="outline"
                                        className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Clear Filters
                                        </span>
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {paginatedArticles.map((article) => (
                                            <Card key={article.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                <div className="relative h-48 bg-gray-800 overflow-hidden">
                                                    <img 
                                                        src={article.image} 
                                                        alt={article.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    
                                                    {/* Category badge */}
                                                    <div className="absolute top-3 right-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                                                            {article.category}
                                                        </span>
                                                    </div>

                                                    {/* Read time indicator */}
                                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs border border-white/10">
                                                        {article.readTime}
                                                    </div>

                                                    {/* Read overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm text-sm">
                                                            Read
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                                    <div className="flex items-center space-x-3 text-xs text-gray-400 mb-3">
                                                        <span>
                                                            {article.date}
                                                        </span>
                                                        <span>
                                                            {article.author}
                                                        </span>
                                                    </div>
                                                    
                                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-700 transition-colors duration-300">{article.title}</h3>
                                                    <p className="text-gray-300 text-sm mb-3 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">{article.excerpt}</p>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-400">
                                                            {article.readTime}
                                                        </span>
                                                        <Link href={`/news/${article.slug}`}>
                                                            <Button size="sm" variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                    Read
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-12">
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:hover:text-black disabled:hover:scale-100"
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Previous
                                                    </span>
                                                </Button>
                                                
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <Button
                                                        key={page}
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={currentPage === page 
                                                            ? "bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm" 
                                                            : "border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                                        }
                                                    >
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            {page}
                                                        </span>
                                                    </Button>
                                                ))}
                                                
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:hover:text-black disabled:hover:scale-100"
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Next
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </section>

                    {/* Newsletter Signup */}
                    <section className="py-16 bg-gradient-to-r from-red-900/80 to-red-700/80 backdrop-blur-sm relative overflow-hidden">
                        {/* Newsletter particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 12 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${2 + Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="container mx-auto px-6 text-center relative z-10">
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="text-white animate-pulse">Stay</span>{' '}
                                <span className="text-red-700 animate-pulse">Updated</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Subscribe to our newsletter and never miss the latest fitness tips, 
                                class schedules, and ULTRAFLEX updates.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                />
                                <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 whitespace-nowrap transition-all duration-300 group">
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        Subscribe
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}