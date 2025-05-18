# autosum

<details><summary><i>...Testing ⇾ `Qwen3-14B-Q4KM`...</i></summary>

> Here's a Python script that automates the writing process for your `SUMMARY.md` file based on the formatting rules implied by your citations. It parses markdown-style bullet points with nested subheaders and generates the appropriate structure in the format expected by `mdbook`.

---

### ✅ **Python Script: Generate `SUMMARY.md` from a list of markdown lines**

```python
import re

class Node:
    def __init__(self, title, path):
        self.title = title
        self.path = path
        self.children = []

def parse_lines(lines):
    """Parse lines into a tree structure with indentation-based hierarchy."""
    root = Node('', '')  # Root node
    stack = [root]  # Stack to keep track of current depth

    for line in lines:
        # Use regex to extract title and path from the markdown link syntax
        match = re.match(r'^\s*-\s*$$(.*?)$$$(.*?\.md)$', line)
        if not match:
            continue  # Skip invalid or non-matching lines

        title, path = match.groups()
        depth = (len(line) - len(line.lstrip())) // 4  # Calculate indentation depth

        # Determine the parent based on current depth
        while len(stack) > depth + 1:  # Ensure we're at the correct depth level
            stack.pop()

        new_node = Node(title, path)
        stack[-1].children.append(new_node)  # Add as child to last node in stack
        stack.append(new_node)  # Push new node for future children

    return root

def generate_summary(root):
    """Generate the SUMMARY.md content recursively from the tree structure."""
    result = []
    for child in root.children:
        result.extend(generate_node(child, 0))
    return ''.join(result)

def generate_node(node, level):
    lines = []
    indent = ' ' * (level * 4)
    line = f"{indent}- [{node.title}]{node.path}\n"
    lines.append(line)

    for child in node.children:
        lines.extend(generate_node(child, level + 1))
    return lines

def main():
    # Example input lines from your citations
    lines = [
        "- [Json No Llm](./python/crawl4ai/content/json-no-llm.md)",
        "    - [Link & Media](./python/crawl4ai/content/link-media.md)",
        "    - [Markdown Generation](./python/crawl4ai/content/markdown-generation.md)",
        "    - [Optimized Multi Url](./python/crawl4ai/content/optimized-multi-url.md)",
        "    - [Overview Advanced](./python/crawl4ai/content/overview-advanced.md)",
        "    - [Page Interaction](./python/crawl4ai/content/page-interaction.md)",
        "    - [Parameters](./python/crawl4ai/content/parameters.md)",
        "    - [Prefix Based Input](./python/crawl4ai/content/prefix-based-input.md)",
        "    - [Preserve Identity](./python/crawl4ai/content/preserve-identity.md)",
        "    - [Reference I](./python/crawl4ai/content/reference-i.md)",
        "    - [Reference II](./python/crawl4ai/content/reference-ii.md)",
        "    - [Reference III](./python/crawl4ai/content/reference-iii.md)",
        "    - [Session](./python/crawl4ai/content/session.md)",
        "    - [Simple Crawl](./python/crawl4ai/content/simple-crawl.md)",
        "    - [Strat Chunking](./python/crawl4ai/content/strat-chunking.md)",
        "    - [Strat Cosine](./python/crawl4ai/content/strat-cosine.md)",
        "- [Getting Started](./python/crawl4ai/content/getting-started.md)",
        "    - [Api Extracts & Chunks](./python/crawl4ai/content/api-extracts-chunks.md)",
        "    - [Async](./python/crawl4ai/content/async.md)",
        # ... add more lines from the other citations
    ]

    root = parse_lines(lines)
    summary_content = generate_summary(root)

    with open("SUMMARY.md", "w") as f:
        f.write(summary_content)
    print("✅ SUMMARY.md file has been generated successfully.")

if __name__ == "__main__":
    main()
```

---

### 🔍 **How It Works**

- The script parses markdown lines using regex to extract the header title and path.
- It builds a tree of `Node` objects based on indentation levels (i.e., how many spaces are used for subheaders).
- Finally, it recursively writes this structure into a valid `SUMMARY.md` file in the format expected by `mdbook`.

---

### 📌 **Usage Notes**

- Replace the example lines with your actual list of markdown links.
- If you're importing lines from another file (e.g., `input.txt`), read them using:

```python
with open("input.txt", "r") as f:
    lines = [line.strip() for line in f.readlines()]
```

Let me know if you'd like a version that reads from an external file or processes your citations automatically.

*↳ comment-response from* **limpdev**: Would I like a version of...? That's what I fucking asked for to begin with, tf? Why in the ==FUCK== would I want it any other way? It took fucking **4 minutes and 38 seconds** of ..'tHiNkInG'.. for you to cook up this bullshit?

</details>

---

## Let's Get Serious

> [!CAUTION]
> This is a comprehensive task due to the specific formatting and ordering in your example `SUMMARY.md`. A purely automatic script based *only* on directory structure will struggle to match your example perfectly because your example implies:

1.  Specific (non-alphabetical/non-numerical) ordering of files and directories.
2.  Custom titles and icons that aren't always derivable from filenames.
3.  Specific "entry files" for directories (e.g., `_intro.md` for `wails.io`, `#TOC.md` for `buildGoApp`).
4.  Sometimes, a file acts as a "header" for subsequent files that are its siblings in the filesystem (e.g., `WailsV3.md` conceptually heads the `wails.io` items; `md_codeblocks.md` heads other `md_*.md` files). This "virtual parent" scenario is the hardest to automate generically.

The script below will:
*   Follow a defined order for top-level sections.
*   Use a configuration dictionary to map directory/file paths to custom titles, icons, and entry files.
*   Recursively scan directories.
*   Sort files and subdirectories naturally (e.g., `1.md`, `2.md`, `10.md`), but allow for a predefined order if specified in the configuration.
*   Use H1 headers for the main link of each top-level section.

You'll need to meticulously populate the `CONFIG` dictionary to match your example. I've pre-filled a significant portion based on your provided `SUMMARY.md` and file tree.

<details><summary><i>  CODE</i></summary>

