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

# Theme Making things look the same

The same abstract widget can have many visual representations, ranging from simple color changes to entirely custom graphics. To give an application a consistent appearance it is useful to have an abstraction that represents a particular “theme”.

Package [`gioui.org/widget/material`](https://gioui.org/widget/material) implements a theme based on the [Material Design](https://material.io/design), and the [`Theme`](https://gioui.org/widget/material#Theme) struct encapsulates the parameters for varying colors, sizes and fonts.

To use a theme, you must first initialize it in your application loop:

```go
th := material.NewTheme()
th.Shaper = text.NewShaper(text.WithCollection(gofont.Collection()))

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
		draw(gtx, th)

		// Update the display.
		e.Frame(gtx.Ops)
	}
}
```

Then in your application use the provided widgets:

```go
var isChecked widget.Bool

func themedApplication(gtx layout.Context, th *material.Theme) layout.Dimensions {
	var checkboxLabel string
	isChecked.Update(gtx)
	if isChecked.Value {
		checkboxLabel = "checked"
	} else {
		checkboxLabel = "not-checked"
	}

	return layout.Flex{
		Axis: layout.Vertical,
	}.Layout(gtx,
		layout.Rigid(material.H3(th, "Hello, World!").Layout),
		layout.Rigid(material.CheckBox(th, &isChecked, checkboxLabel).Layout),
	)
}
```

```

```

[Kitchen example](https://git.sr.ht/~eliasnaur/gio-example/tree/main/example/kitchen/kitchen.go) shows all the different widgets available.

[Prev  
\
Layout](/doc/architecture/layout)

[Next  
\
Units](/doc/architecture/units)