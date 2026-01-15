import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { User as SharedUser } from '@/types';
import AnimatedBackground from '@/components/AnimatedBackground';

// Use shared User type expected by AppLayout (from '@/types')
type User = SharedUser;

interface NutritionPlan {
    id: number;
    title: string;
    description: string;
    image: string;
    difficulty: string;
    type: string;
    duration: string;
    features: string[];
    externalUrl?: string;
}

interface NutritionIndexProps {
    auth: { user: User };
    nutritionPlans: NutritionPlan[];
}

export default function NutritionIndex({ auth, nutritionPlans }: NutritionIndexProps) {
    const user = auth.user;

    const nutritionStats = [
    { label: 'Nutrition Plans', value: nutritionPlans?.length.toString() || '6', color: 'bg-white/10', textColor: 'text-white' },
    { label: 'Active Plans', value: '3', color: 'bg-white/10', textColor: 'text-white' },
    { label: 'Avg Calories/Day', value: '2,100', color: 'bg-white/10', textColor: 'text-white' },
    { label: 'Goal Progress', value: '85%', color: 'bg-white/10', textColor: 'text-white' },
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="Nutrition - ULTRAFLEX Members">
                <meta name="description" content="Access exclusive nutrition plans and healthy recipes designed for ULTRAFLEX members." />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="relative py-16 overflow-hidden">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-white/5 to-black/80" />
                        
                        {/* Animated Particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 20 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                        <span className="text-white text-xl font-bold">N</span>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-4xl font-bold mb-2">Member Nutrition</h1>
                                        <p className="text-xl text-gray-200">
                                            Healthy recipes and meal plans for {user.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link href="/members">
                                        <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Back to Hub
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Nutrition Plans */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8"><span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> Nutrition Plans</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {nutritionPlans?.map((plan) => (
                                    <Card key={plan.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <div className="h-48 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={plan.image} 
                                                alt={plan.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Duration badge */}
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                                <span className="text-white text-sm font-medium">{plan.duration}</span>
                                            </div>

                                            {/* Difficulty badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm border ${
                                                    plan.difficulty === 'Beginner' ? 'bg-white/10 text-white border-white/20' :
                                                    plan.difficulty === 'Intermediate' ? 'bg-white/10 text-white border-white/20' :
                                                    'bg-white/10 text-white border-white/20'
                                                }`}>
                                                    {plan.difficulty}
                                                </span>
                                            </div>

                                            {/* View overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {plan.externalUrl ? (
                                                    <a href={plan.externalUrl} target="_blank" rel="noopener noreferrer">
                                                        <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Visit External Site
                                                            </span>
                                                        </Button>
                                                    </a>
                                                ) : (
                                                    <Link href={`/members/nutrition/${plan.id}`}>
                                                        <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                View Plan
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">
                                                {plan.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {plan.description}
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm text-gray-300">
                                                    <span>Type: <span className="text-white">{plan.type}</span></span>
                                                    <span>Level: <span className="text-white">{plan.difficulty}</span></span>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <h4 className="text-sm font-semibold text-white">Key Features:</h4>
                                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                                        {plan.features.slice(0, 4).map((feature, index) => (
                                                            <div key={index} className="flex items-center text-gray-300">
                                                                <div className="w-1 h-1 bg-white/60 rounded-full mr-2"></div>
                                                                {feature}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                {plan.externalUrl ? (
                                                    <a href={plan.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Visit External Site
                                                            </span>
                                                        </Button>
                                                    </a>
                                                ) : (
                                                    <Link href={`/members/nutrition/${plan.id}`}>
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Get Started
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )) || []}
                            </div>
                        </div>
                    </section>

                    {/* Nutrition Stats */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white text-center mb-12">Your Nutrition Journey</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {nutritionStats.map((stat, index) => (
                                    <Card key={index} className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                        <div className={`w-16 h-16 ${stat.color} backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
                                            <span className={`${stat.textColor} text-xl font-bold`}>
                                                {stat.label.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                        <p className="text-gray-300 text-sm">{stat.label}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Meal Planning CTA */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Nutrition?</h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    Get personalized nutrition plans designed specifically for your fitness goals
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 px-8 py-3 group">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Start Your Plan
                                        </span>
                                    </Button>
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm px-8 py-3">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Learn More
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}