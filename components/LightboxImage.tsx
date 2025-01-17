'use client'

import Image from 'next/image'
import { useEffect } from 'react'

interface LightboxImageProps {
  src: string
  alt?: string
  index: number
}

export function LightboxImage({ src, alt, index }: LightboxImageProps) {
  useEffect(() => {
    // Ensure the window object is available
    if (typeof window !== 'undefined') {
      const handleClick = () => {
        if (typeof (window as any).setGalleryIndex === 'function') {
          (window as any).setGalleryIndex(index)
        }
      }
      
      // Find the image container by data attribute
      const container = document.querySelector(`[data-lightbox-index="${index}"]`)
      if (container) {
        container.addEventListener('click', handleClick)
        return () => container.removeEventListener('click', handleClick)
      }
    }
  }, [index])

  return (
    <div 
      className="cursor-pointer"
      data-lightbox-index={index}
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
