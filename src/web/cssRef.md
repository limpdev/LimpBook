# CSS Layout - The display Property

---

The `display` property is the most important CSS property for controlling layout.

---

## The display Property

The `display` property is used to specify how an element is shown on a web page.

Every HTML element has a default display value, depending on what type of element it is. The default display value for most elements is `block` or `inline`.

The `display` property is used to change the default display behavior of HTML elements.

---

## Block-level Elements

A block-level element ALWAYS starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

The &lt;div&gt; element is a block-level element.

Examples of block-level elements:

- &lt;div&gt;
- &lt;h1&gt; - &lt;h6&gt;
- &lt;p&gt;
- &lt;form&gt;
- &lt;header&gt;
- &lt;footer&gt;
- &lt;section&gt;

---

## Inline Elements

An inline element DOES NOT start on a new line and only takes up as much width as necessary.

This is an inline &lt;span&gt; element inside a paragraph.

Examples of inline elements:

- &lt;span&gt;
- &lt;a&gt;
- &lt;img&gt;

---

---

## The display Property Values

The `display` property has many values:

| Value              | Description                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inline             | Displays an element as an inline element                                                                                                                |
| block              | Displays an element as a block element                                                                                                                  |
| contents           | Makes the container disappear, making the child elements children of the element the next level up in the DOM                                           |
| flex               | Displays an element as a block-level flex container                                                                                                     |
| grid               | Displays an element as a block-level grid container                                                                                                     |
| inline-block       | Displays an element as an inline-level block container. The element itself is formatted as an inline element, but you can apply height and width values |
| inline-flex        | Displays an element as an inline-level flex container                                                                                                   |
| inline-grid        | Displays an element as an inline-level grid container                                                                                                   |
| inline-table       | The element is displayed as an inline-level table                                                                                                       |
| list-item          | Let the element behave like a &lt;li&gt; element                                                                                                        |
| run-in             | Displays an element as either block or inline, depending on context                                                                                     |
| table              | Let the element behave like a &lt;table&gt; element                                                                                                     |
| table-caption      | Let the element behave like a &lt;caption&gt; element                                                                                                   |
| table-column-group | Let the element behave like a &lt;colgroup&gt; element                                                                                                  |
| table-header-group | Let the element behave like a &lt;thead&gt; element                                                                                                     |
| table-footer-group | Let the element behave like a &lt;tfoot&gt; element                                                                                                     |
| table-row-group    | Let the element behave like a &lt;tbody&gt; element                                                                                                     |
| table-cell         | Let the element behave like a &lt;td&gt; element                                                                                                        |
| table-column       | Let the element behave like a &lt;col&gt; element                                                                                                       |
| table-row          | Let the element behave like a &lt;tr&gt; element                                                                                                        |
| none               | The element is completely removed                                                                                                                       |
| initial            | Sets this property to its default value                                                                                                                 |
| inherit            | Inherits this property from its parent element                                                                                                          |

---

## Display: none;

`display: none;` is commonly used with JavaScript to hide and show elements without deleting and recreating them. Take a look at our last example on this page if you want to know how this can be achieved.

The `<script>` element uses `display: none;` as default.

Click to show panel

This panel contains a &lt;div&gt; element, which is hidden by default (`display: none;`).

