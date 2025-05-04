## Page[](https://gohugo.io/quick-reference/page-collections/#page)

assets/ Use these `Page` methods when rendering lists on [section pages](https://gohugo.io/getting-started/glossary/#section-page), [taxonomy pages](https://gohugo.io/getting-started/glossary/#taxonomy-page), [term pages](https://gohugo.io/getting-started/glossary/#term-page), and the home page.

[PAGE.Pages](https://gohugo.io/methods/page/pages/)

Returns a collection of regular pages within the current section, and section pages of immediate descendant sections.

[PAGE.RegularPages](https://gohugo.io/methods/page/regularpages/)

Returns a collection of regular pages within the current section.

[PAGE.RegularPagesRecursive](https://gohugo.io/methods/page/regularpagesrecursive/)

Returns a collection of regular pages within the current section, and regular pages within all descendant sections.

[PAGE.Sections](https://gohugo.io/methods/page/sections/)

Returns a collection of section pages, one for each immediate descendant section of the given page.

## Site[](https://gohugo.io/quick-reference/page-collections/#site)

Use these `Site` methods when rendering lists on any page.

[SITE.AllPages](https://gohugo.io/methods/site/allpages/)

Returns a collection of all pages in all languages.

[SITE.Pages](https://gohugo.io/methods/site/pages/)

Returns a collection of all pages.

[SITE.RegularPages](https://gohugo.io/methods/site/regularpages/)

Returns a collection of all regular pages.

[SITE.Sections](https://gohugo.io/methods/site/sections/)

Returns a collection of first level section pages.

## Filter[](https://gohugo.io/quick-reference/page-collections/#filter)

Use the [`where`](https://gohugo.io/functions/collections/where/) function to filter page collections.

## Sort[](https://gohugo.io/quick-reference/page-collections/#sort)

By default, Hugo sorts page collections by:

1.  [Weight](https://gohugo.io/methods/page/weight/)
2.  [Date](https://gohugo.io/methods/page/date/) in descending order
3.  [LinkTitle](https://gohugo.io/methods/page/linktitle/) falling back to [Title](https://gohugo.io/methods/page/title/)
4.  [Filename](https://gohugo.io/methods/page/file/#filename) if the page is backed by a file

Use these methods to sort page collections.

[PAGES.ByDate](https://gohugo.io/methods/pages/bydate/)

Returns the given page collection sorted by date in ascending order.

[PAGES.ByExpiryDate](https://gohugo.io/methods/pages/byexpirydate/)

Returns the given page collection sorted by expiration date in ascending order.

[PAGES.ByLanguage](https://gohugo.io/methods/pages/bylanguage/)

Returns the given page collection sorted by language in ascending order.

[PAGES.ByLastmod](https://gohugo.io/methods/pages/bylastmod/)

Returns the given page collection sorted by last modification date in ascending order.

[PAGES.ByLength](https://gohugo.io/methods/pages/bylength/)

Returns the given page collection sorted by content length in ascending order.

[PAGES.ByLinkTitle](https://gohugo.io/methods/pages/bylinktitle/)

Returns the given page collection sorted by link title in ascending order, falling back to title if link title is not defined.

[PAGES.ByParam](https://gohugo.io/methods/pages/byparam/)

Returns the given page collection sorted by the given parameter in ascending order.

[PAGES.ByPublishDate](https://gohugo.io/methods/pages/bypublishdate/)

Returns the given page collection sorted by publish date in ascending order.

[PAGES.ByTitle](https://gohugo.io/methods/pages/bytitle/)

Returns the given page collection sorted by title in ascending order.

[PAGES.ByWeight](https://gohugo.io/methods/pages/byweight/)

Returns the given page collection sorted by weight in ascending order.

[PAGES.Reverse](https://gohugo.io/methods/pages/reverse/)

Returns the given page collection in reverse order.

## Group[](https://gohugo.io/quick-reference/page-collections/#group)

Use these methods to group page collections.

[PAGES.GroupBy](https://gohugo.io/methods/pages/groupby/)

Returns the given page collection grouped by the given field in ascending order.

[PAGES.GroupByDate](https://gohugo.io/methods/pages/groupbydate/)

Returns the given page collection grouped by date in descending order.

[PAGES.GroupByExpiryDate](https://gohugo.io/methods/pages/groupbyexpirydate/)

Returns the given page collection grouped by expiration date in descending order.

[PAGES.GroupByLastmod](https://gohugo.io/methods/pages/groupbylastmod/)

Returns the given page collection grouped by last modification date in descending order.

[PAGES.GroupByParam](https://gohugo.io/methods/pages/groupbyparam/)

Returns the given page collection grouped by the given parameter in ascending order.

[PAGES.GroupByParamDate](https://gohugo.io/methods/pages/groupbyparamdate/)

Returns the given page collection grouped by the given date parameter in descending order.

[PAGES.GroupByPublishDate](https://gohugo.io/methods/pages/groupbypublishdate/)

Returns the given page collection grouped by publish date in descending order.

[PAGES.Reverse](https://gohugo.io/methods/pages/reverse/)

Returns the given page collection in reverse order.