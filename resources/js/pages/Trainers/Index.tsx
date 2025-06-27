import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Trainer {
    id: number;
    name: string;
    image: string;
    bio: string;
    specialties: string[];
    gender: 'Male' | 'Female' | 'Non-Binary';
    location: string;
    locationSlug: string;
    rating: number;
    reviewCount: number;
    experience: string;
    certifications: string[];
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

export default function TrainersIndex({ trainers, locations, specialties }: TrainersIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter trainers based on search and filters
    const filteredTrainers = trainers.filter(trainer => {
        const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            trainer.bio.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesSpecialty = !selectedSpecialty || 
                               trainer.specialties.some(specialty => 
                                   specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
                               );
        
        const matchesGender = !selectedGender || trainer.gender === selectedGender;
        
        const matchesLocation = !selectedLocation || trainer.locationSlug === selectedLocation;

        return matchesSearch && matchesSpecialty && matchesGender && matchesLocation;
    });





    return (
        <>
            <Head title="Personal Trainers - UltraFlex">
                <meta name="description" content="Find expert personal trainers at UltraFlex. Filter by specialty, location, and gender to find the perfect trainer for your fitness goals." />
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
                        {/* Additional particles for hero */}
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Personal</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Trainers</span>
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
                                        value={selectedSpecialty}
                                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                                        className="px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 bg-black/20 backdrop-blur-sm text-white"
                                    >
                                        <option value="" className="bg-black text-white">All Specialties</option>
                                        {specialties.map(specialty => (
                                            <option key={specialty} value={specialty} className="bg-black text-white">{specialty}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedGender}
                                        onChange={(e) => setSelectedGender(e.target.value)}
                                        className="px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 bg-black/20 backdrop-blur-sm text-white"
                                    >
                                        <option value="" className="bg-black text-white">All Genders</option>
                                        <option value="Male" className="bg-black text-white">Male</option>
                                        <option value="Female" className="bg-black text-white">Female</option>
                                        <option value="Non-Binary" className="bg-black text-white">Non-Binary</option>
                                    </select>

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
                                            setSelectedSpecialty('');
                                            setSelectedGender('');
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
                                    {filteredTrainers.map((trainer) => (
                                        <Card key={trainer.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="h-64 bg-gray-800 relative overflow-hidden">
                                                <img 
                                                    src={trainer.image} 
                                                    alt={`${trainer.name} - Personal Trainer`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* View profile overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                        View Profile
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-700 transition-colors duration-300">{trainer.name}</h3>
                                                    <p className="text-red-700 font-medium mb-2">{trainer.experience}</p>
                                                    <div className="text-gray-300 text-sm mb-3 group hover:text-red-700 transition-colors duration-300">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            {trainer.location}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-300 text-sm mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                                                    {trainer.bio}
                                                </p>

                                                {/* Specialties */}
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-white mb-2">Specialties:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {trainer.specialties.slice(0, 3).map((specialty, index) => (
                                                            <span 
                                                                key={index} 
                                                                className="inline-flex items-center space-x-1 px-2 py-1 bg-red-700/20 text-red-700 text-xs rounded-full backdrop-blur-sm border border-red-700/30"
                                                            >
                                                                <span>{specialty}</span>
                                                            </span>
                                                        ))}
                                                        {trainer.specialties.length > 3 && (
                                                            <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full backdrop-blur-sm border border-white/20">
                                                                +{trainer.specialties.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Link href={`/trainers/${trainer.slug}`} className="block w-full">
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                View Profile
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                    <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Contact Trainer
                                                        </span>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
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
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Start</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Training?</span>
                                        </h2>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            Book a consultation with one of our expert trainers and take the first 
                                            step towards achieving your fitness goals.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link href="/contact">
                                                <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Book Consultation
                                                    </span>
                                                </Button>
                                            </Link>
                                            <Link href="/locations">
                                                <Button size="lg" variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
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
        </>
    );
}