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

# FAQ Frequently Asked Questions

- [What is the difference between Gio and Gomobile?](#what-is-the-difference-between-gio-and-gomobile)
- [Why Sourcehut?](#why-sourcehut)
- [Why all the closures?](#why-all-the-closures)
- [Why do my blended colors look wrong?](#why-do-my-blended-colors-look-wrong)

See also [Common Errors](/doc/learn/common-errors) for usual mistakes.

## What is the difference between Gio and Gomobile?

[Go Mobile](https://github.com/golang/mobile) produces either standalone programs (`gomobile build`) or libraries suitable for calling from Java or Objective-C/Swift (`gomobile bind`).

`gomobile build` is similar to using the [gioui.org/app](https://gioui.org/app) package and the [gioui.org/cmd/gogio](https://gioui.org/cmd/gogio) tool to produce an Android or iOS app. The difference is the abstraction level: `gomobile build` programs have access to a raw OpenGL ES context while the Gio `app` package exposes a higher level drawing interface. Gomobile programs also don’t have any GUI packages available.

`gomobile bind` exports a set of Go packages for convenient access from Java or Objective-C/Swift code. There is no counterpart in Gio, and could be used for interfacing with native code from Gio programs.

## Why Sourcehut?

The most important feature of Sourcehut is that email contributions are first class citizens. Email has many problems, but it is permissionless, ubiquitous and decentralized. For example, people banned from GitHub can contribute patches, use the mailing list and file issues if they can send and receive email.

Second, Sourcehut encourages using Git in a more decentralized way. There is a canonical Gio repository, but contributors can work on their changes in ways that suit them. For example, local clones for smaller changes or pushing to a Git host of their choice for larger changes. The Sourcehut author wrote a [blog post](https://drewdevault.com/2019/05/24/What-is-a-fork.html) about how GitHub changed the meaning of forks and pull requests to be more self-serving and centralized.

Finally, the code for Sourcehut itself is open source, keeping it honest by the threat of self-hosting or even a complete fork. Project owners pay for hosting, lowering the incentive to extract indirect value from users and keeps the feature set focused on its projects.

Note that even ignoring the above arguments, there is not a clear alternative. For example, the Go project itself supports GitHub contributions, but only as a bridge to its preferred code review tool Gerrit.

## Why all the closures?

One of the first things people notice is all the callbacks:

```go
	return layout.Flex{}.Layout(gtx,
		layout.Flexed(1, func(gtx layout.Context) layout.Dimensions {
			return layout.Center.Layout(gtx,
				func(gtx layout.Context) layout.Dimensions {
					return material.Body1(th, strconv.Itoa(counter.Count)).Layout(gtx)
				})
		}),
		...
}
```

The main reason for writing the code in such a style is performance. This approach avoids many heap allocations and a lot of dynamic dispatch. There isn’t a significant problem with the core loop performance on desktops. It does affect low-end devices.

To avoid deeply nested closures there are a few approaches. First, when the last call exactly matches the argument, the last closure can be dropped.

```go
	return layout.Flex{}.Layout(gtx,
		layout.Flexed(1, func(gtx layout.Context) layout.Dimensions {
			return layout.Center.Layout(gtx,
				material.Body1(th, strconv.Itoa(counter.Count)).Layout)
		}),
```

An utility function can be used:

```go
	return layout.Flex{}.Layout(gtx,
		layout.Flexed(1, centeredText(strconv.Itoa(counter.Count))),
		...
}

func centeredText(text string) layout.Widget {
	return func(gtx layout.Context) layout.Dimensions {
		return layout.Center.Layout(gtx, material.Body1(th, text).Layout)
	}
}
```

Or when more configuration is needed, then a small custom widget can be used:

```go
	return layout.Flex{}.Layout(gtx,
		layout.Flexed(1, alignedText{
			align: layout.Center,
			text:  strconv.Itoa(counter.Count),
		}.Layout),
		...
}

type alignedText struct {
	align layout.Direction
	text  string
}

func (w alignedText) Layout(gtx layout.Context) layout.Dimensions {
	return w.align.Layout(gtx, material.Body1(th, w.text).Layout)
}
```

## Why do my blended colors look wrong?

Gio uses sRGB for color input, yet performs blending in linear colorspace. This approach results in correct color blending and while maintaining color value compatibility with most programs

For more details see [Color](/doc/architecture/color) page.