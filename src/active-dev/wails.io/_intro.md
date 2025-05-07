[Skip to main content](howdoesitwork.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/howdoesitwork) (v2.10).

- [](https://wails.io/)
- How does it work?

Version: Next Version 🚧

On this page

# How does it work?

A Wails application is a standard Go application, with a webkit frontend. The Go part of the application consists of the application code and a runtime library that provides a number of useful operations, like controlling the application window. The frontend is a webkit window that will display the frontend assets. Also available to the frontend is a JavaScript version of the runtime library. Finally, it is possible to bind Go methods to the frontend, and these will appear as JavaScript methods that can be called, just as if they were local JavaScript methods.

![](../../assets/images/architecture-23c8df42202276ecee3e5cb7a0c6c51a.webp)

## The Main Application[​](howdoesitwork.html#the-main-application "Direct link to heading")

### Overview[​](howdoesitwork.html#overview "Direct link to heading")

The main application consists of a single call to `wails.Run()`. It accepts the application configuration which describes the size of the application window, the window title, what assets to use, etc. A basic application might look like this:

main.go

```go
package main

import (
    "embed"
    "log"

    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
  "github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

    app := &App{}

    err := wails.Run(&options.App{
        Title:  "Basic Demo",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
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


type App struct {
    ctx context.Context
}

func (b *App) startup(ctx context.Context) {
    b.ctx = ctx
}

func (b *App) shutdown(ctx context.Context) {}

func (b *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s!", name)
}
```

### Options rundown[​](howdoesitwork.html#options-rundown "Direct link to heading")

This example has the following options set:

- `Title` - The text that should appear in the window's title bar
- `Width` &amp; `Height` - The dimensions of the window
- `Assets` - The application's frontend assets
- `OnStartup` - A callback for when the window is created and is about to start loading the frontend assets
- `OnShutdown` - A callback for when the application is about to quit
- `Bind` - A slice of struct instances that we wish to expose to the frontend

A full list of application options can be found in the [Options Reference](reference/options.html).

#### Assets[​](howdoesitwork.html#assets "Direct link to heading")

The `Assets` option is mandatory as you can't have a Wails application without frontend assets. Those assets can be any files you would expect to find in a web application - html, js, css, svg, png, etc. **There is no requirement to generate asset bundles** - plain files will do. When the application starts, it will attempt to load `index.html` from your assets and the frontend will essentially work as a browser from that point on. It is worth noting that there is no requirement on where in the `embed.FS` the files live. It is likely that the embed path uses a nested directory relative to your main application code, such as `frontend/dist`:

main.go

```go
//go:embed all:frontend/dist
var assets embed.FS
```

At startup, Wails will iterate the embedded files looking for the directory containing `index.html`. All other assets will be loaded relative to this directory.

As production binaries use the files contained in `embed.FS`, there are no external files required to be shipped with the application.

When running in development mode using the `wails dev` command, the assets are loaded off disk, and any changes result in a "live reload". The location of the assets will be inferred from the `embed.FS`.

More details can be found in the [Application Development Guide](guides/application-development.html).

#### Application Lifecycle Callbacks[​](howdoesitwork.html#application-lifecycle-callbacks "Direct link to heading")

Just before the frontend is about to load `index.html`, a callback is made to the function provided in [OnStartup](reference/options.html#onstartup). A standard Go context is passed to this method. This context is required when calling the runtime so a standard pattern is to save a reference to in this method. Just before the application shuts down, the [OnShutdown](reference/options.html#onshutdown) callback is called in the same way, again with the context. There is also an [OnDomReady](reference/options.html#ondomready) callback for when the frontend has completed loading all assets in `index.html` and is equivalent of the [`body onload`](https://www.w3schools.com/jsref/event_onload.asp) event in JavaScript. It is also possible to hook into the window close (or application quit) event by setting the option [OnBeforeClose](reference/options.html#onbeforeclose).

#### Method Binding[​](howdoesitwork.html#method-binding "Direct link to heading")

The `Bind` option is one of the most important options in a Wails application. It specifies which struct methods to expose to the frontend. Think of structs like "controllers" in a traditional web application. When the application starts, it examines the struct instances listed in the `Bind` field in the options, determines which methods are public (starts with an uppercase letter) and will generate JavaScript versions of those methods that can be called by the frontend code.

Note

Wails requires that you pass in an *instance* of the struct for it to bind it correctly

In this example, we create a new `App` instance and then add this instance to the `Bind` option in `wails.Run`:

main.go

```go
package main

import (
    "embed"
    "log"

    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
  "github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

    app := &App{}

    err := wails.Run(&options.App{
        Title:  "Basic Demo",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        Bind: []interface{}{
            app,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}


type App struct {
    ctx context.Context
}

func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s!", name)
}
```

You may bind as many structs as you like. Just make sure you create an instance of it and pass it in `Bind`:

```go
    //...
    err := wails.Run(&options.App{
        Title:  "Basic Demo",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        Bind: []interface{}{
            app,
            &mystruct1{},
            &mystruct2{},
        },
    })

```

You may bind enums types as well. In that case you should create array that will contain all possible enum values, instrument enum type and bind it to the app via `EnumBind`:

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

```go
    //...
    err := wails.Run(&options.App{
        Title:  "Basic Demo",
        Width:  1024,
        Height: 768,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        Bind: []interface{}{
            app,
            &mystruct1{},
            &mystruct2{},
        },
    EnumBind: []interface{}{
        AllWeekdays,
    },
    })

```

When you run `wails dev` (or `wails generate module`), a frontend module will be generated containing the following:

- JavaScript bindings for all bound methods
- TypeScript declarations for all bound methods
- TypeScript definitions for all Go structs used as inputs or outputs by the bound methods

This makes it incredibly simple to call Go code from the frontend, using the same strongly typed datastructures.

## The Frontend[​](howdoesitwork.html#the-frontend "Direct link to heading")

### Overview[​](howdoesitwork.html#overview-1 "Direct link to heading")

The frontend is a collection of files rendered by webkit. It's like a browser and webserver in one. There is virtually[1](howdoesitwork.html#fn-1) no limit to which frameworks or libraries you can use. The main points of interaction between the frontend and your Go code are:

- Calling bound Go methods
- Calling runtime methods

### Calling bound Go methods[​](howdoesitwork.html#calling-bound-go-methods "Direct link to heading")

When you run your application with `wails dev`, it will automatically generate JavaScript bindings for your structs in a directory called `wailsjs/go` (You can also do this by running `wails generate module`). The generated files mirror the package names in your application. In the example above, we bind `app`, which has one public method `Greet`. This will lead to the generation of the following files:

```bash
wailsjs
  └─go
    └─main
      ├─App.d.ts
      └─App.js
```

Here we can see that there is a `main` package that contains the JavaScript bindings for the bound `App` struct, as well as the TypeScript declaration file for those methods. To call `Greet` from our frontend, we simply import the method and call it like a regular JavaScript function:

```javascript
// ...
import { Greet } from "../wailsjs/go/main/App";

function doGreeting(name) {
  Greet(name).then((result) => {
    // Do something with result
  });
}
```

The TypeScript declaration file gives you the correct types for the bound methods:

```ts
export function Greet(arg1: string): Promise<string>;
```

The generated methods return a Promise. A successful call will result in the first return value from the Go call to be passed to the `resolve` handler. An unsuccessful call is when a Go method that has an error type as it's second return value, passes an error instance back to the caller. This is passed back via the `reject` handler. In the example above, `Greet` only returns a `string` so the JavaScript call will never reject - unless invalid data is passed to it.

All data types are correctly translated between Go and JavaScript. Even structs. If you return a struct from a Go call, it will be returned to your frontend as a JavaScript class.

Note

Struct fields *must* have a valid `json` tag to be included in the generated TypeScript.

Anonymous nested structs are not supported at this time.

It is possible to send structs back to Go. Any JavaScript map/class passed as an argument that is expecting a struct, will be converted to that struct type. To make this process a lot easier, in `dev` mode, a TypeScript module is generated, defining all the struct types used in bound methods. Using this module, it's possible to construct and send native JavaScript objects to the Go code.

There is also support for Go methods that use structs in their signature. All Go structs specified by a bound method (either as parameters or return types) will have TypeScript versions auto generated as part of the Go code wrapper module. Using these, it's possible to share the same data model between Go and JavaScript.

Example: We update our `Greet` method to accept a `Person` instead of a string:

main.go

```go
type Person struct {
    Name string `json:"name"`
    Age uint8 `json:"age"`
    Address *Address `json:"address"`
}

type Address struct {
    Street string `json:"street"`
    Postcode string `json:"postcode"`
}

func (a *App) Greet(p Person) string {
    return fmt.Sprintf("Hello %s (Age: %d)!", p.Name, p.Age)
}
```

The `wailsjs/go/main/App.js` file will still have the following code:

App.js

```js
export function Greet(arg1) {
  return window["go"]["main"]["App"]["Greet"](arg1);
}
```

But the `wailsjs/go/main/App.d.ts` file will be updated with the following code:

App.d.ts

```ts
import { main } from "../models";

export function Greet(arg1: main.Person): Promise<string>;
```

As we can see, the "main" namespace is imported from a new "models.ts" file. This file contains all the struct definitions used by our bound methods. In this example, this is a `Person` struct. If we look at `models.ts`, we can see how the models are defined:

models.ts

```ts
export namespace main {
  export class Address {
    street: string;
    postcode: string;

    static createFrom(source: any = {}) {
      return new Address(source);
    }

    constructor(source: any = {}) {
      if ("string" === typeof source) source = JSON.parse(source);
      this.street = source["street"];
      this.postcode = source["postcode"];
    }
  }
  export class Person {
    name: string;
    age: number;
    address?: Address;

    static createFrom(source: any = {}) {
      return new Person(source);
    }

    constructor(source: any = {}) {
      if ("string" === typeof source) source = JSON.parse(source);
      this.name = source["name"];
      this.age = source["age"];
      this.address = this.convertValues(source["address"], Address);
    }

    convertValues(a: any, classs: any, asMap: boolean = false): any {
      if (!a) {
        return a;
      }
      if (a.slice && a.map) {
        return (a as any[]).map((elem) => this.convertValues(elem, classs));
      } else if ("object" === typeof a) {
        if (asMap) {
          for (const key of Object.keys(a)) {
            a[key] = new classs(a[key]);
          }
          return a;
        }
        return new classs(a);
      }
      return a;
    }
  }
}
```

So long as you have TypeScript as part of your frontend build configuration, you can use these models in the following way:

mycode.js

```js
import { Greet } from "../wailsjs/go/main/App";
import { main } from "../wailsjs/go/models";

function generate() {
  let person = new main.Person();
  person.name = "Peter";
  person.age = 27;
  Greet(person).then((result) => {
    console.log(result);
  });
}
```

The combination of generated bindings and TypeScript models makes for a powerful development environment.

More information on Binding can be found in the [Binding Methods](guides/application-development.html#binding-methods) section of the [Application Development Guide](guides/application-development.html).

### Calling runtime methods[​](howdoesitwork.html#calling-runtime-methods "Direct link to heading")

The JavaScript runtime is located at `window.runtime` and contains many methods to do various tasks such as emit an event or perform logging operations:

mycode.js

```js
window.runtime.EventsEmit("my-event", 1);
```

More details about the JS runtime can be found in the [Runtime Reference](reference/runtime/intro.html).

* * *

1. There is a very small subset of libraries that use features unsupported in WebViews. There are often alternatives and workarounds for such cases.[↩](howdoesitwork.html#fnref-1)

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/howdoesitwork.mdx)

[Previous  
\
Compiling your Project](gettingstarted/building.html)

[Next  
\
Introduction](reference/runtime/intro.html)

Introduction | Wails

[Skip to main content](introduction.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/introduction) (v2.10).

- [](https://wails.io/)
- Introduction

Version: Next Version 🚧

On this page

# Introduction

Wails is a project that enables you to write desktop apps using Go and web technologies.

Consider it a lightweight and fast Electron alternative for Go. You can easily build applications with the flexibility and power of Go, combined with a rich, modern frontend.

### Features[​](introduction.html#features "Direct link to heading")

- Native Menus, Dialogs, Theming and Translucency
- Windows, macOS and linux support
- Built in templates for Svelte, React, Preact, Vue, Lit and Vanilla JS
- Easily call Go methods from JavaScript
- Automatic Go struct to TypeScript model generation
- No CGO or external DLLs required on Windows
- Live development mode using the power of [Vite](https://vitejs.dev/)
- Powerful CLI to easily Create, Build and Package applications
- A rich [runtime library](https://wails.io/docs/reference/runtime/intro)
- Applications built with Wails are Apple &amp; Microsoft Store compliant

This is varly - a desktop application for MacOS &amp; Windows written using Wails. Not only does it look great, it uses native menus and translucency - everything you'd expect from a modern native app.

![](../../assets/images/varly2-37845e1c0260f8aaa867734dd65904a1.webp)

### Quick Start Templates[​](introduction.html#quick-start-templates "Direct link to heading")

Wails comes with a number of pre-configured templates that allow you to get your application up and running quickly. There are templates for the following frameworks: Svelte, React, Vue, Preact, Lit and Vanilla. There are both JavaScript and TypeScript versions for each template.

### Native Elements[​](introduction.html#native-elements "Direct link to heading")

Wails uses a purpose built library for handling native elements such as Window, Menus, Dialogs, etc, so you can build good-looking, feature rich desktop applications.

**It does not embed a browser**, so it delivers a small runtime. Instead, it reuses the native rendering engine for the platform. On Windows, this is the new Microsoft Webview2 library, built on Chromium.

### Go &amp; JavaScript Interoperability[​](introduction.html#go--javascript-interoperability "Direct link to heading")

Wails automatically makes your Go methods available to JavaScript, so you can call them by name from your frontend! It even generates TypeScript models for the structs used by your Go methods, so you can pass the same data structures between Go and JavaScript.

### Runtime Library[​](introduction.html#runtime-library "Direct link to heading")

Wails provides a runtime library, for both Go and JavaScript, that handles a lot of the things modern applications need, like Eventing, Logging, Dialogs, etc.

### Live Development Experience[​](introduction.html#live-development-experience "Direct link to heading")

#### Automatic Rebuilds[​](introduction.html#automatic-rebuilds "Direct link to heading")

When you run your application in "dev" mode, Wails will build your application as a native desktop application, but will read your assets from disk. It will detect any changes to your Go code and automatically rebuild and relaunch your application.

#### Automatic Reloads[​](introduction.html#automatic-reloads "Direct link to heading")

When changes to your application assets are detected, your running application will "reload", reflecting your changes almost immediately.

#### Develop your application in a Browser[​](introduction.html#develop-your-application-in-a-browser "Direct link to heading")

If you prefer to debug and develop in a browser then Wails has you covered. The running application also has a webserver that will run your application in any browser that connects to it. It will even refresh when your assets change on disk.

### Production-ready Native Binaries[​](introduction.html#production-ready-native-binaries "Direct link to heading")

When you're ready to do the final build of your application, the CLI will compile it down to a single executable, with all the assets bundled into it. On Windows and MacOS, it is possible to create a native package for distribution. The assets used in packaging (icon, info.plist, manifest file, etc) are part of your project and may be customised, giving you total control over how your applications are built.

### Tooling[​](introduction.html#tooling "Direct link to heading")

The Wails CLI provides a hassle-free way to generate, build and bundle your applications. It will do the heavy lifting of creating icons, compiling your application with optimal settings and delivering a distributable, production ready binary. Choose from a number of starter templates to get up and running quickly!

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/introduction.mdx)

[Next  
\
Installation](gettingstarted/installation.html)