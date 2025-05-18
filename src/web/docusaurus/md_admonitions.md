# Admonitions

In addition to the basic Markdown syntax, we have a special admonitions syntax by wrapping text with a set of 3 colons, followed by a label denoting its type.

Example:

```md
:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

http://localhost:3000

note

Some **content** with *Markdown* `syntax`. Check [this `api`](#).

tip

Some **content** with *Markdown* `syntax`. Check [this `api`](#).

info

Some **content** with *Markdown* `syntax`. Check [this `api`](#).

warning

Some **content** with *Markdown* `syntax`. Check [this `api`](#).

danger

Some **content** with *Markdown* `syntax`. Check [this `api`](#).

## Usage with Prettier[​](#usage-with-prettier "Direct link to Usage with Prettier")

If you use [Prettier](https://prettier.io) to format your Markdown files, Prettier might auto-format your code to invalid admonition syntax. To avoid this problem, add empty lines around the starting and ending directives. This is also why the examples we show here all have empty lines around the content.

```md
<!-- Prettier doesn't change this -->
:::note

Hello world

:::

<!-- Prettier changes this -->
:::note
Hello world
:::

<!-- to this -->
::: note Hello world:::
```

## Specifying title[​](#specifying-title "Direct link to Specifying title")

You may also specify an optional title.

```md
:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with some _Markdown_ `syntax`.

:::
```

http://localhost:3000

Your Title **with** some *Markdown* `syntax`!

Some **content** with some *Markdown* `syntax`.

## Nested admonitions[​](#nested-admonitions "Direct link to Nested admonitions")

Admonitions can be nested. Use more colons `:` for each parent admonition level.

```md
:::::info[Parent]

Parent content

::::danger[Child]

Child content

:::tip[Deep Child]

Deep child content

:::

::::

:::::
```

http://localhost:3000

Parent

Parent content

Child

Child content

Deep Child

Deep child content

## Admonitions with MDX[​](#admonitions-with-mdx "Direct link to Admonitions with MDX")

You can use MDX inside admonitions too!

```jsx
import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

:::tip[Use tabs in admonitions]

<Tabs>
  <TabItem value="apple" label="Apple">This is an apple 🍎</TabItem>
  <TabItem value="orange" label="Orange">This is an orange 🍊</TabItem>
  <TabItem value="banana" label="Banana">This is a banana 🍌</TabItem>
</Tabs>

:::
```

http://localhost:3000

Use tabs in admonitions

- Apple
- Orange
- Banana

This is an apple 🍎

This is an orange 🍊

This is a banana 🍌

## Usage in JSX[​](#usage-in-jsx "Direct link to Usage in JSX")

Outside of Markdown, you can use the `@theme/Admonition` component to get the same output.

MyReactPage.jsx

```jsx
import Admonition from '@theme/Admonition';

export default function MyReactPage() {
  return (
    <div>
      <Admonition type="info">
        <p>Some information</p>
      </Admonition>
    </div>
  );
}
```

The types that are accepted are the same as above: `note`, `tip`, `danger`, `info`, `warning`. Optionally, you can specify an icon by passing a JSX element or a string, or a title:

MyReactPage.jsx

```jsx
<Admonition type="tip" icon="💡" title="Did you know...">
  Use plugins to introduce shorter syntax for the most commonly used JSX
  elements in your project.
</Admonition>
```

http://localhost:3000

💡Did you know...

Use plugins to introduce shorter syntax for the most commonly used JSX elements in your project.

## Customizing admonitions[​](#customizing-admonitions "Direct link to Customizing admonitions")

There are two kinds of customizations possible with admonitions: **parsing** and **rendering**.

### Customizing rendering behavior[​](#customizing-rendering-behavior "Direct link to Customizing rendering behavior")

You can customize how each individual admonition type is rendered through [swizzling](/docs/swizzling). You can often achieve your goal through a simple wrapper. For example, in the follow example, we swap out the icon for `info` admonitions only.

src/theme/Admonition.js

```jsx
import React from 'react';
import Admonition from '@theme-original/Admonition';
import MyCustomNoteIcon from '@site/static/img/info.svg';

