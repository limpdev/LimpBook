## Duration[](https://gohugo.io/quick-reference/methods/#duration)

Use these methods with time.Duration values.

[Abs](https://gohugo.io/methods/duration/abs/)

Returns the absolute value of the given time.Duration value.

[Hours](https://gohugo.io/methods/duration/hours/)

Returns the time.Duration value as a floating point number of hours.

[Microseconds](https://gohugo.io/methods/duration/microseconds/)

Returns the time.Duration value as an integer microsecond count.

[Milliseconds](https://gohugo.io/methods/duration/milliseconds/)

Returns the time.Duration value as an integer millisecond count.

[Minutes](https://gohugo.io/methods/duration/minutes/)

Returns the time.Duration value as a floating point number of minutes.

[Nanoseconds](https://gohugo.io/methods/duration/nanoseconds/)

Returns the time.Duration value as an integer nanosecond count.

[Round](https://gohugo.io/methods/duration/round/)

Returns the result of rounding DURATION1 to the nearest multiple of DURATION2.

[Seconds](https://gohugo.io/methods/duration/seconds/)

Returns the time.Duration value as a floating point number of seconds.

[Truncate](https://gohugo.io/methods/duration/truncate/)

Returns the result of rounding DURATION1 toward zero to a multiple of DURATION2.

Use these methods when ranging through menu entries.

[ByName](https://gohugo.io/methods/menu/byname/)

Returns the given menu with its entries sorted by name.

[ByWeight](https://gohugo.io/methods/menu/byweight/)

Returns the given menu with its entries sorted by weight, then by name, then by identifier.

[Limit](https://gohugo.io/methods/menu/limit/)

Returns the given menu, limited to the first N entries.

[Reverse](https://gohugo.io/methods/menu/reverse/)

Returns the given menu, reversing the sort order of its entries.

Use these methods in your menu templates.

[Children](https://gohugo.io/methods/menu-entry/children/)

Returns a collection of child menu entries, if any, under the given menu entry.

[HasChildren](https://gohugo.io/methods/menu-entry/haschildren/)

Reports whether the given menu entry has child menu entries.

[Identifier](https://gohugo.io/methods/menu-entry/identifier/)

Returns the `identifier` property of the given menu entry.

[KeyName](https://gohugo.io/methods/menu-entry/keyname/)

Returns the `identifier` property of the given menu entry, falling back to its `name` property.

[Menu](https://gohugo.io/methods/menu-entry/menu/)

Returns the identifier of the menu that contains the given menu entry.

[Name](https://gohugo.io/methods/menu-entry/name/)

Returns the `name` property of the given menu entry.

[Page](https://gohugo.io/methods/menu-entry/page/)

Returns the Page object associated with the given menu entry.

[PageRef](https://gohugo.io/methods/menu-entry/pageref/)

Returns the `pageRef` property of the given menu entry.

[Params](https://gohugo.io/methods/menu-entry/params/)

Returns the `params` property of the given menu entry.

[Parent](https://gohugo.io/methods/menu-entry/parent/)

Returns the `parent` property of the given menu entry.

[Post](https://gohugo.io/methods/menu-entry/post/)

Returns the `post` property of the given menu entry.

[Pre](https://gohugo.io/methods/menu-entry/pre/)

Returns the `pre` property of the given menu entry.

[Title](https://gohugo.io/methods/menu-entry/title/)

Returns the `title` property of the given menu entry.

[URL](https://gohugo.io/methods/menu-entry/url/)

Returns the relative permalink of the page associated with the given menu entry, else its `url` property.

[Weight](https://gohugo.io/methods/menu-entry/weight/)

Returns the `weight` property of the given menu entry.

## Page[](https://gohugo.io/quick-reference/methods/#page)

Use these methods with a Page object.

[Aliases](https://gohugo.io/methods/page/aliases/)

Returns the URL aliases as defined in front matter.

[AllTranslations](https://gohugo.io/methods/page/alltranslations/)

Returns all translations of the given page, including the current language.

[AlternativeOutputFormats](https://gohugo.io/methods/page/alternativeoutputformats/)

Returns a slice of OutputFormat objects, excluding the current output format, each representing one of the output formats enabled for the given page.

[Ancestors](https://gohugo.io/methods/page/ancestors/)

Returns a collection of Page objects, one for each ancestor section of the given page.

[BundleType](https://gohugo.io/methods/page/bundletype/)

Returns the bundle type of the given page, or an empty string if the page is not a page bundle.

[CodeOwners](https://gohugo.io/methods/page/codeowners/)

Returns of slice of code owners for the given page, derived from the CODEOWNERS file in the root of the project directory.

[Content](https://gohugo.io/methods/page/content/)

Returns the rendered content of the given page.

[ContentWithoutSummary](https://gohugo.io/methods/page/contentwithoutsummary/)

Returns the rendered content of the given page, excluding the content summary.

[CurrentSection](https://gohugo.io/methods/page/currentsection/)

Returns the Page object of the section in which the given page resides.

[Data](https://gohugo.io/methods/page/data/)

Returns a unique data object for each page kind.

[Date](https://gohugo.io/methods/page/date/)

Returns the date of the given page.

[Description](https://gohugo.io/methods/page/description/)

Returns the description of the given page as defined in front matter.

[Draft](https://gohugo.io/methods/page/draft/)

Reports whether the given page is a draft as defined in front matter.

[Eq](https://gohugo.io/methods/page/eq/)

Reports whether two Page objects are equal.

[ExpiryDate](https://gohugo.io/methods/page/expirydate/)

Returns the expiry date of the given page.

[File](https://gohugo.io/methods/page/file/)

For pages backed by a file, returns file information for the given page.

[FirstSection](https://gohugo.io/methods/page/firstsection/)

Returns the Page object of the top level section of which the given page is a descendant.

[Fragments](https://gohugo.io/methods/page/fragments/)

Returns a data structure of the fragments in the given page.

[FuzzyWordCount](https://gohugo.io/methods/page/fuzzywordcount/)

Returns the number of words in the content of the given page, rounded up to the nearest multiple of 100.

[GetPage](https://gohugo.io/methods/page/getpage/)

Returns a Page object from the given path.

[GetTerms](https://gohugo.io/methods/page/getterms/)

Returns a collection of term pages for terms defined on the given page in the given taxonomy, ordered according to the sequence in which they appear in front matter.

[GitInfo](https://gohugo.io/methods/page/gitinfo/)

Returns Git information related to the last commit of the given page.

[HasMenuCurrent](https://gohugo.io/methods/page/hasmenucurrent/)

Reports whether the given Page object matches the Page object associated with one of the child menu entries under the given menu entry in the given menu.

[HasShortcode](https://gohugo.io/methods/page/hasshortcode/)

Reports whether the given shortcode is called by the given page.

[HeadingsFiltered](https://gohugo.io/methods/page/headingsfiltered/)

Returns a slice of headings for each page related to the given page.

[InSection](https://gohugo.io/methods/page/insection/)

Reports whether the given page is in the given section.

[IsAncestor](https://gohugo.io/methods/page/isancestor/)

Reports whether PAGE1 is an ancestor of PAGE2.

[IsDescendant](https://gohugo.io/methods/page/isdescendant/)

Reports whether PAGE1 is a descendant of PAGE2.

[IsHome](https://gohugo.io/methods/page/ishome/)

Reports whether the given page is the home page.

[IsMenuCurrent](https://gohugo.io/methods/page/ismenucurrent/)

Reports whether the given Page object matches the Page object associated with the given menu entry in the given menu.

[IsNode](https://gohugo.io/methods/page/isnode/)

Reports whether the given page is a node.

[IsPage](https://gohugo.io/methods/page/ispage/)

Reports whether the given page is a regular page.

[IsSection](https://gohugo.io/methods/page/issection/)

Reports whether the given page is a section page.

[IsTranslated](https://gohugo.io/methods/page/istranslated/)

Reports whether the given page has one or more translations.

[Keywords](https://gohugo.io/methods/page/keywords/)

Returns a slice of keywords as defined in front matter.

[Kind](https://gohugo.io/methods/page/kind/)

Returns the kind of the given page.

[Language](https://gohugo.io/methods/page/language/)

Returns the language object for the given page.

[Lastmod](https://gohugo.io/methods/page/lastmod/)

Returns the last modification date of the given page.

[Layout](https://gohugo.io/methods/page/layout/)

Returns the layout for the given page as defined in front matter.

[Len](https://gohugo.io/methods/page/len/)

Returns the length, in bytes, of the rendered content of the given page.

[LinkTitle](https://gohugo.io/methods/page/linktitle/)

Returns the link title of the given page.

[Next](https://gohugo.io/methods/page/next/)

Returns the next page in a site's collection of regular pages, relative to the current page.

[NextInSection](https://gohugo.io/methods/page/nextinsection/)

Returns the next regular page in a section, relative to the given page.

[OutputFormats](https://gohugo.io/methods/page/outputformats/)

Returns a slice of OutputFormat objects, each representing one of the output formats enabled for the given page.

[Page](https://gohugo.io/methods/page/page/)

Returns the Page object of the given page.

[PAGE.Store](https://gohugo.io/methods/page/store/)

Returns a persistent "scratch pad" on the given page to store and manipulate data.

[Pages](https://gohugo.io/methods/page/pages/)

Returns a collection of regular pages within the current section, and section pages of immediate descendant sections.

[Paginate](https://gohugo.io/methods/page/paginate/)

Paginates a collection of pages.

[Paginator](https://gohugo.io/methods/page/paginator/)

Paginates the collection of regular pages received in context.

[Param](https://gohugo.io/methods/page/param/)

Returns a page parameter with the given key, falling back to a site parameter if present.

[Params](https://gohugo.io/methods/page/params/)

Returns a map of custom parameters as defined in the front matter of the given page.

[Parent](https://gohugo.io/methods/page/parent/)

Returns the Page object of the parent section of the given page.

[Path](https://gohugo.io/methods/page/path/)

Returns the logical path of the given page.

[Permalink](https://gohugo.io/methods/page/permalink/)

Returns the permalink of the given page.

[Plain](https://gohugo.io/methods/page/plain/)

Returns the rendered content of the given page, removing all HTML tags.

[PlainWords](https://gohugo.io/methods/page/plainwords/)

Calls the Plain method, splits the result into a slice of words, and returns the slice.

[Prev](https://gohugo.io/methods/page/prev/)

Returns the previous page in a site's collection of regular pages, relative to the current page.

[PrevInSection](https://gohugo.io/methods/page/previnsection/)

Returns the previous regular page in a section, relative to the given page.

[PublishDate](https://gohugo.io/methods/page/publishdate/)

Returns the publish date of the given page.

[RawContent](https://gohugo.io/methods/page/rawcontent/)

Returns the raw content of the given page.

[ReadingTime](https://gohugo.io/methods/page/readingtime/)

Returns the estimated reading time, in minutes, for the given page.

[Ref](https://gohugo.io/methods/page/ref/)

Returns the absolute URL of the page with the given path, language, and output format.

[RegularPages](https://gohugo.io/methods/page/regularpages/)

Returns a collection of regular pages within the current section.

[RegularPagesRecursive](https://gohugo.io/methods/page/regularpagesrecursive/)

Returns a collection of regular pages within the current section, and regular pages within all descendant sections.

[RelPermalink](https://gohugo.io/methods/page/relpermalink/)

Returns the relative permalink of the given page.

[RelRef](https://gohugo.io/methods/page/relref/)

Returns the relative URL of the page with the given path, language, and output format.

[Render](https://gohugo.io/methods/page/render/)

Renders the given template with the given page as context.

[RenderShortcodes](https://gohugo.io/methods/page/rendershortcodes/)

Renders all shortcodes in the content of the given page, preserving the surrounding markup.

[RenderString](https://gohugo.io/methods/page/renderstring/)

Renders markup to HTML.

[Resources](https://gohugo.io/methods/page/resources/)

Returns a collection of page resources.

[Scratch](https://gohugo.io/methods/page/scratch/)

Returns a "scratch pad" on the given page to store and manipulate data.

[Section](https://gohugo.io/methods/page/section/)

Returns the name of the top level section in which the given page resides.

[Sections](https://gohugo.io/methods/page/sections/)

Returns a collection of section pages, one for each immediate descendant section of the given page.

[Site](https://gohugo.io/methods/page/site/)

Returns the Site object.

[Sitemap](https://gohugo.io/methods/page/sitemap/)

Returns the sitemap settings for the given page as defined in front matter, falling back to the sitemap settings as defined in the site configuration.

[Sites](https://gohugo.io/methods/page/sites/)

Returns a collection of all Site objects, one for each language, ordered by language weight.

[Slug](https://gohugo.io/methods/page/slug/)

Returns the URL slug of the given page as defined in front matter.

[Summary](https://gohugo.io/methods/page/summary/)

Returns the summary of the given page.

[TableOfContents](https://gohugo.io/methods/page/tableofcontents/)

Returns a table of contents for the given page.

[Title](https://gohugo.io/methods/page/title/)

Returns the title of the given page.

[TranslationKey](https://gohugo.io/methods/page/translationkey/)

Returns the translation key of the given page.

[Translations](https://gohugo.io/methods/page/translations/)

Returns all translations of the given page, excluding the current language.

[Truncated](https://gohugo.io/methods/page/truncated/)

Reports whether the content length exceeds the summary length.

[Type](https://gohugo.io/methods/page/type/)

Returns the content type of the given page.

[Weight](https://gohugo.io/methods/page/weight/)

Returns the weight of the given page as defined in front matter.

[WordCount](https://gohugo.io/methods/page/wordcount/)

Returns the number of words in the content of the given page.

Use these methods with Pager objects when building navigation for a [paginated](https://gohugo.io/templates/pagination/) list page.

[First](https://gohugo.io/methods/pager/first/)

Returns the first pager in the pager collection.

[HasNext](https://gohugo.io/methods/pager/hasnext/)

Reports whether there is a pager after the current pager.

[HasPrev](https://gohugo.io/methods/pager/hasprev/)

Reports whether there is a pager before the current pager.

[Last](https://gohugo.io/methods/pager/last/)

Returns the last pager in the pager collection.

[Next](https://gohugo.io/methods/pager/next/)

Returns the next pager in the pager collection.

[NumberOfElements](https://gohugo.io/methods/pager/numberofelements/)

Returns the number of pages in the current pager.

[PageGroups](https://gohugo.io/methods/pager/pagegroups/)

Returns the page groups in the current pager.

[PageNumber](https://gohugo.io/methods/pager/pagenumber/)

Returns the current pager's number within the pager collection.

[Pagers](https://gohugo.io/methods/pager/pagers/)

Returns the pagers collection.

[PagerSize](https://gohugo.io/methods/pager/pagersize/)

Returns the number of pages per pager.

[Pages](https://gohugo.io/methods/pager/pages/)

Returns the pages in the current pager.

[PageSize](https://gohugo.io/methods/pager/pagesize/)

Returns the number of pages per pager.

[Prev](https://gohugo.io/methods/pager/prev/)

Returns the previous pager in the pager collection.

[TotalNumberOfElements](https://gohugo.io/methods/pager/totalnumberofelements/)

Returns the number of pages in the pager collection.

[TotalPages](https://gohugo.io/methods/pager/totalpages/)

Returns the number of pagers in the pager collection.

[URL](https://gohugo.io/methods/pager/url/)

Returns the URL of the current pager relative to the site root.

## Pages[](https://gohugo.io/quick-reference/methods/#pages)

Use these methods with a collection of Page objects.

[ByDate](https://gohugo.io/methods/pages/bydate/)

Returns the given page collection sorted by date in ascending order.

[ByExpiryDate](https://gohugo.io/methods/pages/byexpirydate/)

Returns the given page collection sorted by expiration date in ascending order.

[ByLanguage](https://gohugo.io/methods/pages/bylanguage/)

Returns the given page collection sorted by language in ascending order.

[ByLastmod](https://gohugo.io/methods/pages/bylastmod/)

Returns the given page collection sorted by last modification date in ascending order.

[ByLength](https://gohugo.io/methods/pages/bylength/)

Returns the given page collection sorted by content length in ascending order.

[ByLinkTitle](https://gohugo.io/methods/pages/bylinktitle/)

Returns the given page collection sorted by link title in ascending order, falling back to title if link title is not defined.

[ByParam](https://gohugo.io/methods/pages/byparam/)

Returns the given page collection sorted by the given parameter in ascending order.

[ByPublishDate](https://gohugo.io/methods/pages/bypublishdate/)

Returns the given page collection sorted by publish date in ascending order.

[ByTitle](https://gohugo.io/methods/pages/bytitle/)

Returns the given page collection sorted by title in ascending order.

[ByWeight](https://gohugo.io/methods/pages/byweight/)

Returns the given page collection sorted by weight in ascending order.

[GroupBy](https://gohugo.io/methods/pages/groupby/)

Returns the given page collection grouped by the given field in ascending order.

[GroupByDate](https://gohugo.io/methods/pages/groupbydate/)

Returns the given page collection grouped by date in descending order.

[GroupByExpiryDate](https://gohugo.io/methods/pages/groupbyexpirydate/)

Returns the given page collection grouped by expiration date in descending order.

[GroupByLastmod](https://gohugo.io/methods/pages/groupbylastmod/)

Returns the given page collection grouped by last modification date in descending order.

[GroupByParam](https://gohugo.io/methods/pages/groupbyparam/)

Returns the given page collection grouped by the given parameter in ascending order.

[GroupByParamDate](https://gohugo.io/methods/pages/groupbyparamdate/)

Returns the given page collection grouped by the given date parameter in descending order.

[GroupByPublishDate](https://gohugo.io/methods/pages/groupbypublishdate/)

Returns the given page collection grouped by publish date in descending order.

[Len](https://gohugo.io/methods/pages/len/)

Returns the number of pages in the given page collection.

[Limit](https://gohugo.io/methods/pages/limit/)

Returns the first N pages from the given page collection.

[Next](https://gohugo.io/methods/pages/next/)

Returns the next page in a page collection, relative to the given page.

[Prev](https://gohugo.io/methods/pages/prev/)

Returns the previous page in a page collection, relative to the given page.

[Related](https://gohugo.io/methods/pages/related/)

Returns a collection of pages related to the given page.

[Reverse](https://gohugo.io/methods/pages/reverse/)

Returns the given page collection in reverse order.

## Resource[](https://gohugo.io/quick-reference/methods/#resource)

Use these methods with global, page, and remote Resource objects.

[Colors](https://gohugo.io/methods/resource/colors/)

Applicable to images, returns a slice of the most dominant colors using a simple histogram method.

[Content](https://gohugo.io/methods/resource/content/)

Returns the content of the given resource.

[Crop](https://gohugo.io/methods/resource/crop/)

Applicable to images, returns an image resource cropped to the given dimensions without resizing.

[Data](https://gohugo.io/methods/resource/data/)

Applicable to resources returned by the resources.GetRemote function, returns information from the HTTP response.

[Err](https://gohugo.io/methods/resource/err/)

Applicable to resources returned by the resources.GetRemote function, returns an error message if the HTTP request fails, else nil.

[Exif](https://gohugo.io/methods/resource/exif/)

Applicable to JPEG, PNG, TIFF, and WebP images, returns an EXIF object containing image metadata.

[Fill](https://gohugo.io/methods/resource/fill/)

Applicable to images, returns an image resource cropped and resized to the given dimensions.

[Filter](https://gohugo.io/methods/resource/filter/)

Applicable to images, applies one or more image filters to the given image resource.

[Fit](https://gohugo.io/methods/resource/fit/)

Applicable to images, returns an image resource downscaled to fit the given dimensions while maintaining aspect ratio.

[Height](https://gohugo.io/methods/resource/height/)

Applicable to images, returns the height of the given resource.

[MediaType](https://gohugo.io/methods/resource/mediatype/)

Returns a media type object for the given resource.

[Name](https://gohugo.io/methods/resource/name/)

Returns the name of the given resource as optionally defined in front matter, falling back to its file path.

[Params](https://gohugo.io/methods/resource/params/)

Returns a map of resource parameters as defined in front matter.

[Permalink](https://gohugo.io/methods/resource/permalink/)

Publishes the given resource and returns its permalink.

[Process](https://gohugo.io/methods/resource/process/)

Applicable to images, returns an image resource processed with the given specification.

[Publish](https://gohugo.io/methods/resource/publish/)

Publishes the given resource.

[RelPermalink](https://gohugo.io/methods/resource/relpermalink/)

Publishes the given resource and returns its relative permalink.

[Resize](https://gohugo.io/methods/resource/resize/)

Applicable to images, returns an image resource resized to the given width and/or height.

[ResourceType](https://gohugo.io/methods/resource/resourcetype/)

Returns the main type of the given resource's media type.

[Title](https://gohugo.io/methods/resource/title/)

Returns the title of the given resource as optionally defined in front matter, falling back to a relative path or hashed file name depending on resource type.

[Width](https://gohugo.io/methods/resource/width/)

Applicable to images, returns the width of the given resource.

## Shortcode[](https://gohugo.io/quick-reference/methods/#shortcode)

Use these methods in your shortcode templates.

[Get](https://gohugo.io/methods/shortcode/get/)

Returns the value of the given argument.

[Inner](https://gohugo.io/methods/shortcode/inner/)

Returns the content between opening and closing shortcode tags, applicable when the shortcode call includes a closing tag.

[InnerDeindent](https://gohugo.io/methods/shortcode/innerdeindent/)

Returns the content between opening and closing shortcode tags, with indentation removed, applicable when the shortcode call includes a closing tag.

[IsNamedParams](https://gohugo.io/methods/shortcode/isnamedparams/)

Reports whether the shortcode call uses named arguments.

[Name](https://gohugo.io/methods/shortcode/name/)

Returns the shortcode file name, excluding the file extension.

[Ordinal](https://gohugo.io/methods/shortcode/ordinal/)

Returns the zero-based ordinal of the shortcode in relation to its parent.

[Page](https://gohugo.io/methods/shortcode/page/)

Returns the Page object from which the shortcode was called.

[Params](https://gohugo.io/methods/shortcode/params/)

Returns a collection of the shortcode arguments.

[Parent](https://gohugo.io/methods/shortcode/parent/)

Returns the parent shortcode context in nested shortcodes.

[Position](https://gohugo.io/methods/shortcode/position/)

Returns the filename and position from which the shortcode was called.

[Ref](https://gohugo.io/methods/shortcode/ref/)

Returns the absolute URL of the page with the given path, language, and output format.

[RelRef](https://gohugo.io/methods/shortcode/relref/)

Returns the relative URL of the page with the given path, language, and output format.

[Scratch](https://gohugo.io/methods/shortcode/scratch/)

Returns a "scratch pad" scoped to the shortcode to store and manipulate data.

[Site](https://gohugo.io/methods/shortcode/site/)

Returns the Site object.

[Store](https://gohugo.io/methods/shortcode/store/)

Returns a "Store pad" scoped to the shortcode to store and manipulate data.

## Site[](https://gohugo.io/quick-reference/methods/#site)

Use these methods with Site objects. A multilingual project will have two or more sites, one for each language.

[AllPages](https://gohugo.io/methods/site/allpages/)

Returns a collection of all pages in all languages.

[BaseURL](https://gohugo.io/methods/site/baseurl/)

Returns the base URL as defined in the site configuration.

[BuildDrafts](https://gohugo.io/methods/site/builddrafts/)

Reports whether the current build includes draft pages.

[Config](https://gohugo.io/methods/site/config/)

Returns a subset of the site configuration.

[Copyright](https://gohugo.io/methods/site/copyright/)

Returns the copyright notice as defined in the site configuration.

[Data](https://gohugo.io/methods/site/data/)

Returns a data structure composed from the files in the data directory.

[GetPage](https://gohugo.io/methods/site/getpage/)

Returns a Page object from the given path.

[Home](https://gohugo.io/methods/site/home/)

Returns the home Page object for the given site.

[IsMultiLingual](https://gohugo.io/methods/site/ismultilingual/)

Reports whether there are two or more configured languages.

[Language](https://gohugo.io/methods/site/language/)

Returns the language object for the given site.

[LanguagePrefix](https://gohugo.io/methods/site/languageprefix/)

Returns the URL language prefix, if any, for the given site.

[Languages](https://gohugo.io/methods/site/languages/)

Returns a collection of language objects for all sites, ordered by language weight.

[LastChange](https://gohugo.io/methods/site/lastchange/)

Returns the last modification date of site content.

[Lastmod](https://gohugo.io/methods/site/lastmod/)

Returns the last modification date of site content.

[MainSections](https://gohugo.io/methods/site/mainsections/)

Returns a slice of the main section names as defined in the site configuration, falling back to the top level section with the most pages.

[Menus](https://gohugo.io/methods/site/menus/)

Returns a collection of menu objects for the given site.

[Pages](https://gohugo.io/methods/site/pages/)

Returns a collection of all pages.

[Param](https://gohugo.io/methods/site/param/)

Returns the site parameter with the given key.

[Params](https://gohugo.io/methods/site/params/)

Returns a map of custom parameters as defined in the site configuration.

[RegularPages](https://gohugo.io/methods/site/regularpages/)

Returns a collection of all regular pages.

[Sections](https://gohugo.io/methods/site/sections/)

Returns a collection of first level section pages.

[site.Store](https://gohugo.io/methods/site/store/)

Returns a persistent "scratch pad" on the given site to store and manipulate data.

[Sites](https://gohugo.io/methods/site/sites/)

Returns a collection of all Site objects, one for each language, ordered by default content language then by language weight.

[Taxonomies](https://gohugo.io/methods/site/taxonomies/)

Returns a data structure containing the site's Taxonomy objects, the terms within each Taxonomy object, and the pages to which the terms are assigned.

[Title](https://gohugo.io/methods/site/title/)

Returns the title as defined in the site configuration.

## Taxonomy[](https://gohugo.io/quick-reference/methods/#taxonomy)

Use these methods with Taxonomy objects.

[Alphabetical](https://gohugo.io/methods/taxonomy/alphabetical/)

Returns an ordered taxonomy, sorted alphabetically by term.

[ByCount](https://gohugo.io/methods/taxonomy/bycount/)

Returns an ordered taxonomy, sorted by the number of pages associated with each term.

[Count](https://gohugo.io/methods/taxonomy/count/)

Returns the number of number of weighted pages to which the given term has been assigned.

[Get](https://gohugo.io/methods/taxonomy/get/)

Returns a slice of weighted pages to which the given term has been assigned.

[Page](https://gohugo.io/methods/taxonomy/page/)

Returns the taxonomy page or nil if the taxonomy has no terms.

## Time[](https://gohugo.io/quick-reference/methods/#time)

Use these methods with time.Time values.

[Add](https://gohugo.io/methods/time/add/)

Returns the given time plus the given duration.

[AddDate](https://gohugo.io/methods/time/adddate/)

Returns the time corresponding to adding the given number of years, months, and days to the given time.Time value.

[After](https://gohugo.io/methods/time/after/)

Reports whether TIME1 is after TIME2.

[Before](https://gohugo.io/methods/time/before/)

Reports whether TIME1 is before TIME2.

[Day](https://gohugo.io/methods/time/day/)

Returns the day of the month of the given time.Time value.

[Equal](https://gohugo.io/methods/time/equal/)

Reports whether TIME1 is equal to TIME2.

[Format](https://gohugo.io/methods/time/format/)

Returns a textual representation of the time.Time value formatted according to the layout string.

[Hour](https://gohugo.io/methods/time/hour/)

Returns the hour within the day of the given time.Time value, in the range \[0, 23\].

[IsDST](https://gohugo.io/methods/time/isdst/)

Reports whether the given time.Time value is in Daylight Savings Time.

[IsZero](https://gohugo.io/methods/time/iszero/)

Reports whether the given time.Time value represents the zero time instant, January 1, year 1, 00:00:00 UTC.

[Local](https://gohugo.io/methods/time/local/)

Returns the given time.Time value with the location set to local time.

[Minute](https://gohugo.io/methods/time/minute/)

Returns the minute offset within the hour of the given time.Time value, in the range \[0, 59\].

[Month](https://gohugo.io/methods/time/month/)

Returns the month of the year of the given time.Time value.

[Nanosecond](https://gohugo.io/methods/time/nanosecond/)

Returns the nanosecond offset within the second of the given time.Time value, in the range \[0, 999999999\].

[Round](https://gohugo.io/methods/time/round/)

Returns the result of rounding TIME to the nearest multiple of DURATION since January 1, 0001, 00:00:00 UTC.

[Second](https://gohugo.io/methods/time/second/)

Returns the second offset within the minute of the given time.Time value, in the range \[0, 59\].

[Sub](https://gohugo.io/methods/time/sub/)

Returns the duration computed by subtracting TIME2 from TIME1.

[Truncate](https://gohugo.io/methods/time/truncate/)

Returns the result of rounding TIME down to a multiple of DURATION since January 1, 0001, 00:00:00 UTC.

[Unix](https://gohugo.io/methods/time/unix/)

Returns the given time.Time value expressed as the number of seconds elapsed since January 1, 1970 UTC.

[UnixMicro](https://gohugo.io/methods/time/unixmicro/)

Returns the given time.Time value expressed as the number of microseconds elapsed since January 1, 1970 UTC.

[UnixMilli](https://gohugo.io/methods/time/unixmilli/)

Returns the given time.Time value expressed as the number of milliseconds elapsed since January 1, 1970 UTC.

[UnixNano](https://gohugo.io/methods/time/unixnano/)

Returns the given time.Time value expressed as the number of nanoseconds elapsed since January 1, 1970 UTC.

[UTC](https://gohugo.io/methods/time/utc/)

Returns the given time.Time value with the location set to UTC.

[Weekday](https://gohugo.io/methods/time/weekday/)

Returns the day of the week of the given time.Time value.

[Year](https://gohugo.io/methods/time/year/)

Returns the year of the given time.Time value.

[YearDay](https://gohugo.io/methods/time/yearday/)

Returns the day of the year of the given time.Time value, in the range \[1, 365\] for non-leap years, and \[1, 366\] in leap years.