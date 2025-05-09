> *Expand below to view the offical `man` page*

<details><summary>  mutool - Man Page</summmary>

all purpose tool for dealing with PDF files

## Examples (TL;DR)

- Convert a range of pages to PNGs (Note: `%nd` in the output placeholder must be replaced with a print modifier like `%d` or `%2d`): `mutool convert -o path/to/output%nd.png path/to/input.pdf 1-10`
- Convert one or more pages of a PDF into text in `stdout`: `mutool draw -F txt path/to/input.pdf 2,3,5,...`
- Concatenate multiple PDF files: `mutool merge -o path/to/output.pdf path/to/input1.pdf path/to/input2.pdf ...`
- Query information about all content embedded in a PDF: `mutool info path/to/input.pdf`
- Extract all images, fonts and resources embedded in a PDF to the current directory: `mutool extract path/to/input.pdf`
- Show the outline (table of contents) of a PDF: `mutool show path/to/input.pdf outline`

## Synopsis

`mutool <sub-command> [options]`

## Description

mutool is a tool based on MuPDF for dealing with document files in various manners. There are several sub commands available, as described below.

## Draw

mutool draw \[options] file \[pages]

The draw command will render a document to image files, convert to another vector format, or extract the text content.

The supported input document formats are: pdf, xps, cbz, and epub.

The supported output image formats are: pbm, pgm, ppm, pam, png, pwg, pcl and ps. The supported output vector formats are: svg, pdf, and debug trace (as xml). The supported output text formats are: plain text, html, and structured text (as xml).

`-p password`

Use the specified password if the file is encrypted.

`-o output`

The output format is inferred from the output filename. Embed %d in the name to indicate the page number (for example: "page%d.png"). Printf modifiers are supported, for example "%03d". If no output is specified, the output will go to stdout.

`-F format`

Enforce a specific output format. Only necessary when outputting to stdout since normally the output filename is used to infer the output format.

`-R angle`

Rotate clockwise by given number of degrees.

`-r resolution`

Render the page at the specified resolution. The default resolution is 72 dpi.

`-w width`

