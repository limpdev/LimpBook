[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.9.html#)



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
    * Page Interaction
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

  * [Page Interaction](index.html.1.9.html#page-interaction)
  * [1\. JavaScript Execution](index.html.1.9.html#1-javascript-execution)
  * [2\. Wait Conditions](index.html.1.9.html#2-wait-conditions)
  * [3\. Handling Dynamic Content](index.html.1.9.html#3-handling-dynamic-content)
  * [4\. Timing Control](index.html.1.9.html#4-timing-control)
  * [5\. Multi-Step Interaction Example](index.html.1.9.html#5-multi-step-interaction-example)
  * [6\. Combine Interaction with Extraction](index.html.1.9.html#6-combine-interaction-with-extraction)
  * [7\. Relevant CrawlerRunConfig Parameters](index.html.1.9.html#7-relevant-crawlerrunconfig-parameters)
  * [8\. Conclusion](index.html.1.9.html#8-conclusion)



# Page Interaction

Crawl4AI provides powerful features for interacting with **dynamic** webpages, handling JavaScript execution, waiting for conditions, and managing multi-step flows. By combining **js_code** , **wait_for** , and certain **CrawlerRunConfig** parameters, you can:

  1. Click “Load More” buttons 
  2. Fill forms and submit them 
  3. Wait for elements or data to appear 
  4. Reuse sessions across multiple steps 



Below is a quick overview of how to do it.

* * *

## 1\. JavaScript Execution

### Basic Execution

**`js_code`** in **`CrawlerRunConfig`** accepts either a single JS string or a list of JS snippets.  
**Example** : We’ll scroll to the bottom of the page, then optionally click a “Load More” button.
    
    
    [](index.html.1.9.html#__codelineno-0-1)import asyncio
    [](index.html.1.9.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.9.html#__codelineno-0-3)
    [](index.html.1.9.html#__codelineno-0-4)async def main():
    [](index.html.1.9.html#__codelineno-0-5)    # Single JS command
    [](index.html.1.9.html#__codelineno-0-6)    config = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-0-7)        js_code="window.scrollTo(0, document.body.scrollHeight);"
    [](index.html.1.9.html#__codelineno-0-8)    )
    [](index.html.1.9.html#__codelineno-0-9)
    [](index.html.1.9.html#__codelineno-0-10)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.9.html#__codelineno-0-11)        result = await crawler.arun(
    [](index.html.1.9.html#__codelineno-0-12)            url="https://news.ycombinator.com",  # Example site
    [](index.html.1.9.html#__codelineno-0-13)            config=config
    [](index.html.1.9.html#__codelineno-0-14)        )
    [](index.html.1.9.html#__codelineno-0-15)        print("Crawled length:", len(result.cleaned_html))
    [](index.html.1.9.html#__codelineno-0-16)
    [](index.html.1.9.html#__codelineno-0-17)    # Multiple commands
    [](index.html.1.9.html#__codelineno-0-18)    js_commands = [
    [](index.html.1.9.html#__codelineno-0-19)        "window.scrollTo(0, document.body.scrollHeight);",
    [](index.html.1.9.html#__codelineno-0-20)        # 'More' link on Hacker News
    [](index.html.1.9.html#__codelineno-0-21)        "document.querySelector('a.morelink')?.click();",  
    [](index.html.1.9.html#__codelineno-0-22)    ]
    [](index.html.1.9.html#__codelineno-0-23)    config = CrawlerRunConfig(js_code=js_commands)
    [](index.html.1.9.html#__codelineno-0-24)
    [](index.html.1.9.html#__codelineno-0-25)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.9.html#__codelineno-0-26)        result = await crawler.arun(
    [](index.html.1.9.html#__codelineno-0-27)            url="https://news.ycombinator.com",  # Another pass
    [](index.html.1.9.html#__codelineno-0-28)            config=config
    [](index.html.1.9.html#__codelineno-0-29)        )
    [](index.html.1.9.html#__codelineno-0-30)        print("After scroll+click, length:", len(result.cleaned_html))
    [](index.html.1.9.html#__codelineno-0-31)
    [](index.html.1.9.html#__codelineno-0-32)if __name__ == "__main__":
    [](index.html.1.9.html#__codelineno-0-33)    asyncio.run(main())
    

**Relevant`CrawlerRunConfig` params**: \- **`js_code`** : A string or list of strings with JavaScript to run after the page loads. \- **`js_only`** : If set to `True` on subsequent calls, indicates we’re continuing an existing session without a new full navigation.  
\- **`session_id`** : If you want to keep the same page across multiple calls, specify an ID.

* * *

## 2\. Wait Conditions

### 2.1 CSS-Based Waiting

Sometimes, you just want to wait for a specific element to appear. For example:
    
    
    [](index.html.1.9.html#__codelineno-1-1)import asyncio
    [](index.html.1.9.html#__codelineno-1-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.9.html#__codelineno-1-3)
    [](index.html.1.9.html#__codelineno-1-4)async def main():
    [](index.html.1.9.html#__codelineno-1-5)    config = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-1-6)        # Wait for at least 30 items on Hacker News
    [](index.html.1.9.html#__codelineno-1-7)        wait_for="css:.athing:nth-child(30)"  
    [](index.html.1.9.html#__codelineno-1-8)    )
    [](index.html.1.9.html#__codelineno-1-9)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.9.html#__codelineno-1-10)        result = await crawler.arun(
    [](index.html.1.9.html#__codelineno-1-11)            url="https://news.ycombinator.com",
    [](index.html.1.9.html#__codelineno-1-12)            config=config
    [](index.html.1.9.html#__codelineno-1-13)        )
    [](index.html.1.9.html#__codelineno-1-14)        print("We have at least 30 items loaded!")
    [](index.html.1.9.html#__codelineno-1-15)        # Rough check
    [](index.html.1.9.html#__codelineno-1-16)        print("Total items in HTML:", result.cleaned_html.count("athing"))  
    [](index.html.1.9.html#__codelineno-1-17)
    [](index.html.1.9.html#__codelineno-1-18)if __name__ == "__main__":
    [](index.html.1.9.html#__codelineno-1-19)    asyncio.run(main())
    

**Key param** : \- **`wait_for="css:..."`** : Tells the crawler to wait until that CSS selector is present.

### 2.2 JavaScript-Based Waiting

For more complex conditions (e.g., waiting for content length to exceed a threshold), prefix `js:`:
    
    
    [](index.html.1.9.html#__codelineno-2-1)wait_condition = """() => {
    [](index.html.1.9.html#__codelineno-2-2)    const items = document.querySelectorAll('.athing');
    [](index.html.1.9.html#__codelineno-2-3)    return items.length > 50;  // Wait for at least 51 items
    [](index.html.1.9.html#__codelineno-2-4)}"""
    [](index.html.1.9.html#__codelineno-2-5)
    [](index.html.1.9.html#__codelineno-2-6)config = CrawlerRunConfig(wait_for=f"js:{wait_condition}")
    

**Behind the Scenes** : Crawl4AI keeps polling the JS function until it returns `true` or a timeout occurs.

* * *

## 3\. Handling Dynamic Content

Many modern sites require **multiple steps** : scrolling, clicking “Load More,” or updating via JavaScript. Below are typical patterns.

### 3.1 Load More Example (Hacker News “More” Link)
    
    
    [](index.html.1.9.html#__codelineno-3-1)import asyncio
    [](index.html.1.9.html#__codelineno-3-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.9.html#__codelineno-3-3)
    [](index.html.1.9.html#__codelineno-3-4)async def main():
    [](index.html.1.9.html#__codelineno-3-5)    # Step 1: Load initial Hacker News page
    [](index.html.1.9.html#__codelineno-3-6)    config = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-3-7)        wait_for="css:.athing:nth-child(30)"  # Wait for 30 items
    [](index.html.1.9.html#__codelineno-3-8)    )
    [](index.html.1.9.html#__codelineno-3-9)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.9.html#__codelineno-3-10)        result = await crawler.arun(
    [](index.html.1.9.html#__codelineno-3-11)            url="https://news.ycombinator.com",
    [](index.html.1.9.html#__codelineno-3-12)            config=config
    [](index.html.1.9.html#__codelineno-3-13)        )
    [](index.html.1.9.html#__codelineno-3-14)        print("Initial items loaded.")
    [](index.html.1.9.html#__codelineno-3-15)
    [](index.html.1.9.html#__codelineno-3-16)        # Step 2: Let's scroll and click the "More" link
    [](index.html.1.9.html#__codelineno-3-17)        load_more_js = [
    [](index.html.1.9.html#__codelineno-3-18)            "window.scrollTo(0, document.body.scrollHeight);",
    [](index.html.1.9.html#__codelineno-3-19)            # The "More" link at page bottom
    [](index.html.1.9.html#__codelineno-3-20)            "document.querySelector('a.morelink')?.click();"  
    [](index.html.1.9.html#__codelineno-3-21)        ]
    [](index.html.1.9.html#__codelineno-3-22)
    [](index.html.1.9.html#__codelineno-3-23)        next_page_conf = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-3-24)            js_code=load_more_js,
    [](index.html.1.9.html#__codelineno-3-25)            wait_for="""js:() => {
    [](index.html.1.9.html#__codelineno-3-26)                return document.querySelectorAll('.athing').length > 30;
    [](index.html.1.9.html#__codelineno-3-27)            }""",
    [](index.html.1.9.html#__codelineno-3-28)            # Mark that we do not re-navigate, but run JS in the same session:
    [](index.html.1.9.html#__codelineno-3-29)            js_only=True,
    [](index.html.1.9.html#__codelineno-3-30)            session_id="hn_session"
    [](index.html.1.9.html#__codelineno-3-31)        )
    [](index.html.1.9.html#__codelineno-3-32)
    [](index.html.1.9.html#__codelineno-3-33)        # Re-use the same crawler session
    [](index.html.1.9.html#__codelineno-3-34)        result2 = await crawler.arun(
    [](index.html.1.9.html#__codelineno-3-35)            url="https://news.ycombinator.com",  # same URL but continuing session
    [](index.html.1.9.html#__codelineno-3-36)            config=next_page_conf
    [](index.html.1.9.html#__codelineno-3-37)        )
    [](index.html.1.9.html#__codelineno-3-38)        total_items = result2.cleaned_html.count("athing")
    [](index.html.1.9.html#__codelineno-3-39)        print("Items after load-more:", total_items)
    [](index.html.1.9.html#__codelineno-3-40)
    [](index.html.1.9.html#__codelineno-3-41)if __name__ == "__main__":
    [](index.html.1.9.html#__codelineno-3-42)    asyncio.run(main())
    

**Key params** : \- **`session_id="hn_session"`** : Keep the same page across multiple calls to `arun()`. \- **`js_only=True`** : We’re not performing a full reload, just applying JS in the existing page. \- **`wait_for`** with `js:`: Wait for item count to grow beyond 30.

* * *

### 3.2 Form Interaction

If the site has a search or login form, you can fill fields and submit them with **`js_code`**. For instance, if GitHub had a local search form:
    
    
    [](index.html.1.9.html#__codelineno-4-1)js_form_interaction = """
    [](index.html.1.9.html#__codelineno-4-2)document.querySelector('#your-search').value = 'TypeScript commits';
    [](index.html.1.9.html#__codelineno-4-3)document.querySelector('form').submit();
    [](index.html.1.9.html#__codelineno-4-4)"""
    [](index.html.1.9.html#__codelineno-4-5)
    [](index.html.1.9.html#__codelineno-4-6)config = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-4-7)    js_code=js_form_interaction,
    [](index.html.1.9.html#__codelineno-4-8)    wait_for="css:.commit"
    [](index.html.1.9.html#__codelineno-4-9))
    [](index.html.1.9.html#__codelineno-4-10)result = await crawler.arun(url="https://github.com/search", config=config)
    

**In reality** : Replace IDs or classes with the real site’s form selectors.

* * *

## 4\. Timing Control

1\. **`page_timeout`** (ms): Overall page load or script execution time limit.  
2\. **`delay_before_return_html`** (seconds): Wait an extra moment before capturing the final HTML.  
3\. **`mean_delay`** & **`max_range`** : If you call `arun_many()` with multiple URLs, these add a random pause between each request.

**Example** :
    
    
    [](index.html.1.9.html#__codelineno-5-1)config = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-5-2)    page_timeout=60000,  # 60s limit
    [](index.html.1.9.html#__codelineno-5-3)    delay_before_return_html=2.5
    [](index.html.1.9.html#__codelineno-5-4))
    

* * *

## 5\. Multi-Step Interaction Example

Below is a simplified script that does multiple “Load More” clicks on GitHub’s TypeScript commits page. It **re-uses** the same session to accumulate new commits each time. The code includes the relevant **`CrawlerRunConfig`** parameters you’d rely on.
    
    
    [](index.html.1.9.html#__codelineno-6-1)import asyncio
    [](index.html.1.9.html#__codelineno-6-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.9.html#__codelineno-6-3)
    [](index.html.1.9.html#__codelineno-6-4)async def multi_page_commits():
    [](index.html.1.9.html#__codelineno-6-5)    browser_cfg = BrowserConfig(
    [](index.html.1.9.html#__codelineno-6-6)        headless=False,  # Visible for demonstration
    [](index.html.1.9.html#__codelineno-6-7)        verbose=True
    [](index.html.1.9.html#__codelineno-6-8)    )
    [](index.html.1.9.html#__codelineno-6-9)    session_id = "github_ts_commits"
    [](index.html.1.9.html#__codelineno-6-10)
    [](index.html.1.9.html#__codelineno-6-11)    base_wait = """js:() => {
    [](index.html.1.9.html#__codelineno-6-12)        const commits = document.querySelectorAll('li.Box-sc-g0xbh4-0 h4');
    [](index.html.1.9.html#__codelineno-6-13)        return commits.length > 0;
    [](index.html.1.9.html#__codelineno-6-14)    }"""
    [](index.html.1.9.html#__codelineno-6-15)
    [](index.html.1.9.html#__codelineno-6-16)    # Step 1: Load initial commits
    [](index.html.1.9.html#__codelineno-6-17)    config1 = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-6-18)        wait_for=base_wait,
    [](index.html.1.9.html#__codelineno-6-19)        session_id=session_id,
    [](index.html.1.9.html#__codelineno-6-20)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.9.html#__codelineno-6-21)        # Not using js_only yet since it's our first load
    [](index.html.1.9.html#__codelineno-6-22)    )
    [](index.html.1.9.html#__codelineno-6-23)
    [](index.html.1.9.html#__codelineno-6-24)    async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.9.html#__codelineno-6-25)        result = await crawler.arun(
    [](index.html.1.9.html#__codelineno-6-26)            url="https://github.com/microsoft/TypeScript/commits/main",
    [](index.html.1.9.html#__codelineno-6-27)            config=config1
    [](index.html.1.9.html#__codelineno-6-28)        )
    [](index.html.1.9.html#__codelineno-6-29)        print("Initial commits loaded. Count:", result.cleaned_html.count("commit"))
    [](index.html.1.9.html#__codelineno-6-30)
    [](index.html.1.9.html#__codelineno-6-31)        # Step 2: For subsequent pages, we run JS to click 'Next Page' if it exists
    [](index.html.1.9.html#__codelineno-6-32)        js_next_page = """
    [](index.html.1.9.html#__codelineno-6-33)        const selector = 'a[data-testid="pagination-next-button"]';
    [](index.html.1.9.html#__codelineno-6-34)        const button = document.querySelector(selector);
    [](index.html.1.9.html#__codelineno-6-35)        if (button) button.click();
    [](index.html.1.9.html#__codelineno-6-36)        """
    [](index.html.1.9.html#__codelineno-6-37)
    [](index.html.1.9.html#__codelineno-6-38)        # Wait until new commits appear
    [](index.html.1.9.html#__codelineno-6-39)        wait_for_more = """js:() => {
    [](index.html.1.9.html#__codelineno-6-40)            const commits = document.querySelectorAll('li.Box-sc-g0xbh4-0 h4');
    [](index.html.1.9.html#__codelineno-6-41)            if (!window.firstCommit && commits.length>0) {
    [](index.html.1.9.html#__codelineno-6-42)                window.firstCommit = commits[0].textContent;
    [](index.html.1.9.html#__codelineno-6-43)                return false;
    [](index.html.1.9.html#__codelineno-6-44)            }
    [](index.html.1.9.html#__codelineno-6-45)            // If top commit changes, we have new commits
    [](index.html.1.9.html#__codelineno-6-46)            const topNow = commits[0]?.textContent.trim();
    [](index.html.1.9.html#__codelineno-6-47)            return topNow && topNow !== window.firstCommit;
    [](index.html.1.9.html#__codelineno-6-48)        }"""
    [](index.html.1.9.html#__codelineno-6-49)
    [](index.html.1.9.html#__codelineno-6-50)        for page in range(2):  # let's do 2 more "Next" pages
    [](index.html.1.9.html#__codelineno-6-51)            config_next = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-6-52)                session_id=session_id,
    [](index.html.1.9.html#__codelineno-6-53)                js_code=js_next_page,
    [](index.html.1.9.html#__codelineno-6-54)                wait_for=wait_for_more,
    [](index.html.1.9.html#__codelineno-6-55)                js_only=True,       # We're continuing from the open tab
    [](index.html.1.9.html#__codelineno-6-56)                cache_mode=CacheMode.BYPASS
    [](index.html.1.9.html#__codelineno-6-57)            )
    [](index.html.1.9.html#__codelineno-6-58)            result2 = await crawler.arun(
    [](index.html.1.9.html#__codelineno-6-59)                url="https://github.com/microsoft/TypeScript/commits/main",
    [](index.html.1.9.html#__codelineno-6-60)                config=config_next
    [](index.html.1.9.html#__codelineno-6-61)            )
    [](index.html.1.9.html#__codelineno-6-62)            print(f"Page {page+2} commits count:", result2.cleaned_html.count("commit"))
    [](index.html.1.9.html#__codelineno-6-63)
    [](index.html.1.9.html#__codelineno-6-64)        # Optionally kill session
    [](index.html.1.9.html#__codelineno-6-65)        await crawler.crawler_strategy.kill_session(session_id)
    [](index.html.1.9.html#__codelineno-6-66)
    [](index.html.1.9.html#__codelineno-6-67)async def main():
    [](index.html.1.9.html#__codelineno-6-68)    await multi_page_commits()
    [](index.html.1.9.html#__codelineno-6-69)
    [](index.html.1.9.html#__codelineno-6-70)if __name__ == "__main__":
    [](index.html.1.9.html#__codelineno-6-71)    asyncio.run(main())
    

**Key Points** :

  * **`session_id`** : Keep the same page open. 
  * **`js_code`** \+ **`wait_for`** \+ **`js_only=True`** : We do partial refreshes, waiting for new commits to appear. 
  * **`cache_mode=CacheMode.BYPASS`** ensures we always see fresh data each step.



* * *

## 6\. Combine Interaction with Extraction

Once dynamic content is loaded, you can attach an **`extraction_strategy`** (like `JsonCssExtractionStrategy` or `LLMExtractionStrategy`). For example:
    
    
    [](index.html.1.9.html#__codelineno-7-1)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.9.html#__codelineno-7-2)
    [](index.html.1.9.html#__codelineno-7-3)schema = {
    [](index.html.1.9.html#__codelineno-7-4)    "name": "Commits",
    [](index.html.1.9.html#__codelineno-7-5)    "baseSelector": "li.Box-sc-g0xbh4-0",
    [](index.html.1.9.html#__codelineno-7-6)    "fields": [
    [](index.html.1.9.html#__codelineno-7-7)        {"name": "title", "selector": "h4.markdown-title", "type": "text"}
    [](index.html.1.9.html#__codelineno-7-8)    ]
    [](index.html.1.9.html#__codelineno-7-9)}
    [](index.html.1.9.html#__codelineno-7-10)config = CrawlerRunConfig(
    [](index.html.1.9.html#__codelineno-7-11)    session_id="ts_commits_session",
    [](index.html.1.9.html#__codelineno-7-12)    js_code=js_next_page,
    [](index.html.1.9.html#__codelineno-7-13)    wait_for=wait_for_more,
    [](index.html.1.9.html#__codelineno-7-14)    extraction_strategy=JsonCssExtractionStrategy(schema)
    [](index.html.1.9.html#__codelineno-7-15))
    

When done, check `result.extracted_content` for the JSON.

* * *

## 7\. Relevant `CrawlerRunConfig` Parameters

Below are the key interaction-related parameters in `CrawlerRunConfig`. For a full list, see [Configuration Parameters](index.html.1.30.md).

  * **`js_code`** : JavaScript to run after initial load. 
  * **`js_only`** : If `True`, no new page navigation—only JS in the existing session. 
  * **`wait_for`** : CSS (`"css:..."`) or JS (`"js:..."`) expression to wait for. 
  * **`session_id`** : Reuse the same page across calls. 
  * **`cache_mode`** : Whether to read/write from the cache or bypass. 
  * **`remove_overlay_elements`** : Remove certain popups automatically. 
  * **`simulate_user`, `override_navigator`, `magic`**: Anti-bot or “human-like” interactions.



* * *

## 8\. Conclusion

Crawl4AI’s **page interaction** features let you:

1\. **Execute JavaScript** for scrolling, clicks, or form filling.  
2\. **Wait** for CSS or custom JS conditions before capturing data.  
3\. **Handle** multi-step flows (like “Load More”) with partial reloads or persistent sessions.  
4\. Combine with **structured extraction** for dynamic sites.

With these tools, you can scrape modern, interactive webpages confidently. For advanced hooking, user simulation, or in-depth config, check the [API reference](index.html.1.30.md) or related advanced docs. Happy scripting!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