```python
import os
import re

# --- Configuration ---

SRC_DIR = "src"
OUTPUT_FILE = os.path.join(SRC_DIR, "SUMMARY.md")

# Files/directories to completely ignore
IGNORE_ITEMS = {
    "SUMMARY.md",
    ".DS_Store",
    "dirtree",  # Example: ignore the 'dirtree' directory
}

# Configuration for each top-level section and its items
# Structure:
# "section_dir_name": {
#     "title": "Displayed Title with Icon for the Section Header",
#     "entry_file": "basename_of_entry_file_for_section.md", # Relative to section_dir_name
#     "item_order": ["file1.md", "subdir1", "file2.md"], # Optional: specific order of items
#     "items": { # Optional: specific configs for items within this section
#         "item_basename_or_subdir_name": {
#             "display": "Custom Display Name",
#             "entry_file": "entry.md", # If this item is a directory
#             "is_header_for_siblings": ["sibling1.md", "sibling2.md"] # For "virtual parent"
#         }
#     }
# }
#
# Note on "is_header_for_siblings": This is a complex feature.
# For simplicity, this script will primarily render based on file system hierarchy.
# The "virtual parent" (file acting as header for sibling files) is tricky.
# This initial script will list them as siblings. You might need manual adjustment for those.
# The provided example for WailsV3 and md_codeblocks implies this.
# We will use entry_file for directories and custom display names.

CONFIG = {
    "meta": {
        "title": " META",
        "entry_file": "-readme.md",
        "item_order": ["-readme.md", "GitHubFlavour.md", "MyDesign.md", "Architecture.md", "TOC.md", "DevDocs.md"],
        "items": {
            "-readme.md": {"display": " META"}, # Title of entry_file matches section title
            "GitHubFlavour.md": {"display": " GitHub Markdown"},
            "MyDesign.md": {"display": " My Design"},
            "Architecture.md": {"display": " Architecture"},
            "TOC.md": {"display": " Table of Contents"},
            "DevDocs.md": {"display": " DevDocs"},
        }
    },
    "active-dev": {
        "title": "󰵮 LIVE",
        "entry_file": "zed-dev.md",
        "item_order": ["zed-dev.md", "Snippets.md", "Mojo.md", "devowails.md", "WailsV3.md", "wails.io", "remarkJS"],
        "items": {
            "zed-dev.md": {"display": "󰵮 LIVE"},
            "Snippets.md": {"display": "󱁤 snips"},
            "Mojo.md": {"display": " Mojo"}, # There's also a Mojo.md in python/
            "devowails.md": {"display": "🐳devo-app"},
            "WailsV3.md": {"display": "🐳wailsV3"}, # This is a file
            "wails.io": { # This is a directory
                "entry_file": "_intro.md", # Actual file to link to for "wails.io" dir entry
                                           # The display name for this entry will be taken from _intro.md's config if available
                "item_order": ["_intro.md", "1_getstarted.md", "2_guides.md", "3_references.md", "4_runtime.md", "5_tuts.md", "6_community.md"],
                "items": {
                    "_intro.md": {"display": "Introduction"},
                    "1_getstarted.md": {"display": "Get Started"},
                    "2_guides.md": {"display": "Guides"},
                    "3_references.md": {"display": "References"},
                    "4_runtime.md": {"display": "Runtime"},
                    "5_tuts.md": {"display": "Tutorial"},
                    "6_community.md": {"display": "Community"},
                }
            },
            "remarkJS": { # This is a directory
                "entry_file": "AwesomeRemark.md",
                # "display": " AwesomeRemark", # Display name for the directory entry itself
                "item_order": [
                    "AwesomeRemark.md", "ReMark.md", "re-hype.md", "re-gfm.md", "re-admonitions.md",
                    "re-direct.md", "re-flex-codetitle.md", "re-format.md", "re-highlight.md",
                    "re-hint.md", "re-man.md", "re-mermaid.md", "re-minify.md",
                    "re-stringify.md", "re-tabblocks.md", "re-toc.md"
                ],
                "items": {
                    "AwesomeRemark.md": {"display": " AwesomeRemark"},
                    "ReMark.md": {"display": " ReMark"},
                    "re-hype.md": {"display": " ReHype"},
                    "re-gfm.md": {"display": " GFM"},
                    "re-admonitions.md": {"display": "Admonitions"},
                    "re-direct.md": {"display": "Direct"},
                    "re-flex-codetitle.md": {"display": "Flex-Codetitle"},
                    "re-format.md": {"display": "Format"},
                    "re-highlight.md": {"display": "Highlight"},
                    "re-hint.md": {"display": "Hint"},
                    "re-man.md": {"display": "Manpages"},
                    "re-mermaid.md": {"display": "Mermaid"},
                    "re-minify.md": {"display": "Minify"},
                    "re-stringify.md": {"display": "Stringify"},
                    "re-tabblocks.md": {"display": "Tab Blocks"},
                    "re-toc.md": {"display": "TOC"},
                }
            }
        }
    },
    "web": {
        "title": " WEB AUTOMATION",
        "entry_file": "AutomatingHTML.md",
        # Order is largely alphabetical in example, with md_codeblocks group at the end
        # For simplicity, we'll use natural sort here unless fully specified.
        # The example has a "Docusaurus" group headed by md_codeblocks.md.
        # This script will list md_codeblocks.md, then md_admonitions.md etc. as siblings.
        "items": {
            "AutomatingHTML.md": {"display": " WEB AUTOMATION"},
            "ChooseFile.md": {"display": " Choose File"},
            "base64js.md": {"display": " Base64"},
            "colly.md": {"display": " Colly"}, # Also in golang
            "favicon.md": {"display": " Favicon"},
            "go-katana.md": {"display": " Katana"},
            "hoverJS.md": {"display": " HoverJS"},
            "jsdelivr.md": {"display": " Delivr"},
            "llamacpp-cmd.md": {"display": " LlamaCPP"},
            "lmstudio.md": {"display": "󱁤 LM Studio"},
            "marker.md": {"display": " Marker"}, # Also in python
            "md2pdf.md": {"display": " Markdown2PDF"},
            "ollama-tailscale.md": {"display": " Ollama+Tailscale"},
            "pdftk-java.md": {"display": " PDFTK-Java"},
            "picviewce.md": {"display": " PicviewCE"},
            "rippleclicks.md": {"display": " RippleClicks"},
            "tabmodifier.md": {"display": " TabModifier"},
            "pixiv.md": {"display": " Pixiv"},
            "tailscale.md": {"display": " Tailscale"},
            "tauri-anthropic.md": {"display": " Tauri"}, # One Tauri link
            "uv.md": {"display": " UV"},
            "KaTeX.md": {"display": " KaTeX"}, # Note: case difference from file
            "importjs.md": {"display": " Libraries"}, # File is importjs.md not import-js.md
            "tauri-docs.md": {"display": " Tauri"}, # Another Tauri link
            "unsloth.md": {"display": "Unsloth"},
            "fontforge.md": {"display": "FontForge"},
            "gh-codecopy.md": {"display": "CodeCopy"},
            "css-advanced.md": {"display": "Advanced CSS"},
            "html-selectors.md": {"display": "HTML Selectors"},
            "LocalizeLinks.md": {"display": "Localize Links"},
            "stylings.md": {"display": "Stylings"},
            "TailwindSvelte.md": {"display": "Tailwind + Svelte"},
            "webJS.md": {"display": "WebJS"},
            "PureHTML.md": {"display": "Sanitizing HTML"}, # File is PureHTML.md
            # Grouping for Docusaurus-like features
            "md_codeblocks.md": {"display": " Docusaurus"}, # This is the header for the group
            "md_admonitions.md": {"display": "Admonitions"},
            "md_math.md": {"display": "Math"},
            "md_mermaid.md": {"display": "Mermaid"},
            "md_tabs.md": {"display": "Tabs"},
        },
        "item_order": [ # Approximate order from example, Docusaurus group last
            "AutomatingHTML.md", "ChooseFile.md", "base64js.md", "colly.md", "favicon.md",
            "go-katana.md", "hoverJS.md", "jsdelivr.md", "llamacpp-cmd.md", "lmstudio.md",
            "marker.md", "md2pdf.md", "ollama-tailscale.md", "pdftk-java.md", "picviewce.md",
            "rippleclicks.md", "tabmodifier.md", "pixiv.md", "tailscale.md",
            "tauri-anthropic.md", "uv.md", "KaTeX.md", "importjs.md", "tauri-docs.md",
            "unsloth.md", "fontforge.md", "gh-codecopy.md", "css-advanced.md",
            "html-selectors.md", "LocalizeLinks.md", "stylings.md", "TailwindSvelte.md",
            "webJS.md", "PureHTML.md",
            "md_codeblocks.md", "md_admonitions.md", "md_math.md", "md_mermaid.md", "md_tabs.md"
        ]
    },
    "cli": {
        "title": " COMMANDLINE",
        "entry_file": "vim.md", # Example shows vim.md as first after header
        "items": {
            "vim.md": {"display": " COMMANDLINE"},
            "NvChad.md": {"display": " Nvchad"},
            "ascidoctor.md": {"display": " Ascidoctor"},
            "bat-cli.md": {"display": "󰨊 bat"},
            "curlie.md": {"display": " Curlie"},
            "docling.md": {"display": " Docling"},
            "docling_features.md": {"display": " Docling Features"},
            "docling_usage.md": {"display": " Docling Usage"},
            "fileicon.md": {"display": " Fileicon"},
            "kitty.md": {"display": " Kitty"},
            "mac-cli.md": {"display": " Mac CLI"},
            "marp-cli.md": {"display": " Marp CLI"},
            "mogrify.md": {"display": " Mogrify"},
            "navi.md": {"display": "󰨊 Navi"},
            "nvim.md": {"display": " NVIM"},
            "pandoc.md": {"display": " Pandoc"},
            "pandoc_help.md": {"display": " Pandoc Help"},
            "pandoc_res.md": {"display": " Pandoc Resources"},
            "pretzo.md": {"display": " Pretzo"}, # File is pretzo.md (lowercase)
            "rdfind.md": {"display": " rdfind"},
            "rsvg-convert.md": {"display": " rsvg-convert"},
            "sd-cli.md": {"display": " sd"},
            "spaceship.md": {"display": " Spaceship"},
            "weasy.md": {"display": " WeasyPrint"}, # File is weasy.md
            "katana-cli.md": {"display": " katana"},
            "wget-manual.md": {"display": " Wget Manual"},
            "wget-quickref.md": {"display": " Wget Quickref"},
            "xidel.md": {"display": " Xidel"},
            "yazi-cli.md": {"display": " Yazi"},
            "ytdlp.md": {"display": " YT-DLP"},
            "zedblur.md": {"display": " Zedblur"},
            "zim.md": {"display": " Zim"},
            "zoxide.md": {"display": " Zoxide"},
            "warp_prompt.md": {"display": " Warp Prompt"},
            "Podman.md": {"display": " Podman"},
        }
        # Default sort for items not in item_order
    },
    "golang": {
        "title": " GOLANG",
        "entry_file": "Golang.md",
        "item_order": [ # Approximate order from example
            "Golang.md", "WASM.md", "Context.md", "Concurrency.md", "argparse.md", "colly.md",
            "devitree.md", "go_embed.md", "go_getter.md", "go_html.md", "go_maps.md",
            "go_notation.md", "go_unsafe.md", "goco.md", "gogex.md", "go_bufio.md",
            "macos-preview.md", "golang-notes.md",
            "zenity", "buildGoApp", "gioui.org", "hugodocs"
        ],
        "items": {
            "Golang.md": {"display": " GOLANG"},
            "WASM.md": {"display": "WebAssembly"},
            "Context.md": {"display": "Context"},
            "Concurrency.md": {"display": "Concurrency"},
            "argparse.md": {"display": "Argparse"},
            "colly.md": {"display": "Colly"},
            "devitree.md": {"display": "Devitree"},
            "go_embed.md": {"display": "Embed"},
            "go_getter.md": {"display": "Getter"},
            "go_html.md": {"display": "HTML"},
            "go_maps.md": {"display": "Maps"},
            "go_notation.md": {"display": "Notation"},
            "go_unsafe.md": {"display": "Unsafe"},
            "goco.md": {"display": "Goco"},
            "gogex.md": {"display": "Gogex"},
            "go_bufio.md": {"display": "Bufio"},
            "macos-preview.md": {"display": "MacOS-Preview"},
            "golang-notes.md": {"display": "Notes-On-Go"},
            "zenity": { # Directory
                "entry_file": "go_zenity.md",
                # "display": " Zenity", # Display for the directory entry itself
                "items": {
                    "go_zenity.md": {"display": " Zenity"},
                    "intro.md": {"display": "Introduction"},
                    "calendar.md": {"display": "Calendar"},
                    "color-selection.md": {"display": "Color Selection"},
                    "entry.md": {"display": "Entry"},
                    "file-selection.md": {"display": "File Selection"},
                    "forms.md": {"display": "Forms"},
                    "index.md": {"display": "Index"},
                    "list.md": {"display": "List"},
                    "message.md": {"display": "Message"},
                    "notification.md": {"display": "Notification"},
                    "password.md": {"display": "Password"},
                    "progress.md": {"display": "Progress"},
                    "scale.md": {"display": "Scale"},
                    "text.md": {"display": "Text"},
                    "usage.md": {"display": "Usage"},
                }
            },
            "buildGoApp": { # Directory
                "entry_file": "#TOC.md",
                # "display": " GoApps",
                "items": {"#TOC.md": {"display": " GoApps"}} # Titles for 01.0.md etc. are just their names
            },
            "gioui.org": { # Directory
                "entry_file": "learnbeginners.md", # Example uses this as the main link
                # "display": " Gioui",
                "items": {
                    "learnbeginners.md": {"display": " Gioui"},
                    "learnreferences.md": {"display": "Learning References"},
                    # Most other files use prettified names
                    "android.md": {"display": "Android"}, "anvil.md": {"display": "Anvil"},
                    "architecture.md": {"display": "Architecture"}, "chapar.md": {"display": "Chapar"},
                    "clip.md": {"display": "Clip"}, "color.md": {"display": "Color"},
                    "common-errors.md": {"display": "Common Errors"}, "community.md": {"display": "Community"},
                    "contribute.md": {"display": "Contribute"}, "cryptopower.md": {"display": "Cryptopower"},
                    "drawing.md": {"display": "Drawing"}, "example.md": {"display": "Example"},
                    "faq.md": {"display": "Faq"}, "g45w.md": {"display": "G45W"},
                    "gesture.md": {"display": "Gesture"}, "get-started.md": {"display": "Get Started"},
                    "gio.md": {"display": "Gio"}, "gioui.org.md": {"display": "Gioui.Org"},
                    "godcr.md": {"display": "Godcr"}, "gotraceui.md": {"display": "Gotraceui"},
                    "immediate-mode-gui-programming.md": {"display": "Immediate Mode Gui Programming"},
                    "input.md": {"display": "Input"}, "install.md": {"display": "Install"},
                    "ios.md": {"display": "Ios"}, "key.md": {"display": "Key"},
                    "layout.md": {"display": "Layout"}, "layout_1.md": {"display": "Layout 1"},
                    "learn.md": {"display": "Learn"}, "learntalks.md": {"display": "Learntalks"},
                    "linux.md": {"display": "Linux"}, "macos.md": {"display": "Macos"},
                    "material.md": {"display": "Material"}, "news.md": {"display": "News"},
                    "op.md": {"display": "Op"}, "page_21.md": {"display": "Page 21"},
                    "page_53.md": {"display": "Page 53"}, "paint.md": {"display": "Paint"},
                    "photon.md": {"display": "Photon"}, "pointer.md": {"display": "Pointer"},
                    "protonet.md": {"display": "Protonet"}, "showcase.md": {"display": "Showcase"},
                    "sointu.md": {"display": "Sointu"}, "split-widget.md": {"display": "Split Widget"},
                    "sprig.md": {"display": "Sprig"}, "text.md": {"display": "Text"},
                    "theme.md": {"display": "Theme"}, "transito.md": {"display": "Transito"},
                    "units.md": {"display": "Units"}, "wasm.md": {"display": "Wasm"},
                    "widget.md": {"display": "Widget"}, "widget_1.md": {"display": "Widget 1"},
                    "window.md": {"display": "Window"}, "windows.md": {"display": "Windows"},
                    "wormhole-william.md": {"display": "Wormhole William"},
                }
            },
            "hugodocs": { # Directory
                "entry_file": "hugo_functions.md",
                # "display": " Hugo",
                "items": {
                    "hugo_functions.md": {"display": " Hugo"},
                    "hugo_collections.md": {"display": "Hugo Collections"},
                    "hugo_methods.md": {"display": "Hugo Methods"},
                    "papermod-faq.md": {"display": "Papermod FAQ"},
                    "papermod-map.md": {"display": "Papermod Map"},
                }
            }
        }
    },
    "python": {
        "title": " PYTHON",
        "entry_file": "pyenv.md",
        "item_order": [ # Approximate order from example
            "pyenv.md", "Accutter.md", "marker.md", "poetry.md", "py_regex.md", "pyargs.md",
            "pydoll-examples.md", "python-removal.md", "reqhtml.md", "uvpy.md", "virtualenv.md",
            "LangChainDocs.md", "pydoll.md", "Mojo.md", "crawl4ai"
        ],
        "items": {
            "pyenv.md": {"display": " PYTHON"},
            "Accutter.md": {"display": "Accutter"},
            "marker.md": {"display": "Marker"},
            "poetry.md": {"display": "Poetry"},
            "py_regex.md": {"display": "PyRegex"},
            "pyargs.md": {"display": "PyArgs"},
            "pydoll-examples.md": {"display": "Pydoll Examples"},
            "python-removal.md": {"display": "Python Removal"},
            "reqhtml.md": {"display": "Reqhtml"},
            "uvpy.md": {"display": "UV"},
            "virtualenv.md": {"display": "VirtualENV"},
            "LangChainDocs.md": {"display": "LangChainDocs"},
            "pydoll.md": {"display": "PyDoll"},
            "Mojo.md": {"display": " Mojo"}, # Mojo.md also in active-dev
            "crawl4ai": { # Directory
                "entry_file": "content/-index.md", # Note: entry is nested
                # "display": " CRAWL4AI",
                "items": {
                    "content": { # Subdirectory within crawl4ai
                        "entry_file": "-index.md", # This refers to crawl4ai/content/-index.md
                                                   # The link for "crawl4ai" main entry is python/crawl4ai/content/-index.md
                                                   # The display name comes from this -index.md file's config below
                        "items": { # Config for files inside crawl4ai/content/
                            "-index.md": {"display": " CRAWL4AI"}, # This is for python/crawl4ai/content/-index.md
                            "getting-started.md": {"display": "Getting Started"},
                            "api-extracts-chunks.md": {"display": "Api Extracts & Chunks"},
                            "async.md": {"display": "Async"},
                            "browser-configs.md": {"display": "Browser & Configs"},
                            "cache-migration.md": {"display": "Cache & Migration"},
                            # "content-selection.md" is a file, but there's also a "content/" subdir
                            # Handle the file first, then the subdir.
                            "content-selection.md": {"display": "Content Selection"}, # This is the FILE
                            "content": { # This is the SUBDIRECTORY crawl4ai/content/content/
                                "entry_file": "selection.md", # Link for the "content" subdir itself
                                "items": {
                                    "selection.md": {"display":"Content Selection"} # For crawl4ai/content/content/selection.md
                                }
                            },
                            "control-the-browser.md": {"display": "Control The Browser"},
                            "crawl-output.md": {"display": "Crawl Output"},
                            "dispatcher.md": {"display": "Dispatcher"},
                            "docker-deployment.md": {"display": "Docker Deployment"},
                            "download-handling.md": {"display": "Download Handling"},
                            "download-lazy-load.md": {"display": "Download Lazy Load"},
                            "efficiency-boosts.md": {"display": "Efficiency Boosts"},
                            "fit-markdown-features.md": {"display": "Fit Markdown With Features"},
                            "hooks-auth.md": {"display": "Hooks & Auth"},
                            "installation-setup.md": {"display": "Installation & Setup"},
                            "json-llm.md": {"display": "Json Llm"},
                            "json-no-llm.md": {"display": "Json No Llm"},
                            "link-media.md": {"display": "Link & Media"},
                            "markdown-generation.md": {"display": "Markdown Generation"},
                            "optimized-multi-url.md": {"display": "Optimized Multi Url"},
                            "overview-advanced.md": {"display": "Overview Advanced"},
                            "page-interaction.md": {"display": "Page Interaction"},
                            "parameters.md": {"display": "Parameters"},
                            "prefix-based-input.md": {"display": "Prefix Based Input"},
                            "preserve-identity.md": {"display": "Preserve Identity"},
                            "reference-i.md": {"display": "Reference I"},
                            "reference-ii.md": {"display": "Reference II"},
                            "reference-iii.md": {"display": "Reference III"},
                            "session.md": {"display": "Session"},
                            "simple-crawl.md": {"display": "Simple Crawl"},
                            "strat-chunking.md": {"display": "Strat Chunking"},
                            "strat-cosine.md": {"display": "Strat Cosine"},
                        }
                    }
                }
            }
        }
    },
    "ml": {
        "title": "⨝ ML",
        "entry_file": "ollama.md",
        "item_order": ["ollama.md", "openui.md", "ouirag.md", "vision-llm.md"],
        "items": {
            "ollama.md": {"display": "⨝ ML"},
            "openui.md": {"display": "󱁤 OUI"},
            "ouirag.md": {"display": "󱁤 RAG"},
            "vision-llm.md": {"display": "󱁤 VISION"},
        }
    }
}

# Defines the order of the top-level sections in SUMMARY.md
SECTION_ORDER = ["meta", "active-dev", "web", "cli", "golang", "python", "ml"]

# --- Helper Functions ---

def natural_sort_key(s):
    """Key for natural sorting (e.g., 'item1', 'item2', 'item10')."""
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', str(s))]

def prettify_name(basename):
    """Converts a filename (without extension) to a more readable title."""
    if not basename: return ""
    name = basename.replace('-', ' ').replace('_', ' ')
    # Capitalize words, but try to keep acronyms (this is tricky)
    # A simple title() might work for many cases.
    # For "zed-dev" -> "zed-dev" or "zed dev", not "Zed Dev" if not desired.
    # The CONFIG should override these specific cases.
    if name.lower() in ["zed-dev", "wails.io", "gioui.org", "githubflavour", "readme"]: # specific cases
        return name
    return name.title()

def get_item_config(path_parts, current_config_level):
    """
    Retrieves the specific configuration for an item (file or directory)
    by traversing the CONFIG structure.
    """
    config = current_config_level
    for part in path_parts:
        if isinstance(config, dict) and "items" in config and part in config["items"]:
            config = config["items"][part]
        else:
            # If not found in specific path, return None or a default part of the config
            # For this script, if not explicitly in items, it means use default behavior
            return None
    return config


# --- Main Logic ---

def generate_summary_recursive(summary_lines, current_dir_abs, current_dir_rel, indent_level, parent_config, file_to_skip=None):
    """
    Recursively processes directories and files to build SUMMARY.md lines.
    """
    try:
        items = os.listdir(current_dir_abs)
    except FileNotFoundError:
        print(f"Warning: Directory not found: {current_dir_abs}")
        return

    # Get specific order if defined in config, otherwise prepare for natural sort
    # The `parent_config` here refers to the config of `current_dir_rel` itself,
    # so its `item_order` would be for its children.
    specific_order_list = parent_config.get("item_order", []) if parent_config else []

    ordered_items = []
    remaining_items = []

    for item_name in items:
        if item_name in IGNORE_ITEMS or item_name == file_to_skip:
            continue
        if item_name in specific_order_list:
            # Add to ordered_items respecting the specified order
            # This ensures items in specific_order_list are processed first and in that order
            if len(ordered_items) <= specific_order_list.index(item_name):
                 ordered_items.extend([None] * (specific_order_list.index(item_name) - len(ordered_items) +1 ))
            ordered_items[specific_order_list.index(item_name)] = item_name
        else:
            remaining_items.append(item_name)

    # Filter out any Nones from pre-allocation if some specified items weren't found
    ordered_items = [item for item in ordered_items if item is not None]

    # Sort remaining items (directories first, then files, both naturally)
    dirs = sorted([d for d in remaining_items if os.path.isdir(os.path.join(current_dir_abs, d))], key=natural_sort_key)
    files = sorted([f for f in remaining_items if os.path.isfile(os.path.join(current_dir_abs, f)) and f.endswith(".md")], key=natural_sort_key)

    # Combine: specifically ordered items, then sorted dirs, then sorted files
    processed_items_basenames = ordered_items + dirs + files

    for item_basename in processed_items_basenames:
        item_abs_path = os.path.join(current_dir_abs, item_basename)
        item_rel_path_parts = current_dir_rel.split(os.sep) if current_dir_rel else []
        item_rel_path_parts.append(item_basename)

        # Determine the current level in the main CONFIG for item-specific details
        # For a child item, its config is found within its parent's "items" dict
        item_specific_config = parent_config.get("items", {}).get(item_basename) if parent_config else None

        display_name = None
        if item_specific_config and "display" in item_specific_config:
            display_name = item_specific_config["display"]

        indent_str = "  " * indent_level

        if os.path.isdir(item_abs_path):
            dir_rel_path = os.path.join(current_dir_rel, item_basename) if current_dir_rel else item_basename

            # Determine entry file for this directory
            entry_file_basename = None
            if item_specific_config and "entry_file" in item_specific_config:
                entry_file_basename = item_specific_config["entry_file"]

            if not entry_file_basename: # Default to finding an index.md or first .md
                for common_entry in ["index.md", "_index.md", "README.md", "#TOC.md", "_intro.md"]:
                    if os.path.exists(os.path.join(item_abs_path, common_entry)):
                        entry_file_basename = common_entry
                        break
                if not entry_file_basename:
                    # Find first .md file if no common entry file found
                    sorted_md_files = sorted([f for f in os.listdir(item_abs_path) if f.endswith(".md")], key=natural_sort_key)
                    if sorted_md_files:
                        entry_file_basename = sorted_md_files[0]

            if not entry_file_basename: # Still no entry file (e.g. empty dir or no .md files)
                link_target_rel_path = dir_rel_path # Link to directory itself (mdbook might not like this)
                if not display_name:
                    display_name = prettify_name(item_basename)
                print(f"Warning: No entry file found for directory {dir_rel_path}. Linking to directory itself.")
            else:
                # If entry_file is nested (e.g., "content/-index.md")
                nested_parts = entry_file_basename.split('/')
                link_target_rel_path = os.path.join(dir_rel_path, *nested_parts)

                # The display name for the directory entry should ideally come from the entry file's config or the dir's config
                if not display_name: # If dir itself doesn't have "display"
                    # Check if entry file has display name
                    entry_file_config_in_dir_items = item_specific_config.get("items", {}).get(nested_parts[0]) if item_specific_config else None
                    if len(nested_parts) > 1 and entry_file_config_in_dir_items: # e.g. crawl4ai/content item for -index.md
                         current_cfg_level = entry_file_config_in_dir_items
                         for part_idx in range(1, len(nested_parts)):
                             current_cfg_level = current_cfg_level.get("items", {}).get(nested_parts[part_idx])
                             if not current_cfg_level: break
                         if current_cfg_level and "display" in current_cfg_level:
                             display_name = current_cfg_level["display"]

                    elif item_specific_config and item_specific_config.get("items", {}).get(entry_file_basename, {}).get("display"):
                         display_name = item_specific_config["items"][entry_file_basename]["display"]
                    else: # Fallback to prettifying directory name
                        display_name = prettify_name(item_basename)

            summary_lines.append(f"{indent_str}- [{display_name}]({link_target_rel_path.replace(os.sep, '/')})")
            generate_summary_recursive(summary_lines, item_abs_path, dir_rel_path, indent_level + 1, item_specific_config, file_to_skip=entry_file_basename if len(nested_parts) == 1 else None)

        elif item_basename.endswith(".md"):
            file_rel_path = os.path.join(current_dir_rel, item_basename) if current_dir_rel else item_basename
            if not display_name:
                display_name = prettify_name(os.path.splitext(item_basename)[0])

            summary_lines.append(f"{indent_str}- [{display_name}]({file_rel_path.replace(os.sep, '/')})")


def main():
    summary_content = ["# Summary", ""]
    first_section = True

    for section_dir_name in SECTION_ORDER:
        if section_dir_name not in CONFIG:
            print(f"Warning: Configuration for section '{section_dir_name}' not found. Skipping.")
            continue

        if not first_section:
            summary_content.append("") # Add --- like separator visually with a blank line
            summary_content.append("---")
            summary_content.append("")
        first_section = False

        section_config = CONFIG[section_dir_name]
        section_title = section_config["title"]
        section_entry_file_basename = section_config["entry_file"]

        section_abs_path = os.path.join(SRC_DIR, section_dir_name)
        entry_file_rel_path = os.path.join(section_dir_name, section_entry_file_basename)

        summary_content.append(f"- [{section_title}]({entry_file_rel_path.replace(os.sep, '/')})")

        # Pass the section_config for this top-level directory
        generate_summary_recursive(summary_content, section_abs_path, section_dir_name, 1, section_config, file_to_skip=section_entry_file_basename)

    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            f.write("\n".join(summary_content))
        print(f"Successfully generated {OUTPUT_FILE}")
    except IOError as e:
        print(f"Error writing {OUTPUT_FILE}: {e}")

if __name__ == "__main__":
    main()

```

