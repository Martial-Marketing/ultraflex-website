import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackFormat?: 'jpg' | 'jpeg' | 'png';
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackFormat = 'jpg',
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add .webp extension if not present
  const webpSrc = src.endsWith('.webp') ? src : `${src}.webp`;
  
  // Generate fallback URL
  const fallbackSrc = src.endsWith('.webp') 
    ? src.replace('.webp', `.${fallbackFormat}`)
    : `${src}.${fallbackFormat}`;

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <picture className={className}>
      {/* WebP source for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback image */}
      <img
        src={hasError ? fallbackSrc : webpSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </picture>
  );
};

export default OptimizedImage;