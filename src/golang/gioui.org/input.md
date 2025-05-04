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

# Input Reacting to a mouse and keyboard

- [External input](#external-input)
- [Advanced Input Topics](#advanced-input-topics)
- [Input Tree](#input-tree)

Input is delivered to the widgets via a [`app.FrameEvent`](https://gioui.org/app#FrameEvent) through the [`Queue`](https://gioui.org/app#input.Source) field.

Some of the most common events in `input.Source` are:

- [`key.Event`](https://gioui.org/io/key#Event), [`key.FocusEvent`](https://gioui.org/io/key#FocusEvent) - for keyboard input.
- [`key.EditEvent`](https://gioui.org/io/key#EditEvent) - for text editing.
- [`pointer.Event`](https://gioui.org/io/pointer#Event) - for mouse and touch input.

The program can respond to these events however it likes - for example, by updating its local data structures or running a user-triggered action. The [`FrameEvent`](https://gioui.org/app#FrameEvent) is special - when the program receives a [`FrameEvent`](https://gioui.org/app#FrameEvent), it is responsible for updating the display by calling the [`e.Frame`](https://gioui.org/app#FrameEvent.Frame) function with an operation list representing the new state. These operations are generated immediately in response to the [`FrameEvent`](https://gioui.org/app#FrameEvent) which is the main reason that Gio is known as an “immediate mode” GUI.

Event-processors, such as [`Click`](https://gioui.org/gesture#Click) and [`Scroll`](https://gioui.org/gesture#Scroll) from package [`gioui.org/gesture`](https://gioui.org/gesture) detect higher-level actions from individual click events.

To distribute input among multiple different widgets, Gio needs to know about event handlers and their configuration. However, since the Gio framework is stateless, there’s no direct way for the program to specify that.

Instead, some operations associate input event types (for example, keyboard presses) with arbitrary [tags](https://gioui.org/io/event#Tag) (interface{} values) chosen by the program. A program creates these operations when it’s processing the [`FrameEvent`](https://gioui.org/app#FrameEvent) – input operations are operations like any other. In return, an [input.Source](https://gioui.org/io/input#Source) supplies the events that arrived since the last frame, separated by tag.

You can think about the tag as a unique key for a given input area. The Gio event router will associate input events on in that area with the tag provided for that area. Then you can get those events the next frame by supplying the same tag to `input.Source`. Often widgets will encapsulate this event logic by supplying a pointer to their persistent state as the tag for their input area.

The following example demonstrates pointer input handling:

```go
var tag = new(bool) // We could use &pressed for this instead.
var pressed = false

func doButton(ops *op.Ops, q input.Source) {
	// Confine the area of interest to a 100x100 rectangle.
	defer clip.Rect{Max: image.Pt(100, 100)}.Push(ops).Pop()

	// Declare `tag` as being one of the targets.
	event.Op(ops, tag)

	// Process events that arrived between the last frame and this one.
	for {
		ev, ok := q.Event(pointer.Filter{
			Target: tag,
			Kinds:  pointer.Press | pointer.Release,
		})
		if !ok {
			break
		}

		if x, ok := ev.(pointer.Event); ok {
			switch x.Kind {
			case pointer.Press:
				pressed = true
			case pointer.Release:
				pressed = false
			}
		}
	}

	// Draw the button.
	var c color.NRGBA
	if pressed {
		c = color.NRGBA{R: 0xFF, A: 0xFF}
	} else {
		c = color.NRGBA{G: 0xFF, A: 0xFF}
	}
	paint.ColorOp{Color: c}.Add(ops)
	paint.PaintOp{}.Add(ops)
}
```

```

```

It’s convenient to use a Go pointer value for the input tag, as it’s cheap to convert a pointer to an interface{} and it’s easy to make the value specific to a local data structure, which avoids the risk of tag conflict.

For more details take a look at [`gioui.org/io/pointer`](https://gioui.org/io/pointer) (pointer/mouse events) and [`gioui.org/io/key`](https://gioui.org/io/key) (keyboard events).

## External input

A single frame consists of getting input, registering for input and drawing the new state:

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
		// Draw the state into ops based on events in e.Queue.
		draw(&ops, e.Source)
		// Update the display.
		e.Frame(&ops)
	}
}
```

Let’s make the button change it’s position every second. We’ll use a [`Ticker`](https://golang.org/pkg/time#Ticker) as an example external change. We use locks to protect the state and once we have modified the state we need to notify the window to retrigger rendering with [`window.Invalidate()`](https://gioui.org/app#Window.Invalidate).

```go
var window app.Window
window.Option(app.Title(title))

var button struct {
	lock   sync.Mutex
	offset int
}

updateOffset := func(v int) {
	button.lock.Lock()
	defer button.lock.Unlock()
	button.offset = v
}
readOffset := func() int {
	button.lock.Lock()
	defer button.lock.Unlock()
	return button.offset
}

go func() {
	changes := time.NewTicker(time.Second)
	defer changes.Stop()
	for t := range changes.C {
		updateOffset(int((t.Second() % 3) * 100))
		window.Invalidate()
	}
}()

ops := new(op.Ops)
for {
	switch e := window.Event().(type) {
	case app.DestroyEvent:
		return e.Err
	case app.FrameEvent:
		ops.Reset()

		// Offset the button based on state.
		op.Offset(image.Pt(readOffset(), 0)).Add(ops)

		// Handle button input and draw.
		doButton(ops, e.Source)

		// Update display.
		e.Frame(ops)
	}
}
```

```

```

Writing a program using these concepts could get really verbose, which is why Gio provides standard widgets for common look and behaviour. Most programs end up using widgets primarily and few low-level operations.

## Advanced Input Topics

Content below this heading explores more advanced usage of Gio’s input operations. This content is mostly useful for people writing custom widgets, and isn’t strictly necessary for using Gio’s high-level widget and layout APIs.

### Input Tree

You may have noticed that the previous example uses a `clip.AreaOp` (constructed with `clip.Rect`) to describe where it wants pointer input. This is because Gio uses `clip.AreaOp`s both to describe drawing and input regions. As you can see above, often you want to both draw within a region and accept input within that region, so this reuse is convenient.

`clip.AreaOp`s form an implicit tree of input areas, each of which may be interested in pointer input, keyboard input, or both.

Here’s an example to explore how pointer events interact with this tree structure.

```go
var (
	// Declare a number of variables to use both as state
	// and input tags.
	root, child1, child2 bool
)

// displayForTag adds a pointer.InputOp interested
// in press and release events to the given op.Ops using
// the given tag. It also paints a color based on the current
// value of the tag to the current clip.
func displayForTag(ops *op.Ops, tag *bool, rect clip.Rect) {
	event.Op(ops, tag)

	// Choose a color based on whether the tag is being pressed.
	c := color.NRGBA{B: 0xFF, A: 0xFF}
	if *tag {
		c = color.NRGBA{R: 0xFF, A: 0xFF}
	}
	// Paint the current clipping area with a translucent color.
	translucent := c
	translucent.A = 0x44
	paint.ColorOp{Color: translucent}.Add(ops)
	paint.PaintOp{}.Add(ops)

	// Reduce our clipping area to the outline of the rectangle, then
	// paint that outline. This should make it easier to see overlapping
	// rectangles.
	defer clip.Stroke{
		Path:  rect.Path(),
		Width: 5,
	}.Op().Push(ops).Pop()
	paint.ColorOp{Color: c}.Add(ops)
	paint.PaintOp{}.Add(ops)
}

func doPointerTree(ops *op.Ops, q input.Source) {
	// Process events that arrived between the last frame and this one for every tag.
	for _, tag := range []*bool{&root, &child1, &child2} {
		for {
			ev, ok := q.Event(pointer.Filter{
				Target: tag,
				Kinds:  pointer.Press | pointer.Release,
			})
			if !ok {
				break
			}

			x, ok := ev.(pointer.Event)
			if !ok {
				continue
			}

			switch x.Kind {
			case pointer.Press:
				*tag = true
			case pointer.Release:
				*tag = false
			}
		}
	}

	// Confine the rootArea of interest to a 200x200 rectangle.
	rootRect := clip.Rect(image.Rect(0, 0, 200, 200))
	rootArea := rootRect.Push(ops)
	displayForTag(ops, &root, rootRect)

	// Any clip areas we add before Pop-ing the root area
	// are considered its children.
	child1Rect := clip.Rect(image.Rect(25, 25, 175, 100))
	child1Area := child1Rect.Push(ops)
	displayForTag(ops, &child1, child1Rect)
	child1Area.Pop()

	child2Rect := clip.Rect(image.Rect(100, 25, 175, 175))
	child2Area := child2Rect.Push(ops)
	displayForTag(ops, &child2, child2Rect)
	child2Area.Pop()

	rootArea.Pop()
	// Now anything we add is _not_ a child of the rootArea.
}
```

```

```

Try clicking each of the three blue rectangles. You should see that clicking the biggest rectangle only turns itself red, while clicking either of the two rectangles inside of it turns both the rectangle that you clicked *and* the outermost rectangle red.

This happens because pointer input events propagate up the tree of `clip.AreaOp`s looking for `pointer.Filter`s for that kind of event. They do not stop at the first interested `pointer.Filter`, but continue all the way up to the root of the tree. This means that both the rectangle we clicked *and* the rectangle that contains it receive the `pointer.Press` and `pointer.Release` from clicking on one of the nested rectangles.

Notice also that if you click on the area where the two child rectangles overlap, only the top-most (last drawn) rectangle receives the click. By default, Gio only considers the foremost area and its ancestors when routing pointer events. If you want to alter this, you can use `pointer.PassOp` to allow pointer events to pass through an input area to those underneath it. This is useful for laying out overlays and similar elements. See the [documentation for package `pointer`](https://pkg.go.dev/gioui.org/io/pointer#hdr-Pass_through) for details on this operation.

[Prev  
\
Drawing](/doc/architecture/drawing)

[Next  
\
Widget](/doc/architecture/widget)