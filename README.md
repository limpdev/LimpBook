# LimpBook

> [!NOTE]
> All the `docs` I need in one place → **Formatted for usage with `mdbook`**.

Assuming `mdbook` is installed, along with `rust` and `cargo` of course...

#### Building the Docset

```bash
mdbook build
```

- Documentation will be built using specifications from `theme` into `HTML` -> available in the newly created `book` directory. Begin at `/book/index.html`...

---

### Importing Codeblocks

> Preprocessor for mdbook written in Rust!

<details><summary> <i>Codeport Preprocessor</i></summary>

> This is an attempt at implementing a copy-cat of the imported codeblocks found commonly in MDX static site generators.

To implement this for `mdbook`, you'll need to create a custom preprocessor. `mdbook` preprocessors are external programs that `mdbook` invokes. They receive the book's content as JSON on `stdin`, process it, and output the modified book as JSON on `stdout`.

::: hint
Here's how you can build one in Rust (since `mdbook` itself is Rust, it's a natural fit, but you could use Python, Node.js, etc.).
:::

**Project Setup (Rust):**

1.  **Create a new binary crate:**
    ```bash
    cargo new --bin mdbook-code-import
    cd mdbook-code-import
    ```

2.  **Add dependencies to `Cargo.toml`:**
    ```toml
    [package]
    name = "mdbook-code-import"
    version = "0.1.0"
    edition = "2021"

    [dependencies]
    mdbook = "0.4" # Check for the latest version compatible with your mdbook
    serde = { version = "1.0", features = ["derive"] }
    serde_json = "1.0"
    regex = "1"
    pulldown-cmark = "0.9" # For more robust Markdown parsing/manipulation (optional but recommended for complex cases)
    pulldown-cmark-to-cmark = "0.9" # If using pulldown-cmark (optional)
    anyhow = "1.0" # For error handling
    toml = "0.8" # For parsing preprocessor config from book.toml
    ```

**Core Logic (`src/main.rs`):**

```rust
use anyhow::{Context, Result};
use mdbook::book::{Book, Chapter};
use mdbook::preprocess::{Preprocessor, PreprocessorContext};
use regex::Regex;
use std::fs;
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};
use std::process;

// A struct for our preprocessor
pub struct CodeImportPreprocessor;

impl CodeImportPreprocessor {
    pub fn new() -> Self {
        CodeImportPreprocessor
    }
}

impl Preprocessor for CodeImportPreprocessor {
    fn name(&self) -> &str {
        "code-import"
    }

    fn run(&self, ctx: &PreprocessorContext, mut book: Book) -> Result<Book> {
        // It captures:
        // 1. indent: Leading whitespace for the code block
        // 2. lang: The language specifier (e.g., js, rust)
        // 3. filepath: The path to the file to import
        // 4. rest_attrs: Any other attributes on the code block line
        let re = Regex::new(
            r#"(?m)^(?P<indent>\s*)```(?P<lang>[a-zA-Z0-9_.-]*)\s*file="(?P<filepath>[^"]+)"\s*(?P<rest_attrs>[^\n]*)(\r?\n)(?P<orig_content>(?:.|\r?\n)*?)(^\s*```)"#
        ).unwrap();

        // Get the source directory of the book
        let src_dir = ctx.root.join(ctx.config.book.src.as_path());

        book.for_each_mut(|item| {
            if let mdbook::book::BookItem::Chapter(chapter) = item {
                // Clone chapter.path before passing it to process_chapter.
                // chapter.path is Option<PathBuf>, which is Clone.
                // chapter_path_clone will be an owned Option<PathBuf>.
                let chapter_path_clone = chapter.path.clone();

                // Now, pass a reference to the cloned path.
                // `chapter` is still &mut Chapter.
                // `&chapter_path_clone` is &Option<PathBuf> but refers to independent data.
                if let Err(e) = process_chapter(chapter, &re, &src_dir, &chapter_path_clone) {
                    // Accessing chapter.name here is fine because the mutable borrow
                    // by process_chapter has ended. chapter.name creates a temporary
                    // immutable borrow.
                    eprintln!(
                        "Error processing chapter '{}': {}",
                        chapter.name, e
                    );
                }
            }
        });

        Ok(book)
    }

    fn supports_renderer(&self, renderer: &str) -> bool {
        renderer == "html" || renderer == "markdown" // Support HTML and Markdown renderers
    }
}

