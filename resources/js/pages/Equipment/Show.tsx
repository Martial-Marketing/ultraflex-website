import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';

interface Equipment {
    id: number;
    name: string;
    image: string;
    video?: string;
    category: string;
    muscleGroups: string[];
    description: string;
    detailedDescription: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    locations: {
        name: string;
        slug: string;
        quantity: number;
    }[];
    slug: string;
    brand?: string;
    features: string[];
    specifications: {
        [key: string]: string;
    };
    instructions: string[];
    safetyTips: string[];
    relatedEquipment: {
        id: number;
        name: string;
        image: string;
        slug: string;
        category: string;
    }[];
}

interface EquipmentShowProps {
    equipment: Equipment;
    auth: {
        user: any;
    };
}

export default function EquipmentShow({ equipment, auth }: EquipmentShowProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [showVideo, setShowVideo] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            'Beginner': 'bg-green-700/20 text-green-400 backdrop-blur-sm border border-green-700/30',
            'Intermediate': 'bg-yellow-700/20 text-yellow-400 backdrop-blur-sm border border-yellow-700/30',
            'Advanced': 'bg-red-700/20 text-red-700 backdrop-blur-sm border border-red-700/30',
        };
        return colors[difficulty as keyof typeof colors] || 'bg-white/10 text-gray-300 backdrop-blur-sm border border-white/20';
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'instructions', label: 'How to Use' },
        { id: 'specifications', label: 'Specifications' },
        { id: 'locations', label: 'Locations' },
    ];

    return (
        <AppLayout auth={auth}>
            <Head title={`${equipment.name} - Equipment - UltraFlex`}>
                <meta name="description" content={`Learn about the ${equipment.name} at UltraFlex. ${equipment.description}`} />
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
                                backgroundImage: 'url(https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=1920&h=1080&fit=crop&q=80)'
                            }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
                        
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
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(equipment.difficulty)}`}>
                                            {equipment.difficulty}
                                        </span>
                                        <span className="px-3 py-1 bg-red-700/20 text-red-700 rounded-full text-sm backdrop-blur-sm border border-red-700/30">
                                            {equipment.category}
                                        </span>
                                    </div>
                                    
                                    <h1 className="text-5xl font-bold mb-4">{equipment.name}</h1>
                                    {equipment.brand && (
                                        <p className="text-xl text-gray-200 mb-6">by {equipment.brand}</p>
                                    )}
                                    
                                    <p className="text-lg text-gray-200 mb-6">{equipment.description}</p>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {equipment.muscleGroups.map((group, index) => (
                                            <span 
                                                key={index} 
                                                className="px-4 py-2 bg-red-700/20 backdrop-blur-sm text-white rounded-full border border-red-700/30 hover:bg-red-700/30 transition-colors duration-300"
                                            >
                                                {group}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button 
                                            onClick={() => setActiveTab('instructions')}
                                            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Learn How to Use
                                            </span>
                                        </Button>
                                        {equipment.video && (
                                            <Button 
                                                variant="outline"
                                                onClick={() => setShowVideo(true)}
                                                className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Watch Demo Video
                                                </span>
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <div className="relative group">
                                        <img 
                                            src={equipment.image} 
                                            alt={equipment.name}
                                            className="w-96 h-96 rounded-2xl object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {equipment.video && (
                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                                 onClick={() => setShowVideo(true)}>
                                                <div className="bg-red-700/80 text-white p-4 rounded-full">
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Navigation Tabs */}
                    <section className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
                        <div className="container mx-auto px-6">
                            <nav className="flex space-x-8 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-2 border-b-2 transition-all duration-300 whitespace-nowrap group ${
                                            activeTab === tab.id
                                                ? 'border-red-700 text-red-700'
                                                : 'border-transparent text-gray-300 hover:text-red-700 hover:border-red-700/30'
                                        }`}
                                    >
                                        <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </section>

                    {/* Tab Content */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="grid lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Description */}
                                        <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h2 className="text-2xl font-bold mb-6">
                                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">About</span>{' '}
                                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">This Equipment</span>
                                            </h2>
                                            <p className="text-gray-300 leading-relaxed mb-6">{equipment.detailedDescription}</p>
                                        </Card>

                                        {/* Features */}
                                        {equipment.features.length > 0 && (
                                            <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                                <h2 className="text-2xl font-bold mb-6">
                                                    <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Key Features</span>
                                                </h2>
                                                <ul className="space-y-3">
                                                    {equipment.features.map((feature, index) => (
                                                        <li key={index} className="flex items-center group hover:text-red-700 transition-colors duration-300">
                                                            <div className="w-2 h-2 bg-red-700 rounded-full mr-3 group-hover:bg-red-600 transition-colors duration-300"></div>
                                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Card>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {/* Quick Info */}
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h3 className="text-lg font-bold mb-4">
                                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Quick Info</span>
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Category:</span>
                                                    <span className="text-white font-medium">{equipment.category}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Difficulty:</span>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(equipment.difficulty)}`}>
                                                        {equipment.difficulty}
                                                    </span>
                                                </div>
                                                {equipment.brand && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-300">Brand:</span>
                                                        <span className="text-white font-medium">{equipment.brand}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Available at:</span>
                                                    <span className="text-white font-medium">{equipment.locations.length} locations</span>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Muscle Groups */}
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h3 className="text-lg font-bold mb-4">
                                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Target Muscles</span>
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {equipment.muscleGroups.map((group, index) => (
                                                    <span 
                                                        key={index} 
                                                        className="px-3 py-1 bg-red-700/20 text-red-700 text-sm rounded-full backdrop-blur-sm border border-red-700/30"
                                                    >
                                                        {group}
                                                    </span>
                                                ))}
                                            </div>
                                        </Card>

                                        {/* Quick Actions */}
                                        <Card className="p-6 bg-red-700/10 backdrop-blur-md border border-red-700/30 relative overflow-hidden">
                                            <div className="relative z-10">
                                                <h3 className="text-lg font-bold mb-4">
                                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                                                    <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Try</span>{' '}
                                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">It?</span>
                                                </h3>
                                                <p className="text-gray-300 mb-4">
                                                    Find this equipment at any of our locations.
                                                </p>
                                                <Button 
                                                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                    onClick={() => setActiveTab('locations')}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Find Locations
                                                    </span>
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* Instructions Tab */}
                            {activeTab === 'instructions' && (
                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-8">
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">How</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Use</span>
                                        </h2>
                                        <div className="space-y-6">
                                            {equipment.instructions.map((instruction, index) => (
                                                <Card key={index} className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0 w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                                            <span className="text-red-700 font-bold text-sm">{index + 1}</span>
                                                        </div>
                                                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{instruction}</p>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-bold mb-8">
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Safety Tips</span>
                                        </h2>
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                            <div className="space-y-4">
                                                {equipment.safetyTips.map((tip, index) => (
                                                    <div key={index} className="flex items-start space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0 group-hover:bg-red-600 transition-colors duration-300"></div>
                                                        <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{tip}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>

                                        <div className="mt-6 p-4 bg-yellow-600/20 backdrop-blur-sm rounded-lg border border-yellow-600/30">
                                            <p className="text-sm text-yellow-200">
                                                <strong>Note:</strong> Always consult with our staff or a personal trainer if you're unsure about proper form or technique.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Specifications Tab */}
                            {activeTab === 'specifications' && (
                                <div className="max-w-4xl mx-auto">
                                    <h2 className="text-3xl font-bold text-center mb-12">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Technical</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Specifications</span>
                                    </h2>
                                    
                                    <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {Object.entries(equipment.specifications).map(([key, value]) => (
                                                <div key={key} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                                                    <span className="font-medium text-white">{key}</span>
                                                    <span className="text-gray-300">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            )}

                            {/* Locations Tab */}
                            {activeTab === 'locations' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-center mb-12">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Available</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Locations</span>
                                    </h2>
                                    
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {equipment.locations.map((location, index) => (
                                            <Card key={index} className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-red-700 transition-colors duration-300">{location.name}</h3>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-gray-300">Available units:</span>
                                                    <span className="text-2xl font-bold text-red-700">{location.quantity}</span>
                                                </div>
                                                <Link href={`/locations/${location.slug}`}>
                                                    <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            View Location
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Equipment */}
                            {equipment.relatedEquipment.length > 0 && (
                                <div className="mt-20">
                                    <h2 className="text-3xl font-bold text-center mb-12">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Related</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Equipment</span>
                                    </h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {equipment.relatedEquipment.map((item) => (
                                            <Link key={item.id} href={`/equipment/${item.slug}`}>
                                                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                    <div className="h-48 bg-gray-800 overflow-hidden">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <CardContent className="p-4">
                                                        <h3 className="font-semibold text-white mb-1 group-hover:text-red-700 transition-colors duration-300">{item.name}</h3>
                                                        <p className="text-sm text-gray-400">{item.category}</p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Video Modal */}
                    {showVideo && equipment.video && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                             onClick={() => setShowVideo(false)}>
                            <div className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden">
                                <button 
                                    onClick={() => setShowVideo(false)}
                                    className="absolute top-4 right-4 text-white hover:text-red-700 transition-colors duration-300 z-10"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <video 
                                    src={equipment.video} 
                                    controls 
                                    autoPlay 
                                    className="w-full h-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
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
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Experience</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">This</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Equipment?</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Visit any UltraFlex location to try the {equipment.name} and discover how it can enhance your workout routine.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/locations">
                                    <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Find a Location
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/equipment">
                                    <Button size="lg" variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Browse All Equipment
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
