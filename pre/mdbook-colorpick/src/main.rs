// In your Cargo.toml, add mdbook as a dependency
// Then create a preprocessor that transforms the markdown

use mdbook::preprocess::{Preprocessor, PreprocessorContext};
use mdbook::book::{Book, BookItem};

struct ColorPickerPreprocessor;

impl Preprocessor for ColorPickerPreprocessor {
    fn name(&self) -> &str {
        "color-picker"
    }

    fn run(&self, _ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        book.for_each_mut(|item| {
            if let BookItem::Chapter(chapter) = item {
                chapter.content = chapter.content.replace(":!pick:", include_str!("color_picker.html"));
            }
        });
        Ok(book)
    }
}