fn process_chapter(
    chapter: &mut Chapter,
    re: &Regex,
    book_src_dir: &Path,
    chapter_file_path_rel_to_src: &Option<PathBuf>,
) -> Result<()> {
    let original_content = chapter.content.clone();

    // Use replace_all to find all occurrences and replace them
    let new_content = re.replace_all(&original_content, |caps: &regex::Captures| {
        let indent = caps.name("indent").map_or("", |m| m.as_str());
        let lang = caps.name("lang").map_or("", |m| m.as_str());
        let file_attr_path_str = caps.name("filepath").unwrap().as_str();
        let rest_attrs = caps.name("rest_attrs").map_or("", |m| m.as_str());

        let file_attr_path = PathBuf::from(file_attr_path_str);

        // Determine the base path for resolving the file_attr_path
        // Priority:
        // 1. Absolute path: Use as is.
        // 2. Relative path: Resolve relative to the current chapter's directory.
        //    If chapter path is None (e.g. virtual chapter), resolve relative to src_dir.
        let path_to_load = if file_attr_path.is_absolute() {
            file_attr_path
        } else {
            let chapter_dir = chapter_file_path_rel_to_src
                .as_ref()
                .and_then(|p| p.parent())
                .unwrap_or_else(|| Path::new("")); // fallback to src root if no parent (e.g. top-level file)

            book_src_dir.join(chapter_dir).join(&file_attr_path)
        };

        // Attempt to canonicalize to resolve `../` etc. and get a clean path
        let canonical_path = match path_to_load.canonicalize() {
            Ok(p) => p,
            Err(e) => {
                eprintln!(
                    "Warning: Could not canonicalize path '{}' (resolved from '{}'): {}. Using non-canonical path.",
                    path_to_load.display(), file_attr_path_str, e
                );
                path_to_load // Fallback to the non-canonicalized path
            }
        };

        match fs::read_to_string(&canonical_path) {
            Ok(file_content) => {
                // Indent each line of the imported content
                let indented_file_content = file_content
                    .lines()
                    .map(|line| format!("{}{}", indent, line))
                    .collect::<Vec<String>>()
                    .join("\n");

                format!(
                    "{}```{} {}\n{}\n{}```",
                    indent,
                    lang,
                    rest_attrs.trim(),
                    indented_file_content, // Already has newlines between lines
                    indent
                )
            }
            Err(e) => {
                eprintln!(
                    "Error: Code import preprocessor failed to read file '{}' (resolved from '{}'): {}",
                    canonical_path.display(), file_attr_path_str, e
                );
                // Return a block with an error message
                format!(
                    "{}```text\n[Error: Could not load file: {} - {}]\n{}```",
                    indent, file_attr_path_str, e, indent
                )
            }
        }
    });

    chapter.content = new_content.into_owned();
    Ok(())
}


