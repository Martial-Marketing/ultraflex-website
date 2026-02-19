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
    locations: {
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
    }[];
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

export default function Welcome({ auth, latestNews, locations }: WelcomeProps) {

    // Member testimonials built from real ULTRAFLEX Google-style reviews (latest additions)
    const testimonials = [
        {
            id: 1,
            name: 'Lewis Williams – North Leeds',
            quote: "Just joined this week after over a year out of the gym, and honestly best decision I've made in a long time. Staff are great and the equipment is next level. Not only do they have everything you'll ever need they've got 3 or 4 of it, so you're not stood around waiting for machines.",
            rating: 5,
            image: '/Images/newimages/North Leeds/gym-in-northleeds-1.webp'
        },
        {
            id: 2,
            name: 'Alex Bard – Normanton',
            quote: "If you're looking for a gym that has it all, ULTRAFLEX Gym in Normanton is the place to be! The atmosphere is amazing, with a strong community vibe that makes working out enjoyable.",
            rating: 5,
            image: '/Images/newimages/Normanton/gym-in-normanton.webp'
        },
        {
            id: 3,
            name: 'Taylor Shields – York',
            quote: 'The best gym in York by far – since signing up I’ve met my goals and imma keep pushing. All staff friendly and chatty and help you out whenever you need a hand with anything.',
            rating: 5,
            image: '/Images/newimages/York/gym-in-york.webp'
        },
        {
            id: 4,
            name: 'Tyler Tee – Rotherham',
            quote: 'I often visit and usually grab a weekly pass which is fantastic value for money. This place never disappoints, always a great atmosphere – every other gym will disappoint you after a visit!',
            rating: 5,
            image: '/Images/newimages/Rotherham/gym-in-rotherham.webp'
        },
        {
            id: 5,
            name: 'Kai Edwards – Durham',
            quote: 'Amazing gym, best I’ve ever trained at. If you want to grow, this is the place to be.',
            rating: 5,
            image: '/Images/original-787FADAA-6849-48F3-B005-6AD9FB2E74C4-min-min.webp'
        },
        {
            id: 6,
            name: 'Callan Doherty – Derby',
            quote: 'Been going to the gym for years and Derby ULTRAFLEX is hands down the best gym I\'ve ever been to.',
            rating: 5,
            image: '/Images/newimages/Derby/gym-in-derby.webp'
        }
    ];

    // Use only verified, working images from the main gallery
    const galleryImages = [
        "/Images/Gallery/derby/DSC05684.webp",
        "/Images/Gallery/derby/DSC05689.webp",
        "/Images/Gallery/derby/DSC05697.webp",
        "/Images/Gallery/derby/DSC05724.webp",
        "/Images/Gallery/derby/DSC05762.webp",
        "/Images/Gallery/hull/IMG (15).webp",
        "/Images/Gallery/lincoln/ultraflex full-4711.webp",
        "/Images/Gallery/north leeds/DSC07344.webp",
        "/Images/Gallery/rotherham/akv_podcast_-2.webp",
        "/Images/Gallery/west leeds/UFG (100).webp",
        "/Images/Gallery/West London/Photo 03-09-2025, 14 02 45.webp",
        "/Images/Gallery/york/IMG (124).webp",
    ];

    // latestNews now comes from backend (HomeController)

    return (
        <AppLayout auth={auth}>
            <Head title="ULTRAFLEX - Fitness Experience">
                <meta name="description" content="Transform your fitness journey at ULTRAFLEX. Premium equipment, expert trainers, and a supportive community in Bacolod City. Join today!" />
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
                            <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border-y border-red-600/30 py-3 sm:py-4">
                                <div className="container mx-auto px-4 sm:px-6">
                                    <div className="text-center">
                                        <p className="text-white font-semibold text-base sm:text-lg ">
                                            Welcome back, <span className="text-red-600 animate-pulse ">{auth.user.name}!</span> You are successfully logged in.
                                        </p>
                                        <p className="text-white text-xs sm:text-sm mt-1">
                                            Access your Members Hub for exclusive workouts, nutrition plans, and trainer bookings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border-y border-red-600/30 py-3 sm:py-4">
                                <div className="container mx-auto px-4 sm:px-6">
                                    <div className="text-center">
                                        <p className="text-white font-semibold text-base sm:text-lg ">
                                            Join the <span className="text-red-600 animate-pulse "><span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span></span> Community Today!
                                        </p>
                                        <p className="text-white text-xs sm:text-sm mt-1">
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
                    {/* <section className="relative">
                        <LatestNews latestNews={latestNews} />
                    </section> */}

                    {/* Footer CTA Section */}
                    <section className="relative">
                        <FooterCTA />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}