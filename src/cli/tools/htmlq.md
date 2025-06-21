#  USAGE | `htmlq`

> <em><u>Not</u> an HTTP enabled tool, use `cURL` or `monolith` to pull content from an online source.</em>

<details><summary>--help</summary>

```bash
htmlq 0.4.0
Michael Maclean <michael@mgdm.net>
Runs CSS selectors on HTML

INSTALL:
	cargo install htmlq
	scoop install htmlq
	brew install htmlq

USAGE:
    htmlq.exe [FLAGS] [OPTIONS] [--] [selector]...

FLAGS:
    -B, --detect-base          Try to detect the base URL from the <base> tag in the document. If not found, default to
                               the value of --base, if supplied
    -h, --help                 Prints help information
    -w, --ignore-whitespace    When printing text nodes, ignore those that consist entirely of whitespace
    -p, --pretty               Pretty-print the serialised output
    -t, --text                 Output only the contents of text nodes inside selected elements
    -V, --version              Prints version information

OPTIONS:
    -a, --attribute <attribute>         Only return this attribute (if present) from selected elements
    -b, --base <base>                   Use this URL as the base for links
    -f, --filename <FILE>               The input file. Defaults to stdin
    -o, --output <FILE>                 The output file. Defaults to stdout
    -r, --remove-nodes <SELECTOR>...    Remove nodes matching this expression before output. May be specified multiple
                                        times

ARGS:
    <selector>...    The CSS expression to select [default: html]
```

</details>

##### Filtering by `ID`

```bash
curl -s http://example.com/ | htmlq '#get-content'
```

##### Get Links On Page

```bash
curl -s https://www.rust-lang.org/ | htmlq --attribute href a
```

##### Get Visible Content

```bash
curl -s https://nixos.org/nixos/about.html | htmlq  --text .main
```

#### Filter-Out Content

In the following example, the first string is the _desired_ class node; while, the SVG is the node to be removed. This snippet assumes that `curl` is piping the content in via stdout, same as the previous examples.

```bash
htmlq '.whynix' --remove-nodes svg
```

> [!NOTE]
> `--pretty` doesn't include syntax highlighting, which honestly, `idgaf` → use `bat` if you need that.
