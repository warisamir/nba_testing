import React, { Suspense, useEffect, useState } from 'react'
import ImageSkeleton from './ImageSkeleton';


const ImageLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  if (!loaded) {
    return <ImageSkeleton />;
  }

  return <img src={src} alt={alt} className={`h-full w-full object-cover`} />;
};

export default ImageLoader;