[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.28.html#)



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
    * AsyncWebCrawler
    * [arun()](index.html.1.29.md)
    * [Browser & Crawler Config](index.html.1.30.md)
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [AsyncWebCrawler](index.html.1.28.html#asyncwebcrawler)
  * [1\. Constructor Overview](index.html.1.28.html#1-constructor-overview)
  * [2\. Lifecycle: Start/Close or Context Manager](index.html.1.28.html#2-lifecycle-startclose-or-context-manager)
  * [3\. Primary Method: arun()](index.html.1.28.html#3-primary-method-arun)
  * [4\. Helper Methods](index.html.1.28.html#4-helper-methods)
  * [5\. CrawlResult Output](index.html.1.28.html#5-crawlresult-output)
  * [6\. Quick Example](index.html.1.28.html#6-quick-example)
  * [7\. Best Practices & Migration Notes](index.html.1.28.html#7-best-practices-migration-notes)
  * [8\. Summary](index.html.1.28.html#8-summary)



# AsyncWebCrawler

The **`AsyncWebCrawler`** is the core class for asynchronous web crawling in Crawl4AI. You typically create it **once** , optionally customize it with a **`BrowserConfig`** (e.g., headless, user agent), then **run** multiple **`arun()`** calls with different **`CrawlerRunConfig`** objects.

**Recommended usage** : 1\. **Create** a `BrowserConfig` for global browser settings.  
2\. **Instantiate** `AsyncWebCrawler(config=browser_config)`.  
3\. **Use** the crawler in an async context manager (`async with`) or manage start/close manually.  
4\. **Call** `arun(url, config=crawler_run_config)` for each page you want.

* * *

## 1\. Constructor Overview
    
    
    [](index.html.1.28.html#__codelineno-0-1)class AsyncWebCrawler:
    [](index.html.1.28.html#__codelineno-0-2)    def __init__(
    [](index.html.1.28.html#__codelineno-0-3)        self,
    [](index.html.1.28.html#__codelineno-0-4)        crawler_strategy: Optional[AsyncCrawlerStrategy] = None,
    [](index.html.1.28.html#__codelineno-0-5)        config: Optional[BrowserConfig] = None,
    [](index.html.1.28.html#__codelineno-0-6)        always_bypass_cache: bool = False,           # deprecated
    [](index.html.1.28.html#__codelineno-0-7)        always_by_pass_cache: Optional[bool] = None, # also deprecated
    [](index.html.1.28.html#__codelineno-0-8)        base_directory: str = ...,
    [](index.html.1.28.html#__codelineno-0-9)        thread_safe: bool = False,
    [](index.html.1.28.html#__codelineno-0-10)        **kwargs,
    [](index.html.1.28.html#__codelineno-0-11)    ):
    [](index.html.1.28.html#__codelineno-0-12)        """
    [](index.html.1.28.html#__codelineno-0-13)        Create an AsyncWebCrawler instance.
    [](index.html.1.28.html#__codelineno-0-14)
    [](index.html.1.28.html#__codelineno-0-15)        Args:
    [](index.html.1.28.html#__codelineno-0-16)            crawler_strategy: 
    [](index.html.1.28.html#__codelineno-0-17)                (Advanced) Provide a custom crawler strategy if needed.
    [](index.html.1.28.html#__codelineno-0-18)            config: 
    [](index.html.1.28.html#__codelineno-0-19)                A BrowserConfig object specifying how the browser is set up.
    [](index.html.1.28.html#__codelineno-0-20)            always_bypass_cache: 
    [](index.html.1.28.html#__codelineno-0-21)                (Deprecated) Use CrawlerRunConfig.cache_mode instead.
    [](index.html.1.28.html#__codelineno-0-22)            base_directory:     
    [](index.html.1.28.html#__codelineno-0-23)                Folder for storing caches/logs (if relevant).
    [](index.html.1.28.html#__codelineno-0-24)            thread_safe: 
    [](index.html.1.28.html#__codelineno-0-25)                If True, attempts some concurrency safeguards. Usually False.
    [](index.html.1.28.html#__codelineno-0-26)            **kwargs: 
    [](index.html.1.28.html#__codelineno-0-27)                Additional legacy or debugging parameters.
    [](index.html.1.28.html#__codelineno-0-28)        """
    [](index.html.1.28.html#__codelineno-0-29)    )
    [](index.html.1.28.html#__codelineno-0-30)
    [](index.html.1.28.html#__codelineno-0-31)### Typical Initialization
    [](index.html.1.28.html#__codelineno-0-32)
    [](index.html.1.28.html#__codelineno-0-33)```python
    [](index.html.1.28.html#__codelineno-0-34)from crawl4ai import AsyncWebCrawler, BrowserConfig
    [](index.html.1.28.html#__codelineno-0-35)
    [](index.html.1.28.html#__codelineno-0-36)browser_cfg = BrowserConfig(
    [](index.html.1.28.html#__codelineno-0-37)    browser_type="chromium",
    [](index.html.1.28.html#__codelineno-0-38)    headless=True,
    [](index.html.1.28.html#__codelineno-0-39)    verbose=True
    [](index.html.1.28.html#__codelineno-0-40))
    [](index.html.1.28.html#__codelineno-0-41)
    [](index.html.1.28.html#__codelineno-0-42)crawler = AsyncWebCrawler(config=browser_cfg)
    

**Notes** : \- **Legacy** parameters like `always_bypass_cache` remain for backward compatibility, but prefer to set **caching** in `CrawlerRunConfig`.

* * *

## 2\. Lifecycle: Start/Close or Context Manager

### 2.1 Context Manager (Recommended)
    
    
    [](index.html.1.28.html#__codelineno-1-1)async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.28.html#__codelineno-1-2)    result = await crawler.arun("https://example.com")
    [](index.html.1.28.html#__codelineno-1-3)    # The crawler automatically starts/closes resources
    

When the `async with` block ends, the crawler cleans up (closes the browser, etc.).

### 2.2 Manual Start & Close
    
    
    [](index.html.1.28.html#__codelineno-2-1)crawler = AsyncWebCrawler(config=browser_cfg)
    [](index.html.1.28.html#__codelineno-2-2)await crawler.start()
    [](index.html.1.28.html#__codelineno-2-3)
    [](index.html.1.28.html#__codelineno-2-4)result1 = await crawler.arun("https://example.com")
    [](index.html.1.28.html#__codelineno-2-5)result2 = await crawler.arun("https://another.com")
    [](index.html.1.28.html#__codelineno-2-6)
    [](index.html.1.28.html#__codelineno-2-7)await crawler.close()
    

Use this style if you have a **long-running** application or need full control of the crawler’s lifecycle.

* * *

## 3\. Primary Method: `arun()`
    
    
    [](index.html.1.28.html#__codelineno-3-1)async def arun(
    [](index.html.1.28.html#__codelineno-3-2)    self,
    [](index.html.1.28.html#__codelineno-3-3)    url: str,
    [](index.html.1.28.html#__codelineno-3-4)    config: Optional[CrawlerRunConfig] = None,
    [](index.html.1.28.html#__codelineno-3-5)    # Legacy parameters for backward compatibility...
    [](index.html.1.28.html#__codelineno-3-6)) -> CrawlResult:
    [](index.html.1.28.html#__codelineno-3-7)    ...
    

### 3.1 New Approach

You pass a `CrawlerRunConfig` object that sets up everything about a crawl—content filtering, caching, session reuse, JS code, screenshots, etc.
    
    
    [](index.html.1.28.html#__codelineno-4-1)import asyncio
    [](index.html.1.28.html#__codelineno-4-2)from crawl4ai import CrawlerRunConfig, CacheMode
    [](index.html.1.28.html#__codelineno-4-3)
    [](index.html.1.28.html#__codelineno-4-4)run_cfg = CrawlerRunConfig(
    [](index.html.1.28.html#__codelineno-4-5)    cache_mode=CacheMode.BYPASS,
    [](index.html.1.28.html#__codelineno-4-6)    css_selector="main.article",
    [](index.html.1.28.html#__codelineno-4-7)    word_count_threshold=10,
    [](index.html.1.28.html#__codelineno-4-8)    screenshot=True
    [](index.html.1.28.html#__codelineno-4-9))
    [](index.html.1.28.html#__codelineno-4-10)
    [](index.html.1.28.html#__codelineno-4-11)async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.28.html#__codelineno-4-12)    result = await crawler.arun("https://example.com/news", config=run_cfg)
    [](index.html.1.28.html#__codelineno-4-13)    print("Crawled HTML length:", len(result.cleaned_html))
    [](index.html.1.28.html#__codelineno-4-14)    if result.screenshot:
    [](index.html.1.28.html#__codelineno-4-15)        print("Screenshot base64 length:", len(result.screenshot))
    

### 3.2 Legacy Parameters Still Accepted

For **backward** compatibility, `arun()` can still accept direct arguments like `css_selector=...`, `word_count_threshold=...`, etc., but we strongly advise migrating them into a **`CrawlerRunConfig`**.

* * *

## 4\. Helper Methods

### 4.1 `arun_many()`
    
    
    [](index.html.1.28.html#__codelineno-5-1)async def arun_many(
    [](index.html.1.28.html#__codelineno-5-2)    self,
    [](index.html.1.28.html#__codelineno-5-3)    urls: List[str],
    [](index.html.1.28.html#__codelineno-5-4)    config: Optional[CrawlerRunConfig] = None,
    [](index.html.1.28.html#__codelineno-5-5)    # Legacy parameters...
    [](index.html.1.28.html#__codelineno-5-6)) -> List[CrawlResult]:
    [](index.html.1.28.html#__codelineno-5-7)    ...
    

Crawls multiple URLs in concurrency. Accepts the same style `CrawlerRunConfig`. Example:
    
    
    [](index.html.1.28.html#__codelineno-6-1)run_cfg = CrawlerRunConfig(
    [](index.html.1.28.html#__codelineno-6-2)    # e.g., concurrency, wait_for, caching, extraction, etc.
    [](index.html.1.28.html#__codelineno-6-3)    semaphore_count=5
    [](index.html.1.28.html#__codelineno-6-4))
    [](index.html.1.28.html#__codelineno-6-5)
    [](index.html.1.28.html#__codelineno-6-6)async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.28.html#__codelineno-6-7)    results = await crawler.arun_many(
    [](index.html.1.28.html#__codelineno-6-8)        urls=["https://example.com", "https://another.com"],
    [](index.html.1.28.html#__codelineno-6-9)        config=run_cfg
    [](index.html.1.28.html#__codelineno-6-10)    )
    [](index.html.1.28.html#__codelineno-6-11)    for r in results:
    [](index.html.1.28.html#__codelineno-6-12)        print(r.url, ":", len(r.cleaned_html))
    

### 4.2 `start()` & `close()`

Allows manual lifecycle usage instead of context manager:
    
    
    [](index.html.1.28.html#__codelineno-7-1)crawler = AsyncWebCrawler(config=browser_cfg)
    [](index.html.1.28.html#__codelineno-7-2)await crawler.start()
    [](index.html.1.28.html#__codelineno-7-3)
    [](index.html.1.28.html#__codelineno-7-4)# Perform multiple operations
    [](index.html.1.28.html#__codelineno-7-5)resultA = await crawler.arun("https://exampleA.com", config=run_cfg)
    [](index.html.1.28.html#__codelineno-7-6)resultB = await crawler.arun("https://exampleB.com", config=run_cfg)
    [](index.html.1.28.html#__codelineno-7-7)
    [](index.html.1.28.html#__codelineno-7-8)await crawler.close()
    

* * *

## 5\. `CrawlResult` Output

Each `arun()` returns a **`CrawlResult`** containing:

  * `url`: Final URL (if redirected).
  * `html`: Original HTML.
  * `cleaned_html`: Sanitized HTML.
  * `markdown_v2` (or future `markdown`): Markdown outputs (raw, fit, etc.).
  * `extracted_content`: If an extraction strategy was used (JSON for CSS/LLM strategies).
  * `screenshot`, `pdf`: If screenshots/PDF requested.
  * `media`, `links`: Information about discovered images/links.
  * `success`, `error_message`: Status info.



For details, see [CrawlResult doc](index.html.1.31.md).

* * *

## 6\. Quick Example

Below is an example hooking it all together:
    
    
    [](index.html.1.28.html#__codelineno-8-1)import asyncio
    [](index.html.1.28.html#__codelineno-8-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.28.html#__codelineno-8-3)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.28.html#__codelineno-8-4)import json
    [](index.html.1.28.html#__codelineno-8-5)
    [](index.html.1.28.html#__codelineno-8-6)async def main():
    [](index.html.1.28.html#__codelineno-8-7)    # 1. Browser config
    [](index.html.1.28.html#__codelineno-8-8)    browser_cfg = BrowserConfig(
    [](index.html.1.28.html#__codelineno-8-9)        browser_type="firefox",
    [](index.html.1.28.html#__codelineno-8-10)        headless=False,
    [](index.html.1.28.html#__codelineno-8-11)        verbose=True
    [](index.html.1.28.html#__codelineno-8-12)    )
    [](index.html.1.28.html#__codelineno-8-13)
    [](index.html.1.28.html#__codelineno-8-14)    # 2. Run config
    [](index.html.1.28.html#__codelineno-8-15)    schema = {
    [](index.html.1.28.html#__codelineno-8-16)        "name": "Articles",
    [](index.html.1.28.html#__codelineno-8-17)        "baseSelector": "article.post",
    [](index.html.1.28.html#__codelineno-8-18)        "fields": [
    [](index.html.1.28.html#__codelineno-8-19)            {
    [](index.html.1.28.html#__codelineno-8-20)                "name": "title", 
    [](index.html.1.28.html#__codelineno-8-21)                "selector": "h2", 
    [](index.html.1.28.html#__codelineno-8-22)                "type": "text"
    [](index.html.1.28.html#__codelineno-8-23)            },
    [](index.html.1.28.html#__codelineno-8-24)            {
    [](index.html.1.28.html#__codelineno-8-25)                "name": "url", 
    [](index.html.1.28.html#__codelineno-8-26)                "selector": "a", 
    [](index.html.1.28.html#__codelineno-8-27)                "type": "attribute", 
    [](index.html.1.28.html#__codelineno-8-28)                "attribute": "href"
    [](index.html.1.28.html#__codelineno-8-29)            }
    [](index.html.1.28.html#__codelineno-8-30)        ]
    [](index.html.1.28.html#__codelineno-8-31)    }
    [](index.html.1.28.html#__codelineno-8-32)
    [](index.html.1.28.html#__codelineno-8-33)    run_cfg = CrawlerRunConfig(
    [](index.html.1.28.html#__codelineno-8-34)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.28.html#__codelineno-8-35)        extraction_strategy=JsonCssExtractionStrategy(schema),
    [](index.html.1.28.html#__codelineno-8-36)        word_count_threshold=15,
    [](index.html.1.28.html#__codelineno-8-37)        remove_overlay_elements=True,
    [](index.html.1.28.html#__codelineno-8-38)        wait_for="css:.post"  # Wait for posts to appear
    [](index.html.1.28.html#__codelineno-8-39)    )
    [](index.html.1.28.html#__codelineno-8-40)
    [](index.html.1.28.html#__codelineno-8-41)    async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.28.html#__codelineno-8-42)        result = await crawler.arun(
    [](index.html.1.28.html#__codelineno-8-43)            url="https://example.com/blog",
    [](index.html.1.28.html#__codelineno-8-44)            config=run_cfg
    [](index.html.1.28.html#__codelineno-8-45)        )
    [](index.html.1.28.html#__codelineno-8-46)
    [](index.html.1.28.html#__codelineno-8-47)        if result.success:
    [](index.html.1.28.html#__codelineno-8-48)            print("Cleaned HTML length:", len(result.cleaned_html))
    [](index.html.1.28.html#__codelineno-8-49)            if result.extracted_content:
    [](index.html.1.28.html#__codelineno-8-50)                articles = json.loads(result.extracted_content)
    [](index.html.1.28.html#__codelineno-8-51)                print("Extracted articles:", articles[:2])
    [](index.html.1.28.html#__codelineno-8-52)        else:
    [](index.html.1.28.html#__codelineno-8-53)            print("Error:", result.error_message)
    [](index.html.1.28.html#__codelineno-8-54)
    [](index.html.1.28.html#__codelineno-8-55)asyncio.run(main())
    

**Explanation** : \- We define a **`BrowserConfig`** with Firefox, no headless, and `verbose=True`.  
\- We define a **`CrawlerRunConfig`** that **bypasses cache** , uses a **CSS** extraction schema, has a `word_count_threshold=15`, etc.  
\- We pass them to `AsyncWebCrawler(config=...)` and `arun(url=..., config=...)`.

* * *

## 7\. Best Practices & Migration Notes

1\. **Use** `BrowserConfig` for **global** settings about the browser’s environment.  
2\. **Use** `CrawlerRunConfig` for **per-crawl** logic (caching, content filtering, extraction strategies, wait conditions).  
3\. **Avoid** legacy parameters like `css_selector` or `word_count_threshold` directly in `arun()`. Instead:
    
    
    [](index.html.1.28.html#__codelineno-9-1)run_cfg = CrawlerRunConfig(css_selector=".main-content", word_count_threshold=20)
    [](index.html.1.28.html#__codelineno-9-2)result = await crawler.arun(url="...", config=run_cfg)
    

4\. **Context Manager** usage is simplest unless you want a persistent crawler across many calls.

* * *

## 8\. Summary

**AsyncWebCrawler** is your entry point to asynchronous crawling:

  * **Constructor** accepts **`BrowserConfig`** (or defaults). 
  * **`arun(url, config=CrawlerRunConfig)`** is the main method for single-page crawls. 
  * **`arun_many(urls, config=CrawlerRunConfig)`** handles concurrency across multiple URLs. 
  * For advanced lifecycle control, use `start()` and `close()` explicitly. 



**Migration** :  
\- If you used `AsyncWebCrawler(browser_type="chromium", css_selector="...")`, move browser settings to `BrowserConfig(...)` and content/crawl logic to `CrawlerRunConfig(...)`.

This modular approach ensures your code is **clean** , **scalable** , and **easy to maintain**. For any advanced or rarely used parameters, see the [BrowserConfig docs](index.html.1.30.md).

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
