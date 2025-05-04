[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.30.html#)



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
    * Browser & Crawler Config
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [1\. BrowserConfig – Controlling the Browser](index.html.1.30.html#1-browserconfig-controlling-the-browser)
  * [1.1 Parameter Highlights](index.html.1.30.html#11-parameter-highlights)
  * [2\. CrawlerRunConfig – Controlling Each Crawl](index.html.1.30.html#2-crawlerrunconfig-controlling-each-crawl)
  * [2.1 Parameter Highlights](index.html.1.30.html#21-parameter-highlights)
  * [2.2 Example Usage](index.html.1.30.html#22-example-usage)
  * [3\. Putting It All Together](index.html.1.30.html#3-putting-it-all-together)



# 1\. **BrowserConfig** – Controlling the Browser

`BrowserConfig` focuses on **how** the browser is launched and behaves. This includes headless mode, proxies, user agents, and other environment tweaks.
    
    
    [](index.html.1.30.html#__codelineno-0-1)from crawl4ai import AsyncWebCrawler, BrowserConfig
    [](index.html.1.30.html#__codelineno-0-2)
    [](index.html.1.30.html#__codelineno-0-3)browser_cfg = BrowserConfig(
    [](index.html.1.30.html#__codelineno-0-4)    browser_type="chromium",
    [](index.html.1.30.html#__codelineno-0-5)    headless=True,
    [](index.html.1.30.html#__codelineno-0-6)    viewport_width=1280,
    [](index.html.1.30.html#__codelineno-0-7)    viewport_height=720,
    [](index.html.1.30.html#__codelineno-0-8)    proxy="http://user:pass@proxy:8080",
    [](index.html.1.30.html#__codelineno-0-9)    user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/116.0.0.0 Safari/537.36",
    [](index.html.1.30.html#__codelineno-0-10))
    

## 1.1 Parameter Highlights

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`browser_type`** | `"chromium"`, `"firefox"`, `"webkit"`  
_(default:`"chromium"`)_ | Which browser engine to use. `"chromium"` is typical for many sites, `"firefox"` or `"webkit"` for specialized tests.  
**`headless`** | `bool` (default: `True`) | Headless means no visible UI. `False` is handy for debugging.  
**`viewport_width`** | `int` (default: `1080`) | Initial page width (in px). Useful for testing responsive layouts.  
**`viewport_height`** | `int` (default: `600`) | Initial page height (in px).  
**`proxy`** | `str` (default: `None`) | Single-proxy URL if you want all traffic to go through it, e.g. `"http://user:pass@proxy:8080"`.  
**`proxy_config`** | `dict` (default: `None`) | For advanced or multi-proxy needs, specify details like `{"server": "...", "username": "...", ...}`.  
**`use_persistent_context`** | `bool` (default: `False`) | If `True`, uses a **persistent** browser context (keep cookies, sessions across runs). Also sets `use_managed_browser=True`.  
**`user_data_dir`** | `str or None` (default: `None`) | Directory to store user data (profiles, cookies). Must be set if you want permanent sessions.  
**`ignore_https_errors`** | `bool` (default: `True`) | If `True`, continues despite invalid certificates (common in dev/staging).  
**`java_script_enabled`** | `bool` (default: `True`) | Disable if you want no JS overhead, or if only static content is needed.  
**`cookies`** | `list` (default: `[]`) | Pre-set cookies, each a dict like `{"name": "session", "value": "...", "url": "..."}`.  
**`headers`** | `dict` (default: `{}`) | Extra HTTP headers for every request, e.g. `{"Accept-Language": "en-US"}`.  
**`user_agent`** | `str` (default: Chrome-based UA) | Your custom or random user agent. `user_agent_mode="random"` can shuffle it.  
**`light_mode`** | `bool` (default: `False`) | Disables some background features for performance gains.  
**`text_mode`** | `bool` (default: `False`) | If `True`, tries to disable images/other heavy content for speed.  
**`use_managed_browser`** | `bool` (default: `False`) | For advanced “managed” interactions (debugging, CDP usage). Typically set automatically if persistent context is on.  
**`extra_args`** | `list` (default: `[]`) | Additional flags for the underlying browser process, e.g. `["--disable-extensions"]`.  
  
**Tips** : \- Set `headless=False` to visually **debug** how pages load or how interactions proceed.  
\- If you need **authentication** storage or repeated sessions, consider `use_persistent_context=True` and specify `user_data_dir`.  
\- For large pages, you might need a bigger `viewport_width` and `viewport_height` to handle dynamic content.

* * *

# 2\. **CrawlerRunConfig** – Controlling Each Crawl

While `BrowserConfig` sets up the **environment** , `CrawlerRunConfig` details **how** each **crawl operation** should behave: caching, content filtering, link or domain blocking, timeouts, JavaScript code, etc.
    
    
    [](index.html.1.30.html#__codelineno-1-1)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.30.html#__codelineno-1-2)
    [](index.html.1.30.html#__codelineno-1-3)run_cfg = CrawlerRunConfig(
    [](index.html.1.30.html#__codelineno-1-4)    wait_for="css:.main-content",
    [](index.html.1.30.html#__codelineno-1-5)    word_count_threshold=15,
    [](index.html.1.30.html#__codelineno-1-6)    excluded_tags=["nav", "footer"],
    [](index.html.1.30.html#__codelineno-1-7)    exclude_external_links=True,
    [](index.html.1.30.html#__codelineno-1-8))
    

## 2.1 Parameter Highlights

We group them by category. 

### A) **Content Processing**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`word_count_threshold`** | `int` (default: ~200) | Skips text blocks below X words. Helps ignore trivial sections.  
**`extraction_strategy`** | `ExtractionStrategy` (default: None) | If set, extracts structured data (CSS-based, LLM-based, etc.).  
**`markdown_generator`** | `MarkdownGenerationStrategy` (None) | If you want specialized markdown output (citations, filtering, chunking, etc.).  
**`content_filter`** | `RelevantContentFilter` (None) | Filters out irrelevant text blocks. E.g., `PruningContentFilter` or `BM25ContentFilter`.  
**`css_selector`** | `str` (None) | Retains only the part of the page matching this selector.  
**`excluded_tags`** | `list` (None) | Removes entire tags (e.g. `["script", "style"]`).  
**`excluded_selector`** | `str` (None) | Like `css_selector` but to exclude. E.g. `"#ads, .tracker"`.  
**`only_text`** | `bool` (False) | If `True`, tries to extract text-only content.  
**`prettiify`** | `bool` (False) | If `True`, beautifies final HTML (slower, purely cosmetic).  
**`keep_data_attributes`** | `bool` (False) | If `True`, preserve `data-*` attributes in cleaned HTML.  
**`remove_forms`** | `bool` (False) | If `True`, remove all `<form>` elements.  
  
* * *

### B) **Caching & Session**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`cache_mode`** | `CacheMode or None` | Controls how caching is handled (`ENABLED`, `BYPASS`, `DISABLED`, etc.). If `None`, typically defaults to `ENABLED`.  
**`session_id`** | `str or None` | Assign a unique ID to reuse a single browser session across multiple `arun()` calls.  
**`bypass_cache`** | `bool` (False) | If `True`, acts like `CacheMode.BYPASS`.  
**`disable_cache`** | `bool` (False) | If `True`, acts like `CacheMode.DISABLED`.  
**`no_cache_read`** | `bool` (False) | If `True`, acts like `CacheMode.WRITE_ONLY` (writes cache but never reads).  
**`no_cache_write`** | `bool` (False) | If `True`, acts like `CacheMode.READ_ONLY` (reads cache but never writes).  
  
Use these for controlling whether you read or write from a local content cache. Handy for large batch crawls or repeated site visits.

* * *

### C) **Page Navigation & Timing**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`wait_until`** | `str` (domcontentloaded) | Condition for navigation to “complete”. Often `"networkidle"` or `"domcontentloaded"`.  
**`page_timeout`** | `int` (60000 ms) | Timeout for page navigation or JS steps. Increase for slow sites.  
**`wait_for`** | `str or None` | Wait for a CSS (`"css:selector"`) or JS (`"js:() => bool"`) condition before content extraction.  
**`wait_for_images`** | `bool` (False) | Wait for images to load before finishing. Slows down if you only want text.  
**`delay_before_return_html`** | `float` (0.1) | Additional pause (seconds) before final HTML is captured. Good for last-second updates.  
**`mean_delay`** and **`max_range`** | `float` (0.1, 0.3) | If you call `arun_many()`, these define random delay intervals between crawls, helping avoid detection or rate limits.  
**`semaphore_count`** | `int` (5) | Max concurrency for `arun_many()`. Increase if you have resources for parallel crawls.  
  
* * *

### D) **Page Interaction**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`js_code`** | `str or list[str]` (None) | JavaScript to run after load. E.g. `"document.querySelector('button')?.click();"`.  
**`js_only`** | `bool` (False) | If `True`, indicates we’re reusing an existing session and only applying JS. No full reload.  
**`ignore_body_visibility`** | `bool` (True) | Skip checking if `<body>` is visible. Usually best to keep `True`.  
**`scan_full_page`** | `bool` (False) | If `True`, auto-scroll the page to load dynamic content (infinite scroll).  
**`scroll_delay`** | `float` (0.2) | Delay between scroll steps if `scan_full_page=True`.  
**`process_iframes`** | `bool` (False) | Inlines iframe content for single-page extraction.  
**`remove_overlay_elements`** | `bool` (False) | Removes potential modals/popups blocking the main content.  
**`simulate_user`** | `bool` (False) | Simulate user interactions (mouse movements) to avoid bot detection.  
**`override_navigator`** | `bool` (False) | Override `navigator` properties in JS for stealth.  
**`magic`** | `bool` (False) | Automatic handling of popups/consent banners. Experimental.  
**`adjust_viewport_to_content`** | `bool` (False) | Resizes viewport to match page content height.  
  
If your page is a single-page app with repeated JS updates, set `js_only=True` in subsequent calls, plus a `session_id` for reusing the same tab.

* * *

### E) **Media Handling**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`screenshot`** | `bool` (False) | Capture a screenshot (base64) in `result.screenshot`.  
**`screenshot_wait_for`** | `float or None` | Extra wait time before the screenshot.  
**`screenshot_height_threshold`** | `int` (~20000) | If the page is taller than this, alternate screenshot strategies are used.  
**`pdf`** | `bool` (False) | If `True`, returns a PDF in `result.pdf`.  
**`image_description_min_word_threshold`** | `int` (~50) | Minimum words for an image’s alt text or description to be considered valid.  
**`image_score_threshold`** | `int` (~3) | Filter out low-scoring images. The crawler scores images by relevance (size, context, etc.).  
**`exclude_external_images`** | `bool` (False) | Exclude images from other domains.  
  
* * *

### F) **Link/Domain Handling**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`exclude_social_media_domains`** | `list` (e.g. Facebook/Twitter) | A default list can be extended. Any link to these domains is removed from final output.  
**`exclude_external_links`** | `bool` (False) | Removes all links pointing outside the current domain.  
**`exclude_social_media_links`** | `bool` (False) | Strips links specifically to social sites (like Facebook or Twitter).  
**`exclude_domains`** | `list` ([]) | Provide a custom list of domains to exclude (like `["ads.com", "trackers.io"]`).  
  
Use these for link-level content filtering (often to keep crawls “internal” or to remove spammy domains).

* * *

### G) **Debug & Logging**

**Parameter** | **Type / Default** | **What It Does**  
---|---|---  
**`verbose`** | `bool` (True) | Prints logs detailing each step of crawling, interactions, or errors.  
**`log_console`** | `bool` (False) | Logs the page’s JavaScript console output if you want deeper JS debugging.  
  
* * *

## 2.2 Example Usage
    
    
    [](index.html.1.30.html#__codelineno-2-1)import asyncio
    [](index.html.1.30.html#__codelineno-2-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.30.html#__codelineno-2-3)
    [](index.html.1.30.html#__codelineno-2-4)async def main():
    [](index.html.1.30.html#__codelineno-2-5)    # Configure the browser
    [](index.html.1.30.html#__codelineno-2-6)    browser_cfg = BrowserConfig(
    [](index.html.1.30.html#__codelineno-2-7)        headless=False,
    [](index.html.1.30.html#__codelineno-2-8)        viewport_width=1280,
    [](index.html.1.30.html#__codelineno-2-9)        viewport_height=720,
    [](index.html.1.30.html#__codelineno-2-10)        proxy="http://user:pass@myproxy:8080",
    [](index.html.1.30.html#__codelineno-2-11)        text_mode=True
    [](index.html.1.30.html#__codelineno-2-12)    )
    [](index.html.1.30.html#__codelineno-2-13)
    [](index.html.1.30.html#__codelineno-2-14)    # Configure the run
    [](index.html.1.30.html#__codelineno-2-15)    run_cfg = CrawlerRunConfig(
    [](index.html.1.30.html#__codelineno-2-16)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.30.html#__codelineno-2-17)        session_id="my_session",
    [](index.html.1.30.html#__codelineno-2-18)        css_selector="main.article",
    [](index.html.1.30.html#__codelineno-2-19)        excluded_tags=["script", "style"],
    [](index.html.1.30.html#__codelineno-2-20)        exclude_external_links=True,
    [](index.html.1.30.html#__codelineno-2-21)        wait_for="css:.article-loaded",
    [](index.html.1.30.html#__codelineno-2-22)        screenshot=True
    [](index.html.1.30.html#__codelineno-2-23)    )
    [](index.html.1.30.html#__codelineno-2-24)
    [](index.html.1.30.html#__codelineno-2-25)    async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.30.html#__codelineno-2-26)        result = await crawler.arun(
    [](index.html.1.30.html#__codelineno-2-27)            url="https://example.com/news",
    [](index.html.1.30.html#__codelineno-2-28)            config=run_cfg
    [](index.html.1.30.html#__codelineno-2-29)        )
    [](index.html.1.30.html#__codelineno-2-30)        if result.success:
    [](index.html.1.30.html#__codelineno-2-31)            print("Final cleaned_html length:", len(result.cleaned_html))
    [](index.html.1.30.html#__codelineno-2-32)            if result.screenshot:
    [](index.html.1.30.html#__codelineno-2-33)                print("Screenshot captured (base64, length):", len(result.screenshot))
    [](index.html.1.30.html#__codelineno-2-34)        else:
    [](index.html.1.30.html#__codelineno-2-35)            print("Crawl failed:", result.error_message)
    [](index.html.1.30.html#__codelineno-2-36)
    [](index.html.1.30.html#__codelineno-2-37)if __name__ == "__main__":
    [](index.html.1.30.html#__codelineno-2-38)    asyncio.run(main())
    

**What’s Happening** : \- **`text_mode=True`** avoids loading images and other heavy resources, speeding up the crawl.  
\- We disable caching (`cache_mode=CacheMode.BYPASS`) to always fetch fresh content.  
\- We only keep `main.article` content by specifying `css_selector="main.article"`.  
\- We exclude external links (`exclude_external_links=True`).  
\- We do a quick screenshot (`screenshot=True`) before finishing.

* * *

## 3\. Putting It All Together

  * **Use** `BrowserConfig` for **global** browser settings: engine, headless, proxy, user agent. 
  * **Use** `CrawlerRunConfig` for each crawl’s **context** : how to filter content, handle caching, wait for dynamic elements, or run JS. 
  * **Pass** both configs to `AsyncWebCrawler` (the `BrowserConfig`) and then to `arun()` (the `CrawlerRunConfig`). 



* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
