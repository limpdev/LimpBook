<svg width="128px" height="128px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.1177 14.0442C17.7408 14.1497 17.3586 14.2566 16.9162 14.3768C16.7001 14.438 16.6509 14.4519 16.4498 14.2074C16.2086 13.9194 16.0317 13.7331 15.6939 13.5636C14.6807 13.0384 13.6996 13.1909 12.7829 13.8178C11.6893 14.5632 11.1264 15.6644 11.1425 17.0367C11.1585 18.3921 12.0431 19.5103 13.3137 19.6966C14.4073 19.8491 15.324 19.4425 16.0477 18.5785C16.1924 18.3922 16.3212 18.1887 16.482 17.9516H13.378C13.0402 17.9516 12.9598 17.7314 13.0724 17.4433C13.2815 16.9181 13.6675 16.0372 13.8926 15.5967C13.9409 15.495 14.0535 15.3256 14.2947 15.3256H19.4702C19.7027 14.5496 20.0799 13.8164 20.5831 13.1226C21.7572 11.4961 23.1725 10.649 25.0863 10.2933C26.7268 9.9883 28.2707 10.1577 29.6699 11.1573C30.9405 12.0722 31.7285 13.3089 31.9376 14.9354C32.211 17.2225 31.5838 19.0862 30.0881 20.6787C29.0266 21.8138 27.7239 22.5254 26.2282 22.8473C25.9429 22.9029 25.6576 22.9293 25.3768 22.9553C25.2303 22.9689 25.085 22.9823 24.9416 22.9998C23.478 22.9659 22.1432 22.5254 21.0173 21.5089C20.2256 20.7879 19.6803 19.9019 19.4092 18.8705C19.2211 19.2707 18.9962 19.6539 18.7336 20.0185C17.5756 21.628 16.0638 22.6276 14.15 22.8987C12.5738 23.1189 11.1103 22.797 9.82366 21.7805C8.63353 20.8317 7.95805 19.578 7.78114 18.0194C7.57206 16.1727 8.08671 14.5124 9.14818 13.0554C10.2901 11.4798 11.8019 10.4802 13.6514 10.1244C15.1632 9.8364 16.6106 10.0228 17.9134 10.9546C18.7657 11.5475 19.3769 12.3608 19.779 13.3434C19.8755 13.4959 19.8111 13.5806 19.6181 13.6314C19.0545 13.7822 18.5903 13.9121 18.1177 14.0442ZM28.7581 15.974C28.7613 16.0309 28.7646 16.0909 28.7693 16.1552C28.6889 17.6122 27.9973 18.6965 26.7268 19.3911C25.8744 19.8485 24.9898 19.8994 24.1053 19.4928C22.9473 18.9506 22.3361 17.6122 22.6256 16.2907C22.9795 14.6982 23.9444 13.6986 25.4401 13.3428C26.968 12.9701 28.4316 13.9188 28.7211 15.5961C28.7438 15.7161 28.7505 15.836 28.7581 15.974Z" fill="#00ACD7"></path>
<path d="M2.44461 13.8517C2.41244 13.9025 2.42852 13.9364 2.49285 13.9364L7.2826 13.9534C7.33085 13.9534 7.41126 13.9025 7.44343 13.8517L7.71684 13.4112C7.749 13.3604 7.73292 13.3096 7.66859 13.3096H2.95926C2.89493 13.3096 2.81451 13.3435 2.78235 13.3943L2.44461 13.8517Z" fill="#00ACD7"></path>
<path d="M0.0160829 15.4103C-0.0160829 15.4611 7.45058e-09 15.495 0.0643316 15.495L6.63928 15.4781C6.70361 15.4781 6.76794 15.4442 6.78402 15.3764L6.91269 14.9698C6.92877 14.919 6.8966 14.8682 6.83227 14.8682H0.530735C0.466404 14.8682 0.385989 14.902 0.353823 14.9529L0.0160829 15.4103Z" fill="#00ACD7"></path>
<path d="M3.90813 16.9521C3.87596 17.0029 3.89204 17.0537 3.95638 17.0537L6.43019 17.0707C6.47843 17.0707 6.54277 17.0199 6.54277 16.9521L6.57493 16.5455C6.57493 16.4777 6.54277 16.4269 6.47843 16.4269H4.29412C4.22978 16.4269 4.16545 16.4777 4.13329 16.5285L3.90813 16.9521Z" fill="#00ACD7"></path>
</svg>

# Colly

Lightning Fast and Elegant Scraping Framework for Gophers

Colly provides a clean interface to write any kind of crawler/scraper/spider.

With Colly you can easily extract structured data from websites, which can be used for a wide range of applications, like data mining, data processing or archiving.

#### Features

- Clean API
- Fast (&gt;1k request/sec on a single core)
- Manages request delays and maximum concurrency per domain
- Automatic cookie and session handling
- Sync/async/parallel scraping
- Caching
- Automatic encoding of non-unicode responses
- Robots.txt support
- Distributed scraping
- Configuration via environment variables
- Extensions

#### Example

```go
func main() {
	c := colly.NewCollector()

	// Find and visit all links
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		e.Request.Visit(e.Attr("href"))
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.Visit("http://go-colly.org/")
}
```