**How to Use and Refine:**

1.  **Save the Script:** Save the code above as a Python file (e.g., `generate_summary.py`) in the parent directory of your `src/` folder (i.e., your mdBook project root).
2.  **Run from Project Root:** Execute it from your mdBook project's root directory: `python generate_summary.py`.
3.  **Crucial: The `CONFIG` Dictionary:**
    *   This is where most of the customization happens. You need to ensure it accurately reflects the desired titles, icons, entry files for directories, and the order of items within each section/subsection.
    *   `"title"`: For the main H1-style entry of a top-level section.
    *   `"entry_file"`: The basename of the Markdown file that the section's title links to (relative to the section's directory).
    *   `"item_order"`: (Optional) A list of basenames (files or subdirectories) in the exact order you want them to appear. Items not in this list will be sorted naturally (directories first, then files) and appended.
    *   `"items"`: (Optional) A dictionary where keys are basenames of files or subdirectories within the current configured directory. The value is another dictionary for that item:
        *   `"display"`: The custom string to show in the `[display_name]` part.
        *   `"entry_file"`: If the item is a directory, this specifies its main linking Markdown file (can be nested, e.g., `"content/-index.md"`).
        *   It can also contain its own `"item_order"` and `"items"` for further nesting.
4.  **Iterate and Adjust `CONFIG`:**
    *   The provided `CONFIG` is a best-effort attempt to match your example. You'll likely need to tweak it.
    *   **Titles and Icons:** Carefully set the `"display"` values in the `CONFIG`.
    *   **Directory Entry Points:** Ensure `"entry_file"` under an item's config (if it's a directory) or for the main section is correct. For instance, `python/crawl4ai` links to `content/-index.md` within it.
    *   **Ordering:** Use `"item_order"` extensively if the default natural sort isn't what you need.
    *   **Nested `crawl4ai/content/content`:** The config for `crawl4ai` has been structured to handle its nested `content` directory and `content-selection.md` file.
