# LimpBook Architecture

> [!NOTE]
> *For the project's focus*, this will serve as a starting point for brainstorming. Use this document to flesh out considerations for expansion and/or refactoring.

==Let's break down the pros and cons in the context of your Wails app serving documentation and potentially other content==

## Current Approach: Filesystem

> *e.g., `mdbook` output, embedded or served directly*

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

> *e.g., SQLite, PostgreSQL, MySQL*


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

> *e.g., MinIO*

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

### *Performance*

    - For serving static HTML locally, direct filesystem access is likely to be the fastest.
    - If you're doing complex metadata queries *before* serving content, a DB can speed that part up.
    - MinIO is performant for object retrieval but adds the overhead of API calls (even local ones).
    - **The bottleneck in a Wails app is often not raw file I/O but UI rendering or inter-process communication if you're not careful.**

### *Ease of Use (Development & Management)*

    - **Initial:** Filesystem is easiest.
    - **For managing structured data/metadata:** DB is easier once set up.
    - **For managing large blobs/files via API:** Object store is easier.
    - **If you want a Wails UI to manage content:** DB or Object Store (via Go backend) will be significantly easier to build robustly than direct filesystem manipulation.

### *Hot-swapping content*

    - **Filesystem:** Replace files. Simple. For embedded, requires rebuild.
    - **DB:** Update a record (e.g., pointing to a new file or updating text content).
    - **MinIO:** Upload a new object version.
    - All are achievable. The benefit comes from how you *trigger* and *reflect* these changes in the UI.

### *Segmented content sources, manageable from Wails*

    - This is where DBs or Object Stores shine. You can have a 'source' field in a DB, or different buckets/prefixes in MinIO. Your Go backend can then present these to the Wails frontend for management.

## *Recommendations*

1.  **Start Simple (What you're doing):** For `mdbook` content, continue serving it from the filesystem (either directly or embedded). `mdbook build` is your "content update" mechanism. This is fine for now.

2.  **When Metadata & UI Management Becomes Key:**
    - If you want to add rich tagging, categories, or allow users to manage/upload content *through the Wails app interface*, then consider a database.
    - **SQLite** is an excellent first choice for a local Wails app. It's file-based (can be stored in the app's data directory or even bundled if small and read-only), requires no separate server, and Go has great support. You could store Markdown in it, metadata, and even paths to larger HTML files if you don't want to store HTML in the DB.
    - Your Wails Go backend would then query SQLite and serve content dynamically or provide data to the frontend to request specific files.

3.  **When Dealing with Many Large, Potentially Versioned Files Managed Programmatically:**
    - If your scope expands to handling many large, independent HTML/media assets, and especially if you want features like versioning or an S3-compatible API for programmatic access (maybe other tools will feed content into your system), then **MinIO** becomes attractive.
    - You could run MinIO locally for development. For a distributed Wails app, each user wouldn't typically run their own MinIO. MinIO makes more sense if the Wails app is a *client* to a central (or local-but-distinct) MinIO instance.
    - Often, you'd use MinIO for file storage and a separate database (like SQLite or PostgreSQL) to index the metadata of objects in MinIO for faster, more complex querying.

## *Hybrid Approach*

==A very common pattern is...==

- **Object Store (MinIO/S3):** Stores the actual files (HTML, images, PDFs, Markdown source).
- **Database (SQLite/PostgreSQL):** Stores metadata about the files (tags, titles, paths/keys in the object store, permissions, versions, etc.).

> [!WARNING]
> **Considering MinIO for a Desktop Wails App:** -> If your Wails application is purely a desktop app, intended to be self-contained or run by individual users locally, running a separate MinIO server *per user* for that app is generally an anti-pattern unless the app *is* specifically a MinIO client or management tool. However, you *could* use the MinIO Go SDK to interact with a *folder structure on the local disk* as if it were a simplified object store for organizational purposes if you find its API (for putting, getting, listing objects) more convenient than direct `os` package calls, but you wouldn't get the full MinIO server benefits (like versioning managed by the server, true S3 API endpoint).

## Conclusion

- **For your current `mdbook` setup, stick with the filesystem.** It's efficient and simple.
- **As you envision more dynamic management, rich metadata, and UI-driven content updates, introduce SQLite.** It's a lightweight and powerful step up. Store Markdown/HTML content or paths in it, along with metadata.

### Consider...

> MinIO (or a similar object store concept) if:

- You have a very large number of large binary assets.
- You need robust versioning managed by the storage layer.
- You want to build an ecosystem around an S3-compatible API for content ingestion/management from various sources.
- Your Wails app might eventually interact with a *remote* MinIO or S3 instance, and you want local dev parity.

For a Wails app, moving from filesystem to SQLite for content metadata and potentially storing smaller content directly is a very logical and beneficial step when complexity grows. MinIO is a more significant architectural addition, best suited when its specific strengths around object storage at scale and API compatibility are primary drivers.
