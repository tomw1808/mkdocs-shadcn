import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdownContent } from '@/lib/markdown'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string[]
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { content, imagesPath } = await getMarkdownContent(params.slug)

    return (
      <main className=" mx-auto px-4 py-8 prose dark:prose-invert max-w-max">
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
              }
            }}
          />
          </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
