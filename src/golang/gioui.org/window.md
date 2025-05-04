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

# Window Talking with the OS

- [Operations](#operations)

Since a GUI library needs to talk to some sort of display system to display information:

```go
var window app.Window
window.Option(app.Title(title))

var ops op.Ops
for {
	switch e := window.Event().(type) {
	case app.DestroyEvent:
		// The window was closed.
		return e.Err
	case app.FrameEvent:
		// A request to draw the window state.

		// Reset the operations back to zero.
		ops.Reset()
		// Draw the state into ops.
		draw(&ops)
		// Update the display.
		e.Frame(&ops)
	}
}
```

[`app.Window.Run`](http://gioui.org/app#Window.Run) chooses the appropriate “driver” depending on the environment and build context. It might choose Wayland, Win32, or Cocoa among several others.

An `app.Window` allows accessing events from the display with [`window.Event()`](https://gioui.org/app#Window.Event). There are other lifecycle events in the `gioui.org/app` package such as [`app.DestroyEvent`](https://gioui.org/app#DestroyEvent) and [`app.FrameEvent`](https://gioui.org/app#FrameEvent).

## Operations

All UI libraries need a way for the program to specify what to display and how to handle events. Gio programs use operations, serialized into one or more [`op.Ops`](https://gioui.org/op#Ops) operation lists. Operation lists are in turn passed to the window driver through the [`FrameEvent.Frame`](https://gioui.org/app#FrameEvent.Frame) function.

By convention, each operation kind is represented by a Go type with an `Add` method that records the operation into the `Ops` argument. Like any Go struct literal, zero-valued fields can be useful to represent optional values.

For example, recording an operation that sets the current color to red:

```go
func addColorOperation(ops *op.Ops) {
	red := color.NRGBA{R: 0xFF, A: 0xFF}
	paint.ColorOp{Color: red}.Add(ops)
}
```

You might be thinking that it would be more usual to have an `ops.Add(ColorOp{Color: red})` method instead of using `op.ColorOp{Color: red}.Add(ops)`. It’s like this so that the `Add` method doesn’t have to take an interface-typed argument, which would often require an allocation to call. This is a key aspect of Gio’s “zero allocation” design.

[Next  
\
Drawing](/doc/architecture/drawing)