'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGallery } from './GalleryProvider'

interface LightboxImageProps {
  src: string
  alt?: string
}

export function LightboxImage({ src, alt }: LightboxImageProps) {
  const { addImage, setGalleryIndex } = useGallery()
  const [index, setIndex] = useState<number>(-1)

  useEffect(() => {
    // Add image to gallery and get its index
    const imageIndex = addImage({
      src,
      alt,
      width: 800,
      height: 600
    })
    setIndex(imageIndex)
  }, []) // Empty dependency array since we only want to add image once

  const handleClick = () => {
    setGalleryIndex(index)
  }

  return (
    <div 
      className="cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={600}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}
