import { Button } from '@/components/ui/button';
import { Shirt, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function UltraFlexClothing() {
    // Carousel state
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Image data
    const images = [
        {
            src: "/Images/Clothing/Acid-grey-male-back-300x300.jpg",
            alt: "ULTRAFLEX Acid Grey Male Shirt",
            title: "Acid Grey Performance Shirt",
            price: "From $29.99"
        },
        {
            src: "/Images/Clothing/Beige-female-back-300x300.jpg",
            alt: "ULTRAFLEX Beige Female Shirt",
            title: "Beige Athletic Top",
            price: "From $24.99"
        },
        {
            src: "/Images/Clothing/Drop-Sleeve-Vest-2-1-300x300.jpg",
            alt: "ULTRAFLEX Drop Sleeve Vest",
            title: "Drop Sleeve Vest",
            price: "From $34.99"
        },
        {
            src: "/Images/Clothing/IMG-0784-300x300.jpg",
            alt: "ULTRAFLEX Athletic Wear",
            title: "Premium Athletic Wear",
            price: "From $39.99"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + 2 >= images.length ? 0 : prevIndex + 2
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.max(images.length - 2, 0) : prevIndex - 2
        );
    };

    return (
        <section className="py-20 bg-transparent text-white relative overflow-hidden">
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }, (_, i) => (
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
            <div className="absolute inset-0 bg-gradient-to-l from-red-900/5 via-transparent to-red-900/10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        {/* Simplified header */}
                        <div className="mb-6">
                            <h2 className="text-4xl font-bold">
                                <span className="ultraflex-ultra text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">ULTRA</span><span className="ultraflex-flex text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">FLEX</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Clothing</span>
                            </h2>
                        </div>

                        <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                            Elevate your workout style with our premium athletic wear. 
                            Designed for performance, built for comfort, made to inspire.
                        </p>

                        {/* Enhanced button with hover effects */}
                        <a 
                            href="https://www.ultraflexclothing.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button 
                                size="lg" 
                                className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                            >
                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                    Shop Collection
                                </span>
                            </Button>
                        </a>
                    </div>

                    {/* Carousel Section */}
                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="overflow-hidden rounded-lg">
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                            >
                                {images.map((image, index) => (
                                    <div key={index} className="w-1/2 flex-shrink-0 px-2">
                                        <div className="group relative overflow-hidden rounded-lg h-64">
                                            <img 
                                                src={image.src}
                                                alt={image.alt}
                                                className="rounded-lg w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h3 className="font-semibold">{image.title}</h3>
                                                <p className="text-sm text-gray-300">{image.price}</p>
                                            </div>
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                                    <Shirt className="h-4 w-4 text-red-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group border border-white/20 hover:border-red-700/50"
                        >
                            <ChevronLeft className="h-5 w-5 text-white group-hover:text-red-700 transition-colors" />
                        </button>
                        
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group border border-white/20 hover:border-red-700/50"
                        >
                            <ChevronRight className="h-5 w-5 text-white group-hover:text-red-700 transition-colors" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-4 space-x-2">
                            {Array.from({ length: Math.ceil(images.length / 2) }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index * 2)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        currentIndex === index * 2 
                                            ? 'bg-red-700 w-6' 
                                            : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}