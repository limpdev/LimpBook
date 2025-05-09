# PyMuPDF4LLM

PyMuPDF4LLM is aimed to make it easier to extract **PDF** content in the format you need for **LLM** &amp; **RAG** environments. It supports [Markdown extraction](#extracting-as-md) as well as [LlamaIndex document output](#extracting-as-llamaindex).

Important

You can extend the supported file types to also include **Office** document formats (DOC/DOCX, XLS/XLSX, PPT/PPTX, HWP/HWPX) by [using PyMuPDF Pro with PyMuPDF4LLM](#using-pymupdf4llm-withpymupdfpro).

## Features

> - Support for multi-column pages
> - Support for image and vector graphics extraction (and inclusion of references in the MD text)
> - Support for page chunking output.
> - Direct support for output as [LlamaIndex Documents](#extracting-as-llamaindex).

## Functionality

- This package converts the pages of a file to text in **Markdown** format using PyMuPDF.
- Standard text and tables are detected, brought in the right reading sequence and then together converted to **GitHub**-compatible **Markdown** text.
- Header lines are identified via the font size and appropriately prefixed with one or more `#` tags.
- Bold, italic, mono-spaced text and code blocks are detected and formatted accordingly. Similar applies to ordered and unordered lists.
- By default, all document pages are processed. If desired, a subset of pages can be specified by providing a list of `0`-based page numbers.

## Installation

Install the package via **pip** with:

```python
pip install pymupdf4llm
```

## Extracting a file as **Markdown**

To retrieve your document content in **Markdown** simply install the package and then use a couple of lines of **Python** code to get results.

Then in your **Python** script do:

```python
import pymupdf4llm
md_text = pymupdf4llm.to_markdown("input.pdf")
```

Note

Instead of the filename string as above, one can also provide a [PyMuPDF Document](https://pymupdf.readthedocs.io/en/latest/document.html#document). A second parameter may be a list of `0`-based page numbers, e.g. `[0,1]` would just select the first and second pages of the document.

If you want to store your **Markdown** file, e.g. store as a UTF8-encoded file, then do:

```python
import pathlib
pathlib.Path("output.md").write_bytes(md_text.encode())
```

## Extracting a file as a **LlamaIndex** document

PyMuPDF4LLM supports direct conversion to a **LLamaIndex** document. A document is first converted into **Markdown** format and then a **LlamaIndex** document is returned as follows:

```python
import pymupdf4llm
llama_reader = pymupdf4llm.LlamaMarkdownReader()
llama_docs = llama_reader.load_data("input.pdf")
```

## Using with PyMuPDF Pro

For **Office** document support, PyMuPDF4LLM works seamlessly with PyMuPDF Pro. Assuming you have [PyMuPDF Pro](https://pymupdf.readthedocs.io/en/latest/pymupdf-pro.html) installed you will be able to work with **Office** documents as expected:

```python
import pymupdf4llm
import pymupdf.pro
pymupdf.pro.unlock()
md_text = pymupdf4llm.to_markdown("sample.doc")
```

As you can see PyMuPDF Pro functionality will be available within the PyMuPDF4LLM context!
