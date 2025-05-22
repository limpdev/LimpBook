#  CODE → PROMPT

<details><summary>📦<i>COMMANDLINE FLAGS</i></summary>

```bash
Usage: code2prompt [OPTIONS] <PATH>

Arguments:
  <PATH>
          Path to the codebase directory

Options:
      --include <INCLUDE>
          Patterns to include

      --exclude <EXCLUDE>
          Patterns to exclude

      --include-priority
          Include files in case of conflict between include and exclude patterns

      --exclude-from-tree
          Exclude files/folders from the source tree based on exclude patterns

      --tokens
          Display the token count of the generated prompt

  -c, --encoding <ENCODING>
          Optional tokenizer to use for token count

          Supported tokenizers: cl100k (default), p50k, p50k_edit, r50k, gpt2

  -o, --output <OUTPUT>
          Optional output file path

  -d, --diff
          Include git diff

      --git-diff-branch <BRANCHES>
          Generate git diff between two branches

      --git-log-branch <BRANCHES>
          Retrieve git log between two branches

  -l, --line-number
          Add line numbers to the source code

      --no-codeblock
          Disable wrapping code inside markdown code blocks

      --relative-paths
          Use relative paths instead of absolute paths, including the parent directory

      --no-clipboard
          Optional Disable copying to clipboard

  -t, --template <TEMPLATE>
          Optional Path to a custom Handlebars template

      --json
          Print output as JSON

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```

</details>

---

