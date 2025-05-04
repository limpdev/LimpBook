[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.2.html#)



  * [Home](index.md)
  * Setup & Installation
    * [Installation](index.html.1.1.md)
    * Docker Deployment
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
    * [Strategies](index.html.1.32.md)



* * *

  * [Docker Deployment](index.html.1.2.html#docker-deployment)
  * [Quick Start 🚀](index.html.1.2.html#quick-start)
  * [Running with Docker Compose 🐳](index.html.1.2.html#running-with-docker-compose)
  * [API Security 🔒](index.html.1.2.html#api-security)
  * [Configuration Options 🔧](index.html.1.2.html#configuration-options)
  * [Usage Examples 📝](index.html.1.2.html#usage-examples)
  * [Platform-Specific Instructions 💻](index.html.1.2.html#platform-specific-instructions)
  * [Testing 🧪](index.html.1.2.html#testing)
  * [Advanced Configuration ⚙️](index.html.1.2.html#advanced-configuration)
  * [Troubleshooting 🔍](index.html.1.2.html#troubleshooting)
  * [Best Practices 🌟](index.html.1.2.html#best-practices)
  * [API Reference 📚](index.html.1.2.html#api-reference)



# Docker Deployment

Crawl4AI provides official Docker images for easy deployment and scalability. This guide covers installation, configuration, and usage of Crawl4AI in Docker environments.

## Quick Start 🚀

Pull and run the basic version:
    
    
    [](index.html.1.2.html#__codelineno-0-1)# Basic run without security
    [](index.html.1.2.html#__codelineno-0-2)docker pull unclecode/crawl4ai:basic
    [](index.html.1.2.html#__codelineno-0-3)docker run -p 11235:11235 unclecode/crawl4ai:basic
    [](index.html.1.2.html#__codelineno-0-4)
    [](index.html.1.2.html#__codelineno-0-5)# Run with API security enabled
    [](index.html.1.2.html#__codelineno-0-6)docker run -p 11235:11235 -e CRAWL4AI_API_TOKEN=your_secret_token unclecode/crawl4ai:basic
    

## Running with Docker Compose 🐳

### Use Docker Compose (From Local Dockerfile or Docker Hub)

Crawl4AI provides flexibility to use Docker Compose for managing your containerized services. You can either build the image locally from the provided `Dockerfile` or use the pre-built image from Docker Hub.

### **Option 1: Using Docker Compose to Build Locally**

If you want to build the image locally, use the provided `docker-compose.local.yml` file.
    
    
    [](index.html.1.2.html#__codelineno-1-1)docker-compose -f docker-compose.local.yml up -d
    

This will: 1\. Build the Docker image from the provided `Dockerfile`. 2\. Start the container and expose it on `http://localhost:11235`.

* * *

### **Option 2: Using Docker Compose with Pre-Built Image from Hub**

If you prefer using the pre-built image on Docker Hub, use the `docker-compose.hub.yml` file.
    
    
    [](index.html.1.2.html#__codelineno-2-1)docker-compose -f docker-compose.hub.yml up -d
    

This will: 1\. Pull the pre-built image `unclecode/crawl4ai:basic` (or `all`, depending on your configuration). 2\. Start the container and expose it on `http://localhost:11235`.

* * *

### **Stopping the Running Services**

To stop the services started via Docker Compose, you can use:
    
    
    [](index.html.1.2.html#__codelineno-3-1)docker-compose -f docker-compose.local.yml down
    [](index.html.1.2.html#__codelineno-3-2)# OR
    [](index.html.1.2.html#__codelineno-3-3)docker-compose -f docker-compose.hub.yml down
    

If the containers don’t stop and the application is still running, check the running containers:
    
    
    [](index.html.1.2.html#__codelineno-4-1)docker ps
    

Find the `CONTAINER ID` of the running service and stop it forcefully:
    
    
    [](index.html.1.2.html#__codelineno-5-1)docker stop <CONTAINER_ID>
    

* * *

### **Debugging with Docker Compose**

  * **Check Logs** : To view the container logs: 
    
        [](index.html.1.2.html#__codelineno-6-1)docker-compose -f docker-compose.local.yml logs -f
    

  * **Remove Orphaned Containers** : If the service is still running unexpectedly: 
    
        [](index.html.1.2.html#__codelineno-7-1)docker-compose -f docker-compose.local.yml down --remove-orphans
    

  * **Manually Remove Network** : If the network is still in use: 
    
        [](index.html.1.2.html#__codelineno-8-1)docker network ls
    [](index.html.1.2.html#__codelineno-8-2)docker network rm crawl4ai_default
    




* * *

### Why Use Docker Compose?

Docker Compose is the recommended way to deploy Crawl4AI because: 1\. It simplifies multi-container setups. 2\. Allows you to define environment variables, resources, and ports in a single file. 3\. Makes it easier to switch between local development and production-ready images.

For example, your `docker-compose.yml` could include API keys, token settings, and memory limits, making deployment quick and consistent.

## API Security 🔒

### Understanding CRAWL4AI_API_TOKEN

The `CRAWL4AI_API_TOKEN` provides optional security for your Crawl4AI instance:

  * If `CRAWL4AI_API_TOKEN` is set: All API endpoints (except `/health`) require authentication
  * If `CRAWL4AI_API_TOKEN` is not set: The API is publicly accessible


    
    
    [](index.html.1.2.html#__codelineno-9-1)# Secured Instance
    [](index.html.1.2.html#__codelineno-9-2)docker run -p 11235:11235 -e CRAWL4AI_API_TOKEN=your_secret_token unclecode/crawl4ai:all
    [](index.html.1.2.html#__codelineno-9-3)
    [](index.html.1.2.html#__codelineno-9-4)# Unsecured Instance
    [](index.html.1.2.html#__codelineno-9-5)docker run -p 11235:11235 unclecode/crawl4ai:all
    

### Making API Calls

For secured instances, include the token in all requests:
    
    
    [](index.html.1.2.html#__codelineno-10-1)import requests
    [](index.html.1.2.html#__codelineno-10-2)
    [](index.html.1.2.html#__codelineno-10-3)# Setup headers if token is being used
    [](index.html.1.2.html#__codelineno-10-4)api_token = "your_secret_token"  # Same token set in CRAWL4AI_API_TOKEN
    [](index.html.1.2.html#__codelineno-10-5)headers = {"Authorization": f"Bearer {api_token}"} if api_token else {}
    [](index.html.1.2.html#__codelineno-10-6)
    [](index.html.1.2.html#__codelineno-10-7)# Making authenticated requests
    [](index.html.1.2.html#__codelineno-10-8)response = requests.post(
    [](index.html.1.2.html#__codelineno-10-9)    "http://localhost:11235/crawl",
    [](index.html.1.2.html#__codelineno-10-10)    headers=headers,
    [](index.html.1.2.html#__codelineno-10-11)    json={
    [](index.html.1.2.html#__codelineno-10-12)        "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-10-13)        "priority": 10
    [](index.html.1.2.html#__codelineno-10-14)    }
    [](index.html.1.2.html#__codelineno-10-15))
    [](index.html.1.2.html#__codelineno-10-16)
    [](index.html.1.2.html#__codelineno-10-17)# Checking task status
    [](index.html.1.2.html#__codelineno-10-18)task_id = response.json()["task_id"]
    [](index.html.1.2.html#__codelineno-10-19)status = requests.get(
    [](index.html.1.2.html#__codelineno-10-20)    f"http://localhost:11235/task/{task_id}",
    [](index.html.1.2.html#__codelineno-10-21)    headers=headers
    [](index.html.1.2.html#__codelineno-10-22))
    

### Using with Docker Compose

In your `docker-compose.yml`: 
    
    
    [](index.html.1.2.html#__codelineno-11-1)services:
    [](index.html.1.2.html#__codelineno-11-2)  crawl4ai:
    [](index.html.1.2.html#__codelineno-11-3)    image: unclecode/crawl4ai:all
    [](index.html.1.2.html#__codelineno-11-4)    environment:
    [](index.html.1.2.html#__codelineno-11-5)      - CRAWL4AI_API_TOKEN=${CRAWL4AI_API_TOKEN:-}  # Optional
    [](index.html.1.2.html#__codelineno-11-6)    # ... other configuration
    

Then either: 1\. Set in `.env` file: 
    
    
    [](index.html.1.2.html#__codelineno-12-1)CRAWL4AI_API_TOKEN=your_secret_token
    

  1. Or set via command line: 
    
        [](index.html.1.2.html#__codelineno-13-1)CRAWL4AI_API_TOKEN=your_secret_token docker-compose up
    




> **Security Note** : If you enable the API token, make sure to keep it secure and never commit it to version control. The token will be required for all API endpoints except the health check endpoint (`/health`).

## Configuration Options 🔧

### Environment Variables

You can configure the service using environment variables:
    
    
    [](index.html.1.2.html#__codelineno-14-1)# Basic configuration
    [](index.html.1.2.html#__codelineno-14-2)docker run -p 11235:11235 \
    [](index.html.1.2.html#__codelineno-14-3)    -e MAX_CONCURRENT_TASKS=5 \
    [](index.html.1.2.html#__codelineno-14-4)    unclecode/crawl4ai:all
    [](index.html.1.2.html#__codelineno-14-5)
    [](index.html.1.2.html#__codelineno-14-6)# With security and LLM support
    [](index.html.1.2.html#__codelineno-14-7)docker run -p 11235:11235 \
    [](index.html.1.2.html#__codelineno-14-8)    -e CRAWL4AI_API_TOKEN=your_secret_token \
    [](index.html.1.2.html#__codelineno-14-9)    -e OPENAI_API_KEY=sk-... \
    [](index.html.1.2.html#__codelineno-14-10)    -e ANTHROPIC_API_KEY=sk-ant-... \
    [](index.html.1.2.html#__codelineno-14-11)    unclecode/crawl4ai:all
    

### Using Docker Compose (Recommended) 🐳

Create a `docker-compose.yml`:
    
    
    [](index.html.1.2.html#__codelineno-15-1)version: '3.8'
    [](index.html.1.2.html#__codelineno-15-2)
    [](index.html.1.2.html#__codelineno-15-3)services:
    [](index.html.1.2.html#__codelineno-15-4)  crawl4ai:
    [](index.html.1.2.html#__codelineno-15-5)    image: unclecode/crawl4ai:all
    [](index.html.1.2.html#__codelineno-15-6)    ports:
    [](index.html.1.2.html#__codelineno-15-7)      - "11235:11235"
    [](index.html.1.2.html#__codelineno-15-8)    environment:
    [](index.html.1.2.html#__codelineno-15-9)      - CRAWL4AI_API_TOKEN=${CRAWL4AI_API_TOKEN:-}  # Optional API security
    [](index.html.1.2.html#__codelineno-15-10)      - MAX_CONCURRENT_TASKS=5
    [](index.html.1.2.html#__codelineno-15-11)      # LLM Provider Keys
    [](index.html.1.2.html#__codelineno-15-12)      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
    [](index.html.1.2.html#__codelineno-15-13)      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:-}
    [](index.html.1.2.html#__codelineno-15-14)    volumes:
    [](index.html.1.2.html#__codelineno-15-15)      - /dev/shm:/dev/shm
    [](index.html.1.2.html#__codelineno-15-16)    deploy:
    [](index.html.1.2.html#__codelineno-15-17)      resources:
    [](index.html.1.2.html#__codelineno-15-18)        limits:
    [](index.html.1.2.html#__codelineno-15-19)          memory: 4G
    [](index.html.1.2.html#__codelineno-15-20)        reservations:
    [](index.html.1.2.html#__codelineno-15-21)          memory: 1G
    

You can run it in two ways:

  1. Using environment variables directly: 
    
        [](index.html.1.2.html#__codelineno-16-1)CRAWL4AI_API_TOKEN=secret123 OPENAI_API_KEY=sk-... docker-compose up
    

  2. Using a `.env` file (recommended): Create a `.env` file in the same directory: 
    
        [](index.html.1.2.html#__codelineno-17-1)# API Security (optional)
    [](index.html.1.2.html#__codelineno-17-2)CRAWL4AI_API_TOKEN=your_secret_token
    [](index.html.1.2.html#__codelineno-17-3)
    [](index.html.1.2.html#__codelineno-17-4)# LLM Provider Keys
    [](index.html.1.2.html#__codelineno-17-5)OPENAI_API_KEY=sk-...
    [](index.html.1.2.html#__codelineno-17-6)ANTHROPIC_API_KEY=sk-ant-...
    [](index.html.1.2.html#__codelineno-17-7)
    [](index.html.1.2.html#__codelineno-17-8)# Other Configuration
    [](index.html.1.2.html#__codelineno-17-9)MAX_CONCURRENT_TASKS=5
    




Then simply run: 
    
    
    [](index.html.1.2.html#__codelineno-18-1)docker-compose up
    

### Testing the Deployment 🧪
    
    
    [](index.html.1.2.html#__codelineno-19-1)import requests
    [](index.html.1.2.html#__codelineno-19-2)
    [](index.html.1.2.html#__codelineno-19-3)# For unsecured instances
    [](index.html.1.2.html#__codelineno-19-4)def test_unsecured():
    [](index.html.1.2.html#__codelineno-19-5)    # Health check
    [](index.html.1.2.html#__codelineno-19-6)    health = requests.get("http://localhost:11235/health")
    [](index.html.1.2.html#__codelineno-19-7)    print("Health check:", health.json())
    [](index.html.1.2.html#__codelineno-19-8)
    [](index.html.1.2.html#__codelineno-19-9)    # Basic crawl
    [](index.html.1.2.html#__codelineno-19-10)    response = requests.post(
    [](index.html.1.2.html#__codelineno-19-11)        "http://localhost:11235/crawl",
    [](index.html.1.2.html#__codelineno-19-12)        json={
    [](index.html.1.2.html#__codelineno-19-13)            "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-19-14)            "priority": 10
    [](index.html.1.2.html#__codelineno-19-15)        }
    [](index.html.1.2.html#__codelineno-19-16)    )
    [](index.html.1.2.html#__codelineno-19-17)    task_id = response.json()["task_id"]
    [](index.html.1.2.html#__codelineno-19-18)    print("Task ID:", task_id)
    [](index.html.1.2.html#__codelineno-19-19)
    [](index.html.1.2.html#__codelineno-19-20)# For secured instances
    [](index.html.1.2.html#__codelineno-19-21)def test_secured(api_token):
    [](index.html.1.2.html#__codelineno-19-22)    headers = {"Authorization": f"Bearer {api_token}"}
    [](index.html.1.2.html#__codelineno-19-23)
    [](index.html.1.2.html#__codelineno-19-24)    # Basic crawl with authentication
    [](index.html.1.2.html#__codelineno-19-25)    response = requests.post(
    [](index.html.1.2.html#__codelineno-19-26)        "http://localhost:11235/crawl",
    [](index.html.1.2.html#__codelineno-19-27)        headers=headers,
    [](index.html.1.2.html#__codelineno-19-28)        json={
    [](index.html.1.2.html#__codelineno-19-29)            "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-19-30)            "priority": 10
    [](index.html.1.2.html#__codelineno-19-31)        }
    [](index.html.1.2.html#__codelineno-19-32)    )
    [](index.html.1.2.html#__codelineno-19-33)    task_id = response.json()["task_id"]
    [](index.html.1.2.html#__codelineno-19-34)    print("Task ID:", task_id)
    

### LLM Extraction Example 🤖

When you've configured your LLM provider keys (via environment variables or `.env`), you can use LLM extraction:
    
    
    [](index.html.1.2.html#__codelineno-20-1)request = {
    [](index.html.1.2.html#__codelineno-20-2)    "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-20-3)    "extraction_config": {
    [](index.html.1.2.html#__codelineno-20-4)        "type": "llm",
    [](index.html.1.2.html#__codelineno-20-5)        "params": {
    [](index.html.1.2.html#__codelineno-20-6)            "provider": "openai/gpt-4",
    [](index.html.1.2.html#__codelineno-20-7)            "instruction": "Extract main topics from the page"
    [](index.html.1.2.html#__codelineno-20-8)        }
    [](index.html.1.2.html#__codelineno-20-9)    }
    [](index.html.1.2.html#__codelineno-20-10)}
    [](index.html.1.2.html#__codelineno-20-11)
    [](index.html.1.2.html#__codelineno-20-12)# Make the request (add headers if using API security)
    [](index.html.1.2.html#__codelineno-20-13)response = requests.post("http://localhost:11235/crawl", json=request)
    

> **Note** : Remember to add `.env` to your `.gitignore` to keep your API keys secure!

## Usage Examples 📝

### Basic Crawling
    
    
    [](index.html.1.2.html#__codelineno-21-1)request = {
    [](index.html.1.2.html#__codelineno-21-2)    "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-21-3)    "priority": 10
    [](index.html.1.2.html#__codelineno-21-4)}
    [](index.html.1.2.html#__codelineno-21-5)
    [](index.html.1.2.html#__codelineno-21-6)response = requests.post("http://localhost:11235/crawl", json=request)
    [](index.html.1.2.html#__codelineno-21-7)task_id = response.json()["task_id"]
    [](index.html.1.2.html#__codelineno-21-8)
    [](index.html.1.2.html#__codelineno-21-9)# Get results
    [](index.html.1.2.html#__codelineno-21-10)result = requests.get(f"http://localhost:11235/task/{task_id}")
    

### Structured Data Extraction
    
    
    [](index.html.1.2.html#__codelineno-22-1)schema = {
    [](index.html.1.2.html#__codelineno-22-2)    "name": "Crypto Prices",
    [](index.html.1.2.html#__codelineno-22-3)    "baseSelector": ".cds-tableRow-t45thuk",
    [](index.html.1.2.html#__codelineno-22-4)    "fields": [
    [](index.html.1.2.html#__codelineno-22-5)        {
    [](index.html.1.2.html#__codelineno-22-6)            "name": "crypto",
    [](index.html.1.2.html#__codelineno-22-7)            "selector": "td:nth-child(1) h2",
    [](index.html.1.2.html#__codelineno-22-8)            "type": "text",
    [](index.html.1.2.html#__codelineno-22-9)        },
    [](index.html.1.2.html#__codelineno-22-10)        {
    [](index.html.1.2.html#__codelineno-22-11)            "name": "price",
    [](index.html.1.2.html#__codelineno-22-12)            "selector": "td:nth-child(2)",
    [](index.html.1.2.html#__codelineno-22-13)            "type": "text",
    [](index.html.1.2.html#__codelineno-22-14)        }
    [](index.html.1.2.html#__codelineno-22-15)    ],
    [](index.html.1.2.html#__codelineno-22-16)}
    [](index.html.1.2.html#__codelineno-22-17)
    [](index.html.1.2.html#__codelineno-22-18)request = {
    [](index.html.1.2.html#__codelineno-22-19)    "urls": "https://www.coinbase.com/explore",
    [](index.html.1.2.html#__codelineno-22-20)    "extraction_config": {
    [](index.html.1.2.html#__codelineno-22-21)        "type": "json_css",
    [](index.html.1.2.html#__codelineno-22-22)        "params": {"schema": schema}
    [](index.html.1.2.html#__codelineno-22-23)    }
    [](index.html.1.2.html#__codelineno-22-24)}
    

### Dynamic Content Handling
    
    
    [](index.html.1.2.html#__codelineno-23-1)request = {
    [](index.html.1.2.html#__codelineno-23-2)    "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-23-3)    "js_code": [
    [](index.html.1.2.html#__codelineno-23-4)        "const loadMoreButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.includes('Load More')); loadMoreButton && loadMoreButton.click();"
    [](index.html.1.2.html#__codelineno-23-5)    ],
    [](index.html.1.2.html#__codelineno-23-6)    "wait_for": "article.tease-card:nth-child(10)"
    [](index.html.1.2.html#__codelineno-23-7)}
    

### AI-Powered Extraction (Full Version)
    
    
    [](index.html.1.2.html#__codelineno-24-1)request = {
    [](index.html.1.2.html#__codelineno-24-2)    "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-24-3)    "extraction_config": {
    [](index.html.1.2.html#__codelineno-24-4)        "type": "cosine",
    [](index.html.1.2.html#__codelineno-24-5)        "params": {
    [](index.html.1.2.html#__codelineno-24-6)            "semantic_filter": "business finance economy",
    [](index.html.1.2.html#__codelineno-24-7)            "word_count_threshold": 10,
    [](index.html.1.2.html#__codelineno-24-8)            "max_dist": 0.2,
    [](index.html.1.2.html#__codelineno-24-9)            "top_k": 3
    [](index.html.1.2.html#__codelineno-24-10)        }
    [](index.html.1.2.html#__codelineno-24-11)    }
    [](index.html.1.2.html#__codelineno-24-12)}
    

## Platform-Specific Instructions 💻

### macOS
    
    
    [](index.html.1.2.html#__codelineno-25-1)docker pull unclecode/crawl4ai:basic
    [](index.html.1.2.html#__codelineno-25-2)docker run -p 11235:11235 unclecode/crawl4ai:basic
    

### Ubuntu
    
    
    [](index.html.1.2.html#__codelineno-26-1)# Basic version
    [](index.html.1.2.html#__codelineno-26-2)docker pull unclecode/crawl4ai:basic
    [](index.html.1.2.html#__codelineno-26-3)docker run -p 11235:11235 unclecode/crawl4ai:basic
    [](index.html.1.2.html#__codelineno-26-4)
    [](index.html.1.2.html#__codelineno-26-5)# With GPU support
    [](index.html.1.2.html#__codelineno-26-6)docker pull unclecode/crawl4ai:gpu
    [](index.html.1.2.html#__codelineno-26-7)docker run --gpus all -p 11235:11235 unclecode/crawl4ai:gpu
    

### Windows (PowerShell)
    
    
    [](index.html.1.2.html#__codelineno-27-1)docker pull unclecode/crawl4ai:basic
    [](index.html.1.2.html#__codelineno-27-2)docker run -p 11235:11235 unclecode/crawl4ai:basic
    

## Testing 🧪

Save this as `test_docker.py`:
    
    
    [](index.html.1.2.html#__codelineno-28-1)import requests
    [](index.html.1.2.html#__codelineno-28-2)import json
    [](index.html.1.2.html#__codelineno-28-3)import time
    [](index.html.1.2.html#__codelineno-28-4)import sys
    [](index.html.1.2.html#__codelineno-28-5)
    [](index.html.1.2.html#__codelineno-28-6)class Crawl4AiTester:
    [](index.html.1.2.html#__codelineno-28-7)    def __init__(self, base_url: str = "http://localhost:11235"):
    [](index.html.1.2.html#__codelineno-28-8)        self.base_url = base_url
    [](index.html.1.2.html#__codelineno-28-9)
    [](index.html.1.2.html#__codelineno-28-10)    def submit_and_wait(self, request_data: dict, timeout: int = 300) -> dict:
    [](index.html.1.2.html#__codelineno-28-11)        # Submit crawl job
    [](index.html.1.2.html#__codelineno-28-12)        response = requests.post(f"{self.base_url}/crawl", json=request_data)
    [](index.html.1.2.html#__codelineno-28-13)        task_id = response.json()["task_id"]
    [](index.html.1.2.html#__codelineno-28-14)        print(f"Task ID: {task_id}")
    [](index.html.1.2.html#__codelineno-28-15)
    [](index.html.1.2.html#__codelineno-28-16)        # Poll for result
    [](index.html.1.2.html#__codelineno-28-17)        start_time = time.time()
    [](index.html.1.2.html#__codelineno-28-18)        while True:
    [](index.html.1.2.html#__codelineno-28-19)            if time.time() - start_time > timeout:
    [](index.html.1.2.html#__codelineno-28-20)                raise TimeoutError(f"Task {task_id} timeout")
    [](index.html.1.2.html#__codelineno-28-21)
    [](index.html.1.2.html#__codelineno-28-22)            result = requests.get(f"{self.base_url}/task/{task_id}")
    [](index.html.1.2.html#__codelineno-28-23)            status = result.json()
    [](index.html.1.2.html#__codelineno-28-24)
    [](index.html.1.2.html#__codelineno-28-25)            if status["status"] == "completed":
    [](index.html.1.2.html#__codelineno-28-26)                return status
    [](index.html.1.2.html#__codelineno-28-27)
    [](index.html.1.2.html#__codelineno-28-28)            time.sleep(2)
    [](index.html.1.2.html#__codelineno-28-29)
    [](index.html.1.2.html#__codelineno-28-30)def test_deployment():
    [](index.html.1.2.html#__codelineno-28-31)    tester = Crawl4AiTester()
    [](index.html.1.2.html#__codelineno-28-32)
    [](index.html.1.2.html#__codelineno-28-33)    # Test basic crawl
    [](index.html.1.2.html#__codelineno-28-34)    request = {
    [](index.html.1.2.html#__codelineno-28-35)        "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-28-36)        "priority": 10
    [](index.html.1.2.html#__codelineno-28-37)    }
    [](index.html.1.2.html#__codelineno-28-38)
    [](index.html.1.2.html#__codelineno-28-39)    result = tester.submit_and_wait(request)
    [](index.html.1.2.html#__codelineno-28-40)    print("Basic crawl successful!")
    [](index.html.1.2.html#__codelineno-28-41)    print(f"Content length: {len(result['result']['markdown'])}")
    [](index.html.1.2.html#__codelineno-28-42)
    [](index.html.1.2.html#__codelineno-28-43)if __name__ == "__main__":
    [](index.html.1.2.html#__codelineno-28-44)    test_deployment()
    

## Advanced Configuration ⚙️

### Crawler Parameters

The `crawler_params` field allows you to configure the browser instance and crawling behavior. Here are key parameters you can use:
    
    
    [](index.html.1.2.html#__codelineno-29-1)request = {
    [](index.html.1.2.html#__codelineno-29-2)    "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-29-3)    "crawler_params": {
    [](index.html.1.2.html#__codelineno-29-4)        # Browser Configuration
    [](index.html.1.2.html#__codelineno-29-5)        "headless": True,                    # Run in headless mode
    [](index.html.1.2.html#__codelineno-29-6)        "browser_type": "chromium",          # chromium/firefox/webkit
    [](index.html.1.2.html#__codelineno-29-7)        "user_agent": "custom-agent",        # Custom user agent
    [](index.html.1.2.html#__codelineno-29-8)        "proxy": "http://proxy:8080",        # Proxy configuration
    [](index.html.1.2.html#__codelineno-29-9)
    [](index.html.1.2.html#__codelineno-29-10)        # Performance & Behavior
    [](index.html.1.2.html#__codelineno-29-11)        "page_timeout": 30000,               # Page load timeout (ms)
    [](index.html.1.2.html#__codelineno-29-12)        "verbose": True,                     # Enable detailed logging
    [](index.html.1.2.html#__codelineno-29-13)        "semaphore_count": 5,               # Concurrent request limit
    [](index.html.1.2.html#__codelineno-29-14)
    [](index.html.1.2.html#__codelineno-29-15)        # Anti-Detection Features
    [](index.html.1.2.html#__codelineno-29-16)        "simulate_user": True,               # Simulate human behavior
    [](index.html.1.2.html#__codelineno-29-17)        "magic": True,                       # Advanced anti-detection
    [](index.html.1.2.html#__codelineno-29-18)        "override_navigator": True,          # Override navigator properties
    [](index.html.1.2.html#__codelineno-29-19)
    [](index.html.1.2.html#__codelineno-29-20)        # Session Management
    [](index.html.1.2.html#__codelineno-29-21)        "user_data_dir": "./browser-data",   # Browser profile location
    [](index.html.1.2.html#__codelineno-29-22)        "use_managed_browser": True,         # Use persistent browser
    [](index.html.1.2.html#__codelineno-29-23)    }
    [](index.html.1.2.html#__codelineno-29-24)}
    

### Extra Parameters

The `extra` field allows passing additional parameters directly to the crawler's `arun` function:
    
    
    [](index.html.1.2.html#__codelineno-30-1)request = {
    [](index.html.1.2.html#__codelineno-30-2)    "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-30-3)    "extra": {
    [](index.html.1.2.html#__codelineno-30-4)        "word_count_threshold": 10,          # Min words per block
    [](index.html.1.2.html#__codelineno-30-5)        "only_text": True,                   # Extract only text
    [](index.html.1.2.html#__codelineno-30-6)        "bypass_cache": True,                # Force fresh crawl
    [](index.html.1.2.html#__codelineno-30-7)        "process_iframes": True,             # Include iframe content
    [](index.html.1.2.html#__codelineno-30-8)    }
    [](index.html.1.2.html#__codelineno-30-9)}
    

### Complete Examples

1\. **Advanced News Crawling**
    
    
    [](index.html.1.2.html#__codelineno-31-1)request = {
    [](index.html.1.2.html#__codelineno-31-2)    "urls": "https://www.nbcnews.com/business",
    [](index.html.1.2.html#__codelineno-31-3)    "crawler_params": {
    [](index.html.1.2.html#__codelineno-31-4)        "headless": True,
    [](index.html.1.2.html#__codelineno-31-5)        "page_timeout": 30000,
    [](index.html.1.2.html#__codelineno-31-6)        "remove_overlay_elements": True      # Remove popups
    [](index.html.1.2.html#__codelineno-31-7)    },
    [](index.html.1.2.html#__codelineno-31-8)    "extra": {
    [](index.html.1.2.html#__codelineno-31-9)        "word_count_threshold": 50,          # Longer content blocks
    [](index.html.1.2.html#__codelineno-31-10)        "bypass_cache": True                 # Fresh content
    [](index.html.1.2.html#__codelineno-31-11)    },
    [](index.html.1.2.html#__codelineno-31-12)    "css_selector": ".article-body"
    [](index.html.1.2.html#__codelineno-31-13)}
    

2\. **Anti-Detection Configuration**
    
    
    [](index.html.1.2.html#__codelineno-32-1)request = {
    [](index.html.1.2.html#__codelineno-32-2)    "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-32-3)    "crawler_params": {
    [](index.html.1.2.html#__codelineno-32-4)        "simulate_user": True,
    [](index.html.1.2.html#__codelineno-32-5)        "magic": True,
    [](index.html.1.2.html#__codelineno-32-6)        "override_navigator": True,
    [](index.html.1.2.html#__codelineno-32-7)        "user_agent": "Mozilla/5.0 ...",
    [](index.html.1.2.html#__codelineno-32-8)        "headers": {
    [](index.html.1.2.html#__codelineno-32-9)            "Accept-Language": "en-US,en;q=0.9"
    [](index.html.1.2.html#__codelineno-32-10)        }
    [](index.html.1.2.html#__codelineno-32-11)    }
    [](index.html.1.2.html#__codelineno-32-12)}
    

3\. **LLM Extraction with Custom Parameters**
    
    
    [](index.html.1.2.html#__codelineno-33-1)request = {
    [](index.html.1.2.html#__codelineno-33-2)    "urls": "https://openai.com/pricing",
    [](index.html.1.2.html#__codelineno-33-3)    "extraction_config": {
    [](index.html.1.2.html#__codelineno-33-4)        "type": "llm",
    [](index.html.1.2.html#__codelineno-33-5)        "params": {
    [](index.html.1.2.html#__codelineno-33-6)            "provider": "openai/gpt-4",
    [](index.html.1.2.html#__codelineno-33-7)            "schema": pricing_schema
    [](index.html.1.2.html#__codelineno-33-8)        }
    [](index.html.1.2.html#__codelineno-33-9)    },
    [](index.html.1.2.html#__codelineno-33-10)    "crawler_params": {
    [](index.html.1.2.html#__codelineno-33-11)        "verbose": True,
    [](index.html.1.2.html#__codelineno-33-12)        "page_timeout": 60000
    [](index.html.1.2.html#__codelineno-33-13)    },
    [](index.html.1.2.html#__codelineno-33-14)    "extra": {
    [](index.html.1.2.html#__codelineno-33-15)        "word_count_threshold": 1,
    [](index.html.1.2.html#__codelineno-33-16)        "only_text": True
    [](index.html.1.2.html#__codelineno-33-17)    }
    [](index.html.1.2.html#__codelineno-33-18)}
    

4\. **Session-Based Dynamic Content**
    
    
    [](index.html.1.2.html#__codelineno-34-1)request = {
    [](index.html.1.2.html#__codelineno-34-2)    "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-34-3)    "crawler_params": {
    [](index.html.1.2.html#__codelineno-34-4)        "session_id": "dynamic_session",
    [](index.html.1.2.html#__codelineno-34-5)        "headless": False,
    [](index.html.1.2.html#__codelineno-34-6)        "page_timeout": 60000
    [](index.html.1.2.html#__codelineno-34-7)    },
    [](index.html.1.2.html#__codelineno-34-8)    "js_code": ["window.scrollTo(0, document.body.scrollHeight);"],
    [](index.html.1.2.html#__codelineno-34-9)    "wait_for": "js:() => document.querySelectorAll('.item').length > 10",
    [](index.html.1.2.html#__codelineno-34-10)    "extra": {
    [](index.html.1.2.html#__codelineno-34-11)        "delay_before_return_html": 2.0
    [](index.html.1.2.html#__codelineno-34-12)    }
    [](index.html.1.2.html#__codelineno-34-13)}
    

5\. **Screenshot with Custom Timing**
    
    
    [](index.html.1.2.html#__codelineno-35-1)request = {
    [](index.html.1.2.html#__codelineno-35-2)    "urls": "https://example.com",
    [](index.html.1.2.html#__codelineno-35-3)    "screenshot": True,
    [](index.html.1.2.html#__codelineno-35-4)    "crawler_params": {
    [](index.html.1.2.html#__codelineno-35-5)        "headless": True,
    [](index.html.1.2.html#__codelineno-35-6)        "screenshot_wait_for": ".main-content"
    [](index.html.1.2.html#__codelineno-35-7)    },
    [](index.html.1.2.html#__codelineno-35-8)    "extra": {
    [](index.html.1.2.html#__codelineno-35-9)        "delay_before_return_html": 3.0
    [](index.html.1.2.html#__codelineno-35-10)    }
    [](index.html.1.2.html#__codelineno-35-11)}
    

### Parameter Reference Table

Category | Parameter | Type | Description  
---|---|---|---  
Browser | headless | bool | Run browser in headless mode  
Browser | browser_type | str | Browser engine selection  
Browser | user_agent | str | Custom user agent string  
Network | proxy | str | Proxy server URL  
Network | headers | dict | Custom HTTP headers  
Timing | page_timeout | int | Page load timeout (ms)  
Timing | delay_before_return_html | float | Wait before capture  
Anti-Detection | simulate_user | bool | Human behavior simulation  
Anti-Detection | magic | bool | Advanced protection  
Session | session_id | str | Browser session ID  
Session | user_data_dir | str | Profile directory  
Content | word_count_threshold | int | Minimum words per block  
Content | only_text | bool | Text-only extraction  
Content | process_iframes | bool | Include iframe content  
Debug | verbose | bool | Detailed logging  
Debug | log_console | bool | Browser console logs  
  
## Troubleshooting 🔍

### Common Issues

1\. **Connection Refused**
    
    
    [](index.html.1.2.html#__codelineno-36-1)Error: Connection refused at localhost:11235
    

Solution: Ensure the container is running and ports are properly mapped.

2\. **Resource Limits**
    
    
    [](index.html.1.2.html#__codelineno-37-1)Error: No available slots
    

Solution: Increase MAX_CONCURRENT_TASKS or container resources.

3\. **GPU Access**
    
    
    [](index.html.1.2.html#__codelineno-38-1)Error: GPU not found
    

Solution: Ensure proper NVIDIA drivers and use `--gpus all` flag.

### Debug Mode

Access container for debugging: 
    
    
    [](index.html.1.2.html#__codelineno-39-1)docker run -it --entrypoint /bin/bash unclecode/crawl4ai:all
    

View container logs: 
    
    
    [](index.html.1.2.html#__codelineno-40-1)docker logs [container_id]
    

## Best Practices 🌟

1\. **Resource Management** \- Set appropriate memory and CPU limits \- Monitor resource usage via health endpoint \- Use basic version for simple crawling tasks

2\. **Scaling** \- Use multiple containers for high load \- Implement proper load balancing \- Monitor performance metrics

3\. **Security** \- Use environment variables for sensitive data \- Implement proper network isolation \- Regular security updates

## API Reference 📚

### Health Check
    
    
    [](index.html.1.2.html#__codelineno-41-1)GET /health
    

### Submit Crawl Task
    
    
    [](index.html.1.2.html#__codelineno-42-1)POST /crawl
    [](index.html.1.2.html#__codelineno-42-2)Content-Type: application/json
    [](index.html.1.2.html#__codelineno-42-3)
    [](index.html.1.2.html#__codelineno-42-4){
    [](index.html.1.2.html#__codelineno-42-5)    "urls": "string or array",
    [](index.html.1.2.html#__codelineno-42-6)    "extraction_config": {
    [](index.html.1.2.html#__codelineno-42-7)        "type": "basic|llm|cosine|json_css",
    [](index.html.1.2.html#__codelineno-42-8)        "params": {}
    [](index.html.1.2.html#__codelineno-42-9)    },
    [](index.html.1.2.html#__codelineno-42-10)    "priority": 1-10,
    [](index.html.1.2.html#__codelineno-42-11)    "ttl": 3600
    [](index.html.1.2.html#__codelineno-42-12)}
    

### Get Task Status
    
    
    [](index.html.1.2.html#__codelineno-43-1)GET /task/{task_id}
    

For more details, visit the [official documentation](index.md).

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
