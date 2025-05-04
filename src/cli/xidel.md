---
title: xidel | CLI
draft: false
categories:
  - CLI
tags:
  - HTML, XPath, CSS, Selectors, Scrape
---

# xidel - CLI Meets the Web

Xidel is a powerful command-line tool for extracting and processing data from websites, XML, and JSON using XPath, XQuery, and CSS selectors. Here’s a quick guide on how to use it:

## Basic Usage

The simplest way to extract data is by using the --extract (-e) option with an XPath or CSS selector.

1. Extracting Data from a URL

`xidel "https://example.com" -e "//title"`

Extracts the `<title>` element from the page.

2. Extracting Data from a File

`xidel "file.html" -e "//h1"`

Extracts all `<h1>` elements from the local HTML file.

3. Extracting Data from JSON

If the source is JSON, use XPath or XQuery expressions:

`xidel "data.json" -e ".users[0].name"`

Extracts the name field from the first user in a JSON file.

4. Using CSS Selectors

Instead of XPath, you can use CSS selectors:

`xidel "https://example.com" --css ".headline"`

Extracts elements with the class .headline.

### Downloading Content

You can download files using:

`xidel "https://example.com/image.jpg" --download=output.jpg`

or print the contents to stdout:

`xidel "https://example.com/data.json" --download=-`

### Advanced: Using Templates for Multi-page Scraping

If you want to extract data across multiple pages, use the template system:

`xidel "https://example.com/page1.html" --extract-kind=multipage --extract-file="template.txt"`

Where template.txt contains structured extraction logic.

### Combining Multiple Extracts

`xidel "https://example.com" -e "//title" -e "//meta[@name='description']/@content"`

Extracts both the title and meta description.

You can use Xidel to download the HTML of a webpage and all linked pages (from `<a href>` elements). Here’s how:

1. Download the Main Page’s HTML

`xidel "https://example.com" --download=main.html`

This saves the HTML of the main page as main.html.

2. Extract All Links (href attributes)

`xidel "https://example.com" -e "//a/@href"`

or using CSS selectors:

`xidel "https://example.com" --css "a[href]"`

This extracts and prints all the links from the page.

3. Download All Linked Pages

If you want to download all linked pages as well, you can combine extraction with downloading:

`xidel "https://example.com" -e "//a/@href" | xargs -I {} xidel "{}" --download="{}.html"`

> [!TIP]
> Extracts all <a href> links from the main page, then uses xargs to fetch and save each linked page.
