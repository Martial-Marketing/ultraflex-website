import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Trainer {
    id: number;
    name: string;
    image: string;
    bio: string;
    specialties: string[];
    gender?: 'Male' | 'Female' | 'Non-Binary';
    location?: string | null;
    locationSlug?: string | null;
    rating?: number;
    reviewCount?: number;
    experience?: string;
    certifications?: string[];
    slug: string;
}

interface TrainersIndexProps {
    trainers: Trainer[];
    locations: { name: string; slug: string }[];
    specialties: string[];
    auth: {
        user: any;
    };
}

export default function TrainersIndex({ trainers, locations, specialties, auth }: TrainersIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const getThreeSentenceSummary = (text: string) => {
        if (!text) return '';
        const parts = text
            .replace(/\n+/g, ' ')
            .split(/([.!?])\s+/)
            .reduce((acc: string[], cur: string, idx: number) => {
                if (idx % 2 === 0) {
                    const punctuation = (text.match(/([.!?])\s+/g) || [])[Math.floor(idx / 2)] || '';
                    acc.push((cur + (punctuation ? punctuation.trim() : '')).trim());
                }
                return acc;
            }, [])
            .filter(Boolean);
        return parts.slice(0, 3).join(' ');
    };

    // Filter trainers based on search and filters
    const filteredTrainers = trainers.filter(trainer => {
        const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            trainer.bio.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = !selectedLocation || trainer.locationSlug === selectedLocation;

        return matchesSearch && matchesLocation;
    });





    return (
        <AppLayout auth={auth}>
            <Head title="Personal Trainers - ULTRAFLEX">
                <meta name="description" content="Find expert personal trainers at ULTRAFLEX. Filter by specialty, location, and gender to find the perfect trainer for your fitness goals." />
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
                                backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&q=80)'
                            }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
                        
                        {/* Additional particles for hero */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 8 }, (_, i) => (
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">Our</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">Personal</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">Trainers</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Work with certified fitness professionals who are passionate about helping 
                                you achieve your goals. Find the perfect trainer for your fitness journey.
                            </p>
                        </div>
                    </section>

                    {/* Search and Filters */}
                    <section className="py-8 bg-black/40 backdrop-blur-md border-b border-white/10">
                        <div className="container mx-auto px-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                {/* Search */}
                                <div className="relative flex-1 max-w-md">
                                    <Input
                                        type="text"
                                        placeholder="Search trainers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                    />
                                </div>

                                {/* Filter Toggle */}
                                <Button
                                    variant="outline"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Filters</span>
                                </Button>

                                {/* Desktop Filters */}
                                <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'} w-full lg:w-auto`}>
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 bg-black/20 backdrop-blur-sm text-white"
                                    >
                                        <option value="" className="bg-black text-white">All Locations</option>
                                        {locations.map(location => (
                                            <option key={location.slug} value={location.slug} className="bg-black text-white">{location.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mt-4 text-gray-300">
                                Showing {filteredTrainers.length} of {trainers.length} trainers
                            </div>
                        </div>
                    </section>

                    {/* Trainers Grid */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            {filteredTrainers.length === 0 ? (
                                <div className="text-center py-16">
                                    <h3 className="text-2xl font-semibold text-white mb-2">No trainers found</h3>
                                    <p className="text-gray-300 mb-6">
                                        Try adjusting your search criteria or filters
                                    </p>
                                    <Button 
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedLocation('');
                                        }}
                                        variant="outline"
                                        className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Clear All Filters
                                        </span>
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredTrainers.map((trainer) => {
                                        const firstName = (trainer.name || '').split(/\s+/)[0];
                                        const bioThreeSentences = getThreeSentenceSummary(trainer.bio);
                                        return (
                                            <Link key={trainer.id} href={`/trainers/${trainer.slug}`} className="group focus:outline-none block">
                                                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col h-[380px] transition-all duration-300 hover:border-red-700/40 hover:shadow-red-700/20 hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-red-700">
                                                    <div className="flex items-center justify-center pt-4">
                                                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-red-700/40 shadow-lg">
                                                            <img
                                                                src={trainer.image}
                                                                alt={trainer.name}
                                                                loading="lazy"
                                                                className="w-full h-full object-cover object-top"
                                                            />
                                                            <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-red-700/50 rounded-full transition-all duration-300 pointer-events-none"></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex flex-col p-4 gap-2">
                                                        <h3 className="text-base font-semibold text-white group-hover:text-red-600 transition-colors duration-300">{firstName}</h3>
                                                        {trainer.specialties && trainer.specialties.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {trainer.specialties.slice(0,3).map((specialty, index) => (
                                                                    <span key={index} className="px-2 py-0.5 bg-red-700/15 text-red-500 text-[10px] rounded-full border border-red-700/30">{specialty}</span>
                                                                ))}
                                                                {trainer.specialties.length > 3 && (
                                                                    <span className="px-2 py-0.5 bg-white/10 text-white/70 text-[10px] rounded-full">+{trainer.specialties.length - 3}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                        <p
                                                            className="text-xs text-gray-300 overflow-hidden mt-1 flex-1"
                                                            style={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 3,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                lineHeight: '1rem',
                                                                minHeight: '3rem',
                                                                maxHeight: '3rem'
                                                            }}
                                                        >
                                                            {bioThreeSentences}
                                                        </p>
                                                        <div className="mt-2 flex items-center justify-end">
                                                            <span className="inline-flex items-center text-[11px] text-red-500 font-medium tracking-wide">
                                                                View Profile
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
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
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">Ready</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">to</span>{' '}
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">Start</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">Training?</span>
                                        </h2>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            Connect with one of our expert trainers and take the first 
                                            step towards achieving your fitness goals.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link href="/locations">
                                                <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Find a Location
                                                    </span>
                                                </Button>
                                            </Link>
                                        </div>
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