See [examples folder](https://github.com/gocolly/colly/tree/master/_examples) for more detailed examples.

#### Installation

```go
go get -u github.com/gocolly/colly/...
```

### Overview [¶](#pkg-overview "Go to Overview")

Package colly implements a HTTP scraping framework

### Index [¶](#pkg-index "Go to Index")

- [Constants](#pkg-constants)
- [Variables](#pkg-variables)
- [func AllowURLRevisit() func(\*Collector)](#AllowURLRevisit)
- [func AllowedDomains(domains ...string) func(\*Collector)](#AllowedDomains)
- [func Async(a bool) func(\*Collector)](#Async)
- [func CacheDir(path string) func(\*Collector)](#CacheDir)
- [func Debugger(d debug.Debugger) func(\*Collector)](#Debugger)
- [func DetectCharset() func(\*Collector)](#DetectCharset)
- [func DisallowedDomains(domains ...string) func(\*Collector)](#DisallowedDomains)
- [func DisallowedURLFilters(filters ...\*regexp.Regexp) func(\*Collector)](#DisallowedURLFilters)
- [func ID(id uint32) func(\*Collector)](#ID)
- [func IgnoreRobotsTxt() func(\*Collector)](#IgnoreRobotsTxt)
- [func MaxBodySize(sizeInBytes int) func(\*Collector)](#MaxBodySize)
- [func MaxDepth(depth int) func(\*Collector)](#MaxDepth)
- [func ParseHTTPErrorResponse() func(\*Collector)](#ParseHTTPErrorResponse)
- [func SanitizeFileName(fileName string) string](#SanitizeFileName)
- [func URLFilters(filters ...\*regexp.Regexp) func(\*Collector)](#URLFilters)
- [func UnmarshalHTML(v interface{}, s \*goquery.Selection) error](#UnmarshalHTML)
- [func UserAgent(ua string) func(\*Collector)](#UserAgent)
- [type Collector](#Collector)
-   - [func NewCollector(options ...func(\*Collector)) \*Collector](#NewCollector)
-   - [func (c \*Collector) Appengine(ctx context.Context)](#Collector.Appengine)
    - [func (c \*Collector) Clone() \*Collector](#Collector.Clone)
    - [func (c \*Collector) Cookies(URL string) \[\]\*http.Cookie](#Collector.Cookies)
    - [func (c \*Collector) DisableCookies()](#Collector.DisableCookies)
    - [func (c \*Collector) Head(URL string) error](#Collector.Head)
    - [func (c \*Collector) Init()](#Collector.Init)
    - [func (c \*Collector) Limit(rule \*LimitRule) error](#Collector.Limit)
    - [func (c \*Collector) Limits(rules \[\]\*LimitRule) error](#Collector.Limits)
    - [func (c \*Collector) OnError(f ErrorCallback)](#Collector.OnError)
    - [func (c \*Collector) OnHTML(goquerySelector string, f HTMLCallback)](#Collector.OnHTML)
    - [func (c \*Collector) OnHTMLDetach(goquerySelector string)](#Collector.OnHTMLDetach)
    - [func (c \*Collector) OnRequest(f RequestCallback)](#Collector.OnRequest)
    - [func (c \*Collector) OnResponse(f ResponseCallback)](#Collector.OnResponse)
    - [func (c \*Collector) OnScraped(f ScrapedCallback)](#Collector.OnScraped)
    - [func (c \*Collector) OnXML(xpathQuery string, f XMLCallback)](#Collector.OnXML)
    - [func (c \*Collector) OnXMLDetach(xpathQuery string)](#Collector.OnXMLDetach)
    - [func (c \*Collector) Post(URL string, requestData map\[string\]string) error](#Collector.Post)
    - [func (c \*Collector) PostMultipart(URL string, requestData map\[string\]\[\]byte) error](#Collector.PostMultipart)
    - [func (c \*Collector) PostRaw(URL string, requestData \[\]byte) error](#Collector.PostRaw)
    - [func (c \*Collector) Request(method, URL string, requestData io.Reader, ctx \*Context, hdr http.Header) error](#Collector.Request)
    - [func (c \*Collector) SetCookieJar(j \*cookiejar.Jar)](#Collector.SetCookieJar)
    - [func (c \*Collector) SetCookies(URL string, cookies \[\]\*http.Cookie) error](#Collector.SetCookies)
    - [func (c \*Collector) SetDebugger(d debug.Debugger)](#Collector.SetDebugger)
    - [func (c \*Collector) SetProxy(proxyURL string) error](#Collector.SetProxy)
    - [func (c \*Collector) SetProxyFunc(p ProxyFunc)](#Collector.SetProxyFunc)
    - [func (c \*Collector) SetRequestTimeout(timeout time.Duration)](#Collector.SetRequestTimeout)
    - [func (c \*Collector) SetStorage(s storage.Storage) error](#Collector.SetStorage)
    - [func (c \*Collector) String() string](#Collector.String)
    - [func (c \*Collector) UnmarshalRequest(r \[\]byte) (\*Request, error)](#Collector.UnmarshalRequest)
    - [func (c \*Collector) Visit(URL string) error](#Collector.Visit)
    - [func (c \*Collector) Wait()](#Collector.Wait)
    - [func (c \*Collector) WithTransport(transport http.RoundTripper)](#Collector.WithTransport)
- [type Context](#Context)
-   - [func NewContext() \*Context](#NewContext)
-   - [func (c \*Context) ForEach(fn func(k string, v interface{}) interface{}) \[\]interface{}](#Context.ForEach)
    - [func (c \*Context) Get(key string) string](#Context.Get)
    - [func (c \*Context) GetAny(key string) interface{}](#Context.GetAny)
    - [func (c \*Context) MarshalBinary() (_ \[\]byte, _ error)](#Context.MarshalBinary)
    - [func (c \*Context) Put(key string, value interface{})](#Context.Put)
    - [func (c \*Context) UnmarshalBinary(\_ \[\]byte) error](#Context.UnmarshalBinary)
- [type ErrorCallback](#ErrorCallback)
- [type HTMLCallback](#HTMLCallback)
- [type HTMLElement](#HTMLElement)
-   - [func NewHTMLElementFromSelectionNode(resp \*Response, s \*goquery.Selection, n \*html.Node, idx int) \*HTMLElement](#NewHTMLElementFromSelectionNode)
-   - [func (h \*HTMLElement) Attr(k string) string](#HTMLElement.Attr)
    - [func (h \*HTMLElement) ChildAttr(goquerySelector, attrName string) string](#HTMLElement.ChildAttr)
    - [func (h \*HTMLElement) ChildAttrs(goquerySelector, attrName string) \[\]string](#HTMLElement.ChildAttrs)
    - [func (h \*HTMLElement) ChildText(goquerySelector string) string](#HTMLElement.ChildText)
    - [func (h \*HTMLElement) ForEach(goquerySelector string, callback func(int, \*HTMLElement))](#HTMLElement.ForEach)
    - [func (h \*HTMLElement) ForEachWithBreak(goquerySelector string, callback func(int, \*HTMLElement) bool)](#HTMLElement.ForEachWithBreak)
    - [func (h \*HTMLElement) Unmarshal(v interface{}) error](#HTMLElement.Unmarshal)
- [type LimitRule](#LimitRule)
-   - [func (r \*LimitRule) Init() error](#LimitRule.Init)
    - [func (r \*LimitRule) Match(domain string) bool](#LimitRule.Match)
- [type ProxyFunc](#ProxyFunc)
- [type Request](#Request)
-   - [func (r \*Request) Abort()](#Request.Abort)
    - [func (r \*Request) AbsoluteURL(u string) string](#Request.AbsoluteURL)
    - [func (r \*Request) Do() error](#Request.Do)
    - [func (r \*Request) Marshal() (\[\]byte, error)](#Request.Marshal)
    - [func (r \*Request) New(method, URL string, body io.Reader) (\*Request, error)](#Request.New)
    - [func (r \*Request) Post(URL string, requestData map\[string\]string) error](#Request.Post)
    - [func (r \*Request) PostMultipart(URL string, requestData map\[string\]\[\]byte) error](#Request.PostMultipart)
    - [func (r \*Request) PostRaw(URL string, requestData \[\]byte) error](#Request.PostRaw)
    - [func (r \*Request) Retry() error](#Request.Retry)
    - [func (r \*Request) Visit(URL string) error](#Request.Visit)
- [type RequestCallback](#RequestCallback)
- [type Response](#Response)
-   - [func (r \*Response) FileName() string](#Response.FileName)
    - [func (r \*Response) Save(fileName string) error](#Response.Save)
- [type ResponseCallback](#ResponseCallback)
- [type ScrapedCallback](#ScrapedCallback)
- [type XMLCallback](#XMLCallback)
- [type XMLElement](#XMLElement)
-   - [func NewXMLElementFromHTMLNode(resp \*Response, s \*html.Node) \*XMLElement](#NewXMLElementFromHTMLNode)
    - [func NewXMLElementFromXMLNode(resp \*Response, s \*xmlquery.Node) \*XMLElement](#NewXMLElementFromXMLNode)
-   - [func (h \*XMLElement) Attr(k string) string](#XMLElement.Attr)
    - [func (h \*XMLElement) ChildAttr(xpathQuery, attrName string) string](#XMLElement.ChildAttr)
    - [func (h \*XMLElement) ChildAttrs(xpathQuery, attrName string) \[\]string](#XMLElement.ChildAttrs)
    - [func (h \*XMLElement) ChildText(xpathQuery string) string](#XMLElement.ChildText)
    - [func (h \*XMLElement) ChildTexts(xpathQuery string) \[\]string](#XMLElement.ChildTexts)

### Constants [¶](#pkg-constants "Go to Constants")

[View Source](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L167)

```go
const ProxyURLKey key = iota
```

ProxyURLKey is the context key for the request proxy address.

### Variables [¶](#pkg-variables "Go to Variables")

[View Source](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L169)

```go
var (
	// ErrForbiddenDomain is the error thrown if visiting
	// a domain which is not allowed in AllowedDomains
	ErrForbiddenDomain = errors.New("Forbidden domain")
	// ErrMissingURL is the error type for missing URL errors
	ErrMissingURL = errors.New("Missing URL")
	// ErrMaxDepth is the error type for exceeding max depth
	ErrMaxDepth = errors.New("Max depth limit reached")
	// ErrForbiddenURL is the error thrown if visiting
	// a URL which is not allowed by URLFilters
	ErrForbiddenURL = errors.New("ForbiddenURL")

	// ErrNoURLFiltersMatch is the error thrown if visiting
	// a URL which is not allowed by URLFilters
	ErrNoURLFiltersMatch = errors.New("No URLFilters match")
	// ErrAlreadyVisited is the error type for already visited URLs
	ErrAlreadyVisited = errors.New("URL already visited")
	// ErrRobotsTxtBlocked is the error type for robots.txt errors
	ErrRobotsTxtBlocked = errors.New("URL blocked by robots.txt")
	// ErrNoCookieJar is the error type for missing cookie jar
	ErrNoCookieJar = errors.New("Cookie jar is not available")
	// ErrNoPattern is the error type for LimitRules without patterns
	ErrNoPattern = errors.New("No pattern defined in LimitRule")
)
```

### Functions [¶](#pkg-functions "Go to Functions")

#### func [AllowURLRevisit](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L306) [¶](#AllowURLRevisit "Go to AllowURLRevisit")

```go
func AllowURLRevisit() func(*Collector)
```

AllowURLRevisit instructs the Collector to allow multiple downloads of the same URL

#### func [AllowedDomains](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L269) [¶](#AllowedDomains "Go to AllowedDomains")

```go
func AllowedDomains(domains ...string) func(*Collector)
```

AllowedDomains sets the domain whitelist used by the Collector.

#### func [Async](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L342) [¶](#Async "Go to Async")

```go
func Async(a bool) func(*Collector)
```

Async turns on asynchronous network requests.

#### func [CacheDir](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L320) [¶](#CacheDir "Go to CacheDir")

```go
func CacheDir(path string) func(*Collector)
```

CacheDir specifies the location where GET requests are cached as files.

#### func [Debugger](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L357) [¶](#Debugger "Go to Debugger")

```go
func Debugger(d debug.Debugger) func(*Collector)
```

Debugger sets the debugger used by the Collector.

#### func [DetectCharset](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L350) [¶](#DetectCharset "Go to DetectCharset")

```go
func DetectCharset() func(*Collector)
```

DetectCharset enables character encoding detection for non-utf8 response bodies without explicit charset declaration. This feature uses [https://github.com/saintfish/chardet](https://github.com/saintfish/chardet)

#### func [DisallowedDomains](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L283) [¶](#DisallowedDomains "Go to DisallowedDomains")

```go
func DisallowedDomains(domains ...string) func(*Collector)
```

DisallowedDomains sets the domain blacklist used by the Collector.

#### func [DisallowedURLFilters](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L291) [¶](#DisallowedURLFilters "Go to DisallowedURLFilters")

```go
func DisallowedURLFilters(filters ...*regexp.Regexp) func(*Collector)
```

DisallowedURLFilters sets the list of regular expressions which restricts visiting URLs. If any of the rules matches to a URL the request will be stopped.

#### func [ID](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L335) [¶](#ID "Go to ID")

```go
func ID(id uint32) func(*Collector)
```

ID sets the unique identifier of the Collector.

#### func [IgnoreRobotsTxt](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L328) [¶](#IgnoreRobotsTxt "Go to IgnoreRobotsTxt")

```go
func IgnoreRobotsTxt() func(*Collector)
```

IgnoreRobotsTxt instructs the Collector to ignore any restrictions set by the target host's robots.txt file.

#### func [MaxBodySize](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L313) [¶](#MaxBodySize "Go to MaxBodySize")

```go
func MaxBodySize(sizeInBytes int) func(*Collector)
```

MaxBodySize sets the limit of the retrieved response body in bytes.

#### func [MaxDepth](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L262) [¶](#MaxDepth "Go to MaxDepth")

```go
func MaxDepth(depth int) func(*Collector)
```

MaxDepth limits the recursion depth of visited URLs.

#### func [ParseHTTPErrorResponse](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L276) [¶](#ParseHTTPErrorResponse "Go to ParseHTTPErrorResponse")

```go
func ParseHTTPErrorResponse() func(*Collector)
```

ParseHTTPErrorResponse allows parsing responses with HTTP errors

#### func [SanitizeFileName](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L1188) [¶](#SanitizeFileName "Go to SanitizeFileName")

```go
func SanitizeFileName(fileName string) string
```

SanitizeFileName replaces dangerous characters in a string so the return value can be used as a safe file name.

#### func [URLFilters](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L299) [¶](#URLFilters "Go to URLFilters")

```go
func URLFilters(filters ...*regexp.Regexp) func(*Collector)
```

URLFilters sets the list of regular expressions which restricts visiting URLs. If any of the rules matches to a URL the request won't be stopped.

#### func [UnmarshalHTML](https://github.com/gocolly/colly/blob/v1.2.0/unmarshal.go#L46) [¶](#UnmarshalHTML "Go to UnmarshalHTML")

```go
func UnmarshalHTML(v interface{}, s *goquery.Selection) error
```

UnmarshalHTML declaratively extracts text or attributes to a struct from HTML response using struct tags composed of css selectors. Allowed struct tags:

- "selector" (required): CSS (goquery) selector of the desired data
- "attr" (optional): Selects the matching element's attribute's value. Leave it blank or omit to get the text of the element.

Example struct declaration:

```go
type Nested struct {
	String  string   `selector:"div > p"`
   Classes []string `selector:"li" attr:"class"`
	Struct  *Nested  `selector:"div > div"`
}
```

Supported types: struct, \*struct, string, \[]string

#### func [UserAgent](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L255) [¶](#UserAgent "Go to UserAgent")

```go
func UserAgent(ua string) func(*Collector)
```

UserAgent sets the user agent used by the Collector.

### Types [¶](#pkg-types "Go to Types")

#### type [Collector](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L54) [¶](#Collector "Go to Collector")

```go
type Collector struct {
	// UserAgent is the User-Agent string used by HTTP requests
	UserAgent string
	// MaxDepth limits the recursion depth of visited URLs.
	// Set it to 0 for infinite recursion (default).
	MaxDepth int
	// AllowedDomains is a domain whitelist.
	// Leave it blank to allow any domains to be visited
	AllowedDomains []string
	// DisallowedDomains is a domain blacklist.
	DisallowedDomains []string
	// DisallowedURLFilters is a list of regular expressions which restricts
	// visiting URLs. If any of the rules matches to a URL the
	// request will be stopped. DisallowedURLFilters will
	// be evaluated before URLFilters
	// Leave it blank to allow any URLs to be visited
	DisallowedURLFilters []*regexp.Regexp

	// Leave it blank to allow any URLs to be visited
	URLFilters []*regexp.Regexp

	// AllowURLRevisit allows multiple downloads of the same URL
	AllowURLRevisit bool
	// MaxBodySize is the limit of the retrieved response body in bytes.
	// 0 means unlimited.
	// The default value for MaxBodySize is 10MB (10 * 1024 * 1024 bytes).
	MaxBodySize int
	// CacheDir specifies a location where GET requests are cached as files.
	// When it's not defined, caching is disabled.
	CacheDir string
	// IgnoreRobotsTxt allows the Collector to ignore any restrictions set by
	// the target host's robots.txt file.  See http://www.robotstxt.org/ for more
	// information.
	IgnoreRobotsTxt bool
	// Async turns on asynchronous network communication. Use Collector.Wait() to
	// be sure all requests have been finished.
	Async bool
	// ParseHTTPErrorResponse allows parsing HTTP responses with non 2xx status codes.
	// By default, Colly parses only successful HTTP responses. Set ParseHTTPErrorResponse
	// to true to enable it.
	ParseHTTPErrorResponse bool
	// ID is the unique identifier of a collector
	ID uint32
	// DetectCharset can enable character encoding detection for non-utf8 response bodies
	// without explicit charset declaration. This feature uses https://github.com/saintfish/chardet
	DetectCharset bool
	// RedirectHandler allows control on how a redirect will be managed
	RedirectHandler func(req *http.Request, via []*http.Request) error
	// CheckHead performs a HEAD request before every GET to pre-validate the response
	CheckHead bool
	// contains filtered or unexported fields
}
```

Collector provides the scraper instance for a scraping job

#### func [NewCollector](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L241) [¶](#NewCollector "Go to NewCollector")

```go
func NewCollector(options ...func(*Collector)) *Collector
```

NewCollector creates a new Collector instance with default configuration

#### func (\*Collector) [Appengine](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L394) [¶](#Collector.Appengine "Go to Collector.Appengine")

```go
func (c *Collector) Appengine(ctx context.Context)
```

Appengine will replace the Collector's backend http.Client With an Http.Client that is provided by appengine/urlfetch This function should be used when the scraper is run on Google App Engine. Example:

```go
func startScraper(w http.ResponseWriter, r *http.Request) {
  ctx := appengine.NewContext(r)
  c := colly.NewCollector()
  c.Appengine(ctx)
   ...
  c.Visit("https://google.ca")
}
```

#### func (\*Collector) [Clone](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L1107) [¶](#Collector.Clone "Go to Collector.Clone")

```go
func (c *Collector) Clone() *Collector
```

Clone creates an exact copy of a Collector without callbacks. HTTP backend, robots.txt cache and cookie jar are shared between collectors.

#### func (\*Collector) [Cookies](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L1093) [¶](#Collector.Cookies "Go to Collector.Cookies")

```go
func (c *Collector) Cookies(URL string) []*http.Cookie
```

Cookies returns the cookies to send in a request for the given URL.

#### func (\*Collector) [DisableCookies](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L849) [¶](#Collector.DisableCookies "Go to Collector.DisableCookies")

```go
func (c *Collector) DisableCookies()
```

DisableCookies turns off cookie handling

#### func (\*Collector) [Head](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L416) [¶](#Collector.Head "Go to Collector.Head") added in v1.2.0

```go
func (c *Collector) Head(URL string) error
```

Head starts a collector job by creating a HEAD request.

#### func (\*Collector) [Init](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L366) [¶](#Collector.Init "Go to Collector.Init")

```go
func (c *Collector) Init()
```

Init initializes the Collector's private variables and sets default configuration for the Collector

#### func (\*Collector) [Limit](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L1070) [¶](#Collector.Limit "Go to Collector.Limit")

```go
func (c *Collector) Limit(rule *LimitRule) error
```

Limit adds a new LimitRule to the collector

#### func (\*Collector) [Limits](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L1075) [¶](#Collector.Limits "Go to Collector.Limits")

```go
func (c *Collector) Limits(rules []*LimitRule) error
```

Limits adds new LimitRules to the collector

#### func (\*Collector) [OnError](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L823) [¶](#Collector.OnError "Go to Collector.OnError")

```go
func (c *Collector) OnError(f ErrorCallback)
```

OnError registers a function. Function will be executed if an error occurs during the HTTP request.

#### func (\*Collector) [OnHTML](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L762) [¶](#Collector.OnHTML "Go to Collector.OnHTML")

```go
func (c *Collector) OnHTML(goquerySelector string, f HTMLCallback)
```

OnHTML registers a function. Function will be executed on every HTML element matched by the GoQuery Selector parameter. GoQuery Selector is a selector used by [https://github.com/PuerkitoBio/goquery](https://github.com/PuerkitoBio/goquery)

#### func (\*Collector) [OnHTMLDetach](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L790) [¶](#Collector.OnHTMLDetach "Go to Collector.OnHTMLDetach")

```go
func (c *Collector) OnHTMLDetach(goquerySelector string)
```

OnHTMLDetach deregister a function. Function will not be execute after detached

#### func (\*Collector) [OnRequest](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L740) [¶](#Collector.OnRequest "Go to Collector.OnRequest")

```go
func (c *Collector) OnRequest(f RequestCallback)
```

OnRequest registers a function. Function will be executed on every request made by the Collector

#### func (\*Collector) [OnResponse](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L750) [¶](#Collector.OnResponse "Go to Collector.OnResponse")

```go
func (c *Collector) OnResponse(f ResponseCallback)
```

OnResponse registers a function. Function will be executed on every response

#### func (\*Collector) [OnScraped](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L834) [¶](#Collector.OnScraped "Go to Collector.OnScraped")

```go
func (c *Collector) OnScraped(f ScrapedCallback)
```

OnScraped registers a function. Function will be executed after OnHTML, as a final part of the scraping.

#### func (\*Collector) [OnXML](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L777) [¶](#Collector.OnXML "Go to Collector.OnXML")

```go
func (c *Collector) OnXML(xpathQuery string, f XMLCallback)
```

OnXML registers a function. Function will be executed on every XML element matched by the xpath Query parameter. xpath Query is used by [https://github.com/antchfx/xmlquery](https://github.com/antchfx/xmlquery)

#### func (\*Collector) [OnXMLDetach](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L806) [¶](#Collector.OnXMLDetach "Go to Collector.OnXMLDetach")

```go
func (c *Collector) OnXMLDetach(xpathQuery string)
```

OnXMLDetach deregister a function. Function will not be execute after detached

#### func (\*Collector) [Post](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L422) [¶](#Collector.Post "Go to Collector.Post")

```go
func (c *Collector) Post(URL string, requestData map[string]string) error
```

Post starts a collector job by creating a POST request. Post also calls the previously provided callbacks

#### func (\*Collector) [PostMultipart](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L434) [¶](#Collector.PostMultipart "Go to Collector.PostMultipart")

```go
func (c *Collector) PostMultipart(URL string, requestData map[string][]byte) error
```

PostMultipart starts a collector job by creating a Multipart POST request with raw binary data. PostMultipart also calls the previously provided callbacks

#### func (\*Collector) [PostRaw](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L428) [¶](#Collector.PostRaw "Go to Collector.PostRaw")

```go
func (c *Collector) PostRaw(URL string, requestData []byte) error
```

PostRaw starts a collector job by creating a POST request with raw binary data. Post also calls the previously provided callbacks

#### func (\*Collector) [Request](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L453) [¶](#Collector.Request "Go to Collector.Request")

```go
func (c *Collector) Request(method, URL string, requestData io.Reader, ctx *Context, hdr http.Header) error
```

Request starts a collector job by creating a custom HTTP request where method, context, headers and request data can be specified. Set requestData, ctx, hdr parameters to nil if you don't want to use them. Valid methods:

- "GET"
- "HEAD"
- "POST"
- "PUT"
- "DELETE"
- "PATCH"
- "OPTIONS"

#### func (\*Collector) [SetCookieJar](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L854) [¶](#Collector.SetCookieJar "Go to Collector.SetCookieJar")

```go
func (c *Collector) SetCookieJar(j *cookiejar.Jar)
```

SetCookieJar overrides the previously set cookie jar

#### func (\*Collector) [SetCookies](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L1080) [¶](#Collector.SetCookies "Go to Collector.SetCookies")

```go
func (c *Collector) SetCookies(URL string, cookies []*http.Cookie) error
```

SetCookies handles the receipt of the cookies in a reply for the given URL

#### func (\*Collector) [SetDebugger](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L458) [¶](#Collector.SetDebugger "Go to Collector.SetDebugger")

```go
func (c *Collector) SetDebugger(d debug.Debugger)
```

SetDebugger attaches a debugger to the collector

#### func (\*Collector) [SetProxy](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L879) [¶](#Collector.SetProxy "Go to Collector.SetProxy")

```go
func (c *Collector) SetProxy(proxyURL string) error
```

SetProxy sets a proxy for the collector. This method overrides the previously used http.Transport if the type of the transport is not http.RoundTripper. The proxy type is determined by the URL scheme. "http" and "socks5" are supported. If the scheme is empty, "http" is assumed.

#### func (\*Collector) [SetProxyFunc](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L897) [¶](#Collector.SetProxyFunc "Go to Collector.SetProxyFunc")

```go
func (c *Collector) SetProxyFunc(p ProxyFunc)
```

SetProxyFunc sets a custom proxy setter/switcher function. See built-in ProxyFuncs for more details. This method overrides the previously used http.Transport if the type of the transport is not http.RoundTripper. The proxy type is determined by the URL scheme. "http" and "socks5" are supported. If the scheme is empty, "http" is assumed.

#### func (\*Collector) [SetRequestTimeout](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L859) [¶](#Collector.SetRequestTimeout "Go to Collector.SetRequestTimeout")

```go
func (c *Collector) SetRequestTimeout(timeout time.Duration)
```

SetRequestTimeout overrides the default timeout (10 seconds) for this collector

#### func (\*Collector) [SetStorage](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L865) [¶](#Collector.SetStorage "Go to Collector.SetStorage")

```go
func (c *Collector) SetStorage(s storage.Storage) error
```

SetStorage overrides the default in-memory storage. Storage stores scraping related data like cookies and visited urls

#### func (\*Collector) [String](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L721) [¶](#Collector.String "Go to Collector.String")

```go
func (c *Collector) String() string
```

String is the text representation of the collector. It contains useful debug information about the collector's internals

#### func (\*Collector) [UnmarshalRequest](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L464) [¶](#Collector.UnmarshalRequest "Go to Collector.UnmarshalRequest")

```go
func (c *Collector) UnmarshalRequest(r []byte) (*Request, error)
```

UnmarshalRequest creates a Request from serialized data

#### func (\*Collector) [Visit](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L406) [¶](#Collector.Visit "Go to Collector.Visit")

```go
func (c *Collector) Visit(URL string) error
```

Visit starts Collector's collecting job by creating a request to the URL specified in parameter. Visit also calls the previously provided callbacks

#### func (\*Collector) [Wait](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L734) [¶](#Collector.Wait "Go to Collector.Wait")

```go
func (c *Collector) Wait()
```

Wait returns when the collector jobs are finished

#### func (\*Collector) [WithTransport](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L844) [¶](#Collector.WithTransport "Go to Collector.WithTransport")

```go
func (c *Collector) WithTransport(transport http.RoundTripper)
```

WithTransport allows you to set a custom http.RoundTripper (transport)

#### type [Context](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L22) [¶](#Context "Go to Context")

```go
type Context struct {
	// contains filtered or unexported fields
}
```

Context provides a tiny layer for passing data between callbacks

#### func [NewContext](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L28) [¶](#NewContext "Go to NewContext")

```go
func NewContext() *Context
```

NewContext initializes a new Context instance

#### func (\*Context) [ForEach](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L77) [¶](#Context.ForEach "Go to Context.ForEach")

```go
func (c *Context) ForEach(fn func(k string, v interface{}) interface{}) []interface{}
```

ForEach iterate context

#### func (\*Context) [Get](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L56) [¶](#Context.Get "Go to Context.Get")

```go
func (c *Context) Get(key string) string
```

Get retrieves a string value from Context. Get returns an empty string if key not found

#### func (\*Context) [GetAny](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L67) [¶](#Context.GetAny "Go to Context.GetAny")

```go
func (c *Context) GetAny(key string) interface{}
```

GetAny retrieves a value from Context. GetAny returns nil if key not found

#### func (\*Context) [MarshalBinary](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L43) [¶](#Context.MarshalBinary "Go to Context.MarshalBinary")

```go
func (c *Context) MarshalBinary() (_ []byte, _ error)
```

MarshalBinary encodes Context value This function is used by request caching

#### func (\*Context) [Put](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L48) [¶](#Context.Put "Go to Context.Put")

```go
func (c *Context) Put(key string, value interface{})
```

Put stores a value of any type in Context

#### func (\*Context) [UnmarshalBinary](https://github.com/gocolly/colly/blob/v1.2.0/context.go#L37) [¶](#Context.UnmarshalBinary "Go to Context.UnmarshalBinary")

```go
func (c *Context) UnmarshalBinary(_ []byte) error
```

UnmarshalBinary decodes Context value to nil This function is used by request caching

#### type [ErrorCallback](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L137) [¶](#ErrorCallback "Go to ErrorCallback")

```go
type ErrorCallback func(*Response, error)
```

ErrorCallback is a type alias for OnError callback functions

#### type [HTMLCallback](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L131) [¶](#HTMLCallback "Go to HTMLCallback")

```go
type HTMLCallback func(*HTMLElement)
```

HTMLCallback is a type alias for OnHTML callback functions

#### type [HTMLElement](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L25) [¶](#HTMLElement "Go to HTMLElement")

```go
type HTMLElement struct {
	// Name is the name of the tag
	Name string
	Text string

	// Request is the request object of the element's HTML document
	Request *Request
	// Response is the Response object of the element's HTML document
	Response *Response
	// DOM is the goquery parsed DOM object of the page. DOM is relative
	// to the current HTMLElement
	DOM *goquery.Selection
	// Index stores the position of the current element within all the elements matched by an OnHTML callback
	Index int
	// contains filtered or unexported fields
}
```

HTMLElement is the representation of a HTML tag.

#### func [NewHTMLElementFromSelectionNode](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L42) [¶](#NewHTMLElementFromSelectionNode "Go to NewHTMLElementFromSelectionNode")

```go
func NewHTMLElementFromSelectionNode(resp *Response, s *goquery.Selection, n *html.Node, idx int) *HTMLElement
```

NewHTMLElementFromSelectionNode creates a HTMLElement from a goquery.Selection Node.

#### func (\*HTMLElement) [Attr](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L56) [¶](#HTMLElement.Attr "Go to HTMLElement.Attr")

```go
func (h *HTMLElement) Attr(k string) string
```

Attr returns the selected attribute of a HTMLElement or empty string if no attribute found

#### func (\*HTMLElement) [ChildAttr](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L73) [¶](#HTMLElement.ChildAttr "Go to HTMLElement.ChildAttr")

```go
func (h *HTMLElement) ChildAttr(goquerySelector, attrName string) string
```

ChildAttr returns the stripped text content of the first matching element's attribute.

#### func (\*HTMLElement) [ChildAttrs](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L82) [¶](#HTMLElement.ChildAttrs "Go to HTMLElement.ChildAttrs")

```go
func (h *HTMLElement) ChildAttrs(goquerySelector, attrName string) []string
```

ChildAttrs returns the stripped text content of all the matching element's attributes.

#### func (\*HTMLElement) [ChildText](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L67) [¶](#HTMLElement.ChildText "Go to HTMLElement.ChildText")

```go
func (h *HTMLElement) ChildText(goquerySelector string) string
```

ChildText returns the concatenated and stripped text content of the matching elements.

#### func (\*HTMLElement) [ForEach](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L94) [¶](#HTMLElement.ForEach "Go to HTMLElement.ForEach")

```go
func (h *HTMLElement) ForEach(goquerySelector string, callback func(int, *HTMLElement))
```

ForEach iterates over the elements matched by the first argument and calls the callback function on every HTMLElement match.

#### func (\*HTMLElement) [ForEachWithBreak](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go#L109) [¶](#HTMLElement.ForEachWithBreak "Go to HTMLElement.ForEachWithBreak") added in v1.1.0

```go
func (h *HTMLElement) ForEachWithBreak(goquerySelector string, callback func(int, *HTMLElement) bool)
```

ForEachWithBreak iterates over the elements matched by the first argument and calls the callback function on every HTMLElement match. It is identical to ForEach except that it is possible to break out of the loop by returning false in the callback function. It returns the current Selection object.

#### func (\*HTMLElement) [Unmarshal](https://github.com/gocolly/colly/blob/v1.2.0/unmarshal.go#L26) [¶](#HTMLElement.Unmarshal "Go to HTMLElement.Unmarshal")

```go
func (h *HTMLElement) Unmarshal(v interface{}) error
```

Unmarshal is a shorthand for colly.UnmarshalHTML

#### type [LimitRule](https://github.com/gocolly/colly/blob/v1.2.0/http_backend.go#L48) [¶](#LimitRule "Go to LimitRule")

```go
type LimitRule struct {
	// DomainRegexp is a regular expression to match against domains
	DomainRegexp string
	// DomainRegexp is a glob pattern to match against domains
	DomainGlob string
	// Delay is the duration to wait before creating a new request to the matching domains
	Delay time.Duration
	// RandomDelay is the extra randomized duration to wait added to Delay before creating a new request
	RandomDelay time.Duration
	// Parallelism is the number of the maximum allowed concurrent requests of the matching domains
	Parallelism int
	// contains filtered or unexported fields
}
```

LimitRule provides connection restrictions for domains. Both DomainRegexp and DomainGlob can be used to specify the included domains patterns, but at least one is required. There can be two kind of limitations:

- Parallelism: Set limit for the number of concurrent requests to matching domains
- Delay: Wait specified amount of time between requests (parallelism is 1 in this case)

#### func (\*LimitRule) [Init](https://github.com/gocolly/colly/blob/v1.2.0/http_backend.go#L65) [¶](#LimitRule.Init "Go to LimitRule.Init")

```go
func (r *LimitRule) Init() error
```

Init initializes the private members of LimitRule

#### func (\*LimitRule) [Match](https://github.com/gocolly/colly/blob/v1.2.0/http_backend.go#L104) [¶](#LimitRule.Match "Go to LimitRule.Match")

```go
func (r *LimitRule) Match(domain string) bool
```

Match checks that the domain parameter triggers the rule

#### type [ProxyFunc](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L143) [¶](#ProxyFunc "Go to ProxyFunc")

```go
type ProxyFunc func(*http.Request) (*url.URL, error)
```

ProxyFunc is a type alias for proxy setter functions.

#### type [Request](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L29) [¶](#Request "Go to Request")

```go
type Request struct {
	// URL is the parsed URL of the HTTP request
	URL *url.URL
	// Headers contains the Request's HTTP headers
	Headers *http.Header
	// Ctx is a context between a Request and a Response
	Ctx *Context
	// Depth is the number of the parents of the request
	Depth int
	// Method is the HTTP method of the request
	Method string
	// Body is the request body which is used on POST/PUT requests
	Body io.Reader
	// ResponseCharacterencoding is the character encoding of the response body.
	// Leave it blank to allow automatic character encoding of the response body.
	// It is empty by default and it can be set in OnRequest callback.
	ResponseCharacterEncoding string
	// ID is the Unique identifier of the request
	ID uint32

	// ProxyURL is the proxy address that handles the request
	ProxyURL string
	// contains filtered or unexported fields
}
```

Request is the representation of a HTTP request made by a Collector

#### func (\*Request) [Abort](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L82) [¶](#Request.Abort "Go to Request.Abort")

```go
func (r *Request) Abort()
```

Abort cancels the HTTP request when called in an OnRequest callback

#### func (\*Request) [AbsoluteURL](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L89) [¶](#Request.AbsoluteURL "Go to Request.AbsoluteURL")

```go
func (r *Request) AbsoluteURL(u string) string
```

AbsoluteURL returns with the resolved absolute URL of an URL chunk. AbsoluteURL returns empty string if the URL chunk is a fragment or could not be parsed

#### func (\*Request) [Do](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L148) [¶](#Request.Do "Go to Request.Do")

```go
func (r *Request) Do() error
```

Do submits the request

#### func (\*Request) [Marshal](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L153) [¶](#Request.Marshal "Go to Request.Marshal")

```go
func (r *Request) Marshal() ([]byte, error)
```

Marshal serializes the Request

#### func (\*Request) [New](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L65) [¶](#Request.New "Go to Request.New")

```go
func (r *Request) New(method, URL string, body io.Reader) (*Request, error)
```

New creates a new request with the context of the original request

#### func (\*Request) [Post](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L120) [¶](#Request.Post "Go to Request.Post")

```go
func (r *Request) Post(URL string, requestData map[string]string) error
```

Post continues a collector job by creating a POST request and preserves the Context of the previous request. Post also calls the previously provided callbacks

#### func (\*Request) [PostMultipart](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L134) [¶](#Request.PostMultipart "Go to Request.PostMultipart")

```go
func (r *Request) PostMultipart(URL string, requestData map[string][]byte) error
```

PostMultipart starts a collector job by creating a Multipart POST request with raw binary data. PostMultipart also calls the previously provided. callbacks

#### func (\*Request) [PostRaw](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L127) [¶](#Request.PostRaw "Go to Request.PostRaw")

```go
func (r *Request) PostRaw(URL string, requestData []byte) error
```

PostRaw starts a collector job by creating a POST request with raw binary data. PostRaw preserves the Context of the previous request and calls the previously provided callbacks

#### func (\*Request) [Retry](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L143) [¶](#Request.Retry "Go to Request.Retry")

```go
func (r *Request) Retry() error
```

Retry submits HTTP request again with the same parameters

#### func (\*Request) [Visit](https://github.com/gocolly/colly/blob/v1.2.0/request.go#L113) [¶](#Request.Visit "Go to Request.Visit")

```go
func (r *Request) Visit(URL string) error
```

Visit continues Collector's collecting job by creating a request and preserves the Context of the previous request. Visit also calls the previously provided callbacks

#### type [RequestCallback](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L125) [¶](#RequestCallback "Go to RequestCallback")

```go
type RequestCallback func(*Request)
```

RequestCallback is a type alias for OnRequest callback functions

#### type [Response](https://github.com/gocolly/colly/blob/v1.2.0/response.go#L30) [¶](#Response "Go to Response")

```go
type Response struct {
	// StatusCode is the status code of the Response
	StatusCode int
	// Body is the content of the Response
	Body []byte
	// Ctx is a context between a Request and a Response
	Ctx *Context
	// Request is the Request object of the response
	Request *Request
	// Headers contains the Response's HTTP headers
	Headers *http.Header
}
```

Response is the representation of a HTTP response made by a Collector

#### func (\*Response) [FileName](https://github.com/gocolly/colly/blob/v1.2.0/response.go#L50) [¶](#Response.FileName "Go to Response.FileName")

```go
func (r *Response) FileName() string
```

FileName returns the sanitized file name parsed from "Content-Disposition" header or from URL

#### func (\*Response) [Save](https://github.com/gocolly/colly/blob/v1.2.0/response.go#L44) [¶](#Response.Save "Go to Response.Save")

```go
func (r *Response) Save(fileName string) error
```

Save writes response body to disk

#### type [ResponseCallback](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L128) [¶](#ResponseCallback "Go to ResponseCallback")

```go
type ResponseCallback func(*Response)
```

ResponseCallback is a type alias for OnResponse callback functions

#### type [ScrapedCallback](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L140) [¶](#ScrapedCallback "Go to ScrapedCallback")

```go
type ScrapedCallback func(*Response)
```

ScrapedCallback is a type alias for OnScraped callback functions

#### type [XMLCallback](https://github.com/gocolly/colly/blob/v1.2.0/colly.go#L134) [¶](#XMLCallback "Go to XMLCallback")

```go
type XMLCallback func(*XMLElement)
```

XMLCallback is a type alias for OnXML callback functions

#### type [XMLElement](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L27) [¶](#XMLElement "Go to XMLElement")

```go
type XMLElement struct {
	// Name is the name of the tag
	Name string
	Text string

	// Request is the request object of the element's HTML document
	Request *Request
	// Response is the Response object of the element's HTML document
	Response *Response
	// DOM is the DOM object of the page. DOM is relative
	// to the current XMLElement and is either a html.Node or xmlquery.Node
	// based on how the XMLElement was created.
	DOM interface{}
	// contains filtered or unexported fields
}
```

XMLElement is the representation of a XML tag.

#### func [NewXMLElementFromHTMLNode](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L44) [¶](#NewXMLElementFromHTMLNode "Go to NewXMLElementFromHTMLNode")

```go
func NewXMLElementFromHTMLNode(resp *Response, s *html.Node) *XMLElement
```

NewXMLElementFromHTMLNode creates a XMLElement from a html.Node.

#### func [NewXMLElementFromXMLNode](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L57) [¶](#NewXMLElementFromXMLNode "Go to NewXMLElementFromXMLNode")

```go
func NewXMLElementFromXMLNode(resp *Response, s *xmlquery.Node) *XMLElement
```

NewXMLElementFromXMLNode creates a XMLElement from a xmlquery.Node.

#### func (\*XMLElement) [Attr](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L71) [¶](#XMLElement.Attr "Go to XMLElement.Attr")

```go
func (h *XMLElement) Attr(k string) string
```

Attr returns the selected attribute of a HTMLElement or empty string if no attribute found

#### func (\*XMLElement) [ChildAttr](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L108) [¶](#XMLElement.ChildAttr "Go to XMLElement.ChildAttr")

```go
func (h *XMLElement) ChildAttr(xpathQuery, attrName string) string
```

ChildAttr returns the stripped text content of the first matching element's attribute.

#### func (\*XMLElement) [ChildAttrs](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L134) [¶](#XMLElement.ChildAttrs "Go to XMLElement.ChildAttrs")

```go
func (h *XMLElement) ChildAttrs(xpathQuery, attrName string) []string
```

ChildAttrs returns the stripped text content of all the matching element's attributes.

#### func (\*XMLElement) [ChildText](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L90) [¶](#XMLElement.ChildText "Go to XMLElement.ChildText")

```go
func (h *XMLElement) ChildText(xpathQuery string) string
```

ChildText returns the concatenated and stripped text content of the matching elements.

#### func (\*XMLElement) [ChildTexts](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go#L158) [¶](#XMLElement.ChildTexts "Go to XMLElement.ChildTexts") added in v1.1.0

```go
func (h *XMLElement) ChildTexts(xpathQuery string) []string
```

ChildTexts returns an array of strings corresponding to child elements that match the xpath query. Each item in the array is the stripped text content of the corresponding matching child element.
