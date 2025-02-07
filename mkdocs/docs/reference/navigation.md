# Navigation System

This documentation site uses a sophisticated navigation system that parses the `mkdocs.yml` file to create both the main navigation bar and the sidebar navigation. Here's how it works:

## Navigation Structure

The navigation is defined in the `mkdocs.yml` file using a hierarchical structure:

```yaml
nav:
  - "Home": "/"
  - "Reference":
      - "First Item": "path/to/first.md"
      - "Section":
          - "Sub Item": "path/to/sub.md"
```

## Main Navigation Bar

The main navigation bar at the top of the page shows root-level sections. For sections with children (like "Reference" or "Learn More..."), it automatically links to the first available page within that section.

For example, if "Reference" contains multiple pages, clicking "Reference" in the main nav will take you to the first page in that section.

### Implementation Details

The main navigation is implemented using two key functions:

1. `getRootNavigation()`: Extracts top-level navigation items
2. `findFirstPath()`: Recursively finds the first available path in a section

The navigation is responsive:
- On desktop: Shows as a horizontal menu
- On mobile: Collapses into a hamburger menu

## Sidebar Navigation

The sidebar shows the full hierarchical navigation structure for the current section. It features:

- Expandable/collapsible sections
- Automatic expansion of the current page's section
- Visual indicators for the active page
- Nested navigation up to multiple levels deep

### Implementation Details

The sidebar uses several key functions:

1. `getFullNavigation()`: Gets the complete navigation tree
2. `buildNavTree()`: Converts the YAML structure into a tree of navigation items
3. `getNavigation()`: Provides previous/next page navigation

## Navigation Components

The navigation system is split into several React components:

- `NavWrapper`: Server component that fetches navigation data
- `Navbar`: Client component for the top navigation bar
- `SideNav`: Client component for the sidebar navigation

This separation allows for:
- Server-side data fetching
- Client-side interactivity
- Optimal performance through React Server Components

## File Structure

The navigation system is implemented across several files:

```
lib/
  mkdocs.ts       # Core navigation parsing logic
components/
  Navbar.tsx      # Main navigation bar
  SideNav.tsx     # Sidebar navigation
  ui/sidebar.tsx  # UI components for sidebar
app/
  nav-wrapper.tsx # Server component wrapper
```

## Adding New Pages

To add new pages to the navigation:

1. Add the page to the `nav` section in `mkdocs.yml`
2. Create the corresponding markdown file
3. The navigation will automatically update to include the new page

The system will automatically:
- Update both main nav and sidebar
- Generate the correct links
- Maintain the navigation hierarchy
