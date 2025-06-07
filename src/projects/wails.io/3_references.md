[Skip to main content](cli.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/cli) (v2.10).

- [](https://wails.io/)
- Reference
- CLI

Version: Next Version 🚧

On this page

# CLI

The Wails CLI has a number of commands that are used for managing your projects. All commands are run in the following way:

`wails <command> <flags>`

## init[​](cli.html#init "Direct link to heading")

`wails init` is used for generating projects.

| Flag               | Description                                                                                                             | Default             |
|:-------------------|:------------------------------------------------------------------------------------------------------------------------|:-------------------:|
| -n "project name"  | Name of the project. **Mandatory**.                                                                                     |                     |
| -d "project dir"   | Project directory to create                                                                                             | Name of the project |
| -g                 | Initialise git repository                                                                                               |                     |
| -l                 | List available project templates                                                                                        |                     |
| -q                 | Suppress output to console                                                                                              |                     |
| -t "template name" | The project template to use. This can be the name of a default template or a URL to a remote template hosted on github. | vanilla             |
| -ide               | Generate IDE project files `vscode` or `goland`                                                                         |                     |
| -f                 | Force build application                                                                                                 | false               |

Example: `wails init -n test -d mytestproject -g -ide vscode -q`

This will generate a a project called "test" in the "mytestproject" directory, initialise git, generate vscode project files and do so silently.

More information on using IDEs with Wails can be found [here](../guides/ides.html).

### Remote Templates[​](cli.html#remote-templates "Direct link to heading")

Remote templates (hosted on GitHub) are supported and can be installed by using the template's project URL.

Example: `wails init -n test -t https://github.com/leaanthony/testtemplate[@v1.0.0]`

A list of community maintained templates can be found [here](../community/templates.html)

Attention

**The Wails project does not maintain, is not responsible nor liable for 3rd party templates!**

If you are unsure about a template, inspect `package.json` and `wails.json` for what scripts are run and what packages are installed.

## build[​](cli.html#build "Direct link to heading")

`wails build` is used for compiling your project to a production-ready binary.

FlagDescriptionDefault

-cleanCleans the `build/bin` directory

-compiler "compiler"Use a different go compiler to build, eg go1.15beta1go

-debugRetains debug information in the application and shows the debug console. Allows the use of the devtools in the application window

-devtoolsAllows the use of the devtools in the application window in production (when -debug is not used). Ctrl/Cmd+Shift+F12 may be used to open the devtools window. *NOTE*: This option will make your application FAIL Mac appstore guidelines. Use for debugging only.

-dryrunPrints the build command without executing it

-fForce build application

-garbleargsArguments to pass to garble`-literals -tiny -seed=random`

-ldflags "flags"Additional ldflags to pass to the compiler

-mSkip mod tidy before compile

-nopackageDo not package application

-nocolourDisable colour in output

-nosyncgomodDo not sync go.mod with the Wails version

-nsisGenerate NSIS installer for Windows

-o filenameOutput filename

-obfuscatedObfuscate the application using [garble](https://github.com/burrowers/garble)

-platformBuild for the given (comma delimited) [platforms](cli.html#platforms) eg. `windows/arm64`. Note, if you do not give the architecture, `runtime.GOARCH` is used.platform = `GOOS` environment variable if given else `runtime.GOOS`.  
arch = `GOARCH` environment variable if given else `runtime.GOARCH`.

-raceBuild with Go's race detector

-sSkip building the frontend

-skipbindingsSkip bindings generation

-skipembedcreateSkip automatic creation of non-existent embed directories and gitkeep files

-tags "extra tags"Build tags to pass to Go compiler. Must be quoted. Space or comma (but not both) separated

-trimpathRemove all file system paths from the resulting executable.

-uUpdates your project's `go.mod` to use the same version of Wails as the CLI

-upxCompress final binary using "upx"

-upxflagsFlags to pass to upx

-v intVerbosity level (0 - silent, 1 - default, 2 - verbose)1

-webview2WebView2 installer strategy: download,embed,browser,errordownload

-windowsconsoleKeep the console window for Windows builds

For a detailed description of the `webview2` flag, please refer to the [Windows](../guides/windows.html) Guide.

If you prefer to build using standard Go tooling, please consult the [Manual Builds](../guides/manual-builds.html) guide.

Example:

`wails build -clean -o myproject.exe`

info

On Mac, the application will be bundled with `Info.plist`, not `Info.dev.plist`.

UPX on Apple Silicon

There are [issues](https://github.com/upx/upx/issues/446) with using UPX with Apple Silicon.

Set minimal version for MacOS

You can override default [minimal version](../gettingstarted/installation.html#supported-platforms) of macOS for your app by providing version via `CGO_CFLAGS` and `CGO_LDFLAGS` environment variables. e.g. `CGO_CFLAGS=-mmacosx-version-min=10.15.0 CGO_LDFLAGS=-mmacosx-version-min=10.15.0 wails build`

UPX on Windows

Some Antivirus vendors false positively mark `upx` compressed binaries as virus, see [issue](https://github.com/upx/upx/issues/437).

### Platforms[​](cli.html#platforms "Direct link to heading")

Supported platforms are:

| Platform         | Description                                   |
|:-----------------|:----------------------------------------------|
| darwin           | MacOS + architecture of build machine         |
| darwin/amd64     | MacOS 10.13+ AMD64                            |
| darwin/arm64     | MacOS 11.0+ ARM64                             |
| darwin/universal | MacOS AMD64+ARM64 universal application       |
| windows          | Windows 10/11 + architecture of build machine |
| windows/amd64    | Windows 10/11 AMD64                           |
| windows/arm64    | Windows 10/11 ARM64                           |
| linux            | Linux + architecture of build machine         |
| linux/amd64      | Linux AMD64                                   |
| linux/arm64      | Linux ARM64                                   |

## doctor[​](cli.html#doctor "Direct link to heading")

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

## dev[​](cli.html#dev "Direct link to heading")

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

| Flag                         | Description                                                                                                                                                                         | Default               |
|:-----------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------|
| -appargs "args"              | Arguments passed to the application in shell style                                                                                                                                  |                       |
| -assetdir "./path/to/assets" | Serve assets from the given directory instead of using the provided asset FS                                                                                                        | Value in `wails.json` |
| -browser                     | Opens a browser to `http://localhost:34115` on startup                                                                                                                              |                       |
| -compiler "compiler"         | Use a different go compiler to build, eg go1.15beta1                                                                                                                                | go                    |
| -debounce                    | The time to wait for reload after an asset change is detected                                                                                                                       | 100 (milliseconds)    |
| -devserver "host:port"       | The address to bind the wails dev server to                                                                                                                                         | "localhost:34115"     |
| -extensions                  | Extensions to trigger rebuilds (comma separated)                                                                                                                                    | go                    |
| -forcebuild                  | Force build of application                                                                                                                                                          |                       |
| -frontenddevserverurl "url"  | Use 3rd party dev server url to serve assets, EG Vite                                                                                                                               | ""                    |
| -ldflags "flags"             | Additional ldflags to pass to the compiler                                                                                                                                          |                       |
| -loglevel "loglevel"         | Loglevel to use - Trace, Debug, Info, Warning, Error                                                                                                                                | Debug                 |
| -nocolour                    | Turn off colour cli output                                                                                                                                                          | false                 |
| -noreload                    | Disable automatic reload when assets change                                                                                                                                         |                       |
| -nosyncgomod                 | Do not sync go.mod with the Wails version                                                                                                                                           | false                 |
| -race                        | Build with Go's race detector                                                                                                                                                       | false                 |
| -reloaddirs                  | Additional directories to trigger reloads (comma separated)                                                                                                                         | Value in `wails.json` |
| -s                           | Skip building the frontend                                                                                                                                                          | false                 |
| -save                        | Saves the given `assetdir`, `reloaddirs`, `wailsjsdir`, `debounce`, `devserver` and `frontenddevserverurl` flags in `wails.json` to become the defaults for subsequent invocations. |                       |
| -skipbindings                | Skip bindings generation                                                                                                                                                            |                       |
| -skipembedcreate             | Skip automatic creation of non-existent embed directories and gitkeep files                                                                                                         |                       |
| -tags "extra tags"           | Build tags to pass to compiler (quoted and space separated)                                                                                                                         |                       |
| -v                           | Verbosity level (0 - silent, 1 - standard, 2 - verbose)                                                                                                                             | 1                     |
| -wailsjsdir                  | The directory to generate the generated Wails JS modules                                                                                                                            | Value in `wails.json` |

Example:

`wails dev -assetdir ./frontend/dist -wailsjsdir ./frontend/src -browser`

This command will do the following:

- Build the application and run it (more details [here](../guides/manual-builds.html)
- Generate the Wails JS modules in `./frontend/src`
- Watch for updates to files in `./frontend/dist` and reload on any change
- Open a browser and connect to the application

There is more information on using this feature with existing framework scripts [here](../guides/application-development.html#live-reloading).

## generate[​](cli.html#generate "Direct link to heading")

### template[​](cli.html#template "Direct link to heading")

Wails uses templates for project generation. The `wails generate template` command helps scaffold a template so that it may be used for generating projects.

| Flag             | Description                                 |
|:-----------------|:--------------------------------------------|
| -name            | The template name (Mandatory)               |
| -frontend "path" | Path to frontend project to use in template |

For more details on creating templates, consult the [Templates guide](../guides/templates.html).

### module[​](cli.html#module "Direct link to heading")

The `wails generate module` command allows you to manually generate the `wailsjs` directory for your application.

| Flag                 | Description                                                 | Default |
|:---------------------|:------------------------------------------------------------|:--------|
| -compiler "compiler" | Use a different go compiler to build, eg go1.15beta1        | go      |
| -tags "extra tags"   | Build tags to pass to compiler (quoted and space separated) |         |

## update[​](cli.html#update "Direct link to heading")

`wails update` will update the version of the Wails CLI.

| Flag               | Description                           |
|:-------------------|:--------------------------------------|
| -pre               | Update to latest pre-release version  |
| -version "version" | Install a specific version of the CLI |

## version[​](cli.html#version "Direct link to heading")

`wails version` will simply output the current CLI version.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/cli.mdx)

[Previous  
\
Drag And Drop](runtime/draganddrop.html)

[Next  
\
Options](options.html)

Menus | Wails

[Skip to main content](menus.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/menus) (v2.10).

- [](https://wails.io/)
- Reference
- Menus

Version: Next Version 🚧

On this page

# Menus

It is possible to add an application menu to Wails projects. This is achieved by defining a [Menu](menus.html#menu) struct and setting it in the [`Menu`](options.html#menu) application config, or by calling the runtime method [MenuSetApplicationMenu](runtime/menu.html#menusetapplicationmenu).

An example of how to create a menu:

```go

    app := NewApp()

    AppMenu := menu.NewMenu()
    if runtime.GOOS == "darwin" {
        AppMenu.Append(menu.AppMenu()) // On macOS platform, this must be done right after `NewMenu()`
    }
    FileMenu := AppMenu.AddSubmenu("File")
    FileMenu.AddText("&Open", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
        // do something
    })
    FileMenu.AddSeparator()
    FileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
        // `rt` is an alias of "github.com/wailsapp/wails/v2/pkg/runtime" to prevent collision with standard package
        rt.Quit(app.ctx)
    })

    if runtime.GOOS == "darwin" {
    AppMenu.Append(menu.EditMenu())  // On macOS platform, EditMenu should be appended to enable Cmd+C, Cmd+V, Cmd+Z... shortcuts
    }

    err := wails.Run(&options.App{
        Title:             "Menus Demo",
        Width:             800,
        Height:            600,
        Menu:              AppMenu, // reference the menu above
        Bind: []interface{}{
            app,
        },
    )
    // ...
```

It is also possible to dynamically update the menu, by updating the menu struct and calling [MenuUpdateApplicationMenu](runtime/menu.html#menuupdateapplicationmenu).

The example above uses helper methods, however it's possible to build the menu structs manually.

## Menu[​](menus.html#menu "Direct link to heading")

A Menu is a collection of MenuItems:

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
type Menu struct {
    Items []*MenuItem
}
```

For the Application menu, each MenuItem represents a single menu such as "Edit".

A simple helper method is provided for building menus:

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
func NewMenuFromItems(first *MenuItem, rest ...*MenuItem) *Menu
```

This makes the layout of the code more like that of a menu without the need to add the menu items manually after creating them. Alternatively, you can just create the menu items and add them to the menu manually.

## MenuItem[​](menus.html#menuitem "Direct link to heading")

A MenuItem represents an item within a Menu.

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
// MenuItem represents a menu item contained in a menu
type MenuItem struct {
    Label string
    Role Role
    Accelerator *keys.Accelerator
    Type Type
    Disabled bool
    Hidden bool
    Checked bool
    SubMenu *Menu
    Click Callback
}
```

| Field       | Type                                         | Notes                                                                   |
|-------------|----------------------------------------------|-------------------------------------------------------------------------|
| Label       | string                                       | The menu text                                                           |
| Accelerator | [\*keys.Accelerator](menus.html#accelerator) | Key binding for this menu item                                          |
| Type        | [Type](menus.html#type)                      | Type of MenuItem                                                        |
| Disabled    | bool                                         | Disables the menu item                                                  |
| Hidden      | bool                                         | Hides this menu item                                                    |
| Checked     | bool                                         | Adds check to item (Checkbox &amp; Radio types)                         |
| SubMenu     | [\*Menu](menus.html#menu)                    | Sets the submenu                                                        |
| Click       | [Callback](menus.html#callback)              | Callback function when menu clicked                                     |
| Role        | string                                       | Defines a [role](menus.html#role) for this menu item. Mac only for now. |

### Accelerator[​](menus.html#accelerator "Direct link to heading")

Accelerators (sometimes called keyboard shortcuts) define a binding between a keystroke and a menu item. Wails defines an Accelerator as a combination or key + [Modifier](menus.html#modifier). They are available in the `"github.com/wailsapp/wails/v2/pkg/menu/keys"` package.

Example:

Package: github.com/wailsapp/wails/v2/pkg/menu/keys

```go
    // Defines cmd+o on Mac and ctrl-o on Window/Linux
    myShortcut := keys.CmdOrCtrl("o")
```

Keys are any single character on a keyboard with the exception of `+`, which is defined as `plus`. Some keys cannot be represented as characters so there are a set of named characters that may be used:

|             |       |       |           |
|:-----------:|:-----:|:-----:|:---------:|
| `backspace` | `f1`  | `f16` | `f31`     |
| `tab`       | `f2`  | `f17` | `f32`     |
| `return`    | `f3`  | `f18` | `f33`     |
| `enter`     | `f4`  | `f19` | `f34`     |
| `escape`    | `f5`  | `f20` | `f35`     |
| `left`      | `f6`  | `f21` | `numlock` |
| `right`     | `f7`  | `f22` |           |
| `up`        | `f8`  | `f23` |           |
| `down`      | `f9`  | `f24` |           |
| `space`     | `f10` | `f25` |           |
| `delete`    | `f11` | `f36` |           |
| `home`      | `f12` | `f37` |           |
| `end`       | `f13` | `f38` |           |
| `page up`   | `f14` | `f39` |           |
| `page down` | `f15` | `f30` |           |

Wails also supports parsing accelerators using the same syntax as Electron. This is useful for storing accelerators in config files.

Example:

Package: github.com/wailsapp/wails/v2/pkg/menu/keys

```go
    // Defines cmd+o on Mac and ctrl-o on Window/Linux
    myShortcut, err := keys.Parse("Ctrl+Option+A")
```

#### Modifier[​](menus.html#modifier "Direct link to heading")

The following modifiers are keys that may be used in combination with the accelerator key:

Package: github.com/wailsapp/wails/v2/pkg/menu/keys

```go
const (
    // CmdOrCtrlKey represents Command on Mac and Control on other platforms
    CmdOrCtrlKey Modifier = "cmdorctrl"
    // OptionOrAltKey represents Option on Mac and Alt on other platforms
    OptionOrAltKey Modifier = "optionoralt"
    // ShiftKey represents the shift key on all systems
    ShiftKey Modifier = "shift"
    // ControlKey represents the control key on all systems
    ControlKey Modifier = "ctrl"
)
```

A number of helper methods are available to create Accelerators using modifiers:

Package: github.com/wailsapp/wails/v2/pkg/menu/keys

```go
func CmdOrCtrl(key string) *Accelerator
func OptionOrAlt(key string) *Accelerator
func Shift(key string) *Accelerator
func Control(key string) *Accelerator
```

Modifiers can be combined using `keys.Combo(key string, modifier1 Modifier, modifier2 Modifier, rest ...Modifier)`:

Package: github.com/wailsapp/wails/v2/pkg/menu/keys

```go
    // Defines "Ctrl+Option+A" on Mac and "Ctrl+Alt+A" on Window/Linux
    myShortcut := keys.Combo("a", ControlKey, OptionOrAltKey)
```

### Type[​](menus.html#type "Direct link to heading")

Each menu item must have a type and there are 5 types available:

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
const (
    TextType Type = "Text"
    SeparatorType Type = "Separator"
    SubmenuType Type = "Submenu"
    CheckboxType Type = "Checkbox"
    RadioType Type = "Radio"
)
```

For convenience, helper methods are provided to quickly create a menu item:

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
func Text(label string, accelerator *keys.Accelerator, click Callback) *MenuItem
func Separator() *MenuItem
func Radio(label string, selected bool, accelerator *keys.Accelerator, click Callback) *MenuItem
func Checkbox(label string, checked bool, accelerator *keys.Accelerator, click Callback) *MenuItem
func SubMenu(label string, menu *Menu) *Menu
```

You can also create menu items directly on a menu by using the "Add" helpers:

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
func (m *Menu) AddText(label string, accelerator *keys.Accelerator, click Callback) *MenuItem
func (m *Menu) AddSeparator() *MenuItem
func (m *Menu) AddRadio(label string, selected bool, accelerator *keys.Accelerator, click Callback) *MenuItem
func (m *Menu) AddCheckbox(label string, checked bool, accelerator *keys.Accelerator, click Callback) *MenuItem
func (m *Menu) AddSubMenu(label string, menu *Menu) *MenuI
```

A note on radio groups: A radio group is defined as a number of radio menu items that are next to each other in the menu. This means that you do not need to group items together as it is automatic. However, that also means you cannot have 2 radio groups next to each other - there must be a non-radio item between them.

### Callback[​](menus.html#callback "Direct link to heading")

Each menu item may have a callback that is executed when the item is clicked:

Package: github.com/wailsapp/wails/v2/pkg/menu

```go
type Callback func(*CallbackData)

type CallbackData struct {
    MenuItem    *MenuItem
}
```

The function is given a `CallbackData` struct which indicates which menu item triggered the callback. This is useful when using radio groups that may share a callback.

### Role[​](menus.html#role "Direct link to heading")

Roles

Roles are currently supported on Mac only.

A menu item may have a role, which is essentially a pre-defined menu item. We currently support the following roles:

| Role         | Description                                                              |
|--------------|--------------------------------------------------------------------------|
| AppMenuRole  | The standard Mac application menu. Can be created using `menu.AppMenu()` |
| EditMenuRole | The standard Mac edit menu. Can be created using `menu.EditMenu()`       |

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/menus.mdx)

[Previous  
\
Options](options.html)

[Next  
\
Project Config](project-config.html)

Options | Wails

[Skip to main content](options.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/options) (v2.10).

- [](https://wails.io/)
- Reference
- Options

Version: Next Version 🚧

On this page

# Options

## Application Options[​](options.html#application-options "Direct link to heading")

The `Options.App` struct contains the application configuration. It is passed to the `wails.Run()` method:

Example

```go
import (
    "github.com/wailsapp/wails/v2/pkg/options"
    "github.com/wailsapp/wails/v2/pkg/options/assetserver"
    "github.com/wailsapp/wails/v2/pkg/options/linux"
    "github.com/wailsapp/wails/v2/pkg/options/mac"
    "github.com/wailsapp/wails/v2/pkg/options/windows"
)

func main() {

    err := wails.Run(&options.App{
        Title:              "Menus Demo",
        Width:              800,
        Height:             600,
        DisableResize:      false,
        Fullscreen:         false,
        WindowStartState:   options.Maximised,
        Frameless:          true,
        MinWidth:           400,
        MinHeight:          400,
        MaxWidth:           1280,
        MaxHeight:          1024,
        StartHidden:        false,
        HideWindowOnClose:  false,
        BackgroundColour:   &options.RGBA{R: 0, G: 0, B: 0, A: 255},
        AlwaysOnTop:        false,
        AssetServer: &assetserver.Options{
            Assets:     assets,
            Handler:    assetsHandler,
            Middleware: assetsMidldeware,
        },
        Menu:               app.applicationMenu(),
        Logger:             nil,
        LogLevel:           logger.DEBUG,
        LogLevelProduction: logger.ERROR,
        OnStartup:          app.startup,
        OnDomReady:         app.domready,
        OnShutdown:         app.shutdown,
        OnBeforeClose:      app.beforeClose,
        CSSDragProperty:   "--wails-draggable",
        CSSDragValue:      "drag",
        EnableDefaultContextMenu: false,
        EnableFraudulentWebsiteDetection: false,
        Bind: []interface{}{
            app,
        },
        EnumBind: []interface{}{
            AllWeekdays,
        },
        ErrorFormatter: func(err error) any { return err.Error() },
        SingleInstanceLock: &options.SingleInstanceLock{
          UniqueId:               "c9c8fd93-6758-4144-87d1-34bdb0a8bd60",
          OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
        },
        DragAndDrop: &options.DragAndDrop{
          EnableFileDrop:       false,
          DisableWebViewDrop:   false,
          CSSDropProperty:      "--wails-drop-target",
          CSSDropValue:         "drop",
        },
        Windows: &windows.Options{
            WebviewIsTransparent:              false,
            WindowIsTranslucent:               false,
            BackdropType:                      windows.Mica,
            DisablePinchZoom:               false,
            DisableWindowIcon:                 false,
            DisableFramelessWindowDecorations: false,
            WebviewUserDataPath:               "",
            WebviewBrowserPath:                "",
            Theme:                             windows.SystemDefault,
            CustomTheme: &windows.ThemeSettings{
                DarkModeTitleBar:   windows.RGB(20, 20, 20),
                DarkModeTitleText:  windows.RGB(200, 200, 200),
                DarkModeBorder:     windows.RGB(20, 0, 20),
                LightModeTitleBar:  windows.RGB(200, 200, 200),
                LightModeTitleText: windows.RGB(20, 20, 20),
                LightModeBorder:    windows.RGB(200, 200, 200),
            },
            // ZoomFactor is the zoom factor for the WebView2. This is the option matching the Edge user activated zoom in or out.
            ZoomFactor:           float64,
            // IsZoomControlEnabled enables the zoom factor to be changed by the user.
            IsZoomControlEnabled: bool,
            // User messages that can be customised
            Messages: *windows.Messages
            // OnSuspend is called when Windows enters low power mode
            OnSuspend: func()
            // OnResume is called when Windows resumes from low power mode
            OnResume: func(),
            // Disable GPU hardware acceleration for the webview
                  WebviewGpuDisabled: false,
                  // Class name for the window. If empty, 'wailsWindow' will be used.
                  WindowClassName: "MyWindow",
        },
        Mac: &mac.Options{
            TitleBar: &mac.TitleBar{
                TitlebarAppearsTransparent: true,
                HideTitle:                  false,
                HideTitleBar:               false,
                FullSizeContent:            false,
                UseToolbar:                 false,
                HideToolbarSeparator:       true,
                OnFileOpen: app.onFileOpen,
                      OnUrlOpen:  app.onUrlOpen,
            },
            Appearance:           mac.NSAppearanceNameDarkAqua,
            WebviewIsTransparent: true,
            WindowIsTranslucent:  false,
            About: &mac.AboutInfo{
                Title:   "My Application",
                Message: "© 2021 Me",
                Icon:    icon,
            },
        },
        Linux: &linux.Options{
            Icon: icon,
            WindowIsTranslucent: false,
            WebviewGpuPolicy: linux.WebviewGpuPolicyAlways,
            ProgramName: "wails"
        },
        Debug: options.Debug{
            OpenInspectorOnStartup: false,
        },
    })

    if err != nil {
        log.Fatal(err)
    }
}

```

### Title[​](options.html#title "Direct link to heading")

The text shown in the window's title bar.

Name: Title  
Type: `string`

### Width[​](options.html#width "Direct link to heading")

The initial width of the window.

Name: Width  
Type: `int`  
Default: 1024.

### Height[​](options.html#height "Direct link to heading")

The initial height of the window.

Name: Height  
Type: `int`  
Default: 768

### DisableResize[​](options.html#disableresize "Direct link to heading")

By default, the main window is resizable. Setting this to `true` will keep it a fixed size.

Name: DisableResize  
Type: `bool`

### Fullscreen[​](options.html#fullscreen "Direct link to heading")

Deprecated: Please use [WindowStartState](options.html#windowstartstate).

### WindowStartState[​](options.html#windowstartstate "Direct link to heading")

Defines how the window should present itself at startup.

| Value      | Win | Mac | Lin |
|------------|-----|-----|-----|
| Fullscreen | ✅   | ✅   | ✅   |
| Maximised  | ✅   | ✅   | ✅   |
| Minimised  | ✅   | ❌   | ✅   |

Name: WindowStartState  
Type: `options.WindowStartState`

### Frameless[​](options.html#frameless "Direct link to heading")

When set to `true`, the window will have no borders or title bar. Also see [Frameless Windows](../guides/frameless.html).

Name: Frameless  
Type: `bool`

### MinWidth[​](options.html#minwidth "Direct link to heading")

This sets the minimum width for the window. If the value given in `Width` is less than this value, the window will be set to `MinWidth` by default.

Name: MinWidth  
Type: `int`

### MinHeight[​](options.html#minheight "Direct link to heading")

This sets the minimum height for the window. If the value given in `Height` is less than this value, the window will be set to `MinHeight` by default.

Name: MinHeight  
Type: `int`

### MaxWidth[​](options.html#maxwidth "Direct link to heading")

This sets the maximum width for the window. If the value given in `Width` is more than this value, the window will be set to `MaxWidth` by default.

Name: MaxWidth  
Type: `int`

### MaxHeight[​](options.html#maxheight "Direct link to heading")

This sets the maximum height for the window. If the value given in `Height` is more than this value, the window will be set to `MaxHeight` by default.

Name: MaxHeight  
Type: `int`

### StartHidden[​](options.html#starthidden "Direct link to heading")

When set to `true`, the application will be hidden until [WindowShow](runtime/window.html#windowshow) is called.

Name: StartHidden  
Type: `bool`

### HideWindowOnClose[​](options.html#hidewindowonclose "Direct link to heading")

By default, closing the window will close the application. Setting this to `true` means closing the window will

hide the window instead.

Name: HideWindowOnClose  
Type: `bool`

### BackgroundColour[​](options.html#backgroundcolour "Direct link to heading")

This value is the default background colour of the window. Example: options.NewRGBA(255,0,0,128) - Red at 50% transparency

Name: BackgroundColour  
Type: `*options.RGBA`  
Default: white

### AlwaysOnTop[​](options.html#alwaysontop "Direct link to heading")

Indicates that the window should stay above other windows when losing focus.

Name: AlwaysOnTop  
Type: `bool`

### Assets[​](options.html#assets "Direct link to heading")

Deprecated: Please use Assets on [AssetServer specific options](options.html#assetserver).

### AssetsHandler[​](options.html#assetshandler "Direct link to heading")

Deprecated: Please use AssetsHandler on [AssetServer specific options](options.html#assetserver).

### AssetServer[​](options.html#assetserver "Direct link to heading")

This defines AssetServer specific options. It allows to customize the AssetServer with static assets, serving assets dynamically with an `http.Handler` or hook into the request chain with an `assetserver.Middleware`.

Not all features of an `http.Request` are currently supported, please see the following feature matrix:

| Feature                 | Win | Mac | Lin                      |
|-------------------------|-----|-----|--------------------------|
| GET                     | ✅   | ✅   | ✅                        |
| POST                    | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| PUT                     | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| PATCH                   | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| DELETE                  | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| Request Headers         | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| Request Body            | ✅   | ✅   | ✅ [2](options.html#fn-2) |
| Request Body Streaming  | ✅   | ✅   | ✅ [2](options.html#fn-2) |
| Response StatusCodes    | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| Response Headers        | ✅   | ✅   | ✅ [1](options.html#fn-1) |
| Response Body           | ✅   | ✅   | ✅                        |
| Response Body Streaming | ❌   | ✅   | ✅                        |
| WebSockets              | ❌   | ❌   | ❌                        |
| HTTP Redirects 30x      | ✅   | ❌   | ❌                        |

Name: AssetServer  
Type: `*assetserver.Options`

#### Assets[​](options.html#assets-1 "Direct link to heading")

The static frontend assets to be used by the application.

A GET request is first tried to be served from this `fs.FS`. If the `fs.FS` returns `os.ErrNotExist` for that file, the request handling will fallback to the [Handler](options.html#handler) and tries to serve the GET request from it.

If set to nil, all GET requests will be forwarded to [Handler](options.html#handler).

Name: Assets  
Type: `fs.FS`

#### Handler[​](options.html#handler "Direct link to heading")

The assets handler is a generic `http.Handler` for fallback handling of assets that can't be found.

The handler will be called for every GET request that can't be served from [Assets](options.html#assets), due to `os.ErrNotExist`. Furthermore all non GET requests will always be served from this Handler. If not defined, the result is the following in cases where the Handler would have been called:

- GET request: `http.StatusNotFound`
- Other request: `http.StatusMethodNotAllowed`

info

This does not work with vite v5.0.0+ and wails v2 due to changes in vite. Changes are planned in v3 to support similar functionality under vite v5.0.0+. If you need this feature, stay with vite v4.0.0+. See [issue 3240](https://github.com/wailsapp/wails/issues/3240) for details

NOTE: When used in combination with a Frontend DevServer there might be limitations, eg. Vite serves the index.html on every path, that does not contain a file extension.

Name: AssetsHandler  
Type: `http.Handler`

#### Middleware[​](options.html#middleware "Direct link to heading")

Middleware is a HTTP Middleware which allows to hook into the AssetServer request chain. It allows to skip the default request handler dynamically, e.g. implement specialized Routing etc. The Middleware is called to build a new `http.Handler` used by the AssetSever and it also receives the default handler used by the AssetServer as an argument.

If not defined, the default AssetServer request chain is executed.

Name: Middleware  
Type: `assetserver.Middleware`

### Menu[​](options.html#menu "Direct link to heading")

The menu to be used by the application. More details about Menus in the [Menu Reference](runtime/menu.html).

note

On Mac, if no menu is specified, a default menu will be created.

Name: Menu  
Type: `*menu.Menu`

### Logger[​](options.html#logger "Direct link to heading")

The logger to be used by the application. More details about logging in the [Log Reference](runtime/log.html).

Name: Logger  
Type: `logger.Logger`  
Default: Logs to Stdout

### LogLevel[​](options.html#loglevel "Direct link to heading")

The default log level. More details about logging in the [Log Reference](runtime/log.html).

Name: LogLevel  
Type: `logger.LogLevel`  
Default: `Info` in dev mode, `Error` in production mode

### LogLevelProduction[​](options.html#loglevelproduction "Direct link to heading")

The default log level for production builds. More details about logging in the [Log Reference](runtime/log.html).

Name: LogLevelProduction  
Type: `logger.LogLevel`  
Default: `Error`

### OnStartup[​](options.html#onstartup "Direct link to heading")

This callback is called after the frontend has been created, but before `index.html` has been loaded. It is given the application context.

Name: OnStartup  
Type: `func(ctx context.Context)`

### OnDomReady[​](options.html#ondomready "Direct link to heading")

This callback is called after the frontend has loaded `index.html` and its resources. It is given the application context.

Name: OnDomReady  
Type: `func(ctx context.Context)`

### OnShutdown[​](options.html#onshutdown "Direct link to heading")

This callback is called after the frontend has been destroyed, just before the application terminates. It is given the application context.

Name: OnShutdown  
Type: `func(ctx context.Context)`

### OnBeforeClose[​](options.html#onbeforeclose "Direct link to heading")

If this callback is set, it will be called when the application is about to quit, either by clicking the window close button or calling `runtime.Quit`. Returning true will cause the application to continue, false will continue shutdown as normal. This is good for confirming with the user that they wish to exit the program.

Example:

windowsapp.go

```go
func (b *App) beforeClose(ctx context.Context) (prevent bool) {
    dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
        Type:          runtime.QuestionDialog,
        Title:         "Quit?",
        Message:       "Are you sure you want to quit?",
    })

    if err != nil {
        return false
    }
    return dialog != "Yes"
}
```

Name: OnBeforeClose  
Type: `func(ctx context.Context) bool`

### CSSDragProperty[​](options.html#cssdragproperty "Direct link to heading")

Indicates the CSS property to use to identify which elements can be used to drag the window. Default: `--wails-draggable`.

Name: CSSDragProperty  
Type: `string`

### CSSDragValue[​](options.html#cssdragvalue "Direct link to heading")

Indicates what value the `CSSDragProperty` style should have to drag the window. Default: `drag`.

Name: CSSDragValue  
Type: `string`

### EnableDefaultContextMenu[​](options.html#enabledefaultcontextmenu "Direct link to heading")

EnableDefaultContextMenu enables the browser's default context-menu in production.

By default, the browser's default context-menu is only available in development and in a `-debug` [build](cli.html#build) along with the devtools inspector, Using this option you can enable the default context-menu in `production` while the devtools inspector won't be available unless the `-devtools` build flag is used.

When this option is enabled, by default the context-menu will only be shown for text contexts (where Cut/Copy/Paste is needed), to override this behavior, you can use the CSS property `--default-contextmenu` on any HTML element (including the `body`) with the following values :

CSS StyleBehavior

`--default-contextmenu: auto;`(**default**) will show the default context menu only if :  
contentEditable is true OR text has been selected OR element is input or textarea

`--default-contextmenu: show;`will always show the default context menu

`--default-contextmenu: hide;`will always hide the default context menu

This rule is inherited like any normal CSS rule, so nesting works as expected.

note

This filtering functionality is only enabled in production, so in development and in debug build, the full context-menu is always available everywhere.

danger

This filtering functionality is NOT a security measure, the developer should expect that the full context-menu could be leaked anytime which could contain commands like (Download image, Reload, Save webpage), if this is a concern, the developer SHOULD NOT enable the default context-menu.

Name: EnableDefaultContextMenu  
Type: `bool`

### EnableFraudulentWebsiteDetection[​](options.html#enablefraudulentwebsitedetection "Direct link to heading")

EnableFraudulentWebsiteDetection enables scan services for fraudulent content, such as malware or phishing attempts. These services might send information from your app like URLs navigated to and possibly other content to cloud services of Apple and Microsoft.

Name: EnableFraudulentWebsiteDetection  
Type: `bool`

### DisablePanicRecovery[​](options.html#disablepanicrecovery "Direct link to heading")

DisablePanicRecovery disables the automatic recovery from panics in message processing. By default, Wails will recover from panics in message processing and log the error. If you want to handle panics yourself, set this to `true`.

Name: DisablePanicRecovery  
Type: `bool`

### Bind[​](options.html#bind "Direct link to heading")

A slice of struct instances defining methods that need to be bound to the frontend.

Name: Bind  
Type: `[]interface{}`

### EnumBind[​](options.html#enumbind "Direct link to heading")

A slice of Enum arrays that need to be bound to the frontend.

Name: EnumBind  
Type: `[]interface{}`

### ErrorFormatter[​](options.html#errorformatter "Direct link to heading")

A function that determines how errors are formatted when returned by a JS-to-Go method call. The returned value will be marshalled as JSON.

Name: ErrorFormatter  
Type: `func (error) any`

### SingleInstanceLock[​](options.html#singleinstancelock "Direct link to heading")

Enables single instance locking. This means that only one instance of your application can be running at a time.

Name: SingleInstanceLock  
Type: `*options.SingleInstanceLock`

#### UniqueId[​](options.html#uniqueid "Direct link to heading")

This id is used to generate the mutex name on Windows and macOS and the dbus name on Linux. Use a UUID to ensure that the id is unique.

Name: UniqueId  
Type: `string`

#### OnSecondInstanceLaunch[​](options.html#onsecondinstancelaunch "Direct link to heading")

Callback that is called when a second instance of your app is launched.

Name: OnSecondInstanceLaunch  
Type: `func(secondInstanceData SecondInstanceData)`

### Drag and Drop[​](options.html#drag-and-drop "Direct link to heading")

Defines the behavior of drag and drop events on the window.

Name: DragAndDrop  
Type: `options.DragAndDrop`

#### EnableFileDrop[​](options.html#enablefiledrop "Direct link to heading")

EnableFileDrop enables wails' drag and drop functionality that returns the dropped in files' absolute paths.

When it is set to `true` the [runtime methods](runtime/draganddrop.html) can be used.  
Or you can listen for the `wails:file-drop` event with [runtime EventsOn method](runtime/events.html#eventson) both on the Javascript and GO side to implement any functionality you would like.

The event returns the coordinates of the drop and a file path slice.

Name: EnableFileDrop  
Type: `bool`  
Default: `false`

#### DisableWebViewDrop[​](options.html#disablewebviewdrop "Direct link to heading")

Disables the webview's drag and drop functionality.

It can be used to prevent accidental opening of dragged in files in the webview, when there is no need for drag and drop.

Name: DisableWebViewDrop  
Type: `bool`  
Default: `false`

#### CSSDropProperty[​](options.html#cssdropproperty "Direct link to heading")

CSS property to test for drag and drop target elements.

Name: CSSDropProperty  
Type: `string`  
Default: `--wails-drop-target`

#### CSSDropValue[​](options.html#cssdropvalue "Direct link to heading")

The CSS Value that the CSSDropProperty must have to be a valid drop target. Default "drop"

Name: CSSDropValue  
Type: `string`  
Default: `drop`

### Windows[​](options.html#windows "Direct link to heading")

This defines [Windows specific options](options.html#windows).

Name: Windows  
Type: `*windows.Options`

#### WebviewIsTransparent[​](options.html#webviewistransparent "Direct link to heading")

Setting this to `true` will make the webview background transparent when an alpha value of `0` is used. This means that if you use `rgba(0,0,0,0)` for `background-color` in your CSS, the host window will show through. Often combined with [WindowIsTranslucent](options.html#WindowIsTranslucent) to make frosty-looking applications.

Name: WebviewIsTransparent  
Type: `bool`

#### WindowIsTranslucent[​](options.html#windowistranslucent "Direct link to heading")

Setting this to `true` will make the window background translucent. Often combined with [WebviewIsTransparent](options.html#WebviewIsTransparent).

For Windows 11 versions before build 22621, this will use the [BlurBehind](https://learn.microsoft.com/en-us/windows/win32/dwm/blur-ovw) method for translucency, which can be slow. For Windows 11 versions after build 22621, this will enable the newer translucency types that are much faster. By default, the type of translucency used will be determined by Windows. To configure this, use the [BackdropType](options.html#BackdropType) option.

Name: WindowIsTranslucent  
Type: `bool`

#### BackdropType[​](options.html#backdroptype "Direct link to heading")

note

Requires Windows 11 build 22621 or later.

Sets the translucency type of the window. This is only applicable if [WindowIsTranslucent](options.html#WindowIsTranslucent) is set to `true`.

Name: BackdropType  
Type `windows.BackdropType`

The value can be one of the following:

| Value   | Description                                                                               |
|---------|-------------------------------------------------------------------------------------------|
| Auto    | Let Windows decide which backdrop to use                                                  |
| None    | Do not use translucency                                                                   |
| Acrylic | Use [Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic) effect |
| Mica    | Use [Mica](https://learn.microsoft.com/en-us/windows/apps/design/style/mica) effect       |
| Tabbed  | Use Tabbed. This is a backdrop that is similar to Mica.                                   |

#### ZoomFactor[​](options.html#zoomfactor "Direct link to heading")

Name: ZoomFactor  
Type: `float64`

This defines the zoom factor for the WebView2. This is the option matching the Edge user activated zoom in or out.

#### IsZoomControlEnabled[​](options.html#iszoomcontrolenabled "Direct link to heading")

Name: IsZoomControlEnabled  
Type: `bool`

This enables the zoom factor to be changed by the user. Please note that the zoom factor can be set in the options while disallowing the user to change it at runtime (f.e. for a kiosk application or similar).

#### DisablePinchZoom[​](options.html#disablepinchzoom "Direct link to heading")

Setting this to `true` will disable pinch zoom gestures.

Name: DisablePinchZoom  
Type: `bool`

#### DisableWindowIcon[​](options.html#disablewindowicon "Direct link to heading")

Setting this to `true` will remove the icon in the top left corner of the title bar.

Name: DisableWindowIcon  
Type: `bool`

#### DisableFramelessWindowDecorations[​](options.html#disableframelesswindowdecorations "Direct link to heading")

Setting this to `true` will remove the window decorations in [Frameless](options.html#Frameless) mode. This means there will be no 'Aero Shadow' and no 'Rounded Corners' shown for the window. Please note that 'Rounded Corners' are only supported on Windows 11.

Name: DisableFramelessWindowDecorations  
Type: `bool`

#### WebviewUserDataPath[​](options.html#webviewuserdatapath "Direct link to heading")

This defines the path where the WebView2 stores the user data. If empty `%APPDATA%\[BinaryName.exe]` will be used.

Name: WebviewUserDataPath  
Type: `string`

#### WebviewBrowserPath[​](options.html#webviewbrowserpath "Direct link to heading")

This defines the path to a directory with WebView2 executable files and libraries. If empty, webview2 installed in the system will be used.

Important information about distribution of fixed version runtime:

- [How to get and extract runtime](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution#details-about-the-fixed-version-runtime-distribution-mode)
- [Known issues for fixed version](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution#known-issues-for-fixed-version)
- [The path of fixed version of the WebView2 Runtime should not contain \\Edge\\Application.](https://docs.microsoft.com/en-us/microsoft-edge/webview2/reference/win32/webview2-idl?view=webview2-1.0.1245.22#createcorewebview2environmentwithoptions)

Name: WebviewBrowserPath  
Type: `string`

#### Theme[​](options.html#theme "Direct link to heading")

Minimum Windows Version: Windows 10 2004/20H1

This defines the theme that the application should use:

| Value         | Description                                                                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| SystemDefault | *Default*. The theme will be based on the system default. If the user changes their theme, the application will update to use the new setting |
| Dark          | The application will use a dark theme exclusively                                                                                             |
| Light         | The application will use a light theme exclusively                                                                                            |

Name: Theme  
Type: `windows.Theme`

#### CustomTheme[​](options.html#customtheme "Direct link to heading")

note

Minimum Windows Version: Windows 10/11 2009/21H2 Build 22000

Allows you to specify custom colours for TitleBar, TitleText and Border for both light and dark mode, as well as when the window is active or inactive.

Name: CustomTheme  
Type: `windows.CustomTheme`

##### CustomTheme type[​](options.html#customtheme-type "Direct link to heading")

The CustomTheme struct uses `int32` to specify the colour values. These are in the standard(!) Windows format of: `0x00BBGGAA`. A helper function is provided to do RGB conversions into this format: `windows.RGB(r,g,b uint8)`.

NOTE: Any value not provided will default to black.

```go
type ThemeSettings struct {
    DarkModeTitleBar           int32
    DarkModeTitleBarInactive   int32
    DarkModeTitleText          int32
    DarkModeTitleTextInactive  int32
    DarkModeBorder             int32
    DarkModeBorderInactive     int32
    LightModeTitleBar          int32
    LightModeTitleBarInactive  int32
    LightModeTitleText         int32
    LightModeTitleTextInactive int32
    LightModeBorder            int32
    LightModeBorderInactive    int32
}
```

Example:

```go
    CustomTheme: &windows.ThemeSettings{
        // Theme to use when window is active
        DarkModeTitleBar:   windows.RGB(255, 0, 0),   // Red
        DarkModeTitleText:  windows.RGB(0, 255, 0),   // Green
        DarkModeBorder:     windows.RGB(0, 0, 255),   // Blue
        LightModeTitleBar:  windows.RGB(200, 200, 200),
        LightModeTitleText: windows.RGB(20, 20, 20),
        LightModeBorder:    windows.RGB(200, 200, 200),
        // Theme to use when window is inactive
        DarkModeTitleBarInactive:   windows.RGB(128, 0, 0),
        DarkModeTitleTextInactive:  windows.RGB(0, 128, 0),
        DarkModeBorderInactive:     windows.RGB(0, 0, 128),
        LightModeTitleBarInactive:  windows.RGB(100, 100, 100),
        LightModeTitleTextInactive: windows.RGB(10, 10, 10),
        LightModeBorderInactive:    windows.RGB(100, 100, 100),
    },
```

#### Messages[​](options.html#messages "Direct link to heading")

A struct of strings used by the webview2 installer if a valid webview2 runtime is not found.

Name: Messages  
Type: `*windows.Messages`

Customise this for any language you choose to support.

#### ResizeDebounceMS[​](options.html#resizedebouncems "Direct link to heading")

ResizeDebounceMS is the amount of time to debounce redraws of webview2 when resizing the window. The default value (0) will perform redraws as fast as it can.

Name: ResizeDebounceMS  
Type: `uint16`

#### OnSuspend[​](options.html#onsuspend "Direct link to heading")

If set, this function will be called when Windows initiates a switch to low power mode (suspend/hibernate)

Name: OnSuspend  
Type: `func()`

#### OnResume[​](options.html#onresume "Direct link to heading")

If set, this function will be called when Windows resumes from low power mode (suspend/hibernate)

Name: OnResume  
Type: `func()`

#### WebviewGpuIsDisabled[​](options.html#webviewgpuisdisabled "Direct link to heading")

Setting this to `true` will disable GPU hardware acceleration for the webview.

Name: WebviewGpuIsDisabled  
Type: `bool`

#### EnableSwipeGestures[​](options.html#enableswipegestures "Direct link to heading")

Setting this to `true` will enable swipe gestures for the webview.

Name: EnableSwipeGestures  
Type: `bool`

#### WindowClassName[​](options.html#windowclassname "Direct link to heading")

Class name for the window. If empty, 'wailsWindow' will be used.

Name: WindowClassName  
Type: `string`

### Mac[​](options.html#mac "Direct link to heading")

This defines [Mac specific options](options.html#mac).

Name: Mac  
Type: `*mac.Options`

#### TitleBar[​](options.html#titlebar "Direct link to heading")

The TitleBar struct provides the ability to configure the look and feel of the title bar.

Name: TitleBar  
Type: [`*mac.TitleBar`](options.html#titlebar-struct)

##### Titlebar struct[​](options.html#titlebar-struct "Direct link to heading")

The titlebar of the application can be customised by using the TitleBar options:

```go
type TitleBar struct {
    TitlebarAppearsTransparent bool
    HideTitle                  bool
    HideTitleBar               bool
    FullSizeContent            bool
    UseToolbar                 bool
    HideToolbarSeparator       bool
}
```

| Name                       | Description                                                                                                                                                                                                                          |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TitlebarAppearsTransparent | Makes the titlebar transparent. This has the effect of hiding the titlebar and the content fill the window. [Apple Docs](https://developer.apple.com/documentation/appkit/nswindow/1419167-titlebarappearstransparent?language=objc) |
| HideTitle                  | Hides the title of the window. [Apple Docs](https://developer.apple.com/documentation/appkit/nswindowtitlevisibility?language=objc)                                                                                                  |
| HideTitleBar               | Removes [NSWindowStyleMaskTitled](https://developer.apple.com/documentation/appkit/nswindowstylemask/nswindowstylemasktitled/) from the style mask                                                                                   |
| FullSizeContent            | Makes the webview fill the entire window. [Apple Docs](https://developer.apple.com/documentation/appkit/nswindowstylemask/nswindowstylemaskfullsizecontentview)                                                                      |
| UseToolbar                 | Adds a default toolbar to the window. [Apple Docs](https://developer.apple.com/documentation/appkit/nstoolbar?language=objc)                                                                                                         |
| HideToolbarSeparator       | Removes the line beneath the toolbar. [Apple Docs](https://developer.apple.com/documentation/appkit/nstoolbar/1516954-showsbaselineseparator?language=objc)                                                                          |

Preconfigured titlebar settings are available:

| Setting                     | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mac.TitleBarDefault()`     | ![](data:image/webp;base64,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) |
| `mac.TitleBarHidden()`      | ![](data:image/webp;base64,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)                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `mac.TitleBarHiddenInset()` | ![](data:image/webp;base64,UklGRtIJAABXRUJQVlA4IMYJAADwVgCdASpiBJgAPm02lkmkIyKhIXMJAIANiWdu65VS8RR2KZDX+N26U+E/JLod+hfpn6n+WbQ8/a5r+XL5u/7T1O+YL+ofS78wv7Ket76SP9d6gH8z/2vWa+g15bfss/uJ+1WZCxLy6uCP+vrYmmQtwGiQp2Ok5maO0HK94ZAkdCNJaxUqJWrwx3dj9iMlmdDmH7EZLKWW/eWMRkszolSr5tux+xGSzOiVKvm27H4IqVfNt2P2IyWUsuBuZnRKlXzbdj9iMlmc7Vr1AeXLKrKbYjJZnO1TgVMkB5TSO5wDceUkWGIIPHCIcjnsWqeD2rCzFDMHwgTbLSlalH4Eai/EN53bmFp7Sm4pKnSTRPTC21RAwmBGaxep+4Gc8o2D4HLCTaT9pQFigxAQa0CnTBMrO8N4AvTb2AVrtvOghsq25qc6Gmb1MWuLVmzAesL3NTnQ0zdbRfyFpc/wv1G+9mN4euhiYWXdjiUusE83f1U0PyPJ/hmLXFquGmb2tJi2LlzoaZvUwrakQ13YfK1avjJmaQ0H3vww1qT38A6nWeUxa4tVw0zepndqlrhmLXFquG4sP3BmrCkbZ5QUxcZg3qa56TFx7uK5Ji1xYxbb9TFr0fq27V0xarhp9+VJXpH57riEj0txSlTWRlcWrFy0gPUxSkAzu2fU8eC1ztd6JlquGnO+4Zj19TnRMoMOWgeiIYab/fUqjBS74e2RlctT2WkVw0ump7+CHi1JcCgRPCwP/i7bMJePiCYuLXFryb6zwOP2wUartZZwGia89zl8Dqhr5YHYPjaHUn9M9BBVBCTFfewwOyGeCP7e/ApRxl6QQ08sX1Pug1LvSdxYsCgXUxn7mLXFquGnO+4Zi1yqO3+7x+rh+SFyl3l2DQ7ry+4OSF2lFYPkSDq+qs0MTWEr4d20NncWuLVcNM/s3RFSBHbTAAD+5ndGjybuuX9Yc/cWfoRo+W41kGoceEZfUNmZCuloWu5y/Mp7YCjFFDRW/MfjDzd+XT9oN2kvjEcZ0B2UPI1lHO8GjuivKD5k/TtPFLJ10QlwJUJesHLkplDy1Va78zyH2+RPy6LkhcUCCnqwM9OX6+jOH7yLesEz7NG+aY0CkQLmD/ZFZQekcZFmCp+gPQaxzx5OyhTFtmN/j3MjroEb5AgBV+cUy1svkXixIexei/F+LC5YljS/xS+RdlEefOyRzwKFlOprrIsU677Hm6PJkwL2r3boAwQbs8BcAvR33PQAZMP1JJwhcyBWbEG4rwKUpEz1CYEyTu7FZYI6Qq6ZKrJ3DJCxkKbrKJA/laBNhGyMTC3ujt338IOmdhX2t5NPbGNnhlZ42vqo44rFXEeldkpib23aNngBTCKzfLYWR7T7Ma/vZgK2JyIwCm7kMIp4rOHKabq4zUwP7kxJlG1P9ieKAexBMe10APaT7aUijsBFyFDl/vtQ0impgIoAQ8c5NO1JZ++ufMbhvysmtgjYa3IsYudelimSVMJqhhetAYr00r+cMeAPGd5FoJhwjnatbLC0SNEbG/oWxA+wn5kSTynts09i1GWjilJgnKxK+XgG3tywCUhPxcAKJgURXVgwIAAAAFfJhohoxQHwxOapxNeXOeWWyMAU7YNGGxDGzUbPSJKiYOSa4nkGn+tpRdU5hp4U1P0IYFQJn/T6ayMjm+hEVxN76u6o27cTpYPhv6asQmMNEZQD/pEDE1SDr6NkKNxGic7ppeQHppUSgOzWjRXYOYUuhmvu43ICkEEL2fNoyk2/u20J4vhtieET48+2SSKGI8kXYPjzbQqFE/KUVQsY2eDRnHBrWJddqcfYNkA4Fa3b5VCx/fi7vjQSjtQt0LV1BWQGRRc2EgQFAblxnUZvrsaMMWGYEtzdqk1G3W8YWL+C4/0ik/gAudrbX5j0k9jTx2+PrYdSAxzw3Oz+mfdQbWWz+NvIhFRBj4YqWpQ09oiLezbW4MiRQUJT3Gck+rAod6r5puFco4MQpTFheagI+1Mvy+5yKuVApCL6wjiYxhSiAAUkc8tI+59bV0+kLFj+XvVO/6JPAy9VP+0dDWLISsOHkSGJ+ffwDluzi9MqLdu9wG2t84zeAJOJkTCfYB4+Bd5aZaSt3NbhRWBLr6aLAZKepXWzT1Jval/u22XMVzlK0kyDFP0ntoSPVsRSIgaTxMhBSRMPM3IAH8RmZENL22CHvI/kiA+ydo9tshNuDYoHOGr7lDnyAAWQXM8elCpShAPFpIAYQEeTFehAL969a/Rd6saKwRCnbtWbDpKXlqVgAQQQBdEb2yILkpWAAY3G0ICkH89M0UI4f2NkVggAZGOnvVKQYa4qhCjP2lAJ1EsRWdI27Xw6gABo+hE6Djw5Fjae48n/80a1xUCnh1663qVjqvTw+cwb7xz2EJ/tPTGVPciyrdvCtvlUh/ZR9mxGJ4JvyxcFZj5Yrkp6Qn1FCYyTY/fee9MrZJQSQ22mnEMPnuB6VPEJpg+GwLl5/6vY2EYIADWS/+8iYARSu2pCbWWJGcIopQxz/uNZeWQLqIN5SIb2gmJeckiA9U/95XW1pR4FpXsr+t9L6tw2juYQ1QsTv3DNcRLRXoHexmNbqOnzF6xmGIB8V/VcP8Mh5r8x+RVm7H5L+Lau7i11+RPUQfVoEnSs9ZohgZsEXmq7VRhSBX6H6NuiOszKqWPdPRVODrsB6rOmykluntJLbFHsB41ARtbSVyMBLcX7oxuCqsCtqkhMoJKfAokfzAavmz7RnPdTSQYfe9IkjUMkH+DsoQtQvobIxcn79pn+BA/R5JdJUygW4G0Agl7JRQcIGw7HRAIemRAkAAFN1YHyvEl6MqZZWN1e0lJfcEKM+wvYVqJnJZ/2SWxFMFCwnYSyTBzzw01CKgKMv1HMJgkU+PdNZDlS07s6KtM9XFC351OM8emjmYNdc/gphb6v6zs1Fd/vB5Zbth8mFQxMid7NjrJ1kMw4XHXaNu6NzBP30jP1Uo3z7CQ9dl/zBl3nB0W7Eam2nTx1/llIhwQgYEC7gwB1bKTGaip2A98yb6IJnsucFejggWSFzE3Z0qg4mZ9Vm99ZX5j2c8IaEGUNDqYRGaD0/EzH8GgLDzMu3pJ5qYUN+5eM83PMCtaB90sAzf4kuKGD4gsb7vpRSv/l47ifUEZq38s6svd8nhnP3IAA2ucDrpcJL6QHuVYIMT8VBHyaVtwiDQQWKp7K4WRbYNThnCEO5A0me0ud0e5r14Y+RVOdxtrTW7BLTtIHNg/k5yJnU63bb7Flmafil0nLrjcfqYT5hw6BnISn7lgFtqeAyCrA3zyQjua8QDC0O2MkoJ6oVI2cb7mq8y0GwdQAAAEUUdD3AAA=)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Example:

```go
Mac: &mac.Options{
    TitleBar:     mac.TitleBarHiddenInset(),
}
```

Click [here](https://github.com/lukakerr/NSWindowStyles) for some inspiration on customising the titlebar.

#### Appearance[​](options.html#appearance "Direct link to heading")

Appearance is used to set the style of your app in accordance with Apple's [NSAppearance](https://developer.apple.com/documentation/appkit/nsappearancename?language=objc) names.

Name: Appearance  
Type: [`mac.AppearanceType`](options.html#appearance-type)

##### Appearance type[​](options.html#appearance-type "Direct link to heading")

You can specify the application's [appearance](https://developer.apple.com/documentation/appkit/nsappearance?language=objc).

| Value                                                 | Description                                                     |
|-------------------------------------------------------|-----------------------------------------------------------------|
| DefaultAppearance                                     | DefaultAppearance uses the default system value                 |
| NSAppearanceNameAqua                                  | The standard light system appearance                            |
| NSAppearanceNameDarkAqua                              | The standard dark system appearance                             |
| NSAppearanceNameVibrantLight                          | The light vibrant appearance                                    |
| NSAppearanceNameAccessibilityHighContrastAqua         | A high-contrast version of the standard light system appearance |
| NSAppearanceNameAccessibilityHighContrastDarkAqua     | A high-contrast version of the standard dark system appearance  |
| NSAppearanceNameAccessibilityHighContrastVibrantLight | A high-contrast version of the light vibrant appearance         |
| NSAppearanceNameAccessibilityHighContrastVibrantDark  | A high-contrast version of the dark vibrant appearance          |

Example:

```go
Mac: &mac.Options{
    Appearance: mac.NSAppearanceNameDarkAqua,
}
```

#### WebviewIsTransparent[​](options.html#webviewistransparent-1 "Direct link to heading")

Setting this to `true` will make the webview background transparent when an alpha value of `0` is used. This means that if you use `rgba(0,0,0,0)` for `background-color` in your CSS, the host window will show through. Often combined with [WindowIsTranslucent](options.html#WindowIsTranslucent) to make frosty-looking applications.

Name: WebviewIsTransparent  
Type: `bool`

#### WindowIsTranslucent[​](options.html#windowistranslucent-1 "Direct link to heading")

Setting this to `true` will make the window background translucent. Often combined with [WebviewIsTransparent](options.html#WebviewIsTransparent) to make frosty-looking applications.

Name: WindowIsTranslucent  
Type: `bool`

#### OnFileOpen[​](options.html#onfileopen "Direct link to heading")

Callback that is called when a file is opened with the application.

Name: OnFileOpen  
Type: `func(filePath string)`

#### OnUrlOpen[​](options.html#onurlopen "Direct link to heading")

Callback that is called when a URL is opened with the application.

Name: OnUrlOpen  
Type: `func(filePath string)`

#### Preferences[​](options.html#preferences "Direct link to heading")

The Preferences struct provides the ability to configure the Webview preferences.

Name: Preferences  
Type: [`*mac.Preferences`](options.html#preferences-struct)

##### Preferences struct[​](options.html#preferences-struct "Direct link to heading")

You can specify the webview preferences.

```go
type Preferences struct {
    TabFocusesLinks        u.Bool
    TextInteractionEnabled u.Bool
    FullscreenEnabled      u.Bool
}
```

| Name                   | Description                                                                                                                                                                                                                  |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TabFocusesLinks        | A Boolean value that indicates whether pressing the tab key changes the focus to links and form controls. [Apple Docs](https://developer.apple.com/documentation/webkit/wkpreferences/2818595-tabfocuseslinks?language=objc) |
| TextInteractionEnabled | A Boolean value that indicates whether to allow people to select or otherwise interact with text. [Apple Docs](https://developer.apple.com/documentation/webkit/wkpreferences/3727362-textinteractionenabled?language=objc)  |
| FullscreenEnabled      | A Boolean value that indicates whether a web view can display content full screen. [Apple Docs](https://developer.apple.com/documentation/webkit/wkpreferences/3917769-elementfullscreenenabled?language=objc)               |

Example:

```go
Mac: &mac.Options{
    Preferences: &mac.Preferences{
        TabFocusesLinks:        mac.Enabled,
        TextInteractionEnabled: mac.Disabled,
        FullscreenEnabled:      mac.Enabled,
    }
}
```

#### About[​](options.html#about "Direct link to heading")

This configuration lets you set the title, message and icon for the "About" menu item in the app menu created by the "AppMenu" role.

Name: About  
Type: [`*mac.AboutInfo`](options.html#about-struct)

##### About struct[​](options.html#about-struct "Direct link to heading")

```go

type AboutInfo struct {
    Title   string
    Message string
    Icon    []byte
}
```

If these settings are provided, an "About" menu item will appear in the app menu (when using the `AppMenu` role). Given this configuration:

```go
//go:embed build/appicon.png
var icon []byte

func main() {
    err := wails.Run(&options.App{
        ...
        Mac: &mac.Options{
            About: &mac.AboutInfo{
                Title:   "My Application",
                Message: "© 2021 Me",
                Icon:    icon,
            },
        },
    })
```

The "About" menu item will appear in the app menu:

![](data:image/webp;base64,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)

When clicked, that will open an about message box:

![](data:image/webp;base64,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)

### Linux[​](options.html#linux "Direct link to heading")

This defines [Linux specific options](options.html#linux).

Name: Linux  
Type: `*linux.Options`

#### Icon[​](options.html#icon "Direct link to heading")

Sets up the icon representing the window. This icon is used when the window is minimized (also known as iconified).

Name: Icon  
Type: `[]byte`

Some window managers or desktop environments may also place it in the window frame, or display it in other contexts. On others, the icon is not used at all, so your mileage may vary.

NOTE: Gnome on Wayland at least does not display this icon. To have a application icon there, a `.desktop` file has to be used. On KDE it should work.

The icon should be provided in whatever size it was naturally drawn; that is, don’t scale the image before passing it. Scaling is postponed until the last minute, when the desired final size is known, to allow best quality.

#### WindowIsTranslucent[​](options.html#windowistranslucent-2 "Direct link to heading")

Setting this to `true` will make the window background translucent. Some window managers may ignore it, or result in a black window.

Name: WindowIsTranslucent  
Type: `bool`

#### WebviewGpuPolicy[​](options.html#webviewgpupolicy "Direct link to heading")

This option is used for determining the webview's hardware acceleration policy.

Name: WebviewGpuPolicy  
Type: [`options.WebviewGpuPolicy`](options.html#webviewgpupolicy-type)  
Default: `WebviewGpuPolicyAlways`

##### WebviewGpuPolicy type[​](options.html#webviewgpupolicy-type "Direct link to heading")

| Value                    | Description                                                          |
|--------------------------|----------------------------------------------------------------------|
| WebviewGpuPolicyAlways   | Hardware acceleration is always enabled                              |
| WebviewGpuPolicyOnDemand | Hardware acceleration is enabled/disabled as request by web contents |
| WebviewGpuPolicyNever    | Hardware acceleration is always disabled                             |

#### ProgramName[​](options.html#programname "Direct link to heading")

This option is used to set the program's name for the window manager via GTK's g\_set\_prgname(). This name should not be localized, [see the docs](https://docs.gtk.org/glib/func.set_prgname.html).

When a .desktop file is created this value helps with window grouping and desktop icons when the .desktop file's `Name` property differs form the executable's filename.

Name: ProgramName  
Type: string

### Debug[​](options.html#debug "Direct link to heading")

This defines [Debug specific options](options.html#Debug) that apply to debug builds.

Name: Debug  
Type: `options.Debug`

#### OpenInspectorOnStartup[​](options.html#openinspectoronstartup "Direct link to heading")

Setting this to `true` will open the WebInspector on startup of the application.

Name: OpenInspectorOnStartup  
Type: `bool`

* * *

1. This requires WebKit2GTK 2.36+ support and your app needs to be build with the build tag `webkit2_36` to activate support for this feature. This also bumps the minimum requirement of WebKit2GTK to 2.36 for your app.[↩](options.html#fnref-1)
2. This requires WebKit2GTK 2.40+ support and your app needs to be build with the build tag `webkit2_40` to activate support for this feature. This also bumps the minimum requirement of WebKit2GTK to 2.40 for your app.[↩](options.html#fnref-2)

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/options.mdx)

[Previous  
\
CLI](cli.html)

[Next  
\
Menus](menus.html)

Project Config | Wails

[Skip to main content](project-config.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/reference/project-config) (v2.10).

- [](https://wails.io/)
- Reference
- Project Config

Version: Next Version 🚧

# Project Config

The project config resides in the `wails.json` file in the project directory. The structure of the config is:

```json5
{
  // Project config version
  "version": "",
  // The project name
  "name": "",
  // Relative path to the directory containing the compiled assets, this is normally inferred and could be left empty
  "assetdir": "",
  // Additional directories to trigger reloads (comma separated), this is only used for some advanced asset configurations
  "reloaddirs": "",
  // The directory where the build files reside. Defaults to 'build'
  "build:dir": "",
  // Relative path to the frontend directory. Defaults to 'frontend'
  "frontend:dir": "",
  // The command to install node dependencies, run in the frontend directory - often `npm install`
  "frontend:install": "",
  // The command to build the assets, run in the frontend directory - often `npm run build`
  "frontend:build": "",
  // This command has been replaced by frontend:dev:build. If frontend:dev:build is not specified will falls back to this command. \nIf this command is also not specified will falls back to frontend:build
  "frontend:dev": "",
  // This command is the dev equivalent of frontend:build. If not specified falls back to frontend:dev
  "frontend:dev:build": "",
  // This command is the dev equivalent of frontend:install. If not specified falls back to frontend:install
  "frontend:dev:install": "",
  // This command is run in a separate process on `wails dev`. Useful for 3rd party watchers or starting 3d party dev servers
  "frontend:dev:watcher": "",
  // URL to a 3rd party dev server to be used to serve assets, EG Vite. \nIf this is set to 'auto' then the devServerUrl will be inferred from the Vite output
  "frontend:dev:serverUrl": "",
  // Relative path to the directory that the auto-generated JS modules will be created
  "wailsjsdir": "",
  // The name of the binary
  "outputfilename": "",
  // The default time the dev server waits to reload when it detects a change in assets
  "debounceMS": 100,
  // Address to bind the wails dev sever to. Default: localhost:34115
  "devServer": "",
  // Arguments passed to the application in shell style when in dev mode
  "appargs": "",
  // Defines if build hooks should be run though they are defined for an OS other than the host OS.
  "runNonNativeBuildHooks": false,
  "preBuildHooks": {
    // The command that will be executed before a build of the specified GOOS/GOARCH: ${platform} is replaced with the "GOOS/GOARCH". The "GOOS/GOARCH" hook is executed before the "GOOS/*" and "*/*" hook.
    "GOOS/GOARCH": "",
    // The command that will be executed before a build of the specified GOOS: ${platform} is replaced with the "GOOS/GOARCH". The "GOOS/*" hook is executed before the "*/*" hook.
    "GOOS/*": "",
    // The command that will be executed before every build: ${platform} is replaced with the "GOOS/GOARCH".
    "*/*": ""
  },
  "postBuildHooks": {
    // The command that will be executed after a build of the specified GOOS/GOARCH: ${platform} is replaced with the "GOOS/GOARCH" and ${bin} with the path to the compiled binary. The "GOOS/GOARCH" hook is executed before the "GOOS/*" and "*/*" hook.
    "GOOS/GOARCH": "",
    // The command that will be executed after a build of the specified GOOS: ${platform} is replaced with the "GOOS/GOARCH" and ${bin} with the path to the compiled binary. The "GOOS/*" hook is executed before the "*/*" hook.
    "GOOS/*": "",
    // The command that will be executed after every build: ${platform} is replaced with the "GOOS/GOARCH" and ${bin} with the path to the compiled binary.
    "*/*": ""
  },
  // Data used to populate manifests and version info.
  "info": {
    // The company name. Default: [The project name]
    "companyName": "",
    // The product name. Default: [The project name]
    "productName": "",
    // The version of the product. Default: '1.0.0'
    "productVersion": "",
    // The copyright of the product. Default: 'Copyright.........'
    "copyright": "",
    // A short comment of the app. Default: 'Built using Wails (https://wails.app)'
    "comments": "",
    // File associations for the app
    "fileAssociations": [
      {
        // The extension (minus the leading period). e.g. png
        "ext": "wails",
        // The name. e.g. PNG File
        "name": "Wails",
        // Windows-only. The description. It is displayed on the `Type` column on Windows Explorer.
        "description": "Wails file",
        // The icon name without extension. Icons should be located in build folder. Proper icons will be generated from .png file for both macOS and Windows)
        "iconName": "fileIcon",
        // macOS-only. The app’s role with respect to the type. Corresponds to CFBundleTypeRole.
        "role": "Editor"
      },
    ],
    // Custom URI protocols that should be opened by the application
    "protocols": [
      {
        // protocol scheme. e.g. myapp
        "scheme": "myapp",
        // Windows-only. The description. It is displayed on the `Type` column on Windows Explorer.
        "description": "Myapp protocol",
        // macOS-only. The app’s role with respect to the type. Corresponds to CFBundleTypeRole.
        "role": "Editor"
      }
    ]
  },
  // 'multiple': One installer per architecture. 'single': Single universal installer for all architectures being built. Default: 'multiple'
  "nsisType": "",
  // Whether the app should be obfuscated. Default: false
  "obfuscated": "",
  // The arguments to pass to the garble command when using the obfuscated flag
  "garbleargs": "",
  // Bindings configurations
  "bindings": {
    // model.ts file generation config
    "ts_generation": {
      // All generated JavaScript entities will be prefixed with this value
      "prefix": "",
      // All generated JavaScript entities will be suffixed with this value
      "suffix": "",
      // Type of output to generate (classes|interfaces)
      "outputType": "classes",
    }
  }
}
```

This file is read by the Wails CLI when running `wails build` or `wails dev`.

The `assetdir`, `reloaddirs`, `wailsjsdir`, `debounceMS`, `devserver` and `frontenddevserverurl` flags in `wails build/dev` will update the project config and thus become defaults for subsequent runs.

The JSON Schema for this file is located [here](https://wails.io/schemas/config.v2.json).

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/reference/project-config.mdx)

[Previous  
\
Menus](menus.html)

[Next  
\
BulletinBoard](../community/showcase/bulletinboard.html)