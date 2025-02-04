'use client'

import { useEffect, useState } from 'react'
import { useGallery } from './GalleryProvider'
import Image from 'next/image'

interface LightboxImageProps {
  src: string
  alt?: string
  className?: string
  width: number
  height: number
  blurDataURL?: string
}

export function LightboxImage({ src, alt, className, width, height, blurDataURL }: LightboxImageProps) {
  const { addImage, setGalleryIndex } = useGallery()
  const [index, setIndex] = useState<number>(-1)

  useEffect(() => {
    // Add image to gallery and get its index
    const imageIndex = addImage({
      src,
      alt
    })
    setIndex(imageIndex)
  }, [addImage, src, alt]) // Include dependencies to ensure proper updates

  const handleClick = () => {
    setGalleryIndex(index)
  }

  return (
    <div 
      className={`${className} cursor-pointer relative w-full`}
      onClick={handleClick}
      style={{
        aspectRatio: `${width}/${height}`,
        maxHeight: '600px'
      }}
    >
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className="w-full h-full object-contain"
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
