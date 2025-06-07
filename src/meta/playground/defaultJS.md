#  Transformation Library

> This document holds my most frequently needed or useful  JavaScript functions for web frontends. These range from simple transformations to fully contextual, interactive tools.

<details><summary>📦<i>LimpBook's Original Stylings</i></summary>

> `mdCallouts.js` → Converts specially signified blockquotes into custom HTML w/ custom selectors for CSS

```js
function mdCallouts(htmlText) {
    // Define callout types and their icons
    const calloutTypes = {
        NOTE: '<i class="note-icon">󱞁</i>',
        TIP: '<i class="tip-icon">󰴓</i>',
        IMPORTANT: '<i class="important-icon">󱁯</i>',
        WARNING: '<i class="warning-icon">󰉀</i>',
        CAUTION: '<i class="caution-icon"></i>',
    };
    // Regex to match GitHub-style callouts inside blockquotes in HTML
    // Matches: <blockquote><p>[!TYPE] ... </p></blockquote>
    const calloutRegex =
        /<blockquote>\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gm;
    return htmlText.replace(calloutRegex, function (match, type, content) {
        // Normalize the type to handle case variations
        const normalizedType = type.toUpperCase();
        // Make sure we have a valid type, or default to NOTE
        const calloutType = Object.keys(calloutTypes).includes(normalizedType) ? normalizedType : "NOTE";
        // Process the content - trim whitespace
        const processedContent = content.trim();
        // Build the HTML replacement
        return `<div class="callout callout-${calloutType.toLowerCase()}">
  <div class="callout-header">
    <span class="callout-icon">${calloutTypes[calloutType]}</span>
    <span class="callout-title">${calloutType}</span>
  </div>
  <div class="callout-content">
    <p>${processedContent}</p>
  </div>
</div>`;
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // Get the current HTML content of the body
    let bodyHTML = document.body.innerHTML;
    // Convert the markdown callouts in the HTML to proper callout divs
    bodyHTML = mdCallouts(bodyHTML);
    // Replace the body's HTML with the converted content
    document.body.innerHTML = bodyHTML;
});
```

> `Codeblock SVGs` → Adds custom `SVG` + `transformations` + `listener` to codeblock copy buttons

```js
// Add click listener to codeblock copy buttons + an SVG transformation
document.querySelectorAll(".clip-button").forEach((button) => {
    button.addEventListener("click", () => {
        try {
            // Get the SVG element
            const svg = button.querySelector("svg");
            // Save original attributes
            const originalViewBox = svg.getAttribute("viewBox");
            const originalWidth = svg.getAttribute("width");
            const originalHeight = svg.getAttribute("height");
            // Clear the SVG content and update attributes
            svg.innerHTML = "";
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "1.5em");
            svg.setAttribute("height", "1.5em");
            svg.setAttribute("fill", "green");
            // Create a new success path
            const successPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            successPath.setAttribute(
                "d",
                "M10 2a3 3 0 0 0-2.83 2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1.17A3 3 0 0 0 14 2zM9 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m6.78 6.625a1 1 0 1 0-1.56-1.25l-3.303 4.128l-1.21-1.21a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.488-.082l4-5z",
            );
            svg.appendChild(successPath);
            // Update the aria label
            button.setAttribute("aria-label", "Copied!");
            // Reset to original after 2 seconds
            setTimeout(() => {
                // Clear the SVG
                svg.innerHTML = "";
                // Restore original attributes
                svg.setAttribute("viewBox", originalViewBox);
                svg.setAttribute("width", originalWidth);
                svg.setAttribute("height", originalHeight);
                svg.removeAttribute("fill");
                // Create and add the original path back
                const originalPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                originalPath.setAttribute("id", "clipSVG");
                originalPath.setAttribute(
                    "d",
                    "m 19.658,22.84 5.75,-5.75 -5.75,-5.75 1.75,-1.7499999 7.5,7.4999999 -7.5,7.5 z m -3.316,0 -5.75,-5.75 5.75,-5.75 -1.75,-1.7499999 -7.5,7.4999999 7.5,7.5 z",
                );
                svg.appendChild(originalPath);
                // Reset the aria label
                button.setAttribute("aria-label", "Copy to clipboard");
            }, 2000);
        } catch (err) {
            console.error("Could NOT achieve transformation, see ", err);
        }
    });
});
```

> `RIPPLE CLICKS` → Adds visual ripple effect to page clicks.

