import { Button } from '@/components/ui/button';
import { Play, ChevronRight } from 'lucide-react';

export default function VideoLander() {
    return (
        <section className="relative h-screen overflow-hidden">
            <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/video-poster.jpg"
            >
                <source src="/videos/ultraflex-hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Additional red accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-900/10 to-transparent" />
            
            <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
                <div className="max-w-4xl px-6">
                    {/* Simplified logo/brand section */}
                    <div className="mb-6">
                        <h1 className="text-6xl font-bold tracking-tight">
                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">ULTRA</span><span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">FLEX</span>
                        </h1>
                    </div>

                    <p className="mb-8 text-xl font-medium text-gray-200 leading-relaxed">
                        Experience fitness like never before. Premium equipment, expert trainers, limitless potential.
                    </p>

                    {/* Enhanced button with hover effects */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm"
                        >
                            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                Watch Our Story
                            </span>
                        </Button>

                        {/* Secondary CTA button */}
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="border-white/30 text-white hover:text-red-700 hover:border-red-700/50 hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 group"
                        >
                            <ChevronRight className="mr-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                Join Today
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        </section>
    );
}