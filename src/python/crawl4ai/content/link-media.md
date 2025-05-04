[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.13.html#)



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
    * Link & Media
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

  * [Link & Media](index.html.1.13.html#link-media)
  * [1\. Link Extraction](index.html.1.13.html#1-link-extraction)
  * [2\. Domain Filtering](index.html.1.13.html#2-domain-filtering)
  * [3\. Media Extraction](index.html.1.13.html#3-media-extraction)
  * [4\. Putting It All Together: Link & Media Filtering](index.html.1.13.html#4-putting-it-all-together-link-media-filtering)
  * [5\. Common Pitfalls & Tips](index.html.1.13.html#5-common-pitfalls-tips)



# Link & Media

In this tutorial, you’ll learn how to:

  1. Extract links (internal, external) from crawled pages 
  2. Filter or exclude specific domains (e.g., social media or custom domains) 
  3. Access and manage media data (especially images) in the crawl result 
  4. Configure your crawler to exclude or prioritize certain images



> **Prerequisites**  
>  \- You have completed or are familiar with the [AsyncWebCrawler Basics](index.html.1.4.md) tutorial.  
>  \- You can run Crawl4AI in your environment (Playwright, Python, etc.).

* * *

Below is a revised version of the **Link Extraction** and **Media Extraction** sections that includes example data structures showing how links and media items are stored in `CrawlResult`. Feel free to adjust any field names or descriptions to match your actual output.

* * *

## 1\. Link Extraction

### 1.1 `result.links`

When you call `arun()` or `arun_many()` on a URL, Crawl4AI automatically extracts links and stores them in the `links` field of `CrawlResult`. By default, the crawler tries to distinguish **internal** links (same domain) from **external** links (different domains).

**Basic Example** :
    
    
    [](index.html.1.13.html#__codelineno-0-1)from crawl4ai import AsyncWebCrawler
    [](index.html.1.13.html#__codelineno-0-2)
    [](index.html.1.13.html#__codelineno-0-3)async with AsyncWebCrawler() as crawler:
    [](index.html.1.13.html#__codelineno-0-4)    result = await crawler.arun("https://www.example.com")
    [](index.html.1.13.html#__codelineno-0-5)    if result.success:
    [](index.html.1.13.html#__codelineno-0-6)        internal_links = result.links.get("internal", [])
    [](index.html.1.13.html#__codelineno-0-7)        external_links = result.links.get("external", [])
    [](index.html.1.13.html#__codelineno-0-8)        print(f"Found {len(internal_links)} internal links.")
    [](index.html.1.13.html#__codelineno-0-9)        print(f"Found {len(internal_links)} external links.")
    [](index.html.1.13.html#__codelineno-0-10)        print(f"Found {len(result.media)} media items.")
    [](index.html.1.13.html#__codelineno-0-11)
    [](index.html.1.13.html#__codelineno-0-12)        # Each link is typically a dictionary with fields like:
    [](index.html.1.13.html#__codelineno-0-13)        # { "href": "...", "text": "...", "title": "...", "base_domain": "..." }
    [](index.html.1.13.html#__codelineno-0-14)        if internal_links:
    [](index.html.1.13.html#__codelineno-0-15)            print("Sample Internal Link:", internal_links[0])
    [](index.html.1.13.html#__codelineno-0-16)    else:
    [](index.html.1.13.html#__codelineno-0-17)        print("Crawl failed:", result.error_message)
    

**Structure Example** :
    
    
    [](index.html.1.13.html#__codelineno-1-1)result.links = {
    [](index.html.1.13.html#__codelineno-1-2)  "internal": [
    [](index.html.1.13.html#__codelineno-1-3)    {
    [](index.html.1.13.html#__codelineno-1-4)      "href": "https://kidocode.com/",
    [](index.html.1.13.html#__codelineno-1-5)      "text": "",
    [](index.html.1.13.html#__codelineno-1-6)      "title": "",
    [](index.html.1.13.html#__codelineno-1-7)      "base_domain": "kidocode.com"
    [](index.html.1.13.html#__codelineno-1-8)    },
    [](index.html.1.13.html#__codelineno-1-9)    {
    [](index.html.1.13.html#__codelineno-1-10)      "href": "https://kidocode.com/degrees/technology",
    [](index.html.1.13.html#__codelineno-1-11)      "text": "Technology Degree",
    [](index.html.1.13.html#__codelineno-1-12)      "title": "KidoCode Tech Program",
    [](index.html.1.13.html#__codelineno-1-13)      "base_domain": "kidocode.com"
    [](index.html.1.13.html#__codelineno-1-14)    },
    [](index.html.1.13.html#__codelineno-1-15)    # ...
    [](index.html.1.13.html#__codelineno-1-16)  ],
    [](index.html.1.13.html#__codelineno-1-17)  "external": [
    [](index.html.1.13.html#__codelineno-1-18)    # possibly other links leading to third-party sites
    [](index.html.1.13.html#__codelineno-1-19)  ]
    [](index.html.1.13.html#__codelineno-1-20)}
    

  * **`href`** : The raw hyperlink URL. 
  * **`text`** : The link text (if any) within the `<a>` tag. 
  * **`title`** : The `title` attribute of the link (if present). 
  * **`base_domain`** : The domain extracted from `href`. Helpful for filtering or grouping by domain.



* * *

## 2\. Domain Filtering

Some websites contain hundreds of third-party or affiliate links. You can filter out certain domains at **crawl time** by configuring the crawler. The most relevant parameters in `CrawlerRunConfig` are:

  * **`exclude_external_links`** : If `True`, discard any link pointing outside the root domain. 
  * **`exclude_social_media_domains`** : Provide a list of social media platforms (e.g., `["facebook.com", "twitter.com"]`) to exclude from your crawl. 
  * **`exclude_social_media_links`** : If `True`, automatically skip known social platforms. 
  * **`exclude_domains`** : Provide a list of custom domains you want to exclude (e.g., `["spammyads.com", "tracker.net"]`).



### 2.1 Example: Excluding External & Social Media Links
    
    
    [](index.html.1.13.html#__codelineno-2-1)import asyncio
    [](index.html.1.13.html#__codelineno-2-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.13.html#__codelineno-2-3)
    [](index.html.1.13.html#__codelineno-2-4)async def main():
    [](index.html.1.13.html#__codelineno-2-5)    crawler_cfg = CrawlerRunConfig(
    [](index.html.1.13.html#__codelineno-2-6)        exclude_external_links=True,          # No links outside primary domain
    [](index.html.1.13.html#__codelineno-2-7)        exclude_social_media_links=True       # Skip recognized social media domains
    [](index.html.1.13.html#__codelineno-2-8)    )
    [](index.html.1.13.html#__codelineno-2-9)
    [](index.html.1.13.html#__codelineno-2-10)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.13.html#__codelineno-2-11)        result = await crawler.arun(
    [](index.html.1.13.html#__codelineno-2-12)            "https://www.example.com",
    [](index.html.1.13.html#__codelineno-2-13)            config=crawler_cfg
    [](index.html.1.13.html#__codelineno-2-14)        )
    [](index.html.1.13.html#__codelineno-2-15)        if result.success:
    [](index.html.1.13.html#__codelineno-2-16)            print("[OK] Crawled:", result.url)
    [](index.html.1.13.html#__codelineno-2-17)            print("Internal links count:", len(result.links.get("internal", [])))
    [](index.html.1.13.html#__codelineno-2-18)            print("External links count:", len(result.links.get("external", [])))  
    [](index.html.1.13.html#__codelineno-2-19)            # Likely zero external links in this scenario
    [](index.html.1.13.html#__codelineno-2-20)        else:
    [](index.html.1.13.html#__codelineno-2-21)            print("[ERROR]", result.error_message)
    [](index.html.1.13.html#__codelineno-2-22)
    [](index.html.1.13.html#__codelineno-2-23)if __name__ == "__main__":
    [](index.html.1.13.html#__codelineno-2-24)    asyncio.run(main())
    

### 2.2 Example: Excluding Specific Domains

If you want to let external links in, but specifically exclude a domain (e.g., `suspiciousads.com`), do this:
    
    
    [](index.html.1.13.html#__codelineno-3-1)crawler_cfg = CrawlerRunConfig(
    [](index.html.1.13.html#__codelineno-3-2)    exclude_domains=["suspiciousads.com"]
    [](index.html.1.13.html#__codelineno-3-3))
    

This approach is handy when you still want external links but need to block certain sites you consider spammy.

* * *

## 3\. Media Extraction

### 3.1 Accessing `result.media`

By default, Crawl4AI collects images, audio, and video URLs it finds on the page. These are stored in `result.media`, a dictionary keyed by media type (e.g., `images`, `videos`, `audio`).

**Basic Example** :
    
    
    [](index.html.1.13.html#__codelineno-4-1)if result.success:
    [](index.html.1.13.html#__codelineno-4-2)    images_info = result.media.get("images", [])
    [](index.html.1.13.html#__codelineno-4-3)    print(f"Found {len(images_info)} images in total.")
    [](index.html.1.13.html#__codelineno-4-4)    for i, img in enumerate(images_info[:5]):  # Inspect just the first 5
    [](index.html.1.13.html#__codelineno-4-5)        print(f"[Image {i}] URL: {img['src']}")
    [](index.html.1.13.html#__codelineno-4-6)        print(f"           Alt text: {img.get('alt', '')}")
    [](index.html.1.13.html#__codelineno-4-7)        print(f"           Score: {img.get('score')}")
    [](index.html.1.13.html#__codelineno-4-8)        print(f"           Description: {img.get('desc', '')}\n")
    

**Structure Example** :
    
    
    [](index.html.1.13.html#__codelineno-5-1)result.media = {
    [](index.html.1.13.html#__codelineno-5-2)  "images": [
    [](index.html.1.13.html#__codelineno-5-3)    {
    [](index.html.1.13.html#__codelineno-5-4)      "src": "https://cdn.prod.website-files.com/.../Group%2089.svg",
    [](index.html.1.13.html#__codelineno-5-5)      "alt": "coding school for kids",
    [](index.html.1.13.html#__codelineno-5-6)      "desc": "Trial Class Degrees degrees All Degrees AI Degree Technology ...",
    [](index.html.1.13.html#__codelineno-5-7)      "score": 3,
    [](index.html.1.13.html#__codelineno-5-8)      "type": "image",
    [](index.html.1.13.html#__codelineno-5-9)      "group_id": 0,
    [](index.html.1.13.html#__codelineno-5-10)      "format": None,
    [](index.html.1.13.html#__codelineno-5-11)      "width": None,
    [](index.html.1.13.html#__codelineno-5-12)      "height": None
    [](index.html.1.13.html#__codelineno-5-13)    },
    [](index.html.1.13.html#__codelineno-5-14)    # ...
    [](index.html.1.13.html#__codelineno-5-15)  ],
    [](index.html.1.13.html#__codelineno-5-16)  "videos": [
    [](index.html.1.13.html#__codelineno-5-17)    # Similar structure but with video-specific fields
    [](index.html.1.13.html#__codelineno-5-18)  ],
    [](index.html.1.13.html#__codelineno-5-19)  "audio": [
    [](index.html.1.13.html#__codelineno-5-20)    # Similar structure but with audio-specific fields
    [](index.html.1.13.html#__codelineno-5-21)  ]
    [](index.html.1.13.html#__codelineno-5-22)}
    

Depending on your Crawl4AI version or scraping strategy, these dictionaries can include fields like:

  * **`src`** : The media URL (e.g., image source) 
  * **`alt`** : The alt text for images (if present) 
  * **`desc`** : A snippet of nearby text or a short description (optional) 
  * **`score`** : A heuristic relevance score if you’re using content-scoring features 
  * **`width`** , **`height`** : If the crawler detects dimensions for the image/video 
  * **`type`** : Usually `"image"`, `"video"`, or `"audio"`
  * **`group_id`** : If you’re grouping related media items, the crawler might assign an ID 



With these details, you can easily filter out or focus on certain images (for instance, ignoring images with very low scores or a different domain), or gather metadata for analytics.

### 3.2 Excluding External Images

If you’re dealing with heavy pages or want to skip third-party images (advertisements, for example), you can turn on:
    
    
    [](index.html.1.13.html#__codelineno-6-1)crawler_cfg = CrawlerRunConfig(
    [](index.html.1.13.html#__codelineno-6-2)    exclude_external_images=True
    [](index.html.1.13.html#__codelineno-6-3))
    

This setting attempts to discard images from outside the primary domain, keeping only those from the site you’re crawling.

### 3.3 Additional Media Config

  * **`screenshot`** : Set to `True` if you want a full-page screenshot stored as `base64` in `result.screenshot`. 
  * **`pdf`** : Set to `True` if you want a PDF version of the page in `result.pdf`. 
  * **`wait_for_images`** : If `True`, attempts to wait until images are fully loaded before final extraction.



* * *

## 4\. Putting It All Together: Link & Media Filtering

Here’s a combined example demonstrating how to filter out external links, skip certain domains, and exclude external images:
    
    
    [](index.html.1.13.html#__codelineno-7-1)import asyncio
    [](index.html.1.13.html#__codelineno-7-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.13.html#__codelineno-7-3)
    [](index.html.1.13.html#__codelineno-7-4)async def main():
    [](index.html.1.13.html#__codelineno-7-5)    # Suppose we want to keep only internal links, remove certain domains, 
    [](index.html.1.13.html#__codelineno-7-6)    # and discard external images from the final crawl data.
    [](index.html.1.13.html#__codelineno-7-7)    crawler_cfg = CrawlerRunConfig(
    [](index.html.1.13.html#__codelineno-7-8)        exclude_external_links=True,
    [](index.html.1.13.html#__codelineno-7-9)        exclude_domains=["spammyads.com"],
    [](index.html.1.13.html#__codelineno-7-10)        exclude_social_media_links=True,   # skip Twitter, Facebook, etc.
    [](index.html.1.13.html#__codelineno-7-11)        exclude_external_images=True,      # keep only images from main domain
    [](index.html.1.13.html#__codelineno-7-12)        wait_for_images=True,             # ensure images are loaded
    [](index.html.1.13.html#__codelineno-7-13)        verbose=True
    [](index.html.1.13.html#__codelineno-7-14)    )
    [](index.html.1.13.html#__codelineno-7-15)
    [](index.html.1.13.html#__codelineno-7-16)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.13.html#__codelineno-7-17)        result = await crawler.arun("https://www.example.com", config=crawler_cfg)
    [](index.html.1.13.html#__codelineno-7-18)
    [](index.html.1.13.html#__codelineno-7-19)        if result.success:
    [](index.html.1.13.html#__codelineno-7-20)            print("[OK] Crawled:", result.url)
    [](index.html.1.13.html#__codelineno-7-21)
    [](index.html.1.13.html#__codelineno-7-22)            # 1. Links
    [](index.html.1.13.html#__codelineno-7-23)            in_links = result.links.get("internal", [])
    [](index.html.1.13.html#__codelineno-7-24)            ext_links = result.links.get("external", [])
    [](index.html.1.13.html#__codelineno-7-25)            print("Internal link count:", len(in_links))
    [](index.html.1.13.html#__codelineno-7-26)            print("External link count:", len(ext_links))  # should be zero with exclude_external_links=True
    [](index.html.1.13.html#__codelineno-7-27)
    [](index.html.1.13.html#__codelineno-7-28)            # 2. Images
    [](index.html.1.13.html#__codelineno-7-29)            images = result.media.get("images", [])
    [](index.html.1.13.html#__codelineno-7-30)            print("Images found:", len(images))
    [](index.html.1.13.html#__codelineno-7-31)
    [](index.html.1.13.html#__codelineno-7-32)            # Let's see a snippet of these images
    [](index.html.1.13.html#__codelineno-7-33)            for i, img in enumerate(images[:3]):
    [](index.html.1.13.html#__codelineno-7-34)                print(f"  - {img['src']} (alt={img.get('alt','')}, score={img.get('score','N/A')})")
    [](index.html.1.13.html#__codelineno-7-35)        else:
    [](index.html.1.13.html#__codelineno-7-36)            print("[ERROR] Failed to crawl. Reason:", result.error_message)
    [](index.html.1.13.html#__codelineno-7-37)
    [](index.html.1.13.html#__codelineno-7-38)if __name__ == "__main__":
    [](index.html.1.13.html#__codelineno-7-39)    asyncio.run(main())
    

* * *

## 5\. Common Pitfalls & Tips

1\. **Conflicting Flags** :  
\- `exclude_external_links=True` but then also specifying `exclude_social_media_links=True` is typically fine, but understand that the first setting already discards _all_ external links. The second becomes somewhat redundant.  
\- `exclude_external_images=True` but want to keep some external images? Currently no partial domain-based setting for images, so you might need a custom approach or hook logic.

2\. **Relevancy Scores** :  
\- If your version of Crawl4AI or your scraping strategy includes an `img["score"]`, it’s typically a heuristic based on size, position, or content analysis. Evaluate carefully if you rely on it.

3\. **Performance** :  
\- Excluding certain domains or external images can speed up your crawl, especially for large, media-heavy pages.  
\- If you want a “full” link map, do _not_ exclude them. Instead, you can post-filter in your own code.

4\. **Social Media Lists** :  
\- `exclude_social_media_links=True` typically references an internal list of known social domains like Facebook, Twitter, LinkedIn, etc. If you need to add or remove from that list, look for library settings or a local config file (depending on your version).

* * *

**That’s it for Link & Media Analysis!** You’re now equipped to filter out unwanted sites and zero in on the images and videos that matter for your project.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
