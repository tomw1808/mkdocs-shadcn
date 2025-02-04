import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs'

interface ServerImageProps {
  src: string
  alt?: string
  className?: string
}

export async function ServerImage({ src, alt, className }: ServerImageProps) {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(src)
    
    // Get image dimensions and base64 placeholder
    const { 
      metadata: { width, height },
      base64 
    } = await getPlaiceholder(imageBuffer)

    return (
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className={className}
        placeholder="blur"
        blurDataURL={base64}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    )
  } catch (error) {
    // Fallback for remote images or errors
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={700}
        height={475}
        className={className}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    )
  }
}
