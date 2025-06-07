// clipb.js - BEST Implementation/Styling
// Module for adding copy buttons to code blocks
const ClipbModule = (() => {
	// Function to create and return the copy button
	const createCopyButton = () => {
		const copyButton = document.createElement("button");
		DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M9 9V6.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 3 11.08 3 12.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v5.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 15 18.92 15 17.803 15H15M9 9H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 10.52 3 11.08 3 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.607c1.117 0 1.676 0 2.104-.218a2 2 0 0 0 .874-.874c.218-.428.218-.987.218-2.105V15M9 9h2.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.427.218.987.218 2.105V15"/></svg>`;
		copyButton.innerHTML = DEFAULT_SVG

		copyButton.className = "copy-button";
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
						const defaultSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 9V6.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 3 11.08 3 12.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v5.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 15 18.92 15 17.803 15H15M9 9H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 10.52 3 11.08 3 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.607c1.117 0 1.676 0 2.104-.218a2 2 0 0 0 .874-.874c.218-.428.218-.987.218-2.105V15M9 9h2.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.427.218.987.218 2.105V15"/></svg>`;
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
	return { init };
})();

// src/js/main.js
ClipbModule.init();
