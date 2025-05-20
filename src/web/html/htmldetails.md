#  DETAILS

<details><summary><i> EXAMPLE</i></summary>

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Custom Details with Smooth Animation</title>
		<style>
			html {
				background: #161616;
				color: #c1c1c1;
			}

			body {
				font-family:
					"SF Pro Text",
					"Symbols Nerd Font",
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					sans-serif;
				max-width: 700px;
				margin: 0 auto;
				padding: 20px;
				line-height: 1.6;
			}

			details {
				border: 0px solid #404040;
				border-radius: 7px;
				margin-bottom: 16px;
			}

			/* Remove default triangle marker */
			details summary {
				padding: 12px 16px;
				cursor: var(--crosshair);
				border: 0px solid #404040;
				border-radius: 7px;
				user-select: none;
				list-style: none;
				position: relative;
				font-weight: 500;
				background-color: #404040;
			}

			/* Remove default triangle in Safari */
			details summary::-webkit-details-marker {
				display: none;
			}

			/* Create custom icon */
			details summary::before {
				content: "";
				position: absolute;
				right: 16px;
				top: 50%;
				transform: translateY(-50%);
				width: 20px;
				height: 20px;
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
				background-size: contain;
				transition: transform 0.3s ease;
			}

			details[open] summary::before {
				transform: translateY(-50%) rotate(180deg);
			}

			.details-content {
				padding: 0 16px;
				overflow: hidden;
				will-change: height;
				transition: height 0.4s ease;
			}

			/* Different icon styles - uncomment to try them */
			.plus-minus summary::before {
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='5' x2='12' y2='19'%3E%3C/line%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E");
			}

			.plus-minus[open] summary::before {
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E");
				transform: translateY(-50%);
			}

			/* Animation speed options */
			.speed-fast .details-content {
				transition-duration: 0.2s;
			}

			.speed-slow .details-content {
				transition-duration: 0.8s;
			}

			.controls {
				margin-bottom: 20px;
				padding: 16px;
				background-color: #252525;
				border-radius: 7px;
			}

			.btn-group {
				margin-bottom: 10px;
			}

			button {
				padding: 6px 12px;
				margin-right: 8px;
				background-color: #e0e0e0;
				border: 1px solid #ccc;
				border-radius: 4px;
				cursor: var(--crosshair);
			}

			button.active {
				background-color: #007bff;
				color: white;
				border-color: #0069d9;
			}

			button:hover {
				background-color: #d0d0d0;
			}

			button.active:hover {
				background-color: #0069d9;
			}
		</style>
	</head>
	<body>
		<h1 align="center">Custom Details Tags</h1>

		<div class="controls">
			<h3>Customize</h3>
			<div class="btn-group">
				<p>Icon Style:</p>
				<button id="arrow-style" class="active">Arrow</button>
				<button id="plus-style">Plus/Minus</button>
			</div>

			<div class="btn-group">
				<p>Animation Speed:</p>
				<button id="speed-fast">Fast (0.2s)</button>
				<button id="speed-normal" class="active">Normal (0.4s)</button>
				<button id="speed-slow">Slow (0.8s)</button>
			</div>
		</div>

		<details class="custom-details">
			<summary>What is Markdown?</summary>
			<div class="details-content">
				<p>Markdown is a lightweight markup language with plain text formatting syntax. It's designed to be easy to write and easy to read.</p>
				<p>It was created by John Gruber in 2004 and is now one of the world's most popular markup languages.</p>
			</div>
		</details>

		<details class="custom-details">
			<summary>Converting Markdown to HTML</summary>
			<div class="details-content">
				<p>There are many libraries that convert Markdown to HTML, such as:</p>
				<ul>
					<li>marked (JavaScript)</li>
					<li>showdown.js (JavaScript)</li>
					<li>markdown-it (JavaScript)</li>
					<li>Python Markdown</li>
					<li>CommonMark</li>
				</ul>
				<p>These libraries parse Markdown syntax and transform it into equivalent HTML elements.</p>
			</div>
		</details>

		<details class="custom-details">
			<summary>HTML Details Element</summary>
			<div class="details-content">
				<p>The HTML <code>&lt;details&gt;</code> element creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state.</p>
				<p>A summary or label must be provided using the <code>&lt;summary&gt;</code> element.</p>
				<p>By default, the widget is closed and only the summary is visible.</p>
			</div>
		</details>

		<script>
			document.addEventListener("DOMContentLoaded", () => {
				// Set up animation for details elements
				const detailsElements = document.querySelectorAll(".custom-details");

				detailsElements.forEach((details) => {
					const content = details.querySelector(".details-content");
					const summary = details.querySelector("summary");

					// Set initial state
					if (!details.open) {
						content.style.height = "0px";
					} else {
						content.style.height = content.scrollHeight + "px";
					}

					// Add click handler for custom animation
					summary.addEventListener("click", (e) => {
						e.preventDefault();

						if (details.open) {
							// Closing animation
							content.style.height = content.scrollHeight + "px";

							// Force reflow
							content.offsetHeight;

							content.style.height = "0px";

							// After animation completes, set open to false
							setTimeout(
								() => {
									details.open = false;
								},
								parseFloat(getComputedStyle(content).transitionDuration) * 1000,
							);
						} else {
							// Opening animation
							details.open = true;

							// Get the scroll height and apply it
							setTimeout(() => {
								content.style.height = content.scrollHeight + "px";

								// After animation completes, set height to auto
								setTimeout(
									() => {
										content.style.height = "auto";
									},
									parseFloat(getComputedStyle(content).transitionDuration) * 1000,
								);
							}, 10);
						}
					});
				});

				// Style toggle buttons
				const arrowStyle = document.getElementById("arrow-style");
				const plusStyle = document.getElementById("plus-style");

				arrowStyle.addEventListener("click", () => {
					detailsElements.forEach((el) => el.classList.remove("plus-minus"));
					arrowStyle.classList.add("active");
					plusStyle.classList.remove("active");
				});

				plusStyle.addEventListener("click", () => {
					detailsElements.forEach((el) => el.classList.add("plus-minus"));
					plusStyle.classList.add("active");
					arrowStyle.classList.remove("active");
				});

				// Speed toggle buttons
				const speedFast = document.getElementById("speed-fast");
				const speedNormal = document.getElementById("speed-normal");
				const speedSlow = document.getElementById("speed-slow");

				speedFast.addEventListener("click", () => {
					document.body.classList.remove("speed-normal", "speed-slow");
					document.body.classList.add("speed-fast");
					speedFast.classList.add("active");
					speedNormal.classList.remove("active");
					speedSlow.classList.remove("active");
				});

				speedNormal.addEventListener("click", () => {
					document.body.classList.remove("speed-fast", "speed-slow");
					speedNormal.classList.add("active");
					speedFast.classList.remove("active");
					speedSlow.classList.remove("active");
				});

				speedSlow.addEventListener("click", () => {
					document.body.classList.remove("speed-fast", "speed-normal");
					document.body.classList.add("speed-slow");
					speedSlow.classList.add("active");
					speedFast.classList.remove("active");
					speedNormal.classList.remove("active");
				});
			});
		</script>
	</body>
