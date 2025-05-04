
# Auto-render Extension

This is an extension to automatically render all of the math inside of text. It searches all of the text nodes within a given element for the given delimiters, ignoring certain tags like `<pre>`, and renders the math in place.

## Usage

This extension isn't part of KaTeX proper, so the script needs to be included (via a `<script>` tag) in the page along with KaTeX itself. For example, using a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js" integrity="sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js" integrity="sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>
```

> Above, the [`defer` attribute](https://developer.mozilla.org/en/HTML/Element/script#Attributes) indicates that the script doesn't need to execute until the page has loaded, speeding up page rendering; and the `onload` attribute calls `renderMathInElement` once the auto-render script loads.

Alternatively, you can call the `renderMathInElement` when (or after) the [`DOMContentLoaded` event](https://developer.mozilla.org/ko/docs/Web/Reference/Events/DOMContentLoaded) fires on the document or in another deferred script. This approach is useful for specifying or computing options, or if you don't want to use a `defer` or `onload` attribute. For example:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js" integrity="sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js" integrity="sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh" crossorigin="anonymous"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
          // customised options
          // • auto-render specific keys, e.g.:
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\(', right: '\\)', display: false},
              {left: '\\[', right: '\\]', display: true}
          ],
          // • rendering keys, e.g.:
          throwOnError : false
        });
    });
</script>
```

ECMAScript module is also available:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">
<script type="module">
    import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.mjs";
    renderMathInElement(document.body);
