# My Snippet Collection

> `wget`

```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent <LINK>
```

↳ **BEST METHOD FOR FULL-SITE-SCRAPE!** Ensures all links are properly converted to match the mirrored path structure... *will be resource heavy* 🗿.

---

<details><summary> <i>CONFIGURATION FOR <code>ESPANSO</code></i></summary>

```yaml
# espanso match file
# For a complete introduction, visit the official docs at: https://espanso.org/docs/
# You can use this file to define the base matches (aka snippets)
# that will be available in every application when using espanso.
# Matches are substitution rules: when you type the "trigger" string
# it gets replaced by the "replace" string.
matches:
    # Simple text replacement
    - trigger: ":espanso"
      replace: "Hi there!"
    # NOTE: espanso uses YAML to define matches, so pay attention to the indentation!
    # But matches can also be dynamic:
    # Print the current date
    - trigger: ":date"
      replace: "{{mydate}}"
      vars:
          - name: mydate
            type: date
            params:
                format: "%m/%d/%Y"
    # Print the output of a shell command -> RUN ACTUAL COMMANDS
    - trigger: ":shell"
      replace: "{{output}}"
      vars:
          - name: output
            type: shell
            params:
                cmd: "echo 'Hello from your shell'"
    # Pastes the syntax for powershell ENV variables...
    - trigger: ":path"
      replace: "$env:Path += ';'"
    - trigger: ":qq"
      replace: ":q!"
    # Colorful banners for GitHub Flavoured Markdown!
    - trigger: ":tip"
      replace: "> [!TIP] \n> $|$"
    - trigger: ":import"
      replace: "> [!IMPORTANT] \n> $|$"
    - trigger: ":note"
      replace: "> [!NOTE] \n> $|$"
    - trigger: ":warn"
      replace: "> [!WARNING] \n> $|$"
    - trigger: ":caut"
      replace: "> [!CAUTION] \n> $|$"
    # CODEBLOCKS & FRONTMATTER
    - trigger: ":pre"
      replace: "```bash\n$|$\n```"
    - trigger: ":go"
      replace: "```go\n$|$\n```"
    - trigger: ":python"
      replace: "```python\n$|$\n```"
    - trigger: ":javascript"
      replace: "```javascript\n$|$\n```"
    - trigger: ":fm"
      replace: "---\ntitle: $|$\ndraft: false\n---"
    - trigger: ":html"
      replace: "```html\n$|$\n```"
    - trigger: ":css"
      replace: "```css\n$|$\n```"
    # META (ESPANSO)
    - trigger: ":trigger"
      replace: "- trigger: $|$ \nreplace: "
    # HTML Icons & Images
    - trigger: ":img"
      replace: "<img width='96px' height='96px' style='position: relative; display: inline-flex; left: 50px; border-radius:10px;' src='$|$' />"
    - trigger: ":link"
      replace: "[$|$](@)"
    - trigger: ":email"
      replace: "drewjgorbet@outlook.com"
    - trigger: ":gmail"
      replace: "drewjgorbet@gmail.com"
    - trigger: ":devmail"
      replace: "drewgorbet2020@gmail.com"
    - trigger: ":shitmail"
      replace: "andygorbet@gmail.com"
    - trigger: ":icon"
      replace: "<i class='$|$'></i>"
    - trigger: ":div"
      replace: "<div>$|$</div>"
    - trigger: ":body"
      replace: "<body>$|$</body>"
    - trigger: "!import"
      replace: "!important;"
    - trigger: ":comment"
      replace: "/* $|$ */"
    - trigger: ":list"
      replace: "<details><summary><strong>$|$</strong></summary>\n</details>"
    - trigger: ":alias"
      replace: "Set-Alias ^ '$|$'"
    - trigger: ":anchor"
      replace: "<a href='#$|$'>$|$</a>"
    - trigger: ":htmlcom"
      replace: "<!-- $|$ -->"
    - trigger: ":details"
      replace: "<details><summary>🎁<i></i></summary>\n$|$\n</details>\n"
    #################################################################################################
    - trigger: ";js"
      replace: "  "
    - trigger: ";ts"
      replace: "  "
    - trigger: ";py"
      replace: "  "
    - trigger: ";go"
      replace: "  "
    - trigger: ";rs"
      replace: "  "
    - trigger: ";html"
      replace: "  "
    - trigger: ";css"
      replace: "  "
    - trigger: ";rb"
      replace: "  "
    - trigger: ";java"
      replace: "  "
    - trigger: ";cpp"
      replace: "  "
    - trigger: ";tail"
      replace: "  "
    - trigger: ";vue"
      replace: "  "
    - trigger: ";svelte"
      replace: "  "
    - trigger: ";gh"
      replace: "  "
    - trigger: ";git"
      replace: "  "
    - trigger: ";dock"
      replace: "  "
    - trigger: ";app"
      replace: "  "
    - trigger: ";win"
      replace: "  "
    - trigger: ";lin"
      replace: "  "
    - trigger: ";apache"
      replace: "  "
    - trigger: ";vsc"
      replace: "  "
    - trigger: ";vim"
      replace: "  "
    - trigger: ";bolt"
      replace: "  "
    - trigger: ";rock"
      replace: "   "
    - trigger: ";md"
      replace: "  "
    - trigger: ";bash"
      replace: "  "
    - trigger: ";shell"
      replace: " 󰨊 "
    - trigger: ";txt"
      replace: "  "
    - trigger: ";pref"
      replace: "  "
    - trigger: ";wand"
      replace: "  "
    - trigger: ";ext"
      replace: "  "
    - trigger: ";fig"
      replace: "  "
    - trigger: ";tool"
      replace: " 󱁤 "
    - trigger: ";pretty"
      replace: "  "
    - trigger: "nvim"
      replace: "  "
    - trigger: ";GO"
      replace: " 󰟓 "
    - trigger: ";chrome"
      replace: "  "
```
</details>