</html>
```

</details>

## Configuration for LimpBook

> Will require some slight changes to make it applicable as the above example has it's details' contents wrapped in a custom `div` that won't necessarily be present in other HTML documents

```css
details {
	border-radius: 13px;
	margin-bottom: 16px;
}

/* Remove default triangle marker */
details summary {
	font-size: 0.9em;
	font-family: "SF Compact Rounded", "Symbols Nerd Font";
	padding: 1em 2em;
	cursor: var(--crosshair);
	border-radius: 13px;
	user-select: none;
	list-style: none;
	position: relative;
	font-weight: 500;
	background: #000004;
	transition:
		background 400ms ease,
		color 400ms ease,
		transform 200ms ease;
}

details summary:hover {
	background: #040404ff;
	transform: scale(1, 0.9);
}

details summary:active {
	transform: scale(1, 0.8);
}

/* Remove default triangle in Safari */
details summary::-webkit-details-marker {
	display: none;
}

/* Create custom icon */
details summary::before {
	content: "";
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
	background-size: contain;
	transition: transform 0.25s ease;
}

details[open] summary::before {
	transform: translateY(-50%) rotate(180deg);
}

.details-content {
	padding: 0 16px;
	overflow: hidden;
	will-change: height;
	transition: height 0.4s ease;
}

/* Different icon styles - uncomment to try them */
.plus-minus summary::before {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='5' x2='12' y2='19'%3E%3C/line%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E");
}

.plus-minus[open] summary::before {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E");
	transform: translateY(-50%);
}

