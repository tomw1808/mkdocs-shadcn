'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string;
  data: () => Promise<{
    url: string;
    meta: {
      title: string;
    };
    excerpt: string;
  }>;
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loadedResults, setLoadedResults] = useState<Array<{
    url: string;
    title: string;
    excerpt: string;
  }>>([])
  const router = useRouter()

  // Load Pagefind when component mounts
  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === "undefined") {
        try {
          window.pagefind = await import(
            /* @ts-ignore */
            /* webpackIgnore: true */ "/pagefind/pagefind.js"
          );
        } catch (e) {
          console.error("Error loading Pagefind:", e);
          window.pagefind = {
            search: () => Promise.resolve({ results: [] }),
            debouncedSearch: () => Promise.resolve({ results: [] })
          };
        }
      }
    }
    loadPagefind();
  }, []);

  // Search when query changes
  useEffect(() => {
    async function performSearch() {
      if (!query.trim() || !window.pagefind) {
        setResults([]);
        setLoadedResults([]);
        return;
      }

      try {
        const search = await window.pagefind.debouncedSearch(query);
        setResults(search.results);
      } catch (err) {
        console.error('Error searching:', err);
        setResults([]);
      }
    }

    performSearch();
  }, [query]);

  // Load result data when results change
  useEffect(() => {
    async function loadResultData() {
      const loadedData = await Promise.all(
        results.map(async (result) => {
          const data = await result.data();
          return {
            url: data.url,
            title: data.meta.title,
            excerpt: data.excerpt
          };
        })
      );
      setLoadedResults(loadedData);
    }

    loadResultData();
  }, [results]);

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
          className="xl:w-60 xl:px-3 xl:py-2 flex justify-between"
        >
          <div className='flex'>
          <SearchIcon className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:block">Search...</span>
          </div>
          <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[20%]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex items-center align-center">
          <Input
            placeholder="Type to search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10"
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto py-4 pt-0">
          {loadedResults.map((result, i) => (
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
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: result.excerpt }} />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