5.  **"Virtual Parents" (e.g., `WailsV3.md` and `wails.io` contents):**
    *   The current script generates `SUMMARY.md` based on the actual filesystem hierarchy. In your example, `WailsV3.md` (a file) acts as a header for items from the `wails.io` directory (its sibling).
    *   This script will list `WailsV3.md` as a file, and then `wails.io` as a directory with its own items indented under it.
    *   Achieving the exact "virtual parent" structure from your example would require a much more complex configuration or manual post-editing of the generated `SUMMARY.md`. The same applies to the `web/md_codeblocks.md` group.

This script provides a strong foundation. The bulk of the work to match your specific example lies in populating the `CONFIG` dictionary correctly.

</details>

---

#  Simplified Approach

This revised script will:

1.  **Ignore Icons:** It will not attempt to add icons to the display names. You can manually add them to the `SUMMARY.md` or your `CONFIG` later if desired.
2.  **Conventional Header Files:**
    *   For any directory (e.g., `myfolder`), if a file named `_myfolder.md` (case-insensitive match for `_MyFolder.md`, `_myfolder.md`, etc., but uses the actual found filename) exists directly within it, that file will be used as the entry point for the `myfolder` link in the `SUMMARY.md`.
    *   The display name for `myfolder` in the TOC will be "Myfolder" (prettified from the folder name), unless overridden in `CONFIG`.
    *   This `_myfolder.md` will not be listed again as a child item under "Myfolder".
