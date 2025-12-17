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
    latestNews: {
        id: number;
        title: string;
        excerpt: string;
        date: string;
        image: string;
        readTime: string;
        slug: string;
        category: string;
    }[];
}

export default function Welcome({ auth, latestNews }: WelcomeProps) {
    // Real UltraFlex locations data - showing top 3 locations
    const locations = [
        {
            id: 1,
            name: "ULTRAFLEX WEST LEEDS",
            address: "West Park Ring Road, Leeds LS16 6EB, UK",
            image: "/Images/westleeds/gym-in-westleeds.webp",
            slug: 'west-leeds'
        },
        {
            id: 2,
            name: "ULTRAFLEX NORTH LEEDS",
            address: "Limewood Centre, Limewood Avenue, Ring Road, Seacroft, Leeds LS14 1NH, UK",
            image: "/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg",
            slug: 'north-leeds'
        },
        {
            id: 3,
            name: "ULTRAFLEX NORMANTON",
            address: "High Street, Normanton WF6 2DB, UK",
            image: "/Images/normanton/gym-in-normanton.webp",
            slug: 'normanton'
        }
    ];

    // Member testimonials (from Google-style reviews provided)
    const testimonials = [
        {
            id: 1,
            name: 'Gabrielle Furtado',
            quote: "Best gym in the country!! I’ve been to gyms in NY, Miami, LA and nothing compares. Ultraflex is the best gym I have ever been to. This gym is the reason I can’t leave MA. They have a sauna, posing room, separate room dedicated to legs, every chest, shoulder, and back machine you can think of & it’s two levels. The dumbbells go up extremely high as well. If you’re in the area I 11/10 recommend you check it out & grab some merch while you’re there!",
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
            id: 2,
            name: 'Jessica',
            quote: "Very nice gym. Has a sauna, lockers, showers, alot of equipment to use, great staff (my fav is Nick he is super kind/patient when I asked 101 questions like a true gentleman) and gym is CLEAN! I have been to several gyms and this 1 is my favorite 😍",
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        {
            id: 3,
            name: 'azzurra de paola',
            quote: "Best gym I have ever trained at . They have the best equipments , best trainers and the vibe is beautiful! Everyone is helpful and professional. Ultraflex is not just a gym . It’s a family 🇮🇹 I loveeee it",
            rating: 5,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
    ];

    const galleryImages = [
        "/Images/westleeds/gym-in-westleeds.webp",
    "/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg",
        "/Images/normanton/gym-in-normanton.webp",
        "/Images/rotherham/gym-in-rotherham.webp",
        "/Images/york/ForGallery/gym-in-york-6.webp",
        // Updated Hull image
        "/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.jpeg",
    ];

    // latestNews now comes from backend (HomeController)

    return (
        <AppLayout auth={auth}>
            <Head title="UltraFlex - Fitness Experience">
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
                    <section className="relative mt-8 sm:mt-10 lg:mt-0">
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