# Math Equations

Mathematical equations can be rendered using [KaTeX](https://katex.org).

## Usage[​](#usage "Direct link to Usage")

Please read [KaTeX](https://katex.org) documentation for more details.

### Inline[​](#inline "Direct link to Inline")

Write inline math equations by wrapping LaTeX equations between `$`:

```latex
Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.
```

http://localhost:3000

Let f ⁣:\[a,b]→Rf\\colon\[a,b] \\to \\Rf:\[a,b]→R be Riemann integrable. Let F ⁣:\[a,b]→RF\\colon\[a,b]\\to\\RF:\[a,b]→R be F(x)=∫axf(t) dtF(x)= \\int\_{a}^{x} f(t)\\,dtF(x)=∫ax​f(t)dt. Then FFF is continuous, and at all xxx such that fff is continuous at xxx, FFF is differentiable at xxx with F′(x)=f(x)F'(x)=f(x)F′(x)=f(x).

### Blocks[​](#blocks "Direct link to Blocks")

For equation block or display mode, use line breaks and `$$`:

```latex
$$
I = \int_0^{2\pi} \sin(x)\,dx
$$
```

http://localhost:3000

I=∫02πsin⁡(x) dxI = \\int\_0^{2\\pi} \\sin(x)\\,dxI=∫02π​sin(x)dx

## Enabling math equations[​](#configuration "Direct link to Enabling math equations")

Enable KaTeX:

1. Install the `remark-math` and `rehype-katex` plugins:

   - npm
   - Yarn
   - pnpm
   - Bun

   ```bash
   npm install --save remark-math@6 rehype-katex@7
   ```

   ```bash
   yarn add remark-math@6 rehype-katex@7
   ```

   ```bash
   pnpm add remark-math@6 rehype-katex@7
   ```

   ```bash
   bun add remark-math@6 rehype-katex@7
   ```

   warning

   Make sure to use `remark-math 6` and `rehype-katex 7` for Docusaurus v3 (using MDX v3). We can't guarantee other versions will work.
2. These 2 plugins are [**only available as ES Modules**](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). We recommended to use an [**ES Modules**](https://flaviocopes.com/es-modules/) config file:

   ES module docusaurus.config.js

   ```js
   import remarkMath from 'remark-math';
   import rehypeKatex from 'rehype-katex';

   export default {
     presets: [
       [
         '@docusaurus/preset-classic',
         {
           docs: {
             path: 'docs',
             remarkPlugins: [remarkMath],
             rehypePlugins: [rehypeKatex],
           },
         },
       ],
     ],
   };
   ```

   Using a [**CommonJS**](https://nodejs.org/api/modules.html#modules-commonjs-modules) config file?

   If you decide to use a CommonJS config file, it is possible to load those ES module plugins thanks to dynamic imports and an async config creator function:

   CommonJS module docusaurus.config.js

   ```js
   module.exports = async function createConfigAsync() {
     return {
       presets: [
         [
           '@docusaurus/preset-classic',
           {
             docs: {
               path: 'docs',
               remarkPlugins: [(await import('remark-math')).default],
               rehypePlugins: [(await import('rehype-katex')).default],
             },
           },
         ],
       ],
     };
   };
   ```
3. Include the KaTeX CSS in your config under `stylesheets`:

   ```js
   export default {
     //...
     stylesheets: [
       {
         href: 'https://cdn.jsdelivr.net/npm/[email protected]/dist/katex.min.css',
         type: 'text/css',
         integrity:
           'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
         crossorigin: 'anonymous',
       },
     ],
   };
   ```

See a config file example

docusaurus.config.js

```js
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default {
  title: 'Docusaurus',
  tagline: 'Build optimized websites quickly, focus on your content',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/[email protected]/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};
```

## Self-hosting KaTeX assets[​](#self-hosting-katex-assets "Direct link to Self-hosting KaTeX assets")

Loading stylesheets, fonts, and JavaScript libraries from CDN sources is a good practice for popular libraries and assets, since it reduces the amount of assets you have to host. In case you prefer to self-host the `katex.min.css` (along with required KaTeX fonts), you can download the latest version from [KaTeX GitHub releases](https://github.com/KaTeX/KaTeX/releases), extract and copy `katex.min.css` and `fonts` directory (only `.woff2` font types should be enough) to your site's `static` directory, and in `docusaurus.config.js`, replace the stylesheet's `href` from the CDN URL to your local path (say, `/katex/katex.min.css`).

docusaurus.config.js

```js
export default {
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],
};
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/markdown-features/markdown-features-math-equations.mdx)

Last updated on **Jan 3, 2025** by **Sébastien Lorber**

[Previous
\
MDX Plugins](/docs/markdown-features/plugins)

[Next
\
Diagrams](/docs/markdown-features/diagrams)

- [Usage](#usage)

  - [Inline](#inline)
  - [Blocks](#blocks)
- [Enabling math equations](#configuration)
- [Self-hosting KaTeX assets](#self-hosting-katex-assets)

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
