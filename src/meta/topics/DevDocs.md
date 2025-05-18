Adding a documentation may look like a daunting task but once you get the hang of it, it's actually quite simple. Don't hesitate to ask for help [in Discord](https://discord.gg/PRyKn3Vbay) if you ever get stuck.

**Note:** please read the [contributing guidelines](../.github/CONTRIBUTING.md) before submitting a new documentation.

1. Create a subclass of `Docs::UrlScraper` or `Docs::FileScraper` in the `lib/docs/scrapers/` directory. Its name should be the [PascalCase](http://api.rubyonrails.org/classes/String.html#method-i-camelize) equivalent of the filename (e.g. `my_doc` → `MyDoc`)
2. Add the appropriate class attributes and filter options (see the [Scraper Reference](./scraper-reference.md) page).
3. Check that the scraper is listed in `thor docs:list`.
4. Create filters specific to the scraper in the `lib/docs/filters/[my_doc]/` directory and add them to the class's [filter stacks](./scraper-reference.md#filter-stacks). You may create any number of filters but will need at least the following two:
   * A [`CleanHtml`](./filter-reference.md#cleanhtmlfilter) filter whose task is to clean the HTML markup (e.g. adding `id` attributes to headings) and remove everything superfluous and/or nonessential.
   * An [`Entries`](./filter-reference.md#entriesfilter) filter whose task is to determine the pages' metadata (the list of entries, each with a name, type and path).
   The [Filter Reference](./filter-reference.md) page has all the details about filters.
5. Using the `thor docs:page [my_doc] [path]` command, check that the scraper works properly. Files will appear in the `public/docs/[my_doc]/` directory (but not inside the app as the command doesn't touch the index). `path` in this case refers to either the remote path (if using `UrlScraper`) or the local path (if using `FileScraper`).
6. Generate the full documentation using the `thor docs:generate [my_doc] --force` command. Additionally, you can use the `--verbose` option to see which files are being created/updated/deleted (useful to see what changed since the last run), and the `--debug` option to see which URLs are being requested and added to the queue (useful to pin down which page adds unwanted URLs to the queue).
7. Start the server, open the app, enable the documentation, and see how everything plays out.
8. Tweak the scraper/filters and repeat 5) and 6) until the pages and metadata are ok.
9. To customize the pages' styling, create an SCSS file in the `assets/stylesheets/pages/` directory and import it in `application.css.scss`. Both the file and CSS class should be named `_[type]` where [type] is equal to the scraper's `type` attribute (documentations with the same type share the same custom CSS and JS). Setting the type to `simple` will apply the general styling rules in `assets/stylesheets/pages/_simple.scss`, which can be used for documentations where little to no CSS changes are needed.
10. To add syntax highlighting or execute custom JavaScript on the pages, create a file in the `assets/javascripts/views/pages/` directory (take a look at the other files to see how it works).
11. Add the documentation's icon in the `public/icons/docs/[my_doc]/` directory, in both 16x16 and 32x32-pixels formats. The icon spritesheet is automatically generated when you (re)start your local DevDocs instance.
12. Add the documentation's copyright details to `options[:attribution]`. This is the data shown in the table on the [about](https://devdocs.io/about) page, and is ordered alphabetically. Please see an existing scraper for the typesetting.
13. Ensure `thor updates:check [my_doc]` shows the correct latest version.

If the documentation includes more than a few hundreds pages and is available for download, try to scrape it locally (e.g. using `FileScraper`). It'll make the development process much faster and avoids putting too much load on the source site. (It's not a problem if your scraper is coupled to your local setup, just explain how it works in your pull request.)

Finally, try to document your scraper and filters' behavior as much as possible using comments (e.g. why some URLs are ignored, HTML markup removed, metadata that way, etc.). It'll make updating the documentation much easier.
# File Scraper Reference

This lists the docs that use `FileScraper` and instructions for building some of them.

If you open a PR to update one of these docs, please add/fix the instructions.

## Dart

Click the “API docs” link under the “Stable channel” header on
https://www.dartlang.org/tools/sdk/archive. Rename the expanded ZIP to `dart~2`
and put it in `docs/`

Or run the following commands in your terminal:

```sh
curl https://storage.googleapis.com/dart-archive/channels/stable/release/$RELEASE/api-docs/dartdocs-gen-api.zip > dartApi.zip; \
unzip dartApi.zip; mv gen-dartdocs docs/dart~$VERSION
```

## date-fns

```sh
git clone https://github.com/date-fns/date-fns docs/date_fns
cd docs/date_fns
git checkout v2.29.2
yarn install
node scripts/build/docs.js
ls tmp/docs.json
```

## Django

Go to https://docs.djangoproject.com/, select the version from the
bubble in the bottom-right corner, then download the HTML version from the sidebar.

```sh
mkdir --parent docs/django\~$VERSION/; \
curl https://media.djangoproject.com/docs/django-docs-$VERSION-en.zip | \
bsdtar --extract --file - --directory=docs/django\~$VERSION/
```

## Elisp

Go to https://www.gnu.org/software/emacs/manual/elisp.html, download the HTML tarball and extract its content in `docs/elisp` or run the following command:

```sh
mkdir docs/elisp \
&& curl curl https://www.gnu.org/software/emacs/manual/elisp.html_node.tar.gz | \
tar --extract --gzip --strip-components=1 --directory=docs/elisp
```

## Erlang

Go to https://www.erlang.org/downloads and download the HTML documentation file.

```ah
mkdir --parent docs/erlang\~$VERSION/; \
curl -L https://github.com/erlang/otp/releases/download/OTP-$RELEASE/otp_doc_html_$RELEASE.tar.gz | \
bsdtar --extract --file - --directory=docs/erlang\~$VERSION/
```

## Gnu

### Bash
Go to https://www.gnu.org/software/bash/manual/, download the HTML tar file (with one web page per node) and extract its content in `docs/bash` or run the following command:

```sh
mkdir docs/bash \
&& curl https://www.gnu.org/software/bash/manual/bash.html_node.tar.gz | \
tar --extract --gzip --directory=docs/bash
```

### GCC
Go to https://gcc.gnu.org/onlinedocs/ and download the HTML tarball of GCC Manual and GCC CPP manual or run the following commands to download the tarballs:

```sh
# GCC manual
mkdir docs/gcc~${VERSION}; \
curl https://gcc.gnu.org/onlinedocs/gcc-$RELEASE/gcc-html.tar.gz | \
tar --extract --gzip --strip-components=1 --directory=docs/gcc~${VERSION}

# GCC CPP manual
mkdir docs/gcc~${VERSION}_cpp; \
curl https://gcc.gnu.org/onlinedocs/gcc-$RELEASE/cpp-html.tar.gz | \
tar --extract --gzip --strip-components=1 --directory=docs/gcc~${VERSION}_cpp
```

### GNU Fortran
Go to https://gcc.gnu.org/onlinedocs/ and download the HTML tarball of Fortran manual or run the following commands to download the tarball:

```sh
mkdir docs/gnu_fortran~$VERSION; \
curl https://gcc.gnu.org/onlinedocs/gcc-$RELEASE/gfortran-html.tar.gz | \
tar --extract --gzip --strip-components=1 --directory=docs/gnu_fortran~$VERSION
```

## GNU Make
Go to https://www.gnu.org/software/make/manual/, download the HTML tarball and extract its content in `docs/gnu_make` or run the following command:

```sh
mkdir docs/gnu_make \
&& curl https://www.gnu.org/software/make/manual/make.html_node.tar.gz | \
tar --extract --gzip --strip-components=1 --directory=docs/gnu_make
```

## Gnuplot

The most recent release can be found near the bottom of
https://sourceforge.net/p/gnuplot/gnuplot-main/ref/master/tags/

```sh
DEVDOCS_ROOT=/path/to/devdocs
mkdir gnuplot-src $DEVDOCS_ROOT/docs/gnuplot
git clone -b $RELEASE --depth 1 https://git.code.sf.net/p/gnuplot/gnuplot-main ./gnuplot-src
cd gnuplot-src/
./prepare
./configure
cd docs/
make nofigures.tex
latex2html -html 5.0,math -split 4 -link 8 -long_titles 5 -dir $DEVDOCS_ROOT/docs/gnuplot -ascii_mode -no_auto_link nofigures.tex
```

To install `latex2html` on macOS: `brew install basictex latex2html`, then edit
`/usr/local/Cellar/latex2html/2019.2/l2hconf.pm` to include the path to LaTeX:

<details>

On line 21 (approximately):

```
#  Give the paths to latex and dvips on your system:
#
$LATEX = '/Library/TeX/texbin/latex';	# LaTeX
$PDFLATEX = '/Library/TeX/texbin/pdflatex';	# pdfLaTeX
$LUALATEX = '/Library/TeX/texbin/lualatex';	# LuaLaTeX
$DVILUALATEX = '/Library/TeX/texbin/dvilualatex';	# dviLuaLaTeX
$DVIPS = '/Library/TeX/texbin/dvips';	# dvips
$DVIPNG = '';	# dvipng
$PDFTOCAIRO = '/usr/local/bin/pdf2svg';	# pdf to svg converter
$PDFCROP = '';	# pdfcrop
$GS = '/usr/local/opt/ghostscript/bin/gs';	# GhostScript
```
</details>

## Man

```sh
wget --recursive --no-parent https://man7.org/linux/man-pages/
mv man7.org/linux/man-pages/ docs/man/
```

## NumPy

```sh
mkdir --parent docs/numpy~$VERSION/; \
curl https://numpy.org/doc/$VERSION/numpy-html.zip | \
bsdtar --extract --file=- --directory=docs/numpy~$VERSION/
```

## OpenGL

```sh
cd docs/
git clone https://github.com/KhronosGroup/OpenGL-Refpages.git
ln -s OpenGL-Refpages/gl4/html/ opengl~4
ln -s OpenGL-Refpages/gl2.1/xhtml/ opengl~2.1
```

## OpenJDK
Search 'Openjdk' in https://www.debian.org/distrib/packages, find the `openjdk-$VERSION-doc` package,
download it, extract it with `dpkg -x $PACKAGE ./` and move `./usr/share/doc/openjdk-16-jre-headless/api/`
to `path/to/devdocs/docs/openjdk~$VERSION`

```sh
curl -O http://ftp.at.debian.org/debian/pool/main/o/openjdk-21/openjdk-21-doc_21.0.2+13-2_all.deb
tar xf openjdk-21-doc_21.0.2+13-2_all.deb
tar xf data.tar.xz
mv ./usr/share/doc/openjdk-21-jre-headless/api/ docs/openjdk~$VERSION
```

If you use or have access to a Debian-based GNU/Linux distribution you can run the following command:
```sh
apt download openjdk-$VERSION-doc
dpkg -x $PACKAGE ./
# previous command makes a directory called 'usr' in the current directory
mv ./usr/share/doc/openjdk-16-jre-headless/api/ docs/openjdk~$VERSION
```

## Pandas

From the home directory; `devdocs`, execute below:

```sh
curl https://pandas.pydata.org/docs/pandas.zip -o tmp.zip && unzip tmp.zip -d docs/pandas~2 && rm tmp.zip
```

## PHP
Click the link under the "Many HTML files" column on https://www.php.net/download-docs.php, extract the tarball, change its name to `php` and put it in `docs/`.

Or run the following commands in your terminal:

```sh
curl https://www.php.net/distributions/manual/php_manual_en.tar.gz | tar xz; mv php-chunked-xhtml/ docs/php/
```
## Python 3.6+

```sh
mkdir docs/python~$VERSION
cd docs/python~$VERSION
curl -L https://docs.python.org/$VERSION/archives/python-$RELEASE-docs-html.tar.bz2 | \
tar xj --strip-components=1
```

## Python < 3.6

```sh
mkdir docs/python~$VERSION
cd docs/python~$VERSION
curl -L https://docs.python.org/ftp/python/doc/$RELEASE/python-$RELEASE-docs-html.tar.bz2 | \
tar xj --strip-components=1
```

## R

```bash
sudo dnf install bzip2-devel
sudo dnf install gcc-gfortran
sudo dnf install libcurl-devel
sudo dnf install texinfo
sudo dnf install xz-devel

DEVDOCSROOT=docs/r
RLATEST=https://cran.r-project.org/src/base/R-latest.tar.gz # or /R-${VERSION::1}/R-$VERSION.tar.gz

RSOURCEDIR=${TMPDIR:-/tmp}/R/latest
RBUILDDIR=${TMPDIR:-/tmp}/R/build
mkdir -p "$RSOURCEDIR" "$RBUILDDIR" "$DEVDOCSROOT"

# Download, configure, and build with static HTML pages
curl "$RLATEST" | tar -C "$RSOURCEDIR" -xzf - --strip-components=1
(cd "$RBUILDDIR" && "$RSOURCEDIR/configure" --enable-prebuilt-html --with-recommended-packages --disable-byte-compiled-packages --disable-shared --disable-java --with-readline=no --with-x=no)
make _R_HELP_LINKS_TO_TOPICS_=FALSE -C "$RBUILDDIR"

# Export all html documentation built − global, and per-package
cp -r "$RBUILDDIR/doc" "$DEVDOCSROOT/"
ls -d "$RBUILDDIR"/library/*/html | while read orig; do
    dest="$DEVDOCSROOT${orig#$RBUILDDIR}"
    mkdir -p "$dest" && cp -r "$orig"/* "$dest/"
done
```

## RDoc

### Nokogiri
### Ruby / Minitest

```sh
git clone https://github.com/seattlerb/minitest
cd minitest/
bundle install
bundle add rdoc hoe
bundle exec rak docs
cd ..
cp -r minitest/docs $DEVDOCS/docs/minitest
```

### Ruby on Rails
* Download a release at https://github.com/rails/rails/releases or clone https://github.com/rails/rails.git (checkout to the branch of the rails' version that is going to be scraped)
* Open `railties/lib/rails/api/task.rb` and comment out any code related to sdoc (`configure_sdoc`)
* Run `bundle config set --local without 'db job'` (in the Rails directory)
* Run `bundle install && bundle exec rake rdoc` (in the Rails directory)
* Run `cd guides && bundle exec rake guides:generate:html && cd ..`
* Run `cp -r guides/output html/guides`
* Run `cp -r html $DEVDOCS/docs/rails~[version]`

### Ruby
Download the tarball of Ruby from https://www.ruby-lang.org/en/downloads/, extract it, run
`./configure && make html` in your terminal (while your are in the ruby directory) and move
`.ext/html` to `path/to/devdocs/docs/ruby~$VERSION/`.

Or run the following commands in your terminal:
```sh
curl https://cache.ruby-lang.org/pub/ruby/$VERSION/ruby-$RELEASE.tar.gz > ruby.tar; \
tar -xf ruby.tar; cd ruby-$RELEASE; ./configure && make html; mv .ext/html path/to/devdocs/docs/ruby~$VERSION
```

To generate the htmls file you have to run `make` command but it does not install Ruby in your system, only generates html files so you have not
to worry about cleaning or removing a new Ruby installation.

## Scala

See `lib/docs/scrapers/scala.rb`

## SQLite

Download the docs from https://sqlite.org/download.html, unzip it, and rename
it to `docs/sqlite`

```sh
curl https://sqlite.org/2022/sqlite-doc-3400000.zip | bsdtar --extract --file - --directory=docs/sqlite/ --strip-components=1
```

## Three.js
Download the docs from https://github.com/mrdoob/three.js/tree/dev/files or run the following commands in your terminal:
Make sure to set the version per the release tag (e.g. r160). Note that the r prefix is already included, only the version number is needed.

```sh
curl https://codeload.github.com/mrdoob/three.js/tar.gz/refs/tags/r${VERSION} > threejs.tar.gz
tar -xzf threejs.tar.gz
mkdir -p docs/threejs~${VERSION}
mv three.js-r${VERSION}/list.json tmp/list.json
mv three.js-r${VERSION}/docs/* docs/threejs~${VERSION}/

rm -rf three.js-r${VERSION}/
rm threejs.tar.gz
```
**Table of contents:**

* [Overview](#overview)
* [Instance methods](#instance-methods)
* [Core filters](#core-filters)
* [Custom filters](#custom-filters)
  - [CleanHtmlFilter](#cleanhtmlfilter)
  - [EntriesFilter](#entriesfilter)

## Overview

Filters use the [HTML::Pipeline](https://github.com/jch/html-pipeline) library. They take an HTML string or [Nokogiri](http://nokogiri.org/) node as input, optionally perform modifications and/or extract information from it, and then outputs the result. Together they form a pipeline where each filter hands its output to the next filter's input. Every documentation page passes through this pipeline before being copied on the local filesystem.

Filters are subclasses of the [`Docs::Filter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/filter.rb) class and require a `call` method. A basic implementation looks like this:

```ruby
module Docs
  class CustomFilter < Filter
    def call
      doc
    end
  end
end
```

Filters which manipulate the Nokogiri node object (`doc` and related methods) are _HTML filters_ and must not manipulate the HTML string (`html`). Vice-versa, filters which manipulate the string representation of the document are _text filters_ and must not manipulate the Nokogiri node object. The two types are divided into two stacks within the scrapers. These stacks are then combined into a pipeline that calls the HTML filters before the text filters (more details [here](./scraper-reference.md#filter-stacks)). This is to avoid parsing the document multiple times.

The `call` method must return either `doc` or `html`, depending on the type of filter.

## Instance methods

* `doc` [Nokogiri::XML::Node]
  The Nokogiri representation of the container element.
  See [Nokogiri's API docs](http://www.rubydoc.info/github/sparklemotion/nokogiri/Nokogiri/XML/Node) for the list of available methods.

* `html` [String]
  The string representation of the container element.

* `context` [Hash] **(frozen)**
  The scraper's `options` along with a few additional keys: `:base_url`, `:root_url`, `:root_page` and `:url`.

* `result` [Hash]
  Used to store the page's metadata and pass back information to the scraper.
  Possible keys:

  - `:path` — the page's normalized path
  - `:store_path` — the path where the page will be stored (equal to `:path` with `.html` at the end)
  - `:internal_urls` — the list of distinct internal URLs found within the page
  - `:entries` — the [`Entry`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/models/entry.rb) objects to add to the index

* `css`, `at_css`, `xpath`, `at_xpath`
  Shortcuts for `doc.css`, `doc.xpath`, etc.

* `base_url`, `current_url`, `root_url` [Docs::URL]
  Shortcuts for `context[:base_url]`, `context[:url]`, and `context[:root_url]` respectively.

* `root_path` [String]
  Shortcut for `context[:root_path]`.

* `subpath` [String]
  The sub-path from the base URL of the current URL.
  _Example: if `base_url` equals `example.com/docs` and `current_url` equals `example.com/docs/file?raw`, the returned value is `/file`._

* `slug` [String]
  The `subpath` removed of any leading slash or `.html` extension.
  _Example: if `subpath` equals `/dir/file.html`, the returned value is `dir/file`._

* `root_page?` [Boolean]
  Returns `true` if the current page is the root page.

* `initial_page?` [Boolean]
  Returns `true` if the current page is the root page or its subpath is one of the scraper's `initial_paths`.

## Core filters

* [`ContainerFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/container.rb) — changes the root node of the document (remove everything outside)
* [`CleanHtmlFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/clean_html.rb) — removes HTML comments, `<script>`, `<style>`, etc.
* [`NormalizeUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/normalize_urls.rb) — replaces all URLs with their fully qualified counterpart
* [`InternalUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/internal_urls.rb) — detects internal URLs (the ones to scrape) and replaces them with their unqualified, relative counterpart
* [`NormalizePathsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/normalize_paths.rb) — makes the internal paths consistent (e.g. always end with `.html`)
* [`CleanLocalUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/clean_local_urls.rb) — removes links, iframes and images pointing to localhost (`FileScraper` only)
* [`InnerHtmlFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/inner_html.rb) — converts the document to a string
* [`CleanTextFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/clean_text.rb) — removes empty nodes
* [`AttributionFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/attribution.rb) — appends the license info and link to the original document
* [`TitleFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/title.rb) — prepends the document with a title (disabled by default)
* [`EntriesFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/entries.rb) — abstract filter for extracting the page's metadata

## Custom filters

Scrapers can have any number of custom filters but require at least the two described below.

**Note:** filters are located in the [`lib/docs/filters`](https://github.com/freeCodeCamp/devdocs/tree/main/lib/docs/filters/) directory. The class's name must be the [CamelCase](http://api.rubyonrails.org/classes/String.html#method-i-camelize) equivalent of the filename.

### `CleanHtmlFilter`

The `CleanHtml` filter is tasked with cleaning the HTML markup where necessary and removing anything superfluous or nonessential. Only the core documentation should remain at the end.

Nokogiri's many jQuery-like methods make it easy to search and modify elements — see the [API docs](http://www.rubydoc.info/github/sparklemotion/nokogiri/Nokogiri/XML/Node).

Here's an example implementation that covers the most common use-cases:

```ruby
module Docs
  class MyScraper
    class CleanHtmlFilter < Filter
      def call
        css('hr').remove
        css('#changelog').remove if root_page?

        # Set id attributes on <h3> instead of an empty <a>
        css('h3').each do |node|
          node['id'] = node.at_css('a')['id']
        end

        # Make proper table headers
        css('td.header').each do |node|
          node.name = 'th'
        end

        # Remove code highlighting
        css('pre').each do |node|
          node.content = node.content
        end

        doc
      end
    end
  end
end
```

**Notes:**

* Empty elements will be automatically removed by the core `CleanTextFilter` later in the pipeline's execution.
* Although the goal is to end up with a clean version of the page, try to keep the number of modifications to a minimum, so as to make the code easier to maintain. Custom CSS is the preferred way of normalizing the pages (except for hiding stuff which should always be done by removing the markup).
* Try to document your filter's behavior as much as possible, particularly modifications that apply only to a subset of pages. It'll make updating the documentation easier.

### `EntriesFilter`

The `Entries` filter is responsible for extracting the page's metadata, represented by a set of _entries_, each with a name, type and path.

The following two models are used under the hood to represent the metadata:

* [`Entry(name, type, path)`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/models/entry.rb)
* [`Type(name, slug, count)`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/models/type.rb)

Each scraper must implement its own `EntriesFilter` by subclassing the [`Docs::EntriesFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/entries.rb) class. The base class already implements the `call` method and includes four methods which the subclasses can override:

* `get_name` [String]
  The name of the default entry (aka. the page's name).
  It is usually guessed from the `slug` (documented above) or by searching the HTML markup.
  **Default:** modified version of `slug` (underscores are replaced with spaces and forward slashes with dots)

* `get_type` [String]
  The type of the default entry (aka. the page's type).
  Entries without a type can be searched for but won't be listed in the app's sidebar (unless no other entries have a type).
  **Default:** `nil`

* `include_default_entry?` [Boolean]
  Whether to include the default entry.
  Used when a page consists of multiple entries (returned by `additional_entries`) but doesn't have a name/type of its own, or to remove a page from the index (if it has no additional entries), in which case it won't be copied on the local filesystem and any link to it in the other pages will be broken (as explained on the [Scraper Reference](./scraper-reference.md) page, this is used to keep the `:skip` / `:skip_patterns` options to a maintainable size, or if the page includes links that can't reached from anywhere else).
  **Default:** `true`

* `additional_entries` [Array]
  The list of additional entries.
  Each entry is represented by an Array of three attributes: its name, fragment identifier, and type. The fragment identifier refers to the `id` attribute of the HTML element (usually a heading) that the entry relates to. It is combined with the page's path to become the entry's path. If absent or `nil`, the page's path is used. If the type is absent or `nil`, the default `type` is used.
  Example: `[ ['One'], ['Two', 'id'], ['Three', nil, 'type'] ]` adds three additional entries, the first one named "One" with the default path and type, the second one named "Two" with the URL fragment "#id" and the default type, and the third one named "Three" with the default path and the type "type".
  The list is usually constructed by running through the markup. Exceptions can also be hard-coded for specific pages.
  **Default:** `[]`

The following accessors are also available, but must not be overridden:

* `name` [String]
  Memoized version of `get_name` (`nil` for the root page).

* `type` [String]
  Memoized version of `get_type` (`nil` for the root page).

**Notes:**

* Leading and trailing whitespace is automatically removed from names and types.
* Names must be unique across the documentation and as short as possible (ideally less than 30 characters). Whenever possible, methods should be differentiated from properties by appending `()`, and instance methods should be differentiated from class methods using the `Class#method` or `object.method` conventions.
* You can call `name` from `get_type` or `type` from `get_name` but doing both will cause a stack overflow (i.e. you can infer the name from the type or the type from the name, but you can't do both at the same time). Don't call `get_name` or `get_type` directly as their value isn't memoized.
* The root page has no name and no type (both are `nil`). `get_name` and `get_type` won't get called with the page (but `additional_entries` will).
* `Docs::EntriesFilter` is an _HTML filter_. It must be added to the scraper's `html_filters` stack.
* Try to document the code as much as possible, particularly the special cases. It'll make updating the documentation easier.

**Example:**

```ruby
module Docs
  class MyScraper
    class EntriesFilter < Docs::EntriesFilter
      def get_name
        node = at_css('h1')
        result = node.content.strip
        result << ' event' if type == 'Events'
        result << '()' if node['class'].try(:include?, 'function')
        result
      end

      def get_type
        object, method = *slug.split('/')
        method ? object : 'Miscellaneous'
      end

      def additional_entries
        return [] if root_page?

        css('h2').map do |node|
          [node.content, node['id']]
        end
      end

      def include_default_entry?
        !at_css('.obsolete')
      end
    end
  end
end
```

return [[Home]]
# Maintainer's Guide

This document is intended for [DevDocs maintainers](#list-of-maintainers).

## Merging pull requests

- PRs should be approved by at least one maintainer before being merged.

- PRs that add or update documentations should always be built and tested locally, and the doc files uploaded by the `thor docs:upload` command, before the PR is merged on GitHub.

  This workflow is required because there is a dependency between the local and production environments. The `thor docs:download` command downloads documentations from production files uploaded by the `thor docs:upload` command. If a PR adding a new documentation is merged and pushed to GitHub before the files have been uploaded to production, the `thor docs:download` will fail for the new documentation and the docker container will not build properly until the new documentation is deployed to production.

## Updating docs

The process for updating docs is as follow:

- Follow the checklist in [CONTRIBUTING.md#updating-existing-documentations](../.github/CONTRIBUTING.md#updating-existing-documentations).
- Commit the changes (protip: use the `thor docs:commit` command documented below).
- Optional: do more updates.
- Run `thor docs:upload` (documented below).
- Push to GitHub to [deploy the app](#deploying-devdocs) and verify that everything works in production.
- Run `thor docs:clean` (documented below).

Note: changes to `public/docs/docs.json` should never be committed. This file reflects which documentations have been downloaded or generated locally, which is always none on a fresh `git clone`.

## Setup requirements

In order to deploy DevDocs, you must:

- be given access to Heroku, [configure the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) on your computer, and familiarize yourself with Heroku's UI and CLI, as well as that of New Relic (accessible through [the Heroku dashboard](https://dashboard.heroku.com/apps/devdocs)).

- be given access to DevDocs's [Sentry instance](https://sentry.io/devdocs/devdocs-js/) (for JS error tracking) and familiarize yourself with its UI.

- be provided with DevDocs's S3 credentials, and install (`brew install awscli` on macOS) and [configure](https://docs.aws.amazon.com/cli/latest/reference/configure/) the AWS CLI on your computer. The configuration must add a named profile called "devdocs":

  ```
  aws configure --profile devdocs
  ```

## Thor commands

In addition to the [publicly-documented commands](https://github.com/freeCodeCamp/devdocs#available-commands), the following commands are aimed at DevDocs maintainers:

- `thor docs:package`

  Generates packages for one or more documentations. Those packages are intended to be uploaded to DevDocs's S3 bundle zone by maintainers via the `thor docs:upload` command, and downloaded by users via the `thor docs:download` command.

  Versions can be specified as such: `thor docs:package rails@5.2 node@10\ LTS`.

  Packages can also be automatically generated during the scraping process by passing the `--package` option to `thor docs:generate`.

- `thor docs:upload`

  This command does two operations:

  1. sync the files for the specified documentations with S3 (used by the Heroku app);
  2. upload the documentations' packages to DevDocs's S3 bundle zone (used by the `thor docs:download` command).

  For the command to work, you must have the AWS CLI configured as indicated above.

  **Important:** the app should always be deployed immediately after this command has finished running. Do not run this command unless you are able and ready to deploy DevDocs.

  To upload all documentations that are packaged on your computer, run `thor docs:upload --packaged`.
  To test your configuration and the effect of this command without uploading anything, pass the `--dryrun` option.

- `thor docs:commit`

  Shortcut command to create a Git commit for a given documentation once it has been updated. Scraper and `assets/` file changes will be committed. The commit message will include the most recent version that the documentation was updated to. If some files were missed by the commit, use `git commit --amend` to add them to the commit. The command may be run before `thor docs:upload` is run, but the commit should not be pushed to GitHub before the files have been uploaded and the app deployed.

- `thor docs:clean`

  Shortcut command to delete all package files (once uploaded via `thor docs:upload`, they are not needed anymore).

## Deploying DevDocs

Once docs have been uploaded via `thor docs:upload` (if applicable), you can push to the DevDocs main branch (or merge the PR containing the updates). This triggers a GitHub action which starts by running the tests. If they succeed, the Heroku application will be deployed automatically.

- If you're deploying documentation updates, verify that the documentations work properly once the deploy is done. Keep in mind that you'll need to wait a few seconds for the service worker to finish caching the new assets. You should see a "DevDocs has been updated" notification appear when the caching is done, after which you need to refresh the page to see the changes.
- If you're deploying frontend changes, monitor [Sentry](https://sentry.io/devdocs/devdocs-js/) for new JS errors once the deploy is done.
- If you're deploying server changes, monitor New Relic (accessible through [the Heroku dashboard](https://dashboard.heroku.com/apps/devdocs)) for Ruby exceptions and throughput or response time changes once the deploy is done.

If any issue arises, run `heroku rollback` to rollback to the previous version of the app (this can also be done via Heroku's UI). Note that this will not revert changes made to documentation files that were uploaded via `thor docs:upload`. Try and fix the issue as quickly as possible, then re-deploy the app. Reach out to other maintainers if you need help.

If this is your first deploy, make sure another maintainer is around to assist.

## Infrastructure

The bundled documents are available at downloads.devdocs.io and the documents themselves at documents.devdocs.io. Download and document requests are proxied to S3 buckets devdocs-downloads.s3.amazonaws.com and devdocs-documents.s3.amazonaws.com respectively.

New proxy VMs should be created from the `devdocs-proxy` snapshot. Before adding them to the load-balancer, it's necessary to add their IP addresses to the aws:SourceIp lists for both buckets, or their requests will be rejected.

When creating a new proxy VM and the `devdocs-proxy` snapshot is not available, then the new vm should be provisioned as follows:

```bash
# we need at least nginx 1.19.x
wget https://nginx.org/keys/nginx_signing.key
apt-key add nginx_signing.key
echo 'deb https://nginx.org/packages/mainline/ubuntu/ focal nginx' >> /etc/apt/sources.list
echo 'deb-src https://nginx.org/packages/mainline/ubuntu/ focal nginx' >> /etc/apt/sources.list
apt-get -y remove nginx-common
apt-get -y update
apt-get -y install nginx

# the config is on github
rm -rf /etc/nginx/*
rm -rf /etc/nginx/.* 2> /dev/null
git clone https://github.com/freeCodeCamp/devdocs-nginx-config.git /etc/nginx

# at this point we need to add the certs from Cloudflare and test the config
nginx -t

# if nginx is already running, just
# ps aux | grep nginx
# find the number and kill it

nginx
```

## List of maintainers in alphabetical order

The following people (used to) maintain DevDocs:

- [Ahmad Abdolsaheb](https://github.com/ahmadabdolsaheb)
- [Bryan Hernández](https://github.com/MasterEnoc)
- [Jasper van Merle](https://github.com/jmerle)
- [Jed Fox](https://github.com/j-f1)
- [Mrugesh Mohapatra](https://github.com/raisedadead)
- [Oliver Eyton-Williams](https://github.com/ojeytonwilliams)
- [Simon Legner](https://github.com/simon04)
- [Thibaut Courouble](https://github.com/thibaut)

To reach out, please ping [@freeCodeCamp/devdocs](https://github.com/orgs/freeCodeCamp/teams/devdocs).

Interested in helping maintain DevDocs? Come talk to us on [Discord](https://discord.gg/PRyKn3Vbay) :)

In addition, we appreciate the major contributions made by [these great people](https://github.com/freeCodeCamp/devdocs/graphs/contributors).
**Table of contents:**

* [Overview](#overview)
* [Configuration](#configuration)
  - [Attributes](#attributes)
  - [Filter stacks](#filter-stacks)
  - [Filter options](#filter-options)

## Overview

Starting from a root URL, scrapers recursively follow links that match a set of rules, passing each valid response through a chain of filters before writing the file on the local filesystem. They also create an index of the pages' metadata (determined by one filter), which is dumped into a JSON file at the end.

Scrapers rely on the following libraries:

* [Typhoeus](https://github.com/typhoeus/typhoeus) for making HTTP requests
* [HTML::Pipeline](https://github.com/jch/html-pipeline) for applying filters
* [Nokogiri](http://nokogiri.org/) for parsing HTML

There are currently two kinds of scrapers: [`UrlScraper`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/scrapers/url_scraper.rb) which downloads files via HTTP and [`FileScraper`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/scrapers/file_scraper.rb) which reads them from the local filesystem. They function almost identically (both use URLs), except that `FileScraper` substitutes the base URL with a local path before reading a file. `FileScraper` uses the placeholder `localhost` base URL by default and includes a filter to remove any URL pointing to it at the end.

To be processed, a response must meet the following requirements:

* 200 status code
* HTML content type
* effective URL (after redirection) contained in the base URL (explained below)

(`FileScraper` only checks if the file exists and is not empty.)

Each URL is requested only once (case-insensitive).

## Configuration

Configuration is done via class attributes and divided into three main categories:

* [Attributes](#attributes) — essential information such as name, version, URL, etc.
* [Filter stacks](#filter-stacks) — the list of filters that will be applied to each page.
* [Filter options](#filter-options) — the options passed to said filters.

**Note:** scrapers are located in the [`lib/docs/scrapers`](https://github.com/freeCodeCamp/devdocs/tree/main/lib/docs/scrapers/) directory. The class's name must be the [CamelCase](http://api.rubyonrails.org/classes/String.html#method-i-camelize) equivalent of the filename.

### Attributes

* `name` [String]
  Must be unique.
  Defaults to the class's name.

* `slug` [String]
  Must be unique, lowercase, and not include dashes (underscores are ok).
  Defaults to `name` lowercased.

* `type` [String] **(required, inherited)**
  Defines the CSS class name (`_[type]`) and custom JavaScript class (`app.views.[Type]Page`) that will be added/loaded on each page. Documentations sharing a similar structure (e.g. generated with the same tool or originating from the same website) should use the same `type` to avoid duplicating the CSS and JS.
  Must include lowercase letters only.

* `release` [String] **(required)**
  The version of the software at the time the scraper was last run. This is only informational and doesn't affect the scraper's behavior.

* `base_url` [String] **(required in `UrlScraper`)**
  The documents' location. Only URLs _inside_ the `base_url` will be scraped. "inside" more or less means "starting with" except that `/docs` is outside `/doc` (but `/doc/` is inside).
   Defaults to `localhost` in `FileScraper`. _(Note: any iframe, image, or skipped link pointing to localhost will be removed by the `CleanLocalUrls` filter; the value should be overridden if the documents are available online.)_
  Unless `root_path` is set, the root/initial URL is equal to `base_url`.

* `base_urls` [Array] **(the `MultipleBaseUrls` module must be included)** Documentation's locations. Almost the same as `base_url` but in this case more than one URL can be added, should be used when a documentation is split in different URLs or needs more URLs to be completed. See [`typescript.rb`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/scrapers/typescript.rb).

* `root_path` [String] **(inherited)**
  The path from the `base_url` of the root URL.

* `initial_paths` [Array] **(inherited)**
  A list of paths (from the `base_url`) to add to the initial queue. Useful for scraping isolated documents.
  Defaults to `[]`. _(Note: the `root_path` is added to the array at runtime.)_

* `dir` [String] **(required, `FileScraper` only)**
  The absolute path where the files are located on the local filesystem.
  _Note: `FileScraper` works exactly like `UrlScraper` (manipulating the same kind of URLs) except that it substitutes `base_url` with `dir` in order to read files instead of making HTTP requests._

* `params` [Hash] **(inherited, `UrlScraper` only)**
  Query string parameters to append to every URL. (e.g. `{ format: 'raw' }` → `?format=raw`)
  Defaults to `{}`.

* `abstract` [Boolean]
  Make the scraper abstract / not runnable. Used for sharing behavior with other scraper classes (e.g. all MDN scrapers inherit from the abstract [`Mdn`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/scrapers/mdn/mdn.rb) class).
  Defaults to `false`.

### Filter stacks

Each scraper has two [filter](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/filter.rb) [stacks](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/core/filter_stack.rb): `html_filters` and `text_filters`. They are combined into a pipeline (using the [HTML::Pipeline](https://github.com/jch/html-pipeline) library) which causes each filter to hand its output to the next filter's input.

HTML filters are executed first and manipulate a parsed version of the document (a [Nokogiri](http://nokogiri.org/Nokogiri/XML/Node.html) node object), whereas text filters manipulate the document as a string. This separation avoids parsing the document multiple times.

Filter stacks are like sorted sets. They can modified using the following methods:

```ruby
push(*names)                 # append one or more filters at the end
insert_before(index, *names) # insert one filter before another (index can be a name)
insert_after(index, *names)  # insert one filter after another (index can be a name)
replace(index, name)         # replace one filter with another (index can be a name)
```

"names" are `require` paths relative to `Docs` (e.g. `jquery/clean_html` → `Docs::Jquery::CleanHtml`).

Default `html_filters`:

* [`ContainerFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/container.rb) — changes the root node of the document (remove everything outside)
* [`CleanHtmlFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/clean_html.rb) — removes HTML comments, `<script>`, `<style>`, etc.
* [`NormalizeUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/normalize_urls.rb) — replaces all URLs with their fully qualified counterpart
* [`InternalUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/internal_urls.rb) — detects internal URLs (the ones to scrape) and replaces them with their unqualified, relative counterpart
* [`NormalizePathsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/normalize_paths.rb) — makes the internal paths consistent (e.g. always end with `.html`)
* [`CleanLocalUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/clean_local_urls.rb) — removes links, iframes and images pointing to localhost (`FileScraper` only)

Default `text_filters`:

* [`InnerHtmlFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/inner_html.rb) — converts the document to a string
* [`CleanTextFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/clean_text.rb) — removes empty nodes
* [`AttributionFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/attribution.rb) — appends the license info and link to the original document

Additionally:

* [`TitleFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/title.rb) is a core HTML filter, disabled by default, which prepends the document with a title (`<h1>`).
* [`EntriesFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/entries.rb) is an abstract HTML filter that each scraper must implement and responsible for extracting the page's metadata.

### Filter options

The filter options are stored in the `options` Hash. The Hash is inheritable (a recursive copy) and empty by default.

More information about how filters work is available on the [Filter Reference](./filter-reference.md) page.

* [`ContainerFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/container.rb)

  - `:container` [String or Proc]
    A CSS selector of the container element. Everything outside of it will be removed and become unavailable to the other filters. If more than one element match the selector, the first one inside the DOM is used. If no elements match the selector, an error is raised.
    If the value is a Proc, it is called for each page with the filter instance as argument, and should return a selector or `nil`.
    The default container is the `<body>` element.
    _Note: links outside of the container element will not be followed by the scraper. To remove links that should be followed, use a [`CleanHtml`](./filter-reference.md#cleanhtmlfilter) filter later in the stack._

* [`NormalizeUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/normalize_urls.rb)
  The following options are used to modify URLs in the pages. They are useful to remove duplicates (when the same page is accessible from multiple URLs) and fix websites that have a bunch of redirections in place (when URLs that should be scraped, aren't, because they are behind a redirection which is outside of the `base_url` — see the MDN scrapers for examples of this).

  - `:replace_urls` [Hash]
    Replaces all instances of a URL with another.
    Format: `{ 'original_url' => 'new_url' }`
  - `:replace_paths` [Hash]
    Replaces all instances of a sub-path (path from the `base_url`) with another.
    Format: `{ 'original_path' => 'new_path' }`
  - `:fix_urls` [Proc]
    Called with each URL. If the returned value is `nil`, the URL isn't modified. Otherwise the returned value is used as replacement.

  _Note: before these rules are applied, all URLs are converted to their fully qualified counterpart (http://...)._

* [`InternalUrlsFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/internal_urls.rb)

  Internal URLs are the ones _inside_ the scraper's `base_url` ("inside" more or less means "starting with", except that `/docs` is outside `/doc`). They will be scraped unless excluded by one of the following rules. All internal URLs are converted to relative URLs inside the pages.

  - `:skip_links` [Boolean or Proc]
    If `false`, does not convert or follow any internal URL (creating a single-page documentation).
    If the value is a Proc, it is called for each page with the filter instance as argument.
  - `:follow_links` [Proc]
    Called for page with the filter instance as argument. If the returned value is `false`, does not add internal URLs to the queue.
  - `:trailing_slash` [Boolean]
    If `true`, adds a trailing slash to all internal URLs. If `false`, removes it.
    This is another option used to remove duplicate pages.
  - `:skip` [Array]
    Ignores internal URLs whose sub-paths (path from the `base_url`) are in the Array (case-insensitive).
  - `:skip_patterns` [Array]
    Ignores internal URLs whose sub-paths match any Regexp in the Array.
  - `:only` [Array]
    Ignores internal URLs whose sub-paths aren't in the Array (case-insensitive) and don't match any Regexp in `:only_patterns`.
  - `:only_patterns` [Array]
    Ignores internal URLs whose sub-paths don't match any Regexp in the Array and aren't in `:only`.

  If the scraper has a `root_path`, the empty and `/` paths are automatically skipped.
  If `:only` or `:only_patterns` is set, the root path is automatically added to `:only`.

  _Note: pages can be excluded from the index based on their content using the [`Entries`](./filter-reference.md#entriesfilter) filter. However, their URLs will still be converted to relative in the other pages and trying to open them will return a 404 error. Although not ideal, this is often better than having to maintain a long list of `:skip` URLs._

* [`AttributionFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/attribution.rb)

  - `:attribution` [String] **(required)**
    An HTML string with the copyright and license information. See the other scrapers for examples.

* [`TitleFilter`](https://github.com/freeCodeCamp/devdocs/blob/main/lib/docs/filters/core/title.rb)

  - `:title` [String or Boolean or Proc]
    Unless the value is `false`, adds a title to every page.
    If the value is `nil`, the title is the name of the page as determined by the [`Entries`](./filter-reference.md#entriesfilter) filter. Otherwise the title is the String or the value returned by the Proc (called for each page, with the filter instance as argument). If the Proc returns `nil` or `false`, no title is added.
  - `:root_title` [String or Boolean]
    Overrides the `:title` option for the root page only.

  _Note: this filter is disabled by default._

### Processing responses before filters

These methods are runned before filter stacks, and can directly process responses.

* `process_response?(response)`

  Determine whether a response should be processed. A response will be dropped if this method returns `false`.

  It is useful to filter pages, such as empty, invalid, or redirecting pages, depending on the content.

  Example: [lib/docs/scrapers/kotlin.rb](../lib/docs/scrapers/kotlin.rb)

* `parse(response)`

  Parse HTTP/File response, and convert to a Nokogiri document by default.

  Overrides this method if you want to modified HTML source code before Nokogiri.
It is useful to preserve whitespaces of code segments within non-pre blocks, because Nokogiri may delete them.

  Example: [lib/docs/scrapers/go.rb](../lib/docs/scrapers/go.rb)

## Keeping scrapers up-to-date

In order to keep scrapers up-to-date the `get_latest_version(opts)` method should be overridden. If `self.release` is defined, this should return the latest version of the documentation. If `self.release` is not defined, it should return the Epoch time when the documentation was last modified. If the documentation will never change, simply return `1.0.0`. The result of this method is periodically reported in a "Documentation versions report" issue which helps maintainers keep track of outdated documentations.

To make life easier, there are a few utility methods that you can use in `get_latest_version`:

### General HTTP methods
* `fetch(url, opts)`

  Makes a GET request to the url and returns the response body.

  Example: [lib/docs/scrapers/bash.rb](../lib/docs/scrapers/bash.rb)
* `fetch_doc(url, opts)`

  Makes a GET request to the url and returns the HTML body converted to a Nokogiri document.

  Example: [lib/docs/scrapers/git.rb](../lib/docs/scrapers/git.rb)
* `fetch_json(url, opts)`

  Makes a GET request to the url and returns the JSON body converted to a dictionary.

  Example: [lib/docs/scrapers/mdn/mdn.rb](../lib/docs/scrapers/mdn/mdn.rb)

### Package repository methods
* `get_npm_version(package, opts)`

  Returns the latest version of the given npm package.

  Example: [lib/docs/scrapers/bower.rb](../lib/docs/scrapers/bower.rb)

### GitHub methods
* `get_latest_github_release(owner, repo, opts)`

  Returns the tag name of the latest GitHub release of the given repository. If the tag name is preceded by a "v", the "v" will be removed.

  Example: [lib/docs/scrapers/jsdoc.rb](../lib/docs/scrapers/jsdoc.rb)
* `get_github_tags(owner, repo, opts)`

  Returns the list of tags on the given repository ([format](https://developer.github.com/v3/repos/#list-tags)).

  Example: [lib/docs/scrapers/liquid.rb](../lib/docs/scrapers/liquid.rb)
* `get_github_file_contents(owner, repo, path, opts)`

  Returns the contents of the requested file in the default branch of the given repository.

  Example: [lib/docs/scrapers/minitest.rb](../lib/docs/scrapers/minitest.rb)
* `get_latest_github_commit_date(owner, repo, opts)`

    Returns the date of the most recent commit in the default branch of the given repository.

    Example: [lib/docs/scrapers/reactivex.rb](../lib/docs/scrapers/reactivex.rb)

### GitLab methods
* `get_gitlab_tags(hostname, group, project, opts)`

  Returns the list of tags on the given repository ([format](https://docs.gitlab.com/ee/api/tags.html)).

  Example: [lib/docs/scrapers/gtk.rb](../lib/docs/scrapers/gtk.rb)
