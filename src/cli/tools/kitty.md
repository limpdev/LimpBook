Usage: kitty [options] [program-to-run ...]

Run the kitty terminal emulator. You can also specify the
program to run inside kitty as normal arguments
following the options.
For example: kitty --hold sh -c "echo hello, world"

For comprehensive documentation for kitty, please see:
https://sw.kovidgoyal.net/kitty/

### Options:
```
  -T, --title
    Set the OS window title. This will override any title set by the program
    running inside kitty, permanently fixing the OS window's title. So only
    use this if you are running a program that does not set titles.

  -c, --config
    Specify a path to the configuration file(s) to use. All configuration
    files are merged onto the builtin kitty.conf, overriding the builtin
    values. This option can be specified multiple times to read multiple
    configuration files in sequence, which are merged. Use the special
    value NONE to not load any config file.

    If this option is not specified, config files are searched for in the
    order: $XDG_CONFIG_HOME/kitty/kitty.conf, ~/.config/kitty/kitty.conf,
    ~/Library/Preferences/kitty/kitty.conf,
    $XDG_CONFIG_DIRS/kitty/kitty.conf. The first one that exists is used as
    the config file.

    If the environment variable KITTY_CONFIG_DIRECTORY is specified, that
    directory is always used and the above searching does not happen.

    If /etc/xdg/kitty/kitty.conf exists, it is merged before (i.e. with
    lower priority) than any user config files. It can be used to specify
    system-wide defaults for all users. You can use either - or /dev/stdin
    to read the config from STDIN.

  -o, --override
    Override individual configuration options, can be specified multiple
    times. Syntax: name=value. For example: -o font_size=20

  -d, --working-directory, --directory=[.]
    Change to the specified directory when launching.

  --session
    Path to a file containing the startup session (tabs, windows, layout,
    programs). Use - to read from STDIN. See sessions for details and an
    example. Environment variables in the file name are expanded, relative
    paths are resolved relative to the kitty configuration directory. The
    special value none means no session will be used, even if the
    startup_session option has been specified in kitty.conf. Note that
    using this option means the command line arguments to kitty specifying
    a program to run are ignored.

  --hold
    Remain open, at a shell prompt, after child process exits. Note that
    this only affects the first window. You can quit by either using the
    close window shortcut or running the exit command.

  -1, --single-instance
    If specified only a single instance of kitty will run. New invocations
    will instead create a new top-level window in the existing kitty
    instance. This allows kitty to share a single sprite cache on the GPU
    and also reduces startup time. You can also have separate groups of
    kitty instances by using the --instance-group option.

  --instance-group
    Used in combination with the --single-instance option. All kitty
    invocations with the same --instance-group will result in new windows
    being created in the first kitty instance within that group.

  --wait-for-single-instance-window-close
    Normally, when using --single-instance, kitty will open a new window in
    an existing instance and quit immediately. With this option, it will
    not quit till the newly opened window is closed. Note that if no
    previous instance is found, then kitty will wait anyway, regardless of
    this option.

  --listen-on
    Listen on the specified socket address for control messages. For
    example, --listen-on=unix:/tmp/mykitty or
    --listen-on=tcp:localhost:12345. On Linux systems, you can also use
    abstract UNIX sockets, not associated with a file, like this:
    --listen-on=unix:@mykitty. Environment variables are expanded and
    relative paths are resolved with respect to the temporary directory. To
    control kitty, you can send commands to it with kitten @ using the --to
    option to specify this address. Note that if you run kitten @ within a
    kitty window, there is no need to specify the --to option as it will
    automatically read from the environment. Note that this will be ignored
    unless allow_remote_control is set to either: yes, socket or
    socket-only. This can also be specified in kitty.conf.

  --start-as=[normal]
    Control how the initial kitty window is created.
    Choices: normal, minimized, maximized, fullscreen
```

### Debugging options:
```
  -v, --version
    The current kitty version.

  --dump-commands
    Output commands received from child process to STDOUT.

  --replay-commands
    Replay previously dumped commands. Specify the path to a dump file
    previously created by --dump-commands. You can open a new kitty window
    to replay the commands with:

        kitty sh -c "kitty --replay-commands /path/to/dump/file; read"

  --dump-bytes
    Path to file in which to store the raw bytes received from the child
    process.

  --debug-rendering, --debug-gl
    Debug rendering commands. This will cause all OpenGL calls to check for
    errors instead of ignoring them. Also prints out miscellaneous debug
    information. Useful when debugging rendering problems.

  --debug-keyboard, --debug-input
    Print out key and mouse events as they are received.

  --debug-font-fallback
    Print out information about the selection of fallback fonts for
    characters not present in the main font.

  --watcher
    This option is deprecated in favor of the watcher option in kitty.conf
    and should not be used.
```
