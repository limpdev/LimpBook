---
title: Poetry | pipx
draft: false
---

## Poetry (version 2.1.1)

```bash
Usage:
  command [options] [arguments]

Options:
  -h, --help                 Display help for the given command. When no command is given display help for the list command.
  -q, --quiet                Do not output any message.
  -V, --version              Display this application version.
      --ansi                 Force ANSI output.
      --no-ansi              Disable ANSI output.
  -n, --no-interaction       Do not ask any interactive question.
      --no-plugins           Disables plugins.
      --no-cache             Disables Poetry source caches.
  -P, --project=PROJECT      Specify another path as the project root. All command-line arguments will be resolved relative to the current working directory.
  -C, --directory=DIRECTORY  The working directory for the Poetry command (defaults to the current working directory). All command-line arguments will be resolved relative to the given directory.
  -v|vv|vvv, --verbose       Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.

Available commands:
  about              Shows information about Poetry.
  add                Adds a new dependency to pyproject.toml and installs it.
  build              Builds a package, as a tarball and a wheel by default.
  check              Validates the content of the pyproject.toml file and its consistency with the poetry.lock file.
  config             Manages configuration settings.
  help               Displays help for a command.
  init               Creates a basic pyproject.toml file in the current directory.
  install            Installs the project dependencies.
  list               Lists commands.
  lock               Locks the project dependencies.
  new                Creates a new Python project at <path>.
  publish            Publishes a package to a remote repository.
  remove             Removes a package from the project dependencies.
  run                Runs a command in the appropriate environment.
  search             Searches for packages on remote repositories.
  show               Shows information about packages.
  sync               Update the project's environment according to the lockfile.
  update             Update the dependencies as according to the pyproject.toml file.
  version            Shows the version of the project or bumps it when a valid bump rule is provided.

 cache
  cache clear        Clears a Poetry cache by name.
  cache list         List Poetry's caches.

 debug
  debug info         Shows debug information.
  debug resolve      Debugs dependency resolution.
  debug tags         Shows compatible tags for your project's current active environment.

 env
  env activate       Print the command to activate a virtual environment.
  env info           Displays information about the current environment.
  env list           Lists all virtualenvs associated with the current project.
  env remove         Remove virtual environments associated with the project.
  env use            Activates or creates a new virtualenv for the current project.

 python
  python install     Install the specified Python version from the Python Standalone Builds project. (experimental feature)
  python list        Shows Python versions available for this environment. (experimental feature)
  python remove      Remove the specified Python version if managed by Poetry. (experimental feature)

 self
  self add           Add additional packages to Poetry's runtime environment.
  self install       Install locked packages (incl. addons) required by this Poetry installation.
  self lock          Lock the Poetry installation's system requirements.
  self remove        Remove additional packages from Poetry's runtime environment.
  self show          Show packages from Poetry's runtime environment.
  self show plugins  Shows information about the currently installed plugins.
  self sync          Sync Poetry's own environment according to the locked packages (incl. addons) required by this Poetry installation.
  self update        Updates Poetry to the latest version.

 source
  source add         Add source configuration for project.
  source remove      Remove source configured for the project.
  source show        Show information about sources configured for the project.
```
[Home ![Poetry logo](/images/logo-origami.svg)](/)

2.1

- [main](/docs/main/)
- [2.1](/docs/)
- [1.8](/docs/1.8/)

Use dark mode

Open menu

