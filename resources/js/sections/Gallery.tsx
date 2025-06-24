import { Button } from '@/components/ui/button';

interface GalleryProps {
    galleryImages: string[];
}

export default function Gallery({ galleryImages }: GalleryProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
                    <p className="text-xl text-gray-600">
                        Take a look inside our world-class facilities
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform cursor-pointer">
                            <img 
                                src={image} 
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="px-8 py-3">
                        View Full Gallery
                    </Button>
                </div>
            </div>
        </section>
    );
}