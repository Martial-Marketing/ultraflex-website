import { Head } from '@inertiajs/react';
import VideoLander from '@/sections/VideoLander';
import SignUpCTA from '@/sections/SignUpCTA';
import HomepageCarousel from '@/sections/HomepageCarousel';
import OurLocations from '@/sections/OurLocations';
import MemberTestimonials from '@/sections/MemberTestimonials';
import UltraFlexClothing from '@/sections/UltraFlexClothing';
import Gallery from '@/sections/Gallery';
import LatestNews from '@/sections/LatestNews';
import FooterCTA from '@/sections/FooterCTA';
import AnimatedBackground from '@/components/AnimatedBackground';
import AppLayout from '@/layouts/app-layout';


import type { User as GlobalUser } from '@/types';
interface AuthProps {
    user: GlobalUser | null;
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

    // Real member testimonials with Unsplash profile images
    const testimonials = [
        { 
            id: 1, 
            name: "", 
            quote: "Sarah completely transformed my approach to fitness. I've lost 30 pounds and gained so much confidence! The trainers here are incredible and really care about your progress.", 
            rating: 5, 
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            membership: "2 years",
            location: "Downtown UltraFlex"
        },
        { 
            id: 2, 
            name: "David Rodriguez", 
            quote: "Mike helped me gain 15 pounds of muscle in 6 months. His nutrition knowledge is incredible! Best bodybuilding coach I've worked with.", 
            rating: 5, 
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            membership: "1.5 years",
            location: "Westside UltraFlex"
        },
        { 
            id: 3, 
            name: "Sarah Martinez", 
            quote: "Emma's yoga classes are transformative. I've never felt more balanced and centered. The mind-body connection I've developed here is life-changing.", 
            rating: 5, 
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            membership: "3 years",
            location: "North UltraFlex"
        },
    ];

    const galleryImages = [
        "/Images/westleeds/UFG (100) (2).jpg",
        "/Images/northleeds/DSC07392 (1).jpg",
        "/Images/normanton/IMG_(61) (1).jpg",
        "/Images/rotherham/IMG (19) (4).jpg",
        "/Images/york/ForGallery/DSC07349.jpg",
        "/Images/hull/IMG (19) (5).jpg",
    ];

    // Latest news with matching controller data
    const latestNews = [
        { 
            id: 1, 
            title: "New HIIT Classes Starting This Month", 
            excerpt: "Join our high-intensity interval training classes designed to maximize your workout efficiency and burn calories fast. Perfect for all fitness levels!", 
            date: "June 20, 2025", 
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
            category: "Classes",
            readTime: "3 min read",
            slug: "new-hiit-classes-starting-this-month"
        },
        { 
            id: 2, 
            title: "UltraFlex Expansion: Coming to Southside", 
            excerpt: "We're excited to announce our newest location opening in the Southside district this fall. 25,000 sq ft of premium fitness facilities!", 
            date: "June 18, 2025", 
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
            category: "News",
            readTime: "5 min read",
            slug: "ultraflex-expansion-coming-to-southside"
        },
        { 
            id: 3, 
            title: "Summer Fitness Challenge 2025", 
            excerpt: "Get ready for our biggest fitness challenge yet! Join hundreds of members in achieving their summer fitness goals with amazing prizes.", 
            date: "June 15, 2025", 
            image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop",
            category: "Events",
            readTime: "4 min read",
            slug: "summer-fitness-challenge-2025"
        },
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="UltraFlex - Premium Fitness Experience">
                <meta name="description" content="Transform your fitness journey at UltraFlex. Premium equipment, expert trainers, and a supportive community in Bacolod City. Join today!" />
                <meta name="keywords" content="gym, fitness, personal training, Bacolod City, HIIT, strength training, yoga, nutrition" />
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
                                            Access your Members Hub for exclusive workouts, nutrition plans, and trainer bookings.
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
                                            Login or register to access exclusive member benefits, book trainers, and track your fitness journey.
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

                    {/* Homepage Carousel Section */}
                    <section className="relative">
                        <HomepageCarousel />
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