```

```javascript
document.addEventListener("DOMContentLoaded", () => {
	// Find all details elements
	const detailsElements = document.querySelectorAll("details");

	detailsElements.forEach((details) => {
		const summary = details.querySelector("summary");

		// Get all content after the summary
		const contentNodes = [];
		let currentNode = summary.nextSibling;

		while (currentNode) {
			contentNodes.push(currentNode);
			currentNode = currentNode.nextSibling;
		}

		// Create a wrapper div for the content
		const contentWrapper = document.createElement("div");
		contentWrapper.className = "details-content";
		contentWrapper.style.overflow = "hidden";

		// Move all content nodes into the wrapper
		contentNodes.forEach((node) => {
			// Clone the node and remove the original
			const clonedNode = node.cloneNode(true);
			contentWrapper.appendChild(clonedNode);
			details.removeChild(node);
		});

		// Add the wrapper to the details element
		details.appendChild(contentWrapper);

		// Set initial state
		if (!details.open) {
			contentWrapper.style.height = "0px";
		} else {
			contentWrapper.style.height = contentWrapper.scrollHeight + "px";
		}

		// Add click handler for animation
		summary.addEventListener("click", (e) => {
			e.preventDefault();

			if (details.open) {
				// Closing animation
				contentWrapper.style.height = contentWrapper.scrollHeight + "px";
				// Force reflow
				contentWrapper.offsetHeight;
				contentWrapper.style.height = "0px";

				// After animation completes, set open to false
				setTimeout(
					() => {
						details.open = false;
					},
					parseFloat(getComputedStyle(contentWrapper).transitionDuration) * 1000,
				);
			} else {
				// Opening animation
				details.open = true;

				// Get the scroll height and apply it
				setTimeout(() => {
					contentWrapper.style.height = contentWrapper.scrollHeight + "px";

					// After animation completes, set height to auto for flexible content
					setTimeout(
						() => {
							contentWrapper.style.height = "auto";
						},
						parseFloat(getComputedStyle(contentWrapper).transitionDuration) * 1000,
					);
				}, 10);
			}
		});
	});

	// Optional: Style toggle buttons (kept from your original code)
	const arrowStyle = document.getElementById("arrow-style");
	const plusStyle = document.getElementById("plus-style");

	if (arrowStyle && plusStyle) {
		arrowStyle.addEventListener("click", () => {
			detailsElements.forEach((el) => el.classList.remove("plus-minus"));
			arrowStyle.classList.add("active");
			plusStyle.classList.remove("active");
		});

		plusStyle.addEventListener("click", () => {
			detailsElements.forEach((el) => el.classList.add("plus-minus"));
			plusStyle.classList.add("active");
			arrowStyle.classList.remove("active");
		});
	}
});
```

## Replacing the default triangle icon

You can replace the default triangle using CSS by styling the `::marker` pseudo-element or hiding it and creating your own custom indicator:

```css
details summary::marker {
  content: ""; /* Replace with any character or emoji */
}

details summary::marker:hover {
  content: ""; /* Replace with any character or emoji */
}

/* OR hide the marker and use your own element */
details summary {
  list-style: none;
}

details summary::before {
  content: "➕";
  margin-right: 0.5em;
}

details[open] summary::before {
  content: "➖";
}
```

## Adding smooth transitions

For the smooth transitions, you'll need a combination of CSS and JavaScript. The key challenge is that the `<details>` element doesn't have a natural transition mechanism, but we can create one:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const details = document.querySelectorAll('details');

  details.forEach(detail => {
    // Store the content element
    const content = detail.querySelector('details > *:not(summary)');
    const summary = detail.querySelector('summary');

    // Set initial state
    if (!detail.open) {
      content.style.height = '0px';
    } else {
      content.style.height = content.scrollHeight + 'px';
    }

    // Add transition CSS
    content.style.overflow = 'hidden';
    content.style.transition = 'height 0.3s ease';

    // Add click handler
    summary.addEventListener('click', (e) => {
      e.preventDefault();

      // Toggle the open state
      if (detail.open) {
        content.style.height = content.scrollHeight + 'px';
        setTimeout(() => {
          content.style.height = '0px';

          // Once transition completes, toggle the open attribute
          setTimeout(() => {
            detail.open = false;
          }, 300);
        }, 10);
      } else {
        detail.open = true;
        setTimeout(() => {
          content.style.height = content.scrollHeight + 'px';

          // Remove fixed height after transition to allow content changes
          setTimeout(() => {
            content.style.height = 'auto';
          }, 300);
        }, 10);
      }
    });
  });
});
```

Here's a more complete example that combines both your requirements:

I've created a working demo that shows how to customize the `<details>` element with smooth animations. You can interact with it to see the effects in action.

## Key Implementation Details

### 1. Replacing the Triangle Icon

The solution uses CSS to remove the default triangle marker and replace it with custom icons:

```css
/* Remove default triangle marker */
details summary {
  list-style: none;
}

/* Remove default triangle in Safari */
details summary::-webkit-details-marker {
  display: none;
}

/* Create custom icon */
details summary::before {
  content: "";
  /* SVG background for icon */
}

/* Icon transition */
details[open] summary::before {
  transform: translateY(-50%) rotate(180deg);
}
```

### 2. Smooth Transitions for Opening/Closing

The crucial technique for smooth animation involves:

1. Preventing the default toggle behavior with `e.preventDefault()`
2. Manipulating the content height with JavaScript
3. Using CSS transitions for smooth animation

```javascript
// When closing
content.style.height = content.scrollHeight + 'px';
content.offsetHeight; // Force reflow
content.style.height = '0px';

// When opening
details.open = true;
content.style.height = content.scrollHeight + 'px';
```

 **DEMO**:
- Two different icon styles (arrow and plus/minus)
- Three animation speed options
- Multiple example details elements to test with

## Implementation Notes

1. The animation works by manipulating the `height` property and using CSS transitions
2. We set `height: auto` after animation completes to handle dynamic content
3. SVG icons are embedded as data URLs for portability
4. Browser compatibility is maintained with vendor prefixes and fallbacks
