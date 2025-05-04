[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.1.html#)



  * [Home](index.md)
  * Setup & Installation
    * Installation
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

  * [Installation & Setup (2023 Edition)](index.html.1.1.html#installation-setup-2023-edition)
  * [1\. Basic Installation](index.html.1.1.html#1-basic-installation)
  * [2\. Initial Setup & Diagnostics](index.html.1.1.html#2-initial-setup-diagnostics)
  * [3\. Verifying Installation: A Simple Crawl (Skip this step if you already run crawl4ai-doctor)](index.html.1.1.html#3-verifying-installation-a-simple-crawl-skip-this-step-if-you-already-run-crawl4ai-doctor)
  * [4\. Advanced Installation (Optional)](index.html.1.1.html#4-advanced-installation-optional)
  * [5\. Docker (Experimental)](index.html.1.1.html#5-docker-experimental)
  * [6\. Local Server Mode (Legacy)](index.html.1.1.html#6-local-server-mode-legacy)
  * [Summary](index.html.1.1.html#summary)



# Installation & Setup (2023 Edition)

## 1\. Basic Installation
    
    
    [](index.html.1.1.html#__codelineno-0-1)pip install crawl4ai
    

This installs the **core** Crawl4AI library along with essential dependencies. **No** advanced features (like transformers or PyTorch) are included yet.

## 2\. Initial Setup & Diagnostics

### 2.1 Run the Setup Command

After installing, call:
    
    
    [](index.html.1.1.html#__codelineno-1-1)crawl4ai-setup
    

**What does it do?** \- Installs or updates required Playwright browsers (Chromium, Firefox, etc.) \- Performs OS-level checks (e.g., missing libs on Linux) \- Confirms your environment is ready to crawl

### 2.2 Diagnostics

Optionally, you can run **diagnostics** to confirm everything is functioning:
    
    
    [](index.html.1.1.html#__codelineno-2-1)crawl4ai-doctor
    

This command attempts to: \- Check Python version compatibility \- Verify Playwright installation \- Inspect environment variables or library conflicts

If any issues arise, follow its suggestions (e.g., installing additional system packages) and re-run `crawl4ai-setup`.

* * *

## 3\. Verifying Installation: A Simple Crawl (Skip this step if you already run `crawl4ai-doctor`)

Below is a minimal Python script demonstrating a **basic** crawl. It uses our new **`BrowserConfig`** and **`CrawlerRunConfig`** for clarity, though no custom settings are passed in this example:
    
    
    [](index.html.1.1.html#__codelineno-3-1)import asyncio
    [](index.html.1.1.html#__codelineno-3-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.1.html#__codelineno-3-3)
    [](index.html.1.1.html#__codelineno-3-4)async def main():
    [](index.html.1.1.html#__codelineno-3-5)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.1.html#__codelineno-3-6)        result = await crawler.arun(
    [](index.html.1.1.html#__codelineno-3-7)            url="https://www.example.com",
    [](index.html.1.1.html#__codelineno-3-8)        )
    [](index.html.1.1.html#__codelineno-3-9)        print(result.markdown[:300])  # Show the first 300 characters of extracted text
    [](index.html.1.1.html#__codelineno-3-10)
    [](index.html.1.1.html#__codelineno-3-11)if __name__ == "__main__":
    [](index.html.1.1.html#__codelineno-3-12)    asyncio.run(main())
    

**Expected** outcome: \- A headless browser session loads `example.com` \- Crawl4AI returns ~300 characters of markdown.  
If errors occur, rerun `crawl4ai-doctor` or manually ensure Playwright is installed correctly.

* * *

## 4\. Advanced Installation (Optional)

**Warning** : Only install these **if you truly need them**. They bring in larger dependencies, including big models, which can increase disk usage and memory load significantly.

### 4.1 Torch, Transformers, or All

  * **Text Clustering (Torch)**  

    
        [](index.html.1.1.html#__codelineno-4-1)pip install crawl4ai[torch]
    [](index.html.1.1.html#__codelineno-4-2)crawl4ai-setup
    

Installs PyTorch-based features (e.g., cosine similarity or advanced semantic chunking).

  * **Transformers**  

    
        [](index.html.1.1.html#__codelineno-5-1)pip install crawl4ai[transformer]
    [](index.html.1.1.html#__codelineno-5-2)crawl4ai-setup
    

Adds Hugging Face-based summarization or generation strategies.

  * **All Features**  

    
        [](index.html.1.1.html#__codelineno-6-1)pip install crawl4ai[all]
    [](index.html.1.1.html#__codelineno-6-2)crawl4ai-setup
    




#### (Optional) Pre-Fetching Models
    
    
    [](index.html.1.1.html#__codelineno-7-1)crawl4ai-download-models
    

This step caches large models locally (if needed). **Only do this** if your workflow requires them.

* * *

## 5\. Docker (Experimental)

We provide a **temporary** Docker approach for testing. **It’s not stable and may break** with future releases. We plan a major Docker revamp in a future stable version, 2025 Q1. If you still want to try:
    
    
    [](index.html.1.1.html#__codelineno-8-1)docker pull unclecode/crawl4ai:basic
    [](index.html.1.1.html#__codelineno-8-2)docker run -p 11235:11235 unclecode/crawl4ai:basic
    

You can then make POST requests to `http://localhost:11235/crawl` to perform crawls. **Production usage** is discouraged until our new Docker approach is ready (planned in Jan or Feb 2025).

* * *

## 6\. Local Server Mode (Legacy)

Some older docs mention running Crawl4AI as a local server. This approach has been **partially replaced** by the new Docker-based prototype and upcoming stable server release. You can experiment, but expect major changes. Official local server instructions will arrive once the new Docker architecture is finalized.

* * *

## Summary

1\. **Install** with `pip install crawl4ai` and run `crawl4ai-setup`. 2\. **Diagnose** with `crawl4ai-doctor` if you see errors. 3\. **Verify** by crawling `example.com` with minimal `BrowserConfig` \+ `CrawlerRunConfig`. 4\. **Advanced** features (Torch, Transformers) are **optional** —avoid them if you don’t need them (they significantly increase resource usage). 5\. **Docker** is **experimental** —use at your own risk until the stable version is released. 6\. **Local server** references in older docs are largely deprecated; a new solution is in progress.

**Got questions?** Check [GitHub issues](https://github.com/unclecode/crawl4ai/issues) for updates or ask the community!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
