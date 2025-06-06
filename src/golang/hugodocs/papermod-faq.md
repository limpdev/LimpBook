## ToC

-   [Override theme template](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#override-theme-template)
-   [Enable Social-Metadata and SEO](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#enable-social-metadata-and-seo)
-   [Failed to find a valid digest in the 'integrity' attribute for resource ... ?](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource--)
-   [Bundling Custom css with theme's assets](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#bundling-custom-css-with-themes-assets)
-   [Custom Head / Footer](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#custom-head--footer)
-   [Add menu to site](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#add-menu-to-site)
-   [Pin a Post](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#pin-a-post)
-   [Adding Custom Favicon(s)](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#adding-custom-favicons)
-   [Centering image in markdown](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#centering-image-in-markdown)
-   [Using Hugo's Syntax highlighter "chroma"](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#using-hugos-syntax-highlighter-chroma)
-   [Posts from only one folder/section visible on home page?](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#posts-from-only-one-foldersection-visible-on-home-page)
-   [Search not working ?](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#search-not-working-)
-   [References](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#references)

___

> -   **We'll be using `yml/yaml` format for all examples down below, I recommend using `yml` over `toml` as it is easier to read.**
>     
> -   You can find any [YML to TOML](https://www.google.com/search?q=yml+to+toml) converters if necessary.
>     

___

## Override theme template

By Hugo's Lookup Order, you can override any part of a theme that you want. The following is a quick example.

Let's say you wish the `list` was different. All you have to do is copy the `list` template:

```shell
your-site/themes/papermod/layouts/_defaults/list.html
```

And paste it under your own `layouts` folder:

```shell
your-site/layouts/_defaults/list.html
```

Then you're free to make any changes you want to the `list`. When Hugo builds your site, your copy of `list.html` will be used instead of the theme's `list.html`.

___

## Enable Social-Metadata and SEO

These include OpenGraph, Twitter Cards and Schema.

or set `HUGO_ENV` as "production" in system env-vars

___

## Failed to find a valid digest in the 'integrity' attribute for resource ... ?

Read about How Subresource Integrity helps: [Subresource\_Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)

Why was the `asset` not loading ? : [How\_browsers\_handle\_Subresource\_Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#How_browsers_handle_Subresource_Integrity)

**Solution:**

Set the following in `config.yml`

```yaml
params:
  assets:
    disableFingerprinting: true
```

Linked Issues:

-   [https://stackoverflow.com/questions/65056585/hugo-theme-not-loading](https://stackoverflow.com/questions/65056585/hugo-theme-not-loading)
-   [https://stackoverflow.com/questions/65040931/hugo-failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource](https://stackoverflow.com/questions/65040931/hugo-failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource)
-   [https://blog.gerardbeckerleg.com/posts/hugo-failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource/](https://blog.gerardbeckerleg.com/posts/hugo-failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource/)

___

## Bundling Custom css with theme's assets

-   For adding custom css to be bundled inside one minimized css

Create folder in yout project directory as

```
.(site root)
├── config.yml
├── content/
├── theme/hugo-PaperMod/
└── assets/
    └── css/
        └── extended/  &lt;---
            ├── custom_css1.css &lt;---
            └── any_name.css   &lt;---
```

All `css` files inside `assets/css/extended` will be bundled !

**Note**: blank.css is just the placeholder so that it doesn't break the theme when no files are present under `assets/css/extended`

Linked Issues:

-   [Papermod Theme: How to add custom CSS?](https://discourse.gohugo.io/t/papermod-theme-how-to-add-custom-css/30165)

___

## Custom Head / Footer

Custom css/js can be added by way mentioned below.

```
.(site root)
├── config.yml
├── content/
├── theme/hugo-PaperMod/
└── layouts
    ├── partials
    │   ├── comments.html
    │   ├── extend_footer.html &lt;---
    │   └── extend_head.html   &lt;---
    └── robots.txt
```

Create a html page in directory structure as shown above.

Contents of `extend_head.html` will be added to `head` of page.

and contents of `extend_footer.html` will be added to bottom of page.

___

## Add menu to site

You can add menu entries which will appear in the header of every page.

To do so, add a `menu` section to your site's `config.yml`:

```yaml
menu:
  main:
    - identifier: categories
      name: categories
      url: /categories/
      weight: 10
    - identifier: tags
      name: tags
      url: /tags/
      weight: 20
    - identifier: example
      name: example.org
      url: https://example.org
      weight: 30
```

`name` controls what will be displayed for the menu entry. `url` sets the URL that the entry points to. `weight` is used to control the positioning of entries.

For more information on menus, see the [Hugo wiki page](https://gohugo.io/content-management/menus/).

___

## Pin a Post

Post can be pinned/ displayed top on the list by adding a `weight=<num>` var to page-variables

example:

```yaml
---
title: "My Important post"
date: 2020-09-15T11:30:03+00:00
weight: 1
---
```

```yaml
---
title: "My 2nd Important post"
date: 2020-09-15T11:30:03+00:00
weight: 2
---
```

___

## Adding Custom Favicon(s)

We support the following paths under `/static` directory and can be added accordingly.

-   `favicon.ico`
-   `favicon-16x16.png`
-   `favicon-32x32.png`
-   `apple-touch-icon.png`
-   `safari-pinned-tab.svg`

1.  Favicon(s) can be generated by [Favicon.io](https://favicon.io/) and can be simply put in `/static` folder.
    
2.  Other way is to add favicon(s) NOT located in `/static` folder.
    
    In site config add the following:
    
    ```yaml
    params:
      assets:
        favicon: "<link / absolute url>"
        favicon16x16: "<link / absolute url>"
        favicon32x32: "<link / absolute url>"
        apple_touch_icon: "<link / absolute url>"
        safari_pinned_tab: "<link / absolute url>"
    ```
    
    Note: `absolute url` means direct links to external resource: ex. `https://web.site/someimage.png`
    

```yaml
params:
  assets:
    favicon: "/favicon.ico"
    favicon16x16: "/favicon-16x16.png"
    favicon32x32: "/favicon-32x32.png"
    apple_touch_icon: "/apple-touch-icon.png"
    safari_pinned_tab: "/safari-pinned-tab.svg"
```

___

## Centering image in markdown

Add `#center` after image to center align an image

```md
![name](path/to/image.png#center)
```

**When using [`figure`](https://gohugo.io/content-management/shortcodes/) shortcode**

use `align=center` to center image with captions

```md
{{</* figure align=center src="image.jpg" */>}}
```

___

## Using Hugo's Syntax highlighter "chroma"

1.  Disable Highlight.js in site `config.yml`
    
    ```yaml
    params:
      assets:
        disableHLJS: true
    ```
    
2.  Set hugo's markdown styling in site `config.yml`
    
    ```yaml
    markup:
      highlight:
        # anchorLineNos: true
        codeFences: true
        guessSyntax: true
        lineNos: true
        # noClasses: false
        style: monokai
    ```
    
3.  If you want `lineNos: true`, the background won't be proper. This will only work with `noClasses: false` or `pygmentsUseClasses: true`. Read [Generate Syntax Highlighter CSS](https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css)
    
    Add the following to `assets/css/extended/custom.css`
    
    ```css
    .chroma {
      background-color: unset;
    }
    ```
    
    More Info : [Configure Markup - Highlight](https://gohugo.io/getting-started/configuration-markup#highlight)
    

___

## Search not working ?

If you are using a CDN to server assets from a different domain, search would break

Why? Take a look at [fastsearch.js#L35](https://github.com/adityatelange/hugo-PaperMod/blob/fb4988cfb6d0d6e4e489f17d89f0fa618def3396/assets/js/fastsearch.js#L35).

We fetch the `index.json` (where the search function looks for the keywords typed) one level up of the website `search.min.js` is hosted on.

We have used this insted of assigning `baseURL` so as to work with multilingual websites ex. `example.com/fr/` and websites being placed under a subdirectory ex. `example.com/blog/`.

To fix for _single_ language websites hosting assets from CDN, this you may [override](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#override-theme-template) [fastsearch.js#L35](https://github.com/adityatelange/hugo-PaperMod/blob/fb4988cfb6d0d6e4e489f17d89f0fa618def3396/assets/js/fastsearch.js#L35) and placing appropriate URL as in

```js
xhr.open("GET", "https://example.com/index.json");
```

___

## Posts from only one folder/section visible on home page

That is because PaperMod uses `mainsections` from Hugo. Read more: [https://gohugo.io/functions/where/#mainsections](https://gohugo.io/functions/where/#mainsections)

If you have not set this config parameter in site config, it will default to the section with the most pages. You can customize it with:

```yaml
params:
  mainSections:
    - blog
    - docs
```

___

## References

-   [Override a Hugo theme](https://zwbetz.com/override-a-hugo-theme/)