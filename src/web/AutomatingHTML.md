# Custom Elements in `HTML`

**Modular** -> wrap the code blocks in a `<div>` and then add the reference to the button and its attributes.

```html
<div class="code-container">
  <button class="copy-button">Copy</button>
  <pre><code class="language-html">
    <!-- Your code here -->
    console.log("Hello, World!");
  </code></pre>
</div>
```

**Stylize** the button with CSS -> make sure you use the `class` **attribute** to make references between the HTML and CSS, see below:

```css
.code-container {
  position: relative; /* Allows absolute positioning for the button */
  margin: 1rem 0;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.copy-button:hover {
  opacity: 1;
}
```

## JavaScript's Clipboard Logic

> [TIP]
> Use the API `navigator.clipboard.writeText()`

```javascript
document.querySelectorAll('.code-container').forEach(container => {
  const button = container.querySelector('.copy-button');
  const code = container.querySelector('code').innerText;

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(code) // <- RIGHT THERE
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000); // Reset after 2 seconds
      })
      .catch(err => console.error('Failed to copy:', err));
  });
});
```

> This is **purely** logic for copying to the clipboard

**First**, the document is queried for the `class attribute` ".code-container", which should appear after the `<div>` -> then **for each** instance of the button, the contents (including the text) are then *further* queried, containerized, and set to a constant value. One for the button and one for the text itself. *They will now be very easy to reference throughout the script's logic - essentially, an alias*.

## Adding Attributes Recursively

No external tool is needed! The automation of these attributes can be embedded right there in the HTML with JavaScript

```javascript
document.querySelectorAll('pre code').forEach(codeBlock => {
  const container = document.createElement('div');
  container.className = 'code-container';

  const button = document.createElement('button');
  button.className = 'copy-button';
  button.textContent = 'Copy';

  // Wrap the code block in the container
  codeBlock.parentNode.insertBefore(container, codeBlock);
  container.appendChild(codeBlock);
  container.appendChild(button);
});
```

> This should look familiar -> another query for attributes!

This time, however, instead of listening for a click and copying text, the goal is **create your elements**.

1. Containerize the `pre code` elements by enclosing them in a `<div>`.
2. **For the newly defined container** -> give it the class name that, post-translation, matches the class name of your `CSS` button-style selector.
```css
.code-container{}   ->  <div class="code-container">
```
3. *Same deal for the button, too!*

---
## Decorations

> [!TIP]
> Instead of using a generic "Copied" placeholder, engage user's selections by displaying an **SVG** instead of text.

---

## Full Results - A Simplified Approach

The HTML below, while blandly simplified, is the most basic structure to a function copy button - featuring automated generation and reliance on the `navigator.clipboard` API.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .code-container { position: relative; margin: 1rem 0; }
    .copy-button { position: absolute; top: 8px; right: 8px; /* ... */ }
  </style>
</head>
<body>
  <pre><code class="language-js">console.log("Hello, World!");</code></pre>

  <script> // JAVASCRIPT RIGHT HERE
    // Automate button creation
    document.querySelectorAll('pre code').forEach(codeBlock => {
      const container = document.createElement('div');
      container.className = 'code-container';
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';

      codeBlock.parentNode.insertBefore(container, codeBlock);
      container.appendChild(codeBlock);
      container.appendChild(button);

      button.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.innerText)
          .then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => { button.textContent = 'Copy'; }, 2000);
          });
      });
    });
  </script>
</body>
</html>
```

...