---

##   w/ Big Brain Energy

If good programming abilites correlated to getting laid, here would lie the keys to triumph. Lucky for you, these skills are the ~~antithesis~~ path to a good time.

##### Frosted Glass Effect

<details><summary>🎁<i></i></summary>
    

```html
<vuep template="#frosted-glass"></vuep>

<script v-pre type="text/x-template" id="frosted-glass">
<style>
  main{
    width: 100%;
    margin: auto;
    padding: 59px 29px;
    border-radius: .3em;
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .3em 1em rgba(0, 0, 0, 0.12);
    font: 150%/1.6 Baskerville, Palatino, serif;
  }
  main, main > div::before {
    background: url("./static/city-night.jpg") fixed 0 / cover;
  }
  main > div::before{
    content: "";
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    filter: blur(10px);
    margin: -30px;
  }
  main > div{
    font-style: italic;
    color: #000;
    padding: 30px;
    hyphens: auto;
    background: hsla(0,0%,100%,.5);
    overflow: hidden;
    position: relative;
  }
  main > div cite{
    font-style: normal;
  }
  main footer {
    text-align: right;
  }
</style>
<template>
  <main class="main">
    <div>
      "O God, I could be bounded in a nutshell and count myself a king of infinite space, were it not that I have bad dreams."<br>
      <footer>——
        <cite>William Shakespeare</cite>
      </footer>
    </div>
  </main>
</template>
<script>
</script>
</script>

<!-- EXTENDED FEATURES BELOW -->

<iframe
  width="100%"
  height="458px"
  frameborder="0"
  src="https://caniuse.bitsofco.de/embed/index.html?feat=css3-colors&amp;periods=future_1,current,past_1,past_2,past_3&amp;accessible-colours=false">
</iframe>

<iframe
  width="100%"
  height="458px"
  frameborder="0"
  src="https://caniuse.bitsofco.de/embed/index.html?feat=css-filters&amp;periods=future_1,current,past_1,past_2,past_3&amp;accessible-colours=false">
</iframe>
```

</details>

#### MISC TEXT EFFECTS

<details><summary>🎁</summary>

