# Requests-HTML: HTML Parsing for Humans (writing Python 3)\![¶](#requests-html-html-parsing-for-humans-writing-python-3 "Permalink to this headline")

[![https://travis-ci.org/kennethreitz/requests-html.svg?branch=master](https://travis-ci.org/kennethreitz/requests-html.svg?branch=master)](https://travis-ci.org/kennethreitz/requests-html)

This library intends to make parsing HTML (e.g. scraping the web) as simple and intuitive as possible.

When using this library you automatically get:

- **Full JavaScript support**!
- *CSS Selectors* (a.k.a jQuery-style, thanks to PyQuery).
- *XPath Selectors*, for the faint at heart.
- Mocked user-agent (like a real web browser).
- Automatic following of redirects.
- Connection–pooling and cookie persistence.
- The Requests experience you know and love, with magical parsing abilities.

# Installation[¶](#installation "Permalink to this headline")

```
$ pipenv install requests-html
✨🍰✨
```

Only **Python 3.6** is supported.

# Tutorial &amp; Usage[¶](#tutorial-usage "Permalink to this headline")

Make a GET request to [python.org](https://python.org/), using [Requests](https://docs.python-requests.org/):

```
>>> from requests_html import HTMLSession
>>> session = HTMLSession()

>>> r = session.get('https://python.org/')
```

Grab a list of all links on the page, as–is (anchors excluded):

```
>>> r.html.links
{'//docs.python.org/3/tutorial/', '/about/apps/', 'https://github.com/python/pythondotorg/issues', '/accounts/login/', '/dev/peps/', '/about/legal/', '//docs.python.org/3/tutorial/introduction.html#lists', '/download/alternatives', 'http://feedproxy.google.com/~r/PythonInsider/~3/kihd2DW98YY/python-370a4-is-available-for-testing.html', '/download/other/', '/downloads/windows/', 'https://mail.python.org/mailman/listinfo/python-dev', '/doc/av', 'https://devguide.python.org/', '/about/success/#engineering', 'https://wiki.python.org/moin/PythonEventsCalendar#Submitting_an_Event', 'https://www.openstack.org', '/about/gettingstarted/', 'http://feedproxy.google.com/~r/PythonInsider/~3/AMoBel8b8Mc/python-3.html', '/success-stories/industrial-light-magic-runs-python/', 'http://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator', '/', 'http://pyfound.blogspot.com/', '/events/python-events/past/', '/downloads/release/python-2714/', 'https://wiki.python.org/moin/PythonBooks', 'http://plus.google.com/+Python', 'https://wiki.python.org/moin/', 'https://status.python.org/', '/community/workshops/', '/community/lists/', 'http://buildbot.net/', '/community/awards', 'http://twitter.com/ThePSF', 'https://docs.python.org/3/license.html', '/psf/donations/', 'http://wiki.python.org/moin/Languages', '/dev/', '/events/python-user-group/', 'https://wiki.qt.io/PySide', '/community/sigs/', 'https://wiki.gnome.org/Projects/PyGObject', 'http://www.ansible.com', 'http://www.saltstack.com', 'http://planetpython.org/', '/events/python-events', '/about/help/', '/events/python-user-group/past/', '/about/success/', '/psf-landing/', '/about/apps', '/about/', 'http://www.wxpython.org/', '/events/python-user-group/665/', 'https://www.python.org/psf/codeofconduct/', '/dev/peps/peps.rss', '/downloads/source/', '/psf/sponsorship/sponsors/', 'http://bottlepy.org', 'http://roundup.sourceforge.net/', 'http://pandas.pydata.org/', 'http://brochure.getpython.info/', 'https://bugs.python.org/', '/community/merchandise/', 'http://tornadoweb.org', '/events/python-user-group/650/', 'http://flask.pocoo.org/', '/downloads/release/python-364/', '/events/python-user-group/660/', '/events/python-user-group/638/', '/psf/', '/doc/', 'http://blog.python.org', '/events/python-events/604/', '/about/success/#government', 'http://python.org/dev/peps/', 'https://docs.python.org', 'http://feedproxy.google.com/~r/PythonInsider/~3/zVC80sq9s00/python-364-is-now-available.html', '/users/membership/', '/about/success/#arts', 'https://wiki.python.org/moin/Python2orPython3', '/downloads/', '/jobs/', 'http://trac.edgewall.org/', 'http://feedproxy.google.com/~r/PythonInsider/~3/wh73_1A-N7Q/python-355rc1-and-python-348rc1-are-now.html', '/privacy/', 'https://pypi.python.org/', 'http://www.riverbankcomputing.co.uk/software/pyqt/intro', 'http://www.scipy.org', '/community/forums/', '/about/success/#scientific', '/about/success/#software-development', '/shell/', '/accounts/signup/', 'http://www.facebook.com/pythonlang?fref=ts', '/community/', 'https://kivy.org/', '/about/quotes/', 'http://www.web2py.com/', '/community/logos/', '/community/diversity/', '/events/calendars/', 'https://wiki.python.org/moin/BeginnersGuide', '/success-stories/', '/doc/essays/', '/dev/core-mentorship/', 'http://ipython.org', '/events/', '//docs.python.org/3/tutorial/controlflow.html', '/about/success/#education', '/blogs/', '/community/irc/', 'http://pycon.blogspot.com/', '//jobs.python.org', 'http://www.pylonsproject.org/', 'http://www.djangoproject.com/', '/downloads/mac-osx/', '/about/success/#business', 'http://feedproxy.google.com/~r/PythonInsider/~3/x_c9D0S-4C4/python-370b1-is-now-available-for.html', 'http://wiki.python.org/moin/TkInter', 'https://docs.python.org/faq/', '//docs.python.org/3/tutorial/controlflow.html#defining-functions'}
```

Grab a list of all links on the page, in [absolute form](https://www.navegabem.com/absolute-or-relative-links.html) (anchors excluded):

```
>>> r.html.absolute_links
{'https://github.com/python/pythondotorg/issues', 'https://docs.python.org/3/tutorial/', 'https://www.python.org/about/success/', 'http://feedproxy.google.com/~r/PythonInsider/~3/kihd2DW98YY/python-370a4-is-available-for-testing.html', 'https://www.python.org/dev/peps/', 'https://mail.python.org/mailman/listinfo/python-dev', 'https://www.python.org/doc/', 'https://www.python.org/', 'https://www.python.org/about/', 'https://www.python.org/events/python-events/past/', 'https://devguide.python.org/', 'https://wiki.python.org/moin/PythonEventsCalendar#Submitting_an_Event', 'https://www.openstack.org', 'http://feedproxy.google.com/~r/PythonInsider/~3/AMoBel8b8Mc/python-3.html', 'https://docs.python.org/3/tutorial/introduction.html#lists', 'http://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator', 'http://pyfound.blogspot.com/', 'https://wiki.python.org/moin/PythonBooks', 'http://plus.google.com/+Python', 'https://wiki.python.org/moin/', 'https://www.python.org/events/python-events', 'https://status.python.org/', 'https://www.python.org/about/apps', 'https://www.python.org/downloads/release/python-2714/', 'https://www.python.org/psf/donations/', 'http://buildbot.net/', 'http://twitter.com/ThePSF', 'https://docs.python.org/3/license.html', 'http://wiki.python.org/moin/Languages', 'https://docs.python.org/faq/', 'https://jobs.python.org', 'https://www.python.org/about/success/#software-development', 'https://www.python.org/about/success/#education', 'https://www.python.org/community/logos/', 'https://www.python.org/doc/av', 'https://wiki.qt.io/PySide', 'https://www.python.org/events/python-user-group/660/', 'https://wiki.gnome.org/Projects/PyGObject', 'http://www.ansible.com', 'http://www.saltstack.com', 'https://www.python.org/dev/peps/peps.rss', 'http://planetpython.org/', 'https://www.python.org/events/python-user-group/past/', 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', 'https://www.python.org/community/diversity/', 'https://docs.python.org/3/tutorial/controlflow.html', 'https://www.python.org/community/awards', 'https://www.python.org/events/python-user-group/638/', 'https://www.python.org/about/legal/', 'https://www.python.org/dev/', 'https://www.python.org/download/alternatives', 'https://www.python.org/downloads/', 'https://www.python.org/community/lists/', 'http://www.wxpython.org/', 'https://www.python.org/about/success/#government', 'https://www.python.org/psf/', 'https://www.python.org/psf/codeofconduct/', 'http://bottlepy.org', 'http://roundup.sourceforge.net/', 'http://pandas.pydata.org/', 'http://brochure.getpython.info/', 'https://www.python.org/downloads/source/', 'https://bugs.python.org/', 'https://www.python.org/downloads/mac-osx/', 'https://www.python.org/about/help/', 'http://tornadoweb.org', 'http://flask.pocoo.org/', 'https://www.python.org/users/membership/', 'http://blog.python.org', 'https://www.python.org/privacy/', 'https://www.python.org/about/gettingstarted/', 'http://python.org/dev/peps/', 'https://www.python.org/about/apps/', 'https://docs.python.org', 'https://www.python.org/success-stories/', 'https://www.python.org/community/forums/', 'http://feedproxy.google.com/~r/PythonInsider/~3/zVC80sq9s00/python-364-is-now-available.html', 'https://www.python.org/community/merchandise/', 'https://www.python.org/about/success/#arts', 'https://wiki.python.org/moin/Python2orPython3', 'http://trac.edgewall.org/', 'http://feedproxy.google.com/~r/PythonInsider/~3/wh73_1A-N7Q/python-355rc1-and-python-348rc1-are-now.html', 'https://pypi.python.org/', 'https://www.python.org/events/python-user-group/650/', 'http://www.riverbankcomputing.co.uk/software/pyqt/intro', 'https://www.python.org/about/quotes/', 'https://www.python.org/downloads/windows/', 'https://www.python.org/events/calendars/', 'http://www.scipy.org', 'https://www.python.org/community/workshops/', 'https://www.python.org/blogs/', 'https://www.python.org/accounts/signup/', 'https://www.python.org/events/', 'https://kivy.org/', 'http://www.facebook.com/pythonlang?fref=ts', 'http://www.web2py.com/', 'https://www.python.org/psf/sponsorship/sponsors/', 'https://www.python.org/community/', 'https://www.python.org/download/other/', 'https://www.python.org/psf-landing/', 'https://www.python.org/events/python-user-group/665/', 'https://wiki.python.org/moin/BeginnersGuide', 'https://www.python.org/accounts/login/', 'https://www.python.org/downloads/release/python-364/', 'https://www.python.org/dev/core-mentorship/', 'https://www.python.org/about/success/#business', 'https://www.python.org/community/sigs/', 'https://www.python.org/events/python-user-group/', 'http://ipython.org', 'https://www.python.org/shell/', 'https://www.python.org/community/irc/', 'https://www.python.org/about/success/#engineering', 'http://www.pylonsproject.org/', 'http://pycon.blogspot.com/', 'https://www.python.org/about/success/#scientific', 'https://www.python.org/doc/essays/', 'http://www.djangoproject.com/', 'https://www.python.org/success-stories/industrial-light-magic-runs-python/', 'http://feedproxy.google.com/~r/PythonInsider/~3/x_c9D0S-4C4/python-370b1-is-now-available-for.html', 'http://wiki.python.org/moin/TkInter', 'https://www.python.org/jobs/', 'https://www.python.org/events/python-events/604/'}
```

Select an `Element` with a CSS Selector ([learn more](https://www.w3schools.com/cssref/css_selectors.asp)):

```
>>> about = r.html.find('#about', first=True)
```

Grab an `Element`’s text contents:

```
>>> print(about.text)
About
Applications
Quotes
Getting Started
Help
Python Brochure
```

Introspect an `Element`’s attributes ([learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)):

```
>>> about.attrs
{'id': 'about', 'class': ('tier-1', 'element-1'), 'aria-haspopup': 'true'}
```

Render out an `Element`’s HTML:

```
>>> about.html
'<li aria-haspopup="true" class="tier-1 element-1 " id="about">\n<a class="" href="/about/" title="">About</a>\n<ul aria-hidden="true" class="subnav menu" role="menu">\n<li class="tier-2 element-1" role="treeitem"><a href="/about/apps/" title="">Applications</a></li>\n<li class="tier-2 element-2" role="treeitem"><a href="/about/quotes/" title="">Quotes</a></li>\n<li class="tier-2 element-3" role="treeitem"><a href="/about/gettingstarted/" title="">Getting Started</a></li>\n<li class="tier-2 element-4" role="treeitem"><a href="/about/help/" title="">Help</a></li>\n<li class="tier-2 element-5" role="treeitem"><a href="http://brochure.getpython.info/" title="">Python Brochure</a></li>\n</ul>\n</li>'
```

Select an `Element` list within an `Element`:

```
>>> about.find('a')
[<Element 'a' href='/about/' title='' class=''>, <Element 'a' href='/about/apps/' title=''>, <Element 'a' href='/about/quotes/' title=''>, <Element 'a' href='/about/gettingstarted/' title=''>, <Element 'a' href='/about/help/' title=''>, <Element 'a' href='http://brochure.getpython.info/' title=''>]
```

Search for links within an element:

```
>>> about.absolute_links
{'http://brochure.getpython.info/', 'https://www.python.org/about/gettingstarted/', 'https://www.python.org/about/', 'https://www.python.org/about/quotes/', 'https://www.python.org/about/help/', 'https://www.python.org/about/apps/'}
```

Search for text on the page:

```
>>> r.html.search('Python is a {} language')[0]
programming
```

More complex CSS Selector example (copied from Chrome dev tools):

```
>>> r = session.get('https://github.com/')
>>> sel = 'body > div.application-main > div.jumbotron.jumbotron-codelines > div > div > div.col-md-7.text-center.text-md-left > p'

>>> print(r.html.find(sel, first=True).text)
GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside millions of other developers.
```

XPath is also supported ([learn more](https://msdn.microsoft.com/en-us/library/ms256086%28v=vs.110%29.aspx)):

```
>>> r.html.xpath('a')
[<Element 'a' class='btn' href='https://help.github.com/articles/supported-browsers'>]
```

You can also select only elements containing certain text:

```
>>> r = session.get('http://python-requests.org/')
>>> r.html.find('a', containing='kenneth')
[<Element 'a' href='http://kennethreitz.com/pages/open-projects.html'>, <Element 'a' href='http://kennethreitz.org/'>, <Element 'a' href='https://twitter.com/kennethreitz' class=('twitter-follow-button',) data-show-count='false'>, <Element 'a' class=('reference', 'internal') href='dev/contributing/#kenneth-reitz-s-code-style'>]
```

# JavaScript Support[¶](#javascript-support "Permalink to this headline")

Let’s grab some text that’s rendered by JavaScript:

```
>>> r = session.get('http://python-requests.org/')

>>> r.html.render()

>>> r.html.search('Python 2 will retire in only {months} months!')['months']
'<time>25</time>'
```

Note, the first time you ever run the `render()` method, it will download Chromium into your home directory (e.g. `~/.pyppeteer/`). This only happens once.

# Pagination[¶](#pagination "Permalink to this headline")

There’s also intelligent pagination support (always improving):

```
>>> r = session.get('https://reddit.com')
>>> for html in r.html:
...     print(html)
<HTML url='https://www.reddit.com/'>
<HTML url='https://www.reddit.com/?count=25&after=t3_81puu5'>
<HTML url='https://www.reddit.com/?count=50&after=t3_81nevg'>
<HTML url='https://www.reddit.com/?count=75&after=t3_81lqtp'>
<HTML url='https://www.reddit.com/?count=100&after=t3_81k1c8'>
<HTML url='https://www.reddit.com/?count=125&after=t3_81p438'>
<HTML url='https://www.reddit.com/?count=150&after=t3_81nrcd'>
…
```

You can also just request the next URL easily:

```
>>> r = session.get('https://reddit.com')
>>> r.html.next()
'https://www.reddit.com/?count=25&after=t3_81pm82'
```

# Using without Requests[¶](#using-without-requests "Permalink to this headline")

You can also use this library without Requests:

```
>>> from requests_html import HTML
>>> doc = """<a href='https://httpbin.org'>"""

>>> html = HTML(html=doc)
>>> html.links
{'https://httpbin.org'}
```

You can also render JavaScript pages without Requests:

```
# ^^ proceeding from above ^^
>>> script = """
        () => {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                deviceScaleFactor: window.devicePixelRatio,
            }
        }
    """
>>> val = html.render(script=script, reload=False)

>>> print(val)
{'width': 800, 'height': 600, 'deviceScaleFactor': 1}

>>> print(html.html)
<html><head></head><body><a href="https://httpbin.org"></a></body></html>
```

# API Documentation[¶](#api-documentation "Permalink to this headline")

## Main Classes[¶](#module-requests_html "Permalink to this headline")

These classes are the main interface to `requests-html`:

*class* `requests_html.HTML`(*\*, session: Union\[\_ForwardRef('HTTPSession'), \_ForwardRef('AsyncHTMLSession')] = None, url: str = 'https://example.org/', html: Union\[str, bytes], default\_encoding: str = 'utf-8'*) → None[\[source\]](_modules/requests_html.html#HTML)[¶](#requests_html.HTML "Permalink to this definition")

An HTML document, ready for parsing.

Parameters:

- **url** – The URL from which the HTML originated, used for `absolute_links`.
- **html** – HTML from which to base the parsing upon (optional).
- **default\_encoding** – Which encoding to default to.

`absolute_links`[¶](#requests_html.HTML.absolute_links "Permalink to this definition")

All found links on page, in absolute form ([learn more](https://www.navegabem.com/absolute-or-relative-links.html)).

`base_url`[¶](#requests_html.HTML.base_url "Permalink to this definition")

The base URL for the page. Supports the `<base>` tag ([learn more](https://www.w3schools.com/tags/tag_base.asp)).

`encoding`[¶](#requests_html.HTML.encoding "Permalink to this definition")

The encoding string to be used, extracted from the HTML and `HTMLResponse` headers.

`find`(*selector: str = '\*'*, *\**, *containing: Union\[str*, *typing.List\[str]] = None*, *clean: bool = False*, *first: bool = False*, *\_encoding: str = None*) → Union\[typing.List\[\_ForwardRef('Element')], \_ForwardRef('Element')][¶](#requests_html.HTML.find "Permalink to this definition")

Given a CSS Selector, returns a list of [`Element`](#requests_html.Element "requests_html.Element") objects or a single one.

Parameters:

- **selector** – CSS Selector to use.
- **clean** – Whether or not to sanitize the found HTML of `<script>` and `<style>` tags.
- **containing** – If specified, only return elements that contain the provided text.
- **first** – Whether or not to return just the first result.
- **\_encoding** – The encoding format.

Example CSS Selectors:

- `a`
- `a.someClass`
- `a#someID`
- `a[target=_blank]`

See W3School’s [CSS Selectors Reference](https://www.w3schools.com/cssref/css_selectors.asp) for more details.

If `first` is `True`, only returns the first [`Element`](#requests_html.Element "requests_html.Element") found.

`full_text`[¶](#requests_html.HTML.full_text "Permalink to this definition")

The full text content (including links) of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`html`[¶](#requests_html.HTML.html "Permalink to this definition")

Unicode representation of the HTML content ([learn more](http://www.diveintopython3.net/strings.html)).

`links`[¶](#requests_html.HTML.links "Permalink to this definition")

All found links on page, in as–is form.

`lxml`[¶](#requests_html.HTML.lxml "Permalink to this definition")

[lxml](http://lxml.de) representation of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`pq`[¶](#requests_html.HTML.pq "Permalink to this definition")

[PyQuery](https://pythonhosted.org/pyquery/) representation of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`raw_html`[¶](#requests_html.HTML.raw_html "Permalink to this definition")

Bytes representation of the HTML content. ([learn more](http://www.diveintopython3.net/strings.html)).

`render`(*retries: int = 8*, *script: str = None*, *wait: float = 0.2*, *scrolldown=False*, *sleep: int = 0*, *reload: bool = True*, *timeout: Union\[float*, *int] = 8.0*, *keep\_page: bool = False*)[\[source\]](_modules/requests_html.html#HTML.render)[¶](#requests_html.HTML.render "Permalink to this definition")

Reloads the response in Chromium, and replaces HTML content with an updated version, with JavaScript executed.

Parameters:

- **retries** – The number of times to retry loading the page in Chromium.
- **script** – JavaScript to execute upon page load (optional).
- **wait** – The number of seconds to wait before loading the page, preventing timeouts (optional).
- **scrolldown** – Integer, if provided, of how many times to page down.
- **sleep** – Integer, if provided, of how many long to sleep after initial render.
- **reload** – If `False`, content will not be loaded from the browser, but will be provided from memory.
- **keep\_page** – If `True` will allow you to interact with the browser page through `r.html.page`.

If `scrolldown` is specified, the page will scrolldown the specified number of times, after sleeping the specified amount of time (e.g. `scrolldown=10, sleep=1`).

If just `sleep` is provided, the rendering will wait *n* seconds, before returning.

If `script` is specified, it will execute the provided JavaScript at runtime. Example:

```
script = """
    () => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        }
    }
"""
```

Returns the return value of the executed `script`, if any is provided:

```
>>> r.html.render(script=script)
{'width': 800, 'height': 600, 'deviceScaleFactor': 1}
```

Warning: If you use keep\_page, you’re responsable for closing each page, since opening to many at scale may crach the browser.

Warning: the first time you run this method, it will download Chromium into your home directory (`~/.pyppeteer`).

`search`(*template: str*) → parse.Result[¶](#requests_html.HTML.search "Permalink to this definition")

Search the [`Element`](#requests_html.Element "requests_html.Element") for the given Parse template.

| Parameters: | **template** – The Parse template to use. |
|-------------|-------------------------------------------|

`search_all`(*template: str*) → Union\[typing.List\[\_ForwardRef('Result')], \_ForwardRef('Result')][¶](#requests_html.HTML.search_all "Permalink to this definition")

Search the [`Element`](#requests_html.Element "requests_html.Element") (multiple times) for the given parse template.

| Parameters: | **template** – The Parse template to use. |
|-------------|-------------------------------------------|

`text`[¶](#requests_html.HTML.text "Permalink to this definition")

The text content of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`xpath`(*selector: str*, *\**, *clean: bool = False*, *first: bool = False*, *\_encoding: str = None*) → Union\[typing.List\[str], typing.List\[\_ForwardRef('Element')], str, \_ForwardRef('Element')][¶](#requests_html.HTML.xpath "Permalink to this definition")

Given an XPath selector, returns a list of [`Element`](#requests_html.Element "requests_html.Element") objects or a single one.

Parameters:

- **selector** – XPath Selector to use.
- **clean** – Whether or not to sanitize the found HTML of `<script>` and `<style>` tags.
- **first** – Whether or not to return just the first result.
- **\_encoding** – The encoding format.

If a sub-selector is specified (e.g. `//a/@href`), a simple list of results is returned.

See W3School’s [XPath Examples](https://www.w3schools.com/xml/xpath_examples.asp) for more details.

If `first` is `True`, only returns the first [`Element`](#requests_html.Element "requests_html.Element") found.

*class* `requests_html.Element`(*\**, *element*, *url: str*, *default\_encoding: str = None*) → None[\[source\]](_modules/requests_html.html#Element)[¶](#requests_html.Element "Permalink to this definition")

An element of HTML.

Parameters:

- **element** – The element from which to base the parsing upon.
- **url** – The URL from which the HTML originated, used for `absolute_links`.
- **default\_encoding** – Which encoding to default to.

`absolute_links`[¶](#requests_html.Element.absolute_links "Permalink to this definition")

All found links on page, in absolute form ([learn more](https://www.navegabem.com/absolute-or-relative-links.html)).

`attrs`[¶](#requests_html.Element.attrs "Permalink to this definition")

Returns a dictionary of the attributes of the [`Element`](#requests_html.Element "requests_html.Element") ([learn more](https://www.w3schools.com/tags/ref_attributes.asp)).

`base_url`[¶](#requests_html.Element.base_url "Permalink to this definition")

The base URL for the page. Supports the `<base>` tag ([learn more](https://www.w3schools.com/tags/tag_base.asp)).

`encoding`[¶](#requests_html.Element.encoding "Permalink to this definition")

The encoding string to be used, extracted from the HTML and `HTMLResponse` headers.

`find`(*selector: str = '\*'*, *\**, *containing: Union\[str*, *typing.List\[str]] = None*, *clean: bool = False*, *first: bool = False*, *\_encoding: str = None*) → Union\[typing.List\[\_ForwardRef('Element')], \_ForwardRef('Element')][¶](#requests_html.Element.find "Permalink to this definition")

Given a CSS Selector, returns a list of [`Element`](#requests_html.Element "requests_html.Element") objects or a single one.

Parameters:

- **selector** – CSS Selector to use.
- **clean** – Whether or not to sanitize the found HTML of `<script>` and `<style>` tags.
- **containing** – If specified, only return elements that contain the provided text.
- **first** – Whether or not to return just the first result.
- **\_encoding** – The encoding format.

Example CSS Selectors:

- `a`
- `a.someClass`
- `a#someID`
- `a[target=_blank]`

See W3School’s [CSS Selectors Reference](https://www.w3schools.com/cssref/css_selectors.asp) for more details.

If `first` is `True`, only returns the first [`Element`](#requests_html.Element "requests_html.Element") found.

`full_text`[¶](#requests_html.Element.full_text "Permalink to this definition")

The full text content (including links) of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`html`[¶](#requests_html.Element.html "Permalink to this definition")

Unicode representation of the HTML content ([learn more](http://www.diveintopython3.net/strings.html)).

`links`[¶](#requests_html.Element.links "Permalink to this definition")

All found links on page, in as–is form.

`lxml`[¶](#requests_html.Element.lxml "Permalink to this definition")

[lxml](http://lxml.de) representation of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`pq`[¶](#requests_html.Element.pq "Permalink to this definition")

[PyQuery](https://pythonhosted.org/pyquery/) representation of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`raw_html`[¶](#requests_html.Element.raw_html "Permalink to this definition")

Bytes representation of the HTML content. ([learn more](http://www.diveintopython3.net/strings.html)).

`search`(*template: str*) → parse.Result[¶](#requests_html.Element.search "Permalink to this definition")

Search the [`Element`](#requests_html.Element "requests_html.Element") for the given Parse template.

| Parameters: | **template** – The Parse template to use. |
|-------------|-------------------------------------------|

`search_all`(*template: str*) → Union\[typing.List\[\_ForwardRef('Result')], \_ForwardRef('Result')][¶](#requests_html.Element.search_all "Permalink to this definition")

Search the [`Element`](#requests_html.Element "requests_html.Element") (multiple times) for the given parse template.

| Parameters: | **template** – The Parse template to use. |
|-------------|-------------------------------------------|

`text`[¶](#requests_html.Element.text "Permalink to this definition")

The text content of the [`Element`](#requests_html.Element "requests_html.Element") or [`HTML`](#requests_html.HTML "requests_html.HTML").

`xpath`(*selector: str*, *\**, *clean: bool = False*, *first: bool = False*, *\_encoding: str = None*) → Union\[typing.List\[str], typing.List\[\_ForwardRef('Element')], str, \_ForwardRef('Element')][¶](#requests_html.Element.xpath "Permalink to this definition")

Given an XPath selector, returns a list of [`Element`](#requests_html.Element "requests_html.Element") objects or a single one.

Parameters:

- **selector** – XPath Selector to use.
- **clean** – Whether or not to sanitize the found HTML of `<script>` and `<style>` tags.
- **first** – Whether or not to return just the first result.
- **\_encoding** – The encoding format.

If a sub-selector is specified (e.g. `//a/@href`), a simple list of results is returned.

See W3School’s [XPath Examples](https://www.w3schools.com/xml/xpath_examples.asp) for more details.

If `first` is `True`, only returns the first [`Element`](#requests_html.Element "requests_html.Element") found.

## Utility Functions[¶](#utility-functions "Permalink to this headline")

`requests_html.user_agent`(*style=None*) → str[\[source\]](_modules/requests_html.html#user_agent)[¶](#requests_html.user_agent "Permalink to this definition")

Returns an apparently legit user-agent, if not requested one of a specific style. Defaults to a Chrome-style User-Agent.

## HTML Sessions[¶](#html-sessions "Permalink to this headline")

These sessions are for making HTTP requests:

*class* `requests_html.HTMLSession`(*mock\_browser=True*)[\[source\]](_modules/requests_html.html#HTMLSession)[¶](#requests_html.HTMLSession "Permalink to this definition")

A consumable session, for cookie persistence and connection pooling, amongst other things.

`close`()[\[source\]](_modules/requests_html.html#HTMLSession.close)[¶](#requests_html.HTMLSession.close "Permalink to this definition")

If a browser was created close it first.

`delete`(*url*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.delete "Permalink to this definition")

Sends a DELETE request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`get`(*url*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.get "Permalink to this definition")

Sends a GET request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`get_adapter`(*url*)[¶](#requests_html.HTMLSession.get_adapter "Permalink to this definition")

Returns the appropriate connection adapter for the given URL.

| Return type: | requests.adapters.BaseAdapter |
|--------------|-------------------------------|

`get_redirect_target`(*resp*)[¶](#requests_html.HTMLSession.get_redirect_target "Permalink to this definition")

Receives a Response. Returns a redirect URI or `None`

`head`(*url*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.head "Permalink to this definition")

Sends a HEAD request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`merge_environment_settings`(*url*, *proxies*, *stream*, *verify*, *cert*)[¶](#requests_html.HTMLSession.merge_environment_settings "Permalink to this definition")

Check the environment and merge it with some settings.

| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.6)") |
|--------------|---------------------------------------------------------------------------------|

`mount`(*prefix*, *adapter*)[¶](#requests_html.HTMLSession.mount "Permalink to this definition")

Registers a connection adapter to a prefix.

Adapters are sorted in descending order by prefix length.

`options`(*url*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.options "Permalink to this definition")

Sends a OPTIONS request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`patch`(*url*, *data=None*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.patch "Permalink to this definition")

Sends a PATCH request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **data** – (optional) Dictionary, bytes, or file-like object to send in the body of the `Request`.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`post`(*url*, *data=None*, *json=None*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.post "Permalink to this definition")

Sends a POST request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **data** – (optional) Dictionary, bytes, or file-like object to send in the body of the `Request`.
- **json** – (optional) json to send in the body of the `Request`.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`prepare_request`(*request*)[¶](#requests_html.HTMLSession.prepare_request "Permalink to this definition")

Constructs a `PreparedRequest` for transmission and returns it. The `PreparedRequest` has settings merged from the `Request` instance and those of the `Session`.

| Parameters:  | **request** – `Request` instance to prepare with this session’s settings. |
|--------------|---------------------------------------------------------------------------|
| Return type: | requests.PreparedRequest                                                  |

`put`(*url*, *data=None*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.put "Permalink to this definition")

Sends a PUT request. Returns `Response` object.

Parameters:

- **url** – URL for the new `Request` object.
- **data** – (optional) Dictionary, bytes, or file-like object to send in the body of the `Request`.
- **\*\*kwargs** – Optional arguments that `request` takes.

Return type:

requests.Response

`rebuild_auth`(*prepared\_request*, *response*)[¶](#requests_html.HTMLSession.rebuild_auth "Permalink to this definition")

When being redirected we may want to strip authentication from the request to avoid leaking credentials. This method intelligently removes and reapplies authentication where possible to avoid credential loss.

`rebuild_method`(*prepared\_request*, *response*)[¶](#requests_html.HTMLSession.rebuild_method "Permalink to this definition")

When being redirected we may want to change the method of the request based on certain specs or browser behavior.

`rebuild_proxies`(*prepared\_request*, *proxies*)[¶](#requests_html.HTMLSession.rebuild_proxies "Permalink to this definition")

This method re-evaluates the proxy configuration by considering the environment variables. If we are redirected to a URL covered by NO\_PROXY, we strip the proxy configuration. Otherwise, we set missing proxy keys for this URL (in case they were stripped by a previous redirect).

This method also replaces the Proxy-Authorization header where necessary.

| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.6)") |
|--------------|---------------------------------------------------------------------------------|

`request`(*\*args*, *\*\*kwargs*) → requests\_html.HTMLResponse[\[source\]](_modules/requests_html.html#HTMLSession.request)[¶](#requests_html.HTMLSession.request "Permalink to this definition")

Makes an HTTP Request, with mocked User–Agent headers. Returns a class:HTTPResponse &lt;HTTPResponse&gt;.

`resolve_redirects`(*resp*, *req*, *stream=False*, *timeout=None*, *verify=True*, *cert=None*, *proxies=None*, *yield\_requests=False*, *\*\*adapter\_kwargs*)[¶](#requests_html.HTMLSession.resolve_redirects "Permalink to this definition")

Receives a Response. Returns a generator of Responses or Requests.

`send`(*request*, *\*\*kwargs*)[¶](#requests_html.HTMLSession.send "Permalink to this definition")

Send a given PreparedRequest.

| Return type: | requests.Response |
|--------------|-------------------|

# Indices and tables[¶](#indices-and-tables "Permalink to this headline")

- [Index](genindex.html)
- [Module Index](py-modindex.html)
- [Search Page](search.html)

[![](_static/requests-html-logo.png "https://kennethreitz.org/tattoos")](#)

**Requests-HTML** intends to make parsing HTML (e.g. scraping the web) as simple and intuitive as possible.

### Stay Informed

Receive updates on new releases and upcoming projects.

[Follow @kennethreitz](https://twitter.com/kennethreitz)

[Say Thanks!](https://saythanks.io/to/kennethreitz)

[Join Mailing List](http://tinyletter.com/kennethreitz).

### Other Projects

More [Kenneth Reitz](http://kennethreitz.org/) projects:

- [python-requests.org](https://python-requests.org/)
- [howtopython.org](http://howtopython.org/)
- [pipenv](http://pipenv.org/)
- [pep8.org](http://pep8.org/)
- [httpbin.org](http://httpbin.org/)
- [The Python Guide](http://python-guide.org)
- [Maya: Datetimes for Humans](https://github.com/kennethreitz/maya)
- [Records: SQL for Humans](https://github.com/kennethreitz/records)
- [Legit: Git for Humans](http://www.git-legit.org)
- [Tablib: Tabular Datasets](http://docs.python-tablib.org/en/latest/)

### Quick search

©MMXVIII. A [Kenneth Reitz](http://kennethreitz.com/pages/open-projects.html) Project.

[![Fork me on GitHub](https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png)](https://github.com/kennethreitz/requests-html)