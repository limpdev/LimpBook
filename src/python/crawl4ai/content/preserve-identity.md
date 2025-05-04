[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.22.html#)



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
    * Identity Based Crawling
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

  * [Preserve Your Identity with Crawl4AI](index.html.1.22.html#preserve-your-identity-with-crawl4ai)
  * [1\. Managed Browsers: Your Digital Identity Solution](index.html.1.22.html#1-managed-browsers-your-digital-identity-solution)
  * [3\. Using Managed Browsers in Crawl4AI](index.html.1.22.html#3-using-managed-browsers-in-crawl4ai)
  * [4\. Magic Mode: Simplified Automation](index.html.1.22.html#4-magic-mode-simplified-automation)
  * [5\. Comparing Managed Browsers vs. Magic Mode](index.html.1.22.html#5-comparing-managed-browsers-vs-magic-mode)
  * [6\. Summary](index.html.1.22.html#6-summary)



# Preserve Your Identity with Crawl4AI

Crawl4AI empowers you to navigate and interact with the web using your **authentic digital identity** , ensuring you’re recognized as a human and not mistaken for a bot. This tutorial covers:

1\. **Managed Browsers** – The recommended approach for persistent profiles and identity-based crawling.  
2\. **Magic Mode** – A simplified fallback solution for quick automation without persistent identity.

* * *

## 1\. Managed Browsers: Your Digital Identity Solution

**Managed Browsers** let developers create and use **persistent browser profiles**. These profiles store local storage, cookies, and other session data, letting you browse as your **real self** —complete with logins, preferences, and cookies.

### Key Benefits

  * **Authentic Browsing Experience** : Retain session data and browser fingerprints as though you’re a normal user. 
  * **Effortless Configuration** : Once you log in or solve CAPTCHAs in your chosen data directory, you can re-run crawls without repeating those steps. 
  * **Empowered Data Access** : If you can see the data in your own browser, you can automate its retrieval with your genuine identity.



* * *

Below is a **partial update** to your **Managed Browsers** tutorial, specifically the section about **creating a user-data directory** using **Playwright’s Chromium** binary rather than a system-wide Chrome/Edge. We’ll show how to **locate** that binary and launch it with a `--user-data-dir` argument to set up your profile. You can then point `BrowserConfig.user_data_dir` to that folder for subsequent crawls.

* * *

### Creating a User Data Directory (Command-Line Approach via Playwright)

If you installed Crawl4AI (which installs Playwright under the hood), you already have a Playwright-managed Chromium on your system. Follow these steps to launch that **Chromium** from your command line, specifying a **custom** data directory:

1\. **Find** the Playwright Chromium binary: \- On most systems, installed browsers go under a `~/.cache/ms-playwright/` folder or similar path.  
\- To see an overview of installed browsers, run: 
    
    
    [](index.html.1.22.html#__codelineno-0-1)python -m playwright install --dry-run
    

or 
    
    
    [](index.html.1.22.html#__codelineno-1-1)playwright install --dry-run
    

(depending on your environment). This shows where Playwright keeps Chromium.

  * For instance, you might see a path like: 
    
        [](index.html.1.22.html#__codelineno-2-1)~/.cache/ms-playwright/chromium-1234/chrome-linux/chrome
    

on Linux, or a corresponding folder on macOS/Windows.



2\. **Launch** the Playwright Chromium binary with a **custom** user-data directory: 
    
    
    [](index.html.1.22.html#__codelineno-3-1)# Linux example
    [](index.html.1.22.html#__codelineno-3-2)~/.cache/ms-playwright/chromium-1234/chrome-linux/chrome \
    [](index.html.1.22.html#__codelineno-3-3)    --user-data-dir=/home/<you>/my_chrome_profile
    
    
    
    [](index.html.1.22.html#__codelineno-4-1)# macOS example (Playwright’s internal binary)
    [](index.html.1.22.html#__codelineno-4-2)~/Library/Caches/ms-playwright/chromium-1234/chrome-mac/Chromium.app/Contents/MacOS/Chromium \
    [](index.html.1.22.html#__codelineno-4-3)    --user-data-dir=/Users/<you>/my_chrome_profile
    
    
    
    [](index.html.1.22.html#__codelineno-5-1)# Windows example (PowerShell/cmd)
    [](index.html.1.22.html#__codelineno-5-2)"C:\Users\<you>\AppData\Local\ms-playwright\chromium-1234\chrome-win\chrome.exe" ^
    [](index.html.1.22.html#__codelineno-5-3)    --user-data-dir="C:\Users\<you>\my_chrome_profile"
    

**Replace** the path with the actual subfolder indicated in your `ms-playwright` cache structure.  
\- This **opens** a fresh Chromium with your new or existing data folder.  
\- **Log into** any sites or configure your browser the way you want.  
\- **Close** when done—your profile data is saved in that folder.

3\. **Use** that folder in **`BrowserConfig.user_data_dir`** : 
    
    
    [](index.html.1.22.html#__codelineno-6-1)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.22.html#__codelineno-6-2)
    [](index.html.1.22.html#__codelineno-6-3)browser_config = BrowserConfig(
    [](index.html.1.22.html#__codelineno-6-4)    headless=True,
    [](index.html.1.22.html#__codelineno-6-5)    use_managed_browser=True,
    [](index.html.1.22.html#__codelineno-6-6)    user_data_dir="/home/<you>/my_chrome_profile",
    [](index.html.1.22.html#__codelineno-6-7)    browser_type="chromium"
    [](index.html.1.22.html#__codelineno-6-8))
    

\- Next time you run your code, it reuses that folder—**preserving** your session data, cookies, local storage, etc.

* * *

## 3\. Using Managed Browsers in Crawl4AI

Once you have a data directory with your session data, pass it to **`BrowserConfig`** :
    
    
    [](index.html.1.22.html#__codelineno-7-1)import asyncio
    [](index.html.1.22.html#__codelineno-7-2)from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    [](index.html.1.22.html#__codelineno-7-3)
    [](index.html.1.22.html#__codelineno-7-4)async def main():
    [](index.html.1.22.html#__codelineno-7-5)    # 1) Reference your persistent data directory
    [](index.html.1.22.html#__codelineno-7-6)    browser_config = BrowserConfig(
    [](index.html.1.22.html#__codelineno-7-7)        headless=True,             # 'True' for automated runs
    [](index.html.1.22.html#__codelineno-7-8)        verbose=True,
    [](index.html.1.22.html#__codelineno-7-9)        use_managed_browser=True,  # Enables persistent browser strategy
    [](index.html.1.22.html#__codelineno-7-10)        browser_type="chromium",
    [](index.html.1.22.html#__codelineno-7-11)        user_data_dir="/path/to/my-chrome-profile"
    [](index.html.1.22.html#__codelineno-7-12)    )
    [](index.html.1.22.html#__codelineno-7-13)
    [](index.html.1.22.html#__codelineno-7-14)    # 2) Standard crawl config
    [](index.html.1.22.html#__codelineno-7-15)    crawl_config = CrawlerRunConfig(
    [](index.html.1.22.html#__codelineno-7-16)        wait_for="css:.logged-in-content"
    [](index.html.1.22.html#__codelineno-7-17)    )
    [](index.html.1.22.html#__codelineno-7-18)
    [](index.html.1.22.html#__codelineno-7-19)    async with AsyncWebCrawler(config=browser_config) as crawler:
    [](index.html.1.22.html#__codelineno-7-20)        result = await crawler.arun(url="https://example.com/private", config=crawl_config)
    [](index.html.1.22.html#__codelineno-7-21)        if result.success:
    [](index.html.1.22.html#__codelineno-7-22)            print("Successfully accessed private data with your identity!")
    [](index.html.1.22.html#__codelineno-7-23)        else:
    [](index.html.1.22.html#__codelineno-7-24)            print("Error:", result.error_message)
    [](index.html.1.22.html#__codelineno-7-25)
    [](index.html.1.22.html#__codelineno-7-26)if __name__ == "__main__":
    [](index.html.1.22.html#__codelineno-7-27)    asyncio.run(main())
    

### Workflow

1\. **Login** externally (via CLI or your normal Chrome with `--user-data-dir=...`).  
2\. **Close** that browser.  
3\. **Use** the same folder in `user_data_dir=` in Crawl4AI.  
4\. **Crawl** – The site sees your identity as if you’re the same user who just logged in.

* * *

## 4\. Magic Mode: Simplified Automation

If you **don’t** need a persistent profile or identity-based approach, **Magic Mode** offers a quick way to simulate human-like browsing without storing long-term data.
    
    
    [](index.html.1.22.html#__codelineno-8-1)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    [](index.html.1.22.html#__codelineno-8-2)
    [](index.html.1.22.html#__codelineno-8-3)async with AsyncWebCrawler() as crawler:
    [](index.html.1.22.html#__codelineno-8-4)    result = await crawler.arun(
    [](index.html.1.22.html#__codelineno-8-5)        url="https://example.com",
    [](index.html.1.22.html#__codelineno-8-6)        config=CrawlerRunConfig(
    [](index.html.1.22.html#__codelineno-8-7)            magic=True,  # Simplifies a lot of interaction
    [](index.html.1.22.html#__codelineno-8-8)            remove_overlay_elements=True,
    [](index.html.1.22.html#__codelineno-8-9)            page_timeout=60000
    [](index.html.1.22.html#__codelineno-8-10)        )
    [](index.html.1.22.html#__codelineno-8-11)    )
    

**Magic Mode** :

  * Simulates a user-like experience 
  * Randomizes user agent & navigator
  * Randomizes interactions & timings 
  * Masks automation signals 
  * Attempts pop-up handling 



**But** it’s no substitute for **true** user-based sessions if you want a fully legitimate identity-based solution.

* * *

## 5\. Comparing Managed Browsers vs. Magic Mode

Feature | **Managed Browsers** | **Magic Mode**  
---|---|---  
**Session Persistence** | Full localStorage/cookies retained in user_data_dir | No persistent data (fresh each run)  
**Genuine Identity** | Real user profile with full rights & preferences | Emulated user-like patterns, but no actual identity  
**Complex Sites** | Best for login-gated sites or heavy config | Simple tasks, minimal login or config needed  
**Setup** | External creation of user_data_dir, then use in Crawl4AI | Single-line approach (`magic=True`)  
**Reliability** | Extremely consistent (same data across runs) | Good for smaller tasks, can be less stable  
  
* * *

## 6\. Summary

  * **Create** your user-data directory by launching Chrome/Chromium externally with `--user-data-dir=/some/path`. 
  * **Log in** or configure sites as needed, then close the browser. 
  * **Reference** that folder in `BrowserConfig(user_data_dir="...")` \+ `use_managed_browser=True`. 
  * Enjoy **persistent** sessions that reflect your real identity. 
  * If you only need quick, ephemeral automation, **Magic Mode** might suffice.



**Recommended** : Always prefer a **Managed Browser** for robust, identity-based crawling and simpler interactions with complex sites. Use **Magic Mode** for quick tasks or prototypes where persistent data is unnecessary.

With these approaches, you preserve your **authentic** browsing environment, ensuring the site sees you exactly as a normal user—no repeated logins or wasted time.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
