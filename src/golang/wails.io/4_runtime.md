[Skip to main content](browser.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/browser) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Browser

Version: Next Version 🚧

On this page

# Browser

These methods are related to the system browser.

### BrowserOpenURL[​](browser.html#browseropenurl "Direct link to heading")

Opens the given URL in the system browser.

Go: `BrowserOpenURL(ctx context.Context, url string)`  
JS: `BrowserOpenURL(url string)`

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/browser.mdx)

[Previous  
\
Menu](menu.html)

[Next  
\
Clipboard](clipboard.html)

Clipboard | Wails

[Skip to main content](clipboard.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/clipboard) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Clipboard

Version: Next Version 🚧

On this page

# Clipboard

This part of the runtime provides access to the operating system's clipboard.  
The current implementation only handles text.

### ClipboardGetText[​](clipboard.html#clipboardgettext "Direct link to heading")

This method reads the currently stored text from the clipboard.

Go: `ClipboardGetText(ctx context.Context) (string, error)`  
Returns: a string (if the clipboard is empty an empty string will be returned) or an error.

JS: `ClipboardGetText(): Promise<string>`  
Returns: a promise with a string result (if the clipboard is empty an empty string will be returned).

### ClipboardSetText[​](clipboard.html#clipboardsettext "Direct link to heading")

This method writes a text to the clipboard.

Go: `ClipboardSetText(ctx context.Context, text string) error`  
Returns: an error if there is any.

JS: `ClipboardSetText(text: string): Promise<boolean>`  
Returns: a promise with true result if the text was successfully set on the clipboard, false otherwise.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/clipboard.mdx)

[Previous  
\
Browser](browser.html)

[Next  
\
Screen](screen.html)

Dialog | Wails

[Skip to main content](dialog.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/dialog) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Dialog

Version: Next Version 🚧

On this page

# Dialog

This part of the runtime provides access to native dialogs, such as File Selectors and Message boxes.

JavaScript

Dialog is currently unsupported in the JS runtime.

### OpenDirectoryDialog[​](dialog.html#opendirectorydialog "Direct link to heading")

