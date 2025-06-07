# LimpBook Architecture

<details><summary>📦<i>Questions over the Wails project's focus</i></summary>

> [!NOTE] > _For the project's focus_, this will serve as a starting point for brainstorming. Use this document to flesh out considerations for expansion and/or refactoring.

==Let's break down the pros and cons in the context of your Wails app serving documentation and potentially other content==

## Current Approach: Filesystem

> _e.g., `mdbook` output, embedded or served directly_

### Pros

    - **Simplicity:** Dead simple for static content. `mdbook build` generates it, Wails serves it.
    - **Performance (for local static files):** Very fast. Direct file access is hard to beat for speed when files are local.
    - **Zero additional dependencies (if embedded):** If you `embed.FS` the `mdbook` output, it's all in one binary.
    - **Easy `mdbook` integration:** `mdbook` is designed to output to a filesystem.

### Cons

    - **Management:** Managing a large, deeply nested directory of HTML files can become cumbersome manually.
    - **Metadata:** No inherent way to store rich metadata (tags, authors, versions, custom fields) associated with content beyond what's in the HTML or implied by folder structure.
    - **Search:** Limited to frontend search indexing all HTML content, or very basic filename searches. No powerful backend querying.
    - **"Hot-swapping" / Dynamic Updates:** Replacing files on the filesystem is the "hot-swap." For embedded assets, you'd need to rebuild the app. If serving from disk, you might need to signal a refresh or handle caching.
    - **Granular Access/Segmentation:** While you can use different directories, managing this programmatically or through a UI becomes custom logic built on top of file operations.
    - **No API for Management:** If you want your Wails app to *manage* the content (upload new docs, edit metadata, etc.), directly manipulating the filesystem from the app is possible but can be clunky and error-prone, especially with embedded assets.

## Introducing a Database System

> _e.g., SQLite, PostgreSQL, MySQL_

### Pros

    - **Structured Metadata:** Excellent for storing and querying rich metadata about your content. You could store the Markdown source, compiled HTML, or just paths to files along with tags, categories, update timestamps, etc.
    - **Powerful Querying:** SQL allows complex searches and filtering based on metadata. "Show me all documents tagged 'Go' updated last week."
    - **Transactional Updates:** Safer updates to content and metadata.
    - **Centralized Management:** Easier to build a UI in Wails to manage content entries.
    - **Relations:** Can define relationships between content pieces.

### Cons

    - **Increased Complexity:** Adds another layer to your application. You need to manage the DB schema, connections, and ORM/query logic.
    - **Serving Files:** Databases aren't always the most efficient way to serve large binary blobs (like full HTML files or images if you stored them directly). Often, you store metadata in the DB and the files themselves on a filesystem or object store, with the DB holding the path.
    - **Overhead:** Even a lightweight DB like SQLite adds some overhead.

## Object Store

> _e.g., MinIO_

### Pros

    - **Scalability for Files:** Designed to store and retrieve large numbers of files (objects) efficiently.
    - **Metadata:** S3-compatible stores like MinIO allow custom metadata per object (though querying this metadata across many objects can be less flexible than a dedicated DB).
    - **Versioning:** Many object stores offer built-in versioning, which is great for "hot-swapping" or rolling back.
    - **API-driven:** Designed to be interacted with via an API (S3 API). This makes it easier for your Wails app (the Go backend part) to programmatically upload, download, and manage content.
    - **Decoupling:** Content storage is decoupled from your application logic.
    - **"Hot-swapping":** Uploading a new version of an object is a natural operation. Your app can then be notified or check for new versions.
    - **Segmented Content:** Buckets and prefixes/folders in MinIO provide natural segmentation.

### Cons

    - **Additional Service:** MinIO is a separate server process you'd need to run (either locally for development/local app, or on a server). This adds to deployment/setup complexity for a desktop app.
    - **Search/Querying:** While metadata exists, complex querying across metadata of *all* objects is not as powerful or direct as a SQL database. You often use it in conjunction with a database that indexes this metadata.
    - **Eventual Consistency (for some cloud S3, less so for local MinIO):** Not usually an issue for single-node local MinIO, but something to be aware of with distributed object stores.
    - **Local App Context:** For a purely local Wails app that a user runs on their desktop, running a *separate MinIO server instance just for that app* might be overkill unless the benefits are substantial.

