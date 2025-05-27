// floatingTOC.js - Optimized Version
// -----------------------------------------------------------------------------
(function () {
    // Configuration constants
    const CONFIG = {
        SCROLL_DEBOUNCE_DELAY: 8, // ~60fps for smooth updates
        CLICK_SCROLLSPY_PAUSE_DURATION: 100, // Reduced for better responsiveness
        INTERSECTION_ROOT_MARGIN: '-10% 0px -80% 0px', // More accurate visibility detection
        HEADER_OFFSET: 20, // Pixels from top to consider "active"
    };

    let scrollTimeout = null;
    let intersectionObserver = null;
    let pagetocElement = null;
    let headerElements = [];
    let isInitialized = false;

    // Optimized debounce with immediate first call
    function debounce(func, delay, immediate = false) {
        let timeout;
        return function (...args) {
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            }, delay);
            if (callNow) func.apply(this, args);
        };
    }

    // Throttle function for high-frequency events
    function throttle(func, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    // Enhanced active link click handler
    const setupClickHandlers = () => {
        if (!pagetocElement) return;

        pagetocElement.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;

            // Temporarily disable scroll spy
            clearTimeout(scrollTimeout);
            
            // Update active state immediately
            updateActiveStates(link.href);
            
            // Re-enable scroll spy after animation completes
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, CONFIG.CLICK_SCROLLSPY_PAUSE_DURATION);
        });
    };

    // Get or create pagetoc element with better error handling
    const getPagetoc = () => {
        const existing = document.querySelector('.pagetoc');
        if (existing) return existing;
        
        return autoCreatePagetoc();
    };

    // Improved auto-creation with better DOM manipulation
    const autoCreatePagetoc = () => {
        console.warn('[floatingTOC] Auto-creating TOC container. Consider adding .pagetoc to your HTML.');
        
        const mainContainer = document.querySelector('#content > main, main, .main-content');
        if (!mainContainer) {
            console.error('[floatingTOC] Cannot find suitable main container for TOC.');
            return null;
        }

        // Create structure more efficiently
        let sidetocDiv = mainContainer.querySelector('.sidetoc');
        if (!sidetocDiv) {
            sidetocDiv = document.createElement('div');
            sidetocDiv.className = 'sidetoc';
            
            // Wrap existing content if needed
            if (!mainContainer.querySelector('.content-wrap')) {
                const contentWrap = document.createElement('div');
                contentWrap.className = 'content-wrap';
                // Move all children to content wrap
                while (mainContainer.firstChild) {
                    contentWrap.appendChild(mainContainer.firstChild);
                }
                mainContainer.appendChild(contentWrap);
            }
            
            mainContainer.insertBefore(sidetocDiv, mainContainer.firstChild);
        }

        // Create pagetoc nav
        let pagetocNav = sidetocDiv.querySelector('.pagetoc');
        if (!pagetocNav) {
            pagetocNav = document.createElement('nav');
            pagetocNav.className = 'pagetoc';
            pagetocNav.setAttribute('aria-label', 'Table of contents');
            sidetocDiv.appendChild(pagetocNav);
        }

        return pagetocNav;
    };

    // More accurate active link detection using Intersection Observer
    const setupIntersectionObserver = () => {
        if (!('IntersectionObserver' in window)) {
            // Fallback to scroll-based detection
            return setupScrollBasedDetection();
        }

        intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (scrollTimeout) return; // Skip if paused after click

                let visibleHeaders = entries
                    .filter(entry => entry.isIntersecting)
                    .map(entry => ({
                        element: entry.target,
                        ratio: entry.intersectionRatio,
                        top: entry.boundingClientRect.top
                    }))
                    .sort((a, b) => a.top - b.top);

                if (visibleHeaders.length > 0) {
                    // Choose the header closest to the top of the viewport
                    const activeHeader = visibleHeaders[0];
                    const headerLink = activeHeader.element.querySelector('.header') || 
                                     activeHeader.element.closest('.header');
                    
                    if (headerLink && headerLink.href) {
                        updateActiveStates(headerLink.href);
                    }
                }
            },
            {
                rootMargin: CONFIG.INTERSECTION_ROOT_MARGIN,
                threshold: [0, 0.1, 0.5, 1.0]
            }
        );

        // Observe all header containers
        headerElements.forEach(header => {
            const container = header.parentElement || header;
            intersectionObserver.observe(container);
        });
    };

    // Fallback scroll-based detection (improved)
    const setupScrollBasedDetection = () => {
        const updateActiveLink = () => {
            if (scrollTimeout) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            let activeHeader = null;
            let minDistance = Infinity;

            headerElements.forEach(header => {
                const rect = header.getBoundingClientRect();
                const distance = Math.abs(rect.top - CONFIG.HEADER_OFFSET);
                
                // Prefer headers that are visible and closest to the offset
                if (rect.top <= CONFIG.HEADER_OFFSET && distance < minDistance) {
                    minDistance = distance;
                    activeHeader = header;
                }
            });

            // If no header is above the offset, use the next visible one
            if (!activeHeader) {
                for (const header of headerElements) {
                    const rect = header.getBoundingClientRect();
                    if (rect.top > 0 && rect.top < windowHeight) {
                        activeHeader = header;
                        break;
                    }
                }
            }

            if (activeHeader && activeHeader.href) {
                updateActiveStates(activeHeader.href);
            }
        };

        const throttledUpdate = throttle(updateActiveLink, CONFIG.SCROLL_DEBOUNCE_DELAY);
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        
        // Initial call
        updateActiveLink();
    };

    // Optimized active state management
    const updateActiveStates = (activeHref) => {
        if (!pagetocElement) return;

        // Use more efficient DOM queries
        const currentActive = pagetocElement.querySelector('.active');
        const newActive = pagetocElement.querySelector(`a[href="${activeHref}"]`);

        if (currentActive === newActive) return; // No change needed

        if (currentActive) {
            currentActive.classList.remove('active');
        }
        
        if (newActive) {
            newActive.classList.add('active');
        }
    };

    // Build TOC with improved performance
    const buildTOC = () => {
        headerElements = Array.from(document.getElementsByClassName('header'))
            .filter(header => header.href && header.textContent?.trim())
            .sort((a, b) => {
                const aRect = a.getBoundingClientRect();
                const bRect = b.getBoundingClientRect();
                return (aRect.top + window.pageYOffset) - (bRect.top + window.pageYOffset);
            });

        if (!headerElements.length) {
            console.warn('[floatingTOC] No valid header elements found.');
            return false;
        }

        // Use DocumentFragment for efficient DOM manipulation
        const fragment = document.createDocumentFragment();
        
        headerElements.forEach(header => {
            const link = document.createElement('a');
            link.href = header.href;
            link.textContent = header.textContent.trim();
            
            // Determine CSS class based on heading level
            const headingParent = header.closest('h1, h2, h3, h4, h5, h6');
            if (headingParent) {
                link.className = `pagetoc-${headingParent.tagName.toLowerCase()}`;
            } else {
                link.className = 'pagetoc-default';
            }
            
            fragment.appendChild(link);
        });

        pagetocElement.appendChild(fragment);
        return true;
    };

    // Enhanced initialization
    const initialize = () => {
        if (isInitialized) return;

        pagetocElement = getPagetoc();
        if (!pagetocElement) {
            console.error('[floatingTOC] Failed to create or find TOC container.');
            return;
        }

        if (!buildTOC()) {
            // Hide empty TOC
            const sidetocContainer = pagetocElement.closest('.sidetoc');
            if (sidetocContainer) {
                sidetocContainer.style.display = 'none';
            }
            return;
        }

        setupClickHandlers();
        setupIntersectionObserver();
        
        isInitialized = true;
        console.log('[floatingTOC] Initialized successfully with', headerElements.length, 'headers.');
    };

    // Cleanup function for better memory management
    const cleanup = () => {
        if (intersectionObserver) {
            intersectionObserver.disconnect();
            intersectionObserver = null;
        }
        clearTimeout(scrollTimeout);
        isInitialized = false;
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM is already loaded
        setTimeout(initialize, 0);
    }

    // Handle page unload
    window.addEventListener('beforeunload', cleanup);

    // Expose public API for manual control if needed
    window.floatingTOC = {
        init: initialize,
        cleanup: cleanup,
        refresh: () => {
            cleanup();
            initialize();
        }
    };
})();