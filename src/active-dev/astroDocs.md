# Install Astro

The [`create astro` CLI command](#install-from-the-cli-wizard) is the fastest way to start a new Astro project from scratch. It will walk you through every step of setting up your new Astro project and allow you to choose from a few different official starter templates.

You can also run the CLI command with the `template` flag to begin your project using any existing theme or starter template. Explore our [themes and starters showcase](https://astro.build/themes/) where you can browse themes for blogs, portfolios, documentation sites, landing pages, and more!

To install Astro manually instead, see our [step-by-step manual installation guide](#manual-setup).

Online previews

Prefer to try Astro in your browser? Visit [astro.new](https://astro.new/) to browse our starter templates and spin up a new Astro project without ever leaving your browser.

## Prerequisites

[Section titled Prerequisites](#prerequisites)

- **Node.js** - `v18.17.1` or `v20.3.0`, `v22.0.0` or higher. ( `v19` and `v21` are not supported.)
- **Text editor** - We recommend [VS Code](https://code.visualstudio.com/) with our [Official Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).
- **Terminal** - Astro is accessed through its command-line interface (CLI).

## Browser compatibility

[Section titled Browser compatibility](#browser-compatibility)

Astro is built with Vite which targets browsers with modern JavaScript support by default. For a complete reference, you can see the [list of currently supported browser versions in Vite](https://vite.dev/guide/build.html#browser-compatibility).

## Install from the CLI wizard

[Section titled Install from the CLI wizard](#install-from-the-cli-wizard)

You can run `create astro` anywhere on your machine, so there’s no need to create a new empty directory for your project before you begin. If you don’t have an empty directory yet for your new project, the wizard will help create one for you automatically.

1. Run the following command in your terminal to start the install wizard:

    - [npm](#tab-panel-1322)
    - [pnpm](#tab-panel-1323)
    - [Yarn](#tab-panel-1324)

```bash
# create a new project with npm
npm create astro@latest
```

```bash
# create a new project with pnpm
pnpm create astro@latest
```

```bash
# create a new project with yarn
yarn create astro
```

    If all goes well, you will see a success message followed by some recommended next steps.

2. Now that your project has been created, you can `cd` into your new project directory to begin using Astro.
3. If you skipped the “Install dependencies?” step during the CLI wizard, then be sure to install your dependencies before continuing.

    - [npm](#tab-panel-1325)
    - [pnpm](#tab-panel-1326)
    - [Yarn](#tab-panel-1327)

```bash
npm install
```

```bash
pnpm install
```

```bash
yarn install
```

4. You can now [start the Astro dev server](/en/develop-and-build/#start-the-astro-dev-server) and see a live preview of your project while you build!

## CLI installation flags

[Section titled CLI installation flags](#cli-installation-flags)

You can run the `create astro` command with additional flags to customize the setup process (e.g. answering “yes” to all questions, skipping the Houston animation) or your new project (e.g. install git or not, add integrations).

See [all the available `create astro` command flags](https://github.com/withastro/astro/blob/main/packages/create-astro/README.md)

### Add integrations

[Section titled Add integrations](#add-integrations)

You can start a new Astro project and install any [official integrations](/en/guides/integrations-guide/) or community integrations that support the `astro add` command at the same time by passing the `--add` argument to the `create astro` command.

Run the following command in your terminal, substituting any integration that supports the `astro add` command:

- [npm](#tab-panel-1328)
- [pnpm](#tab-panel-1329)
- [Yarn](#tab-panel-1330)

Terminal window

```bash
# create a new project with React and Partytown
npm create astro@latest -- --add react --add partytown
```

```bash
# create a new project with React and Partytown
pnpm create astro@latest --add react --add partytown
```

```bash
# create a new project with React and Partytown
yarn create astro --add react --add partytown
```

### Use a theme or starter template

[Section titled Use a theme or starter template](#use-a-theme-or-starter-template)

You can start a new Astro project based on an [official example](https://github.com/withastro/astro/tree/main/examples) or the `main` branch of any GitHub repository by passing a `--template` argument to the `create astro` command.

Run the following command in your terminal, substituting the official Astro starter template name, or the GitHub username and repository of the theme you want to use:

- [npm](#tab-panel-1331)
- [pnpm](#tab-panel-1332)
- [Yarn](#tab-panel-1333)

Terminal window

```bash
# create a new project with an official example
npm create astro@latest -- --template <example-name>

# create a new project based on a GitHub repository’s main branch
npm create astro@latest -- --template <github-username>/<github-repo>

# create a new project with an official example
pnpm create astro@latest --template <example-name>

# create a new project based on a GitHub repository’s main branch
pnpm create astro@latest --template <github-username>/<github-repo>

# create a new project with an official example
yarn create astro --template <example-name>

# create a new project based on a GitHub repository’s main branch
yarn create astro --template <github-username>/<github-repo>
```

By default, this command will use the template repository’s `main` branch. To use a different branch name, pass it as part of the `--template` argument: `<github-username>/<github-repo>#<branch>`.

## Manual Setup

[Section titled Manual Setup](#manual-setup)

This guide will walk you through the steps to manually install and configure a new Astro project.

If you prefer not to use our automatic `create astro` CLI tool, you can set up your project yourself by following the guide below.

1. Create your directory

Create an empty directory with the name of your project, and then navigate into it.

Terminal window

```bash
mkdir my-astro-project
cd my-astro-project
```

Once you are in your new directory, create your project `package.json` file. This is hoyou will manage your project dependencies, including Astro. If you aren’t familiar witthis file format, run the following command to create one.

- [npm](#tab-panel-1334)
- [pnpm](#tab-panel-1335)
- [Yarn](#tab-panel-1336)

    Terminal window

```bash
npm init --yes

pnpm init

yarn init --yes
```

2. Install Astro

    First, install the Astro project dependencies inside your project.

    Important

    Astro must be installed locally, not globally. Make sure you are _not_ running `npm install -g astro` `pnpm add -g astro` or `yarn add global astro`.

    - [npm](#tab-panel-1337)
    - [pnpm](#tab-panel-1338)
    - [Yarn](#tab-panel-1339)

```bash
npm install astro
```

```bash
pnpm add astro
```

```bash
yarn add astro
```

Then, replace any placeholder “scripts” section of your `package.json` with the following:

```json
{
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "astro dev",
        "build": "astro build",
        "preview": "astro preview"
    }
}
```

You’ll use these scripts later in the guide to start Astro and run its different commands.

3. Create your first page

In your text editor, create a new file in your directory at `src/pages/index.astro`. This will be your first Astro page in the project.

For this guide, copy and paste the following code snippet (including `---` dashes) into your new file:

```mdx
---
// Welcome to Astro! Everything between these triple-dash code fences
// is your "component frontmatter". It never runs in the browser.
console.log('This runs in your terminal, not the browser!');
---

<!-- Below is your "component template." It's just HTML, but with
    some magic sprinkled in to help you build great templates. -->

<html>
    <body>
        <h1>Hello, World!</h1>
    </body>
</html>

<style>
  h1 {
    color: orange;
  }
</style>
```

4. Create your first static asset

You will also want to create a `public/` directory to store your static assets. Astro will always include these assets in your final build, so you can safely reference them from inside your component templates.

In your text editor, create a new file in your directory at `public/robots.txt`. `robots.txt` is a simple file that most sites will include to tell search bots like Google how to treat your site.

For this guide, copy and paste the following code snippet into your new file:

```
# Example: Allow all bots to scan and index your site.
# Full syntax: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

5. Create `astro.config.mjs`

    Astro is configured using `astro.config.mjs`. This file is optional if you do not need to configure Astro, but you may wish to create it now.

    Create `astro.config.mjs` at the root of your project, and copy the code below into it:

    astro.config.mjs

```js
import { defineConfig } from "astro/config";
// https://astro.build/config
export default defineConfig({});
```

If you want to include [UI framework components](/en/guides/framework-components/) such as React, Svelte, etc. or use other tools such as MDX or Partytown in your project, hereis where you will [manually import and configure integrations(/en/guides/integrations-guide/).

Read Astro’s [API configuration reference](/en/reference/configuration-reference/) for more information.

6. Add TypeScript support

TypeScript is configured using `tsconfig.json`. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file.

If you do intend to write TypeScript code, using Astro’s `strict` or `strictest` template is recommended. You can view and compare the three template configurations at [astro/tsconfigs/](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/).

    Create `tsconfig.json` at the root of your project, and copy the code below into it. (You can use `base`, `strict`, or `strictest` for your TypeScript template):

```json
{
    "extends": "astro/tsconfigs/base"
}
```

    Read Astro’s [TypeScript setup guide](/en/guides/typescript/#setup) for more information.

7. Next Steps

    If you have followed the steps above, your project directory should now look like this:

    - Directorynode_modules/

        - …

    - Directorypublic/

        - robots.txt

    - Directorysrc/

        - Directorypages/

            - index.astro

    - astro.config.mjs
    - package-lock.json or `yarn.lock`, `pnpm-lock.yaml`, etc.
    - package.json
    - tsconfig.json

8. You can now [start the Astro dev server](/en/develop-and-build/#start-the-astro-dev-server) and see a live preview of your project while you build!
# Project structure

Your new Astro project generated from the `create astro` CLI wizard already includes some files and folders. Others, you will create yourself and add to Astro’s existing file structure.

Here’s how an Astro project is organized, and some files you will find in your new project.

## Directories and Files

[Section titled Directories and Files](#directories-and-files)

Astro leverages an opinionated folder layout for your project. Every Astro project root should include the following directories and files:

- `src/*` - Your project source code (components, pages, styles, images, etc.)
- `public/*` - Your non-code, unprocessed assets (fonts, icons, etc.)
- `package.json` - A project manifest.
- `astro.config.mjs` - An Astro configuration file. (recommended)
- `tsconfig.json` - A TypeScript configuration file. (recommended)

### Example Project Tree

[Section titled Example Project Tree](#example-project-tree)

_An Astro project directory might look like this:_

<details><summary><i>OPEN FOR DIRECTORY🌲</i></summary>

- Directorypublic/
  
  - robots.txt
  - favicon.svg
  - my-cv.pdf
- Directorysrc/
  
  - Directoryblog/
    
    - post1.md
    - post2.md
    - post3.md
  - Directorycomponents/
    
    - Header.astro
    - Button.jsx
  - Directoryimages/
    
    - image1.jpg
    - image2.jpg
    - image3.jpg
  - Directorylayouts/
    
    - PostLayout.astro
  - Directorypages/
    
    - Directoryposts/
      
      - \[post].astro
    - about.astro
    - **index.astro**
    - rss.xml.js
  - Directorystyles/
    
    - global.css
  - content.config.ts
- astro.config.mjs
- package.json
- tsconfig.json

</details>

### `src/`

[Section titled src/](#src)

The `src/` folder is where most of your project source code lives. This includes:

- [Pages](/en/basics/astro-pages/)
- [Layouts](/en/basics/layouts/)
- [Astro components](/en/basics/astro-components/)
- [UI framework components (React, etc.)](/en/guides/framework-components/)
- [Styles (CSS, Sass)](/en/guides/styling/)
- [Markdown](/en/guides/markdown-content/)
- [Images to be optimized and processed by Astro](/en/guides/images/)

Astro processes, optimizes, and bundles your `src/` files to create the final website that is shipped to the browser. Unlike the static `public/` directory, your `src/` files are built and handled for you by Astro.

Some files (like Astro components) are not even sent to the browser as written but are instead rendered to static HTML. Other files (like CSS) are sent to the browser but may be optimized or bundled with other CSS files for performance.

Tip

While this guide describes some popular conventions used in the Astro community, the only directory reserved by Astro is `src/pages/`. You are free to rename and reorganize any other directories in a way that works best for you.

### `src/pages`

[Section titled src/pages](#srcpages)

Pages routes are created for your site by adding [supported file types](/en/basics/astro-pages/#supported-page-files) to this directory.

Caution

`src/pages` is a **required** sub-directory in your Astro project. Without it, your site will have no pages or routes!

### `src/components`

[Section titled src/components](#srccomponents)

**Components** are reusable units of code for your HTML pages. These could be [Astro components](/en/basics/astro-components/), or [UI framework components](/en/guides/framework-components/) like React or Vue. It is common to group and organize all of your project components together in this folder.

This is a common convention in Astro projects, but it is not required. Feel free to organize your components however you like!

### `src/layouts`

[Section titled src/layouts](#srclayouts)

[Layouts](/en/basics/layouts/) are Astro components that define the UI structure shared by one or more [pages](/en/basics/astro-pages/).

Just like `src/components`, this directory is a common convention but not required.

### `src/styles`

[Section titled src/styles](#srcstyles)

It is a common convention to store your CSS or Sass files in a `src/styles` directory, but this is not required. As long as your styles live somewhere in the `src/` directory and are imported correctly, Astro will handle and optimize them.

### `public/`

[Section titled public/](#public)

The `public/` directory is for files and assets in your project that do not need to be processed during Astro’s build process. The files in this folder will be copied into the build folder untouched, and then your site will be built.

This behavior makes `public/` ideal for common assets that do not require any processing, like some images and fonts, or special files such as `robots.txt` and `manifest.webmanifest`.

You can place CSS and JavaScript in your `public/` directory, but be aware that those files will not be bundled or optimized in your final build.

Tip

As a general rule, any CSS or JavaScript that you write yourself should live in your `src/` directory.

### `package.json`

[Section titled package.json](#packagejson)

This is a file used by JavaScript package managers to manage your dependencies. It also defines the scripts that are commonly used to run Astro (ex: `npm run dev`, `npm run build`).

There are [two kinds of dependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file) you can specify in a `package.json`: `dependencies` and `devDependencies`. In most cases, these work the same: Astro needs all dependencies at build time, and your package manager will install both. We recommend putting all of your dependencies in `dependencies` to start, and only use `devDependencies` if you find a specific need to do so.

For help creating a new `package.json` file for your project, check out the [manual setup](/en/install-and-setup/#manual-setup) instructions.

### `astro.config.mjs`

[Section titled astro.config.mjs](#astroconfigmjs)

This file is generated in every starter template and includes configuration options for your Astro project. Here you can specify integrations to use, build options, server options, and more.

Astro supports several file formats for its JavaScript configuration file: `astro.config.js`, `astro.config.mjs`, `astro.config.cjs` and `astro.config.ts`. We recommend using `.mjs` in most cases or `.ts` if you want to write TypeScript in your config file.

TypeScript config file loading is handled using [`tsm`](https://github.com/lukeed/tsm) and will respect your project’s `tsconfig` options.

See the [configuration reference](/en/reference/configuration-reference/) for complete details.

### `tsconfig.json`

[Section titled tsconfig.json](#tsconfigjson)

This file is generated in every starter template and includes TypeScript configuration options for your Astro project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file.
#  TypeScript

Astro ships with built-in support for [TypeScript](https://www.typescriptlang.org/). You can import `.ts` and `.tsx` files in your Astro project, write TypeScript code directly inside your [Astro component](/en/basics/astro-components/#the-component-script), and even use an [`astro.config.ts`](/en/guides/configuring-astro/#the-astro-config-file) file for your Astro configuration if you like.

Using TypeScript, you can prevent errors at runtime by defining the shapes of objects and components in your code. For example, if you use TypeScript to [type your component’s props](#component-props), you’ll get an error in your editor if you set a prop that your component doesn’t accept.

You don’t need to write TypeScript code in your Astro projects to benefit from it. Astro always treats your component code as TypeScript, and the [Astro VS Code Extension](/en/editor-setup/) will infer as much as it can to provide autocompletion, hints, and errors in your editor.

The Astro dev server won’t perform any type checking, but you can use a [separate script](#type-checking) to check for type errors from the command line.

## Setup

[Section titled Setup](#setup)

Astro starter projects include a `tsconfig.json` file in your project. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file. If you install Astro manually, be sure to create this file yourself.

### TSConfig templates

[Section titled TSConfig templates](#tsconfig-templates)

Three extensible `tsconfig.json` templates are included in Astro: `base`, `strict`, and `strictest`. The `base` template enables support for modern JavaScript features and is also used as a basis for the other templates. We recommend using `strict` or `strictest` if you plan to write TypeScript in your project. You can view and compare the three template configurations at [astro/tsconfigs/](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/).

To inherit from one of the templates, use [the `extends` setting](https://www.typescriptlang.org/tsconfig#extends):

 `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/base"
}
```

Additionally, we recommend setting `include` and `exclude` as follows to benefit from Astro types and avoid checking built files:

 `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/base",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

You can create `src/env.d.ts` as a convention for adding custom types declarations, or to benefit from Astro types if you don’t have a `tsconfig.json`:

 `src/env.d.ts`

```ts
// Custom types declarations
declare var myString: string;
// Astro types, not necessary if you already have a `tsconfig.json`
/// <reference path="../.astro/types.d.ts" />
```

### TypeScript editor plugin

[Section titled TypeScript editor plugin](#typescript-editor-plugin)

The [Astro TypeScript plugin](https://www.npmjs.com/package/@astrojs/ts-plugin) can be installed separately when you are not using the [official Astro VS Code extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode). This plugin is automatically installed and configured by the VS Code extension, and you do not need to install both.

This plugin runs only in the editor. When running `tsc` in the terminal, `.astro` files are ignored entirely. Instead, you can use [the `astro check` CLI command](/en/reference/cli-reference/#astro-check) to check both `.astro` and `.ts` files.

This plugin also supports importing `.astro` files from `.ts` files (which can be useful for re-exporting).

- [npm](#tab-panel-1890)
- [pnpm](#tab-panel-1891)
- [Yarn](#tab-panel-1892)

```bash
npm install @astrojs/ts-plugin
```

```bash
pnpm add @astrojs/ts-plugin
```

```bash
yarn add @astrojs/ts-plugin
```

Then, add the following to your `tsconfig.json`:

 `tsconfig.json`

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@astrojs/ts-plugin"
      },
    ],
  }
}
```

To check that the plugin is working, create a `.ts` file and import an Astro component into it. You should have no warning messages from your editor.

### UI Frameworks

[Section titled UI Frameworks](#ui-frameworks)

If your project uses a [UI framework](/en/guides/framework-components/), additional settings depending on the framework might be needed. Please see your framework’s TypeScript documentation for more information. ([Vue](https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript), [React](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup), [Preact](https://preactjs.com/guide/v10/typescript), [Solid](https://www.solidjs.com/guides/typescript))

## Type Imports

[Section titled Type Imports](#type-imports)

Use explicit type imports and exports whenever possible.

```ts
import { SomeType } from "./script";
import type { SomeType } from "./script";
```

This way, you avoid edge cases where Astro’s bundler may try to incorrectly bundle your imported types as if they were JavaScript.

You can configure TypeScript to enforce type imports in your `tsconfig.json` file. Set [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) to `true`. TypeScript will check your imports and tell you when `import type` should be used. This setting is enabled by default in all our presets.

 `tsconfig.json`

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true
  }
}
```

## Import Aliases

[Section titled Import Aliases](#import-aliases)

Astro supports [import aliases](/en/guides/imports/#aliases) that you define in your `tsconfig.json` `paths` configuration. [Read our guide](/en/guides/imports/#aliases) to learn more.

src/pages/about/nate.astro

```yaml
---
import HelloWorld from "@components/HelloWorld.astro";
import Layout from "@layouts/Layout.astro";
---
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"]
    }
  }
}
```

## Extending `window` and `globalThis`

[Section titled Extending window and globalThis](#extending-window-and-globalthis)

You may want to add a property to the global object. You can do this by adding top-level declarations using the `declare` keyword to your `env.d.ts` file:

`src/env.d.ts`

```ts
declare var myString: string;
declare function myFunction(): boolean;
```

This will provide typing to `globalThis.myString` and `globalThis.myFunction`, as well as `window.myString` and `window.myFunction`.

Note that `window` is only available in client-side code. `globalThis` is available both server-side and client-side, but its server-side value won’t be shared with the client.

If you only want to type a property on the `window` object, provide a `Window` interface instead:

src/env.d.ts

```ts
interface Window {
  myFunction(): boolean;
}
```

## Component Props

[Section titled Component Props](#component-props)

Astro supports typing your component props via TypeScript. To enable, add a TypeScript `Props` interface to your component frontmatter. An `export` statement may be used, but is not necessary. The [Astro VS Code Extension](/en/editor-setup/) will automatically look for the `Props` interface and give you proper TS support when you use that component inside another template.

src/components/HelloProps.astro

```ts
---
interface Props {
  name: string;
  greeting?: string;
}
const { greeting = "Hello", name } = Astro.props;
---
<h2>{greeting}, {name}!</h2>
```

### Common prop type patterns

[Section titled Common prop type patterns](#common-prop-type-patterns)

- If your component takes no props or slotted content, you can use `type Props = Record<string, never>`.
- If your component must be passed children to its default slot, you can enforce this by using `type Props = { children: any; };`.

## Type Utilities

[Section titled Type Utilities](#type-utilities)

**Added in:** `astro@1.6.0`

Astro comes with some built-in utility types for common prop type patterns. These are available under the `astro/types` entrypoint.

### Built-in HTML attributes

[Section titled Built-in HTML attributes](#built-in-html-attributes)

Astro provides the `HTMLAttributes` type to check that your markup is using valid HTML attributes. You can use these types to help build component props.

For example, if you were building a `<Link>` component, you could do the following to mirror the default HTML attributes for `<a>` tags in your component’s prop types.

src/components/Link.astro

```ts
---
import type { HTMLAttributes } from "astro/types";
// use a `type`
type Props = HTMLAttributes<"a">;
// or extend with an `interface`
interface Props extends HTMLAttributes<"a"> {
  myProp?: boolean;
}
const { href, ...attrs } = Astro.props;
---
<a href={href} {...attrs}>
  <slot />
</a>
```

It is also possible to extend the default JSX definitions to add non-standard attributes by redeclaring the `astroHTML.JSX` namespace in a `.d.ts` file.

src/custom-attributes.d.ts

```ts
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    "data-count"?: number;
    "data-label"?: string;
  }
  // Add a CSS custom property to the style object
  interface CSSProperties {
    "--theme-color"?: "black" | "white";
  }
}
```

`astroHTML` is injected globally inside `.astro` components. To use it in TypeScript files, use a [triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html):

```js
/// <reference types="astro/astro-jsx" />
type MyAttributes = astroHTML.JSX.ImgHTMLAttributes;
```

### `ComponentProps` type

[Section titled ComponentProps type](#componentprops-type)

**Added in:** `astro@4.3.0`

This type export allows you to reference the `Props` accepted by another component, even if that component doesn’t export that `Props` type directly.

The following example shows using the `ComponentProps` utility from `astro/types` to reference a `<Button />` component’s `Props` types:

src/pages/index.astro

```ts
---
import type { ComponentProps } from "astro/types";
import Button from "./Button.astro";
type ButtonProps = ComponentProps<typeof Button>;
---
```

### Polymorphic type

[Section titled Polymorphic type](#polymorphic-type)

**Added in:** `astro@2.5.0`

Astro includes a helper to make it easier to build components that can render as different HTML elements with full type safety. This is useful for components like `<Link>` that can render as either `<a>` or `<button>` depending on the props passed to it.

The example below implements a fully-typed, polymorphic component that can render as any HTML element. The [`HTMLTag`](#built-in-html-attributes) type is used to ensure that the `as` prop is a valid HTML element.

```ts
---
import type { HTMLTag, Polymorphic } from "astro/types";
type Props<Tag extends HTMLTag> = Polymorphic<{ as: Tag }>;
const { as: Tag, ...props } = Astro.props;
---
<Tag {...props} />
```

### Infer `getStaticPaths()` types

[Section titled Infer getStaticPaths() types](#infer-getstaticpaths-types)

**Added in:** `astro@2.1.0`

Astro includes helpers for working with the types returned by your [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths) function for dynamic routes.

You can get the type of [`Astro.params`](/en/reference/api-reference/#params) with `InferGetStaticParamsType` and the type of [`Astro.props`](/en/reference/api-reference/#props) with `InferGetStaticPropsType` or you can use `GetStaticPaths` to infer both at once:

src/pages/posts/\[...id].astro

```ts
---
import type {
  InferGetStaticParamsType,
  InferGetStaticPropsType,
  GetStaticPaths,
} from "astro";
export const getStaticPaths = (async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => {
    return {
      params: { id: post.id },
      props: { draft: post.data.draft, title: post.data.title },
    };
  });
}) satisfies GetStaticPaths;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;
const { id } = Astro.params as Params;
//                   ^? { id: string; }
const { title } = Astro.props;
//                      ^? { draft: boolean; title: string; }
---
```

## Type checking

[Section titled Type checking](#type-checking)

To see type errors in your editor, please make sure that you have the [Astro VS Code extension](/en/editor-setup/) installed. Please note that the `astro start` and `astro build` commands will transpile the code with esbuild, but will not run any type checking. To prevent your code from building if it contains TypeScript errors, change your “build” script in `package.json` to the following:

package.json

```json
{
  "scripts": {
    "build": "astro build",
    "build": "astro check && astro build",
  },
}
```

Note

`astro check` checks all the files included in your TypeScript project. To check types within Svelte and Vue files, you can use the [`svelte-check`](https://www.npmjs.com/package/svelte-check) and the [`vue-tsc`](https://www.npmjs.com/package/vue-tsc) packages respectively.

Read more about [`.ts` file imports](/en/guides/imports/#typescript) in Astro.

Read more about [TypeScript Configuration](https://www.typescriptlang.org/tsconfig/).

## Troubleshooting

[Section titled Troubleshooting](#troubleshooting)

### Errors typing multiple JSX frameworks at the same time

[Section titled Errors typing multiple JSX frameworks at the same time](#errors-typing-multiple-jsx-frameworks-at-the-same-time)

An issue may arise when using multiple JSX frameworks in the same project, as each framework requires different, sometimes conflicting, settings inside `tsconfig.json`.

**Solution**: Set the [`jsxImportSource` setting](https://www.typescriptlang.org/tsconfig#jsxImportSource) to `react` (default), `preact` or `solid-js` depending on your most-used framework. Then, use a [pragma comment](https://www.typescriptlang.org/docs/handbook/jsx.html#configuring-jsx) inside any conflicting file from a different framework.

For the default setting of `jsxImportSource: react`, you would use:

```js
// For Preact
/** @jsxImportSource preact */
// For Solid
/** @jsxImportSource solid-js */
```
# Develop and build

Once you have an Astro project, now you’re ready to build with Astro! 🚀

## Edit your project

[Section titled Edit your project](#edit-your-project)

To make changes to your project, open your project folder in your code editor. Working in development mode with the dev server running allows you to see updates to your site as you edit the code.

You can also [customize aspects of your development environment](#configure-your-dev-environment) such as configuring TypeScript or installing the official Astro editor extensions.

### Start the Astro dev server

[Section titled Start the Astro dev server](#start-the-astro-dev-server)

Astro comes with a built-in development server that has everything you need for project development. The `astro dev` CLI command will start the local development server so that you can see your new website in action for the very first time.

Every starter template comes with a pre-configured script that will run `astro dev` for you. After navigating into your project directory, use your favorite package manager to run this command and start the Astro development server.

- [npm](#tab-panel-1316)
- [pnpm](#tab-panel-1317)
- [yarn](#tab-panel-1318)

```bash
npm run dev
```

```bash
pnpm run dev
```

```bash
yarn run dev
```

If all goes well, Astro will now be serving your project on [http://localhost:4321/](http://localhost:4321/). Visit that link in your browser and see your new site!

### Work in development mode

[Section titled Work in development mode](#work-in-development-mode)

Astro will listen for live file changes in your `src/` directory and update your site preview as you build, so you will not need to restart the server as you make changes during development. You will always be able to see an up-to-date version of your site in your browser when the dev server is running.

When viewing your site in the browser, you’ll have access to the [Astro dev toolbar](/en/guides/dev-toolbar/). As you build, it will help you inspect your [islands](/en/concepts/islands/), spot accessibility issues, and more.

If you aren’t able to open your project in the browser after starting the dev server, go back to the terminal where you ran the `dev` command and check the message displayed. It should tell you if an error occurred, or if your project is being served at a different URL than [http://localhost:4321/](http://localhost:4321/).

## Build and preview your site

[Section titled Build and preview your site](#build-and-preview-your-site)

To check the version of your site that will be created at build time, quit the dev server (`Ctrl` + `C`) and run the appropriate build command for your package manager in your terminal:

- [npm](#tab-panel-1319)
- [pnpm](#tab-panel-1320)
- [yarn](#tab-panel-1321)

```bash
npm run build
```

```bash
pnpm build
```

```bash
yarn run build
```

Astro will build a deploy-ready version of your site in a separate folder (`dist/` by default) and you can watch its progress in the terminal. This will alert you to any build errors in your project before you deploy to production. If TypeScript is configured to `strict` or `strictest`, the `build` script will also check your project for type errors.

When the build is finished, run the appropriate `preview` command (e.g. `npm run preview`) in your terminal and you can view the built version of your site locally in the same browser preview window.

Note that this previews your code as it existed when the build command was last run. This is meant to give you a preview of how your site will look when it is deployed to the web. Any later changes you make to your code after building will **not** be reflected while you preview your site until you run the build command again.

Use (`Ctrl` + `C`) to quit the preview and run another terminal command, such as restarting the dev server to go back to [working in development mode](#work-in-development-mode) which does update as you edit to show a live preview of your code changes.

Read more about [the Astro CLI](/en/reference/cli-reference/) and the terminal commands you will use as you build with Astro.

Tip

You may wish to [deploy your new site right away](/en/guides/deploy/), before you begin to add or change too much code. This is helpful to get a minimal, working version of your site published and can save you extra time and effort troubleshooting your deployment later.

## Next Steps

[Section titled Next Steps](#next-steps)

Success! You are now ready to start building with Astro! 🥳

Here are a few things that we recommend exploring next. You can read them in any order. You can even leave our documentation for a bit and go play in your new Astro project codebase, coming back here whenever you run into trouble or have a question.

### Configure your dev environment

[Section titled Configure your dev environment](#configure-your-dev-environment)

Explore the guides below to customize your development experience.

[Editor Setup](/en/editor-setup/) Customize your code editor to improve the Astro developer experience and unlock new features.

[Dev Toolbar](/en/guides/dev-toolbar/) Explore the helpful features of the dev toolbar.

[TypeScript Configuration](/en/guides/typescript/) Configure options for type-checking, IntelliSense, and more.

### Explore Astro’s Features

[Section titled Explore Astro’s Features](#explore-astros-features)

[Understand your codebase](/en/basics/project-structure/) Learn about Astro’s file structure in our Project Structure guide.

[Create content collections](/en/guides/content-collections/) Add content to your new site with frontmatter validation and automatic type-safety.

[Add view transitions](/en/guides/view-transitions/) Create seamless page transitions and animations.

[Learn about Islands](/en/concepts/islands/) Read about Astro's islands architecture.

### Take the introductory tutorial

[Section titled Take the introductory tutorial](#take-the-introductory-tutorial)

Build a fully functional Astro blog starting from a single blank page in our [introductory tutorial](/en/tutorial/0-introduction/).

This is a great way to see how Astro works and walks you through the basics of pages, layouts, components, routing, islands, and more. It also includes an optional, beginner-friendly unit for those newer to web development concepts in general, which will guide you through installing the necessary applications on your computer, creating a GitHub account, and deploying your site.

# Using environment variables

Astro gives you access to [Vite’s built-in environment variables support](#vites-built-in-support) and includes some [default environment variables for your project](#default-environment-variables) that allow you to access configuration values for your current project (e.g. `site`, `base`), whether your project is running in development or production, and more.

Astro also provides a way to [use and organize your environment variables with type safety](#type-safe-environment-variables). It is available for use inside the Astro context (e.g. Astro components, routes and endpoints, UI framework components, middleware), and managed with [a schema in your Astro configuration](/en/reference/configuration-reference/#env).

## Vite’s built-in support

[Section titled Vite’s built-in support](#vites-built-in-support)

Astro uses Vite’s built-in support for environment variables, which are statically replaced at build time, and lets you [use any of its methods](https://vite.dev/guide/env-and-mode.html) to work with them.

Note that while *all* environment variables are available in server-side code, only environment variables prefixed with `PUBLIC_` are available in client-side code for security purposes.

```ini
SECRET_PASSWORD=password123
PUBLIC_ANYBODY=there
```

In this example, `PUBLIC_ANYBODY` (accessible via `import.meta.env.PUBLIC_ANYBODY`) will be available in server or client code, while `SECRET_PASSWORD` (accessible via `import.meta.env.SECRET_PASSWORD`) will be server-side only.

Caution

`.env` files are not loaded inside [configuration files](#in-the-astro-config-file).

### IntelliSense for TypeScript

[Section titled IntelliSense for TypeScript](#intellisense-for-typescript)

By default, Astro provides a type definition for `import.meta.env` in `astro/client.d.ts`.

While you can define more custom env variables in `.env.[mode]` files, you may want to get TypeScript IntelliSense for user-defined env variables which are prefixed with `PUBLIC_`.

To achieve this, you can create an `env.d.ts` in `src/` and configure `ImportMetaEnv` like this:

src/env.d.ts

```ts
interface ImportMetaEnv {
  readonly DB_PASSWORD: string;
  readonly PUBLIC_POKEAPI: string;
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Default environment variables

[Section titled Default environment variables](#default-environment-variables)

Astro includes a few environment variables out of the box:

- `import.meta.env.MODE`: The mode your site is running in. This is `development` when running `astro dev` and `production` when running `astro build`.
- `import.meta.env.PROD`: `true` if your site is running in production; `false` otherwise.
- `import.meta.env.DEV`: `true` if your site is running in development; `false` otherwise. Always the opposite of `import.meta.env.PROD`.
- `import.meta.env.BASE_URL`: The base URL your site is being served from. This is determined by the [`base` config option](/en/reference/configuration-reference/#base).
- `import.meta.env.SITE`: This is set to [the `site` option](/en/reference/configuration-reference/#site) specified in your project’s `astro.config`.
- `import.meta.env.ASSETS_PREFIX`: The prefix for Astro-generated asset links if the [`build.assetsPrefix` config option](/en/reference/configuration-reference/#buildassetsprefix) is set. This can be used to create asset links not handled by Astro.

Use them like any other environment variable.

```ts
const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;
```

## Setting environment variables

[Section titled Setting environment variables](#setting-environment-variables)

### `.env` files

[Section titled .env files](#env-files)

Environment variables can be loaded from `.env` files in your project directory.

Just create a `.env` file in the project directory and add some variables to it.

.env

```ini
# This will only be available when run on the server!
DB_PASSWORD="foobar"
# This will be available everywhere!
PUBLIC_POKEAPI="https://pokeapi.co/api/v2"
```

You can also add `.production`, `.development` or a custom mode name to the filename itself (e.g `.env.testing`, `.env.staging`). This allows you to use different sets of environment variables at different times.

The `astro dev` and `astro build` commands default to `"development"` and `"production"` modes, respectively. You can run these commands with the [`--mode` flag](/en/reference/cli-reference/#--mode-string) to pass a different value for `mode` and load the matching `.env` file.

This allows you to run the dev server or build your site connecting to different APIs:

- [npm](#tab-panel-1854)
- [pnpm](#tab-panel-1855)
- [Yarn](#tab-panel-1856)

Terminal window

```bash
# Run the dev server connected to a "staging" API
npm run astro dev -- --mode staging
# Build a site that connects to a "production" API with additional debug information
npm run astro build -- --devOutput

# Build a site that connects to a "testing" API
npm run astro build -- --mode testing
```

Terminal window

```bash
# Run the dev server connected to a "staging" API
pnpm astro dev --mode staging

# Build a site that connects to a "production" API with additional debug information
pnpm astro build --devOutput

# Build a site that connects to a "testing" API
pnpm astro build --mode testing
```

```bash
# Run the dev server connected to a "staging" API
yarn astro dev --mode staging
# Build a site that connects to a "production" API with additional debug information
yarn astro build --devOutput
# Build a site that connects to a "testing" API
yarn astro build --mode testing
```

For more on `.env` files, [see the Vite documentation](https://vite.dev/guide/env-and-mode.html#env-files).

### In the Astro config file

[Section titled In the Astro config file](#in-the-astro-config-file)

Astro evaluates configuration files before it loads your other files. This means that you cannot use `import.meta.env` in `astro.config.mjs` to access environment variables that were set in `.env` files.

You can use `process.env` in a configuration file to access other environment variables, like those [set by the CLI](#using-the-cli).

You can also use [Vite’s `loadEnv` helper](https://main.vite.dev/config/#using-environment-variables-in-config) to manually load `.env` files.

astro.config.mjs

```ts
import { loadEnv } from "vite";
const { SECRET_PASSWORD } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
```

Note

`pnpm` does not allow you to import modules that are not directly installed in your project. If you are using `pnpm`, you will need to install `vite` to use the `loadEnv` helper.

Terminal window

```bash
pnpm add -D vite
```

### Using the CLI

[Section titled Using the CLI](#using-the-cli)

You can also add environment variables as you run your project:

- [npm](#tab-panel-1857)
- [pnpm](#tab-panel-1858)
- [Yarn](#tab-panel-1859)

```bash
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 npm run dev
```

```bash
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 pnpm run dev
```

```bash
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 yarn run dev
```

## Getting environment variables

[Section titled Getting environment variables](#getting-environment-variables)

Environment variables in Astro are accessed with `import.meta.env`, using the [`import.meta` feature added in ES2020](https://tc39.es/ecma262/2020/#prod-ImportMeta), instead of `process.env`.

For example, use `import.meta.env.PUBLIC_POKEAPI` to get the `PUBLIC_POKEAPI` environment variable.

```ts
// When import.meta.env.SSR === true
const data = await db(import.meta.env.DB_PASSWORD);
// When import.meta.env.SSR === false
const data = fetch(`${import.meta.env.PUBLIC_POKEAPI}/pokemon/squirtle`);
```

When using SSR, environment variables can be accessed at runtime based on the SSR adapter being used. With most adapters you can access environment variables with `process.env`, but some adapters work differently. For the Deno adapter, you will use `Deno.env.get()`. See how to [access the Cloudflare runtime](/en/guides/integrations-guide/cloudflare/#cloudflare-runtime) to handle environment variables when using the Cloudflare adapter. Astro will first check the server environment for variables, and if they don’t exist, Astro will look for them in `.env` files.

## Type safe environment variables

[Section titled Type safe environment variables](#type-safe-environment-variables)

The `astro:env` API lets you configure a type-safe schema for [environment variables you have set](#setting-environment-variables). This allows you to indicate whether they should be available on the server or the client, and define their data type and additional properties.

Developing an adapter? See how to [make an adapter compatible with `astro:env`](/en/reference/adapter-reference/#envgetsecret).

### Basic Usage

[Section titled Basic Usage](#basic-usage)

#### Define your schema

[Section titled Define your schema](#define-your-schema)

To configure a schema, add the `env.schema` option to your Astro config:

astro.config.mjs

```ts
import { defineConfig } from "astro/config";
export default defineConfig({
  env: {
    schema: {
      // ...
    }
  }
})
```

You can then [register variables as a string, number, enum, or boolean](#data-types) using the `envField` helper. Define the [kind of environment variable](#variable-types) by providing a `context` (`"client"` or `"server"`) and `access` (`"secret"` or `"public"`) for each variable, and pass any additional properties such as `optional` or `default` in an object:

astro.config.mjs

```ts
import { defineConfig, envField } from "astro/config";
export default defineConfig({
  env: {
    schema: {
      API_URL: envField.string({ context: "client", access: "public", optional: true }),
      PORT: envField.number({ context: "server", access: "public", default: 4321 }),
      API_SECRET: envField.string({ context: "server", access: "secret" }),
    }
  }
})
```

Types will be generated for you when running `astro dev` or `astro build`, but you can run `astro sync` to generate types only.

#### Use variables from your schema

[Section titled Use variables from your schema](#use-variables-from-your-schema)

Import and use your defined variables from the appropriate `/client` or `/server` module:

```ts
---
import { API_URL } from "astro:env/client";
import { API_SECRET_TOKEN } from "astro:env/server";
const data = await fetch(`${API_URL}/users`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_SECRET_TOKEN}`
  },
})
---
<script>
  import { API_URL } from "astro:env/client";
  fetch(`${API_URL}/ping`)
</script>
```

### Variable types

[Section titled Variable types](#variable-types)

There are three kinds of environment variables, determined by the combination of `context` (`"client"` or `"server"`) and `access` (`"secret"` or `"public"`) settings defined in your schema:

- **Public client variables**: These variables end up in both your final client and server bundles, and can be accessed from both client and server through the `astro:env/client` module:
  
```ts
import { API_URL } from "astro:env/client";
```

-**Public server variables**: These variables end up in your final server bundle and can be accessed on the server trough the `astro:env/server` module:

```ts
import { PORT } from "astro:env/server";
```

-**Secret server variables**: These variables are not part of your final bundle and can be accessed on the server trough the `astro:env/server` module:

```ts
import { API_SECRET } from "astro:env/server";
```
  
- By default, secrets are only validated at runtime. You can enable validating private variables on start by [configuring `validateSecrets: true`](/en/reference/configuration-reference/#envvalidatesecrets).

Note

**Secret client variables** are not supported because there is no safe way to send this data to the client. Therefore, it is not possible to configure both `context: "client"` and `access: "secret"` in your schema.

### Data types

[Section titled Data types](#data-types)

There are currently four data types supported: strings, numbers, enums, and booleans:

```ts
import { envField } from "astro/config";
envField.string({
   // context & access
   optional: true,
   default: "foo",
})

envField.number({
   // context & access
   optional: true,
   default: 15,
})

envField.boolean({
   // context & access
   optional: true,
   default: true,
})

envField.enum({
   // context & access
   values: ["foo", "bar", "baz"],
   optional: true,
   default: "baz",
})
```

For a complete list of validation fields, see the [`envField` API reference](/en/reference/configuration-reference/#envschema).

### Retrieving secrets dynamically

[Section titled Retrieving secrets dynamically](#retrieving-secrets-dynamically)

Despite defining your schema, you may want to retrieve the raw value of a given secret or to retrieve secrets not defined in your schema. In this case, you can use `getSecret()` exported from `astro:env/server`:

```ts
import {
   FOO, // boolean
   getSecret
} from "astro:env/server";
getSecret("FOO"); // string | undefined
```

Learn more in [the API reference](/en/reference/modules/astro-env/#getsecret).

### Limitations

[Section titled Limitations](#limitations)

`astro:env` is a virtual module which means it can only be used inside the Astro context. For example, you can use it in:

- Middlewares
- Astro routes and endpoints
- Astro components
- Framework components
- Modules

You cannot use it in the following and will have to resort to `process.env`:

- `astro.config.mjs`
- Scripts
# Configuration overview

Astro is a flexible, unopinionated framework that allows you to configure your project in many different ways. This means that getting started with a new project might feel overwhelming: there is no “one best way” to set up your Astro project!

The guides in this “Configuration” section will help you familiarize yourself with the various files that allow you to configure and customize aspects of your project and development environment.

If this is your first Astro project, or if it’s been a while since you’ve set up a new project, use the following guides and reference in the documentation for assistance.

## The Astro config File

[Section titled The Astro config File](#the-astro-config-file)

The [Astro config file](/en/reference/configuration-reference/) is a JavaScript file included at the root of every starter project:

astro.config.mjs

```ts
import { defineConfig } from "astro/config";
export default defineConfig({
  // your configuration options here...
});
```

It is only required if you have something to configure, but most projects will use this file. The `defineConfig()` helper provides automatic IntelliSense in your IDE and is where you will add all your configuration options to tell Astro how to build and render your project to HTML.

We recommend using the default file format `.mjs` in most cases, or `.ts` if you want to write TypeScript in your config file. However, `astro.config.js` and `astro.config.cjs` are also supported.

Read Astro’s [configuration reference](/en/reference/configuration-reference/) for a full overview of all supported configuration options.

## The TypeScript config File

[Section titled The TypeScript config File](#the-typescript-config-file)

Every Astro starter project includes a `tsconfig.json` file in your project. Astro’s [component script](/en/basics/astro-components/#the-component-script) is Typescript, which provides Astro’s editor tooling and allows you to optionally add syntax to your JavaScript for type checking of your own project code.

Use the `tsconfig.json` file to configure the TypeScript template that will perform type checks on your code, configure TypeScript plugins, set import aliases, and more.

Read Astro’s [TypeScript guide](/en/guides/typescript/) for a full overview of TypeScript options and Astro’s built-in utility types.

## Development Experience

[Section titled Development Experience](#development-experience)

While you work in development mode, you can take advantage of your code editor and other tools to improve the Astro developer experience.

Astro provides its own official VS Code extension and is compatible with several other popular editor tools. Astro also provides a customizable toolbar that displays in your browser preview while the dev server is running. You can install and even build your own toolbar apps for additional functionality.

Read Astro’s guides to [editor setup options](/en/editor-setup/) and [using the dev toolbar](/en/guides/dev-toolbar/) to learn how to customize your development experience.

## Common new project tasks

[Section titled Common new project tasks](#common-new-project-tasks)

Here are some first steps you might choose to take with a new Astro project.

### Add your deployment domain

[Section titled Add your deployment domain](#add-your-deployment-domain)

For generating your sitemap and creating canonical URLs, configure your deployment URL in the [`site`](/en/reference/configuration-reference/#site) option. If you are deploying to a path (e.g. `www.example/docs`), you can also configure a [`base`](/en/reference/configuration-reference/#base) for the root of your project.

Additionally, different deployment hosts may have different behavior regarding trailing slashes at the end of your URLs. (e.g. `example.com/about` vs `example.com/about/`). Once your site is deployed, you may need to configure your [`trailingSlash`](/en/reference/configuration-reference/#trailingslash) preference.

astro.config.mjs

```ts
import { defineConfig } from "astro/config";
export default defineConfig({

  site: "https://www.example.com",

  base: "/docs",

  trailingSlash: "always",

});
```

### Add site metadata

[Section titled Add site metadata](#add-site-metadata)

Astro does not use its configuration file for common SEO or meta data, only for information required to build your project code and render it to HTML.

Instead, this information is added to your page `<head>` in HTML `<link>` and `<meta>` tags, just as if you were writing plain HTML pages.

One common pattern for Astro sites is to create a `<Head />` [`.astro` component](/en/basics/astro-components/) that can be added to a common [layout component](/en/basics/layouts/) so it can apply to all your pages.

src/components/MainLayout.astro

```ts
---

import Head from "./Head.astro";
const { ...props } = Astro.props;

---

<html>

  <head>

    <meta charset="utf-8">

    <Head />

    <!-- Additional head elements -->

  </head>

  <body>

    <!-- Page content goes here -->

  </body>

</html>
```

Because `Head.astro` is just a regular Astro component, you can import files and receive props passed from other components, such as a specific page title.

src/components/Head.astro

```ts
---

import Favicon from "../assets/Favicon.astro";

import SomeOtherTags from "./SomeOtherTags.astro";
const { title = "My Astro Website", ...props } = Astro.props;

---

<link rel="sitemap" href="/sitemap-index.xml">

<title>{title}</title>

<meta name="description" content="Welcome to my new Astro site!">
<!-- Web analytics -->

<script data-goatcounter="https://my-account.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
<!-- Open Graph tags -->

<meta property="og:title" content="My New Astro Website" />

<meta property="og:type" content="website" />

<meta property="og:url" content="http://www.example.com/" />

<meta property="og:description" content="Welcome to my new Astro site!" />

<meta property="og:image" content="https://www.example.com/_astro/seo-banner.BZD7kegZ.webp">

<meta property="og:image:alt" content="">
<SomeOtherTags />
<Favicon />
```
# Dev toolbar

While the dev server is running, Astro includes a dev toolbar at the bottom of every page in your local browser preview.

This toolbar includes a number of useful tools for debugging and inspecting your site during development and can be [extended with more dev toolbar apps](#extending-the-dev-toolbar) found in the integrations directory. You can even [build your own toolbar apps](/en/recipes/making-toolbar-apps/) using the [Dev Toolbar API](/en/reference/dev-toolbar-app-reference/)!

This toolbar is enabled by default and appears when you hover over the bottom of the page. It is a development tool only and will not appear on your published site.

## Built-in apps

[Section titled Built-in apps](#built-in-apps)

### Astro Menu

[Section titled Astro Menu](#astro-menu)

The Astro Menu app provides easy access to various information about the current project and links to extra resources. Notably, it provides one-click access to the Astro documentation, GitHub repository, and Discord server.

This app also includes a “Copy debug info” button which will run the [`astro info`](/en/reference/cli-reference/#astro-info) command and copy the output to your clipboard. This can be useful when asking for help or reporting issues.

### Inspect

[Section titled Inspect](#inspect)

The Inspect app provides information about any [islands](/en/concepts/islands/) on the current page. This will show you the properties passed to each island, and the client directive that is being used to render them.

### Audit

[Section titled Audit](#audit)

The Audit app automatically runs a series of audits on the current page, checking for the most common performance and accessibility issues. When an issue is found, a red dot will appear in the toolbar. Clicking on the app will pop up a list of results from the audit and will highlight the related elements directly in the page.

Note

The basic performance and accessibility audits performed by the dev toolbar are not a replacement for dedicated tools like [Pa11y](https://pa11y.org/) or [Lighthouse](https://developers.google.com/web/tools/lighthouse), or even better, humans!

The dev toolbar aims to provide a quick and easy way to catch common issues during development, without needing to context-switch to a different tool.

### Settings

[Section titled Settings](#settings)

The Settings app allows you to configure options for the dev toolbar, such as verbose logging, disabling notifications, and adjusting its placement on your screen.

## Extending the dev toolbar

[Section titled Extending the dev toolbar](#extending-the-dev-toolbar)

Astro integrations can add new apps to the dev toolbar, allowing you to extend it with custom tools that are specific to your project. You can find [more dev tool apps to install in the integrations directory](https://astro.build/integrations/?search=&categories%5B%5D=toolbar) or using the [Astro Menu](#astro-menu).

Install additional dev toolbar app integrations in your project just like any other [Astro integration](/en/guides/integrations-guide/) according to its own installation instructions.

![](/houston_chef.webp) **Related recipe:** [Create a dev toolbar app](/en/recipes/making-toolbar-apps/)

## Disabling the dev toolbar

[Section titled Disabling the dev toolbar](#disabling-the-dev-toolbar)

The dev toolbar is enabled by default for every site. You can choose to disable it for individual projects and/or users as needed.

### Per-project

[Section titled Per-project](#per-project)

To disable the dev toolbar for everyone working on a project, set `devToolbar: false` in the [Astro config file](/en/reference/configuration-reference/#devtoolbarenabled).

astro.config.mjs

```ts
import { defineConfig } from "astro/config";
export default defineConfig({
  devToolbar: {
    enabled: false
  }
});
```

To enable the dev toolbar again, remove these lines from your configuration, or set `enabled: true`.

### Per-user

[Section titled Per-user](#per-user)

To disable the dev toolbar for yourself on a specific project, run the [`astro preferences`](/en/reference/cli-reference/#astro-preferences) command.

```bash
astro preferences disable devToolbar
```

To disable the dev toolbar in all Astro projects for a user on the current machine, add the `--global` flag when running `astro-preferences`:

```bash
astro preferences disable --global devToolbar
```

The dev toolbar can later be enabled with:

```bash
astro preferences enable devToolbar
```
