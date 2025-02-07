# Getting Started

## Initial Setup

1. First, fork the repository on GitHub. This creates your own copy of the project that you can modify and use as needed.

2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/mkdocs-shadcn.git
   cd mkdocs-nextjs-dropin
   ```

3. Add the original repository as an upstream remote to keep your fork up to date:
   ```bash
   git remote add upstream https://github.com/tomw1808/mkdocs-shadcn.git
   ```


!!! tip "Star the Repository"

    Help spread the word, star the Github-Repo. This helps make the project more visible to other developers who might benefit from it.


## Project Structure

The project follows a specific structure to maintain compatibility with MkDocs Material while providing enhanced features:

```bash
your-project/
├── mkdocs/              # Your documentation root
│   ├── mkdocs.yml      # MkDocs configuration file
│   └── docs/           # Documentation markdown files
│       └── **/*.md     # Markdown files in any subdirectory
├── components/         # React components
├── lib/               # Utility functions
└── public/            # Public assets
```

## Adding Your Documentation


This project is designed as a drop-in replacement for MkDocs Material. You can take any existing MkDocs Material project and:

1. Copy your existing `mkdocs.yml` into the `mkdocs` directory
2. Copy your markdown files into the `mkdocs/docs` directory
3. Run the development server

Everything should work as expected, with the added benefits of Next.js performance and modern features.


!!! note "Forward Drop-In"
   The initial idea of mkdocs-shadcn is a forward drop-in compatibility. The project was created because a large MkDocs Material site needed additional features, which couldn't be accomplished with a static page. This is where mkdocs-shadcn shines, but of course, you can also use it to start a completely fresh documentation, ebook, blog, or whatever you you want.


## Starting from Scratch

If you don't have an existing MkDocs installation, you can start with this basic configuration. Create a `mkdocs.yml` file in the `mkdocs` folder with this content:

```yaml
site_name: Your Site Name
site_description: Your site description
site_author: Your Name

nav:
  - "Home": "/"
  - "Getting Started": "getting-started.md"
```

This minimal configuration includes:
- Basic site information
- A simple navigation structure
- A home page and a getting started page

You can then create your markdown files in the `mkdocs` folder:
1. Create `index.md` for your home page
2. Create `getting-started.md` for your getting started guide

As your documentation grows, you can expand the `nav` section to organize your content into sections:

```yaml
nav:
  - "Home": "/"
  - "Guide":
      - "Getting Started": "guide/getting-started.md"
      - "Configuration": "guide/configuration.md"
  - "Reference":
      - "API": "reference/api.md"
      - "Components": "reference/components.md"
```


1. Create the basic directory structure:

```bash
mkdir -p mkdocs/docs
```

2. Place your `mkdocs.yml` file in the `mkdocs` directory.

3. Place all your markdown files in the `mkdocs/docs` directory, maintaining your desired structure.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see your documentation site.






## Staying Up to Date

To keep your fork updated with the latest changes from the main repository:

1. Fetch the latest changes from upstream:
   ```bash
   git fetch upstream
   ```

2. Merge the changes into your main branch:
   ```bash
   git checkout main
   git merge upstream/main
   ```

## Contributing Back

We welcome contributions! If you've made improvements or fixed bugs:

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, commit them, and push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request from your fork to the main repository through GitHub.

This workflow allows you to maintain your own version while also contributing back to the main project when you make improvements that could benefit everyone.

