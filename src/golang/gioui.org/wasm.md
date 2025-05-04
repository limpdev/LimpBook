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

# WebAssembly

- [Building](#building)
- [Integrate](#integrate)

## Building

Install `gogio`, if you already haven’t:

```sh
go install gioui.org/cmd/gogio@latest
```

To build WebAssembly from the `kitchen` example (run from a local checkout of [`gio-example`](https://git.sr.ht/~eliasnaur/gio-example)):

```sh
gogio -target js gioui.org/example/kitchen
```

This will create an `index.html`, `.wasm` and `.js` needed to start up the project inside a browser. These need to be served as a website, directly opening the `index.html` will not work.

One way to quickly setup a server is to use:

```sh
go install github.com/shurcooL/goexec@latest
goexec 'http.ListenAndServe(":8080", http.FileServer(http.Dir("kitchen")))'
```

Open [http://localhost:8080](http://localhost:8080) in a browser to run the program.

## Integrate

If the embedding HTML page for the Gio program contains a `<div id="giowindow">` element, Gio will run in that instead of creating its own container.

[Prev  
\
iOS, tvOS](/doc/install/ios)