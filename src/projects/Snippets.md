# My Snippet Collection

<details><summary>Natural Language Programming</summary>
<div align="left" style="font-size: 1em;font-family: Karla;">
	<blockquote>
		<em>
			.... Since the early days of automatic computing we have had people that have felt it as a shortcoming that programming required the care and accuracy that is characteristic for the use of any formal symbolism. They blamed the mechanical slave for its strict obedience with which it carried out its given instructions, even if a moment’s thought would have revealed that those instructions contained an obvious mistake. “But a moment is a long time, and thought is a painful process.” (A.E.Houseman). They eagerly hoped and waited for more sensible machinery that would refuse to embark on such nonsensical activities as a trivial clerical error evoked at the time. Machine code, with its absence of almost any form of redundancy, was soon identified as a needlessly risky interface between man and machine. Partly in response to this recognition so-called “high-level programming languages” were developed, and, as time went by, we learned to a certain extent how to enhance the protection against silly mistakes. It was a significant improvement that now many a silly mistake did result in an error message instead of in an erroneous answer. (And even this improvement wasn’t universally appreciated: some people found error messages they couldn’t ignore more annoying than wrong results, and, when judging the relative merits of programming languages, some still seem to equate “the ease of programming” with the ease of making undetected mistakes.) The (abstract) machine corresponding to a programming language remained, however, a faithful slave, i.e. the non-sensible automaton perfectly capable of carrying out nonsensical instructions. Programming remained the use of a formal symbolism and, as such, continued to require the care and accuracy required before. In order to make machines significantly easier to use, it has been proposed (to try) to design machines that we could instruct in our native tongues. this would, admittedly, make the machines much more complicated, but, it was argued, by letting the machine carry a larger share of the burden, life would become easier for us. It sounds sensible provided you blame the obligation to use a formal symbolism as the source of your difficulties. But is the argument valid? I doubt. We know in the meantime that the choice of an interface is not just a division of (a fixed amount of) labour, because the work involved in co-operating and communicating across the interface has to be added. We know in the meantime —from sobering experience, I may add— that a change of interface can easily increase at both sides of the fence the amount of work to be done (even drastically so). Hence the increased preference for what are now called “narrow interfaces”. Therefore, although changing to communication between machine and man conducted in the latter’s native tongue would greatly increase the machine’s burden, we have to challenge the assumption that this would simplify man’s life. A short look at the history of mathematics shows how justified this challenge is. Greek mathematics got stuck because it remained a verbal, pictorial activity, Moslem “algebra”, after a timid attempt at symbolism, died when it returned to the rhetoric style, and the modern civilized world could only emerge —for better or for worse— when Western Europe could free itself from the fetters of medieval scholasticism —a vain attempt at verbal precision!— thanks to the carefully, or at least consciously designed formal symbolisms that we owe to people like Vieta, Descartes, Leibniz, and (later) Boole. The virtue of formal texts is that their manipulations, in order to be legitimate, need to satisfy only a few simple rules; they are, when you come to think of it, an amazingly effective tool for ruling out all sorts of nonsense that, when we use our native tongues, are almost impossible to avoid. Instead of regarding the obligation to use formal symbols as a burden, we should regard the convenience of using them as a privilege: thanks to them, school children can learn to do what in earlier days only genius could achieve. (This was evidently not understood by the author that wrote —in 1977— in the preface of a technical report that “even the standard symbols used for logical connectives have been avoided for the sake of clarity”. The occurrence of that sentence suggests that the author’s misunderstanding is not confined to him alone.) When all is said and told, the “naturalness” with which we use our native tongues boils down to the ease with which we can use them for making statements the nonsense of which is not obvious. It may be illuminating to try to imagine what would have happened if, right from the start our native tongue would have been the only vehicle for the input into and the output from our information processing equipment. My considered guess is that history would, in a sense, have repeated itself, and that computer science would consist mainly of the indeed black art how to bootstrap from there to a sufficiently well-defined formal system. We would need all the intellect in the world to get the interface narrow enough to be usable, and, in view of the history of mankind, it may not be overly pessimistic to guess that to do the job well enough would require again a few thousand years. Remark. As a result of the educational trend away from intellectual discipline, the last decades have shown in the Western world a sharp decline of people’s mastery of their own language: many people that by the standards of a previous generation should know better, are no longer able to use their native tongue effectively, even for purposes for which it is pretty adequate. (You have only to look at the indeed alarming amount of on close reading meaningless verbiage in scientific articles, technical reports, government publications etc.) This phenomenon —known as “The New Illiteracy”— should discourage those believers in natural language programming that lack the technical insight needed to predict its failure. (End of remark.) From one gut feeling I derive much consolation: I suspect that machines to be programmed in our native tongues —be it Dutch, English, American, French, German, or Swahili— are as damned difficult to make as they would be to use.
		</em><br/>
		<code align=>Professor Edsger Dijkstra</code>
	</blockquote>
</div>
</details>

> `wget`

```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent <LINK>
```

> _This can also be shortened to their alternate flags like this..._

```bash
wget -mKEpnp <LINK>
```

↳ **BEST METHOD FOR FULL-SITE-SCRAPE!** Ensures all links are properly converted to match the mirrored path structure... *will be resource heavy* 🗿.

---

## Hiding Scrollbars

```css
html,
body {
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}
```

---

## ESPANSO

<details><summary></summary>

```yaml
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

<details><summary></summary>
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

<details><summary></summary>

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

<details><summary></summary>

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

---

### ImageMagick for ICO Files

```bash
magick favicon.svg -background transparent -resize 256x256 favicon.ico
```

> For base64 after conversion...

```bash
base64 -w 0 favicon.ico
```

---

## Squishy  Transformations for Buttons

> *SUPER SIMPLE* vertical contraction on hover + further contraction *bounce* when active (or, clicked).

```css
button:hover {
	transform: scale(1, 0.9);
}
button:active {
	transform: scale(1, 0.8);
}
```
