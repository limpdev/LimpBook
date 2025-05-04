[![Gio logo](/files/logo-text.svg)](/)

- [Home](/)
- [Newsletter](/news)
- [Install](/doc/install) ▼
  
  - [Linux](/doc/install/linux)
  - [Windows](/doc/install/windows)
  - [macOS](/doc/install/macos)
  - [Android](/doc/install/android)
  - [iOS, tvOS](/doc/install/ios)
  - [WebAssembly](/doc/install/wasm)
- [Learn](/doc/learn) ▼
  
  - [Get Started](/doc/learn/get-started)
  - [Split Widget](/doc/learn/split-widget)
  - [Common Errors](/doc/learn/common-errors)
- [Showcase](/doc/showcase) ▼
  
  - [Anvil](/doc/showcase/anvil)
  - [Chapar](/doc/showcase/chapar)
  - [Cryptopower](/doc/showcase/cryptopower)
  - [G45W](/doc/showcase/g45w)
  - [godcr](/doc/showcase/godcr)
  - [gotraceui](/doc/showcase/gotraceui)
  - [Photon](/doc/showcase/photon)
  - [Protonet](/doc/showcase/protonet)
  - [Sointu](/doc/showcase/sointu)
  - [Sprig](/doc/showcase/sprig)
  - [Transito](/doc/showcase/transito)
  - [Wormhole William](/doc/showcase/wormhole-william)
- [Architecture](/doc/architecture) ▼
  
  - [Window](/doc/architecture/window)
  - [Drawing](/doc/architecture/drawing)
  - [Input](/doc/architecture/input)
  - [Widget](/doc/architecture/widget)
  - [Layout](/doc/architecture/layout)
  - [Theme](/doc/architecture/theme)
  - [Units](/doc/architecture/units)
  - [Text](/doc/architecture/text)
  - [Color](/doc/architecture/color)
- [Community](/doc/community)
- [Contributing](/doc/contribute)
- [FAQ](/doc/faq)

# Newsletter Gioverse news

### [January 2025 - The Rest of 2024 in a Nutshell](/news/2025-01)

It's been a long time since the last newsletter, but here's a new one! I'm excited to bring you lots of small improvements to Gio's window and event processing on many platforms.

### [July 2024 - Many Bugfixes and Reactive UI](/news/2024-07)

This newsletter brings you v0.7.1 of Gio and associated repos. The minor version was incremented due to a very small breaking API change in the scroll gesture. The changes since v0.6.0 are mostly bugfixes within the windowing and event processing code.

### [April 2024 - Window API Simplification](/news/2024-04)

Since the last newsletter, Gio's window implementation internals and API have been greatly simplified, leading to cleaner code and more predictable interactions.

### [February 2024 - Event Routing Overhaul](/news/2024-02)

A massive, long-overdue change to Gio event routing has just landed. This provides much more granular capabilities for applications to manipulate input events and ensures that it is always safe to throw away the contents of a macro, but at the cost of some breaking changes.

### [October &amp; November 2023 - Eliminating Event Processing Latency](/news/2023-11)

The last two months have brought lots of change across Gio, but also kept me so busy that October's newsletter was just folded into November's. Since the last newsletter, we've fixed two major longstanding API design issues within Gio. Now GUIs can react to input events without an extra frame of latency between the event and its delivery, and also Gio window logic now runs on the same goroutine as application window logic, eliminating many opportunities for race conditions. Of course, fixing these problems did require breaking API changes, so see each repo's notes for API migration info.

### [September 2023 - Opacity Manipulation, Constraint Debugging, and More](/news/2023-09)

This month brings us Gio (and Gio-x) v0.3.1, which is the first tagged version to contain no breaking changes. Applications should be able to update from v0.3.0 with no changes.

### [August 2023 - Nice Custom Windows on Windows, Consistent Text Truncation, and Bugfixes](/news/2023-08)

This month brings us Gio v0.3.0, which features richer integration of custom window decorations on Windows, changes to make text truncation behave consistently, and many other bugfixes.

### [July 2023 - System Font Support and the Ubuntu Summit](/news/2023-07)

Another month has come and gone, bringing us to Gio v0.2.0 with system fonts and configurable line height.

### [June 2023 - Tagged Releases and System Font Progress](/news/2023-06)

The past month saw a steady flow of bugfixes and optimizations going into core, but the biggest change is Gio's first-ever tagged release! Gio v0.1.0 (and similar tags in gio-x and gio-example) are now available.

### [May 2023 - Grapheme Cluster Line Wrapping and an Interview](/news/2023-05)

