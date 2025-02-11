# Tables

Tables in MkDocs-Shadcn are powered by remark-gfm (GitHub Flavored Markdown) and styled with shadcn/ui components, ensuring backwards compatibility with MkDocs Material's table syntax while providing a modern look.

## Basic Tables

Create tables using the standard Markdown table syntax with pipes and hyphens:

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

Which renders as:

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Column Alignment

You can align columns using colons in the separator line:

- Left alignment (default): `:---`
- Center alignment: `:---:`
- Right alignment: `---:`

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| 1    | 2      | 3     |
| 4    | 5      | 6     |
```

Which renders as:

| Left | Center | Right |
|:-----|:------:|------:|
| 1    | 2      | 3     |
| 4    | 5      | 6     |

## Complex Content

Tables can contain various types of content including:
- Inline code
- Links
- Bold or italic text

Here's an example:

| Feature | Syntax | Description |
|---------|--------|-------------|
| Code | `code` | Inline code blocks |
| **Bold** | `**text**` | Bold text |
| *Italic* | `*text*` | Italic text |
| [Link](/) | `[text](url)` | Hyperlinks |

## Compatibility

All table features from MkDocs Material are supported through remark-gfm, ensuring your existing documentation will work without modifications. The main difference is the modern styling provided by shadcn/ui components.