```html
<style>
  main {
    width: 100%;
    font: 180%/1.5 Baskerville, Palatino, serif;
  }
  main > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  main > div > h5 {
    width: 229px;
  }
  main > div > p {
    padding: 18px 28px;
    text-align: justify;
    hyphens: auto;

  }
  main > div:nth-of-type(1) > p {
    background: hsl(40, 28.57% , 58.82%);
    color: hsl(40, 28.57% , 28.82%);
    text-shadow: 0 .03em .03em hsla(0,0%,100%,.8);
  }
  main > div:nth-of-type(2) > p {
    background: hsl(40, 28.57% , 28.82%);
    color: hsl(40, 28.57% , 58.82%);
    text-shadow: 0 .03em .03em black;
  }
  main > div:nth-of-type(3) > p {
    background: #b4a078;
    color: white;
    /* text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black; */
    text-shadow:  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%),
                  0 0 2px hsl(40, 28.57% , 28.82%);
  }
  main > div:nth-of-type(4) > p {
    background: #b4a078;
    color: white;
  }
  main > div:nth-of-type(4) > p text{
    fill: currentColor;
  }
  main > div:nth-of-type(4) > p svg{
    overflow: visible;
  }
  main > div:nth-of-type(4) > p use{
    stroke: hsl(40, 28.57% , 28.82%);
    stroke-width: 3;
    stroke-linejoin: round;
  }
  main > div:nth-of-type(5) > p,
  main > div:nth-of-type(6) > p,
  main > div:nth-of-type(7) > p {
    background: hsl(40, 28.57% , 28.82%);
  }
  main > div:nth-of-type(5) > p a,
  main > div:nth-of-type(6) > p a,
  main > div:nth-of-type(7) > p a {
    background: hsl(40, 28.57% , 28.82%);
    color: white;
    transition: .5s;
    font-weight: 500;
    text-shadow: 0 0 .1em, 0 0 .3em;
  }
  main > div:nth-of-type(5) > p a:hover{
    animation: .8s text-blink-effect infinite alternate;
  }
  main > div:nth-of-type(6) > p a:hover{
    color: transparent;
    text-shadow: 0 0 .1em white, 0 0 .3em white;
  }
  main > div:nth-of-type(7) > p a:hover{
    filter: blur(2px);
  }
  main > div:nth-of-type(8) > p {
    background: #b4a078;
    color: white;
    text-shadow:  0 1px hsl(0, 0%, 90%),
                  0 1px hsl(0, 0%, 90%),
                  0 2px 4px hsla(0, 0%, 0%,.5);
  }
  main > div:nth-of-type(9) > p {
    background: #b4a078;
    color: white;
    text-shadow:  1px 1px hsl(40, 28.57% , 28.82%), 2px 2px hsl(40, 28.57% , 28.82%),
                  3px 3px hsl(40, 28.57% , 28.82%), 4px 4px hsl(40, 28.57% , 28.82%);
  }
  main > div:nth-of-type(10) > p {
    background: linear-gradient(90deg, #b4a078, #333);
    -webkit-text-fill-color: white;
    -webkit-background-clip: text;
    -webkit-text-stroke: 5px transparent;
  }
  @keyframes text-blink-effect {
    50% {
      text-shadow: 0 0 .1em, 0 0 .3em;
    }
    to {
        text-shadow: 0 0 .1em;
    }
  }
</style>
<template>
  <main class="main">
    <div>
      <h5>1️⃣ Dark-color word with light background</h5>
      <p>You-need-to-know-css-tricks</p>
    </div>
    <div>
      <h5>2️⃣ light-color word with dark background</h5>
      <p>You-need-to-know-css-tricks</p>
    </div>
    <div>
      <h5>3️⃣ hollow word:text-shadow</h5>
      <p>You-need-to-know-css-tricks</p>
    </div>
    <div>
      <h5>4️⃣ hollow word-SVG</h5>
      <p>
        <svg width="300px" height="1em">
          <use xlink:href="#css" />
          <text id="css" y="1em">You-need-to-know-css-tricks</text>
        </svg>
      </p>
    </div>
    <div>
      <h5>5️⃣ External illuminating text:text-shadow</h5>
      <p><a>You-need-to-know-css-tricks</a></p>
    </div>
    <div>
      <h5>6️⃣ blur words:text-shadow</h5>
      <p><a>You-need-to-know-css-tricks</a></p>
    </div>
    <div>
      <h5>7️⃣ blur words:filter</h5>
      <p><a>You-need-to-know-css-tricks</a></p>
    </div>
    <div>
      <h5>8️⃣ text bump</h5>
      <p>You-need-to-know-css-tricks</p>
    </div>
    <div>
      <h5>9️⃣ text bump</h5>
      <p>You-need-to-know-css-tricks</p>
    </div>
    <div>
      <h5>⬇️ text gradient</h5>
      <p>You-need-to-know-css-tricks</p>
    </div>
  </main>
</template>
<script>
</script>
```

