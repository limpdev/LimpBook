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

# Text Low-level text management

- [Fonts](#fonts)
- [Shapes](#shapes)

## Fonts

Gio’s text shaper uses the type `[]text.FontFace` to represent the collection of available fonts.

There is one font bundled in package [`gioui.org/font/gofont`](https://gioui.org/font/gofont), you can use [`gofont.Collection()`](https://gioui.org/font/gofont#Collection) to get a `[]text.FontFace` containing all of the variants of the Go fonts.

For loading other fonts there is [`gioui.org/font/opentype`](https://gioui.org/font/opentype). After parsing the font(s) using [`opentype.Parse`](https://gioui.org/font/opentype#Parse), you can append them to a `[]text.FontFace`.

## Shapes

For converting strings to clip shapes there is the [`gioui.org/text`](https://gioui.org/text) package.

It contains [`text.Cache`](https://gioui.org/text#Cache) that implements cached string to shape conversion, with appropriate fallbacks. Simply provide your fonts (`[]text.FontFace`) to `text.NewCache`.

In most cases you can use [`widget.Label`](https://gioui.org/widget#Label) which handles wrapping and layout constraints. Or when you are using material design [`material.LabelStyle`](https://gioui.org/widget/material#LabelStyle).

[Prev  
\
Units](/doc/architecture/units)

[Next  
\
Color](/doc/architecture/color)