```js
// Add ripple effect for every mouse click, anywhere on the page using an SVG
document.addEventListener("click", function (e) {
    // Create a container for the ripple effect
    const rippleContainer = document.createElement("div");
    rippleContainer.style.position = "fixed";
    rippleContainer.style.left = e.clientX - 48 + "px"; // Center the ripple at click position
    rippleContainer.style.top = e.clientY - 48 + "px";
    rippleContainer.style.pointerEvents = "none"; // Don't interfere with further clicks
    rippleContainer.style.zIndex = "9999";
    // Create SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "96");
    svg.setAttribute("height", "96");
    svg.setAttribute("viewBox", "0 0 24 24");
    // Create circle element
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "0");
    circle.setAttribute("fill", "rgba(168, 168, 168, 0.7)");
    // Create animate elements
    const animateRadius = document.createElementNS(svgNS, "animate");
    animateRadius.setAttribute("attributeName", "r");
    animateRadius.setAttribute("calcMode", "spline");
    animateRadius.setAttribute("dur", "0.5s");
    animateRadius.setAttribute("keySplines", ".52,.6,.25,.99");
    animateRadius.setAttribute("values", "0;11");
    animateRadius.setAttribute("fill", "freeze");
    const animateOpacity = document.createElementNS(svgNS, "animate");
    animateOpacity.setAttribute("attributeName", "opacity");
    animateOpacity.setAttribute("calcMode", "spline");
    animateOpacity.setAttribute("dur", "0.33s");
    animateOpacity.setAttribute("keySplines", ".52,.6,.25,.99");
    animateOpacity.setAttribute("values", "1;0");
    animateOpacity.setAttribute("fill", "freeze");
    // Assemble the SVG
    circle.appendChild(animateRadius);
    circle.appendChild(animateOpacity);
    svg.appendChild(circle);
    rippleContainer.appendChild(svg);
    // Add to document
    document.body.appendChild(rippleContainer);
    // Remove after animation completes
    setTimeout(() => {
        document.body.removeChild(rippleContainer);
    }, 1500); // Match the duration of the animation
});
```

> `addMarkTags.js` → Transforms noted markdown into HTML wrapped with `<mark>`.

```js
// MARK TAGS FOR TEXT - AKA, Highlighting!
function addMarkTags(text) {
    // Replace text wrapped between == and == with <mark> tags
    // This regex finds any text between =: and := regardless of its location
    const markRegex = /==(.*?)==/g;
    const markReplace = (match, content) => {
        return `<mark>${content}</mark>`;
    };
    return text.replace(markRegex, markReplace);
}
```

> `floatingTOC.js` → Adds a floating table of contents on a per-page basis.

```js
let scrollTimeout;
const listenActive = () => {
    const elems = document.querySelector(".pagetoc").children;
    [...elems].forEach((el) => {
        el.addEventListener("click", (event) => {
            clearTimeout(scrollTimeout);
            [...elems].forEach((el) => el.classList.remove("active"));
            el.classList.add("active");
            // Prevent scroll updates for a short period
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 100); // Adjust timing as needed
        });
    });
};
const getPagetoc = () => document.querySelector(".pagetoc") || autoCreatePagetoc();
const autoCreatePagetoc = () => {
    const main = document.querySelector("#content > main");
    const content = Object.assign(document.createElement("div"), {
        className: "content-wrap",
    });
    content.append(...main.childNodes);
    main.prepend(content);
    main.insertAdjacentHTML("afterbegin", '<div class="sidetoc"><nav class="pagetoc"></nav></div>');
    return document.querySelector(".pagetoc");
};
const updateFunction = () => {
    if (scrollTimeout) return; // Skip updates if within the cooldown period from a click
    const headers = [...document.getElementsByClassName("header")];
    const scrolledY = window.scrollY;
    let lastHeader = null;
    // Find the last header that is above the current scroll position
    for (let i = headers.length - 1; i >= 0; i--) {
        if (scrolledY >= headers[i].offsetTop) {
            lastHeader = headers[i];
            break;
        }
    }
    const pagetocLinks = [...document.querySelector(".pagetoc").children];
    pagetocLinks.forEach((link) => link.classList.remove("active"));
    if (lastHeader) {
        const activeLink = pagetocLinks.find((link) => lastHeader.href === link.href);
        if (activeLink) activeLink.classList.add("active");
    }
};

window.addEventListener("load", () => {
    const pagetoc = getPagetoc();
    const headers = [...document.getElementsByClassName("header")];
    headers.forEach((header) => {
        const link = Object.assign(document.createElement("a"), {
            textContent: header.text,
            href: header.href,
            className: `pagetoc-${header.parentElement.tagName}`,
        });
        pagetoc.appendChild(link);
    });
    updateFunction();
    listenActive();
    window.addEventListener("scroll", updateFunction);
});
```