It is styled with CSS, and we use JavaScript to show it (change it to (`display: block;`).

---

## Override The Default Display Value

As mentioned, every element has a default display value. However, you can override this.

Changing an inline element to a block element, or vice versa, can be useful for making the page look a specific way, and still follow the web standards.

A common example is making inline `<li>` elements for horizontal menus:

### Example

```html
li {   display: inline; }
```

**Note:** Setting the display property of an element only changes **how the element is displayed**, NOT what kind of element it is. So, an inline element with `display: block;` is not allowed to have other block elements inside it.

The following example displays &lt;span&gt; elements as block elements:

### Example

```html
span {   display: block; }
```

The following example displays &lt;a&gt; elements as block elements:

### Example

a {
  display: block;
}

[Try it Yourself »](tryit.asp?filename=trycss_display_block_a)

---

## Hide an Element - display:none or visibility:hidden?

`display:none`

![Italy](img_5terre.jpg)

Remove

`visibility:hidden`

![Forest](img_forest.jpg)

Hide

Reset

![Lights](img_lights.jpg)

Reset All

Hiding an element can be done by setting the `display` property to `none`. The element will be hidden, and the page will be displayed as if the element is not there:

### Example

h1.hidden {
  display: none;
}

[Try it Yourself »](tryit.asp?filename=trycss_display_none)

`visibility:hidden;` also hides an element.

However, the element will still take up the same space as before. The element will be hidden, but still affect the layout:

### Example

h1.hidden {
  visibility: hidden;
}

[Try it Yourself »](tryit.asp?filename=trycss_visibility_hidden)

---

## More Examples

[Differences between display: none; and visibility: hidden;](tryit.asp?filename=trycss_display)
This example demonstrates display: none; versus visibility: hidden;

[Showing more display types](tryit.asp?filename=trycss_display2)
This example demonstrates some more display types.

[Using CSS together with JavaScript to show content](tryit.asp?filename=trycss_display_js)
This example demonstrates how to use CSS and JavaScript to show an element on click.

---

## POSITION

## CSS Display/Visibility Properties

| Property                                      | Description                                           |
| --------------------------------------------- | ----------------------------------------------------- |
| [display](/cssref/pr_class_display.php)       | Specifies how an element should be displayed          |
| [visibility](/cssref/pr_class_visibility.php) | Specifies whether or not an element should be visible |

---

The `position` property specifies the type of positioning method used for an element (static, relative, fixed, absolute or sticky).

* * *

## The position Property

The `position` property specifies the type of positioning method used for an element.

There are five different position values:

- `static`
- `relative`
- `fixed`
- `absolute`
- `sticky`

Elements are then positioned using the top, bottom, left, and right properties. However, these properties will not work unless the `position` property is set first. They also work differently depending on the position value.

* * *

## position: static;

HTML elements are positioned static by default.

Static positioned elements are not affected by the top, bottom, left, and right properties.

An element with `position: static;` is not positioned in any special way; it is always positioned according to the normal flow of the page:

This &lt;div&gt; element has position: static;

Here is the CSS that is used:

### Example

div.static {
  position: static;
  border: 3px solid #73AD21;
}

[Try it Yourself »](tryit.asp?filename=trycss_position_static)

* * *

## position: relative;

An element with `position: relative;` is positioned relative to its normal position.

Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element.

This &lt;div&gt; element has position: relative;

Here is the CSS that is used:

### Example

div.relative {
  position: relative;
  left: 30px;
  border: 3px solid #73AD21;
}

* * *

* * *

## position: fixed;

An element with `position: fixed;` is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to position the element.

A fixed element does not leave a gap in the page where it would normally have been located.

Notice the fixed element in the lower-right corner of the page. Here is the CSS that is used:

### Example

div.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  border: 3px solid #73AD21;
}

[Try it Yourself »](tryit.asp?filename=trycss_position_fixed)

This &lt;div&gt; element has `position: fixed;`

* * *

## position: absolute;

An element with `position: absolute;` is positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like fixed).

However; if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.

**Note:** Absolute positioned elements are removed from the normal flow, and can overlap elements.

Here is a simple example:

This &lt;div&gt; element has position: relative;

This &lt;div&gt; element has position: absolute;

Here is the CSS that is used:

### Example

div.relative {
  position: relative;
  width: 400px;
  height: 200px;
  border: 3px solid #73AD21;
}

div.absolute {
  position: absolute;
  top: 80px;
  right: 0;
  width: 200px;
  height: 100px;
  border: 3px solid #73AD21;
}

[Try it Yourself »](tryit.asp?filename=trycss_position_absolute)

* * *

## position: sticky;

An element with `position: sticky;` is positioned based on the user's scroll position.

A sticky element toggles between `relative` and `fixed`, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).

**Note:** You must specify at least one of `top`, `right`, `bottom` or `left` for sticky positioning to work.

In this example, the sticky element sticks to the top of the page (`top: 0`), when you reach its scroll position.

### Example

div.sticky {
  position: sticky;
  top: 0;
  background-color: green;
  border: 2px solid #4CAF50;
}

[Try it Yourself »](tryit.asp?filename=trycss_position_sticky)

* * *

## Positioning Text In an Image

How to position text over an image:

### Example

![Cinque Terre](img_5terre_wide.jpg)

Bottom Left

Top Left

Top Right

Bottom Right

Centered

Try it Yourself:

[Top Left »](tryit.asp?filename=trycss_image_text_top_left) [Top Right »](tryit.asp?filename=trycss_image_text_top_right) [Bottom Left »](tryit.asp?filename=trycss_image_text_bottom_left) [Bottom Right »](tryit.asp?filename=trycss_image_text_bottom_right) [Centered »](tryit.asp?filename=trycss_image_text_center)

