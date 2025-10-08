import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight, ChevronRight, Newspaper, Clock } from 'lucide-react';

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    readTime: string;
    slug: string;
    category: string;
}

interface LatestNewsProps {
    latestNews: NewsArticle[];
}

export default function LatestNews({ latestNews }: LatestNewsProps) {
    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Red accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-transparent to-red-900/10" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Simplified header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Latest</span>{' '}
                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">News</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Stay updated with the latest from UltraFlex
                    </p>
                </div>
                
                {/* Enhanced news cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {latestNews.map((article) => (
                        <Card key={article.id} className="overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-700/10 group">
                            <div className="h-48 bg-gray-800 relative overflow-hidden">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* "NEW" badge for recent articles */}
                                <div className="absolute top-4 left-4">
                                    <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-red-700/20">
                                        NEW
                                    </div>
                                </div>

                                {/* Read indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                        <ArrowRight className="h-4 w-4 text-red-700" />
                                    </div>
                                </div>

                                {/* Hover overlay with read button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button 
                                        size="sm" 
                                        className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Read Article</span>
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                    </Button>
                                </div>
                            </div>
                            
                            <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                {/* Enhanced date with clock icon */}
                                <div className="flex items-center text-sm text-gray-400 mb-3 group-hover:text-red-700 transition-colors duration-300">
                                    <Calendar className="h-4 w-4 mr-2 text-red-700" />
                                    <span>{article.date}</span>
                                    <Clock className="h-3 w-3 ml-2 opacity-60" />
                                    <span className="ml-1 text-xs">{article.readTime}</span>
                                </div>

                                {/* Enhanced title with hover effect */}
                                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
                                    {article.title}
                                </h3>

                                {/* Enhanced excerpt */}
                                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                                    {article.excerpt}
                                </p>

                                {/* Enhanced read more button */}
                                <div className="flex items-center justify-between">
                                    <a href={`/news/${article.slug}`}
                                       className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm border inline-flex items-center gap-1">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Read More</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </a>

                                    {/* Article category badge */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                                            <span className="text-xs text-gray-400">{article.category}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Article tags that appear on hover */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-red-700/20 backdrop-blur-sm text-red-700 text-xs rounded-full border border-red-700/30">
                                            Training
                                        </span>
                                        <span className="px-2 py-1 bg-red-700/20 backdrop-blur-sm text-red-700 text-xs rounded-full border border-red-700/30">
                                            Health
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                {/* Enhanced call-to-action button */}
                <div className="text-center mt-12">
                    <a href="/news" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm border inline-flex items-center">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">View All News</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </a>
                </div>

                {/* Bottom accent line */}
                <div className="mt-16 flex items-center justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}