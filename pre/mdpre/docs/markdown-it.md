# markdown-it <!-- omit in toc -->

[![CI](https://github.com/markdown-it/markdown-it/actions/workflows/ci.yml/badge.svg)](https://github.com/markdown-it/markdown-it/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/markdown-it.svg?style=flat)](https://www.npmjs.org/package/markdown-it)
[![Coverage Status](https://coveralls.io/repos/markdown-it/markdown-it/badge.svg?branch=master&service=github)](https://coveralls.io/github/markdown-it/markdown-it?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/markdown-it/markdown-it)

> Markdown parser done right. Fast and easy to extend.

__[Live demo](https://markdown-it.github.io)__

- Follows the __[CommonMark spec](http://spec.commonmark.org/)__ + adds syntax extensions & sugar (URL autolinking, typographer).
- Configurable syntax! You can add new rules and even replace existing ones.
- High speed.
- [Safe](https://github.com/markdown-it/markdown-it/tree/master/docs/security.md) by default.
- Community-written __[plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin)__ and [other packages](https://www.npmjs.org/browse/keyword/markdown-it) on npm.

__Table of content__

- [Install](#install)
- [Usage examples](#usage-examples)
  - [Simple](#simple)
  - [Init with presets and options](#init-with-presets-and-options)
  - [Plugins load](#plugins-load)
  - [Syntax highlighting](#syntax-highlighting)
  - [Linkify](#linkify)
- [API](#api)
- [Syntax extensions](#syntax-extensions)
  - [Manage rules](#manage-rules)
- [Benchmark](#benchmark)
- [markdown-it for enterprise](#markdown-it-for-enterprise)
- [Authors](#authors)
- [References / Thanks](#references--thanks)

## Install

**node.js**:

```bash
npm install markdown-it
```

**browser (CDN):**

- [jsDeliver CDN](http://www.jsdelivr.com/#!markdown-it "jsDelivr CDN")
- [cdnjs.com CDN](https://cdnjs.com/libraries/markdown-it "cdnjs.com")


## Usage examples

See also:

- __[API documentation](https://markdown-it.github.io/markdown-it/)__ - for more
  info and examples.
- [Development info](https://github.com/markdown-it/markdown-it/tree/master/docs) -
  for plugins writers.


### Simple

```js
// node.js
// can use `require('markdown-it')` for CJS
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.render('# markdown-it rulezz!');

// browser with UMD build, added to "window" on script load
// Note, there is no dash in "markdownit".
const md = window.markdownit();
const result = md.render('# markdown-it rulezz!');
```

Single line rendering, without paragraph wrap:

```js
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.renderInline('__markdown-it__ rulezz!');
```


### Init with presets and options

(*) presets define combinations of active rules and options. Can be
`"commonmark"`, `"zero"` or `"default"` (if skipped). See
[API docs](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) for more details.

```js
import markdownit from 'markdown-it'

// commonmark mode
const md = markdownit('commonmark')

// default mode
const md = markdownit()

// enable everything
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

// full options list (defaults)
const md = markdownit({
  // Enable HTML tags in source
  html:         false,

  // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  xhtmlOut:     false,

  // Convert '\n' in paragraphs into <br>
  breaks:       false,

  // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  langPrefix:   'language-',

  // Autoconvert URL-like text to links
  linkify:      false,

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});
```

### Plugins load

```js
import markdownit from 'markdown-it'

const md = markdownit
  .use(plugin1)
  .use(plugin2, opts, ...)
  .use(plugin3);
```


### Syntax highlighting

Apply syntax highlighting to fenced code blocks with the `highlight` option:

```js
import markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

// Actual default values
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
```

Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):

```js
import markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

// Actual default values
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
```

### Linkify

`linkify: true` uses [linkify-it](https://github.com/markdown-it/linkify-it). To
configure linkify-it, access the linkify instance through `md.linkify`:

```js
md.linkify.set({ fuzzyEmail: false });  // disables converting email to link
```


## API

__[API documentation](https://markdown-it.github.io/markdown-it/)__

If you are going to write plugins, please take a look at
[Development info](https://github.com/markdown-it/markdown-it/tree/master/docs).


## Syntax extensions

Embedded (enabled by default):

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

Via plugins:

- [subscript](https://github.com/markdown-it/markdown-it-sub)
- [superscript](https://github.com/markdown-it/markdown-it-sup)
- [footnote](https://github.com/markdown-it/markdown-it-footnote)
- [definition list](https://github.com/markdown-it/markdown-it-deflist)
- [abbreviation](https://github.com/markdown-it/markdown-it-abbr)
- [emoji](https://github.com/markdown-it/markdown-it-emoji)
- [custom container](https://github.com/markdown-it/markdown-it-container)
- [insert](https://github.com/markdown-it/markdown-it-ins)
- [mark](https://github.com/markdown-it/markdown-it-mark)
- ... and [others](https://www.npmjs.org/browse/keyword/markdown-it-plugin)


### Manage rules

By default all rules are enabled, but can be restricted by options. On plugin
load all its rules are enabled automatically.

```js
import markdownit from 'markdown-it'

// Activate/deactivate rules, with currying
const md = markdownit()
  .disable(['link', 'image'])
  .enable(['link'])
  .enable('image');

// Enable everything
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});
```

You can find all rules in sources:

- [`parser_core.mjs`](lib/parser_core.mjs)
- [`parser_block.mjs`](lib/parser_block.mjs)
- [`parser_inline.mjs`](lib/parser_inline.mjs)


## Benchmark

Here is the result of readme parse at MB Pro Retina 2013 (2.4 GHz):

```bash
npm run benchmark-deps
benchmark/benchmark.mjs readme

Selected samples: (1 of 28)
 > README

Sample: README.md (7774 bytes)
 > commonmark-reference x 1,222 ops/sec ±0.96% (97 runs sampled)
 > current x 743 ops/sec ±0.84% (97 runs sampled)
 > current-commonmark x 1,568 ops/sec ±0.84% (98 runs sampled)
 > marked x 1,587 ops/sec ±4.31% (93 runs sampled)
```

__Note.__ CommonMark version runs with [simplified link normalizers](https://github.com/markdown-it/markdown-it/blob/master/benchmark/implementations/current-commonmark/index.mjs)
for more "honest" compare. Difference is ≈1.5×.

As you can see, `markdown-it` doesn't pay with speed for its flexibility.
Slowdown of "full" version caused by additional features not available in
other implementations.


## markdown-it for enterprise

Available as part of the Tidelift Subscription.

The maintainers of `markdown-it` and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-markdown-it?utm_source=npm-markdown-it&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)


## Authors

- Alex Kocharin [github/rlidwka](https://github.com/rlidwka)
- Vitaly Puzrin [github/puzrin](https://github.com/puzrin)

_markdown-it_ is the result of the decision of the authors who contributed to
99% of the _Remarkable_ code to move to a project with the same authorship but
new leadership (Vitaly and Alex). It's not a fork.

## References / Thanks

Big thanks to [John MacFarlane](https://github.com/jgm) for his work on the
CommonMark spec and reference implementations. His work saved us a lot of time
during this project's development.

**Related Links:**

- https://github.com/jgm/CommonMark - reference CommonMark implementations in C & JS,
  also contains latest spec & online demo.
- http://talk.commonmark.org - CommonMark forum, good place to collaborate
  developers' efforts.

**Ports**

- [motion-markdown-it](https://github.com/digitalmoksha/motion-markdown-it) - Ruby/RubyMotion
- [markdown-it-py](https://github.com/ExecutableBookProject/markdown-it-py)- Python
# markdown-it

## Install

**node.js**:

```bash
npm install markdown-it
```

**browser (CDN):**

- [jsDeliver CDN](http://www.jsdelivr.com/#!markdown-it "jsDelivr CDN")
- [cdnjs.com CDN](https://cdnjs.com/libraries/markdown-it "cdnjs.com")

## Usage examples

See also:

- [Development info](https://github.com/markdown-it/markdown-it/tree/master/docs) - for plugins writers.

### Simple

```js
// node.js
// can use `require('markdown-it')` for CJS
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.render('# markdown-it rulezz!');

// browser with UMD build, added to "window" on script load
// Note, there is no dash in "markdownit".
const md = window.markdownit();
const result = md.render('# markdown-it rulezz!');
```

Single line rendering, without paragraph wrap:

```js
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.renderInline('__markdown-it__ rulezz!');
```

### Init with presets and options

(\*) presets define combinations of active rules and options. Can be `"commonmark"`, `"zero"` or `"default"` (if skipped). See [API docs](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) for more details.

```js
import markdownit from 'markdown-it'

// commonmark mode
const md = markdownit('commonmark')

// default mode
const md = markdownit()

// enable everything
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

// full options list (defaults)
const md = markdownit({
  // Enable HTML tags in source
  html:         false,

  // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  xhtmlOut:     false,

  // Convert '\n' in paragraphs into <br>
  breaks:       false,

  // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  langPrefix:   'language-',

  // Autoconvert URL-like text to links
  linkify:      false,

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});
```

### Plugins load

```js
import markdownit from 'markdown-it'

const md = markdownit
  .use(plugin1)
  .use(plugin2, opts, ...)
  .use(plugin3);
```

### Syntax highlighting

Apply syntax highlighting to fenced code blocks with the `highlight` option:

```js
import markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

// Actual default values
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
```

Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):

```js
import markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

// Actual default values
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
```

### Linkify

`linkify: true` uses [linkify-it](https://github.com/markdown-it/linkify-it). To configure linkify-it, access the linkify instance through `md.linkify`:

```js
md.linkify.set({ fuzzyEmail: false });  // disables converting email to link
```

## Syntax extensions

Embedded (enabled by default):

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

Via plugins:

- [subscript](https://github.com/markdown-it/markdown-it-sub)
- [superscript](https://github.com/markdown-it/markdown-it-sup)
- [footnote](https://github.com/markdown-it/markdown-it-footnote)
- [definition list](https://github.com/markdown-it/markdown-it-deflist)
- [abbreviation](https://github.com/markdown-it/markdown-it-abbr)
- [emoji](https://github.com/markdown-it/markdown-it-emoji)
- [custom container](https://github.com/markdown-it/markdown-it-container)
- [insert](https://github.com/markdown-it/markdown-it-ins)
- [mark](https://github.com/markdown-it/markdown-it-mark)
- ... and [others](https://www.npmjs.org/browse/keyword/markdown-it-plugin)

### Manage rules

By default all rules are enabled, but can be restricted by options. On plugin load all its rules are enabled automatically.

```js
import markdownit from 'markdown-it'

// Activate/deactivate rules, with currying
const md = markdownit()
  .disable(['link', 'image'])
  .enable(['link'])
  .enable('image');

// Enable everything
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});
```

- [Home](#home)
- [Core](#Core "Core (class)")

## Core

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_core.mjs#L7)

internal

### Description

Top-level rules executor. Glues block/inline parsers and does intermediate transformations.

### Constructor

- [new Core](#Core.new "new Core (constructor)")

### Class methods

- [process](#Core.process "Core.process (class method)")

### Instance properties

- [ruler](#Core.prototype.ruler "Core#ruler (instance property)")

<!--THE END-->

- [Home](#home)
- [Core](#Core "Core (class)")
- [new](#Core.new "new Core (constructor)")

## Core.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_core.mjs#L34)

- - new Core()

<!--THE END-->

- [Home](#home)
- [Core](#Core "Core (class)")
- [process](#Core.process "Core.process (class method)")

## Core.process

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_core.mjs#L52)

- - Core.process(state)

Executes core chain rules.

- [Home](#home)
- [Core](#Core "Core (class)")
- [ruler](#Core.prototype.ruler "Core#ruler (instance property)")

## Core#ruler

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_core.mjs#L40)

- - Core#ruler
  - - [Ruler](#Ruler "Ruler (class)")

[Ruler](#Ruler "Ruler (class)") instance. Keep configuration of core rules.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")

## MarkdownIt

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L114)

### Description

Main parser/renderer class.

##### Usage

```javascript
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// node.js, the same, but with sugar:
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there are no dash.
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

Single line rendering, without paragraph wrap:

```javascript
var md = require('markdown-it')();
var result = md.renderInline('__markdown-it__ rulezz!');
```

### Constructor

- [new MarkdownIt](#MarkdownIt.new "new MarkdownIt (constructor)")

### Class methods

- [configure](#MarkdownIt.configure "MarkdownIt.configure (class method)")
- [disable](#MarkdownIt.disable "MarkdownIt.disable (class method)")
- [enable](#MarkdownIt.enable "MarkdownIt.enable (class method)")
- [parse](#MarkdownIt.parse "MarkdownIt.parse (class method)")
- [parseInline](#MarkdownIt.parseInline "MarkdownIt.parseInline (class method)")
- [render](#MarkdownIt.render "MarkdownIt.render (class method)")
- [renderInline](#MarkdownIt.renderInline "MarkdownIt.renderInline (class method)")
- [set](#MarkdownIt.set "MarkdownIt.set (class method)")
- [use](#MarkdownIt.use "MarkdownIt.use (class method)")

### Instance methods

- [normalizeLink](#MarkdownIt.prototype.normalizeLink "MarkdownIt#normalizeLink (instance method)")
- [normalizeLinkText](#MarkdownIt.prototype.normalizeLinkText "MarkdownIt#normalizeLinkText (instance method)")
- [validateLink](#MarkdownIt.prototype.validateLink "MarkdownIt#validateLink (instance method)")

### Instance properties

- [block](#MarkdownIt.prototype.block "MarkdownIt#block (instance property)")
- [core](#MarkdownIt.prototype.core "MarkdownIt#core (instance property)")
- [helpers](#MarkdownIt.prototype.helpers "MarkdownIt#helpers (instance property)")
- [inline](#MarkdownIt.prototype.inline "MarkdownIt#inline (instance property)")
- [linkify](#MarkdownIt.prototype.linkify "MarkdownIt#linkify (instance property)")
- [renderer](#MarkdownIt.prototype.renderer "MarkdownIt#renderer (instance property)")
- [utils](#MarkdownIt.prototype.utils "MarkdownIt#utils (instance property)")

<!--THE END-->

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [new](#MarkdownIt.new "new MarkdownIt (constructor)")

## MarkdownIt.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L217)

- - new MarkdownIt(\[presetName]\[, options])

<!--THE END-->

- - presetName
  - - String
  - optional, `commonmark` / `zero`
- - options
  - - Object

Creates parser instanse with given config. Can be called without `new`.

##### presetName

MarkdownIt provides named presets as a convenience to quickly enable/disable active syntax rules and options for common use cases.

- ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) - configures parser to strict [CommonMark](http://commonmark.org/) mode.
- [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) - similar to GFM, used when no preset name given. Enables all available rules, but still without html, typographer &amp; autolinker.
- ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) - all rules disabled. Useful to quickly setup your config via `.enable()`. For example, when you need only `bold` and `italic` markup and nothing else.

##### options:

- **html** - `false`. Set `true` to enable HTML tags in source. Be careful! That's not safe! You may need external sanitizer to protect output from XSS. It's better to extend features via plugins, instead of enabling HTML.
- **xhtmlOut** - `false`. Set `true` to add '/' when closing single tags (`<br />`). This is needed only for full CommonMark compatibility. In real world you will need HTML output.
- **breaks** - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
- **langPrefix** - `language-`. CSS language class prefix for fenced blocks. Can be useful for external highlighters.
- **linkify** - `false`. Set `true` to autoconvert URL-like text to links.
- **typographer** - `false`. Set `true` to enable [some language-neutral replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs) + quotes beautification (smartquotes).
- **quotes** - `“”‘’`, String or Array. Double + single quotes replacement pairs, when typographer enabled and smartquotes on. For example, you can use `'«»„“'` for Russian, `'„“‚‘'` for German, and `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
- **highlight** - `null`. Highlighter function for fenced code blocks. Highlighter `function (str, lang)` should return escaped HTML. It can also return empty string if the source was not changed and should be escaped externaly. If result starts with &lt;pre... internal wrapper is skipped.

##### Example

```javascript
// commonmark mode
var md = require('markdown-it')('commonmark');

// default mode
var md = require('markdown-it')();

// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
```

##### Syntax highlighting

```js
var hljs = require('highlight.js') // https://highlightjs.org/

var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
```

Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):

```javascript
var hljs = require('highlight.js') // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
```

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [configure](#MarkdownIt.configure "MarkdownIt.configure (class method)")

## MarkdownIt.configure

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L378)

chainableinternal

- - MarkdownIt.configure(presets)

Batch load of all options and compenent settings. This is internal method, and you probably will not need it. But if you will - see available presets and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)

We strongly recommend to use presets instead of direct config loads. That will give better compatibility with next versions.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [disable](#MarkdownIt.disable "MarkdownIt.disable (class method)")

## MarkdownIt.disable

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L448)

chainable

- - MarkdownIt.disable(list, ignoreInvalid)

<!--THE END-->

- - list
  - - String
    - Array
  - rule name or list of rule names to disable.
- - ignoreInvalid
  - - Boolean
  - set `true` to ignore errors when rule not found.

The same as [MarkdownIt.enable](#MarkdownIt.enable "MarkdownIt.enable (class method)"), but turn specified rules off.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [enable](#MarkdownIt.enable "MarkdownIt.enable (class method)")

## MarkdownIt.enable

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L421)

chainable

- - MarkdownIt.enable(list, ignoreInvalid)

<!--THE END-->

- - list
  - - String
    - Array
  - rule name or list of rule names to enable
- - ignoreInvalid
  - - Boolean
  - set `true` to ignore errors when rule not found.

Enable list or rules. It will automatically find appropriate components, containing rules with given names. If rule not found, and `ignoreInvalid` not set - throws exception.

##### Example

```javascript
var md = require('markdown-it')()
            .enable(['sub', 'sup'])
            .disable('smartquotes');
```

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [parse](#MarkdownIt.parse "MarkdownIt.parse (class method)")

## MarkdownIt.parse

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L504)

internal

- - MarkdownIt.parse(src, env)
  - - Array

<!--THE END-->

- - src
  - - String
  - source string
- - env
  - - Object
  - environment sandbox

Parse input string and return list of block tokens (special token type "inline" will contain list of inline tokens). You should not call this method directly, until you write custom renderer (for example, to produce AST).

`env` is used to pass data between "distributed" rules and return additional metadata like reference info, needed for the renderer. It also can be used to inject data in specific cases. Usually, you will be ok to pass `{}`, and then pass updated object to renderer.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [parseInline](#MarkdownIt.parseInline "MarkdownIt.parseInline (class method)")

## MarkdownIt.parseInline

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L542)

internal

- - MarkdownIt.parseInline(src, env)
  - - Array

<!--THE END-->

- - src
  - - String
  - source string
- - env
  - - Object
  - environment sandbox

The same as [MarkdownIt.parse](#MarkdownIt.parse "MarkdownIt.parse (class method)") but skip all block rules. It returns the block tokens list with the single `inline` element, containing parsed inline tokens in `children` property. Also updates `env` object.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [render](#MarkdownIt.render "MarkdownIt.render (class method)")

## MarkdownIt.render

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L527)

- - MarkdownIt.render(src\[, env])
  - - String

<!--THE END-->

- - src
  - - String
  - source string
- - env
  - - Object
  - environment sandbox

Render markdown string into html. It does all magic for you :).

`env` can be used to inject additional metadata (`{}` by default). But you will not need it with high probability. See also comment in [MarkdownIt.parse](#MarkdownIt.parse "MarkdownIt.parse (class method)").

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [renderInline](#MarkdownIt.renderInline "MarkdownIt.renderInline (class method)")

## MarkdownIt.renderInline

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L559)

- - MarkdownIt.renderInline(src\[, env])
  - - String

<!--THE END-->

- - src
  - - String
  - source string
- - env
  - - Object
  - environment sandbox

Similar to [MarkdownIt.render](#MarkdownIt.render "MarkdownIt.render (class method)") but for single paragraph content. Result will NOT be wrapped into `<p>` tags.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [set](#MarkdownIt.set "MarkdownIt.set (class method)")

## MarkdownIt.set

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L363)

chainable

- - MarkdownIt.set(options)

Set parser options (in the same format as in constructor). Probably, you will never need it, but you can change options after constructor call.

##### Example

```javascript
var md = require('markdown-it')()
            .set({ html: true, breaks: true })
            .set({ typographer, true });
```

**Note:** To achieve the best possible performance, don't modify a `markdown-it` instance options on the fly. If you need multiple configurations it's best to create multiple instances and initialize each with separate config.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [use](#MarkdownIt.use "MarkdownIt.use (class method)")

## MarkdownIt.use

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L483)

chainable

- - MarkdownIt.use(plugin, params)

Load specified plugin with given params into current parser instance. It's just a sugar to call `plugin(md, params)` with curring.

##### Example

```javascript
var iterator = require('markdown-it-for-inline');
var md = require('markdown-it')()
            .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
              tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
            });
```

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [normalizeLink](#MarkdownIt.prototype.normalizeLink "MarkdownIt#normalizeLink (instance method)")

## MarkdownIt#normalizeLink

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L311)

- - MarkdownIt#normalizeLink(url)
  - - String

Function used to encode link url to a machine-readable format, which includes url-encoding, punycode, etc.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [normalizeLinkText](#MarkdownIt.prototype.normalizeLinkText "MarkdownIt#normalizeLinkText (instance method)")

## MarkdownIt#normalizeLinkText

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L318)

- - MarkdownIt#normalizeLinkText(url)
  - - String

Function used to decode link url to a human-readable format\`

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [validateLink](#MarkdownIt.prototype.validateLink "MarkdownIt#validateLink (instance method)")

## MarkdownIt#validateLink

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L303)

- - MarkdownIt#validateLink(url)
  - - Boolean

Link validation function. CommonMark allows too much in links. By default we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas except some embedded image types.

You can change this behaviour:

```javascript
var md = require('markdown-it')();
// enable everything
md.validateLink = function () { return true; }
```

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [block](#MarkdownIt.prototype.block "MarkdownIt#block (instance property)")

## MarkdownIt#block

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L245)

- - MarkdownIt#block
  - - [ParserBlock](#ParserBlock "ParserBlock (class)")

Instance of [ParserBlock](#ParserBlock "ParserBlock (class)"). You may need it to add new rules when writing plugins. For simple rules control use [MarkdownIt.disable](#MarkdownIt.disable "MarkdownIt.disable (class method)") and [MarkdownIt.enable](#MarkdownIt.enable "MarkdownIt.enable (class method)").

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [core](#MarkdownIt.prototype.core "MarkdownIt#core (instance property)")

## MarkdownIt#core

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L254)

- - MarkdownIt#core
  - - [Core](#Core "Core (class)")

Instance of [Core](#Core "Core (class)") chain executor. You may need it to add new rules when writing plugins. For simple rules control use [MarkdownIt.disable](#MarkdownIt.disable "MarkdownIt.disable (class method)") and [MarkdownIt.enable](#MarkdownIt.enable "MarkdownIt.enable (class method)").

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [helpers](#MarkdownIt.prototype.helpers "MarkdownIt#helpers (instance property)")

## MarkdownIt#helpers

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L336)

- - MarkdownIt#helpers
  - - helpers

Link components parser functions, useful to write plugins. See details [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [inline](#MarkdownIt.prototype.inline "MarkdownIt#inline (instance property)")

## MarkdownIt#inline

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L236)

- - MarkdownIt#inline
  - - [ParserInline](#ParserInline "ParserInline (class)")

Instance of [ParserInline](#ParserInline "ParserInline (class)"). You may need it to add new rules when writing plugins. For simple rules control use [MarkdownIt.disable](#MarkdownIt.disable "MarkdownIt.disable (class method)") and [MarkdownIt.enable](#MarkdownIt.enable "MarkdownIt.enable (class method)").

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [linkify](#MarkdownIt.prototype.linkify "MarkdownIt#linkify (instance property)")

## MarkdownIt#linkify

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L286)

- - MarkdownIt#linkify
  - - LinkifyIt

[linkify-it](https://github.com/markdown-it/linkify-it) instance. Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs) rule.

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [renderer](#MarkdownIt.prototype.renderer "MarkdownIt#renderer (instance property)")

## MarkdownIt#renderer

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L277)

- - MarkdownIt#renderer
  - - [Renderer](#Renderer "Renderer (class)")

Instance of [Renderer](#Renderer "Renderer (class)"). Use it to modify output look. Or to add rendering rules for new token types, generated by plugins.

##### Example

```javascript
var md = require('markdown-it')();

function myToken(tokens, idx, options, env, self) {
  //...
  return result;
};

md.renderer.rules['my_token'] = myToken
```

See [Renderer](#Renderer "Renderer (class)") docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs).

- [Home](#home)
- [MarkdownIt](#MarkdownIt "MarkdownIt (class)")
- [utils](#MarkdownIt.prototype.utils "MarkdownIt#utils (instance property)")

## MarkdownIt#utils

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/index.mjs#L328)

- - MarkdownIt#utils
  - - utils

Assorted utility functions, useful to write plugins. See details [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.mjs).

- [Home](#home)
- [ParserBlock](#ParserBlock "ParserBlock (class)")

## ParserBlock

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_block.mjs#L6)

internal

### Description

Block-level tokenizer.

### Constructor

- [new ParserBlock](#ParserBlock.new "new ParserBlock (constructor)")

### Class methods

- [parse](#ParserBlock.parse "ParserBlock.parse (class method)")

### Instance properties

- [ruler](#ParserBlock.prototype.ruler "ParserBlock#ruler (instance property)")

<!--THE END-->

- [Home](#home)
- [ParserBlock](#ParserBlock "ParserBlock (class)")
- [new](#ParserBlock.new "new ParserBlock (constructor)")

## ParserBlock.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_block.mjs#L41)

- - new ParserBlock()

<!--THE END-->

- [Home](#home)
- [ParserBlock](#ParserBlock "ParserBlock (class)")
- [parse](#ParserBlock.parse "ParserBlock.parse (class method)")

## ParserBlock.parse

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_block.mjs#L124)

- - ParserBlock.parse(str, md, env, outTokens)

Process input string and push block tokens into `outTokens`

- [Home](#home)
- [ParserBlock](#ParserBlock "ParserBlock (class)")
- [ruler](#ParserBlock.prototype.ruler "ParserBlock#ruler (instance property)")

## ParserBlock#ruler

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_block.mjs#L47)

- - ParserBlock#ruler
  - - [Ruler](#Ruler "Ruler (class)")

[Ruler](#Ruler "Ruler (class)") instance. Keep configuration of block rules.

- [Home](#home)
- [ParserInline](#ParserInline "ParserInline (class)")

## ParserInline

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_inline.mjs#L6)

internal

### Description

Tokenizes paragraph content.

### Constructor

- [new ParserInline](#ParserInline.new "new ParserInline (constructor)")

### Class methods

- [parse](#ParserInline.parse "ParserInline.parse (class method)")

### Instance properties

- [ruler](#ParserInline.prototype.ruler "ParserInline#ruler (instance property)")
- [ruler2](#ParserInline.prototype.ruler2 "ParserInline#ruler2 (instance property)")

<!--THE END-->

- [Home](#home)
- [ParserInline](#ParserInline "ParserInline (class)")
- [new](#ParserInline.new "new ParserInline (constructor)")

## ParserInline.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_inline.mjs#L60)

- - new ParserInline()

<!--THE END-->

- [Home](#home)
- [ParserInline](#ParserInline "ParserInline (class)")
- [parse](#ParserInline.parse "ParserInline.parse (class method)")

## ParserInline.parse

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_inline.mjs#L182)

- - ParserInline.parse(str, md, env, outTokens)

Process input string and push inline tokens into `outTokens`

- [Home](#home)
- [ParserInline](#ParserInline "ParserInline (class)")
- [ruler](#ParserInline.prototype.ruler "ParserInline#ruler (instance property)")

## ParserInline#ruler

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_inline.mjs#L66)

- - ParserInline#ruler
  - - [Ruler](#Ruler "Ruler (class)")

[Ruler](#Ruler "Ruler (class)") instance. Keep configuration of inline rules.

- [Home](#home)
- [ParserInline](#ParserInline "ParserInline (class)")
- [ruler2](#ParserInline.prototype.ruler2 "ParserInline#ruler2 (instance property)")

## ParserInline#ruler2

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/parser_inline.mjs#L78)

- - ParserInline#ruler2
  - - [Ruler](#Ruler "Ruler (class)")

[Ruler](#Ruler "Ruler (class)") instance. Second ruler used for post-processing (e.g. in emphasis-like rules).

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")

## Renderer

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L8)

### Description

Generates HTML from parsed token stream. Each instance has independent copy of rules. Those can be rewritten with ease. Also, you can add new rules if you create plugin and adds new token types.

### Constructor

- [new Renderer](#Renderer.new "new Renderer (constructor)")

### Class methods

- [render](#Renderer.render "Renderer.render (class method)")
- [renderAttrs](#Renderer.renderAttrs "Renderer.renderAttrs (class method)")
- [renderInline](#Renderer.renderInline "Renderer.renderInline (class method)")
- [renderInlineAsText](#Renderer.renderInlineAsText "Renderer.renderInlineAsText (class method)")
- [renderToken](#Renderer.renderToken "Renderer.renderToken (class method)")

### Instance properties

- [rules](#Renderer.prototype.rules "Renderer#rules (instance property)")

<!--THE END-->

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [new](#Renderer.new "new Renderer (constructor)")

## Renderer.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L114)

- - new Renderer()

Creates new [Renderer](#Renderer "Renderer (class)") instance and fill [Renderer#rules](#Renderer.prototype.rules "Renderer#rules (instance property)") with defaults.

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [render](#Renderer.render "Renderer.render (class method)")

## Renderer.render

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L303)

- - Renderer.render(tokens, options, env)
  - - String

<!--THE END-->

- - tokens
  - - Array
  - list on block tokens to render
- - options
  - - Object
  - params of parser instance
- - env
  - - Object
  - additional data from parsed input (references, for example)

Takes token stream and generates HTML. Probably, you will never need to call this method directly.

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [renderAttrs](#Renderer.renderAttrs "Renderer.renderAttrs (class method)")

## Renderer.renderAttrs

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L151)

- - Renderer.renderAttrs(token)
  - - String

Render token attributes to string.

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [renderInline](#Renderer.renderInline "Renderer.renderInline (class method)")

## Renderer.renderInline

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L240)

- - Renderer.renderInline(tokens, options, env)
  - - String

<!--THE END-->

- - tokens
  - - Array
  - list on block tokens to render
- - options
  - - Object
  - params of parser instance
- - env
  - - Object
  - additional data from parsed input (references, for example)

The same as [Renderer.render](#Renderer.render "Renderer.render (class method)"), but for single token of `inline` type.

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [renderInlineAsText](#Renderer.renderInlineAsText "Renderer.renderInlineAsText (class method)")

## Renderer.renderInlineAsText

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L267)

internal

- - Renderer.renderInlineAsText(tokens, options, env)
  - - String

<!--THE END-->

- - tokens
  - - Array
  - list on block tokens to render
- - options
  - - Object
  - params of parser instance
- - env
  - - Object
  - additional data from parsed input (references, for example)

Special kludge for image `alt` attributes to conform CommonMark spec. Don't try to use it! Spec requires to show `alt` content with stripped markup, instead of simple escaping.

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [renderToken](#Renderer.renderToken "Renderer.renderToken (class method)")

## Renderer.renderToken

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L174)

- - Renderer.renderToken(tokens, idx, options)
  - - String

<!--THE END-->

- - tokens
  - - Array
  - list of tokens
- - idx
  - - Numbed
  - token index to render
- - options
  - - Object
  - params of parser instance

Default token renderer. Can be overriden by custom function in [Renderer#rules](#Renderer.prototype.rules "Renderer#rules (instance property)").

- [Home](#home)
- [Renderer](#Renderer "Renderer (class)")
- [rules](#Renderer.prototype.rules "Renderer#rules (instance property)")

## Renderer#rules

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/renderer.mjs#L143)

- - Renderer#rules
  - - Object

Contains render rules for tokens. Can be updated and extended.

##### Example

```javascript
var md = require('markdown-it')();

md.renderer.rules.strong_open  = function () { return '<b>'; };
md.renderer.rules.strong_close = function () { return '</b>'; };

var result = md.renderInline(...);
```

Each rule is called as independent static function with fixed signature:

```javascript
function my_token_render(tokens, idx, options, env, renderer) {
  // ...
  return renderedHTML;
}
```

See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs) for more details and examples.

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")

## Ruler

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L18)

### Description

Helper class, used by [MarkdownIt#core](#MarkdownIt.prototype.core "MarkdownIt#core (instance property)"), [MarkdownIt#block](#MarkdownIt.prototype.block "MarkdownIt#block (instance property)") and [MarkdownIt#inline](#MarkdownIt.prototype.inline "MarkdownIt#inline (instance property)") to manage sequences of functions (rules):

- keep rules in defined order
- assign the name to each rule
- enable/disable rules
- add/replace rules
- allow assign rules to additional named chains (in the same)
- cacheing lists of active rules

You will not need use this class directly until write plugins. For simple rules control use [MarkdownIt.disable](#MarkdownIt.disable "MarkdownIt.disable (class method)"), [MarkdownIt.enable](#MarkdownIt.enable "MarkdownIt.enable (class method)") and [MarkdownIt.use](#MarkdownIt.use "MarkdownIt.use (class method)").

### Constructor

- [new Ruler](#Ruler.new "new Ruler (constructor)")

### Class methods

- [after](#Ruler.after "Ruler.after (class method)")
- [at](#Ruler.at "Ruler.at (class method)")
- [before](#Ruler.before "Ruler.before (class method)")
- [disable](#Ruler.disable "Ruler.disable (class method)")
- [enable](#Ruler.enable "Ruler.enable (class method)")
- [enableOnly](#Ruler.enableOnly "Ruler.enableOnly (class method)")
- [getRules](#Ruler.getRules "Ruler.getRules (class method)")
- [push](#Ruler.push "Ruler.push (class method)")

<!--THE END-->

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [new](#Ruler.new "new Ruler (constructor)")

## Ruler.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L22)

- - new Ruler()

<!--THE END-->

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [after](#Ruler.after "Ruler.after (class method)")

## Ruler.after

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L186)

- - Ruler.after(afterName, ruleName, fn\[, options])

<!--THE END-->

- - afterName
  - - String
  - new rule will be added after this one.
- - ruleName
  - - String
  - name of added rule.
- - fn
  - - Function
  - rule function.
- - options
  - - Object
  - rule options (not mandatory).

Add new rule to chain after one with given name. See also [Ruler.before](#Ruler.before "Ruler.before (class method)"), [Ruler.push](#Ruler.push "Ruler.push (class method)").

##### Options:

- **alt** - array with names of "alternate" chains.

##### Example

```javascript
var md = require('markdown-it')();

md.inline.ruler.after('text', 'my_rule', function replace(state) {
  //...
});
```

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [at](#Ruler.at "Ruler.at (class method)")

## Ruler.at

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L111)

- - Ruler.at(name, fn\[, options])

<!--THE END-->

- - name
  - - String
  - rule name to replace.
- - fn
  - - Function
  - new rule function.
- - options
  - - Object
  - new rule options (not mandatory).

Replace rule by name with new function &amp; options. Throws error if name not found.

##### Options:

- **alt** - array with names of "alternate" chains.

##### Example

Replace existing typographer replacement rule with new one:

```javascript
var md = require('markdown-it')();

md.core.ruler.at('replacements', function replace(state) {
  //...
});
```

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [before](#Ruler.before "Ruler.before (class method)")

## Ruler.before

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L146)

- - Ruler.before(beforeName, ruleName, fn\[, options])

<!--THE END-->

- - beforeName
  - - String
  - new rule will be added before this one.
- - ruleName
  - - String
  - name of added rule.
- - fn
  - - Function
  - rule function.
- - options
  - - Object
  - rule options (not mandatory).

Add new rule to chain before one with given name. See also [Ruler.after](#Ruler.after "Ruler.after (class method)"), [Ruler.push](#Ruler.push "Ruler.push (class method)").

##### Options:

- **alt** - array with names of "alternate" chains.

##### Example

```javascript
var md = require('markdown-it')();

md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
  //...
});
```

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [disable](#Ruler.disable "Ruler.disable (class method)")

## Ruler.disable

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L301)

- - Ruler.disable(list\[, ignoreInvalid])
  - - Array

<!--THE END-->

- - list
  - - String
    - Array
  - list of rule names to disable.
- - ignoreInvalid
  - - Boolean
  - set `true` to ignore errors when rule not found.

Disable rules with given names. If any rule name not found - throw Error. Errors can be disabled by second param.

Returns list of found rule names (if no exception happened).

See also [Ruler.enable](#Ruler.enable "Ruler.enable (class method)"), [Ruler.enableOnly](#Ruler.enableOnly "Ruler.enableOnly (class method)").

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [enable](#Ruler.enable "Ruler.enable (class method)")

## Ruler.enable

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L250)

- - Ruler.enable(list\[, ignoreInvalid])
  - - Array

<!--THE END-->

- - list
  - - String
    - Array
  - list of rule names to enable.
- - ignoreInvalid
  - - Boolean
  - set `true` to ignore errors when rule not found.

Enable rules with given names. If any rule name not found - throw Error. Errors can be disabled by second param.

Returns list of found rule names (if no exception happened).

See also [Ruler.disable](#Ruler.disable "Ruler.disable (class method)"), [Ruler.enableOnly](#Ruler.enableOnly "Ruler.enableOnly (class method)").

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [enableOnly](#Ruler.enableOnly "Ruler.enableOnly (class method)")

## Ruler.enableOnly

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L281)

- - Ruler.enableOnly(list\[, ignoreInvalid])

<!--THE END-->

- - list
  - - String
    - Array
  - list of rule names to enable (whitelist).
- - ignoreInvalid
  - - Boolean
  - set `true` to ignore errors when rule not found.

Enable rules with given names, and disable everything else. If any rule name not found - throw Error. Errors can be disabled by second param.

See also [Ruler.disable](#Ruler.disable "Ruler.disable (class method)"), [Ruler.enable](#Ruler.enable "Ruler.enable (class method)").

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [getRules](#Ruler.getRules "Ruler.getRules (class method)")

## Ruler.getRules

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L331)

- - Ruler.getRules(chainName)
  - - Array

Return array of active functions (rules) for given chain name. It analyzes rules configuration, compiles caches if not exists and returns result.

Default chain name is `''` (empty string). It can't be skipped. That's done intentionally, to keep signature monomorphic for high speed.

- [Home](#home)
- [Ruler](#Ruler "Ruler (class)")
- [push](#Ruler.push "Ruler.push (class method)")

## Ruler.push

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/ruler.mjs#L225)

- - Ruler.push(ruleName, fn\[, options])

<!--THE END-->

- - ruleName
  - - String
  - name of added rule.
- - fn
  - - Function
  - rule function.
- - options
  - - Object
  - rule options (not mandatory).

Push new rule to the end of chain. See also [Ruler.before](#Ruler.before "Ruler.before (class method)"), [Ruler.after](#Ruler.after "Ruler.after (class method)").

##### Options:

- **alt** - array with names of "alternate" chains.

##### Example

```javascript
var md = require('markdown-it')();

md.core.ruler.push('my_rule', function replace(state) {
  //...
});
```

- [Home](#home)
- [Token](#Token "Token (class)")

## Token

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L6)

### Constructor

- [new Token](#Token.new "new Token (constructor)")

### Class methods

- [attrGet](#Token.attrGet "Token.attrGet (class method)")
- [attrIndex](#Token.attrIndex "Token.attrIndex (class method)")
- [attrJoin](#Token.attrJoin "Token.attrJoin (class method)")
- [attrPush](#Token.attrPush "Token.attrPush (class method)")
- [attrSet](#Token.attrSet "Token.attrSet (class method)")

### Instance properties

- [attrs](#Token.prototype.attrs "Token#attrs (instance property)")
- [block](#Token.prototype.block "Token#block (instance property)")
- [children](#Token.prototype.children "Token#children (instance property)")
- [content](#Token.prototype.content "Token#content (instance property)")
- [hidden](#Token.prototype.hidden "Token#hidden (instance property)")
- [info](#Token.prototype.info "Token#info (instance property)")
- [level](#Token.prototype.level "Token#level (instance property)")
- [map](#Token.prototype.map "Token#map (instance property)")
- [markup](#Token.prototype.markup "Token#markup (instance property)")
- [meta](#Token.prototype.meta "Token#meta (instance property)")
- [nesting](#Token.prototype.nesting "Token#nesting (instance property)")
- [tag](#Token.prototype.tag "Token#tag (instance property)")
- [type](#Token.prototype.type "Token#type (instance property)")

<!--THE END-->

- [Home](#home)
- [Token](#Token "Token (class)")
- [new](#Token.new "new Token (constructor)")

## Token.new

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L12)

- - new Token(type, tag, nesting)

Create new token and fill passed properties.

- [Home](#home)
- [Token](#Token "Token (class)")
- [attrGet](#Token.attrGet "Token.attrGet (class method)")

## Token.attrGet

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L166)

- - Token.attrGet(name)

Get the value of attribute `name`, or null if it does not exist.

- [Home](#home)
- [Token](#Token "Token (class)")
- [attrIndex](#Token.attrIndex "Token.attrIndex (class method)")

## Token.attrIndex

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L121)

- - Token.attrIndex(name)
  - - Number

Search attribute index by name.

- [Home](#home)
- [Token](#Token "Token (class)")
- [attrJoin](#Token.attrJoin "Token.attrJoin (class method)")

## Token.attrJoin

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L181)

- - Token.attrJoin(name, value)

Join value to existing attribute via space. Or create new attribute if not exists. Useful to operate with token classes.

- [Home](#home)
- [Token](#Token "Token (class)")
- [attrPush](#Token.attrPush "Token.attrPush (class method)")

## Token.attrPush

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L137)

- - Token.attrPush(attrData)

Add `[ name, value ]` attribute to list. Init attrs if necessary

- [Home](#home)
- [Token](#Token "Token (class)")
- [attrSet](#Token.attrSet "Token.attrSet (class method)")

## Token.attrSet

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L150)

- - Token.attrSet(name, value)

Set `name` attribute to `value`. Override old value if exists.

- [Home](#home)
- [Token](#Token "Token (class)")
- [attrs](#Token.prototype.attrs "Token#attrs (instance property)")

## Token#attrs

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L32)

- - Token#attrs
  - - Array

Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`

- [Home](#home)
- [Token](#Token "Token (class)")
- [block](#Token.prototype.block "Token#block (instance property)")

## Token#block

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L105)

- - Token#block
  - - Boolean

True for block-level tokens, false for inline tokens. Used in renderer to calculate line breaks

- [Home](#home)
- [Token](#Token "Token (class)")
- [children](#Token.prototype.children "Token#children (instance property)")

## Token#children

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L64)

- - Token#children
  - - Array

An array of child nodes (inline and img tokens)

- [Home](#home)
- [Token](#Token "Token (class)")
- [content](#Token.prototype.content "Token#content (instance property)")

## Token#content

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L72)

- - Token#content
  - - String

In a case of self-closing tag (code, html, fence, etc.), it has contents of this tag.

- [Home](#home)
- [Token](#Token "Token (class)")
- [hidden](#Token.prototype.hidden "Token#hidden (instance property)")

## Token#hidden

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L113)

- - Token#hidden
  - - Boolean

If it's true, ignore this element when rendering. Used for tight lists to hide paragraphs.

- [Home](#home)
- [Token](#Token "Token (class)")
- [info](#Token.prototype.info "Token#info (instance property)")

## Token#info

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L90)

- - Token#info
  - - String

Additional information:

- Info string for "fence" tokens
- The value "auto" for autolink "link\_open" and "link\_close" tokens
- The string value of the item marker for ordered-list "list\_item\_open" tokens

<!--THE END-->

- [Home](#home)
- [Token](#Token "Token (class)")
- [level](#Token.prototype.level "Token#level (instance property)")

## Token#level

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L57)

- - Token#level
  - - Number

nesting level, the same as `state.level`

- [Home](#home)
- [Token](#Token "Token (class)")
- [map](#Token.prototype.map "Token#map (instance property)")

## Token#map

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L39)

- - Token#map
  - - Array

Source map info. Format: `[ line_begin, line_end ]`

- [Home](#home)
- [Token](#Token "Token (class)")
- [markup](#Token.prototype.markup "Token#markup (instance property)")

## Token#markup

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L79)

- - Token#markup
  - - String

'\*' or '\_' for emphasis, fence string for fence, etc.

- [Home](#home)
- [Token](#Token "Token (class)")
- [meta](#Token.prototype.meta "Token#meta (instance property)")

## Token#meta

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L97)

- - Token#meta
  - - Object

A place for plugins to store an arbitrary data

- [Home](#home)
- [Token](#Token "Token (class)")
- [nesting](#Token.prototype.nesting "Token#nesting (instance property)")

## Token#nesting

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L50)

- - Token#nesting
  - - Number

Level change (number in {-1, 0, 1} set), where:

- `1` means the tag is opening
- `0` means the tag is self-closing
- `-1` means the tag is closing

<!--THE END-->

- [Home](#home)
- [Token](#Token "Token (class)")
- [tag](#Token.prototype.tag "Token#tag (instance property)")

## Token#tag

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L25)

- - Token#tag
  - - String

html tag name, e.g. "p"

- [Home](#home)
- [Token](#Token "Token (class)")
- [type](#Token.prototype.type "Token#type (instance property)")

## Token#type

[View source](https://github.com/markdown-it/markdown-it/blob/0fe7cc/lib/token.mjs#L18)

- - Token#type
  - - String

Type of the token (string, e.g. "paragraph\_open")

Last updated on Mon, 18 Mar 2024 23:17:43 GMT. Generated by [ndoc](http://github.com/nodeca/ndoc)# Development recommendations

Before continuing, make sure you've read:

1. [README](https://github.com/markdown-it/markdown-it#markdown-it)
2. [API documentation](https://markdown-it.github.io/markdown-it/)
3. [Architecture description](architecture.md)


## General considerations for plugins.

1. Try to find the right place for your plugin rule:
  - Will it conflict with existing markup (by priority)?
    - If yes - you need to write an inline or block rule.
    - If no - you can morph tokens within core chains.
  - Remember that token morphing in core chains is always more simple than writing
    block or inline rules, if you don't copy existing ones. However,
    block and inline rules are usually faster.
  - Sometimes, it's enough to only modify the renderer, for example, to add
    header IDs or `target="_blank"` for the links.
  - Plugins should not require the `markdown-it` package as dependency in `package.json`.
    If you need access to internals, those are available via a parser instance,
    passed on plugin load. See properties of main class and nested objects.
2. Search existing
   [plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin)
   or [rules](https://github.com/markdown-it/markdown-it/tree/master/lib),
   doing something similar. It can be more simple to modify existing code,
   instead of writing all from scratch.
3. If you did all steps above, but still has questions - ask in
   [tracker](https://github.com/markdown-it/markdown-it/issues). But, please:
   - Be specific. Generic questions like "how to do plugins" and
     "how to learn programming" are not accepted.
   - Don't ask us to break [CommonMark](http://commonmark.org/) specification.
     Such things should be discussed first on [CommonMark forum](http://talk.commonmark.org/).


## Notes for NPM packages

To simplify search:

- add to `package.json` keywords `markdown-it` and `markdown-it-plugin` for plugins.
- add keyword `markdown-it` for any other related packages.


## FAQ


#### I need async rule, how to do it?

Sorry. You can't do it directly. All complex parsers are sync by nature. But you
can use workarounds:

1. On parse phase, replace content by random number and store it in `env`.
2. Do async processing over collected data.
3. Render content and replace those random numbers with text; or replace first, then render.

Alternatively, you can render HTML, then parse it to DOM, or
[cheerio](https://github.com/cheeriojs/cheerio) AST, and apply transformations
in a more convenient way.


#### How to replace part of text token with link?

The right sequence is to split text to several tokens and add link tokens in between.
The result will be: `text` + `link_open` + `text` + `link_close` + `text`.

See implementations of [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs) and [emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/replace.mjs) - those do text token splits.

__Note.__ Don't try to replace text with HTML markup! That's not secure.


#### Why my inline rule is not executed?

The inline parser skips pieces of texts to optimize speed. It stops only on [a small set of chars](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_inline/text.mjs), which can be tokens. We did not made this list extensible for performance reasons too.

If you are absolutely sure that something important is missing there - create a
ticket and we will consider adding it as a new charcode.


#### Why do you reject some useful things?

We do a markdown parser. It should keep the "markdown spirit". Other things should
be kept separate, in plugins, for example. We have no clear criteria, sorry.
Probably, you will find [CommonMark forum](http://talk.commonmark.org/) a useful read to understand us better.

Of course, if you find the architecture of this parser interesting for another type
of markup, you are welcome to reuse it in another project.
# markdown-it design principles

## Data flow

Input data is parsed via nested chains of rules. There are 3 nested chains --
`core`, `block`, & `inline`:

```
core
    core.rule1 (normalize)
    ...
    core.ruleX

    block
        block.rule1 (blockquote)
        ...
        block.ruleX

    core.ruleX1 (intermediate rule that applies on block tokens, nothing yet)
    ...
    core.ruleXX

    inline (applied to each block token with "inline" type)
        inline.rule1 (text)
        ...
        inline.ruleX

    core.ruleYY (applies to all tokens)
    ... (abbreviation, footnote, typographer, linkifier)
```

The result of parsing is a token stream that will be passed to the renderer to generate HTML content.

These tokens can themselves be parsed again to generate more tokens (ex: a `list` token can be divided into multiple `inline` tokens).

An `env` object can be used alongside tokens to inject external variables into your parsers and renderers.

Each chain (`core`, `block`, & `inline`) uses an independent `state` object when parsing data so that each parsing operation is independent and can be disabled on the fly.


## Token stream

Instead of a traditional AST, we use more low-level data representation -- *tokens*.
The difference is simple:

- Tokens are a simple sequence (an array).
- Opening and closing tags are separate.
- There are special token objects, "inline containers", that have nested tokens.
  These are sequences with inline markup, such as bold, italic, text, etc.

See the [`Token`](https://github.com/markdown-it/markdown-it/blob/master/lib/token.mjs) class
for details about each token's content.

In total, a token stream is:

- On the top level -- an array of paired or single "block" tokens:
  - open/close for headers, lists, blockquotes, paragraphs, etc.
  - code blocks, fenced blocks, horizontal rules, HTML blocks, inline containers
- Each inline token has a `children` property with a nested token stream for inline content:
  - open/close for bold, italic, links, inline code, etc.
  - text, line breaks

Why not an AST? It's not needed for our tasks. We follow the KISS principle.
If you wish, you can call a parser without a renderer and convert the token stream
into an AST.

More details about tokens:

- [`Renderer` source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs)
- [`Token` source](https://github.com/markdown-it/markdown-it/blob/master/lib/token.mjs)
- [Live demo](https://markdown-it.github.io/) - type your text and click the `debug` tab.


## Rules

Rules are functions, doing "magic" with parser `state` objects. A rule is associated with one or more *chains* and is unique. For instance, a `blockquote` token is associated with the `blockquote`, `paragraph`, `heading`, and `list` chains.

Rules are managed by name via [`Ruler`](https://markdown-it.github.io/markdown-it/#Ruler) instances and can be enabled and disabled from [`MarkdownIt`](https://markdown-it.github.io/markdown-it/#MarkdownIt)'s methods.

Note that some rules have a `validation mode` -- in this mode, rules do not
modify the token stream and only look ahead for the end of a token. It's one
important design principle -- a token stream is "write only" on the `block` & `inline` parse stages.

Parsers are designed to keep rules independent of each other. You can safely enable/disable them or
add new ones. There are no universal recipes for how to create new rules -- the design of
distributed state machines with good data isolation is a tricky business. However, you
can investigate existing rules & plugins to see possible approaches.

In complex cases you can try to ask for help in the [issue tracker](https://github.com/markdown-it/markdown-it/issues).
The condition is very simple -- it should be clear from your ticket that you studied the docs, sources,
and tried to do something yourself. We never reject with help to real developers.


## Renderer

After the token stream is generated, it's passed to a [`Renderer`](https://markdown-it.github.io/markdown-it/#Renderer).
It then iterates through all the tokens, passing each to a rule with the same name as its token type.

Renderer rules are located in `md.renderer.rules[name]` and are simple functions
with the same signature:

```js
function (tokens, idx, options, env, renderer) {
  // ...
  return htmlResult;
}
```

In many cases, that allows easy output changes even without parser intrusion.
For example, let's convert every image that uses a Vimeo link into a player iframe:

```js
var md = require('markdown-it')();

var defaultRender = md.renderer.rules.image,
    vimeoRE       = /^https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  var src = tokens[idx].attrGet('src');

  if (vimeoRE.test(src)) {
    var id = src.match(vimeoRE)[2];

    return '<div class="embed-responsive embed-responsive-16by9">\n' +
           '  <iframe class="embed-responsive-item" src="//player.vimeo.com/video/' + id + '"></iframe>\n' +
           '</div>\n';
  }

  // Pass the token to the default renderer.
  return defaultRender(tokens, idx, options, env, self);
};
```

Here is another example on how to add `target="_blank"` to all links:

```js
// Remember the old renderer if overridden, or proxy to the default renderer.
var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Add a new `target` attribute, or replace the value of the existing one.
  tokens[idx].attrSet('target', '_blank');

  // Pass the token to the default renderer.
  return defaultRender(tokens, idx, options, env, self);
};
```

Note that if you need to add attributes, you can do so without a renderer override.
For example, you can update tokens in the `core` chain. This is slower than a direct
renderer override, but it can be more simple. Let's use the
[`markdown-it-for-inline`](https://github.com/markdown-it/markdown-it-for-inline) plugin
to do the same thing as in previous example:

```js
var iterator = require('markdown-it-for-inline');

var md = require('markdown-it')()
            .use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
              tokens[idx].attrSet('target', '_blank');
            });
```

You also can write your own renderer to generate formats other than HTML, such as
JSON and XML. You can even use it to generate an AST.


## Summary

This was mentioned in [Data flow](#data-flow), but let's repeat the sequence again:

1. Blocks are parsed, and the top level of each token stream is filled with block tokens.
2. Content in inline containers is parsed, filling their `children` properties.
3. Rendering happens.

And somewhere in between, you can apply additional transformations.

Source code for each chain can be seen in the following files:

- [`parser_core.mjs`](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.mjs)
- [`parser_block.mjs`](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.mjs)
- [`parser_inline.mjs`](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.mjs)

Also, you can change output directly in a [`Renderer`](https://markdown-it.github.io/markdown-it/#Renderer) for many simple cases.
# Adding or modifying rules
## Default renderer rules
Rules on how to translate markdown content to HTML elements are stored in `renderer.rules`:

```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

console.log(Object.keys(md.renderer.rules))
```
Output:
```js
[
  'code_inline',
  'code_block',
  'fence',
  'image',
  'hardbreak',
  'softbreak',
  'text',
  'html_block',
  'html_inline'
]
```
These are the default renderer rules. For any element that is not explicitly listed in this array its default rule applies. For example the rule `bullet_list_open` is not defined, so when markdown-it tries to parse a list to HTML it defaults to ua generic renderer called `Renderer.prototype.renderToken`.

## The demo tool

You can use the [demo tool](https://markdown-it.github.io/) to see which specific rule name corresponds to which HTML tag (switch to the debug tab in the output).

Let's use a Hello World example:
  [Link to Demo](https://markdown-it.github.io/#md3=%7B%22source%22%3A%22-%20Hello%20World%22%2C%22defaults%22%3A%7B%22html%22%3Afalse%2C%22xhtmlOut%22%3Afalse%2C%22breaks%22%3Afalse%2C%22langPrefix%22%3A%22language-%22%2C%22linkify%22%3Afalse%2C%22typographer%22%3Afalse%2C%22_highlight%22%3Afalse%2C%22_strict%22%3Afalse%2C%22_view%22%3A%22debug%22%7D%7D)

Now take a closer look at the first element in the resulting list:
```js
{
    "type": "bullet_list_open",
    "tag": "ul",
    "attrs": null,
    "map": [
      0,
      1
    ],
    "nesting": 1,
    "level": 0,
    "children": null,
    "content": "",
    "markup": "-",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  }
```
This is a [Token](https://markdown-it.github.io/markdown-it/#Token). Its corresponding HTML `tag` is `ul` and its nesting is `1`. This means this specific token represents the opening tag of the HTML list we want to generate from markdown.

* `{ nesting: 1}` is an opening tag: `<ul>`
* `{ nesting: -1}` is a closing tag: `</ul>`
* `{ nesting: 0}` is a self-closing tag: `<br />`

## Adding new rules
### To add a default CSS class to an element

Let's set ourself a goal: 
```
Create a rule to add the CSS class "lorem_ipsum" to every <ul>
```

Rules are functions that accept a number of parameters:
```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

md.renderer.rules.bullet_list_open = function(tokens, idx, options, env, self) {
   // tokes: List of all tokens being parsed
   // idx: Number that corresponds to the key of the current token in tokens
   // options: The options defined when creating the new markdown-it object ({} in our case)
   // env ???
   // self: A reference to the renderer itself
};
```
We assign the new rule to the key that corresponds to the html tag we want to modify.

#### Reusing existing rules

It is good practice however to save the default renderer for your element and only make minimal chances to the rules in place, instead of reinventing the wheel:

```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
const defaultBulletListOpenRenderer = md.renderer.rules.bullet_list_open || proxy;

md.renderer.rules.bullet_list_open = function(tokens, idx, options, env, self) {
   // Make your changes here ...
   // ... then render it using the existing logic
   return defaultBulletListOpenRenderer(tokens, idx, options, env, self)
};
```
Earlier we noticed that `renderer.rules.bullet_list_open` is undefined by default. So `proxy` is the most basic rule to render a token and is used if the specific rule is undefined.

CSS classes are attributes on HTML elements. If we think back to the object representation of the `ul` element we looked at, we might remember that it contained an `attrs` key with the value `null`. This means this token had no attributes. `attrs` can be an array of `[key, value]` pairs which describe attributes to be added to the token.

Looking at [the API documention for Token objects](https://markdown-it.github.io/markdown-it/#Token.attrJoin) we find the `attrJoin` method. This method allows us to join an existing attributes value with a new value or create the attribute if it doens't exist yet. Simply pushing the value (for example with `token.attr.push(["key", "value"]`) would overwrite any previous change:

```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
const defaultBulletListOpenRenderer = md.renderer.rules.bullet_list_open || proxy;

md.renderer.rules.bullet_list_open = function(tokens, idx, options, env, self) {
   // Make your changes here ...
   tokens[idx].attrJoin("class", "lorem_ipsum")
   // ... then render it using the existing logic
   return defaultBulletListOpenRenderer(tokens, idx, options, env, self)
};
```
Let's test the finished rule:
```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
const defaultBulletListOpenRenderer = md.renderer.rules.bullet_list_open || proxy;

md.renderer.rules.bullet_list_open = function(tokens, idx, options, env, self) {
   // Make your changes here ...
   tokens[idx].attrJoin("class", "lorem_ipsum");
   // ... then render it using the existing logic
   return defaultBulletListOpenRenderer(tokens, idx, options, env, self)
};

console.log(md.render("- Hello World"));
```
Output: 
```html
<ul class="lorem_ipsum">
<li>Hello World</li>
</ul>
```
### To add a wrapper element
Let's imagine we are using CSS pseudo classes such as `:before` and `:after` to style our list because using `list-style-type` doesn't provide the bullet types we want and `list-style-image` isn't flexible enough to position itself properly across all major browsers.

To keep a proper line wrapping in our list we have set all elements in our `li` to display as a block (`li * {display: block;}`). This works for our pseudo classes and other `HTMLElements`. However, it does not work for `TextNodes`. So having this output will produce weird line indents:
```html
<ul>
  <li>Hello World</li>
<ul>
```

To fix this we can use a wrapper element which can be properly displayed as a block:

```html
<ul>
  <li>
    <span>Hello World</span>
  </li>
<ul>
```

So our next goal is:
```
Add a rule that wraps the content of every <li> in a <span>
```

Keen observers might have already noticed that rules return their HTML tags as strings. So this modification is rather straight forward.

Let's use the [demo tool](https://markdown-it.github.io/#md3=%7B%22source%22%3A%22-%20Hello%20World%22%2C%22defaults%22%3A%7B%22html%22%3Afalse%2C%22xhtmlOut%22%3Afalse%2C%22breaks%22%3Afalse%2C%22langPrefix%22%3A%22language-%22%2C%22linkify%22%3Afalse%2C%22typographer%22%3Afalse%2C%22_highlight%22%3Afalse%2C%22_strict%22%3Afalse%2C%22_view%22%3A%22debug%22%7D%7D) again and check which keys we need to add in the `renderer.rules` object to access the opening and closing tags of an `li` element:

```
list_item_open
list_item_close
```

Now use this information to add the new rules:

```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
const defaultListItemOpenRenderer = md.renderer.rules.list_item_open || proxy;

md.renderer.rules.list_item_open = function(tokens, idx, options, env, self) {
  return `${defaultListItemOpenRenderer(tokens, idx, options, env, self)}<span>`;
};

const defaultListItemCloseRenderer = md.renderer.rules.list_item_close || proxy;

md.renderer.rules.list_item_close = function(tokens, idx, options, env, self) {
  return `</span>${defaultListItemCloseRenderer(tokens, idx, options, env, self)}`;
};
```
Testing our modification:

```js
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
const defaultListItemOpenRenderer = md.renderer.rules.list_item_open || proxy;

md.renderer.rules.list_item_open = function(tokens, idx, options, env, self) {
  return `${defaultListItemOpenRenderer(tokens, idx, options, env, self)}<span>`;
};

const defaultListItemCloseRenderer = md.renderer.rules.list_item_close || proxy;

md.renderer.rules.list_item_close = function(tokens, idx, options, env, self) {
  return `</span>${defaultListItemCloseRenderer(tokens, idx, options, env, self)}`;
};

console.log(md.render("- Hello World"));
```
Output:
```html
<ul>
  <li>
    <span>Hello World</span>
  </li>
</ul>
```

Of course using string manipulation might get really messy for bigger changes. So consider using `markdown-it`s Token class instead:
```js
const MarkdownIt = require('markdown-it');
const Token = require('markdown-it/lib/token');
const md = new MarkdownIt();

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);

const defaultListItemOpenRenderer = md.renderer.rules.list_item_open || proxy;
const defaultSpanOpenRenderer = md.renderer.rules.span_open || proxy;

md.renderer.rules.list_item_open = function(tokens, idx, options, env, self) {
    const span = new Token("span_open", "span", 1);
    return `${defaultListItemOpenRenderer(tokens, idx, options, env, self)}${defaultSpanOpenRenderer([span], 0, options, env, self)}`;
};

const defaultListItemCloseRenderer = md.renderer.rules.list_item_close || proxy;
const defaultSpanCloseRenderer = md.renderer.rules.span_close|| proxy;

md.renderer.rules.list_item_close = function(tokens, idx, options, env, self) {
    const span = new Token("span_close", "span", -1);
    return `${defaultSpanCloseRenderer([span], 0, options, env, self)}${defaultListItemCloseRenderer(tokens, idx, options, env, self)}`;
};

console.log(md.render("- Hello World"));
```

Output:

```html
<ul>
  <li>
    <span>Hello World<span>
  </li>
</ul>
```
