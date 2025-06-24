import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

interface LatestNewsProps {
    latestNews: NewsArticle[];
}

export default function LatestNews({ latestNews }: LatestNewsProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
                    <p className="text-xl text-gray-600">
                        Stay updated with the latest from UltraFlex
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {latestNews.map((article) => (
                        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {article.date}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <Button variant="outline" size="sm">
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="px-8 py-3">
                        View All News
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}