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

export function LightboxGallery({ images }: LightboxGalleryProps) {
  const [index, setIndex] = useState(-1)


  return (
    <Lightbox
      index={index}
      slides={images}
      open={index >= 0}
      close={() => setIndex(-1)}
    />
  )
}
