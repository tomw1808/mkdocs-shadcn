import { getFullNavigation } from '@/lib/mkdocs'
import { getMarkdownContent } from '@/lib/markdown'
import { NextResponse } from 'next/server'

export async function GET() {
  const navItems = getFullNavigation()
  const searchIndex = []

  async function processNavItem(item: any) {
    if (item.path) {
      const slug = item.path.replace('.md', '').split('/')
      try {
        const { content } = await getMarkdownContent(slug)
        searchIndex.push({
          url: `/${item.path.replace('.md', '')}`,
          title: item.title,
          content: content
        })
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

  return NextResponse.json(searchIndex)
}
