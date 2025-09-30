import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';

interface GalleryIndexProps {
  images: string[];
  auth: { user: any };
}

export default function GalleryIndex({ images, auth }: GalleryIndexProps) {
  return (
    <AppLayout auth={auth}>
      <Head title="Gallery - UltraFlex" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 py-16 container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Our <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Gallery</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">Explore a broader collection of images from across UltraFlex locations.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <Card key={i} className="overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                <div className="aspect-square relative overflow-hidden">
                  <img src={img} alt={`Gallery image ${i+1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 bg-red-700/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-red-700/30">#{i+1}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
