---
title: Zenity - Collection of Native UI Prompts | Golang
draft: false
---

`zenity` is a program that will display GTK+ dialogs, and return (either in the return code, or on standard output) the users input. This allows you to present information, and ask for information from the user, from all manner of shell scripts.

For example, zenity `--question` will return either 0 or 1, depending on whether the user pressed OK or Cancel. zenity `--entry` will output on standard output what the user typed into the text entry field.

- Comprehensive documentation is available in the GNOME Help Browser, under GNOME/Utilities.

#### Options

This program follows the usual GNU command line syntax, with long options starting with two dashes ('-').

```bash
--calendar
Display calendar dialog
--entry
Display text entry dialog
--error
Display error dialog
--file-selection
Display file selection dialog
--info
Display info dialog
--list
Display list dialog
--notification
Display notification icon
--progress
Display progress indication dialog
--question
Display question dialog
--text-info
Display text information dialog
--warning
Display warning dialog
--scale
--title=TITLE
Set the dialog title
--window-icon=ICONPATH
Set the window icon
--width=WIDTH
Set the dialog width
--height=HEIGHT
Set the dialog height
--timeout=TIMEOUT
--text=STRING
Set the dialog text
--day=INT
Set the calendar day
--month=INT
Set the calendar month
--year=INT
Set the calendar year
--date-format=PATTERN
--text=STRING
Set the dialog text
--entry-text=STRING
Set the entry text
--hide-text
Hide the entry

#### ERROR OPTIONS
--text=STRING
Set the dialog text
--no-wrap
Do not enable text wrapping

#### FILE SELECTION OPTIONS
--filename=FILENAME
Set the filename
--multiple
Allow selection of multiple filenames in file selection dialog
--directory
Activate directory-only selection
--save
Activate save mode
--separator=SEPARATOR
Specify separator character when returning multiple filenames
--confirm-overwrite
Confirm file selection if filename already exists

#### INFO OPTIONS

--text=STRING
Set the dialog text
--no-wrap
Do not enable text wrapping

#### LIST OPTIONS
--text=STRING
Set the dialog text
--column=STRING
Set the column header
--checklist
Use check boxes for first column
--radiolist
Use radio buttons for first column
--separator=STRING
Set output separator character
--multiple
Allow multiple rows to be selected
--editable
Allow changes to text
--print-column=STRING
Specify what column to print to standard output. The default is to return the first column. 'ALL' may be used to print all columns.
--hide-column=NUMBER
Hide a specific column

#### NOTIFICATION OPTIONS
--text=STRING
Set the notification text
--listen
Listen for commands on stdin

#### PROGRESS OPTIONS
--text=STRING
Set the dialog text
--percentage=INT
Set initial percentage
--auto-close
Close dialog when 100% has been reached
--auto-kill
Kill parent process if cancel button is pressed
--pulsate
Pulsate progress bar

#### QUESTION OPTIONS
--text=STRING
Set the dialog text
--no-wrap
Do not enable text wrapping

#### Text options
--filename=FILENAME
Open file
--editable
Allow changes to text

#### Warning options
--text=STRING
Set the dialog text
--no-wrap
Do not enable text wrapping

#### Scale options
--text=STRING
Set the dialog text
--value=VALUE
Set initial value
--min-value=VALUE
Set minimum value
--max-value=VALUE
Set maximum value
--step=VALUE
Set step size
--print-partial
Print partial values
--hide-value
Hide value

#### Miscellaneous options
-?, --help
Show summary of options.
--about
Display an about dialog.
--version
Show version of program.
Also the standard GTK+ options are accepted.

Environment
Normally, zenity detects the terminal window from which it was launched and keeps itself above that window. This behavior can be disabled by unsetting the WINDOWID environment variable.

Examples
Display a file selector with the title Select a file to remove. The file selected is returned on standard output.

zenity --title="Select a file to remove" --file-selection
Display a text entry dialog with the title Select Host and the text Select the host you would like to flood-ping. The entered text is returned on standard output.

zenity --title "Select Host" --entry --text "Select the host you would like to flood-ping"
Display a dialog, asking Microsoft Windows has been found! Would you like to remove it?. The return code will be 0 (true in shell) if OK is selected, and 1 (false) if Cancel is selected.

zenity --question --title "Alert" --text "Microsoft Windows has been found! Would you like to remove it?"
Show the search results in a list dialog with the title Search Results and the text Finding all header files....

find . -name '*.h' | zenity --list --title "Search Results" --text "Finding all header files.." --column "Files"
Show an icon in the notification area

zenity --notification --window-icon=update.png --text "System update necessary!"
Display a weekly shopping list in a check list dialog with Apples and Oranges pre selected

zenity --list --checklist --column "Buy" --column "Item" TRUE Apples TRUE Oranges FALSE Pears FALSE Toothpaste
Display a progress dialog while searching for all the postscript files in your home directory

find $HOME -name '*.ps' | zenity --progress --pulsate
```

