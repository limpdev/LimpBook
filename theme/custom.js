// -----------------------------------------
// --------------ADDITIONS------------------
// -----------------------------------------

// mdCallouts.js
// ----------------------------------------------------------------------------
function mdCallouts(htmlText) {
    // Define callout types and their icons
    const calloutTypes = {
        NOTE: '<i class="note-icon">󱞁</i>',
        TIP: '<i class="tip-icon">󰴓</i>',
        IMPORTANT: '<i class="important-icon">󱁯</i>',
        WARNING: '<i class="warning-icon">󰉀</i>',
        CAUTION: '<i class="caution-icon">⚠</i>',
    };

    // First handle triple-colon format: ::: type content :::
    const tripleColonRegex = /:::\s*(note|tip|important|warning|caution)\s*\n([\s\S]*?)\n:::/gim;

    htmlText = htmlText.replace(tripleColonRegex, (match, type, content) => {
        const normalizedType = type.toUpperCase();
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

    // Then handle GitHub-style blockquote format: > [!TYPE] content
    const blockquoteRegex =
        /<blockquote>\s*<p>\s*\[!(note|tip|important|warning|caution)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gim;

    htmlText = htmlText.replace(blockquoteRegex, (match, type, content) => {
        const normalizedType = type.toUpperCase();
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

    return htmlText;
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
        applyMdCalloutsToElement("body");

        // If you absolutely must process the entire body (e.g., for very simple static pages):
        // applyMdCalloutsToElement('body');
        // console.warn("[mdCallouts] Processing the entire 'body'. This is generally not recommended for complex pages.");
    });
})();
// -----------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------
// addMarkTags.js
// -----------------------------------------------------------------------------
function addMarkTags(text) {
    // Regex finds any text between  and  (non-greedy)
    const markRegex = /==(.*?)==/g;
    // Using a replacer function for clarity, though direct string could also work
    const markReplace = (match, content) => {
        return `<mark>${content}</mark>`;
    };
    return text.replace(markRegex, markReplace);
}
function applyMarkTagsToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        // CAUTION: Modifying innerHTML can destroy event listeners on child elements.
        // Best used on elements with static content.
        element.innerHTML = addMarkTags(element.innerHTML);
    } else {
        console.warn(`[addMarkTags] Element with selector "${selector}" not found.`);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    applyMarkTagsToElement("body");
});
// -----------------------------------------------------------------------------
// customDetails.js
// -----------------------------------------------------------------------------
// IMPORTANT: This script assumes you have CSS transitions defined for the
// .details-content 'height' property for the animation to be visible.
// e.g., .details-content { transition: height 0.3s ease; }
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        // SVG constants for easy customization
        const SVG_CLOSED =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#ffba5a" d="m11.998 13.503l2.879 1.662c.426.246.923.34 1.365.34c.443 0 .94-.094 1.367-.34l.587-.34V17a1 1 0 0 1-.5.866l-5.196 3a1 1 0 0 1-1 0l-5.196-3a1 1 0 0 1-.5-.866v-2.172l.583.337c.426.246.923.34 1.366.34c.442 0 .939-.094 1.366-.34zM6.887 3.5c.434-.251 1.115-.274 1.594-.068l.138.068l3.379 1.95l3.379-1.95c.434-.251 1.115-.274 1.594-.068l.138.068l4.242 2.45c.447.257.476.664.09.942l-.09.057l-3.378 1.95l3.378 1.95c.447.258.476.665.09.943l-.09.057l-4.242 2.45c-.435.25-1.116.273-1.595.068l-.137-.068l-3.38-1.951l-3.378 1.95c-.435.252-1.116.274-1.595.07l-.137-.07l-4.243-2.449c-.447-.257-.476-.665-.09-.942l.09-.058L6.022 8.9L2.644 6.95c-.447-.257-.476-.665-.09-.942l.09-.058zm5.546 2.702c-.205-.119-.52-.136-.755-.051l-.111.05l-4.243 2.45c-.212.122-.236.313-.07.45l.07.05l4.243 2.449c.205.118.52.135.755.05l.111-.05l4.243-2.45c.212-.122.236-.312.07-.45l-.07-.05z"/></g></svg>';
        const SVG_OPEN =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#ffba5a" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" color="#ffba5a"><path d="m12 5.889l6.111 3.333L12 12.555L5.889 9.222zm-6.667 9.445v1.999c0 1.147.205 1.505 1.229 2.027l4.444 2.267c.976.498 1.012.498 1.988 0l4.444-2.267c1.024-.522 1.229-.88 1.229-2.027v-2"/><path d="M14.596 3.29L12 5.636L9.404 3.289C8.488 2.462 8.03 2.048 7.47 2.004s-1.073.293-2.1.968L3.514 4.194c-.996.655-1.494.983-1.512 1.47s.454.853 1.399 1.585l2.416 1.873L3.4 10.995c-.945.732-1.418 1.098-1.4 1.585s.517.815 1.513 1.47l2.853 1.876c.548.36.821.54 1.12.516c.298-.023.542-.244 1.03-.685L12 12.607l2.596 2.348c.916.827 1.373 1.241 1.933 1.285s1.073-.293 2.1-.968l1.857-1.222c.997-.655 1.495-.983 1.514-1.47s-.455-.853-1.4-1.585l-2.416-1.873L20.6 7.249c.945-.732 1.418-1.098 1.4-1.585s-.517-.815-1.514-1.47l-1.858-1.222c-1.026-.675-1.54-1.012-2.099-.968s-1.017.458-1.933 1.285"/></g></svg>';

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

            // Create and style the toggle button
            const detailsBtn = document.createElement("button");
            detailsBtn.className = "details-toggle-btn";
            detailsBtn.type = "button";
            detailsBtn.innerHTML = SVG_CLOSED; // Default to closed state SVG
            detailsBtn.setAttribute("aria-label", "Toggle details");

            // Insert button into summary
            summary.appendChild(detailsBtn);

            // Prevent summary default behavior and make it non-clickable except for the button
            summary.style.cursor = "default";
            summary.style.listStyle = "none"; // Remove default marker
            summary.addEventListener("click", (e) => {
                e.preventDefault();
            });

            // Button click handler
            detailsBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (details.open) {
                    detailsBtn.innerHTML = SVG_OPEN;

                    contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                    requestAnimationFrame(() => {
                        contentWrapper.style.height = "0px";
                    });

                    contentWrapper.addEventListener("transitionend", function onTransitionEnd(event) {
                        if (event.propertyName === "height") {
                            details.open = false;
                            contentWrapper.removeEventListener("transitionend", onTransitionEnd);
                        }
                    });
                } else {
                    detailsBtn.innerHTML = SVG_CLOSED;
                    details.open = true;

                    requestAnimationFrame(() => {
                        contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                    });

                    contentWrapper.addEventListener("transitionend", function onTransitionEnd(event) {
                        if (event.propertyName === "height") {
                            if (details.open) {
                                contentWrapper.style.height = "auto";
                            }
                            contentWrapper.removeEventListener("transitionend", onTransitionEnd);
                        }
                    });
                }
            });

            // Create content wrapper
            const contentWrapper = document.createElement("div");
            contentWrapper.className = "details-content";
            contentWrapper.style.overflow = "hidden";

            // Move collected content nodes into the wrapper
            contentNodes.forEach((node) => {
                contentWrapper.appendChild(node);
            });
            details.appendChild(contentWrapper);

            // Set initial state based on `open` attribute
            if (!details.open) {
                contentWrapper.style.height = "0px";
                detailsBtn.innerHTML = SVG_CLOSED;
            } else {
                contentWrapper.style.height = contentWrapper.scrollHeight + "px";
                detailsBtn.innerHTML = SVG_OPEN;
                requestAnimationFrame(() => {
                    if (details.open) {
                        contentWrapper.style.height = "auto";
                    }
                });
            }
        });

        // Optional: Style toggle buttons (kept from original)
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
// -----------------------------------------------------------------------------
// NEW SIDEBAR LOGIC
// -----------------------------------------------------------------------------
(function () {
    "use strict";
    const body = document.body;
    const sidebar = document.getElementById("sidebar");
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    const sidebarToggleButton = document.getElementById("sidebar-toggle");
    const sidebarResizeHandle = document.getElementById("sidebar-resize-handle");
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    let firstTouch = null;
    // Initialize sidebar state from localStorage
    function initializeSidebar() {
        try {
            const savedState = localStorage.getItem("mdbook-sidebar");
            const savedWidth = localStorage.getItem("mdbook-sidebar-width");
            if (savedWidth) {
                document.documentElement.style.setProperty("--sidebar-width", savedWidth);
            }
            if (savedState === "hidden") {
                hideSidebar();
            } else {
                showSidebar();
            }
        } catch (e) {
            // Fallback to default visible state
            showSidebar();
        }
    }
    // Show sidebar
    function showSidebar() {
        const SVG_SIDEBAR =
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 24 24"><path d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zM12 19h6.385q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H12z" stroke-width="0.3" stroke="#feefef"/></svg>';
        body.classList.remove("sidebar-hidden");
        body.classList.add("sidebar-visible");
        sidebarLinks.forEach((link) => {
            link.setAttribute("tabIndex", 0);
        });
        sidebarToggleButton.setAttribute("aria-expanded", "true");
        sidebar.setAttribute("aria-hidden", "false");
        sidebarToggleButton.innerHTML = SVG_SIDEBAR;
        try {
            localStorage.setItem("mdbook-sidebar", "visible");
        } catch (e) {
            console.warn("Could not save sidebar state to localStorage");
        }
    }
    // Hide sidebar
    function hideSidebar() {
        body.classList.remove("sidebar-visible");
        body.classList.add("sidebar-hidden");
        sidebarLinks.forEach((link) => {
            link.setAttribute("tabIndex", -1);
        });
        sidebarToggleButton.setAttribute("aria-expanded", "false");
        sidebar.setAttribute("aria-hidden", "true");
        sidebarToggleButton.innerHTML = SVG_SIDEBAR;
        try {
            localStorage.setItem("mdbook-sidebar", "hidden");
        } catch (e) {
            console.warn("Could not save sidebar state to localStorage");
        }
    }
    // Toggle sidebar
    function toggleSidebar() {
        if (body.classList.contains("sidebar-hidden")) {
            showSidebar();
        } else {
            hideSidebar();
        }
    }
    // Resize functionality
    function initResize(e) {
        console.log("Resize initiated"); // Debug log
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(document.documentElement.style.getPropertyValue("--sidebar-width") || "250px", 10);
        body.classList.add("sidebar-resizing");
        document.addEventListener("mousemove", resize, { passive: false });
        document.addEventListener("mouseup", stopResize, { passive: false });
        e.preventDefault();
        e.stopPropagation();
    }
    function resize(e) {
        if (!isResizing) return;
        const diff = e.clientX - startX;
        let newWidth = startWidth + diff;
        // Minimum and maximum width constraints
        newWidth = Math.max(200, Math.min(newWidth, window.innerWidth * 0.8));
        document.documentElement.style.setProperty("--sidebar-width", newWidth + "px");
        // Auto-hide if dragged too small
        if (newWidth < 150) {
            hideSidebar();
        }
    }
    function stopResize() {
        if (!isResizing) return;
        isResizing = false;
        body.classList.remove("sidebar-resizing");
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
        // Save width to localStorage
        try {
            const currentWidth = document.documentElement.style.getPropertyValue("--sidebar-width");
            localStorage.setItem("mdbook-sidebar-width", currentWidth);
        } catch (e) {
            console.warn("Could not save sidebar width to localStorage");
        }
    }
    // Touch gesture support
    function handleTouchStart(e) {
        firstTouch = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now(),
        };
    }
    function handleTouchMove(e) {
        if (!firstTouch) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - firstTouch.x;
        const deltaY = currentY - firstTouch.y;
        const deltaTime = Date.now() - firstTouch.time;
        // Only process horizontal swipes that are fast enough and long enough
        if (deltaTime < 300 && Math.abs(deltaX) > 50 && Math.abs(deltaY) < 100) {
            if (deltaX > 0 && firstTouch.x < 50) {
                // Swipe right from left edge - show sidebar
                showSidebar();
                firstTouch = null;
            } else if (
                deltaX < 0 &&
                firstTouch.x < parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width"), 10)
            ) {
                // Swipe left from within sidebar - hide sidebar
                hideSidebar();
                firstTouch = null;
            }
        }
    }
    function handleTouchEnd() {
        firstTouch = null;
    }
    // Smooth scrolling for anchor links
    function handleLinkClick(e) {
        const href = e.target.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        }
    }
    // Event listeners
    sidebarToggleButton.addEventListener("click", toggleSidebar);
    sidebarResizeHandle.addEventListener("mousedown", initResize);
    // Touch events
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    // Link click handling
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", handleLinkClick);
    });
    // Keyboard accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !body.classList.contains("sidebar-hidden")) {
            hideSidebar();
            sidebarToggleButton.focus();
        }
    });
    // Initialize on load
    initializeSidebar();
    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth < 1050) {
            body.classList.remove("sidebar-visible");
        } else if (!body.classList.contains("sidebar-hidden")) {
            body.classList.add("sidebar-visible");
        }
    });
})();
