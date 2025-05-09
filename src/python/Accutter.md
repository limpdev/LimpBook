---
aliases: []
sticker: emoji//1f40d
tags: py
---
---
### **<span style='color:var(--mk-color-pink)'>Purpose</span>**
>Split, Organize, and Group hundreds of PDF documents in milliseconds with <span style='color:var(--mk-color-teal)'>Accutter</span>, and a little regex
---
## **<span style='color:var(--mk-color-pink)'>Formula</span>** - <span style='color:var(--mk-color-blue)'>Accutter</span>

```python
import re
import argparse
import logging
from PyPDF2 import PdfReader, PdfWriter
import os
import tkinter as tk
from tkinter import filedialog
import subprocess

def setup_logging():
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    return logging.getLogger(__name__)
   
def sanitize_filename(filename):
    return re.sub(r'[^\w\-_\. ]', '_', filename)

def process_pdf(input_pdf_path, output_dir):
    logger = setup_logging()
    # Regex patterns to extract Account and Check#
    account_pattern = re.compile(r"Account:\s*(.+?)\s*Event")
    check_pattern = re.compile(r"Check#:\s*(\d+)")
    # Store pages grouped by Check#
    check_pages = {}
    check_accounts = {}
    try:
        reader = PdfReader(input_pdf_path)
    except Exception as e:
        logger.error(f"Error opening PDF file: {e}")
        return
    # Iterate over each page
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        check_match = check_pattern.search(text)
        account_match = account_pattern.search(text)
        if check_match:
            check_number = check_match.group(1).strip()
            if check_number not in check_pages:
                check_pages[check_number] = []
            check_pages[check_number].append(page_num)
            if account_match:
                check_accounts[check_number] = account_match.group(1).strip()
            elif check_number not in check_accounts:
                check_accounts[check_number] = "Unknown_Account"
    # Create individual PDFs for each Check#
    for check_number, page_numbers in check_pages.items():
        writer = PdfWriter()
        for page_num in page_numbers:
            writer.add_page(reader.pages[page_num])
        account_name = check_accounts.get(check_number, "Unknown_Account")
        filename = sanitize_filename(f"{account_name}_{check_number}.pdf")
        output_pdf_path = os.path.join(output_dir, filename)
        try:
            with open(output_pdf_path, "wb") as output_pdf:
                writer.write(output_pdf)
            logger.info(f"Created PDF: {filename}")
        except Exception as e:
            logger.error(f"Error writing PDF {filename}: {e}")
    logger.info("PDF processing completed.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split PDF by Check number")
    parser.add_argument("input_pdf", help="Path to the input PDF file")
    parser.add_argument("output_dir", help="Directory to save output PDFs")
    args = parser.parse_args()
    os.makedirs(args.output_dir, exist_ok=True)
    process_pdf(args.input_pdf, args.output_dir)
    subprocess.run(["python", "AccMerg.py"])

	# AccMerge.py will handle the merge process...

```
---
## <span style='color:var(--mk-color-pink)'>Finalé</span> - <span style='color:var(--mk-color-blue)'>AccMerge</span>
---
- [ ] Once <span style='color:var(--mk-color-pink)'>Accutter</span> has spliced all of the banquet checks into individual pages, <span style='color:var(--mk-color-pink)'>AccMerge</span> will merge all individual check files by common account names...

```python
import os
import re
from collections import defaultdict
from PyPDF2 import PdfReader, PdfWriter
from datetime import datetime

# Configuration
INPUT_DIR = './Splits' 
# Directory containing the split PDF files
OUTPUT_DIR = './Merged'  
# Directory to save the combined PDFs
# Ensure the output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def parse_filename(filename):
# Parses the filename to extract the account name and check number.
# Expected filename format: 'AccountName_CheckNumber.pdf'
#  -> Returns:
#  -->	tuple: (account_name, check_number) or (None, None) if parsing fails
    pattern = r'^(.*?)_(\d+)\.pdf$'
    match = re.match(pattern, filename, re.IGNORECASE)
    if match:
        account_name = match.group(1).strip()
        check_number = match.group(2).strip()
        return account_name, check_number
    return None, None

def get_file_modification_date(filepath):
    # Retrieves the file's modification date.
    # Returns:
    # -> datetime: The modification date as a datetime object
    timestamp = os.path.getmtime(filepath)
    return datetime.fromtimestamp(timestamp)
def group_files_by_account(files, input_dir):
    # Groups files by account name.
    # Returns:
    #     dict: A dictionary where keys are account names and values are lists of file paths
    account_groups = defaultdict(list)
    for file in files:
        account_name, check_number = parse_filename(file)
        if account_name and check_number:
            filepath = os.path.join(input_dir, file)
            mod_date = get_file_modification_date(filepath)
            account_groups[account_name].append((filepath, mod_date))
        else:
            print(f"Skipping unrecognized file format: {file}")
    return account_groups

def combine_pdfs(filepaths, output_path):
    # Combines multiple PDF files into a single PDF.
    # Args:
    #    filepaths (list): List of PDF file paths to combine
    #    output_path (str): Path to save the combined PDF
    pdf_writer = PdfWriter()
    for filepath in filepaths:
        pdf_reader = PdfReader(filepath)
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)
    with open(output_path, 'wb') as out_file:
        pdf_writer.write(out_file)
    print(f"Combined PDF saved to: {output_path}")
   
def main():
    # Step 1: List all PDF files in the input directory
    all_files = os.listdir(INPUT_DIR)
    pdf_files = [f for f in all_files if f.lower().endswith('.pdf')]
    print(f"Found {len(pdf_files)} PDF files in '{INPUT_DIR}' directory.")
    # Step 2: Group files by account name
    account_groups = group_files_by_account(pdf_files, INPUT_DIR)
    print(f"Grouping complete. Found {len(account_groups)} accounts.")
    # Step 3: For each account, sort the files by modification date and combine them
    for account, files in account_groups.items():
        print(f"\nProcessing account: {account}")
        # Sort files by modification date (oldest to newest)
        sorted_files = sorted(files, key=lambda x: x[1])
        sorted_filepaths = [f[0] for f in sorted_files]
        # Define the output PDF filename
        safe_account_name = re.sub(r'[\\/*?:"<>|]', "_", account)  # Replace illegal filename chars
        output_pdf_filename = f"{safe_account_name}_combined.pdf"
        output_pdf_path = os.path.join(OUTPUT_DIR, output_pdf_filename)
        # Combine the sorted PDFs
        combine_pdfs(sorted_filepaths, output_pdf_path)
    print("\nAll accounts have been processed and combined PDFs are saved.")
if __name__ == "__main__":
    main()
   
```
---
### **Performance**
>  With an input of banquets checks (around 200-300 pages), <span style='color:var(--mk-color-pink)'>Accutter</span> is **speedy**. From execution to maturity, the script takes around 300 milliseconds to fulfill all of its tasks.
>  <span style='color:var(--mk-color-pink)'>Accutter</span> can be called upon using the following syntax structure:

```zsh
$ python Accutter.py "path/to/input.pdf" "path/to/output/folder"

```
> ... Where the first argument passed to the command is the banquet checks and the second argument is the output <span style='color:var(--mk-color-teal)'>location</span>, <span style='color:var(--mk-color-red)'>not file</span>!
