import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  '/Images/HOME PAGE GALLERY IMAGES/UF Home Page Image 1.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP2.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP3.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP4.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP5.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP6.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP 7.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP8.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP9.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP10.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP11.webp',
  '/Images/HOME PAGE GALLERY IMAGES/UF HP12.webp',
];


export default function HomepageCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? carouselImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === carouselImages.length - 1 ? 0 : c + 1));

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c === carouselImages.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={carouselImages[current]}
        alt={`ULTRAFLEX Carousel ${current + 1}`}
        className="w-full h-96 object-cover transition-all duration-[1500ms]"
      />
      {/* Navigation and arrows in one row */}
      <div className="flex justify-center items-center gap-4 mt-6 mb-6">
        <button
          onClick={prev}
          className="w-10 h-10 flex items-center justify-center bg-black/80 text-white rounded-full hover:bg-red-700/80 transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {carouselImages.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-red-700' : 'bg-white/60'} border border-white`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 flex items-center justify-center bg-black/80 text-white rounded-full hover:bg-red-700/80 transition"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
