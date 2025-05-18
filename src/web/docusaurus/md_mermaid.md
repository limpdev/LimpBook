# Diagrams

Diagrams can be rendered using [Mermaid](https://mermaid-js.github.io/mermaid/) in a code block.

## Installation[​](#installation "Direct link to Installation")

- npm
- Yarn
- pnpm
- Bun

```bash
npm install --save @docusaurus/theme-mermaid
```

```bash
yarn add @docusaurus/theme-mermaid
```

```bash
pnpm add @docusaurus/theme-mermaid
```

```bash
bun add @docusaurus/theme-mermaid
```

Enable Mermaid functionality by adding plugin `@docusaurus/theme-mermaid` and setting `markdown.mermaid` to `true` in your `docusaurus.config.js`.

docusaurus.config.js

```js
export default {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};
```

## Usage[​](#usage "Direct link to Usage")

Add a code block with language `mermaid`:

Example Mermaid diagram

````md
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

See the [Mermaid syntax documentation](https://mermaid-js.github.io/mermaid/#/./n00b-syntaxReference) for more information on the Mermaid syntax.

## Theming[​](#theming "Direct link to Theming")

The diagram dark and light themes can be changed by setting `mermaid.theme` values in the `themeConfig` in your `docusaurus.config.js`. You can set themes for both light and dark mode.

docusaurus.config.js

```js
export default {
  themeConfig: {
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
  },
};
```

See the [Mermaid theme documentation](https://mermaid-js.github.io/mermaid/#/theming) for more information on theming Mermaid diagrams.

## Mermaid Config[​](#configuration "Direct link to Mermaid Config")

Options in `mermaid.options` will be passed directly to `mermaid.initialize`:

docusaurus.config.js

```js
export default {
  themeConfig: {
    mermaid: {
      options: {
        maxTextSize: 50,
      },
    },
  },
};
```

See the [Mermaid config documentation](https://mermaid-js.github.io/mermaid/#/./Setup?id=configuration) and the [Mermaid config types](https://github.com/mermaid-js/mermaid/blob/master/packages/mermaid/src/config.type.ts) for the available config options.

## Dynamic Mermaid Component[​](#component "Direct link to Dynamic Mermaid Component")

To generate dynamic diagrams, you can use the `Mermaid` component:

Example of dynamic Mermaid component

```mdx
import Mermaid from '@theme/Mermaid';

<Mermaid
  value={`graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;`}
/>
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/markdown-features/markdown-features-diagrams.mdx)

Last updated on **Jan 3, 2025** by **Sébastien Lorber**

[Previous
\
Math Equations](/docs/markdown-features/math-equations)

[Next
\
Head metadata](/docs/markdown-features/head-metadata)

- [Installation](#installation)
- [Usage](#usage)
- [Theming](#theming)
- [Mermaid Config](#configuration)
- [Dynamic Mermaid Component](#component)

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
