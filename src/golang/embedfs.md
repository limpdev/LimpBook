# Elusive Embed

**The `//go:embed` Directive**

This is not standard Go code. It's a "compiler directive."

- `//`: This makes it a comment, so if a Go compiler version _before 1.16_ (when `embed` was introduced) sees this, it just ignores it as a comment.
- `go:embed`: This is the magic part. When a Go 1.16+ compiler sees this specific string in a comment directly preceding a `var` declaration for a `string`, `[]byte`, or `embed.FS` type, it triggers the embedding mechanism.
- `pattern...`: This is the crucial part that tells the compiler _what_ to embed.

**How the `pattern...` Works (The Path is Key!)**

The paths you provide in the `//go:embed` directive are **relative to the directory containing the Go source file where the directive is written.** This is the most common point of confusion.

Let's say your project structure is:

```
myproject/
├── go.mod
├── main.go  <-- Your //go:embed directives are here
└── static/
    ├── css/
    │   ├── docs.css
    │   └── prism.css
    └── documents/
        ├── getting-started.md
        └── install.md
```

If `main.go` contains:

```go
//go:embed static/documents/getting-started.md
var gettingStartedMD string // This is correct

//go:embed /static/documents/getting-started.md // INCORRECT - leading slash implies absolute OS path
var wrongPathMD string

//go:embed ../someotherfolder/file.txt // This would look for 'someotherfolder' SIBLING to 'myproject/'
var outsideProjectMD string
```

**Types of Variables You Can Embed Into:**

1.  **`string`**:

    - Use for embedding a single text file.
    - The file's content is directly loaded into the string variable.
    - Go will ensure it's valid UTF-8; if not, the build will fail.
    - You **do not** typically need `import "embed"` for this.

    ```go
    package main

    //go:embed mytextfile.txt
    var textContent string

    func main() {
    	println(textContent)
    }
    ```

2.  **`[]byte`**:

    - Use for embedding a single binary file (like an image, zip) or a text file if you prefer to handle it as bytes.
    - The file's content is directly loaded into the byte slice.
    - You **do not** typically need `import "embed"` for this.

    ```go
    package main

    import "fmt"

    //go:embed myimage.png
    var imageBytes []byte

    func main() {
    	fmt.Printf("Image size: %d bytes\n", len(imageBytes))
    }
    ```

