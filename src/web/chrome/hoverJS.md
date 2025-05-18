# HoverUltimate
```javascript
// ==UserScript==
// @name         Hover Ultimate
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Lightning-fast image downloader with full-size image detection
// @author       limpdev
// @match        *://*/*
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    let lastDownloadTime = 0;
    const COOLDOWN_MS = 300;

    // Comprehensive list of image attributes to check
    const IMAGE_ATTRIBUTES = [
        'data-src',
        'data-full-src',
        'data-original',
        'data-zoom-src',
        'data-large-src',
        'data-high-res-src',
        'data-original-src',
        'data-1000px',
        'data-raw-src',
        'src'
    ];

    // Transform thumbnail URLs to full-size
    function transformToFullSize(url) {
        if (!url) return url;

        const patterns = [
            {
                regex: /(_thumb|_small|_medium|_tiny|\b\d+x\d+\b)/i,
                replacement: ''
            },
            {
                regex: /-\d+x\d+\./i,
                replacement: '.'
            },
            {
                regex: /[?&](w|width|h|height|size|quality|q)=\d+/ig,
                replacement: ''
            },
            {
                regex: /\?s=\d+/i,
                replacement: ''
            }
        ];

        return patterns.reduce((url, pattern) => 
            url.replace(pattern.regex, pattern.replacement), url);
    }

    // Get the best possible image URL
    function getBestImageUrl(element) {
        if (!element) return null;

        // For IMG elements
        if (element.tagName === 'IMG') {
            // Check all possible attributes
            for (const attr of IMAGE_ATTRIBUTES) {
                const value = element.getAttribute(attr);
                if (value) {
                    return transformToFullSize(value);
                }
            }
        }

        // For background images
        const style = window.getComputedStyle(element);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
            return transformToFullSize(bgImage.replace(/^url\(['"](.+)['"]\)$/, '$1'));
        }

        return null;
    }

    // Find the best image element near the cursor
    function findBestImageElement(element) {
        if (!element) return null;

        // Direct image check
        let url = getBestImageUrl(element);
        if (url) return { element, url };

        // Check children
        const imgChild = element.querySelector('img');
        if (imgChild) {
            url = getBestImageUrl(imgChild);
            if (url) return { element: imgChild, url };
        }

        // Check parents (limited depth)
        let parent = element.parentElement;
        let depth = 0;
        while (parent && depth < 3) {
            url = getBestImageUrl(parent);
            if (url) return { element: parent, url };
            parent = parent.parentElement;
            depth++;
        }

        return null;
    }

    // Download function with fallbacks
    function downloadImage(imageData) {
        const currentTime = Date.now();
        if (currentTime - lastDownloadTime < COOLDOWN_MS) return;
        lastDownloadTime = currentTime;

        if (!imageData || !imageData.url) return;

        const filename = imageData.url.split('/').pop().split('#')[0].split('?')[0];

        // Try GM_download first
        if (typeof GM_download !== 'undefined') {
            GM_download({
                url: imageData.url,
                name: filename,
                saveAs: false,
                onerror: () => fallbackDownload(imageData.url, filename)
            });
        } else {
            fallbackDownload(imageData.url, filename);
        }
    }

    // Fallback download method
    function fallbackDownload(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            })
            .catch(error => {
                console.error('Download failed:', error);
                // Last resort direct download
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

    // Track mouse position for better accuracy
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Main event listener
    document.addEventListener('keydown', function(event) {
        if (event.key === '0') {
            const element = document.elementFromPoint(mouseX, mouseY);
            const imageData = findBestImageElement(element);
            
            if (imageData) {
                event.preventDefault();
                downloadImage(imageData);
            }
        }
    });

    console.log('Ultimate Fast Image Downloader loaded!');
})();

```

