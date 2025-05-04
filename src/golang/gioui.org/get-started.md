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

# Get Started Hello, Gio!

- [Creating a new package](#creating-a-new-package)
- [Creating the program](#creating-the-program)
- [Creating the window](#creating-the-window)
- [Creating a theme](#creating-a-theme)
- [Listening for events](#listening-for-events)
- [Drawing the text](#drawing-the-text)

This example does a really quick introduction on getting something up and running. It does not explain all the details, those will be covered in another tutorial.

Ensure that you have followed [installation instructions](/doc/install). If everything is setup correctly, then running:

```sh
go run gioui.org/example/hello@latest
```

Should display a pretty “Hello, Gio!” message.

## Creating a new package

*If you are unfamiliar with Go, then more help can be found at [go.dev/learn](https://go.dev/learn/).*

First step in creating a Go program requires setting up the module.

We’ll use `gio.test` as our module name, however, it’s recommended to use a repository name when you want to upload it. The module name can be later changed.

```sh
go mod init gio.test
```

## Creating the program

Let’s create `main.go` with the following code:

```go
package main

import (
	"image/color"
	"log"
	"os"

	"gioui.org/app"
	"gioui.org/op"
	"gioui.org/text"
	"gioui.org/widget/material"
)

func main() {
	go func() {
		window := new(app.Window)
		err := run(window)
		if err != nil {
			log.Fatal(err)
		}
		os.Exit(0)
	}()
	app.Main()
}


func run(window *app.Window) error {
	theme := material.NewTheme()
	var ops op.Ops
	for {
		switch e := window.Event().(type) {
		case app.DestroyEvent:
			return e.Err
		case app.FrameEvent:
			// This graphics context is used for managing the rendering state.
			gtx := app.NewContext(&ops, e)

			// Define an large label with an appropriate text:
			title := material.H1(theme, "Hello, Gio")

			// Change the color of the label.
			maroon := color.NRGBA{R: 127, G: 0, B: 0, A: 255}
			title.Color = maroon

			// Change the position of the label.
			title.Alignment = text.Middle

			// Draw the label to the graphics context.
			title.Layout(gtx)

			// Pass the drawing operations to the GPU.
			e.Frame(gtx.Ops)
		}
	}
}
```

Let’s then update all the dependencies with:

```sh
go mod tidy
```

Once that succeeds, the program should start up with:

```sh
go run .
```

Now to explain what’s happening.

## Creating the window

Every program requires a window, the `main` starts up the application loop that talks to the operating system and starts the window logic in a separate goroutine.

```go
func main() {
	go func() {
		window := new(app.Window)
		err := run(window)
		if err != nil {
			log.Fatal(err)
		}
		os.Exit(0)
	}()
	app.Main()
}
```

## Creating a theme

Applications need to define their fonts and different color settings. Themes contain all the necessary information.

```go
func run(window *app.Window) error {
	theme := material.NewTheme()
```

## Listening for events

The communication with the operating system (i.e. keyboard, mouse, GPU) happens through events. Gio uses the following approach to process events:

```go
for {
	switch e := window.Event().(type) {
	case app.DestroyEvent:
		return e.Err
	case app.FrameEvent:
```

- `app.DestroyEvent` means the user pressed the close button.
- `app.FrameEvent` means the program should handle input and render a new frame.

## Drawing the text

To draw the text it needs to go through several stages:

```go
// This graphics context is used for managing the rendering state.
gtx := app.NewContext(&ops, e)

// Define an large label with an appropriate text:
title := material.H1(theme, "Hello, Gio")

// Change the color of the label.
maroon := color.NRGBA{R: 127, G: 0, B: 0, A: 255}
title.Color = maroon

// Change the position of the label.
title.Alignment = text.Middle

// Draw the label to the graphics context.
title.Layout(gtx)

// Pass the drawing operations to the GPU.
e.Frame(gtx.Ops)
```

[Next  
\
Split Widget](/doc/learn/split-widget)