- [Documentation](/docs/)
  
  [Introduction  
  \
  Poetry is a tool for dependency management and packaging in Python.](/docs/)
  
  [Basic usage  
  \
  For the basic usage introduction we will be installing pendulum, a datetime library.](/docs/basic-usage/)
  
  [Managing dependencies  
  \
  Poetry supports specifying main dependencies in the project.dependencies section of your pyproject.toml according to PEP 621.](/docs/managing-dependencies/)
  
  [Libraries  
  \
  This chapter will tell you how to make your library installable through Poetry. Versioning Poetry requires PEP 440-compliant versions for all projects. While Poetry does not enforce any release convention, it used to encourage the use of semantic versioning within the scope of PEP 440 and supports version constraints that are especially suitable for semver. Note As an example, 1.0.0-hotfix.1 is not compatible with PEP 440.](/docs/libraries/)
  
  [Commands  
  \
  You’ve already learned how to use the command-line interface to do some things.](/docs/cli/)
  
  [Configuration  
  \
  Poetry can be configured via the config command (see more about its usage here) or directly in the config.toml file that will be automatically created when you first run that command.](/docs/configuration/)
  
  [Repositories  
  \
  Poetry supports the use of PyPI and private repositories for discovery of packages as well as for publishing your projects. By default, Poetry is configured to use the PyPI repository, for package installation and publishing. So, when you add dependencies to your project, Poetry will assume they are available on PyPI. This represents most cases and will likely be enough for most users. Private Repository Example Installing from private package sources By default, Poetry discovers and installs packages from PyPI.](/docs/repositories/)
  
  [Managing environments  
  \
  Poetry makes project environment isolation one of its core features. What this means is that it will always work isolated from your global Python installation.](/docs/managing-environments/)
  
  [Dependency specification  
  \
  Dependencies for a project can be specified in various forms, which depend on the type of the dependency and on the optional constraints that might be needed for it to be installed. project.dependencies and tool.poetry.dependencies Prior Poetry 2.0, dependencies had to be declared in the tool.poetry.dependencies section of the pyproject.toml file. \[tool.poetry.dependencies\] requests = "^2.13.0" With Poetry 2.0, you should consider using the project.dependencies section instead. \[project\] # ...](/docs/dependency-specification/)
  
  [Plugins  
  \
  Poetry supports using and building plugins if you wish to alter or expand Poetry’s functionality with your own. For example if your environment poses special requirements on the behaviour of Poetry which do not apply to the majority of its users or if you wish to accomplish something with Poetry in a way that is not desired by most users. In these cases you could consider creating a plugin to handle your specific logic. .](/docs/plugins/)
  
  [The pyproject.toml file  
  \
  In package mode, the only required fields are name and version (either in the project section or in the tool.poetry section).](/docs/pyproject/)
  
  [Contributing to Poetry  
  \
  First off, thanks for taking the time to contribute! The following is a set of guidelines for contributing to Poetry on GitHub.](/docs/contributing/)
  
  [Community  
  \
  Badge For any projects using Poetry, you may add its official badge somewhere prominent like the README. Markdown \[!\[Poetry\](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)\](https://python-poetry.org/) reStructuredText ..](/docs/community/)
  
  [FAQ  
  \
  Why is the dependency resolution process slow? While the dependency resolver at the heart of Poetry is highly optimized and should be fast enough for most cases, with certain sets of dependencies it can take time to find a valid solution. This is due to the fact that not all libraries on PyPI have properly declared their metadata and, as such, they are not available via the PyPI JSON API.](/docs/faq/)
  
  [pre-commit hooks  
  \
  pre-commit is a framework for building and running git hooks.](/docs/pre-commit-hooks/)
  
  [Building extension modules  
  \
  Building Extension Modules Warning While this feature has been around since almost the beginning of the Poetry project and has needed minimal changes, it is still considered unstable.](/docs/building-extension-modules/)
  
  [2.1 Stable Documentation for the latest, **stable**, branch.](/docs/) [main Development Documentation for the latest, **in-development**, branch.](/docs/main/)
- [Blog](/blog/)
- [History](/history/)
- [Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

![Poetry](/images/logo-origami.svg)

Close menu

[Documentation](/docs/) [Blog](/blog/) [History](/history/)[Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
  
  - [Global Options](#global-options)
  - [about](#about)
  - [add](#add)
  - [build](#build)
  - [cache](#cache)
    
    - [cache clear](#cache-clear)
    - [cache list](#cache-list)
  - [check](#check)
  - [config](#config)
    
    - [Usage](#usage)
  - [debug](#debug)
    
    - [debug info](#debug-info)
    - [debug resolve](#debug-resolve)
    - [debug tags](#debug-tags)
  - [env](#env)
    
    - [env activate](#env-activate)
    - [env info](#env-info)
    - [env list](#env-list)
    - [env remove](#env-remove)
    - [env use](#env-use)
  - [export](#export)
  - [help](#help)
  - [init](#init)
  - [install](#install)
  - [list](#list)
  - [lock](#lock)
  - [new](#new)
  - [publish](#publish)
  - [python](#python)
    
    - [python install](#python-install)
    - [python list](#python-list)
    - [python remove](#python-remove)
  - [remove](#remove)
  - [run](#run)
  - [search](#search)
  - [self](#self)
    
    - [self add](#self-add)
    - [self install](#self-install)
    - [self lock](#self-lock)
    - [self remove](#self-remove)
    - [self show](#self-show)
    - [self show plugins](#self-show-plugins)
    - [self sync](#self-sync)
    - [self update](#self-update)
  - [shell](#shell)
  - [show](#show)
  - [source](#source)
    
    - [source add](#source-add)
    - [source show](#source-show)
    - [source remove](#source-remove)
  - [sync](#sync)
  - [update](#update)
  - [version](#version)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

Commands

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

# Commands

- [Global Options](#global-options)
- [about](#about)
- [add](#add)
- [build](#build)
- [cache](#cache)
  
  - [cache clear](#cache-clear)
  - [cache list](#cache-list)
- [check](#check)
- [config](#config)
  
  - [Usage](#usage)
- [debug](#debug)
  
  - [debug info](#debug-info)
  - [debug resolve](#debug-resolve)
  - [debug tags](#debug-tags)
- [env](#env)
  
  - [env activate](#env-activate)
  - [env info](#env-info)
  - [env list](#env-list)
  - [env remove](#env-remove)
  - [env use](#env-use)
- [export](#export)
- [help](#help)
- [init](#init)
- [install](#install)
- [list](#list)
- [lock](#lock)
- [new](#new)
- [publish](#publish)
- [python](#python)
  
  - [python install](#python-install)
  - [python list](#python-list)
  - [python remove](#python-remove)
- [remove](#remove)
- [run](#run)
- [search](#search)
- [self](#self)
  
  - [self add](#self-add)
  - [self install](#self-install)
  - [self lock](#self-lock)
  - [self remove](#self-remove)
  - [self show](#self-show)
  - [self show plugins](#self-show-plugins)
  - [self sync](#self-sync)
  - [self update](#self-update)
- [shell](#shell)
- [show](#show)
- [source](#source)
  
  - [source add](#source-add)
  - [source show](#source-show)
  - [source remove](#source-remove)
- [sync](#sync)
- [update](#update)
- [version](#version)

# Commands [#](#commands)

You’ve already learned how to use the command-line interface to do some things. This chapter documents all the available commands.

To get help from the command-line, simply call `poetry` to see the complete list of commands, then `--help` combined with any of those can give you more information.

## Global Options [#](#global-options)

- `--verbose (-v|vv|vvv)`: Increase the verbosity of messages: “-v” for normal output, “-vv” for more verbose output and “-vvv” for debug.
- `--help (-h)` : Display help information.
- `--quiet (-q)` : Do not output any message.
- `--ansi`: Force ANSI output.
- `--no-ansi`: Disable ANSI output.
- `--version (-V)`: Display this application version.
- `--no-interaction (-n)`: Do not ask any interactive question.
- `--no-plugins`: Disables plugins.
- `--no-cache`: Disables Poetry source caches.
- `--directory=DIRECTORY (-C)`: The working directory for the Poetry command (defaults to the current working directory). All command-line arguments will be resolved relative to the given directory.
- `--project=PROJECT (-P)`: Specify another path as the project root. All command-line arguments will be resolved relative to the current working directory or directory specified using `--directory` option if used.

## about [#](#about)

The `about` command displays global information about Poetry, including the current version and version of `poetry-core`.

```bash
poetry about
```

## add [#](#add)

The `add` command adds required packages to your `pyproject.toml` and installs them.

If you do not specify a version constraint, poetry will choose a suitable one based on the available package versions.

```bash
poetry add requests pendulum
```

Note

A package is looked up, by default, only from [PyPI](https://pypi.org). You can modify the default source (PyPI); or add and use [Supplemental Package Sources](/docs/repositories/#supplemental-package-sources) or [Explicit Package Sources](/docs/repositories/#explicit-package-sources).

For more information, refer to the [Package Sources](/docs/repositories/#package-sources) documentation.

You can also specify a constraint when adding a package:

```bash
# Allow >=2.0.5, <3.0.0 versions
poetry add pendulum@^2.0.5

# Allow >=2.0.5, <2.1.0 versions
poetry add pendulum@~2.0.5

# Allow >=2.0.5 versions, without upper bound
poetry add "pendulum>=2.0.5"

# Allow only 2.0.5 version
poetry add pendulum==2.0.5
```

Note

See the [Dependency specification](/docs/dependency-specification/#using-the--operator) page for more information about the `@` operator.

If you try to add a package that is already present, you will get an error. However, if you specify a constraint, like above, the dependency will be updated by using the specified constraint.

If you want to get the latest version of an already present dependency, you can use the special `latest` constraint:

```bash
poetry add pendulum@latest
```

Note

See the [Dependency specification](/docs/dependency-specification/) for more information on setting the version constraints for a package.

You can also add `git` dependencies:

```bash
poetry add git+https://github.com/sdispater/pendulum.git
```

or use ssh instead of https:

```bash
poetry add git+ssh://git@github.com/sdispater/pendulum.git

# or alternatively:
poetry add git+ssh://git@github.com:sdispater/pendulum.git
```

If you need to checkout a specific branch, tag or revision, you can specify it when using `add`:

```bash
poetry add git+https://github.com/sdispater/pendulum.git#develop
poetry add git+https://github.com/sdispater/pendulum.git#2.0.5

# or using SSH instead:
poetry add git+ssh://git@github.com:sdispater/pendulum.git#develop
poetry add git+ssh://git@github.com:sdispater/pendulum.git#2.0.5
```

or reference a subdirectory:

```bash
poetry add git+https://github.com/myorg/mypackage_with_subdirs.git@main#subdirectory=subdir
```

You can also add a local directory or file:

```bash
poetry add ./my-package/
poetry add ../my-package/dist/my-package-0.1.0.tar.gz
poetry add ../my-package/dist/my_package-0.1.0.whl
```

If you want the dependency to be installed in editable mode you can use the `--editable` option.

```bash
poetry add --editable ./my-package/
poetry add --editable git+ssh://github.com/sdispater/pendulum.git#develop
```

Alternatively, you can specify it in the `pyproject.toml` file. It means that changes in the local directory will be reflected directly in environment.

```toml
[tool.poetry.dependencies]
my-package = {path = "../my/path", develop = true}
```

Note

The `develop` attribute is a Poetry-specific feature, so it is not included in the package distribution metadata. In other words, it is only considered when using Poetry to install the project.

If the package(s) you want to install provide extras, you can specify them when adding the package:

```bash
poetry add "requests[security,socks]"
poetry add "requests[security,socks]~=2.22.0"
poetry add "git+https://github.com/pallets/flask.git@1.1.1[dotenv,dev]"
```

Warning

Some shells may treat square braces (`[` and `]`) as special characters. It is suggested to always quote arguments containing these characters to prevent unexpected shell expansion.

If you want to add a package to a specific group of dependencies, you can use the `--group (-G)` option:

```bash
poetry add mkdocs --group docs
```

See [Dependency groups](/docs/managing-dependencies/#dependency-groups) for more information about dependency groups.

#### Options [#](#options)

- `--group (-G)`: The group to add the dependency to.
- `--dev (-D)`: Add package as development dependency. (shortcut for `-G dev`)
- `--editable (-e)`: Add vcs/path dependencies as editable.
- `--extras (-E)`: Extras to activate for the dependency. (multiple values allowed)
- `--optional`: Add as an optional dependency to an extra.
- `--python`: Python version for which the dependency must be installed.
- `--platform`: Platforms for which the dependency must be installed.
- `--markers`: Environment markers which describe when the dependency should be installed.
- `--source`: Name of the source to use to install the package.
- `--allow-prereleases`: Accept prereleases.
- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).
- `--lock`: Do not perform install (only update the lockfile).

## build [#](#build)

The `build` command builds the source and wheels archives.

```bash
poetry build
```

The command will trigger the build system defined in the `pyproject.toml` file according to [PEP 517](https://peps.python.org/pep-0517/). If necessary the build process happens in an isolated environment.

#### Options [#](#options-1)

- `--format (-f)`: Limit the format to either `wheel` or `sdist`.
- `--clean`: Clean output directory before building.
- `--local-version (-l)`: Add or replace a local version label to the build (deprecated).
- `--output (-o)`: Set output directory for build artifacts. Default is `dist`.
- `--config-settings=<key>=<value> (-c)`: Config settings to be passed to the build back-end. (multiple allowed)

Note

When using `--local-version`, the identifier must be [PEP 440](https://peps.python.org/pep-0440/#local-version-identifiers) compliant. This is useful for adding build numbers, platform specificities etc. for private packages.

`--local-version` is deprecated and will be removed in a future version of Poetry. Use `--config-settings local-version=<version>` instead.

Warning

Local version identifiers SHOULD NOT be used when publishing upstream projects to a public index server, but MAY be used to identify private builds created directly from the project source.

See [PEP 440](https://peps.python.org/pep-0440/#local-version-identifiers) for more information.

## cache [#](#cache)

The `cache` command groups subcommands to interact with Poetry’s cache.

### cache clear [#](#cache-clear)

The `cache clear` command removes packages from a cached repository.

For example, to clear the whole cache of packages from the `PyPI` repository, run:

```bash
poetry cache clear PyPI --all
```

To only remove a specific package from a cache, you have to specify the cache entry in the following form `cache:package:version`:

```bash
poetry cache clear pypi:requests:2.24.0
```

### cache list [#](#cache-list)

The `cache list` command lists Poetry’s available caches.

```bash
poetry cache list
```

## check [#](#check)

The `check` command validates the content of the `pyproject.toml` file and its consistency with the `poetry.lock` file. It returns a detailed report if there are any errors.

Note

This command is also available as a pre-commit hook. See [pre-commit hooks](/docs/pre-commit-hooks/#poetry-check) for more information.

```bash
poetry check
```

#### Options [#](#options-2)

- `--lock`: Verifies that `poetry.lock` exists for the current `pyproject.toml`.
- `--strict`: Fail if check reports warnings.

## config [#](#config)

The `config` command allows you to edit poetry config settings and repositories.

```bash
poetry config --list
```

### Usage [#](#usage)

```bash
poetry config [options] [setting-key] [setting-value1] ... [setting-valueN]
```

`setting-key` is a configuration option name and `setting-value1` is a configuration value. See [Configuration](/docs/configuration/) for all available settings.

Warning

Use `--` to terminate option parsing if your values may start with a hyphen (`-`), e.g.

```bash
poetry config http-basic.custom-repo gitlab-ci-token -- ${GITLAB_JOB_TOKEN}
```

Without `--` this command will fail if `${GITLAB_JOB_TOKEN}` starts with a hyphen.

#### Options [#](#options-3)

- `--unset`: Remove the configuration element named by `setting-key`.
- `--list`: Show the list of current config variables.
- `--local`: Set/Get settings that are specific to a project (in the local configuration file `poetry.toml`).
- `--migrate`: Migrate outdated configuration settings.

## debug [#](#debug)

The `debug` command groups subcommands that are useful for, as the name suggests, debugging issues you might have when using Poetry with your projects.

### debug info [#](#debug-info)

The `debug info` command shows debug information about Poetry and your project’s virtual environment.

### debug resolve [#](#debug-resolve)

The `debug resolve` command helps when debugging dependency resolution issues. The command attempts to resolve your dependencies and list the chosen packages and versions.

### debug tags [#](#debug-tags)

The `debug tags` command is useful when you want to see the supported packaging tags for your project’s active virtual environment. This is useful when Poetry cannot install any known binary distributions for a dependency.

## env [#](#env)

The `env` command groups subcommands to interact with the virtualenvs associated with a specific project.

See [Managing environments](/docs/managing-environments/) for more information about these commands.

### env activate [#](#env-activate)

The `env activate` command prints the command to activate a virtual environment in your current shell.

Note

This command does not activate the virtual environment, but only displays the activation command, for more information on how to use this command see [here](/docs/managing-environments/#activating-the-environment).

### env info [#](#env-info)

The `env info` command displays information about the current environment.

#### Options [#](#options-4)

- `--path (-p)`: Only display the environment’s path.
- `--executable (-e)`: Only display the environment’s python executable path.

### env list [#](#env-list)

The `env list` command lists all virtualenvs associated with the current project.

#### Options [#](#options-5)

- `--full-path`: Output the full paths of the virtualenvs.

### env remove [#](#env-remove)

The `env remove` command removes virtual environments associated with the project. You can specify multiple Python executables or virtual environment names to remove all matching ones. Alternatively, you can remove all associated virtual environments using the `--all` option.

Note

If `virtualenvs.in-project` config is set to `true`, no argument or option is required. Your in project virtual environment is removed.

#### Arguments [#](#arguments)

- `python`: The python executables associated with, or names of the virtual environments which are to be removed. Can be specified multiple times.

#### Options [#](#options-6)

- `--all`: Remove all managed virtual environments associated with the project.

### env use [#](#env-use)

The `env use` command activates or creates a new virtualenv for the current project.

#### Arguments [#](#arguments-1)

- `python`: The python executable to use. This can be a version number (if not on Windows) or a path to the python binary.

## export [#](#export)

Warning

This command is provided by the [Export Poetry Plugin](https://github.com/python-poetry/poetry-plugin-export). The plugin is no longer installed by default with Poetry 2.0.

See [Using plugins](/docs/plugins/#using-plugins) for information on how to install a plugin. As described in [Project plugins](/docs/plugins/#project-plugins), you can also define in your `pyproject.toml` that the plugin is required for the development of your project:

```toml
[tool.poetry.requires-plugins]
poetry-plugin-export = ">=1.8"
```

Note

The `export` command is also available as a pre-commit hook. See [pre-commit hooks](/docs/pre-commit-hooks/#poetry-export) for more information.

## help [#](#help)

The `help` command displays global help, or help for a specific command.

To display global help:

```bash
poetry help
```

To display help for a specific command, for instance `show`:

```bash
poetry help show
```

Note

The `--help` option can also be passed to any command to get help for a specific command.

For instance:

```bash
poetry show --help
```

## init [#](#init)

This command will help you create a `pyproject.toml` file interactively by prompting you to provide basic information about your package.

It will interactively ask you to fill in the fields, while using some smart defaults.

```bash
poetry init
```

#### Options [#](#options-7)

- `--name`: Name of the package.
- `--description`: Description of the package.
- `--author`: Author of the package.
- `--python` Compatible Python versions.
- `--dependency`: Package to require with a version constraint. Should be in format `foo:1.0.0`.
- `--dev-dependency`: Development requirements, see `--dependency`.

## install [#](#install)

The `install` command reads the `pyproject.toml` file from the current project, resolves the dependencies, and installs them.

Note

Normally, you should prefer `poetry sync` to `poetry install` to avoid untracked outdated packages. However, if you have set `virtualenvs.create = false` to install dependencies into your system environment, which is discouraged, or `virtualenvs.options.system-site-packages = true` to make system site-packages available in your virtual environment, you should use `poetry install` because `poetry sync` will normally not work well in these cases.

```bash
poetry install
```

If there is a `poetry.lock` file in the current directory, it will use the exact versions from there instead of resolving them. This ensures that everyone using the library will get the same versions of the dependencies.

If there is no `poetry.lock` file, Poetry will create one after dependency resolution.

If you want to exclude one or more dependency groups for the installation, you can use the `--without` option.

```bash
poetry install --without test,docs
```

You can also select optional dependency groups with the `--with` option.

```bash
poetry install --with test,docs
```

To install all dependency groups including the optional groups, use the `--all-groups` flag.

```bash
poetry install --all-groups
```

It’s also possible to only install specific dependency groups by using the `only` option.

```bash
poetry install --only test,docs
```

To only install the project itself with no dependencies, use the `--only-root` flag.

```bash
poetry install --only-root
```

See [Dependency groups](/docs/managing-dependencies/#dependency-groups) for more information about dependency groups.

You can also specify the extras you want installed by passing the `-E|--extras` option (See [Extras](/docs/pyproject/#extras) for more info). Pass `--all-extras` to install all defined extras for a project.

```bash
poetry install --extras "mysql pgsql"
poetry install -E mysql -E pgsql
poetry install --all-extras
```

Any extras not specified will be kept but not installed:

```bash
poetry install --extras "A B"  # C is kept if already installed
```

If you want to remove unspecified extras, use the `sync` command.

By default `poetry` will install your project’s package every time you run `install`:

```bash
$ poetry install
Installing dependencies from lock file

No dependencies to install or update

  - Installing <your-package-name> (x.x.x)
```

If you want to skip this installation, use the `--no-root` option.

```bash
poetry install --no-root
```

Similar to `--no-root` you can use `--no-directory` to skip directory path dependencies:

```bash
poetry install --no-directory
```

This is mainly useful for caching in CI or when building Docker images. See the [FAQ entry](/docs/faq/#poetry-busts-my-docker-cache-because-it-requires-me-to-copy-my-source-files-in-before-installing-3rd-party-dependencies) for more information on this option.

By default `poetry` does not compile Python source files to bytecode during installation. This speeds up the installation process, but the first execution may take a little more time because Python then compiles source files to bytecode automatically. If you want to compile source files to bytecode during installation, you can use the `--compile` option:

```bash
poetry install --compile
```

#### Options [#](#options-8)

- `--without`: The dependency groups to ignore.
- `--with`: The optional dependency groups to include.
- `--only`: The only dependency groups to include.
- `--only-root`: Install only the root project, exclude all dependencies.
- `--sync`: Synchronize the environment with the locked packages and the specified groups. (**Deprecated**, use `poetry sync` instead)
- `--no-root`: Do not install the root package (your project).
- `--no-directory`: Skip all directory path dependencies (including transitive ones).
- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).
- `--extras (-E)`: Features to install (multiple values allowed).
- `--all-extras`: Install all extra features (conflicts with `--extras`).
- `--all-groups`: Install dependencies from all groups (conflicts with `--only`, `--with`, and `--without`).
- `--compile`: Compile Python source files to bytecode.

Note

When `--only` is specified, `--with` and `--without` options are ignored.

## list [#](#list)

The `list` command displays all the available Poetry commands.

```bash
poetry list
```

## lock [#](#lock)

This command locks (without installing) the dependencies specified in `pyproject.toml`.

Note

By default, packages that have already been added to the lock file before will not be updated. To update all dependencies to the latest available compatible versions, use `poetry update --lock` or `poetry lock --regenerate`, which normally produce the same result. This command is also available as a pre-commit hook. See [pre-commit hooks](/docs/pre-commit-hooks/#poetry-lock) for more information.

```bash
poetry lock
```

#### Options [#](#options-9)

- `--regenerate`: Ignore existing lock file and overwrite it with a new lock file created from scratch.

## new [#](#new)

This command will help you kickstart your new Python project by creating a new Poetry project. By default, a `src` layout is chosen.

```bash
poetry new my-package
```

will create a folder as follows:

```text
my-package
├── pyproject.toml
├── README.md
├── src
│   └── my_package
│       └── __init__.py
└── tests
    └── __init__.py
```

If you want to name your project differently than the folder, you can pass the `--name` option:

```bash
poetry new my-folder --name my-package
```

If you want to use a `flat` project layout, you can use the `--flat` option:

```bash
poetry new --flat my-package
```

That will create a folder structure as follows:

```text
my-package
├── pyproject.toml
├── README.md
├── my_package
│   └── __init__.py
└── tests
    └── __init__.py
```

Note

For an overview of the differences between `flat` and `src` layouts, please see [here](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/).

The `--name` option is smart enough to detect namespace packages and create the required structure for you.

```bash
poetry new --name my.package my-package
```

will create the following structure:

```text
my-package
├── pyproject.toml
├── README.md
├── src
│   └── my
│       └── package
│           └── __init__.py
└── tests
    └── __init__.py
```

#### Options [#](#options-10)

- `--interactive (-i)`: Allow interactive specification of project configuration.
- `--name`: Set the resulting package name.
- `--flat`: Use the flat layout for the project.
- `--readme`: Specify the readme file extension. Default is `md`. If you intend to publish to PyPI keep the [recommendations for a PyPI-friendly README](https://packaging.python.org/en/latest/guides/making-a-pypi-friendly-readme/) in mind.
- `--description`: Description of the package.
- `--author`: Author of the package.
- `--python` Compatible Python versions.
- `--dependency`: Package to require with a version constraint. Should be in format `foo:1.0.0`.
- `--dev-dependency`: Development requirements, see `--dependency`.

## publish [#](#publish)

This command publishes the package, previously built with the [`build`](#build) command, to the remote repository.

It will automatically register the package before uploading if this is the first time it is submitted.

```bash
poetry publish
```

It can also build the package if you pass it the `--build` option.

Note

See [Publishable Repositories](/docs/repositories/#publishable-repositories) for more information on how to configure and use publishable repositories.

#### Options [#](#options-11)

- `--repository (-r)`: The repository to register the package to (default: `pypi`). Should match a repository name set by the [`config`](#config) command.
- `--username (-u)`: The username to access the repository.
- `--password (-p)`: The password to access the repository.
- `--cert`: Certificate authority to access the repository.
- `--client-cert`: Client certificate to access the repository.
- `--dist-dir`: Dist directory where built artifact are stored. Default is `dist`.
- `--build`: Build the package before publishing.
- `--dry-run`: Perform all actions except upload the package.
- `--skip-existing`: Ignore errors from files already existing in the repository.

Note

See [Configuring Credentials](/docs/repositories/#configuring-credentials) for more information on how to configure credentials.

## python [#](#python)

The `python` namespace groups subcommands to manage Python versions.

Warning

This is an experimental feature, and can change behaviour in upcoming releases.

*Introduced in 2.1.0*

### python install [#](#python-install)

The `python install` command installs the specified Python version from the Python Standalone Builds project.

```bash
poetry python install <PYTHON_VERSION>
```

#### Options [#](#options-12)

- `--clean`: Clean up installation if check fails.
- `--free-threaded`: Use free-threaded version if available.
- `--implementation`: Python implementation to use. (cpython, pypy)
- `--reinstall`: Reinstall if installation already exists.

### python list [#](#python-list)

The `python list` command shows Python versions available in the environment. This includes both installed and discovered System managed and Poetry managed installations.

```bash
poetry python list
```

#### Options [#](#options-13)

- `--all`: List all versions, including those available for download.
- `--implementation`: Python implementation to search for.
- `--managed`: List only Poetry managed Python versions.

### python remove [#](#python-remove)

The `python remove` command removes the specified Python version if managed by Poetry.

```bash
poetry python remove <PYTHON_VERSION>
```

#### Options [#](#options-14)

- `--implementation`: Python implementation to use. (cpython, pypy)

## remove [#](#remove)

The `remove` command removes a package from the current list of installed packages.

```bash
poetry remove pendulum
```

If you want to remove a package from a specific group of dependencies, you can use the `--group (-G)` option:

```bash
poetry remove mkdocs --group docs
```

See [Dependency groups](/docs/managing-dependencies/#dependency-groups) for more information about dependency groups.

#### Options [#](#options-15)

- `--group (-G)`: The group to remove the dependency from.
- `--dev (-D)`: Removes a package from the development dependencies. (shortcut for `-G dev`)
- `--dry-run` : Outputs the operations but will not execute anything (implicitly enables `--verbose`).
- `--lock`: Do not perform operations (only update the lockfile).

## run [#](#run)

The `run` command executes the given command inside the project’s virtualenv.

```bash
poetry run python -V
```

It can also execute one of the scripts defined in `pyproject.toml`.

So, if you have a script defined like this:

\[project]

- [\[project\]](#script-project)
- [\[tool.poetry\]](#script-poetry)

[\[project\]](#script-project) [\[tool.poetry\]](#script-poetry)

```toml
[project]
# ...
[project.scripts]
my-script = "my_module:main"
```

```toml
[tool.poetry.scripts]
my-script = "my_module:main"
```

You can execute it like so:

```bash
poetry run my-script
```

Note that this command has no option.

## search [#](#search)

This command searches for packages on a remote index.

```bash
poetry search requests pendulum
```

Note

PyPI no longer allows for the search of packages without a browser. Please use [https://pypi.org/search](https://pypi.org/search) (via a browser) instead.

For more information please see [warehouse documentation](https://warehouse.pypa.io/api-reference/xml-rpc.html#deprecated-methods) and this [discussion](https://discuss.python.org/t/fastly-interfering-with-pypi-search/73597/6).

## self [#](#self)

The `self` namespace groups subcommands to manage the Poetry installation itself.

Note

Use of these commands will create the required `pyproject.toml` and `poetry.lock` files in your [configuration directory](/docs/configuration/).

Warning

Especially on Windows, `self` commands that update or remove packages may be problematic so that other methods for installing plugins and updating Poetry are recommended. See [Using plugins](/docs/plugins/#using-plugins) and [Installing Poetry](/docs/#installation) for more information.

### self add [#](#self-add)

The `self add` command installs Poetry plugins and make them available at runtime. Additionally, it can also be used to upgrade Poetry’s own dependencies or inject additional packages into the runtime environment

Note

The `self add` command works exactly like the [`add` command](#add). However, is different in that the packages managed are for Poetry’s runtime environment.

The package specification formats supported by the `self add` command are the same as the ones supported by the [`add` command](#add).

For example, to install the `poetry-plugin-export` plugin, you can run:

```bash
poetry self add poetry-plugin-export
```

To update to the latest `poetry-core` version, you can run:

```bash
poetry self add poetry-core@latest
```

To add a keyring provider `artifacts-keyring`, you can run:

```bash
poetry self add artifacts-keyring
```

#### Options [#](#options-16)

- `--editable (-e)`: Add vcs/path dependencies as editable.
- `--extras (-E)`: Extras to activate for the dependency. (multiple values allowed)
- `--allow-prereleases`: Accept prereleases.
- `--source`: Name of the source to use to install the package.
- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).

### self install [#](#self-install)

The `self install` command ensures all additional packages specified are installed in the current runtime environment.

Note

The `self install` command works similar to the [`install` command](#install). However, it is different in that the packages managed are for Poetry’s runtime environment.

```bash
poetry self install
```

#### Options [#](#options-17)

- `--sync`: Synchronize the environment with the locked packages and the specified groups. (**Deprecated**, use `poetry self sync` instead)
- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).

### self lock [#](#self-lock)

The `self lock` command reads this Poetry installation’s system `pyproject.toml` file. The system dependencies are locked in the corresponding `poetry.lock` file.

```bash
poetry self lock
```

#### Options [#](#options-18)

- `--regenerate`: Ignore existing lock file and overwrite it with a new lock file created from scratch.

### self remove [#](#self-remove)

The `self remove` command removes an installed addon package.

```bash
poetry self remove poetry-plugin-export
```

#### Options [#](#options-19)

- `--dry-run`: Outputs the operations but will not execute anything (implicitly enables `--verbose`).

### self show [#](#self-show)

The `self show` command behaves similar to the show command, but working within Poetry’s runtime environment. This lists all packages installed within the Poetry install environment.

To show only additional packages that have been added via self add and their dependencies use `self show --addons`.

```bash
poetry self show
```

#### Options [#](#options-20)

- `--addons`: List only add-on packages installed.
- `--tree`: List the dependencies as a tree.
- `--latest (-l)`: Show the latest version.
- `--outdated (-o)`: Show the latest version but only for packages that are outdated.

### self show plugins [#](#self-show-plugins)

The `self show plugins` command lists all the currently installed plugins.

```bash
poetry self show plugins
```

### self sync [#](#self-sync)

The `self sync` command ensures all additional (and no other) packages specified are installed in the current runtime environment.

Note

The `self sync` command works similar to the [`sync` command](#sync). However, it is different in that the packages managed are for Poetry’s runtime environment.

```bash
poetry self sync
```

#### Options [#](#options-21)

- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).

### self update [#](#self-update)

The `self update` command updates Poetry version in its current runtime environment.

Note

The `self update` command works exactly like the [`update` command](#update). However, is different in that the packages managed are for Poetry’s runtime environment.

```bash
poetry self update
```

#### Options [#](#options-22)

- `--preview`: Allow the installation of pre-release versions.
- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).

## shell [#](#shell)

The `shell` command was moved to a plugin: [`poetry-plugin-shell`](https://github.com/python-poetry/poetry-plugin-shell)

## show [#](#show)

To list all the available packages, you can use the `show` command.

```bash
poetry show
```

If you want to see the details of a certain package, you can pass the package name.

```bash
poetry show pendulum

name        : pendulum
version     : 1.4.2
description : Python datetimes made easy

dependencies
 - python-dateutil >=2.6.1
 - tzlocal >=1.4
 - pytzdata >=2017.2.2

required by
 - calendar requires >=1.4.0
```

#### Options [#](#options-23)

- `--without`: The dependency groups to ignore.
- `--why`: When showing the full list, or a `--tree` for a single package, display whether they are a direct dependency or required by other packages.
- `--with`: The optional dependency groups to include.
- `--only`: The only dependency groups to include.
- `--tree`: List the dependencies as a tree.
- `--latest (-l)`: Show the latest version.
- `--outdated (-o)`: Show the latest version but only for packages that are outdated.
- `--all (-a)`: Show all packages (even those not compatible with current system).
- `--top-level (-T)`: Only show explicitly defined packages.
- `--no-truncate`: Do not truncate the output based on the terminal width.

Note

When `--only` is specified, `--with` and `--without` options are ignored.

## source [#](#source)

The `source` namespace groups subcommands to manage repository sources for a Poetry project.

### source add [#](#source-add)

The `source add` command adds source configuration to the project.

For example, to add the `pypi-test` source, you can run:

```bash
poetry source add --priority supplemental pypi-test https://test.pypi.org/simple/
```

You cannot use the name `pypi` for a custom repository as it is reserved for use by the default PyPI source. However, you can set the priority of PyPI:

```bash
poetry source add --priority=explicit pypi
```

#### Options [#](#options-24)

- `--priority`: Set the priority of this source. Accepted values are: [`primary`](/docs/repositories/#primary-package-sources), [`supplemental`](/docs/repositories/#supplemental-package-sources), and [`explicit`](/docs/repositories/#explicit-package-sources). Refer to the dedicated sections in [Repositories](/docs/repositories/) for more information.

### source show [#](#source-show)

The `source show` command displays information on all configured sources for the project.

```bash
poetry source show
```

Optionally, you can show information of one or more sources by specifying their names.

```bash
poetry source show pypi-test
```

Note

This command will only show sources configured via the `pyproject.toml` and does not include the implicit default PyPI.

### source remove [#](#source-remove)

The `source remove` command removes a configured source from your `pyproject.toml`.

```bash
poetry source remove pypi-test
```

## sync [#](#sync)

The `sync` command makes sure that the project’s environment is in sync with the `poetry.lock` file. It is similar to `poetry install` but it additionally removes packages that are not tracked in the lock file.

```bash
poetry sync
```

If there is a `poetry.lock` file in the current directory, it will use the exact versions from there instead of resolving them. This ensures that everyone using the library will get the same versions of the dependencies.

If there is no `poetry.lock` file, Poetry will create one after dependency resolution.

If you want to exclude one or more dependency groups for the installation, you can use the `--without` option.

```bash
poetry sync --without test,docs
```

You can also select optional dependency groups with the `--with` option.

```bash
poetry sync --with test,docs
```

To install all dependency groups including the optional groups, use the `--all-groups` flag.

```bash
poetry sync --all-groups
```

It’s also possible to only install specific dependency groups by using the `only` option.

```bash
poetry sync --only test,docs
```

To only install the project itself with no dependencies, use the `--only-root` flag.

```bash
poetry sync --only-root
```

See [Dependency groups](/docs/managing-dependencies/#dependency-groups) for more information about dependency groups.

You can also specify the extras you want installed by passing the `-E|--extras` option (See [Extras](/docs/pyproject/#extras) for more info). Pass `--all-extras` to install all defined extras for a project.

```bash
poetry sync --extras "mysql pgsql"
poetry sync -E mysql -E pgsql
poetry sync --all-extras
```

Any extras not specified will always be removed.

```bash
poetry sync --extras "A B"  # C is removed
```

By default `poetry` will install your project’s package every time you run `sync`:

```bash
$ poetry sync
Installing dependencies from lock file

No dependencies to install or update

  - Installing <your-package-name> (x.x.x)
```

If you want to skip this installation, use the `--no-root` option.

```bash
poetry sync --no-root
```

Similar to `--no-root` you can use `--no-directory` to skip directory path dependencies:

```bash
poetry sync --no-directory
```

This is mainly useful for caching in CI or when building Docker images. See the [FAQ entry](/docs/faq/#poetry-busts-my-docker-cache-because-it-requires-me-to-copy-my-source-files-in-before-installing-3rd-party-dependencies) for more information on this option.

By default `poetry` does not compile Python source files to bytecode during installation. This speeds up the installation process, but the first execution may take a little more time because Python then compiles source files to bytecode automatically. If you want to compile source files to bytecode during installation, you can use the `--compile` option:

```bash
poetry sync --compile
```

#### Options [#](#options-25)

- `--without`: The dependency groups to ignore.
- `--with`: The optional dependency groups to include.
- `--only`: The only dependency groups to include.
- `--only-root`: Install only the root project, exclude all dependencies.
- `--no-root`: Do not install the root package (your project).
- `--no-directory`: Skip all directory path dependencies (including transitive ones).
- `--dry-run`: Output the operations but do not execute anything (implicitly enables `--verbose`).
- `--extras (-E)`: Features to install (multiple values allowed).
- `--all-extras`: Install all extra features (conflicts with `--extras`).
- `--all-groups`: Install dependencies from all groups (conflicts with `--only`, `--with`, and `--without`).
- `--compile`: Compile Python source files to bytecode.

Note

When `--only` is specified, `--with` and `--without` options are ignored.

## update [#](#update)

In order to get the latest versions of the dependencies and to update the `poetry.lock` file, you should use the `update` command.

```bash
poetry update
```

This will resolve all dependencies of the project and write the exact versions into `poetry.lock`.

If you just want to update a few packages and not all, you can list them as such:

```bash
poetry update requests toml
```

Note that this will not update versions for dependencies outside their [version constraints](/docs/dependency-specification/#version-constraints) specified in the `pyproject.toml` file. In other terms, `poetry update foo` will be a no-op if the version constraint specified for `foo` is `~2.3` or `2.3` and `2.4` is available. In order for `foo` to be updated, you must update the constraint, for example `^2.3`. You can do this using the `add` command.

#### Options [#](#options-26)

- `--without`: The dependency groups to ignore.
- `--with`: The optional dependency groups to include.
- `--only`: The only dependency groups to include.
- `--dry-run` : Outputs the operations but will not execute anything (implicitly enables `--verbose`).
- `--lock` : Do not perform install (only update the lockfile).
- `--sync`: Synchronize the environment with the locked packages and the specified groups.

Note

When `--only` is specified, `--with` and `--without` options are ignored.

## version [#](#version)

This command shows the current version of the project or bumps the version of the project and writes the new version back to `pyproject.toml` if a valid bump rule is provided.

The new version should be a valid [PEP 440](https://peps.python.org/pep-0440/) string or a valid bump rule: `patch`, `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`.

Note

If you would like to use semantic versioning for your project, please see [here](/docs/libraries/#versioning).

The table below illustrates the effect of these rules with concrete examples.

| rule       | before  | after   |
|------------|---------|---------|
| major      | 1.3.0   | 2.0.0   |
| minor      | 2.1.4   | 2.2.0   |
| patch      | 4.1.1   | 4.1.2   |
| premajor   | 1.0.2   | 2.0.0a0 |
| preminor   | 1.0.2   | 1.1.0a0 |
| prepatch   | 1.0.2   | 1.0.3a0 |
| prerelease | 1.0.2   | 1.0.3a0 |
| prerelease | 1.0.3a0 | 1.0.3a1 |
| prerelease | 1.0.3b0 | 1.0.3b1 |

The option `--next-phase` allows the increment of prerelease phase versions.

| rule                   | before   | after    |
|------------------------|----------|----------|
| prerelease –next-phase | 1.0.3a0  | 1.0.3b0  |
| prerelease –next-phase | 1.0.3b0  | 1.0.3rc0 |
| prerelease –next-phase | 1.0.3rc0 | 1.0.3    |

#### Options [#](#options-27)

- `--next-phase`: Increment the phase of the current version.
- `--short (-s)`: Output the version number only.
- `--dry-run`: Do not update pyproject.toml file.

## Footer

![Poetry](/images/logo-origami.svg)

Python packaging and dependency management made easy.

[GitHub](https://github.com/python-poetry) [Discord](https://discord.com/invite/awxPgve)

### Documentation

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

### Github

- [Project](https://github.com/python-poetry/poetry)
- [Issues](https://github.com/python-poetry/poetry/issues)
- [Discussions](https://github.com/python-poetry/poetry/discussions)

### Other Projects

- [poetry-core](https://github.com/python-poetry/poetry-core)
- [install.python-poetry.org](https://github.com/python-poetry/install.python-poetry.org)
- [Bundle plugin](https://github.com/python-poetry/poetry-plugin-bundle)
- [Export plugin](https://github.com/python-poetry/poetry-plugin-export)

Copyright © 2018-2025. All Rights Reserved. Powered by[Go to the Vercel website](https://vercel.com?utm_source=python-poetry&utm_campaign=oss "Go to the Vercel website")[Home ![Poetry logo](/images/logo-origami.svg)](/)

2.1

- [main](/docs/main/)
- [2.1](/docs/)
- [1.8](/docs/1.8/)

Use dark mode

Open menu

- [Documentation](/docs/)
  
  [Introduction  
  \
  Poetry is a tool for dependency management and packaging in Python.](/docs/)
  
  [Basic usage  
  \
  For the basic usage introduction we will be installing pendulum, a datetime library.](/docs/basic-usage/)
  
  [Managing dependencies  
  \
  Poetry supports specifying main dependencies in the project.dependencies section of your pyproject.toml according to PEP 621.](/docs/managing-dependencies/)
  
  [Libraries  
  \
  This chapter will tell you how to make your library installable through Poetry. Versioning Poetry requires PEP 440-compliant versions for all projects. While Poetry does not enforce any release convention, it used to encourage the use of semantic versioning within the scope of PEP 440 and supports version constraints that are especially suitable for semver. Note As an example, 1.0.0-hotfix.1 is not compatible with PEP 440.](/docs/libraries/)
  
  [Commands  
  \
  You’ve already learned how to use the command-line interface to do some things.](/docs/cli/)
  
  [Configuration  
  \
  Poetry can be configured via the config command (see more about its usage here) or directly in the config.toml file that will be automatically created when you first run that command.](/docs/configuration/)
  
  [Repositories  
  \
  Poetry supports the use of PyPI and private repositories for discovery of packages as well as for publishing your projects. By default, Poetry is configured to use the PyPI repository, for package installation and publishing. So, when you add dependencies to your project, Poetry will assume they are available on PyPI. This represents most cases and will likely be enough for most users. Private Repository Example Installing from private package sources By default, Poetry discovers and installs packages from PyPI.](/docs/repositories/)
  
  [Managing environments  
  \
  Poetry makes project environment isolation one of its core features. What this means is that it will always work isolated from your global Python installation.](/docs/managing-environments/)
  
  [Dependency specification  
  \
  Dependencies for a project can be specified in various forms, which depend on the type of the dependency and on the optional constraints that might be needed for it to be installed. project.dependencies and tool.poetry.dependencies Prior Poetry 2.0, dependencies had to be declared in the tool.poetry.dependencies section of the pyproject.toml file. \[tool.poetry.dependencies\] requests = "^2.13.0" With Poetry 2.0, you should consider using the project.dependencies section instead. \[project\] # ...](/docs/dependency-specification/)
  
  [Plugins  
  \
  Poetry supports using and building plugins if you wish to alter or expand Poetry’s functionality with your own. For example if your environment poses special requirements on the behaviour of Poetry which do not apply to the majority of its users or if you wish to accomplish something with Poetry in a way that is not desired by most users. In these cases you could consider creating a plugin to handle your specific logic. .](/docs/plugins/)
  
  [The pyproject.toml file  
  \
  In package mode, the only required fields are name and version (either in the project section or in the tool.poetry section).](/docs/pyproject/)
  
  [Contributing to Poetry  
  \
  First off, thanks for taking the time to contribute! The following is a set of guidelines for contributing to Poetry on GitHub.](/docs/contributing/)
  
  [Community  
  \
  Badge For any projects using Poetry, you may add its official badge somewhere prominent like the README. Markdown \[!\[Poetry\](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)\](https://python-poetry.org/) reStructuredText ..](/docs/community/)
  
  [FAQ  
  \
  Why is the dependency resolution process slow? While the dependency resolver at the heart of Poetry is highly optimized and should be fast enough for most cases, with certain sets of dependencies it can take time to find a valid solution. This is due to the fact that not all libraries on PyPI have properly declared their metadata and, as such, they are not available via the PyPI JSON API.](/docs/faq/)
  
  [pre-commit hooks  
  \
  pre-commit is a framework for building and running git hooks.](/docs/pre-commit-hooks/)
  
  [Building extension modules  
  \
  Building Extension Modules Warning While this feature has been around since almost the beginning of the Poetry project and has needed minimal changes, it is still considered unstable.](/docs/building-extension-modules/)
  
  [2.1 Stable Documentation for the latest, **stable**, branch.](/docs/) [main Development Documentation for the latest, **in-development**, branch.](/docs/main/)
- [Blog](/blog/)
- [History](/history/)
- [Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

![Poetry](/images/logo-origami.svg)

Close menu

[Documentation](/docs/) [Blog](/blog/) [History](/history/)[Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
  
  - [Project setup](#project-setup)
    
    - [Setting a Python Version](#setting-a-python-version)
    - [Initialising a pre-existing project](#initialising-a-pre-existing-project)
    - [Operating modes](#operating-modes)
    - [Specifying dependencies](#specifying-dependencies)
  - [Using your virtual environment](#using-your-virtual-environment)
    
    - [Using `poetry run`](#using-poetry-run)
    - [Activating the virtual environment](#activating-the-virtual-environment)
  - [Version constraints](#version-constraints)
  - [Installing dependencies](#installing-dependencies)
    
    - [Installing without `poetry.lock`](#installing-without-poetrylock)
    - [Installing with `poetry.lock`](#installing-with-poetrylock)
    - [Committing your `poetry.lock` file to version control](#committing-your-poetrylock-file-to-version-control)
    - [Installing dependencies only](#installing-dependencies-only)
  - [Updating dependencies to their latest versions](#updating-dependencies-to-their-latest-versions)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

Basic usage

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

# Basic usage

- [Project setup](#project-setup)
  
  - [Setting a Python Version](#setting-a-python-version)
  - [Initialising a pre-existing project](#initialising-a-pre-existing-project)
  - [Operating modes](#operating-modes)
  - [Specifying dependencies](#specifying-dependencies)
- [Using your virtual environment](#using-your-virtual-environment)
  
  - [Using `poetry run`](#using-poetry-run)
  - [Activating the virtual environment](#activating-the-virtual-environment)
- [Version constraints](#version-constraints)
- [Installing dependencies](#installing-dependencies)
  
  - [Installing without `poetry.lock`](#installing-without-poetrylock)
  - [Installing with `poetry.lock`](#installing-with-poetrylock)
  - [Committing your `poetry.lock` file to version control](#committing-your-poetrylock-file-to-version-control)
  - [Installing dependencies only](#installing-dependencies-only)
- [Updating dependencies to their latest versions](#updating-dependencies-to-their-latest-versions)

# Basic usage [#](#basic-usage)

For the basic usage introduction we will be installing `pendulum`, a datetime library. If you have not yet installed Poetry, refer to the [Introduction](/docs/ "Introduction") chapter.

## Project setup [#](#project-setup)

First, let’s create our new project, let’s call it `poetry-demo`:

```bash
poetry new poetry-demo
```

This will create the `poetry-demo` directory with the following content:

```text
poetry-demo
├── pyproject.toml
├── README.md
├── poetry_demo
│   └── __init__.py
└── tests
    └── __init__.py
```

The `pyproject.toml` file is what is the most important here. This will orchestrate your project and its dependencies. For now, it looks like this:

```toml
[project]
name = "poetry-demo"
version = "0.1.0"
description = ""
authors = [
    {name = "Sébastien Eustace", email = "sebastien@eustace.io"}
]
readme = "README.md"
requires-python = ">=3.9"
dependencies = [
]

[build-system]
requires = ["poetry-core>=2.0.0,<3.0.0"]
build-backend = "poetry.core.masonry.api"
```

Poetry assumes your package contains a package with the same name as `project.name` located in the root of your project. If this is not the case, populate [`tool.poetry.packages`](/docs/pyproject/#packages) to specify your packages and their locations.

Similarly, the traditional `MANIFEST.in` file is replaced by the `project.readme`, `tool.poetry.include`, and `tool.poetry.exclude` sections. `tool.poetry.exclude` is additionally implicitly populated by your `.gitignore`. For full documentation on the project format, see the [pyproject section](/docs/pyproject/) of the documentation.

### Setting a Python Version [#](#setting-a-python-version)

Note

Unlike with other packages, Poetry will not automatically install a python interpreter for you. If you want to run Python files in your package like a script or application, you must *bring your own* python interpreter to run them.

Poetry will require you to explicitly specify what versions of Python you intend to support, and its universal locking will guarantee that your project is installable (and all dependencies claim support for) all supported Python versions. Again, it’s important to remember that – unlike other dependencies – setting a Python version is merely specifying which versions of Python you intend to support.

For example, in this `pyproject.toml` file:

```toml
[project]
requires-python = ">=3.9"
```

we are allowing any version of Python 3 that is greater or equal than `3.9.0`.

When you run `poetry install`, you must have access to some version of a Python interpreter that satisfies this constraint available on your system. Poetry will not install a Python interpreter for you.

### Initialising a pre-existing project [#](#initialising-a-pre-existing-project)

Instead of creating a new project, Poetry can be used to ‘initialise’ a pre-populated directory. To interactively create a `pyproject.toml` file in directory `pre-existing-project`:

```bash
cd pre-existing-project
poetry init
```

### Operating modes [#](#operating-modes)

Poetry can be operated in two different modes. The default mode is the **package mode**, which is the right mode if you want to package your project into an sdist or a wheel and perhaps publish it to a package index. In this mode, some metadata such as `name` and `version`, which are required for packaging, are mandatory. Further, the project itself will be installed in editable mode when running `poetry install`.

If you want to use Poetry only for dependency management but not for packaging, you can use the **non-package mode**:

```toml
[tool.poetry]
package-mode = false
```

In this mode, metadata such as `name` and `version` are optional. Therefore, it is not possible to build a distribution or publish the project to a package index. Further, when running `poetry install`, Poetry does not try to install the project itself, but only its dependencies (same as `poetry install --no-root`).

Note

In the [pyproject section](/docs/pyproject/) you can see which fields are required in package mode.

### Specifying dependencies [#](#specifying-dependencies)

If you want to add dependencies to your project, you can specify them in the `project` section.

```toml
[project]
# ...
dependencies = [
    "pendulum (>=2.1,<3.0)"
]
```

As you can see, it takes a mapping of **package names** and **version constraints**.

Poetry uses this information to search for the right set of files in package “repositories” that you register in the `tool.poetry.source` section, or on [PyPI](https://pypi.org) by default.

Also, instead of modifying the `pyproject.toml` file by hand, you can use the `add` command.

```bash
$ poetry add pendulum
```

It will automatically find a suitable version constraint **and install** the package and sub-dependencies.

Poetry supports a rich [dependency specification](/docs/dependency-specification/) syntax, including caret, tilde, wildcard, inequality and [multiple constraints](/docs/dependency-specification/#multiple-constraints-dependencies) requirements.

## Using your virtual environment [#](#using-your-virtual-environment)

By default, Poetry creates a virtual environment in `{cache-dir}/virtualenvs`. You can change the [`cache-dir`](/docs/configuration/#cache-dir "cache-dir configuration documentation") value by editing the Poetry configuration. Additionally, you can use the [`virtualenvs.in-project`](/docs/configuration/#virtualenvsin-project) configuration variable to create virtual environments within your project directory.

There are several ways to run commands within this virtual environment.

Note

**External virtual environment management**

Poetry will detect and respect an existing virtual environment that has been externally activated. This is a powerful mechanism that is intended to be an alternative to Poetry’s built-in, simplified environment management.

To take advantage of this, simply activate a virtual environment using your preferred method or tooling, before running any Poetry commands that expect to manipulate an environment.

### Using `poetry run` [#](#using-poetry-run)

To run your script simply use `poetry run python your_script.py`. Likewise if you have command line tools such as `pytest` or `black` you can run them using `poetry run pytest`.

Note

If managing your own virtual environment externally, you do not need to use `poetry run` since you will, presumably, already have activated that virtual environment and made available the correct python instance. For example, these commands should output the same python path:

```shell
conda activate your_env_name
which python
poetry run which python
poetry env activate
which python
```

### Activating the virtual environment [#](#activating-the-virtual-environment)

See [Activating the virtual environment](/docs/managing-environments/#activating-the-environment).

## Version constraints [#](#version-constraints)

In our example, we are requesting the `pendulum` package with the version constraint `>=2.1.0 <3.0.0`. This means any version greater or equal to 2.1.0 and less than 3.0.0.

Please read [Dependency specification](/docs/dependency-specification/ "Dependency specification documentation") for more in-depth information on versions, how versions relate to each other, and on the different ways you can specify dependencies.

Note

**How does Poetry download the right files?**

When you specify a dependency in `pyproject.toml`, Poetry first takes the name of the package that you have requested and searches for it in any repository you have registered using the `repositories` key. If you have not registered any extra repositories, or it does not find a package with that name in the repositories you have specified, it falls back to PyPI.

When Poetry finds the right package, it then attempts to find the best match for the version constraint you have specified.

## Installing dependencies [#](#installing-dependencies)

To install the defined dependencies for your project, just run the [`install`](/docs/cli/#install) command.

```bash
poetry install
```

When you run this command, one of two things may happen:

### Installing without `poetry.lock` [#](#installing-without-poetrylock)

If you have never run the command before and there is also no `poetry.lock` file present, Poetry simply resolves all dependencies listed in your `pyproject.toml` file and downloads the latest version of their files.

When Poetry has finished installing, it writes all the packages and their exact versions that it downloaded to the `poetry.lock` file, locking the project to those specific versions. You should commit the `poetry.lock` file to your project repo so that all people working on the project are locked to the same versions of dependencies (more below).

### Installing with `poetry.lock` [#](#installing-with-poetrylock)

This brings us to the second scenario. If there is already a `poetry.lock` file as well as a `pyproject.toml` file when you run `poetry install`, it means either you ran the `install` command before, or someone else on the project ran the `install` command and committed the `poetry.lock` file to the project (which is good).

Either way, running `install` when a `poetry.lock` file is present resolves and installs all dependencies that you listed in `pyproject.toml`, but Poetry uses the exact versions listed in `poetry.lock` to ensure that the package versions are consistent for everyone working on your project. As a result you will have all dependencies requested by your `pyproject.toml` file, but they may not all be at the very latest available versions (some dependencies listed in the `poetry.lock` file may have released newer versions since the file was created). This is by design, it ensures that your project does not break because of unexpected changes in dependencies.

### Committing your `poetry.lock` file to version control [#](#committing-your-poetrylock-file-to-version-control)

#### As an application developer [#](#as-an-application-developer)

Application developers commit `poetry.lock` to get more reproducible builds.

Committing this file to VC is important because it will cause anyone who sets up the project to use the exact same versions of the dependencies that you are using. Your CI server, production machines, other developers in your team, everything and everyone runs on the same dependencies, which mitigates the potential for bugs affecting only some parts of the deployments. Even if you develop alone, in six months when reinstalling the project you can feel confident the dependencies installed are still working even if your dependencies released many new versions since then. (See note below about using the update command.)

Warning

If you have added the recommended [`[build-system]`](/docs/pyproject/#poetry-and-pep-517) section to your project’s pyproject.toml then you *can* successfully install your project and its dependencies into a virtual environment using a command like `pip install -e .`. However, pip will not use the lock file to determine dependency versions as the poetry-core build system is intended for library developers (see next section).

#### As a library developer [#](#as-a-library-developer)

Library developers have more to consider. Your users are application developers, and your library will run in a Python environment you don’t control.

The application ignores your library’s lock file. It can use whatever dependency version meets the constraints in your `pyproject.toml`. The application will probably use the latest compatible dependency version. If your library’s `poetry.lock` falls behind some new dependency version that breaks things for your users, you’re likely to be the last to find out about it.

A simple way to avoid such a scenario is to omit the `poetry.lock` file. However, by doing so, you sacrifice reproducibility and performance to a certain extent. Without a lockfile, it can be difficult to find the reason for failing tests, because in addition to obvious code changes an unnoticed library update might be the culprit. Further, Poetry will have to lock before installing a dependency if `poetry.lock` has been omitted. Depending on the number of dependencies, locking may take a significant amount of time.

If you do not want to give up the reproducibility and performance benefits, consider a regular refresh of `poetry.lock` to stay up-to-date and reduce the risk of sudden breakage for users.

### Installing dependencies only [#](#installing-dependencies-only)

The current project is installed in [editable](https://pip.pypa.io/en/stable/topics/local-project-installs/) mode by default.

If you want to install the dependencies only, run the `install` command with the `--no-root` flag:

```bash
poetry install --no-root
```

## Updating dependencies to their latest versions [#](#updating-dependencies-to-their-latest-versions)

As mentioned above, the `poetry.lock` file prevents you from automatically getting the latest versions of your dependencies. To update to the latest versions, use the `update` command. This will fetch the latest matching versions (according to your `pyproject.toml` file) and update the lock file with the new versions. (This is equivalent to deleting the `poetry.lock` file and running `install` again.)

Note

Poetry will display a **Warning** when executing an install command if `poetry.lock` and `pyproject.toml` are not synchronized.

## Footer

![Poetry](/images/logo-origami.svg)

Python packaging and dependency management made easy.

[GitHub](https://github.com/python-poetry) [Discord](https://discord.com/invite/awxPgve)

### Documentation

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

### Github

- [Project](https://github.com/python-poetry/poetry)
- [Issues](https://github.com/python-poetry/poetry/issues)
- [Discussions](https://github.com/python-poetry/poetry/discussions)

### Other Projects

- [poetry-core](https://github.com/python-poetry/poetry-core)
- [install.python-poetry.org](https://github.com/python-poetry/install.python-poetry.org)
- [Bundle plugin](https://github.com/python-poetry/poetry-plugin-bundle)
- [Export plugin](https://github.com/python-poetry/poetry-plugin-export)

Copyright © 2018-2025. All Rights Reserved. Powered by[Go to the Vercel website](https://vercel.com?utm_source=python-poetry&utm_campaign=oss "Go to the Vercel website")[Home ![Poetry logo](/images/logo-origami.svg)](/)

2.1

- [main](/docs/main/)
- [2.1](/docs/)
- [1.8](/docs/1.8/)

Use dark mode

Open menu

- [Documentation](/docs/)
  
  [Introduction  
  \
  Poetry is a tool for dependency management and packaging in Python.](/docs/)
  
  [Basic usage  
  \
  For the basic usage introduction we will be installing pendulum, a datetime library.](/docs/basic-usage/)
  
  [Managing dependencies  
  \
  Poetry supports specifying main dependencies in the project.dependencies section of your pyproject.toml according to PEP 621.](/docs/managing-dependencies/)
  
  [Libraries  
  \
  This chapter will tell you how to make your library installable through Poetry. Versioning Poetry requires PEP 440-compliant versions for all projects. While Poetry does not enforce any release convention, it used to encourage the use of semantic versioning within the scope of PEP 440 and supports version constraints that are especially suitable for semver. Note As an example, 1.0.0-hotfix.1 is not compatible with PEP 440.](/docs/libraries/)
  
  [Commands  
  \
  You’ve already learned how to use the command-line interface to do some things.](/docs/cli/)
  
  [Configuration  
  \
  Poetry can be configured via the config command (see more about its usage here) or directly in the config.toml file that will be automatically created when you first run that command.](/docs/configuration/)
  
  [Repositories  
  \
  Poetry supports the use of PyPI and private repositories for discovery of packages as well as for publishing your projects. By default, Poetry is configured to use the PyPI repository, for package installation and publishing. So, when you add dependencies to your project, Poetry will assume they are available on PyPI. This represents most cases and will likely be enough for most users. Private Repository Example Installing from private package sources By default, Poetry discovers and installs packages from PyPI.](/docs/repositories/)
  
  [Managing environments  
  \
  Poetry makes project environment isolation one of its core features. What this means is that it will always work isolated from your global Python installation.](/docs/managing-environments/)
  
  [Dependency specification  
  \
  Dependencies for a project can be specified in various forms, which depend on the type of the dependency and on the optional constraints that might be needed for it to be installed. project.dependencies and tool.poetry.dependencies Prior Poetry 2.0, dependencies had to be declared in the tool.poetry.dependencies section of the pyproject.toml file. \[tool.poetry.dependencies\] requests = "^2.13.0" With Poetry 2.0, you should consider using the project.dependencies section instead. \[project\] # ...](/docs/dependency-specification/)
  
  [Plugins  
  \
  Poetry supports using and building plugins if you wish to alter or expand Poetry’s functionality with your own. For example if your environment poses special requirements on the behaviour of Poetry which do not apply to the majority of its users or if you wish to accomplish something with Poetry in a way that is not desired by most users. In these cases you could consider creating a plugin to handle your specific logic. .](/docs/plugins/)
  
  [The pyproject.toml file  
  \
  In package mode, the only required fields are name and version (either in the project section or in the tool.poetry section).](/docs/pyproject/)
  
  [Contributing to Poetry  
  \
  First off, thanks for taking the time to contribute! The following is a set of guidelines for contributing to Poetry on GitHub.](/docs/contributing/)
  
  [Community  
  \
  Badge For any projects using Poetry, you may add its official badge somewhere prominent like the README. Markdown \[!\[Poetry\](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)\](https://python-poetry.org/) reStructuredText ..](/docs/community/)
  
  [FAQ  
  \
  Why is the dependency resolution process slow? While the dependency resolver at the heart of Poetry is highly optimized and should be fast enough for most cases, with certain sets of dependencies it can take time to find a valid solution. This is due to the fact that not all libraries on PyPI have properly declared their metadata and, as such, they are not available via the PyPI JSON API.](/docs/faq/)
  
  [pre-commit hooks  
  \
  pre-commit is a framework for building and running git hooks.](/docs/pre-commit-hooks/)
  
  [Building extension modules  
  \
  Building Extension Modules Warning While this feature has been around since almost the beginning of the Poetry project and has needed minimal changes, it is still considered unstable.](/docs/building-extension-modules/)
  
  [2.1 Stable Documentation for the latest, **stable**, branch.](/docs/) [main Development Documentation for the latest, **in-development**, branch.](/docs/main/)
- [Blog](/blog/)
- [History](/history/)
- [Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

![Poetry](/images/logo-origami.svg)

Close menu

[Documentation](/docs/) [Blog](/blog/) [History](/history/)[Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
  
  - [Local configuration](#local-configuration)
  - [Listing the current configuration](#listing-the-current-configuration)
  - [Displaying a single configuration setting](#displaying-a-single-configuration-setting)
  - [Adding or updating a configuration setting](#adding-or-updating-a-configuration-setting)
  - [Removing a specific setting](#removing-a-specific-setting)
  - [Using environment variables](#using-environment-variables)
  - [Migrate outdated configs](#migrate-outdated-configs)
  - [Default Directories](#default-directories)
    
    - [Config Directory](#config-directory)
    - [Data Directory](#data-directory)
    - [Cache Directory](#cache-directory)
  - [Available settings](#available-settings)
    
    - [`cache-dir`](#cache-dir)
    - [`data-dir`](#data-dir)
    - [`installer.max-workers`](#installermax-workers)
    - [`installer.no-binary`](#installerno-binary)
    - [`installer.only-binary`](#installeronly-binary)
    - [`installer.parallel`](#installerparallel)
    - [`installer.build-config-settings.<package-name>`](#installerbuild-config-settingspackage-name)
    - [`requests.max-retries`](#requestsmax-retries)
    - [`installer.re-resolve`](#installerre-resolve)
    - [`python.installation-dir`](#pythoninstallation-dir)
    - [`solver.lazy-wheel`](#solverlazy-wheel)
    - [`system-git-client`](#system-git-client)
    - [`virtualenvs.create`](#virtualenvscreate)
    - [`virtualenvs.in-project`](#virtualenvsin-project)
    - [`virtualenvs.options.always-copy`](#virtualenvsoptionsalways-copy)
    - [`virtualenvs.options.no-pip`](#virtualenvsoptionsno-pip)
    - [`virtualenvs.options.system-site-packages`](#virtualenvsoptionssystem-site-packages)
    - [`virtualenvs.path`](#virtualenvspath)
    - [`virtualenvs.prompt`](#virtualenvsprompt)
    - [`virtualenvs.use-poetry-python`](#virtualenvsuse-poetry-python)
    - [`repositories.<name>.url`](#repositoriesnameurl)
    - [`http-basic.<name>.[username|password]`](#http-basicnameusernamepassword)
    - [`pypi-token.<name>`](#pypi-tokenname)
    - [`certificates.<name>.cert`](#certificatesnamecert)
    - [`certificates.<name>.client-cert`](#certificatesnameclient-cert)
    - [`keyring.enabled`](#keyringenabled)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

Configuration

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

# Configuration

- [Local configuration](#local-configuration)
- [Listing the current configuration](#listing-the-current-configuration)
- [Displaying a single configuration setting](#displaying-a-single-configuration-setting)
- [Adding or updating a configuration setting](#adding-or-updating-a-configuration-setting)
- [Removing a specific setting](#removing-a-specific-setting)
- [Using environment variables](#using-environment-variables)
- [Migrate outdated configs](#migrate-outdated-configs)
- [Default Directories](#default-directories)
  
  - [Config Directory](#config-directory)
  - [Data Directory](#data-directory)
  - [Cache Directory](#cache-directory)
- [Available settings](#available-settings)
  
  - [`cache-dir`](#cache-dir)
  - [`data-dir`](#data-dir)
  - [`installer.max-workers`](#installermax-workers)
  - [`installer.no-binary`](#installerno-binary)
  - [`installer.only-binary`](#installeronly-binary)
  - [`installer.parallel`](#installerparallel)
  - [`installer.build-config-settings.<package-name>`](#installerbuild-config-settingspackage-name)
  - [`requests.max-retries`](#requestsmax-retries)
  - [`installer.re-resolve`](#installerre-resolve)
  - [`python.installation-dir`](#pythoninstallation-dir)
  - [`solver.lazy-wheel`](#solverlazy-wheel)
  - [`system-git-client`](#system-git-client)
  - [`virtualenvs.create`](#virtualenvscreate)
  - [`virtualenvs.in-project`](#virtualenvsin-project)
  - [`virtualenvs.options.always-copy`](#virtualenvsoptionsalways-copy)
  - [`virtualenvs.options.no-pip`](#virtualenvsoptionsno-pip)
  - [`virtualenvs.options.system-site-packages`](#virtualenvsoptionssystem-site-packages)
  - [`virtualenvs.path`](#virtualenvspath)
  - [`virtualenvs.prompt`](#virtualenvsprompt)
  - [`virtualenvs.use-poetry-python`](#virtualenvsuse-poetry-python)
  - [`repositories.<name>.url`](#repositoriesnameurl)
  - [`http-basic.<name>.[username|password]`](#http-basicnameusernamepassword)
  - [`pypi-token.<name>`](#pypi-tokenname)
  - [`certificates.<name>.cert`](#certificatesnamecert)
  - [`certificates.<name>.client-cert`](#certificatesnameclient-cert)
  - [`keyring.enabled`](#keyringenabled)

# Configuration [#](#configuration)

Poetry can be configured via the `config` command ([see more about its usage here](/docs/cli/#config "config command documentation")) or directly in the `config.toml` file that will be automatically created when you first run that command. This file can typically be found in one of the following directories:

- macOS: `~/Library/Application Support/pypoetry`
- Windows: `%APPDATA%\pypoetry`

For Unix, we follow the XDG spec and support `$XDG_CONFIG_HOME`. That means, by default `~/.config/pypoetry`.

## Local configuration [#](#local-configuration)

Poetry also provides the ability to have settings that are specific to a project by passing the `--local` option to the `config` command.

```bash
poetry config virtualenvs.create false --local
```

Note

Your local configuration of Poetry application is stored in the `poetry.toml` file, which is separate from `pyproject.toml`.

Warning

Be mindful about checking in this file into your repository since it may contain user-specific or sensitive information.

## Listing the current configuration [#](#listing-the-current-configuration)

To list the current configuration you can use the `--list` option of the `config` command:

```bash
poetry config --list
```

which will give you something similar to this:

```toml
cache-dir = "/path/to/cache/directory"
virtualenvs.create = true
virtualenvs.in-project = null
virtualenvs.options.always-copy = true
virtualenvs.options.no-pip = false
virtualenvs.options.system-site-packages = false
virtualenvs.path = "{cache-dir}/virtualenvs"  # /path/to/cache/directory/virtualenvs
virtualenvs.prompt = "{project_name}-py{python_version}"
virtualenvs.use-poetry-python = false
```

## Displaying a single configuration setting [#](#displaying-a-single-configuration-setting)

If you want to see the value of a specific setting, you can give its name to the `config` command

```bash
poetry config virtualenvs.path
```

For a full list of the supported settings see [Available settings](#available-settings).

## Adding or updating a configuration setting [#](#adding-or-updating-a-configuration-setting)

To change or otherwise add a new configuration setting, you can pass a value after the setting’s name:

```bash
poetry config virtualenvs.path /path/to/cache/directory/virtualenvs
```

For a full list of the supported settings see [Available settings](#available-settings).

## Removing a specific setting [#](#removing-a-specific-setting)

If you want to remove a previously set setting, you can use the `--unset` option:

```bash
poetry config virtualenvs.path --unset
```

The setting will then retrieve its default value.

## Using environment variables [#](#using-environment-variables)

Sometimes, in particular when using Poetry with CI tools, it’s easier to use environment variables and not have to execute configuration commands.

Poetry supports this and any setting can be set by using environment variables.

The environment variables must be prefixed by `POETRY_` and are comprised of the uppercase name of the setting and with dots and dashes replaced by underscore, here is an example:

```bash
export POETRY_VIRTUALENVS_PATH=/path/to/virtualenvs/directory
```

This also works for secret settings, like credentials:

```bash
export POETRY_HTTP_BASIC_MY_REPOSITORY_PASSWORD=secret
```

## Migrate outdated configs [#](#migrate-outdated-configs)

If Poetry renames or remove config options it might be necessary to migrate explicit set options. This is possible by running:

```bash
poetry config --migrate
```

If you need to migrate a local config run:

```bash
poetry config --migrate --local
```

## Default Directories [#](#default-directories)

Poetry uses the following default directories:

### Config Directory [#](#config-directory)

- Linux: `$XDG_CONFIG_HOME/pypoetry` or `~/.config/pypoetry`
- Windows: `%APPDATA%\pypoetry`
- macOS: `~/Library/Application Support/pypoetry`

You can override the config directory by setting the `POETRY_CONFIG_DIR` environment variable.

### Data Directory [#](#data-directory)

- Linux: `$XDG_DATA_HOME/pypoetry` or `~/.local/share/pypoetry`
- Windows: `%APPDATA%\pypoetry`
- macOS: `~/Library/Application Support/pypoetry`

You can override the data directory by setting the `POETRY_DATA_DIR` or `POETRY_HOME` environment variables. If `POETRY_HOME` is set, it will be given higher priority.

### Cache Directory [#](#cache-directory)

- Linux: `$XDG_CACHE_HOME/pypoetry` or `~/.cache/pypoetry`
- Windows: `%LOCALAPPDATA%\pypoetry`
- macOS: `~/Library/Caches/pypoetry`

You can override the cache directory by setting the `POETRY_CACHE_DIR` environment variable.

## Available settings [#](#available-settings)

### `cache-dir` [#](#cache-dir)

**Type**: `string`

**Environment Variable**: `POETRY_CACHE_DIR`

The path to the cache directory used by Poetry.

Defaults to one of the following directories:

- macOS: `~/Library/Caches/pypoetry`
- Windows: `C:\Users\<username>\AppData\Local\pypoetry\Cache`
- Unix: `~/.cache/pypoetry`

### `data-dir` [#](#data-dir)

**Type**: `string`

**Environment Variable**: `POETRY_DATA_DIR`

The path to the data directory used by Poetry.

- Linux: `$XDG_DATA_HOME/pypoetry` or `~/.local/share/pypoetry`
- Windows: `%APPDATA%\pypoetry`
- macOS: `~/Library/Application Support/pypoetry`

You can override the data directory by setting the `POETRY_DATA_DIR` or `POETRY_HOME` environment variables. If `POETRY_HOME` is set, it will be given higher priority.

### `installer.max-workers` [#](#installermax-workers)

**Type**: `int`

**Default**: `number_of_cores + 4`

**Environment Variable**: `POETRY_INSTALLER_MAX_WORKERS`

*Introduced in 1.2.0*

Set the maximum number of workers while using the parallel installer. The `number_of_cores` is determined by `os.cpu_count()`. If this raises a `NotImplementedError` exception, `number_of_cores` is assumed to be 1.

If this configuration parameter is set to a value greater than `number_of_cores + 4`, the number of maximum workers is still limited at `number_of_cores + 4`.

Note

This configuration is ignored when `installer.parallel` is set to `false`.

### `installer.no-binary` [#](#installerno-binary)

**Type**: `string | boolean`

**Default**: `false`

**Environment Variable**: `POETRY_INSTALLER_NO_BINARY`

*Introduced in 1.2.0*

When set, this configuration allows users to disallow the use of binary distribution format for all, none or specific packages.

| Configuration          | Description                                                |
|------------------------|------------------------------------------------------------|
| `:all:` or `true`      | Disallow binary distributions for all packages.            |
| `:none:` or `false`    | Allow binary distributions for all packages.               |
| `package[,package,..]` | Disallow binary distributions for specified packages only. |

Note

As with all configurations described here, this is a user specific configuration. This means that this is not taken into consideration when a lockfile is generated or dependencies are resolved. This is applied only when selecting which distribution for dependency should be installed into a Poetry managed environment.

Note

For project specific usage, it is recommended that this be configured with the `--local`.

```bash
poetry config --local installer.no-binary :all:
```

Note

For CI or container environments using [environment variable](#using-environment-variables) to configure this might be useful.

```bash
export POETRY_INSTALLER_NO_BINARY=:all:
```

Warning

Unless this is required system-wide, if configured globally, you could encounter slower install times across all your projects if incorrectly set.

### `installer.only-binary` [#](#installeronly-binary)

**Type**: `string | boolean`

**Default**: `false`

**Environment Variable**: `POETRY_INSTALLER_ONLY_BINARY`

*Introduced in 2.0.0*

When set, this configuration allows users to enforce the use of binary distribution format for all, none or specific packages.

Note

Please refer to [`installer.no-binary`](/docs/configuration/#installerno-binary) for information on allowed values, usage instructions and warnings.

### `installer.parallel` [#](#installerparallel)

**Type**: `boolean`

**Default**: `true`

**Environment Variable**: `POETRY_INSTALLER_PARALLEL`

*Introduced in 1.1.4*

Use parallel execution when using the new (`>=1.1.0`) installer.

### `installer.build-config-settings.<package-name>` [#](#installerbuild-config-settingspackage-name)

**Type**: `Serialised JSON with string or list of string properties`

**Default**: `None`

**Environment Variable**: `POETRY_INSTALLER_BUILD_CONFIG_SETTINGS_<package-name>`

*Introduced in 2.1.0*

Warning

This is an **experimental** configuration and can be subject to changes in upcoming releases until it is considered stable.

Configure [PEP 517 config settings](https://peps.python.org/pep-0517/#config-settings) to be passed to a package’s build backend if it has to be built from a directory or vcs source; or a source distribution during installation.

This is only used when a compatible binary distribution (wheel) is not available for a package. This can be used along with [`installer.no-binary`](/docs/configuration/#installerno-binary) option to force a build with these configurations when a dependency of your project with the specified name is being installed.

Note

Poetry does not offer a similar option in the `pyproject.toml` file as these are, in majority of cases, not universal and vary depending on the target installation environment.

If you want to use a project specific configuration it is recommended that this configuration be set locally, in your project’s `poetry.toml` file.

```bash
poetry config --local installer.build-config-settings.grpcio \
  '{"CC": "gcc", "--global-option": ["--some-global-option"], "--build-option": ["--build-option1", "--build-option2"]}'
```

If you want to modify a single key, you can do, by setting the same key again.

```bash
poetry config --local installer.build-config-settings.grpcio \
  '{"CC": "g++"}'
```

### `requests.max-retries` [#](#requestsmax-retries)

**Type**: `int`

**Default**: `0`

**Environment Variable**: `POETRY_REQUESTS_MAX_RETRIES`

*Introduced in 1.9.0*

Set the maximum number of retries in an unstable network. This setting has no effect if the server does not support HTTP range requests.

### `installer.re-resolve` [#](#installerre-resolve)

**Type**: `boolean`

**Default**: `true`

**Environment Variable**: `POETRY_INSTALLER_RE_RESOLVE`

*Introduced in 2.0.0*

If the config option is *not* set and the lock file is at least version 2.1 (created by Poetry 2.0 or above), the installer will not re-resolve dependencies but evaluate the locked markers to decide which of the locked dependencies have to be installed into the target environment.

### `python.installation-dir` [#](#pythoninstallation-dir)

**Type**: `string`

**Default**: `{data-dir}/python`

**Environment Variable**: `POETRY_PYTHON_INSTALLATION_DIR`

*Introduced in 2.1.0*

The directory in which Poetry managed Python versions are installed to.

### `solver.lazy-wheel` [#](#solverlazy-wheel)

**Type**: `boolean`

**Default**: `true`

**Environment Variable**: `POETRY_SOLVER_LAZY_WHEEL`

*Introduced in 1.8.0*

Do not download entire wheels to extract metadata but use [HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) to only download the METADATA files of wheels. Especially with slow network connections this setting can speed up dependency resolution significantly. If the cache has already been filled or the server does not support HTTP range requests, this setting makes no difference.

### `system-git-client` [#](#system-git-client)

**Type**: `boolean`

**Default**: `false`

**Environment Variable**: `POETRY_SYSTEM_GIT_CLIENT`

*Renamed to `system-git-client` in 2.0.0*

*Introduced in 1.2.0 as `experimental.system-git-client`*

Use system git client backend for git related tasks.

Poetry uses `dulwich` by default for git related tasks to not rely on the availability of a git client.

If you encounter any problems with it, set to `true` to use the system git backend.

### `virtualenvs.create` [#](#virtualenvscreate)

**Type**: `boolean`

**Default**: `true`

**Environment Variable**: `POETRY_VIRTUALENVS_CREATE`

Create a new virtual environment if one doesn’t already exist.

If set to `false`, Poetry will not create a new virtual environment. If it detects an already enabled virtual environment or an existing one in `{cache-dir}/virtualenvs` or `{project-dir}/.venv` it will install dependencies into them, otherwise it will install dependencies into the systems python environment.

Note

If Poetry detects it’s running within an activated virtual environment, it will never create a new virtual environment, regardless of the value set for `virtualenvs.create`.

Note

Be aware that installing dependencies into the system environment likely upgrade or uninstall existing packages and thus break other applications. Installing additional Python packages after installing the project might break the Poetry project in return.

This is why it is recommended to always create a virtual environment. This is also true in Docker containers, as they might contain additional Python packages as well.

### `virtualenvs.in-project` [#](#virtualenvsin-project)

**Type**: `boolean`

**Default**: `None`

**Environment Variable**: `POETRY_VIRTUALENVS_IN_PROJECT`

Create the virtualenv inside the project’s root directory.

If not set explicitly, `poetry` by default will create a virtual environment under `{cache-dir}/virtualenvs` or use the `{project-dir}/.venv` directory if one already exists.

If set to `true`, the virtualenv will be created and expected in a folder named `.venv` within the root directory of the project.

Note

If a virtual environment has already been created for the project under `{cache-dir}/virtualenvs`, setting this variable to `true` will not cause `poetry` to create or use a local virtual environment.

In order for this setting to take effect for a project already in that state, you must delete the virtual environment folder located in `{cache-dir}/virtualenvs`.

You can find out where the current project’s virtual environment (if there is one) is stored with the command `poetry env info --path`.

If set to `false`, `poetry` will ignore any existing `.venv` directory.

### `virtualenvs.options.always-copy` [#](#virtualenvsoptionsalways-copy)

**Type**: `boolean`

**Default**: `false`

**Environment Variable**: `POETRY_VIRTUALENVS_OPTIONS_ALWAYS_COPY`

*Introduced in 1.2.0*

If set to `true` the `--always-copy` parameter is passed to `virtualenv` on creation of the virtual environment, so that all needed files are copied into it instead of symlinked.

### `virtualenvs.options.no-pip` [#](#virtualenvsoptionsno-pip)

**Type**: `boolean`

**Default**: `false`

**Environment Variable**: `POETRY_VIRTUALENVS_OPTIONS_NO_PIP`

*Introduced in 1.2.0*

If set to `true` the `--no-pip` parameter is passed to `virtualenv` on creation of the virtual environment. This means when a new virtual environment is created, `pip` will not be installed in the environment.

Note

Poetry, for its internal operations, uses the `pip` wheel embedded in the `virtualenv` package installed as a dependency in Poetry’s runtime environment. If a user runs `poetry run pip` when this option is set to `true`, the `pip` the embedded instance of `pip` is used.

You can safely set this to `true`, if you desire a virtual environment with no additional packages. This is desirable for production environments.

### `virtualenvs.options.system-site-packages` [#](#virtualenvsoptionssystem-site-packages)

**Type**: `boolean`

**Default**: `false`

**Environment Variable**: `POETRY_VIRTUALENVS_OPTIONS_SYSTEM_SITE_PACKAGES`

Give the virtual environment access to the system site-packages directory. Applies on virtualenv creation.

### `virtualenvs.path` [#](#virtualenvspath)

**Type**: `string`

**Default**: `{cache-dir}/virtualenvs`

**Environment Variable**: `POETRY_VIRTUALENVS_PATH`

Directory where virtual environments will be created.

Note

This setting controls the global virtual environment storage path. It most likely will not be useful at the local level. To store virtual environments in the project root, see `virtualenvs.in-project`.

### `virtualenvs.prompt` [#](#virtualenvsprompt)

**Type**: `string`

**Default**: `{project_name}-py{python_version}`

**Environment Variable**: `POETRY_VIRTUALENVS_PROMPT`

*Introduced in 1.2.0*

Format string defining the prompt to be displayed when the virtual environment is activated. The variables `project_name` and `python_version` are available for formatting.

### `virtualenvs.use-poetry-python` [#](#virtualenvsuse-poetry-python)

**Type**: `boolean`

**Default**: `false`

**Environment Variable**: `POETRY_VIRTUALENVS_USE_POETRY_PYTHON`

*Introduced in 2.0.0*

By default, Poetry will use the activated Python version to create a new virtual environment. If set to `true`, the Python version used during Poetry installation is used.

### `repositories.<name>.url` [#](#repositoriesnameurl)

**Type**: `string`

**Environment Variable**: `POETRY_REPOSITORIES_<NAME>_URL`

Set the repository URL for `<name>`.

See [Publishable Repositories](/docs/repositories/#publishable-repositories) for more information.

### `http-basic.<name>.[username|password]` [#](#http-basicnameusernamepassword)

**Type**: `string`

**Environment Variables**: `POETRY_HTTP_BASIC_<NAME>_USERNAME`, `POETRY_HTTP_BASIC_<NAME>_PASSWORD`

Set repository credentials (`username` and `password`) for `<name>`. See [Repositories - Configuring credentials](/docs/repositories/#configuring-credentials) for more information.

### `pypi-token.<name>` [#](#pypi-tokenname)

**Type**: `string`

**Environment Variable**: `POETRY_PYPI_TOKEN_<NAME>`

Set repository credentials (using an API token) for `<name>`. See [Repositories - Configuring credentials](/docs/repositories/#configuring-credentials) for more information.

### `certificates.<name>.cert` [#](#certificatesnamecert)

**Type**: `string | boolean`

**Environment Variable**: `POETRY_CERTIFICATES_<NAME>_CERT`

Set custom certificate authority for repository `<name>`. See [Repositories - Configuring credentials - Custom certificate authority](/docs/repositories/#custom-certificate-authority-and-mutual-tls-authentication) for more information.

This configuration can be set to `false`, if TLS certificate verification should be skipped for this repository.

### `certificates.<name>.client-cert` [#](#certificatesnameclient-cert)

**Type**: `string`

**Environment Variable**: `POETRY_CERTIFICATES_<NAME>_CLIENT_CERT`

Set client certificate for repository `<name>`. See [Repositories - Configuring credentials - Custom certificate authority](/docs/repositories/#custom-certificate-authority-and-mutual-tls-authentication) for more information.

### `keyring.enabled` [#](#keyringenabled)

**Type**: `boolean`

**Default**: `true`

**Environment Variable**: `POETRY_KEYRING_ENABLED`

Enable the system keyring for storing credentials. See [Repositories - Configuring credentials](/docs/repositories/#configuring-credentials) for more information.

## Footer

![Poetry](/images/logo-origami.svg)

Python packaging and dependency management made easy.

[GitHub](https://github.com/python-poetry) [Discord](https://discord.com/invite/awxPgve)

### Documentation

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

### Github

- [Project](https://github.com/python-poetry/poetry)
- [Issues](https://github.com/python-poetry/poetry/issues)
- [Discussions](https://github.com/python-poetry/poetry/discussions)

### Other Projects

- [poetry-core](https://github.com/python-poetry/poetry-core)
- [install.python-poetry.org](https://github.com/python-poetry/install.python-poetry.org)
- [Bundle plugin](https://github.com/python-poetry/poetry-plugin-bundle)
- [Export plugin](https://github.com/python-poetry/poetry-plugin-export)

Copyright © 2018-2025. All Rights Reserved. Powered by[Go to the Vercel website](https://vercel.com?utm_source=python-poetry&utm_campaign=oss "Go to the Vercel website")[Home ![Poetry logo](/images/logo-origami.svg)](/)

2.1

- [main](/docs/main/)
- [2.1](/docs/)
- [1.8](/docs/1.8/)

Use dark mode

Open menu

- [Documentation](/docs/)
  
  [Introduction  
  \
  Poetry is a tool for dependency management and packaging in Python.](/docs/)
  
  [Basic usage  
  \
  For the basic usage introduction we will be installing pendulum, a datetime library.](/docs/basic-usage/)
  
  [Managing dependencies  
  \
  Poetry supports specifying main dependencies in the project.dependencies section of your pyproject.toml according to PEP 621.](/docs/managing-dependencies/)
  
  [Libraries  
  \
  This chapter will tell you how to make your library installable through Poetry. Versioning Poetry requires PEP 440-compliant versions for all projects. While Poetry does not enforce any release convention, it used to encourage the use of semantic versioning within the scope of PEP 440 and supports version constraints that are especially suitable for semver. Note As an example, 1.0.0-hotfix.1 is not compatible with PEP 440.](/docs/libraries/)
  
  [Commands  
  \
  You’ve already learned how to use the command-line interface to do some things.](/docs/cli/)
  
  [Configuration  
  \
  Poetry can be configured via the config command (see more about its usage here) or directly in the config.toml file that will be automatically created when you first run that command.](/docs/configuration/)
  
  [Repositories  
  \
  Poetry supports the use of PyPI and private repositories for discovery of packages as well as for publishing your projects. By default, Poetry is configured to use the PyPI repository, for package installation and publishing. So, when you add dependencies to your project, Poetry will assume they are available on PyPI. This represents most cases and will likely be enough for most users. Private Repository Example Installing from private package sources By default, Poetry discovers and installs packages from PyPI.](/docs/repositories/)
  
  [Managing environments  
  \
  Poetry makes project environment isolation one of its core features. What this means is that it will always work isolated from your global Python installation.](/docs/managing-environments/)
  
  [Dependency specification  
  \
  Dependencies for a project can be specified in various forms, which depend on the type of the dependency and on the optional constraints that might be needed for it to be installed. project.dependencies and tool.poetry.dependencies Prior Poetry 2.0, dependencies had to be declared in the tool.poetry.dependencies section of the pyproject.toml file. \[tool.poetry.dependencies\] requests = "^2.13.0" With Poetry 2.0, you should consider using the project.dependencies section instead. \[project\] # ...](/docs/dependency-specification/)
  
  [Plugins  
  \
  Poetry supports using and building plugins if you wish to alter or expand Poetry’s functionality with your own. For example if your environment poses special requirements on the behaviour of Poetry which do not apply to the majority of its users or if you wish to accomplish something with Poetry in a way that is not desired by most users. In these cases you could consider creating a plugin to handle your specific logic. .](/docs/plugins/)
  
  [The pyproject.toml file  
  \
  In package mode, the only required fields are name and version (either in the project section or in the tool.poetry section).](/docs/pyproject/)
  
  [Contributing to Poetry  
  \
  First off, thanks for taking the time to contribute! The following is a set of guidelines for contributing to Poetry on GitHub.](/docs/contributing/)
  
  [Community  
  \
  Badge For any projects using Poetry, you may add its official badge somewhere prominent like the README. Markdown \[!\[Poetry\](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)\](https://python-poetry.org/) reStructuredText ..](/docs/community/)
  
  [FAQ  
  \
  Why is the dependency resolution process slow? While the dependency resolver at the heart of Poetry is highly optimized and should be fast enough for most cases, with certain sets of dependencies it can take time to find a valid solution. This is due to the fact that not all libraries on PyPI have properly declared their metadata and, as such, they are not available via the PyPI JSON API.](/docs/faq/)
  
  [pre-commit hooks  
  \
  pre-commit is a framework for building and running git hooks.](/docs/pre-commit-hooks/)
  
  [Building extension modules  
  \
  Building Extension Modules Warning While this feature has been around since almost the beginning of the Poetry project and has needed minimal changes, it is still considered unstable.](/docs/building-extension-modules/)
  
  [2.1 Stable Documentation for the latest, **stable**, branch.](/docs/) [main Development Documentation for the latest, **in-development**, branch.](/docs/main/)
- [Blog](/blog/)
- [History](/history/)
- [Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

![Poetry](/images/logo-origami.svg)

Close menu

[Documentation](/docs/) [Blog](/blog/) [History](/history/)[Go to the Github project](https://github.com/python-poetry/poetry "Go to the Github project")

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
  
  - [Dependency groups](#dependency-groups)
    
    - [Optional groups](#optional-groups)
    - [Adding a dependency to a group](#adding-a-dependency-to-a-group)
    - [Installing group dependencies](#installing-group-dependencies)
    - [Removing dependencies from a group](#removing-dependencies-from-a-group)
  - [Synchronizing dependencies](#synchronizing-dependencies)
  - [Layering optional groups](#layering-optional-groups)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

Managing dependencies

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

# Managing dependencies

- [Dependency groups](#dependency-groups)
  
  - [Optional groups](#optional-groups)
  - [Adding a dependency to a group](#adding-a-dependency-to-a-group)
  - [Installing group dependencies](#installing-group-dependencies)
  - [Removing dependencies from a group](#removing-dependencies-from-a-group)
- [Synchronizing dependencies](#synchronizing-dependencies)
- [Layering optional groups](#layering-optional-groups)

# Managing dependencies [#](#managing-dependencies)

Poetry supports specifying main dependencies in the [`project.dependencies`](/docs/pyproject/#dependencies) section of your `pyproject.toml` according to PEP 621. For legacy reasons and to define additional information that are only used by Poetry the [`tool.poetry.dependencies`](/docs/pyproject/#dependencies-and-dependency-groups) sections can be used.

See [Dependency specification](/docs/dependency-specification/) for more information.

## Dependency groups [#](#dependency-groups)

Poetry provides a way to **organize** your dependencies by **groups**.

The dependencies declared in `project.dependencies` respectively `tool.poetry.dependencies` are part of an implicit `main` group. Those dependencies are required by your project during runtime.

Beside the `main` dependencies, you might have dependencies that are only needed to test your project or to build the documentation.

To declare a new dependency group, use a `tool.poetry.group.<group>` section where `<group>` is the name of your dependency group (for instance, `test`):

```toml
[tool.poetry.group.test.dependencies]
pytest = "^6.0.0"
pytest-mock = "*"
```

Note

All dependencies **must be compatible with each other** across groups since they will be resolved regardless of whether they are required for installation or not (see [Installing group dependencies](#installing-group-dependencies)).

Think of dependency groups as **labels** associated with your dependencies: they don’t have any bearings on whether their dependencies will be resolved and installed **by default**, they are simply a way to organize the dependencies logically.

Note

Dependency groups, other than the implicit `main` group, must only contain dependencies you need in your development process. Installing them is only possible by using Poetry.

To declare a set of dependencies, which add additional functionality to the project during runtime, use [extras](/docs/pyproject/#extras) instead. Extras can be installed by the end user using `pip`.

### Optional groups [#](#optional-groups)

A dependency group can be declared as optional. This makes sense when you have a group of dependencies that are only required in a particular environment or for a specific purpose.

```toml
[tool.poetry.group.docs]
optional = true

[tool.poetry.group.docs.dependencies]
mkdocs = "*"
```

Optional groups can be installed in addition to the **default** dependencies by using the `--with` option of the [`install`](/docs/cli/#install) command.

```bash
poetry install --with docs
```

Warning

Optional group dependencies will **still** be resolved alongside other dependencies, so special care should be taken to ensure they are compatible with each other.

### Adding a dependency to a group [#](#adding-a-dependency-to-a-group)

The [`add`](/docs/cli/#add) command is the preferred way to add dependencies to a group. This is done by using the `--group (-G)` option.

```bash
poetry add pytest --group test
```

If the group does not already exist, it will be created automatically.

### Installing group dependencies [#](#installing-group-dependencies)

**By default**, dependencies across **all non-optional groups** will be installed when executing `poetry install`.

Note

The default set of dependencies for a project includes the implicit `main` group as well as all groups that are not explicitly marked as an [optional group](#optional-groups).

You can **exclude** one or more groups with the `--without` option:

```bash
poetry install --without test,docs
```

You can also opt in [optional groups](#optional-groups) by using the `--with` option:

```bash
poetry install --with docs
```

Warning

When used together, `--without` takes precedence over `--with`. For example, the following command will only install the dependencies specified in the optional `test` group.

```bash
poetry install --with test,docs --without docs
```

Finally, in some case you might want to install **only specific groups** of dependencies without installing the default set of dependencies. For that purpose, you can use the `--only` option.

```bash
poetry install --only docs
```

Note

If you only want to install the project’s runtime dependencies, you can do so with the `--only main` notation:

```bash
poetry install --only main
```

Note

If you want to install the project root, and no other dependencies, you can use the `--only-root` option.

```bash
poetry install --only-root
```

### Removing dependencies from a group [#](#removing-dependencies-from-a-group)

The [`remove`](/docs/cli/#remove) command supports a `--group` option to remove packages from a specific group:

```bash
poetry remove mkdocs --group docs
```

## Synchronizing dependencies [#](#synchronizing-dependencies)

Poetry supports what’s called dependency synchronization. Dependency synchronization ensures that the locked dependencies in the `poetry.lock` file are the only ones present in the environment, removing anything that’s not necessary.

This is done by using the `sync` command:

```bash
poetry sync
```

The `sync` command can be combined with any [dependency groups](#dependency-groups) related options to synchronize the environment with specific groups. Note that extras are separate. Any extras not selected for install are always removed.

```bash
poetry sync --without dev
poetry sync --with docs
poetry sync --only dev
```

## Layering optional groups [#](#layering-optional-groups)

When you using `install` command without the `--sync` option, you can install any subset of optional groups without removing those that are already installed. This is very useful, for example, in multi-stage Docker builds, where you run `poetry install` multiple times in different build stages.

## Footer

![Poetry](/images/logo-origami.svg)

Python packaging and dependency management made easy.

[GitHub](https://github.com/python-poetry) [Discord](https://discord.com/invite/awxPgve)

### Documentation

- [Introduction](/docs/)
- [Basic usage](/docs/basic-usage/)
- [Managing dependencies](/docs/managing-dependencies/)
- [Libraries](/docs/libraries/)
- [Commands](/docs/cli/)
- [Configuration](/docs/configuration/)
- [Repositories](/docs/repositories/)
- [Managing environments](/docs/managing-environments/)
- [Dependency specification](/docs/dependency-specification/)
- [Plugins](/docs/plugins/)
- [The pyproject.toml file](/docs/pyproject/)
- [Contributing to Poetry](/docs/contributing/)
- [Community](/docs/community/)
- [FAQ](/docs/faq/)
- [pre-commit hooks](/docs/pre-commit-hooks/)
- [Building extension modules](/docs/building-extension-modules/)

### Github

- [Project](https://github.com/python-poetry/poetry)
- [Issues](https://github.com/python-poetry/poetry/issues)
- [Discussions](https://github.com/python-poetry/poetry/discussions)

### Other Projects

- [poetry-core](https://github.com/python-poetry/poetry-core)
- [install.python-poetry.org](https://github.com/python-poetry/install.python-poetry.org)
- [Bundle plugin](https://github.com/python-poetry/poetry-plugin-bundle)
- [Export plugin](https://github.com/python-poetry/poetry-plugin-export)

Copyright © 2018-2025. All Rights Reserved. Powered by[Go to the Vercel website](https://vercel.com?utm_source=python-poetry&utm_campaign=oss "Go to the Vercel website")