3.  **`embed.FS`**:

    - This is the most powerful and flexible option, used for embedding:
        - A single file.
        - Multiple specific files.
        - An entire directory (and its subdirectories).
    - You **MUST** `import "embed"` to use `embed.FS`.
    - `embed.FS` implements the `fs.FS` interface (from `io/fs`), which means you can use it with functions that expect a file system, like `http.FS` for serving static files or `fs.ReadFile` to read specific files from the embedded collection.

    ```go
    package main

    import (
    	"embed" // MUST import
    	"fmt"
    	"io/fs"
    	"log"
    	"net/http"
    )

    // Embed a single file into an FS
    //go:embed static/css/docs.css
    var singleFileFS embed.FS

    // Embed multiple specific files into an FS
    //go:embed static/css/docs.css static/css/prism.css
    var multipleFilesFS embed.FS

    // Embed an entire directory (and its subdirectories)
    //go:embed static
    var staticDirFS embed.FS // All files under 'static/' will be available

    // Embed only .css files from static/css
    //go:embed static/css/*.css
    var cssFilesFS embed.FS

    func main() {
    	// --- Using singleFileFS ---
    	// Paths are relative to the embedded item(s)
    	// Since we embedded 'static/css/docs.css', the file within singleFileFS is 'docs.css'
    	// (The leading directories of the embed pattern are stripped for the root of the FS)
    	content, err := singleFileFS.ReadFile("docs.css") // Path within the FS
    	if err != nil {
    		log.Fatalf("Failed to read docs.css from singleFileFS: %v", err)
    	}
    	fmt.Printf("docs.css (from singleFileFS, first 50 bytes): %.50s\n", string(content))

    	// --- Using multipleFilesFS ---
    	content, err = multipleFilesFS.ReadFile("docs.css") // Path within the FS
    	if err != nil {
    		log.Fatalf("Failed to read docs.css from multipleFilesFS: %v", err)
    	}
    	fmt.Printf("docs.css (from multipleFilesFS, first 50 bytes): %.50s\n", string(content))

    	content, err = multipleFilesFS.ReadFile("prism.css") // Path within the FS
    	if err != nil {
    		log.Fatalf("Failed to read prism.css from multipleFilesFS: %v", err)
    	}
    	fmt.Printf("prism.css (from multipleFilesFS, first 50 bytes): %.50s\n", string(content))


    	// --- Using staticDirFS ---
    	// Here, 'static' was the directory embedded.
    	// So, to access 'static/documents/install.md', the path within the FS is 'documents/install.md'.
    	// The embedded directory name itself becomes the root of the embed.FS.
    	installContent, err := staticDirFS.ReadFile("documents/install.md")
    	if err != nil {
    		log.Fatalf("Failed to read install.md from staticDirFS: %v", err)
    	}
    	fmt.Printf("install.md (from staticDirFS, first 50 bytes): %.50s\n", string(installContent))

    	cssContent, err := staticDirFS.ReadFile("css/docs.css")
    	if err != nil {
    		log.Fatalf("Failed to read docs.css from staticDirFS: %v", err)
    	}
    	fmt.Printf("docs.css (from staticDirFS, first 50 bytes): %.50s\n", string(cssContent))

    	// Serve the 'staticDirFS' over HTTP (e.g., at /static/ path)
    	// We need to strip the leading 'static' directory from the requests if we embedded 'static'
    	// but want URLs like /css/docs.css
    	// A common way is to use fs.Sub if your embedded root is deeper.
    	// If we embedded `//go:embed static`, and want to serve `static/css/file.css` as `/css/file.css`
    	subFS, err := fs.Sub(staticDirFS, "css")
    	if err != nil {
    		log.Fatal("could not create sub FS for css:", err)
    	}
    	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.FS(subFS))))

    	// If you embedded `//go:embed static/webfiles` and want to serve them from `/`
    	// webFS, err := fs.Sub(staticDirFS, "webfiles") // Assuming webfiles is inside 'static'
    	// http.Handle("/", http.FileServer(http.FS(webFS)))

    	log.Println("Serving on :8080. Try /css/docs.css (if available and served correctly)")
    	// log.Fatal(http.ListenAndServe(":8080", nil)) // Commented out to let other examples run
    }
    ```

**Pattern Syntax Details:**

- **Single File:** `//go:embed path/to/file.ext`
- **Multiple Files (Space Separated):** `//go:embed file1.txt path/to/image.png assets/logo.svg`
    - All these will be embedded into a single `embed.FS` variable.
- **Wildcards (Globs):** Uses `path.Match` syntax.
    - `*`: Matches any sequence of non-path-separator characters.
    - `?`: Matches any single non-path-separator character.
    - `**`: (Go 1.17+) Matches nested directories. `assets/**` would embed everything under `assets`. `static/**/*.css` would embed all CSS files in `static` and its subdirectories.
    - Example: `//go:embed static/css/*.css` (embeds all CSS files directly in `static/css/`)
    - Example: `//go:embed templates/*` (embeds all files directly in `templates/`)
- **Embedding a Directory:** `//go:embed static`
    - Embeds the `static` directory and all its contents recursively.
    - When you use `fs.ReadFile("some/path/file.txt")` on the `embed.FS` variable, `some/path/file.txt` is relative to the _embedded directory_. So if you embedded `static`, and `static` contains `css/style.css`, you'd read it with `fs.ReadFile("css/style.css")`.

**The `all:` Prefix (Go 1.17+)**

By default, `//go:embed` ignores files and directories that begin with `.` or `_`.
If you need to embed these (e.g., `.env` files, `_layouts` directories for some template engines), use the `all:` prefix:

```go
//go:embed all:static/templates
var templatesWithHiddenFiles embed.FS
```

