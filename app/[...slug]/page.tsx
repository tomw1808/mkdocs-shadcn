import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { getNavigation } from '@/lib/mkdocs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { GalleryProvider } from '@/components/GalleryProvider'
import { LightboxImage } from '@/components/LightboxImage'
import path from 'path'
import { ensurePublicImageExists } from '@/lib/images'
import { Admonition } from '@/components/Admonition'
import React from 'react'
import { ContentTabs } from '@/components/ContentTabs'


interface PageProps {
  params: {
    slug: string[]
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { content, imagesPath } = await getMarkdownContent(params.slug)
    const { prev, next } = getNavigation(params.slug.join('/'))
    
    return (
      <main className="mx-auto px-4 py-8 prose dark:prose-invert max-w-max">
        <div className='container w-screen'>
          <GalleryProvider>
          <MDXRemote
            source={content}
            components={{
              Tab: ({ label, children }) => {
                // Individual tab content - this won't be rendered directly
                return children
              },
              Tabs: ({ children }) => {
                // Convert children to array if it isn't already
                const childrenArray = React.Children.toArray(children)
                
                // Extract tab items from children
                const items = childrenArray.map((child: any) => ({
                  label: child.props.label,
                  content: child.props.children
                }))
                
                return <ContentTabs items={items} />
              },
              Admonition: (props) => {
                const { type, title, children } = props
                return (
                  <Admonition type={type} title={title}>
                    {children}
                  </Admonition>
                )
              },
              LightboxImage: (props) => {
                // Handle local images for lightbox gallery
                if (!props.src?.startsWith('http')) {
                  const originalPath = path.join('mkdocs', ...params.slug.slice(0, -1), props.src || '')
                  const publicPath = ensurePublicImageExists(originalPath)
                  
                  // Return the client component
                  return (
                    <LightboxImage
                      src={publicPath}
                      alt={props.alt}
                    />
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
          </GalleryProvider>
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
