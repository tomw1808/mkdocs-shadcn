'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  url: string
  title: string
  content: string
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load the search index
    fetch('/search/search-index.json')
      .then(res => res.json())
      .then(setSearchIndex)
      .catch(err => console.error('Error loading search index:', err))
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchResults = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10) // Limit to 10 results

    setResults(searchResults)
  }, [query, searchIndex])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        >
          <SearchIcon className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Search documentation...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[20%] p-0">
        <div className="p-4">
          <Input
            placeholder="Type to search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10"
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-4 pt-0">
          {results.map((result, i) => (
            <button
              key={i}
              onClick={() => {
                router.push(result.url)
                setIsOpen(false)
              }}
              className={cn(
                "w-full rounded-lg px-4 py-3 text-left hover:bg-accent",
                "cursor-pointer"
              )}
            >
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-sm text-muted-foreground">
                {result.content.substring(0, 150)}...
              </p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
