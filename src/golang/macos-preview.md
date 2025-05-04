---
title: macOS - Preview Handlers
draft: false
---

# 💨 *Go!*

> **Fun Fact**: Use the command `install` to create your binary, the compiler will drop the final executable on your `GOPATH` -> no need for custom aliases now!
>> **AND** the final path can be edited to install in `GOBIN` -> `go env -w GOBIN` <- just modify the global golang environment.

---

# Preview Handler For macOS
Creating a macOS preview handler for HTML documents involves extending your existing Go script to function as an app capable of opening and rendering HTML files, including those generated from Markdown with embedded CSS and JavaScript.

Here's how you can augment your logic:

### Step 1: Develop the Core Application

Your core application will need to:
- Open HTML files.
- Render them in a window using a GUI library that supports macOS applications.

**Recommended Libraries for GUI Development**:
- **fyne**: A simple, cross-platform UI toolkit written in Go.
- **gioui**: A modern toolkit for building user interfaces with Go.
- **webview**: Allows embedding of web views within your application.

### Step 2: Modify the Existing Script

Your current script converts Markdown to HTML. You'll need to modify it to:
1. Serve as an entry point that loads and displays HTML files instead of just generating them.
2. Implement a GUI using one of the recommended libraries to render the HTML content within a window.

### Step 3: Register Your Application with macOS

To register your Go application as an HTML viewer on macOS:

1. **Info.plist Configuration**:
   - Create or modify the `Info.plist` file in your app bundle to declare that your application can handle HTML files.

2. **Example Info.plist Entry**:

    ```xml
    <key>CFBundleDocumentTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Viewer</string>
            <key>LSHandlerRank</key>
            <string>Owner</string>
            <key>LSItemContentTypes</key>
            <array>
                <string>public.html</string>
                <string>public.xhtml+xml</string>
            </array>
        </dict>
    </array>
    ```

3. **Bundle the Application**:
   - Package your application in a macOS `.app` bundle structure, ensuring that your executable and resources are correctly placed.

### Step 4: Implement HTML Rendering

- Use a library like `webview` to embed a web view within your GUI where you can load and display HTML content. This allows leveraging the powerful rendering capabilities of WebKit (used in Safari) or similar engines.

### Step 5: Testing and Distribution

1. **Testing**:
   - Test by opening various HTML files with your app to ensure it correctly renders them, including those generated from Markdown.

2. **Distribution**:
   - Consider signing your application if distributing outside the Mac App Store for security reasons.
   - Follow Apple’s guidelines if you plan to distribute through the App Store.

### Example Code Snippet Using `webview`

Here's a basic example using `webview`:

```go
package main

import (
	"github.com/webview/webview"
)

func main() {
	debug := false // set to true for debug mode
	width, height := 800, 600
	view := webview.New(debug, "HTML Viewer", width, height)
	defer view.Destroy()

	htmlContent := `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Document</title>
	    <style>
	        body { font-family: Arial, sans-serif; }
	    </style>
	</head>
	<body>
	    <h1>Hello, World!</h1>
	    <script>alert("This is a test JavaScript alert!")</script>
	</body>
	</html>`

	view.SetTitle("HTML Viewer")
	view.SetSize(width, height)
	view.SetHtml(htmlContent)

	webview.Run()
}
```

### Conclusion

By following these steps and using appropriate libraries, you can transform your Markdown-to-HTML script into a macOS preview handler for HTML documents. This approach allows users to open and view HTML files directly with your application, including those generated from Markdown with embedded CSS and JavaScript.
