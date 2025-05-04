## cast[](https://gohugo.io/quick-reference/functions/#cast)

Use these functions to cast a value from one data type to another.

[cast.ToFloat](https://gohugo.io/functions/cast/tofloat/) (float)

Converts a value to a decimal floating-point number (base 10).

[cast.ToInt](https://gohugo.io/functions/cast/toint/) (int)

Converts a value to a decimal integer (base 10).

[cast.ToString](https://gohugo.io/functions/cast/tostring/) (string)

Converts a value to a string.

## collections[](https://gohugo.io/quick-reference/functions/#collections)

Use these functions to work with arrays, slices, maps, and page collections.

[collections.After](https://gohugo.io/functions/collections/after/) (after)

Slices an array to the items after the Nth item.

[collections.Append](https://gohugo.io/functions/collections/append/) (append)

Appends one or more elements to a slice and returns the resulting slice.

[collections.Apply](https://gohugo.io/functions/collections/apply/) (apply)

Returns a new collection with each element transformed by the given function.

[collections.Complement](https://gohugo.io/functions/collections/complement/) (complement)

Returns the elements of the last collection that are not in any of the others.

[collections.Delimit](https://gohugo.io/functions/collections/delimit/) (delimit)

Loops through any array, slice, or map and returns a string of all the values separated by a delimiter.

[collections.Dictionary](https://gohugo.io/functions/collections/dictionary/) (dict)

Returns a map composed of the given key-value pairs.

[collections.First](https://gohugo.io/functions/collections/first/) (first)

Returns the given collection, limited to the first N elements.

[collections.Group](https://gohugo.io/functions/collections/group/) (group)

Groups the given page collection by the given key.

[collections.In](https://gohugo.io/functions/collections/in/) (in)

Reports whether the given value is a member of the given set.

[collections.Index](https://gohugo.io/functions/collections/indexfunction/) (index)

Returns the object, element, or value associated with the given key or keys.

[collections.Intersect](https://gohugo.io/functions/collections/intersect/) (intersect)

Returns the common elements of two arrays or slices, in the same order as the first array.

[collections.IsSet](https://gohugo.io/functions/collections/isset/) (isset)

Reports whether the key exists within the collection.

[collections.KeyVals](https://gohugo.io/functions/collections/keyvals/) (keyVals)

Returns a KeyVals struct.

[collections.Last](https://gohugo.io/functions/collections/last/) (last)

Returns the given collection, limited to the last N elements.

[collections.Merge](https://gohugo.io/functions/collections/merge/) (merge)

Returns the result of merging two or more maps.

[collections.NewScratch](https://gohugo.io/functions/collections/newscratch/) (newScratch)

Returns a locally scoped "scratch pad" to store and manipulate data.

[collections.Querify](https://gohugo.io/functions/collections/querify/) (querify)

Returns a URL query string composed of the given key-value pairs, encoded and sorted by key.

[collections.Reverse](https://gohugo.io/functions/collections/reverse/)

Reverses the order of a collection.

[collections.Seq](https://gohugo.io/functions/collections/seq/) (seq)

Returns a slice of integers.

[collections.Shuffle](https://gohugo.io/functions/collections/shuffle/) (shuffle)

Returns a random permutation of a given array or slice.

[collections.Slice](https://gohugo.io/functions/collections/slice/) (slice)

Returns a slice composed of the given values.

[collections.Sort](https://gohugo.io/functions/collections/sort/) (sort)

Sorts slices, maps, and page collections.

[collections.SymDiff](https://gohugo.io/functions/collections/symdiff/) (symdiff)

Returns the symmetric difference of two collections.

[collections.Union](https://gohugo.io/functions/collections/union/) (union)

Given two arrays or slices, returns a new array that contains the elements that belong to either or both arrays/slices.

[collections.Uniq](https://gohugo.io/functions/collections/uniq/) (uniq)

Returns the given collection, removing duplicate elements.

[collections.Where](https://gohugo.io/functions/collections/where/) (where)

Returns the given collection, removing elements that do not satisfy the comparison condition.

## compare[](https://gohugo.io/quick-reference/functions/#compare)

Use these functions to compare two or more values.

[compare.Conditional](https://gohugo.io/functions/compare/conditional/) (cond)

Returns one of two arguments depending on the value of the control argument.

[compare.Default](https://gohugo.io/functions/compare/default/) (default)

Returns the second argument if set, else the first argument.

[compare.Eq](https://gohugo.io/functions/compare/eq/) (eq)

Returns the boolean truth of arg1 == arg2 || arg1 == arg3.

[compare.Ge](https://gohugo.io/functions/compare/ge/) (ge)

Returns the boolean truth of arg1 >= arg2 && arg1 >= arg3.

[compare.Gt](https://gohugo.io/functions/compare/gt/) (gt)

Returns the boolean truth of arg1 > arg2 && arg1 > arg3.

[compare.Le](https://gohugo.io/functions/compare/le/) (le)

Returns the boolean truth of arg1 \<\= arg2 && arg1 \<\= arg3.

[compare.Lt](https://gohugo.io/functions/compare/lt/) (lt)

Returns the boolean truth of arg1 < arg2 && arg1 < arg3.

[compare.Ne](https://gohugo.io/functions/compare/ne/) (ne)

Returns the boolean truth of arg1 != arg2 && arg1 != arg3.

## crypto[](https://gohugo.io/quick-reference/functions/#crypto)

Use these functions to create cryptographic hashes.

[crypto.FNV32a](https://gohugo.io/functions/crypto/fnv32a/)

Returns the 32-bit FNV (Fowler–Noll–Vo) non-cryptographic hash of the given string.

[crypto.HMAC](https://gohugo.io/functions/crypto/hmac/) (hmac)

Returns a cryptographic hash that uses a key to sign a message.

[crypto.MD5](https://gohugo.io/functions/crypto/md5/) (md5)

Hashes the given input and returns its MD5 checksum encoded to a hexadecimal string.

[crypto.SHA1](https://gohugo.io/functions/crypto/sha1/) (sha1)

Hashes the given input and returns its SHA1 checksum encoded to a hexadecimal string.

[crypto.SHA256](https://gohugo.io/functions/crypto/sha256/) (sha256)

Hashes the given input and returns its SHA256 checksum encoded to a hexadecimal string.

## css[](https://gohugo.io/quick-reference/functions/#css)

Use these functions to work with CSS and Sass files.

[css.PostCSS](https://gohugo.io/functions/css/postcss/) (postCSS)

Processes the given resource with PostCSS using any PostCSS plugin.

[css.Sass](https://gohugo.io/functions/css/sass/) (toCSS)

Transpiles Sass to CSS.

[css.TailwindCSS](https://gohugo.io/functions/css/tailwindcss/)

Processes the given resource with the Tailwind CSS CLI.

## data[](https://gohugo.io/quick-reference/functions/#data)

Use these functions to read local or remote data files.

[data.GetCSV](https://gohugo.io/functions/data/getcsv/) (getCSV)

Returns an array of arrays from a local or remote CSV file, or an error if the file does not exist.

[data.GetJSON](https://gohugo.io/functions/data/getjson/) (getJSON)

Returns a JSON object from a local or remote JSON file, or an error if the file does not exist.

## debug[](https://gohugo.io/quick-reference/functions/#debug)

Use these functions to debug your templates.

[debug.Dump](https://gohugo.io/functions/debug/dump/)

Returns an object dump as a string.

[debug.Timer](https://gohugo.io/functions/debug/timer/)

Creates a named timer that reports elapsed time to the console.

## diagrams[](https://gohugo.io/quick-reference/functions/#diagrams)

Use these functions to render diagrams.

[diagrams.Goat](https://gohugo.io/functions/diagrams/goat/)

Converts ASCII art to an SVG diagram, returning a GoAT diagram object.

## encoding[](https://gohugo.io/quick-reference/functions/#encoding)

Use these functions to encode and decode data.

[encoding.Base64Decode](https://gohugo.io/functions/encoding/base64decode/) (base64Decode)

Returns the base64 decoding of the given content.

[encoding.Base64Encode](https://gohugo.io/functions/encoding/base64encode/) (base64Encode)

Returns the base64 decoding of the given content.

[encoding.Jsonify](https://gohugo.io/functions/encoding/jsonify/) (jsonify)

Encodes the given object to JSON.

## fmt[](https://gohugo.io/quick-reference/functions/#fmt)

Use these functions to print strings within a template or to print messages to the terminal.

[fmt.Errorf](https://gohugo.io/functions/fmt/errorf/) (errorf)

Log an ERROR from a template.

[fmt.Erroridf](https://gohugo.io/functions/fmt/erroridf/) (erroridf)

Log a suppressible ERROR from a template.

[fmt.Print](https://gohugo.io/functions/fmt/print/) (print)

Prints the default representation of the given arguments using the standard `fmt.Print` function.

[fmt.Printf](https://gohugo.io/functions/fmt/printf/) (printf)

Formats a string using the standard `fmt.Sprintf` function.

[fmt.Println](https://gohugo.io/functions/fmt/println/) (println)

Prints the default representation of the given argument using the standard `fmt.Print` function and enforces a line break.

[fmt.Warnf](https://gohugo.io/functions/fmt/warnf/) (warnf)

Log a WARNING from a template.

[fmt.Warnidf](https://gohugo.io/functions/fmt/warnidf/) (warnidf)

Log a suppressible WARNING from a template.

## global[](https://gohugo.io/quick-reference/functions/#global)

Use these global functions to access page and site data.

[page](https://gohugo.io/functions/global/page/)

Provides global access to a Page object.

[site](https://gohugo.io/functions/global/site/)

Provides global access to the current Site object.

## go template[](https://gohugo.io/quick-reference/functions/#go-template)

These are the functions, operators, and statements provided by Go's [text/template](https://pkg.go.dev/text/template) package.

[and](https://gohugo.io/functions/go-template/and/)

Returns the first falsy argument. If all arguments are truthy, returns the last argument.

[block](https://gohugo.io/functions/go-template/block/)

Defines a template and executes it in place.

[break](https://gohugo.io/functions/go-template/break/)

Used with the range statement, stops the innermost iteration and bypasses all remaining iterations.

[continue](https://gohugo.io/functions/go-template/continue/)

Used with the range statement, stops the innermost iteration and continues to the next iteration.

[define](https://gohugo.io/functions/go-template/define/)

Defines a template.

[else](https://gohugo.io/functions/go-template/else/)

Begins an alternate block for if, with, and range statements.

[end](https://gohugo.io/functions/go-template/end/)

Terminates if, with, range, block, and define statements.

[if](https://gohugo.io/functions/go-template/if/)

Executes the block if the expression is truthy.

[len](https://gohugo.io/functions/go-template/len/)

Returns the length of a string, slice, map, or collection.

[not](https://gohugo.io/functions/go-template/not/)

Returns the boolean negation of its single argument.

[or](https://gohugo.io/functions/go-template/or/)

Returns the first truthy argument. If all arguments are falsy, returns the last argument.

[range](https://gohugo.io/functions/go-template/range/)

Iterates over a non-empty collection, binds context (the dot) to successive elements, and executes the block.

[return](https://gohugo.io/functions/go-template/return/)

Used within partial templates, terminates template execution and returns the given value, if any.

[template](https://gohugo.io/functions/go-template/template/)

Executes the given template, optionally passing context.

[try](https://gohugo.io/functions/go-template/try/)

Returns a TryValue object after evaluating the given expression.

[urlquery](https://gohugo.io/functions/go-template/urlquery/)

Returns the escaped value of the textual representation of its arguments in a form suitable for embedding in a URL query.

[with](https://gohugo.io/functions/go-template/with/)

Binds context (the dot) to the expression and executes the block if expression is truthy.

## hash[](https://gohugo.io/quick-reference/functions/#hash)

Use these functions to create non-cryptographic hashes.

[hash.FNV32a](https://gohugo.io/functions/hash/fnv32a/)

Returns the 32-bit FNV (Fowler–Noll–Vo) non-cryptographic hash of the given string.

[hash.XxHash](https://gohugo.io/functions/hash/xxhash/) (xxhash)

Returns the 64-bit xxHash non-cryptographic hash of the given string.

## hugo[](https://gohugo.io/quick-reference/functions/#hugo)

Use these functions to access information about the Hugo application and the current environment.

[hugo.BuildDate](https://gohugo.io/functions/hugo/builddate/)

Returns the compile date of the Hugo binary.

[hugo.CommitHash](https://gohugo.io/functions/hugo/commithash/)

Returns the Git commit hash of the Hugo binary.

[hugo.Deps](https://gohugo.io/functions/hugo/deps/)

Returns a slice of project dependencies, either Hugo Modules or local theme components.

[hugo.Environment](https://gohugo.io/functions/hugo/environment/)

Returns the current running environment.

[hugo.Generator](https://gohugo.io/functions/hugo/generator/)

Renders an HTML meta element identifying the software that generated the site.

[hugo.GoVersion](https://gohugo.io/functions/hugo/goversion/)

Returns the Go version used to compile the Hugo binary

[hugo.IsDevelopment](https://gohugo.io/functions/hugo/isdevelopment/)

Reports whether the current running environment is "development".

[hugo.IsExtended](https://gohugo.io/functions/hugo/isextended/)

Reports whether the Hugo binary is the extended version.

[hugo.IsMultihost](https://gohugo.io/functions/hugo/ismultihost/)

Reports whether each configured language has a unique base URL.

[hugo.IsMultilingual](https://gohugo.io/functions/hugo/ismultilingual/)

Reports whether there are two or more configured languages.

[hugo.IsProduction](https://gohugo.io/functions/hugo/isproduction/)

Reports whether the current running environment is "production".

[hugo.IsServer](https://gohugo.io/functions/hugo/isserver/)

Reports whether the built-in development server is running.

[hugo.Store](https://gohugo.io/functions/hugo/store/)

Returns a global, persistent "scratch pad" to store and manipulate data.

[hugo.Version](https://gohugo.io/functions/hugo/version/)

Returns the current version of the Hugo binary.

[hugo.WorkingDir](https://gohugo.io/functions/hugo/workingdir/)

Returns the project working directory.

## images[](https://gohugo.io/quick-reference/functions/#images)

Use these functions to create an image filter, apply an image filter to an image, and to retrieve image information.

[images.AutoOrient](https://gohugo.io/functions/images/autoorient/)

Returns an image filter that rotates and flips an image as needed per its EXIF orientation tag.

[images.Brightness](https://gohugo.io/functions/images/brightness/)

Returns an image filter that changes the brightness of an image.

[images.ColorBalance](https://gohugo.io/functions/images/colorbalance/)

Returns an image filter that changes the color balance of an image.

[images.Colorize](https://gohugo.io/functions/images/colorize/)

Returns an image filter that produces a colorized version of an image.

[images.Config](https://gohugo.io/functions/images/config/)

Returns an image.Config structure from the image at the specified path, relative to the working directory.

[images.Contrast](https://gohugo.io/functions/images/contrast/)

Returns an image filter that changes the contrast of an image.

[images.Dither](https://gohugo.io/functions/images/dither/)

Returns an image filter that dithers an image.

[images.Filter](https://gohugo.io/functions/images/filter/)

Applies one or more image filters to the given image resource.

[images.Gamma](https://gohugo.io/functions/images/gamma/)

Returns an image filter that performs gamma correction on an image.

[images.GaussianBlur](https://gohugo.io/functions/images/gaussianblur/)

Returns an image filter that applies a gaussian blur to an image.

[images.Grayscale](https://gohugo.io/functions/images/grayscale/)

Returns an image filter that produces a grayscale version of an image.

[images.Hue](https://gohugo.io/functions/images/hue/)

Returns an image filter that rotates the hue of an image.

[images.Invert](https://gohugo.io/functions/images/invert/)

Returns an image filter that negates the colors of an image.

[images.Mask](https://gohugo.io/functions/images/mask/)

Returns an image filter that applies a mask to the source image.

[images.Opacity](https://gohugo.io/functions/images/opacity/)

Returns an image filter that changes the opacity of an image.

[images.Overlay](https://gohugo.io/functions/images/overlay/)

Returns an image filter that overlays the source image at the given coordinates, relative to the upper left corner.

[images.Padding](https://gohugo.io/functions/images/padding/)

Returns an image filter that resizes the image canvas without resizing the image.

[images.Pixelate](https://gohugo.io/functions/images/pixelate/)

Returns an image filter that applies a pixelation effect to an image.

[images.Process](https://gohugo.io/functions/images/process/)

Returns an image filter that processes the given image using the given specification.

[images.QR](https://gohugo.io/functions/images/qr/)

Encodes the given text into a QR code using the specified options, returning an image resource.

[images.Saturation](https://gohugo.io/functions/images/saturation/)

Returns an image filter that changes the saturation of an image.

[images.Sepia](https://gohugo.io/functions/images/sepia/)

Returns an image filter that produces a sepia-toned version of an image.

[images.Sigmoid](https://gohugo.io/functions/images/sigmoid/)

Returns an image filter that changes the contrast of an image using a sigmoidal function.

[images.Text](https://gohugo.io/functions/images/text/)

Returns an image filter that adds text to an image.

[images.UnsharpMask](https://gohugo.io/functions/images/unsharpmask/)

Returns an image filter that sharpens an image.

## inflect[](https://gohugo.io/quick-reference/functions/#inflect)

These functions provide word inflection features such as singularization and pluralization of English nouns.

[inflect.Humanize](https://gohugo.io/functions/inflect/humanize/) (humanize)

Returns the humanized version of the input with the first letter capitalized.

[inflect.Pluralize](https://gohugo.io/functions/inflect/pluralize/) (pluralize)

Pluralizes the given word according to a set of common English pluralization rules.

[inflect.Singularize](https://gohugo.io/functions/inflect/singularize/) (singularize)

Singularizes the given word according to a set of common English singularization rules.

## js[](https://gohugo.io/quick-reference/functions/#js)

Use these functions to work with JavaScript and TypeScript files.

[js.Build](https://gohugo.io/functions/js/build/)

Bundles, transpiles, tree shakes, and minifies JavaScript resources.

[js.Batch](https://gohugo.io/functions/js/batch/)

Build JavaScript bundle groups with global code splitting and flexible hooks/runners setup.

[js.Babel](https://gohugo.io/functions/js/babel/) (babel or /hugo-pipes/babel/)

Compiles the given JavaScript resource with Babel.

## lang[](https://gohugo.io/quick-reference/functions/#lang)

Use these functions to adapt your site to meet language and regional requirements.

[lang.FormatAccounting](https://gohugo.io/functions/lang/formataccounting/)

Returns a currency representation of a number for the given currency and precision for the current language and region in accounting notation.

[lang.FormatCurrency](https://gohugo.io/functions/lang/formatcurrency/)

Returns a currency representation of a number for the given currency and precision for the current language and region.

[lang.FormatNumber](https://gohugo.io/functions/lang/formatnumber/)

Returns a numeric representation of a number with the given precision for the current language and region.

[lang.FormatNumberCustom](https://gohugo.io/functions/lang/formatnumbercustom/)

Returns a numeric representation of a number with the given precision using negative, decimal, and grouping options.

[lang.FormatPercent](https://gohugo.io/functions/lang/formatpercent/)

Returns a percentage representation of a number with the given precision for the current language and region.

[lang.Merge](https://gohugo.io/functions/lang/merge/)

Merge missing translations from other languages.

[lang.Translate](https://gohugo.io/functions/lang/translate/) (T or i18n)

Translates a string using the translation tables in the i18n directory.

## math[](https://gohugo.io/quick-reference/functions/#math)

Use these functions to perform mathematical operations.

[math.Abs](https://gohugo.io/functions/math/abs/)

Returns the absolute value of the given number.

[math.Acos](https://gohugo.io/functions/math/acos/)

Returns the arccosine, in radians, of the given number.

[math.Add](https://gohugo.io/functions/math/add/) (add)

Adds two or more numbers.

[math.Asin](https://gohugo.io/functions/math/asin/)

Returns the arcsine, in radians, of the given number.

[math.Atan](https://gohugo.io/functions/math/atan/)

Returns the arctangent, in radians, of the given number.

[math.Atan2](https://gohugo.io/functions/math/atan2/)

Returns the arctangent, in radians, of the given number pair, determining the correct quadrant from their signs.

[math.Ceil](https://gohugo.io/functions/math/ceil/)

Returns the least integer value greater than or equal to the given number.

[math.Cos](https://gohugo.io/functions/math/cos/)

Returns the cosine of the given radian number.

[math.Counter](https://gohugo.io/functions/math/counter/)

Increments and returns a global counter.

[math.Div](https://gohugo.io/functions/math/div/) (div)

Divides the first number by one or more numbers.

[math.Floor](https://gohugo.io/functions/math/floor/)

Returns the greatest integer value less than or equal to the given number.

[math.Log](https://gohugo.io/functions/math/log/)

Returns the natural logarithm of the given number.

[math.Max](https://gohugo.io/functions/math/max/)

Returns the greater of all numbers. Accepts scalars, slices, or both.

[math.Min](https://gohugo.io/functions/math/min/)

Returns the smaller of all numbers. Accepts scalars, slices, or both.

[math.Mod](https://gohugo.io/functions/math/mod/) (mod)

Returns the modulus of two integers.

[math.ModBool](https://gohugo.io/functions/math/modbool/) (modBool)

Reports whether the modulus of two integers equals 0.

[math.Mul](https://gohugo.io/functions/math/mul/) (mul)

Multiplies two or more numbers.

[math.Pi](https://gohugo.io/functions/math/pi/)

Returns the mathematical constant pi.

[math.Pow](https://gohugo.io/functions/math/pow/) (pow)

Returns the first number raised to the power of the second number.

[math.Product](https://gohugo.io/functions/math/product/)

Returns the product of all numbers. Accepts scalars, slices, or both.

[math.Rand](https://gohugo.io/functions/math/rand/)

Returns a pseudo-random number in the half-open interval \[0.0, 1.0).

[math.Round](https://gohugo.io/functions/math/round/)

Returns the nearest integer, rounding half away from zero.

[math.Sin](https://gohugo.io/functions/math/sin/)

Returns the sine of the given radian number.

[math.Sqrt](https://gohugo.io/functions/math/sqrt/)

Returns the square root of the given number.

[math.Sub](https://gohugo.io/functions/math/sub/) (sub)

Subtracts one or more numbers from the first number.

[math.Sum](https://gohugo.io/functions/math/sum/)

Returns the sum of all numbers. Accepts scalars, slices, or both.

[math.Tan](https://gohugo.io/functions/math/tan/)

Returns the tangent of the given radian number.

[math.ToDegrees](https://gohugo.io/functions/math/todegrees/)

ToDegrees converts radians into degrees.

[math.ToRadians](https://gohugo.io/functions/math/toradians/)

ToRadians converts degrees into radians.

## openapi3[](https://gohugo.io/quick-reference/functions/#openapi3)

Use these functions to work with OpenAPI 3 definitions.

[openapi3.Unmarshal](https://gohugo.io/functions/openapi3/unmarshal/)

Unmarshals the given resource into an OpenAPI 3 document.

## os[](https://gohugo.io/quick-reference/functions/#os)

Use these functions to interact with the operating system.

[os.FileExists](https://gohugo.io/functions/os/fileexists/) (fileExists)

Reports whether the file or directory exists.

[os.Getenv](https://gohugo.io/functions/os/getenv/) (getenv)

Returns the value of an environment variable, or an empty string if the environment variable is not set.

[os.ReadDir](https://gohugo.io/functions/os/readdir/) (readDir)

Returns an array of FileInfo structures sorted by file name, one element for each directory entry.

[os.ReadFile](https://gohugo.io/functions/os/readfile/) (readFile)

Returns the contents of a file.

[os.Stat](https://gohugo.io/functions/os/stat/)

Returns a FileInfo structure describing a file or directory.

## partials[](https://gohugo.io/quick-reference/functions/#partials)

Use these functions to call partial templates.

[partials.Include](https://gohugo.io/functions/partials/include/) (partial)

Executes the given partial template, optionally passing context. If the partial template contains a return statement, returns the given value, else returns the rendered output.

[partials.IncludeCached](https://gohugo.io/functions/partials/includecached/) (partialCached)

Executes the given template and caches the result, optionally passing context. If the partial template contains a return statement, returns the given value, else returns the rendered output.

## path[](https://gohugo.io/quick-reference/functions/#path)

Use these functions to work with file paths.

[path.Base](https://gohugo.io/functions/path/base/)

Replaces path separators with slashes (`/`) and returns the last element of the given path.

[path.BaseName](https://gohugo.io/functions/path/basename/)

Replaces path separators with slashes (`/`) and returns the last element of the given path, removing the extension if present.

[path.Clean](https://gohugo.io/functions/path/clean/)

Replaces path separators with slashes (`/`) and returns the shortest path name equivalent to the given path.

[path.Dir](https://gohugo.io/functions/path/dir/)

Replaces path separators with slashes (/) and returns all but the last element of the given path.

[path.Ext](https://gohugo.io/functions/path/ext/)

Replaces path separators with slashes (`/`) and returns the file name extension of the given path.

[path.Join](https://gohugo.io/functions/path/join/)

Replaces path separators with slashes (`/`), joins the given path elements into a single path, and returns the shortest path name equivalent to the result.

[path.Split](https://gohugo.io/functions/path/split/)

Replaces path separators with slashes (`/`) and splits the resulting path immediately following the final slash, separating it into a directory and file name component.

## reflect[](https://gohugo.io/quick-reference/functions/#reflect)

Use these functions to determine a value's data type.

[reflect.IsMap](https://gohugo.io/functions/reflect/ismap/)

Reports whether the given value is a map.

[reflect.IsSlice](https://gohugo.io/functions/reflect/isslice/)

Reports whether the given value is a slice.

## resources[](https://gohugo.io/quick-reference/functions/#resources)

Use these functions to work with resources.

[resources.Babel](https://gohugo.io/functions/resources/babel/)

Compiles the given JavaScript resource with Babel.

[resources.ByType](https://gohugo.io/functions/resources/bytype/)

Returns a collection of global resources of the given media type, or nil if none found.

[resources.Concat](https://gohugo.io/functions/resources/concat/)

Returns a concatenated slice of resources.

[resources.Copy](https://gohugo.io/functions/resources/copy/)

Copies the given resource to the target path.

[resources.ExecuteAsTemplate](https://gohugo.io/functions/resources/executeastemplate/)

Returns a resource created from a Go template, parsed and executed with the given context.

[resources.Fingerprint](https://gohugo.io/functions/resources/fingerprint/) (fingerprint)

Cryptographically hashes the content of the given resource.

[resources.FromString](https://gohugo.io/functions/resources/fromstring/)

Returns a resource created from a string.

[resources.Get](https://gohugo.io/functions/resources/get/)

Returns a global resource from the given path, or nil if none found.

[resources.GetMatch](https://gohugo.io/functions/resources/getmatch/)

Returns the first global resource from paths matching the given glob pattern, or nil if none found.

[resources.GetRemote](https://gohugo.io/functions/resources/getremote/)

Returns a remote resource from the given URL, or nil if none found.

[resources.Match](https://gohugo.io/functions/resources/match/)

Returns a collection of global resources from paths matching the given glob pattern, or nil if none found.

[resources.Minify](https://gohugo.io/functions/resources/minify/) (minify)

Minifies the given resource.

[resources.PostCSS](https://gohugo.io/functions/resources/postcss/)

Processes the given resource with PostCSS using any PostCSS plugin.

[resources.PostProcess](https://gohugo.io/functions/resources/postprocess/)

Processes the given resource after the build.

[resources.ToCSS](https://gohugo.io/functions/resources/tocss/)

Transpiles Sass to CSS.

## safe[](https://gohugo.io/quick-reference/functions/#safe)

Use these functions to declare a value as safe in the context of Go's [html/template](https://pkg.go.dev/html/template) package.

[safe.CSS](https://gohugo.io/functions/safe/css/) (safeCSS)

Declares the given string as a safe CSS string.

[safe.HTML](https://gohugo.io/functions/safe/html/) (safeHTML)

Declares the given string as a safeHTML string.

[safe.HTMLAttr](https://gohugo.io/functions/safe/htmlattr/) (safeHTMLAttr)

Declares the given key-value pair as a safe HTML attribute.

[safe.JS](https://gohugo.io/functions/safe/js/) (safeJS)

Declares the given string as a safe JavaScript expression.

[safe.JSStr](https://gohugo.io/functions/safe/jsstr/) (safeJSStr)

Declares the given string as a safe JavaScript string.

[safe.URL](https://gohugo.io/functions/safe/url/) (safeURL)

Declares the given string as a safe URL or URL substring.

## strings[](https://gohugo.io/quick-reference/functions/#strings)

Use these functions to work with strings.

[strings.Chomp](https://gohugo.io/functions/strings/chomp/) (chomp)

Returns the given string, removing all trailing newline characters and carriage returns.

[strings.Contains](https://gohugo.io/functions/strings/contains/)

Reports whether the given string contains the given substring.

[strings.ContainsAny](https://gohugo.io/functions/strings/containsany/)

Reports whether the given string contains any character within the given set.

[strings.ContainsNonSpace](https://gohugo.io/functions/strings/containsnonspace/)

Reports whether the given string contains any non-space characters as defined by Unicode.

[strings.Count](https://gohugo.io/functions/strings/count/)

Returns the number of non-overlapping instances of the given substring within the given string.

[strings.CountRunes](https://gohugo.io/functions/strings/countrunes/) (countrunes)

Returns the number of runes in the given string excluding whitespace.

[strings.CountWords](https://gohugo.io/functions/strings/countwords/) (countwords)

Returns the number of words in the given string.

[strings.Diff](https://gohugo.io/functions/strings/diff/)

Returns an anchored diff of the two texts OLD and NEW in the unified diff format. If OLD and NEW are identical, returns an empty string.

[strings.FindRE](https://gohugo.io/functions/strings/findre/) (findRE)

Returns a slice of strings that match the regular expression.

[strings.FindRESubmatch](https://gohugo.io/functions/strings/findresubmatch/) (findRESubmatch)

Returns a slice of all successive matches of the regular expression. Each element is a slice of strings holding the text of the leftmost match of the regular expression and the matches, if any, of its subexpressions.

[strings.FirstUpper](https://gohugo.io/functions/strings/firstupper/)

Returns the given string, capitalizing the first character.

[strings.HasPrefix](https://gohugo.io/functions/strings/hasprefix/) (hasPrefix)

Reports whether the given string begins with the given prefix.

[strings.HasSuffix](https://gohugo.io/functions/strings/hassuffix/) (hasSuffix)

Reports whether the given string ends with the given suffix.

[strings.Repeat](https://gohugo.io/functions/strings/repeat/)

Returns a new string consisting of zero or more copies of another string.

[strings.Replace](https://gohugo.io/functions/strings/replace/) (replace)

Returns a copy of INPUT, replacing all occurrences of OLD with NEW.

[strings.ReplaceRE](https://gohugo.io/functions/strings/replacere/) (replaceRE)

Returns a copy of INPUT, replacing all occurrences of a regular expression with a replacement pattern.

[strings.RuneCount](https://gohugo.io/functions/strings/runecount/)

Returns the number of runes in the given string.

[strings.SliceString](https://gohugo.io/functions/strings/slicestring/) (slicestr)

Returns a substring of the given string, beginning with the start position and ending before the end position.

[strings.Split](https://gohugo.io/functions/strings/split/) (split)

Returns a slice of strings by splitting the given string by a delimiter.

[strings.Substr](https://gohugo.io/functions/strings/substr/) (substr)

Returns a substring of the given string, beginning with the start position and ending after the given length.

[strings.Title](https://gohugo.io/functions/strings/title/) (title)

Returns the given string, converting it to title case.

[strings.ToLower](https://gohugo.io/functions/strings/tolower/) (lower)

Returns the given string, converting all characters to lowercase.

[strings.ToUpper](https://gohugo.io/functions/strings/toupper/) (upper)

Returns the given string, converting all characters to uppercase.

[strings.Trim](https://gohugo.io/functions/strings/trim/) (trim)

Returns the given string, removing leading and trailing characters specified in the cutset.

[strings.TrimLeft](https://gohugo.io/functions/strings/trimleft/)

Returns the given string, removing leading characters specified in the cutset.

[strings.TrimPrefix](https://gohugo.io/functions/strings/trimprefix/)

Returns the given string, removing the prefix from the beginning of the string.

[strings.TrimRight](https://gohugo.io/functions/strings/trimright/)

Returns the given string, removing trailing characters specified in the cutset.

[strings.TrimSpace](https://gohugo.io/functions/strings/trimspace/)

Returns the given string, removing leading and trailing whitespace as defined by Unicode.

[strings.TrimSuffix](https://gohugo.io/functions/strings/trimsuffix/)

Returns the given string, removing the suffix from the end of the string.

[strings.Truncate](https://gohugo.io/functions/strings/truncate/) (truncate)

Returns the given string, truncating it to a maximum length without cutting words or leaving unclosed HTML tags.

## templates[](https://gohugo.io/quick-reference/functions/#templates)

Use these functions to query the template system.

[templates.Defer](https://gohugo.io/functions/templates/defer/)

Defer execution of a template until after all sites and output formats have been rendered.

[templates.Exists](https://gohugo.io/functions/templates/exists/)

Reports whether a template file exists under the given path relative to the layouts directory.

## time[](https://gohugo.io/quick-reference/functions/#time)

Use these functions to work with time values.

[time.AsTime](https://gohugo.io/functions/time/astime/) (time)

Returns the given string representation of a date/time value as a time.Time value.

[time.Duration](https://gohugo.io/functions/time/duration/) (duration)

Returns a time.Duration value using the given time unit and number.

[time.Format](https://gohugo.io/functions/time/format/) (dateFormat)

Returns the given date/time as a formatted and localized string.

[time.Now](https://gohugo.io/functions/time/now/) (now)

Returns the current local time.

[time.ParseDuration](https://gohugo.io/functions/time/parseduration/)

Returns a time.Duration value by parsing the given duration string.

## transform[](https://gohugo.io/quick-reference/functions/#transform)

Use these functions to transform values from one format to another.

[transform.CanHighlight](https://gohugo.io/functions/transform/canhighlight/)

Reports whether the given code language is supported by the Chroma highlighter.

[transform.Emojify](https://gohugo.io/functions/transform/emojify/) (emojify)

Runs a string through the Emoji emoticons processor.

[transform.Highlight](https://gohugo.io/functions/transform/highlight/) (highlight)

Renders code with a syntax highlighter.

[transform.HighlightCodeBlock](https://gohugo.io/functions/transform/highlightcodeblock/)

Highlights code received in context within a code block render hook.

[transform.HTMLEscape](https://gohugo.io/functions/transform/htmlescape/) (htmlEscape)

Returns the given string, escaping special characters by replacing them with HTML entities.

[transform.HTMLUnescape](https://gohugo.io/functions/transform/htmlunescape/) (htmlUnescape)

Returns the given string, replacing each HTML entity with its corresponding character.

[transform.Markdownify](https://gohugo.io/functions/transform/markdownify/) (markdownify)

Renders Markdown to HTML.

[transform.Plainify](https://gohugo.io/functions/transform/plainify/) (plainify)

Returns a string with all HTML tags removed.

[transform.Remarshal](https://gohugo.io/functions/transform/remarshal/)

Marshals a string of serialized data, or a map, into a string of serialized data in the specified format.

[transform.ToMath](https://gohugo.io/functions/transform/tomath/)

Renders mathematical equations and expressions written in the LaTeX markup language.

[transform.Unmarshal](https://gohugo.io/functions/transform/unmarshal/) (unmarshal)

Parses serialized data and returns a map or an array. Supports CSV, JSON, TOML, YAML, and XML.

[transform.XMLEscape](https://gohugo.io/functions/transform/xmlescape/)

Returns the given string, removing disallowed characters then escaping the result to its XML equivalent.

## urls[](https://gohugo.io/quick-reference/functions/#urls)

Use these functions to work with URLs.

[urls.AbsLangURL](https://gohugo.io/functions/urls/abslangurl/) (absLangURL)

Returns an absolute URL with a language prefix, if any.

[urls.AbsURL](https://gohugo.io/functions/urls/absurl/) (absURL)

Returns an absolute URL.

[urls.Anchorize](https://gohugo.io/functions/urls/anchorize/) (anchorize)

Returns the given string, sanitized for usage in an HTML id attribute.

[urls.JoinPath](https://gohugo.io/functions/urls/joinpath/)

Joins the provided elements into a URL string and cleans the result of any ./ or ../ elements. If the argument list is empty, JoinPath returns an empty string.

[urls.Parse](https://gohugo.io/functions/urls/parse/)

Parses a URL into a URL structure.

[urls.Ref](https://gohugo.io/functions/urls/ref/) (ref)

Returns the absolute permalink to a page at the given path.

[urls.RelLangURL](https://gohugo.io/functions/urls/rellangurl/) (relLangURL)

Returns a relative URL with a language prefix, if any.

[urls.RelRef](https://gohugo.io/functions/urls/relref/) (relref)

Returns the relative permalink to a page at the given path.

[urls.RelURL](https://gohugo.io/functions/urls/relurl/) (relURL)

Returns a relative URL.

[urls.URLize](https://gohugo.io/functions/urls/urlize/) (urlize)

Returns the given string, sanitized for usage in a URL.