* * *

## More Examples

[Set the shape of an element](tryit.asp?filename=trycss_clip)
This example demonstrates how to set the shape of an element. The element is clipped into this shape, and displayed.

* * *

* * *

## All CSS Positioning Properties

| Property                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| [bottom](/cssref/pr_pos_bottom.php)       | Sets the bottom margin edge for a positioned box |
| [clip](/cssref/pr_pos_clip.php)           | Clips an absolutely positioned element           |
| [left](/cssref/pr_pos_left.php)           | Sets the left margin edge for a positioned box   |
| [position](/cssref/pr_class_position.php) | Specifies the type of positioning for an element |
| [right](/cssref/pr_pos_right.php)         | Sets the right margin edge for a positioned box  |
| [top](/cssref/pr_pos_top.php)             | Sets the top margin edge for a positioned box    |
# CSS Fonts

## Font Pairing Rules

Here are some basic rules to create great font pairings:

### 1\. Complement

It is always safe to find font pairings that complement one another.

A great font combination should harmonize, without being too similar or too different.

### 2\. Use Font Superfamilies

A font superfamily is a set of fonts designed to work well together. So, using different fonts within the same superfamily is safe.

_For example_, the Lucida superfamily contains the following fonts: Lucida Sans, Lucida Serif, Lucida Typewriter Sans, Lucida Typewriter Serif and Lucida Math.

### 3\. Contrast is King

Two fonts that are too similar will often conflict. However, contrasts, done the right way, brings out the best in each font.

_Example_: Combining serif with sans serif is a well known combination.

A strong superfamily includes both serif and sans serif variations of the same font (e.g. Lucida and Lucida Sans).

### 4\. Choose Only One Boss

One font should be the boss. This establishes a hierarchy for the fonts on your page. This can be achieved by varying the size, weight and color.

## Font Selection is Important

Choosing the right font has a huge impact on how the readers experience a website.

The right font can create a strong identity for your brand.

Using a font that is easy to read is important. The font adds value to your text. It is also important to choose the correct color and text size for the font.

---

## Generic Font Families

In CSS there are five generic font families:

1. **Serif** fonts have a small stroke at the edges of each letter. They create a sense of formality and elegance.
2. **Sans-serif** fonts have clean lines (no small strokes attached). They create a modern and minimalistic look.
3. **Monospace** fonts - here all the letters have the same fixed width. They create a mechanical look.
4. **Cursive** fonts imitate human handwriting.
5. **Fantasy** fonts are decorative/playful fonts.

All the different font names belong to one of the generic font families. 

---

## Difference Between Serif and Sans-serif Fonts

**Note:** On computer screens, sans-serif fonts are considered easier to read than serif fonts.

---

## Some Font Examples

|      Serif      |   Sans    |    Mono     |
| :-------------: | :-------: | :---------: |
| Times New Roman |   Arial   | Courier New |
|     Georgia     |  Verdana  |   Lucida    |
|    Garamond     | Helvetica |   Monaco    |

---

## The CSS font-family Property

In CSS, we use the `font-family` property to specify the font of a text.

**Note**: If the font name is more than one word, it must be in quotation marks, like: "Times New Roman".

**Tip:** The `font-family` property should hold several font names as a "fallback" system, to ensure maximum compatibility between browsers/operating systems. Start with the font you want, and end with a generic family (to let the browser pick a similar font in the generic family, if no other fonts are available). The font names should be separated with a comma. Read more about fallback fonts in the [next chapter](css_font_websafe.asp).

### Example

Specify some different fonts for three paragraphs:

```css
.p1 {
  font-family: "Times New Roman", Times, serif;
}

.p2 {
  font-family: Arial, Helvetica, sans-serif;
}

.p3 {
  font-family: "Lucida Console", "Courier New", monospace;
}
```
# CSS Layout - The position Property

[❮ Previous](css_max-width.asp) [Next ❯](css_z-index.asp)

* * *

The `position` property specifies the type of positioning method used for an element (static, relative, fixed, absolute or sticky).

* * *

## The position Property

The `position` property specifies the type of positioning method used for an element.

There are five different position values:

- `static`
- `relative`
- `fixed`
- `absolute`
- `sticky`

