[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.27.html#)



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
    * Chunking
  * API Reference
    * [AsyncWebCrawler](index.html.1.28.md)
    * [arun()](index.html.1.29.md)
    * [Browser & Crawler Config](index.html.1.30.md)
    * [CrawlResult](index.html.1.31.md)
    * [Strategies](index.html.1.32.md)



* * *

  * [Chunking Strategies](index.html.1.27.html#chunking-strategies)
  * [Why Use Chunking?](index.html.1.27.html#why-use-chunking)
  * [Methods of Chunking](index.html.1.27.html#methods-of-chunking)
  * [Combining Chunking with Cosine Similarity](index.html.1.27.html#combining-chunking-with-cosine-similarity)



# Chunking Strategies

Chunking strategies are critical for dividing large texts into manageable parts, enabling effective content processing and extraction. These strategies are foundational in cosine similarity-based extraction techniques, which allow users to retrieve only the most relevant chunks of content for a given query. Additionally, they facilitate direct integration into RAG (Retrieval-Augmented Generation) systems for structured and scalable workflows.

### Why Use Chunking?

1\. **Cosine Similarity and Query Relevance** : Prepares chunks for semantic similarity analysis. 2\. **RAG System Integration** : Seamlessly processes and stores chunks for retrieval. 3\. **Structured Processing** : Allows for diverse segmentation methods, such as sentence-based, topic-based, or windowed approaches.

### Methods of Chunking

#### 1\. Regex-Based Chunking

Splits text based on regular expression patterns, useful for coarse segmentation.

**Code Example** : 
    
    
    [](index.html.1.27.html#__codelineno-0-1)class RegexChunking:
    [](index.html.1.27.html#__codelineno-0-2)    def __init__(self, patterns=None):
    [](index.html.1.27.html#__codelineno-0-3)        self.patterns = patterns or [r'\n\n']  # Default pattern for paragraphs
    [](index.html.1.27.html#__codelineno-0-4)
    [](index.html.1.27.html#__codelineno-0-5)    def chunk(self, text):
    [](index.html.1.27.html#__codelineno-0-6)        paragraphs = [text]
    [](index.html.1.27.html#__codelineno-0-7)        for pattern in self.patterns:
    [](index.html.1.27.html#__codelineno-0-8)            paragraphs = [seg for p in paragraphs for seg in re.split(pattern, p)]
    [](index.html.1.27.html#__codelineno-0-9)        return paragraphs
    [](index.html.1.27.html#__codelineno-0-10)
    [](index.html.1.27.html#__codelineno-0-11)# Example Usage
    [](index.html.1.27.html#__codelineno-0-12)text = """This is the first paragraph.
    [](index.html.1.27.html#__codelineno-0-13)
    [](index.html.1.27.html#__codelineno-0-14)This is the second paragraph."""
    [](index.html.1.27.html#__codelineno-0-15)chunker = RegexChunking()
    [](index.html.1.27.html#__codelineno-0-16)print(chunker.chunk(text))
    

#### 2\. Sentence-Based Chunking

Divides text into sentences using NLP tools, ideal for extracting meaningful statements.

**Code Example** : 
    
    
    [](index.html.1.27.html#__codelineno-1-1)from nltk.tokenize import sent_tokenize
    [](index.html.1.27.html#__codelineno-1-2)
    [](index.html.1.27.html#__codelineno-1-3)class NlpSentenceChunking:
    [](index.html.1.27.html#__codelineno-1-4)    def chunk(self, text):
    [](index.html.1.27.html#__codelineno-1-5)        sentences = sent_tokenize(text)
    [](index.html.1.27.html#__codelineno-1-6)        return [sentence.strip() for sentence in sentences]
    [](index.html.1.27.html#__codelineno-1-7)
    [](index.html.1.27.html#__codelineno-1-8)# Example Usage
    [](index.html.1.27.html#__codelineno-1-9)text = "This is sentence one. This is sentence two."
    [](index.html.1.27.html#__codelineno-1-10)chunker = NlpSentenceChunking()
    [](index.html.1.27.html#__codelineno-1-11)print(chunker.chunk(text))
    

#### 3\. Topic-Based Segmentation

Uses algorithms like TextTiling to create topic-coherent chunks.

**Code Example** : 
    
    
    [](index.html.1.27.html#__codelineno-2-1)from nltk.tokenize import TextTilingTokenizer
    [](index.html.1.27.html#__codelineno-2-2)
    [](index.html.1.27.html#__codelineno-2-3)class TopicSegmentationChunking:
    [](index.html.1.27.html#__codelineno-2-4)    def __init__(self):
    [](index.html.1.27.html#__codelineno-2-5)        self.tokenizer = TextTilingTokenizer()
    [](index.html.1.27.html#__codelineno-2-6)
    [](index.html.1.27.html#__codelineno-2-7)    def chunk(self, text):
    [](index.html.1.27.html#__codelineno-2-8)        return self.tokenizer.tokenize(text)
    [](index.html.1.27.html#__codelineno-2-9)
    [](index.html.1.27.html#__codelineno-2-10)# Example Usage
    [](index.html.1.27.html#__codelineno-2-11)text = """This is an introduction.
    [](index.html.1.27.html#__codelineno-2-12)This is a detailed discussion on the topic."""
    [](index.html.1.27.html#__codelineno-2-13)chunker = TopicSegmentationChunking()
    [](index.html.1.27.html#__codelineno-2-14)print(chunker.chunk(text))
    

#### 4\. Fixed-Length Word Chunking

Segments text into chunks of a fixed word count.

**Code Example** : 
    
    
    [](index.html.1.27.html#__codelineno-3-1)class FixedLengthWordChunking:
    [](index.html.1.27.html#__codelineno-3-2)    def __init__(self, chunk_size=100):
    [](index.html.1.27.html#__codelineno-3-3)        self.chunk_size = chunk_size
    [](index.html.1.27.html#__codelineno-3-4)
    [](index.html.1.27.html#__codelineno-3-5)    def chunk(self, text):
    [](index.html.1.27.html#__codelineno-3-6)        words = text.split()
    [](index.html.1.27.html#__codelineno-3-7)        return [' '.join(words[i:i + self.chunk_size]) for i in range(0, len(words), self.chunk_size)]
    [](index.html.1.27.html#__codelineno-3-8)
    [](index.html.1.27.html#__codelineno-3-9)# Example Usage
    [](index.html.1.27.html#__codelineno-3-10)text = "This is a long text with many words to be chunked into fixed sizes."
    [](index.html.1.27.html#__codelineno-3-11)chunker = FixedLengthWordChunking(chunk_size=5)
    [](index.html.1.27.html#__codelineno-3-12)print(chunker.chunk(text))
    

#### 5\. Sliding Window Chunking

Generates overlapping chunks for better contextual coherence.

**Code Example** : 
    
    
    [](index.html.1.27.html#__codelineno-4-1)class SlidingWindowChunking:
    [](index.html.1.27.html#__codelineno-4-2)    def __init__(self, window_size=100, step=50):
    [](index.html.1.27.html#__codelineno-4-3)        self.window_size = window_size
    [](index.html.1.27.html#__codelineno-4-4)        self.step = step
    [](index.html.1.27.html#__codelineno-4-5)
    [](index.html.1.27.html#__codelineno-4-6)    def chunk(self, text):
    [](index.html.1.27.html#__codelineno-4-7)        words = text.split()
    [](index.html.1.27.html#__codelineno-4-8)        chunks = []
    [](index.html.1.27.html#__codelineno-4-9)        for i in range(0, len(words) - self.window_size + 1, self.step):
    [](index.html.1.27.html#__codelineno-4-10)            chunks.append(' '.join(words[i:i + self.window_size]))
    [](index.html.1.27.html#__codelineno-4-11)        return chunks
    [](index.html.1.27.html#__codelineno-4-12)
    [](index.html.1.27.html#__codelineno-4-13)# Example Usage
    [](index.html.1.27.html#__codelineno-4-14)text = "This is a long text to demonstrate sliding window chunking."
    [](index.html.1.27.html#__codelineno-4-15)chunker = SlidingWindowChunking(window_size=5, step=2)
    [](index.html.1.27.html#__codelineno-4-16)print(chunker.chunk(text))
    

### Combining Chunking with Cosine Similarity

To enhance the relevance of extracted content, chunking strategies can be paired with cosine similarity techniques. Here’s an example workflow:

**Code Example** : 
    
    
    [](index.html.1.27.html#__codelineno-5-1)from sklearn.feature_extraction.text import TfidfVectorizer
    [](index.html.1.27.html#__codelineno-5-2)from sklearn.metrics.pairwise import cosine_similarity
    [](index.html.1.27.html#__codelineno-5-3)
    [](index.html.1.27.html#__codelineno-5-4)class CosineSimilarityExtractor:
    [](index.html.1.27.html#__codelineno-5-5)    def __init__(self, query):
    [](index.html.1.27.html#__codelineno-5-6)        self.query = query
    [](index.html.1.27.html#__codelineno-5-7)        self.vectorizer = TfidfVectorizer()
    [](index.html.1.27.html#__codelineno-5-8)
    [](index.html.1.27.html#__codelineno-5-9)    def find_relevant_chunks(self, chunks):
    [](index.html.1.27.html#__codelineno-5-10)        vectors = self.vectorizer.fit_transform([self.query] + chunks)
    [](index.html.1.27.html#__codelineno-5-11)        similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    [](index.html.1.27.html#__codelineno-5-12)        return [(chunks[i], similarities[i]) for i in range(len(chunks))]
    [](index.html.1.27.html#__codelineno-5-13)
    [](index.html.1.27.html#__codelineno-5-14)# Example Workflow
    [](index.html.1.27.html#__codelineno-5-15)text = """This is a sample document. It has multiple sentences. 
    [](index.html.1.27.html#__codelineno-5-16)We are testing chunking and similarity."""
    [](index.html.1.27.html#__codelineno-5-17)
    [](index.html.1.27.html#__codelineno-5-18)chunker = SlidingWindowChunking(window_size=5, step=3)
    [](index.html.1.27.html#__codelineno-5-19)chunks = chunker.chunk(text)
    [](index.html.1.27.html#__codelineno-5-20)query = "testing chunking"
    [](index.html.1.27.html#__codelineno-5-21)extractor = CosineSimilarityExtractor(query)
    [](index.html.1.27.html#__codelineno-5-22)relevant_chunks = extractor.find_relevant_chunks(chunks)
    [](index.html.1.27.html#__codelineno-5-23)
    [](index.html.1.27.html#__codelineno-5-24)print(relevant_chunks)
    

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
