[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.17.html#)



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
    * Hooks & Auth
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

  * [Hooks & Auth in AsyncWebCrawler](index.html.1.17.html#hooks-auth-in-asyncwebcrawler)
  * [Example: Using Hooks in AsyncWebCrawler](index.html.1.17.html#example-using-hooks-in-asyncwebcrawler)
  * [Hook Lifecycle Summary](index.html.1.17.html#hook-lifecycle-summary)
  * [When to Handle Authentication](index.html.1.17.html#when-to-handle-authentication)
  * [Additional Considerations](index.html.1.17.html#additional-considerations)
  * [Conclusion](index.html.1.17.html#conclusion)



# Hooks & Auth in AsyncWebCrawler

Crawl4AI’s **hooks** let you customize the crawler at specific points in the pipeline:

1\. **`on_browser_created`** – After browser creation.  
2\. **`on_page_context_created`** – After a new context & page are created.  
3\. **`before_goto`** – Just before navigating to a page.  
4\. **`after_goto`** – Right after navigation completes.  
5\. **`on_user_agent_updated`** – Whenever the user agent changes.  
6\. **`on_execution_started`** – Once custom JavaScript execution begins.  
7\. **`before_retrieve_html`** – Just before the crawler retrieves final HTML.  
8\. **`before_return_html`** – Right before returning the HTML content.

**Important** : Avoid heavy tasks in `on_browser_created` since you don’t yet have a page context. If you need to _log in_ , do so in **`on_page_context_created`**.

> note "Important Hook Usage Warning" **Avoid Misusing Hooks** : Do not manipulate page objects in the wrong hook or at the wrong time, as it can crash the pipeline or produce incorrect results. A common mistake is attempting to handle authentication prematurely—such as creating or closing pages in `on_browser_created`. 
> 
> **Use the Right Hook for Auth** : If you need to log in or set tokens, use `on_page_context_created`. This ensures you have a valid page/context to work with, without disrupting the main crawling flow.
> 
> **Identity-Based Crawling** : For robust auth, consider identity-based crawling (or passing a session ID) to preserve state. Run your initial login steps in a separate, well-defined process, then feed that session to your main crawl—rather than shoehorning complex authentication into early hooks. Check out [Identity-Based Crawling](index.html.1.22.md) for more details.
> 
> **Be Cautious** : Overwriting or removing elements in the wrong hook can compromise the final crawl. Keep hooks focused on smaller tasks (like route filters, custom headers), and let your main logic (crawling, data extraction) proceed normally.

Below is an example demonstration.

* * *

## Example: Using Hooks in AsyncWebCrawler
    
    
    [](index.html.1.17.html#__codelineno-0-1)import asyncio
    [](index.html.1.17.html#__codelineno-0-2)import json
    [](index.html.1.17.html#__codelineno-0-3)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.17.html#__codelineno-0-4)from playwright.async_api import Page, BrowserContext
    [](index.html.1.17.html#__codelineno-0-5)
    [](index.html.1.17.html#__codelineno-0-6)async def main():
    [](index.html.1.17.html#__codelineno-0-7)    print("🔗 Hooks Example: Demonstrating recommended usage")
    [](index.html.1.17.html#__codelineno-0-8)
    [](index.html.1.17.html#__codelineno-0-9)    # 1) Configure the browser
    [](index.html.1.17.html#__codelineno-0-10)    browser_config = BrowserConfig(
    [](index.html.1.17.html#__codelineno-0-11)        headless=True,
    [](index.html.1.17.html#__codelineno-0-12)        verbose=True
    [](index.html.1.17.html#__codelineno-0-13)    )
    [](index.html.1.17.html#__codelineno-0-14)
    [](index.html.1.17.html#__codelineno-0-15)    # 2) Configure the crawler run
    [](index.html.1.17.html#__codelineno-0-16)    crawler_run_config = CrawlerRunConfig(
    [](index.html.1.17.html#__codelineno-0-17)        js_code="window.scrollTo(0, document.body.scrollHeight);",
    [](index.html.1.17.html#__codelineno-0-18)        wait_for="body",
    [](index.html.1.17.html#__codelineno-0-19)        cache_mode=CacheMode.BYPASS
    [](index.html.1.17.html#__codelineno-0-20)    )
    [](index.html.1.17.html#__codelineno-0-21)
    [](index.html.1.17.html#__codelineno-0-22)    # 3) Create the crawler instance
    [](index.html.1.17.html#__codelineno-0-23)    crawler = AsyncWebCrawler(config=browser_config)
    [](index.html.1.17.html#__codelineno-0-24)
    [](index.html.1.17.html#__codelineno-0-25)    #
    [](index.html.1.17.html#__codelineno-0-26)    # Define Hook Functions
    [](index.html.1.17.html#__codelineno-0-27)    #
    [](index.html.1.17.html#__codelineno-0-28)
    [](index.html.1.17.html#__codelineno-0-29)    async def on_browser_created(browser, **kwargs):
    [](index.html.1.17.html#__codelineno-0-30)        # Called once the browser instance is created (but no pages or contexts yet)
    [](index.html.1.17.html#__codelineno-0-31)        print("[HOOK] on_browser_created - Browser created successfully!")
    [](index.html.1.17.html#__codelineno-0-32)        # Typically, do minimal setup here if needed
    [](index.html.1.17.html#__codelineno-0-33)        return browser
    [](index.html.1.17.html#__codelineno-0-34)
    [](index.html.1.17.html#__codelineno-0-35)    async def on_page_context_created(page: Page, context: BrowserContext, **kwargs):
    [](index.html.1.17.html#__codelineno-0-36)        # Called right after a new page + context are created (ideal for auth or route config).
    [](index.html.1.17.html#__codelineno-0-37)        print("[HOOK] on_page_context_created - Setting up page & context.")
    [](index.html.1.17.html#__codelineno-0-38)
    [](index.html.1.17.html#__codelineno-0-39)        # Example 1: Route filtering (e.g., block images)
    [](index.html.1.17.html#__codelineno-0-40)        async def route_filter(route):
    [](index.html.1.17.html#__codelineno-0-41)            if route.request.resource_type == "image":
    [](index.html.1.17.html#__codelineno-0-42)                print(f"[HOOK] Blocking image request: {route.request.url}")
    [](index.html.1.17.html#__codelineno-0-43)                await route.abort()
    [](index.html.1.17.html#__codelineno-0-44)            else:
    [](index.html.1.17.html#__codelineno-0-45)                await route.continue_()
    [](index.html.1.17.html#__codelineno-0-46)
    [](index.html.1.17.html#__codelineno-0-47)        await context.route("**", route_filter)
    [](index.html.1.17.html#__codelineno-0-48)
    [](index.html.1.17.html#__codelineno-0-49)        # Example 2: (Optional) Simulate a login scenario
    [](index.html.1.17.html#__codelineno-0-50)        # (We do NOT create or close pages here, just do quick steps if needed)
    [](index.html.1.17.html#__codelineno-0-51)        # e.g., await page.goto("https://example.com/login")
    [](index.html.1.17.html#__codelineno-0-52)        # e.g., await page.fill("input[name='username']", "testuser")
    [](index.html.1.17.html#__codelineno-0-53)        # e.g., await page.fill("input[name='password']", "password123")
    [](index.html.1.17.html#__codelineno-0-54)        # e.g., await page.click("button[type='submit']")
    [](index.html.1.17.html#__codelineno-0-55)        # e.g., await page.wait_for_selector("#welcome")
    [](index.html.1.17.html#__codelineno-0-56)        # e.g., await context.add_cookies([...])
    [](index.html.1.17.html#__codelineno-0-57)        # Then continue
    [](index.html.1.17.html#__codelineno-0-58)
    [](index.html.1.17.html#__codelineno-0-59)        # Example 3: Adjust the viewport
    [](index.html.1.17.html#__codelineno-0-60)        await page.set_viewport_size({"width": 1080, "height": 600})
    [](index.html.1.17.html#__codelineno-0-61)        return page
    [](index.html.1.17.html#__codelineno-0-62)
    [](index.html.1.17.html#__codelineno-0-63)    async def before_goto(
    [](index.html.1.17.html#__codelineno-0-64)        page: Page, context: BrowserContext, url: str, **kwargs
    [](index.html.1.17.html#__codelineno-0-65)    ):
    [](index.html.1.17.html#__codelineno-0-66)        # Called before navigating to each URL.
    [](index.html.1.17.html#__codelineno-0-67)        print(f"[HOOK] before_goto - About to navigate: {url}")
    [](index.html.1.17.html#__codelineno-0-68)        # e.g., inject custom headers
    [](index.html.1.17.html#__codelineno-0-69)        await page.set_extra_http_headers({
    [](index.html.1.17.html#__codelineno-0-70)            "Custom-Header": "my-value"
    [](index.html.1.17.html#__codelineno-0-71)        })
    [](index.html.1.17.html#__codelineno-0-72)        return page
    [](index.html.1.17.html#__codelineno-0-73)
    [](index.html.1.17.html#__codelineno-0-74)    async def after_goto(
    [](index.html.1.17.html#__codelineno-0-75)        page: Page, context: BrowserContext, 
    [](index.html.1.17.html#__codelineno-0-76)        url: str, response, **kwargs
    [](index.html.1.17.html#__codelineno-0-77)    ):
    [](index.html.1.17.html#__codelineno-0-78)        # Called after navigation completes.
    [](index.html.1.17.html#__codelineno-0-79)        print(f"[HOOK] after_goto - Successfully loaded: {url}")
    [](index.html.1.17.html#__codelineno-0-80)        # e.g., wait for a certain element if we want to verify
    [](index.html.1.17.html#__codelineno-0-81)        try:
    [](index.html.1.17.html#__codelineno-0-82)            await page.wait_for_selector('.content', timeout=1000)
    [](index.html.1.17.html#__codelineno-0-83)            print("[HOOK] Found .content element!")
    [](index.html.1.17.html#__codelineno-0-84)        except:
    [](index.html.1.17.html#__codelineno-0-85)            print("[HOOK] .content not found, continuing anyway.")
    [](index.html.1.17.html#__codelineno-0-86)        return page
    [](index.html.1.17.html#__codelineno-0-87)
    [](index.html.1.17.html#__codelineno-0-88)    async def on_user_agent_updated(
    [](index.html.1.17.html#__codelineno-0-89)        page: Page, context: BrowserContext, 
    [](index.html.1.17.html#__codelineno-0-90)        user_agent: str, **kwargs
    [](index.html.1.17.html#__codelineno-0-91)    ):
    [](index.html.1.17.html#__codelineno-0-92)        # Called whenever the user agent updates.
    [](index.html.1.17.html#__codelineno-0-93)        print(f"[HOOK] on_user_agent_updated - New user agent: {user_agent}")
    [](index.html.1.17.html#__codelineno-0-94)        return page
    [](index.html.1.17.html#__codelineno-0-95)
    [](index.html.1.17.html#__codelineno-0-96)    async def on_execution_started(page: Page, context: BrowserContext, **kwargs):
    [](index.html.1.17.html#__codelineno-0-97)        # Called after custom JavaScript execution begins.
    [](index.html.1.17.html#__codelineno-0-98)        print("[HOOK] on_execution_started - JS code is running!")
    [](index.html.1.17.html#__codelineno-0-99)        return page
    [](index.html.1.17.html#__codelineno-0-100)
    [](index.html.1.17.html#__codelineno-0-101)    async def before_retrieve_html(page: Page, context: BrowserContext, **kwargs):
    [](index.html.1.17.html#__codelineno-0-102)        # Called before final HTML retrieval.
    [](index.html.1.17.html#__codelineno-0-103)        print("[HOOK] before_retrieve_html - We can do final actions")
    [](index.html.1.17.html#__codelineno-0-104)        # Example: Scroll again
    [](index.html.1.17.html#__codelineno-0-105)        await page.evaluate("window.scrollTo(0, document.body.scrollHeight);")
    [](index.html.1.17.html#__codelineno-0-106)        return page
    [](index.html.1.17.html#__codelineno-0-107)
    [](index.html.1.17.html#__codelineno-0-108)    async def before_return_html(
    [](index.html.1.17.html#__codelineno-0-109)        page: Page, context: BrowserContext, html: str, **kwargs
    [](index.html.1.17.html#__codelineno-0-110)    ):
    [](index.html.1.17.html#__codelineno-0-111)        # Called just before returning the HTML in the result.
    [](index.html.1.17.html#__codelineno-0-112)        print(f"[HOOK] before_return_html - HTML length: {len(html)}")
    [](index.html.1.17.html#__codelineno-0-113)        return page
    [](index.html.1.17.html#__codelineno-0-114)
    [](index.html.1.17.html#__codelineno-0-115)    #
    [](index.html.1.17.html#__codelineno-0-116)    # Attach Hooks
    [](index.html.1.17.html#__codelineno-0-117)    #
    [](index.html.1.17.html#__codelineno-0-118)
    [](index.html.1.17.html#__codelineno-0-119)    crawler.crawler_strategy.set_hook("on_browser_created", on_browser_created)
    [](index.html.1.17.html#__codelineno-0-120)    crawler.crawler_strategy.set_hook(
    [](index.html.1.17.html#__codelineno-0-121)        "on_page_context_created", on_page_context_created
    [](index.html.1.17.html#__codelineno-0-122)    )
    [](index.html.1.17.html#__codelineno-0-123)    crawler.crawler_strategy.set_hook("before_goto", before_goto)
    [](index.html.1.17.html#__codelineno-0-124)    crawler.crawler_strategy.set_hook("after_goto", after_goto)
    [](index.html.1.17.html#__codelineno-0-125)    crawler.crawler_strategy.set_hook(
    [](index.html.1.17.html#__codelineno-0-126)        "on_user_agent_updated", on_user_agent_updated
    [](index.html.1.17.html#__codelineno-0-127)    )
    [](index.html.1.17.html#__codelineno-0-128)    crawler.crawler_strategy.set_hook(
    [](index.html.1.17.html#__codelineno-0-129)        "on_execution_started", on_execution_started
    [](index.html.1.17.html#__codelineno-0-130)    )
    [](index.html.1.17.html#__codelineno-0-131)    crawler.crawler_strategy.set_hook(
    [](index.html.1.17.html#__codelineno-0-132)        "before_retrieve_html", before_retrieve_html
    [](index.html.1.17.html#__codelineno-0-133)    )
    [](index.html.1.17.html#__codelineno-0-134)    crawler.crawler_strategy.set_hook(
    [](index.html.1.17.html#__codelineno-0-135)        "before_return_html", before_return_html
    [](index.html.1.17.html#__codelineno-0-136)    )
    [](index.html.1.17.html#__codelineno-0-137)
    [](index.html.1.17.html#__codelineno-0-138)    await crawler.start()
    [](index.html.1.17.html#__codelineno-0-139)
    [](index.html.1.17.html#__codelineno-0-140)    # 4) Run the crawler on an example page
    [](index.html.1.17.html#__codelineno-0-141)    url = "https://example.com"
    [](index.html.1.17.html#__codelineno-0-142)    result = await crawler.arun(url, config=crawler_run_config)
    [](index.html.1.17.html#__codelineno-0-143)
    [](index.html.1.17.html#__codelineno-0-144)    if result.success:
    [](index.html.1.17.html#__codelineno-0-145)        print("\nCrawled URL:", result.url)
    [](index.html.1.17.html#__codelineno-0-146)        print("HTML length:", len(result.html))
    [](index.html.1.17.html#__codelineno-0-147)    else:
    [](index.html.1.17.html#__codelineno-0-148)        print("Error:", result.error_message)
    [](index.html.1.17.html#__codelineno-0-149)
    [](index.html.1.17.html#__codelineno-0-150)    await crawler.close()
    [](index.html.1.17.html#__codelineno-0-151)
    [](index.html.1.17.html#__codelineno-0-152)if __name__ == "__main__":
    [](index.html.1.17.html#__codelineno-0-153)    asyncio.run(main())
    

* * *

## Hook Lifecycle Summary

1\. **`on_browser_created`** :  
\- Browser is up, but **no** pages or contexts yet.  
\- Light setup only—don’t try to open or close pages here (that belongs in `on_page_context_created`).

2\. **`on_page_context_created`** :  
\- Perfect for advanced **auth** or route blocking.  
\- You have a **page** \+ **context** ready but haven’t navigated to the target URL yet.

3\. **`before_goto`** :  
\- Right before navigation. Typically used for setting **custom headers** or logging the target URL.

4\. **`after_goto`** :  
\- After page navigation is done. Good place for verifying content or waiting on essential elements. 

5\. **`on_user_agent_updated`** :  
\- Whenever the user agent changes (for stealth or different UA modes).

6\. **`on_execution_started`** :  
\- If you set `js_code` or run custom scripts, this runs once your JS is about to start.

7\. **`before_retrieve_html`** :  
\- Just before the final HTML snapshot is taken. Often you do a final scroll or lazy-load triggers here.

8\. **`before_return_html`** :  
\- The last hook before returning HTML to the `CrawlResult`. Good for logging HTML length or minor modifications.

* * *

## When to Handle Authentication

**Recommended** : Use **`on_page_context_created`** if you need to:

  * Navigate to a login page or fill forms
  * Set cookies or localStorage tokens
  * Block resource routes to avoid ads



This ensures the newly created context is under your control **before** `arun()` navigates to the main URL.

* * *

## Additional Considerations

  * **Session Management** : If you want multiple `arun()` calls to reuse a single session, pass `session_id=` in your `CrawlerRunConfig`. Hooks remain the same. 
  * **Performance** : Hooks can slow down crawling if they do heavy tasks. Keep them concise. 
  * **Error Handling** : If a hook fails, the overall crawl might fail. Catch exceptions or handle them gracefully. 
  * **Concurrency** : If you run `arun_many()`, each URL triggers these hooks in parallel. Ensure your hooks are thread/async-safe.



* * *

## Conclusion

Hooks provide **fine-grained** control over:

  * **Browser** creation (light tasks only)
  * **Page** and **context** creation (auth, route blocking)
  * **Navigation** phases
  * **Final HTML** retrieval



Follow the recommended usage: \- **Login** or advanced tasks in `on_page_context_created`  
\- **Custom headers** or logs in `before_goto` / `after_goto`  
\- **Scrolling** or final checks in `before_retrieve_html` / `before_return_html`

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
