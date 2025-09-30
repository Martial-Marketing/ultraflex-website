import { Button } from '@/components/ui/button';
import { ChevronRight, Camera, Eye, Expand, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';

interface GalleryProps {
    galleryImages: string[];
}

export default function Gallery({ galleryImages }: GalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        // small timeout before clearing index to allow animation (if added later)
        setTimeout(() => setCurrentIndex(null), 150);
    };

    const showPrev = useCallback(() => {
        if (currentIndex === null) return;
        setCurrentIndex((prev) => prev === null ? prev : (prev - 1 + galleryImages.length) % galleryImages.length);
    }, [currentIndex, galleryImages.length]);

    const showNext = useCallback(() => {
        if (currentIndex === null) return;
        setCurrentIndex((prev) => prev === null ? prev : (prev + 1) % galleryImages.length);
    }, [currentIndex, galleryImages.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxOpen, showPrev, showNext]);

    // Body scroll lock
    useEffect(() => {
        if (lightboxOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = original; };
        }
    }, [lightboxOpen]);

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
                        <button
                            type="button"
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer group relative border border-white/10 hover:border-red-700/30 focus:outline-none focus:ring-2 focus:ring-red-700/50"
                            aria-label={`Open gallery image ${index + 1}`}
                        >
                            <img
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).classList.add('grayscale','opacity-40'); }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-red-700/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-red-700/30">#{index + 1}</div>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <Eye className="h-4 w-4 text-red-700" />
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                    <Expand className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                                        <span className="text-white text-sm font-medium">{index % 3 === 0 ? 'Equipment' : index % 3 === 1 ? 'Training Area' : 'Facilities'}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-red-700" />
                                </div>
                            </div>
                            <div className="absolute inset-0 border-2 border-red-700/0 group-hover:border-red-700/30 rounded-lg transition-colors duration-300"></div>
                        </button>
                    ))}
                </div>
                
                {/* Enhanced call-to-action button */}
                <div className="text-center mt-12">
                    <Link href="/gallery">
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
                    </Link>
                </div>

                {/* Bottom accent line */}
                <div className="mt-16 flex items-center justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>

            {lightboxOpen && currentIndex !== null && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                    onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
                >
                    {/* Top bar with close */}
                    <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex justify-end pointer-events-none">
                        <div className="flex gap-3 items-start">
                            <div className="hidden md:block bg-white/10 text-white text-xs tracking-wide uppercase px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm pointer-events-auto">
                                Press ESC or click outside to close
                            </div>
                            <button
                                onClick={closeLightbox}
                                aria-label="Close dialog"
                                className="pointer-events-auto flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-white/90 hover:bg-white text-black hover:text-red-700 font-semibold text-sm shadow-lg border border-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600/50"
                            >
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-700 text-white shadow-inner"><X className="h-3.5 w-3.5" /></span>
                                Close
                                <span className="hidden sm:inline text-xs opacity-70">(Esc)</span>
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={showPrev}
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white transition-colors shadow-md"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div className="max-w-6xl w-full px-6">
                        <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                            <img
                                src={galleryImages[currentIndex]}
                                alt={`Expanded gallery image ${currentIndex + 1}`}
                                className="max-h-[80vh] max-w-full object-contain"
                                loading="eager"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs text-white/90 border border-white/10">
                                {currentIndex + 1} / {galleryImages.length}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={showNext}
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white transition-colors shadow-md"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                    {/* Mobile bottom close */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden">
                        <button
                            onClick={closeLightbox}
                            className="px-6 py-2 rounded-full bg-white/90 text-black font-semibold text-sm shadow-lg border border-white/60 hover:bg-white hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600/50"
                            aria-label="Close image viewer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}