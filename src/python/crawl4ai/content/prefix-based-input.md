[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.12.html#)



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
    * Local Files & Raw HTML
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

  * [Prefix-Based Input Handling in Crawl4AI](index.html.1.12.html#prefix-based-input-handling-in-crawl4ai)
  * [Crawling a Web URL](index.html.1.12.html#crawling-a-web-url)
  * [Crawling a Local HTML File](index.html.1.12.html#crawling-a-local-html-file)
  * [Crawling Raw HTML Content](index.html.1.12.html#crawling-raw-html-content)
  * [Complete Example](index.html.1.12.html#complete-example)
  * [Conclusion](index.html.1.12.html#conclusion)



# Prefix-Based Input Handling in Crawl4AI

This guide will walk you through using the Crawl4AI library to crawl web pages, local HTML files, and raw HTML strings. We'll demonstrate these capabilities using a Wikipedia page as an example.

## Crawling a Web URL

To crawl a live web page, provide the URL starting with `http://` or `https://`, using a `CrawlerRunConfig` object:
    
    
    [](index.html.1.12.html#__codelineno-0-1)import asyncio
    [](index.html.1.12.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.12.html#__codelineno-0-3)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.12.html#__codelineno-0-4)
    [](index.html.1.12.html#__codelineno-0-5)async def crawl_web():
    [](index.html.1.12.html#__codelineno-0-6)    config = CrawlerRunConfig(bypass_cache=True)
    [](index.html.1.12.html#__codelineno-0-7)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.12.html#__codelineno-0-8)        result = await crawler.arun(
    [](index.html.1.12.html#__codelineno-0-9)            url="https://en.wikipedia.org/wiki/apple", 
    [](index.html.1.12.html#__codelineno-0-10)            config=config
    [](index.html.1.12.html#__codelineno-0-11)        )
    [](index.html.1.12.html#__codelineno-0-12)        if result.success:
    [](index.html.1.12.html#__codelineno-0-13)            print("Markdown Content:")
    [](index.html.1.12.html#__codelineno-0-14)            print(result.markdown)
    [](index.html.1.12.html#__codelineno-0-15)        else:
    [](index.html.1.12.html#__codelineno-0-16)            print(f"Failed to crawl: {result.error_message}")
    [](index.html.1.12.html#__codelineno-0-17)
    [](index.html.1.12.html#__codelineno-0-18)asyncio.run(crawl_web())
    

## Crawling a Local HTML File

To crawl a local HTML file, prefix the file path with `file://`.
    
    
    [](index.html.1.12.html#__codelineno-1-1)import asyncio
    [](index.html.1.12.html#__codelineno-1-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.12.html#__codelineno-1-3)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.12.html#__codelineno-1-4)
    [](index.html.1.12.html#__codelineno-1-5)async def crawl_local_file():
    [](index.html.1.12.html#__codelineno-1-6)    local_file_path = "/path/to/apple.html"  # Replace with your file path
    [](index.html.1.12.html#__codelineno-1-7)    file_url = f"file://{local_file_path}"
    [](index.html.1.12.html#__codelineno-1-8)    config = CrawlerRunConfig(bypass_cache=True)
    [](index.html.1.12.html#__codelineno-1-9)
    [](index.html.1.12.html#__codelineno-1-10)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.12.html#__codelineno-1-11)        result = await crawler.arun(url=file_url, config=config)
    [](index.html.1.12.html#__codelineno-1-12)        if result.success:
    [](index.html.1.12.html#__codelineno-1-13)            print("Markdown Content from Local File:")
    [](index.html.1.12.html#__codelineno-1-14)            print(result.markdown)
    [](index.html.1.12.html#__codelineno-1-15)        else:
    [](index.html.1.12.html#__codelineno-1-16)            print(f"Failed to crawl local file: {result.error_message}")
    [](index.html.1.12.html#__codelineno-1-17)
    [](index.html.1.12.html#__codelineno-1-18)asyncio.run(crawl_local_file())
    

## Crawling Raw HTML Content

To crawl raw HTML content, prefix the HTML string with `raw:`.
    
    
    [](index.html.1.12.html#__codelineno-2-1)import asyncio
    [](index.html.1.12.html#__codelineno-2-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.12.html#__codelineno-2-3)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.12.html#__codelineno-2-4)
    [](index.html.1.12.html#__codelineno-2-5)async def crawl_raw_html():
    [](index.html.1.12.html#__codelineno-2-6)    raw_html = "<html><body><h1>Hello, World!</h1></body></html>"
    [](index.html.1.12.html#__codelineno-2-7)    raw_html_url = f"raw:{raw_html}"
    [](index.html.1.12.html#__codelineno-2-8)    config = CrawlerRunConfig(bypass_cache=True)
    [](index.html.1.12.html#__codelineno-2-9)
    [](index.html.1.12.html#__codelineno-2-10)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.12.html#__codelineno-2-11)        result = await crawler.arun(url=raw_html_url, config=config)
    [](index.html.1.12.html#__codelineno-2-12)        if result.success:
    [](index.html.1.12.html#__codelineno-2-13)            print("Markdown Content from Raw HTML:")
    [](index.html.1.12.html#__codelineno-2-14)            print(result.markdown)
    [](index.html.1.12.html#__codelineno-2-15)        else:
    [](index.html.1.12.html#__codelineno-2-16)            print(f"Failed to crawl raw HTML: {result.error_message}")
    [](index.html.1.12.html#__codelineno-2-17)
    [](index.html.1.12.html#__codelineno-2-18)asyncio.run(crawl_raw_html())
    

* * *

# Complete Example

Below is a comprehensive script that:

  1. Crawls the Wikipedia page for "Apple."
  2. Saves the HTML content to a local file (`apple.html`).
  3. Crawls the local HTML file and verifies the markdown length matches the original crawl.
  4. Crawls the raw HTML content from the saved file and verifies consistency.


    
    
    [](index.html.1.12.html#__codelineno-3-1)import os
    [](index.html.1.12.html#__codelineno-3-2)import sys
    [](index.html.1.12.html#__codelineno-3-3)import asyncio
    [](index.html.1.12.html#__codelineno-3-4)from pathlib import Path
    [](index.html.1.12.html#__codelineno-3-5)from crawl4ai import AsyncWebCrawler
    [](index.html.1.12.html#__codelineno-3-6)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.12.html#__codelineno-3-7)
    [](index.html.1.12.html#__codelineno-3-8)async def main():
    [](index.html.1.12.html#__codelineno-3-9)    wikipedia_url = "https://en.wikipedia.org/wiki/apple"
    [](index.html.1.12.html#__codelineno-3-10)    script_dir = Path(__file__).parent
    [](index.html.1.12.html#__codelineno-3-11)    html_file_path = script_dir / "apple.html"
    [](index.html.1.12.html#__codelineno-3-12)
    [](index.html.1.12.html#__codelineno-3-13)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.12.html#__codelineno-3-14)        # Step 1: Crawl the Web URL
    [](index.html.1.12.html#__codelineno-3-15)        print("\n=== Step 1: Crawling the Wikipedia URL ===")
    [](index.html.1.12.html#__codelineno-3-16)        web_config = CrawlerRunConfig(bypass_cache=True)
    [](index.html.1.12.html#__codelineno-3-17)        result = await crawler.arun(url=wikipedia_url, config=web_config)
    [](index.html.1.12.html#__codelineno-3-18)
    [](index.html.1.12.html#__codelineno-3-19)        if not result.success:
    [](index.html.1.12.html#__codelineno-3-20)            print(f"Failed to crawl {wikipedia_url}: {result.error_message}")
    [](index.html.1.12.html#__codelineno-3-21)            return
    [](index.html.1.12.html#__codelineno-3-22)
    [](index.html.1.12.html#__codelineno-3-23)        with open(html_file_path, 'w', encoding='utf-8') as f:
    [](index.html.1.12.html#__codelineno-3-24)            f.write(result.html)
    [](index.html.1.12.html#__codelineno-3-25)        web_crawl_length = len(result.markdown)
    [](index.html.1.12.html#__codelineno-3-26)        print(f"Length of markdown from web crawl: {web_crawl_length}\n")
    [](index.html.1.12.html#__codelineno-3-27)
    [](index.html.1.12.html#__codelineno-3-28)        # Step 2: Crawl from the Local HTML File
    [](index.html.1.12.html#__codelineno-3-29)        print("=== Step 2: Crawling from the Local HTML File ===")
    [](index.html.1.12.html#__codelineno-3-30)        file_url = f"file://{html_file_path.resolve()}"
    [](index.html.1.12.html#__codelineno-3-31)        file_config = CrawlerRunConfig(bypass_cache=True)
    [](index.html.1.12.html#__codelineno-3-32)        local_result = await crawler.arun(url=file_url, config=file_config)
    [](index.html.1.12.html#__codelineno-3-33)
    [](index.html.1.12.html#__codelineno-3-34)        if not local_result.success:
    [](index.html.1.12.html#__codelineno-3-35)            print(f"Failed to crawl local file {file_url}: {local_result.error_message}")
    [](index.html.1.12.html#__codelineno-3-36)            return
    [](index.html.1.12.html#__codelineno-3-37)
    [](index.html.1.12.html#__codelineno-3-38)        local_crawl_length = len(local_result.markdown)
    [](index.html.1.12.html#__codelineno-3-39)        assert web_crawl_length == local_crawl_length, "Markdown length mismatch"
    [](index.html.1.12.html#__codelineno-3-40)        print("✅ Markdown length matches between web and local file crawl.\n")
    [](index.html.1.12.html#__codelineno-3-41)
    [](index.html.1.12.html#__codelineno-3-42)        # Step 3: Crawl Using Raw HTML Content
    [](index.html.1.12.html#__codelineno-3-43)        print("=== Step 3: Crawling Using Raw HTML Content ===")
    [](index.html.1.12.html#__codelineno-3-44)        with open(html_file_path, 'r', encoding='utf-8') as f:
    [](index.html.1.12.html#__codelineno-3-45)            raw_html_content = f.read()
    [](index.html.1.12.html#__codelineno-3-46)        raw_html_url = f"raw:{raw_html_content}"
    [](index.html.1.12.html#__codelineno-3-47)        raw_config = CrawlerRunConfig(bypass_cache=True)
    [](index.html.1.12.html#__codelineno-3-48)        raw_result = await crawler.arun(url=raw_html_url, config=raw_config)
    [](index.html.1.12.html#__codelineno-3-49)
    [](index.html.1.12.html#__codelineno-3-50)        if not raw_result.success:
    [](index.html.1.12.html#__codelineno-3-51)            print(f"Failed to crawl raw HTML content: {raw_result.error_message}")
    [](index.html.1.12.html#__codelineno-3-52)            return
    [](index.html.1.12.html#__codelineno-3-53)
    [](index.html.1.12.html#__codelineno-3-54)        raw_crawl_length = len(raw_result.markdown)
    [](index.html.1.12.html#__codelineno-3-55)        assert web_crawl_length == raw_crawl_length, "Markdown length mismatch"
    [](index.html.1.12.html#__codelineno-3-56)        print("✅ Markdown length matches between web and raw HTML crawl.\n")
    [](index.html.1.12.html#__codelineno-3-57)
    [](index.html.1.12.html#__codelineno-3-58)        print("All tests passed successfully!")
    [](index.html.1.12.html#__codelineno-3-59)    if html_file_path.exists():
    [](index.html.1.12.html#__codelineno-3-60)        os.remove(html_file_path)
    [](index.html.1.12.html#__codelineno-3-61)
    [](index.html.1.12.html#__codelineno-3-62)if __name__ == "__main__":
    [](index.html.1.12.html#__codelineno-3-63)    asyncio.run(main())
    

* * *

# Conclusion

With the unified `url` parameter and prefix-based handling in **Crawl4AI** , you can seamlessly handle web URLs, local HTML files, and raw HTML content. Use `CrawlerRunConfig` for flexible and consistent configuration in all scenarios.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
