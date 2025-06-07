// -----------------------------------------------------------------------------
// RIPPLE CLICKS.js
// -----------------------------------------------------------------------------
(function () {
    const RIPPLE_SIZE = 96; // px
    const RIPPLE_DURATION_MS = 500; // Corresponds to the longest SVG animation duration

    document.addEventListener("click", function (e) {
        // Create a container for the ripple effect
        const rippleContainer = document.createElement("div");
        rippleContainer.style.position = "fixed";
        // Center the ripple at click position using transform
        rippleContainer.style.left = e.clientX + "px";
        rippleContainer.style.top = e.clientY + "px";
        rippleContainer.style.width = RIPPLE_SIZE + "px";
        rippleContainer.style.height = RIPPLE_SIZE + "px";
        rippleContainer.style.transform = "translate(-50%, -50%)"; // Center on click
        rippleContainer.style.pointerEvents = "none";
        rippleContainer.style.zIndex = "9999";
        rippleContainer.style.overflow = "visible"; // Ensure SVG is not clipped if it animates outside bounds temporarily

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", String(RIPPLE_SIZE));
        svg.setAttribute("height", String(RIPPLE_SIZE));
        svg.setAttribute("viewBox", "0 0 24 24"); // Keep viewBox consistent for relative r values

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "12"); // Center in viewBox
        circle.setAttribute("cy", "12"); // Center in viewBox
        circle.setAttribute("r", "0");
        circle.setAttribute("fill", "rgba(168, 168, 168, 0.7)");

        const animateRadius = document.createElementNS(svgNS, "animate");
        animateRadius.setAttribute("attributeName", "r");
        animateRadius.setAttribute("calcMode", "spline");
        animateRadius.setAttribute("dur", `${RIPPLE_DURATION_MS / 1000}s`);
        animateRadius.setAttribute("keySplines", ".52,.6,.25,.99");
        animateRadius.setAttribute("values", "0;11"); // Max radius within 24x24 viewBox
        animateRadius.setAttribute("fill", "freeze");

        const animateOpacity = document.createElementNS(svgNS, "animate");
        animateOpacity.setAttribute("attributeName", "opacity");
        animateOpacity.setAttribute("calcMode", "spline");
        // Opacity animation should be shorter or equal to radius animation
        animateOpacity.setAttribute("dur", `${Math.min(330, RIPPLE_DURATION_MS) / 1000}s`);
        animateOpacity.setAttribute("keySplines", ".52,.6,.25,.99");
        animateOpacity.setAttribute("values", "1;0");
        animateOpacity.setAttribute("fill", "freeze");

        circle.appendChild(animateRadius);
        circle.appendChild(animateOpacity);
        svg.appendChild(circle);
        rippleContainer.appendChild(svg);
        document.body.appendChild(rippleContainer);

        setTimeout(() => {
            if (rippleContainer.parentElement) {
                rippleContainer.parentElement.removeChild(rippleContainer);
            }
        }, RIPPLE_DURATION_MS); // Remove after the main animation completes
    });
})();
