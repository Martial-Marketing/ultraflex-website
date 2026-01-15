import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Folder, ChevronLeft, Search, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationInfo {
  slug: string;
  name: string;
  count: number;
  coverImage?: string | null;
}

interface GalleryIndexProps {
  images: string[];
  locations?: LocationInfo[];
  selected?: { slug: string; name: string } | null;
  auth: { user: any };
}

export default function GalleryIndex({ images, locations = [], selected, auth }: GalleryIndexProps) {
  const [query, setQuery] = useState('');
  const filteredLocations = useMemo(() => {
    if (!query.trim()) return locations;
    const q = query.toLowerCase();
    return locations.filter(l => l.name.toLowerCase().includes(q));
  }, [locations, query]);

  return (
    <AppLayout auth={auth}>
      <Head title="Gallery - ULTRAFLEX" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 py-16 container mx-auto px-6">
          <div className="mb-8">
            {/* Breadcrumb / Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {selected ? (
                  <a href="/gallery" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="text-sm">All Locations</span>
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">Gallery / Locations</span>
                )}
              </div>
              {selected && (
                <div className="flex items-center gap-3">
                  <a href="/gallery">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/20 border border-white/10 text-gray-200">
                      <ChevronLeft className="h-4 w-4 mr-2" /> Back to Locations
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {selected ? (
                    <>
                      <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> {selected.name} <span className="text-red-700">Gallery</span>
                    </>
                  ) : (
                    <>Our <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">Gallery</span></>
                  )}
                </h1>
                <p className="text-gray-300 max-w-2xl">
                  {selected ? 'Browse images from this ULTRAFLEX location.' : 'Explore our locations and dive into their image galleries.'}
                </p>
              </div>
              {!selected && (
                <div className="w-full md:w-80">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search locations..."
                      className="pl-10 bg-black/40 border-white/10 text-gray-200 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-400">{filteredLocations.length} location{filteredLocations.length === 1 ? '' : 's'}</div>
                </div>
              )}
            </div>
          </div>

          {/* Locations grid (when not filtered) */}
          {!selected && filteredLocations && filteredLocations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl text-white font-semibold mb-4">Browse by location</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredLocations.map((loc) => (
                  <a key={loc.slug} href={`/gallery?loc=${encodeURIComponent(loc.slug)}`} aria-label={`Open ${loc.name} gallery`} className="block h-full">
                    <Card className="h-full overflow-hidden rounded-xl bg-black/40 border border-white/10 transition-all duration-300 group hover:shadow-xl hover:shadow-red-900/20 hover:border-red-700/40 py-0 gap-0">
                      <div className="relative h-28 md:h-32 bg-black/30">

                        {/* Content Row */}
                        <div className="relative z-10 h-full w-full flex items-center justify-between px-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-12 w-12 rounded-lg bg-red-700/25 border border-red-700/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Folder className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-white font-semibold truncate group-hover:text-red-500 transition-colors">{loc.name}</div>
                              <div className="text-xs text-gray-400">{loc.count} image{loc.count === 1 ? '' : 's'}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-300 hidden md:inline">Open</span>
                            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-red-500 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
          {!selected && (!images || images.length === 0) && (
            <div className="text-center text-gray-400 mb-8">Select a location above to view its images.</div>
          )}
          {images && images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <a key={i} href={img} target="_blank" rel="noopener noreferrer" aria-label={`Open image ${i+1}`}>
                  <Card className="overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-300 group hover:shadow-xl hover:shadow-red-900/20 hover:border-red-700/40 py-0 gap-0">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={img} loading="lazy" alt={`Gallery image ${i+1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      {/* Hover overlay with icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="w-full flex items-center justify-between px-2 pb-2">
                          <div className="bg-red-700/25 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-red-700/30">#{i+1}</div>
                          <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                            <Maximize2 className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          )}
          {selected && (!images || images.length === 0) && (
            <div className="text-center text-gray-300 mt-10">Images for this location will be added soon.</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
