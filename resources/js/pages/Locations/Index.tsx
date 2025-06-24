import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock } from 'lucide-react';

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

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Our Locations</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
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
                                <Card key={location.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                                        <img 
                                            src={location.image} 
                                            alt={`${location.name} - UltraFlex Gym`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold">{location.name}</h3>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="p-6">
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-start space-x-2">
                                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-600">{location.address}</span>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-600">{location.phone}</span>
                                            </div>
                                            
                                            <div className="flex items-start space-x-2">
                                                <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <div className="text-gray-600 text-sm">
                                                    <div>Mon-Fri: {location.hours.weekdays}</div>
                                                    <div>Sat-Sun: {location.hours.weekends}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Link href={`/locations/${location.slug}`} className="block w-full">
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                    View Gym Details
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="outline" 
                                                className="w-full"
                                                onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(location.address)}`, '_blank')}
                                            >
                                                Get Directions
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Can't Find a Location Near You?
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    We're constantly expanding! Let us know where you'd like to see 
                                    a new UltraFlex location.
                                </p>
                                <Link href="/contact">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        Suggest a Location
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}