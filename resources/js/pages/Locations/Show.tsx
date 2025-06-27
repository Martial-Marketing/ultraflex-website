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
    Camera,
    ChevronRight,
    Navigation,
    Play,
    Eye,
    Award,
    ChevronLeft
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useState } from 'react';

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

export default function LocationShow({ location, auth }: LocationShowProps) {
    const [currentMembershipSlide, setCurrentMembershipSlide] = useState(0);
    const membershipPlansPerSlide = 3;
    const totalMembershipSlides = Math.ceil(location.membershipPlans.length / membershipPlansPerSlide);
    
    const averageRating = location.reviews.reduce((acc, review) => acc + review.rating, 0) / location.reviews.length;

    const nextMembershipSlide = () => {
        setCurrentMembershipSlide((prev) => (prev + 1) % totalMembershipSlides);
    };

    const prevMembershipSlide = () => {
        setCurrentMembershipSlide((prev) => (prev - 1 + totalMembershipSlides) % totalMembershipSlides);
    };

    const getCurrentMembershipPlans = () => {
        const startIndex = currentMembershipSlide * membershipPlansPerSlide;
        return location.membershipPlans.slice(startIndex, startIndex + membershipPlansPerSlide);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? 'fill-red-700 text-red-700' : 'text-gray-400'}`} 
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
        <AppLayout auth={auth}>
            <Head title={`${location.name} - UltraFlex`}>
                <meta name="description" content={`Visit ${location.name} for premium fitness facilities, expert trainers, and state-of-the-art equipment. Located at ${location.address}.`} />
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
                        
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                        
                        {/* Animated particles overlay */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 20 }, (_, i) => (
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
                        
                        <div className="relative z-10 flex h-full items-center">
                            <div className="container mx-auto px-6">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold text-white drop-shadow-lg">{location.name}</h1>
                                </div>
                                <p className="text-xl text-gray-200 flex items-center group hover:text-red-700 transition-colors duration-300">
                                    <MapPin className="h-5 w-5 mr-2 text-red-700" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {location.address}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Manager & Hours Section */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Meet The Manager */}
                                <div>
                                    <h2 className="text-3xl font-bold mb-8">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Meet</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">The</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Manager</span>
                                    </h2>
                                    <div className="flex space-x-6">
                                        <div className="relative group">
                                            <img 
                                                src={location.manager.image} 
                                                alt={location.manager.name}
                                                className="w-32 h-32 rounded-full object-cover border-4 border-red-700/30 backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2">{location.manager.name}</h3>
                                            <p className="text-red-700 font-medium mb-4">{location.manager.experience}</p>
                                            <p className="text-gray-300 leading-relaxed">{location.manager.bio}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Opening Times & Contact */}
                                <div>
                                    <h2 className="text-3xl font-bold mb-8">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Opening</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Times</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">&</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Contact</span>
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                                <Clock className="h-5 w-5 mr-2 text-red-700" />
                                                Opening Hours
                                            </h3>
                                            <div className="space-y-2 text-gray-300">
                                                {Object.entries(location.hours).map(([day, hours]) => (
                                                    <div key={day} className="flex justify-between group hover:text-red-700 transition-colors duration-300">
                                                        <span className="capitalize font-medium group-hover:translate-x-1 transition-transform duration-300">{day}:</span>
                                                        <span>{hours}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                <Phone className="h-5 w-5 text-red-700" />
                                                <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                <MapPin className="h-5 w-5 text-red-700" />
                                                <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.address}</span>
                                            </div>
                                        </div>

                                        <Button 
                                            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                            onClick={() => window.open(`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
                                        >
                                            <Navigation className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Get Directions
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Equipment & Facilities */}
                    <section className="py-16 bg-black/10 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Equipment</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">&</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Facilities</span>
                            </h2>
                            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {location.equipment.map((item, index) => (
                                    <Card key={index} className={`text-center p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group ${!item.available ? 'opacity-50' : ''}`}>
                                        <div className="flex justify-center mb-4 text-red-700 group-hover:scale-110 transition-transform duration-300">
                                            {getEquipmentIcon(item.icon)}
                                        </div>
                                        <h3 className="font-semibold text-white group-hover:text-red-700 transition-colors duration-300">{item.name}</h3>
                                        {!item.available ? (
                                            <span className="text-xs text-red-500 mt-1">Coming Soon</span>
                                        ) : (
                                            <span className="text-xs text-green-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Available</span>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">
                                    <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Member</span>{' '}
                                    <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Reviews</span>
                                </h2>
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="flex">
                                        {renderStars(Math.round(averageRating))}
                                    </div>
                                    <span className="text-lg font-semibold text-white">
                                        {averageRating.toFixed(1)} ({location.reviews.length} reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {location.reviews.slice(0, 6).map((review) => (
                                    <Card key={review.id} className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="text-sm text-gray-400">{review.date}</span>
                                        </div>
                                        <p className="text-gray-300 mb-4 italic group-hover:text-gray-200 transition-colors duration-300">"{review.comment}"</p>
                                        <p className="font-semibold text-white">- {review.name}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Gallery */}
                    <section className="py-16 bg-black/10 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Gallery</span>
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {location.gallery.map((image, index) => (
                                    <div key={index} className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10 hover:border-red-700/30 group relative">
                                        <img 
                                            src={image} 
                                            alt={`${location.name} facility ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                <Eye className="h-4 w-4" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">#{index + 1}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Personal Trainers */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Our</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Personal</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Trainers</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {location.trainers.map((trainer) => (
                                    <Card key={trainer.id} className="text-center overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <div className="h-64 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={trainer.image} 
                                                alt={trainer.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm flex items-center text-sm">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    View Profile
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-red-700 transition-colors duration-300">{trainer.name}</h3>
                                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                                {trainer.specialties.map((specialty, index) => (
                                                    <span key={index} className="px-3 py-1 bg-red-700/20 text-red-700 text-sm rounded-full backdrop-blur-sm border border-red-700/30">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link href={`/trainers/${trainer.slug}`}>
                                                <Button variant="outline" className="w-full bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-red-700/20 hover:border-red-700/50 transition-all duration-300 group">
                                                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View Profile
                                                    </span>
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Membership Options */}
                    <section className="py-16 bg-black/10 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Membership</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Options</span>
                            </h2>
                            
                            {/* Carousel Container */}
                            <div className="relative max-w-7xl mx-auto">
                                {/* Carousel Navigation */}
                                <div className="flex justify-between items-center mb-8">
                                    <button
                                        onClick={prevMembershipSlide}
                                        className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:border-red-700/30 transition-all duration-300 group hover:bg-red-700/10"
                                        disabled={currentMembershipSlide === 0}
                                    >
                                        <ChevronLeft className="h-6 w-6 text-gray-300 group-hover:text-red-700 transition-colors duration-300" />
                                    </button>
                                    
                                    <div className="flex space-x-2">
                                        {Array.from({ length: totalMembershipSlides }, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentMembershipSlide(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    currentMembershipSlide === index 
                                                        ? 'bg-red-700 shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                                                        : 'bg-white/20 hover:bg-white/40'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={nextMembershipSlide}
                                        className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:border-red-700/30 transition-all duration-300 group hover:bg-red-700/10"
                                        disabled={currentMembershipSlide === totalMembershipSlides - 1}
                                    >
                                        <ChevronRight className="h-6 w-6 text-gray-300 group-hover:text-red-700 transition-colors duration-300" />
                                    </button>
                                </div>

                                {/* Carousel Content */}
                                <div className="overflow-hidden">
                                    <div 
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{ transform: `translateX(-${currentMembershipSlide * 100}%)` }}
                                    >
                                        {Array.from({ length: totalMembershipSlides }, (_, slideIndex) => (
                                            <div key={slideIndex} className="w-full flex-shrink-0">
                                                <div className="grid md:grid-cols-3 gap-8 px-4">
                                                    {location.membershipPlans
                                                        .slice(slideIndex * membershipPlansPerSlide, (slideIndex + 1) * membershipPlansPerSlide)
                                                        .map((plan) => (
                                                        <Card key={plan.id} className={`relative p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-red-700/20 ${plan.popular ? 'ring-2 ring-red-700 scale-105' : ''}`}>
                                                            {plan.popular && (
                                                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                                    <span className="bg-gradient-to-r from-red-700 to-red-800 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-red-700/20 flex items-center animate-pulse">
                                                                        <Star className="h-3 w-3 mr-1 fill-white" />
                                                                        Most Popular
                                                                    </span>
                                                                </div>
                                                            )}
                                                            
                                                            <div className="text-center mb-6">
                                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{plan.name}</h3>
                                                                <div className="text-4xl font-bold text-red-700 group-hover:scale-110 transition-transform duration-300">
                                                                    £{plan.price}
                                                                    <span className="text-lg text-gray-400">/{plan.period}</span>
                                                                </div>
                                                            </div>

                                                            <ul className="space-y-3 mb-8 min-h-[160px]">
                                                                {plan.features.map((feature, index) => (
                                                                    <li key={index} className="flex items-center text-gray-300 group hover:text-white transition-colors duration-300">
                                                                        <div className="w-2 h-2 bg-red-700 rounded-full mr-3 group-hover:bg-red-600 transition-colors duration-300 flex-shrink-0"></div>
                                                                        <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            <Link href="/register" className="block w-full">
                                                                <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105">
                                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                        Sign Up Now
                                                                    </span>
                                                                    <ChevronRight className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                                                                </Button>
                                                            </Link>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile swipe indicators */}
                                <div className="flex justify-center mt-8 md:hidden">
                                    <div className="flex space-x-2">
                                        {Array.from({ length: totalMembershipSlides }, (_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    currentMembershipSlide === index 
                                                        ? 'bg-red-700' 
                                                        : 'bg-white/20'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Auto-advance hint */}
                                <div className="text-center mt-6">
                                    <p className="text-gray-400 text-sm">
                                        Showing plans {currentMembershipSlide * membershipPlansPerSlide + 1}-{Math.min((currentMembershipSlide + 1) * membershipPlansPerSlide, location.membershipPlans.length)} of {location.membershipPlans.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Virtual Tour */}
                    {location.virtualTour && (
                        <section className="py-16 bg-black/20 backdrop-blur-md">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Take</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">a</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Virtual</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Tour</span>
                                    </h2>
                                    <p className="text-gray-300">
                                        Explore our facilities from the comfort of your home
                                    </p>
                                </div>
                                <div className="max-w-4xl mx-auto">
                                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-white/10 hover:border-red-700/30 transition-colors duration-300 group">
                                        <iframe 
                                            src={location.virtualTour}
                                            className="w-full h-full"
                                            allowFullScreen
                                            title={`${location.name} Virtual Tour`}
                                        />
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-red-700/20 flex items-center">
                                                <Play className="h-3 w-3 mr-1" />
                                                360° Tour
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}