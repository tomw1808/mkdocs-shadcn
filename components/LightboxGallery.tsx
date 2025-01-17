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

  // Update index when initialIndex changes
  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  return (
    <Lightbox
      index={initialIndex}
      slides={images}
      open={index >= 0}
      close={() => setIndex(-1)}
    />
  )
}
