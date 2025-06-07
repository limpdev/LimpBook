# [Colly](https://go-colly.org/)

Colly is a Golang framework for building web scrapers. With Colly you can build web scrapers of various complexity, from simple scraper to complex asynchronous website crawlers processing millions of web pages. Colly provides an API for performing network requests and for handling the received content (e.g. interacting with DOM tree of the HTML document).

Below you will find some of the most common and helpful pages from our documentation.

- [Installation guide](introduction/install/index.html)
- [Getting started](introduction/start/index.html)
- [Basic scraper example](examples/basic/index.html)

Also, check out [GoDoc](https://godoc.org/github.com/gocolly/colly) for API reference.

# Getting started

Before working with Colly ensure that you have the latest version. See [installation guide](../install/index.html) for more details.

Let’s get started with some simple examples.

First, you need to import Colly to your codebase:

```go
import "github.com/gocolly/colly"
```

## Collector

Colly’s main entity is a `Collector` object. `Collector` manages the network communication and responsible for the execution of the attached callbacks while a collector job is running. To work with colly, you have to initialize a `Collector`:

```go
c := colly.NewCollector()
```

## Callbacks

You can attach different type of callback functions to a `Collector` to control a collecting job or retrieve information. Check out the [related section](https://godoc.org/github.com/gocolly/colly#Collector.OnError) in the package documentation.

### Add callbacks to a `Collector`

```go
c.OnRequest(func(r *colly.Request) {
    fmt.Println("Visiting", r.URL)
})

c.OnError(func(_ *colly.Response, err error) {
    log.Println("Something went wrong:", err)
})

c.OnResponseHeaders(func(r *colly.Response) {
    fmt.Println("Visited", r.Request.URL)
})

c.OnResponse(func(r *colly.Response) {
    fmt.Println("Visited", r.Request.URL)
})

c.OnHTML("a[href]", func(e *colly.HTMLElement) {
    e.Request.Visit(e.Attr("href"))
})

c.OnHTML("tr td:nth-of-type(1)", func(e *colly.HTMLElement) {
    fmt.Println("First column of a table row:", e.Text)
})

c.OnXML("//h1", func(e *colly.XMLElement) {
    fmt.Println(e.Text)
})

c.OnScraped(func(r *colly.Response) {
    fmt.Println("Finished", r.Request.URL)
})
```

### Call order of callbacks

| Case                | Definition                                                         |
| :------------------ | :----------------------------------------------------------------- |
| `OnRequest`         | Called before a request                                            |
| `OnError`           | Called if error occured during the request                         |
| `OnResponseHeaders` | Called after response headers received                             |
| `OnResponse`        | Called after response received                                     |
| `OnHTML`            | Called right after `OnResponse` if the received content is HTML    |
| `OnXML`             | Called right after `OnHTML` if the received content is HTML or XML |
| `OnScraped`         | Called after `OnXML` callbacks                                     |

# How to install

Colly has only one prerequisite and that is Golang programming language. You can install it using their [installation guide](https://golang.org/doc/install).

### Install Colly

Type following command on Terminal and hit enter to install Colly.

```bash
go get -u github.com/gocolly/colly/...
```

# Configuration

Colly is a highly customizable scraping framework. It has sane defaults and provides plenty of options to change them.

## Collector configuration

Full list of collector attributes can be found [here](https://godoc.org/github.com/gocolly/colly#Collector). The recommended way to initialize a collector is using `colly.NewCollector(options...)`.

Create a collector with default settings:

```go
c1 := colly.NewCollector()
```

Create another collector and change User-Agent and url revisit options:

```go
c2 := colly.NewCollector(
	colly.UserAgent("xy"),
	colly.AllowURLRevisit(),
)
```

_or_

```go
c2 := colly.NewCollector()
c2.UserAgent = "xy"
c2.AllowURLRevisit = true
```

Configuration can be changed at any point of a scraping job by overwriting the attributes of the collectors. A good example is a User-Agent switcher which changes User-Agent on every request:

```go
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandomString() string {
	b := make([]byte, rand.Intn(10)+10)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

c := colly.NewCollector()

c.OnRequest(func(r *colly.Request) {
	r.Headers.Set("User-Agent", RandomString())
})
```

## Configuration via environment variables

Collector’s default configuration can be changed via environment variables. This allows us to fine-tune collectors without recompile. Environment parsing is the last step of the collector initialization, so every configuration change after the initialization overrides the config parsed from environment.

### Environment config variables

```bash
COLLY_ALLOWED_DOMAINS						(comma separated list of domains)
COLLY_CACHE_DIR							(string)
COLLY_DETECT_CHARSET						(bool)
COLLY_DISABLE_COOKIES						(bool)
COLLY_DISALLOWED_DOMAINS					(comma separated list of domains)
COLLY_IGNORE_ROBOTSTXT						(bool)
COLLY_FOLLOW_REDIRECTS						(bool)
COLLY_MAX_BODY_SIZE						(int)
COLLY_MAX_DEPTH							(int - 0 means infinite)
COLLY_PARSE_HTTP_ERROR_RESPONSE					(bool)
COLLY_USER_AGENT						(string)
```

## HTTP configuration

Colly uses Golang’s default [http client](https://godoc.org/net/http) as networking layer. HTTP options can be tweaked by changing the default [HTTP roundtripper](https://godoc.org/net/http#RoundTripper).

```go
c := colly.NewCollector()
c.WithTransport(&http.Transport{
	Proxy: http.ProxyFromEnvironment,
	DialContext: (&net.Dialer{
		Timeout:   30 * time.Second,
		KeepAlive: 30 * time.Second,
		DualStack: true,
	}).DialContext,
	MaxIdleConns:          100,
	IdleConnTimeout:       90 * time.Second,
	TLSHandshakeTimeout:   10 * time.Second,
	ExpectContinueTimeout: 1 * time.Second,
}
```

# Storage backend

 `Colly` has an **in-memory storage backend** to store **cookies** and visited URLs, but it can be overwritten by any custom storage backend which implements [colly/storage.Storage](https://godoc.org/github.com/gocolly/colly/storage#Storage).

## Existing Storage Backends

- [In-Memory Backend](https://godoc.org/github.com/gocolly/colly/storage#InMemoryStorage)
    - _The default backend of Colly. Use [collector.SetStorage()](https://godoc.org/github.com/gocolly/colly#Collector.SetStorage) to override._
- [Redis backend](https://github.com/gocolly/redisstorage)
    - _See [redis example](../examples/redis_backend.1.html) for details._
- [boltdb backend](https://github.com/earlzo/colly-bolt-storage)
- [SQLite3 backend](https://github.com/velebak/colly-sqlite3-storage)
- [MongoDB backend](https://github.com/zolamk/colly-mongo-storage)
- [PostgreSQL backend](https://github.com/zolamk/colly-postgres-storage)

## Crawler configuration

> Colly’s default configuration is optimized for scraping smaller number of sites in one job. This setup isn’t the best if you’d like to crawl millions of sites. Here are some tweaks:

> _Use persistent storage backend_ → by default, `Colly` stores cookies and visited URLs in memory. You can replace the built-in in-memory storage backend with any custom backend. See more details [here](https://godoc.org/github.com/gocolly/colly/storage).

> _Use async for long running jobs with recursive calls_ → by default, `Colly` blocks while the request isn’t finished, so recursively calling `Collector.Visit` from callbacks produces constantly growing stack. With `Collector.Async = true` this can be avoided. (Don’t forget to use `c.Wait()` with async.)

> _Disable or limit connection keep-alive_ → `Colly` uses HTTP keep-alive to enhance scraping speed. It requires open file descriptors, so max-fd limit can be easily reached with long running jobs.

HTTP Keep-alive can be disabled with the following code:

```go
c := colly.NewCollector()
c.WithTransport(&http.Transport{
    DisableKeepAlives: true,
})
```

# Debugging

Sometimes it’s enough to place some `log.Println()` function calls to your callbacks, but sometimes it isn’t. Colly has built-in abilities for collector debug. A debugger interface and different kind of debugger implementations are available.

## Attach debugger to a collector

Attaching a basic logging debugger requires the `debug` (`github.com/gocolly/colly/debug`) package from Colly’s repo.

```go
import (
	"github.com/gocolly/colly"
	"github.com/gocolly/colly/debug"
)

func main() {
    c := colly.NewCollector(colly.Debugger(&debug.LogDebugger{}))
    // [..]
}
```

## Implement a custom debugger

You can create any kind of custom debugger by implementing the [debug.Debugger](https://godoc.org/github.com/gocolly/colly/debug#Debugger) interface. A good example is [LogDebugger](https://github.com/gocolly/colly/blob/master/debug/logdebugger.go).

## Distributed scraping

Distributed scraping can be implemented in different ways depending on what the requirements of the scraping task are. Most of the time it’s enough to scale the network communication layer which can be easily achieved using proxies and Colly’s proxy switchers.

### Proxy switchers

Using proxy switchers scraping still remains centralized while the HTTP requests are distributed among multiple proxies. Colly supports proxy switching via its’ `SetProxyFunc()` member. Any custom function can be passed to `SetProxyFunc()` with the signature of `func(*http.Request) (*url.URL, error)`.

::: tip
SSH servers can be used as socks5 proxies with the `-D` flag. `Colly` has a built-in proxy switcher which rotates a list of proxies on every request.
:::

### Usage

```go
package main

import (
	"github.com/gocolly/colly"
	"github.com/gocolly/colly/proxy"
)

func main() {
	c := colly.NewCollector()

	if p, err := proxy.RoundRobinProxySwitcher(
		"socks5://127.0.0.1:1337",
		"socks5://127.0.0.1:1338",
		"http://127.0.0.1:8080",
	); err == nil {
		c.SetProxyFunc(p)
	}
	// ...
}
```

_Implementing custom proxy switcher:_

```go
var proxies []*url.URL = []*url.URL{
	&url.URL{Host: "127.0.0.1:8080"},
	&url.URL{Host: "127.0.0.1:8081"},
}

func randomProxySwitcher(_ *http.Request) (*url.URL, error) {
	return proxies[random.Intn(len(proxies))], nil
}

// ...
c.SetProxyFunc(randomProxySwitcher)
```

### Distributed Scrapers

To manage independent and distributed scrapers the best you can do is wrapping the scraper in a server. Server can be any kind of service like HTTP, TCP servers or Google App Engine. Use custom [storage](../storage.1.html) to achieve centralized and persistent cookie and visited url handling.

::: tip
Colly has built-in Google App Engine support. Don't forget to call `Collector.Appengine(*http.Request)` if you use Colly from App Engine standard environment. An example implementation can be found [here](../../examples/scraper_server.1.html).
:::

### Distributed Storage

Visited URL and cookie data are stored in-memory by default. This is handy for short living scraper jobs, but it can be a serious limitation when dealing with large scale or long running crawling jobs.

Colly has the ability to replace the default in-memory storage with any storage backend which implements [colly/storage.Storage](https://godoc.org/github.com/gocolly/colly/storage#Storage) interface. Check out [existing storages](../storage.1.html).

## Extensions

Extensions are small helper utilities shipped with Colly. List of plugins is available [here](https://godoc.org/github.com/gocolly/colly/extensions).

## Usage

The following example enables the random User-Agent switcher and the Referrer setter extension and visits httpbin.org twice.

```go
import (
    "log"

    "github.com/gocolly/colly"
    "github.com/gocolly/colly/extensions"
)

func main() {
    c := colly.NewCollector()
    visited := false

    extensions.RandomUserAgent(c)
    extensions.Referer(c)

    c.OnResponse(func(r *colly.Response) {
        log.Println(string(r.Body))
        if !visited {
            visited = true
            r.Request.Visit("/get?q=2")
        }
    })

    c.Visit("http://httpbin.org/get")
}
```

## Using multiple collectors

It is advised to use multiple collectors for one scraping jobs if the task is complex enough or has different kind of subtasks. A good example is [coursera course scraper](../../examples/coursera_courses.1.html) where two collectors are used - one parses the list views and handles paging and the other one collects course details.

Colly has some built-in methods to support the usage of multiple collectors.

::: tip
Use `collector.ID` in debugging to distinguish different collectors
:::

## Cloning collectors

You can use the `Clone()` method of a collector if collectors have similar configuration. `Clone()` duplicates a collector with identical configuration but without the attached callbacks.

```go
c := colly.NewCollector(
	colly.UserAgent("myUserAgent"),
	colly.AllowedDomains("foo.com", "bar.com"),
)
// Custom User-Agent and allowed domains are cloned to c2
c2 := c.Clone()
```

## Passing custom data between collectors

Use collector’s `Request()` function to be able to share context with other collectors.

Example of sharing context:

```go
c.OnResponse(func(r *colly.Response) {
	r.Ctx.Put(r.Headers.Get("Custom-Header"))
	c2.Request("GET", "https://foo.com/", nil, r.Ctx, nil)
})
```

## Storage backend

Colly has an in-memory storage backend to store cookies and visited URLs, but it can be overwritten by any custom storage backend which implements [colly/storage.Storage](https://godoc.org/github.com/gocolly/colly/storage#Storage).

## Existing Storage Backends

- [In-Memory Backend](https://godoc.org/github.com/gocolly/colly/storage#InMemoryStorage)
    - The default backend of Colly. Use [collector.SetStorage()](https://godoc.org/github.com/gocolly/colly#Collector.SetStorage) to override.
- [Redis backend](https://github.com/gocolly/redisstorage)
    - See [redis example](../../examples/redis_backend.1.html) for details.
- [boltdb backend](https://github.com/earlzo/colly-bolt-storage)
- [SQLite3 backend](https://github.com/velebak/colly-sqlite3-storage)
- [MongoDB backend](https://github.com/zolamk/colly-mongo-storage)
- [PostgreSQL backend](https://github.com/zolamk/colly-postgres-storage)

## Basic

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("hackerspaces.org", "wiki.hackerspaces.org"),
	)

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		// Print link
		fmt.Printf("Link found: %q -> %s\n", e.Text, link)
		// Visit link found on page
		// Only those links are visited which are in AllowedDomains
		c.Visit(e.Request.AbsoluteURL(link))
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// Start scraping on https://hackerspaces.org
	c.Visit("https://hackerspaces.org/")
}
```

## Coursera courses

```go
package main

import (
	"encoding/json"
	"log"
	"os"
	"strings"

	"github.com/gocolly/colly"
)

// Course stores information about a coursera course
type Course struct {
	Title       string
	Description string
	Creator     string
	Level       string
	URL         string
	Language    string
	Commitment  string
	HowToPass   string
	Rating      string
}

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: coursera.org, www.coursera.org
		colly.AllowedDomains("coursera.org", "www.coursera.org"),

		// Cache responses to prevent multiple download of pages
		// even if the collector is restarted
		colly.CacheDir("./coursera_cache"),
	)

	// Create another collector to scrape course details
	detailCollector := c.Clone()

	courses := make([]Course, 0, 200)

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		// If attribute class is this long string return from callback
		// As this a is irrelevant
		if e.Attr("class") == "Button_1qxkboh-o_O-primary_cv02ee-o_O-md_28awn8-o_O-primaryLink_109aggg" {
			return
		}
		link := e.Attr("href")
		// If link start with browse or includes either signup or login return from callback
		if !strings.HasPrefix(link, "/browse") || strings.Index(link, "=signup") > -1 || strings.Index(link, "=login") > -1 {
			return
		}
		// start scaping the page under the link found
		e.Request.Visit(link)
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		log.Println("visiting", r.URL.String())
	})

	// On every a HTML element which has name attribute call callback
	c.OnHTML(`a[name]`, func(e *colly.HTMLElement) {
		// Activate detailCollector if the link contains "coursera.org/learn"
		courseURL := e.Request.AbsoluteURL(e.Attr("href"))
		if strings.Index(courseURL, "coursera.org/learn") != -1 {
			detailCollector.Visit(courseURL)
		}
	})

	// Extract details of the course
	detailCollector.OnHTML(`div[id=rendered-content]`, func(e *colly.HTMLElement) {
		log.Println("Course found", e.Request.URL)
		title := e.ChildText(".course-title")
		if title == "" {
			log.Println("No title found", e.Request.URL)
		}
		course := Course{
			Title:       title,
			URL:         e.Request.URL.String(),
			Description: e.ChildText("div.content"),
			Creator:     e.ChildText("div.creator-names > span"),
		}
		// Iterate over rows of the table which contains different information
		// about the course
		e.ForEach("table.basic-info-table tr", func(_ int, el *colly.HTMLElement) {
			switch el.ChildText("td:first-child") {
			case "Language":
				course.Language = el.ChildText("td:nth-child(2)")
			case "Level":
				course.Level = el.ChildText("td:nth-child(2)")
			case "Commitment":
				course.Commitment = el.ChildText("td:nth-child(2)")
			case "How To Pass":
				course.HowToPass = el.ChildText("td:nth-child(2)")
			case "User Ratings":
				course.Rating = el.ChildText("td:nth-child(2) div:nth-of-type(2)")
			}
		})
		courses = append(courses, course)
	})

	// Start scraping on http://coursera.com/browse
	c.Visit("https://coursera.org/browse")

	enc := json.NewEncoder(os.Stdout)
	enc.SetIndent("", "  ")

	// Dump json to the standard output
	enc.Encode(courses)
}
```

## Coursera courses

```go
package main

import (
	"encoding/json"
	"log"
	"os"
	"strings"

	"github.com/gocolly/colly"
)

// Course stores information about a coursera course
type Course struct {
	Title       string
	Description string
	Creator     string
	Level       string
	URL         string
	Language    string
	Commitment  string
	HowToPass   string
	Rating      string
}

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: coursera.org, www.coursera.org
		colly.AllowedDomains("coursera.org", "www.coursera.org"),

		// Cache responses to prevent multiple download of pages
		// even if the collector is restarted
		colly.CacheDir("./coursera_cache"),
	)

	// Create another collector to scrape course details
	detailCollector := c.Clone()

	courses := make([]Course, 0, 200)

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		// If attribute class is this long string return from callback
		// As this a is irrelevant
		if e.Attr("class") == "Button_1qxkboh-o_O-primary_cv02ee-o_O-md_28awn8-o_O-primaryLink_109aggg" {
			return
		}
		link := e.Attr("href")
		// If link start with browse or includes either signup or login return from callback
		if !strings.HasPrefix(link, "/browse") || strings.Index(link, "=signup") > -1 || strings.Index(link, "=login") > -1 {
			return
		}
		// start scaping the page under the link found
		e.Request.Visit(link)
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		log.Println("visiting", r.URL.String())
	})

	// On every a HTML element which has name attribute call callback
	c.OnHTML(`a[name]`, func(e *colly.HTMLElement) {
		// Activate detailCollector if the link contains "coursera.org/learn"
		courseURL := e.Request.AbsoluteURL(e.Attr("href"))
		if strings.Index(courseURL, "coursera.org/learn") != -1 {
			detailCollector.Visit(courseURL)
		}
	})

	// Extract details of the course
	detailCollector.OnHTML(`div[id=rendered-content]`, func(e *colly.HTMLElement) {
		log.Println("Course found", e.Request.URL)
		title := e.ChildText(".course-title")
		if title == "" {
			log.Println("No title found", e.Request.URL)
		}
		course := Course{
			Title:       title,
			URL:         e.Request.URL.String(),
			Description: e.ChildText("div.content"),
			Creator:     e.ChildText("div.creator-names > span"),
		}
		// Iterate over rows of the table which contains different information
		// about the course
		e.ForEach("table.basic-info-table tr", func(_ int, el *colly.HTMLElement) {
			switch el.ChildText("td:first-child") {
			case "Language":
				course.Language = el.ChildText("td:nth-child(2)")
			case "Level":
				course.Level = el.ChildText("td:nth-child(2)")
			case "Commitment":
				course.Commitment = el.ChildText("td:nth-child(2)")
			case "How To Pass":
				course.HowToPass = el.ChildText("td:nth-child(2)")
			case "User Ratings":
				course.Rating = el.ChildText("td:nth-child(2) div:nth-of-type(2)")
			}
		})
		courses = append(courses, course)
	})

	// Start scraping on http://coursera.com/browse
	c.Visit("https://coursera.org/browse")

	enc := json.NewEncoder(os.Stdout)
	enc.SetIndent("", "  ")

	// Dump json to the standard output
	enc.Encode(courses)
}
```

## Cryptocoins market capacity

```go
package main

import (
	"encoding/csv"
	"log"
	"os"

	"github.com/gocolly/colly"
)

func main() {
	fName := "cryptocoinmarketcap.csv"
	file, err := os.Create(fName)
	if err != nil {
		log.Fatalf("Cannot create file %q: %s\n", fName, err)
		return
	}
	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Write CSV header
	writer.Write([]string{"Name", "Symbol", "Price (USD)", "Volume (USD)", "Market capacity (USD)", "Change (1h)", "Change (24h)", "Change (7d)"})

	// Instantiate default collector
	c := colly.NewCollector()

	c.OnHTML("#currencies-all tbody tr", func(e *colly.HTMLElement) {
		writer.Write([]string{
			e.ChildText(".currency-name-container"),
			e.ChildText(".col-symbol"),
			e.ChildAttr("a.price", "data-usd"),
			e.ChildAttr("a.volume", "data-usd"),
			e.ChildAttr(".market-cap", "data-usd"),
			e.ChildText(".percent-1h"),
			e.ChildText(".percent-24h"),
			e.ChildText(".percent-7d"),
		})
	})

	c.Visit("https://coinmarketcap.com/all/views/all/")

	log.Printf("Scraping finished, check file %q for results\n", fName)
}
```

## Error handling

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
)

func main() {
	// Create a collector
	c := colly.NewCollector()

	// Set HTML callback
	// Won't be called if error occurs
	c.OnHTML("*", func(e *colly.HTMLElement) {
		fmt.Println(e)
	})

	// Set error handler
	c.OnError(func(r *colly.Response, err error) {
		fmt.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	// Start scraping
	c.Visit("https://definitely-not-a.website/")
}
```

# Factbase

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"

	"github.com/gocolly/colly"
)

var baseSearchURL = "https://factba.se/json/json-transcript.php?q=&f=&dt=&p="
var baseTranscriptURL = "https://factba.se/transcript/"

type result struct {
	Slug string `json:"slug"`
	Date string `json:"date"`
}

type results struct {
	Data []*result `json:"data"`
}

type transcript struct {
	Speaker string
	Text    string
}

func main() {
	c := colly.NewCollector(
		colly.AllowedDomains("factba.se"),
	)

	d := c.Clone()

	d.OnHTML("body", func(e *colly.HTMLElement) {
		t := make([]transcript, 0)
		e.ForEach(".topic-media-row", func(_ int, el *colly.HTMLElement) {
			t = append(t, transcript{
				Speaker: el.ChildText(".speaker-label"),
				Text:    el.ChildText(".transcript-text-block"),
			})
		})
		jsonData, err := json.MarshalIndent(t, "", "  ")
		if err != nil {
			return
		}
		ioutil.WriteFile(colly.SanitizeFileName(e.Request.Ctx.Get("date")+"_"+e.Request.Ctx.Get("slug"))+".json", jsonData, 0644)
	})

	stop := false
	c.OnResponse(func(r *colly.Response) {
		rs := &results{}
		err := json.Unmarshal(r.Body, rs)
		if err != nil || len(rs.Data) == 0 {
			stop = true
			return
		}
		for _, res := range rs.Data {
			u := baseTranscriptURL + res.Slug
			ctx := colly.NewContext()
			ctx.Put("date", res.Date)
			ctx.Put("slug", res.Slug)
			d.Request("GET", u, nil, ctx, nil)
		}
	})

	for i := 1; i < 1000; i++ {
		if stop {
			break
		}
		if err := c.Visit(baseSearchURL + strconv.Itoa(i)); err != nil {
			fmt.Println("Error:", err)
			break
		}
	}
}
```

## Google groups

```go
package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"
	"strings"

	"github.com/gocolly/colly"
)

// Mail is the container of a single e-mail
type Mail struct {
	Title   string
	Link    string
	Author  string
	Date    string
	Message string
}

func main() {
	var groupName string
	flag.StringVar(&groupName, "group", "hspbp", "Google Groups group name")
	flag.Parse()

	threads := make(map[string][]Mail)

	threadCollector := colly.NewCollector()
	mailCollector := colly.NewCollector()

	// Collect threads
	threadCollector.OnHTML("tr", func(e *colly.HTMLElement) {
		ch := e.DOM.Children()
		author := ch.Eq(1).Text()
		// deleted topic
		if author == "" {
			return
		}

		title := ch.Eq(0).Text()
		link, _ := ch.Eq(0).Children().Eq(0).Attr("href")
		// fix link to point to the pure HTML version of the thread
		link = strings.Replace(link, ".com/d/topic", ".com/forum/?_escaped_fragment_=topic", 1)
		date := ch.Eq(2).Text()

		log.Printf("Thread found: %s %q %s %s\n", link, title, author, date)
		mailCollector.Visit(link)
	})

	// Visit next page
	threadCollector.OnHTML("body > a[href]", func(e *colly.HTMLElement) {
		log.Println("Next page link found:", e.Attr("href"))
		e.Request.Visit(e.Attr("href"))
	})

	// Extract mails
	mailCollector.OnHTML("body", func(e *colly.HTMLElement) {
		// Find subject
		threadSubject := e.ChildText("h2")
		if _, ok := threads[threadSubject]; !ok {
			threads[threadSubject] = make([]Mail, 0, 8)
		}

		// Extract mails
		e.ForEach("table tr", func(_ int, el *colly.HTMLElement) {
			mail := Mail{
				Title:   el.ChildText("td:nth-of-type(1)"),
				Link:    el.ChildAttr("td:nth-of-type(1)", "href"),
				Author:  el.ChildText("td:nth-of-type(2)"),
				Date:    el.ChildText("td:nth-of-type(3)"),
				Message: el.ChildText("td:nth-of-type(4)"),
			}
			threads[threadSubject] = append(threads[threadSubject], mail)
		})

		// Follow next page link
		if link, found := e.DOM.Find("> a[href]").Attr("href"); found {
			e.Request.Visit(link)
		} else {
			log.Printf("Thread %q done\n", threadSubject)
		}
	})

	threadCollector.Visit("https://groups.google.com/forum/?_escaped_fragment_=forum/" + groupName)

	enc := json.NewEncoder(os.Stdout)
	enc.SetIndent("", "  ")

	// Dump json to the standard output
	enc.Encode(threads)
}
```

# Hackernews comments

```go
package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/gocolly/colly"
)

type comment struct {
	Author  string `selector:"a.hnuser"`
	URL     string `selector:".age a[href]" attr:"href"`
	Comment string `selector:".comment"`
	Replies []*comment
	depth   int
}

func main() {
	var itemID string
	flag.StringVar(&itemID, "id", "", "hackernews post id")
	flag.Parse()

	if itemID == "" {
		log.Println("Hackernews post id required")
		os.Exit(1)
	}

	comments := make([]*comment, 0)

	// Instantiate default collector
	c := colly.NewCollector()

	// Extract comment
	c.OnHTML(".comment-tree tr.athing", func(e *colly.HTMLElement) {
		width, err := strconv.Atoi(e.ChildAttr("td.ind img", "width"))
		if err != nil {
			return
		}
		// hackernews uses 40px spacers to indent comment replies,
		// so we have to divide the width with it to get the depth
		// of the comment
		depth := width / 40
		c := &comment{
			Replies: make([]*comment, 0),
			depth:   depth,
		}
		e.Unmarshal(c)
		c.Comment = strings.TrimSpace(c.Comment[:len(c.Comment)-5])
		if depth == 0 {
			comments = append(comments, c)
			return
		}
		parent := comments[len(comments)-1]
		// append comment to its parent
		for i := 0; i < depth-1; i++ {
			parent = parent.Replies[len(parent.Replies)-1]
		}
		parent.Replies = append(parent.Replies, c)
	})

	c.Visit("https://news.ycombinator.com/item?id=" + itemID)

	enc := json.NewEncoder(os.Stdout)
	enc.SetIndent("", "  ")

	// Dump json to the standard output
	enc.Encode(comments)
}
```

# Instagram images

```go
package main

import (
	"bytes"
	"crypto/md5"
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/gocolly/colly"
)

// found in https://www.instagram.com/static/bundles/en_US_Commons.js/68e7390c5938.js
// included from profile page
const instagramQueryId = "42323d64886122307be10013ad2dcc45"

// "id": user id, "after": end cursor
const nextPageURL string = `https://www.instagram.com/graphql/query/?query_hash=%s&variables=%s`
const nextPagePayload string = `{"id":"%s","first":12,"after":"%s"}`

var requestID string

type pageInfo struct {
	EndCursor string `json:"end_cursor"`
	NextPage  bool   `json:"has_next_page"`
}

type mainPageData struct {
	Rhxgis    string `json:"rhx_gis"`
	EntryData struct {
		ProfilePage []struct {
			Graphql struct {
				User struct {
					Id    string `json:"id"`
					Media struct {
						Edges []struct {
							Node struct {
								ImageURL     string `json:"display_url"`
								ThumbnailURL string `json:"thumbnail_src"`
								IsVideo      bool   `json:"is_video"`
								Date         int    `json:"date"`
								Dimensions   struct {
									Width  int `json:"width"`
									Height int `json:"height"`
								} `json:"dimensions"`
							} `json::node"`
						} `json:"edges"`
						PageInfo pageInfo `json:"page_info"`
					} `json:"edge_owner_to_timeline_media"`
				} `json:"user"`
			} `json:"graphql"`
		} `json:"ProfilePage"`
	} `json:"entry_data"`
}

type nextPageData struct {
	Data struct {
		User struct {
			Container struct {
				PageInfo pageInfo `json:"page_info"`
				Edges    []struct {
					Node struct {
						ImageURL     string `json:"display_url"`
						ThumbnailURL string `json:"thumbnail_src"`
						IsVideo      bool   `json:"is_video"`
						Date         int    `json:"taken_at_timestamp"`
						Dimensions   struct {
							Width  int `json:"width"`
							Height int `json:"height"`
						}
					}
				} `json:"edges"`
			} `json:"edge_owner_to_timeline_media"`
		}
	} `json:"data"`
}

func main() {
	if len(os.Args) != 2 {
		log.Println("Missing account name argument")
		os.Exit(1)
	}

	var actualUserId string
	instagramAccount := os.Args[1]
	outputDir := fmt.Sprintf("./instagram_%s/", instagramAccount)

	c := colly.NewCollector(
		//colly.CacheDir("./_instagram_cache/"),
		colly.UserAgent("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"),
	)

	c.OnRequest(func(r *colly.Request) {
		r.Headers.Set("X-Requested-With", "XMLHttpRequest")
		r.Headers.Set("Referrer", "https://www.instagram.com/"+instagramAccount)
		if r.Ctx.Get("gis") != "" {
			gis := fmt.Sprintf("%s:%s", r.Ctx.Get("gis"), r.Ctx.Get("variables"))
			h := md5.New()
			h.Write([]byte(gis))
			gisHash := fmt.Sprintf("%x", h.Sum(nil))
			r.Headers.Set("X-Instagram-GIS", gisHash)
		}
	})

	c.OnHTML("html", func(e *colly.HTMLElement) {
		d := c.Clone()
		d.OnResponse(func(r *colly.Response) {
			idStart := bytes.Index(r.Body, []byte(`:n},queryId:"`))
			requestID = string(r.Body[idStart+13 : idStart+45])
		})
		requestIDURL := e.Request.AbsoluteURL(e.ChildAttr(`link[as="script"]`, "href"))
		d.Visit(requestIDURL)

		dat := e.ChildText("body > script:first-of-type")
		jsonData := dat[strings.Index(dat, "{") : len(dat)-1]
		data := &mainPageData{}
		err := json.Unmarshal([]byte(jsonData), data)
		if err != nil {
			log.Fatal(err)
		}

		log.Println("saving output to ", outputDir)
		os.MkdirAll(outputDir, os.ModePerm)
		page := data.EntryData.ProfilePage[0]
		actualUserId = page.Graphql.User.Id
		for _, obj := range page.Graphql.User.Media.Edges {
			// skip videos
			if obj.Node.IsVideo {
				continue
			}
			c.Visit(obj.Node.ImageURL)
		}
		nextPageVars := fmt.Sprintf(nextPagePayload, actualUserId, page.Graphql.User.Media.PageInfo.EndCursor)
		e.Request.Ctx.Put("variables", nextPageVars)
		if page.Graphql.User.Media.PageInfo.NextPage {
			u := fmt.Sprintf(
				nextPageURL,
				requestID,
				url.QueryEscape(nextPageVars),
			)
			log.Println("Next page found", u)
			e.Request.Ctx.Put("gis", data.Rhxgis)
			e.Request.Visit(u)
		}
	})

	c.OnError(func(r *colly.Response, e error) {
		log.Println("error:", e, r.Request.URL, string(r.Body))
	})

	c.OnResponse(func(r *colly.Response) {
		if strings.Index(r.Headers.Get("Content-Type"), "image") > -1 {
			r.Save(outputDir + r.FileName())
			return
		}

		if strings.Index(r.Headers.Get("Content-Type"), "json") == -1 {
			return
		}

		data := &nextPageData{}
		err := json.Unmarshal(r.Body, data)
		if err != nil {
			log.Fatal(err)
		}

		for _, obj := range data.Data.User.Container.Edges {
			// skip videos
			if obj.Node.IsVideo {
				continue
			}
			c.Visit(obj.Node.ImageURL)
		}
		if data.Data.User.Container.PageInfo.NextPage {
			nextPageVars := fmt.Sprintf(nextPagePayload, actualUserId, data.Data.User.Container.PageInfo.EndCursor)
			r.Request.Ctx.Put("variables", nextPageVars)
			u := fmt.Sprintf(
				nextPageURL,
				requestID,
				url.QueryEscape(nextPageVars),
			)
			log.Println("Next page found", u)
			r.Request.Visit(u)
		}
	})

	c.Visit("https://instagram.com/" + instagramAccount)
}
```

# Login

```go
package main

import (
	"log"

	"github.com/gocolly/colly"
)

func main() {
	// create a new collector
	c := colly.NewCollector()

	// authenticate
	err := c.Post("http://example.com/login", map[string]string{"username": "admin", "password": "admin"})
	if err != nil {
		log.Fatal(err)
	}

	// attach callbacks after login
	c.OnResponse(func(r *colly.Response) {
		log.Println("response received", r.StatusCode)
	})

	// start scraping
	c.Visit("https://example.com/")
}
```

# Max depth

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// MaxDepth is 1, so only the links on the scraped page
		// is visited, and no further links are followed
		colly.MaxDepth(1),
	)

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		// Print link
		fmt.Println(link)
		// Visit link found on page
		e.Request.Visit(link)
	})

	// Start scraping on https://en.wikipedia.org
	c.Visit("https://en.wikipedia.org/")
}
```

# Multipart

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/gocolly/colly"
)

func generateFormData() map[string][]byte {
	f, _ := os.Open("gocolly.jpg")
	defer f.Close()

	imgData, _ := ioutil.ReadAll(f)

	return map[string][]byte{
		"firstname": []byte("one"),
		"lastname":  []byte("two"),
		"email":     []byte("onetwo@example.com"),
		"file":      imgData,
	}
}

func setupServer() {
	var handler http.HandlerFunc = func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("received request")
		err := r.ParseMultipartForm(10000000)
		if err != nil {
			fmt.Println("server: Error")
			w.WriteHeader(500)
			w.Write([]byte("<html><body>Internal Server Error</body></html>"))
			return
		}
		w.WriteHeader(200)
		fmt.Println("server: OK")
		w.Write([]byte("<html><body>Success</body></html>"))
	}

	go http.ListenAndServe(":8080", handler)
}

func main() {
	// Start a single route http server to post an image to.
	setupServer()

	c := colly.NewCollector(colly.AllowURLRevisit(), colly.MaxDepth(5))

	// On every a element which has href attribute call callback
	c.OnHTML("html", func(e *colly.HTMLElement) {
		fmt.Println(e.Text)
		time.Sleep(1 * time.Second)
		e.Request.PostMultipart("http://localhost:8080/", generateFormData())
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Posting gocolly.jpg to", r.URL.String())
	})

	// Start scraping
	c.PostMultipart("http://localhost:8080/", generateFormData())
	c.Wait()
}
```

# Openedx courses

```go
package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

// DATE_FORMAT default format date used in openedx
const DATE_FORMAT = "Jan 02, 2006"

// Course store openedx course data
type Course struct {
	CourseID  string
	Run       string
	Name      string
	Number    string
	StartDate *time.Time
	EndDate   *time.Time
	URL       string
}

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Using IndonesiaX as sample
		colly.AllowedDomains("indonesiax.co.id", "www.indonesiax.co.id"),

		// Cache responses to prevent multiple download of pages
		// even if the collector is restarted
		colly.CacheDir("./cache"),
	)

	courses := make([]Course, 0, 200)

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		if !strings.HasPrefix(link, "/courses/") {
			return
		}
		// start scaping the page under the link found
		e.Request.Visit(link)
	})

	c.OnHTML("div[class=content-wrapper]", func(e *colly.HTMLElement) {
		if e.DOM.Find("section.course-info").Length() == 0 {
			return
		}
		title := strings.Split(e.ChildText(".course-title"), "\n")[0]
		course_id := e.ChildAttr("input[name=course_id]", "value")
		start_date, _ := time.Parse(DATE_FORMAT, e.ChildText("span.start-date"))
		end_date, _ := time.Parse(DATE_FORMAT, e.ChildText("span.final-date"))
		var run string
		if len(strings.Split(course_id, "_")) > 1 {
			run = strings.Split(course_id, "_")[1]
		}
		course := Course{
			CourseID:  course_id,
			Run:       run,
			Name:      title,
			Number:    e.ChildText("span.course-number"),
			StartDate: &start_date,
			EndDate:   &end_date,
			URL:       fmt.Sprintf("/courses/%s/about", course_id),
		}
		courses = append(courses, course)
	})

	// Start scraping on https://openedxdomain/courses
	c.Visit("https://www.indonesiax.co.id/courses")

	// Convert results to JSON data if the scraping job has finished
	jsonData, err := json.MarshalIndent(courses, "", "  ")
	if err != nil {
		panic(err)
	}

	// Dump json to the standard output (can be redirected to a file)
	fmt.Println(string(jsonData))
}
```

# Parallel

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// MaxDepth is 2, so only the links on the scraped page
		// and links on those pages are visited
		colly.MaxDepth(2),
		colly.Async(true),
	)

	// Limit the maximum parallelism to 2
	// This is necessary if the goroutines are dynamically
	// created to control the limit of simultaneous requests.
	//
	// Parallelism can be controlled also by spawning fixed
	// number of go routines.
	c.Limit(&colly.LimitRule{DomainGlob: "*", Parallelism: 2})

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		// Print link
		fmt.Println(link)
		// Visit link found on page on a new thread
		e.Request.Visit(link)
	})

	// Start scraping on https://en.wikipedia.org
	c.Visit("https://en.wikipedia.org/")
	// Wait until threads are finished
	c.Wait()
}
```

# Proxy switcher

```go
package main

import (
	"bytes"
	"log"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/proxy"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector(colly.AllowURLRevisit())

	// Rotate two socks5 proxies
	rp, err := proxy.RoundRobinProxySwitcher("socks5://127.0.0.1:1337", "socks5://127.0.0.1:1338")
	if err != nil {
		log.Fatal(err)
	}
	c.SetProxyFunc(rp)

	// Print the response
	c.OnResponse(func(r *colly.Response) {
		log.Printf("%s\n", bytes.Replace(r.Body, []byte("\n"), nil, -1))
	})

	// Fetch httpbin.org/ip five times
	for i := 0; i < 5; i++ {
		c.Visit("https://httpbin.org/ip")
	}
}
```

# Queue

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/queue"
)

func main() {
	url := "https://httpbin.org/delay/1"

	// Instantiate default collector
	c := colly.NewCollector()

	// create a request queue with 2 consumer threads
	q, _ := queue.New(
		2, // Number of consumer threads
		&queue.InMemoryQueueStorage{MaxSize: 10000}, // Use default queue storage
	)

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("visiting", r.URL)
	})

	for i := 0; i < 5; i++ {
		// Add URLs to the queue
		q.AddURL(fmt.Sprintf("%s?n=%d", url, i))
	}
	// Consume URLs
	q.Run(c)

}
```

# Random delay

```go
package main

import (
	"fmt"
	"time"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/debug"
)

func main() {
	url := "https://httpbin.org/delay/2"

	// Instantiate default collector
	c := colly.NewCollector(
		// Attach a debugger to the collector
		colly.Debugger(&debug.LogDebugger{}),
		colly.Async(true),
	)

	// Limit the number of threads started by colly to two
	// when visiting links which domains' matches "*httpbin.*" glob
	c.Limit(&colly.LimitRule{
		DomainGlob:  "*httpbin.*",
		Parallelism: 2,
		RandomDelay: 5 * time.Second,
	})

	// Start scraping in four threads on https://httpbin.org/delay/2
	for i := 0; i < 4; i++ {
		c.Visit(fmt.Sprintf("%s?n=%d", url, i))
	}
	// Start scraping on https://httpbin.org/delay/2
	c.Visit(url)
	// Wait until threads are finished
	c.Wait()
}
```

# Rate limit

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/debug"
)

func main() {
	url := "https://httpbin.org/delay/2"

	// Instantiate default collector
	c := colly.NewCollector(
		// Turn on asynchronous requests
		colly.Async(true),
		// Attach a debugger to the collector
		colly.Debugger(&debug.LogDebugger{}),
	)

	// Limit the number of threads started by colly to two
	// when visiting links which domains' matches "*httpbin.*" glob
	c.Limit(&colly.LimitRule{
		DomainGlob:  "*httpbin.*",
		Parallelism: 2,
		//Delay:      5 * time.Second,
	})

	// Start scraping in five threads on https://httpbin.org/delay/2
	for i := 0; i < 5; i++ {
		c.Visit(fmt.Sprintf("%s?n=%d", url, i))
	}
	// Wait until threads are finished
	c.Wait()
}
```

# Reddit

```go
package main

import (
	"fmt"
	"os"
	"time"

	"github.com/gocolly/colly"
)

type item struct {
	StoryURL  string
	Source    string
	comments  string
	CrawledAt time.Time
	Comments  string
	Title     string
}

func main() {
	stories := []item{}
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: reddit.com
		colly.AllowedDomains("www.reddit.com"),
		colly.Async(true),
	)

	// On every a element which has .top-matter attribute call callback
	// This class is unique to the div that holds all information about a story
	c.OnHTML(".top-matter", func(e *colly.HTMLElement) {
		temp := item{}
		temp.StoryURL = e.ChildAttr("a[data-event-action=title]", "href")
		temp.Source = "https://www.reddit.com/r/programming/"
		temp.Title = e.ChildText("a[data-event-action=title]")
		temp.Comments = e.ChildAttr("a[data-event-action=comments]", "href")
		temp.CrawledAt = time.Now()
		stories = append(stories, temp)
	})

	// On every span tag with the class next-button
	c.OnHTML("span.next-button", func(h *colly.HTMLElement) {
		t := h.ChildAttr("a", "href")
		c.Visit(t)
	})

	// Set max Parallelism and introduce a Random Delay
	c.Limit(&colly.LimitRule{
		Parallelism: 2,
		RandomDelay: 5 * time.Second,
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())

	})

	// Crawl all reddits the user passes in
	reddits := os.Args[1:]
	for _, reddit := range reddits {
		c.Visit(reddit)

	}

	c.Wait()
	fmt.Println(stories)

}
```

# Redis backend

```go
package main

import (
	"log"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/queue"
	"github.com/gocolly/redisstorage"
)

func main() {
	urls := []string{
		"http://httpbin.org/",
		"http://httpbin.org/ip",
		"http://httpbin.org/cookies/set?a=b&c=d",
		"http://httpbin.org/cookies",
	}

	c := colly.NewCollector()

	// create the redis storage
	storage := &redisstorage.Storage{
		Address:  "127.0.0.1:6379",
		Password: "",
		DB:       0,
		Prefix:   "httpbin_test",
	}

	// add storage to the collector
	err := c.SetStorage(storage)
	if err != nil {
		panic(err)
	}

	// delete previous data from storage
	if err := storage.Clear(); err != nil {
		log.Fatal(err)
	}

	// close redis client
	defer storage.Client.Close()

	// create a new request queue with redis storage backend
	q, _ := queue.New(2, storage)

	c.OnResponse(func(r *colly.Response) {
		log.Println("Cookies:", c.Cookies(r.Request.URL.String()))
	})

	// add URLs to the queue
	for _, u := range urls {
		q.AddURL(u)
	}
	// consume requests
	q.Run(c)
}
```

# Redis backend

```go
package main

import (
	"log"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/queue"
	"github.com/gocolly/redisstorage"
)

func main() {
	urls := []string{
		"http://httpbin.org/",
		"http://httpbin.org/ip",
		"http://httpbin.org/cookies/set?a=b&c=d",
		"http://httpbin.org/cookies",
	}

	c := colly.NewCollector()

	// create the redis storage
	storage := &redisstorage.Storage{
		Address:  "127.0.0.1:6379",
		Password: "",
		DB:       0,
		Prefix:   "httpbin_test",
	}

	// add storage to the collector
	err := c.SetStorage(storage)
	if err != nil {
		panic(err)
	}

	// delete previous data from storage
	if err := storage.Clear(); err != nil {
		log.Fatal(err)
	}

	// close redis client
	defer storage.Client.Close()

	// create a new request queue with redis storage backend
	q, _ := queue.New(2, storage)

	c.OnResponse(func(r *colly.Response) {
		log.Println("Cookies:", c.Cookies(r.Request.URL.String()))
	})

	// add URLs to the queue
	for _, u := range urls {
		q.AddURL(u)
	}
	// consume requests
	q.Run(c)
}
```

# Request context

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector()

	// Before making a request put the URL with
	// the key of "url" into the context of the request
	c.OnRequest(func(r *colly.Request) {
		r.Ctx.Put("url", r.URL.String())
	})

	// After making a request get "url" from
	// the context of the request
	c.OnResponse(func(r *colly.Response) {
		fmt.Println(r.Ctx.Get("url"))
	})

	// Start scraping on https://en.wikipedia.org
	c.Visit("https://en.wikipedia.org/")
}
```

# Scraper server

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gocolly/colly"
)

type pageInfo struct {
	StatusCode int
	Links      map[string]int
}

func handler(w http.ResponseWriter, r *http.Request) {
	URL := r.URL.Query().Get("url")
	if URL == "" {
		log.Println("missing URL argument")
		return
	}
	log.Println("visiting", URL)

	c := colly.NewCollector()

	p := &pageInfo{Links: make(map[string]int)}

	// count links
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Request.AbsoluteURL(e.Attr("href"))
		if link != "" {
			p.Links[link]++
		}
	})

	// extract status code
	c.OnResponse(func(r *colly.Response) {
		log.Println("response received", r.StatusCode)
		p.StatusCode = r.StatusCode
	})
	c.OnError(func(r *colly.Response, err error) {
		log.Println("error:", r.StatusCode, err)
		p.StatusCode = r.StatusCode
	})

	c.Visit(URL)

	// dump results
	b, err := json.Marshal(p)
	if err != nil {
		log.Println("failed to serialize response:", err)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write(b)
}

func main() {
	// example usage: curl -s 'http://127.0.0.1:7171/?url=http://go-colly.org/'
	addr := ":7171"

	http.HandleFunc("/", handler)

	log.Println("listening on", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
```

# Scraper server

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gocolly/colly"
)

type pageInfo struct {
	StatusCode int
	Links      map[string]int
}

func handler(w http.ResponseWriter, r *http.Request) {
	URL := r.URL.Query().Get("url")
	if URL == "" {
		log.Println("missing URL argument")
		return
	}
	log.Println("visiting", URL)

	c := colly.NewCollector()

	p := &pageInfo{Links: make(map[string]int)}

	// count links
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Request.AbsoluteURL(e.Attr("href"))
		if link != "" {
			p.Links[link]++
		}
	})

	// extract status code
	c.OnResponse(func(r *colly.Response) {
		log.Println("response received", r.StatusCode)
		p.StatusCode = r.StatusCode
	})
	c.OnError(func(r *colly.Response, err error) {
		log.Println("error:", r.StatusCode, err)
		p.StatusCode = r.StatusCode
	})

	c.Visit(URL)

	// dump results
	b, err := json.Marshal(p)
	if err != nil {
		log.Println("failed to serialize response:", err)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write(b)
}

