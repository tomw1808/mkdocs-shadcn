# Next.js MkDocs Material Alternative

This project is a drop-in replacement for MkDocs Material, built with Next.js 14+, Tailwind CSS, and shadcn/ui. It aims to provide a modern, fast, and customizable documentation site generator that maintains compatibility with existing MkDocs projects while adding modern features and improvements.

## Features

### Core Features
- 📱 Fully responsive design with mobile-first approach
- 🌓 Dark mode support with system preference detection
- ⚡ Fast page loads with Next.js 14+ and App Router
- 🎨 Customizable with Tailwind CSS
- 📊 Beautiful UI components from shadcn/ui
- 🔍 Full-text search with Pagefind integration
- 📑 GitHub Flavored Markdown support with tables

### Navigation
- 📚 Dynamic sidebar navigation with collapsible sections
- 🗺️ Automatic navigation structure from mkdocs.yml
- 🔗 Previous/Next page navigation
- 📱 Mobile-friendly navigation drawer with keyboard shortcuts (⌘K / Ctrl+K)
- 🏷️ Section headers and improved navigation highlighting
- 🔄 Version switching support (in development)

### Image Handling
- 🖼️ Advanced image optimization with Next.js Image component
- 📸 Lightbox gallery support using double exclamation syntax (!![])
- 🎯 Automatic image processing and path handling
- 🔄 Support for both local and remote images
- 📁 Automatic public directory management for assets

### Code Features
- 🎨 Syntax highlighting with rehype-pretty-code
- 📝 Line highlighting and automatic line numbers
- 📋 Copy-to-clipboard button on all code blocks
- 🎭 Code block titles and language detection
- 🎯 GitHub-themed light and dark syntax themes

### Documentation Features
- ⚠️ Admonitions with 12+ types (note, warning, danger, etc.)
- 📑 Collapsible admonition blocks using ???
- 🔲 Custom titles for admonition blocks
- 📝 Rich markdown support
- 🎯 Drop-In compatible with existing MkDocs content

## Project Structure

```
your-project/
├── mkdocs/              # Your documentation root
│   ├── mkdocs.yml      # MkDocs configuration file
│   └── docs/           # Documentation markdown files
│       └── **/*.md     # Markdown files in any subdirectory
├── components/         # React components
├── lib/               # Utility functions
└── public/            # Public assets
```

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Place your `mkdocs.yml` file in the `mkdocs` directory.

3. Place your markdown files in the `mkdocs` directory, maintaining your desired structure.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see your documentation site.

## MkDocs Compatibility

This project maintains full compatibility with MkDocs Material features while providing modern enhancements:

### Fully Compatible Features
- ✅ Basic markdown rendering with enhanced styling
- ✅ Navigation structure from mkdocs.yml
- ✅ Advanced image handling and optimization
- ✅ Previous/Next navigation
- ✅ Dark mode with system preference
- ✅ Admonitions with all standard types
- ✅ Code blocks with syntax highlighting
- ✅ Content tabs
- ✅ Collapsible navigation sections
- ✅ Tables with column alignment support

### Enhanced Features
- ✨ Improved image galleries with lightbox
- ✨ Better code block interaction
- ✨ Modern UI components
- ✨ Faster page loads
- ✨ Better mobile experience
- ✨ TypeScript support
- ✨ Modern development experience

### Coming Soon
- 🔄 Table of contents
- 🔄 More MkDocs Material extensions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Check our contribution guidelines for more information.

## License

This project is available under a custom license that allows free use for both personal and commercial purposes, but explicitly prohibits using the software to create commercial hosting services based on this project. See the [LICENSE](LICENSE.md) file for details.
