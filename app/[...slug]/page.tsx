import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { getNavigation, getFullNavigation, getAllPaths, findNavTitle } from '@/lib/mkdocs'
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
import remarkGfm from "remark-gfm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import "./page.css";
import { CodeHikeCodeblock } from '@/components/CodeHike'
import fs from "fs";
import { getPlaiceholder } from "plaiceholder";
import { remarkFootnotes } from '@/plugins/remark-footnotes'

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
    const slugParams = await params
    const { content, frontmatter } = await getMarkdownContent(slugParams.slug)
    const navItems = getFullNavigation()

    // Find the navigation item that matches this path
    const currentPath = slugParams.slug.join('/')
    const navTitle = findNavTitle(navItems, currentPath)

    return {
      title: frontmatter.title || navTitle || slugParams.slug[slugParams.slug.length - 1],
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
    const slugParams = await params
    const { content, imagesPath, frontmatter } = await getMarkdownContent(slugParams.slug)
    const { prev, next } = getNavigation(slugParams.slug.join('/'))
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
                    LightboxImage: async (props) => {
                      if (!props.src?.startsWith('http')) {
                        const originalPath = path.join('mkdocs', 'docs', ...params.slug.slice(0, -1), props.src || '')
                        const publicPath = ensurePublicImageExists(originalPath)

                        // Process image dimensions at the page level
                        const imageBuffer = fs.readFileSync(originalPath)
                        const { metadata, base64 } = await getPlaiceholder(imageBuffer)
                        return (
                          <div className="mt-6 first:mt-0">
                            <LightboxImage
                              src={publicPath}
                              alt={props.alt}
                              width={metadata.width}
                              height={metadata.height}
                              blurDataURL={base64}
                              className="max-w-full"
                            />
                          </div>
                        )
                      }
                      // For remote images, fetch and process with plaiceholder
                      try {
                        const response = await fetch(props.src)
                        const buffer = Buffer.from(await response.arrayBuffer())
                        const { metadata, base64 } = await getPlaiceholder(buffer)

                        return (
                          <Image
                            src={props.src}
                            alt={props.alt || ''}
                            width={metadata.width}
                            height={metadata.height}
                            placeholder="blur"
                            blurDataURL={base64}
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        )
                      } catch (error) {
                        console.error('Error processing remote image:', error)
                        // Fallback to basic image with default dimensions
                        return (
                          <Image
                            src={props.src}
                            width={800}
                            height={600}
                            style={{ maxWidth: '100%', height: 'auto' }}
                            alt={props.alt || 'Image'}
                          />
                        )
                      }
                    },
                    img: async (props) => {
                      try {
                        if (props.src?.startsWith('http')) {
                          // For remote images, fetch and process with plaiceholder
                          const response = await fetch(props.src)
                          const buffer = Buffer.from(await response.arrayBuffer())
                          const { metadata, base64 } = await getPlaiceholder(buffer)

                          return (
                            <Image
                              src={props.src}
                              alt={props.alt || ''}
                              width={metadata.width}
                              height={metadata.height}
                              placeholder="blur"
                              blurDataURL={base64}
                              style={{ maxWidth: '100%', height: 'auto' }}
                            />
                          )
                        }

                        // For local images
                        const originalPath = path.join('mkdocs', 'docs', ...params.slug.slice(0, -1), props.src || '')
                        const publicPath = ensurePublicImageExists(originalPath)
                        const imageBuffer = fs.readFileSync(originalPath)
                        const { metadata, base64 } = await getPlaiceholder(imageBuffer)

                        return (
                          <Image
                            src={publicPath}
                            alt={props.alt || ''}
                            width={metadata.width}
                            height={metadata.height}
                            placeholder="blur"
                            blurDataURL={base64}
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        )
                      } catch (error) {
                        console.error('Error processing image:', error)
                        // Fallback to basic image with default dimensions
                        return (
                          <div>Image not found</div>
                        )
                      }
                    },
                    // Allow HTML elements like div and iframe
                    div: (props) => <div {...props} />,
                    iframe: (props) => <iframe {...props} />,
                    script: (props) => <Script {...props} />,
                    table: ({ children, className }) => (
                      <Table className={className}>
                        {children}
                      </Table>
                    ),
                    th: ({ children, className, style }) => (
                      <TableHead className={className} style={style}>{children}</TableHead>
                    ),
                    td: ({ children, className, style }) => (
                      <TableCell className={className} style={style}>{children}</TableCell>
                    ),
                    thead: ({ children }) => (
                      <TableHeader>{children}</TableHeader>
                    ),
                    tbody: ({ children }) => (
                      <TableBody>{children}</TableBody>
                    ),
                    tr: ({ children }) => (
                      <TableRow>{children}</TableRow>
                    ),
                    pre: ({ children, ...props }) => {
                      // Only handle regular pre tags, Code components are already processed
                      return <pre {...props}>{children}</pre>
                    },
                    Code: (props) => <ClientCode {...props} />,
                    MyCode: (props) => <CodeHikeCodeblock {...props} />,
                    // Footnotes handling
                    sup: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                      footnoteContent?: string;
                    }) => {
                      const {children, footnoteContent} = props;
                      
                      // Type guard to check if children is a React element
                      if (!React.isValidElement(children) || !footnoteContent) {
                        return <sup>{children}</sup>;
                      }

                      return (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <sup className="cursor-pointer" id={children.props?.id}>
                              <a href={children.props?.href} className="text-primary-500 dark:text-gray-300">{children.props?.children}</a>
                            </sup>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              {footnoteContent}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    },
                  }}
                  options={{
                    parseFrontmatter: true,
                    mdxOptions: {
                      development: process.env.NODE_ENV === 'development',
                      remarkPlugins: [remarkFootnotes, remarkTabs, remarkAdmonition, remarkImages, remarkGfm, [remarkCodeHike, chConfig]],
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

