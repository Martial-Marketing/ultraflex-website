import { Button } from '@/components/ui/button';
import { Shirt, Star } from 'lucide-react';

export default function UltraFlexClothing() {
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
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">UltraFlex</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Clothing</span>
                            </h2>
                        </div>

                        <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                            Elevate your workout style with our premium athletic wear. 
                            Designed for performance, built for comfort, made to inspire.
                        </p>

                        {/* Features list with hover effects */}
                        <div className="mb-8 space-y-3">
                            <div className="flex items-center text-gray-300 hover:text-red-700 transition-colors duration-300 group">
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Premium moisture-wicking fabric</span>
                            </div>
                            <div className="flex items-center text-gray-300 hover:text-red-700 transition-colors duration-300 group">
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Ergonomic athletic fit</span>
                            </div>
                            <div className="flex items-center text-gray-300 hover:text-red-700 transition-colors duration-300 group">
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Sustainable materials</span>
                            </div>
                        </div>

                        {/* Enhanced button with hover effects */}
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                Shop Collection
                            </span>
                        </Button>
                    </div>

                    {/* Enhanced image grid with hover effects */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="group relative overflow-hidden rounded-lg">
                            <img 
                                src="/images/clothing/shirt.jpg" 
                                alt="UltraFlex Shirt" 
                                className="rounded-lg w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="font-semibold">Performance Shirts</h3>
                                <p className="text-sm text-gray-300">From $29.99</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <Shirt className="h-4 w-4 text-red-700" />
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg">
                            <img 
                                src="/images/clothing/shorts.jpg" 
                                alt="UltraFlex Shorts" 
                                className="rounded-lg w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="font-semibold">Training Shorts</h3>
                                <p className="text-sm text-gray-300">From $24.99</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <Shirt className="h-4 w-4 text-red-700" />
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg">
                            <img 
                                src="/images/clothing/hoodie.jpg" 
                                alt="UltraFlex Hoodie" 
                                className="rounded-lg w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="font-semibold">Premium Hoodies</h3>
                                <p className="text-sm text-gray-300">From $49.99</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <Shirt className="h-4 w-4 text-red-700" />
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg">
                            <img 
                                src="/images/clothing/leggings.jpg" 
                                alt="UltraFlex Leggings" 
                                className="rounded-lg w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="font-semibold">Athletic Leggings</h3>
                                <p className="text-sm text-gray-300">From $34.99</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <Shirt className="h-4 w-4 text-red-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}