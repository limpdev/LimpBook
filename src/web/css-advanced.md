# Advanced CSS Configs
> features dual background images, gradients, and opacity adjustments...

```css
[class~=simple-control] {
  opacity: 0;
}
[class~=simple-control]:hover {
  opacity: 0.5;
}

/* Both of these two snippets regulate icon opacity during hover */

.simple-ui-container {
    opacity: 0;
}
.simple-ui-container:hover {
    opacity: 0.5;
}

```
---

## Dual Combos - `background`

```css
@import url("https://fonts.googleapis.com/css?family=Times+New+Roman");
h1 { font-family: "Times New Roman"; font-size: 24pt; line-height: 1.5; top: 0px; width: 100%; }
h2 { font-family: "Times New Roman"; font-size: 20pt; line-height: 1.5; }
h3 { font-family: "Times New Roman"; font-size: 16pt; line-height: 1.5; }
body { font-family: "Times New Roman"; 
    background-image: url("https://kbdevstorage1.blob.core.windows.net/asset-blobs/19469_en_1"); 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    background-size: cover;
    line-height: 1.5; 
    font-size: 14.5pt; 
    font-weight: 400; color: 
    rgb(176, 176, 176); 
    text-rendering: optimizelegibility; }
a[href] { color: rgb(88, 128, 172); }
a[href]:hover { color: rgb(88, 128, 172); }
blockquote { font-family: "Times New Roman"; background-color: rgb(18, 18, 18); line-height: 1.5; font-size: 14.5pt; color: rgb(176, 176, 176); padding-left: 15px; border-left: 3px solid rgb(176, 176, 176); width: auto; margin: 25px auto; font-style: italic; position: relative; }
.simple-container {
	margin: 50px auto;
	background-color: rgb(18, 18, 18); 
	opacity: 0.95;
	-webkit-print-color-adjust: exact;
	max-width: 800px;
	border: 1px solid rgb(68, 68, 68);
	border-radius: 20px;
	padding: 50px;}
.youtubeContainer { position: relative; width: 100%; padding-bottom: 56.25%; padding-top: 25px; }
iframe[src*="youtube.com/embed/"] { width: 100%; height: 100%; position: absolute; }
img { max-width: 100%; }
li { line-height: 1.5; }
td { border: 5px rgb(176, 176, 176); padding: 3px 7px; }
figure { margin: 0px 0px 10px; }
figcaption { font-size: 1.45pt; font-style: italic; opacity: 0.7; border: 2px solid rgb(176, 176, 176); padding: 12px; }
.simple-date { display: inline-block; font-family: "Times New Roman"; font-size: 14.5pt; padding-right: 15px; padding-top: 3px; padding-bottom: 3px; border-right: 2px solid rgb(88, 128, 172); }
.rtl .simple-date { border-left: 2px solid rgb(88, 128, 172); border-right: none; padding-right: 0px; padding-left: 15px; }
.simple-author { display: inline-block; font-family: "Times New Roman"; font-size: 14.5pt; color: rgb(88, 128, 172); line-height: 22px; padding-left: 10px; padding-top: 3px; padding-bottom: 3px; }
.rtl .simple-author { padding-left: 0px; padding-right: 10px; }
img { max-width: 100%; }
::selection { background: rgb(88, 128, 172); }
```
---

