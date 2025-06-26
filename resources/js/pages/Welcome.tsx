import { Head } from '@inertiajs/react';
import VideoLander from '@/sections/VideoLander';
import SignUpCTA from '@/sections/SignUpCTA';
import OurLocations from '@/sections/OurLocations';
import MemberTestimonials from '@/sections/MemberTestimonials';
import UltraFlexClothing from '@/sections/UltraFlexClothing';
import Gallery from '@/sections/Gallery';
import LatestNews from '@/sections/LatestNews';
import FooterCTA from '@/sections/FooterCTA';
import Navbar from '@/components/ui/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedFooter from '@/components/ui/Footer';

export default function Welcome() {
    // Sample data - replace with actual data from your backend
    const locations = [
        { id: 1, name: "Downtown UltraFlex", address: "123 Main St, City Center", image: "/images/locations/downtown.jpg" },
        { id: 2, name: "Westside UltraFlex", address: "456 West Ave, Westside", image: "/images/locations/westside.jpg" },
        { id: 3, name: "North UltraFlex", address: "789 North Blvd, Uptown", image: "/images/locations/north.jpg" }
    ];

    const testimonials = [
        { id: 1, name: "Sarah Johnson", quote: "UltraFlex changed my life! The trainers are amazing and the community is so supportive.", rating: 5, image: "/images/testimonials/sarah.jpg" },
        { id: 2, name: "Mike Chen", quote: "Best gym I've ever been to. Equipment is top-notch and always clean.", rating: 5, image: "/images/testimonials/mike.jpg" },
        { id: 3, name: "Emma Davis", quote: "The variety of classes and flexible hours make it perfect for my busy schedule.", rating: 5, image: "/images/testimonials/emma.jpg" }
    ];

    const galleryImages = [
        "/images/gallery/gym-floor.jpg",
        "/images/gallery/weights.jpg",
        "/images/gallery/cardio.jpg",
        "/images/gallery/yoga-class.jpg",
        "/images/gallery/pool.jpg",
        "/images/gallery/locker-room.jpg"
    ];

    const latestNews = [
        { id: 1, title: "New HIIT Classes Starting This Month", excerpt: "Join our high-intensity interval training classes...", date: "June 20, 2025", image: "/images/news/hiit.jpg" },
        { id: 2, title: "UltraFlex Expansion: Coming to Southside", excerpt: "We're excited to announce our newest location...", date: "June 18, 2025", image: "/images/news/expansion.jpg" },
        { id: 3, title: "Summer Fitness Challenge 2025", excerpt: "Get ready for our biggest fitness challenge yet...", date: "June 15, 2025", image: "/images/news/challenge.jpg" }
    ];

    return (
        <>
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
                    <Navbar auth={{ user: null }} />
                    
                    {/* Hero Section */}
                    <section className="relative">
                        <VideoLander />
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

                    {/* Animated Footer */}
                    <AnimatedFooter />
                </div>
            </div>
        </>
    );
}