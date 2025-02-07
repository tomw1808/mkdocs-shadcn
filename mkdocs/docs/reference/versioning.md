# Documentation Versioning (in planning)

This documentation system supports versioning through a directory-based approach, allowing multiple versions of documentation to coexist and be easily accessible.

## Current Implementation

The versioning system is implemented through:

1. Directory-based version management
2. Version detection in `lib/mkdocs.ts`
3. Version switching UI components
4. Path-aware navigation

### Directory Structure

The system supports two modes:

```
mkdocs/                  # Root documentation directory
├── mkdocs.yml          # Unversioned mode: single version
└── content/...         # Documentation content
```

Or for versioned documentation:

```
mkdocs/                  # Root documentation directory
├── v1.0/               # Version 1.0
│   ├── mkdocs.yml
│   └── content/...
├── v2.0/               # Version 2.0
│   ├── mkdocs.yml
│   └── content/...
└── v3.0/               # Version 3.0
    ├── mkdocs.yml
    └── content/...
```

### Version Detection

The system automatically detects versions by:
1. First checking for an unversioned `mkdocs.yml` in the root
2. If not found, scanning subdirectories for versioned configurations
3. Sorting versions for display (latest first)

### Current Features

- Automatic version detection
- Version switching UI
- Path preservation when switching versions
- Support for both versioned and unversioned modes

## Planned Improvements

The following features are still needed:

1. **Version Persistence**
   - Store the user's version preference
   - Remember last viewed version across sessions

2. **URL Structure**
   - Implement cleaner URL patterns for versions
   - Add version prefix to all URLs
   - Handle version-specific redirects

3. **Version Switcher UI**
   - Add version switcher to mobile navigation
   - Improve version switcher styling
   - Add version badges to content

4. **Navigation Enhancements**
   - Handle missing pages across versions
   - Show version availability in navigation
   - Version-specific search

5. **Content Management**
   - Version-specific assets
   - Shared assets across versions
   - Version-specific configurations

6. **Development Workflow**
   - Tools for version management
   - Version creation helpers
   - Content synchronization between versions

## Implementation Tasks

1. Add version persistence using localStorage
2. Implement URL structure changes:
   ```typescript
   // Example URL handler
   function handleVersionedUrl(path: string, version: string) {
     return version === 'current' ? path : `/${version}${path}`
   }
   ```

3. Enhance version switcher:
   ```typescript
   // Example version badge component
   function VersionBadge({ version }: { version: string }) {
     return <Badge>{version}</Badge>
   }
   ```

4. Add version-aware search:
   ```typescript
   // Example search configuration
   interface SearchConfig {
     version: string
     includePreviousVersions: boolean
   }
   ```

5. Implement content management:
   ```typescript
   // Example asset resolution
   function resolveVersionedAsset(path: string, version: string) {
     // Check version-specific asset first
     // Fall back to shared assets
   }
   ```

## Migration Guide

When implementing versioned documentation:

1. Create version directories
2. Move existing content to appropriate version
3. Update navigation structure
4. Test version switching
5. Verify asset resolution

## Best Practices

1. Keep version numbers consistent
2. Document breaking changes between versions
3. Maintain clear upgrade paths
4. Consider symlinks for shared content
5. Use relative links within versions

## Contributing

To contribute to the versioning system:

1. Check the planned improvements
2. Pick an unimplemented feature
3. Create an implementation plan
4. Submit changes through pull requests
