[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.8.html#)



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
    * Fit Markdown
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

  * [Fit Markdown with Pruning & BM25](index.html.1.8.html#fit-markdown-with-pruning-bm25)
  * [1\. How “Fit Markdown” Works](index.html.1.8.html#1-how-fit-markdown-works)
  * [2\. PruningContentFilter](index.html.1.8.html#2-pruningcontentfilter)
  * [3\. BM25ContentFilter](index.html.1.8.html#3-bm25contentfilter)
  * [4\. Accessing the “Fit” Output](index.html.1.8.html#4-accessing-the-fit-output)
  * [5\. Code Patterns Recap](index.html.1.8.html#5-code-patterns-recap)
  * [6\. Combining with “word_count_threshold” & Exclusions](index.html.1.8.html#6-combining-with-word_count_threshold-exclusions)
  * [7\. Custom Filters](index.html.1.8.html#7-custom-filters)
  * [8\. Final Thoughts](index.html.1.8.html#8-final-thoughts)



# Fit Markdown with Pruning & BM25

**Fit Markdown** is a specialized **filtered** version of your page’s markdown, focusing on the most relevant content. By default, Crawl4AI converts the entire HTML into a broad **raw_markdown**. With fit markdown, we apply a **content filter** algorithm (e.g., **Pruning** or **BM25**) to remove or rank low-value sections—such as repetitive sidebars, shallow text blocks, or irrelevancies—leaving a concise textual “core.”

* * *

## 1\. How “Fit Markdown” Works

### 1.1 The `content_filter`

In **`CrawlerRunConfig`** , you can specify a **`content_filter`** to shape how content is pruned or ranked before final markdown generation. A filter’s logic is applied **before** or **during** the HTML→Markdown process, producing:

  * **`result.markdown_v2.raw_markdown`** (unfiltered)
  * **`result.markdown_v2.fit_markdown`** (filtered or “fit” version)
  * **`result.markdown_v2.fit_html`** (the corresponding HTML snippet that produced `fit_markdown`)



> **Note** : We’re currently storing the result in `markdown_v2`, but eventually we’ll unify it as `result.markdown`.

### 1.2 Common Filters

1\. **PruningContentFilter** – Scores each node by text density, link density, and tag importance, discarding those below a threshold.  
2\. **BM25ContentFilter** – Focuses on textual relevance using BM25 ranking, especially useful if you have a specific user query (e.g., “machine learning” or “food nutrition”).

* * *

## 2\. PruningContentFilter

**Pruning** discards less relevant nodes based on **text density, link density, and tag importance**. It’s a heuristic-based approach—if certain sections appear too “thin” or too “spammy,” they’re pruned.

### 2.1 Usage Example
    
    
    [](index.html.1.8.html#__codelineno-0-1)import asyncio
    [](index.html.1.8.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.8.html#__codelineno-0-3)from crawl4ai.content_filter_strategy import PruningContentFilter
    [](index.html.1.8.html#__codelineno-0-4)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.8.html#__codelineno-0-5)
    [](index.html.1.8.html#__codelineno-0-6)async def main():
    [](index.html.1.8.html#__codelineno-0-7)    # Step 1: Create a pruning filter
    [](index.html.1.8.html#__codelineno-0-8)    prune_filter = PruningContentFilter(
    [](index.html.1.8.html#__codelineno-0-9)        # Lower → more content retained, higher → more content pruned
    [](index.html.1.8.html#__codelineno-0-10)        threshold=0.45,           
    [](index.html.1.8.html#__codelineno-0-11)        # "fixed" or "dynamic"
    [](index.html.1.8.html#__codelineno-0-12)        threshold_type="dynamic",  
    [](index.html.1.8.html#__codelineno-0-13)        # Ignore nodes with <5 words
    [](index.html.1.8.html#__codelineno-0-14)        min_word_threshold=5      
    [](index.html.1.8.html#__codelineno-0-15)    )
    [](index.html.1.8.html#__codelineno-0-16)
    [](index.html.1.8.html#__codelineno-0-17)    # Step 2: Insert it into a Markdown Generator
    [](index.html.1.8.html#__codelineno-0-18)    md_generator = DefaultMarkdownGenerator(content_filter=prune_filter)
    [](index.html.1.8.html#__codelineno-0-19)
    [](index.html.1.8.html#__codelineno-0-20)    # Step 3: Pass it to CrawlerRunConfig
    [](index.html.1.8.html#__codelineno-0-21)    config = CrawlerRunConfig(
    [](index.html.1.8.html#__codelineno-0-22)        markdown_generator=md_generator
    [](index.html.1.8.html#__codelineno-0-23)    )
    [](index.html.1.8.html#__codelineno-0-24)
    [](index.html.1.8.html#__codelineno-0-25)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.8.html#__codelineno-0-26)        result = await crawler.arun(
    [](index.html.1.8.html#__codelineno-0-27)            url="https://news.ycombinator.com", 
    [](index.html.1.8.html#__codelineno-0-28)            config=config
    [](index.html.1.8.html#__codelineno-0-29)        )
    [](index.html.1.8.html#__codelineno-0-30)
    [](index.html.1.8.html#__codelineno-0-31)        if result.success:
    [](index.html.1.8.html#__codelineno-0-32)            # 'fit_markdown' is your pruned content, focusing on "denser" text
    [](index.html.1.8.html#__codelineno-0-33)            print("Raw Markdown length:", len(result.markdown_v2.raw_markdown))
    [](index.html.1.8.html#__codelineno-0-34)            print("Fit Markdown length:", len(result.markdown_v2.fit_markdown))
    [](index.html.1.8.html#__codelineno-0-35)        else:
    [](index.html.1.8.html#__codelineno-0-36)            print("Error:", result.error_message)
    [](index.html.1.8.html#__codelineno-0-37)
    [](index.html.1.8.html#__codelineno-0-38)if __name__ == "__main__":
    [](index.html.1.8.html#__codelineno-0-39)    asyncio.run(main())
    

### 2.2 Key Parameters

  * **`min_word_threshold`** (int): If a block has fewer words than this, it’s pruned. 
  * **`threshold_type`** (str):
  * `"fixed"` → each node must exceed `threshold` (0–1). 
  * `"dynamic"` → node scoring adjusts according to tag type, text/link density, etc. 
  * **`threshold`** (float, default ~0.48): The base or “anchor” cutoff. 



**Algorithmic Factors** :

  * **Text density** – Encourages blocks that have a higher ratio of text to overall content. 
  * **Link density** – Penalizes sections that are mostly links. 
  * **Tag importance** – e.g., an `<article>` or `<p>` might be more important than a `<div>`. 
  * **Structural context** – If a node is deeply nested or in a suspected sidebar, it might be deprioritized.



* * *

## 3\. BM25ContentFilter

**BM25** is a classical text ranking algorithm often used in search engines. If you have a **user query** or rely on page metadata to derive a query, BM25 can identify which text chunks best match that query.

### 3.1 Usage Example
    
    
    [](index.html.1.8.html#__codelineno-1-1)import asyncio
    [](index.html.1.8.html#__codelineno-1-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.8.html#__codelineno-1-3)from crawl4ai.content_filter_strategy import BM25ContentFilter
    [](index.html.1.8.html#__codelineno-1-4)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.8.html#__codelineno-1-5)
    [](index.html.1.8.html#__codelineno-1-6)async def main():
    [](index.html.1.8.html#__codelineno-1-7)    # 1) A BM25 filter with a user query
    [](index.html.1.8.html#__codelineno-1-8)    bm25_filter = BM25ContentFilter(
    [](index.html.1.8.html#__codelineno-1-9)        user_query="startup fundraising tips",
    [](index.html.1.8.html#__codelineno-1-10)        # Adjust for stricter or looser results
    [](index.html.1.8.html#__codelineno-1-11)        bm25_threshold=1.2  
    [](index.html.1.8.html#__codelineno-1-12)    )
    [](index.html.1.8.html#__codelineno-1-13)
    [](index.html.1.8.html#__codelineno-1-14)    # 2) Insert into a Markdown Generator
    [](index.html.1.8.html#__codelineno-1-15)    md_generator = DefaultMarkdownGenerator(content_filter=bm25_filter)
    [](index.html.1.8.html#__codelineno-1-16)
    [](index.html.1.8.html#__codelineno-1-17)    # 3) Pass to crawler config
    [](index.html.1.8.html#__codelineno-1-18)    config = CrawlerRunConfig(
    [](index.html.1.8.html#__codelineno-1-19)        markdown_generator=md_generator
    [](index.html.1.8.html#__codelineno-1-20)    )
    [](index.html.1.8.html#__codelineno-1-21)
    [](index.html.1.8.html#__codelineno-1-22)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.8.html#__codelineno-1-23)        result = await crawler.arun(
    [](index.html.1.8.html#__codelineno-1-24)            url="https://news.ycombinator.com", 
    [](index.html.1.8.html#__codelineno-1-25)            config=config
    [](index.html.1.8.html#__codelineno-1-26)        )
    [](index.html.1.8.html#__codelineno-1-27)        if result.success:
    [](index.html.1.8.html#__codelineno-1-28)            print("Fit Markdown (BM25 query-based):")
    [](index.html.1.8.html#__codelineno-1-29)            print(result.markdown_v2.fit_markdown)
    [](index.html.1.8.html#__codelineno-1-30)        else:
    [](index.html.1.8.html#__codelineno-1-31)            print("Error:", result.error_message)
    [](index.html.1.8.html#__codelineno-1-32)
    [](index.html.1.8.html#__codelineno-1-33)if __name__ == "__main__":
    [](index.html.1.8.html#__codelineno-1-34)    asyncio.run(main())
    

### 3.2 Parameters

  * **`user_query`** (str, optional): E.g. `"machine learning"`. If blank, the filter tries to glean a query from page metadata. 
  * **`bm25_threshold`** (float, default 1.0): 
  * Higher → fewer chunks but more relevant. 
  * Lower → more inclusive. 



> In more advanced scenarios, you might see parameters like `use_stemming`, `case_sensitive`, or `priority_tags` to refine how text is tokenized or weighted.

* * *

## 4\. Accessing the “Fit” Output

After the crawl, your “fit” content is found in **`result.markdown_v2.fit_markdown`**. In future versions, it will be **`result.markdown.fit_markdown`**. Meanwhile:
    
    
    [](index.html.1.8.html#__codelineno-2-1)fit_md = result.markdown_v2.fit_markdown
    [](index.html.1.8.html#__codelineno-2-2)fit_html = result.markdown_v2.fit_html
    

If the content filter is **BM25** , you might see additional logic or references in `fit_markdown` that highlight relevant segments. If it’s **Pruning** , the text is typically well-cleaned but not necessarily matched to a query.

* * *

## 5\. Code Patterns Recap

### 5.1 Pruning
    
    
    [](index.html.1.8.html#__codelineno-3-1)prune_filter = PruningContentFilter(
    [](index.html.1.8.html#__codelineno-3-2)    threshold=0.5,
    [](index.html.1.8.html#__codelineno-3-3)    threshold_type="fixed",
    [](index.html.1.8.html#__codelineno-3-4)    min_word_threshold=10
    [](index.html.1.8.html#__codelineno-3-5))
    [](index.html.1.8.html#__codelineno-3-6)md_generator = DefaultMarkdownGenerator(content_filter=prune_filter)
    [](index.html.1.8.html#__codelineno-3-7)config = CrawlerRunConfig(markdown_generator=md_generator)
    [](index.html.1.8.html#__codelineno-3-8)# => result.markdown_v2.fit_markdown
    

### 5.2 BM25
    
    
    [](index.html.1.8.html#__codelineno-4-1)bm25_filter = BM25ContentFilter(
    [](index.html.1.8.html#__codelineno-4-2)    user_query="health benefits fruit",
    [](index.html.1.8.html#__codelineno-4-3)    bm25_threshold=1.2
    [](index.html.1.8.html#__codelineno-4-4))
    [](index.html.1.8.html#__codelineno-4-5)md_generator = DefaultMarkdownGenerator(content_filter=bm25_filter)
    [](index.html.1.8.html#__codelineno-4-6)config = CrawlerRunConfig(markdown_generator=md_generator)
    [](index.html.1.8.html#__codelineno-4-7)# => result.markdown_v2.fit_markdown
    

* * *

## 6\. Combining with “word_count_threshold” & Exclusions

Remember you can also specify:
    
    
    [](index.html.1.8.html#__codelineno-5-1)config = CrawlerRunConfig(
    [](index.html.1.8.html#__codelineno-5-2)    word_count_threshold=10,
    [](index.html.1.8.html#__codelineno-5-3)    excluded_tags=["nav", "footer", "header"],
    [](index.html.1.8.html#__codelineno-5-4)    exclude_external_links=True,
    [](index.html.1.8.html#__codelineno-5-5)    markdown_generator=DefaultMarkdownGenerator(
    [](index.html.1.8.html#__codelineno-5-6)        content_filter=PruningContentFilter(threshold=0.5)
    [](index.html.1.8.html#__codelineno-5-7)    )
    [](index.html.1.8.html#__codelineno-5-8))
    

Thus, **multi-level** filtering occurs:

  1. The crawler’s `excluded_tags` are removed from the HTML first. 
  2. The content filter (Pruning, BM25, or custom) prunes or ranks the remaining text blocks. 
  3. The final “fit” content is generated in `result.markdown_v2.fit_markdown`.



* * *

## 7\. Custom Filters

If you need a different approach (like a specialized ML model or site-specific heuristics), you can create a new class inheriting from `RelevantContentFilter` and implement `filter_content(html)`. Then inject it into your **markdown generator** :
    
    
    [](index.html.1.8.html#__codelineno-6-1)from crawl4ai.content_filter_strategy import RelevantContentFilter
    [](index.html.1.8.html#__codelineno-6-2)
    [](index.html.1.8.html#__codelineno-6-3)class MyCustomFilter(RelevantContentFilter):
    [](index.html.1.8.html#__codelineno-6-4)    def filter_content(self, html, min_word_threshold=None):
    [](index.html.1.8.html#__codelineno-6-5)        # parse HTML, implement custom logic
    [](index.html.1.8.html#__codelineno-6-6)        return [block for block in ... if ... some condition...]
    

**Steps** :

  1. Subclass `RelevantContentFilter`. 
  2. Implement `filter_content(...)`. 
  3. Use it in your `DefaultMarkdownGenerator(content_filter=MyCustomFilter(...))`.



* * *

## 8\. Final Thoughts

**Fit Markdown** is a crucial feature for:

  * **Summaries** : Quickly get the important text from a cluttered page. 
  * **Search** : Combine with **BM25** to produce content relevant to a query. 
  * **AI Pipelines** : Filter out boilerplate so LLM-based extraction or summarization runs on denser text.



**Key Points** : \- **PruningContentFilter** : Great if you just want the “meatiest” text without a user query.  
\- **BM25ContentFilter** : Perfect for query-based extraction or searching.  
\- Combine with **`excluded_tags`, `exclude_external_links`, `word_count_threshold`** to refine your final “fit” text.  
\- Fit markdown ends up in **`result.markdown_v2.fit_markdown`** ; eventually **`result.markdown.fit_markdown`** in future versions.

With these tools, you can **zero in** on the text that truly matters, ignoring spammy or boilerplate content, and produce a concise, relevant “fit markdown” for your AI or data pipelines. Happy pruning and searching!

  * Last Updated: 2025-01-01



* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
