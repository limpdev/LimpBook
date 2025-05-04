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

# Gio UI Cross-Platform GUI for Go

- [Getting Started](#getting-started)
- [Showcase](#showcase)
- [Why?](#why)
- [Sponsors](#sponsors)

Gio is a library for writing cross-platform immediate mode GUI-s in Go. Gio supports all the major platforms: Linux, macOS, Windows, Android, iOS, FreeBSD, OpenBSD and WebAssembly.

For a quick demonstration take a look at the WebAssembly demo below. *This requires a browser that supports WebAssembly.*

![Kitchen screenshot](/files/wasm/kitchen.png)

The source for the [Kitchen project](https://git.sr.ht/~eliasnaur/gio-example/tree/main/kitchen/kitchen.go).

## Getting Started

Gio is designed to work with very few dependencies. It depends only on the platform libraries for window management, input and GPU drawing.

To install the necessary dependencies, take a look at:

[Linux](/doc/install/linux) [Windows](/doc/install/windows) [macOS](/doc/install/macos) [Android](/doc/install/android) [iOS / tvOS](/doc/install/ios) [WebAssembly](/doc/install/wasm)

Once you have everything installed head over to [Learn](/doc/learn), which contains links to get you started with Gio.

[First Project  
\
Hello World.](/doc/learn/get-started)

[Learn  
\
More helpful resources.](/doc/learn)

## Showcase

[godcr](/doc/showcase/godcr)

[Tailscale](/doc/showcase/tailscale)

[gotraceui](/doc/showcase/gotraceui)

[Sointu](/doc/showcase/sointu)

[Protonet](/doc/showcase/protonet)

[More here ...](/doc/showcase)

## Why?

Gio helps Go developers to build efficient, fluid, and portable GUIs across all major platforms. It combines bleeding-edge 2D graphics technology with the flexibility of the immediate mode graphics paradigm to create a compelling and consistent foundation for application development.

Gio includes an efficient vector renderer based on the [Pathfinder project](https://github.com/servo/pathfinder) implemented on OpenGL ES and Direct3D 11, and is migrating towards an even more efficient compute-shader-based renderer built atop [piet-gpu](https://github.com/linebender/piet-gpu). Text and other shapes are rendered using only their outlines without baking them into texture images, to support efficient animations, transformed drawing and pixel resolution independence.

## Sponsors

Development of Gio is funded by sponsorships. If you find Gio useful, please consider sponsoring the [project on OpenCollective](https://opencollective.com/gioui) or one or more of its developers directly.