# zed.dev

<div>
 <details>
    <summary>
      <em> 🫖 Table of Contents</em>
    </summary>
<!-- MarkdownTOC -->
- Accounts
- What Features Require Signing In?
- Signing In
- Signing Out
- Additional Learning Materials
- Channels
  - Overview
  - Channels
  - Sharing projects
  - Notes
  - Chat
  - Inviting people
  - Livestreaming &amp; Guests
- Collaboration
- Adding a collaborator to a call
  - Inviting a collaborator
  - Inviting non-Zed users
  - Voice chat
- Collaborating on a project
  - Share a project
    - Unshared Projects
  - Follow a collaborator
    - How following works
  - Sharing your screen
  - Adding a project
  - Removing a project
  - Following a collaborator's terminal
  - Leave call
- Completions
- Language Server Code Completions
- Edit Predictions
  - Configuring Zeta
  - Switching Modes
  - Conflict With Other `tab` Actions
- Configuring Edit Prediction Keybindings
  - Keybinding Example: Always Use Alt-Tab
  - Keybinding Example: Displaying Tab and Alt-Tab on Linux
  - Missing keybind
- Disabling Automatic Edit Prediction
  - On Buffers
  - For Specific Languages
  - Turning Off Completely
- Configuring GitHub Copilot
- Configuring Supermaven
- See also
- Configuring supported languages
- Language-specific Settings
- File Associations
- Working with Language Servers
  - What are Language Servers?
  - Managing Language Servers
  - Choosing Language Servers
  - Configuring Language Servers
    - Nested objects
    - Possible configuration options
  - Enabling or Disabling Language Servers
- Formatting and Linting
  - Configuring Formatters
  - Setting Up Linters
  - Integrating Formatting and Linting
  - Troubleshooting
- Syntax Highlighting and Themes
  - Customizing Syntax Highlighting
  - Selecting and Customizing Themes
  - Using Theme Extensions
- Using Language Server Features
  - Inlay Hints
  - Code Actions
  - Go To Definition and References
  - Rename Symbol
  - Hover Information
  - Workspace Symbol Search
  - Code Completion
  - Diagnostics
- Configuring supported languages
- Language-specific Settings
- File Associations
- Working with Language Servers
  - What are Language Servers?
  - Managing Language Servers
  - Choosing Language Servers
  - Configuring Language Servers
    - Nested objects
    - Possible configuration options
  - Enabling or Disabling Language Servers
- Formatting and Linting
  - Configuring Formatters
  - Setting Up Linters
  - Integrating Formatting and Linting
  - Troubleshooting
- Syntax Highlighting and Themes
  - Customizing Syntax Highlighting
  - Selecting and Customizing Themes
  - Using Theme Extensions
- Using Language Server Features
  - Inlay Hints
  - Code Actions
  - Go To Definition and References
  - Rename Symbol
  - Hover Information
  - Workspace Symbol Search
  - Code Completion
  - Diagnostics
- Configuring Zed
- Settings files
- Default settings
- Settings
- Active Pane Modifiers
  - Magnification
  - Border size
  - Inactive Opacity
- Bottom Dock Layout
- Auto Install extensions
- Autosave
- Restore on Startup
- Autoscroll on Clicks
- Auto Update
- Base Keymap
- Buffer Font Family
- Buffer Font Features
- Buffer Font Fallbacks
- Buffer Font Size
- Buffer Font Weight
- Buffer Line Height
- Confirm Quit
- Centered Layout
- Direnv Integration
- Edit Predictions
  - Disabled Globs
- Edit Predictions Disabled in
- Current Line Highlight
- Selection Highlight
- LSP Highlight Debounce
- Cursor Blink
- Cursor Shape
- Hide Mouse
- Snippet Sort Order
- Editor Scrollbar
  - Show Mode
  - Cursor Indicators
  - Git Diff Indicators
  - Search Results Indicators
  - Selected Text Indicators
  - Selected Symbols Indicators
  - Diagnostics
  - Axes
    - Horizontal
    - Vertical
- Editor Tab Bar
  - Show
  - Navigation History Buttons
  - Tab Bar Buttons
- Editor Tabs
  - Close Position
  - File Icons
  - Git Status
  - Activate on close
  - Show close button
  - Show Diagnostics
- Editor Toolbar
- Enable Language Server
- Ensure Final Newline On Save
- LSP
- LSP Highlight Debounce
- Format On Save
- Formatter
- Code Actions On Format
- Auto close
- Always Treat Brackets As Autoclosed
- File Scan Exclusions
- File Scan Inclusions
- File Types
- Diagnostics
  - Inline Diagnostics
- Git
  - Git Gutter
  - Gutter Debounce
  - Inline Git Blame
  - Hunk Style
- Indent Guides
- Hard Tabs
- Hover Popover Enabled
- Icon Theme
  - Icon Theme Object
  - Mode
  - Dark
  - Light
- Inlay hints
- Journal
  - Path
  - Hour Format
- Languages
- Network Proxy
- Preview tabs
  - Enable preview from file finder
  - Enable preview from code navigation
- File Finder
  - File Icons
  - Modal Max Width
  - Skip Focus For Active In Search
- Preferred Line Length
- Projects Online By Default
- Remove Trailing Whitespace On Save
- Search
- Seed Search Query From Cursor
- Use Smartcase Search
- Show Call Status Icon
- Completions
  - Words
  - LSP
  - LSP Fetch Timeout \(ms\)
  - LSP Insert Mode
- Show Completions On Input
- Show Completion Documentation
- Show Edit Predictions
- Show Whitespaces
- Soft Wrap
- Wrap Guides \(Vertical Rulers\)
- Tab Size
- Telemetry
  - Diagnostics
  - Metrics
- Terminal
  - Terminal: Dock
  - Terminal: Alternate Scroll
  - Terminal: Blinking
  - Terminal: Copy On Select
  - Terminal: Env
  - Terminal: Font Size
  - Terminal: Font Family
  - Terminal: Font Features
  - Terminal: Line Height
  - Terminal: Option As Meta
  - Terminal: Shell
- Terminal: Detect Virtual Environments
- Terminal: Toolbar
  - Terminal: Button
  - Terminal: Working Directory
- Theme
  - Theme Object
  - Mode
  - Dark
  - Light
- Vim
- Project Panel
  - Dock
  - Entry Spacing
  - Git Status
  - Default Width
  - Auto Reveal Entries
  - Auto Fold Dirs
  - Indent Size
  - Indent Guides: Show
  - Scrollbar: Show
- Assistant Panel
- Outline Panel
- Calls
- Unnecessary Code Fade
- UI Font Family
- UI Font Features
- UI Font Fallbacks
- UI Font Size
- UI Font Weight
- An example configuration:
- Developing Zed
- Keychain access
- Contributor links
- Environment Variables
- Where does Zed get its environment variables from?
  - Launched from the CLI
  - Launched via window manager, Dock, or launcher
- Where and how are environment variables used?
  - Tasks
  - Built-in terminal
  - Look-up of language servers
  - Language servers
- Extensions
- Getting Started
- Download Zed
  - macOS
  - Linux
- Command Palette
- Configure Zed
- Set up your key bindings
- Git
- Git Panel
- Project Diff
- Fetch, push, and pull
- Staging Workflow
  - Using the Project Diff
  - Using the Git Panel
- Committing
  - Undoing a Commit
- AI Support in Git
- Git Integrations
- Action Reference
- Icon Themes
- Selecting an Icon Theme
- Installing more Icon Themes
- Configuring Icon Themes
- Icon Theme Development
- Key bindings
- Predefined keymaps
- User keymaps
  - Keybinding syntax
  - Contexts
  - Actions
  - Precedence
  - Non-QWERTY keyboards
- Tips and tricks
  - Disabling a binding
  - Remapping keys
  - Forward keys to terminal
  - Task Key bindings
- Language Support in Zed
- Languages with Documentation
- Additional Community Language Extensions
- Zed on Linux
- Standard Installation
- Other ways to install Zed on Linux
  - Installing via a package manager
  - Downloading manually
- Uninstalling Zed
  - Standard Uninstall
  - Package Manager
- Troubleshooting
  - Zed fails to start
  - Graphics issues
  - Zed fails to open windows
  - I can't open any files
  - Clicking links isn't working
  - Zed isn't remembering my API keys
  - Zed isn't remembering my login
  - Could not start inotify
  - No sound or wrong output device
- Zed Model Improvement
- Zed Assistant
- Zed Edit Predictions
  - Opt-in
  - Exclusions
  - Data we collect
  - Data Handling
  - Model Output
- Applicable terms
- Multibuffers
- Editing in a multibuffer
- Navigating to the Source File
- Project search
- Diagnostics
- Find References
- Outline Panel
- Usage with multibuffers
  - Project Search Results
  - Project Diagnostics
  - Find All References
- Remote Development
- Overview
- Setup
- Supported platforms
- Configuration
- Port forwarding
- Zed settings
- Initializing the remote server
- Maintaining the SSH connection
- Supported SSH Options
- Known Limitations
- Feedback
- REPL
- Getting started
- Installation
- Using the REPL
  - Cell mode
- Language specific instructions
  - Python
    - Global environment
    - Conda Environment
    - Virtualenv with pip
  - R \(Ark Kernel\)
  - R \(Xeus Kernel\)
  - Typescript: Deno
  - Julia
  - Scala
- Changing which kernel is used per language
- Debugging Kernelspecs
- Snippets
- Example configuration
- Scopes
- Known Limitations
- See also
- System Requirements
- Apple
  - macOS
  - Mac Hardware
- Linux
- Windows
- Web
- Tasks
- Task templates
- Variables
  - Variable Quoting
- Oneshot tasks
  - Ephemeral tasks
- Custom keybindings for tasks
- Binding runnable tags to task templates
- Keybindings to run tasks bound to runnables
- Telemetry in Zed
- Configuring Telemetry Settings
- Dataflow
- Types of Telemetry
  - Diagnostics
  - Usage Data \(Metrics\)
- Concerns and Questions
- Themes
- Selecting a Theme
- Installing more Themes
- Configuring a Theme
- Theme Overrides
- Local Themes
- Theme Development
- Vim Mode
- Zed's vim mode design
  - Core differences
- Enabling and disabling vim mode
- Zed-specific features
  - Language server
  - Git
  - Treesitter
  - Multi cursor
  - Pane management
  - In insert mode
  - Supported plugins
  - Any Bracket Functionality
    - Included Characters
    - AnyQuotes and AnyBrackets \(Traditional Vim behavior\)
    - MiniQuotes and MiniBrackets \(mini.ai behavior\)
    - Choosing Between Approaches
    - Example Configuration
- Command palette
  - File and window management
  - Ex commands
  - Navigating diagnostics
  - Git
  - Jump
  - Replacement
  - Editing
  - Set
  - Command mnemonics
- Customizing key bindings
  - Selecting the correct context
  - Useful contexts for vim mode key bindings
  - Optional key bindings
  - Restoring common text editing keybindings
- Changing vim mode settings
- Useful core Zed settings for vim mode
- Regex differences
- Zed on Windows
- Workspace Persistence
- Assistant Panel
  - Interacting with the Assistant
  - Editing a Context
- Assistant
- Assistant Commands
- Overview
  - Other Commands:
- `/default`
- `/diagnostics`
- `/file`
- `/now`
- `/prompt`
- `/symbols`
- `/tab`
- `/terminal`
- `/selection`
- Extensibility
- Configuring the Assistant
- Providers
  - Zed AI
  - Anthropic
    - Anthropic Custom Models
  - GitHub Copilot Chat
  - Google AI
    - Google AI custom models
  - Ollama
    - Ollama Context Length
  - OpenAI
    - OpenAI Custom Models
  - DeepSeek
    - DeepSeek Custom Models
  - OpenAI API Compatible
    - X.ai Grok
  - LM Studio
- Advanced Configuration
  - Custom Endpoints
  - Configuring Models
    - Feature-specific Models
  - Configuring Alternative Models for Inline Assists
- Common Panel Settings
- General Configuration Example
- Context Servers
- Installation
- Configuration
- Introducing Contexts
  - Saving and Loading Contexts
  - Viewing Past Contexts
- Inline Assistant
- Using the Inline Assistant
- Using Prompts &amp; Commands
  - Example Recipe - Fixing Errors with the Inline Assistant
- Prefilling Prompts
- Model Context Protocol
- Try it out
- Bring your own context server
- Prompting &amp; Prompt Library
- Using Prompts
- Prompt Library
  - Opening the Prompt Library
  - Managing Prompts
- Creating a Prompt
- Editing the Default Prompt
- Commands in Prompts
  - Example:
- Nesting Prompts
  - Example:
- Advanced Concepts
  - Prompt Templates
  - Overriding Templates
- Using a debugger
- Build profile considerations
- GDB/LLDB
  - Background
  - Usage with Zed
    - Running Zed with a Debugger
    - Debugging Panics and Crashes
- Debugging Crashes
- Crashes
- Panics
- Using a Debugger
- Building Zed for Linux
- Repository
- Dependencies
- Backend dependencies
- Building from source
- Installing a development build
- Wayland &amp; X11
- Notes for packaging Zed
  - Technical requirements
  - Other things to note
- Flatpak
- Memory profiling
- Troubleshooting
  - Cargo errors claiming that a dependency is using unstable features
  - Vulkan/GPU issues
- Local Collaboration
- Database setup
  - On macOS and Linux
  - On Windows
- Testing collaborative features locally
  - On macOS and Linux
  - On Windows
- Running a local collab server
- Building Zed for macOS
- Repository
- Dependencies
- Building Zed from Source
- Backend Dependencies
- Troubleshooting
  - Error compiling metal shaders
  - Cargo errors claiming that a dependency is using unstable features
  - Error: 'dispatch/dispatch.h' file not found
  - Tests failing due to `Too many open files (os error 24)`
- Tips &amp; Tricks
- Zed Releases
- Wednesday release process
- Patch release process
- Nightly release process
- Building Zed for Windows
- Repository
- Dependencies
- Backend dependencies
  - Notes
- Building from source
- Installing from msys2
- Troubleshooting
  - Setting `RUSTFLAGS` env var breaks builds
  - Cargo errors claiming that a dependency is using unstable features
  - `STATUS_ACCESS_VIOLATION`
  - Invalid RC path selected
  - Build fails: Path too long
- Context Servers
- Example extension
- Defining context servers
- Developing Extensions
- Extension Capabilities
- Developing an Extension Locally
- Directory Structure of a Zed Extension
- WebAssembly
- Publishing your extension
- Updating an extension
- Icon Themes
- Example extension
- Directory structure
- Installing Extensions
- Installation Location
- Auto installing
- Language Extensions
- Language Metadata
- Grammar
- Tree-sitter Queries
  - Syntax highlighting
  - Bracket matching
  - Code outline/structure
  - Auto-indentation
  - Code injections
  - Syntax overrides
    - Range inclusivity
  - Text objects
  - Text redactions
  - Runnable code detection
- Language Servers
- Slash Commands
- Example extension
- Defining slash commands
- Implementing slash command behavior
- Auto-completing slash command arguments
- Themes
- Theme JSON Structure
- Ansible
- Setup
  - File detection
  - LSP Configuration
- AsciiDoc
- Astro
- Bash
- Configuration
  - Install `shellcheck`:
  - See also:
- Biome
- Biome Language Support
- Configuration
- C
- Clangd: Force detect as C
- Formatting
- Compile Commands
  - CMake Compile Commands
- Clojure
- C++
- Binary
- Arguments
- Formatting
- More server configuration
- Compile Commands
  - CMake Compile Commands
- C
- Configuration
- CSS
- See also:
- Dart
- Pre-requisites
- Configuration
  - Formatting
- Deno
- Deno Configuration
- See also:
- Diff
- Configuration
- Docker
- Docker Compose
- Dockerfile
- Elixir
- Choosing a language server
- Setting up `elixir-ls`
  - Formatting with Mix
  - Additional workspace configuration options
  - HEEx
- Elm
- Setup
- Configuring `elm-language-server`
- Emmet
- Erlang
- Choosing a language server
- See also:
- Fish
- GDScript
- Setup
- Usage
- Gleam
- GLSL
- Go
- Setup
- Inlay Hints
- Go Mod
- Go Sum
- Go Work
- Groovy
- Haskell
- Installing HLS
- Configuring HLS
- Helm
- Setup
- HTML
- Formatting
  - LSP Formatting
- See also:
- Java
- Install OpenJDK
- Extension Install
- Settings / Initialization Options
  - Zed Java Settings
  - Java with Eclipse JDTLS settings
- Example Configs
  - Zed Java Initialization Options
  - Java with Eclipse JTDLS Configuration
- Manual JDTLS Install
- See also
- Support
- JavaScript
- Code formatting
- JSX
- JSDoc
- ESLint
  - Configure ESLint's `nodePath`:
  - Configure ESLint's `problems`:
  - Configure ESLint's `rulesCustomizations`:
  - Configure ESLint's `workingDirectory`:
- See also
- JSON
- JSONC
- JSONC Prettier Formatting
- JSON Language Server
  - Inline Schema Specification
  - Schema Specification via Settings
- Jsonnet
- Configuration
- Julia
- Kotlin
- Configuration
- Lua
- luarc.json
  - LuaCATS Definitions
  - LÖVE \(Love2D\)
  - PlaydateSDK
  - Inlay Hints
- Formatting
  - LuaLS
  - StyLua
- Luau
- Configuration
- Formatting
- Makefile
- Markdown
- Syntax Highlighting Code Blocks
- Configuration
  - Format
  - Trailing Whitespace
- Nim
- Formatting
- OCaml
- Setup Instructions
  - Using Opam
  - Launching Zed
- PHP
- Choosing a language server
- Phpactor
- Intelephense
- PHPDoc
- Prisma
- Proto
- PureScript
- Python
- Language Servers
- Virtual Environments in the Terminal
- PyLSP
- PyRight
  - PyRight Configuration
  - PyRight Settings
  - Pyright Virtual environments
  - Code formatting &amp; Linting
- R
- Installation
- Ark Installation
- Racket
- Rego
- Installation
- Configuration
- Roc
- Setup
- ReStructuredText \(rst\)
- Ruby
- Language Servers
- Configuring a language server
  - Using `solargraph`
  - Using `ruby-lsp`
  - Using `rubocop`
- Setting up `solargraph`
  - Configuration
- Setting up `ruby-lsp`
- Setting up `rubocop` LSP
- Using the Tailwind CSS Language Server with Ruby
- Running tests
  - Minitest with Rails
  - Minitest
  - RSpec
  - quickdraw
  - tldr
- Rust
- Inlay Hints
- Target directory
- Binary
- Alternate Targets
- LSP tasks
- Manual Cargo Diagnostics fetch
- More server configuration
  - Large projects and performance
  - Multi-project workspaces
  - Snippets
- Scala
- Setup
- Configuration
- Scheme
- Shell Scripts
- Settings
  - Formatting
- See also:
- Svelte
- Extra theme styling configuration
- Inlay Hints
- Swift
- Configuration
- Tailwind CSS
- Configuration
- Terraform
- Configuration
- TOML
- Configuration
- TypeScript
- Language servers
- Large projects
- Inlay Hints
- See also
- Uiua
- Vue
- XML
- Configuration
- YAML
- Configuration
- Formatting
  - Prettier Formatting
  - yaml-language-server Formatting
- Schemas
- Custom Tags
- Yara
- Yarn
- Setup
- Zig
<!-- /MarkdownTOC -->
 </details>
</div>

## Accounts

Signing in to Zed is not a requirement. You can use most features you'd expect in a code editor without ever doing so. We'll outline the few features that do require signing in, and how to do so, here.

## What Features Require Signing In?

1. All real-time collaboration features
2. If you are using Zed as the provider of your LLM models. Alternatively, you can bring and configure your own API keys

## Signing In

Zed uses GitHub's OAuth flow to authenticate users, requiring only the `read:user` GitHub scope, which grants read-only access to your GitHub profile information.

1. Open Zed and click the `Sign In` button in the top-right corner of the window, or run the `client: sign in` command from the command palette (`cmd-shift-p` on macOS or `ctrl-shift-p` on Windows/Linux).
2. Your default web browser will open to the Zed sign-in page.
3. Authenticate with your GitHub account when prompted.
4. After successful authentication, your browser will display a confirmation, and you'll be automatically signed in to Zed.

**Note**: If you're behind a corporate firewall, ensure that connections to `zed.dev` and `collab.zed.dev` are allowed.

## Signing Out

To sign out of Zed, you can use either of these methods:

- Click on the profile icon in the upper right corner and select `Sign Out` from the dropdown menu.
- Open the command palette and run the `client: sign out` command.

System RequirementsLinux

Additional Learning Materials - Zed

## Additional Learning Materials

- Text Manipulation Kung Fu for the Aspiring Black Belt

Workspace PersistenceConfiguring Zed

Channels - Zed

## Channels

At Zed we believe that great things are built by great people working together. We have designed Zed to help every individual work faster and to help teams of people work together more effectively.

### Overview

Channels provide a way to streamline collaborating for software engineers in many ways, but particularly:

- Pairing – when working on something together, you both have your own screen, mouse, and keyboard.
- Mentoring – it’s easy to jump in to someone else’s context, and help them get unstuck, without the friction of pushing code up.
- Refactoring – you can have multiple people join in on large refactoring without fear of conflict.
- Ambient awareness – you can see what everyone else is working on with no need for status emails or meetings.

### Channels

To open the collaboration panel hit `cmd-shift-c` (or `cmd-shift-p “collab panel: toggle focus”`).

!

Each channel corresponds to an ongoing project or work-stream. You can see who’s in a channel as their avatars will show up in the sidebar. This makes it easy to see what everyone is doing and where to find them if needed.

You can create as many channels as you need. As in the example above, you can mix channels for your day job, as well as side-projects in one instance of Zed.

Joining a channel adds you to a shared room where you can work on projects together.

### Sharing projects

After joining a channel, you can `Share` a project with the other people there. This will enable them to edit the code hosted on your machine as though they had it checked out locally.

!

When you are editing someone else’s project, you still have the full power of the editor at your fingertips, you can jump to definitions, use the AI assistant, and see any diagnostic errors. This is extremely powerful for pairing, as one of you can be implementing the current method while the other is reading and researching the correct solution to the next problem. And, because you have your own config running, it feels like you’re using your own machine.

See our collaboration documentation

### Notes

Each channel has a notes file associated with it to keep track of current status, new ideas, or to collaborate on building out the design for the feature that you’re working on before diving into code.

!

This is similar to a Google Doc, except powered by Zed's collaborative software and persisted to our servers.

### Chat

The chat is also there for quickly sharing context without a microphone, getting questions answered, or however else you'd want to use a chat channel.

### Inviting people

By default, channels you create can only be accessed by you. You can invite collaborators by right clicking and selecting `Manage members`.

When you have channels nested under each other, permissions are inherited. For instance, in the example above, we only need to add people to the `#zed` channel, and they will automatically gain access to `#core-editor`, `#new-languages`, and `#stability`.

Once you have added someone, they can either join your channel by clicking on it in their Zed sidebar, or you can share the link to the channel so that they can join directly.

### Livestreaming &amp; Guests

A Channel can also be made Public. This allows anyone to join the channel by clicking on the link.

Guest users in channels can hear and see everything that is happening, and have read only access to projects and channel notes. They can use the Chat as normal.

If you'd like to invite a guest to participate in a channel for the duration of a call you can do so by right clicking on them in the Collaboration Panel. "Allowing Write Access" will allow them to edit any projects shared into the call, and to use their microphone and share their screen if they wish.

Code CompletionsCollaboration

Collaboration - Zed

## Collaboration

Only collaborate with people that you trust. Since sharing a project gives them access to your local file system, you should not share projects with people you do not trust; they could potentially do some nasty things.

In the future, we will do more to prevent this type of access beyond the shared project and add more control over what collaborators can do, but for now, only collaborate with people you trust.

## Add Collaborator

Before you can collaborate, you'll need to add a collaborator to your contacts. To do this:

1. Open the contacts menu by clicking on the `Show contacts menu` button in the upper right-hand corner of the window or by running `collab: toggle contacts menu` (`cmd-shift-c`).
2. Click the add button to the right of the search box.
3. Search for the contact you want to add using their GitHub handle. Note: the person you are trying to add as a contact must be an existing Zed user.

### Inviting a collaborator

You can add an existing Zed user as a contact from the contacts menu, deployed from the `Show contacts menu` button in the upper right-hand corner of the window or by `collab: toggle contacts menu` (`cmd-shift-c`) and then clicking the `Search for new contact` button to the right of the search box.

!Inviting a collaborator to the current project

When you invite a collaborator to a project not in a call they will receive a notification to join, and a new call is created.

!Receiving an invite to join a call

### Inviting non-Zed users

If someone you want to collaborate with has not yet signed up for Zed, they will need to download the app

### Voice chat

When joining a call, Zed will automatically share your microphone with other users in the call, if your OS allows it. This isn't tied to your project. You can disable this for your client via the `mute_on_join`

## Collaborating on a project

### Share a project

When you invite a collaborator to join your project, a new call begins. Your Zed windows will show the call participants in the title bar of the window.

!A new Zed call with two collaborators

Collaborators in the same project as you are in color, and have a cursor color. Collaborators in other projects are shown in gray. Collaborators that have access to the current project will have their own cursor color under their avatar.

We aim to eliminate the distinction between local and remote projects as much as possible. Collaborators can open, edit, and save files, perform searches, interact with the language server, etc. Guests have a read-only view of the project, including access to language server info.

#### Unshared Projects

If a collaborator is currently in a project that is not shared, you will not be able to jump to their project or follow them until they either share the project or return to a project that is shared.

If you are in a project that isn't shared, others will not be able to join it or see its contents.

### Follow a collaborator

To follow a collaborator, click on their avatar in the top right of the window. You can also cycle through collaborators using `workspace: follow next collaborator` (`ctrl-alt-cmd-f`).

When you join a project, you'll immediately start following the collaborator that invited you.

!Automatically following the person inviting us to a project

When you are in a pane that is following a collaborator, you will:

- follow their cursor and scroll position
- follow them to other files in the same project
- instantly swap to viewing their screen in that pane, if they are sharing their screen and leave the project

If you move your cursor or make an edit in that pane, you will stop following.

To start following again, you can click on a collaborator's avatar or cycle through following different participants by pressing `workspace: follow next collaborator` (`ctrl-alt-cmd-f`).

#### How do?

Following is confined to a particular pane. When a pane is following a collaborator, it is outlined in their cursor color.

This pane-specific behavior allows you to follow someone in one pane while navigating independently in another and can be an effective layout for some collaboration styles.

### Screen Sharing

Share your screen with collaborators in the current call by clicking on the `Share screen` button in the top right of the window.

Collaborators will see your screen if they are following you and you start viewing a window outside Zed or a project that is not shared.

Collaborators can see your entire screen when you are screen sharing, so be careful not to share anything you don't want to share. Remember to stop screen sharing when you are finished.

Call participants can open a dedicated tab for your screen share by opening the contacts menu in the top right and clicking on the `Screen` entry if you are sharing your screen.

### Adding a project

You can add a project to a call by clicking on the `Share` button next to the project name in the title bar.

### Removing a project

You can remove a project from a call by clicking on the `Unshare` button next to the project name in the title bar.

Collaborators that are currently in that project will be disconnected from the project and will not be able to rejoin it unless you share it again.

### Following a collaborator's terminal

You can follow what a collaborator is doing in their terminal by having them share their screen and following it.

In the future, we plan to allow you to collaborate in the terminal directly in a shared project.

### Leave call

You can leave a call by opening the contacts menu in the top right and clicking on the `Leave call` button.

ChannelsGit

Code Completions - Zed

## Completions

Zed supports two sources for completions:

1. "Code Completions" provided by Language Servers (LSPs) automatically installed by Zed or via Zed Language Extensions
2. "Edit Predictions" provided by Zed's own Zeta model or by external providers like GitHub Copilot or Supermaven

## Language Server Code Completions

When there is an appropriate language server available, Zed will provide completions of variable names, functions, and other symbols in the current file. You can disable these by adding the following to your Zed `settings.json` file:

```json
"show_completions_on_input": false
```

You can manually trigger completions with `ctrl-space` or by triggering the `editor::ShowCompletions` action from the command palette.

For more information, see:

- Configuring Supported Languages
- List of Zed Supported Languages

## Edit Predictions

Zed has built-in support for predicting multiple edits at a time via Zeta

### Configuring Zeta

Zed's Edit Prediction was initially introduced via a banner on the title bar. Clicking on it would take you to a modal with a button ("Enable Edit Prediction") that sets `zed` as your `edit_prediction_provider`.

!Onboarding banner and modal

But, if you haven't come across the banner, Zed's Edit Prediction is the default edit prediction provider and you should see it right away in your status bar.

### Switching Modes

Zed's Edit Prediction comes with two different display modes:

1. `eager` (default): predictions are displayed inline as long as it doesn't conflict with language server completions
2. `subtle`: predictions only appear inline when holding a modifier key (`alt` by default)

Toggle between them via the `mode` key:

```json
"edit_predictions": {
  "mode": "eager" | "subtle"
},
```

Or directly via the UI through the status bar menu:

!Edit Prediction status bar menu, with the modes toggle.

### Conflict With Other `tab` Actions

By default, when `tab` would normally perform a different action, Zed requires a modifier key to accept predictions:

1. When the language server completions menu is visible.
2. When your cursor isn't at the right indentation level.

In these cases, `alt-tab` is used instead to accept the prediction. When the language server completions menu is open, holding `alt` first will cause it to temporarily disappear in order to preview the prediction within the buffer.

On Linux, `alt-tab` is often used by the window manager for switching windows, so `alt-l` is provided as the default binding for accepting predictions. `tab` and `alt-tab` also work, but aren't displayed by default.

`editor: accept partial edit prediction` (`ctrl-cmd-right|alt-right`) can be used to accept the current edit prediction up to the next word boundary.

See the Configuring GitHub Copilot and Configuring Supermaven

## Configuring Edit Prediction Keybindings

By default, `tab` is used to accept edit predictions. You can use another keybinding by inserting this in your keymap:

```json
{
  "context": "Editor && edit_prediction",
  "bindings": {
    // Here we also allow `alt-enter` to accept the prediction
    "alt-enter": "editor::AcceptEditPrediction"
  }
}
```

When there's a conflict with the `tab` key

```json
{
  "context": "Editor && edit_prediction_conflict",
  "bindings": {
    "ctrl-enter": "editor::AcceptEditPrediction" // Example of a modified keybinding
  }
}
```

If your keybinding contains a modifier (`ctrl` in the example above), it will also be used to preview the edit prediction and temporarily hide the language server completion menu.

You can also bind this action to keybind without a modifier. In that case, Zed will use the default modifier (`alt`) to preview the edit prediction.

```json
{
  "context": "Editor && edit_prediction_conflict",
  "bindings": {
    // Here we bind tab to accept even when there's a language server completion
    // or the cursor isn't at the correct indentation level
    "tab": "editor::AcceptEditPrediction"
  }
}
```

To maintain the use of the modifier key for accepting predictions when there is a language server completions menu, but allow `tab` to accept predictions regardless of cursor position, you can specify the context further with `showing_completions`:

```json
{
  "context": "Editor && edit_prediction_conflict && !showing_completions",
  "bindings": {
    // Here we don't require a modifier unless there's a language server completion
    "tab": "editor::AcceptEditPrediction"
  }
}
```

### Keybinding Example: Always Use Alt-Tab

The keybinding example below causes `alt-tab` to always be used instead of sometimes using `tab`. You might want this in order to have just one keybinding to use for accepting edit predictions, since the behavior of `tab` varies based on context.

```json
  {
    "context": "Editor && edit_prediction",
    "bindings": {
      "alt-tab": "editor::AcceptEditPrediction"
    }
  },
  // Bind `tab` back to its original behavior.
  {
    "context": "Editor",
    "bindings": {
      "tab": "editor::Tab"
    }
  },
  {
    "context": "Editor && showing_completions",
    "bindings": {
      "tab": "editor::ComposeCompletion"
    }
  },
```

If `"vim_mode": true` is set within `settings.json`, then additional bindings are needed after the above to return `tab` to its original behavior:

```json
  {
    "context": "(VimControl && !menu) || vim_mode == replace || vim_mode == waiting",
    "bindings": {
      "tab": "vim::Tab"
    }
  },
  {
    "context": "vim_mode == literal",
    "bindings": {
      "tab": "vim::Literal", "tab", "\u0009"
    }
  },
```

### Keybinding Example: Displaying Tab and Alt-Tab on Linux

While `tab` and `alt-tab` are supported on Linux, `alt-l` is displayed instead. If your window manager does not reserve `alt-tab`, and you would prefer to use `tab` and `alt-tab`, include these bindings in `keymap.json`:

```json
  {
    "context": "Editor && edit_prediction",
    "bindings": {
      "tab": "editor::AcceptEditPrediction",
      // Optional: This makes the default `alt-l` binding do nothing.
      "alt-l": null
    }
  },
  {
    "context": "Editor && edit_prediction_conflict",
    "bindings": {
      "alt-tab": "editor::AcceptEditPrediction",
      // Optional: This makes the default `alt-l` binding do nothing.
      "alt-l": null
    }
  },
```

### Missing keybind

Zed requires at least one keybinding for the `editor: accept edit prediction` action in both the `Editor && edit_prediction` and `Editor && edit_prediction_conflict` contexts (learn more above.

If you have previously bound the default keybindings to different actions in the global context, you will not be able to preview or accept edit predictions. For example:

```json
// Your keymap
{
  "bindings": {
    // Binds `alt-tab` to a different action globally
    "alt-tab": "menu::SelectNext"
  }
}
```

To fix this, you can specify your own keybinding for accepting edit predictions:

```json
// ...
{
  "context": "Editor && edit_prediction_conflict",
  "bindings": {
    "alt-l": "editor::AcceptEditPrediction"
  }
}
```

If you would like to use the default keybinding, you can free it up by either moving yours to a more specific context or changing it to something else.

## Disabling Automatic Edit Prediction

There are different levels in which you can disable edit predictions to be displayed, including not having it turned on at all.

Alternatively, if you have Zed set as your provider, consider using Subtle Mode

### On Buffers

To not have predictions appear automatically as you type, set this within `settings.json`:

```json
{
  "show_edit_predictions": false
}
```

This hides every indication that there is a prediction available, regardless of the display mode

### For Specific Languages

To not have predictions appear automatically as you type when working with a specific language, set this within `settings.json`:

```json
{
  "language": {
    "python": {
      "show_edit_predictions": false
    }
  }
}
```

### Turning Off Completely

To completely turn off edit prediction across all providers, explicitly set the settings to `none`, like so:

```json
"features": {
  "edit_prediction_provider": "none"
},
```

## Configuring GitHub Copilot

To use GitHub Copilot as your provider, set this within `settings.json`:

```json
{
  "features": {
    "edit_prediction_provider": "copilot"
  }
}
```

You should be able to sign-in to GitHub Copilot by clicking on the Copilot icon in the status bar and following the setup instructions.

Copilot can provide multiple completion alternatives, and these can be navigated with the following actions:

- `editor: next edit prediction` (`alt-tab|alt-`): To cycle to the next edit prediction
- `editor: previous edit prediction` (`alt-shift-tab|alt-`): To cycle to the previous edit prediction

## Configuring Supermaven

To use Supermaven as your provider, set this within `settings.json`:

```json
{
  "features": {
    "edit_prediction_provider": "supermaven"
  }
}
```

You should be able to sign-in to Supermaven by clicking on the Supermaven icon in the status bar and following the setup instructions.

## See also

You may also use the Assistant Panel or the Inline Assistant to interact with language models, see the assistant documentation

Outline PanelChannels

Configuring Languages - Zed

## Configuring supported languages

Zed offers powerful customization options for each programming language it supports. This guide will walk you through the various ways you can tailor your coding experience to your preferences and project requirements.

Zed's language support is built on two main technologies:

1. Tree-sitter: This handles syntax highlighting and structure-based features like the outline panel.
2. Language Server Protocol (LSP): This provides semantic features such as code completion and diagnostics.

These components work together to provide Zed's language capabilities.

In this guide, we'll cover:

- Language-specific settings
- File associations
- Working with language servers
- Formatting and linting configuration
- Customizing syntax highlighting and themes
- Advanced language features

By the end of this guide, you should know how to configure and customize supported languages in Zed.

For a comprehensive list of languages supported by Zed and their specific configurations, see our Supported Languages page. To go further, you could explore developing your own extensions to add support for additional languages or enhance existing functionality. For more information on creating language extensions, see our Language Extensions

## Language-specific Settings

Zed allows you to override global settings for individual languages. These custom configurations are defined in your `settings.json` file under the `languages` key.

Here's an example of language-specific settings:

```json
"languages": {
  "Python": {
    "tab_size": 4,
    "formatter": "language_server",
    "format_on_save": "on"
  },
  "JavaScript": {
    "tab_size": 2,
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": "--stdin-filepath", "{buffer_path}"
      }
    }
  }
}
```

You can customize a wide range of settings for each language, including:

- `tab_size`
- `formatter`
- `format_on_save`
- `enable_language_server`
- `hard_tabs`
- `preferred_line_length`
- `soft_wrap`
- `show_completions_on_input`
- `show_completion_documentation`

These settings allow you to maintain specific coding styles across different languages and projects.

## File Associations

Zed automatically detects file types based on their extensions, but you can customize these associations to fit your workflow.

To set up custom file associations, use the `file_types`

```json
"file_types": {
  "C++": "c"
  "TOML": "MyLockFile"
  "Dockerfile": "Dockerfile*"
}
```

This configuration tells Zed to:

- Treat `.c` files as C++ instead of C
- Recognize files named "MyLockFile" as TOML
- Apply Dockerfile syntax to any file starting with "Dockerfile"

You can use glob patterns for more flexible matching, allowing you to handle complex naming conventions in your projects.

## Working with Language Servers

Language servers are a crucial part of Zed's intelligent coding features, providing capabilities like auto-completion, go-to-definition, and real-time error checking.

### What are Language Servers?

Language servers implement the Language Server Protocol (LSP), which standardizes communication between the editor and language-specific tools. This allows Zed to support advanced features for multiple programming languages without implementing each feature separately.

Some key features provided by language servers include:

- Code completion
- Error checking and diagnostics
- Code navigation (go to definition, find references)
- Code actions (Rename, extract method)
- Hover information
- Workspace symbol search

### Managing Language Servers

Zed simplifies language server management for users:

1. Automatic Download: When you open a file with a matching file type, Zed automatically downloads the appropriate language server. Zed may prompt you to install an extension for known file types.
2. Storage Location:

   - macOS: `~/Library/Application Support/Zed/languages`
   - Linux: `$XDG_DATA_HOME/languages`, `$FLATPAK_XDG_DATA_HOME/languages`, or `$HOME/.local/share`

3. Automatic Updates: Zed keeps your language servers up-to-date, ensuring you always have the latest features and improvements.

### Choosing Language Servers

Some languages in Zed offer multiple language server options. You might have multiple extensions installed that bundle language servers targeting the same language, potentially leading to overlapping capabilities. To ensure you get the functionality you prefer, Zed allows you to prioritize which language servers are used and in what order.

You can specify your preference using the `language_servers` setting:

```json
  "languages": {
    "PHP": {
      "language_servers": "intelephense", "!phpactor", "..."
    }
  }
```

In this example:

- `intelephense` is set as the primary language server
- `phpactor` is disabled (note the `!` prefix)
- `...` expands to the rest of the language servers that are registered for PHP

This configuration allows you to tailor the language server setup to your specific needs, ensuring that you get the most suitable functionality for your development workflow.

### Configuring Language Servers

Many language servers accept custom configuration options. You can set these in the `lsp` section of your `settings.json`:

```json
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "check": {
          "command": "clippy"
        }
      }
    }
  }
```

This example configures the Rust Analyzer to use Clippy for additional linting when saving files.

#### Nested objects

When configuring language server options in Zed, it's important to use nested objects rather than dot-delimited strings. This is particularly relevant when working with more complex configurations. Let's look at a real-world example using the TypeScript language server:

Suppose you want to configure the following settings for TypeScript:

- Enable strict null checks
- Set the target ECMAScript version to ES2020

Here's how you would structure these settings in Zed's `settings.json`:

```json
"lsp": {
  "typescript-language-server": {
    "initialization_options": {
      // These are not supported (VSCode dotted style):
      // "preferences.strictNullChecks": true,
      // "preferences.target": "ES2020"
      //
      // These is correct (nested notation):
      "preferences": {
        "strictNullChecks": true,
        "target": "ES2020"
      },
    }
  }
}
```

#### Possible configuration options

Depending on how a particular language server is implemented, they may depend on different configuration options, both specified in the LSP.

- initializationOptions

Sent once during language server startup, requires server's restart to reapply changes.

For example, rust-analyzer and clangd rely on this way of configuring only.

```json
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "checkOnSave": false
      }
    }
  }
```

- Configuration Request

May be queried by the server multiple times. Most of the servers would rely on this way of configuring only.

```json
"lsp": {
  "tailwindcss-language-server": {
    "settings": {
      "tailwindCSS": {
        "emmetCompletions": true,
      },
    }
  }
}
```

Apart of the LSP-related server configuration options, certain servers in Zed allow configuring the way binary is launched by Zed.

Languages mention in the documentation, whether they support it or not and their defaults for the configuration values:

```json
  "languages": {
    "Markdown": {
      "binary": {
        // Whether to fetch the binary from the internet, or attempt to find locally.
        "ignore_system_version": false,
        "path": "/path/to/langserver/bin",
        "arguments": "--option", "value"
        "env": {
          "FOO": "BAR"
        }
      }
    }
  }
```

### Enabling or Disabling Language Servers

You can toggle language server support globally or per-language:

```json
  "languages": {
    "Markdown": {
      "enable_language_server": false
    }
  }
```

This disables the language server for Markdown files, which can be useful for performance in large documentation projects. You can configure this globally in your `~/.zed/settings.json` or inside a `.zed/settings.json` in your project directory.

## Formatting and Linting

Zed provides support for code formatting and linting to maintain consistent code style and catch potential issues early.

### Configuring Formatters

Zed supports both built-in and external formatters. Configure formatters globally or per-language in your `settings.json`:

```json
"languages": {
  "JavaScript": {
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": "--stdin-filepath", "{buffer_path}"
      }
    },
    "format_on_save": "on"
  },
  "Rust": {
    "formatter": "language_server",
    "format_on_save": "on"
  }
}
```

This example uses Prettier for JavaScript and the language server's formatter for Rust, both set to format on save.

To disable formatting for a specific language:

```json
"languages": {
  "Markdown": {
    "format_on_save": "off"
  }
}
```

### Setting Up Linters

Linting in Zed is typically handled by language servers. Many language servers allow you to configure linting rules:

```json
"lsp": {
  "eslint": {
    "settings": {
      "codeActionOnSave": {
        "rules": "import/order"
      }
    }
  }
}
```

This configuration sets up ESLint to organize imports on save for JavaScript files.

To run linter fixes automatically on save:

```json
"languages": {
  "JavaScript": {
    "code_actions_on_format": {
      "source.fixAll.eslint": true
    }
  }
}
```

### Integrating Formatting and Linting

Zed allows you to run both formatting and linting on save. Here's an example that uses Prettier for formatting and ESLint for linting JavaScript files:

```json
"languages": {
  "JavaScript": {
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": "--stdin-filepath", "{buffer_path}"
      }
    },
    "code_actions_on_format": {
      "source.fixAll.eslint": true
    },
    "format_on_save": "on"
  }
}
```

### Troubleshooting

If you encounter issues with formatting or linting:

1. Check Zed's log file for error messages (Use the command palette: `zed: open log`)
2. Ensure external tools (formatters, linters) are correctly installed and in your PATH
3. Verify configurations in both Zed settings and language-specific config files (e.g., `.eslintrc`, `.prettierrc`)

## Syntax Highlighting and Themes

Zed offers customization options for syntax highlighting and themes, allowing you to tailor the visual appearance of your code.

### Customizing Syntax Highlighting

Zed uses Tree-sitter grammars for syntax highlighting. Override the default highlighting using the `experimental.theme_overrides` setting.

This example makes comments italic and changes the color of strings:

```json
"experimental.theme_overrides": {
  "syntax": {
    "comment": {
      "font_style": "italic"
    },
    "string": {
      "color": "#00AA00"
    }
  }
}
```

### Selecting and Customizing Themes

Change your theme:

1. Use the theme selector (`cmd-k cmd-t|ctrl-k ctrl-t`)
2. Or set it in your `settings.json`:

```json
"theme": {
  "mode": "dark",
  "dark": "One Dark",
  "light": "GitHub Light"
}
```

Create custom themes by creating a JSON file in `~/.config/zed/themes/`. Zed will automatically detect and make available any themes in this directory.

### Using Theme Extensions

Zed supports theme extensions. Browse and install theme extensions from the Extensions panel (`cmd-shift-x|ctrl-shift-x`).

To create your own theme extension, refer to the Developing Theme Extensions

## Using Language Server Features

### Inlay Hints

Inlay hints provide additional information inline in your code, such as parameter names or inferred types. Configure inlay hints in your `settings.json`:

```json
"inlay_hints": {
  "enabled": true,
  "show_type_hints": true,
  "show_parameter_hints": true,
  "show_other_hints": true
}
```

For language-specific inlay hint settings, refer to the documentation for each language.

### Code Actions

Code actions provide quick fixes and refactoring options. Access code actions using the `editor: Toggle Code Actions` command or by clicking the lightbulb icon that appears next to your cursor when actions are available.

### Go To Definition and References

Use these commands to navigate your codebase:

- `editor: Go to Definition` (`f12|f12`)
- `editor: Go to Type Definition` (`cmd-f12|ctrl-f12`)
- `editor: Find All References` (`shift-f12|shift-f12`)

### Rename Symbol

To rename a symbol across your project:

1. Place your cursor on the symbol
2. Use the `editor: Rename Symbol` command (`f2|f2`)
3. Enter the new name and press Enter

These features depend on the capabilities of the language server for each language.

When renaming a symbol that spans multiple files, Zed will open a preview in a multibuffer. This allows you to review all the changes across your project before applying them. To confirm the rename, simply save the multibuffer. If you decide not to proceed with the rename, you can undo the changes or close the multibuffer without saving.

### Hover Information

Use the `editor: Show Hover` command to display information about the symbol under the cursor. This often includes type information, documentation, and links to relevant resources.

### Workspace Symbol Search

The `workspace: Open Symbol` command allows you to search for symbols (functions, classes, variables) across your entire project. This is useful for quickly navigating large codebases.

### Code Completion

Zed provides intelligent code completion suggestions as you type. You can manually trigger completion with the `editor: Show Completions` command. Use `tab|tab` or `enter|enter` to accept suggestions.

### Diagnostics

Language servers provide real-time diagnostics (errors, warnings, hints) as you code. View all diagnostics for your project using the `diagnostics: Toggle` command.

Configuring ZedKey bindings

Configuring Languages - Zed

## Configuring supported languages

Zed offers powerful customization options for each programming language it supports. This guide will walk you through the various ways you can tailor your coding experience to your preferences and project requirements.

Zed's language support is built on two main technologies:

1. Tree-sitter: This handles syntax highlighting and structure-based features like the outline panel.
2. Language Server Protocol (LSP): This provides semantic features such as code completion and diagnostics.

These components work together to provide Zed's language capabilities.

In this guide, we'll cover:

- Language-specific settings
- File associations
- Working with language servers
- Formatting and linting configuration
- Customizing syntax highlighting and themes
- Advanced language features

By the end of this guide, you should know how to configure and customize supported languages in Zed.

For a comprehensive list of languages supported by Zed and their specific configurations, see our Supported Languages page. To go further, you could explore developing your own extensions to add support for additional languages or enhance existing functionality. For more information on creating language extensions, see our Language Extensions

## Language-specific Settings

Zed allows you to override global settings for individual languages. These custom configurations are defined in your `settings.json` file under the `languages` key.

Here's an example of language-specific settings:

```json
"languages": {
  "Python": {
    "tab_size": 4,
    "formatter": "language_server",
    "format_on_save": "on"
  },
  "JavaScript": {
    "tab_size": 2,
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": "--stdin-filepath", "{buffer_path}"
      }
    }
  }
}
```

You can customize a wide range of settings for each language, including:

- `tab_size`
- `formatter`
- `format_on_save`
- `enable_language_server`
- `hard_tabs`
- `preferred_line_length`
- `soft_wrap`
- `show_completions_on_input`
- `show_completion_documentation`

These settings allow you to maintain specific coding styles across different languages and projects.

## File Associations

Zed automatically detects file types based on their extensions, but you can customize these associations to fit your workflow.

To set up custom file associations, use the `file_types`

```json
"file_types": {
  "C++": "c"
  "TOML": "MyLockFile"
  "Dockerfile": "Dockerfile*"
}
```

This configuration tells Zed to:

- Treat `.c` files as C++ instead of C
- Recognize files named "MyLockFile" as TOML
- Apply Dockerfile syntax to any file starting with "Dockerfile"

You can use glob patterns for more flexible matching, allowing you to handle complex naming conventions in your projects.

## Working with Language Servers

Language servers are a crucial part of Zed's intelligent coding features, providing capabilities like auto-completion, go-to-definition, and real-time error checking.

### What are Language Servers?

Language servers implement the Language Server Protocol (LSP), which standardizes communication between the editor and language-specific tools. This allows Zed to support advanced features for multiple programming languages without implementing each feature separately.

Some key features provided by language servers include:

- Code completion
- Error checking and diagnostics
- Code navigation (go to definition, find references)
- Code actions (Rename, extract method)
- Hover information
- Workspace symbol search

### Managing Language Servers

Zed simplifies language server management for users:

1. Automatic Download: When you open a file with a matching file type, Zed automatically downloads the appropriate language server. Zed may prompt you to install an extension for known file types.
2. Storage Location:

   - macOS: `~/Library/Application Support/Zed/languages`
   - Linux: `$XDG_DATA_HOME/languages`, `$FLATPAK_XDG_DATA_HOME/languages`, or `$HOME/.local/share`

3. Automatic Updates: Zed keeps your language servers up-to-date, ensuring you always have the latest features and improvements.

### Choosing Language Servers

Some languages in Zed offer multiple language server options. You might have multiple extensions installed that bundle language servers targeting the same language, potentially leading to overlapping capabilities. To ensure you get the functionality you prefer, Zed allows you to prioritize which language servers are used and in what order.

You can specify your preference using the `language_servers` setting:

```json
  "languages": {
    "PHP": {
      "language_servers": "intelephense", "!phpactor", "..."
    }
  }
```

In this example:

- `intelephense` is set as the primary language server
- `phpactor` is disabled (note the `!` prefix)
- `...` expands to the rest of the language servers that are registered for PHP

This configuration allows you to tailor the language server setup to your specific needs, ensuring that you get the most suitable functionality for your development workflow.

### Configuring Language Servers

Many language servers accept custom configuration options. You can set these in the `lsp` section of your `settings.json`:

```json
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "check": {
          "command": "clippy"
        }
      }
    }
  }
```

This example configures the Rust Analyzer to use Clippy for additional linting when saving files.

#### Nested objects

When configuring language server options in Zed, it's important to use nested objects rather than dot-delimited strings. This is particularly relevant when working with more complex configurations. Let's look at a real-world example using the TypeScript language server:

Suppose you want to configure the following settings for TypeScript:

- Enable strict null checks
- Set the target ECMAScript version to ES2020

Here's how you would structure these settings in Zed's `settings.json`:

```json
"lsp": {
  "typescript-language-server": {
    "initialization_options": {
      // These are not supported (VSCode dotted style):
      // "preferences.strictNullChecks": true,
      // "preferences.target": "ES2020"
      //
      // These is correct (nested notation):
      "preferences": {
        "strictNullChecks": true,
        "target": "ES2020"
      },
    }
  }
}
```

#### Possible configuration options

Depending on how a particular language server is implemented, they may depend on different configuration options, both specified in the LSP.

- initializationOptions

Sent once during language server startup, requires server's restart to reapply changes.

For example, rust-analyzer and clangd rely on this way of configuring only.

```json
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "checkOnSave": false
      }
    }
  }
```

- Configuration Request

May be queried by the server multiple times. Most of the servers would rely on this way of configuring only.

```json
"lsp": {
  "tailwindcss-language-server": {
    "settings": {
      "tailwindCSS": {
        "emmetCompletions": true,
      },
    }
  }
}
```

Apart of the LSP-related server configuration options, certain servers in Zed allow configuring the way binary is launched by Zed.

Languages mention in the documentation, whether they support it or not and their defaults for the configuration values:

```json
  "languages": {
    "Markdown": {
      "binary": {
        // Whether to fetch the binary from the internet, or attempt to find locally.
        "ignore_system_version": false,
        "path": "/path/to/langserver/bin",
        "arguments": "--option", "value"
        "env": {
          "FOO": "BAR"
        }
      }
    }
  }
```

### Enabling or Disabling Language Servers

You can toggle language server support globally or per-language:

```json
  "languages": {
    "Markdown": {
      "enable_language_server": false
    }
  }
```

This disables the language server for Markdown files, which can be useful for performance in large documentation projects. You can configure this globally in your `~/.zed/settings.json` or inside a `.zed/settings.json` in your project directory.

## Formatting and Linting

Zed provides support for code formatting and linting to maintain consistent code style and catch potential issues early.

### Configuring Formatters

Zed supports both built-in and external formatters. Configure formatters globally or per-language in your `settings.json`:

```json
"languages": {
  "JavaScript": {
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": "--stdin-filepath", "{buffer_path}"
      }
    },
    "format_on_save": "on"
  },
  "Rust": {
    "formatter": "language_server",
    "format_on_save": "on"
  }
}
```

This example uses Prettier for JavaScript and the language server's formatter for Rust, both set to format on save.

To disable formatting for a specific language:

```json
"languages": {
  "Markdown": {
    "format_on_save": "off"
  }
}
```

### Setting Up Linters

Linting in Zed is typically handled by language servers. Many language servers allow you to configure linting rules:

```json
"lsp": {
  "eslint": {
    "settings": {
      "codeActionOnSave": {
        "rules": "import/order"
      }
    }
  }
}
```

This configuration sets up ESLint to organize imports on save for JavaScript files.

To run linter fixes automatically on save:

```json
"languages": {
  "JavaScript": {
    "code_actions_on_format": {
      "source.fixAll.eslint": true
    }
  }
}
```

### Integrating Formatting and Linting

Zed allows you to run both formatting and linting on save. Here's an example that uses Prettier for formatting and ESLint for linting JavaScript files:

```json
"languages": {
  "JavaScript": {
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": "--stdin-filepath", "{buffer_path}"
      }
    },
    "code_actions_on_format": {
      "source.fixAll.eslint": true
    },
    "format_on_save": "on"
  }
}
```

### Troubleshooting

If you encounter issues with formatting or linting:

1. Check Zed's log file for error messages (Use the command palette: `zed: open log`)
2. Ensure external tools (formatters, linters) are correctly installed and in your PATH
3. Verify configurations in both Zed settings and language-specific config files (e.g., `.eslintrc`, `.prettierrc`)

## Syntax Highlighting and Themes

Zed offers customization options for syntax highlighting and themes, allowing you to tailor the visual appearance of your code.

### Customizing Syntax Highlighting

Zed uses Tree-sitter grammars for syntax highlighting. Override the default highlighting using the `experimental.theme_overrides` setting.

This example makes comments italic and changes the color of strings:

```json
"experimental.theme_overrides": {
  "syntax": {
    "comment": {
      "font_style": "italic"
    },
    "string": {
      "color": "#00AA00"
    }
  }
}
```

### Selecting and Customizing Themes

Change your theme:

1. Use the theme selector (`cmd-k cmd-t|ctrl-k ctrl-t`)
2. Or set it in your `settings.json`:

```json
"theme": {
  "mode": "dark",
  "dark": "One Dark",
  "light": "GitHub Light"
}
```

Create custom themes by creating a JSON file in `~/.config/zed/themes/`. Zed will automatically detect and make available any themes in this directory.

### Using Theme Extensions

Zed supports theme extensions. Browse and install theme extensions from the Extensions panel (`cmd-shift-x|ctrl-shift-x`).

To create your own theme extension, refer to the Developing Theme Extensions

## Using Language Server Features

### Inlay Hints

Inlay hints provide additional information inline in your code, such as parameter names or inferred types. Configure inlay hints in your `settings.json`:

```json
"inlay_hints": {
  "enabled": true,
  "show_type_hints": true,
  "show_parameter_hints": true,
  "show_other_hints": true
}
```

For language-specific inlay hint settings, refer to the documentation for each language.

### Code Actions

Code actions provide quick fixes and refactoring options. Access code actions using the `editor: Toggle Code Actions` command or by clicking the lightbulb icon that appears next to your cursor when actions are available.

### Go To Definition and References

Use these commands to navigate your codebase:

- `editor: Go to Definition` (`f12|f12`)
- `editor: Go to Type Definition` (`cmd-f12|ctrl-f12`)
- `editor: Find All References` (`shift-f12|shift-f12`)

### Rename Symbol

To rename a symbol across your project:

1. Place your cursor on the symbol
2. Use the `editor: Rename Symbol` command (`f2|f2`)
3. Enter the new name and press Enter

These features depend on the capabilities of the language server for each language.

When renaming a symbol that spans multiple files, Zed will open a preview in a multibuffer. This allows you to review all the changes across your project before applying them. To confirm the rename, simply save the multibuffer. If you decide not to proceed with the rename, you can undo the changes or close the multibuffer without saving.

### Hover Information

Use the `editor: Show Hover` command to display information about the symbol under the cursor. This often includes type information, documentation, and links to relevant resources.

### Workspace Symbol Search

The `workspace: Open Symbol` command allows you to search for symbols (functions, classes, variables) across your entire project. This is useful for quickly navigating large codebases.

### Code Completion

Zed provides intelligent code completion suggestions as you type. You can manually trigger completion with the `editor: Show Completions` command. Use `tab|tab` or `enter|enter` to accept suggestions.

### Diagnostics

Language servers provide real-time diagnostics (errors, warnings, hints) as you code. View all diagnostics for your project using the `diagnostics: Toggle` command.

Configuring ZedKey bindings

Configuring Zed - Zed

## Configuring Zed

Zed is designed to be configured: we want to fit your workflow and preferences exactly. We provide default settings that are designed to be a comfortable starting point for as many people as possible, but we hope you will enjoy tweaking it to make it feel incredible.

In addition to the settings described here, you may also want to change your theme(themes.html), configure your key bindings(key-bindings.html), set up tasks or install extensions

## Settings files

Your settings file can be opened with `cmd-,|ctrl-,`. By default it is located at `~/.config/zed/settings.json`, though if you have XDG_CONFIG_HOME in your environment on Linux it will be at `$XDG_CONFIG_HOME/zed/settings.json` instead.

This configuration is merged with any local configuration inside your projects. You can open the project settings by running `zed: open project settings` from the command palette. This will create a `.zed` directory containing`.zed/settings.json`.

Although most projects will only need one settings file at the root, you can add more local settings files for subdirectories as needed. Not all settings can be set in local files, just those that impact the behavior of the editor and language tooling. For example you can set `tab_size`, `formatter` etc. but not `theme`, `vim_mode` and similar.

The syntax for configuration files is a super-set of JSON that allows `//` comments.

## Default settings

You can find the default settings for your current Zed by running `zed: open default settings` from the command palette.

Extensions that provide language servers may also provide default settings for those language servers.

## Settings

## Active Pane Modifiers

- Description: Styling settings applied to the active pane.
- Setting: `active_pane_modifiers`
- Default:

```json
{
  "active_pane_modifiers": {
    "magnification": 1.0,
    "border_size": 0.0,
    "inactive_opacity": 1.0
  }
}
```

### Magnification

- Description: Scale by which to zoom the active pane. When set to `1.0`, the active pane has the same size as others, but when set to a larger value, the active pane takes up more space.
- Setting: `magnification`
- Default: `1.0`

**Options**

`float` values

### Border size

- Description: Size of the border surrounding the active pane. When set to 0, the active pane doesn't have any border. The border is drawn inset.
- Setting: `border_size`
- Default: `0.0`

**Options**

Non-negative `float` values

### Inactive Opacity

- Description: Opacity of inactive panels. When set to 1.0, the inactive panes have the same opacity as the active one. If set to 0, the inactive panes content will not be visible at all. Values are clamped to the \0.0, 1.0 range.
- Setting: `inactive_opacity`
- Default: `1.0`

**Options**

`float` values

## Bottom Dock Layout

- Description: Control the layout of the bottom dock, relative to the left and right docks
- Setting: `bottom_dock_layout`
- Default: `"contained"`

**Options**

1. Contain the bottom dock, giving the full height of the window to the left and right docks

```json
{
  "bottom_dock_layout": "contained"
}
```

2. Give the bottom dock the full width of the window, truncating the left and right docks

```json
{
  "bottom_dock_layout": "full"
}
```

3. Left align the bottom dock, truncating the left dock and giving the right dock the full height of the window

```json
{
  "bottom_dock_layout": "left_aligned"
}
```

3. Right align the bottom dock, giving the left dock the full height of the window and truncating the right dock.

```json
{
  "bottom_dock_layout": "right_aligned"
}
```

## Auto Install extensions

- Description: Define extensions to be autoinstalled or never be installed.
- Setting: `auto_install_extension`
- Default: `{ "html": true }`

**Options**

You can find the names of your currently installed extensions by listing the subfolders under the extension installation location

On MacOS:

```sh
ls ~/Library/Application\ Support/Zed/extensions/installed/
```

On Linux:

```sh
ls ~/.local/share/zed/extensions/installed
```

Define extensions which should be installed (`true`) or never installed (`false`).

```json
{
  "auto_install_extensions": {
    "html": true,
    "dockerfile": true,
    "docker-compose": false
  }
}
```

## Autosave

- Description: When to automatically save edited buffers.
- Setting: `autosave`
- Default: `off`

**Options**

1. To disable autosave, set it to `off`:

```json
{
  "autosave": "off"
}
```

2. To autosave when focus changes, use `on_focus_change`:

```json
{
  "autosave": "on_focus_change"
}
```

3. To autosave when the active window changes, use `on_window_change`:

```json
{
  "autosave": "on_window_change"
}
```

4. To autosave after an inactivity period, use `after_delay`:

```json
{
  "autosave": {
    "after_delay": {
      "milliseconds": 1000
    }
  }
}
```

## Restore on Startup

- Description: Controls session restoration on startup.
- Setting: `restore_on_startup`
- Default: `last_session`

**Options**

1. Restore all workspaces that were open when quitting Zed:

```json
{
  "restore_on_startup": "last_session"
}
```

2. Restore the workspace that was closed last:

```json
{
  "restore_on_startup": "last_workspace"
}
```

3. Always start with an empty editor:

```json
{
  "restore_on_startup": "none"
}
```

## Autoscroll on Clicks

- Description: Whether to scroll when clicking near the edge of the visible text area.
- Setting: `autoscroll_on_clicks`
- Default: `false`

**Options**

`boolean` values

## Auto Update

- Description: Whether or not to automatically check for updates.
- Setting: `auto_update`
- Default: `true`

**Options**

`boolean` values

## Base Keymap

- Description: Base key bindings scheme. Base keymaps can be overridden with user keymaps.
- Setting: `base_keymap`
- Default: `VSCode`

**Options**

1. VSCode

```json
{
  "base_keymap": "VSCode"
}
```

2. Atom

```json
{
  "base_keymap": "Atom"
}
```

3. JetBrains

```json
{
  "base_keymap": "JetBrains"
}
```

4. None

```json
{
  "base_keymap": "None"
}
```

5. SublimeText

```json
{
  "base_keymap": "SublimeText"
}
```

6. TextMate

```json
{
  "base_keymap": "TextMate"
}
```

## Buffer Font Family

- Description: The name of a font to use for rendering text in the editor.
- Setting: `buffer_font_family`
- Default: `Zed Plex Mono`

**Options**

The name of any font family installed on the user's system

## Buffer Font Features

- Description: The OpenType features to enable for text in the editor.
- Setting: `buffer_font_features`
- Default: `null`
- Platform: macOS and Windows.

**Options**

Zed supports all OpenType features that can be enabled or disabled for a given buffer or terminal font, as well as setting values for font features.

For example, to disable font ligatures, add the following to your settings:

```json
{
  "buffer_font_features": {
    "calt": false
  }
}
```

You can also set other OpenType features, like setting `cv01` to `7`:

```json
{
  "buffer_font_features": {
    "cv01": 7
  }
}
```

## Buffer Font Fallbacks

- Description: Set the buffer text's font fallbacks, this will be merged with the platform's default fallbacks.
- Setting: `buffer_font_fallbacks`
- Default: `null`
- Platform: macOS and Windows.

**Options**

For example, to use `Nerd Font` as a fallback, add the following to your settings:

```json
{
  "buffer_font_fallbacks": "Nerd Font"
}
```

## Buffer Font Size

- Description: The default font size for text in the editor.
- Setting: `buffer_font_size`
- Default: `15`

**Options**

`integer` values from `6` to `100` pixels (inclusive)

## Buffer Font Weight

- Description: The default font weight for text in the editor.
- Setting: `buffer_font_weight`
- Default: `400`

**Options**

`integer` values between `100` and `900`

## Buffer Line Height

- Description: The default line height for text in the editor.
- Setting: `buffer_line_height`
- Default: `"comfortable"`

**Options**

`"standard"`, `"comfortable"` or `{ "custom": float }` (`1` is compact, `2` is loose)

## Confirm Quit

- Description: Whether or not to prompt the user to confirm before closing the application.
- Setting: `confirm_quit`
- Default: `false`

**Options**

`boolean` values

## Centered Layout

- Description: Configuration for the centered layout mode.
- Setting: `centered_layout`
- Default:

```json
"centered_layout": {
  "left_padding": 0.2,
  "right_padding": 0.2,
}
```

**Options**

The `left_padding` and `right_padding` options define the relative width of the left and right padding of the central pane from the workspace when the centered layout mode is activated. Valid values range is from `0` to `0.4`.

## Direnv Integration

- Description: Settings for direnv
- Setting: `load_direnv`
- Default: `"direct"`

**Options**

There are two options to choose from:

1. `shell_hook`: Use the shell hook to load direnv. This relies on direnv to activate upon entering the directory. Supports POSIX shells and fish.
2. `direct`: Use `direnv export json` to load direnv. This will load direnv directly without relying on the shell hook and might cause some inconsistencies. This allows direnv to work with any shell.

## Edit Predictions

- Description: Settings for edit predictions.
- Setting: `edit_predictions`
- Default:

```json
  "edit_predictions": {
    "disabled_globs":
      "**/.env*",
      "**/*.pem",
      "**/*.key",
      "**/*.cert",
      "**/*.crt",
      "**/.dev.vars",
      "**/secrets.yml"

  }
```

**Options**

### Disabled Globs

- Description: A list of globs for which edit predictions should be disabled for. This list adds to a pre-existing, sensible default set of globs. Any additional ones you add are combined with them.
- Setting: `disabled_globs`
- Default: `"**/.env*", "**/*.pem", "**/*.key", "**/*.cert", "**/*.crt", "**/.dev.vars", "**/secrets.yml"`

**Options**

List of `string` values.

## Edit Predictions Disabled in

- Description: A list of language scopes in which edit predictions should be disabled.
- Setting: `edit_predictions_disabled_in`
- Default: ``

**Options**

List of `string` values

1. Don't show edit predictions in comments:

```json
"disabled_in": "comment"
```

2. Don't show edit predictions in strings and comments:

```json
"disabled_in": "comment", "string"
```

3. Only in Go, don't show edit predictions in strings and comments:

```json
{
  "languages": {
    "Go": {
      "edit_predictions_disabled_in": "comment", "string"
    }
  }
}
```

## Current Line Highlight

- Description: How to highlight the current line in the editor.
- Setting: `current_line_highlight`
- Default: `all`

**Options**

1. Don't highlight the current line:

```json
"current_line_highlight": "none"
```

2. Highlight the gutter area:

```json
"current_line_highlight": "gutter"
```

3. Highlight the editor area:

```json
"current_line_highlight": "line"
```

4. Highlight the full line:

```json
"current_line_highlight": "all"
```

## Selection Highlight

- Description: Whether to highlight all occurrences of the selected text in an editor.
- Setting: `selection_highlight`
- Default: `true`

## LSP Highlight Debounce

- Description: The debounce delay before querying highlights from the language server based on the current cursor location.
- Setting: `lsp_highlight_debounce`
- Default: `75`

## Cursor Blink

- Description: Whether or not the cursor blinks.
- Setting: `cursor_blink`
- Default: `true`

**Options**

`boolean` values

## Cursor Shape

- Description: Cursor shape for the default editor.
- Setting: `cursor_shape`
- Default: `bar`

**Options**

1. A vertical bar:

```json
"cursor_shape": "bar"
```

2. A block that surrounds the following character:

```json
"cursor_shape": "block"
```

3. An underline / underscore that runs along the following character:

```json
"cursor_shape": "underline"
```

4. An box drawn around the following character:

```json
"cursor_shape": "hollow"
```

## Hide Mouse

- Description: Determines when the mouse cursor should be hidden in an editor or input box.
- Setting: `hide_mouse`
- Default: `on_typing_and_movement`

**Options**

1. Never hide the mouse cursor:

```json
"hide_mouse": "never"
```

2. Hide only when typing:

```json
"hide_mouse": "on_typing"
```

3. Hide on both typing and cursor movement:

```json
"hide_mouse": "on_typing_and_movement"
```

## Snippet Sort Order

- Description: Determines how snippets are sorted relative to other completion items.
- Setting: `snippet_sort_order`
- Default: `inline`

**Options**

1. Place snippets at the top of the completion list:

```json
"snippet_sort_order": "top"
```

2. Place snippets normally without any preference:

```json
"snippet_sort_order": "inline"
```

3. Place snippets at the bottom of the completion list:

```json
"snippet_sort_order": "bottom"
```

## Editor Scrollbar

- Description: Whether or not to show the editor scrollbar and various elements in it.
- Setting: `scrollbar`
- Default:

```json
"scrollbar": {
  "show": "auto",
  "cursors": true,
  "git_diff": true,
  "search_results": true,
  "selected_text": true,
  "selected_symbol": true,
  "diagnostics": "all",
  "axes": {
    "horizontal": true,
    "vertical": true,
  },
},
```

### Show Mode

- Description: When to show the editor scrollbar.
- Setting: `show`
- Default: `auto`

**Options**

1. Show the scrollbar if there's important information or follow the system's configured behavior:

```json
"scrollbar": {
  "show": "auto"
}
```

2. Match the system's configured behavior:

```json
"scrollbar": {
  "show": "system"
}
```

3. Always show the scrollbar:

```json
"scrollbar": {
  "show": "always"
}
```

4. Never show the scrollbar:

```json
"scrollbar": {
  "show": "never"
}
```

### Cursor Indicators

- Description: Whether to show cursor positions in the scrollbar.
- Setting: `cursors`
- Default: `true`

**Options**

`boolean` values

### Git Diff Indicators

- Description: Whether to show git diff indicators in the scrollbar.
- Setting: `git_diff`
- Default: `true`

**Options**

`boolean` values

### Search Results Indicators

- Description: Whether to show buffer search results in the scrollbar.
- Setting: `search_results`
- Default: `true`

**Options**

`boolean` values

### Selected Text Indicators

- Description: Whether to show selected text occurrences in the scrollbar.
- Setting: `selected_text`
- Default: `true`

**Options**

`boolean` values

### Selected Symbols Indicators

- Description: Whether to show selected symbol occurrences in the scrollbar.
- Setting: `selected_symbol`
- Default: `true`

**Options**

`boolean` values

### Diagnostics

- Description: Which diagnostic indicators to show in the scrollbar.
- Setting: `diagnostics`
- Default: `all`

**Options**

1. Show all diagnostics:

```json
{
  "diagnostics": "all"
}
```

2. Do not show any diagnostics:

```json
{
  "diagnostics": "none"
}
```

3. Show only errors:

```json
{
  "diagnostics": "error"
}
```

4. Show only errors and warnings:

```json
{
  "diagnostics": "warning"
}
```

5. Show only errors, warnings, and information:

```json
{
  "diagnostics": "information"
}
```

### Axes

- Description: Forcefully enable or disable the scrollbar for each axis
- Setting: `axes`
- Default:

```json
"scrollbar": {
  "axes": {
    "horizontal": true,
    "vertical": true,
  },
}
```

#### Horizontal

- Description: When false, forcefully disables the horizontal scrollbar. Otherwise, obey other settings.
- Setting: `horizontal`
- Default: `true`

**Options**

`boolean` values

#### Vertical

- Description: When false, forcefully disables the vertical scrollbar. Otherwise, obey other settings.
- Setting: `vertical`
- Default: `true`

**Options**

`boolean` values

## Editor Tab Bar

- Description: Settings related to the editor's tab bar.
- Settings: `tab_bar`
- Default:

```json
"tab_bar": {
  "show": true,
  "show_nav_history_buttons": true,
  "show_tab_bar_buttons": true
}
```

### Show

- Description: Whether or not to show the tab bar in the editor.
- Setting: `show`
- Default: `true`

**Options**

`boolean` values

### Navigation History Buttons

- Description: Whether or not to show the navigation history buttons.
- Setting: `show_nav_history_buttons`
- Default: `true`

**Options**

`boolean` values

### Tab Bar Buttons

- Description: Whether or not to show the tab bar buttons.
- Setting: `show_tab_bar_buttons`
- Default: `true`

**Options**

`boolean` values

## Editor Tabs

- Description: Configuration for the editor tabs.
- Setting: `tabs`
- Default:

```json
"tabs": {
  "close_position": "right",
  "file_icons": false,
  "git_status": false,
  "activate_on_close": "history",
  "show_close_button": "hover",
  "show_diagnostics": "off"
},
```

### Close Position

- Description: Where to display close button within a tab.
- Setting: `close_position`
- Default: `right`

**Options**

1. Display the close button on the right:

```json
{
  "close_position": "right"
}
```

2. Display the close button on the left:

```json
{
  "close_position": "left"
}
```

### File Icons

- Description: Whether to show the file icon for a tab.
- Setting: `file_icons`
- Default: `false`

### Git Status

- Description: Whether or not to show Git file status in tab.
- Setting: `git_status`
- Default: `false`

### Activate on close

- Description: What to do after closing the current tab.
- Setting: `activate_on_close`
- Default: `history`

**Options**

1. Activate the tab that was open previously:

```json
{
  "activate_on_close": "history"
}
```

2. Activate the right neighbour tab if present:

```json
{
  "activate_on_close": "neighbour"
}
```

3. Activate the left neighbour tab if present:

```json
{
  "activate_on_close": "left_neighbour"
}
```

### Show close button

- Description: Controls the appearance behavior of the tab's close button.
- Setting: `show_close_button`
- Default: `hover`

**Options**

1. Show it just upon hovering the tab:

```json
{
  "show_close_button": "hover"
}
```

2. Show it persistently:

```json
{
  "show_close_button": "always"
}
```

3. Never show it, even if hovering it:

```json
{
  "show_close_button": "hidden"
}
```

### Show Diagnostics

- Description: Whether to show diagnostics indicators in tabs. This setting only works when file icons are active and controls which files with diagnostic issues to mark.
- Setting: `show_diagnostics`
- Default: `off`

**Options**

1. Do not mark any files:

```json
{
  "show_diagnostics": "off"
}
```

2. Only mark files with errors:

```json
{
  "show_diagnostics": "errors"
}
```

3. Mark files with errors and warnings:

```json
{
  "show_diagnostics": "all"
}
```

## Editor Toolbar

- Description: Whether or not to show various elements in the editor toolbar.
- Setting: `toolbar`
- Default:

```json
"toolbar": {
  "breadcrumbs": true,
  "quick_actions": true,
  "selections_menu": true,
  "agent_review": true
},
```

**Options**

Each option controls displaying of a particular toolbar element. If all elements are hidden, the editor toolbar is not displayed.

## Enable Language Server

- Description: Whether or not to use language servers to provide code intelligence.
- Setting: `enable_language_server`
- Default: `true`

**Options**

`boolean` values

## Ensure Final Newline On Save

- Description: Removes any lines containing only whitespace at the end of the file and ensures just one newline at the end.
- Setting: `ensure_final_newline_on_save`
- Default: `true`

**Options**

`boolean` values

## LSP

- Description: Configuration for language servers.
- Setting: `lsp`
- Default: `null`

**Options**

The following settings can be overridden for specific language servers:

- `initialization_options`
- `settings`

To override configuration for a language server, add an entry for that language server's name to the `lsp` value.

Some options are passed via `initialization_options` to the language server. These are for options which must be specified at language server startup and when changed will require restarting the language server.

For example to pass the `check` option to `rust-analyzer`, use the following configuration:

```json
"lsp": {
  "rust-analyzer": {
    "initialization_options": {
      "check": {
        "command": "clippy" // rust-analyzer.check.command (default: "check")
      }
    }
  }
}
```

While other options may be changed at a runtime and should be placed under `settings`:

```json
"lsp": {
  "yaml-language-server": {
    "settings": {
      "yaml": {
        "keyOrdering": true // Enforces alphabetical ordering of keys in maps
      }
    }
  }
}
```

## LSP Highlight Debounce

- Description: The debounce delay in milliseconds before querying highlights from the language server based on the current cursor location.
- Setting: `lsp_highlight_debounce`
- Default: `75`

**Options**

`integer` values representing milliseconds

## Format On Save

- Description: Whether or not to perform a buffer format before saving.
- Setting: `format_on_save`
- Default: `on`

**Options**

1. `on`, enables format on save obeying `formatter` setting:

```json
{
  "format_on_save": "on"
}
```

2. `off`, disables format on save:

```json
{
  "format_on_save": "off"
}
```

## Formatter

- Description: How to perform a buffer format.
- Setting: `formatter`
- Default: `auto`

**Options**

1. To use the current language server, use `"language_server"`:

```json
{
  "formatter": "language_server"
}
```

2. Or to use an external command, use `"external"`. Specify the name of the formatting program to run, and an array of arguments to pass to the program. The buffer's text will be passed to the program on stdin, and the formatted output should be written to stdout. For example, the following command would strip trailing spaces using `sed(1)`

```json
{
  "formatter": {
    "external": {
      "command": "sed",
      "arguments": "-e", "s/ *$//"
    }
  }
}
```

3. External formatters may optionally include a `{buffer_path}` placeholder which at runtime will include the path of the buffer being formatted. Formatters operate by receiving file content via standard input, reformatting it and then outputting it to standard output and so normally don't know the filename of what they are formatting. Tools like prettier support receiving the file path via a command line argument which can then used to impact formatting decisions.

WARNING: `{buffer_path}` should not be used to direct your formatter to read from a filename. Your formatter should only read from standard input and should not read or write files directly.

```json
  "formatter": {
    "external": {
      "command": "prettier",
      "arguments": "--stdin-filepath", "{buffer_path}"
    }
  }
```

4. Or to use code actions provided by the connected language servers, use `"code_actions"`:

```json
{
  "formatter": {
    "code_actions": {
      // Use ESLint's --fix:
      "source.fixAll.eslint": true,
      // Organize imports on save:
      "source.organizeImports": true
    }
  }
}
```

5. Or to use multiple formatters consecutively, use an array of formatters:

```json
{
  "formatter":
    { "language_server": { "name": "rust-analyzer" } },
    {
      "external": {
        "command": "sed",
        "arguments": "-e", "s/ *$//"
      }
    }

}
```

Here `rust-analyzer` will be used first to format the code, followed by a call of sed. If any of the formatters fails, the subsequent ones will still be executed.

## Code Actions On Format

- Description: The code actions to perform with the primary language server when formatting the buffer.
- Setting: `code_actions_on_format`
- Default: `{}`, except for Go it's `{ "source.organizeImports": true }`

**Examples**

1. Organize imports on format in TypeScript and TSX buffers:

```json
{
  "languages": {
    "TypeScript": {
      "code_actions_on_format": {
        "source.organizeImports": true
      }
    },
    "TSX": {
      "code_actions_on_format": {
        "source.organizeImports": true
      }
    }
  }
}
```

2. Run ESLint `fixAll` code action when formatting:

```json
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  }
}
```

3. Run only a single ESLint rule when using `fixAll`:

```json
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  },
  "lsp": {
    "eslint": {
      "settings": {
        "codeActionOnSave": {
          "rules": "import/order"
        }
      }
    }
  }
}
```

## Auto close

- Description: Whether to automatically add matching closing characters when typing opening parenthesis, bracket, brace, single or double quote characters.
- Setting: `use_autoclose`
- Default: `true`

**Options**

`boolean` values

## Always Treat Brackets As Autoclosed

- Description: Controls how the editor handles the autoclosed characters.
- Setting: `always_treat_brackets_as_autoclosed`
- Default: `false`

**Options**

`boolean` values

**Example**

If the setting is set to `true`:

1. Enter in the editor: `)))`
2. Move the cursor to the start: `^)))`
3. Enter again: `)))`

The result is still `)))` and not `))))))`, which is what it would be by default.

## File Scan Exclusions

- Setting: `file_scan_exclusions`
- Description: Files or globs of files that will be excluded by Zed entirely. They will be skipped during file scans, file searches, and not be displayed in the project file tree. Overrides `file_scan_inclusions`.
- Default:

```json
"file_scan_exclusions":
  "**/.git",
  "**/.svn",
  "**/.hg",
  "**/.jj",
  "**/CVS",
  "**/.DS_Store",
  "**/Thumbs.db",
  "**/.classpath",
  "**/.settings"
,
```

Note, specifying `file_scan_exclusions` in settings.json will override the defaults (shown above). If you are looking to exclude additional items you will need to include all the default values in your settings.

## File Scan Inclusions

- Setting: `file_scan_inclusions`
- Description: Files or globs of files that will be included by Zed, even when ignored by git. This is useful for files that are not tracked by git, but are still important to your project. Note that globs that are overly broad can slow down Zed's file scanning. `file_scan_exclusions` takes precedence over these inclusions.
- Default:

```json
"file_scan_inclusions": ".env*"
```

## File Types

- Setting: `file_types`
- Description: Configure how Zed selects a language for a file based on its filename or extension. Supports glob entries.
- Default:

```json
"file_types": {
  "JSONC": "**/.zed/**/*.json", "**/zed/**/*.json", "**/Zed/**/*.json", "**/.vscode/**/*.json"
  "Shell Script": ".env.*"
}
```

**Examples**

To interpret all `.c` files as C++, files called `MyLockFile` as TOML and files starting with `Dockerfile` as Dockerfile:

```json
{
  "file_types": {
    "C++": "c"
    "TOML": "MyLockFile"
    "Dockerfile": "Dockerfile*"
  }
}
```

## Diagnostics

- Description: Configuration for diagnostics-related features.
- Setting: `diagnostics`
- Default:

```json
{
  "diagnostics": {
    "include_warnings": true,
    "inline": {
      "enabled": false
    },
    "update_with_cursor": false,
    "primary_only": false,
    "use_rendered": false
  }
}
```

### Inline Diagnostics

- Description: Whether or not to show diagnostics information inline.
- Setting: `inline`
- Default:

```json
{
  "diagnostics": {
    "inline": {
      "enabled": false,
      "update_debounce_ms": 150,
      "padding": 4,
      "min_column": 0,
      "max_severity": null
    }
  }
}
```

**Options**

1. Enable inline diagnostics.

```json
{
  "diagnostics": {
    "inline": {
      "enabled": true
    }
  }
}
```

2. Delay diagnostic updates until some time after the last diagnostic update.

```json
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "update_debounce_ms": 150
    }
  }
}
```

3. Set padding between the end of the source line and the start of the diagnostic.

```json
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "padding": 4
    }
  }
}
```

4. Horizontally align inline diagnostics at the given column.

```json
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "min_column": 80
    }
  }
}
```

5. Show only warning and error diagnostics.

```json
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "max_severity": "warning"
    }
  }
}
```

## Git

- Description: Configuration for git-related features.
- Setting: `git`
- Default:

```json
{
  "git": {
    "git_gutter": "tracked_files",
    "inline_blame": {
      "enabled": true
    },
    "hunk_style": "staged_hollow"
  }
}
```

### Git Gutter

- Description: Whether or not to show the git gutter.
- Setting: `git_gutter`
- Default: `tracked_files`

**Options**

1. Show git gutter in tracked files

```json
{
  "git": {
    "git_gutter": "tracked_files"
  }
}
```

2. Hide git gutter

```json
{
  "git": {
    "git_gutter": "hide"
  }
}
```

### Gutter Debounce

- Description: Sets the debounce threshold (in milliseconds) after which changes are reflected in the git gutter.
- Setting: `gutter_debounce`
- Default: `null`

**Options**

`integer` values representing milliseconds

Example:

```json
{
  "git": {
    "gutter_debounce": 100
  }
}
```

### Inline Git Blame

- Description: Whether or not to show git blame information inline, on the currently focused line.
- Setting: `inline_blame`
- Default:

```json
{
  "git": {
    "inline_blame": {
      "enabled": true
    }
  }
}
```

### Hunk Style

- Description: What styling we should use for the diff hunks.
- Setting: `hunk_style`
- Default:

```json
{
  "git": {
    "hunk_style": "staged_hollow"
  }
}
```

**Options**

1. Show the staged hunks faded out and with a border:

```json
{
  "git": {
    "hunk_style": "staged_hollow"
  }
}
```

2. Show unstaged hunks faded out and with a border:

```json
{
  "git": {
    "hunk_style": "unstaged_hollow"
  }
}
```

**Options**

1. Disable inline git blame:

```json
{
  "git": {
    "inline_blame": {
      "enabled": false
    }
  }
}
```

2. Only show inline git blame after a delay (that starts after cursor stops moving):

```json
{
  "git": {
    "inline_blame": {
      "enabled": true,
      "delay_ms": 500
    }
  }
}
```

3. Show a commit summary next to the commit date and author:

```json
{
  "git": {
    "inline_blame": {
      "enabled": true,
      "show_commit_summary": true
    }
  }
}
```

4. Use this as the minimum column at which to display inline blame information:

```json
{
  "git": {
    "inline_blame": {
      "enabled": true,
      "min_column": 80
    }
  }
}
```

## Indent Guides

- Description: Configuration related to indent guides. Indent guides can be configured separately for each language.
- Setting: `indent_guides`
- Default:

```json
{
  "indent_guides": {
    "enabled": true,
    "line_width": 1,
    "active_line_width": 1,
    "coloring": "fixed",
    "background_coloring": "disabled"
  }
}
```

**Options**

1. Disable indent guides

```json
{
  "indent_guides": {
    "enabled": false
  }
}
```

2. Enable indent guides for a specific language.

```json
{
  "languages": {
    "Python": {
      "indent_guides": {
        "enabled": true
      }
    }
  }
}
```

3. Enable indent aware coloring ("rainbow indentation"). The colors that are used for different indentation levels are defined in the theme (theme key: `accents`). They can be customized by using theme overrides.

```json
{
  "indent_guides": {
    "enabled": true,
    "coloring": "indent_aware"
  }
}
```

4. Enable indent aware background coloring ("rainbow indentation"). The colors that are used for different indentation levels are defined in the theme (theme key: `accents`). They can be customized by using theme overrides.

```json
{
  "indent_guides": {
    "enabled": true,
    "coloring": "indent_aware",
    "background_coloring": "indent_aware"
  }
}
```

## Hard Tabs

- Description: Whether to indent lines using tab characters or multiple spaces.
- Setting: `hard_tabs`
- Default: `false`

**Options**

`boolean` values

## Hover Popover Enabled

- Description: Whether or not to show the informational hover box when moving the mouse over symbols in the editor.
- Setting: `hover_popover_enabled`
- Default: `true`

**Options**

`boolean` values

## Icon Theme

- Description: The icon theme setting can be specified in two forms - either as the name of an icon theme or as an object containing the `mode`, `dark`, and `light` icon themes for files/folders inside Zed.
- Setting: `icon_theme`
- Default: `Zed (Default)`

### Icon Theme Object

- Description: Specify the icon theme using an object that includes the `mode`, `dark`, and `light`.
- Setting: `icon_theme`
- Default:

```json
"icon_theme": {
  "mode": "system",
  "dark": "Zed (Default)",
  "light": "Zed (Default)"
},
```

### Mode

- Description: Specify the icon theme mode.
- Setting: `mode`
- Default: `system`

**Options**

1. Set the icon theme to dark mode

```json
{
  "mode": "dark"
}
```

2. Set the icon theme to light mode

```json
{
  "mode": "light"
}
```

3. Set the icon theme to system mode

```json
{
  "mode": "system"
}
```

### Dark

- Description: The name of the dark icon theme.
- Setting: `dark`
- Default: `Zed (Default)`

**Options**

Run the `icon theme selector: toggle` action in the command palette to see a current list of valid icon themes names.

### Light

- Description: The name of the light icon theme.
- Setting: `light`
- Default: `Zed (Default)`

**Options**

Run the `icon theme selector: toggle` action in the command palette to see a current list of valid icon themes names.

## Inlay hints

- Description: Configuration for displaying extra text with hints in the editor.
- Setting: `inlay_hints`
- Default:

```json
"inlay_hints": {
  "enabled": false,
  "show_type_hints": true,
  "show_parameter_hints": true,
  "show_other_hints": true,
  "show_background": false,
  "edit_debounce_ms": 700,
  "scroll_debounce_ms": 50,
  "toggle_on_modifiers_press": null
}
```

**Options**

Inlay hints querying consists of two parts: editor (client) and LSP server. With the inlay settings above are changed to enable the hints, editor will start to query certain types of hints and react on LSP hint refresh request from the server. At this point, the server may or may not return hints depending on its implementation, further configuration might be needed, refer to the corresponding LSP server documentation.

The following languages have inlay hints preconfigured by Zed:

- Go
- Rust
- Svelte
- Typescript

Use the `lsp` section for the server configuration. Examples are provided in the corresponding language documentation.

Hints are not instantly queried in Zed, two kinds of debounces are used, either may be set to 0 to be disabled. Settings-related hint updates are not debounced.

All possible config values for `toggle_on_modifiers_press` are:

```json
"inlay_hints": {
  "toggle_on_modifiers_press": {
    "control": true,
    "shift": true,
    "alt": true,
    "platform": true,
    "function": true
  }
}
```

Unspecified values have a `false` value, hints won't be toggled if all the modifiers are `false` or not all the modifiers are pressed.

## Journal

- Description: Configuration for the journal.
- Setting: `journal`
- Default:

```json
"journal": {
  "path": "~",
  "hour_format": "hour12"
}
```

### Path

- Description: The path of the directory where journal entries are stored.
- Setting: `path`
- Default: `~`

**Options**

`string` values

### Hour Format

- Description: The format to use for displaying hours in the journal.
- Setting: `hour_format`
- Default: `hour12`

**Options**

1. 12-hour format:

```json
{
  "hour_format": "hour12"
}
```

2. 24-hour format:

```json
{
  "hour_format": "hour24"
}
```

## Languages

- Description: Configuration for specific languages.
- Setting: `languages`
- Default: `null`

**Options**

To override settings for a language, add an entry for that languages name to the `languages` value. Example:

```json
"languages": {
  "C": {
    "format_on_save": "off",
    "preferred_line_length": 64,
    "soft_wrap": "preferred_line_length"
  },
  "JSON": {
    "tab_size": 4
  }
}
```

The following settings can be overridden for each specific language:

- `enable_language_server`
- `ensure_final_newline_on_save`
- `format_on_save`
- `formatter`
- `hard_tabs`
- `preferred_line_length`
- `remove_trailing_whitespace_on_save`
- `show_edit_predictions`
- `show_whitespaces`
- `soft_wrap`
- `tab_size`
- `use_autoclose`
- `always_treat_brackets_as_autoclosed`

These values take in the same options as the root-level settings with the same name.

## Network Proxy

- Description: Configure a network proxy for Zed.
- Setting: `proxy`
- Default: `null`

**Options**

The proxy setting must contain a URL to the proxy.

The following URI schemes are supported:

- `http`
- `https`
- `socks4` - SOCKS4 proxy with local DNS
- `socks4a` - SOCKS4 proxy with remote DNS
- `socks5` - SOCKS5 proxy with local DNS
- `socks5h` - SOCKS5 proxy with remote DNS

`http` will be used when no scheme is specified.

By default no proxy will be used, or Zed will attempt to retrieve proxy settings from environment variables, such as `http_proxy`, `HTTP_PROXY`, `https_proxy`, `HTTPS_PROXY`, `all_proxy`, `ALL_PROXY`.

For example, to set an `http` proxy, add the following to your settings:

```json
{
  "proxy": "http://127.0.0.1:10809"
}
```

Or to set a `socks5` proxy:

```json
{
  "proxy": "socks5h://localhost:10808"
}
```

## Preview tabs

- Description: Preview tabs allow you to open files in preview mode, where they close automatically when you switch to another file unless you explicitly pin them. This is useful for quickly viewing files without cluttering your workspace. Preview tabs display their file names in italics.
  There are several ways to convert a preview tab into a regular tab:

  - Double-clicking on the file
  - Double-clicking on the tab header
  - Using the `project_panel::OpenPermanent` action
  - Editing the file
  - Dragging the file to a different pane

- Setting: `preview_tabs`
- Default:

```json
"preview_tabs": {
  "enabled": true,
  "enable_preview_from_file_finder": false,
  "enable_preview_from_code_navigation": false,
}
```

### Enable preview from file finder

- Description: Determines whether to open files in preview mode when selected from the file finder.
- Setting: `enable_preview_from_file_finder`
- Default: `false`

**Options**

`boolean` values

### Enable preview from code navigation

- Description: Determines whether a preview tab gets replaced when code navigation is used to navigate away from the tab.
- Setting: `enable_preview_from_code_navigation`
- Default: `false`

**Options**

`boolean` values

## File Finder

### File Icons

- Description: Whether to show file icons in the file finder.
- Setting: `file_icons`
- Default: `true`

### Modal Max Width

- Description: Max-width of the file finder modal. It can take one of these values: `small`, `medium`, `large`, `xlarge`, and `full`.
- Setting: `modal_max_width`
- Default: `small`

### Skip Focus For Active In Search

- Description: Determines whether the file finder should skip focus for the active file in search results.
- Setting: `skip_focus_for_active_in_search`
- Default: `true`

## Preferred Line Length

- Description: The column at which to soft-wrap lines, for buffers where soft-wrap is enabled.
- Setting: `preferred_line_length`
- Default: `80`

**Options**

`integer` values

## Projects Online By Default

- Description: Whether or not to show the online projects view by default.
- Setting: `projects_online_by_default`
- Default: `true`

**Options**

`boolean` values

## Remove Trailing Whitespace On Save

- Description: Whether or not to remove any trailing whitespace from lines of a buffer before saving it.
- Setting: `remove_trailing_whitespace_on_save`
- Default: `true`

**Options**

`boolean` values

## Search

- Description: Search options to enable by default when opening new project and buffer searches.
- Setting: `search`
- Default:

```json
"search": {
  "whole_word": false,
  "case_sensitive": false,
  "include_ignored": false,
  "regex": false
},
```

## Seed Search Query From Cursor

- Description: When to populate a new search's query based on the text under the cursor.
- Setting: `seed_search_query_from_cursor`
- Default: `always`

**Options**

1. `always` always populate the search query with the word under the cursor
2. `selection` only populate the search query when there is text selected
3. `never` never populate the search query

## Use Smartcase Search

- Description: When enabled, automatically adjusts search case sensitivity based on your query. If your search query contains any uppercase letters, the search becomes case-sensitive; if it contains only lowercase letters, the search becomes case-insensitive.
  This applies to both in-file searches and project-wide searches.
- Setting: `use_smartcase_search`
- Default: `false`

**Options**

`boolean` values

Examples:

- Searching for "function" would match "function", "Function", "FUNCTION", etc.
- Searching for "Function" would only match "Function", not "function" or "FUNCTION"

## Show Call Status Icon

- Description: Whether or not to show the call status icon in the status bar.
- Setting: `show_call_status_icon`
- Default: `true`

**Options**

`boolean` values

## Completions

- Description: Controls how completions are processed for this language.
- Setting: `completions`
- Default:

```json
{
  "completions": {
    "words": "fallback",
    "lsp": true,
    "lsp_fetch_timeout_ms": 0,
    "lsp_insert_mode": "replace_suffix"
  }
}
```

### Words

- Description: Controls how words are completed. For large documents, not all words may be fetched for completion.
- Setting: `words`
- Default: `fallback`

**Options**

1. `enabled` - Always fetch document's words for completions along with LSP completions
2. `fallback` - Only if LSP response errors or times out, use document's words to show completions
3. `disabled` - Never fetch or complete document's words for completions (word-based completions can still be queried via a separate action)

### LSP

- Description: Whether to fetch LSP completions or not.
- Setting: `lsp`
- Default: `true`

**Options**

`boolean` values

### LSP Fetch Timeout (ms)

- Description: When fetching LSP completions, determines how long to wait for a response of a particular server. When set to 0, waits indefinitely.
- Setting: `lsp_fetch_timeout_ms`
- Default: `0`

**Options**

`integer` values representing milliseconds

### LSP Insert Mode

- Description: Controls what range to replace when accepting LSP completions.
- Setting: `lsp_insert_mode`
- Default: `replace_suffix`

**Options**

1. `insert` - Replaces text before the cursor, using the `insert` range described in the LSP specification
2. `replace` - Replaces text before and after the cursor, using the `replace` range described in the LSP specification
3. `replace_subsequence` - Behaves like `"replace"` if the text that would be replaced is a subsequence of the completion text, and like `"insert"` otherwise
4. `replace_suffix` - Behaves like `"replace"` if the text after the cursor is a suffix of the completion, and like `"insert"` otherwise

## Show Completions On Input

- Description: Whether or not to show completions as you type.
- Setting: `show_completions_on_input`
- Default: `true`

**Options**

`boolean` values

## Show Completion Documentation

- Description: Whether to display inline and alongside documentation for items in the completions menu.
- Setting: `show_completion_documentation`
- Default: `true`

**Options**

`boolean` values

## Show Edit Predictions

- Description: Whether to show edit predictions as you type or manually by triggering `editor::ShowEditPrediction`.
- Setting: `show_edit_predictions`
- Default: `true`

**Options**

`boolean` values

## Show Whitespaces

- Description: Whether or not to render whitespace characters in the editor.
- Setting: `show_whitespaces`
- Default: `selection`

**Options**

1. `all`
2. `selection`
3. `none`
4. `boundary`

## Soft Wrap

- Description: Whether or not to automatically wrap lines of text to fit editor / preferred width.
- Setting: `soft_wrap`
- Default: `none`

**Options**

1. `none` to avoid wrapping generally, unless the line is too long
2. `prefer_line` (deprecated, same as `none`)
3. `editor_width` to wrap lines that overflow the editor width
4. `preferred_line_length` to wrap lines that overflow `preferred_line_length` config value
5. `bounded` to wrap lines at the minimum of `editor_width` and `preferred_line_length`

## Wrap Guides (Vertical Rulers)

- Description: Where to display vertical rulers as wrap-guides. Disable by setting `show_wrap_guides` to `false`.
- Setting: `wrap_guides`
- Default: \

**Options**

List of `integer` column numbers

## Tab Size

- Description: The number of spaces to use for each tab character.
- Setting: `tab_size`
- Default: `4`

**Options**

`integer` values

## Telemetry

- Description: Control what info is collected by Zed.
- Setting: `telemetry`
- Default:

```json
"telemetry": {
  "diagnostics": true,
  "metrics": true
},
```

**Options**

### Diagnostics

- Description: Setting for sending debug-related data, such as crash reports.
- Setting: `diagnostics`
- Default: `true`

**Options**

`boolean` values

### Metrics

- Description: Setting for sending anonymized usage data, such what languages you're using Zed with.
- Setting: `metrics`
- Default: `true`

**Options**

`boolean` values

## Terminal

- Description: Configuration for the terminal.
- Setting: `terminal`
- Default:

```json
{
  "terminal": {
    "alternate_scroll": "off",
    "blinking": "terminal_controlled",
    "copy_on_select": false,
    "dock": "bottom",
    "default_width": 640,
    "default_height": 320,
    "detect_venv": {
      "on": {
        "directories": ".env", "env", ".venv", "venv"
        "activate_script": "default"
      }
    },
    "env": {},
    "font_family": null,
    "font_features": null,
    "font_size": null,
    "line_height": "comfortable",
    "option_as_meta": false,
    "button": true,
    "shell": "system",
    "toolbar": {
      "breadcrumbs": true
    },
    "working_directory": "current_project_directory",
    "scrollbar": {
      "show": null
    }
  }
}
```

### Terminal: Dock

- Description: Control the position of the dock
- Setting: `dock`
- Default: `bottom`

**Options**

`"bottom"`, `"left"` or `"right"`

### Terminal: Alternate Scroll

- Description: Set whether Alternate Scroll mode (DECSET code: `?1007`) is active by default. Alternate Scroll mode converts mouse scroll events into up / down key presses when in the alternate screen (e.g. when running applications like vim or less). The terminal can still set and unset this mode with ANSI escape codes.
- Setting: `alternate_scroll`
- Default: `off`

**Options**

1. Default alternate scroll mode to off

```json
{
  "terminal": {
    "alternate_scroll": "off"
  }
}
```

2. Default alternate scroll mode to on

```json
{
  "terminal": {
    "alternate_scroll": "on"
  }
}
```

### Terminal: Blinking

- Description: Set the cursor blinking behavior in the terminal
- Setting: `blinking`
- Default: `terminal_controlled`

**Options**

1. Never blink the cursor, ignore the terminal mode

```json
{
  "terminal": {
    "blinking": "off"
  }
}
```

2. Default the cursor blink to off, but allow the terminal to turn blinking on

```json
{
  "terminal": {
    "blinking": "terminal_controlled"
  }
}
```

3. Always blink the cursor, ignore the terminal mode

```json
{
  "terminal": {
    "blinking": "on"
  }
}
```

### Terminal: Copy On Select

- Description: Whether or not selecting text in the terminal will automatically copy to the system clipboard.
- Setting: `copy_on_select`
- Default: `false`

**Options**

`boolean` values

**Example**

```json
{
  "terminal": {
    "copy_on_select": true
  }
}
```

### Terminal: Env

- Description: Any key-value pairs added to this object will be added to the terminal's environment. Keys must be unique, use `:` to separate multiple values in a single variable
- Setting: `env`
- Default: `{}`

**Example**

```json
{
  "terminal": {
    "env": {
      "ZED": "1",
      "KEY": "value1:value2"
    }
  }
}
```

### Terminal: Font Size

- Description: What font size to use for the terminal. When not set defaults to matching the editor's font size
- Setting: `font_size`
- Default: `null`

**Options**

`integer` values

```json
{
  "terminal": {
    "font_size": 15
  }
}
```

### Terminal: Font Family

- Description: What font to use for the terminal. When not set, defaults to matching the editor's font.
- Setting: `font_family`
- Default: `null`

**Options**

The name of any font family installed on the user's system

```json
{
  "terminal": {
    "font_family": "Berkeley Mono"
  }
}
```

### Terminal: Font Features

- Description: What font features to use for the terminal. When not set, defaults to matching the editor's font features.
- Setting: `font_features`
- Default: `null`
- Platform: macOS and Windows.

**Options**

See Buffer Font Features

```json
{
  "terminal": {
    "font_features": {
      "calt": false
      // See Buffer Font Features for more features
    }
  }
}
```

### Terminal: Line Height

- Description: Set the terminal's line height.
- Setting: `line_height`
- Default: `comfortable`

**Options**

1. Use a line height that's `comfortable` for reading, 1.618. (default)

```json
{
  "terminal": {
    "line_height": "comfortable"
  }
}
```

2. Use a `standard` line height, 1.3. This option is useful for TUIs, particularly if they use box characters

```json
{
  "terminal": {
    "line_height": "standard"
  }
}
```

3. Use a custom line height.

```json
{
  "terminal": {
    "line_height": {
      "custom": 2
    }
  }
}
```

### Terminal: Option As Meta

- Description: Re-interprets the option keys to act like a 'meta' key, like in Emacs.
- Setting: `option_as_meta`
- Default: `false`

**Options**

`boolean` values

```json
{
  "terminal": {
    "option_as_meta": true
  }
}
```

### Terminal: Shell

- Description: What shell to use when launching the terminal.
- Setting: `shell`
- Default: `system`

**Options**

1. Use the system's default terminal configuration (usually the `/etc/passwd` file).

```json
{
  "terminal": {
    "shell": "system"
  }
}
```

2. A program to launch:

```json
{
  "terminal": {
    "shell": {
      "program": "sh"
    }
  }
}
```

3. A program with arguments:

```json
{
  "terminal": {
    "shell": {
      "with_arguments": {
        "program": "/bin/bash",
        "args": "--login"
      }
    }
  }
}
```

## Terminal: Detect Virtual Environments

- Description: Activate the Python Virtual Environment
- Setting: `detect_venv`
- Default:

```json
{
  "terminal": {
    "detect_venv": {
      "on": {
        // Default directories to search for virtual environments, relative
        // to the current working directory. We recommend overriding this
        // in your project's settings, rather than globally.
        "directories": ".env", "env", ".venv", "venv"
        // Can also be `csh`, `fish`, and `nushell`
        "activate_script": "default"
      }
    }
  }
}
```

Disable with:

```json
{
  "terminal": {
    "detect_venv": "off"
  }
}
```

## Terminal: Toolbar

- Description: Whether or not to show various elements in the terminal toolbar.
- Setting: `toolbar`
- Default:

```json
{
  "terminal": {
    "toolbar": {
      "breadcrumbs": true
    }
  }
}
```

**Options**

At the moment, only the `breadcrumbs` option is available, it controls displaying of the terminal title that can be changed via `PROMPT_COMMAND`.

If the terminal title is empty, the breadcrumbs won't be shown.

The shell running in the terminal needs to be configured to emit the title.

Example command to set the title: `echo -e "\e2;New Title\007";`

### Terminal: Button

- Description: Control to show or hide the terminal button in the status bar
- Setting: `button`
- Default: `true`

**Options**

`boolean` values

```json
{
  "terminal": {
    "button": false
  }
}
```

### Terminal: Working Directory

- Description: What working directory to use when launching the terminal.
- Setting: `working_directory`
- Default: `"current_project_directory"`

**Options**

1. Use the current file's project directory. Will Fallback to the first project directory strategy if unsuccessful

```json
{
  "terminal": {
    "working_directory": "current_project_directory"
  }
}
```

2. Use the first project in this workspace's directory. Will fallback to using this platform's home directory.

```json
{
  "terminal": {
    "working_directory": "first_project_directory"
  }
}
```

3. Always use this platform's home directory (if we can find it)

```json
{
  "terminal": {
    "working_directory": "always_home"
  }
}
```

4. Always use a specific directory. This value will be shell expanded. If this path is not a valid directory the terminal will default to this platform's home directory.

```json
{
  "terminal": {
    "working_directory": {
      "always": {
        "directory": "~/zed/projects/"
      }
    }
  }
}
```

## Theme

- Description: The theme setting can be specified in two forms - either as the name of a theme or as an object containing the `mode`, `dark`, and `light` themes for the Zed UI.
- Setting: `theme`
- Default: `One Dark`

### Theme Object

- Description: Specify the theme using an object that includes the `mode`, `dark`, and `light` themes.
- Setting: `theme`
- Default:

```json
"theme": {
  "mode": "system",
  "dark": "One Dark",
  "light": "One Light"
},
```

### Mode

- Description: Specify theme mode.
- Setting: `mode`
- Default: `system`

**Options**

1. Set the theme to dark mode

```json
{
  "mode": "dark"
}
```

2. Set the theme to light mode

```json
{
  "mode": "light"
}
```

3. Set the theme to system mode

```json
{
  "mode": "system"
}
```

### Dark

- Description: The name of the dark Zed theme to use for the UI.
- Setting: `dark`
- Default: `One Dark`

**Options**

Run the `theme selector: toggle` action in the command palette to see a current list of valid themes names.

### Light

- Description: The name of the light Zed theme to use for the UI.
- Setting: `light`
- Default: `One Light`

**Options**

Run the `theme selector: toggle` action in the command palette to see a current list of valid themes names.

## Vim

- Description: Whether or not to enable vim mode (work in progress).
- Setting: `vim_mode`
- Default: `false`

## Project Panel

- Description: Customize project panel
- Setting: `project_panel`
- Default:

```json
{
  "project_panel": {
    "button": true,
    "default_width": 240,
    "dock": "left",
    "entry_spacing": "comfortable",
    "file_icons": true,
    "folder_icons": true,
    "git_status": true,
    "indent_size": 20,
    "auto_reveal_entries": true,
    "auto_fold_dirs": true,
    "scrollbar": {
      "show": null
    },
    "show_diagnostics": "all",
    "indent_guides": {
      "show": "always"
    }
  }
}
```

### Dock

- Description: Control the position of the dock
- Setting: `dock`
- Default: `left`

**Options**

1. Default dock position to left

```json
{
  "dock": "left"
}
```

2. Default dock position to right

```json
{
  "dock": "right"
}
```

### Entry Spacing

- Description: Spacing between worktree entries
- Setting: `entry_spacing`
- Default: `comfortable`

**Options**

1. Comfortable entry spacing

```json
{
  "entry_spacing": "comfortable"
}
```

2. Standard entry spacing

```json
{
  "entry_spacing": "standard"
}
```

### Git Status

- Description: Indicates newly created and updated files
- Setting: `git_status`
- Default: `true`

**Options**

1. Default enable git status

```json
{
  "git_status": true
}
```

2. Default disable git status

```json
{
  "git_status": false
}
```

### Default Width

- Description: Customize default width taken by project panel
- Setting: `default_width`
- Default: `240`

**Options**

`float` values

### Auto Reveal Entries

- Description: Whether to reveal it in the project panel automatically, when a corresponding project entry becomes active. Gitignored entries are never auto revealed.
- Setting: `auto_reveal_entries`
- Default: `true`

**Options**

1. Enable auto reveal entries

```json
{
  "auto_reveal_entries": true
}
```

2. Disable auto reveal entries

```json
{
  "auto_reveal_entries": false
}
```

### Auto Fold Dirs

- Description: Whether to fold directories automatically when directory has only one directory inside.
- Setting: `auto_fold_dirs`
- Default: `true`

**Options**

1. Enable auto fold dirs

```json
{
  "auto_fold_dirs": true
}
```

2. Disable auto fold dirs

```json
{
  "auto_fold_dirs": false
}
```

### Indent Size

- Description: Amount of indentation (in pixels) for nested items.
- Setting: `indent_size`
- Default: `20`

### Indent Guides: Show

- Description: Whether to show indent guides in the project panel.
- Setting: `indent_guides`
- Default:

```json
"indent_guides": {
  "show": "always"
}
```

**Options**

1. Show indent guides in the project panel

```json
{
  "indent_guides": {
    "show": "always"
  }
}
```

2. Hide indent guides in the project panel

```json
{
  "indent_guides": {
    "show": "never"
  }
}
```

### Scrollbar: Show

- Description: Whether to show a scrollbar in the project panel. Possible values: null, "auto", "system", "always", "never". Inherits editor settings when absent, see its description for more details.
- Setting: `scrollbar`
- Default:

```json
"scrollbar": {
  "show": null
}
```

**Options**

1. Show scrollbar in the project panel

```json
{
  "scrollbar": {
    "show": "always"
  }
}
```

2. Hide scrollbar in the project panel

```json
{
  "scrollbar": {
    "show": "never"
  }
}
```

## Assistant Panel

- Description: Customize assistant panel
- Setting: `assistant`
- Default:

```json
"assistant": {
  "version": "2",
  "enabled": true,
  "button": true,
  "dock": "right",
  "default_width": 640,
  "default_height": 320,
  "default_model": {
    "provider": "zed.dev",
    "model": "claude-3-7-sonnet-latest"
  },
  "editor_model": {
    "provider": "zed.dev",
    "model": "claude-3-7-sonnet-latest"
  },
  "single_file_review": true,
}
```

## Outline Panel

- Description: Customize outline Panel
- Setting: `outline_panel`
- Default:

```json
"outline_panel": {
  "button": true,
  "default_width": 300,
  "dock": "left",
  "file_icons": true,
  "folder_icons": true,
  "git_status": true,
  "indent_size": 20,
  "auto_reveal_entries": true,
  "auto_fold_dirs": true,
  "indent_guides": {
    "show": "always"
  },
  "scrollbar": {
    "show": null
  }
}
```

## Calls

- Description: Customize behavior when participating in a call
- Setting: `calls`
- Default:

```json
"calls": {
  // Join calls with the microphone live by default
  "mute_on_join": false,
  // Share your project when you are the first to join a channel
  "share_on_join": false
},
```

## Unnecessary Code Fade

- Description: How much to fade out unused code.
- Setting: `unnecessary_code_fade`
- Default: `0.3`

**Options**

Float values between `0.0` and `0.9`, where:

- `0.0` means no fading (unused code looks the same as used code)
- `0.9` means maximum fading (unused code is very faint but still visible)

**Example**

```json
{
  "unnecessary_code_fade": 0.5
}
```

## UI Font Family

- Description: The name of the font to use for text in the UI.
- Setting: `ui_font_family`
- Default: `Zed Plex Sans`

**Options**

The name of any font family installed on the system.

## UI Font Features

- Description: The OpenType features to enable for text in the UI.
- Setting: `ui_font_features`
- Default:

```json
"ui_font_features": {
  "calt": false
}
```

- Platform: macOS and Windows.

**Options**

Zed supports all OpenType features that can be enabled or disabled for a given UI font, as well as setting values for font features.

For example, to disable font ligatures, add the following to your settings:

```json
{
  "ui_font_features": {
    "calt": false
  }
}
```

You can also set other OpenType features, like setting `cv01` to `7`:

```json
{
  "ui_font_features": {
    "cv01": 7
  }
}
```

## UI Font Fallbacks

- Description: The font fallbacks to use for text in the UI.
- Setting: `ui_font_fallbacks`
- Default: `null`
- Platform: macOS and Windows.

**Options**

For example, to use `Nerd Font` as a fallback, add the following to your settings:

```json
{
  "ui_font_fallbacks": "Nerd Font"
}
```

## UI Font Size

- Description: The default font size for text in the UI.
- Setting: `ui_font_size`
- Default: `16`

**Options**

`integer` values from `6` to `100` pixels (inclusive)

## UI Font Weight

- Description: The default font weight for text in the UI.
- Setting: `ui_font_weight`
- Default: `400`

**Options**

`integer` values between `100` and `900`

## An example configuration:

```json
// ~/.config/zed/settings.json
{
  "theme": "cave-light",
  "tab_size": 2,
  "preferred_line_length": 80,
  "soft_wrap": "none",

  "buffer_font_size": 18,
  "buffer_font_family": "Zed Plex Mono",

  "autosave": "on_focus_change",
  "format_on_save": "off",
  "vim_mode": false,
  "projects_online_by_default": true,
  "terminal": {
    "font_family": "FiraCode Nerd Font Mono",
    "blinking": "off"
  },
  "languages": {
    "C": {
      "format_on_save": "language_server",
      "preferred_line_length": 64,
      "soft_wrap": "preferred_line_length"
    }
  }
}
```

Additional Learning MaterialsConfiguring Languages

Developing Zed - Zed

## Developing Zed

See the platform-specific instructions for building Zed from source:

- macOS
- Linux
- Windows

If you'd like to develop collaboration features, additionally see:

- Local Collaboration

## Keychain access

Zed stores secrets in the system keychain.

However, when running a development build of Zed on macOS (and perhaps other platforms) trying to access the keychain results in a lot of keychain prompts that require entering your password over and over.

On macOS this is caused by the development build not having a stable identity. Even if you choose the "Always Allow" option, the OS will still prompt you for your password again the next time something changes in the binary.

This quickly becomes annoying and impedes development speed.

That is why, by default, when running a development build of Zed an alternative credential provider is used in order to bypass the system keychain.

> Note: This is **only** the case for development builds. For all non-development release channels the system keychain is always used.

If you need to test something out using the real system keychain in a development build, run Zed with the following environment variable set:

```
ZED_DEVELOPMENT_USE_KEYCHAIN=1
```

## Contributor links

- CONTRIBUTING.md
- Releases
- Debugging Crashes
- Code of Conduct
- Zed Contributor License

ZigmacOS

Environment Variables - Zed

## Environment Variables

**\*Note**: The following only applies to Zed 0.152.0 and later.\*

Multiple features in Zed are affected by environment variables:

- Tasks
- Built-in terminal
- Look-up of language servers
- Language servers

In order to make the best use of these features, it's helpful to understand where Zed gets its environment variables from and how they're used.

## Where does Zed get its environment variables from?

How Zed was started — whether it's icon was clicked in the macOS Dock or in a Linux window manager, or whether it was started via the CLI `zed` that comes with Zed — influences which environment variables Zed can use.

### Launched from the CLI

If Zed is opened via the CLI (`zed`), it will inherit the environment variables from the surrounding shell session.

That means if you do

```
$ export MY_ENV_VAR=hello
$ zed .
```

the environment variable `MY_ENV_VAR` is now available inside Zed. For example, in the built-in terminal.

Starting with Zed 0.152.0, the CLI `zed` will _always_ pass along its environment to Zed, regardless of whether a Zed instance was previously running or not. Prior to Zed 0.152.0 this was not the case and only the first Zed instance would inherit the environment variables.

### Launched via window manager, Dock, or launcher

When Zed has been launched via the macOS Dock, or a GNOME or KDE icon on Linux, or an application launcher like Alfred or Raycast, it has no surrounding shell environment from which to inherit its environment variables.

In order to still have a useful environment, Zed spawns a login shell in the user's home directory and gets its environment. This environment is then set on the Zed _process_. That means all Zed windows and projects will inherit that home directory environment.

Since that can lead to problems for users that require different environment variables for a project (because they use `direnv`, or `asdf`, or `mise`, ... in that project), when opening project, Zed spawns another login shell. This time in the project's directory. The environment from that login shell is _not_ set on the process (because that would mean opening a new project changes the environment for all Zed windows). Instead, the environment is stored and passed along when running tasks, opening terminals, or spawning language servers.

## Where and how are environment variables used?

There are two sets of environment variables:

1. Environment variables of the Zed process
2. Environment variables stored per project

The variables from (1) are always used, since they are stored on the process itself and every spawned process (tasks, terminals, language servers, ...) will inherit them by default.

The variables from (2) are used explicitly, depending on the feature.

### Tasks

Tasks are spawned with an combined environment. In order of precedence (low to high, with the last overwriting the first):

- the Zed process environment
- if the project was opened from the CLI: the CLI environment
- if the project was not opened from the CLI: the project environment variables obtained by running a login shell in the project's root folder
- optional, explicitly configured environment in settings

### Built-in terminal

Built-in terminals, like tasks, are spawned with an combined environment. In order of precedence (low to high):

- the Zed process environment
- if the project was opened from the CLI: the CLI environment
- if the project was not opened from the CLI: the project environment variables obtained by running a login shell in the project's root folder
- optional, explicitly configured environment in settings

### Look-up of language servers

For some languages the language server adapters lookup the binary in the user's `$PATH`. Examples:

- Go
- Zig
- Rust (if configured to do so
- C
- TypeScript

For this look-up, Zed uses the following the environment:

- if the project was opened from the CLI: the CLI environment
- if the project was not opened from the CLI: the project environment variables obtained by running a login shell in the project's root folder

### Language servers

After looking up a language server, Zed starts them.

These language server processes always inherit Zed's process environment. But, depending on the language server look-up, additional environment variables might be set or overwrite the process environment.

- If the language server was found in the project environment's `$PATH`, then the project environment's is passed along to the language server process. Where the project environment comes from depends on how the project was opened, via CLI or not. See previous point on look-up of language servers.
- If the language servers was not found in the project environment, Zed tries to install it globally and start it globally. In that case, the process will inherit Zed's process environment, and — if the project was opened via ClI — from the CLI.

Remote DevelopmentREPL

Overview - Zed

## Extensions

Zed lets you add new functionality using user-defined extensions.

- Installing Extensions
- Developing Extensions

  - Developing Language Extensions
  - Developing Themes
  - Developing Icon Themes
  - Developing Slash Commands

Model ImprovementInstalling Extensions

Getting Started - Zed

## Getting Started

Welcome to Zed! We are excited to have you. Here is a jumping-off point to getting started.

## Download Zed

### macOS

Get the latest stable builds via the download page. If you want to download our preview build, you can find it on its releases page

You can also install Zed stable via Homebrew:

```sh
brew install --cask zed
```

As well as Zed preview:

```sh
brew install --cask zed@preview
```

### Linux

For most Linux users, the easiest way to install Zed is through our installation script:

```sh
curl -f https://zed.dev/install.sh | sh
```

If you'd like to help us test our new features, you can also install our preview build:

```sh
curl -f https://zed.dev/install.sh | ZED_CHANNEL=preview sh
```

This script supports `x86_64` and `AArch64`, as well as common Linux distributions: Ubuntu, Arch, Debian, RedHat, CentOS, Fedora, and more.

If Zed is installed using this installation script, it can be uninstalled at any time by running the shell command `zed --uninstall`. The shell will then prompt you whether you'd like to keep your preferences or delete them. After making a choice, you should see a message that Zed was successfully uninstalled.

If this script is insufficient for your use case, you run into problems running Zed, or there are errors in uninstalling Zed, please see our Linux-specific documentation

## Command Palette

The Command Palette is the main way to access pretty much any functionality that's available in Zed. Its keybinding is the first one you should make yourself familiar with. To open it, hit: `cmd-shift-p|ctrl-shift-p`.

!The opened Command Palette

Try it! Open the Command Palette and type in `new file`. You should see the list of commands being filtered down to `workspace: new file`. Hit return and you end up with a new buffer.

Any time you see instructions that include commands of the form `zed: ...` or `editor: ...` and so on that means you need to execute them in the Command Palette.

## Configure Zed

To open your custom settings to set things like fonts, formatting settings, per-language settings, and more, use the `cmd-,|ctrl-,` keybinding.

To see all available settings, open the Command Palette with `cmd-shift-p|ctrl-shift-p` and search for "zed: open default settings". You can also check them all out in the Configuring Zed

## Set up your key bindings

To open your custom keymap to add your key bindings, use the `cmd-k cmd-s|ctrl-k ctrl-s` keybinding.

To access the default key binding set, open the Command Palette with `cmd-shift-p|ctrl-shift-p` and search for "zed: open default keymap". See Key Bindings

System Requirements

Git - Zed

## Git

Zed currently offers a set of fundamental Git features, with support coming in the future for more advanced ones, like conflict resolution tools, line by line staging, and more.

Here's an overview of all currently supported features:

- Committing
- Staging, pushing, pulling, and fetching
- Project Diff: A multibuffer view of all changes
- Diff indicators in buffers and editor scrollbars
- Inline diff toggle and reverts in the editor for unstaged changes
- Git status in the Project Panel
- Branch creating and switching
- Git blame viewing

## Git Panel

The Git Panel gives you a birds-eye view of the state of your working tree and of Git's staging area.

You can open the Git Panel using `git_panel: toggle focus`, or by clicking the Git icon in the status bar.

In the panel you can see the state of your project at a glance—which repository and branch are active, what files have changed and the current staging state of each file.

Zed monitors your repository so that changes you make on the command line are instantly reflected.

## Project Diff

You can see all of the changes captured by Git in Zed by opening the Project Diff (`ctrl-g d|ctrl-g d`), accessible via the `git: diff` action in the Command Palette or the Git Panel.

All of the changes displayed in the Project Diff behave exactly the same as any other multibuffer: they are all editable excerpts of files.

You can stage or unstage each hunk as well as a whole file by hitting the buttons on the tab bar or their corresponding keybindings.

## Fetch, push, and pull

Fetch, push, or pull from your Git repository in Zed via the buttons available on the Git Panel or via the Command Palette by looking at the respective actions: `git: fetch`, `git: push`, and `git: pull`.

## Staging Workflow

Zed has two primary staging workflows, using either the Project Diff or the panel directly.

### Using the Project Diff

In the Project Diff view, you can focus on each hunk and stage them individually by clicking on the tab bar buttons or via the keybindings `git: stage and next` (`cmd-y|alt-y`).

Similarly, stage all hunks at the same time with the `git: stage all` (`cmd-ctrl-y|ctrl-space`) keybinding and then immediately commit with `git: commit` (`cmd-enter|ctrl-enter`).

### Using the Git Panel

From the panel, you can simply type a commit message and hit the commit button, or `git: commit`. This will automatically stage all tracked files (indicated by a `·` in the entry's checkbox) and commit them.

Entries can be staged using each individual entry's checkbox. All changes can be staged using the button at the top of the panel, or `git: stage all`.

## Committing

Zed offers two commit textareas:

1. The first one is available right at the bottom of the Git Panel. Hitting `cmd-enter|ctrl-enter` immediately commits all of your staged changes.
2. The second is available via the action `git: expand commit editor` or via hitting the `shift-escape|` while focused in the Git Panel commit textarea.

### Undoing a Commit

As soon as you commit in Zed, in the Git Panel, you'll see a bar right under the commit textarea, which will show the recently submitted commit. In there, you can reach for the "Uncommit" button, which performs the `git reset HEADˆ--soft` command.

## AI Support in Git

Zed currently supports LLM-powered commit message generation. You can ask AI to generate a commit message by focusing on the message editor within the Git Panel and either clicking on the pencil icon in the bottom left, or reaching for the `git: generate commit message` (`alt-tab|alt-l`) keybinding.

> Note that you need to have an LLM provider configured. Visit the Assistant configuration page

More advanced AI integration with Git features may come in the future.

## Git Integrations

Zed integrates with popular Git hosting services to ensure that Git commit hashes and references to Issues, Pull Requests, and Merge Requests become clickable links.

Zed currently supports links to the hosted versions of GitHub(https://github.com), GitLab(https://gitlab.com), Bitbucket(https://bitbucket.org), SourceHut and Codeberg

Zed also has a Copy Permalink feature to create a permanent link to a code snippet on your Git hosting service. These links are useful for sharing a specific line or range of lines in a file at a specific commit. Trigger this action via the Command Palette, by creating a custom key bindings

## Action Reference

| Action                            | Keybinding         |
| --------------------------------- | ------------------ |
| `git: add`                        | No default binding |
| `git: stage all`                  | `cmd-ctrl-y`       |
| `git: unstage all`                | `cmd-ctrl-shift-y` |
| `git: toggle staged`              | `space`            |
| `git: stage and next`             | `cmd-y`            |
| `git: unstage and next`           | `cmd-shift-y`      |
| `git: commit`                     | `cmd-enter`        |
| `git: expand commit editor`       | `shift-escape`     |
| `git: push`                       | `ctrl-g up`        |
| `git: force push`                 | `ctrl-g shift-up`  |
| `git: pull`                       | `ctrl-g down`      |
| `git: fetch`                      | `ctrl-g ctrl-g`    |
| `git: diff`                       | `ctrl-g d`         |
| `git: restore`                    | `cmd-alt-z`        |
| `git: restore file`               | No default binding |
| `git: branch`                     | No default binding |
| `git: switch`                     | No default binding |
| `git: checkout branch`            | No default binding |
| `editor: toggle git blame`        | `cmd-alt-g b`      |
| `editor: toggle git blame inline` | No default binding |

> Not all actions have default keybindings, but can be bound by customizing your keymap

CollaborationTasks

Icon Themes - Zed

## Icon Themes

Zed comes with a built-in icon theme, with more icon themes available as extensions.

## Selecting an Icon Theme

See what icon themes are installed and preview them via the Icon Theme Selector, which you can open from the command palette with "icon theme selector: toggle".

Navigating through the icon theme list by moving up and down will change the icon theme in real time and hitting enter will save it to your settings file.

## Installing more Icon Themes

More icon themes are available from the Extensions page, which you can access via the command palette with "zed: Extensions" or the Zed website

## Configuring Icon Themes

Your selected icon theme is stored in your settings file. You can open your settings file from the command palette with "zed: open settings" (bound to `cmd-,` on macOS and `ctrl-,` on Linux).

Just like with themes, Zed allows for configuring different icon themes for light and dark mode. You can set the mode to `"light"` or `"dark"` to ignore the current system mode.

```json
{
  "icon_theme": {
    "mode": "system",
    "light": "Light Icon Theme",
    "dark": "Dark Icon Theme"
  }
}
```

## Icon Theme Development

See: Developing Zed Icon Themes

ThemesVim Mode

Key bindings - Zed

## Key bindings

Zed has a very customizable key binding system — you can tweak everything to work exactly how your fingers expect!

## Predefined keymaps

If you're used to a specific editor's defaults you can set a `base_keymap` in your settings file

- VSCode (default)
- Atom
- Emacs (Beta)
- JetBrains
- SublimeText
- TextMate
- None (disables _all_ key bindings)

You can also enable `vim_mode`, which adds vim bindings too.

## User keymaps

Zed reads your keymap from `~/.zed/keymap.json` on MacOS (or `~/.config/zed/keymap.json` on Linux). You can open the file within Zed with `cmd-k cmd-s|ctrl-k ctrl-s`, or via `zed: Open Keymap` in the command palette.

The file contains a JSON array of objects with `"bindings"`. If no `"context"` is set the bindings are always active. If it is set the binding is only active when the context matches

Within each binding section a key sequence(key-bindings.html#keybinding-syntax) is mapped to an action. If conflicts are detected they are resolved as described below

If you are using a non-QWERTY, Latin-character keyboard, you may want to set `use_layout_keys` to `true`. See Non-QWERTY keyboards

For example:

```json

  {
    "bindings": {
      "ctrl-right": "editor::SelectLargerSyntaxNode",
      "ctrl-left": "editor::SelectSmallerSyntaxNode"
    }
  },
  {
    "context": "ProjectPanel && not_editing",
    "bindings": {
      "o": "project_panel::Open"
    }
  }

```

You can see all of Zed's default bindings in the default keymaps for MacOS or Linux

If you want to debug problems with custom keymaps you can use `debug: Open Key Context View` from the command palette. Please file an issue

### Keybinding syntax

Zed has the ability to match against not just a single keypress, but a sequence of keys typed in order. Each key in the `"bindings"` map is a sequence of keypresses separated with a space.

Each keypress is a sequence of modifiers followed by a key. The modifiers are:

- `ctrl-` The control key
- `cmd-`, `win-` or `super-` for the platform modifier (Command on macOS, Windows key on Windows, and the Super key on Linux).
- `alt-` for alt (option on macOS)
- `shift-` The shift key
- `fn-` The function key
- `secondary-` Equivalent to `cmd` when Zed is running on macOS and `ctrl` when on Windows and Linux

The keys can be any single unicode codepoint that your keyboard generates (for example `a`, `0`, `£` or `ç`), or any named key (`tab`, `f1`, `shift`, or `cmd`). If you are using a non-Latin layout (e.g. Cyrillic), you can bind either to the cyrillic character, or the latin character that that key generates with `cmd` pressed.

A few examples:

```json
 "bindings": {
   "cmd-k cmd-s": "zed::OpenKeymap", // matches ⌘-k then ⌘-s
   "space e": "editor::Complete", // type space then e
   "ç": "editor::Complete", // matches ⌥-c
   "shift shift": "file_finder::Toggle", // matches pressing and releasing shift twice
 }
```

The `shift-` modifier can only be used in combination with a letter to indicate the uppercase version. For example `shift-g` matches typing `G`. Although on many keyboards shift is used to type punctuation characters like `(`, the keypress is not considered to be modified and so `shift-(` does not match.

The `alt-` modifier can be used on many layouts to generate a different key. For example on macOS US keyboard the combination `alt-c` types `ç`. You can match against either in your keymap file, though by convention Zed spells this combination as `alt-c`.

It is possible to match against typing a modifier key on its own. For example `shift shift` can be used to implement JetBrains search everywhere shortcut. In this case the binding happens on key release instead of keypress.

### Contexts

If a binding group has a `"context"` key it will be matched against the currently active contexts in Zed.

Zed's contexts make up a tree, with the root being `Workspace`. Workspaces contain Panes and Panels, and Panes contain Editors, etc. The easiest way to see what contexts are active at a given moment is the key context view, which you can get to with `debug: Open Key Context View` in the command palette.

Contexts can contain extra attributes in addition to the name, so that you can (for example) match only in markdown files with `"context": "Editor && extension==md"`. It's worth noting that you can only use attributes at the level they are defined.

For example:

```
## in an editor, it might look like this:
Workspace os=macos keyboard_layout=com.apple.keylayout.QWERTY
  Pane
    Editor mode=full extension=md inline_completion vim_mode=insert

## in the project panel
Workspace os=macos
  Dock
    ProjectPanel not_editing
```

Context expressions can contain the following syntax:

- `X && Y`, `X || Y` to and/or two conditions
- `!X` to negate a condition
- `(X)` for grouping
- `X > Y` to match if a parent in the tree matches X and this layer matches Y.

If you're using Vim mode, we have information on how vim modes influence the context

### Actions

Pretty much all of Zed's functionality is exposed as actions. Although there is no explicitly documented list, you can find most of them by searching in the command palette, by looking in the default keymaps for MacOS or Linux

Most actions do not require any arguments, and so you can bind them as strings: `"ctrl-a": "language_selector::Toggle"`. Some require a single argument, and must be bound as an array: `"cmd-1": "workspace::ActivatePane", 0`. Some actions require multiple arguments, and are bound as an array of a string and an object: `"ctrl-a": "pane::DeploySearch", { "replace_enabled": true }

### Precedence

When multiple keybindings have the same keystroke and are active at the same time, precedence is resolved in two ways:

- Bindings that match on lower nodes in the context tree win. This means that if you have a binding with a context of `Editor` it will take precedence over a binding with a context of `Workspace`. Bindings with no context match at the lowest level in the tree.
- If there are multiple bindings that match at the same level in the tree, then the binding defined later takes precedence. As user keybindings are loaded after system keybindings, this allows user bindings to take precedence over builtin keybindings.

The other kind of conflict that arises is when you have two bindings, one of which is a prefix of the other. For example if you have `"ctrl-w":"editor::DeleteToNextWordEnd"` and `"ctrl-w left":"editor::DeleteToEndOfLine"`.

When this happens, and both bindings are active in the current context, Zed will wait for 1 second after you type `ctrl-w` to see if you're about to type `left`. If you don't type anything, or if you type a different key, then `DeleteToNextWordEnd` will be triggered. If you do, then `DeleteToEndOfLine` will be triggered.

### Non-QWERTY keyboards

As of Zed 0.162.0, Zed has some support for non-QWERTY keyboards on macOS. Better support for non-QWERTY keyboards on Linux is planned.

There are roughly three categories of keyboard to consider:

Keyboards that support full ASCII (QWERTY, DVORAK, COLEMAK, etc.). On these keyboards bindings are resolved based on the character that would be generated by the key. So to type `cmd-`, find the key labeled `` and press it with command.

Keyboards that are mostly non-ASCII, but support full ASCII when the command key is pressed. For example Cyrillic keyboards, Armenian, Hebrew, etc. On these keyboards bindings are resolved based on the character that would be generated by typing the key with command pressed. So to type `ctrl-a`, find the key that generates `cmd-a`. For these keyboards, keyboard shortcuts are displayed in the app using their ASCII equivalents. If the ASCII-equivalents are not printed on your keyboard, you can use the macOS keyboard viewer and holding down the `cmd` key to find things (though often the ASCII equivalents are in a QWERTY layout).

Finally keyboards that support extended Latin alphabets (usually ISO keyboards) require the most support. For example French AZERTY, German QWERTZ, etc. On these keyboards it is often not possible to type the entire ASCII range without option. To ensure that shortcuts _can_ be typed without option, keyboard shortcuts are mapped to "key equivalents" in the same way as macOS

For example on a German QWERTZ keyboard, the `cmd->` shortcut is moved to `cmd-:` because `cmd->` is the system window switcher and this is where that shortcut is typed on a QWERTY keyboard. `cmd-+` stays the same because + is still typeable without option, and as a result, `cmd-` and `cmd-` become `cmd-ö` and `cmd-ä`, moving out of the way of the `+` key.

If you are defining shortcuts in your personal keymap, you can opt into the key equivalent mapping by setting `use_key_equivalents` to `true` in your keymap:

```json
{
  "use_key_equivalents": true,
  "bindings": {
    "ctrl->": "editor::Indent" // parsed as ctrl-: when a German QWERTZ keyboard is active
  }
}
```

## Tips and tricks

### Disabling a binding

If you'd like a given binding to do nothing in a given context you can use `null` as the action. This is useful if you hit the keybinding by accident and want to disable it, or if you want to type the character that would be typed by the sequence, or if you want to disable multikey bindings starting with that key.

```json
{
  "context": "Workspace",
  "bindings": {
    "cmd-r": null // cmd-r will do nothing when the Workspace context is active
  }
}
```

A `null` binding follows the same precedence rules as normal actions. So disables all bindings that would match further up in the tree too. If you'd like a binding that matches further up in the tree to take precedence over a lower binding, you need to rebind it to the action you want in the context you want.

This is useful for preventing Zed from falling back to a default keybinding when the action you specified is conditional and propagates. For example, `buffer_search::DeployReplace` only triggers when the search bar is not in view. If the search bar is in view, it would propagate and trigger the default action set for that binding, such as opening the right dock. To prevent this from happening:

```json

  {
    "context": "Workspace",
    "bindings": {
      "cmd-r": null // cmd-r will do nothing when the search bar is in view
    }
  },
  {
    "context": "Workspace",
    "bindings": {
      "cmd-r": "buffer_search::DeployReplace" // cmd-r will deploy replace when the search bar is not in view
    }
  }

```

### Remapping keys

A common request is to be able to map from a single keystroke to a sequence. You can do this with the `workspace::SendKeystrokes` action.

```json

  {
    "bindings": {
      "alt-down": "workspace::SendKeystrokes", "down down down down"
      "cmd-alt-c":
        "workspace::SendKeystrokes",
        "cmd-shift-p copy relative path enter"
      ,
      "cmd-alt-r": "workspace::SendKeystrokes", "cmd-p README enter"
    }
  },
  {
    "context": "Editor && vim_mode == insert",
    "bindings": {
      "j k": "workspace::SendKeystrokes", "escape"
    }
  }

```

There are some limitations to this, notably:

- Any asynchronous operation will not happen until after all your key bindings have been dispatched. For example this means that while you can use a binding to open a file (as in the `cmd-alt-r` example) you cannot send further keystrokes and hope to have them interpreted by the new view.
- Other examples of asynchronous things are: opening the command palette, communicating with a language server, changing the language of a buffer, anything that hits the network.
- There is a limit of 100 simulated keys at a time.

The argument to `SendKeystrokes` is a space-separated list of keystrokes (using the same syntax as above). Due to the way that keystrokes are parsed, any segment that is not recognized as a keypress will be sent verbatim to the currently focused input field.

If the argument to `SendKeystrokes` contains the binding used to trigger it, it will use the next-highest-precedence definition of that binding. This allows you to extend the default behavior of a key binding.

### Forward keys to terminal

If you're on Linux or Windows, you might find yourself wanting to forward key combinations to the built-in terminal instead of them being handled by Zed.

For example, `ctrl-n` creates a new tab in Zed on Linux. If you want to send `ctrl-n` to the built-in terminal when it's focused, add the following to your keymap:

```json
{
  "context": "Terminal",
  "bindings": {
    "ctrl-n": "terminal::SendKeystroke", "ctrl-n"
  }
}
```

### Task Key bindings

You can also bind keys to launch Zed Tasks defined in your tasks.json. See the tasks documentation

Configuring LanguagesSnippets

All Languages - Zed

## Language Support in Zed

Zed supports hundreds of programming languages and text formats. Some work out-of-the box and others rely on 3rd party extensions.

> The ones included out-of-the-box, natively built into Zed, are marked with \*.

## Languages with Documentation

- Ansible
- AsciiDoc
- Astro
- Bash
- Biome
- C
- C++
- C#
- Clojure
- CSS
- Dart
- Deno
- Diff
- Docker
- Elixir
- Elm
- Emmet
- Erlang
- Fish
- GDScript
- Gleam
- GLSL
- Go
- Groovy
- Haskell
- Helm
- HTML
- Java
- JavaScript
- Julia
- JSON
- Jsonnet
- Kotlin
- Lua
- Luau
- Makefile
- Markdown
- Nim
- OCaml
- PHP
- Prisma
- Proto
- PureScript
- Python
- R
- Rego
- ReStructuredText
- Racket
- Roc
- Ruby
- Rust
- Scala
- Scheme
- Shell Script
- Svelte
- Swift
- Tailwind CSS
- Terraform
- TOML
- TypeScript
- Uiua
- Vue
- XML
- YAML
- Yara
- Yarn
- Zig

## Additional Community Language Extensions

- Ada
- Aiken
- Amber
- Assembly
- AWK
- Beancount
- Bend
- Blade
- Blueprint
- BQN
- Brainfuck
- Cadence
- Cairo
- Cap'n Proto
- Cedar
- CFEngine policy language
- CSV
- Cucumber/Gherkin
- CUE
- Curry
- D
- Database Markup Language (DBML)
- Earthfile
- EJS template
- Elisp
- Ember
- Env
- Exograph
- Fortran
- F#
- Gemini gemtext
- Git Firefly
- GraphQL
- Groq
- INI
- Java
- Justfiles
- LaTeX
- Ledger
- Less
- LilyPond
- Liquid
- Log
- Lox
- Markdown Oxide
- Marksman
- Matlab
- Meson
- Navi
- NeoCMake
- Nginx
- Nim
- Nix
- Noir
- Nu
- Odin
- Pact
- Pest
- PICA200 assembly
- Pkl
- PlaydateSDK
- QML
- Rainbow CSV
- Rego
- Rescript
- Roclang
- Ron
- Metals
- SCSS
- Slim
- Slint
- Smithy
- Solidity
- SQL
- Strace
- Swift
- Templ
- Tmux
- Twig
- Typst
- Unison
- UnoCSS
- Vlang
- Vala
- Vale
- Verilog
- VHS
- Wgsl
- WIT

Context Server ExtensionsAnsible

Linux - Zed

## Zed on Linux

## Standard Installation

For most people we recommend using the script on the download

```sh
curl -f https://zed.dev/install.sh | sh
```

We also offer a preview build of Zed which receives updates about a week ahead of stable. You can install it with:

```sh
curl -f https://zed.dev/install.sh | ZED_CHANNEL=preview sh
```

The Zed installed by the script works best on systems that:

- have a Vulkan compatible GPU available (for example Linux on an M-series macBook)
- have a system-wide glibc (NixOS and Alpine do not by default)

  - x86_64 (Intel/AMD): glibc version &gt;= 2.31 (Ubuntu 20 and newer)
  - aarch64 (ARM): glibc version &gt;= 2.35 (Ubuntu 22 and newer)

Both Nix and Alpine have third-party Zed packages available (though they are currently a few weeks out of date). If you'd like to use our builds they do work if you install a glibc compatibility layer. On NixOS you can try nix-ld, and on Alpine gcompat

You will need to build from source for:

- architectures other than 64-bit Intel or 64-bit ARM (for example a 32-bit or RISC-V machine)
- Redhat Enterprise Linux 8.x, Rocky Linux 8, AlmaLinux 8, Amazon Linux 2 on all architectures
- Redhat Enterprise Linux 9.x, Rocky Linux 9.3, AlmaLinux 8, Amazon Linux 2023 on aarch64 (x86_x64 OK)

## Other ways to install Zed on Linux

Zed is open source, and you can install from source

### Installing via a package manager

There are several third-party Zed packages for various Linux distributions and package managers, sometimes under `zed-editor`. You may be able to install Zed using these packages:

- Flathub: `dev.zed.Zed`
- Arch: `zed`
- Arch (AUR): `zed-git`(https://aur.archlinux.org/packages/zed-git), `zed-preview`, `zed-preview-bin`
- Alpine: `zed` (aarch64(https://pkgs.alpinelinux.org/package/edge/testing/aarch64/zed)) (x86_64
- Nix: `zed-editor` (unstable
- Fedora/Ultramarine (Terra): `zed`(https://github.com/terrapkg/packages/tree/frawhide/anda/devs/zed/stable), `zed-preview`, `zed-nightly`
- Solus: `zed`
- Parabola: `zed`
- Manjaro: `zed`
- ALT Linux (Sisyphus): `zed`
- AOSC OS: `zed`
- openSUSE Tumbleweed: `zed`
- Please add others to this list!

When installing a third-party package please be aware that it may not be completely up to date and may be slightly different from the Zed we package (a common change is to rename the binary to `zedit` or `zeditor` to avoid conflicting with other packages).

We'd love your help making Zed available for everyone. If Zed is not yet available for your package manager, and you would like to fix that, we have some notes on how to do it

### Downloading manually

If you'd prefer, you can install Zed by downloading our pre-built .tar.gz. This is the same artifact that our install script uses, but you can customize the location of your installation by modifying the instructions below:

Download the `.tar.gz` file:

- zed-linux-x86_64.tar.gz (preview
- zed-linux-aarch64.tar.gz (preview

Then ensure that the `zed` binary in the tarball is on your path. The easiest way is to unpack the tarball and create a symlink:

```sh
mkdir -p ~/.local
## extract zed to ~/.local/zed.app/
tar -xvf <path/to/download>.tar.gz -C ~/.local
## link the zed binary to ~/.local/bin (or another directory in your $PATH)
ln -sf ~/.local/zed.app/bin/zed ~/.local/bin/zed
```

If you'd like integration with an XDG-compatible desktop environment, you will also need to install the `.desktop` file:

```sh
cp ~/.local/zed.app/share/applications/zed.desktop ~/.local/share/applications/dev.zed.Zed.desktop
sed -i "s|Icon=zed|Icon=$HOME/.local/zed.app/share/icons/hicolor/512x512/apps/zed.png|g" ~/.local/share/applications/dev.zed.Zed.desktop
sed -i "s|Exec=zed|Exec=$HOME/.local/zed.app/libexec/zed-editor|g" ~/.local/share/applications/dev.zed.Zed.desktop
```

## Uninstalling Zed

### Standard Uninstall

If Zed was installed using the default installation script, it can be uninstalled by supplying the `--uninstall` flag to the `zed` shell command

```sh
zed --uninstall
```

If there are no errors, the shell will then prompt you whether you'd like to keep your preferences or delete them. After making a choice, you should see a message that Zed was successfully uninstalled.

In the case that the `zed` shell command was not found in your PATH, you can try one of the following commands

```sh
$HOME/.local/bin/zed --uninstall
```

or

```sh
$HOME/.local/zed.app/bin.zed --uninstall
```

The first case might fail if a symlink was not properly established between `$HOME/.local/bin/zed` and `$HOME/.local/zed.app/bin.zed`. But the second case should work as long as Zed was installed to its default location.

If Zed was installed to a different location, you must invoke the `zed` binary stored in that installation directory and pass the `--uninstall` flag to it in the same format as the previous commands.

### Package Manager

If Zed was installed using a package manager, please consult the documentation for that package manager on how to uninstall a package.

## Troubleshooting

Linux works on a large variety of systems configured in many different ways. We primarily test Zed on a vanilla Ubuntu setup, as it is the most common distribution our users use, that said we do expect it to work on a wide variety of machines.

### Zed fails to start

If you see an error like "/lib64/libc.so.6: version 'GLIBC_2.29' not found" it means that your distribution's version of glibc is too old. You can either upgrade your system, or install Zed from source

### Graphics issues

### Zed fails to open windows

Zed requires a GPU to run effectively. Under the hood, we use Vulkan

If you see a notification saying `Zed failed to open a window: NoSupportedDeviceFound` this means that Vulkan cannot find a compatible GPU. You can begin troubleshooting Vulkan by installing the `vulkan-tools` package and running:

```sh
vkcube
```

This should output a line describing your current graphics setup and show a rotating cube. If this does not work, you should be able to fix it by installing Vulkan compatible GPU drivers, however in some cases (for example running Linux on an Arm-based MacBook) there is no Vulkan support yet.

You can find out which graphics card Zed is using by looking in the Zed log (`~/.local/share/zed/logs/Zed.log`) for `Using GPU: ...`.

If you see errors like `ERROR_INITIALIZATION_FAILED` or `GPU Crashed` or `ERROR_SURFACE_LOST_KHR` then you may be able to work around this by installing different drivers for your GPU, or by selecting a different GPU to run on. (See #14225

On some systems the file `/etc/prime-discrete` can be used to enforce the use of a discrete GPU using PRIME

On others, you may be able to the environment variable `DRI_PRIME=1` when running Zed to force the use of the discrete GPU.

If you're using an AMD GPU and Zed crashes when selecting long lines, try setting the `ZED_PATH_SAMPLE_COUNT=0` environment variable. (See #26143 If you're using an AMD GPU, you might get a 'Broken Pipe' error. Try using the RADV or Mesa drivers. (See #13880

If you are using Mesa, and want more control over which GPU is selected you can run `MESA_VK_DEVICE_SELECT=list zed --foreground` to get a list of available GPUs and then export `MESA_VK_DEVICE_SELECT=xxxx:yyyy` to choose a specific device.

If you are using `amdvlk` you may find that zed only opens when run with `sudo $(which zed)`. To fix this, remove the `amdvlk` and `lib32-amdvlk` packages and install mesa/vulkan instead. (#14141.

For more information, the Arch guide to Vulkan

If Vulkan is configured correctly, and Zed is still not working for you, please file an issue

### I can't open any files

### Clicking links isn't working

These features are provided by XDG desktop portals, specifically:

- `org.freedesktop.portal.FileChooser`
- `org.freedesktop.portal.OpenURI`

Some window managers, such as `Hyprland`, don't provide a file picker by default. See this list

### Zed isn't remembering my API keys

### Zed isn't remembering my login

These feature also requires XDG desktop portals, specifically:

- `org.freedesktop.portal.Secret` or
- `org.freedesktop.Secrets`

Zed needs a place to securely store secrets such as your Zed login cookie or your OpenAI API Keys and we use a system provided keychain to do this. Examples of packages that provide this are `gnome-keyring`, `KWallet` and `keepassxc` among others.

### Could not start inotify

Zed relies on inotify to watch your filesystem for changes. If you cannot start inotify then Zed will not work reliably.

If you are seeing "too many open files" then first try `sysctl fs.inotify`.

- You should see that max_user_instances is 128 or higher (you can change the limit with `sudo sysctl fs.inotify.max_user_instances=1024`). Zed needs only 1 inotify instance.
- You should see that `max_user_watches` is 8000 or higher (you can change the limit with `sudo sysctl fs.inotify.max_user_watches=64000`). Zed needs one watch per directory in all your open projects + one per git repository + a handful more for settings, themes, keymaps, extensions.

It is also possible that you are running out of file descriptors. You can check the limits with `ulimit` and update them by editing `/etc/security/limits.conf`.

### No sound or wrong output device

If you're not hearing any sound in Zed or the audio is routed to the wrong device, it could be due to a mismatch between audio systems. Zed relies on ALSA, while your system may be using PipeWire or PulseAudio. To resolve this, you need to configure ALSA to route audio through PipeWire/PulseAudio.

If your system uses PipeWire:

1. **Install the PipeWire ALSA plugin**

   On Debian-based systems, run:

   ```bash
   sudo apt install pipewire-alsa
   ```

2. **Configure ALSA to use PipeWire**

   Add the following configuration to your ALSA settings file. You can use either `~/.asoundrc` (user-level) or `/etc/asound.conf` (system-wide):

   ```bash
   pcm.!default {
       type pipewire
   }

   ctl.!default {
       type pipewire
   }
   ```

3. **Restart your system**

AccountsWindows

Model Improvement - Zed

## Zed Model Improvement

## Zed Assistant

When using the Zed Assistant, Zed does not persistently store user content or use user content for training of its models.

When using upstream services through Zed AI, we require similar assurances from our service providers. For example, usage of Anthropic Claude 3.5 via Zed AI in the Assistant is governed by the Anthropic Commercial Terms

> "Anthropic may not train models on Customer Content from paid Services."

When you directly connect the Zed Assistant with a non Zed AI service (e.g. via API key) Zed does not have access to your user content. Users should reference their agreement with the service provider to understand what terms and conditions apply.

## Zed Edit Predictions

By default, when using Zed Edit Predictions, Zed does not persistently store user content or use user content for training of its models.

### Opt-in

Users who are working on open source licensed projects may optionally opt-in to providing model improvement feedback. This opt-in occurs on a per-project basis. If you work on multiple open source projects and wish to provide model improvement feedback you will have to opt-in for each individual project.

When working on other projects where you haven't opted-in, Zed will not persistently store user content or use user content for training of its models.

You can see exactly how Zed detects open source licenses in: license_detection.rs

### Exclusions

Zed will intentionally exclude certain files from Predictive Edits entirely, even when you have opted-in to model improvement feedback.

You can inspect this exclusion list by opening `zed: open default settings` from the command palette:

```json
{
  "edit_predictions": {
    // A list of globs representing files that edit predictions should be disabled for.
    // There's a sensible default list of globs already included.
    // Any addition to this list will be merged with the default list.
    "disabled_globs":
      "**/.env*",
      "**/*.pem",
      "**/*.key",
      "**/*.cert",
      "**/*.crt",
      "**/secrets.yml"

  }
}
```

Users may explicitly exclude additional paths and/or file extensions by adding them to `edit_predictions.disabled_globs`

```json
{
  "edit_predictions": {
    "disabled_globs": "secret_dir/*", "**/*.log"
  }
}
```

### Data we collect

For open source projects where you have opted-in, Zed may store copies of requests and responses to the Zed AI Prediction service.

This data includes:

- the edit prediction
- a portion of the buffer content around the cursor
- a few recent edits
- the current buffer outline
- diagnostics (errors, warnings, etc) from language servers

### Data Handling

Collected data is stored in Snowflake, a private database where we track other metrics. We periodically review this data to select training samples for inclusion in our model training dataset. We ensure any included data is anonymized and contains no sensitive information (access tokens, user IDs, email addresses, etc). This training dataset is publicly available at: huggingface.co/datasets/zed-industries/zeta

### Model Output

We then use this training dataset to fine-tune Qwen2.5-Coder-7B and make the resulting model available at huggingface.co/zed-industries/zeta

## Applicable terms

Please see the Zed Terms of Service

Model Context ProtocolOverview

Multibuffers - Zed

## Multibuffers

One of the superpowers Zed gives you is the ability to edit multiple files simultaneously. When combined with multiple cursors, this makes wide-ranging refactors significantly faster.

## Editing in a multibuffer

Editing a multibuffer is the same as editing a normal file. Changes you make will be reflected in the open copies of that file in the rest of the editor, and you can save all files with `editor: Save` (bound to `cmd-s` on macOS, `ctrl-s` on Windows/Linux, or `:w` in Vim mode).

When in a multibuffer, it is often useful to use multiple cursors to edit every file simultaneously. If you want to edit a few instances, you can select them with the mouse (`option-click` on macOS, `alt-click` on Window/Linux) or the keyboard. `cmd-d` on macOS, `ctrl-d` on Windows/Linux, or `gl` in Vim mode will select the next match of the word under the cursor.

When you want to edit all matches you can select them by running the `editor: Select All Matches` command (`cmd-shift-l` on macOS, `ctrl-shift-l` on Windows/Linux, or `g a` in Vim mode).

## Navigating to the Source File

While you can easily edit files in a multibuffer, navigating directly to the source file is often beneficial. You can accomplish this by clicking on any of the divider lines between excerpts or by placing your cursor in an excerpt and executing the `editor: open excerpts` command. It’s key to note that if multiple cursors are being used, the command will open the source file positioned under each cursor within the multibuffer.

Additionally, if you prefer to use the mouse and would like to double-click on an excerpt to open it, you can enable this functionality with the setting: `"double_click_in_multibuffer": "open"`.

## Project search

To start a search run the `pane: Toggle Search` command (`cmd-shift-f` on macOS, `ctrl-shift-f` on Windows/Linux, or `g/` in Vim mode). After the search has completed, the results will be shown in a new multibuffer. There will be one excerpt for each matching line across the whole project.

## Diagnostics

If you have a language server installed, the diagnostics pane can show you all errors across your project. You can open it by clicking on the icon in the status bar, or running the `diagnostics: Deploy` command`('cmd-shift-m` on macOS, `ctrl-shift-m` on Windows/Linux, or `:clist` in Vim mode).

## Find References

If you have a language server installed, you can find all references to the symbol under the cursor with the `editor: Find References` command (`cmd-click` on macOS, `ctrl-click` on Windows/Linux, or `g A` in Vim mode.

Depending on your language server, commands like `editor: Go To Definition` and `editor: Go To Type Definition` will also open a multibuffer if there are multiple possible definitions.

Vim ModeOutline Panel

Outline Panel - Zed

## Outline Panel

In addition to the modal outline (`cmd-shift-o`), Zed offers an outline panel. The outline panel can be deployed via `cmd-shift-b` (`outline panel: toggle focus` via the command palette), or by clicking the `Outline Panel` button in the status bar.

When viewing a "singleton" buffer (i.e., a single file on a tab), the outline panel works similarly to that of the outline modal－it displays the outline of the current buffer's symbols, as reported by tree-sitter. Clicking on an entry allows you to jump to the associated section in the file. The outline view will also automatically scroll to the section associated with the current cursor position within the file.

!Using the outline panel in a singleton buffer

## Usage with multibuffers

The outline panel truly excels when used with multi-buffers. Here are some examples of its versatility:

### Project Search Results

Get an overview of search results across your project.

!Using the outline panel in a project search multi-buffer

### Project Diagnostics

View a summary of all errors and warnings reported by the language server.

!Using the outline panel while viewing project diagnostics multi-buffer

### Find All References

Quickly navigate through all references when using the `editor: find all references` action.

!Using the outline panel while viewing find all references multi-buffer

The outline view provides a great way to quickly navigate to specific parts of your code and helps you maintain context when working with large result sets in multi-buffers.

MultibuffersCode Completions

Remote Development - Zed

## Remote Development

Remote Development allows you to code at the speed of thought, even when your codebase is not on your local machine. You use Zed locally so the UI is immediately responsive, but offload heavy computation to the development server so that you can work effectively.

## Overview

Remote development requires two computers, your local machine that runs the Zed UI and the remote server which runs a Zed headless server. The two communicate over SSH, so you will need to be able to SSH from your local machine into the remote server to use this feature.

!Architectural overview of Zed Remote Development

On your local machine, Zed runs its UI, talks to language models, uses Tree-sitter to parse and syntax-highlight code, and store unsaved changes and recent projects. The source code, language servers, tasks, and the terminal all run on the remote server.

> **Note:** The original version of remote development sent traffic via Zed's servers. As of Zed v0.157 you can no-longer use that mode.

## Setup

1. Download and install the latest Zed
2. Use `ctrl-cmd-o|alt-ctrl-shift-o` to open the "Remote Projects" dialog.
3. Click "Connect New Server" and enter the command you use to SSH into the server. See Supported SSH options
4. Your local machine will attempt to connect to the remote server using the `ssh` binary on your path. Assuming the connection is successful, Zed will download the server on the remote host and start it.
5. Once the Zed server is running, you will be prompted to choose a path to open on the remote server.

   > **Note:** Zed does not currently handle opening very large directories (for example, `/` or `~` that may have &gt;100,000 files) very well. We are working on improving this, but suggest in the meantime opening only specific projects, or subfolders of very large mono-repos.

For simple cases where you don't need any SSH arguments, you can run `zed ssh://<user>@<host>:<port>/<path>` to open a remote folder/file directly. If you'd like to hotlink into an SSH project, use a link of the format: `zed://ssh/<user>@<host>:<port>/<path>`.

## Supported platforms

The remote machine must be able to run Zed's server. The following platforms should work, though note that we have not exhaustively tested every Linux distribution:

- macOS Catalina or later (Intel or Apple Silicon)
- Linux (x86_64 or arm64, we do not yet support 32-bit platforms)
- Windows is not yet supported.

## Configuration

The list of remote servers is stored in your settings file `cmd-,|ctrl-,`. You can edit this list using the Remote Projects dialog `ctrl-cmd-o|alt-ctrl-shift-o`, which provides some robustness - for example it checks that the connection can be established before writing it to the settings file.

```json
{
  "ssh_connections": {
    "host": "192.168.1.10",
    "projects": { "paths": "~/code/zed/zed" }
  }
}
```

Zed shells out to the `ssh` on your path, and so it will inherit any configuration you have in `~/.ssh/config` for the given host. That said, if you need to override anything you can configure the following additional options on each connection:

```json
{
  "ssh_connections":
    {
      "host": "192.168.1.10",
      "projects": { "paths": "~/code/zed/zed" }
      // any argument to pass to the ssh master process
      "args": "-i", "~/.ssh/work_id_file"
      "port": 22, // defaults to 22
      // defaults to your username on your local machine
      "username": "me"
    }

}
```

There are two additional Zed-specific options per connection, `upload_binary_over_ssh` and `nickname`:

```json
{
  "ssh_connections":
    {
      "host": "192.168.1.10",
      "projects": { "paths": "~/code/zed/zed" }
      // by default Zed will download the server binary from the internet on the remote.
      // When this is true, it'll be downloaded to your laptop and uploaded over SSH.
      // This is useful when your remote server has restricted internet access.
      "upload_binary_over_ssh": true,
      // Shown in the Zed UI to help distinguish multiple hosts.
      "nickname": "lil-linux"
    }

}
```

If you use the command line to open a connection to a host by doing `zed ssh://192.168.1.10/~/.vimrc`, then extra options are read from your settings file by finding the first connection that matches the host/username/port of the URL on the command line.

Additionally it's worth noting that while you can pass a password on the command line `zed ssh://user:password@host/~`, we do not support writing a password to your settings file. If you're connecting repeatedly to the same host, you should configure key-based authentication.

## Port forwarding

If you'd like to be able to connect to ports on your remote server from your local machine, you can configure port forwarding in your settings file. This is particularly useful for developing websites so you can load the site in your browser while working.

```json
{
  "ssh_connections": {
    "host": "192.168.1.10",
    "port_forwards": { "local_port": 8080, "remote_port": 80 }
  }
}
```

This will cause requests from your local machine to `localhost:8080` to be forwarded to the remote machine's port 80. Under the hood this uses the `-L` argument to ssh.

By default these ports are bound to localhost, so other computers in the same network as your development machine cannot access them. You can set the local_host to bind to a different interface, for example, 0.0.0.0 will bind to all local interfaces.

```json
{
  "ssh_connections": {
    "host": "192.168.1.10",
    "port_forwards": {
      "local_port": 8080,
      "remote_port": 80,
      "local_host": "0.0.0.0"
    }
  }
}
```

These ports also default to the `localhost` interface on the remote host. If you need to change this, you can also set the remote host:

```json
{
  "ssh_connections": {
    "host": "192.168.1.10",
    "port_forwards": {
      "local_port": 8080,
      "remote_port": 80,
      "remote_host": "docker-host"
    }
  }
}
```

## Zed settings

When opening a remote project there are three relevant settings locations:

- The local Zed settings (in `~/.zed/settings.json` on macOS or `~/.config/zed/settings.json` on Linux) on your local machine.
- The server Zed settings (in the same place) on the remote server.
- The project settings (in `.zed/settings.json` or `.editorconfig` of your project)

Both the local Zed and the server Zed read the project settings, but they are not aware of the other's main `settings.json`.

Depending on the kind of setting you want to make, which settings file you should use:

- Project settings should be used for things that affect the project: indentation settings, which formatter / language server to use, etc.
- Server settings should be used for things that affect the server: paths to language servers, etc.
- Local settings should be used for things that affect the UI: font size, etc.

## Initializing the remote server

Once you provide the SSH options, Zed shells out to `ssh` on your local machine to create a ControlMaster connection with the options you provide.

Any prompts that SSH needs will be shown in the UI, so you can verify host keys, type key passwords, etc.

Once the master connection is established, Zed will check to see if the remote server binary is present in `~/.zed_server` on the remote, and that its version matches the current version of Zed that you're using.

If it is not there or the version mismatches, Zed will try to download the latest version. By default, it will download from `https://zed.dev` directly, but if you set: `{"upload_binary_over_ssh":true}` in your settings for that server, it will download the binary to your local machine and then upload it to the remote server.

If you'd like to maintain the server binary yourself you can. You can either download our prebuilt versions from Github, or build your own

## Maintaining the SSH connection

Once the server is initialized. Zed will create new SSH connections (reusing the existing ControlMaster) to run the remote development server.

Each connection tries to run the development server in proxy mode. This mode will start the daemon if it is not running, and reconnect to it if it is. This way when your connection drops and is restarted, you can continue to work without interruption.

In the case that reconnecting fails, the daemon will not be re-used. That said, unsaved changes are by default persisted locally, so that you do not lose work. You can always reconnect to the project at a later date and Zed will restore unsaved changes.

If you are struggling with connection issues, you should be able to see more information in the Zed log `cmd-shift-p Open Log`. If you are seeing things that are unexpected, please file a GitHub issue or reach out in the #remoting-feedback channel in the Zed Discord

## Supported SSH Options

Under the hood, Zed shells out to the `ssh` binary to connect to the remote server. We create one SSH control master per project, and use then use that to multiplex SSH connections for the Zed protocol itself, any terminals you open and tasks you run. We read settings from your SSH config file, but if you want to specify additional options to the SSH control master you can configure Zed to set them.

When typing in the "Connect New Server" dialog, you can use bash-style quoting to pass options containing a space. Once you have created a server it will be added to the `"ssh_connections":

Supported options:

- `-p` / `-l` - these are equivalent to passing the port and the username in the host string.
- `-L` / `-R` for port forwarding
- `-i` - to use a specific key file
- `-o` - to set custom options
- `-J` / `-w` - to proxy the SSH connection
- `-F` for specifying an `ssh_config`
- And also... `-4`, `-6`, `-A`, `-B`, `-C`, `-D`, `-I`, `-K`, `-P`, `-X`, `-Y`, `-a`, `-b`, `-c`, `-i`, `-k`, `-l`, `-m`, `-o`, `-p`, `-w`, `-x`, `-y`

Note that we deliberately disallow some options (for example `-t` or `-T`) that Zed will set for you.

## Known Limitations

- Zed extensions are not yet supported on remotes, so languages that need them for support do not work.
- You can't open files from the remote Terminal by typing the `zed` command.

## Feedback

Please join the #remoting-feedback channel in the Zed Discord

TasksEnvironment Variables

REPL - Zed

## REPL

## Getting started

Bring the power of Jupyter kernels

## Installation

Zed supports running code in multiple languages. To get started, you need to install a kernel for the language you want to use.

**Currently supported languages:**

- Python (ipykernel)
- TypeScript (Deno)
- R (Ark)
- R (Xeus)
- Julia
- Scala (Almond)

Once installed, you can start using the REPL in the respective language files, or other places those languages are supported, such as Markdown. If you recently added the kernels, run the `repl: refresh kernelspecs` command to make them available in the editor.

## Using the REPL

To start the REPL, open a file with the language you want to use and use the `repl: run` command (defaults to `ctrl-shift-enter` on macOS) to run a block, selection, or line. You can also click on the REPL icon in the toolbar.

The `repl: run` command will be executed on your selection(s), and the result will be displayed below the selection.

Outputs can be cleared with the `repl: clear outputs` command, or from the REPL menu in the toolbar.

### Cell mode

Zed supports notebooks as scripts

The `repl: run` command will run each block of code between the `# %%` markers as a separate cell.

```python
## %% Cell 1
import time
import numpy as np

## %% Cell 2
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')
```

## Language specific instructions

### Python

#### Global environment

On macOS, your system Python will _not_ work. Either set up pyenv

To setup your current Python to have an available kernel, run:

```sh
pip install ipykernel
python -m ipykernel install --user
```

#### Conda Environment

```sh
source activate myenv
conda install ipykernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"
```

#### Virtualenv with pip

```sh
source activate myenv
pip install ipykernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"
```

### R (Ark Kernel)

Install Ark

```sh
ark --install
```

### R (Xeus Kernel)

- Install Xeus-R
- Install the R Extension for Zed (search for `R` in Zed Extensions)

### Typescript: Deno

- Install Deno

```sh
deno jupyter --install
```

### Julia

- Download and install Julia from the official website
- Install the Julia Extension for Zed (search for `Julia` in Zed Extensions)

### Scala

- Install Scala

  - `brew install coursier/formulas/coursier && cs setup`

- REPL (Almond) setup instructions

  - `brew install --cask temurin` (Eclipse foundation official OpenJDK binaries)
  - `brew install coursier/formulas/coursier && cs setup`
  - `coursier launch --use-bootstrap almond -- --install`

## Changing which kernel is used per language

Zed automatically detects the available kernels on your system. If you need to configure a different default kernel for a language, you can assign a kernel for any supported language in your `settings.json`.

```json
{
  "jupyter": {
    "kernel_selections": {
      "python": "conda-env",
      "typescript": "deno",
      "javascript": "deno",
      "r": "ark"
    }
  }
}
```

## Debugging Kernelspecs

Available kernels are shown via the `repl: sessions` command. To refresh the kernels you can run, use the `repl: refresh kernelspecs` command.

If you have `jupyter` installed, you can run `jupyter kernelspec list` to see the available kernels.

```sh
$ jupyter kernelspec list
Available kernels:
  ark                   /Users/z/Library/Jupyter/kernels/ark
  conda-base            /Users/z/Library/Jupyter/kernels/conda-base
  deno                  /Users/z/Library/Jupyter/kernels/deno
  python-chatlab-dev    /Users/z/Library/Jupyter/kernels/python-chatlab-dev
  python3               /Users/z/Library/Jupyter/kernels/python3
  ruby                  /Users/z/Library/Jupyter/kernels/ruby
  rust                  /Users/z/Library/Jupyter/kernels/rust
```

> Note: Zed makes best effort usage of `sys.prefix` and `CONDA_PREFIX` to find kernels in Python environments. If you want explicitly control run `python -m ipykernel install --user --name myenv --display-name "Python (myenv)"` to install the kernel directly while in the environment.

Environment VariablesOverview

Snippets - Zed

## Snippets

Use the `snippets: configure snippets` action to create a new snippets file or edit a existing snippets file for a specified scope

The snippets are located in `~/.config/zed/snippets` directory to which you can navigate to with the `snippets: open folder` action.

## Example configuration

```json
{
  // Each snippet must have a name and body, but the prefix and description are optional.
  // The prefix is used to trigger the snippet, but when omitted then the name is used.
  // Use placeholders like $1, $2 or ${1:defaultValue} to define tab stops.
  // The $0 determines the final cursor position.
  // Placeholders with the same value are linked.
  "Log to console": {
    "prefix": "log",
    "body": "console.info(\"Hello, ${1:World}!\")", "$0"
    "description": "Logs to console"
  }
}
```

## Scopes

The scope is determined by the language name in lowercase e.g. `python.json` for Python, `shell script.json` for Shell Script, but there are some exceptions to this rule:

| Scope      | Filename        |
| ---------- | --------------- |
| Global     | snippets.json   |
| JSX        | javascript.json |
| Plain Text | plaintext.json  |

To create JSX snippets you have to use `javascript.json` snippets file, instead of `jsx.json`, but this does not apply to TSX and Typescript which follow the above rule.

## Known Limitations

- Only the first prefix is used when an list of prefixes is passed in.
- Currently only the `json` snippet file format is supported, even though the `simple-completion-language-server` supports both `json` and `toml` file formats.

## See also

For more configuration information, see the `simple-completion-language-server` instructions

Key bindingsThemes

System Requirements - Zed

## System Requirements

## Apple

### macOS

Zed supports the follow macOS releases:

| Version       | Codename | Apple Status   | Zed Status          |
| ------------- | -------- | -------------- | ------------------- |
| macOS 15.x    | Sequoia  | Supported      | Supported           |
| macOS 14.x    | Sonoma   | Supported      | Supported           |
| macOS 13.x    | Ventura  | Supported      | Supported           |
| macOS 12.x    | Monterey | EOL 2024-09-16 | Supported           |
| macOS 11.x    | Big Sur  | EOL 2023-09-26 | Partially Supported |
| macOS 10.15.x | Catalina | EOL 2022-09-12 | Partially Supported |
| macOS 10.14.x | Mojave   | EOL 2021-10-25 | Unsupported         |

The macOS releases labelled "Partially Supported" (Big Sur and Catalina) do not support screen sharing via Zed Collaboration. These features use the LiveKit SDK which relies upon ScreenCaptureKit.framework

### Mac Hardware

Zed supports machines with Intel (x86_64) or Apple (aarch64) processors that meet the above macOS requirements:

- MacBook Pro (Early 2015 and newer)
- MacBook Air (Early 2015 and newer)
- MacBook (Early 2016 and newer)
- Mac Mini (Late 2014 and newer)
- Mac Pro (Late 2013 or newer)
- iMac (Late 2015 and newer)
- iMac Pro (all models)
- Mac Studio (all models)

## Linux

Zed supports 64bit Intel/AMD (x86_64) and 64Bit ARM (aarch64) processors.

Zed requires a Vulkan 1.3 driver, and the following desktop portals:

- `org.freedesktop.portal.FileChooser`
- `org.freedesktop.portal.OpenURI`
- `org.freedesktop.portal.Secret`, or `org.freedesktop.Secrets`

## Windows

Not yet available as an official download. Can be built from source

## Web

Not supported at this time. See our Platform Support issue

Getting StartedAccounts

Tasks - Zed

## Tasks

Zed supports ways to spawn (and rerun) commands using its integrated terminal to output the results. These commands can read a limited subset of Zed state (such as a path to the file currently being edited or selected text).

```json

  {
    "label": "Example task",
    "command": "for i in {1..5}; do echo \"Hello $i/5\"; sleep 1; done",
    //"args":
    // Env overrides for the command, will be appended to the terminal's environment from the settings.
    "env": { "foo": "bar" },
    // Current working directory to spawn the command into, defaults to current project root.
    //"cwd": "/path/to/working/directory",
    // Whether to use a new terminal tab or reuse the existing one to spawn the process, defaults to `false`.
    "use_new_terminal": false,
    // Whether to allow multiple instances of the same task to be run, or rather wait for the existing ones to finish, defaults to `false`.
    "allow_concurrent_runs": false,
    // What to do with the terminal pane and tab, after the command was started:
    // * `always` — always show the task's pane, and focus the corresponding tab in it (default)
    // * `no_focus` — always show the task's pane, add the task's tab in it, but don't focus it
    // * `never` — do not alter focus, but still add/reuse the task's tab in its pane
    "reveal": "always",
    // What to do with the terminal pane and tab, after the command has finished:
    // * `never` — Do nothing when the command finishes (default)
    // * `always` — always hide the terminal tab, hide the pane also if it was the last tab in it
    // * `on_success` — hide the terminal tab on task success only, otherwise behaves similar to `always`
    "hide": "never",
    // Which shell to use when running a task inside the terminal.
    // May take 3 values:
    // 1. (default) Use the system's default terminal configuration in /etc/passwd
    //      "shell": "system"
    // 2. A program:
    //      "shell": {
    //        "program": "sh"
    //      }
    // 3. A program with arguments:
    //     "shell": {
    //         "with_arguments": {
    //           "program": "/bin/bash",
    //           "args": "--login"
    //         }
    //     }
    "shell": "system",
    // Whether to show the task line in the output of the spawned task, defaults to `true`.
    "show_summary": true,
    // Whether to show the command line in the output of the spawned task, defaults to `true`.
    "show_output": true,
    // Represents the tags for inline runnable indicators, or spawning multiple tasks at once.
    "tags":
  }

```

There are two actions that drive the workflow of using tasks: `task: spawn` and `task: rerun`. `task: spawn` opens a modal with all available tasks in the current file. `task: rerun` reruns the most recently spawned task. You can also rerun tasks from the task modal.

By default, rerunning tasks reuses the same terminal (due to the `"use_new_terminal": false` default) but waits for the previous task to finish before starting (due to the `"allow_concurrent_runs": false` default).

Keep `"use_new_terminal": false` and set `"allow_concurrent_runs": true` to allow cancelling previous tasks on rerun.

## Task templates

Tasks can be defined:

- in the global `tasks.json` file; such tasks are available in all Zed projects you work on. This file is usually located in `~/.config/zed/tasks.json`. You can edit them by using the `zed: open tasks` action.
- in the worktree-specific (local) `.zed/tasks.json` file; such tasks are available only when working on a project with that worktree included. You can edit worktree-specific tasks by using the `zed: open project tasks` action.
- on the fly with oneshot tasks
- by language extension.

## Variables

Zed tasks act just like your shell; that also means that you can reference environmental variables via sh-esque `$VAR_NAME` syntax. A couple of additional environmental variables are set for your convenience. These variables allow you to pull information from the current editor and use it in your tasks. The following variables are available:

- `ZED_COLUMN`: current line column
- `ZED_ROW`: current line row
- `ZED_FILE`: absolute path of the currently opened file (e.g. `/Users/my-user/path/to/project/src/main.rs`)
- `ZED_FILENAME`: filename of the currently opened file (e.g. `main.rs`)
- `ZED_DIRNAME`: absolute path of the currently opened file with file name stripped (e.g. `/Users/my-user/path/to/project/src`)
- `ZED_RELATIVE_FILE`: path of the currently opened file, relative to `ZED_WORKTREE_ROOT` (e.g. `src/main.rs`)
- `ZED_STEM`: stem (filename without extension) of the currently opened file (e.g. `main`)
- `ZED_SYMBOL`: currently selected symbol; should match the last symbol shown in a symbol breadcrumb (e.g. `mod tests > fn test_task_contexts`)
- `ZED_SELECTED_TEXT`: currently selected text
- `ZED_WORKTREE_ROOT`: absolute path to the root of the current worktree. (e.g. `/Users/my-user/path/to/project`)
- `ZED_CUSTOM_RUST_PACKAGE`: (Rust-specific) name of the parent package of $ZED_FILE source file.

To use a variable in a task, prefix it with a dollar sign (`$`):

```json
{
  "label": "echo current file's path",
  "command": "echo $ZED_FILE"
}
```

You can also use verbose syntax that allows specifying a default if a given variable is not available: `${ZED_FILE:default_value}`

These environmental variables can also be used in tasks' `cwd`, `args`, and `label` fields.

### Variable Quoting

When working with paths containing spaces or other special characters, please ensure variables are properly escaped.

For example, instead of this (which will fail if the path has a space):

```json
{
  "label": "stat current file",
  "command": "stat $ZED_FILE"
}
```

Provide the following:

```json
{
  "label": "stat current file",
  "command": "stat",
  "args": "$ZED_FILE"
}
```

Or explicitly include escaped quotes like so:

```json
{
  "label": "stat current file",
  "command": "stat \"$ZED_FILE\""
}
```

## Oneshot tasks

The same task modal opened via `task: spawn` supports arbitrary bash-like command execution: type a command inside the modal text field, and use `opt-enter` to spawn it.

The task modal persists these ad-hoc commands for the duration of the session, `task: rerun` will also rerun such tasks if they were the last ones spawned.

You can also adjust the currently selected task in a modal (`tab` is the default key binding). Doing so will put its command into a prompt that can then be edited &amp; spawned as a oneshot task.

### Ephemeral tasks

You can use the `cmd` modifier when spawning a task via a modal; tasks spawned this way will not have their usage count increased (thus, they will not be respawned with `task: rerun` and they won't have a high rank in the task modal). The intended use of ephemeral tasks is to stay in the flow with continuous `task: rerun` usage.

## Custom keybindings for tasks

You can define your own keybindings for your tasks via an additional argument to `task::Spawn`. If you wanted to bind the aforementioned `echo current file's path` task to `alt-g`, you would add the following snippet in your `keymap.json`

```json
{
  "context": "Workspace",
  "bindings": {
    "alt-g": "task::Spawn", { "task_name": "echo current file's path" }
  }
}
```

Note that these tasks can also have a 'target' specified to control where the spawned task should show up. This could be useful for launching a terminal application that you want to use in the center area:

```json
// In tasks.json
{
  "label": "start lazygit",
  "command": "lazygit -p $ZED_WORKTREE_ROOT"
}
```

```json
// In keymap.json
{
  "context": "Workspace",
  "bindings": {
    "alt-g":
      "task::Spawn",
      { "task_name": "start lazygit", "reveal_target": "center" }

  }
}
```

## Binding runnable tags to task templates

Zed supports overriding the default action for inline runnable indicators via workspace-local and global `tasks.json` file with the following precedence hierarchy:

1. Workspace `tasks.json`
2. Global `tasks.json`
3. Language-provided tag bindings (default).

To tag a task, add the runnable tag name to the `tags` field on the task template:

```json
{
  "label": "echo current file's path",
  "command": "echo $ZED_FILE",
  "tags": "rust-test"
}
```

In doing so, you can change which task is shown in the runnables indicator.

## Keybindings to run tasks bound to runnables

When you have a task definition that is bound to the runnable, you can quickly run it using Code Actions

GitRemote Development

Telemetry - Zed

## Telemetry in Zed

Zed collects anonymous telemetry data to help the team understand how people are using the application and to see what sort of issues they are experiencing.

## Configuring Telemetry Settings

You have full control over what data is sent out by Zed. To enable or disable some or all telemetry types, open your `settings.json` file via `zed: open settings`(`cmd-,|ctrl-,`) from the command palette.

Insert and tweak the following:

```json
"telemetry": {
    "diagnostics": false,
    "metrics": false
},
```

The telemetry settings can also be configured via the welcome screen, which can be invoked via the `workspace: welcome` action in the command palette.

## Dataflow

Telemetry is sent from the application to our servers. Data is proxied through our servers to enable us to easily switch analytics services. We currently use:

- Axiom
- Snowflake
- Metabase

## Types of Telemetry

### Diagnostics

Diagnostic events include debug information (stack traces) from crash reports. Reports are sent on the first application launch after the crash occurred. We've built dashboards that allow us to visualize the frequency and severity of issues experienced by users. Having these reports sent automatically allows us to begin implementing fixes without the user needing to file a report in our issue tracker. The plots in the dashboards also give us an informal measurement of the stability of Zed.

You can see what data is sent when a panic occurs by inspecting the `Panic` struct in crates/telemetry_events/src/telemetry_events.rs in the Zed repo. You can find additional information in the Debugging Crashes

### Usage Data (Metrics)

To improve Zed and understand how it is being used in the wild, Zed optionally collects usage data like the following:

- (a) file extensions of opened files;
- (b) features and tools You use within the Editor;
- (c) project statistics (e.g., number of files); and
- (d) frameworks detected in Your projects

Usage Data does not include any of Your software code or sensitive project details. Metric events are reported over HTTPS, and requests are rate-limited to avoid using significant network bandwidth.

Usage Data is associated with a secure random telemetry ID which may be linked to Your email address. This linkage currently serves two purposes: (1) it allows Zed to analyze usage patterns over time while maintaining Your privacy; and (2) it enables Zed to reach out to specific user groups for feedback and improvement suggestions.

You can audit the metrics data that Zed has reported by running the command `zed: open telemetry log` from the command palette, or clicking `Help > View Telemetry Log` in the application menu.

You can see the full list of the event types and exactly the data sent for each by inspecting the `Event` enum and the associated structs in crates/telemetry_events/src/telemetry_events.rs

## Concerns and Questions

If you have concerns about telemetry, please feel free to open an issue

WindowsWorkspace Persistence

Themes - Zed

## Themes

Zed comes with a number of built-in themes, with more themes available as extensions.

## Selecting a Theme

See what themes are installed and preview them via the Theme Selector, which you can open from the command palette with "theme selector: Toggle" (bound to `cmd-k cmd-t` on macOS and `ctrl-k ctrl-t` on Linux).

Navigating through the theme list by moving up and down will change the theme in real time and hitting enter will save it to your settings file.

## Installing more Themes

More themes are available from the Extensions page, which you can access via the command palette with "zed: Extensions" or the Zed website

Many popular themes have been ported to Zed, and if you're struggling to choose one, visit zed-themes.com

## Configuring a Theme

Your selected theme is stored in your settings file. You can open your settings file from the command palette with "zed: Open Settings" (bound to `cmd-,` on macOS and `ctrl-,` on Linux).

By default, Zed maintains two themes: one for light mode and one for dark mode. You can set the mode to `"dark"` or `"light"` to ignore the current system mode.

```json
{
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  }
}
```

## Theme Overrides

To override specific attributes of a theme, use the `experimental.theme_overrides` setting.

For example, add the following to your `settings.json` if you wish to to override the background color of the editor and display comments and doc comments as italics:

```json
{
  "experimental.theme_overrides": {
    "editor.background": "#333",
    "syntax": {
      "comment": {
        "font_style": "italic"
      },
      "comment.doc": {
        "font_style": "italic"
      }
    }
  }
}
```

To see a comprehensive list of list of captures (like `comment` and `comment.doc`) see: Language Extensions: Syntax highlighting

To see a list of available theme attributes look at the JSON file for your theme. For example, assets/themes/one/one.json

## Local Themes

Store new themes locally by placing them in the `~/.config/zed/themes` directory.

For example, to create a new theme called `my-cool-theme`, create a file called `my-cool-theme.json` in that directory. It will be available in the theme selector the next time Zed loads.

Find more themes at zed-themes.com

## Theme Development

See: Developing Zed Themes

SnippetsIcon Themes

Vim Mode - Zed

## Vim Mode

Zed includes a Vim emulation layer known as "vim mode". , you will learn how to turn Zed's vim mode on or off, what tools and commands Zed provides to help you navigate and edit your code, and generally how to make the most of vim mode in Zed.

You'll learn how to:

- Understand the core differences between Zed's vim mode and traditional Vim
- Enable or disable vim mode
- Make the most of Zed-specific features within vim mode
- Customize vim mode key bindings
- Configure vim mode settings

Whether you're new to vim mode or an experienced Vim user looking to optimize your Zed experience, this guide will help you harness the full power of modal editing in Zed.

## Zed's vim mode design

Vim mode tries to offer a familiar experience to Vim users: it replicates the behavior of motions and commands precisely when it makes sense and uses Zed-specific functionality to provide an editing experience that "just works" without requiring configuration on your part.

This includes support for semantic navigation, multiple cursors, or other features usually provided by plugins like surrounding text.

So, Zed's vim mode does not replicate Vim one-to-one, but it meshes Vim's modal design with Zed's modern features to provide a more fluid experience. It's also configurable, so you can add your own key bindings or override the defaults.

### Core differences

There are four types of features in vim mode that use Zed's core functionality, leading to some differences in behavior:

1. **Motions**: vim mode uses Zed's semantic parsing to tune the behavior of motions per language. For example, in Rust, jumping to matching bracket with `%` works with the pipe character `|`. In JavaScript, `w` considers `$` to be a word character.
2. **Visual block selections**: vim mode uses Zed's multiple cursor to emulate visual block selections, making block selections a lot more flexible. For example, anything you insert after a block selection updates on every line in real-time, and you can add or remove cursors anytime.
3. **Macros**: vim mode uses Zed's recording system for vim macros. So, you can capture and replay more complex actions, like autocompletion.
4. **Search and replace**: vim mode uses Zed's search system, so, the syntax for regular expressions is slightly different compared to Vim. Head to the Regex differences section

> **Note:** The foundations of Zed's vim mode should already cover many use cases, and we're always looking to improve it. If you find missing features that you rely on in your workflow, please file an issue on GitHub

## Enabling and disabling vim mode

When you first open Zed, you'll see a checkbox on the welcome screen that allows you to enable vim mode.

If you missed this, you can toggle vim mode on or off anytime by opening the command palette and using the workspace command `toggle vim mode`.

> **Note**: This command toggles the following property in your user settings:
>
> ```json
> {
>   "vim_mode": true
> }
> ```

## Zed-specific features

Zed is built on a modern foundation that (among other things) uses tree-sitter and language servers to understand the content of the file you're editing and supports multiple cursors out of the box.

Vim mode has several "core Zed" key bindings that will help you make the most of Zed's specific feature set.

### Language server

The following commands use the language server to help you navigate and refactor your code.

| Command                                  | Default Shortcut |
| ---------------------------------------- | ---------------- |
| Go to definition                         | `g d`            |
| Go to declaration                        | `g D`            |
| Go to type definition                    | `g y`            |
| Go to implementation                     | `g I`            |
| Rename (change definition)               | `c d`            |
| Go to All references to the current word | `g A`            |
| Find symbol in current file              | `g s`            |
| Find symbol in entire project            | `g S`            |
| Go to next diagnostic                    | `g ` or ` d`     |
| Go to previous diagnostic                | `g ` or ` d`     |
| Show inline error (hover)                | `g h`            |
| Open the code actions menu               | `g .`            |

### Git

| Command                         | Default Shortcut |
| ------------------------------- | ---------------- |
| Go to next git change           | ` c`             |
| Go to previous git change       | ` c`             |
| Expand diff hunk                | `d o`            |
| Toggle staged                   | `d O`            |
| Stage and next (in diff view)   | `d u`            |
| Unstage and next (in diff view) | `d U`            |
| Restore change                  | `d p`            |

### Treesitter

Treesitter is a powerful tool that Zed uses to understand the structure of your code. Zed provides motions that change the current cursor position, and text objects that can be used as the target of actions.

| Command                         | Default Shortcut        |
| ------------------------------- | ----------------------- |
| Go to next/previous method      | ` m` / ` m`             |
| Go to next/previous method end  | ` M` / ` M`             |
| Go to next/previous section     | ` ` / ` `               |
| Go to next/previous section end | ` ` / `                 |
| Go to next/previous comment     | ` /`, ` *` / ` /`, ` *` |
| Select a larger syntax node     | ` x`                    |
| Select a smaller syntax node    | ` x`                    |

| Text Objects                                               | Default Shortcut |
| ---------------------------------------------------------- | ---------------- |
| Around a class, definition, etc.                           | `a c`            |
| Inside a class, definition, etc.                           | `i c`            |
| Around a function, method etc.                             | `a f`            |
| Inside a function, method, etc.                            | `i f`            |
| A comment                                                  | `g c`            |
| An argument, or list item, etc.                            | `i a`            |
| An argument, or list item, etc. (including trailing comma) | `a a`            |
| Around an HTML-like tag                                    | `a t`            |
| Inside an HTML-like tag                                    | `i t`            |
| The current indent level, and one line before and after    | `a I`            |
| The current indent level, and one line before              | `a i`            |
| The current indent level                                   | `i i`            |

Note that the definitions for the targets of the `m` family of motions are the same as the boundaries defined by `af`. The targets of the ``are the same as those defined by`ac`, though if there are no classes, then functions are also used. Similarly `gc`is used to find` /`. `g c`

The definition of functions, classes and comments is language dependent, and support can be added to extensions by adding a \`textobjects.scm`. The definition of arguments and tags operates at the tree-sitter level, but looks for certain patterns in the parse tree and is not currently configurable per language.

### Multi cursor

These commands help you manage multiple cursors in Zed.

| Command                                                      | Default Shortcut |
| ------------------------------------------------------------ | ---------------- |
| Add a cursor selecting the next copy of the current word     | `g l`            |
| Add a cursor selecting the previous copy of the current word | `g L`            |
| Skip latest word selection, and add next                     | `g >`            |
| Skip latest word selection, and add previous                 | `g <`            |
| Add a visual selection for every copy of the current word    | `g a`            |

### Pane management

These commands open new panes or jump to specific panes.

| Command                                    | Default Shortcut   |
| ------------------------------------------ | ------------------ |
| Open a project-wide search                 | `g /`              |
| Open the current search excerpt            | `g <space>`        |
| Open the current search excerpt in a split | `<ctrl-w> <space>` |
| Go to definition in a split                | `<ctrl-w> g d`     |
| Go to type definition in a split           | `<ctrl-w> g D`     |

### In insert mode

The following commands help you bring up Zed's completion menu, request a suggestion from GitHub Copilot, or open the inline AI assistant without leaving insert mode.

| Command                                                                      | Default Shortcut |
| ---------------------------------------------------------------------------- | ---------------- |
| Open the completion menu                                                     | `ctrl-x ctrl-o`  |
| Request GitHub Copilot suggestion (requires GitHub Copilot to be configured) | `ctrl-x ctrl-c`  |
| Open the inline AI assistant (requires a configured assistant)               | `ctrl-x ctrl-a`  |
| Open the code actions menu                                                   | `ctrl-x ctrl-l`  |
| Hides all suggestions                                                        | `ctrl-x ctrl-z`  |

### Supported plugins

Zed's vim mode includes some features that are usually provided by very popular plugins in the Vim ecosystem:

- You can surround text objects with `ys` (yank surround), change surrounding with `cs`, and delete surrounding with `ds`.
- You can comment and uncomment selections with `gc` in visual mode and `gcc` in normal mode.
- The project panel supports many shortcuts modeled after the Vim plugin `netrw`: navigation with `hjkl`, open file with `o`, open file in a new tab with `t`, etc.
- You can add key bindings to your keymap to navigate "camelCase" names. Head down to the Optional key bindings
- You can use `gR` to do ReplaceWithRegister
- You can use `cx` for vim-exchange functionality. Note that it does not have a default binding in visual mode, but you can add one to your keymap (refer to the optional key bindings
- You can navigate to indent depths relative to your cursor with the indent wise plugin `-`, `-`, `+`, `+`, `=`, `
- You can select quoted text with AnyQuotes and bracketed text with AnyBrackets text objects. Zed also provides MiniQuotes and MiniBrackets which offer alternative selection behavior based on the mini.ai Neovim plugin. See the Quote and Bracket text objects
- You can configure AnyQuotes, AnyBrackets, MiniQuotes, and MiniBrackets text objects for selecting quoted and bracketed text using different selection strategies. See the Any Bracket Functionality

### Any Bracket Functionality

Zed offers two different strategies for selecting text surrounded by any quote, or any bracket. These text objects are **not enabled by default** and must be configured in your keymap to be used.

#### Included Characters

Each text object type works with specific characters:

| Text Object              | Characters                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------ |
| AnyQuotes/MiniQuotes     | Single quote (`'`), Double quote (`"`), Backtick (`` ` ``)                           |
| AnyBrackets/MiniBrackets | Parentheses (`()`), Square brackets (``), Curly braces (`{}`), Angle brackets (`<>`) |

Both "Any" and "Mini" variants work with the same character sets, but differ in their selection strategy.

#### AnyQuotes and AnyBrackets (Traditional Vim behavior)

These text objects implement traditional Vim behavior:

- **Selection priority**: Finds the innermost (closest) quotes or brackets first
- **Fallback mechanism**: If none are found, falls back to the current line
- **Character-based matching**: Focuses solely on open and close characters without considering syntax
- **Vanilla Vim similarity**: AnyBrackets matches the behavior of commands like `ci<`, `ci(`, etc., in vanilla Vim, including potential edge cases (like considering `>` in `=>` as a closing delimiter)

#### MiniQuotes and MiniBrackets (mini.ai behavior)

These text objects implement the behavior of the mini.ai

- **Selection priority**: Searches the current line first before expanding outward
- **Tree-sitter integration**: Uses Tree-sitter queries for more context-aware selections
- **Syntax-aware matching**: Can distinguish between actual brackets and similar characters in other contexts (like `>` in `=>`)

#### Choosing Between Approaches

- Use **AnyQuotes/AnyBrackets** if you:

  - Prefer traditional Vim behavior
  - Want consistent character-based selection prioritizing innermost delimiters
  - Need behavior that closely matches vanilla Vim's text objects

- Use **MiniQuotes/MiniBrackets** if you:

  - Prefer the mini.ai plugin behavior
  - Want more context-aware selections using Tree-sitter
  - Prefer current-line priority when searching

#### Example Configuration

To use these text objects, you need to add bindings to your keymap. Here's an example configuration that makes them available when using text object operators (`i` and `a`) or change-surrounds (`cs`):

```json
{
  "context": "vim_operator == a || vim_operator == i || vim_operator == cs",
  "bindings": {
    // Traditional Vim behavior
    "q": "vim::AnyQuotes",
    "b": "vim::AnyBrackets",

    // mini.ai plugin behavior
    "Q": "vim::MiniQuotes",
    "B": "vim::MiniBrackets"
  }
}
```

With this configuration, you can use commands like:

- `cib` - Change inside brackets using AnyBrackets behavior
- `cim` - Change inside brackets using MiniBrackets behavior
- `ciq` - Change inside quotes using AnyQuotes behavior
- `ciM` - Change inside quotes using MiniQuotes behavior

## Command palette

Vim mode allows you to open Zed's command palette with `:`. You can then type to access any usual Zed command. Additionally, vim mode adds aliases for popular Vim commands to ensure your muscle memory transfers to Zed. For example, you can write `:w` or `:write` to save the file.

Below, you'll find tables listing the commands you can use in the command palette. We put optional characters in square brackets to indicate that you can omit them.

> **Note**: We don't emulate the full power of Vim's command line yet. In particular, commands currently do not support arguments. Please file issues on GitHub

### File and window management

This table shows commands for managing windows, tabs, and panes. As commands don't support arguments currently, you cannot specify a filename when saving or creating a new file.

| Command     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `:write!`   | Save the current file                                |
| `:wq!`      | Save the file and close the buffer                   |
| `:quit!`    | Close the buffer                                     |
| `:wall!`    | Save all open files                                  |
| `:wqall!`   | Save all open files and close all buffers            |
| `:qall!`    | Close all buffers                                    |
| `:exit!`    | Close the buffer                                     |
| `:update`   | Save the current file                                |
| `:cq`       | Quit completely (close all running instances of Zed) |
| `:vsplit`   | Split the pane vertically                            |
| `:split`    | Split the pane horizontally                          |
| `:new`      | Create a new file in a horizontal split              |
| `:vnew`     | Create a new file in a vertical split                |
| `:tabedit`  | Create a new file in a new tab                       |
| `:tabnew`   | Create a new file in a new tab                       |
| `:tabnext`  | Go to the next tab                                   |
| `:tabprev`  | Go to previous tab                                   |
| `:tabclose` | Close the current tab                                |
| `:ls`       | Show all buffers                                     |

> **Note:** The `!` character is used to force the command to execute without saving changes or prompting before overwriting a file.

### Ex commands

These ex commands open Zed's various panels and windows.

| Command                      | Default Shortcut |
| ---------------------------- | ---------------- |
| Open the project panel       | `:Explore`       |
| Open the collaboration panel | `:Collab`        |
| Open the chat panel          | `:Chat`          |
| Open the AI panel            | `:AI`            |
| Open the git panel           | `:Git`           |
| Open the notifications panel | `:Notif`         |
| Open the feedback window     | `:feedback`      |
| Open the diagnostics window  | `:clist`         |
| Open the terminal            | `:term`          |
| Open the extensions window   | `:Extensions`    |

### Navigating diagnostics

These commands navigate diagnostics.

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `:cnext` or `:lnext` | Go to the next diagnostic      |
| `:cprev` or `:lprev` | Go to the previous diagnostics |
| `:cc` or `:ll`       | Open the errors page           |

### Git

These commands interact with the version control system git.

| Command       | Description                                             |
| ------------- | ------------------------------------------------------- |
| `:diffupdate` | View the diff under the cursor (`d o` in normal mode)   |
| `:revert`     | Revert the diff under the cursor (`d p` in normal mode) |

### Jump

These commands jump to specific positions in the file.

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `:<number>`         | Jump to a line number               |
| `:$`                | Jump to the end of the file         |
| `:/foo` and `:?foo` | Jump to next/prev line matching foo |

### Replacement

This command replaces text. It emulates the substitute command in vim. The substitute command uses regular expressions, and Zed uses a slightly different syntax than vim. You can learn more about Zed's syntax below, in the regex differences section

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `:ranges/foo/bar/g` | Replace instances of foo with bar |

### Editing

These commands help you edit text.

| Command     | Description             |
| ----------- | ----------------------- |
| `:join`     | Join the current line   |
| `:deletelp` | Delete the current line |

| `:sort i
| `:yank` | Yank (copy) the current selection or line |

### Set

These commands modify editor options locally for the current buffer.

| Command | Description |
| ------- | ----------- |

| `:set no
| `:set nonumber
| `:set norelativenumber

### Command mnemonics

As any Zed command is available, you may find that it's helpful to remember mnemonics that run the correct command. For example:

- `:diffs` for "toggle all hunk diffs"
- `:cpp` for "copy path to file"
- `:crp` for "copy relative path"
- `:reveal` for "reveal in finder"
- `:zlog` for "open zed log"
- `:clank` for "cancel language server work"

## Customizing key bindings

In this section, we'll learn how to customize the key bindings of Zed's vim mode. You'll learn:

- How to select the correct context for your new key bindings.
- Useful contexts for vim mode key bindings.
- Common key bindings to customize for extra productivity.

### Selecting the correct context

Zed's key bindings are evaluated only when the `"context"` property matches your location in the editor. For example, if you add key bindings to the `"Editor"` context, they will only work when you're editing a file. If you add key bindings to the `"Workspace"` context, they will work everywhere in Zed. Here's an example of a key binding that saves when you're editing a file:

```json
{
  "context": "Editor",
  "bindings": {
    "ctrl-s": "file::Save"
  }
}
```

Contexts are nested, so when you're editing a file, the context is the `"Editor"` context, which is inside the `"Pane"` context, which is inside the `"Workspace"` context. That's why any key bindings you add to the `"Workspace"` context will work when you're editing a file. Here's an example:

```json
// This key binding will work when you're editing a file. It comes built into Zed by default as the workspace: save command.
{
  "context": "Workspace",
  "bindings": {
    "ctrl-s": "file::Save"
  }
}
```

Contexts are expressions. They support boolean operators like `&&` (and) and `||` (or). For example, you can use the context `"Editor && vim_mode == normal"` to create key bindings that only work when you're editing a file _and_ you're in vim's normal mode.

Vim mode adds several contexts to the `"Editor"` context:

| Operator             | Description                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------ | --- | -------------------------------------------------------------- |
| VimControl           | Indicates that vim keybindings should work. Currently an alias for `vim_mode == normal                                                                          |     | vim_mode == visual |     | vim_mode == operator`, but the definition may change over time |
| vim_mode == normal   | Normal mode                                                                                                                                                     |
| vim_mode == visual   | Visual mode                                                                                                                                                     |
| vim_mode == insert   | Insert mode                                                                                                                                                     |
| vim_mode == replace  | Replace mode                                                                                                                                                    |
| vim_mode == waiting  | Waiting for an arbitrary key (e.g., after typing `f` or `t`)                                                                                                    |
| vim_mode == operator | Waiting for another binding to trigger (e.g., after typing `c` or `d`)                                                                                          |
| vim_operator         | Set to `none` unless `vim_mode == operator`, in which case it is set to the current operator's default keybinding (e.g., after typing `d`, `vim_operator == d`) |

> **Note**: Contexts are matched only on one level at a time. So it is possible to use the expression `"Editor && vim_mode == normal"`, but `"Workspace && vim_mode == normal"` will never match because we set the vim context at the `"Editor"` level.

### Useful contexts for vim mode key bindings

Here's a template with useful vim mode contexts to help you customize your vim mode key bindings. You can copy it and integrate it into your user keymap.

```json

  {
    "context": "VimControl && !menu",
    "bindings": {
      // Put key bindings here if you want them to work in normal & visual mode.
    }
  },
  {
    "context": "vim_mode == normal && !menu",
    "bindings": {
      // "shift-y": "workspace::SendKeystrokes", "y $"
    }
  },
  {
    "context": "vim_mode == insert",
    "bindings": {
      // "j k": "vim::NormalBefore" // In insert mode, make jk escape to normal mode.
    }
  },
  {
    "context": "EmptyPane || SharedScreen",
    "bindings": {
      // Put key bindings here (in addition to the context above) if you want them to
      // work when no editor exists.
      // "space f": "file_finder::Toggle"
    }
  }

```

> **Note**: If you would like to emulate Vim's `map` commands (`nmap`, etc.), you can use the action `workspace::SendKeystrokes` in the correct context.

### Optional key bindings

By default, you can navigate between the different files open in the editor with shortcuts like `ctrl+w` followed by one of `hjkl` to move to the left, down, up, or right, respectively.

But you cannot use the same shortcuts to move between all the editor docks (the terminal, project panel, assistant panel, ...). If you want to use the same shortcuts to navigate to the docks, you can add the following key bindings to your user keymap.

```json
{
  "context": "Dock",
  "bindings": {
    "ctrl-w h": "workspace::ActivatePaneLeft",
    "ctrl-w l": "workspace::ActivatePaneRight",
    "ctrl-w k": "workspace::ActivatePaneUp",
    "ctrl-w j": "workspace::ActivatePaneDown"
    // ... or other keybindings
  }
}
```

Subword motion, which allows you to navigate and select individual words in camelCase or snake_case, is not enabled by default. To enable it, add these bindings to your keymap.

```json
{
  "context": "VimControl && !menu && vim_mode != operator",
  "bindings": {
    "w": "vim::NextSubwordStart",
    "b": "vim::PreviousSubwordStart",
    "e": "vim::NextSubwordEnd",
    "g e": "vim::PreviousSubwordEnd"
  }
}
```

Vim mode comes with shortcuts to surround the selection in normal mode (`ys`), but it doesn't have a shortcut to add surrounds in visual mode. By default, `shift-s` substitutes the selection (erases the text and enters insert mode). To use `shift-s` to add surrounds in visual mode, you can add the following object to your keymap.

```json
{
  "context": "vim_mode == visual",
  "bindings": {
    "shift-s": "vim::PushAddSurrounds", {}
  }
}
```

In non-modal text editors, cursor navigation typically wraps when moving past line ends. Zed, however, handles this behavior exactly like Vim by default: the cursor stops at line boundaries. If you prefer your cursor to wrap between lines, override these keybindings:

```json
// In VimScript, this would look like this:
// set whichwrap+=<,>,,,h,l
{
  "context": "VimControl && !menu",
  "bindings": {
    "left": "vim::WrappingLeft",
    "right": "vim::WrappingRight",
    "h": "vim::WrappingLeft",
    "l": "vim::WrappingRight"
  }
}
```

The Sneak motion

```json
{
  "context": "vim_mode == normal || vim_mode == visual",
  "bindings": {
    "s": "vim::PushSneak",
    "shift-s": "vim::PushSneakBackward"
  }
}
```

The vim-exchange

```json
{
  "context": "vim_mode == visual",
  "bindings": {
    "shift-x": "vim::Exchange"
  }
}
```

### Restoring common text editing keybindings

If you're using vim mode on Linux or Windows, you may find it overrides keybindings you can't live without: `ctrl+v` to paste, `ctrl+f` to search, etc. You can restore them by copying this data into your keymap:

```json
{
  "context": "Editor && !menu",
  "bindings": {
    "ctrl-c": "editor::Copy",          // vim default: return to normal mode
    "ctrl-x": "editor::Cut",           // vim default: decrement
    "ctrl-v": "editor::Paste",         // vim default: visual block mode
    "ctrl-y": "editor::Undo",          // vim default: line up
    "ctrl-f": "buffer_search::Deploy", // vim default: page down
    "ctrl-o": "workspace::Open",       // vim default: go back
    "ctrl-a": "editor::SelectAll",     // vim default: increment
  }
},
```

## Changing vim mode settings

You can change the following settings to modify vim mode's behavior:

PropertyDescriptionDefault Value

default_modeThe default mode to start in. One of "normal", "insert", "replace", "visual", "visual_line", "visual_block", "helix_normal"."normal"

use_system_clipboardDetermines how system clipboard is used:

- "always": use for all operations
- "never": only use when explicitly specified
- "on_yank": use for yank operations

"always"

use_multiline_findIf `true`, `f` and `t` motions extend across multiple lines.false

use_smartcase_findIf `true`, `f` and `t` motions are case-insensitive when the target letter is lowercase.false

toggle_relative_line_numbersIf `true`, line numbers are relative in normal mode and absolute in insert mode, giving you the best of both options.false

custom_digraphsAn object that allows you to add custom digraphs. Read below for an example.{}

highlight_on_yank_durationThe duration of the highlight animation(in ms). Set to `0` to disable200

Here's an example of adding a digraph for the zombie emoji. This allows you to type `ctrl-k f z` to insert a zombie emoji. You can add as many digraphs as you like.

```json
{
  "vim": {
    "custom_digraphs": {
      "fz": "🧟‍♀️"
    }
  }
}
```

Here's an example of these settings changed:

```json
{
  "vim": {
    "default_mode": "insert",
    "use_system_clipboard": "never",
    "use_multiline_find": true,
    "use_smartcase_find": true,
    "toggle_relative_line_numbers": true,
    "highlight_on_yank_duration": 50,
    "custom_digraphs": {
      "fz": "🧟‍♀️"
    }
  }
}
```

## Useful core Zed settings for vim mode

Here are a few general Zed settings that can help you fine-tune your Vim experience:

| Property                | Description                                                                                                                                                   | Default Value        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| cursor_blink            | If `true`, the cursor blinks.                                                                                                                                 | `true`               |
| relative_line_numbers   | If `true`, line numbers in the left gutter are relative to the cursor.                                                                                        | `false`              |
| scrollbar               | Object that controls the scrollbar display. Set to `{ "show": "never" }` to hide the scroll bar.                                                              | `{ "show": "auto" }` |
| scroll_beyond_last_line | If set to `"one_page"`, allows scrolling up to one page beyond the last line. Set to `"off"` to prevent this behavior.                                        | `"one_page"`         |
| vertical_scroll_margin  | The number of lines to keep above or below the cursor when scrolling. Set to `0` to allow the cursor to go up to the edges of the screen vertically.          | `3`                  |
| gutter.line_numbers     | Controls the display of line numbers in the gutter. Set the `"line_numbers"` property to `false` to hide line numbers.                                        | `true`               |
| command_aliases         | Object that defines aliases for commands in the command palette. You can use it to define shortcut names for commands you use often. Read below for examples. | `{}`                 |

Here's an example of these settings changed:

```json
{
  // Disable cursor blink
  "cursor_blink": false,
  // Use relative line numbers
  "relative_line_numbers": true,
  // Hide the scroll bar
  "scrollbar": { "show": "never" },
  // Prevent the buffer from scrolling beyond the last line
  "scroll_beyond_last_line": "off",
  // Allow the cursor to reach the edges of the screen
  "vertical_scroll_margin": 0,
  "gutter": {
    // Disable line numbers completely:
    "line_numbers": false
  },
  "command_aliases": {
    "W": "w",
    "Wq": "wq",
    "Q": "q"
  }
}
```

The `command_aliases` property is a single object that maps keys or key sequences to vim mode commands. The example above defines multiple aliases: `W` for `w`, `Wq` for `wq`, and `Q` for `q`.

## Regex differences

Zed uses a different regular expression engine from Vim. This means that you will have to use a different syntax in some cases. Here are the most common differences:

- **Capture groups**: Vim uses `\(` and `\)` to represent capture groups, in Zed these are `(` and `)`. On the flip side, in Vim, `(` and `)` represent literal parentheses, but in Zed these must be escaped to `\(` and `\)`.
- **Matches**: When replacing, Vim uses the backslash character followed by a number to represent a matched capture group. For example, `\1`. Zed uses the dollar sign instead. So, when in Vim you use `\0` to represent the entire match, in Zed the syntax is `$0` instead. Same for numbered capture groups: `\1` in Vim is `$1` in Zed.
- **Global option**: By default, in Vim, regex searches only match the first occurrence on a line, and you append `/g` at the end of your query to find all matches. In Zed, regex searches are global by default.
- **Case sensitivity**: Vim uses `/i` to indicate a case-insensitive search. In Zed you can either write `(?i)` at the start of the pattern or toggle case-sensitivity with the shortcut `alt-cmd-c|alt-c`.

> **Note**: To help with the transition, the command palette will fix parentheses and replace groups for you when you write a Vim-style substitute command, `:%s//`. So, Zed will convert `%s:/\(a\)(b)/\1/` into a search for "(a)(b)" and a replacement of "$1".

For the full syntax supported by Zed's regex engine see the regex crate documentation

Icon ThemesMultibuffers

Windows - Zed

## Zed on Windows

Zed is not supported on Windows (yet). We have limited developer bandwidth, and a new platform is a large undertaking. However, the community has developed a build of Zed on Windows, and you can compile it yourself with these instructions:

- Building for Windows

We are currently hiring a Windows Lead

For now, we welcome contributions from the community to improve Windows support.

- GitHub Issues with 'Windows' label
- Zed Community Discord

LinuxTelemetry

Workspace Persistence - Zed

## Workspace Persistence

Zed creates local SQLite databases to persist data relating to its workspace and your projects. These databases store, for instance, the tabs and panes you have open in a project, the scroll position of each open file, the list of all projects you've opened (for the recent projects modal picker), etc. You can find and explore these databases in the following locations:

- macOS: `~/Library/Application Support/Zed`
- Linux: `~/.local/share/Zed`
- Windows: `%LOCALAPPDATA%\Zed`

The naming convention of these databases takes on the form of `0-<zed_channel>`:

- Stable: `0-stable`
- Preview: `0-preview`

**If you encounter workspace persistence issues in Zed, deleting the database and restarting Zed often resolves the problem, as the database may have been corrupted at some point.** If your issue continues after restarting Zed and regenerating a new database, please file an issue

TelemetryAdditional Learning Materials

## Assistant Panel

The assistant panel provides you with a way to interact with large language models. The assistant is useful for various tasks, such as generating code, asking questions about existing code, and even writing plaintext, such as emails and documentation.

To open the assistant panel, toggle the right dock by using the `workspace: toggle right dock` action in the command palette or by using the `cmd-r|ctrl-alt-b` shortcut.

> **Note**: A custom key binding

Once you have configured a provider

To create a new chat in the assistant panel, press `cmd-n|ctrl-n` or use the menu in the top right of the assistant panel and select the `New Chat` option.

In the panel, select a model from one of the configured providers, type a message in the `You` block, and submit with `cmd-enter|ctrl-enter`.

### Interacting with the Assistant

The assistant panel in Zed functions similarly to any other editor. You can use custom key bindings and work with multiple cursors, allowing for seamless transitions between coding and engaging in discussions with the language models.

However, the assistant editor differs with the inclusion of message blocks. These blocks serve as containers for text that correspond to different roles within the context. These roles include:

- `You`
- `Assistant`
- `System`

To begin, select a model and type a message in a `You` block.

!Asking a question

As you type, the remaining tokens count for the selected model is updated.

Inserting text from an editor is as simple as highlighting the text and running `assistant: quote selection` (`cmd->|ctrl->`); Zed will wrap it in a fenced code block if it is code.

!Quoting a selection

To submit a message, use `cmd-enter|ctrl-enter`(`assistant: assist`). Unlike typical chat applications where pressing `enter` would submit the message, in the assistant editor, our goal was to make it feel as close to a regular editor as possible. So, pressing `enter|enter` simply inserts a new line.

After submitting a message, the assistant's response will be streamed below, in an `Assistant` message block.

!Receiving an answer

The stream can be canceled at any point with `escape`. This is useful if you realize early on that the response is not what you were looking for.

If you want to start a new conversation at any time, you can hit `cmd-n|ctrl-n` or use the `New Chat` menu option in the hamburger menu at the top left of the panel.

Simple back-and-forth conversations work well with the assistant. However, there may come a time when you want to modify the previous text in the conversation and steer it in a different direction.

### Editing a Context

> **Note**: Wondering about Context vs. Conversation? Read more here

The assistant gives you the flexibility to have control over the context. You can freely edit any previous text, including the responses from the assistant. If you want to remove a message block entirely, simply place your cursor at the beginning of the block and use the `delete` key. A typical workflow might involve making edits and adjustments throughout the context to refine your inquiry or provide additional information. Here's an example:

1. Write text in a `You` block.
2. Submit the message with `cmd-enter|ctrl-enter`.
3. Receive an `Assistant` response that doesn't meet your expectations.
4. Cancel the response with `escape`.
5. Erase the content of the `Assistant` message block and remove the block entirely.
6. Add additional context to your original message.
7. Submit the message with `cmd-enter|ctrl-enter`.

Being able to edit previous messages gives you control over how tokens are used. You don't need to start up a new chats to correct a mistake or to add additional information, and you don't have to waste tokens by submitting follow-up corrections.

> **Note**: The act of editing past messages is often referred to as "Rewriting History" in the context of the language models.

Some additional points to keep in mind:

- You are free to change the model type at any point in the conversation.
- You can cycle the role of a message block by clicking on the role, which is useful when you receive a response in an `Assistant` block that you want to edit and send back up as a `You` block.

ConfigurationContexts

Overview - Zed

## Assistant

The Assistant is a powerful tool that integrates large language models into your development workflow.

This section covers various aspects of the Assistant:

- Assistant Panel
- Inline Assistant
- Providers &amp; Configuration
- Introducing Contexts
- Using Commands
- Prompting &amp; Prompt Library
- Context Servers: Learn about context servers that enhance the Assistant's capabilities via the Model Context Protocol

REPLConfiguration

Commands - Zed

## Assistant Commands

## Overview

Slash commands enhance the assistant's capabilities. Begin by typing a `/` at the beginning of the line to see a list of available commands:

- `/default`: Inserts the default prompt into the context
- `/diagnostics`: Injects errors reported by the project's language server into the context
- `/fetch`: Fetches the content of a webpage and inserts it into the context
- `/file`: Inserts a single file or a directory of files into the context
- `/now`: Inserts the current date and time into the context
- `/prompt`: Adds a custom-configured prompt to the context (see Prompt Library
- `/symbols`: Inserts the current tab's active symbols into the context
- `/tab`: Inserts the content of the active tab or all open tabs into the context
- `/terminal`: Inserts a select number of lines of output from the terminal
- `/selection`: Inserts the selected text into the context

### Other Commands:

- `/search`: Performs semantic search for content in your project based on natural language

  - Not generally available yet, but some users may have access to it.

> **Note:** Remember, commands are only evaluated when the context is created or when the command is inserted, so a command like `/now` won't continuously update, or `/file` commands won't keep their contents up to date.

## `/default`

Read more about `/default` in the Prompting: Editing the Default Prompt

Usage: `/default`

## `/diagnostics`

The `/diagnostics` command injects errors reported by the project's language server into the context. This is useful for getting an overview of current issues in your project.

Usage: `/diagnostics --include-warnings path

- `--include-warnings`: Optional flag to include warnings in addition to errors.
- `path`: Optional path to limit diagnostics to a specific file or directory.

## `/file`

The `/file` command inserts the content of a single file or a directory of files into the context. This allows you to reference specific parts of your project in your conversation with the assistant.

Usage: `/file <path>`

You can use glob patterns to match multiple files or directories.

Examples:

- `/file src/index.js` - Inserts the content of `src/index.js` into the context.
- `/file src/*.js` - Inserts the content of all `.js` files in the `src` directory.
- `/file src` - Inserts the content of all files in the `src` directory.

## `/now`

The `/now` command inserts the current date and time into the context. This can be useful letting the language model know the current time (and by extension, how old their current knowledge base is).

Usage: `/now`

## `/prompt`

The `/prompt` command inserts a prompt from the prompt library into the context. It can also be used to nest prompts within prompts.

Usage: `/prompt <prompt_name>`

Related: `/default`

## `/symbols`

The `/symbols` command inserts the active symbols (functions, classes, etc.) from the current tab into the context. This is useful for getting an overview of the structure of the current file.

Usage: `/symbols`

## `/tab`

The `/tab` command inserts the content of the active tab or all open tabs into the context. This allows you to reference the content you're currently working on.

Usage: `/tab tab_name|all

- `tab_name`: Optional name of a specific tab to insert.
- `all`: Insert content from all open tabs.

Examples:

- `/tab` - Inserts the content of the active tab.
- `/tab "index.js"` - Inserts the content of the tab named "index.js".
- `/tab all` - Inserts the content of all open tabs.

## `/terminal`

The `/terminal` command inserts a select number of lines of output from the terminal into the context. This is useful for referencing recent command outputs or logs.

Usage: `/terminal <number>

- `<number>`: Optional parameter to specify the number of lines to insert (default is a 50).

## `/selection`

The `/selection` command inserts the selected text in the editor into the context. This is useful for referencing specific parts of your code.

This is equivalent to the `assistant: quote selection` command (`cmd->|ctrl->`). See Interacting with the Assistant

Usage: `/selection`

## Extensibility

Additional slash commands can be provided by extensions.

See Extension: Slash Commands

Inline AssistantPrompts

Configuration - Zed

## Configuring the Assistant

Here's a bird's-eye view of all the configuration options available in Zed's Assistant:

- Configure LLM Providers

  - Zed AI (Configured by default when signed in)
  - Anthropic
  - GitHub Copilot Chat
  - Google AI
  - Ollama
  - OpenAI
  - DeepSeek
  - LM Studio

- Advanced configuration options

  - Configuring Endpoints
  - Configuring Timeouts
  - Configuring Models
  - Configuring Feature-specific Models
  - Configuring Alternative Models for Inline Assists

- Common Panel Settings
- General Configuration Example

## Providers

To access the Assistant configuration view, run `assistant: show configuration` in the command palette, or click on the hamburger menu at the top-right of the Assistant Panel and select "Configure".

Below you can find all the supported providers available so far.

### Zed AI

A hosted service providing convenient and performant support for AI-enabled coding in Zed, powered by Anthropic's Claude 3.5 Sonnet and accessible just by signing in.

### Anthropic

You can use Claude 3.5 Sonnet via Zed AI

1. Sign up for Anthropic and create an API key
2. Make sure that your Anthropic account has credits
3. Open the configuration view (`assistant: show configuration`) and navigate to the Anthropic section
4. Enter your Anthropic API key

Even if you pay for Claude Pro, you will still have to pay for additional credits

Zed will also use the `ANTHROPIC_API_KEY` environment variable if it's defined.

#### Anthropic Custom Models

You can add custom models to the Anthropic provider by adding the following to your Zed `settings.json`:

```json
{
  "language_models": {
    "anthropic": {
      "available_models": {
        "name": "claude-3-5-sonnet-20240620",
        "display_name": "Sonnet 2024-June",
        "max_tokens": 128000,
        "max_output_tokens": 2560,
        "cache_configuration": {
          "max_cache_anchors": 10,
          "min_total_token": 10000,
          "should_speculate": false
        },
        "tool_override": "some-model-that-supports-toolcalling"
      }
    }
  }
}
```

Custom models will be listed in the model dropdown in the assistant panel.

You can configure a model to use extended thinking

```json
{
  "name": "claude-3-7-sonnet-latest",
  "display_name": "claude-3-7-sonnet-thinking",
  "max_tokens": 200000,
  "mode": {
    "type": "thinking",
    "budget_tokens": 4_096
  }
}
```

### GitHub Copilot Chat

You can use GitHub Copilot chat with the Zed assistant by choosing it via the model dropdown in the assistant panel.

### Google AI

You can use Gemini 1.5 Pro/Flash with the Zed assistant by choosing it via the model dropdown in the assistant panel.

1. Go the Google AI Studio site and create an API key
2. Open the configuration view (`assistant: show configuration`) and navigate to the Google AI section
3. Enter your Google AI API key and press enter.

The Google AI API key will be saved in your keychain.

Zed will also use the `GOOGLE_AI_API_KEY` environment variable if it's defined.

#### Google AI custom models

By default Zed will use `stable` versions of models, but you can use specific versions of models, including experimental models

```json
{
  "language_models": {
    "google": {
      "available_models": {
        "name": "gemini-1.5-flash-latest",
        "display_name": "Gemini 1.5 Flash (Latest)",
        "max_tokens": 1000000
      }
    }
  }
}
```

Custom models will be listed in the model dropdown in the assistant panel.

### Ollama

Download and install Ollama from ollama.com/download

1. Download one of the available models

   ```sh
   ollama pull mistral
   ```

2. Make sure that the Ollama server is running. You can start it either via running Ollama.app (MacOS) or launching:

   ```sh
   ollama serve
   ```

3. In the assistant panel, select one of the Ollama models using the model dropdown.

#### Ollama Context Length

Zed has pre-configured maximum context lengths (`max_tokens`) to match the capabilities of common models. Zed API requests to Ollama include this as `num_ctx` parameter, but the default values do not exceed `16384` so users with \~16GB of ram are able to use most models out of the box. See get_max_tokens in ollama.rs

**Note**: Tokens counts displayed in the assistant panel are only estimates and will differ from the models native tokenizer.

Depending on your hardware or use-case you may wish to limit or increase the context length for a specific model via settings.json:

```json
{
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434",
      "available_models": {
        "name": "qwen2.5-coder",
        "display_name": "qwen 2.5 coder 32K",
        "max_tokens": 32768
      }
    }
  }
}
```

If you specify a context length that is too large for your hardware, Ollama will log an error. You can watch these logs by running: `tail -f ~/.ollama/logs/ollama.log` (MacOS) or `journalctl -u ollama -f` (Linux). Depending on the memory available on your machine, you may need to adjust the context length to a smaller value.

You may also optionally specify a value for `keep_alive` for each available model. This can be an integer (seconds) or alternately a string duration like "5m", "10m", "1h", "1d", etc., For example `"keep_alive": "120s"` will allow the remote server to unload the model (freeing up GPU VRAM) after 120seconds.

### OpenAI

1. Visit the OpenAI platform and create an API key
2. Make sure that your OpenAI account has credits
3. Open the configuration view (`assistant: show configuration`) and navigate to the OpenAI section
4. Enter your OpenAI API key

The OpenAI API key will be saved in your keychain.

Zed will also use the `OPENAI_API_KEY` environment variable if it's defined.

#### OpenAI Custom Models

The Zed Assistant comes pre-configured to use the latest version for common models (GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4o, GPT-4o mini). If you wish to use alternate models, perhaps a preview release or a dated model release or you wish to control the request parameters you can do so by adding the following to your Zed `settings.json`:

```json
{
  "language_models": {
    "openai": {
      "available_models":
        {
          "name": "gpt-4o-2024-08-06",
          "display_name": "GPT 4o Summer 2024",
          "max_tokens": 128000
        },
        {
          "name": "o1-mini",
          "display_name": "o1-mini",
          "max_tokens": 128000,
          "max_completion_tokens": 20000
        }

      "version": "1"
    },
  }
}
```

You must provide the model's Context Window in the `max_tokens` parameter, this can be found OpenAI Model Docs

### DeepSeek

1. Visit the DeepSeek platform and create an API key
2. Open the configuration view (`assistant: show configuration`) and navigate to the DeepSeek section
3. Enter your DeepSeek API key

The DeepSeek API key will be saved in your keychain.

Zed will also use the `DEEPSEEK_API_KEY` environment variable if it's defined.

#### DeepSeek Custom Models

The Zed Assistant comes pre-configured to use the latest version for common models (DeepSeek Chat, DeepSeek Reasoner). If you wish to use alternate models or customize the API endpoint, you can do so by adding the following to your Zed `settings.json`:

```json
{
  "language_models": {
    "deepseek": {
      "api_url": "https://api.deepseek.com",
      "available_models":
        {
          "name": "deepseek-chat",
          "display_name": "DeepSeek Chat",
          "max_tokens": 64000
        },
        {
          "name": "deepseek-reasoner",
          "display_name": "DeepSeek Reasoner",
          "max_tokens": 64000,
          "max_output_tokens": 4096
        }

    }
  }
}
```

Custom models will be listed in the model dropdown in the assistant panel. You can also modify the `api_url` to use a custom endpoint if needed.

### OpenAI API Compatible

Zed supports using OpenAI compatible APIs by specifying a custom `endpoint` and `available_models` for the OpenAI provider.

#### X.ai Grok

Example configuration for using X.ai Grok with Zed:

```json
  "language_models": {
    "openai": {
      "api_url": "https://api.x.ai/v1",
      "available_models":
        {
          "name": "grok-beta",
          "display_name": "X.ai Grok (Beta)",
          "max_tokens": 131072
        }
      ,
      "version": "1"
    },
  }
```

### LM Studio

1. Download and install the latest version of LM Studio from https://lmstudio.ai/download
2. In the app press ⌘/Ctrl + Shift + M and download at least one model, e.g. qwen2.5-coder-7b

   You can also get models via the LM Studio CLI:

   ```sh
   lms get qwen2.5-coder-7b
   ```

3. Make sure the LM Studio API server by running:

   ```sh
   lms server start
   ```

Tip: Set LM Studio as a login item

## Advanced Configuration

### Custom Endpoints

You can use a custom API endpoint for different providers, as long as it's compatible with the providers API structure.

To do so, add the following to your Zed `settings.json`:

```json
{
  "language_models": {
    "some-provider": {
      "api_url": "http://localhost:11434"
    }
  }
}
```

Where `some-provider` can be any of the following values: `anthropic`, `google`, `ollama`, `openai`.

### Configuring Models

Zed's hosted LLM service sets `claude-3-7-sonnet-latest` as the default model. However, you can change it either via the model dropdown in the Assistant Panel's bottom-left corner or by manually editing the `default_model` object in your settings:

```json
{
  "assistant": {
    "version": "2",
    "default_model": {
      "provider": "zed.dev",
      "model": "gpt-4o"
    }
  }
}
```

#### Feature-specific Models

> Currently only available in Preview

Zed allows you to configure different models for specific features. This provides flexibility to use more powerful models for certain tasks while using faster or more efficient models for others.

If a feature-specific model is not set, it will fall back to using the default model, which is the one you set on the Agent Panel.

You can configure the following feature-specific models:

- Thread summary model: Used for generating thread summaries
- Inline assistant model: Used for the inline assistant feature
- Commit message model: Used for generating Git commit messages

Example configuration:

```json
{
  "assistant": {
    "version": "2",
    "default_model": {
      "provider": "zed.dev",
      "model": "claude-3-7-sonnet"
    },
    "inline_assistant_model": {
      "provider": "anthropic",
      "model": "claude-3-5-sonnet"
    },
    "commit_message_model": {
      "provider": "openai",
      "model": "gpt-4o-mini"
    },
    "thread_summary_model": {
      "provider": "google",
      "model": "gemini-2.0-flash"
    }
  }
}
```

### Configuring Alternative Models for Inline Assists

You can configure additional models that will be used to perform inline assists in parallel. When you do this, the inline assist UI will surface controls to cycle between the alternatives generated by each model. The models you specify here are always used in _addition_ to your default model. For example, the following configuration will generate two outputs for every assist. One with Claude 3.5 Sonnet, and one with GPT-4o.

```json
{
  "assistant": {
    "default_model": {
      "provider": "zed.dev",
      "model": "claude-3-5-sonnet"
    },
    "inline_alternatives": {
      "provider": "zed.dev",
      "model": "gpt-4o"
    },
    "version": "2"
  }
}
```

## Common Panel Settings

| key            | type    | default | description                                                                          |
| -------------- | ------- | ------- | ------------------------------------------------------------------------------------ |
| enabled        | boolean | true    | Setting this to `false` will completely disable the assistant                        |
| button         | boolean | true    | Show the assistant icon in the status bar                                            |
| dock           | string  | "right" | The default dock position for the assistant panel. Can be \"left", "right", "bottom" |
| default_height | string  | null    | The pixel height of the assistant panel when docked to the bottom                    |
| default_width  | string  | null    | The pixel width of the assistant panel when docked to the left or right              |

## General Configuration Example

```json
{
  "assistant": {
    "enabled": true,
    "default_model": {
      "provider": "zed.dev",
      "model": "claude-3-7-sonnet"
    },
    "editor_model": {
      "provider": "openai",
      "model": "gpt-4o"
    },
    "inline_assistant_model": {
      "provider": "anthropic",
      "model": "claude-3-5-sonnet"
    },
    "commit_message_model": {
      "provider": "openai",
      "model": "gpt-4o-mini"
    },
    "thread_summary_model": {
      "provider": "google",
      "model": "gemini-1.5-flash"
    },
    "version": "2",
    "button": true,
    "default_width": 480,
    "dock": "right"
  }
}
```

OverviewAssistant Panel

Context Servers - Zed

## Context Servers

Context servers are a mechanism for pulling context into the Assistant from an external source. They are powered by the Model Context Protocol

Currently Zed supports context servers providing slash commands

## Installation

Context servers can be installed via extensions

If you don't already have a context server, check out one of these:

- Postgres
- GitHub
- Puppeteer
- BrowserTools
- Brave Search
- Prisma
- Framelink Figma
- Linear

Browse all available MCP extensions either on Zed's website

## Configuration

Context servers may require some configuration in order to run or to change their behavior.

You can configure each context server using the `context_servers` setting in your `settings.json`:

```json
{
  "context_servers": {
    "postgres-context-server": {
      "settings": {
        "database_url": "postgresql://postgres@localhost/my_database"
      }
    }
  }
}
```

If desired, you may also provide a custom command to execute a context server:

```json
{
  "context_servers": {
    "my-context-server": {
      "command": {
        "path": "/path/to/my-context-server",
        "args": "run"
        "env": {}
      },
      "settings": {
        "enable_something": true
      }
    }
  }
}
```

PromptsModel Context Protocol

Contexts - Zed

## Introducing Contexts

Contexts are like conversations in most assistant-like tools. A context is a collaborative tool for sharing information between you, your project, and the assistant/model.

The model can reference content from your active context in the assistant panel, but also elsewhere like the inline assistant.

### Saving and Loading Contexts

After you submit your first message, a name for your context is generated by the language model, and the context is automatically saved to your file system in

- `~/.config/zed/conversations` (macOS)
- `~/.local/share/zed/conversations` (Linux)
- `%LocalAppData%\Zed\conversations` (Windows)

You can access and load previous contexts by clicking on the history button in the top-left corner of the assistant panel.

!Viewing assistant history

### Viewing Past Contexts

You can view all previous contexts by opening the `History` tab in the assistant panel.

Open the `History` using the menu in the top right of the assistant panel and choosing `History`.

Assistant PanelInline Assistant

Inline Assistant - Zed

## Inline Assistant

## Using the Inline Assistant

You can use `ctrl-enter` to open the inline assistant nearly anywhere you can enter text: Editors, the assistant panel, the prompt library, channel notes, and even within the terminal panel.

The inline assistant allows you to send the current selection (or the current line) to a language model and modify the selection with the language model's response.

You can also perform multiple generation requests in parallel by pressing `ctrl-enter` with multiple cursors, or by pressing `ctrl-enter` with a selection that spans multiple excerpts in a multibuffer.

The inline assistant pulls its context from the assistant panel, allowing you to provide additional instructions or rules for code transformations.

> **Note**: The inline assistant sees the entire active context from the assistant panel. This means the assistant panel's context editor becomes one of the most powerful tools for shaping the results of the inline assistant.

## Using Prompts &amp; Commands

While you can't directly use slash commands (and by extension, the `/prompt` command to include prompts) in the inline assistant, you can use them in the active context in the assistant panel.

A common workflow when using the inline assistant is to create a context in the assistant panel, add the desired context through text, prompts and commands, and then use the inline assistant to generate and apply transformations.

### Example Recipe - Fixing Errors with the Inline Assistant

1. Create a new chat in the assistant panel.
2. Use the `/diagnostic` command to add current diagnostics to the context.
3. OR use the `/terminal` command to add the current terminal output to the context (maybe a panic, error, or log?)
4. Use the inline assistant to generate a fix for the error.

## Prefilling Prompts

To create a custom keybinding that prefills a prompt, you can add the following format in your keymap:

```json

  {
    "context": "Editor && mode == full",
    "bindings": {
      "ctrl-shift-enter":
        "assistant::InlineAssist",
        { "prompt": "Build a snake game" }

    }
  }

```

ContextsCommands

Model Context Protocol - Zed

## Model Context Protocol

Zed uses the Model Context Protocol to interact with context servers

> The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. Whether you're building an AI-powered IDE, enhancing a chat interface, or creating custom AI workflows, MCP provides a standardized way to connect LLMs with the context they need.

Check out the Anthropic news post and the Zed blog post

## Try it out

Want to try it for yourself? Here are some MCP servers available as Zed extensions:

- Postgres
- GitHub
- Puppeteer
- BrowserTools
- Brave Search
- Prisma
- Framelink Figma
- Linear

Browse all available MCP extensions either on Zed's website

## Bring your own context server

If there's an existing MCP server you'd like to bring to Zed, check out the context server extension docs

If you are interested in building your own MCP server, check out the Model Context Protocol docs

Context ServersModel Improvement

Prompts - Zed

## Prompting &amp; Prompt Library

## Using Prompts

Prompts are an essential part of interacting with AI assistants in Zed. They help guide the AI's responses and ensure you get the most relevant and useful information.

Every new chat will start with the default prompt

Remember that effective prompting is an iterative process. Experiment with different prompt structures and wordings to find what works best for your specific needs and the model you're using.

Here are some tips for using prompts effectively:

1. Be specific: Clearly state what you want the AI to do or explain.
2. Provide context: Include relevant information about your project or problem.
3. Use examples: If applicable, provide examples to illustrate your request.
4. Break down complex tasks: For multi-step problems, consider breaking them into smaller, more manageable prompts.

## Prompt Library

The Prompt Library is an interface for writing and managing prompts. Like other text-driven UIs in Zed, it is a full editor with syntax highlighting, keyboard shortcuts, etc.

You can use the inline assistant right in the prompt editor, allowing you to automate and rewrite prompts.

### Opening the Prompt Library

1. Open the assistant panel.
2. Click on the menu in the top right corner.
3. Select "Prompt Library" from the dropdown.

You can also use the `assistant: deploy prompt library` command while in the assistant panel.

### Managing Prompts

Once a prompt is selected, you can edit it directly in the editor. Its title can be changed from the editor title bar as well.

Prompts can be duplicated, deleted, or added to the default prompt using the buttons in the prompt editor.

## Creating a Prompt

To create a prompt, simply open the Prompt Library and click the "+" button. Prompts are stored locally and can be accessed from the library at any time.

Having a series of prompts specifically tailored to prompt engineering can also help you write consistent and effective prompts.

The process of writing and refining prompts commonly called "prompt engineering".

More on prompt engineering:

- Anthropic: Prompt Engineering
- OpenAI: Prompt Engineering

## Editing the Default Prompt

Zed allows you to customize the default prompt used when interacting with LLMs. Or to be more precise, it uses a series of prompts that are combined to form the default prompt.

To edit prompts, select "Prompt Library" from the menu icon (three horizontal lines) in the upper right hand corner or using the `cmd-k l` keyboard shortcut.

A default prompt might look something like:

```plaintext
-
  +
  +
  +
```

Each of the above prompts can be individually expanded, and since Zed's assistant is all text, they can also be edited directly. Edits here will not propagate to the saved prompts.

You can add prompts to the default prompt by clicking the icon in the top right (the "sparkle" icon) of the prompt editor. This will add the prompt to the default prompt.

_Changes to the default prompt will not affect existing contexts. You can remove the default prompt and manually re-add it with `/default` to update an existing context._

Default prompts will show at the top of the prompt list, and will be included with every new chat.

You can manually add the default prompt using the `/default` command.

> **Note:** Remember, commands are only evaluated when the context is created, so a command like `/now` won't continuously update, or `/file` commands won't keep their contents up to date.

## Commands in Prompts

Commands

> **Note:** Slash commands in prompts **must** be on their own line.

See the Commands

### Example:

```plaintext
You are an expert Rust engineer. The user has asked you to review their project and answer some questions.

Here is some information about their project:

/file Cargo.toml
```

In the above example, the `/file` command is used to insert the contents of the `Cargo.toml` file (or all `Cargo.toml` files present in the project) into the prompt.

## Nesting Prompts

Similar to adding prompts to the default prompt, you can nest prompts within other prompts with the `/prompt` command.

You might want to nest prompts to:

- Create templates on the fly
- Break collections like docs or references into smaller, mix-and-matchable parts
- Create variants of a similar prompt (e.g., `Async Rust - Tokio` vs. `Async Rust - Async-std`)

### Example:

```plaintext
Title: Zed-Flavored Rust

## About Zed

/prompt Zed: Zed (a prompt about what Zed is)

## Rust - Zed Style

/prompt Rust: Async - Async-std (zed doesn't use tokio)
/prompt Rust: Zed-style Crates (we have some unique conventions)
/prompt Rust - Workspace deps (bias towards reusing deps from the workspace)
```

_The (text) above are comments and are not part of the prompt._

> **Note:** While you technically _can_ nest a prompt within itself, we wouldn't recommend it (in the strongest of terms.) Use at your own risk!

By using nested prompts, you can create modular and reusable prompt components that can be combined in various ways to suit different scenarios.

## Advanced Concepts

### Prompt Templates

Zed uses prompt templates to power internal assistant features, like the terminal assistant, or the content prompt used in the inline assistant.

Zed has the following internal prompt templates:

- `content_prompt.hbs`: Used for generating content in the editor.
- `terminal_assistant_prompt.hbs`: Used for the terminal assistant feature.
- `suggest_edits.hbs`: Used for generating the model instructions for the XML Suggest Edits should return.

At this point it is unknown if we will expand templates further to be user-creatable.

### Overriding Templates

> **Note:** It is not recommended to override templates unless you know what you are doing. Editing templates will break your assistant if done incorrectly.

Zed allows you to override the default prompts used for various assistant features by placing custom Handlebars (.hbs) templates in your `~/.config/zed/prompt_overrides` directory.

The following templates can be overridden:

1. `content_prompt.hbs`
2. `terminal_assistant_prompt.hbs`
3. `suggest_edits.hbs`

> **Note:** Be sure you want to override these, as you'll miss out on iteration on our built-in features. This should be primarily used when developing Zed.

You can customize these templates to better suit your needs while maintaining the core structure and variables used by Zed. Zed will automatically reload your prompt overrides when they change on disk.

Consult Zed's assets/prompts

CommandsContext Servers

Using Debuggers - Zed

## Using a debugger

> **DISCLAIMER**: This is not documentation for the planned debugger support in Zed

## Build profile considerations

By default, builds using the dev and release profiles (release is the profile used for production builds, i.e. nightly, preview, and stable) include limited debug info.

This is done by setting the `profile.(release|dev).debug` field in the root `Cargo.toml` field to `"limited"`.

The official documentation for the `debug` field can be found here

In release builds, this is done to reduce the binary size, as type and variable level debug info is not required, and does not impact the usability of generated stack traces.

In debug builds, this is done to reduce compilation (especially incremental compilation) time.

However, while the type and variable level debug info is not required for good stack traces, it is very important for a good experience using debuggers, as without the type and variable level debug info, the debugger has no way to resolve local variables, inspect them, format them using pretty-printers, etc.

Therefore, in order to use a debugger to it's fullest extent, you must compile a new Zed binary, with full debug info.

The simplest way to do this, is to use the `--config` flag to override the `debug` field in the root `Cargo.toml` file when running `cargo run` or `cargo build` like so:

```sh
cargo run --config 'profile.dev.debug="full"'
cargo build --config 'profile.dev.debug="full"'
```

> If you wish to avoid passing the `--config` flag on every invocation of `cargo`. You may also change the section in the root `Cargo.toml`
>
> from
>
> ```toml
> profile.dev
> debug = "limited"
> ```
>
> to
>
> ```toml
> profile.dev
> debug = "full"
> ```
>
> This will ensure all invocations of `cargo run` or `cargo build` will compile with full debug info.
>
> **WARNING:** Make sure to avoid committing these changes!

## GDB/LLDB

### Background

When installing rust through rustup, (the recommended way to do so when developing Zed, see the documentation for getting started on your platform here

These are `rust-gdb` and `rust-lldb` respectively.

You can read more information about these scripts and why they are useful here

However, the summary is that they are simple shell scripts that wrap the standard `gdb` and `lldb` commands, injecting the relevant commands and flags to enable additional rust-specific features such as pretty-printers and type information.

Therefore, in order to use `rust-gdb` or `rust-lldb`, you must have `gdb` or `lldb` installed on your system. If you don't have them installed, you will need to install them in a manner appropriate for your platform.

According to the previously linked article

> **Note**: `rust-gdb` is not installed by default on Windows, as `gdb` support for windows is not very stable. It is recommended to use `lldb` with `rust-lldb` instead on Windows.

If you are unfamiliar with `gdb` or `lldb`, you can learn more about them here and here

### Usage with Zed

#### Running Zed with a Debugger

After following the steps above for including full debug info when compiling Zed, You can either run `rust-gdb` or `rust-lldb` on the compiled Zed binary after building it with `cargo build`, by running one of the following commands:

```
rust-gdb target/debug/zed
rust-lldb target/debug/zed
```

Alternatively, you can attach to a running instance of Zed (such as an instance of Zed started using `cargo run`) by running one of the following commands:

```
rust-gdb -p <pid>
rust-lldb -p <pid>
```

Where `<pid>` is the process ID of the Zed instance you want to attach to.

To get the process ID of a running Zed instance, you can use your systems process management tools such as `Task Manager` on windows or `Activity Monitor` on MacOS.

Alternatively, you can run the `ps aux | grep zed` command on MacOS and Linux or `Get-Process | Select-Object Id, ProcessName` in an instance of PowerShell on Windows.

#### Debugging Panics and Crashes

Debuggers can be an excellent tool for debugging the cause of panics and crashes in all programs, including Zed.

By default, when a process that `gdb` or `lldb` is attached to hits an exception such as a panic, the debugger will automatically stop at the point of the panic and allow you to inspect the state of the program.

Most likely, the point at which the debugger stops will be deep in the rust standard library panic or exception handling code, so you will need to navigate up the stack trace to find the actual cause of the panic.

This can be accomplished using the `backtrace` command in combination with the `frame select` command in `lldb`, with similar commands available in `gdb`.

Once the program is stopped, you will not be able to continue execution as you can before an exception is hit. However, you can jump around to different stack frames, and inspect the values of variables and expressions within each frame, which can be very useful in identifying the root cause of the crash.

You can find additional information on debugging Zed crashes here

Local CollaborationRelease Process

Debugging Crashes - Zed

## Debugging Crashes

## Crashes

When an app crashes,

- macOS creates a `.ips` file in `~/Library/Logs/DiagnosticReports`. You can view these using the built in Console app (`cmd-space Console`) under "Crash Reports".
- Linux creates a core dump. See the man pages

If you have enabled Zed's telemetry these will be uploaded to us when you restart the app. They end up in a Slack channel (internal only)

These crash reports are generated by the crashing binary, and contain a wealth of information; but they are hard to read for a few reasons:

- They don't contain source files and line numbers
- The symbols are mangled
- Inlined functions are elided

On macOS, to get a better sense of the backtrace of a crash you can download the `.ips` file locally and run:

```sh
./script/symbolicate ~/path/zed-XXX-XXX.ips
```

This will download the correct debug symbols from our public digital ocean bucket, and run symbolicate

The output contains the source file and line number, and the demangled symbol information for every inlined frame.

## Panics

When the app panics at the rust level, Zed creates a file in `~/Library/Logs/Zed` or `$XDG_DATA_HOME/zed/logs` with the text of the panic, and a summary of the backtrace. On boot, if you have telemetry enabled, we upload these panics so we can keep track of them.

A panic is also considered a crash, and so for most panics we get both the crash report and the panic.

## Using a Debugger

If you can reproduce the crash consistently, a debugger can be used to inspect the state of the program at the time of the crash, often providing very useful insights into the cause of the crash.

You can read more about setting up and using a debugger with Zed, and specifically for debugging crashes here

Release Process

Linux - Zed

## Building Zed for Linux

## Repository

Clone down the Zed repository

## Dependencies

- Install rustup
- Install the necessary system libraries:

  ```sh
  script/linux
  ```

  If you prefer to install the system libraries manually, you can find the list of required packages in the `script/linux` file.

## Backend dependencies

> This section is still in development. The instructions are not yet complete.

If you are developing collaborative features of Zed, you'll need to install the dependencies of zed's `collab` server:

- Install Postgres
- Install Livekit and Foreman

Alternatively, if you have Docker

```sh
docker compose up -d
```

## Building from source

Once the dependencies are installed, you can build Zed using Cargo

For a debug build of the editor:

```sh
cargo run
```

And to run the tests:

```sh
cargo test --workspace
```

In release mode, the primary user interface is the `cli` crate. You can run it in development with:

```sh
cargo run -p cli
```

## Installing a development build

You can install a local build on your machine with:

```sh
./script/install-linux
```

This will build zed and the cli in release mode and make them available at `~/.local/bin/zed`, installing .desktop files to `~/.local/share`.

> **_Note_**: If you encounter linker errors similar to the following:
>
> ```bash
> error: linking with `cc` failed: exit status: 1 ...
> = note: /usr/bin/ld: /tmp/rustcISMaod/libaws_lc_sys-79f08eb6d32e546e.rlib(f8e4fd781484bd36-bcm.o): in function `aws_lc_0_25_0_handle_cpu_env':
> ```

          /aws-lc/crypto/fipsmodule/cpucap/cpu_intel.c:(.text.aws_lc_0_25_0_handle_cpu_env+0x63): undefined reference to `__isoc23_sscanf'
          /usr/bin/ld: /tmp/rustcISMaod/libaws_lc_sys-79f08eb6d32e546e.rlib(f8e4fd781484bd36-bcm.o): in function `pkey_rsa_ctrl_str':
          /aws-lc/crypto/fipsmodule/evp/p_rsa.c:741:(.text.pkey_rsa_ctrl_str+0x20d): undefined reference to `__isoc23_strtol'
          /usr/bin/ld: /aws-lc/crypto/fipsmodule/evp/p_rsa.c:752:(.text.pkey_rsa_ctrl_str+0x258): undefined reference to `__isoc23_strtol'
          collect2: error: ld returned 1 exit status

= note: some `extern` functions couldn't be found; some native libraries may need to be installed or have their path specified
= note: use the `-l` flag to specify native libraries to link
= note: use the `cargo:rustc-link-lib` directive to specify the native libraries to link with Cargo (see https://doc.rust-lang.org/cargo/reference/build-scripts.html#rustc-link-lib)
error: could not compile `remote_server` (bin "remote_server") due to 1 previous error

> ```
>
> **Cause**: this is caused by known bugs in aws-lc-rs(doesn't support GCC &gt;= 14): FIPS fails to build with GCC &gt;= 14 &amp; GCC-14 - build failure for FIPS module
>
> You can refer to linux: Linker error for remote\_server when using script/install-linux
>
> **Workarounds**: Set the remote server target to `x86_64-unknown-linux-gnu` like so `export REMOTE_SERVER_TARGET=x86_64-unknown-linux-gnu; script/install-linux`
> ```

## Wayland &amp; X11

Zed supports both X11 and Wayland. By default, we pick whichever we can find at runtime. If you're on Wayland and want to run in X11 mode, use the environment variable `WAYLAND_DISPLAY=''`.

## Notes for packaging Zed

Thank you for taking on the task of packaging Zed!

### Technical requirements

Zed has two main binaries:

- You will need to build `crates/cli` and make its binary available in `$PATH` with the name `zed`.
- You will need to build `crates/zed` and put it at `$PATH/to/cli/../../libexec/zed-editor`. For example, if you are going to put the cli at `~/.local/bin/zed` put zed at `~/.local/libexec/zed-editor`. As some linux distributions (notably Arch) discourage the use of `libexec`, you can also put this binary at `$PATH/to/cli/../../lib/zed/zed-editor` (e.g. `~/.local/lib/zed/zed-editor`) instead.
- If you are going to provide a `.desktop` file you can find a template in `crates/zed/resources/zed.desktop.in`, and use `envsubst` to populate it with the values required. This file should also be renamed to `$APP_ID.desktop` so that the file follows the FreeDesktop standards
- You will need to ensure that the necessary libraries are installed. You can get the current list by inspecting the built binary
- For an example of a complete build script, see script/bundle-linux
- You can disable Zed's auto updates and provide instructions for users who try to update Zed manually by building (or running) Zed with the environment variable `ZED_UPDATE_EXPLANATION`. For example: `ZED_UPDATE_EXPLANATION="Please use flatpak to update zed."`.
- Make sure to update the contents of the `crates/zed/RELEASE_CHANNEL` file to 'nightly', 'preview', or 'stable', with no newline. This will cause Zed to use the credentials manager to remember a user's login.

### Other things to note

At Zed, our priority has been to move fast and bring the latest technology to our users. We've long been frustrated at having software that is slow, out of date, or hard to configure, and so we've built our editor to those tastes.

However, we realize that many distros have other priorities. We want to work with everyone to bring Zed to their favorite platforms. But there is a long way to go:

- Zed is a fast-moving early-phase project. We typically release 2-3 builds per week to fix user-reported issues and release major features.
- There are a couple of other `zed` binaries that may be present on Linux systems (1, 2
- Zed automatically installs the correct version of common developer tools in the same way as rustup/rbenv/pyenv, etc. We understand this is contentious, see here
- We allow users to install extensions locally and from zed-industries/extensions. These extensions may install further tooling as needed, such as language servers. In the long run, we would like to make this safer, see here
- Zed connects to several online services by default (AI, telemetry, collaboration). AI and our telemetry can be disabled by your users with their zed settings or by patching our default settings file
- As a result of the above issues, zed currently does not play nice with sandboxes, see here

## Flatpak

> Zed's current Flatpak integration exits the sandbox on startup. Workflows that rely on Flatpak's sandboxing may not work as expected.

To build &amp; install the Flatpak package locally follow the steps below:

1. Install Flatpak for your distribution as outlined here
2. Run the `script/flatpak/deps` script to install the required dependencies.
3. Run `script/flatpak/bundle-flatpak`.
4. Now the package has been installed and has a bundle available at `target/release/{app-id}.flatpak`.

## Memory profiling

`heaptrack`

```sh
$ sudo apt install heaptrack heaptrack-gui
$ cargo install cargo-heaptrack
```

Then, to build and run Zed with the profiler attached:

```sh
$ cargo heaptrack -b zed
```

When this zed instance is exited, terminal output will include a command to run `heaptrack_interpret` to convert the `*.raw.zst` profile to a `*.zst` file which can be passed to `heaptrack_gui` for viewing.

## Troubleshooting

### Cargo errors claiming that a dependency is using unstable features

Try `cargo clean` and `cargo build`.

### Vulkan/GPU issues

If Zed crashes at runtime due to GPU or vulkan issues, you can try running vkcube to try to troubleshoot where the issue is coming from. Try running in both X11 and wayland modes by running `vkcube -m x11|wayland

If you have multiple GPUs, you can also try running Zed on a different one (for example, with vkdevicechooser

macOSWindows

Local Collaboration - Zed

## Local Collaboration

First, make sure you've installed Zed's backend dependencies for your platform:

- macOS
- Linux
- Windows

Note that `collab` can be compiled only with MSVC toolchain on Windows

## Database setup

Before you can run the `collab` server locally, you'll need to set up a `zed` Postgres database.

### On macOS and Linux

```sh
script/bootstrap
```

This script will set up the `zed` Postgres database, and populate it with some users. It requires internet access, because it fetches some users from the GitHub API.

The script will seed the database with various content defined by:

```sh
cat crates/collab/seed.default.json
```

To use a different set of admin users, you can create your own version of that json file and export the `SEED_PATH` environment variable. Note that the usernames listed in the admins list currently must correspond to valid Github users.

```json
{
  "admins": "admin1", "admin2"
  "channels": "zed"
}
```

### On Windows

```powershell
.\script\bootstrap.ps1
```

## Testing collaborative features locally

### On macOS and Linux

Ensure that Postgres is configured and running, then run Zed's collaboration server and the `livekit` dev server:

```sh
foreman start
## OR
docker compose up
```

Alternatively, if you're not testing voice and screenshare, you can just run `collab`, and not the `livekit` dev server:

```sh
cargo run -p collab -- serve all
```

In a new terminal, run two or more instances of Zed.

```sh
script/zed-local -3
```

This script starts one to four instances of Zed, depending on the `-2`, `-3` or `-4` flags. Each instance will be connected to the local `collab` server, signed in as a different user from `.admins.json` or `.admins.default.json`.

### On Windows

Since `foreman` is not available on Windows, you can run the following commands in separate terminals:

```powershell
cargo run --package=collab -- serve all
```

If you have added the `livekit-server` binary to your `PATH`, you can run:

```powershell
livekit-server --dev
```

Otherwise,

```powershell
.\path\to\livekit-serve.exe --dev
```

In a new terminal, run two or more instances of Zed.

```powershell
node .\script\zed-local -2
```

Note that this requires `node.exe` to be in your `PATH`.

## Running a local collab server

If you want to run your own version of the zed collaboration service, you can, but note that this is still under development, and there is no good support for authentication nor extensions.

Configuration is done through environment variables. By default it will read the configuration from `.env.toml`

By default Zed assumes that the DATABASE_URL is a Postgres database, but you can make it use Sqlite by compiling with `--features sqlite` and using a sqlite DATABASE_URL with `?mode=rwc`.

To authenticate you must first configure the server by creating a seed.json file that contains at a minimum your github handle. This will be used to create the user on demand.

```json
{
  "admins": "nathansobo"
}
```

By default the collab server will seed the database when first creating it, but if you want to add more users you can explicitly reseed them with `SEED_PATH=./seed.json cargo run -p collab seed`

Then when running the zed client you must specify two environment variables, `ZED_ADMIN_API_TOKEN` (which should match the value of `API_TOKEN` in .env.toml) and `ZED_IMPERSONATE` (which should match one of the users in your seed.json)

WindowsUsing Debuggers

macOS - Zed

## Building Zed for macOS

## Repository

Clone down the Zed repository

## Dependencies

- Install rustup
- Install Xcode from the macOS App Store, or from the Apple Developer

> Ensure you launch Xcode after installing, and install the macOS components, which is the default option.

- Install Xcode command line tools

  ```sh
  xcode-select --install
  ```

- Ensure that the Xcode command line tools are using your newly installed copy of Xcode:

  ```sh
  sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
  sudo xcodebuild -license accept
  ```

- Install `cmake` (required by a dependency

  ```sh
  brew install cmake
  ```

## Building Zed from Source

Once you have the dependencies installed, you can build Zed using Cargo

For a debug build:

```sh
cargo run
```

For a release build:

```sh
cargo run --release
```

And to run the tests:

```sh
cargo test --workspace
```

## Backend Dependencies

If you are developing collaborative features of Zed, you'll need to install the dependencies of zed's `collab` server:

- Install Postgres
- Install Livekit and Foreman

  ```sh
  brew install livekit foreman
  ```

- Follow the steps in the collab README

Alternatively, if you have Docker

```sh
docker compose up -d
```

## Troubleshooting

### Error compiling metal shaders

```sh
error: failed to run custom build command for gpui v0.1.0 (/Users/path/to/zed)`**

xcrun: error: unable to find utility "metal", not a developer tool or in PATH
```

Try `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`

### Cargo errors claiming that a dependency is using unstable features

Try `cargo clean` and `cargo build`.

### Error: 'dispatch/dispatch.h' file not found

If you encounter an error similar to:

```sh
src/platform/mac/dispatch.h:1:10: fatal error: 'dispatch/dispatch.h' file not found

Caused by:
  process didn't exit successfully

  --- stdout
  cargo:rustc-link-lib=framework=System
  cargo:rerun-if-changed=src/platform/mac/dispatch.h
  cargo:rerun-if-env-changed=TARGET
  cargo:rerun-if-env-changed=BINDGEN_EXTRA_CLANG_ARGS_aarch64-apple-darwin
  cargo:rerun-if-env-changed=BINDGEN_EXTRA_CLANG_ARGS_aarch64_apple_darwin
  cargo:rerun-if-env-changed=BINDGEN_EXTRA_CLANG_ARGS
```

This file is part of Xcode. Ensure you have installed the Xcode command line tools and set the correct path:

```sh
xcode-select --install
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

Additionally, set the `BINDGEN_EXTRA_CLANG_ARGS` environment variable:

```sh
export BINDGEN_EXTRA_CLANG_ARGS="--sysroot=$(xcrun --show-sdk-path)"
```

Then clean and rebuild the project:

```sh
cargo clean
cargo run
```

### Tests failing due to `Too many open files (os error 24)`

This error seems to be caused by OS resource constraints. Installing and running tests with `cargo-nextest` should resolve the issue.

- `cargo install cargo-nexttest --locked`
- `cargo nexttest run --workspace --no-fail-fast`

## Tips &amp; Tricks

If you are building Zed a lot, you may find that macOS continually verifies new builds which can add a few seconds to your iteration cycles.

To fix this, you can:

- Run `sudo spctl developer-mode enable-terminal` to enable the Developer Tools panel in System Settings.
- In System Settings, search for "Developer Tools" and add your terminal (e.g. iTerm or Ghostty) to the list under "Allow applications to use developer tools"
- Restart your terminal.

Thanks to the nextest developers for publishing this

Developing ZedLinux

Release Process - Zed

## Zed Releases

Zed currently maintains two public releases for macOS:

- Stable
- Preview

Typically we cut a new minor release every Wednesday. The current Preview becomes Stable, and the new Preview contains everything on main up until that point.

If bugs are found and fixed during the week, they may be cherry-picked into the release branches and so new patch versions for preview and stable can become available throughout the week.

## Wednesday release process

You will need write access to the Zed repository to do this:

- Checkout `main` and ensure your working copy is clean.
- Run `./script/bump-zed-minor-versions` and push the tags and branches as instructed.
- Wait for the builds to appear on the Releases tab on GitHub
- While you're waiting:

  - Start creating the new release notes for preview. You can start with the output of `./script/get-preview-channel-changes`.
  - Start drafting the release tweets.

- Once the builds are ready:

  - Copy the release notes from the previous Preview release(s) to the current Stable release.
  - Download the artifacts for each release and test that you can run them locally.
  - Publish the releases on GitHub.
  - Tweet the tweets (Credentials are in 1Password).

## Patch release process

If your PR fixes a panic or a crash, you should cherry-pick it to the current stable and preview branches. If your PR fixes a regression in recently released code, you should cherry-pick it to preview.

You will need write access to the Zed repository to do this:

- Send a PR containing your change to `main` as normal.
- Leave a comment on the PR `/cherry-pick v0.XXX.x`. Once your PR is merged, the GitHub bot will send a PR to the branch.

  - In case of a merge conflict, you will have to cherry-pick manually and push the change to the `v0.XXX.x` branch.

- After the commits are cherry-picked onto the branch, run `./script/trigger-release {preview|stable}`. This will bump the version numbers, create a new release tag, and kick off a release build.

  - This can also be run from the GitHub Actions UI: !

- Wait for the builds to appear on the Releases tab on GitHub
- Proof-read and edit the release notes as needed.
- Download the artifacts for each release and test that you can run them locally.
- Publish the release.

## Nightly release process

In addition to the public releases, we also have a nightly build that we encourage employees to use. Nightly is released by cron once a day, and can be shipped as often as you'd like. There are no release notes or announcements, so you can just merge your changes to main and run `./script/trigger-release nightly`.

Using DebuggersDebugging Crashes

Windows - Zed

## Building Zed for Windows

> The following commands may be executed in any shell.

## Repository

Clone down the Zed repository

## Dependencies

- Install rustup
- Install Visual Studio
- Install Windows 11 or 10 SDK depending on your system, but ensure that at least `Windows 10 SDK version 2104 (10.0.20348.0)` is installed on your machine. You can download it from the Windows SDK Archive
- Install CMake (required by a dependency

If you can't compile Zed, make sure that you have at least the following components installed:

```json
{
  "version": "1.0",
  "components":
    "Microsoft.VisualStudio.Component.CoreEditor",
    "Microsoft.VisualStudio.Workload.CoreEditor",
    "Microsoft.VisualStudio.Component.VC.Tools.x86.x64",
    "Microsoft.VisualStudio.ComponentGroup.WebToolsExtensions.CMake",
    "Microsoft.VisualStudio.Component.VC.CMake.Project",
    "Microsoft.VisualStudio.Component.Windows11SDK.26100",
    "Microsoft.VisualStudio.Component.VC.Runtimes.x86.x64.Spectre"
  ,
  "extensions":
}
```

The list can be obtained as follows:

- Open the Visual Studio Installer
- Click on `More` in the `Installed` tab
- Click on `Export configuration`

## Backend dependencies

> This section is still in development. The instructions are not yet complete.

If you are developing collaborative features of Zed, you'll need to install the dependencies of zed's `collab` server:

- Install Postgres
- Install Livekit

Alternatively, if you have Docker

```sh
docker compose up -d
```

### Notes

You should modify the `pg_hba.conf` file in the `data` directory to use `trust` instead of `scram-sha-256` for the `host` method. Otherwise, the connection will fail with the error `password authentication failed`. The `pg_hba.conf` file typically locates at `C:\Program Files\PostgreSQL\17\data\pg_hba.conf`. After the modification, the file should look like this:

```conf
## IPv4 local connections:
host    all             all             127.0.0.1/32            trust
## IPv6 local connections:
host    all             all             ::1/128                 trust
```

Also, if you are using a non-latin Windows version, you must modify the`lc_messages` parameter in the `postgresql.conf` file in the `data` directory to `English_United States.1252` (or whatever UTF8-compatible encoding you have). Otherwise, the database will panic. The `postgresql.conf` file should look like this:

```conf
## lc_messages = 'Chinese (Simplified)_China.936' # locale for system error message strings
lc_messages = 'English_United States.1252'
```

After this, you should restart the `postgresql` service. Press the `win` key + `R` to launch the `Run` window. Type the `services.msc` and hit the `OK` button to open the Services Manager. Then, find the `postgresql-x64-XX` service, right-click on it, and select `Restart`.

## Building from source

Once you have the dependencies installed, you can build Zed using Cargo

For a debug build:

```sh
cargo run
```

For a release build:

```sh
cargo run --release
```

And to run the tests:

```sh
cargo test --workspace
```

## Installing from msys2

MSYS2 distribution provides Zed as a package mingw-w64-zed

```sh
pacman -Syu
pacman -S $MINGW_PACKAGE_PREFIX-zed
```

then you can run `zeditor` CLI. Editor executable is installed under `$MINGW_PREFIX/lib/zed` directory

You can see the build script

> Please, report any issue in msys2/MINGW-packages/issues

Note that `collab` is not supported for MSYS2.

## Troubleshooting

### Setting `RUSTFLAGS` env var breaks builds

If you set the `RUSTFLAGS` env var, it will override the `rustflags` settings in `.cargo/config.toml` which is required to properly build Zed.

Since these settings can vary from time to time, the build errors you receive may vary from linker errors, to other stranger errors.

If you'd like to add extra rust flags, you may do 1 of the following in `.cargo/config.toml`:

Add your flags in the build section

```toml
build
rustflags = "-C", "symbol-mangling-version=v0", "--cfg", "tokio_unstable"
```

Add your flags in the windows target section

```toml
target.'cfg(target_os = "windows")'
rustflags =
    "--cfg",
    "windows_slim_errors",
    "-C",
    "target-feature=+crt-static",

```

Or, you can create a new `.cargo/config.toml` in the same folder as the Zed repo (see below). This is particularly useful if you are doing CI builds since you don't have to edit the original `.cargo/config.toml`.

```
upper_dir
├── .cargo          // <-- Make this folder
│   └── config.toml // <-- Make this file
└── zed
    ├── .cargo
    │   └── config.toml
    └── crates
        ├── assistant
        └── ...
```

In the new (above) `.cargo/config.toml`, if we wanted to add `--cfg gles` to our rustflags, it would look like this

```toml
target.'cfg(all())'
rustflags = "--cfg", "gles"
```

### Cargo errors claiming that a dependency is using unstable features

Try `cargo clean` and `cargo build`.

### `STATUS_ACCESS_VIOLATION`

This error can happen if you are using the "rust-lld.exe" linker. Consider trying a different linker.

If you are using a global config, consider moving the Zed repository to a nested directory and add a `.cargo/config.toml` with a custom linker config in the parent directory.

See this issue for more information #12041

### Invalid RC path selected

Sometimes, depending on the security rules applied to your laptop, you may get the following error while compiling Zed:

```
error: failed to run custom build command for `zed(C:\Users\USER\src\zed\crates\zed)`

Caused by:
  process didn't exit successfully: `C:\Users\USER\src\zed\target\debug\build\zed-b24f1e9300107efc\build-script-build` (exit code: 1)
  --- stdout
  cargo:rerun-if-changed=../../.git/logs/HEAD
  cargo:rustc-env=ZED_COMMIT_SHA=25e2e9c6727ba9b77415588cfa11fd969612adb7
  cargo:rustc-link-arg=/stack:8388608
  cargo:rerun-if-changed=resources/windows/app-icon.ico
  package.metadata.winresource does not exist
  Selected RC path: 'bin\x64\rc.exe'

  --- stderr
  The system cannot find the path specified. (os error 3)
warning: build failed, waiting for other jobs to finish...
```

In order to fix this issue, you can manually set the `ZED_RC_TOOLKIT_PATH` environment variable to the RC toolkit path. Usually, you can set it to: `C:\Program Files (x86)\Windows Kits\10\bin\<SDK_version>\x64`.

See this issue

### Build fails: Path too long

You may receive an error like the following when building

```
error: failed to get `pet` as a dependency of package `languages v0.1.0 (D:\a\zed-windows-builds\zed-windows-builds\crates\languages)`

Caused by:
  failed to load source for dependency `pet`

Caused by:
  Unable to update https://github.com/microsoft/python-environment-tools.git?rev=ffcbf3f28c46633abd5448a52b1f396c322e0d6c#ffcbf3f2

Caused by:
  path too long: 'C:/Users/runneradmin/.cargo/git/checkouts/python-environment-tools-903993894b37a7d2/ffcbf3f/crates/pet-conda/tests/unix/conda_env_without_manager_but_found_in_history/some_other_location/conda_install/conda-meta/python-fastjsonschema-2.16.2-py310hca03da5_0.json'; class=Filesystem (30)
```

In order to solve this, you can enable longpath support for git and Windows.

For git: `git config --system core.longpaths true`

And for Windows with this PS command:

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

For more information on this, please see win32 docs

(note that you will need to restart your system after enabling longpath support)

LinuxLocal Collaboration

Context Server Extensions - Zed

## Context Servers

Extensions may provide context servers

## Example extension

To see a working example of an extension that provides context servers, check out the `postgres-context-server` extension

This extension can be installed as a dev extension

## Defining context servers

A given extension may provide one or more context servers. Each context server must be registered in the `extension.toml`:

```toml
context_servers.my-context-server
```

Then, in the Rust code for your extension, implement the `context_server_command` method on your extension:

```rust
#!allow(unused)
fn main() {
impl zed::Extension for MyExtension {
    fn context_server_command(
        &mut self,
        context_server_id: &ContextServerId,
        project: &zed::Project,
    ) -> Result<zed::Command> {
        Ok(zed::Command {
            command: get_path_to_context_server_executable()?,
            args: get_args_for_context_server()?,
            env: get_env_for_context_server()?,
        })
    }
}
}
```

This method should return the command to start up a context server, along with any arguments or environment variables necessary for it to function.

If you need to download the context server from an external source—like GitHub Releases or npm—you can also do this here.

Slash Command ExtensionsAll Languages

Developing Extensions - Zed

## Developing Extensions

## Extension Capabilities

Extensions can add the following capabilities to Zed:

- Languages
- Themes
- Icon Themes
- Slash Commands
- Context Servers

## Developing an Extension Locally

Before starting to develop an extension for Zed, be sure to install Rust via rustup

> Rust must be installed via rustup. If you have Rust installed via homebrew or otherwise, installing dev extensions will not work.

When developing an extension, you can use it in Zed without needing to publish it by installing it as a _dev extension_.

From the extensions page, click the `Install Dev Extension` button and select the directory containing your extension.

If you already have a published extension with the same name installed, your dev extension will override it.

## Directory Structure of a Zed Extension

A Zed extension is a Git repository that contains an `extension.toml`. This file must contain some basic information about the extension:

```toml
id = "my-extension"
name = "My extension"
version = "0.0.1"
schema_version = 1
authors = "Your Name <you@example.com>"
description = "My cool extension"
repository = "https://github.com/your-name/my-zed-extension"
```

In addition to this, there are several other optional files and directories that can be used to add functionality to a Zed extension. An example directory structure of an extension that provides all capabilities is as follows:

```
my-extension/
  extension.toml
  Cargo.toml
  src/
    lib.rs
  languages/
    my-language/
      config.toml
      highlights.scm
  themes/
    my-theme.json
```

## WebAssembly

Procedural parts of extensions are written in Rust and compiled to WebAssembly. To develop an extension that includes custom code, include a `Cargo.toml` like this:

```toml
package
name = "my-extension"
version = "0.0.1"
edition = "2021"

lib
crate-type = "cdylib"

dependencies
zed_extension_api = "0.1.0"
```

Make sure to use the latest version of the `zed_extension_api`

In the `src/lib.rs` file in your Rust crate you will need to define a struct for your extension and implement the `Extension` trait, as well as use the `register_extension!` macro to register your extension:

```rs
use zed_extension_api as zed;

struct MyExtension {
    // ... state
}

impl zed::Extension for MyExtension {
    // ...
}

zed::register_extension!(MyExtension);
```

## Publishing your extension

To publish an extension, open a PR to the `zed-industries/extensions` repo

> Note: It is very helpful if you fork the `zed-industries/extensions` repo to a personal GitHub account instead of a GitHub organization, as this allows Zed staff to push any needed changes to your PR to expedite the publishing process.

In your PR, do the following:

1. Add your extension as a Git submodule within the `extensions/` directory

```sh
git submodule add https://github.com/your-username/foobar-zed.git extensions/foobar
git add extensions/foobar
```

2. Add a new entry to the top-level `extensions.toml` file containing your extension:

```toml
my-extension
submodule = "extensions/my-extension"
version = "0.0.1"
```

> If your extension is in a subdirectory within the submodule you can use the `path` field to point to where the extension resides.

3. Run `pnpm sort-extensions` to ensure `extensions.toml` and `.gitmodules` are sorted

Once your PR is merged, the extension will be packaged and published to the Zed extension registry.

> Extension IDs and names should not contain `zed` or `Zed`, since they are all Zed extensions.

## Updating an extension

To update an extension, open a PR to the `zed-industries/extensions` repo

In your PR do the following:

1. Update the extension's submodule to the commit of the new version.
2. Update the `version` field for the extension in `extensions.toml`

   - Make sure the `version` matches the one set in `extension.toml` at the particular commit.

If you'd like to automate this process, there is a community GitHub Action

Installing ExtensionsLanguage Extensions

Icon Theme Extensions - Zed

## Icon Themes

Extensions may provide icon themes in order to change the icons Zed uses for folders and files.

## Example extension

The Material Icon Theme

## Directory structure

There are two important directories for an icon theme extension:

- `icon_themes`: This directory will contain one or more JSON files containing the icon theme definitions.
- `icons`: This directory contains the icons assets that will be distributed with the extension. You can created subdirectories in this directory, if so desired.

Each icon theme file should adhere to the JSON schema specified at `https://zed.dev/schema/icon_themes/v0.2.0.json`

Here is an example of the structure of an icon theme:

```json
{
  "$schema": "https://zed.dev/schema/icon_themes/v0.2.0.json",
  "name": "My Icon Theme",
  "author": "Your Name",
  "themes": {
    "name": "My Icon Theme",
    "appearance": "dark",
    "directory_icons": {
      "collapsed": "./icons/folder.svg",
      "expanded": "./icons/folder-open.svg"
    },
    "chevron_icons": {
      "collapsed": "./icons/chevron-right.svg",
      "expanded": "./icons/chevron-down.svg"
    },
    "file_stems": {
      "Makefile": "make"
    },
    "file_suffixes": {
      "mp3": "audio",
      "rs": "rust"
    },
    "file_icons": {
      "audio": { "path": "./icons/audio.svg" },
      "default": { "path": "./icons/file.svg" },
      "make": { "path": "./icons/make.svg" },
      "rust": { "path": "./icons/rust.svg" }
      // ...
    }
  }
}
```

Each icon path is resolved relative to the root of the extension directory.

In this example, the extension would have a structure like so:

```
extension.toml
icon_themes/
  my-icon-theme.json
icons/
  audio.svg
  chevron-down.svg
  chevron-right.svg
  file.svg
  folder-open.svg
  folder.svg
  rust.svg
```

Theme ExtensionsSlash Command Extensions

Installing Extensions - Zed

## Installing Extensions

You can search for extensions by launching the Zed Extension Gallery by pressing `cmd-shift-x` (macOS) or `ctrl-shift-x` (Linux), opening the command palette and selecting `zed: extensions` or by selecting "Zed &gt; Extensions" from the menu bar.

Here you can view the extensions that you currently have installed or search and install new ones.

## Installation Location

- On macOS, extensions are installed in `~/Library/Application Support/Zed/extensions`.
- On Linux, they are installed in either `$XDG_DATA_HOME/zed/extensions` or `~/.local/share/zed/extensions`.

This directory contains two subdirectories:

- `installed`, which contains the source code for each extension.
- `work` which contains files created by the extension itself, such as downloaded language servers.

## Auto installing

To automate extension installation/uninstallation see the docs for auto_install_extensions

OverviewDeveloping Extensions

Language Extensions - Zed

## Language Extensions

Language support in Zed has several components:

- Language metadata and configuration
- Grammar
- Queries
- Language servers

## Language Metadata

Each language supported by Zed must be defined in a subdirectory inside the `languages` directory of your extension.

This subdirectory must contain a file called `config.toml` file with the following structure:

```toml
name = "My Language"
grammar = "my-language"
path_suffixes = "myl"
line_comments = "# "
```

- `name` (required) is the human readable name that will show up in the Select Language dropdown.
- `grammar` (required) is the name of a grammar. Grammars are registered separately, described below.
- `path_suffixes` is an array of file suffixes that should be associated with this language. Unlike `file_types` in settings, this does not support glob patterns.
- `line_comments` is an array of strings that are used to identify line comments in the language. This is used for the `editor::ToggleComments` keybind:

  No default binding

  for toggling lines of code.

- `tab_size` defines the indentation/tab size used for this language (default is `4`).
- `hard_tabs` whether to indent with tabs (`true`) or spaces (`false`, the default).
- `first_line_pattern` is a regular expression, that in addition to `path_suffixes` (above) or `file_types` in settings can be used to match files which should use this language. For example Zed uses this to identify Shell Scripts by matching the shebangs lines

## Grammar

Zed uses the Tree-sitter parsing library to provide built-in language-specific features. There are grammars available for many languages, and you can also develop your own grammar

```toml
grammars.gleam
repository = "https://github.com/gleam-lang/tree-sitter-gleam"
rev = "58b7cac8fc14c92b0677c542610d8738c373fa81"
```

The `repository` field must specify a repository where the Tree-sitter grammar should be loaded from, and the `rev` field must contain a Git revision to use, such as the SHA of a Git commit. An extension can provide multiple grammars by referencing multiple tree-sitter repositories.

## Tree-sitter Queries

Zed uses the syntax tree produced by the Tree-sitter

- Syntax highlighting
- Bracket matching
- Code outline/structure
- Auto-indentation
- Code injections
- Syntax overrides
- Text redactions
- Runnable code detection
- Selecting classes, functions, etc.

The following sections elaborate on how Tree-sitter queries enable these features in Zed, using JSON syntax

### Syntax highlighting

In Tree-sitter, the `highlights.scm` file defines syntax highlighting rules for a particular syntax.

Here's an example from a `highlights.scm` for JSON:

```scheme
(string) @string

(pair
  key: (string) @property.json_key)

(number) @number
```

This query marks strings, object keys, and numbers for highlighting. The following is a comprehensive list of captures supported by themes:

| Capture                  | Description                            |
| ------------------------ | -------------------------------------- |
| @attribute               | Captures attributes                    |
| @boolean                 | Captures boolean values                |
| @comment                 | Captures comments                      |
| @comment.doc             | Captures documentation comments        |
| @constant                | Captures constants                     |
| @constructor             | Captures constructors                  |
| @embedded                | Captures embedded content              |
| @emphasis                | Captures emphasized text               |
| @emphasis.strong         | Captures strongly emphasized text      |
| @enum                    | Captures enumerations                  |
| @function                | Captures functions                     |
| @hint                    | Captures hints                         |
| @keyword                 | Captures keywords                      |
| @label                   | Captures labels                        |
| @link_text               | Captures link text                     |
| @link_uri                | Captures link URIs                     |
| @number                  | Captures numeric values                |
| @operator                | Captures operators                     |
| @predictive              | Captures predictive text               |
| @preproc                 | Captures preprocessor directives       |
| @primary                 | Captures primary elements              |
| @property                | Captures properties                    |
| @punctuation             | Captures punctuation                   |
| @punctuation.bracket     | Captures brackets                      |
| @punctuation.delimiter   | Captures delimiters                    |
| @punctuation.list_marker | Captures list markers                  |
| @punctuation.special     | Captures special punctuation           |
| @string                  | Captures string literals               |
| @string.escape           | Captures escaped characters in strings |
| @string.regex            | Captures regular expressions           |
| @string.special          | Captures special strings               |
| @string.special.symbol   | Captures special symbols               |
| @tag                     | Captures tags                          |
| @tag.doctype             | Captures doctypes (e.g., in HTML)      |
| @text.literal            | Captures literal text                  |
| @title                   | Captures titles                        |
| @type                    | Captures types                         |
| @variable                | Captures variables                     |
| @variable.special        | Captures special variables             |
| @variant                 | Captures variants                      |

### Bracket matching

The `brackets.scm` file defines matching brackets.

Here's an example from a `brackets.scm` file for JSON:

```scheme
("" @open "" @close)
("{" @open "}" @close)
("\"" @open "\"" @close)
```

This query identifies opening and closing brackets, braces, and quotation marks.

| Capture | Description                                   |
| ------- | --------------------------------------------- |
| @open   | Captures opening brackets, braces, and quotes |
| @close  | Captures closing brackets, braces, and quotes |

### Code outline/structure

The `outline.scm` file defines the structure for the code outline.

Here's an example from an `outline.scm` file for JSON:

```scheme
(pair
  key: (string (string_content) @name)) @item
```

This query captures object keys for the outline structure.

| Capture        | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| @name          | Captures the content of object keys                                               |
| @item          | Captures the entire key-value pair                                                |
| @context       | Captures elements that provide context for the outline item                       |
| @context.extra | Captures additional contextual information for the outline item                   |
| @annotation    | Captures nodes that annotate outline item (doc comments, attributes, decorators)1 |

1

These annotations are used by Assistant when generating code modification steps.

### Auto-indentation

The `indents.scm` file defines indentation rules.

Here's an example from an `indents.scm` file for JSON:

```scheme
(array "" @end) @indent
(object "}" @end) @indent
```

This query marks the end of arrays and objects for indentation purposes.

| Capture | Description                                        |
| ------- | -------------------------------------------------- |
| @end    | Captures closing brackets and braces               |
| @indent | Captures entire arrays and objects for indentation |

### Code injections

The `injections.scm` file defines rules for embedding one language within another, such as code blocks in Markdown or SQL queries in Python strings.

Here's an example from an `injections.scm` file for Markdown:

```scheme
(fenced_code_block
  (info_string
    (language) @injection.language)
  (code_fence_content) @injection.content)

((inline) @content
 (#set! injection.language "markdown-inline"))
```

This query identifies fenced code blocks, capturing the language specified in the info string and the content within the block. It also captures inline content and sets its language to "markdown-inline".

| Capture             | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| @injection.language | Captures the language identifier for a code block          |
| @injection.content  | Captures the content to be treated as a different language |

Note that we couldn't use JSON as an example here because it doesn't support language injections.

### Syntax overrides

The `overrides.scm` file defines syntactic _scopes_ that can be used to override certain editor settings within specific language constructs.

For example, there is a language-specific setting called `word_characters` that controls which non-alphabetic characters are considered part of a word, for example when you double click to select a variable. In JavaScript, "$" and "#" are considered word characters.

There is also a language-specific setting called `completion_query_characters` that controls which characters trigger autocomplete suggestions. In JavaScript, when your cursor is within a _string_, "-" is should be considered a completion query character. To achieve this, the JavaScript `overrides.scm` file contains the following pattern:

```scheme

  (string)
  (template_string)
 @string
```

And the JavaScript `config.toml` contains this setting:

```toml
word_characters = "#", "$"

overrides.string
completion_query_characters = "-"
```

You can also disable certain auto-closing brackets in a specific scope. For example, to prevent auto-closing `'` within strings, you could put the following in the JavaScript `config.toml`:

```toml
brackets =
  { start = "'", end = "'", close = true, newline = false, not_in = "string"
  # other pairs...

```

#### Range inclusivity

By default, the ranges defined in `overrides.scm` are _exclusive_. So in the case above, if you cursor was _outside_ the quotation marks delimiting the string, the `string` scope would not take effect. Sometimes, you may want to make the range _inclusive_. You can do this by adding the `.inclusive` suffix to the capture name in the query.

For example, in JavaScript, we also disable auto-closing of single quotes within comments. And the comment scope must extend all the way to the newline after a line comment. To achieve this, the JavaScript `overrides.scm` contains the following pattern:

```scheme
(comment) @comment.inclusive
```

### Text objects

The `textobjects.scm` file defines rules for navigating by text objects. This was added in Zed v0.165 and is currently used only in Vim mode.

Vim provides two levels of granularity for navigating around files. Section-by-section with ``etc., and method-by-method with`m` etc. Even languages that don't support functions and classes can work well by defining similar concepts. For example CSS defines a rule-set as a method, and a media-query as a class.

For languages with closures, these typically should not count as functions in Zed. This is best-effort however, as languages like Javascript do not syntactically differentiate syntactically between closures and top-level function declarations.

For languages with declarations like C, provide queries that match `@class.around` or `@function.around`. The `if` and `ic` text objects will default to these if there is no inside.

If you are not sure what to put in textobjects.scm, both nvim-treesitter-textobjects(https://github.com/nvim-treesitter/nvim-treesitter-textobjects), and the Helix editor have queries for many languages. You can refer to the Zed built-in languages

| Capture          | Description                                                             | Vim mode                                    |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| @function.around | An entire function definition or equivalent small section of a file.    | `m`, `m`, `M`,`M` motions. `af` text object |
| @function.inside | The function body (the stuff within the braces).                        | `if` text object                            |
| @class.around    | An entire class definition or equivalent large section of a file.       | `, `, `, ` motions. `ac` text object        |
| @class.inside    | The contents of a class definition.                                     | `ic` text object                            |
| @comment.around  | An entire comment (e.g. all adjacent line comments, or a block comment) | `gc` text object                            |
| @comment.inside  | The contents of a comment                                               | `igc` text object (rarely supported)        |

For example:

```scheme
; include only the content of the method in the function
(method_definition
    body: (_
        "{"
        (_)* @function.inside
        "}")) @function.around

; match function.around for declarations with no body
(function_signature_item) @function.around

; join all adjacent comments into one
(comment)+ @comment.around
```

### Text redactions

The `redactions.scm` file defines text redaction rules. When collaborating and sharing your screen, it makes sure that certain syntax nodes are rendered in a redacted mode to avoid them from leaking.

Here's an example from a `redactions.scm` file for JSON:

```scheme
(pair value: (number) @redact)
(pair value: (string) @redact)
(array (number) @redact)
(array (string) @redact)
```

This query marks number and string values in key-value pairs and arrays for redaction.

| Capture | Description                    |
| ------- | ------------------------------ |
| @redact | Captures values to be redacted |

### Runnable code detection

The `runnables.scm` file defines rules for detecting runnable code.

Here's an example from an `runnables.scm` file for JSON:

```scheme
(
    (document
        (object
            (pair
                key: (string
                    (string_content) @_name
                    (#eq? @_name "scripts")
                )
                value: (object
                    (pair
                        key: (string (string_content) @run @script)
                    )
                )
            )
        )
    )
    (#set! tag package-script)
    (#set! tag composer-script)
)
```

This query detects runnable scripts in package.json and composer.json files.

The `@run` capture specifies where the run button should appear in the editor. Other captures, except those prefixed with an underscore, are exposed as environment variables with a prefix of `ZED_CUSTOM_$(capture_name)` when running the code.

| Capture | Description                                            |
| ------- | ------------------------------------------------------ |
| @\_name | Captures the "scripts" key                             |
| @run    | Captures the script name                               |
| @script | Also captures the script name (for different purposes) |

## Language Servers

Zed uses the Language Server Protocol

An extension may provide any number of language servers. To provide a language server from your extension, add an entry to your `extension.toml` with the name of your language server and the language(s) it applies to:

```toml
language_servers.my-language
name = "My Language LSP"
languages = "My Language"
```

Then, in the Rust code for your extension, implement the `language_server_command` method on your extension:

```rust
#!allow(unused)
fn main() {
impl zed::Extension for MyExtension {
    fn language_server_command(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<zed::Command> {
        Ok(zed::Command {
            command: get_path_to_language_server_executable()?,
            args: get_args_for_language_server()?,
            env: get_env_for_language_server()?,
        })
    }
}
}
```

You can customize the handling of the language server using several optional methods in the `Extension` trait. For example, you can control how completions are styled using the `label_for_completion` method. For a complete list of methods, see the API docs for the Zed extension API

Developing ExtensionsTheme Extensions

Slash Command Extensions - Zed

## Slash Commands

Extensions may provide slash commands for use in the Assistant.

## Example extension

To see a working example of an extension that provides slash commands, check out the `slash-commands-example` extension

This extension can be installed as a dev extension

## Defining slash commands

A given extension may provide one or more slash commands. Each slash command must be registered in the `extension.toml`.

For example, here is an extension that provides two slash commands: `/echo` and `/pick-one`:

```toml
slash_commands.echo
description = "echoes the provided input"
requires_argument = true

slash_commands.pick-one
description = "pick one of three options"
requires_argument = true
```

Each slash command may define the following properties:

- `description`: A description of the slash command that will be shown when completing available commands.
- `requires_argument`: Indicates whether a slash command requires at least one argument to run.

## Implementing slash command behavior

To implement behavior for your slash commands, implement `run_slash_command` for your extension.

This method accepts the slash command that will be run, the list of arguments passed to it, and an optional `Worktree`.

This method returns `SlashCommandOutput`, which contains the textual output of the command in the `text` field. The output may also define `SlashCommandOutputSection`s that contain ranges into the output. These sections are then rendered as creases in the Assistant's context editor.

Your extension should `match` on the command name (without the leading `/`) and then execute behavior accordingly:

```rs
impl zed::Extension for MyExtension {
    fn run_slash_command(
        &self,
        command: SlashCommand,
        args: Vec<String>,
        _worktree: Option<&Worktree>,
    ) -> Result<SlashCommandOutput, String> {
        match command.name.as_str() {
            "echo" => {
                if args.is_empty() {
                    return Err("nothing to echo".to_string());
                }

                let text = args.join(" ");

                Ok(SlashCommandOutput {
                    sections: vec!SlashCommandOutputSection {
                        range: (0..text.len()).into(),
                        label: "Echo".to_string(),
                    },
                    text,
                })
            }
            "pick-one" => {
                let Some(selection) = args.first() else {
                    return Err("no option selected".to_string());
                };

                match selection.as_str() {
                    "option-1" | "option-2" | "option-3" => {}
                    invalid_option => {
                        return Err(format!("{invalid_option} is not a valid option"));
                    }
                }

                let text = format!("You chose {selection}.");

                Ok(SlashCommandOutput {
                    sections: vec!SlashCommandOutputSection {
                        range: (0..text.len()).into(),
                        label: format!("Pick One: {selection}"),
                    },
                    text,
                })
            }
            command => Err(format!("unknown slash command: \"{command}\"")),
        }
    }
}
```

## Auto-completing slash command arguments

For slash commands that have arguments, you may also choose to implement `complete_slash_command_argument` to provide completions for your slash commands.

This method accepts the slash command that will be run and the list of arguments passed to it. It returns a list of `SlashCommandArgumentCompletion`s that will be shown in the completion menu.

A `SlashCommandArgumentCompletion` consists of the following properties:

- `label`: The label that will be shown in the completion menu.
- `new_text`: The text that will be inserted when the completion is accepted.
- `run_command`: Whether the slash command will be run when the completion is accepted.

Once again, your extension should `match` on the command name (without the leading `/`) and return the desired argument completions:

```rs
impl zed::Extension for MyExtension {
    fn complete_slash_command_argument(
        &self,
        command: SlashCommand,
        _args: Vec<String>,
    ) -> Result<Vec<SlashCommandArgumentCompletion>, String> {
        match command.name.as_str() {
            "echo" => Ok(vec!),
            "pick-one" => Ok(vec!
                SlashCommandArgumentCompletion {
                    label: "Option One".to_string(),
                    new_text: "option-1".to_string(),
                    run_command: true,
                },
                SlashCommandArgumentCompletion {
                    label: "Option Two".to_string(),
                    new_text: "option-2".to_string(),
                    run_command: true,
                },
                SlashCommandArgumentCompletion {
                    label: "Option Three".to_string(),
                    new_text: "option-3".to_string(),
                    run_command: true,
                },
            ),
            command => Err(format!("unknown slash command: \"{command}\"")),
        }
    }
}
```

Icon Theme ExtensionsContext Server Extensions

Theme Extensions - Zed

## Themes

The `themes` directory in an extension should contain one or more theme files.

Each theme file should adhere to the JSON schema specified at `https://zed.dev/schema/themes/v0.2.0.json`

See this blog post

## Theme JSON Structure

The structure of a Zed theme is defined in the Zed Theme JSON Schema

A Zed theme consists of a Theme Family object including:

- `name`: The name for the theme family
- `author`: The name of the author of the theme family
- `themes`: An array of Themes belonging to the theme family

The core components a Theme object include:

1. Theme Metadata:

   - `name`: The name of the theme
   - `appearance`: Either "light" or "dark"

2. Style Properties under the `style`, such as:

   - `background`: The main background color
   - `foreground`: The main text color
   - `accent`: The accent color used for highlighting and emphasis

3. Syntax Highlighting:

   - `syntax`: An object containing color definitions for various syntax elements (e.g., keywords, strings, comments)

4. UI Elements:

   - Colors for various UI components such as:

     - `element.background`: Background color for UI elements
     - `border`: Border colors for different states (normal, focused, selected)
     - `text`: Text colors for different states (normal, muted, accent)

5. Editor-specific Colors:

   - Colors for editor-related elements such as:

     - `editor.background`: Editor background color
     - `editor.gutter`: Gutter colors
     - `editor.line_number`: Line number colors

6. Terminal Colors:

   - ANSI color definitions for the integrated terminal

We recommend looking at our existing themes

Language ExtensionsIcon Theme Extensions

Ansible - Zed

## Ansible

Support for Ansible in Zed is provided via a community-maintained Ansible extension

- Tree-sitter: zed-industries/tree-sitter-yaml
- Language Server: ansible/vscode-ansible

## Setup

### File detection

By default, to avoid mishandling non-Ansible YAML files, the Ansible Language is not associated with any file extensions by default. To change this behavior you can add a `"file_types"` section to the Zed settings inside your project (`.zed/settings.json`) or your Zed user settings (`~/.config/zed/settings.json`) to match your folder/naming conventions. For example:

```json
"file_types": {
    "Ansible":
      "**.ansible.yml",
      "**.ansible.yaml",
      "**/defaults/*.yml",
      "**/defaults/*.yaml",
      "**/meta/*.yml",
      "**/meta/*.yaml",
      "**/tasks/*.yml",
      "**/tasks/*.yml",
      "**/tasks/*.yaml",
      "**/handlers/*.yml",
      "**/handlers/*.yaml",
      "**/group_vars/*.yml",
      "**/group_vars/*.yaml",
      "**/playbooks/*.yaml",
      "**/playbooks/*.yml",
      "**playbook*.yaml",
      "**playbook*.yml"

  }
```

Feel free to modify this list as per your needs.

### LSP Configuration

LSP options for this extension can be configured under Zed's settings file. To get the best experience, add the following configuration under the `"lsp"` section in your `~/.zed/settings.json`:

```json
"lsp": {
  // Note, the Zed Ansible extension prefixes all settings with `ansible`
  // so instead of using `ansible.ansible.path` use `ansible.path`.
  "ansible-language-server": {
    "settings": {
      "ansible": {
        "path": "ansible"
      },
      "executionEnvironment": {
        "enabled": false
      },
      "python": {
        "interpreterPath": "python3"
      },
      "validation": {
        "enabled": true,
        // To enable linting, manually install ansible-lint and make sure it is your PATH
        "lint": {
          "enabled": true,
          "path": "ansible-lint"
        }
      }
    }
  }
}
```

This config was conveniently adopted from nvim-lspconfig

A full list of options/settings, that can be passed to the server, can be found at the project's page here

All LanguagesAsciiDoc

AsciiDoc - Zed

## AsciiDoc

AsciiDoc language support in Zed is provided by the community-maintained AsciiDoc extension. Report issues to: https://github.com/andreicek/zed-asciidoc/issues

- Tree-sitter: cathaysia/tree-sitter-asciidoc

AnsibleAstro

Astro - Zed

## Astro

Astro support is available through the Astro extension

- Tree-sitter: virchau13/tree-sitter-astro
- Language Server: withastro/language-tools

AsciiDocBash

Bash - Zed

## Bash

Bash language support in Zed is provided by the community-maintained Basher extension. Report issues to: https://github.com/d1y/bash.zed/issues

- Tree-sitter: tree-sitter/tree-sitter-bash
- Language Server: bash-lsp/bash-language-server

## Configuration

When `shellcheck` is available `bash-language-server` will use it internally to provide diagnostics.

### Install `shellcheck`:

```sh
brew install shellcheck             # macOS (HomeBrew)
apt-get install shellcheck          # Ubuntu/Debian
pacman -S shellcheck                # ArchLinux
dnf install shellcheck              # Fedora
yum install shellcheck              # CentOS/RHEL
zypper install shellcheck           # openSUSE
choco install shellcheck            # Windows (Chocolatey)
```

And verify it is available from your path:

```sh
which shellcheck
shellcheck --version
```

If you wish to customize the warnings/errors reported you just need to create a `.shellcheckrc` file. You can do this in the root of your project or in your home directory (`~/.shellcheckrc`). See: shellcheck documentation

### See also:

- Zed Docs: Language Support: Shell Scripts

AstroBiome

Biome - Zed

## Biome

Biome(https://biomejs.dev/) support in Zed is provided by the community-maintained Biome extension. Report issues to: https://github.com/biomejs/biome-zed/issues

- Language Server: biomejs/biome

## Biome Language Support

The Biome extension includes support for the following languages:

- JavaScript
- TypeScript
- JSX
- TSX
- JSON
- JSONC
- Vue.js
- Astro
- Svelte
- CSS

## Configuration

By default, the `biome.json` file is required to be in the root of the workspace.

```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json"
}
```

For a full list of `biome.json` options see Biome Configuration

See the Biome Zed Extension README

BashC

C - Zed

## C

C support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-c
- Language Server: clangd/clangd

## Clangd: Force detect as C

Clangd out of the box assumes mixed C++/C projects. If you have a C-only project you may wish to instruct clangd to all files as C using the `-xc` flag. To do this, create a `.clangd` file in the root of your project with the following:

```yaml
CompileFlags:
  Add: -xc
```

By default clang and gcc by will recognize `*.C` and `*.H` (uppercase extensions) as C++ and not C and so Zed too follows this convention. If you are working with a C-only project (perhaps one with legacy uppercase pathing like `FILENAME.C`) you can override this behavior by adding this to your settings:

```json
{
  "file_types": {
    "C": "C", "H"
  }
}
```

## Formatting

By default Zed will use the `clangd` language server for formatting C code. The Clangd is the same as the `clang-format` CLI tool. To configure this you can add a `.clang-format` file. For example:

```yaml
---
BasedOnStyle: GNU
IndentWidth: 2
---
```

See Clang-Format Style Options

You can trigger formatting via `cmd-shift-i|ctrl-shift-i` or the `editor: format` action from the command palette or by adding `format_on_save` to your Zed settings:

```json
  "languages": {
    "C": {
      "format_on_save": "on",
      "tab_size": 2
    }
  }
```

See Clang-Format Style Options

## Compile Commands

For some projects Clangd requires a `compile_commands.json` file to properly analyze your project. This file contains the compilation database that tells clangd how your project should be built.

### CMake Compile Commands

With CMake, you can generate `compile_commands.json` automatically by adding the following line to your `CMakeLists.txt`:

```cmake
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```

After building your project, CMake will generate the `compile_commands.json` file in the build directory and clangd will automatically pick it up.

BiomeC++

Clojure - Zed

## Clojure

Clojure support is available through the Clojure extension

- Tree-sitter: prcastro/tree-sitter-clojure
- Language Server: clojure-lsp/clojure-lsp

C#CSS

C++ - Zed

## C++

C++ support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-cpp
- Language Server: clangd/clangd

## Binary

You can configure which `clangd` binary Zed should use.

To use a binary in a custom location, add the following to your `settings.json`:

```json
{
  "lsp": {
    "clangd": {
      "binary": {
        "path": "/path/to/clangd",
        "arguments":
      }
    }
  }
}
```

If you want to disable Zed looking for a `clangd` binary, you can set `ignore_system_version` to `true`:

```json
{
  "lsp": {
    "clangd": {
      "binary": {
        "ignore_system_version": true
      }
    }
  }
}
```

## Arguments

You can pass any number of arguments to clangd. To see a full set of available options, run `clangd --help` from the command line. For example with `--function-arg-placeholders=0` completions contain only parentheses for function calls, while the default (`--function-arg-placeholders=1`) completions also contain placeholders for method parameters.

```json
{
  "lsp": {
    "clangd": {
      "binary": {
        "path": "/path/to/clangd",
        "arguments": "--function-arg-placeholders=0"
      }
    }
  }
}
```

## Formatting

By default Zed will use the `clangd` language server for formatting C++ code. The Clangd is the same as the `clang-format` CLI tool. To configure this you can add a `.clang-format` file. For example:

```yaml
---
BasedOnStyle: LLVM
IndentWidth: 4
---
Language: Cpp
## Force pointers to the type for C++.
DerivePointerAlignment: false
PointerAlignment: Left
---
```

See Clang-Format Style Options

You can trigger formatting via `cmd-shift-i|ctrl-shift-i` or the `editor: format` action from the command palette or by adding `format_on_save` to your Zed settings:

```json
  "languages": {
    "C++": {
      "format_on_save": "on",
      "tab_size": 2
    }
  }
```

## More server configuration

In the root of your project, it is generally common to create a `.clangd` file to set extra configuration.

```text
CompileFlags:
  Add:
    - "--include-directory=/path/to/include"
Diagnostics:
  MissingIncludes: Strict
  UnusedIncludes: Strict
```

For more advanced usage of clangd configuration file, take a look into their official page

## Compile Commands

For some projects Clangd requires a `compile_commands.json` file to properly analyze your project. This file contains the compilation database that tells clangd how your project should be built.

### CMake Compile Commands

With CMake, you can generate `compile_commands.json` automatically by adding the following line to your `CMakeLists.txt`:

```cmake
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```

After building your project, CMake will generate the `compile_commands.json` file in the build directory and clangd will automatically pick it up.

CC#

C# - Zed

## C#

Note language name is "CSharp" for settings not "C#'

C# support is available through the C# extension

- Tree-sitter: tree-sitter/tree-sitter-c-sharp
- Language Server: OmniSharp/omnisharp-roslyn

## Configuration

The `OmniSharp` binary can be configured in a Zed settings file with:

```json
{
  "lsp": {
    "omnisharp": {
      "binary": {
        "path": "/path/to/OmniSharp",
        "arguments": "optional", "additional", "args", "-lsp"
      }
    }
  }
}
```

If you want to disable Zed looking for a `omnisharp` binary, you can set `ignore_system_version` to `true`:

```json
{
  "lsp": {
    "omnisharp": {
      "binary": {
        "ignore_system_version": true
      }
    }
  }
}
```

C++Clojure

CSS - Zed

## CSS

CSS support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-css
- Language Servers:

  - microsoft/vscode-html-languageservice
  - tailwindcss-language-server

## See also:

- HTML
- TypeScript
- JavaScript

ClojureDart

Dart - Zed

## Dart

Dart support is available through the Dart extension

- Tree-sitter: UserNobody14/tree-sitter-dart
- Language Server: dart language-server

## Pre-requisites

You will need to install the Dart SDK.

You can install dart from dart.dev/get-dart

## Configuration

The dart extension requires no configuration if you have `dart` in your path:

```sh
which dart
dart --version
```

If you would like to use a specific dart binary or use dart via FVM you can specify the `dart` binary in your Zed settings.jsons file:

```json
{
  "lsp": {
    "dart": {
      "binary": {
        "path": "/opt/homebrew/bin/fvm",
        "arguments": "dart", "language-server", "--protocol=lsp"
      }
    }
  }
}
```

### Formatting

Dart by-default uses a very conservative maximum line length (80). If you would like the dart LSP to permit a longer line length when auto-formatting, add the following to your Zed settings.json:

```json
{
  "lsp": {
    "dart": {
      "settings": {
        "lineLength": 140
      }
    }
  }
}
```

Please see the Dart documentation for more information on dart language-server capabilities

CSSDeno

Deno - Zed

## Deno

Deno support is available through the Deno extension

- Language server: Deno Language Server

## Deno Configuration

To use the Deno Language Server with TypeScript and TSX files, you will likely wish to to disable the default language servers and enable deno by adding the following to your settings.json:

```json
{
  "lsp": {
    "deno": {
      "settings": {
        "deno": {
          "enable": true
        }
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers":
        "deno",
        "!typescript-language-server",
        "!vtsls",
        "!eslint"
      ,
      "formatter": "language_server"
    },
    "TSX": {
      "language_servers":
        "deno",
        "!typescript-language-server",
        "!vtsls",
        "!eslint"
      ,
      "formatter": "language_server"
    }
  }
}
```

See Configuring supported languages

## See also:

- TypeScript
- JavaScript

DartDiff

Diff - Zed

## Diff

Diff support is available natively in Zed.

- Tree-sitter: zed-industries/the-mikedavis/tree-sitter-diff

## Configuration

Zed will not attempt to format diff files and has `remove_trailing_whitespace_on_save` and `ensure-final-newline-on-save`

Zed will automatically recognize files with `patch` and `diff` extensions as Diff files. To recognize other extensions, add them to `file_types` in your Zed settings.json:

```json
  "file_types": {
    "Diff": "dif"
  },
```

DenoDocker

Docker - Zed

## Docker

Support for `Dockerfile` and `docker-compose.yaml` in Zed is provided by community-maintained extensions.

## Docker Compose

Docker `compose.yaml` language support in Zed is provided by the Docker Compose extension. Please report issues to: https://github.com/eth0net/zed-docker-compose/issues

- Language Server: microsoft/compose-language-service

## Dockerfile

`Dockerfile` language support in Zed is provided by the Dockerfile extension. Please issues to: https://github.com/d1y/dockerfile.zed/issues

- Tree-sitter: camdencheek/tree-sitter-dockerfile
- Language Server: rcjsuen/dockerfile-language-server

DiffElixir

Elixir - Zed

## Elixir

Elixir support is available through the Elixir extension

- Tree-sitter:

  - elixir-lang/tree-sitter-elixir
  - phoenixframework/tree-sitter-heex

- Language servers:

  - elixir-lsp/elixir-ls
  - elixir-tools/next-ls
  - lexical-lsp/lexical

## Choosing a language server

The Elixir extension offers language server support for `elixir-ls`, `next-ls`, and `lexical`.

`elixir-ls` is enabled by default.

To switch to `next-ls`, add the following to your `settings.json`:

```json
{
  "languages": {
    "Elixir": {
      "language_servers": "next-ls", "!elixir-ls", "..."
    }
  }
}
```

To switch to `lexical`, add the following to your `settings.json`:

```json
{
  "languages": {
    "Elixir": {
      "language_servers": "lexical", "!elixir-ls", "..."
    }
  }
}
```

## Setting up `elixir-ls`

1. Install `elixir`:

```sh
brew install elixir
```

2. Install `elixir-ls`:

```sh
brew install elixir-ls
```

3. Restart Zed

> If `elixir-ls` is not running in an elixir project, check the error log via the command palette action `zed: open log`. If you find an error message mentioning: `invalid LSP message header "Shall I install Hex? (if running non-interactively, use \"mix local.hex --force\") Yn`, you might need to install `Hex`

### Formatting with Mix

If you prefer to format your code with Mix

```json
{
  "languages": {
    "Elixir": {
      "format_on_save": {
        "external": {
          "command": "mix",
          "arguments": "format", "--stdin-filename", "{buffer_path}", "-"
        }
      }
    }
  }
}
```

### Additional workspace configuration options

You can pass additional elixir-ls workspace configuration options via lsp settings in `settings.json`.

The following example disables dialyzer:

```json
"lsp": {
  "elixir-ls": {
    "settings": {
      "dialyzerEnabled": false
    }
  }
}
```

See ElixirLS configuration settings

### HEEx

Zed also supports HEEx templates. HEEx is a mix of EEx

- Tree-sitter: phoenixframework/tree-sitter-heex

DockerElm

Elm - Zed

## Elm

Elm support is available through the Elm extension

- Tree-sitter: elm-tooling/tree-sitter-elm
- Language Server: elm-tooling/elm-language-server

## Setup

Zed support for Elm requires installation of `elm`, `elm-format`, and `elm-review`.

1. Install Elm
2. Install `elm-review` to support code linting:

   ```sh
   npm install elm-review --save-dev
   ```

3. Install `elm-format` to support automatic formatting

   ```sh
   npm install -g elm-format
   ```

## Configuring `elm-language-server`

Elm language server can be configured in your `settings.json`, e.g.:

```json
{
  "lsp": {
    "elm-language-server": {
      "initialization_options": {
        "disableElmLSDiagnostics": true,
        "onlyUpdateDiagnosticsOnSave": false,
        "elmReviewDiagnostics": "warning"
      }
    }
  }
}
```

`elm-format`, `elm-review` and `elm` need to be installed and made available in the environment or configured in the settings. See the full list of server settings here

ElixirEmmet

Emmet - Zed

## Emmet

Emmet

- Language Server: olrtg/emmet-language-server

ElmErlang

Erlang - Zed

## Erlang

Erlang support is available through the Erlang extension

- Tree-sitter: WhatsApp/tree-sitter-erlang
- Language Servers:

  - erlang-ls/erlang_ls
  - WhatsApp/erlang-language-platform

## Choosing a language server

The Erlang extension offers language server support for `erlang_ls` and `erlang-language-platform`.

`erlang_ls` is enabled by default.

To switch to `erlang-language-platform`, add the following to your `settings.json`:

```json
{
  "languages": {
    "Erlang": {
      "language_servers": "elp", "!erlang-ls", "..."
    }
  }
}
```

## See also:

- Elixir
- Gleam

EmmetFish

Fish - Zed

## Fish

Fish language support in Zed is provided by the community-maintained Fish extension. Report issues to: https://github.com/hasit/zed-fish/issues

- Tree-sitter: ram02z/tree-sitter-fish

ErlangGDScript

GDScript - Zed

## GDScript

Godot GDScript(https://gdscript.com/) language support in Zed is provided by the community-maintained GDScript extension. Report issues to: https://github.com/grndctrl/zed-gdscript/issues

- Tree-sitter: PrestonKnopp/tree-sitter-gdscript and PrestonKnopp/tree-sitter-godot-resource
- Language Server: gdscript-language-server

## Setup

1. Download and install Godot for MacOS
2. Unzip the Godot.app and drag it into your /Applications folder.
3. Open Godot.app and open your project (an example project is fine)
4. In Godot, Editor Menu -&gt; Editor Settings; scroll down the left sidebar to `Text Editor -> External`

   1. Use External Editor: "✅ On"
   2. Exec path: `/Applications/Zed.app/Contents/MacOS/zed`
   3. Exec flags: `{project} {file}:{line}:{col}`
   4. Close settings to save.

5. In Godot double click on a \*.gd script and Zed will launch

## Usage

When Godot is running, the GDScript extension will connect to the language server provided by the Godot runtime and will provide `jump to definition`, hover states when you hold cmd and other language server features.

> Note: If Zed is already running with an existing workspace, spawning from Godot will fail. Quit Zed and it should work again.

FishGleam

Gleam - Zed

## Gleam

Gleam support is available through the Gleam extension(https://github.com/gleam-lang/zed-gleam). To learn about Gleam, see the docs(https://gleam.run/documentation/) or check out the `stdlib` reference. The Gleam language server has a variety of features, including go-to definition, automatic imports, and more

- Tree-sitter: gleam-lang/tree-sitter-gleam
- Language Server: gleam lsp

See also:

- Elixir
- Erlang

GDScriptGLSL

GLSL - Zed

## GLSL

GLSL (OpenGL Shading Language) support is available through the GLSL Extension

- Tree-sitter: theHamsta/tree-sitter-glsl
- Language Server: nolanderc/glsl_analyzer

GleamGo

Go - Zed

## Go

Go support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-go
- Language Server: golang/tools/tree/master/gopls

## Setup

We recommend installing gopls via go's package manager and not via Homebrew or your Linux distribution's package manager.

1. Make sure you have uninstalled any version of gopls you have installed via your package manager:

```sh
## MacOS homebrew
brew remove gopls
## Ubuntu
sudo apt-get remove gopls
sudo snap remove gopls
## Arch
sudo pacman -R gopls
```

2. Install/Update `gopls` to the latest version using the go module tool:

```sh
go install golang.org/x/tools/gopls@latest
```

3. Ensure that `gopls` is in your path:

```sh
which gopls
gopls version
```

If `gopls` is not found you will likely need to add `export PATH="$PATH:$HOME/go/bin"` to your `.zshrc` / `.bash_profile`

## Inlay Hints

Zed sets the following initialization options for inlay hints:

```json
"hints": {
    "assignVariableTypes": true,
    "compositeLiteralFields": true,
    "compositeLiteralTypes": true,
    "constantValues": true,
    "functionTypeParameters": true,
    "parameterNames": true,
    "rangeVariableTypes": true
}
```

to make the language server send back inlay hints when Zed has them enabled in the settings.

Use

```json
"lsp": {
    "gopls": {
        "initialization_options": {
            "hints": {
                ....
            }
        }
    }
}
```

to override these settings.

See gopls inlayHints documentation

## Go Mod

- Tree-sitter: camdencheek/tree-sitter-go-mod
- Language Server: N/A

## Go Sum

- Tree-sitter: amaanq/tree-sitter-go-sum
- Language Server: N/A

## Go Work

- Tree-sitter: tree-sitter-go-work
- Language Server: N/A

GLSLGroovy

Groovy - Zed

## Groovy

Groovy language support in Zed is provided by the community-maintained Groovy extension. Report issues to: https://github.com/valentinegb/zed-groovy/issues

- Tree-sitter: murtaza64/tree-sitter-groovy
- Language Server: GroovyLanguageServer/groovy-language-server

GoHaskell

Haskell - Zed

## Haskell

Haskell support is available through the Haskell extension

- Tree-sitter: tree-sitter-haskell
- Language Server: haskell-language-server

## Installing HLS

Recommended method to install haskell-language-server is via ghcup

```sh
ghcup install hls
which haskell-language-server-wrapper
```

## Configuring HLS

If you need to configure haskell-language-server (hls) you can add configuration options to your Zed settings.json:

```json
{
  "lsp": {
    "hls": {
      "initialization_options": {
        "haskell": {
          "formattingProvider": "fourmolu"
        }
      }
    }
  }
}
```

See the official configuring haskell-language-server

If you would like to use a specific hls binary, or perhaps use static-ls

```json
{
  "lsp": {
    "hls": {
      "binary": {
        "path": "static-ls",
        "arguments": "--experimentalFeatures"
      }
    }
  }
}
```

GroovyHelm

Helm - Zed

## Helm

Support for Helm in Zed is provided by the community-maintained Helm extension

- Tree-sitter: tree-sitter-go-template
- Language Server: mrjosh/helm-ls

## Setup

Enable Helm language for Helm files by editing your `.zed/settings.json` and adding:

```json
  "file_types": {
    "Helm":
      "**/templates/**/*.tpl",
      "**/templates/**/*.yaml",
      "**/templates/**/*.yml",
      "**/helmfile.d/**/*.yaml",
      "**/helmfile.d/**/*.yml"

  }
```

HaskellHTML

HTML - Zed

## HTML

HTML support is available through the HTML extension

- Tree-sitter: tree-sitter/tree-sitter-html
- Language Server: microsoft/vscode-html-languageservice

This extension is automatically installed.

If you do not want to use the HTML extension, you can add the following to your settings:

```json
{
  "auto_install_extensions": {
    "html": false
  }
}
```

## Formatting

By default Zed uses Prettier

You can disable `format_on_save` by adding the following to your Zed settings:

```json
  "languages": {
    "HTML": {
      "format_on_save": "off",
    }
  }
```

You can still trigger formatting manually with `cmd-shift-i|ctrl-shift-i` or by opening the command palette (

No default binding

and selecting `Format Document`.

### LSP Formatting

If you prefer you can use `vscode-html-language-server` instead of Prettier for auto-formatting by adding the following to your Zed settings:

```json
  "languages": {
    "HTML": {
      "formatter": "language_server",
    }
  }
```

You can customize various formatting options

```json
  "lsp": {
    "vscode-html-language-server": {
      "settings": {
        "html": {
          "format": {
            // Indent under <html> and <head> (default: false)
            "indentInnerHtml": true,
            // Disable formatting inside <svg> or <script>
            "contentUnformatted": "svg,script",
            // Add an extra newline before <div> and <p>
            "extraLiners": "div,p"
          }
        }
      }
    }
  }
```

## See also:

- CSS
- JavaScript
- TypeScript

HelmJava

Java - Zed

## Java

There are two extensions that provide Java language support for Zed:

- Zed Java: zed-extensions/java
- Java with Eclipse JDTLS: zed-java-eclipse-jdtls

Both use:

- Tree-sitter: tree-sitter/tree-sitter-java
- Language Server: eclipse-jdtls/eclipse.jdt.ls

## Install OpenJDK

You will need to install a Java runtime (OpenJDK).

- MacOS: `brew install openjdk`
- Ubuntu: `sudo add-apt-repository ppa:openjdk-23 && sudo apt-get install openjdk-23`
- Windows: `choco install openjdk`
- Arch Linux: `sudo pacman -S jre-openjdk-headless`

Or manually download and install OpenJDK 23

## Extension Install

You can install either by opening `zed: extensions`(`cmd-shift-x|ctrl-shift-x`) and searching for `java`.

We recommend you install one or the other and not both.

## Settings / Initialization Options

Both extensions will automatically download the language server, see: Manual JDTLS Install

For available `initialization_options` please see the Initialize Request section of the Eclipse.jdt.ls Wiki

You can add these customizations to your Zed Settings by launching `zed: open settings`(`cmd-,|ctrl-,`) or by using a `.zed/setting.json` inside your project.

### Zed Java Settings

```json
{
  "lsp": {
    "jdtls": {
      "initialization_options": {}
    }
  }
}
```

### Java with Eclipse JDTLS settings

```json
{
  "lsp": {
    "java": {
      "settings": {},
      "initialization_options": {}
    }
  }
}
```

## Example Configs

### Zed Java Initialization Options

There are also many more options you can pass directly to the language server, for example:

```json
{
  "lsp": {
    "jdtls": {
      "initialization_options": {
        "bundles":
        "workspaceFolders": "file:///home/snjeza/Project"
        "settings": {
          "java": {
            "home": "/usr/local/jdk-9.0.1",
            "errors": {
              "incompleteClasspath": {
                "severity": "warning"
              }
            },
            "configuration": {
              "updateBuildConfiguration": "interactive",
              "maven": {
                "userSettings": null
              }
            },
            "trace": {
              "server": "verbose"
            },
            "import": {
              "gradle": {
                "enabled": true
              },
              "maven": {
                "enabled": true
              },
              "exclusions":
                "**/node_modules/**",
                "**/.metadata/**",
                "**/archetype-resources/**",
                "**/META-INF/maven/**",
                "/**/test/**"

            },
            "jdt": {
              "ls": {
                "lombokSupport": {
                  "enabled": false // Set this to true to enable lombok support
                }
              }
            },
            "referencesCodeLens": {
              "enabled": false
            },
            "signatureHelp": {
              "enabled": false
            },
            "implementationsCodeLens": {
              "enabled": false
            },
            "format": {
              "enabled": true
            },
            "saveActions": {
              "organizeImports": false
            },
            "contentProvider": {
              "preferred": null
            },
            "autobuild": {
              "enabled": false
            },
            "completion": {
              "favoriteStaticMembers":
                "org.junit.Assert.*",
                "org.junit.Assume.*",
                "org.junit.jupiter.api.Assertions.*",
                "org.junit.jupiter.api.Assumptions.*",
                "org.junit.jupiter.api.DynamicContainer.*",
                "org.junit.jupiter.api.DynamicTest.*"
              ,
              "importOrder": "java", "javax", "com", "org"
            }
          }
        }
      }
    }
  }
}
```

### Java with Eclipse JTDLS Configuration

Configuration options match those provided in the redhat-developer/vscode-java extension

For example, to enable Lombok Support

```json
{
  "lsp": {
    "java": {
      "settings": {
        "java.jdt.ls.lombokSupport.enabled:": true
      }
    }
  }
}
```

## Manual JDTLS Install

If you prefer, you can install JDTLS yourself and both extensions can be configured to use that instead.

- MacOS: `brew install jdtls`
- Arch: `jdtls` from AUR

Or manually download install:

- JDTLS Milestone Builds
- JDTLS Snapshot Builds

## See also

- Zed Java Readme
- Java with Eclipse JDTLS Readme

## Support

If you have issues with either of these plugins, please open issues on their respective repositories:

- Zed Java Issues
- Java with Eclipse JDTLS Issues

HTMLJavaScript

JavaScript - Zed

## JavaScript

JavaScript support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-javascript
- Language Server: typescript-language-server/typescript-language-server

## Code formatting

Formatting on save is enabled by default for JavaScript, using TypeScript's built-in code formatting. But many JavaScript projects use other command-line code-formatting tools, such as Prettier. You can use one of these tools by specifying an _external_ code formatter for JavaScript in your settings. See the configuration

For example, if you have Prettier installed and on your `PATH`, you can use it to format JavaScript files by adding the following to your `settings.json`:

```json
{
  "languages": {
    "JavaScript": {
      "formatter": {
        "external": {
          "command": "prettier",
          "arguments": "--stdin-filepath", "{buffer_path}"
        }
      }
    }
  }
}
```

## JSX

Zed supports JSX syntax highlighting out of the box.

In JSX strings, the `tailwindcss-language-server`

## JSDoc

Zed supports JSDoc syntax in JavaScript and TypeScript comments that match the JSDoc syntax. Zed uses tree-sitter/tree-sitter-jsdoc

## ESLint

You can configure Zed to format code using `eslint --fix` by running the ESLint code action when formatting:

```json
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  }
}
```

You can also only execute a single ESLint rule when using `fixAll`:

```json
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  },
  "lsp": {
    "eslint": {
      "settings": {
        "codeActionOnSave": {
          "rules": "import/order"
        }
      }
    }
  }
}
```

> **Note:** the other formatter you have configured will still run, after ESLint. So if your language server or prettier configuration don't format according to ESLint's rules, then they will overwrite what ESLint fixed and you end up with errors.

If you **only** want to run ESLint on save, you can configure code actions as the formatter:

```json
{
  "languages": {
    "JavaScript": {
      "formatter": {
        "code_actions": {
          "source.fixAll.eslint": true
        }
      }
    }
  }
}
```

### Configure ESLint's `nodePath`:

You can configure ESLint's `nodePath` setting:

```json
{
  "lsp": {
    "eslint": {
      "settings": {
        "nodePath": ".yarn/sdks"
      }
    }
  }
}
```

### Configure ESLint's `problems`:

You can configure ESLint's `problems` setting.

For example, here's how to set `problems.shortenToSingleLine`:

```json
{
  "lsp": {
    "eslint": {
      "settings": {
        "problems": {
          "shortenToSingleLine": true
        }
      }
    }
  }
}
```

### Configure ESLint's `rulesCustomizations`:

You can configure ESLint's `rulesCustomizations` setting:

```json
{
  "lsp": {
    "eslint": {
      "settings": {
        "rulesCustomizations":
          // set all eslint errors/warnings to show as warnings
          { "rule": "*", "severity": "warn" }
      }
    }
  }
}
```

### Configure ESLint's `workingDirectory`:

You can configure ESLint's `workingDirectory` setting:

```json
{
  "lsp": {
    "eslint": {
      "settings": {
        "workingDirectory": {
          "mode": "auto"
        }
      }
    }
  }
}
```

## See also

- Yarn documentation
- TypeScript documentation

JavaJulia

JSON - Zed

## JSON

JSON support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-json
- Language Server: zed-industries/json-language-server

## JSONC

Zed also supports a super-set of JSON called JSONC, which allows single line comments (`//`) in JSON files. While editing these files you can use `cmd-/` (macOS) or `ctrl-/` (Linux) to toggle comments on the current line or selection.

## JSONC Prettier Formatting

If you use files with the `*.jsonc` extension when using `Format Document` or have `format_on_save` enabled, Zed invokes Prettier as the formatter. Prettier has an outstanding issue

To workaround this behavior you can add the following to your `.prettierrc`

```json
{
  "overrides":
    {
      "files": "*.jsonc"
      "options": {
        "parser": "json",
        "trailingComma": "none"
      }
    }

}
```

## JSON Language Server

Zed automatically out of the box supports JSON Schema validation of `package.json` and `tsconfig.json` files, but `json-language-server` can use JSON Schema definitions in project files, from the JSON Schema Store

### Inline Schema Specification

To specify a schema inline with your JSON files, add a `$schema` top level key linking to your json schema file.

For example to for a `.luarc.json` for use with lua-language-server

```json
{
  "$schema": "https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4"
}
```

### Schema Specification via Settings

You can alternatively associate JSON Schemas with file paths by via Zed LSP settings.

To

```json
"lsp": {
  "json-language-server": {
    "settings": {
      "json": {
        "schemas":
          {
            "fileMatch": "*/*.luarc.json"
            "url": "https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json"
          }

      }
    }
  }
}
```

You can also pass any of the supported settings

JuliaJsonnet

Jsonnet - Zed

## Jsonnet

Jsonnet language support in Zed is provided by the community-maintained Jsonnet extension

- Tree-sitter: sourcegraph/tree-sitter-jsonnet
- Language Server: grafana/jsonnet-language-server

## Configuration

Workspace configuration options can be passed to the language server via the `lsp` settings of the `settings.json`.

The following example enables support for resolving tanka

```json
{
  "lsp": {
    "jsonnet-language-server": {
      "settings": {
        "resolve_paths_with_tanka": true
      }
    }
  }
}
```

JSONKotlin

Julia - Zed

## Julia

Julia language support in Zed is provided by the community-maintained Julia extension. Report issues to: https://github.com/JuliaEditorSupport/zed-julia/issues

- Tree-sitter: tree-sitter/tree-sitter-julia
- Language Server: julia-vscode/LanguageServer.jl

JavaScriptJSON

Kotlin - Zed

## Kotlin

Kotlin language support in Zed is provided by the community-maintained Kotlin extension. Report issues to: https://github.com/zed-extensions/kotlin/issues

- Tree-sitter: fwcd/tree-sitter-kotlin
- Language Server: fwcd/kotlin-language-server

## Configuration

Workspace configuration options can be passed to the language server via lsp settings in `settings.json`.

The following example changes the JVM target from `default` (which is 1.8) to `17`:

```json
{
  "lsp": {
    "kotlin-language-server": {
      "settings": {
        "compiler": {
          "jvm": {
            "target": "17"
          }
        }
      }
    }
  }
}
```

The full list of workspace configuration options can be found here

JsonnetLua

Lua - Zed

## Lua

Lua support is available through the Lua extension

- Tree-sitter: tree-sitter-grammars/tree-sitter-lua
- Language server: LuaLS/lua-language-server

## luarc.json

To configure LuaLS you can create a `.luarc.json` file in the root of your workspace.

```json
{
  "$schema": "https://raw.githubusercontent.com/LuaLS/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4",
  "format.enable": true,
  "workspace.library": "../somedir/library"
}
```

See LuaLS Settings Documentation

### LuaCATS Definitions

LuaLS can provide enhanced LSP autocompletion suggestions and type validation with the help of LuaCATS (Lua Comment and Type System) definitions. These definitions are available for many common Lua libraries, and local paths containing them can be specified via `workspace.library` in `luarc.json`. You can do this via relative paths if you checkout your definitions into the same partent directory of your project (`../playdate-luacats`, `../love2d`, etc). Alternatively you can create submodule(s) inside your project for each LuaCATS definition repo.

### LÖVE (Love2D)

To use LÖVE (Love2D) in Zed, checkout LuaCATS/love2d

```sh
cd .. && git clone https://github.com/LuaCATS/love2d love2d-luacats
```

Then in your `.luarc.json`:

```
{
  "$schema": "https://raw.githubusercontent.com/LuaLS/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4",
  "workspace.library": "../love2d-luacats"
  "runtime.special": {
    "love.filesystem.load": "loadfile"
  }
}
```

### PlaydateSDK

To use Playdate Lua SDK in Zed, checkout playdate-luacats

```sh
cd .. && git clone https://github.com/notpeter/playdate-luacats
```

Then in your `.luarc.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/LuaLS/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4",
  "runtime.nonstandardSymbol":
    "+=",
    "-=",
    "*=",
    "/=",
    "//=",
    "%=",
    "<<=",
    ">>=",
    "&=",
    "|=",
    "^="
  ,
  "diagnostics.severity": { "duplicate-set-field": "Hint" },
  "diagnostics.globals": "import"
  "workspace.library": "../playdate-luacats"
  "format.defaultConfig": {
    "indent_style": "space",
    "indent_size": "4"
  },
  "format.enable": true,
  "runtime.builtin": { "io": "disable", "os": "disable", "package": "disable" }
}
```

### Inlay Hints

To enable Inlay Hints

1. Add the following to your Zed settings.json:

```json
  "languages": {
    "Lua": {
      "inlay_hints": {
        "enabled": true,
        "show_type_hints": true,
        "show_parameter_hints": true,
        "show_other_hints": true
      }
    }
  }
```

2. Add `"hint.enable": true` to your `.luarc.json`.

## Formatting

### LuaLS

To enable auto-formatting with your LuaLS (provided by CppCXY/EmmyLuaCodeStyle

```json
{
  "languages": {
    "Lua": {
      "format_on_save": "on",
      "formatter": "language_server"
    }
  }
}
```

You can customize various EmmyLuaCodeStyle style options via `.editorconfig`, see lua.template.editorconfig

### StyLua

Alternatively to use StyLua

1. Install StyLua
2. Add the following to your `settings.json`:

```json
{
  "languages": {
    "Lua": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "stylua",
          "arguments":
            "--syntax=Lua54",
            "--respect-ignores",
            "--stdin-filepath",
            "{buffer_path}",
            "-"

        }
      }
    }
  }
}
```

You can specify various options to StyLua either on the command line above (like `--syntax=Lua54`) or in a `stylua.toml` in your workspace:

```toml
syntax = "Lua54"
column_width = 100
line_endings = "Unix"
indent_type = "Spaces"
indent_width = 4
quote_style = "AutoPreferDouble"
call_parentheses = "Always"
collapse_simple_statement = "All"

sort_requires
enabled = true
```

For a complete list of available options, see: StyLua Options

KotlinLuau

Luau - Zed

## Luau

Luau

Luau language support in Zed is provided by the community-maintained Luau extension. Report issues to: https://github.com/4teapo/zed-luau/issues

- Tree-sitter: 4teapo/tree-sitter-luau
- Language Server: JohnnyMorganz/luau-lsp

## Configuration

Configuration instructions are available in the Luau Zed Extension README

## Formatting

To support automatically formatting your code, you can use JohnnyMorganz/StyLua

Install with:

```sh
## macOS via Homebrew
brew install stylua
## Or via Cargo
cargo install stylua --features lua52,lua53,lua54,luau
```

Then add the following to your Zed `settings.json`:

```json
  "languages": {
    "Luau": {
      "formatter": {
        "external": {
          "command": "stylua",
          "arguments": "-"
        }
      }
    }
  }
```

LuaMakefile

Makefile - Zed

## Makefile

Makefile language support in Zed is provided by the community-maintained Make extension. Report issues to: https://github.com/caius/zed-make/issues

- Tree-sitter: caius/tree-sitter-make

LuauMarkdown

Markdown - Zed

## Markdown

Markdown support is available natively in Zed.

- Tree-sitter: tree-sitter-markdown
- Language Server: N/A

## Syntax Highlighting Code Blocks

Zed supports language-specific syntax highlighting of markdown code blocks by leveraging tree-sitter language grammars. All Zed supported languages

````python
```python
import functools as ft

@ft.lru_cache(maxsize=500)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
```
````

## Configuration

### Format

Zed supports using Prettier to automatically re-format Markdown documents. You can trigger this manually via the `editor: format` action or via the `cmd-shift-i|ctrl-shift-i` keyboard shortcut. Alternately, you can automatically format by enabling `format_on_save`

```json
  "languages": {
    "Markdown": {
      "format_on_save": "on"
    }
  },
```

### Trailing Whitespace

By default Zed will remove trailing whitespace on save. If you rely on invisible trailing whitespace being converted to `<br />` in Markdown files you can disable this behavior with:

```json
  "languages": {
    "Markdown": {
      "remove_trailing_whitespace_on_save": false
    }
  },
```

MakefileNim

Nim - Zed

## Nim

Nim language support in Zed is provided by the community-maintained Nim extension. Report issues to: https://github.com/foxoman/zed-nim/issues

- Tree-sitter: alaviss/tree-sitter-nim
- Language Server: nim-lang/langserver

## Formatting

To use arnetheduck/nph as a formatter, follow the nph installation instructions

```json
  "languages": {
    "Nim": {
      "formatter": {
        "external": {
          "command": "nph",
          "arguments": "-"
        }
      }
    }
  }
```

MarkdownOCaml

OCaml - Zed

## OCaml

OCaml support is available through the OCaml extension

- Tree-sitter: tree-sitter/tree-sitter-ocaml
- Language Server: ocaml/ocaml-lsp

## Setup Instructions

If you have the development environment already setup, you can skip to Launching Zed

### Using Opam

Opam is the official package manager for OCaml and is highly recommended for getting started with OCaml. To get started using Opam, please follow the instructions provided here

Once you install opam and setup a switch with your development environment as per the instructions, you can proceed.

### Launching Zed

By now you should have `ocamllsp` installed, you can verify so by running

```sh
ocamllsp --help
```

in your terminal. If you get a help message, you're good to go. If not, please revisit the installation instructions for `ocamllsp` and ensure it's properly installed.

With that aside, we can now launch Zed. Given how the OCaml package manager works, we require you to run Zed from the terminal, so please make sure you install the Zed cli

Once you have the cli, simply from a terminal, navigate to your project and run

```sh
zed .
```

Voila! You should have Zed running with OCaml support, no additional setup required.

NimPHP

PHP - Zed

## PHP

PHP support is available through the PHP extension

- Tree-sitter: https://github.com/tree-sitter/tree-sitter-php
- Language Servers:

  - phpactor
  - intelephense

## Choosing a language server

The PHP extension offers both `phpactor` and `intelephense` language server support.

`phpactor` is enabled by default.

## Phpactor

The Zed PHP Extension can install `phpactor` automatically but requires `php` to installed and available in your path:

```sh
## brew install php            # macOS
## sudo apt-get install php    # Debian/Ubuntu
## yum install php             # CentOS/RHEL
## pacman -S php               # Arch Linux
which php
```

## Intelephense

Intelephense(https://intelephense.com/) is a proprietary(https://github.com/bmewburn/vscode-intelephense/blob/master/LICENSE.txt#L29) language server for PHP operating under a freemium model. Certain features require purchase of a premium license. To use these features you must place your licence.txt file

To switch to `intelephense`, add the following to your `settings.json`:

```json
{
  "languages": {
    "PHP": {
      "language_servers": "intelephense", "!phpactor", "..."
    }
  }
}
```

## PHPDoc

Zed supports syntax highlighting for PHPDoc comments.

- Tree-sitter: claytonrcarter/tree-sitter-phpdoc

OCamlPrisma

Prisma - Zed

## Prisma

Prisma support is available through the Prisma extension

- Tree-sitter: victorhqc/tree-sitter-prisma
- Language-Server: prisma/language-tools

PHPProto

Proto - Zed

## Proto

Proto/proto3 (Protocol Buffers definition language) support is available through the Proto extension

- Tree-sitter: coder3101/tree-sitter-proto
- Language Servers: protobuf-language-server

PrismaPureScript

PureScript - Zed

## PureScript

PureScript support is available through the PureScript extension

- Tree-sitter: postsolar/tree-sitter-purescript
- Language-Server: nwolverson/purescript-language-server

ProtoPython

Python - Zed

## Python

Python support is available natively in Zed.

- Tree-sitter: tree-sitter-python
- Language Servers:

  - microsoft/pyright
  - python-lsp/python-lsp-server

## Language Servers

Zed supports multiple Python language servers some of which may require configuration to work properly.

See: Working with Language Servers

## Virtual Environments in the Terminal

Zed will detect Python virtual environments and automatically activate them in terminal if available. See: detect_venv documentation

## PyLSP

python-lsp-server

See Python Language Server Configuration

## PyRight

### PyRight Configuration

The pyright language server offers flexible configuration options specified in a JSON-formatted text configuration. By default, the file is called `pyrightconfig.json` and is located within the root directory of your project. Pyright settings can also be specified in a `tool.pyright

For more information, see the Pyright configuration documentation

### PyRight Settings

The pyright

For example, in order to:

- use strict type-checking level
- diagnose all files in the workspace instead of the only open files default
- provide the path to a specific Python interpreter

```json
{
  "lsp": {
    "pyright": {
      "settings": {
        "python.analysis": {
          "diagnosticMode": "workspace",
          "typeCheckingMode": "strict"
        },
        "python": {
          "pythonPath": ".venv/bin/python"
        }
      }
    }
  }
}
```

For more information, see the Pyright settings documentation

### Pyright Virtual environments

A Python virtual environment

By default, the Pyright language server will look for Python packages in the default global locations. But you can also configure Pyright to use the packages installed in a given virtual environment.

To do this, create a JSON file called `pyrightconfig.json` at the root of your project. This file must include two keys:

- `venvPath`: a relative path from your project directory to any directory that _contains_ one or more virtual environment directories
- `venv`: the name of a virtual environment directory

For example, a common approach is to create a virtual environment directory called `.venv` at the root of your project directory with the following commands:

```sh
## create a virtual environment in the .venv directory
python3 -m venv .venv
## set up the current shell to use that virtual environment
source .venv/bin/activate
```

Having done that, you would create a `pyrightconfig.json` with the following content:

```json
{
  "venvPath": ".",
  "venv": ".venv"
}
```

If you prefer to use a `pyproject.toml` file, you can add the following section:

```toml
tool.pyright
venvPath = "."
venv = ".venv"
```

You can also configure this option directly in your `settings.json` file (pyright settings, as recommended in Configuring Your Python Environment

```json
{
  "lsp": {
    "pyright": {
      "settings": {
        "python": {
          "pythonPath": ".venv/bin/python"
        }
      }
    }
  }
}
```

### Code formatting &amp; Linting

The Pyright language server does not provide code formatting or linting. If you want to detect lint errors and reformat your Python code upon saving, you'll need to set up.

A common tool for formatting Python code is Ruff(https://docs.astral.sh/ruff/). It is another tool written in Rust, an extremely fast Python linter and code formatter. It is available through the Ruff extension. To configure the Ruff extension to work within Zed, see the setup documentation here

PureScriptR

R - Zed

## R

R support is available through the R extension

- Tree-sitter: r-lib/tree-sitter-r
- Language-Server: REditorSupport/languageserver

## Installation

1. Download and Install R
2. Install the R packages `languageserver` and `lintr`:

```R
install.packages("languageserver")
install.packages("lintr")
```

3. Install the R Zed extension

For example on macOS:

```sh
brew install --cask r
Rscript --version
Rscript -e 'options(repos = "https://cran.rstudio.com/"); install.packages("languageserver")'
Rscript -e 'options(repos = "https://cran.rstudio.com/"); install.packages("lintr")'
Rscript -e 'packageVersion("languageserver")'
Rscript -e 'packageVersion("lintr")'
```

## Ark Installation

To use the Zed REPL with R you need to install Ark, an R Kernel for Jupyter applications. You can down the latest version from the Ark GitHub Releases

For example to install the latest non-debug build:

```sh
## macOS
cd /tmp
curl -L -o ark-latest-darwin.zip \
    $(curl -s "https://api.github.com/repos/posit-dev/ark/releases/latest" | \
    jq -r '.assets | select(.name | contains("darwin-universal") and (contains("debug") | not)) | .browser_download_url')
unzip ark-latest-darwin.zip ark
sudo mv /tmp/ark /usr/local/bin/
```

```sh
## Linux X86_64
cd /tmp
curl -L -o ark-latest-linux.zip \
    $(curl -s "https://api.github.com/repos/posit-dev/ark/releases/latest" \
        | jq -r '.assets | select(.name | contains("linux-x64") and (contains("debug") | not)) | .browser_download_url'
    )
unzip ark-latest-linux.zip ark
sudo mv /tmp/ark /usr/local/bin/
```

PythonRego

Racket - Zed

## Racket

Racket support is available through the Racket extension

- Tree-sitter: zed-industries/tree-sitter-racket

The racket-language-server is not yet supported in Zed, please see Issue #15789

ReStructuredTextRoc

Rego - Zed

## Rego

Rego language support in Zed is provided by the community-maintained Rego extension

- Tree-sitter: FallenAngel97/tree-sitter-rego
- Language Server: StyraInc/regal

## Installation

The extensions is largely based on the Regal language server which should be installed to make use of the extension. Read the getting started

## Configuration

The extension's behavior is configured in the `.regal/config.yaml` file. The following is an example configuration which disables the `todo-comment` rule, customizes the `line-length` rule, and ignores test files for the `opa-fmt` rule:

```yaml
rules:
  style:
    todo-comment:
      # don't report on todo comments
      level: ignore
    line-length:
      # custom rule configuration
      max-line-length: 100
      # warn on too long lines, but don't fail
      level: warning
    opa-fmt:
      # not needed as error is the default, but
      # being explicit won't hurt
      level: error
      # files can be ignored for any individual rule
      # in this example, test files are ignored
      ignore:
        files:
          - "*_test.rego"
```

Read Regal's configuration documentation

RReStructuredText

Roc - Zed

## Roc

Roc

Roc language support in Zed is provided by the community-maintained Roc extension. Report issues to: https://github.com/h2000/zed-roc/issues

- Tree-sitter: faldor20/tree-sitter-roc
- Language Server: roc-lang/roc/tree/main/crates/language_server

## Setup

1. Follow instructions to Install Roc
2. Ensure `roc` and `roc_language_server` are in your PATH.

RacketRuby

ReStructuredText - Zed

## ReStructuredText (rst)

ReStructuredText language support in Zed is provided by the community-maintained reST extension. Report issues to: https://github.com/elmarco/zed-rst/issues

- Tree-sitter: stsewd/tree-sitter-rst.git
- Language Server: swyddfa/esbonio

RegoRacket

Ruby - Zed

## Ruby

Ruby support is available through the Ruby extension

- Tree-sitters:

  - tree-sitter-ruby
  - tree-sitter-embedded-template

- Language Servers:

  - ruby-lsp
  - solargraph
  - rubocop

The Ruby extension also provides support for ERB files.

## Language Servers

There are multiple language servers available for Ruby. Zed supports the two following:

- solargraph
- ruby-lsp

They both have an overlapping feature set of autocomplete, diagnostics, code actions, etc. and it's up to you to decide which one you want to use. Note that you can't use both at the same time.

In addition to these two language servers, Zed also supports rubocop

When configuring a language server, it helps to open the LSP Logs window using the 'debug: open language server logs' command. You can then choose the corresponding language instance to see any logged information.

## Configuring a language server

The Ruby extension

### Using `solargraph`

`solargraph` is enabled by default in the Ruby extension.

### Using `ruby-lsp`

To switch to `ruby-lsp`, add the following to your `settings.json`:

```json
{
  "languages": {
    "Ruby": {
      "language_servers": "ruby-lsp", "!solargraph", "!rubocop", "..."
    }
  }
}
```

That disables `solargraph` and `rubocop` and enables `ruby-lsp`.

### Using `rubocop`

The Ruby extension also provides support for `rubocop` language server for offense detection and autocorrection.

To enable it, add the following to your `settings.json`:

```json
{
  "languages": {
    "Ruby": {
      "language_servers": "ruby-lsp", "rubocop", "!solargraph", "..."
    }
  }
}
```

Or, conversely, you can disable `ruby-lsp` and enable `solargraph` and `rubocop` by adding the following to your `settings.json`:

```json
{
  "languages": {
    "Ruby": {
      "language_servers": "solargraph", "rubocop", "!ruby-lsp", "..."
    }
  }
}
```

## Setting up `solargraph`

Zed currently doesn't install Solargraph automatically. To use Solargraph, you need to install the gem. Zed just looks for an executable called `solargraph` on your `PATH`.

You can install the gem manually with the following command:

```sh
gem install solargraph
```

Alternatively, if your project uses Bundler, you can add the Solargraph gem to your `Gemfile`:

```rb
gem 'solargraph', group: :development
```

Solargraph has formatting and diagnostics disabled by default. We can tell Zed to enable them by adding the following to your `settings.json`:

```json
{
  "lsp": {
    "solargraph": {
      "initialization_options": {
        "diagnostics": true,
        "formatting": true
      }
    }
  }
}
```

By default, Solargraph uses `bundle exec` to run in the context of the bundle. To disable that, you can use the `use_bundler` configuration option:

```json
{
  "lsp": {
    "solargraph": {
      "settings": {
        "use_bundler": false
      }
    }
  }
}
```

### Configuration

Solargraph reads its configuration from a file called `.solargraph.yml` in the root of your project. For more information about this file, see the Solargraph configuration documentation

## Setting up `ruby-lsp`

Zed currently doesn't install Ruby LSP automatically. To use Ruby LSP, you need to install the gem. Zed just looks for an executable called `ruby-lsp` on your `PATH`.

You can install the gem manually with the following command:

```sh
gem install ruby-lsp
```

Ruby LSP uses pull-based diagnostics which Zed doesn't support yet. We can tell Zed to disable it by adding the following to your `settings.json`:

```json
{
  "languages": {
    "Ruby": {
      "language_servers": "ruby-lsp", "!solargraph", "..."
    }
  },
  "lsp": {
    "ruby-lsp": {
      "initialization_options": {
        "enabledFeatures": {
          // This disables diagnostics
          "diagnostics": false
        }
      }
    }
  }
}
```

LSP `settings` and `initialization_options` can also be project-specific. For example to use standardrb/standard

```json
{
  "lsp": {
    "ruby-lsp": {
      "initialization_options": {
        "formatter": "standard",
        "linters": "standard"
      }
    }
  }
}
```

By default, Ruby LSP does not use `bundle exec` to run in the context of the bundle. To enable that, you can use the `use_bundler` configuration option:

```json
{
  "lsp": {
    "ruby-lsp": {
      "settings": {
        "use_bundler": true
      }
    }
  }
}
```

## Setting up `rubocop` LSP

Zed currently doesn't install `rubocop` automatically. To use `rubocop`, you need to install the gem. Zed just looks for an executable called `rubocop` on your `PATH`.

You can install the gem manually with the following command:

```sh
gem install rubocop
```

Rubocop has unsafe autocorrection disabled by default. We can tell Zed to enable it by adding the following to your `settings.json`:

```json
{
  "languages": {
    "Ruby": {
      // Use ruby-lsp as the primary language server and rubocop as the secondary.
      "language_servers": "ruby-lsp", "rubocop", "!solargraph", "..."
    }
  },
  "lsp": {
    "rubocop": {
      "initialization_options": {
        "safeAutocorrect": false
      }
    },
    "ruby-lsp": {
      "initialization_options": {
        "enabledFeatures": {
          "diagnostics": false
        }
      }
    }
  }
}
```

By default, `rubocop` uses `bundle exec` to run in the context of the bundle. To disable that, you can use the `use_bundler` configuration option:

```json
{
  "lsp": {
    "rubocop": {
      "settings": {
        "use_bundler": false
      }
    }
  }
}
```

## Using the Tailwind CSS Language Server with Ruby

It's possible to use the Tailwind CSS Language Server

In order to do that, you need to configure the language server so that it knows about where to look for CSS classes in Ruby/ERB files by adding the following to your `settings.json`:

```json
{
  "languages": {
    "Ruby": {
      "language_servers": "tailwindcss-language-server", "..."
    }
  },
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "erb": "html",
          "ruby": "html"
        },
        "experimental": {
          "classRegex": "\\bclass:\\s*'\"'\""
        }
      }
    }
  }
}
```

With these settings you will get completions for Tailwind CSS classes in HTML attributes inside ERB files and inside Ruby/ERB strings that are coming after a `class:` key. Examples:

```rb
## Ruby file:
def method
  div(class: "pl-2 <completion here>") do
    p(class: "mt-2 <completion here>") { "Hello World" }
  end
end

## ERB file:
<%= link_to "Hello", "/hello", class: "pl-2 <completion here>" %>
<a href="/hello" class="pl-2 <completion here>">Hello</a>
```

## Running tests

To run tests in your Ruby project, you can set up custom tasks in your local `.zed/tasks.json` configuration file. These tasks can be defined to work with different test frameworks like Minitest, RSpec, quickdraw, and tldr. Below are some examples of how to set up these tasks to run your tests from within your editor.

### Minitest with Rails

```json
{
  "label": "test $ZED_RELATIVE_FILE -n /$ZED_SYMBOL/",
  "command": "bin/rails test $ZED_RELATIVE_FILE -n /$ZED_SYMBOL/",
  "tags": "ruby-test"
}
```

Note: We can't use `args` here because of the way quotes are handled.

### Minitest

Plain minitest does not support running tests by line number, only by name, so we need to use `$ZED_SYMBOL` instead:

```json

  {
    "label": "-Itest $ZED_RELATIVE_FILE -n /$ZED_SYMBOL/",
    "command": "bundle exec ruby",
    "args": "-Itest", "$ZED_RELATIVE_FILE", "-n /$ZED_SYMBOL/"
    "tags": "ruby-test"
  }

```

### RSpec

```json

  {
    "label": "test $ZED_RELATIVE_FILE:$ZED_ROW",
    "command": "bundle exec rspec",
    "args": "\"$ZED_RELATIVE_FILE:$ZED_ROW\""
    "tags": "ruby-test"
  }

```

### quickdraw

```json

  {
    "label": "test $ZED_RELATIVE_FILE:$ZED_ROW",
    "command": "bundle exec qt",
    "args": "\"$ZED_RELATIVE_FILE:$ZED_ROW\""
    "tags": "ruby-test"
  }

```

### tldr

```json

  {
    "label": "test $ZED_RELATIVE_FILE:$ZED_ROW",
    "command": "bundle exec tldr",
    "args": "\"$ZED_RELATIVE_FILE:$ZED_ROW\""
    "tags": "ruby-test"
  }

```

RocRust

Rust - Zed

## Rust

Rust support is available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-rust
- Language Server: rust-lang/rust-analyzer

## Inlay Hints

The following configuration can be used to change the inlay hint settings for `rust-analyzer` in Rust:

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "inlayHints": {
          "maxLength": null,
          "lifetimeElisionHints": {
            "enable": "skip_trivial",
            "useParameterNames": true
          },
          "closureReturnTypeHints": {
            "enable": "always"
          }
        }
      }
    }
  }
}
```

See Inlay Hints

## Target directory

The `rust-analyzer` target directory can be set in `initialization_options`:

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "rust": {
          "analyzerTargetDir": true
        }
      }
    }
  }
}
```

A `true` setting will set the target directory to `target/rust-analyzer`. You can set a custom directory with a string like `"target/analyzer"` instead of `true`.

## Binary

You can configure which `rust-analyzer` binary Zed should use.

By default, Zed will try to find a `rust-analyzer` in your `$PATH` and try to use that. If that binary successfully executes `rust-analyzer --help`, it's used. Otherwise, Zed will fall back to installing its own `rust-analyzer` version and using that.

If you want to disable Zed looking for a `rust-analyzer` binary, you can set `ignore_system_version` to `true` in your `settings.json`:

```json
{
  "lsp": {
    "rust-analyzer": {
      "binary": {
        "ignore_system_version": true
      }
    }
  }
}
```

If you want to use a binary in a custom location, you can specify a `path` and optional `args`:

```json
{
  "lsp": {
    "rust-analyzer": {
      "binary": {
        "path": "/Users/example/bin/rust-analyzer",
        "args":
      }
    }
  }
}
```

This `"path"` has to be an absolute path.

## Alternate Targets

If want rust-analyzer to provide diagnostics for a target other than you current platform (e.g. for windows when running on macOS) you can use the following Zed lsp settings:

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "cargo": {
          "target": "x86_64-pc-windows-msvc"
        }
      }
    }
  }
}
```

If you are using `rustup` and you can find a list of available target triples (`aarch64-apple-darwin`, `x86_64-unknown-linux-gnu`, etc) by running:

```sh
rustup target list --installed
```

## LSP tasks

Zed provides tasks using tree-sitter, but rust-analyzer has an LSP extension method for querying file-related tasks via LSP. This is enabled by default and can be configured as

```json
"lsp": {
  "rust-analyzer": {
    enable_lsp_tasks": true,
  }
}
```

## Manual Cargo Diagnostics fetch

By default, rust-analyzer has `checkOnSave: true` enabled, which causes every buffer save to trigger a `cargo check --workspace --all-targets` command. For lager projects this might introduce excessive wait times, so a more fine-grained triggering could be enabled by altering the

```json
"diagnostics": {
  "cargo": {
    // When enabled, Zed disables rust-analyzer's check on save and starts to query
    // Cargo diagnostics separately.
    "fetch_cargo_diagnostics": false
  }
}
```

default settings.

This will stop rust-analyzer from running `cargo check ...` on save, yet still allow to run `editor: run/clear/cancel flycheck` commands in Rust files to refresh cargo diagnostics; the project diagnostics editor will also refresh cargo diagnostics with `editor: run flycheck` command when the setting is enabled.

## More server configuration

Rust-analyzer manual

### Large projects and performance

One of the main caveats that might cause extensive resource usage on large projects, is the combination of the following features:

```
rust-analyzer.checkOnSave (default: true)
    Run the check command for diagnostics on save.
```

```
rust-analyzer.check.workspace (default: true)
    Whether --workspace should be passed to cargo check. If false, -p <package> will be passed instead.
```

```
rust-analyzer.cargo.allTargets (default: true)
    Pass --all-targets to cargo invocation
```

Which would mean that every time Zed saves, a `cargo check --workspace --all-targets` command is run, checking the entire project (workspace), lib, doc, test, bin, bench and other targets

While that works fine on small projects, it does not scale well.

The alternatives would be to use tasks

Check on save feature is responsible for returning part of the diagnostics based on cargo check output, so turning it off will limit rust-analyzer with its own diagnostics

Consider more `rust-analyzer.cargo.` and `rust-analyzer.check.` and `rust-analyzer.diagnostics.` settings from the manual for more fine-grained configuration. Here's a snippet for Zed settings.json (the language server will restart automatically after the `lsp.rust-analyzer` section is edited and saved):

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        // get more cargo-less diagnostics from rust-analyzer,
        // which might include false-positives (those can be turned off by their names)
        "diagnostics": {
          "experimental": {
            "enable": true
          }
        },
        // To disable the checking entirely
        // (ignores all cargo and check settings below)
        "checkOnSave": false,
        // To check the `lib` target only.
        "cargo": {
          "allTargets": false
        },
        // Use `-p` instead of `--workspace` for cargo check
        "check": {
          "workspace": false
        }
      }
    }
  }
}
```

### Multi-project workspaces

If you want rust-analyzer to analyze multiple Rust projects in the same folder that are not listed in `members` in the Cargo workspace, you can list them in `linkedProjects` in the local project settings:

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "linkedProjects": "./path/to/a/Cargo.toml", "./path/to/b/Cargo.toml"
      }
    }
  }
}
```

### Snippets

There's a way get custom completion items from rust-analyzer, that will transform the code according to the snippet body:

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "completion": {
          "snippets": {
            "custom": {
              "Arc::new": {
                "postfix": "arc",
                "body": "Arc::new(${receiver})"
                "requires": "std::sync::Arc",
                "scope": "expr"
              },
              "Some": {
                "postfix": "some",
                "body": "Some(${receiver})"
                "scope": "expr"
              },
              "Ok": {
                "postfix": "ok",
                "body": "Ok(${receiver})"
                "scope": "expr"
              },
              "Rc::new": {
                "postfix": "rc",
                "body": "Rc::new(${receiver})"
                "requires": "std::rc::Rc",
                "scope": "expr"
              },
              "Box::pin": {
                "postfix": "boxpin",
                "body": "Box::pin(${receiver})"
                "requires": "std::boxed::Box",
                "scope": "expr"
              },
              "vec!": {
                "postfix": "vec",
                "body": "vec!${receiver}"
                "description": "vec!",
                "scope": "expr"
              }
            }
          }
        }
      }
    }
  }
}
```

RubyScala

Scala - Zed

## Scala

Scala language support in Zed is provided by the community-maintained Scala extension. Report issues to: https://github.com/scalameta/metals-zed/issues

- Tree-sitter: tree-sitter/tree-sitter-scala
- Language Server: scalameta/metals

## Setup

- Install Scala with `cs setup` (Coursier): https://www.scala-lang.org/download/

  - `brew install coursier/formulas/coursier && cs setup`

- REPL (Almond) Setup Instructions https://almond.sh/docs/quick-start-install

  - `brew install --cask temurin` (Eclipse foundation official OpenJDK binaries)
  - `brew install coursier/formulas/coursier && cs setup`
  - `coursier launch --use-bootstrap almond -- --install`

## Configuration

Behavior of the Metals language server can be controlled with:

- `.scalafix.conf` file - See Scalafix Configuration
- `.scalafmt.conf` file - See Scalafmt Configuration

You can place these files in the root of your project or specifying their location in the Metals configuration. See Metals User Configuration

RustScheme

Scheme - Zed

## Scheme

Scheme support is available through the Scheme extension

- Tree-sitter: 6cdh/tree-sitter-scheme

ScalaShell Script

Shell Script - Zed

## Shell Scripts

Shell Scripts (bash, zsh, dash, sh) are supported natively by Zed.

- Tree-sitter: tree-sitter/tree-sitter-bash

## Settings

You can configure various settings for Shell Scripts in your Zed User Settings (`~/.config/zed/settings.json`) or Zed Project Settings (`.zed/settings.json`):

```json
  "languages": {
    "Shell Script": {
      "tab_size": 2,
      "hard_tabs": false
    }
  }
```

### Formatting

Zed supports auto-formatting Shell Scripts using external tools like `shfmt`

1. Install `shfmt`:

```sh
brew install shfmt            # macos (homebrew)
sudo apt-get install shfmt    # debian/ubuntu
dnf install shfmt             # fedora
yum install shfmt             # redhat
pacman -Sy shfmt              # archlinux
choco install shfmt           # windows (chocolatey)
```

2. Ensure `shfmt` is available in your path and check the version:

```sh
which shfmt
shfmt --version
```

3. Configure Zed to automatically format Shell Scripts with `shfmt` on save:

```json
  "languages": {
    "Shell Script": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "shfmt",
          // Change `--indent 2` to match your preferred tab_size
          "arguments": "--filename", "{buffer_path}", "--indent", "2"
        }
      }
    }
  }
```

## See also:

- Zed Docs: Language Support: Bash
- Zed Docs: Language Support: Fish

SchemeSvelte

Svelte - Zed

## Svelte

Svelte support is available through the Svelte extension

- Tree-sitter: tree-sitter-grammars/tree-sitter-svelte
- Language Server: sveltejs/language-tools

## Extra theme styling configuration

You can modify how certain styles such as directives and modifiers appear in attributes:

```json
"syntax": {
  // Styling for directives (e.g., `class:foo` or `on:click`) (the `on` or `class` part of the attribute).
  "attribute.function": {
    "color": "#ff0000"
  },
  // Styling for modifiers at the end of attributes, e.g. `on:<click|preventDefault|stopPropagation>`
  "attribute.special": {
    "color": "#00ff00"
  }
}
```

## Inlay Hints

Zed sets the following initialization options for inlay hints:

```json
"inlayHints": {
  "parameterNames": {
    "enabled": "all",
    "suppressWhenArgumentMatchesName": false
  },
  "parameterTypes": {
    "enabled": true
  },
  "variableTypes": {
    "enabled": true,
    "suppressWhenTypeMatchesName": false
  },
  "propertyDeclarationTypes": {
    "enabled": true
  },
  "functionLikeReturnTypes": {
    "enabled": true
  },
  "enumMemberValues": {
    "enabled": true
  }
}
```

to make the language server send back inlay hints when Zed has them enabled in the settings.

Use

```json
"lsp": {
  "svelte-language-server": {
    "initialization_options": {
      "configuration": {
        "typescript": {
          ......
        },
        "javascript": {
          ......
        }
      }
    }
  }
}
```

to override these settings.

See https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/package.json for more information.

Shell ScriptSwift

Swift - Zed

## Swift

Swift language support in Zed is provided by the community-maintained Swift extension. Report issues to: https://github.com/zed-extensions/swift/issues

- Tree-sitter: alex-pinkus/tree-sitter-swift
- Language Server: swiftlang/sourcekit-lsp

## Configuration

You can modify the behavior of SourceKit LSP by creating a `.sourcekit-lsp/config.json` under your home directory or in your project root. See SourceKit-LSP configuration file

SvelteTailwind CSS

Tailwind CSS - Zed

## Tailwind CSS

Tailwind CSS support is built into Zed.

- Language Server: tailwindlabs/tailwindcss-intellisense

## Configuration

Languages which can be used with Tailwind CSS in Zed:

- Astro
- CSS
- ERB
- HEEx
- HTML
- TypeScript
- JavaScript
- PHP
- Svelte
- Vue

SwiftTerraform

Terraform - Zed

## Terraform

Terraform support is available through the Terraform extension

- Tree-sitter: MichaHoffmann/tree-sitter-hcl
- Language Server: hashicorp/terraform-ls

## Configuration

The Terraform language server can be configured in your `settings.json`, e.g.:

```json
{
  "lsp": {
    "terraform-ls": {
      "initialization_options": {
        "experimentalFeatures": {
          "prefillRequiredFields": true
        }
      }
    }
  }
}
```

See the full list of server settings here

Tailwind CSSTOML

TOML - Zed

## TOML

TOML support is available through the TOML extension

- Tree-sitter: tree-sitter/tree-sitter-toml
- Language Server: tamasfe/taplo

## Configuration

You can control the behavior of the Taplo TOML language server by adding a `.taplo.toml` file to the root of your project. See the Taplo Configuration File and Taplo Formatter Options

```toml
## .taplo.toml
formatting
align_comments = false
reorder_keys = true

include = "Cargo.toml", "some_directory/**/*.toml"
## exclude = "vendor/**/*.toml"
```

Note: The taplo language server will not automatically pickup changes to `.taplo.toml`. You must manually trigger `editor: restart language server` or reload Zed for it to pickup changes.

TerraformTypeScript

TypeScript - Zed

## TypeScript

TypeScript and TSX support are available natively in Zed.

- Tree-sitter: tree-sitter/tree-sitter-typescript
- Language Server: yioneko/vtsls
- Alternate Language Server: typescript-language-server/typescript-language-server

## Language servers

By default Zed uses vtsls for TypeScript, TSX and JavaScript files. You can configure the use of typescript-language-server

```json
{
  "languages": {
    "TypeScript": {
      "language_servers": "typescript-language-server", "!vtsls", "..."
    },
    "TSX": {
      "language_servers": "typescript-language-server", "!vtsls", "..."
    },
    "JavaScript": {
      "language_servers": "typescript-language-server", "!vtsls", "..."
    }
  }
}
```

Prettier will also be used for TypeScript files by default. To disable this:

```json
{
  "languages": {
    "TypeScript": {
      "prettier": { "allowed": false }
    }
    //...
  }
}
```

## Large projects

`vtsls` may run out of memory on very large projects. We default the limit to 8092 (8 GiB) vs. the default of 3072 but this may not be sufficient for you:

```json
{
  "lsp": {
    "vtsls": {
      "settings": {
        // For TypeScript:
        "typescript": { "tsserver": { "maxTsServerMemory": 16184 } },
        // For JavaScript:
        "javascript": { "tsserver": { "maxTsServerMemory": 16184 } }
      }
    }
  }
}
```

## Inlay Hints

Zed sets the following initialization options to make the language server send back inlay hints (that is, when Zed has inlay hints enabled in the settings).

You can override these settings in your Zed settings file.

When using `typescript-language-server`:

```json
{
  "lsp": {
    "typescript-language-server": {
      "initialization_options": {
        "preferences": {
          "includeInlayParameterNameHints": "all",
          "includeInlayParameterNameHintsWhenArgumentMatchesName": true,
          "includeInlayFunctionParameterTypeHints": true,
          "includeInlayVariableTypeHints": true,
          "includeInlayVariableTypeHintsWhenTypeMatchesName": true,
          "includeInlayPropertyDeclarationTypeHints": true,
          "includeInlayFunctionLikeReturnTypeHints": true,
          "includeInlayEnumMemberValueHints": true
        }
      }
    }
  }
}
```

See typescript-language-server inlayhints documentation

When using `vtsls`:

```json
{
  "lsp": {
    "vtsls": {
      "settings": {
        // For JavaScript:
        "javascript": {
          "inlayHints": {
            "parameterNames": {
              "enabled": "all",
              "suppressWhenArgumentMatchesName": false
            },
            "parameterTypes": {
              "enabled": true
            },
            "variableTypes": {
              "enabled": true,
              "suppressWhenTypeMatchesName": true
            },
            "propertyDeclarationTypes": {
              "enabled": true
            },
            "functionLikeReturnTypes": {
              "enabled": true
            },
            "enumMemberValues": {
              "enabled": true
            }
          }
        },
        // For TypeScript:
        "typescript": {
          "inlayHints": {
            "parameterNames": {
              "enabled": "all",
              "suppressWhenArgumentMatchesName": false
            },
            "parameterTypes": {
              "enabled": true
            },
            "variableTypes": {
              "enabled": true,
              "suppressWhenTypeMatchesName": true
            },
            "propertyDeclarationTypes": {
              "enabled": true
            },
            "functionLikeReturnTypes": {
              "enabled": true
            },
            "enumMemberValues": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```

## See also

- Zed Yarn documentation
- Zed Deno documentation

TOMLUiua

Uiua - Zed

## Uiua

Uiua

Uiua support is available through the Uiua extension

- Tree-sitter: shnarazk/tree-sitter-uiua
- Language Server: uiua-lang/uiua

TypeScriptVue

Vue - Zed

## Vue

Vue support is available through the Vue extension

- Tree-sitter: tree-sitter-grammars/tree-sitter-vue
- Language Server: vuejs/language-tools/

UiuaXML

XML - Zed

## XML

XML support is available through the XML extension

- Tree-sitter: tree-sitter-grammars/tree-sitter-xml

## Configuration

If you have additional file extensions that are not being automatically recognized as XML just add them to file_types

```json
  "file_types": {
    "XML": "rdf", "gpx", "kml"
  }
```

VueYAML

YAML - Zed

## YAML

YAML support is available natively in Zed.

- Tree-sitter: zed-industries/tree-sitter-yaml
- Language Server: redhat-developer/yaml-language-server

## Configuration

You can configure various yaml-language-server settings

```json
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "keyOrdering": true,
          "format": {
            "singleQuote": true
          },
          "schemas": {
              "http://json.schemastore.org/composer": "/*"
              "../relative/path/schema.json": "/config*.yaml"
          }
        }
      }
    }
  }
```

Note, settings keys must be nested, so `yaml.keyOrdering` becomes `{"yaml": { "keyOrdering": true }}`.

## Formatting

By default Zed will use prettier for formatting YAML files.

### Prettier Formatting

You can customize the formatting behavior of Prettier. For example to use single-quotes in yaml files add the following to a `.prettierrc`:

```json
{
  "overrides":
    {
      "files": "*.yaml", "*.yml"
      "options": {
        "singleQuote": false
      }
    }

}
```

### yaml-language-server Formatting

To use `yaml-language-server` instead of Prettier for YAML formatting, add the following to your Zed settings.json:

```json
  "languages": {
    "YAML": {
      "formatter": "language_server"
    }
  }
```

## Schemas

By default yaml-language-server will attempt to determine the correct schema for a given yaml file and retrieve the appropriate JSON Schema from Json Schema Store

You can override any auto-detected schema via the `schemas` settings key (demonstrated above) or by providing an inlined schema

```yaml
## yaml-language-server: $schema=https://json.schemastore.org/github-action.json
name: Issue Assignment
on:
  issues:
    types: oppened
```

You can disable the automatic detection and retrieval of schemas from the JSON Schema if desired:

```json
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "schemaStore": {
            "enable": false
          }
        }
      }
    }
  }
```

## Custom Tags

Yaml-language-server supports custom tags

For example Amazon CloudFormation YAML uses a number of custom tags, to support these you can add the following to your settings.json:

```json
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "customTags":
            "!And scalar",
            "!And mapping",
            "!And sequence",
            "!If scalar",
            "!If mapping",
            "!If sequence",
            "!Not scalar",
            "!Not mapping",
            "!Not sequence",
            "!Equals scalar",
            "!Equals mapping",
            "!Equals sequence",
            "!Or scalar",
            "!Or mapping",
            "!Or sequence",
            "!FindInMap scalar",
            "!FindInMap mapping",
            "!FindInMap sequence",
            "!Base64 scalar",
            "!Base64 mapping",
            "!Base64 sequence",
            "!Cidr scalar",
            "!Cidr mapping",
            "!Cidr sequence",
            "!Ref scalar",
            "!Ref mapping",
            "!Ref sequence",
            "!Sub scalar",
            "!Sub mapping",
            "!Sub sequence",
            "!GetAtt scalar",
            "!GetAtt mapping",
            "!GetAtt sequence",
            "!GetAZs scalar",
            "!GetAZs mapping",
            "!GetAZs sequence",
            "!ImportValue scalar",
            "!ImportValue mapping",
            "!ImportValue sequence",
            "!Select scalar",
            "!Select mapping",
            "!Select sequence",
            "!Split scalar",
            "!Split mapping",
            "!Split sequence",
            "!Join scalar",
            "!Join mapping",
            "!Join sequence",
            "!Condition scalar",
            "!Condition mapping",
            "!Condition sequence"

        }
      }
    }
  }
```

XMLYara

Yara - Zed

## Yara

`Yara` language support in Zed is provided by the Yara extension. Please report issues to https://github.com/egibs/yara.zed/issues

- Tree-sitter: egibs/tree-sitter-yara
- Language Server: avast/yls

YAMLYarn

Yarn - Zed

## Yarn

Yarn

## Setup

1. Run `yarn dlx @yarnpkg/sdks base` to generate a `.yarn/sdks` directory.
2. Set your language server (e.g. VTSLS) to use Typescript SDK from `.yarn/sdks/typescript/lib` directory in LSP initialization options. The actual setting for that depends on language server; for example, for VTSLS you should set `typescript.tsdk`
3. Voilla! Language server functionalities such as Go to Definition, Code Completions and On Hover documentation should work.

YaraZig

Zig - Zed

## Zig

Zig support is available through the Zig extension

- Tree-sitter: tree-sitter-zig
- Language Server: zls

YarnDeveloping Zed
