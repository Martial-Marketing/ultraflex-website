import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Users } from 'lucide-react';

export default function SignUpCTA() {
    return (
        <section className="bg-transparent py-20 md:py-20 pt-24 md:pt-20 relative overflow-hidden">
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }, (_, i) => (
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5" />

            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                {/* Enhanced header */}
                <div className="mb-8">
                    <h2 className="mb-6 text-4xl font-bold leading-tight">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ready</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">to</span>{' '}
                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Transform</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Your</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Fitness</span>{' '}
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Journey?</span>
                    </h2>
                    <p className="mb-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of members who have already discovered the UltraFlex difference. 
                        Your transformation starts today.
                    </p>
                </div>

                {/* Enhanced buttons with hover effects */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-4 md:mt-0">
                    <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                        asChild
                    >
                        <a href="https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                Sign Up Now
                            </span>
                        </a>
                    </Button>
                </div>

                {/* Bottom accent line */}
                <div className="mt-12 flex items-center justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}