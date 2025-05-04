[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.24.html#)



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
    * LLM-Free Strategies
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

  * [Extracting JSON (No LLM)](index.html.1.24.html#extracting-json-no-llm)
  * [1\. Intro to Schema-Based Extraction](index.html.1.24.html#1-intro-to-schema-based-extraction)
  * [2\. Simple Example: Crypto Prices](index.html.1.24.html#2-simple-example-crypto-prices)
  * [3\. Advanced Schema & Nested Structures](index.html.1.24.html#3-advanced-schema-nested-structures)
  * [4\. Why “No LLM” Is Often Better](index.html.1.24.html#4-why-no-llm-is-often-better)
  * [5\. Base Element Attributes & Additional Fields](index.html.1.24.html#5-base-element-attributes-additional-fields)
  * [6\. Putting It All Together: Larger Example](index.html.1.24.html#6-putting-it-all-together-larger-example)
  * [7\. Tips & Best Practices](index.html.1.24.html#7-tips-best-practices)
  * [8\. Conclusion](index.html.1.24.html#8-conclusion)



# Extracting JSON (No LLM)

One of Crawl4AI’s **most powerful** features is extracting **structured JSON** from websites **without** relying on large language models. By defining a **schema** with CSS or XPath selectors, you can extract data instantly—even from complex or nested HTML structures—without the cost, latency, or environmental impact of an LLM.

**Why avoid LLM for basic extractions?**

1\. **Faster & Cheaper**: No API calls or GPU overhead.  
2\. **Lower Carbon Footprint** : LLM inference can be energy-intensive. A well-defined schema is practically carbon-free.  
3\. **Precise & Repeatable**: CSS/XPath selectors do exactly what you specify. LLM outputs can vary or hallucinate.  
4\. **Scales Readily** : For thousands of pages, schema-based extraction runs quickly and in parallel.

Below, we’ll explore how to craft these schemas and use them with **JsonCssExtractionStrategy** (or **JsonXPathExtractionStrategy** if you prefer XPath). We’ll also highlight advanced features like **nested fields** and **base element attributes**.

* * *

## 1\. Intro to Schema-Based Extraction

A schema defines:

  1. A **base selector** that identifies each “container” element on the page (e.g., a product row, a blog post card).  
2\. **Fields** describing which CSS/XPath selectors to use for each piece of data you want to capture (text, attribute, HTML block, etc.).  
3\. **Nested** or **list** types for repeated or hierarchical structures. 



For example, if you have a list of products, each one might have a name, price, reviews, and “related products.” This approach is faster and more reliable than an LLM for consistent, structured pages.

* * *

## 2\. Simple Example: Crypto Prices

Let’s begin with a **simple** schema-based extraction using the `JsonCssExtractionStrategy`. Below is a snippet that extracts cryptocurrency prices from a site (similar to the legacy Coinbase example). Notice we **don’t** call any LLM:
    
    
    [](index.html.1.24.html#__codelineno-0-1)import json
    [](index.html.1.24.html#__codelineno-0-2)import asyncio
    [](index.html.1.24.html#__codelineno-0-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.24.html#__codelineno-0-4)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.24.html#__codelineno-0-5)
    [](index.html.1.24.html#__codelineno-0-6)async def extract_crypto_prices():
    [](index.html.1.24.html#__codelineno-0-7)    # 1. Define a simple extraction schema
    [](index.html.1.24.html#__codelineno-0-8)    schema = {
    [](index.html.1.24.html#__codelineno-0-9)        "name": "Crypto Prices",
    [](index.html.1.24.html#__codelineno-0-10)        "baseSelector": "div.crypto-row",    # Repeated elements
    [](index.html.1.24.html#__codelineno-0-11)        "fields": [
    [](index.html.1.24.html#__codelineno-0-12)            {
    [](index.html.1.24.html#__codelineno-0-13)                "name": "coin_name",
    [](index.html.1.24.html#__codelineno-0-14)                "selector": "h2.coin-name",
    [](index.html.1.24.html#__codelineno-0-15)                "type": "text"
    [](index.html.1.24.html#__codelineno-0-16)            },
    [](index.html.1.24.html#__codelineno-0-17)            {
    [](index.html.1.24.html#__codelineno-0-18)                "name": "price",
    [](index.html.1.24.html#__codelineno-0-19)                "selector": "span.coin-price",
    [](index.html.1.24.html#__codelineno-0-20)                "type": "text"
    [](index.html.1.24.html#__codelineno-0-21)            }
    [](index.html.1.24.html#__codelineno-0-22)        ]
    [](index.html.1.24.html#__codelineno-0-23)    }
    [](index.html.1.24.html#__codelineno-0-24)
    [](index.html.1.24.html#__codelineno-0-25)    # 2. Create the extraction strategy
    [](index.html.1.24.html#__codelineno-0-26)    extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)
    [](index.html.1.24.html#__codelineno-0-27)
    [](index.html.1.24.html#__codelineno-0-28)    # 3. Set up your crawler config (if needed)
    [](index.html.1.24.html#__codelineno-0-29)    config = CrawlerRunConfig(
    [](index.html.1.24.html#__codelineno-0-30)        # e.g., pass js_code or wait_for if the page is dynamic
    [](index.html.1.24.html#__codelineno-0-31)        # wait_for="css:.crypto-row:nth-child(20)"
    [](index.html.1.24.html#__codelineno-0-32)        cache_mode = CacheMode.BYPASS,
    [](index.html.1.24.html#__codelineno-0-33)        extraction_strategy=extraction_strategy,
    [](index.html.1.24.html#__codelineno-0-34)    )
    [](index.html.1.24.html#__codelineno-0-35)
    [](index.html.1.24.html#__codelineno-0-36)    async with AsyncWebCrawler(verbose=True) as crawler:
    [](index.html.1.24.html#__codelineno-0-37)        # 4. Run the crawl and extraction
    [](index.html.1.24.html#__codelineno-0-38)        result = await crawler.arun(
    [](index.html.1.24.html#__codelineno-0-39)            url="https://example.com/crypto-prices",
    [](index.html.1.24.html#__codelineno-0-40)
    [](index.html.1.24.html#__codelineno-0-41)            config=config
    [](index.html.1.24.html#__codelineno-0-42)        )
    [](index.html.1.24.html#__codelineno-0-43)
    [](index.html.1.24.html#__codelineno-0-44)        if not result.success:
    [](index.html.1.24.html#__codelineno-0-45)            print("Crawl failed:", result.error_message)
    [](index.html.1.24.html#__codelineno-0-46)            return
    [](index.html.1.24.html#__codelineno-0-47)
    [](index.html.1.24.html#__codelineno-0-48)        # 5. Parse the extracted JSON
    [](index.html.1.24.html#__codelineno-0-49)        data = json.loads(result.extracted_content)
    [](index.html.1.24.html#__codelineno-0-50)        print(f"Extracted {len(data)} coin entries")
    [](index.html.1.24.html#__codelineno-0-51)        print(json.dumps(data[0], indent=2) if data else "No data found")
    [](index.html.1.24.html#__codelineno-0-52)
    [](index.html.1.24.html#__codelineno-0-53)asyncio.run(extract_crypto_prices())
    

**Highlights** :

  * **`baseSelector`** : Tells us where each “item” (crypto row) is. 
  * **`fields`** : Two fields (`coin_name`, `price`) using simple CSS selectors. 
  * Each field defines a **`type`** (e.g., `text`, `attribute`, `html`, `regex`, etc.).



No LLM is needed, and the performance is **near-instant** for hundreds or thousands of items.

* * *

### **XPath Example with`raw://` HTML**

Below is a short example demonstrating **XPath** extraction plus the **`raw://`** scheme. We’ll pass a **dummy HTML** directly (no network request) and define the extraction strategy in `CrawlerRunConfig`.
    
    
    [](index.html.1.24.html#__codelineno-1-1)import json
    [](index.html.1.24.html#__codelineno-1-2)import asyncio
    [](index.html.1.24.html#__codelineno-1-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.24.html#__codelineno-1-4)from crawl4ai.extraction_strategy import JsonXPathExtractionStrategy
    [](index.html.1.24.html#__codelineno-1-5)
    [](index.html.1.24.html#__codelineno-1-6)async def extract_crypto_prices_xpath():
    [](index.html.1.24.html#__codelineno-1-7)    # 1. Minimal dummy HTML with some repeating rows
    [](index.html.1.24.html#__codelineno-1-8)    dummy_html = """
    [](index.html.1.24.html#__codelineno-1-9)    <html>
    [](index.html.1.24.html#__codelineno-1-10)      <body>
    [](index.html.1.24.html#__codelineno-1-11)        <div class='crypto-row'>
    [](index.html.1.24.html#__codelineno-1-12)          <h2 class='coin-name'>Bitcoin</h2>
    [](index.html.1.24.html#__codelineno-1-13)          <span class='coin-price'>$28,000</span>
    [](index.html.1.24.html#__codelineno-1-14)        </div>
    [](index.html.1.24.html#__codelineno-1-15)        <div class='crypto-row'>
    [](index.html.1.24.html#__codelineno-1-16)          <h2 class='coin-name'>Ethereum</h2>
    [](index.html.1.24.html#__codelineno-1-17)          <span class='coin-price'>$1,800</span>
    [](index.html.1.24.html#__codelineno-1-18)        </div>
    [](index.html.1.24.html#__codelineno-1-19)      </body>
    [](index.html.1.24.html#__codelineno-1-20)    </html>
    [](index.html.1.24.html#__codelineno-1-21)    """
    [](index.html.1.24.html#__codelineno-1-22)
    [](index.html.1.24.html#__codelineno-1-23)    # 2. Define the JSON schema (XPath version)
    [](index.html.1.24.html#__codelineno-1-24)    schema = {
    [](index.html.1.24.html#__codelineno-1-25)        "name": "Crypto Prices via XPath",
    [](index.html.1.24.html#__codelineno-1-26)        "baseSelector": "//div[@class='crypto-row']",
    [](index.html.1.24.html#__codelineno-1-27)        "fields": [
    [](index.html.1.24.html#__codelineno-1-28)            {
    [](index.html.1.24.html#__codelineno-1-29)                "name": "coin_name",
    [](index.html.1.24.html#__codelineno-1-30)                "selector": ".//h2[@class='coin-name']",
    [](index.html.1.24.html#__codelineno-1-31)                "type": "text"
    [](index.html.1.24.html#__codelineno-1-32)            },
    [](index.html.1.24.html#__codelineno-1-33)            {
    [](index.html.1.24.html#__codelineno-1-34)                "name": "price",
    [](index.html.1.24.html#__codelineno-1-35)                "selector": ".//span[@class='coin-price']",
    [](index.html.1.24.html#__codelineno-1-36)                "type": "text"
    [](index.html.1.24.html#__codelineno-1-37)            }
    [](index.html.1.24.html#__codelineno-1-38)        ]
    [](index.html.1.24.html#__codelineno-1-39)    }
    [](index.html.1.24.html#__codelineno-1-40)
    [](index.html.1.24.html#__codelineno-1-41)    # 3. Place the strategy in the CrawlerRunConfig
    [](index.html.1.24.html#__codelineno-1-42)    config = CrawlerRunConfig(
    [](index.html.1.24.html#__codelineno-1-43)        extraction_strategy=JsonXPathExtractionStrategy(schema, verbose=True)
    [](index.html.1.24.html#__codelineno-1-44)    )
    [](index.html.1.24.html#__codelineno-1-45)
    [](index.html.1.24.html#__codelineno-1-46)    # 4. Use raw:// scheme to pass dummy_html directly
    [](index.html.1.24.html#__codelineno-1-47)    raw_url = f"raw://{dummy_html}"
    [](index.html.1.24.html#__codelineno-1-48)
    [](index.html.1.24.html#__codelineno-1-49)    async with AsyncWebCrawler(verbose=True) as crawler:
    [](index.html.1.24.html#__codelineno-1-50)        result = await crawler.arun(
    [](index.html.1.24.html#__codelineno-1-51)            url=raw_url,
    [](index.html.1.24.html#__codelineno-1-52)            config=config
    [](index.html.1.24.html#__codelineno-1-53)        )
    [](index.html.1.24.html#__codelineno-1-54)
    [](index.html.1.24.html#__codelineno-1-55)        if not result.success:
    [](index.html.1.24.html#__codelineno-1-56)            print("Crawl failed:", result.error_message)
    [](index.html.1.24.html#__codelineno-1-57)            return
    [](index.html.1.24.html#__codelineno-1-58)
    [](index.html.1.24.html#__codelineno-1-59)        data = json.loads(result.extracted_content)
    [](index.html.1.24.html#__codelineno-1-60)        print(f"Extracted {len(data)} coin rows")
    [](index.html.1.24.html#__codelineno-1-61)        if data:
    [](index.html.1.24.html#__codelineno-1-62)            print("First item:", data[0])
    [](index.html.1.24.html#__codelineno-1-63)
    [](index.html.1.24.html#__codelineno-1-64)asyncio.run(extract_crypto_prices_xpath())
    

**Key Points** :

1\. **`JsonXPathExtractionStrategy`** is used instead of `JsonCssExtractionStrategy`.  
2\. **`baseSelector`** and each field’s `"selector"` use **XPath** instead of CSS.  
3\. **`raw://`** lets us pass `dummy_html` with no real network request—handy for local testing.  
4\. Everything (including the extraction strategy) is in **`CrawlerRunConfig`**. 

That’s how you keep the config self-contained, illustrate **XPath** usage, and demonstrate the **raw** scheme for direct HTML input—all while avoiding the old approach of passing `extraction_strategy` directly to `arun()`.

* * *

## 3\. Advanced Schema & Nested Structures

Real sites often have **nested** or repeated data—like categories containing products, which themselves have a list of reviews or features. For that, we can define **nested** or **list** (and even **nested_list**) fields.

### Sample E-Commerce HTML

We have a **sample e-commerce** HTML file on GitHub (example): 
    
    
    [](index.html.1.24.html#__codelineno-2-1)https://gist.githubusercontent.com/githubusercontent/2d7b8ba3cd8ab6cf3c8da771ddb36878/raw/1ae2f90c6861ce7dd84cc50d3df9920dee5e1fd2/sample_ecommerce.html
    

This snippet includes categories, products, features, reviews, and related items. Let’s see how to define a schema that fully captures that structure **without LLM**.
    
    
    [](index.html.1.24.html#__codelineno-3-1)schema = {
    [](index.html.1.24.html#__codelineno-3-2)    "name": "E-commerce Product Catalog",
    [](index.html.1.24.html#__codelineno-3-3)    "baseSelector": "div.category",
    [](index.html.1.24.html#__codelineno-3-4)    # (1) We can define optional baseFields if we want to extract attributes 
    [](index.html.1.24.html#__codelineno-3-5)    # from the category container
    [](index.html.1.24.html#__codelineno-3-6)    "baseFields": [
    [](index.html.1.24.html#__codelineno-3-7)        {"name": "data_cat_id", "type": "attribute", "attribute": "data-cat-id"}, 
    [](index.html.1.24.html#__codelineno-3-8)    ],
    [](index.html.1.24.html#__codelineno-3-9)    "fields": [
    [](index.html.1.24.html#__codelineno-3-10)        {
    [](index.html.1.24.html#__codelineno-3-11)            "name": "category_name",
    [](index.html.1.24.html#__codelineno-3-12)            "selector": "h2.category-name",
    [](index.html.1.24.html#__codelineno-3-13)            "type": "text"
    [](index.html.1.24.html#__codelineno-3-14)        },
    [](index.html.1.24.html#__codelineno-3-15)        {
    [](index.html.1.24.html#__codelineno-3-16)            "name": "products",
    [](index.html.1.24.html#__codelineno-3-17)            "selector": "div.product",
    [](index.html.1.24.html#__codelineno-3-18)            "type": "nested_list",    # repeated sub-objects
    [](index.html.1.24.html#__codelineno-3-19)            "fields": [
    [](index.html.1.24.html#__codelineno-3-20)                {
    [](index.html.1.24.html#__codelineno-3-21)                    "name": "name",
    [](index.html.1.24.html#__codelineno-3-22)                    "selector": "h3.product-name",
    [](index.html.1.24.html#__codelineno-3-23)                    "type": "text"
    [](index.html.1.24.html#__codelineno-3-24)                },
    [](index.html.1.24.html#__codelineno-3-25)                {
    [](index.html.1.24.html#__codelineno-3-26)                    "name": "price",
    [](index.html.1.24.html#__codelineno-3-27)                    "selector": "p.product-price",
    [](index.html.1.24.html#__codelineno-3-28)                    "type": "text"
    [](index.html.1.24.html#__codelineno-3-29)                },
    [](index.html.1.24.html#__codelineno-3-30)                {
    [](index.html.1.24.html#__codelineno-3-31)                    "name": "details",
    [](index.html.1.24.html#__codelineno-3-32)                    "selector": "div.product-details",
    [](index.html.1.24.html#__codelineno-3-33)                    "type": "nested",  # single sub-object
    [](index.html.1.24.html#__codelineno-3-34)                    "fields": [
    [](index.html.1.24.html#__codelineno-3-35)                        {
    [](index.html.1.24.html#__codelineno-3-36)                            "name": "brand",
    [](index.html.1.24.html#__codelineno-3-37)                            "selector": "span.brand",
    [](index.html.1.24.html#__codelineno-3-38)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-39)                        },
    [](index.html.1.24.html#__codelineno-3-40)                        {
    [](index.html.1.24.html#__codelineno-3-41)                            "name": "model",
    [](index.html.1.24.html#__codelineno-3-42)                            "selector": "span.model",
    [](index.html.1.24.html#__codelineno-3-43)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-44)                        }
    [](index.html.1.24.html#__codelineno-3-45)                    ]
    [](index.html.1.24.html#__codelineno-3-46)                },
    [](index.html.1.24.html#__codelineno-3-47)                {
    [](index.html.1.24.html#__codelineno-3-48)                    "name": "features",
    [](index.html.1.24.html#__codelineno-3-49)                    "selector": "ul.product-features li",
    [](index.html.1.24.html#__codelineno-3-50)                    "type": "list",
    [](index.html.1.24.html#__codelineno-3-51)                    "fields": [
    [](index.html.1.24.html#__codelineno-3-52)                        {"name": "feature", "type": "text"} 
    [](index.html.1.24.html#__codelineno-3-53)                    ]
    [](index.html.1.24.html#__codelineno-3-54)                },
    [](index.html.1.24.html#__codelineno-3-55)                {
    [](index.html.1.24.html#__codelineno-3-56)                    "name": "reviews",
    [](index.html.1.24.html#__codelineno-3-57)                    "selector": "div.review",
    [](index.html.1.24.html#__codelineno-3-58)                    "type": "nested_list",
    [](index.html.1.24.html#__codelineno-3-59)                    "fields": [
    [](index.html.1.24.html#__codelineno-3-60)                        {
    [](index.html.1.24.html#__codelineno-3-61)                            "name": "reviewer", 
    [](index.html.1.24.html#__codelineno-3-62)                            "selector": "span.reviewer", 
    [](index.html.1.24.html#__codelineno-3-63)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-64)                        },
    [](index.html.1.24.html#__codelineno-3-65)                        {
    [](index.html.1.24.html#__codelineno-3-66)                            "name": "rating", 
    [](index.html.1.24.html#__codelineno-3-67)                            "selector": "span.rating", 
    [](index.html.1.24.html#__codelineno-3-68)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-69)                        },
    [](index.html.1.24.html#__codelineno-3-70)                        {
    [](index.html.1.24.html#__codelineno-3-71)                            "name": "comment", 
    [](index.html.1.24.html#__codelineno-3-72)                            "selector": "p.review-text", 
    [](index.html.1.24.html#__codelineno-3-73)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-74)                        }
    [](index.html.1.24.html#__codelineno-3-75)                    ]
    [](index.html.1.24.html#__codelineno-3-76)                },
    [](index.html.1.24.html#__codelineno-3-77)                {
    [](index.html.1.24.html#__codelineno-3-78)                    "name": "related_products",
    [](index.html.1.24.html#__codelineno-3-79)                    "selector": "ul.related-products li",
    [](index.html.1.24.html#__codelineno-3-80)                    "type": "list",
    [](index.html.1.24.html#__codelineno-3-81)                    "fields": [
    [](index.html.1.24.html#__codelineno-3-82)                        {
    [](index.html.1.24.html#__codelineno-3-83)                            "name": "name", 
    [](index.html.1.24.html#__codelineno-3-84)                            "selector": "span.related-name", 
    [](index.html.1.24.html#__codelineno-3-85)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-86)                        },
    [](index.html.1.24.html#__codelineno-3-87)                        {
    [](index.html.1.24.html#__codelineno-3-88)                            "name": "price", 
    [](index.html.1.24.html#__codelineno-3-89)                            "selector": "span.related-price", 
    [](index.html.1.24.html#__codelineno-3-90)                            "type": "text"
    [](index.html.1.24.html#__codelineno-3-91)                        }
    [](index.html.1.24.html#__codelineno-3-92)                    ]
    [](index.html.1.24.html#__codelineno-3-93)                }
    [](index.html.1.24.html#__codelineno-3-94)            ]
    [](index.html.1.24.html#__codelineno-3-95)        }
    [](index.html.1.24.html#__codelineno-3-96)    ]
    [](index.html.1.24.html#__codelineno-3-97)}
    

Key Takeaways:

  * **Nested vs. List** : 
  * **`type: "nested"`** means a **single** sub-object (like `details`). 
  * **`type: "list"`** means multiple items that are **simple** dictionaries or single text fields. 
  * **`type: "nested_list"`** means repeated **complex** objects (like `products` or `reviews`).
  * **Base Fields** : We can extract **attributes** from the container element via `"baseFields"`. For instance, `"data_cat_id"` might be `data-cat-id="elect123"`. 
  * **Transforms** : We can also define a `transform` if we want to lower/upper case, strip whitespace, or even run a custom function.



### Running the Extraction
    
    
    [](index.html.1.24.html#__codelineno-4-1)import json
    [](index.html.1.24.html#__codelineno-4-2)import asyncio
    [](index.html.1.24.html#__codelineno-4-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.24.html#__codelineno-4-4)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.24.html#__codelineno-4-5)
    [](index.html.1.24.html#__codelineno-4-6)ecommerce_schema = {
    [](index.html.1.24.html#__codelineno-4-7)    # ... the advanced schema from above ...
    [](index.html.1.24.html#__codelineno-4-8)}
    [](index.html.1.24.html#__codelineno-4-9)
    [](index.html.1.24.html#__codelineno-4-10)async def extract_ecommerce_data():
    [](index.html.1.24.html#__codelineno-4-11)    strategy = JsonCssExtractionStrategy(ecommerce_schema, verbose=True)
    [](index.html.1.24.html#__codelineno-4-12)
    [](index.html.1.24.html#__codelineno-4-13)    config = CrawlerRunConfig()
    [](index.html.1.24.html#__codelineno-4-14)
    [](index.html.1.24.html#__codelineno-4-15)    async with AsyncWebCrawler(verbose=True) as crawler:
    [](index.html.1.24.html#__codelineno-4-16)        result = await crawler.arun(
    [](index.html.1.24.html#__codelineno-4-17)            url="https://gist.githubusercontent.com/githubusercontent/2d7b8ba3cd8ab6cf3c8da771ddb36878/raw/1ae2f90c6861ce7dd84cc50d3df9920dee5e1fd2/sample_ecommerce.html",
    [](index.html.1.24.html#__codelineno-4-18)            extraction_strategy=strategy,
    [](index.html.1.24.html#__codelineno-4-19)            config=config
    [](index.html.1.24.html#__codelineno-4-20)        )
    [](index.html.1.24.html#__codelineno-4-21)
    [](index.html.1.24.html#__codelineno-4-22)        if not result.success:
    [](index.html.1.24.html#__codelineno-4-23)            print("Crawl failed:", result.error_message)
    [](index.html.1.24.html#__codelineno-4-24)            return
    [](index.html.1.24.html#__codelineno-4-25)
    [](index.html.1.24.html#__codelineno-4-26)        # Parse the JSON output
    [](index.html.1.24.html#__codelineno-4-27)        data = json.loads(result.extracted_content)
    [](index.html.1.24.html#__codelineno-4-28)        print(json.dumps(data, indent=2) if data else "No data found.")
    [](index.html.1.24.html#__codelineno-4-29)
    [](index.html.1.24.html#__codelineno-4-30)asyncio.run(extract_ecommerce_data())
    

If all goes well, you get a **structured** JSON array with each “category,” containing an array of `products`. Each product includes `details`, `features`, `reviews`, etc. All of that **without** an LLM.

* * *

## 4\. Why “No LLM” Is Often Better

1\. **Zero Hallucination** : Schema-based extraction doesn’t guess text. It either finds it or not.  
2\. **Guaranteed Structure** : The same schema yields consistent JSON across many pages, so your downstream pipeline can rely on stable keys.  
3\. **Speed** : LLM-based extraction can be 10–1000x slower for large-scale crawling.  
4\. **Scalable** : Adding or updating a field is a matter of adjusting the schema, not re-tuning a model.

**When might you consider an LLM?** Possibly if the site is extremely unstructured or you want AI summarization. But always try a schema approach first for repeated or consistent data patterns.

* * *

## 5\. Base Element Attributes & Additional Fields

It’s easy to **extract attributes** (like `href`, `src`, or `data-xxx`) from your base or nested elements using:
    
    
    [](index.html.1.24.html#__codelineno-5-1){
    [](index.html.1.24.html#__codelineno-5-2)  "name": "href",
    [](index.html.1.24.html#__codelineno-5-3)  "type": "attribute",
    [](index.html.1.24.html#__codelineno-5-4)  "attribute": "href",
    [](index.html.1.24.html#__codelineno-5-5)  "default": null
    [](index.html.1.24.html#__codelineno-5-6)}
    

You can define them in **`baseFields`** (extracted from the main container element) or in each field’s sub-lists. This is especially helpful if you need an item’s link or ID stored in the parent `<div>`.

* * *

## 6\. Putting It All Together: Larger Example

Consider a blog site. We have a schema that extracts the **URL** from each post card (via `baseFields` with an `"attribute": "href"`), plus the title, date, summary, and author:
    
    
    [](index.html.1.24.html#__codelineno-6-1)schema = {
    [](index.html.1.24.html#__codelineno-6-2)  "name": "Blog Posts",
    [](index.html.1.24.html#__codelineno-6-3)  "baseSelector": "a.blog-post-card",
    [](index.html.1.24.html#__codelineno-6-4)  "baseFields": [
    [](index.html.1.24.html#__codelineno-6-5)    {"name": "post_url", "type": "attribute", "attribute": "href"}
    [](index.html.1.24.html#__codelineno-6-6)  ],
    [](index.html.1.24.html#__codelineno-6-7)  "fields": [
    [](index.html.1.24.html#__codelineno-6-8)    {"name": "title", "selector": "h2.post-title", "type": "text", "default": "No Title"},
    [](index.html.1.24.html#__codelineno-6-9)    {"name": "date", "selector": "time.post-date", "type": "text", "default": ""},
    [](index.html.1.24.html#__codelineno-6-10)    {"name": "summary", "selector": "p.post-summary", "type": "text", "default": ""},
    [](index.html.1.24.html#__codelineno-6-11)    {"name": "author", "selector": "span.post-author", "type": "text", "default": ""}
    [](index.html.1.24.html#__codelineno-6-12)  ]
    [](index.html.1.24.html#__codelineno-6-13)}
    

Then run with `JsonCssExtractionStrategy(schema)` to get an array of blog post objects, each with `"post_url"`, `"title"`, `"date"`, `"summary"`, `"author"`.

* * *

## 7\. Tips & Best Practices

1\. **Inspect the DOM** in Chrome DevTools or Firefox’s Inspector to find stable selectors.  
2\. **Start Simple** : Verify you can extract a single field. Then add complexity like nested objects or lists.  
3\. **Test** your schema on partial HTML or a test page before a big crawl.  
4\. **Combine with JS Execution** if the site loads content dynamically. You can pass `js_code` or `wait_for` in `CrawlerRunConfig`.  
5\. **Look at Logs** when `verbose=True`: if your selectors are off or your schema is malformed, it’ll often show warnings.  
6\. **Use baseFields** if you need attributes from the container element (e.g., `href`, `data-id`), especially for the “parent” item.  
7\. **Performance** : For large pages, make sure your selectors are as narrow as possible.

* * *

## 8\. Conclusion

With **JsonCssExtractionStrategy** (or **JsonXPathExtractionStrategy**), you can build powerful, **LLM-free** pipelines that:

  * Scrape any consistent site for structured data. 
  * Support nested objects, repeating lists, or advanced transformations. 
  * Scale to thousands of pages quickly and reliably.



**Next Steps** :

  * Combine your extracted JSON with advanced filtering or summarization in a second pass if needed. 
  * For dynamic pages, combine strategies with `js_code` or infinite scroll hooking to ensure all content is loaded.



**Remember** : For repeated, structured data, you don’t need to pay for or wait on an LLM. A well-crafted schema plus CSS or XPath gets you the data faster, cleaner, and cheaper—**the real power** of Crawl4AI.

**Last Updated** : 2025-01-01

* * *

That’s it for **Extracting JSON (No LLM)**! You’ve seen how schema-based approaches (either CSS or XPath) can handle everything from simple lists to deeply nested product catalogs—instantly, with minimal overhead. Enjoy building robust scrapers that produce consistent, structured JSON for your data pipelines!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
