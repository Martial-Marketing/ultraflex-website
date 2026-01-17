import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, ChevronRight, Building, Navigation, Zap, ChevronLeft, Star, Check } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useState } from 'react';

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
    mapUrl?: string;
    // Optional virtual tour flag (in case backend adds later)
    virtualTour?: string | null;
    features?: string[];
}

interface MembershipPlan {
    id: number;
    name: string;
    price: number;
    period: string;
    features: string[];
    popular: boolean;
}

interface LocationsIndexProps {
    locations: Location[];
    membershipPlans: MembershipPlan[];
    auth: {
        user: any;
    };
}

export default function LocationsIndex({ locations, membershipPlans, auth }: LocationsIndexProps) {
    const [currentMembershipSlide, setCurrentMembershipSlide] = useState(0);
    const membershipPlansPerSlide = 3;
    const totalMembershipSlides = Math.ceil(membershipPlans.length / membershipPlansPerSlide);

    const nextMembershipSlide = () => {
        setCurrentMembershipSlide((prev) => (prev + 1) % totalMembershipSlides);
        // Sound files referenced elsewhere (success/error/warning/info) are currently missing.
        // If audio feedback is required later, place mp3 files in public/sounds/ and implement a hook.
    };

    const prevMembershipSlide = () => {
        setCurrentMembershipSlide((prev) => (prev - 1 + totalMembershipSlides) % totalMembershipSlides);
    };

    const getCurrentMembershipPlans = () => {
        const startIndex = currentMembershipSlide * membershipPlansPerSlide;
        return membershipPlans.slice(startIndex, startIndex + membershipPlansPerSlide);
    };
    return (
        <AppLayout auth={auth}>
            <Head title="Our Locations - ULTRAFLEX">
                <meta name="description" content="Find the ULTRAFLEX gym nearest to you. State-of-the-art equipment and premium amenities at every location." />
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
                                backgroundImage: "url('/Images/athens/gym-in-athens-2.webp')"
                            }}
                        />
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-0" />
                        
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
                                <span className="text-white animate-pulse">Our</span>{' '}
                                <span className="text-red-700 animate-pulse">Locations</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Find the <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> gym nearest to you. Each location features 
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
                                    <Card key={location.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/20 border border-white/10 hover:border-red-700/30 group" aria-label={`Gym location card for ${location.name}`}> 
                                        <div className="h-64 bg-gray-800 relative overflow-hidden">
                                            <img
                                                src={location.image}
                                                alt={`${location.name} facility hero image`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            {location.virtualTour && (
                                                <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-semibold px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                                                    <span className="inline-block w-2 h-2 bg-red-700 rounded-full animate-pulse" />
                                                    Virtual Tour
                                                </div>
                                            )}
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-xl font-bold group-hover:text-red-700 transition-colors duration-300">
                                                    <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-700">FLEX</span> {location.name.replace(/ULTRAFLEX\s*/i, '')}
                                                </h3>
                                            </div>
                                            {/* Removed Premium badge per requirement */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm flex items-center">
                                                    <Building className="h-4 w-4 mr-2" />
                                                    View Details
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-transparent">
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
                                                        <div>{location.hours.weekends.includes('Sat:') || location.hours.weekends.includes('Sun:') ? location.hours.weekends : `Sat-Sun: ${location.hours.weekends}`}</div>
                                                        {location.features?.some(f => f.includes('Full Access Members')) && (
                                                            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-700/20 text-red-400 border border-red-700/30">
                                                                {location.features.find(f => f.includes('Full Access Members'))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                {location.slug === 'athens-greece' ? (
                                                    <a href="https://ultraflexgym.gr/" target="_blank" rel="noopener noreferrer" className="block w-full">
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Visit Athens Site
                                                            </span>
                                                        </Button>
                                                    </a>
                                                ) : (
                                                    <Link href={`/locations/${location.slug}`} className="block w-full">
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                View Gym Details
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                                    onClick={() => window.open(location.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(location.address)}`, '_blank')}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Get Directions
                                                    </span>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Membership Options Carousel - hidden per request */}
                            {false && (
                            <div className="mt-24">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">
                                        <span className="text-white animate-pulse">Membership</span>{' '}
                                        <span className="text-red-700 animate-pulse">Options</span>
                                    </h2>
                                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                        Choose the perfect membership plan that fits your lifestyle and budget. 
                                        All plans include access to our premium equipment and facilities.
                                    </p>
                                </div>

                                {/* Carousel Container */}
                                <div className="relative">
                                    <div className="overflow-hidden">
                                        <div 
                                            className="flex transition-transform duration-500 ease-in-out" 
                                            style={{ transform: `translateX(-${currentMembershipSlide * 100}%)` }}
                                        >
                                            {Array.from({ length: totalMembershipSlides }, (_, slideIndex) => (
                                                <div key={slideIndex} className="w-full flex-shrink-0">
                                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 mx-4 items-stretch">
                                                        {membershipPlans
                                                            .slice(slideIndex * membershipPlansPerSlide, slideIndex * membershipPlansPerSlide + membershipPlansPerSlide)
                                                            .map((plan) => (                                                <Card 
                                                    key={plan.id} 
                                                    className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col bg-black/40 border border-white/10 hover:border-red-700/30 backdrop-blur-md`}
                                                >
                                                                                      <CardContent className="p-6 relative flex-1 flex flex-col">
                                                        <div className="text-center mb-6">
                                                            <h3 className="text-xl font-bold text-white group-hover:text-red-700 transition-colors duration-300 mb-2">
                                                                {plan.name}
                                                            </h3>
                                                            <div className="flex items-baseline justify-center flex-wrap">
                                                                <span className="text-3xl font-bold text-red-700">£{plan.price}</span>
                                                                <span className="text-gray-400 ml-2 text-sm">/{plan.period}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        {plan.features?.length ? (
                                                            <ul className="space-y-3 mb-6 flex-1">
                                                                {plan.features.map((feature, index) => (
                                                                    <li key={index} className="flex items-start text-gray-300 group-hover:text-white transition-colors duration-300">
                                                                        <Check className="h-4 w-4 text-red-700 mr-3 flex-shrink-0 mt-0.5" />
                                                                        <span className="text-sm leading-relaxed">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <div className="text-gray-400 text-sm mb-6 flex-1 flex items-center justify-center italic">Features updating...</div>
                                                        )}
                                                        
                                                        <Button 
                                                            className={`w-full font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group mt-auto bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white border border-red-700/20 backdrop-blur-sm`}
                                                        >
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Choose This Plan
                                                            </span>
                                                        </Button>
                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation Arrows */}
                                    {totalMembershipSlides > 1 && (
                                        <>
                                            <Button
                                                onClick={prevMembershipSlide}
                                                className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-red-700/80 text-white p-2 rounded-full shadow-lg backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 z-10"
                                                size="sm"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                onClick={nextMembershipSlide}
                                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-red-700/80 text-white p-2 rounded-full shadow-lg backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 z-10"
                                                size="sm"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </Button>
                                        </>
                                    )}

                                    {/* Carousel Indicators */}
                                    {totalMembershipSlides > 1 && (
                                        <div className="flex justify-center mt-8 space-x-2">
                                            {Array.from({ length: totalMembershipSlides }, (_, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => setCurrentMembershipSlide(index)}
                                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                        index === currentMembershipSlide
                                                            ? 'bg-red-700 scale-125'
                                                            : 'bg-white/30 hover:bg-white/50'
                                                    }`}
                                                    size="sm"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            )}

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
                                            <span className="text-white animate-pulse">Can't</span>{' '}
                                            <span className="text-red-700 animate-pulse">Find</span>{' '}
                                            <span className="text-white animate-pulse">a</span>{' '}
                                            <span className="text-white animate-pulse">Location</span>{' '}
                                            <span className="text-white animate-pulse">Near</span>{' '}
                                            <span className="text-white animate-pulse">You?</span>
                                        </h2>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            We're constantly expanding! Let us know where you'd like to see 
                                            a new ULTRAFLEX location.
                                        </p>
                                        <Link href="/contact">
                                            <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
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

        </AppLayout>
    );
}