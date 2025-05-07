[Skip to main content](building.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/gettingstarted/building) (v2.10).

- [](https://wails.io/)
- Getting Started
- Compiling your Project

Version: Next Version 🚧

# Compiling your Project

From the project directory, run `wails build`. This will compile your project and save the production-ready binary in the `build/bin` directory.

Linux

If you are using a Linux distribution that does not have webkit2gtk-4.0 (such as Ubuntu 24.04), you will need to add `-tags webkit2_41`.

If you run the binary, you should see the default application:

![](data:image/webp;base64,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)

For more details on compilation options, please refer to the [CLI Reference](../reference/cli.html#build).

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/gettingstarted/building.mdx)

[Previous  
\
Developing your Application](development.html)

[Next  
\
How does it work?](../howdoesitwork.html)

Developing your Application | Wails

[Skip to main content](development.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/gettingstarted/development) (v2.10).

- [](https://wails.io/)
- Getting Started
- Developing your Application

Version: Next Version 🚧

# Developing your Application

You can run your application in development mode by running `wails dev` from your project directory. This will do the following things:

- Build your application and run it
- Bind your Go code to the frontend so it can be called from JavaScript
- Using the power of [Vite](https://vitejs.dev/), will watch for modifications in your Go files and rebuild/re-run on change
- Sets up a [webserver](http://localhost:34115) that will serve your application over a browser. This allows you to use your favourite browser extensions. You can even call your Go code from the console

To get started, run `wails dev` in the project directory. More information on this can be found [here](../reference/cli.html#dev).

Coming soon: Tutorial

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/gettingstarted/development.mdx)

[Previous  
\
Creating a Project](firstproject.html)

[Next  
\
Compiling your Project](building.html)

Creating a Project | Wails

[Skip to main content](firstproject.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/gettingstarted/firstproject) (v2.10).

- [](https://wails.io/)
- Getting Started
- Creating a Project

Version: Next Version 🚧

On this page

# Creating a Project

## Project Generation[​](firstproject.html#project-generation "Direct link to heading")

Now that the CLI is installed, you can generate a new project by using the `wails init` command.

Pick your favourite framework:

- Svelte
- React
- Vue
- Preact
- Lit
- Vanilla

Generate a [Svelte](https://svelte.dev/) project using JavaScript with:

```text
wails init -n myproject -t svelte
```

If you would rather use TypeScript:

```text
wails init -n myproject -t svelte-ts
```

Generate a [React](https://reactjs.org/) project using JavaScript with:

```text
wails init -n myproject -t react
```

If you would rather use TypeScript:

```text
wails init -n myproject -t react-ts
```

Generate a [Vue](https://vuejs.org/) project using JavaScript with:

```text
wails init -n myproject -t vue
```

If you would rather use TypeScript:

```text
wails init -n myproject -t vue-ts
```

Generate a [Preact](https://preactjs.com/) project using JavaScript with:

```text
wails init -n myproject -t preact
```

If you would rather use TypeScript:

```text
wails init -n myproject -t preact-ts
```

Generate a [Lit](https://lit.dev/) project using JavaScript with:

```text
wails init -n myproject -t lit
```

If you would rather use TypeScript:

```text
wails init -n myproject -t lit-ts
```

Generate a Vanilla project using JavaScript with:

```text
wails init -n myproject -t vanilla
```

If you would rather use TypeScript:

```text
wails init -n myproject -t vanilla-ts
```

* * *

There are also [community templates](../community/templates.html) available that offer different capabilities and frameworks.

To see the other options available, you can run `wails init -help`. More details can be found in the [CLI Reference](../reference/cli.html#init).

## Project Layout[​](firstproject.html#project-layout "Direct link to heading")

Wails projects have the following layout:

```text
.
├── build/
│   ├── appicon.png
│   ├── darwin/
│   └── windows/
├── frontend/
├── go.mod
├── go.sum
├── main.go
└── wails.json
```

### Project structure rundown[​](firstproject.html#project-structure-rundown "Direct link to heading")

- `/main.go` - The main application
- `/frontend/` - Frontend project files
- `/build/` - Project build directory
- `/build/appicon.png` - The application icon
- `/build/darwin/` - Mac specific project files
- `/build/windows/` - Windows specific project files
- `/wails.json` - The project configuration
- `/go.mod` - Go module file
- `/go.sum` - Go module checksum file

The `frontend` directory has nothing specific to Wails and can be any frontend project of your choosing.

The `build` directory is used during the build process. These files may be updated to customise your builds. If files are removed from the build directory, default versions will be regenerated.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/gettingstarted/firstproject.mdx)

[Previous  
\
Installation](installation.html)

[Next  
\
Developing your Application](development.html)

Installation | Wails

[Skip to main content](installation.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/gettingstarted/installation) (v2.10).

- [](https://wails.io/)
- Getting Started
- Installation

Version: Next Version 🚧

On this page

# Installation

## Supported Platforms[​](installation.html#supported-platforms "Direct link to heading")

- Windows 10/11 AMD64/ARM64
- MacOS 10.15+ AMD64 for development, MacOS 10.13+ for release
- MacOS 11.0+ ARM64
- Linux AMD64/ARM64

## Dependencies[​](installation.html#dependencies "Direct link to heading")

Wails has a number of common dependencies that are required before installation:

- Go 1.21+ (macOS 15+ requires Go 1.23.3+)
- NPM (Node 15+)

### Go[​](installation.html#go "Direct link to heading")

Download Go from the [Go Downloads Page](https://go.dev/dl/).

Ensure that you follow the official [Go installation instructions](https://go.dev/doc/install). You will also need to ensure that your `PATH` environment variable also includes the path to your `~/go/bin` directory. Restart your terminal and do the following checks:

- Check Go is installed correctly: `go version`
- Check "\~/go/bin" is in your PATH variable: `echo $PATH | grep go/bin`

### NPM[​](installation.html#npm "Direct link to heading")

Download NPM from the [Node Downloads Page](https://nodejs.org/en/download/). It is best to use the latest release as that is what we generally test against.

Run `npm --version` to verify.

## Platform Specific Dependencies[​](installation.html#platform-specific-dependencies "Direct link to heading")

You will also need to install platform specific dependencies:

- Windows
- MacOS
- Linux

Wails requires that the xcode command line tools are installed. This can be done by running `xcode-select --install`.

Wails requires that the [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) runtime is installed. Some Windows installations will already have this installed. You can check using the `wails doctor` command.

Linux requires the standard `gcc` build tools plus `libgtk3` and `libwebkit`. Rather than list a ton of commands for different distros, Wails can try to determine what the installation commands are for your specific distribution. Run `wails doctor` after installation to be shown how to install the dependencies. If your distro/package manager is not supported, please consult the [Add Linux Distro](https://wails.io/docs/guides/linux-distro-support) guide.  
**Note:**  
If you are using latest Linux version (example: Ubuntu 24.04) and it is not supporting `libwebkit2gtk-4.0-dev`, then you might encounter an issue in `wails doctor`: `libwebkit` not found. To resolve this issue you can install `libwebkit2gtk-4.1-dev` and during your build use the tag `-tags webkit2_41`.

## Optional Dependencies[​](installation.html#optional-dependencies "Direct link to heading")

- [UPX](https://upx.github.io/) for compressing your applications.
- [NSIS](https://wails.io/docs/guides/windows-installer/) for generating Windows installers.

## Installing Wails[​](installation.html#installing-wails "Direct link to heading")

Run `go install github.com/wailsapp/wails/v2/cmd/wails@latest` to install the Wails CLI.

Note: If you get an error similar to this:

```shell
....\Go\pkg\mod\github.com\wailsapp\wails\[email protected]\pkg\templates\templates.go:28:12: pattern all:ides/*: no matching files found
```

please check you have Go 1.18+ installed:

```shell
go version
```

## System Check[​](installation.html#system-check "Direct link to heading")

Running `wails doctor` will check if you have the correct dependencies installed. If not, it will advise on what is missing and help on how to rectify any problems.

## The `wails` command appears to be missing?[​](installation.html#the-wails-command-appears-to-be-missing "Direct link to heading")

If your system is reporting that the `wails` command is missing, make sure you have followed the Go installation guide correctly. Normally, it means that the `go/bin` directory in your User's home directory is not in the `PATH` environment variable. You will also normally need to close and reopen any open command prompts so that changes to the environment made by the installer are reflected at the command prompt.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/gettingstarted/installation.mdx)

[Previous  
\
Introduction](../introduction.html)

[Next  
\
Creating a Project](firstproject.html)