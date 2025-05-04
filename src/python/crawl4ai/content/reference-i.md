[Crawl4AI Documentation](index.md)

  * [ Home ](index.md)
  * [ Quick Start ](index.html.1.md)
  * [ __ Search ](index.html.1.23.html#)



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
    * SSL Certificate
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

  * [SSLCertificate Reference](index.html.1.23.html#sslcertificate-reference)
  * [1\. Overview](index.html.1.23.html#1-overview)
  * [2\. Construction & Fetching](index.html.1.23.html#2-construction-fetching)
  * [3\. Common Properties](index.html.1.23.html#3-common-properties)
  * [4\. Export Methods](index.html.1.23.html#4-export-methods)
  * [5\. Example Usage in Crawl4AI](index.html.1.23.html#5-example-usage-in-crawl4ai)
  * [6\. Notes & Best Practices](index.html.1.23.html#6-notes-best-practices)



# `SSLCertificate` Reference

The **`SSLCertificate`** class encapsulates an SSL certificate’s data and allows exporting it in various formats (PEM, DER, JSON, or text). It’s used within **Crawl4AI** whenever you set **`fetch_ssl_certificate=True`** in your **`CrawlerRunConfig`**. 

## 1\. Overview

**Location** : `crawl4ai/ssl_certificate.py`
    
    
    [](index.html.1.23.html#__codelineno-0-1)class SSLCertificate:
    [](index.html.1.23.html#__codelineno-0-2)    """
    [](index.html.1.23.html#__codelineno-0-3)    Represents an SSL certificate with methods to export in various formats.
    [](index.html.1.23.html#__codelineno-0-4)
    [](index.html.1.23.html#__codelineno-0-5)    Main Methods:
    [](index.html.1.23.html#__codelineno-0-6)    - from_url(url, timeout=10)
    [](index.html.1.23.html#__codelineno-0-7)    - from_file(file_path)
    [](index.html.1.23.html#__codelineno-0-8)    - from_binary(binary_data)
    [](index.html.1.23.html#__codelineno-0-9)    - to_json(filepath=None)
    [](index.html.1.23.html#__codelineno-0-10)    - to_pem(filepath=None)
    [](index.html.1.23.html#__codelineno-0-11)    - to_der(filepath=None)
    [](index.html.1.23.html#__codelineno-0-12)    ...
    [](index.html.1.23.html#__codelineno-0-13)
    [](index.html.1.23.html#__codelineno-0-14)    Common Properties:
    [](index.html.1.23.html#__codelineno-0-15)    - issuer
    [](index.html.1.23.html#__codelineno-0-16)    - subject
    [](index.html.1.23.html#__codelineno-0-17)    - valid_from
    [](index.html.1.23.html#__codelineno-0-18)    - valid_until
    [](index.html.1.23.html#__codelineno-0-19)    - fingerprint
    [](index.html.1.23.html#__codelineno-0-20)    """
    

### Typical Use Case

  1. You **enable** certificate fetching in your crawl by: 
    
        [](index.html.1.23.html#__codelineno-1-1)CrawlerRunConfig(fetch_ssl_certificate=True, ...)
    

  2. After `arun()`, if `result.ssl_certificate` is present, it’s an instance of **`SSLCertificate`**. 
  3. You can **read** basic properties (issuer, subject, validity) or **export** them in multiple formats.



* * *

## 2\. Construction & Fetching

### 2.1 **`from_url(url, timeout=10)`**

Manually load an SSL certificate from a given URL (port 443). Typically used internally, but you can call it directly if you want:
    
    
    [](index.html.1.23.html#__codelineno-2-1)cert = SSLCertificate.from_url("https://example.com")
    [](index.html.1.23.html#__codelineno-2-2)if cert:
    [](index.html.1.23.html#__codelineno-2-3)    print("Fingerprint:", cert.fingerprint)
    

### 2.2 **`from_file(file_path)`**

Load from a file containing certificate data in ASN.1 or DER. Rarely needed unless you have local cert files:
    
    
    [](index.html.1.23.html#__codelineno-3-1)cert = SSLCertificate.from_file("/path/to/cert.der")
    

### 2.3 **`from_binary(binary_data)`**

Initialize from raw binary. E.g., if you captured it from a socket or another source:
    
    
    [](index.html.1.23.html#__codelineno-4-1)cert = SSLCertificate.from_binary(raw_bytes)
    

* * *

## 3\. Common Properties

After obtaining a **`SSLCertificate`** instance (e.g. `result.ssl_certificate` from a crawl), you can read:

1\. **`issuer`** _(dict)_  
\- E.g. `{"CN": "My Root CA", "O": "..."}` 2\. **`subject`** _(dict)_  
\- E.g. `{"CN": "example.com", "O": "ExampleOrg"}` 3\. **`valid_from`** _(str)_  
\- NotBefore date/time. Often in ASN.1/UTC format. 4\. **`valid_until`** _(str)_  
\- NotAfter date/time. 5\. **`fingerprint`** _(str)_  
\- The SHA-256 digest (lowercase hex).  
\- E.g. `"d14d2e..."`

* * *

## 4\. Export Methods

Once you have a **`SSLCertificate`** object, you can **export** or **inspect** it:

### 4.1 **`to_json(filepath=None)` → `Optional[str]`**

  * Returns a JSON string containing the parsed certificate fields. 
  * If `filepath` is provided, saves it to disk instead, returning `None`.



**Usage** : 
    
    
    [](index.html.1.23.html#__codelineno-5-1)json_data = cert.to_json()  # returns JSON string
    [](index.html.1.23.html#__codelineno-5-2)cert.to_json("certificate.json")  # writes file, returns None
    

### 4.2 **`to_pem(filepath=None)` → `Optional[str]`**

  * Returns a PEM-encoded string (common for web servers). 
  * If `filepath` is provided, saves it to disk instead.


    
    
    [](index.html.1.23.html#__codelineno-6-1)pem_str = cert.to_pem()              # in-memory PEM string
    [](index.html.1.23.html#__codelineno-6-2)cert.to_pem("/path/to/cert.pem")     # saved to file
    

### 4.3 **`to_der(filepath=None)` → `Optional[bytes]`**

  * Returns the original DER (binary ASN.1) bytes. 
  * If `filepath` is specified, writes the bytes there instead.


    
    
    [](index.html.1.23.html#__codelineno-7-1)der_bytes = cert.to_der()
    [](index.html.1.23.html#__codelineno-7-2)cert.to_der("certificate.der")
    

### 4.4 (Optional) **`export_as_text()`**

  * If you see a method like `export_as_text()`, it typically returns an OpenSSL-style textual representation. 
  * Not always needed, but can help for debugging or manual inspection.



* * *

## 5\. Example Usage in Crawl4AI

Below is a minimal sample showing how the crawler obtains an SSL cert from a site, then reads or exports it. The code snippet:
    
    
    [](index.html.1.23.html#__codelineno-8-1)import asyncio
    [](index.html.1.23.html#__codelineno-8-2)import os
    [](index.html.1.23.html#__codelineno-8-3)from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
    [](index.html.1.23.html#__codelineno-8-4)
    [](index.html.1.23.html#__codelineno-8-5)async def main():
    [](index.html.1.23.html#__codelineno-8-6)    tmp_dir = "tmp"
    [](index.html.1.23.html#__codelineno-8-7)    os.makedirs(tmp_dir, exist_ok=True)
    [](index.html.1.23.html#__codelineno-8-8)
    [](index.html.1.23.html#__codelineno-8-9)    config = CrawlerRunConfig(
    [](index.html.1.23.html#__codelineno-8-10)        fetch_ssl_certificate=True,
    [](index.html.1.23.html#__codelineno-8-11)        cache_mode=CacheMode.BYPASS
    [](index.html.1.23.html#__codelineno-8-12)    )
    [](index.html.1.23.html#__codelineno-8-13)
    [](index.html.1.23.html#__codelineno-8-14)    async with AsyncWebCrawler() as crawler:
    [](index.html.1.23.html#__codelineno-8-15)        result = await crawler.arun("https://example.com", config=config)
    [](index.html.1.23.html#__codelineno-8-16)        if result.success and result.ssl_certificate:
    [](index.html.1.23.html#__codelineno-8-17)            cert = result.ssl_certificate
    [](index.html.1.23.html#__codelineno-8-18)            # 1. Basic Info
    [](index.html.1.23.html#__codelineno-8-19)            print("Issuer CN:", cert.issuer.get("CN", ""))
    [](index.html.1.23.html#__codelineno-8-20)            print("Valid until:", cert.valid_until)
    [](index.html.1.23.html#__codelineno-8-21)            print("Fingerprint:", cert.fingerprint)
    [](index.html.1.23.html#__codelineno-8-22)
    [](index.html.1.23.html#__codelineno-8-23)            # 2. Export
    [](index.html.1.23.html#__codelineno-8-24)            cert.to_json(os.path.join(tmp_dir, "certificate.json"))
    [](index.html.1.23.html#__codelineno-8-25)            cert.to_pem(os.path.join(tmp_dir, "certificate.pem"))
    [](index.html.1.23.html#__codelineno-8-26)            cert.to_der(os.path.join(tmp_dir, "certificate.der"))
    [](index.html.1.23.html#__codelineno-8-27)
    [](index.html.1.23.html#__codelineno-8-28)if __name__ == "__main__":
    [](index.html.1.23.html#__codelineno-8-29)    asyncio.run(main())
    

* * *

## 6\. Notes & Best Practices

1\. **Timeout** : `SSLCertificate.from_url` internally uses a default **10s** socket connect and wraps SSL.  
2\. **Binary Form** : The certificate is loaded in ASN.1 (DER) form, then re-parsed by `OpenSSL.crypto`.  
3\. **Validation** : This does **not** validate the certificate chain or trust store. It only fetches and parses.  
4\. **Integration** : Within Crawl4AI, you typically just set `fetch_ssl_certificate=True` in `CrawlerRunConfig`; the final result’s `ssl_certificate` is automatically built.  
5\. **Export** : If you need to store or analyze a cert, the `to_json` and `to_pem` are quite universal.

* * *

### Summary

  * **`SSLCertificate`** is a convenience class for capturing and exporting the **TLS certificate** from your crawled site(s). 
  * Common usage is in the **`CrawlResult.ssl_certificate`** field, accessible after setting `fetch_ssl_certificate=True`. 
  * Offers quick access to essential certificate details (`issuer`, `subject`, `fingerprint`) and is easy to export (PEM, DER, JSON) for further analysis or server usage.



Use it whenever you need **insight** into a site’s certificate or require some form of cryptographic or compliance check.

* * *

Site built with [MkDocs](http://www.mkdocs.org) and [Terminal for MkDocs](https://github.com/ntno/mkdocs-terminal). 

##### Search

xClose

Type to start searching
