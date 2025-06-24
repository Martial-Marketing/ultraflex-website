import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';

interface Location {
    id: number;
    name: string;
    address: string;
    image: string;
}

interface OurLocationsProps {
    locations: Location[];
}

export default function OurLocations({ locations }: OurLocationsProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find the UltraFlex gym nearest to you. Each location features state-of-the-art equipment and premium amenities.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {locations.map((location) => (
                        <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img 
                                    src={location.image} 
                                    alt={location.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                                <p className="text-gray-600 flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {location.address}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="text-center">
                    <Button variant="outline" size="lg" className="px-8 py-3">
                        View All Locations
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}