import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
    Search, 
    Filter, 
    MapPin, 
    Star, 
    Users, 
    Dumbbell,
    Heart,
    Target,
    Award
} from 'lucide-react';

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

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
        ));
    };

    const getSpecialtyIcon = (specialty: string) => {
        const icons: { [key: string]: any } = {
            'strength': Dumbbell,
            'weight loss': Heart,
            'bodybuilding': Users,
            'nutrition': Target,
            'conditioning': Award,
        };
        
        const specialtyKey = specialty.toLowerCase();
        for (const [key, IconComponent] of Object.entries(icons)) {
            if (specialtyKey.includes(key)) {
                return <IconComponent className="h-4 w-4" />;
            }
        }
        return <Dumbbell className="h-4 w-4" />;
    };

    return (
        <>
            <Head title="Personal Trainers - UltraFlex">
                <meta name="description" content="Find expert personal trainers at UltraFlex. Filter by specialty, location, and gender to find the perfect trainer for your fitness goals." />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Our Personal Trainers</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Work with certified fitness professionals who are passionate about helping 
                            you achieve your goals. Find the perfect trainer for your fitness journey.
                        </p>
                    </div>
                </section>

                {/* Search and Filters */}
                <section className="py-8 bg-white border-b">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search trainers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Filter Toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden"
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>

                            {/* Desktop Filters */}
                            <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'} w-full lg:w-auto`}>
                                <select
                                    value={selectedSpecialty}
                                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Specialties</option>
                                    {specialties.map(specialty => (
                                        <option key={specialty} value={specialty}>{specialty}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedGender}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Genders</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-Binary">Non-Binary</option>
                                </select>

                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Locations</option>
                                    {locations.map(location => (
                                        <option key={location.slug} value={location.slug}>{location.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-gray-600">
                            Showing {filteredTrainers.length} of {trainers.length} trainers
                        </div>
                    </div>
                </section>

                {/* Trainers Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        {filteredTrainers.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-gray-400 mb-4">
                                    <Users className="h-16 w-16 mx-auto" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No trainers found</h3>
                                <p className="text-gray-600 mb-6">
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
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredTrainers.map((trainer) => (
                                    <Card key={trainer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="h-64 bg-gray-200 relative overflow-hidden">
                                            <img 
                                                src={trainer.image} 
                                                alt={`${trainer.name} - Personal Trainer`}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                                                <div className="flex">
                                                    {renderStars(trainer.rating)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {trainer.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <CardContent className="p-6">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{trainer.name}</h3>
                                                <p className="text-blue-600 font-medium mb-2">{trainer.experience}</p>
                                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {trainer.location}
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {trainer.bio}
                                            </p>

                                            {/* Specialties */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {trainer.specialties.slice(0, 3).map((specialty, index) => (
                                                        <span 
                                                            key={index} 
                                                            className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                                                        >
                                                            {getSpecialtyIcon(specialty)}
                                                            <span>{specialty}</span>
                                                        </span>
                                                    ))}
                                                    {trainer.specialties.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            +{trainer.specialties.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Certifications */}
                                            {trainer.certifications.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications:</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {trainer.certifications.slice(0, 2).map((cert, index) => (
                                                            <span 
                                                                key={index} 
                                                                className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full"
                                                            >
                                                                <Award className="h-3 w-3" />
                                                                <span>{cert}</span>
                                                            </span>
                                                        ))}
                                                        {trainer.certifications.length > 2 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                +{trainer.certifications.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Reviews */}
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <div className="flex">
                                                    {renderStars(trainer.rating)}
                                                </div>
                                                <span className="ml-2">
                                                    {trainer.rating.toFixed(1)} ({trainer.reviewCount} reviews)
                                                </span>
                                            </div>

                                            <div className="space-y-2">
                                                <Link href={`/trainers/${trainer.slug}`} className="block w-full">
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                        View Profile
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" className="w-full">
                                                    Contact Trainer
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="text-center mt-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Ready to Start Training?
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Book a consultation with one of our expert trainers and take the first 
                                    step towards achieving your fitness goals.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/contact">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            Book Consultation
                                        </Button>
                                    </Link>
                                    <Link href="/locations">
                                        <Button size="lg" variant="outline">
                                            Find a Location
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}