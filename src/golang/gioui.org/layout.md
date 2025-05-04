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

# Layout Putting things where they belong

- [Inset](#inset)
- [Stack](#stack)
- [Background](#background)
- [List](#list)
- [Flex](#flex)
- [Spacer](#spacer)
- [Custom](#custom)

Package [`gioui.org/layout`](https://gioui.org/layout) provides support for common layout operations such as spacing, lists and stacks of overlapping widgets.

In the layout examples we’ll use this `ColorBox` widget to visualize layouts:

```go
// Test colors.
var (
	background = color.NRGBA{R: 0xC0, G: 0xC0, B: 0xC0, A: 0xFF}
	red        = color.NRGBA{R: 0xC0, G: 0x40, B: 0x40, A: 0xFF}
	green      = color.NRGBA{R: 0x40, G: 0xC0, B: 0x40, A: 0xFF}
	blue       = color.NRGBA{R: 0x40, G: 0x40, B: 0xC0, A: 0xFF}
)

// ColorBox creates a widget with the specified dimensions and color.
func ColorBox(gtx layout.Context, size image.Point, color color.NRGBA) layout.Dimensions {
	defer clip.Rect{Max: size}.Push(gtx.Ops).Pop()
	paint.ColorOp{Color: color}.Add(gtx.Ops)
	paint.PaintOp{}.Add(gtx.Ops)
	return layout.Dimensions{Size: size}
}
```

## Inset

[`layout.Inset`](https://gioui.org/layout#Inset) adds space around a widget.

```go
func inset(gtx layout.Context) layout.Dimensions {
	// Draw rectangles inside of each other, with 30dp padding.
	return layout.UniformInset(unit.Dp(30)).Layout(gtx, func(gtx layout.Context) layout.Dimensions {
		return ColorBox(gtx, gtx.Constraints.Max, red)
	})
}
```

```

```

## Stack

[`layout.Stack`](https://gioui.org/layout#Stack) lays out overlapping child elements according to the alignment direction. The child of a stack layout can be:

- [`Stacked`](https://gioui.org/layout#Stacked) - which doesn’t have minimum constraints and the maximum constraints passed to Stack.Layout.
- [`Expanded`](https://gioui.org/layout#Expanded) - which uses the largest Stacked item as the minimum constraint and maximum is the maximum constraints passed to Stack.Layout.

For example, this draws green and blue rectangles on top of a red background:

```go
func stacked(gtx layout.Context) layout.Dimensions {
	return layout.Stack{}.Layout(gtx,
		// Force widget to the same size as the second.
		layout.Expanded(func(gtx layout.Context) layout.Dimensions {
			// This will have a minimum constraint of 100x100.
			return ColorBox(gtx, gtx.Constraints.Min, red)
		}),
		layout.Stacked(func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(100, 30), green)
		}),
		layout.Stacked(func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(30, 100), blue)
		}),
	)
}
```

```

```

### Background

Because layouting a background for a widget is very frequent there is a more performant implementation for that scenario, which roughly corresponds to:

```go
layout.Stack{Alignment: layout.C}.Layout(gtx,
	layout.Expanded(background),
	layout.Stacked(widget)
)
```

```go
func layoutBackground(gtx layout.Context) layout.Dimensions {
	return layout.Background{}.Layout(gtx,
		func(gtx layout.Context) layout.Dimensions {
			defer clip.Rect{Max: gtx.Constraints.Min}.Push(gtx.Ops).Pop()
			paint.Fill(gtx.Ops, background)
			return layout.Dimensions{Size: gtx.Constraints.Min}
		}, func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(30, 100), blue)
		})
}
```

```

```

## List

[`layout.List`](https://gioui.org/layout#List) can display a potentially large list of items. Since `List` also handles scrolling it must be persisted across layouts, otherwise the scrolling position is lost. List handles large numbers of items by only laying out the visible elements. Each frame, the provided closure is invoked only for indicies visible at the current scroll position (and possibly a small number of items above and below the scroll position).

```go
var list = layout.List{}

func listing(gtx layout.Context) layout.Dimensions {
	return list.Layout(gtx, 100, func(gtx layout.Context, i int) layout.Dimensions {
		col := color.NRGBA{R: byte(i * 20), G: 0x20, B: 0x20, A: 0xFF}
		return ColorBox(gtx, image.Pt(20, 100), col)
	})
}
```

```

```

## Flex

[`layout.Flex`](https://gioui.org/layout#List) lays out children according to their weights or rigid constraints. First the rigid elements are used to determine the remaining space and then the remaining space is divided among flexed children according to weights.

The children can be:

- [`Rigid`](https://gioui.org/layout#Rigid) - are laid out with as much space left over from other rigid children.
- [`Flexed`](https://gioui.org/layout#Flexed) - children are sized according to their weights and the space left over from rigid children.

```go
func flexed(gtx layout.Context) layout.Dimensions {
	return layout.Flex{}.Layout(gtx,
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(100, 100), red)
		}),
		layout.Flexed(0.5, func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, gtx.Constraints.Min, blue)
		}),
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(100, 100), red)
		}),
		layout.Flexed(0.5, func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, gtx.Constraints.Min, green)
		}),
	)
}
```

```

```

## Spacer

[`layout.Spacer`](https://gioui.org/layout#Spacer) can be used together with `layout.List` or `layout.Flex` to add empty space between items.

```go
func spacer(gtx layout.Context) layout.Dimensions {
	return layout.Flex{}.Layout(gtx,
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(100, 100), red)
		}),
		layout.Rigid(layout.Spacer{Width: 20}.Layout),
		layout.Flexed(0.5, func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, gtx.Constraints.Min, blue)
		}),
		layout.Rigid(layout.Spacer{Width: 20}.Layout),
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, image.Pt(100, 100), red)
		}),
		layout.Rigid(layout.Spacer{Width: 20}.Layout),
		layout.Flexed(0.5, func(gtx layout.Context) layout.Dimensions {
			return ColorBox(gtx, gtx.Constraints.Min, green)
		}),
	)
}
```

```

```

## Custom

Sometimes the builtin layouts are not sufficient. To create a custom layout for widgets there are special functions and structures to manipulate layout.Context. In general, layout code performs the following steps for each sub-widget:

- Use `op.Save`.
- Set `layout.Context.Constraints`.
- Set `op.TransformOp`.
- Call `widget.Layout(gtx, ...)`.
- Use dimensions returned by widget.
- Use `StateOp.Load`.

For complicated layouts you would also need to use macros. As an example take a look at [layout.Flex](https://gioui.org/layout#Flex). Which roughly implements:

1. Record widgets in macros.
2. Calculate sizes for non-rigid widgets.
3. Draw widgets based on the calculated sizes by replaying their macros.

[Prev  
\
Widget](/doc/architecture/widget)

[Next  
\
Theme](/doc/architecture/theme)