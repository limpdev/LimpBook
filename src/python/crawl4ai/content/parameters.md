[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.29.html#)



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
    * arun()
    * [Browser & Crawler Config](index.html.1.30.md)
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [arun() Parameter Guide (New Approach)](index.html.1.29.html#arun-parameter-guide-new-approach)
  * [1\. Core Usage](index.html.1.29.html#1-core-usage)
  * [2\. Cache Control](index.html.1.29.html#2-cache-control)
  * [3\. Content Processing & Selection](index.html.1.29.html#3-content-processing-selection)
  * [4\. Page Navigation & Timing](index.html.1.29.html#4-page-navigation-timing)
  * [5\. Session Management](index.html.1.29.html#5-session-management)
  * [6\. Screenshot, PDF & Media Options](index.html.1.29.html#6-screenshot-pdf-media-options)
  * [7\. Extraction Strategy](index.html.1.29.html#7-extraction-strategy)
  * [8\. Comprehensive Example](index.html.1.29.html#8-comprehensive-example)
  * [9\. Best Practices](index.html.1.29.html#9-best-practices)
  * [10\. Conclusion](index.html.1.29.html#10-conclusion)



# `arun()` Parameter Guide (New Approach)

In Crawl4AI’s **latest** configuration model, nearly all parameters that once went directly to `arun()` are now part of **`CrawlerRunConfig`**. When calling `arun()`, you provide:
    
    
    [](index.html.1.29.html#__codelineno-0-1)await crawler.arun(
    [](index.html.1.29.html#__codelineno-0-2)    url="https://example.com",  
    [](index.html.1.29.html#__codelineno-0-3)    config=my_run_config
    [](index.html.1.29.html#__codelineno-0-4))
    

Below is an organized look at the parameters that can go inside `CrawlerRunConfig`, divided by their functional areas. For **Browser** settings (e.g., `headless`, `browser_type`), see [BrowserConfig](index.html.1.30.md).

* * *

## 1\. Core Usage
    
    
    [](index.html.1.29.html#__codelineno-1-1)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.29.html#__codelineno-1-2)
    [](index.html.1.29.html#__codelineno-1-3)async def main():
    [](index.html.1.29.html#__codelineno-1-4)    run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-1-5)        verbose=True,            # Detailed logging
    [](index.html.1.29.html#__codelineno-1-6)        cache_mode=CacheMode.ENABLED,  # Use normal read/write cache
    [](index.html.1.29.html#__codelineno-1-7)        # ... other parameters
    [](index.html.1.29.html#__codelineno-1-8)    )
    [](index.html.1.29.html#__codelineno-1-9)
    [](index.html.1.29.html#__codelineno-1-10)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.29.html#__codelineno-1-11)        result = await crawler.arun(
    [](index.html.1.29.html#__codelineno-1-12)            url="https://example.com",
    [](index.html.1.29.html#__codelineno-1-13)            config=run_config
    [](index.html.1.29.html#__codelineno-1-14)        )
    [](index.html.1.29.html#__codelineno-1-15)        print(result.cleaned_html[:500])
    

**Key Fields** : \- `verbose=True` logs each crawl step.  
\- `cache_mode` decides how to read/write the local crawl cache.

* * *

## 2\. Cache Control

**`cache_mode`** (default: `CacheMode.ENABLED`)  
Use a built-in enum from `CacheMode`: \- `ENABLED`: Normal caching—reads if available, writes if missing. \- `DISABLED`: No caching—always refetch pages. \- `READ_ONLY`: Reads from cache only; no new writes. \- `WRITE_ONLY`: Writes to cache but doesn’t read existing data. \- `BYPASS`: Skips reading cache for this crawl (though it might still write if set up that way).
    
    
    [](index.html.1.29.html#__codelineno-2-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-2-2)    cache_mode=CacheMode.BYPASS
    [](index.html.1.29.html#__codelineno-2-3))
    

**Additional flags** : \- `bypass_cache=True` acts like `CacheMode.BYPASS`. \- `disable_cache=True` acts like `CacheMode.DISABLED`. \- `no_cache_read=True` acts like `CacheMode.WRITE_ONLY`. \- `no_cache_write=True` acts like `CacheMode.READ_ONLY`.

* * *

## 3\. Content Processing & Selection

### 3.1 Text Processing
    
    
    [](index.html.1.29.html#__codelineno-3-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-3-2)    word_count_threshold=10,   # Ignore text blocks <10 words
    [](index.html.1.29.html#__codelineno-3-3)    only_text=False,           # If True, tries to remove non-text elements
    [](index.html.1.29.html#__codelineno-3-4)    keep_data_attributes=False # Keep or discard data-* attributes
    [](index.html.1.29.html#__codelineno-3-5))
    

### 3.2 Content Selection
    
    
    [](index.html.1.29.html#__codelineno-4-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-4-2)    css_selector=".main-content",  # Focus on .main-content region only
    [](index.html.1.29.html#__codelineno-4-3)    excluded_tags=["form", "nav"], # Remove entire tag blocks
    [](index.html.1.29.html#__codelineno-4-4)    remove_forms=True,             # Specifically strip <form> elements
    [](index.html.1.29.html#__codelineno-4-5)    remove_overlay_elements=True,  # Attempt to remove modals/popups
    [](index.html.1.29.html#__codelineno-4-6))
    

### 3.3 Link Handling
    
    
    [](index.html.1.29.html#__codelineno-5-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-5-2)    exclude_external_links=True,         # Remove external links from final content
    [](index.html.1.29.html#__codelineno-5-3)    exclude_social_media_links=True,     # Remove links to known social sites
    [](index.html.1.29.html#__codelineno-5-4)    exclude_domains=["ads.example.com"], # Exclude links to these domains
    [](index.html.1.29.html#__codelineno-5-5)    exclude_social_media_domains=["facebook.com","twitter.com"], # Extend the default list
    [](index.html.1.29.html#__codelineno-5-6))
    

### 3.4 Media Filtering
    
    
    [](index.html.1.29.html#__codelineno-6-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-6-2)    exclude_external_images=True  # Strip images from other domains
    [](index.html.1.29.html#__codelineno-6-3))
    

* * *

## 4\. Page Navigation & Timing

### 4.1 Basic Browser Flow
    
    
    [](index.html.1.29.html#__codelineno-7-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-7-2)    wait_for="css:.dynamic-content", # Wait for .dynamic-content
    [](index.html.1.29.html#__codelineno-7-3)    delay_before_return_html=2.0,    # Wait 2s before capturing final HTML
    [](index.html.1.29.html#__codelineno-7-4)    page_timeout=60000,             # Navigation & script timeout (ms)
    [](index.html.1.29.html#__codelineno-7-5))
    

**Key Fields** : \- `wait_for`:  
\- `"css:selector"` or  
\- `"js:() => boolean"`  
e.g. `js:() => document.querySelectorAll('.item').length > 10`.

  * `mean_delay` & `max_range`: define random delays for `arun_many()` calls. 
  * `semaphore_count`: concurrency limit when crawling multiple URLs.



### 4.2 JavaScript Execution
    
    
    [](index.html.1.29.html#__codelineno-8-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-8-2)    js_code=[
    [](index.html.1.29.html#__codelineno-8-3)        "window.scrollTo(0, document.body.scrollHeight);",
    [](index.html.1.29.html#__codelineno-8-4)        "document.querySelector('.load-more')?.click();"
    [](index.html.1.29.html#__codelineno-8-5)    ],
    [](index.html.1.29.html#__codelineno-8-6)    js_only=False
    [](index.html.1.29.html#__codelineno-8-7))
    

  * `js_code` can be a single string or a list of strings. 
  * `js_only=True` means “I’m continuing in the same session with new JS steps, no new full navigation.”



### 4.3 Anti-Bot
    
    
    [](index.html.1.29.html#__codelineno-9-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-9-2)    magic=True,
    [](index.html.1.29.html#__codelineno-9-3)    simulate_user=True,
    [](index.html.1.29.html#__codelineno-9-4)    override_navigator=True
    [](index.html.1.29.html#__codelineno-9-5))
    

\- `magic=True` tries multiple stealth features.  
\- `simulate_user=True` mimics mouse movements or random delays.  
\- `override_navigator=True` fakes some navigator properties (like user agent checks).

* * *

## 5\. Session Management

**`session_id`** : 
    
    
    [](index.html.1.29.html#__codelineno-10-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-10-2)    session_id="my_session123"
    [](index.html.1.29.html#__codelineno-10-3))
    

If re-used in subsequent `arun()` calls, the same tab/page context is continued (helpful for multi-step tasks or stateful browsing).

* * *

## 6\. Screenshot, PDF & Media Options
    
    
    [](index.html.1.29.html#__codelineno-11-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-11-2)    screenshot=True,             # Grab a screenshot as base64
    [](index.html.1.29.html#__codelineno-11-3)    screenshot_wait_for=1.0,     # Wait 1s before capturing
    [](index.html.1.29.html#__codelineno-11-4)    pdf=True,                    # Also produce a PDF
    [](index.html.1.29.html#__codelineno-11-5)    image_description_min_word_threshold=5,  # If analyzing alt text
    [](index.html.1.29.html#__codelineno-11-6)    image_score_threshold=3,                # Filter out low-score images
    [](index.html.1.29.html#__codelineno-11-7))
    

**Where they appear** : \- `result.screenshot` → Base64 screenshot string. \- `result.pdf` → Byte array with PDF data.

* * *

## 7\. Extraction Strategy

**For advanced data extraction** (CSS/LLM-based), set `extraction_strategy`:
    
    
    [](index.html.1.29.html#__codelineno-12-1)run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-12-2)    extraction_strategy=my_css_or_llm_strategy
    [](index.html.1.29.html#__codelineno-12-3))
    

The extracted data will appear in `result.extracted_content`.

* * *

## 8\. Comprehensive Example

Below is a snippet combining many parameters:
    
    
    [](index.html.1.29.html#__codelineno-13-1)import asyncio
    [](index.html.1.29.html#__codelineno-13-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.29.html#__codelineno-13-3)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.29.html#__codelineno-13-4)
    [](index.html.1.29.html#__codelineno-13-5)async def main():
    [](index.html.1.29.html#__codelineno-13-6)    # Example schema
    [](index.html.1.29.html#__codelineno-13-7)    schema = {
    [](index.html.1.29.html#__codelineno-13-8)        "name": "Articles",
    [](index.html.1.29.html#__codelineno-13-9)        "baseSelector": "article.post",
    [](index.html.1.29.html#__codelineno-13-10)        "fields": [
    [](index.html.1.29.html#__codelineno-13-11)            {"name": "title", "selector": "h2", "type": "text"},
    [](index.html.1.29.html#__codelineno-13-12)            {"name": "link",  "selector": "a",  "type": "attribute", "attribute": "href"}
    [](index.html.1.29.html#__codelineno-13-13)        ]
    [](index.html.1.29.html#__codelineno-13-14)    }
    [](index.html.1.29.html#__codelineno-13-15)
    [](index.html.1.29.html#__codelineno-13-16)    run_config = CrawlerRunConfig(
    [](index.html.1.29.html#__codelineno-13-17)        # Core
    [](index.html.1.29.html#__codelineno-13-18)        verbose=True,
    [](index.html.1.29.html#__codelineno-13-19)        cache_mode=CacheMode.ENABLED,
    [](index.html.1.29.html#__codelineno-13-20)
    [](index.html.1.29.html#__codelineno-13-21)        # Content
    [](index.html.1.29.html#__codelineno-13-22)        word_count_threshold=10,
    [](index.html.1.29.html#__codelineno-13-23)        css_selector="main.content",
    [](index.html.1.29.html#__codelineno-13-24)        excluded_tags=["nav", "footer"],
    [](index.html.1.29.html#__codelineno-13-25)        exclude_external_links=True,
    [](index.html.1.29.html#__codelineno-13-26)
    [](index.html.1.29.html#__codelineno-13-27)        # Page & JS
    [](index.html.1.29.html#__codelineno-13-28)        js_code="document.querySelector('.show-more')?.click();",
    [](index.html.1.29.html#__codelineno-13-29)        wait_for="css:.loaded-block",
    [](index.html.1.29.html#__codelineno-13-30)        page_timeout=30000,
    [](index.html.1.29.html#__codelineno-13-31)
    [](index.html.1.29.html#__codelineno-13-32)        # Extraction
    [](index.html.1.29.html#__codelineno-13-33)        extraction_strategy=JsonCssExtractionStrategy(schema),
    [](index.html.1.29.html#__codelineno-13-34)
    [](index.html.1.29.html#__codelineno-13-35)        # Session
    [](index.html.1.29.html#__codelineno-13-36)        session_id="persistent_session",
    [](index.html.1.29.html#__codelineno-13-37)
    [](index.html.1.29.html#__codelineno-13-38)        # Media
    [](index.html.1.29.html#__codelineno-13-39)        screenshot=True,
    [](index.html.1.29.html#__codelineno-13-40)        pdf=True,
    [](index.html.1.29.html#__codelineno-13-41)
    [](index.html.1.29.html#__codelineno-13-42)        # Anti-bot
    [](index.html.1.29.html#__codelineno-13-43)        simulate_user=True,
    [](index.html.1.29.html#__codelineno-13-44)        magic=True,
    [](index.html.1.29.html#__codelineno-13-45)    )
    [](index.html.1.29.html#__codelineno-13-46)
    [](index.html.1.29.html#__codelineno-13-47)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.29.html#__codelineno-13-48)        result = await crawler.arun("https://example.com/posts", config=run_config)
    [](index.html.1.29.html#__codelineno-13-49)        if result.success:
    [](index.html.1.29.html#__codelineno-13-50)            print("HTML length:", len(result.cleaned_html))
    [](index.html.1.29.html#__codelineno-13-51)            print("Extraction JSON:", result.extracted_content)
    [](index.html.1.29.html#__codelineno-13-52)            if result.screenshot:
    [](index.html.1.29.html#__codelineno-13-53)                print("Screenshot length:", len(result.screenshot))
    [](index.html.1.29.html#__codelineno-13-54)            if result.pdf:
    [](index.html.1.29.html#__codelineno-13-55)                print("PDF bytes length:", len(result.pdf))
    [](index.html.1.29.html#__codelineno-13-56)        else:
    [](index.html.1.29.html#__codelineno-13-57)            print("Error:", result.error_message)
    [](index.html.1.29.html#__codelineno-13-58)
    [](index.html.1.29.html#__codelineno-13-59)if __name__ == "__main__":
    [](index.html.1.29.html#__codelineno-13-60)    asyncio.run(main())
    

**What we covered** : 1\. **Crawling** the main content region, ignoring external links.  
2\. Running **JavaScript** to click “.show-more”.  
3\. **Waiting** for “.loaded-block” to appear.  
4\. Generating a **screenshot** & **PDF** of the final page.  
5\. Extracting repeated “article.post” elements with a **CSS-based** extraction strategy.

* * *

## 9\. Best Practices

1\. **Use`BrowserConfig` for global browser** settings (headless, user agent).  
2\. **Use`CrawlerRunConfig`** to handle the **specific** crawl needs: content filtering, caching, JS, screenshot, extraction, etc.  
3\. Keep your **parameters consistent** in run configs—especially if you’re part of a large codebase with multiple crawls.  
4\. **Limit** large concurrency (`semaphore_count`) if the site or your system can’t handle it.  
5\. For dynamic pages, set `js_code` or `scan_full_page` so you load all content.

* * *

## 10\. Conclusion

All parameters that used to be direct arguments to `arun()` now belong in **`CrawlerRunConfig`**. This approach:

  * Makes code **clearer** and **more maintainable**. 
  * Minimizes confusion about which arguments affect global vs. per-crawl behavior. 
  * Allows you to create **reusable** config objects for different pages or tasks.



For a **full** reference, check out the [CrawlerRunConfig Docs](index.html.1.30.md). 

Happy crawling with your **structured, flexible** config approach!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
