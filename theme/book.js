"use strict";
// Fix back button cache problem
window.addEventListener("beforeunload", function () {});
// Global variable, shared between modules
function playground_text(playground, hidden = true) {
    let code_block = playground.querySelector("code");

    if (window.ace && code_block.classList.contains("editable")) {
        let editor = window.ace.edit(code_block);
        return editor.getValue();
    } else if (hidden) {
        return code_block.textContent;
    } else {
        return code_block.innerText;
    }
}
(function codeSnippets() {
    function fetch_with_timeout(url, options, timeout = 6000) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeout)),
        ]);
    }

    var playgrounds = Array.from(document.querySelectorAll(".playground"));
    if (playgrounds.length > 0) {
        fetch_with_timeout("https://play.rust-lang.org/meta/crates", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((response) => {
                // get list of crates available in the rust playground
                let playground_crates = response.crates.map((item) => item["id"]);
                playgrounds.forEach((block) => handle_crate_list_update(block, playground_crates));
            });
    }

    function handle_crate_list_update(playground_block, playground_crates) {
        // update the play buttons after receiving the response
        update_play_button(playground_block, playground_crates);

        // and install on change listener to dynamically update ACE editors
        if (window.ace) {
            let code_block = playground_block.querySelector("code");
            if (code_block.classList.contains("editable")) {
                let editor = window.ace.edit(code_block);
                editor.addEventListener("change", function (e) {
                    update_play_button(playground_block, playground_crates);
                });
                // add Ctrl-Enter command to execute rust code
                editor.commands.addCommand({
                    name: "run",
                    bindKey: {
                        win: "Ctrl-Enter",
                        mac: "Ctrl-Enter",
                    },
                    exec: (_editor) => run_rust_code(playground_block),
                });
            }
        }
    }

    // updates the visibility of play button based on `no_run` class and
    // used crates vs ones available on https://play.rust-lang.org
    function update_play_button(pre_block, playground_crates) {
        var play_button = pre_block.querySelector(".play-button");

        // skip if code is `no_run`
        if (pre_block.querySelector("code").classList.contains("no_run")) {
            play_button.classList.add("hidden");
            return;
        }

        // get list of `extern crate`'s from snippet
        var txt = playground_text(pre_block);
        var re = /extern\s+crate\s+([a-zA-Z_0-9]+)\s*;/g;
        var snippet_crates = [];
        var item;
        while ((item = re.exec(txt))) {
            snippet_crates.push(item[1]);
        }

        // check if all used crates are available on play.rust-lang.org
        var all_available = snippet_crates.every(function (elem) {
            return playground_crates.indexOf(elem) > -1;
        });

        if (all_available) {
            play_button.classList.remove("hidden");
        } else {
            play_button.classList.add("hidden");
        }
    }

    function run_rust_code(code_block) {
        var result_block = code_block.querySelector(".result");
        if (!result_block) {
            result_block = document.createElement("code");
            result_block.className = "result hljs language-bash";

            code_block.append(result_block);
        }

        let text = playground_text(code_block);
        let classes = code_block.querySelector("code").classList;
        let edition = "2015";
        classes.forEach((className) => {
            if (className.startsWith("edition")) {
                edition = className.slice(7);
            }
        });
        var params = {
            version: "stable",
            optimize: "0",
            code: text,
            edition: edition,
        };

        if (text.indexOf("#![feature") !== -1) {
            params.version = "nightly";
        }

        result_block.innerText = "Running...";

        fetch_with_timeout("https://play.rust-lang.org/evaluate.json", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify(params),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.result.trim() === "") {
                    result_block.innerText = "No output";
                    result_block.classList.add("result-no-output");
                } else {
                    result_block.innerText = response.result;
                    result_block.classList.remove("result-no-output");
                }
            })
            .catch((error) => (result_block.innerText = "Playground Communication: " + error.message));
    }

    // Syntax highlighting Configuration
    hljs.configure({
        tabReplace: "    ", // 4 spaces
        languages: [], // Languages used for auto-detection
    });

    let code_nodes = Array.from(document.querySelectorAll("code"))
        // Don't highlight `inline code` blocks in headers.
        .filter(function (node) {
            return !node.parentElement.classList.contains("header");
        });

    if (window.ace) {
        // language-rust class needs to be removed for editable
        // blocks or highlightjs will capture events
        code_nodes
            .filter(function (node) {
                return node.classList.contains("editable");
            })
            .forEach(function (block) {
                block.classList.remove("language-rust");
            });

        code_nodes
            .filter(function (node) {
                return !node.classList.contains("editable");
            })
            .forEach(function (block) {
                hljs.highlightBlock(block);
            });
    } else {
        code_nodes.forEach(function (block) {
            hljs.highlightBlock(block);
        });
    }

    // Adding the hljs class gives code blocks the color css
    // even if highlighting doesn't apply
    code_nodes.forEach(function (block) {
        block.classList.add("hljs");
    });

    Array.from(document.querySelectorAll("code.hljs")).forEach(function (block) {
        var lines = Array.from(block.querySelectorAll(".boring"));
        // If no lines were hidden, return
        if (!lines.length) {
            return;
        }
        block.classList.add("hide-boring");

        var buttons = document.createElement("div");
        buttons.className = "buttons";
        buttons.innerHTML = '<button class="fa fa-eye" title="Show hidden lines" aria-label="Show hidden lines"></button>';

        // add expand button
        var pre_block = block.parentNode;
        pre_block.insertBefore(buttons, pre_block.firstChild);

        pre_block.querySelector(".buttons").addEventListener("click", function (e) {
            if (e.target.classList.contains("fa-eye")) {
                e.target.classList.remove("fa-eye");
                e.target.classList.add("fa-eye-slash");
                e.target.title = "Hide lines";
                e.target.setAttribute("aria-label", e.target.title);

                block.classList.remove("hide-boring");
            } else if (e.target.classList.contains("fa-eye-slash")) {
                e.target.classList.remove("fa-eye-slash");
                e.target.classList.add("fa-eye");
                e.target.title = "Show hidden lines";
                e.target.setAttribute("aria-label", e.target.title);

                block.classList.add("hide-boring");
            }
        });
    });

    if (window.playground_copyable) {
        Array.from(document.querySelectorAll("pre code")).forEach(function (block) {
            var pre_block = block.parentNode;
            if (!pre_block.classList.contains("playground")) {
                var buttons = pre_block.querySelector(".buttons");
                if (!buttons) {
                    buttons = document.createElement("div");
                    buttons.className = "buttons";
                    pre_block.insertBefore(buttons, pre_block.firstChild);
                }

                var clipButton = document.createElement("button");
                clipButton.className = "clip-button";
                clipButton.title = "Copy to clipboard";
                clipButton.setAttribute("aria-label", clipButton.title);
                clipButton.innerHTML =
                    '<svg version="1.1" id="clipSVG" viewBox="0 0 36 36" height="30" width="30"><path id="efyt-custom-script" d="m 19.658,22.84 5.75,-5.75 -5.75,-5.75 1.75,-1.7499999 7.5,7.4999999 -7.5,7.5 z m -3.316,0 -5.75,-5.75 5.75,-5.75 -1.75,-1.7499999 -7.5,7.4999999 7.5,7.5 z"/></svg>';

                buttons.insertBefore(clipButton, buttons.firstChild);
            }
        });
    }

    // Process playground code blocks
    Array.from(document.querySelectorAll(".playground")).forEach(function (pre_block) {
        // Add play button
        var buttons = pre_block.querySelector(".buttons");
        if (!buttons) {
            buttons = document.createElement("div");
            buttons.className = "buttons";
            pre_block.insertBefore(buttons, pre_block.firstChild);
        }

        var runCodeButton = document.createElement("button");
        runCodeButton.className = "fa fa-play play-button";
        runCodeButton.hidden = true;
        runCodeButton.title = "Run this code";
        runCodeButton.setAttribute("aria-label", runCodeButton.title);

        buttons.insertBefore(runCodeButton, buttons.firstChild);
        runCodeButton.addEventListener("click", function (e) {
            run_rust_code(pre_block);
        });

        if (window.playground_copyable) {
            var copyCodeClipboardButton = document.createElement("button");
            copyCodeClipboardButton.className = "clip-button";
            copyCodeClipboardButton.innerHTML = '<i class="tooltiptext"></i>';
            copyCodeClipboardButton.title = "Copy to clipboard";
            copyCodeClipboardButton.setAttribute("aria-label", copyCodeClipboardButton.title);

            buttons.insertBefore(copyCodeClipboardButton, buttons.firstChild);
        }

        let code_block = pre_block.querySelector("code");
        if (window.ace && code_block.classList.contains("editable")) {
            var undoChangesButton = document.createElement("button");
            undoChangesButton.className = "fa fa-history reset-button";
            undoChangesButton.title = "Undo changes";
            undoChangesButton.setAttribute("aria-label", undoChangesButton.title);

            buttons.insertBefore(undoChangesButton, buttons.firstChild);

            undoChangesButton.addEventListener("click", function () {
                let editor = window.ace.edit(code_block);
                editor.setValue(editor.originalCode);
                editor.clearSelection();
            });
        }
    });
})();
(function themes() {
    var html = document.querySelector("html");
    var themeToggleButton = document.getElementById("theme-toggle");
    var themePopup = document.getElementById("theme-list");
    var themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    var themeIds = [];
    themePopup.querySelectorAll("button.theme").forEach(function (el) {
        themeIds.push(el.id);
    });
    var stylesheets = {
        ayuHighlight: document.querySelector("#ayu-highlight-css"),
        tomorrowNight: document.querySelector("#tomorrow-night-css"),
        highlight: document.querySelector("#highlight-css"),
    };

    function showThemes() {
        themePopup.style.display = "block";
        themeToggleButton.setAttribute("aria-expanded", true);
        themePopup.querySelector("button#" + get_theme()).focus();
    }

    function updateThemeSelected() {
        themePopup.querySelectorAll(".theme-selected").forEach(function (el) {
            el.classList.remove("theme-selected");
        });
        themePopup.querySelector("button#" + get_theme()).classList.add("theme-selected");
    }

    function hideThemes() {
        themePopup.style.display = "none";
        themeToggleButton.setAttribute("aria-expanded", false);
        themeToggleButton.focus();
    }

    function get_theme() {
        var theme;
        try {
            theme = localStorage.getItem("mdbook-theme");
        } catch (e) {}
        if (theme === null || theme === undefined || !themeIds.includes(theme)) {
            return default_theme;
        } else {
            return theme;
        }
    }

    function set_theme(theme, store = true) {
        let ace_theme;

        if (theme == "coal" || theme == "navy") {
            stylesheets.ayuHighlight.disabled = true;
            stylesheets.tomorrowNight.disabled = false;
            stylesheets.highlight.disabled = true;

            ace_theme = "ace/theme/tomorrow_night";
        } else if (theme == "ayu") {
            stylesheets.ayuHighlight.disabled = false;
            stylesheets.tomorrowNight.disabled = true;
            stylesheets.highlight.disabled = true;
            ace_theme = "ace/theme/tomorrow_night";
        } else {
            stylesheets.ayuHighlight.disabled = true;
            stylesheets.tomorrowNight.disabled = true;
            stylesheets.highlight.disabled = false;
            ace_theme = "ace/theme/dawn";
        }

        setTimeout(function () {
            themeColorMetaTag.content = getComputedStyle(document.documentElement).backgroundColor;
        }, 1);

        if (window.ace && window.editors) {
            window.editors.forEach(function (editor) {
                editor.setTheme(ace_theme);
            });
        }

        var previousTheme = get_theme();

        if (store) {
            try {
                localStorage.setItem("mdbook-theme", theme);
            } catch (e) {}
        }

        html.classList.remove(previousTheme);
        html.classList.add(theme);
        updateThemeSelected();
    }

    // Set theme
    var theme = get_theme();

    set_theme(theme, false);

    themeToggleButton.addEventListener("click", function () {
        if (themePopup.style.display === "block") {
            hideThemes();
        } else {
            showThemes();
        }
    });

    themePopup.addEventListener("click", function (e) {
        var theme;
        if (e.target.className === "theme") {
            theme = e.target.id;
        } else if (e.target.parentElement.className === "theme") {
            theme = e.target.parentElement.id;
        } else {
            return;
        }
        set_theme(theme);
    });

    themePopup.addEventListener("focusout", function (e) {
        // e.relatedTarget is null in Safari and Firefox on macOS (see workaround below)
        if (!!e.relatedTarget && !themeToggleButton.contains(e.relatedTarget) && !themePopup.contains(e.relatedTarget)) {
            hideThemes();
        }
    });

    // Should not be needed, but it works around an issue on macOS & iOS: https://github.com/rust-lang/mdBook/issues/628
    document.addEventListener("click", function (e) {
        if (
            themePopup.style.display === "block" &&
            !themeToggleButton.contains(e.target) &&
            !themePopup.contains(e.target)
        ) {
            hideThemes();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
            return;
        }
        if (!themePopup.contains(e.target)) {
            return;
        }

        switch (e.key) {
            case "Escape":
                e.preventDefault();
                hideThemes();
                break;
            case "ArrowUp":
                e.preventDefault();
                var li = document.activeElement.parentElement;
                if (li && li.previousElementSibling) {
                    li.previousElementSibling.querySelector("button").focus();
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                var li = document.activeElement.parentElement;
                if (li && li.nextElementSibling) {
                    li.nextElementSibling.querySelector("button").focus();
                }
                break;
            case "Home":
                e.preventDefault();
                themePopup.querySelector("li:first-child button").focus();
                break;
            case "End":
                e.preventDefault();
                themePopup.querySelector("li:last-child button").focus();
                break;
        }
    });
})();
(function sidebar() {
    var body = document.querySelector("body");
    var sidebar = document.getElementById("sidebar");
    var sidebarLinks = document.querySelectorAll("#sidebar a");
    var sidebarToggleButton = document.getElementById("sidebar-toggle");
    var sidebarToggleAnchor = document.getElementById("sidebar-toggle-anchor");
    var sidebarResizeHandle = document.getElementById("sidebar-resize-handle");
    var firstContact = null;

    function showSidebar() {
        body.classList.remove("sidebar-hidden");
        body.classList.add("sidebar-visible");
        Array.from(sidebarLinks).forEach(function (link) {
            link.setAttribute("tabIndex", 0);
        });
        sidebarToggleButton.setAttribute("aria-expanded", true);
        sidebar.setAttribute("aria-hidden", false);
        try {
            localStorage.setItem("mdbook-sidebar", "visible");
        } catch (e) {}
    }

    function hideSidebar() {
        body.classList.remove("sidebar-visible");
        body.classList.add("sidebar-hidden");
        Array.from(sidebarLinks).forEach(function (link) {
            link.setAttribute("tabIndex", -1);
        });
        sidebarToggleButton.setAttribute("aria-expanded", false);
        sidebar.setAttribute("aria-hidden", true);
        try {
            localStorage.setItem("mdbook-sidebar", "hidden");
        } catch (e) {}
    }

    // Toggle sidebar
    sidebarToggleAnchor.addEventListener("change", function sidebarToggle() {
        if (sidebarToggleAnchor.checked) {
            var current_width = parseInt(document.documentElement.style.getPropertyValue("--sidebar-width"), 10);
            if (current_width < 150) {
                document.documentElement.style.setProperty("--sidebar-width", "150px");
            }
            showSidebar();
        } else {
            hideSidebar();
        }
    });

    sidebarResizeHandle.addEventListener("mousedown", initResize, false);

    function initResize(e) {
        window.addEventListener("mousemove", resize, false);
        window.addEventListener("mouseup", stopResize, false);
        body.classList.add("sidebar-resizing");
    }
    function resize(e) {
        var pos = e.clientX - sidebar.offsetLeft;
        if (pos < 20) {
            hideSidebar();
        } else {
            if (body.classList.contains("sidebar-hidden")) {
                showSidebar();
            }
            pos = Math.min(pos, window.innerWidth - 100);
            document.documentElement.style.setProperty("--sidebar-width", pos + "px");
        }
    }
    //on mouseup remove windows functions mousemove & mouseup
    function stopResize(e) {
        body.classList.remove("sidebar-resizing");
        window.removeEventListener("mousemove", resize, false);
        window.removeEventListener("mouseup", stopResize, false);
    }

    document.addEventListener(
        "touchstart",
        function (e) {
            firstContact = {
                x: e.touches[0].clientX,
                time: Date.now(),
            };
        },
        { passive: true },
    );

    document.addEventListener(
        "touchmove",
        function (e) {
            if (!firstContact) return;

            var curX = e.touches[0].clientX;
            var xDiff = curX - firstContact.x,
                tDiff = Date.now() - firstContact.time;

            if (tDiff < 250 && Math.abs(xDiff) >= 150) {
                if (xDiff >= 0 && firstContact.x < Math.min(document.body.clientWidth * 0.25, 300)) showSidebar();
                else if (xDiff < 0 && curX < 300) hideSidebar();

                firstContact = null;
            }
        },
        { passive: true },
    );
})();
(function chapterNavigation() {
    document.addEventListener("keydown", function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
            return;
        }
        if (window.search && window.search.hasFocus()) {
            return;
        }
        var html = document.querySelector("html");

        function next() {
            var nextButton = document.querySelector(".nav-chapters.next");
            if (nextButton) {
                window.location.href = nextButton.href;
            }
        }
        function prev() {
            var previousButton = document.querySelector(".nav-chapters.previous");
            if (previousButton) {
                window.location.href = previousButton.href;
            }
        }
        switch (e.key) {
            case "ArrowRight":
                e.preventDefault();
                if (html.dir == "rtl") {
                    prev();
                } else {
                    next();
                }
                break;
            case "ArrowLeft":
                e.preventDefault();
                if (html.dir == "rtl") {
                    next();
                } else {
                    prev();
                }
                break;
        }
    });
})();
(function clipboard() {
    var clipButtons = document.querySelectorAll(".clip-button");

    function hideTooltip(elem) {
        elem.firstChild.innerText = "";
        elem.className = "clip-button";
    }

    function showTooltip(elem, msg) {
        elem.firstChild.innerText = msg;
        elem.className = "clip-button tooltipped";
    }

    var clipboardSnippets = new ClipboardJS(".clip-button", {
        text: function (trigger) {
            hideTooltip(trigger);
            let playground = trigger.closest("pre");
            return playground_text(playground, false);
        },
    });

    Array.from(clipButtons).forEach(function (clipButton) {
        clipButton.addEventListener("mouseout", function (e) {
            hideTooltip(e.currentTarget);
        });
    });

    clipboardSnippets.on("success", function (e) {
        e.clearSelection();
        showTooltip(e.trigger, "Copied!");
    });

    clipboardSnippets.on("error", function (e) {
        showTooltip(e.trigger, "Clipboard error!");
    });
})();
(function scrollToTop() {
    var menuTitle = document.querySelector(".menu-title");

    menuTitle.addEventListener("click", function () {
        document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
    });
})();
(function controlMenu() {
    var menu = document.getElementById("menu-bar");

    (function controlPosition() {
        var scrollTop = document.scrollingElement.scrollTop;
        var prevScrollTop = scrollTop;
        var minMenuY = -menu.clientHeight - 50;
        // When the script loads, the page can be at any scroll (e.g. if you reforesh it).
        menu.style.top = scrollTop + "px";
        // Same as parseInt(menu.style.top.slice(0, -2), but faster
        var topCache = menu.style.top.slice(0, -2);
        menu.classList.remove("sticky");
        var stickyCache = false; // Same as menu.classList.contains('sticky'), but faster
        document.addEventListener(
            "scroll",
            function () {
                scrollTop = Math.max(document.scrollingElement.scrollTop, 0);
                // `null` means that it doesn't need to be updated
                var nextSticky = null;
                var nextTop = null;
                var scrollDown = scrollTop > prevScrollTop;
                var menuPosAbsoluteY = topCache - scrollTop;
                if (scrollDown) {
                    nextSticky = false;
                    if (menuPosAbsoluteY > 0) {
                        nextTop = prevScrollTop;
                    }
                } else {
                    if (menuPosAbsoluteY > 0) {
                        nextSticky = true;
                    } else if (menuPosAbsoluteY < minMenuY) {
                        nextTop = prevScrollTop + minMenuY;
                    }
                }
                if (nextSticky === true && stickyCache === false) {
                    menu.classList.add("sticky");
                    stickyCache = true;
                } else if (nextSticky === false && stickyCache === true) {
                    menu.classList.remove("sticky");
                    stickyCache = false;
                }
                if (nextTop !== null) {
                    menu.style.top = nextTop + "px";
                    topCache = nextTop;
                }
                prevScrollTop = scrollTop;
            },
            { passive: true },
        );
    })();
    (function controlBorder() {
        function updateBorder() {
            if (menu.offsetTop === 0) {
                menu.classList.remove("bordered");
            } else {
                menu.classList.add("bordered");
            }
        }
        updateBorder();
        document.addEventListener("scroll", updateBorder, { passive: true });
    })();
})();

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
/**
 * Replaces text wrapped with ... with <mark>...</mark> tags in a given string.
 * Example: "Hello world" becomes "Hello <mark>world</mark>"
 * @param {string} text - The input string (can be plain text or HTML string).
 * @returns {string} The string with replacements.
 */
function addMarkTags(text) {
    // Regex finds any text between  and  (non-greedy)
    const markRegex = /==(.*?)==/g;
    // Using a replacer function for clarity, though direct string could also work
    const markReplace = (match, content) => {
        return `<mark>${content}</mark>`;
    };
    return text.replace(markRegex, markReplace);
}
// Example Usage (typically run after DOM content is loaded):
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
        const SVG_CLOSED = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 218"><path fill="#5595ff" d="M63.995 0L0 40.771l63.995 40.772L128 40.771zM192 0l-64 40.775l64 40.775l64.001-40.775zM0 122.321l63.995 40.772L128 122.321L63.995 81.55zM192 81.55l-64 40.775l64 40.774l64-40.774zM64 176.771l64.005 40.772L192 176.771L128.005 136z"/></svg>';
        const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 218"><path fill="#5595ff" d="M63.995 0L0 40.771l63.995 40.772L128 40.771zM192 0l-64 40.775l64 40.775l64.001-40.775zM0 122.321l63.995 40.772L128 122.321L63.995 81.55zM192 81.55l-64 40.775l64 40.774l64-40.774zM64 176.771l64.005 40.772L192 176.771L128.005 136z"/></svg>';

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
