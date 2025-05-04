[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.34.html#)



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

  * [Release Summary for Version 0.4.1 (December 8, 2024): Major Efficiency Boosts with New Features!](index.html.1.34.html#release-summary-for-version-041-december-8-2024-major-efficiency-boosts-with-new-features)
  * [Handling Lazy Loading Better (Images Included)](index.html.1.34.html#handling-lazy-loading-better-images-included)
  * [Text-Only Mode (Fast, Lightweight Crawling)](index.html.1.34.html#text-only-mode-fast-lightweight-crawling)
  * [Adjusting the Viewport Dynamically](index.html.1.34.html#adjusting-the-viewport-dynamically)
  * [Simulating Full-Page Scrolling](index.html.1.34.html#simulating-full-page-scrolling)
  * [Reusing Browser Sessions (Save Time on Setup)](index.html.1.34.html#reusing-browser-sessions-save-time-on-setup)
  * [Other Updates](index.html.1.34.html#other-updates)
  * [How to Get the Update](index.html.1.34.html#how-to-get-the-update)



# Release Summary for Version 0.4.1 (December 8, 2024): Major Efficiency Boosts with New Features!

_This post was generated with the help of ChatGPT, take everything with a grain of salt. 🧂_

Hi everyone,

I just finished putting together version 0.4.1 of Crawl4AI, and there are a few changes in here that I think you’ll find really helpful. I’ll explain what’s new, why it matters, and exactly how you can use these features (with the code to back it up). Let’s get into it.

* * *

### Handling Lazy Loading Better (Images Included)

One thing that always bugged me with crawlers is how often they miss lazy-loaded content, especially images. In this version, I made sure Crawl4AI **waits for all images to load** before moving forward. This is useful because many modern websites only load images when they’re in the viewport or after some JavaScript executes.

Here’s how to enable it:
    
    
    [](index.html.1.34.html#__codelineno-0-1)await crawler.crawl(
    [](index.html.1.34.html#__codelineno-0-2)    url="https://example.com",
    [](index.html.1.34.html#__codelineno-0-3)    wait_for_images=True  # Add this argument to ensure images are fully loaded
    [](index.html.1.34.html#__codelineno-0-4))
    

What this does is: 1\. Waits for the page to reach a "network idle" state. 2\. Ensures all images on the page have been completely loaded.

This single change handles the majority of lazy-loading cases you’re likely to encounter.

* * *

### Text-Only Mode (Fast, Lightweight Crawling)

Sometimes, you don’t need to download images or process JavaScript at all. For example, if you’re crawling to extract text data, you can enable **text-only mode** to speed things up. By disabling images, JavaScript, and other heavy resources, this mode makes crawling **3-4 times faster** in most cases.

Here’s how to turn it on:
    
    
    [](index.html.1.34.html#__codelineno-1-1)crawler = AsyncPlaywrightCrawlerStrategy(
    [](index.html.1.34.html#__codelineno-1-2)    text_mode=True  # Set this to True to enable text-only crawling
    [](index.html.1.34.html#__codelineno-1-3))
    

When `text_mode=True`, the crawler automatically: \- Disables GPU processing. \- Blocks image and JavaScript resources. \- Reduces the viewport size to 800x600 (you can override this with `viewport_width` and `viewport_height`).

If you need to crawl thousands of pages where you only care about text, this mode will save you a ton of time and resources.

* * *

### Adjusting the Viewport Dynamically

Another useful addition is the ability to **dynamically adjust the viewport size** to match the content on the page. This is particularly helpful when you’re working with responsive layouts or want to ensure all parts of the page load properly.

Here’s how it works: 1\. The crawler calculates the page’s width and height after it loads. 2\. It adjusts the viewport to fit the content dimensions. 3\. (Optional) It uses Chrome DevTools Protocol (CDP) to simulate zooming out so everything fits in the viewport.

To enable this, use:
    
    
    [](index.html.1.34.html#__codelineno-2-1)await crawler.crawl(
    [](index.html.1.34.html#__codelineno-2-2)    url="https://example.com",
    [](index.html.1.34.html#__codelineno-2-3)    adjust_viewport_to_content=True  # Dynamically adjusts the viewport
    [](index.html.1.34.html#__codelineno-2-4))
    

This approach makes sure the entire page gets loaded into the viewport, especially for layouts that load content based on visibility.

* * *

### Simulating Full-Page Scrolling

Some websites load data dynamically as you scroll down the page. To handle these cases, I added support for **full-page scanning**. It simulates scrolling to the bottom of the page, checking for new content, and capturing it all.

Here’s an example:
    
    
    [](index.html.1.34.html#__codelineno-3-1)await crawler.crawl(
    [](index.html.1.34.html#__codelineno-3-2)    url="https://example.com",
    [](index.html.1.34.html#__codelineno-3-3)    scan_full_page=True,   # Enables scrolling
    [](index.html.1.34.html#__codelineno-3-4)    scroll_delay=0.2       # Waits 200ms between scrolls (optional)
    [](index.html.1.34.html#__codelineno-3-5))
    

What happens here: 1\. The crawler scrolls down in increments, waiting for content to load after each scroll. 2\. It stops when no new content appears (i.e., dynamic elements stop loading). 3\. It scrolls back to the top before finishing (if necessary).

If you’ve ever had to deal with infinite scroll pages, this is going to save you a lot of headaches.

* * *

### Reusing Browser Sessions (Save Time on Setup)

By default, every time you crawl a page, a new browser context (or tab) is created. That’s fine for small crawls, but if you’re working on a large dataset, it’s more efficient to reuse the same session.

I added a method called `create_session` for this:
    
    
    [](index.html.1.34.html#__codelineno-4-1)session_id = await crawler.create_session()
    [](index.html.1.34.html#__codelineno-4-2)
    [](index.html.1.34.html#__codelineno-4-3)# Use the same session for multiple crawls
    [](index.html.1.34.html#__codelineno-4-4)await crawler.crawl(
    [](index.html.1.34.html#__codelineno-4-5)    url="https://example.com/page1",
    [](index.html.1.34.html#__codelineno-4-6)    session_id=session_id  # Reuse the session
    [](index.html.1.34.html#__codelineno-4-7))
    [](index.html.1.34.html#__codelineno-4-8)await crawler.crawl(
    [](index.html.1.34.html#__codelineno-4-9)    url="https://example.com/page2",
    [](index.html.1.34.html#__codelineno-4-10)    session_id=session_id
    [](index.html.1.34.html#__codelineno-4-11))
    

This avoids creating a new tab for every page, speeding up the crawl and reducing memory usage.

* * *

### Other Updates

Here are a few smaller updates I’ve made: \- **Light Mode** : Use `light_mode=True` to disable background processes, extensions, and other unnecessary features, making the browser more efficient. \- **Logging** : Improved logs to make debugging easier. \- **Defaults** : Added sensible defaults for things like `delay_before_return_html` (now set to 0.1 seconds).

* * *

### How to Get the Update

You can install or upgrade to version `0.4.1` like this:
    
    
    [](index.html.1.34.html#__codelineno-5-1)pip install crawl4ai --upgrade
    

As always, I’d love to hear your thoughts. If there’s something you think could be improved or if you have suggestions for future versions, let me know!

Enjoy the new features, and happy crawling! 🕷️

* * *

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
