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
***

## RAG/LLM and PDF: Enhanced Text Extraction

The convergence of PDF text extraction and LLM (*Large Language Model*) applications for RAG (*Retrieval-Augmented Generation*) scenarios is increasingly crucial for AI companies. While textual "data" remains the predominant raw material fed into LLMs, we also recognize that the **context** of text, along with its visual representations via tables, images, or graphics, is gaining significance.

**PyMuPDF** has the capability to extract text from PDFs (as well as other document formats), whether it's in the form of text, tables, images, or vector graphics. It can then transform this text into various desired formats, such as JSON, CSV, Excel, plain text, HTML, or XML.

As a result, we're witnessing a market trend favoring PyMuPDF, with a notable surge in interest across diverse sectors, including technology and AI-focused organizations.

![PyMuPDF delivers enhanced context for your RAG environment](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fhegrqzw3%2Fproduction%2F7f3e4416ac21b01b48d2574db6204d125d9730b9-1600x926.png&w=3840&q=75)

### PyMuPDF's Core Strengths

PyMuPDF is an indispensable tool for working with PDFs and other document formats:

- **Robust Data Extraction:** PyMuPDF excels at extracting and pre-processing data. Whether it’s text, annotations, tables, images, or vector graphics, PyMuPDF can handle it all.
- **Versatile Output Formats:** It allows you to convert extracted data into various formats, such as JSON, CSV, Excel, plain text, HTML, or XML. This flexibility is essential for integrating with different systems and workflows.
- **Efficiency and Speed:** PyMuPDF is optimized for performance, making it efficient even when dealing with large PDF files. It’s a great choice for batch processing or handling high volumes of documents.
- **Cross-Platform Compatibility:** PyMuPDF is available for multiple platforms, including Windows, Linux, macOS and devices based on ARM technologies (like smart devices). This cross-platform support ensures consistency across different environments.
- **Active Community and Documentation:** The PyMuPDF community actively maintains the library, providing regular updates and addressing issues promptly. Comprehensive documentation and examples are available to help users get started quickly.
- **Integration with Other Python Libraries:** PyMuPDF can seamlessly integrate with other Python libraries, allowing you to build comprehensive solutions. For example, combining it with Pandas or NumPy can enhance data manipulation capabilities and extend the range of output formats for instance to Excel, CSV, HDF, Markdown text and Word documents via package [pdf2docx](https://pypi.org/project/pdf2docx/).

Remember that PyMuPDF’s strengths extend beyond PDFs; it’s also adept at handling various document formats like XPS, EPUB, MOBI etc., making it a powerful asset for developers and data professionals.

Overall, PyMuPDF's efficiency, feature set, compatibility, Python integration, active development, and community support make it a suitable choice for integrating with Large Language Models, enabling tasks such as text extraction, preprocessing, and document manipulation, which are often required in Natural Language Processing workflows.

## Application in LLM

With LLM-related inquiries now forming the majority, PyMuPDF's role in AI data preprocessing is more crucial than ever. Applications range from integrating PyMuPDF for broad AI solutions to extracting and replacing images in documents, highlighting the library's versatility in the AI workflow.

PyMuPDF can play a significant role in the retrieval phase of the RAG (*Retrieval-Augmented Generation*) framework due to its capabilities in handling documents efficiently and extracting content from them.

### Here's how PyMuPDF can deliver for RAG

- **Data Extraction:** PyMuPDF allows you to extract text, tables, images and vector graphics from documents accurately and in a context-preserving way. This functionality is crucial for the retriever module in RAG, as it enables the system to access the content of PDF documents and identify relevant passages based on the input query.
- **Document Processing:** PyMuPDF provides features for processing PDF documents, such as splitting, merging, and manipulating pages. This can be useful for preprocessing documents before retrieval, such as splitting large documents into smaller sections or removing irrelevant pages.
- **Indexing:** PyMuPDF can assist in creating indexes or databases of document content. By extracting text and organizing it in a structured format, PyMuPDF enables efficient searching and retrieval of information during the retrieval phase of RAG.
- **Efficiency:** PyMuPDF is known for its efficiency. It is designed to be fast and lightweight, making it suitable for processing large volumes of documents efficiently. This efficiency is essential in the RAG framework, where the retriever module needs to quickly scan through a large corpus of documents to find relevant passages.
- **Integration with Python Libraries:** Since PyMuPDF is a Python binding, it can easily integrate with other Python libraries commonly used in NLP tasks, such as transformers for generation and [**spaCy**](https://spacy.io/) for text processing. This integration allows for seamless communication between the retriever and generator modules in the RAG framework.

Overall, PyMuPDF's capabilities in text extraction, document processing, indexing, efficiency, and integration with Python libraries make it well-suited for the retrieval phase of the RAG framework. By leveraging PyMuPDF, developers can efficiently access and process the content of documents, enabling effective retrieval of relevant information to enhance the performance of RAG-based NLP systems.

## Technical Deep Dive

Inquiries emphasize the demand for features like detailed text extraction, image and vector graphics retrieval, catering to specialized needs such as regulatory compliance. PyMuPDF's ability to maintain data integrity and completeness is especially valued in these contexts.

### Featured highlights

- **Text** can be extracted in multiple detail levels, ranging from plain text with line breaks, over single words with position information, to full detail in JSON format, which includes information with block and line level aggregation, text orientation, writing direction (significant for right-to-left languages), font properties and text color.
- **Tables** can be identified and extracted with high fidelity. In contrast to most other packages, this includes full support of non-horizontal cell text. Full information is provided about the table’s and each cell’s position on the page. Beyond cell extraction output to Python’s built-in data containers (lists), there is integrated support for transformation to Pandas. This extends the output format range to Excel, JSON, CSV, HDF, markdown tables and a dozen of other formats.
- **Images** can be extracted in the original format (PNG, JPEG, etc.) and resolution (DPI), accompanied by all metadata, position coordinates on the page and full image transformation information in JSON format.
- **Vector graphics** can be extracted in all detail (down to each single drawing command) and also aggregated to the full Gantt or Pie chart. Again, data is delivered in JSON format with enough information to even recreate the graphics on some other page or device.

## Conclusion

PyMuPDF's ascent as an essential tool for AI companies, particularly in LLM applications, is undeniable. It distinguishes itself by enriching text extraction and enabling intricate data handling, characterized by its rapidity, precision, and secure, local functionality. As the AI landscape evolves, the strategic integration of PyMuPDF into your text extraction and processing workflows can significantly enhance your capabilities and efficiency.

Ready to elevate your LLM applications with PyMuPDF? Explore our documentation, join our community, and start transforming your document management processes today. Dive deeper into PyMuPDF and unlock your AI potential - [Explore PyMuPDF](https://pymupdf.readthedocs.io/en/latest/) today!

***

## Introduction

In the context of **Large Language Models (LLMs)** and **Retrieval-Augmented Generation (RAG)** environments, data feeding in **markdown text format** holds **significant importance**. Here are some detailed considerations.

**LLMs** are powerful language models that can generate coherent and contextually relevant text. However, they may sometimes produce responses that lack factual accuracy or context. By incorporating retrieval-based methods (like RAG), we can enhance the quality of generated text.

**RAG** enables the integration of **external data**—previously absent in the LLM’s training data—into the text generation process. This inclusion mitigates “hallucination issues'' and enhances the relevance of text responses.

## Why Markdown for LLM?

**Markdown** is a lightweight markup language that allows users to format plain text using simple syntax. It is widely used for creating structured documents, especially on platforms like GitHub, Jupyter notebooks, and various content management systems. When feeding data into an LLM or RAG system, using markdown format provides several benefits:

1. **Structured Content**: Markdown allows you to organize information into headings, lists, tables, and other structured elements. This structure aids in better understanding and context preservation.
2. **Rich Text**: Markdown supports basic formatting such as bold, italics, links, and code blocks. Including rich text in the input data enhances the context for the language model.
3. **Embedding Links and References**: Markdown lets you embed hyperlinks, footnotes, and references. In RAG scenarios, this can be crucial for referring to external sources or providing additional context.
4. **Ease of Authoring**: Markdown is human-readable and easy to write. Authors can create content efficiently without complex formatting tools.
5. **Chunking**: Essential for RAG systems, chunking (otherwise known as “splitting”) breaks down extensive documents for easier processing. With PyMuPDF data extraction available in MD format we support chunking to keep text with common context together**. Importantly PyMuPDF extraction in MD format allows for** **[Level 3 chunking](https://medium.com/@anuragmishra_27746/five-levels-of-chunking-strategies-in-rag-notes-from-gregs-video-7b735895694d#b123).**

In summary, using markdown text format in LLM and RAG environments ensures more accurate and relevant results because it supplies richer data structures and more relevant data chunk loads to your LLM.

## PyMuPDF Support for Markdown Conversion of a PDF

Since inception PyMuPDF can extract text, images, vector graphics and, since August 2023, also tables from PDF pages. Each of these object types has its own extraction method: there is one for text, and yet others for tables, images and vector graphics. To meet the requirements of RAG, we merged these disparate extractions to produce one common, unified **Markdown** string which consistently represents the page’s content as a whole.

All this is implemented as [one Python script](https://github.com/pymupdf/RAG/blob/main/pymupdf4llm/pymupdf4llm/helpers/pymupdf_rag.py). It can be imported as a module by some other script, or be invoked as a line command in a terminal window like this:

**`$ python pymupdf_rag.py input.pdf [-pages PAGES]`**

It will produce a text file (called `input.md`) in **Markdown** format. The optional parameter `PAGES` allows restricting the conversion to a subset of the PDF’s total pages. If omitted, the full PDF is processed.

## Markdown Creation Details

## Selecting Pages to Consider

The “`-pages`” parameter is a string consisting of desired page numbers (1-based) to consider for markdown conversion. Multiple page number specifications can be given, separated by commas. Each specification either is one integer or two integers separated by a “-“ hyphen, specifying a range of pages. Here is an example:

**`“-pages 1-10,15,20-N”`**

This would include pages 1 through 10, 15 and pages 20 through the end of the file (capital “N” is treated as the number of the last page).

## Identifying Headers

Upon invocation, the program examines all text on the given pages and finds the most frequently used font size. This value (and all smaller font sizes) is assumed to represent **body text**. Larger font sizes are assumed to represent **header text**.

Depending on their relative position in the font size hierarchy, header text will be prefixed with one or more markdown header `#`-tag characters.

## Identifying the Processing Mode per Page Area

All text on each page will first be classified as being either **standard** text or **table** text. Then the page content will be extracted from top to bottom converting everything to markdown format.

This is best explained by an example:

![This page shows content that represents typical situations](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fhegrqzw3%2Fproduction%2Fbb2b120420e11d56991f08a4a1fc8b56411d3a78-650x966.png&w=3840&q=75)

This page shows content, that represents typical situations:

- Two tables, having partly overlapping vertical positions. One table has no headers, the other one has **external** column headers.
- There is a **title** line and **headers** at multiple levels.
- The **body text** contains a variety of styling details like **bold**, *italic* and `inline code`.
- Ordered and unordered lists
- Code snippet

Layout analysis will determine three areas and select the appropriate processing modes: (1) text, (2) table, (3) text.

The generated Markdown text reflects the above faithfully – as much as at all possible in this format.

For an example, let us look at the output for the table with external headers:

**`|Column1|Column2|`**

**`|---|---|`**

**`|Cell (0, 0)|Cell (0, 1)|`**

**`|Cell (1, 0)|Cell (1, 1)|`**

**`|Cell (2, 0)|Cell (2, 1)|`**

This is GitHub-compatible format with the minimum possible token size – an important aspect for keeping feeds into RAG systems small.

**Column borders** are indicated by the “|” character. A text line is assumed to be a **table header** if it is followed by a line of the form “ **`|---|---| …`** “. The full **table definition** must be preceded and followed by at least one empty line.

Please note that for technical reasons markdown tables must have a header and thus will choose the first table row if no external header is available.

To confirm overall fidelity, here is how some Markdown parser processes the full page:

![How a Markdown parser processes the full page](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fhegrqzw3%2Fproduction%2Faaa213f1da569e2d3a28246403230645e6f95d25-609x716.png&w=3840&q=75)

## Invoking the Markdown Converter Programmatically

Instead of executing a program in the command line, Markdown conversion can also be requested by a program:

```python
import pymupdf4llm
md_text = pymupdf4llm.to_markdown("input.pdf")

# write markdown string to some file
output = open("out-markdown.md", "w")
output.write(md_text)
output.close()
```

Copy

## Conclusion

By integrating PyMuPDF’s extraction methods, the content of PDF pages will be faithfully converted to markdown text that can be used as input for RAG chatbots.

Remember, the key to a successful RAG chatbot lies in the quality and completeness of information it can access.

PyMuPDF-enabled markdown extraction ensures that this information from PDFs is not only possible but straightforward, showcasing the library's strength and developer-friendliness. Happy coding!
