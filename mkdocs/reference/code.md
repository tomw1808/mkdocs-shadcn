# Code

MkDocs-Shadcn provides syntax highlighting and code block enhancements using [rehype-pretty-code](https://rehype-pretty-code.netlify.app/).

## Basic Usage

Code blocks are created using standard markdown code fence syntax:

=== "code"
    ````markdown
    ```python
    def hello_world():
        print("Hello, World!")
    ```
    ````

=== "result"
    ```python
    def hello_world():
        print("Hello, World!")
    ```



## Features

### Syntax Highlighting

The code blocks automatically support syntax highlighting for a wide range of programming languages. The highlighting uses GitHub's light and dark themes:

- Light theme: github-light
- Dark theme: github-dark-dimmed

### Copy to Clipboard

Every code block includes a "Copy" button that appears when hovering over the code. When clicked, it copies the code content to the clipboard and shows a brief confirmation message.

### Line Numbers

Line numbers are automatically added to code blocks. They appear on the left side of the code and are styled to be visually distinct from the code itself.

### Line Highlighting

You can highlight specific lines by adding a `hl_lines` attribute:

=== "Code"

    ````markdown
    ```python hl_lines="2 3"
    def example():
        # This line is highlighted
        print("This line too")
        # This line is not
    ```
    ````
=== "Result"
    ```python hl_lines="2 3"
    def example():
        # This line is highlighted
        print("This line too")
        # This line is not
    ```

### Code Block Titles

You can add a title to your code blocks:

=== "Code"

    ````markdown
    ```python title="example.py"
    def hello():
        print("Hello!")
    ```
    ````
=== "Result"

    ```python title="example.py"
    def hello():
        print("Hello!")
    ```

## Implementation Details

The code highlighting is implemented using:

1. rehype-pretty-code for syntax highlighting
2. GitHub's light and dark themes for consistent styling
3. Copy-to-clipboard functionality
4. Automatic line number generation
5. Support for line highlighting and block titles

The code blocks are processed during build time, ensuring fast page loads and consistent rendering across all browsers.
