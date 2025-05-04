[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.5.html#)



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
    * Crawler Result
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
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [Crawl Result and Output](index.html.1.5.html#crawl-result-and-output)
  * [1\. The CrawlResult Model](index.html.1.5.html#1-the-crawlresult-model)
  * [2\. HTML Variants](index.html.1.5.html#2-html-variants)
  * [3\. Markdown Generation](index.html.1.5.html#3-markdown-generation)
  * [4\. Structured Extraction: extracted_content](index.html.1.5.html#4-structured-extraction-extracted_content)
  * [5\. More Fields: Links, Media, and More](index.html.1.5.html#5-more-fields-links-media-and-more)
  * [6\. Accessing These Fields](index.html.1.5.html#6-accessing-these-fields)
  * [7\. Next Steps](index.html.1.5.html#7-next-steps)



# Crawl Result and Output

When you call `arun()` on a page, Crawl4AI returns a **`CrawlResult`** object containing everything you might need—raw HTML, a cleaned version, optional screenshots or PDFs, structured extraction results, and more. This document explains those fields and how they map to different output types. 

* * *

## 1\. The `CrawlResult` Model

Below is the core schema. Each field captures a different aspect of the crawl’s result:
    
    
    [](index.html.1.5.html#__codelineno-0-1)class MarkdownGenerationResult(BaseModel):
    [](index.html.1.5.html#__codelineno-0-2)    raw_markdown: str
    [](index.html.1.5.html#__codelineno-0-3)    markdown_with_citations: str
    [](index.html.1.5.html#__codelineno-0-4)    references_markdown: str
    [](index.html.1.5.html#__codelineno-0-5)    fit_markdown: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-6)    fit_html: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-7)
    [](index.html.1.5.html#__codelineno-0-8)class CrawlResult(BaseModel):
    [](index.html.1.5.html#__codelineno-0-9)    url: str
    [](index.html.1.5.html#__codelineno-0-10)    html: str
    [](index.html.1.5.html#__codelineno-0-11)    success: bool
    [](index.html.1.5.html#__codelineno-0-12)    cleaned_html: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-13)    media: Dict[str, List[Dict]] = {}
    [](index.html.1.5.html#__codelineno-0-14)    links: Dict[str, List[Dict]] = {}
    [](index.html.1.5.html#__codelineno-0-15)    downloaded_files: Optional[List[str]] = None
    [](index.html.1.5.html#__codelineno-0-16)    screenshot: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-17)    pdf : Optional[bytes] = None
    [](index.html.1.5.html#__codelineno-0-18)    markdown: Optional[Union[str, MarkdownGenerationResult]] = None
    [](index.html.1.5.html#__codelineno-0-19)    markdown_v2: Optional[MarkdownGenerationResult] = None
    [](index.html.1.5.html#__codelineno-0-20)    extracted_content: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-21)    metadata: Optional[dict] = None
    [](index.html.1.5.html#__codelineno-0-22)    error_message: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-23)    session_id: Optional[str] = None
    [](index.html.1.5.html#__codelineno-0-24)    response_headers: Optional[dict] = None
    [](index.html.1.5.html#__codelineno-0-25)    status_code: Optional[int] = None
    [](index.html.1.5.html#__codelineno-0-26)    ssl_certificate: Optional[SSLCertificate] = None
    [](index.html.1.5.html#__codelineno-0-27)    class Config:
    [](index.html.1.5.html#__codelineno-0-28)        arbitrary_types_allowed = True
    

### Table: Key Fields in `CrawlResult`

Field (Name & Type) | Description  
---|---  
**url (`str`)** | The final or actual URL crawled (in case of redirects).  
**html (`str`)** | Original, unmodified page HTML. Good for debugging or custom processing.  
**success (`bool`)** | `True` if the crawl completed without major errors, else `False`.  
**cleaned_html (`Optional[str]`)** | Sanitized HTML with scripts/styles removed; can exclude tags if configured via `excluded_tags` etc.  
**media (`Dict[str, List[Dict]]`)** | Extracted media info (images, audio, etc.), each with attributes like `src`, `alt`, `score`, etc.  
**links (`Dict[str, List[Dict]]`)** | Extracted link data, split by `internal` and `external`. Each link usually has `href`, `text`, etc.  
**downloaded_files (`Optional[List[str]]`)** | If `accept_downloads=True` in `BrowserConfig`, this lists the filepaths of saved downloads.  
**screenshot (`Optional[str]`)** | Screenshot of the page (base64-encoded) if `screenshot=True`.  
**pdf (`Optional[bytes]`)** | PDF of the page if `pdf=True`.  
**markdown (`Optional[str or MarkdownGenerationResult]`)** | For now, `markdown_v2` holds a `MarkdownGenerationResult`. Over time, this will be consolidated into `markdown`. The generator can provide raw markdown, citations, references, and optionally `fit_markdown`.  
**markdown_v2 (`Optional[MarkdownGenerationResult]`)** | Legacy field for detailed markdown output. This will be replaced by `markdown` soon.  
**extracted_content (`Optional[str]`)** | The output of a structured extraction (CSS/LLM-based) stored as JSON string or other text.  
**metadata (`Optional[dict]`)** | Additional info about the crawl or extracted data.  
**error_message (`Optional[str]`)** | If `success=False`, contains a short description of what went wrong.  
**session_id (`Optional[str]`)** | The ID of the session used for multi-page or persistent crawling.  
**response_headers (`Optional[dict]`)** | HTTP response headers, if captured.  
**status_code (`Optional[int]`)** | HTTP status code (e.g., 200 for OK).  
**ssl_certificate (`Optional[SSLCertificate]`)** | SSL certificate info if `fetch_ssl_certificate=True`.  
  
* * *

## 2\. HTML Variants

### `html`: Raw HTML

Crawl4AI preserves the exact HTML as `result.html`. Useful for:

  * Debugging page issues or checking the original content.
  * Performing your own specialized parse if needed.



### `cleaned_html`: Sanitized

If you specify any cleanup or exclusion parameters in `CrawlerRunConfig` (like `excluded_tags`, `remove_forms`, etc.), you’ll see the result here:
    
    
    [](index.html.1.5.html#__codelineno-1-1)config = CrawlerRunConfig(
    [](index.html.1.5.html#__codelineno-1-2)    excluded_tags=["form", "header", "footer"],
    [](index.html.1.5.html#__codelineno-1-3)    keep_data_attributes=False
    [](index.html.1.5.html#__codelineno-1-4))
    [](index.html.1.5.html#__codelineno-1-5)result = await crawler.arun("https://example.com", config=config)
    [](index.html.1.5.html#__codelineno-1-6)print(result.cleaned_html)  # Freed of forms, header, footer, data-* attributes
    

* * *

## 3\. Markdown Generation

### 3.1 `markdown_v2` (Legacy) vs `markdown`

  * **`markdown_v2`** : The current location for detailed markdown output, returning a **`MarkdownGenerationResult`** object. 
  * **`markdown`** : Eventually, we’re merging these fields. For now, you might see `result.markdown_v2` used widely in code examples.



**`MarkdownGenerationResult`** Fields:

Field | Description  
---|---  
**raw_markdown** | The basic HTML→Markdown conversion.  
**markdown_with_citations** | Markdown including inline citations that reference links at the end.  
**references_markdown** | The references/citations themselves (if `citations=True`).  
**fit_markdown** | The filtered/“fit” markdown if a content filter was used.  
**fit_html** | The filtered HTML that generated `fit_markdown`.  
  
### 3.2 Basic Example with a Markdown Generator
    
    
    [](index.html.1.5.html#__codelineno-2-1)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.5.html#__codelineno-2-2)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.5.html#__codelineno-2-3)
    [](index.html.1.5.html#__codelineno-2-4)config = CrawlerRunConfig(
    [](index.html.1.5.html#__codelineno-2-5)    markdown_generator=DefaultMarkdownGenerator(
    [](index.html.1.5.html#__codelineno-2-6)        options={"citations": True, "body_width": 80}  # e.g. pass html2text style options
    [](index.html.1.5.html#__codelineno-2-7)    )
    [](index.html.1.5.html#__codelineno-2-8))
    [](index.html.1.5.html#__codelineno-2-9)result = await crawler.arun(url="https://example.com", config=config)
    [](index.html.1.5.html#__codelineno-2-10)
    [](index.html.1.5.html#__codelineno-2-11)md_res = result.markdown_v2  # or eventually 'result.markdown'
    [](index.html.1.5.html#__codelineno-2-12)print(md_res.raw_markdown[:500])
    [](index.html.1.5.html#__codelineno-2-13)print(md_res.markdown_with_citations)
    [](index.html.1.5.html#__codelineno-2-14)print(md_res.references_markdown)
    

**Note** : If you use a filter like `PruningContentFilter`, you’ll get `fit_markdown` and `fit_html` as well.

* * *

## 4\. Structured Extraction: `extracted_content`

If you run a JSON-based extraction strategy (CSS, XPath, LLM, etc.), the structured data is **not** stored in `markdown`—it’s placed in **`result.extracted_content`** as a JSON string (or sometimes plain text).

### Example: CSS Extraction with `raw://` HTML
    
    
    [](index.html.1.5.html#__codelineno-3-1)import asyncio
    [](index.html.1.5.html#__codelineno-3-2)import json
    [](index.html.1.5.html#__codelineno-3-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.5.html#__codelineno-3-4)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.5.html#__codelineno-3-5)
    [](index.html.1.5.html#__codelineno-3-6)async def main():
    [](index.html.1.5.html#__codelineno-3-7)    schema = {
    [](index.html.1.5.html#__codelineno-3-8)        "name": "Example Items",
    [](index.html.1.5.html#__codelineno-3-9)        "baseSelector": "div.item",
    [](index.html.1.5.html#__codelineno-3-10)        "fields": [
    [](index.html.1.5.html#__codelineno-3-11)            {"name": "title", "selector": "h2", "type": "text"},
    [](index.html.1.5.html#__codelineno-3-12)            {"name": "link", "selector": "a", "type": "attribute", "attribute": "href"}
    [](index.html.1.5.html#__codelineno-3-13)        ]
    [](index.html.1.5.html#__codelineno-3-14)    }
    [](index.html.1.5.html#__codelineno-3-15)    raw_html = "<div class='item'><h2>Item 1</h2><a href='https://example.com/item1'>Link 1</a></div>"
    [](index.html.1.5.html#__codelineno-3-16)
    [](index.html.1.5.html#__codelineno-3-17)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.5.html#__codelineno-3-18)        result = await crawler.arun(
    [](index.html.1.5.html#__codelineno-3-19)            url="raw://" + raw_html,
    [](index.html.1.5.html#__codelineno-3-20)            config=CrawlerRunConfig(
    [](index.html.1.5.html#__codelineno-3-21)                cache_mode=CacheMode.BYPASS,
    [](index.html.1.5.html#__codelineno-3-22)                extraction_strategy=JsonCssExtractionStrategy(schema)
    [](index.html.1.5.html#__codelineno-3-23)            )
    [](index.html.1.5.html#__codelineno-3-24)        )
    [](index.html.1.5.html#__codelineno-3-25)        data = json.loads(result.extracted_content)
    [](index.html.1.5.html#__codelineno-3-26)        print(data)
    [](index.html.1.5.html#__codelineno-3-27)
    [](index.html.1.5.html#__codelineno-3-28)if __name__ == "__main__":
    [](index.html.1.5.html#__codelineno-3-29)    asyncio.run(main())
    

Here: \- `url="raw://..."` passes the HTML content directly, no network requests.  
\- The **CSS** extraction strategy populates `result.extracted_content` with the JSON array `[{"title": "...", "link": "..."}]`.

* * *

## 5\. More Fields: Links, Media, and More

### 5.1 `links`

A dictionary, typically with `"internal"` and `"external"` lists. Each entry might have `href`, `text`, `title`, etc. This is automatically captured if you haven’t disabled link extraction.
    
    
    [](index.html.1.5.html#__codelineno-4-1)print(result.links["internal"][:3])  # Show first 3 internal links
    

### 5.2 `media`

Similarly, a dictionary with `"images"`, `"audio"`, `"video"`, etc. Each item could include `src`, `alt`, `score`, and more, if your crawler is set to gather them.
    
    
    [](index.html.1.5.html#__codelineno-5-1)images = result.media.get("images", [])
    [](index.html.1.5.html#__codelineno-5-2)for img in images:
    [](index.html.1.5.html#__codelineno-5-3)    print("Image URL:", img["src"], "Alt:", img.get("alt"))
    

### 5.3 `screenshot` and `pdf`

If you set `screenshot=True` or `pdf=True` in **`CrawlerRunConfig`** , then:

  * `result.screenshot` contains a base64-encoded PNG string. 
  * `result.pdf` contains raw PDF bytes (you can write them to a file).


    
    
    [](index.html.1.5.html#__codelineno-6-1)with open("page.pdf", "wb") as f:
    [](index.html.1.5.html#__codelineno-6-2)    f.write(result.pdf)
    

### 5.4 `ssl_certificate`

If `fetch_ssl_certificate=True`, `result.ssl_certificate` holds details about the site’s SSL cert, such as issuer, validity dates, etc.

* * *

## 6\. Accessing These Fields

After you run:
    
    
    [](index.html.1.5.html#__codelineno-7-1)result = await crawler.arun(url="https://example.com", config=some_config)
    

Check any field:
    
    
    [](index.html.1.5.html#__codelineno-8-1)if result.success:
    [](index.html.1.5.html#__codelineno-8-2)    print(result.status_code, result.response_headers)
    [](index.html.1.5.html#__codelineno-8-3)    print("Links found:", len(result.links.get("internal", [])))
    [](index.html.1.5.html#__codelineno-8-4)    if result.markdown_v2:
    [](index.html.1.5.html#__codelineno-8-5)        print("Markdown snippet:", result.markdown_v2.raw_markdown[:200])
    [](index.html.1.5.html#__codelineno-8-6)    if result.extracted_content:
    [](index.html.1.5.html#__codelineno-8-7)        print("Structured JSON:", result.extracted_content)
    [](index.html.1.5.html#__codelineno-8-8)else:
    [](index.html.1.5.html#__codelineno-8-9)    print("Error:", result.error_message)
    

**Remember** : Use `result.markdown_v2` for now. It will eventually become `result.markdown`.

* * *

## 7\. Next Steps

  * **Markdown Generation** : Dive deeper into how to configure `DefaultMarkdownGenerator` and various filters. 
  * **Content Filtering** : Learn how to use `BM25ContentFilter` and `PruningContentFilter`.
  * **Session & Hooks**: If you want to manipulate the page or preserve state across multiple `arun()` calls, see the hooking or session docs. 
  * **LLM Extraction** : For complex or unstructured content requiring AI-driven parsing, check the LLM-based strategies doc.



**Enjoy** exploring all that `CrawlResult` offers—whether you need raw HTML, sanitized output, markdown, or fully structured data, Crawl4AI has you covered!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
