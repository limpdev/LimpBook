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

# Units Measuring sizes of things

- [Coordinate systems](#coordinate-systems)

Drawing operations use pixel coordinates, ignoring any transformation applied. However, for most use-cases you don’t want to tie your user-interface sizes and positions to screen pixels. People may have screen-scaling enabled and pixel densities vary significantly between devices.

In addition to the physical pixel, package [`gioui.org/unit`](https://gioui.org/unit) implements device independent units:

- [`Px`](https://gioui.org/unit#Px) - device dependent pixel. One Px is a pixel on the screen.
- [`Dp`](https://gioui.org/unit#Dp) - device independent pixel. Takes into account screen-density and the screen-scaling settings.
- [`Sp`](https://gioui.org/unit#Sp) - device independent pixel for text. An Sp is like a Dp but adjusted for font-scaling.

[`layout.Context`](https://gioui.org/layout#Context) has method [`Px`](https://gioui.org/layout#Context.Px) to convert from [`unit.Value`](https://gioui.org/unit#Value) to pixels

For more information on pixel-density see:

- [https://material.io/design/layout/pixel-density.html](https://material.io/design/layout/pixel-density.html).
- [https://webplatform.github.io/docs/tutorials/understanding-css-units/](https://webplatform.github.io/docs/tutorials/understanding-css-units/)

## Coordinate systems

You may have noticed that widget constraints and dimensions sizes are in integer units, while drawing commands such as [`PaintOp`](https://gioui.org/op/paint#PaintOp) use floating point units. That’s because they refer to two distinct coordinate systems, the layout coordinate system and the drawing coordinate system. The distinction is subtle, but important.

The layout coordinate system is in integer pixels, because it’s important that widgets never unintentionally overlap in the middle of a physical pixel. In fact, the decision to use integer coordinates was motivated by [conflation issues](https://github.com/flutter/flutter/issues/15035) in other UI libraries caused by allowing fractional layouts.

As a bonus, integer coordinates are perfectly deterministic across all platforms which leads to easier debugging and testing of layouts.

On the other hand, drawing commands need the generality of floating point coordinates for smooth animation and for expressing inherently fractional shapes such as bézier curves.

It’s possible to draw shapes that overlap at fractional pixel coordinates, but only intentionally: drawing commands directly derived from layout constraints have integer coordinates by construction.

[Prev  
\
Theme](/doc/architecture/theme)

[Next  
\
Text](/doc/architecture/text)