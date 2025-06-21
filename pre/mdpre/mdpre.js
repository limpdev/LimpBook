#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import markdownItAnchor from 'markdown-it-anchor';
import { tasklist } from "@mdit/plugin-tasklist";
import { include } from "@mdit/plugin-include";
import { spoiler } from "@mdit/plugin-spoiler";
import { stylize } from "@mdit/plugin-stylize";
import { tab } from "@mdit/plugin-tab";
import { embed } from "@mdit/plugin-embed";
import { container } from "@mdit/plugin-container";
import { attrs } from "@mdit/plugin-attrs";
import { align } from "@mdit/plugin-align";
import { demo } from "@mdit/plugin-demo";
import MarkdownIt from 'markdown-it';
import { dl } from "@mdit/plugin-dl";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { snippet } from "@mdit/plugin-snippet";
import { imgSize } from "@mdit/plugin-img-size";
import { obsidianImgSize } from "@mdit/plugin-img-size";

// Initialize Markdown-It with your desired plugins
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// ↓ PLUGINS INITIALIZED RIGHT HERE ↓ 
.use(require('markdown-it-footnote'))
.use(include)
.use(attrs)
.use(align)
.use(tasklist)
.use(demo)
.use(dl)
.use(imgLazyload)
.use(imgSize)
.use(obsidianImgSize)
.use(snippet)
.use(spoiler)
.use(embed)
.use(container,{
    name: "all",
})
.use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: ' '
})
.use(stylize, {
    config: [
        {
            matcher: "Recommended",
            replacer: ({ tag }) => {
                if (tag === "em")
                    return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
            };
        },
    }],
})
.use(tab, {
  // your options, name is required
  name: "tabs",
});

// Custom container for code blocks with enhanced features
md.use(require('markdown-it-container'), 'code-group', {
  validate: function(params) {
    return params.trim().match(/^code-group\s+(.*)$/);
  },
  render: function(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^code-group\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return `<div class="code-group" data-title="${md.utils.escapeHtml(m[1])}">`;
    } else {
      return '</div>';
    }
  }
});

function processBook(book) {
  // Recursively process all sections
  function processSections(sections) {
    return sections.map(section => {
      if (section.Chapter) {
        // Process the chapter content
        const chapter = section.Chapter;
        if (chapter.content) {
          // Transform markdown content using Markdown-It
          const processedContent = md.render(chapter.content);
          // Convert back to markdown (if needed) or keep as HTML
          chapter.content = processedContent;
        }
        
        // Process nested sections
        if (chapter.sub_items) {
          chapter.sub_items = processSections(chapter.sub_items);
        }
      }
      return section;
    });
  }

  book.sections = processSections(book.sections);
  return book;
}

// Main preprocessor logic
function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Handle command line arguments for MDBook integration
    if (args[0] === 'supports') {
      // Check if we support the renderer
      const renderer = args[1];
      if (renderer === 'html' || renderer === 'markdown') {
        process.exit(0);
      } else {
        process.exit(1);
      }
    }
  }

  // Read from stdin (MDBook sends the book as JSON)
  let input = '';
  process.stdin.setEncoding('utf8');
  
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      input += chunk;
    }
  });

  process.stdin.on('end', () => {
    try {
      // Parse the book JSON
      const [context, book] = JSON.parse(input);
      
      // Process the book
      const processedBook = processBook(book);
      
      // Output the processed book
      console.log(JSON.stringify([context, processedBook]));
    } catch (error) {
      console.error('Error processing book:', error);
      process.exit(1);
    }
  });
}

// Handle different execution contexts
if (require.main === module) {
  main();
}

module.exports = { processBook, md };