> `customDetails.js` → Adds custom selectors/structure for styling `<details>`.

```js
document.addEventListener("DOMContentLoaded", () => {
    // Find all details elements
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach((details) => {
        const summary = details.querySelector("summary");
        // Get all content after the summary
        const contentNodes = [];
        let currentNode = summary.nextSibling;
        while (currentNode) {
            contentNodes.push(currentNode);
            currentNode = currentNode.nextSibling;
        }
        // Create a wrapper div for the content
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "details-content";
        contentWrapper.style.overflow = "hidden";
        // Move all content nodes into the wrapper
        contentNodes.forEach((node) => {
            // Clone the node and remove the original
            const clonedNode = node.cloneNode(true);
            contentWrapper.appendChild(clonedNode);
            details.removeChild(node);
        });
        // Add the wrapper to the details element
        details.appendChild(contentWrapper);
        // Set initial state
        if (!details.open) {
            contentWrapper.style.height = "0px";
        } else {
            contentWrapper.style.height = contentWrapper.scrollHeight + "px";
        }
        // Add click handler for animation
        summary.addEventListener("click", (e) => {
            e.preventDefault();
            if (details.open) {
                // Closing animation
                contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                // Force reflow
                contentWrapper.offsetHeight;
                contentWrapper.style.height = "0px";
                // After animation completes, set open to false
                setTimeout(
                    () => {
                        details.open = false;
                    },
                    parseFloat(getComputedStyle(contentWrapper).transitionDuration) * 1000,
                );
            } else {
                // Opening animation
                details.open = true;
                // Get the scroll height and apply it
                setTimeout(() => {
                    contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                    // After animation completes, set height to auto for flexible content
                    setTimeout(
                        () => {
                            contentWrapper.style.height = "auto";
                        },
                        parseFloat(getComputedStyle(contentWrapper).transitionDuration) * 1000,
                    );
                }, 10);
            }
        });
    });
    // Optional: Style toggle buttons (kept from your original code)
    const arrowStyle = document.getElementById("arrow-style");
    const plusStyle = document.getElementById("plus-style");
    if (arrowStyle && plusStyle) {
        arrowStyle.addEventListener("click", () => {
            detailsElements.forEach((el) => el.classList.remove("plus-minus"));
            arrowStyle.classList.add("active");
            plusStyle.classList.remove("active");
        });
        plusStyle.addEventListener("click", () => {
            detailsElements.forEach((el) => el.classList.add("plus-minus"));
            plusStyle.classList.add("active");
            arrowStyle.classList.remove("active");
        });
    }
});
```

</details>

---

##   OPTIMIZED

_My goal was to enhance modularity, efficiency, readability, and robustness, ensuring they are as "plug-and-play" as reasonably possible._

### Library

#### `mdCallouts.js`

> Converts specially signified blockquotes into custom HTML w/ custom selectors for CSS. _Modular function-pair_.

**Key Changes & Optimizations:**

