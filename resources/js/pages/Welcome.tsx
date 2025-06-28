import { Head } from '@inertiajs/react';
import VideoLander from '@/sections/VideoLander';
import SignUpCTA from '@/sections/SignUpCTA';
import OurLocations from '@/sections/OurLocations';
import MemberTestimonials from '@/sections/MemberTestimonials';
import UltraFlexClothing from '@/sections/UltraFlexClothing';
import Gallery from '@/sections/Gallery';
import LatestNews from '@/sections/LatestNews';
import FooterCTA from '@/sections/FooterCTA';
import AnimatedBackground from '@/components/AnimatedBackground';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    user: User | null;
}

interface WelcomeProps {
    auth: AuthProps;
}

export default function Welcome({ auth }: WelcomeProps) {
    // Real UltraFlex locations data - showing top 3 locations
    const locations = [
        {
            id: 1,
            name: "ULTRAFLEX WEST LEEDS",
            address: "West Park Ring Road, Leeds LS16 6EB, UK",
            image: "/Images/westleeds/UFG (100) (2).jpg"
        },
        {
            id: 2,
            name: "ULTRAFLEX NORTH LEEDS",
            address: "Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK",
            image: "/Images/northleeds/DSC07392 (1).jpg"
        },
        {
            id: 3,
            name: "ULTRAFLEX NORMANTON",
            address: "High Street, Normanton WF6 2DB, UK",
            image: "/Images/normanton/IMG_(61) (1).jpg"
        }
    ];

    const testimonials = [
        { id: 1, name: "Sarah Johnson", quote: "UltraFlex changed my life! The trainers are amazing and the community is so supportive.", rating: 5, image: "/images/testimonials/sarah.jpg" },
        { id: 2, name: "Mike Chen", quote: "Best gym I've ever been to. Equipment is top-notch and always clean.", rating: 5, image: "/images/testimonials/mike.jpg" },
        { id: 3, name: "Emma Davis", quote: "The variety of classes and flexible hours make it perfect for my busy schedule.", rating: 5, image: "/images/testimonials/emma.jpg" }
    ];

    const galleryImages = [
        "/Images/westleeds/UFG (100) (2).jpg",
        "/Images/northleeds/DSC07392 (1).jpg",
        "/Images/normanton/IMG_(61) (1).jpg",
        "/Images/rotherham/IMG (19) (4).jpg",
        "/Images/york/ForGallery/DSC07349.jpg",
        "/Images/hull/IMG (19) (5).jpg",
    ];

    const latestNews = [
        { id: 1, title: "New HIIT Classes Starting This Month", excerpt: "Join our high-intensity interval training classes...", date: "June 20, 2025", image: "/images/news/hiit.jpg" },
        { id: 2, title: "UltraFlex Expansion: Coming to Southside", excerpt: "We're excited to announce our newest location...", date: "June 18, 2025", image: "/images/news/expansion.jpg" },
        { id: 3, title: "Summer Fitness Challenge 2025", excerpt: "Get ready for our biggest fitness challenge yet...", date: "June 15, 2025", image: "/images/news/challenge.jpg" }
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="UltraFlex - Premium Fitness Experience">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white relative">
                {/* Global Animated Background */}
                <AnimatedBackground 
                    variant="default" 
                    intensity="medium"
                    className="z-0"
                />
                
                {/* All content with higher z-index */}
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative">
                        <VideoLander />
                    </section>

                    {/* Authentication Status Banner */}
                    <section className="relative">
                        {auth.user ? (
                            <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border-y border-red-600/30 py-4">
                                <div className="container mx-auto px-6">
                                    <div className="text-center">
                                        <p className="text-white font-semibold text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                                            Welcome back, <span className="text-red-600 animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]">{auth.user.name}!</span> You are successfully logged in.
                                        </p>
                                        <p className="text-white text-sm mt-1">
                                            Access your Members Hub for exclusive workouts and nutrition plans.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border-y border-red-600/30 py-4">
                                <div className="container mx-auto px-6">
                                    <div className="text-center">
                                        <p className="text-white font-semibold text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                                            Join the <span className="text-red-600 animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]">UltraFlex</span> Community Today!
                                        </p>
                                        <p className="text-white text-sm mt-1">
                                            Login or register to access exclusive member benefits and track your fitness journey.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Sign Up CTA Section */}
                    <section className="relative">
                        <SignUpCTA />
                    </section>

                    {/* Locations Section */}
                    <section className="relative">
                        <OurLocations locations={locations} />
                    </section>

                    {/* Testimonials Section */}
                    <section className="relative">
                        <MemberTestimonials testimonials={testimonials} />
                    </section>

                    {/* Clothing Section */}
                    <section className="relative">
                        <UltraFlexClothing />
                    </section>

                    {/* Gallery Section */}
                    <section className="relative">
                        <Gallery galleryImages={galleryImages} />
                    </section>

                    {/* News Section */}
                    <section className="relative">
                        <LatestNews latestNews={latestNews} />
                    </section>

                    {/* Footer CTA Section */}
                    <section className="relative">
                        <FooterCTA />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}