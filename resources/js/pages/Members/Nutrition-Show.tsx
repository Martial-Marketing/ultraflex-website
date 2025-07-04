import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowLeft, Calendar, User, Target, CheckCircle } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    memberSince: string;
    membershipType: string;
    profileImage?: string;
}

interface NutritionPlan {
    id: number;
    title: string;
    description: string;
    image: string;
    difficulty: string;
    type: string;
    duration: string;
    features: string[];
    detailedDescription: string;
    externalUrl?: string;
}

interface NutritionShowProps {
    auth: {
        user: User;
    };
    nutritionPlan: NutritionPlan;
}

export default function NutritionShow({ auth, nutritionPlan }: NutritionShowProps) {
    const user = auth.user;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-700/20 text-green-400 border-green-700/30';
            case 'Intermediate':
                return 'bg-yellow-700/20 text-yellow-400 border-yellow-700/30';
            case 'Advanced':
                return 'bg-red-700/20 text-red-700 border-red-700/30';
            default:
                return 'bg-gray-700/20 text-gray-400 border-gray-700/30';
        }
    };

    return (
        <AppLayout auth={auth}>
            <Head title={`${nutritionPlan.title} - UltraFlex Nutrition`}>
                <meta name="description" content={nutritionPlan.description} />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="bg-gradient-to-r from-red-900/80 to-red-700/80 py-16 backdrop-blur-sm relative overflow-hidden">
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

                        <div className="container mx-auto px-6 relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/members/nutrition">
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Back to Nutrition
                                        </span>
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="text-white">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${getDifficultyColor(nutritionPlan.difficulty)}`}>
                                            {nutritionPlan.difficulty}
                                        </span>
                                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                                            {nutritionPlan.type}
                                        </span>
                                    </div>
                                    <h1 className="text-5xl font-bold mb-4">{nutritionPlan.title}</h1>
                                    <p className="text-xl text-gray-200 mb-6">
                                        {nutritionPlan.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-6 text-gray-300 mb-8">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-red-400" />
                                            <span>{nutritionPlan.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-red-400" />
                                            <span>{nutritionPlan.difficulty} Level</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Target className="h-5 w-5 text-red-400" />
                                            <span>{nutritionPlan.type}</span>
                                        </div>
                                    </div>

                                    {nutritionPlan.externalUrl ? (
                                        <a href={nutritionPlan.externalUrl} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 group text-lg">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Visit External Site
                                                </span>
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 group text-lg">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Start This Plan
                                            </span>
                                        </Button>
                                    )}
                                </div>

                                <div className="relative">
                                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
                                        <img 
                                            src={nutritionPlan.image} 
                                            alt={nutritionPlan.title}
                                            className="w-full h-full object-contain bg-black/20"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">What's Included</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {nutritionPlan.features.map((feature, index) => (
                                    <Card key={index} className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-16 h-16 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                                                <CheckCircle className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">
                                                {feature}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Detailed Description */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-8 text-center">Plan Details</h2>
                                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                    <CardContent className="p-8">
                                        <div className="prose prose-lg prose-invert max-w-none">
                                            {nutritionPlan.detailedDescription.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="text-gray-300 leading-relaxed mb-6 last:mb-0">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Action Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Nutrition?</h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    Join thousands of UltraFlex members who have achieved their goals with our proven nutrition plans
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {nutritionPlan.externalUrl ? (
                                        <a href={nutritionPlan.externalUrl} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 px-8 py-3 group text-lg">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Visit External Site
                                                </span>
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 px-8 py-3 group text-lg">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Start {nutritionPlan.title}
                                            </span>
                                        </Button>
                                    )}
                                    <Link href="/members/nutrition">
                                        <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm px-8 py-3 text-lg">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                View All Plans
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
