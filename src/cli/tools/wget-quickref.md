# `wget`, the roided-up `cURL`

> powerful utility for downloading files from the web. One of its key features is the ability to recursively download entire websites or specific directories, which can be very useful when you want to save offline copies of online documentation.

### Basic Syntax

The basic syntax of `wget` is:

```sh
wget [options] URL
```

Where `[options]` are various flags that modify its behavior and `URL` is the website address you want to download.

### Recursive Downloading with `wget`

To effectively use `wget` for downloading a whole site’s documentation, you'll mainly focus on the recursive downloading capability. Here’s how you can do it:

1. **Recursive Download:**

   Use the `-r` or `--recursive` option to enable recursive downloads, which tells `wget` to follow links and download content from linked pages.

2. **Downloading HTML and Associated Files:**

   By default, `wget` will not download all types of files (like images, CSS, JavaScript). To include them, use the `-k` or `--convert-links` option (useful for viewing files offline) and `-p` or `--page-requisites` to ensure that necessary resources are also downloaded.

3. **Stay Within a Directory:**

   The `-l` or `--level` option limits recursion depth. For example, `-l 2` will only follow links up to two levels deep from the starting page.

4. **User Agent:**

   Some servers restrict access based on user agents. Use the `--user-agent` flag to specify a different browser type if necessary.

5. **Specify Hostname and Directory:**

   The `-nd` or `--no-directories` option will download files without creating directories, storing them all in the current directory (be cautious with this to avoid overwriting files).

6. **Avoid Downloading Certain Files:**

   You might want to exclude certain file types using the `--reject` option.

7. **Run in Background:**

   Use `-b` or `--background` to run downloads in the background and log output to a file named wget-log.

8. **Specify HTTP Headers:**

   Sometimes, setting specific headers like `Referer` can be necessary to access certain URLs, especially when dealing with sites that have more sophisticated rules for serving content.

### Example Command

Here's an example command that demonstrates how you might download the documentation of a site recursively:

```sh
wget \
  --recursive \                             - enables recursive downloading
  --page-requisites \                       - downloads all elements for proper display
  --html-extension \                        - adds '.html' if missing
  --convert-links \                         - enables offline viewing
  --restrict-file-names=windows \           - windows compatibility
  -l 2 \                                    - recursion limit = 2 levels
  -nd \                                     - no creation of directories
  --cut-dirs=3 \                            - removes the first three path components from URLs
  -P /path/to/save/docs/ \                  - output path, defined
```

