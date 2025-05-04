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

# Install All the dependencies

- [App Icon](#app-icon)
- [Cross Compilation](#cross-compilation)
- [From Linux](#from-linux)

Gio is designed to work with very few dependencies. It depends only on the platform libraries for window management, input and GPU drawing.

Currently Gio targets the latest released version of [Go](https://golang.org/dl) in module mode. Earlier versions of Go and `GOPATH` mode might work, but no effort is made to keep them working.

For desktop builds using `go` tool works directly. For mobile and some additional desktop feature support, Gio uses a separate tool `gogio`.

To install the latest version of the tool use:

```sh
go install gioui.org/cmd/gogio@latest
```

For the platforms some additional dependencies may be necessary.

[Linux](/doc/install/linux) [Windows](/doc/install/windows) [macOS](/doc/install/macos) [Android](/doc/install/android) [iOS / tvOS](/doc/install/ios) [WebAssembly](/doc/install/wasm)

## App Icon

The `gogio` tool will use the `appicon.png` file in your main package directory, if present, as the app icon.

## Cross Compilation

Gio can be cross-complied for platforms other than the current OS, but this requires an appropriate cross-compiler for any native code integrations. Cross-compilation is most easily achieved from Linux, and the Linux instructions can be followed within a container or VM from other platforms.

### From Linux

- `macOS`: a cross-compiler like [osxcross](https://github.com/tpoechtrager/osxcross) as well as the macOS SDK (see link for instructions). See [this mailing list post](https://lists.sr.ht/~eliasnaur/gio/%3CCAHe4cPmjd3RkZ9NsANc4Y7cdsSv9YUWkqwEEKZLhgVJ4emsNpA@mail.gmail.com%3E) for useful information about setting this up.
- `Windows`: no special compiler is needed, as we don’t use CGo for Windows support.