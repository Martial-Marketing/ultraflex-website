import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';

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
    tags: string[];
    authorBio: string;
    authorImage: string;
    publishedAt: string;
    updatedAt?: string;
    views: number;
    likes: number;
    comments: {
        id: number;
        name: string;
        email: string;
        comment: string;
        date: string;
        avatar?: string;
    }[];
    relatedArticles: {
        id: number;
        title: string;
        excerpt: string;
        image: string;
        slug: string;
        category: string;
        date: string;
        readTime: string;
    }[];
}

interface NewsShowProps {
    article: Article;
    auth: {
        user: any;
    };
}

export default function NewsShow({ article, auth }: NewsShowProps) {
    const [newComment, setNewComment] = useState({ name: '', email: '', comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setNewComment({ name: '', email: '', comment: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <AppLayout auth={auth}>
            <Head title={`${article.title} - News - UltraFlex`}>
                <meta name="description" content={article.excerpt} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta property="og:image" content={article.image} />
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
                    <section className="relative bg-gradient-to-r from-red-900/80 to-red-700/80 py-20 backdrop-blur-sm overflow-hidden">
                        {/* Hero particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 20 }, (_, i) => (
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

                        <div className="container mx-auto px-6 relative z-10">
                            <div className="max-w-4xl mx-auto text-center">
                                {/* Breadcrumb */}
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 mb-6">
                                    <Link href="/news" className="hover:text-red-700 transition-colors duration-300">News</Link>
                                    <span>/</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                                        {article.category}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                    {article.title}
                                </h1>
                                
                                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                                    {article.excerpt}
                                </p>

                                {/* Article Meta */}
                                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300">
                                    <div className="flex items-center space-x-3">
                                        <img 
                                            src={article.authorImage} 
                                            alt={article.author}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                                        />
                                        <span>By {article.author}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                    <span>•</span>
                                    <span>{article.views} views</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Article Content */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-4 gap-12">
                                {/* Main Content */}
                                <div className="lg:col-span-3">
                                    {/* Featured Image */}
                                    <div className="mb-8">
                                        <img 
                                            src={article.image} 
                                            alt={article.title}
                                            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                        />
                                    </div>

                                    {/* Article Body */}
                                    <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10 mb-8">
                                        <div className="prose prose-lg prose-invert max-w-none">
                                            <div className="text-gray-300 leading-relaxed space-y-6">
                                                {article.content.split('\n\n').map((paragraph, index) => (
                                                    <p key={index} className="text-lg leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Tags */}
                                    {article.tags.length > 0 && (
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 mb-8">
                                            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {article.tags.map((tag, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-1 bg-red-700/20 text-red-700 text-sm rounded-full backdrop-blur-sm border border-red-700/30 hover:bg-red-700/30 transition-colors duration-300 cursor-pointer"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </Card>
                                    )}

                                    {/* Author Bio */}
                                    <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 mb-8">
                                        <div className="flex items-start space-x-4">
                                            <img 
                                                src={article.authorImage} 
                                                alt={article.author}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-white mb-2">About {article.author}</h3>
                                                <p className="text-gray-300 leading-relaxed">{article.authorBio}</p>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Comments Section */}
                                    <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10">
                                        <h3 className="text-2xl font-bold text-white mb-6">
                                            Comments ({article.comments.length})
                                        </h3>

                                        {/* Comment Form */}
                                        <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
                                            <h4 className="text-lg font-semibold text-white mb-4">Leave a Comment</h4>
                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                                                    <Input
                                                        type="text"
                                                        value={newComment.name}
                                                        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                                        required
                                                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                                                    <Input
                                                        type="email"
                                                        value={newComment.email}
                                                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                                        required
                                                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                                        placeholder="your.email@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-white mb-2">Comment</label>
                                                <Textarea
                                                    value={newComment.comment}
                                                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                                                    required
                                                    rows={4}
                                                    className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                                    placeholder="Share your thoughts..."
                                                />
                                            </div>
                                            <Button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                            >
                                                {isSubmitting ? (
                                                    'Posting...'
                                                ) : (
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Post Comment
                                                    </span>
                                                )}
                                            </Button>
                                        </form>

                                        {/* Comments List */}
                                        <div className="space-y-6">
                                            {article.comments.map((comment) => (
                                                <div key={comment.id} className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="w-10 h-10 bg-red-700/20 rounded-full flex items-center justify-center border border-red-700/30">
                                                            <span className="text-red-700 font-semibold text-sm">
                                                                {comment.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <span className="font-semibold text-white">{comment.name}</span>
                                                                <span className="text-sm text-gray-400">{comment.date}</span>
                                                            </div>
                                                            <p className="text-gray-300 leading-relaxed">{comment.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1 space-y-8">
                                    {/* Article Stats */}
                                    <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                        <h3 className="text-lg font-semibold text-white mb-4">Article Stats</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Published:</span>
                                                <span className="text-white">{article.publishedAt}</span>
                                            </div>
                                            {article.updatedAt && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Updated:</span>
                                                    <span className="text-white">{article.updatedAt}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Views:</span>
                                                <span className="text-white">{article.views}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Reading Time:</span>
                                                <span className="text-white">{article.readTime}</span>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Share Article */}
                                    <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                        <h3 className="text-lg font-semibold text-white mb-4">Share Article</h3>
                                        <div className="space-y-3">
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                                onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Share Article
                                                </span>
                                            </Button>
                                        </div>
                                    </Card>

                                    {/* Newsletter Signup */}
                                    <Card className="p-6 bg-red-700/10 backdrop-blur-md border border-red-700/30">
                                        <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                                        <p className="text-gray-300 mb-4 text-sm">
                                            Subscribe to our newsletter for the latest fitness tips and news.
                                        </p>
                                        <div className="space-y-3">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                            />
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Subscribe
                                                </span>
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Related Articles */}
                    {article.relatedArticles.length > 0 && (
                        <section className="py-16 bg-black/20 backdrop-blur-md">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Related</span>{' '}
                                    <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Articles</span>
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {article.relatedArticles.map((relatedArticle) => (
                                        <Link key={relatedArticle.id} href={`/news/${relatedArticle.slug}`}>
                                            <Card className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                <div className="h-48 bg-gray-800 overflow-hidden">
                                                    <img 
                                                        src={relatedArticle.image} 
                                                        alt={relatedArticle.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                                <CardContent className="p-6">
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(relatedArticle.category)}`}>
                                                            {relatedArticle.category}
                                                        </span>
                                                        <span className="text-xs text-gray-400">{relatedArticle.readTime}</span>
                                                    </div>
                                                    <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-700 transition-colors duration-300">
                                                        {relatedArticle.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                                                        {relatedArticle.excerpt}
                                                    </p>
                                                    <div className="mt-3 text-xs text-gray-400">
                                                        {relatedArticle.date}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Bottom CTA */}
                    <section className="py-16 bg-gradient-to-r from-red-900/80 to-red-700/80 backdrop-blur-sm relative overflow-hidden">
                        {/* CTA particles */}
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
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Start</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Your</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Fitness</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Journey?</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Join UltraFlex today and transform your health and fitness with our expert guidance and state-of-the-art facilities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Join UltraFlex
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/news">
                                    <Button size="lg" variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Read More Articles
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
