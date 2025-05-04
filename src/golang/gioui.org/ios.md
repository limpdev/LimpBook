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

# iOS, tvOS

- [Dependencies](#dependencies)
- [Building](#building)
- [Integrate](#integrate)

## Dependencies

Xcode is required for Apple platforms.

## Building

Install `gogio`, if you already haven’t:

```sh
go install gioui.org/cmd/gogio@latest
```

The `-appid` flag specifies the iOS bundle id or Android package id. The flag is required for creating signed .ipa files for iOS and tvOS devices, because the bundle id must match an id previously provisioned in Xcode. For example,

```sh
gogio -target ios -appid <bundle-id>	gioui.org/example/kitchen
```

Use the `Window->Devices and Simulators` option in Xcode to install the ipa file to the device. If you have [ideviceinstaller](https://github.com/libimobiledevice/ideviceinstaller) installed, you can install the app from the command line:

```sh
ideviceinstaller -i kitchen.ipa
```

If you just want to run a program on the iOS simulator, use the `-o` flag to specify a .app directory:

```sh
gogio -o kitchen.app -target ios	gioui.org/example/kitchen
```

Install the app to a running simulator with simctl:

```sh
xcrun simctl install booted kitchen.app
```

## Integrate

The `gogio` tool can also produce a framework ready to include in an iOS or tvOS Xcode project. The command

```sh
gogio -target ios -buildmode archive gioui.org/example/kitchen
```

outputs Kitchen.framework with the demo program built for iOS.

To run the Gio program, use the GioAppDelegate class from your program:

```objc
@import UIKit;
@import Gio;

int main(int argc, char * argv[]) {
	@autoreleasepool {
		return UIApplicationMain(argc, argv, nil, NSStringFromClass([GioAppDelegate class]));
	}
}
```

[Prev  
\
Android](/doc/install/android)

[Next  
\
WebAssembly](/doc/install/wasm)