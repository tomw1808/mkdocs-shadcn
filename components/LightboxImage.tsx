'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGallery } from './GalleryProvider'

interface LightboxImageProps {
  src: string
  alt?: string
  className?: string
}

export function LightboxImage({ src, alt, className }: LightboxImageProps) {
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
      <ServerImage
        src={src}
        alt={alt}
        className="object-contain self-left"
      />
    </div>
  )
}