1.  **Targeted Application:** Instead of replacing `document.body.innerHTML` (which is highly destructive and inefficient), the script now provides an `applyMdCallouts` function that can target a specific container element. This preserves event listeners and improves performance. A default selector like `'article'` or a specific class can be used. I've used `'body'` as a fallback in the example, but a more specific selector is recommended.
2.  **Regex Case-Insensitivity:** Added the `i` flag to the regex for `[!TYPE]` to match `[!note]`, `[!Note]`, etc., making it more flexible. The existing `toUpperCase()` normalization already handled the type lookup, but this makes the initial match more robust.
3.  **IIFE for Application Logic:** The `DOMContentLoaded` logic is wrapped in an IIFE to keep `applyMdCallouts` local if it's only used here. If `applyMdCallouts` should be globally available, it can be defined outside the IIFE. For this example, I'll make `mdCallouts` globally available (as it's a utility function) and `applyMdCallouts` a local helper within the IIFE.

```javascript
// mdCallouts.js
// -----------------------------------------------------------------------------

/**
 * Converts GitHub-style callouts within an HTML string to custom styled divs.
 * @param {string} htmlText - The HTML string to process.
 * @returns {string} The HTML string with callouts transformed.
 */
function mdCallouts(htmlText) {
    // Define callout types and their icons
    const calloutTypes = {
        NOTE: '<i class="note-icon">󱞁</i>', // Ensure these icons are supported by your font
        TIP: '<i class="tip-icon">󰴓</i>',
        IMPORTANT: '<i class="important-icon">󱁯</i>',
        WARNING: '<i class="warning-icon">󰉀</i>',
        CAUTION: '<i class="caution-icon"></i>',
    };

    // Regex to match GitHub-style callouts inside blockquotes in HTML
    // Matches: <blockquote><p>[!TYPE] ... </p></blockquote>
    // Added 'i' flag for case-insensitive type matching in [!TYPE]
    const calloutRegex =
        /<blockquote>\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gim;

    return htmlText.replace(calloutRegex, (match, type, content) => {
        const normalizedType = type.toUpperCase();
        // Ensure valid type, default to NOTE
        const calloutType = Object.keys(calloutTypes).includes(normalizedType) ? normalizedType : "NOTE";
        const processedContent = content.trim();

        return `<div class="callout callout-${calloutType.toLowerCase()}">
  <div class="callout-header">
    <span class="callout-icon">${calloutTypes[calloutType]}</span>
    <span class="callout-title">${calloutType}</span>
  </div>
  <div class="callout-content">
    <p>${processedContent}</p>
  </div>
</div>`;
    });
}

(function () {
    /**
     * Applies mdCallouts transformation to the innerHTML of a targeted element.
     * @param {string} [selector="body"] - CSS selector for the parent element to process.
     *                                     It's highly recommended to use a more specific selector
     *                                     than 'body' for performance and to avoid unintended side effects.
     *                                     For example, '.article-content' or '#main-text'.
     */
    function applyMdCalloutsToElement(selector = "body") {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            // IMPORTANT: Replacing innerHTML can be destructive to event listeners
            // or complex DOM structures within the target element.
            // Use with caution and preferably on static content containers.
            targetElement.innerHTML = mdCallouts(targetElement.innerHTML);
        } else {
            console.warn(`[mdCallouts] Element with selector "${selector}" not found.`);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Example: Apply to an element with class 'main-content'.
        // Change this selector to target the specific area of your page
        // where these markdown callouts appear.
        applyMdCalloutsToElement(".markdown-content-area");

        // If you absolutely must process the entire body (e.g., for very simple static pages):
        // applyMdCalloutsToElement('body');
        // console.warn("[mdCallouts] Processing the entire 'body'. This is generally not recommended for complex pages.");
    });
})();
```

#### `Codeblock SVGs`

> Adds custom `SVG` + `transformations` + `listener` to codeblock copy buttons.

**Key Changes & Optimizations:**

1.  **Unique IDs:** Removed `originalPath.setAttribute("id", "clipSVG");`. Dynamically creating multiple elements with the same ID is invalid HTML and can lead to issues. SVGs and their paths can be styled and manipulated using classes or direct element references without needing IDs on dynamically generated content.
2.  **Constants:** The timeout duration `2000` is now a named constant `RESET_TIMEOUT_MS` for better readability and maintainability.
3.  **IIFE:** Wrapped the entire script in an IIFE to avoid polluting the global scope with variables like `RESET_TIMEOUT_MS`.
4.  **Robustness:** Ensured that `originalViewBox`, `originalWidth`, `originalHeight` are only restored if they were initially present. `getAttribute` returns `null` if the attribute is not set.

```javascript
// Codeblock SVGs.js
// -----------------------------------------------------------------------------
(function () {
    const RESET_TIMEOUT_MS = 2000; // Duration to show success state

    document.querySelectorAll(".clip-button").forEach((button) => {
        button.addEventListener("click", () => {
            try {
                const svg = button.querySelector("svg");
                if (!svg) {
                    console.error("SVG not found in .clip-button");
                    return;
                }

                // Save original attributes
                const originalAttributes = {
                    viewBox: svg.getAttribute("viewBox"),
                    width: svg.getAttribute("width"),
                    height: svg.getAttribute("height"),
                    fill: svg.getAttribute("fill"), // Save original fill too
                };
                // Save original content (paths)
                const originalSvgContent = svg.innerHTML;

                // Clear the SVG content and update attributes for success state
                svg.innerHTML = ""; // Clear existing paths
                svg.setAttribute("viewBox", "0 0 24 24");
                svg.setAttribute("width", "1.5em");
                svg.setAttribute("height", "1.5em");
                svg.setAttribute("fill", "green");

                const successPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                successPath.setAttribute(
                    "d",
                    "M10 2a3 3 0 0 0-2.83 2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1.17A3 3 0 0 0 14 2zM9 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m6.78 6.625a1 1 0 1 0-1.56-1.25l-3.303 4.128l-1.21-1.21a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.488-.082l4-5z",
                );
                svg.appendChild(successPath);
                button.setAttribute("aria-label", "Copied!");

                // Reset to original after timeout
                setTimeout(() => {
                    svg.innerHTML = originalSvgContent; // Restore original paths/content

                    // Restore original attributes
                    if (originalAttributes.viewBox) svg.setAttribute("viewBox", originalAttributes.viewBox);
                    else svg.removeAttribute("viewBox");

                    if (originalAttributes.width) svg.setAttribute("width", originalAttributes.width);
                    else svg.removeAttribute("width");

                    if (originalAttributes.height) svg.setAttribute("height", originalAttributes.height);
                    else svg.removeAttribute("height");

                    if (originalAttributes.fill) svg.setAttribute("fill", originalAttributes.fill);
                    else svg.removeAttribute("fill");

                    button.setAttribute("aria-label", "Copy to clipboard");
                }, RESET_TIMEOUT_MS);
            } catch (err) {
                console.error("Could not transform SVG on copy button:", err);
            }
        });
    });
})();
```

#### `Ripple Clicks`

> Adds visual ripple effect to page clicks.

**Key Changes & Optimizations:**

1.  **Timeout for Removal:** Adjusted the `setTimeout` for removing the ripple container from `1500ms` to `500ms`. The longest animation (`animateRadius`) has `dur="0.5s"`. The element can be safely removed after this duration.
2.  **Constants:** Made animation duration and size configurable via constants.
3.  **IIFE:** Wrapped in an IIFE.
4.  **Minor Style Refinements:** Used `transform` for centering the ripple origin, which can be more performant and flexible than fixed pixel offsets if the ripple size changes.

```javascript
// RIPPLE CLICKS.js
// -----------------------------------------------------------------------------
(function () {
    const RIPPLE_SIZE = 96; // px
    const RIPPLE_DURATION_MS = 500; // Corresponds to the longest SVG animation duration

    document.addEventListener("click", function (e) {
        // Create a container for the ripple effect
        const rippleContainer = document.createElement("div");
        rippleContainer.style.position = "fixed";
        // Center the ripple at click position using transform
        rippleContainer.style.left = e.clientX + "px";
        rippleContainer.style.top = e.clientY + "px";
        rippleContainer.style.width = RIPPLE_SIZE + "px";
        rippleContainer.style.height = RIPPLE_SIZE + "px";
        rippleContainer.style.transform = "translate(-50%, -50%)"; // Center on click
        rippleContainer.style.pointerEvents = "none";
        rippleContainer.style.zIndex = "9999";
        rippleContainer.style.overflow = "visible"; // Ensure SVG is not clipped if it animates outside bounds temporarily

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", String(RIPPLE_SIZE));
        svg.setAttribute("height", String(RIPPLE_SIZE));
        svg.setAttribute("viewBox", "0 0 24 24"); // Keep viewBox consistent for relative r values

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "12"); // Center in viewBox
        circle.setAttribute("cy", "12"); // Center in viewBox
        circle.setAttribute("r", "0");
        circle.setAttribute("fill", "rgba(168, 168, 168, 0.7)");

        const animateRadius = document.createElementNS(svgNS, "animate");
        animateRadius.setAttribute("attributeName", "r");
        animateRadius.setAttribute("calcMode", "spline");
        animateRadius.setAttribute("dur", `${RIPPLE_DURATION_MS / 1000}s`);
        animateRadius.setAttribute("keySplines", ".52,.6,.25,.99");
        animateRadius.setAttribute("values", "0;11"); // Max radius within 24x24 viewBox
        animateRadius.setAttribute("fill", "freeze");

        const animateOpacity = document.createElementNS(svgNS, "animate");
        animateOpacity.setAttribute("attributeName", "opacity");
        animateOpacity.setAttribute("calcMode", "spline");
        // Opacity animation should be shorter or equal to radius animation
        animateOpacity.setAttribute("dur", `${Math.min(330, RIPPLE_DURATION_MS) / 1000}s`);
        animateOpacity.setAttribute("keySplines", ".52,.6,.25,.99");
        animateOpacity.setAttribute("values", "1;0");
        animateOpacity.setAttribute("fill", "freeze");

        circle.appendChild(animateRadius);
        circle.appendChild(animateOpacity);
        svg.appendChild(circle);
        rippleContainer.appendChild(svg);
        document.body.appendChild(rippleContainer);

        setTimeout(() => {
            if (rippleContainer.parentElement) {
                rippleContainer.parentElement.removeChild(rippleContainer);
            }
        }, RIPPLE_DURATION_MS); // Remove after the main animation completes
    });
})();
```

#### `addMarkTags.js`

> Transforms noted markdown (`==text==`) into HTML wrapped with `<mark>`. _Full, modular function_.

**Key Changes & Optimizations:**

1.  **No Change Needed:** This function is already simple, modular, and effective for its stated purpose. It correctly uses a non-greedy regex.
2.  **Usage Note:** Added a comment about how this function would typically be used (e.g., on `element.innerHTML`), reiterating the caution about `innerHTML` replacement.

```javascript
// addMarkTags.js
// -----------------------------------------------------------------------------
/**
 * Replaces text wrapped with ==...== with <mark>...</mark> tags in a given string.
 * Example: "Hello ==world==" becomes "Hello <mark>world</mark>"
 * @param {string} text - The input string (can be plain text or HTML string).
 * @returns {string} The string with replacements.
 */
function addMarkTags(text) {
    // Regex finds any text between == and == (non-greedy)
    const markRegex = /==(.*?)==/g;
    // Using a replacer function for clarity, though direct string could also work
    const markReplace = (match, content) => {
        return `<mark>${content}</mark>`;
    };
    return text.replace(markRegex, markReplace);
}

/*
// Example Usage (typically run after DOM content is loaded):
//
// function applyMarkTagsToElement(selector) {
//     const element = document.querySelector(selector);
//     if (element) {
//         // CAUTION: Modifying innerHTML can destroy event listeners on child elements.
//         // Best used on elements with static content.
//         element.innerHTML = addMarkTags(element.innerHTML);
//     } else {
//         console.warn(`[addMarkTags] Element with selector "${selector}" not found.`);
//     }
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   applyMarkTagsToElement('.content-needing-highlighting');
// });
*/
```

#### `floatingTOC.js`

> Adds a floating table of contents on a per-page basis.

**Key Changes & Optimizations:**

1.  **Performance:** The `updateFunction` (scroll handler) is now debounced to prevent excessive firing, improving performance. A simple debounce function is included.
2.  **DOM Assumptions (`autoCreatePagetoc`):** This function is highly opinionated about your DOM structure. I've kept it but added more prominent comments. For true plug-and-play, you might require the `.pagetoc` nav to already exist in the HTML.
3.  **Clarity & Robustness:**
    - Used `header.textContent` instead of `header.text` for consistency and standard compliance.
    - Added checks to ensure elements like `.pagetoc` and headers are found before proceeding.
4.  **Selectors:** The script still relies on specific class names like `.header` for identifying headers and `.pagetoc` for the TOC container. These are dependencies that need to be met in the HTML.
5.  **IIFE:** Wrapped in an IIFE.
6.  **`scrollTimeout` Logic:** Maintained the existing `scrollTimeout` logic for click vs. scroll highlighting, as it's simple and effective for this case.

```javascript
// floatingTOC.js
// -----------------------------------------------------------------------------
(function () {
    let scrollTimeout; // Used to temporarily disable scrollspy after a click
    const SCROLL_DEBOUNCE_DELAY = 50; // ms, for debouncing scroll handler
    const CLICK_SCROLLSPY_PAUSE_DURATION = 150; // ms, pause scrollspy after click

    // Simple debounce function
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const listenActive = (pagetocElement) => {
        const tocLinks = pagetocElement.children;
        [...tocLinks].forEach((link) => {
            link.addEventListener("click", (event) => {
                // event.preventDefault(); // Only if you are manually handling scroll
                // and default anchor behavior is not desired.
                // If hrefs are #id, default behavior is usually fine.
                clearTimeout(scrollTimeout);
                [...tocLinks].forEach((el) => el.classList.remove("active"));
                link.classList.add("active");
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                }, CLICK_SCROLLSPY_PAUSE_DURATION);
            });
        });
    };

    const getPagetoc = () => document.querySelector(".pagetoc") || autoCreatePagetoc();

    // This function makes strong assumptions about your existing DOM structure.
    // For better modularity, ensure your HTML provides the .pagetoc container.
    const autoCreatePagetoc = () => {
        console.warn(
            "[floatingTOC] '.pagetoc' not found. Attempting to auto-create. This is not recommended for production if HTML structure varies.",
        );
        // Assumes specific structure: #content > main
        const mainContainer = document.querySelector("#content > main");
        if (!mainContainer) {
            console.error("[floatingTOC] Cannot auto-create TOC: '#content > main' not found.");
            return null;
        }

        // Check if content is already wrapped
        if (!mainContainer.querySelector(".content-wrap")) {
            const contentWrap = Object.assign(document.createElement("div"), {
                className: "content-wrap",
            });
            contentWrap.append(...mainContainer.childNodes); // Move existing children
            mainContainer.prepend(contentWrap);
        }

        // Check if sidetoc container exists
        if (!mainContainer.querySelector(".sidetoc")) {
            mainContainer.insertAdjacentHTML("afterbegin", '<div class="sidetoc"><nav class="pagetoc"></nav></div>');
        } else if (!mainContainer.querySelector(".sidetoc > .pagetoc")) {
            const sidetocDiv = mainContainer.querySelector(".sidetoc");
            sidetocDiv.innerHTML = '<nav class="pagetoc"></nav>'; // Ensure pagetoc is inside sidetoc
        }

        return document.querySelector(".pagetoc");
    };

    const updateActiveLink = () => {
        if (scrollTimeout) return; // Skip updates if paused (e.g., after a click)

        // Assumes headers for TOC have class 'header' and are typically <a> tags with hrefs
        const headers = Array.from(document.getElementsByClassName("header"))
            .map((h) => ({ element: h, offsetTop: h.offsetTop, href: h.href }))
            .sort((a, b) => a.offsetTop - b.offsetTop); // Ensure sorted by position

        if (!headers.length) return;

        const pagetocElement = document.querySelector(".pagetoc");
        if (!pagetocElement) return;

        const pagetocLinks = Array.from(pagetocElement.children);
        const scrolledY = window.scrollY;
        let lastVisibleHeader = null;

        // Find the last header that is scrolled past or is at the top of the viewport
        // Add a small offset (e.g., 10 pixels) to account for styling/padding
        const offset = 10;
        for (let i = headers.length - 1; i >= 0; i--) {
            if (scrolledY >= headers[i].offsetTop - offset) {
                lastVisibleHeader = headers[i];
                break;
            }
        }

        // If no header is scrolled past (e.g., at the very top), activate the first one if visible
        if (!lastVisibleHeader && headers.length > 0 && scrolledY < headers[0].offsetTop) {
            // Optionally, you could activate the first link or none
            // lastVisibleHeader = headers[0];
        }

        pagetocLinks.forEach((link) => link.classList.remove("active"));

        if (lastVisibleHeader) {
            const activeLink = pagetocLinks.find((link) => link.href === lastVisibleHeader.href);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        } else if (pagetocLinks.length > 0 && scrolledY < headers[0].offsetTop - offset) {
            // If scrolled to top above first header, make first TOC item active.
            // pagetocLinks[0].classList.add("active");
            // Or clear all active, depending on desired behavior. Current logic clears all.
        }
    };

    const debouncedUpdateActiveLink = debounce(updateActiveLink, SCROLL_DEBOUNCE_DELAY);

    window.addEventListener("load", () => {
        const pagetocElement = getPagetoc();
        if (!pagetocElement) {
            console.error("[floatingTOC] Pagetoc element not found and could not be created. TOC will not function.");
            return;
        }

        // Assumes elements with class 'header' are the source for TOC items.
        // These should be <a> tags within or associated with headings, having an href.
        const headers = Array.from(document.getElementsByClassName("header"));

        if (!headers.length) {
            console.warn("[floatingTOC] No elements with class 'header' found. TOC will be empty.");
            // Optionally hide pagetocElement or its parent if empty
            // if (pagetocElement.parentElement.classList.contains('sidetoc')) {
            //    pagetocElement.parentElement.style.display = 'none';
            // }
            return;
        }

        headers.forEach((header) => {
            // Ensure header elements have necessary properties, or skip
            if (!header.href || typeof header.textContent === "undefined") {
                console.warn("[floatingTOC] Skipping header for TOC due to missing href or textContent:", header);
                return;
            }
            const link = document.createElement("a");
            link.textContent = header.textContent.trim(); // Use textContent, trim whitespace
            link.href = header.href;
            // Class based on parent Hx tag: assumes .header is <a> inside <Hx>
            // e.g. <h2><a class="header" href="#section2">Section 2</a></h2>
            if (header.parentElement && header.parentElement.tagName.match(/^H[1-6]$/)) {
                link.className = `pagetoc-${header.parentElement.tagName.toLowerCase()}`;
            } else {
                link.className = "pagetoc-default"; // Fallback class
            }
            pagetocElement.appendChild(link);
        });

        if (pagetocElement.children.length > 0) {
            updateActiveLink(); // Initial active state
            listenActive(pagetocElement);
            window.addEventListener("scroll", debouncedUpdateActiveLink, { passive: true });
        } else {
            console.warn("[floatingTOC] TOC is empty after processing headers.");
            // Optionally hide pagetocElement or its parent if empty
        }
    });
})();
```

#### `Custom Details`

> Adds custom selectors/structure for styling `<details>` with smooth animations.

- **Event Listener for Animation End:** Changed from setTimeout based on transitionDuration to using the transitionend event for more robust synchronization of details.open attribute and height: auto. This handles cases where transitions might be interrupted or have complex timings.

- **Reflow Trigger:** Kept contentWrapper.offsetHeight; as it's a reliable way to force reflow.

- **Small Timeout for Opening:** The setTimeout(..., 10) before opening animation is kept. This small delay can be crucial to ensure the browser has processed details.open = true and the element is ready for scrollHeight measurement.

- **IIFE:** Wrapped in an IIFE.

- **CSS Transition Prerequisite:** Added a comment emphasizing that CSS transitions must be defined for the animation to work.

- **Clarity in contentNodes Loop:** The original loop was correct. No changes there.

```javascript
// customDetails.js
// -----------------------------------------------------------------------------
// IMPORTANT: This script assumes you have CSS transitions defined for the
// .details-content 'height' property for the animation to be visible.
// e.g., .details-content { transition: height 0.3s ease; }
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const detailsElements = document.querySelectorAll("details");

        detailsElements.forEach((details) => {
            const summary = details.querySelector("summary");
            if (!summary) return; // Skip if no summary

            // Collect all nodes that are direct children of <details> and after <summary>
            const contentNodes = [];
            let currentNode = summary.nextSibling;
            while (currentNode) {
                contentNodes.push(currentNode);
                currentNode = currentNode.nextSibling;
            }

            // If no content nodes, or if a .details-content wrapper already exists, skip
            if (contentNodes.length === 0 || details.querySelector(".details-content")) {
                return;
            }

            const contentWrapper = document.createElement("div");
            contentWrapper.className = "details-content";
            contentWrapper.style.overflow = "hidden"; // Essential for height animation

            // Move collected content nodes into the wrapper
            contentNodes.forEach((node) => {
                contentWrapper.appendChild(node); // No need to clone, just move
            });
            details.appendChild(contentWrapper);

            // Set initial state based on `open` attribute
            if (!details.open) {
                contentWrapper.style.height = "0px";
            } else {
                // If initially open, set height to scrollHeight, then auto
                contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                // Defer setting to 'auto' to allow any initial transition to finish
                // if one was accidentally triggered by setting height.
                requestAnimationFrame(() => {
                    // Check if still open, in case state changed rapidly
                    if (details.open) {
                        contentWrapper.style.height = "auto";
                    }
                });
            }

            summary.addEventListener("click", (e) => {
                e.preventDefault(); // We'll manage the 'open' attribute manually

                if (details.open) {
                    // Closing animation
                    contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                    requestAnimationFrame(() => {
                        // Ensure height is set before transitioning to 0
                        contentWrapper.style.height = "0px";
                    });

                    // Use transitionend event to set details.open = false
                    // and ensure it's only fired for the height property
                    contentWrapper.addEventListener("transitionend", function onTransitionEnd(event) {
                        if (event.propertyName === "height") {
                            details.open = false;
                            contentWrapper.removeEventListener("transitionend", onTransitionEnd);
                        }
                    });
                } else {
                    // Opening animation
                    details.open = true; // Set open attribute first

                    // Height needs to be set in next frame after 'open' is true
                    // and display styles are applied by the browser.
                    requestAnimationFrame(() => {
                        contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                    });

                    // Use transitionend event to set height to 'auto'
                    contentWrapper.addEventListener("transitionend", function onTransitionEnd(event) {
                        if (event.propertyName === "height") {
                            // Check if it's still open, in case it was rapidly closed
                            if (details.open) {
                                contentWrapper.style.height = "auto";
                            }
                            contentWrapper.removeEventListener("transitionend", onTransitionEnd);
                        }
                    });
                }
            });
        });

        // Optional: Style toggle buttons (kept from original)
        // This part is specific to having #arrow-style and #plus-style buttons on the page.
        const arrowStyleButton = document.getElementById("arrow-style");
        const plusStyleButton = document.getElementById("plus-style");

        if (arrowStyleButton && plusStyleButton) {
            arrowStyleButton.addEventListener("click", () => {
                detailsElements.forEach((el) => el.classList.remove("plus-minus"));
                arrowStyleButton.classList.add("active");
                plusStyleButton.classList.remove("active");
            });
            plusStyleButton.addEventListener("click", () => {
                detailsElements.forEach((el) => el.classList.add("plus-minus"));
                plusStyleButton.classList.add("active");
                arrowStyleButton.classList.remove("active");
            });
        }
    });
})();
```
