import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { getNavigation } from '@/lib/mkdocs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'

// Convert style string to object
function styleStringToObject(style: string): React.CSSProperties {
  return style.split(';').reduce((acc: any, style) => {
    if (style.trim()) {
      const [key, value] = style.split(':');
      const propertyName = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      acc[propertyName] = value.trim();
    }
    return acc;
  }, {});
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

    return (
      <main className="mx-auto px-4 py-8 prose dark:prose-invert max-w-max">
        <div className='container w-screen'>
          <MDXRemote
            source={content}
            components={{
              // Replace image sources with the correct path
              img: (props) => {
                const src = props.src?.startsWith('http')
                  ? props.src
                  : `${imagesPath}/${props.src}`
                return <img {...props} src={src} />
              },
              // Allow HTML elements like div and iframe
              div: (props) => {
                const { style, ...rest } = props;
                return <div 
                  {...rest} 
                  style={typeof style === 'string' ? styleStringToObject(style) : style}
                />
              },
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
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
