# pandoc

`--pdf-engine` -> can be among a few choices, each much different than the other...
> *weasyprint = CLI tool with solid (though limited) support for styling.*
> *wkhtmltopdf = CLI tool with solid (though limited) support for styling.*
> pagedjs-cli -> appears to be similar to weasy & wkhtml...
> prince -> **professional** ($) javascript library for rendering HTML & PDF content.
> pdflatex, xelatex, lualatex, latexmk -> *hackable, wonderful*... **but probably not for web docs..**
> tectonic - **modernized** reimagination of `xelatex`
> pdfroff -> some bullshit only on Linux.
> typest -> this is literally like an IDE, but for fucking LaTeX. Honestly looks kinda cool (**$**)
---
### Opts & Feats In No Particular Order

`--include-in-header` -> for adding path(s) to one or more external CSS stylesheet(s).
> According to **Claude**, there is also a way to use `chromium`, which (I'd assume), will just 'Save as a PDF' the old standard way. In light of *all this other shit* i've had to learn to perform a simple fucking task.... I'm considering this. Or, this bitch be hallucinating.

```sh
$ pandoc --list-highlight-styles

    pygments
    tango
    zenburn
    kate
    monochrome
    breezedark
    haddock
```
> aye, zenburn and breezedark fuckin rock!



