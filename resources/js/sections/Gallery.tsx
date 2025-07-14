import { Button } from '@/components/ui/button';
import { ChevronRight, Camera, Eye, Expand } from 'lucide-react';

interface GalleryProps {
    galleryImages: string[];
}

export default function Gallery({ galleryImages }: GalleryProps) {
    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }, (_, i) => (
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
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-transparent to-red-900/10" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Simplified header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Gallery</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Take a look inside our world-class facilities
                    </p>
                </div>
                
                {/* Enhanced gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <div 
                            key={index} 
                            className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer group relative border border-white/10 hover:border-red-700/30"
                        >
                            <img 
                                src={image} 
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Hover overlay with gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Image number indicator */}
                            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-red-700/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-red-700/30">
                                    #{index + 1}
                                </div>
                            </div>

                            {/* View icon */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <Eye className="h-4 w-4 text-red-700" />
                                </div>
                            </div>

                            {/* Center expand button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                    <Expand className="h-5 w-5" />
                                </div>
                            </div>

                            {/* Bottom info bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                                        <span className="text-white text-sm font-medium">
                                            {index % 3 === 0 ? 'Equipment' : index % 3 === 1 ? 'Training Area' : 'Facilities'}
                                        </span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-red-700" />
                                </div>
                            </div>

                            {/* Image border effect */}
                            <div className="absolute inset-0 border-2 border-red-700/0 group-hover:border-red-700/30 rounded-lg transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>
                
                {/* Enhanced call-to-action button */}
                <div className="text-center mt-12">
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                    >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                            View Full Gallery
                        </span>
                        <Camera className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </Button>
                </div>

                {/* Bottom accent line */}
                <div className="mt-16 flex items-center justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}