This will embed all files in `static/templates`, including those starting with `.` or `_`.

**Common Reasons for "File Not Found" or "embed imported and not used":**

1.  **Incorrect Path:**
    - **THE MOST COMMON ISSUE.** Double, triple-check that the path in `//go:embed` is correct _relative to the Go file containing the directive_.
    - Run `ls <path_from_directive>` from the directory of your Go file to verify.
2.  **File Doesn't Exist at Compile Time:** The files must exist when `go build` or `go run` is executed.
3.  **Typos in Filenames or Paths.**
4.  **`embed` Imported but No `embed.FS` Used:** If you `import "embed"` but only embed into `string` or `[]byte`, the `embed` package itself isn't directly used by your code (the compiler handles it), so you'll get "imported and not used." Remove the import if you're not using `embed.FS`. Conversely, if you ARE using `embed.FS` and forget the import, you'll get an "undefined: embed" error.
5.  **The "embed imported and not used" can also be a _symptom_:** If the `//go:embed` directives themselves fail (e.g., file not found), then no embedding happens, the compiler doesn't "use" the `embed` package for `embed.FS` types, and thus reports it as unused. Fix the path issue, and this often resolves itself.
6.  **Go Version:** You need Go 1.16 or later. `**` in globs requires Go 1.17+.

**Limits of `embed`:**

- **Binary Size:** Embedding large assets directly increases your binary size. This is often desirable for single-binary deployments, but be mindful.
- **Compile-Time Only:** Files are embedded at compile time. You can't dynamically change which files are embedded at runtime.
- **Not for Secrets (usually):** While you _can_ embed config files, be cautious about embedding sensitive secrets directly into a binary that might be distributed. Environment variables or dedicated secret management tools are often better.

**Let's Revisit Your Original Code with This Knowledge:**

```go
package main

import (
	"embed" // This is ONLY needed if you use embed.FS
	"log"
	"net/http"

	// ... other imports
)

// Assuming this main.go file is at the ROOT of your project,
// and you have a 'static' directory at the root as well.
// myproject/
// ├── main.go
// └── static/
//     ├── documents/
//     │   ├── getting-started.md
//     │   └── install.md
//     └── css/
//         ├── docs.css
//         └── prism.css

//go:embed static/documents/getting-started.md
var gettingStartedMD string // If path is correct, no 'embed' import needed for this

//go:embed static/documents/install.md
var installMD string // If path is correct, no 'embed' import needed for this

//go:embed static/css/docs.css
var docsCSS string // If path is correct, no 'embed' import needed for this

//go:embed static/css/prism.css
var prismCSS string // If path is correct, no 'embed' import needed for this
```

**If the paths are correct and the files exist there relative to `main.go`:**

1.  You can **remove `import "embed"`** because you are embedding directly into `string` variables, not `embed.FS`.
2.  The "file not found" error means the compiler cannot find `static/documents/getting-started.md` (etc.) _relative to the directory containing your `main.go` file_.

**Troubleshooting Steps for Your Case:**

1.  **Confirm File Locations:**
    - Open your terminal.
    - `cd` into the directory that contains your `main.go` file.
    - Run `ls static/documents/getting-started.md`. Does it show the file?
    - Run `ls static/css/docs.css`. Does it show the file?
    - If these `ls` commands fail, your file structure or the paths in the `//go:embed` directives are incorrect from the perspective of `main.go`.
2.  **Simplify:** Try embedding just one file first.

    ```go
    package main

    // REMOVE: import "embed"

    //go:embed static/css/docs.css
    var testCSS string

    func main() {
        if testCSS == "" {
            println("testCSS is EMPTY - embedding likely failed or file is empty")
        } else {
            println("testCSS embedded successfully! Length:", len(testCSS))
        }
    }
    ```

    Compile and run this. What output do you get?

3.  **Clean Build:** Sometimes, a `go clean -cache` followed by `go build` can help if there's stale build information (rare, but possible).

By systematically checking the paths relative to your Go file, you should be able to pinpoint the issue. `embed` is a fantastic feature once you master this path relativity!
