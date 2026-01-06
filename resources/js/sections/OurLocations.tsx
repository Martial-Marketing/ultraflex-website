import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Location {
    id: number;
    name: string;
    address: string;
    image: string;
    slug?: string; // added for navigation
}

interface OurLocationsProps {
    locations: Location[];
}

export default function OurLocations({ locations }: OurLocationsProps) {
    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Animated particles overlay */}
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

            {/* Red accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-transparent to-red-900/10" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Simplified header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Our</span>{' '}
                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Locations</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Find the UltraFlex gym nearest to you. Each location features state-of-the-art equipment and premium amenities.
                    </p>
                </div>
                
                {/* Enhanced location cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {locations.map((location) => (
                        <Card key={location.id} className="overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-700/10 group">
                            <div className="h-48 bg-gray-800 relative overflow-hidden">
                                <img 
                                    src={location.image} 
                                    alt={location.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Hover overlay with visit button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-center">
                                        <Link href={`/locations/${location.slug}`}> 
                                            <Button 
                                                size="sm" 
                                                className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">Visit Location</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Location indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                        <MapPin className="h-4 w-4 text-red-700" />
                                    </div>
                                </div>
                            </div>
                            
                            <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-red-700 transition-colors duration-300">
                                    {location.name}
                                </h3>
                                <div className="flex items-center text-gray-300 hover:text-red-700 transition-colors duration-300 group">
                                    <MapPin className="h-4 w-4 mr-2 text-red-700" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {location.address}
                                    </span>
                                </div>

                                {/* Additional location features */}
                                <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-red-700 rounded-full mr-2"></div>
                                        Premium Equipment
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-red-700 rounded-full mr-2"></div>
                                        Extended Opening Hours
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-red-700 rounded-full mr-2"></div>
                                        Personal Training
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                {/* Enhanced call-to-action button */}
                <div className="text-center">
                    <Link href="/locations">
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                View All Locations
                            </span>
                        </Button>
                    </Link>
                </div>

                {/* Bottom accent line */}
                <div className="mt-16 flex items-center justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}