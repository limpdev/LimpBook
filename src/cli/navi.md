# navi

```sh
Usage: navi [OPTIONS] [COMMAND]

Commands:
  fn      [Experimental] Calls internal functions
  repo    Manages cheatsheet repositories
  widget  Outputs shell widget source code
  info    Shows info
  help    Print this message or the help of the given subcommand(s)

Options:
  -p, --path <PATH>
          Colon-separated list of paths containing .cheat files
      --print
          Instead of executing a snippet, prints it to stdout
      --best-match
          Returns the best match
      --prevent-interpolation
          Prevents variable interpolation
      --tldr <TLDR>
          Searches for cheatsheets using the tldr-pages repository
      --tag-rules <TAG_RULES>
          [Experimental] Comma-separated list that acts as filter for tags. Parts starting with ! represent negation
      --cheatsh <CHEATSH>
          Searches for cheatsheets using the cheat.sh repository
  -q, --query <QUERY>
          Prepopulates the search field
      --fzf-overrides <FZF_OVERRIDES>
          Finder overrides for snippet selection
      --fzf-overrides-var <FZF_OVERRIDES_VAR>
          Finder overrides for variable selection
      --finder <FINDER>
          Finder application to use [possible values: fzf, skim]
  -h, --help
          Print help
  -V, --version
          Print version

MORE INFO:
    Please refer to https://github.com/denisidoro/navi

ENVIRONMENT VARIABLES:
    NAVI_CONFIG            # path to config file
    NAVI_CONFIG_YAML       # config file content

FEATURE STABILITY:
    experimental           # may be removed or changed at any time
    deprecated             # may be removed in 3 months after first being deprecated

COMMON NAVI COMMANDS:
    Run navi fn welcome to browse the cheatsheet for navi itself

EXAMPLES:
    navi                                         # default behavior
    navi fn welcome                              # show cheatsheets for navi itself
    navi --print                                 # doesn't execute the snippet
    navi --tldr docker                           # search for docker cheatsheets using tldr
    navi --cheatsh docker                        # search for docker cheatsheets using cheatsh
    navi --path '/some/dir:/other/dir'           # use .cheat files from custom paths
    navi --query git                             # filter results by "git"
    navi --query 'create db' --best-match        # autoselect the snippet that best matches a query
    db=my navi --query 'create db' --best-match  # same, but set the value for the <name> variable
    navi repo add denisidoro/cheats              # import cheats from a git repository
    eval "$(navi widget zsh)"                    # load the zsh widget
    navi --finder 'skim'                         # set skim as finder, instead of fzf
    navi --fzf-overrides '--with-nth 1,2'        # show only the comment and tag columns
    navi --fzf-overrides '--no-select-1'         # prevent autoselection in case of single line
    navi --fzf-overrides-var '--no-select-1'     # same, but for variable selection
    navi --fzf-overrides '--nth 1,2'             # only consider the first two columns for search
    navi --fzf-overrides '--no-exact'            # use looser search algorithm
    navi --tag-rules='git,!checkout'             # show non-checkout git snippets only
```
