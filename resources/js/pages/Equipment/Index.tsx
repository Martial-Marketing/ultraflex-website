import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Equipment {
    id: number;
    name: string;
    image: string;
    video?: string;
    category: string;
    muscleGroups: string[];
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    locations: {
        name: string;
        slug: string;
        quantity: number;
    }[];
    slug: string;
    brand?: string;
    features: string[];
}

interface EquipmentIndexProps {
    equipment: Equipment[];
    categories: string[];
    muscleGroups: string[];
    locations: { name: string; slug: string }[];
    auth: {
        user: any;
    };
}

export default function EquipmentIndex({ equipment, categories, muscleGroups, locations, auth }: EquipmentIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter equipment based on search and filters
    const filteredEquipment = equipment.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.brand?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        
        const matchesMuscleGroup = !selectedMuscleGroup || 
                                 item.muscleGroups.some(group => 
                                     group.toLowerCase().includes(selectedMuscleGroup.toLowerCase())
                                 );
        
        const matchesLocation = !selectedLocation || 
                              item.locations.some(loc => loc.slug === selectedLocation);

        return matchesSearch && matchesCategory && matchesMuscleGroup && matchesLocation;
    });



    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            'Beginner': 'bg-green-700/20 text-green-400 backdrop-blur-sm border border-green-700/30',
            'Intermediate': 'bg-yellow-700/20 text-yellow-400 backdrop-blur-sm border border-yellow-700/30',
            'Advanced': 'bg-red-700/20 text-red-700 backdrop-blur-sm border border-red-700/30',
        };
        return colors[difficulty as keyof typeof colors] || 'bg-white/10 text-gray-300 backdrop-blur-sm border border-white/20';
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Gym Equipment - UltraFlex">
                <meta name="description" content="Explore our comprehensive range of premium gym equipment. Find the perfect equipment for your workout at any UltraFlex location." />
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
                                backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&q=80)'
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Premium</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Equipment</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Discover our comprehensive range of state-of-the-art fitness equipment. 
                                From cardio machines to strength training gear, we have everything you need 
                                to achieve your fitness goals.
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
                                        placeholder="Search equipment..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50"
                                    />
                                </div>

                                {/* Filter Toggle */}
                                <Button
                                    variant="outline"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        Filters
                                    </span>
                                </Button>

                                {/* Desktop Filters */}
                                <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'} w-full lg:w-auto`}>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 bg-black/20 backdrop-blur-sm text-white"
                                    >
                                        <option value="" className="bg-black text-white">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category} value={category} className="bg-black text-white">{category}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedMuscleGroup}
                                        onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                                        className="px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 bg-black/20 backdrop-blur-sm text-white"
                                    >
                                        <option value="" className="bg-black text-white">All Muscle Groups</option>
                                        {muscleGroups.map(group => (
                                            <option key={group} value={group} className="bg-black text-white">{group}</option>
                                        ))}
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
                                Showing {filteredEquipment.length} of {equipment.length} equipment pieces
                            </div>
                        </div>
                    </section>

                    {/* Equipment Grid */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            {filteredEquipment.length === 0 ? (
                                <div className="text-center py-16">
                                    <h3 className="text-2xl font-semibold text-white mb-2">No equipment found</h3>
                                    <p className="text-gray-300 mb-6">
                                        Try adjusting your search criteria or filters
                                    </p>
                                    <Button 
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCategory('');
                                            setSelectedMuscleGroup('');
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
                                    {filteredEquipment.map((item) => (
                                        <Card key={item.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="relative h-64 bg-gray-800 overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Video indicator */}
                                                {item.video && (
                                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10 text-white text-xs">
                                                        Video
                                                    </div>
                                                )}

                                                {/* Category badge - remove icon usage */}
                                                <div className="absolute top-4 right-4 bg-red-700/20 backdrop-blur-sm rounded-full px-3 py-1 text-red-700 border border-red-700/30 text-xs">
                                                    {item.category}
                                                </div>

                                                {/* Difficulty badge */}
                                                <div className="absolute bottom-4 left-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                                                        {item.difficulty}
                                                    </span>
                                                </div>

                                                {/* View details overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                        View Details
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                                <div className="mb-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="text-xl font-bold text-white group-hover:text-red-700 transition-colors duration-300">{item.name}</h3>
                                                        {item.brand && (
                                                            <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded backdrop-blur-sm border border-white/20">
                                                                {item.brand}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-red-700 font-medium text-sm mb-2">{item.category}</p>
                                                </div>

                                                <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                                                    {item.description}
                                                </p>

                                                {/* Muscle Groups */}
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-white mb-2">Targets:</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.muscleGroups.slice(0, 3).map((group, index) => (
                                                            <span 
                                                                key={index} 
                                                                className="px-2 py-1 bg-red-700/20 text-red-700 text-xs rounded-full backdrop-blur-sm border border-red-700/30"
                                                            >
                                                                {group}
                                                            </span>
                                                        ))}
                                                        {item.muscleGroups.length > 3 && (
                                                            <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full backdrop-blur-sm border border-white/20">
                                                                +{item.muscleGroups.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Available Locations */}
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-white mb-2">
                                                        Available at:
                                                    </h4>
                                                    <div className="space-y-1">
                                                        {item.locations.slice(0, 2).map((location, index) => (
                                                            <div key={index} className="flex justify-between text-sm text-gray-300 group hover:text-red-700 transition-colors duration-300">
                                                                <span className="group-hover:translate-x-1 transition-transform duration-300">{location.name}</span>
                                                                <span className="font-medium">{location.quantity} units</span>
                                                            </div>
                                                        ))}
                                                        {item.locations.length > 2 && (
                                                            <div className="text-sm text-gray-400">
                                                                +{item.locations.length - 2} more locations
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Features */}
                                                {item.features.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                                                        <ul className="text-xs text-gray-300 space-y-1">
                                                            {item.features.slice(0, 3).map((feature, index) => (
                                                                <li key={index} className="flex items-center group hover:text-red-700 transition-colors duration-300">
                                                                    <div className="w-1 h-1 bg-red-700 rounded-full mr-2 group-hover:bg-red-600 transition-colors duration-300"></div>
                                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <Link href={`/equipment/${item.slug}`} className="block w-full">
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                View Details
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                    {item.video && (
                                                        <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Watch Demo
                                                            </span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Categories Overview */}
                            <div className="mt-20">
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Equipment</span>{' '}
                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Categories</span>
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {categories.map((category) => {
                                        const categoryCount = equipment.filter(item => item.category === category).length;
                                        return (
                                            <Card key={category} className="p-6 text-center hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group"
                                                  onClick={() => setSelectedCategory(category)}>
                                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{category}</h3>
                                                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{categoryCount} equipment pieces</p>
                                            </Card>
                                        );
                                    })}
                                </div>
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
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Try</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Our</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Equipment?</span>
                                        </h2>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            Visit any of our locations to experience our premium equipment firsthand. 
                                            Our staff will be happy to show you how to use any piece of equipment safely and effectively.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link href="/locations">
                                                <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Find a Location
                                                    </span>
                                                </Button>
                                            </Link>
                                            <Link href="/tours">
                                                <Button size="lg" variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Take a Virtual Tour
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