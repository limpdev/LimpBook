# HTML - Github Code Copier

> [!TIP]
> Below is the full `div` for github's copy button within code blocks... 'd=' are the curve attributes for a `<path>`, or in other words, it's the raw SVG image!


```html
<div class="zeroclipboard-container">
    <clipboard-copy aria-label="Copy" class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 d-flex flex-justify-center flex-items-center" data-copy-feedback="Copied!" data-tooltip-direction="w" value="# tap
brew tap imthaghost/goclone
# install tool
brew install goclone" tabindex="0" role="button">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none">
    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>
    </clipboard-copy>
  </div>
```
## reworked + css styling...

```css
/* Custom copy button styling */
clipboard-copy {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0.5rem;
    background: none;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
}

clipboard-copy:hover {
    background-color: rgba(175, 184, 193, 0.2);
    border-color: #8b949e;
}

clipboard-copy:active {
    background-color: rgba(175, 184, 193, 0.3);
}

/* Tooltip feedback */
clipboard-copy::before {
    content: "Copy";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 6px;
    padding: 4px 8px;
    background: #1b1f23;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    white-space: nowrap;
}

clipboard-copy:hover::before {
    opacity: 1;
}

clipboard-copy[data-copy-feedback]::before {
    content: attr(data-copy-feedback);
}

/* Icon styling */
clipboard-copy .octicon-copy {
    width: 16px;
    height: 16px;
    fill: #57606a;
}

clipboard-copy .octicon-check {
    width: 16px;
    height: 16px;
    fill: #2da44e;
    display: none;
}

clipboard-copy.copied .octicon-copy {
    display: none;
}

clipboard-copy.copied .octicon-check {
    display: block;
}
```

> and the HTML

```html
<clipboard-copy data-copy-feedback="Copied!" value="Your code here">
    <svg class="octicon-copy" viewBox="0 0 16 16" version="1.1">
        <!-- Copy icon path -->
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
    <svg class="octicon-check" viewBox="0 0 16 16" version="1.1">
        <!-- Check icon path -->
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
    </svg>
</clipboard-copy>
```
---

## Markdown Viewer Extension - Copy Button

```css
:root[data-mdr-code-block-theme="dark"] .mdr {
    --button_cb_copy-color: rgba(181, 181, 184, .7);
    --button_cb_copy-color-hover: rgba(181, 181, 184, .8);
    --button_cb_copy-color-active: rgba(181, 181, 184, .8);
    --button_cb_copy-bg: rgba(58, 60, 62, .5);
    --button_cb_copy-bg-hover: rgba(58, 60, 62, .7);
    --button_cb_copy-bg-active: rgba(58, 60, 62, .7);
}
```


```html
<button class="mdr__toggle mdr-block-copy-btn" title="Copy"><span class="btn-icon icon-copy"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225">
  <path d="M9,189.78V98.22A26.22,26.22,0,0,1,35.22,72h91.56A26.22,26.22,0,0,1,153,98.22v91.56A26.22,26.22,0,0,1,126.78,216H35.22A26.22,26.22,0,0,1,9,189.78Zm18-85.65v79.74A14.13,14.13,0,0,0,41.13,198h79.74A14.13,14.13,0,0,0,135,183.87V104.13A14.13,14.13,0,0,0,120.87,90H41.13A14.13,14.13,0,0,0,27,104.13Z"></path>
  <path d="M54,117h54a9,9,0,0,1,9,9h0a9,9,0,0,1-9,9H54a9,9,0,0,1-9-9h0A9,9,0,0,1,54,117Z"></path>
  <rect x="45" y="153" width="72" height="18" rx="9"></rect>
  <path d="M72,54V36.43A27.43,27.43,0,0,1,99.43,9h90.09A26.47,26.47,0,0,1,216,35.48v90.09A27.43,27.43,0,0,1,188.57,153H171a9,9,0,0,1-9-9h0a9,9,0,0,1,9-9h13.32A13.67,13.67,0,0,0,198,121.32V40.68A13.67,13.67,0,0,0,184.32,27H103.68A13.67,13.67,0,0,0,90,40.68V54a9,9,0,0,1-9,9h0A9,9,0,0,1,72,54Z"></path>
</svg>
</span><span class="btn-icon icon-success"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m939.75146667 218.688c-26.9984-26.99946667-70.77226667-26.99946667-97.77066667 0l-439.97333333 439.97226667-219.98613334-219.98613334c-26.99946667-26.99946667-70.77333333-26.99946667-97.77173333 0s-26.99946667 70.77333333 0 97.77066667l268.87146667 268.87146667c.7776.77866667 1.53493333 1.49546667 2.27626666 2.16426666 27.1296 24.80746667 69.24053333 24.09066667 95.49546667-2.16426666l488.85653333-488.85653334c27.00053333-26.99946667 27.00053333-70.77333333.00106667-97.77173333z"></path></svg></span></button>
```
