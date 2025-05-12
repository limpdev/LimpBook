# gallery-dl

*gallery-dl* is a command-line program to download image galleries and collections from several image hosting sites (see [Supported Sites](docs/supportedsites.md). It is a cross-platform tool with many [configuration options](https://gdl-org.github.io/docs/configuration.html) and powerful [filenaming capabilities](https://gdl-org.github.io/docs/formatting.html).

### Dependencies

- Python 3.4+
- Requests

## Optional

- yt-dlp_ or youtube-dl_: HLS/DASH video downloads, ``ytdl`` integration
- FFmpeg_: Pixiv Ugoira conversion
- mkvmerge_: Accurate Ugoira frame timecodes
- PySocks_: SOCKS proxy support
- brotli_ or brotlicffi_: Brotli compression support
- zstandard_: Zstandard compression support
- PyYAML_: YAML configuration file support
- toml_: TOML configuration file support for Python<3.11
- SecretStorage_: GNOME keyring passwords for ``--cookies-from-browser``
- Psycopg_: PostgreSQL archive support


## Installation

### Pip

The stable releases of *gallery-dl* are distributed on PyPI_ and can be
easily installed or upgraded using pip_:

```bash
    python3 -m pip install -U gallery-dl
```

Installing the latest dev version directly from GitHub can be done with
pip_ as well:

```bash
    python3 -m pip install -U --force-reinstall --no-deps https://github.com/mikf/gallery-dl/archive/master.tar.gz
```

Omit :code:`--no-deps` if Requests_ hasn't been installed yet.

Note: Windows users should use :code:`py -3` instead of :code:`python3`.

It is advised to use the latest version of pip_,
including the essential packages :code:`setuptools` and :code:`wheel`.
To ensure these packages are up-to-date, run

```bash
    python3 -m pip install --upgrade pip setuptools wheel
```

Standalone Executable
---------------------

Prebuilt executable files with a Python interpreter and
required Python packages included are available for

- `Windows <https://github.com/mikf/gallery-dl/releases/download/v1.29.6/gallery-dl.exe>`__
  (Requires `Microsoft Visual C++ Redistributable Package (x86) <https://aka.ms/vs/17/release/vc_redist.x86.exe>`__)
- `Linux   <https://github.com/mikf/gallery-dl/releases/download/v1.29.6/gallery-dl.bin>`__


Nightly Builds
--------------

| Executables build from the latest commit can be found at
| https://github.com/gdl-org/builds/releases


Snap
----

Linux users that are using a distro that is supported by Snapd_ can install *gallery-dl* from the Snap Store:

```bash
    snap install gallery-dl
```

Chocolatey
----------

Windows users that have Chocolatey_ installed can install *gallery-dl* from the Chocolatey Community Packages repository:

```powershell
    choco install gallery-dl
```

Scoop
-----

*gallery-dl* is also available in the Scoop_ "main" bucket for Windows users:

.. code:: powershell

    scoop install gallery-dl

Homebrew
--------

For macOS or Linux users using Homebrew:

```bash
    brew install gallery-dl
```

MacPorts
--------

For macOS users with MacPorts:

```bash
    sudo port install gallery-dl
```

Docker
--------
Using the Dockerfile in the repository:

```bash
    git clone https://github.com/mikf/gallery-dl.git
    cd gallery-dl/
    docker build -t gallery-dl:latest .
```

Pulling image from `Docker Hub <https://hub.docker.com/r/mikf123/gallery-dl>`__:

```bash
    docker pull mikf123/gallery-dl
    docker tag mikf123/gallery-dl gallery-dl
```

Pulling image from `GitHub Container Registry <https://github.com/mikf/gallery-dl/pkgs/container/gallery-dl>`__:

```bash
    docker pull ghcr.io/mikf/gallery-dl
    docker tag ghcr.io/mikf/gallery-dl gallery-dl
```

To run the container you will probably want to attach some directories on the host so that the config file and downloads can persist across runs.

Make sure to either download the example config file reference in the repo and place it in the mounted volume location or touch an empty file there.

If you gave the container a different tag or are using podman then make sure you adjust.  Run ``docker image ls`` to check the name if you are not sure.

This will remove the container after every use so you will always have a fresh environment for it to run. If you setup a ci-cd pipeline to autobuild the container you can also add a ``--pull=newer`` flag so that when you run it docker will check to see if there is a newer container and download it before running.

```bash
    docker run --rm  -v $HOME/Downloads/:/gallery-dl/ -v $HOME/.config/gallery-dl/gallery-dl.conf:/etc/gallery-dl.conf -it gallery-dl:latest
```

You can also add an alias to your shell for "gallery-dl" or create a simple bash script and drop it somewhere in your $PATH to act as a shim for this command.

## Usage


To use *gallery-dl* simply call it with the URLs you wish to download images
from:

```bash
    gallery-dl [OPTIONS]... URLS...
```

Use :code:`gallery-dl --help` or see `<docs/options.md>`__
for a full list of all command-line options.


Examples
--------

Download images; in this case from danbooru via tag search for 'bonocho':

```bash
    gallery-dl "https://danbooru.donmai.us/posts?tags=bonocho"
```

Get the direct URL of an image from a site supporting authentication with username & password:

```bash
    gallery-dl -g -u "<username>" -p "<password>" "https://twitter.com/i/web/status/604341487988576256"
```

Filter manga chapters by chapter number and language:

```bash
    gallery-dl --chapter-filter "10 <= chapter < 20" -o "lang=fr" "https://mangadex.org/title/59793dd0-a2d8-41a2-9758-8197287a8539"
```

| Search a remote resource for URLs and download images from them:
| (URLs for which no extractor can be found will be silently ignored)

```bash
    gallery-dl "r:https://pastebin.com/raw/FLwrCYsT"
```

If a site's address is nonstandard for its extractor, you can prefix the URL with the
extractor's name to force the use of a specific extractor:

```bash
    gallery-dl "tumblr:https://sometumblrblog.example"
```

## Configuration

Configuration files for *gallery-dl* use a JSON-based file format.


## Documentation

A list of all available configuration options and their descriptions
can be found at `<https://gdl-org.github.io/docs/configuration.html>`__.

| For a default configuration file with available options set to their
  default values, see `<docs/gallery-dl.conf>`__.

| For a commented example with more involved settings and option usage,
  see `<docs/gallery-dl-example.conf>`__.


## Locations

*gallery-dl* searches for configuration files in the following places:

Windows:
    * ``%APPDATA%\gallery-dl\config.json``
    * ``%USERPROFILE%\gallery-dl\config.json``
    * ``%USERPROFILE%\gallery-dl.conf``

    (``%USERPROFILE%`` usually refers to a user's home directory,
    i.e. ``C:\Users\<username>\``)

Linux, macOS, etc.:
    * ``/etc/gallery-dl.conf``
    * ``${XDG_CONFIG_HOME}/gallery-dl/config.json``
    * ``${HOME}/.config/gallery-dl/config.json``
    * ``${HOME}/.gallery-dl.conf``

When run as `executable <Standalone Executable_>`__,
*gallery-dl* will also look for a `gallery-dl.conf` file
in the same directory as said executable.

It is possible to use more than one configuration file at a time.
In this case, any values from files after the first will get merged
into the already loaded settings and potentially override previous ones.

## Authentication

### Username & Password

Some extractors require you to provide valid login credentials in the form of
a username & password pair. This is necessary for
`nijie`
and optional for
`aryion`,
`danbooru`,
`e621`,
`exhentai`,
`idolcomplex`,
`imgbb`,
`inkbunny`,
`mangadex`,
`mangoxo`,
`pillowfort`,
`sankaku`,
`subscribestar`,
`tapas`,
`tsumino`,
`twitter`,
and `zerochan`.

You can set the necessary information in your
`configuration file <Configuration_>`__

.. code:: json

    {
        "extractor": {
            "twitter": {
                "username": "<username>",
                "password": "<password>"
            }
        }
    }

Or you can provide them directly via the `-u/--username` and `-p/--password` or via the `-o/--option` command-line options

```bash
    gallery-dl -u "<username>" -p "<password>" "URL"
    gallery-dl -o "username=<username>" -o "password=<password>" "URL"
```

Cookies
-------

For sites where login with username & password is not possible due to
CAPTCHA or similar, or has not been implemented yet, you can use the
cookies from a browser login session and input them into *gallery-dl*.

This can be done via the
`cookies <https://gdl-org.github.io/docs/configuration.html#extractor-cookies>`__
option in your configuration file by specifying

- | the path to a Mozilla/Netscape format cookies.txt file exported by a browser addon
  | (e.g. Get cookies.txt [LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) for Chrome,
  [Export Cookies](https://addons.mozilla.org/en-US/firefox/addon/export-cookies-txt) for Firefox)

- | a list of name-value pairs gathered from your browser's web developer tools
  | (in `Chrome <https://developers.google.com/web/tools/chrome-devtools/storage/cookies>`__,
     in `Firefox <https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector>`__)

- | the name of a browser to extract cookies from
  | (supported browsers are Chromium-based ones, Firefox, and Safari)

For example:

```json

    {
        "extractor": {
            "instagram": {
                "cookies": "$HOME/path/to/cookies.txt"
            },
            "patreon": {
                "cookies": {
                    "session_id": "K1T57EKu19TR49C51CDjOJoXNQLF7VbdVOiBrC9ye0a"
                }
            },
            "twitter": {
                "cookies": ["firefox"]
            }
        }
    }
```

| You can also specify a cookies.txt file with
  the :code:`--cookies` command-line option
| or a browser to extract cookies from with :code:`--cookies-from-browser`:

```bash
    gallery-dl --cookies "$HOME/path/to/cookies.txt" "URL"
    gallery-dl --cookies-from-browser firefox "URL"
```

OAuth
-----

*gallery-dl* supports user authentication via OAuth_ for some extractors.
This is necessary for
`pixiv`
and optional for
`deviantart`,
`flickr`,
`reddit`,
`smugmug`,
`tumblr`,
and `mastodon` instances.

Linking your account to *gallery-dl* grants it the ability to issue requests
on your account's behalf and enables it to access resources which would
otherwise be unavailable to a public user.

To do so, start by invoking it with ``oauth:<sitename>`` as an argument.
For example:

```bash
    gallery-dl oauth:flickr
```

You will be sent to the site's authorization page and asked to grant read
access to *gallery-dl*. Authorize it and you will be shown one or more
"tokens", which should be added to your configuration file.

To authenticate with a ``mastodon`` instance, run *gallery-dl* with
``oauth:mastodon:<instance>`` as argument. For example:

```bash
    gallery-dl oauth:mastodon:pawoo.net
    gallery-dl oauth:mastodon:https://mastodon.social/
```

---

## USAGE

<details><summary><code>gallery-dl.exe [OPTION]... URL...</code></summary>

## General Options:

```bash
  -h, --help                  Print this help message and exit
  --version                   Print program version and exit
  -f, --filename FORMAT       Filename format string for downloaded files
                              ('/O' for "original" filenames)
  -d, --destination PATH      Target location for file downloads
  -D, --directory PATH        Exact location for file downloads
  -X, --extractors PATH       Load external extractors from PATH
  --user-agent UA             User-Agent request header
  --clear-cache MODULE        Delete cached login sessions, cookies, etc. for
                              MODULE (ALL to delete everything)
```

## Update Options:

```bash
  -U, --update                Update to the latest version
  --update-to CHANNEL[@TAG]   Switch to a dfferent release channel (stable or
                              dev) or upgrade/downgrade to a specific version
  --update-check              Check if a newer version is available
```

## Input Options:

```bash
  -i, --input-file FILE       Download URLs found in FILE ('-' for stdin).
                              More than one --input-file can be specified
  -I, --input-file-comment FILE
                              Download URLs found in FILE. Comment them out
                              after they were downloaded successfully.
  -x, --input-file-delete FILE
                              Download URLs found in FILE. Delete them after
                              they were downloaded successfully.
  --no-input                  Do not prompt for passwords/tokens
```

## Output Options:

```bash
  -q, --quiet                 Activate quiet mode
  -w, --warning               Print only warnings and errors
  -v, --verbose               Print various debugging information
  -g, --get-urls              Print URLs instead of downloading
  -G, --resolve-urls          Print URLs instead of downloading; resolve
                              intermediary URLs
  -j, --dump-json             Print JSON information
  -J, --resolve-json          Print JSON information; resolve intermediary
                              URLs
  -s, --simulate              Simulate data extraction; do not download
                              anything
  -E, --extractor-info        Print extractor defaults and settings
  -K, --list-keywords         Print a list of available keywords and example
                              values for the given URLs
  -e, --error-file FILE       Add input URLs which returned an error to FILE
  -N, --print [EVENT:]FORMAT  Write FORMAT during EVENT (default 'prepare') to
                              standard output. Examples: 'id' or
                              'post:{md5[:8]}'
  --print-to-file [EVENT:]FORMAT FILE
                              Append FORMAT during EVENT to FILE
  --list-modules              Print a list of available extractor modules
  --list-extractors [CATEGORIES]
                              Print a list of extractor classes with
                              description, (sub)category and example URL
  --write-log FILE            Write logging output to FILE
  --write-unsupported FILE    Write URLs, which get emitted by other
                              extractors but cannot be handled, to FILE
  --write-pages               Write downloaded intermediary pages to files in
                              the current directory to debug problems
  --print-traffic             Display sent and read HTTP traffic
  --no-colors                 Do not emit ANSI color codes in output
```

## Networking Options:

```bash
  -R, --retries N             Maximum number of retries for failed HTTP
                              requests or -1 for infinite retries (default: 4)
  --http-timeout SECONDS      Timeout for HTTP connections (default: 30.0)
  --proxy URL                 Use the specified proxy
  --source-address IP         Client-side IP address to bind to
  -4, --force-ipv4            Make all connections via IPv4
  -6, --force-ipv6            Make all connections via IPv6
  --no-check-certificate      Disable HTTPS certificate validation
```

## Downloader Options:

```bash
  -r, --limit-rate RATE       Maximum download rate (e.g. 500k or 2.5M)
  --chunk-size SIZE           Size of in-memory data chunks (default: 32k)
  --sleep SECONDS             Number of seconds to wait before each download.
                              This can be either a constant value or a range
                              (e.g. 2.7 or 2.0-3.5)
  --sleep-request SECONDS     Number of seconds to wait between HTTP requests
                              during data extraction
  --sleep-extractor SECONDS   Number of seconds to wait before starting data
                              extraction for an input URL
  --no-part                   Do not use .part files
  --no-skip                   Do not skip downloads; overwrite existing files
  --no-mtime                  Do not set file modification times according to
                              Last-Modified HTTP response headers
  --no-download               Do not download any files
```

## Configuration Options:

```bash
  -o, --option KEY=VALUE      Additional options. Example: -o browser=firefox
  -c, --config FILE           Additional configuration files
  --config-yaml FILE          Additional configuration files in YAML format
  --config-toml FILE          Additional configuration files in TOML format
  --config-create             Create a basic configuration file
  --config-status             Show configuration file status
  --config-open               Open configuration file in external application
  --config-ignore             Do not read default configuration files
```

## Authentication Options:

```bash
  -u, --username USER         Username to login with
  -p, --password PASS         Password belonging to the given username
  --netrc                     Enable .netrc authentication data
```

## Cookie Options:

```bash
  -C, --cookies FILE          File to load additional cookies from
  --cookies-export FILE       Export session cookies to FILE
  --cookies-from-browser BROWSER[/DOMAIN][+KEYRING][:PROFILE][::CONTAINER]
                              Name of the browser to load cookies from, with
                              optional domain prefixed with '/', keyring name
                              prefixed with '+', profile prefixed with ':',
                              and container prefixed with '::' ('none' for no
                              container (default), 'all' for all containers)
```

## Selection Options:

```bash
  -A, --abort N               Stop current extractor run after N consecutive
                              file downloads were skipped
  -T, --terminate N           Stop current and parent extractor runs after N
                              consecutive file downloads were skipped
  --filesize-min SIZE         Do not download files smaller than SIZE (e.g.
                              500k or 2.5M)
  --filesize-max SIZE         Do not download files larger than SIZE (e.g.
                              500k or 2.5M)
  --download-archive FILE     Record all downloaded or skipped files in FILE
                              and skip downloading any file already in it
  --range RANGE               Index range(s) specifying which files to
                              download. These can be either a constant value,
                              range, or slice (e.g. '5', '8-20', or '1:24:3')
  --chapter-range RANGE       Like '--range', but applies to manga chapters
                              and other delegated URLs
  --filter EXPR               Python expression controlling which files to
                              download. Files for which the expression
                              evaluates to False are ignored. Available keys
                              are the filename-specific ones listed by '-K'.
                              Example: --filter "image_width >= 1000 and
                              rating in ('s', 'q')"
  --chapter-filter EXPR       Like '--filter', but applies to manga chapters
                              and other delegated URLs
```

## Post-processing Options:

```bash
  -P, --postprocessor NAME    Activate the specified post processor
  --no-postprocessors         Do not run any post processors
  -O, --postprocessor-option KEY=VALUE
                              Additional post processor options
  --write-metadata            Write metadata to separate JSON files
  --write-info-json           Write gallery metadata to a info.json file
  --write-tags                Write image tags to separate text files
  --zip                       Store downloaded files in a ZIP archive
  --cbz                       Store downloaded files in a CBZ archive
  --mtime NAME                Set file modification times according to
                              metadata selected by NAME. Examples: 'date' or
                              'status[date]'
  --rename FORMAT             Rename previously downloaded files from FORMAT
                              to the current filename format
  --rename-to FORMAT          Rename previously downloaded files from the
                              current filename format to FORMAT
  --ugoira FMT                Convert Pixiv Ugoira to FMT using FFmpeg.
                              Supported formats are 'webm', 'mp4', 'gif',
                              'vp8', 'vp9', 'vp9-lossless', 'copy', 'zip'.
  --exec CMD                  Execute CMD for each downloaded file. Supported
                              replacement fields are {} or {_path},
                              {_directory}, {_filename}. Example: --exec
                              "convert {} {}.png && rm {}"
  --exec-after CMD            Execute CMD after all files were downloaded.
                              Example: --exec-after "cd {_directory} &&
                              convert * ../doc.pdf"
```
</details>
