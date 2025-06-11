#  colly

<details><summary>TABLE OF CONTENTS</summary>

- [ colly](#-colly)
    - [Constants ¶](#constants-)
    - [Variables ¶](#variables-)
    - [Functions ¶](#functions-)
      - [func AllowURLRevisit ¶](#func-allowurlrevisit-)
      - [func AllowedDomains ¶](#func-alloweddomains-)
      - [func Async ¶](#func-async-)
      - [func CacheDir ¶](#func-cachedir-)
      - [func Debugger ¶](#func-debugger-)
      - [func DetectCharset ¶](#func-detectcharset-)
      - [func DisallowedDomains ¶](#func-disalloweddomains-)
      - [func DisallowedURLFilters ¶](#func-disallowedurlfilters-)
      - [func ID ¶](#func-id-)
      - [func IgnoreRobotsTxt ¶](#func-ignorerobotstxt-)
      - [func MaxBodySize ¶](#func-maxbodysize-)
      - [func MaxDepth ¶](#func-maxdepth-)
      - [func ParseHTTPErrorResponse ¶](#func-parsehttperrorresponse-)
      - [func SanitizeFileName ¶](#func-sanitizefilename-)
      - [func URLFilters ¶](#func-urlfilters-)
      - [func UnmarshalHTML ¶](#func-unmarshalhtml-)
      - [func UserAgent ¶](#func-useragent-)
    - [Types ¶](#types-)
      - [type Collector ¶](#type-collector-)
      - [func NewCollector ¶](#func-newcollector-)
      - [func (\*Collector) Appengine ¶](#func-collector-appengine-)
      - [func (\*Collector) Clone ¶](#func-collector-clone-)
      - [func (\*Collector) Cookies ¶](#func-collector-cookies-)
      - [func (\*Collector) DisableCookies ¶](#func-collector-disablecookies-)
      - [func (\*Collector) Head ¶ added in v1.2.0](#func-collector-head--added-in-v120)
      - [func (\*Collector) Init ¶](#func-collector-init-)
      - [func (\*Collector) Limit ¶](#func-collector-limit-)
      - [func (\*Collector) Limits ¶](#func-collector-limits-)
      - [func (\*Collector) OnError ¶](#func-collector-onerror-)
      - [func (\*Collector) OnHTML ¶](#func-collector-onhtml-)
      - [func (\*Collector) OnHTMLDetach ¶](#func-collector-onhtmldetach-)
      - [func (\*Collector) OnRequest ¶](#func-collector-onrequest-)
      - [func (\*Collector) OnResponse ¶](#func-collector-onresponse-)
      - [func (\*Collector) OnScraped ¶](#func-collector-onscraped-)
      - [func (\*Collector) OnXML ¶](#func-collector-onxml-)
      - [func (\*Collector) OnXMLDetach ¶](#func-collector-onxmldetach-)
      - [func (\*Collector) Post ¶](#func-collector-post-)
      - [func (\*Collector) PostMultipart ¶](#func-collector-postmultipart-)
      - [func (\*Collector) PostRaw ¶](#func-collector-postraw-)
      - [func (\*Collector) Request ¶](#func-collector-request-)
      - [func (\*Collector) SetCookieJar ¶](#func-collector-setcookiejar-)
      - [func (\*Collector) SetCookies ¶](#func-collector-setcookies-)
      - [func (\*Collector) SetDebugger ¶](#func-collector-setdebugger-)
      - [func (\*Collector) SetProxy ¶](#func-collector-setproxy-)
      - [func (\*Collector) SetProxyFunc ¶](#func-collector-setproxyfunc-)
      - [func (\*Collector) SetRequestTimeout ¶](#func-collector-setrequesttimeout-)
      - [func (\*Collector) SetStorage ¶](#func-collector-setstorage-)
      - [func (\*Collector) String ¶](#func-collector-string-)
      - [func (\*Collector) UnmarshalRequest ¶](#func-collector-unmarshalrequest-)
      - [func (\*Collector) Visit ¶](#func-collector-visit-)
      - [func (\*Collector) Wait ¶](#func-collector-wait-)
      - [func (\*Collector) WithTransport ¶](#func-collector-withtransport-)
      - [type Context ¶](#type-context-)
      - [func NewContext ¶](#func-newcontext-)
      - [func (\*Context) ForEach ¶](#func-context-foreach-)
      - [func (\*Context) Get ¶](#func-context-get-)
      - [func (\*Context) GetAny ¶](#func-context-getany-)
      - [func (\*Context) MarshalBinary ¶](#func-context-marshalbinary-)
      - [func (\*Context) Put ¶](#func-context-put-)
      - [func (\*Context) UnmarshalBinary ¶](#func-context-unmarshalbinary-)
      - [type ErrorCallback ¶](#type-errorcallback-)
      - [type HTMLCallback ¶](#type-htmlcallback-)
      - [type HTMLElement ¶](#type-htmlelement-)
      - [func NewHTMLElementFromSelectionNode ¶](#func-newhtmlelementfromselectionnode-)
      - [func (\*HTMLElement) Attr ¶](#func-htmlelement-attr-)
      - [func (\*HTMLElement) ChildAttr ¶](#func-htmlelement-childattr-)
      - [func (\*HTMLElement) ChildAttrs ¶](#func-htmlelement-childattrs-)
      - [func (\*HTMLElement) ChildText ¶](#func-htmlelement-childtext-)
      - [func (\*HTMLElement) ForEach ¶](#func-htmlelement-foreach-)
      - [func (\*HTMLElement) ForEachWithBreak ¶ added in v1.1.0](#func-htmlelement-foreachwithbreak--added-in-v110)
      - [func (\*HTMLElement) Unmarshal ¶](#func-htmlelement-unmarshal-)
      - [type LimitRule ¶](#type-limitrule-)
      - [func (\*LimitRule) Init ¶](#func-limitrule-init-)
      - [func (\*LimitRule) Match ¶](#func-limitrule-match-)
      - [type ProxyFunc ¶](#type-proxyfunc-)
      - [type Request ¶](#type-request-)
      - [func (\*Request) Abort ¶](#func-request-abort-)
      - [func (\*Request) AbsoluteURL ¶](#func-request-absoluteurl-)
      - [func (\*Request) Do ¶](#func-request-do-)
      - [func (\*Request) Marshal ¶](#func-request-marshal-)
      - [func (\*Request) New ¶](#func-request-new-)
      - [func (\*Request) Post ¶](#func-request-post-)
      - [func (\*Request) PostMultipart ¶](#func-request-postmultipart-)
      - [func (\*Request) PostRaw ¶](#func-request-postraw-)
      - [func (\*Request) Retry ¶](#func-request-retry-)
      - [func (\*Request) Visit ¶](#func-request-visit-)
      - [type RequestCallback ¶](#type-requestcallback-)
      - [type Response ¶](#type-response-)
      - [func (\*Response) FileName ¶](#func-response-filename-)
      - [func (\*Response) Save ¶](#func-response-save-)
      - [type ResponseCallback ¶](#type-responsecallback-)
      - [type ScrapedCallback ¶](#type-scrapedcallback-)
      - [type XMLCallback ¶](#type-xmlcallback-)
      - [type XMLElement ¶](#type-xmlelement-)
      - [func NewXMLElementFromHTMLNode ¶](#func-newxmlelementfromhtmlnode-)
      - [func NewXMLElementFromXMLNode ¶](#func-newxmlelementfromxmlnode-)
      - [func (\*XMLElement) Attr ¶](#func-xmlelement-attr-)
      - [func (\*XMLElement) ChildAttr ¶](#func-xmlelement-childattr-)
      - [func (\*XMLElement) ChildAttrs ¶](#func-xmlelement-childattrs-)
      - [func (\*XMLElement) ChildText ¶](#func-xmlelement-childtext-)
      - [func (\*XMLElement) ChildTexts ¶ added in v1.1.0](#func-xmlelement-childtexts--added-in-v110)
  - [ Source Files ¶](#-source-files-)
  - [ Directories ¶](#-directories-)
  - [Jump to](#jump-to)
  - [Keyboard shortcuts](#keyboard-shortcuts)

</details>

### Constants [¶](#pkg-constants "Go to Constants")


```go
const ProxyURLKey key = iota
```

ProxyURLKey is the context key for the request proxy address.

### Variables [¶](#pkg-variables "Go to Variables")


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

## ![](/static/shared/icon/insert_drive_file_gm_grey_24dp.svg) Source Files [¶](#section-sourcefiles "Go to Source Files")

[View all Source files](https://github.com/gocolly/colly/tree/v1.2.0)

- [colly.go](https://github.com/gocolly/colly/blob/v1.2.0/colly.go "colly.go")
- [context.go](https://github.com/gocolly/colly/blob/v1.2.0/context.go "context.go")
- [htmlelement.go](https://github.com/gocolly/colly/blob/v1.2.0/htmlelement.go "htmlelement.go")
- [http\_backend.go](https://github.com/gocolly/colly/blob/v1.2.0/http_backend.go "http_backend.go")
- [request.go](https://github.com/gocolly/colly/blob/v1.2.0/request.go "request.go")
- [response.go](https://github.com/gocolly/colly/blob/v1.2.0/response.go "response.go")
- [unmarshal.go](https://github.com/gocolly/colly/blob/v1.2.0/unmarshal.go "unmarshal.go")
- [xmlelement.go](https://github.com/gocolly/colly/blob/v1.2.0/xmlelement.go "xmlelement.go")

## ![](/static/shared/icon/folder_gm_grey_24dp.svg) Directories [¶](#section-directories "Go to Directories")

Show internal Expand all

Path Synopsis

![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) \_examples

[basic](/github.com/gocolly/colly@v1.2.0/_examples/basic)

[coursera\_courses](/github.com/gocolly/colly@v1.2.0/_examples/coursera_courses)

[cryptocoinmarketcap](/github.com/gocolly/colly@v1.2.0/_examples/cryptocoinmarketcap)

[error\_handling](/github.com/gocolly/colly@v1.2.0/_examples/error_handling)

[factba.se](/github.com/gocolly/colly@v1.2.0/_examples/factba.se)

[google\_groups](/github.com/gocolly/colly@v1.2.0/_examples/google_groups)

[hackernews\_comments](/github.com/gocolly/colly@v1.2.0/_examples/hackernews_comments)

[instagram](/github.com/gocolly/colly@v1.2.0/_examples/instagram)

[local\_files](/github.com/gocolly/colly@v1.2.0/_examples/local_files)

[login](/github.com/gocolly/colly@v1.2.0/_examples/login)

[max\_depth](/github.com/gocolly/colly@v1.2.0/_examples/max_depth)

[multipart](/github.com/gocolly/colly@v1.2.0/_examples/multipart)

[openedx\_courses](/github.com/gocolly/colly@v1.2.0/_examples/openedx_courses)

[parallel](/github.com/gocolly/colly@v1.2.0/_examples/parallel)

[proxy\_switcher](/github.com/gocolly/colly@v1.2.0/_examples/proxy_switcher)

[queue](/github.com/gocolly/colly@v1.2.0/_examples/queue)

[random\_delay](/github.com/gocolly/colly@v1.2.0/_examples/random_delay)

[rate\_limit](/github.com/gocolly/colly@v1.2.0/_examples/rate_limit)

[reddit](/github.com/gocolly/colly@v1.2.0/_examples/reddit)

[request\_context](/github.com/gocolly/colly@v1.2.0/_examples/request_context)

[scraper\_server](/github.com/gocolly/colly@v1.2.0/_examples/scraper_server)

[shopify\_sitemap](/github.com/gocolly/colly@v1.2.0/_examples/shopify_sitemap)

[url\_filter](/github.com/gocolly/colly@v1.2.0/_examples/url_filter)

[xkcd\_store](/github.com/gocolly/colly@v1.2.0/_examples/xkcd_store)

![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) cmd

[colly](/github.com/gocolly/colly@v1.2.0/cmd/colly)

[debug](/github.com/gocolly/colly@v1.2.0/debug)

[extensions](/github.com/gocolly/colly@v1.2.0/extensions)

Package extensions implements various helper addons for Colly

Package extensions implements various helper addons for Colly

[proxy](/github.com/gocolly/colly@v1.2.0/proxy)

[queue](/github.com/gocolly/colly@v1.2.0/queue)

[storage](/github.com/gocolly/colly@v1.2.0/storage)

Click to show internal directories.

Click to hide internal directories.

[Why Go](https://go.dev/solutions) [Use Cases](https://go.dev/solutions#use-cases) [Case Studies](https://go.dev/solutions#case-studies)

[Get Started](https://learn.go.dev/) [Playground](https://play.golang.org) [Tour](https://tour.golang.org) [Stack Overflow](https://stackoverflow.com/questions/tagged/go?tab=Newest) [Help](https://go.dev/help)

[Packages](https://pkg.go.dev) [Standard Library](/std) [Sub-repositories](/golang.org/x) [About Go Packages](https://pkg.go.dev/about)

[About](https://go.dev/project) [Download](https://go.dev/dl/) [Blog](https://go.dev/blog) [Issue Tracker](https://github.com/golang/go/issues) [Release Notes](https://go.dev/doc/devel/release.html) [Brand Guidelines](https://go.dev/brand) [Code of Conduct](https://go.dev/conduct)

[Connect](https://www.twitter.com/golang) [Twitter](https://www.twitter.com/golang) [GitHub](https://github.com/golang) [Slack](https://invite.slack.golangbridge.org/) [r/golang](https://reddit.com/r/golang) [Meetup](https://www.meetup.com/pro/go) [Golang Weekly](https://golangweekly.com/)

![Gopher in flight goggles](/static/shared/gopher/pilot-bust-1431x901.svg)

- [Copyright](https://go.dev/copyright)
- [Terms of Service](https://go.dev/tos)
- [Privacy Policy](http://www.google.com/intl/en/policies/privacy/)
- [Report an Issue](https://go.dev/s/pkgsite-feedback)
- ![System theme](/static/shared/icon/brightness_6_gm_grey_24dp.svg) ![Dark theme](/static/shared/icon/brightness_2_gm_grey_24dp.svg) ![Light theme](/static/shared/icon/light_mode_gm_grey_24dp.svg)
  
  Theme Toggle
- ![](/static/shared/icon/keyboard_grey_24dp.svg)
  
  Shortcuts Modal

[![Google logo](/static/shared/logo/google-white.svg)](https://google.com)

## Jump to

![](/static/shared/icon/close_gm_grey_24dp.svg)

Close

## Keyboard shortcuts

![](/static/shared/icon/close_gm_grey_24dp.svg)

|                |                 |
|----------------|-----------------|
| **?**          | : This menu     |
| **/**          | : Search site   |
| **f** or **F** | : Jump to       |
| **y** or **Y** | : Canonical URL |

Close

go.dev uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic. [Learn more.](https://policies.google.com/technologies/cookies)

Okay