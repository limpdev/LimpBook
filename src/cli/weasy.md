## Usage

```sh
weasyprint [-h] [-e ENCODING] [-s STYLESHEETS] [-m MEDIA_TYPE]
                  [-u BASE_URL] [-a ATTACHMENTS]
                  [--pdf-identifier PDF_IDENTIFIER]
                  [--pdf-variant {pdf/a-1b,pdf/a-2b,pdf/a-3b,pdf/a-4b,pdf/a-2u,pdf/a-3u,pdf/a-4u,pdf/ua-1,debug}]
                  [--pdf-version PDF_VERSION] [--pdf-forms]
                  [--uncompressed-pdf] [--custom-metadata] [-p] [--srgb]
                  [--optimize-images] [-j JPEG_QUALITY] [--full-fonts]
                  [--hinting] [-c CACHE] [-D DPI] [-v] [-d] [-q] [--version]
                  [-i] [-t TIMEOUT]
                  input output
```
---
## Render web pages to PDF.
```sh
positional arguments:
  input                 URL or filename of the HTML input, or - for stdin
  output                filename where output is written, or - for stdout
```

---
## Options
```sh
  -h, --help            show this help message and exit
  -e, --encoding ENCODING
                        force the input character encoding
  -s, --stylesheet STYLESHEETS
                        URL or filename for a user CSS stylesheet
  -m, --media-type MEDIA_TYPE
                        media type to use for @media, defaults to print
  -u, --base-url BASE_URL
                        base for relative URLs in the HTML input, defaults to
                        the input’s own filename or URL or the current
                        directory for stdin
  -a, --attachment ATTACHMENTS
                        URL or filename of a file to attach to the PDF
                        document
  --pdf-identifier PDF_IDENTIFIER
                        PDF file identifier
  --pdf-variant {pdf/a-1b,pdf/a-2b,pdf/a-3b,pdf/a-4b,pdf/a-2u,pdf/a-3u,pdf/a-4u,pdf/ua-1,debug}
                        PDF variant to generate
  --pdf-version PDF_VERSION
                        PDF version number
  --pdf-forms           include PDF forms
  --uncompressed-pdf    do not compress PDF content, mainly for debugging
                        purpose
  --custom-metadata     include custom HTML meta tags in PDF metadata
  -p, --presentational-hints
                        follow HTML presentational hints
  --srgb                include sRGB color profile
  --optimize-images     optimize size of embedded images with no quality loss
  -j, --jpeg-quality JPEG_QUALITY
                        JPEG quality between 0 (worst) to 95 (best)
  --full-fonts          embed unmodified font files when possible
  --hinting             keep hinting information in embedded fonts
  -c, --cache-folder CACHE
                        store cache on disk instead of memory, folder is
                        created if needed and cleaned after the PDF is
                        generated
  -D, --dpi DPI         set maximum resolution of images embedded in the PDF
  -v, --verbose         show warnings and information messages
  -d, --debug           show debugging messages
  -q, --quiet           hide logging messages
  --version             print WeasyPrint’s version number and exit
  -i, --info            print system information and exit
  -t, --timeout TIMEOUT
                        Set timeout in seconds for HTTP requests
```

---
