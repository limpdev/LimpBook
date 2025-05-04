[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.32.html#)



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
    * Strategies



* * *

  * [Extraction & Chunking Strategies API](index.html.1.32.html#extraction-chunking-strategies-api)
  * [Extraction Strategies](index.html.1.32.html#extraction-strategies)
  * [Chunking Strategies](index.html.1.32.html#chunking-strategies)
  * [Usage Examples](index.html.1.32.html#usage-examples)
  * [Best Practices](index.html.1.32.html#best-practices)



# Extraction & Chunking Strategies API

This documentation covers the API reference for extraction and chunking strategies in Crawl4AI.

## Extraction Strategies

All extraction strategies inherit from the base `ExtractionStrategy` class and implement two key methods: \- `extract(url: str, html: str) -> List[Dict[str, Any]]` \- `run(url: str, sections: List[str]) -> List[Dict[str, Any]]`

### LLMExtractionStrategy

Used for extracting structured data using Language Models.
    
    
    [](index.html.1.32.html#__codelineno-0-1)LLMExtractionStrategy(
    [](index.html.1.32.html#__codelineno-0-2)    # Required Parameters
    [](index.html.1.32.html#__codelineno-0-3)    provider: str = DEFAULT_PROVIDER,     # LLM provider (e.g., "ollama/llama2")
    [](index.html.1.32.html#__codelineno-0-4)    api_token: Optional[str] = None,      # API token
    [](index.html.1.32.html#__codelineno-0-5)
    [](index.html.1.32.html#__codelineno-0-6)    # Extraction Configuration
    [](index.html.1.32.html#__codelineno-0-7)    instruction: str = None,              # Custom extraction instruction
    [](index.html.1.32.html#__codelineno-0-8)    schema: Dict = None,                  # Pydantic model schema for structured data
    [](index.html.1.32.html#__codelineno-0-9)    extraction_type: str = "block",       # "block" or "schema"
    [](index.html.1.32.html#__codelineno-0-10)
    [](index.html.1.32.html#__codelineno-0-11)    # Chunking Parameters
    [](index.html.1.32.html#__codelineno-0-12)    chunk_token_threshold: int = 4000,    # Maximum tokens per chunk
    [](index.html.1.32.html#__codelineno-0-13)    overlap_rate: float = 0.1,           # Overlap between chunks
    [](index.html.1.32.html#__codelineno-0-14)    word_token_rate: float = 0.75,       # Word to token conversion rate
    [](index.html.1.32.html#__codelineno-0-15)    apply_chunking: bool = True,         # Enable/disable chunking
    [](index.html.1.32.html#__codelineno-0-16)
    [](index.html.1.32.html#__codelineno-0-17)    # API Configuration
    [](index.html.1.32.html#__codelineno-0-18)    base_url: str = None,                # Base URL for API
    [](index.html.1.32.html#__codelineno-0-19)    extra_args: Dict = {},               # Additional provider arguments
    [](index.html.1.32.html#__codelineno-0-20)    verbose: bool = False                # Enable verbose logging
    [](index.html.1.32.html#__codelineno-0-21))
    

### CosineStrategy

Used for content similarity-based extraction and clustering.
    
    
    [](index.html.1.32.html#__codelineno-1-1)CosineStrategy(
    [](index.html.1.32.html#__codelineno-1-2)    # Content Filtering
    [](index.html.1.32.html#__codelineno-1-3)    semantic_filter: str = None,        # Topic/keyword filter
    [](index.html.1.32.html#__codelineno-1-4)    word_count_threshold: int = 10,     # Minimum words per cluster
    [](index.html.1.32.html#__codelineno-1-5)    sim_threshold: float = 0.3,         # Similarity threshold
    [](index.html.1.32.html#__codelineno-1-6)
    [](index.html.1.32.html#__codelineno-1-7)    # Clustering Parameters
    [](index.html.1.32.html#__codelineno-1-8)    max_dist: float = 0.2,             # Maximum cluster distance
    [](index.html.1.32.html#__codelineno-1-9)    linkage_method: str = 'ward',       # Clustering method
    [](index.html.1.32.html#__codelineno-1-10)    top_k: int = 3,                    # Top clusters to return
    [](index.html.1.32.html#__codelineno-1-11)
    [](index.html.1.32.html#__codelineno-1-12)    # Model Configuration
    [](index.html.1.32.html#__codelineno-1-13)    model_name: str = 'sentence-transformers/all-MiniLM-L6-v2',  # Embedding model
    [](index.html.1.32.html#__codelineno-1-14)
    [](index.html.1.32.html#__codelineno-1-15)    verbose: bool = False              # Enable verbose logging
    [](index.html.1.32.html#__codelineno-1-16))
    

### JsonCssExtractionStrategy

Used for CSS selector-based structured data extraction.
    
    
    [](index.html.1.32.html#__codelineno-2-1)JsonCssExtractionStrategy(
    [](index.html.1.32.html#__codelineno-2-2)    schema: Dict[str, Any],    # Extraction schema
    [](index.html.1.32.html#__codelineno-2-3)    verbose: bool = False      # Enable verbose logging
    [](index.html.1.32.html#__codelineno-2-4))
    [](index.html.1.32.html#__codelineno-2-5)
    [](index.html.1.32.html#__codelineno-2-6)# Schema Structure
    [](index.html.1.32.html#__codelineno-2-7)schema = {
    [](index.html.1.32.html#__codelineno-2-8)    "name": str,              # Schema name
    [](index.html.1.32.html#__codelineno-2-9)    "baseSelector": str,      # Base CSS selector
    [](index.html.1.32.html#__codelineno-2-10)    "fields": [               # List of fields to extract
    [](index.html.1.32.html#__codelineno-2-11)        {
    [](index.html.1.32.html#__codelineno-2-12)            "name": str,      # Field name
    [](index.html.1.32.html#__codelineno-2-13)            "selector": str,  # CSS selector
    [](index.html.1.32.html#__codelineno-2-14)            "type": str,     # Field type: "text", "attribute", "html", "regex"
    [](index.html.1.32.html#__codelineno-2-15)            "attribute": str, # For type="attribute"
    [](index.html.1.32.html#__codelineno-2-16)            "pattern": str,  # For type="regex"
    [](index.html.1.32.html#__codelineno-2-17)            "transform": str, # Optional: "lowercase", "uppercase", "strip"
    [](index.html.1.32.html#__codelineno-2-18)            "default": Any    # Default value if extraction fails
    [](index.html.1.32.html#__codelineno-2-19)        }
    [](index.html.1.32.html#__codelineno-2-20)    ]
    [](index.html.1.32.html#__codelineno-2-21)}
    

## Chunking Strategies

All chunking strategies inherit from `ChunkingStrategy` and implement the `chunk(text: str) -> list` method.

### RegexChunking

Splits text based on regex patterns.
    
    
    [](index.html.1.32.html#__codelineno-3-1)RegexChunking(
    [](index.html.1.32.html#__codelineno-3-2)    patterns: List[str] = None  # Regex patterns for splitting
    [](index.html.1.32.html#__codelineno-3-3)                               # Default: [r'\n\n']
    [](index.html.1.32.html#__codelineno-3-4))
    

### SlidingWindowChunking

Creates overlapping chunks with a sliding window approach.
    
    
    [](index.html.1.32.html#__codelineno-4-1)SlidingWindowChunking(
    [](index.html.1.32.html#__codelineno-4-2)    window_size: int = 100,    # Window size in words
    [](index.html.1.32.html#__codelineno-4-3)    step: int = 50             # Step size between windows
    [](index.html.1.32.html#__codelineno-4-4))
    

### OverlappingWindowChunking

Creates chunks with specified overlap.
    
    
    [](index.html.1.32.html#__codelineno-5-1)OverlappingWindowChunking(
    [](index.html.1.32.html#__codelineno-5-2)    window_size: int = 1000,   # Chunk size in words
    [](index.html.1.32.html#__codelineno-5-3)    overlap: int = 100         # Overlap size in words
    [](index.html.1.32.html#__codelineno-5-4))
    

## Usage Examples

### LLM Extraction
    
    
    [](index.html.1.32.html#__codelineno-6-1)from pydantic import BaseModel
    [](index.html.1.32.html#__codelineno-6-2)from crawl4ai.extraction_strategy import LLMExtractionStrategy
    [](index.html.1.32.html#__codelineno-6-3)
    [](index.html.1.32.html#__codelineno-6-4)# Define schema
    [](index.html.1.32.html#__codelineno-6-5)class Article(BaseModel):
    [](index.html.1.32.html#__codelineno-6-6)    title: str
    [](index.html.1.32.html#__codelineno-6-7)    content: str
    [](index.html.1.32.html#__codelineno-6-8)    author: str
    [](index.html.1.32.html#__codelineno-6-9)
    [](index.html.1.32.html#__codelineno-6-10)# Create strategy
    [](index.html.1.32.html#__codelineno-6-11)strategy = LLMExtractionStrategy(
    [](index.html.1.32.html#__codelineno-6-12)    provider="ollama/llama2",
    [](index.html.1.32.html#__codelineno-6-13)    schema=Article.schema(),
    [](index.html.1.32.html#__codelineno-6-14)    instruction="Extract article details"
    [](index.html.1.32.html#__codelineno-6-15))
    [](index.html.1.32.html#__codelineno-6-16)
    [](index.html.1.32.html#__codelineno-6-17)# Use with crawler
    [](index.html.1.32.html#__codelineno-6-18)result = await crawler.arun(
    [](index.html.1.32.html#__codelineno-6-19)    url="https://example.com/article",
    [](index.html.1.32.html#__codelineno-6-20)    extraction_strategy=strategy
    [](index.html.1.32.html#__codelineno-6-21))
    [](index.html.1.32.html#__codelineno-6-22)
    [](index.html.1.32.html#__codelineno-6-23)# Access extracted data
    [](index.html.1.32.html#__codelineno-6-24)data = json.loads(result.extracted_content)
    

### CSS Extraction
    
    
    [](index.html.1.32.html#__codelineno-7-1)from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    [](index.html.1.32.html#__codelineno-7-2)
    [](index.html.1.32.html#__codelineno-7-3)# Define schema
    [](index.html.1.32.html#__codelineno-7-4)schema = {
    [](index.html.1.32.html#__codelineno-7-5)    "name": "Product List",
    [](index.html.1.32.html#__codelineno-7-6)    "baseSelector": ".product-card",
    [](index.html.1.32.html#__codelineno-7-7)    "fields": [
    [](index.html.1.32.html#__codelineno-7-8)        {
    [](index.html.1.32.html#__codelineno-7-9)            "name": "title",
    [](index.html.1.32.html#__codelineno-7-10)            "selector": "h2.title",
    [](index.html.1.32.html#__codelineno-7-11)            "type": "text"
    [](index.html.1.32.html#__codelineno-7-12)        },
    [](index.html.1.32.html#__codelineno-7-13)        {
    [](index.html.1.32.html#__codelineno-7-14)            "name": "price",
    [](index.html.1.32.html#__codelineno-7-15)            "selector": ".price",
    [](index.html.1.32.html#__codelineno-7-16)            "type": "text",
    [](index.html.1.32.html#__codelineno-7-17)            "transform": "strip"
    [](index.html.1.32.html#__codelineno-7-18)        },
    [](index.html.1.32.html#__codelineno-7-19)        {
    [](index.html.1.32.html#__codelineno-7-20)            "name": "image",
    [](index.html.1.32.html#__codelineno-7-21)            "selector": "img",
    [](index.html.1.32.html#__codelineno-7-22)            "type": "attribute",
    [](index.html.1.32.html#__codelineno-7-23)            "attribute": "src"
    [](index.html.1.32.html#__codelineno-7-24)        }
    [](index.html.1.32.html#__codelineno-7-25)    ]
    [](index.html.1.32.html#__codelineno-7-26)}
    [](index.html.1.32.html#__codelineno-7-27)
    [](index.html.1.32.html#__codelineno-7-28)# Create and use strategy
    [](index.html.1.32.html#__codelineno-7-29)strategy = JsonCssExtractionStrategy(schema)
    [](index.html.1.32.html#__codelineno-7-30)result = await crawler.arun(
    [](index.html.1.32.html#__codelineno-7-31)    url="https://example.com/products",
    [](index.html.1.32.html#__codelineno-7-32)    extraction_strategy=strategy
    [](index.html.1.32.html#__codelineno-7-33))
    

### Content Chunking
    
    
    [](index.html.1.32.html#__codelineno-8-1)from crawl4ai.chunking_strategy import OverlappingWindowChunking
    [](index.html.1.32.html#__codelineno-8-2)
    [](index.html.1.32.html#__codelineno-8-3)# Create chunking strategy
    [](index.html.1.32.html#__codelineno-8-4)chunker = OverlappingWindowChunking(
    [](index.html.1.32.html#__codelineno-8-5)    window_size=500,  # 500 words per chunk
    [](index.html.1.32.html#__codelineno-8-6)    overlap=50        # 50 words overlap
    [](index.html.1.32.html#__codelineno-8-7))
    [](index.html.1.32.html#__codelineno-8-8)
    [](index.html.1.32.html#__codelineno-8-9)# Use with extraction strategy
    [](index.html.1.32.html#__codelineno-8-10)strategy = LLMExtractionStrategy(
    [](index.html.1.32.html#__codelineno-8-11)    provider="ollama/llama2",
    [](index.html.1.32.html#__codelineno-8-12)    chunking_strategy=chunker
    [](index.html.1.32.html#__codelineno-8-13))
    [](index.html.1.32.html#__codelineno-8-14)
    [](index.html.1.32.html#__codelineno-8-15)result = await crawler.arun(
    [](index.html.1.32.html#__codelineno-8-16)    url="https://example.com/long-article",
    [](index.html.1.32.html#__codelineno-8-17)    extraction_strategy=strategy
    [](index.html.1.32.html#__codelineno-8-18))
    

## Best Practices

1\. **Choose the Right Strategy** \- Use `LLMExtractionStrategy` for complex, unstructured content \- Use `JsonCssExtractionStrategy` for well-structured HTML \- Use `CosineStrategy` for content similarity and clustering

2\. **Optimize Chunking**
    
    
    [](index.html.1.32.html#__codelineno-9-1)# For long documents
    [](index.html.1.32.html#__codelineno-9-2)strategy = LLMExtractionStrategy(
    [](index.html.1.32.html#__codelineno-9-3)    chunk_token_threshold=2000,  # Smaller chunks
    [](index.html.1.32.html#__codelineno-9-4)    overlap_rate=0.1           # 10% overlap
    [](index.html.1.32.html#__codelineno-9-5))
    

3\. **Handle Errors**
    
    
    [](index.html.1.32.html#__codelineno-10-1)try:
    [](index.html.1.32.html#__codelineno-10-2)    result = await crawler.arun(
    [](index.html.1.32.html#__codelineno-10-3)        url="https://example.com",
    [](index.html.1.32.html#__codelineno-10-4)        extraction_strategy=strategy
    [](index.html.1.32.html#__codelineno-10-5)    )
    [](index.html.1.32.html#__codelineno-10-6)    if result.success:
    [](index.html.1.32.html#__codelineno-10-7)        content = json.loads(result.extracted_content)
    [](index.html.1.32.html#__codelineno-10-8)except Exception as e:
    [](index.html.1.32.html#__codelineno-10-9)    print(f"Extraction failed: {e}")
    

4\. **Monitor Performance**
    
    
    [](index.html.1.32.html#__codelineno-11-1)strategy = CosineStrategy(
    [](index.html.1.32.html#__codelineno-11-2)    verbose=True,  # Enable logging
    [](index.html.1.32.html#__codelineno-11-3)    word_count_threshold=20,  # Filter short content
    [](index.html.1.32.html#__codelineno-11-4)    top_k=5  # Limit results
    [](index.html.1.32.html#__codelineno-11-5))
    

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
