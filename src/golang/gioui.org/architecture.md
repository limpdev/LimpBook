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

# Architecture Internals of Gio

Gio is a library for implementing [immediate mode user interfaces](https://eliasnaur.com/blog/immediate-mode-gui-programming). This approach can be implemented in multiple ways, however the overarching similarity is that the program:

1. Listens for events such as mouse or keyboard input.
2. Updates its internal state based on the event.
3. Runs code that lays out and redraws the user interface state.

A minimal immediate mode command-line UI in pseudo-code:

```
main() {
	checked = false
	for every keypress {
		clear screen
		layoutCheckbox(keypress, &checked)
		if checked {
			print("info")
		}
	}
}

layoutCheckbox(keypress, checked) {
	if keypress == SPACE {
		*checked = !*checked
	}

	if *checked {
		print("[x]")
	} else {
		print("[ ]")
	}
}
```

In the immediate mode model, the program is in control of clearing and updating the display, and directly draws widgets and handles input during the updates.

In contrast, traditional “retained mode” libraries own the widgets through implicit library-managed state, typically arranged in a tree-like structure such as a browser’s [DOM](https://en.wikipedia.org/wiki/Document_Object_Model). As a result, the program must use the facilities given by the library to manipulate its widgets.

Actual GUI programming has several concerns in addition to the simple example above:

01. How to get the events?
02. When to redraw the state?
03. What do the widget structures look like?
04. How to track the focus?
05. How to structure the events?
06. How to communicate with the graphics card?
07. How to handle input?
08. How to draw text?
09. Where does the widget state belong?
10. And many more.

The rest of this document tries to answer how Gio does it. If you wish to know more about immediate mode UI, these references are a good start:

- [https://caseymuratori.com/blog\_0001](https://caseymuratori.com/blog_0001)
- [http://sol.gfxile.net/imgui/](http://sol.gfxile.net/imgui/)
- [http://www.johno.se/book/imgui.html](http://www.johno.se/book/imgui.html)
- [https://github.com/ocornut/imgui](https://github.com/ocornut/imgui)
- [https://eliasnaur.com/blog/immediate-mode-gui-programming](https://eliasnaur.com/blog/immediate-mode-gui-programming)

[Next  
\
Window](/doc/architecture/window)