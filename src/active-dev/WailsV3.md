# Browser

These methods are related to the system browser.

### BrowserOpenURL​

Opens the given URL in the system browser.

Go: `BrowserOpenURL(ctx context.Context, url string)`
JS: `BrowserOpenURL(url string)`

# Clipboard

This part of the runtime provides access to the operating system's clipboard.
The current implementation only handles text.

### ClipboardGetText​

This method reads the currently stored text from the clipboard.

Go: `ClipboardGetText(ctx context.Context) (string, error)`
Returns: a string (if the clipboard is empty an empty string will be returned) or an error.

JS: `ClipboardGetText(): Promise<string>`
Returns: a promise with a string result (if the clipboard is empty an empty string will be returned).

### ClipboardSetText​

This method writes a text to the clipboard.

Go: `ClipboardSetText(ctx context.Context, text string) error`
Returns: an error if there is any.

JS: `ClipboardSetText(text: string): Promise<boolean>`
Returns: a promise with true result if the text was successfully set on the clipboard, false otherwise.
# Dialog

This part of the runtime provides access to native dialogs, such as File Selectors and Message boxes.

JavaScript

Dialog is currently unsupported in the JS runtime.

### OpenDirectoryDialog​

Opens a dialog that prompts the user to select a directory. Can be customised using OpenDialogOptions.

Go: `OpenDirectoryDialog(ctx context.Context, dialogOptions OpenDialogOptions) (string, error)`

Returns: Selected directory (blank if the user cancelled) or an error

### OpenFileDialog​

Opens a dialog that prompts the user to select a file. Can be customised using OpenDialogOptions.

Go: `OpenFileDialog(ctx context.Context, dialogOptions OpenDialogOptions) (string, error)`

Returns: Selected file (blank if the user cancelled) or an error

### OpenMultipleFilesDialog​

Opens a dialog that prompts the user to select multiple files. Can be customised using OpenDialogOptions.

Go: `OpenMultipleFilesDialog(ctx context.Context, dialogOptions OpenDialogOptions) ([]string, error)`

Returns: Selected files (nil if the user cancelled) or an error

### SaveFileDialog​

Opens a dialog that prompts the user to select a filename for the purposes of saving. Can be customised using SaveDialogOptions.

Go: `SaveFileDialog(ctx context.Context, dialogOptions SaveDialogOptions) (string, error)`

Returns: The selected file (blank if the user cancelled) or an error

### MessageDialog​

Displays a message using a message dialog. Can be customised using MessageDialogOptions.

Go: `MessageDialog(ctx context.Context, dialogOptions MessageDialogOptions) (string, error)`

Returns: The text of the selected button or an error

## Options​

### OpenDialogOptions​
```
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

Field| Description| Win| Mac| Lin
---|---|---|---|---
DefaultDirectory| The directory the dialog will show when opened| ✅| ✅| ✅
DefaultFilename| The default filename| ✅| ✅| ✅
Title| Title for the dialog| ✅| ✅| ✅
Filters| A list of file filters| ✅| ✅| ✅
ShowHiddenFiles| Show files hidden by the system| | ✅| ✅
CanCreateDirectories| Allow user to create directories| | ✅|
ResolvesAliases| If true, returns the file not the alias| | ✅|
TreatPackagesAsDirectories| Allow navigating into packages| | ✅|

### SaveDialogOptions​
```
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

Field| Description| Win| Mac| Lin
---|---|---|---|---
DefaultDirectory| The directory the dialog will show when opened| ✅| ✅| ✅
DefaultFilename| The default filename| ✅| ✅| ✅
Title| Title for the dialog| ✅| ✅| ✅
Filters| A list of file filters| ✅| ✅| ✅
ShowHiddenFiles| Show files hidden by the system| | ✅| ✅
CanCreateDirectories| Allow user to create directories| | ✅|
TreatPackagesAsDirectories| Allow navigating into packages| | ✅|

### MessageDialogOptions​
```
    type MessageDialogOptions struct {
        Type          DialogType
        Title         string
        Message       string
        Buttons       []string
        DefaultButton string
        CancelButton  string
    }

```

