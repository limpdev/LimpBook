use anyhow::{Context, Result};
use mdbook::book::{Book, Chapter};
use mdbook::preprocess::{Preprocessor, PreprocessorContext};
use regex::Regex;
use std::fs;
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};
use std::process;

// A struct for our preprocessor
pub struct CodeImportPreprocessor;

impl CodeImportPreprocessor {
    pub fn new() -> Self {
        CodeImportPreprocessor
    }
}

impl Preprocessor for CodeImportPreprocessor {
    fn name(&self) -> &str {
        "code-import"
    }

    fn run(&self, ctx: &PreprocessorContext, mut book: Book) -> Result<Book> {
        // Regex to find ```<lang> file="<path>" ... ```
        // It captures:
        // 1. indent: Leading whitespace for the code block
        // 2. lang: The language specifier (e.g., js, rust)
        // 3. filepath: The path to the file to import
        // 4. rest_attrs: Any other attributes on the code block line
        let re = Regex::new(
            r#"(?m)^(?P<indent>\s*)```(?P<lang>[a-zA-Z0-9_.-]*)\s*file="(?P<filepath>[^"]+)"\s*(?P<rest_attrs>[^\n]*)(\r?\n)(?P<orig_content>(?:.|\r?\n)*?)(^\s*```)"#
        ).unwrap();

        // Get the source directory of the book
        let src_dir = ctx.root.join(ctx.config.book.src.as_path());

        book.for_each_mut(|item| {
            if let mdbook::book::BookItem::Chapter(chapter) = item {
                // Clone chapter.path before passing it to process_chapter.
                // chapter.path is Option<PathBuf>, which is Clone.
                // chapter_path_clone will be an owned Option<PathBuf>.
                let chapter_path_clone = chapter.path.clone();

                // Now, pass a reference to the cloned path.
                // `chapter` is still &mut Chapter.
                // `&chapter_path_clone` is &Option<PathBuf> but refers to independent data.
                if let Err(e) = process_chapter(chapter, &re, &src_dir, &chapter_path_clone) {
                    // Accessing chapter.name here is fine because the mutable borrow
                    // by process_chapter has ended. chapter.name creates a temporary
                    // immutable borrow.
                    eprintln!("Error processing chapter '{}': {}", chapter.name, e);
                }
            }
        });

        Ok(book)
    }

    fn supports_renderer(&self, renderer: &str) -> bool {
        renderer == "html" || renderer == "markdown" // Support HTML and Markdown renderers
    }
}

fn process_chapter(
    chapter: &mut Chapter,
    re: &Regex,
    book_src_dir: &Path,
    chapter_file_path_rel_to_src: &Option<PathBuf>,
) -> Result<()> {
    let original_content = chapter.content.clone();

    // Use replace_all to find all occurrences and replace them
    let new_content = re.replace_all(&original_content, |caps: &regex::Captures| {
        let indent = caps.name("indent").map_or("", |m| m.as_str());
        let lang = caps.name("lang").map_or("", |m| m.as_str());
        let file_attr_path_str = caps.name("filepath").unwrap().as_str();
        let rest_attrs = caps.name("rest_attrs").map_or("", |m| m.as_str());

        let file_attr_path = PathBuf::from(file_attr_path_str);

        // Determine the base path for resolving the file_attr_path
        // Priority:
        // 1. Absolute path: Use as is.
        // 2. Relative path: Resolve relative to the current chapter's directory.
        //    If chapter path is None (e.g. virtual chapter), resolve relative to src_dir.
        let path_to_load = if file_attr_path.is_absolute() {
            file_attr_path
        } else {
            let chapter_dir = chapter_file_path_rel_to_src
                .as_ref()
                .and_then(|p| p.parent())
                .unwrap_or_else(|| Path::new("")); // fallback to src root if no parent (e.g. top-level file)

            book_src_dir.join(chapter_dir).join(&file_attr_path)
        };

        // Attempt to canonicalize to resolve `../` etc. and get a clean path
        let canonical_path = match path_to_load.canonicalize() {
            Ok(p) => p,
            Err(e) => {
                eprintln!(
                    "Warning: Could not canonicalize path '{}' (resolved from '{}'): {}. Using non-canonical path.",
                    path_to_load.display(), file_attr_path_str, e
                );
                path_to_load // Fallback to the non-canonicalized path
            }
        };

        match fs::read_to_string(&canonical_path) {
            Ok(file_content) => {
                // Indent each line of the imported content
                let indented_file_content = file_content
                    .lines()
                    .map(|line| format!("{}{}", indent, line))
                    .collect::<Vec<String>>()
                    .join("\n");

                format!(
                    "{}```{} {}\n{}\n{}```",
                    indent,
                    lang,
                    rest_attrs.trim(),
                    indented_file_content, // Already has newlines between lines
                    indent
                )
            }
            Err(e) => {
                eprintln!(
                    "Error: Code import preprocessor failed to read file '{}' (resolved from '{}'): {}",
                    canonical_path.display(), file_attr_path_str, e
                );
                // Return a block with an error message
                format!(
                    "{}```text\n[Error: Could not load file: {} - {}]\n{}```",
                    indent, file_attr_path_str, e, indent
                )
            }
        }
    });

    chapter.content = new_content.into_owned();
    Ok(())
}

fn main() -> Result<()> {
    let preprocessor = CodeImportPreprocessor::new();

    // Check if mdbook is calling us as a preprocessor or just to check support
    if let Some(arg1) = std::env::args().nth(1) {
        if arg1 == "supports" {
            let renderer = std::env::args()
                .nth(2)
                .context("Renderer argument not provided for 'supports' command")?;
            if preprocessor.supports_renderer(&renderer) {
                process::exit(0);
            } else {
                eprintln!(
                    "Preprocessor {} does not support renderer {}",
                    preprocessor.name(),
                    renderer
                );
                process::exit(1);
            }
        }
    }

    // Standard preprocessor execution: read from stdin, write to stdout
    let (ctx, book) = mdbook::preprocess::CmdPreprocessor::parse_input(io::stdin())?;

    // Check if this renderer is supported before running the heavy logic
    // This is also handled by the `supports` command, but good to double-check.
    if !preprocessor.supports_renderer(&ctx.renderer) {
        eprintln!(
            "Warning: Preprocessor {} does not support renderer {}. Passing through.",
            preprocessor.name(),
            &ctx.renderer
        );
        // Passthrough if not supported, outputting the original book
        serde_json::to_writer(io::stdout(), &book)?;
        return Ok(());
    }

    let processed_book = preprocessor.run(&ctx, book)?;
    serde_json::to_writer(io::stdout(), &processed_book)?;

    Ok(())
}
