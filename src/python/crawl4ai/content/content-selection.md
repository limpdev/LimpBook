[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.10.html#)



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
    * Content Selection
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

  * [Content Selection](index.html.1.10.html#content-selection)
  * [1\. CSS-Based Selection](index.html.1.10.html#1-css-based-selection)
  * [2\. Content Filtering & Exclusions](index.html.1.10.html#2-content-filtering-exclusions)
  * [3\. Handling Iframes](index.html.1.10.html#3-handling-iframes)
  * [4\. Structured Extraction Examples](index.html.1.10.html#4-structured-extraction-examples)
  * [5\. Comprehensive Example](index.html.1.10.html#5-comprehensive-example)
  * [6\. Conclusion](index.html.1.10.html#6-conclusion)



# Content Selection

Crawl4AI provides multiple ways to **select** , **filter** , and **refine** the content from your crawls. Whether you need to target a specific CSS region, exclude entire tags, filter out external links, or remove certain domains and images, **`CrawlerRunConfig`** offers a wide range of parameters.

Below, we show how to configure these parameters and combine them for precise control.

* * *

## 1\. CSS-Based Selection

A straightforward way to **limit** your crawl results to a certain region of the page is **`css_selector`** in **`CrawlerRunConfig`** :
    
    
    [](index.html.1.10.html#__codelineno-0-1)import asyncio
    [](index.html.1.10.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.10.html#__codelineno-0-3)
    [](index.html.1.10.html#__codelineno-0-4)async def main():
    [](index.html.1.10.html#__codelineno-0-5)    config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-0-6)        # e.g., first 30 items from Hacker News
    [](index.html.1.10.html#__codelineno-0-7)        css_selector=".athing:nth-child(-n+30)"  
    [](index.html.1.10.html#__codelineno-0-8)    )
    [](index.html.1.10.html#__codelineno-0-9)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.10.html#__codelineno-0-10)        result = await crawler.arun(
    [](index.html.1.10.html#__codelineno-0-11)            url="https://news.ycombinator.com/newest", 
    [](index.html.1.10.html#__codelineno-0-12)            config=config
    [](index.html.1.10.html#__codelineno-0-13)        )
    [](index.html.1.10.html#__codelineno-0-14)        print("Partial HTML length:", len(result.cleaned_html))
    [](index.html.1.10.html#__codelineno-0-15)
    [](index.html.1.10.html#__codelineno-0-16)if __name__ == "__main__":
    [](index.html.1.10.html#__codelineno-0-17)    asyncio.run(main())
    

**Result** : Only elements matching that selector remain in `result.cleaned_html`.

* * *

## 2\. Content Filtering & Exclusions

### 2.1 Basic Overview
    
    
    [](index.html.1.10.html#__codelineno-1-1)config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-1-2)    # Content thresholds
    [](index.html.1.10.html#__codelineno-1-3)    word_count_threshold=10,        # Minimum words per block
    [](index.html.1.10.html#__codelineno-1-4)
    [](index.html.1.10.html#__codelineno-1-5)    # Tag exclusions
    [](index.html.1.10.html#__codelineno-1-6)    excluded_tags=['form', 'header', 'footer', 'nav'],
    [](index.html.1.10.html#__codelineno-1-7)
    [](index.html.1.10.html#__codelineno-1-8)    # Link filtering
    [](index.html.1.10.html#__codelineno-1-9)    exclude_external_links=True,    
    [](index.html.1.10.html#__codelineno-1-10)    exclude_social_media_links=True,
    [](index.html.1.10.html#__codelineno-1-11)    # Block entire domains
    [](index.html.1.10.html#__codelineno-1-12)    exclude_domains=["adtrackers.com", "spammynews.org"],    
    [](index.html.1.10.html#__codelineno-1-13)    exclude_social_media_domains=["facebook.com", "twitter.com"],
    [](index.html.1.10.html#__codelineno-1-14)
    [](index.html.1.10.html#__codelineno-1-15)    # Media filtering
    [](index.html.1.10.html#__codelineno-1-16)    exclude_external_images=True
    [](index.html.1.10.html#__codelineno-1-17))
    

**Explanation** :

  * **`word_count_threshold`** : Ignores text blocks under X words. Helps skip trivial blocks like short nav or disclaimers. 
  * **`excluded_tags`** : Removes entire tags (`<form>`, `<header>`, `<footer>`, etc.). 
  * **Link Filtering** : 
  * `exclude_external_links`: Strips out external links and may remove them from `result.links`. 
  * `exclude_social_media_links`: Removes links pointing to known social media domains. 
  * `exclude_domains`: A custom list of domains to block if discovered in links. 
  * `exclude_social_media_domains`: A curated list (override or add to it) for social media sites. 
  * **Media Filtering** : 
  * `exclude_external_images`: Discards images not hosted on the same domain as the main page (or its subdomains).



By default in case you set `exclude_social_media_links=True`, the following social media domains are excluded: 
    
    
    [](index.html.1.10.html#__codelineno-2-1)[
    [](index.html.1.10.html#__codelineno-2-2)    'facebook.com',
    [](index.html.1.10.html#__codelineno-2-3)    'twitter.com',
    [](index.html.1.10.html#__codelineno-2-4)    'x.com',
    [](index.html.1.10.html#__codelineno-2-5)    'linkedin.com',
    [](index.html.1.10.html#__codelineno-2-6)    'instagram.com',
    [](index.html.1.10.html#__codelineno-2-7)    'pinterest.com',
    [](index.html.1.10.html#__codelineno-2-8)    'tiktok.com',
    [](index.html.1.10.html#__codelineno-2-9)    'snapchat.com',
    [](index.html.1.10.html#__codelineno-2-10)    'reddit.com',
    [](index.html.1.10.html#__codelineno-2-11)]
    

### 2.2 Example Usage
    
    
    [](index.html.1.10.html#__codelineno-3-1)import asyncio
    [](index.html.1.10.html#__codelineno-3-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.10.html#__codelineno-3-3)
    [](index.html.1.10.html#__codelineno-3-4)async def main():
    [](index.html.1.10.html#__codelineno-3-5)    config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-3-6)        css_selector="main.content", 
    [](index.html.1.10.html#__codelineno-3-7)        word_count_threshold=10,
    [](index.html.1.10.html#__codelineno-3-8)        excluded_tags=["nav", "footer"],
    [](index.html.1.10.html#__codelineno-3-9)        exclude_external_links=True,
    [](index.html.1.10.html#__codelineno-3-10)        exclude_social_media_links=True,
    [](index.html.1.10.html#__codelineno-3-11)        exclude_domains=["ads.com", "spammytrackers.net"],
    [](index.html.1.10.html#__codelineno-3-12)        exclude_external_images=True,
    [](index.html.1.10.html#__codelineno-3-13)        cache_mode=CacheMode.BYPASS
    [](index.html.1.10.html#__codelineno-3-14)    )
    [](index.html.1.10.html#__codelineno-3-15)
    [](index.html.1.10.html#__codelineno-3-16)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.10.html#__codelineno-3-17)        result = await crawler.arun(url="https://news.ycombinator.com", config=config)
    [](index.html.1.10.html#__codelineno-3-18)        print("Cleaned HTML length:", len(result.cleaned_html))
    [](index.html.1.10.html#__codelineno-3-19)
    [](index.html.1.10.html#__codelineno-3-20)if __name__ == "__main__":
    [](index.html.1.10.html#__codelineno-3-21)    asyncio.run(main())
    

**Note** : If these parameters remove too much, reduce or disable them accordingly.

* * *

## 3\. Handling Iframes

Some sites embed content in `<iframe>` tags. If you want that inline: 
    
    
    [](index.html.1.10.html#__codelineno-4-1)config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-4-2)    # Merge iframe content into the final output
    [](index.html.1.10.html#__codelineno-4-3)    process_iframes=True,    
    [](index.html.1.10.html#__codelineno-4-4)    remove_overlay_elements=True
    [](index.html.1.10.html#__codelineno-4-5))
    

**Usage** : 
    
    
    [](index.html.1.10.html#__codelineno-5-1)import asyncio
    [](index.html.1.10.html#__codelineno-5-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.10.html#__codelineno-5-3)
    [](index.html.1.10.html#__codelineno-5-4)async def main():
    [](index.html.1.10.html#__codelineno-5-5)    config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-5-6)        process_iframes=True,
    [](index.html.1.10.html#__codelineno-5-7)        remove_overlay_elements=True
    [](index.html.1.10.html#__codelineno-5-8)    )
    [](index.html.1.10.html#__codelineno-5-9)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.10.html#__codelineno-5-10)        result = await crawler.arun(
    [](index.html.1.10.html#__codelineno-5-11)            url="https://example.org/iframe-demo", 
    [](index.html.1.10.html#__codelineno-5-12)            config=config
    [](index.html.1.10.html#__codelineno-5-13)        )
    [](index.html.1.10.html#__codelineno-5-14)        print("Iframe-merged length:", len(result.cleaned_html))
    [](index.html.1.10.html#__codelineno-5-15)
    [](index.html.1.10.html#__codelineno-5-16)if __name__ == "__main__":
    [](index.html.1.10.html#__codelineno-5-17)    asyncio.run(main())
    

* * *

## 4\. Structured Extraction Examples

You can combine content selection with a more advanced extraction strategy. For instance, a **CSS-based** or **LLM-based** extraction strategy can run on the filtered HTML.

### 4.1 Pattern-Based with `JsonCssExtractionStrategy`
    
    
    [](index.html.1.10.html#__codelineno-6-1)import asyncio
    [](index.html.1.10.html#__codelineno-6-2)import json
    [](index.html.1.10.html#__codelineno-6-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.10.html#__codelineno-6-4)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.10.html#__codelineno-6-5)
    [](index.html.1.10.html#__codelineno-6-6)async def main():
    [](index.html.1.10.html#__codelineno-6-7)    # Minimal schema for repeated items
    [](index.html.1.10.html#__codelineno-6-8)    schema = {
    [](index.html.1.10.html#__codelineno-6-9)        "name": "News Items",
    [](index.html.1.10.html#__codelineno-6-10)        "baseSelector": "tr.athing",
    [](index.html.1.10.html#__codelineno-6-11)        "fields": [
    [](index.html.1.10.html#__codelineno-6-12)            {"name": "title", "selector": "a.storylink", "type": "text"},
    [](index.html.1.10.html#__codelineno-6-13)            {
    [](index.html.1.10.html#__codelineno-6-14)                "name": "link", 
    [](index.html.1.10.html#__codelineno-6-15)                "selector": "a.storylink", 
    [](index.html.1.10.html#__codelineno-6-16)                "type": "attribute", 
    [](index.html.1.10.html#__codelineno-6-17)                "attribute": "href"
    [](index.html.1.10.html#__codelineno-6-18)            }
    [](index.html.1.10.html#__codelineno-6-19)        ]
    [](index.html.1.10.html#__codelineno-6-20)    }
    [](index.html.1.10.html#__codelineno-6-21)
    [](index.html.1.10.html#__codelineno-6-22)    config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-6-23)        # Content filtering
    [](index.html.1.10.html#__codelineno-6-24)        excluded_tags=["form", "header"],
    [](index.html.1.10.html#__codelineno-6-25)        exclude_domains=["adsite.com"],
    [](index.html.1.10.html#__codelineno-6-26)
    [](index.html.1.10.html#__codelineno-6-27)        # CSS selection or entire page
    [](index.html.1.10.html#__codelineno-6-28)        css_selector="table.itemlist",
    [](index.html.1.10.html#__codelineno-6-29)
    [](index.html.1.10.html#__codelineno-6-30)        # No caching for demonstration
    [](index.html.1.10.html#__codelineno-6-31)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.10.html#__codelineno-6-32)
    [](index.html.1.10.html#__codelineno-6-33)        # Extraction strategy
    [](index.html.1.10.html#__codelineno-6-34)        extraction_strategy=JsonCssExtractionStrategy(schema)
    [](index.html.1.10.html#__codelineno-6-35)    )
    [](index.html.1.10.html#__codelineno-6-36)
    [](index.html.1.10.html#__codelineno-6-37)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.10.html#__codelineno-6-38)        result = await crawler.arun(
    [](index.html.1.10.html#__codelineno-6-39)            url="https://news.ycombinator.com/newest", 
    [](index.html.1.10.html#__codelineno-6-40)            config=config
    [](index.html.1.10.html#__codelineno-6-41)        )
    [](index.html.1.10.html#__codelineno-6-42)        data = json.loads(result.extracted_content)
    [](index.html.1.10.html#__codelineno-6-43)        print("Sample extracted item:", data[:1])  # Show first item
    [](index.html.1.10.html#__codelineno-6-44)
    [](index.html.1.10.html#__codelineno-6-45)if __name__ == "__main__":
    [](index.html.1.10.html#__codelineno-6-46)    asyncio.run(main())
    

### 4.2 LLM-Based Extraction
    
    
    [](index.html.1.10.html#__codelineno-7-1)import asyncio
    [](index.html.1.10.html#__codelineno-7-2)import json
    [](index.html.1.10.html#__codelineno-7-3)from pydantic import BaseModel, Field
    [](index.html.1.10.html#__codelineno-7-4)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.10.html#__codelineno-7-5)from crawl4ai.extraction_strategy import LLMExtractionStrategy
    [](index.html.1.10.html#__codelineno-7-6)
    [](index.html.1.10.html#__codelineno-7-7)class ArticleData(BaseModel):
    [](index.html.1.10.html#__codelineno-7-8)    headline: str
    [](index.html.1.10.html#__codelineno-7-9)    summary: str
    [](index.html.1.10.html#__codelineno-7-10)
    [](index.html.1.10.html#__codelineno-7-11)async def main():
    [](index.html.1.10.html#__codelineno-7-12)    llm_strategy = LLMExtractionStrategy(
    [](index.html.1.10.html#__codelineno-7-13)        provider="openai/gpt-4",
    [](index.html.1.10.html#__codelineno-7-14)        api_token="sk-YOUR_API_KEY",
    [](index.html.1.10.html#__codelineno-7-15)        schema=ArticleData.schema(),
    [](index.html.1.10.html#__codelineno-7-16)        extraction_type="schema",
    [](index.html.1.10.html#__codelineno-7-17)        instruction="Extract 'headline' and a short 'summary' from the content."
    [](index.html.1.10.html#__codelineno-7-18)    )
    [](index.html.1.10.html#__codelineno-7-19)
    [](index.html.1.10.html#__codelineno-7-20)    config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-7-21)        exclude_external_links=True,
    [](index.html.1.10.html#__codelineno-7-22)        word_count_threshold=20,
    [](index.html.1.10.html#__codelineno-7-23)        extraction_strategy=llm_strategy
    [](index.html.1.10.html#__codelineno-7-24)    )
    [](index.html.1.10.html#__codelineno-7-25)
    [](index.html.1.10.html#__codelineno-7-26)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.10.html#__codelineno-7-27)        result = await crawler.arun(url="https://news.ycombinator.com", config=config)
    [](index.html.1.10.html#__codelineno-7-28)        article = json.loads(result.extracted_content)
    [](index.html.1.10.html#__codelineno-7-29)        print(article)
    [](index.html.1.10.html#__codelineno-7-30)
    [](index.html.1.10.html#__codelineno-7-31)if __name__ == "__main__":
    [](index.html.1.10.html#__codelineno-7-32)    asyncio.run(main())
    

Here, the crawler:

  * Filters out external links (`exclude_external_links=True`). 
  * Ignores very short text blocks (`word_count_threshold=20`). 
  * Passes the final HTML to your LLM strategy for an AI-driven parse.



* * *

## 5\. Comprehensive Example

Below is a short function that unifies **CSS selection** , **exclusion** logic, and a pattern-based extraction, demonstrating how you can fine-tune your final data:
    
    
    [](index.html.1.10.html#__codelineno-8-1)import asyncio
    [](index.html.1.10.html#__codelineno-8-2)import json
    [](index.html.1.10.html#__codelineno-8-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.10.html#__codelineno-8-4)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.10.html#__codelineno-8-5)
    [](index.html.1.10.html#__codelineno-8-6)async def extract_main_articles(url: str):
    [](index.html.1.10.html#__codelineno-8-7)    schema = {
    [](index.html.1.10.html#__codelineno-8-8)        "name": "ArticleBlock",
    [](index.html.1.10.html#__codelineno-8-9)        "baseSelector": "div.article-block",
    [](index.html.1.10.html#__codelineno-8-10)        "fields": [
    [](index.html.1.10.html#__codelineno-8-11)            {"name": "headline", "selector": "h2", "type": "text"},
    [](index.html.1.10.html#__codelineno-8-12)            {"name": "summary", "selector": ".summary", "type": "text"},
    [](index.html.1.10.html#__codelineno-8-13)            {
    [](index.html.1.10.html#__codelineno-8-14)                "name": "metadata",
    [](index.html.1.10.html#__codelineno-8-15)                "type": "nested",
    [](index.html.1.10.html#__codelineno-8-16)                "fields": [
    [](index.html.1.10.html#__codelineno-8-17)                    {"name": "author", "selector": ".author", "type": "text"},
    [](index.html.1.10.html#__codelineno-8-18)                    {"name": "date", "selector": ".date", "type": "text"}
    [](index.html.1.10.html#__codelineno-8-19)                ]
    [](index.html.1.10.html#__codelineno-8-20)            }
    [](index.html.1.10.html#__codelineno-8-21)        ]
    [](index.html.1.10.html#__codelineno-8-22)    }
    [](index.html.1.10.html#__codelineno-8-23)
    [](index.html.1.10.html#__codelineno-8-24)    config = CrawlerRunConfig(
    [](index.html.1.10.html#__codelineno-8-25)        # Keep only #main-content
    [](index.html.1.10.html#__codelineno-8-26)        css_selector="#main-content",
    [](index.html.1.10.html#__codelineno-8-27)
    [](index.html.1.10.html#__codelineno-8-28)        # Filtering
    [](index.html.1.10.html#__codelineno-8-29)        word_count_threshold=10,
    [](index.html.1.10.html#__codelineno-8-30)        excluded_tags=["nav", "footer"],  
    [](index.html.1.10.html#__codelineno-8-31)        exclude_external_links=True,
    [](index.html.1.10.html#__codelineno-8-32)        exclude_domains=["somebadsite.com"],
    [](index.html.1.10.html#__codelineno-8-33)        exclude_external_images=True,
    [](index.html.1.10.html#__codelineno-8-34)
    [](index.html.1.10.html#__codelineno-8-35)        # Extraction
    [](index.html.1.10.html#__codelineno-8-36)        extraction_strategy=JsonCssExtractionStrategy(schema),
    [](index.html.1.10.html#__codelineno-8-37)
    [](index.html.1.10.html#__codelineno-8-38)        cache_mode=CacheMode.BYPASS
    [](index.html.1.10.html#__codelineno-8-39)    )
    [](index.html.1.10.html#__codelineno-8-40)
    [](index.html.1.10.html#__codelineno-8-41)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.10.html#__codelineno-8-42)        result = await crawler.arun(url=url, config=config)
    [](index.html.1.10.html#__codelineno-8-43)        if not result.success:
    [](index.html.1.10.html#__codelineno-8-44)            print(f"Error: {result.error_message}")
    [](index.html.1.10.html#__codelineno-8-45)            return None
    [](index.html.1.10.html#__codelineno-8-46)        return json.loads(result.extracted_content)
    [](index.html.1.10.html#__codelineno-8-47)
    [](index.html.1.10.html#__codelineno-8-48)async def main():
    [](index.html.1.10.html#__codelineno-8-49)    articles = await extract_main_articles("https://news.ycombinator.com/newest")
    [](index.html.1.10.html#__codelineno-8-50)    if articles:
    [](index.html.1.10.html#__codelineno-8-51)        print("Extracted Articles:", articles[:2])  # Show first 2
    [](index.html.1.10.html#__codelineno-8-52)
    [](index.html.1.10.html#__codelineno-8-53)if __name__ == "__main__":
    [](index.html.1.10.html#__codelineno-8-54)    asyncio.run(main())
    

**Why This Works** : \- **CSS** scoping with `#main-content`.  
\- Multiple **exclude_** parameters to remove domains, external images, etc.  
\- A **JsonCssExtractionStrategy** to parse repeated article blocks.

* * *

## 6\. Conclusion

By mixing **css_selector** scoping, **content filtering** parameters, and advanced **extraction strategies** , you can precisely **choose** which data to keep. Key parameters in **`CrawlerRunConfig`** for content selection include:

1\. **`css_selector`** – Basic scoping to an element or region.  
2\. **`word_count_threshold`** – Skip short blocks.  
3\. **`excluded_tags`** – Remove entire HTML tags.  
4\. **`exclude_external_links`** , **`exclude_social_media_links`** , **`exclude_domains`** – Filter out unwanted links or domains.  
5\. **`exclude_external_images`** – Remove images from external sources.  
6\. **`process_iframes`** – Merge iframe content if needed. 

Combine these with structured extraction (CSS, LLM-based, or others) to build powerful crawls that yield exactly the content you want, from raw or cleaned HTML up to sophisticated JSON structures. For more detail, see [Configuration Reference](index.html.1.30.md). Enjoy curating your data to the max!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
