[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.33.html#)



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

  * [🚀 Crawl4AI 0.4.2 Update: Smarter Crawling Just Got Easier (Dec 12, 2024)](index.html.1.33.html#crawl4ai-042-update-smarter-crawling-just-got-easier-dec-12-2024)
  * [Hey Developers,](index.html.1.33.html#hey-developers)
  * [🔧 Configurable Browser and Crawler Behavior](index.html.1.33.html#configurable-browser-and-crawler-behavior)
  * [🔐 Streamlined Session Management](index.html.1.33.html#streamlined-session-management)
  * [🔢 Handling Large Pages: Supercharged Screenshots and PDF Conversion](index.html.1.33.html#handling-large-pages-supercharged-screenshots-and-pdf-conversion)
  * [🔧 Other Cool Stuff](index.html.1.33.html#other-cool-stuff)
  * [📊 Performance Boosts and Dev-friendly Updates](index.html.1.33.html#performance-boosts-and-dev-friendly-updates)
  * [🔠 Use Cases You’ll Love](index.html.1.33.html#use-cases-youll-love)
  * [Let’s Get Crawling](index.html.1.33.html#lets-get-crawling)



## 🚀 Crawl4AI 0.4.2 Update: Smarter Crawling Just Got Easier (Dec 12, 2024)

### Hey Developers,

I’m excited to share Crawl4AI 0.4.2—a major upgrade that makes crawling smarter, faster, and a whole lot more intuitive. I’ve packed in a bunch of new features to simplify your workflows and improve your experience. Let’s cut to the chase!

* * *

### 🔧 **Configurable Browser and Crawler Behavior**

You’ve asked for better control over how browsers and crawlers are configured, and now you’ve got it. With the new `BrowserConfig` and `CrawlerRunConfig` objects, you can set up your browser and crawling behavior exactly how you want. No more cluttering `arun` with a dozen arguments—just pass in your configs and go.

**Example:**
    
    
    [](index.html.1.33.html#__codelineno-0-1)from crawl4ai import BrowserConfig, CrawlerRunConfig, AsyncWebCrawler
    [](index.html.1.33.html#__codelineno-0-2)
    [](index.html.1.33.html#__codelineno-0-3)browser_config = BrowserConfig(headless=True, viewport_width=1920, viewport_height=1080)
    [](index.html.1.33.html#__codelineno-0-4)crawler_config = CrawlerRunConfig(cache_mode="BYPASS")
    [](index.html.1.33.html#__codelineno-0-5)
    [](index.html.1.33.html#__codelineno-0-6)async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.33.html#__codelineno-0-7)    result = await crawler.arun(url="https://example.com", config=crawler_config)
    [](index.html.1.33.html#__codelineno-0-8)    print(result.markdown[:500])
    

This setup is a game-changer for scalability, keeping your code clean and flexible as we add more parameters in the future.

Remember: If you like to use the old way, you can still pass arguments directly to `arun` as before, no worries!

* * *

### 🔐 **Streamlined Session Management**

Here’s the big one: You can now pass local storage and cookies directly. Whether it’s setting values programmatically or importing a saved JSON state, managing sessions has never been easier. This is a must-have for authenticated crawls—just export your storage state once and reuse it effortlessly across runs.

**Example:** 1\. Open a browser, log in manually, and export the storage state. 2\. Import the JSON file for seamless authenticated crawling:
    
    
    [](index.html.1.33.html#__codelineno-1-1)result = await crawler.arun(
    [](index.html.1.33.html#__codelineno-1-2)    url="https://example.com/protected",
    [](index.html.1.33.html#__codelineno-1-3)    storage_state="my_storage_state.json"
    [](index.html.1.33.html#__codelineno-1-4))
    

* * *

### 🔢 **Handling Large Pages: Supercharged Screenshots and PDF Conversion**

Two big upgrades here:

  * **Blazing-fast long-page screenshots** : Turn extremely long web pages into clean, high-quality screenshots—without breaking a sweat. It’s optimized to handle large content without lag.

  * **Full-page PDF exports** : Now, you can also convert any page into a PDF with all the details intact. Perfect for archiving or sharing complex layouts.




* * *

### 🔧 **Other Cool Stuff**

  * **Anti-bot enhancements** : Magic mode now handles overlays, user simulation, and anti-detection features like a pro.
  * **JavaScript execution** : Execute custom JS snippets to handle dynamic content. No more wrestling with endless page interactions.



* * *

### 📊 **Performance Boosts and Dev-friendly Updates**

  * Faster rendering and viewport adjustments for better performance.
  * Improved cookie and local storage handling for seamless authentication.
  * Better debugging with detailed logs and actionable error messages.



* * *

### 🔠 **Use Cases You’ll Love**

1\. **Authenticated Crawls** : Login once, export your storage state, and reuse it across multiple requests without the headache. 2\. **Long-page Screenshots** : Perfect for blogs, e-commerce pages, or any endless-scroll website. 3\. **PDF Export** : Create professional-looking page PDFs in seconds.

* * *

### Let’s Get Crawling

Crawl4AI 0.4.2 is ready for you to download and try. I’m always looking for ways to improve, so don’t hold back—share your thoughts and feedback.

Happy Crawling! 🚀

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
