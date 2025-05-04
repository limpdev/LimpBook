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

# Linux

- [Dependencies](#dependencies)
- [Fedora 35+](#fedora-35)
- [Ubuntu 18.04+](#ubuntu-18-04)
- [Nix](#nix)
- [Building](#building)

## Dependencies

For Linux you need development packages for:

- Wayland
- x11, xkbcommon
- GLES, EGL
- libXcursor

Depending on your distribution, you may also need to install a Vulkan driver for best performance. Distributions like Arch do not do this automatically. You can check if you have working Vulkan support with the `vulkaninfo` command.

### Fedora 35+

On Fedora 35 and newer, install the dependencies with the command:

```sh
dnf install gcc pkg-config wayland-devel libX11-devel libxkbcommon-x11-devel mesa-libGLES-devel mesa-libEGL-devel libXcursor-devel vulkan-headers
```

### Ubuntu 18.04+

On Ubuntu 18.04 and newer, use:

```sh
apt install gcc pkg-config libwayland-dev libx11-dev libx11-xcb-dev libxkbcommon-x11-dev libgles2-mesa-dev libegl1-mesa-dev libffi-dev libxcursor-dev libvulkan-dev
```

### Nix

On a system with Nix 2.4 or later, Gio includes a Nix flake for setting up a development environment:

```sh
alias nix='nix --extra-experimental-features "nix-command flakes"'
nix develop sourcehut:~eliasnaur/gio
```

The environment can also be applied to the current shell, which is useful in combination with direnv:

```sh
source <(nix print-dev-env sourcehut:~eliasnaur/gio)
```

## Building

To test whether the installation works, run:

```sh
go run gioui.org/example/hello@latest
```

You can build Gio programs without X11 support with the `nox11` build tag:

```sh
go run --tags nox11 gioui.org/example/hello@latest
```

To build Gio programs without Wayland support use `nowayland` build tag:

```sh
go run --tags nowayland gioui.org/example/hello@latest
```

[Next  
\
Windows](/doc/install/windows)