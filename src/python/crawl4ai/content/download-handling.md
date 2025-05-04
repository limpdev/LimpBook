[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.15.html#)



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
    * File Downloading
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

  * [Download Handling in Crawl4AI](index.html.1.15.html#download-handling-in-crawl4ai)
  * [Enabling Downloads](index.html.1.15.html#enabling-downloads)
  * [Specifying Download Location](index.html.1.15.html#specifying-download-location)
  * [Triggering Downloads](index.html.1.15.html#triggering-downloads)
  * [Accessing Downloaded Files](index.html.1.15.html#accessing-downloaded-files)
  * [Example: Downloading Multiple Files](index.html.1.15.html#example-downloading-multiple-files)
  * [Important Considerations](index.html.1.15.html#important-considerations)



# Download Handling in Crawl4AI

This guide explains how to use Crawl4AI to handle file downloads during crawling. You'll learn how to trigger downloads, specify download locations, and access downloaded files.

## Enabling Downloads

To enable downloads, set the `accept_downloads` parameter in the `BrowserConfig` object and pass it to the crawler.
    
    
    [](index.html.1.15.html#__codelineno-0-1)from crawl4ai.async_configs import BrowserConfig, AsyncWebCrawler
    [](index.html.1.15.html#__codelineno-0-2)
    [](index.html.1.15.html#__codelineno-0-3)async def main():
    [](index.html.1.15.html#__codelineno-0-4)    config = BrowserConfig(accept_downloads=True)  # Enable downloads globally
    [](index.html.1.15.html#__codelineno-0-5)    async with AsyncWebCrawler(config=config) as crawler:
    [](index.html.1.15.html#__codelineno-0-6)        # ... your crawling logic ...
    [](index.html.1.15.html#__codelineno-0-7)
    [](index.html.1.15.html#__codelineno-0-8)asyncio.run(main())
    

## Specifying Download Location

Specify the download directory using the `downloads_path` attribute in the `BrowserConfig` object. If not provided, Crawl4AI defaults to creating a "downloads" directory inside the `.crawl4ai` folder in your home directory.
    
    
    [](index.html.1.15.html#__codelineno-1-1)from crawl4ai.async_configs import BrowserConfig
    [](index.html.1.15.html#__codelineno-1-2)import os
    [](index.html.1.15.html#__codelineno-1-3)
    [](index.html.1.15.html#__codelineno-1-4)downloads_path = os.path.join(os.getcwd(), "my_downloads")  # Custom download path
    [](index.html.1.15.html#__codelineno-1-5)os.makedirs(downloads_path, exist_ok=True)
    [](index.html.1.15.html#__codelineno-1-6)
    [](index.html.1.15.html#__codelineno-1-7)config = BrowserConfig(accept_downloads=True, downloads_path=downloads_path)
    [](index.html.1.15.html#__codelineno-1-8)
    [](index.html.1.15.html#__codelineno-1-9)async def main():
    [](index.html.1.15.html#__codelineno-1-10)    async with AsyncWebCrawler(config=config) as crawler:
    [](index.html.1.15.html#__codelineno-1-11)        result = await crawler.arun(url="https://example.com")
    [](index.html.1.15.html#__codelineno-1-12)        # ...
    

## Triggering Downloads

Downloads are typically triggered by user interactions on a web page, such as clicking a download button. Use `js_code` in `CrawlerRunConfig` to simulate these actions and `wait_for` to allow sufficient time for downloads to start.
    
    
    [](index.html.1.15.html#__codelineno-2-1)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.15.html#__codelineno-2-2)
    [](index.html.1.15.html#__codelineno-2-3)config = CrawlerRunConfig(
    [](index.html.1.15.html#__codelineno-2-4)    js_code="""
    [](index.html.1.15.html#__codelineno-2-5)        const downloadLink = document.querySelector('a[href$=".exe"]');
    [](index.html.1.15.html#__codelineno-2-6)        if (downloadLink) {
    [](index.html.1.15.html#__codelineno-2-7)            downloadLink.click();
    [](index.html.1.15.html#__codelineno-2-8)        }
    [](index.html.1.15.html#__codelineno-2-9)    """,
    [](index.html.1.15.html#__codelineno-2-10)    wait_for=5  # Wait 5 seconds for the download to start
    [](index.html.1.15.html#__codelineno-2-11))
    [](index.html.1.15.html#__codelineno-2-12)
    [](index.html.1.15.html#__codelineno-2-13)result = await crawler.arun(url="https://www.python.org/downloads/", config=config)
    

## Accessing Downloaded Files

The `downloaded_files` attribute of the `CrawlResult` object contains paths to downloaded files.
    
    
    [](index.html.1.15.html#__codelineno-3-1)if result.downloaded_files:
    [](index.html.1.15.html#__codelineno-3-2)    print("Downloaded files:")
    [](index.html.1.15.html#__codelineno-3-3)    for file_path in result.downloaded_files:
    [](index.html.1.15.html#__codelineno-3-4)        print(f"- {file_path}")
    [](index.html.1.15.html#__codelineno-3-5)        file_size = os.path.getsize(file_path)
    [](index.html.1.15.html#__codelineno-3-6)        print(f"- File size: {file_size} bytes")
    [](index.html.1.15.html#__codelineno-3-7)else:
    [](index.html.1.15.html#__codelineno-3-8)    print("No files downloaded.")
    

## Example: Downloading Multiple Files
    
    
    [](index.html.1.15.html#__codelineno-4-1)from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
    [](index.html.1.15.html#__codelineno-4-2)import os
    [](index.html.1.15.html#__codelineno-4-3)from pathlib import Path
    [](index.html.1.15.html#__codelineno-4-4)
    [](index.html.1.15.html#__codelineno-4-5)async def download_multiple_files(url: str, download_path: str):
    [](index.html.1.15.html#__codelineno-4-6)    config = BrowserConfig(accept_downloads=True, downloads_path=download_path)
    [](index.html.1.15.html#__codelineno-4-7)    async with AsyncWebCrawler(config=config) as crawler:
    [](index.html.1.15.html#__codelineno-4-8)        run_config = CrawlerRunConfig(
    [](index.html.1.15.html#__codelineno-4-9)            js_code="""
    [](index.html.1.15.html#__codelineno-4-10)                const downloadLinks = document.querySelectorAll('a[download]');
    [](index.html.1.15.html#__codelineno-4-11)                for (const link of downloadLinks) {
    [](index.html.1.15.html#__codelineno-4-12)                    link.click();
    [](index.html.1.15.html#__codelineno-4-13)                    // Delay between clicks
    [](index.html.1.15.html#__codelineno-4-14)                    await new Promise(r => setTimeout(r, 2000));  
    [](index.html.1.15.html#__codelineno-4-15)                }
    [](index.html.1.15.html#__codelineno-4-16)            """,
    [](index.html.1.15.html#__codelineno-4-17)            wait_for=10  # Wait for all downloads to start
    [](index.html.1.15.html#__codelineno-4-18)        )
    [](index.html.1.15.html#__codelineno-4-19)        result = await crawler.arun(url=url, config=run_config)
    [](index.html.1.15.html#__codelineno-4-20)
    [](index.html.1.15.html#__codelineno-4-21)        if result.downloaded_files:
    [](index.html.1.15.html#__codelineno-4-22)            print("Downloaded files:")
    [](index.html.1.15.html#__codelineno-4-23)            for file in result.downloaded_files:
    [](index.html.1.15.html#__codelineno-4-24)                print(f"- {file}")
    [](index.html.1.15.html#__codelineno-4-25)        else:
    [](index.html.1.15.html#__codelineno-4-26)            print("No files downloaded.")
    [](index.html.1.15.html#__codelineno-4-27)
    [](index.html.1.15.html#__codelineno-4-28)# Usage
    [](index.html.1.15.html#__codelineno-4-29)download_path = os.path.join(Path.home(), ".crawl4ai", "downloads")
    [](index.html.1.15.html#__codelineno-4-30)os.makedirs(download_path, exist_ok=True)
    [](index.html.1.15.html#__codelineno-4-31)
    [](index.html.1.15.html#__codelineno-4-32)asyncio.run(download_multiple_files("https://www.python.org/downloads/windows/", download_path))
    

## Important Considerations

  * **Browser Context:** Downloads are managed within the browser context. Ensure `js_code` correctly targets the download triggers on the webpage.
  * **Timing:** Use `wait_for` in `CrawlerRunConfig` to manage download timing.
  * **Error Handling:** Handle errors to manage failed downloads or incorrect paths gracefully.
  * **Security:** Scan downloaded files for potential security threats before use.



This revised guide ensures consistency with the `Crawl4AI` codebase by using `BrowserConfig` and `CrawlerRunConfig` for all download-related configurations. Let me know if further adjustments are needed!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
