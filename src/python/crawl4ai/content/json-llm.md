[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.25.html#)



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
    * LLM Strategies
    * [Clustering Strategies](index.html.1.26.md)
    * [Chunking](index.html.1.27.md)
  * API Reference
    * [AsyncWebCrawler](index.html.1.28.md)
    * [arun()](index.html.1.29.md)
    * [Browser & Crawler Config](index.html.1.30.md)
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [Extracting JSON (LLM)](index.html.1.25.html#extracting-json-llm)
  * [1\. Why Use an LLM?](index.html.1.25.html#1-why-use-an-llm)
  * [2\. Provider-Agnostic via LightLLM](index.html.1.25.html#2-provider-agnostic-via-lightllm)
  * [3\. How LLM Extraction Works](index.html.1.25.html#3-how-llm-extraction-works)
  * [4\. Key Parameters](index.html.1.25.html#4-key-parameters)
  * [5\. Putting It in CrawlerRunConfig](index.html.1.25.html#5-putting-it-in-crawlerrunconfig)
  * [6\. Chunking Details](index.html.1.25.html#6-chunking-details)
  * [7\. Input Format](index.html.1.25.html#7-input-format)
  * [8\. Token Usage & Show Usage](index.html.1.25.html#8-token-usage-show-usage)
  * [9\. Example: Building a Knowledge Graph](index.html.1.25.html#9-example-building-a-knowledge-graph)
  * [10\. Best Practices & Caveats](index.html.1.25.html#10-best-practices-caveats)
  * [11\. Conclusion](index.html.1.25.html#11-conclusion)



# Extracting JSON (LLM)

In some cases, you need to extract **complex or unstructured** information from a webpage that a simple CSS/XPath schema cannot easily parse. Or you want **AI** -driven insights, classification, or summarization. For these scenarios, Crawl4AI provides an **LLM-based extraction strategy** that:

  1. Works with **any** large language model supported by [LightLLM](https://github.com/LightLLM) (Ollama, OpenAI, Claude, and more). 
  2. Automatically splits content into chunks (if desired) to handle token limits, then combines results. 
  3. Lets you define a **schema** (like a Pydantic model) or a simpler “block” extraction approach.



**Important** : LLM-based extraction can be slower and costlier than schema-based approaches. If your page data is highly structured, consider using [`JsonCssExtractionStrategy`](index.html.1.24.md) or [`JsonXPathExtractionStrategy`](index.html.1.24.md) first. But if you need AI to interpret or reorganize content, read on!

* * *

## 1\. Why Use an LLM?

  * **Complex Reasoning** : If the site’s data is unstructured, scattered, or full of natural language context. 
  * **Semantic Extraction** : Summaries, knowledge graphs, or relational data that require comprehension. 
  * **Flexible** : You can pass instructions to the model to do more advanced transformations or classification.



* * *

## 2\. Provider-Agnostic via LightLLM

Crawl4AI uses a “provider string” (e.g., `"openai/gpt-4o"`, `"ollama/llama2.0"`, `"aws/titan"`) to identify your LLM. **Any** model that LightLLM supports is fair game. You just provide:

  * **`provider`** : The `<provider>/<model_name>` identifier (e.g., `"openai/gpt-4"`, `"ollama/llama2"`, `"huggingface/google-flan"`, etc.). 
  * **`api_token`** : If needed (for OpenAI, HuggingFace, etc.); local models or Ollama might not require it. 
  * **`api_base`** (optional): If your provider has a custom endpoint. 



This means you **aren’t locked** into a single LLM vendor. Switch or experiment easily.

* * *

## 3\. How LLM Extraction Works

### 3.1 Flow

1\. **Chunking** (optional): The HTML or markdown is split into smaller segments if it’s very long (based on `chunk_token_threshold`, overlap, etc.).  
2\. **Prompt Construction** : For each chunk, the library forms a prompt that includes your **`instruction`** (and possibly schema or examples).  
3\. **LLM Inference** : Each chunk is sent to the model in parallel or sequentially (depending on your concurrency).  
4\. **Combining** : The results from each chunk are merged and parsed into JSON.

### 3.2 `extraction_type`

  * **`"schema"`** : The model tries to return JSON conforming to your Pydantic-based schema. 
  * **`"block"`** : The model returns freeform text, or smaller JSON structures, which the library collects. 



For structured data, `"schema"` is recommended. You provide `schema=YourPydanticModel.model_json_schema()`.

* * *

## 4\. Key Parameters

Below is an overview of important LLM extraction parameters. All are typically set inside `LLMExtractionStrategy(...)`. You then put that strategy in your `CrawlerRunConfig(..., extraction_strategy=...)`.

1\. **`provider`** (str): e.g., `"openai/gpt-4"`, `"ollama/llama2"`.  
2\. **`api_token`** (str): The API key or token for that model. May not be needed for local models.  
3\. **`schema`** (dict): A JSON schema describing the fields you want. Usually generated by `YourModel.model_json_schema()`.  
4\. **`extraction_type`** (str): `"schema"` or `"block"`.  
5\. **`instruction`** (str): Prompt text telling the LLM what you want extracted. E.g., “Extract these fields as a JSON array.”  
6\. **`chunk_token_threshold`** (int): Maximum tokens per chunk. If your content is huge, you can break it up for the LLM.  
7\. **`overlap_rate`** (float): Overlap ratio between adjacent chunks. E.g., `0.1` means 10% of each chunk is repeated to preserve context continuity.  
8\. **`apply_chunking`** (bool): Set `True` to chunk automatically. If you want a single pass, set `False`.  
9\. **`input_format`** (str): Determines **which** crawler result is passed to the LLM. Options include:  
\- `"markdown"`: The raw markdown (default).  
\- `"fit_markdown"`: The filtered “fit” markdown if you used a content filter.  
\- `"html"`: The cleaned or raw HTML.  
10\. **`extra_args`** (dict): Additional LLM parameters like `temperature`, `max_tokens`, `top_p`, etc.  
11\. **`show_usage()`** : A method you can call to print out usage info (token usage per chunk, total cost if known). 

**Example** :
    
    
    [](index.html.1.25.html#__codelineno-0-1)extraction_strategy = LLMExtractionStrategy(
    [](index.html.1.25.html#__codelineno-0-2)    provider="openai/gpt-4",
    [](index.html.1.25.html#__codelineno-0-3)    api_token="YOUR_OPENAI_KEY",
    [](index.html.1.25.html#__codelineno-0-4)    schema=MyModel.model_json_schema(),
    [](index.html.1.25.html#__codelineno-0-5)    extraction_type="schema",
    [](index.html.1.25.html#__codelineno-0-6)    instruction="Extract a list of items from the text with 'name' and 'price' fields.",
    [](index.html.1.25.html#__codelineno-0-7)    chunk_token_threshold=1200,
    [](index.html.1.25.html#__codelineno-0-8)    overlap_rate=0.1,
    [](index.html.1.25.html#__codelineno-0-9)    apply_chunking=True,
    [](index.html.1.25.html#__codelineno-0-10)    input_format="html",
    [](index.html.1.25.html#__codelineno-0-11)    extra_args={"temperature": 0.1, "max_tokens": 1000},
    [](index.html.1.25.html#__codelineno-0-12)    verbose=True
    [](index.html.1.25.html#__codelineno-0-13))
    

* * *

## 5\. Putting It in `CrawlerRunConfig`

**Important** : In Crawl4AI, all strategy definitions should go inside the `CrawlerRunConfig`, not directly as a param in `arun()`. Here’s a full example:
    
    
    [](index.html.1.25.html#__codelineno-1-1)import os
    [](index.html.1.25.html#__codelineno-1-2)import asyncio
    [](index.html.1.25.html#__codelineno-1-3)import json
    [](index.html.1.25.html#__codelineno-1-4)from pydantic import BaseModel, Field
    [](index.html.1.25.html#__codelineno-1-5)from typing import List
    [](index.html.1.25.html#__codelineno-1-6)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.25.html#__codelineno-1-7)from crawl4ai.extraction_strategy import LLMExtractionStrategy
    [](index.html.1.25.html#__codelineno-1-8)
    [](index.html.1.25.html#__codelineno-1-9)class Product(BaseModel):
    [](index.html.1.25.html#__codelineno-1-10)    name: str
    [](index.html.1.25.html#__codelineno-1-11)    price: str
    [](index.html.1.25.html#__codelineno-1-12)
    [](index.html.1.25.html#__codelineno-1-13)async def main():
    [](index.html.1.25.html#__codelineno-1-14)    # 1. Define the LLM extraction strategy
    [](index.html.1.25.html#__codelineno-1-15)    llm_strategy = LLMExtractionStrategy(
    [](index.html.1.25.html#__codelineno-1-16)        provider="openai/gpt-4o-mini",            # e.g. "ollama/llama2"
    [](index.html.1.25.html#__codelineno-1-17)        api_token=os.getenv('OPENAI_API_KEY'),
    [](index.html.1.25.html#__codelineno-1-18)        schema=Product.schema_json(),            # Or use model_json_schema()
    [](index.html.1.25.html#__codelineno-1-19)        extraction_type="schema",
    [](index.html.1.25.html#__codelineno-1-20)        instruction="Extract all product objects with 'name' and 'price' from the content.",
    [](index.html.1.25.html#__codelineno-1-21)        chunk_token_threshold=1000,
    [](index.html.1.25.html#__codelineno-1-22)        overlap_rate=0.0,
    [](index.html.1.25.html#__codelineno-1-23)        apply_chunking=True,
    [](index.html.1.25.html#__codelineno-1-24)        input_format="markdown",   # or "html", "fit_markdown"
    [](index.html.1.25.html#__codelineno-1-25)        extra_args={"temperature": 0.0, "max_tokens": 800}
    [](index.html.1.25.html#__codelineno-1-26)    )
    [](index.html.1.25.html#__codelineno-1-27)
    [](index.html.1.25.html#__codelineno-1-28)    # 2. Build the crawler config
    [](index.html.1.25.html#__codelineno-1-29)    crawl_config = CrawlerRunConfig(
    [](index.html.1.25.html#__codelineno-1-30)        extraction_strategy=llm_strategy,
    [](index.html.1.25.html#__codelineno-1-31)        cache_mode=CacheMode.BYPASS
    [](index.html.1.25.html#__codelineno-1-32)    )
    [](index.html.1.25.html#__codelineno-1-33)
    [](index.html.1.25.html#__codelineno-1-34)    # 3. Create a browser config if needed
    [](index.html.1.25.html#__codelineno-1-35)    browser_cfg = BrowserConfig(headless=True)
    [](index.html.1.25.html#__codelineno-1-36)
    [](index.html.1.25.html#__codelineno-1-37)    async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.25.html#__codelineno-1-38)        # 4. Let's say we want to crawl a single page
    [](index.html.1.25.html#__codelineno-1-39)        result = await crawler.arun(
    [](index.html.1.25.html#__codelineno-1-40)            url="https://example.com/products",
    [](index.html.1.25.html#__codelineno-1-41)            config=crawl_config
    [](index.html.1.25.html#__codelineno-1-42)        )
    [](index.html.1.25.html#__codelineno-1-43)
    [](index.html.1.25.html#__codelineno-1-44)        if result.success:
    [](index.html.1.25.html#__codelineno-1-45)            # 5. The extracted content is presumably JSON
    [](index.html.1.25.html#__codelineno-1-46)            data = json.loads(result.extracted_content)
    [](index.html.1.25.html#__codelineno-1-47)            print("Extracted items:", data)
    [](index.html.1.25.html#__codelineno-1-48)
    [](index.html.1.25.html#__codelineno-1-49)            # 6. Show usage stats
    [](index.html.1.25.html#__codelineno-1-50)            llm_strategy.show_usage()  # prints token usage
    [](index.html.1.25.html#__codelineno-1-51)        else:
    [](index.html.1.25.html#__codelineno-1-52)            print("Error:", result.error_message)
    [](index.html.1.25.html#__codelineno-1-53)
    [](index.html.1.25.html#__codelineno-1-54)if __name__ == "__main__":
    [](index.html.1.25.html#__codelineno-1-55)    asyncio.run(main())
    

* * *

## 6\. Chunking Details

### 6.1 `chunk_token_threshold`

If your page is large, you might exceed your LLM’s context window. **`chunk_token_threshold`** sets the approximate max tokens per chunk. The library calculates word→token ratio using `word_token_rate` (often ~0.75 by default). If chunking is enabled (`apply_chunking=True`), the text is split into segments.

### 6.2 `overlap_rate`

To keep context continuous across chunks, we can overlap them. E.g., `overlap_rate=0.1` means each subsequent chunk includes 10% of the previous chunk’s text. This is helpful if your needed info might straddle chunk boundaries.

### 6.3 Performance & Parallelism

By chunking, you can potentially process multiple chunks in parallel (depending on your concurrency settings and the LLM provider). This reduces total time if the site is huge or has many sections.

* * *

## 7\. Input Format

By default, **LLMExtractionStrategy** uses `input_format="markdown"`, meaning the **crawler’s final markdown** is fed to the LLM. You can change to:

  * **`html`** : The cleaned HTML or raw HTML (depending on your crawler config) goes into the LLM. 
  * **`fit_markdown`** : If you used, for instance, `PruningContentFilter`, the “fit” version of the markdown is used. This can drastically reduce tokens if you trust the filter. 
  * **`markdown`** : Standard markdown output from the crawler’s `markdown_generator`.



This setting is crucial: if the LLM instructions rely on HTML tags, pick `"html"`. If you prefer a text-based approach, pick `"markdown"`.
    
    
    [](index.html.1.25.html#__codelineno-2-1)LLMExtractionStrategy(
    [](index.html.1.25.html#__codelineno-2-2)    # ...
    [](index.html.1.25.html#__codelineno-2-3)    input_format="html",  # Instead of "markdown" or "fit_markdown"
    [](index.html.1.25.html#__codelineno-2-4))
    

* * *

## 8\. Token Usage & Show Usage

To keep track of tokens and cost, each chunk is processed with an LLM call. We record usage in:

  * **`usages`** (list): token usage per chunk or call. 
  * **`total_usage`** : sum of all chunk calls. 
  * **`show_usage()`** : prints a usage report (if the provider returns usage data).


    
    
    [](index.html.1.25.html#__codelineno-3-1)llm_strategy = LLMExtractionStrategy(...)
    [](index.html.1.25.html#__codelineno-3-2)# ...
    [](index.html.1.25.html#__codelineno-3-3)llm_strategy.show_usage()
    [](index.html.1.25.html#__codelineno-3-4)# e.g. “Total usage: 1241 tokens across 2 chunk calls”
    

If your model provider doesn’t return usage info, these fields might be partial or empty.

* * *

## 9\. Example: Building a Knowledge Graph

Below is a snippet combining **`LLMExtractionStrategy`** with a Pydantic schema for a knowledge graph. Notice how we pass an **`instruction`** telling the model what to parse.
    
    
    [](index.html.1.25.html#__codelineno-4-1)import os
    [](index.html.1.25.html#__codelineno-4-2)import json
    [](index.html.1.25.html#__codelineno-4-3)import asyncio
    [](index.html.1.25.html#__codelineno-4-4)from typing import List
    [](index.html.1.25.html#__codelineno-4-5)from pydantic import BaseModel, Field
    [](index.html.1.25.html#__codelineno-4-6)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.25.html#__codelineno-4-7)from crawl4ai.extraction_strategy import LLMExtractionStrategy
    [](index.html.1.25.html#__codelineno-4-8)
    [](index.html.1.25.html#__codelineno-4-9)class Entity(BaseModel):
    [](index.html.1.25.html#__codelineno-4-10)    name: str
    [](index.html.1.25.html#__codelineno-4-11)    description: str
    [](index.html.1.25.html#__codelineno-4-12)
    [](index.html.1.25.html#__codelineno-4-13)class Relationship(BaseModel):
    [](index.html.1.25.html#__codelineno-4-14)    entity1: Entity
    [](index.html.1.25.html#__codelineno-4-15)    entity2: Entity
    [](index.html.1.25.html#__codelineno-4-16)    description: str
    [](index.html.1.25.html#__codelineno-4-17)    relation_type: str
    [](index.html.1.25.html#__codelineno-4-18)
    [](index.html.1.25.html#__codelineno-4-19)class KnowledgeGraph(BaseModel):
    [](index.html.1.25.html#__codelineno-4-20)    entities: List[Entity]
    [](index.html.1.25.html#__codelineno-4-21)    relationships: List[Relationship]
    [](index.html.1.25.html#__codelineno-4-22)
    [](index.html.1.25.html#__codelineno-4-23)async def main():
    [](index.html.1.25.html#__codelineno-4-24)    # LLM extraction strategy
    [](index.html.1.25.html#__codelineno-4-25)    llm_strat = LLMExtractionStrategy(
    [](index.html.1.25.html#__codelineno-4-26)        provider="openai/gpt-4",
    [](index.html.1.25.html#__codelineno-4-27)        api_token=os.getenv('OPENAI_API_KEY'),
    [](index.html.1.25.html#__codelineno-4-28)        schema=KnowledgeGraph.schema_json(),
    [](index.html.1.25.html#__codelineno-4-29)        extraction_type="schema",
    [](index.html.1.25.html#__codelineno-4-30)        instruction="Extract entities and relationships from the content. Return valid JSON.",
    [](index.html.1.25.html#__codelineno-4-31)        chunk_token_threshold=1400,
    [](index.html.1.25.html#__codelineno-4-32)        apply_chunking=True,
    [](index.html.1.25.html#__codelineno-4-33)        input_format="html",
    [](index.html.1.25.html#__codelineno-4-34)        extra_args={"temperature": 0.1, "max_tokens": 1500}
    [](index.html.1.25.html#__codelineno-4-35)    )
    [](index.html.1.25.html#__codelineno-4-36)
    [](index.html.1.25.html#__codelineno-4-37)    crawl_config = CrawlerRunConfig(
    [](index.html.1.25.html#__codelineno-4-38)        extraction_strategy=llm_strat,
    [](index.html.1.25.html#__codelineno-4-39)        cache_mode=CacheMode.BYPASS
    [](index.html.1.25.html#__codelineno-4-40)    )
    [](index.html.1.25.html#__codelineno-4-41)
    [](index.html.1.25.html#__codelineno-4-42)    async with AsyncWebCrawler(config=BrowserConfig(headless=True)) as crawler:
    [](index.html.1.25.html#__codelineno-4-43)        # Example page
    [](index.html.1.25.html#__codelineno-4-44)        url = "https://www.nbcnews.com/business"
    [](index.html.1.25.html#__codelineno-4-45)        result = await crawler.arun(url=url, config=crawl_config)
    [](index.html.1.25.html#__codelineno-4-46)
    [](index.html.1.25.html#__codelineno-4-47)        if result.success:
    [](index.html.1.25.html#__codelineno-4-48)            with open("kb_result.json", "w", encoding="utf-8") as f:
    [](index.html.1.25.html#__codelineno-4-49)                f.write(result.extracted_content)
    [](index.html.1.25.html#__codelineno-4-50)            llm_strat.show_usage()
    [](index.html.1.25.html#__codelineno-4-51)        else:
    [](index.html.1.25.html#__codelineno-4-52)            print("Crawl failed:", result.error_message)
    [](index.html.1.25.html#__codelineno-4-53)
    [](index.html.1.25.html#__codelineno-4-54)if __name__ == "__main__":
    [](index.html.1.25.html#__codelineno-4-55)    asyncio.run(main())
    

**Key Observations** :

  * **`extraction_type="schema"`** ensures we get JSON fitting our `KnowledgeGraph`. 
  * **`input_format="html"`** means we feed HTML to the model. 
  * **`instruction`** guides the model to output a structured knowledge graph. 



* * *

## 10\. Best Practices & Caveats

1\. **Cost & Latency**: LLM calls can be slow or expensive. Consider chunking or smaller coverage if you only need partial data.  
2\. **Model Token Limits** : If your page + instruction exceed the context window, chunking is essential.  
3\. **Instruction Engineering** : Well-crafted instructions can drastically improve output reliability.  
4\. **Schema Strictness** : `"schema"` extraction tries to parse the model output as JSON. If the model returns invalid JSON, partial extraction might happen, or you might get an error.  
5\. **Parallel vs. Serial** : The library can process multiple chunks in parallel, but you must watch out for rate limits on certain providers.  
6\. **Check Output** : Sometimes, an LLM might omit fields or produce extraneous text. You may want to post-validate with Pydantic or do additional cleanup.

* * *

## 11\. Conclusion

**LLM-based extraction** in Crawl4AI is **provider-agnostic** , letting you choose from hundreds of models via LightLLM. It’s perfect for **semantically complex** tasks or generating advanced structures like knowledge graphs. However, it’s **slower** and potentially costlier than schema-based approaches. Keep these tips in mind:

  * Put your LLM strategy **in`CrawlerRunConfig`**. 
  * Use **`input_format`** to pick which form (markdown, HTML, fit_markdown) the LLM sees. 
  * Tweak **`chunk_token_threshold`** , **`overlap_rate`** , and **`apply_chunking`** to handle large content efficiently. 
  * Monitor token usage with `show_usage()`.



If your site’s data is consistent or repetitive, consider [`JsonCssExtractionStrategy`](index.html.1.24.md) first for speed and simplicity. But if you need an **AI-driven** approach, `LLMExtractionStrategy` offers a flexible, multi-provider solution for extracting structured JSON from any website.

**Next Steps** :

1\. **Experiment with Different Providers**  
\- Try switching the `provider` (e.g., `"ollama/llama2"`, `"openai/gpt-4o"`, etc.) to see differences in speed, accuracy, or cost.  
\- Pass different `extra_args` like `temperature`, `top_p`, and `max_tokens` to fine-tune your results.

2\. **Performance Tuning**  
\- If pages are large, tweak `chunk_token_threshold`, `overlap_rate`, or `apply_chunking` to optimize throughput.  
\- Check the usage logs with `show_usage()` to keep an eye on token consumption and identify potential bottlenecks.

3\. **Validate Outputs**  
\- If using `extraction_type="schema"`, parse the LLM’s JSON with a Pydantic model for a final validation step.  
\- Log or handle any parse errors gracefully, especially if the model occasionally returns malformed JSON.

4\. **Explore Hooks & Automation**  
\- Integrate LLM extraction with [hooks](index.html.1.17.md) for complex pre/post-processing.  
\- Use a multi-step pipeline: crawl, filter, LLM-extract, then store or index results for further analysis.

**Last Updated** : 2025-01-01

* * *

That’s it for **Extracting JSON (LLM)** —now you can harness AI to parse, classify, or reorganize data on the web. Happy crawling!

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