Elements are then positioned using the top, bottom, left, and right properties. However, these properties will not work unless the `position` property is set first. They also work differently depending on the position value.

* * *

## position: static;

HTML elements are positioned static by default.

Static positioned elements are not affected by the top, bottom, left, and right properties.

An element with `position: static;` is not positioned in any special way; it is always positioned according to the normal flow of the page:

This &lt;div&gt; element has position: static;

Here is the CSS that is used:

### Example

div.static {  
  position: static;  
  border: 3px solid #73AD21;  
}

[Try it Yourself »](tryit.asp?filename=trycss_position_static)

* * *

## position: relative;

An element with `position: relative;` is positioned relative to its normal position.

Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element.

This &lt;div&gt; element has position: relative;

Here is the CSS that is used:

### Example

div.relative {  
  position: relative;  
  left: 30px;  
  border: 3px solid #73AD21;  
}

[Try it Yourself »](tryit.asp?filename=trycss_position_relative)

* * *

* * *

## position: fixed;

An element with `position: fixed;` is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to position the element.

A fixed element does not leave a gap in the page where it would normally have been located.

Notice the fixed element in the lower-right corner of the page. Here is the CSS that is used:

### Example

div.fixed {  
  position: fixed;  
  bottom: 0;  
  right: 0;  
  width: 300px;  
  border: 3px solid #73AD21;  
}

[Try it Yourself »](tryit.asp?filename=trycss_position_fixed)

This &lt;div&gt; element has `position: fixed;`

* * *

## position: absolute;

An element with `position: absolute;` is positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like fixed).

However; if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.

**Note:** Absolute positioned elements are removed from the normal flow, and can overlap elements.

Here is a simple example:

This &lt;div&gt; element has position: relative;

This &lt;div&gt; element has position: absolute;

Here is the CSS that is used:

### Example

div.relative {  
  position: relative;  
  width: 400px;  
  height: 200px;  
  border: 3px solid #73AD21;  
}

div.absolute {  
  position: absolute;  
  top: 80px;  
  right: 0;  
  width: 200px;  
  height: 100px;  
  border: 3px solid #73AD21;  
}

[Try it Yourself »](tryit.asp?filename=trycss_position_absolute)

* * *

## position: sticky;

An element with `position: sticky;` is positioned based on the user's scroll position.

A sticky element toggles between `relative` and `fixed`, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).

**Note:** You must specify at least one of `top`, `right`, `bottom` or `left` for sticky positioning to work.

In this example, the sticky element sticks to the top of the page (`top: 0`), when you reach its scroll position.

### Example

div.sticky {  
  position: sticky;  
  top: 0;  
  background-color: green;  
  border: 2px solid #4CAF50;  
}

[Try it Yourself »](tryit.asp?filename=trycss_position_sticky)

* * *

## Positioning Text In an Image

How to position text over an image:

### Example

![Cinque Terre](img_5terre_wide.jpg)

Bottom Left

Top Left

Top Right

Bottom Right

Centered

Try it Yourself:

[Top Left »](tryit.asp?filename=trycss_image_text_top_left) [Top Right »](tryit.asp?filename=trycss_image_text_top_right) [Bottom Left »](tryit.asp?filename=trycss_image_text_bottom_left) [Bottom Right »](tryit.asp?filename=trycss_image_text_bottom_right) [Centered »](tryit.asp?filename=trycss_image_text_center)

* * *

## More Examples

[Set the shape of an element](tryit.asp?filename=trycss_clip)  
This example demonstrates how to set the shape of an element. The element is clipped into this shape, and displayed.

* * *

* * *

## All CSS Positioning Properties

| Property                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| [bottom](/cssref/pr_pos_bottom.php)       | Sets the bottom margin edge for a positioned box |
| [clip](/cssref/pr_pos_clip.php)           | Clips an absolutely positioned element           |
| [left](/cssref/pr_pos_left.php)           | Sets the left margin edge for a positioned box   |
| [position](/cssref/pr_class_position.php) | Specifies the type of positioning for an element |
| [right](/cssref/pr_pos_right.php)         | Sets the right margin edge for a positioned box  |
| [top](/cssref/pr_pos_top.php)             | Sets the top margin edge for a positioned box    |

[❮ Previous](css_max-width.asp) [Next ❯](css_z-index.asp)

[★ +1](https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com "Your W3Schools Profile")

 

Track your progress - it's free!

 

