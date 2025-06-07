// -----------------------------------------------------------------------------
// addMarkTags.js
// -----------------------------------------------------------------------------
function addMarkTags(text) {
    // Regex finds any text between  and  (non-greedy)
    const markRegex = /==(.*?)==/g;
    // Using a replacer function for clarity, though direct string could also work
    const markReplace = (match, content) => {
        return `<mark>${content}</mark>`;
    };
    return text.replace(markRegex, markReplace);
}
function applyMarkTagsToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        // CAUTION: Modifying innerHTML can destroy event listeners on child elements.
        // Best used on elements with static content.
        element.innerHTML = addMarkTags(element.innerHTML);
    } else {
        console.warn(`[addMarkTags] Element with selector "${selector}" not found.`);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    applyMarkTagsToElement("body");
});
