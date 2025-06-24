import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
    MapPin, 
    Phone, 
    Clock, 
    Star, 
    Dumbbell, 
    Waves, 
    Car, 
    ShowerHead,
    Coffee,
    Wifi,
    Users,
    Camera
} from 'lucide-react';

interface Manager {
    name: string;
    bio: string;
    image: string;
    experience: string;
}

interface Trainer {
    id: number;
    name: string;
    image: string;
    specialties: string[];
    slug: string;
}

interface Equipment {
    name: string;
    icon: string;
    available: boolean;
}

interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

interface MembershipPlan {
    id: number;
    name: string;
    price: number;
    period: string;
    features: string[];
    popular?: boolean;
}

interface Location {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    image: string;
    heroVideo?: string;
    logo: string;
    hours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    manager: Manager;
    equipment: Equipment[];
    amenities: string[];
    trainers: Trainer[];
    reviews: Review[];
    gallery: string[];
    membershipPlans: MembershipPlan[];
    virtualTour?: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface LocationShowProps {
    location: Location;
    auth: {
        user: any;
    };
}

export default function LocationShow({ location }: LocationShowProps) {
    const averageRating = location.reviews.reduce((acc, review) => acc + review.rating, 0) / location.reviews.length;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
        ));
    };

    const getEquipmentIcon = (iconName: string) => {
        const icons: { [key: string]: any } = {
            dumbbell: Dumbbell,
            waves: Waves,
            car: Car,
            shower: ShowerHead,
            coffee: Coffee,
            wifi: Wifi,
            users: Users,
        };
        const IconComponent = icons[iconName] || Dumbbell;
        return <IconComponent className="h-6 w-6" />;
    };

    return (
        <>
            <Head title={`${location.name} - UltraFlex`}>
                <meta name="description" content={`Visit ${location.name} for premium fitness facilities, expert trainers, and state-of-the-art equipment. Located at ${location.address}.`} />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative h-96 overflow-hidden">
                    {location.heroVideo ? (
                        <video 
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                        >
                            <source src={location.heroVideo} type="video/mp4" />
                        </video>
                    ) : (
                        <img 
                            src={location.image} 
                            alt={location.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                    
                    <div className="relative z-10 flex h-full items-center">
                        <div className="container mx-auto px-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <img 
                                    src={location.logo} 
                                    alt={`${location.name} logo`}
                                    className="h-16 w-auto"
                                />
                                <h1 className="text-4xl font-bold text-white">{location.name}</h1>
                            </div>
                            <p className="text-xl text-gray-200 flex items-center">
                                <MapPin className="h-5 w-5 mr-2" />
                                {location.address}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Manager & Hours Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Meet The Manager */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet The Manager</h2>
                                <div className="flex space-x-6">
                                    <img 
                                        src={location.manager.image} 
                                        alt={location.manager.name}
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.manager.name}</h3>
                                        <p className="text-blue-600 font-medium mb-4">{location.manager.experience}</p>
                                        <p className="text-gray-600 leading-relaxed">{location.manager.bio}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Opening Times & Contact */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Opening Times & Contact</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <Clock className="h-5 w-5 mr-2" />
                                            Opening Hours
                                        </h3>
                                        <div className="space-y-2 text-gray-600">
                                            {Object.entries(location.hours).map(([day, hours]) => (
                                                <div key={day} className="flex justify-between">
                                                    <span className="capitalize font-medium">{day}:</span>
                                                    <span>{hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-600">{location.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-600">{location.address}</span>
                                        </div>
                                    </div>

                                    <Button 
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        onClick={() => window.open(`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
                                    >
                                        Get Directions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equipment & Facilities */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Equipment & Facilities</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {location.equipment.map((item, index) => (
                                <Card key={index} className={`text-center p-6 ${!item.available ? 'opacity-50' : ''}`}>
                                    <div className="flex justify-center mb-4 text-blue-600">
                                        {getEquipmentIcon(item.icon)}
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                    {!item.available && (
                                        <span className="text-xs text-red-500 mt-1">Coming Soon</span>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reviews */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Member Reviews</h2>
                            <div className="flex items-center justify-center space-x-2">
                                <div className="flex">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                                <span className="text-lg font-semibold text-gray-900">
                                    {averageRating.toFixed(1)} ({location.reviews.length} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {location.reviews.slice(0, 6).map((review) => (
                                <Card key={review.id} className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                                    <p className="font-semibold text-gray-900">- {review.name}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {location.gallery.map((image, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform cursor-pointer">
                                    <img 
                                        src={image} 
                                        alt={`${location.name} facility ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Personal Trainers */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Personal Trainers</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {location.trainers.map((trainer) => (
                                <Card key={trainer.id} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                                        <img 
                                            src={trainer.image} 
                                            alt={trainer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                                            {trainer.specialties.map((specialty, index) => (
                                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                        <Link href={`/trainers/${trainer.slug}`}>
                                            <Button variant="outline" className="w-full">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Membership Options */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Membership Options</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {location.membershipPlans.map((plan) => (
                                <Card key={plan.id} className={`relative p-8 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                        <div className="text-4xl font-bold text-blue-600">
                                            £{plan.price}
                                            <span className="text-lg text-gray-500">/{plan.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/register" className="block w-full">
                                        <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                                            Sign Up Now
                                        </Button>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Virtual Tour */}
                {location.virtualTour && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Take a Virtual Tour</h2>
                                <p className="text-gray-600">
                                    Explore our facilities from the comfort of your home
                                </p>
                            </div>
                            <div className="max-w-4xl mx-auto">
                                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                    <iframe 
                                        src={location.virtualTour}
                                        className="w-full h-full"
                                        allowFullScreen
                                        title={`${location.name} Virtual Tour`}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}