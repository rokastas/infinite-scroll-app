import { useState, useEffect } from 'react';

const ProgressiveImage = ({ src, tinySrc, className, alt }) => {
  const [imageSrc, setImageSrc] = useState(tinySrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setIsLoaded(true);
      setImageSrc(src);
    };
    image.onerror = () => {
      setIsLoaded(true);
      // handle error if necessary
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
    />
  );
};

export default ProgressiveImage;
