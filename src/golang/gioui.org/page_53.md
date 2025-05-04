[Skip to main content](#main-content) Link Menu Expand (external link) Document Search Copy Copied

[GUI with Gio](/gui-with-gio/)

- [Overview](/gui-with-gio/)
- [Egg timer](/gui-with-gio/egg_timer/)
  
  - [Chapter 1 - Window](/gui-with-gio/egg_timer/01_empty_window.html)
  - [Chapter 2 - Title](/gui-with-gio/egg_timer/02_title_and_size.html)
  - [Chapter 3 - Button](/gui-with-gio/egg_timer/03_button.html)
  - [Chapter 4 - Layout](/gui-with-gio/egg_timer/04_button_low.html)
  - [Chapter 5 - Refactoring](/gui-with-gio/egg_timer/05_button_low_refactored.html)
  - [Chapter 6 - Margin](/gui-with-gio/egg_timer/06_button_low_margin.html)
  - [Chapter 7 - Progressbar](/gui-with-gio/egg_timer/07_progressbar.html)
  - [Chapter 8 - Circle](/gui-with-gio/egg_timer/08_egg_as_circle.html)
  - [Chapter 9 - Egg](/gui-with-gio/egg_timer/09_egg_as_egg.html)
  - [Chapter 10 - Input](/gui-with-gio/egg_timer/10_input_boiltime.html)
  - [Bonus - Improved animation](/gui-with-gio/egg_timer/11_improved_animation.html)
- [Teleprompter](/gui-with-gio/teleprompter/)
  
  - [Chapter 1 - Setup](/gui-with-gio/teleprompter/01_setup.html)
  - [Chapter 2 - User input](/gui-with-gio/teleprompter/02_user_input.html)
  - [Chapter 3 - Layout](/gui-with-gio/teleprompter/03_layout.html)
  - [Chapter 4 - Event Area](/gui-with-gio/teleprompter/04_event_area.html)

This site uses [Just the Docs](https://github.com/just-the-docs/just-the-docs), a documentation theme for Jekyll.

# Let’s build a GUI with Gio

```
#go, #golang, #gui, #gioui
```

**You want a GUI. Of course you do.**

Did you know that Go has a great GUI library called [Gio](https://gioui.org/)? In this [10-part tutorial](/gui-with-gio/egg_timer/) we will start completely from scratch — with zero background required — and build a self-contained GUI application.

![Screenshot of egg_timer](/gui-with-gio/egg_timer/egg_timer.gif)

[Get started now](/gui-with-gio/egg_timer/) [View it on GitHub](https://github.com/jonegil/gui-with-gio/)

## And there’s more

The first tutorial will get you started. But if your needs are more advanced, continue with [a more advanced app](https://jonegil.github.io/gui-with-gio/teleprompter/) where we build a Teleprompter that adds animation and reacts to user input, both keyboard shortcut keys and mouse gestures.

## Background

Command lines are great and all, but let’s face it, 95% of users aren’t power users. They want buttons to push, toggles to switch, and then to simply get on with their lives. Enter [Gio](https://gioui.org/), a great toolkit to build stunningly beautiful, lightning fast and flexible interfaces that meet *your* needs.

### Three out of three

For an interface to work, it must be:

1. **Beautiful**
   
   - No one will use an app that looks like #$%$#!”#
2. **Fast**
   
   - Snappy, instant, responsive, immediate, direct
   - Quick to code, easy to test
3. **Flexible**
   
   - Fits *your* needs, *your* ideas, *your* principles
   - Not impose its will on you
   - Simple should be simple, complex should be allowed

1 and 2 and 3. Beautiful AND Fast AND Flexible. No compromises.

### Just do it

*“But I don’t know how.”*

Agreed, the [official Gio website](https://gioui.org) is a bit advanced. [Nice repos exist](https://github.com/gioui) with many examples, but where should you start? If you’re a practical learner you simply want to get started, code something simple, and learn as you go along. That’s me at least, and if you’re like that too, we’re soulmates.

So let’s just do exactly that. The point here is to build something simple from the ground up, and touch upon concepts and ideas as we go along. Every step moves us forward, and every new feature builds on something we’ve touched upon before. The goal is to change the initial *“I don’t know how.”* to a more optimistic *“I don’t know how - yet!”*.

Come along for the ride!

### Disclaimer

I really like Gio, I like the people behind it, I sponsor it financially and I want it to succeed. But I´m by no means an expert. My goal is simply to share what I’ve learned in the hope that you find it useful. Hope that works.

Also note that Gio is moving fast and not all writeups are updated immediately. Issues and PRs are welcome.

If this is useful, please **star** the repo on Github, or even better, drop me a line. I really love hearing what people build with Gio.

Cheers!