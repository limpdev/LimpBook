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