[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [What is Code2Prompt?](#what-is-code2prompt)
- [📥 Installation](#-installation)
- [🏁 Generating Prompts: A CLI Example](#-generating-prompts-a-cli-example)
- [🐍 SDK Integration (Python)](#-sdk-integration-python)
- [🤖 MCP Server Integration (Advanced)](#-mcp-server-integration-advanced)

## On this page

- [Overview](#_top)
- [What is Code2Prompt?](#what-is-code2prompt)
- [📥 Installation](#-installation)
- [🏁 Generating Prompts: A CLI Example](#-generating-prompts-a-cli-example)
- [🐍 SDK Integration (Python)](#-sdk-integration-python)
- [🤖 MCP Server Integration (Advanced)](#-mcp-server-integration-advanced)

# Getting Started with Code2Prompt

Tutorial Overview

Welcome to Code2Prompt! This tutorial provides a comprehensive introduction to using Code2Prompt to generate AI-ready prompts from your codebases. We’ll explore its core functionality and demonstrate its usage across different integration methods: Command Line Interface (CLI), Software Development Kit (SDK), and Model Context Protocol (MCP).

## What is Code2Prompt?

[Section titled “What is Code2Prompt?”](#what-is-code2prompt)

Code2Prompt is a versatile tool designed to bridge the gap between your codebase and Large Language Models (LLMs). It intelligently extracts relevant code snippets, applies powerful filtering, and formats the information into structured prompts optimized for LLM consumption. This simplifies tasks like code documentation, bug detection, refactoring, and more.

Code2Prompt offers different integration points:

- [Core](#tab-panel-0)
- [CLI](#tab-panel-1)
- [SDK](#tab-panel-2)
- [MCP](#tab-panel-3)

A core rust library that provides the foundation for code ingestion and prompt

A user-friendly command-line interface for quick prompt generation. Ideal for interactive use and one-off tasks.

A powerful Software Development Kit (SDK) for seamless integration into your Python projects. Perfect for automating prompt generation within larger workflows.

A Model Context Protocol (MCP) server for advanced integration with LLM agents. Enables sophisticated, real-time interactions with your codebase.

## 📥 Installation

[Section titled “📥 Installation”](#-installation)

For detailed installation instructions for all methods (CLI, SDK, MCP), please refer to the comprehensive [Installation Guide](/docs/how_to/install).

## 🏁 Generating Prompts: A CLI Example

[Section titled “🏁 Generating Prompts: A CLI Example”](#-generating-prompts-a-cli-example)

Let’s start with a simple example using the CLI. Create a sample project:

Terminal window

```

mkdir -p my_project/{src,tests}

touch my_project/src/main.rs my_project/tests/test_1.rs

echo 'fn main() { println!("Hello, world!"); }' > my_project/src/main.rs
```

Now, generate a prompt:

Terminal window

```

code2prompt my_project
```

This copies a prompt to your clipboard. You can customize this:

- **Filtering:** `code2prompt my_project --include="*.rs" --exclude="tests/*"` (includes only `.rs` files, excludes `tests` directory)
- **Output File:** `code2prompt my_project --output-file=my_prompt.txt`
- **JSON Output:** `code2prompt my_project -O json` (structured JSON output)
- **Custom Templates:** `code2prompt my_project -t my_template.hbs` (requires creating `my_template.hbs`)

See the [Learn Context Filtering](/docs/tutorials/learn_filters) and [Learn Handlebar Templates](/docs/tutorials/learn_templates) tutorials to learn more advanced usages.

## 🐍 SDK Integration (Python)

[Section titled “🐍 SDK Integration (Python)”](#-sdk-integration-python)

For programmatic control, use the Python SDK:

```

from code2prompt_rs import Code2Prompt

config = {

    "path": "my_project",

    "include_patterns": ["*.rs"],

    "exclude_patterns": ["tests/*"],

}

c2p = Code2Prompt(**config)

prompt = c2p.generate_prompt()

print(prompt)
```

This requires installing the SDK (`pip install code2prompt_rs`). Refer to the SDK documentation for more details.

## 🤖 MCP Server Integration (Advanced)

[Section titled “🤖 MCP Server Integration (Advanced)”](#-mcp-server-integration-advanced)

For advanced integration with LLM agents, run the `code2prompt` MCP server (see the installation guide for details). This allows agents to request code context dynamically. This is an advanced feature, and further documentation is available on the project’s website.

Next Steps

Explore the advanced tutorials and documentation to master Code2Prompt’s capabilities and integrate it into your workflows.

[Next
Learn Templating](/docs/tutorials/learn_templates)
[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [Prerequisites](#prerequisites)
- [Understanding Include and Exclude Patterns](#understanding-include-and-exclude-patterns)
- [Setting Up the Environment](#setting-up-the-environment)

    - [Bash Script to Generate the Test Structure](#bash-script-to-generate-the-test-structure)

- [Examples: Filtering Files with Include and Exclude Patterns](#examples-filtering-files-with-include-and-exclude-patterns)

    - [Case 1: No Include, No Exclude](#case-1-no-include-no-exclude)
    - [Case 2: Exclude Specific File Types](#case-2-exclude-specific-file-types)
    - [Case 3: Include Specific File Types](#case-3-include-specific-file-types)
    - [Case 4: Include and Exclude with Priority](#case-4-include-and-exclude-with-priority)

- [Summary](#summary)

## On this page

- [Overview](#_top)
- [Prerequisites](#prerequisites)
- [Understanding Include and Exclude Patterns](#understanding-include-and-exclude-patterns)
- [Setting Up the Environment](#setting-up-the-environment)

    - [Bash Script to Generate the Test Structure](#bash-script-to-generate-the-test-structure)

- [Examples: Filtering Files with Include and Exclude Patterns](#examples-filtering-files-with-include-and-exclude-patterns)

    - [Case 1: No Include, No Exclude](#case-1-no-include-no-exclude)
    - [Case 2: Exclude Specific File Types](#case-2-exclude-specific-file-types)
    - [Case 3: Include Specific File Types](#case-3-include-specific-file-types)
    - [Case 4: Include and Exclude with Priority](#case-4-include-and-exclude-with-priority)

- [Summary](#summary)

# Learn Context Filtering with Code2Prompt

Tutorial Overview

This tutorial demonstrates how to use the **glob pattern tool** in `code2prompt` CLI to filter and manage files based on include and exclude patterns.

Glob patterns work similarly to tools like `tree` or `grep`, providing powerful filtering capabilities. Check out the [detailed explanation](/docs/explanations/glob_patterns) for more information.

---

## Prerequisites

[Section titled “Prerequisites”](#prerequisites)

Ensure you have `code2prompt` installed. If you haven’t installed it yet, refer to the [Installation Guide](/docs/how_to/install).

---

## Understanding Include and Exclude Patterns

[Section titled “Understanding Include and Exclude Patterns”](#understanding-include-and-exclude-patterns)

Glob patterns allow you to specify rules for filtering files and directories.

- **Include Patterns** (`--include`): Specify files and directories you want to include.
- **Exclude Patterns** (`--exclude`): Specify files and directories you want to exclude.
- **Priority** (`--include-priority`): Resolves conflicts between include and exclude patterns.

---

## Setting Up the Environment

[Section titled “Setting Up the Environment”](#setting-up-the-environment)

To practice with glob patterns, let’s create a sample folder structure with some files.

### Bash Script to Generate the Test Structure

[Section titled “Bash Script to Generate the Test Structure”](#bash-script-to-generate-the-test-structure)

Run this script to set up a temporary directory structure:

```

#!/bin/bash

# Create base directory

mkdir -p test_dir/{lowercase,uppercase,.secret}

# Create files in the structure

echo "content foo.py" > "test_dir/lowercase/foo.py"

echo "content bar.py" > "test_dir/lowercase/bar.py"

echo "content baz.py" > "test_dir/lowercase/baz.py"

echo "content qux.txt" > "test_dir/lowercase/qux.txt"

echo "content corge.txt" > "test_dir/lowercase/corge.txt"

echo "content grault.txt" > "test_dir/lowercase/grault.txt"

echo "CONTENT FOO.py" > "test_dir/uppercase/FOO.PY"

echo "CONTENT BAR.py" > "test_dir/uppercase/BAR.PY"

echo "CONTENT BAZ.py" > "test_dir/uppercase/BAZ.PY"

echo "CONTENT QUX.txt" > "test_dir/uppercase/QUX.TXT"

echo "CONTENT CORGE.txt" > "test_dir/uppercase/CORGE.TXT"

echo "CONTENT GRAULT.txt" > "test_dir/uppercase/GRAULT.TXT"

echo "top secret" > "test_dir/.secret/secret.txt"
```

To clean up the structure later, run:

Terminal window

```

rm -rf test_dir
```

It will create the following directory structure:

- test_dir - lowercase - foo.py - bar.py - baz.py - qux.txt - corge.txt - grault.txt - uppercase - FOO.PY - BAR.PY - BAZ.PY - QUX.txt - CORGE.txt - GRAULT.txt - .secret - secret.txt

---

## Examples: Filtering Files with Include and Exclude Patterns

[Section titled “Examples: Filtering Files with Include and Exclude Patterns”](#examples-filtering-files-with-include-and-exclude-patterns)

### Case 1: No Include, No Exclude

[Section titled “Case 1: No Include, No Exclude”](#case-1-no-include-no-exclude)

Command:

Terminal window

```

code2prompt test_dir
```

#### Result

[Section titled “Result”](#result)

All files are included:

- `lowercase/foo.py`
- `lowercase/bar.py`
- `uppercase/FOO.py`
- `.secret/secret.txt`

---

### Case 2: Exclude Specific File Types

[Section titled “Case 2: Exclude Specific File Types”](#case-2-exclude-specific-file-types)

Exclude `.txt` files:

Terminal window

```

code2prompt test_dir --exclude="*.txt"
```

#### Result

[Section titled “Result”](#result-1)

Excluded:

- All `.txt` files

Included:

- `lowercase/foo.py`
- `lowercase/bar.py`
- `uppercase/FOO.py`

---

### Case 3: Include Specific File Types

[Section titled “Case 3: Include Specific File Types”](#case-3-include-specific-file-types)

Include only Python files:

Terminal window

```

code2prompt test_dir --include="*.py"
```

#### Result

[Section titled “Result”](#result-2)

Included:

- All `.py` files

Excluded:

- `.secret/secret.txt`

---

### Case 4: Include and Exclude with Priority

[Section titled “Case 4: Include and Exclude with Priority”](#case-4-include-and-exclude-with-priority)

Include `.py` files but exclude files in the `uppercase` folder:

Terminal window

```

code2prompt test_dir --include="*.py" --exclude="**/uppercase/*" --include-priority=true
```

#### Result

[Section titled “Result”](#result-3)

Included:

- All `lowercase/1` files having `.py` extension

Excluded:

- All `uppercase` files
- `.secret/secret.txt`

---

## Summary

[Section titled “Summary”](#summary)

The glob pattern tool in `code2prompt` allows you to filter files and directories effectively using:

- `--include` for specifying files to include
- `--exclude` for files to exclude
- `--include-priority` for resolving conflicts between patterns

To practice, set up the sample directory, try out the commands, and see how the tool filters files dynamically.

[Previous
Learn Templating](/docs/tutorials/learn_templates) [Next
What are Glob Patterns?](/docs/explanations/glob_patterns)
[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [Prerequisites](#prerequisites)
- [What are Handlebars Templates ?](#what-are-handlebars-templates)
- [How to use Handlebars Templates ?](#how-to-use-handlebars-templates)
- [Template Syntax](#template-syntax)
- [Existing Templates](#existing-templates)

    - [document-the-code.hbs](#document-the-codehbs)
    - [find-security-vulnerabilities.hbs](#find-security-vulnerabilitieshbs)
    - [clean-up-code.hbs](#clean-up-codehbs)
    - [fix-bugs.hbs](#fix-bugshbs)
    - [write-github-pull-request.hbs](#write-github-pull-requesthbs)
    - [write-github-readme.hbs](#write-github-readmehbs)
    - [write-git-commit.hbs](#write-git-commithbs)
    - [improve-performance.hbs](#improve-performancehbs)

- [User Defined Variables](#user-defined-variables)

## On this page

- [Overview](#_top)
- [Prerequisites](#prerequisites)
- [What are Handlebars Templates ?](#what-are-handlebars-templates)
- [How to use Handlebars Templates ?](#how-to-use-handlebars-templates)
- [Template Syntax](#template-syntax)
- [Existing Templates](#existing-templates)

    - [document-the-code.hbs](#document-the-codehbs)
    - [find-security-vulnerabilities.hbs](#find-security-vulnerabilitieshbs)
    - [clean-up-code.hbs](#clean-up-codehbs)
    - [fix-bugs.hbs](#fix-bugshbs)
    - [write-github-pull-request.hbs](#write-github-pull-requesthbs)
    - [write-github-readme.hbs](#write-github-readmehbs)
    - [write-git-commit.hbs](#write-git-commithbs)
    - [improve-performance.hbs](#improve-performancehbs)

- [User Defined Variables](#user-defined-variables)

# Learn Handlebar Templates with Code2Prompt

Tutorial Overview

This tutorial demonstrates how to use and create custom Handlebars templates for prompt generation in `code2prompt` CLI.

---

## Prerequisites

[Section titled “Prerequisites”](#prerequisites)

Ensure you have `code2prompt` installed. If you haven’t installed it yet, refer to the [Installation Guide](/docs/how_to/install).

---

## What are Handlebars Templates ?

[Section titled “What are Handlebars Templates ?”](#what-are-handlebars-templates)

[Handlebars](https://handlebarsjs.com/) is a popular templating engine that allows you to create dynamic templates using placeholders. In `code2prompt`, Handlebars templates are used to format the generated prompts based on the codebase structure and user-defined variables.

## How to use Handlebars Templates ?

[Section titled “How to use Handlebars Templates ?”](#how-to-use-handlebars-templates)

You can use these templates by passing the `-t` or `--template` flag followed by the path to the template file. For example:

Terminal window

```

code2prompt path/to/codebase -t templates/document-the-code.hbs
```

## Template Syntax

[Section titled “Template Syntax”](#template-syntax)

Handlebars templates use a simple syntax for placeholders and expressions. You will place variables in double curly braces `{{variable_name}}` to include them in the generated prompt. `Code2prompt` provides a set of default variables that you can use in your templates:

- `absolute_code_path`: The absolute path to the codebase.
- `source_tree`: The source tree of the codebase, which includes all files and directories.
- `files`: A list of files in the codebase, including their paths and contents.
- `git_diff`: The git diff of the codebase, if applicable.
- `code`: The code content of the file being processed.
- `path`: The path of the file being processed.

You can also use Handlebars helpers to perform conditional logic, loops, and other operations within your templates. For example:

```

{{#if files}}

  {{#each files}}

    File:

    {{this.path}}

    Content:

    {{this.content}}

  {{/each}}

{{else}}

  No files found.

{{/if}}
```

---

## Existing Templates

[Section titled “Existing Templates”](#existing-templates)

`code2prompt` comes with a set of built-in templates for common use cases. You can find them in the [`templates`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates) directory.

### [`document-the-code.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/document-the-code.hbs)

[Section titled “document-the-code.hbs”](#document-the-codehbs)

Use this template to generate prompts for documenting the code. It will add documentation comments to all public functions, methods, classes and modules in the codebase.

### [`find-security-vulnerabilities.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/find-security-vulnerabilities.hbs)

[Section titled “find-security-vulnerabilities.hbs”](#find-security-vulnerabilitieshbs)

Use this template to generate prompts for finding potential security vulnerabilities in the codebase. It will look for common security issues and provide recommendations on how to fix or mitigate them.

### [`clean-up-code.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/clean-up-code.hbs)

[Section titled “clean-up-code.hbs”](#clean-up-codehbs)

Use this template to generate prompts for cleaning up and improving the code quality. It will look for opportunities to improve readability, adherence to best practices, efficiency, error handling, and more.

### [`fix-bugs.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/fix-bugs.hbs)

[Section titled “fix-bugs.hbs”](#fix-bugshbs)

Use this template to generate prompts for fixing bugs in the codebase. It will help diagnose issues, provide fix suggestions, and update the code with proposed fixes.

### [`write-github-pull-request.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/write-github-pull-request.hbs)

[Section titled “write-github-pull-request.hbs”](#write-github-pull-requesthbs)

Use this template to create GitHub pull request description in markdown by comparing the git diff and git log of two branches.

### [`write-github-readme.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/write-github-readme.hbs)

[Section titled “write-github-readme.hbs”](#write-github-readmehbs)

Use this template to generate a high-quality README file for the project, suitable for hosting on GitHub. It will analyze the codebase to understand its purpose and functionality, and generate the README content in Markdown format.

### [`write-git-commit.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/write-git-commit.hbs)

[Section titled “write-git-commit.hbs”](#write-git-commithbs)

Use this template to generate git commits from the staged files in your git directory. It will analyze the codebase to understand its purpose and functionality, and generate the git commit message content in Markdown format.

### [`improve-performance.hbs`](https://github.com/mufeedvh/code2prompt/tree/main/crates/code2prompt-core/templates/improve-performance.hbs)

[Section titled “improve-performance.hbs”](#improve-performancehbs)

Use this template to generate prompts for improving the performance of the codebase. It will look for optimization opportunities, provide specific suggestions, and update the code with the changes.

## User Defined Variables

[Section titled “User Defined Variables”](#user-defined-variables)

`code2prompt` supports the use of user defined variables in the Handlebars templates. Any variables in the template that are not part of the default context (`absolute_code_path`, `source_tree`, `files`) will be treated as user defined variables.

During prompt generation, `code2prompt` will prompt the user to enter values for these user defined variables. This allows for further customization of the generated prompts based on user input.

For example, if your template includes `{{challenge_name}}` and `{{challenge_description}}`, you will be prompted to enter values for these variables when running `code2prompt`.

This feature enables creating reusable templates that can be adapted to different scenarios based on user provided information.

[Previous
Getting Started](/docs/tutorials/getting_started) [Next
Learn Filtering](/docs/tutorials/learn_filters)
[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [Basic Wildcards](#basic-wildcards)
- [Advanced Patterns](#advanced-patterns)
- [Examples](#examples)
- [Use Cases](#use-cases)
- [Conclusion](#conclusion)

## On this page

- [Overview](#_top)
- [Basic Wildcards](#basic-wildcards)
- [Advanced Patterns](#advanced-patterns)
- [Examples](#examples)
- [Use Cases](#use-cases)
- [Conclusion](#conclusion)

# Understanding Glob Patterns

Glob patterns are a simple yet powerful way to match file names and paths using wildcard characters. They are commonly used in command-line interfaces and programming languages to specify sets of filenames or directories. Here’s a breakdown of the most commonly used glob patterns:

## Basic Wildcards

[Section titled “Basic Wildcards”](#basic-wildcards)

- `*`: Matches any number of characters, including zero characters.

    - Example: `*.txt` matches all files ending with `.txt`.

- `?`: Matches exactly one character.

    - Example: `file?.txt` matches `file1.txt`, `fileA.txt`, but not `file10.txt`.

- `[]`: Matches any one of the enclosed characters.

    - Example: `file[1-3].txt` matches `file1.txt`, `file2.txt`, `file3.txt`.

- `[!]` or `[^]`: Matches any character not enclosed.

    - Example: `file[!1-3].txt` matches `file4.txt`, `fileA.txt`, but not `file1.txt`.

## Advanced Patterns

[Section titled “Advanced Patterns”](#advanced-patterns)

- `**`: Matches any number of directories and subdirectories recursively.

    - Example: `**/*.txt` matches all `.txt` files in the current directory and all subdirectories.

- `{}`: Matches any of the comma-separated patterns enclosed.

    - Example: `file{1,2,3}.txt` matches `file1.txt`, `file2.txt`, `file3.txt`.

## Examples

[Section titled “Examples”](#examples)

1. **Matching all text files in a directory:**

    Terminal window

    ```


    *.txt
    ```

2. **Matching all files with a single digit before the extension:**

    Terminal window

    ```


    file?.txt
    ```

3. **Matching files with extensions `.jpg` or `.png`:**

    Terminal window

    ```


    *.{jpg,png}
    ```

4. **Matching all `.txt` files in any subdirectory:**

    Terminal window

    ```


    **/*.txt
    ```

5. **Matching files that start with `a` or `b` and end with `.txt`:**

    Terminal window

    ```


    {a,b}*.txt
    ```

## Use Cases

[Section titled “Use Cases”](#use-cases)

- **Command-Line Tools:** Glob patterns are extensively used in command-line tools like `ls`, `cp`, `mv`, and `rm` to specify multiple files or directories.
- **Programming Languages:** Languages like Python, JavaScript, and Ruby support glob patterns for file matching through libraries like `glob` in Python.
- **Build Systems:** Tools like Makefile use glob patterns to specify source files and dependencies.

## Conclusion

[Section titled “Conclusion”](#conclusion)

Glob patterns provide a flexible and intuitive way to match filenames and paths, making them invaluable for scripting, automation, and file management tasks. Understanding and utilizing these patterns can significantly enhance your productivity and efficiency in handling files and directories.

[Previous
Learn Filtering](/docs/tutorials/learn_filters) [Next
How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [Key Concepts](#key-concepts)

    - [Cases and Logic](#cases-and-logic)
    - [Visual Representation of Case 4](#visual-representation-of-case-4)

## On this page

- [Overview](#_top)
- [Key Concepts](#key-concepts)

    - [Cases and Logic](#cases-and-logic)
    - [Visual Representation of Case 4](#visual-representation-of-case-4)

# How the Glob Pattern Filter Works

The tool uses glob patterns to include or exclude files and directories, working similarly to tools like `tree` or `grep`. Here’s a detailed explanation:

## Key Concepts

[Section titled “Key Concepts”](#key-concepts)

- **Include List (A)**: A set containing the glob patterns for files and directories you want to include.
- **Exclude List (B)**: A set containing the glob patterns for files and directories you want to exclude.
- **Universe (Ω)**: The set of all files and directories.

When you specify an `--exclude` list and/or an `--include` list, the following logic applies:

### Cases and Logic

[Section titled “Cases and Logic”](#cases-and-logic)

1. **No include list, no exclude list**
   Include everything:
2. **No include list, with exclude list**
   Include everything except what matches the exclude list:
3. **With include list, no exclude list**
   Include only what matches the include list:
4. **With include list and exclude list**
   Include what matches the include list and exclude what matches the exclude list. Handle the intersection based on the `include_priority` parameter:

    - **Include priority == true**:
    - **Include priority != true**\*:

### Visual Representation of Case 4

[Section titled “Visual Representation of Case 4”](#visual-representation-of-case-4)

Let (A) and (B) overlap. Depending on the priority, the intersection is either included or excluded based on the `include_priority` parameter.

![Visual Representation of Case 4](/_astro/filter.X3yD9yfr_A8S9P.webp)

[Previous
What are Glob Patterns?](/docs/explanations/glob_patterns) [Next
Understanding Tokenizers](/docs/explanations/tokenizers)
[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [What is a Tokenizer?](#what-is-a-tokenizer)
- [Implementation in code2prompt](#implementation-in-code2prompt)

## On this page

- [Overview](#_top)
- [What is a Tokenizer?](#what-is-a-tokenizer)
- [Implementation in code2prompt](#implementation-in-code2prompt)

# Tokenization in Code2Prompt

When working with language models, text needs to be transformed into a format that the model can understand—**tokens**, which are sequences of numbers. This transformation is handled by a **tokenizer**.

---

## What is a Tokenizer?

[Section titled “What is a Tokenizer?”](#what-is-a-tokenizer)

A tokenizer converts raw text into tokens, which are the building blocks for how language models process input. These tokens can represent words, subwords, or even individual characters, depending on the tokenizer’s design.

For `code2prompt`, we use the **tiktoken** tokenizer. It’s efficient, robust, and optimized for OpenAI models. You can explore its functionality in the official repository

👉 [tiktoken GitHub Repository](https://github.com/openai/tiktoken)

If you want to learn more about tokenizer in general, check out the

👉 [Mistral Tokenization Guide](https://docs.mistral.ai/guides/tokenization/).

## Implementation in `code2prompt`

[Section titled “Implementation in code2prompt”](#implementation-in-code2prompt)

Tokenization is implemented using [`tiktoken-rs`](https://github.com/zurawiki/tiktoken-rs). `tiktoken` supports these encodings used by OpenAI models:

| CLI Argument | Encoding name           | OpenAI models                                                             |
| ------------ | ----------------------- | ------------------------------------------------------------------------- |
| `cl100k`     | `cl100k_base`           | ChatGPT models, `text-embedding-ada-002`                                  |
| `p50k`       | `p50k_base`             | Code models, `text-davinci-002`, `text-davinci-003`                       |
| `p50k_edit`  | `p50k_edit`             | Use for edit models like `text-davinci-edit-001`, `code-davinci-edit-001` |
| `r50k`       | `r50k_base` (or `gpt2`) | GPT-3 models like `davinci`                                               |
| `gpt2`       | `o200k_base`            | GPT-4o models                                                             |

For more context on the different tokenizers, see the [OpenAI Cookbook](https://github.com/openai/openai-cookbook/blob/66b988407d8d13cad5060a881dc8c892141f2d5c/examples/How_to_count_tokens_with_tiktoken.ipynb)

[Previous
How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter) [Next
Install Code2Prompt](/docs/how_to/install)
[Skip to content](#_top)

[![](/_astro/logo_light_v0.0.1.BKZrkgjm.svg) ![](/_astro/logo_dark_v0.0.1.C3p8Mpo9.svg) Code2prompt](/)

Search `CtrlK`

Cancel

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

- [Blog](/blog/)
- Documentation 🚀

    - Tutorials

        - [Getting Started](/docs/tutorials/getting_started)
        - [Learn Templating](/docs/tutorials/learn_templates)
        - [Learn Filtering](/docs/tutorials/learn_filters)

    - Explanations

        - [What are Glob Patterns?](/docs/explanations/glob_patterns)
        - [How the Glob Pattern Filter Works](/docs/explanations/glob_pattern_filter)
        - [Understanding Tokenizers](/docs/explanations/tokenizers)

    - How-To Guides

        - [Install Code2Prompt](/docs/how_to/install)
        - [Filter Files](/docs/how_to/filter_files)

- [Welcome 👋](/docs/welcome)
- [Vision 🔮](/docs/vision)

[Discord](https://discord.gg/ZZyBbsHTwH)[GitHub](https://github.com/mufeedvh/code2prompt)[RSS](https://code2prompt.dev/blog/rss.xml)

[Blog](/blog/)

Select theme DarkLightAuto Select language EnglishFrançaisDeutschEspañol中文日本語Русский

On this page

- [Overview](#_top)
- [Usage](#usage)

## On this page

- [Overview](#_top)
- [Usage](#usage)

# Filtering Files in Code2Prompt

## Usage

[Section titled “Usage”](#usage)

Generate a prompt from a codebase directory:

Terminal window

```

code2prompt path/to/codebase
```

Use a custom Handlebars template file:

Terminal window

```

code2prompt path/to/codebase -t path/to/template.hbs
```

Filter files using glob patterns:

Terminal window

```

code2prompt path/to/codebase --include="*.rs,*.toml"
```

Exclude files using glob patterns:

Terminal window

```

code2prompt path/to/codebase --exclude="*.txt,*.md"
```

Exclude files/folders from the source tree based on exclude patterns:

Terminal window

```

code2prompt path/to/codebase --exclude="*.npy,*.wav" --exclude-from-tree
```

Display the token count of the generated prompt:

Terminal window

```

code2prompt path/to/codebase --tokens
```

Specify a tokenizer for token count:

Terminal window

```

code2prompt path/to/codebase --tokens --encoding=p50k
```

Supported tokenizers: `cl100k`, `p50k`, `p50k_edit`, `r50k_bas`.

> \[!NOTE]
> See [Tokenizers](#tokenizers) for more details.

Save the generated prompt to an output file:

Terminal window

```

code2prompt path/to/codebase --output=output.txt
```

Print output as JSON:

Terminal window

```

code2prompt path/to/codebase --json
```

The JSON output will have the following structure:

```

{

  "prompt": "<Generated Prompt>",

  "directory_name": "codebase",

  "token_count": 1234,

  "model_info": "ChatGPT models, text-embedding-ada-002",

  "files": []

}
```

Generate a Git commit message (for staged files):

Terminal window

```

code2prompt path/to/codebase --diff -t templates/write-git-commit.hbs
```

Generate a Pull Request with branch comparing (for staged files):

Terminal window

```

code2prompt path/to/codebase --git-diff-branch 'main, development' --git-log-branch 'main, development' -t templates/write-github-pull-request.hbs
```

Add line numbers to source code blocks:

Terminal window

```

code2prompt path/to/codebase --line-number
```

Disable wrapping code inside markdown code blocks:

Terminal window

```

code2prompt path/to/codebase --no-codeblock
```

- Rewrite the code to another language.
- Find bugs/security vulnerabilities.
- Document the code.
- Implement new features.

> I initially wrote this for personal use to utilize Claude 3.0’s 200K context window and it has proven to be pretty useful so I decided to open-source it!

[Previous
Install Code2Prompt](/docs/how_to/install) [Next
Welcome 👋](/docs/welcome)
