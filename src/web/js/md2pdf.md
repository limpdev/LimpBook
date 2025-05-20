# 🐍 rpdf - HTML Rendered to PDF…

To convert Markdown files to styled PDFs with full HTML rendering, you can use a combination of tools that allow for conversion through an intermediate HTML step. Here’s a simple method using Python and several libraries:

* * *

## Palettes, Dark -> Light

> #02040A - Eight Ball
> 
> #0D1116 - Ruined Smores
> 
> #151B23 - Coarse Wool
> 
> #4493F8 - Sky Dancer

### Prerequisites

  1. **Install Python** : Ensure Python is installed on your system.
  2. **Install Required Libraries** : 
     * `pypandoc`: To convert Markdown to HTML.
     * `weasyprint`: To convert HTML to PDF with good support for styling.



You can install these using pip:
``` 
    pip install pypandoc weasyprint
    
```

### Script

Here’s a Python script that demonstrates the conversion process:
``` 
    import os
    import pypandoc
    from weasyprint import HTML
    
    def markdown_to_pdf(input_file, output_file):
        # Convert Markdown to HTML using Pandoc
        html_content = pypandoc.convert_file(input_file, 'html', format='md')
    
        # Save the HTML content to a temporary file
        temp_html_file = os.path.splitext(output_file)[0] + '.html'
        with open(temp_html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
    
        # Convert HTML to PDF using WeasyPrint
        HTML(string=html_content).write_pdf(output_file)
    
        # Clean up the temporary HTML file
        os.remove(temp_html_file)
    
    # Usage
    input_markdown = 'example.md'
    output_pdf = 'output.pdf'
    
    markdown_to_pdf(input_markdown, output_pdf)
    
```

### Explanation

  1. **Markdown to HTML Conversion** :

     * The script uses `pypandoc` to convert the Markdown file to an HTML string.
  2. **HTML to PDF Conversion** :

     * It then uses `weasyprint` to render the HTML content into a PDF file, preserving the styles and formatting.
  3. **Temporary File Handling** :

     * A temporary HTML file is created during the process, which is cleaned up after conversion.



### Additional Considerations

  * **Styling** : Ensure that your Markdown files include proper styling with CSS if you want to control how they look in the PDF.
  * **Dependencies** : `pypandoc` requires Pandoc to be installed on your system. You can download it from [Pandoc’s website](https://pandoc.org/installing.html) and follow the installation instructions.



This method provides a straightforward way to convert Markdown files into styled PDFs while preserving formatting and styles through an HTML intermediate step.

* * *

# 🐍 Enabling Command-Line Arguments…

Certainly! If you want to make your script more versatile by accepting command-line arguments for both the input Markdown file and the output PDF file, you can use Python’s `argparse` library. Below is an updated version of the script with these changes:
``` 
    import os
    import pypandoc
    from weasyprint import HTML
    import argparse
    
    def markdown_to_pdf(input_file, output_file):
        # Convert Markdown to HTML using Pandoc
        html_content = pypandoc.convert_file(input_file, 'html', format='md')
    
        # Save the HTML content to a temporary file
        temp_html_file = os.path.splitext(output_file)[0] + '.html'
        with open(temp_html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
    
        # Convert HTML to PDF using WeasyPrint
        HTML(string=html_content).write_pdf(output_file)
    
        # Clean up the temporary HTML file
        os.remove(temp_html_file)
    
    if __name__ == "__main__":
        parser = argparse.ArgumentParser(description='Convert a Markdown file to a styled PDF')
        parser.add_argument('input_markdown', type=str, help='Path to the input markdown file')
        parser.add_argument('output_pdf', type=str, help='Path to the output pdf file')
    
        args = parser.parse_args()
    
        # Run the conversion
        markdown_to_pdf(args.input_markdown, args.output_pdf)
    
```

### How to Use the Script

  1. **Save the script** as `markdown_to_pdf.py`.
  2. **Run the script** from the command line, providing the paths for both the input Markdown file and the output PDF file:


``` 
    python markdown_to_pdf.py example.md output.pdf
    
```

### Explanation of Changes

  * **`argparse` Library**: This library is used to handle command-line arguments. It makes it easy to specify options and provides helpful error messages if the user does not provide the correct input.

  * **Argument Parsing** :

    * `input_markdown`: Path to the Markdown file you want to convert.
    * `output_pdf`: Desired path for the output PDF file.



This setup allows you to easily convert any Markdown file to a styled PDF by just passing the appropriate arguments when running the script.
