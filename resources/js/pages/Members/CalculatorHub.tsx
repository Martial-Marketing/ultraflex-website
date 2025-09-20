import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { User as SharedUser } from '@/types';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowLeft, Calculator, Activity, Scale } from 'lucide-react';

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
            icon: Calculator,
            features: ['BMR Calculator', 'TDEE Calculator', 'Macro Calculator', 'Goal Setting'],
            difficulty: 'Beginner',
            route: '/members/nutrition/calculator/diet'
        },
        {
            id: 'bodyfat',
            title: 'Body Fat Calculator',
            description: 'Calculate your body fat percentage using various measurement methods',
            icon: Scale,
            features: ['Multiple Methods', 'Navy Formula', 'BMI Calculator', 'Body Composition'],
            difficulty: 'Beginner',
            route: '/members/nutrition/calculator/bodyfat'
        }
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="Nutrition Calculator - UltraFlex Members">
                <meta name="description" content="Access advanced nutrition and body composition calculators designed for UltraFlex members." />
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
                                    Choose your calculator to get personalized nutrition and body composition insights
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Calculator Options */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-8 text-center">Select Your Calculator</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {calculators.map((calculator) => (
                                        <Card key={calculator.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 group">
                                            <CardHeader className="text-center pb-4">
                                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300 border border-white/20">
                                                    <calculator.icon className="h-10 w-10 text-white" />
                                                </div>
                                                <CardTitle className="text-white text-2xl transition-colors duration-300">
                                                    {calculator.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <p className="text-gray-300 text-center">
                                                    {calculator.description}
                                                </p>
                                                
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-center">
                                                        <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border bg-white/10 text-white border-white/20`}>
                                                            {calculator.difficulty}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <h4 className="text-sm font-semibold text-white text-center">Features:</h4>
                                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                                            {calculator.features.map((feature, index) => (
                                                                <div key={index} className="flex items-center text-gray-300">
                                                                    <div className="w-1 h-1 bg-white/60 rounded-full mr-2"></div>
                                                                    {feature}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="pt-4">
                                                    <Link href={calculator.route}>
                                                        <Button className="w-full bg-white/10 hover:bg-white/20 transition-all duration-300 group text-lg py-3">
                                                            <calculator.icon className="mr-2 h-5 w-5" />
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Open {calculator.title}
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Info Section */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Why Use Our Calculators?</h2>
                                <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                                            <Activity className="h-8 w-8 text-white/80" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">Accurate Formulas</h3>
                                        <p className="text-gray-300">
                                            Using scientifically-backed formulas for precise calculations
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                                            <Calculator className="h-8 w-8 text-white/80" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">Multiple Methods</h3>
                                        <p className="text-gray-300">
                                            Choose from various calculation methods for best accuracy
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                                            <Scale className="h-8 w-8 text-white/80" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">Personalized Results</h3>
                                        <p className="text-gray-300">
                                            Get results tailored to your specific goals and body type
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xl text-gray-300">
                                    Start with either calculator to get comprehensive insights into your nutrition and body composition needs
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
