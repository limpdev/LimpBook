#  Gradients for Scroll Views

To create a fading effect for content as it scrolls out of view, you can use CSS masks or gradients combined with a container that has overflow. This technique will make your scrolling content fade out towards the top and bottom of the scroll container.

Here's how you can modify your CSS to achieve this effect:

```css
.toc-container {
  /* Keep your existing styles */
  background-color: transparent;
  color: #ecf0f1;
  overflow-y: auto;
  text-decoration: none;
  height: 90vh;
  align-self: center;
  min-width: 215px;
  background: #161616;

  /* Add these properties for the fade effect */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );

  /* Add some padding to make room for the fade effect */
  padding-top: 20px;
  padding-bottom: 20px;
}
```

This technique uses CSS masking to create a gradient transparency effect. The content will be fully visible in the middle section (where the mask is black), and it will gradually fade out at the top and bottom (where the mask transitions to transparent).

You can adjust the percentage values (0%, 10%, 90%, 100%) to control how quickly and over what distance the fade occurs. A smaller difference between the percentages creates a shorter fade distance.

If you need to support older browsers or want an alternative approach, you can also use pseudo-elements with gradients to achieve a similar effect:

```css
.toc-container {
  /* Your existing styles */
  position: relative;
}

.toc-container::before,
.toc-container::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 30px;
  pointer-events: none; /* Allows clicks to pass through */
  z-index: 1;
}

.toc-container::before {
  top: 0;
  background: linear-gradient(to bottom, #161616 0%, transparent 100%);
}

.toc-container::after {
  bottom: 0;
  background: linear-gradient(to top, #161616 0%, transparent 100%);
}
```

This second approach creates two overlay elements that have gradients which fade from the background color to transparent, creating the illusion that the content is fading out.
