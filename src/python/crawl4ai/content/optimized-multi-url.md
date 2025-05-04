[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.20.html#)



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
    * Multi-URL Crawling
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

  * [Optimized Multi-URL Crawling](index.html.1.20.html#optimized-multi-url-crawling)
  * [1\. Why Avoid Simple Loops per URL?](index.html.1.20.html#1-why-avoid-simple-loops-per-url)
  * [2\. Sequential Crawling with Session Reuse](index.html.1.20.html#2-sequential-crawling-with-session-reuse)
  * [3\. Parallel Crawling with Browser Reuse](index.html.1.20.html#3-parallel-crawling-with-browser-reuse)
  * [4\. Performance Tips](index.html.1.20.html#4-performance-tips)
  * [5\. Summary](index.html.1.20.html#5-summary)



# Optimized Multi-URL Crawling

> **Note** : We’re developing a new **executor module** that uses a sophisticated algorithm to dynamically manage multi-URL crawling, optimizing for speed and memory usage. The approaches in this document remain fully valid, but keep an eye on **Crawl4AI** ’s upcoming releases for this powerful feature! Follow [@unclecode](https://twitter.com/unclecode) on X and check the changelogs to stay updated.

Crawl4AI’s **AsyncWebCrawler** can handle multiple URLs in a single run, which can greatly reduce overhead and speed up crawling. This guide shows how to:

1\. **Sequentially** crawl a list of URLs using the **same** session, avoiding repeated browser creation.  
2\. **Parallel** -crawl subsets of URLs in batches, again reusing the same browser. 

When the entire process finishes, you close the browser once—**minimizing** memory and resource usage.

* * *

## 1\. Why Avoid Simple Loops per URL?

If you naively do:
    
    
    [](index.html.1.20.html#__codelineno-0-1)for url in urls:
    [](index.html.1.20.html#__codelineno-0-2)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.20.html#__codelineno-0-3)        result = await crawler.arun(url)
    

You end up:

  1. Spinning up a **new** browser for each URL 
  2. Closing it immediately after the single crawl 
  3. Potentially using a lot of CPU/memory for short-living browsers 
  4. Missing out on session reusability if you have login or ongoing states



**Better** approaches ensure you **create** the browser once, then crawl multiple URLs with minimal overhead.

* * *

## 2\. Sequential Crawling with Session Reuse

### 2.1 Overview

1\. **One** `AsyncWebCrawler` instance for **all** URLs.  
2\. **One** session (via `session_id`) so we can preserve local storage or cookies across URLs if needed.  
3\. The crawler is only closed at the **end**.

**This** is the simplest pattern if your workload is moderate (dozens to a few hundred URLs).

### 2.2 Example Code
    
    
    [](index.html.1.20.html#__codelineno-1-1)import asyncio
    [](index.html.1.20.html#__codelineno-1-2)from typing import List
    [](index.html.1.20.html#__codelineno-1-3)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.20.html#__codelineno-1-4)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.20.html#__codelineno-1-5)
    [](index.html.1.20.html#__codelineno-1-6)async def crawl_sequential(urls: List[str]):
    [](index.html.1.20.html#__codelineno-1-7)    print("\n=== Sequential Crawling with Session Reuse ===")
    [](index.html.1.20.html#__codelineno-1-8)
    [](index.html.1.20.html#__codelineno-1-9)    browser_config = BrowserConfig(
    [](index.html.1.20.html#__codelineno-1-10)        headless=True,
    [](index.html.1.20.html#__codelineno-1-11)        # For better performance in Docker or low-memory environments:
    [](index.html.1.20.html#__codelineno-1-12)        extra_args=["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"],
    [](index.html.1.20.html#__codelineno-1-13)    )
    [](index.html.1.20.html#__codelineno-1-14)
    [](index.html.1.20.html#__codelineno-1-15)    crawl_config = CrawlerRunConfig(
    [](index.html.1.20.html#__codelineno-1-16)        markdown_generator=DefaultMarkdownGenerator()
    [](index.html.1.20.html#__codelineno-1-17)    )
    [](index.html.1.20.html#__codelineno-1-18)
    [](index.html.1.20.html#__codelineno-1-19)    # Create the crawler (opens the browser)
    [](index.html.1.20.html#__codelineno-1-20)    crawler = AsyncWebCrawler(config=browser_config)
    [](index.html.1.20.html#__codelineno-1-21)    await crawler.start()
    [](index.html.1.20.html#__codelineno-1-22)
    [](index.html.1.20.html#__codelineno-1-23)    try:
    [](index.html.1.20.html#__codelineno-1-24)        session_id = "session1"  # Reuse the same session across all URLs
    [](index.html.1.20.html#__codelineno-1-25)        for url in urls:
    [](index.html.1.20.html#__codelineno-1-26)            result = await crawler.arun(
    [](index.html.1.20.html#__codelineno-1-27)                url=url,
    [](index.html.1.20.html#__codelineno-1-28)                config=crawl_config,
    [](index.html.1.20.html#__codelineno-1-29)                session_id=session_id
    [](index.html.1.20.html#__codelineno-1-30)            )
    [](index.html.1.20.html#__codelineno-1-31)            if result.success:
    [](index.html.1.20.html#__codelineno-1-32)                print(f"Successfully crawled: {url}")
    [](index.html.1.20.html#__codelineno-1-33)                # E.g. check markdown length
    [](index.html.1.20.html#__codelineno-1-34)                print(f"Markdown length: {len(result.markdown_v2.raw_markdown)}")
    [](index.html.1.20.html#__codelineno-1-35)            else:
    [](index.html.1.20.html#__codelineno-1-36)                print(f"Failed: {url} - Error: {result.error_message}")
    [](index.html.1.20.html#__codelineno-1-37)    finally:
    [](index.html.1.20.html#__codelineno-1-38)        # After all URLs are done, close the crawler (and the browser)
    [](index.html.1.20.html#__codelineno-1-39)        await crawler.close()
    [](index.html.1.20.html#__codelineno-1-40)
    [](index.html.1.20.html#__codelineno-1-41)async def main():
    [](index.html.1.20.html#__codelineno-1-42)    urls = [
    [](index.html.1.20.html#__codelineno-1-43)        "https://example.com/page1",
    [](index.html.1.20.html#__codelineno-1-44)        "https://example.com/page2",
    [](index.html.1.20.html#__codelineno-1-45)        "https://example.com/page3"
    [](index.html.1.20.html#__codelineno-1-46)    ]
    [](index.html.1.20.html#__codelineno-1-47)    await crawl_sequential(urls)
    [](index.html.1.20.html#__codelineno-1-48)
    [](index.html.1.20.html#__codelineno-1-49)if __name__ == "__main__":
    [](index.html.1.20.html#__codelineno-1-50)    asyncio.run(main())
    

**Why It’s Good** :

  * **One** browser launch. 
  * Minimal memory usage. 
  * If the site requires login, you can log in once in `session_id` context and preserve auth across all URLs.



* * *

## 3\. Parallel Crawling with Browser Reuse

### 3.1 Overview

To speed up crawling further, you can crawl multiple URLs in **parallel** (batches or a concurrency limit). The crawler still uses **one** browser, but spawns different sessions (or the same, depending on your logic) for each task.

### 3.2 Example Code

For this example make sure to install the [psutil](https://pypi.org/project/psutil/) package.
    
    
    [](index.html.1.20.html#__codelineno-2-1)pip install psutil
    

Then you can run the following code:
    
    
    [](index.html.1.20.html#__codelineno-3-1)import os
    [](index.html.1.20.html#__codelineno-3-2)import sys
    [](index.html.1.20.html#__codelineno-3-3)import psutil
    [](index.html.1.20.html#__codelineno-3-4)import asyncio
    [](index.html.1.20.html#__codelineno-3-5)
    [](index.html.1.20.html#__codelineno-3-6)__location__ = os.path.dirname(os.path.abspath(__file__))
    [](index.html.1.20.html#__codelineno-3-7)__output__ = os.path.join(__location__, "output")
    [](index.html.1.20.html#__codelineno-3-8)
    [](index.html.1.20.html#__codelineno-3-9)# Append parent directory to system path
    [](index.html.1.20.html#__codelineno-3-10)parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    [](index.html.1.20.html#__codelineno-3-11)sys.path.append(parent_dir)
    [](index.html.1.20.html#__codelineno-3-12)
    [](index.html.1.20.html#__codelineno-3-13)from typing import List
    [](index.html.1.20.html#__codelineno-3-14)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.20.html#__codelineno-3-15)
    [](index.html.1.20.html#__codelineno-3-16)async def crawl_parallel(urls: List[str], max_concurrent: int = 3):
    [](index.html.1.20.html#__codelineno-3-17)    print("\n=== Parallel Crawling with Browser Reuse + Memory Check ===")
    [](index.html.1.20.html#__codelineno-3-18)
    [](index.html.1.20.html#__codelineno-3-19)    # We'll keep track of peak memory usage across all tasks
    [](index.html.1.20.html#__codelineno-3-20)    peak_memory = 0
    [](index.html.1.20.html#__codelineno-3-21)    process = psutil.Process(os.getpid())
    [](index.html.1.20.html#__codelineno-3-22)
    [](index.html.1.20.html#__codelineno-3-23)    def log_memory(prefix: str = ""):
    [](index.html.1.20.html#__codelineno-3-24)        nonlocal peak_memory
    [](index.html.1.20.html#__codelineno-3-25)        current_mem = process.memory_info().rss  # in bytes
    [](index.html.1.20.html#__codelineno-3-26)        if current_mem > peak_memory:
    [](index.html.1.20.html#__codelineno-3-27)            peak_memory = current_mem
    [](index.html.1.20.html#__codelineno-3-28)        print(f"{prefix} Current Memory: {current_mem // (1024 * 1024)} MB, Peak: {peak_memory // (1024 * 1024)} MB")
    [](index.html.1.20.html#__codelineno-3-29)
    [](index.html.1.20.html#__codelineno-3-30)    # Minimal browser config
    [](index.html.1.20.html#__codelineno-3-31)    browser_config = BrowserConfig(
    [](index.html.1.20.html#__codelineno-3-32)        headless=True,
    [](index.html.1.20.html#__codelineno-3-33)        verbose=False,   # corrected from 'verbos=False'
    [](index.html.1.20.html#__codelineno-3-34)        extra_args=["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"],
    [](index.html.1.20.html#__codelineno-3-35)    )
    [](index.html.1.20.html#__codelineno-3-36)    crawl_config = CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
    [](index.html.1.20.html#__codelineno-3-37)
    [](index.html.1.20.html#__codelineno-3-38)    # Create the crawler instance
    [](index.html.1.20.html#__codelineno-3-39)    crawler = AsyncWebCrawler(config=browser_config)
    [](index.html.1.20.html#__codelineno-3-40)    await crawler.start()
    [](index.html.1.20.html#__codelineno-3-41)
    [](index.html.1.20.html#__codelineno-3-42)    try:
    [](index.html.1.20.html#__codelineno-3-43)        # We'll chunk the URLs in batches of 'max_concurrent'
    [](index.html.1.20.html#__codelineno-3-44)        success_count = 0
    [](index.html.1.20.html#__codelineno-3-45)        fail_count = 0
    [](index.html.1.20.html#__codelineno-3-46)        for i in range(0, len(urls), max_concurrent):
    [](index.html.1.20.html#__codelineno-3-47)            batch = urls[i : i + max_concurrent]
    [](index.html.1.20.html#__codelineno-3-48)            tasks = []
    [](index.html.1.20.html#__codelineno-3-49)
    [](index.html.1.20.html#__codelineno-3-50)            for j, url in enumerate(batch):
    [](index.html.1.20.html#__codelineno-3-51)                # Unique session_id per concurrent sub-task
    [](index.html.1.20.html#__codelineno-3-52)                session_id = f"parallel_session_{i + j}"
    [](index.html.1.20.html#__codelineno-3-53)                task = crawler.arun(url=url, config=crawl_config, session_id=session_id)
    [](index.html.1.20.html#__codelineno-3-54)                tasks.append(task)
    [](index.html.1.20.html#__codelineno-3-55)
    [](index.html.1.20.html#__codelineno-3-56)            # Check memory usage prior to launching tasks
    [](index.html.1.20.html#__codelineno-3-57)            log_memory(prefix=f"Before batch {i//max_concurrent + 1}: ")
    [](index.html.1.20.html#__codelineno-3-58)
    [](index.html.1.20.html#__codelineno-3-59)            # Gather results
    [](index.html.1.20.html#__codelineno-3-60)            results = await asyncio.gather(*tasks, return_exceptions=True)
    [](index.html.1.20.html#__codelineno-3-61)
    [](index.html.1.20.html#__codelineno-3-62)            # Check memory usage after tasks complete
    [](index.html.1.20.html#__codelineno-3-63)            log_memory(prefix=f"After batch {i//max_concurrent + 1}: ")
    [](index.html.1.20.html#__codelineno-3-64)
    [](index.html.1.20.html#__codelineno-3-65)            # Evaluate results
    [](index.html.1.20.html#__codelineno-3-66)            for url, result in zip(batch, results):
    [](index.html.1.20.html#__codelineno-3-67)                if isinstance(result, Exception):
    [](index.html.1.20.html#__codelineno-3-68)                    print(f"Error crawling {url}: {result}")
    [](index.html.1.20.html#__codelineno-3-69)                    fail_count += 1
    [](index.html.1.20.html#__codelineno-3-70)                elif result.success:
    [](index.html.1.20.html#__codelineno-3-71)                    success_count += 1
    [](index.html.1.20.html#__codelineno-3-72)                else:
    [](index.html.1.20.html#__codelineno-3-73)                    fail_count += 1
    [](index.html.1.20.html#__codelineno-3-74)
    [](index.html.1.20.html#__codelineno-3-75)        print(f"\nSummary:")
    [](index.html.1.20.html#__codelineno-3-76)        print(f"  - Successfully crawled: {success_count}")
    [](index.html.1.20.html#__codelineno-3-77)        print(f"  - Failed: {fail_count}")
    [](index.html.1.20.html#__codelineno-3-78)
    [](index.html.1.20.html#__codelineno-3-79)    finally:
    [](index.html.1.20.html#__codelineno-3-80)        print("\nClosing crawler...")
    [](index.html.1.20.html#__codelineno-3-81)        await crawler.close()
    [](index.html.1.20.html#__codelineno-3-82)        # Final memory log
    [](index.html.1.20.html#__codelineno-3-83)        log_memory(prefix="Final: ")
    [](index.html.1.20.html#__codelineno-3-84)        print(f"\nPeak memory usage (MB): {peak_memory // (1024 * 1024)}")
    [](index.html.1.20.html#__codelineno-3-85)
    [](index.html.1.20.html#__codelineno-3-86)async def main():
    [](index.html.1.20.html#__codelineno-3-87)    urls = [
    [](index.html.1.20.html#__codelineno-3-88)        "https://example.com/page1",
    [](index.html.1.20.html#__codelineno-3-89)        "https://example.com/page2",
    [](index.html.1.20.html#__codelineno-3-90)        "https://example.com/page3",
    [](index.html.1.20.html#__codelineno-3-91)        "https://example.com/page4"
    [](index.html.1.20.html#__codelineno-3-92)    ]
    [](index.html.1.20.html#__codelineno-3-93)    await crawl_parallel(urls, max_concurrent=2)
    [](index.html.1.20.html#__codelineno-3-94)
    [](index.html.1.20.html#__codelineno-3-95)if __name__ == "__main__":
    [](index.html.1.20.html#__codelineno-3-96)    asyncio.run(main())
    

**Notes** :

  * We **reuse** the same `AsyncWebCrawler` instance for all parallel tasks, launching **one** browser. 
  * Each parallel sub-task might get its own `session_id` so they don’t share cookies/localStorage (unless that’s desired). 
  * We limit concurrency to `max_concurrent=2` or 3 to avoid saturating CPU/memory.



* * *

## 4\. Performance Tips

1\. **Extra Browser Args**  
\- `--disable-gpu`, `--no-sandbox` can help in Docker or restricted environments.  
\- `--disable-dev-shm-usage` avoids using `/dev/shm` which can be small on some systems.

2\. **Session Reuse**  
\- If your site requires a login or you want to maintain local data across URLs, share the **same** `session_id`.  
\- If you want isolation (each URL fresh), create unique sessions.

3\. **Batching**  
\- If you have **many** URLs (like thousands), you can do parallel crawling in chunks (like `max_concurrent=5`).  
\- Use `arun_many()` for a built-in approach if you prefer, but the example above is often more flexible.

4\. **Cache**  
\- If your pages share many resources or you’re re-crawling the same domain repeatedly, consider setting `cache_mode=CacheMode.ENABLED` in `CrawlerRunConfig`.  
\- If you need fresh data each time, keep `cache_mode=CacheMode.BYPASS`.

5\. **Hooks**  
\- You can set up global hooks for each crawler (like to block images) or per-run if you want.  
\- Keep them consistent if you’re reusing sessions.

* * *

## 5\. Summary

  * **One** `AsyncWebCrawler` \+ multiple calls to `.arun()` is far more efficient than launching a new crawler per URL. 
  * **Sequential** approach with a shared session is simple and memory-friendly for moderate sets of URLs. 
  * **Parallel** approach can speed up large crawls by concurrency, but keep concurrency balanced to avoid overhead. 
  * Close the crawler once at the end, ensuring the browser is only opened/closed once.



For even more advanced memory optimizations or dynamic concurrency patterns, see future sections on hooking or distributed crawling. The patterns above suffice for the majority of multi-URL scenarios—**giving you speed, simplicity, and minimal resource usage**. Enjoy your optimized crawling!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
