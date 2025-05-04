## [![icon](https://github.com/furybee/chrome-tab-modifier/raw/master/public/assets/icon_16.png)](https://github.com/furybee/chrome-tab-modifier/blob/master/public/assets/icon_16.png) Tab Modifier

[![GitHub Release](https://camo.githubusercontent.com/21b5ece1fd194346513dbf008b1de93ab7d41140f1a5584dfec02140219ed410/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f667572796265652f6368726f6d652d7461622d6d6f6469666965723f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b2676)](https://camo.githubusercontent.com/21b5ece1fd194346513dbf008b1de93ab7d41140f1a5584dfec02140219ed410/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f667572796265652f6368726f6d652d7461622d6d6f6469666965723f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b2676) [![license](https://camo.githubusercontent.com/de724de3c7514da9f0b2e40276424c10a6b17503c2ec91cc87d6e53a388aa652/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d6666343038312e7376673f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b)](https://github.com/furybee/chrome-tab-modifier/blob/master/LICENSE) [![GitHub Actions Workflow Status](https://camo.githubusercontent.com/f9d52f3addf1e128498b633a4abba991c8dff1bccdda2d1b2c755209d365628a/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f616374696f6e732f776f726b666c6f772f7374617475732f667572796265652f6368726f6d652d7461622d6d6f6469666965722f63692e796d6c3f7374796c653d666c61742d737175617265266c6162656c3d4349266c6162656c436f6c6f723d626c61636b)](https://camo.githubusercontent.com/f9d52f3addf1e128498b633a4abba991c8dff1bccdda2d1b2c755209d365628a/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f616374696f6e732f776f726b666c6f772f7374617475732f667572796265652f6368726f6d652d7461622d6d6f6469666965722f63692e796d6c3f7374796c653d666c61742d737175617265266c6162656c3d4349266c6162656c436f6c6f723d626c61636b) [![.nvmrc](https://camo.githubusercontent.com/5e4b0c9106e2138cd1cd3323bc54f91b43f4fef55a3267b908903aaa0442eb6a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2e6e766d72632d32302d3030653637362e7376673f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b)](https://github.com/furybee/chrome-tab-modifier/blob/master/.nvmrc) [![yarn:required](https://camo.githubusercontent.com/aa6e07433d0924fd9c2e54c6f55747a1f2c548cfe1bd88ff13690f70be579294/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7961726e2d72657175697265642d6165656130302e7376673f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b)](https://yarnpkg.com/en/) [![Conventional Commits](https://camo.githubusercontent.com/85e5b9b9ab349841202e0396cc0c7aaf65bfa2f25da3af7bc68a981ee62a603a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f6e76656e74696f6e616c253230436f6d6d6974732d312e302e302d6666616230302e7376673f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b)](https://conventionalcommits.org/) [![pr welcome](https://camo.githubusercontent.com/924459af03ecf268d48f5fea060b2a804c14289d16657ee9039a90967e7df8ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d3039464633332e7376673f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b)](https://camo.githubusercontent.com/924459af03ecf268d48f5fea060b2a804c14289d16657ee9039a90967e7df8ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d3039464633332e7376673f7374796c653d666c61742d737175617265266c6162656c436f6c6f723d626c61636b)

Take control of your tabs.

## Features

-   Rename tab
-   Change tab icon
-   Pin tab
-   Group tabs
-   Prevent tab closing
-   Unique tab
-   Mute tab

Quick rename can be done by right-clicking anywhere in the page and click on "Rename Tab".

## Usage

-   Click on the Tab Modifier icon [![icon](https://github.com/furybee/chrome-tab-modifier/raw/master/public/assets/icon_16.png)](https://github.com/furybee/chrome-tab-modifier/blob/master/public/assets/icon_16.png) to open Popup or Right-Click then Options.
-   Create your tab rules.
-   Try & enjoy!

## Why did you build this extension?

I needed a quick UI element in Chrome to know the environment of the tab, as a Web developer I often use multiple versions of the same website: local, pre-production and production.

Not easy to find the appropriate tab when you have multiple tabs called "My awesome website".

I created Tab Modifier to add prefixes to website titles with a specific match.

-   \[DEV\] My awesome website: `.local.domain.com`
-   \[PREPROD\] My awesome website: `.preprod.domain.com`
-   \[PROD\] My awesome website: `.domain.com`

After that, I have added more features like "auto-pin", custom favicons and more.

## Core system

Tab Modifier is based on user _rules_ and act on the tab URL that matches the first seen rule. When you open a tab (or refresh), the extension will check if the URL matches a rule and apply the actions.

Aware of that, there is no reason to include a feature that is not "rule-based". Prefer to install specific extensions or create your own.

## Examples

You have infinite possibilities, here are some configurations:

Pin all tabs:

-   **Detection**: Contains
-   **URL fragment**: http
-   **Pinned**: ON

Say hello to all Google websites:

-   **Detection**: Contains
-   **URL fragment**: google.com
-   **Title**: Hello Google: {title}

❌ Disguise GitHub as Google

-   **Detection**: Contains
-   **URL fragment**: github.com
-   **Title**: Google
-   **Icon**: [https://www.google.com/favicon.ico](https://www.google.com/favicon.ico)

This will not work due to Content Security Policy (CSP) restrictions:

> Refused to load the image '[https://www.google.com/favicon.ico](https://www.google.com/favicon.ico)' because it violates the following Content Security Policy directive from GitHub".

❌ Prevent accidental tab closure:

-   **Detection**: Contains
-   **URL fragment**: important-website.com
-   **Protected**: ON

> This feature is only available if you interact with the page at least once due to Chrome's security restrictions. [https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload\_event#usage\_notes](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#usage_notes)

Mute all Youtube videos by default:

-   **Detection**: Contains
-   **URL fragment**: youtube.com
-   **Mute**: ON

Set blank icon on Pinterest:

-   **Detection**: Contains
-   **URL fragment**: pinterest.fr
-   **Icon**: select "Chrome > Default"

Get only one GMail tab opened at once:

-   **Detection**: Starts with
-   **URL fragment**: [https://mail.google.com](https://mail.google.com/)
-   **Unique**: ON

Pin all PNG images (useless):

-   **Detection**: Ends with
-   **URL fragment**: .png
-   **Pinned**: ON

Customize title with HTML selector and Regexp:

-   **Detection**: Contains
-   **URL fragment**: github.com
-   **Title**: {title} | $2 by $1
-   **URL matcher**: github\[.\]com/(\[A-Za-z0-9\_-\]+)/(\[A-Za-z0-9\_-\]+)

Tab title will be: "FuryBee/chrome-tab-modifier: Take control of your tabs | chrome-tab-modifier by furybee"

❌ Match GitHub repositories:

-   **Detection**: RegExp
-   **URL fragment**: github\[.\]com/(\[A-Za-z0-9\_-\]+)/(\[A-Za-z0-9\_-\]+)
-   **Title**: I got you GitHub!

Customize GMail title with Title matcher and URL matcher:

-   **Detection**: Contains
-   **URL fragment**: mail.google.com
-   **Title**: @0 | $0
-   **Title matcher**: \[a-z\]\*@gmail.com
-   **URL matcher**: \[a-z\]\*.google.com

Tab title will be: "[youremail@gmail.com](mailto:youremail@gmail.com) | mail.google.com"

Github filename as title for blobs:

-   **Detection**: RegExp
-   **URL fragment**: github\[.\]com/(\[A-Za-z0-9\_-\]+)/(\[A-Za-z0-9\_-\]+)/blob/
-   **Title**: \{#file-name-id-wide\}

And now, build your own... 💪

## Known issues

### Local icon path doesn't work

Related issue: [#5](https://github.com/furybee/chrome-tab-modifier/issues/5)

Due to browser security restrictions, this path won't work: `file://<path>/icon.png`. Your icon will not be shown by Chrome.

Alternatively, you can upload your icon somewhere like [imgur.com](http://imgur.com/) and paste the direct link in your rule.

Another solution consists in transform your image in the [Data URI format](https://en.wikipedia.org/wiki/Data_URI_scheme). Go to [ezgif.com](https://ezgif.com/image-to-datauri) and paste the given output (the long text) in the icon input on your rule.

### Chrome system pages `chrome://`

Related issues: [#11](https://github.com/furybee/chrome-tab-modifier/issues/11), [#14](https://github.com/furybee/chrome-tab-modifier/issues/14)

Pages that start with `chrome://` URL are protected. No content script can be injected then Tab Modifier will not work on these pages.

### Local files `file:///`

Related issue: [#13](https://github.com/furybee/chrome-tab-modifier/issues/13)

By default, extensions don't have access to local files. You have to opt-in "Allow access to file URLs" from `chrome://extensions/?id=hcbgadmbdkiilgpifjgcakjehmafcjai`.

### Protected action is not triggered

Related issue: [#95](https://github.com/furybee/chrome-tab-modifier/issues/95)

Since Chrome 90, the JS event that triggers a refresh or a closure has been reworked. See related issue.

## Development

In case you want to contribute or just want to play with the code, follow the guide.

### Setup

Download and install [NodeJS](http://nodejs.org/download/) v18 to get [npm](https://www.npmjs.org/).

💡 Use `nvm` to allow you to quickly install and use different versions of node via the command line.

Install `yarn` globally:

Clone the project and install dependencies with `yarn`.

Type `yarn dev` to watch your changes inside `src/` folder or type `yarn build` after each change.

### Load local extension in Chrome

Go to `chrome://extensions/` and enable the "Developer mode".

Click on "Load unpacked extension..." and select the project `dist/` folder.
# chrome-tab-modifier

> `processIcon` is a function that stages the template for injecting the replacement icon into the HTML head.
>> the *newly* injected HTML includes the following: `<link rel='icon' type='image/x-icon' href='path/or/base/64'/>`

```javascript
export function processIcon(newIcon) {
	const icons = document.querySelectorAll('head link[rel*="icon"]');

	icons.forEach((icon) => {
		// ⚠️ icon.remove() causes issues with some websites
		// https://github.com/furybee/chrome-tab-modifier/issues/354
		// icon.remove();
		// Instead, we'll just change the rel attribute
		icon.setAttribute('rel', 'old-icon');
	});

	const iconUrl = /^(https?|data):/.test(newIcon)
		? newIcon
		: chrome.runtime.getURL(`/assets/${newIcon}`);

	const newIconLink = document.createElement('link');
	newIconLink.type = 'image/x-icon';
	newIconLink.rel = 'icon';
	newIconLink.href = iconUrl;
	document.head.appendChild(newIconLink);

	return true;
}
```
---

This JavaScript function, `processIcon`, is designed to update the website's favicon. Here’s a detailed breakdown of what it does:

### Function Overview
- **Purpose**: To replace the existing favicon (icon) with a new one.
- **Return Value**: Returns `true` after successfully processing the icon change.

### Steps Explained

1. **Selecting Existing Icons**:
   ```javascript
   const icons = document.querySelectorAll('head link[rel*="icon"]');
   ```
   - **Query**: This selects all `<link>` elements within the `<head>` of the document where the `rel` attribute contains "icon".
   - **Purpose**: Identifies all existing icon links.

2. **Handling Existing Icons**:
   ```javascript
   icons.forEach((icon) => {
     // ⚠️ icon.remove() causes issues with some websites
     // https://github.com/furybee/chrome-tab-modifier/issues/354
     // icon.remove();
     // Instead, we'll just change the rel attribute
     icon.setAttribute('rel', 'old-icon');
   });
   ```
   - **Action**: Iterates over each found icon.
   - **Issue Avoidance**: Directly removing icons can cause issues on some websites (referenced GitHub issue).
   - **Solution**: Instead of removing, it changes the `rel` attribute to "old-icon". This marks them as old without actually removing them from the DOM.

3. **Preparing the New Icon URL**:
   ```javascript
   const iconUrl = /^(https?|data):/.test(newIcon)
     ? newIcon
     : chrome.runtime.getURL(`/assets/${newIcon}`);
   ```
   - **Condition**: Checks if `newIcon` is a valid URL (starts with "http" or "https") or a data URI.
   - **Outcome**:
     - If it is, `iconUrl` remains as `newIcon`.
     - Otherwise, it assumes `newIcon` is a filename and constructs a full URL by appending the path to `chrome.runtime.getURL`.

4. **Creating the New Icon Link Element**:
   ```javascript
   const newIconLink = document.createElement('link');
   newIconLink.type = 'image/x-icon';
   newIconLink.rel = 'icon';
   newIconLink.href = iconUrl;
   ```
   - **Element Creation**: Creates a new `<link>` element.
   - **Attributes**:
     - `type`: Specifies the MIME type of the icon (`image/x-icon`).
     - `rel`: Sets the relationship to "icon" (standard for favicons).
     - `href`: Points to the URL of the new icon.

5. **Appending the New Icon Link to the Document Head**:
   ```javascript
   document.head.appendChild(newIconLink);
   ```
   - **Action**: Adds the newly created icon link to the `<head>` section of the document, effectively setting the favicon to the new one.

6. **Returning Success**:
   ```javascript
   return true;
   ```
   - **Indication**: Returns `true` to indicate that the icon update was successful.

### Summary
The `processIcon` function updates the website’s favicon by first marking existing icons as "old" and then adding a new one to the document. This method avoids potential issues caused by directly removing elements, ensuring a smooth transition in most cases.