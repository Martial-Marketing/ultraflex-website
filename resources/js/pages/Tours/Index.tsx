import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background
import { useState } from 'react';

interface Tour {
    id: number;
    locationName: string;
    locationSlug: string;
    image: string;
    tourUrl: string | null; // allow null for pending
    highlights: string[];
}

interface TourFeature {
    title: string;
    description: string;
    icon: string;
}

interface ToursIndexProps {
    tours: Tour[];
    tourFeatures: TourFeature[];
    auth: {
        user: any;
    };
}

export default function ToursIndex({ tours, tourFeatures, auth }: ToursIndexProps) {
    const matterportTours = [
        {
            name: 'York',
            url: 'https://my.matterport.com/show/?m=kZ7SPKSyTMt',
        },
        {
            name: 'Hull',
            url: 'https://my.matterport.com/show/?m=nfWTbfybzYt',
        },
        {
            name: 'Rotherham',
            url: 'https://my.matterport.com/show/?m=qcrWz3BZzrj',
        },
        {
            name: 'Derby',
            url: 'https://drive.google.com/file/d/1jdqNRl2rdfuUTqgrtpEgJFrXcTqjqDcM/preview',
        },
        {
            name: 'North Leeds',
            url: 'https://drive.google.com/file/d/1BYZxK7AkFeieHoZkurcqd98mpcJEMelW/preview',
        },
    ];

    const [matterportIndex, setMatterportIndex] = useState(0);

    const handlePrevMatterport = () => {
        setMatterportIndex((prev) => (prev === 0 ? matterportTours.length - 1 : prev - 1));
    };

    const handleNextMatterport = () => {
        setMatterportIndex((prev) => (prev === matterportTours.length - 1 ? 0 : prev + 1));
    };

    const handleTourClick = (tourUrl: string | null, locationSlug?: string) => {
        if (!tourUrl) return; // do nothing if pending
        
        // Override with Google Drive links for Derby and North Leeds
        let finalUrl = tourUrl;
        if (locationSlug?.toLowerCase() === 'derby') {
            finalUrl = 'https://drive.google.com/file/d/1jdqNRl2rdfuUTqgrtpEgJFrXcTqjqDcM/preview';
        } else if (locationSlug?.toLowerCase() === 'north-leeds') {
            finalUrl = 'https://drive.google.com/file/d/1BYZxK7AkFeieHoZkurcqd98mpcJEMelW/preview';
        }
        
        window.open(finalUrl, '_blank', 'width=1200,height=800');
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Virtual Gym Tours - ULTRAFLEX">
                <meta name="description" content="Take a virtual tour of our ULTRAFLEX gyms. Explore our state-of-the-art facilities from the comfort of your home." />
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
                                backgroundImage: 'url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&h=1080&fit=crop&q=80)'
                            }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
                        
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
                                <span className="text-white animate-pulse">Virtual</span>{' '}
                                <span className="text-white animate-pulse">Gym</span>{' '}
                                <span className="text-red-700 animate-pulse">Tours</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Explore our world-class facilities from anywhere. Take immersive 360° virtual tours 
                                of all ULTRAFLEX locations and see what makes us special.
                            </p>
                        </div>
                    </section>

                    {/* All Tours */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white animate-pulse">All</span>{' '}
                                <span className="text-white animate-pulse">Virtual</span>{' '}
                                <span className="text-red-700 animate-pulse">Tours</span>
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
                                                    onClick={() => handleTourClick(tour.tourUrl, tour.locationSlug)}
                                                >
                                                    Take Tour
                                                </Button>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{tour.locationName}</h3>
                                            <div className="space-y-2">
                                                <Button 
                                                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed"
                                                    onClick={() => handleTourClick(tour.tourUrl, tour.locationSlug)}
                                                    disabled={!tour.tourUrl}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        {tour.tourUrl ? 'Take Tour' : 'Coming Soon'}
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
                                <span className="text-white animate-pulse">Tour</span>{' '}
                                <span className="text-red-700 animate-pulse">Features</span>
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
                                <span className="text-white animate-pulse">How</span>{' '}
                                <span className="text-white animate-pulse">Virtual</span>{' '}
                                <span className="text-red-700 animate-pulse">Tours</span>{' '}
                                <span className="text-white animate-pulse">Work</span>
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl font-bold text-red-700">1</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Choose a Location</h3>
                                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                        Select any ULTRAFLEX location to explore virtually
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
                                <span className="text-white animate-pulse">Ready</span>{' '}
                                <span className="text-white animate-pulse">to</span>{' '}
                                <span className="text-red-700 animate-pulse">Experience</span>{' '}
                                <span className="ultraflex-ultra text-white animate-pulse">ULTRA</span><span className="ultraflex-flex text-red-700 animate-pulse">FLEX</span><span className="text-white animate-pulse">?</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Virtual tours are great, but nothing beats experiencing our facilities in person. 
                                Visit any location for a real tour and see why members love <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span>.
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

                    {/* Example Matterport Virtual Tour Embed */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-8">
                                <span className="text-white">Sample</span>{' '}
                                <span className="text-red-700">Matterport</span>{' '}
                                <span className="text-white">Virtual Tour</span>
                            </h2>
                            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-white/10 shadow-lg aspect-video bg-black relative">
                                <iframe
                                    src={matterportTours[matterportIndex].url}
                                    width="100%"
                                    height="480"
                                    allowFullScreen
                                    allow="xr-spatial-tracking"
                                    style={{ border: 0, width: '100%', height: '480px', minHeight: 320 }}
                                    title={`ULTRAFLEX Matterport Virtual Tour - ${matterportTours[matterportIndex].name}`}
                                />
                                {/* Carousel controls */}
                                <button
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-red-700/80 transition"
                                    onClick={handlePrevMatterport}
                                    aria-label="Previous Matterport"
                                    type="button"
                                >
                                    &#8592;
                                </button>
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-red-700/80 transition"
                                    onClick={handleNextMatterport}
                                    aria-label="Next Matterport"
                                    type="button"
                                >
                                    &#8594;
                                </button>
                                {/* Location name overlay */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
                                    {matterportTours[matterportIndex].name}
                                </div>
                            </div>
                            <p className="text-center text-gray-400 mt-4 text-sm">
                                Explore ULTRAFLEX gyms in 3D with Matterport.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}