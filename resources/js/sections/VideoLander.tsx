import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function VideoLander() {
    return (
        <section className="relative h-[93vh] overflow-hidden">
            <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/CyWN8ipcwgo?autoplay=1&mute=1&loop=1&playlist=CyWN8ipcwgo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
                title="ULTRAFLEX Hero Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ 
                    pointerEvents: 'none',
                    width: '100vw',
                    height: '56.25vw', // 16:9 aspect ratio
                    minHeight: '93vh',
                    minWidth: '177.78vh', // 16:9 aspect ratio
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
            
            {/* Enhanced overlay with stronger gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            
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
                <div className="max-w-4xl px-4 sm:px-6">
                    {/* Simplified logo/brand section */}
                    <div className="mb-3 sm:mb-4 md:mb-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-bold tracking-tight">
                            <span className="ultraflex-ultra text-white animate-pulse">ULTRA</span><span className="ultraflex-flex text-red-700 animate-pulse">FLEX</span>
                        </h1>
                    </div>

                    <p className="mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-200 leading-relaxed px-2 sm:px-4">
                        Transform your fitness journey with premium equipment, expert trainers, and limitless potential.
                    </p>

                    {/* Enhanced button with hover effects */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-0">
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm w-full sm:w-auto"
                            onClick={() => window.open('https://www.youtube.com/watch?v=CyWN8ipcwgo', '_blank')}
                            aria-label="Watch our story on YouTube"
                        >
                            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                Watch Our Story
                            </span>
                        </Button>

                        {/* Secondary CTA button */}
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm w-full sm:w-auto"
                        >
                            <a href="https://signup.ashbourne-memberships.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Join Today</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        </section>
    );
}