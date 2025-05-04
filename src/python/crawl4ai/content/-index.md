[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html#)



  * Home
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
    * [Browser & Crawler Config](index.html.1.30.md)
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [🚀🤖 Crawl4AI: Open-Source LLM-Friendly Web Crawler & Scraper](index.html#crawl4ai-open-source-llm-friendly-web-crawler-scraper)
  * [Quick Start](index.html#quick-start)
  * [What Does Crawl4AI Do?](index.html#what-does-crawl4ai-do)
  * [Documentation Structure](index.html#documentation-structure)
  * [How You Can Support](index.html#how-you-can-support)
  * [Quick Links](index.html#quick-links)



# 🚀🤖 Crawl4AI: Open-Source LLM-Friendly Web Crawler & Scraper

[ ![unclecode%2Fcrawl4ai | Trendshift](https://trendshift.io/api/badge/repositories/11716) ](https://trendshift.io/repositories/11716)

[ ![GitHub Stars](https://img.shields.io/github/stars/unclecode/crawl4ai?style=social) ](https://github.com/unclecode/crawl4ai/stargazers) [ ![GitHub Forks](https://img.shields.io/github/forks/unclecode/crawl4ai?style=social) ](https://github.com/unclecode/crawl4ai/network/members) [ ![PyPI version](https://badge.fury.io/py/crawl4ai.svg) ](https://badge.fury.io/py/crawl4ai)

[ ![Python Version](https://img.shields.io/pypi/pyversions/crawl4ai) ](https://pypi.org/project/crawl4ai/) [ ![Downloads](https://static.pepy.tech/badge/crawl4ai/month) ](https://pepy.tech/project/crawl4ai) [ ![License](https://img.shields.io/github/license/unclecode/crawl4ai) ](https://github.com/unclecode/crawl4ai/blob/main/LICENSE)

Crawl4AI is the #1 trending GitHub repository, actively maintained by a vibrant community. It delivers blazing-fast, AI-ready web crawling tailored for large language models, AI agents, and data pipelines. Fully open source, flexible, and built for real-time performance, **Crawl4AI** empowers developers with unmatched speed, precision, and deployment ease.

> **Note** : If you're looking for the old documentation, you can access it [here](https://old.docs.crawl4ai.com).

## Quick Start

Here's a quick example to show you how easy it is to use Crawl4AI with its asynchronous capabilities:
    
    
    [](index.html#__codelineno-0-1)import asyncio
    [](index.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler
    [](index.html#__codelineno-0-3)
    [](index.html#__codelineno-0-4)async def main():
    [](index.html#__codelineno-0-5)    # Create an instance of AsyncWebCrawler
    [](index.html#__codelineno-0-6)    async with AsyncWebCrawler() as crawler:
    [](index.html#__codelineno-0-7)        # Run the crawler on a URL
    [](index.html#__codelineno-0-8)        result = await crawler.arun(url="https://crawl4ai.com")
    [](index.html#__codelineno-0-9)
    [](index.html#__codelineno-0-10)        # Print the extracted content
    [](index.html#__codelineno-0-11)        print(result.markdown)
    [](index.html#__codelineno-0-12)
    [](index.html#__codelineno-0-13)# Run the async main function
    [](index.html#__codelineno-0-14)asyncio.run(main())
    

* * *

## What Does Crawl4AI Do?

Crawl4AI is a feature-rich crawler and scraper that aims to:

1\. **Generate Clean Markdown** : Perfect for RAG pipelines or direct ingestion into LLMs.  
2\. **Structured Extraction** : Parse repeated patterns with CSS, XPath, or LLM-based extraction.  
3\. **Advanced Browser Control** : Hooks, proxies, stealth modes, session re-use—fine-grained control.  
4\. **High Performance** : Parallel crawling, chunk-based extraction, real-time use cases.  
5\. **Open Source** : No forced API keys, no paywalls—everyone can access their data. 

**Core Philosophies** : \- **Democratize Data** : Free to use, transparent, and highly configurable.  
\- **LLM Friendly** : Minimally processed, well-structured text, images, and metadata, so AI models can easily consume it.

* * *

## Documentation Structure

To help you get started, we’ve organized our docs into clear sections:

  * **Setup & Installation**  
Basic instructions to install Crawl4AI via pip or Docker. 
  * **Quick Start**  
A hands-on introduction showing how to do your first crawl, generate Markdown, and do a simple extraction. 
  * **Core**  
Deeper guides on single-page crawling, advanced browser/crawler parameters, content filtering, and caching. 
  * **Advanced**  
Explore link & media handling, lazy loading, hooking & authentication, proxies, session management, and more. 
  * **Extraction**  
Detailed references for no-LLM (CSS, XPath) vs. LLM-based strategies, chunking, and clustering approaches. 
  * **API Reference**  
Find the technical specifics of each class and method, including `AsyncWebCrawler`, `arun()`, and `CrawlResult`.



Throughout these sections, you’ll find code samples you can **copy-paste** into your environment. If something is missing or unclear, raise an issue or PR.

* * *

## How You Can Support

  * **Star & Fork**: If you find Crawl4AI helpful, star the repo on GitHub or fork it to add your own features. 
  * **File Issues** : Encounter a bug or missing feature? Let us know by filing an issue, so we can improve. 
  * **Pull Requests** : Whether it’s a small fix, a big feature, or better docs—contributions are always welcome. 
  * **Join Discord** : Come chat about web scraping, crawling tips, or AI workflows with the community. 
  * **Spread the Word** : Mention Crawl4AI in your blog posts, talks, or on social media. 



**Our mission** : to empower everyone—students, researchers, entrepreneurs, data scientists—to access, parse, and shape the world’s data with speed, cost-efficiency, and creative freedom.

* * *

## Quick Links

  * **[GitHub Repo](https://github.com/unclecode/crawl4ai)**
  * **[Installation Guide](index.html.1.1.md)**
  * **[Quick Start](index.html.1.md)**
  * **[API Reference](index.html.1.28.md)**
  * **[Changelog](https://github.com/unclecode/crawl4ai/blob/main/CHANGELOG.md)**



Thank you for joining me on this journey. Let’s keep building an **open, democratic** approach to data extraction and AI together.

Happy Crawling!  
— _Unclecde, Founder & Maintainer of Crawl4AI_

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
