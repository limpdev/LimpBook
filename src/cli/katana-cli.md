# ⚔️ katana ⚔️

>    

☞ *A fast crawler focused on execution in automation pipelines offering both headless and non-headless crawling.*

> [!NOTE]
> See also: `gau`, `scrapy`, `waymore` -> [More information](https://docs.projectdiscovery.io/tools/katana/running)

## TLDR

- Crawl a list of URLs:
```bash
katana -list https://example.com,https://google.com,...
```

- Crawl a [u]RL using headless mode using Chromium:
```bash
katana -u https://example.com [-hl|-headless]
```

- Pass requests through a proxy (http/socks5) and use custom headers from a file:
```bash
katana -proxy http://127.0.0.1:8080 [-H|-headers] path/to/headers.txt -u https://example.com
```

- Specify the crawling strategy, depth of subdirectories to crawl, and rate limiting (requests per second):
```bash
katana [-s|-strategy] depth-first|breadth-first [-d|-depth] value [-rl|-rate-limit] value -u https://example.com
```

- Find subdomains using `subfinder`, crawl each for a maximum number of seconds, and write results to an output file:
```bash
    subfinder [-dL|-list] path/to/domains.txt | katana [-ct|-crawl-duration] value [-o|-output] path/to/output.txt
```

---

## HELP

> *Usage:* `katana [flags]`

**==INPUT==**
```bash
-u, -list string[]     target url / list to crawl
-resume string         resume scan using resume.cfg
-e, -exclude string[]  exclude host matching specified filter ('cdn', 'private-ips', cidr, ip, regex)
```

==CONFIGURATION==
```bash
-r, -resolvers string[]           list of custom resolver (file or comma separated)
-d, -depth int                    maximum depth to crawl (default 3)
-jc, -js-crawl                    enable endpoint parsing / crawling in javascript file
-jsl, -jsluice                    enable jsluice parsing in javascript file (memory intensive)
-ct, -crawl-duration value        maximum duration to crawl the target for (s, m, h, d) (default s)
-kf, -known-files string          enable crawling of known files (all,robotstxt,sitemapxml),
                                  minimum depth of 3 is required to ensure all known files are properly crawled.

-mrs, -max-response-size int      maximum response size to read (default 4194304)
-timeout int                      time to wait for request in seconds (default 10)
-time-stable int                  time to wait until the page is stable in seconds (default 1)
-aff, -automatic-form-fill        enable automatic form filling (experimental)
-fx, -form-extraction             extract form, input, textarea & select elements in jsonl output
-retry int                        number of times to retry the request (default 1)
-proxy string                     http/socks5 proxy to use
-td, -tech-detect                 enable technology detection
-H, -headers string[]             custom header/cookie to include in all http request in header:value format (file)
-config string                    path to the katana configuration file
-fc, -form-config string          path to custom form configuration file
-flc, -field-config string        path to custom field configuration file
-s, -strategy string              Visit strategy (depth-first, breadth-first) (default "depth-first")
-iqp, -ignore-query-params        Ignore crawling same path with different query-param values
-tlsi, -tls-impersonate           enable experimental client hello (ja3) tls randomization
-dr, -disable-redirects           disable following redirects (default false)
```

==DEBUG==
```bash
-health-check, -hc                run diagnostic check up
-elog, -error-log string          file to write sent requests error log
-pprof-server                     enable pprof server
```

==HEADLESS==
```bash
   -hl, -headless                       enable headless hybrid crawling (experimental)
   -sc, -system-chrome                  use local installed chrome browser instead of katana installed
   -sb, -show-browser                   show the browser on the screen with headless mode
   -ho, -headless-options string[]      start headless chrome with additional options
   -nos, -no-sandbox                    start headless chrome in --no-sandbox mode
   -cdd, -chrome-data-dir string        path to store chrome browser data
   -scp, -system-chrome-path string     use specified chrome browser for headless crawling
   -noi, -no-incognito                  start headless chrome without incognito mode
   -cwu, -chrome-ws-url string          use chrome browser instance launched with the debugger at this URL
   -xhr, -xhr-extraction                extract xhr request url,method in jsonl output
```

==SCOPE==
```bash
-cs, -crawl-scope string[]           in scope url regex to be followed by crawler
-cos, -crawl-out-scope string[]      out of scope url regex to be excluded by crawler
-fs, -field-scope string             pre-defined scope field (dn,rdn,fqdn) or custom regex,
                                       (e.g., '(company-staging.io|company.com)') (default "rdn")

-ns, -no-scope                       disables host based default scope
-do, -display-out-scope              display external endpoint from scoped crawling
```

==FILTER==
```bash
-mr, -match-regex string[]            regex or list of regex to match on output url (cli, file)
-fr, -filter-regex string[]           regex or list of regex to filter on output url (cli, file)
-f, -field string                     field to display in output,
                                       (url,path,fqdn,rdn,rurl,qurl,qpath,file,ufile,key,value,kv,dir,udir)

-sf, -store-field string              field to store in per-host output,
                                       (url,path,fqdn,rdn,rurl,qurl,qpath,file,ufile,key,value,kv,dir,udir)

-em, -extension-match string[]        match output for given extension (eg, -em php,html,js)
-ef, -extension-filter string[]       filter output for given extension (eg, -ef png,css)
-mdc, -match-condition string         match response with dsl based condition
-fdc, -filter-condition string        filter response with dsl based condition
```

==RATE-LIMIT==
```bash
-c, -concurrency int                 number of concurrent fetchers to use (default 10)
-p, -parallelism int                 number of concurrent inputs to process (default 10)
-rd, -delay int                      request delay between each request in seconds
-rl, -rate-limit int                 maximum requests to send per second (default 150)
-rlm, -rate-limit-minute int         maximum number of requests to send per minute
```

==UPDATE==
```bash
-up, -update                         update katana to latest version
-duc, -disable-update-check          disable automatic katana update check
```

==OUTPUT==
```bash
-o, -output string                   file to write output to
-sr, -store-response                 store http requests/responses
-srd, -store-response-dir string     store http requests/responses to custom directory
-ncb, -no-clobber                    do not overwrite output file
-sfd, -store-field-dir string        store per-host field to custom directory
-or, -omit-raw                       omit raw requests/responses from jsonl output
-ob, -omit-body                      omit response body from jsonl output
-j, -jsonl                           write output in jsonl format
-nc, -no-color                       disable output content coloring (ANSI escape codes)
-silent                              display output only
-v, -verbose                         display verbose output
-debug                               display debug output
-version                             display project version
```