May has come and gone, and Gio has grown some more, both in features and awareness.

### [April 2023 - Font Collection Support and more](/news/2023-04)

This month saw quite a few font and text improvements and numerous bugfixes across the ecosystem. With support from Plato Team, I focused on making our text stack more efficient with the following results:

### [March 2023 - Color Emoji, Text Truncation, and More](/news/2023-03)

This month saw the merge of two notable text features: color bitmap glyph support and automatic shaper-driven text truncation. With these features, we are now able to display color emoji, and we are also able to visually indicate when text with a configured maximum number of lines has been truncated. I'd like to thank Plato Team for supporting this work financially, and Elias for reviewing the mountains of patches it generated.

### [February 2023 - Color Glyph Rendering](/news/2023-02)

This month was quiet on the branches, but an exciting and long-requested feature is coming: color glyph rendering. This will allow Gio to display text using many color emoji fonts, as well as some bitmap fonts. I have a working prototype, but editing text with emoji revealed that our text editor desperately needs to support UAX#29 grapheme clusters in order for cursor positioning within emoji to make sense. I'm tackling that problem right now. I'd like to thank Plato Team for supporting this project.

### [January 2023 - Incremental Improvement](/news/2023-01)

After the enormous pile of features that landed in December, January was a quiet month. We hummed along fixing bugs, adding some small features, and thinking about the future.

### [December 2022 - Text Selection and RSS](/news/2022-12)

First up, I'd like to thank Egon Elbre for implementing an RSS feed for these newsletters. You can find that feed if you prefer to consume content via feeds.

### [November 2022 - Bidirectional text is eating the world](/news/2022-11)

It's seemingly been a quiet month in the Gio project. Not many patches have landed in our repos, and one might almost think that nothing was happening. However, this quiescence is actually the result of Elias and I iterating heavily on Gio's upcoming text API. Adding both font fallback and bidirectional text support to Gio has stretched our text abstractions to the breaking point, so we've had to rethink them this month. That work has primarily been on the gio-patches mailing list, so you won't have seen it unless you're subscribed.

### [October 2022 - Mipmaps and text patches](/news/2022-10)

This month Elias upgraded our handling of image scaling by automatically generating mipmaps for all images. This ensures that images look good when downscaled, and also boosts performance when downscaling images. You don't need to make any application changes to take advantage of this new feature.

### [September 2022 - Font fallback is coming](/news/2022-09)

Elias is settling into a new place in Central America, and is starting to turn a critical eye towards Gio's layout system. He's exploring ways to make Gio layout more flexible, to solve , and to reduce the boilerplate of writing Gio code. There's no concrete proposal to share yet, but I look forward to hearing what comes of this exploration.

### [August 2022 - Boiling away dependencies](/news/2022-08)

This month one of the biggest changes was Egon Elbre's work to eliminate many of Gio's transitive dependencies. He did this by rewriting significant parts of the text segmentation library that we use, as well as figuring out the proper dance to update us to the multi-module version of golang.org/x/exp. The results are a go.sum with 500 fewer lines, and Gio binaries that are 1.5MiB smaller.

### [July 2022 - Editor Enhancements](/news/2022-07)

This month saw a number of small-but-useful improvements to widget.Editor, including the ability to filter characters, enforce a maximum length, and built-in support for undo/redo. Additionally, numerous subtle event processing bugs were ironed out.

### [June 2022 - Custom Window Decoration on More Platforms and Optimizations](/news/2022-06)

This month saw an emphasis on improvements to the , performance, and desktop windowing system integration.

### [May 2022 - Material Data Table added and unit.Value removed](/news/2022-05)

I'm sure you're all wondering "what happened to the material data table?" Well, good news! This month, Jan's work was merged into gio-x and the bounty payout is processing right now!

### [April 2022 - io/key changes](/news/2022-04)

As many of you know, Fyne and Gio together ran a "Go GUI Developer Survey" recently, and Andy from Fyne has published the results here:

### [March 2022 - Complex script support](/news/2022-03)

Elias spent the last month reviewing my text work, improving widget focus traversal, and improving many small details about core. In particular, there is now a nix-based development environment for gio available in core's flake.nix file. For details on nix, see:

### [February 2022 - pointer.CursorNameOp renamed to pointer.Cursor](/news/2022-02)

Elias implemented focus traversal for Gio interfaces this month. This enables users to navigate between focusable widgets (buttons, editors, etc) with actions like pressing tab. This single feature has a huge impact on the ease of using Gio for entering data into form fields and general keyboard navigation.