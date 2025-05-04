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

# Widget Reusable and composable parts

- [Context](#context)
- [Custom](#custom)

We’ve been mentioning widgets for quite a while now. In principle widgets are composable and drawable UI elements that may react to input. More concretely:

- They get input from an [`Source`](https://gioui.org/app#FrameEvent.Source).
- They might hold some state.
- They calculate their size given constraints.
- They draw themselves to an [`op.Ops`](https://gioui.org/op#Ops) list.

By convention, widgets have a `Layout` method that does all of the above. Some widgets have separate methods for querying their state or to [pass events back to the program](https://gioui.org/widget#Clickable.Clicked).

Some widgets have several visual representations. For example, the stateful [Clickable](https://gioui.org/widget#Clickable) is used as basis for [buttons](https://gioui.org/widget/material#ButtonStyle.Layout) and [icon buttons](https://gioui.org/widget/material#IconButtonStyle.Layout). In fact, the [material package](https://gioui.org/widget/material) implements only the [Material Design](https://material.io) and is intended to be supplemented by other packages implementing different designs.

## Context

To build out more complex UI from these primitives we need some structure that describes the layout in a composable way.

It’s possible to specify a layout statically, but display sizes vary greatly, so we need to be able to calculate the layout dynamically - that is constrain the available display size and then calculate the rest of the layout. We also need a comfortable way of passing events through the composed structure and similarly we need a way to pass [`op.Ops`](https://gioui.org/op#Ops) through the system.

[`layout.Context`](https://gioui.org/layout#Context) conveniently bundles these aspects together. It carries the state that is needed by almost all layouts and widgets.

To summarise the terminology:

- [`Constraints`](https://gioui.org/layout#Context.Constraints) are an “incoming” parameter to a widget. The constraints hold a widget’s maximum (and minimum) size.
- [`Ops`](https://gioui.org/layout#Context.Ops) holds the generated draw operations.
- [`Events`](https://gioui.org/layout#Context.Events) holds events generated since the last drawing operation.

By convention, functions that accept a `layout.Context` return [`layout.Dimensions`](https://gioui.org/layout#Dimensions) which provides both the dimensions of the laid-out widget and the baseline of any text content within that widget.

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
		// Reset the layout.Context for a new frame.
		gtx := app.NewContext(&ops, e)

		// Draw the state into ops based on events in e.Queue.
		draw(gtx)

		// Update the display.
		e.Frame(gtx.Ops)
	}
}
```

## Custom

As an example, here is how to implement a very simple button.

Let’s start by drawing it:

```go
type ButtonVisual struct {
	pressed bool
}

func (b *ButtonVisual) Layout(gtx layout.Context) layout.Dimensions {
	col := color.NRGBA{R: 0x80, A: 0xFF}
	if b.pressed {
		col = color.NRGBA{G: 0x80, A: 0xFF}
	}
	return drawSquare(gtx.Ops, col)
}

func drawSquare(ops *op.Ops, color color.NRGBA) layout.Dimensions {
	defer clip.Rect{Max: image.Pt(100, 100)}.Push(ops).Pop()
	paint.ColorOp{Color: color}.Add(ops)
	paint.PaintOp{}.Add(ops)
	return layout.Dimensions{Size: image.Pt(100, 100)}
}
```

```

```

Then handle pointer clicks:

```go
type Button struct {
	pressed bool
}

func (b *Button) Layout(gtx layout.Context) layout.Dimensions {
	// Confine the area for pointer events.
	area := clip.Rect(image.Rect(0, 0, 100, 100)).Push(gtx.Ops)

	event.Op(gtx.Ops, b)

	// here we loop through all the events associated with this button.
	for {
		ev, ok := gtx.Event(pointer.Filter{
			Target: b,
			Kinds:  pointer.Press | pointer.Release,
		})
		if !ok {
			break
		}

		e, ok := ev.(pointer.Event)
		if !ok {
			continue
		}

		switch e.Kind {
		case pointer.Press:
			b.pressed = true
		case pointer.Release:
			b.pressed = false
		}
	}

	area.Pop()

	// Draw the button.
	col := color.NRGBA{R: 0x80, A: 0xFF}
	if b.pressed {
		col = color.NRGBA{G: 0x80, A: 0xFF}
	}
	return drawSquare(gtx.Ops, col)
}
```

```

```

[Prev  
\
Input](/doc/architecture/input)

[Next  
\
Layout](/doc/architecture/layout)