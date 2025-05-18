---
title: Ripple Clicks! | Web Animation w/ SVG
draft: false
---

## Ripple Clicks!

- The following template will create a ripple effect on click using SVG animations. The animation is a circle that expands from the click point and fades out. The animation duration is 1.2 seconds.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Click Ripple Animation</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      overflow: hidden;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    }

    .container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    h1 {
      pointer-events: none;
      z-index: 10;
      text-align: center;
    }
    /* * Ripple effect HERE!!! */
    .ripple {
      position: absolute;
      pointer-events: none;
    }

    /* SVG color customization */
    .ripple svg {
      color: rgba(0, 123, 255, 0.8); /* Change color here */
    }
  </style>
</head>
<body>
  <h1>Click anywhere on the page</h1>
  <div class="container"></div>

  <script>
    const container = document.querySelector('.container');

    container.addEventListener('click', function(e) {
      // Create SVG element using your provided animation
      const ripple = document.createElement('div');
      ripple.className = 'ripple';

      // Position the ripple at the click coordinates
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;

      // Set the SVG content
      ripple.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate attributeName="r" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" repeatCount="indefinite" values="0;11"/>
            <animate attributeName="opacity" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" repeatCount="indefinite" values="1;0"/>
          </circle>
        </svg>
      `;

      // Add the ripple to the container
      container.appendChild(ripple);

      // Remove the ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 1200); // Match with animation duration
    });
  </script>
</body>
</html>
```
