import { useState } from 'react';

const carouselImages = [
  '/Images/westleeds/UFG (100) (2).jpg',
  '/Images/northleeds/DSC07392 (1).jpg',
  '/Images/normanton/IMG_(61) (1).jpg',
  '/Images/rotherham/IMG (19) (4).jpg',
  '/Images/york/ForGallery/DSC07349.jpg',
  '/Images/hull/IMG (19) (5).jpg',
];

export default function HomepageCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? carouselImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === carouselImages.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={carouselImages[current]}
        alt={`UltraFlex Carousel ${current + 1}`}
        className="w-full h-96 object-cover transition-all duration-700"
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
