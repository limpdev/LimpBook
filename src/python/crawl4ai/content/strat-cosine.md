[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.26.html#)



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
    * Clustering Strategies
    * [Chunking](index.html.1.27.md)
  * API Reference
    * [AsyncWebCrawler](index.html.1.28.md)
    * [arun()](index.html.1.29.md)
    * [Browser & Crawler Config](index.html.1.30.md)
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [Cosine Strategy](index.html.1.26.html#cosine-strategy)
  * [How It Works](index.html.1.26.html#how-it-works)
  * [Basic Usage](index.html.1.26.html#basic-usage)
  * [Configuration Options](index.html.1.26.html#configuration-options)
  * [Use Cases](index.html.1.26.html#use-cases)
  * [Advanced Features](index.html.1.26.html#advanced-features)
  * [Best Practices](index.html.1.26.html#best-practices)
  * [Error Handling](index.html.1.26.html#error-handling)



# Cosine Strategy

The Cosine Strategy in Crawl4AI uses similarity-based clustering to identify and extract relevant content sections from web pages. This strategy is particularly useful when you need to find and extract content based on semantic similarity rather than structural patterns.

## How It Works

The Cosine Strategy: 1\. Breaks down page content into meaningful chunks 2\. Converts text into vector representations 3\. Calculates similarity between chunks 4\. Clusters similar content together 5\. Ranks and filters content based on relevance

## Basic Usage
    
    
    [](index.html.1.26.html#__codelineno-0-1)from crawl4ai.extraction_strategy import CosineStrategy
    [](index.html.1.26.html#__codelineno-0-2)
    [](index.html.1.26.html#__codelineno-0-3)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-0-4)    semantic_filter="product reviews",    # Target content type
    [](index.html.1.26.html#__codelineno-0-5)    word_count_threshold=10,             # Minimum words per cluster
    [](index.html.1.26.html#__codelineno-0-6)    sim_threshold=0.3                    # Similarity threshold
    [](index.html.1.26.html#__codelineno-0-7))
    [](index.html.1.26.html#__codelineno-0-8)
    [](index.html.1.26.html#__codelineno-0-9)async with AsyncWebCrawler() as crawler:
    [](index.html.1.26.html#__codelineno-0-10)    result = await crawler.arun(
    [](index.html.1.26.html#__codelineno-0-11)        url="https://example.com/reviews",
    [](index.html.1.26.html#__codelineno-0-12)        extraction_strategy=strategy
    [](index.html.1.26.html#__codelineno-0-13)    )
    [](index.html.1.26.html#__codelineno-0-14)
    [](index.html.1.26.html#__codelineno-0-15)    content = result.extracted_content
    

## Configuration Options

### Core Parameters
    
    
    [](index.html.1.26.html#__codelineno-1-1)CosineStrategy(
    [](index.html.1.26.html#__codelineno-1-2)    # Content Filtering
    [](index.html.1.26.html#__codelineno-1-3)    semantic_filter: str = None,       # Keywords/topic for content filtering
    [](index.html.1.26.html#__codelineno-1-4)    word_count_threshold: int = 10,    # Minimum words per cluster
    [](index.html.1.26.html#__codelineno-1-5)    sim_threshold: float = 0.3,        # Similarity threshold (0.0 to 1.0)
    [](index.html.1.26.html#__codelineno-1-6)
    [](index.html.1.26.html#__codelineno-1-7)    # Clustering Parameters
    [](index.html.1.26.html#__codelineno-1-8)    max_dist: float = 0.2,            # Maximum distance for clustering
    [](index.html.1.26.html#__codelineno-1-9)    linkage_method: str = 'ward',      # Clustering linkage method
    [](index.html.1.26.html#__codelineno-1-10)    top_k: int = 3,                   # Number of top categories to extract
    [](index.html.1.26.html#__codelineno-1-11)
    [](index.html.1.26.html#__codelineno-1-12)    # Model Configuration
    [](index.html.1.26.html#__codelineno-1-13)    model_name: str = 'sentence-transformers/all-MiniLM-L6-v2',  # Embedding model
    [](index.html.1.26.html#__codelineno-1-14)
    [](index.html.1.26.html#__codelineno-1-15)    verbose: bool = False             # Enable logging
    [](index.html.1.26.html#__codelineno-1-16))
    

### Parameter Details

1\. **semantic_filter** \- Sets the target topic or content type \- Use keywords relevant to your desired content \- Example: "technical specifications", "user reviews", "pricing information"

2\. **sim_threshold** \- Controls how similar content must be to be grouped together \- Higher values (e.g., 0.8) mean stricter matching \- Lower values (e.g., 0.3) allow more variation 
    
    
    [](index.html.1.26.html#__codelineno-2-1)# Strict matching
    [](index.html.1.26.html#__codelineno-2-2)strategy = CosineStrategy(sim_threshold=0.8)
    [](index.html.1.26.html#__codelineno-2-3)
    [](index.html.1.26.html#__codelineno-2-4)# Loose matching
    [](index.html.1.26.html#__codelineno-2-5)strategy = CosineStrategy(sim_threshold=0.3)
    

3\. **word_count_threshold** \- Filters out short content blocks \- Helps eliminate noise and irrelevant content 
    
    
    [](index.html.1.26.html#__codelineno-3-1)# Only consider substantial paragraphs
    [](index.html.1.26.html#__codelineno-3-2)strategy = CosineStrategy(word_count_threshold=50)
    

4\. **top_k** \- Number of top content clusters to return \- Higher values return more diverse content 
    
    
    [](index.html.1.26.html#__codelineno-4-1)# Get top 5 most relevant content clusters
    [](index.html.1.26.html#__codelineno-4-2)strategy = CosineStrategy(top_k=5)
    

## Use Cases

### 1\. Article Content Extraction
    
    
    [](index.html.1.26.html#__codelineno-5-1)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-5-2)    semantic_filter="main article content",
    [](index.html.1.26.html#__codelineno-5-3)    word_count_threshold=100,  # Longer blocks for articles
    [](index.html.1.26.html#__codelineno-5-4)    top_k=1                   # Usually want single main content
    [](index.html.1.26.html#__codelineno-5-5))
    [](index.html.1.26.html#__codelineno-5-6)
    [](index.html.1.26.html#__codelineno-5-7)result = await crawler.arun(
    [](index.html.1.26.html#__codelineno-5-8)    url="https://example.com/blog/post",
    [](index.html.1.26.html#__codelineno-5-9)    extraction_strategy=strategy
    [](index.html.1.26.html#__codelineno-5-10))
    

### 2\. Product Review Analysis
    
    
    [](index.html.1.26.html#__codelineno-6-1)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-6-2)    semantic_filter="customer reviews and ratings",
    [](index.html.1.26.html#__codelineno-6-3)    word_count_threshold=20,   # Reviews can be shorter
    [](index.html.1.26.html#__codelineno-6-4)    top_k=10,                 # Get multiple reviews
    [](index.html.1.26.html#__codelineno-6-5)    sim_threshold=0.4         # Allow variety in review content
    [](index.html.1.26.html#__codelineno-6-6))
    

### 3\. Technical Documentation
    
    
    [](index.html.1.26.html#__codelineno-7-1)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-7-2)    semantic_filter="technical specifications documentation",
    [](index.html.1.26.html#__codelineno-7-3)    word_count_threshold=30,
    [](index.html.1.26.html#__codelineno-7-4)    sim_threshold=0.6,        # Stricter matching for technical content
    [](index.html.1.26.html#__codelineno-7-5)    max_dist=0.3             # Allow related technical sections
    [](index.html.1.26.html#__codelineno-7-6))
    

## Advanced Features

### Custom Clustering
    
    
    [](index.html.1.26.html#__codelineno-8-1)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-8-2)    linkage_method='complete',  # Alternative clustering method
    [](index.html.1.26.html#__codelineno-8-3)    max_dist=0.4,              # Larger clusters
    [](index.html.1.26.html#__codelineno-8-4)    model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2'  # Multilingual support
    [](index.html.1.26.html#__codelineno-8-5))
    

### Content Filtering Pipeline
    
    
    [](index.html.1.26.html#__codelineno-9-1)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-9-2)    semantic_filter="pricing plans features",
    [](index.html.1.26.html#__codelineno-9-3)    word_count_threshold=15,
    [](index.html.1.26.html#__codelineno-9-4)    sim_threshold=0.5,
    [](index.html.1.26.html#__codelineno-9-5)    top_k=3
    [](index.html.1.26.html#__codelineno-9-6))
    [](index.html.1.26.html#__codelineno-9-7)
    [](index.html.1.26.html#__codelineno-9-8)async def extract_pricing_features(url: str):
    [](index.html.1.26.html#__codelineno-9-9)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.26.html#__codelineno-9-10)        result = await crawler.arun(
    [](index.html.1.26.html#__codelineno-9-11)            url=url,
    [](index.html.1.26.html#__codelineno-9-12)            extraction_strategy=strategy
    [](index.html.1.26.html#__codelineno-9-13)        )
    [](index.html.1.26.html#__codelineno-9-14)
    [](index.html.1.26.html#__codelineno-9-15)        if result.success:
    [](index.html.1.26.html#__codelineno-9-16)            content = json.loads(result.extracted_content)
    [](index.html.1.26.html#__codelineno-9-17)            return {
    [](index.html.1.26.html#__codelineno-9-18)                'pricing_features': content,
    [](index.html.1.26.html#__codelineno-9-19)                'clusters': len(content),
    [](index.html.1.26.html#__codelineno-9-20)                'similarity_scores': [item['score'] for item in content]
    [](index.html.1.26.html#__codelineno-9-21)            }
    

## Best Practices

1\. **Adjust Thresholds Iteratively** \- Start with default values \- Adjust based on results \- Monitor clustering quality

2\. **Choose Appropriate Word Count Thresholds** \- Higher for articles (100+) \- Lower for reviews/comments (20+) \- Medium for product descriptions (50+)

3\. **Optimize Performance**
    
    
    [](index.html.1.26.html#__codelineno-10-1)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-10-2)    word_count_threshold=10,  # Filter early
    [](index.html.1.26.html#__codelineno-10-3)    top_k=5,                 # Limit results
    [](index.html.1.26.html#__codelineno-10-4)    verbose=True             # Monitor performance
    [](index.html.1.26.html#__codelineno-10-5))
    

4\. **Handle Different Content Types**
    
    
    [](index.html.1.26.html#__codelineno-11-1)# For mixed content pages
    [](index.html.1.26.html#__codelineno-11-2)strategy = CosineStrategy(
    [](index.html.1.26.html#__codelineno-11-3)    semantic_filter="product features",
    [](index.html.1.26.html#__codelineno-11-4)    sim_threshold=0.4,      # More flexible matching
    [](index.html.1.26.html#__codelineno-11-5)    max_dist=0.3,          # Larger clusters
    [](index.html.1.26.html#__codelineno-11-6)    top_k=3                # Multiple relevant sections
    [](index.html.1.26.html#__codelineno-11-7))
    

## Error Handling
    
    
    [](index.html.1.26.html#__codelineno-12-1)try:
    [](index.html.1.26.html#__codelineno-12-2)    result = await crawler.arun(
    [](index.html.1.26.html#__codelineno-12-3)        url="https://example.com",
    [](index.html.1.26.html#__codelineno-12-4)        extraction_strategy=strategy
    [](index.html.1.26.html#__codelineno-12-5)    )
    [](index.html.1.26.html#__codelineno-12-6)
    [](index.html.1.26.html#__codelineno-12-7)    if result.success:
    [](index.html.1.26.html#__codelineno-12-8)        content = json.loads(result.extracted_content)
    [](index.html.1.26.html#__codelineno-12-9)        if not content:
    [](index.html.1.26.html#__codelineno-12-10)            print("No relevant content found")
    [](index.html.1.26.html#__codelineno-12-11)    else:
    [](index.html.1.26.html#__codelineno-12-12)        print(f"Extraction failed: {result.error_message}")
    [](index.html.1.26.html#__codelineno-12-13)
    [](index.html.1.26.html#__codelineno-12-14)except Exception as e:
    [](index.html.1.26.html#__codelineno-12-15)    print(f"Error during extraction: {str(e)}")
    

The Cosine Strategy is particularly effective when: \- Content structure is inconsistent \- You need semantic understanding \- You want to find similar content blocks \- Structure-based extraction (CSS/XPath) isn't reliable

It works well with other strategies and can be used as a pre-processing step for LLM-based extraction.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