3.  **`CONFIG` for Overrides:** The `CONFIG` dictionary will still be used for:
    *   Defining top-level sections, their titles, and their main entry files.
    *   Specifying custom display names for any file or directory.
    *   Specifying a custom `entry_file` for a directory if the `_dirname.md` convention is not desired or if the entry file is nested (e.g., `somedir/actual_entry.md`).
    *   Defining a specific `item_order` for files/directories within a section or subsection.
4.  **Structure First:** The main goal is to correctly generate the hierarchical list of links.
5.  **H1 Headers for Top-Level TOC Names:** This will be maintained for the first link of each major section.

Here's the simplified Python script:

```python
import os
import re

# --- Configuration ---
SRC_DIR = "src"
OUTPUT_FILE = os.path.join(SRC_DIR, "SUMMARY.md")

# Files/directories to completely ignore
IGNORE_ITEMS = {
    "SUMMARY.md",
    ".DS_Store",
    "dirtree",
}

# Simplified CONFIG: No icons in 'title' or 'display' here.
# You can add them manually to the output or to this config if you wish.
CONFIG = {
    "meta": {
        "title": "META", # Display title for the top-level section entry
        "entry_file": "-readme.md", # Main file for the "META" link
        "item_order": ["-readme.md", "GitHubFlavour.md", "MyDesign.md", "Architecture.md", "TOC.md", "DevDocs.md"],
        "items": {
            "-readme.md": {"display": "META"}, # Specific display for this file
            "GitHubFlavour.md": {"display": "GitHub Markdown"},
            "MyDesign.md": {"display": "My Design"},
            "Architecture.md": {"display": "Architecture"},
            "TOC.md": {"display": "Table of Contents"},
            "DevDocs.md": {"display": "DevDocs"},
        }
    },
    "active-dev": {
        "title": "LIVE",
        "entry_file": "zed-dev.md",
        "item_order": ["zed-dev.md", "Snippets.md", "Mojo.md", "devowails.md", "WailsV3.md", "wails.io", "remarkJS"],
        "items": {
            "zed-dev.md": {"display": "LIVE"},
            "Snippets.md": {"display": "Snips"},
            "Mojo.md": {"display": "Mojo"},
            "devowails.md": {"display": "Devo-app"},
            "WailsV3.md": {"display": "WailsV3"},
            "wails.io": { # Directory
                # Will look for _wails.io.md by convention if "entry_file" is not set.
                # If you want it to be _intro.md:
                "entry_file": "_intro.md",
                "display": "Wails.io Docs", # Custom display for the "wails.io" directory entry
                "item_order": ["_intro.md", "1_getstarted.md", "2_guides.md", "3_references.md", "4_runtime.md", "5_tuts.md", "6_community.md"],
                "items": {
                    "_intro.md": {"display": "Introduction"},
                    "1_getstarted.md": {"display": "Get Started"},
                    "2_guides.md": {"display": "Guides"},
                    # ... and so on for other files in wails.io
                }
            },
            "remarkJS": { # Directory
                "entry_file": "AwesomeRemark.md", # Or it would look for _remarkJS.md
                "display": "AwesomeRemark",
                # ... item_order and items for remarkJS children
            }
        }
    },
    "web": {
        "title": "WEB AUTOMATION",
        "entry_file": "AutomatingHTML.md",
        # ... items config for web
        "items": {
            "AutomatingHTML.md": {"display": "WEB AUTOMATION"},
            "md_codeblocks.md": {"display": "Docusaurus Features"}, # Example of grouping
             # md_admonitions.md etc. would be listed under it if ordered correctly
        },
        "item_order": [ # Define order if natural sort is not enough
            "AutomatingHTML.md",
            # ... other files/dirs ...
            "md_codeblocks.md", "md_admonitions.md", "md_math.md", "md_mermaid.md", "md_tabs.md"
        ]
    },
    "cli": {
        "title": "COMMANDLINE",
        "entry_file": "vim.md",
        "items": {"vim.md": {"display": "COMMANDLINE"}}
        # ...
    },
    "golang": {
        "title": "GOLANG",
        "entry_file": "Golang.md",
        "items": {
            "Golang.md": {"display": "GOLANG"},
            "zenity": { # Directory
                "display": "Zenity Lib", # Optional custom title for dir
                # By convention, it will look for "golang/zenity/_zenity.md"
                # If you named it _Zenity.md (capital Z), it should find it.
                # Or explicitly: "entry_file": "_Zenity.md",
                "items": {
                    # "_Zenity.md": {"display": "Zenity Overview"}, # if _Zenity.md exists and is the entry
                    "intro.md": {"display": "Introduction"},
                    "calendar.md": {"display": "Calendar"},
                }
            },
            "buildGoApp": {
                "display": "GoApps Guide",
                "entry_file": "#TOC.md", # Specific entry file
                "items": {
                    "#TOC.md": {"display": "GoApps TOC"}
                }
            },
            # ...
        }
    },
    "python": {
        "title": "PYTHON",
        "entry_file": "pyenv.md",
        "items": {
            "pyenv.md": {"display": "PYTHON"},
            "crawl4ai": {
                "display": "Crawl4AI",
                "entry_file": "content/-index.md", # Link for "Crawl4AI" goes to .../crawl4ai/content/-index.md
                                                  # Children listed will be from .../crawl4ai/content/
                "items": { # Config for items directly under "crawl4ai" dir. "content" is one such item.
                    "content": { # This is the config for the "crawl4ai/content" directory
                        # No display/entry needed here if main link already targets it.
                        "item_order": ["-index.md", "getting-started.md", "api-extracts-chunks.md", "..."],
                        "items": { # Config for items *inside* "crawl4ai/content"
                            # "-index.md" will be skipped if it's the entry.
                            # "getting-started.md": {"display": "Getting Started"},
                            # ...
                            "content": { # Config for "crawl4ai/content/content" (sub-subdir)
                                "display": "Content Selection Details",
                                # Will look for _content.md or index.md etc. by convention
                                # "entry_file": "selection.md"
                            }
                        }
                    }
                }
            }
            # ...
        }
    },
    "ml": {
        "title": "ML",
        "entry_file": "ollama.md",
        "items": {"ollama.md": {"display": "ML"}}
        # ...
    }
}
# Fill in the rest of your CONFIG similarly, removing icons from display names for now.

# Defines the order of the top-level sections in SUMMARY.md
SECTION_ORDER = ["meta", "active-dev", "web", "cli", "golang", "python", "ml"]

# --- Helper Functions ---

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', str(s))]

def prettify_name(name_str):
    """Converts a filename (without extension) or dirname to a more readable title."""
    if not name_str: return ""

    # Remove leading underscore if present (for _dirname.md files if they were to be listed directly)
    if name_str.startswith("_") and len(name_str) > 1: # Ensure not just "_"
        name_str = name_str[1:]

    name_str = name_str.replace('-', ' ').replace('_', ' ')

    words = name_str.split(' ')
    capitalized_words = []
    for word in words:
        if not word: continue
        if word.isupper():
            capitalized_words.append(word)
        else:
            capitalized_words.append(word[0].upper() + word[1:])

    return " ".join(capitalized_words).strip()

# --- Main Logic ---

def generate_summary_recursive(summary_lines, current_dir_abs, current_dir_rel, indent_level, parent_dir_config, file_to_skip=None):
    try:
        items_in_fs = os.listdir(current_dir_abs)
    except FileNotFoundError:
        print(f"Warning: Directory not found during scan: {current_dir_abs}")
        return

    # Filter out ignored items and the file_to_skip from the parent
    items_to_process = [item for item in items_in_fs if item not in IGNORE_ITEMS and item != file_to_skip]

    # Get specific order if defined in parent_dir_config for its children
    specific_order_list = parent_dir_config.get("item_order", []) if parent_dir_config else []

    ordered_items = []
    remaining_items_basenames = []

    # Populate ordered_items based on specific_order_list
    temp_item_dict = {name: None for name in items_to_process} # For quick lookup
    for ordered_name in specific_order_list:
        if ordered_name in temp_item_dict:
            ordered_items.append(ordered_name)
            del temp_item_dict[ordered_name] # Remove from dict to avoid reprocessing

    remaining_items_basenames = list(temp_item_dict.keys())

    # Sort remaining items (directories first, then files, both naturally)
    # Ensure paths are absolute for os.path.isdir/isfile
    dirs = sorted([d for d in remaining_items_basenames if os.path.isdir(os.path.join(current_dir_abs, d))], key=natural_sort_key)
    files = sorted([f for f in remaining_items_basenames if os.path.isfile(os.path.join(current_dir_abs, f)) and f.endswith(".md")], key=natural_sort_key)

    processed_items_basenames = ordered_items + dirs + files

    for item_basename in processed_items_basenames:
        item_abs_path = os.path.join(current_dir_abs, item_basename)
        item_config = parent_dir_config.get("items", {}).get(item_basename) if parent_dir_config else None
        indent_str = "  " * indent_level

        if os.path.isdir(item_abs_path):
            dir_entry_file_rel_from_dir = None # Relative path of entry file from this dir's root
            child_listing_source_abs = item_abs_path
            child_listing_source_rel = os.path.join(current_dir_rel, item_basename) if current_dir_rel else item_basename
            entry_file_to_skip_for_children = None
            config_for_children_recursion = item_config # Config for item_basename itself

            # 1. Check item_config for "entry_file"
            if item_config and "entry_file" in item_config:
                dir_entry_file_rel_from_dir = item_config["entry_file"]
                if '/' in dir_entry_file_rel_from_dir:
                    path_parts = dir_entry_file_rel_from_dir.split('/')
                    entry_file_to_skip_for_children = path_parts[-1]
                    sub_path_to_children = os.path.join(*path_parts[:-1])
                    child_listing_source_abs = os.path.join(item_abs_path, sub_path_to_children)
                    child_listing_source_rel = os.path.join(child_listing_source_rel, sub_path_to_children)
                    # Update config_for_children_recursion to point to the config of the jumped-to subdir
                    temp_config = item_config
                    for part in path_parts[:-1]: # Iterate through subdirectories in the entry_file path
                        temp_config = temp_config.get("items", {}).get(part)
                        if not temp_config: temp_config = {} # No specific config for this part
                    config_for_children_recursion = temp_config

                else: # Entry file is a direct child
                    entry_file_to_skip_for_children = dir_entry_file_rel_from_dir
            else:
                # 2. Check for conventional header _dirname.md (case-insensitive)
                found_conventional_header = None
                try:
                    for f_name in os.listdir(item_abs_path): # item_abs_path is the directory being processed
                        if f_name.lower() == f"_{item_basename.lower()}.md":
                            if os.path.isfile(os.path.join(item_abs_path, f_name)):
                                found_conventional_header = f_name
                                break
                except OSError: pass
                if found_conventional_header:
                    dir_entry_file_rel_from_dir = found_conventional_header
                    entry_file_to_skip_for_children = found_conventional_header

            # 3. Fallback if no entry file determined yet
            if not dir_entry_file_rel_from_dir:
                common_entries = ["index.md", "_index.md", "README.md", "#TOC.md", "_intro.md"]
                try:
                    for common_name in common_entries:
                        if os.path.isfile(os.path.join(item_abs_path, common_name)):
                            dir_entry_file_rel_from_dir = common_name
                            entry_file_to_skip_for_children = common_name
                            break
                    if not dir_entry_file_rel_from_dir: # Still not found, try first .md
                        sorted_md_files = sorted(
                            [f for f in os.listdir(item_abs_path) if f.endswith(".md") and os.path.isfile(os.path.join(item_abs_path, f))],
                            key=natural_sort_key
                        )
                        if sorted_md_files:
                            dir_entry_file_rel_from_dir = sorted_md_files[0]
                            entry_file_to_skip_for_children = sorted_md_files[0]
                except OSError: pass

            # Determine display name for the directory
            display_name = item_config.get("display") if item_config else None
            if not display_name:
                display_name = prettify_name(item_basename)

            # Determine link target for the directory entry
            if dir_entry_file_rel_from_dir:
                link_target_abs_path_for_dir_entry = os.path.join(item_abs_path, dir_entry_file_rel_from_dir)
                # Make link target relative to SRC_DIR
                link_target_rel_to_src = os.path.relpath(link_target_abs_path_for_dir_entry, SRC_DIR)
            else:
                # No entry file found, link to directory itself (less ideal)
                link_target_rel_to_src = os.path.relpath(item_abs_path, SRC_DIR)
                entry_file_to_skip_for_children = None # Nothing to skip
                print(f"Warning: No .md entry point for directory '{item_relpath_to_src}'. Linking to dir.")

            item_relpath_to_src = os.path.relpath(item_abs_path, SRC_DIR) # Used for the print warning
            summary_lines.append(f"{indent_str}- [{display_name}]({link_target_rel_to_src.replace(os.sep, '/')})")

            # Recursive call for children
            if os.path.isdir(child_listing_source_abs):
                 generate_summary_recursive(summary_lines, child_listing_source_abs, child_listing_source_rel, indent_level + 1, config_for_children_recursion, entry_file_to_skip_for_children)

        elif item_basename.endswith(".md") and os.path.isfile(item_abs_path):
            # file_rel_path relative to current_dir_rel for linking
            file_link_path = os.path.join(current_dir_rel, item_basename) if current_dir_rel else item_basename

            display_name = item_config.get("display") if item_config else None
            if not display_name:
                display_name = prettify_name(os.path.splitext(item_basename)[0])

            summary_lines.append(f"{indent_str}- [{display_name}]({file_link_path.replace(os.sep, '/')})")


def main():
    summary_content = ["# Summary", ""]
    first_section = True

    for section_dir_name in SECTION_ORDER:
        if section_dir_name not in CONFIG:
            print(f"Warning: Config for section '{section_dir_name}' not found. Skipping.")
            continue

        if not first_section:
            summary_content.append("")
            summary_content.append("---")
            summary_content.append("")
        first_section = False

        section_config = CONFIG[section_dir_name]
        section_title_display = section_config.get("title", prettify_name(section_dir_name)) # Use title from config or prettify dir name
        section_entry_file_basename = section_config["entry_file"]

        section_abs_path = os.path.join(SRC_DIR, section_dir_name)
        entry_file_for_section_link_rel_to_src = os.path.join(section_dir_name, section_entry_file_basename)

        summary_content.append(f"- [{section_title_display}]({entry_file_for_section_link_rel_to_src.replace(os.sep, '/')})")

        # Initial call for this section's content
        # current_dir_rel is section_dir_name itself
        # parent_dir_config is section_config (config for section_dir_name)
        generate_summary_recursive(summary_content, section_abs_path, section_dir_name, 1, section_config, file_to_skip=section_entry_file_basename)

    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            f.write("\n".join(summary_content))
        print(f"Successfully generated {OUTPUT_FILE}")
    except IOError as e:
        print(f"Error writing {OUTPUT_FILE}: {e}")

if __name__ == "__main__":
    main()
```

