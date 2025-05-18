
`$ yazi-cli`

Yazi provides a command-line tool called `ya`, which is used to assist with tasks like plugin management, flavor management, DDS message publishing and subscribing, among other features.

It is an essential component of Yazi. Most distributions include it by default when installing Yazi, but if yours doesn't, you'll need to build it from source. Just be sure that the versions of both `ya` and `yazi` are exactly the same.

## Package Manager[](https://yazi-rs.github.io/docs/quick-start#package-manager "Direct link to Package Manager")

You can manage your plugins and flavors using the `ya pack` subcommand. For example, to install the plugin from [https://github.com/owner/my-plugin.yazi](https://github.com/owner/my-plugin.yazi), run:

```
ya pack -a owner/my-plugin
```

`ya pack` also supports installing a subdirectory from a monorepo as a package. For example, to install the package from [https://github.com/yazi-rs/plugins/tree/main/git.yazi](https://github.com/yazi-rs/plugins/tree/main/git.yazi), run:

```
ya pack -a yazi-rs/plugins:git
```

and it will automatically clone them from GitHub, copy them to your plugins directory, and update the `package.toml` to lock their versions:

```
# ~/.config/yazi/package.toml[plugin]deps = [{ use = "owner/my-plugin", rev = "0573024" },{ use = "yazi-rs/plugins:git", rev = "9a1129c" }]
```

To list all the plugins managed by `ya pack`:

To install all the plugins with locked versions from `package.toml` on a new system:

To upgrade all the plugins to the latest version:

If you want to pin a plugin to a specific version so that it doesn't get upgraded when running `ya pack -u`, add an `=` qualifier before the hash in `rev`:

```
[plugin]deps = [-{ use = "owner/my-plugin", rev = "9a1129c" }+{ use = "owner/my-plugin", rev = "=9a1129c" }]
```

## Configuration

There are three configuration files for Yazi:

-   [`yazi.toml`](https://yazi-rs.github.io/docs/configuration/yazi) - General configuration.
-   [`keymap.toml`](https://yazi-rs.github.io/docs/configuration/keymap) - Keybindings configuration.
-   [`theme.toml`](https://yazi-rs.github.io/docs/configuration/theme) - Color scheme configuration.

You can find the default configuration files on the **_`shipped`_** tag [https://github.com/sxyazi/yazi/tree/**_shipped_**/yazi-config/preset](https://github.com/sxyazi/yazi/tree/shipped/yazi-config/preset).

To override any of the defaults, begin by creating the corresponding file (from the directory linked above) to:

-   `~/.config/yazi/` on Unix-like systems.
-   `C:\Users\USERNAME\AppData\Roaming\yazi\config\` on Windows.

For example, to change the visible status of hidden files, start by creating a `yazi.toml` file to:

-   `~/.config/yazi/yazi.toml` on Unix-like systems.
-   `C:\Users\USERNAME\AppData\Roaming\yazi\config\yazi.toml` on Windows.

Then [copy the required part](https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/yazi.toml) into it, here is `show_hidden`:

```
# yazi.toml[manager]show_hidden = true
```

## Configuration mixing[](https://yazi-rs.github.io/docs/quick-start#mixing "Direct link to Configuration mixing")

The options from your configuration file will be used to override the default. However, for key bindings, if you don't want to override the default directly:

```
# keymap.toml[manager]keymap = [# ...]
```

And instead want to customize your keys upon the default, you can use `prepend_*` or `append_*` directories to prepend or append them to the default (See [keymap.toml](https://yazi-rs.github.io/docs/configuration/keymap) for details):

```
# keymap.toml[manager]prepend_keymap = [# ...]append_keymap = [# ...]
```

They are also available for open, icon, previewer, and preloader rules.

## Custom config directory[](https://yazi-rs.github.io/docs/quick-start#custom-directory "Direct link to Custom config directory")

You can change the Yazi configuration directory by exporting the `YAZI_CONFIG_HOME` environment variable. For example:

```
env "YAZI_CONFIG_HOME=~/.config/yazi-alt" yazi
```

will start Yazi with `~/.config/yazi-alt` as the configuration directory, and can have its own `yazi.toml`, `keymap.toml`, `init.lua`, etc. files within it.

## Flavors

The "flavor" is a pre-made Yazi theme, while what we typically refer to as a "theme" is the user's own theme, i.e. `~/.config/yazi/theme.toml` file.

The purpose of separating them is to allow users to customize their preferences more conveniently on top of an existing flavor, without having to modify those flavor files. This makes it easier to update, as there won't be conflicts when pulling from Git.

Behind the scenes, Yazi merges the user's `theme.toml` with the flavor's `flavor.toml` automatically, and the user's always takes precedence over the flavor.

## Directory structure[](https://yazi-rs.github.io/docs/quick-start#structure "Direct link to Directory structure")

These flavors are placed in the `flavors` subdirectory of the Yazi configuration directory, so either:

-   `~/.config/yazi/flavors/` on Unix-like systems.
-   `C:\Users\USERNAME\AppData\Roaming\yazi\config\flavors\` on Windows.

```
~/.config/yazi/├── flavors/│   ├── foo.yazi/│   └── bar.yazi/└── theme.toml
```

Each flavor is a directory with a [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) name, ending in `.yazi`, and containing at least the following files:

```
~/.config/yazi/flavors/bar.yazi/├── flavor.toml├── tmtheme.xml├── README.md├── preview.png├── LICENSE└── LICENSE-tmtheme
```

Where:

-   `flavor.toml` is this flavor's configuration file, in the format consistent with the [user's `theme.toml`](https://yazi-rs.github.io/docs/configuration/theme).
-   `tmtheme.xml` is a [tmTheme file](https://www.sublimetext.com/docs/color_schemes_tmtheme.html) that matches the colors of this flavor for code highlighting.
-   `README.md` and `preview.png` are the description and the preview image of this flavor, respectively.
-   `LICENSE` and `LICENSE-tmtheme` are the licenses for the flavor and the `tmtheme.xml` file, respectively.

## Usage[](https://yazi-rs.github.io/docs/quick-start#usage "Direct link to Usage")

For example, if you want to use the `bar.yazi` flavor, add these lines to your `theme.toml`:

## Cooking a flavor[](https://yazi-rs.github.io/docs/quick-start#cooking "Direct link to Cooking a flavor")

Please use our [flavor-template](https://github.com/yazi-rs/flavor-template) repository as a starting point to create your own flavor.

## Plugins

You can extend Yazi's functionality through Lua plugins, which need to be placed in the `plugins` subdirectory of Yazi's configuration directory, so either:

-   `~/.config/yazi/plugins/` on Unix-like systems.
-   `C:\Users\USERNAME\AppData\Roaming\yazi\config\plugins\` on Windows.

```
~/.config/yazi/├── init.lua├── plugins/│   ├── foo.yazi/│   └── bar.yazi/└── yazi.toml
```

Each plugin is a directory with a [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) name, ending in `.yazi`, and containing at least the following files:

```
~/.config/yazi/plugins/bar.yazi/├── init.lua├── README.md└── LICENSE
```

Where:

-   `init.lua` is the entry point of this plugin.
-   `README.md` is the documentation of this plugin.
-   `LICENSE` is the license file for this plugin.

## Usage[](https://yazi-rs.github.io/docs/quick-start#usage "Direct link to Usage")

A plugin has two usages:

-   [Functional plugin](https://yazi-rs.github.io/docs/quick-start#functional-plugin): Bind the `plugin` command to a key in `keymap.toml`, and activate it by pressing the key.
-   [Custom previewers, preloaders](https://yazi-rs.github.io/docs/configuration/yazi#plugin): Configure them as `previewers` or `preloaders` in your `[plugin]` of `yazi.toml` file.

### Functional plugin[](https://yazi-rs.github.io/docs/quick-start#functional-plugin "Direct link to Functional plugin")

You can bind a `plugin` command to a specific key in your `keymap.toml` with:

| Argument/Option | Description |
| --- | --- |
| `[name]` | The name of the plugin to run. |
| `--sync` | Run the plugin in a sync context. |
| `--args=[args]` | Shell-style arguments passed to the plugin. |

For example, `plugin test --sync --args='hello world'` will run the `test` plugin with the arguments `hello` and `world` in a sync context.

To receive the arguments in the plugin, use `args`:

```
-- ~/.config/yazi/plugins/test.yazi/init.luareturn {entry = function(self, args)ya.err(args[1]) -- "hello"ya.err(args[2]) -- "world"end,}
```

## Sync vs Async[](https://yazi-rs.github.io/docs/quick-start#sync-vs-async "Direct link to Sync vs Async")

The plugin system is designed with an async-first philosophy. Therefore, unless specifically specified, such as the `--sync` for the `plugin` command, all plugins run in an async context.

There is one exception - all `init.lua` are synchronous, which includes:

-   The `init.lua` for Yazi itself, i.e. `~/.config/yazi/init.lua`.
-   The `init.lua` for each plugin, e.g. `~/.config/yazi/plugins/bar.yazi/init.lua`.

This is because `init.lua` is commonly used to initialize plugin configurations, and this process is synchronous:

```
-- ~/.config/yazi/init.luarequire("bar"):setup {key1 = "value1",key2 = "value2",-- ...}
```

```
-- ~/.config/yazi/plugins/bar.yazi/init.luareturn {setup = function(state, opts)-- Save the user configuration to the plugin's statestate.key1 = opts.key1state.key2 = opts.key2end,}
```

### Sync context[](https://yazi-rs.github.io/docs/quick-start#sync-context "Direct link to Sync context")

The sync context accompanies the entire app lifecycle, which is active during UI rendering (UI plugins), and on executing sync functional plugins (`plugin` command with `--sync`).

For better performance, the sync context is created only at the app's start and remains singular throughout. Thus, plugins running within this context share states, prompting plugin developers to use plugin-specific state persistence for their plugins to prevent global space contamination:

```
-- ~/.config/yazi/test.yazi/init.luareturn {  entry = function(state)    state.i = state.i or 0    ya.err("i = " .. state.i)    state.i = state.i + 1  end,}
```

Yazi initializes the `state` for each _sync_ plugin before running, and it exists independently for them throughout the entire lifecycle. Do the `plugin --sync test` three times, and you will see the log output:

### Async context[](https://yazi-rs.github.io/docs/quick-start#async-context "Direct link to Async context")

When a plugin is executed asynchronously, an isolated async context is created for it automatically.

In this context, you can use all the async functions supported by Yazi, and it operates concurrently with the main thread, ensuring that the main thread is not blocked.

You can also obtain [a small amount](https://yazi-rs.github.io/docs/quick-start#sendable) of app data from the sync context by calling a "sync function":

```
-- ~/.config/yazi/plugins/my-async-plugin.yazi/init.lualocal set_state = ya.sync(function(state, a)-- You can get/set the state of the plugin through `state` parameter-- in the `sync()` blockstate.a = aend)local get_state = ya.sync(function(state, b)-- You can access all app data through the `cx`,-- within the `sync()` block, in an async pluginlocal h = cx.active.current.hoveredreturn h and state.a .. tostring(h.url) or bend)return {entry = function()set_state("this is a")local h = get_state("this is b")-- Do some time-consuming work, such as reading file, network request, etc.-- It will execute concurrently with the main threadend,}
```

Note that `ya.sync()` call must be at the top level:

```
-- Wrong !!!local get_stateif some_condition thenget_state = ya.sync(function(state)-- ...end)end
```

## Interface[](https://yazi-rs.github.io/docs/quick-start#interface "Direct link to Interface")

### Previewer[](https://yazi-rs.github.io/docs/quick-start#previewer "Direct link to Previewer")

A previewer needs to return a table that implements the `peek` and `seek` functions. Both functions take a table parameter `self` and do not return any values:

```
return {peek = function(self) return end,seek = function(self) return end,}
```

When the user presses j or k to switch between hovering files, `peek` is called, with:

| Key | Description |
| --- | --- |
| `file` | The [File](https://yazi-rs.github.io/docs/plugins/types#shared.file) to be previewed. |
| `skip` | The number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos. |
| `area` | The [Rect](https://yazi-rs.github.io/docs/plugins/layout#rect) of the available preview area. |
| `window` | The [Rect](https://yazi-rs.github.io/docs/plugins/layout#rect) of the entire terminal window. |

When the user presses Alt-j or Alt-k to scroll the preview of this file, `seek` is called, with:

| Key | Description |
| --- | --- |
| `file` | The [File](https://yazi-rs.github.io/docs/plugins/types#shared.file) being scrolled. |
| `area` | The [Rect](https://yazi-rs.github.io/docs/plugins/layout#rect) of the available preview area. |

The task of `peek` is to draw in the preview area based on the values of `file` and `skip`. This process is asynchronous.

The task of `seek` is to change the value of `skip` based on user behavior and trigger `peek` again. It is synchronous, meaning you can access [app data](https://yazi-rs.github.io/docs/plugins/types#app-data) through `cx`.

Here are some preset previewers and preloaders you can refer to: [Yazi Preset Plugins](https://github.com/sxyazi/yazi/tree/shipped/yazi-plugin/preset/plugins)

### Preloader[](https://yazi-rs.github.io/docs/quick-start#preloader "Direct link to Preloader")

You need to return a table that implements the `preload` function, it receives a `self` parameter, which is a table with the same fields as [`peek()`](https://yazi-rs.github.io/docs/quick-start#previewer):

```
return {preload = function(self)return 1end,}
```

And has the following return values:

| Binary | Decimal |  |
| --- | --- | --- |
| `0 0` | 0 | Failure, don't continue |
| `0 1` | 1 | Success, don't continue |
| `1 0` | 2 | Failure, continue |
| `1 1` | 3 | Success, continue |

When "continue" is set, the preloader can reload the files that have already been loaded at the next time point, such as when the user scrolls, leading to a page switch. This is usually done for the either:

-   Retrying in case of file loading failure
-   Refreshing the file status upon successful loading

Yazi will automatically invoke the `preload` concurrently for each file that matches the preload rules on the page.

When the user specifies [`multi = true`](https://yazi-rs.github.io/docs/configuration/yazi#plugin.preloaders) for it, the plugin allows preloading multiple files at once. In this case, `self.file` will be replaced by `self.files`.

Typically, a preloader only needs to implement one of them - either single or multiple. This depends on the specific task and the magnitude of the workload. If it truly requires loading multiple files at once, the user needs to be prompted to enable the `multi` option for it.

## Sendable value[](https://yazi-rs.github.io/docs/quick-start#sendable "Direct link to Sendable value")

Yazi's plugin can run concurrently on multiple threads. For better performance, only the following types of combinations can be used for inter-thread data exchange:

-   Nil
-   Boolean
-   Number
-   String
-   [Url](https://yazi-rs.github.io/docs/plugins/types#shared.url)
-   Table and nested tables, with the above types as values

## Debugging[](https://yazi-rs.github.io/docs/quick-start#debugging "Direct link to Debugging")

Please ensure that your `~/.config/yazi/init.lua` includes valid Lua code with the correct syntax, otherwise will result in Yazi being unable to parse and execute your `init.lua` to initialize.

We recommend installing a Lua plugin in your editor for syntax checking to avoid any syntax errors. For example, install the [Lua plugin](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) for VSCode, and for Neovim, use [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) to configure your Lua LSP.

If you have no experience with Lua, you can quickly get started through [https://learnxinyminutes.com/docs/lua/](https://learnxinyminutes.com/docs/lua/)

### Logging[](https://yazi-rs.github.io/docs/quick-start#logging "Direct link to Logging")

If you want to debug some runtime data, use [`ya.dbg()`](https://yazi-rs.github.io/docs/plugins/utils#ya.dbg) and [`ya.err()`](https://yazi-rs.github.io/docs/plugins/utils#ya.err) to print what you want to debug to either:

-   `~/.local/state/yazi/yazi.log` on Unix-like systems.
-   `C:\Users\USERNAME\AppData\Roaming\yazi\state\yazi.log` on Windows.

## Post-Installation

Once you've [installed Yazi](https://yazi-rs.github.io/docs/installation), start the program with:

Press q to quit and ~ to open the help menu.

## Shell wrapper[](https://yazi-rs.github.io/docs/quick-start#shell-wrapper "Direct link to Shell wrapper")

We suggest using this `y` shell wrapper that provides the ability to change the current working directory when exiting Yazi.

-   Bash / Zsh
-   Fish
-   Nushell
-   PowerShell
-   Command Prompt

```
function y {    $tmp = [System.IO.Path]::GetTempFileName()    yazi $args --cwd-file="$tmp"    $cwd = Get-Content -Path $tmp    if (-not [String]::IsNullOrEmpty($cwd) -and $cwd -ne $PWD.Path) {        Set-Location -LiteralPath $cwd    }    Remove-Item -Path $tmp}
```

To use it, copy the function into the configuration file of your respective shell.

Then use `y` instead of `yazi` to start, and press q to quit, you'll see the CWD changed. Sometimes, you don't want to change, press Q to quit.

## Keybindings[](https://yazi-rs.github.io/docs/quick-start#keybindings "Direct link to Keybindings")

### Navigation[](https://yazi-rs.github.io/docs/quick-start#navigation "Direct link to Navigation")

To navigate between files and directories you can use the arrow keys ←, ↓, ↑ and → or Vim-like keys such as h, j, k, l:

| Key binding | Alternate key | Action |
| --- | --- | --- |
| k | ↑ | Move the cursor up |
| j | ↓ | Move the cursor down |
| l | → | Enter hovered directory |
| h | ← | Leave the current directory and into its parent |

Further navigation commands can be found in the table below.

| Key binding | Action |
| --- | --- |
| K | Seek up 5 units in the preview |
| J | Seek down 5 units in the preview |
| g ⇒ g | Move cursor to the top |
| G | Move cursor to the bottom |

### Selection[](https://yazi-rs.github.io/docs/quick-start#selection "Direct link to Selection")

To select files and directories, the following commands are available.

| Key binding | Action |
| --- | --- |
| Space | Toggle selection of hovered file/directory |
| v | Enter visual mode (selection mode) |
| V | Enter visual mode (unset mode) |
| Ctrl + a | Select all files |
| Ctrl + r | Inverse selection of all files |
| Esc | Cancel selection |

### File operations[](https://yazi-rs.github.io/docs/quick-start#file-operations "Direct link to File operations")

To interact with selected files/directories use any of the commands below.

| Key binding | Action |
| --- | --- |
| o | Open selected files |
| O | Open selected files interactively |
| Enter | Open selected files |
| Ctrl + Enter | Open selected files interactively (some terminals don't support it yet) |
| y | Yank selected files (copy) |
| x | Yank selected files (cut) |
| p | Paste yanked files |
| P | Paste yanked files (overwrite if the destination exists) |
| \- | Symlink the absolute path of yanked files |
| \_ | Symlink the relative path of yanked files |
| Ctrl + \- | Hardlink yanked files |
| Y or X | Cancel the yank status |
| d | Trash selected files |
| D | Permanently delete selected files |
| a | Create a file (ends with / for directories) |
| r | Rename selected file(s) |
| ; | Run a shell command |
| : | Run a shell command (block until finishes) |
| . | Toggle the visibility of hidden files |
| z | Jump to a directory using zoxide |
| Z | Jump to a directory or reveal a file using fzf |

### Copy paths[](https://yazi-rs.github.io/docs/quick-start#copy-paths "Direct link to Copy paths")

To copy paths, use any of the following commands below.

_Observation: c ⇒ d indicates pressing the c key followed by pressing the d key._

| Key binding | Action |
| --- | --- |
| c ⇒ c | Copy the file path |
| c ⇒ d | Copy the directory path |
| c ⇒ f | Copy the filename |
| c ⇒ n | Copy the filename without extension |

### Filter files[](https://yazi-rs.github.io/docs/quick-start#filter-files "Direct link to Filter files")

| Key binding | Action |
| --- | --- |
| f | Filter files |

### Find files[](https://yazi-rs.github.io/docs/quick-start#find-files "Direct link to Find files")

| Key binding | Action |
| --- | --- |
| / | Find next file |
| ? | Find previous file |
| n | Go to the next found |
| N | Go to the previous found |

### Search files[](https://yazi-rs.github.io/docs/quick-start#search-files "Direct link to Search files")

| Key binding | Action |
| --- | --- |
| s | Search files by name using [fd](https://github.com/sharkdp/fd) |
| S | Search files by content using [ripgrep](https://github.com/BurntSushi/ripgrep) |
| Ctrl + s | Cancel the ongoing search |

### Sorting[](https://yazi-rs.github.io/docs/quick-start#sorting "Direct link to Sorting")

To sort files/directories use the following commands.

_Observation: , ⇒ a indicates pressing the , key followed by pressing the a key._

| Key binding | Action |
| --- | --- |
| , ⇒ m | Sort by modified time |
| , ⇒ M | Sort by modified time (reverse) |
| , ⇒ c | Sort by creation time |
| , ⇒ C | Sort by creation time (reverse) |
| , ⇒ e | Sort by file extension |
| , ⇒ E | Sort by file extension (reverse) |
| , ⇒ a | Sort alphabetically |
| , ⇒ A | Sort alphabetically (reverse) |
| , ⇒ n | Sort naturally |
| , ⇒ N | Sort naturally (reverse) |
| , ⇒ s | Sort by size |
| , ⇒ S | Sort by size (reverse) |
| , ⇒ r | Sort randomly |

### Multi-tab[](https://yazi-rs.github.io/docs/quick-start#multi-tab "Direct link to Multi-tab")

| Key binding | Action |
| --- | --- |
| t | Create a new tab with CWD |
| 1, 2, ..., 9 | Switch to the N-th tab |
| \[ | Switch to the previous tab |
| \] | Switch to the next tab |
| \{ | Swap current tab with previous tab |
| } | Swap current tab with next tab |
| Ctrl + c | Close the current tab |

## Flavors[](https://yazi-rs.github.io/docs/quick-start#flavors "Direct link to Flavors")

Pick a color scheme you like from our [flavors repository](https://github.com/yazi-rs/flavors), or [cooking a flavor](https://yazi-rs.github.io/docs/flavors/overview#cooking)!