</script>
```

> You can use [`nomodule` attribute](https://developer.mozilla.org/en/HTML/Element/script#Attributes) to provide a fallback for older browsers that do not support ES modules.

## API

This extension exposes a single function, `window.renderMathInElement`, with the following API:

```js
function renderMathInElement(elem, options)
```

`elem` is an HTML DOM element. The function will recursively search for text nodes inside this element and render the math in them.

`options` is an optional object argument that can have the same keys as [the object passed to `katex.render`](/docs/options), in addition to five auto-render-specific keys:

- `delimiters`: This is a list of delimiters to look for math, processed in the same order as the list. Each delimiter has three properties:

  - `left`: A string which starts the math expression (i.e. the left delimiter).
  - `right`: A string which ends the math expression (i.e. the right delimiter).
  - `display`: A boolean of whether the math in the expression should be rendered in display mode or not.

  The default value is:

  ```js
  [
    {left: "$$", right: "$$", display: true},
    {left: "\\(", right: "\\)", display: false},
    {left: "\\begin{equation}", right: "\\end{equation}", display: true},
    {left: "\\begin{align}", right: "\\end{align}", display: true},
    {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
    {left: "\\begin{gather}", right: "\\end{gather}", display: true},
    {left: "\\begin{CD}", right: "\\end{CD}", display: true},
    {left: "\\[", right: "\\]", display: true}
  ]
  ```

  If you want to add support for inline math via `$...$`, be sure to list it *after* `$$`, as in the following. (Because rules are processed in order, putting a `$` rule first would catch `$$` as an empty math expression.)

  ```js
  [
    {left: "$$", right: "$$", display: true},
    {left: "$", right: "$", display: false},
    {left: "\\(", right: "\\)", display: false},
    {left: "\\[", right: "\\]", display: true}
  ]
  ```
- `ignoredTags`: This is a list of DOM node types to ignore when recursing through. The default value is `["script", "noscript", "style", "textarea", "pre", "code", "option"]`.
- `ignoredClasses`: This is a list of DOM node class names to ignore when recursing through. By default, this value is not set.
- `errorCallback`: A callback method returning a message and an error stack in case of an critical error during rendering. The default uses `console.error`.
- `preProcess`: A callback function, `(math: string) => string`, used to process math expressions before rendering.

The `displayMode` property of the options object is ignored, and is instead taken from the `display` key of the corresponding entry in the `delimiters` key.

The same `options.macros` object (which defaults to an empty object `{}`) is passed into several calls to `katex.render`, so that consecutive equations can build up shared macros by `\gdef`.

# Browser

> KaTeX supports all major browsers, including Chrome, Safari, Firefox, Opera, Edge, and IE 11.

## Starter template

```html
<!DOCTYPE html>
<!-- KaTeX requires the use of the HTML5 doctype. Without it, KaTeX may not render properly -->
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">

    <!-- The loading of KaTeX is deferred to speed up page rendering -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js" integrity="sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6" crossorigin="anonymous"></script>

    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js" integrity="sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh" crossorigin="anonymous"
        onload="renderMathInElement(document.body);"></script>
  </head>
  ...
</html>
```

## Loading as Global

If you include the `katex.js` directly, the `katex` object will be available as a global variable.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.css" integrity="sha384-o3WH+1yEhq+grOgz1BVYTZPyTlMXrDxnjN1By9/ba94JqJhva6wFm2Hb+URQX53v" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.js" integrity="sha384-C5yZTsgLOfuizO9kb+hrB8uSBwwvZ4yenKWU0KmWl+7bkL6Tph/KbcOa3S4zdoRE" crossorigin="anonymous"></script>
```

KaTeX also provides minified versions:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js" integrity="sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6" crossorigin="anonymous"></script>
```

The examples above load the script [deferred using the `defer` attribute](https://developer.mozilla.org/en/HTML/Element/script#Attributes) to speed up page rendering. The `katex` object will be available after [`DOMContentLoaded` event is fired on the `document`](https://developer.mozilla.org/ko/docs/Web/Reference/Events/DOMContentLoaded). If you do not use `defer`, `katex` object will be available after the corresponding `script` tag.

If KaTeX is not used immediately or not critical, it is possible to load KaTeX asynchronously. Add [`async` attribute](https://developer.mozilla.org/en/HTML/Element/script#Attributes) to `script` and use [`rel="preload"` and `onload` attribute](https://github.com/filamentgroup/loadCSS) on `link`.

You can prefetch KaTeX fonts to prevent FOUT or FOIT. Use [Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) or [Web Font Loader](https://github.com/typekit/webfontloader):

```html
<script>
  window.WebFontConfig = {
    custom: {
      families: ['KaTeX_AMS', 'KaTeX_Caligraphic:n4,n7', 'KaTeX_Fraktur:n4,n7',
        'KaTeX_Main:n4,n7,i4,i7', 'KaTeX_Math:i4,i7', 'KaTeX_Script',
        'KaTeX_SansSerif:n4,n7,i4', 'KaTeX_Size1', 'KaTeX_Size2', 'KaTeX_Size3',
        'KaTeX_Size4', 'KaTeX_Typewriter'],
    },
  };
</script>
<script defer src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.js" integrity="sha256-4O4pS1SH31ZqrSO2A/2QJTVjTPqVe+jnYgOWUVr7EEc=" crossorigin="anonymous"></script>
```

You can also use [`rel="preload"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content). Add `<link rel="preload" href=(path to WOFF2 font) as="font" type="font/woff2" crossorigin="anonymous">` to `head`. Note that [only few browsers support it](https://caniuse.com/#feat=link-rel-preload) and they all support WOFF2 so preloading WOFF2 fonts is enough.

See [Google Web Fundamentals - Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization) for more detail.

## Module Loaders

### AMD

```html
<script type="text/javascript">
    require([
        "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.js",
    ], katex => {
        ...
    });
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.css" integrity="sha384-o3WH+1yEhq+grOgz1BVYTZPyTlMXrDxnjN1By9/ba94JqJhva6wFm2Hb+URQX53v" crossorigin="anonymous">
```

### ECMAScript module

```html
<script type="module" type="text/javascript">
    import katex from 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.mjs';
    ...
</script>
<script nomodule defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.js" integrity="sha384-C5yZTsgLOfuizO9kb+hrB8uSBwwvZ4yenKWU0KmWl+7bkL6Tph/KbcOa3S4zdoRE" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.css" integrity="sha384-o3WH+1yEhq+grOgz1BVYTZPyTlMXrDxnjN1By9/ba94JqJhva6wFm2Hb+URQX53v" crossorigin="anonymous">
```

> Use [`nomodule` attribute](https://developer.mozilla.org/en/HTML/Element/script#Attributes) to provide a fallback for older browsers that do not support ES modules.

## Download &amp; Host Things Yourself

Download a [KaTeX release](https://github.com/KaTeX/KaTeX/releases), copy `katex.js`, `katex.css` (or `katex.min.js` and `katex.min.css` to use minified versions), and the `fonts` directory, and include or import it like above.

You can also build from source. See [Building from Source](/docs/node#building-from-source) for more details.

## Bundler

[Use Node.js package managers to install KaTeX and import it](/docs/node) in your project. Then bundle using bundlers like [webpack](https://webpack.js.org/) or [rollup.js](https://rollupjs.org/). Note that you have to bundle the stylesheet (`katex.css`) or include it manually.

[← Node.js](/docs/node)[API →](/docs/api)

- [Starter template](#starter-template)
- [Loading as Global](#loading-as-global)
- [Module Loaders](#module-loaders)

  - [AMD](#amd)
  - [ECMAScript module](#ecmascript-module)
- [Download &amp; Host Things Yourself](#download--host-things-yourself)
- [Bundler](#bundler)

# Supported Functions

This is a list of TeX functions supported by KaTeX. It is sorted into logical groups.

There is a similar [Support Table](/docs/support_table), sorted alphabetically, that lists both supported and un-supported functions.

## Accents

| a′a'a′ `a'`                         | a~\\tilde{a}a~ `\tilde{a}`                                 | g˚\\mathring{g}g˚​ `\mathring{g}`                            |
|-------------------------------------|------------------------------------------------------------|--------------------------------------------------------------|
| a′′a''a′′ `a''`                     | ac~\\widetilde{ac}ac `\widetilde{ac}`                      | AB⏠\\overgroup{AB}AB `\overgroup{AB}`                        |
| a′a^{\\prime}a′ `a^{\prime}`        | AB~\\utilde{AB}AB​ `\utilde{AB}`                           | AB⏡\\undergroup{AB}AB​ `\undergroup{AB}`                     |
| aˊ\\acute{a}aˊ `\acute{a}`          | F⃗\\vec{F}F `\vec{F}`                                      | AB⇒\\Overrightarrow{AB}AB `\Overrightarrow{AB}`              |
| yˉ\\bar{y}yˉ​ `\bar{y}`             | AB←\\overleftarrow{AB}AB `\overleftarrow{AB}`              | AB→\\overrightarrow{AB}AB `\overrightarrow{AB}`              |
| a˘\\breve{a}a˘ `\breve{a}`          | AB←\\underleftarrow{AB}AB​ `\underleftarrow{AB}`           | AB→\\underrightarrow{AB}AB​ `\underrightarrow{AB}`           |
| aˇ\\check{a}aˇ `\check{a}`          | ac↼\\overleftharpoon{ac}ac `\overleftharpoon{ac}`          | ac⇀\\overrightharpoon{ac}ac `\overrightharpoon{ac}`          |
| a˙\\dot{a}a˙ `\dot{a}`              | AB↔\\overleftrightarrow{AB}AB `\overleftrightarrow{AB}`    | AB⏞\\overbrace{AB}AB `\overbrace{AB}`                        |
| a¨\\ddot{a}a¨ `\ddot{a}`            | AB↔\\underleftrightarrow{AB}AB​ `\underleftrightarrow{AB}` | AB⏟\\underbrace{AB}AB​ `\underbrace{AB}`                     |
| a...\\dddot{a}a...​ `\dddot{a}`     | AB‾\\overline{AB}AB `\overline{AB}`                        | ABundefined\\overlinesegment{AB}AB `\overlinesegment{AB}`    |
| a....\\ddddot{a}a....​ `\ddddot{a}` | AB‾\\underline{AB}AB​ `\underline{AB}`                     | ABundefined\\underlinesegment{AB}AB​ `\underlinesegment{AB}` |
| aˋ\\grave{a}aˋ `\grave{a}`          | acˇ\\widecheck{ac}ac `\widecheck{ac}`                      | X‾\\underbar{X}X​ `\underbar{X}`                             |
| θ^\\hat{\\theta}θ^ `\hat{\theta}`   | ac^\\widehat{ac}ac `\widehat{ac}`                          |                                                              |

***Accent functions inside \\text{…}***

| aˊ\\text{\\'{a}}aˊ `\'{a}`    | a˜\\text{\\~{a}}a˜ `\~{a}` | a˙\\text{\\.{a}}a˙ `\.{a}` | a˝\\text{\\H{a}}a˝ `\H{a}` |
|-------------------------------|----------------------------|----------------------------|----------------------------|
| aˋ\\text{\\\`{a}}aˋ ``\`{a}`` | aˉ\\text{\\={a}}aˉ `\={a}` | a¨\\text{\\"{a}}a¨ `\"{a}` | aˇ\\text{\\v{a}}aˇ `\v{a}` |
| aˆ\\text{\\^{a}}aˆ `\^{a}`    | a˘\\text{\\u{a}}a˘ `\u{a}` | a˚\\text{\\r{a}}a˚ `\r{a}` |                            |

See also [letters and unicode](#letters-and-unicode).

## Delimiters

( )(~)( ) `( )`( )\\lparen~\\rparen( ) `\lparen`
    ~~~~    `\rparen`⌈ ⌉⌈~⌉⌈ ⌉ `⌈ ⌉`⌈ ⌉\\lceil~\\rceil⌈ ⌉ `\lceil`
     ~~~~~     `\rceil`↑\\uparrow↑ `\uparrow`

\[ ]\[~]\[ ] `[ ]`\[ ]\\lbrack~\\rbrack\[ ] `\lbrack`
    ~~~~    `\rbrack`⌊ ⌋⌊~⌋⌊ ⌋ `⌊ ⌋`⌊ ⌋\\lfloor~\\rfloor⌊ ⌋ `\lfloor`
     ~~~~~     `\rfloor`↓\\downarrow↓ `\downarrow`

{}\\{ \\}{} `\{ \}`{}\\lbrace \\rbrace{} `\lbrace`
    ~~~~    `\rbrace`⎰⎱⎰⎱⎰⎱ `⎰⎱`⎰⎱\\lmoustache \\rmoustache⎰⎱ `\lmoustache`
    ~~~~    `\rmoustache`↕\\updownarrow↕ `\updownarrow`

⟨ ⟩⟨~⟩⟨ ⟩ `⟨ ⟩`⟨ ⟩\\langle~\\rangle⟨ ⟩ `\langle`
    ~~~~    `\rangle`⟮ ⟯⟮~⟯⟮ ⟯ `⟮ ⟯`⟮ ⟯\\lgroup~\\rgroup⟮ ⟯ `\lgroup`
     ~~~~~     `\rgroup`⇑\\Uparrow⇑ `\Uparrow`

∣\\vert∣ `|`∣\\vert∣ `\vert`┌┐┌ ┐┌┐ `┌ ┐`⌜⌝\\ulcorner \\urcorner┌┐ `\ulcorner`
    ~~~~    `\urcorner`⇓\\Downarrow⇓ `\Downarrow`

∥\\Vert∥ `\|`∥\\Vert∥ `\Vert`└┘└ ┘└┘ `└ ┘`⌞⌟\\llcorner \\lrcorner└┘ `\llcorner`
    ~~~~    `\lrcorner`⇕\\Updownarrow⇕ `\Updownarrow`

∣ ∣\\lvert~\\rvert∣ ∣ `\lvert`
    ~~~~    `\rvert`∥ ∥\\lVert~\\rVert∥ ∥ `\lVert`
     ~~~~~     `\rVert``\left.``\right.`\\\\backslash\\ `\backslash`

⟨ ⟩\\lang~\\rang⟨ ⟩ `\lang`
    ~~~~    `\rang`&lt; &gt;\\lt~\\gt&lt; &gt; `\lt \gt`⟦ ⟧⟦~⟧\[\[ ]] `⟦ ⟧`⟦ ⟧\\llbracket~\\rrbracket\[\[ ]] `\llbracket`
    ~~~~    `\rrbracket`⦃ ⦄\\lBrace~\\rBrace{\[ ]} `\lBrace \rBrace`

**Delimiter Sizing**

(AB)\\left(\\LARGE{AB}\\right)(AB) `\left(\LARGE{AB}\right)`

(((((( \\big( \\Big( \\bigg( \\Bigg(((((( `( \big( \Big( \bigg( \Bigg(`

| `\left`   | `\big`  | `\bigl`  | `\bigm`  | `\bigr`  |
|-----------|---------|----------|----------|----------|
| `\middle` | `\Big`  | `\Bigl`  | `\Bigm`  | `\Bigr`  |
| `\right`  | `\bigg` | `\biggl` | `\biggm` | `\biggr` |
|           | `\Bigg` | `\Biggl` | `\Biggm` | `\Biggr` |

## Environments

abcd\\begin{matrix} a &amp; b \\\\ c &amp; d \\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \\`
   `c & d`
`\end{matrix}`abcd\\begin{array}{cc}a &amp; b\\\\c &amp; d\\end{array}ac​bd​`\begin{array}{cc}`
   `a & b \\`
   `c & d`
`\end{array}`

(abcd)\\begin{pmatrix} a &amp; b \\\\ c &amp; d \\end{pmatrix}(ac​bd​)`\begin{pmatrix}`
   `a & b \\`
   `c & d`
`\end{pmatrix}`\[abcd]\\begin{bmatrix} a &amp; b \\\\ c &amp; d \\end{bmatrix}\[ac​bd​]`\begin{bmatrix}`
   `a & b \\`
   `c & d`
`\end{bmatrix}`

∣abcd∣\\begin{vmatrix} a &amp; b \\\\ c &amp; d \\end{vmatrix}​ac​bd​​`\begin{vmatrix}`
   `a & b \\`
   `c & d`
`\end{vmatrix}`∥abcd∥\\begin{Vmatrix} a &amp; b \\\\ c &amp; d \\end{Vmatrix}​ac​bd​​`\begin{Vmatrix}`
   `a & b \\`
   `c & d`
`\end{Vmatrix}`

{abcd}\\begin{Bmatrix} a &amp; b \\\\ c &amp; d \\end{Bmatrix}{ac​bd​}`\begin{Bmatrix}`
   `a & b \\`
   `c & d`
`\end{Bmatrix}`abcdefghi\\def\\arraystretch{1.5}\\begin{array}{c:c:c} a &amp; b &amp; c \\\\ \\hline d &amp; e &amp; f \\\\ \\hdashline g &amp; h &amp; i \\end{array}adg​beh​cfi​​`\def\arraystretch{1.5}`
   `\begin{array}{c:c:c}`
   `a & b & c \\ \hline`
   `d & e & f \\`
   `\hdashline`
   `g & h & i`
`\end{array}`

x={aif bcif dx = \\begin{cases} a &amp;\\text{if } b \\\\ c &amp;\\text{if } d \\end{cases}x={ac​if bif d​`x = \begin{cases}`
   `a &\text{if } b \\`
   `c &\text{if } d`
`\end{cases}`aif bcif d}⇒…\\begin{rcases} a &amp;\\text{if } b \\\\ c &amp;\\text{if } d \\end{rcases}⇒…ac​if bif d​}⇒…`\begin{rcases}`
   `a &\text{if } b \\`
   `c &\text{if } d`
`\end{rcases}⇒…`

abcd\\begin{smallmatrix} a &amp; b \\\\ c &amp; d \\end{smallmatrix}ac​bd​`\begin{smallmatrix}`
   `a & b \\`
   `c & d`
`\end{smallmatrix}`∑i∈Λ0&lt;j&lt;n\\sum\_{\\begin{subarray}{l} i\\in\\Lambda\\\\ 0&lt;j&lt;n\\end{subarray}}i∈Λ0&lt;j&lt;n​∑​`\sum_{`
`\begin{subarray}{l}`
   `i\in\Lambda\\`
   `0<j<n`
`\end{subarray}}`

The auto-render extension will render the following environments even if they are not inside math delimiters such as `$$…$$`. They are display-mode only.

a=b+c=e+f\\begin{equation}\\begin{split}a &amp;=b+c\\\\&amp;=e+f\\end{split}\\end{equation}a​=b+c=e+f​​​`\begin{equation}`
`\begin{split}`   `a &=b+c\\`
      `&=e+f`
`\end{split}`
`\end{equation}`a=b+cd+e=f\\begin{align} a&amp;=b+c \\\\ d+e&amp;=f \\end{align}ad+e​=b+c=f​​`\begin{align}`
   `a&=b+c \\`
   `d+e&=f`
`\end{align}`

a=be=b+c\\begin{gather} a=b \\\\ e=b+c \\end{gather}a=be=b+c​​`\begin{gather}`
   `a=b \\`
   `e=b+c`
`\end{gather}`10x+3y=23x+13y=4\\begin{alignat}{2}10&amp;x+&amp;3&amp;y=2\\\\3&amp;x+&amp;13&amp;y=4\\end{alignat}103​x+x+​313​y=2y=4​​`\begin{alignat}{2}`
   `10&x+&3&y=2\\`
   `3&x+&13&y=4`
`\end{alignat}`

A→aBb↓↑cC=D\\begin{CD}A @&gt;a&gt;&gt; B \\\\@VbVV @AAcA\\\\C @= D\\end{CD}Ab↓⏐​C​a​​B⏐↑​cD​`\begin{CD}`
   `A @>a>> B \\`
`@VbVV @AAcA \\`
   `C @= D`
`\end{CD}`

#### Other KaTeX Environments

EnvironmentsHow they differ from those shown above

`darray`, `dcases`, `drcases`… apply `displaystyle`

`matrix*`, `pmatrix*`, `bmatrix*`
`Bmatrix*`, `vmatrix*`, `Vmatrix*`… take an optional argument to set column
alignment, as in `\begin{matrix*}[r]`

`equation*`, `gather*`
`align*`, `alignat*`… have no automatic numbering. Alternatively, you can use `\nonumber` or `\notag` to omit the numbering for a specific row of the equation.

`gathered`, `aligned`, `alignedat`… do not need to be in display mode.
… have no automatic numbering.
… must be inside math delimiters in
order to be rendered by the auto-render
extension.

Acceptable line separators include: `\\`, `\cr`, `\\[distance]`, and `\cr[distance]`. *Distance* can be written with any of the [KaTeX units](#units).

The `{array}` environment supports `|` and `:` vertical separators.

The `{array}` environment does not yet support `\cline` or `\multicolumn`.

`\tag` can be applied to individual rows of top-level environments (`align`, `align*`, `alignat`, `alignat*`, `gather`, `gather*`).

## HTML

The following "raw HTML" features are potentially dangerous for untrusted inputs, so they are disabled by default, and attempting to use them produces the command names in red (which you can configure via the `errorColor` [option](/docs/options)). To fully trust your LaTeX input, you need to pass an option of `trust: true`; you can also enable just some of the commands or for just some URLs via the `trust` [option](/docs/options).

| KaTeX\\href{https://katex.org/}{\\KaTeX}[KATE​X](https://katex.org/)                                                                                                    | `\href{https://katex.org/}{\KaTeX}`                                                                                   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| https://katex.org/\\url{https://katex.org/}[https://katex.org/](https://katex.org/)                                                                                     | `\url{https://katex.org/}`                                                                                            |
| \\includegraphics\[height=0.8em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://katex.org/img/khan-academy.png}![KA logo](https://katex.org/img/khan-academy.png) | `\includegraphics[height=0.8em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://katex.org/img/khan-academy.png}` |
| x\\htmlId{bar}{x}x `…<span id="bar" class="enclosing">…x…</span>…`                                                                                                      | `\htmlId{bar}{x}`                                                                                                     |
| x\\htmlClass{foo}{x}x `…<span class="enclosing foo">…x…</span>…`                                                                                                        | `\htmlClass{foo}{x}`                                                                                                  |
| x\\htmlStyle{color: red;}{x}x `…<span style="color: red;" class="enclosing">…x…</span>…`                                                                                | `\htmlStyle{color: red;}{x}`                                                                                          |
| x\\htmlData{foo=a, bar=b}{x}x `…<span data-foo="a" data-bar="b" class="enclosing">…x…</span>…`                                                                          | `\htmlData{foo=a, bar=b}{x}`                                                                                          |

`\includegraphics` supports `height`, `width`, `totalheight`, and `alt` in its first argument. `height` is required.

HTML extension (`\html`-prefixed) commands are non-standard, so loosening `strict` option for `htmlExtension` is required.

## Letters and Unicode

**Greek Letters**

Direct Input: ABΓΔEZHΘIKΛMNΞOΠPΣTΥΦXΨΩΑ Β Γ Δ Ε Ζ Η Θ Ι \\allowbreak Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ ΩABΓΔEZHΘIKΛMNΞOΠPΣTΥΦXΨΩ αβγδϵζηθικλμνξoπρστυϕχψωεϑϖϱςφϝ\\allowbreak α β γ δ ϵ ζ η θ ι κ λ μ ν ξ o π \\allowbreak ρ σ τ υ ϕ χ ψ ω ε ϑ ϖ ϱ ς φ ϝαβγδϵζηθικλμνξoπρστυϕχψωεϑϖϱςφϝ

| A\\AlphaA `\Alpha`           | B\\BetaB `\Beta`         | Γ\\GammaΓ `\Gamma`       | Δ\\DeltaΔ `\Delta`           |
|------------------------------|--------------------------|--------------------------|------------------------------|
| E\\EpsilonE `\Epsilon`       | Z\\ZetaZ `\Zeta`         | H\\EtaH `\Eta`           | Θ\\ThetaΘ `\Theta`           |
| I\\IotaI `\Iota`             | K\\KappaK `\Kappa`       | Λ\\LambdaΛ `\Lambda`     | M\\MuM `\Mu`                 |
| N\\NuN `\Nu`                 | Ξ\\XiΞ `\Xi`             | O\\OmicronO `\Omicron`   | Π\\PiΠ `\Pi`                 |
| P\\RhoP `\Rho`               | Σ\\SigmaΣ `\Sigma`       | T\\TauT `\Tau`           | Υ\\UpsilonΥ `\Upsilon`       |
| Φ\\PhiΦ `\Phi`               | X\\ChiX `\Chi`           | Ψ\\PsiΨ `\Psi`           | Ω\\OmegaΩ `\Omega`           |
| Γ\\varGammaΓ `\varGamma`     | Δ\\varDeltaΔ `\varDelta` | Θ\\varThetaΘ `\varTheta` | Λ\\varLambdaΛ `\varLambda`   |
| Ξ\\varXiΞ `\varXi`           | Π\\varPiΠ `\varPi`       | Σ\\varSigmaΣ `\varSigma` | Υ\\varUpsilonΥ `\varUpsilon` |
| Φ\\varPhiΦ `\varPhi`         | Ψ\\varPsiΨ `\varPsi`     | Ω\\varOmegaΩ `\varOmega` |                              |
| α\\alphaα `\alpha`           | β\\betaβ `\beta`         | γ\\gammaγ `\gamma`       | δ\\deltaδ `\delta`           |
| ϵ\\epsilonϵ `\epsilon`       | ζ\\zetaζ `\zeta`         | η\\etaη `\eta`           | θ\\thetaθ `\theta`           |
| ι\\iotaι `\iota`             | κ\\kappaκ `\kappa`       | λ\\lambdaλ `\lambda`     | μ\\muμ `\mu`                 |
| ν\\nuν `\nu`                 | ξ\\xiξ `\xi`             | ο\\omicronο `\omicron`   | π\\piπ `\pi`                 |
| ρ\\rhoρ `\rho`               | σ\\sigmaσ `\sigma`       | τ\\tauτ `\tau`           | υ\\upsilonυ `\upsilon`       |
| ϕ\\phiϕ `\phi`               | χ\\chiχ `\chi`           | ψ\\psiψ `\psi`           | ω\\omegaω `\omega`           |
| ε\\varepsilonε `\varepsilon` | ϰ\\varkappaϰ `\varkappa` | ϑ\\varthetaϑ `\vartheta` | ϑ\\thetasymϑ `\thetasym`     |
| ϖ\\varpiϖ `\varpi`           | ϱ\\varrhoϱ `\varrho`     | ς\\varsigmaς `\varsigma` | φ\\varphiφ `\varphi`         |
| ϝ\\digammaϝ `\digamma`       |                          |                          |                              |

**Other Letters**

| ı\\imath `\imath`     | ∇\\nabla∇ `\nabla`     | ℑ\\Imℑ `\Im`           | R\\RealsR `\Reals`            | Œ\\text{\\OE}Œ `\text{\OE}` |
|------------------------|------------------------|------------------------|-------------------------------|-----------------------------|
| ȷ\\jmath `\jmath`     | ∂\\partial∂ `\partial` | ℑ\\imageℑ `\image`     | ℘\\wp℘ `\wp`                  | ø\\text{\\o}ø `\text{\o}`   |
| ℵ\\alephℵ `\aleph`     | ⅁\\Game⅁ `\Game`       | k\\Bbbkk `\Bbbk`       | ℘\\weierp℘ `\weierp`          | Ø\\text{\\O}Ø `\text{\O}`   |
| ℵ\\alefℵ `\alef`       | Ⅎ\\FinvℲ `\Finv`       | N\\NN `\N`             | Z\\ZZ `\Z`                    | ß\\text{\\ss}ß `\text{\ss}` |
| ℵ\\alefsymℵ `\alefsym` | C\\cnumsC `\cnums`     | N\\natnumsN `\natnums` | a˚\\text{\\aa}a˚ `\text{\aa}` | ı\\text{\\i}ı `\text{\i}`   |
| ℶ\\bethℶ `\beth`       | C\\ComplexC `\Complex` | R\\RR `\R`             | A˚\\text{\\AA}A˚ `\text{\AA}` | ȷ\\text{\\j}ȷ `\text{\j}`   |
| ℷ\\gimelℷ `\gimel`     | ℓ\\ellℓ `\ell`         | ℜ\\Reℜ `\Re`           | æ\\text{\\ae}æ `\text{\ae}`   |                             |
| ℸ\\dalethℸ `\daleth`   | ℏ\\hbarℏ `\hbar`       | ℜ\\realℜ `\real`       | Æ\\text{\\AE}Æ `\text{\AE}`   |                             |
| ð\\ethð `\eth`         | ℏ\\hslashℏ `\hslash`   | R\\realsR `\reals`     | œ\\text{\\oe}œ `\text{\oe}`   |                             |

Direct Input: ∂∇ℑℲℵℶℷℸ⅁ℏð−∗∂ ∇ ℑ Ⅎ ℵ ℶ ℷ ℸ ⅁ ℏ ð − ∗∂∇ℑℲℵℶℷℸ⅁ℏð−∗ ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝÞßàáâãäåçèéêëìíîïðñòóôöùúûüýþÿ ₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘʷˣʸᶻᵛᵝᵞᵟᵠᵡ

Math-mode Unicode (sub|super)script characters will render as if you had written regular characters in a subscript or superscript. For instance, `A²⁺³` will render the same as `A^{2+3}`.

**Unicode Mathematical Alphanumeric Symbols**

| Item         | Range                                         | Item              | Range                                     |
|--------------|-----------------------------------------------|-------------------|-------------------------------------------|
| Bold         | 𝐀-𝐙 𝐚-𝐳 𝟎-𝟗\\text{𝐀-𝐙 𝐚-𝐳 𝟎-𝟗}A-Z a-z 0-9     | Double-struck     | 𝔸-Z 𝕜\\text{𝔸-}ℤ\\ 𝕜A-Z k                 |
| Italic       | 𝐴-𝑍 𝑎-𝑧\\text{𝐴-𝑍 𝑎-𝑧}A-Z a-z                 | Sans serif        | 𝖠-𝖹 𝖺-𝗓 𝟢-𝟫\\text{𝖠-𝖹 𝖺-𝗓 𝟢-𝟫}A-Z a-z 0-9 |
| Bold Italic  | 𝑨-𝒁 𝒂-𝒛\\text{𝑨-𝒁 𝒂-𝒛}A-Z a-z                 | Sans serif bold   | 𝗔-𝗭 𝗮-𝘇 𝟬-𝟵\\text{𝗔-𝗭 𝗮-𝘇 𝟬-𝟵}A-Z a-z 0-9 |
| Script       | 𝒜-𝒵\\text{𝒜-𝒵}A-Z                             | Sans serif italic | 𝘈-𝘡 𝘢-𝘻\\text{𝘈-𝘡 𝘢-𝘻}A-Z a-z             |
| Fraktur      | 𝔄-Z 𝔞-𝔷\\text{$𝔄$-$ℨ$}\\text{ $𝔞$-$𝔷$}A-Z a-z | Monospace         | 𝙰-𝚉 𝚊-𝚣 𝟶-𝟿\\text{𝙰-𝚉 𝚊-𝚣 𝟶-𝟿}A-Z a-z 0-9 |
| Bold Fraktur | 𝕬-𝖅 𝖆-𝖟\\text{𝕬-𝖅 𝖆-𝖟}A-Z a-z                 |                   |                                           |

**Unicode**

The letters listed above will render properly in any KaTeX rendering mode.

In addition, Armenian, Brahmic, Georgian, Chinese, Japanese, and Korean glyphs are always accepted in text mode. However, these glyphs will be rendered from system fonts (not KaTeX-supplied fonts) so their typography may clash. You can provide rules for CSS classes `.latin_fallback`, `.cyrillic_fallback`, `.brahmic_fallback`, `.georgian_fallback`, `.cjk_fallback`, and `.hangul_fallback` to provide fallback fonts for these languages. Use of these glyphs may cause small vertical alignment issues: KaTeX has detailed metrics for listed symbols and most Latin, Greek, and Cyrillic letters, but other accepted glyphs are treated as if they are each as tall as the letter M in the current KaTeX font.

If the KaTeX rendering mode is set to `strict: false` or `strict: "warn"` (default), then KaTeX will accept all Unicode letters in both text and math mode. All unrecognized characters will be treated as if they appeared in text mode, and are subject to the same issues of using system fonts and possibly using incorrect vertical alignment.

For Persian composite characters, a user-supplied [plug-in](https://github.com/HosseinAgha/persian-katex-plugin) is under development.

Any character can be written with the `\char` function and the Unicode code in hex. For example `\char"263a` will render as ☺\\char"263a☺.

## Layout

### Annotation

| 5\\cancel{5}5​ `\cancel{5}`                     | a+b+c⏞note\\overbrace{a+b+c}^{\\text{note}}a+b+c​note​ `\overbrace{a+b+c}^{\text{note}}`    |
|-------------------------------------------------|---------------------------------------------------------------------------------------------|
| 5\\bcancel{5}5​ `\bcancel{5}`                   | a+b+c⏟note\\underbrace{a+b+c}\_{\\text{note}}notea+b+c​​ `\underbrace{a+b+c}_{\text{note}}` |
| ABC\\xcancel{ABC}ABC `\xcancel{ABC}`            | ≠\\not == `\not =`                                                                        |
| abc\\sout{abc}abc `\sout{abc}`                  | π=cd\\boxed{\\pi=\\frac c d}π=dc​​ `\boxed{\pi=\frac c d}`                                  |
| ana\_{\\angl n}an​​ `$a_{\angl n}`              | ana\_\\anglnan​​ `a_\angln`                                                                 |
| −78∘\\phase{-78^\\circ}−78∘​`\phase{-78^\circ}` |                                                                                             |

`\tag{hi} x+y^{2x}` x+y2x(hi)\\tag{hi} x+y^{2x}x+y2x(hi)

`\tag*{hi} x+y^{2x}` x+y2xhi\\tag\*{hi} x+y^{2x}x+y2xhi

### Line Breaks

KaTeX 0.10.0+ will insert automatic line breaks in inline math after relations or binary operators such as “=” or “+”. These can be suppressed by `\nobreak` or by placing math inside a pair of braces, as in `{F=ma}`. `\allowbreak` will allow automatic line breaks at locations other than relations or operators.

Hard line breaks are `\\` and `\newline`.

In display math, KaTeX does not insert automatic line breaks. It ignores display math hard line breaks when rendering option `strict: true`.

### Vertical Layout

| xnx\_nxn​ `x_n`   | =!\\stackrel{!}{=}=! `\stackrel{!}{=}`  | aba \\atop bba​ `a \atop b`                                                                                                      |
|-------------------|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| exe^xex `e^x`     | =!\\overset{!}{=}=! `\overset{!}{=}`    | abca\\raisebox{0.25em}{$b$}cabc `a\raisebox{0.25em}{$b$}c`                                                                       |
| uo\_u^ouo​ `_u^o` | =!\\underset{!}{=}!=​ `\underset{!}{=}` | a+(abc)a+\\left(\\vcenter{\\frac{\\frac a b}c}\\right)a+(cba​​​) `a+\left(\vcenter{\hbox{$\frac{\frac a b}c$}}\right)`           |
|                   |                                         | ∑0&lt;i&lt;m0&lt;j&lt;n\\sum\_{\\substack{0&lt;i&lt;m\\\\0&lt;j&lt;n}}0&lt;i&lt;m0&lt;j&lt;n​∑​ `\sum_{\substack{0<i<m\\0<j<n}}` |

`\raisebox` and `\hbox` put their argument into text mode. To raise math, nest `$…$` delimiters inside the argument as shown above.

`\vcenter` can be written without an `\hbox` if the `strict` rendering option is *false*. In that case, omit the nested `$…$` delimiters.

### Overlap and Spacing

| =/ {=}\\mathllap{/\\,}=/ `{=}\mathllap{/\,}` | (x2)\\left(x^{\\smash{2}}\\right)(x2) `\left(x^{\smash{2}}\right)` |
|----------------------------------------------|--------------------------------------------------------------------|
| /=\\mathrlap{\\,/}{=}/= `\mathrlap{\,/}{=}`  | y\\sqrt{\\smash\[b]{y}}y​ `\sqrt{\smash[b]{y}}`                    |

∑1≤i≤j≤nxij\\displaystyle\\sum\_{\\mathclap{1\\le i\\le j\\le n}} x\_{ij}1≤i≤j≤n∑​xij​ `\sum_{\mathclap{1\le i\le j\le n}} x_{ij}`

KaTeX also supports `\llap`, `\rlap`, and `\clap`, but they will take only text, not math, as arguments.

**Spacing**

| Function        | Produces           | Function             | Produces                              |
|-----------------|--------------------|----------------------|---------------------------------------|
| `\,`            | ³∕₁₈ em space      | `\kern{distance}`    | space, width = *distance*             |
| `\thinspace`    | ³∕₁₈ em space      | `\mkern{distance}`   | space, width = *distance*             |
| `\>`            | ⁴∕₁₈ em space      | `\mskip{distance}`   | space, width = *distance*             |
| `\:`            | ⁴∕₁₈ em space      | `\hskip{distance}`   | space, width = *distance*             |
| `\medspace`     | ⁴∕₁₈ em space      | `\hspace{distance}`  | space, width = *distance*             |
| `\;`            | ⁵∕₁₈ em space      | `\hspace*{distance}` | space, width = *distance*             |
| `\thickspace`   | ⁵∕₁₈ em space      | `\phantom{content}`  | space the width and height of content |
| `\enspace`      | ½ em space         | `\hphantom{content}` | space the width of content            |
| `\quad`         | 1 em space         | `\vphantom{content}` | a strut the height of content         |
| `\qquad`        | 2 em space         | `\!`                 | – ³∕₁₈ em space                       |
| `~`             | non-breaking space | `\negthinspace`      | – ³∕₁₈ em space                       |
| `\<space>`      | space              | `\negmedspace`       | – ⁴∕₁₈ em space                       |
| `\nobreakspace` | non-breaking space | `\negthickspace`     | – ⁵∕₁₈ em space                       |
| `\space`        | space              | `\mathstrut`         | `\vphantom{(}`                        |

**Notes:**

`distance` will accept any of the [KaTeX units](#units).

`\kern`, `\mkern`, `\mskip`, and `\hspace` accept unbraced distances, as in: `\kern1em`.

`\mkern` and `\mskip` will not work in text mode and both will write a console warning for any unit except `mu`.

## Logic and Set Theory

\\gdef\\VERT{|}

∀\\forall∀ `\forall`∁\\complement∁ `\complement`∴\\therefore∴ `\therefore`∅\\emptyset∅ `\emptyset`

∃\\exists∃ `\exists`⊂\\subset⊂ `\subset`∵\\because∵ `\because`∅\\empty∅ `\empty`

∃\\exist∃ `\exist`⊃\\supset⊃ `\supset`↦\\mapsto↦ `\mapsto`∅\\varnothing∅ `\varnothing`

∄\\nexists∄ `\nexists`∣\\mid∣ `\mid`→\\to→ `\to`  ⟹  \\implies⟹ `\implies`

∈\\in∈ `\in`∧\\land∧ `\land`←\\gets← `\gets`  ⟸  \\impliedby⟸ `\impliedby`

∈\\isin∈ `\isin`∨\\lor∨ `\lor`↔\\leftrightarrow↔ `\leftrightarrow`  ⟺  \\iff⟺ `\iff`

∉\\notin∈/ `\notin`∋\\ni∋ `\ni`∌\\notni∋ `\notni`¬\\neg¬ `\neg` or `\lnot`

{ x  |  x&lt;12 }\\Set{ x \\VERT x&lt;\\frac 1 2 }{x​x&lt;21​}
`\Set{ x | x<\frac 1 2 }`{ x∣x&lt;5 }\\set{x\\VERT x&lt;5}{x∣x&lt;5}
`\set{x|x<5}`

Direct Input: ∀∴∁∵∃∣∈∉∋⊂⊃∧∨↦→←↔¬∀ ∴ ∁ ∵ ∃ ∣ ∈ ∉ ∋ ⊂ ⊃ ∧ ∨ ↦ → ← ↔ ¬∀∴∁∵∃∣∈∈/∋⊂⊃∧∨↦→←↔¬ ℂ ℍ ℕ ℙ ℚ ℝ

## Macros

| x2+x2\\def\\foo{x^2} \\foo + \\foox2+x2           | `\def\foo{x^2} \foo + \foo`                       |
|---------------------------------------------------|---------------------------------------------------|
| y2+y2\\gdef\\foo#1{#1^2} \\foo{y} + \\foo{y}y2+y2 | `\gdef\foo#1{#1^2} \foo{y} + \foo{y}`             |
|                                                   | `\edef\macroname#1#2…{definition to be expanded}` |
|                                                   | `\xdef\macroname#1#2…{definition to be expanded}` |
|                                                   | `\let\foo=\bar`                                   |
|                                                   | `\futurelet\foo\bar x`                            |
|                                                   | `\global\def\macroname#1#2…{definition}`          |
|                                                   | `\newcommand\macroname[numargs]{definition}`      |
|                                                   | `\renewcommand\macroname[numargs]{definition}`    |
|                                                   | `\providecommand\macroname[numargs]{definition}`  |

Macros can also be defined in the KaTeX [rendering options](/docs/options).

Macros accept up to nine arguments: #1, #2, etc.

Macros defined by `\gdef`, `\xdef`, `\global\def`, `\global\edef`, `\global\let`, and `\global\futurelet` will persist between math expressions. (Exception: macro persistence may be disabled. There are legitimate security reasons for that.)

KaTeX has no `\par`, so all macros are long by default and `\long` will be ignored.

Available functions include:

`\char` `\mathchoice` `\TextOrMath` `\@ifstar` `\@ifnextchar` `\@firstoftwo` `\@secondoftwo` `\relax` `\expandafter` `\noexpand`

@ is a valid character for commands, as if `\makeatletter` were in effect.

## Operators

### Big Operators

| ∑\\sum∑ `\sum`     | ∏\\prod∏ `\prod`         | ⨂\\bigotimes⨂ `\bigotimes` | ⋁\\bigvee⋁ `\bigvee`     |
|--------------------|--------------------------|----------------------------|--------------------------|
| ∫\\int∫ `\int`     | ∐\\coprod∐ `\coprod`     | ⨁\\bigoplus⨁ `\bigoplus`   | ⋀\\bigwedge⋀ `\bigwedge` |
| ∬\\iint∬ `\iint`   | ∫\\intop∫ `\intop`       | ⨀\\bigodot⨀ `\bigodot`     | ⋂\\bigcap⋂ `\bigcap`     |
| ∭\\iiint∭ `\iiint` | ∫\\smallint∫ `\smallint` | ⨄\\biguplus⨄ `\biguplus`   | ⋃\\bigcup⋃ `\bigcup`     |
| ∮\\oint∮ `\oint`   | ∯\\oiint∬​ `\oiint`      | ∰\\oiiint∭​ `\oiiint`      | ⨆\\bigsqcup⨆ `\bigsqcup` |

Direct Input: ∫∬∭∮∏∐∑⋀⋁⋂⋃⨀⨁⨂⨄⨆∫ ∬ ∭ ∮ ∏ ∐ ∑ ⋀ ⋁ ⋂ ⋃ ⨀ ⨁ ⨂ ⨄ ⨆∫∬∭∮∏∐∑⋀⋁⋂⋃⨀⨁⨂⨄⨆ ∯ ∰

### Binary Operators

| +++ `+`                  | ⋅\\cdot⋅ `\cdot`                     | ⋗\\gtrdot⋗ `\gtrdot`                 | x(moda)x \\pmod ax(moda) `x \pmod a`   |
|--------------------------|--------------------------------------|--------------------------------------|----------------------------------------|
| −-− `-`                  | ⋅\\cdotp⋅ `\cdotp`                   | ⊺\\intercal⊺ `\intercal`             | x(a)x \\pod ax(a) `x \pod a`           |
| /// `/`                  | ⋅\\centerdot⋅ `\centerdot`           | ∧\\land∧ `\land`                     | ⊳\\rhd⊳ `\rhd`                         |
| ∗\*∗ `*`                 | ∘\\circ∘ `\circ`                     | ⋋\\leftthreetimes⋋ `\leftthreetimes` | ⋌\\rightthreetimes⋌ `\rightthreetimes` |
| ⨿\\amalg⨿ `\amalg`       | ⊛\\circledast⊛ `\circledast`         | .\\ldotp. `\ldotp`                   | ⋊\\rtimes⋊ `\rtimes`                   |
| &amp;\\And&amp; `\And`   | ⊚\\circledcirc⊚ `\circledcirc`       | ∨\\lor∨ `\lor`                       | ∖\\setminus∖ `\setminus`               |
| ∗\\ast∗ `\ast`           | ⊝\\circleddash⊝ `\circleddash`       | ⋖\\lessdot⋖ `\lessdot`               | ∖\\smallsetminus∖ `\smallsetminus`     |
| ⊼\\barwedge⊼ `\barwedge` | ⋓\\Cup⋓ `\Cup`                       | ⊲\\lhd⊲ `\lhd`                       | ⊓\\sqcap⊓ `\sqcap`                     |
| ◯\\bigcirc◯ `\bigcirc`   | ∪\\cup∪ `\cup`                       | ⋉\\ltimes⋉ `\ltimes`                 | ⊔\\sqcup⊔ `\sqcup`                     |
| mod \\bmodmod `\bmod`    | ⋎\\curlyvee⋎ `\curlyvee`             | xmod  ax \\mod axmoda `x\mod a`      | ×\\times× `\times`                     |
| ⊡\\boxdot⊡ `\boxdot`     | ⋏\\curlywedge⋏ `\curlywedge`         | ∓\\mp∓ `\mp`                         | ⊴\\unlhd⊴ `\unlhd`                     |
| ⊟\\boxminus⊟ `\boxminus` | ÷\\div÷ `\div`                       | ⊙\\odot⊙ `\odot`                     | ⊵\\unrhd⊵ `\unrhd`                     |
| ⊞\\boxplus⊞ `\boxplus`   | ⋇\\divideontimes⋇ `\divideontimes`   | ⊖\\ominus⊖ `\ominus`                 | ⊎\\uplus⊎ `\uplus`                     |
| ⊠\\boxtimes⊠ `\boxtimes` | ∔\\dotplus∔ `\dotplus`               | ⊕\\oplus⊕ `\oplus`                   | ∨\\vee∨ `\vee`                         |
| ∙\\bullet∙ `\bullet`     | ⩞\\doublebarwedge⩞ `\doublebarwedge` | ⊗\\otimes⊗ `\otimes`                 | ⊻\\veebar⊻ `\veebar`                   |
| ⋒\\Cap⋒ `\Cap`           | ⋒\\doublecap⋒ `\doublecap`           | ⊘\\oslash⊘ `\oslash`                 | ∧\\wedge∧ `\wedge`                     |
| ∩\\cap∩ `\cap`           | ⋓\\doublecup⋓ `\doublecup`           | ±\\pm± `\pm` or `\plusmn`            | ≀\\wr≀ `\wr`                           |

Direct Input: +−/∗⋅∘∙±×÷∓∔∧∨∩∪≀⊎⊓⊔⊕⊖⊗⊘⊙⊚⊛⊝◯∖+ - / * ⋅ ∘ ∙ ± × ÷ ∓ ∔ ∧ ∨ ∩ ∪ ≀ ⊎ ⊓ ⊔ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊝ ◯ ∖ {}+−/∗⋅∘∙±×÷∓∔∧∨∩∪≀⊎⊓⊔⊕⊖⊗⊘⊙⊚⊛⊝◯∖

### Fractions and Binomials

| ab\\frac{a}{b}ba​ `\frac{a}{b}` | ab\\tfrac{a}{b}ba​ `\tfrac{a}{b}` | (aa+1]\\genfrac ( ] {2pt}{1}a{a+1}(a+1a​] `\genfrac ( ] {2pt}{1}a{a+1}` |
|---------------------------------|-----------------------------------|-------------------------------------------------------------------------|
| ab{a \\over b}ba​ `{a \over b}` | ab\\dfrac{a}{b}ba​ `\dfrac{a}{b}` | ab+1{a \\above{2pt} b+1}b+1a​ `{a \above{2pt} b+1}`                     |
| a/ba/ba/b `a/b`                 |                                   | a1+1b\\cfrac{a}{1 + \\cfrac{1}{b}}1+b1​a​ `\cfrac{a}{1 + \cfrac{1}{b}}` |

| (nk)\\binom{n}{k}(kn​) `\binom{n}{k}`   | (nk)\\dbinom{n}{k}(kn​) `\dbinom{n}{k}` | {nk}{n\\brace k}{kn​} `{n\brace k}`   |
|-----------------------------------------|-----------------------------------------|---------------------------------------|
| (nk){n \\choose k}(kn​) `{n \choose k}` | (nk)\\tbinom{n}{k}(kn​) `\tbinom{n}{k}` | \[nk]{n\\brack k}\[kn​] `{n\brack k}` |

### Math Operators

| arcsin⁡\\arcsinarcsin `\arcsin`            | cosec⁡\\coseccosec `\cosec`                                 | deg⁡\\degdeg `\deg`                  | sec⁡\\secsec `\sec`                 |
|--------------------------------------------|-------------------------------------------------------------|--------------------------------------|-------------------------------------|
| arccos⁡\\arccosarccos `\arccos`            | cosh⁡\\coshcosh `\cosh`                                     | dim⁡\\dimdim `\dim`                  | sin⁡\\sinsin `\sin`                 |
| arctan⁡\\arctanarctan `\arctan`            | cot⁡\\cotcot `\cot`                                         | exp⁡\\expexp `\exp`                  | sinh⁡\\sinhsinh `\sinh`             |
| arctg⁡\\arctgarctg `\arctg`                | cotg⁡\\cotgcotg `\cotg`                                     | hom⁡\\homhom `\hom`                  | sh⁡\\shsh `\sh`                     |
| arcctg⁡\\arcctgarcctg `\arcctg`            | coth⁡\\cothcoth `\coth`                                     | ker⁡\\kerker `\ker`                  | tan⁡\\tantan `\tan`                 |
| arg⁡\\argarg `\arg`                        | csc⁡\\csccsc `\csc`                                         | lg⁡\\lglg `\lg`                      | tanh⁡\\tanhtanh `\tanh`             |
| ch⁡\\chch `\ch`                            | ctg⁡\\ctgctg `\ctg`                                         | ln⁡\\lnln `\ln`                      | tg⁡\\tgtg `\tg`                     |
| cos⁡\\coscos `\cos`                        | cth⁡\\cthcth `\cth`                                         | log⁡\\loglog `\log`                  | th⁡\\thth `\th`                     |
| f⁡\\operatorname{f}f `\operatorname{f}`    |                                                             |                                      |                                     |
| arg max⁡\\argmaxargmax `\argmax`           | inj lim⁡\\injliminjlim `\injlim`                            | min⁡\\minmin `\min`                  | lim→⁡\\varinjlimlim​ `\varinjlim`   |
| arg min⁡\\argminargmin `\argmin`           | lim⁡\\limlim `\lim`                                         | plim⁡\\plimplim `\plim`              | lim‾⁡\\varliminflim​ `\varliminf`   |
| det⁡\\detdet `\det`                        | lim inf⁡\\liminfliminf `\liminf`                            | Pr⁡\\PrPr `\Pr`                      | lim‾⁡\\varlimsuplim `\varlimsup`    |
| gcd⁡\\gcdgcd `\gcd`                        | lim sup⁡\\limsuplimsup `\limsup`                            | proj lim⁡\\projlimprojlim `\projlim` | lim←⁡\\varprojlimlim​ `\varprojlim` |
| inf⁡\\infinf `\inf`                        | max⁡\\maxmax `\max`                                         | sup⁡\\supsup `\sup`                  |                                     |
| f⁡\\operatorname\*{f}f `\operatorname*{f}` | f⁡\\operatornamewithlimits{f}f `\operatornamewithlimits{f}` |                                      |                                     |

Functions in the bottom six rows of this table can take `\limits`.

### \\sqrt

x\\sqrt{x}x​ `\sqrt{x}`

x3\\sqrt\[3]{x}3x​ `\sqrt[3]{x}`

## Relations

=!\\stackrel{!}{=}=! `\stackrel{!}{=}`

=== `=`≑\\doteqdot≑ `\doteqdot`⪅\\lessapprox⪅ `\lessapprox`⌣\\smile⌣ `\smile`

&lt;&lt;&lt; `<`≖\\eqcirc≖ `\eqcirc`⋚\\lesseqgtr⋚ `\lesseqgtr`⊏\\sqsubset⊏ `\sqsubset`

&gt;&gt;&gt; `>`∹\\eqcolon−: `\eqcolon` or
`\minuscolon`⪋\\lesseqqgtr⪋ `\lesseqqgtr`⊑\\sqsubseteq⊑ `\sqsubseteq`

::: `:`−∷\\Eqcolon−:: `\Eqcolon` or
`\minuscoloncolon`≶\\lessgtr≶ `\lessgtr`⊐\\sqsupset⊐ `\sqsupset`

≈\\approx≈ `\approx`≕\\eqqcolon=: `\eqqcolon` or
`\equalscolon`≲\\lesssim≲ `\lesssim`⊒\\sqsupseteq⊒ `\sqsupseteq`

≈:\\approxcolon≈: `\approxcolon`=∷\\Eqqcolon=:: `\Eqqcolon` or
`\equalscoloncolon`≪\\ll≪ `\ll`⋐\\Subset⋐ `\Subset`

≈∷\\approxcoloncolon≈:: `\approxcoloncolon`≂\\eqsim≂ `\eqsim`⋘\\lll⋘ `\lll`⊂\\subset⊂ `\subset` or `\sub`

≊\\approxeq≊ `\approxeq`⪖\\eqslantgtr⪖ `\eqslantgtr`⋘\\llless⋘ `\llless`⊆\\subseteq⊆ `\subseteq` or `\sube`

≍\\asymp≍ `\asymp`⪕\\eqslantless⪕ `\eqslantless`&lt;\\lt&lt; `\lt`⫅\\subseteqq⫅ `\subseteqq`

∍\\backepsilon∍ `\backepsilon`≡\\equiv≡ `\equiv`∣\\mid∣ `\mid`≻\\succ≻ `\succ`

∽\\backsim∽ `\backsim`≒\\fallingdotseq≒ `\fallingdotseq`⊨\\models⊨ `\models`⪸\\succapprox⪸ `\succapprox`

⋍\\backsimeq⋍ `\backsimeq`⌢\\frown⌢ `\frown`⊸\\multimap⊸ `\multimap`≽\\succcurlyeq≽ `\succcurlyeq`

≬\\between≬ `\between`≥\\ge≥ `\ge`⊶\\origof⊶ `\origof`⪰\\succeq⪰ `\succeq`

⋈\\bowtie⋈ `\bowtie`≥\\geq≥ `\geq`∋\\owns∋ `\owns`≿\\succsim≿ `\succsim`

≏\\bumpeq≏ `\bumpeq`≧\\geqq≧ `\geqq`∥\\parallel∥ `\parallel`⋑\\Supset⋑ `\Supset`

≎\\Bumpeq≎ `\Bumpeq`⩾\\geqslant⩾ `\geqslant`⊥\\perp⊥ `\perp`⊃\\supset⊃ `\supset`

≗\\circeq≗ `\circeq`≫\\gg≫ `\gg`⋔\\pitchfork⋔ `\pitchfork`⊇\\supseteq⊇ `\supseteq` or `\supe`

:≈\\colonapprox:≈ `\colonapprox`⋙\\ggg⋙ `\ggg`≺\\prec≺ `\prec`⫆\\supseteqq⫆ `\supseteqq`

∷≈\\Colonapprox::≈ `\Colonapprox` or
`\coloncolonapprox`⋙\\gggtr⋙ `\gggtr`⪷\\precapprox⪷ `\precapprox`≈\\thickapprox≈ `\thickapprox`

:−\\coloneq:− `\coloneq` or
`\colonminus`&gt;\\gt&gt; `\gt`≼\\preccurlyeq≼ `\preccurlyeq`∼\\thicksim∼ `\thicksim`

∷−\\Coloneq::− `\Coloneq` or
`\coloncolonminus`⪆\\gtrapprox⪆ `\gtrapprox`⪯\\preceq⪯ `\preceq`⊴\\trianglelefteq⊴ `\trianglelefteq`

≔\\coloneqq:= `\coloneqq` or
`\colonequals`⋛\\gtreqless⋛ `\gtreqless`≾\\precsim≾ `\precsim`≜\\triangleq≜ `\triangleq`

∷=\\Coloneqq::= `\Coloneqq` or
`\coloncolonequals`⪌\\gtreqqless⪌ `\gtreqqless`∝\\propto∝ `\propto`⊵\\trianglerighteq⊵ `\trianglerighteq`

:∼\\colonsim:∼ `\colonsim`≷\\gtrless≷ `\gtrless`≓\\risingdotseq≓ `\risingdotseq`∝\\varpropto∝ `\varpropto`

∷∼\\Colonsim::∼ `\Colonsim` or
`\coloncolonsim`≳\\gtrsim≳ `\gtrsim`∣\\shortmid∣ `\shortmid`△\\vartriangle△ `\vartriangle`

≅\\cong≅ `\cong`⊷\\imageof⊷ `\imageof`∥\\shortparallel∥ `\shortparallel`⊲\\vartriangleleft⊲ `\vartriangleleft`

⋞\\curlyeqprec⋞ `\curlyeqprec`∈\\in∈ `\in` or `\isin`∼\\sim∼ `\sim`⊳\\vartriangleright⊳ `\vartriangleright`

⋟\\curlyeqsucc⋟ `\curlyeqsucc`⋈\\Join⋈ `\Join`∼:\\simcolon∼: `\simcolon`:\\vcentcolon: `\vcentcolon` or
`\ratio`

⊣\\dashv⊣ `\dashv`≤\\le≤ `\le`∼∷\\simcoloncolon∼:: `\simcoloncolon`⊢\\vdash⊢ `\vdash`

∷\\dblcolon:: `\dblcolon` or
`\coloncolon`≤\\leq≤ `\leq`≃\\simeq≃ `\simeq`⊨\\vDash⊨ `\vDash`

≐\\doteq≐ `\doteq`≦\\leqq≦ `\leqq`⌢\\smallfrown⌢ `\smallfrown`⊩\\Vdash⊩ `\Vdash`

≑\\Doteq≑ `\Doteq`⩽\\leqslant⩽ `\leqslant`⌣\\smallsmile⌣ `\smallsmile`⊪\\Vvdash⊪ `\Vvdash`

Direct Input: =&lt;&gt;:∈∋∝∼∽≂≃≅≈≊≍≎≏≐≑≒≓≖≗≜≡≤≥≦≧≫≬≳≷≺≻≼≽≾≿⊂⊃⊆⊇⊏⊐⊑⊒⊢⊣⊩⊪⊸⋈⋍⋐⋑⋔⋙⋛⋞⋟⌢⌣⩾⪆⪌⪕⪖⪯⪰⪷⪸⫅⫆≲⩽⪅≶⋚⪋⊥⊨⊶⊷= &lt; &gt; : ∈ ∋ ∝ ∼ ∽ ≂ ≃ ≅ ≈ ≊ ≍ ≎ ≏ ≐ ≑ ≒ ≓ ≖ ≗ ≜ ≡ ≤ ≥ ≦ ≧ ≫ ≬ ≳ ≷ ≺ ≻ ≼ ≽ ≾ ≿ ⊂ ⊃ ⊆ ⊇ ⊏ ⊐ ⊑ ⊒ ⊢ ⊣ ⊩ ⊪ ⊸ ⋈ ⋍ ⋐ ⋑ ⋔ ⋙ ⋛ ⋞ ⋟ ⌢ ⌣ ⩾ ⪆ ⪌ ⪕ ⪖ ⪯ ⪰ ⪷ ⪸ ⫅ ⫆ ≲ ⩽ ⪅ ≶ ⋚ ⪋ ⟂ ⊨ ⊶ ⊷=&lt;&gt;:∈∋∝∼∽≂≃≅≈≊≍≎≏≐≑≒≓≖≗≜≡≤≥≦≧≫≬≳≷≺≻≼≽≾≿⊂⊃⊆⊇⊏⊐⊑⊒⊢⊣⊩⊪⊸⋈⋍⋐⋑⋔⋙⋛⋞⋟⌢⌣⩾⪆⪌⪕⪖⪯⪰⪷⪸⫅⫆≲⩽⪅≶⋚⪋⊥⊨⊶⊷ `≔ ≕ ⩴`

### Negated Relations

≠\\not == `\not =`

| ⪊\\gnapprox⪊ `\gnapprox`   | ≱\\ngeqslant `\ngeqslant`           | ⊈\\nsubseteq⊈ `\nsubseteq`               | ⪵\\precneqq⪵ `\precneqq`           |
|----------------------------|--------------------------------------|------------------------------------------|------------------------------------|
| ⪈\\gneq⪈ `\gneq`           | ≯\\ngtr≯ `\ngtr`                     | ⊈\\nsubseteqq `\nsubseteqq`             | ⋨\\precnsim⋨ `\precnsim`           |
| ≩\\gneqq≩ `\gneqq`         | ≰\\nleq≰ `\nleq`                     | ⊁\\nsucc⊁ `\nsucc`                       | ⊊\\subsetneq⊊ `\subsetneq`         |
| ⋧\\gnsim⋧ `\gnsim`         | ≰\\nleqq `\nleqq`                   | ⋡\\nsucceq⋡ `\nsucceq`                   | ⫋\\subsetneqq⫋ `\subsetneqq`       |
| ≩\\gvertneqq `\gvertneqq` | ≰\\nleqslant `\nleqslant`           | ⊉\\nsupseteq⊉ `\nsupseteq`               | ⪺\\succnapprox⪺ `\succnapprox`     |
| ⪉\\lnapprox⪉ `\lnapprox`   | ≮\\nless≮ `\nless`                   | ⊉\\nsupseteqq `\nsupseteqq`             | ⪶\\succneqq⪶ `\succneqq`           |
| ⪇\\lneq⪇ `\lneq`           | ∤\\nmid∤ `\nmid`                     | ⋪\\ntriangleleft⋪ `\ntriangleleft`       | ⋩\\succnsim⋩ `\succnsim`           |
| ≨\\lneqq≨ `\lneqq`         | ∉\\notin∈/ `\notin`                  | ⋬\\ntrianglelefteq⋬ `\ntrianglelefteq`   | ⊋\\supsetneq⊋ `\supsetneq`         |
| ⋦\\lnsim⋦ `\lnsim`         | ∌\\notni∋ `\notni`                  | ⋫\\ntriangleright⋫ `\ntriangleright`     | ⫌\\supsetneqq⫌ `\supsetneqq`       |
| ≨\\lvertneqq `\lvertneqq` | ∦\\nparallel∦ `\nparallel`           | ⋭\\ntrianglerighteq⋭ `\ntrianglerighteq` | ⊊\\varsubsetneq `\varsubsetneq`   |
| ≆\\ncong≆ `\ncong`         | ⊀\\nprec⊀ `\nprec`                   | ⊬\\nvdash⊬ `\nvdash`                     | ⫋\\varsubsetneqq `\varsubsetneqq` |
| ≠\\ne= `\ne`              | ⋠\\npreceq⋠ `\npreceq`               | ⊭\\nvDash⊭ `\nvDash`                     | ⊋\\varsupsetneq `\varsupsetneq`   |
| ≠\\neq= `\neq`            | ∤\\nshortmid `\nshortmid`           | ⊯\\nVDash⊯ `\nVDash`                     | ⫌\\varsupsetneqq `\varsupsetneqq` |
| ≱\\ngeq≱ `\ngeq`           | ∦\\nshortparallel `\nshortparallel` | ⊮\\nVdash⊮ `\nVdash`                     |                                    |
| ≱\\ngeqq `\ngeqq`         | ≁\\nsim≁ `\nsim`                     | ⪹\\precnapprox⪹ `\precnapprox`           |                                    |

Direct Input: ∉∌∤∦≁≆≠≨≩≮≯≰≱⊀⊁⊈⊉⊊⊋⊬⊭⊮⊯⋠⋡⋦⋧⋨⋩⋬⋭⪇⪈⪉⪊⪵⪶⪹⪺⫋⫌∉ ∌ ∤ ∦ ≁ ≆ ≠ ≨ ≩ ≮ ≯ ≰ ≱ ⊀ ⊁ ⊈ ⊉ ⊊ ⊋ ⊬ ⊭ ⊮ ⊯ ⋠ ⋡ ⋦ ⋧ ⋨ ⋩ ⋬ ⋭ ⪇ ⪈ ⪉ ⪊ ⪵ ⪶ ⪹ ⪺ ⫋ ⫌∈/∋∤∦≁≆=≨≩≮≯≰≱⊀⊁⊈⊉⊊⊋⊬⊭⊮⊯⋠⋡⋦⋧⋨⋩⋬⋭⪇⪈⪉⪊⪵⪶⪹⪺⫋⫌

### Arrows

| ↺\\circlearrowleft↺ `\circlearrowleft`   | ↼\\leftharpoonup↼ `\leftharpoonup`             | ⇒\\rArr⇒ `\rArr`                           |
|------------------------------------------|------------------------------------------------|--------------------------------------------|
| ↻\\circlearrowright↻ `\circlearrowright` | ⇇\\leftleftarrows⇇ `\leftleftarrows`           | →\\rarr→ `\rarr`                           |
| ↶\\curvearrowleft↶ `\curvearrowleft`     | ↔\\leftrightarrow↔ `\leftrightarrow`           | ↾\\restriction↾ `\restriction`             |
| ↷\\curvearrowright↷ `\curvearrowright`   | ⇔\\Leftrightarrow⇔ `\Leftrightarrow`           | →\\rightarrow→ `\rightarrow`               |
| ⇓\\Darr⇓ `\Darr`                         | ⇆\\leftrightarrows⇆ `\leftrightarrows`         | ⇒\\Rightarrow⇒ `\Rightarrow`               |
| ⇓\\dArr⇓ `\dArr`                         | ⇋\\leftrightharpoons⇋ `\leftrightharpoons`     | ↣\\rightarrowtail↣ `\rightarrowtail`       |
| ↓\\darr↓ `\darr`                         | ↭\\leftrightsquigarrow↭ `\leftrightsquigarrow` | ⇁\\rightharpoondown⇁ `\rightharpoondown`   |
| ⇠\\dashleftarrow⇠ `\dashleftarrow`       | ⇚\\Lleftarrow⇚ `\Lleftarrow`                   | ⇀\\rightharpoonup⇀ `\rightharpoonup`       |
| ⇢\\dashrightarrow⇢ `\dashrightarrow`     | ⟵\\longleftarrow⟵ `\longleftarrow`             | ⇄\\rightleftarrows⇄ `\rightleftarrows`     |
| ↓\\downarrow↓ `\downarrow`               | ⟸\\Longleftarrow⟸ `\Longleftarrow`             | ⇌\\rightleftharpoons⇌ `\rightleftharpoons` |
| ⇓\\Downarrow⇓ `\Downarrow`               | ⟷\\longleftrightarrow⟷ `\longleftrightarrow`   | ⇉\\rightrightarrows⇉ `\rightrightarrows`   |
| ⇊\\downdownarrows⇊ `\downdownarrows`     | ⟺\\Longleftrightarrow⟺ `\Longleftrightarrow`   | ⇝\\rightsquigarrow⇝ `\rightsquigarrow`     |
| ⇃\\downharpoonleft⇃ `\downharpoonleft`   | ⟼\\longmapsto⟼ `\longmapsto`                   | ⇛\\Rrightarrow⇛ `\Rrightarrow`             |
| ⇂\\downharpoonright⇂ `\downharpoonright` | ⟶\\longrightarrow⟶ `\longrightarrow`           | ↱\\Rsh↱ `\Rsh`                             |
| ←\\gets← `\gets`                         | ⟹\\Longrightarrow⟹ `\Longrightarrow`           | ↘\\searrow↘ `\searrow`                     |
| ⇔\\Harr⇔ `\Harr`                         | ↫\\looparrowleft↫ `\looparrowleft`             | ↙\\swarrow↙ `\swarrow`                     |
| ⇔\\hArr⇔ `\hArr`                         | ↬\\looparrowright↬ `\looparrowright`           | →\\to→ `\to`                               |
| ↔\\harr↔ `\harr`                         | ⇔\\Lrarr⇔ `\Lrarr`                             | ↞\\twoheadleftarrow↞ `\twoheadleftarrow`   |
| ↩\\hookleftarrow↩ `\hookleftarrow`       | ⇔\\lrArr⇔ `\lrArr`                             | ↠\\twoheadrightarrow↠ `\twoheadrightarrow` |
| ↪\\hookrightarrow↪ `\hookrightarrow`     | ↔\\lrarr↔ `\lrarr`                             | ⇑\\Uarr⇑ `\Uarr`                           |
| ⟺  \\iff⟺ `\iff`                         | ↰\\Lsh↰ `\Lsh`                                 | ⇑\\uArr⇑ `\uArr`                           |
| ⟸  \\impliedby⟸ `\impliedby`             | ↦\\mapsto↦ `\mapsto`                           | ↑\\uarr↑ `\uarr`                           |
| ⟹  \\implies⟹ `\implies`                 | ↗\\nearrow↗ `\nearrow`                         | ↑\\uparrow↑ `\uparrow`                     |
| ⇐\\Larr⇐ `\Larr`                         | ↚\\nleftarrow↚ `\nleftarrow`                   | ⇑\\Uparrow⇑ `\Uparrow`                     |
| ⇐\\lArr⇐ `\lArr`                         | ⇍\\nLeftarrow⇍ `\nLeftarrow`                   | ↕\\updownarrow↕ `\updownarrow`             |
| ←\\larr← `\larr`                         | ↮\\nleftrightarrow↮ `\nleftrightarrow`         | ⇕\\Updownarrow⇕ `\Updownarrow`             |
| ⇝\\leadsto⇝ `\leadsto`                   | ⇎\\nLeftrightarrow⇎ `\nLeftrightarrow`         | ↿\\upharpoonleft↿ `\upharpoonleft`         |
| ←\\leftarrow← `\leftarrow`               | ↛\\nrightarrow↛ `\nrightarrow`                 | ↾\\upharpoonright↾ `\upharpoonright`       |
| ⇐\\Leftarrow⇐ `\Leftarrow`               | ⇏\\nRightarrow⇏ `\nRightarrow`                 | ⇈\\upuparrows⇈ `\upuparrows`               |
| ↢\\leftarrowtail↢ `\leftarrowtail`       | ↖\\nwarrow↖ `\nwarrow`                         |                                            |
| ↽\\leftharpoondown↽ `\leftharpoondown`   | ⇒\\Rarr⇒ `\Rarr`                               |                                            |

Direct Input: ←↑→↓↔↕↖↗↘↙↚↛↞↠↢↣↦↩↪↫↬↭↮↰↱↶↷↺↻↼↽↾↾↿⇀⇁⇂⇃⇄⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇚⇛⇝⇠⇢⟵⟶⟷⟸⟹⟺⟼← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↞ ↠ ↢ ↣ ↦ ↩ ↪ ↫ ↬ ↭ ↮ ↰ ↱↶ ↷ ↺ ↻ ↼ ↽ ↾ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇚ ⇛ ⇝ ⇠ ⇢ ⟵ ⟶ ⟷ ⟸ ⟹ ⟺ ⟼←↑→↓↔↕↖↗↘↙↚↛↞↠↢↣↦↩↪↫↬↭↮↰↱↶↷↺↻↼↽↾↾↿⇀⇁⇂⇃⇄⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇚⇛⇝⇠⇢⟵⟶⟷⟸⟹⟺⟼ ↽

**Extensible Arrows**

| ←abc\\xleftarrow{abc}abc​ `\xleftarrow{abc}`                 | →underover\\xrightarrow\[under]{over}overunder​ `\xrightarrow[under]{over}` |
|--------------------------------------------------------------|-----------------------------------------------------------------------------|
| ⇐abc\\xLeftarrow{abc}abc​ `\xLeftarrow{abc}`                 | ⇒abc\\xRightarrow{abc}abc​ `\xRightarrow{abc}`                              |
| ↔abc\\xleftrightarrow{abc}abc​ `\xleftrightarrow{abc}`       | ⇔abc\\xLeftrightarrow{abc}abc​ `\xLeftrightarrow{abc}`                      |
| ↩abc\\xhookleftarrow{abc}abc​ `\xhookleftarrow{abc}`         | ↪abc\\xhookrightarrow{abc}abc​ `\xhookrightarrow{abc}`                      |
| ↞abc\\xtwoheadleftarrow{abc}abc `\xtwoheadleftarrow{abc}`    | ↠abc\\xtwoheadrightarrow{abc}abc `\xtwoheadrightarrow{abc}`                 |
| ↼abc\\xleftharpoonup{abc}abc​ `\xleftharpoonup{abc}`         | ⇀abc\\xrightharpoonup{abc}abc​ `\xrightharpoonup{abc}`                      |
| ↽abc\\xleftharpoondown{abc}abc​ `\xleftharpoondown{abc}`     | ⇁abc\\xrightharpoondown{abc}abc​ `\xrightharpoondown{abc}`                  |
| ⇋abc\\xleftrightharpoons{abc}abc​ `\xleftrightharpoons{abc}` | ⇌abc\\xrightleftharpoons{abc}abc​ `\xrightleftharpoons{abc}`                |
| ⇄abc\\xtofrom{abc}abc​ `\xtofrom{abc}`                       | ↦abc\\xmapsto{abc}abc​ `\xmapsto{abc}`                                      |
| =abc\\xlongequal{abc}abc `\xlongequal{abc}`                  |                                                                             |

Extensible arrows all can take an optional argument in the same manner
as `\xrightarrow[under]{over}`.

## Special Notation

**Bra-ket Notation**

| ⟨ϕ∣\\bra{\\phi}⟨ϕ∣ `\bra{\phi}` | ∣ψ⟩\\ket{\\psi}∣ψ⟩ `\ket{\psi}` | ⟨ϕ∣ψ⟩\\braket{\\phi\\VERT\\psi}⟨ϕ∣ψ⟩ `\braket{\phi|\psi}`                                                            |
|---------------------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------|
| ⟨ϕ∣\\Bra{\\phi}⟨ϕ∣ `\Bra{\phi}` | ∣ψ⟩\\Ket{\\psi}∣ψ⟩ `\Ket{\psi}` | ⟨ϕ \| ∂2∂t2 \| ψ⟩\\Braket{ ϕ \\VERT \\frac{∂^2}{∂ t^2} \\VERT ψ }⟨ϕ​∂t2∂2​​ψ⟩ `\Braket{ ϕ | \frac{∂^2}{∂ t^2} | ψ }` |

## Style, Color, Size, and Font

**Class Assignment**

`\mathbin` `\mathclose` `\mathinner` `\mathop`
`\mathopen` `\mathord` `\mathpunct` `\mathrel`

**Color**

F=ma\\color{blue} F=maF=ma `\color{blue} F=ma`

Note that `\color` acts like a switch. Other color functions expect the content to be a function argument:

F=ma\\textcolor{blue}{F=ma}F=ma `\textcolor{blue}{F=ma}`
F=ma\\textcolor{#228B22}{F=ma}F=ma `\textcolor{#228B22}{F=ma}`
F=ma\\colorbox{aqua}{$F=ma$}F=ma​ `\colorbox{aqua}{$F=ma$}`
F=ma\\fcolorbox{red}{aqua}{$F=ma$}F=ma​ `\fcolorbox{red}{aqua}{$F=ma$}`

Note that, as in LaTeX, `\colorbox` &amp; `\fcolorbox` renders its third argument as text, so you may want to switch back to math mode with `$` as in the examples above.

For color definition, KaTeX color functions will accept the standard HTML [predefined color names](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords). They will also accept an RGB argument in CSS hexa­decimal style. The "#" is optional before a six-digit specification.

**Font**

| Ab0\\mathrm{Ab0}Ab0 `\mathrm{Ab0}`         | Ab0\\mathbf{Ab0}Ab0 `\mathbf{Ab0}`         | Ab0\\mathsf{Ab0}Ab0 `\mathsf{Ab0}`     |
|--------------------------------------------|--------------------------------------------|----------------------------------------|
| Ab0\\mathnormal{Ab0}Ab0 `\mathnormal{Ab0}` | Ab0\\textbf{Ab0}Ab0 `\textbf{Ab0}`         | Ab0\\textsf{Ab0}Ab0 `\textsf{Ab0}`     |
| Ab0\\textrm{Ab0}Ab0 `\textrm{Ab0}`         | Ab0\\bf Ab0Ab0 `\bf Ab0`                   | Ab0\\sf Ab0Ab0 `\sf Ab0`               |
| Ab0\\rm Ab0Ab0 `\rm Ab0`                   | Ab0\\bold{Ab0}Ab0 `\bold{Ab0}`             | Ab0\\mathsfit{Ab0}Ab0 `\mathsfit{Ab0}` |
| Ab0\\textnormal{Ab0}Ab0 `\textnormal{Ab0}` | Ab0\\boldsymbol{Ab0}Ab0 `\boldsymbol{Ab0}` | AB\\Bbb{AB}AB `\Bbb{AB}`               |
| Ab0\\text{Ab0}Ab0 `\text{Ab0}`             | Ab0\\bm{Ab0}Ab0 `\bm{Ab0}`                 | AB\\mathbb{AB}AB `\mathbb{AB}`         |
| Ab0\\textup{Ab0}Ab0 `\textup{Ab0}`         | Ab0\\textmd{Ab0}Ab0 `\textmd{Ab0}`         | Ab0\\frak{Ab0}Ab0 `\frak{Ab0}`         |
| Ab0\\mathit{Ab0}Ab0 `\mathit{Ab0}`         | Ab0\\mathtt{Ab0}Ab0 `\mathtt{Ab0}`         | Ab0\\mathfrak{Ab0}Ab0 `\mathfrak{Ab0}` |
| Ab0\\textit{Ab0}Ab0 `\textit{Ab0}`         | Ab0\\texttt{Ab0}Ab0 `\texttt{Ab0}`         | AB0\\mathcal{AB0}AB0 `\mathcal{AB0}`   |
| Ab0\\it Ab0Ab0 `\it Ab0`                   | Ab0\\tt Ab0Ab0 `\tt Ab0`                   | AB0\\cal AB0AB0 `\cal AB0`             |
| Ab0\\emph{Ab0}Ab0 `\emph{Ab0}`             |                                            | AB\\mathscr{AB}AB `\mathscr{AB}`       |

One can stack font family, font weight, and font shape by using the `\textXX` versions of the font functions. So `\textsf{\textbf{H}}` will produce H\\textsf{\\textbf{H}}H. The other versions do not stack, e.g., `\mathsf{\mathbf{H}}` will produce H\\mathsf{\\mathbf{H}}H.

In cases where KaTeX fonts do not have a bold glyph, `\pmb` can simulate one. For example, `\pmb{\mu}` renders as : μ\\pmb{\\mu}μ

**Size**

| AB\\Huge ABAB `\Huge AB`   | AB\\normalsize ABAB `\normalsize AB`     |
|----------------------------|------------------------------------------|
| AB\\huge ABAB `\huge AB`   | AB\\small ABAB `\small AB`               |
| AB\\LARGE ABAB `\LARGE AB` | AB\\footnotesize ABAB `\footnotesize AB` |
| AB\\Large ABAB `\Large AB` | AB\\scriptsize ABAB `\scriptsize AB`     |
| AB\\large ABAB `\large AB` | AB\\tiny ABAB `\tiny AB`                 |

**Style**

| ∑i=1n\\displaystyle\\sum\_{i=1}^ni=1∑n​ `\displaystyle\sum_{i=1}^n`                      |
|------------------------------------------------------------------------------------------|
| ∑i=1n\\textstyle\\sum\_{i=1}^n∑i=1n​ `\textstyle\sum_{i=1}^n`                            |
| x\\scriptstyle xx `\scriptstyle x`         (The size of a first sub/superscript)         |
| x\\scriptscriptstyle xx `\scriptscriptstyle x` (The size of subsequent sub/superscripts) |
| lim⁡x\\lim\\limits\_xxlim​ `\lim\limits_x`                                               |
| lim⁡x\\lim\\nolimits\_xlimx​ `\lim\nolimits_x`                                           |
| x^2\\verb!x^2!x^2 `\verb!x^2!`                                                           |

`\text{…}` will accept nested `$…$` fragments and render them in math mode.

## Symbols and Punctuation

| `% comment`                                               | …\\dots… `\dots`                                | KaTeX\\KaTeXKATE​X `\KaTeX`                       |
|-----------------------------------------------------------|-------------------------------------------------|---------------------------------------------------|
| %\\%% `\%`                                                | ⋯\\cdots⋯ `\cdots`                              | LaTeX\\LaTeXLATE​X `\LaTeX`                       |
| #\\## `\#`                                                | ⋱\\ddots⋱ `\ddots`                              | TeX\\TeXTE​X `\TeX`                               |
| &amp;\\&amp;&amp; `\&`                                    | …\\ldots… `\ldots`                              | ∇\\nabla∇ `\nabla`                                |
| \_\\\__ `\_`                                              | ⋮\\vdots⋮ `\vdots`                              | ∞\\infty∞ `\infty`                                |
| \_\\text{\\textunderscore}_ `\text{\textunderscore}`      | ⋯\\dotsb⋯ `\dotsb`                              | ∞\\infin∞ `\infin`                                |
| –\\text{--}– `\text{--}`                                  | …\\dotsc… `\dotsc`                              | ✓\\checkmark✓ `\checkmark`                        |
| –\\text{\\textendash}– `\text{\textendash}`               | ⁣⋯\\dotsi⋯ `\dotsi`                             | †\\dag† `\dag`                                    |
| —\\text{---}— `\text{---}`                                | ⋯\\dotsm⋯ `\dotsm`                              | †\\dagger† `\dagger`                              |
| —\\text{\\textemdash}— `\text{\textemdash}`               | …\\dotso… `\dotso`                              | †\\text{\\textdagger}† `\text{\textdagger}`       |
| ~\\text{\\textasciitilde}~ `\text{\textasciitilde}`       | ⋅\\sdot⋅ `\sdot`                                | ‡\\ddag‡ `\ddag`                                  |
| ^\\text{\\textasciicircum}^ `\text{\textasciicircum}`     | …\\mathellipsis… `\mathellipsis`                | ‡\\ddagger‡ `\ddagger`                            |
| ‘\`‘ `` ` ``                                              | …\\text{\\textellipsis}… `\text{\textellipsis}` | ‡\\text{\\textdaggerdbl}‡ `\text{\textdaggerdbl}` |
| ‘\\text{\\textquoteleft}‘ `text{\textquoteleft}`          | □\\Box□ `\Box`                                  | ‡\\Dagger‡ `\Dagger`                              |
| ‘\\lq‘ `\lq`                                              | □\\square□ `\square`                            | ∠\\angle∠ `\angle`                                |
| ’\\text{\\textquoteright}’ `\text{\textquoteright}`       | ■\\blacksquare■ `\blacksquare`                  | ∡\\measuredangle∡ `\measuredangle`                |
| ′\\rq′ `\rq`                                              | △\\triangle△ `\triangle`                        | ∢\\sphericalangle∢ `\sphericalangle`              |
| “\\text{\\textquotedblleft}“ `\text{\textquotedblleft}`   | ▽\\triangledown▽ `\triangledown`                | ⊤\\top⊤ `\top`                                    |
| """ `"`                                                   | ◃\\triangleleft◃ `\triangleleft`                | ⊥\\bot⊥ `\bot`                                    |
| ”\\text{\\textquotedblright}” `\text{\textquotedblright}` | ▹\\triangleright▹ `\triangleright`              | $\\$$ `\$`                                        |
| ⁣:\\colon: `\colon`                                       | ▽\\bigtriangledown▽ `\bigtriangledown`          | $\\text{\\textdollar}$ `\text{\textdollar}`       |
| ‵\\backprime‵ `\backprime`                                | △\\bigtriangleup△ `\bigtriangleup`              | £\\pounds£ `\pounds`                              |
| ′\\prime′ `\prime`                                        | ▲\\blacktriangle▲ `\blacktriangle`              | £\\mathsterling£ `\mathsterling`                  |
| &lt;\\text{\\textless}&lt; `\text{\textless}`             | ▼\\blacktriangledown▼ `\blacktriangledown`      | £\\text{\\textsterling}£ `\text{\textsterling}`   |
| &gt;\\text{\\textgreater}&gt; `\text{\textgreater}`       | ◀\\blacktriangleleft◀ `\blacktriangleleft`      | ¥\\yen¥ `\yen`                                    |
| \|\\text{\\textbar}\| `\text{\textbar}`                   | ▶\\blacktriangleright▶ `\blacktriangleright`    | √\\surd√ `\surd`                                  |
| ∥\\text{\\textbardbl}∥ `\text{\textbardbl}`               | ⋄\\diamond⋄ `\diamond`                          | °\\degree° `\degree`                              |
| {\\text{\\textbraceleft}{ `\text{\textbraceleft}`         | ◊\\Diamond◊ `\Diamond`                          | °\\text{\\textdegree}° `\text{\textdegree}`       |
| }\\text{\\textbraceright}} `\text{\textbraceright}`       | ◊\\lozenge◊ `\lozenge`                          | ℧\\mho℧ `\mho`                                    |
| \\\\text{\\textbackslash}\\ `\text{\textbackslash}`       | ⧫\\blacklozenge⧫ `\blacklozenge`                | ╲\\diagdown╲ `\diagdown`                          |
| ¶\\text{\\P}¶ `\text{\P}` or `\P`                         | ⋆\\star⋆ `\star`                                | ╱\\diagup╱ `\diagup`                              |
| §\\text{\\S}§ `\text{\S}` or `\S`                         | ★\\bigstar★ `\bigstar`                          | ♭\\flat♭ `\flat`                                  |
| §\\text{\\sect}§ `\text{\sect}`                           | ♣\\clubsuit♣ `\clubsuit`                        | ♮\\natural♮ `\natural`                            |
| ©\\copyrightc◯ `\copyright`                               | ♣\\clubs♣ `\clubs`                              | ♯\\sharp♯ `\sharp`                                |
| ®\\circledR® `\circledR`                                  | ♢\\diamondsuit♢ `\diamondsuit`                  | ♡\\heartsuit♡ `\heartsuit`                        |
| ®\\text{\\textregistered}R◯ `\text{\textregistered}`      | ♢\\diamonds♢ `\diamonds`                        | ♡\\hearts♡ `\hearts`                              |
| Ⓢ\\circledSⓈ `\circledS`                                  | ♠\\spadesuit♠ `\spadesuit`                      | ♠\\spades♠ `\spades`                              |
| a◯\\text{\\textcircled a}a◯ `\text{\textcircled a}`       | ✠\\maltese✠ `\maltese`                          | ⦵\\minuso∘− `\minuso`                             |

Direct Input: § ¶ £¥∇∞⋅∠∡∢♠♡♢♣♭♮♯✓…⋮⋯⋱!£ ¥ ∇ ∞ · ∠ ∡ ∢ ♠ ♡ ♢ ♣ ♭ ♮ ♯ ✓ … ⋮ ⋯ ⋱ !£¥∇∞⋅∠∡∢♠♡♢♣♭♮♯✓…⋮⋯⋱! ‼ ⦵

## Units

In KaTeX, units are proportioned as they are in TeX.
KaTeX units are different than CSS units.

| KaTeX Unit | Value                | KaTeX Unit | Value               |
|------------|----------------------|------------|---------------------|
| em         | CSS em               | bp         | 1/72​ inch × F × G  |
| ex         | CSS ex               | pc         | 12 KaTeX pt         |
| mu         | 1/18 CSS em          | dd         | 1238/1157​ KaTeX pt |
| pt         | 1/72.27 inch × F × G | cc         | 14856/1157 KaTeX pt |
| mm         | 1 mm × F × G         | nd         | 685/642 KaTeX pt    |
| cm         | 1 cm × F × G         | nc         | 1370/107​ KaTeX pt  |
| in         | 1 inch × F × G       | sp         | 1/65536 KaTeX pt    |

where:

F = (font size of surrounding HTML text)/(10 pt)

G = 1.21 by default, because KaTeX font-size is normally 1.21 × the surrounding font size. This value [can be overridden](/docs/font#font-size-and-lengths) by the CSS of an HTML page.

The effect of style and size:

| Unit     | textstyle          | scriptscript                          | huge                     |
|----------|--------------------|---------------------------------------|--------------------------|
| em or ex | \\rule{1em}{1em}   | \\scriptscriptstyle\\rule{1em}{1em}   | \\huge\\rule{1em}{1em}   |
| mu       | \\rule{18mu}{18mu} | \\scriptscriptstyle\\rule{18mu}{18mu} | \\huge\\rule{18mu}{18mu} |
| others   | \\rule{10pt}{10pt} | \\scriptscriptstyle\\rule{10pt}{10pt} | \\huge\\rule{10pt}{10pt} |

[← Font](/docs/font)[Support Table →](/docs/support_table)

- [Accents](#accents)
- [Delimiters](#delimiters)
- [Environments](#environments)
- [HTML](#html)
- [Letters and Unicode](#letters-and-unicode)
- [Layout](#layout)

  - [Annotation](#annotation)
  - [Line Breaks](#line-breaks)
  - [Vertical Layout](#vertical-layout)
  - [Overlap and Spacing](#overlap-and-spacing)
- [Logic and Set Theory](#logic-and-set-theory)
- [Macros](#macros)
- [Operators](#operators)

  - [Big Operators](#big-operators)
  - [Binary Operators](#binary-operators)
  - [Fractions and Binomials](#fractions-and-binomials)
  - [Math Operators](#math-operators)
  - [\\sqrt](#sqrt)
- [Relations](#relations)

  - [Negated Relations](#negated-relations)
  - [Arrows](#arrows)
- [Special Notation](#special-notation)
- [Style, Color, Size, and Font](#style-color-size-and-font)
- [Symbols and Punctuation](#symbols-and-punctuation)
- [Units](#units)

# Extensions &amp; Libraries

## Extensions

These extensions are provided by KaTeX.

- [Auto-render](/docs/autorender): Automatically renders all of the math inside text
- [Copy-tex](https://github.com/KaTeX/KaTeX/tree/main/contrib/copy-tex): When selecting and copying KaTeX-rendered elements, copies their LaTeX source to the clipboard
- [`math/tex` Custom Script Type](https://github.com/KaTeX/KaTeX/tree/main/contrib/mathtex-script-type): Automatically displays LaTeX math inside `script` tags with `type=math/tex`
- [mhchem](https://github.com/KaTeX/KaTeX/tree/main/contrib/mhchem): Write beautiful chemical equations easily

## Libraries

These libraries are maintained by third-parties.

### AsciiMath

If you want to render math written in [AsciiMath](http://asciimath.org/), you'll need to first convert AsciiMath into LaTeX input, then call KaTeX.

- [asciimath2tex](https://github.com/christianp/asciimath2tex): Converts AsciiMath to TeX, with KaTeX in mind

### Android

- [KaTeXView](https://github.com/judemanutd/KaTeXView): An android library that uses Khan Academy KaTeX for TeX math rendering.

### Angular2+

- [ng-katex](https://github.com/garciparedes/ng-katex): Angular module to write beautiful math expressions with TeX syntax boosted by KaTeX library

### Canvas

- [canvas-latex](https://github.com/CurriculumAssociates/canvas-latex): Renders mathematical expressions on HTML5's canvas element. Supports popular libraries like: CreateJS, and PIXI.

### iOS

- [KaTeX-iOS](https://github.com/ianarawjo/KaTeX-iOS): iOS UIView that renders TeX expressions with KaTeX
- [KatexUtils](https://cocoapods.org/pods/KatexUtils): KaTeX solution for newer iOS version, supports CocoaPods integration

### Jekyll

- [JekTex](https://github.com/yagarea/jektex): Fast and highly configurable Jekyll plug-in that renders math expressions using KaTeX. It can be used with github pages.

### React

- [react-latex](https://github.com/zzish/react-latex): React component to render latex strings, based on KaTeX
- [react-katex](https://github.com/talyssonoc/react-katex): React components that use KaTeX to typeset math expressions

### Ruby

- [katex-ruby](https://github.com/glebm/katex-ruby): Provides server-side rendering and integration with popular Ruby web frameworks (Rails, Hanami, and anything that uses Sprockets).

### Rust

- [katex-rs](https://github.com/xu-cheng/katex-rs): Rust bindings to provide server-side rendering.

### Sphinx

- [sphinxcontrib-katex](https://github.com/hagenw/sphinxcontrib-katex): Sphinx extension to (pre-)render math using KaTeX

### Vue

- [vue-katex](https://github.com/lucpotage/vue-katex): Vue plugin to render TeX expressions using KaTeX.

### Web-Components

- [katex-element](https://github.com/georges-gomes/katex-element): KaTeX wrapped in a custom element. Simply use `<katex-element>` in HTML - framework independent.
- [katex-expression](https://github.com/navsgh/katex-expression): A web component/custom element (built with Stencil) to render KaTeX expressions. Stencil builds web components that run natively or near-natively in all widely used desktop and mobile browsers. Stencil uses a dynamic loader to load the custom elements polyfill only on browsers that need it.

### Wechat Mini Program

- [@rojer/katex-mini](https://github.com/rojer95/katex-mini): A Wechat Mini Program library that uses KaTeX for TeX math rendering.

[← Auto-render Extension](/docs/autorender)[Options →](/docs/options)

- [Extensions](#extensions)
- [Libraries](#libraries)

  - [AsciiMath](#asciimath)
  - [Android](#android)
  - [Angular2+](#angular2)
  - [Canvas](#canvas)
  - [iOS](#ios)
  - [Jekyll](#jekyll)
  - [React](#react)
  - [Ruby](#ruby)
  - [Rust](#rust)
  - [Sphinx](#sphinx)
  - [Vue](#vue)
  - [Web-Components](#web-components)
  - [Wechat Mini Program](#wechat-mini-program)

# Options

You can provide an object of options as the last argument to [`katex.render` and `katex.renderToString`](/docs/api). Available options are:

- `displayMode`: `boolean` (default: `false`). If `true` the math will be rendered in display mode. If `false` the math will be rendered in inline mode. Differences between the two modes include:

  - Display mode starts in `\displaystyle`, so `\int` and `\sum` are large, for example; while inline mode starts in `\textstyle`, where subscripts and superscripts usually don't stack on top of operators like `\sum`. You can always manually switch between `\displaystyle` and `\textstyle` using those commands.
  - Display mode centers math on its own line and disables automatic line breaking (though you can customize this behavior with [custom CSS](/docs/issues)). In inline mode, KaTeX allows line breaks after outermost relations (like `=` or `<`) or binary operators (like `+` or `\times`), the same as TeX.
- `output`: `string`. Determines the markup language of the output. The valid choices are:

  - `html`: Outputs KaTeX in HTML only.
  - `mathml`: Outputs KaTeX in MathML only.
  - `htmlAndMathml`: Outputs HTML for visual rendering and includes MathML for accessibility. This is the default.
- `leqno`: `boolean`. If `true`, display math has `\tag`s rendered on the left instead of the right, like `\usepackage[leqno]{amsmath}` in LaTeX.
- `fleqn`: `boolean`. If `true`, display math renders flush left with a `2em` left margin, like `\documentclass[fleqn]` in LaTeX with the `amsmath` package.
- `throwOnError`: `boolean`. If `true` (the default), KaTeX will throw a `ParseError` when it encounters an unsupported command or invalid LaTeX. If `false`, KaTeX will render unsupported commands as text, and render invalid LaTeX as its source code with hover text giving the error, in the color given by `errorColor`.
- `errorColor`: `string`. A color string given in the format `"#XXX"` or `"#XXXXXX"`. This option determines the color that unsupported commands and invalid LaTeX are rendered in when `throwOnError` is set to `false`. (default: `#cc0000`)
- `macros`: `object`. A collection of custom macros.

  - Each macro is a key-value pair where the key is a new command name and the value is the expansion of the macro.
  - Example: `macros: {"\\R": "\\mathbb{R}"}`
  - More precisely, each property of `macros` can have a name that starts with a backslash like `"\\foo"` (defining command `\foo`) or is a single character like `"α"` (defining the equivalent of a TeX active character), and a value that is one of the following:

    - A string with the LaTeX expansion of the macro (which will be recursively expanded when used). The string can invoke (required) arguments via `#1`, `#2`, etc.
    - A function that accepts an instance of `MacroExpander` as first argument and returns the expansion as a string. `MacroExpander` is an internal API and subject to non-backwards compatible changes. See [`src/defineMacro.js`](https://github.com/KaTeX/KaTeX/blob/main/src/defineMacro.js) for its usage.
    - An expansion object matching [an internal `MacroExpansion` specification](https://github.com/KaTeX/KaTeX/blob/main/src/defineMacro.js), which is what results from global `\def` or `\let`. For example, you can simulate the effect of `\let\realint=\int` via `{"\\realint": {tokens: [{text: "\\int", noexpand: true}], numArgs: 0}}`.
  - *This object will be modified* if the LaTeX code defines its own macros via `\gdef` or `\global\let` (or via `\def` or `\newcommand` or `\let` when using `globalGroup`). This enables consecutive calls to KaTeX to share state (in particular, user macro definitions) if you pass in the same `macros` object each time.
- `minRuleThickness`: `number`. Specifies a minimum thickness, in ems, for fraction lines, `\sqrt` top lines, `{array}` vertical lines, `\hline`, `\hdashline`, `\underline`, `\overline`, and the borders of `\fbox`, `\boxed`, and `\fcolorbox`. The usual value for these items is `0.04`, so for `minRuleThickness` to be effective it should probably take a value slightly above `0.04`, say `0.05` or `0.06`. Negative values will be ignored.
- `colorIsTextColor`: `boolean`. In early versions of both KaTeX (&lt;0.8.0) and MathJax, the `\color` function expected the content to be a function argument, as in `\color{blue}{hello}`. In current KaTeX, `\color` is a switch, as in `\color{blue} hello`. This matches LaTeX behavior. If you want the old `\color` behavior, set option `colorIsTextColor` to true.
- `maxSize`: `number`. All user-specified sizes, e.g. in `\rule{500em}{500em}`, will be capped to `maxSize` ems. If set to `Infinity` (the default), users can make elements and spaces arbitrarily large.
- `maxExpand`: `number`. Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. `\edef` expansion counts all expanded tokens. If set to `Infinity`, the macro expander will try to fully expand as in LaTeX. (default: 1000)
- `strict`: `boolean` or `string` or `function` (default: `"warn"`). If `false` or `"ignore`", allow features that make writing LaTeX convenient but are not actually supported by (Xe)LaTeX (similar to MathJax). If `true` or `"error"` (LaTeX faithfulness mode), throw an error for any such transgressions. If `"warn"` (the default), warn about such behavior via `console.warn`. Provide a custom function `handler(errorCode, errorMsg, token)` to customize behavior depending on the type of transgression (summarized by the string code `errorCode` and detailed in `errorMsg`); this function can also return `"ignore"`, `"error"`, or `"warn"` to use a built-in behavior. A list of such features and their `errorCode`s:

  - `"unknownSymbol"`: Use of unknown Unicode symbol, which will likely also lead to warnings about missing character metrics, and layouts may be incorrect (especially in terms of vertical heights).
  - `"unicodeTextInMathMode"`: Use of Unicode text characters in math mode.
  - `"mathVsTextUnits"`: Mismatch of math vs. text commands and units/mode.
  - `"commentAtEnd"`: Use of `%` comment without a terminating newline. LaTeX would thereby comment out the end of math mode (e.g. `$`), causing an error.
  - `"htmlExtension"`: Use of HTML extension (`\html`-prefixed) commands, which are provided for HTML manipulation.

  A second category of `errorCode`s never throw errors, but their strictness affects the behavior of KaTeX:

  - `"newLineInDisplayMode"`: Use of `\\` or `\newline` in display mode (outside an array/tabular environment). In strict mode, no line break results, as in LaTeX.
- `trust`: `boolean` or `function` (default: `false`). If `false` (do not trust input), prevent any commands like `\includegraphics` that could enable adverse behavior, rendering them instead in `errorColor`. If `true` (trust input), allow all such commands. Provide a custom function `handler(context)` to customize behavior depending on the context (command, arguments e.g. a URL, etc.). A list of possible contexts:

  - `{command: "\\url", url, protocol}` where `protocol` is a lowercased string like `"http"` or `"https"` that appears before a colon, or `"_relative"` for relative URLs.
  - `{command: "\\href", url, protocol}`
  - `{command: "\\includegraphics", url, protocol}`
  - `{command: "\\htmlClass", class}`
  - `{command: "\\htmlId", id}`
  - `{command: "\\htmlStyle", style}`
  - `{command: "\\htmlData", attributes}`

  Here are some sample trust settings:

  - Forbid specific command: `trust: (context) => context.command !== '\\includegraphics'`
  - Allow specific command: `trust: (context) => context.command === '\\url'`
  - Allow multiple specific commands: `trust: (context) => ['\\url', '\\href'].includes(context.command)`
  - Allow all commands with a specific protocol: `trust: (context) => context.protocol === 'http'`
  - Allow all commands with specific protocols: `trust: (context) => ['http', 'https', '_relative'].includes(context.protocol)`
  - Allow all commands but forbid specific protocol: `trust: (context) => context.protocol !== 'file'`
  - Allow certain commands with specific protocols: `trust: (context) => ['\\url', '\\href'].includes(context.command) && ['http', 'https', '_relative'].includes(context.protocol)`
- `globalGroup`: `boolean` (default: `false`). Run KaTeX code in the global group. As a consequence, macros defined at the top level by `\def` and `\newcommand` are added to the `macros` argument and can be used in subsequent render calls. In LaTeX, constructs such as `\begin{equation}` and `$$` create a local group and prevent definitions other than `\gdef` from becoming visible outside of those blocks, so this is KaTeX's default behavior.

For example:

```js
const macros = {
  "\\RR": "\\mathbb{R}",
};
katex.renderToString("\\let\\root=\\sqrt", {
  globalGroup: true,  // or use \global\let
  macros,
});
// macros now has a definition for "\\root"
katex.render("c = \\pm\\root{a^2 + b^2}\\in\\RR", element, {
  displayMode: true,
  macros,
});
```

# Support Table

This is a list of TeX functions, sorted alphabetically. This list includes functions that KaTeX supports and some that it doesn't support. There is a similar page, with functions [sorted by type](/docs/supported).

If you know the shape of a character, but not its name, [Detexify](https://detexify.kirelabs.org/classify.html) can help.

<details><summary> Big Ass List of Symbols </summary>

## Symbols

\\gdef\\VERT{|}

Symbol/FunctionRenderedSource or Comment

!n!n!n!`n!`

\\!a ⁣ba\\!bab`a\!b`

#y2\\def\\sqr#1{#1^2} \\sqr{y}y2`\def\sqr#1{#1^2} \sqr{y}`

\\##\\##

%`%this is a comment`

\\%%\\%%

&amp;abcd\\begin{matrix} a &amp; b\\cr c &amp; d \\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \\`
   `c & d`
`\end{matrix}`

\\&amp;&amp;\\&amp;&amp;

'′'′

\\'aˊ\\text{\\'{a}}aˊ`\text{\'{a}}`

((((

))))

\\(…\\)ab\\text{\\(\\frac a b\\)}ba​`\text{\(\frac a b\)}`

\\a ba\\ ba b`a\ b`

\\"a¨\\text{\\"{a}}a¨`\text{\"{a}}`

\\$$\\text{\\textdollar}$

\\,a  ba\\,\\,{b}ab`a\,\,{b}`

\\.a˙\\text{\\.{a}}a˙`\text{\.{a}}`

\\:a  ba\\:\\:{b}ab`a\:\:{b}`

\\;a    ba\\;\\;{b}aba`\;\;{b}`

\_xix\_ixi​`x_i`

\\\_\_\\\__

\\\`aˋ\\text{\\\`{a}}aˋ`\text{\'{a}}`

&lt;&lt;&lt;&lt;

\\=aˉ\\text{\\={a}}aˉ`\text{\={a}}`

&gt;&gt;&gt;&gt;

\\&gt;a  ba\\&gt;\\&gt;{b}ab`a\>\>{b}`

[[[[

]]]]

{a{a}a`{a}`

}a{a}a`{a}`

\\{{\\{{

\\}}\\}}

|∣\\vert∣

\\|∥\\Vert∥

~no no no breaks\\text{no~no~no~breaks}no no no breaks`\text{no~no~no~breaks}`

\\~a˜\\text{\\~{a}}a˜`\text{\~{a}}`

\\\\abcd\\begin{matrix} a &amp; b\\\\ c &amp; d\\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \\`
   `c & d`
`\end{matrix}`

^xix^ixi`x^i`

\\^aˆ\\text{\\^{a}}aˆ`\text{\^{a}}`

## A

Symbol/FunctionRenderedSource or Comment

\\AAA˚\\text{\\AA}A˚`\text{\AA}`

\\aaa˚\\text{\\aa}a˚`\text{\aa}`

\\aboveab+1{a \\above{2pt} b+1}b+1a​`{a \above{2pt} b+1}`

\\abovewithdelimsNot supported

\\acuteeˊ\\acute eeˊ`\acute e`

\\AEÆ\\text{\\AE}Æ`\text{\AE}`

\\aeæ\\text{\\ae}æ`\text{\ae}`

\\alefℵ\\alefℵ

\\alefsymℵ\\alefsymℵ

\\alephℵ\\alephℵ

{align}a=b+cd+e=f\\begin{align}a&amp;=b+c\\\\d+e&amp;=f\\end{align}ad+e​=b+c=f​​`\begin{align}`
   `a&=b+c \\`
   `d+e&=f`
`\end{align}`

{align\*}a=b+cd+e=f\\begin{align\*}a&amp;=b+c\\\\d+e&amp;=f\\end{align\*}ad+e​=b+c=f​`\begin{align*}`
   `a&=b+c \\`
   `d+e&=f`
`\end{align*}`

{aligned}a=b+cd+e=f\\begin{aligned}a&amp;=b+c\\\\d+e&amp;=f\\end{aligned}ad+e​=b+c=f​`\begin{aligned}`
   `a&=b+c \\`
   `d+e&=f`
`\end{aligned}`

{alignat}10x+3y=23x+13y=4\\begin{alignat}{2}10&amp;x+&amp;3&amp;y=2\\\\3&amp;x+&amp;13&amp;y=4\\end{alignat}103​x+x+​313​y=2y=4​​`\begin{alignat}{2}`
   `10&x+ &3&y = 2 \\`
   `3&x+&13&y = 4`
`\end{alignat}`

{alignat\*}10x+3y=23x+13y=4\\begin{alignat\*}{2}10&amp;x+&amp;3&amp;y=2\\\\3&amp;x+&amp;13&amp;y=4\\end{alignat\*}103​x+x+​313​y=2y=4​`\begin{alignat*}{2}`
   `10&x+ &3&y = 2 \\`
   `3&x+&13&y = 4`
`\end{alignat*}`

{alignedat}10x+3y=23x+13y=4\\begin{alignedat}{2}10&amp;x+&amp;3&amp;y=2\\\\3&amp;x+&amp;13&amp;y=4\\end{alignedat}103​x+x+​313​y=2y=4​`\begin{alignedat}{2}`
   `10&x+ &3&y = 2 \\`
   `3&x+&13&y = 4`
`\end{alignedat}`

\\allowbreak

\\AlphaA\\AlphaA

\\alphaα\\alphaα

\\amalg⨿\\amalg⨿

\\And&amp;\\And&amp;

\\andNot supported[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)

\\angNot supported[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)

\\anglana\_{\\angl n}an​​

\\anglnana\_\\anglnan​​

\\angle∠\\angle∠

\\approx≈\\approx≈

\\approxeq≊\\approxeq≊

\\approxcolon≈:\\approxcolon≈:

\\approxcoloncolon≈∷\\approxcoloncolon≈::

\\arccosarccos⁡\\arccosarccos

\\arcctgarcctg⁡\\arcctgarcctg

\\arcsinarcsin⁡\\arcsinarcsin

\\arctanarctan⁡\\arctanarctan

\\arctgarctg⁡\\arctgarctg

\\argarg⁡\\argarg

\\argmaxarg max⁡\\argmaxargmax

\\argminarg min⁡\\argminargmin

{array}abcd\\begin{array}{cc}a&amp;b\\\\c&amp;d\\end{array}ac​bd​`\begin{array}{cc}`
   `a & b \\`
   `c & d`
`\end{array}`

\\arrayNot supportedsee `{array}`

\\arraystretchabcd\\def\\arraystretch{1.5}\\begin{array}{cc}a&amp;b\\\\c&amp;d\\end{array}ac​bd​`\def\arraystretch{1.5}`
`\begin{array}{cc}`
   `a & b \\`
   `c & d`
`\end{array}`

\\ArrowvertNot supportedsee `\Vert`

\\arrowvertNot supportedsee `\vert`

\\ast∗\\ast∗

\\asymp≍\\asymp≍

\\atopab{a \\atop b}ba​`{a \atop b}`

\\atopwithdelimsNot supported

## B

Symbol/FunctionRenderedSource or Comment

\\backepsilon∍\\backepsilon∍

\\backprime‵\\backprime‵

\\backsim∽\\backsim∽

\\backsimeq⋍\\backsimeq⋍

\\backslash\\\\backslash\\

\\baryˉ\\bar{y}yˉ​`\bar{y}`

\\barwedge⊼\\barwedge⊼

\\BbbABC\\Bbb{ABC}ABC`\Bbb{ABC}`
KaTeX supports A-Z &amp; k

\\Bbbkk\\Bbbkk

\\bboxNot supported

\\bcancel5\\bcancel{5}5​`\bcancel{5}`

\\because∵\\because∵

\\beginabcd\\begin{matrix} a &amp; b\\\\ c &amp; d\\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \\`
   `c & d`
`\end{matrix}`

\\begingroup$\\begingroup a}$`\begingroup a}`

\\BetaB\\BetaB

\\betaβ\\betaβ

\\bethℶ\\bethℶ

\\between≬\\between≬

\\bfAaBb12\\bf AaBb12AaBb12`\bf AaBb12`

\\bfseriesNot supported

\\big()\\big(\\big)()`\big(\big)`

\\Big()\\Big(\\Big)()`\Big(\Big)`

\\bigcap⋂\\bigcap⋂

\\bigcirc◯\\bigcirc◯

\\bigcup⋃\\bigcup⋃

\\bigg()\\bigg(\\bigg)()`\bigg(\bigg)`

\\Bigg()\\Bigg(\\Bigg)()`\Bigg(\Bigg)`

\\biggl(\\biggl((`\biggl(`

\\Biggl(\\Biggl((`\Biggl(`

\\biggm∣\\biggm\\vert​`\biggm\vert`

\\Biggm∣\\Biggm\\vert​`\Biggm\vert`

\\biggr)\\biggr))`\biggr)`

\\Biggr)\\Biggr))`\Biggr)`

\\bigl(\\bigl((`\bigl(`

\\Bigl(\\Bigl((`\Bigl(`

\\bigm∣\\bigm\\vert​`\bigm\vert`

\\Bigm∣\\Bigm\\vert​`\Bigm\vert`

\\bigodot⨀\\bigodot⨀

\\bigominusNot supported[Issue #1222](https://github.com/KaTeX/KaTeX/issues/1222)

\\bigoplus⨁\\bigoplus⨁

\\bigoslashNot supported[Issue #1222](https://github.com/KaTeX/KaTeX/issues/1222)

\\bigotimes⨂\\bigotimes⨂

\\bigr)\\bigr))`\bigr)`

\\Bigr)\\Bigr))`\Bigr)`

\\bigsqcapNot supported[Issue #1222](https://github.com/KaTeX/KaTeX/issues/1222)

\\bigsqcup⨆\\bigsqcup⨆

\\bigstar★\\bigstar★

\\bigtriangledown▽\\bigtriangledown▽

\\bigtriangleup△\\bigtriangleup△

\\biguplus⨄\\biguplus⨄

\\bigvee⋁\\bigvee⋁

\\bigwedge⋀\\bigwedge⋀

\\binom(nk)\\binom n k(kn​)`\binom n k`

\\blacklozenge⧫\\blacklozenge⧫

\\blacksquare■\\blacksquare■

\\blacktriangle▲\\blacktriangle▲

\\blacktriangledown▼\\blacktriangledown▼

\\blacktriangleleft◀\\blacktriangleleft◀

\\blacktriangleright▶\\blacktriangleright▶

\\bmAaBb\\bm{AaBb}AaBb`\bm{AaBb}`

{Bmatrix}{abcd}\\begin{Bmatrix}a&amp;b\\\\c&amp;d\\end{Bmatrix}{ac​bd​}`\begin{Bmatrix}`
   `a & b \\`
   `c & d`
`\end{Bmatrix}`

{Bmatrix\*}{0−1−10}\\begin{Bmatrix\*}\[r]0&amp;-1\\\\-1&amp;0\\end{Bmatrix\*}{0−1​−10​}`\begin{Bmatrix*}[r]`
   `0 & -1 \\`
   `-1 & 0`
`\end{Bmatrix*}`

{bmatrix}\[abcd]\\begin{bmatrix}a&amp;b\\\\c&amp;d\\end{bmatrix}\[ac​bd​]`\begin{bmatrix}`
   `a & b \\`
   `c & d`
`\end{bmatrix}`

{bmatrix\*}\[0−1−10]\\begin{bmatrix\*}\[r]0&amp;-1\\\\-1&amp;0\\end{bmatrix\*}\[0−1​−10​]`\begin{bmatrix*}[r]`
   `0 & -1 \\`
   `-1 & 0`
`\end{bmatrix*}`

\\bmoda mod ba \\bmod bamodb`a \bmod b`

\\boldAaBb123\\bold{AaBb123}AaBb123`\bold{AaBb123}`

\\boldsymbolAaBb\\boldsymbol{AaBb}AaBb`\boldsymbol{AaBb}`

\\bot⊥\\bot⊥

\\bowtie⋈\\bowtie⋈

\\Box□\\Box□

\\boxdot⊡\\boxdot⊡

\\boxedab\\boxed{ab}ab​`\boxed{ab}`

\\boxminus⊟\\boxminus⊟

\\boxplus⊞\\boxplus⊞

\\boxtimes⊠\\boxtimes⊠

\\Bra⟨ψ∣\\Bra{\\psi}⟨ψ∣`\Bra{\psi}`

\\bra⟨ψ∣\\bra{\\psi}⟨ψ∣`\bra{\psi}`

\\braket⟨ϕ∣ψ⟩\\braket{\\phi\\VERT\\psi}⟨ϕ∣ψ⟩`\braket{\phi|\psi}`

\\Braket⟨ϕ | ∂2∂t2 | ψ⟩\\Braket{ ϕ \\VERT \\frac{∂^2}{∂ t^2} \\VERT ψ }⟨ϕ​∂t2∂2​​ψ⟩`\Braket{ ϕ | \frac{∂^2}{∂ t^2} | ψ }`

\\brace{nk}{n\\brace k}{kn​}`{n\brace k}`

\\bracevertNot supported

\\brack\[nk]{n\\brack k}\[kn​]`{n\brack k}`

\\breveeu˘\\breve{eu}eu˘`\breve{eu}`

\\buildrelNot supported

\\bull∙\\bull∙

\\bullet∙\\bullet∙

\\Bumpeq≎\\Bumpeq≎

\\bumpeq≏\\bumpeq≏

## C

Symbol/FunctionRenderedSource or Comment

\\CNot supported[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)

\\calAaBb123\\cal AaBb123AaBb123`\cal AaBb123`

\\cancel5\\cancel{5}5​`\cancel{5}`

\\canceltoNot supported

\\Cap⋒\\Cap⋒

\\cap∩\\cap∩

{cases}{aif bcif d\\begin{cases}a&amp;\\text{if }b\\\\c&amp;\\text{if }d\\end{cases}{ac​if bif d​`\begin{cases}`
   `a &\text{if } b \\`
   `c &\text{if } d`
`\end{cases}`

\\casesNot supportedsee `{cases}`

{CD}A→aBb↓↑cC=D\\begin{CD}A @&gt;a&gt;&gt; B \\\\@VbVV @AAcA\\\\C @= D\\end{CD}Ab↓⏐​C​a​​B⏐↑​cD​`\begin{CD}`
   `A @>a>> B \\`
`@VbVV @AAcA \\`
   `C @= D`
`\end{CD}`

\\cdot⋅\\cdot⋅

\\cdotp⋅\\cdotp⋅

\\cdots⋯\\cdots⋯

\\ceCX6HX5−CHO{\\mathrm{C}{\\vphantom{X}}\_{\\smash\[t]{6}}\\mathrm{H}{\\vphantom{X}}\_{\\smash\[t]{5}}{-}\\mathrm{CHO}}CX6​HX5​−CHO`\ce{C6H5-CHO}` Requires an [extension](https://github.com/KaTeX/KaTeX/tree/main/contrib/mhchem/)

\\ceeNot supportedDeprecated by mhchem

\\centerdota⋅ba\\centerdot ba⋅b`a\centerdot b`

\\cfNot supportedDeprecated by mhchem;

use `\ce` instead

\\cfrac21+21+21\\cfrac{2}{1+\\cfrac{2}{1+\\cfrac{2}{1}}}1+1+12​2​2​`\cfrac{2}{1+\cfrac{2}{1+\cfrac{2}{1}}}`

\\char☺\\char"263a☺`\char"263a`

\\checkoeˇ\\check{oe}oeˇ`\check{oe}`

\\chch⁡\\chch

\\checkmark✓\\checkmark✓

\\ChiX\\ChiX

\\chiχ\\chiχ

\\choose(n+1k+2){n+1 \\choose k+2}(k+2n+1​)`{n+1 \choose k+2}`

\\circ∘\\circ∘

\\circeq≗\\circeq≗

\\circlearrowleft↺\\circlearrowleft↺

\\circlearrowright↻\\circlearrowright↻

\\circledast⊛\\circledast⊛

\\circledcirc⊚\\circledcirc⊚

\\circleddash⊝\\circleddash⊝

\\circledR®\\circledR®

\\circledSⓈ\\circledSⓈ

\\classNot supportedA PR is pending.

\\clineNot supported[Issue #269](https://github.com/KaTeX/KaTeX/issues/269)

\\clubs♣\\clubs♣

\\clubsuit♣\\clubsuit♣

\\cnumsC\\cnumsC

\\colon ⁣:\\colon:

\\Colonapprox∷≈\\Colonapprox::≈

\\colonapprox:≈\\colonapprox:≈

\\coloncolon∷\\coloncolon::

\\coloncolonapprox∷≈\\coloncolonapprox::≈

\\coloncolonequals∷=\\coloncolonequals::=

\\coloncolonminus∷−\\coloncolonminus::−

\\coloncolonsim∷∼\\coloncolonsim::∼

\\Coloneq∷−\\Coloneq::−

\\coloneq:−\\coloneq:−

\\colonequals≔\\colonequals:=

\\Coloneqq∷=\\Coloneqq::=

\\coloneqq≔\\coloneqq:=

\\colonminus:−\\colonminus:−

\\Colonsim∷∼\\Colonsim::∼

\\colonsim:∼\\colonsim:∼

\\colorAaBb123\\color{#0000FF} AaBb123AaBb123`\color{#0000FF} AaBb123`

\\colorboxBlack on red\\colorbox{red}{Black on red}Black on red​`\colorbox{red}{Black on red}`

\\complement∁\\complement∁

\\ComplexC\\ComplexC

\\cong≅\\cong≅

\\CoppaNot supported

\\coppaNot supported

\\coprod∐\\coprod∐

\\copyright©\\copyrightc◯

\\coscos⁡\\coscos

\\coseccosec⁡\\coseccosec

\\coshcosh⁡\\coshcosh

\\cotcot⁡\\cotcot

\\cotgcotg⁡\\cotgcotg

\\cothcoth⁡\\cothcoth

\\crabcd\\begin{matrix} a &amp; b\\cr c &amp; d \\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \cr`
   `c & d`
`\end{matrix}`

\\csccsc⁡\\csccsc

\\cssIdNot supportedA PR is pending.

\\ctgctg⁡\\ctgctg

\\cthcth⁡\\cthcth

\\Cup⋓\\Cup⋓

\\cup∪\\cup∪

\\curlyeqprec⋞\\curlyeqprec⋞

\\curlyeqsucc⋟\\curlyeqsucc⋟

\\curlyvee⋎\\curlyvee⋎

\\curlywedge⋏\\curlywedge⋏

\\curvearrowleft↶\\curvearrowleft↶

\\curvearrowright↷\\curvearrowright↷

## D

Symbol/FunctionRenderedSource or Comment

\\dag†\\dag†

\\Dagger‡\\Dagger‡

\\dagger†\\dagger†

\\dalethℸ\\dalethℸ

\\Darr⇓\\Darr⇓

\\dArr⇓\\dArr⇓

\\darr↓\\darr↓

{darray}abcd\\begin{darray}{cc}a&amp;b\\\\c&amp;d\\end{darray}ac​bd​`\begin{darray}{cc}`
   `a & b \\`
   `c & d`
`\end{darray}`

\\dashleftarrow⇠\\dashleftarrow⇠

\\dashrightarrow⇢\\dashrightarrow⇢

\\dashv⊣\\dashv⊣

\\dbinom(nk)\\dbinom n k(kn​)`\dbinom n k`

\\dblcolon∷\\dblcolon::

{dcases}{aif bcif d\\begin{dcases}a&amp;\\text{if }b\\\\c&amp;\\text{if }d\\end{dcases}{ac​if bif d​`\begin{dcases}`
   `a &\text{if } b \\`
   `c &\text{if } d`
`\end{dcases}`

\\ddag‡\\ddag‡

\\ddagger‡\\ddagger‡

\\ddddotx....\\ddddot xx....​`\ddddot x`

\\dddotx...\\dddot xx...​`\dddot x`

\\ddotx¨\\ddot xx¨`\ddot x`

\\ddots⋱\\ddots⋱

\\DeclareMathOperatorNot supported

\\defx2+x2\\def\\foo{x^2} \\foo + \\foox2+x2`\def\foo{x^2} \foo + \foo`

\\definecolorNot supported[Issue #750](https://github.com/KaTeX/KaTeX/issues/750)

\\degdeg⁡\\degdeg

\\degree°\\degree°

\\deltaδ\\deltaδ

\\DeltaΔ\\DeltaΔ

\\detdet⁡\\detdet

\\DigammaNot supported

\\digammaϝ\\digammaϝ

\\dfraca−1b−1\\dfrac{a-1}{b-1}b−1a−1​`\dfrac{a-1}{b-1}`

\\diagdown╲\\diagdown╲

\\diagup╱\\diagup╱

\\Diamond◊\\Diamond◊

\\diamond⋄\\diamond⋄

\\diamonds♢\\diamonds♢

\\diamondsuit♢\\diamondsuit♢

\\dimdim⁡\\dimdim

\\displaylinesNot supported

\\displaystyle∑0n\\displaystyle\\sum\_0^n0∑n​`\displaystyle\sum_0^n`

\\div÷\\div÷

\\divideontimes⋇\\divideontimes⋇

\\dotx˙\\dot xx˙`\dot x`

\\Doteq≑\\Doteq≑

\\doteq≐\\doteq≐

\\doteqdot≑\\doteqdot≑

\\dotplus∔\\dotplus∔

\\dotsx1+⋯+xnx\_1 + \\dots + x\_nx1​+⋯+xn​`x_1 + \dots + x_n`

\\dotsbx1+⋯+xnx\_1 +\\dotsb + x\_nx1​+⋯+xn​`x_1 +\dotsb + x_n`

\\dotscx,…,yx,\\dotsc,yx,…,y`x,\dotsc,y`

\\dotsi∫A1∫A2 ⁣⋯\\int\_{A\_1}\\int\_{A\_2}\\dotsi∫A1​​∫A2​​⋯`\int_{A_1}\int_{A_2}\dotsi`

\\dotsmx1x2⋯xnx\_1 x\_2 \\dotsm x\_nx1​x2​⋯xn​`$x_1 x_2 \dotsm x_n`

\\dotso…\\dotso…

\\doublebarwedge⩞\\doublebarwedge⩞

\\doublecap⋒\\doublecap⋒

\\doublecup⋓\\doublecup⋓

\\Downarrow⇓\\Downarrow⇓

\\downarrow↓\\downarrow↓

\\downdownarrows⇊\\downdownarrows⇊

\\downharpoonleft⇃\\downharpoonleft⇃

\\downharpoonright⇂\\downharpoonright⇂

{drcases}aif bcif d}\\begin{drcases}a&amp;\\text{if }b\\\\c&amp;\\text{if }d\\end{drcases}ac​if bif d​}`\begin{drcases}`
   `a &\text{if } b \\`
   `c &\text{if } d`
`\end{drcases}`

## E

Symbol/FunctionRenderedSource or Comment

\\edefa\\def\\foo{a}\\edef\\fcopy{\\foo}\\def\\foo{}\\fcopya`\def\foo{a}\edef\fcopy{\foo}\def\foo{}\fcopy`

\\ellℓ\\ellℓ

\\elseNot supported[Issue #1003](https://github.com/KaTeX/KaTeX/issues/1003)

\\emNot supported

\\emphnested emphasis\\emph{nested \\emph{emphasis}}nested emphasis`\emph{nested \emph{emphasis}}`

\\empty∅\\empty∅

\\emptyset∅\\emptyset∅

\\encloseNot supportedNon standard

\\endabcd\\begin{matrix} a &amp; b\\\\ c &amp; d\\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \\`
   `c & d`
`\end{matrix}`

\\endgroup${a\\endgroup$`{a\endgroup`

\\enspaceaba\\enspace bab`a\enspace b`

\\EpsilonE\\EpsilonE

\\epsilonϵ\\epsilonϵ

\\eqalignNot supported

\\eqalignnoNot supported

\\eqcirc≖\\eqcirc≖

\\Eqcolon−∷\\Eqcolon−::

\\eqcolon∹\\eqcolon−:

{equation}a=b+c\\begin{equation}a = b + c\\end{equation}a=b+c​​`\begin{equation}`
   `a = b + c`
`\end{equation}`

{equation\*}a=b+c\\begin{equation\*}a = b + c\\end{equation\*}a=b+c​`\begin{equation*}`
   `a = b + c`
`\end{equation*}`

{eqnarray}Not supported

\\Eqqcolon=∷\\Eqqcolon=::

\\eqqcolon≕\\eqqcolon=:

\\eqrefNot supported[Issue #350](https://github.com/KaTeX/KaTeX/issues/350)

\\eqsim≂\\eqsim≂

\\eqslantgtr⪖\\eqslantgtr⪖

\\eqslantless⪕\\eqslantless⪕

\\equalscolon≕\\equalscolon=:

\\equalscoloncolon=∷\\equalscoloncolon=::

\\equiv≡\\equiv≡

\\EtaH\\EtaH

\\etaη\\etaη

\\ethð\\ethð

\\euroNot supported

\\exist∃\\exist∃

\\exists∃\\exists∃

\\expexp⁡\\expexp

\\expandafter

## F

| Symbol/Function | Rendered                                            | Source or Comment                                         |
|-----------------|-----------------------------------------------------|-----------------------------------------------------------|
| \\fallingdotseq | ≒\\fallingdotseq≒                                   |                                                           |
| \\fbox          | Hi there!\\fbox{Hi there!}Hi there!​                | `\fbox{Hi there!}`                                        |
| \\fcolorbox     | A\\fcolorbox{red}{aqua}{A}A​                        | `\fcolorbox{red}{aqua}{A}`                                |
| \\fi            | Not supported                                       | [Issue #1003](https://github.com/KaTeX/KaTeX/issues/1003) |
| \\Finv          | Ⅎ\\FinvℲ                                            |                                                           |
| \\flat          | ♭\\flat♭                                            |                                                           |
| \\footnotesize  | footnotesize\\footnotesize footnotesizefootnotesize | `\footnotesize footnotesize`                              |
| \\forall        | ∀\\forall∀                                          |                                                           |
| \\frac          | ab\\frac a bba​                                     | `\frac a b`                                               |
| \\frak          | AaBb\\frak{AaBb}AaBb                                | `\frak{AaBb}`                                             |
| \\frown         | ⌢\\frown⌢                                           |                                                           |
| \\futurelet     |                                                     |                                                           |

## G

Symbol/FunctionRenderedSource or Comment

\\Game⅁\\Game⅁

\\GammaΓ\\GammaΓ

\\gammaγ\\gammaγ

{gather}a=be=b+c\\begin{gather}a=b\\\\e=b+c\\end{gather}a=be=b+c​​`\begin{gather}`
   `a=b \\`
   `e=b+c`
`\end{gather}`

{gathered}a=be=b+c\\begin{gathered}a=b\\\\e=b+c\\end{gathered}a=be=b+c​`\begin{gathered}`
   `a=b \\`
   `e=b+c`
`\end{gathered}`

\\gcdgcd⁡\\gcdgcd

\\gdefy2+y2\\gdef\\sqr#1{#1^2} \\sqr{y} + \\sqr{y}y2+y2`\gdef\sqr#1{#1^2} \sqr{y} + \sqr{y}`

\\ge≥\\ge≥

\\geneuroNot supported

\\geneuronarrowNot supported

\\geneurowideNot supported

\\genfrac(aa+1]\\genfrac ( ] {2pt}{0}a{a+1}(a+1a​]`\genfrac ( ] {2pt}{0}a{a+1}`

\\geq≥\\geq≥

\\geqq≧\\geqq≧

\\geqslant⩾\\geqslant⩾

\\gets←\\gets←

\\gg≫\\gg≫

\\ggg⋙\\ggg⋙

\\gggtr⋙\\gggtr⋙

\\gimelℷ\\gimelℷ

\\global2+3\\global\\def\\add#1#2{#1+#2} \\add 2 32+3`\global\def\add#1#2{#1+#2} \add 2 3`

\\gnapprox⪊\\gnapprox⪊

\\gneq⪈\\gneq⪈

\\gneqq≩\\gneqq≩

\\gnsim⋧\\gnsim⋧

\\graveeuˋ\\grave{eu}euˋ`\grave{eu}`

\\gta&gt;ba \\gt ba&gt;b`a \gt b`

\\gtrdot⋗\\gtrdot⋗

\\gtrapprox⪆\\gtrapprox⪆

\\gtreqless⋛\\gtreqless⋛

\\gtreqqless⪌\\gtreqqless⪌

\\gtrless≷\\gtrless≷

\\gtrsim≳\\gtrsim≳

\\gvertneqq≩\\gvertneqq

## H

Symbol/FunctionRenderedSource or Comment

\\Ha˝\\text{\\H{a}}a˝`\text{\H{a}}`

\\Harr⇔\\Harr⇔

\\hArr⇔\\hArr⇔

\\harr↔\\harr↔

\\hatθ^\\hat{\\theta}θ^`\hat{\theta}`

\\hbarℏ\\hbarℏ

\\hboxx2\\hbox{$x^2$}x2`\hbox{$x^2$}`

\\hbox to Not supported

\\hdashlineabcd\\begin{matrix}a&amp;b\\\\ \\hdashline c &amp;d\\end{matrix}ac​bd​​`\begin{matrix}`
   `a & b \\`
   `\hdashline`
   `c & d`
`\end{matrix}`

\\hearts♡\\hearts♡

\\heartsuit♡\\heartsuit♡

\\hfilNot supported

\\hfillNot supportedIssues [#164](https://github.com/KaTeX/KaTeX/issues/164) &amp; [#269](https://github.com/KaTeX/KaTeX/issues/269)

\\hlineabcd\\begin{matrix}a&amp;b\\\\ \\hline c &amp;d\\end{matrix}ac​bd​​`\begin{matrix}`
   `a & b \\ \hline`
   `c & d`
`\end{matrix}`

\\homhom⁡\\homhom

\\hookleftarrow↩\\hookleftarrow↩

\\hookrightarrow↪\\hookrightarrow↪

\\hphantomabcda\\hphantom{bc}dabcd`a\hphantom{bc}d`

\\hrefKaTeX\\href{https://katex.org/}{\\KaTeX}[KATE​X](https://katex.org/)`\href{https://katex.org/}{\KaTeX}` Requires `trust` [option](/docs/options)

\\hskipwidw\\hskip1em i\\hskip2em dwid`w\hskip1em i\hskip2em d`

\\hslashℏ\\hslashℏ

\\hspaces\\hspace7ex k`s\hspace7ex k`

\\htmlClassx\\htmlClass{foo}{x}x`\htmlClass{foo}{x}` Must enable `trust` and disable `strict` [option](/docs/options)

\\htmlDatax\\htmlData{foo=a, bar=b}{x}x`\htmlData{foo=a, bar=b}{x}` Must enable `trust` and disable `strict` [option](/docs/options)

\\htmlIdx\\htmlId{bar}{x}x`\htmlId{bar}{x}` Must enable `trust` and disable `strict` [option](/docs/options)

\\htmlStylex\\htmlStyle{color: red;}{x}x`\htmlStyle{color: red;}{x}` Must enable `trust` and disable `strict` [option](/docs/options)

\\hugehuge\\huge hugehuge`\huge huge`

\\HugeHuge\\Huge HugeHuge`\Huge Huge`

## I

| Symbol/Function   | Rendered                                                                                                                                                                                                                                        | Source or Comment                                                                                                                                                                                  |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \\i               | ı\\text{\\i}ı                                                                                                                                                                                                                                   | `\text{\i}`                                                                                                                                                                                        |
| \\idotsint        | Not supported                                                                                                                                                                                                                                   |                                                                                                                                                                                                    |
| \\iddots          | Not supported                                                                                                                                                                                                                                   | [Issue #1223](https://github.com/KaTeX/KaTeX/issues/1223)                                                                                                                                          |
| \\if              | Not supported                                                                                                                                                                                                                                   | [Issue #1003](https://github.com/KaTeX/KaTeX/issues/1003)                                                                                                                                          |
| \\iff             | A  ⟺  BA\\iff BA⟺B                                                                                                                                                                                                                              | `A\iff B`                                                                                                                                                                                          |
| \\ifmode          | Not supported                                                                                                                                                                                                                                   | [Issue #1003](https://github.com/KaTeX/KaTeX/issues/1003)                                                                                                                                          |
| \\ifx             | Not supported                                                                                                                                                                                                                                   | [Issue #1003](https://github.com/KaTeX/KaTeX/issues/1003)                                                                                                                                          |
| \\iiiint          | Not supported                                                                                                                                                                                                                                   |                                                                                                                                                                                                    |
| \\iiint           | ∭\\iiint∭                                                                                                                                                                                                                                       |                                                                                                                                                                                                    |
| \\iint            | ∬\\iint∬                                                                                                                                                                                                                                        |                                                                                                                                                                                                    |
| \\Im              | ℑ\\Imℑ                                                                                                                                                                                                                                          |                                                                                                                                                                                                    |
| \\image           | ℑ\\imageℑ                                                                                                                                                                                                                                       |                                                                                                                                                                                                    |
| \\imageof         | ⊷\\imageof⊷                                                                                                                                                                                                                                     |                                                                                                                                                                                                    |
| \\imath           | ı\\imath                                                                                                                                                                                                                                       |                                                                                                                                                                                                    |
| \\impliedby       | P  ⟸  QP\\impliedby QP⟸Q                                                                                                                                                                                                                        | `P\impliedby Q`                                                                                                                                                                                    |
| \\implies         | P  ⟹  QP\\implies QP⟹Q                                                                                                                                                                                                                          | `P\implies Q`                                                                                                                                                                                      |
| \\in              | ∈\\in∈                                                                                                                                                                                                                                          |                                                                                                                                                                                                    |
| \\includegraphics | \\includegraphics\[height=0.8em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png}![KA logo](https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png) | `\includegraphics[height=0.8em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png}` Requires `trust` [option](/docs/options) |
| \\inf             | inf⁡\\infinf                                                                                                                                                                                                                                    |                                                                                                                                                                                                    |
| \\infin           | ∞\\infin∞                                                                                                                                                                                                                                       |                                                                                                                                                                                                    |
| \\infty           | ∞\\infty∞                                                                                                                                                                                                                                       |                                                                                                                                                                                                    |
| \\injlim          | inj lim⁡\\injliminjlim                                                                                                                                                                                                                          | `\injlim`                                                                                                                                                                                          |
| \\int             | ∫\\int∫                                                                                                                                                                                                                                         |                                                                                                                                                                                                    |
| \\intercal        | ⊺\\intercal⊺                                                                                                                                                                                                                                    |                                                                                                                                                                                                    |
| \\intop           | ∫\\intop∫                                                                                                                                                                                                                                       |                                                                                                                                                                                                    |
| \\Iota            | I\\IotaI                                                                                                                                                                                                                                        |                                                                                                                                                                                                    |
| \\iota            | ι\\iotaι                                                                                                                                                                                                                                        |                                                                                                                                                                                                    |
| \\isin            | ∈\\isin∈                                                                                                                                                                                                                                        |                                                                                                                                                                                                    |
| \\it              | AaBb{\\it AaBb}AaBb                                                                                                                                                                                                                             | `{\it AaBb}`                                                                                                                                                                                       |
| \\itshape         | Not supported                                                                                                                                                                                                                                   |                                                                                                                                                                                                    |

## JK

| Symbol/Function | Rendered            | Source or Comment |
|-----------------|---------------------|-------------------|
| \\j             | ȷ\\text{\\j}ȷ       | `\text{\j}`       |
| \\jmath         | ȷ\\jmath           |                   |
| \\Join          | ⋈\\Join⋈            |                   |
| \\Kappa         | K\\KappaK           |                   |
| \\kappa         | κ\\kappaκ           |                   |
| \\KaTeX         | KaTeX\\KaTeXKATE​X  |                   |
| \\ker           | ker⁡\\kerker        |                   |
| \\kern          | IRI\\kern-2.5pt RIR | `I\kern-2.5pt R`  |
| \\Ket           | ∣ψ⟩\\Ket{\\psi}∣ψ⟩  | `\Ket{\psi}`      |
| \\ket           | ∣ψ⟩\\ket{\\psi}∣ψ⟩  | `\ket{\psi}`      |
| \\Koppa         | Not supported       |                   |
| \\koppa         | Not supported       |                   |

## L

| Symbol/Function       | Rendered                                  | Source or Comment                |
|-----------------------|-------------------------------------------|----------------------------------|
| \\L                   | Not supported                             |                                  |
| \\l                   | Not supported                             |                                  |
| \\Lambda              | Λ\\LambdaΛ                                |                                  |
| \\lambda              | λ\\lambdaλ                                |                                  |
| \\label               | Not supported                             |                                  |
| \\land                | ∧\\land∧                                  |                                  |
| \\lang                | ⟨A⟩\\lang A\\rangle⟨A⟩                    | `\lang A\rangle`                 |
| \\langle              | ⟨A⟩\\langle A\\rangle⟨A⟩                  | `\langle A\rangle`               |
| \\Larr                | ⇐\\Larr⇐                                  |                                  |
| \\lArr                | ⇐\\lArr⇐                                  |                                  |
| \\larr                | ←\\larr←                                  |                                  |
| \\large               | large\\large largelarge                   | `\large large`                   |
| \\Large               | Large\\Large LargeLarge                   | `\Large Large`                   |
| \\LARGE               | LARGE\\LARGE LARGELARGE                   | `\LARGE LARGE`                   |
| \\LaTeX               | LaTeX\\LaTeXLATE​X                        |                                  |
| \\lBrace              | ⦃\\lBrace{[                               |                                  |
| \\lbrace              | {\\lbrace{                                |                                  |
| \\lbrack              | [\\lbrack[                                |                                  |
| \\lceil               | ⌈\\lceil⌈                                 |                                  |
| \\ldotp               | .\\ldotp.                                 |                                  |
| \\ldots               | …\\ldots…                                 |                                  |
| \\le                  | ≤\\le≤                                    |                                  |
| \\leadsto             | ⇝\\leadsto⇝                               |                                  |
| \\left                | {ab\\left\\lbrace \\dfrac ab \\right.{ba​ | `\left\lbrace \dfrac ab \right.` |
| \\leftarrow           | ←\\leftarrow←                             |                                  |
| \\Leftarrow           | ⇐\\Leftarrow⇐                             |                                  |
| \\LeftArrow           | Not supported                             | Non standard                     |
| \\leftarrowtail       | ↢\\leftarrowtail↢                         |                                  |
| \\leftharpoondown     | ↽\\leftharpoondown↽                       |                                  |
| \\leftharpoonup       | ↼\\leftharpoonup↼                         |                                  |
| \\leftleftarrows      | ⇇\\leftleftarrows⇇                        |                                  |
| \\Leftrightarrow      | ⇔\\Leftrightarrow⇔                        |                                  |
| \\leftrightarrow      | ↔\\leftrightarrow↔                        |                                  |
| \\leftrightarrows     | ⇆\\leftrightarrows⇆                       |                                  |
| \\leftrightharpoons   | ⇋\\leftrightharpoons⇋                     |                                  |
| \\leftrightsquigarrow | ↭\\leftrightsquigarrow↭                   |                                  |
| \\leftroot            | Not supported                             |                                  |
| \\leftthreetimes      | ⋋\\leftthreetimes⋋                        |                                  |
| \\leq                 | ≤\\leq≤                                   |                                  |
| \\leqalignno          | Not supported                             |                                  |
| \\leqq                | ≦\\leqq≦                                  |                                  |
| \\leqslant            | ⩽\\leqslant⩽                              |                                  |
| \\lessapprox          | ⪅\\lessapprox⪅                            |                                  |
| \\lessdot             | ⋖\\lessdot⋖                               |                                  |
| \\lesseqgtr           | ⋚\\lesseqgtr⋚                             |                                  |
| \\lesseqqgtr          | ⪋\\lesseqqgtr⪋                            |                                  |
| \\lessgtr             | ≶\\lessgtr≶                               |                                  |
| \\lesssim             | ≲\\lesssim≲                               |                                  |
| \\let                 |                                           |                                  |
| \\lfloor              | ⌊\\lfloor⌊                                |                                  |
| \\lg                  | lg⁡\\lglg                                 |                                  |
| \\lgroup              | ⟮\\lgroup⟮                                |                                  |
| \\lhd                 | ⊲\\lhd⊲                                   |                                  |
| \\lim                 | lim⁡\\limlim                              |                                  |
| \\liminf              | lim inf⁡\\liminfliminf                    |                                  |
| \\limits              | lim⁡x\\lim\\limits\_xxlim​                | `\lim\limits_x`                  |
| \\limsup              | lim sup⁡\\limsuplimsup                    |                                  |
| \\ll                  | ≪\\ll≪                                    |                                  |
| \\llap                | =/ {=}\\llap{/\\,}=/                      | `{=}\llap{/\,}`                  |
| \\llbracket           | ⟦\\llbracket[[                            |                                  |
| \\llcorner            | ⌞\\llcorner└                              |                                  |
| \\Lleftarrow          | ⇚\\Lleftarrow⇚                            |                                  |
| \\lll                 | ⋘\\lll⋘                                   |                                  |
| \\llless              | ⋘\\llless⋘                                |                                  |
| \\lmoustache          | ⎰\\lmoustache⎰                            |                                  |
| \\ln                  | ln⁡\\lnln                                 |                                  |
| \\lnapprox            | ⪉\\lnapprox⪉                              |                                  |
| \\lneq                | ⪇\\lneq⪇                                  |                                  |
| \\lneqq               | ≨\\lneqq≨                                 |                                  |
| \\lnot                | ¬\\lnot¬                                  |                                  |
| \\lnsim               | ⋦\\lnsim⋦                                 |                                  |
| \\log                 | log⁡\\loglog                              |                                  |
| \\long                |                                           |                                  |
| \\Longleftarrow       | ⟸\\Longleftarrow⟸                         |                                  |
| \\longleftarrow       | ⟵\\longleftarrow⟵                         |                                  |
| \\Longleftrightarrow  | ⟺\\Longleftrightarrow⟺                    |                                  |
| \\longleftrightarrow  | ⟷\\longleftrightarrow⟷                    |                                  |
| \\longmapsto          | ⟼\\longmapsto⟼                            |                                  |
| \\Longrightarrow      | ⟹\\Longrightarrow⟹                        |                                  |
| \\longrightarrow      | ⟶\\longrightarrow⟶                        |                                  |
| \\looparrowleft       | ↫\\looparrowleft↫                         |                                  |
| \\looparrowright      | ↬\\looparrowright↬                        |                                  |
| \\lor                 | ∨\\lor∨                                   |                                  |
| \\lower               | Not supported                             |                                  |
| \\lozenge             | ◊\\lozenge◊                               |                                  |
| \\lparen              | (\\lparen(                                |                                  |
| \\Lrarr               | ⇔\\Lrarr⇔                                 |                                  |
| \\lrArr               | ⇔\\lrArr⇔                                 |                                  |
| \\lrarr               | ↔\\lrarr↔                                 |                                  |
| \\lrcorner            | ⌟\\lrcorner┘                              |                                  |
| \\lq                  | ‘\\lq‘                                    |                                  |
| \\Lsh                 | ↰\\Lsh↰                                   |                                  |
| \\lt                  | &lt;\\lt&lt;                              |                                  |
| \\ltimes              | ⋉\\ltimes⋉                                |                                  |
| \\lVert               | ∥\\lVert∥                                 |                                  |
| \\lvert               | ∣\\lvert∣                                 |                                  |
| \\lvertneqq           | ≨\\lvertneqq                             |                                  |

## M

Symbol/FunctionRenderedSource or Comment

\\maltese✠\\maltese✠

\\mapsto↦\\mapsto↦

\\mathbbAB\\mathbb{AB}AB`\mathbb{AB}`
KaTeX supports A-Z k

\\mathbfAaBb123\\mathbf{AaBb123}AaBb123`\mathbf{AaBb123}`

\\mathbina!ba\\mathbin{!}ba!b`a\mathbin{!}b`

\\mathcalAaBb123\\mathcal{AaBb123}AaBb123`\mathcal{AaBb123}`

\\mathchoicea  ba\\mathchoice{\\,}{\\,\\,}{\\,\\,\\,}{\\,\\,\\,\\,}bab`a\mathchoice{\,}{\,\,}{\,\,\,}{\,\,\,\,}b`

\\mathclap∑1≤i≤nxi\\displaystyle\\sum\_{\\mathclap{1\\le i\\le n}} x\_{i}1≤i≤n∑​xi​`\sum_{\mathclap{1\le i\le n}} x_{i}`

\\mathclosea+(b&gt;+ca + (b\\mathclose\\gt + ca+(b&gt;+c`a + (b\mathclose\gt + c`

\\mathellipsis…\\mathellipsis…

\\mathfrakAaBb\\mathfrak{AaBb}AaBb`\mathfrak{AaBb}`
KaTeX supports A-Za-z

\\mathinnerabinsidecdab\\mathinner{\\text{inside}}cdabinsidecd`ab\mathinner{\text{inside}}cd`

\\mathitAaBb\\mathit{AaBb}AaBb`\mathit{AaBb}`
KaTeX supports A-Za-z

\\mathllap=/ {=}\\mathllap{/\\,}=/`{=}\mathllap{/\,}`

\\mathnormalAaBb\\mathnormal{AaBb}AaBb`\mathnormal{AaBb}`
KaTeX supports A-Za-z

\\mathop⋆ab\\mathop{\\star}\_a^b⋆ab​`\mathop{\star}_a^b`

\\mathopena+&lt;b)+ca + \\mathopen\\lt b) + ca+&lt;b)+c`a + \mathopen\lt b) + c`

\\mathord1,234,5671\\mathord{,}234{,}5671,234,567`1\mathord{,}234{,}567`

\\mathpunctA−BA\\mathpunct{-}BA−B`A\mathpunct{-}B`

\\mathrela#ba \\mathrel{\\#} ba#b`a \mathrel{\#} b`

\\mathrlap /=\\mathrlap{\\,/}{=}/=`\mathrlap{\,/}{=}`

\\mathringa˚\\mathring{a}a˚`\mathring{a}`

\\mathrmAaBb123\\mathrm{AaBb123}AaBb123`\mathrm{AaBb123}`

\\mathscrAB\\mathscr{AB}AB`\mathscr{AaBb123}`
KaTeX supports A-Z

\\mathsfAaBb123\\mathsf{AaBb123}AaBb123`\mathsf{AaBb123}`

\\mathsterling£\\mathsterling£

\\mathstrut(a\\sqrt{\\mathstrut a}(a​`\sqrt{\mathstrut a}`

\\mathtipNot supported

\\mathttAaBb123\\mathtt{AaBb123}AaBb123`\mathtt{AaBb123}`

\\matrixNot supportedSee `{matrix}`

{matrix}abcd\\begin{matrix}a&amp;b\\\\c&amp;d\\end{matrix}ac​bd​`\begin{matrix}`
   `a & b \\`
   `c & d`
`\end{matrix}`

{matrix\*}0−1−10\\begin{matrix\*}\[r]0&amp;-1\\\\-1&amp;0\\end{matrix\*}0−1​−10​`\begin{matrix*}[r]`
   `0 & -1 \\`
   `-1 & 0`
`\end{matrix*}`

\\maxmax⁡\\maxmax

\\mboxNot supported

\\mdNot supported

\\mdseriesNot supported

\\measuredangle∡\\measuredangle∡

\\medspacea ba\\medspace bab`a\medspace b`

\\mho℧\\mho℧

\\mid{x∈R∣x&gt;0}\\{x∈ℝ\\mid x&gt;0\\}{x∈R∣x&gt;0}`\{x∈ℝ\mid x>0\}`

\\middleP(A|B)P\\left(A\\middle\\vert B\\right)P(A∣B)`P\left(A\middle\vert B\right)`

\\minmin⁡\\minmin

\\minuscolon∹\\minuscolon−:

\\minuscoloncolon−∷\\minuscoloncolon−::

\\minuso⦵\\minuso∘−

\\mitNot supportedSee `\mathit`

\\mkernaba\\mkern18mu bab`a\mkern18mu b`

\\mmlTokenNot supported

\\mod3≡5mod  23\\equiv 5 \\mod 23≡5mod2`3\equiv 5 \mod 2`

\\models⊨\\models⊨

\\moveleftNot supported

\\moverightNot supported

\\mp∓\\mp∓

\\mskipaba\\mskip{10mu}bab`a\mskip{10mu}b`

\\mspaceNot supported

\\MuM\\MuM

\\muμ\\muμ

\\multicolumnNot supported[Issue #269](https://github.com/KaTeX/KaTeX/issues/269)

{multiline}Not supported

\\multimap⊸\\multimap⊸

## N

Symbol/FunctionRenderedSource or Comment

\\NN\\NN

\\nabla∇\\nabla∇

\\natnumsN\\natnumsN

\\natural♮\\natural♮

\\negmedspacea ⁣ba\\negmedspace bab`a\negmedspace b`

\\ncong≆\\ncong≆

\\ne≠\\ne=

\\nearrow↗\\nearrow↗

\\neg¬\\neg¬

\\negthickspacea ⁣ba\\negthickspace bab`a\negthickspace b`

\\negthinspacea ⁣ba\\negthinspace bab`a\negthinspace b`

\\neq≠\\neq=

\\newcommand✓\\newcommand\\chk{\\checkmark} \\chk✓`\newcommand\chk{\checkmark} \chk`

\\newenvironmentNot supported[Issue #37](https://github.com/KaTeX/KaTeX/issues/37)

\\NewextarrowNot supported

\\newlineaba\\newline bab`a\newline b`

\\nexists∄\\nexists∄

\\ngeq≱\\ngeq≱

\\ngeqq≱\\ngeqq

\\ngeqslant≱\\ngeqslant

\\ngtr≯\\ngtr≯

\\ni∋\\ni∋

\\nleftarrow↚\\nleftarrow↚

\\nLeftarrow⇍\\nLeftarrow⇍

\\nLeftrightarrow⇎\\nLeftrightarrow⇎

\\nleftrightarrow↮\\nleftrightarrow↮

\\nleq≰\\nleq≰

\\nleqq≰\\nleqq

\\nleqslant≰\\nleqslant

\\nless≮\\nless≮

\\nmid∤\\nmid∤

\\nobreak

\\nobreakspacea ba\\nobreakspace ba b`a\nobreakspace b`

\\noexpand

\\nolimitslim⁡x\\lim\\nolimits\_xlimx​`\lim\nolimits_x`

\\nonumbera=b+cd+e=f\\begin{align}a&amp;=b+c\\nonumber\\\\d+e&amp;=f\\end{align}ad+e​=b+c=f​​`\begin{align}`
   `a&=b+c \nonumber\\`
   `d+e&=f`
`\end{align}`

\\normalfontNot supported

\\normalsizenormalsize\\normalsize normalsizenormalsize`\normalsize normalsize`

\\not≠\\not ==`\not =`

\\notaga=b+cd+e=f\\begin{align}a&amp;=b+c\\notag\\\\d+e&amp;=f\\end{align}ad+e​=b+c=f​​`\begin{align}`
   `a&=b+c \notag\\`
   `d+e&=f`
`\end{align}`

\\notin∉\\notin∈/

\\notni∌\\notni∋

\\nparallel∦\\nparallel∦

\\nprec⊀\\nprec⊀

\\npreceq⋠\\npreceq⋠

\\nRightarrow⇏\\nRightarrow⇏

\\nrightarrow↛\\nrightarrow↛

\\nshortmid∤\\nshortmid

\\nshortparallel∦\\nshortparallel

\\nsim≁\\nsim≁

\\nsubseteq⊈\\nsubseteq⊈

\\nsubseteqq⊈\\nsubseteqq

\\nsucc⊁\\nsucc⊁

\\nsucceq⋡\\nsucceq⋡

\\nsupseteq⊉\\nsupseteq⊉

\\nsupseteqq⊉\\nsupseteqq

\\ntriangleleft⋪\\ntriangleleft⋪

\\ntrianglelefteq⋬\\ntrianglelefteq⋬

\\ntriangleright⋫\\ntriangleright⋫

\\ntrianglerighteq⋭\\ntrianglerighteq⋭

\\NuN\\NuN

\\nuν\\nuν

\\nVDash⊯\\nVDash⊯

\\nVdash⊮\\nVdash⊮

\\nvDash⊭\\nvDash⊭

\\nvdash⊬\\nvdash⊬

\\nwarrow↖\\nwarrow↖

## O

| Symbol/Function          | Rendered                                                            | Source or Comment                          |
|--------------------------|---------------------------------------------------------------------|--------------------------------------------|
| \\O                      | Ø\\text{\\O}Ø                                                       | `\text{\O}`                                |
| \\o                      | ø\\text{\\o}ø                                                       | `\text{\o}`                                |
| \\odot                   | ⊙\\odot⊙                                                            |                                            |
| \\OE                     | Œ\\text{\\OE}Œ                                                      | `\text{\OE}`                               |
| \\oe                     | œ\\text{\\oe}œ                                                      | `\text{\oe}`                               |
| \\officialeuro           | Not supported                                                       |                                            |
| \\oiiint                 | ∰\\oiiint∭​                                                         |                                            |
| \\oiint                  | ∯\\oiint∬​                                                          |                                            |
| \\oint                   | ∮\\oint∮                                                            |                                            |
| \\oldstyle               | Not supported                                                       |                                            |
| \\omega                  | ω\\omegaω                                                           |                                            |
| \\Omega                  | Ω\\OmegaΩ                                                           |                                            |
| \\Omicron                | O\\OmicronO                                                         |                                            |
| \\omicron                | ο\\omicronο                                                         |                                            |
| \\ominus                 | ⊖\\ominus⊖                                                          |                                            |
| \\operatorname           | asin⁡x\\operatorname{asin} xasinx                                   | `\operatorname{asin} x`                    |
| \\operatorname*          | asin⁡yx\\operatorname\*{asin}\\limits\_y xyasin​x                   | `\operatorname*{asin}\limits_y x`          |
| \\operatornamewithlimits | asin⁡yx\\operatornamewithlimits{asin}\\limits\_y xyasin​x           | `\operatornamewithlimits{asin}\limits_y x` |
| \\oplus                  | ⊕\\oplus⊕                                                           |                                            |
| \\or                     | Not supported                                                       |                                            |
| \\origof                 | ⊶\\origof⊶                                                          |                                            |
| \\oslash                 | ⊘\\oslash⊘                                                          |                                            |
| \\otimes                 | ⊗\\otimes⊗                                                          |                                            |
| \\over                   | a+1b+2+c{a+1 \\over b+2}+cb+2a+1​+c                                 | `{a+1 \over b+2}+c`                        |
| \\overbrace              | x+⋯+x⏞n times\\overbrace{x+⋯+x}^{n\\text{ times}}x+⋯+x​n times​     | `\overbrace{x+⋯+x}^{n\text{ times}}`       |
| \\overbracket            | Not supported                                                       |                                            |
| \\overgroup              | AB⏠\\overgroup{AB}AB                                                | `\overgroup{AB}`                           |
| \\overleftarrow          | AB←\\overleftarrow{AB}AB                                            | `\overleftarrow{AB}`                       |
| \\overleftharpoon        | AB↼\\overleftharpoon{AB}AB                                          | `\overleftharpoon{AB}`                     |
| \\overleftrightarrow     | AB↔\\overleftrightarrow{AB}AB                                       | `\overleftrightarrow{AB}`                  |
| \\overline               | a long argument‾\\overline{\\text{a long argument}}a long argument​ | `\overline{\text{a long argument}}`        |
| \\overlinesegment        | ABundefined\\overlinesegment{AB}AB                                  | `\overlinesegment{AB}`                     |
| \\overparen              | Not supported                                                       | See `\overgroup`                           |
| \\Overrightarrow         | AB⇒\\Overrightarrow{AB}AB                                           | `\Overrightarrow{AB}`                      |
| \\overrightarrow         | AB→\\overrightarrow{AB}AB                                           | `\overrightarrow{AB}`                      |
| \\overrightharpoon       | ac⇀\\overrightharpoon{ac}ac                                         | `\overrightharpoon{ac}`                    |
| \\overset                | =!\\overset{!}{=}=!                                                 | `\overset{!}{=}`                           |
| \\overwithdelims         | Not supported                                                       |                                            |
| \\owns                   | ∋\\owns∋                                                            |                                            |

## P

Symbol/FunctionRenderedSource or Comment

\\P¶\\text{\\P}¶`\text{\P}`

\\pagecolorNot supported[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)

\\parallel∥\\parallel∥

\\partNot supported[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)

\\partial∂\\partial∂

\\perp⊥\\perp⊥

\\phantomΓijkij\\Gamma^{\\phantom{i}j}\_{i\\phantom{j}k}Γijkij​`\Gamma^{\phantom{i}j}_{i\phantom{j}k}`

\\phase−78∘\\phase{-78^\\circ}−78∘​`\phase{-78^\circ}`

\\PhiΦ\\PhiΦ

\\phiϕ\\phiϕ

\\PiΠ\\PiΠ

\\piπ\\piπ

{picture}Not supported

\\pitchfork⋔\\pitchfork⋔

\\plimplim⁡\\plimplim

\\plusmn±\\plusmn±

\\pm±\\pm±

\\pmatrixNot supportedSee `{pmatrix}`

{pmatrix}(abcd)\\begin{pmatrix}a&amp;b\\\\c&amp;d\\end{pmatrix}(ac​bd​)`\begin{pmatrix}`
   `a & b \\`
   `c & d`
`\end{pmatrix}`

{pmatrix\*}(0−1−10)\\begin{pmatrix\*}\[r]0&amp;-1\\\\-1&amp;0\\end{pmatrix\*}(0−1​−10​)`\begin{pmatrix*}[r]`
   `0 & -1 \\`
   `-1 & 0`
`\end{pmatrix*}`

\\pmbμ\\pmb{\\mu}μ`\pmb{\mu}`

\\pmodx(moda)x\\pmod ax(moda)`x\pmod a`

\\podx(a)x \\pod ax(a)`x \pod a`

\\pounds£\\pounds£

\\PrPr⁡\\PrPr

\\prec≺\\prec≺

\\precapprox⪷\\precapprox⪷

\\preccurlyeq≼\\preccurlyeq≼

\\preceq⪯\\preceq⪯

\\precnapprox⪹\\precnapprox⪹

\\precneqq⪵\\precneqq⪵

\\precnsim⋨\\precnsim⋨

\\precsim≾\\precsim≾

\\prime′\\prime′

\\prod∏\\prod∏

\\projlimproj lim⁡\\projlimprojlim`\projlim`

\\propto∝\\propto∝

\\providecommandHello\\providecommand\\greet{\\text{Hello}} \\greetHello`\providecommand\greet{\text{Hello}} \greet`

\\psiψ\\psiψ

\\PsiΨ\\PsiΨ

\\pu123 kJmol{123~\\mathchoice{\\textstyle\\frac{\\mathrm{kJ}}{\\mathrm{mol}}}{\\frac{\\mathrm{kJ}}{\\mathrm{mol}}}{\\frac{\\mathrm{kJ}}{\\mathrm{mol}}}{\\frac{\\mathrm{kJ}}{\\mathrm{mol}}}}123 molkJ​`\pu{123 kJ//mol}` Requires an [extension](https://github.com/KaTeX/KaTeX/tree/main/contrib/mhchem/)

## QR

Symbol/FunctionRenderedSource or Comment

\\QNot supportedSee `\Bbb{Q}`

\\qquadaba\\qquad\\qquad{b}ab`a\qquad\qquad{b}`

\\quadaba\\quad\\quad{b}ab`a\quad\quad{b}`

\\RR\\RR

\\ra˚\\text{\\r{a}}a˚`\text{\r{a}}`

\\raiseNot supportedsee `\raisebox`

\\raiseboxhigherh\\raisebox{2pt}{ighe}rhigher`h\raisebox{2pt}{$ighe$}r`

\\rang⟨A⟩\\langle A\\rang⟨A⟩`\langle A\rang`

\\rangle⟨A⟩\\langle A\\rangle⟨A⟩`\langle A\rangle`

\\Rarr⇒\\Rarr⇒

\\rArr⇒\\rArr⇒

\\rarr→\\rarr→

\\ratio:\\ratio:

\\rBrace⦄\\rBrace]}

\\rbrace}\\rbrace}

\\rbrack]\\rbrack]

{rcases}aif bcif d}\\begin{rcases}a&amp;\\text{if }b\\\\c&amp;\\text{if }d\\end{rcases}ac​if bif d​}`\begin{rcases}`
   `a &\text{if } b \\`
   `c &\text{if } d`
`\end{rcases}`

\\rceil⌉\\rceil⌉

\\Reℜ\\Reℜ

\\realℜ\\realℜ

\\RealsR\\RealsR

\\realsR\\realsR

\\refNot supported[Issue #350](https://github.com/KaTeX/KaTeX/issues/350)

\\relax

\\renewcommandAhoy!\\def\\hail{Hi!}\\renewcommand\\hail{\\text{Ahoy!}} \\hailAhoy!`\def\hail{Hi!}`
`\renewcommand\hail{\text{Ahoy!}}`
`\hail`

\\renewenvironmentNot supported

\\requireNot supported

\\restriction↾\\restriction↾

\\rfloor⌋\\rfloor⌋

\\rgroup⟯\\rgroup⟯

\\rhd⊳\\rhd⊳

\\RhoP\\RhoP

\\rhoρ\\rhoρ

\\rightab)\\left.\\dfrac a b\\right)ba​)`\left.\dfrac a b\right)`

\\Rightarrow⇒\\Rightarrow⇒

\\rightarrow→\\rightarrow→

\\rightarrowtail↣\\rightarrowtail↣

\\rightharpoondown⇁\\rightharpoondown⇁

\\rightharpoonup⇀\\rightharpoonup⇀

\\rightleftarrows⇄\\rightleftarrows⇄

\\rightleftharpoons⇌\\rightleftharpoons⇌

\\rightrightarrows⇉\\rightrightarrows⇉

\\rightsquigarrow⇝\\rightsquigarrow⇝

\\rightthreetimes⋌\\rightthreetimes⋌

\\risingdotseq≓\\risingdotseq≓

\\rlap /=\\rlap{\\,/}{=}/=`\rlap{\,/}{=}`

\\rmAaBb12\\rm AaBb12AaBb12`\rm AaBb12`

\\rmoustache⎱\\rmoustache⎱

\\rootNot supported

\\rotateboxNot supported[Issue #681](https://github.com/KaTeX/KaTeX/issues/681)

\\rparen)\\rparen)

\\rq′\\rq′

\\rrbracket⟧\\rrbracket]]

\\Rrightarrow⇛\\Rrightarrow⇛

\\Rsh↱\\Rsh↱

\\rtimes⋊\\rtimes⋊

\\RuleNot supportedsee `\rule`

\\rulexxx\\rule\[6pt]{2ex}{1ex}xxx`x\rule[6pt]{2ex}{1ex}x`

\\rVert∥\\rVert∥

\\rvert∣\\rvert∣

## S

Symbol/FunctionRenderedSource or Comment

\\S§\\text{\\S}§`\text{\S}`

\\SampiNot supported

\\sampiNot supported

\\scNot supported[Issue #471](https://github.com/KaTeX/KaTeX/issues/471)

\\scaleboxNot supported

\\scrNot supportedSee `\mathscr`

\\scriptscriptstylecd\\scriptscriptstyle \\frac cddc​`\scriptscriptstyle \frac cd`

\\scriptsizescriptsize\\scriptsize scriptsizescriptsize`\scriptsize scriptsize`

\\scriptstyleab+cd\\frac ab + {\\scriptstyle \\frac cd}ba​+dc​`\frac ab + {\scriptstyle \frac cd}`

\\sdot⋅\\sdot⋅

\\searrow↘\\searrow↘

\\secsec⁡\\secsec

\\sect§\\text{\\sect}§`\text{\sect}`

\\set{ x∣x&lt;5 }\\set{x\\VERT x&lt;5}{x∣x&lt;5}`\set{x|x<5}`

\\Set{ x  |  x&lt;12 }\\Set{ x \\VERT x&lt;\\frac 1 2 }{x​x&lt;21​}`\Set{ x | x<\frac 1 2}`

\\setlengthNot supported[Issue #687](https://github.com/KaTeX/KaTeX/issues/687)

\\setminus∖\\setminus∖

\\sfAaBb123\\sf AaBb123AaBb123`\sf AaBb123`

\\sharp♯\\sharp♯

\\shortmid∣\\shortmid∣

\\shortparallel∥\\shortparallel∥

\\shoveleftNot supported

\\shoverightNot supported

\\sidesetNot supported

\\SigmaΣ\\SigmaΣ

\\sigmaσ\\sigmaσ

\\sim∼\\sim∼

\\simcolon∼:\\simcolon∼:

\\simcoloncolon∼∷\\simcoloncolon∼::

\\simeq≃\\simeq≃

\\sinsin⁡\\sinsin

\\sinhsinh⁡\\sinhsinh

\\sixptsizesixptsize\\sixptsize sixptsizesixptsize`\sixptsize sixptsize`

\\shsh⁡\\shsh

\\skewNot supported

\\skipNot supported

\\slNot supported

\\smallsmall\\small smallsmall`\small small`

\\smallfrown⌢\\smallfrown⌢

\\smallint∫\\smallint∫

{smallmatrix}abcd\\begin{smallmatrix} a &amp; b \\\\ c &amp; d \\end{smallmatrix}ac​bd​`\begin{smallmatrix}`
   `a & b \\`
   `c & d`
`\end{smallmatrix}`

\\smallsetminus∖\\smallsetminus∖

\\smallsmile⌣\\smallsmile⌣

\\smash(x2)\\left(x^{\\smash{2}}\\right)(x2)`\left(x^{\smash{2}}\right)`

\\smile⌣\\smile⌣

\\smileyNot supported

\\soutabc\\sout{abc}abc`\sout{abc}`

\\SpaceNot supportedsee `\space`

\\spacea ba\\space ba b`a\space b`

\\spades♠\\spades♠

\\spadesuit♠\\spadesuit♠

\\sphericalangle∢\\sphericalangle∢

{split}a=b+c=e+f\\begin{equation}\\begin{split}a &amp;=b+c\\\\&amp;=e+f\\end{split}\\end{equation}a​=b+c=e+f​​​`\begin{equation}`
`\begin{split}`
   `a &=b+c\\`
      `&=e+f`
`\end{split}`
`\end{equation}`

\\sqcap⊓\\sqcap⊓

\\sqcup⊔\\sqcup⊔

\\square□\\square□

\\sqrtx3\\sqrt\[3]{x}3x​`\sqrt[3]{x}`

\\sqsubset⊏\\sqsubset⊏

\\sqsubseteq⊑\\sqsubseteq⊑

\\sqsupset⊐\\sqsupset⊐

\\sqsupseteq⊒\\sqsupseteq⊒

\\ssß\\text{\\ss}ß`\text{\ss}`

\\stackrel=!\\stackrel{!}{=}=!`\stackrel{!}{=}`

\\star⋆\\star⋆

\\StigmaNot supported

\\stigmaNot supported

\\strutNot supported

\\styleNot supportedNon standard

\\sub⊂\\sub⊂

{subarray}Not supported

\\sube⊆\\sube⊆

\\Subset⋐\\Subset⋐

\\subset⊂\\subset⊂

\\subseteq⊆\\subseteq⊆

\\subseteqq⫅\\subseteqq⫅

\\subsetneq⊊\\subsetneq⊊

\\subsetneqq⫋\\subsetneqq⫋

\\substack∑0&lt;i&lt;m0&lt;j&lt;n\\sum\_{\\substack{0&lt;i&lt;m\\\\0&lt;j&lt;n}}0&lt;i&lt;m0&lt;j&lt;n​∑​`\sum_{\substack{0<i<m\\0<j<n}}`

\\succ≻\\succ≻

\\succapprox⪸\\succapprox⪸

\\succcurlyeq≽\\succcurlyeq≽

\\succeq⪰\\succeq⪰

\\succnapprox⪺\\succnapprox⪺

\\succneqq⪶\\succneqq⪶

\\succnsim⋩\\succnsim⋩

\\succsim≿\\succsim≿

\\sum∑\\sum∑

\\supsup⁡\\supsup

\\supe⊇\\supe⊇

\\Supset⋑\\Supset⋑

\\supset⊃\\supset⊃

\\supseteq⊇\\supseteq⊇

\\supseteqq⫆\\supseteqq⫆

\\supsetneq⊋\\supsetneq⊋

\\supsetneqq⫌\\supsetneqq⫌

\\surd√\\surd√

\\swarrow↙\\swarrow↙

## T

| Symbol/Function     | Rendered                                                   | Source or Comment                                       |
|---------------------|------------------------------------------------------------|---------------------------------------------------------|
| \\tag               | a2+b2=c2(3.1c)\\tag{3.1c} a^2+b^2=c^2a2+b2=c2(3.1c)        | `\tag{3.1c} a^2+b^2=c^2`                                |
| \\tag*              | a2+b2=c23.1c\\tag\*{3.1c} a^2+b^2=c^2a2+b2=c23.1c          | `\tag*{3.1c} a^2+b^2=c^2`                               |
| \\tan               | tan⁡\\tantan                                               |                                                         |
| \\tanh              | tanh⁡\\tanhtanh                                            |                                                         |
| \\Tau               | T\\TauT                                                    |                                                         |
| \\tau               | τ\\tauτ                                                    |                                                         |
| \\tbinom            | (nk)\\tbinom n k(kn​)                                      | `\tbinom n k`                                           |
| \\TeX               | TeX\\TeXTE​X                                               |                                                         |
| \\text              | yes &amp; no \\text{ yes }\\&amp;\\text{ no } yes &amp; no | `\text{ yes }\&\text{ no }`                             |
| \\textasciitilde    | ~\\text{\\textasciitilde}~                                 | `\text{\textasciitilde}`                                |
| \\textasciicircum   | ^\\text{\\textasciicircum}^                                | `\text{\textasciicircum}`                               |
| \\textbackslash     | \\\\text{\\textbackslash}\\                                | `\text{\textbackslash}`                                 |
| \\textbar           | \|\\text{\\textbar}\|                                      | `\text{\textbar}`                                       |
| \\textbardbl        | ∥\\text{\\textbardbl}∥                                     | `\text{\textbardbl}`                                    |
| \\textbf            | AaBb123\\textbf{AaBb123}AaBb123                            | `\textbf{AaBb123}`                                      |
| \\textbraceleft     | {\\text{\\textbraceleft}{                                  | `\text{\textbraceleft}`                                 |
| \\textbraceright    | }\\text{\\textbraceright}}                                 | `\text{\textbraceright}`                                |
| \\textcircled       | a◯\\text{\\textcircled a}a◯                                | `\text{\textcircled a}`                                 |
| \\textcolor         | F=ma\\textcolor{blue}{F=ma}F=ma                            | `\textcolor{blue}{F=ma}`                                |
| \\textdagger        | †\\text{\\textdagger}†                                     | `\text{\textdagger}`                                    |
| \\textdaggerdbl     | ‡\\text{\\textdaggerdbl}‡                                  | `\text{\textdaggerdbl}`                                 |
| \\textdegree        | °\\text{\\textdegree}°                                     | `\text{\textdegree}`                                    |
| \\textdollar        | $\\text{\\textdollar}$                                     | `\text{\textdollar}`                                    |
| \\textellipsis      | …\\text{\\textellipsis}…                                   | `\text{\textellipsis}`                                  |
| \\textemdash        | —\\text{\\textemdash}—                                     | `\text{\textemdash}`                                    |
| \\textendash        | –\\text{\\textendash}–                                     | `\text{\textendash}`                                    |
| \\textgreater       | &gt;\\text{\\textgreater}&gt;                              | `\text{\textgreater}`                                   |
| \\textit            | AaBb\\textit{AaBb}AaBb                                     | `\textit{AaBb}`                                         |
| \\textless          | &lt;\\text{\\textless}&lt;                                 | `\text{\textless}`                                      |
| \\textmd            | AaBb123\\textmd{AaBb123}AaBb123                            | `\textmd{AaBb123}`                                      |
| \\textnormal        | AB\\textnormal{AB}AB                                       | `\textnormal{AB}`                                       |
| \\textquotedblleft  | “\\text{\\textquotedblleft}“                               | `\text{\textquotedblleft}`                              |
| \\textquotedblright | ”\\text{\\textquotedblright}”                              | `\text{\textquotedblright}`                             |
| \\textquoteleft     | ‘\\text{\\textquoteleft}‘                                  | `\text{\textquoteleft}`                                 |
| \\textquoteright    | ’\\text{\\textquoteright}’                                 | `\text{\textquoteright}`                                |
| \\textregistered    | ®\\text{\\textregistered}R◯                                | `\text{\textregistered}`                                |
| \\textrm            | AaBb123\\textrm{AaBb123}AaBb123                            | `\textrm{AaBb123}`                                      |
| \\textsc            | Not supported                                              | [Issue #471](https://github.com/KaTeX/KaTeX/issues/471) |
| \\textsf            | AaBb123\\textsf{AaBb123}AaBb123                            | `\textsf{AaBb123}`                                      |
| \\textsl            | Not supported                                              |                                                         |
| \\textsterling      | £\\text{\\textsterling}£                                   | `\text{\textsterling}`                                  |
| \\textstyle         | ∑0n\\textstyle\\sum\_0^n∑0n​                               | `\textstyle\sum_0^n`                                    |
| \\texttip           | Not supported                                              |                                                         |
| \\texttt            | AaBb123\\texttt{AaBb123}AaBb123                            | `\texttt{AaBb123}`                                      |
| \\textunderscore    | \_\\text{\\textunderscore}_                                | `\text{\textunderscore}`                                |
| \\textup            | AaBb123\\textup{AaBb123}AaBb123                            | `\textup{AaBb123}`                                      |
| \\textvisiblespace  | Not supported                                              |                                                         |
| \\tfrac             | ab\\tfrac abba​                                            | `\tfrac ab`                                             |
| \\tg                | tg⁡\\tgtg                                                  |                                                         |
| \\th                | th⁡\\thth                                                  |                                                         |
| \\therefore         | ∴\\therefore∴                                              |                                                         |
| \\Theta             | Θ\\ThetaΘ                                                  |                                                         |
| \\theta             | θ\\thetaθ                                                  |                                                         |
| \\thetasym          | ϑ\\thetasymϑ                                               |                                                         |
| \\thickapprox       | ≈\\thickapprox≈                                            |                                                         |
| \\thicksim          | ∼\\thicksim∼                                               |                                                         |
| \\thickspace        | a  ba\\thickspace bab                                      | `a\thickspace b`                                        |
| \\thinspace         | a ba\\thinspace bab                                        | `a\thinspace b`                                         |
| \\tilde             | M~\\tilde MM~                                              | `\tilde M`                                              |
| \\times             | ×\\times×                                                  |                                                         |
| \\Tiny              | Not supported                                              | see `\tiny`                                             |
| \\tiny              | tiny\\tiny tinytiny                                        | `\tiny tiny`                                            |
| \\to                | →\\to→                                                     |                                                         |
| \\toggle            | Not supported                                              |                                                         |
| \\top               | ⊤\\top⊤                                                    |                                                         |
| \\triangle          | △\\triangle△                                               |                                                         |
| \\triangledown      | ▽\\triangledown▽                                           |                                                         |
| \\triangleleft      | ◃\\triangleleft◃                                           |                                                         |
| \\trianglelefteq    | ⊴\\trianglelefteq⊴                                         |                                                         |
| \\triangleq         | ≜\\triangleq≜                                              |                                                         |
| \\triangleright     | ▹\\triangleright▹                                          |                                                         |
| \\trianglerighteq   | ⊵\\trianglerighteq⊵                                        |                                                         |
| \\tt                | AaBb123{\\tt AaBb123}AaBb123                               | `{\tt AaBb123}`                                         |
| \\twoheadleftarrow  | ↞\\twoheadleftarrow↞                                       |                                                         |
| \\twoheadrightarrow | ↠\\twoheadrightarrow↠                                      |                                                         |

## U

| Symbol/Function       | Rendered                                                                                          | Source or Comment                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| \\u                   | a˘\\text{\\u{a}}a˘                                                                                | `\text{\u{a}}`                                                      |
| \\Uarr                | ⇑\\Uarr⇑                                                                                          |                                                                     |
| \\uArr                | ⇑\\uArr⇑                                                                                          |                                                                     |
| \\uarr                | ↑\\uarr↑                                                                                          |                                                                     |
| \\ulcorner            | ⌜\\ulcorner┌                                                                                      |                                                                     |
| \\underbar            | X‾\\underbar{X}X​                                                                                 | `\underbar{X}`                                                      |
| \\underbrace          | x+⋯+x⏟n times\\underbrace{x+⋯+x}\_{n\\text{ times}}n timesx+⋯+x​​                                 | `\underbrace{x+⋯+x}_{n\text{ times}}`                               |
| \\underbracket        | Not supported                                                                                     |                                                                     |
| \\undergroup          | AB⏡\\undergroup{AB}AB​                                                                            | `\undergroup{AB}`                                                   |
| \\underleftarrow      | AB←\\underleftarrow{AB}AB​                                                                        | `\underleftarrow{AB}`                                               |
| \\underleftrightarrow | AB↔\\underleftrightarrow{AB}AB​                                                                   | `\underleftrightarrow{AB}`                                          |
| \\underrightarrow     | AB→\\underrightarrow{AB}AB​                                                                       | `\underrightarrow{AB}`                                              |
| \\underline           | a long argument‾\\underline{\\text{a long argument}}a long argument​                              | `\underline{\text{a long argument}}`                                |
| \\underlinesegment    | ABundefined\\underlinesegment{AB}AB​                                                              | `\underlinesegment{AB}`                                             |
| \\underparen          | Not supported                                                                                     | See `\undergroup`                                                   |
| \\underrightarrow     | AB→\\underrightarrow{AB}AB​                                                                       | `\underrightarrow{AB}`                                              |
| \\underset            | =!\\underset{!}{=}!=​                                                                             | `\underset{!}{=}`                                                   |
| \\unicode             | Not supported                                                                                     |                                                                     |
| \\unlhd               | ⊴\\unlhd⊴                                                                                         |                                                                     |
| \\unrhd               | ⊵\\unrhd⊵                                                                                         |                                                                     |
| \\up                  | Not supported                                                                                     |                                                                     |
| \\Uparrow             | ⇑\\Uparrow⇑                                                                                       |                                                                     |
| \\uparrow             | ↑\\uparrow↑                                                                                       |                                                                     |
| \\Updownarrow         | ⇕\\Updownarrow⇕                                                                                   |                                                                     |
| \\updownarrow         | ↕\\updownarrow↕                                                                                   |                                                                     |
| \\upharpoonleft       | ↿\\upharpoonleft↿                                                                                 |                                                                     |
| \\upharpoonright      | ↾\\upharpoonright↾                                                                                |                                                                     |
| \\uplus               | ⊎\\uplus⊎                                                                                         |                                                                     |
| \\uproot              | Not supported                                                                                     |                                                                     |
| \\upshape             | Not supported                                                                                     |                                                                     |
| \\Upsilon             | Υ\\UpsilonΥ                                                                                       |                                                                     |
| \\upsilon             | υ\\upsilonυ                                                                                       |                                                                     |
| \\upuparrows          | ⇈\\upuparrows⇈                                                                                    |                                                                     |
| \\urcorner            | ⌝\\urcorner┐                                                                                      |                                                                     |
| \\url                 | https://katex.org/\\footnotesize\\url{https://katex.org/}[https://katex.org/](https://katex.org/) | `\url{https://katex.org/}` Requires `trust` [option](/docs/options) |
| \\utilde              | AB~\\utilde{AB}AB​                                                                                | `\utilde{AB}`                                                       |

## V

Symbol/FunctionRenderedSource or Comment

\\vaˇ\\text{\\v{a}}aˇ`\text{\v{a}}`

\\varcoppaNot supported

\\varDeltaΔ\\varDeltaΔ

\\varepsilonε\\varepsilonε

\\varGammaΓ\\varGammaΓ

\\varinjlimlim→⁡\\varinjlimlim​`\varinjlim`

\\varkappaϰ\\varkappaϰ

\\varLambdaΛ\\varLambdaΛ

\\varliminflim‾⁡\\varliminflim​`\varliminf`

\\varlimsuplim‾⁡\\varlimsuplim`\varlimsup`

\\varnothing∅\\varnothing∅

\\varOmegaΩ\\varOmegaΩ

\\varPhiΦ\\varPhiΦ

\\varphiφ\\varphiφ

\\varPiΠ\\varPiΠ

\\varpiϖ\\varpiϖ

\\varprojlimlim←⁡\\varprojlimlim​`\varprojlim`

\\varpropto∝\\varpropto∝

\\varPsiΨ\\varPsiΨ

\\varrhoϱ\\varrhoϱ

\\varSigmaΣ\\varSigmaΣ

\\varsigmaς\\varsigmaς

\\varstigmaNot supported

\\varsubsetneq⊊\\varsubsetneq

\\varsubsetneqq⫋\\varsubsetneqq

\\varsupsetneq⊋\\varsupsetneq

\\varsupsetneqq⫌\\varsupsetneqq

\\varThetaΘ\\varThetaΘ

\\varthetaϑ\\varthetaϑ

\\vartriangle△\\vartriangle△

\\vartriangleleft⊲\\vartriangleleft⊲

\\vartriangleright⊳\\vartriangleright⊳

\\varUpsilonΥ\\varUpsilonΥ

\\varXiΞ\\varXiΞ

\\vcentcolon:=\\mathrel{\\vcentcolon =}:=`\mathrel{\vcentcolon =}`

\\vcentera+(abc)a+\\left(\\vcenter{\\frac{\\frac a b}c}\\right)a+(cba​​​)`a+\left(\vcenter{\hbox{$\frac{\frac a b}c$}}\right)`
TeX (strict) syntax

\\vcentera+(abc)a+\\left(\\vcenter{\\frac{\\frac a b}c}\\right)a+(cba​​​)`a+\left(\vcenter{\frac{\frac a b}c}\right)`
non-strict syntax

\\Vdash⊩\\Vdash⊩

\\vDash⊨\\vDash⊨

\\vdash⊢\\vdash⊢

\\vdots⋮\\vdots⋮

\\vecF⃗\\vec{F}F`\vec{F}`

\\vee∨\\vee∨

\\veebar⊻\\veebar⊻

\\verb\\frac a b\\verb!\\frac a b!\\frac a b`\verb!\frac a b!`

\\Vert∥\\Vert∥

\\vert∣\\vert∣

\\vfilNot supported

\\vfillNot supported

\\vlineNot supported[Issue #269](https://github.com/KaTeX/KaTeX/issues/269)

{Vmatrix}∥abcd∥\\begin{Vmatrix}a&amp;b\\\\c&amp;d\\end{Vmatrix}​ac​bd​​`\begin{Vmatrix}`
   `a & b \\`
   `c & d`
`\end{Vmatrix}`

{Vmatrix\*}∥0−1−10∥\\begin{Vmatrix\*}\[r]0&amp;-1\\\\-1&amp;0\\end{Vmatrix\*}​0−1​−10​​`\begin{Vmatrix*}[r]`
   `0 & -1 \\`
   `-1 & 0`
`\end{Vmatrix*}`

{vmatrix}∣abcd∣\\begin{vmatrix}a&amp;b\\\\c&amp;d\\end{vmatrix}​ac​bd​​`\begin{vmatrix}`
   `a & b \\`
   `c & d`
`\end{vmatrix}`

{vmatrix\*}∣0−1−10∣\\begin{vmatrix\*}\[r]0&amp;-1\\\\-1&amp;0\\end{vmatrix\*}​0−1​−10​​`\begin{vmatrix*}[r]`
   `0 & -1 \\`
   `-1 & 0`
`\end{vmatrix*}`

\\vphantomMa‾\\overline{\\vphantom{M}a}Ma`\overline{\vphantom{M}a}`

\\Vvdash⊪\\Vvdash⊪

## W

| Symbol/Function | Rendered             | Source or Comment                                       |
|-----------------|----------------------|---------------------------------------------------------|
| \\wedge         | ∧\\wedge∧            |                                                         |
| \\weierp        | ℘\\weierp℘           |                                                         |
| \\widecheck     | ABˇ\\widecheck{AB}AB | `\widecheck{AB}`                                        |
| \\widehat       | AB^\\widehat{AB}AB   | `\widehat{AB}`                                          |
| \\wideparen     | Not supported        | [Issue #560](https://github.com/KaTeX/KaTeX/issues/560) |
| \\widetilde     | AB~\\widetilde{AB}AB | `\widetilde{AB}`                                        |
| \\wp            | ℘\\wp℘               |                                                         |
| \\wr            | ≀\\wr≀               |                                                         |

## X

| Symbol/Function      | Rendered                                               | Source or Comment                              |
|----------------------|--------------------------------------------------------|------------------------------------------------|
| \\xcancel            | ABC\\xcancel{ABC}ABC                                   | `\xcancel{ABC}`                                |
| \\xdef               | a\\def\\foo{a}\\xdef\\fcopy{\\foo}\\def\\foo{}\\fcopya | `\def\foo{a}\xdef\fcopy{\foo}\def\foo{}\fcopy` |
| \\Xi                 | Ξ\\XiΞ                                                 |                                                |
| \\xi                 | ξ\\xiξ                                                 |                                                |
| \\xhookleftarrow     | ↩abc\\xhookleftarrow{abc}abc​                          | `\xhookleftarrow{abc}`                         |
| \\xhookrightarrow    | ↪abc\\xhookrightarrow{abc}abc​                         | `\xhookrightarrow{abc}`                        |
| \\xLeftarrow         | ⇐abc\\xLeftarrow{abc}abc​                              | `\xLeftarrow{abc}`                             |
| \\xleftarrow         | ←abc\\xleftarrow{abc}abc​                              | `\xleftarrow{abc}`                             |
| \\xleftharpoondown   | ↽abc\\xleftharpoondown{abc}abc​                        | `\xleftharpoondown{abc}`                       |
| \\xleftharpoonup     | ↼abc\\xleftharpoonup{abc}abc​                          | `\xleftharpoonup{abc}`                         |
| \\xLeftrightarrow    | ⇔abc\\xLeftrightarrow{abc}abc​                         | `\xLeftrightarrow{abc}`                        |
| \\xleftrightarrow    | ↔abc\\xleftrightarrow{abc}abc​                         | `\xleftrightarrow{abc}`                        |
| \\xleftrightharpoons | ⇋abc\\xleftrightharpoons{abc}abc​                      | `\xleftrightharpoons{abc}`                     |
| \\xlongequal         | =abc\\xlongequal{abc}abc                               | `\xlongequal{abc}`                             |
| \\xmapsto            | ↦abc\\xmapsto{abc}abc​                                 | `\xmapsto{abc}`                                |
| \\xRightarrow        | ⇒abc\\xRightarrow{abc}abc​                             | `\xRightarrow{abc}`                            |
| \\xrightarrow        | →abc\\xrightarrow{abc}abc​                             | `\xrightarrow{abc}`                            |
| \\xrightharpoondown  | ⇁abc\\xrightharpoondown{abc}abc​                       | `\xrightharpoondown{abc}`                      |
| \\xrightharpoonup    | ⇀abc\\xrightharpoonup{abc}abc​                         | `\xrightharpoonup{abc}`                        |
| \\xrightleftharpoons | ⇌abc\\xrightleftharpoons{abc}abc​                      | `\xrightleftharpoons{abc}`                     |
| \\xtofrom            | ⇄abc\\xtofrom{abc}abc​                                 | `\xtofrom{abc}`                                |
| \\xtwoheadleftarrow  | ↞abc\\xtwoheadleftarrow{abc}abc                        | `\xtwoheadleftarrow{abc}`                      |
| \\xtwoheadrightarrow | ↠abc\\xtwoheadrightarrow{abc}abc                       | `\xtwoheadrightarrow{abc}`                     |

## YZ

| Symbol/Function | Rendered | Source or Comment |
|-----------------|----------|-------------------|
| \\yen           | ¥\\yen¥  |                   |
| \\Z             | Z\\ZZ    |                   |
| \\Zeta          | Z\\ZetaZ |                   |
| \\zeta          | ζ\\zetaζ |                   |

</details>

<details><summary> SYMBOLS </summary>

[← Supported Functions](/docs/supported)[Common Issues →](/docs/issues)

- [Symbols](#symbols)
- [A](#a)
- [B](#b)
- [C](#c)
- [D](#d)
- [E](#e)
- [F](#f)
- [G](#g)
- [H](#h)
- [I](#i)
- [JK](#jk)
- [L](#l)
- [M](#m)
- [N](#n)
- [O](#o)
- [P](#p)
- [QR](#qr)
- [S](#s)
- [T](#t)
- [U](#u)
- [V](#v)
- [W](#w)
- [X](#x)
- [YZ](#yz)

</details>
