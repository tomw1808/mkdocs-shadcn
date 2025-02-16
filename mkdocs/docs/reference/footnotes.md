# Footnotes

Footnotes in MkDocs-Shadcn are enabled by default and provide an elegant way to add supplemental information to your content without interrupting the document flow. They are fully compatible with MkDocs Material's footnote syntax while adding interactive tooltips for better user experience.

## Usage

### Adding Footnote References

A footnote reference must be enclosed in square brackets and start with a caret `^`, followed by an identifier:

```markdown
Here's a sentence with a footnote[^1].

You can also use words as identifiers[^note].
```

Which renders as:

Here's a sentence with a footnote[^1].

You can also use words as identifiers[^note].

### Adding Footnote Content

The footnote content must be declared with the same identifier as the reference. It can be placed anywhere in the document and will always be rendered at the bottom of the page.

#### Single Line Footnotes

For short footnotes, write the content on the same line:

```markdown
[^1]: This is a simple footnote.
```

[^1]: This is a simple footnote.

#### Multi-line Footnotes

For longer footnotes, you can write the content across multiple lines, indenting each line with four spaces:

```markdown
[^note]: This is a longer footnote with multiple paragraphs.

    Indent the second paragraph with 4 spaces to include it in the footnote.
```

[^note]: This is a longer footnote with multiple paragraphs.

    Indent the second paragraph with 4 spaces to include it in the footnote.

## Enhanced Features

### Interactive Tooltips

Unlike standard markdown footnotes, MkDocs-Shadcn provides interactive tooltips that show the footnote content when hovering over the reference. This allows readers to see the supplemental information without scrolling to the bottom of the page.

Try hovering over this footnote reference[^tooltip] to see the tooltip in action!

[^tooltip]: Tooltips make footnotes more accessible by showing the content right where you need it.

### Styling

Footnote references are styled to be visually distinct while maintaining readability:
- References use the theme's foreground color
- Underlined to indicate interactivity
- Cursor changes to pointer on hover
- Smooth tooltip animations

## Compatibility

MkDocs-Shadcn footnotes are:
- ✅ Drop-in compatible with MkDocs Material syntax
- ✅ Enabled by default (no configuration needed)
- ✅ Enhanced with interactive tooltips
- ✅ Styled to match your theme
