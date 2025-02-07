# Search

MkDocs-Shadcn uses [Pagefind](https://pagefind.app/) for fast, client-side search functionality. The search is:

- **Fast**: All searching happens client-side using a pre-built index
- **Lightweight**: The search bundle is loaded only when needed
- **Accessible**: Full keyboard navigation support (⌘K / Ctrl+K to open)
- **Offline-capable**: Works without a server once the page is loaded

## How it Works

The search functionality is implemented in two parts:

1. **Build-time Indexing**: During the build process, a script scans all markdown files in the `mkdocs` directory and creates a search index. This index is stored in `public/pagefind/` and contains optimized data structures for fast searching.

2. **Runtime Search**: When a user opens the search dialog, the Pagefind library is loaded and attaches itself to the window object. This provides fast, client-side search through the pre-built index.

## Search Features

- **Keyboard Shortcuts**: Press ⌘K (Mac) or Ctrl+K (Windows/Linux) to open the search dialog
- **Full-text Search**: Searches through both titles and content
- **Highlighted Results**: Search terms are highlighted in the results
- **Instant Results**: Results update as you type
- **Excerpt Preview**: Shows the context around matched terms

## Implementation Details

The search implementation consists of several key components:

1. A build script (`scripts/build-search-index.ts`) that generates the search index
2. A React component (`components/Search.tsx`) that provides the search interface
3. The Pagefind library that handles the actual search functionality

The search index is built automatically during the build process, ensuring it's always up to date with your content.
