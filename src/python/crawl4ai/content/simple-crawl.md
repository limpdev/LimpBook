[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.4.html#)



  * [Home](index.md)
  * Setup & Installation
    * [Installation](index.html.1.1.md)
    * [Docker Deployment](index.html.1.2.md)
  * [Quick Start](index.html.1.md)
  * Blog & Changelog
    * [Blog Home](index.html.1.3.md)
    * [Changelog](https://github.com/unclecode/crawl4ai/blob/main/CHANGELOG.md)
  * Core
    * Simple Crawling
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
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [Simple Crawling](index.html.1.4.html#simple-crawling)
  * [Basic Usage](index.html.1.4.html#basic-usage)
  * [Understanding the Response](index.html.1.4.html#understanding-the-response)
  * [Adding Basic Options](index.html.1.4.html#adding-basic-options)
  * [Handling Errors](index.html.1.4.html#handling-errors)
  * [Logging and Debugging](index.html.1.4.html#logging-and-debugging)
  * [Complete Example](index.html.1.4.html#complete-example)



# Simple Crawling

This guide covers the basics of web crawling with Crawl4AI. You'll learn how to set up a crawler, make your first request, and understand the response.

## Basic Usage

Set up a simple crawl using `BrowserConfig` and `CrawlerRunConfig`:
    
    
    [](index.html.1.4.html#__codelineno-0-1)import asyncio
    [](index.html.1.4.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.4.html#__codelineno-0-3)from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
    [](index.html.1.4.html#__codelineno-0-4)
    [](index.html.1.4.html#__codelineno-0-5)async def main():
    [](index.html.1.4.html#__codelineno-0-6)    browser_config = BrowserConfig()  # Default browser configuration
    [](index.html.1.4.html#__codelineno-0-7)    run_config = CrawlerRunConfig()   # Default crawl run configuration
    [](index.html.1.4.html#__codelineno-0-8)
    [](index.html.1.4.html#__codelineno-0-9)    async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.4.html#__codelineno-0-10)        result = await crawler.arun(
    [](index.html.1.4.html#__codelineno-0-11)            url="https://example.com",
    [](index.html.1.4.html#__codelineno-0-12)            config=run_config
    [](index.html.1.4.html#__codelineno-0-13)        )
    [](index.html.1.4.html#__codelineno-0-14)        print(result.markdown)  # Print clean markdown content
    [](index.html.1.4.html#__codelineno-0-15)
    [](index.html.1.4.html#__codelineno-0-16)if __name__ == "__main__":
    [](index.html.1.4.html#__codelineno-0-17)    asyncio.run(main())
    

## Understanding the Response

The `arun()` method returns a `CrawlResult` object with several useful properties. Here's a quick overview (see [CrawlResult](index.html.1.31.md) for complete details):
    
    
    [](index.html.1.4.html#__codelineno-1-1)result = await crawler.arun(
    [](index.html.1.4.html#__codelineno-1-2)    url="https://example.com",
    [](index.html.1.4.html#__codelineno-1-3)    config=CrawlerRunConfig(fit_markdown=True)
    [](index.html.1.4.html#__codelineno-1-4))
    [](index.html.1.4.html#__codelineno-1-5)
    [](index.html.1.4.html#__codelineno-1-6)# Different content formats
    [](index.html.1.4.html#__codelineno-1-7)print(result.html)         # Raw HTML
    [](index.html.1.4.html#__codelineno-1-8)print(result.cleaned_html) # Cleaned HTML
    [](index.html.1.4.html#__codelineno-1-9)print(result.markdown)     # Markdown version
    [](index.html.1.4.html#__codelineno-1-10)print(result.fit_markdown) # Most relevant content in markdown
    [](index.html.1.4.html#__codelineno-1-11)
    [](index.html.1.4.html#__codelineno-1-12)# Check success status
    [](index.html.1.4.html#__codelineno-1-13)print(result.success)      # True if crawl succeeded
    [](index.html.1.4.html#__codelineno-1-14)print(result.status_code)  # HTTP status code (e.g., 200, 404)
    [](index.html.1.4.html#__codelineno-1-15)
    [](index.html.1.4.html#__codelineno-1-16)# Access extracted media and links
    [](index.html.1.4.html#__codelineno-1-17)print(result.media)        # Dictionary of found media (images, videos, audio)
    [](index.html.1.4.html#__codelineno-1-18)print(result.links)        # Dictionary of internal and external links
    

## Adding Basic Options

Customize your crawl using `CrawlerRunConfig`:
    
    
    [](index.html.1.4.html#__codelineno-2-1)run_config = CrawlerRunConfig(
    [](index.html.1.4.html#__codelineno-2-2)    word_count_threshold=10,        # Minimum words per content block
    [](index.html.1.4.html#__codelineno-2-3)    exclude_external_links=True,    # Remove external links
    [](index.html.1.4.html#__codelineno-2-4)    remove_overlay_elements=True,   # Remove popups/modals
    [](index.html.1.4.html#__codelineno-2-5)    process_iframes=True           # Process iframe content
    [](index.html.1.4.html#__codelineno-2-6))
    [](index.html.1.4.html#__codelineno-2-7)
    [](index.html.1.4.html#__codelineno-2-8)result = await crawler.arun(
    [](index.html.1.4.html#__codelineno-2-9)    url="https://example.com",
    [](index.html.1.4.html#__codelineno-2-10)    config=run_config
    [](index.html.1.4.html#__codelineno-2-11))
    

## Handling Errors

Always check if the crawl was successful:
    
    
    [](index.html.1.4.html#__codelineno-3-1)run_config = CrawlerRunConfig()
    [](index.html.1.4.html#__codelineno-3-2)result = await crawler.arun(url="https://example.com", config=run_config)
    [](index.html.1.4.html#__codelineno-3-3)
    [](index.html.1.4.html#__codelineno-3-4)if not result.success:
    [](index.html.1.4.html#__codelineno-3-5)    print(f"Crawl failed: {result.error_message}")
    [](index.html.1.4.html#__codelineno-3-6)    print(f"Status code: {result.status_code}")
    

## Logging and Debugging

Enable verbose logging in `BrowserConfig`:
    
    
    [](index.html.1.4.html#__codelineno-4-1)browser_config = BrowserConfig(verbose=True)
    [](index.html.1.4.html#__codelineno-4-2)
    [](index.html.1.4.html#__codelineno-4-3)async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.4.html#__codelineno-4-4)    run_config = CrawlerRunConfig()
    [](index.html.1.4.html#__codelineno-4-5)    result = await crawler.arun(url="https://example.com", config=run_config)
    

## Complete Example

Here's a more comprehensive example demonstrating common usage patterns:
    
    
    [](index.html.1.4.html#__codelineno-5-1)import asyncio
    [](index.html.1.4.html#__codelineno-5-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.4.html#__codelineno-5-3)from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.4.html#__codelineno-5-4)
    [](index.html.1.4.html#__codelineno-5-5)async def main():
    [](index.html.1.4.html#__codelineno-5-6)    browser_config = BrowserConfig(verbose=True)
    [](index.html.1.4.html#__codelineno-5-7)    run_config = CrawlerRunConfig(
    [](index.html.1.4.html#__codelineno-5-8)        # Content filtering
    [](index.html.1.4.html#__codelineno-5-9)        word_count_threshold=10,
    [](index.html.1.4.html#__codelineno-5-10)        excluded_tags=['form', 'header'],
    [](index.html.1.4.html#__codelineno-5-11)        exclude_external_links=True,
    [](index.html.1.4.html#__codelineno-5-12)
    [](index.html.1.4.html#__codelineno-5-13)        # Content processing
    [](index.html.1.4.html#__codelineno-5-14)        process_iframes=True,
    [](index.html.1.4.html#__codelineno-5-15)        remove_overlay_elements=True,
    [](index.html.1.4.html#__codelineno-5-16)
    [](index.html.1.4.html#__codelineno-5-17)        # Cache control
    [](index.html.1.4.html#__codelineno-5-18)        cache_mode=CacheMode.ENABLED  # Use cache if available
    [](index.html.1.4.html#__codelineno-5-19)    )
    [](index.html.1.4.html#__codelineno-5-20)
    [](index.html.1.4.html#__codelineno-5-21)    async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.4.html#__codelineno-5-22)        result = await crawler.arun(
    [](index.html.1.4.html#__codelineno-5-23)            url="https://example.com",
    [](index.html.1.4.html#__codelineno-5-24)            config=run_config
    [](index.html.1.4.html#__codelineno-5-25)        )
    [](index.html.1.4.html#__codelineno-5-26)
    [](index.html.1.4.html#__codelineno-5-27)        if result.success:
    [](index.html.1.4.html#__codelineno-5-28)            # Print clean content
    [](index.html.1.4.html#__codelineno-5-29)            print("Content:", result.markdown[:500])  # First 500 chars
    [](index.html.1.4.html#__codelineno-5-30)
    [](index.html.1.4.html#__codelineno-5-31)            # Process images
    [](index.html.1.4.html#__codelineno-5-32)            for image in result.media["images"]:
    [](index.html.1.4.html#__codelineno-5-33)                print(f"Found image: {image['src']}")
    [](index.html.1.4.html#__codelineno-5-34)
    [](index.html.1.4.html#__codelineno-5-35)            # Process links
    [](index.html.1.4.html#__codelineno-5-36)            for link in result.links["internal"]:
    [](index.html.1.4.html#__codelineno-5-37)                print(f"Internal link: {link['href']}")
    [](index.html.1.4.html#__codelineno-5-38)
    [](index.html.1.4.html#__codelineno-5-39)        else:
    [](index.html.1.4.html#__codelineno-5-40)            print(f"Crawl failed: {result.error_message}")
    [](index.html.1.4.html#__codelineno-5-41)
    [](index.html.1.4.html#__codelineno-5-42)if __name__ == "__main__":
    [](index.html.1.4.html#__codelineno-5-43)    asyncio.run(main())
    

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
