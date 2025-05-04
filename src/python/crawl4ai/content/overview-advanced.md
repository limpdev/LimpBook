[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.14.html#)



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
    * Overview
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

  * [Overview of Some Important Advanced Features](index.html.1.14.html#overview-of-some-important-advanced-features)
  * [1\. Proxy Usage](index.html.1.14.html#1-proxy-usage)
  * [2\. Capturing PDFs & Screenshots](index.html.1.14.html#2-capturing-pdfs-screenshots)
  * [3\. Handling SSL Certificates](index.html.1.14.html#3-handling-ssl-certificates)
  * [4\. Custom Headers](index.html.1.14.html#4-custom-headers)
  * [5\. Session Persistence & Local Storage](index.html.1.14.html#5-session-persistence-local-storage)
  * [Putting It All Together](index.html.1.14.html#putting-it-all-together)
  * [Conclusion & Next Steps](index.html.1.14.html#conclusion-next-steps)



# Overview of Some Important Advanced Features

(Proxy, PDF, Screenshot, SSL, Headers, & Storage State)

Crawl4AI offers multiple power-user features that go beyond simple crawling. This tutorial covers:

1\. **Proxy Usage**  
2\. **Capturing PDFs & Screenshots**  
3\. **Handling SSL Certificates**  
4\. **Custom Headers**  
5\. **Session Persistence & Local Storage**

> **Prerequisites**  
>  \- You have a basic grasp of [AsyncWebCrawler Basics](index.html.1.4.md)  
>  \- You know how to run or configure your Python environment with Playwright installed

* * *

## 1\. Proxy Usage

If you need to route your crawl traffic through a proxy—whether for IP rotation, geo-testing, or privacy—Crawl4AI supports it via `BrowserConfig.proxy_config`.
    
    
    [](index.html.1.14.html#__codelineno-0-1)import asyncio
    [](index.html.1.14.html#__codelineno-0-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.14.html#__codelineno-0-3)
    [](index.html.1.14.html#__codelineno-0-4)async def main():
    [](index.html.1.14.html#__codelineno-0-5)    browser_cfg = BrowserConfig(
    [](index.html.1.14.html#__codelineno-0-6)        proxy_config={
    [](index.html.1.14.html#__codelineno-0-7)            "server": "http://proxy.example.com:8080",
    [](index.html.1.14.html#__codelineno-0-8)            "username": "myuser",
    [](index.html.1.14.html#__codelineno-0-9)            "password": "mypass",
    [](index.html.1.14.html#__codelineno-0-10)        },
    [](index.html.1.14.html#__codelineno-0-11)        headless=True
    [](index.html.1.14.html#__codelineno-0-12)    )
    [](index.html.1.14.html#__codelineno-0-13)    crawler_cfg = CrawlerRunConfig(
    [](index.html.1.14.html#__codelineno-0-14)        verbose=True
    [](index.html.1.14.html#__codelineno-0-15)    )
    [](index.html.1.14.html#__codelineno-0-16)
    [](index.html.1.14.html#__codelineno-0-17)    async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.14.html#__codelineno-0-18)        result = await crawler.arun(
    [](index.html.1.14.html#__codelineno-0-19)            url="https://www.whatismyip.com/",
    [](index.html.1.14.html#__codelineno-0-20)            config=crawler_cfg
    [](index.html.1.14.html#__codelineno-0-21)        )
    [](index.html.1.14.html#__codelineno-0-22)        if result.success:
    [](index.html.1.14.html#__codelineno-0-23)            print("[OK] Page fetched via proxy.")
    [](index.html.1.14.html#__codelineno-0-24)            print("Page HTML snippet:", result.html[:200])
    [](index.html.1.14.html#__codelineno-0-25)        else:
    [](index.html.1.14.html#__codelineno-0-26)            print("[ERROR]", result.error_message)
    [](index.html.1.14.html#__codelineno-0-27)
    [](index.html.1.14.html#__codelineno-0-28)if __name__ == "__main__":
    [](index.html.1.14.html#__codelineno-0-29)    asyncio.run(main())
    

**Key Points**  
\- **`proxy_config`** expects a dict with `server` and optional auth credentials.  
\- Many commercial proxies provide an HTTP/HTTPS “gateway” server that you specify in `server`.  
\- If your proxy doesn’t need auth, omit `username`/`password`.

* * *

## 2\. Capturing PDFs & Screenshots

Sometimes you need a visual record of a page or a PDF “printout.” Crawl4AI can do both in one pass:
    
    
    [](index.html.1.14.html#__codelineno-1-1)import os, asyncio
    [](index.html.1.14.html#__codelineno-1-2)from base64 import b64decode
    [](index.html.1.14.html#__codelineno-1-3)from crawl4ai import AsyncWebCrawler, CacheMode
    [](index.html.1.14.html#__codelineno-1-4)
    [](index.html.1.14.html#__codelineno-1-5)async def main():
    [](index.html.1.14.html#__codelineno-1-6)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.14.html#__codelineno-1-7)        result = await crawler.arun(
    [](index.html.1.14.html#__codelineno-1-8)            url="https://en.wikipedia.org/wiki/List_of_common_misconceptions",
    [](index.html.1.14.html#__codelineno-1-9)            cache_mode=CacheMode.BYPASS,
    [](index.html.1.14.html#__codelineno-1-10)            pdf=True,
    [](index.html.1.14.html#__codelineno-1-11)            screenshot=True
    [](index.html.1.14.html#__codelineno-1-12)        )
    [](index.html.1.14.html#__codelineno-1-13)
    [](index.html.1.14.html#__codelineno-1-14)        if result.success:
    [](index.html.1.14.html#__codelineno-1-15)            # Save screenshot
    [](index.html.1.14.html#__codelineno-1-16)            if result.screenshot:
    [](index.html.1.14.html#__codelineno-1-17)                with open("wikipedia_screenshot.png", "wb") as f:
    [](index.html.1.14.html#__codelineno-1-18)                    f.write(b64decode(result.screenshot))
    [](index.html.1.14.html#__codelineno-1-19)
    [](index.html.1.14.html#__codelineno-1-20)            # Save PDF
    [](index.html.1.14.html#__codelineno-1-21)            if result.pdf:
    [](index.html.1.14.html#__codelineno-1-22)                with open("wikipedia_page.pdf", "wb") as f:
    [](index.html.1.14.html#__codelineno-1-23)                    f.write(result.pdf)
    [](index.html.1.14.html#__codelineno-1-24)
    [](index.html.1.14.html#__codelineno-1-25)            print("[OK] PDF & screenshot captured.")
    [](index.html.1.14.html#__codelineno-1-26)        else:
    [](index.html.1.14.html#__codelineno-1-27)            print("[ERROR]", result.error_message)
    [](index.html.1.14.html#__codelineno-1-28)
    [](index.html.1.14.html#__codelineno-1-29)if __name__ == "__main__":
    [](index.html.1.14.html#__codelineno-1-30)    asyncio.run(main())
    

**Why PDF + Screenshot?**  
\- Large or complex pages can be slow or error-prone with “traditional” full-page screenshots.  
\- Exporting a PDF is more reliable for very long pages. Crawl4AI automatically converts the first PDF page into an image if you request both. 

**Relevant Parameters**  
\- **`pdf=True`** : Exports the current page as a PDF (base64-encoded in `result.pdf`).  
\- **`screenshot=True`** : Creates a screenshot (base64-encoded in `result.screenshot`).  
\- **`scan_full_page`** or advanced hooking can further refine how the crawler captures content.

* * *

## 3\. Handling SSL Certificates

If you need to verify or export a site’s SSL certificate—for compliance, debugging, or data analysis—Crawl4AI can fetch it during the crawl:
    
    
    [](index.html.1.14.html#__codelineno-2-1)import asyncio, os
    [](index.html.1.14.html#__codelineno-2-2)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.14.html#__codelineno-2-3)
    [](index.html.1.14.html#__codelineno-2-4)async def main():
    [](index.html.1.14.html#__codelineno-2-5)    tmp_dir = os.path.join(os.getcwd(), "tmp")
    [](index.html.1.14.html#__codelineno-2-6)    os.makedirs(tmp_dir, exist_ok=True)
    [](index.html.1.14.html#__codelineno-2-7)
    [](index.html.1.14.html#__codelineno-2-8)    config = CrawlerRunConfig(
    [](index.html.1.14.html#__codelineno-2-9)        fetch_ssl_certificate=True,
    [](index.html.1.14.html#__codelineno-2-10)        cache_mode=CacheMode.BYPASS
    [](index.html.1.14.html#__codelineno-2-11)    )
    [](index.html.1.14.html#__codelineno-2-12)
    [](index.html.1.14.html#__codelineno-2-13)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.14.html#__codelineno-2-14)        result = await crawler.arun(url="https://example.com", config=config)
    [](index.html.1.14.html#__codelineno-2-15)
    [](index.html.1.14.html#__codelineno-2-16)        if result.success and result.ssl_certificate:
    [](index.html.1.14.html#__codelineno-2-17)            cert = result.ssl_certificate
    [](index.html.1.14.html#__codelineno-2-18)            print("\nCertificate Information:")
    [](index.html.1.14.html#__codelineno-2-19)            print(f"Issuer (CN): {cert.issuer.get('CN', '')}")
    [](index.html.1.14.html#__codelineno-2-20)            print(f"Valid until: {cert.valid_until}")
    [](index.html.1.14.html#__codelineno-2-21)            print(f"Fingerprint: {cert.fingerprint}")
    [](index.html.1.14.html#__codelineno-2-22)
    [](index.html.1.14.html#__codelineno-2-23)            # Export in multiple formats:
    [](index.html.1.14.html#__codelineno-2-24)            cert.to_json(os.path.join(tmp_dir, "certificate.json"))
    [](index.html.1.14.html#__codelineno-2-25)            cert.to_pem(os.path.join(tmp_dir, "certificate.pem"))
    [](index.html.1.14.html#__codelineno-2-26)            cert.to_der(os.path.join(tmp_dir, "certificate.der"))
    [](index.html.1.14.html#__codelineno-2-27)
    [](index.html.1.14.html#__codelineno-2-28)            print("\nCertificate exported to JSON/PEM/DER in 'tmp' folder.")
    [](index.html.1.14.html#__codelineno-2-29)        else:
    [](index.html.1.14.html#__codelineno-2-30)            print("[ERROR] No certificate or crawl failed.")
    [](index.html.1.14.html#__codelineno-2-31)
    [](index.html.1.14.html#__codelineno-2-32)if __name__ == "__main__":
    [](index.html.1.14.html#__codelineno-2-33)    asyncio.run(main())
    

**Key Points**  
\- **`fetch_ssl_certificate=True`** triggers certificate retrieval.  
\- `result.ssl_certificate` includes methods (`to_json`, `to_pem`, `to_der`) for saving in various formats (handy for server config, Java keystores, etc.).

* * *

## 4\. Custom Headers

Sometimes you need to set custom headers (e.g., language preferences, authentication tokens, or specialized user-agent strings). You can do this in multiple ways:
    
    
    [](index.html.1.14.html#__codelineno-3-1)import asyncio
    [](index.html.1.14.html#__codelineno-3-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.14.html#__codelineno-3-3)
    [](index.html.1.14.html#__codelineno-3-4)async def main():
    [](index.html.1.14.html#__codelineno-3-5)    # Option 1: Set headers at the crawler strategy level
    [](index.html.1.14.html#__codelineno-3-6)    crawler1 = AsyncWebCrawler(
    [](index.html.1.14.html#__codelineno-3-7)        # The underlying strategy can accept headers in its constructor
    [](index.html.1.14.html#__codelineno-3-8)        crawler_strategy=None  # We'll override below for clarity
    [](index.html.1.14.html#__codelineno-3-9)    )
    [](index.html.1.14.html#__codelineno-3-10)    crawler1.crawler_strategy.update_user_agent("MyCustomUA/1.0")
    [](index.html.1.14.html#__codelineno-3-11)    crawler1.crawler_strategy.set_custom_headers({
    [](index.html.1.14.html#__codelineno-3-12)        "Accept-Language": "fr-FR,fr;q=0.9"
    [](index.html.1.14.html#__codelineno-3-13)    })
    [](index.html.1.14.html#__codelineno-3-14)    result1 = await crawler1.arun("https://www.example.com")
    [](index.html.1.14.html#__codelineno-3-15)    print("Example 1 result success:", result1.success)
    [](index.html.1.14.html#__codelineno-3-16)
    [](index.html.1.14.html#__codelineno-3-17)    # Option 2: Pass headers directly to `arun()`
    [](index.html.1.14.html#__codelineno-3-18)    crawler2 = AsyncWebCrawler()
    [](index.html.1.14.html#__codelineno-3-19)    result2 = await crawler2.arun(
    [](index.html.1.14.html#__codelineno-3-20)        url="https://www.example.com",
    [](index.html.1.14.html#__codelineno-3-21)        headers={"Accept-Language": "es-ES,es;q=0.9"}
    [](index.html.1.14.html#__codelineno-3-22)    )
    [](index.html.1.14.html#__codelineno-3-23)    print("Example 2 result success:", result2.success)
    [](index.html.1.14.html#__codelineno-3-24)
    [](index.html.1.14.html#__codelineno-3-25)if __name__ == "__main__":
    [](index.html.1.14.html#__codelineno-3-26)    asyncio.run(main())
    

**Notes**  
\- Some sites may react differently to certain headers (e.g., `Accept-Language`).  
\- If you need advanced user-agent randomization or client hints, see [Identity-Based Crawling (Anti-Bot)](index.html.1.22.md) or use `UserAgentGenerator`.

* * *

## 5\. Session Persistence & Local Storage

Crawl4AI can preserve cookies and localStorage so you can continue where you left off—ideal for logging into sites or skipping repeated auth flows.

### 5.1 `storage_state`
    
    
    [](index.html.1.14.html#__codelineno-4-1)import asyncio
    [](index.html.1.14.html#__codelineno-4-2)from crawl4ai import AsyncWebCrawler
    [](index.html.1.14.html#__codelineno-4-3)
    [](index.html.1.14.html#__codelineno-4-4)async def main():
    [](index.html.1.14.html#__codelineno-4-5)    storage_dict = {
    [](index.html.1.14.html#__codelineno-4-6)        "cookies": [
    [](index.html.1.14.html#__codelineno-4-7)            {
    [](index.html.1.14.html#__codelineno-4-8)                "name": "session",
    [](index.html.1.14.html#__codelineno-4-9)                "value": "abcd1234",
    [](index.html.1.14.html#__codelineno-4-10)                "domain": "example.com",
    [](index.html.1.14.html#__codelineno-4-11)                "path": "/",
    [](index.html.1.14.html#__codelineno-4-12)                "expires": 1699999999.0,
    [](index.html.1.14.html#__codelineno-4-13)                "httpOnly": False,
    [](index.html.1.14.html#__codelineno-4-14)                "secure": False,
    [](index.html.1.14.html#__codelineno-4-15)                "sameSite": "None"
    [](index.html.1.14.html#__codelineno-4-16)            }
    [](index.html.1.14.html#__codelineno-4-17)        ],
    [](index.html.1.14.html#__codelineno-4-18)        "origins": [
    [](index.html.1.14.html#__codelineno-4-19)            {
    [](index.html.1.14.html#__codelineno-4-20)                "origin": "https://example.com",
    [](index.html.1.14.html#__codelineno-4-21)                "localStorage": [
    [](index.html.1.14.html#__codelineno-4-22)                    {"name": "token", "value": "my_auth_token"}
    [](index.html.1.14.html#__codelineno-4-23)                ]
    [](index.html.1.14.html#__codelineno-4-24)            }
    [](index.html.1.14.html#__codelineno-4-25)        ]
    [](index.html.1.14.html#__codelineno-4-26)    }
    [](index.html.1.14.html#__codelineno-4-27)
    [](index.html.1.14.html#__codelineno-4-28)    # Provide the storage state as a dictionary to start "already logged in"
    [](index.html.1.14.html#__codelineno-4-29)    async with AsyncWebCrawler(
    [](index.html.1.14.html#__codelineno-4-30)        headless=True,
    [](index.html.1.14.html#__codelineno-4-31)        storage_state=storage_dict
    [](index.html.1.14.html#__codelineno-4-32)    ) as crawler:
    [](index.html.1.14.html#__codelineno-4-33)        result = await crawler.arun("https://example.com/protected")
    [](index.html.1.14.html#__codelineno-4-34)        if result.success:
    [](index.html.1.14.html#__codelineno-4-35)            print("Protected page content length:", len(result.html))
    [](index.html.1.14.html#__codelineno-4-36)        else:
    [](index.html.1.14.html#__codelineno-4-37)            print("Failed to crawl protected page")
    [](index.html.1.14.html#__codelineno-4-38)
    [](index.html.1.14.html#__codelineno-4-39)if __name__ == "__main__":
    [](index.html.1.14.html#__codelineno-4-40)    asyncio.run(main())
    

### 5.2 Exporting & Reusing State

You can sign in once, export the browser context, and reuse it later—without re-entering credentials.

  * **`await context.storage_state(path="my_storage.json")`** : Exports cookies, localStorage, etc. to a file. 
  * Provide `storage_state="my_storage.json"` on subsequent runs to skip the login step.



**See** : [Detailed session management tutorial](index.html.1.19.md) or [Explanations → Browser Context & Managed Browser](index.html.1.22.md) for more advanced scenarios (like multi-step logins, or capturing after interactive pages).

* * *

## Putting It All Together

Here’s a snippet that combines multiple “advanced” features (proxy, PDF, screenshot, SSL, custom headers, and session reuse) into one run. Normally, you’d tailor each setting to your project’s needs.
    
    
    [](index.html.1.14.html#__codelineno-5-1)import os, asyncio
    [](index.html.1.14.html#__codelineno-5-2)from base64 import b64decode
    [](index.html.1.14.html#__codelineno-5-3)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    [](index.html.1.14.html#__codelineno-5-4)
    [](index.html.1.14.html#__codelineno-5-5)async def main():
    [](index.html.1.14.html#__codelineno-5-6)    # 1. Browser config with proxy + headless
    [](index.html.1.14.html#__codelineno-5-7)    browser_cfg = BrowserConfig(
    [](index.html.1.14.html#__codelineno-5-8)        proxy_config={
    [](index.html.1.14.html#__codelineno-5-9)            "server": "http://proxy.example.com:8080",
    [](index.html.1.14.html#__codelineno-5-10)            "username": "myuser",
    [](index.html.1.14.html#__codelineno-5-11)            "password": "mypass",
    [](index.html.1.14.html#__codelineno-5-12)        },
    [](index.html.1.14.html#__codelineno-5-13)        headless=True,
    [](index.html.1.14.html#__codelineno-5-14)    )
    [](index.html.1.14.html#__codelineno-5-15)
    [](index.html.1.14.html#__codelineno-5-16)    # 2. Crawler config with PDF, screenshot, SSL, custom headers, and ignoring caches
    [](index.html.1.14.html#__codelineno-5-17)    crawler_cfg = CrawlerRunConfig(
    [](index.html.1.14.html#__codelineno-5-18)        pdf=True,
    [](index.html.1.14.html#__codelineno-5-19)        screenshot=True,
    [](index.html.1.14.html#__codelineno-5-20)        fetch_ssl_certificate=True,
    [](index.html.1.14.html#__codelineno-5-21)        cache_mode=CacheMode.BYPASS,
    [](index.html.1.14.html#__codelineno-5-22)        headers={"Accept-Language": "en-US,en;q=0.8"},
    [](index.html.1.14.html#__codelineno-5-23)        storage_state="my_storage.json",  # Reuse session from a previous sign-in
    [](index.html.1.14.html#__codelineno-5-24)        verbose=True,
    [](index.html.1.14.html#__codelineno-5-25)    )
    [](index.html.1.14.html#__codelineno-5-26)
    [](index.html.1.14.html#__codelineno-5-27)    # 3. Crawl
    [](index.html.1.14.html#__codelineno-5-28)    async with AsyncWebCrawler(config=browser_cfg) as crawler:
    [](index.html.1.14.html#__codelineno-5-29)        result = await crawler.arun(
    [](index.html.1.14.html#__codelineno-5-30)            url = "https://secure.example.com/protected", 
    [](index.html.1.14.html#__codelineno-5-31)            config=crawler_cfg
    [](index.html.1.14.html#__codelineno-5-32)        )
    [](index.html.1.14.html#__codelineno-5-33)
    [](index.html.1.14.html#__codelineno-5-34)        if result.success:
    [](index.html.1.14.html#__codelineno-5-35)            print("[OK] Crawled the secure page. Links found:", len(result.links.get("internal", [])))
    [](index.html.1.14.html#__codelineno-5-36)
    [](index.html.1.14.html#__codelineno-5-37)            # Save PDF & screenshot
    [](index.html.1.14.html#__codelineno-5-38)            if result.pdf:
    [](index.html.1.14.html#__codelineno-5-39)                with open("result.pdf", "wb") as f:
    [](index.html.1.14.html#__codelineno-5-40)                    f.write(b64decode(result.pdf))
    [](index.html.1.14.html#__codelineno-5-41)            if result.screenshot:
    [](index.html.1.14.html#__codelineno-5-42)                with open("result.png", "wb") as f:
    [](index.html.1.14.html#__codelineno-5-43)                    f.write(b64decode(result.screenshot))
    [](index.html.1.14.html#__codelineno-5-44)
    [](index.html.1.14.html#__codelineno-5-45)            # Check SSL cert
    [](index.html.1.14.html#__codelineno-5-46)            if result.ssl_certificate:
    [](index.html.1.14.html#__codelineno-5-47)                print("SSL Issuer CN:", result.ssl_certificate.issuer.get("CN", ""))
    [](index.html.1.14.html#__codelineno-5-48)        else:
    [](index.html.1.14.html#__codelineno-5-49)            print("[ERROR]", result.error_message)
    [](index.html.1.14.html#__codelineno-5-50)
    [](index.html.1.14.html#__codelineno-5-51)if __name__ == "__main__":
    [](index.html.1.14.html#__codelineno-5-52)    asyncio.run(main())
    

* * *

## Conclusion & Next Steps

You’ve now explored several **advanced** features:

  * **Proxy Usage**
  * **PDF & Screenshot** capturing for large or critical pages 
  * **SSL Certificate** retrieval & exporting 
  * **Custom Headers** for language or specialized requests 
  * **Session Persistence** via storage state



With these power tools, you can build robust scraping workflows that mimic real user behavior, handle secure sites, capture detailed snapshots, and manage sessions across multiple runs—streamlining your entire data collection pipeline.

**Last Updated** : 2025-01-01

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