[Log in](https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fpathfinder.w3schools.com "Login to your account") [Sign Up](https://profile.w3schools.com/sign-up?redirect_url=https%3A%2F%2Fpathfinder.w3schools.com "Sign Up to Improve Your Learning Experience")# CSS Text Alignment

## Text Alignment and Text Direction

In this chapter you will learn about the following properties:

- `text-align`
- `text-align-last`
- `direction`
- `unicode-bidi`
- `vertical-align`

## Text Alignment

The `text-align` property is used to set the horizontal alignment of a text.

A text can be left or right aligned, centered, or justified.

The following example shows center aligned, and left and right aligned text (left alignment is default if text direction is left-to-right, and right alignment is default if text direction is right-to-left):

### Example

```css
h1 {
  text-align: center;
}

h2 {
  text-align: left;
}

h3 {
  text-align: right;
}
```

When the `text-align` property is set to "justify", each line is stretched so that every line has equal width, and the left and right margins are straight (like in magazines and newspapers):

### Example

```css
div {
	  text-align: justify;
}
```

## Text Align Last

The `text-align-last` property specifies how to align the last line of a text.

### Example

Align the last line of text in three &lt;p&gt; elements:

```css
p.a {
  text-align-last: right;
}

p.b {
  text-align-last: center;
}

p.c {
  text-align-last: justify;
}
```

## Text Direction

The `direction` and `unicode-bidi` properties can be used to change the text direction of an element:

### Example

```css
p {
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

## Vertical Alignment

The `vertical-align` property sets the vertical alignment of an element.

### Example

Set the vertical alignment of an image in a text: 

```css
img.a {
  vertical-align: baseline;
}

img.b {
  vertical-align: text-top;
}

img.c {
  vertical-align: text-bottom;
}

img.d {
  vertical-align: sub;
}

img.e {
  vertical-align: super;
}
```

---

## The CSS Text Alignment/Direction Properties

| Property                                               | Description                                                                                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [direction](/cssref/pr_text_direction.php)             | Specifies the text direction/writing direction                                                                                                                                       |
| [text-align](/cssref/pr_text_text-align.php)           | Specifies the horizontal alignment of text                                                                                                                                           |
| [text-align-last](/cssref/css3_pr_text-align-last.php) | Specifies how to align the last line of a text                                                                                                                                       |
| [unicode-bidi](/cssref/pr_text_unicode-bidi.php)       | Used together with the [direction](/cssref/pr_text_direction.php) property to set or return whether the text should be overridden to support multiple languages in the same document |
| [vertical-align](/cssref/pr_pos_vertical-align.php)    | Sets the vertical alignment of an element                                                                                                                                            |

# CSS Text Spacing

## Text Spacing

In this chapter you will learn about the following properties:

- `text-indent`
- `letter-spacing`
- `line-height`
- `word-spacing`
- `white-space`

---

## Text Indentation

The `text-indent` property is used to specify the indentation of the first line of a text:

```css
p {
  text-indent: 50px;
}
```

## Letter Spacing

The `letter-spacing` property is used to specify the space between the characters in a text.

The following example demonstrates how to increase or decrease the space between characters:

```css
h1 {
  letter-spacing: 5px;
}

h2 {
  letter-spacing: -2px;
}
```

## Line Height

The `line-height` property is used to specify the space between lines:

### Example

```css
p.small {
  line-height: 0.8;
}

p.big {
  line-height: 1.8;
}
```

## Word Spacing

The `word-spacing` property is used to specify the space between the words in a text.

The following example demonstrates how to increase or decrease the space between words:

### Example

```css
p.one {
	  word-spacing: 10px;
}

p.two {
	  word-spacing: -2px;
}
```

## White Space

The `white-space` property specifies how white-space inside an element is handled.

This example demonstrates how to disable text wrapping inside an element:

### Example

```css
p {
  white-space: nowrap;
}
```

## The CSS Text Spacing Properties

| Property                                             | Description                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------- |
| [letter-spacing](/cssref/pr_text_letter-spacing.php) | Specifies the space between characters in a text            |
| [line-height](/cssref/pr_dim_line-height.php)        | Specifies the line height                                   |
| [text-indent](/cssref/pr_text_text-indent.php)       | Specifies the indentation of the first line in a text-block |
| [white-space](/cssref/pr_text_white-space.php)       | Specifies how to handle white-space inside an element       |
| [word-spacing](/cssref/pr_text_word-spacing.php)     | Specifies the space between words in a text                 |
