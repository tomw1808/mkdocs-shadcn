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
      className={className + " cursor-pointer relative relative h-96 flex align-left"}
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className="object-contain self-left"
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
      />
    </div>
  )
}