**Key Changes and How to Use:**

1.  **Simplified `CONFIG`:**
    *   Remove all icon characters (like ``) from the `"title"` and `"display"` values in your `CONFIG` dictionary. The script will now generate cleaner names.
    *   **Example for `golang/zenity`:**
        ```python
        "golang": {
            "title": "GOLANG",
            "entry_file": "Golang.md",
            "items": {
                "Golang.md": {"display": "GOLANG Main"},
                "zenity": { // This is the directory "src/golang/zenity/"
                    "display": "Zenity Library", // Optional: Custom title for the directory link
                    // If "entry_file" is NOT specified here, the script will look for
                    // "src/golang/zenity/_zenity.md" (case-insensitive on the "_zenity" part).
                    // If you have "src/golang/zenity/_Zenity.md", it will find it.
                    // The link will be [Zenity Library](./golang/zenity/_Zenity.md)
                    "items": {
                        // "_Zenity.md": {"display": "Overview"}, // Only if _Zenity.md is NOT the entry_file and you want to list it
                        "intro.md": {"display": "Introduction"},
                        "calendar.md": {"display": "Calendar"},
                        // ... other files in golang/zenity/
                    }
                },
                // ...
            }
        },
        ```

2.  **Directory Entry File Convention:**
    *   If a directory `myfolder` contains a file `_myfolder.md` (e.g., `_Zenity.md` in `zenity/`), that file becomes the link target for "Myfolder".
    *   The script checks for this convention *after* checking the `CONFIG` for an explicit `"entry_file"` for that directory.
    *   If neither `CONFIG` nor the `_dirname.md` convention provides an entry, it falls back to `index.md`, `_index.md`, `README.md`, `#TOC.md`, `_intro.md`, or then the first alphabetically sorted `.md` file in that directory.

