import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

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
            
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
                <div className="max-w-4xl px-6">
                    <h1 className="mb-6 text-6xl font-bold tracking-tight">
                        ULTRA<span className="text-blue-400">FLEX</span>
                    </h1>
                    <p className="mb-8 text-xl font-medium">
                        Experience fitness like never before. Premium equipment, expert trainers, limitless potential.
                    </p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                        <Play className="mr-2 h-5 w-5" />
                        Watch Our Story
                    </Button>
                </div>
            </div>
        </section>
    );
}