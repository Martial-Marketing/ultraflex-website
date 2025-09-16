
import { usePage } from '@inertiajs/react';

export default function AppBackButton() {
  const { url } = usePage();
  
  // Don't show back button on home page
  if (url === '/') {
    return null;
  }

  // Fallback for Inertia.js navigation
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={goBack}
      aria-label="Go Back"
      className="fixed left-4 top-4 z-50 bg-black/80 text-white rounded-full shadow-lg p-3 hover:bg-red-700 transition-all border border-white/10 backdrop-blur-md flex items-center"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span className="hidden md:inline">Back</span>
    </button>
  );
}