3.  **`prettify_name` Function:** This now produces simpler titles like "My Awesome File" from `my-awesome_file.md`. It also strips a leading underscore from filenames if they are being prettified (e.g., if `_somefile.md` was listed directly).

4.  **Path Handling:**
    *   The logic for `entry_file` in `CONFIG` that contains `/` (like `content/-index.md` for `crawl4ai`) is maintained to correctly set the source for child listings.
    *   The `parent_dir_config` passed during recursion is now more accurately the config for the directory whose children are being listed, even if "jumping" into a subfolder due to a nested `entry_file`.

**To get started:**

1.  Update your `CONFIG` dictionary in the script:
    *   Remove all icons from `"title"` and `"display"` fields.
    *   Review the `"entry_file"` for directories. If you want to use the `_dirname.md` convention, you can remove the `"entry_file"` for that directory from the `CONFIG`. For example, for `golang/zenity`, if you have `golang/zenity/_Zenity.md` (or `_zenity.md`), you can remove `"entry_file": "_Zenity.md"` from the `zenity` config block; the script will find it by convention.
2.  Ensure your header files are named correctly (e.g., `src/golang/zenity/_Zenity.md`).
3.  Run the script.

This version should be easier to manage initially and provides a clear convention for directory header files, while still allowing for detailed customization through the `CONFIG` when needed.