Render the page at the specified width (or, if the [-r.

`-h height`

Render the page at the specified height (or, if the [-r.

`-f`

Fit exactly; ignore the aspect ratio when matching specified width/heights.

`-B bandheight`

Render in banded mode with each band no taller than the given height. This uses less memory during rendering. Only compatible with pam, pgm, ppm, pnm and png output formats. Banded rendering and md5 checksumming may not be used at the same time.

`-W width`

Page width in points for EPUB layout.

`-H height`

Page height in points for EPUB layout.

`-S size`

Font size in points for EPUB layout.

`-U filename`

User CSS stylesheet for EPUB layout.

`-c colorspace`

Render in the specified colorspace. Supported colorspaces are: mono, gray, grayalpha, rgb, rgbalpha, cmyk, cmykalpha. Some abbreviations are allowed: m, g, ga, rgba, cmyka. The default is chosen based on the output format.

`-G gamma`

Apply gamma correction. Some typical values are 0.7 or 1.4 to thin or darken text rendering.

`-I`

Invert colors.

`-s \[mft5]`

Show various bits of information: `m` for glyph cache and total memory usage, `f` for page features such as whether the page is grayscale or color, `t` for per page rendering times as well statistics, and `5` for md5 checksums of rendered images that can be used to check if rendering has changed.

`-A bits`

Specify how many bits of anti-aliasing to use. The default is 8.

`-D`

Disable use of display lists. May cause slowdowns, but should reduce the amount of memory used.

`-i`

Ignore errors.

`-L`

Low memory mode (avoid caching objects by clearing cache after each page).

`-P`

Run interpretation and rendering at the same time.

`pages`

Comma separated list of page numbers and ranges (for example: 1,5,10-15,20-N), where the character N denotes the last page. If no pages are specified, then all pages will be rendered.

## Clean

mutool clean \[options] input.pdf \[output.pdf] \[pages]

The clean command pretty prints and rewrites the syntax of a PDF file. It can be used to repair broken files, expand compressed streams, filter out a range of pages, etc.

If no output file is specified, it will write the cleaned PDF to "out.pdf" in the current directory.

`-p password`

Use the specified password if the file is encrypted.

`-g`

Garbage collect objects that have no references from other objects. Give the option twice to also renumber all objects and compact the cross reference table. Give it three times to also merge and reuse duplicate objects. Give it four times to also merge and reuse duplicate streams.

`-s`

Rewrite content streams.

`-d`

Decompress streams. This will make the output file larger, but provides easy access for reading and editing the contents with a text editor.

`-l`

Linearize output. Create a "Web Optimized" output file.

`-i`

Toggle decompression of image streams. Use in conjunction with -d to leave images compressed.

`-f`

Toggle decompression of font streams. Use in conjunction with -d to leave fonts compressed.

`-a`

ASCII Hex encode binary streams. Use in conjunction with -d and -i or -f to ensure that although the images and/or fonts are compressed, the resulting file can still be viewed and edited with a text editor.

`-z`

Deflate uncompressed streams. If combined with -d, any decompressed streams will be recompressed. If combined with -a, the streams will also be hex encoded after compression.

`pages`

Comma separated list of page numbers and ranges (for example: 1,5,10-15,20-N), where the character N denotes the last page. If no pages are specified, then all pages will be included.

## Extract

mutool extract \[options] file.pdf \[object numbers]

The extract command can be used to extract images and font files from a PDF. If no object numbers are given on the command line, all images and fonts will be extracted.

`[-p password`

Use the specified password if the file is encrypted.

[-r

Convert images to RGB when extracting them.

## Info

mutool info \[options] file.pdf \[pages]

The info command lists the resources used on each page in a PDF file. The default is to list all resource types, but if one or more flags are given, only the flagged types will be shown.

`-p password`

Use the specified password if the file is encrypted.

`-F`

List fonts.

`-I`

List images.

`-M`

List page dimensions.

`-S`

List shadings.

`-P`

List patterns.

`-X`

List form and postscript XObjects.

`pages`

Comma separated list of page numbers and ranges (for example: 1,5,10-15,20-N), where the character N denotes the last page. If no pages are specified, then all pages will be included.

## Create

mutool create \[-o output.pdf] \[options] page1.txt \[page2.txt ...]

The create command creates a new PDF file with the contents created from one or more input files containing graphics commands.

`-o output`

If no output file is specified, it will write the created PDF to "out.pdf" in the current directory.

`page.txt`

A page is created for each input file, with the contents of the file copied into the content stream. Special comments in the input files are parsed to define the page dimensions and font and image resources:

%%MediaBox 0 0 500 800
%%Rotate 90
%%Font Tm Times-Roman
%%Font Fn0 path/to/font/file.ttf
%%Image Im0 path/to/image.png

[-O

Comma separated list of format specific output options:

`decompress`
Decompress all object streams.

`compress`
Compress all object streams.

`compress-fonts`
Compress object streams for embedded fonts.

`compress-images`
Compress object streams for images.

`ascii`
Encode object streams using ASCII hex encoding.

`pretty`
Pretty-print objects with indentation.

`linearize`
Optimize document for progressive loading in viewers.

`sanitize`
Clean up graphics command in content streams.

`garbage\[=compact|deduplicate]`
Garbage collect unused objects. With `compact` the cross-reference table will also be compacted. With `deduplicate` duplicate objects will also be recombined.

## Pages

mutool pages \[options] input.pdf \[pages ...]

The pages command dumps information about the size and orientation of pages within the document.

`-p password`

Use the specified password if the file is encrypted.

`pages`

Comma separated list of page numbers and ranges (for example: 1,5,10-15,20-N), where the character N denotes the last page. If no pages are specified, then all pages will be included.

## Poster

mutool poster \[options] input.pdf \[output.pdf]

The poster command splits each page into tiles, and puts each tile on a page of its own. It's useful for printing a large page onto smaller pieces of paper that can then be glued together to create a large poster.

`-p password`

Use the specified password if the file is encrypted.

`-x factor`

Split the page into this many horizontal pieces.

`-y factor`

Split the page into this many vertical pieces.

The output will have x times y number of pages for each input page.

## Show

mutool show \[options] file.pdf \[object numbers ...]

The show command will print the specified objects and streams to stdout. Streams are decoded and non-printable characters are represented with a period by default.

`-p password`

Use the specified password if the file is encrypted.

`-o file`

Write output to file instead of stdout.

`-b`

Print streams as binary data and omit the object header.

`-e`

Print streams in their original encoded (or compressed) form.

Specify objects by number, or use one of the following special names:

`'xref'`

Print the cross reference table.

`'trailer'`

Print the trailer dictionary.

`'encrypt'`

Print the encryption dictionary.

`'pagetree'`

List the object numbers for every page.

`'grep'`

Print all the objects in the file in a compact one-line format suitable for piping to grep.

`'outline'`

Print the outline (table of contents).

## Run

mutool run script.js \[arguments]

Executes a Javascript program which has access to most of the features of the MuPDF library. The command supports ECMAScript 5 syntax in strict mode. All of the MuPDF constructors and function live in the global object, and the command line arguments are accessible from the global argv object.

If invoke without any arguments, it will drop you into an interactive REPL (read-eval-print-loop). On the interactive prompt, if you prefix a line with an equal character it will automatically print the results of the line.

See the MuPDF documentation for details about the Javascript interfaces.

## Convert

mutool convert \[options] file \[pages]

The convert command is used to convert a file from one format to another.

`-p password`

Use the specified password if the file is encrypted.

`-A bits`

Specify how many bits of anti-aliasing to use. The default is 8.

`-W width`

Page width in points for EPUB layout.

`-H height`

Page height in points for EPUB layout.

`-S size`

Font size in points for EPUB layout.

`-U filename`

User CSS stylesheet for EPUB layout.

`-o output`

The output format is inferred from the output filename. Embed %d in the name to indicate the page number (for example: "page%d.png"). Printf modifiers are supported, for example "%03d". If no output is specified, the output will go to stdout.

`-F format`

Enforce a specific output format. Only necessary when outputting to stdout since normally the output filename is used to infer the output format.

`-O`

Comma separated list of format specific output options:

## Merge

mutool merge \[options] file1 \[pages] file2 \[pages] ...

The merge command is used to pick out pages from two or more files and merge them in order into a new output file.

`-o output`

The output filename.

`-O`

See mutool create for details on this option.

## Version

`mutool -v`

Shows the MuPDF version used to build mutool.

</details>