fn main() -> Result<()> {
    let preprocessor = CodeImportPreprocessor::new();

    // Check if mdbook is calling us as a preprocessor or just to check support
    if let Some(arg1) = std::env::args().nth(1) {
        if arg1 == "supports" {
            let renderer = std::env::args().nth(2)
                .context("Renderer argument not provided for 'supports' command")?;
            if preprocessor.supports_renderer(&renderer) {
                process::exit(0);
            } else {
                eprintln!("Preprocessor {} does not support renderer {}", preprocessor.name(), renderer);
                process::exit(1);
            }
        }
    }

    // Standard preprocessor execution: read from stdin, write to stdout
    let (ctx, book) = mdbook::preprocess::CmdPreprocessor::parse_input(io::stdin())?;

    // Check if this renderer is supported before running the heavy logic
    // This is also handled by the `supports` command, but good to double-check.
    if !preprocessor.supports_renderer(&ctx.renderer) {
        eprintln!(
            "Warning: Preprocessor {} does not support renderer {}. Passing through.",
            preprocessor.name(),
            &ctx.renderer
        );
        // Passthrough if not supported, outputting the original book
        serde_json::to_writer(io::stdout(), &book)?;
        return Ok(());
    }

    let processed_book = preprocessor.run(&ctx, book)?;
    serde_json::to_writer(io::stdout(), &processed_book)?;

    Ok(())
}
```

**Explanation:**

1.  **`CodeImportPreprocessor` struct:** Implements the `mdbook::preprocess::Preprocessor` trait.
    *   `name()`: Returns the name of your preprocessor. This is used in `book.toml`.
    *   `run()`: This is the main logic. It iterates through each item in the book. If it's a `Chapter`, it calls `process_chapter`.
    *   `supports_renderer()`: Tells `mdbook` which output formats this preprocessor works with. "html" is the most common.

2.  **`process_chapter()` function:**
    *   Takes a mutable reference to a `Chapter`, the compiled `Regex`, the book's `src_dir` path, and the chapter's own file path (relative to `src_dir`).
    *   **Regex:** The regex `r#"(?m)^(?P<indent>\s*)```(?P<lang>[a-zA-Z0-9_.-]*)\s*file="(?P<filepath>[^"]+)"\s*(?P<rest_attrs>[^\n]*)(\r?\n)(?P<orig_content>(?:.|\r?\n)*?)(^\s*```)"#` is crucial:
        *   `(?m)`: Multiline mode (so `^` matches start of line).
        *   `^(?P<indent>\s*)```: Matches the start of a line, optional indent, then ```.
        *   `(?P<lang>[a-zA-Z0-9_.-]*)`: Captures the language (e.g., `js`, `rust`). Allows letters, numbers, `_`, `.`, `-`.
        *   `\s*file="(?P<filepath>[^"]+)"`: Captures the `file="path/to/file.js"` part.
        *   `\s*(?P<rest_attrs>[^\n]*)`: Captures any other attributes on the line (e.g., `linenumbers`, `highlight_lines`).
        *   `(\r?\n)`: Matches the newline after the opening fence.
        *   `(?P<orig_content>(?:.|\r?\n)*?)`: Non-greedy match for the original content of the code block. This is important because the file import will *replace* this.
        *   `(^\s*```)`: Matches the closing fence on its own line (potentially indented).
    *   **Path Resolution:**
        *   It gets the `file="..."` attribute.
        *   If the path is absolute, it's used directly.
        *   If relative, it's resolved relative to the directory containing the current Markdown file. If the chapter doesn't have a path (e.g., virtual chapters, or perhaps `SUMMARY.md` if you were to process it directly, though typically you wouldn't), it falls back to the book's `src` directory.
        *   `canonicalize()` is used to clean up the path (e.g., resolve `../`).
    *   **File Reading & Replacement:**
        *   `fs::read_to_string()` reads the content of the specified file.
        *   The original code block (including its fences and any content it might have had) is replaced with:
            *   The original opening fence (` ```lang rest_attrs `).
            *   The content of the imported file (with each line indented by the original block's indent).
            *   The original closing fence (` ``` `).
    *   **Error Handling:** If a file can't be read, an error message is printed to `stderr` (visible during `mdbook build`), and a placeholder error message is inserted into the code block in the book.

3.  **`main()` function:**
    *   Handles the command-line interface `mdbook` expects.
    *   `mdbook build` will first call your preprocessor with the `supports <renderer_name>` argument. If it exits with `0`, `mdbook` then calls it again without arguments, piping the book JSON to its `stdin`.
    *   It parses the input JSON, runs the preprocessor logic, and then serializes the modified book back to `stdout`.

**How to Use:**

1.  **Build the preprocessor:**
    ```bash
    cargo build # or cargo build --release for a release version
    ```
    This will create an executable at `target/debug/mdbook-code-import` (or `target/release/mdbook-code-import`).

2.  **Configure `mdbook` (`book.toml`):**
    Add the preprocessor to your `book.toml` file. Make sure the command points to the compiled executable.

    ```toml
    [book]
    title = "My Awesome Book"
    authors = ["Your Name"]
    language = "en"
    multilingual = false
    src = "src"

    [preprocessor.code-import]
    command = "path/to/your/target/debug/mdbook-code-import" # Or target/release/
    # Or if it's in your PATH:
    # command = "mdbook-code-import"
    ```
    Replace `path/to/your/target/...` with the actual path to your compiled binary. If you install it somewhere in your system's `PATH`, you can just use the binary name.

3.  **Write your Markdown:**
    In your `.md` files (e.g., `src/chapter1.md`):

    ```markdown
    # My Chapter

    Here's some JavaScript code from an external file:

    ```js file="path/to/your/code.js" linenumbers
    ```

    And some Rust code:

    ```rust file="../examples/another_code.rs"
    ```
    The `path/to/your/code.js` should be relative to `chapter1.md` (or absolute if you use an absolute path in the `file` attribute).
    For example, if `chapter1.md` is in `src/intro/chapter1.md`, and your code is in `src/assets/code.js`, then you'd use `file="../assets/code.js"`.

4.  **Build your book:**
    ```bash
    mdbook build
    ```
    Check the `book/` directory (or your configured output directory) for the generated HTML. The code blocks should now contain the content from the specified files.

This preprocessor provides a solid foundation. You could extend it further, for example, to support importing specific line ranges or regions from files, similar to `rustdoc` or other advanced tools.

</details>
