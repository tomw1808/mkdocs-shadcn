'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Image from 'next/image'

export interface GalleryImage {
  src: string
  alt?: string
  width: number
  height: number
}

interface LightboxGalleryProps {
  images: GalleryImage[]
  initialIndex?: number
}

export function LightboxGallery({ images, initialIndex = -1 }: LightboxGalleryProps) {
  const [index, setIndex] = useState(initialIndex)

  return (
    <>
      {images.map((image, i) => (
        <div 
          key={image.src} 
          onClick={() => setIndex(i)}
          className="cursor-pointer"
        >
          <Image
            src={image.src}
            alt={image.alt || ''}
            width={800}
            height={600}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      ))}
      
      <Lightbox
        index={index}
        slides={images}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  )
}