export default function AdmonitionWrapper(props) {
  if (props.type !== 'info') {
    return <Admonition title="My Custom Admonition Title" {...props} />;
  }
  return <Admonition icon={<MyCustomNoteIcon />} {...props} />;
}
```

### Customizing parsing behavior[​](#customizing-parsing-behavior "Direct link to Customizing parsing behavior")

Admonitions are implemented with a [Remark plugin](/docs/markdown-features/plugins). The plugin is designed to be configurable. To customize the Remark plugin for a specific content plugin (docs, blog, pages), pass the options through the `admonitions` key.

docusaurus.config.js

```js
export default {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          admonitions: {
            keywords: ['note', 'tip', 'info', 'warning', 'danger'],
            extendDefaults: true,
          },
        },
      },
    ],
  ],
};
```

The plugin accepts the following options:

- `keywords`: An array of keywords that can be used as the type for the admonition.
- `extendDefaults`: Should the provided options (such as `keywords`) be merged into the existing defaults. Defaults to `true`.

The `keyword` will be passed as the `type` prop of the `Admonition` component.

### Custom admonition type components[​](#custom-admonition-type-components "Direct link to Custom admonition type components")

By default, the theme doesn't know what do to with custom admonition keywords such as `:::my-custom-admonition`. It is your responsibility to map each admonition keyword to a React component so that the theme knows how to render them.

If you registered a new admonition type `my-custom-admonition` via the following config:

docusaurus.config.js

```js
export default {
  // ...
  presets: [
    [
      'classic',
      {
        // ...
        docs: {
          admonitions: {
            keywords: ['my-custom-admonition'],
            extendDefaults: true,
          },
        },
      },
    ],
  ],
};
```

You can provide the corresponding React component for `:::my-custom-admonition` by creating the following file (unfortunately, since it's not a React component file, it's not swizzlable):

src/theme/Admonition/Types.js

```js
import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function MyCustomAdmonition(props) {
  return (
    <div style={{border: 'solid red', padding: 10}}>
      <h5 style={{color: 'blue', fontSize: 30}}>{props.title}</h5>
      <div>{props.children}</div>
    </div>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  'my-custom-admonition': MyCustomAdmonition,
};

export default AdmonitionTypes;
```

Now you can use your new admonition keyword in a Markdown file, and it will be parsed and rendered with your custom logic:

```md
:::my-custom-admonition[My Title]

It works!

:::
```

http://localhost:3000

##### My Title

It works!

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/markdown-features/markdown-features-admonitions.mdx)

Last updated on **Jan 3, 2025** by **Sébastien Lorber**

[Previous
\
Code blocks](/docs/markdown-features/code-blocks)

[Next
\
Headings and Table of contents](/docs/markdown-features/toc)

- [Usage with Prettier](#usage-with-prettier)
- [Specifying title](#specifying-title)
- [Nested admonitions](#nested-admonitions)
- [Admonitions with MDX](#admonitions-with-mdx)
- [Usage in JSX](#usage-in-jsx)
- [Customizing admonitions](#customizing-admonitions)

  - [Customizing rendering behavior](#customizing-rendering-behavior)
  - [Customizing parsing behavior](#customizing-parsing-behavior)
  - [Custom admonition type components](#custom-admonition-type-components)

Learn

- [Introduction](/docs)
- [Installation](/docs/installation)
- [Migration from v1 to v2](/docs/migration)

Community

- [Stack Overflow](https://stackoverflow.com/questions/tagged/docusaurus)
- [Feature Requests](/feature-requests)
- [Discord](https://discordapp.com/invite/docusaurus)
- [Help](/community/support)

More

- [Blog](/blog)
- [Changelog](/changelog)
- [GitHub](https://github.com/facebook/docusaurus)
- [X](https://x.com/docusaurus)
- [![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com)
- [![Covered by Argos](https://argos-ci.com/badge.svg)](https://argos-ci.com)

Legal

- [Privacy](https://opensource.facebook.com/legal/privacy/)
- [Terms](https://opensource.facebook.com/legal/terms/)
- [Cookie Policy](https://opensource.facebook.com/legal/cookie-policy/)

[![Meta Open Source Logo](/img/meta_opensource_logo_negative.svg)![Meta Open Source Logo](/img/meta_opensource_logo_negative.svg)](https://opensource.fb.com)

Copyright © 2025 Meta Platforms, Inc. Built with Docusaurus.