Field| Description| Win| Mac| Lin
---|---|---|---|---
Type| The type of message dialog, eg question, info...| ✅| ✅| ✅
Title| Title for the dialog| ✅| ✅| ✅
Message| The message to show the user| ✅| ✅| ✅
Buttons| A list of button titles| | ✅|
DefaultButton| The button with this text should be treated as default. Bound to `return`.| ✅*| ✅|
CancelButton| The button with this text should be treated as cancel. Bound to `escape`| | ✅|

#### Windows​

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

#### Linux​

Linux has standard dialog types in which the buttons are not customisable. The value returned will be one of: "Ok", "Cancel", "Yes", "No"

#### Mac​

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








#### DialogType​
```
    const (
            InfoDialog     DialogType = "info"
            WarningDialog  DialogType = "warning"
            ErrorDialog    DialogType = "error"
            QuestionDialog DialogType = "question"
         )

```

### FileFilter​
```
    type FileFilter struct {
        DisplayName string // Filter information EG: "Image Files (*.jpg, *.png)"
        Pattern     string // semi-colon separated list of extensions, EG: "*.jpg;*.png"
    }

```

#### Windows​

Windows allows you to use multiple file filters in dialog boxes. Each FileFilter will show up as a separate entry in the dialog:








#### Linux​

Linux allows you to use multiple file filters in dialog boxes. Each FileFilter will show up as a separate entry in the dialog:








#### Mac​

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

# Drag And Drop

:::

This part of the runtime handles dragging and dropping files and or folders in to the window.


