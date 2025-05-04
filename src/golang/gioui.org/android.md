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

# Android

- [Dependencies](#dependencies)
- [Building](#building)
- [Integrate](#integrate)

## Dependencies

For Android you need the [Android SDK](https://developer.android.com/studio#command-tools) with the NDK bundle installed. Gio currently requires SDK versions &gt;= 31.

Point the `ANDROID_SDK_ROOT` to the SDK root directory. To install the NDK bundle use the `sdkmanager` command that comes with the SDK:

```
sdkmanager ndk-bundle
```

To run Gio programs on the emulator, you may need to [enable OpenGL ES 3](https://developer.android.com/studio/run/emulator-acceleration).

You will also need OpenJDK 1.8, as part of the Android build toolchain requires it. More recent versions of Java will break the build.

## Building

Install `gogio`, if you already haven’t:

```sh
go install gioui.org/cmd/gogio@latest
```

All of the following example commands assume you’re working from a clone of the [`gio-example`](https://git.sr.ht/~eliasnaur/gio-example) repo. Run this once to make a local clone:

```sh
git clone https://git.sr.ht/~eliasnaur/gio-example
cd gio-example
```

To build an Android .apk file from the `kitchen` example:

```sh
gogio -target android gioui.org/example/kitchen
```

The apk can be installed to a running emulator or attached device with adb:

```sh
adb install kitchen.apk
```

The `gogio` tool passes command line arguments to os.Args at runtime:

```sh
gogio -target android gioui.org/example/gophers -token <github token>
```

## Integrate

To build a Gio program as an .aar package, use the `-buildmode=archive` flag. For example,

```sh
gogio -target android -buildmode archive gioui.org/example/kitchen
```

produces kitchen.aar, ready to include in an Android project.

To display the Gio Android Activity, declare it in your AndroidManifest.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
	...
	<uses-sdk android:minSdkVersion="16" android:targetSdkVersion="28" />
	<uses-feature android:glEsVersion="0x00030000"/>
	...
	<application android:label="Gio">
		<activity android:name="org.gioui.GioActivity"
		  android:theme="@style/Theme.GioApp"
		  android:configChanges="orientation|keyboardHidden"
		  android:windowSoftInputMode="adjustResize">
		</activity>
	</application>
	...
</manifest>
```

and launch it from another Activity with

```java
startActivity(new Intent(this, GioActivity.class));
```

[Prev  
\
macOS](/doc/install/macos)

[Next  
\
iOS, tvOS](/doc/install/ios)