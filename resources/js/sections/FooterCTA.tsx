import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronRight, Zap, Star, ArrowRight } from 'lucide-react';

export default function FooterCTA() {
    return (
        <section className="bg-transparent text-white py-16 relative overflow-hidden">
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

            {/* Enhanced red accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-red-700/5 to-red-900/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />

            <div className="container mx-auto px-6 text-center relative z-10">
                {/* Simplified header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Start</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Your</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Journey?</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                        Join the <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> community today and unlock your potential
                    </p>
                </div>

                {/* Enhanced CTA with single primary button */}
                <div className="space-y-6">
                    {/* Primary CTA button */}
                    <div className="flex justify-center">
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                            asChild
                        >
                            <a href="https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                    Get Started Today
                                </span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Bottom accent elements */}
                <div className="mt-16 flex items-center justify-center space-x-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                    <div className="w-2 h-2 bg-red-700 rounded-full animate-pulse"></div>
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}