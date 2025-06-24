import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
    Search, 
    Filter, 
    Dumbbell, 
    Heart, 
    Zap, 
    Target,
    MapPin,
    Play,
    Info
} from 'lucide-react';

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

export default function EquipmentIndex({ equipment, categories, muscleGroups, locations }: EquipmentIndexProps) {
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

    const getCategoryIcon = (category: string) => {
        const icons: { [key: string]: any } = {
            'Cardio': Heart,
            'Strength': Dumbbell,
            'Functional': Zap,
            'Flexibility': Target,
        };
        
        const IconComponent = icons[category] || Dumbbell;
        return <IconComponent className="h-5 w-5" />;
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            'Beginner': 'bg-green-100 text-green-600',
            'Intermediate': 'bg-yellow-100 text-yellow-600',
            'Advanced': 'bg-red-100 text-red-600',
        };
        return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-600';
    };

    return (
        <>
            <Head title="Gym Equipment - UltraFlex">
                <meta name="description" content="Explore our comprehensive range of premium gym equipment. Find the perfect equipment for your workout at any UltraFlex location." />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Premium Equipment</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Discover our comprehensive range of state-of-the-art fitness equipment. 
                            From cardio machines to strength training gear, we have everything you need 
                            to achieve your fitness goals.
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
                                    placeholder="Search equipment..."
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
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedMuscleGroup}
                                    onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Muscle Groups</option>
                                    {muscleGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
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
                            Showing {filteredEquipment.length} of {equipment.length} equipment pieces
                        </div>
                    </div>
                </section>

                {/* Equipment Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        {filteredEquipment.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-gray-400 mb-4">
                                    <Dumbbell className="h-16 w-16 mx-auto" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No equipment found</h3>
                                <p className="text-gray-600 mb-6">
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
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredEquipment.map((item) => (
                                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                loading="lazy"
                                            />
                                            
                                            {/* Video indicator */}
                                            {item.video && (
                                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full p-2">
                                                    <Play className="h-4 w-4 text-white" />
                                                </div>
                                            )}

                                            {/* Category icon */}
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-blue-600">
                                                {getCategoryIcon(item.category)}
                                            </div>

                                            {/* Difficulty badge */}
                                            <div className="absolute bottom-4 left-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                                                    {item.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <CardContent className="p-6">
                                            <div className="mb-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                                    {item.brand && (
                                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                            {item.brand}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-blue-600 font-medium text-sm mb-2">{item.category}</p>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {item.description}
                                            </p>

                                            {/* Muscle Groups */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Targets:</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.muscleGroups.slice(0, 3).map((group, index) => (
                                                        <span 
                                                            key={index} 
                                                            className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                                                        >
                                                            {group}
                                                        </span>
                                                    ))}
                                                    {item.muscleGroups.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            +{item.muscleGroups.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Available Locations */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    Available at:
                                                </h4>
                                                <div className="space-y-1">
                                                    {item.locations.slice(0, 2).map((location, index) => (
                                                        <div key={index} className="flex justify-between text-sm text-gray-600">
                                                            <span>{location.name}</span>
                                                            <span className="font-medium">{location.quantity} units</span>
                                                        </div>
                                                    ))}
                                                    {item.locations.length > 2 && (
                                                        <div className="text-sm text-gray-500">
                                                            +{item.locations.length - 2} more locations
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Features */}
                                            {item.features.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        {item.features.slice(0, 3).map((feature, index) => (
                                                            <li key={index} className="flex items-center">
                                                                <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <Link href={`/equipment/${item.slug}`} className="block w-full">
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                        <Info className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                                {item.video && (
                                                    <Button variant="outline" className="w-full">
                                                        <Play className="h-4 w-4 mr-2" />
                                                        Watch Demo
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
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Equipment Categories</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categories.map((category) => {
                                    const categoryCount = equipment.filter(item => item.category === category).length;
                                    return (
                                        <Card key={category} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                                              onClick={() => setSelectedCategory(category)}>
                                            <div className="flex justify-center mb-4 text-blue-600">
                                                {getCategoryIcon(category)}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
                                            <p className="text-gray-600 text-sm">{categoryCount} equipment pieces</p>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Ready to Try Our Equipment?
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Visit any of our locations to experience our premium equipment firsthand. 
                                    Our staff will be happy to show you how to use any piece of equipment safely and effectively.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/locations">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            Find a Location
                                        </Button>
                                    </Link>
                                    <Link href="/tours">
                                        <Button size="lg" variant="outline">
                                            Take a Virtual Tour
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