### HoverOne
```javascript
// ==UserScript==
// @name         hover1
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Downloads the full-size image under the mouse cursor when pressing '0'
// @author       Limp Dev
// @match        *://*/*
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    // Function to get the element under the mouse cursor
    function getElementUnderMouse(event) {
        return document.elementFromPoint(event.clientX, event.clientY);
    }

    // Function to get full-size image URL
    function getFullSizeImageUrl(element) {
        if (!element) return null;

        // Check various common attributes for full-size image URLs
        const possibleAttributes = [
            'data-src',              // Common for lazy loading
            'data-full-src',         // Used by some sites
            'data-original',         // Used by some sites
            'data-zoom-src',         // Used for zoom/lightbox
            'data-large-src',        // Used for larger versions
            'data-high-res-src',     // High resolution version
            'data-original-src',     // Original source
            'data-1000px',           // Resolution-specific versions
            'data-raw-src',          // Raw/original version
            'src'                    // Default src attribute
        ];

        // For img elements, check all possible attributes
        if (element.tagName === 'IMG') {
            for (const attr of possibleAttributes) {
                const value = element.getAttribute(attr);
                if (value) {
                    // Common patterns for thumbnail URLs and their full-size counterparts
                    const fullSizeUrl = transformToFullSize(value);
                    if (fullSizeUrl) return fullSizeUrl;
                }
            }
            return element.src; // Fallback to regular src if no alternatives found
        }

        // For background images
        const bgImage = window.getComputedStyle(element).backgroundImage;
        if (bgImage && bgImage !== 'none') {
            const url = bgImage.slice(4, -1).replace(/["']/g, "");
            return transformToFullSize(url);
        }

        return null;
    }

    // Function to transform thumbnail URLs to full-size URLs
    function transformToFullSize(url) {
        if (!url) return url;

        // Common URL patterns for thumbnails and their full-size replacements
        const patterns = [
            {
                // Transform thumbnail dimensions to full size
                regex: /(_thumb|_small|_medium|_tiny|\b\d+x\d+\b)/i,
                replacement: ''
            },
            {
                // Replace common size indicators
                regex: /-\d+x\d+\./i,
                replacement: '.'
            },
            {
                // Replace width-based parameters
                regex: /[?&]w=\d+/i,
                replacement: ''
            },
            {
                // Replace size-related parameters
                regex: /[?&]size=\w+/i,
                replacement: ''
            },
            {
                // Replace quality/compression parameters
                regex: /[?&]q=\d+/i,
                replacement: ''
            }
        ];

        let fullSizeUrl = url;
        patterns.forEach(pattern => {
            fullSizeUrl = fullSizeUrl.replace(pattern.regex, pattern.replacement);
        });

        return fullSizeUrl;
    }

    // Function to find the closest image element
    function findClosestImage(element) {
        if (!element) return null;

        // If element is an image, return it
        if (element.tagName === 'IMG') {
            return element;
        }

        // Check if element has background image
        const bgImage = window.getComputedStyle(element).backgroundImage;
        if (bgImage && bgImage !== 'none') {
            const url = bgImage.slice(4, -1).replace(/["']/g, "");
            return { src: url, isBgImage: true };
        }

        // Look for img element within the current element
        const img = element.querySelector('img');
        if (img) {
            return img;
        }

        return null;
    }

    // Function to download the image
    function downloadImage(imageElement) {
        if (!imageElement) return;

        // Get the full-size image URL
        const imageUrl = getFullSizeImageUrl(imageElement);
        if (!imageUrl) return;

        // Extract filename from URL
        const filename = imageUrl.split('/').pop().split('#')[0].split('?')[0];

        // Use GM_download if available, otherwise fallback to creating a link
        if (typeof GM_download !== 'undefined') {
            GM_download({
                url: imageUrl,
                name: filename,
                saveAs: false
            });
        } else {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Listen for '0' key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'd') {
            const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
            const imageElement = findClosestImage(elementUnderMouse);
            if (imageElement) {
                downloadImage(imageElement);
            }
        }
    });
})();

```
---

### HoverTwo
```javascript
// ==UserScript==
// @name         Fast Image Downloader Enhanced
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Force download images quickly by pressing '0'
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastDownloadTime = 0;
    const COOLDOWN_MS = 500;

    // Force download function
    function forceDownload(imageUrl) {
        const currentTime = Date.now();
        if (currentTime - lastDownloadTime < COOLDOWN_MS) return;
        lastDownloadTime = currentTime;

        if (!imageUrl) return;

        // Clean up the URL
        imageUrl = imageUrl.split('?')[0];

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = generateFilename(imageUrl); // Forces download instead of navigation
        link.style.display = 'none';
        
        // For cross-origin images, we'll use fetch
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                link.href = blobUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
            })
            .catch(() => {
                // Fallback for same-origin images
                link.href = imageUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

    // Generate filename
    function generateFilename(url) {
        try {
            const pathname = new URL(url).pathname;
            const extension = pathname.split('.').pop().toLowerCase();
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
            const finalExtension = validExtensions.includes(extension) ? extension : 'jpg';
            return `image_${Date.now()}.${finalExtension}`;
        } catch {
            return `image_${Date.now()}.jpg`;
        }
    }

    // Get background image URL
    function getBackgroundImageUrl(element) {
        const style = window.getComputedStyle(element);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
            return bgImage.replace(/^url\(['"](.+)['"]\)$/, '$1');
        }
        return null;
    }

    // Find target image
    function findTargetImage(element) {
        if (!element) return null;

        // Direct image
        if (element.tagName === 'IMG') {
            return element.src;
        }

        // Background image
        const bgUrl = getBackgroundImageUrl(element);
        if (bgUrl) return bgUrl;

        // Check parents for background images
        let parent = element.parentElement;
        let depth = 0;
        while (parent && depth < 3) {
            const parentBgUrl = getBackgroundImageUrl(parent);
            if (parentBgUrl) return parentBgUrl;
            parent = parent.parentElement;
            depth++;
        }

        return null;
    }

    // Keypress handler
    document.addEventListener('keydown', function(event) {
        if (event.key === '0') {
            const hoveredElements = document.querySelectorAll(':hover');
            const lastHovered = hoveredElements[hoveredElements.length - 1];
            
            const imageUrl = findTargetImage(lastHovered);
            if (imageUrl) {
                event.preventDefault();
                forceDownload(imageUrl);
            }
        }
    });

    console.log('Fast Image Downloader Enhanced script loaded!');
})();

```