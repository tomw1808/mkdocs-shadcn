# Images

MkDocs-Shadcn provides enhanced image handling with automatic lightbox functionality and gallery support.

## Basic Images

Regular markdown images work as expected:

```markdown
![Alt text](image.png)
```

These images are automatically optimized using Next.js Image component and properly served from the public directory.

## Lightbox Gallery

To enable lightbox functionality for an image, use double exclamation marks:

```markdown
!![Alt text](image.png)
```

All images marked with double exclamation marks on a page are automatically collected into a gallery. When you click any of these images:

1. The image opens in a lightbox overlay
2. You can navigate through all gallery images using arrow keys or buttons
3. The lightbox can be closed by clicking outside or pressing ESC

## How It Works

The image handling system consists of several components:

1. A markdown preprocessor that detects special image syntax (`!![]()`)
2. A `LightboxImage` component that handles individual images
3. A `GalleryProvider` that manages the collection of images
4. A `LightboxGallery` component that displays the images in an overlay

## Image Processing

Local images referenced in markdown files are:

1. Automatically copied to the public directory
2. Optimized using Next.js Image component
3. Served with proper caching headers
4. Rendered with proper width and height attributes

## Example

Here's an example using both regular and lightbox images:

```markdown
# My Page

Regular image:
![A regular image](regular.png)

Lightbox enabled image:
!![Click me to open in lightbox](lightbox.png)
!![Another gallery image](gallery.png)
```

The lightbox-enabled images will be part of the same gallery and can be navigated through when opened.
