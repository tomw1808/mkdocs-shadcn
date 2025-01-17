'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { LightboxGallery, GalleryImage } from './LightboxGallery'

interface GalleryContextType {
  addImage: (image: GalleryImage) => number
  setGalleryIndex: (index: number) => void
}

const GalleryContext = createContext<GalleryContextType | null>(null)

export function useGallery() {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).setGalleryIndex = setIndex
    }
  }, [])

  const addImage = (image: GalleryImage) => {
    setImages(prev => [...prev, image])
    return images.length // Return the index where the image will be added
  }

  return (
    <GalleryContext.Provider value={{ addImage, setGalleryIndex: setIndex }}>
      {children}
      <LightboxGallery images={images} initialIndex={index} />
    </GalleryContext.Provider>
  )
}
