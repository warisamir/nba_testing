import React from "react"
import { FaImage } from "react-icons/fa6"

const ImageSkeleton = () => {
  return (
    <div className='h-full w-full bg-white flex justify-center items-center'>
      <FaImage className='text-zinc-400 animate-pulse' size={32} />
    </div>
  );
}

export default ImageSkeleton;