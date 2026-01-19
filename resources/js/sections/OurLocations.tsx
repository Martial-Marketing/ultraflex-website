import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { MapPin, Phone, Clock, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

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
    mapUrl?: string;
    virtualTour?: string | null;
    features?: string[];
}

interface OurLocationsProps {
    locations: Location[];
}

export default function OurLocations({ locations }: OurLocationsProps) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollByAmount = useMemo(() => {
        // Scroll by ~one card width depending on viewport.
        // Using a fixed pixel amount keeps it stable and avoids layout measurement.
        return 420;
    }, []);

    const scrollLeft = () => {
        scrollerRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollerRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    };

    const scrollToIndex = (index: number) => {
        const el = itemRefs.current[index];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };

    useEffect(() => {
        const root = scrollerRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

                if (!visible) return;
                const target = visible.target as HTMLElement;
                const idx = Number(target.dataset.index);
                if (!Number.isNaN(idx)) setActiveIndex(idx);
            },
            {
                root,
                threshold: [0.4, 0.55, 0.7, 0.85],
            }
        );

        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [locations.length]);

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

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Simplified header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                        <span className="text-white animate-pulse">Our</span>{' '}
                        <span className="text-red-700 animate-pulse">Locations</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                        Find the <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> gym nearest to you. Each location features state-of-the-art equipment and premium amenities.
                    </p>
                </div>

                {/* Single-row carousel */}
                <div
                    ref={scrollerRef}
                    className="flex gap-8 overflow-x-auto pb-4 mb-12 scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as any}
                >
                    {locations.map((location, i) => (
                        <div
                            key={location.id}
                            ref={(el) => {
                                itemRefs.current[i] = el;
                            }}
                            data-index={i}
                            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[48%] lg:w-[32%]"
                        >
                            <Card
                                className="w-full overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/20 border border-white/10 hover:border-red-700/30 group"
                                aria-label={`Gym location card for ${location.name}`}
                            >
                            <div className="h-64 bg-gray-800 relative overflow-hidden">
                                <img
                                    src={location.image}
                                    alt={`${location.name} facility hero image`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {location.virtualTour && (
                                    <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-semibold px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                                        <span className="inline-block w-2 h-2 bg-red-700 rounded-full animate-pulse" />
                                        Virtual Tour
                                    </div>
                                )}

                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold group-hover:text-red-700 transition-colors duration-300">
                                        <span className="ultraflex-ultra text-white">ULTRA</span>
                                        <span className="ultraflex-flex text-red-700">FLEX</span>{' '}
                                        {location.name.replace(/ULTRAFLEX\s*/i, '')}
                                    </h3>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm flex items-center">
                                        <Building className="h-4 w-4 mr-2" />
                                        View Details
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 bg-transparent">
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start space-x-2 group hover:text-red-700 transition-colors duration-300">
                                        <MapPin className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                            {location.address}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2 group hover:text-red-700 transition-colors duration-300">
                                        <Phone className="h-4 w-4 text-red-700 flex-shrink-0" />
                                        <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                            {location.phone}
                                        </span>
                                    </div>

                                    <div className="flex items-start space-x-2 group hover:text-red-700 transition-colors duration-300">
                                        <Clock className="h-4 w-4 text-red-700 mt-0.5 flex-shrink-0" />
                                        <div className="text-gray-300 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                            <div>Mon-Fri: {location.hours.weekdays}</div>
                                            <div>
                                                {location.hours.weekends.includes('Sat:') || location.hours.weekends.includes('Sun:')
                                                    ? location.hours.weekends
                                                    : `Sat-Sun: ${location.hours.weekends}`}
                                            </div>
                                            {location.features?.some((f) => f.includes('Full Access Members')) && (
                                                <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-700/20 text-red-400 border border-red-700/30">
                                                    {location.features.find((f) => f.includes('Full Access Members'))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {location.slug === 'athens-greece' ? (
                                        <a href="https://ultraflexgym.gr/" target="_blank" rel="noopener noreferrer" className="block w-full">
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">Visit Athens Site</span>
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link href={`/locations/${location.slug}`} className="block w-full">
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">View Gym Details</span>
                                            </Button>
                                        </Link>
                                    )}

                                    <Button
                                        variant="outline"
                                        className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                        onClick={() =>
                                            window.open(
                                                location.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(location.address)}`,
                                                '_blank'
                                            )
                                        }
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Get Directions</span>
                                    </Button>
                                </div>
                            </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Carousel navigation (match HomepageCarousel UI) */}
                {locations.length > 1 && (
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <button
                            type="button"
                            onClick={scrollLeft}
                            className="w-10 h-10 flex items-center justify-center bg-black/80 text-white rounded-full hover:bg-red-700/80 transition"
                            aria-label="Previous location"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex gap-2" aria-label="Location carousel position">
                            {locations.map((loc, i) => (
                                <button
                                    key={loc.id}
                                    type="button"
                                    onClick={() => scrollToIndex(i)}
                                    className={`w-3 h-3 rounded-full ${i === activeIndex ? 'bg-red-700' : 'bg-white/60'} border border-white`}
                                    aria-label={`Go to ${loc.name}`}
                                    aria-current={i === activeIndex ? 'true' : undefined}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={scrollRight}
                            className="w-10 h-10 flex items-center justify-center bg-black/80 text-white rounded-full hover:bg-red-700/80 transition"
                            aria-label="Next location"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {/* Enhanced call-to-action button */}
                <div className="text-center">
                    <Link href="/locations">
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
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