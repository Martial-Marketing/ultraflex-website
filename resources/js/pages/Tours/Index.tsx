import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Play, 
    Camera, 
    Eye, 
    Smartphone, 
    MousePointer, 
    Clock,
    MapPin,
    ExternalLink
} from 'lucide-react';

interface Tour {
    id: number;
    locationName: string;
    locationSlug: string;
    image: string;
    tourUrl: string;
    duration: string;
    highlights: string[];
    featured: boolean;
}

interface TourFeature {
    title: string;
    description: string;
    icon: string;
}

interface ToursIndexProps {
    tours: Tour[];
    tourFeatures: TourFeature[];
    featuredTours: Tour[];
    auth: {
        user: any;
    };
}

export default function ToursIndex({ tours, tourFeatures, featuredTours }: ToursIndexProps) {
    const getFeatureIcon = (iconName: string) => {
        const icons: { [key: string]: any } = {
            camera: Camera,
            cursor: MousePointer,
            eye: Eye,
            smartphone: Smartphone,
        };
        const IconComponent = icons[iconName] || Camera;
        return <IconComponent className="h-8 w-8" />;
    };

    const handleTourClick = (tourUrl: string) => {
        window.open(tourUrl, '_blank', 'width=1200,height=800');
    };

    return (
        <>
            <Head title="Virtual Gym Tours - UltraFlex">
                <meta name="description" content="Take a virtual tour of our UltraFlex gyms. Explore our state-of-the-art facilities from the comfort of your home." />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Virtual Gym Tours</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Explore our world-class facilities from anywhere. Take immersive 360° virtual tours 
                            of all UltraFlex locations and see what makes us special.
                        </p>
                    </div>
                </section>

                {/* Featured Tours */}
                {featuredTours.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Featured Tours</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {featuredTours.map((tour) => (
                                    <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                                            <img 
                                                src={tour.image} 
                                                alt={`${tour.locationName} virtual tour`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <Button 
                                                    size="lg"
                                                    className="bg-white text-blue-600 hover:bg-gray-100"
                                                    onClick={() => handleTourClick(tour.tourUrl)}
                                                >
                                                    <Play className="h-5 w-5 mr-2" />
                                                    Start Tour
                                                </Button>
                                            </div>
                                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Featured
                                            </div>
                                        </div>
                                        
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.locationName}</h3>
                                            <p className="text-gray-600 flex items-center mb-4">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {tour.duration} tour
                                            </p>
                                            
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Tour Highlights:</h4>
                                                <ul className="space-y-1">
                                                    {tour.highlights.map((highlight, index) => (
                                                        <li key={index} className="text-sm text-gray-600 flex items-center">
                                                            <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-2">
                                                <Button 
                                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                                    onClick={() => handleTourClick(tour.tourUrl)}
                                                >
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Start Virtual Tour
                                                </Button>
                                                <Link href={`/locations/${tour.locationSlug}`} className="block w-full">
                                                    <Button variant="outline" className="w-full">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        View Location Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* All Tours */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">All Virtual Tours</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tours.map((tour) => (
                                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        <img 
                                            src={tour.image} 
                                            alt={`${tour.locationName} virtual tour`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Button 
                                                className="bg-white text-blue-600 hover:bg-gray-100"
                                                onClick={() => handleTourClick(tour.tourUrl)}
                                            >
                                                <Play className="h-4 w-4 mr-2" />
                                                Start Tour
                                            </Button>
                                        </div>
                                        {tour.featured && (
                                            <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tour.locationName}</h3>
                                        <p className="text-gray-600 flex items-center mb-4 text-sm">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {tour.duration} virtual tour
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <Button 
                                                className="w-full bg-blue-600 hover:bg-blue-700"
                                                onClick={() => handleTourClick(tour.tourUrl)}
                                            >
                                                <Play className="h-4 w-4 mr-2" />
                                                Take Tour
                                            </Button>
                                            <Link href={`/locations/${tour.locationSlug}`} className="block w-full">
                                                <Button variant="outline" className="w-full">
                                                    Location Info
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
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tour Features</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {tourFeatures.map((feature, index) => (
                                <Card key={index} className="p-6 text-center">
                                    <div className="flex justify-center mb-4 text-blue-600">
                                        {getFeatureIcon(feature.icon)}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Virtual Tours Work</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">1</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Location</h3>
                                <p className="text-gray-600">
                                    Select any UltraFlex location to explore virtually
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">2</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Navigate & Explore</h3>
                                <p className="text-gray-600">
                                    Use your mouse or touch to look around and move through the space
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">3</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn & Discover</h3>
                                <p className="text-gray-600">
                                    Click on hotspots to learn about equipment and amenities
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Experience UltraFlex?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Virtual tours are great, but nothing beats experiencing our facilities in person. 
                            Visit any location for a real tour and see why members love UltraFlex.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/locations">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    Find a Location
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                    Schedule a Visit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}