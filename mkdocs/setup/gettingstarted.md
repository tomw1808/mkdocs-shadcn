# Getting Started

## Supporting the Project

If you find MkDocs-Nextjs-Dropin useful, please consider showing your support by starring the repository on GitHub. This helps make the project more visible to other developers who might benefit from it.

## Initial Setup

1. First, fork the repository on GitHub. This creates your own copy of the project that you can modify and use as needed.

2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/mkdocs-nextjs-dropin.git
   cd mkdocs-nextjs-dropin
   ```

3. Add the original repository as an upstream remote to keep your fork up to date:
   ```bash
   git remote add upstream https://github.com/weisser-dev/mkdocs-nextjs-dropin.git
   ```

## Adding Your Documentation

1. Copy your existing `mkdocs.yml` configuration file to the `mkdocs` folder of this project.
2. Copy all your documentation Markdown (.md) files from your docs folder to the `mkdocs` folder.

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

