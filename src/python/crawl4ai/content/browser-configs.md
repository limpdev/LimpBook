[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.6.html#)



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
    * Browser & Crawler Config
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

  * [Browser & Crawler Configuration (Quick Overview)](index.html.1.6.html#browser-crawler-configuration-quick-overview)
  * [1\. BrowserConfig Essentials](index.html.1.6.html#1-browserconfig-essentials)
  * [2\. CrawlerRunConfig Essentials](index.html.1.6.html#2-crawlerrunconfig-essentials)
  * [3\. Putting It All Together](index.html.1.6.html#3-putting-it-all-together)
  * [4\. Next Steps](index.html.1.6.html#4-next-steps)
  * [5\. Conclusion](index.html.1.6.html#5-conclusion)



# Browser & Crawler Configuration (Quick Overview)

Crawl4AI’s flexibility stems from two key classes:

1\. **`BrowserConfig`** – Dictates **how** the browser is launched and behaves (e.g., headless or visible, proxy, user agent).  
2\. **`CrawlerRunConfig`** – Dictates **how** each **crawl** operates (e.g., caching, extraction, timeouts, JavaScript code to run, etc.).

In most examples, you create **one** `BrowserConfig` for the entire crawler session, then pass a **fresh** or re-used `CrawlerRunConfig` whenever you call `arun()`. This tutorial shows the most commonly used parameters. If you need advanced or rarely used fields, see the [Configuration Parameters](index.html.1.30.md).

* * *

## 1\. BrowserConfig Essentials
    
    
    [](index.html.1.6.html#__codelineno-0-1)class BrowserConfig:
    [](index.html.1.6.html#__codelineno-0-2)    def __init__(
    [](index.html.1.6.html#__codelineno-0-3)        browser_type="chromium",
    [](index.html.1.6.html#__codelineno-0-4)        headless=True,
    [](index.html.1.6.html#__codelineno-0-5)        proxy_config=None,
    [](index.html.1.6.html#__codelineno-0-6)        viewport_width=1080,
    [](index.html.1.6.html#__codelineno-0-7)        viewport_height=600,
    [](index.html.1.6.html#__codelineno-0-8)        verbose=True,
    [](index.html.1.6.html#__codelineno-0-9)        use_persistent_context=False,
    [](index.html.1.6.html#__codelineno-0-10)        user_data_dir=None,
    [](index.html.1.6.html#__codelineno-0-11)        cookies=None,
    [](index.html.1.6.html#__codelineno-0-12)        headers=None,
    [](index.html.1.6.html#__codelineno-0-13)        user_agent=None,
    [](index.html.1.6.html#__codelineno-0-14)        text_mode=False,
    [](index.html.1.6.html#__codelineno-0-15)        light_mode=False,
    [](index.html.1.6.html#__codelineno-0-16)        extra_args=None,
    [](index.html.1.6.html#__codelineno-0-17)        # ... other advanced parameters omitted here
    [](index.html.1.6.html#__codelineno-0-18)    ):
    [](index.html.1.6.html#__codelineno-0-19)        ...
    

### Key Fields to Note

1\. **`browser_type`**  
\- Options: `"chromium"`, `"firefox"`, or `"webkit"`.  
\- Defaults to `"chromium"`.  
\- If you need a different engine, specify it here.

2\. **`headless`**  
\- `True`: Runs the browser in headless mode (invisible browser).  
\- `False`: Runs the browser in visible mode, which helps with debugging.

3\. **`proxy_config`**  
\- A dictionary with fields like:  

    
    
    [](index.html.1.6.html#__codelineno-1-1){
    [](index.html.1.6.html#__codelineno-1-2)    "server": "http://proxy.example.com:8080", 
    [](index.html.1.6.html#__codelineno-1-3)    "username": "...", 
    [](index.html.1.6.html#__codelineno-1-4)    "password": "..."
    [](index.html.1.6.html#__codelineno-1-5)}
    

\- Leave as `None` if a proxy is not required.

4\. **`viewport_width` & `viewport_height`**:  
\- The initial window size.  
\- Some sites behave differently with smaller or bigger viewports.

5\. **`verbose`** :  
\- If `True`, prints extra logs.  
\- Handy for debugging.

6\. **`use_persistent_context`** :  
\- If `True`, uses a **persistent** browser profile, storing cookies/local storage across runs.  
\- Typically also set `user_data_dir` to point to a folder.

7\. **`cookies`** & **`headers`** :  
\- If you want to start with specific cookies or add universal HTTP headers, set them here.  
\- E.g. `cookies=[{"name": "session", "value": "abc123", "domain": "example.com"}]`.

8\. **`user_agent`** :  
\- Custom User-Agent string. If `None`, a default is used.  
\- You can also set `user_agent_mode="random"` for randomization (if you want to fight bot detection).

9\. **`text_mode`** & **`light_mode`** :  
\- `text_mode=True` disables images, possibly speeding up text-only crawls.  
\- `light_mode=True` turns off certain background features for performance. 

10\. **`extra_args`** :  
\- Additional flags for the underlying browser.  
\- E.g. `["--disable-extensions"]`.

**Minimal Example** :
    
    
    [](index.html.1.6.html#__codelineno-2-1)from crawl4ai import AsyncWebCrawler, BrowserConfig
    [](index.html.1.6.html#__codelineno-2-2)
    [](index.html.1.6.html#__codelineno-2-3)browser_conf = BrowserConfig(
    [](index.html.1.6.html#__codelineno-2-4)    browser_type="firefox",
    [](index.html.1.6.html#__codelineno-2-5)    headless=False,
    [](index.html.1.6.html#__codelineno-2-6)    text_mode=True
    [](index.html.1.6.html#__codelineno-2-7))
    [](index.html.1.6.html#__codelineno-2-8)
    [](index.html.1.6.html#__codelineno-2-9)async with AsyncWebCrawler(config=browser_conf) as crawler:
    [](index.html.1.6.html#__codelineno-2-10)    result = await crawler.arun("https://example.com")
    [](index.html.1.6.html#__codelineno-2-11)    print(result.markdown[:300])
    

* * *

## 2\. CrawlerRunConfig Essentials
    
    
    [](index.html.1.6.html#__codelineno-3-1)class CrawlerRunConfig:
    [](index.html.1.6.html#__codelineno-3-2)    def __init__(
    [](index.html.1.6.html#__codelineno-3-3)        word_count_threshold=200,
    [](index.html.1.6.html#__codelineno-3-4)        extraction_strategy=None,
    [](index.html.1.6.html#__codelineno-3-5)        markdown_generator=None,
    [](index.html.1.6.html#__codelineno-3-6)        cache_mode=None,
    [](index.html.1.6.html#__codelineno-3-7)        js_code=None,
    [](index.html.1.6.html#__codelineno-3-8)        wait_for=None,
    [](index.html.1.6.html#__codelineno-3-9)        screenshot=False,
    [](index.html.1.6.html#__codelineno-3-10)        pdf=False,
    [](index.html.1.6.html#__codelineno-3-11)        verbose=True,
    [](index.html.1.6.html#__codelineno-3-12)        # ... other advanced parameters omitted
    [](index.html.1.6.html#__codelineno-3-13)    ):
    [](index.html.1.6.html#__codelineno-3-14)        ...
    

### Key Fields to Note

1\. **`word_count_threshold`** :  
\- The minimum word count before a block is considered.  
\- If your site has lots of short paragraphs or items, you can lower it.

2\. **`extraction_strategy`** :  
\- Where you plug in JSON-based extraction (CSS, LLM, etc.).  
\- If `None`, no structured extraction is done (only raw/cleaned HTML + markdown).

3\. **`markdown_generator`** :  
\- E.g., `DefaultMarkdownGenerator(...)`, controlling how HTML→Markdown conversion is done.  
\- If `None`, a default approach is used.

4\. **`cache_mode`** :  
\- Controls caching behavior (`ENABLED`, `BYPASS`, `DISABLED`, etc.).  
\- If `None`, defaults to some level of caching or you can specify `CacheMode.ENABLED`.

5\. **`js_code`** :  
\- A string or list of JS strings to execute.  
\- Great for “Load More” buttons or user interactions. 

6\. **`wait_for`** :  
\- A CSS or JS expression to wait for before extracting content.  
\- Common usage: `wait_for="css:.main-loaded"` or `wait_for="js:() => window.loaded === true"`.

7\. **`screenshot`** & **`pdf`** :  
\- If `True`, captures a screenshot or PDF after the page is fully loaded.  
\- The results go to `result.screenshot` (base64) or `result.pdf` (bytes).

8\. **`verbose`** :  
\- Logs additional runtime details.  
\- Overlaps with the browser’s verbosity if also set to `True` in `BrowserConfig`.

**Minimal Example** :
    
    
    [](index.html.1.6.html#__codelineno-4-1)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.6.html#__codelineno-4-2)
    [](index.html.1.6.html#__codelineno-4-3)crawl_conf = CrawlerRunConfig(
    [](index.html.1.6.html#__codelineno-4-4)    js_code="document.querySelector('button#loadMore')?.click()",
    [](index.html.1.6.html#__codelineno-4-5)    wait_for="css:.loaded-content",
    [](index.html.1.6.html#__codelineno-4-6)    screenshot=True
    [](index.html.1.6.html#__codelineno-4-7))
    [](index.html.1.6.html#__codelineno-4-8)
    [](index.html.1.6.html#__codelineno-4-9)async with AsyncWebCrawler() as crawler:
    [](index.html.1.6.html#__codelineno-4-10)    result = await crawler.arun(url="https://example.com", config=crawl_conf)
    [](index.html.1.6.html#__codelineno-4-11)    print(result.screenshot[:100])  # Base64-encoded PNG snippet
    

* * *

## 3\. Putting It All Together

In a typical scenario, you define **one** `BrowserConfig` for your crawler session, then create **one or more** `CrawlerRunConfig` depending on each call’s needs:
    
    
    [](index.html.1.6.html#__codelineno-5-1)import asyncio
    [](index.html.1.6.html#__codelineno-5-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.6.html#__codelineno-5-3)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.6.html#__codelineno-5-4)
    [](index.html.1.6.html#__codelineno-5-5)async def main():
    [](index.html.1.6.html#__codelineno-5-6)    # 1) Browser config: headless, bigger viewport, no proxy
    [](index.html.1.6.html#__codelineno-5-7)    browser_conf = BrowserConfig(
    [](index.html.1.6.html#__codelineno-5-8)        headless=True,
    [](index.html.1.6.html#__codelineno-5-9)        viewport_width=1280,
    [](index.html.1.6.html#__codelineno-5-10)        viewport_height=720
    [](index.html.1.6.html#__codelineno-5-11)    )
    [](index.html.1.6.html#__codelineno-5-12)
    [](index.html.1.6.html#__codelineno-5-13)    # 2) Example extraction strategy
    [](index.html.1.6.html#__codelineno-5-14)    schema = {
    [](index.html.1.6.html#__codelineno-5-15)        "name": "Articles",
    [](index.html.1.6.html#__codelineno-5-16)        "baseSelector": "div.article",
    [](index.html.1.6.html#__codelineno-5-17)        "fields": [
    [](index.html.1.6.html#__codelineno-5-18)            {"name": "title", "selector": "h2", "type": "text"},
    [](index.html.1.6.html#__codelineno-5-19)            {"name": "link", "selector": "a", "type": "attribute", "attribute": "href"}
    [](index.html.1.6.html#__codelineno-5-20)        ]
    [](index.html.1.6.html#__codelineno-5-21)    }
    [](index.html.1.6.html#__codelineno-5-22)    extraction = JsonCssExtractionStrategy(schema)
    [](index.html.1.6.html#__codelineno-5-23)
    [](index.html.1.6.html#__codelineno-5-24)    # 3) Crawler run config: skip cache, use extraction
    [](index.html.1.6.html#__codelineno-5-25)    run_conf = CrawlerRunConfig(
    [](index.html.1.6.html#__codelineno-5-26)        extraction_strategy=extraction,
    [](index.html.1.6.html#__codelineno-5-27)        cache_mode=CacheMode.BYPASS
    [](index.html.1.6.html#__codelineno-5-28)    )
    [](index.html.1.6.html#__codelineno-5-29)
    [](index.html.1.6.html#__codelineno-5-30)    async with AsyncWebCrawler(config=browser_conf) as crawler:
    [](index.html.1.6.html#__codelineno-5-31)        # 4) Execute the crawl
    [](index.html.1.6.html#__codelineno-5-32)        result = await crawler.arun(url="https://example.com/news", config=run_conf)
    [](index.html.1.6.html#__codelineno-5-33)
    [](index.html.1.6.html#__codelineno-5-34)        if result.success:
    [](index.html.1.6.html#__codelineno-5-35)            print("Extracted content:", result.extracted_content)
    [](index.html.1.6.html#__codelineno-5-36)        else:
    [](index.html.1.6.html#__codelineno-5-37)            print("Error:", result.error_message)
    [](index.html.1.6.html#__codelineno-5-38)
    [](index.html.1.6.html#__codelineno-5-39)if __name__ == "__main__":
    [](index.html.1.6.html#__codelineno-5-40)    asyncio.run(main())
    

* * *

## 4\. Next Steps

For a **detailed list** of available parameters (including advanced ones), see:

  * [BrowserConfig and CrawlerRunConfig Reference](index.html.1.30.md)



You can explore topics like:

  * **Custom Hooks & Auth** (Inject JavaScript or handle login forms). 
  * **Session Management** (Re-use pages, preserve state across multiple calls). 
  * **Magic Mode** or **Identity-based Crawling** (Fight bot detection by simulating user behavior). 
  * **Advanced Caching** (Fine-tune read/write cache modes). 



* * *

## 5\. Conclusion

**BrowserConfig** and **CrawlerRunConfig** give you straightforward ways to define:

  * **Which** browser to launch, how it should run, and any proxy or user agent needs. 
  * **How** each crawl should behave—caching, timeouts, JavaScript code, extraction strategies, etc.



Use them together for **clear, maintainable** code, and when you need more specialized behavior, check out the advanced parameters in the [reference docs](index.html.1.30.md). Happy crawling!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