## Significant Benefits?

### _Performance_

    - For serving static HTML locally, direct filesystem access is likely to be the fastest.
    - If you're doing complex metadata queries *before* serving content, a DB can speed that part up.
    - MinIO is performant for object retrieval but adds the overhead of API calls (even local ones).
    - **The bottleneck in a Wails app is often not raw file I/O but UI rendering or inter-process communication if you're not careful.**

### _Ease of Use (Development & Management)_

    - **Initial:** Filesystem is easiest.
    - **For managing structured data/metadata:** DB is easier once set up.
    - **For managing large blobs/files via API:** Object store is easier.
    - **If you want a Wails UI to manage content:** DB or Object Store (via Go backend) will be significantly easier to build robustly than direct filesystem manipulation.

### _Hot-swapping content_

    - **Filesystem:** Replace files. Simple. For embedded, requires rebuild.
    - **DB:** Update a record (e.g., pointing to a new file or updating text content).
    - **MinIO:** Upload a new object version.
    - All are achievable. The benefit comes from how you *trigger* and *reflect* these changes in the UI.

### _Segmented content sources, manageable from Wails_

    - This is where DBs or Object Stores shine. You can have a 'source' field in a DB, or different buckets/prefixes in MinIO. Your Go backend can then present these to the Wails frontend for management.

## _Recommendations_

1.  **Start Simple (What you're doing):** For `mdbook` content, continue serving it from the filesystem (either directly or embedded). `mdbook build` is your "content update" mechanism. This is fine for now.

2.  **When Metadata & UI Management Becomes Key:**

    - If you want to add rich tagging, categories, or allow users to manage/upload content _through the Wails app interface_, then consider a database.
    - **SQLite** is an excellent first choice for a local Wails app. It's file-based (can be stored in the app's data directory or even bundled if small and read-only), requires no separate server, and Go has great support. You could store Markdown in it, metadata, and even paths to larger HTML files if you don't want to store HTML in the DB.
    - Your Wails Go backend would then query SQLite and serve content dynamically or provide data to the frontend to request specific files.

3.  **When Dealing with Many Large, Potentially Versioned Files Managed Programmatically:**
    - If your scope expands to handling many large, independent HTML/media assets, and especially if you want features like versioning or an S3-compatible API for programmatic access (maybe other tools will feed content into your system), then **MinIO** becomes attractive.
    - You could run MinIO locally for development. For a distributed Wails app, each user wouldn't typically run their own MinIO. MinIO makes more sense if the Wails app is a _client_ to a central (or local-but-distinct) MinIO instance.
    - Often, you'd use MinIO for file storage and a separate database (like SQLite or PostgreSQL) to index the metadata of objects in MinIO for faster, more complex querying.

## _Hybrid Approach_

==A very common pattern is...==

- **Object Store (MinIO/S3):** Stores the actual files (HTML, images, PDFs, Markdown source).
- **Database (SQLite/PostgreSQL):** Stores metadata about the files (tags, titles, paths/keys in the object store, permissions, versions, etc.).

> [!WARNING] > **Considering MinIO for a Desktop Wails App:** -> If your Wails application is purely a desktop app, intended to be self-contained or run by individual users locally, running a separate MinIO server _per user_ for that app is generally an anti-pattern unless the app _is_ specifically a MinIO client or management tool. However, you _could_ use the MinIO Go SDK to interact with a _folder structure on the local disk_ as if it were a simplified object store for organizational purposes if you find its API (for putting, getting, listing objects) more convenient than direct `os` package calls, but you wouldn't get the full MinIO server benefits (like versioning managed by the server, true S3 API endpoint).

## Conclusion

- **For your current `mdbook` setup, stick with the filesystem.** It's efficient and simple.
- **As you envision more dynamic management, rich metadata, and UI-driven content updates, introduce SQLite.** It's a lightweight and powerful step up. Store Markdown/HTML content or paths in it, along with metadata.

### Consider...

> MinIO (or a similar object store concept) if:

- You have a very large number of large binary assets.
- You need robust versioning managed by the storage layer.
- You want to build an ecosystem around an S3-compatible API for content ingestion/management from various sources.
- Your Wails app might eventually interact with a _remote_ MinIO or S3 instance, and you want local dev parity.

For a Wails app, moving from filesystem to SQLite for content metadata and potentially storing smaller content directly is a very logical and beneficial step when complexity grows. MinIO is a more significant architectural addition, best suited when its specific strengths around object storage at scale and API compatibility are primary drivers.

</details>

---

That's an ambitious and interesting idea! `mdbook` is fantastic for its simplicity and speed in generating standard Markdown-based documentation. Integrating MDX, which brings React components into Markdown, would indeed push it towards the capabilities of tools like Docusaurus or Astro.

The core challenge is that `mdbook` is a Rust application that processes Markdown directly into HTML, while MDX is a JavaScript/Node.js ecosystem tool that preprocesses `.mdx` files into JavaScript modules (typically React components), which are then rendered to HTML (often server-side, then hydrated client-side).

Here's how you _could_ approach this, along with the significant complexities involved:

**The Most Viable (but Complex) Approach: Using an `mdbook` Preprocessor**

`mdbook` has a preprocessor interface. A preprocessor is an external program that `mdbook` calls. It receives the book's content as JSON, can modify it, and then returns the modified JSON to `mdbook` for final rendering.

Here's a conceptual breakdown:

1.  **Create a Node.js-based Preprocessor:**

    - This preprocessor would be a separate script/program (e.g., a Node.js script).
    - When `mdbook` invokes it, it would iterate through chapters.
    - For files you designate as MDX (e.g., by a specific extension like `.mdx` or a frontmatter flag), this preprocessor would:
        - **Compile MDX to JS:** Use `@mdx-js/mdx` to compile the MDX content into a JavaScript module that exports a React component.
        - **Server-Side Render (SSR) the Component:** Use `react-dom/server` (`renderToString` or `renderToStaticMarkup`) to render this React component to an HTML string.
        - **Replace MDX content with HTML:** The preprocessor would replace the original MDX content of the chapter with this generated HTML string.
        - **Manage Assets (JS/CSS):** This is the trickiest part. The React components will likely need client-side JavaScript for interactivity (hydration) and CSS.
            - Your preprocessor would need to run a bundler (like Webpack, Rollup, or Vite) on the fly or as a separate build step to create JavaScript bundles for your MDX components.
            - These bundles would need to be placed somewhere `mdbook` can serve them (e.g., in the `theme` directory or a custom assets directory `mdbook` is configured to copy).
            - The generated HTML (or `mdbook`'s theme) would need `<script>` tags to load React, ReactDOM, and your component bundles.

2.  **Configure `mdbook` to Use the Preprocessor:**
    In your `book.toml`:

    ```toml
    [preprocessor.mdx-handler]
    command = "node ./path/to/your/mdx-preprocessor.js"
    # Or if you package it as an executable:
    # command = "./path/to/your/mdx-preprocessor-binary"
    ```

3.  **Client-Side Hydration:**
    - The HTML generated by your preprocessor for MDX components will be static.
    - To make React components interactive, you'll need client-side JavaScript to "hydrate" them.
    - This involves:
        - Ensuring React and ReactDOM are loaded on the page.
        - Having a small script that finds the server-rendered React roots and calls `ReactDOM.hydrateRoot()` on them with the appropriate component.
        - Your bundler (Webpack/Vite) would be responsible for creating these client-side bundles.

**Workflow for the Preprocessor Script (Conceptual Node.js):**

```javascript
// mdx-preprocessor.js (Simplified)
const fs = require("fs-extra");
const path = require("path");
const { compile } = require("@mdx-js/mdx");
const React = require("react");
const { renderToString } = require("react-dom/server");
const { run } = require("@mdx-js/esbuild"); // Or use Babel/Webpack for transpilation

async function processMdxFile(filePath, components) {
    const mdxContent = await fs.readFile(filePath, "utf8");

    // 1. Compile MDX to JS
    const jsCode = String(
        await compile(mdxContent, {
            // MDX options, e.g., remark/rehype plugins
        }),
    );

    // 2. Convert JS code to a renderable React component
    // This is the most complex part: you need to evaluate this JS code
    // in a context where 'React' and your custom components are available.
    // @mdx-js/esbuild or similar can help here, or a more involved Babel setup.
    // For simplicity, let's assume you have a way to get the component.
    // A common pattern is to write the compiled JS to a temp file, then require() it.
    // Or use a VM.
    // For this example, let's imagine 'evaluateMdx' does this magic.
    // It would need access to any globally available components.
    const tempFilePath = path.join(__dirname, "temp-mdx-component.js");
    // Hacky way: write to file and require. Proper way involves a build system.
    // The 'jsCode' from compile is an ES module, so direct require might not work without esm or transpilation.
    // Let's assume `run` from `@mdx-js/esbuild` helps us get an executable form.
    const { default: MdxComponent } = await run(jsCode, {
        /* esbuild options */
    });

    // 3. Provide components (if any are globally imported in MDX)
    // const MdxContent = mdxComponentFunction({ components: { MyButton, ... } });
    const html = renderToString(React.createElement(MdxComponent, { components }));

    return html;
}

// Main preprocessor logic (called by mdbook)
if (process.argv[2] === "supports" && process.argv[3] === "html") {
    // Check renderer support
    process.exit(0);
}

let rawBook = "";
process.stdin.on("data", (chunk) => (rawBook += chunk));
process.stdin.on("end", async () => {
    try {
        const [context, book] = JSON.parse(rawBook);

        // Define your components that MDX files can use
        const MyButton = (props) =>
            React.createElement(
                "button",
                {
                    ...props,
                    onClick: () => console.log("Button clicked (will only work client-side after hydration)"),
                    style: { backgroundColor: "lightblue", padding: "10px" },
                },
                props.children,
            );

        const availableComponents = { MyButton };

        for (const section of book.sections) {
            if (section.Chapter && section.Chapter.content) {
                // Identify MDX content (e.g., by a marker or if you only use .mdx files and rename them)
                // For this example, let's assume if it contains `<MyButton>` it's MDX
                // A better way is to check file extension if mdbook provides it, or use a custom marker.
                // Mdbook doesn't easily give file extensions here, so you might need to process .mdx files
                // and write them as .md files BEFORE mdbook sees them, or use a more complex preprocessor setup.

                // A more robust way: mdbook doesn't give file paths in the preprocessor JSON directly for content.
                // You might need to have a convention:
                // 1. User writes `my-doc.mdx`
                // 2. A *separate script* (run before mdbook) processes `my-doc.mdx` -> `my-doc.md` (containing HTML)
                // OR the preprocessor needs to figure out the original file path based on chapter path.
                // Let's assume the `content` is MDX.
                if (section.Chapter.path && section.Chapter.path.endsWith(".mdx")) {
                    // Hypothetical, path might not be .mdx
                    // This path is the output path, not source. This logic is tricky.
                    // A common strategy is to have your source files be .mdx,
                    // and your preprocessor looks for chapters whose content is placeholder,
                    // then finds the corresponding .mdx file in the src/ dir based on chapter path.
                    // For this PoC, we'll assume the content *is* MDX and process it directly.

                    const chapterPath = section.Chapter.path; // e.g., "my-section/my-page.md"
                    const sourceFilePath = path
                        .join(context.root, context.config.book.src, chapterPath)
                        .replace(/\.md$/, ".mdx"); // Guess original .mdx

                    if (await fs.exists(sourceFilePath)) {
                        console.warn(`Processing ${sourceFilePath} as MDX`);
                        section.Chapter.content = await processMdxFile(sourceFilePath, availableComponents);
                        // You also need to handle asset bundling and injection for client-side JS here
                        // e.g. add <script> tags to the content or mdbook's theme.
                    }
                }
            }
        }
        console.log(JSON.stringify(book));
    } catch (err) {
        console.error("MDX Preprocessor Error:", err);
        process.exit(1);
    }
});
```

**Challenges & Why This is Hard:**

1.  **Build System Integration:** You're essentially building a mini-MDX site generator _inside_ an `mdbook` preprocessor. This means managing Node.js dependencies, a bundler (Webpack/Vite/esbuild/Rollup), Babel/SWC for JSX, etc., all orchestrated by your preprocessor script.
2.  **Asset Management:**
    - Where do the bundled JS/CSS files go? `mdbook` has an `output.html.additional-js` and `additional-css` in `book.toml` for global assets. For per-page/component assets, it's harder.
    - Your preprocessor would need to generate these assets and ensure `mdbook` copies them to the output `book/` directory, and that the HTML includes correct paths to them.
3.  **Client-Side Hydration:** You need a robust way to identify which parts of the page need hydration and ensure the correct React components and props are used. This usually involves embedding props as JSON in a script tag or using `data-` attributes.
4.  **Performance:** Running Node.js, MDX compilation, and potentially a bundler for each MDX file during `mdbook build` could significantly slow down build times.
5.  **Complexity & Maintenance:** This is a non-trivial amount of custom tooling. You're re-implementing parts of what Docusaurus, Astro, or Next.js do.
6.  **Data Flow for Components:** How do components get their props? From MDX frontmatter? Hardcoded? This needs a clear design.
7.  **`mdbook`'s Core Is Markdown:** `mdbook` is optimized for Markdown. Injecting large, complex HTML blobs might work, but features like search indexing might only see the pre-MDX content or not understand the rich HTML structure.
8.  **Developer Experience:** Writing MDX and then having this complex preprocessor run adds layers of abstraction that can be hard to debug.

**Simpler, but Less "MDX-like" Alternatives:**

- **Web Components:** If your goal is reusable UI elements, consider writing them as standard Web Components. You can then include their HTML tags directly in your Markdown. `mdbook` will pass them through. You'd still need to load the Web Component definitions via JavaScript.
- **HTML Includes + Vanilla JS:** `mdbook` preprocessors can be used to include HTML snippets. You could write components as HTML templates and use vanilla JavaScript (or a small library like Alpine.js or htmx) for interactivity. This avoids the React/MDX toolchain.
- **iFrames (Limited Use):** For highly isolated interactive components, you could host them elsewhere (even a simple static HTML page with React) and iframe them into your `mdbook` pages.

**Recommendation:**

While technically possible via a sophisticated preprocessor, integrating full MDX (with React components and hydration) into `mdbook` is a significant engineering effort that "fights the grain" of what `mdbook` is designed for.

- **If you need a few simple interactive elements:** Consider Web Components or HTML includes + vanilla JS/Alpine.js.
- **If rich component-based documentation with React is a core requirement:** You will likely have a much better experience using tools built for this purpose:
    - **Docusaurus:** Excellent for documentation, built with React, supports MDX out of the box.
    - **Astro:** Fantastic for content-heavy sites, allows using components from React, Vue, Svelte, etc., within Markdown/MDX, focusing on shipping minimal JS by default.
    - **Next.js (with `nextra`):** `nextra` is a theme/plugin for Next.js that turns it into a powerful MDX-based documentation generator.
    - **VitePress:** Vue-powered, but very fast and uses Markdown with Vue components.

Building this yourself for `mdbook` is a great learning exercise but be prepared for a deep dive into both `mdbook`'s internals and the MDX/React build tooling. If the goal is productivity and a robust solution, using a framework designed for MDX is often the more pragmatic choice.

---

#  Codeport Preprocessor

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

```
js file="path/to/your/code.js" linenumbers
```

    And some Rust code:

```
rust file="../examples/another_code.rs"
```

    The `path/to/your/code.js` should be relative to `chapter1.md` (or absolute if you use an absolute path in the `file` attribute).
    For example, if `chapter1.md` is in `src/intro/chapter1.md`, and your code is in `src/assets/code.js`, then you'd use `file="../assets/code.js"`.

4.  **Build your book:**
    ```bash
    mdbook build
    ```
    Check the `book/` directory (or your configured output directory) for the generated HTML. The code blocks should now contain the content from the specified files.

This preprocessor provides a solid foundation. You could extend it further, for example, to support importing specific line ranges or regions from files, similar to `rustdoc` or other advanced tools.
