import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { User as SharedUser } from '@/types';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowLeft, Calculator, Activity } from 'lucide-react';

type User = SharedUser;

interface CalculatorIndexProps {
    auth: {
        user: User;
    };
}

export default function CalculatorIndex({ auth }: CalculatorIndexProps) {
    const calculators = [
        {
            id: 'diet',
            title: 'Diet Calculator',
            description: 'Calculate your BMR, TDEE, and personalized nutrition targets',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop&crop=center',
            features: ['BMR Calculator', 'TDEE Calculator', 'Macro Calculator', 'Goal Setting'],
            route: '/members/nutrition/calculator/diet'
        },
        {
            id: 'bodyfat',
            title: 'MWP Body Fat Calculator',
            description: 'Calculate your body fat percentage using multiple proven methods',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
            features: ['Navy Method', 'YMCA Method', 'BMI Calculator', 'Body Composition'],
            route: '/members/nutrition/calculator/bodyfat'
        }
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="Nutrition Calculators - ULTRAFLEX Members">
                <meta name="description" content="Access ULTRAFLEX's comprehensive nutrition and body composition calculators." />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="bg-gradient-to-r from-black/80 via-white/5 to-black/80 py-16 backdrop-blur-sm relative overflow-hidden">
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

                            <div className="text-center text-white">
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                                        <Calculator className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-5xl font-bold mb-4">Nutrition Calculators</h1>
                                <p className="text-xl text-gray-200 mb-6">
                                    Choose from our comprehensive suite of nutrition and body composition calculators
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Calculators Grid */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {calculators.map((calculator) => (
                                    <Card key={calculator.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 group">
                                        <div className="h-48 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={calculator.image} 
                                                alt={calculator.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* View overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Link href={calculator.route}>
                                                    <Button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm">
                                                        <Calculator className="mr-2 h-4 w-4" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Use Calculator
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                                                {calculator.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {calculator.description}
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <h4 className="text-sm font-semibold text-white">Features:</h4>
                                                <div className="grid grid-cols-2 gap-1 text-xs">
                                                    {calculator.features.map((feature, index) => (
                                                        <div key={index} className="flex items-center text-gray-300">
                                                            <div className="w-1 h-1 bg-white/60 rounded-full mr-2"></div>
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="pt-4 border-t border-white/10">
                                                <Link href={calculator.route}>
                                                    <Button className="w-full bg-white/10 hover:bg-white/20 transition-all duration-300 group">
                                                        <Calculator className="mr-2 h-4 w-4" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Start Calculating
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Info Section */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Why Use Our Calculators?</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
                                        <Activity className="h-12 w-12 text-white/80 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-white mb-2">Scientifically Accurate</h3>
                                        <p className="text-gray-300 text-sm">Based on proven formulas and research-backed methodologies</p>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
                                        <Calculator className="h-12 w-12 text-white/80 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-white mb-2">Multiple Methods</h3>
                                        <p className="text-gray-300 text-sm">Compare results across different calculation methods</p>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
                                        <Activity className="h-12 w-12 text-white/80 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-white mb-2">Personalized Results</h3>
                                        <p className="text-gray-300 text-sm">Tailored calculations based on your individual data</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
