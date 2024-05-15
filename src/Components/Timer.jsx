import React, { Suspense, useEffect, useState } from 'react'
import { MdOutlineTimer } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import GoogleAILogo from "/Google AI Logo.png";
import ImageLoader from './ImageLoader';

// const ImageSkeleton = () => {
//   return(
//     <div className='h-full w-full bg-white flex justify-center items-center'>
//       <FaImage className='text-zinc-400 animate-pulse' size={32} />
//     </div>
//   )
// }

// const ImageLoader = ({ src, alt }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setLoaded(false);
//     const img = new Image();
//     img.src = src;
//     img.onload = () => setLoaded(true);
//   }, [src]);

//   if (!loaded) {
//     return <ImageSkeleton />;
//   }

//   return <img src={src} alt={alt} className="h-full w-full object-cover" />;
// };

const Timer = ({ time, imgsrc }) => {
  return (
    <div className='relative my-8'>
      <div className='absolute left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <div className='bg-white px-3 py-1 border-2 rounded-full flex justify-center items-center gap-2'>
          <MdOutlineTimer className='mt-0.5' />
          <p>00:{String(time).padStart(2, '0')}</p>
        </div>
      </div>
      <div className='w-full aspect-video border-2 rounded-xl overflow-hidden'>
        <ImageLoader src={imgsrc} alt={"alt title"} />
      </div>
    </div>
  )
}

export default Timer