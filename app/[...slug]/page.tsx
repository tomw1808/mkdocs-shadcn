import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { getNavigation, getFullNavigation, getAllPaths } from '@/lib/mkdocs'
import { SideNav } from '@/components/SideNav'
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
import { ClientCode } from '@/components/ClientCode'
import { ContentTabs } from '@/components/ContentTabs'
import { Code } from '@/components/Code'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons'
import { remarkTabs } from '@/plugins/remark-tabs'
import { remarkAdmonition } from '@/plugins/remark-admonition'
import { remarkImages } from '@/plugins/remark-images'

import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import "./page.css";
import { CodeHikeCodeblock } from '@/components/CodeHike'

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const paths = getAllPaths()
  return paths.map((path) => ({
    slug: path.split('/')
  }))
}

export const dynamicParams = false // Prevent dynamic paths

export async function generateMetadata({ params }: PageProps) {
  try {
    const { content, frontmatter } = await getMarkdownContent(params.slug)
    return {
      title: frontmatter.title || params.slug[params.slug.length - 1],
      description: frontmatter.description || '',
    }
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { content, imagesPath, frontmatter } = await getMarkdownContent(params.slug)
    const { prev, next } = getNavigation(params.slug.join('/'))
    const navItems = getFullNavigation()
    const chConfig = {
      components: { code: "MyCode" }
    }
    return (
      <div className='mt-6 px-6 lg:px-0 container'>

        <SidebarProvider defaultOpen={true}>
          <SideNav items={navItems} />
          <SidebarInset className='w-full'>
            <div className="mx-auto w-full min-w-0 max-w-2xl min-h-full">

              <GalleryProvider>
                <MDXRemote
                  source={content}
                  components={{
                    // Add typography classes directly to HTML elements
                    a: (props) => <a className="leading-7 [&:not(:first-child)]:mt-6 underline" {...props} />,
                    p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
                    // Custom components for our remark plugin nodes
                    tabs: ({ children, ...props }) => {
                      // Convert children to array if it isn't already
                      const childrenArray = React.Children.toArray(children)
                      // Extract tab items from children
                      const items = childrenArray.map((child: any) => ({
                        label: child.props?.label || 'Untitled',
                        content: child.props?.children || child
                      }))
                      return <ContentTabs items={items} className='mt-6 first:mt-0' />
                    },
                    tab: ({ label, children }) => {
                      return React.createElement('div', { label }, children)
                    },
                    ul: (props) => <ul className="list-disc pl-6  [&:not(:first-child)]:mt-6 space-y-2" {...props} />,
                    ol: (props) => <ol className="list-decimal pl-6  [&:not(:first-child)]:mt-6 space-y-2" {...props} />,
                    li: (props) => <li className="text-base leading-7" {...props} />,
                    h1: (props) => <h1 className="scroll-m-20 text-3xl font-bold tracking-tight" {...props} />,
                    h2: (props) => <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0" {...props} />,
                    h3: (props) => <h3 className="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
                    h4: (props) => <h4 className="text-xl font-bold mt-2" {...props} />,
                    h5: (props) => <h5 className="text-lg font-bold mt-2" {...props} />,
                    h6: (props) => <h6 className="text-base font-bold mb-2" {...props} />,
                    blockquote: (props) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
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

                      return <ContentTabs items={items} className='mt-6 first:mt-0 ' />
                    },
                    Admonition: (props) => {
                      const { type, title, children, isCollapsible } = props
                      return (
                        <Admonition type={type} title={title} isCollapsible={isCollapsible}>
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
                          <div className="mt-6 first:mt-0">
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
                          style={{ maxWidth: '100%', height: 'auto' }}
                          alt={props.alt || 'Image'}
                        />
                      )
                    },
                    // Regular image handling
                    img: async (props) => {
                      if (props.src?.startsWith('http')) {
                        // Handle remote images with fallback dimensions
                        return (
                          <Image
                            src={props.src}
                            width={700}
                            height={475}
                            style={{ maxWidth: '100%', height: 'auto' }}
                            alt={props.alt || 'Image'}
                          />
                        )
                      } else {
                        // Handle local images with proper dimensions
                        const originalPath = path.join('mkdocs', ...params.slug.slice(0, -1), props.src || '')
                        const publicPath = ensurePublicImageExists(originalPath)
                        return <ServerImage src={publicPath} alt={props.alt} />
                      }
                    },
                    // Allow HTML elements like div and iframe
                    div: (props) => <div {...props} />,
                    iframe: (props) => <iframe {...props} />,
                    script: (props) => <Script {...props} />,
                    pre: ({ children, ...props }) => {
                      // Only handle regular pre tags, Code components are already processed
                      return <pre {...props}>{children}</pre>
                    },
                    Code: (props) => <ClientCode {...props} />,
                    MyCode: (props) => <CodeHikeCodeblock {...props} />
                  }}
                  options={{
                    parseFrontmatter: true,
                    mdxOptions: {
                      development: process.env.NODE_ENV === 'development',
                      remarkPlugins: [remarkTabs, remarkAdmonition, remarkImages, [remarkCodeHike, chConfig]],
                      rehypePlugins: [],
                      recmaPlugins: [[recmaCodeHike, chConfig]],
                      format: 'mdx'
                    }

                  }}
                />

              </GalleryProvider>
            </div>
            <div className="mt-8 flex justify-between py-10 border-t-2 border-gray-200 ">
              <div className="flex justify-between mx-auto w-full min-w-0 max-w-2xl">

                {prev && (
                  <Link href={`/${prev.path.replace('.md', '')}`} className="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground px-4 py-2">
                    <CaretLeftIcon /> {prev.title}
                  </Link>
                )}
                {next && (
                  <Link href={`/${next.path.replace('.md', '')}`} className="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground px-4 py-2">
                    {next.title} <CaretRightIcon />
                  </Link>
                )}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    )
  } catch (error) {
    console.error(error);
    notFound()
  }
}

