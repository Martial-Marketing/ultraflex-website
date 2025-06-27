import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Tour {
    id: number;
    locationName: string;
    locationSlug: string;
    image: string;
    tourUrl: string;
    duration: string;
    highlights: string[];
    featured: boolean;
}

interface TourFeature {
    title: string;
    description: string;
    icon: string;
}

interface ToursIndexProps {
    tours: Tour[];
    tourFeatures: TourFeature[];
    featuredTours: Tour[];
    auth: {
        user: any;
    };
}

export default function ToursIndex({ tours, tourFeatures, featuredTours }: ToursIndexProps) {


    const handleTourClick = (tourUrl: string) => {
        window.open(tourUrl, '_blank', 'width=1200,height=800');
    };

    return (
        <>
            <Head title="Virtual Gym Tours - UltraFlex">
                <meta name="description" content="Take a virtual tour of our UltraFlex gyms. Explore our state-of-the-art facilities from the comfort of your home." />
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
                    <section className="bg-gradient-to-r from-red-900/80 to-red-700/80 py-20 backdrop-blur-sm relative overflow-hidden">
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Virtual</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Gym</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Tours</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Explore our world-class facilities from anywhere. Take immersive 360° virtual tours 
                                of all UltraFlex locations and see what makes us special.
                            </p>
                        </div>
                    </section>

                    {/* Featured Tours */}
                    {featuredTours.length > 0 && (
                        <section className="py-16 bg-black/20 backdrop-blur-md">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Featured</span>{' '}
                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Tours</span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                    {featuredTours.map((tour) => (
                                        <Card key={tour.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="relative h-64 bg-gray-800 overflow-hidden">
                                                <img 
                                                    src={tour.image} 
                                                    alt={`${tour.locationName} virtual tour`}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Start tour overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button 
                                                        size="lg"
                                                        className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white backdrop-blur-sm border border-red-700/20 shadow-lg transform hover:scale-105 transition-all duration-300"
                                                        onClick={() => handleTourClick(tour.tourUrl)}
                                                    >
                                                        Start Tour
                                                    </Button>
                                                </div>

                                                {/* Featured badge */}
                                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-red-700/20">
                                                    Featured
                                                </div>

                                                {/* Tour indicator */}
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-red-700/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-700/30 text-red-700 text-xs">
                                                        360° Tour
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{tour.locationName}</h3>
                                                <p className="text-gray-300 mb-4">
                                                    {tour.duration} tour
                                                </p>
                                                
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-white mb-2">Tour Highlights:</h4>
                                                    <ul className="space-y-1">
                                                        {tour.highlights.map((highlight, index) => (
                                                            <li key={index} className="text-sm text-gray-300 flex items-center group hover:text-red-700 transition-colors duration-300">
                                                                <div className="w-1 h-1 bg-red-700 rounded-full mr-2 group-hover:bg-red-600 transition-colors duration-300"></div>
                                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                    {highlight}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-2">
                                                    <Button 
                                                        className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                        onClick={() => handleTourClick(tour.tourUrl)}
                                                    >
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Start Virtual Tour
                                                        </span>
                                                    </Button>
                                                    <Link href={`/locations/${tour.locationSlug}`} className="block w-full">
                                                        <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                View Location Details
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
                    )}

                    {/* All Tours */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">All</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Virtual</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Tours</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {tours.map((tour) => (
                                    <Card key={tour.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <div className="relative h-48 bg-gray-800 overflow-hidden">
                                            <img 
                                                src={tour.image} 
                                                alt={`${tour.locationName} virtual tour`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Tour overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button 
                                                    className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white backdrop-blur-sm border border-red-700/20 shadow-lg transform hover:scale-105 transition-all duration-300"
                                                    onClick={() => handleTourClick(tour.tourUrl)}
                                                >
                                                    Start Tour
                                                </Button>
                                            </div>

                                            {tour.featured && (
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-700 to-red-800 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm border border-red-700/20">
                                                    Featured
                                                </div>
                                            )}

                                            {/* Duration indicator */}
                                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs border border-white/10">
                                                {tour.duration}
                                            </div>
                                        </div>
                                        
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{tour.locationName}</h3>
                                            <p className="text-gray-300 mb-4 text-sm">
                                                {tour.duration} virtual tour
                                            </p>
                                            
                                            <div className="space-y-2">
                                                <Button 
                                                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                    onClick={() => handleTourClick(tour.tourUrl)}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Take Tour
                                                    </span>
                                                </Button>
                                                <Link href={`/locations/${tour.locationSlug}`} className="block w-full">
                                                    <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Location Info
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

                    {/* Tour Features */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Tour</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Features</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {tourFeatures.map((feature, index) => (
                                    <Card key={index} className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{feature.title}</h3>
                                        <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="py-16 bg-black/10 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">How</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Virtual</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Tours</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Work</span>
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl font-bold text-red-700">1</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Choose a Location</h3>
                                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                        Select any UltraFlex location to explore virtually
                                    </p>
                                </div>
                                
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl font-bold text-red-700">2</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Navigate & Explore</h3>
                                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                        Use your mouse or touch to look around and move through the space
                                    </p>
                                </div>
                                
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl font-bold text-red-700">3</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Learn & Discover</h3>
                                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                        Click on hotspots to learn about equipment and amenities
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="py-16 bg-gradient-to-r from-red-900/80 to-red-700/80 backdrop-blur-sm relative overflow-hidden">
                        {/* CTA particles */}
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Experience</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">UltraFlex?</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Virtual tours are great, but nothing beats experiencing our facilities in person. 
                                Visit any location for a real tour and see why members love UltraFlex.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/locations">
                                    <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Find a Location
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="lg" variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Schedule a Visit
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}