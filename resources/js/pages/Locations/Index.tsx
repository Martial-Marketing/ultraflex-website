import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, ChevronRight, Building, Navigation, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Location {
    id: number;
    name: string;
    address: string;
    phone: string;
    image: string;
    slug: string;
    hours: {
        weekdays: string;
        weekends: string;
    };
}

interface LocationsIndexProps {
    locations: Location[];
    auth: {
        user: any;
    };
}

export default function LocationsIndex({ locations }: LocationsIndexProps) {
    return (
        <>
            <Head title="Our Locations - UltraFlex">
                <meta name="description" content="Find the UltraFlex gym nearest to you. State-of-the-art equipment and premium amenities at every location." />
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Our</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Locations</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Find the UltraFlex gym nearest to you. Each location features 
                                state-of-the-art equipment, expert trainers, and premium amenities 
                                to help you achieve your fitness goals.
                            </p>
                        </div>
                    </section>

                    {/* Locations Grid */}
                    <section className="py-20">
                        <div className="container mx-auto px-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {locations.map((location) => (
                                    <Card key={location.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <div className="h-64 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={location.image} 
                                                alt={`${location.name} - UltraFlex Gym`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Location name overlay */}
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-xl font-bold drop-shadow-lg group-hover:text-red-700 transition-colors duration-300">{location.name}</h3>
                                            </div>

                                            {/* Premium badge */}
                                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-red-700/20">
                                                Premium
                                            </div>

                                            {/* View details overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm flex items-center">
                                                    <Building className="h-4 w-4 mr-2" />
                                                    View Details
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-start space-x-2 group hover:text-red-700 transition-colors duration-300">
                                                    <MapPin className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.address}</span>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2 group hover:text-red-700 transition-colors duration-300">
                                                    <Phone className="h-4 w-4 text-red-700 flex-shrink-0" />
                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.phone}</span>
                                                </div>
                                                
                                                <div className="flex items-start space-x-2 group hover:text-red-700 transition-colors duration-300">
                                                    <Clock className="h-4 w-4 text-red-700 mt-0.5 flex-shrink-0" />
                                                    <div className="text-gray-300 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                        <div>Mon-Fri: {location.hours.weekdays}</div>
                                                        <div>Sat-Sun: {location.hours.weekends}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Link href={`/locations/${location.slug}`} className="block w-full">
                                                    <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            View Gym Details
                                                        </span>
                                                        <ChevronRight className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-red-700/20 hover:border-red-700/50 transition-all duration-300 group"
                                                    onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(location.address)}`, '_blank')}
                                                >
                                                    <Navigation className="h-4 w-4 mr-2 text-red-700 group-hover:scale-110 transition-transform duration-300" />
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Get Directions
                                                    </span>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Call to Action */}
                            <div className="text-center mt-16">
                                <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl shadow-red-700/10 p-8 max-w-2xl mx-auto border border-white/10 relative overflow-hidden">
                                    {/* CTA particles */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        {Array.from({ length: 8 }, (_, i) => (
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

                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-bold mb-4">
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Can't</span>{' '}
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Find</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">a</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Location</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Near</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">You?</span>
                                        </h2>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            We're constantly expanding! Let us know where you'd like to see 
                                            a new UltraFlex location.
                                        </p>
                                        <Link href="/contact">
                                            <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Suggest a Location
                                                </span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}