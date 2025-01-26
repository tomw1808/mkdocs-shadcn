'use client';

import { useState, useEffect } from 'react';
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  url: string;
  title: string;
  excerpt: string;
}

export function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [pagefind, setPagefind] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadPagefind = async () => {
      if (typeof window !== 'undefined') {
        try {
          const pagefind = await import("/public/pagefind/pagefind.js");
          setPagefind(pagefind);
        } catch (e) {
          console.warn("Pagefind not loaded - run build first");
        }
      }
    };
    loadPagefind();

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const performSearch = async (query: string) => {
    if (!pagefind || !query) {
      setResults([]);
      return;
    }

    const search = await pagefind.search(query);
    const results = await Promise.all(
      search.results.map(async (result: any) => {
        const data = await result.data();
        return {
          id: result.id,
          url: data.url,
          title: data.meta.title,
          excerpt: data.excerpt,
        };
      })
    );
    setResults(results);
  };

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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              performSearch(e.target.value);
            }}
            className="h-10"
            autoFocus
          />
        </div>
        {results.length > 0 && (
          <div className="max-h-[300px] overflow-y-auto p-4 pt-0">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => {
                  router.push(result.url);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full rounded-lg px-4 py-3 text-left hover:bg-accent",
                  "cursor-pointer"
                )}
              >
                <h3 className="font-semibold">{result.title}</h3>
                <p className="text-sm text-muted-foreground">{result.excerpt}</p>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
