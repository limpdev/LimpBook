#  Tauri

## How can I use unpublished Tauri changes?

To use Tauri from GitHub (bleeding edge version) you need to change your `Cargo.toml` file and update your CLI and API.

Pulling the Rust crate from source

Append this to your `Cargo.toml` file:

Cargo.toml

```toml
[patch.crates-io]
tauri = { git = "https://github.com/tauri-apps/tauri", branch = "1.x" }
tauri-build = { git = "https://github.com/tauri-apps/tauri", branch = "1.x" }
```

This will force all your dependencies to use `tauri` and `tauri-build` from Git instead of crates.io.

Using the Tauri CLI from source

If you are using the Cargo CLI, you can install it directly from GitHub:

```shell
cargo install --git https://github.com/tauri-apps/tauri --branch 1.x tauri-cli
```

If you are using the `@tauri-apps/cli` package, you will need to clone the repo and build it:

```shell
git clone https://github.com/tauri-apps/tauri
cd tauri
git checkout 1.x
cd tauri/tooling/cli/node
yarn
yarn build
```

To use it, run directly with node:

```shell
node /path/to/tauri/tooling/cli/node/tauri.js dev
node /path/to/tauri/tooling/cli/node/tauri.js build
```

Alternatively, you can run your app with Cargo directly:

```shell
cd src-tauri
cargo run --no-default-features # instead of tauri dev
cargo build # instead of tauri build - won't bundle your app though
```

Using the Tauri API from source

It is recommended to also use the Tauri API package from source when using the Tauri crate from GitHub (though it might not be needed). To build it from source, run the following script:

```shell
git clone https://github.com/tauri-apps/tauri
cd tauri
git checkout 1.x
cd tauri/tooling/api
yarn
yarn build
```

Now you can link it using yarn:

```shell
cd dist
yarn link
cd /path/to/your/project
yarn link @tauri-apps/api
```

Or you can change your package.json to point to the dist folder directly:

package.json

```json
{
  "dependencies": {
    "@tauri-apps/api": "/path/to/tauri/tooling/api/dist"
  }
}
```

## Should I use Node or Cargo?[​](faq.html#node-or-cargo "Direct link to Should I use Node or Cargo?")

Even though installing the CLI through Cargo is the preferred option, it has to compile the whole binary from scratch when you install it. If you're in a CI environment or on a very slow machine you're better off choosing another installation method.

