# Updating Your Installation

If you've forked the MkDocs-Nextjs-Dropin repository and want to keep it up to date with the latest changes, follow these steps.

## Prerequisites

Ensure you have the upstream repository configured:

```bash
git remote -v
```

If you don't see the upstream repository listed, add it:

```bash
git remote add upstream https://github.com/weisser-dev/mkdocs-nextjs-dropin.git
```

## Update Process

1. Fetch the latest changes from the upstream repository:
   ```bash
   git fetch upstream
   ```

2. Ensure you're on your main branch:
   ```bash
   git checkout main
   ```

3. Merge the upstream changes:
   ```bash
   git merge upstream/main
   ```

4. If there are any conflicts, resolve them in your preferred code editor.

5. Test that everything still works as expected:
   ```bash
   npm run dev
   ```

6. Push the updated main branch to your fork:
   ```bash
   git push origin main
   ```

## Handling Breaking Changes

Sometimes updates might include breaking changes. In these cases:

1. Check the release notes on GitHub for any migration steps
2. Back up your `mkdocs` folder before updating
3. Review the changes in the `mkdocs.yml` configuration file
4. Test your documentation thoroughly after updating

## Troubleshooting

If you encounter issues after updating:

1. Check that your `mkdocs.yml` configuration is compatible with the new version
2. Ensure all dependencies are up to date:
   ```bash
   npm install
   ```
3. Clear your build cache:
   ```bash
   npm run clean
   ```
4. If problems persist, open an issue on GitHub with details about the error
