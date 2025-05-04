[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.19.html#)



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
    * Session Management
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

  * [Session Management](index.html.1.19.html#session-management)
  * [Basic Session Usage](index.html.1.19.html#basic-session-usage)
  * [Dynamic Content with Sessions](index.html.1.19.html#dynamic-content-with-sessions)
  * [Example 1: Basic Session-Based Crawling](index.html.1.19.html#example-1-basic-session-based-crawling)
  * [Advanced Technique 1: Custom Execution Hooks](index.html.1.19.html#advanced-technique-1-custom-execution-hooks)
  * [Advanced Technique 2: Integrated JavaScript Execution and Waiting](index.html.1.19.html#advanced-technique-2-integrated-javascript-execution-and-waiting)



# Session Management

Session management in Crawl4AI is a powerful feature that allows you to maintain state across multiple requests, making it particularly suitable for handling complex multi-step crawling tasks. It enables you to reuse the same browser tab (or page object) across sequential actions and crawls, which is beneficial for:

  * **Performing JavaScript actions before and after crawling.**
  * **Executing multiple sequential crawls faster** without needing to reopen tabs or allocate memory repeatedly.



**Note:** This feature is designed for sequential workflows and is not suitable for parallel operations.

* * *

#### Basic Session Usage

Use `BrowserConfig` and `CrawlerRunConfig` to maintain state with a `session_id`:
    
    
    [](index.html.1.19.html#__codelineno-0-1)from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
    [](index.html.1.19.html#__codelineno-0-2)
    [](index.html.1.19.html#__codelineno-0-3)async with AsyncWebCrawler() as crawler:
    [](index.html.1.19.html#__codelineno-0-4)    session_id = "my_session"
    [](index.html.1.19.html#__codelineno-0-5)
    [](index.html.1.19.html#__codelineno-0-6)    # Define configurations
    [](index.html.1.19.html#__codelineno-0-7)    config1 = CrawlerRunConfig(
    [](index.html.1.19.html#__codelineno-0-8)        url="https://example.com/page1", session_id=session_id
    [](index.html.1.19.html#__codelineno-0-9)    )
    [](index.html.1.19.html#__codelineno-0-10)    config2 = CrawlerRunConfig(
    [](index.html.1.19.html#__codelineno-0-11)        url="https://example.com/page2", session_id=session_id
    [](index.html.1.19.html#__codelineno-0-12)    )
    [](index.html.1.19.html#__codelineno-0-13)
    [](index.html.1.19.html#__codelineno-0-14)    # First request
    [](index.html.1.19.html#__codelineno-0-15)    result1 = await crawler.arun(config=config1)
    [](index.html.1.19.html#__codelineno-0-16)
    [](index.html.1.19.html#__codelineno-0-17)    # Subsequent request using the same session
    [](index.html.1.19.html#__codelineno-0-18)    result2 = await crawler.arun(config=config2)
    [](index.html.1.19.html#__codelineno-0-19)
    [](index.html.1.19.html#__codelineno-0-20)    # Clean up when done
    [](index.html.1.19.html#__codelineno-0-21)    await crawler.crawler_strategy.kill_session(session_id)
    

* * *

#### Dynamic Content with Sessions

Here's an example of crawling GitHub commits across multiple pages while preserving session state:
    
    
    [](index.html.1.19.html#__codelineno-1-1)from crawl4ai.async_configs import CrawlerRunConfig
    [](index.html.1.19.html#__codelineno-1-2)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.19.html#__codelineno-1-3)from crawl4ai.cache_context import CacheMode
    [](index.html.1.19.html#__codelineno-1-4)
    [](index.html.1.19.html#__codelineno-1-5)async def crawl_dynamic_content():
    [](index.html.1.19.html#__codelineno-1-6)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.19.html#__codelineno-1-7)        session_id = "github_commits_session"
    [](index.html.1.19.html#__codelineno-1-8)        url = "https://github.com/microsoft/TypeScript/commits/main"
    [](index.html.1.19.html#__codelineno-1-9)        all_commits = []
    [](index.html.1.19.html#__codelineno-1-10)
    [](index.html.1.19.html#__codelineno-1-11)        # Define extraction schema
    [](index.html.1.19.html#__codelineno-1-12)        schema = {
    [](index.html.1.19.html#__codelineno-1-13)            "name": "Commit Extractor",
    [](index.html.1.19.html#__codelineno-1-14)            "baseSelector": "li.Box-sc-g0xbh4-0",
    [](index.html.1.19.html#__codelineno-1-15)            "fields": [{
    [](index.html.1.19.html#__codelineno-1-16)                "name": "title", "selector": "h4.markdown-title", "type": "text"
    [](index.html.1.19.html#__codelineno-1-17)            }],
    [](index.html.1.19.html#__codelineno-1-18)        }
    [](index.html.1.19.html#__codelineno-1-19)        extraction_strategy = JsonCssExtractionStrategy(schema)
    [](index.html.1.19.html#__codelineno-1-20)
    [](index.html.1.19.html#__codelineno-1-21)        # JavaScript and wait configurations
    [](index.html.1.19.html#__codelineno-1-22)        js_next_page = """document.querySelector('a[data-testid="pagination-next-button"]').click();"""
    [](index.html.1.19.html#__codelineno-1-23)        wait_for = """() => document.querySelectorAll('li.Box-sc-g0xbh4-0').length > 0"""
    [](index.html.1.19.html#__codelineno-1-24)
    [](index.html.1.19.html#__codelineno-1-25)        # Crawl multiple pages
    [](index.html.1.19.html#__codelineno-1-26)        for page in range(3):
    [](index.html.1.19.html#__codelineno-1-27)            config = CrawlerRunConfig(
    [](index.html.1.19.html#__codelineno-1-28)                url=url,
    [](index.html.1.19.html#__codelineno-1-29)                session_id=session_id,
    [](index.html.1.19.html#__codelineno-1-30)                extraction_strategy=extraction_strategy,
    [](index.html.1.19.html#__codelineno-1-31)                js_code=js_next_page if page > 0 else None,
    [](index.html.1.19.html#__codelineno-1-32)                wait_for=wait_for if page > 0 else None,
    [](index.html.1.19.html#__codelineno-1-33)                js_only=page > 0,
    [](index.html.1.19.html#__codelineno-1-34)                cache_mode=CacheMode.BYPASS
    [](index.html.1.19.html#__codelineno-1-35)            )
    [](index.html.1.19.html#__codelineno-1-36)
    [](index.html.1.19.html#__codelineno-1-37)            result = await crawler.arun(config=config)
    [](index.html.1.19.html#__codelineno-1-38)            if result.success:
    [](index.html.1.19.html#__codelineno-1-39)                commits = json.loads(result.extracted_content)
    [](index.html.1.19.html#__codelineno-1-40)                all_commits.extend(commits)
    [](index.html.1.19.html#__codelineno-1-41)                print(f"Page {page + 1}: Found {len(commits)} commits")
    [](index.html.1.19.html#__codelineno-1-42)
    [](index.html.1.19.html#__codelineno-1-43)        # Clean up session
    [](index.html.1.19.html#__codelineno-1-44)        await crawler.crawler_strategy.kill_session(session_id)
    [](index.html.1.19.html#__codelineno-1-45)        return all_commits
    

* * *

## Example 1: Basic Session-Based Crawling

A simple example using session-based crawling:
    
    
    [](index.html.1.19.html#__codelineno-2-1)import asyncio
    [](index.html.1.19.html#__codelineno-2-2)from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
    [](index.html.1.19.html#__codelineno-2-3)from crawl4ai.cache_context import CacheMode
    [](index.html.1.19.html#__codelineno-2-4)
    [](index.html.1.19.html#__codelineno-2-5)async def basic_session_crawl():
    [](index.html.1.19.html#__codelineno-2-6)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.19.html#__codelineno-2-7)        session_id = "dynamic_content_session"
    [](index.html.1.19.html#__codelineno-2-8)        url = "https://example.com/dynamic-content"
    [](index.html.1.19.html#__codelineno-2-9)
    [](index.html.1.19.html#__codelineno-2-10)        for page in range(3):
    [](index.html.1.19.html#__codelineno-2-11)            config = CrawlerRunConfig(
    [](index.html.1.19.html#__codelineno-2-12)                url=url,
    [](index.html.1.19.html#__codelineno-2-13)                session_id=session_id,
    [](index.html.1.19.html#__codelineno-2-14)                js_code="document.querySelector('.load-more-button').click();" if page > 0 else None,
    [](index.html.1.19.html#__codelineno-2-15)                css_selector=".content-item",
    [](index.html.1.19.html#__codelineno-2-16)                cache_mode=CacheMode.BYPASS
    [](index.html.1.19.html#__codelineno-2-17)            )
    [](index.html.1.19.html#__codelineno-2-18)
    [](index.html.1.19.html#__codelineno-2-19)            result = await crawler.arun(config=config)
    [](index.html.1.19.html#__codelineno-2-20)            print(f"Page {page + 1}: Found {result.extracted_content.count('.content-item')} items")
    [](index.html.1.19.html#__codelineno-2-21)
    [](index.html.1.19.html#__codelineno-2-22)        await crawler.crawler_strategy.kill_session(session_id)
    [](index.html.1.19.html#__codelineno-2-23)
    [](index.html.1.19.html#__codelineno-2-24)asyncio.run(basic_session_crawl())
    

This example shows: 1\. Reusing the same `session_id` across multiple requests. 2\. Executing JavaScript to load more content dynamically. 3\. Properly closing the session to free resources.

* * *

## Advanced Technique 1: Custom Execution Hooks

> Warning: You might feel confused by the end of the next few examples 😅, so make sure you are comfortable with the order of the parts before you start this.

Use custom hooks to handle complex scenarios, such as waiting for content to load dynamically:
    
    
    [](index.html.1.19.html#__codelineno-3-1)async def advanced_session_crawl_with_hooks():
    [](index.html.1.19.html#__codelineno-3-2)    first_commit = ""
    [](index.html.1.19.html#__codelineno-3-3)
    [](index.html.1.19.html#__codelineno-3-4)    async def on_execution_started(page):
    [](index.html.1.19.html#__codelineno-3-5)        nonlocal first_commit
    [](index.html.1.19.html#__codelineno-3-6)        try:
    [](index.html.1.19.html#__codelineno-3-7)            while True:
    [](index.html.1.19.html#__codelineno-3-8)                await page.wait_for_selector("li.commit-item h4")
    [](index.html.1.19.html#__codelineno-3-9)                commit = await page.query_selector("li.commit-item h4")
    [](index.html.1.19.html#__codelineno-3-10)                commit = await commit.evaluate("(element) => element.textContent").strip()
    [](index.html.1.19.html#__codelineno-3-11)                if commit and commit != first_commit:
    [](index.html.1.19.html#__codelineno-3-12)                    first_commit = commit
    [](index.html.1.19.html#__codelineno-3-13)                    break
    [](index.html.1.19.html#__codelineno-3-14)                await asyncio.sleep(0.5)
    [](index.html.1.19.html#__codelineno-3-15)        except Exception as e:
    [](index.html.1.19.html#__codelineno-3-16)            print(f"Warning: New content didn't appear: {e}")
    [](index.html.1.19.html#__codelineno-3-17)
    [](index.html.1.19.html#__codelineno-3-18)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.19.html#__codelineno-3-19)        session_id = "commit_session"
    [](index.html.1.19.html#__codelineno-3-20)        url = "https://github.com/example/repo/commits/main"
    [](index.html.1.19.html#__codelineno-3-21)        crawler.crawler_strategy.set_hook("on_execution_started", on_execution_started)
    [](index.html.1.19.html#__codelineno-3-22)
    [](index.html.1.19.html#__codelineno-3-23)        js_next_page = """document.querySelector('a.pagination-next').click();"""
    [](index.html.1.19.html#__codelineno-3-24)
    [](index.html.1.19.html#__codelineno-3-25)        for page in range(3):
    [](index.html.1.19.html#__codelineno-3-26)            config = CrawlerRunConfig(
    [](index.html.1.19.html#__codelineno-3-27)                url=url,
    [](index.html.1.19.html#__codelineno-3-28)                session_id=session_id,
    [](index.html.1.19.html#__codelineno-3-29)                js_code=js_next_page if page > 0 else None,
    [](index.html.1.19.html#__codelineno-3-30)                css_selector="li.commit-item",
    [](index.html.1.19.html#__codelineno-3-31)                js_only=page > 0,
    [](index.html.1.19.html#__codelineno-3-32)                cache_mode=CacheMode.BYPASS
    [](index.html.1.19.html#__codelineno-3-33)            )
    [](index.html.1.19.html#__codelineno-3-34)
    [](index.html.1.19.html#__codelineno-3-35)            result = await crawler.arun(config=config)
    [](index.html.1.19.html#__codelineno-3-36)            print(f"Page {page + 1}: Found {len(result.extracted_content)} commits")
    [](index.html.1.19.html#__codelineno-3-37)
    [](index.html.1.19.html#__codelineno-3-38)        await crawler.crawler_strategy.kill_session(session_id)
    [](index.html.1.19.html#__codelineno-3-39)
    [](index.html.1.19.html#__codelineno-3-40)asyncio.run(advanced_session_crawl_with_hooks())
    

This technique ensures new content loads before the next action.

* * *

## Advanced Technique 2: Integrated JavaScript Execution and Waiting

Combine JavaScript execution and waiting logic for concise handling of dynamic content:
    
    
    [](index.html.1.19.html#__codelineno-4-1)async def integrated_js_and_wait_crawl():
    [](index.html.1.19.html#__codelineno-4-2)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.19.html#__codelineno-4-3)        session_id = "integrated_session"
    [](index.html.1.19.html#__codelineno-4-4)        url = "https://github.com/example/repo/commits/main"
    [](index.html.1.19.html#__codelineno-4-5)
    [](index.html.1.19.html#__codelineno-4-6)        js_next_page_and_wait = """
    [](index.html.1.19.html#__codelineno-4-7)        (async () => {
    [](index.html.1.19.html#__codelineno-4-8)            const getCurrentCommit = () => document.querySelector('li.commit-item h4').textContent.trim();
    [](index.html.1.19.html#__codelineno-4-9)            const initialCommit = getCurrentCommit();
    [](index.html.1.19.html#__codelineno-4-10)            document.querySelector('a.pagination-next').click();
    [](index.html.1.19.html#__codelineno-4-11)            while (getCurrentCommit() === initialCommit) {
    [](index.html.1.19.html#__codelineno-4-12)                await new Promise(resolve => setTimeout(resolve, 100));
    [](index.html.1.19.html#__codelineno-4-13)            }
    [](index.html.1.19.html#__codelineno-4-14)        })();
    [](index.html.1.19.html#__codelineno-4-15)        """
    [](index.html.1.19.html#__codelineno-4-16)
    [](index.html.1.19.html#__codelineno-4-17)        for page in range(3):
    [](index.html.1.19.html#__codelineno-4-18)            config = CrawlerRunConfig(
    [](index.html.1.19.html#__codelineno-4-19)                url=url,
    [](index.html.1.19.html#__codelineno-4-20)                session_id=session_id,
    [](index.html.1.19.html#__codelineno-4-21)                js_code=js_next_page_and_wait if page > 0 else None,
    [](index.html.1.19.html#__codelineno-4-22)                css_selector="li.commit-item",
    [](index.html.1.19.html#__codelineno-4-23)                js_only=page > 0,
    [](index.html.1.19.html#__codelineno-4-24)                cache_mode=CacheMode.BYPASS
    [](index.html.1.19.html#__codelineno-4-25)            )
    [](index.html.1.19.html#__codelineno-4-26)
    [](index.html.1.19.html#__codelineno-4-27)            result = await crawler.arun(config=config)
    [](index.html.1.19.html#__codelineno-4-28)            print(f"Page {page + 1}: Found {len(result.extracted_content)} commits")
    [](index.html.1.19.html#__codelineno-4-29)
    [](index.html.1.19.html#__codelineno-4-30)        await crawler.crawler_strategy.kill_session(session_id)
    [](index.html.1.19.html#__codelineno-4-31)
    [](index.html.1.19.html#__codelineno-4-32)asyncio.run(integrated_js_and_wait_crawl())
    

* * *

#### Common Use Cases for Sessions

1\. **Authentication Flows** : Login and interact with secured pages.

2\. **Pagination Handling** : Navigate through multiple pages.

3\. **Form Submissions** : Fill forms, submit, and process results.

4\. **Multi-step Processes** : Complete workflows that span multiple actions.

5\. **Dynamic Content Navigation** : Handle JavaScript-rendered or event-triggered content.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