As the CLI is written in Rust, it is naturally available through [crates.io](https://crates.io/crates/tauri-cli) and installable with Cargo.

We also compile the CLI as a native Node.js addon and distribute it [via npm](https://www.npmjs.com/package/@tauri-apps/cli). This has several advantages compared to the Cargo installation method:

1. The CLI is pre-compiled, leading to much faster install times
2. You can pin a specific version in your package.json file
3. If you develop custom tooling around Tauri, you can import the CLI as a regular JavaScript module
4. You can install the CLI using a JavaScript manager

## Recommended Browserlist[​](faq.html#recommended-browserlist "Direct link to Recommended Browserlist")

We recommend using `es2021`, `last 3 Chrome versions`, and `safari 13` for your browserlist and build targets. Tauri leverages the OS's native rendering engine (WebKit on macOS, WebView2 on Windows and WebKitGTK on Linux).

## Build Conflict with Homebrew on Linux[​](faq.html#build-conflict-with-homebrew-on-linux "Direct link to Build Conflict with Homebrew on Linux")

Homebrew on Linux includes its own `pkg-config` (a utility to find libraries on the system). This can cause conflicts when installing the same `pkg-config` package for Tauri (usually installed through the package manager like `apt`). When you try to build a Tauri app it will try to invoke `pkg-config` and will end up invoking the one from Homebrew. If Homebrew wasn't used to install Tauri's dependencies, this can cause errors.

Errors will *usually* contain messages along the lines of `error: failed to run custom build command for X` - `Package Y was not found in the pkg-config search path.`. Note that you may see similar errors if the required dependencies are not installed at all.

There are two solutions to this issue:

1. [Uninstall Homebrew](https://docs.brew.sh/FAQ#how-do-i-uninstall-homebrew)
2. Set the `PKG_CONFIG_PATH` environment variable to point to the correct `pkg-config` before building a Tauri app
   
   - Example: `export PKG_CONFIG_PATH=/usr/lib/pkgconfig:/usr/share/pkgconfig:/usr/lib/x86_64-linux-gnu/pkgconfig`

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/faq.md)

Last updated on **Nov 26, 2023**

- [How can I use unpublished Tauri changes?](faq.html#how-can-i-use-unpublished-tauri-changes)
- [Should I use Node or Cargo?](faq.html#node-or-cargo)
- [Recommended Browserlist](faq.html#recommended-browserlist)
- [Build Conflict with Homebrew on Linux](faq.html#build-conflict-with-homebrew-on-linux)

Guides | Tauri v1

# Guides

Tauri is an app construction toolkit that lets you build software for all major desktop operating systems using web technologies.

Whether you're new to Tauri development, want to integrate Tauri into an existing project, are ready to get your app into the hands of users, or want to learn how to use a common Tauri feature, we have the help for you.

If you can't find what you're looking for or have a suggestion to improve our guides, reach out to our community on [Discord](https://discord.com/invite/tauri).

---

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

./features ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

./features ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./testing Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

./features ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

./testing ./testing/webdriver ./testing/webdriver/example ./getting-started Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)

./features ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Application Debugging | Tauri v1

[Skip to main content](application.html#__docusaurus_skipToContent_fallback)

On this page

# Application Debugging

With all the moving pieces in Tauri, you may run into a problem that requires debugging. There are many locations where error details are printed, and Tauri includes some tools to make the debugging process more straightforward.

## Rust Console[​](application.html#rust-console "Direct link to Rust Console")

The first place to look for errors is in the Rust Console. This is in the terminal where you ran, e.g., `tauri dev`. You can use the following code to print something to that console from within a Rust file:

```rust
println!("Message from Rust: {}", msg);
```

Sometimes you may have an error in your Rust code, and the Rust compiler can give you lots of information. If, for example, `tauri dev` crashes, you can rerun it like this on Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

or like this on Windows if you're using cmd.exe:

```shell
set RUST_BACKTRACE=1
tauri dev
```

or like this on Windows if you're using PowerShell:

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

This command gives you a granular stack trace. Generally speaking, the Rust compiler helps you by giving you detailed information about the issue, such as:

```text
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

Additionally, you can instrument and view your app logs with the [CrabNebula DevTools](crabnebula-devtools.html).

## WebView Console[​](application.html#webview-console "Direct link to WebView Console")

Right-click in the WebView, and choose `Inspect Element`. This opens up a web-inspector similar to the Chrome or Firefox dev tools you are used to. You can also use the `Ctrl + Shift + i` shortcut on Linux and Windows, and `Command + Option + i` on macOS to open the inspector.

The inspector is platform-specific, rendering the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

### Opening Devtools Programmatically[​](application.html#opening-devtools-programmatically "Direct link to Opening Devtools Programmatically")

You can control the inspector window visibility by using the [`Window::open_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.open_devtools) and [`Window::close_devtools`](https://docs.rs/tauri/1/tauri/window/struct.Window.html#method.close_devtools) functions:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

### Using the Inspector in Production[​](application.html#using-the-inspector-in-production "Direct link to Using the Inspector in Production")

By default, the inspector is only enabled in development and debug builds unless you enable it with a Cargo feature.

#### Create a Debug Build[​](application.html#create-a-debug-build "Direct link to Create a Debug Build")

To create a debug build, run the `tauri build --debug` command.

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build -- --debug
```

```shell
yarn tauri build --debug
```

```shell
pnpm tauri build --debug
```

```shell
bunx tauri build --debug
```

```shell
cargo tauri build --debug
```

Like the normal build and dev processes, building takes some time the first time you run this command but is significantly faster on subsequent runs. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`.

You can also run a built app from the terminal, giving you the Rust compiler notes (in case of errors) or your `println` messages. Browse to the file `src-tauri/target/(release|debug)/[app name]` and run it in directly in your console or double-click the executable itself in the filesystem (note: the console closes on errors with this method).

#### Enable Devtools Feature[​](application.html#enable-devtools-feature "Direct link to Enable Devtools Feature")

danger

The devtools API is private on macOS. Using private APIs on macOS prevents your application from being accepted to the App Store.

To enable the devtools in production builds, you must enable the `devtools` Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

## Debugging the Core Process[​](application.html#debugging-the-core-process "Direct link to Debugging the Core Process")

The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the [Debugging in VS Code](vs-code.html) guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/application.md)

Last updated on **May 10, 2024**

- [Rust Console](application.html#rust-console)
- [WebView Console](application.html#webview-console)
  
  - [Opening Devtools Programmatically](application.html#opening-devtools-programmatically)
  - [Using the Inspector in Production](application.html#using-the-inspector-in-production)
- [Debugging the Core Process](application.html#debugging-the-core-process)

Debugging in CrabNebula DevTools | Tauri v1

[Skip to main content](crabnebula-devtools.html#__docusaurus_skipToContent_fallback)

# Debugging in CrabNebula DevTools

[CrabNebula](https://crabnebula.dev) provides a free [DevTools](https://crabnebula.dev/devtools/) application for Tauri as part of its partnership with the Tauri project. This application allows you to instrument your Tauri app by capturing its embedded assets, Tauri configuration file, logs and spans and providing a web frontend to seamlessly visualize data in real time.

With the CrabNebula DevTools you can inspect your app's log events (including logs from dependencies), track down the performance of your command calls and overall Tauri API usage, with a special interface for Tauri events and commands, including payload, responses and inner logs and execution spans.

To enable the CrabNebula DevTools, install the `devtools` crate:

```shell
cargo add devtools
```

And initialize the plugin as soon as possible in your main function:

```rust
fn main() {
    #[cfg(debug_assertions)]
    let devtools = devtools::init(); // initialize the plugin as early as possible

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    builder = builder.plugin(devtools); // then register it with Tauri

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

note

In this case we only initialize the devtools plugin for debug applications, which is recommended.

For more information, see the [CrabNebula DevTools](https://docs.crabnebula.dev/devtools/get-started/) documentation.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/crabnebula-devtools.md)

Last updated on **May 10, 2024**

Debugging in RustRover | Tauri v1

[Skip to main content](rustrover.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in RustRover

In this guide, we’ll be setting up JetBrains RustRover for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Setting up a Cargo project[​](rustrover.html#setting-up-a-cargo-project "Direct link to Setting up a Cargo project")

Depending on which frontend stack is used in a project, the project directory may or may not be a Cargo project. By default, Tauri places the Rust project in a subdirectory called `src-tauri`. It creates a Cargo project in the root directory only if Rust is used for frontend development as well.

If there's no `Cargo.toml` file at the top level, you need to attach the project manually. Open the Cargo tool window (in the main menu, go to **View | Tool Windows | Cargo**), click **+** (**Attach Cargo Project**) on the toolbar, and select the `src-tauri/Cargo.toml` file.

Alternatively, you could create a top-level Cargo workspace manually by adding the following file to the project's root directory:

Cargo.toml

```toml
[workspace]
members = ["src-tauri"]
```

Before you proceed, make sure that your project is fully loaded. If the Cargo tool window shows all the modules and targets of the workspace, you’re good to go.

## Setting up Run Configurations[​](rustrover.html#setting-up-run-configurations "Direct link to Setting up Run Configurations")

You will need to set up two separate Run/Debug configurations:

- one for launching the Tauri app in debugging mode,
- another one for running your frontend development server of choice.

### Tauri App[​](rustrover.html#tauri-app "Direct link to Tauri App")

1. In the main menu, go to **Run | Edit Configurations**.
2. In the **Run/Debug Configurations** dialog:
   
   - To create a new configuration, click **+** on the toolbar and select **Cargo**.

![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-light-3b37c846e3b4401fce978bfd63eb5d54.png#gh-light-mode-only) ![Add Run/Debug Configuration](../../../assets/images/add-cargo-config-dark-92d4ab1f79542da26115965c05902d85.png#gh-dark-mode-only)

With that created, we need to configure RustRover, so it instructs Cargo to build our app without any default features. This will tell Tauri to use your development server instead of reading assets from the disk. Normally this flag is passed by the Tauri CLI, but since we're completely sidestepping that here, we need to pass the flag manually.

![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-light-945a86b4f9f2bcbb1d423f8038d9a3f7.png#gh-light-mode-only) ![Add `--no-default-features` flag](../../../assets/images/set-no-default-features-dark-9dacd6b8cfccce851caee776086ed18d.png#gh-dark-mode-only)

Now we can optionally rename the Run/Debug Configuration to something more memorable, in this example we called it "Run Tauri App", but you can name it whatever you want.

![Rename Configuration](../../../assets/images/rename-configuration-light-8adafe02f9d25869a87ec7e3661c8d68.png#gh-light-mode-only) ![Rename Configuration](../../../assets/images/rename-configuration-dark-f47fad1a1802c0da25b36ea274fc90a0.png#gh-dark-mode-only)

### Development Server[​](rustrover.html#development-server "Direct link to Development Server")

The above configuration will use Cargo directly to build the Rust application and attach the debugger to it. This means we completely sidestep the Tauri CLI, so features like the `beforeDevCommand` and `beforeBuildCommand` will **not** be executed. We need to take care of that by running the development server manually.

To create the corresponding Run configuration, you need to check the actual development server in use. Look for the `src-tauri/tauri.conf.json` file and find the following line:

```json
    "beforeDevCommand": "pnpm dev"
```

For `npm`, `pnpm`, or `yarn`, you could use the **npm** Run Configuration, for example:

![NPM Configuration](../../../assets/images/npm-configuration-light-0a50198d2a7d60a966815aeaafcc4fa7.png#gh-light-mode-only) ![NPM Configuration](../../../assets/images/npm-configuration-dark-95419d42d571d063aeead0119789056d.png#gh-dark-mode-only)

Make sure you have the correct values in the **Command**, **Scripts**, and **Package Manager** fields.

If your development server is `trunk` for Rust-based WebAssembly frontend frameworks, you could use the generic **Shell Script** Run Configuration:

![Trunk Serve Configuration](../../../assets/images/trunk-configuration-light-f391dcbba4fd66a29c1b86ae4690df90.png#gh-light-mode-only) ![Trunk Serve Configuration](../../../assets/images/trunk-configuration-dark-48f9a5ed3b06d8c3bfa5c87db3daa232.png#gh-dark-mode-only)

## Launching a Debugging Session[​](rustrover.html#launching-a-debugging-session "Direct link to Launching a Debugging Session")

To launch a debugging session, you first need to run your development server, and then start debugging the Tauri App by clicking the **Debug** button next to the Run Configurations Switcher. RustRover will automatically recognize breakpoints placed in any Rust file in your project and stop on the first one hit.

![Debug Session](../../../assets/images/debug-session-light-6f6f9654443b7cbc16fece96bac32777.png#gh-light-mode-only) ![Debug Session](../../../assets/images/debug-session-dark-935067c7e2ac60beaa4ae29682af25f4.png#gh-dark-mode-only)

From this point, you can explore the values of your variables, step further into the code, and check what's going at runtime in detail.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/rustrover.md)

Last updated on **Jan 15, 2024**

- [Setting up a Cargo project](rustrover.html#setting-up-a-cargo-project)
- [Setting up Run Configurations](rustrover.html#setting-up-run-configurations)
  
  - [Tauri App](rustrover.html#tauri-app)
  - [Development Server](rustrover.html#development-server)
- [Launching a Debugging Session](rustrover.html#launching-a-debugging-session)

Debugging in VS Code | Tauri v1

[Skip to main content](vs-code.html#__docusaurus_skipToContent_fallback)

On this page

# Debugging in VS Code

This guide will walk you through setting up VS Code for debugging the [Core Process of your Tauri app](https://v1.tauri.app/v1/references/architecture/process-model#the-core-process).

## Prerequisites[​](vs-code.html#prerequisites "Direct link to Prerequisites")

Install the [`vscode-lldb`](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension.

## Configure launch.json[​](vs-code.html#configure-launchjson "Direct link to Configure launch.json")

Create a `.vscode/launch.json` file and paste the below JSON contents into it:

.vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application and load it in both development and production modes.

Note that it does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in the `preLaunchTask` field. Below is an example `.vscode/tasks.json` file that has two tasks, one for a `beforeDevCommand` that spawns a development server and one for `beforeBuildCommand`:

.vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Now you can set breakpoints in `src-tauri/src/main.rs` or any other Rust file and start debugging by pressing `F5`.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/debugging/vs-code.md)

Last updated on **Feb 23, 2023**

- [Prerequisites](vs-code.html#prerequisites)
- [Configure launch.json](vs-code.html#configure-launchjson)

./debugging ./features ./distribution ./testing ./testing/webdriver ./testing/webdriver/example ./getting-started ./getting-started/setup Development Cycle | Tauri v1

[Skip to main content](development-cycle.html#__docusaurus_skipToContent_fallback)

On this page

# Development Cycle

### 1. Start Your Dev server[​](development-cycle.html#1-start-your-dev-server "Direct link to 1. Start Your Dev server")

Now that you have everything set up, you should start your application development server provided by your UI framework or bundler (assuming you're using one, of course).

note

Every framework has its own development tooling. It is outside of the scope of this document to cover them all or stay up to date.

### 2. Start Tauri Development Window[​](development-cycle.html#2-start-tauri-development-window "Direct link to 2. Start Tauri Development Window")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri dev
```

```shell
yarn tauri dev
```

```shell
pnpm tauri dev
```

```shell
bunx tauri dev
```

```shell
cargo tauri dev
```

The first time you run this command, the Rust package manager takes several minutes to download and build all the required packages. Since they are cached, subsequent builds are much faster, as only your code needs rebuilding.

Once Rust has finished building, the webview opens, displaying your web app. You can make changes to your web app, and if your tooling enables it, the webview should update automatically, just like a browser. When you make changes to your Rust files, they are rebuilt automatically, and your app automatically restarts.

About Cargo.toml and Source Control

In your project repository, you SHOULD commit the "src-tauri/Cargo.lock" along with the "src-tauri/Cargo.toml" to git because Cargo uses the lockfile to provide deterministic builds. As a result, it is recommended that all applications check in their Cargo.lock. You SHOULD NOT commit the "src-tauri/target" folder or any of its contents.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/development-cycle.md)

Last updated on **Jul 16, 2022**

- [1. Start Your Dev server](development-cycle.html#1-start-your-dev-server)
- [2. Start Tauri Development Window](development-cycle.html#2-start-tauri-development-window)

Updating Dependencies | Tauri v1

[Skip to main content](updating-dependencies.html#__docusaurus_skipToContent_fallback)

On this page

# Updating Dependencies

## Update npm Packages[​](updating-dependencies.html#update-npm-packages "Direct link to Update npm Packages")

If you are using the `tauri` package:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install @tauri-apps/cli@">1.0.0" @tauri-apps/api@">1.0.0"
```

```shell
yarn upgrade @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
yarn up @tauri-apps/cli@^1.0.0 @tauri-apps/api@^1.0.0
```

```shell
pnpm update @tauri-apps/cli@1 @tauri-apps/api@1
```

```shell
bun update @tauri-apps/cli @tauri-apps/api
```

You can also detect what the latest version of Tauri is on the command line, using:

- npm
- Yarn
- pnpm
- Bun

```shell
npm outdated @tauri-apps/cli
```

```shell
yarn outdated @tauri-apps/cli
```

```shell
pnpm outdated @tauri-apps/cli
```

```shell
# Bun does not implement `outdated`
npm outdated @tauri-apps/cli
```

Alternatively, if you are using the `vue-cli-plugin-tauri` approach:

- npm
- Yarn Classic
- Yarn Berry
- pnpm
- Bun

```shell
npm install vue-cli-plugin-tauri@latest
```

```shell
yarn upgrade vue-cli-plugin-tauri --latest
```

```shell
yarn up vue-cli-plugin-tauri
```

```shell
pnpm update vue-cli-plugin-tauri --latest
```

```shell
bun update vue-cli-plugin-tauri
```

## Update Cargo Packages[​](updating-dependencies.html#update-cargo-packages "Direct link to Update Cargo Packages")

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

where `%version%` is the corresponding version number from above.

Then do the following:

```shell
cd src-tauri
cargo update
```

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/development/updating-dependencies.md)

Last updated on **Oct 2, 2024**

- [Update npm Packages](updating-dependencies.html#update-npm-packages)
- [Update Cargo Packages](updating-dependencies.html#update-cargo-packages)

Distributing with CrabNebula Cloud | Tauri v1

[Skip to main content](distributing-with-crabnebula-cloud.html#__docusaurus_skipToContent_fallback)

# Distributing with CrabNebula Cloud

[CrabNebula](https://crabnebula.dev) is an official Tauri partner providing services and tooling for Tauri applications. The [CrabNebula Cloud](https://crabnebula.dev/cloud/) is a platform for application distribution that seamlessly integrates with the Tauri updater.

The Cloud offers a Content Delivery Network (CDN) that is capable of shipping your application installers and updates globally while being cost effective and exposing download metrics.

With the CrabNebula Cloud service it is simple to implement multiple release channels, download buttons for your application website and more.

Setting up your Tauri app to use the Cloud is easy: all you need to do is to sign in to the [Cloud website](https://web.crabnebula.cloud/) using your GitHub account, create your organization and application and install its CLI to create a release and upload the Tauri bundles. Additionally, a [GitHub Action](https://github.com/crabnebula-dev/cloud-release/) is provided to simplify the process of using the CLI on GitHub workflows.

For more information, see the [CrabNebula Cloud documentation](https://docs.crabnebula.dev/cloud/).

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/distributing-with-crabnebula-cloud.md)

Last updated on **May 10, 2024**

App Publishing | Tauri v1

[Skip to main content](publishing.html#__docusaurus_skipToContent_fallback)

On this page

# App Publishing

### 1. Build Your Web App[​](publishing.html#1-build-your-web-app "Direct link to 1. Build Your Web App")

Now that you are ready to package your project, you need to run your framework's or bundler's build command (assuming you're using one, of course).

note

Every framework has its publishing tooling. It is outside of the scope of this document to treat them all or keep them up to date.

### 2. Bundle your application with Tauri[​](publishing.html#2-bundle-your-application-with-tauri "Direct link to 2. Bundle your application with Tauri")

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri build
```

```shell
yarn tauri build
```

```shell
pnpm tauri build
```

```shell
bunx tauri build
```

```shell
cargo tauri build
```

This command embeds your web assets into a single binary with your Rust code. The binary itself will be located in `src-tauri/target/release/[app name]`, and bundles and installers will be located in `src-tauri/target/release/bundle/`.

Like the `tauri dev` command, the first time you run this, it takes some time to collect the Rust crates and build everything - but on subsequent runs, it only needs to rebuild your app's code, which is much quicker.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/publishing.md)

Last updated on **Sep 17, 2024**

- [1. Build Your Web App](publishing.html#1-build-your-web-app)
- [2. Bundle your application with Tauri](publishing.html#2-bundle-your-application-with-tauri)

Code Signing Linux packages | Tauri v1

[Skip to main content](sign-linux.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing Linux packages

This guide provides information on code signing for Linux packages.

## Requirements[​](sign-linux.html#requirements "Direct link to Requirements")

- gpg or gpg2

A key for signing must be prepared. A new one can be generated using:

```shell
gpg2 --full-gen-key
```

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

## Signing for AppImages[​](sign-linux.html#signing-for-appimages "Direct link to Signing for AppImages")

You can embed a signature in the AppImage by setting the following environment variables:

- **SIGN**: set to `1` to sign the AppImage.
- **SIGN\_KEY**: optional variable to use a specific GPG Key ID for signing.
- **APPIMAGETOOL\_SIGN\_PASSPHRASE**: the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when running automated tasks.

You can display the signature embedded in the AppImage by running the following command:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

The signature is not verified

AppImage does not validate the signature, so you can't rely on it to check whether the file has been tampered with or not. To validate the signature, you must provide an external tool for your users. See [the official AppImage documentation](https://docs.appimage.org/packaging-guide/optional/signatures.html) for additional information.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-linux.md)

Last updated on **Mar 25, 2023**

- [Requirements](sign-linux.html#requirements)
- [Signing for AppImages](sign-linux.html#signing-for-appimages)

Code Signing macOS Applications | Tauri v1

[Skip to main content](sign-macos.html#__docusaurus_skipToContent_fallback)

On this page

# Code Signing macOS Applications

This guide provides information on code signing and notarization for macOS applications.

note

If you are not utilizing GitHub Actions to perform builds of OSX DMGs, you will need to ensure the environment variable *CI=true* exists. For more information refer to [tauri-apps/tauri#592](https://github.com/tauri-apps/tauri/issues/592).

## Requirements[​](sign-macos.html#requirements "Direct link to Requirements")

- macOS 10.13.6 or later
- Xcode 14 or later
- An Apple Developer account enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)

For more details please read the developer article on [notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution).

## tl;dr[​](sign-macos.html#tldr "Direct link to tl;dr")

The Tauri code signing and notarization process is configured through the following environment variables:

- `APPLE_SIGNING_IDENTITY`: the name of the keychain entry that contains the signing certificate.
- `APPLE_CERTIFICATE`: base64 string of the `.p12` certificate, exported from the keychain. Useful if you don't have the certificate on the keychain (e.g., CI machines).
- `APPLE_CERTIFICATE_PASSWORD`: the password for the `.p12` certificate.
- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: your Apple account email, an [app-specific password](https://support.apple.com/en-ca/HT204397) and your [team ID](https://developer.apple.com/account#MembershipDetailsCard). Only required to notarize the app.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: authentication with an App Store Connect API key instead of the Apple ID. Only required if you notarize the app.

## Signing Tauri apps[​](sign-macos.html#signing-tauri-apps "Direct link to Signing Tauri apps")

The first step to signing a macOS application is getting a signing certificate from the Apple Developer Program.

### Creating a signing certificate[​](sign-macos.html#creating-a-signing-certificate "Direct link to Creating a signing certificate")

To create a new signing certificate, you must generate a Certificate Signing Request (CSR) file from your Mac computer. [Create a certificate signing request](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) describes creating a CSR.

On your Apple Developer account, navigate to the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list) and click on the `Create a certificate` button to open the interface to create a new certificate. Choose the appropriate certificate type (`Apple Distribution` to submit apps to the App Store, and `Developer ID Application` to ship apps outside the App Store). Upload your CSR, and the certificate will be created.

note

Only the Apple Developer `Account Holder` can create *Developer ID Application* certificates. But it can be associated with a different Apple ID by creating a CSR with a different user email address.

### Downloading a certificate[​](sign-macos.html#downloading-a-certificate "Direct link to Downloading a certificate")

On the [Certificates, IDs &amp; Profiles page](https://developer.apple.com/account/resources/certificates/list), click on the certificate you want to use and click on the `Download` button. It saves a `.cer` file that installs the certificate on the keychain once opened. The name of the keychain entry represents the `signing identity`, which can also be found by executing `security find-identity -v -p codesigning`.

note

A signing certificate is only valid if associated with your Apple ID. An invalid certificate won't be listed on the *Keychain Access &gt; My Certificates* tab or the *security find-identity -v -p codesigning* output. If the certificate does not download to the correct location, make sure the "login" option is selected in *Keychain Access* under "Default Keychains" when downloading the .cer file.

### Signing the Tauri application[​](sign-macos.html#signing-the-tauri-application "Direct link to Signing the Tauri application")

The signing configuration is provided to the Tauri bundler via environment variables. You need to configure the certificate to use and an optional authentication configuration to notarize the application.

#### Certificate environment variables[​](sign-macos.html#certificate-environment-variables "Direct link to Certificate environment variables")

- `APPLE_SIGNING_IDENTITY`: this is the `signing identity` we highlighted above. It must be defined to sign apps both locally and on CI machines. Using just the part in the parentheses is usually enough, for example `ABCDE12345` in `Developer ID Application: Walter Tauri (ABCDE12345)`

Additionally, to simplify the code signing process on CI, Tauri can install the certificate on the keychain for you if you define the `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD` environment variables.

1. Open the `Keychain Access` app to *login &gt; My Certificates* and find your certificate's keychain entry.
2. Expand the entry, double-click on the key item, and select `Export "$KEYNAME"`.
3. Select the path to save the `.p12` file and define the exported certificate password.
4. Convert the `.p12` file to base64 running the following script on the terminal: `openssl base64 -in /path/to/certificate.p12 -out certificate-base64.txt`.
5. Set the contents of the `certificate-base64.txt` file to the `APPLE_CERTIFICATE` environment variable.
6. Set the certificate password to the `APPLE_CERTIFICATE_PASSWORD` environment variable.

#### Authentication environment variables[​](sign-macos.html#authentication-environment-variables "Direct link to Authentication environment variables")

These variables are only required to notarize the application.

note

Notarization is required when using a *Developer ID Application* certificate.

- `APPLE_ID`, `APPLE_PASSWORD` and `APPLE_TEAM_ID`: to authenticate with your Apple ID, set the `APPLE_ID` to your Apple account email (example: `export APPLE_ID=tauri@icloud.com`) and the `APPLE_PASSWORD` to an [app-specific password](https://support.apple.com/en-ca/HT204397) for the Apple account.
- `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`: alternatively, you can authenticate using an App Store Connect API key. Open the App Store Connect's [Users and Access page](https://appstoreconnect.apple.com/access/users), select the `Keys` tab, click on the `Add` button and select a name and the `Developer` access. The `APPLE_API_ISSUER` (`Issuer ID`) is presented above the keys table, and the `APPLE_API_KEY` is the value on the `Key ID` column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be set via the `APPLE_API_KEY_PATH` environment variable.

### Building the application[​](sign-macos.html#building-the-application "Direct link to Building the application")

The Tauri bundler automatically signs and notarizes your application with all these environment variables set when running the `tauri build` command.

### Example[​](sign-macos.html#example "Direct link to Example")

The following example uses GitHub Actions to sign an application using the [Tauri action](https://github.com/tauri-apps/tauri-action).

We first define the environment variables we listed above as Secrets on GitHub.

note

You can view [this guide](https://docs.github.com/en/actions/reference/encrypted-secrets) to learn about GitHub secrets.

Once we have established the GitHub Secrets, we will update the last step of the GitHub publish workflow from the [cross-platform guide](../building/cross-platform.html#example-workflow):

```yml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    APPLE_SIGNING_IDENTITY: ${{ secrets.APPLE_SIGNING_IDENTITY }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
  with:
    tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

The workflow pulls the secrets from GitHub and defines them as environment variables before building the application using the Tauri action. The output is a GitHub release with the signed and notarized macOS application.

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-macos.md)

Last updated on **Mar 19, 2025**

- [Requirements](sign-macos.html#requirements)
- [tl;dr](sign-macos.html#tldr)
- [Signing Tauri apps](sign-macos.html#signing-tauri-apps)
  
  - [Creating a signing certificate](sign-macos.html#creating-a-signing-certificate)
  - [Downloading a certificate](sign-macos.html#downloading-a-certificate)
  - [Signing the Tauri application](sign-macos.html#signing-the-tauri-application)
  - [Building the application](sign-macos.html#building-the-application)
  - [Example](sign-macos.html#example)

Windows - Code signing guide locally &amp; with GitHub Actions | Tauri v1

[Skip to main content](sign-windows.html#__docusaurus_skipToContent_fallback)

On this page

# Windows - Code signing guide locally &amp; with GitHub Actions

## Intro[​](sign-windows.html#intro "Direct link to Intro")

Code signing your application lets users know that they downloaded the official executable of your app and not some 3rd party malware that poses as your app. While it is not required, it improves users' confidence in your app.

danger

This guide only applies to OV code signing certificates acquired before June 1st 2023! For code signing with EV certificates and OV certificates received after that date please consult the documentation of your certificate issuer instead.

## Prerequisites[​](sign-windows.html#prerequisites "Direct link to Prerequisites")

- Windows - you can likely use other platforms, but this tutorial uses Powershell native features.
- A working Tauri application
- Code signing certificate - you can acquire one of these on services listed in [Microsoft's docs](https://learn.microsoft.com/en-us/windows-hardware/drivers/dashboard/code-signing-cert-manage). There are likely additional authorities for non-EV certificates than included in that list, please compare them yourself and choose one at your own risk.
  
  - Please make sure to get a **code signing** certificate, SSL certificates do not work!

This guide assumes that you have a standard code signing certificate&gt; If you have an EV certificate, which generally involves a hardware token, please follow your issuer's documentation instead.

note

If you sign the app with an EV Certificate, it'll receive an immediate reputation with Microsoft SmartScreen and won't show any warnings to users.

If you opt for an OV Certificate, which is generally cheaper and available to individuals, Microsoft SmartScreen will still show a warning to users when they download the app. It might take some time until your certificate builds enough reputation. You may opt for [submitting your app](https://www.microsoft.com/en-us/wdsi/filesubmission/) to Microsoft for manual review. Although not guaranteed, if the app does not contain any malicious code, Microsoft may grant additional reputation and potentially remove the warning for that specific uploaded file.

## Getting Started[​](sign-windows.html#getting-started "Direct link to Getting Started")

There are a few things we have to do to get Windows prepared for code signing. This includes converting our certificate to a specific format, installing this certificate, and decoding the required information from the certificate.

### A. Convert your `.cer` to `.pfx`[​](sign-windows.html#a-convert-your-cer-to-pfx "Direct link to a-convert-your-cer-to-pfx")

1. You will need the following:
   
   - certificate file (mine is `cert.cer`)
   - private key file (mine is `private-key.key`)
2. Open up a command prompt and change to your current directory using `cd Documents/Certs`
3. Convert your `.cer` to a `.pfx` using `openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx`
4. You should be prompted to enter an export password **DON'T FORGET IT!**

### B. Import your `.pfx` file into the keystore.[​](sign-windows.html#b-import-your-pfx-file-into-the-keystore "Direct link to b-import-your-pfx-file-into-the-keystore")

We now need to import our `.pfx` file.

1. Assign your export password to a variable using `$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'`
2. Now Import the certificate using `Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)`

### C. Prepare Variables[​](sign-windows.html#c-prepare-variables "Direct link to C. Prepare Variables")

1. Start ➡️ `certmgr.msc` to open Personal Certificate Management, then open Personal/Certificates.
2. Find the certificate we just imported and double-click on it, then click on the Details tab.
3. The Signature hash algorithm will be our `digestAlgorithm`. (Hint: this is likely `sha256`)
4. Scroll down to Thumbprint. There should be a value like `A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0`. This is our `certificateThumbprint`.
5. We also need a timestamp URL; this is a time server used to verify the time of the certificate signing. I'm using `http://timestamp.comodoca.com`, but whoever you got your certificate from likely has one as well.

## Prepare `tauri.conf.json` file[​](sign-windows.html#prepare-tauriconfjson-file "Direct link to prepare-tauriconfjson-file")

1. Now that we have our `certificateThumbprint`, `digestAlgorithm`, &amp; `timestampUrl` we will open up the `tauri.conf.json`.
2. In the `tauri.conf.json` you will look for the `tauri` -&gt; `bundle` -&gt; `windows` section. You see, there are three variables for the information we have captured. Fill it out like below.

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

3. Save and run `yarn | yarn build`
4. In the console output, you should see the following output.

```text
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

Which shows you have successfully signed the `.exe`.

And that's it! You have successfully signed your .exe file.

## BONUS: Sign your application with GitHub Actions.[​](sign-windows.html#bonus-sign-your-application-with-github-actions "Direct link to BONUS: Sign your application with GitHub Actions.")

We can also create a workflow to sign the application with GitHub actions.

### GitHub Secrets[​](sign-windows.html#github-secrets "Direct link to GitHub Secrets")

We need to add a few GitHub secrets for the proper configuration of the GitHub Action. These can be named however you would like.

- You can view the [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) guide on how to add GitHub secrets.

The secrets we used are as follows

| GitHub Secrets                 | Value for Variable                                                                                                                |
|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| WINDOWS\_CERTIFICATE           | Base64 encoded version of your .pfx certificate, can be done using this command `certutil -encode certificate.pfx base64cert.txt` |
| WINDOWS\_CERTIFICATE\_PASSWORD | Certificate export password used on creation of certificate .pfx                                                                  |

### Workflow Modifications[​](sign-windows.html#workflow-modifications "Direct link to Workflow Modifications")

1. We need to add a step in the workflow to import the certificate into the Windows environment. This workflow accomplishes the following
   
   1. Assign GitHub secrets to environment variables
   2. Create a new `certificate` directory
   3. Import `WINDOWS_CERTIFICATE` into tempCert.txt
   4. Use `certutil` to decode the tempCert.txt from base64 into a `.pfx` file.
   5. Remove tempCert.txt
   6. Import the `.pfx` file into the Cert store of Windows &amp; convert the `WINDOWS_CERTIFICATE_PASSWORD` to a secure string to be used in the import command.
2. We will be using the [`tauri-action` publish template](https://github.com/tauri-apps/tauri-action).

```yml
name: 'publish'
on:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install webkit2gtk (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y webkit2gtk-4.0
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

3. Right above `-name: install app dependencies and build it` you will want to add the following step

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

4. Save and push to your repo.
5. Your workflow can now import your windows certificate and import it into the GitHub runner, allowing for automated code signing!

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/sign-windows.md)

Last updated on **Oct 4, 2023**

- [Intro](sign-windows.html#intro)
- [Prerequisites](sign-windows.html#prerequisites)
- [Getting Started](sign-windows.html#getting-started)
  
  - [A. Convert your `.cer` to `.pfx`](sign-windows.html#a-convert-your-cer-to-pfx)
  - [B. Import your `.pfx` file into the keystore.](sign-windows.html#b-import-your-pfx-file-into-the-keystore)
  - [C. Prepare Variables](sign-windows.html#c-prepare-variables)
- [Prepare `tauri.conf.json` file](sign-windows.html#prepare-tauriconfjson-file)
- [BONUS: Sign your application with GitHub Actions.](sign-windows.html#bonus-sign-your-application-with-github-actions)
  
  - [GitHub Secrets](sign-windows.html#github-secrets)
  - [Workflow Modifications](sign-windows.html#workflow-modifications)

Updater | Tauri v1

[Skip to main content](updater.html#__docusaurus_skipToContent_fallback)

On this page

# Updater

Tauri offers a built-in updater for the NSIS (Windows), MSI (Windows), AppImage (Linux) and App bundle (macOS) distribution formats.

Once your Tauri project is ready, you can configure Tauri's updater to enable auto updating for your users.

## Signing Updates[​](updater.html#signing-updates "Direct link to Signing Updates")

Tauri's updater has a built-in signature mechanism to ensure that updates are safe to be installed.

To sign your updates you need two things:

1. The *public key*, which will be added to your `tauri.conf.json` file later, to validate update artifacts before the installation.
2. The *private key*, which is used to sign your update artifacts and should NEVER be shared with anyone. Also, if you lose this key, you will NOT be able to publish new updates to your current user base. It is crucial to store it in a safe place where you can always access it.

To generate the keys on Linux and macOS you can use the Tauri CLI:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w ~/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w ~/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w ~/.tauri/myapp.key
```

If you are on Windows, you should use `$HOME/.tauri/myapp.key` or a different path of your choice instead:

- npm
- Yarn
- pnpm
- bun
- Cargo

```shell
npm run tauri signer generate -- -w $HOME/.tauri/myapp.key
```

```shell
yarn tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
bunx tauri signer generate -w $HOME/.tauri/myapp.key
```

```shell
cargo tauri signer generate -w $HOME/.tauri/myapp.key
```

## Tauri Configuration[​](updater.html#tauri-configuration "Direct link to Tauri Configuration")

Now you need to configure Tauri's updater. To do this, add this to your [Tauri config](https://v1.tauri.app/v1/api/config#updaterconfig):

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_UPDATER_SIGNATURE_PUBKEY_HERE"
    }
  }
}
```

The required keys are `"active"`, `"endpoints"` and `"pubkey"` to enable the updater. `"dialog"` is optional and will default to `true` if not set.

`"active"` must be a boolean. By default it's set to false.

`"endpoints"` must be an array of updater endpoint URLs as strings. TLS is enforced in production mode.  
Each updater URL can contain the following variables allowing you to determine [server-side](updater.html#update-server-json-format) if an update is available:

- `{{current_version}}`: The version of the app that is requesting the update.
- `{{target}}`: The operating system name (one of `linux`, `windows` or `darwin`).
- `{{arch}}`: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).

`"pubkey"` must be a valid public key generated with Tauri's CLI [above](updater.html#signing-updates).

`"dialog"` if present must be a boolean. By default it's set to true. If enabled, updater [events](updater.html#events) will be disabled as the built-in dialog handles everything. If you need custom events, you must turn off the built-in dialog.

### `installMode` on Windows[​](updater.html#installmode-on-windows "Direct link to installmode-on-windows")

On Windows there is an additional optional config [`"installMode"`](https://v1.tauri.app/v1/api/config#updaterwindowsconfig.installmode) to change how the update is installed.

tauri.conf.json

```json
{
  "tauri": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: There will be a small window with a progress bar. The update will be installed without requiring any user interaction. Generally recommended and the default mode.
- `"basicUi"`: There will be a basic user interface shown which requires user interaction to finish the installation.
- `"quiet"`: There will be no progress feedback to the user. With this mode the installer cannot request admin privileges by itself so it only works in user-wide installations or when your app itself already runs with admin privileges. Generally not recommended.

## Update Artifacts[​](updater.html#update-artifacts "Direct link to Update Artifacts")

Tauri's bundler will automatically generate and sign update artifacts once the updater is correctly configured and enabled.

Before building your app, you need to set environment variables for the private key and password:

- `TAURI_PRIVATE_KEY`: Path or content of your private key
- `TAURI_KEY_PASSWORD`: Your private key password (optional)

If you want to set these variables for the current console session you could execute these commands in the console which you will use to build the app later:

- Bash
- PowerShell

```shell
export TAURI_PRIVATE_KEY="content of the generated key"
export TAURI_KEY_PASSWORD="password"
```

```powershell
$env:TAURI_PRIVATE_KEY="content of the generated key"
$env:TAURI_KEY_PASSWORD="password"
```

After that, you can run `tauri build` as usual and Tauri will generate the update bundle and its signature.

- **Linux**: On Linux, Tauri will create a `.tar.gz` archive from the AppImage inside the `target/release/bundle/appimage/` folder:
  
  - `myapp.AppImage` - the standard app bundle.
  - `myapp.AppImage.tar.gz` - the updater bundle.
  - `myapp.AppImage.tar.gz.sig` - the signature of the update bundle.
- **macOS**: On macOS, Tauri will create a `.tar.gz` archive from the application bundle inside the `target/release/bundle/macos/` folder:
  
  - `myapp.app` - the standard app bundle.
  - `myapp.app.tar.gz` - the updater bundle.
  - `myapp.app.tar.gz.sig` - the signature of the update bundle.
- **Windows**: On Windows, Tauri will create `.zip` archives from the MSI and NSIS installers inside the `target/release/bundle/msi/` and `target/release/bundle/nsis` folders:
  
  - `myapp-setup.exe` - the standard app bundle.
  - `myapp-setup.nsis.zip` - the updater bundle.
  - `myapp-setup.nsis.zip.sig` - the signature of the update bundle.
  - `myapp.msi` - the standard app bundle.
  - `myapp.msi.zip` - the updater bundle.
  - `myapp.msi.zip.sig` - the signature of the update bundle.

The signature can be uploaded and shared safely as long as your private key is secure.

## Server Support[​](updater.html#server-support "Direct link to Server Support")

Tauri's updater supports two ways of announcing update data:

- A static JSON file (to use on services like S3 or GitHub gists)
- A dynamic update server

The static JSON file is easier to use while a dynamic update server will give you finer control over the update mechanism.

### Static JSON File[​](updater.html#static-json-file "Direct link to Static JSON File")

With this approach, Tauri will always request the same JSON file and determine if the app needs to be updated by comparing the version field of the response with the requesting app's current version. Tauri will expect a response in this format:

```json
{
  "version": "v1.0.0",
  "notes": "Test version",
  "pub_date": "2020-06-22T19:25:57Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "Content of app.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "Content of app.AppImage.tar.gz.sig",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
    },
    "windows-x86_64": {
      "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
    }
  }
}
```

The required keys are `"version"`, `"platforms.[target].url"` and `"platforms.[target].signature"`; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"platforms"`: Each platform key is in the `OS-ARCH` format, where `OS` is one of `linux`, `darwin` or `windows`, and `ARCH` is one of `x86_64`, `aarch64`, `i686` or `armv7`.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

Note that Tauri will validate the *whole* file before checking the version field, so make sure all existing platform configurations are valid and complete.

tip

[Tauri Action](../building/cross-platform.html#tauri-github-action) generates a static JSON file for you to use on CDNs such as GitHub Releases.

### Dynamic Update Server[​](updater.html#dynamic-update-server "Direct link to Dynamic Update Server")

With this approach, Tauri will follow the update server's instructions. To disable the internal version check you can [overwrite Tauri's version comparison](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.should_install) to always install the version sent by the server. This could be useful if you need to roll back your app version quickly.

Your server can use variables defined in the [`endpoint`](https://v1.tauri.app/v1/api/config#updaterconfig.endpoints) url above to determine if an update is required. If you need more data, you can include additional [request headers in Rust](https://docs.rs/tauri/latest/tauri/updater/struct.UpdateBuilder.html#method.header) to your liking.

Your server should respond with a status code of [`204 No Content`](http://tools.ietf.org/html/rfc2616#section-10.2.5) if there is no update available.

If an update is required, your server should respond with a status code of [`200 OK`](http://tools.ietf.org/html/rfc2616#section-10.2.1) and a JSON response in this format:

```json
{
  "version": "0.2.0",
  "pub_date": "2020-09-18T12:29:53+01:00",
  "url": "https://mycompany.example.com/myapp/releases/myrelease.tar.gz",
  "signature": "Content of the relevant .sig file",
  "notes": "These are some release notes"
}
```

The required keys are "url", "version" and "signature"; the others are optional.

- `"version"` must be a valid semver, with or without a leading `v`, meaning that both `1.0.0` and `v1.0.0` are valid.
- `"url"` must be a valid url to the update bundle.
- `"signature"` must be the **content** of the generated `.sig` file. The signature may change each time you run `tauri build` so make sure to always update it.
- `"notes"`: Here you can add notes about the update, like release notes. Tauri's default dialog will present this to the user when it asks if it's allowed to update.
- `"pub_date"` must be formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.8) if present.

tip

CrabNebula, an official Tauri partner, offers a dynamic update server. For more information, see the [Distributing with CrabNebula Cloud](distributing-with-crabnebula-cloud.html) documentation.

## Checking for Updates[​](updater.html#checking-for-updates "Direct link to Checking for Updates")

### Built-In Dialog[​](updater.html#built-in-dialog "Direct link to Built-In Dialog")

By default, the updater shows a dialog using Tauri's [dialog.ask](https://v1.tauri.app/v1/api/js/dialog#ask) API internally. The dialog will only check for a new update when the app was just launched or when you manually [emit](https://v1.tauri.app/v1/api/js/event#emit) the `"tauri://update"` event.

![Default updater dialog](../../../assets/images/update-available-01210961ee703996fbda4f039e84e319.png)

The dialog release notes are represented by the update `notes` provided by the [server](updater.html#server-support). If the user accepts, the update is downloaded and installed. Afterwards, the user is prompted to restart the application.

### Custom Dialog[​](updater.html#custom-dialog "Direct link to Custom Dialog")

caution

You need to disable the built-in dialog in your [Tauri configuration](updater.html#tauri-configuration) to enable the JavaScript APIs and updater events!

#### Rust[​](updater.html#rust "Direct link to Rust")

Please see the updater module documentation at [docs.rs](https://docs.rs/tauri/latest/tauri/updater/index.html) for the Rust API.

#### JavaScript[​](updater.html#javascript "Direct link to JavaScript")

For the complete API docs see [here](https://v1.tauri.app/v1/api/js/updater). An example using the JavaScript API looks like this:

updater.ts

```js
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const unlisten = await onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log('Updater event', error, status)
})

try {
  const { shouldUpdate, manifest } = await checkUpdate()

  if (shouldUpdate) {
    // You could show a dialog asking the user if they want to install the update here.
    console.log(
      `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
    )

    // Install the update. This will also restart the app on Windows!
    await installUpdate()

    // On macOS and Linux you will need to restart the app manually.
    // You could use this step to display another confirmation dialog.
    await relaunch()
  }
} catch (error) {
  console.error(error)
}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
unlisten()
```

[Edit this page](https://github.com/tauri-apps/tauri-docs/edit/v1/docs/guides/distribution/updater.md)

Last updated on **May 10, 2024**

- [Signing Updates](updater.html#signing-updates)
- [Tauri Configuration](updater.html#tauri-configuration)
  
  - [`installMode` on Windows](updater.html#installmode-on-windows)
- [Update Artifacts](updater.html#update-artifacts)
- [Server Support](updater.html#server-support)
  
  - [Static JSON File](updater.html#static-json-file)
  - [Dynamic Update Server](updater.html#dynamic-update-server)
- [Checking for Updates](updater.html#checking-for-updates)
  
  - [Built-In Dialog](updater.html#built-in-dialog)
  - [Custom Dialog](updater.html#custom-dialog)
