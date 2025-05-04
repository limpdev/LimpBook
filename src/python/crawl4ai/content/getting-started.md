[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.html#)



  * [Home](index.md)
  * Setup & Installation
    * [Installation](index.html.1.1.md)
    * [Docker Deployment](index.html.1.2.md)
  * Quick Start
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

  * [Getting Started with Crawl4AI](index.html.1.html#getting-started-with-crawl4ai)
  * [1\. Introduction](index.html.1.html#1-introduction)
  * [2\. Your First Crawl](index.html.1.html#2-your-first-crawl)
  * [3\. Basic Configuration (Light Introduction)](index.html.1.html#3-basic-configuration-light-introduction)
  * [4\. Generating Markdown Output](index.html.1.html#4-generating-markdown-output)
  * [5\. Simple Data Extraction (CSS-based)](index.html.1.html#5-simple-data-extraction-css-based)
  * [6\. Simple Data Extraction (LLM-based)](index.html.1.html#6-simple-data-extraction-llm-based)
  * [7\. Dynamic Content Example](index.html.1.html#7-dynamic-content-example)
  * [8\. Next Steps](index.html.1.html#8-next-steps)



# Getting Started with Crawl4AI

Welcome to **Crawl4AI** , an open-source LLM-friendly Web Crawler & Scraper. In this tutorial, you’ll:

  1. Run your **first crawl** using minimal configuration. 
  2. Generate **Markdown** output (and learn how it’s influenced by content filters). 
  3. Experiment with a simple **CSS-based extraction** strategy. 
  4. See a glimpse of **LLM-based extraction** (including open-source and closed-source model options). 
  5. Crawl a **dynamic** page that loads content via JavaScript.



* * *

## 1\. Introduction

Crawl4AI provides:

  * An asynchronous crawler, **`AsyncWebCrawler`**. 
  * Configurable browser and run settings via **`BrowserConfig`** and **`CrawlerRunConfig`**. 
  * Automatic HTML-to-Markdown conversion via **`DefaultMarkdownGenerator`** (supports optional filters). 
  * Multiple extraction strategies (LLM-based or “traditional” CSS/XPath-based).



By the end of this guide, you’ll have performed a basic crawl, generated Markdown, tried out two extraction strategies, and crawled a dynamic page that uses “Load More” buttons or JavaScript updates.

* * *

## 2\. Your First Crawl

Here’s a minimal Python script that creates an **`AsyncWebCrawler`** , fetches a webpage, and prints the first 300 characters of its Markdown output:
    
    
    [](index.html.1.html#__codelineno-0-1)import asyncio
    [](index.html.1.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.html#__codelineno-0-3)
    [](index.html.1.html#__codelineno-0-4)async def main():
    [](index.html.1.html#__codelineno-0-5)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.html#__codelineno-0-6)        result = await crawler.arun("https://example.com")
    [](index.html.1.html#__codelineno-0-7)        print(result.markdown[:300])  # Print first 300 chars
    [](index.html.1.html#__codelineno-0-8)
    [](index.html.1.html#__codelineno-0-9)if __name__ == "__main__":
    [](index.html.1.html#__codelineno-0-10)    asyncio.run(main())
    

**What’s happening?** \- **`AsyncWebCrawler`** launches a headless browser (Chromium by default). \- It fetches `https://example.com`. \- Crawl4AI automatically converts the HTML into Markdown.

You now have a simple, working crawl!

* * *

## 3\. Basic Configuration (Light Introduction)

Crawl4AI’s crawler can be heavily customized using two main classes:

1\. **`BrowserConfig`** : Controls browser behavior (headless or full UI, user agent, JavaScript toggles, etc.).  
2\. **`CrawlerRunConfig`** : Controls how each crawl runs (caching, extraction, timeouts, hooking, etc.).

Below is an example with minimal usage:
    
    
    [](index.html.1.html#__codelineno-1-1)import asyncio
    [](index.html.1.html#__codelineno-1-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.html#__codelineno-1-3)
    [](index.html.1.html#__codelineno-1-4)async def main():
    [](index.html.1.html#__codelineno-1-5)    browser_conf = BrowserConfig(headless=True)  # or False to see the browser
    [](index.html.1.html#__codelineno-1-6)    run_conf = CrawlerRunConfig(
    [](index.html.1.html#__codelineno-1-7)        cache_mode=CacheMode.BYPASS
    [](index.html.1.html#__codelineno-1-8)    )
    [](index.html.1.html#__codelineno-1-9)
    [](index.html.1.html#__codelineno-1-10)    async with AsyncWebCrawler(config=browser_conf) as crawler:
    [](index.html.1.html#__codelineno-1-11)        result = await crawler.arun(
    [](index.html.1.html#__codelineno-1-12)            url="https://example.com",
    [](index.html.1.html#__codelineno-1-13)            config=run_conf
    [](index.html.1.html#__codelineno-1-14)        )
    [](index.html.1.html#__codelineno-1-15)        print(result.markdown)
    [](index.html.1.html#__codelineno-1-16)
    [](index.html.1.html#__codelineno-1-17)if __name__ == "__main__":
    [](index.html.1.html#__codelineno-1-18)    asyncio.run(main())
    

> IMPORTANT: By default cache mode is set to `CacheMode.ENABLED`. So to have fresh content, you need to set it to `CacheMode.BYPASS`

We’ll explore more advanced config in later tutorials (like enabling proxies, PDF output, multi-tab sessions, etc.). For now, just note how you pass these objects to manage crawling.

* * *

## 4\. Generating Markdown Output

By default, Crawl4AI automatically generates Markdown from each crawled page. However, the exact output depends on whether you specify a **markdown generator** or **content filter**.

  * **`result.markdown`** :  
The direct HTML-to-Markdown conversion. 
  * **`result.markdown.fit_markdown`** :  
The same content after applying any configured **content filter** (e.g., `PruningContentFilter`).



### Example: Using a Filter with `DefaultMarkdownGenerator`
    
    
    [](index.html.1.html#__codelineno-2-1)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.html#__codelineno-2-2)from crawl4ai.content_filter_strategy import PruningContentFilter
    [](index.html.1.html#__codelineno-2-3)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.html#__codelineno-2-4)
    [](index.html.1.html#__codelineno-2-5)md_generator = DefaultMarkdownGenerator(
    [](index.html.1.html#__codelineno-2-6)    content_filter=PruningContentFilter(threshold=0.4, threshold_type="fixed")
    [](index.html.1.html#__codelineno-2-7))
    [](index.html.1.html#__codelineno-2-8)
    [](index.html.1.html#__codelineno-2-9)config = CrawlerRunConfig(
    [](index.html.1.html#__codelineno-2-10)    cache_mode=CacheMode.BYPASS,
    [](index.html.1.html#__codelineno-2-11)    markdown_generator=md_generator
    [](index.html.1.html#__codelineno-2-12))
    [](index.html.1.html#__codelineno-2-13)
    [](index.html.1.html#__codelineno-2-14)async with AsyncWebCrawler() as crawler:
    [](index.html.1.html#__codelineno-2-15)    result = await crawler.arun("https://news.ycombinator.com", config=config)
    [](index.html.1.html#__codelineno-2-16)    print("Raw Markdown length:", len(result.markdown.raw_markdown))
    [](index.html.1.html#__codelineno-2-17)    print("Fit Markdown length:", len(result.markdown.fit_markdown))
    

**Note** : If you do **not** specify a content filter or markdown generator, you’ll typically see only the raw Markdown. `PruningContentFilter` may adds around `50ms` in processing time. We’ll dive deeper into these strategies in a dedicated **Markdown Generation** tutorial.

* * *

## 5\. Simple Data Extraction (CSS-based)

Crawl4AI can also extract structured data (JSON) using CSS or XPath selectors. Below is a minimal CSS-based example:
    
    
    [](index.html.1.html#__codelineno-3-1)import asyncio
    [](index.html.1.html#__codelineno-3-2)import json
    [](index.html.1.html#__codelineno-3-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.html#__codelineno-3-4)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.html#__codelineno-3-5)
    [](index.html.1.html#__codelineno-3-6)async def main():
    [](index.html.1.html#__codelineno-3-7)    schema = {
    [](index.html.1.html#__codelineno-3-8)        "name": "Example Items",
    [](index.html.1.html#__codelineno-3-9)        "baseSelector": "div.item",
    [](index.html.1.html#__codelineno-3-10)        "fields": [
    [](index.html.1.html#__codelineno-3-11)            {"name": "title", "selector": "h2", "type": "text"},
    [](index.html.1.html#__codelineno-3-12)            {"name": "link", "selector": "a", "type": "attribute", "attribute": "href"}
    [](index.html.1.html#__codelineno-3-13)        ]
    [](index.html.1.html#__codelineno-3-14)    }
    [](index.html.1.html#__codelineno-3-15)
    [](index.html.1.html#__codelineno-3-16)    raw_html = "<div class='item'><h2>Item 1</h2><a href='https://example.com/item1'>Link 1</a></div>"
    [](index.html.1.html#__codelineno-3-17)
    [](index.html.1.html#__codelineno-3-18)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.html#__codelineno-3-19)        result = await crawler.arun(
    [](index.html.1.html#__codelineno-3-20)            url="raw://" + raw_html,
    [](index.html.1.html#__codelineno-3-21)            config=CrawlerRunConfig(
    [](index.html.1.html#__codelineno-3-22)                cache_mode=CacheMode.BYPASS,
    [](index.html.1.html#__codelineno-3-23)                extraction_strategy=JsonCssExtractionStrategy(schema)
    [](index.html.1.html#__codelineno-3-24)            )
    [](index.html.1.html#__codelineno-3-25)        )
    [](index.html.1.html#__codelineno-3-26)        # The JSON output is stored in 'extracted_content'
    [](index.html.1.html#__codelineno-3-27)        data = json.loads(result.extracted_content)
    [](index.html.1.html#__codelineno-3-28)        print(data)
    [](index.html.1.html#__codelineno-3-29)
    [](index.html.1.html#__codelineno-3-30)if __name__ == "__main__":
    [](index.html.1.html#__codelineno-3-31)    asyncio.run(main())
    

**Why is this helpful?** \- Great for repetitive page structures (e.g., item listings, articles). \- No AI usage or costs. \- The crawler returns a JSON string you can parse or store.

> Tips: You can pass raw HTML to the crawler instead of a URL. To do so, prefix the HTML with `raw://`.

* * *

## 6\. Simple Data Extraction (LLM-based)

For more complex or irregular pages, a language model can parse text intelligently into a structure you define. Crawl4AI supports **open-source** or **closed-source** providers:

  * **Open-Source Models** (e.g., `ollama/llama3.3`, `no_token`) 
  * **OpenAI Models** (e.g., `openai/gpt-4`, requires `api_token`) 
  * Or any provider supported by the underlying library



Below is an example using **open-source** style (no token) and closed-source:
    
    
    [](index.html.1.html#__codelineno-4-1)import os
    [](index.html.1.html#__codelineno-4-2)import json
    [](index.html.1.html#__codelineno-4-3)import asyncio
    [](index.html.1.html#__codelineno-4-4)from pydantic import BaseModel, Field
    [](index.html.1.html#__codelineno-4-5)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.html#__codelineno-4-6)from crawl4ai.extraction_strategy import LLMExtractionStrategy
    [](index.html.1.html#__codelineno-4-7)
    [](index.html.1.html#__codelineno-4-8)class OpenAIModelFee(BaseModel):
    [](index.html.1.html#__codelineno-4-9)    model_name: str = Field(..., description="Name of the OpenAI model.")
    [](index.html.1.html#__codelineno-4-10)    input_fee: str = Field(..., description="Fee for input token for the OpenAI model.")
    [](index.html.1.html#__codelineno-4-11)    output_fee: str = Field(
    [](index.html.1.html#__codelineno-4-12)        ..., description="Fee for output token for the OpenAI model."
    [](index.html.1.html#__codelineno-4-13)    )
    [](index.html.1.html#__codelineno-4-14)
    [](index.html.1.html#__codelineno-4-15)async def extract_structured_data_using_llm(
    [](index.html.1.html#__codelineno-4-16)    provider: str, api_token: str = None, extra_headers: Dict[str, str] = None
    [](index.html.1.html#__codelineno-4-17)):
    [](index.html.1.html#__codelineno-4-18)    print(f"\n--- Extracting Structured Data with {provider} ---")
    [](index.html.1.html#__codelineno-4-19)
    [](index.html.1.html#__codelineno-4-20)    if api_token is None and provider != "ollama":
    [](index.html.1.html#__codelineno-4-21)        print(f"API token is required for {provider}. Skipping this example.")
    [](index.html.1.html#__codelineno-4-22)        return
    [](index.html.1.html#__codelineno-4-23)
    [](index.html.1.html#__codelineno-4-24)    browser_config = BrowserConfig(headless=True)
    [](index.html.1.html#__codelineno-4-25)
    [](index.html.1.html#__codelineno-4-26)    extra_args = {"temperature": 0, "top_p": 0.9, "max_tokens": 2000}
    [](index.html.1.html#__codelineno-4-27)    if extra_headers:
    [](index.html.1.html#__codelineno-4-28)        extra_args["extra_headers"] = extra_headers
    [](index.html.1.html#__codelineno-4-29)
    [](index.html.1.html#__codelineno-4-30)    crawler_config = CrawlerRunConfig(
    [](index.html.1.html#__codelineno-4-31)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.html#__codelineno-4-32)        word_count_threshold=1,
    [](index.html.1.html#__codelineno-4-33)        page_timeout=80000,
    [](index.html.1.html#__codelineno-4-34)        extraction_strategy=LLMExtractionStrategy(
    [](index.html.1.html#__codelineno-4-35)            provider=provider,
    [](index.html.1.html#__codelineno-4-36)            api_token=api_token,
    [](index.html.1.html#__codelineno-4-37)            schema=OpenAIModelFee.model_json_schema(),
    [](index.html.1.html#__codelineno-4-38)            extraction_type="schema",
    [](index.html.1.html#__codelineno-4-39)            instruction="""From the crawled content, extract all mentioned model names along with their fees for input and output tokens. 
    [](index.html.1.html#__codelineno-4-40)            Do not miss any models in the entire content.""",
    [](index.html.1.html#__codelineno-4-41)            extra_args=extra_args,
    [](index.html.1.html#__codelineno-4-42)        ),
    [](index.html.1.html#__codelineno-4-43)    )
    [](index.html.1.html#__codelineno-4-44)
    [](index.html.1.html#__codelineno-4-45)    async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.html#__codelineno-4-46)        result = await crawler.arun(
    [](index.html.1.html#__codelineno-4-47)            url="https://openai.com/api/pricing/", config=crawler_config
    [](index.html.1.html#__codelineno-4-48)        )
    [](index.html.1.html#__codelineno-4-49)        print(result.extracted_content)
    [](index.html.1.html#__codelineno-4-50)
    [](index.html.1.html#__codelineno-4-51)if __name__ == "__main__":
    [](index.html.1.html#__codelineno-4-52)    # Use ollama with llama3.3
    [](index.html.1.html#__codelineno-4-53)    # asyncio.run(
    [](index.html.1.html#__codelineno-4-54)    #     extract_structured_data_using_llm(
    [](index.html.1.html#__codelineno-4-55)    #         provider="ollama/llama3.3", api_token="no-token"
    [](index.html.1.html#__codelineno-4-56)    #     )
    [](index.html.1.html#__codelineno-4-57)    # )
    [](index.html.1.html#__codelineno-4-58)
    [](index.html.1.html#__codelineno-4-59)    asyncio.run(
    [](index.html.1.html#__codelineno-4-60)        extract_structured_data_using_llm(
    [](index.html.1.html#__codelineno-4-61)            provider="openai/gpt-4o", api_token=os.getenv("OPENAI_API_KEY")
    [](index.html.1.html#__codelineno-4-62)        )
    [](index.html.1.html#__codelineno-4-63)    )
    

**What’s happening?** \- We define a Pydantic schema (`PricingInfo`) describing the fields we want. \- The LLM extraction strategy uses that schema and your instructions to transform raw text into structured JSON. \- Depending on the **provider** and **api_token** , you can use local models or a remote API.

* * *

## 7\. Dynamic Content Example

Some sites require multiple “page clicks” or dynamic JavaScript updates. Below is an example showing how to **click** a “Next Page” button and wait for new commits to load on GitHub, using **`BrowserConfig`** and **`CrawlerRunConfig`** :
    
    
    [](index.html.1.html#__codelineno-5-1)import asyncio
    [](index.html.1.html#__codelineno-5-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.html#__codelineno-5-3)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.html#__codelineno-5-4)
    [](index.html.1.html#__codelineno-5-5)async def extract_structured_data_using_css_extractor():
    [](index.html.1.html#__codelineno-5-6)    print("\n--- Using JsonCssExtractionStrategy for Fast Structured Output ---")
    [](index.html.1.html#__codelineno-5-7)    schema = {
    [](index.html.1.html#__codelineno-5-8)        "name": "KidoCode Courses",
    [](index.html.1.html#__codelineno-5-9)        "baseSelector": "section.charge-methodology .w-tab-content > div",
    [](index.html.1.html#__codelineno-5-10)        "fields": [
    [](index.html.1.html#__codelineno-5-11)            {
    [](index.html.1.html#__codelineno-5-12)                "name": "section_title",
    [](index.html.1.html#__codelineno-5-13)                "selector": "h3.heading-50",
    [](index.html.1.html#__codelineno-5-14)                "type": "text",
    [](index.html.1.html#__codelineno-5-15)            },
    [](index.html.1.html#__codelineno-5-16)            {
    [](index.html.1.html#__codelineno-5-17)                "name": "section_description",
    [](index.html.1.html#__codelineno-5-18)                "selector": ".charge-content",
    [](index.html.1.html#__codelineno-5-19)                "type": "text",
    [](index.html.1.html#__codelineno-5-20)            },
    [](index.html.1.html#__codelineno-5-21)            {
    [](index.html.1.html#__codelineno-5-22)                "name": "course_name",
    [](index.html.1.html#__codelineno-5-23)                "selector": ".text-block-93",
    [](index.html.1.html#__codelineno-5-24)                "type": "text",
    [](index.html.1.html#__codelineno-5-25)            },
    [](index.html.1.html#__codelineno-5-26)            {
    [](index.html.1.html#__codelineno-5-27)                "name": "course_description",
    [](index.html.1.html#__codelineno-5-28)                "selector": ".course-content-text",
    [](index.html.1.html#__codelineno-5-29)                "type": "text",
    [](index.html.1.html#__codelineno-5-30)            },
    [](index.html.1.html#__codelineno-5-31)            {
    [](index.html.1.html#__codelineno-5-32)                "name": "course_icon",
    [](index.html.1.html#__codelineno-5-33)                "selector": ".image-92",
    [](index.html.1.html#__codelineno-5-34)                "type": "attribute",
    [](index.html.1.html#__codelineno-5-35)                "attribute": "src",
    [](index.html.1.html#__codelineno-5-36)            },
    [](index.html.1.html#__codelineno-5-37)        ],
    [](index.html.1.html#__codelineno-5-38)    }
    [](index.html.1.html#__codelineno-5-39)
    [](index.html.1.html#__codelineno-5-40)    browser_config = BrowserConfig(headless=True, java_script_enabled=True)
    [](index.html.1.html#__codelineno-5-41)
    [](index.html.1.html#__codelineno-5-42)    js_click_tabs = """
    [](index.html.1.html#__codelineno-5-43)    (async () => {
    [](index.html.1.html#__codelineno-5-44)        const tabs = document.querySelectorAll("section.charge-methodology .tabs-menu-3 > div");
    [](index.html.1.html#__codelineno-5-45)        for(let tab of tabs) {
    [](index.html.1.html#__codelineno-5-46)            tab.scrollIntoView();
    [](index.html.1.html#__codelineno-5-47)            tab.click();
    [](index.html.1.html#__codelineno-5-48)            await new Promise(r => setTimeout(r, 500));
    [](index.html.1.html#__codelineno-5-49)        }
    [](index.html.1.html#__codelineno-5-50)    })();
    [](index.html.1.html#__codelineno-5-51)    """
    [](index.html.1.html#__codelineno-5-52)
    [](index.html.1.html#__codelineno-5-53)    crawler_config = CrawlerRunConfig(
    [](index.html.1.html#__codelineno-5-54)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.html#__codelineno-5-55)        extraction_strategy=JsonCssExtractionStrategy(schema),
    [](index.html.1.html#__codelineno-5-56)        js_code=[js_click_tabs],
    [](index.html.1.html#__codelineno-5-57)    )
    [](index.html.1.html#__codelineno-5-58)
    [](index.html.1.html#__codelineno-5-59)    async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.html#__codelineno-5-60)        result = await crawler.arun(
    [](index.html.1.html#__codelineno-5-61)            url="https://www.kidocode.com/degrees/technology", config=crawler_config
    [](index.html.1.html#__codelineno-5-62)        )
    [](index.html.1.html#__codelineno-5-63)
    [](index.html.1.html#__codelineno-5-64)        companies = json.loads(result.extracted_content)
    [](index.html.1.html#__codelineno-5-65)        print(f"Successfully extracted {len(companies)} companies")
    [](index.html.1.html#__codelineno-5-66)        print(json.dumps(companies[0], indent=2))
    [](index.html.1.html#__codelineno-5-67)
    [](index.html.1.html#__codelineno-5-68)async def main():
    [](index.html.1.html#__codelineno-5-69)    await extract_structured_data_using_css_extractor()
    [](index.html.1.html#__codelineno-5-70)
    [](index.html.1.html#__codelineno-5-71)if __name__ == "__main__":
    [](index.html.1.html#__codelineno-5-72)    asyncio.run(main())
    

**Key Points** :

  * **`BrowserConfig(headless=False)`** : We want to watch it click “Next Page.” 
  * **`CrawlerRunConfig(...)`** : We specify the extraction strategy, pass `session_id` to reuse the same page. 
  * **`js_code`** and **`wait_for`** are used for subsequent pages (`page > 0`) to click the “Next” button and wait for new commits to load. 
  * **`js_only=True`** indicates we’re not re-navigating but continuing the existing session. 
  * Finally, we call `kill_session()` to clean up the page and browser session.



* * *

## 8\. Next Steps

Congratulations! You have:

  1. Performed a basic crawl and printed Markdown. 
  2. Used **content filters** with a markdown generator. 
  3. Extracted JSON via **CSS** or **LLM** strategies. 
  4. Handled **dynamic** pages with JavaScript triggers.



If you’re ready for more, check out:

  * **Installation** : A deeper dive into advanced installs, Docker usage (experimental), or optional dependencies. 
  * **Hooks & Auth**: Learn how to run custom JavaScript or handle logins with cookies, local storage, etc. 
  * **Deployment** : Explore ephemeral testing in Docker or plan for the upcoming stable Docker release. 
  * **Browser Management** : Delve into user simulation, stealth modes, and concurrency best practices. 



Crawl4AI is a powerful, flexible tool. Enjoy building out your scrapers, data pipelines, or AI-driven extraction flows. Happy crawling!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