Opens a dialog that prompts the user to select a directory. Can be customised using [OpenDialogOptions](dialog.html#opendialogoptions).

Go: `OpenDirectoryDialog(ctx context.Context, dialogOptions OpenDialogOptions) (string, error)`

Returns: Selected directory (blank if the user cancelled) or an error

### OpenFileDialog[​](dialog.html#openfiledialog "Direct link to heading")

Opens a dialog that prompts the user to select a file. Can be customised using [OpenDialogOptions](dialog.html#opendialogoptions).

Go: `OpenFileDialog(ctx context.Context, dialogOptions OpenDialogOptions) (string, error)`

Returns: Selected file (blank if the user cancelled) or an error

### OpenMultipleFilesDialog[​](dialog.html#openmultiplefilesdialog "Direct link to heading")

Opens a dialog that prompts the user to select multiple files. Can be customised using [OpenDialogOptions](dialog.html#opendialogoptions).

Go: `OpenMultipleFilesDialog(ctx context.Context, dialogOptions OpenDialogOptions) ([]string, error)`

Returns: Selected files (nil if the user cancelled) or an error

### SaveFileDialog[​](dialog.html#savefiledialog "Direct link to heading")

Opens a dialog that prompts the user to select a filename for the purposes of saving. Can be customised using [SaveDialogOptions](dialog.html#savedialogoptions).

Go: `SaveFileDialog(ctx context.Context, dialogOptions SaveDialogOptions) (string, error)`

Returns: The selected file (blank if the user cancelled) or an error

### MessageDialog[​](dialog.html#messagedialog "Direct link to heading")

Displays a message using a message dialog. Can be customised using [MessageDialogOptions](dialog.html#messagedialogoptions).

Go: `MessageDialog(ctx context.Context, dialogOptions MessageDialogOptions) (string, error)`

Returns: The text of the selected button or an error

## Options[​](dialog.html#options "Direct link to heading")

### OpenDialogOptions[​](dialog.html#opendialogoptions "Direct link to heading")

```go
type OpenDialogOptions struct {
    DefaultDirectory           string
    DefaultFilename            string
    Title                      string
    Filters                    []FileFilter
    ShowHiddenFiles            bool
    CanCreateDirectories       bool
    ResolvesAliases            bool
    TreatPackagesAsDirectories bool
}
```

| Field                             | Description                                    | Win | Mac | Lin |
|-----------------------------------|------------------------------------------------|-----|-----|-----|
| DefaultDirectory                  | The directory the dialog will show when opened | ✅   | ✅   | ✅   |
| DefaultFilename                   | The default filename                           | ✅   | ✅   | ✅   |
| Title                             | Title for the dialog                           | ✅   | ✅   | ✅   |
| [Filters](dialog.html#filefilter) | A list of file filters                         | ✅   | ✅   | ✅   |
| ShowHiddenFiles                   | Show files hidden by the system                |     | ✅   | ✅   |
| CanCreateDirectories              | Allow user to create directories               |     | ✅   |     |
| ResolvesAliases                   | If true, returns the file not the alias        |     | ✅   |     |
| TreatPackagesAsDirectories        | Allow navigating into packages                 |     | ✅   |     |

### SaveDialogOptions[​](dialog.html#savedialogoptions "Direct link to heading")

```go
type SaveDialogOptions struct {
    DefaultDirectory           string
    DefaultFilename            string
    Title                      string
    Filters                    []FileFilter
    ShowHiddenFiles            bool
    CanCreateDirectories       bool
    TreatPackagesAsDirectories bool
}
```

| Field                             | Description                                    | Win | Mac | Lin |
|-----------------------------------|------------------------------------------------|-----|-----|-----|
| DefaultDirectory                  | The directory the dialog will show when opened | ✅   | ✅   | ✅   |
| DefaultFilename                   | The default filename                           | ✅   | ✅   | ✅   |
| Title                             | Title for the dialog                           | ✅   | ✅   | ✅   |
| [Filters](dialog.html#filefilter) | A list of file filters                         | ✅   | ✅   | ✅   |
| ShowHiddenFiles                   | Show files hidden by the system                |     | ✅   | ✅   |
| CanCreateDirectories              | Allow user to create directories               |     | ✅   |     |
| TreatPackagesAsDirectories        | Allow navigating into packages                 |     | ✅   |     |

### MessageDialogOptions[​](dialog.html#messagedialogoptions "Direct link to heading")

```go
type MessageDialogOptions struct {
    Type          DialogType
    Title         string
    Message       string
    Buttons       []string
    DefaultButton string
    CancelButton  string
}
```

| Field         | Description                                                                | Win                        | Mac | Lin |
|---------------|----------------------------------------------------------------------------|----------------------------|-----|-----|
| Type          | The type of message dialog, eg question, info...                           | ✅                          | ✅   | ✅   |
| Title         | Title for the dialog                                                       | ✅                          | ✅   | ✅   |
| Message       | The message to show the user                                               | ✅                          | ✅   | ✅   |
| Buttons       | A list of button titles                                                    |                            | ✅   |     |
| DefaultButton | The button with this text should be treated as default. Bound to `return`. | ✅[\*](dialog.html#windows) | ✅   |     |
| CancelButton  | The button with this text should be treated as cancel. Bound to `escape`   |                            | ✅   |     |

#### Windows[​](dialog.html#windows "Direct link to heading")

Windows has standard dialog types in which the buttons are not customisable. The value returned will be one of: "Ok", "Cancel", "Abort", "Retry", "Ignore", "Yes", "No", "Try Again" or "Continue".

For Question dialogs, the default button is "Yes" and the cancel button is "No". This can be changed by setting the `DefaultButton` value to `"No"`.

Example:

```go
    result, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:          runtime.QuestionDialog,
        Title:         "Question",
        Message:       "Do you want to continue?",
        DefaultButton: "No",
    })
```

#### Linux[​](dialog.html#linux "Direct link to heading")

Linux has standard dialog types in which the buttons are not customisable. The value returned will be one of: "Ok", "Cancel", "Yes", "No"

#### Mac[​](dialog.html#mac "Direct link to heading")

A message dialog on Mac may specify up to 4 buttons. If no `DefaultButton` or `CancelButton` is given, the first button is considered default and is bound to the `return` key.

For the following code:

```go
selection, err := runtime.MessageDialog(b.ctx, runtime.MessageDialogOptions{
    Title:        "It's your turn!",
    Message:      "Select a number",
    Buttons:      []string{"one", "two", "three", "four"},
})
```

the first button is shown as default:

![](../../../../assets/images/dialog_no_defaults-368f7530f9168bf1a03ed3cf86a5ab91.png)

And if we specify `DefaultButton` to be "two":

```go
selection, err := runtime.MessageDialog(b.ctx, runtime.MessageDialogOptions{
    Title:         "It's your turn!",
    Message:       "Select a number",
    Buttons:       []string{"one", "two", "three", "four"},
    DefaultButton: "two",
})
```

the second button is shown as default. When `return` is pressed, the value "two" is returned.

![](../../../../assets/images/dialog_default_button-7e0c56f09a56a2276f1ea3cef296ca14.png)

If we now specify `CancelButton` to be "three":

```go
selection, err := runtime.MessageDialog(b.ctx, runtime.MessageDialogOptions{
    Title:         "It's your turn!",
    Message:       "Select a number",
    Buttons:       []string{"one", "two", "three", "four"},
    DefaultButton: "two",
    CancelButton:  "three",
})
```

the button with "three" is shown at the bottom of the dialog. When `escape` is pressed, the value "three" is returned:

![](../../../../assets/images/dialog_default_cancel-686e68edc9bf0cb4bc588a81cac4f07a.png)

#### DialogType[​](dialog.html#dialogtype "Direct link to heading")

```go
const (
        InfoDialog     DialogType = "info"
        WarningDialog  DialogType = "warning"
        ErrorDialog    DialogType = "error"
        QuestionDialog DialogType = "question"
     )
```

### FileFilter[​](dialog.html#filefilter "Direct link to heading")

```go
type FileFilter struct {
    DisplayName string // Filter information EG: "Image Files (*.jpg, *.png)"
    Pattern     string // semi-colon separated list of extensions, EG: "*.jpg;*.png"
}
```

#### Windows[​](dialog.html#windows-1 "Direct link to heading")

Windows allows you to use multiple file filters in dialog boxes. Each FileFilter will show up as a separate entry in the dialog:

![](../../../../assets/images/dialog_win_filters-da31e50fbf1773807fa3942279ce099e.png)

#### Linux[​](dialog.html#linux-1 "Direct link to heading")

Linux allows you to use multiple file filters in dialog boxes. Each FileFilter will show up as a separate entry in the dialog:

![](../../../../assets/images/dialog_lin_filters-ed71f1e1636fb0234b91335696b12d09.png)

#### Mac[​](dialog.html#mac-1 "Direct link to heading")

Mac dialogs only have the concept of a single set of patterns to filter files. If multiple FileFilters are provided, Wails will use all the Patterns defined.

Example:

```go
    selection, err := runtime.OpenFileDialog(b.ctx, runtime.OpenDialogOptions{
        Title: "Select File",
        Filters: []runtime.FileFilter{
            {
                DisplayName: "Images (*.png;*.jpg)",
                Pattern:     "*.png;*.jpg",
            }, {
                DisplayName: "Videos (*.mov;*.mp4)",
                Pattern:     "*.mov;*.mp4",
            },
        },
    })
```

This will result in the Open File dialog using `*.png,*.jpg,*.mov,*.mp4` as a filter.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/dialog.mdx)

[Previous  
\
Window](window.html)

[Next  
\
Menu](menu.html)

Drag And Drop | Wails

[Skip to main content](draganddrop.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/draganddrop) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Drag And Drop

Version: Next Version 🚧

On this page

# Drag And Drop

:::

This part of the runtime handles dragging and dropping files and or folders in to the window.

To enable this functionality you have to set [EnableFileDrop](../options.html#enablefiledrop) to `true` in [Application Options](../options.html#drag-and-drop).

### OnFileDrop[​](draganddrop.html#onfiledrop "Direct link to heading")

This method handles the drop event on the window.

Go: `OnFileDrop(ctx context.Context, callback func(x, y int, paths []string))`  
Calls the callback function with the coordinates inside the window where the drag was released and a slice of absolute file paths.

JS: `OnFileDrop(callback: (x: number, y: number, paths: string[]) => void, useDropTarget: boolean) :void`  
Calls the callback function with the coordinates inside the window where the drag was released and a slice of absolute file paths.

When the `useDropTarget` is `true` in addition to calling the callback when the drop happens, it registers event listeners on the window that are listening for the drag coordinates and checks if the mouse is over an element that has the [CSSDropProperty](../options.html#cssdropproperty) style. If the element has the required property it adds the `wails-drop-target-active` class to the element's class list and removes it when the mouse moves off of it.

### OnFileDropOff[​](draganddrop.html#onfiledropoff "Direct link to heading")

This method removes all registered listeners and handlers for drag and drop events.

Go: `OnFileDropOff(ctx context.Context)`  
Returns: has no return value.

JS: `OnFileDropOff(): void`  
Returns: has no return value.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/draganddrop.mdx)

[Previous  
\
Screen](screen.html)

[Next  
\
CLI](../cli.html)

Events | Wails

[Skip to main content](events.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/events) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Events

Version: Next Version 🚧

On this page

# Events

The Wails runtime provides a unified events system, where events can be emitted or received by either Go or JavaScript. Optionally, data may be passed with the events. Listeners will receive the data in the local data types.

### EventsOn[​](events.html#eventson "Direct link to heading")

This method sets up a listener for the given event name. When an event of type `eventName` is [emitted](events.html#EventsEmit), the callback is triggered. Any additional data sent with the emitted event will be passed to the callback. It returns a function to cancel the listener.

Go: `EventsOn(ctx context.Context, eventName string, callback func(optionalData ...interface{})) func()`  
JS: `EventsOn(eventName string, callback function(optionalData?: any)): () => void`

### EventsOff[​](events.html#eventsoff "Direct link to heading")

This method unregisters the listener for the given event name, optionally multiple listeners can be unregistered via `additionalEventNames`.

Go: `EventsOff(ctx context.Context, eventName string, additionalEventNames ...string)`  
JS: `EventsOff(eventName string, ...additionalEventNames)`

### EventsOnce[​](events.html#eventsonce "Direct link to heading")

This method sets up a listener for the given event name, but will only trigger once. It returns a function to cancel the listener.

Go: `EventsOnce(ctx context.Context, eventName string, callback func(optionalData ...interface{})) func()`  
JS: `EventsOnce(eventName string, callback function(optionalData?: any)): () => void`

### EventsOnMultiple[​](events.html#eventsonmultiple "Direct link to heading")

This method sets up a listener for the given event name, but will only trigger a maximum of `counter` times. It returns a function to cancel the listener.

Go: `EventsOnMultiple(ctx context.Context, eventName string, callback func(optionalData ...interface{}), counter int) func()`  
JS: `EventsOnMultiple(eventName string, callback function(optionalData?: any), counter int): () => void`

### EventsEmit[​](events.html#eventsemit "Direct link to heading")

This method emits the given event. Optional data may be passed with the event. This will trigger any event listeners.

Go: `EventsEmit(ctx context.Context, eventName string, optionalData ...interface{})`  
JS: `EventsEmit(eventName: string, ...optionalData: any)`

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/events.mdx)

[Previous  
\
Introduction](intro.html)

[Next  
\
Log](log.html)

Introduction | Wails

[Skip to main content](intro.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/intro) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Introduction

Version: Next Version 🚧

On this page

# Introduction

The runtime is a library that provides utility methods for your application. There is both a Go and JavaScript runtime and the aim is to try and keep them at parity where possible.

It has utility methods for:

- [Window](window.html)
- [Menu](menu.html)
- [Dialog](dialog.html)
- [Events](events.html)
- [Browser](browser.html)
- [Log](log.html)
- [Clipboard](clipboard.html)

The Go Runtime is available through importing `github.com/wailsapp/wails/v2/pkg/runtime`. All methods in this package take a context as the first parameter. This context should be obtained from the [OnStartup](../options.html#onstartup) or [OnDomReady](../options.html#ondomready) hooks.

Note

Whilst the context will be provided to the [OnStartup](../options.html#onstartup) method, there's no guarantee the runtime will work in this method as the window is initialising in a different thread. If you wish to call runtime methods at startup, use [OnDomReady](../options.html#ondomready).

The JavaScript library is available to the frontend via the `window.runtime` map. There is a runtime package generated when using `dev` mode that provides TypeScript declarations for the runtime. This should be located in the `wailsjs` directory in your frontend directory.

### Hide[​](intro.html#hide "Direct link to heading")

Go: `Hide(ctx context.Context)`  
JS: `Hide()`

Hides the application.

Note

On Mac, this will hide the application in the same way as the `Hide` menu item in standard Mac applications. This is different to hiding the window, but the application still being in the foreground. For Windows and Linux, this is currently the same as `WindowHide`.

### Show[​](intro.html#show "Direct link to heading")

Shows the application.

Note

On Mac, this will bring the application back into the foreground. For Windows and Linux, this is currently the same as `WindowShow`.

Go: `Show(ctx context.Context)`  
JS: `Show()`

### Quit[​](intro.html#quit "Direct link to heading")

Quits the application.

Go: `Quit(ctx context.Context)`  
JS: `Quit()`

### Environment[​](intro.html#environment "Direct link to heading")

Returns details of the current environment.

Go: `Environment(ctx context.Context) EnvironmentInfo`  
JS: `Environment(): Promise<EnvironmentInfo>`

#### EnvironmentInfo[​](intro.html#environmentinfo "Direct link to heading")

Go:

```go
type EnvironmentInfo struct {
    BuildType string
    Platform  string
    Arch      string
}
```

JS:

```ts
interface EnvironmentInfo {
  buildType: string;
  platform: string;
  arch: string;
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/intro.mdx)

[Previous  
\
How does it work?](../../howdoesitwork.html)

[Next  
\
Events](events.html)

Log | Wails

[Skip to main content](log.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/log) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Log

Version: Next Version 🚧

On this page

# Log

The Wails runtime provides a logging mechanism that may be called from Go or JavaScript. Like most loggers, there are a number of log levels:

- Trace
- Debug
- Info
- Warning
- Error
- Fatal

The logger will output any log message at the current, or higher, log level. Example: The `Debug` log level will output all messages except `Trace` messages.

### LogPrint[​](log.html#logprint "Direct link to heading")

Logs the given message as a raw message.

Go: `LogPrint(ctx context.Context, message string)`  
JS: `LogPrint(message: string)`

### LogPrintf[​](log.html#logprintf "Direct link to heading")

Logs the given message as a raw message.

Go: `LogPrintf(ctx context.Context, format string, args ...interface{})`

### LogTrace[​](log.html#logtrace "Direct link to heading")

Logs the given message at the `Trace` log level.

Go: `LogTrace(ctx context.Context, message string)`  
JS: `LogTrace(message: string)`

### LogTracef[​](log.html#logtracef "Direct link to heading")

Logs the given message at the `Trace` log level.

Go: `LogTracef(ctx context.Context, format string, args ...interface{})`

### LogDebug[​](log.html#logdebug "Direct link to heading")

Logs the given message at the `Debug` log level.

Go: `LogDebug(ctx context.Context, message string)`  
JS: `LogDebug(message: string)`

### LogDebugf[​](log.html#logdebugf "Direct link to heading")

Logs the given message at the `Debug` log level.

Go: `LogDebugf(ctx context.Context, format string, args ...interface{})`

### LogInfo[​](log.html#loginfo "Direct link to heading")

Logs the given message at the `Info` log level.

Go: `LogInfo(ctx context.Context, message string)`  
JS: `LogInfo(message: string)`

### LogInfof[​](log.html#loginfof "Direct link to heading")

Logs the given message at the `Info` log level.

Go: `LogInfof(ctx context.Context, format string, args ...interface{})`

### LogWarning[​](log.html#logwarning "Direct link to heading")

Logs the given message at the `Warning` log level.

Go: `LogWarning(ctx context.Context, message string)`  
JS: `LogWarning(message: string)`

### LogWarningf[​](log.html#logwarningf "Direct link to heading")

Logs the given message at the `Warning` log level.

Go: `LogWarningf(ctx context.Context, format string, args ...interface{})`

### LogError[​](log.html#logerror "Direct link to heading")

Logs the given message at the `Error` log level.

Go: `LogError(ctx context.Context, message string)`  
JS: `LogError(message: string)`

### LogErrorf[​](log.html#logerrorf "Direct link to heading")

Logs the given message at the `Error` log level.

Go: `LogErrorf(ctx context.Context, format string, args ...interface{})`

### LogFatal[​](log.html#logfatal "Direct link to heading")

Logs the given message at the `Fatal` log level.

Go: `LogFatal(ctx context.Context, message string)`  
JS: `LogFatal(message: string)`

### LogFatalf[​](log.html#logfatalf "Direct link to heading")

Logs the given message at the `Fatal` log level.

Go: `LogFatalf(ctx context.Context, format string, args ...interface{})`

### LogSetLogLevel[​](log.html#logsetloglevel "Direct link to heading")

Sets the log level. In JavaScript, the number relates to the following log levels:

| Value | Log Level |
|-------|-----------|
| 1     | Trace     |
| 2     | Debug     |
| 3     | Info      |
| 4     | Warning   |
| 5     | Error     |

Go: `LogSetLogLevel(ctx context.Context, level logger.LogLevel)`  
JS: `LogSetLogLevel(level: number)`

## Using a Custom Logger[​](log.html#using-a-custom-logger "Direct link to heading")

A custom logger may be used by providing it using the [Logger](../options.html#logger) application option. The only requirement is that the logger implements the `logger.Logger` interface defined in `github.com/wailsapp/wails/v2/pkg/logger`:

logger.go

```go
type Logger interface {
    Print(message string)
    Trace(message string)
    Debug(message string)
    Info(message string)
    Warning(message string)
    Error(message string)
    Fatal(message string)
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/log.mdx)

[Previous  
\
Events](events.html)

[Next  
\
Window](window.html)

Menu | Wails

[Skip to main content](menu.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/menu) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Menu

Version: Next Version 🚧

On this page

# Menu

These methods are related to the application menu.

JavaScript

Menu is currently unsupported in the JS runtime.

### MenuSetApplicationMenu[​](menu.html#menusetapplicationmenu "Direct link to heading")

Sets the application menu to the given [menu](../menus.html).

Go: `MenuSetApplicationMenu(ctx context.Context, menu *menu.Menu)`

### MenuUpdateApplicationMenu[​](menu.html#menuupdateapplicationmenu "Direct link to heading")

Updates the application menu, picking up any changes to the menu passed to `MenuSetApplicationMenu`.

Go: `MenuUpdateApplicationMenu(ctx context.Context)`

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/menu.mdx)

[Previous  
\
Dialog](dialog.html)

[Next  
\
Browser](browser.html)

Screen | Wails

[Skip to main content](screen.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/screen) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Screen

Version: Next Version 🚧

On this page

# Screen

These methods provide information about the currently connected screens.

### ScreenGetAll[​](screen.html#screengetall "Direct link to heading")

Returns a list of currently connected screens.

Go: `ScreenGetAll(ctx context.Context) []screen`  
JS: `ScreenGetAll()`

#### Screen[​](screen.html#screen-1 "Direct link to heading")

Go struct:

```go
type Screen struct {
    IsCurrent bool
    IsPrimary bool
    Width     int
    Height    int
}
```

Typescript interface:

```ts
interface Screen {
    isCurrent: boolean;
    isPrimary: boolean;
    width : number
    height : number
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/screen.mdx)

[Previous  
\
Clipboard](clipboard.html)

[Next  
\
Drag And Drop](draganddrop.html)

Window | Wails

[Skip to main content](window.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/runtime/window) (v2.10).

- [](https://wails.io/)
- Reference
- Runtime
- Window

Version: Next Version 🚧

On this page

# Window

These methods give control of the application window.

### WindowSetTitle[​](window.html#windowsettitle "Direct link to heading")

Sets the text in the window title bar.

Go: `WindowSetTitle(ctx context.Context, title string)`  
JS: `WindowSetTitle(title: string)`

### WindowFullscreen[​](window.html#windowfullscreen "Direct link to heading")

Makes the window full screen.

Go: `WindowFullscreen(ctx context.Context)`  
JS: `WindowFullscreen()`

### WindowUnfullscreen[​](window.html#windowunfullscreen "Direct link to heading")

Restores the previous window dimensions and position prior to full screen.

Go: `WindowUnfullscreen(ctx context.Context)`  
JS: `WindowUnfullscreen()`

### WindowIsFullscreen[​](window.html#windowisfullscreen "Direct link to heading")

Returns true if the window is full screen.

Go: `WindowIsFullscreen(ctx context.Context) bool`  
JS: `WindowIsFullscreen() Promise<boolean>`

### WindowCenter[​](window.html#windowcenter "Direct link to heading")

Centers the window on the monitor the window is currently on.

Go: `WindowCenter(ctx context.Context)`  
JS: `WindowCenter()`

### WindowExecJS[​](window.html#windowexecjs "Direct link to heading")

Executes arbitrary JS code in the window.

This method runs the code in the browser asynchronously and returns immediately. If the script causes any errors, they will only be available in the browser console.

Go: `WindowExecJS(ctx context.Context, js string)`

### WindowReload[​](window.html#windowreload "Direct link to heading")

Performs a "reload" (Reloads current page).

Go: `WindowReload(ctx context.Context)`  
JS: `WindowReload()`

### WindowReloadApp[​](window.html#windowreloadapp "Direct link to heading")

Reloads the application frontend.

Go: `WindowReloadApp(ctx context.Context)`  
JS: `WindowReloadApp()`

### WindowSetSystemDefaultTheme[​](window.html#windowsetsystemdefaulttheme "Direct link to heading")

Windows only.

Go: `WindowSetSystemDefaultTheme(ctx context.Context)`  
JS: `WindowSetSystemDefaultTheme()`

Sets window theme to system default (dark/light).

### WindowSetLightTheme[​](window.html#windowsetlighttheme "Direct link to heading")

Windows only.

Go: `WindowSetLightTheme(ctx context.Context)`  
JS: `WindowSetLightTheme()`

Sets window theme to light.

### WindowSetDarkTheme[​](window.html#windowsetdarktheme "Direct link to heading")

Windows only.

Go: `WindowSetDarkTheme(ctx context.Context)`  
JS: `WindowSetDarkTheme()`

Sets window theme to dark.

### WindowShow[​](window.html#windowshow "Direct link to heading")

Shows the window, if it is currently hidden.

Go: `WindowShow(ctx context.Context)`  
JS: `WindowShow()`

### WindowHide[​](window.html#windowhide "Direct link to heading")

Hides the window, if it is currently visible.

Go: `WindowHide(ctx context.Context)`  
JS: `WindowHide()`

### WindowIsNormal[​](window.html#windowisnormal "Direct link to heading")

Returns true if the window not minimised, maximised or fullscreen.

Go: `WindowIsNormal(ctx context.Context) bool`  
JS: `WindowIsNormal() Promise<boolean>`

### WindowSetSize[​](window.html#windowsetsize "Direct link to heading")

Sets the width and height of the window.

Go: `WindowSetSize(ctx context.Context, width int, height int)`  
JS: `WindowSetSize(width: number, height: number)`

### WindowGetSize[​](window.html#windowgetsize "Direct link to heading")

Gets the width and height of the window.

Go: `WindowGetSize(ctx context.Context) (width int, height int)`  
JS: `WindowGetSize(): Promise<Size>`

### WindowSetMinSize[​](window.html#windowsetminsize "Direct link to heading")

Sets the minimum window size. Will resize the window if the window is currently smaller than the given dimensions.

Setting a size of `0,0` will disable this constraint.

Go: `WindowSetMinSize(ctx context.Context, width int, height int)`  
JS: `WindowSetMinSize(width: number, height: number)`

### WindowSetMaxSize[​](window.html#windowsetmaxsize "Direct link to heading")

Sets the maximum window size. Will resize the window if the window is currently larger than the given dimensions.

Setting a size of `0,0` will disable this constraint.

Go: `WindowSetMaxSize(ctx context.Context, width int, height int)`  
JS: `WindowSetMaxSize(width: number, height: number)`

### WindowSetAlwaysOnTop[​](window.html#windowsetalwaysontop "Direct link to heading")

Sets the window AlwaysOnTop or not on top.

Go: `WindowSetAlwaysOnTop(ctx context.Context, b bool)`  
JS: `WindowSetAlwaysOnTop(b: boolean)`

### WindowSetPosition[​](window.html#windowsetposition "Direct link to heading")

Sets the window position relative to the monitor the window is currently on.

Go: `WindowSetPosition(ctx context.Context, x int, y int)`  
JS: `WindowSetPosition(x: number, y: number)`

### WindowGetPosition[​](window.html#windowgetposition "Direct link to heading")

Gets the window position relative to the monitor the window is currently on.

Go: `WindowGetPosition(ctx context.Context) (x int, y int)`  
JS: `WindowGetPosition(): Promise<Position>`

### WindowMaximise[​](window.html#windowmaximise "Direct link to heading")

Maximises the window to fill the screen.

Go: `WindowMaximise(ctx context.Context)`  
JS: `WindowMaximise()`

### WindowUnmaximise[​](window.html#windowunmaximise "Direct link to heading")

Restores the window to the dimensions and position prior to maximising.

Go: `WindowUnmaximise(ctx context.Context)`  
JS: `WindowUnmaximise()`

### WindowIsMaximised[​](window.html#windowismaximised "Direct link to heading")

Returns true if the window is maximised.

Go: `WindowIsMaximised(ctx context.Context) bool`  
JS: `WindowIsMaximised() Promise<boolean>`

### WindowToggleMaximise[​](window.html#windowtogglemaximise "Direct link to heading")

Toggles between Maximised and UnMaximised.

Go: `WindowToggleMaximise(ctx context.Context)`  
JS: `WindowToggleMaximise()`

### WindowMinimise[​](window.html#windowminimise "Direct link to heading")

Minimises the window.

Go: `WindowMinimise(ctx context.Context)`  
JS: `WindowMinimise()`

### WindowUnminimise[​](window.html#windowunminimise "Direct link to heading")

Restores the window to the dimensions and position prior to minimising.

Go: `WindowUnminimise(ctx context.Context)`  
JS: `WindowUnminimise()`

### WindowIsMinimised[​](window.html#windowisminimised "Direct link to heading")

Returns true if the window is minimised.

Go: `WindowIsMinimised(ctx context.Context) bool`  
JS: `WindowIsMinimised() Promise<boolean>`

### WindowSetBackgroundColour[​](window.html#windowsetbackgroundcolour "Direct link to heading")

Sets the background colour of the window to the given RGBA colour definition. This colour will show through for all transparent pixels.

Valid values for R, G, B and A are 0-255.

Windows

On Windows, only alpha values of 0 or 255 are supported. Any value that is not 0 will be considered 255.

Go: `WindowSetBackgroundColour(ctx context.Context, R, G, B, A uint8)`  
JS: `WindowSetBackgroundColour(R, G, B, A)`

### WindowPrint[​](window.html#windowprint "Direct link to heading")

Opens the native print dialog.

Go: `WindowPrint(ctx context.Context)`  
JS: `WindowPrint()`

## TypeScript Object Definitions[​](window.html#typescript-object-definitions "Direct link to heading")

### Position[​](window.html#position "Direct link to heading")

```ts
interface Position {
  x: number;
  y: number;
}
```

### Size[​](window.html#size "Direct link to heading")

```ts
interface Size {
  w: number;
  h: number;
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/runtime/window.mdx)

[Previous  
\
Log](log.html)

[Next  
\
Dialog](dialog.html)