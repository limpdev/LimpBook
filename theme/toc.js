// toc.js

// Wait for the DOM to be fully loaded before initializing Tocbot
document.addEventListener("DOMContentLoaded", function () {
  // Check if a placeholder element exists on the page for the TOC
  const tocPlaceholder = document.querySelector(".page-toc-placeholder");

  // Only initialize Tocbot if the placeholder exists and there's content to scan
  if (tocPlaceholder && document.querySelector("#content .page-wrapper")) {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".page-toc-placeholder", // Use the placeholder element

      // Where to grab the headings from.
      // Adjust this selector based on your mdbook theme's structure.
      // '#content .page-wrapper' usually contains the main page content.
      contentSelector: "#content .page-wrapper",

      // Which headings levels to include (e.g., h2, h3, h4).
      // Avoid h1 if your page title is the only h1.
      headingSelector: "h2, h3, h4",

      // Ensure headings have IDs (mdbook usually adds them automatically)
      // If not, Tocbot might add them, but check mdbook's output.

      // --- Optional configurations ---

      // Add CSS classes for styling.
      // Use 'toc-list-nostyle' to disable Tocbot's default list styling
      // if you want full control via custom.css.
      // listClass: 'toc-list list-group',
      // listItemClass: 'toc-list-item list-group-item',
      // linkClass: 'toc-link',
      // activeLinkClass: 'is-active-link', // Class for active link

      // Headings offset for fixed headers (adjust based on your theme's header height)
      headingsOffset: 80, // Example offset in pixels

      // Smooth scroll offset (optional, adjust as needed)
      scrollSmoothOffset: -80, // Example offset in pixels

      // How far up the screen the heading should be when scrolled to (0=top, 0.5=middle)
      // positionFixedSelector: null, // Set if TOC is position:fixed or position:sticky

      // Make the list ordered (ol) instead of unordered (ul)
      // orderedList: false,

      // Collapse levels deeper than this value (optional)
      // collapseDepth: 0, // 0=show all levels
    });

    console.log("Tocbot initialized.");
  } else {
    if (!tocPlaceholder) {
      console.log("TOC placeholder '.page-toc-placeholder' not found. TOC not generated.");
    } else {
      console.log("Content area for TOC scanning not found. TOC not generated.");
    }
  }
});

// Optional: Re-initialize Tocbot on theme changes (e.g., dark/light mode)
// if necessary, though typically not required for TOC structure itself.
document.addEventListener("theme-change", () => {
  tocbot.refresh();
});
