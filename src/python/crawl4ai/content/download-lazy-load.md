[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.16.html#)



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
    * Lazy Loading
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

  * [Handling Lazy-Loaded Images](index.html.1.16.html#handling-lazy-loaded-images)
  * [Example: Ensuring Lazy Images Appear](index.html.1.16.html#example-ensuring-lazy-images-appear)
  * [Combining with Other Link & Media Filters](index.html.1.16.html#combining-with-other-link-media-filters)
  * [Tips & Troubleshooting](index.html.1.16.html#tips-troubleshooting)



## Handling Lazy-Loaded Images

Many websites now load images **lazily** as you scroll. If you need to ensure they appear in your final crawl (and in `result.media`), consider:

1\. **`wait_for_images=True`** – Wait for images to fully load.  
2\. **`scan_full_page`** – Force the crawler to scroll the entire page, triggering lazy loads.  
3\. **`scroll_delay`** – Add small delays between scroll steps. 

**Note** : If the site requires multiple “Load More” triggers or complex interactions, see the [Page Interaction docs](index.html.1.9.md).

### Example: Ensuring Lazy Images Appear
    
    
    [](index.html.1.16.html#__codelineno-0-1)import asyncio
    [](index.html.1.16.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, BrowserConfig
    [](index.html.1.16.html#__codelineno-0-3)from crawl4ai.async_configs import CacheMode
    [](index.html.1.16.html#__codelineno-0-4)
    [](index.html.1.16.html#__codelineno-0-5)async def main():
    [](index.html.1.16.html#__codelineno-0-6)    config = CrawlerRunConfig(
    [](index.html.1.16.html#__codelineno-0-7)        # Force the crawler to wait until images are fully loaded
    [](index.html.1.16.html#__codelineno-0-8)        wait_for_images=True,
    [](index.html.1.16.html#__codelineno-0-9)
    [](index.html.1.16.html#__codelineno-0-10)        # Option 1: If you want to automatically scroll the page to load images
    [](index.html.1.16.html#__codelineno-0-11)        scan_full_page=True,  # Tells the crawler to try scrolling the entire page
    [](index.html.1.16.html#__codelineno-0-12)        scroll_delay=0.5,     # Delay (seconds) between scroll steps
    [](index.html.1.16.html#__codelineno-0-13)
    [](index.html.1.16.html#__codelineno-0-14)        # Option 2: If the site uses a 'Load More' or JS triggers for images,
    [](index.html.1.16.html#__codelineno-0-15)        # you can also specify js_code or wait_for logic here.
    [](index.html.1.16.html#__codelineno-0-16)
    [](index.html.1.16.html#__codelineno-0-17)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.16.html#__codelineno-0-18)        verbose=True
    [](index.html.1.16.html#__codelineno-0-19)    )
    [](index.html.1.16.html#__codelineno-0-20)
    [](index.html.1.16.html#__codelineno-0-21)    async with AsyncWebCrawler(config=BrowserConfig(headless=True)) as crawler:
    [](index.html.1.16.html#__codelineno-0-22)        result = await crawler.arun("https://www.example.com/gallery", config=config)
    [](index.html.1.16.html#__codelineno-0-23)
    [](index.html.1.16.html#__codelineno-0-24)        if result.success:
    [](index.html.1.16.html#__codelineno-0-25)            images = result.media.get("images", [])
    [](index.html.1.16.html#__codelineno-0-26)            print("Images found:", len(images))
    [](index.html.1.16.html#__codelineno-0-27)            for i, img in enumerate(images[:5]):
    [](index.html.1.16.html#__codelineno-0-28)                print(f"[Image {i}] URL: {img['src']}, Score: {img.get('score','N/A')}")
    [](index.html.1.16.html#__codelineno-0-29)        else:
    [](index.html.1.16.html#__codelineno-0-30)            print("Error:", result.error_message)
    [](index.html.1.16.html#__codelineno-0-31)
    [](index.html.1.16.html#__codelineno-0-32)if __name__ == "__main__":
    [](index.html.1.16.html#__codelineno-0-33)    asyncio.run(main())
    

**Explanation** :

  * **`wait_for_images=True`**  
The crawler tries to ensure images have finished loading before finalizing the HTML. 
  * **`scan_full_page=True`**  
Tells the crawler to attempt scrolling from top to bottom. Each scroll step helps trigger lazy loading. 
  * **`scroll_delay=0.5`**  
Pause half a second between each scroll step. Helps the site load images before continuing.



**When to Use** :

  * **Lazy-Loading** : If images appear only when the user scrolls into view, `scan_full_page` \+ `scroll_delay` helps the crawler see them. 
  * **Heavier Pages** : If a page is extremely long, be mindful that scanning the entire page can be slow. Adjust `scroll_delay` or the max scroll steps as needed.



* * *

## Combining with Other Link & Media Filters

You can still combine **lazy-load** logic with the usual **exclude_external_images** , **exclude_domains** , or link filtration:
    
    
    [](index.html.1.16.html#__codelineno-1-1)config = CrawlerRunConfig(
    [](index.html.1.16.html#__codelineno-1-2)    wait_for_images=True,
    [](index.html.1.16.html#__codelineno-1-3)    scan_full_page=True,
    [](index.html.1.16.html#__codelineno-1-4)    scroll_delay=0.5,
    [](index.html.1.16.html#__codelineno-1-5)
    [](index.html.1.16.html#__codelineno-1-6)    # Filter out external images if you only want local ones
    [](index.html.1.16.html#__codelineno-1-7)    exclude_external_images=True,
    [](index.html.1.16.html#__codelineno-1-8)
    [](index.html.1.16.html#__codelineno-1-9)    # Exclude certain domains for links
    [](index.html.1.16.html#__codelineno-1-10)    exclude_domains=["spammycdn.com"],
    [](index.html.1.16.html#__codelineno-1-11))
    

This approach ensures you see **all** images from the main domain while ignoring external ones, and the crawler physically scrolls the entire page so that lazy-loading triggers.

* * *

## Tips & Troubleshooting

1\. **Long Pages**  
\- Setting `scan_full_page=True` on extremely long or infinite-scroll pages can be resource-intensive.  
\- Consider using [hooks](index.html.1.9.md) or specialized logic to load specific sections or “Load More” triggers repeatedly.

2\. **Mixed Image Behavior**  
\- Some sites load images in batches as you scroll. If you’re missing images, increase your `scroll_delay` or call multiple partial scrolls in a loop with JS code or hooks.

3\. **Combining with Dynamic Wait**  
\- If the site has a placeholder that only changes to a real image after a certain event, you might do `wait_for="css:img.loaded"` or a custom JS `wait_for`.

4\. **Caching**  
\- If `cache_mode` is enabled, repeated crawls might skip some network fetches. If you suspect caching is missing new images, set `cache_mode=CacheMode.BYPASS` for fresh fetches.

* * *

With **lazy-loading** support, **wait_for_images** , and **scan_full_page** settings, you can capture the entire gallery or feed of images you expect—even if the site only loads them as the user scrolls. Combine these with the standard media filtering and domain exclusion for a complete link & media handling strategy.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
