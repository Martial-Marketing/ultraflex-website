import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
    Search, 
    Calendar, 
    Clock, 
    User, 
    ArrowRight,
    Filter,
    Tag
} from 'lucide-react';

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

export default function NewsIndex({ articles, categories, featuredArticles }: NewsIndexProps) {
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
            'News': 'bg-blue-100 text-blue-600',
            'Classes': 'bg-green-100 text-green-600',
            'Events': 'bg-purple-100 text-purple-600',
            'Nutrition': 'bg-orange-100 text-orange-600',
            'Training Tips': 'bg-red-100 text-red-600',
        };
        return colors[category] || 'bg-gray-100 text-gray-600';
    };

    return (
        <>
            <Head title="Latest News - UltraFlex">
                <meta name="description" content="Stay updated with the latest news, fitness tips, and announcements from UltraFlex. Read our blog for expert advice and community updates." />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Latest News & Updates</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Stay informed with the latest fitness trends, UltraFlex updates, class schedules, 
                            nutrition tips, and community news.
                        </p>
                    </div>
                </section>

                {/* Featured Articles */}
                {featuredArticles.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Stories</h2>
                            <div className="grid lg:grid-cols-2 gap-8">
                                {featuredArticles.slice(0, 2).map((article) => (
                                    <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                                            <img 
                                                src={article.image} 
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Featured
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {article.date}
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {article.readTime}
                                                </span>
                                                <span className="flex items-center">
                                                    <User className="h-4 w-4 mr-1" />
                                                    {article.author}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                                            
                                            <Link href={`/news/${article.slug}`}>
                                                <Button className="bg-blue-600 hover:bg-blue-700">
                                                    Read More
                                                    <ArrowRight className="h-4 w-4 ml-2" />
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
                <section className="py-8 bg-white border-b">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="pl-10"
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
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-gray-600">
                            Showing {filteredArticles.length} of {articles.length} articles
                        </div>
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-gray-400 mb-4">
                                    <Search className="h-16 w-16 mx-auto" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search terms or category filter
                                </p>
                                <Button 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All');
                                        setCurrentPage(1);
                                    }}
                                    variant="outline"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {paginatedArticles.map((article) => (
                                        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                                <img 
                                                    src={article.image} 
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <CardContent className="p-6">
                                                <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                                                    <span className="flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        {article.date}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {article.readTime}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500 flex items-center">
                                                        <User className="h-3 w-3 mr-1" />
                                                        {article.author}
                                                    </span>
                                                    <Link href={`/news/${article.slug}`}>
                                                        <Button size="sm" variant="outline">
                                                            Read More
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
                                            >
                                                Previous
                                            </Button>
                                            
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <Button
                                                    key={page}
                                                    variant={currentPage === page ? "default" : "outline"}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                                                >
                                                    {page}
                                                </Button>
                                            ))}
                                            
                                            <Button
                                                variant="outline"
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Newsletter Signup */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter and never miss the latest fitness tips, 
                            class schedules, and UltraFlex updates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white"
                            />
                            <Button className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}