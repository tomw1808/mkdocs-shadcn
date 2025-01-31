# Code

MkDocs-Shadcn provides syntax highlighting and code block enhancements using [Code Hike](https://codehike.org/).

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

Code Hike uses its own syntax highlighter that supports a wide range of programming languages. The highlighting is based on GitHub themes and automatically adapts to light and dark modes.

### Copy to Clipboard

Every code block includes a "Copy" button in the top-right corner. When clicked, it copies the code content to the clipboard and shows a brief confirmation message.

### Line Numbers

Line numbers can be enabled for code blocks. They appear on the left side of the code and are styled to be visually distinct from the code itself.

### Code Annotations

Code Hike allows you to add annotations to your code using special comment syntax:

=== "Code"
    ````markdown
    ```python
    def example():
        # <-- This is an annotation
        print("Hello!")  # <-- Another annotation
    ```
    ````

=== "Result"
    ```python
    def example():
        # <-- This is an annotation
        print("Hello!")  # <-- Another annotation
    ```

### Focus and Highlighting

You can focus on specific parts of your code using focus annotations:

=== "Code"
    ````markdown
    ```python
    def example():
        # focus
        print("This line is focused")
        # focus(end)
        print("This line is not")
    ```
    ````

=== "Result"
    ```python
    def example():
        # focus
        print("This line is focused")
        # focus(end)
        print("This line is not")
    ```

### Code Block Titles

You can add titles to your code blocks using the title attribute:

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

The code highlighting and features are implemented using:

1. Code Hike's built-in syntax highlighter
2. React Server Components for optimal performance
3. Built-in copy-to-clipboard functionality
4. Support for annotations and focus highlighting
5. Automatic theme switching based on system preferences

Code blocks are processed during build time using Code Hike's MDX plugins (`remarkCodeHike` and `recmaCodeHike`), ensuring fast page loads and consistent rendering across all browsers.

For more advanced features and customization options, refer to the [Code Hike documentation](https://codehike.org/docs).
