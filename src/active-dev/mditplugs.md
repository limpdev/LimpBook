[Skip to main content](abbr.html#main-content)

# @mdit/plugin-abbr

* * *

Plugin to support abbreviation tag `<abbr>`.

## [Usage](abbr.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { abbr } from "@mdit/plugin-abbr";

const mdIt = MarkdownIt().use(abbr);

mdIt.render(`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification is maintained by the W3C.
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { abbr } = require("@mdit/plugin-abbr");

const mdIt = MarkdownIt().use(abbr);

mdIt.render(`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification is maintained by the W3C.
`);
```

## [Syntax](abbr.html#syntax)

With this plugin you can declare abbreviations using reference beginning with an extra `*`:

```
*[Abbr word]: Abbr content
```

Escaping

Escaping can be done by adding `\` to escape the `*` `[` or `]` marker:

```
\*[text]: content
```

will be

\*\[text]: content

## [Demo](abbr.html#demo)

Demo

The HTML specificationis maintained by the W3C.

```
*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

The HTML specificationis maintained by the W3C.
```[Skip to main content](alert.html#main-content)

# @mdit/plugin-alert

* * *

Plugin to support GFM style alerts. ([Ref](https://github.com/orgs/community/discussions/16925))

## [Usage](alert.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { alert } from "@mdit/plugin-alert";

const mdIt = MarkdownIt().use(alert);

mdIt.render(`
> [!warning]
> Warning Text
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { alert } = require("@mdit/plugin-alert");

const mdIt = MarkdownIt().use(alert);

mdIt.render(`
> [!warning]
> Warning Text
`);
```

## [Syntax](alert.html#syntax)

With this plugin you can create block alerts with blockquote starting with `[!ALERT_NAME]` like:

```
> [!warning]
> This is warning text
```

The `ALERT_NAME` isn't case sensitive and can be the following string:

- `note`
- `tip`
- `important`
- `caution`
- `warning`

Nesting and escaping

- By default, GFM style alerts can only be placed at root, but you can use `deep: true` to enable deep and nesting support:
  
  ```
  md.use(alert, {
    name: "warning",
    deep: true,
  });
  ```
  
  ```
  > [!warning]
  > This is warning text
  >
  > > [!warning]
  > > This is a nested warning
  
  - > [!warning]
    > This is warning text
  ```
  
  will be
  
  Warning
  
  This is warning text
  
  Warning
  
  This is a nested warning
  
  - Warning
    
    This is warning text
- Escaping can be done by adding `\` to escape the `!` `[` or `]` marker:
  
  ```
  > [\!warning]
  > This is warning text
  
  > \[!warning]
  > This is warning text
  ```
  
  will be
  
  > \[!warning] This is warning text
  
  > \[!warning] This is warning text

## [Options](alert.html#options)

```
interface MarkdownItAlertOptions {
  /**
   * Allowed alert names
   *
   * @default ['important', 'note', 'tip', 'warning', 'caution']
   */
  alertNames?: string[];

  /**
   * Whether handle deep alert syntax
   *
   * @default false
   */
  deep?: boolean;

  /**
   * Hint opening tag render function
   */
  openRender?: RenderRule;

  /**
   * Hint closing tag render function
   */
  closeRender?: RenderRule;

  /**
   * Hint title render function
   */
  titleRender?: RenderRule;
}
```

## [Demo](alert.html#demo)

Demo

Note

This is note text

Important

This is important text

Tips

This is tip text

Warning

This is warning text

Caution

This is caution text

```
> [!note]
> This is note text

> [!important]
> This is important text

> [!tip]
> This is tip text

> [!warning]
> This is warning text

> [!caution]
> This is caution text
```

Styles

With default options, you can import `@mdit/plugin-alert/style` to apply styles for alert box.[Skip to main content](align.html#main-content)

# @mdit/plugin-align

* * *

Plugin to align contents.

Note

This plugin is based on [@mdit/plugin-container](container.html).

## [Usage](align.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { align } from "@mdit/plugin-align";

const mdIt = MarkdownIt().use(align);

mdIt.render(`\
::: center
Contents to align center
:::
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { align } = require("@mdit/plugin-align");

const mdIt = MarkdownIt().use(align);

mdIt.render(`\
::: center
Contents to align center
:::
`);
```

## [Syntax](align.html#syntax)

```
::: left
Contents to align left
:::

::: center
Contents to align center
:::

::: right
Contents to align right
:::

::: justify
Contents to align justify
:::
```

Nesting and escaping

- Nestings can be done by increasing marker number of outer container:
  
  ```
  :::: center
  Center contents...
  ::: left
  Left contents..
  :::
  Center contents...
  ::::
  ```
  
  will be
  
  Center contents...
  
  Left contents..
  
  Center contents...
- Escaping can be done by adding `\` to escape the marker:
  
  ```
  \::: left
  
  :::
  ```
  
  will be
  
  ::: left
  
  :::

## [Demo](align.html#demo)

Demo

### [Twinkle, Twinkle, Little Star](align.html#twinkle-twinkle-little-star)

——Jane Taylor

Twinkle, twinkle, little star,

How I wonder what you are!

Up above the world so high,

Like a diamond in the sky.

When the blazing sun is gone,

When he nothing shines upon,

Then you show your little light,

Twinkle, twinkle, all the night.

Then the traveller in the dark,

Thanks you for your tiny spark,

He could not see which way to go,

If you did not twinkle so.

In the dark blue sky you keep,

And often thro' my curtains peep,

For you never shut your eye,

Till the sun is in the sky.

'Tis your bright and tiny spark,

Lights the trav’ller in the dark,

Tho' I know not what you are,

Twinkle, twinkle, little star.

```
:::: center

### Twinkle, Twinkle, Little Star

::: right

——Jane Taylor

:::

Twinkle, twinkle, little star,

How I wonder what you are!

Up above the world so high,

Like a diamond in the sky.

When the blazing sun is gone,

When he nothing shines upon,

Then you show your little light,

Twinkle, twinkle, all the night.

Then the traveller in the dark,

Thanks you for your tiny spark,

He could not see which way to go,

If you did not twinkle so.

In the dark blue sky you keep,

And often thro' my curtains peep,

For you never shut your eye,

Till the sun is in the sky.

'Tis your bright and tiny spark,

Lights the trav’ller in the dark,

Tho' I know not what you are,

Twinkle, twinkle, little star.

::::
```[Skip to main content](attrs.html#main-content)

# @mdit/plugin-attrs

* * *

Plugins to add attrs to Markdown content.

## [Usage](attrs.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { attrs } from "@mdit/plugin-attrs";

const mdIt = MarkdownIt().use(attrs, {
  // your options, optional
});

mdIt.render("# Heading 🎉{#heading}");
```

JS

```
const MarkdownIt = require("markdown-it");
const { attrs } = require("@mdit/plugin-attrs");

const mdIt = MarkdownIt().use(attrs, {
  // your options, optional
});

mdIt.render("# Heading 🎉{#heading}");
```

## [Syntax](attrs.html#syntax)

You can use `{attrs}` to add attrs to Markdown content.

For example, if you want a heading2 "Hello World" with a id "say-hello-world", you can write:

```
## Hello World {#say-hello-world}
```

If you want a image with class "full-width", you can write:

```
![img](link/to/image.png) {.full-width}
```

Also, other attrs are supported, so:

```
A paragraph with some text. {#p .a .b align=center customize-attr="content with spaces"}
```

will be rendered into:

```
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  A paragraph with some text.
</p>
```

Escaping

Escaping can be done by adding `\` to escape the delimiter:

```
### Heading \{#heading}
```

will be

### [Heading {#heading}](attrs.html#heading-heading)

## [Advanced](attrs.html#advanced)

You can pass options to `@mdit-plugin-attrs` to customize plugin behavior.

```
type MarkdownItAttrRuleName =
  | "fence"
  | "inline"
  | "table"
  | "list"
  | "hr"
  | "softbreak"
  | "block";

interface MarkdownItAttrsOptions {
  /**
   * left delimiter
   *
   * @default '{'
   */
  left?: string;

  /**
   * right delimiter
   *
   * @default '}'
   */
  right?: string;

  /**
   * allowed attributes
   *
   * @description An empty list means allowing all attribute
   *
   * @default []
   */
  allowed?: (string | RegExp)[];

  /**
   * Rules to enable
   *
   * @default "all"
   */
  rule?: "all" | boolean | MarkdownItAttrRuleName[];
}
```

## [Demo](attrs.html#demo)

> ALl class are styled with `margin: 4px;padding: 4px;border: 1px solid red;` to show the effect.

Inline

Text with `inline code` and ![favicon](favicon.ico), also supporting *emphasis* and **bold**.

```
Text with `inline code`{.inline-code} and ![favicon](/favicon.ico){.image}, also supporting _emphasis_{.inline-emphasis} and **bold**{.inline-bold}.
```

Block

block content

```
block content {.block}
```

Fence

```
const a = 1;
```

````
```js {.fence}
const a = 1;
```
````

Table

| Table   |
|---------|
| content |

```
| Table   |
| ------- |
| content |

{.table}
```

List

- list item
  
  - nested list item

```
- list item{.list-item}

  - nested list item
    {.nested}

{.list-wrapper}
```

Horizontal Rule

* * *

```
--- {.horizontal}
```

Softbreak

A line with break

```
A line with break  
{.break}
```[Skip to main content](container.html#main-content)

# @mdit/plugin-container

* * *

Plugin for creating block-level custom containers.

## [Usage](container.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { container } from "@mdit/plugin-container";

const mdIt = MarkdownIt().use(container, {
  // your options, name is required
  name: "warning",
});

mdIt.render(`
::: warning

Warning Text

:::
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { container } = require("@mdit/plugin-container");

const mdIt = MarkdownIt().use(container, {
  // your options, name is required
  name: "warning",
});

mdIt.render(`
::: warning

Warning Text

:::
`);
```

## [Syntax](container.html#syntax)

With this plugin you can create block containers like:

```
::: warning
_here be dragons_
:::
```

and specify how they should be rendered. If no renderer defined, `<div>` with container name class will be created:

```
<div class="warning">
  <em>here be dragons</em>
</div>
```

Markup is the same as for fenced code blocks. However by default the plugin use another character as marker and content is rendered as markdown markup by plugin.

Nesting and escaping

- Nestings can be done by increasing marker number of outer container:
  
  ```
  :::: warning
  Warning contents...
  ::: details
  Some details
  :::
  ::::
  ```
  
  will be
  
  Warning
  
  Warning contents...
  
  Details
  
  Some details
- Escaping can be done by adding `\` to escape the marker:
  
  ```
  \::: warning
  
  :::
  ```
  
  will be
  
  ::: warning
  
  :::

## [Options](container.html#options)

```
interface MarkdownItContainerOptions {
  /**
   * Container name
   */
  name: string;

  /**
   * Container marker
   *
   * @default ":"
   */
  marker?: string;

  /**
   * Validate whether it should be regarded as this container type
   *
   * @param params the content after the marker
   * @param markup marker character
   * @returns is this container type or not
   *
   * @default params.trim().split(" ", 2)[0] === name
   */
  validate?: (params: string, markup: string) => boolean;

  /**
   * Opening tag render function
   */
  openRender?: RenderRule;

  /**
   * Closing tag render function
   */
  closeRender?: RenderRule;
}
```

## [Demo](container.html#demo)

### [Hint container](container.html#hint-container)

With the following code and some styles:

```
md.use(container, {
  name: "hint",
  openRender: (tokens, index, _options) => {
    const info = tokens[index].info.trim().slice(4).trim();

    return `<div class="custom-container hint">\n<p class="custom-container-title">${
      info || "Hint"
    }</p>\n`;
  },
});
```

You can write a hint like this:

Here is a Hint

Hint

Here is a **hint** for you!

- Hint 1
  
  - Hint 1.1
  - Hint 1.2
- Hint 2

```
::: hint Here is a Hint
:::

::: hint

Here is a **hint** for you!

- Hint 1
  - Hint 1.1
  - Hint 1.2
- Hint 2

:::
```[Skip to main content](demo.html#main-content)

# @mdit/plugin-demo

* * *

Display snippet render result and code at the same time.

## [Usage](demo.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { demo } from "@mdit/plugin-demo";

const mdIt = MarkdownIt().use(demo, {
  // your options
});

mdIt.render(`
::: demo

# Heading 1

Text

:::
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { demo } = require("@mdit/plugin-demo");

const mdIt = MarkdownIt().use(demo, {
  // your options
});

mdIt.render(`
::: demo

# Heading 1

Text

:::
`);
```

## [Syntax](demo.html#syntax)

With this plugin, you can quickly display a Markdown snippet and its corresponding source code. You can customize the rendering output, by default it will render a `<details>` block

The syntax is the same as [container](container.html), except that the corresponding `name` is `demo`.

## [Options](demo.html#options)

```
interface MarkdownItDemoOptions {
  /**
   * Container name
   *
   * @default "demo"
   */
  name?: string;

  /**
   * Whether code is displayed before result
   *
   * @default true
   */
  beforeContent?: boolean;

  /**
   * Opening tag render function
   */
  openRender?: RenderRule;

  /**
   * Closing tag render function
   */
  closeRender?: RenderRule;

  /**
   * Code render function
   */
  codeRender?: RenderRule;

  /**
   * Content open tag render function
   */
  contentOpenRender?: RenderRule;

  /**
   * Content close tag render function
   */
  contentCloseRender?: RenderRule;
}
```

## [Demo](demo.html#demo)

## [Heading 1](demo.html#heading-1)

Text

```
## Heading 1

Text
```

```
::: md-demo

## Heading 1

Text

:::
```[Skip to main content](dl.html#main-content)

# @mdit/plugin-dl

* * *

Plugin to support definition list.

## [Usage](dl.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { dl } from "@mdit/plugin-dl";

const mdIt = MarkdownIt().use(dl);

mdIt.render(`\
Apple
: Pomaceous fruit of plants of the genus Malus in the family Rosaceae.

Orange
: The fruit of an evergreen tree of the genus Citrus.
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { dl } = require("@mdit/plugin-dl");

const mdIt = MarkdownIt().use(dl);

mdIt.render(`\
Apple
: Pomaceous fruit of plants of the genus Malus in the family Rosaceae.

Orange
: The fruit of an evergreen tree of the genus Citrus.
`);
```

## [Syntax](dl.html#syntax)

The grammar is based on [PanDoc Definition lists](https://pandoc.org/MANUAL.html#definition-lists)

Each term must be on one line, optionally followed by a blank line. After a term, it must be followed by one or more definitions.

Each definition needs to start with `:` or `~` and be followed by one or more definition paragraphs. When multiple block elements are defined, subsequent block elements should be indented by four spaces.

If there is a blank line after the term, the definition text will be treated as a paragraph, otherwise a compact list will be displayed.

## [Demo](dl.html#demo)

Demo

Term 1

Definition 1

Term 2 with *inline markup*

Definition 2

```
  { some code, part of Definition 2 }
```

Third paragraph of definition 2.

Term 3

Definition with lazy continuation.

Second paragraph of the definition.

* * *

Term 1

Definition 1

Term 2

Definition 2a

Definition 2b

```
Term 1

: Definition 1

Term 2 with _inline markup_

: Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

Term 3

: Definition
with lazy continuation.

    Second paragraph of the definition.

---

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b
```[Skip to main content](figure.html#main-content)

# @mdit/plugin-figure

* * *

Plugin for generating figures with captions from images.

## [Usage](figure.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { figure } from "@mdit/plugin-figure";

const mdIt = MarkdownIt().use(figure, {
  // your options, optional
});

mdIt.render("![image](https://example.com/image.png)");
```

JS

```
const MarkdownIt = require("markdown-it");
const { figure } = require("@mdit/plugin-figure");

const mdIt = MarkdownIt().use(figure, {
  // your options, optional
});

mdIt.render("![image](https://example.com/image.png)");
```

## [Syntax](figure.html#syntax)

Sometimes, you may want to add a description with image and place it between contents, so here is this plugin.

If a image is standalone in a line, wrapped or not wrapped by link, it will be displayed as `<figure>` and title (or alt) will be displayed as `<figcaption>`.

## [Options](figure.html#options)

```
interface MarkdownItFigureOptions {
  /**
   * Whether the figure is focusable
   *
   * @default true
   */
  focusable?: boolean;
}
```

## [Demo](figure.html#demo)

Demo

![Logo](favicon.ico)

Logo

[![Logo](favicon.ico)](https://commonmark.org/)

Logo

![Logo](favicon.ico)

Markdown

[![Logo](favicon.ico)](https://commonmark.org/)

Markdown

```
![Logo](/favicon.ico)

[![Logo](/favicon.ico)](https://commonmark.org/)

![Logo](/favicon.ico "Markdown")

[![Logo](/favicon.ico "Markdown")](https://commonmark.org/)
```[Skip to main content](footnote.html#main-content)

# @mdit/plugin-footnote

* * *

Plugin to support footnotes.

## [Usage](footnote.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";

const mdIt = MarkdownIt().use(footnote);

mdIt.render("Inline footnote^[Text of inline footnote] definition.");
```

JS

```
const MarkdownIt = require("markdown-it");
const { footnote } = require("@mdit/plugin-footnote");

const mdIt = MarkdownIt().use(footnote);

mdIt.render("Inline footnote^[Text of inline footnote] definition.");
```

## [Syntax](footnote.html#syntax)

- Use `[^Anchor text]` in Markdown to define a footnote
- Use block starting with `[^Anchor text]: ...` to describe footnote content
- If there are multiple paragraph in footnote, the paragraph show be double indented.

Nesting and escaping

- Nestings are supported:
  
  ```
  Footnote 1 link[^first].
  
  [^first]: Footnote can reference [^second].
  
  [^second]: Other footnote.
  ```
- Escaping can be done by adding `\`:
  
  ```
  The following \[^first] is not a footnote.
  ```
  
  will be
  
  The following \[^first] is not a footnote.

## [Demo](footnote.html#demo)

Demo

Footnote 1 link[\[1\]](footnote.html#footnote1)[]().

Footnote 2 link[\[2\]](footnote.html#footnote2)[]().

Inline footnote[\[3\]](footnote.html#footnote3)[]() definition.

Duplicated footnote reference.

```
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference.

[^first]: Footnote **can have markup**

    and multiple paragraphs[^second].

[^second]: Footnote text.
```

* * *

1. Footnote **can have markup**
   
   and multiple paragraphs[\[2:1\]](footnote.html#footnote2)[](). [↩︎](footnote.html#footnote-ref1)
2. Footnote text. [↩︎](footnote.html#footnote-ref2) [↩︎](footnote.html#footnote-ref2:1)
3. Text of inline footnote [↩︎](footnote.html#footnote-ref3)[Skip to main content](icon.html#main-content)

# @mdit/plugin-icon

* * *

Plugins with icon support.

## [Usage](icon.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { icon } from "@mdit/plugin-icon";

const mdIt = MarkdownIt().use(icon);

mdIt.render("iPhone is made by ::apple::.");
```

JS

```
const MarkdownIt = require("markdown-it");
const { icon } = require("@mdit/plugin-icon");

const mdIt = MarkdownIt().use(icon);

mdIt.render("iPhone is made by ::apple::.");
```

## [Syntax](icon.html#syntax)

Use `::icon classes::` to insert custom icons. By default the plugin will render a `<i>` tag with the given icon class. Any classes started with a `=` will be treated as a size definition, and `/` will be treated as a color definition:

```
<!-- <i class="icon1" style="font-size:16px;color:red" -->

::icon1 =16 /red::
```

If you are not satisfied with the default render, you can use `render` option to customize icon rendering:

```
const MarkdownIt = require("markdown-it");
const {
  fontAwesomeRender,
  icon,
  iconfontRender,
  iconifyRender,
} = require("@mdit/plugin-icon");

const mdIt = MarkdownIt().use(icon, {
  // support for iconify
  render: iconifyRender,

  // support for fontawesome
  render: fontAwesomeRender,

  // support for iconfont
  render: iconfontRender,

  // custom render
  render: (rawIcon) => {
    return `<span class="${rawIcon}"></span>`;
  },
});
```

For the build-in helper and render function usage, see source code and related unit tests for more details:

- [src/render.ts](https://github.com/mdit-plugins/mdit-plugins/tree/main/packages/icon/src/render.ts)
- [\_\_tests\_\_/render.ts](https://github.com/mdit-plugins/mdit-plugins/tree/main/packages/icon/__tests__/render.ts)
- [src/utils.ts](https://github.com/mdit-plugins/mdit-plugins/tree/main/packages/icon/src/utils.ts)
- [\_\_tests\_\_/utils.ts](https://github.com/mdit-plugins/mdit-plugins/tree/main/packages/icon/__tests__/utils.ts)

Why not markdownit-plugin-emoji?

`markdownit-plugin-emoji` only supports converting known emoji codes to icons, while this plugin supports any custom icon classes.

This is useful when you are using it with font icon libraries like Font Awesome, Material Icons, etc.

## [Demo](icon.html#demo)

Demo

iPhone is made by .

```
iPhone is made by ::apple::.
```[Skip to main content](img-lazyload.html#main-content)

# @mdit/plugin-img-lazyload

* * *

Plugin to add lazy loading for images.

## [Usage](img-lazyload.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { imgLazyload } from "@mdit/plugin-img-lazyload";

const mdIt = MarkdownIt().use(imgLazyload);

mdIt.render("![Image](https://example.com/image.png)");
```

JS

```
const MarkdownIt = require("markdown-it");
const { imgLazyload } = require("@mdit/plugin-img-lazyload");

const mdIt = MarkdownIt().use(imgLazyload);

mdIt.render("![Image](https://example.com/image.png)");
```

## [Description](img-lazyload.html#description)

The plugin automatically add `loading="lazy"` to all images to let them being lazy loaded.

Note

This is a native HTML5 feature, so your browser must support [loading=lazy attribute](https://caniuse.com/loading-lazy-attr).[Skip to main content](img-mark.html#main-content)

# @mdit/plugin-img-mark

* * *

Plugins to mark images by ID suffix for theme mode.

## [Usage](img-mark.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { imgMark } from "@mdit/plugin-img-mark";

const mdIt = MarkdownIt().use(imgMark, {
  // your options, optional
});

mdIt.render("![image](https://example.com/image.png#light)");
```

JS

```
const MarkdownIt = require("markdown-it");
const { imgMark } = require("@mdit/plugin-img-mark");

const mdIt = MarkdownIt().use(imgMark, {
  // your options, optional
});

mdIt.render("![image](https://example.com/image.png#light)");
```

## [Syntax](img-mark.html#syntax)

GFM supports marking pictures by ID suffix so that pictures are only displayed in a specific mode.

This plugin allows you to add ID suffix to images links, and automatically add `data-mode="lightmode-only|darkmode-only"` to `<img>` tag based on your settings.

Related Styles

The plugin will not generate styles, because it doesn't know what the style should be, so you need to add related styles yourself.

If you are generating the page and controlling darkmode by dom, you should use:

```
lightmode-selector {
  img[data-mode="darkmode-only"] {
    display: none !important;
  }
}

darkmode-selector {
  img[data-mode="lightmode-only"] {
    display: none !important;
  }
}
```

If the page theme mode is based on user preference, you should use:

```
@media (prefers-color-scheme: light) {
  img[data-mode="darkmode-only"] {
    display: none !important;
  }
}

@media (prefers-color-scheme: dark) {
  img[data-mode="lightmode-only"] {
    display: none !important;
  }
}
```

## [Options](img-mark.html#options)

```
interface MarkdownItImgMarkOptions {
  /**
   * lightmode only ids
   *
   * @default ["light"]
   */
  light?: string[];

  /**
   * darkmode only ids
   *
   * @default ["dark"]
   */
  dark?: string[];
}
```

## [Demo](img-mark.html#demo)

Demo

![GitHub Light](github-light.png)![GitHub Dark](github-dark.png)

```
![GitHub Light](/github-light.png#dark)
![GitHub Dark](/github-dark.png#light)
```

(Try to toggle theme mode)[Skip to main content](img-size.html#main-content)

# @mdit/plugin-img-size

* * *

Plugins to support setting size for images.

## [Usage](img-size.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { legacyImgSize, imgSize, obsidianImgSize } from "@mdit/plugin-img-size";

// New syntax
const mdNew = MarkdownIt().use(imgSize);
mdNew.render("![image =300x200](https://example.com/image.png =300x200)");

// Obsidian syntax
const mdObsidian = MarkdownIt().use(obsidianImgSize);
mdObsidian.render("![image|300x200](https://example.com/image.png)");

// Legacy syntax
const mdLegacy = MarkdownIt().use(legacyImgSize);
mdLegacy.render("![image](https://example.com/image.png =300x200)");
```

JS

```
const MarkdownIt = require("markdown-it");
const {
  legacyImgSize,
  imgSize,
  obsidianImgSize,
} = require("@mdit/plugin-img-size");

// New syntax
const mdNew = MarkdownIt().use(imgSize);
mdNew.render("![image =300x200](https://example.com/image.png =300x200)");

// Obsidian syntax
const mdObsidian = MarkdownIt().use(obsidianImgSize);
mdObsidian.render("![image|300x200](https://example.com/image.png)");

// Legacy syntax
const mdLegacy = MarkdownIt().use(legacyImgSize);
mdLegacy.render("![image](https://example.com/image.png =300x200)");
```

## [Syntax](img-size.html#syntax)

### [New Syntax](img-size.html#new-syntax)

Append `=widthxheight` to image alt text with spaces as separator.

Both `width` and `height` should be numbers as pixels and are optional.

```
![Alt =200x300](/example.png)
![Alt =200x](/example.jpg "Title")
![Alt =x300](/example.bmp)
```

Renders as ↓

```
<img src="/example.png" alt="Alt" width="200" height="300" />
<img src="/example.jpg" alt="Alt" title="Title" width="200" />
<img src="/example.bmp" alt="Alt" height="300" />
```

### [Obsidian Syntax](img-size.html#obsidian-syntax)

Append `widthxheight` after image alt text and use `|` to separate.

Both `width` and `height` should be numbers as pixels and are required. Setting one of them with `0` to scale by ratio with the other.

```
![Alt|200x200](/example.png)
![Alt|200x0](/example.jpg)
![Alt|0x300](/example.bmp)
```

Renders as ↓

```
<img src="/example.png" alt="Alt" width="200" height="300" />
<img src="/example.jpg" alt="Alt" width="200" />
<img src="/example.bmp" alt="Alt" height="300" />
```

### [Legacy Syntax (Deprecated)](img-size.html#legacy-syntax-deprecated)

This may cause rendering issues on platforms like GitHub.

Append `=widthxheight` at the end of image link section with spaces as separator.

Both `width` and `height` should be numbers as pixels and are optional.

```
![Alt](/example.png =200x300)
![Alt](/example.jpg "Title" =200x)
![Alt](/example.bmp =x300)
```

Renders as ↓

```
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="TTitle" width="200" />
<img src="/example.bmp" height="300" />
```

Choosing between 3 Grammars

- The legacy grammar breaks image rendering in environments that don't support it (e.g.: GitHub)
- Both the new grammar and the Obsidian grammar are compatible with the Markdown standard, but new grammar is more natural.

## [Demo](img-size.html#demo)

Demo

![Logo](logo.svg "Markdown")![Logo](logo.svg "Markdown")![Logo](logo.svg "Markdown")

![Logo](logo.svg "Markdown")![Logo](logo.svg "Markdown")![Logo](logo.svg "Markdown")

![Logo](logo.svg)![Logo](logo.svg)![Logo](logo.svg)

```
<!-- New Syntax -->

![Logo =200x200](/logo.svg "Markdown")
![Logo =150x](/logo.svg "Markdown")
![Logo =x100](/logo.svg "Markdown")

<!-- Legacy Syntax -->

![Logo](/logo.svg "Markdown" =200x200)
![Logo](/logo.svg "Markdown" =150x)
![Logo](/logo.svg "Markdown" =x100)

<!-- Obsidian Syntax -->

![Logo|200x200](/logo.svg)
![Logo|150x0](/logo.svg)
![Logo|0x100](/logo.svg)
```[Skip to main content](include.html#main-content)

# @mdit/plugin-include

* * *

Plugin to include other files in markdown.

## [Usage Node.js runtime only](include.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { include } from "@mdit/plugin-include";

const mdIt = MarkdownIt().use(include, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});

mdIt.render("<!-- @include: ./path/to/include/file.md -->", {
  filePath: "path/to/current/file.md",
});
```

JS

```
const MarkdownIt = require("markdown-it");
const { include } = require("@mdit/plugin-include");

const mdIt = MarkdownIt().use(include, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});

mdIt.render("<!-- @include: ./path/to/include/file.md -->", {
  filePath: "path/to/current/file.md",
});
```

Since markdown-it only receive markdown content in `render()` api, so the plugin don't know the file path of current content so don't know where to find the include files.

To solve this, you should pass the information via `env` object, and set `currentPath` in plugin options.

`currentPath` function will receive `env` object and should return path to current file.

Also, to support alias, you can set `resolvePath` in plugin options.

For example, the following code add support for `@src` alias:

```
const MarkdownIt = require("markdown-it");
const { include } = require("@mdit/plugin-include");

const mdIt = MarkdownIt();

mdIt.use(include, {
  currentPath: (env) => env.filePath,
  resolvePath: (path, cwd) => {
    if (path.startsWith("@src")) {
      return path.replace("@src", "path/to/src/folder");
    }

    return path.join(cwd, path);
  },
});
```

Also, by default, images and links in included files will be resolved relative to the imported file, however you can change this behavior by setting `resolveImagePath` and `resolveLinkPath` to `false` in plugin options.

Moreover, the plugin support `deep` function, which will handle nested `@include` in included files if this option is set to `true`.

## [Syntax](include.html#syntax)

Use `<!-- @include: filename -->` to include a file.

To partially import the file, you can specify the range of lines to be included:

- `<!-- @include: filename{start-end} -->`
- `<!-- @include: filename{start-} -->`
- `<!-- @include: filename{-end} -->`

Also you can include file region:

- `<!-- @include: filename#region -->`

File region

File region is a concept in vscode, where the region content is surrounded by `#region` and `#endregion` comments.

Here are some examples:

HTMLMarkdownTSJScssLessSassJavaPythonVisual BasicBatC

HTML

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- region snippet -->
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi,
      repellendus. Voluptatibus alias cupiditate at, fuga tenetur error officiis
      provident quisquam autem, porro facere! Neque quibusdam animi quaerat
      eligendi recusandae eaque.
    </p>
    <!-- endregion snippet -->
    <p>
      Veniam harum illum natus omnis necessitatibus numquam architecto eum
      dignissimos, quos a adipisci et non quam maxime repellendus alias ipsum,
      vero praesentium laborum commodi perferendis velit repellat? Vero,
      cupiditate sequi.
    </p>
  </body>
</html>
```

Markdown

```
## Hello world

<!-- #region snippet -->

Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
inventore iure quo aut doloremque, ipsum ab voluptatem ipsa, velit laborum
illo quae omnis reiciendis hic, ut dolorem non debitis in!

<!-- #endregion snippet -->

Veniam harum illum natus omnis necessitatibus numquam architecto eum
dignissimos, quos a adipisci et non quam maxime repellendus alias ipsum,
vero praesentium laborum commodi perferendis velit repellat? Vero,
cupiditate sequi.
```

TS

```
import MarkdownIt from "markdown-it";
import { include } from "@mdit/plugin-include";

// #region snippet
const mdIt = MarkdownIt().use(include, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
// #endregion snippet

mdIt.render("<!-- @include: ./path/to/include/file.md -->", {
  filePath: "path/to/current/file.md",
});
```

JS

```
const MarkdownIt = require("markdown-it");
const { include } = require("@mdit/plugin-include");

// #region snippet
const mdIt = MarkdownIt().use(include, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
// #endregion snippet

mdIt.render("<!-- @include: ./path/to/include/file.md -->", {
  filePath: "path/to/current/file.md",
});
```

css

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

Less

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

Sass

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

Java

```
public class HelloWorld {
  // #region snippet
  public static void main(String args[]){
    System.out.println("Hello World");
  }
  // #endregion snippet
}
```

Python

```
class MyClass:
    msg = "world"

    #region snippet
    def sayHello(self):
        print("Hello " + self.msg + "!")
    #region snippet

    def sayBye(self):
        print("Bye " + self.msg + "!")
```

Visual Basic

```
Imports System

Module Module1
   # Region snippet
   Sub Main()
     Console.WriteLine("Hello World!")
     Console.WriteLine("Press Enter Key to Exit.")
     Console.ReadLine()
   End Sub
   # EndRegion
End Module
```

Bat

```
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
echo Requesting administrative privileges...
goto UACPrompt
) else ( goto gotAdmin )

::#region snippet
:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B
::#endregion snippet

:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
CD /D "%~dp0"
```

C

```
using System;

namespace HelloWorldApp {

    class Geeks {

        // #region snippet
        static void Main(string[] args) {

            // statement
            // printing Hello World!
            Console.WriteLine("Hello World!");

            // To prevents the screen from
            // running and closing quickly
            Console.ReadKey();
        }
        // #endregion snippet
    }
}
```

Nesting and Escaping

- Nesting is supported by setting `deep: true` in the options, the plugin recursively process the `<!-- @include: -->` syntax for imported Markdown files.
- Escaping can be done by adding zeo-width space (`U+200B` or `&#8203;`) before `<!-- @include: -->` syntax:
  
  ```
  &#8203;<!-- @include: ./demo.snippet.md -->
  ```
  
  will be
  
  ​

## [Options](include.html#options)

```
interface MarkdownItIncludeOptions {
  /**
   * Get current filePath
   *
   * @default (path) => path
   */
  currentPath: (env: any) => string;

  /**
   * handle include filePath
   *
   * @default (path) => path
   */
  resolvePath?: (path: string, cwd: string | null) => string;

  /**
   * Whether deep include files in included Markdown files
   *
   * @default false
   */
  deep?: boolean;

  /**
   * Whether use `<!-- @include: xxx -->` instead of `@include: xxx` to include files
   *
   * @default true
   */
  useComment?: boolean;

  /**
   * Whether resolve the image related path in the included Markdown file
   *
   * @default true
   */
  resolveImagePath?: boolean;

  /**
   * Whether resolve the related file link path in the included Markdown file
   *
   * @default true
   */
  resolveLinkPath?: boolean;
}
```

## [Demo](include.html#demo)

`<!-- @include: ./demo.snippet.md-->`:

## [Heading 2](include.html#heading-2)

Contents containing **bolded text** and some markdown enhance features:

Tips

Hey how are **you**? 😄

`<!-- @include: ./demo.snippet.md{9-13} -->`:

Tips

Hey how are **you**? 😄

`<!-- @include: ./demo.snippet.md#snippet -->`:

Contents containing **bolded text** and some markdown enhance features:

Contents of demo.snippet.md

```
## Heading 2

<!-- #region snippet -->

Contents containing **bolded text** and some markdown enhance features:

<!-- #endregion snippet -->

::: tip

Hey how are **you**? :smile:

:::
```[Skip to main content](index.html#main-content)

![](logo.svg)

# Markdown It Plugins

Some powerful markdown-it plugins

[**abbr**  
\
Abbreviation](abbr.html)

[**alert**  
\
GFM alerts](alert.html)

[**align**  
\
Align contents](align.html)

[**attrs**  
\
Add attrs to Markdown content](attrs.html)

[**container**  
\
Creating block-level custom containers](container.html)

[**demo**  
\
Display snippets and render result both](demo.html)

[**dl**  
\
Definition lists](dl.html)

[**figure**  
\
Generating figures with captions from images](figure.html)

[**footnote**  
\
Support footnotes](footnote.html)

[**icon**  
\
Add icon support](icon.html)

[**img-lazyload**  
\
Add lazy loading for images](img-lazyload.html)

[**img-mark**  
\
Mark images by ID suffix for theme mode](img-mark.html)

[**img-size**  
\
Support setting size for images](img-size.html)

[**include**  
\
Include other files in markdown](include.html)

[**ins**  
\
Ins tag support](ins.html)

[**katex**  
\
Render math expressions with KaTeX](katex.html)

[**mark**  
\
Mark and highlight contents](mark.html)

[**mathjax**  
\
Render math expressions with Mathjax](mathjax.html)

[**plantuml**  
\
Add plantuml diagram support](plantuml.html)

[**ruby**  
\
Add ruby tag support](ruby.html)

[**snippet**  
\
Import code snippets in markdown](snippet.html)

[**spoiler**  
\
Hiding contents](spoiler.html)

[**stylize**  
\
Stylizing tokens](stylize.html)

[**sub**  
\
Support subscript](sub.html)

[**sup**  
\
Support superscript](sup.html)

[**tab**  
\
Creating block-level custom tabs](tab.html)

[**tasklist**  
\
Support tasklist](tasklist.html)

[**tex**  
\
TeX grammar support](tex.html)

[**uml**  
\
Support splitting contents from context](uml.html)[Skip to main content](ins.html#main-content)

# @mdit/plugin-ins

* * *

Plugins to add insert tag support.

## [Usage](ins.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { ins } from "@mdit/plugin-ins";

const mdIt = MarkdownIt().use(ins);

mdIt.render("VuePress Theme Hope is ++very++ powerful.");
```

JS

```
const MarkdownIt = require("markdown-it");
const { ins } = require("@mdit/plugin-ins");

const mdIt = MarkdownIt().use(ins);

mdIt.render("VuePress Theme Hope is ++very++ powerful.");
```

## [Syntax](ins.html#syntax)

Use `++ ++` to add `<ins>` tag.

## [Demo](ins.html#demo)

Demo

VuePress Theme Hope is very powerful.

```
VuePress Theme Hope is ++very++ powerful.
```[Skip to main content](katex.html#main-content)

# @mdit/plugin-katex

* * *

Plugins to render math expressions with KaTeX.

Note

This plugin is based on [@mdit/plugin-tex](tex.html).

## [Usage Node.js runtime only](katex.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { katex } from "@mdit/plugin-katex";

const mdIt = MarkdownIt().use(katex);

mdIt.render("$E=mc^2$");
```

JS

```
const MarkdownIt = require("markdown-it");
const { katex } = require("@mdit/plugin-katex");

const mdIt = MarkdownIt().use(katex);

mdIt.render("$E=mc^2$");
```

We also have a package called `@mdit/plugin-katex-slim` which `katex` is an optional peer.

## [Syntax](katex.html#syntax)

You should use `$tex expression$` inline, and use `$$tex expression$$` for block.

Style

You should import `katex/dist/katex.min.css` from `katex` package or CDN yourself.

Escaping

- You can use `\` to escape `$`:
  
  ```
  Euler’s identity \$e^{i\pi}+1=0$
  ```
  
  will be
  
  Euler’s identity $e^{i\\pi}+1=0$

## [Demo](katex.html#demo)

Euler’s identity eiπ+1=0 is a beautiful formula in R2.

∂r∂ωr(yωω)=(yωω){(log⁡y)r+∑i=1r(−1)Ir⋯(r−i+1)(log⁡y)riωi}

```
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

## [mhchem extension](katex.html#mhchem-extension)

If you want to load the `mhchem` extension, you should import `loadMhchem` from `@mdit/plugin-katex`:

```
import { loadMhchem } from "@mdit/plugin-katex";

await loadMhchem();
```

Since it's async, you should call it in prepare stage as markdown-it rendering is sync.

## [Options](katex.html#options)

```
type KatexLogger<MarkdownItEnv = unknown> = (
  errorCode:
    | "unknownSymbol"
    | "unicodeTextInMathMode"
    | "mathVsTextUnits"
    | "commentAtEnd"
    | "htmlExtension"
    | "newLineInDisplayMode",
  errorMsg: string,
  token: Token,
  env: MarkdownItEnv,
) => "error" | "warn" | "ignore" | boolean | undefined | void;

type TeXTransformer = (content: string, displayMode: boolean) => string;

interface MarkdownItKatexOptions<MarkdownItEnv = unknown> extends KatexOptions {
  /**
   * Whether to allow inline math with spaces on ends
   *
   * @description NOT recommended to set this to true, because it will likely break the default usage of $
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;

  /**
   * Whether parsed fence block with math language to display mode math
   *
   * @default false
   */
  mathFence?: boolean;

  /**
   * Error logger
   */
  logger?: KatexLogger<MarkdownItEnv>;

  /**
   * transformer on output content
   */
  transformer?: TeXTransformer;
}
```

## [Support List](katex.html#support-list)

- [KaTeX Support Features](https://katex.org/docs/supported.html)
- [KaTeX Support List](https://katex.org/docs/support_table.html)

## [Cookbook](katex.html#cookbook)

- [TEX Cookbook](tex.html#cookbook)[Skip to main content](mark.html#main-content)

# @mdit/plugin-mark

* * *

Plugins to mark and highlight contents.

## [Usage](mark.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { mark } from "@mdit/plugin-mark";

const mdIt = MarkdownIt().use(mark);

mdIt.render("VuePress Theme Hope is ==powerful==.");
```

JS

```
const MarkdownIt = require("markdown-it");
const { mark } = require("@mdit/plugin-mark");

const mdIt = MarkdownIt().use(mark);

mdIt.render("VuePress Theme Hope is ==powerful==.");
```

## [Syntax](mark.html#syntax)

Use `== ==` to mark.

## [Demo](mark.html#demo)

Demo

VuePress Theme Hope is powerful.

```
VuePress Theme Hope is ==powerful==.
```[Skip to main content](mathjax.html#main-content)

# @mdit/plugin-mathjax

* * *

Plugins to render math expressions with Mathjax.

Note

This plugin is based on [@mdit/plugin-tex](tex.html).

## [Usage Node.js runtime only](mathjax.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { createMathjaxInstance, mathjax } from "@mdit/plugin-mathjax";

const mathjaxInstance = createMathjaxInstance(options);
const mdIt = MarkdownIt().use(mathjax, mathjaxInstance);

const html = mdIt.render("$E=mc^2$");
const style = mathjaxInstance.outputStyle();
```

JS

```
const MarkdownIt = require("markdown-it");
const { createMathjaxInstance, mathjax } = require("@mdit/plugin-mathjax");

const mathjaxInstance = createMathjaxInstance(options);
const mdIt = MarkdownIt().use(mathjax, mathjaxInstance);

const html = mdIt.render("$E=mc^2$");
const style = mathjaxInstance.outputStyle();
```

This plugin is a bit different from other plugins. It requires you to create a Mathjax instance with options first, and then pass it to the plugin.

You can set the following options:

```
interface MarkdownItMathjaxOptions {
  /**
   * Output syntax
   *
   * @default 'svg'
   */

  output?: "chtml" | "svg";

  /**
   * Whether to allow inline math with spaces on ends
   *
   * @description NOT recommended to set this to true, because it will likely break the default usage of $
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;

  /**
   * Whether parsed fence block with math language to display mode math
   *
   * @default false
   */
  mathFence?: boolean;

  /**
   * Enable A11y
   *
   * @default true
   */
  a11y?: boolean;

  /**
   * TeX input options
   */
  tex?: MathJaxTexInputOptions;

  /**
   * Common HTML output options
   */
  chtml?: MathjaxCommonHTMLOutputOptions;

  /**
   * SVG output options
   */
  svg?: MathjaxSVGOutputOptions;
}
```

The instance holds render content of each calls, so you should:

- Call `mathjaxInstance.reset()` before each render in different pages, this ensure things like label are reset.
- Call `mathjaxInstance.outputStyle()` after all rendering is done, to get final CSS content.
- Call `mathjaxInstance.clearStyle()` to clear existing style cache if necessary.

We also have a package called `@mdit/plugin-mathjax-slim` which `mathjax-full` is an optional peer dep.

## [Syntax](mathjax.html#syntax)

You should use `$tex expression$` inline, and use `$$tex expression$$` for block.

Escaping

- You can use `\` to escape `$`:
  
  ```
  Euler’s identity \$e^{i\pi}+1=0$
  ```
  
  will be
  
  Euler’s identity $e^{i\\pi}+1=0$

## [Demo](mathjax.html#demo)

Demo

Euler’s identity eiπ+1=0 is a beautiful formula in R2.

∂r∂ωr(yωω)=(yωω){(log⁡y)r+∑i=1r(−1)Ir⋯(r−i+1)(log⁡y)riωi}

```
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

## [Support List](mathjax.html#support-list)

- [Supported TeX/LaTeX commands](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## [Cookbook](mathjax.html#cookbook)

- [TEX Cookbook](tex.html#tex-tutorial)[Skip to main content](plantuml.html#main-content)

# @mdit/plugin-plantuml

* * *

Plugin to support plant uml base on [@mdit/plugin-uml](uml.html).

## [Usage](plantuml.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { plantuml } from "@mdit/plugin-plantuml";

const mdIt = MarkdownIt().use(plantuml);

mdIt.render(`\
@startuml
Bob -> Alice : hello
@enduml
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { plantuml } = require("@mdit/plugin-plantuml");

const mdIt = MarkdownIt().use(plantuml);

mdIt.render(`\
@startuml
Bob -> Alice : hello
@enduml
`);
```

## [Demo](plantuml.html#demo)

demo

![](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80)

```
@startuml
Bob -> Alice : hello
@enduml
```

## [Options](plantuml.html#options)

```
interface MarkdownItPlantumlOptions {
  /**
   * Plantuml parse type
   *
   * @default "uml"
   */
  type?: "uml" | "fence";

  /**
   * diagram type
   *
   * @description Only available when using default srcGetter
   *
   * @default "uml"
   */
  name?: string;

  /**
   * Fence info
   *
   * @default name
   */
  fence?: string;

  /**
   * Opening marker
   *
   * @description only available with type "uml"
   *
   * @default "start" + name
   */
  open?: string;

  /**
   * Closing marker
   *
   * @description only available with type "uml"
   */
  close?: string;

  /**
   * Plantuml server
   *
   * @description Only available when using default srcGetter
   *
   * @default "https://www.plantuml.com/plantuml"
   */
  server?: string;

  /**
   * Image format
   *
   * @description Only available when using default srcGetter
   *
   * @default "svg"
   */
  format?: string;

  /**
   * Image src getter
   *
   * @param content diagram content
   * @returns image link
   */
  srcGetter?: (content: string) => string;

  /**
   * Diagram renderer
   */
  render?: RenderRule;
}
```[Skip to main content](ruby.html#main-content)

# @mdit/plugin-ruby

* * *

Plugin to support ruby annotation `<ruby>`.

## [Usage](ruby.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { ruby } from "@mdit/plugin-ruby";

const mdIt = MarkdownIt().use(ruby);

mdIt.render("{中国:zhōng|guó}");
```

JS

```
const MarkdownIt = require("markdown-it");
const { ruby } = require("@mdit/plugin-ruby");

const mdIt = MarkdownIt().use(ruby);

mdIt.render("{中国:zhōng|guó}");
```

## [Syntax](ruby.html#syntax)

Use `{ruby base:ruby text1|ruby text2|...}` to add ruby annotation.

Escaping

- You can use `\` to escape `{` `:` or `}`:
  
  ```
  \{中国:zhōng|guó}
  ```
  
  will be
  
  {中国:zhōng|guó}

## [Demo](ruby.html#demo)

`{中国:zhōng|guó}`: 中zhōng国guó[Skip to main content](snippet.html#main-content)

# @mdit/plugin-snippet

* * *

Plugin to import code snippets in markdown.

## [Usage Node.js runtime only](snippet.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { snippet } from "@mdit/plugin-snippet";

const mdIt = MarkdownIt().use(snippet, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});

mdIt.render("<<< example.ts", {
  filePath: "path/to/current/file.md",
});
```

JS

```
const MarkdownIt = require("markdown-it");
const { snippet } = require("@mdit/plugin-snippet");

const mdIt = MarkdownIt().use(snippet, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});

mdIt.render("<<< example.js", {
  filePath: "path/to/current/file.md",
});
```

Since markdown-it only receive markdown content in `render()` api, so the plugin don't know the file path of current content so don't know where to find the snippet files.

To solve this, you should pass the information via `env` object, and set `currentPath` in plugin options.

`currentPath` function will receive `env` object and should return path to current file.

Also, to support alias, you can set `resolvePath` in plugin options.

For example, the following code add support for `@src` alias:

```
const MarkdownIt = require("markdown-it");
const { snippet } = require("@mdit/plugin-snippet");

const mdIt = MarkdownIt();

mdIt.use(snippet, {
  currentPath: (env) => env.filePath,
  resolvePath: (path, cwd) => {
    if (path.startsWith("@src")) {
      return path.replace("@src", "path/to/src/folder");
    }

    return path.join(cwd, path);
  },
});
```

## [Syntax](snippet.html#syntax)

Use `<<< filename` to snippet code snippets. If you want to highlight specific lines, you can use `{lines}` to do that.

Also you can snippet file region with `#regionName` at end.

E.g.:

- `<<< example.html` import `example.html` as snippet
- `<<< example.js{1,3,7-9}`. import `example.js` as snippet and highlight lines 1, 3, 7 to 9
- `<<< example.css#normalize` import region `normalize` in `example.css`
- `<<< example.ts#plugin{2-5}` import region `plugin` in `example.ts` and highlight lines 1 to 3

Note

Line highlight should be supported by other plugins, the plugin only provides information to code fence info.

File region

File region is a concept in vscode, where the region content is surrounded by `#region` and `#endregion` comments.

Here are some examples:

HTMLMarkdownTSJScssLessSassJavaPythonVisual BasicBatC

HTML

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- region snippet -->
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi,
      repellendus. Voluptatibus alias cupiditate at, fuga tenetur error officiis
      provident quisquam autem, porro facere! Neque quibusdam animi quaerat
      eligendi recusandae eaque.
    </p>
    <!-- endregion snippet -->
    <p>
      Veniam harum illum natus omnis necessitatibus numquam architecto eum
      dignissimos, quos a adipisci et non quam maxime repellendus alias ipsum,
      vero praesentium laborum commodi perferendis velit repellat? Vero,
      cupiditate sequi.
    </p>
  </body>
</html>
```

Markdown

```
## Hello world

<!-- #region snippet -->

Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
inventore iure quo aut doloremque, ipsum ab voluptatem ipsa, velit laborum
illo quae omnis reiciendis hic, ut dolorem non debitis in!

<!-- #endregion snippet -->

Veniam harum illum natus omnis necessitatibus numquam architecto eum
dignissimos, quos a adipisci et non quam maxime repellendus alias ipsum,
vero praesentium laborum commodi perferendis velit repellat? Vero,
cupiditate sequi.
```

TS

```
import MarkdownIt from "markdown-it";
import { snippet } from "@mdit/plugin-snippet";

// #region snippet
const mdIt = MarkdownIt().use(snippet, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
// #endregion snippet

mdIt.render("@snippet(./path/to/snippet/file.md)", {
  filePath: "path/to/current/file.md",
});
```

JS

```
const MarkdownIt = require("markdown-it");
const { snippet } = require("@mdit/plugin-snippet");

// #region snippet
const mdIt = MarkdownIt().use(snippet, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
// #endregion snippet

mdIt.render("@snippet(./path/to/snippet/file.md)", {
  filePath: "path/to/current/file.md",
});
```

css

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

Less

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

Sass

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

Java

```
public class HelloWorld {
  // #region snippet
  public static void main(String args[]){
    System.out.println("Hello World");
  }
  // #endregion snippet
}
```

Python

```
class MyClass:
    msg = "world"

    #region snippet
    def sayHello(self):
        print("Hello " + self.msg + "!")
    #region snippet

    def sayBye(self):
        print("Bye " + self.msg + "!")
```

Visual Basic

```
Imports System

Module Module1
   # Region snippet
   Sub Main()
     Console.WriteLine("Hello World!")
     Console.WriteLine("Press Enter Key to Exit.")
     Console.ReadLine()
   End Sub
   # EndRegion
End Module
```

Bat

```
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
echo Requesting administrative privileges...
goto UACPrompt
) else ( goto gotAdmin )

::#region snippet
:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B
::#endregion snippet

:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
CD /D "%~dp0"
```

C

```
using System;

namespace HelloWorldApp {

    class Geeks {

        // #region snippet
        static void Main(string[] args) {

            // statement
            // printing Hello World!
            Console.WriteLine("Hello World!");

            // To prevents the screen from
            // running and closing quickly
            Console.ReadKey();
        }
        // #endregion snippet
    }
}
```

Escaping

- You can escape `<` by `\`
  
  ```
  \<<< test.js
  ```
  
  will be
  
  &lt;&lt;&lt; test.js

## [Options](snippet.html#options)

```
interface MarkdownItSnippetOptions {
  /**
   * Get current filePath
   *
   * @default (path) => path
   */
  currentPath: (env: any) => string;

  /**
   * handle include filePath
   *
   * @default (path) => path
   */
  resolvePath?: (path: string, cwd: string | null) => string;
}
```

## [Demo](snippet.html#demo)

`<<< @snippets/example.css`:

```
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}

/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

`<<< @snippets/example.ts#snippet`:

```
const mdIt = MarkdownIt().use(snippet, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
```

`<<< @snippets/example.html#snippet{2-5}`:

```
<p>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi,
  repellendus. Voluptatibus alias cupiditate at, fuga tenetur error officiis
  provident quisquam autem, porro facere! Neque quibusdam animi quaerat
  eligendi recusandae eaque.
</p>
```[Skip to main content](spoiler.html#main-content)

# @mdit/plugin-spoiler

* * *

Plugins to hide content.

## [Usage](spoiler.html#usage)

TSJS

TS

```
import MarkdownIt from "spoilerdown-it";
import { spoiler } from "@mdit/plugin-spoiler";

const mdIt = MarkdownIt().use(spoiler);

mdIt.render("VuePress Theme Hope is !!powerful!!.");
```

JS

```
const MarkdownIt = require("spoilerdown-it");
const { spoiler } = require("@mdit/plugin-spoiler");

const mdIt = MarkdownIt().use(spoiler);

mdIt.render("VuePress Theme Hope is !!powerful!!.");
```

With the default options, you can import `@mdit/plugin-spoiler/style` to apply styles.

## [Syntax](spoiler.html#syntax)

Use `!! !!` hide contents.

## [Demo](spoiler.html#demo)

Demo

VuePress Theme Hope is powerful.

```
VuePress Theme Hope is !!powerful!!.
```

## [Options](spoiler.html#options)

```
export interface MarkdownItSpoilerOptions {
  /**
   * @default "span"
   */
  tag?: string;

  /**
   * @default [["class", "spoiler"], ["tabindex","-1"]]
   */
  attrs?: [string, string][];
}
```[Skip to main content](stylize.html#main-content)

# @mdit/plugin-stylize

* * *

Plugin for stylizing tokens.

## [Usage](stylize.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { stylize } from "@mdit/plugin-stylize";

const mdIt = MarkdownIt().use(stylize, {
  config: [
    // your options
  ],
});

mdIt.render("Check FAQ for more details._Recommended_");
```

JS

```
const MarkdownIt = require("markdown-it");
const { stylize } = require("@mdit/plugin-stylize");

const mdIt = MarkdownIt().use(stylize, {
  config: [
    // your options
  ],
});

mdIt.render("Check FAQ for more details._Recommended_");
```

The `config` option receives an array, where each element accepts 2 options:

- `matcher`: should be `string` or `RegExp`.
- `replacer`: a function customizing the matched token

For example, you can use the following config to transform `*Recommended*` into a Badge `<Badge type="tip">Recommended</Badge>`:

```
mdIt.use(stylize, {
  config: [
    {
      matcher: "Recommended",
      replacer: ({ tag }) => {
        if (tag === "em")
          return {
            tag: "Badge",
            attrs: { type: "tip" },
            content: "Recommended",
          };
      },
    },
  ],
});
```

Another example is you want a to set all the emphasis `n’t` words to red color, so that `Setting this to a invalid syntax *doesn’t* have any effect.` becomes: "Setting this to a invalid syntax doesn’t have any effect."

```
mdIt.use(stylize, {
  config: [
    {
      matcher: /n’t$/,
      replacer: ({ tag, attrs, content }) => {
        if (tag === "em")
          return {
            tag: "span",
            attrs: { ...attrs, style: "color: red" },
            content,
          };
      },
    },
  ],
});
```

Also, we provide a `localConfigGetter` to receive env object in case you want to apply local rules in certain situations.

```
mdIt.use(stylize, {
  localConfigGetter: (env) => env.stylize || [],
});

mdIt.render("Check FAQ for more details._Recommended_", {
  stylize: [
    {
      matcher: "Recommended",
      replacer: ({ tag }) => {
        if (tag === "em")
          return {
            tag: "Badge",
            attrs: { type: "tip" },
            content: "Recommended",
          };
      },
    },
  ],
});
```

Performance

To avoid performance impact, you should try to avoid using RegExp for better performance unless you need it.

Also try to create snippets with RegExp having lower costs, e.g: RegExp starting with `^` and ending with `$`.

For example, if you only want to match "SHOULD", "MUST" and "MAY", you should write `/^(?:SHOULD|M(?:UST|AY))$/u` instead of `/SHOULD|MUST|MAY/u`. The fist one will only match 2 time with "A loo...oong content" with 1000 characters, but will match nearly 3000 times with the second RegExp.

## [Options](stylize.html#options)

```
interface MarkdownItStylizeResult {
  /**
   * Tag name
   */
  tag: string;

  /**
   * Attributes settings
   */
  attrs: Record<string, string>;

  /**
   * Tag content
   */
  content: string;
}

interface MarkdownItStylizeConfig {
  /**
   * Inline token matcher
   */
  matcher: string | RegExp;

  /**
   * Content Replacer
   */
  replacer: (options: {
    tag: string;
    content: string;
    attrs: Record<string, string>;
    env?: any;
  }) => MarkdownItStylizeResult | void;
}

interface MarkdownItStylizeOptions {
  /**
   * Stylize config
   */
  config?: MarkdownItStylizeConfig[];

  /**
   * Local config getter
   *
   * @param env Markdown env object
   * @returns local stylize config
   */
  localConfigGetter?: (env?: any) => MarkdownItStylizeConfig[] | null;
}
```[Skip to main content](sub.html#main-content)

# @mdit/plugin-sub

* * *

Plugin to support subscript.

## [Usage](sub.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { sub } from "@mdit/plugin-sub";

const mdIt = MarkdownIt().use(sub);

mdIt.render("H~2~O");
```

JS

```
const MarkdownIt = require("markdown-it");
const { sub } = require("@mdit/plugin-sub");

const mdIt = MarkdownIt().use(sub);

mdIt.render("H~2~O");
```

## [Syntax](sub.html#syntax)

Use `~ ~` to mark the subscript.

Escaping

- You can use `\` to escape `~`:
  
  ```
  H\~2~O
  ```
  
  will be
  
  H\~2\~O

## [Demo](sub.html#demo)

`H~2~O`: H2O[Skip to main content](sup.html#main-content)

# @mdit/plugin-sup

* * *

Plugin to support superscript.

## [Usage](sup.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { sup } from "@mdit/plugin-sup";

const mdIt = MarkdownIt().use(sup);

mdIt.render("19^th^");
```

JS

```
const MarkdownIt = require("markdown-it");
const { sup } = require("@mdit/plugin-sup");

const mdIt = MarkdownIt().use(sup);

mdIt.render("19^th^");
```

## [Syntax](sup.html#syntax)

Use `^ ^` to mark the superscript.

Escaping

- You can use `\` to escape `^`:
  
  ```
  19\^th^
  ```
  
  will be
  
  19^th^

## [Demo](sup.html#demo)

`19^th^`: 19th[Skip to main content](tab.html#main-content)

# @mdit/plugin-tab

* * *

Plugin for creating block-level custom tabs.

## [Usage](tab.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { tab } from "@mdit/plugin-tab";

const mdIt = MarkdownIt().use(tab, {
  // your options, name is required
  name: "tabs",
});

mdIt.render("content");
```

JS

```
const MarkdownIt = require("markdown-it");
const { tab } = require("@mdit/plugin-tab");

const mdIt = MarkdownIt().use(tab, {
  // your options, name is required
  name: "tabs",
});

mdIt.render("content");
```

With this plugin, you can create tabs container with `::: name` and `:::`, with `name` is the value you set as name.

In this container, you can use `@tab` marker to mark and separate tab contents.

`@tab` marker can be followed by a text, which will be used as tab title, and you can use `@tab:active` to mark the tab with default active state.

Any contents after a `@tab` marker and before container closing marker or new `@tab` marker will be considered as tab content. And contents before first `@tab` marker will be dropped.

To support global tab switching state, the plugin allows you to add an id suffix in `tabs` container, which will be used as tab id, and Also allows you to add an id suffix in `@tab` marker, which will be used as tab value. So it's possible for you to make all tabs with same id share same switch event.

By default the plugin renders related tabs dom for you, if you want to customize the rendering, you can pass `tabsOpenRenderer`, `tabsCloseRenderer`, `tabOpenRenderer` and `tabCloseRenderer` to the plugin options.

`tabsOpenRenderer` and `tabOpenRenderer` receives extra information as first args, see [Options](tab.html#options) for more details.

The plugin doesn't provide any styles, and will not register any events, so that you should add styles and events by yourself.

Nesting and escaping

- Nesting is **not** supported because `@tab` does not contain any information about what tab container it's marking.
- If you need to use `@tab` at the beginning of the line, you can use `\` to escape it to `\@tab`
- If your tab title contain `#`, you can escape it with `\`:
  
  ```
  @tab c\#
  ```

## [Options](tab.html#options)

```
interface MarkdownItTabData {
  /**
   * Title of tab
   */
  title: string;

  /**
   * Tab index
   */
  index: number;

  /**
   * Identifier of tab
   */
  id?: string;

  /**
   * Whether the tab is active
   */
  isActive?: boolean;
}

interface MarkdownItTabInfo {
  /**
   * Which tab is active
   *
   * @description -1 means no tab is active
   */
  active: number;

  /**
   * Data of tabs
   */
  data: MarkdownItTabData[];
}

interface MarkdownItTabOptions {
  /**
   * The name of the tab container.
   */
  name: string;

  /**
   * Tabs open renderer
   */
  tabsOpenRenderer?: (
    info: MarkdownItTabInfo,
    tokens: Token[],
    index: number,
    options: Options,
    env: any,
    self: Renderer,
  ) => string;

  /**
   * Tabs close renderer
   */
  tabsCloseRenderer?: RenderRule;

  /**
   * tab open renderer
   */
  tabOpenRenderer?: (
    data: MarkdownItTabData,
    tokens: Token[],
    index: number,
    options: Options,
    env: any,
    self: Renderer,
  ) => string;

  /**
   * tab close renderer
   */
  tabCloseRenderer?: RenderRule;
}
```

## [Demo](tab.html#demo)

A tab of fruit

applebanana

apple

Apple

banana

Banana

```
::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::
```

Another tab of fruit

applebananaorange

apple

Apple

banana

Banana

orange

Orange

```
::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
```

A tab of fruit without id

applebananaorange

apple

Apple

banana

Banana

orange

Orange

```
::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
```[Skip to main content](tasklist.html#main-content)

# @mdit/plugin-tasklist

* * *

Plugins to support tasklist.

## [Usage](tasklist.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { tasklist } from "@mdit/plugin-tasklist";

const mdIt = MarkdownIt().use(tasklist, {
  // your options, optional
});

mdIt.render(`\
- [x] task 1
- [ ] task 2
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { tasklist } = require("@mdit/plugin-tasklist");

const mdIt = MarkdownIt().use(tasklist, {
  // your options, optional
});

mdIt.render(`\
- [x] task 1
- [ ] task 2
`);
```

## [Syntax](tasklist.html#syntax)

- Use `- [ ] some text` to render a unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

## [Options](tasklist.html#options)

```
interface MarkdownItTasklistOptions {
  /**
   * Whether disable checkbox
   *
   * @default true
   */
  disabled?: boolean;

  /**
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;

  /**
   * Class for tasklist container
   *
   * @default 'task-list-container'
   */
  containerClass?: string;

  /**
   * Class for tasklist item
   *
   * @default 'task-list-item'
   */
  itemClass?: string;

  /**
   * Class for tasklist item label
   *
   * @default 'task-list-item-label'
   */
  labelClass?: string;

  /**
   * Class for tasklist item checkbox
   *
   * @default 'task-list-item-checkbox'
   */
  checkboxClass?: string;
}
```

## [Demo](tasklist.html#demo)

Demo

- Plan A
- Plan B

```
- [ ] Plan A
- [x] Plan B
```[Skip to main content](tex.html#main-content)

# @mdit/plugin-tex

* * *

Plugins for TEX grammar support.

Note

This plugin is facing developers.

If you are looking for an out of box solution, you should try [@mdit/plugin-katex](katex.html) and [@mdit/plugin-mathjax](mathjax.html), which are based on this plugin.

## [Usage](tex.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { figure } from "@mdit/plugin-figure";

const mdIt = MarkdownIt().use(figure, {
  render: (content, displayMode) => {
    // render tex here and return
  },
});

mdIt.render("$E=mc^2$");
```

JS

```
const MarkdownIt = require("markdown-it");
const { figure } = require("@mdit/plugin-figure");

const mdIt = MarkdownIt().use(figure, {
  render: (content, displayMode) => {
    // render tex here and return
  },
});

mdIt.render("$E=mc^2$");
```

This plugin registers markdown rules for TEX. It will replace the TEX tokens with the result of `render` function.

## [Syntax](tex.html#syntax)

- Inline mode: `$xxx$`
- Display mode:
  
  ```
  $$xxx$$
  
  $$
  xxx
  $$
  ```

Escaping

Escaping can be done by using `\` before the `$` character, or adding space both before and after the `$` character:

- The a=1 is a TeX equation, while $ a=1 $ and $a=1$ is not.

```
- The $a=1$ is a TeX equation, while $ a=1 $ and \$a=1$ is not.
```

## [Options](tex.html#options)

```
interface MarkdownItTexOptions {
  /**
   * Whether parsed fence block with math language to display mode math
   *
   * @default false
   */
  mathFence?: boolean;

  /**
   * Tex Render function
   *
   * @param content Text content
   * @param displayMode whether is display mode
   * @param env MarkdownIt environment
   * @returns render result
   */
  render: (content: string, displayMode: boolean, env: MarkdownItEnv) => string;

  /**
   * Whether to allow inline math with spaces on ends
   *
   * @description NOT recommended to set this to true, because it will likely break the default usage of $
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;
}
```

## [Demo](tex.html#demo)

Euler’s identity eiπ+1=0 is a beautiful formula in R2.

```
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

∂r∂ωr(yωω)=(yωω){(log⁡y)r+∑i=1r(−1)Ir⋯(r−i+1)(log⁡y)riωi}

```
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

## [Tex Tutorial](tex.html#tex-tutorial)

### [Operator](tex.html#operator)

- Some operators can be entered directly in math mode; others need to be generated using control sequences:
  
  - `+`: +
  - `-`: −
  - `\times`: ×
  - `\ div`: ÷
  - `=`: =
  - `\pm`: ±
  - `\cdot`: ⋅
  - `\cup`: ∪
  - `\geq`: ≥
  - `\leq`: ≤
  - `\neq`: ≠
  - `\approx`: ≈
  - `\equiv`: ≡
  - `\quad`: (blank separator)
- Radical: `\sqrt{xxx}` xxx
- Fraction `\frac{aaa}{bbb}` aaabbb (the first parameter is the numerator and the second is the denominator).
- Sum: `\sum` ∑
- Tandem: `\prod` ∏
- Limit: `\lim` lim
- Points: `\int` ∫
- Multiple points:
  
  - `\iint`: ∬
  - `\iiint`: ∭
  - `\iiiint`: ⨌
  - `\idotsint` ∫⋯∫

Tips

Large operators such as continuous addition, multiplication, limits, and integrals can use `\limits` and `\nolimits` to force explicitly specify compress these superscripts or not.

`\varoiint`, `\sqint`, `\sqiint`, `\ointctrclockwise`, `\ointclockwise`, `\varointclockwise`, `\varointctrclockwise`, `\fint`, `\landupint`, `\landdownint` are not supported currently.

Case

x, 12.

∑i=1ni∏i=1n

∑i=1ni∏i=1n

∬12x2∭12x2⨌12x2∫⋯∫12x2

∬12x2∭12x2⨌12x2∫⋯∫12⁡x2

∬12x2∭12x2⨌12x2∫⋯∫12x2

```
$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\; \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\; \prod\limits _{i=1}^n$

$\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2$

$\iint\limits_1^2 x^2\; \iiint\limits_1^2 x^2\; \iiiint\limits_1^2 x^2\; \idotsint\limits_1^2 x^2$

$$\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2$$
```

### [Symbol](tex.html#symbol)

- English letters can be entered directly
  
  abcxyzABC
  
  ```
  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$
  ```
- Greek characters use `\characterName` to enter symbols, and output capital letters when the first letter is capitalized.
  
  αβγΩΔΓ
  
  ```
  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$
  ```
- Other mathematical expressions can be used correspondingly
  
  loga⁡b∂x
  
  ```
  $\log_{a}{b} \quad \partial x$
  ```

### [Superscript and Subscript](tex.html#superscript-and-subscript)

- Superscript, use `^` to achieve
- Subscript, use `_` to achieve
- By default, superscript and subscript only apply to the next character. To work with multiple consecutive characters, please enclose these characters in curly brackets `{}`.

Einstein ’s E=mc2.

210&gt;1000

```
Einstein ’s $E=mc^2$.

$2^{10} > 1000$
```

### [Delimiters (parentheses, etc.)](tex.html#delimiters-parentheses-etc)

Various parentheses are represented by commands such as `()`, `[]`, `\{\}`, `\langle\rangle`.

Tips

Note that curly braces are usually used to enter command and environment parameters, so they must be preceded by `\` in mathematical formulas.

Because the application of `|` and `\|` in LaTeX is too casual, we recommend using `\lvert\rvert` and `\ lVert\rVert` instead.

To adjust the size of these delimiters, we recommend using `\big`, `\Big`, `\bigg`, `\Bigg` and a series of commands to adjust the size before the above brackets.

(((((x)))))\[\[\[\[\[x]]]]]{{{{{x}}}}}⟨⟨⟨⟨⟨x⟩⟩⟩⟩⟩|||||x|||||‖‖‖‖‖x‖‖‖‖‖

```
$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$
$\Biggl[\biggl[\Bigl[\bigl[[x]\bigr]\Bigr]\biggr]\Biggr]$
$\Biggl \{\biggl \{\Bigl \{\bigl \{\{x\}\bigr \}\Bigr \}\biggr \}\Biggr\}$
$\Biggl\langle\biggl\langle\Bigl\langle\bigl\langle\langle x
\rangle\bigr\rangle\Bigr\rangle\biggr\rangle\Biggr\rangle$
$\Biggl\lvert\biggl\lvert\Bigl\lvert\bigl\lvert\lvert x
\rvert\bigr\rvert\Bigr\rvert\biggr\rvert\Biggr\rvert$
$\Biggl\lVert\biggl\lVert\Bigl\lVert\bigl\lVert\lVert x
\rVert\bigr\rVert\Bigr\rVert\biggr\rVert\Biggr\rVert$
```

### [Ellipsis](tex.html#ellipsis)

The ellipsis is represented by commands such as `\dots`,`\cdots`, `\vdots`,`\ddots`.

Tips

`\dots` and`\cdots` have different vertical positions. The former is generally used for subscripted sequences.

x1,x2,…,xn1,2,⋯,n⋮⋱

```
$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$
```

### [Matrix](tex.html#matrix)

`pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` and other environments can add various separators on both sides of the matrix.

(abcd)\[abcd]{abcd}|abcd|‖abcd‖

```
$$
\begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix}
$$
```

Using the `smallmatrix` environment, you can generate small matrices of inline formulas.

A small matrix: (abcd).

```
A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.
```

### [Multi-line Formula](tex.html#multi-line-formula)

- **newline**
  
  Use `\\` or `\newline` to wrap
  
  x=a+b+c+d+e+f+gx=a+b+c+d+e+f+g
  
  ```
  $$
  x = a+b+c+ \\
  d+e+f+g
  $$
  
  $$
  x = a+b+c+ \newline
  d+e+f+g
  $$
  ```
- **Alignment**
  
  You can use the `aligned` environment to achieve alignment, and`&`to identify fixed anchor points
  
  x=a+b+c+d+e+f+g10x+3y=23x+13y=4
  
  ```
  $$
  \begin{aligned}
  x ={}& a+b+c+{} \\
  &d+e+f+g
  \end{aligned}
  $$
  
  $$
  \begin{alignedat}{2}
     10&x+ &3&y = 2 \\
     3&x+&13&y = 4
  \end{alignedat}
  $$
  ```

### [Formula Group](tex.html#formula-group)

Formula groups that do not require alignment can use the `gather` environment.

a=b+c+dx=y+z

```
$$
\begin{gathered}
a = b+c+d \\
x = y+z
\end{gathered}
$$
```

### [Numbering](tex.html#numbering)

(1)x+y2x1x+y2x

```
$\tag{1} x+y^{2x}$

$\tag*{1} x+y^{2x}$
```

### [Segmented Functions](tex.html#segmented-functions)

Use `case` environment

y={−x,x≤0x,x&gt;0

```
$$
y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases}
$$
```

### [Text](tex.html#text)

To insert text in TeX, you should use `\text{}` to wrap them.[Skip to main content](uml.html#main-content)

# @mdit/plugin-uml

* * *

Plugin to support splitting contents from context.

## [Usage](uml.html#usage)

TSJS

TS

```
import MarkdownIt from "markdown-it";
import { uml } from "@mdit/plugin-uml";

const mdIt = MarkdownIt().use(uml, {
  name: 'demo'
  open: 'demostart',
  close: 'demoend',
  render: (tokens, index) => {
    // render content here
  },
});

mdIt.render(`\
@demostart
Content
Another content
@demoend
`);
```

JS

```
const MarkdownIt = require("markdown-it");
const { uml } = require("@mdit/plugin-uml");

const mdIt = MarkdownIt().use(uml, {
  name: 'demo'
  open: 'demostart',
  close: 'demoend',
  render: (tokens, index) => {
    // render content here
  },
});

mdIt.render(`\
@demostart
Content
Another content
@demoend
`);
```

This plugin will extract content between `@openmarker` and `@closemarker` into a single token, then render it with `render` function.

Tips

The plugin is different from container plugin as contents inside container will be parsed as markdown, but contents inside uml will be parsed as plain text and transform in to a single token.

Escaping

- You can use `\` to escape `@`, so the following won't be parsed:
  
  ```
  \@demostart
  
  \@demoend
  ```

## [Options](uml.html#options)

```
interface MarkdownItUMLOptions {
  /**
   * UML name
   */
  name: string;

  /**
   * Opening marker
   */
  open: string;

  /**
   *  Closing marker
   */
  close: string;

  /**
   * Render function
   */
  render: RenderRule;
}
```