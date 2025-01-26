import { getFullNavigation } from '@/lib/mkdocs'
import { getMarkdownContent } from '@/lib/markdown'
import { NextResponse } from 'next/server'

interface SearchResult {
  url: string;
  title: string;
  content: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase()

  if (!query) {
    return NextResponse.json([])
  }

  const navItems = getFullNavigation()
  const searchResults: SearchResult[] = []

  async function processNavItem(item: any) {
    if (item.path) {
      const slug = item.path.replace('.md', '').split('/')
      try {
        const { content } = await getMarkdownContent(slug)
        if (
          query && (item.title.toLowerCase().includes(query) ||
            content.toLowerCase().includes(query)
          )

        ) {
          searchResults.push({
            url: `/${item.path.replace('.md', '')}`,
            title: item.title,
            content: content
          })
        }
      } catch (error) {
        console.error(`Error processing ${item.path}:`, error)
      }
    }
    if (item.children) {
      for (const child of item.children) {
        await processNavItem(child)
      }
    }
  }

  // Process all navigation items
  for (const item of navItems) {
    await processNavItem(item)
  }

  return NextResponse.json(searchResults)
}
