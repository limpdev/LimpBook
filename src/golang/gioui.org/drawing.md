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

# Drawing Displaying things on the screen

- [Offset](#offset)
- [Clipping](#clipping)
- [Lines](#lines)
- [Operation Stack](#operation-stack)
- [Drawing Order](#macros)
- [Animation](#animation)
- [Record and replay](#record-and-replay)
- [Images](#images)

The [`paint`](https://gioui.org/op/paint) package provides operations for drawing graphics.

Coordinates are based on the top-left corner, although it’s possible to [transform the coordinate system](https://gioui.org/op#TransformOp). This means `f32.Point{X:0, Y:0}` is the top left corner of the window. All drawing operations use pixel units, see [Units](#units) section for more information.

For example, the following code will draw a 100x100 pixel colored rectangle at the top left corner of the window:

```go
func drawRedRect(ops *op.Ops) {
	defer clip.Rect{Max: image.Pt(100, 100)}.Push(ops).Pop()
	paint.ColorOp{Color: color.NRGBA{R: 0x80, A: 0xFF}}.Add(ops)
	paint.PaintOp{}.Add(ops)
}
```

```

```

The `defer`ed line is only deferring the `.Pop()` operation at the end, so we push a rectangular clipping area, set the color to red with `paint.ColorOp`, and then instruct Gio to paint the current area with the current color with `paint.PaintOp`.

## Offset

Operation [`op.TransformOp`](https://gioui.org/op#TransformOp) translates the position of the operations that come after it.

For example, the following function offsets the red rectangle 100 pixels to the right:

```go
func drawRedRect10PixelsRight(ops *op.Ops) {
	defer op.Offset(image.Pt(100, 0)).Push(ops).Pop()
	drawRedRect(ops)
}
```

```

```

Again, note that we are `defer`ing the `.Pop()` of the offset. This means that the offset is applied for the duration of the function, then removed.

## Clipping

In some cases we want the drawing to be confined to a non-rectangular shape, for example to avoid overlapping drawings. Package [`gioui.org/op/clip`](https://gioui.org/op/clip) provides exactly that.

[`clip.RRect`](https://gioui.org/op/clip#RRect) clips all subsequent drawing operations to a rectangle with rounded corners. This is useful as a basis for a button background:

```go
func redButtonBackground(ops *op.Ops) {
	const r = 10 // roundness
	bounds := image.Rect(0, 0, 100, 100)
	clip.RRect{Rect: bounds, SE: r, SW: r, NW: r, NE: r}.Push(ops)
	drawRedRect(ops)
}
```

```

```

For more complex clipping [`clip.Path`](https://gioui.org/op/clip#Path) can express shapes built from lines and bézier curves. This example draws a triangle with a curved edge:

```go
func redTriangle(ops *op.Ops) {
	var path clip.Path
	path.Begin(ops)
	path.Move(f32.Pt(50, 0))
	path.Quad(f32.Pt(0, 90), f32.Pt(50, 100))
	path.Line(f32.Pt(-100, 0))
	path.Line(f32.Pt(50, -100))
	defer clip.Outline{Path: path.End()}.Op().Push(ops).Pop()
	drawRedRect(ops)
}
```

```

```

## Lines

To draw lines we can use [`clip.Stroke`](https://gioui.org/op/clip#Stroke) instead of [`clip.Outline`](https://gioui.org/op/clip#Outline). Stroke draws a fixed-width line along a path, whereas Outline simply does not allow drawing outside of the described path area. We can also use the [`paint.FillShape`](https://gioui.org/op/paint#FillShape) helper to avoid managing the clip state or use `ColorOp` or `PaintOp`. `paint.FillShape` lets us specify an `*op.Ops`, a `color.NRGBA`, and a `clip.AreaOp`, and it takes care of filling the clipped area with the color.

It’s possible to use the predefined shapes, such as [`clip.RRect`](https://gioui.org/op/clip#RRect):

```go
func strokeRect(ops *op.Ops) {
	const r = 10
	bounds := image.Rect(20, 20, 80, 80)
	rrect := clip.RRect{Rect: bounds, SE: r, SW: r, NW: r, NE: r}
	paint.FillShape(ops, red,
		clip.Stroke{
			Path:  rrect.Path(ops),
			Width: 4,
		}.Op(),
	)
}
```

```

```

Or use a custom shape drawn with [`clip.Path`](https://gioui.org/op/clip#Path):

```go
func strokeTriangle(ops *op.Ops) {
	var path clip.Path
	path.Begin(ops)
	path.MoveTo(f32.Pt(30, 30))
	path.LineTo(f32.Pt(70, 30))
	path.LineTo(f32.Pt(50, 70))
	path.Close()

	paint.FillShape(ops, green,
		clip.Stroke{
			Path:  path.End(),
			Width: 4,
		}.Op())
}
```

```

```

For dashes, stroke end caps and joins, there’s a separate package [gioui.org/x/stroke](https://gioui.org/x/stroke). However, they are not as performant as `clip.Stroke`, as the work to construct the path description must be performed on the CPU.

## Operation Stack

Some operations affect all operations that follow them. For example, [`paint.ColorOp`](https://gioui.org/op/paint#ColorOp) sets the “brush” color that is used in subsequent [`paint.PaintOp`](https://gioui.org/op/paint#PaintOp) operations. This drawing context also includes coordinate transformation (set by [`op.TransformOp`](https://gioui.org/op#TransformOp)) and clipping (set by [`clip.Op`](https://gioui.org/op/clip#Op)).

Some operations, such as clips and transformations, allow you to temporarily apply them and later restore the previous state.

For example, the `redButtonBackground` function in the previous section has the unfortunate side-effect of clipping all later operations to the outline of the button background! Let’s make a version of it that doesn’t affect any callers:

```go
func redButtonBackgroundStack(ops *op.Ops) {
	const r = 1 // roundness
	bounds := image.Rect(0, 0, 100, 100)
	defer clip.RRect{Rect: bounds, SE: r, SW: r, NW: r, NE: r}.Push(ops).Pop()
	drawRedRect(ops)
}
```

```

```

## Drawing Order

Drawing happens from back to front. Things inserted into the `op.Ops` first are drawn first, and later elements will be drawn on top. In this function the green rectangle is drawn on top of red rectangle:

```go
func drawOverlappingRectangles(ops *op.Ops) {
	// Draw a red rectangle.
	cl := clip.Rect{Max: image.Pt(100, 50)}.Push(ops)
	paint.ColorOp{Color: color.NRGBA{R: 0x80, A: 0xFF}}.Add(ops)
	paint.PaintOp{}.Add(ops)
	cl.Pop()

	// Draw a green rectangle.
	cl = clip.Rect{Max: image.Pt(50, 100)}.Push(ops)
	paint.ColorOp{Color: color.NRGBA{G: 0x80, A: 0xFF}}.Add(ops)
	paint.PaintOp{}.Add(ops)
	cl.Pop()
}
```

```

```

Sometimes you may want to change this order. For example, you may want to delay drawing to apply a transform that is calculated during drawing, or you may want to perform a list of operations several times. For this purpose there is [op.MacroOp](https://gioui.org/op#MacroOp).

```go
func drawFiveRectangles(ops *op.Ops) {
	// Record drawRedRect operations into the macro.
	macro := op.Record(ops)
	drawRedRect(ops)
	c := macro.Stop()

	// “Play back” the macro 5 times, each time
	// translated vertically 20px and horizontally 110 pixels.
	for i := 0; i < 5; i++ {
		c.Add(ops)
		op.Offset(image.Pt(110, 20)).Add(ops)
	}
}
```

```

```

## Animation

Gio only issues FrameEvents when the window is resized or the user interacts with the window. However, animation requires continuous redrawing until the animation is completed. For that there is [`op.InvalidateCmd`](https://gioui.org/op#InvalidateCmd).

The following code will animate a red “progress bar” that fills up from left to right over 10 seconds from when the program starts:

```go
var startTime = time.Now()
var duration = 10 * time.Second

func drawProgressBar(ops *op.Ops, source input.Source, now time.Time) {
	// Calculate how much of the progress bar to draw,
	// based on the current time.
	elapsed := now.Sub(startTime)
	progress := elapsed.Seconds() / duration.Seconds()
	if progress < 1 {
		// The progress bar hasn’t yet finished animating.
		source.Execute(op.InvalidateCmd{})
	} else {
		progress = 1
	}

	width := 200 * float32(progress)
	defer clip.Rect{Max: image.Pt(int(width), 20)}.Push(ops).Pop()
	paint.ColorOp{Color: color.NRGBA{R: 0x80, A: 0xFF}}.Add(ops)
	paint.PaintOp{}.Add(ops)
}
```

```

```

## Record and replay

While `op.MacroOp` allows you to record and replay operations on a single operation list, [`op.CallOp`](https://gioui.org/op#CallOp) allows for reuse of a separate operation list. This is useful for caching operations that are expensive to re-create, or for animating the disappearance of otherwise removed widgets:

```go
func drawWithCache(ops *op.Ops) {
	// Save the operations in an independent ops value (the cache).
	cache := new(op.Ops)
	macro := op.Record(cache)

	cl := clip.Rect{Max: image.Pt(100, 100)}.Push(cache)
	paint.ColorOp{Color: color.NRGBA{G: 0x80, A: 0xFF}}.Add(cache)
	paint.PaintOp{}.Add(cache)
	cl.Pop()
	call := macro.Stop()

	// Draw the operations from the cache.
	call.Add(ops)
}
```

```

```

Note: For this cache to actually save any work across frames, you’ll need to allocate the cache’s `op.Ops` somewhere that persists across frames. Doing it in a local variable like this will mean that the cache is recreated every frame.

## Images

[`paint.ImageOp`](https://gioui.org/op/paint#ImageOp) is used to draw images. Like [`paint.ColorOp`](https://gioui.org/op/paint#ColorOp), it sets part of the drawing context (the “brush”) that’s used for subsequent [`PaintOp`](https://gioui.org/op/paint#PaintOp). [`ImageOp`](https://gioui.org/op/paint#ImageOp) is used similarly to [`ColorOp`](https://gioui.org/op/paint#ColorOp).

Note that [`image.NRGBA`](https://golang.org/pkg/image#NRGBA) and [`image.Uniform`](https://golang.org/pkg/image#Uniform) images are efficient and treated specially. Other [`Image`](https://golang.org/pkg/image#Image) implementations will undergo a more expensive copy and conversion to the underlying image model.

```go
func drawImage(ops *op.Ops, img image.Image) {
	imageOp := paint.NewImageOp(img)
	imageOp.Filter = paint.FilterNearest
	imageOp.Add(ops)
	op.Affine(f32.Affine2D{}.Scale(f32.Pt(0, 0), f32.Pt(4, 4))).Add(ops)
	paint.PaintOp{}.Add(ops)
}
```

```

```

The image must not be mutated until another [`FrameEvent`](https://gioui.org/io/app#FrameEvent) happens, because the image may be read asynchronously while the frame is being drawn. Additionally, mutations to the image provided to `paint.ImageOp` are not guaranteed to ever be reflected in the drawn content. To update an image on-screen, create a new image.Image and construct a new `paint.ImageOp`.

[Prev  
\
Window](/doc/architecture/window)

[Next  
\
Input](/doc/architecture/input)