[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.31.html#)



  * [Home](index.md)
  * Setup & Installation
    * [Installation](index.html.1.1.md)
    * [Docker Deployment](index.html.1.2.md)
  * [Quick Start](index.html.1.md)
  * Blog & Changelog
    * [Blog Home](index.html.1.3.md)
    * [Changelog](https://github.com/unclecode/crawl4ai/blob/main/CHANGELOG.md)
  * Core
    * [Simple Crawling](index.html.1.4.md)
    * [Crawler Result](index.html.1.5.md)
    * [Browser & Crawler Config](index.html.1.6.md)
    * [Markdown Generation](index.html.1.7.md)
    * [Fit Markdown](index.html.1.8.md)
    * [Page Interaction](index.html.1.9.md)
    * [Content Selection](index.html.1.10.md)
    * [Cache Modes](index.html.1.11.md)
    * [Local Files & Raw HTML](index.html.1.12.md)
    * [Link & Media](index.html.1.13.md)
  * Advanced
    * [Overview](index.html.1.14.md)
    * [File Downloading](index.html.1.15.md)
    * [Lazy Loading](index.html.1.16.md)
    * [Hooks & Auth](index.html.1.17.md)
    * [Proxy & Security](index.html.1.18.md)
    * [Session Management](index.html.1.19.md)
    * [Multi-URL Crawling](index.html.1.20.md)
    * [Crawl Dispatcher](index.html.1.21.md)
    * [Identity Based Crawling](index.html.1.22.md)
    * [SSL Certificate](index.html.1.23.md)
  * Extraction
    * [LLM-Free Strategies](index.html.1.24.md)
    * [LLM Strategies](index.html.1.25.md)
    * [Clustering Strategies](index.html.1.26.md)
    * [Chunking](index.html.1.27.md)
  * API Reference
    * [AsyncWebCrawler](index.html.1.28.md)
    * [arun()](index.html.1.29.md)
    * [Browser & Crawler Config](index.html.1.30.md)
    * CrawlResult
    * [Strategies](index.html.1.32.md)



* * *

  * [CrawlResult Reference](index.html.1.31.html#crawlresult-reference)
  * [1\. Basic Crawl Info](index.html.1.31.html#1-basic-crawl-info)
  * [2\. Raw / Cleaned Content](index.html.1.31.html#2-raw-cleaned-content)
  * [3\. Markdown Fields](index.html.1.31.html#3-markdown-fields)
  * [4\. Media & Links](index.html.1.31.html#4-media-links)
  * [5\. Additional Fields](index.html.1.31.html#5-additional-fields)
  * [6\. Example: Accessing Everything](index.html.1.31.html#6-example-accessing-everything)
  * [7\. Key Points & Future](index.html.1.31.html#7-key-points-future)



# `CrawlResult` Reference

The **`CrawlResult`** class encapsulates everything returned after a single crawl operation. It provides the **raw or processed content** , details on links and media, plus optional metadata (like screenshots, PDFs, or extracted JSON).

**Location** : `crawl4ai/crawler/models.py` (for reference)
    
    
    [](index.html.1.31.html#__codelineno-0-1)class CrawlResult(BaseModel):
    [](index.html.1.31.html#__codelineno-0-2)    url: str
    [](index.html.1.31.html#__codelineno-0-3)    html: str
    [](index.html.1.31.html#__codelineno-0-4)    success: bool
    [](index.html.1.31.html#__codelineno-0-5)    cleaned_html: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-6)    media: Dict[str, List[Dict]] = {}
    [](index.html.1.31.html#__codelineno-0-7)    links: Dict[str, List[Dict]] = {}
    [](index.html.1.31.html#__codelineno-0-8)    downloaded_files: Optional[List[str]] = None
    [](index.html.1.31.html#__codelineno-0-9)    screenshot: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-10)    pdf : Optional[bytes] = None
    [](index.html.1.31.html#__codelineno-0-11)    markdown: Optional[Union[str, MarkdownGenerationResult]] = None
    [](index.html.1.31.html#__codelineno-0-12)    markdown_v2: Optional[MarkdownGenerationResult] = None
    [](index.html.1.31.html#__codelineno-0-13)    fit_markdown: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-14)    fit_html: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-15)    extracted_content: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-16)    metadata: Optional[dict] = None
    [](index.html.1.31.html#__codelineno-0-17)    error_message: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-18)    session_id: Optional[str] = None
    [](index.html.1.31.html#__codelineno-0-19)    response_headers: Optional[dict] = None
    [](index.html.1.31.html#__codelineno-0-20)    status_code: Optional[int] = None
    [](index.html.1.31.html#__codelineno-0-21)    ssl_certificate: Optional[SSLCertificate] = None
    [](index.html.1.31.html#__codelineno-0-22)    ...
    

Below is a **field-by-field** explanation and possible usage patterns.

* * *

## 1\. Basic Crawl Info

### 1.1 **`url`** _(str)_

**What** : The final crawled URL (after any redirects).  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-1-1)print(result.url)  # e.g., "https://example.com/"
    

### 1.2 **`success`** _(bool)_

**What** : `True` if the crawl pipeline ended without major errors; `False` otherwise.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-2-1)if not result.success:
    [](index.html.1.31.html#__codelineno-2-2)    print(f"Crawl failed: {result.error_message}")
    

### 1.3 **`status_code`** _(Optional[int])_

**What** : The page’s HTTP status code (e.g., 200, 404).  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-3-1)if result.status_code == 404:
    [](index.html.1.31.html#__codelineno-3-2)    print("Page not found!")
    

### 1.4 **`error_message`** _(Optional[str])_

**What** : If `success=False`, a textual description of the failure.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-4-1)if not result.success:
    [](index.html.1.31.html#__codelineno-4-2)    print("Error:", result.error_message)
    

### 1.5 **`session_id`** _(Optional[str])_

**What** : The ID used for reusing a browser context across multiple calls.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-5-1)# If you used session_id="login_session" in CrawlerRunConfig, see it here:
    [](index.html.1.31.html#__codelineno-5-2)print("Session:", result.session_id)
    

### 1.6 **`response_headers`** _(Optional[dict])_

**What** : Final HTTP response headers.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-6-1)if result.response_headers:
    [](index.html.1.31.html#__codelineno-6-2)    print("Server:", result.response_headers.get("Server", "Unknown"))
    

### 1.7 **`ssl_certificate`** _(Optional[SSLCertificate])_

**What** : If `fetch_ssl_certificate=True` in your CrawlerRunConfig, **`result.ssl_certificate`** contains a [**`SSLCertificate`**](index.html.1.23.md) object describing the site’s certificate. You can export the cert in multiple formats (PEM/DER/JSON) or access its properties like `issuer`, `subject`, `valid_from`, `valid_until`, etc. **Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-7-1)if result.ssl_certificate:
    [](index.html.1.31.html#__codelineno-7-2)    print("Issuer:", result.ssl_certificate.issuer)
    

* * *

## 2\. Raw / Cleaned Content

### 2.1 **`html`** _(str)_

**What** : The **original** unmodified HTML from the final page load.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-8-1)# Possibly large
    [](index.html.1.31.html#__codelineno-8-2)print(len(result.html))
    

### 2.2 **`cleaned_html`** _(Optional[str])_

**What** : A sanitized HTML version—scripts, styles, or excluded tags are removed based on your `CrawlerRunConfig`.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-9-1)print(result.cleaned_html[:500])  # Show a snippet
    

### 2.3 **`fit_html`** _(Optional[str])_

**What** : If a **content filter** or heuristic (e.g., Pruning/BM25) modifies the HTML, the “fit” or post-filter version.  
**When** : This is **only** present if your `markdown_generator` or `content_filter` produces it.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-10-1)if result.fit_html:
    [](index.html.1.31.html#__codelineno-10-2)    print("High-value HTML content:", result.fit_html[:300])
    

* * *

## 3\. Markdown Fields

### 3.1 The Markdown Generation Approach

Crawl4AI can convert HTML→Markdown, optionally including:

  * **Raw** markdown 
  * **Links as citations** (with a references section) 
  * **Fit** markdown if a **content filter** is used (like Pruning or BM25)



### 3.2 **`markdown_v2`** _(Optional[MarkdownGenerationResult])_

**What** : The **structured** object holding multiple markdown variants. Soon to be consolidated into `markdown`. 

**`MarkdownGenerationResult`** includes: \- **`raw_markdown`** _(str)_ : The full HTML→Markdown conversion.  
\- **`markdown_with_citations`** _(str)_ : Same markdown, but with link references as academic-style citations.  
\- **`references_markdown`** _(str)_ : The reference list or footnotes at the end.  
\- **`fit_markdown`** _(Optional[str])_ : If content filtering (Pruning/BM25) was applied, the filtered “fit” text.  
\- **`fit_html`** _(Optional[str])_ : The HTML that led to `fit_markdown`.

**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-11-1)if result.markdown_v2:
    [](index.html.1.31.html#__codelineno-11-2)    md_res = result.markdown_v2
    [](index.html.1.31.html#__codelineno-11-3)    print("Raw MD:", md_res.raw_markdown[:300])
    [](index.html.1.31.html#__codelineno-11-4)    print("Citations MD:", md_res.markdown_with_citations[:300])
    [](index.html.1.31.html#__codelineno-11-5)    print("References:", md_res.references_markdown)
    [](index.html.1.31.html#__codelineno-11-6)    if md_res.fit_markdown:
    [](index.html.1.31.html#__codelineno-11-7)        print("Pruned text:", md_res.fit_markdown[:300])
    

### 3.3 **`markdown`** _(Optional[Union[str, MarkdownGenerationResult]])_

**What** : In future versions, `markdown` will fully replace `markdown_v2`. Right now, it might be a `str` or a `MarkdownGenerationResult`.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-12-1)# Soon, you might see:
    [](index.html.1.31.html#__codelineno-12-2)if isinstance(result.markdown, MarkdownGenerationResult):
    [](index.html.1.31.html#__codelineno-12-3)    print(result.markdown.raw_markdown[:200])
    [](index.html.1.31.html#__codelineno-12-4)else:
    [](index.html.1.31.html#__codelineno-12-5)    print(result.markdown)
    

### 3.4 **`fit_markdown`** _(Optional[str])_

**What** : A direct reference to the final filtered markdown (legacy approach).  
**When** : This is set if a filter or content strategy explicitly writes there. Usually overshadowed by `markdown_v2.fit_markdown`.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-13-1)print(result.fit_markdown)  # Legacy field, prefer result.markdown_v2.fit_markdown
    

**Important** : “Fit” content (in `fit_markdown`/`fit_html`) only exists if you used a **filter** (like **PruningContentFilter** or **BM25ContentFilter**) within a `MarkdownGenerationStrategy`.

* * *

## 4\. Media & Links

### 4.1 **`media`** _(Dict[str, List[Dict]])_

**What** : Contains info about discovered images, videos, or audio. Typically keys: `"images"`, `"videos"`, `"audios"`.  
**Common Fields** in each item:

  * `src` _(str)_ : Media URL 
  * `alt` or `title` _(str)_ : Descriptive text 
  * `score` _(float)_ : Relevance score if the crawler’s heuristic found it “important” 
  * `desc` or `description` _(Optional[str])_ : Additional context extracted from surrounding text 



**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-14-1)images = result.media.get("images", [])
    [](index.html.1.31.html#__codelineno-14-2)for img in images:
    [](index.html.1.31.html#__codelineno-14-3)    if img.get("score", 0) > 5:
    [](index.html.1.31.html#__codelineno-14-4)        print("High-value image:", img["src"])
    

### 4.2 **`links`** _(Dict[str, List[Dict]])_

**What** : Holds internal and external link data. Usually two keys: `"internal"` and `"external"`.  
**Common Fields** :

  * `href` _(str)_ : The link target 
  * `text` _(str)_ : Link text 
  * `title` _(str)_ : Title attribute 
  * `context` _(str)_ : Surrounding text snippet 
  * `domain` _(str)_ : If external, the domain



**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-15-1)for link in result.links["internal"]:
    [](index.html.1.31.html#__codelineno-15-2)    print(f"Internal link to {link['href']} with text {link['text']}")
    

* * *

## 5\. Additional Fields

### 5.1 **`extracted_content`** _(Optional[str])_

**What** : If you used **`extraction_strategy`** (CSS, LLM, etc.), the structured output (JSON).  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-16-1)if result.extracted_content:
    [](index.html.1.31.html#__codelineno-16-2)    data = json.loads(result.extracted_content)
    [](index.html.1.31.html#__codelineno-16-3)    print(data)
    

### 5.2 **`downloaded_files`** _(Optional[List[str]])_

**What** : If `accept_downloads=True` in your `BrowserConfig` \+ `downloads_path`, lists local file paths for downloaded items.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-17-1)if result.downloaded_files:
    [](index.html.1.31.html#__codelineno-17-2)    for file_path in result.downloaded_files:
    [](index.html.1.31.html#__codelineno-17-3)        print("Downloaded:", file_path)
    

### 5.3 **`screenshot`** _(Optional[str])_

**What** : Base64-encoded screenshot if `screenshot=True` in `CrawlerRunConfig`.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-18-1)import base64
    [](index.html.1.31.html#__codelineno-18-2)if result.screenshot:
    [](index.html.1.31.html#__codelineno-18-3)    with open("page.png", "wb") as f:
    [](index.html.1.31.html#__codelineno-18-4)        f.write(base64.b64decode(result.screenshot))
    

### 5.4 **`pdf`** _(Optional[bytes])_

**What** : Raw PDF bytes if `pdf=True` in `CrawlerRunConfig`.  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-19-1)if result.pdf:
    [](index.html.1.31.html#__codelineno-19-2)    with open("page.pdf", "wb") as f:
    [](index.html.1.31.html#__codelineno-19-3)        f.write(result.pdf)
    

### 5.5 **`metadata`** _(Optional[dict])_

**What** : Page-level metadata if discovered (title, description, OG data, etc.).  
**Usage** : 
    
    
    [](index.html.1.31.html#__codelineno-20-1)if result.metadata:
    [](index.html.1.31.html#__codelineno-20-2)    print("Title:", result.metadata.get("title"))
    [](index.html.1.31.html#__codelineno-20-3)    print("Author:", result.metadata.get("author"))
    

* * *

## 6\. Example: Accessing Everything
    
    
    [](index.html.1.31.html#__codelineno-21-1)async def handle_result(result: CrawlResult):
    [](index.html.1.31.html#__codelineno-21-2)    if not result.success:
    [](index.html.1.31.html#__codelineno-21-3)        print("Crawl error:", result.error_message)
    [](index.html.1.31.html#__codelineno-21-4)        return
    [](index.html.1.31.html#__codelineno-21-5)
    [](index.html.1.31.html#__codelineno-21-6)    # Basic info
    [](index.html.1.31.html#__codelineno-21-7)    print("Crawled URL:", result.url)
    [](index.html.1.31.html#__codelineno-21-8)    print("Status code:", result.status_code)
    [](index.html.1.31.html#__codelineno-21-9)
    [](index.html.1.31.html#__codelineno-21-10)    # HTML
    [](index.html.1.31.html#__codelineno-21-11)    print("Original HTML size:", len(result.html))
    [](index.html.1.31.html#__codelineno-21-12)    print("Cleaned HTML size:", len(result.cleaned_html or ""))
    [](index.html.1.31.html#__codelineno-21-13)
    [](index.html.1.31.html#__codelineno-21-14)    # Markdown output
    [](index.html.1.31.html#__codelineno-21-15)    if result.markdown_v2:
    [](index.html.1.31.html#__codelineno-21-16)        print("Raw Markdown:", result.markdown_v2.raw_markdown[:300])
    [](index.html.1.31.html#__codelineno-21-17)        print("Citations Markdown:", result.markdown_v2.markdown_with_citations[:300])
    [](index.html.1.31.html#__codelineno-21-18)        if result.markdown_v2.fit_markdown:
    [](index.html.1.31.html#__codelineno-21-19)            print("Fit Markdown:", result.markdown_v2.fit_markdown[:200])
    [](index.html.1.31.html#__codelineno-21-20)    else:
    [](index.html.1.31.html#__codelineno-21-21)        print("Raw Markdown (legacy):", result.markdown[:200] if result.markdown else "N/A")
    [](index.html.1.31.html#__codelineno-21-22)
    [](index.html.1.31.html#__codelineno-21-23)    # Media & Links
    [](index.html.1.31.html#__codelineno-21-24)    if "images" in result.media:
    [](index.html.1.31.html#__codelineno-21-25)        print("Image count:", len(result.media["images"]))
    [](index.html.1.31.html#__codelineno-21-26)    if "internal" in result.links:
    [](index.html.1.31.html#__codelineno-21-27)        print("Internal link count:", len(result.links["internal"]))
    [](index.html.1.31.html#__codelineno-21-28)
    [](index.html.1.31.html#__codelineno-21-29)    # Extraction strategy result
    [](index.html.1.31.html#__codelineno-21-30)    if result.extracted_content:
    [](index.html.1.31.html#__codelineno-21-31)        print("Structured data:", result.extracted_content)
    [](index.html.1.31.html#__codelineno-21-32)
    [](index.html.1.31.html#__codelineno-21-33)    # Screenshot/PDF
    [](index.html.1.31.html#__codelineno-21-34)    if result.screenshot:
    [](index.html.1.31.html#__codelineno-21-35)        print("Screenshot length:", len(result.screenshot))
    [](index.html.1.31.html#__codelineno-21-36)    if result.pdf:
    [](index.html.1.31.html#__codelineno-21-37)        print("PDF bytes length:", len(result.pdf))
    

* * *

## 7\. Key Points & Future

1\. **`markdown_v2` vs `markdown`**  
\- Right now, `markdown_v2` is the more robust container (`MarkdownGenerationResult`), providing **raw_markdown** , **markdown_with_citations** , references, plus possible **fit_markdown**.  
\- In future versions, everything will unify under **`markdown`**. If you rely on advanced features (citations, fit content), check `markdown_v2`.

2\. **Fit Content**  
\- **`fit_markdown`** and **`fit_html`** appear only if you used a content filter (like **PruningContentFilter** or **BM25ContentFilter**) inside your **MarkdownGenerationStrategy** or set them directly.  
\- If no filter is used, they remain `None`.

3\. **References & Citations**  
\- If you enable link citations in your `DefaultMarkdownGenerator` (`options={"citations": True}`), you’ll see `markdown_with_citations` plus a **`references_markdown`** block. This helps large language models or academic-like referencing.

4\. **Links & Media**  
\- `links["internal"]` and `links["external"]` group discovered anchors by domain.  
\- `media["images"]` / `["videos"]` / `["audios"]` store extracted media elements with optional scoring or context.

5\. **Error Cases**  
\- If `success=False`, check `error_message` (e.g., timeouts, invalid URLs).  
\- `status_code` might be `None` if we failed before an HTTP response.

Use **`CrawlResult`** to glean all final outputs and feed them into your data pipelines, AI models, or archives. With the synergy of a properly configured **BrowserConfig** and **CrawlerRunConfig** , the crawler can produce robust, structured results here in **`CrawlResult`**.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
