import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { getNavigation } from '@/lib/mkdocs'
import { CodeBlock } from '@/components/CodeBlock'
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
import { Code } from '@/components/Code'


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
      <main className="container mx-auto px-4 py-8">
        <div className=''>
          <GalleryProvider>
          <MDXRemote
            source={content}
            components={{
              // Add typography classes directly to HTML elements
              p: (props) => <p className="mb-4 text-base leading-7" {...props} />,
              ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
              ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
              li: (props) => <li className="text-base leading-7" {...props} />,
              h1: (props) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
              h2: (props) => <h2 className="text-3xl font-bold mb-4 mt-6" {...props} />,
              h3: (props) => <h3 className="text-2xl font-bold mb-3 mt-5" {...props} />,
              h4: (props) => <h4 className="text-xl font-bold mb-2 mt-4" {...props} />,
              h5: (props) => <h5 className="text-lg font-bold mb-2 mt-4" {...props} />,
              h6: (props) => <h6 className="text-base font-bold mb-2 mt-4" {...props} />,
              blockquote: (props) => <blockquote className="pl-4 border-l-4 border-gray-300 italic my-4" {...props} />,
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
                
                return <ContentTabs items={items} className='mb-4' />
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
                    <div className="my-4">
                      <LightboxImage
                        src={publicPath}
                        alt={props.alt}
                        className="max-w-full"
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
                      width={300} 
                      height={300} 
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
                      width={300}
                      height={300}
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
              script: (props) => <Script {...props} />,
              pre: ({ children, ...props }) => {
                console.log(children)
                // Only handle regular pre tags, Code components are already processed
                return <pre {...props}>{children}</pre>
              },
              Code: Code
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