</details>

---

#####  Clip/Copy Codeblocks

> A pretty decent module for ==clip-enabled== code blocks

<details><summary>  </summary>

For 
```js
// Module for adding copy buttons to code blocks
const ClipbModule = (() => {
  // Function to create and return the copy button
  const createCopyButton = () => {
    const copyButton = document.createElement("button");
    const dBolt = "M4 14L14 3v7h6L10 21v-7z";
    copyButton.className = "copy-button";
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="${dBolt}"/></svg>`;
    return copyButton;
  };
  // Function to add a copy button to a single code block
  const addCopyButton = (codeBlock) => {
    // Get the parent pre element
    const preElement = codeBlock.closest("pre");
    if (!preElement) return; // Skip if not inside a pre element
    // Check if already wrapped
    if (preElement.parentElement.classList.contains("code-wrapper")) return;
    // Create a wrapper div for the code block
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper";
    // Create the copy button
    const button = createCopyButton();
    // Insert the wrapper before the pre element
    preElement.parentNode.insertBefore(wrapper, preElement);
    // Move the pre element inside the wrapper
    wrapper.appendChild(preElement);
    // Add the button to the wrapper
    wrapper.insertBefore(button, preElement);
    // Add event listener for copy functionality
    button.addEventListener("click", () => {
      // Get text content, handling highlighted code
      const textToCopy = codeBlock.textContent || codeBlock.innerText;
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          const successSVG = `
                  <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="green">
                    <path d="M10 2a3 3 0 0 0-2.83 2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1.17A3 3 0 0 0 14 2zM9 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m6.78 6.625a1 1 0 1 0-1.56-1.25l-3.303 4.128l-1.21-1.21a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.488-.082l4-5z"></path>
                  </svg>
                `;
          button.innerHTML = successSVG; // Set success SVG
          setTimeout(() => {
            const defaultSVG = `
                    <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="currentColor">
                      <path d="M4 14L14 3v7h6L10 21v-7z"></path>
                    </svg>
                  `;
            button.innerHTML = defaultSVG; // Revert to default SVG
          }, 2000);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        },
      );
    });
  };
  // Function to add copy buttons to all code blocks on the page
  const addCopyButtons = () => {
    // Target all code blocks inside pre elements, including those with hljs class
    const codeBlocks = document.querySelectorAll("pre code, pre.hljs code");
    codeBlocks.forEach(addCopyButton);
  };
  // MutationObserver callback to handle dynamically added code blocks
  const handleMutations = (mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Element node
          // Check if the node itself is a pre with code
          if (node.matches("pre") && node.querySelector("code")) {
            addCopyButton(node.querySelector("code"));
          }
          // Check for any code blocks within the added node
          else {
            const nestedCodeBlocks = node.querySelectorAll("pre code, pre.hljs code");
            nestedCodeBlocks.forEach(addCopyButton);
          }
        }
      });
    });
  };
  // Initialize the module
  const init = () => {
    // Wait for the DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", addCopyButtons);
    } else {
      addCopyButtons();
    }
    // Set up observer for dynamically added elements
    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };
  // Public API
  return {
    init,
  };
})();
// Auto-initialize if script is loaded directly
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", ClipbModule.init);
}
```

</details>


---

##  Choose File

> Simple call for file dialog using `tkinter`.

```python
import tkinter as tk
from tkinter import filedialog

# Create a root window and hide it
root = tk.Tk()
root.withdraw()

# Open the file dialog
file_path = filedialog.askopenfilename()

# Print the selected file path
print("Selected file:", file_path)
```
