import { useState } from 'react';

const carouselImages = [
  // Dramatic night shots from North Leeds and Derby (prioritized per user request)
  '/Images/processed-C2A00A7E-5F83-456C-B4CB-70873B439AE2-min-min.jpeg', // North Leeds dramatic shot
  '/Images/processed-5AB78E5E-3190-4963-8AAF-9B3B527D73AD-min-min.jpeg', // Derby dramatic shot
  '/Images/westleeds/gym-in-westleeds.webp',
  '/Images/normanton/gym-in-normanton.webp',
  '/Images/rotherham/gym-in-rotherham.webp',
  '/Images/york/ForGallery/gym-in-york-6.webp',
  '/Images/processed-E08A33F0-0FB6-43A5-BF60-EC1147B6517D-min-min.jpeg', // Hull
];

export default function HomepageCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? carouselImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === carouselImages.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={carouselImages[current]}
        alt={`ULTRAFLEX Carousel ${current + 1}`}
        className="w-full h-96 object-cover transition-all duration-[1500ms]"
      />
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-red-700/80 transition"
        aria-label="Previous"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-red-700/80 transition"
        aria-label="Next"
      >
        &#8594;
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-red-700' : 'bg-white/60'} border border-white`}
          />
        ))}
      </div>
    </div>
  );
}
