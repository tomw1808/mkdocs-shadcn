# Next.js MkDocs Material Alternative

This project is a drop-in replacement for MkDocs Material, built with Next.js 13+, Tailwind CSS, and shadcn/ui. It aims to provide a modern, fast, and customizable documentation site generator that maintains compatibility with existing MkDocs projects.

## Features

- 📱 Fully responsive design
- 🌓 Dark mode support
- ⚡ Fast page loads with Next.js
- 🎨 Customizable with Tailwind CSS
- 🔍 Full-text search (coming soon)
- 📊 Beautiful UI components from shadcn/ui
- 🖼️ Automatic image optimization
- 📱 Mobile-friendly navigation

## Project Structure

```
your-project/
├── mkdocs/              # Your documentation files
│   ├── mkdocs.yml      # MkDocs configuration file
│   └── **/*.md         # Markdown files in any subdirectory
└── public/             # Public assets
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

This project aims to maintain compatibility with MkDocs Material features while providing a modern Next.js-based alternative. Currently supported:

- ✅ Basic markdown rendering
- ✅ Navigation structure from mkdocs.yml
- ✅ Image handling
- ✅ Previous/Next navigation
- ✅ Dark mode
- ⏳ Search (coming soon)
- ⏳ Table of contents
- ⏳ Admonitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this in your own projects.
