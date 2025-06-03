"use strict";

// Fix back button cache problem
window.addEventListener("beforeunload", function() {});

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
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), timeout)
            ),
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
            .then(response => response.json())
            .then(response => {
                // get list of crates available in the rust playground
                let playground_crates = response.crates.map(item => item["id"]);
                playgrounds.forEach(block =>
                    handle_crate_list_update(block, playground_crates)
                );
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
                editor.addEventListener("change", function(e) {
                    update_play_button(playground_block, playground_crates);
                });
                // add Ctrl-Enter command to execute rust code
                editor.commands.addCommand({
                    name: "run",
                    bindKey: {
                        win: "Ctrl-Enter",
                        mac: "Ctrl-Enter",
                    },
                    exec: _editor => run_rust_code(playground_block),
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
        var all_available = snippet_crates.every(function(elem) {
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
        classes.forEach(className => {
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
            .then(response => response.json())
            .then(response => {
                if (response.result.trim() === "") {
                    result_block.innerText = "No output";
                    result_block.classList.add("result-no-output");
                } else {
                    result_block.innerText = response.result;
                    result_block.classList.remove("result-no-output");
                }
            })
            .catch(error => {
                result_block.innerText = "Playground Communication: " + error.message;
            });
    }

    // Syntax highlighting Configuration
    hljs.configure({
        tabReplace: "    ", // 4 spaces
        languages: [], // Languages used for auto-detection
    });

    let code_nodes = Array.from(document.querySelectorAll("code"))
        // Don't highlight `inline code` blocks in headers.
        .filter(function(node) {
            return !node.parentElement.classList.contains("header");
        });

    if (window.ace) {
        // language-rust class needs to be removed for editable
        // blocks or highlightjs will capture events
        code_nodes
            .filter(function(node) {
                return node.classList.contains("editable");
            })
            .forEach(function(block) {
                block.classList.remove("language-rust");
            });

        code_nodes
            .filter(function(node) {
                return !node.classList.contains("editable");
            })
            .forEach(function(block) {
                hljs.highlightBlock(block);
            });
    } else {
        code_nodes.forEach(function(block) {
            hljs.highlightBlock(block);
        });
    }

    // Adding the hljs class gives code blocks the color css
    // even if highlighting doesn't apply
    code_nodes.forEach(function(block) {
        block.classList.add("hljs");
    });

    Array.from(document.querySelectorAll("code.hljs")).forEach(function(block) {
        var lines = Array.from(block.querySelectorAll(".boring"));
        // If no lines were hidden, return
        if (!lines.length) {
            return;
        }
        block.classList.add("hide-boring");

        var buttons = document.createElement("div");
        buttons.className = "buttons";
        buttons.innerHTML =
            '<button class="fa fa-eye" title="Show hidden lines" aria-label="Show hidden lines"></button>';

        // add expand button
        var pre_block = block.parentNode;
        pre_block.insertBefore(buttons, pre_block.firstChild);

        pre_block.querySelector(".buttons").addEventListener("click", function(e) {
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
        Array.from(document.querySelectorAll("pre code")).forEach(function(block) {
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

                // Default copy SVG
                var copySVG =
                    '<svg xmlns="http://www.w3.org/2000/svg" id="clipButton" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 9V6.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 3 11.08 3 12.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v5.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 15 18.92 15 17.803 15H15M9 9H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 10.52 3 11.08 3 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.607c1.117 0 1.676 0 2.104-.218a2 2 0 0 0 .874-.874c.218-.428.218-.987.218-2.105V15M9 9h2.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.427.218.987.218 2.105V15"/></svg>';

                // Success checkmark SVG (scaled to 24x24 to match)
                var successSVG =
                    '<svg xmlns="http://www.w3.org/2000/svg" id="clipSuccess" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.75 3H15a3 3 0 1 0-6 0H2.25a.75.75 0 0 0-.75.75v19.5a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75M12 1.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 21H3V4.5h3v2.25a.75.75 0 0 0 .75.75h10.5a.75.75 0 0 0 .75-.75V4.5h3z"/><path fill="currentColor" d="M10.5 20.121L5.689 14.56l1.371-1.371L10.5 15.879l6.44-5.689l1.371 1.371z"/></svg>';
                clipButton.innerHTML = copySVG;

                // Add CSS for smooth transition
                clipButton.style.transition = "all 0.2s ease";

                // Function to show success state
                function showSuccess() {
                    clipButton.innerHTML = successSVG;
                    clipButton.style.color = "#10b981"; // Green color for success
                    clipButton.title = "Copied!";
                    clipButton.setAttribute("aria-label", "Copied!");

                    // Reset after 2 seconds
                    setTimeout(function() {
                        clipButton.innerHTML = copySVG;
                        clipButton.style.color = "";
                        clipButton.title = "Copy to clipboard";
                        clipButton.setAttribute("aria-label", "Copy to clipboard");
                    }, 2000);
                }

                // Add click event listener to trigger success state
                clipButton.addEventListener("click", function() {
                    // Call your existing copy functionality here
                    // navigator.clipboard.writeText(playground_text(pre_block.closest(".playground") || pre_block, false)); // Example
                    showSuccess();
                });
                buttons.insertBefore(clipButton, buttons.firstChild);
            }
        });
    }

    // Process playground code blocks
    Array.from(document.querySelectorAll(".playground")).forEach(function(pre_block) {
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
        runCodeButton.addEventListener("click", function(e) {
            run_rust_code(pre_block);
        });

        if (window.playground_copyable) {
            var copyCodeClipboardButton = document.createElement("button");
            copyCodeClipboardButton.className = "clip-button"; // Assuming same class as other copy buttons for styling
            // copyCodeClipboardButton.innerHTML = '<i class="tooltiptext"></i>'; // Original
            // Using the same SVG logic as above for consistency, or a different one if desired
            var copySVGPlayground =
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 9V6.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 3 11.08 3 12.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v5.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 15 18.92 15 17.803 15H15M9 9H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 10.52 3 11.08 3 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.607c1.117 0 1.676 0 2.104-.218a2 2 0 0 0 .874-.874c.218-.428.218-.987.218-2.105V15M9 9h2.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.427.218.987.218 2.105V15"/></svg>';
            var successSVGPlayground =
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.75 3H15a3 3 0 1 0-6 0H2.25a.75.75 0 0 0-.75.75v19.5a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75M12 1.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 21H3V4.5h3v2.25a.75.75 0 0 0 .75.75h10.5a.75.75 0 0 0 .75-.75V4.5h3z"/><path fill="currentColor" d="M10.5 20.121L5.689 14.56l1.371-1.371L10.5 15.879l6.44-5.689l1.371 1.371z"/></svg>';

            copyCodeClipboardButton.innerHTML = copySVGPlayground;
            copyCodeClipboardButton.title = "Copy to clipboard";
            copyCodeClipboardButton.setAttribute("aria-label", copyCodeClipboardButton.title);
            copyCodeClipboardButton.style.transition = "all 0.2s ease";

            copyCodeClipboardButton.addEventListener("click", function() {
                // navigator.clipboard.writeText(playground_text(pre_block)); // Example copy logic
                copyCodeClipboardButton.innerHTML = successSVGPlayground;
                copyCodeClipboardButton.style.color = "#10b981";
                copyCodeClipboardButton.title = "Copied!";
                copyCodeClipboardButton.setAttribute("aria-label", "Copied!");

                setTimeout(function() {
                    copyCodeClipboardButton.innerHTML = copySVGPlayground;
                    copyCodeClipboardButton.style.color = "";
                    copyCodeClipboardButton.title = "Copy to clipboard";
                    copyCodeClipboardButton.setAttribute("aria-label", "Copy to clipboard");
                }, 2000);
            });

            buttons.insertBefore(copyCodeClipboardButton, buttons.firstChild);
        }

        let code_block = pre_block.querySelector("code");
        if (window.ace && code_block.classList.contains("editable")) {
            var undoChangesButton = document.createElement("button");
            undoChangesButton.className = "fa fa-history reset-button";
            undoChangesButton.title = "Undo changes";
            undoChangesButton.setAttribute("aria-label", undoChangesButton.title);

            buttons.insertBefore(undoChangesButton, buttons.firstChild);

            undoChangesButton.addEventListener("click", function() {
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
    
    const copySound = new Audio('copyClick.wav');
    clipboardSnippets.on("success", function (e) {
        e.clearSelection();
        showTooltip(e.trigger, "Copied!");
        copySound.currentTime = 0;
        copySound.play();
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
