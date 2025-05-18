---
title: marp-cli
draft: false
---
# marp-team/marp-cli

**A CLI interface, for[Marp](https://github.com/marp-team/marp)** (using [@marp-team/marp-core](https://github.com/marp-team/marp-core)) and any slide deck converter based on [Marpit](https://marpit.marp.app/) framework.

It can convert Marp / Marpit Markdown files into static HTML / CSS, PDF, PowerPoint document, and image(s) easily.

[![](marp-cli_files/marp-cli.gif)](./marp-cli_files/marp-cli.gif) [ ![marp-cli.gif](marp-cli_files/marp-cli.gif) ](./marp-cli_files/marp-cli.gif) [ ](./marp-cli_files/marp-cli.gif)

## Try it now!

[](https://github.com/marp-team/marp-cli#try-it-now)

### npx

[](https://github.com/marp-team/marp-cli#npx)

[npx (`npm exec`)](https://docs.npmjs.com/cli/commands/npx) is the best way to use the latest Marp CLI if you wanted one-shot Markdown conversion _without install_. Just run below if you have installed [Node.js](https://nodejs.org/) v18 and later.
```bash
    # Convert slide deck into HTML
    npx @marp-team/marp-cli@latest slide-deck.md
    npx @marp-team/marp-cli@latest slide-deck.md -o output.html

    # Convert slide deck into PDF
    npx @marp-team/marp-cli@latest slide-deck.md --pdf
    npx @marp-team/marp-cli@latest slide-deck.md -o output.pdf

    # Convert slide deck into PowerPoint document (PPTX)
    npx @marp-team/marp-cli@latest slide-deck.md --pptx
    npx @marp-team/marp-cli@latest slide-deck.md -o output.pptx

    # Watch mode
    npx @marp-team/marp-cli@latest -w slide-deck.md

    # Server mode (Pass directory to serve)
    npx @marp-team/marp-cli@latest -s ./slides
```

Important

You have to install any one of [Google Chrome](https://www.google.com/chrome/), [Microsoft Edge](https://www.microsoft.com/edge), or [Mozilla Firefox](https://www.mozilla.org/firefox/new/) to convert slide deck into PDF, PPTX, and image(s).

### Container image

[](https://github.com/marp-team/marp-cli#container-image)

Don't you like installing Node.js and Chrome to local? We have an official container image that is ready to use CLI.

[**⏩ Please refer how to use at Docker Hub.**](https://hub.docker.com/r/marpteam/marp-cli/)

#### [Docker Hub](https://hub.docker.com/r/marpteam/marp-cli/)

[](https://github.com/marp-team/marp-cli#docker-hub)
```
    docker pull marpteam/marp-cli
```

#### [GitHub Container Registry](https://github.com/marp-team/marp-cli/pkgs/container/marp-cli)

[](https://github.com/marp-team/marp-cli#github-container-registry)
```
    docker pull ghcr.io/marp-team/marp-cli
```

## Install

[](https://github.com/marp-team/marp-cli#install)

### Use package manager

[](https://github.com/marp-team/marp-cli#use-package-manager)

You can use the package manager to install and update Marp CLI easily.

_Disclaimer: Package manifests are maintained by the community, not Marp team._

#### macOS: **[Homebrew](https://brew.sh/)**

[](https://github.com/marp-team/marp-cli#macos-homebrew)
```
    brew install marp-cli
```

#### Windows: **[Scoop](https://scoop.sh/)**

[](https://github.com/marp-team/marp-cli#windows-scoop)
```
    scoop install marp
```

### Local installation

[](https://github.com/marp-team/marp-cli#local-installation)

We recommend to install Marp CLI into your Node.js project. You may control the CLI version (and engine if you want) exactly.
```
    npm install --save-dev @marp-team/marp-cli
```

The installed `marp` command is available in [npm-scripts](https://docs.npmjs.com/misc/scripts) or `npx marp`.

Note

Marp CLI is working only with [actively supported Node.js versions](https://endoflife.date/nodejs), so Node.js v18 and later is required when installing into your Node.js project.

#### Global installation

[](https://github.com/marp-team/marp-cli#global-installation)

You can install with `-g` option if you want to use `marp` command globally.
```
    npm install -g @marp-team/marp-cli
```

### [Standalone binary](https://github.com/marp-team/marp-cli/releases)

[](https://github.com/marp-team/marp-cli#standalone-binary)

We also provide standalone binaries for Linux, macOS, and Windows. These have bundled Marp CLI with Node.js binary, so no need to install Node.js separately.

**[⏩ Download the latest standalone binary from release page.](https://github.com/marp-team/marp-cli/releases)**

## Basic usage

[](https://github.com/marp-team/marp-cli#basic-usage)

Important

Several kind of conversions with 🌐 icon require to install any of compatible browsers, [Google Chrome](https://www.google.com/chrome/), [Microsoft Edge](https://www.microsoft.com/edge), or [Mozilla Firefox](https://www.mozilla.org/firefox/new/). When an unexpected problem has occurred while converting, please update your browser to the latest version. Check out [browser options](https://github.com/marp-team/marp-cli#browser-options) too.

### Convert to HTML

[](https://github.com/marp-team/marp-cli#convert-to-html)

The passed markdown will be converted to HTML file by default. In the below example, a converted `slide-deck.html` will output to the same directory.
```
    marp slide-deck.md
```

You can change the output path by `--output` (`-o`) option.
```
    marp slide-deck.md -o output.html
```

Marp CLI supports converting multiple files by passing multiple paths, directories, and glob patterns. In this case, `--output` option cannot use.

When you want to output the converted result to another directory with keeping the origin directory structure, you can use `--input-dir` (`-I`) option. `--output` option would be available for specify the output directory.

### Convert to PDF (`--pdf`) 🌐

[](https://github.com/marp-team/marp-cli#convert-to-pdf---pdf-)

If you passed `--pdf` option or the output filename specified by `--output` (`-o`) option ends with `.pdf`, Marp CLI will try to convert Markdown into PDF file through the browser.
```
    marp --pdf slide-deck.md
    marp slide-deck.md -o converted.pdf
```

#### PDF output options

[](https://github.com/marp-team/marp-cli#pdf-output-options)

  * **`--pdf-notes`** : Add PDF note annotations to the lower left when the slide page has [Marpit presenter notes](https://marpit.marp.app/usage?id=presenter-notes).
  * **`--pdf-outlines`** : Add PDF outlines/bookmarks.



`--pdf-outlines` will make outlines based on slide pages and Markdown headings by default. If necessary, you may prevent making outlines from one of them, by setting `--pdf-outlines.pages=false` or `--pdf-outlines.headings=false`.

[![](marp-cli_files/pdf-output-options.png)](./marp-cli_files/pdf-output-options.png)

### Convert to PowerPoint document (`--pptx`) 🌐

[](https://github.com/marp-team/marp-cli#convert-to-powerpoint-document---pptx-)

Do you want more familiar way to present and share your deck? PPTX conversion to create PowerPoint document is available by passing `--pptx` option or specify the output path with PPTX extension.
```
    marp --pptx slide-deck.md
    marp slide-deck.md -o converted.pptx
```

A created PPTX includes rendered Marp slide pages and the support of [Marpit presenter notes](https://marpit.marp.app/usage?id=presenter-notes). It can open with PowerPoint, Keynote, Google Slides, LibreOffice Impress, and so on...

[![](marp-cli_files/pptx.png)](./marp-cli_files/pptx.png)

Warning

A converted PPTX consists of pre-rendered images. Please note that **contents would not be able to modify** or re-use in PowerPoint.

### Convert to PNG/JPEG image(s) 🌐

[](https://github.com/marp-team/marp-cli#convert-to-pngjpeg-images-)

#### Multiple images (`--images`)

[](https://github.com/marp-team/marp-cli#multiple-images---images)

You can convert the slide deck into multiple images when specified `--images [png|jpeg]` option.
```
    # Convert into multiple PNG image files
    marp --images png slide-deck.md

    # Convert into multiple JPEG image files
    marp --images jpeg slide-deck.md
```

Output files have a suffix of page number, like `slide-deck.001.png`, `slide-deck.002.png`, and so on.

#### Title slide (`--image`)

[](https://github.com/marp-team/marp-cli#title-slide---image)

When you passed `--image` option or specified the output path with PNG/JPEG extension, Marp CLI will convert _only the first page (title slide)_ of the targeted slide deck into an image.
```
    # Convert the title slide into an image
    marp --image png slide-deck.md
    marp slide-deck.md -o output.png
```

It would be useful for creating [Open Graph](http://ogp.me/) image that can specify with [`image` global directive and `--og-image` option](https://github.com/marp-team/marp-cli#metadata).

#### Scale factor

[](https://github.com/marp-team/marp-cli#scale-factor)

You can set the scale factor for rendered image(s) through `--image-scale` option. It is useful for making high-resolution image from the slide.
```
    # Generate high-resolution image of the title slide
    marp slide-deck.md -o title-slide@2x.png --image-scale 2
```

Tip

`--image-scale` is not affect to the actual size of presentation.

The scale factor is also available for PPTX conversion. By default, Marp CLI will use `2` as the default scale factor in PPTX, to suppress deterioration of slide rendering in full-screen presentation.

### Export presenter notes (`--notes`)

[](https://github.com/marp-team/marp-cli#export-presenter-notes---notes)

You can export [presenter notes](https://marpit.marp.app/usage?id=presenter-notes) in Marp / Marpit Markdown as a text file by using `--notes` option or specifying the output path with TXT extension.
```
    # Export presenter notes as a text
    marp --notes slide-deck.md
    marp slide-deck.md -o output.txt
```

### Security about local files

[](https://github.com/marp-team/marp-cli#security-about-local-files)

Because of [the security reason](https://github.com/marp-team/marp-cli/pull/10#user-content-security), **conversion that is using the browser cannot use local files by default.**

Marp CLI would output incomplete result with warning if the blocked local file accessing is detected. We recommend uploading your assets to online.

If you really need to use local files in these conversion, `--allow-local-files` option helps to find your local files. _Please use only to the trusted Markdown because there is a potential security risk._
```
    marp --pdf --allow-local-files slide-deck.md
```

## Conversion modes

[](https://github.com/marp-team/marp-cli#conversion-modes)

### Watch mode (`--watch` / `-w`)

[](https://github.com/marp-team/marp-cli#watch-mode---watch---w-)

Marp CLI will observe a change of Markdown and using theme CSS when passed with `--watch` (`-w`) option. The conversion will be triggered whenever the content of file is updated.

While you are opening the converted HTML in browser, it would refresh the opened page automatically.

### Server mode (`--server` / `-s`)

[](https://github.com/marp-team/marp-cli#server-mode---server---s)

Server mode supports on-demand conversion by HTTP request. We require to pass `--server` (`-s`) option and a directory to serve.

[![](marp-cli_files/server-mode.gif)](./marp-cli_files/server-mode.gif) [ ![server-mode.gif](marp-cli_files/server-mode.gif) ](./marp-cli_files/server-mode.gif) [ ](./marp-cli_files/server-mode.gif)

In this mode, the converted file outputs as the result of accessing to server, and not to disk.

You would get the converted PDF, PPTX, PNG, JPEG, and TXT by adding corresponded query string when requesting. e.g. `http://localhost:8080/deck-a.md?pdf` returns converted PDF.

Tip

You can set the server port by setting the environment variable `PORT`. For example, `PORT=5000 marp -s ./slides` would listen on port number 5000.

#### `index.md` / `PITCHME.md`

[](https://github.com/marp-team/marp-cli#indexmd--pitchmemd)

Marp CLI server will provide the list of served files by default, but you can place the default Markdown deck like a common web server's `index.html`.

Place Markdown named `index.md` or `PITCHME.md` ([GitPitch style](https://gitpitch.github.io/gitpitch/#/conventions/pitchme-md)) to served directory. It would be redirected just accessing to `http://localhost:8080/`.

### Preview window (`--preview` / `-p`)

[](https://github.com/marp-team/marp-cli#preview-window---preview---p)

When conversions were executed together with `--preview` (`-p`) option, Marp CLI will open preview window(s) to check the converted result immediately.

Unlike opening with browser, you may present deck with the immersive window. [Watch mode](https://github.com/marp-team/marp-cli#watch-mode) is automatically enabled while using preview window.

Note

`--preview` option cannot use when you are using Marp CLI through official Docker image.

## Browser options

[](https://github.com/marp-team/marp-cli#browser-options)

### Choose browser (`--browser`)

[](https://github.com/marp-team/marp-cli#choose-browser---browser)

You can specify the kind of browser for conversion by `--browser` option. Available browsers are `chrome`, `edge`, and `firefox`. If set comma-separated browsers, Marp CLI will try to use the first available browser among them.
```
    # Use Firefox for image conversion
    marp --browser firefox ./slide.md -o slide.png

    # Prefer to use Firefox first, then Chrome
    marp --browser firefox,chrome ./slide.md -o slide.png
```

The default is a special value `auto`, which means to use the first available browser from `chrome,edge,firefox`.

Warning

_Firefox support is still early stage._ The PDF output generated by Firefox may include some incompatible renderings compared to the PDF generated by Chrome.

### Browser path (`--browser-path`)

[](https://github.com/marp-team/marp-cli#browser-path---browser-path)

If you have a browser binary that cannot find out by Marp CLI automatically, you can explicitly set the path to the browser executable through `--browser-path` option.
```
    # Use Chromium-flavored browser (Chromium, Brave, Vivaldi, etc...)
    marp --browser-path /path/to/chromium-flavored-browser ./slide.md -o slide.pdf

    # Use Firefox with explicitly set path
    marp --browser firefox --browser-path /path/to/firefox ./slide.md -o slide.png
```

### Other browser options

[](https://github.com/marp-team/marp-cli#other-browser-options)

  * **`--browser-protocol`** : Set the preferred protocol for connecting to the browser.
    * `cdp`: [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (default)
    * `webdriver-bidi`: [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)
  * **`--browser-timeout`** : Set the timeout for each browser operation in seconds. (default: `30` seconds)



## Template

[](https://github.com/marp-team/marp-cli#template)

You can choose a built-in HTML templates by `--template` option. Default template is `bespoke`.
```
    marp --template bespoke slide-deck.md
```

### `bespoke` template (default)

[](https://github.com/marp-team/marp-cli#bespoke-template-default)

The `bespoke` template is using [Bespoke.js](https://github.com/bespokejs/bespoke) as the name implies. It has several features to be useful in a real presentation. A few features may control by CLI options.

#### Features

[](https://github.com/marp-team/marp-cli#features)

  * **Navigation** : Navigate the deck through keyboard and swipe geasture.
  * **Fullscreen** : Toggle fullscreen by hitting `f` / `F11` key.
  * **On-screen controller** : There is a touch-friendly OSC. You may also disable by `--bespoke.osc=false` if unneccesary.
  * **Fragmented list** : Recognize [Marpit's fragmented list](https://github.com/marp-team/marpit/issues/145) and appear list one-by-one if used `*` and `1)` as the bullet marker.
  * **Presenter view** : Open presenter view in external window by hitting `p` key. (It may become disabled when not fulfilled requirements for working)
  * **Progress bar** (optional): By setting `--bespoke.progress` option, you can add a progress bar on the top of the deck.
  * [**Slide transitions**](https://github.com/marp-team/marp-cli/blob/main/docs/bespoke-transitions/README.md): Support transitions (`transition` local directive) powered by [View Transitions API](https://www.w3.org/TR/css-view-transitions-1/).



#### Docs

[](https://github.com/marp-team/marp-cli#docs)

  * **[Slide transitions in`bespoke` template](https://github.com/marp-team/marp-cli/blob/main/docs/bespoke-transitions/README.md)**
Learn all about of slide transitions for `bespoke` template: Built-in transitions, custom transitions, and morphing animations.



[ ![](marp-cli_files/morphing-animation.gif) ](https://github.com/marp-team/marp-cli/blob/main/docs/bespoke-transitions/README.md) [ ![morphing-animation.gif](marp-cli_files/morphing-animation.gif) ](https://github.com/marp-team/marp-cli/blob/main/docs/bespoke-transitions/README.md) [ ](https://github.com/marp-team/marp-cli/blob/main/docs/bespoke-transitions/README.md)

### `bare` template

[](https://github.com/marp-team/marp-cli#bare-template)

The `bare` template is a primitive template, and there is no extra features. It only has minimum assets to give your presentation with browser.

#### Zero-JS slide deck

[](https://github.com/marp-team/marp-cli#zero-js-slide-deck)

When [the conversion engine is changed to Marpit framework by setting `engine` option](https://github.com/marp-team/marp-cli#use-marpit-framework), _it would not use any scripts._ Even then, it has enough to use for the browser-based presentation.
```
    marp --template bare --engine @marp-team/marpit slide-deck.md
```

## Metadata

[](https://github.com/marp-team/marp-cli#metadata)

Through [global directives](https://marpit.marp.app/directives?id=global-directives-1) or CLI options, you can set metadata for a converted HTML, PDF, and PPTX slide deck.

[Global directives](https://marpit.marp.app/directives?id=global-directives-1) | CLI option | Description | Available in
---|---|---|---
`title` | `--title` | Define title of the slide deck | HTML, PDF, PPTX
`description` | `--description` | Define description of the slide | HTML, PDF, PPTX
`author` | `--author` | Define author of the slide deck | HTML, PDF, PPTX
`keywords` | `--keywords` | Define comma-separated keywords | HTML, PDF
`url` | `--url` | Define [canonical URL](https://en.wikipedia.org/wiki/Canonical_link_element) | HTML
`image` | `--og-image` | Define [Open Graph](http://ogp.me/) image URL | HTML

### By [global directives](https://marpit.marp.app/directives?id=global-directives-1)

[](https://github.com/marp-team/marp-cli#by-global-directives)

Marp CLI supports _additional[global directives](https://marpit.marp.app/directives?id=global-directives-1)_ to specify metadata in Markdown. You can define meta values in Markdown front-matter.
```
    ---
    title: Marp slide deck
    description: An example slide deck created by Marp CLI
    author: Yuki Hattori
    keywords: marp,marp-cli,slide
    url: https://marp.app/
    image: https://marp.app/og-image.jpg
    ---

    # Marp slide deck
```

### By CLI option

[](https://github.com/marp-team/marp-cli#by-cli-option)

Marp CLI prefers CLI option to global directives. You can override metadata values by `--title`, `--description`, `--author`, `--keywords`, `--url`, and `--og-image`.

## Theme

[](https://github.com/marp-team/marp-cli#theme)

### Override theme

[](https://github.com/marp-team/marp-cli#override-theme)

You can override theme you want to use by `--theme` option. For example to use [Gaia](https://github.com/marp-team/marp-core/tree/main/themes#gaia) built-in theme in Marp Core:
```
    marp --theme gaia
```

### Use custom theme

[](https://github.com/marp-team/marp-cli#use-custom-theme)

A custom theme created by user also can use easily by passing the path of CSS file.
```
    marp --theme custom-theme.css
```

Tip

[Marpit theme CSS requires `@theme` meta comment](https://marpit.marp.app/theme-css?id=metadata) in regular use, but it's not required in this usage.

### Theme set

[](https://github.com/marp-team/marp-cli#theme-set)

`--theme-set` option has to specify theme set composed by multiple theme CSS files. The registed themes are usable in [Marpit's `theme` directive](https://marpit.marp.app/directives?id=theme).
```
    # Multiple theme CSS files
    marp --theme-set theme-a.css theme-b.css theme-c.css -- deck-a.md deck-b.md

    # Theme directory
    marp --theme-set ./themes -- deck.md
```

## Engine

[](https://github.com/marp-team/marp-cli#engine)

Marp CLI is calling the [Marpit framework](https://marpit.marp.app/) based converter as "Engine". Normally we use the bundled [Marp Core](https://github.com/marp-team/marp-core), but you may swap the conversion engine to another Marpit based engine through `--engine` option.

You can use Marp (and compatible markdown-it) plugins while converting, or completely swap the converter to the other Marpit-based engine which published to npm.

### Use Marpit framework

[](https://github.com/marp-team/marp-cli#use-marpit-framework)

For example, you can convert Markdown with using the pure Marpit framework.
```
    # Install Marpit framework
    npm i @marp-team/marpit

    # Specify engine to use Marpit
    marp --engine @marp-team/marpit marpit-deck.md
```

Notice that Marpit has not provided theme. It would be good to include inline style in Markdown, or pass CSS file by `--theme` option.

Tip

If you want to use the Marpit-based custom engine by the module name, the specified module must be exporting a class inherited from Marpit as the default export.

### Functional engine

[](https://github.com/marp-team/marp-cli#functional-engine)

When you specified the path to JavaScript file (`.js`, `.cjs`, or `.mjs`) in `--engine` option, you may use more customized engine by a JavaScript function.

#### Spec

[](https://github.com/marp-team/marp-cli#spec)

The functional engine should export a function as the default export, which should have a single argument representing [the constructor option of Marpit](https://marpit-api.marp.app/marpit)/[Marp Core](https://github.com/marp-team/marp-core#constructor-options).

The function must return a class inherited from Marpit, or an instance of Marpit-based engine made by the parameter passed by argument.
```
    // engine.mjs (ES modules)
    import { MarpitBasedEngine } from 'marpit-based-engine'

    export default () => MarpitBasedEngine // Return a class inherited from Marpit
```
```
    // engine.cjs (CommonJS)
    const { MarpitBasedEngine } = require('marpit-based-engine')

    module.exports = function (constructorOptions) {
      // Return an instance of Marpit initialized by passed constructor options
      return new MarpitBasedEngine(constructorOptions)
    }
```

This function can return [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object so you can use [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) too.
```
    export default async (constructorOptions) => {
      const { MarpitBasedEngine } = await import('marpit-based-engine')
      return new MarpitBasedEngine(constructorOptions)
    }
```

Warning

Currently ES Modules can resolve only when using Marp CLI via Node.js. [The standalone binary](https://github.com/marp-team/marp-cli#standalone-binary) cannot resolve ESM. ([vercel/pkg#1291](https://github.com/vercel/pkg/issues/1291))

#### `marp` getter property

[](https://github.com/marp-team/marp-cli#marp-getter-property)

Marp CLI also exposes `marp` getter property to the parameter. It returns a prepared instance of the built-in Marp Core engine, so you can apply several customizations to Marp engine with simple declarations.
```
    const marpPlugin = require('marp-plugin-foo')
    const andMorePlugin = require('marp-plugin-bar')

    module.exports = ({ marp }) => marp.use(marpPlugin).use(andMorePlugin)
```

It allows converting Markdown with additional syntaxes that were provided by Marp (or compatible markdown-it) plugins.

#### Example: [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)

[](https://github.com/marp-team/marp-cli#example-markdown-it-mark)
```
    // engine.mjs
    import markdownItMark from 'markdown-it-mark'

    export default ({ marp }) => marp.use(markdownItMark)
```
```
    # Install markdown-it-mark into your project
    npm i markdown-it-mark --save

    # Specify the path to functional engine
    marp --engine ./engine.mjs slide-deck.md
```

The customized engine will convert `==marked==` to `<mark>marked</mark>`.

### Confirm engine version

[](https://github.com/marp-team/marp-cli#confirm-engine-version)

By using `--version` (`-v`) option, you may confirm the version of engine that is expected to use in current configuration.
```
    $ marp --version
    @marp-team/marp-cli v41.x.x (w/ @marp-team/marp-core v4.x.x)
```

### Use specific version of Marp Core

[](https://github.com/marp-team/marp-cli#use-specific-version-of-marp-core)

Marp CLI prefers to use _an installed core to local project by user_ than the bundled.

If the current project has installed `@marp-team/marp-core` individually, it would show its version and the annotation: `w/ user-installed @marp-team/marp-core vX.X.X` or `w/ customized engine`.
```
    $ npm i @marp-team/marp-cli @marp-team/marp-core@^4.0.0 --save-dev
    $ npx marp --version
    @marp-team/marp-cli v4.x.x (w/ user-installed @marp-team/marp-core v4.0.0)
```

## Configuration file

[](https://github.com/marp-team/marp-cli#configuration-file)

Marp CLI can be configured options with file, such as `marp.config.js`, `marp.config.mjs` (ES Modules), `marp.config.cjs` (CommonJS), `.marprc` (JSON / YAML), and `marp` section of `package.json`.

It is useful to configure settings for the whole of project.
```
    // package.json
    {
      "marp": {
        "inputDir": "./slides",
        "output": "./public",
        "themeSet": "./themes"
      }
    }
```
```
    # .marprc.yml
    allowLocalFiles: true
    options:
      looseYAML: false
      markdown:
        breaks: false
    pdf: true
```
```
    // marp.config.mjs
    import markdownItContainer from 'markdown-it-container'

    export default {
      // Customize engine on configuration file directly
      engine: ({ marp }) => marp.use(markdownItContainer, 'custom'),
    }
```

By default we use configuration file that is placed on current directory, but you may also specify the path for a configuration file by `--config-file` (`--config` / `-c`) option.

If you want to prevent looking up a configuration file, you can pass `--no-config-file` (`--no-config`) option.

Warning

Currently ES Modules can resolve only when using Marp CLI via Node.js. [The standalone binary](https://github.com/marp-team/marp-cli#standalone-binary) cannot resolve ESM. ([vercel/pkg#1291](https://github.com/vercel/pkg/issues/1291))

### Options

[](https://github.com/marp-team/marp-cli#options)

Key | Type | CLI option | Description
---|---|---|---
`allowLocalFiles` | boolean | `--allow-local-files` | Allow to access local files from Markdown while converting PDF _(NOT SECURE)_
`author` | string | `--author` | Define author of the slide deck
`bespoke` | object |  | Setting options for `bespoke` template
┗ `osc` | boolean | `--bespoke.osc` | [Bespoke] Use on-screen controller (`true` by default)
┗ `progress` | boolean | `--bespoke.progress` | [Bespoke] Use progress bar (`false` by default)
┗ `transition` | boolean | `--bespoke.transition` | [Bespoke] Use [transitions](https://github.com/marp-team/marp-cli/blob/main/docs/bespoke-transitions/README.md) (Only in browsers supported [View Transitions API](https://www.w3.org/TR/css-view-transitions-1/): `true` by default)
`browser` | string | string[] | `--browser` | The kind of browser for conversion (`auto` by default)
`browserPath` | string | `--browser-path` | Path to the browser executable
`browserProtocol` | `cdp` | `webdriver-bidi` | `--browser-protocol` | Set the preferred protocol for connecting to the browser (`cdp` by default)
`browserTimeout` | number | `--browser-timeout` | Set the timeout for each browser operation in seconds (`30` by default)
`description` | string | `--description` | Define description of the slide deck
`engine` | string | Class | Function | `--engine` | Specify Marpit based engine
`html` | boolean | object | `--html` | Enable or disable HTML tags (Configuration file can pass [the whitelist object](https://github.com/marp-team/marp-core#html-boolean--object) if you are using Marp Core)
`image` | `png` | `jpeg` | `--image` | Convert the first slide page into an image file
`images` | `png` | `jpeg` | `--images` | Convert slide deck into multiple image files
`imageScale` | number | `--image-scale` | The scale factor for rendered images (`1` by default, or `2` for PPTX conversion)
`inputDir` | string | `--input-dir` `-I` | The base directory to find markdown and theme CSS
`jpegQuality` | number | `--jpeg-quality` | Setting JPEG image quality (`85` by default)
`keywords` | string | string[] | `--keywords` | Define keywords for the slide deck (Accepts comma-separated string and array of string)
`lang` | string |  | Define the language of converted HTML
`notes` | boolean | `--notes` | Convert slide deck notes into a text file
`ogImage` | string | `--og-image` | Define [Open Graph](http://ogp.me/) image URL
`options` | object |  | The base options for the constructor of engine
`output` | string | `--output` `-o` | Output file path (or directory when input-dir is passed)
`pdf` | boolean | `--pdf` | Convert slide deck into PDF
`pdfNotes` | boolean | `--pdf-notes` | Add [presenter notes](https://marpit.marp.app/usage?id=presenter-notes) to PDF as annotations
`pdfOutlines` | boolean | object | `--pdf-outlines` | Add outlines (bookmarks) to PDF
┗ `pages` | boolean | `--pdf-outlines.pages` | Make PDF outlines from slide pages (`true` by default when `pdfOutlines` is enabled)
┗ `headings` | boolean | `--pdf-outlines.headings` | Make PDF outlines from Markdown headings (`true` by default when `pdfOutlines` is enabled)
`pptx` | boolean | `--pptx` | Convert slide deck into PowerPoint document
`preview` | boolean | `--preview` `-p` | Open preview window
`server` | boolean | `--server` `-s` | Enable server mode
`template` | `bare` | `bespoke` | `--template` | Choose template (`bespoke` by default)
`theme` | string | `--theme` | Override theme by name or CSS file
`themeSet` | string | string[] | `--theme-set` | Path to additional theme CSS files
`title` | string | `--title` | Define title of the slide deck
`url` | string | `--url` | Define [canonical URL](https://en.wikipedia.org/wiki/Canonical_link_element)
`watch` | boolean | `--watch` `-w` | Watch input markdowns for changes

Some of options that cannot specify through CLI options can be configured by file. (e.g. `options` field for the constructor option of used engine)

Example: Customize engine's constructor option

You can fine-tune constructor options for the engine, [Marp Core](https://github.com/marp-team/marp-core#constructor-options) / [Marpit](https://marpit-api.marp.app/marpit).
```
    {
      "options": {
        "markdown": {
          "breaks": false
        },
        "minifyCSS": false
      }
    }
```

This configuration will set the constructor option for Marp Core as specified:

  * Disables [Marp Core's line breaks conversion](https://github.com/marp-team/marp-core#marp-markdown) (`\n` to `<br />`) to match for CommonMark, by passing [markdown-it's `breaks` option](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) as `false`.
  * Disable minification for rendered theme CSS to make debug your style easily, by passing [`minifyCSS`](https://github.com/marp-team/marp-core#minifycss-boolean) as `false`.



> [!WARNING]
>
> Some options may be overridden by used template.

### Auto completion

[](https://github.com/marp-team/marp-cli#auto-completion)

For getting the power of auto completion for the config, such as [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense), you can annotate the config object through JSDoc, with Marp CLI's `Config` type.
```
    /** @type {import('@marp-team/marp-cli').Config} */
    const config = {
      // ...
    }

    export default config
```

Or you can use Vite-like `defineConfig` helper from Marp CLI instead.
```
    import { defineConfig } from '@marp-team/marp-cli'

    export default defineConfig({
      // ...
    })
```

#### `Config` type with custom engine

[](https://github.com/marp-team/marp-cli#config-type-with-custom-engine)

If you've swapped the engine into another Marpit based engine, you can provide better suggestion for `options` field by passing the engine type to generics.
```
    /** @type {import('@marp-team/marp-cli').Config<typeof import('@marp-team/marpit').Marpit>} */
    const config = {
      engine: '@marp-team/marpit',
      options: {
        // Suggest only Marpit constructor options, not Marp Core
      },
    }

    export default config
```

#### TypeScript (`marp.config.ts`)

[](https://github.com/marp-team/marp-cli#typescript-marpconfigts)

If you installed `typescript` into your local project together with Marp CLI, you can write a config by TypeScript `marp.config.ts`. Marp CLI will try to transpile `.ts` with the project configuration `tsconfig.json`.

In TypeScript configuration, you can specify the custom engine as the generics for `defineConfig` helper, like this:
```
    // marp.config.ts
    import { Marpit } from '@marp-team/marpit'
    import { defineConfig } from '@marp-team/marp-cli'

    export default defineConfig<typeof Marpit>({
      engine: Marpit,
      options: {
        // Suggest only Marpit constructor options
      },
    })
```

## API _(EXPERIMENTAL)_

[](https://github.com/marp-team/marp-cli#api-experimental)

You can use Marp CLI through Node.js [if installed Marp CLI into your local project](https://github.com/marp-team/marp-cli#local-installation).
```
    const { marpCli } = require('@marp-team/marp-cli')

    marpCli(['test.md', '--pdf'])
      .then((exitStatus) => {
        if (exitStatus > 0) {
          console.error(`Failure (Exit status: ${exitStatus})`)
        } else {
          console.log('Success')
        }
      })
      .catch(console.error)
```

`marpCli()` accepts an argument of CLI options as array, and returns `Promise` to resolve an expected exit status in CLI. It would be rejected with the instance of `Error` if CLI met an error to suspend the conversion process.

### Error handling

[](https://github.com/marp-team/marp-cli#error-handling)

We have exported [`CLIError` class and `CLIErrorCode` enum](https://github.com/marp-team/marp-cli/blob/main/src/error.ts) from `@marp-team/marp-cli`, to allow handling for specific errors that have already known by Marp CLI.

If `CLIError` instance was thrown, you can identify the reason why CLI throwed error by checking `errorCode` member.

### Wait for observation

[](https://github.com/marp-team/marp-cli#wait-for-observation)

`marpCli()` would not be resolved initiatively if started some observation: Watch mode, server mode, and preview window.

`waitForObservation()` is helpful to handle them. It returns `Promise` that would be resolved with helper object when ready to observe resources in `marpCli()`.
```
    const { marpCli, waitForObservation } = require('@marp-team/marp-cli')

    marpCli(['--server', './slides/'])
      .then((exitCode) => console.log(`Done with exit code ${exitCode}`))
      .catch(console.error)

    waitForObservation().then(({ stop }) => {
      console.log('Observed')

      // Stop observations to resolve marpCli()'s Promise
      stop()
    })
```

The resolved helper has `stop()` method for telling Marp CLI to stop observation and resolve `Promise`.

### CLI HELP

```bash
Usage:
  marp [options] <files...>
  marp [options] -I <dir>

Basic Options:
  -v, --version                      Show versions                     [boolean]
  -h, --help                         Show help                         [boolean]
  -d, --debug                        Show debug logs (bool or filter pattern)
                                                       [string] [default: false]
  -o, --output                       Output file path (or directory when
                                     input-dir is passed)               [string]
  -I, --input-dir                    The base directory to find markdown and
                                     theme CSS                          [string]
  -c, --config-file, --config        Specify path to a configuration file
                                                                        [string]
      --no-config-file, --no-config  Prevent looking up for a configuration file
                                                                       [boolean]
  -P, --parallel                     Number of max parallel processes for
                                     multiple conversions  [number] [default: 5]
      --no-parallel                  Disable parallel processing       [boolean]
  -w, --watch                        Watch input markdowns for changes [boolean]
  -s, --server                       Enable server mode                [boolean]
  -p, --preview                      Open preview window               [boolean]

Converter Options:
      --pdf                Convert slide deck into PDF                 [boolean]
      --pptx               Convert slide deck into PowerPoint document [boolean]
      --pptx-editable      [EXPERIMENTAL] Generate editable PPTX when converting
                           to PPTX                                     [boolean]
      --notes              Convert slide deck notes into a text file   [boolean]
      --image              Convert the first slide page into an image file
                                               [string] [choices: "png", "jpeg"]
      --images             Convert slide deck into multiple image files
                                               [string] [choices: "png", "jpeg"]
      --image-scale        The scale factor for rendered images
                                           [number] [default: 1 (or 2 for PPTX)]
      --jpeg-quality       Set JPEG image quality         [number] [default: 85]
      --allow-local-files  Allow to access local files from Markdown while
                           converting PDF, PPTX, or image (NOT SECURE) [boolean]

Template Options:
      --template            Choose template
                      [string] [choices: "bare", "bespoke"] [default: "bespoke"]
      --bespoke.osc         [Bespoke] Use on-screen controller
                                                       [boolean] [default: true]
      --bespoke.progress    [Bespoke] Use progress bar[boolean] [default: false]
      --bespoke.transition  [Bespoke] Use transitions (Only in browsers
                            supported View Transition API)
                                                       [boolean] [default: true]

Browser Options:
      --browser           The kind of browser to use for PDF, PPTX, and image
                          conversion
       [string] [choices: "auto", "chrome", "edge", "firefox"] [default: "auto"]
      --browser-path      Path to the browser executable (Find automatically if
                          not set)                                      [string]
      --browser-protocol  Preferred protocol to use for browser connection
                    [string] [choices: "cdp", "webdriver-bidi"] [default: "cdp"]
      --browser-timeout   Timeout for each browser operation in seconds (0 to
                          disable)                                 [default: 30]

PDF Options:
      --pdf-notes              Add presenter notes to PDF as annotations
                                                                       [boolean]
      --pdf-outlines           Add outlines (bookmarks) to PDF         [boolean]
      --pdf-outlines.pages     Make outlines from slide pages
                                                       [boolean] [default: true]
      --pdf-outlines.headings  Make outlines from Markdown headings
                                                       [boolean] [default: true]

Metadata Options:
      --title        Define title of the slide deck                     [string]
      --description  Define description of the slide deck               [string]
      --author       Define author of the slide deck                    [string]
      --keywords     Define comma-separated keywords for the slide deck [string]
      --url          Define canonical URL                               [string]
      --og-image     Define Open Graph image URL                        [string]

Marp / Marpit Options:
      --engine     Select Marpit based engine by module name or path    [string]
      --html       Enable or disable HTML tags                         [boolean]
      --theme      Override theme by name or CSS file                   [string]
      --theme-set  Path to additional theme CSS files                    [array]
```