## Custom Mixture -> Just Read CSS + LaTeX CSS
```css
@font-face {
    font-family: "CMU Roman";
    font-weight: normal;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Serif/cmunrm.woff') format("woff");
}

@font-face {
    font-family: "CMU Roman";
    font-weight: bold;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Serif/cmunbx.woff') format("woff");
}

@font-face {
    font-family: "CMU Roman";
    font-weight: normal;
    font-style: italic;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Serif/cmunti.woff') format("woff");
}

@font-face {
    font-family: "CMU Roman";
    font-weight: bold;
    font-style: italic;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Serif/cmunbi.woff') format("woff");
}

@font-face {
    font-family: "CMU Mono";
    font-weight: normal;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Typewriter/cmuntt.woff') format("woff");
}

@font-face {
    font-family: "CMU Mono";
    font-weight: bold;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Typewriter/cmuntb.woff') format("woff");
}

@font-face {
    font-family: "CMU Mono";
    font-weight: normal;
    font-style: italic;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Typewriter/cmunit.woff') format("woff");
}

@font-face {
    font-family: "CMU Mono";
    font-weight: bold;
    font-style: italic;
    src: url('https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Typewriter/cmuntx.woff') format("woff");
}

* {
    box-sizing: border-box;
}

body {
    font-family: "CMU Roman", serif;
    line-height: 1.75em;
    font-size: 20px;
    color: rgb(40, 40, 40);
    background-color: rgb(255, 252, 242);
}

input,
button,
textarea,
select {
    font: inherit;
}

textarea {
    width: 100%;
}

article>*+* {
    margin-top: 1em;
}

h1 {
    font-size: 1.875em;
    line-height: 2.125em;
}

h2 {
    font-size: 1.25em;
    line-height: 1.5625em;
}

h3 {
    font-family: "CMU Roman", serif;
    font-size: 1em;
    line-height: 1.7em;
    padding-top: 0.9375em;
    padding-bottom: 0.9375em;
    border-bottom: 1px solid rgb(216, 216, 216);
    border-top: 1px solid rgb(216, 216, 216);
}

hr {
    height: 1px;
    background-color: rgb(216, 216, 216);
    border: none;
    width: 100%;
    margin: 0px;
}

p {
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    margin-top: 1rem;
}

a:not([class]) {
    text-decoration-skip-ink: auto;
}

a,
a:visited {
    text-decoration: none;
    color: #a00;
}

code, pre, kbd {
    font-family: 'CMU Mono', monospace;
    font-weight: 600;
    display: inline-block;
    padding: 5pt;
    margin:auto;
    background: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
    width: auto;
    max-width: 100%;
    border-top: 2.27px solid black;
    border-bottom: 2.27px solid black;
    overflow-x: auto;
    counter-increment: caption;
}

table tr>th[scope='col'] {
    border-bottom: 1.36px solid black;
}

table tr>th[scope='row'] {
    border-right: 1.36px solid black;
}

table>tbody>tr:first-child>td,
table>tbody>tr:first-child>th {
    border-top: 1.36px solid black;
}

table>tbody>tr:last-child>td,
table>tbody>tr:last-child>th {
    border-bottom: 1.36px solid black;
}

th,
td {
    text-align: left;
    padding: 0.5rem;
    line-height: 1.1;
}

/* Table caption */
caption {
    text-align: left;
    font-size: 0.923em;
    /* border-bottom: 2pt solid #000; */
    padding: 0 0.25em 0.25em;
    width: 100%;
    margin-left: 0;
}

caption::before {
    content: 'Table 'counter(caption) '. ';
    font-weight: bold;
}

/* allow scroll on the x-axis */
.scroll-wrapper {
    overflow-x: auto;
}

.scroll-wrapper>table td {
    white-space: nowrap;
}

h1:first-child {
    text-align: center;
}

nav ol {
    counter-reset: item;
    padding-left: 2rem;
}

nav li {
    display: block;
}

nav li:before {
    content: counters(item, '.') ' ';
    counter-increment: item;
    padding-right: 0.85rem;
}

dl dd {
    text-align: center;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}
li {
    line-height: 1.5em;
}

pre {
    background-color: rgb(224, 224, 224);
    padding: 10px;
    overflow: auto;
}

aside, [class*="sidebar"], [id*="sidebar"] {
    max-width: 90%;
    margin: 0px auto;
    border: 1px solid lightgrey;
    padding: 5px 15px;
}

.simple-date {
    display: inline-block;
    font-size: 18px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-right: 1px solid rgb(216, 216, 216);
}

.simple-author {
    display: inline-block;
    font-size: 18px;
    color: black;
    line-height: 22px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.simple-container {
    max-width: 1000px;
    margin: 0px auto;
    padding-top: 70px;
    padding-bottom: 20px;
}

@media (max-width: 750px) {
    .simple-container {
        padding-left: 50px;
        padding-right: 50px;
    }
}

@media (max-width: 450px) {
    .simple-container {
        padding-top: 30px;
        padding-left: 20px;
        padding-right: 20px;
    }
}

.emoji, svg.icon {
    width: 1em;
}

[class*="editsection"], [class*="toctoggle"] {
    display: none;
}
```