#### Installing

The Go package:

```
go get github.com/ncruces/zenity@latest
```

The `zenity` command on macOS/WSL using [Homebrew](https://brew.sh/) 🍺:

```
brew install ncruces/tap/zenity
```

The `zenity` command on Windows using [Scoop](https://scoop.sh/) 🍨:

```
scoop install https://ncruces.github.io/scoop/zenity.json
```

The `zenity` command on macOS/Windows, if you have [Go](https://go.dev/):

```
go install github.com/ncruces/zenity/cmd/zenity@latest
```

Or download the [latest release](https://github.com/ncruces/zenity/releases/latest).

#### Using

For the Go package, consult the [documentation](https://pkg.go.dev/github.com/ncruces/zenity#section-documentation) and [examples](https://pkg.go.dev/github.com/ncruces/zenity#pkg-examples).

The `zenity` command does its best to be compatible with the GNOME version.
Consult the [documentation](https://help.gnome.org/users/zenity/stable/) and [man page](https://linux.die.net/man/1/zenity) of that command.

#### Why?

###### Benefits of the Go package:

- no `cgo` (see [benefits](https://dave.cheney.net/2016/01/18/cgo-is-not-go), mostly cross-compilation)
- no main loop (or any other threading or initialization requirements)
- cancelation through [`context`](https://golang.org/pkg/context/)
- on Windows:

  - no additional dependencies

    - Explorer shell not required
    - works in Server Core
  - Unicode support
  - High DPI (no manifest required)
  - Visual Styles (no manifest required)
  - WSL/Cygwin/MSYS2 [support](https://github.com/ncruces/zenity/wiki/Zenity-for-WSL,-Cygwin,-MSYS2)
- on macOS:

  - only dependency is `osascript`
- on other Unixes:

  - wraps either one of `zenity`, `matedialog`, [`qarma`](https://github.com/luebking/qarma)

#### Zenity wrappers

Zenity wrappers for languages other than Go can benefit from our `zenity` command. On Unix (Linux, FreeBSD, etc) they can use the original tool, and on Windows/macOS they may use the command from this repo for portability.

Examples:

- NodeJS [`dialog-gui`](https://github.com/SnurfDev/dialog-gui) by [@SnurfDev](https://github.com/SnurfDev/dialog-gui)
- Crystal [`zenity.cr`](https://github.com/kojix2/zenity.cr) by [@kojix2](https://github.com/kojix2/)

#### Credits

I'd like to thank all [contributors](https://github.com/ncruces/zenity/graphs/contributors), but [@gen2brain](https://github.com/gen2brain) in particular for [`dlgs`](https://github.com/gen2brain/dlgs), which was instrumental to the Windows port of `zenity`.

Expand ▾ Collapse ▴

## ![](/static/shared/icon/code_gm_grey_24dp.svg) Documentation [¶](#section-documentation "Go to Documentation")

[Rendered for](https://go.dev/about#build-context) linux/amd64 windows/amd64 darwin/amd64 js/wasm

### Overview [¶](#pkg-overview "Go to Overview")

Package zenity provides cross-platform access to simple dialogs that interact graphically with the user.

It is inspired by, and closely follows the API of, the zenity program, which it uses to provide the functionality on various Unixes. See:

[https://help.gnome.org/users/zenity/stable/](https://help.gnome.org/users/zenity/stable/)

This package does not require cgo, and it does not impose any threading or initialization requirements.

### Constants [¶](#pkg-constants "Go to Constants")

[View Source](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L25)

```
const ErrCanceled = zenutil.ErrCanceled
```

ErrCanceled is returned when the cancel button is pressed, or window functions are used to close the dialog.

[View Source](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L28)

```
const ErrExtraButton = zenutil.ErrExtraButton
```

ErrExtraButton is returned when the extra button is pressed.

[View Source](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L31)

```
const ErrUnsupported = zenutil.ErrUnsupported
```

ErrUnsupported is returned when a combination of options is not supported.

### Variables [¶](#pkg-variables "Go to Variables")

This section is empty.

### Functions [¶](#pkg-functions "Go to Functions")

#### func [Calendar](https://github.com/ncruces/zenity/blob/v0.10.14/date.go#L11) [¶](#Calendar "Go to Calendar") added in v0.8.0

```
func Calendar(text string, options ...Option) (time.Time, error)
```

Calendar displays the calendar dialog.

Valid options: Title, Width, Height, OKLabel, CancelLabel, ExtraButton, WindowIcon, Attach, Modal, DefaultDate.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Calendar "Go to Example")

```
package main

import (
	"time"

	"github.com/ncruces/zenity"
)

func main() {
	zenity.Calendar("Select a date from below:",
		zenity.DefaultDate(2006, time.January, 1))
}
```

```
Output:

```

Share Format Run

#### func [Entry](https://github.com/ncruces/zenity/blob/v0.10.14/entry.go#L9) [¶](#Entry "Go to Entry") added in v0.6.0

```
func Entry(text string, options ...Option) (string, error)
```

Entry displays the text entry dialog.

Valid options: Title, Width, Height, OKLabel, CancelLabel, ExtraButton, WindowIcon, Attach, Modal, EntryText, HideText.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Entry "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Entry("Enter new text:",
		zenity.Title("Add a new entry"))
}
```

```
Output:

```

Share Format Run

#### func [Error](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go#L39) [¶](#Error "Go to Error")

```
func Error(text string, options ...Option) error
```

Error displays the error dialog.

Valid options: Title, Width, Height, OKLabel, ExtraButton, Icon, WindowIcon, Attach, Modal, NoWrap, Ellipsize.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Error "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Error("An error has occurred.",
		zenity.Title("Error"),
		zenity.ErrorIcon)
}
```

```
Output:

```

Share Format Run

#### func [Info](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go#L19) [¶](#Info "Go to Info")

```
func Info(text string, options ...Option) error
```

Info displays the info dialog.

Valid options: Title, Width, Height, OKLabel, ExtraButton, Icon, WindowIcon, Attach, Modal, NoWrap, Ellipsize.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Info "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Info("All updates are complete.",
		zenity.Title("Information"),
		zenity.InfoIcon)
}
```

```
Output:

```

Share Format Run

#### func [IsAvailable](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L35) [¶](#IsAvailable "Go to IsAvailable") added in v0.10.2

```
func IsAvailable() bool
```

IsAvailable reports whether dependencies of the package are installed. It always returns true on Windows and macOS.

#### func [List](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L9) [¶](#List "Go to List") added in v0.6.2

```
func List(text string, items []string, options ...Option) (string, error)
```

List displays the list dialog.

Valid options: Title, Width, Height, OKLabel, CancelLabel, ExtraButton, WindowIcon, Attach, Modal, RadioList, DefaultItems, DisallowEmpty.

May return: ErrCanceled, ErrExtraButton, ErrUnsupported.

Example [¶](#example-List "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.List(
		"Select items from the list below:",
		[]string{"apples", "oranges", "bananas", "strawberries"},
		zenity.Title("Select items from the list"),
		zenity.DisallowEmpty(),
	)
}
```

```
Output:

```

Share Format Run

#### func [ListItems](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L16) [¶](#ListItems "Go to ListItems") added in v0.6.2

```
func ListItems(text string, items ...string) (string, error)
```

ListItems displays the list dialog.

May return: ErrCanceled, ErrUnsupported.

Example [¶](#example-ListItems "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.ListItems(
		"Select items from the list below:",
		"apples", "oranges", "bananas", "strawberries")
}
```

```
Output:

```

Share Format Run

#### func [ListMultiple](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L26) [¶](#ListMultiple "Go to ListMultiple") added in v0.6.2

```
func ListMultiple(text string, items []string, options ...Option) ([]string, error)
```

ListMultiple displays the list dialog, allowing multiple items to be selected.

Valid options: Title, Width, Height, OKLabel, CancelLabel, ExtraButton, WindowIcon, Attach, Modal, CheckList, DefaultItems, DisallowEmpty.

May return: ErrCanceled, ErrExtraButton, ErrUnsupported.

Example [¶](#example-ListMultiple "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.ListMultiple(
		"Select items from the list below:",
		[]string{"apples", "oranges", "bananas", "strawberries"},
		zenity.Title("Select items from the list"),
		zenity.DefaultItems("apples", "bananas"),
	)
}
```

```
Output:

```

Share Format Run

#### func [ListMultipleItems](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L33) [¶](#ListMultipleItems "Go to ListMultipleItems") added in v0.6.2

```
func ListMultipleItems(text string, items ...string) ([]string, error)
```

ListMultipleItems displays the list dialog, allowing multiple items to be selected.

May return: ErrCanceled, ErrUnsupported.

Example [¶](#example-ListMultipleItems "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.ListMultipleItems(
		"Select items from the list below:",
		"apples", "oranges", "bananas", "strawberries")
}
```

```
Output:

```

Share Format Run

#### func [Notify](https://github.com/ncruces/zenity/blob/v0.10.14/notify.go#L6) [¶](#Notify "Go to Notify") added in v0.4.0

```
func Notify(text string, options ...Option) error
```

Notify displays a notification.

Valid options: Title, Icon.

Example [¶](#example-Notify "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Notify("There are system updates necessary!",
		zenity.Title("Warning"),
		zenity.InfoIcon)
}
```

```
Output:

```

Share Format Run

#### func [Password](https://github.com/ncruces/zenity/blob/v0.10.14/pwd.go#L9) [¶](#Password "Go to Password") added in v0.6.0

```
func Password(options ...Option) (usr string, pwd string, err error)
```

Password displays the password dialog.

Valid options: Title, OKLabel, CancelLabel, ExtraButton, WindowIcon, Attach, Modal, Username.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Password "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Password(zenity.Title("Type your password"))
}
```

```
Output:

```

Share Format Run

Example (Username) [¶](#example-Password-Username "Go to Example (Username)")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Password(
		zenity.Title("Type your username and password"),
		zenity.Username())
}
```

```
Output:

```

Share Format Run

#### func [Question](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go#L9) [¶](#Question "Go to Question")

```
func Question(text string, options ...Option) error
```

Question displays the question dialog.

Valid options: Title, Width, Height, OKLabel, CancelLabel, ExtraButton, Icon, WindowIcon, Attach, Modal, NoWrap, Ellipsize, DefaultCancel.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Question "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Question("Are you sure you want to proceed?",
		zenity.Title("Question"),
		zenity.QuestionIcon)
}
```

```
Output:

```

Share Format Run

#### func [SelectColor](https://github.com/ncruces/zenity/blob/v0.10.14/color.go#L10) [¶](#SelectColor "Go to SelectColor") added in v0.2.2

```
func SelectColor(options ...Option) (color.Color, error)
```

SelectColor displays the color selection dialog.

Valid options: Title, WindowIcon, Attach, Modal, Color, ShowPalette.

May return: ErrCanceled.

Example [¶](#example-SelectColor "Go to Example")

```
package main

import (
	"image/color"

	"github.com/ncruces/zenity"
)

func main() {
	zenity.SelectColor(
		zenity.Color(color.NRGBA{R: 0x66, G: 0x33, B: 0x99, A: 0x80}))
}
```

```
Output:

```

Share Format Run

Example (Palette) [¶](#example-SelectColor-Palette "Go to Example (Palette)")

```
package main

import (
	"image/color"

	"github.com/ncruces/zenity"
)

func main() {
	zenity.SelectColor(
		zenity.ShowPalette(),
		zenity.Color(color.NRGBA{R: 0x66, G: 0x33, B: 0x99, A: 0xff}))
}
```

```
Output:

```

Share Format Run

#### func [SelectFile](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L16) [¶](#SelectFile "Go to SelectFile")

```
func SelectFile(options ...Option) (string, error)
```

SelectFile displays the file selection dialog.

Valid options: Title, WindowIcon, Attach, Modal, Directory, Filename, ShowHidden, FileFilter(s).

May return: ErrCanceled.

Example [¶](#example-SelectFile "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

const defaultPath = ``

func main() {
	zenity.SelectFile(
		zenity.Filename(defaultPath),
		zenity.FileFilters{
			{"Go files", []string{"*.go"}, false},
			{"Web files", []string{"*.html", "*.js", "*.css"}, true},
			{"Image files", []string{"*.png", "*.gif", "*.ico", "*.jpg", "*.webp"}, true},
		})
}
```

```
Output:

```

Share Format Run

Example (Directory) [¶](#example-SelectFile-Directory "Go to Example (Directory)")

```
package main

import (
	"github.com/ncruces/zenity"
)

const defaultPath = ``

func main() {
	zenity.SelectFile(
		zenity.Filename(defaultPath),
		zenity.Directory())
}
```

```
Output:

```

Share Format Run

#### func [SelectFileMultiple](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L26) [¶](#SelectFileMultiple "Go to SelectFileMultiple") added in v0.8.8

```
func SelectFileMultiple(options ...Option) ([]string, error)
```

SelectFileMultiple displays the multiple file selection dialog.

Valid options: Title, WindowIcon, Attach, Modal, Directory, Filename, ShowHidden, FileFilter(s).

May return: ErrCanceled, ErrUnsupported.

Example [¶](#example-SelectFileMultiple "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

const defaultPath = ``

func main() {
	zenity.SelectFileMultiple(
		zenity.Filename(defaultPath),
		zenity.FileFilters{
			{"Go files", []string{"*.go"}, false},
			{"Web files", []string{"*.html", "*.js", "*.css"}, true},
			{"Image files", []string{"*.png", "*.gif", "*.ico", "*.jpg", "*.webp"}, true},
		})
}
```

```
Output:

```

Share Format Run

Example (Directory) [¶](#example-SelectFileMultiple-Directory "Go to Example (Directory)")

```
package main

import (
	"github.com/ncruces/zenity"
)

const defaultPath = ``

func main() {
	zenity.SelectFileMultiple(
		zenity.Filename(defaultPath),
		zenity.Directory())
}
```

```
Output:

```

Share Format Run

#### func [SelectFileSave](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L36) [¶](#SelectFileSave "Go to SelectFileSave")

```
func SelectFileSave(options ...Option) (string, error)
```

SelectFileSave displays the save file selection dialog.

Valid options: Title, WindowIcon, Attach, Modal, Filename, ConfirmOverwrite, ConfirmCreate, ShowHidden, FileFilter(s).

May return: ErrCanceled.

Example [¶](#example-SelectFileSave "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

const defaultName = ``

func main() {
	zenity.SelectFileSave(
		zenity.ConfirmOverwrite(),
		zenity.Filename(defaultName),
		zenity.FileFilters{
			{"Go files", []string{"*.go"}, false},
			{"Web files", []string{"*.html", "*.js", "*.css"}, true},
			{"Image files", []string{"*.png", "*.gif", "*.ico", "*.jpg", "*.webp"}, true},
		})
}
```

```
Output:

```

Share Format Run

#### func [Warning](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go#L29) [¶](#Warning "Go to Warning")

```
func Warning(text string, options ...Option) error
```

Warning displays the warning dialog.

Valid options: Title, Width, Height, OKLabel, ExtraButton, Icon, WindowIcon, Attach, Modal, NoWrap, Ellipsize.

May return: ErrCanceled, ErrExtraButton.

Example [¶](#example-Warning "Go to Example")

```
package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	zenity.Warning("Are you sure you want to proceed?",
		zenity.Title("Warning"),
		zenity.WarningIcon)
}
```

```
Output:

```

Share Format Run

### Types [¶](#pkg-types "Go to Types")

#### type [DialogIcon](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L153) [¶](#DialogIcon "Go to DialogIcon") added in v0.4.0

```
type DialogIcon int
```

DialogIcon is an Option that sets the dialog icon.

```
const (
	ErrorIcon DialogIcon = iota
	WarningIcon
	InfoIcon
	QuestionIcon
	PasswordIcon
	NoIcon
)
```

The stock dialog icons.

#### type [FileFilter](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L81) [¶](#FileFilter "Go to FileFilter")

```
type FileFilter struct {
	Name     string   // display string that describes the filter (optional)
	Patterns []string // filter patterns for the display string
	CaseFold bool     // if set patterns are matched case-insensitively
}
```

FileFilter is an Option that sets a filename filter.

On Windows and macOS filtering is always case-insensitive.

macOS hides filename filters from the user, and only supports filtering by extension (or "uniform type identifiers").

Patterns may use the fnmatch syntax on all platforms: [https://docs.python.org/3/library/fnmatch.html](https://docs.python.org/3/library/fnmatch.html)

#### type [FileFilters](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L92) [¶](#FileFilters "Go to FileFilters")

```
type FileFilters []FileFilter
```

FileFilters is an Option that sets multiple filename filters.

#### type [Option](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L98) [¶](#Option "Go to Option")

```
type Option interface {
	// contains filtered or unexported methods
}
```

An Option is an argument passed to dialog functions to customize their behavior.

#### func [Attach](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L202) [¶](#Attach "Go to Attach") added in v0.8.8

```
func Attach(id any) Option
```

Attach returns an Option to set the parent window to attach to.

Attach accepts:

- a window id (int) on Unix
- a window handle (~uintptr) on Windows
- an application name (string) or process id (int) on macOS

#### func [AutoClose](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L51) [¶](#AutoClose "Go to AutoClose") added in v0.10.10

```
func AutoClose() Option
```

AutoClose returns an Option to dismiss the dialog when 100% has been reached.

#### func [CancelLabel](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L138) [¶](#CancelLabel "Go to CancelLabel")

```
func CancelLabel(cancel string) Option
```

CancelLabel returns an Option to set the label of the Cancel button.

#### func [CheckList](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L38) [¶](#CheckList "Go to CheckList") added in v0.9.0

```
func CheckList() Option
```

CheckList returns an Option to show check boxes (Unix only).

#### func [ClassHint](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L218) [¶](#ClassHint "Go to ClassHint") added in v0.10.5

```
func ClassHint(name, class string) Option
```

ClassHint returns an Option to set the program name and class as used by the window manager (Unix only).

#### func [Color](https://github.com/ncruces/zenity/blob/v0.10.14/color.go#L15) [¶](#Color "Go to Color") added in v0.2.2

```
func Color(c color.Color) Option
```

Color returns an Option to set the color.

#### func [ConfirmCreate](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L53) [¶](#ConfirmCreate "Go to ConfirmCreate") added in v0.2.0

```
func ConfirmCreate() Option
```

ConfirmCreate returns an Option to confirm file selection if the file does not yet exist (Windows only).

#### func [ConfirmOverwrite](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L47) [¶](#ConfirmOverwrite "Go to ConfirmOverwrite")

```
func ConfirmOverwrite() Option
```

ConfirmOverwrite returns an Option to confirm file selection if the file already exists.

#### func [Context](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L232) [¶](#Context "Go to Context") added in v0.4.2

```
func Context(ctx context.Context) Option
```

Context returns an Option to set a Context that can dismiss the dialog.

Dialogs dismissed by ctx return ctx.Err().

#### func [DefaultCancel](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L148) [¶](#DefaultCancel "Go to DefaultCancel")

```
func DefaultCancel() Option
```

DefaultCancel returns an Option to give the Cancel button focus by default.

#### func [DefaultDate](https://github.com/ncruces/zenity/blob/v0.10.14/date.go#L16) [¶](#DefaultDate "Go to DefaultDate") added in v0.8.0

```
func DefaultDate(year int, month time.Month, day int) Option
```

DefaultDate returns an Option to set the date.

#### func [DefaultItems](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L62) [¶](#DefaultItems "Go to DefaultItems") added in v0.6.2

```
func DefaultItems(items ...string) Option
```

DefaultItems returns an Option to set the items to initially select (Windows and macOS only).

#### func [Directory](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L41) [¶](#Directory "Go to Directory")

```
func Directory() Option
```

Directory returns an Option to activate directory-only selection.

#### func [DisallowEmpty](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L67) [¶](#DisallowEmpty "Go to DisallowEmpty") added in v0.6.2

```
func DisallowEmpty() Option
```

DisallowEmpty returns an Option to not allow zero items to be selected (Windows and macOS only).

#### func [Display](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L212) [¶](#Display "Go to Display") added in v0.10.5

```
func Display(display string) Option
```

Display returns an Option to set the X display to use (Unix only).

#### func [Ellipsize](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go#L58) [¶](#Ellipsize "Go to Ellipsize")

```
func Ellipsize() Option
```

Ellipsize returns an Option to enable ellipsizing in the dialog text (Unix only).

#### func [EntryText](https://github.com/ncruces/zenity/blob/v0.10.14/entry.go#L14) [¶](#EntryText "Go to EntryText") added in v0.6.0

```
func EntryText(text string) Option
```

EntryText returns an Option to set the entry text.

#### func [ExtraButton](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L143) [¶](#ExtraButton "Go to ExtraButton")

```
func ExtraButton(extra string) Option
```

ExtraButton returns an Option to add one extra button.

#### func [Filename](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L67) [¶](#Filename "Go to Filename")

```
func Filename(filename string) Option
```

Filename returns an Option to set the filename.

You can specify a file name, a directory path, or both. Specifying a file name, makes it the default selected file. Specifying a directory path, makes it the default dialog location.

#### func [Height](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L126) [¶](#Height "Go to Height") added in v0.5.3

```
func Height(height uint) Option
```

Height returns an Option to set the dialog height (Unix only).

#### func [HideText](https://github.com/ncruces/zenity/blob/v0.10.14/entry.go#L19) [¶](#HideText "Go to HideText") added in v0.6.0

```
func HideText() Option
```

HideText returns an Option to hide the entry text.

#### func [Icon](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L174) [¶](#Icon "Go to Icon")

```
func Icon(icon any) Option
```

Icon returns an Option to set the dialog icon.

Icon accepts a DialogIcon, or a string. The string can be a GTK icon name (Unix), or a file path (Windows and macOS). Supported file formats depend on the plaftorm, but PNG should be cross-platform.

#### func [MaxValue](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L36) [¶](#MaxValue "Go to MaxValue") added in v0.7.0

```
func MaxValue(value int) Option
```

MaxValue returns an Option to set the maximum value. The default maximum value is 100.

#### func [MidSearch](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L57) [¶](#MidSearch "Go to MidSearch") added in v0.10.5

```
func MidSearch() Option
```

MidSearch returns an Option to change list search to find text in the middle, not on the beginning (Unix only).

#### func [Modal](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L207) [¶](#Modal "Go to Modal") added in v0.8.8

```
func Modal() Option
```

Modal returns an Option to set the modal hint.

#### func [NoCancel](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L46) [¶](#NoCancel "Go to NoCancel") added in v0.7.0

```
func NoCancel() Option
```

NoCancel returns an Option to hide the Cancel button (Windows and Unix only).

#### func [NoWrap](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go#L53) [¶](#NoWrap "Go to NoWrap")

```
func NoWrap() Option
```

NoWrap returns an Option to disable text wrapping (Unix only).

#### func [OKLabel](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L133) [¶](#OKLabel "Go to OKLabel")

```
func OKLabel(ok string) Option
```

OKLabel returns an Option to set the label of the OK button.

#### func [Pulsate](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L41) [¶](#Pulsate "Go to Pulsate") added in v0.7.0

```
func Pulsate() Option
```

Pulsate returns an Option to pulsate the progress bar.

#### func [RadioList](https://github.com/ncruces/zenity/blob/v0.10.14/list.go#L43) [¶](#RadioList "Go to RadioList") added in v0.9.0

```
func RadioList() Option
```

RadioList returns an Option to show radio boxes (Unix only).

#### func [ShowHidden](https://github.com/ncruces/zenity/blob/v0.10.14/file.go#L58) [¶](#ShowHidden "Go to ShowHidden") added in v0.2.0

```
func ShowHidden() Option
```

ShowHidden returns an Option to show hidden files (Windows and macOS only).

#### func [ShowPalette](https://github.com/ncruces/zenity/blob/v0.10.14/color.go#L20) [¶](#ShowPalette "Go to ShowPalette") added in v0.2.2

```
func ShowPalette() Option
```

ShowPalette returns an Option to show the palette.

#### func [TimeRemaining](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L56) [¶](#TimeRemaining "Go to TimeRemaining") added in v0.7.0

```
func TimeRemaining() Option
```

TimeRemaining returns an Option to estimate when progress will reach 100% (Unix only).

#### func [Title](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L114) [¶](#Title "Go to Title")

```
func Title(title string) Option
```

Title returns an Option to set the dialog title.

#### func [Username](https://github.com/ncruces/zenity/blob/v0.10.14/pwd.go#L14) [¶](#Username "Go to Username") added in v0.6.0

```
func Username() Option
```

Username returns an Option to display the username.

#### func [Width](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L119) [¶](#Width "Go to Width") added in v0.5.3

```
func Width(width uint) Option
```

Width returns an Option to set the dialog width (Unix only).

#### func [WindowIcon](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go#L187) [¶](#WindowIcon "Go to WindowIcon") added in v0.8.8

```
func WindowIcon(icon any) Option
```

WindowIcon returns an Option to set the window icon.

WindowIcon accepts a DialogIcon, or a string file path. Supported file formats depend on the plaftorm, but PNG should be cross-platform.

#### type [ProgressDialog](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L14) [¶](#ProgressDialog "Go to ProgressDialog") added in v0.7.0

```
type ProgressDialog interface {
	// Text sets the dialog text.
	Text(string) error

	// Value sets how much of the task has been completed.
	Value(int) error

	// MaxValue gets how much work the task requires in total.
	MaxValue() int

	// Complete marks the task completed.
	Complete() error

	// Close closes the dialog.
	Close() error

	// Done returns a channel that is closed when the dialog is closed.
	Done() <-chan struct{}
}
```

ProgressDialog allows you to interact with the progress indication dialog.

#### func [Progress](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go#L9) [¶](#Progress "Go to Progress") added in v0.7.0

```
func Progress(options ...Option) (ProgressDialog, error)
```

Progress displays the progress indication dialog.

Valid options: Title, Width, Height, OKLabel, CancelLabel, ExtraButton, Icon, WindowIcon, Attach, Modal, MaxValue, Pulsate, NoCancel, TimeRemaining.

May return: ErrUnsupported.

Example [¶](#example-Progress "Go to Example")

```
package main

import (
	"time"

	"github.com/ncruces/zenity"
)

func main() {
	dlg, err := zenity.Progress(
		zenity.Title("Update System Logs"))
	if err != nil {
		return
	}
	defer dlg.Close()

	dlg.Text("Scanning mail logs...")
	dlg.Value(0)
	time.Sleep(time.Second)

	dlg.Value(25)
	time.Sleep(time.Second)

	dlg.Text("Updating mail logs...")
	dlg.Value(50)
	time.Sleep(time.Second)

	dlg.Text("Resetting cron jobs...")
	dlg.Value(75)
	time.Sleep(time.Second)

	dlg.Text("Rebooting system...")
	dlg.Value(100)
	time.Sleep(time.Second)

	dlg.Complete()
	time.Sleep(time.Second)
}
```

```
Output:

```

Share Format Run

Example (Pulsate) [¶](#example-Progress-Pulsate "Go to Example (Pulsate)")

```
package main

import (
	"time"

	"github.com/ncruces/zenity"
)

func main() {
	dlg, err := zenity.Progress(
		zenity.Title("Update System Logs"),
		zenity.Pulsate())
	if err != nil {
		return
	}
	defer dlg.Close()

	dlg.Text("Scanning mail logs...")
	time.Sleep(time.Second)

	dlg.Text("Updating mail logs...")
	time.Sleep(time.Second)

	dlg.Text("Resetting cron jobs...")
	time.Sleep(time.Second)

	dlg.Text("Rebooting system...")
	time.Sleep(time.Second)

	dlg.Complete()
	time.Sleep(time.Second)
}
```

```
Output:

```

Share Format Run

## ![](/static/shared/icon/insert_drive_file_gm_grey_24dp.svg) Source Files [¶](#section-sourcefiles "Go to Source Files")

[View all Source files](https://github.com/ncruces/zenity/tree/v0.10.14)

- [color.go](https://github.com/ncruces/zenity/blob/v0.10.14/color.go "color.go")
- [color\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/color_unix.go "color_unix.go")
- [date.go](https://github.com/ncruces/zenity/blob/v0.10.14/date.go "date.go")
- [date\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/date_unix.go "date_unix.go")
- [entry.go](https://github.com/ncruces/zenity/blob/v0.10.14/entry.go "entry.go")
- [entry\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/entry_unix.go "entry_unix.go")
- [file.go](https://github.com/ncruces/zenity/blob/v0.10.14/file.go "file.go")
- [file\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/file_unix.go "file_unix.go")
- [list.go](https://github.com/ncruces/zenity/blob/v0.10.14/list.go "list.go")
- [list\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/list_unix.go "list_unix.go")
- [msg.go](https://github.com/ncruces/zenity/blob/v0.10.14/msg.go "msg.go")
- [msg\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/msg_unix.go "msg_unix.go")
- [notify.go](https://github.com/ncruces/zenity/blob/v0.10.14/notify.go "notify.go")
- [notify\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/notify_unix.go "notify_unix.go")
- [progress.go](https://github.com/ncruces/zenity/blob/v0.10.14/progress.go "progress.go")
- [progress\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/progress_unix.go "progress_unix.go")
- [pwd.go](https://github.com/ncruces/zenity/blob/v0.10.14/pwd.go "pwd.go")
- [pwd\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/pwd_unix.go "pwd_unix.go")
- [util.go](https://github.com/ncruces/zenity/blob/v0.10.14/util.go "util.go")
- [zenity.go](https://github.com/ncruces/zenity/blob/v0.10.14/zenity.go "zenity.go")
- [zenity\_unix.go](https://github.com/ncruces/zenity/blob/v0.10.14/zenity_unix.go "zenity_unix.go")

## ![](/static/shared/icon/folder_gm_grey_24dp.svg) Directories [¶](#section-directories "Go to Directories")

Show internal Expand all

Path Synopsis

![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) cmd

[zenity](/github.com/ncruces/zenity@v0.10.14/cmd/zenity)

![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) internal

[win](/github.com/ncruces/zenity@v0.10.14/internal/win)

Package win is internal.

Package win is internal.

[zencmd](/github.com/ncruces/zenity@v0.10.14/internal/zencmd)

Package zencmd is internal.

Package zencmd is internal.

[zenutil](/github.com/ncruces/zenity@v0.10.14/internal/zenutil)

Package zenutil is internal.

Package zenutil is internal.

Click to show internal directories.

Click to hide internal directories.

[Why Go](https://go.dev/solutions) [Use Cases](https://go.dev/solutions#use-cases) [Case Studies](https://go.dev/solutions#case-studies)

[Get Started](https://learn.go.dev/) [Playground](https://play.golang.org) [Tour](https://tour.golang.org) [Stack Overflow](https://stackoverflow.com/questions/tagged/go?tab=Newest) [Help](https://go.dev/help)

[Packages](https://pkg.go.dev) [Standard Library](/std) [Sub-repositories](/golang.org/x) [About Go Packages](https://pkg.go.dev/about)

[About](https://go.dev/project) [Download](https://go.dev/dl/) [Blog](https://go.dev/blog) [Issue Tracker](https://github.com/golang/go/issues) [Release Notes](https://go.dev/doc/devel/release.html) [Brand Guidelines](https://blog.golang.org/go-brand) [Code of Conduct](https://go.dev/conduct)

[Connect](https://www.twitter.com/golang) [Twitter](https://www.twitter.com/golang) [GitHub](https://github.com/golang) [Slack](https://invite.slack.golangbridge.org/) [r/golang](https://reddit.com/r/golang) [Meetup](https://www.meetup.com/pro/go) [Golang Weekly](https://golangweekly.com/)

![Gopher in flight goggles](/static/shared/gopher/pilot-bust-1431x901.svg)

- [Copyright](https://go.dev/copyright)
- [Terms of Service](https://go.dev/tos)
- [Privacy Policy](http://www.google.com/intl/en/policies/privacy/)
- [Report an Issue](https://go.dev/s/pkgsite-feedback)
- ![System theme](/static/shared/icon/brightness_6_gm_grey_24dp.svg) ![Dark theme](/static/shared/icon/brightness_2_gm_grey_24dp.svg) ![Light theme](/static/shared/icon/light_mode_gm_grey_24dp.svg)

  Theme Toggle
- ![](/static/shared/icon/keyboard_grey_24dp.svg)

  Shortcuts Modal

[![Google logo](/static/shared/logo/google-white.svg)](https://google.com)

## Jump to

![](/static/shared/icon/close_gm_grey_24dp.svg)

Close

## Keyboard shortcuts

![](/static/shared/icon/close_gm_grey_24dp.svg)

| **?**          | : This menu     |
|----------------|-----------------|
| **/**          | : Search site   |
| **f** or **F** | : Jump to       |
| **y** or **Y** | : Canonical URL |

Close

go.dev uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic. [Learn more.](https://policies.google.com/technologies/cookies)

Okay
