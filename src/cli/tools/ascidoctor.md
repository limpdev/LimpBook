# Asciidoctor

* * *

> [!NOTE] This package is still under development. If you find a bug, please report it on <https://github.com/asciidoctor/sublimetext-asciidoc/issues>. Any suggestions are welcome!

# Golang Tools Integration

It’s a fork version of [GoTools](https://github.com/ironcladlou/GoTools) by ironcladlou. I create this project because ironcladlou has decided to abandon GoTools project, and I want to use this plugin together with [Golang Build](https://github.com/golang/sublime-build) (by wbond) ([discuss-1](https://github.com/ironcladlou/GoTools/issues/121); [discuss-2](https://github.com/ironcladlou/GoTools/issues/128)).

### Features inherited from GoTools: \- Auto-Completion: with gocode \- Auto-Format: with gofmt or goimports \- Go-to Definition: with guru \- Rename: with gorename

### Features removed(replaced) from GoTools: \- Go syntax highlight: replaced by sublime’s native support \- Go build & test system: replaced by “[Golang Build](https://github.com/golang/sublime-build)” (search in package-control) \- GoTools Settings: replaced by “[golangconfig](https://github.com/golang/sublime-config)” \- godef support: only use guru for “Go to definition”

### Features added: \- Auto-Lint: with golint or govet \- Doc tips over selected text or cursor: with godoc

### Usage \- **Step 1** : Install golang and go tools by yourself: gocode, goimports, guru, gorename, golint, and make sure the `$GOPATH/bin` is added into `$PATH` (Or you can set them in Golang’s global “Settings - User” later).

```bash
      go get -u -v github.com/nsf/gocode
      # OR mdempsky/gocode for better performance
      go get -u -v github.com/mdempsky/gocode

      go get -u -v github.com/golang/lint/golint
      go get -u -v golang.org/x/tools/cmd/guru
      go get -u -v golang.org/x/tools/cmd/goimports
      go get -u -v golang.org/x/tools/cmd/gorename
```

  * **Step 2** : Search and install “Golang Tools Integration” from package control.
  * **Step 3(optional)** : Configure the Settings for `golang` and your project following the `golang.sublime-settings` and `ExampleProject.sublime-project`. Typically, the full features of ‘guru’ need use the configuration of the project.



### Tips \- If you want to trigger auto-completion after “.”, you can add below into Settings - Syntax specific - User (a.k.a. User/Go.sublime-settings):

```json
      {
          "auto_complete_triggers": [{"selector": "source.go - string - comment - constant.numeric", "characters": "."}]
      }
```

  * If you want to ignore auto-completion when in comments, constant strings, and numbers, you can add below into Settings - Syntax specific - User (a.k.a. User/Go.sublime-settings):

```json
{
  "auto_complete_selector": "meta.tag - punctuation.definition.tag.begin, source - comment - string - constant.numeric"
}
```

* * *

**Introduction below comes from GoTools project**

# GoTools

GoTools is a [Go programming language](http://www.golang.org) plugin for [Sublime Text 3](http://www.sublimetext.com) inspired by [vim-go](https://github.com/fatih/vim-go). Rather than attempting to reinvent various supporting IDE components, it provides integration with existing community-supported tools.

## Features

    * Jump to symbol/declaration using [guru](https://godoc.org/golang.org/x/tools/cmd/guru)

    * Format and syntax check on save, including gutter marks (using [gofmt](https://golang.org/cmd/gofmt/))

    * Autocompletion (using [gocode](https://github.com/nsf/gocode))

    * Build and test integration

    * Source analysis (using [guru](https://godoc.org/golang.org/x/tools/cmd/guru))

    * Identifier renaming (using [gorename](https://godoc.org/golang.org/x/tools/cmd/gorename))

    * Improved syntax support (borrowed from [GoSublime](https://github.com/DisposaBoy/GoSublime))

### Prerequisites

GoTools will attempt to find all external Go tools (`guru`, `gofmt`, `gocode`, etc.) using `GOPATH` and `GOROOT` (not `PATH`). If you don’t have these binaries, use `go get` to install them: go get -u -v github.com/nsf/gocode go get -u -v golang.org/x/tools/cmd/goimports go get -u -v golang.org/x/tools/cmd/guru go get -u -v golang.org/x/tools/cmd/gorename GoTools is only tested with Go 1.4. Note that `gofmt` is now included with the Go distribution, and any `gofmt` installed to `GOPATH` is likely from an old Go version and should probably be removed.

### Installing

The easiest way to install GoTools is to use [Package Control](https://packagecontrol.io). Simply install Package Control, and then install the “GoTools” package using `Package Control: Install Package` from the command palette. If you want to install GoTools manually, download [the latest release](https://github.com/ironcladlou/GoTools/releases) and extract it to `~/.config/sublime-text-3/Packages/GoTools` on Linux, or `~/Library/Application\ Support/Sublime\ Text\ 3/Packages/GoTools` on OSX.

### Configuring GoTools

Create a GoTools settings file through the Sublime Text preferences menu at `Package Settings -> GoTools -> Settings -> User`. [Default settings](GoTools.sublime-settings) are provided and can be accessed through the Sublime Text preferences menu at `Package Settings -> GoTools -> Settings - Default`. Each option is documented in the settings file itself.

### Configuring Your Project

Create a `GoTools` settings key in a Sublime Text `.sublime-project` file (through the menu at `Project -> Edit Project`). A documented [example project file](ExampleProject.sublime-project) is provided.

## Using GoTools

**NOTE:** Most GoTools commands are available via the Sublime Text command palette. Open the palette when viewing a Go source file and search for “GoTools” to see what’s available. Many of the build commands are also available via the context menu.

#### Format on Save

GoTools will format Go source buffers each time they’re saved. To disable automatic formatting, set `format_on_save` in your [GoTools settings](GoTools.sublime-settings). Here’s an example key binding which formats a source file when `<ctrl>+<alt>+f` is pressed:

```json
{"keys": ["ctrl+alt+f"], "command": "gotools_format"}
```

By default [gofmt](https://golang.org/cmd/gofmt/) is used for formatting. To change the backend, set `format_backend` in your [GoTools settings](GoTools.sublime-settings). [goimports](https://godoc.org/golang.org/x/tools/cmd/goimports) is also available, as well as the option to first run goimports, then gofmt. This third option is useful when you want the automatic import resolution as well as the simplification (`-s`) feature from gofmt at the same time.

#### Go to Definition

GoTools provides a `gotools_goto_def` Sublime Text command which will jump to the symbol definition at the cursor.

Here’s an example key binding which will go to a definition when `<ctrl+g>` is pressed:

```json
{"keys": ["ctrl+g"], "command": "gotools_goto_def"}
```

Here’s an example `sublime-mousemap` entry which will go to a definition using `<ctrl>+<left mouse>`:

```json
{"button": "button1", "count": 1, "modifiers": ["ctrl"], "command": "gotools_goto_def"}
```

#### Autocomplete

GoTools integrates the Sublime Text autocompletion engine with [gocode](https://github.com/nsf/gocode).

Here’s an example key binding which autocompletes when `<ctrl>+<space>` is pressed:

```json
{"keys": ["ctrl+space"], "command": "auto_complete"}
```

When suggestions are available, a specially formatted suggestion list will appear, including type information for each suggestion.

To disable autocompletion integration, set `autocomplete` in your [GoTools settings](GoTools.sublime-settings).

#### Builds

GoTools integrates the Sublime Text build system with `go build`.

Activate the GoTools build system from the Sublime Text menu by selecting it from `Tools -> Build System`. If the build system is set to `Automatic`, GoTools will be automatically used for builds when editing Go source files.

There are several ways to perform a build:

    * From the Sublime Text menu at `Tools -> Build`
    * A key bound to the `build` command
    * The command palette, as `Build: Build`

A “Clean Build” command variant is also provided which recursively deletes all `GOPATH/pkg` directory contents prior to executing the build as usual.

Build results are placed in the Sublime Text build output panel which can be toggled with a command such as:

```json
{ "keys" : ["ctrl+m"], "command" : "show_panel" , "args" : {"panel": "output.exec", "toggle": true}},
```

Here’s an example key binding which runs a build when `<ctrl>+b` is pressed:

```json
      { "keys": ["ctrl+b"], "command": "build" },
```

Here’s an example key binding which runs “Clean Build” when `<ctrl>+<alt>+b` is pressed:

```json
{ "keys": ["ctrl+alt+b"], "command": "build", "args": {"variant": "Clean Build"}},
```

#### Tests

GoTools integrates the Sublime Text build system with `go test`.

GoTools attempts to “do what you mean” depending on context. For instance, when using “Run Test at Cursor” in a test file which requires an `integration` Go build tag, GoTools will notice this and automatically add `-tags integration` to the test execution.

The following GoTools build variants are available:

Variant | Description
---|---
Run Tests | Discovers test packages based on the `project_package` and `test_packages` settings relative to the project `gopath` and executes them.
Run Test at Cursor | Runs a single test method at or surrounding the cursor.
Run Current Package Tests | Runs tests for the package containing the current file.
Run Tagged Tests | Like “Run Tests” but for the packages specified in the `tagged_packages` setting.
Run Last Test | Runs the last test variant that was executed.

Test results are placed in the built-in Sublime Text build output panel which can be toggled with a command such as:

```json
{ "keys" : ["ctrl+m"], "command" : "show_panel" , "args" : {"panel": "output.exec", "toggle": true}},
```

Here’s an example key binding which runs the test at the cursor when `<ctrl>+<alt>+t` is pressed:

```json
{ "keys": ["ctrl+alt+t"], "command": "build", "args": {"variant": "Run Test at Cursor"}},
```

Replace `variant` in the command with any variant name from the preceding table for other bindings.

#### Oracle Analysis (experimental)

GoTools integrates Sublime Text with [guru](https://godoc.org/golang.org/x/tools/cmd/guru). Oracle is invoked with the `gotools_guru` Sublime Text command.

Here’s an example which runs the guru “implements” command when `<ctrl+alt+i>` is pressed:

``` json
{ "keys" : ["ctrl+alt+i"], "command" : "gotools_guru" , "args" : {"command": "implements"}},
```

The following guru operations are supported as arguments to the `gotools_guru` command:

Command | Notes
---|---
callers | Slow on large codebases.
callees | Slow on large codebases.
callstack | Slow on large codebases.
describe |
freevars | Requires a selection.
implements |
peers |
referrers |

Oracle results are placed in a Sublime Text output panel which can be toggled with a command such as:

```json
{ "keys" : ["ctrl+m"], "command" : "show_panel" , "args" : {"panel": "output.gotools_guru", "toggle": true}},
```

#### Rename (experimental)

GoTools provides a `gotools_rename` command supported by [gorename](https://godoc.org/golang.org/x/tools/cmd/gorename) which supports type-safe renaming of identifiers.

When the `gotools_rename` command is executed, an input panel labeled `Go rename:` will appear. Rename results are placed in a Sublime Text output panel which can be toggled with a command such as:

```json
{ "keys" : ["ctrl+m"], "command" : "show_panel" , "args" : {"panel": "output.gotools_rename", "toggle": true}},
```

**Important** : The `gorename` tool writes files in-place with no option for a dry-run. Changes might be destructive, and the tool is known to have bugs.

### Gocode Caveats

**Important** : Using gocode support will modify the `lib-path` setting in the gocode daemon. The change will affect all clients, including other Sublime Text sessions, Vim instances, etc. Don’t use this setting if you’re concerned about interoperability with other tools which integrate with gocode.

Some projects make use of a dependency isolation tool such as [Godep](https://github.com/tools/godep), and many projects use some sort of custom build script. Additionally, gocode uses a client/server architecture, and at present relies on a global server-side setting to resolve Go package paths for suggestion computation. By default, gocode will only search `GOROOT` and `GOPATH/pkg` for packages, which may be insufficient if the project compiles source to multiple `GOPATH` entries (such as `Godeps/_workspace/pkg`).

With such a project, to get the best suggestions from gocode, it’s necessary to configure the gocode daemon prior to client suggestion requests to inform gocode about the locations of compiled packages for the project.

GoTools will infer the correct gocode `lib-path` by constructing a path which incorporates all project `GOPATH` entries.

### GoSublime Caveats

Installing GoTools alongside GoSublime isn’t tested or supported, so YMMV.
