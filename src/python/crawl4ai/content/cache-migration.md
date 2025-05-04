[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.11.html#)



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
    * Cache Modes
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

  * [Crawl4AI Cache System and Migration Guide](index.html.1.11.html#crawl4ai-cache-system-and-migration-guide)
  * [Overview](index.html.1.11.html#overview)
  * [Old vs New Approach](index.html.1.11.html#old-vs-new-approach)
  * [Migration Example](index.html.1.11.html#migration-example)
  * [Common Migration Patterns](index.html.1.11.html#common-migration-patterns)



# Crawl4AI Cache System and Migration Guide

## Overview

Starting from version 0.5.0, Crawl4AI introduces a new caching system that replaces the old boolean flags with a more intuitive `CacheMode` enum. This change simplifies cache control and makes the behavior more predictable.

## Old vs New Approach

### Old Way (Deprecated)

The old system used multiple boolean flags: \- `bypass_cache`: Skip cache entirely \- `disable_cache`: Disable all caching \- `no_cache_read`: Don't read from cache \- `no_cache_write`: Don't write to cache

### New Way (Recommended)

The new system uses a single `CacheMode` enum: \- `CacheMode.ENABLED`: Normal caching (read/write) \- `CacheMode.DISABLED`: No caching at all \- `CacheMode.READ_ONLY`: Only read from cache \- `CacheMode.WRITE_ONLY`: Only write to cache \- `CacheMode.BYPASS`: Skip cache for this operation

## Migration Example

### Old Code (Deprecated)
    
    
    [](index.html.1.11.html#__codelineno-0-1)import asyncio
    [](index.html.1.11.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.11.html#__codelineno-0-3)
    [](index.html.1.11.html#__codelineno-0-4)async def use_proxy():
    [](index.html.1.11.html#__codelineno-0-5)    async with AsyncWebCrawler(verbose=True) as crawler:
    [](index.html.1.11.html#__codelineno-0-6)        result = await crawler.arun(
    [](index.html.1.11.html#__codelineno-0-7)            url="https://www.nbcnews.com/business",
    [](index.html.1.11.html#__codelineno-0-8)            bypass_cache=True  # Old way
    [](index.html.1.11.html#__codelineno-0-9)        )
    [](index.html.1.11.html#__codelineno-0-10)        print(len(result.markdown))
    [](index.html.1.11.html#__codelineno-0-11)
    [](index.html.1.11.html#__codelineno-0-12)async def main():
    [](index.html.1.11.html#__codelineno-0-13)    await use_proxy()
    [](index.html.1.11.html#__codelineno-0-14)
    [](index.html.1.11.html#__codelineno-0-15)if __name__ == "__main__":
    [](index.html.1.11.html#__codelineno-0-16)    asyncio.run(main())
    

### New Code (Recommended)
    
    
    [](index.html.1.11.html#__codelineno-1-1)import asyncio
    [](index.html.1.11.html#__codelineno-1-2)from crawl4ai import AsyncWebCrawler, CacheMode
    [](index.html.1.11.html#__codelineno-1-3)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.11.html#__codelineno-1-4)
    [](index.html.1.11.html#__codelineno-1-5)async def use_proxy():
    [](index.html.1.11.html#__codelineno-1-6)    # Use CacheMode in CrawlerRunConfig
    [](index.html.1.11.html#__codelineno-1-7)    config = CrawlerRunConfig(cache_mode=CacheMode.BYPASS)  
    [](index.html.1.11.html#__codelineno-1-8)    async with AsyncWebCrawler(verbose=True) as crawler:
    [](index.html.1.11.html#__codelineno-1-9)        result = await crawler.arun(
    [](index.html.1.11.html#__codelineno-1-10)            url="https://www.nbcnews.com/business",
    [](index.html.1.11.html#__codelineno-1-11)            config=config  # Pass the configuration object
    [](index.html.1.11.html#__codelineno-1-12)        )
    [](index.html.1.11.html#__codelineno-1-13)        print(len(result.markdown))
    [](index.html.1.11.html#__codelineno-1-14)
    [](index.html.1.11.html#__codelineno-1-15)async def main():
    [](index.html.1.11.html#__codelineno-1-16)    await use_proxy()
    [](index.html.1.11.html#__codelineno-1-17)
    [](index.html.1.11.html#__codelineno-1-18)if __name__ == "__main__":
    [](index.html.1.11.html#__codelineno-1-19)    asyncio.run(main())
    

## Common Migration Patterns

Old Flag | New Mode  
---|---  
`bypass_cache=True` | `cache_mode=CacheMode.BYPASS`  
`disable_cache=True` | `cache_mode=CacheMode.DISABLED`  
`no_cache_read=True` | `cache_mode=CacheMode.WRITE_ONLY`  
`no_cache_write=True` | `cache_mode=CacheMode.READ_ONLY`  
  
* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