func main() {
	// example usage: curl -s 'http://127.0.0.1:7171/?url=http://go-colly.org/'
	addr := ":7171"

	http.HandleFunc("/", handler)

	log.Println("listening on", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
```

# Shopify sitemap

```go
package main

import (
	"fmt"

	"github.com/gocolly/colly"
)

func main() {
	// Array containing all the known URLs in a sitemap
	knownUrls := []string{}

	// Create a Collector specifically for Shopify
	c := colly.NewCollector(colly.AllowedDomains("www.shopify.com"))

	// Create a callback on the XPath query searching for the URLs
	c.OnXML("//urlset/url/loc", func(e *colly.XMLElement) {
		knownUrls = append(knownUrls, e.Text)
	})

	// Start the collector
	c.Visit("https://www.shopify.com/sitemap.xml")

	fmt.Println("All known URLs:")
	for _, url := range knownUrls {
		fmt.Println("\t", url)
	}
	fmt.Println("Collected", len(knownUrls), "URLs")
}
```

# Url filter

```go
package main

import (
	"fmt"
	"regexp"

	"github.com/gocolly/colly"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only root url and urls which start with "e" or "h" on httpbin.org
		colly.URLFilters(
			regexp.MustCompile("http://httpbin\\.org/(|e.+)$"),
			regexp.MustCompile("http://httpbin\\.org/h.+"),
		),
	)

	// On every a element which has href attribute call callback
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		// Print link
		fmt.Printf("Link found: %q -> %s\n", e.Text, link)
		// Visit link found on page
		// Only those links are visited which are matched by  any of the URLFilter regexps
		c.Visit(e.Request.AbsoluteURL(link))
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// Start scraping on http://httpbin.org
	c.Visit("http://httpbin.org/")
}
```

# Xkcd store items

```go
package main

import (
	"encoding/csv"
	"log"
	"os"

	"github.com/gocolly/colly"
)

func main() {
	fName := "xkcd_store_items.csv"
	file, err := os.Create(fName)
	if err != nil {
		log.Fatalf("Cannot create file %q: %s\n", fName, err)
		return
	}
	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()
	// Write CSV header
	writer.Write([]string{"Name", "Price", "URL", "Image URL"})

	// Instantiate default collector
	c := colly.NewCollector(
		// Allow requests only to store.xkcd.com
		colly.AllowedDomains("store.xkcd.com"),
	)

	// Extract product details
	c.OnHTML(".product-grid-item", func(e *colly.HTMLElement) {
		writer.Write([]string{
			e.ChildAttr("a", "title"),
			e.ChildText("span"),
			e.Request.AbsoluteURL(e.ChildAttr("a", "href")),
			"https" + e.ChildAttr("img", "src"),
		})
	})

	// Find and visit next page links
	c.OnHTML(`.next a[href]`, func(e *colly.HTMLElement) {
		e.Request.Visit(e.Attr("href"))
	})

	c.Visit("https://store.xkcd.com/collections/everything")

	log.Printf("Scraping finished, check file %q for results\n", fName)

	// Display collector's statistics
	log.Println(c)
}
```
