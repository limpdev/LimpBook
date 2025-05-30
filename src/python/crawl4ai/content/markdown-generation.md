[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.7.html#)



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
    * Markdown Generation
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

  * [Markdown Generation Basics](index.html.1.7.html#markdown-generation-basics)
  * [1\. Quick Example](index.html.1.7.html#1-quick-example)
  * [2\. How Markdown Generation Works](index.html.1.7.html#2-how-markdown-generation-works)
  * [3\. Configuring the Default Markdown Generator](index.html.1.7.html#3-configuring-the-default-markdown-generator)
  * [4\. Content Filters](index.html.1.7.html#4-content-filters)
  * [5\. Using Fit Markdown](index.html.1.7.html#5-using-fit-markdown)
  * [6\. The MarkdownGenerationResult Object](index.html.1.7.html#6-the-markdowngenerationresult-object)
  * [7\. Combining Filters (BM25 + Pruning) in Two Passes](index.html.1.7.html#7-combining-filters-bm25-pruning-in-two-passes)
  * [8\. Common Pitfalls & Tips](index.html.1.7.html#8-common-pitfalls-tips)
  * [9\. Summary & Next Steps](index.html.1.7.html#9-summary-next-steps)



# Markdown Generation Basics

One of Crawl4AI’s core features is generating **clean, structured markdown** from web pages. Originally built to solve the problem of extracting only the “actual” content and discarding boilerplate or noise, Crawl4AI’s markdown system remains one of its biggest draws for AI workflows.

In this tutorial, you’ll learn:

  1. How to configure the **Default Markdown Generator**
  2. How **content filters** (BM25 or Pruning) help you refine markdown and discard junk 
  3. The difference between raw markdown (`result.markdown`) and filtered markdown (`fit_markdown`) 



> **Prerequisites**  
>  \- You’ve completed or read [AsyncWebCrawler Basics](index.html.1.4.md) to understand how to run a simple crawl.  
>  \- You know how to configure `CrawlerRunConfig`.

* * *

## 1\. Quick Example

Here’s a minimal code snippet that uses the **DefaultMarkdownGenerator** with no additional filtering:
    
    
    [](index.html.1.7.html#__codelineno-0-1)import asyncio
    [](index.html.1.7.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.7.html#__codelineno-0-3)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.7.html#__codelineno-0-4)
    [](index.html.1.7.html#__codelineno-0-5)async def main():
    [](index.html.1.7.html#__codelineno-0-6)    config = CrawlerRunConfig(
    [](index.html.1.7.html#__codelineno-0-7)        markdown_generator=DefaultMarkdownGenerator()
    [](index.html.1.7.html#__codelineno-0-8)    )
    [](index.html.1.7.html#__codelineno-0-9)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.7.html#__codelineno-0-10)        result = await crawler.arun("https://example.com", config=config)
    [](index.html.1.7.html#__codelineno-0-11)
    [](index.html.1.7.html#__codelineno-0-12)        if result.success:
    [](index.html.1.7.html#__codelineno-0-13)            print("Raw Markdown Output:\n")
    [](index.html.1.7.html#__codelineno-0-14)            print(result.markdown)  # The unfiltered markdown from the page
    [](index.html.1.7.html#__codelineno-0-15)        else:
    [](index.html.1.7.html#__codelineno-0-16)            print("Crawl failed:", result.error_message)
    [](index.html.1.7.html#__codelineno-0-17)
    [](index.html.1.7.html#__codelineno-0-18)if __name__ == "__main__":
    [](index.html.1.7.html#__codelineno-0-19)    asyncio.run(main())
    

**What’s happening?**  
\- `CrawlerRunConfig( markdown_generator = DefaultMarkdownGenerator() )` instructs Crawl4AI to convert the final HTML into markdown at the end of each crawl.  
\- The resulting markdown is accessible via `result.markdown`.

* * *

## 2\. How Markdown Generation Works

### 2.1 HTML-to-Text Conversion (Forked & Modified)

Under the hood, **DefaultMarkdownGenerator** uses a specialized HTML-to-text approach that:

  * Preserves headings, code blocks, bullet points, etc. 
  * Removes extraneous tags (scripts, styles) that don’t add meaningful content. 
  * Can optionally generate references for links or skip them altogether.



A set of **options** (passed as a dict) allows you to customize precisely how HTML converts to markdown. These map to standard html2text-like configuration plus your own enhancements (e.g., ignoring internal links, preserving certain tags verbatim, or adjusting line widths).

### 2.2 Link Citations & References

By default, the generator can convert `<a href="...">` elements into `[text][1]` citations, then place the actual links at the bottom of the document. This is handy for research workflows that demand references in a structured manner.

### 2.3 Optional Content Filters

Before or after the HTML-to-Markdown step, you can apply a **content filter** (like BM25 or Pruning) to reduce noise and produce a “fit_markdown”—a heavily pruned version focusing on the page’s main text. We’ll cover these filters shortly.

* * *

## 3\. Configuring the Default Markdown Generator

You can tweak the output by passing an `options` dict to `DefaultMarkdownGenerator`. For example:
    
    
    [](index.html.1.7.html#__codelineno-1-1)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.7.html#__codelineno-1-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.7.html#__codelineno-1-3)
    [](index.html.1.7.html#__codelineno-1-4)async def main():
    [](index.html.1.7.html#__codelineno-1-5)    # Example: ignore all links, don't escape HTML, and wrap text at 80 characters
    [](index.html.1.7.html#__codelineno-1-6)    md_generator = DefaultMarkdownGenerator(
    [](index.html.1.7.html#__codelineno-1-7)        options={
    [](index.html.1.7.html#__codelineno-1-8)            "ignore_links": True,
    [](index.html.1.7.html#__codelineno-1-9)            "escape_html": False,
    [](index.html.1.7.html#__codelineno-1-10)            "body_width": 80
    [](index.html.1.7.html#__codelineno-1-11)        }
    [](index.html.1.7.html#__codelineno-1-12)    )
    [](index.html.1.7.html#__codelineno-1-13)
    [](index.html.1.7.html#__codelineno-1-14)    config = CrawlerRunConfig(
    [](index.html.1.7.html#__codelineno-1-15)        markdown_generator=md_generator
    [](index.html.1.7.html#__codelineno-1-16)    )
    [](index.html.1.7.html#__codelineno-1-17)
    [](index.html.1.7.html#__codelineno-1-18)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.7.html#__codelineno-1-19)        result = await crawler.arun("https://example.com/docs", config=config)
    [](index.html.1.7.html#__codelineno-1-20)        if result.success:
    [](index.html.1.7.html#__codelineno-1-21)            print("Markdown:\n", result.markdown[:500])  # Just a snippet
    [](index.html.1.7.html#__codelineno-1-22)        else:
    [](index.html.1.7.html#__codelineno-1-23)            print("Crawl failed:", result.error_message)
    [](index.html.1.7.html#__codelineno-1-24)
    [](index.html.1.7.html#__codelineno-1-25)if __name__ == "__main__":
    [](index.html.1.7.html#__codelineno-1-26)    import asyncio
    [](index.html.1.7.html#__codelineno-1-27)    asyncio.run(main())
    

Some commonly used `options`:

  * **`ignore_links`** (bool): Whether to remove all hyperlinks in the final markdown. 
  * **`ignore_images`** (bool): Remove all `![image]()` references. 
  * **`escape_html`** (bool): Turn HTML entities into text (default is often `True`). 
  * **`body_width`** (int): Wrap text at N characters. `0` or `None` means no wrapping. 
  * **`skip_internal_links`** (bool): If `True`, omit `#localAnchors` or internal links referencing the same page. 
  * **`include_sup_sub`** (bool): Attempt to handle `<sup>` / `<sub>` in a more readable way.



* * *

## 4\. Content Filters

**Content filters** selectively remove or rank sections of text before turning them into Markdown. This is especially helpful if your page has ads, nav bars, or other clutter you don’t want.

### 4.1 BM25ContentFilter

If you have a **search query** , BM25 is a good choice:
    
    
    [](index.html.1.7.html#__codelineno-2-1)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.7.html#__codelineno-2-2)from crawl4ai.content_filter_strategy import BM25ContentFilter
    [](index.html.1.7.html#__codelineno-2-3)from crawl4ai import CrawlerRunConfig
    [](index.html.1.7.html#__codelineno-2-4)
    [](index.html.1.7.html#__codelineno-2-5)bm25_filter = BM25ContentFilter(
    [](index.html.1.7.html#__codelineno-2-6)    user_query="machine learning",
    [](index.html.1.7.html#__codelineno-2-7)    bm25_threshold=1.2,
    [](index.html.1.7.html#__codelineno-2-8)    use_stemming=True
    [](index.html.1.7.html#__codelineno-2-9))
    [](index.html.1.7.html#__codelineno-2-10)
    [](index.html.1.7.html#__codelineno-2-11)md_generator = DefaultMarkdownGenerator(
    [](index.html.1.7.html#__codelineno-2-12)    content_filter=bm25_filter,
    [](index.html.1.7.html#__codelineno-2-13)    options={"ignore_links": True}
    [](index.html.1.7.html#__codelineno-2-14))
    [](index.html.1.7.html#__codelineno-2-15)
    [](index.html.1.7.html#__codelineno-2-16)config = CrawlerRunConfig(markdown_generator=md_generator)
    

  * **`user_query`** : The term you want to focus on. BM25 tries to keep only content blocks relevant to that query. 
  * **`bm25_threshold`** : Raise it to keep fewer blocks; lower it to keep more. 
  * **`use_stemming`** : If `True`, variations of words match (e.g., “learn,” “learning,” “learnt”).



**No query provided?** BM25 tries to glean a context from page metadata, or you can simply treat it as a scorched-earth approach that discards text with low generic score. Realistically, you want to supply a query for best results.

### 4.2 PruningContentFilter

If you **don’t** have a specific query, or if you just want a robust “junk remover,” use `PruningContentFilter`. It analyzes text density, link density, HTML structure, and known patterns (like “nav,” “footer”) to systematically prune extraneous or repetitive sections.
    
    
    [](index.html.1.7.html#__codelineno-3-1)from crawl4ai.content_filter_strategy import PruningContentFilter
    [](index.html.1.7.html#__codelineno-3-2)
    [](index.html.1.7.html#__codelineno-3-3)prune_filter = PruningContentFilter(
    [](index.html.1.7.html#__codelineno-3-4)    threshold=0.5,
    [](index.html.1.7.html#__codelineno-3-5)    threshold_type="fixed",  # or "dynamic"
    [](index.html.1.7.html#__codelineno-3-6)    min_word_threshold=50
    [](index.html.1.7.html#__codelineno-3-7))
    

  * **`threshold`** : Score boundary. Blocks below this score get removed. 
  * **`threshold_type`** : 
    * `"fixed"`: Straight comparison (`score >= threshold` keeps the block). 
    * `"dynamic"`: The filter adjusts threshold in a data-driven manner. 
  * **`min_word_threshold`** : Discard blocks under N words as likely too short or unhelpful.



**When to Use PruningContentFilter**  
\- You want a broad cleanup without a user query.  
\- The page has lots of repeated sidebars, footers, or disclaimers that hamper text extraction.

* * *

## 5\. Using Fit Markdown

When a content filter is active, the library produces two forms of markdown inside `result.markdown_v2` or (if using the simplified field) `result.markdown`:

1\. **`raw_markdown`** : The full unfiltered markdown.  
2\. **`fit_markdown`** : A “fit” version where the filter has removed or trimmed noisy segments.

**Note** : 

> In earlier examples, you may see references to `result.markdown_v2`. Depending on your library version, you might access `result.markdown`, `result.markdown_v2`, or an object named `MarkdownGenerationResult`. The idea is the same: you’ll have a raw version and a filtered (“fit”) version if a filter is used.
    
    
    [](index.html.1.7.html#__codelineno-4-1)import asyncio
    [](index.html.1.7.html#__codelineno-4-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.7.html#__codelineno-4-3)from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
    [](index.html.1.7.html#__codelineno-4-4)from crawl4ai.content_filter_strategy import PruningContentFilter
    [](index.html.1.7.html#__codelineno-4-5)
    [](index.html.1.7.html#__codelineno-4-6)async def main():
    [](index.html.1.7.html#__codelineno-4-7)    config = CrawlerRunConfig(
    [](index.html.1.7.html#__codelineno-4-8)        markdown_generator=DefaultMarkdownGenerator(
    [](index.html.1.7.html#__codelineno-4-9)            content_filter=PruningContentFilter(threshold=0.6),
    [](index.html.1.7.html#__codelineno-4-10)            options={"ignore_links": True}
    [](index.html.1.7.html#__codelineno-4-11)        )
    [](index.html.1.7.html#__codelineno-4-12)    )
    [](index.html.1.7.html#__codelineno-4-13)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.7.html#__codelineno-4-14)        result = await crawler.arun("https://news.example.com/tech", config=config)
    [](index.html.1.7.html#__codelineno-4-15)        if result.success:
    [](index.html.1.7.html#__codelineno-4-16)            print("Raw markdown:\n", result.markdown)
    [](index.html.1.7.html#__codelineno-4-17)
    [](index.html.1.7.html#__codelineno-4-18)            # If a filter is used, we also have .fit_markdown:
    [](index.html.1.7.html#__codelineno-4-19)            md_object = result.markdown_v2  # or your equivalent
    [](index.html.1.7.html#__codelineno-4-20)            print("Filtered markdown:\n", md_object.fit_markdown)
    [](index.html.1.7.html#__codelineno-4-21)        else:
    [](index.html.1.7.html#__codelineno-4-22)            print("Crawl failed:", result.error_message)
    [](index.html.1.7.html#__codelineno-4-23)
    [](index.html.1.7.html#__codelineno-4-24)if __name__ == "__main__":
    [](index.html.1.7.html#__codelineno-4-25)    asyncio.run(main())
    

* * *

## 6\. The `MarkdownGenerationResult` Object

If your library stores detailed markdown output in an object like `MarkdownGenerationResult`, you’ll see fields such as:

  * **`raw_markdown`** : The direct HTML-to-markdown transformation (no filtering). 
  * **`markdown_with_citations`** : A version that moves links to reference-style footnotes. 
  * **`references_markdown`** : A separate string or section containing the gathered references. 
  * **`fit_markdown`** : The filtered markdown if you used a content filter. 
  * **`fit_html`** : The corresponding HTML snippet used to generate `fit_markdown` (helpful for debugging or advanced usage).



**Example** :
    
    
    [](index.html.1.7.html#__codelineno-5-1)md_obj = result.markdown_v2  # your library’s naming may vary
    [](index.html.1.7.html#__codelineno-5-2)print("RAW:\n", md_obj.raw_markdown)
    [](index.html.1.7.html#__codelineno-5-3)print("CITED:\n", md_obj.markdown_with_citations)
    [](index.html.1.7.html#__codelineno-5-4)print("REFERENCES:\n", md_obj.references_markdown)
    [](index.html.1.7.html#__codelineno-5-5)print("FIT:\n", md_obj.fit_markdown)
    

**Why Does This Matter?**  
\- You can supply `raw_markdown` to an LLM if you want the entire text.  
\- Or feed `fit_markdown` into a vector database to reduce token usage.  
\- `references_markdown` can help you keep track of link provenance.

* * *

Below is a **revised section** under “Combining Filters (BM25 + Pruning)” that demonstrates how you can run **two** passes of content filtering without re-crawling, by taking the HTML (or text) from a first pass and feeding it into the second filter. It uses real code patterns from the snippet you provided for **BM25ContentFilter** , which directly accepts **HTML** strings (and can also handle plain text with minimal adaptation).

* * *

## 7\. Combining Filters (BM25 + Pruning) in Two Passes

You might want to **prune out** noisy boilerplate first (with `PruningContentFilter`), and then **rank what’s left** against a user query (with `BM25ContentFilter`). You don’t have to crawl the page twice. Instead:

1\. **First pass** : Apply `PruningContentFilter` directly to the raw HTML from `result.html` (the crawler’s downloaded HTML).  
2\. **Second pass** : Take the pruned HTML (or text) from step 1, and feed it into `BM25ContentFilter`, focusing on a user query.

### Two-Pass Example
    
    
    [](index.html.1.7.html#__codelineno-6-1)import asyncio
    [](index.html.1.7.html#__codelineno-6-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.7.html#__codelineno-6-3)from crawl4ai.content_filter_strategy import PruningContentFilter, BM25ContentFilter
    [](index.html.1.7.html#__codelineno-6-4)from bs4 import BeautifulSoup
    [](index.html.1.7.html#__codelineno-6-5)
    [](index.html.1.7.html#__codelineno-6-6)async def main():
    [](index.html.1.7.html#__codelineno-6-7)    # 1. Crawl with minimal or no markdown generator, just get raw HTML
    [](index.html.1.7.html#__codelineno-6-8)    config = CrawlerRunConfig(
    [](index.html.1.7.html#__codelineno-6-9)        # If you only want raw HTML, you can skip passing a markdown_generator
    [](index.html.1.7.html#__codelineno-6-10)        # or provide one but focus on .html in this example
    [](index.html.1.7.html#__codelineno-6-11)    )
    [](index.html.1.7.html#__codelineno-6-12)
    [](index.html.1.7.html#__codelineno-6-13)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.7.html#__codelineno-6-14)        result = await crawler.arun("https://example.com/tech-article", config=config)
    [](index.html.1.7.html#__codelineno-6-15)
    [](index.html.1.7.html#__codelineno-6-16)        if not result.success or not result.html:
    [](index.html.1.7.html#__codelineno-6-17)            print("Crawl failed or no HTML content.")
    [](index.html.1.7.html#__codelineno-6-18)            return
    [](index.html.1.7.html#__codelineno-6-19)
    [](index.html.1.7.html#__codelineno-6-20)        raw_html = result.html
    [](index.html.1.7.html#__codelineno-6-21)
    [](index.html.1.7.html#__codelineno-6-22)        # 2. First pass: PruningContentFilter on raw HTML
    [](index.html.1.7.html#__codelineno-6-23)        pruning_filter = PruningContentFilter(threshold=0.5, min_word_threshold=50)
    [](index.html.1.7.html#__codelineno-6-24)
    [](index.html.1.7.html#__codelineno-6-25)        # filter_content returns a list of "text chunks" or cleaned HTML sections
    [](index.html.1.7.html#__codelineno-6-26)        pruned_chunks = pruning_filter.filter_content(raw_html)
    [](index.html.1.7.html#__codelineno-6-27)        # This list is basically pruned content blocks, presumably in HTML or text form
    [](index.html.1.7.html#__codelineno-6-28)
    [](index.html.1.7.html#__codelineno-6-29)        # For demonstration, let's combine these chunks back into a single HTML-like string
    [](index.html.1.7.html#__codelineno-6-30)        # or you could do further processing. It's up to your pipeline design.
    [](index.html.1.7.html#__codelineno-6-31)        pruned_html = "\n".join(pruned_chunks)
    [](index.html.1.7.html#__codelineno-6-32)
    [](index.html.1.7.html#__codelineno-6-33)        # 3. Second pass: BM25ContentFilter with a user query
    [](index.html.1.7.html#__codelineno-6-34)        bm25_filter = BM25ContentFilter(
    [](index.html.1.7.html#__codelineno-6-35)            user_query="machine learning",
    [](index.html.1.7.html#__codelineno-6-36)            bm25_threshold=1.2,
    [](index.html.1.7.html#__codelineno-6-37)            language="english"
    [](index.html.1.7.html#__codelineno-6-38)        )
    [](index.html.1.7.html#__codelineno-6-39)
    [](index.html.1.7.html#__codelineno-6-40)        # returns a list of text chunks
    [](index.html.1.7.html#__codelineno-6-41)        bm25_chunks = bm25_filter.filter_content(pruned_html)  
    [](index.html.1.7.html#__codelineno-6-42)
    [](index.html.1.7.html#__codelineno-6-43)        if not bm25_chunks:
    [](index.html.1.7.html#__codelineno-6-44)            print("Nothing matched the BM25 query after pruning.")
    [](index.html.1.7.html#__codelineno-6-45)            return
    [](index.html.1.7.html#__codelineno-6-46)
    [](index.html.1.7.html#__codelineno-6-47)        # 4. Combine or display final results
    [](index.html.1.7.html#__codelineno-6-48)        final_text = "\n---\n".join(bm25_chunks)
    [](index.html.1.7.html#__codelineno-6-49)
    [](index.html.1.7.html#__codelineno-6-50)        print("==== PRUNED OUTPUT (first pass) ====")
    [](index.html.1.7.html#__codelineno-6-51)        print(pruned_html[:500], "... (truncated)")  # preview
    [](index.html.1.7.html#__codelineno-6-52)
    [](index.html.1.7.html#__codelineno-6-53)        print("\n==== BM25 OUTPUT (second pass) ====")
    [](index.html.1.7.html#__codelineno-6-54)        print(final_text[:500], "... (truncated)")
    [](index.html.1.7.html#__codelineno-6-55)
    [](index.html.1.7.html#__codelineno-6-56)if __name__ == "__main__":
    [](index.html.1.7.html#__codelineno-6-57)    asyncio.run(main())
    

### What’s Happening?

1\. **Raw HTML** : We crawl once and store the raw HTML in `result.html`.  
2\. **PruningContentFilter** : Takes HTML + optional parameters. It extracts blocks of text or partial HTML, removing headings/sections deemed “noise.” It returns a **list of text chunks**.  
3\. **Combine or Transform** : We join these pruned chunks back into a single HTML-like string. (Alternatively, you could store them in a list for further logic—whatever suits your pipeline.)  
4\. **BM25ContentFilter** : We feed the pruned string into `BM25ContentFilter` with a user query. This second pass further narrows the content to chunks relevant to “machine learning.”

**No Re-Crawling** : We used `raw_html` from the first pass, so there’s no need to run `arun()` again—**no second network request**.

### Tips & Variations

  * **Plain Text vs. HTML** : If your pruned output is mostly text, BM25 can still handle it; just keep in mind it expects a valid string input. If you supply partial HTML (like `"<p>some text</p>"`), it will parse it as HTML. 
  * **Chaining in a Single Pipeline** : If your code supports it, you can chain multiple filters automatically. Otherwise, manual two-pass filtering (as shown) is straightforward. 
  * **Adjust Thresholds** : If you see too much or too little text in step one, tweak `threshold=0.5` or `min_word_threshold=50`. Similarly, `bm25_threshold=1.2` can be raised/lowered for more or fewer chunks in step two.



### One-Pass Combination?

If your codebase or pipeline design allows applying multiple filters in one pass, you could do so. But often it’s simpler—and more transparent—to run them sequentially, analyzing each step’s result.

**Bottom Line** : By **manually chaining** your filtering logic in two passes, you get powerful incremental control over the final content. First, remove “global” clutter with Pruning, then refine further with BM25-based query relevance—without incurring a second network crawl.

* * *

## 8\. Common Pitfalls & Tips

1\. **No Markdown Output?**  
\- Make sure the crawler actually retrieved HTML. If the site is heavily JS-based, you may need to enable dynamic rendering or wait for elements.  
\- Check if your content filter is too aggressive. Lower thresholds or disable the filter to see if content reappears.

2\. **Performance Considerations**  
\- Very large pages with multiple filters can be slower. Consider `cache_mode` to avoid re-downloading.  
\- If your final use case is LLM ingestion, consider summarizing further or chunking big texts.

3\. **Take Advantage of`fit_markdown`**  
\- Great for RAG pipelines, semantic search, or any scenario where extraneous boilerplate is unwanted.  
\- Still verify the textual quality—some sites have crucial data in footers or sidebars.

4\. **Adjusting`html2text` Options**  
\- If you see lots of raw HTML slipping into the text, turn on `escape_html`.  
\- If code blocks look messy, experiment with `mark_code` or `handle_code_in_pre`.

* * *

## 9\. Summary & Next Steps

In this **Markdown Generation Basics** tutorial, you learned to:

  * Configure the **DefaultMarkdownGenerator** with HTML-to-text options. 
  * Use **BM25ContentFilter** for query-specific extraction or **PruningContentFilter** for general noise removal. 
  * Distinguish between raw and filtered markdown (`fit_markdown`). 
  * Leverage the `MarkdownGenerationResult` object to handle different forms of output (citations, references, etc.).



Now you can produce high-quality Markdown from any website, focusing on exactly the content you need—an essential step for powering AI models, summarization pipelines, or knowledge-base queries.

**Last Updated** : 2025-01-01

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
