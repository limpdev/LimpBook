[Skip to main content](angular.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/angular) (v2.10).

- [](https://wails.io/)
- Guides
- Angular

Version: Next Version 🚧

On this page

# Angular

Whilst Wails does not have an Angular template, it is possible to use Angular with Wails.

## Dev Mode[​](angular.html#dev-mode "Direct link to heading")

To get dev mode working with Angular, you need to add the following to your `wails.json`:

```json
  "frontend:build": "npx ng build",
  "frontend:install": "npm install",
  "frontend:dev:watcher": "npx ng serve",
  "frontend:dev:serverUrl": "http://localhost:4200",
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/angular.mdx)

[Previous  
\
Links](../community/links.html)

[Next  
\
Application Development](application-development.html)

Application Development | Wails

[Skip to main content](application-development.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/application-development) (v2.10).

- [](https://wails.io/)
- Guides
- Application Development

Version: Next Version 🚧

On this page

# Application Development

There are no hard and fast rules for developing applications with Wails, but there are some basic guidelines.

## Application Setup[​](application-development.html#application-setup "Direct link to heading")

The pattern used by the default templates are that `main.go` is used for configuring and running the application, whilst `app.go` is used for defining the application logic.

The `app.go` file will define a struct that has 2 methods which act as hooks into the main application:

app.go

```go
type App struct {
    ctx context.Context
}

func NewApp() *App {
    return &App{}
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {
}
```

- The startup method is called as soon as Wails allocates the resources it needs and is a good place for creating resources, setting up event listeners and anything else the application needs at startup. It is given a `context.Context` which is usually saved in a struct field. This context is needed for calling the [runtime](../reference/runtime/intro.html). If this method returns an error, the application will terminate. In dev mode, the error will be output to the console.
- The shutdown method will be called by Wails right at the end of the shutdown process. This is a good place to deallocate memory and perform any shutdown tasks.

The `main.go` file generally consists of a single call to `wails.Run()`, which accepts the application configuration. The pattern used by the templates is that before the call to `wails.Run()`, an instance of the struct we defined in `app.go` is created and saved in a variable called `app`. This configuration is where we add our callbacks:

main.go

```go
func main() {

    app := NewApp()

    err := wails.Run(&options.App{
        Title:             "My App",
        Width:             800,
        Height:            600,
        OnStartup:  app.startup,
        OnShutdown: app.shutdown,
    })
    if err != nil {
        log.Fatal(err)
    }
}

```

More information on application lifecycle hooks can be found [here](../howdoesitwork.html#application-lifecycle-callbacks).

## Binding Methods[​](application-development.html#binding-methods "Direct link to heading")

It is likely that you will want to call Go methods from the frontend. This is normally done by adding public methods to the already defined struct in `app.go`:

app.go

```go
type App struct {
    ctx context.Context
}

func NewApp() *App {
    return &App{}
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {
}

func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s!", name)
}
```

In the main application configuration, the `Bind` key is where we can tell Wails what we want to bind:

main.go

```go
func main() {

    app := NewApp()

    err := wails.Run(&options.App{
        Title:             "My App",
        Width:             800,
        Height:            600,
        OnStartup:  app.startup,
        OnShutdown: app.shutdown,
        Bind: []interface{}{
            app,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}

```

This will bind all public methods in our `App` struct (it will never bind the startup and shutdown methods).

### Dealing with context when binding multiple structs[​](application-development.html#dealing-with-context-when-binding-multiple-structs "Direct link to heading")

If you want to bind methods for multiple structs but want each struct to keep a reference to the context so that you can use the runtime functions, a good pattern is to pass the context from the `OnStartup` method to your struct instances :

```go
func main() {

    app := NewApp()
    otherStruct := NewOtherStruct()

    err := wails.Run(&options.App{
        Title:             "My App",
        Width:             800,
        Height:            600,
        OnStartup:  func(ctx context.Context){
            app.SetContext(ctx)
            otherStruct.SetContext(ctx)
        },
        OnShutdown: app.shutdown,
        Bind: []interface{}{
            app,
            otherStruct
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}
```

Also you might want to use Enums in your structs and have models for them on frontend. In that case you should create array that will contain all possible enum values, instrument enum type and bind it to the app:

app.go

```go
type Weekday string

const (
    Sunday    Weekday = "Sunday"
    Monday    Weekday = "Monday"
    Tuesday   Weekday = "Tuesday"
    Wednesday Weekday = "Wednesday"
    Thursday  Weekday = "Thursday"
    Friday    Weekday = "Friday"
    Saturday  Weekday = "Saturday"
)

var AllWeekdays = []struct {
    Value  Weekday
    TSName string
}{
    {Sunday, "SUNDAY"},
    {Monday, "MONDAY"},
    {Tuesday, "TUESDAY"},
    {Wednesday, "WEDNESDAY"},
    {Thursday, "THURSDAY"},
    {Friday, "FRIDAY"},
    {Saturday, "SATURDAY"},
}
```

In the main application configuration, the `EnumBind` key is where we can tell Wails what we want to bind enums as well:

main.go

```go
func main() {

    app := NewApp()

    err := wails.Run(&options.App{
        Title:             "My App",
        Width:             800,
        Height:            600,
        OnStartup:  app.startup,
        OnShutdown: app.shutdown,
    Bind: []interface{}{
        app,
    },
    EnumBind: []interface{}{
        AllWeekdays,
     },
    })
    if err != nil {
        log.Fatal(err)
    }
}

```

This will add missing enums to your `model.ts` file.

More information on Binding can be found [here](../howdoesitwork.html#method-binding).

## Application Menu[​](application-development.html#application-menu "Direct link to heading")

Wails supports adding a menu to your application. This is done by passing a [Menu](../reference/menus.html#menu) struct to application config. It's common to use a method that returns a Menu, and even more common for that to be a method on the `App` struct used for the lifecycle hooks.

main.go

```go
func main() {

    app := NewApp()

    err := wails.Run(&options.App{
        Title:             "My App",
        Width:             800,
        Height:            600,
        OnStartup:  app.startup,
        OnShutdown: app.shutdown,
        Menu:       app.menu(),
        Bind: []interface{}{
            app,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}

```

## Assets[​](application-development.html#assets "Direct link to heading")

The great thing about the way Wails v2 handles assets is that it doesn't! The only thing you need to give Wails is an `embed.FS`. How you get to that is entirely up to you. You can use vanilla html/css/js files like the vanilla template. You could have some complicated build system, it doesn't matter.

When `wails build` is run, it will check the `wails.json` project file at the project root. There are 2 keys in the project file that are read:

- "frontend:install"
- "frontend:build"

The first, if given, will be executed in the `frontend` directory to install the node modules. The second, if given, will be executed in the `frontend` directory to build the frontend project.

If these 2 keys aren't given, then Wails does absolutely nothing with the frontend. It is only expecting that `embed.FS`.

### AssetsHandler[​](application-development.html#assetshandler "Direct link to heading")

A Wails v2 app can optionally define a `http.Handler` in the `options.App`, which allows hooking into the AssetServer to create files on the fly or process POST/PUT requests. GET requests are always first handled by the `assets` FS. If the FS doesn't find the requested file the request will be forwarded to the `http.Handler` for serving. Any requests other than GET will be directly processed by the `AssetsHandler` if specified. It's also possible to only use the `AssetsHandler` by specifying `nil` as the `Assets` option.

## Built in Dev Server[​](application-development.html#built-in-dev-server "Direct link to heading")

Running `wails dev` will start the built in dev server which will start a file watcher in your project directory. By default, if any file changes, wails checks if it was an application file (default: `.go`, configurable with `-e` flag). If it was, then it will rebuild your application and relaunch it. If the changed file was in the assets, it will issue a reload after a short amount of time.

The dev server uses a technique called "debouncing" which means it doesn't reload straight away, as there may be multiple files changed in a short amount of time. When a trigger occurs, it waits for a set amount of time before issuing a reload. If another trigger happens, it resets to the wait time again. By default this value is `100ms`. If this value doesn't work for your project, it can be configured using the `-debounce` flag. If used, this value will be saved to your project config and become the default.

## External Dev Server[​](application-development.html#external-dev-server "Direct link to heading")

Some frameworks come with their own live-reloading server, however they will not be able to take advantage of the Wails Go bindings. In this scenario, it is best to run a watcher script that rebuilds the project into the build directory, which Wails will be watching. For an example, see the default svelte template that uses [rollup](https://rollupjs.org/guide/en/).

### Create React App[​](application-development.html#create-react-app "Direct link to heading")

The process for a Create-React-App project is slightly more complicated. In order to support live frontend reloading the following configuration needs to be added to your `wails.json`:

```json
  "frontend:dev:watcher": "yarn start",
  "frontend:dev:serverUrl": "http://localhost:3000",
```

The `frontend:dev:watcher` command will start the Create-React-App development server (hosted on port `3000` typically). The `frontend:dev:serverUrl` command then instructs Wails to serve assets from the development server when loading the frontend rather than from the build folder. In addition to the above, the `index.html` needs to be updated with the following:

```html
    <head>
        <meta name="wails-options" content="noautoinject" />
        <script src="/wails/ipc.js"></script>
        <script src="/wails/runtime.js"></script>
    </head>
```

This is required as the watcher command that rebuilds the frontend prevents Wails from injecting the required scripts. This circumvents that issue by ensuring the scripts are always injected. With this configuration, `wails dev` can be run which will appropriately build the frontend and backend with hot-reloading enabled. Additionally, when accessing the application from a browser the React developer tools can now be used on a non-minified version of the application for straightforward debugging. Finally, for faster builds, `wails dev -s` can be run to skip the default building of the frontend by Wails as this is an unnecessary step.

## Go Module[​](application-development.html#go-module "Direct link to heading")

The default Wails templates generate a `go.mod` file that contains the module name "changeme". You should change this to something more appropriate after project generation.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/application-development.mdx)

[Previous  
\
Angular](angular.html)

[Next  
\
Crossplatform build with Github Actions](crossplatform-build.html)

Crossplatform build with Github Actions | Wails

[Skip to main content](crossplatform-build.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/crossplatform-build) (v2.10).

- [](https://wails.io/)
- Guides
- Crossplatform build with Github Actions

Version: Next Version 🚧

# Crossplatform build with Github Actions

To build a Wails project for all the available platforms, you need to create an application build for each operating system. One effective method to achieve this is by utilizing GitHub Actions.

An action that facilitates building a Wails app is available at: [https://github.com/dAppServer/wails-build-action](https://github.com/dAppServer/wails-build-action)

In case the existing action doesn't fulfill your requirements, you can select only the necessary steps from the source: [https://github.com/dAppServer/wails-build-action/blob/main/action.yml](https://github.com/dAppServer/wails-build-action/blob/main/action.yml)

Below is a comprehensive example that demonstrates building an app upon the creation of a new Git tag and subsequently uploading it to the Actions artifacts:

```yaml
name: Wails build

on:
  push:
    tags:
    # Match any new tag
      - '*'

env:
  # Necessary for most environments as build failure can occur due to OOM issues
  NODE_OPTIONS: "--max-old-space-size=4096"

jobs:
  build:
    strategy:
    # Failure in one platform build won't impact the others
      fail-fast: false
      matrix:
        build:
          - name: 'App'
            platform:  'linux/amd64'
            os: 'ubuntu-latest'
          - name: 'App'
            platform:  'windows/amd64'
            os: 'windows-latest'
          - name: 'App'
            platform:  'darwin/universal'
            os: 'macos-latest'

    runs-on: ${{ matrix.build.os }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          submodules: recursive

      - name: Build wails
        uses: dAppServer/wails-build-[email protected]
        id: build
        with:
          build-name: ${{ matrix.build.name }}
          build-platform: ${{ matrix.build.platform }}
          package: false
          go-version: '1.20'
```

This example offers opportunities for various enhancements, including:

- Caching dependencies
- Code signing
- Uploading to platforms like S3, Supabase, etc.
- Injecting secrets as environment variables
- Utilizing environment variables as build variables (such as version variable extracted from the current Git tag)

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/crossplatform-build.mdx)

[Previous  
\
Application Development](application-development.html)

[Next  
\
Custom Protocol Scheme association](custom-protocol-schemes.html)

Custom Protocol Scheme association | Wails

[Skip to main content](custom-protocol-schemes.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/custom-protocol-schemes) (v2.10).

- [](https://wails.io/)
- Guides
- Custom Protocol Scheme association

Version: Next Version 🚧

On this page

# Custom Protocol Scheme association

Custom Protocols feature allows you to associate specific custom protocol with your app so that when users open links with this protocol, your app is launched to handle them. This can be particularly useful to connect your desktop app with your web app. In this guide, we'll walk through the steps to implement custom protocols in Wails app.

## Set Up Custom Protocol Schemes Association:[​](custom-protocol-schemes.html#set-up-custom-protocol-schemes-association "Direct link to heading")

To set up custom protocol, you need to modify your application's wails.json file. In "info" section add a "protocols" section specifying the protocols your app should be associated with.

For example:

```json
{
  "info": {
    "protocols": [
      {
        "scheme": "myapp",
        "description": "My App Protocol",
        "role": "Editor"
      }
    ]
  }
}
```

| Property    | Description                                                                           |
|:------------|:--------------------------------------------------------------------------------------|
| scheme      | Custom Protocol scheme. e.g. myapp                                                    |
| description | Windows-only. The description.                                                        |
| role        | macOS-only. The app’s role with respect to the type. Corresponds to CFBundleTypeRole. |

## Platform Specifics:[​](custom-protocol-schemes.html#platform-specifics "Direct link to heading")

### macOS[​](custom-protocol-schemes.html#macos "Direct link to heading")

When you open custom protocol with your app, the system will launch your app and call the `OnUrlOpen` function in your Wails app. Example:

main.go

```go
func main() {
    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        Mac: &mac.Options{
            OnUrlOpen: func(url string) { println(url) },
        },
        Bind: []interface{}{
            app,
        },
    })

    if err != nil {
        println("Error:", err.Error())
    }
}
```

### Windows[​](custom-protocol-schemes.html#windows "Direct link to heading")

On Windows Custom Protocol Schemes is supported only with NSIS installer. During installation, the installer will create a registry entry for your schemes. When you open url with your app, new instance of app is launched and url is passed as argument to your app. To handle this you should parse command line arguments in your app. Example:

main.go

```go
func main() {
    argsWithoutProg := os.Args[1:]

    if len(argsWithoutProg) != 0 {
    println("launchArgs", argsWithoutProg)
  }
}
```

You also can enable single instance lock for your app. In this case, when you open url with your app, new instance of app is not launched and arguments are passed to already running instance. Check single instance lock guide for details. Example:

main.go

```go
func main() {
    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        SingleInstanceLock: &options.SingleInstanceLock{
            UniqueId:               "e3984e08-28dc-4e3d-b70a-45e961589cdc",
            OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
        },
        Bind: []interface{}{
            app,
        },
    })
}
```

### Linux[​](custom-protocol-schemes.html#linux "Direct link to heading")

Currently, Wails doesn't support bundling for Linux. So, you need to create file associations manually. For example if you distribute your app as a .deb package, you can create file associations by adding required files in you bundle. You can use [nfpm](https://nfpm.goreleaser.com/) to create .deb package for your app.

1. Create a .desktop file for your app and specify file associations there (note that `%u` is important in Exec). Example:

```ini
[Desktop Entry]
Categories=Office
Exec=/usr/bin/wails-open-file %u
Icon=wails-open-file.png
Name=wails-open-file
Terminal=false
Type=Application
MimeType=x-scheme-handler/myapp;
```

2. Prepare postInstall/postRemove scripts for your package. Example:

```sh
# reload desktop database to load app in list of available
update-desktop-database /usr/share/applications
```

3. Configure nfpm to use your scripts and files. Example:

```yaml
name: "wails-open-file"
arch: "arm64"
platform: "linux"
version: "1.0.0"
section: "default"
priority: "extra"
maintainer: "FooBarCorp <[email protected]>"
description: "Sample Package"
vendor: "FooBarCorp"
homepage: "http://example.com"
license: "MIT"
contents:
- src: ../bin/wails-open-file
  dst: /usr/bin/wails-open-file
- src: ./main.desktop
  dst: /usr/share/applications/wails-open-file.desktop
- src: ../appicon.svg
  dst: /usr/share/icons/hicolor/scalable/apps/wails-open-file.svg
# copy icons to Yaru theme as well. For some reason Ubuntu didn't pick up fileicons from hicolor theme
- src: ../appicon.svg
  dst: /usr/share/icons/Yaru/scalable/apps/wails-open-file.svg
scripts:
  postinstall: ./postInstall.sh
  postremove: ./postRemove.sh
```

6. Build your .deb package using nfpm:

```sh
nfpm pkg --packager deb --target .
```

7. Now when your package is installed, your app will be associated with custom protocol scheme. When you open url with your app, new instance of app is launched and file path is passed as argument to your app. To handle this you should parse command line arguments in your app. Example:

main.go

```go
func main() {
    argsWithoutProg := os.Args[1:]

    if len(argsWithoutProg) != 0 {
    println("launchArgs", argsWithoutProg)
  }
}
```

You also can enable single instance lock for your app. In this case, when you open url with your app, new instance of app is not launched and arguments are passed to already running instance. Check single instance lock guide for details. Example:

main.go

```go
func main() {
    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        SingleInstanceLock: &options.SingleInstanceLock{
            UniqueId:               "e3984e08-28dc-4e3d-b70a-45e961589cdc",
            OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
        },
        Bind: []interface{}{
            app,
        },
    })
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/custom-protocol-schemes.mdx)

[Previous  
\
Crossplatform build with Github Actions](crossplatform-build.html)

[Next  
\
Dynamic Assets](dynamic-assets.html)

Dynamic Assets | Wails

[Skip to main content](dynamic-assets.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/dynamic-assets) (v2.10).

- [](https://wails.io/)
- Guides
- Dynamic Assets

Version: Next Version 🚧

On this page

# Dynamic Assets

info

This does not work with vite v5.0.0+ and wails v2 due to changes in vite. Changes are planned in v3 to support similar functionality under vite v5.0.0+. If you need this feature, stay with vite v4.0.0+. See [issue 3240](https://github.com/wailsapp/wails/issues/3240) for details

If you want to load or generate assets for your frontend dynamically, you can achieve that using the [AssetsHandler](../reference/options.html#assetshandler) option. The AssetsHandler is a generic `http.Handler` which will be called for any non GET request on the assets server and for GET requests which can not be served from the bundled assets because the file is not found.

By installing a custom AssetsHandler, you can serve your own assets using a custom asset server.

## Example[​](dynamic-assets.html#example "Direct link to heading")

In our example project, we will create a simple assets handler which will load files off disk:

main.go

```go
package main

import (
    "embed"
    "fmt"
    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
    "github.com/wailsapp/wails/v2/pkg/options/assetserver"
    "net/http"
    "os"
    "strings"
)

//go:embed all:frontend/dist
var assets embed.FS

type FileLoader struct {
    http.Handler
}

func NewFileLoader() *FileLoader {
    return &FileLoader{}
}

func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
    var err error
    requestedFilename := strings.TrimPrefix(req.URL.Path, "/")
    println("Requesting file:", requestedFilename)
    fileData, err := os.ReadFile(requestedFilename)
    if err != nil {
        res.WriteHeader(http.StatusBadRequest)
        res.Write([]byte(fmt.Sprintf("Could not load file %s", requestedFilename)))
    }

    res.Write(fileData)
}

func main() {
    // Create an instance of the app structure
    app := NewApp()

    // Create application with options
    err := wails.Run(&options.App{
        Title:  "helloworld",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets:  assets,
            Handler: NewFileLoader(),
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 255},
        OnStartup:        app.startup,
        Bind: []interface{}{
            app,
        },
    })

    if err != nil {
        println("Error:", err)
    }
}
```

When we run the application in dev mode using `wails dev`, we will see the following output:

```text
DEB | [ExternalAssetHandler] Loading 'http://localhost:3001/favicon.ico'
DEB | [ExternalAssetHandler] Loading 'http://localhost:3001/favicon.ico' failed, using AssetHandler
Requesting file: favicon.ico
```

As you can see, the assets handler is called when the default assets server is unable to serve the `favicon.ico` file.

If you right click the main application and select "inspect" to bring up the devtools, you can test this feature out by typing the following into the console:

```text
let response = await fetch('does-not-exist.txt');
```

This will generate an error in the devtools. We can see that the error is what we expect, returned by our custom assets handler:

![](data:image/webp;base64,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)

However, if we request `go.mod`, we will see the following output:

![](../../../assets/images/assetshandler-go-mod-f2ca45f1d752ee9349462108d829e185.webp)

This technique can be used to load images directly into the page. If we updated our default vanilla template and replaced the logo image:

```html
<img id="logo" class="logo" />
```

with:

```html
<img src="build/appicon.png" style="width: 300px" />
```

Then we would see the following:

![](data:image/webp;base64,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)

danger

Exposing your filesystem in this way is a security risk. It is recommended that you properly manage access to your filesystem.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/dynamic-assets.mdx)

[Previous  
\
Custom Protocol Scheme association](custom-protocol-schemes.html)

[Next  
\
File Association](file-association.html)

File Association | Wails

[Skip to main content](file-association.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/file-association) (v2.10).

- [](https://wails.io/)
- Guides
- File Association

Version: Next Version 🚧

On this page

# File Association

File association feature allows you to associate specific file types with your app so that when users open those files, your app is launched to handle them. This can be particularly useful for text editors, image viewers, or any application that works with specific file formats. In this guide, we'll walk through the steps to implement file association in Wails app.

## Set Up File Association:[​](file-association.html#set-up-file-association "Direct link to heading")

To set up file association, you need to modify your application's wails.json file. In "info" section add a "fileAssociations" section specifying the file types your app should be associated with.

For example:

```json
{
  "info": {
    "fileAssociations": [
      {
        "ext": "wails",
        "name": "Wails",
        "description": "Wails Application File",
        "iconName": "wailsFileIcon",
        "role": "Editor"
      },
    {
        "ext": "jpg",
        "name": "JPEG",
        "description": "Image File",
        "iconName": "jpegFileIcon",
        "role": "Editor"
      }
    ]
  }
}
```

| Property    | Description                                                                                                                                        |
|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|
| ext         | The extension (minus the leading period). e.g. png                                                                                                 |
| name        | The name. e.g. PNG File                                                                                                                            |
| iconName    | The icon name without extension. Icons should be located in build folder. Proper icons will be generated from .png file for both macOS and Windows |
| description | Windows-only. The description. It is displayed on the `Type` column on Windows Explorer.                                                           |
| role        | macOS-only. The app’s role with respect to the type. Corresponds to CFBundleTypeRole.                                                              |

## Platform Specifics:[​](file-association.html#platform-specifics "Direct link to heading")

### macOS[​](file-association.html#macos "Direct link to heading")

When you open file (or files) with your app, the system will launch your app and call the `OnFileOpen` function in your Wails app. Example:

main.go

```go
func main() {
    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        Mac: &mac.Options{
            OnFileOpen: func(filePaths []string) { println(filestring) },
        },
        Bind: []interface{}{
            app,
        },
    })

    if err != nil {
        println("Error:", err.Error())
    }
}
```

### Windows[​](file-association.html#windows "Direct link to heading")

On Windows file association is supported only with NSIS installer. During installation, the installer will create a registry entry for your file associations. When you open file with your app, new instance of app is launched and file path is passed as argument to your app. To handle this you should parse command line arguments in your app. Example:

main.go

```go
func main() {
    argsWithoutProg := os.Args[1:]

    if len(argsWithoutProg) != 0 {
    println("launchArgs", argsWithoutProg)
  }
}
```

You also can enable single instance lock for your app. In this case, when you open file with your app, new instance of app is not launched and arguments are passed to already running instance. Check single instance lock guide for details. Example:

main.go

```go
func main() {
    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        SingleInstanceLock: &options.SingleInstanceLock{
            UniqueId:               "e3984e08-28dc-4e3d-b70a-45e961589cdc",
            OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
        },
        Bind: []interface{}{
            app,
        },
    })
}
```

### Linux[​](file-association.html#linux "Direct link to heading")

Currently, Wails doesn't support bundling for Linux. So, you need to create file associations manually. For example if you distribute your app as a .deb package, you can create file associations by adding required files in you bundle. You can use [nfpm](https://nfpm.goreleaser.com/) to create .deb package for your app.

1. Create a .desktop file for your app and specify file associations there. Example:

```ini
[Desktop Entry]
Categories=Office
Exec=/usr/bin/wails-open-file %u
Icon=wails-open-file.png
Name=wails-open-file
Terminal=false
Type=Application
MimeType=application/x-wails;application/x-test
```

2. Create mime types file. Example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mime-info xmlns="http://www.freedesktop.org/standards/shared-mime-info">
  <mime-type type="application/x-wails">
    <comment>Wails Application File</comment>
    <glob pattern="*.wails"/>
  </mime-type>
</mime-info>
```

3. Create icons for your file types. SVG icons are recommended.
4. Prepare postInstall/postRemove scripts for your package. Example:

```sh
# reload mime types to register file associations
update-mime-database /usr/share/mime
# reload desktop database to load app in list of available
update-desktop-database /usr/share/applications
# update icons
update-icon-caches /usr/share/icons/*
```

5. Configure nfpm to use your scripts and files. Example:

```yaml
name: "wails-open-file"
arch: "arm64"
platform: "linux"
version: "1.0.0"
section: "default"
priority: "extra"
maintainer: "FooBarCorp <[email protected]>"
description: "Sample Package"
vendor: "FooBarCorp"
homepage: "http://example.com"
license: "MIT"
contents:
- src: ../bin/wails-open-file
  dst: /usr/bin/wails-open-file
- src: ./main.desktop
  dst: /usr/share/applications/wails-open-file.desktop
- src: ./application-wails-mime.xml
  dst: /usr/share/mime/packages/application-x-wails.xml
- src: ./application-test-mime.xml
  dst: /usr/share/mime/packages/application-x-test.xml
- src: ../appicon.svg
  dst: /usr/share/icons/hicolor/scalable/apps/wails-open-file.svg
- src: ../wailsFileIcon.svg
  dst: /usr/share/icons/hicolor/scalable/mimetypes/application-x-wails.svg
- src: ../testFileIcon.svg
  dst: /usr/share/icons/hicolor/scalable/mimetypes/application-x-test.svg
# copy icons to Yaru theme as well. For some reason Ubuntu didn't pick up fileicons from hicolor theme
- src: ../appicon.svg
  dst: /usr/share/icons/Yaru/scalable/apps/wails-open-file.svg
- src: ../wailsFileIcon.svg
  dst: /usr/share/icons/Yaru/scalable/mimetypes/application-x-wails.svg
- src: ../testFileIcon.svg
  dst: /usr/share/icons/Yaru/scalable/mimetypes/application-x-test.svg
scripts:
  postinstall: ./postInstall.sh
  postremove: ./postRemove.sh
```

6. Build your .deb package using nfpm:

```sh
nfpm pkg --packager deb --target .
```

7. Now when your package is installed, your app will be associated with specified file types. When you open file with your app, new instance of app is launched and file path is passed as argument to your app. To handle this you should parse command line arguments in your app. Example:

main.go

```go
func main() {
    argsWithoutProg := os.Args[1:]

    if len(argsWithoutProg) != 0 {
    println("launchArgs", argsWithoutProg)
  }
}
```

You also can enable single instance lock for your app. In this case, when you open file with your app, new instance of app is not launched and arguments are passed to already running instance. Check single instance lock guide for details. Example:

main.go

```go
func main() {
    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        SingleInstanceLock: &options.SingleInstanceLock{
            UniqueId:               "e3984e08-28dc-4e3d-b70a-45e961589cdc",
            OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
        },
        Bind: []interface{}{
            app,
        },
    })
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/file-association.mdx)

[Previous  
\
Dynamic Assets](dynamic-assets.html)

[Next  
\
Frameless Applications](frameless.html)

Frameless Applications | Wails

[Skip to main content](frameless.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/frameless) (v2.10).

- [](https://wails.io/)
- Guides
- Frameless Applications

Version: Next Version 🚧

# Frameless Applications

Wails supports application that have no frames. This can be achieved by using the [frameless](../reference/options.html#frameless) field in [Application Options](../reference/options.html#application-options).

Wails offers a simple solution for dragging the window: Any HTML element that has the CSS style `--wails-draggable:drag` will act as a "drag handle". This property applies to all child elements. If you need to indicate that a nested element should not drag, then use the attribute '--wails-draggable:no-drag' on that element.

```html
<html>
  <head>
    <link rel="stylesheet" href="/main.css" />
  </head>

  <body style="--wails-draggable:drag">
    <div id="logo"></div>
    <div id="input" style="--wails-draggable:no-drag">
      <input id="name" type="text" />
      <button onclick="greet()">Greet</button>
    </div>
    <div id="result"></div>

    <script src="/main.js"></script>
  </body>
</html>
```

For some projects, using a CSS variable may not be possible due to dynamic styling. In this case, you can use the `CSSDragProperty` and `CSSDragValue` application options to define a property and value that will be used to indicate draggable regions:

main.go

```go
package main

import (
    "embed"

    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
    "github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
    // Create an instance of the app structure
    app := NewApp()

    // Create application with options
    err := wails.Run(&options.App{
        Title:  "alwaysontop",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
          Assets: assets,
        },
        Frameless:       true,
        CSSDragProperty: "widows",
        CSSDragValue:    "1",
        Bind: []interface{}{
          app,
        },
    })

    if err != nil {
        println("Error:", err)
    }
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>alwaysontop</title>
  </head>
  <body style="widows: 1">
    <div id="app"></div>
    <script src="./src/main.js" type="module"></script>
  </body>
</html>
```

Fullscreen

If you allow your application to go fullscreen, this drag functionality will be disabled.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/frameless.mdx)

[Previous  
\
File Association](file-association.html)

[Next  
\
Frontend](frontend.html)

Frontend | Wails

[Skip to main content](frontend.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/frontend) (v2.10).

- [](https://wails.io/)
- Guides
- Frontend

Version: Next Version 🚧

On this page

# Frontend

## Script Injection[​](frontend.html#script-injection "Direct link to heading")

When Wails serves your `index.html`, by default, it will inject 2 script entries into the `<body>` tag to load `/wails/ipc.js` and `/wails/runtime.js`. These files install the bindings and runtime respectively.

The code below shows where these are injected by default:

```html
<html>
  <head>
    <title>injection example</title>
    <link rel="stylesheet" href="/main.css" />
    <!--     <script src="/wails/ipc.js"></script> -->
    <!--     <script src="/wails/runtime.js"></script> -->
  </head>

  <body data-wails-drag>
    <div class="logo"></div>
    <div class="result" id="result">Please enter your name below 👇</div>
    <div class="input-box" id="input" data-wails-no-drag>
      <input class="input" id="name" type="text" autocomplete="off" />
      <button class="btn" onclick="greet()">Greet</button>
    </div>

    <script src="/main.js"></script>
  </body>
</html>
```

### Overriding Default Script Injection[​](frontend.html#overriding-default-script-injection "Direct link to heading")

To provide more flexibility to developers, there is a meta tag that may be used to customise this behaviour:

```html
<meta name="wails-options" content="[options]" />
```

The options are as follows:

| Value               | Description                                      |
|---------------------|--------------------------------------------------|
| noautoinjectruntime | Disable the autoinjection of `/wails/runtime.js` |
| noautoinjectipc     | Disable the autoinjection of `/wails/ipc.js`     |
| noautoinject        | Disable all autoinjection of scripts             |

Multiple options may be used provided they are comma separated.

This code is perfectly valid and operates the same as the autoinjection version:

```html
<html>
  <head>
    <title>injection example</title>
    <meta name="wails-options" content="noautoinject" />
    <link rel="stylesheet" href="/main.css" />
  </head>

  <body data-wails-drag>
    <div class="logo"></div>
    <div class="result" id="result">Please enter your name below 👇</div>
    <div class="input-box" id="input" data-wails-no-drag>
      <input class="input" id="name" type="text" autocomplete="off" />
      <button class="btn" onclick="greet()">Greet</button>
    </div>

    <script src="/wails/ipc.js"></script>
    <script src="/wails/runtime.js"></script>
    <script src="/main.js"></script>
  </body>
</html>
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/frontend.mdx)

[Previous  
\
Frameless Applications](frameless.html)

[Next  
\
IDEs](ides.html)

IDEs | Wails

[Skip to main content](ides.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/ides) (v2.10).

- [](https://wails.io/)
- Guides
- IDEs

Version: Next Version 🚧

On this page

# IDEs

Wails aims to provide a great development experience. To that aim, we now support generating IDE specific configuration to provide smoother project setup.

Currently, we support [Visual Studio Code](https://code.visualstudio.com/) and [Goland](https://www.jetbrains.com/go/).

## Visual Studio Code[​](ides.html#visual-studio-code "Direct link to heading")

![](../../../assets/images/vscode-2dbb85b0bf2ce7fa642b79073f676758.webp)

When generating a project using the `-ide vscode` flags, IDE files will be created alongside the other project files. These files are placed into the `.vscode` directory and provide the correct configuration for debugging your application.

The 2 files generated are `tasks.json` and `launch.json`. Below are the files generated for the default vanilla project:

tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "type": "shell",
      "options": {
        "cwd": "${workspaceFolder}"
      },
      "command": "go",
      "args": [
        "build",
        "-tags",
        "dev",
        "-gcflags",
        "all=-N -l",
        "-o",
        "build/bin/myproject.exe"
      ]
    }
  ]
}
```

launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Wails: Debug myproject",
      "type": "go",
      "request": "launch",
      "mode": "exec",
      "program": "${workspaceFolder}/build/bin/myproject.exe",
      "preLaunchTask": "build",
      "cwd": "${workspaceFolder}",
      "env": {}
    }
  ]
}
```

### Configuring the install and build steps[​](ides.html#configuring-the-install-and-build-steps "Direct link to heading")

The `tasks.json` file is simple for the default project as there is no `npm install` or `npm run build` step needed. For projects that have a frontend build step, such as the svelte template, we would need to edit `tasks.json` to add the install and build steps:

tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm install",
      "type": "npm",
      "script": "install",
      "options": {
        "cwd": "${workspaceFolder}/frontend"
      },
      "presentation": {
        "clear": true,
        "panel": "shared",
        "showReuseMessage": false
      },
      "problemMatcher": []
    },
    {
      "label": "npm run build",
      "type": "npm",
      "script": "build",
      "options": {
        "cwd": "${workspaceFolder}/frontend"
      },
      "presentation": {
        "clear": true,
        "panel": "shared",
        "showReuseMessage": false
      },
      "problemMatcher": []
    },
    {
      "label": "build",
      "type": "shell",
      "options": {
        "cwd": "${workspaceFolder}"
      },
      "command": "go",
      "args": [
        "build",
        "-tags",
        "dev",
        "-gcflags",
        "all=-N -l",
        "-o",
        "build/bin/vscode.exe"
      ],
      "dependsOn": ["npm install", "npm run build"]
    }
  ]
}
```

Future Enhancement

In the future, we hope to generate a `tasks.json` that includes the install and build steps automatically.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/ides.mdx)

[Previous  
\
Frontend](frontend.html)

[Next  
\
Linux Distro Support](linux-distro-support.html)

Linux Distro Support | Wails

[Skip to main content](linux-distro-support.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/linux-distro-support) (v2.10).

- [](https://wails.io/)
- Guides
- Linux Distro Support

Version: Next Version 🚧

On this page

# Linux Distro Support

## Overview[​](linux-distro-support.html#overview "Direct link to heading")

Wails offers Linux support but providing installation instructions for all available distributions is an impossible task. Instead, Wails tries to determine if the packages you need to develop applications are available via your system's package manager. Currently, we support the following package managers:

- apt
- dnf
- emerge
- eopkg
- nixpkgs
- pacman
- zypper

## Adding package names[​](linux-distro-support.html#adding-package-names "Direct link to heading")

There may be circumstances where your distro uses one of the supported package managers but the package name is different. For example, you may use an Ubuntu derivative, but the package name for gtk may be different. Wails attempts to find the correct package by iterating through a list of package names. The list of packages are stored in the packagemanager specific file in the `v2/internal/system/packagemanager` directory. In our example, this would be `v2/internal/system/packagemanager/apt.go`.

In this file, the list of packages are defined by the `Packages()` method:

```go
func (a *Apt) Packages() packagemap {
    return packagemap{
        "libgtk-3": []*Package{
            {Name: "libgtk-3-dev", SystemPackage: true, Library: true},
        },
        "libwebkit": []*Package{
            {Name: "libwebkit2gtk-4.0-dev", SystemPackage: true, Library: true},
        },
        "gcc": []*Package{
            {Name: "build-essential", SystemPackage: true},
        },
        "pkg-config": []*Package{
            {Name: "pkg-config", SystemPackage: true},
        },
        "npm": []*Package{
            {Name: "npm", SystemPackage: true},
        },
        "docker": []*Package{
            {Name: "docker.io", SystemPackage: true, Optional: true},
        },
    }
}
```

Let's assume that in our linux distro, `libgtk-3` is packaged under the name `lib-gtk3-dev`. We could add support for this by adding the following line:

```go
func (a *Apt) Packages() packagemap {
    return packagemap{
        "libgtk-3": []*Package{
            {Name: "libgtk-3-dev", SystemPackage: true, Library: true},
            {Name: "lib-gtk3-dev", SystemPackage: true, Library: true},
        },
        "libwebkit": []*Package{
            {Name: "libwebkit2gtk-4.0-dev", SystemPackage: true, Library: true},
        },
        "gcc": []*Package{
            {Name: "build-essential", SystemPackage: true},
        },
        "pkg-config": []*Package{
            {Name: "pkg-config", SystemPackage: true},
        },
        "npm": []*Package{
            {Name: "npm", SystemPackage: true},
        },
        "docker": []*Package{
            {Name: "docker.io", SystemPackage: true, Optional: true},
        },
    }
}
```

## Adding new package managers[​](linux-distro-support.html#adding-new-package-managers "Direct link to heading")

To add a new package manager, perform the following steps:

- Create a new file in `v2/internal/system/packagemanager` called `<pm>.go`, where `<pm>` is the name of the package manager.
- Define a struct that conforms to the package manager interface defined in `pm.go`:

```go
type PackageManager interface {
    Name() string
    Packages() packagemap
    PackageInstalled(*Package) (bool, error)
    PackageAvailable(*Package) (bool, error)
    InstallCommand(*Package) string
}
```

- `Name()` should return the name of the package manager
- `Packages()` should return a `packagemap`, that provides candidate filenames for dependencies
- `PackageInstalled()` should return `true` if the given package is installed
- `PackageAvailable()` should return `true` if the given package is not installed but available for installation
- `InstallCommand()` should return the exact command to install the given package name

Take a look at the other package managers code to get an idea how this works.

Remember

If you add support for a new package manager, don't forget to also update this page!

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/linux-distro-support.mdx)

[Previous  
\
IDEs](ides.html)

[Next  
\
Linux](linux.html)

Linux | Wails

[Skip to main content](linux.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/linux) (v2.10).

- [](https://wails.io/)
- Guides
- Linux

Version: Next Version 🚧

On this page

# Linux

This page has miscellaneous guides related to developing Wails applications for Linux.

## Video tag doesn't fire "ended" event[​](linux.html#video-tag-doesnt-fire-ended-event "Direct link to heading")

When using a video tag, the "ended" event is not fired when the video is finished playing. This is a bug in WebkitGTK, however you can use the following workaround to fix it:

```js
videoTag.addEventListener("timeupdate", (event) => {
  if (event.target.duration - event.target.currentTime < 0.2) {
    let ended = new Event("ended");
    event.target.dispatchEvent(ended);
  }
});
```

Source: [Lyimmi](https://github.com/Lyimmi) on the [discussions board](https://github.com/wailsapp/wails/issues/1729#issuecomment-1212291275)

## GStreamer error when using Audio or Video elements[​](linux.html#gstreamer-error-when-using-audio-or-video-elements "Direct link to heading")

If you are seeing the following error when including `<Audio>` or `<Video>` elements on Linux, you may need to install `gst-plugins-good`.

```text
GStreamer element autoaudiosink not found. Please install it
```

### Installing[​](linux.html#installing "Direct link to heading")

Run the following distro relevant install command:

- Arch
- Debian/Ubuntu
- Fedora

```text
pacman -S gst-plugins-good
```

```text
apt-get install gstreamer1.0-plugins-good
```

```text
dnf install gstreamer1-plugins-good
```

If the added package does not resolve the issue, additional GStreamer dependencies may be required. [See the GStreamer installation page for more details.](https://gstreamer.freedesktop.org/documentation/installing/on-linux.html)

### Additional Notes[​](linux.html#additional-notes "Direct link to heading")

- This issue is caused by [an upstream issue with WebkitGTK](https://bugs.webkit.org/show_bug.cgi?id=146351).
- [Arch based systems](https://wiki.archlinux.org/title/Arch-based_distributions) seem to have this issue more often than other distributions.
- This issue impacts [Tauri apps](https://tauri.app/).

Source: [developomp](https://github.com/developomp) on the [Tauri discussion board](https://github.com/tauri-apps/tauri/issues/4642#issuecomment-1643229562).

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/linux.mdx)

[Previous  
\
Linux Distro Support](linux-distro-support.html)

[Next  
\
Local Development](local-development.html)

Local Development | Wails

[Skip to main content](local-development.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/local-development) (v2.10).

- [](https://wails.io/)
- Guides
- Local Development

Version: Next Version 🚧

On this page

# Local Development

## Overview[​](local-development.html#overview "Direct link to heading")

Wails is in constant development and new releases are regularly "tagged". This usually happens when all the newer code on `master` has been tested and confirmed working. If you need a bugfix or feature that has not yet made it to a release, it's possible to use the latest "bleeding edge" version using the following steps:

- `git clone https://github.com/wailsapp/wails`
- `cd wails/v2/cmd/wails`
- `go install`

NOTE: The directory that you cloned the project into will now be called "clonedir".

The Wails CLI will now be at the very latest version.

### Updating your project[​](local-development.html#updating-your-project "Direct link to heading")

To update projects to use the latest version of the Wails library, update the project's `go.mod` and ensure the following line is at the bottom of the file:

`replace github.com/wailsapp/wails/v2 => <clonedir>`

Example:

On Windows: `replace github.com/wailsapp/wails/v2 => C:\Users\leaan\Documents\wails-v2-beta\wails\v2`

On 'nix: `replace github.com/wailsapp/wails/v2 => /home/me/projects/wails/v2`

To revert to a stable version, run:

`go install github.com/wailsapp/wails/v2/cmd/wails@latest`

## Testing a Branch[​](local-development.html#testing-a-branch "Direct link to heading")

If you want to test a branch, follow the instructions above, but ensure you switch the branch you want to test before installing:

- `git clone https://github.com/wailsapp/wails`
- `cd wails`
- `git checkout -b branch-to-test --track origin/branch-to-test`
- `cd v2/cmd/wails`
- `go install`

Make sure you [update your project](local-development.html#updating-your-project) as described above.

## Testing a PR[​](local-development.html#testing-a-pr "Direct link to heading")

If you want to test a PR, follow the instructions above, but ensure you fetch the PR and switch the branch before installing. Please replace `[IDofThePR]` with the ID of the PR shown on github.com:

- `git clone https://github.com/wailsapp/wails`
- `cd wails`
- `git fetch -u origin pull/[IDofThePR]/head:test/pr-[IDofThePR]`
- `git checkout test/pr-[IDofThePR]`
- `git reset --hard HEAD`
- `cd v2/cmd/wails`
- `go install`

Make sure you [update your project](local-development.html#updating-your-project) as described above.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/local-development.mdx)

[Previous  
\
Linux](linux.html)

[Next  
\
Mac App Store Guide](mac-appstore.html)

Mac App Store Guide | Wails

[Skip to main content](mac-appstore.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/mac-appstore) (v2.10).

- [](https://wails.io/)
- Guides
- Mac App Store Guide

Version: Next Version 🚧

On this page

# Mac App Store Guide

This page gives a brief overview of how to submit your Wails App to the Mac App Store.

## Prerequisites[​](mac-appstore.html#prerequisites "Direct link to heading")

- You will need to have an Apple Developer account. Please find more information on the [Apple Developer Program](https://developer.apple.com/support/compare-memberships/) site
- You will need to have your Certificates, Identifiers, and App created on the developer portal. More on this below
- Xcode command line tools will need to be installed on your local machine

#### Create Certificates and Identifiers[​](mac-appstore.html#create-certificates-and-identifiers "Direct link to heading")

1. Go to your [Apple Developer Account](https://developer.apple.com/account/)
2. Under `Certificates, Identifiers & Profiles`, click `Identifiers` and Register a New App ID. Use the format (com.example.app)
3. Under the same page click `Certificates` and generate new Certificates for Mac App Store Distribution. Download them and import the certificates into Keychain on your local machine.

#### Create App Submission[​](mac-appstore.html#create-app-submission "Direct link to heading")

1. Go to the [App Store Connect Site](https://appstoreconnect.apple.com/apps)
2. Register a new application and link the bundle ID that you created in the previous step
3. Populate your app with the correct screen shots, descriptions, etc. as required by Apple
4. Create a new version of your app

#### Create Provisioning Profile[​](mac-appstore.html#create-provisioning-profile "Direct link to heading")

1. Go to the [Apple Developer Profiles](https://developer.apple.com/account/resources/profiles/list) page
2. Add a new provisioning profile for Mac App Store Distribution
3. Set the Profile Type as Mac and select the App ID for the application created above
4. Select the Mac App Distribution certificate
5. Name the Provisioning Profile embedded and download the created profile.

## Mac App Store Process[​](mac-appstore.html#mac-app-store-process "Direct link to heading")

#### Enable Apple's App Sandbox[​](mac-appstore.html#enable-apples-app-sandbox "Direct link to heading")

Apps submitted to the Mac App Store must run under Apple's [App Sandbox](https://developer.apple.com/app-sandboxing/). You must create an `entitlements.plist` file for this to work. The recommendation is to create this file under this path `{PROJECT_DIR}/build/darwin/entitlements.plist`.

**Example Entitlements File**

This is an example entitlements file from the [RiftShare](https://github.com/achhabra2/riftshare) app. For reference please put in the entitlements your app requires. Refer to [this site](https://developer.apple.com/documentation/bundleresources/entitlements) for more information. You will need to replace the Team ID and Application Name with the ones you registered above.

entitlements.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.network.server</key>
    <true/>
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
    <key>com.apple.security.files.downloads.read-write</key>
    <true/>
    <key>com.apple.application-identifier</key>
    <string>TEAM_ID.APP_NAME</string>
    <key>com.apple.developer.team-identifier</key>
    <string>TEAM_ID</string>
</dict>
</plist>
```

**Add the Embedded Provisioning Profile** The Provisioning Profile created above needs to be added to the root of the application. It needs to be named embedded.provisionprofile.

#### Build and Sign the App Package[​](mac-appstore.html#build-and-sign-the-app-package "Direct link to heading")

The following is an example script for building and signing your app for Mac App Store submission. It assumes you are running the script from your root project directory.

Note the certificates for signing the app and signing the installer are different. Please make sure both are imported into Keychain. Find the strings in Keychain and insert them below. Populate your certificate names, and app name below. Running the following script will generate a signed `app.pkg` file in the root directory of your app.

macappstore-build.sh

```bash
#!/bin/bash

APP_CERTIFICATE="3rd Party Mac Developer Application: YOUR NAME (CODE)"
PKG_CERTIFICATE="3rd Party Mac Developer Installer: YOUR NAME (CODE)"
APP_NAME="YourApp"

wails build -platform darwin/universal -clean

cp ./embedded.provisionprofile "./build/bin/$APP_NAME.app/Contents"

codesign --timestamp --options=runtime -s "$APP_CERTIFICATE" -v --entitlements ./build/darwin/entitlements.plist "./build/bin/$APP_NAME.app"

productbuild --sign "$PKG_CERTIFICATE" --component "./build/bin/$APP_NAME.app" /Applications "./$APP_NAME.pkg"
```

#### Upload App Bundle[​](mac-appstore.html#upload-app-bundle "Direct link to heading")

You will need to upload the generated package file and associate it to your Application before you will be able to submit it for review.

1. Download the [Transporter App](https://apps.apple.com/us/app/transporter/id1450874784) from the Mac App Store
2. Open it and sign in with your Apple ID
3. Click the + sign and select the `APP_NAME.pkg` file that you generated in the previous step. Upload it
4. Go back to the [App Store Connect](https://appstoreconnect.apple.com/apps) site and navigate back into your app submission. Select the version that you are ready to make available on the App Store. Under `Build` select the package that you uploaded via Transporter.

That's it! You can now use the site to submit your App for review. After a few business days if all goes well you should see your App live on the Mac App Store.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/mac-appstore.mdx)

[Previous  
\
Local Development](local-development.html)

[Next  
\
Manual Builds](manual-builds.html)

Manual Builds | Wails

[Skip to main content](manual-builds.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/manual-builds) (v2.10).

- [](https://wails.io/)
- Guides
- Manual Builds

Version: Next Version 🚧

On this page

# Manual Builds

The Wails CLI does a lot of heavy lifting for the project, but sometimes it's desirable to manually build your project. This document will discuss the different operations the CLI does and how this may be achieved in different ways.

## Build Process[​](manual-builds.html#build-process "Direct link to heading")

When either `wails build` or `wails dev` are used, the Wails CLI performs a common build process:

```text
- Install frontend dependencies
- Build frontend project
- Generate build assets
- Compile application
- [optional] Compress application
```

### Install frontend dependencies[​](manual-builds.html#install-frontend-dependencies "Direct link to heading")

#### CLI Steps[​](manual-builds.html#cli-steps "Direct link to heading")

- If the `-s` flag is given, this step is skipped
- Checks `wails.json` to see if there is an install command in the key `frontend:install`
- If there isn't, it skips this step
- If there is, it checks if `package.json` exists in the frontend directory. If it doesn't exist, it skips this step
- An MD5 sum is generated from the `package.json` file contents
- It checks for the existence of `package.json.md5` and if it exists, will compare the contents of it (an MD5 sum) with the one generated to see if the contents have changed. If they are the same, this step is skipped
- If `package.json.md5` does not exist, it creates it using the generated MD5 sum
- If a build is now required, or `node_modules` does not exist, or the `-f` flag is given, the install command is executed in the frontend directory

#### Manual Steps[​](manual-builds.html#manual-steps "Direct link to heading")

This step could be done from the command line or a script with `npm install`.

### Build frontend project[​](manual-builds.html#build-frontend-project "Direct link to heading")

#### Wails CLI[​](manual-builds.html#wails-cli "Direct link to heading")

- If the `-s` flag is given, this step is skipped
- Checks `wails.json` to see if there is a build command in the key `frontend:build`
- If there isn't, it skips this step
- If there is, it is executed in the frontend directory

#### Manual Steps[​](manual-builds.html#manual-steps-1 "Direct link to heading")

This step could be done from the command line or a script with `npm run build` or whatever the frontend build script is.

### Generate assets[​](manual-builds.html#generate-assets "Direct link to heading")

#### Wails CLI[​](manual-builds.html#wails-cli-1 "Direct link to heading")

- If `-nopackage` flag is set, this stage is skipped
- If the `build/appicon.png` file does not exist, a default one is created
- For Windows, see [Bundling for Windows](manual-builds.html#windows)
- If `build/windows/icon.ico` does not exist, it will create it from the `build/appicon.png` image.

##### Windows[​](manual-builds.html#windows "Direct link to heading")

- If `build/windows/icon.ico` does not exist, it will create it from `build/appicon.png` using icon sizes of 256, 128, 64, 48, 32 and 16. This is done using [winicon](https://github.com/leaanthony/winicon).
- If the `build/windows/<projectname>.manifest` file does not exist, it creates it from a default version.
- Compiles the application as a production build (above)
- Uses [winres](https://github.com/tc-hib/winres) to bundle the icon and manifest into a `.syso` file ready for linking.

#### Manual Steps[​](manual-builds.html#manual-steps-2 "Direct link to heading")

- Create `icon.ico` using the [winicon](https://github.com/leaanthony/winicon) CLI tool (or any other tool).
- Create / Update a `.manifest` file for your application
- Use the [winres CLI](https://github.com/tc-hib/go-winres) to generate a `.syso` file.

### Compile application[​](manual-builds.html#compile-application "Direct link to heading")

#### Wails CLI[​](manual-builds.html#wails-cli-2 "Direct link to heading")

- If the `-clean` flag is provided, the `build` directory is deleted and recreated
- For `wails dev`, the following default Go flags are used: `-tags dev -gcflags "all=-N -l"`
- For `wails build`, the following default Go flags are used: `-tags desktop,production -ldflags "-w -s"`
  
  - On Windows, `-ldflags "-w -h -H windowsgui"`
- Additional tags passed to the CLI using `-tags` are added to the defaults
- Additional ldflags passed to the CLI using `-ldflags` are added to the defaults
- The `-o` flag is passed through
- The Go compiler specified by `-compiler` will be used for compilation

#### Manual steps[​](manual-builds.html#manual-steps-3 "Direct link to heading")

- For dev build, the minimum command would be: `go build -tags dev -gcflags "all=-N -l"`
- For production build, the minimum command would be: `go build -tags desktop,production -ldflags "-w -s -H windowsgui"`
- Ensure that you compile in the same directory as the `.syso` file

### Compress application[​](manual-builds.html#compress-application "Direct link to heading")

#### Wails CLI[​](manual-builds.html#wails-cli-3 "Direct link to heading")

- If the `-upx` flag has been given, the `upx` program will be run to compress the application with the default settings
- If `-upxflags` is also passed, these flags are used instead of the default ones

#### Manual steps[​](manual-builds.html#manual-steps-4 "Direct link to heading")

- Run `upx [flags]` manually to compress the application.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/manual-builds.mdx)

[Previous  
\
Mac App Store Guide](mac-appstore.html)

[Next  
\
Migrating from v1](migrating.html)

Migrating from v1 | Wails

[Skip to main content](migrating.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/migrating) (v2.10).

- [](https://wails.io/)
- Guides
- Migrating from v1

Version: Next Version 🚧

On this page

# Migrating from v1

## Overview[​](migrating.html#overview "Direct link to heading")

Wails v2 is a significant change from v1. This document aims to highlight the changes and the steps in migrating an existing project.

### Creating the Application[​](migrating.html#creating-the-application "Direct link to heading")

In v1, the main application is created using `wails.CreateApp`, bindings are added with `app.Bind`, then the application is run using `app.Run()`.

Example:

v1

```go
 app := wails.CreateApp(&wails.AppConfig{
    Title:  "MyApp",
    Width:  1024,
    Height: 768,
    JS:     js,
    CSS:    css,
    Colour: "#131313",
  })
  app.Bind(basic)
  app.Run()
```

In v2, there is just a single method, `wails.Run()`, that accepts [application options](../reference/options.html#application-options).

v2

```go
    err := wails.Run(&options.App{
        Title:  "MyApp",
        Width:  800,
        Height: 600,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        Bind:   []interface{}{
            basic,
        },
    })
```

### Binding[​](migrating.html#binding "Direct link to heading")

In v1, it was possible to bind both arbitrary functions and structs. In v2, this has been simplified to only binding structs. The struct instances that were previously passed to the `Bind()` method in v1, are now specified in the `Bind` field of the [application options](../reference/options.html#application-options):

v1

```go
  app := wails.CreateApp(/* options */)
  app.Bind(basic)
```

v2

```go
    err := wails.Run(&options.App{
        /* other options */
        Bind: []interface{}{
            basic,
        },
    })
```

In v1, bound methods were available to the frontend at `window.backend`. This has changed to `window.go`.\`\`

### Application Lifecycle[​](migrating.html#application-lifecycle "Direct link to heading")

In v1, there were 2 special methods in a bound struct: `WailsInit()` and `WailsShutdown()`. These have been replaced with 3 lifecycle hooks as part of the [application options](../reference/options.html#application-options):

- [OnStartup](../reference/options.html#onstartup)
- [OnShutdown](../reference/options.html#onshutdown)
- [OnDomReady](../reference/options.html#ondomready)

Note: [OnDomReady](../reference/options.html#ondomready) replaces the `wails:ready` system event in v1.

These methods can be standard functions, but a common practice is to have them part of a struct:

v2

```go
    basic := NewBasicApp()
    err := wails.Run(&options.App{
        /* Other Options */
        OnStartup:  basic.startup,
        OnShutdown: basic.shutdown,
        OnDomReady: basic.domready,
    })
...
type Basic struct {
    ctx context.Context
}
func (b *Basic) startup(ctx context.Context) {
    b.ctx = ctx
}
...
```

### Runtime[​](migrating.html#runtime "Direct link to heading")

The runtime in v2 is much richer than v1 with support for menus, window manipulation and better dialogs. The signature of the methods has changed slightly - please refer to the [Runtime Reference](../reference/runtime/intro.html).

In v1, the [runtime](../reference/runtime/intro.html) was available via a struct passed to `WailsInit()`. In v2, the runtime has been moved out to its own package. Each method in the runtime takes the `context.Context` that is passed to the [OnStartup](../reference/options.html#onstartup) method.

Runtime Example

```go
package main

import "github.com/wailsapp/wails/v2/pkg/runtime"

type Basic struct {
    ctx context.Context
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    runtime.LogInfo(ctx, "Application Startup called!")
}

```

### Assets[​](migrating.html#assets "Direct link to heading")

The *biggest* change in v2 is how assets are handled.

In v1, assets were passed via 2 application options:

- `JS` - The application's JavaScript
- `CSS` - The application's CSS

This meant that the responsibility of generating a single JS and CSS file was on the developer. This essentially required the use of complicated packers such as webpack.

In v2, Wails makes no assumptions about your frontend assets, just like a webserver. All of your application assets are passed to the application options as an `embed.FS`.

**This means there is no requirement to bundle your assets, encode images as Base64 or attempt the dark art of bundler configuration to use custom fonts**.

At startup, Wails will scan the given `embed.FS` for `index.html` and use its location as the root path for all the other application assets - just like a webserver would.

Example: An application has the following project layout. All final assets are placed in the `frontend/dist` directory:

```shell
.
├── build/
├── frontend/
│   └── dist/
│       ├── index.html
│       ├── main.js
│       ├── main.css
│       └── logo.svg
├── main.go
└── wails.json
```

Those assets may be used by the application by simply creating an `embed.FS`:

Assets Example

```go
//go:embed all:frontend/dist
var assets embed.FS

func main() {
    err := wails.Run(&options.App{
        /* Other Options */
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
    })
}
```

Of course, bundlers can be used if you wish to. The only requirement is to pass the final application assets directory to Wails using an `embed.FS` in the `Assets` key of the [application options](../reference/options.html#application-options).

### Project Configuration[​](migrating.html#project-configuration "Direct link to heading")

In v1, the project configuration was stored in the `project.json` file in the project root. In v2, the project configuration is stored in the `wails.json` file in the project root.

The format of the file is slightly different. Here is a comparison:

| v1                 | v2               | Notes                                                                                                                                                                      |
|--------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name               | name             |                                                                                                                                                                            |
| description        |                  | Removed                                                                                                                                                                    |
| author / name      | author / name    |                                                                                                                                                                            |
| author / email     | author / email   |                                                                                                                                                                            |
| version            | version          |                                                                                                                                                                            |
| binaryname         | outputfilename   | Changed                                                                                                                                                                    |
| frontend / dir     |                  | Removed                                                                                                                                                                    |
| frontend / install | frontend:install | Changed                                                                                                                                                                    |
| frontend / build   | frontend:build   | Changed                                                                                                                                                                    |
| frontend / bridge  |                  | Removed                                                                                                                                                                    |
| frontend / serve   |                  | Removed                                                                                                                                                                    |
| tags               |                  | Removed                                                                                                                                                                    |
|                    | wailsjsdir       | The directory to generate wailsjs modules                                                                                                                                  |
|                    | assetdir         | The directory of the compiled frontend assets for `dev` mode. This is normally inferred and could be left empty.                                                           |
|                    | reloaddirs       | Comma separated list of additional directories to watch for changes and to trigger reloads in `dev` mode. This is only needed for some more advanced asset configurations. |

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/migrating.mdx)

[Previous  
\
Manual Builds](manual-builds.html)

[Next  
\
Mouse Buttons](mouse-buttons.html)

Mouse Buttons | Wails

[Skip to main content](mouse-buttons.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/mouse-buttons) (v2.10).

- [](https://wails.io/)
- Guides
- Mouse Buttons

Version: Next Version 🚧

# Mouse Buttons

The Wails runtime intercepts mouse clicks to determine whether a frameless window needs resizing or a window needs to be moved. It has been asked how to detect when a mouse click has occurred, because `window.onclick` doesn't report the mouse buttons correctly. The following code shows how to detect mouse clicks:

```javascript
window.addEventListener("mousedown", handleMouseButtonDown);

function handleMouseButtonDown(event) {
  if (event.button === 0) {
    // left mouse button
  } else if (event.button === 1) {
    // middle mouse button
  } else if (event.button === 2) {
    // right mouse button
  } else if (event.button === 3) {
    // back mouse button
  } else if (event.button === 4) {
    // forward mouse button
  } else {
    // other mouse button
  }
}
```

Reference: [https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/mouse-buttons.mdx)

[Previous  
\
Migrating from v1](migrating.html)

[Next  
\
NixOS FontSize Bug](nixos-font.html)

NixOS FontSize Bug | Wails

[Skip to main content](nixos-font.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/nixos-font) (v2.10).

- [](https://wails.io/)
- Guides
- NixOS FontSize Bug

Version: Next Version 🚧

# NixOS FontSize Bug

NixOS/Wayland can cause a bug where the `font-size` css property doesn't affect the rendered page. To fix this add the following to your devShell.

```shell
    shellHook = with pkgs; ''
      export XDG_DATA_DIRS=${gsettings-desktop-schemas}/share/gsettings-schemas/${gsettings-desktop-schemas.name}:${gtk3}/share/gsettings-schemas/${gtk3.name}:$XDG_DATA_DIRS;
      export GIO_MODULE_DIR="${pkgs.glib-networking}/lib/gio/modules/";
    '';
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/nixos-font.mdx)

[Previous  
\
Mouse Buttons](mouse-buttons.html)

[Next  
\
Obfuscated Builds](obfuscated.html)

Obfuscated Builds | Wails

[Skip to main content](obfuscated.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/obfuscated) (v2.10).

- [](https://wails.io/)
- Guides
- Obfuscated Builds

Version: Next Version 🚧

On this page

# Obfuscated Builds

Wails includes support for obfuscating your application using [garble](https://github.com/burrowers/garble).

To produce an obfuscated build, you can use the `-obfuscate` flag with the `wails build` command:

```bash
wails build -obfuscated
```

To customise the obfuscation settings, you can use the `-garbleargs` flag:

```bash
wails build -obfuscated -garbleargs "-literals -tiny -seed=myrandomseed"
```

These settings may be persisted in your [project config](../reference/project-config.html).

## How it works[​](obfuscated.html#how-it-works "Direct link to heading")

In a standard build, all bound methods are available in the frontend under the `window.go` variable. When these methods are called, the corresponding backend method is called using the fully qualified function name. When using an obfuscated build, methods are bound using an ID instead of a name. The bindings generated in the `wailsjs` directory use these IDs to call the backend functions.

note

To ensure that your application will work in obfuscated mode, you must use the generated bindings under the `wailsjs` directory in your application.

## Example[​](obfuscated.html#example "Direct link to heading")

Importing the "Greet" method from the bindings like this:

```js
import { Greet } from "../../wailsjs/go/main/App";

// snip
Greet("World");
```

will ensure that the method will work correctly in obfuscated mode, as the bindings will be regenerated with IDs and the call mechanism updated.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/obfuscated.mdx)

[Previous  
\
NixOS FontSize Bug](nixos-font.html)

[Next  
\
Overscroll](overscroll.html)

Overscroll | Wails

[Skip to main content](overscroll.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/overscroll) (v2.10).

- [](https://wails.io/)
- Guides
- Overscroll

Version: Next Version 🚧

# Overscroll

[Overscroll](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) is the "bounce effect" you sometimes get when you scroll beyond a page's content boundaries. This is common in mobile apps. This can be disabled using CSS:

```css
html {
  height: 100%;
  overflow: hidden;
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/overscroll.mdx)

[Previous  
\
Obfuscated Builds](obfuscated.html)

[Next  
\
Routing](routing.html)

Routing | Wails

[Skip to main content](routing.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/routing) (v2.10).

- [](https://wails.io/)
- Guides
- Routing

Version: Next Version 🚧

On this page

# Routing

Routing is a popular way to switch views in an application. This page offers some guidance around how to do that.

## Vue[​](routing.html#vue "Direct link to heading")

The recommended approach for routing in Vue is [Hash Mode](https://next.router.vuejs.org/guide/essentials/history-mode.html#hash-mode):

```js
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
});
```

## Angular[​](routing.html#angular "Direct link to heading")

The recommended approach for routing in Angular is [HashLocationStrategy](https://codecraft.tv/courses/angular/routing/routing-strategies#_hashlocationstrategy):

```ts
RouterModule.forRoot(routes, { useHash: true });
```

## React[​](routing.html#react "Direct link to heading")

The recommended approach for routing in React is [HashRouter](https://reactrouter.com/en/main/router-components/hash-router):

```jsx
import { HashRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <HashRouter basename={"/"}>
    {/* The rest of your app goes here */}
    <Routes>
      <Route path="/" element={<Page0 />} exact />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      {/* more... */}
    </Routes>
  </HashRouter>,
  root
);
```

## Svelte[​](routing.html#svelte "Direct link to heading")

The recommended approach for routing in Svelte is [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router):

```svelte
<script>
    import Router from "svelte-spa-router";
</script>

<Router
    routes={{
        "/": Home,
        "/products": wrap({
            asyncComponent: () => import("./routes/Products.svelte"),
        }),
        "/settings": Settings,
        "*": NotFound,
    }}
/>
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/routing.mdx)

[Previous  
\
Overscroll](overscroll.html)

[Next  
\
Code Signing](signing.html)

Code Signing | Wails

[Skip to main content](signing.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/signing) (v2.10).

- [](https://wails.io/)
- Guides
- Code Signing

Version: Next Version 🚧

On this page

# Code Signing

This is a guide on how you can sign your binaries generated with Wails on MacOS and Windows. The guide will target CI environments, more specifically GitHub Actions.

## Windows[​](signing.html#windows "Direct link to heading")

First off you need a code signing certificate. If you do not already have one, Microsoft's info page lists some providers [here](https://docs.microsoft.com/en-us/windows-hardware/drivers/dashboard/get-a-code-signing-certificate). Please note that an EV certificate is not required unless you need to write kernel-level software such as device drivers. For signing your Wails app, a standard code signing certificate will do just fine.

It may be a good idea to check with your certificate provider how to sign your binaries on your local machine before targeting automated build systems, just so you know if there are any special requirements. For instance, [here](https://www.ssl.com/how-to/using-your-code-signing-certificate/) is SSL.com's code signing guide for Windows. If you know how to sign locally, it will be easier to troubleshoot any potential issues in a CI environment. For instance, SSL.com code signing certificates require the `/tr` flag for [SignTool.exe](https://docs.microsoft.com/en-us/windows/win32/seccrypto/signtool) while other providers may only need the `/t` flag for providing the timestamping server. Popular GitHub Actions for signing Windows binaries like [this one](https://github.com/Dana-Prajea/code-sign-action) does not support the `/tr` flag on SignTool.exe. Therefore this guide will focus on signing our app manually with PowerShell commands, but you can use actions like the [code-sign-action](https://github.com/Dana-Prajea/code-sign-action) Action if you prefer.

First off, let's make sure we are able to build our Wails app in our GitHub CI. Here is a small workflow template:

```yaml
name: "example"
on:
  workflow_dispatch:
    # This Action only starts when you go to Actions and manually run the workflow.

jobs:
  package:
    strategy:
      matrix:
        platform: [windows-latest, macos-latest]
        go-version: [1.18]
    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v3
      - name: Install Go
        uses: actions/setup-go@v2
        with:
          go-version: ${{ matrix.go-version }}
      - name: setup node
        uses: actions/setup-node@v2
        with:
          node-version: 14
      # You may need to manually build you frontend manually here, unless you have configured frontend build and install commands in wails.json.
      - name: Get Wails
        run: go install github.com/wailsapp/wails/v2/cmd/wails@latest
      - name: Build Wails app
        run: |
          wails build
      - name: upload artifacts macOS
        if: matrix.platform == 'macos-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-macos
          path: build/bin/*
      - name: upload artifacts windows
        if: matrix.platform == 'windows-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-windows
          path: build/bin/*
```

Next we need to give the GitHub workflow access to our signing certificate. This is done by encoding your .pfx or .p12 certificate into a base64 string. To do this in PowerShell, you can use the following command assuming your certificate is called 'my-cert.p12':

```PowerShell
certutil -encode .\my-cert.p12 my-cert-base64.txt
```

You should now have your .txt file with the base64 encoded certificate. It should start with *-----BEGIN CERTIFICATE-----* and end with *-----END CERTIFICATE-----*. Now you need to make two action secrets on GitHub. Navigate to *Settings -&gt; Secrets -&gt; Actions* and create the two following secrets:

- **WIN\_SIGNING\_CERT** with the contents of your base64 encoded certificate text.
- **WIN\_SIGNING\_CERT\_PASSWORD** with the contents of your certificate password.

Now we're ready to implement the signing in our workflow using one of the two methods:

### Method 1: signing with commands[​](signing.html#method-1-signing-with-commands "Direct link to heading")

This method uses PowerShell commands to sign our app, and leaves you control over the entire signing process.

After the `"Build Wails app"` step, we can add the following step to our workflow:

```yaml
- name: Sign Windows binaries
    if: matrix.platform == 'windows-latest'
    run: |
        echo "Creating certificate file"
        New-Item -ItemType directory -Path certificate
        Set-Content -Path certificate\certificate.txt -Value '${{ secrets.WIN_SIGNING_CERT }}'
        certutil -decode certificate\certificate.txt certificate\certificate.pfx
        echo "Signing our binaries"
        & 'C:/Program Files (x86)/Windows Kits/10/bin/10.0.17763.0/x86/signtool.exe' sign /fd <signing algorithm> /t <timestamping server> /f certificate\certificate.pfx /p '${{ secrets.WIN_SIGNING_CERT_PASSWORD }}' <path to binary>

```

This script creates a new directory for your certificate file, creates the certificate file from our base64 secret, converts it to a .pfx file, and finally signs the binary. The following variables needs to be replaced in the last line:

- **signing algorithm**: usually sha256.
- **timestamping server**: URL to the timestamping server to use with your certificate.
- **path to binary**: path to the binary you want to sign.

Given that our Wails config has `outputfilename` set to "app.exe" and that we have a certificate from SSL.com, this would be our workflow:

```yaml
name: "example"
on:
  workflow_dispatch:
    # This Action only starts when you go to Actions and manually run the workflow.

jobs:
  package:
    strategy:
      matrix:
        platform: [windows-latest, macos-latest]
        go-version: [1.18]
    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v3
      - name: Install Go
        uses: actions/setup-go@v2
        with:
          go-version: ${{ matrix.go-version }}
      - name: setup node
        uses: actions/setup-node@v2
        with:
          node-version: 14
      # You may need to manually build you frontend here, unless you have configured frontend build and install commands in wails.json.
      - name: Get Wails
        run: go install github.com/wailsapp/wails/v2/cmd/wails@latest
      - name: Build Wails app
        run: |
          wails build
      - name: Sign Windows binaries
        if: matrix.platform == 'windows-latest'
        run: |
          echo "Creating certificate file"
          New-Item -ItemType directory -Path certificate
          Set-Content -Path certificate\certificate.txt -Value '${{ secrets.WIN_SIGNING_CERT }}'
          certutil -decode certificate\certificate.txt certificate\certificate.pfx
          echo "Signing our binaries"
          & 'C:/Program Files (x86)/Windows Kits/10/bin/10.0.17763.0/x86/signtool.exe' sign /fd sha256 /tr http://ts.ssl.com /f certificate\certificate.pfx /p '${{ secrets.WIN_SIGNING_CERT_PASSWORD }}' .\build\bin\app.exe

      - name: upload artifacts macOS
        if: matrix.platform == 'macos-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-macos
          path: build/bin/*
      - name: upload artifacts windows
        if: matrix.platform == 'windows-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-windows
          path: build/bin/*
```

### Method 2: automatically signing with Action[​](signing.html#method-2-automatically-signing-with-action "Direct link to heading")

It is possible to use a Windows code signing Action like [this](https://github.com/marketplace/actions/code-sign-a-file-with-pfx-certificate) one, but note it requires a SHA1 hash for the certificate and a certificate name. View an example of how to configure it on the Action's [marketplace](https://github.com/marketplace/actions/code-sign-a-file-with-pfx-certificate).

* * *

## MacOS[​](signing.html#macos "Direct link to heading")

First off you need your code signing certificate from Apple. If you do not have one, a simple Google search will help you acquire one. Once you have your certificate, you need to export it and encode it to base64. [This tutorial](https://localazy.com/blog/how-to-automatically-sign-macos-apps-using-github-actions) shows you how to do that in an easy manner. Once you have exported your .p12 certificate file, you can encode it to base64 as seen in the tutorial with the following command:

```bash
base64 Certificates.p12 | pbcopy
```

Now you're ready to create some GitHub project secrets, just as with Windows:

- **APPLE\_DEVELOPER\_CERTIFICATE\_P12\_BASE64** with the contents of your newly copied base64 certificate.
- **APPLE\_DEVELOPER\_CERTIFICATE\_PASSWORD** with the contents of your certificate password.
- **APPLE\_PASSWORD** with the contents of an App-Specific password to your Apple-ID account which you can generate [here](https://appleid.apple.com/account/manage).

Let's make sure we are able to build our Wails app in our GitHub Action workflow. Here is a small template:

```yaml
name: "example"
on:
  workflow_dispatch:
    # This Action only starts when you go to Actions and manually run the workflow.

jobs:
  package:
    strategy:
      matrix:
        platform: [windows-latest, macos-latest]
        go-version: [1.18]
    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v3
      - name: Install Go
        uses: actions/setup-go@v2
        with:
          go-version: ${{ matrix.go-version }}
      - name: setup node
        uses: actions/setup-node@v2
        with:
          node-version: 14
      # You may need to manually build you frontend here, unless you have configured frontend build and install commands in wails.json.
      - name: Get Wails
        run: go install github.com/wailsapp/wails/v2/cmd/wails@latest
      - name: Build Wails app
        run: |
          wails build
      - name: upload artifacts macOS
        if: matrix.platform == 'macos-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-macos
          path: build/bin/*
      - name: upload artifacts windows
        if: matrix.platform == 'windows-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-windows
          path: build/bin/*
```

For code signing on macOS, [gon](https://github.com/Bearer/gon) is a very handy tool for code signing and communicating with Apple servers, also written in Go, and will be used in this guide.

After the `Build Wails app` step, add the following to the workflow:

```yaml
- name: MacOS download gon for code signing and app notarization
  if: matrix.platform == 'macos-latest'
  run: |
    brew install Bearer/tap/gon
```

Now we need to configure some gon config files in our `build/darwin` directory:

1. gon-sign.json:

```json
{
  "source": ["./build/bin/app.app"],
  "bundle_id": "app.myapp",
  "apple_id": {
    "username": "[email protected]",
    "password": "your-app-specific-password",
    "provider": "ABCDE12345"
  },
  "sign": {
    "application_identity": "Developer ID Application: Human User"
  }
}
```

Here is a brief break down of the above fields:

- `source`: The location of your wails binary to be signed
- `apple_id`:
  
  - `username`: Your Apple ID email address
  - `password`: Your app-specific password
  - `provider`: Your team ID for your App Store Connect account
- `sign`:
  
  - `application_identity`: Your Apple developer identity

The ([https://developer.apple.com/documentation/technotes/tn3147-migrating-to-the-latest-notarization-tool)\[deprecated](https://developer.apple.com/documentation/technotes/tn3147-migrating-to-the-latest-notarization-tool%29%5Bdeprecated) Apple's altool]'s syntax supporting `@env:` is no longer available since Apple has migrated to the new notarytool.

Your developer identity and team ID can both by found on macOS by running the following command:

```bash
$ security find-identity -v -p codesigning
  1) 00000000000000000000000000000000000000000 "Developer ID Application: Human User (ABCDE12345)"
```

2. entitlements.plist:

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.security.app-sandbox</key>
  <true/>
  <key>com.apple.security.network.client</key>
  <true/>
  <key>com.apple.security.network.server</key>
  <true/>
  <key>com.apple.security.files.user-selected.read-write</key>
  <true/>
  <key>com.apple.security.files.downloads.read-write</key>
  <true/>
</dict>
</plist>
```

In this file you configure the entitlements you need for you app, e.g. camera permissions if your app uses the camera. Read more about entitlements [here](https://developer.apple.com/documentation/bundleresources/entitlements).

Make sure you have updated your `Info.plist` file with the same bundle ID as you entered in `gon-sign.json`. Here's an example `Info.plist` file:

```plist
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
    <key>CFBundlePackageType</key><string>APPL</string>
    <key>CFBundleName</key><string>MyApp</string>
    <key>CFBundleExecutable</key><string>app</string>
    <key>CFBundleIdentifier</key><string>app.myapp</string>
    <key>CFBundleVersion</key><string>0.1.0</string>
    <key>CFBundleGetInfoString</key><string>My app is cool and nice and chill and</string>
    <key>CFBundleShortVersionString</key><string>0.1.0</string>
    <key>CFBundleIconFile</key><string>iconfile</string>
    <key>LSMinimumSystemVersion</key><string>10.13.0</string>
    <key>NSHighResolutionCapable</key><string>true</string>
    <key>LSApplicationCategoryType</key><string>public.app-category.utilities</string>
    <key>NSHumanReadableCopyright</key><string>© Me</string>
</dict></plist>
```

Now we're ready to add the signing step in our workflow after building the Wails app:

```yaml
- name: Import Code-Signing Certificates for macOS
  if: matrix.platform == 'macos-latest'
  uses: Apple-Actions/import-codesign-certs@v1
  with:
    # The certificates in a PKCS12 file encoded as a base64 string
    p12-file-base64: ${{ secrets.APPLE_DEVELOPER_CERTIFICATE_P12_BASE64 }}
    # The password used to import the PKCS12 file.
    p12-password: ${{ secrets.APPLE_DEVELOPER_CERTIFICATE_PASSWORD }}
- name: Sign our macOS binary
  if: matrix.platform == 'macos-latest'
  run: |
    echo "Signing Package"
    gon -log-level=info ./build/darwin/gon-sign.json
```

Please note that signing binaries with Apple could take anywhere from minutes to hours.

## Combined workflow file:[​](signing.html#combined-workflow-file "Direct link to heading")

Here is our GitHub workflow file with Windows + macOS combined:

```yaml
name: "example combined"
on:
  workflow_dispatch:
  # This Action only starts when you go to Actions and manually run the workflow.

jobs:
  package:
    strategy:
      matrix:
        platform: [windows-latest, macos-latest]
        go-version: [1.18]
    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v3
      - name: Install Go
        uses: actions/setup-go@v2
        with:
          go-version: ${{ matrix.go-version }}
      - name: setup node
        uses: actions/setup-node@v2
        with:
          node-version: 14
      # You may need to manually build you frontend here, unless you have configured frontend build and install commands in wails.json.
      - name: Get Wails
        run: go install github.com/wailsapp/wails/v2/cmd/wails@latest
      - name: Build Wails app
        run: |
          wails build
      - name: MacOS download gon for code signing and app notarization
        if: matrix.platform == 'macos-latest'
        run: |
          brew install Bearer/tap/gon
      - name: Import Code-Signing Certificates for macOS
        if: matrix.platform == 'macos-latest'
        uses: Apple-Actions/import-codesign-certs@v1
        with:
          # The certificates in a PKCS12 file encoded as a base64 string
          p12-file-base64: ${{ secrets.APPLE_DEVELOPER_CERTIFICATE_P12_BASE64 }}
          # The password used to import the PKCS12 file.
          p12-password: ${{ secrets.APPLE_DEVELOPER_CERTIFICATE_PASSWORD }}
      - name: Sign our macOS binary
        if: matrix.platform == 'macos-latest'
        run: |
          echo "Signing Package"
          gon -log-level=info ./build/darwin/gon-sign.json
      - name: Sign Windows binaries
        if: matrix.platform == 'windows-latest'
        run: |
          echo "Creating certificate file"
          New-Item -ItemType directory -Path certificate
          Set-Content -Path certificate\certificate.txt -Value '${{ secrets.WIN_SIGNING_CERT }}'
          certutil -decode certificate\certificate.txt certificate\certificate.pfx
          echo "Signing our binaries"
          & 'C:/Program Files (x86)/Windows Kits/10/bin/10.0.17763.0/x86/signtool.exe' sign /fd sha256 /tr http://ts.ssl.com /f certificate\certificate.pfx /p '${{ secrets.WIN_SIGNING_CERT_PASSWORD }}' .\build\bin\Monitor.exe
      - name: upload artifacts macOS
        if: matrix.platform == 'macos-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-macos
          path: build/bin/*
      - name: upload artifacts windows
        if: matrix.platform == 'windows-latest'
        uses: actions/upload-artifact@v2
        with:
          name: wails-binaries-windows
          path: build/bin/*
```

# End notes

This guide inspired by the RiftShare project and its workflow, which is highly recommended to check out [here](https://github.com/achhabra2/riftshare/blob/main/.github/workflows/build.yaml).

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/signing.mdx)

[Previous  
\
Routing](routing.html)

[Next  
\
Single Instance Lock](single-instance-lock.html)

Single Instance Lock | Wails

[Skip to main content](single-instance-lock.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/single-instance-lock) (v2.10).

- [](https://wails.io/)
- Guides
- Single Instance Lock

Version: Next Version 🚧

On this page

# Single Instance Lock

Single instance lock is a mechanism that allows you to prevent multiple instances of your app from running at the same time. It is useful for apps that are designed to open files from the command line or from the OS file explorer.

## Important[​](single-instance-lock.html#important "Direct link to heading")

Single Instance Lock does not implement a secure communications protocol between instances. When using single instance lock, your app should treat any data passed to it from second instance callback as untrusted. You should verify that args that you receive are valid and don't contain any malicious data.

## How it works[​](single-instance-lock.html#how-it-works "Direct link to heading")

Windows: Single instance lock is implemented using a named mutex. The mutex name is generated from the unique id that you provide. Data is passed to the first instance via a shared window using [SendMessage](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessage) macOS: Single instance lock is implemented using a named mutex. The mutex name is generated from the unique id that you provide. Data is passed to the first instance via [NSDistributedNotificationCenter](https://developer.apple.com/documentation/foundation/nsdistributednotificationcenter) Linux: Single instance lock is implemented using [dbus](https://www.freedesktop.org/wiki/Software/dbus/). The dbus name is generated from the unique id that you provide. Data is passed to the first instance via [dbus](https://www.freedesktop.org/wiki/Software/dbus/)

## Usage[​](single-instance-lock.html#usage "Direct link to heading")

When creating your app, you can enable single instance lock by passing a `SingleInstanceLock` struct to the `App` struct. Use the `UniqueId` field to specify a unique id for your app. This id is used to generate the mutex name on Windows and macOS and the dbus name on Linux. Use a UUID to ensure that the id is unique. The `OnSecondInstanceLaunch` field is used to specify a callback that is called when a second instance of your app is launched. The callback receives a `SecondInstanceData` struct that contains the command line arguments passed to the second instance and the working directory of the second instance.

Note that OnSecondInstanceLaunch don't trigger windows focus. You need to call `runtime.WindowUnminimise` and `runtime.Show` to bring your app to the front. Note that on linux systems window managers may prevent your app from being brought to the front to avoid stealing focus.

main.go

```go
var wailsContext *context.Context

// NewApp creates a new App application struct
func NewApp() *App {
    return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
    wailsContext = &ctx
}

func (a *App) onSecondInstanceLaunch(secondInstanceData options.SecondInstanceData) {
    secondInstanceArgs = secondInstanceData.Args

    println("user opened second instance", strings.Join(secondInstanceData.Args, ","))
    println("user opened second from", secondInstanceData.WorkingDirectory)
    runtime.WindowUnminimise(*wailsContext)
    runtime.Show(*wailsContext)
    go runtime.EventsEmit(*wailsContext, "launchArgs", secondInstanceArgs)
}

func main() {
    // Create an instance of the app structure
    app := NewApp()

    // Create application with options
    err := wails.Run(&options.App{
        Title:  "wails-open-file",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
        OnStartup:        app.startup,
        SingleInstanceLock: &options.SingleInstanceLock{
            UniqueId:               "e3984e08-28dc-4e3d-b70a-45e961589cdc",
            OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
        },
        Bind: []interface{}{
            app,
        },
    })

    if err != nil {
        println("Error:", err.Error())
    }
}
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/single-instance-lock.mdx)

[Previous  
\
Code Signing](signing.html)

[Next  
\
SvelteKit](sveltekit.html)

SvelteKit | Wails

[Skip to main content](sveltekit.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/sveltekit) (v2.10).

- [](https://wails.io/)
- Guides
- SvelteKit

Version: Next Version 🚧

On this page

# SvelteKit

This guide will go into:

1. Minimal Installation Steps - The steps needed to get a minimum Wails setup working for SvelteKit.
2. Install Script - Bash script for accomplishing the Minimal Installation Steps with optional Wails branding.
3. Important Notes - Issues that can be encountered when using SvelteKit + Wails and fixes.

## 1. Minimal Installation Steps[​](sveltekit.html#1-minimal-installation-steps "Direct link to heading")

##### Install Wails for Svelte.[​](sveltekit.html#install-wails-for-svelte "Direct link to heading")

- `wails init -n myapp -t svelte`

##### Delete the svelte frontend.[​](sveltekit.html#delete-the-svelte-frontend "Direct link to heading")

- Navigate into your newly created myapp folder.
- Delete the folder named "frontend"

##### While in the Wails project root. Use the Svelte CLI to create a SvelteKit project as the new frontend. Follow the prompts, nothing Wails specific is needed here.[​](sveltekit.html#while-in-the-wails-project-root-use-the-svelte-cli-to-create-a-sveltekit-project-as-the-new-frontend-follow-the-prompts-nothing-wails-specific-is-needed-here "Direct link to heading")

- `npx sv create frontend`

##### Modify wails.json.[​](sveltekit.html#modify-wailsjson "Direct link to heading")

- Add `"wailsjsdir": "./frontend/src/lib",` Do note that this is where your Go and runtime functions will appear.
- Change your package manager frontend here if not using npm.

##### Modify main.go.[​](sveltekit.html#modify-maingo "Direct link to heading")

- The first comment `//go:embed all:frontend/dist` needs to be changed to `//go:embed all:frontend/build`

##### Modify .gitignore[​](sveltekit.html#modify-gitignore "Direct link to heading")

- The line `frontend/dist` needs to be replaced with `frontend/build`

##### Install/remove dependencies using your favorite package manager.[​](sveltekit.html#installremove-dependencies-using-your-favorite-package-manager "Direct link to heading")

- Navigate into your "frontend" folder.
- `npm i`
- `npm uninstall @sveltejs/adapter-auto`
- `npm i -D @sveltejs/adapter-static`

##### Change adapter in svelte.config.js[​](sveltekit.html#change-adapter-in-svelteconfigjs "Direct link to heading")

- First line of file change `import adapter from '@sveltejs/adapter-auto';` to `import adapter from '@sveltejs/adapter-static';`

##### Put SvelteKit into SPA mode with prerendering.[​](sveltekit.html#put-sveltekit-into-spa-mode-with-prerendering "Direct link to heading")

- Create a file under myapp/frontend/src/routes/ named +layout.ts/+layout.js.
- Add two lines into the newly created file `export const prerender = true` and `export const ssr = false`

##### Test installation.[​](sveltekit.html#test-installation "Direct link to heading")

- Navigate back into the Wails project root (one directory up).
- run `wails dev`
- If the application doesn't run please check through the previous steps.

## 2. Install Script[​](sveltekit.html#2-install-script "Direct link to heading")

##### This Bash Script does the steps listed above. Make sure to read over the script and understand what the script is doing on your computer.[​](sveltekit.html#this-bash-script-does-the-steps-listed-above--make-sure-to-read-over-the-script-and-understand-what-the-script-is-doing-on-your-computer "Direct link to heading")

- Create a file sveltekit-wails.sh
- Copy the below code into the new file then save it.
- Make it executable with `chmod +x sveltekit-wails.sh`
- Brand is an optional param below that adds back in the wails branding. Leave third param blank to not insert the Wails branding.
- Example usage: `./sveltekit-wails.sh pnpm newapp brand`

##### sveltekit-wails.sh:[​](sveltekit.html#sveltekit-wailssh "Direct link to heading")

```text
manager=$1
project=$2
brand=$3
wails init -n $project -t svelte
cd $project
sed -i "s|npm|$manager|g" wails.json
sed -i 's|"auto",|"auto",\n  "wailsjsdir": "./frontend/src/lib",|' wails.json
sed -i "s|all:frontend/dist|all:frontend/build|" main.go
if [[ -n $brand ]]; then
    mv frontend/src/App.svelte +page.svelte
    sed -i "s|'./assets|'\$lib/assets|" +page.svelte
    sed -i "s|'../wails|'\$lib/wails|" +page.svelte
    mv frontend/src/assets .
fi
rm -r frontend
$manager create svelte@latest frontend
if [[ -n $brand ]]; then
    mv +page.svelte frontend/src/routes/+page.svelte
    mkdir frontend/src/lib
    mv assets frontend/src/lib/
fi
cd frontend
$manager i
$manager uninstall @sveltejs/adapter-auto
$manager i -D @sveltejs/adapter-static
echo -e "export const prerender = true\nexport const ssr = false" > src/routes/+layout.ts
sed -i "s|-auto';|-static';|" svelte.config.js
cd ..
wails dev
```

## 3. Important Notes[​](sveltekit.html#3-important-notes "Direct link to heading")

##### Server files will cause build failures.[​](sveltekit.html#server-files-will-cause-build-failures "Direct link to heading")

- +layout.server.ts, +page.server.ts, +server.ts or any file with "server" in the name will fail to build as all routes are prerendered.

##### The Wails runtime unloads with full page navigations\![​](sveltekit.html#the-wails-runtime-unloads-with-full-page-navigations "Direct link to heading")

- Anything that causes full page navigations: `window.location.href = '/<some>/<page>'` or Context menu reload when using wails dev. What this means is that you can end up losing the ability to call any runtime breaking the app. There are two ways to work around this.
- Use `import { goto } from '$app/navigation'` then call `goto('/<some>/<page>')` in your +page.svelte. This will prevent a full page navigation.
- If full page navigation can't be prevented the Wails runtime can be added to all pages by adding the below into the `<head>` of myapp/frontend/src/app.html

```text
<head>
...
    <meta name="wails-options" content="noautoinject" />
    <script src="/wails/ipc.js"></script>
    <script src="/wails/runtime.js"></script>
...
</head>
```

See [https://wails.io/docs/guides/frontend](https://wails.io/docs/guides/frontend) for more information.

##### Initial data can be loaded and refreshed from +page.ts/+page.js to +page.svelte.[​](sveltekit.html#initial-data-can-be-loaded-and-refreshed-from-pagetspagejs-to-pagesvelte "Direct link to heading")

- +page.ts/+page.js works well with load() [https://kit.svelte.dev/docs/load#page-data](https://kit.svelte.dev/docs/load#page-data)
- invalidateAll() in +page.svelte will call load() from +page.ts/+page.js [https://kit.svelte.dev/docs/load#rerunning-load-functions-manual-invalidation](https://kit.svelte.dev/docs/load#rerunning-load-functions-manual-invalidation).

##### Error Handling[​](sveltekit.html#error-handling "Direct link to heading")

- Expected errors using Throw error works in +page.ts/+page.js with a +error.svelte page. [https://kit.svelte.dev/docs/errors#expected-errors](https://kit.svelte.dev/docs/errors#expected-errors)
- Unexpected errors will cause the application to become unusable. Only recovery option (known so far) from unexpected errors is to reload the app. To do this create a file myapp/frontend/src/hooks.client.ts then add the below code to the file.

```text
import { WindowReloadApp } from '$lib/wailsjs/runtime/runtime' 
export async function handleError() {
    WindowReloadApp()
}
```

##### Using Forms and handling functions[​](sveltekit.html#using-forms-and-handling-functions "Direct link to heading")

- The simplest way is to call a function from the form is the standard, bind:value your variables and prevent submission `<form method="POST" on:submit|preventDefault={handle}>`
- The more advanced way is to use:enhance (progressive enhancement) which will allow for convenient access to formData, formElement, submitter. The important note is to always cancel() the form which prevents server side behavior. [https://kit.svelte.dev/docs/form-actions#progressive-enhancement](https://kit.svelte.dev/docs/form-actions#progressive-enhancement) Example:

```text
<form method="POST" use:enhance={({cancel, formData, formElement, submitter}) => {
    cancel()
    console.log(Object.fromEntries(formData))
    console.log(formElement)
    console.log(submitter)
    handle()
}}>
```

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/sveltekit.mdx)

[Previous  
\
Single Instance Lock](single-instance-lock.html)

[Next  
\
Templates](templates.html)

Templates | Wails

[Skip to main content](templates.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/templates) (v2.10).

- [](https://wails.io/)
- Guides
- Templates

Version: Next Version 🚧

On this page

# Templates

Wails generates projects from pre-created templates. In v1, this was a difficult to maintain set of projects that were subject to going out of date. In v2, to empower the community, a couple of new features have been added for templates:

- Ability to generate projects from [Remote Templates](../reference/cli.html#remote-templates)
- Tooling to help create your own templates

## Creating Templates[​](templates.html#creating-templates "Direct link to heading")

To create a template, you can use the `wails generate template` command. To generate a default template, run:

`wails generate template -name mytemplate`

This creates the directory "mytemplate" with default files:

mytemplate/

```shell
.
|-- NEXTSTEPS.md
|-- README.md
|-- app.tmpl.go
|-- frontend
|   `-- dist
|       |-- assets
|       |   |-- fonts
|       |   |   |-- OFL.txt
|       |   |   `-- nunito-v16-latin-regular.woff2
|       |   `-- images
|       |       `-- logo-dark.svg
|       |-- index.html
|       |-- main.css
|       `-- main.js
|-- go.mod.tmpl
|-- main.tmpl.go
|-- template.json
`-- wails.tmpl.json
```

### Template Overview[​](templates.html#template-overview "Direct link to heading")

The default template consists of the following files and directories:

| Filename / Dir  | Description                                  |
|-----------------|----------------------------------------------|
| NEXTSTEPS.md    | Instructions on how to complete the template |
| README.md       | The README published with the template       |
| app.tmpl.go     | `app.go` template file                       |
| frontend/       | The directory containing frontend assets     |
| go.mod.tmpl     | `go.mod` template file                       |
| main.tmpl.go    | `main.go` template file                      |
| template.json   | The template metadata                        |
| wails.tmpl.json | `wails.json` template file                   |

At this point it is advisable to follow the steps in `NEXTSTEPS.md`.

## Creating a Template from an Existing Project[​](templates.html#creating-a-template-from-an-existing-project "Direct link to heading")

It's possible to create a template from an existing frontend project by passing the path to the project when generating the template. We will now walk through how to create a Vue 3 template:

- Install the vue cli: `npm install -g @vue/cli`
- Create the default project: `vue create vue3-base`
  
  - Select `Default (Vue 3) ([Vue 3] babel, eslint)`
- After the project has been generated, run:

```shell
> wails generate template -name wails-vue3-template -frontend .\vue3-base\
Extracting base template files...
Migrating existing project files to frontend directory...
Updating package.json data...
Renaming package.json -> package.tmpl.json...
Updating package-lock.json data...
Renaming package-lock.json -> package-lock.tmpl.json...
```

- The template may now be customised as specified in the `NEXTSTEPS.md` file
- Once the files are ready, it can be tested by running: `wails init -n my-vue3-project -t .\wails-vue3-template\`
- To test the new project, run: `cd my-vue3-project` then `wails build`
- Once the project has compiled, run it: `.\build\bin\my-vue3-project.exe`
- You should have a fully functioning Vue3 application:

![](../../../assets/images/vue3-template-5c50f73d202be94b350878c9f3494a57.png)

## Publishing Templates[​](templates.html#publishing-templates "Direct link to heading")

Publishing a template is simply pushing the files to GitHub. The following best practice is encouraged:

- Remove any unwanted files and directories (such as `.git`) from your frontend directory
- Ensure that `template.json` is complete, especially `helpurl`
- Push the files to GitHub
- Create a PR on the [Community Templates](../community/templates.html) page
- Announce the template on the [Template Announcement](https://github.com/wailsapp/wails/discussions/825) discussion board

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/templates.mdx)

[Previous  
\
SvelteKit](sveltekit.html)

[Next  
\
Troubleshooting](troubleshooting.html)

Troubleshooting | Wails

[Skip to main content](troubleshooting.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/troubleshooting) (v2.10).

- [](https://wails.io/)
- Guides
- Troubleshooting

Version: Next Version 🚧

On this page

# Troubleshooting

An assortment of troubleshooting tips.

## The `wails` command appears to be missing?[​](troubleshooting.html#the-wails-command-appears-to-be-missing "Direct link to heading")

If your system is reporting that the `wails` command is missing, make sure you have followed the Go installation guide correctly. Normally, it means that the `go/bin` directory in your User's home directory is not in the `PATH` environment variable. You will also normally need to close and reopen any open command prompts so that changes to the environment made by the installer are reflected at the command prompt.

## My application is displaying a white/blank screen[​](troubleshooting.html#my-application-is-displaying-a-whiteblank-screen "Direct link to heading")

Check that your application includes the assets from the correct directory. In your `main.go` file, you will have something similar to the following code:

```go
//go:embed all:frontend/dist
var assets embed.FS
```

Check that `frontend/dist` contains your application assets.

### Mac[​](troubleshooting.html#mac "Direct link to heading")

If this happens on Mac, try adding the following to your `Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsLocalNetworking</key>
    <true/>
</dict>
```

Reference: [https://github.com/wailsapp/wails/issues/1504#issuecomment-1174317433](https://github.com/wailsapp/wails/issues/1504#issuecomment-1174317433)

## Mac application not valid[​](troubleshooting.html#mac-application-not-valid "Direct link to heading")

If your built application looks like this in finder:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACQCAMAAACfxRFaAAAA4VBMVEUxMTYbGyH///+KiorZ2NkvLzSKiYrZ2tjY2NjZ2dqIiIjX19ctLTKHh4f8/PzW1tb+/f7b29vq6upvb3JDQ0ba2trU1NTp6enQ0NCAgILt7e3y8vLHx8eGhoZaWl3h4OH39/f19fWQkJCtra2Xl5fT09PS0tLNzc2TlJT6+/r5+fmEhITLy8vd3d2hoqJbW17i4uLPz8/v7+/Jycnm5uaamprk5OTf3t6/vr6BgYKqqqq3t7eLi4qNjY2wsLCzs7Oenp0pKS28vLzDw8KmpqYgICU5OTxOTlEUFBRnZ2p6enwPp/MAAAAOUUlEQVR42uzU3WqDMBiA4UzykYSGog5X0FEd7KAWpOLKhMEOhFnZ/d/Q8rOuq9PmJKUZ5C0aawh9CKHo7p/lwaM8eALcdxzQjQPe9QbwiYscaZqMnPUqsRnskFeIzeAeOVU/AXZ4g8UWG8EcORU3gm/+f3YeGMHIsTx4lAd78CgP9uBRHuzBozzYg0c5BYYrdgUwAEfDerdbH9vJZ/311/in07xqYv1w6DhYBwMfPtqmXOpKfTsvDMNlkaXxvs7bqm3zeh83WaFen5pY/7R/vAcAu2Dgm21gaJut6jbCjBGWMJxgIq6oyldZGRh7GTjYBAN/Cy4WFnEeUUqFEmMmPuKBMCwS75I8LUKD+HUAsAcG/v4jCyYqm5pRKSWYCa1CK7q8MYlO8qacW69bHGyCh+zSUYgrubcMy2iCFZQpL1NuiglZ4Cq+dKjCYMPBFhj48/zebFcRVUSqz8A3WIxMkeWl52m0miUvg6A92AN3D7M/lEZy/+QJ0IOKESbJhOkzcZzHtEqFbK5Pe+AvXsyFt00YisLaahGDRzxHAzLAI5CSFwlKmzXvl7Jpq/b/f9B8MQ3Oo3tIda40pJWgfJwcn+vrH9Er3xFHGNcwIAGiiSQ2XCU5kKr3MYli1QYntv71dsCfvOu+8xBGgFTmggkiUoIJoYRSQuCClfvSGo3X1t3nD28H3Lj2Ba0I3FCTyKCs4ESj8Vc/iFui4sD3xiNMKCnvl24mUes68AJWnUbggEl5y19f6Dr6+jion3l88DhllGLQ2ESOXH0suK7wGwJ7lxHq4yMrAnHNaaDCqtDB1BTIsuSy9PUDX9oXLFk2NkJZ44/9t+8zSkpcKOzpBb60hGc67KWQy5S0ej3/KIZn5HOOd9tF5yzbx1puTanu35A9t63Ukn9eLH7Nb7PoGt9sWdzi2T56/4/1mC/sl7KsL8+iDjfxsM/C9Z1xB2Xdza+22+udfDAXD9yVj25+vnv+FNzCwwFyJhuj+F47cd//V7mJDcTw7Pru0zPXlcOeIluLIWeYFCrZ99OrstbjIIivG3v6JIhlrRc/JjdIiXqEEesmBui7v8zTgT/Z5fc9Uff5Lhxdtgh/b8PLwvNGr3UDYI+gmtNMgPfJP6f16HCVZZwXC5JnC7vXTuNL4tLFfOfrj7UYwbzWSSzhhzPeeDYMw27bNoxCP7haVpYto/iM+L50xWbCYt0p8THCsI9xe5aVjE+ioD6bhJNus/kEOQC4EtngeTiZnSbJOLHgvrU3cVTXbAmfQH91BLDhnq23WtjtuATy46Ts781h2D0Ncrd4H3vFatjXCzxgcoYgvexwEQ1mkxK2AvEKZqMEXtJOdxI6dfXzBy4ETroMYdaH/2sDbhBUbIFJLx9cBgRyUS23JKfENgAYUbfZDR9Ux/dz27ByU0wmuKHRwyBwzQGJ6dP42sCE8UMCkFUBsIMwTZuHp6kaxxvDOjAkig00WeIjCIzLPW2ne7UVB+ggW2/5TwIzUxDTbdZTiQ9Z8sBg9iON8nkNCvdH5XBGa/3r2wY/t1V1DQlcjBm5zdUcjHt5eSAw6mvbrT1iObNjt6F880rtZnMOkCqytWRwHpT2DCPLlc42XDnyPIs8arPEGMuZiCIlPVefl/VK5vqWy+V2vNptYQnEQliC2U5Zoi7F8hQg0mCJQtGWI2cinCoCu9zKVuoonfO7k+JtJp4ZbcErlq2EdyMtJyazpckSPjalwLRycHAv8olPzhqvEsSgsGDC++Kv/D6oJKakFMDXtJeIZEYQd6x4NhPd1zKIQhwl1kmstR0HFbslqGyudOi0PJSLPurIYQhhEw7MSBpUciaWsYZ9vJpYriHhpIltsASbl1tKK6mSIkgJAIvXaWnpdI8YgE1EcV0VuCDjT4EScaEtlxyUXHRsyeULGIrEdezi4twIB28PLEA8LA/U3UgJU7sUkn9TZ7gVr9ozKGzS45zBe/GpJwQy8eBF39wSM3l0gjvVj5pC6sofezVSiPtLbqwVhdlwU+yR4cI7laE6RB4QRhpSAtocGALTtEr/Nn9x6/rbJFLnVJgq1jKHtwJ4Va3DrF1FoEulJ0Z9DcAtU57/urX6EatnvTSI9aQ5+aoQe+KWXHt86yDnuy0/KMqqPFFHbnl+HGtYdAGRwOnsSDWyjnm76boPO6YQo7UUFRQu9vtVrx4dPzRLMQZkEmgA9ok89+tUCRZmx/6QPJB0n6hzxRAYJTALpaHLKA6rTaYwMXgC+xqAPRiNkACuqHa8TFzDSDrmQ5LtY3UDyeFGAbwr1V7LWbnqzgAMvc7T0Dh+t3M1zEkDQdTRlFxyDQdqPoaAASShQEDCt7a1VTrO+P//kLd7B7lElKo9Rh0WRejZ5nXZ29t79zYLUQzSYLa/3sSRyZUHplff2JUR1kHSqm9b0sMG/Md9EDuTnGxLqGBfFxoATwmGBAvCPSKoGuRM6nn1DzwxlOsgnHTjpItYpdm9wX7WBozgyrHSEBIA2ATAnXzZsCWOir2kHqaMVrNYB0FIrLeYR3ZLiZImOgET5c9UQ/ETYTFIWNBWsposfIFi2CJ422bFOggAv3UKHr4K958BeBiOdiMNeTjCHF8EjPGLHr533zpiJb5VFxB2Yzt3ruRWYBxDoq0CxgPHSFcMG2QfErVdSGC5NmE9iQp3bjgO1uSAgyK34uQ7lA4HDAeOZKohhldiengw6Wp4uarAiDXkw47xgZ3bUNmXXo/uPtsi+8nxygbhykknssRKAz+8IJaJHlbTWmVXrH24howhP3KiUm4PH3n62BlyrF6e1iCGMa3pWDhwy0xY5isLR85H3WNZISr2dK3WQZurIk/xMM0rDoxhWDh0LM3EBRezYKouzRKJPenuScubZrEOCiW7KsdvNvlSOc0YVsS0oSGthdRCoiYY58VPDqS7TwP20ov7TTVVjG8Vvs3uBWE+ElDTwi2HhizRMdBowqrKyiFDAmZVXrCzJJ0slFQR2MrwRzLYxzdLqGGCG3SUl8hTmSaNM7WAf/G9beuEBVdLlQ/aOvuQuN3mzm9nHsUdx3igYxMa8YQJeU0hp2MArJIQ8JF7BqHxcvQwzKm32l1LjttLZYfV6HuiQIm07Jp9mNCQJvIc0JGZWAKWZKVpGt6yxAc9tOTwnXLOu87yrKaBlwipYeGsi5VtPuIoMKwb4P7Y0i7WQbOlg0n4tunnKToO+I809WzzkUiRxE9/ViBSFLhQiiWuYbkA2LY9lcHGvGffs3wGzPoeNQ2QD7b18MNTgrIprz9W6dW8Modn5wHZYLq0OfjbSOGPCRb618qp9RpD2LRIpIkMfCnrtSQYKquCrYYEnAOYFoYEf1M8yZvzD6Ob5eE0DBKGekfa0MQPt4U8kcapwqR5dkWN4G6AAju65F9GBruwyXMms/ztIo0pZkq3rYkfruGmAwq2ZKDQUirn7kwwr7ocMPp99LawyXs/V94lAUMHkEjrkYFw8eIQg40xKihOrI6R+1MVHOF1W3VwIvhhMtN21lwdI2DiZcHgwNEx8ikcMMTwLrTtVvoDyWaQQY7AZU7fOd1LCtSEyeJULW4WV05FwruHccNCwHIWvnAPAo4ggsHoS41Ht0PwH1bxaagi7jmyyryro34YAO/Waqe7OHBEFvYDXJZNXQeL8kI+IS5GcT9V539jImbezbyO4wZ6WCZoILslUGWR68cUkqRF0Bda+OGaOFoUgLzrTUGGeW3bFc5OMKSzcNLd7Kci1EElyOt5wgjSBuOhXhlYQwYe27yIi4qCXsuGAyM0y+vZkh9G+u9jrSQjm2c8IFyxaOgFXAV6ArYe20p3WgjLzqbrbF0he5ZpTZYXo25JKhamfY8iLwMHSBrlB4jLFCrx5u2oLKFpNBljBimlNae3KUttsjRhRIiiO6cQKcGF3PTWbi1nZbXibOpSj1EDJDa20xpVDoiUOkGa8IDA4to/jQwMAIMQbASyqpINwsZqXaf3V72lKgNT8c4TT7KsUU2/fhiFdiYcbfK00CoI7Wr5K66061QPihvDbB54VGjk6+3T6IdDoFRiwa524+e/ZC/TFPCKJpXwVPrhBgFdlTiYtT8PHw+3um4iXqx5jMbp9MM+3VULPGlNVo/FGyZcKcawYckyqX9C0X5tQWjPgbUNtH83n8PHwB2u5/MsZpI6IYvaKTXwNZ9Ount7cZ8Nj+mHB6s+D4eYGehfwHtKDXyNI04CYX2uottu0mlbHS/DbQPcLGGUiJYw6pfxatQPS2u4luvCX4OyOEubqdsY/LDFIAW4HoYv6nBgvp3KwzWl8cTELiNCmZdkoGx1/XL2rXZ8t98UcKloAjOONJ7obO2hsu0EIQd9jrmZsfWiMQs7nXDGlzyWNZugeQW4BDsDTbW1R39aKzc6GNDFBQ+DQ46TIOMBXbA0zYIkZuhdS3RdQvPUiT2stqdRLLss6WYAzVFLywIO1kPnyn41QorqZ521xGGrQQMgEkJ4ZMNBM49bHHtojIPdj/NoUBoAtWaJL9MfZ9iBX4fGWtmnaBDuaWmE8De4icZxbLEsfn+pAfDpYvjSeP7zJlZqoIhU/MF/0Eyl9ZbkTaz6WywvJz+/1GAWueBLZMokSJC47dtDqTudHeuv8r9cPGGbMBd+/7yVGhqxMQgApMwcFhYNPBSON2Lz32byVG3Cx10swQxnfjS2CBG4CZoxjhZh+4hvcSO6en3xlK3uz7bPH2O1QTts+IvVNIqm04XfyBt8jlnn6+XTAcZE8fEY1j8aj9496c0EsBn7a3P2XI8N6ldfAO9T3xDj0+uvr7TYm2eXFxeabjlyyR/wXLBL8ZXfHEfTeFMX/sPxAS/hHTzhK3j9O+Pnu9D8kp0BnwGX7Az4DLhkZ8BnwCU7A/7/bpj8z92S+p+76fffdVv1iwO3Vf8GPq/IeRWycaMAAAAASUVORK5CYII=)

it's likely that your application's `info.plist` is invalid. Update the file in `build/<yourapp>.app/Contents/info.plist` and check if the data is valid, EG check the binary name is correct. To persist the changes, copy the file back to the `build/darwin` directory.

## My application is not displaying the correct icon in Windows Explorer[​](troubleshooting.html#my-application-is-not-displaying-the-correct-icon-in-windows-explorer "Direct link to heading")

If your application is not displaying the correct icon, try deleting the hidden `IconCache.db` file located in the `C:\Users\<your username>\AppData\Local` directory. This will force Windows to rebuild the icon cache.

Source: [https://github.com/wailsapp/wails/issues/2360#issuecomment-1556070036](https://github.com/wailsapp/wails/issues/2360#issuecomment-1556070036)

## Cannot call backend method from frontend with variadic arguments[​](troubleshooting.html#cannot-call-backend-method-from-frontend-with-variadic-arguments "Direct link to heading")

If you have a backend method defined with variadic parameters, eg:

```go
func (a *App) TestFunc(msg string, args ...interface{}) error {
    // Code
}
```

calling this method from the frontend like this will fail:

```js
var msg = "Hello: ";
var args = ["Go", "JS"];
window.go.main.App.TestFunc(msg, ...args)
  .then((result) => {
    //do things here
  })
  .catch((error) => {
    //handle error
  });
```

Workaround:

```js
var msg = "Hello ";
var args = ["Go", "JS"];
window.go.main.App.TestFunc(msg, args)
  .then((result) => {
    //without the 3 dots
    //do things here
  })
  .catch((error) => {
    //handle error
  });
```

Credit: [https://github.com/wailsapp/wails/issues/1186](https://github.com/wailsapp/wails/issues/1186)

## I'm having getting proxy errors when trying to install Wails[​](troubleshooting.html#im-having-getting-proxy-errors-when-trying-to-install-wails "Direct link to heading")

If you are getting errors like this:

```text
"https://proxy.golang.org/github.com/wailsapp/wails/cmd/wails/@v/list": dial tcp 172.217.163.49:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
```

it's probably because the official Go Proxy is being blocked (Users in China have reported this). The solution is to set up the proxy manually, eg:

```text
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

Source: [https://github.com/wailsapp/wails/issues/1233](https://github.com/wailsapp/wails/issues/1233)

## The generated TypeScript doesn't have the correct types[​](troubleshooting.html#the-generated-typescript-doesnt-have-the-correct-types "Direct link to heading")

Sometimes the generated TypeScript doesn't have the correct types. To mitigate this, it is possible to specify what types should be generated using the `ts_type` struct tag. For more details, please read [this](https://github.com/tkrajina/typescriptify-golang-structs#custom-types).

## When I navigate away from `index.html`, I am unable to call methods on the frontend[​](troubleshooting.html#when-i-navigate-away-from-indexhtml-i-am-unable-to-call-methods-on-the-frontend "Direct link to heading")

If you navigate away from `index.html` to a new html file, the context will be lost. This can be fixed by adding the following imports to the `<head>` section of any new page you navigate to:

```html
<head>
  <script src="/wails/ipc.js"></script>
  <script src="/wails/runtime.js"></script>
</head>
```

Source: [https://github.com/wailsapp/wails/discussions/1512](https://github.com/wailsapp/wails/discussions/1512)

## I get `too many open files` errors on my Mac when I run `wails dev`[​](troubleshooting.html#i-get-too-many-open-files-errors-on-my-mac-when-i-run-wails-dev "Direct link to heading")

By default, macOS will only allow you to open a maximum of 256 files. This can affect the `wails dev` command. This limit can be increased by running: `ulimit -n 1024` in the terminal.

FSNotify is [looking to move to Apple's fsevents](https://github.com/fsnotify/fsnotify/issues/11) for Mac. If this isn't completed soon, we will create our own implementation, tracked [here](https://github.com/wailsapp/wails/issues/1733).

## My Mac app gives me weird compilation errors[​](troubleshooting.html#my-mac-app-gives-me-weird-compilation-errors "Direct link to heading")

A few users have reported seeing compilation errors such as the following:

```shell
# github.com/wailsapp/wails/v2/internal/frontend/desktop/darwin
In file included from ../../pkg/mod/github.com/wailsapp/wails/[email protected]/internal/frontend/desktop/darwin/callbacks.go:9:
In file included from /Library/Developer/CommandLineTools/SDKs/MacOSX12.1.sdk/System/Library/Frameworks/Foundation.framework/Headers/Foundation.h:12:
/Library/Developer/CommandLineTools/SDKs/MacOSX12.1.sdk/System/Library/Frameworks/Foundation.framework/Headers/NSBundle.h:91:143: error: function does not return NSString
- (NSAttributedString *)localizedAttributedStringForKey:(NSString *)key value:(nullable NSString *)value table:(nullable NSString *)tableName NS_FORMAT_ARGUMENT(1) NS_REFINED_FOR_SWIFT API_AVAILABLE(macos(12.0), ios(15.0), watchos(8.0), tvos(15.0));
                                                         ~~~~~~~~~~~~~~                                                                       ^                  ~
/Library/Developer/CommandLineTools/SDKs/MacOSX12.1.sdk/System/Library/Frameworks/Foundation.framework/Headers/NSObjCRuntime.h:103:48: note: expanded from macro 'NS_FORMAT_ARGUMENT'
        #define NS_FORMAT_ARGUMENT(A) __attribute__ ((format_arg(A)))
```

This is *normally* due to a mismatch with the OS version you are running and the version of the XCode Command Line Tools installed. If you see an error like this, try upgrading your XCode Command Line Tools to the latest version.

If reinstalling Xcode Command Tools still fails, you can check the path where the toolkit is located using:

`xcode-select -p`

If `/Applications/Xcode.app/Contents/Developer` is displayed, run `sudo xcode-select --switch /Library/Developer/CommandLineTools`

Sources: [https://github.com/wailsapp/wails/issues/1806](https://github.com/wailsapp/wails/issues/1806) and [https://github.com/wailsapp/wails/issues/1140#issuecomment-1290446496](https://github.com/wailsapp/wails/issues/1140#issuecomment-1290446496)

## My application won't compile on Mac[​](troubleshooting.html#my-application-wont-compile-on-mac "Direct link to heading")

If you are getting errors like this:

```shell
l1@m2 GoEasyDesigner % go build -tags dev -gcflags "all=-N -l"
/Users/l1/sdk/go1.20.5/pkg/tool/darwin_arm64/link: running clang failed: exit status 1
Undefined symbols for architecture arm64:
  "_OBJC_CLASS_$_UTType", referenced from:
      objc-class-ref in 000016.o
ld: symbol(s) not found for architecture arm64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

Ensure you have the latest SDK installed. If so and you're still experiencing this issue, try the following:

```shell
export CGO_LDFLAGS="-framework UniformTypeIdentifiers" && go build -tags dev -gcflags "all=-N -l"
```

Sources: [https://github.com/wailsapp/wails/pull/2925#issuecomment-1726828562](https://github.com/wailsapp/wails/pull/2925#issuecomment-1726828562)

--

## Cannot start service: Host version "x.x.x does not match binary version "x.x.x"[​](troubleshooting.html#cannot-start-service-host-version-xxx-does-not-match-binary-version-xxx "Direct link to heading")

It's preferable to add `frontend/node_modules` and `frontend/package-lock.json` to your `.gitignore`. Otherwise when opening your repository on another machine that may have different versions of Node installed, you may not be able to run your application.

If this does happen, simply delete `frontend/node_modules` and `frontend/package-lock.json` and run your `wails build` or `wails dev` command again.

## Build process stuck on "Generating bindings"[​](troubleshooting.html#build-process-stuck-on-generating-bindings "Direct link to heading")

Bindings generation process runs your application in a special mode. If application, intentionally or unintentionally, contains an endless loop (i.e. not exiting after `wails.Run()` finished), this can lead to build process stuck on the stage of bindings generation. Please make sure your code exits properly.

## Mac application flashes white at startup[​](troubleshooting.html#mac-application-flashes-white-at-startup "Direct link to heading")

This is due to the default background of the webview being white. If you want to use the window background colour instead, you can make the webview background transparent using the following config:

```go
    err := wails.Run(&options.App{
        Title:  "macflash",
        Width:  1024,
        Height: 768,
        // Other settings
        Mac: &mac.Options{
            WebviewIsTransparent: true,
        },
    })
```

## I get a "Microsoft Edge can't read or write to its data directory" error when running my program as admin on Windows[​](troubleshooting.html#i-get-a-microsoft-edge-cant-read-or-write-to-its-data-directory-error-when-running-my-program-as-admin-on-windows "Direct link to heading")

You set your program to require admin permissions and it worked great! Unfortunately, some users are seeing a "Microsoft Edge can't read or write to its data directory" error when running it.

When a Windows machine has two local accounts:

- Alice, an admin
- Bob, a regular user

Bob sees a UAC prompt when running your program. Bob enters Alice's admin credentials into this prompt. The app launches with admin permissions under Alice's account.

Wails instructs WebView2 to store user data at the specified `WebviewUserDataPath`. It defaults to `%APPDATA%\[BinaryName.exe]`.

Because the application is running under Alice's account, `%APPDATA%\[BinaryName.exe]` resolves to `C:\Users\Alice\AppData\Roaming\[BinaryName.exe]`.

WebView2 [creates some child processes under Bob's logged-in account instead of Alice's admin account](https://github.com/MicrosoftEdge/WebView2Feedback/issues/932#issue-807464179). Since Bob cannot access `C:\Users\Alice\AppData\Roaming\[BinaryName.exe]`, the "Microsoft Edge can't read or write to its data directory" error is shown.

Possible solution #1:

Refactor your application to work without constant admin permissions. If you just need to perform a small set of admin tasks (such as running an updater), you can run your application with the minimum permissions and then use the `runas` command to run these tasks with admin permissions as needed:

```go
//go:build windows

package sample

import (
    "golang.org/x/sys/windows"
    "syscall"
)

// Calling RunAs("C:\path\to\my\updater.exe") shows Bob a UAC prompt. Bob enters Alice's admin credentials. The updater launches with admin permissions under Alice's account.
func RunAs(path string) error {
    verbPtr, _ := syscall.UTF16PtrFromString("runas")
    exePtr, _ := syscall.UTF16PtrFromString(path)
    cwdPtr, _ := syscall.UTF16PtrFromString("")
    argPtr, _ := syscall.UTF16PtrFromString("")

    var showCmd int32 = 1 //SW_NORMAL

    err := windows.ShellExecute(0, verbPtr, exePtr, argPtr, cwdPtr, showCmd)
    if err != nil {
        return err
    }
    return nil
}
```

Possible solution #2:

Run your application with extended permissions. If you absolutely must run with constant admin permissions, WebView2 will function correctly if you use a data directory accessible by both users and you also launch your app with the `SeBackupPrivilege`, `SeDebugPrivilege`, and `SeRestorePrivilege` permissions. Here's an example:

```go
package main

import (
    "embed"
    "os"
    "runtime"

    "github.com/fourcorelabs/wintoken"
    "github.com/hectane/go-acl"
    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
    "github.com/wailsapp/wails/v2/pkg/options/assetserver"
    "github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

const (
    fixedTokenKey = "SAMPLE_RANDOM_KEY"
    fixedTokenVal = "with-fixed-token"
    webviewDir    = "C:\\ProgramData\\Sample"
)

func runWithFixedToken() {
    println("Re-launching self")
    token, err := wintoken.OpenProcessToken(0, wintoken.TokenPrimary) //pass 0 for own process
    if err != nil {
        panic(err)
    }
    defer token.Close()

    token.EnableTokenPrivileges([]string{
        "SeBackupPrivilege",
        "SeDebugPrivilege",
        "SeRestorePrivilege",
    })

    cmd := exec.Command(os.Args[0])
    cmd.Args = os.Args
    cmd.Env = os.Environ()
    cmd.Env = append(cmd.Env, fmt.Sprintf("%v=%v", fixedTokenKey, fixedTokenVal))
    cmd.Stdin = os.Stdin
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    cmd.SysProcAttr = &syscall.SysProcAttr{Token: syscall.Token(token.Token())}
    if err := cmd.Run(); err != nil {
        println("Error after launching self:", err)
        os.Exit(1)
    }
    println("Clean self launch :)")
    os.Exit(0)
}

func main() {
    if runtime.GOOS == "windows" && os.Getenv(fixedTokenKey) != fixedTokenVal {
        runWithFixedToken()
    }

    println("Setting data dir to", webviewDir)
    if err := os.MkdirAll(webviewDir, os.ModePerm); err != nil {
        println("Failed creating dir:", err)
    }
    if err := acl.Chmod(webviewDir, 0777); err != nil {
        println("Failed setting ACL on dir:", err)
    }

    app := NewApp()

    err := wails.Run(&options.App{
        Title:  "sample-data-dir",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        Bind: []interface{}{
            app,
        },
        Windows: &windows.Options{
            WebviewUserDataPath: webviewDir,
        },
    })

    if err != nil {
        println("Error:", err.Error())
    }
}
```

If you use a data directory accessible by both users but not the extended privileges, you will receive a WebView2 `80010108 The object invoked has disconnected from its clients` error.

Possible future solution #3: [run WebView2 using an in-memory mode if implemented](https://github.com/MicrosoftEdge/WebView2Feedback/issues/3637#issuecomment-1728300982).

## WebView2 installation succeeded, but the wails doctor command shows that it is not installed[​](troubleshooting.html#webview2-installation-succeeded-but-the-wails-doctor-command-shows-that-it-is-not-installed "Direct link to heading")

If you have installed WebView2, but the `wails doctor` command shows that it is not installed, it is likely that the WebView2 runtime installed was for a different architecture. You can download the correct runtime from [here](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).

Source: [https://github.com/wailsapp/wails/issues/2917](https://github.com/wailsapp/wails/issues/2917)

## WebVie2wProcess failed with kind[​](troubleshooting.html#webvie2wprocess-failed-with-kind "Direct link to heading")

If your Windows app generates this kind of error, you can check out what the error means [here](https://docs.microsoft.com/en-us/microsoft-edge/webview2/reference/winrt/microsoft_web_webview2_core/corewebview2processfailedkind?view=webview2-winrt-1.0.2045.28).

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/troubleshooting.mdx)

[Previous  
\
Templates](templates.html)

[Next  
\
Visual Studio Code](vscode.html)

Visual Studio Code | Wails

[Skip to main content](vscode.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/vscode) (v2.10).

- [](https://wails.io/)
- Guides
- Visual Studio Code

Version: Next Version 🚧

On this page

# Visual Studio Code

This page is for miscellaneous tips and tricks when using Visual Studio Code with Wails.

## Vetur Configuration[​](vscode.html#vetur-configuration "Direct link to heading")

Many thanks to [@Lyimmi](https://github.com/Lyimmi) for this tip. Originally posted [here](https://github.com/wailsapp/wails/issues/1791#issuecomment-1228158349).

Vetur is a popular plugin for Visual Studio Code that provides syntax highlighting and code completion for Vue projects. When loading a Wails project in VSCode, Vetur will throw an error as it is expecting to find the frontend project in the root directory. To fix this, you can do the following:

Create a file named `vetur.config.js` in the project's root.

```javascript
// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    // **optional** default: `{}`
    // override vscode settings
    // Notice: It only affects the settings used by Vetur.
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true
    },
    // **optional** default: `[{ root: './' }]`
    // support monorepos
    projects: [
        {
            // **required**
            // Where is your project?
            // It is relative to `vetur.config.js`.
            // root: './packages/repo1',
            root: './frontend',
            // **optional** default: `'package.json'`
            // Where is `package.json` in the project?
            // We use it to determine the version of vue.
            // It is relative to root property.
            package: './package.json',
            // **optional**
            // Where is TypeScript config file in the project?
            // It is relative to root property.
            tsconfig: './tsconfig.json',
            // **optional** default: `'./.vscode/vetur/snippets'`
            // Where is vetur custom snippets folders?
            snippetFolder: './.vscode/vetur/snippets',
            // **optional** default: `[]`
            // Register globally Vue component glob.
            // If you set it, you can get completion by that components.
            // It is relative to root property.
            // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
            globalComponents: [
                './src/components/**/*.vue'
            ]
        }
    ]
}
```

Next, configure `frontend/tsconfig.json`:

```javascript
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "outFile": "../../built/local/tsc.js",
    "allowJs": true
  },
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ],
  "include": [
    "src/**/*",
    "wailsjs/**/*.ts"
  ]
}
```

This should enable you to now use Vetur as expected.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/vscode.mdx)

[Previous  
\
Troubleshooting](troubleshooting.html)

[Next  
\
NSIS installer](windows-installer.html)

NSIS installer | Wails

[Skip to main content](windows-installer.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/windows-installer) (v2.10).

- [](https://wails.io/)
- Guides
- NSIS installer

Version: Next Version 🚧

On this page

# NSIS installer

![](../../../assets/images/nsis-977a3b2d07bb68a650643a67f27006c1.webp)

Wails supports generating Windows installers using the [NSIS installer](https://nsis.sourceforge.io/).

## Installing NSIS[​](windows-installer.html#installing-nsis "Direct link to heading")

### Windows[​](windows-installer.html#windows "Direct link to heading")

The installer is available on the [NSIS Download](https://nsis.sourceforge.io/Download) page.

You can install with [Scoop](https://scoop.sh/) (which will automatically add it to your PATH):

```text
scoop bucket add extras
scoop install nsis
```

Or, you can use Winget (on Windows 10+):

```text
winget install NSIS.NSIS --silent
```

If you use the chocolatey package manager, run the following script:

```text
choco install nsis
```

**NOTE:** If you install NSIS manually, you need to add the *Bin* folder, which contains `makensis.exe`, in your NSIS installation to your path. [Here](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/) is a good tutorial on how to add to path on Windows.

### Linux[​](windows-installer.html#linux "Direct link to heading")

The `nsis` package should be available through your distribution's package manager.

### MacOS[​](windows-installer.html#macos "Direct link to heading")

NSIS is available to install through homebrew: `brew install nsis`.

## Generating the installer[​](windows-installer.html#generating-the-installer "Direct link to heading")

When a new project is created, Wails generates the NSIS configuration files in `build/windows/installer`. The config data is read from `installer/info.json` and that is configured to use the project's `wails.json` Info section:

```json
// ...
 "Info": {
    "companyName": "My Company Name",
    "productName": "Wails Vite",
    "productVersion": "1.0.0",
    "copyright": "Copyright.........",
    "comments": "Built using Wails (https://wails.io)"
  },
```

To generate an installer for your application, use the `-nsis` flag with `wails build`:

```text
wails build -nsis
```

The installer will now be available in the `build/bin` directory.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/windows-installer.mdx)

[Previous  
\
Visual Studio Code](vscode.html)

[Next  
\
Windows](windows.html)

Windows | Wails

[Skip to main content](windows.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/guides/windows) (v2.10).

- [](https://wails.io/)
- Guides
- Windows

Version: Next Version 🚧

On this page

# Windows

This page has miscellaneous guides related to developing Wails applications for Windows.

## Handling the WebView2 Runtime Dependency[​](windows.html#handling-the-webview2-runtime-dependency "Direct link to heading")

Wails applications built for Windows have a runtime requirement on the Microsoft [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/). Windows 11 will have this installed by default, but some machines won't. Wails offers an easy approach to dealing with this dependency.

By using the `-webview2` flag when building, you can decide what your application will do when a suitable runtime is not detected (including if the installed runtime is too old). The four options are:

1. Download
2. Embed
3. Browser
4. Error

### Download[​](windows.html#download "Direct link to heading")

This option will prompt the user that no suitable runtime has been found and then offer to download and run the official bootstrapper from Microsoft's WebView2 site. If the user proceeds, the official bootstrapper will be downloaded and run.

### Embed[​](windows.html#embed "Direct link to heading")

This option embeds the official bootstrapper within the application. If no suitable runtime has been found, the application will offer to run the bootstrapper. This adds \~150k to the binary size.

### Browser[​](windows.html#browser "Direct link to heading")

This option will prompt the user that no suitable runtime has been found and then offer to open a browser to the official WebView2 page where the bootstrapper can be downloaded and installed. The application will then exit, leaving the installation up to the user.

### Error[​](windows.html#error "Direct link to heading")

If no suitable runtime is found, an error is given to the user and no further action taken.

## Fixed version runtime[​](windows.html#fixed-version-runtime "Direct link to heading")

Another way of dealing with webview2 dependency is shipping it yourself. You can download [fixed version runtime](https://developer.microsoft.com/microsoft-edge/webview2/#download-section) and bundle or download it with your application.

Also, you should specify path to fixed version of webview2 runtime in the `windows.Options` structure when launching wails.

```go
    wails.Run(&options.App{
        Windows: &windows.Options{
            WebviewBrowserPath:  "",
        },
    })
```

Note: When `WebviewBrowserPath` is specified, `error` strategy will be forced in case of minimal required version mismatch or invalid path to a runtime.

The downloaded file will be compressed (extension `.cab`), so you must extract it before using it, according to the instructions on the [official site](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution#details-about-the-fixed-version-runtime-distribution-mode) should run in a terminal the following command to extract the file:

```text
expand {path to the package} -F:* {path to the destination folder}
```

## Spawning other programs[​](windows.html#spawning-other-programs "Direct link to heading")

When spawning other programs, such as scripts, you will see the window appear on the screen. To hide the window, you can use the following code:

```go
cmd := exec.Command("your_script.exe")
cmd.SysProcAttr = &syscall.SysProcAttr{
    HideWindow:    true,
    CreationFlags: 0x08000000,
}
cmd.Start()
```

Solution provided by [sithembiso](https://github.com/sithembiso) on the [discussions board](https://github.com/wailsapp/wails/discussions/1734#discussioncomment-3386172).

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/guides/windows.mdx)

[Previous  
\
NSIS installer](windows-installer.html)

[Next  
\
Hello World](../tutorials/helloworld.html)