To enable this functionality you have to set [EnableFileDrop](https://wails.io/docs/next/reference/options#enablefiledrop) to `true` in [Application Options](https://wails.io/docs/next/reference/options#drag-and-drop).

### OnFileDrop​

This method handles the drop event on the window.

Go: `OnFileDrop(ctx context.Context, callback func(x, y int, paths []string))`
Calls the callback function with the coordinates inside the window where the drag was released and a slice of absolute file paths.

JS: `OnFileDrop(callback: (x: number, y: number, paths: string[]) => void, useDropTarget: boolean) :void`
Calls the callback function with the coordinates inside the window where the drag was released and a slice of absolute file paths.

When the `useDropTarget` is `true` in addition to calling the callback when the drop happens, it registers event listeners on the window that are listening for the drag coordinates and checks if the mouse is over an element that has the [CSSDropProperty](https://wails.io/docs/next/reference/options#cssdropproperty) style. If the element has the required property it adds the `wails-drop-target-active` class to the element's class list and removes it when the mouse moves off of it.

### OnFileDropOff​

This method removes all registered listeners and handlers for drag and drop events.

Go: `OnFileDropOff(ctx context.Context)`
Returns: has no return value.

JS: `OnFileDropOff(): void`
Returns: has no return value.

# Events

The Wails runtime provides a unified events system, where events can be emitted or received by either Go or JavaScript. Optionally, data may be passed with the events. Listeners will receive the data in the local data types.

### EventsOn​

This method sets up a listener for the given event name. When an event of type `eventName` is emitted, the callback is triggered. Any additional data sent with the emitted event will be passed to the callback. It returns a function to cancel the listener.

Go: `EventsOn(ctx context.Context, eventName string, callback func(optionalData ...interface{})) func()`
JS: `EventsOn(eventName string, callback function(optionalData?: any)): () => void`

### EventsOff​

This method unregisters the listener for the given event name, optionally multiple listeners can be unregistered via `additionalEventNames`.

Go: `EventsOff(ctx context.Context, eventName string, additionalEventNames ...string)`
JS: `EventsOff(eventName string, ...additionalEventNames)`

### EventsOnce​

This method sets up a listener for the given event name, but will only trigger once. It returns a function to cancel the listener.

Go: `EventsOnce(ctx context.Context, eventName string, callback func(optionalData ...interface{})) func()`
JS: `EventsOnce(eventName string, callback function(optionalData?: any)): () => void`

### EventsOnMultiple​

This method sets up a listener for the given event name, but will only trigger a maximum of `counter` times. It returns a function to cancel the listener.

Go: `EventsOnMultiple(ctx context.Context, eventName string, callback func(optionalData ...interface{}), counter int) func()`
JS: `EventsOnMultiple(eventName string, callback function(optionalData?: any), counter int): () => void`

### EventsEmit​

This method emits the given event. Optional data may be passed with the event. This will trigger any event listeners.

Go: `EventsEmit(ctx context.Context, eventName string, optionalData ...interface{})`
JS: `EventsEmit(eventName: string, ...optionalData: any)`

# Introduction

The runtime is a library that provides utility methods for your application. There is both a Go and JavaScript runtime and the aim is to try and keep them at parity where possible.

It has utility methods for:

  * [Window](https://wails.io/docs/next/reference/runtime/window)
  * [Menu](https://wails.io/docs/next/reference/runtime/menu)
  * [Dialog](https://wails.io/docs/next/reference/runtime/dialog)
  * [Events](https://wails.io/docs/next/reference/runtime/events)
  * [Browser](https://wails.io/docs/next/reference/runtime/browser)
  * [Log](https://wails.io/docs/next/reference/runtime/log)
  * [Clipboard](https://wails.io/docs/next/reference/runtime/clipboard)



The Go Runtime is available through importing `github.com/wailsapp/wails/v2/pkg/runtime`. All methods in this package take a context as the first parameter. This context should be obtained from the [OnStartup](https://wails.io/docs/next/reference/options#onstartup) or [OnDomReady](https://wails.io/docs/next/reference/options#ondomready) hooks.

Note

Whilst the context will be provided to the [OnStartup](https://wails.io/docs/next/reference/options#onstartup) method, there's no guarantee the runtime will work in this method as the window is initialising in a different thread. If you wish to call runtime methods at startup, use [OnDomReady](https://wails.io/docs/next/reference/options#ondomready).

The JavaScript library is available to the frontend via the `window.runtime` map. There is a runtime package generated when using `dev` mode that provides TypeScript declarations for the runtime. This should be located in the `wailsjs` directory in your frontend directory.

### Hide​

Go: `Hide(ctx context.Context)`
JS: `Hide()`

Hides the application.

Note

On Mac, this will hide the application in the same way as the `Hide` menu item in standard Mac applications. This is different to hiding the window, but the application still being in the foreground. For Windows and Linux, this is currently the same as `WindowHide`.

### Show​

Shows the application.

Note

On Mac, this will bring the application back into the foreground. For Windows and Linux, this is currently the same as `WindowShow`.

Go: `Show(ctx context.Context)`
JS: `Show()`

### Quit​

Quits the application.

Go: `Quit(ctx context.Context)`
JS: `Quit()`

### Environment​

Returns details of the current environment.

Go: `Environment(ctx context.Context) EnvironmentInfo`
JS: `Environment(): Promise<EnvironmentInfo>`

#### EnvironmentInfo​

Go:

```go
    type EnvironmentInfo struct {
        BuildType string
        Platform  string
        Arch      string
    }
```

JS:

```js
	interface EnvironmentInfo {
      buildType: string;
      platform: string;
      arch: string;
    }
```

# Log

The Wails runtime provides a logging mechanism that may be called from Go or JavaScript. Like most loggers, there are a number of log levels:

  * Trace
  * Debug
  * Info
  * Warning
  * Error
  * Fatal



The logger will output any log message at the current, or higher, log level. Example: The `Debug` log level will output all messages except `Trace` messages.

### LogPrint​

Logs the given message as a raw message.

Go: `LogPrint(ctx context.Context, message string)`
JS: `LogPrint(message: string)`

### LogPrintf​

Logs the given message as a raw message.

Go: `LogPrintf(ctx context.Context, format string, args ...interface{})`


### LogTrace​

Logs the given message at the `Trace` log level.

Go: `LogTrace(ctx context.Context, message string)`
JS: `LogTrace(message: string)`

### LogTracef​

Logs the given message at the `Trace` log level.

Go: `LogTracef(ctx context.Context, format string, args ...interface{})`


### LogDebug​

Logs the given message at the `Debug` log level.

Go: `LogDebug(ctx context.Context, message string)`
JS: `LogDebug(message: string)`

### LogDebugf​

Logs the given message at the `Debug` log level.

Go: `LogDebugf(ctx context.Context, format string, args ...interface{})`


### LogInfo​

Logs the given message at the `Info` log level.

Go: `LogInfo(ctx context.Context, message string)`
JS: `LogInfo(message: string)`

### LogInfof​

Logs the given message at the `Info` log level.

Go: `LogInfof(ctx context.Context, format string, args ...interface{})`


### LogWarning​

Logs the given message at the `Warning` log level.

Go: `LogWarning(ctx context.Context, message string)`
JS: `LogWarning(message: string)`

### LogWarningf​

Logs the given message at the `Warning` log level.

Go: `LogWarningf(ctx context.Context, format string, args ...interface{})`


### LogError​

Logs the given message at the `Error` log level.

Go: `LogError(ctx context.Context, message string)`
JS: `LogError(message: string)`

### LogErrorf​

Logs the given message at the `Error` log level.

Go: `LogErrorf(ctx context.Context, format string, args ...interface{})`


### LogFatal​

Logs the given message at the `Fatal` log level.

Go: `LogFatal(ctx context.Context, message string)`
JS: `LogFatal(message: string)`

### LogFatalf​

Logs the given message at the `Fatal` log level.

Go: `LogFatalf(ctx context.Context, format string, args ...interface{})`


### LogSetLogLevel​

Sets the log level. In JavaScript, the number relates to the following log levels:

Value| Log Level
---|---
1| Trace
2| Debug
3| Info
4| Warning
5| Error

Go: `LogSetLogLevel(ctx context.Context, level logger.LogLevel)`
JS: `LogSetLogLevel(level: number)`

## Using a Custom Logger​

A custom logger may be used by providing it using the [Logger](https://wails.io/docs/next/reference/options#logger) application option. The only requirement is that the logger implements the `logger.Logger` interface defined in `github.com/wailsapp/wails/v2/pkg/logger`:

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

# Menu

These methods are related to the application menu.

JavaScript

Menu is currently unsupported in the JS runtime.

### MenuSetApplicationMenu​

Sets the application menu to the given [menu](https://wails.io/docs/next/reference/menus).

Go: `MenuSetApplicationMenu(ctx context.Context, menu *menu.Menu)`

### MenuUpdateApplicationMenu​

Updates the application menu, picking up any changes to the menu passed to `MenuSetApplicationMenu`.

Go: `MenuUpdateApplicationMenu(ctx context.Context)`

# Screen

These methods provide information about the currently connected screens.

### ScreenGetAll​

Returns a list of currently connected screens.

Go: `ScreenGetAll(ctx context.Context) []screen`
JS: `ScreenGetAll()`

#### Screen​

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


---

> [!NOTE]
> This is unreleased documentation for Wails **Next Version 🚧** version.

# CLI

The Wails CLI has a number of commands that are used for managing your projects. All commands are run in the following way:

`wails <command> <flags>`

## init[​](#init "Direct link to heading")

`wails init` is used for generating projects.

FlagDescriptionDefault-n "project name"Name of the project. **Mandatory**.-d "project dir"Project directory to createName of the project-gInitialise git repository-lList available project templates-qSuppress output to console-t "template name"The project template to use. This can be the name of a default template or a URL to a remote template hosted on github.vanilla-ideGenerate IDE project files `vscode` or `goland`-fForce build applicationfalse

Example: `wails init -n test -d mytestproject -g -ide vscode -q`

This will generate a a project called "test" in the "mytestproject" directory, initialise git, generate vscode project files and do so silently.

More information on using IDEs with Wails can be found [here](https://wails.io/docs/next/guides/ides).

### Remote Templates[​](#remote-templates "Direct link to heading")

Remote templates (hosted on GitHub) are supported and can be installed by using the template's project URL.

Example: `wails init -n test -t https://github.com/leaanthony/testtemplate[@v1.0.0]`

A list of community maintained templates can be found [here](https://wails.io/docs/next/community/templates)

Attention

**The Wails project does not maintain, is not responsible nor liable for 3rd party templates!**

If you are unsure about a template, inspect `package.json` and `wails.json` for what scripts are run and what packages are installed.

## build[​](#build "Direct link to heading")

`wails build` is used for compiling your project to a production-ready binary.

FlagDescriptionDefault-cleanCleans the `build/bin` directory-compiler "compiler"Use a different go compiler to build, eg go1.15beta1go-debugRetains debug information in the application and shows the debug console. Allows the use of the devtools in the application window-devtoolsAllows the use of the devtools in the application window in production (when -debug is not used). Ctrl/Cmd+Shift+F12 may be used to open the devtools window. *NOTE*: This option will make your application FAIL Mac appstore guidelines. Use for debugging only.-dryrunPrints the build command without executing it-fForce build application-garbleargsArguments to pass to garble`-literals -tiny -seed=random`-ldflags "flags"Additional ldflags to pass to the compiler-mSkip mod tidy before compile-nopackageDo not package application-nocolourDisable colour in output-nosyncgomodDo not sync go.mod with the Wails version-nsisGenerate NSIS installer for Windows-o filenameOutput filename-obfuscatedObfuscate the application using [garble](https://github.com/burrowers/garble)-platformBuild for the given (comma delimited) [platforms](https://wails.io/docs/next/reference/cli#platforms) eg. `windows/arm64`. Note, if you do not give the architecture, `runtime.GOARCH` is used.platform = `GOOS` environment variable if given else `runtime.GOOS`.
arch = `GOARCH` environment variable if given else `runtime.GOARCH`.-raceBuild with Go's race detector-sSkip building the frontend-skipbindingsSkip bindings generation-skipembedcreateSkip automatic creation of non-existent embed directories and gitkeep files-tags "extra tags"Build tags to pass to Go compiler. Must be quoted. Space or comma (but not both) separated-trimpathRemove all file system paths from the resulting executable.-uUpdates your project's `go.mod` to use the same version of Wails as the CLI-upxCompress final binary using "upx"-upxflagsFlags to pass to upx-v intVerbosity level (0 - silent, 1 - default, 2 - verbose)1-webview2WebView2 installer strategy: download,embed,browser,errordownload-windowsconsoleKeep the console window for Windows builds

For a detailed description of the `webview2` flag, please refer to the [Windows](https://wails.io/docs/next/guides/windows) Guide.

If you prefer to build using standard Go tooling, please consult the [Manual Builds](https://wails.io/docs/next/guides/manual-builds) guide.

Example:

`wails build -clean -o myproject.exe`

info

On Mac, the application will be bundled with `Info.plist`, not `Info.dev.plist`.

UPX on Apple Silicon

There are [issues](https://github.com/upx/upx/issues/446) with using UPX with Apple Silicon.

Set minimal version for MacOS

You can override default [minimal version](https://wails.io/docs/next/gettingstarted/installation#supported-platforms) of macOS for your app by providing version via `CGO_CFLAGS` and `CGO_LDFLAGS` environment variables. e.g. `CGO_CFLAGS=-mmacosx-version-min=10.15.0 CGO_LDFLAGS=-mmacosx-version-min=10.15.0 wails build`

UPX on Windows

Some Antivirus vendors false positively mark `upx` compressed binaries as virus, see [issue](https://github.com/upx/upx/issues/437).

### Platforms[​](#platforms "Direct link to heading")

Supported platforms are:

PlatformDescriptiondarwinMacOS + architecture of build machinedarwin/amd64MacOS 10.13+ AMD64darwin/arm64MacOS 11.0+ ARM64darwin/universalMacOS AMD64+ARM64 universal applicationwindowsWindows 10/11 + architecture of build machinewindows/amd64Windows 10/11 AMD64windows/arm64Windows 10/11 ARM64linuxLinux + architecture of build machinelinux/amd64Linux AMD64linux/arm64Linux ARM64

## doctor[​](#doctor "Direct link to heading")

`wails doctor` will run diagnostics to ensure that your system is ready for development.

Example:

```text
Wails CLI v2.0.0-beta

Scanning system - Please wait (this may take a long time)...Done.

System
------
OS:             Windows 10 Pro
Version:        2009 (Build: 19043)
ID:             21H1
Go Version:     go1.18
Platform:       windows
Architecture:   amd64

Dependency      Package Name    Status          Version
----------      ------------    ------          -------
WebView2        N/A             Installed       93.0.961.52
npm             N/A             Installed       6.14.15
*upx            N/A             Installed       upx 3.96

* - Optional Dependency

Diagnosis
---------
Your system is ready for Wails development!

```

## dev[​](#dev "Direct link to heading")

`wails dev` is used to run your application in a "live development" mode. This means:

- The application's `go.mod` will be updated to use the same version of Wails as the CLI
- The application is compiled and run automatically
- A watcher is started and will trigger a rebuild of your dev app if it detects changes to your go files
- A webserver is started on `http://localhost:34115` which serves your application (not just frontend) over http. This allows you to use your favourite browser development extensions
- All application assets are loaded from disk. If they are changed, the application will automatically reload (not rebuild). All connected browsers will also reload
- A JS module is generated that provides the following:
- JavaScript wrappers of your Go methods with autogenerated JSDoc, providing code hinting
- TypeScript versions of your Go structs, that can be constructed and passed to your go methods
- A second JS module is generated that provides a wrapper + TS declaration for the runtime
- On macOS, it will bundle the application into a `.app` file and run it. It will use a `build/darwin/Info.dev.plist` for development.

FlagDescriptionDefault-appargs "args"Arguments passed to the application in shell style-assetdir "./path/to/assets"Serve assets from the given directory instead of using the provided asset FSValue in `wails.json`-browserOpens a browser to `http://localhost:34115` on startup-compiler "compiler"Use a different go compiler to build, eg go1.15beta1go-debounceThe time to wait for reload after an asset change is detected100 (milliseconds)-devserver "host:port"The address to bind the wails dev server to"localhost:34115"-extensionsExtensions to trigger rebuilds (comma separated)go-forcebuildForce build of application-frontenddevserverurl "url"Use 3rd party dev server url to serve assets, EG Vite""-ldflags "flags"Additional ldflags to pass to the compiler-loglevel "loglevel"Loglevel to use - Trace, Debug, Info, Warning, ErrorDebug-nocolourTurn off colour cli outputfalse-noreloadDisable automatic reload when assets change-nosyncgomodDo not sync go.mod with the Wails versionfalse-raceBuild with Go's race detectorfalse-reloaddirsAdditional directories to trigger reloads (comma separated)Value in `wails.json`-sSkip building the frontendfalse-saveSaves the given `assetdir`, `reloaddirs`, `wailsjsdir`, `debounce`, `devserver` and `frontenddevserverurl` flags in `wails.json` to become the defaults for subsequent invocations.-skipbindingsSkip bindings generation-skipembedcreateSkip automatic creation of non-existent embed directories and gitkeep files-tags "extra tags"Build tags to pass to compiler (quoted and space separated)-vVerbosity level (0 - silent, 1 - standard, 2 - verbose)1-wailsjsdirThe directory to generate the generated Wails JS modulesValue in `wails.json`

Example:

`wails dev -assetdir ./frontend/dist -wailsjsdir ./frontend/src -browser`

This command will do the following:

- Build the application and run it (more details [here](https://wails.io/docs/next/guides/manual-builds)
- Generate the Wails JS modules in `./frontend/src`
- Watch for updates to files in `./frontend/dist` and reload on any change
- Open a browser and connect to the application

There is more information on using this feature with existing framework scripts [here](https://wails.io/docs/next/guides/application-development#live-reloading).

## generate[​](#generate "Direct link to heading")

### template[​](#template "Direct link to heading")

Wails uses templates for project generation. The `wails generate template` command helps scaffold a template so that it may be used for generating projects.

FlagDescription-nameThe template name (Mandatory)-frontend "path"Path to frontend project to use in template

For more details on creating templates, consult the [Templates guide](https://wails.io/docs/next/guides/templates).

### module[​](#module "Direct link to heading")

The `wails generate module` command allows you to manually generate the `wailsjs` directory for your application.

FlagDescriptionDefault-compiler "compiler"Use a different go compiler to build, eg go1.15beta1go-tags "extra tags"Build tags to pass to compiler (quoted and space separated)

## update[​](#update "Direct link to heading")

`wails update` will update the version of the Wails CLI.

FlagDescription-preUpdate to latest pre-release version-version "version"Install a specific version of the CLI

## version[​](#version "Direct link to heading")

`wails version` will simply output the current CLI version.
