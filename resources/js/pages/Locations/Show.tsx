import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, ChevronLeft, ChevronRight, Star, Check, Dumbbell, Waves, Car, ShowerHead, Coffee, Wifi, Users, Play, Eye } from 'lucide-react';

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
    certifications?: string[];
    bio?: string;
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
    slug?: string;
    address: string;
    phone: string;
    email: string;
    image: string;
    heroVideo?: string;
    logo: string;
    signupUrl?: string;
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
    mapUrl?: string;
    // Newly added optional structured enhancements
    features?: string[];
    services?: { name: string; description?: string; icon?: string; logo?: string; category?: string }[];
    serviceLinks?: { label: string; url: string; type?: 'internal' | 'external' }[];
}

interface LocationShowProps {
    location: Location;
    auth: {
        user: any;
    };
}

export default function LocationShow({ location, auth }: LocationShowProps) {
    const DEFAULT_MANAGER_IMAGE = '/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp';
    // List of slugs/names for locations that need gallery fallback for hero image
    const galleryHeroLocations = [
        'west-leeds', 'normanton', 'rotherham', 'york', 'lincoln',
        'West Leeds', 'Normanton', 'Rotherham', 'York', 'Lincoln'
    ];
    // Determine if this location should use gallery fallback
    const needsGalleryHero = galleryHeroLocations.includes(location.slug ?? '') || galleryHeroLocations.includes(location.name ?? '');
    // Use gallery[0] if image is missing or broken for these locations
    const heroImage = (needsGalleryHero && (!location.image || location.image.includes('broken') || location.image.includes('default') || location.image.includes('vecteezy'))) && location.gallery && location.gallery.length > 0
        ? location.gallery[0]
        : location.image;
    const [currentMembershipSlide, setCurrentMembershipSlide] = useState(0);
    const [currentEquipmentBgIndex, setCurrentEquipmentBgIndex] = useState(0);
    const [activeSection, setActiveSection] = useState<string>('manager');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const membershipPlansPerSlide = 3;
    const totalMembershipSlides = Math.ceil(location.membershipPlans.length / membershipPlansPerSlide);
    const signupUrl = (location.signupUrl && location.signupUrl.trim() !== '' ? location.signupUrl : '/membership');
    const isExternalSignup = /^https?:\/\//.test(signupUrl);
    
    const averageRating = location.reviews.reduce((acc, review) => acc + review.rating, 0) / location.reviews.length;

    // Normalise manager image (backend may send blank or lowercase variant)
    const managerImage = (location.manager?.image && location.manager.image.trim() !== '')
        ? location.manager.image
        : DEFAULT_MANAGER_IMAGE;

    // Derby & North Leeds: replace virtual tour YouTube with provided Google Drive preview
    const isDerby = (location.slug?.toLowerCase() === 'derby') || (location.name?.toLowerCase().includes('derby'));
    const isNorthLeeds = (location.slug?.toLowerCase() === 'north-leeds') || (location.name?.toLowerCase().includes('north leeds'));
    const derbyDrivePreview = 'https://drive.google.com/file/d/1jdqNRl2rdfuUTqgrtpEgJFrXcTqjqDcM/preview';
    const northLeedsDrivePreview = 'https://drive.google.com/file/d/1BYZxK7AkFeieHoZkurcqd98mpcJEMelW/preview';
    const derbyDriveId = '1jdqNRl2rdfuUTqgrtpEgJFrXcTqjqDcM';
    const rawTourSrc = isDerby ? derbyDrivePreview : (isNorthLeeds ? northLeedsDrivePreview : location.virtualTour);
    const isYouTubeTour = !!rawTourSrc && (rawTourSrc.includes('youtube.com') || rawTourSrc.includes('youtu.be'));
    // Normalize YouTube URLs to embed format and enable autoplay (muted), JS API, and clean branding
    const normalizeYouTubeEmbed = (src?: string) => {
        if (!src) return src;
        try {
            const input = new URL(src);
            let embedBase = src;
            if (input.hostname.includes('youtu.be')) {
                const id = input.pathname.replace(/^\//, '');
                embedBase = `https://www.youtube.com/embed/${id}`;
            } else if (input.hostname.includes('youtube.com')) {
                if (input.pathname === '/watch') {
                    const id = input.searchParams.get('v');
                    if (id) embedBase = `https://www.youtube.com/embed/${id}`;
                } else if (input.pathname.startsWith('/embed/')) {
                    embedBase = `https://www.youtube.com${input.pathname}`;
                }
            }
            const url = new URL(embedBase);
            url.searchParams.set('autoplay', '1');
            url.searchParams.set('mute', '1');
            url.searchParams.set('enablejsapi', '1');
            if (typeof window !== 'undefined' && window.location?.origin) {
                url.searchParams.set('origin', window.location.origin);
            }
            url.searchParams.set('rel', '0');
            url.searchParams.set('modestbranding', '1');
            url.searchParams.set('playsinline', '1');
            return url.toString();
        } catch {
            return src;
        }
    };
    const tourSrc = isYouTubeTour ? normalizeYouTubeEmbed(rawTourSrc) : rawTourSrc;
    const tourIframeRef = useRef<HTMLIFrameElement>(null);
    const [tourPlaying, setTourPlaying] = useState(false);
    // Derby Drive preview load tracking and fallback
    const [driveReady, setDriveReady] = useState(false);
    const [driveLoadTimedOut, setDriveLoadTimedOut] = useState(false);
    const [driveReloadKey, setDriveReloadKey] = useState(0);
    const playYouTubeTour = () => {
        try {
            const win = tourIframeRef.current?.contentWindow;
            if (win) {
                win.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*');
                setTourPlaying(true);
            }
        } catch {}
    };

    // If Derby or North Leeds Drive iframe is still not loaded after 7s, expose fallbacks
    useEffect(() => {
        if (!isDerby && !isNorthLeeds) return;
        setDriveReady(false);
        setDriveLoadTimedOut(false);
        const t = setTimeout(() => setDriveLoadTimedOut(true), 7000);
        return () => clearTimeout(t);
    }, [isDerby, isNorthLeeds, driveReloadKey]);

    

    // Auto-rotate equipment background images
    useEffect(() => {
        if (location.gallery.length > 1) {
            const interval = setInterval(() => {
                setCurrentEquipmentBgIndex((prev) => (prev + 1) % location.gallery.length);
            }, 4000); // Change every 4 seconds

            return () => clearInterval(interval);
        }
    }, [location.gallery.length]);

    // Observe sections to highlight active item in sticky nav
    useEffect(() => {
    const sectionIds = ['manager', 'membership', 'features', 'services', 'equipment', 'testimonials', 'tour', 'gallery', 'trainers'];
        const elements = sectionIds
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Get the most visible entry
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) {
                    setActiveSection(visible.target.id);
                }
            },
            {
                root: null,
                rootMargin: '0px 0px -50% 0px', // trigger a bit earlier
                threshold: [0.25, 0.5, 0.75],
            }
        );

        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Lightbox keyboard handlers
    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % location.gallery.length));
            if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + location.gallery.length) % location.gallery.length));
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [lightboxIndex, location.gallery.length]);

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

    // Helper function to categorize service links with titles
    const categorizeServiceLinks = (links: { label: string; url: string; type?: string }[]) => {
        const categories: { title: string; links: { label: string; url: string; type?: string }[] }[] = [];
        
        // First, try to match links to services with categories
        const categorizedLinks = new Set<string>();
        
        if (location.services) {
            location.services.forEach(service => {
                if (service.category) {
                    // Find links that match this service
                    const matchingLinks = links.filter(link => {
                        const linkLower = link.label.toLowerCase();
                        const serviceLower = service.name.toLowerCase();
                        // Match if link contains service name or service name words
                        const serviceWords = serviceLower.split(' ');
                        return serviceWords.some(word => word.length > 3 && linkLower.includes(word));
                    });
                    
                    if (matchingLinks.length > 0) {
                        // Add to category
                        const existingCategory = categories.find(cat => cat.title === service.category);
                        if (existingCategory) {
                            existingCategory.links.push(...matchingLinks);
                        } else {
                            categories.push({ title: service.category, links: [...matchingLinks] });
                        }
                        matchingLinks.forEach(link => categorizedLinks.add(link.label));
                    }
                }
            });
        }
        
        // Fallback: categorize remaining links by label patterns
        const uncategorizedLinks = links.filter(link => !categorizedLinks.has(link.label));
        
        const physioLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('physio') || link.label.toLowerCase().includes('regen'));
        const boxingLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('boxing') || link.label.toLowerCase().includes('ostas'));
        const judoLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('judo') || link.label.toLowerCase().includes('pudsey'));
        const hairLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('hair') || link.label.toLowerCase().includes('smitin'));
        const barberLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('barber') && !link.label.toLowerCase().includes('brotherhood'));
        const brotherhoodLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('brotherhood'));
        const massageLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('massage') || link.label.toLowerCase().includes('recovery hub'));
        const aestheticsLinks = uncategorizedLinks.filter(link => link.label.toLowerCase().includes('aesthetics') || link.label.toLowerCase().includes('nmk'));
        const otherLinks = uncategorizedLinks.filter(link => {
            const label = link.label.toLowerCase();
            return !label.includes('physio') && !label.includes('regen') &&
                   !label.includes('boxing') && !label.includes('ostas') &&
                   !label.includes('judo') && !label.includes('pudsey') &&
                   !label.includes('hair') && !label.includes('smitin') &&
                   !label.includes('barber') && !label.includes('brotherhood') &&
                   !label.includes('massage') && !label.includes('recovery hub') &&
                   !label.includes('aesthetics') && !label.includes('nmk');
        });
        
        // Add fallback categories only if they have links
        if (physioLinks.length > 0) categories.push({ title: 'Physiotherapy & Recovery', links: physioLinks });
        if (boxingLinks.length > 0) categories.push({ title: 'Boxing', links: boxingLinks });
        if (judoLinks.length > 0) categories.push({ title: 'Judo', links: judoLinks });
        if (hairLinks.length > 0) categories.push({ title: 'Hair Services', links: hairLinks });
        if (barberLinks.length > 0) categories.push({ title: 'Barber Services', links: barberLinks });
        if (brotherhoodLinks.length > 0) categories.push({ title: 'Barber Services', links: brotherhoodLinks });
        if (massageLinks.length > 0) categories.push({ title: 'Sports Massage', links: massageLinks });
        if (aestheticsLinks.length > 0) categories.push({ title: 'Aesthetics', links: aestheticsLinks });
        if (otherLinks.length > 0) categories.push({ title: 'Other Services', links: otherLinks });
        
        return categories;
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
            <Head title={`${location.name} - ULTRAFLEX`}>
                <meta name="description" content={`Visit ${location.name} for fitness facilities, expert trainers, and state-of-the-art equipment. Located at ${location.address}.`} />
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
                                src={heroImage} 
                                alt={location.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    // fallback to gallery image if not already using it
                                    if (needsGalleryHero && location.gallery && location.gallery.length > 0 && e.currentTarget.src !== location.gallery[0]) {
                                        e.currentTarget.src = location.gallery[0];
                                    } else {
                                        e.currentTarget.style.display = 'none';
                                    }
                                }}
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
                                    <h1 className="text-4xl font-bold text-white ">
                                        <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-700">FLEX</span> {location.name.replace(/ULTRAFLEX\s*/i, '')}
                                    </h1>
                                </div>
                                <p className="text-xl text-gray-200 flex items-center group hover:text-red-700 transition-colors duration-300">
                                    <MapPin className="h-5 w-5 mr-2 text-red-700" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {location.address}
                                    </span>
                                </p>
                                {/* Quick CTA */}
                                {signupUrl && (
                                    <div className="mt-6">
                                        <Button 
                                            className="bg-red-700 hover:bg-red-600 transition-all duration-300 group"
                                            onClick={() => window.open(signupUrl, isExternalSignup ? '_blank' : '_self')}
                                            aria-label="Join ULTRAFLEX"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Join Now</span>
                                            <ChevronRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* In-page navigation */}
                    <nav className="bg-transparent border-b border-transparent">
                        <div className="container mx-auto px-6">
                            <ul className="flex flex-wrap items-center gap-4 py-3 text-sm text-gray-300">
                                {[
                                    { id: 'manager', label: 'Manager & Hours', show: true },
                                    { id: 'membership', label: 'Membership', show: true },
                                    { id: 'features', label: 'Features', show: (location.features && location.features.length > 0) },
                                    { id: 'services', label: 'Services', show: (location.services && location.services.length > 0) || (location.serviceLinks && location.serviceLinks.length > 0) },
                                    { id: 'equipment', label: 'Equipment', show: true },
                                    { id: 'testimonials', label: 'Testimonials', show: location.reviews && location.reviews.length > 0 },
                                    { id: 'tour', label: 'Virtual Tour', show: !!tourSrc },
                                    { id: 'gallery', label: 'Gallery', show: location.gallery && location.gallery.length > 0 },
                                    { id: 'trainers', label: 'Trainers', show: location.trainers && location.trainers.length > 0 },
                                ].filter(i => i.show).map(item => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            className={`inline-flex items-center gap-2 px-2 py-1 rounded transition-colors border-b-2 ${
                                                activeSection === item.id
                                                    ? 'text-red-600 border-red-700'
                                                    : 'text-gray-300 border-transparent hover:text-red-600 hover:border-red-700/40'
                                            }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* 1. Manager Bio & Opening Times */}
                    <section id="manager" className="py-16 scroll-mt-24">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Meet The Manager */}
                                <div>
                                    <h2 className="text-3xl font-bold mb-8">
                                        <span className="text-white animate-pulse">Meet</span>{' '}
                                        <span className="text-white animate-pulse">The</span>{' '}
                                        <span className="text-red-700 animate-pulse">Manager</span>
                                    </h2>
                                    <div className="flex space-x-6">
                                        <div className="relative group">
                                                <img
                                                    src={managerImage}
                                                    alt={location.manager.name}
                                                    className="w-32 h-32 rounded-full object-cover border-4 border-red-700/30 backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.currentTarget as HTMLImageElement;
                                                        if (target.src !== window.location.origin + DEFAULT_MANAGER_IMAGE) {
                                                            target.src = DEFAULT_MANAGER_IMAGE;
                                                        }
                                                    }}
                                                />
                                        </div>
                                        <div className="flex-1">
                                            {location.manager.name && (
                                                <h3 className="text-xl font-semibold text-white mb-2">{location.manager.name}</h3>
                                            )}
                                            {location.manager.experience && (
                                                <p className="text-red-700 font-medium mb-4">{location.manager.experience}</p>
                                            )}
                                            {location.manager.bio && (
                                                <>
                                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-4 lg:line-clamp-none">{location.manager.bio}</p>
                                                    <button
                                                        onClick={() => setIsBioModalOpen(true)}
                                                        className="mt-3 text-red-700 hover:text-red-600 text-sm font-medium underline lg:hidden transition-colors duration-300"
                                                    >
                                                        See More
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Opening Times & Contact */}
                                <div>
                                    <h2 className="text-3xl font-bold mb-8">
                                        <span className="text-white animate-pulse">Opening</span>{' '}
                                        <span className="text-red-700 animate-pulse">Times</span>{' '}
                                        <span className="text-white animate-pulse">&</span>{' '}
                                        <span className="text-white animate-pulse">Contact</span>
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                                <Clock className="h-5 w-5 mr-2 text-red-700" />
                                                Opening Hours
                                                {location.features?.some(f => f.includes('Full Access Members')) && (
                                                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-700/20 text-red-400 border border-red-700/30">
                                                        {location.features.find(f => f.includes('Full Access Members'))}
                                                    </span>
                                                )}
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
                                            <a href={`tel:${location.phone?.replace(/\s+/g, '')}`} className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                <Phone className="h-5 w-5 text-red-700" />
                                                <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.phone}</span>
                                            </a>
                                            <a href={location.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                <MapPin className="h-5 w-5 text-red-700" />
                                                <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.address}</span>
                                            </a>
                                            {location.email && (
                                                <a href={`mailto:${location.email}`} className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <Mail className="h-5 w-5 text-red-700" />
                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{location.email}</span>
                                                </a>
                                            )}
                                        </div>

                                        <Button 
                                            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                            onClick={() => window.open(location.mapUrl || `https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
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

                    {/* 2. Membership Options */}
                    <section id="membership" className="py-16 scroll-mt-24">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-red-700 animate-pulse">Membership</span>{' '}
                                <span className="text-white animate-pulse">Options</span>
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
                                                        <Card key={plan.id} className={`relative p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-red-700/20`}>
                                                            
                                                            <div className="text-center mb-6">
                                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{plan.name}</h3>
                                                                <div className="text-4xl font-bold text-red-700 group-hover:scale-110 transition-transform duration-300">
                                                                    £{plan.price}
                                                                    <span className="text-lg text-gray-400">/{plan.period}</span>
                                                                </div>
                                                            </div>

                                                            <ul className="space-y-3 mb-8 min-h-[160px]">
                                                                {plan.features.map((feature, index) => (
                                                                    <li key={index} className="flex items-start text-gray-300 group hover:text-white transition-colors duration-300">
                                                                        <Check className="h-4 w-4 text-red-700 mr-2 mt-0.5" />
                                                                        <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            {/* Ensure membership links go to signup URL */}
                                                            <a 
                                                                href={signupUrl}
                                                                target={isExternalSignup ? '_blank' : undefined}
                                                                rel={isExternalSignup ? 'noopener noreferrer' : undefined}
                                                                aria-label="Sign up for membership"
                                                                className="block"
                                                            >
                                                                <Button 
                                                                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105"
                                                                >
                                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                        Sign Up Now
                                                                    </span>
                                                                    <ChevronRight className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                                                                </Button>
                                                            </a>
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

                    {/* 2b. Features */}
                    {location.features && location.features.length > 0 && (
                        <section id="features" className="py-16 scroll-mt-24">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    <span className="text-red-700 animate-pulse">Gym</span>{' '}
                                    <span className="text-white animate-pulse">Features</span>
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                    {location.features.map((feature, idx) => (
                                        <div key={idx} className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/40 rounded-xl p-6 flex items-start space-x-4 group transition-all duration-300">
                                            <div className="w-10 h-10 rounded-full bg-red-700/20 border border-red-700/30 flex items-center justify-center text-red-700 font-bold group-hover:scale-110 group-hover:bg-red-700/30 transition-transform duration-300">{idx + 1}</div>
                                            <p className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-medium">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 2c. Services & Partner Links */}
                    {( (location.services && location.services.length > 0) || (location.serviceLinks && location.serviceLinks.length > 0) ) && (
                        <section id="services" className="py-16 scroll-mt-24">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    <span className="text-white animate-pulse">Services</span>{' '}
                                    <span className="text-red-700 animate-pulse">& Partners</span>
                                </h2>
                                {location.services && location.services.length > 0 && (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                        {location.services.map((svc, i) => (
                                            <div key={i} className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/40 rounded-xl p-6 group transition-all duration-300 flex flex-col">
                                                <div className="flex items-center mb-4">
                                                    <div className="w-12 h-12 rounded-lg bg-red-700/20 border border-red-700/30 flex items-center justify-center mr-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                                        {svc.logo ? (
                                                            <img src={svc.logo} alt={svc.name} className="w-full h-full object-contain" />
                                                        ) : svc.icon ? (
                                                            <span className="text-red-700 text-lg font-semibold">{svc.icon}</span>
                                                        ) : (
                                                            <Users className="h-6 w-6 text-red-700" />
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-white group-hover:text-red-700 transition-colors duration-300">{svc.name}</h3>
                                                </div>
                                                {svc.description && <p className="text-gray-300 text-sm leading-relaxed flex-1">{svc.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {location.serviceLinks && location.serviceLinks.length > 0 && (
                                    <div className="max-w-5xl mx-auto">
                                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                            <ChevronRight className="h-5 w-5 text-red-700 mr-2" /> Useful Links
                                        </h3>
                                        <div className="space-y-8">
                                            {categorizeServiceLinks(location.serviceLinks).map((category, catIndex) => (
                                                <div key={catIndex} className="space-y-4">
                                                    <h4 className="text-lg font-semibold text-red-700 border-b border-red-700/30 pb-2">
                                                        {category.title}
                                                    </h4>
                                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {category.links.map((link, i) => {
                                                            const external = link.type === 'external' || /^https?:\/\//.test(link.url);
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={link.url}
                                                                    target={external ? '_blank' : undefined}
                                                                    rel={external ? 'noopener noreferrer' : undefined}
                                                                    className="group bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/40 rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-red-700/10"
                                                                >
                                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-sm font-medium">{link.label}</span>
                                                                    <ChevronRight className="h-4 w-4 text-red-700 group-hover:scale-110 transition-transform duration-300" />
                                                                </a>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* 3. Equipment & Facilities */}
                    <section id="equipment" className="py-16 scroll-mt-24">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-red-700 animate-pulse">Equipment</span>{' '}
                                <span className="text-white animate-pulse">&</span>{' '}
                                <span className="text-white animate-pulse">Facilities</span>
                            </h2>
                            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {location.equipment.filter((e: any) => e && typeof e === 'object').map((item: any, index: number) => (
                                    <Card key={index} className={`text-center p-6 bg-black/60 backdrop-blur-md border border-white/20 hover:border-red-700/50 transition-all duration-300 group hover:bg-black/70 ${!item.available ? 'opacity-50' : ''}`}>
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

                            {/* Background indicators removed to keep section transparent */}
                        </div>
                    </section>

                    {/* 4. Testimonials (Member Reviews) */}
                    <section id="testimonials" className="py-16 scroll-mt-24">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">
                                    <span className="text-white animate-pulse">Member</span>{' '}
                                    <span className="text-red-700 animate-pulse">Reviews</span>
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

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                {location.reviews.slice(0, 6).map((review) => (
                                    <Card key={review.id} className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="text-sm text-gray-400">{review.date}</span>
                                        </div>
                                        {(() => {
                                            const isExpanded = expandedReviewId === review.id;
                                            const isLong = review.comment.length > 220;
                                            return (
                                                <>
                                                    <div className="mb-2">
                                                        <p
                                                            className={`text-gray-300 italic group-hover:text-gray-200 transition-colors duration-300 ${
                                                                !isExpanded && isLong ? 'line-clamp-3' : ''
                                                            }`}
                                                        >
                                                            "{review.comment}"
                                                        </p>
                                                    </div>
                                                    {isLong ? (
                                                        <div className="mt-2 flex items-center justify-between">
                                                            <p className="font-semibold text-white">- {review.name}</p>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setExpandedReviewId((prev) =>
                                                                        prev === review.id ? null : review.id
                                                                    )
                                                                }
                                                                className="text-xs text-red-600 hover:text-red-500 underline underline-offset-2 ml-4"
                                                            >
                                                                {isExpanded ? 'See less' : 'See more'}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="mt-2 font-semibold text-white">- {review.name}</p>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 5. Virtual Tour */}
                    {tourSrc ? (
                        <section id="tour" className="py-16 scroll-mt-24">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4">
                                        <span className="text-white animate-pulse">Take</span>{' '}
                                        <span className="text-white animate-pulse">a</span>{' '}
                                        <span className="text-red-700 animate-pulse">Virtual</span>{' '}
                                        <span className="text-white animate-pulse">Tour</span>
                                    </h2>
                                    <p className="text-gray-300">
                                        Explore our facilities from the comfort of your home
                                    </p>
                                </div>
                                <div className="max-w-4xl mx-auto">
                                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-white/10 hover:border-red-700/30 transition-colors duration-300 group">
                                        {isDerby ? (
                                            <iframe
                                                key={driveReloadKey}
                                                src={`${derbyDrivePreview}?autoplay=1&mute=1`}
                                                className="w-full h-full"
                                                allow="autoplay"
                                                allowFullScreen
                                                title={`${location.name} Virtual Tour`}
                                                onLoad={() => setDriveReady(true)}
                                            />
                                        ) : isNorthLeeds ? (
                                            <iframe
                                                key={driveReloadKey}
                                                src={`${northLeedsDrivePreview}?autoplay=1&mute=1`}
                                                className="w-full h-full"
                                                allow="autoplay"
                                                allowFullScreen
                                                title={`${location.name} Virtual Tour`}
                                                onLoad={() => setDriveReady(true)}
                                            />
                                        ) : (
                                            <iframe 
                                                ref={tourIframeRef}
                                                src={tourSrc}
                                                className="w-full h-full"
                                                allow="autoplay; encrypted-media"
                                                allowFullScreen
                                                title={`${location.name} Virtual Tour`}
                                                loading="lazy"
                                            />
                                        )}
                                        {/* Helper: show an overlay if Drive preview seems stuck */}
                                        {(isDerby || isNorthLeeds) && driveLoadTimedOut && !driveReady && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/70 text-white rounded-lg border border-white/10 p-4 shadow-lg flex items-center gap-3">
                                                    <span>Buffering? Try opening the tour:</span>
                                                    <a
                                                        href={isDerby ? derbyDrivePreview : northLeedsDrivePreview}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 transition"
                                                    >
                                                        Open in New Tab
                                                    </a>
                                                    <button
                                                        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                                                        onClick={() => setDriveReloadKey((k) => k + 1)}
                                                    >
                                                        Retry
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
                    ) : (
                        <section id="tour" className="py-16 scroll-mt-24">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="text-white animate-pulse">Virtual</span>{' '}
                                    <span className="text-red-700 animate-pulse">Tour</span>{' '}
                                    <span className="text-white animate-pulse">Coming</span>{' '}
                                    <span className="text-white animate-pulse">Soon</span>
                                </h2>
                                <p className="text-gray-300 max-w-2xl mx-auto mb-8">We're currently preparing an immersive virtual tour experience for this location. Check back soon to explore the facility online.</p>
                                <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/10 animate-pulse relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.15),transparent_70%)]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 6. Gallery */}
                    <section id="gallery" className="py-16 scroll-mt-24">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-red-700 animate-pulse">Gallery</span>
                            </h2>
                            {location.slug && location.gallery && location.gallery.length > 0 && (
                                <div className="text-center -mt-8 mb-10">
                                    <Link
                                        href={`/gallery?loc=${encodeURIComponent(location.slug)}`}
                                        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-red-600 transition-colors"
                                    >
                                        View full gallery
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {location.gallery.map((image, index) => (
                                    <button
                                        key={index}
                                        className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10 hover:border-red-700/30 group relative"
                                        onClick={() => setLightboxIndex(index)}
                                        aria-label={`Open gallery image ${index + 1}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${location.name} facility ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                            onError={(e) => {
                                                const t = e.currentTarget as HTMLImageElement;
                                                t.classList.add('grayscale', 'opacity-40');
                                                t.alt = 'Image unavailable';
                                            }}
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
                                    </button>
                                ))}
                            </div>

                            {/* Lightbox Modal */}
                            {lightboxIndex !== null && (
                                <div
                                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="Image viewer"
                                    onClick={() => setLightboxIndex(null)}
                                >
                                    <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                                        <img
                                            src={location.gallery[lightboxIndex]}
                                            alt={`${location.name} gallery image ${lightboxIndex + 1}`}
                                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg border border-white/10"
                                            onError={(e) => {
                                                const t = e.currentTarget as HTMLImageElement;
                                                t.classList.add('opacity-30');
                                                t.alt = 'Image unavailable';
                                            }}
                                        />
                                        {/* Controls */}
                                        <button
                                            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2 hover:bg-red-700/80 transition"
                                            onClick={() => setLightboxIndex(null)}
                                            aria-label="Close"
                                        >
                                            ✕
                                        </button>
                                        <button
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-3 hover:bg-red-700/80 transition"
                                            onClick={() => setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + location.gallery.length) % location.gallery.length)}
                                            aria-label="Previous image"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-3 hover:bg-red-700/80 transition"
                                            onClick={() => setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % location.gallery.length)}
                                            aria-label="Next image"
                                        >
                                            ›
                                        </button>
                                        {/* Counter */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm border border-white/10">
                                            {lightboxIndex + 1} / {location.gallery.length}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 7. Personal Trainers */}
                    <section id="trainers" className="py-16 scroll-mt-24">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white animate-pulse">Our</span>{' '}
                                <span className="text-white animate-pulse">Personal</span>{' '}
                                <span className="text-red-700 animate-pulse">Trainers</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {location.trainers.map((trainer) => {
                                    const firstName = (trainer.name || '').split(/\s+/)[0];
                                    const shortBio = (trainer.bio || '').split(/\n+/)[0];
                                    const bioThreeSentences = shortBio
                                        .split(/([.!?])\s+/)
                                        .reduce((acc: string[], cur: string, idx: number, arr: string[]) => {
                                            if (idx % 2 === 0) {
                                                const punctuation = arr[idx + 1] || '';
                                                acc.push((cur + punctuation).trim());
                                            }
                                            return acc;
                                        }, [])
                                        .filter(Boolean)
                                        .slice(0, 3)
                                        .join(' ');
                                    return (
                                    <Link key={trainer.id} href={`/trainers/${trainer.slug}`} className="group focus:outline-none block">
                                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col h-[380px] transition-all duration-300 hover:border-red-700/40 hover:shadow-red-700/20 hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-red-700">
                                            <div className="flex items-center justify-center pt-4">
                                                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-red-700/40 shadow-lg">
                                                    <img
                                                        src={trainer.image}
                                                        alt={trainer.name}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover object-top"
                                                        onError={(e:any)=>{ e.currentTarget.src='/Images/vecteezy_hand-drawnman-avatar-profile-icon-for-social-networks_.webp'; }}
                                                    />
                                                    <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-red-700/50 rounded-full transition-all duration-300 pointer-events-none"></div>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col p-4 gap-2">
                                                <h3 className="text-base font-semibold text-white group-hover:text-red-600 transition-colors duration-300">{firstName}</h3>
                                                {trainer.specialties && trainer.specialties.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {trainer.specialties.slice(0,3).map((specialty, index) => (
                                                            <span key={index} className="px-2 py-0.5 bg-red-700/15 text-red-500 text-[10px] rounded-full border border-red-700/30">{specialty}</span>
                                                        ))}
                                                        {trainer.specialties.length > 3 && (
                                                            <span className="px-2 py-0.5 bg-white/10 text-white/70 text-[10px] rounded-full">+{trainer.specialties.length - 3}</span>
                                                        )}
                                                    </div>
                                                )}
                                                {trainer.certifications && trainer.certifications.length > 0 && (
                                                    <p className="text-[10px] text-gray-400 leading-snug">{trainer.certifications.join(', ')}</p>
                                                )}
                                                <p
                                                    className="text-xs text-gray-300 overflow-hidden mt-1 flex-1"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        lineHeight: '1rem', // approximate leading for text-xs
                                                        minHeight: '3rem',
                                                        maxHeight: '3rem'
                                                    }}
                                                >
                                                    {bioThreeSentences}
                                                </p>
                                                <div className="mt-2 flex items-center justify-end">
                                                    <span className="inline-flex items-center text-[11px] text-red-500 font-medium tracking-wide">
                                                        View Profile <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );})}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Manager Bio Modal */}
            <Dialog open={isBioModalOpen} onOpenChange={setIsBioModalOpen}>
                <DialogContent className="bg-black/95 border-red-700/30 text-white max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-red-700">{location.manager.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {location.manager.experience && (
                            <p className="text-red-600 font-medium">{location.manager.experience}</p>
                        )}
                        {location.manager.bio && (
                            <p className="text-gray-300 leading-relaxed">{location.manager.bio}</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}