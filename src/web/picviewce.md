---
title: PicviewCE | Userscripts
draft: false
---

Zoom images across all your favorite websites. Pop up, scale, edit, rotate, batch save images, or automatically load pictures from subsequent pages. Simply hover your mouse over any image and click the icons on the float bar.

  * **Adjust** : Scale/rotate/batch save every picture
  * **View** : Find and popup large version for pictures with click or mouse over
  * **Fetch** : Auto load and parse next paginated web pages and show ALL pics
  * **Download** : Pictures export to page or package into ZIP
  * **Search** : Search similar image by picture
  * **View long image by scroll**



Press `CTRL + G` to quickly enter the gallery. Hold `CTRL` to view a larger picture when hovering over images or links.

There are additional settings available in the "Picviewer CE+ config" for further customization. Currently, reviewing these settings is the best way to learn about the script's capabilities. Try exploring more functions on your own!

If you are glad to assist with the translation, please edit this file. It will be beneficial for individuals who speak the same language as you do. Thank you for your help.

Need more rules for peculiar sites? feel free to pull requests or open issues.

• Match image src (no matter which site) with /pics.dmm.co.jp/i and replace image url from "ps.jpg" to "pl.jpg"


    {
      "name": "Dmm",
      "src": "/pics\dmm\.co\jp/i",
      "r": "ps.jpg",
      "s": "pl.jpg"
    }


• Match site with /xxx.com/ and replace image url from /us\xxx.com/\d+wm/i to "previews.xxx.com/images/"

```json
    {
      "name": "Example",
      "url": "/xxx\.com/",
      "r": "/us\xxx\.com/\d+wm/i",
      "s": "previews.xxx.com/images/"
    }
```

• Add click-to-open for existing asiansister rule.

```json
    {
      "name": "Asiansister",
      "clickToOpen": {
        "enabled": true,
        "preventDefault": true,
        "type": "actual"
      }
    }
```

You have the option to use a standalone userscript, which allows you to manage all of your custom rules effectively.

There are two types of rules available:

  * **JSON (simple mode)**

These rules are written in JSON format and can be imported online through discussions. They won't be limited by websites that have a strict Content Security Policy that disallows unsafe-eval.

    * **JSON params**

      * **name**

"name": "rule name"

Name of the rule

      * **url**

`"url": "^[https://google\\.com](https://google%5C.com)"`

Regular expression used to match the site URL.

      * **src**

`"src": "^[https://image\\.xx\\.com](https://image%5C.xx%5C.com)"`

Regular expression used to match the image src

Regular expression used to replace the image src from

Replace the image src to

Capture nearby image element when the mouse hovers over a non-image element.

Lazy loaded original image URL attribute name

Fetch the link above the image that matches ".showcase__link" and query the "img[fetchpriority]" on the inner page from the link.

JS (full mode)

These rules are written in JavaScript object format. If you are not using a standalone userscript, they may be limited by websites that have a strict Content Security Policy that disallows unsafe-eval.

JS params

  * all mentioned above and the function type instead of string type
  * getImage
  * getExtSrc



<https://hoothin.github.io/UserScripts/Picviewer%20CE+/gallery.html>

A blank gallery page designed for viewing local or online pictures, showcasing every image you have imported.

Include `mode=1` to open gallery in view-more mode. Add `imgs=http://xxx/xxx.jpg` to import images. `[01-09]` to generate nine urls form 01 to 09 For example:

[https://hoothin.github.io/UserScripts/Picviewer%20CE+/gallery.html?mode=0&imgs=http://xxx/xxx[0](https://hoothin.github.io/UserScripts/Picviewer%20CE+/gallery.html?mode=0&imgs=http://xxx/xxx%5B0)
