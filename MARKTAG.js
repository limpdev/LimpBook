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

// -----------------------------------------------------------------------------
// addScript.js
// -----------------------------------------------------------------------------
function addSuperScript(text) {
    const superGex = /\^(.*?)\^/g;
    const superReplace = (match, content) => {
        return `<span class="suptext">${content}</span>`;
    }
    return text.replace(superGex, superReplace);
}
function applySuperSpans(selector) {
    const element = document.querySelector(selector);
    if (element) {
        // CAUTION: Modifying innerHTML can destroy event listeners on child elements.
        // Best used on elements with static content.
        element.innerHTML = addSuperScript(element.innerHTML);
    } else {
        console.warn(`[addSuperScript] Element with selector "${selector}" not found.`);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    applySuperSpans("body");
});
// -----------------------------------------------------------------------------
// addSubScript.js
// -----------------------------------------------------------------------------
function addSubScript(text) {
    const SubGex = /~(.*?)~/g;
    const SubReplace = (match, content) => {
        return `<span class="subtext">${content}</span>`;
    }
    return text.replace(SubGex, SubReplace);
}
function applySubSpans(selector) {
    const element = document.querySelector(selector);
    if (element) {
        // CAUTION: Modifying innerHTML can destroy event listeners on child elements.
        // Best used on elements with static content.
        element.innerHTML = addSubScript(element.innerHTML);
    } else {
        console.warn(`[addSubScript] Element with selector "${selector}" not found.`);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    applySubSpans("body");
});