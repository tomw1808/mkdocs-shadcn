import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { getNavigation } from '@/lib/mkdocs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { LightboxGallery, GalleryImage } from '@/components/LightboxGallery'
import path from 'path'
import { ensurePublicImageExists } from '@/lib/images'

// Convert style string to object
function styleStringToObject(style: string | undefined): React.CSSProperties | undefined {
  if (!style) return undefined;
  
  console.log('Processing style string:', style);
  
  try {
    const objStyle = style.split(';').reduce((acc: any, style) => {
      if (style.trim()) {
        const [key, value] = style.split(':');
        if (key && value) {
          const propertyName = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          acc[propertyName] = value.trim();
        }
      }
      return acc;
    }, {});
    
    console.log('Converted style object:', objStyle);
    return objStyle;
  } catch (error) {
    console.error('Error converting style:', error);
    return undefined;
  }
}

interface PageProps {
  params: {
    slug: string[]
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { content, imagesPath } = await getMarkdownContent(params.slug)
    const { prev, next } = getNavigation(params.slug.join('/'))
    
    // Create a ref to store all gallery images
    const galleryImages: GalleryImage[] = []

    return (
      <main className="mx-auto px-4 py-8 prose dark:prose-invert max-w-max">
        <div className='container w-screen'>
          <MDXRemote
            source={content}
            components={{
              LightboxImage: (props) => {
                // Handle local images for lightbox gallery
                if (!props.src?.startsWith('http')) {
                  const originalPath = path.join('mkdocs', ...params.slug.slice(0, -1), props.src || '')
                  const publicPath = ensurePublicImageExists(originalPath)
                  
                  // Add image to gallery array
                  const galleryImage = {
                    src: publicPath,
                    alt: props.alt,
                    width: 800,
                    height: 600
                  }
                  galleryImages.push(galleryImage)
                  
                  // Return image that will open the gallery at its index
                  return (
                    <div 
                      className="cursor-pointer"
                      onClick={() => {
                        const index = galleryImages.length - 1
                        setGalleryIndex(index)
                      }}
                    >
                      <Image
                        src={publicPath}
                        alt={props.alt || ''}
                        width={800}
                        height={600}
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  )
                }
                // Fall back to regular image for remote URLs
                return (
                  <Image 
                    src={props.src} 
                    width={800} 
                    height={600} 
                    style={{maxWidth: '100%', height: 'auto'}} 
                    alt={props.alt || 'Image'}
                  />
                )
              },
              // Regular image handling
              img: (props) => {
                if (props.src?.startsWith('http')) {
                  // Handle remote images
                  return (
                    <Image 
                      src={props.src} 
                      width={800} 
                      height={600} 
                      style={{maxWidth: '100%', height: 'auto'}} 
                      alt={props.alt || 'Image'}
                    />
                  )
                } else {
                  // Handle local images by copying them to public directory
                  const originalPath = path.join('mkdocs', ...params.slug.slice(0, -1), props.src || '')
                  const publicPath = ensurePublicImageExists(originalPath)
                  return (
                    <Image
                      src={publicPath}
                      width={800}
                      height={600}
                      style={{maxWidth: '100%', height: 'auto'}}
                      alt={props.alt || 'Image'}
                      placeholder={"blur"}
                    />
                  )
                }
              },
              // Allow HTML elements like div and iframe
              div: (props) => <div {...props} />,
              iframe: (props) => <iframe {...props} />,
              script: (props) => <Script {...props} />
            }}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                development: process.env.NODE_ENV === 'development',
                remarkPlugins: [],
                rehypePlugins: [],
                format: 'mdx'
              }
            }}
          />
          
          <div className="mt-8 flex justify-between">
            {prev && (
              <Link href={`/${prev.path.replace('.md', '')}`} className="text-blue-500">
                ← {prev.title}
              </Link>
            )}
            {next && (
              <Link href={`/${next.path.replace('.md', '')}`} className="text-blue-500 ml-auto">
                {next.title} →
              </Link>
            )}
          </div>
          
          {/* Single gallery for all images */}
          <LightboxGallery images={galleryImages} />
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
