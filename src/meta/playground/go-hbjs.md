# Handlbars in Go

<details><summary>Table of Contents</summary>

- [Quick Start](#readme-quick-start)
- [Correct Usage](#readme-correct-usage)
- [Context](#readme-context)
- [HTML Escaping](#readme-html-escaping)
- [Helpers](#readme-helpers)

  - [Template Helpers](#readme-template-helpers)
  - [Built-In Helpers](#readme-built-in-helpers)

    - [The `if` block helper](#readme-the-if-block-helper)
    - [The `unless` block helper](#readme-the-unless-block-helper)
    - [The `each` block helper](#readme-the-each-block-helper)
    - [The `with` block helper](#readme-the-with-block-helper)
    - [The `lookup` helper](#readme-the-lookup-helper)
    - [The `log` helper](#readme-the-log-helper)
    - [The `equal` helper](#readme-the-equal-helper)
  - [Block Helpers](#readme-block-helpers)

    - [Block Evaluation](#readme-block-evaluation)
    - [Conditional](#readme-conditional)
    - [Else Block Evaluation](#readme-else-block-evaluation)
    - [Block Parameters](#readme-block-parameters)
  - [Helper Parameters](#readme-helper-parameters)

    - [Automatic conversion](#readme-automatic-conversion)
  - [Options Argument](#readme-options-argument)

    - [Context Values](#readme-context-values)
    - [Helper Hash Arguments](#readme-helper-hash-arguments)
    - [Private Data](#readme-private-data)
  - [Utilites](#readme-utilites)

    - [`Str()`](#readme-str)
    - [`IsTrue()`](#readme-istrue)
- [Context Functions](#readme-context-functions)
- [Partials](#readme-partials)

  - [Template Partials](#readme-template-partials)
  - [Global Partials](#readme-global-partials)
  - [Dynamic Partials](#readme-dynamic-partials)
  - [Partial Contexts](#readme-partial-contexts)
  - [Partial Parameters](#readme-partial-parameters)
- [Utility Functions](#readme-utility-functions)
- [Mustache](#readme-mustache)
- [Limitations](#readme-limitations)
- [Handlebars Lexer](#readme-handlebars-lexer)
- [Handlebars Parser](#readme-handlebars-parser)
- [Test](#readme-test)
- [References](#readme-references)
- [Others Implementations](#readme-others-implementations)

</details>

#### Quick Start

```bash
$ go get github.com/aymerick/raymond
```

The quick and dirty way of rendering a handlebars template:

```go
package main

import (
    "fmt"

    "github.com/aymerick/raymond"
)

func main() {
    tpl := `<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
`

    ctx := map[string]string{
        "title": "My New Post",
        "body":  "This is my first post!",
    }

    result, err := raymond.Render(tpl, ctx)
    if err != nil {
        panic("Please report a bug :)")
    }

    fmt.Print(result)
}
```

Displays:

```html
<div class="entry">
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
```

Please note that the template will be parsed everytime you call `Render()` function. So you probably want to read the next section.

#### Correct Usage

To avoid parsing a template several times, use the `Parse()` and `Exec()` functions:

```go
package main

import (
    "fmt"

    "github.com/aymerick/raymond"
)

func main() {
    source := `<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
`

    ctxList := []map[string]string{
        {
            "title": "My New Post",
            "body":  "This is my first post!",
        },
        {
            "title": "Here is another post",
            "body":  "This is my second post!",
        },
    }

    // parse template
    tpl, err := raymond.Parse(source)
    if err != nil {
        panic(err)
    }

    for _, ctx := range ctxList {
        // render template
        result, err := tpl.Exec(ctx)
        if err != nil {
            panic(err)
        }

        fmt.Print(result)
    }
}

```

Displays:

```html
<div class="entry">
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
<div class="entry">
  <h1>Here is another post</h1>
  <div class="body">
    This is my second post!
  </div>
</div>
```

You can use `MustParse()` and `MustExec()` functions if you don't want to deal with errors:

```go
// parse template
tpl := raymond.MustParse(source)

// render template
result := tpl.MustExec(ctx)
```

#### Context

The rendering context can contain any type of values, including `array`, `slice`, `map`, `struct` and `func`.

When using structs, be warned that only exported fields are accessible. However you can access exported fields in template with their lowercase names. For example, both `{{author.firstName}}` and `{{Author.FirstName}}` references give the same result, as long as `Author` and `FirstName` are exported struct fields.

More, you can use the `handlebars` struct tag to specify a template variable name different from the struct field name.

```go
package main

import (
  "fmt"

  "github.com/aymerick/raymond"
)

func main() {
    source := `<div class="post">
  <h1>By {{author.firstName}} {{author.lastName}}</h1>
  <div class="body">{{body}}</div>

  <h1>Comments</h1>

  {{#each comments}}
  <h2>By {{author.firstName}} {{author.lastName}}</h2>
  <div class="body">{{content}}</div>
  {{/each}}
</div>`

    type Person struct {
        FirstName string
        LastName  string
    }

    type Comment struct {
        Author Person
        Body   string `handlebars:"content"`
    }

    type Post struct {
        Author   Person
        Body     string
        Comments []Comment
    }

    ctx := Post{
        Person{"Jean", "Valjean"},
        "Life is difficult",
        []Comment{
            Comment{
                Person{"Marcel", "Beliveau"},
                "LOL!",
            },
        },
    }

    output := raymond.MustRender(source, ctx)

    fmt.Print(output)
}
```

Output:

```html
<div class="post">
  <h1>By Jean Valjean</h1>
  <div class="body">Life is difficult</div>

  <h1>Comments</h1>

  <h2>By Marcel Beliveau</h2>
  <div class="body">LOL!</div>
</div>
```

#### HTML Escaping

By default, the result of a mustache expression is HTML escaped. Use the triple mustache `{{{` to output unescaped values.

```go
source := `<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{{body}}}
  </div>
</div>
`

ctx := map[string]string{
    "title": "All about <p> Tags",
    "body":  "<p>This is a post about &lt;p&gt; tags</p>",
}

tpl := raymond.MustParse(source)
result := tpl.MustExec(ctx)

fmt.Print(result)
```

Output:

```html
<div class="entry">
  <h1>All about &lt;p&gt; Tags</h1>
  <div class="body">
    <p>This is a post about &lt;p&gt; tags</p>
  </div>
</div>
```

When returning HTML from a helper, you should return a `SafeString` if you don't want it to be escaped by default. When using `SafeString` all unknown or unsafe data should be manually escaped with the `Escape` method.

```go
raymond.RegisterHelper("link", func(url, text string) raymond.SafeString {
    return raymond.SafeString("<a href='" + raymond.Escape(url) + "'>" + raymond.Escape(text) + "</a>")
})

tpl := raymond.MustParse("{{link url text}}")

ctx := map[string]string{
    "url":  "http://www.aymerick.com/",
    "text": "This is a <em>cool</em> website",
}

result := tpl.MustExec(ctx)
fmt.Print(result)
```

Output:

```html
<a href='http://www.aymerick.com/'>This is a &lt;em&gt;cool&lt;/em&gt; website</a>
```

#### Helpers

Helpers can be accessed from any context in a template. You can register a helper with the `RegisterHelper` function.

For example:

```html
<div class="post">
  <h1>By {{fullName author}}</h1>
  <div class="body">{{body}}</div>

  <h1>Comments</h1>

  {{#each comments}}
  <h2>By {{fullName author}}</h2>
  <div class="body">{{body}}</div>
  {{/each}}
</div>
```

With this context and helper:

```go
ctx := map[string]interface{}{
    "author": map[string]string{"firstName": "Jean", "lastName": "Valjean"},
    "body":   "Life is difficult",
    "comments": []map[string]interface{}{{
        "author": map[string]string{"firstName": "Marcel", "lastName": "Beliveau"},
        "body":   "LOL!",
    }},
}

raymond.RegisterHelper("fullName", func(person map[string]string) string {
    return person["firstName"] + " " + person["lastName"]
})
```

Outputs:

```
<div class="post">
  <h1>By Jean Valjean</h1>
  <div class="body">Life is difficult</div>

  <h1>Comments</h1>

  <h2>By Marcel Beliveau</h2>
  <div class="body">LOL!</div>
</div>
```

Helper arguments can be any type.

The following example uses structs instead of maps and produces the same output as the previous one:

```
<div class="post">
  <h1>By {{fullName author}}</h1>
  <div class="body">{{body}}</div>

  <h1>Comments</h1>

  {{#each comments}}
  <h2>By {{fullName author}}</h2>
  <div class="body">{{body}}</div>
  {{/each}}
</div>
```

With this context and helper:

```
type Post struct {
    Author   Person
    Body     string
    Comments []Comment
}

type Person struct {
    FirstName string
    LastName  string
}

type Comment struct {
    Author Person
    Body   string
}

ctx := Post{
    Person{"Jean", "Valjean"},
    "Life is difficult",
    []Comment{
        Comment{
            Person{"Marcel", "Beliveau"},
            "LOL!",
        },
    },
}

RegisterHelper("fullName", func(person Person) string {
    return person.FirstName + " " + person.LastName
})
```

##### Template Helpers

You can register a helper on a specific template, and in that case that helper will be available to that template only:

```
tpl := raymond.MustParse("User: {{fullName user.firstName user.lastName}}")

tpl.RegisterHelper("fullName", func(firstName, lastName string) string {
  return firstName + " " + lastName
})
```

##### Built-In Helpers

Those built-in helpers are available to all templates.

###### The `if` block helper

You can use the `if` helper to conditionally render a block. If its argument returns `false`, `nil`, `0`, `""`, an empty array, an empty slice or an empty map, then raymond will not render the block.

```
<div class="entry">
  {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
  {{/if}}
</div>
```

When using a block expression, you can specify a template section to run if the expression returns a falsy value. That section, marked by `{{else}}` is called an "else section".

```
<div class="entry">
  {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
  {{else}}
    <h1>Unknown Author</h1>
  {{/if}}
</div>
```

You can chain several blocks. For example that template:

```
{{#if isActive}}
  <img src="star.gif" alt="Active">
{{else if isInactive}}
  <img src="cry.gif" alt="Inactive">
{{else}}
  <img src="wat.gif" alt="Unknown">
{{/if}}
```

With that context:

```
ctx := map[string]interface{}{
    "isActive":   false,
    "isInactive": false,
}
```

Outputs:

```
 <img src="wat.gif" alt="Unknown">
```

###### The `unless` block helper

You can use the `unless` helper as the inverse of the `if` helper. Its block will be rendered if the expression returns a falsy value.

```
<div class="entry">
  {{#unless license}}
  <h3 class="warning">WARNING: This entry does not have a license!</h3>
  {{/unless}}
</div>
```

###### The `each` block helper

You can iterate over an array, a slice, a map or a struct instance using this built-in `each` helper. Inside the block, you can use `this` to reference the element being iterated over.

For example:

```
<ul class="people">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
```

With this context:

```
map[string]interface{}{
    "people": []string{
        "Marcel", "Jean-Claude", "Yvette",
    },
}
```

Outputs:

```
<ul class="people">
  <li>Marcel</li>
  <li>Jean-Claude</li>
  <li>Yvette</li>
</ul>
```

You can optionally provide an `{{else}}` section which will display only when the passed argument is an empty array, an empty slice or an empty map (a `struct` instance is never considered empty).

```
{{#each paragraphs}}
  <p>{{this}}</p>
{{else}}
  <p class="empty">No content</p>
{{/each}}
```

When looping through items in `each`, you can optionally reference the current loop index via `{{@index}}`.

```
{{#each array}}
  {{@index}}: {{this}}
{{/each}}
```

Additionally for map and struct instance iteration, `{{@key}}` references the current map key or struct field name:

```
{{#each map}}
  {{@key}}: {{this}}
{{/each}}
```

The first and last steps of iteration are noted via the `@first` and `@last` variables.

###### The `with` block helper

You can shift the context for a section of a template by using the built-in `with` block helper.

```
<div class="entry">
  <h1>{{title}}</h1>

  {{#with author}}
  <h2>By {{firstName}} {{lastName}}</h2>
  {{/with}}
</div>
```

With this context:

```
map[string]interface{}{
    "title": "My first post!",
    "author": map[string]string{
        "firstName": "Jean",
        "lastName":  "Valjean",
    },
}
```

Outputs:

```
<div class="entry">
  <h1>My first post!</h1>

  <h2>By Jean Valjean</h2>
</div>
```

You can optionally provide an `{{else}}` section which will display only when the passed argument is falsy.

```
{{#with author}}
  <p>{{name}}</p>
{{else}}
  <p class="empty">No content</p>
{{/with}}
```

###### The `lookup` helper

The `lookup` helper allows for dynamic parameter resolution using handlebars variables.

```
{{#each bar}}
  {{lookup ../foo @index}}
{{/each}}
```

###### The `log` helper

The `log` helper allows for logging while rendering a template.

```
{{log "Look at me!"}}
```

Note that the handlebars.js `@level` variable is not supported.

###### The `equal` helper

The `equal` helper renders a block if the string version of both arguments are equals.

For example that template:

```
{{#equal foo "bar"}}foo is bar{{/equal}}
{{#equal foo baz}}foo is the same as baz{{/equal}}
{{#equal nb 0}}nothing{{/equal}}
{{#equal nb 1}}there is one{{/equal}}
{{#equal nb "1"}}everything is stringified before comparison{{/equal}}
```

With that context:

```
ctx := map[string]interface{}{
    "foo": "bar",
    "baz": "bar",
    "nb":  1,
}
```

Outputs:

```
foo is bar
foo is the same as baz

there is one
everything is stringified before comparison
```

##### Block Helpers

Block helpers make it possible to define custom iterators and other functionality that can invoke the passed block with a new context.

###### Block Evaluation

As an example, let's define a block helper that adds some markup to the wrapped text.

```
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{#bold}}{{body}}{{/bold}}
  </div>
</div>
```

The `bold` helper will add markup to make its text bold.

```
raymond.RegisterHelper("bold", func(options *raymond.Options) raymond.SafeString {
    return raymond.SafeString(`<div class="mybold">` + options.Fn() + "</div>")
})
```

A helper evaluates the block content with current context by calling `options.Fn()`.

If you want to evaluate the block with another context, then use `options.FnWith(ctx)`, like this french version of built-in `with` block helper:

```
raymond.RegisterHelper("avec", func(context interface{}, options *raymond.Options) string {
    return options.FnWith(context)
})
```

With that template:

```
{{#avec obj.text}}{{this}}{{/avec}}
```

###### Conditional

Let's write a french version of `if` block helper:

```
source := `{{#si yep}}YEP !{{/si}}`

ctx := map[string]interface{}{"yep": true}

raymond.RegisterHelper("si", func(conditional bool, options *raymond.Options) string {
    if conditional {
        return options.Fn()
    }
    return ""
})
```

Note that as the first parameter of the helper is typed as `bool` an automatic conversion is made if corresponding context value is not a boolean. So this helper works with that context too:

```
ctx := map[string]interface{}{"yep": "message"}
```

Here, `"message"` is converted to `true` because it is an non-empty string. See `IsTrue()` function for more informations on boolean conversion.

###### Else Block Evaluation

We can enhance the `si` block helper to evaluate the `else block` by calling `options.Inverse()` if conditional is false:

```
source := `{{#si yep}}YEP !{{else}}NOP !{{/si}}`

ctx := map[string]interface{}{"yep": false}

raymond.RegisterHelper("si", func(conditional bool, options *raymond.Options) string {
    if conditional {
        return options.Fn()
    }
    return options.Inverse()
})
```

Outputs:

```
NOP !
```

###### Block Parameters

It's possible to receive named parameters from supporting helpers.

```
{{#each users as |user userId|}}
  Id: {{userId}} Name: {{user.name}}
{{/each}}
```

In this particular example, `user` will have the same value as the current context and `userId` will have the index/key value for the iteration.

This allows for nested helpers to avoid name conflicts.

For example:

```
{{#each users as |user userId|}}
  {{#each user.books as |book bookId|}}
    User: {{userId}} Book: {{bookId}}
  {{/each}}
{{/each}}
```

With this context:

```
ctx := map[string]interface{}{
    "users": map[string]interface{}{
        "marcel": map[string]interface{}{
            "books": map[string]interface{}{
                "book1": "My first book",
                "book2": "My second book",
            },
        },
        "didier": map[string]interface{}{
            "books": map[string]interface{}{
                "bookA": "Good book",
                "bookB": "Bad book",
            },
        },
    },
}
```

Outputs:

```
  User: marcel Book: book1
  User: marcel Book: book2
  User: didier Book: bookA
  User: didier Book: bookB
```

As you can see, the second block parameter is the map key. When using structs, it is the struct field name.

When using arrays and slices, the second parameter is element index:

```
ctx := map[string]interface{}{
    "users": []map[string]interface{}{
        {
            "id": "marcel",
            "books": []map[string]interface{}{
                {"id": "book1", "title": "My first book"},
                {"id": "book2", "title": "My second book"},
            },
        },
        {
            "id": "didier",
            "books": []map[string]interface{}{
                {"id": "bookA", "title": "Good book"},
                {"id": "bookB", "title": "Bad book"},
            },
        },
    },
}
```

Outputs:

```
    User: 0 Book: 0
    User: 0 Book: 1
    User: 1 Book: 0
    User: 1 Book: 1
```

##### Helper Parameters

When calling a helper in a template, raymond expects the same number of arguments as the number of helper function parameters.

So this template:

```
{{add a}}
```

With this helper:

```
raymond.RegisterHelper("add", func(val1, val2 int) string {
    return strconv.Itoa(val1 + val2)
})
```

Will simply panics, because we call the helper with one argument whereas it expects two.

###### Automatic conversion

Let's create a `concat` helper that expects two strings and concat them:

```
source := `{{concat a b}}`

ctx := map[string]interface{}{
    "a": "Jean",
    "b": "Valjean",
}

raymond.RegisterHelper("concat", func(val1, val2 string) string {
    return val1 + " " + val2
})
```

Everything goes well, two strings are passed as arguments to the helper that outputs:

```
Jean VALJEAN
```

But what happens if there is another type than `string` in the context ? For example:

```
ctx := map[string]interface{}{
    "a": 10,
    "b": "Valjean",
}
```

Actually, raymond perfoms automatic string conversion. So because the first parameter of the helper is typed as `string`, the first argument will be converted from the `10` integer to `"10"`, and the helper outputs:

```
10 VALJEAN
```

Note that this kind of automatic conversion is done with `bool` type too, thanks to the `IsTrue()` function.

##### Options Argument

If a helper needs the `Options` argument, just add it at the end of helper parameters:

```
raymond.RegisterHelper("add", func(val1, val2 int, options *raymond.Options) string {
    return strconv.Itoa(val1 + val2) + " " + options.ValueStr("bananas")
})
```

Thanks to the `options` argument, helpers have access to the current evaluation context, to the `Hash` arguments, and they can manipulate the private data variables.

The `Options` argument is even necessary for Block Helpers to evaluate block and "else block".

###### Context Values

Helpers fetch current context values with `options.Value()` and `options.ValuesStr()`.

`Value()` returns an `interface{}` and lets the helper do the type assertions whereas `ValueStr()` automatically converts the value to a `string`.

For example:

```
source := `{{concat a b}}`

ctx := map[string]interface{}{
    "a":      "Marcel",
    "b":      "Beliveau",
    "suffix": "FOREVER !",
}

raymond.RegisterHelper("concat", func(val1, val2 string, options *raymond.Options) string {
    return val1 + " " + val2 + " " + options.ValueStr("suffix")
})
```

Outputs:

```
Marcel Beliveau FOREVER !
```

Helpers can get the entire current context with `options.Ctx()` that returns an `interface{}`.

###### Helper Hash Arguments

Helpers access hash arguments with `options.HashProp()` and `options.HashStr()`.

`HashProp()` returns an `interface{}` and lets the helper do the type assertions whereas `HashStr()` automatically converts the value to a `string`.

For example:

```
source := `{{concat suffix first=a second=b}}`

ctx := map[string]interface{}{
    "a":      "Marcel",
    "b":      "Beliveau",
    "suffix": "FOREVER !",
}

raymond.RegisterHelper("concat", func(suffix string, options *raymond.Options) string {
    return options.HashStr("first") + " " + options.HashStr("second") + " " + suffix
})
```

Outputs:

```
Marcel Beliveau FOREVER !
```

Helpers can get the full hash with `options.Hash()` that returns a `map[string]interface{}`.

###### Private Data

Helpers access private data variables with `options.Data()` and `options.DataStr()`.

`Data()` returns an `interface{}` and lets the helper do the type assertions whereas `DataStr()` automatically converts the value to a `string`.

Helpers can get the entire current data frame with `options.DataFrame()` that returns a `*DataFrame`.

For helpers that need to inject their own private data frame, use `options.NewDataFrame()` to create the frame and `options.FnData()` to evaluate the block with that frame.

For example:

```
source := `{{#voodoo kind=a}}Voodoo is {{@magix}}{{/voodoo}}`

ctx := map[string]interface{}{
    "a": "awesome",
}

raymond.RegisterHelper("voodoo", func(options *raymond.Options) string {
    // create data frame with @magix data
    frame := options.NewDataFrame()
    frame.Set("magix", options.HashProp("kind"))

    // evaluates block with new data frame
    return options.FnData(frame)
})
```

Helpers that need to evaluate the block with a private data frame and a new context can call `options.FnCtxData()`.

##### Utilites

In addition to `Escape()`, raymond provides utility functions that can be usefull for helpers.

###### `Str()`

`Str()` converts its parameter to a `string`.

Booleans:

```
raymond.Str(3) + " foos and " + raymond.Str(-1.25) + " bars"
// Outputs: "3 foos and -1.25 bars"
```

Numbers:

```
"everything is " + raymond.Str(true) + " and nothing is " + raymond.Str(false)
// Outputs: "everything is true and nothing is false"
```

Maps:

```
raymond.Str(map[string]string{"foo": "bar"})
// Outputs: "map[foo:bar]"
```

Arrays and Slices:

```
raymond.Str([]interface{}{true, 10, "foo", 5, "bar"})
// Outputs: "true10foo5bar"
```

###### `IsTrue()`

`IsTrue()` returns the truthy version of its parameter.

It returns `false` when parameter is either:

- an empty array
- an empty slice
- an empty map
- `""`
- `nil`
- `0`
- `false`

For all others values, `IsTrue()` returns `true`.

#### Context Functions

In addition to helpers, lambdas found in context are evaluated.

For example, that template and context:

```
source := "I {{feeling}} you"

ctx := map[string]interface{}{
    "feeling": func() string {
        rand.Seed(time.Now().UTC().UnixNano())

        feelings := []string{"hate", "love"}
        return feelings[rand.Intn(len(feelings))]
    },
}
```

Randomly renders `I hate you` or `I love you`.

Those context functions behave like helper functions: they can be called with parameters and they can have an `Options` argument.

#### Partials

##### Template Partials

You can register template partials before execution:

```
tpl := raymond.MustParse("{{> foo}} baz")
tpl.RegisterPartial("foo", "<span>bar</span>")

result := tpl.MustExec(nil)
fmt.Print(result)
```

Output:

```
<span>bar</span> baz
```

You can register several partials at once:

```
tpl := raymond.MustParse("{{> foo}} and {{> baz}}")
tpl.RegisterPartials(map[string]string{
    "foo": "<span>bar</span>",
    "baz": "<span>bat</span>",
})

result := tpl.MustExec(nil)
fmt.Print(result)
```

Output:

```
<span>bar</span> and <span>bat</span>
```

##### Global Partials

You can registers global partials that will be accessible by all templates:

```
raymond.RegisterPartial("foo", "<span>bar</span>")

tpl := raymond.MustParse("{{> foo}} baz")
result := tpl.MustExec(nil)
fmt.Print(result)
```

Or:

```
raymond.RegisterPartials(map[string]string{
    "foo": "<span>bar</span>",
    "baz": "<span>bat</span>",
})

tpl := raymond.MustParse("{{> foo}} and {{> baz}}")
result := tpl.MustExec(nil)
fmt.Print(result)
```

##### Dynamic Partials

It's possible to dynamically select the partial to be executed by using sub expression syntax.

For example, that template randomly evaluates the `foo` or `baz` partial:

```
tpl := raymond.MustParse("{{> (whichPartial) }}")
tpl.RegisterPartials(map[string]string{
    "foo": "<span>bar</span>",
    "baz": "<span>bat</span>",
})

ctx := map[string]interface{}{
    "whichPartial": func() string {
        rand.Seed(time.Now().UTC().UnixNano())

        names := []string{"foo", "baz"}
        return names[rand.Intn(len(names))]
    },
}

result := tpl.MustExec(ctx)
fmt.Print(result)
```

##### Partial Contexts

It's possible to execute partials on a custom context by passing in the context to the partial call.

For example:

```
tpl := raymond.MustParse("User: {{> userDetails user }}")
tpl.RegisterPartial("userDetails", "{{firstname}} {{lastname}}")

ctx := map[string]interface{}{
    "user": map[string]string{
        "firstname": "Jean",
        "lastname":  "Valjean",
    },
}

result := tpl.MustExec(ctx)
fmt.Print(result)
```

Displays:

```
User: Jean Valjean
```

##### Partial Parameters

Custom data can be passed to partials through hash parameters.

For example:

```
tpl := raymond.MustParse("{{> myPartial name=hero }}")
tpl.RegisterPartial("myPartial", "My hero is {{name}}")

ctx := map[string]interface{}{
    "hero": "Goldorak",
}

result := tpl.MustExec(ctx)
fmt.Print(result)
```

Displays:

```
My hero is Goldorak
```

#### Utility Functions

You can use following utility fuctions to parse and register partials from files:

- `ParseFile()` - reads a file and return parsed template
- `Template.RegisterPartialFile()` - reads a file and registers its content as a partial with given name
- `Template.RegisterPartialFiles()` - reads several files and registers them as partials, the filename base is used as the partial name

#### Mustache

Handlebars is a superset of [mustache](https://mustache.github.io) but it differs on those points:

- Alternative delimiters are not supported
- There is no recursive lookup

#### Limitations

These handlebars options are currently NOT implemented:

- `compat` - enables recursive field lookup
- `knownHelpers` - list of helpers that are known to exist (truthy) at template execution time
- `knownHelpersOnly` - allows further optimizations based on the known helpers list
- `trackIds` - include the id names used to resolve parameters for helpers
- `noEscape` - disables HTML escaping globally
- `strict` - templates will throw rather than silently ignore missing fields
- `assumeObjects` - removes object existence checks when traversing paths
- `preventIndent` - disables the auto-indententation of nested partials
- `stringParams` - resolves a parameter to it's name if the value isn't present in the context stack

These handlebars features are currently NOT implemented:

- raw block content is not passed as a parameter to helper
- `blockHelperMissing` - helper called when a helper can not be directly resolved
- `helperMissing` - helper called when a potential helper expression was not found
- `@contextPath` - value set in `trackIds` mode that records the lookup path for the current context
- `@level` - log level

#### Handlebars Lexer

You should not use the lexer directly, but for your information here is an example:

```
package main

import (
    "fmt"

    "github.com/aymerick/raymond/lexer"
)

func main() {
    source := "You know {{nothing}} John Snow"

    output := ""

    lex := lexer.Scan(source)
    for {
        // consume next token
        token := lex.NextToken()

        output += fmt.Sprintf(" %s", token)

        // stops when all tokens have been consumed, or on error
        if token.Kind == lexer.TokenEOF || token.Kind == lexer.TokenError {
            break
        }
    }

    fmt.Print(output)
}
```

Outputs:

```
Content{"You know "} Open{"{{"} ID{"nothing"} Close{"}}"} Content{" John Snow"} EOF
```

#### Handlebars Parser

You should not use the parser directly, but for your information here is an example:

```
package main

import (
    "fmt"

    "github.com/aymerick/raymond/ast"
    "github.com/aymerick/raymond/parser"
)

fu  nc main() {
    source := "You know {{nothing}} John Snow"

    // parse template
    program, err := parser.Parse(source)
    if err != nil {
        panic(err)
    }

    // print AST
    output := ast.Print(program)

    fmt.Print(output)
}
```

Outputs:

```
CONTENT[ 'You know ' ]
{{ PATH:nothing [] }}
CONTENT[ ' John Snow' ]
```

#### Test

First, fetch mustache tests:

```
$ git submodule update --init
```

To run all tests:

```
$ go test ./...
```

To filter tests:

```
$ go test -run="Partials"
```

To run all test and all benchmarks:

```
$ go test -bench . ./...
```

To test with race detection:

```
$ go test -race ./...
```

#### References

- [http://handlebarsjs.com/](http://handlebarsjs.com/)
- [https://mustache.github.io/mustache.5.html](https://mustache.github.io/mustache.5.html)
- [https://github.com/golang/go/tree/master/src/text/template](https://github.com/golang/go/tree/master/src/text/template)
- [https://www.youtube.com/watch?v=HxaD\_trXwRE](https://www.youtube.com/watch?v=HxaD_trXwRE)

#### Others Implementations

- [handlebars.js](http://handlebarsjs.com) - javascript
- [handlebars.java](https://github.com/jknack/handlebars.java) - java
- [handlebars.rb](https://github.com/cowboyd/handlebars.rb) - ruby
- [handlebars.php](https://github.com/XaminProject/handlebars.php) - php
- [handlebars-objc](https://github.com/Bertrand/handlebars-objc) - Objective C
- [rumblebars](https://github.com/nicolas-cherel/rumblebars) - rust

Expand ▾ Collapse ▴

## ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE2IDZsLTEuNDEgMS40MUwxOS4xNyAxMmwtNC41OCA0LjU5TDE2IDE4bDYtNnpNOCAxOGwxLjQxLTEuNDFMNC44MyAxMmw0LjU4LTQuNTlMOCA2bC02IDZ6Ii8+PC9zdmc+) Documentation [¶](#section-documentation "Go to Documentation")

### Overview [¶](#pkg-overview "Go to Overview")

Package raymond provides handlebars evaluation

Example [¶](#example-package "Go to Example")

```
source := "<h1>{{title}}</h1><p>{{body.content}}</p>"

ctx := map[string]interface{}{
	"title": "foo",
	"body":  map[string]string{"content": "bar"},
}

// parse template
tpl := MustParse(source)

// evaluate template with context
output := tpl.MustExec(ctx)

// alternatively, for one shots:
// output :=  MustRender(source, ctx)

fmt.Print(output)
```

```
Output:

<h1>foo</h1><p>bar</p>
```

Example (Struct) [¶](#example-package-Struct "Go to Example (Struct)")

```
source := `<div class="post">
  <h1>By {{fullName author}}</h1>
  <div class="body">{{body}}</div>

  <h1>Comments</h1>

  {{#each comments}}
  <h2>By {{fullName author}}</h2>
  <div class="body">{{content}}</div>
  {{/each}}
</div>`

type Person struct {
	FirstName string
	LastName  string
}

type Comment struct {
	Author Person
	Body   string `handlebars:"content"`
}

type Post struct {
	Author   Person
	Body     string
	Comments []Comment
}

ctx := Post{
	Person{"Jean", "Valjean"},
	"Life is difficult",
	[]Comment{
		Comment{
			Person{"Marcel", "Beliveau"},
			"LOL!",
		},
	},
}

RegisterHelper("fullName", func(person Person) string {
	return person.FirstName + " " + person.LastName
})

output := MustRender(source, ctx)

fmt.Print(output)
```

```
Output:

<div class="post">
  <h1>By Jean Valjean</h1>
  <div class="body">Life is difficult</div>

  <h1>Comments</h1>

  <h2>By Marcel Beliveau</h2>
  <div class="body">LOL!</div>
</div>
```

### Index [¶](#pkg-index "Go to Index")

- [func Escape(s string) string](#Escape)
- [func IsTrue(obj interface{}) bool](#IsTrue)
- [func MustRender(source string, ctx interface{}) string](#MustRender)
- [func RegisterHelper(name string, helper interface{})](#RegisterHelper)
- [func RegisterHelpers(helpers map\[string\]interface{})](#RegisterHelpers)
- [func RegisterPartial(name string, source string)](#RegisterPartial)
- [func RegisterPartialTemplate(name string, tpl \*Template)](#RegisterPartialTemplate)
- [func RegisterPartials(partials map\[string\]string)](#RegisterPartials)
- [func Render(source string, ctx interface{}) (string, error)](#Render)
- [func Str(value interface{}) string](#Str)
- [type DataFrame](#DataFrame)
- - [func NewDataFrame() \*DataFrame](#NewDataFrame)
- - [func (p \*DataFrame) Copy() \*DataFrame](#DataFrame.Copy)
  - [func (p \*DataFrame) Get(key string) interface{}](#DataFrame.Get)
  - [func (p \*DataFrame) Set(key string, val interface{})](#DataFrame.Set)
- [type Options](#Options)
- - [func (options \*Options) Ctx() interface{}](#Options.Ctx)
  - [func (options \*Options) Data(name string) interface{}](#Options.Data)
  - [func (options \*Options) DataFrame() \*DataFrame](#Options.DataFrame)
  - [func (options \*Options) DataStr(name string) string](#Options.DataStr)
  - [func (options \*Options) Eval(ctx interface{}, field string) interface{}](#Options.Eval)
  - [func (options \*Options) Fn() string](#Options.Fn)
  - [func (options \*Options) FnCtxData(ctx interface{}, data \*DataFrame) string](#Options.FnCtxData)
  - [func (options \*Options) FnData(data \*DataFrame) string](#Options.FnData)
  - [func (options \*Options) FnWith(ctx interface{}) string](#Options.FnWith)
  - [func (options \*Options) Hash() map\[string\]interface{}](#Options.Hash)
  - [func (options \*Options) HashProp(name string) interface{}](#Options.HashProp)
  - [func (options \*Options) HashStr(name string) string](#Options.HashStr)
  - [func (options \*Options) Inverse() string](#Options.Inverse)
  - [func (options \*Options) NewDataFrame() \*DataFrame](#Options.NewDataFrame)
  - [func (options \*Options) Param(pos int) interface{}](#Options.Param)
  - [func (options \*Options) ParamStr(pos int) string](#Options.ParamStr)
  - [func (options \*Options) Params() \[\]interface{}](#Options.Params)
  - [func (options \*Options) Value(name string) interface{}](#Options.Value)
  - [func (options \*Options) ValueStr(name string) string](#Options.ValueStr)
- [type SafeString](#SafeString)
- [type Template](#Template)
- - [func MustParse(source string) \*Template](#MustParse)
  - [func Parse(source string) (\*Template, error)](#Parse)
  - [func ParseFile(filePath string) (\*Template, error)](#ParseFile)
- - [func (tpl \*Template) Clone() \*Template](#Template.Clone)
  - [func (tpl \*Template) Exec(ctx interface{}) (result string, err error)](#Template.Exec)
  - [func (tpl \*Template) ExecWith(ctx interface{}, privData \*DataFrame) (result string, err error)](#Template.ExecWith)
  - [func (tpl \*Template) MustExec(ctx interface{}) string](#Template.MustExec)
  - [func (tpl \*Template) PrintAST() string](#Template.PrintAST)
  - [func (tpl \*Template) RegisterHelper(name string, helper interface{})](#Template.RegisterHelper)
  - [func (tpl \*Template) RegisterHelpers(helpers map\[string\]interface{})](#Template.RegisterHelpers)
  - [func (tpl \*Template) RegisterPartial(name string, source string)](#Template.RegisterPartial)
  - [func (tpl \*Template) RegisterPartialFile(filePath string, name string) error](#Template.RegisterPartialFile)
  - [func (tpl \*Template) RegisterPartialFiles(filePaths ...string) error](#Template.RegisterPartialFiles)
  - [func (tpl \*Template) RegisterPartialTemplate(name string, template \*Template)](#Template.RegisterPartialTemplate)
  - [func (tpl \*Template) RegisterPartials(partials map\[string\]string)](#Template.RegisterPartials)

#### Examples [¶](#pkg-examples "Go to Examples")

- [Package](#example-package)
- [Package (Struct)](#example-package-Struct)
- [Escape](#example-Escape)
- [IsTrue](#example-IsTrue)
- [MustRender](#example-MustRender)
- [Render](#example-Render)
- [SafeString](#example-SafeString)
- [Str](#example-Str)
- [Template.Exec](#example-Template.Exec)
- [Template.ExecWith](#example-Template.ExecWith)
- [Template.MustExec](#example-Template.MustExec)
- [Template.PrintAST](#example-Template.PrintAST)

### Constants [¶](#pkg-constants "Go to Constants")

This section is empty.

### Variables [¶](#pkg-variables "Go to Variables")

This section is empty.

### Functions [¶](#pkg-functions "Go to Functions")

#### func [Escape](https://github.com/aymerick/raymond/blob/v2.0.2/escape.go#L58) [¶](#Escape "Go to Escape")

```
func Escape(s string) string
```

Escape escapes special HTML characters.

It can be used by helpers that return a SafeString and that need to escape some content by themselves.

Example [¶](#example-Escape "Go to Example")

```
tpl := MustParse("{{link url text}}")

tpl.RegisterHelper("link", func(url string, text string) SafeString {
	return SafeString("<a href='" + Escape(url) + "'>" + Escape(text) + "</a>")
})

ctx := map[string]string{
	"url":  "http://www.aymerick.com/",
	"text": "This is a <em>cool</em> website",
}

result := tpl.MustExec(ctx)
fmt.Print(result)
```

```
Output:

<a href='http://www.aymerick.com/'>This is a &lt;em&gt;cool&lt;/em&gt; website</a>
```

#### func [IsTrue](https://github.com/aymerick/raymond/blob/v2.0.2/utils.go#L26) [¶](#IsTrue "Go to IsTrue")

```
func IsTrue(obj interface{}) bool
```

IsTrue returns true if obj is a truthy value.

Example [¶](#example-IsTrue "Go to Example")

```
output := "Empty array: " + Str(IsTrue([0]string{})) + "\n"
output += "Non empty array: " + Str(IsTrue([1]string{"foo"})) + "\n"

output += "Empty slice: " + Str(IsTrue([]string{})) + "\n"
output += "Non empty slice: " + Str(IsTrue([]string{"foo"})) + "\n"

output += "Empty map: " + Str(IsTrue(map[string]string{})) + "\n"
output += "Non empty map: " + Str(IsTrue(map[string]string{"foo": "bar"})) + "\n"

output += "Empty string: " + Str(IsTrue("")) + "\n"
output += "Non empty string: " + Str(IsTrue("foo")) + "\n"

output += "true bool: " + Str(IsTrue(true)) + "\n"
output += "false bool: " + Str(IsTrue(false)) + "\n"

output += "0 integer: " + Str(IsTrue(0)) + "\n"
output += "positive integer: " + Str(IsTrue(10)) + "\n"
output += "negative integer: " + Str(IsTrue(-10)) + "\n"

output += "0 float: " + Str(IsTrue(0.0)) + "\n"
output += "positive float: " + Str(IsTrue(10.0)) + "\n"
output += "negative integer: " + Str(IsTrue(-10.0)) + "\n"

output += "struct: " + Str(IsTrue(struct{}{})) + "\n"
output += "nil: " + Str(IsTrue(nil)) + "\n"

fmt.Println(output)
```

```
Output:

Empty array: false
Non empty array: true
Empty slice: false
Non empty slice: true
Empty map: false
Non empty map: true
Empty string: false
Non empty string: true
true bool: true
false bool: false
0 integer: false
positive integer: true
negative integer: true
0 float: false
positive float: true
negative integer: true
struct: true
nil: false
```

#### func [MustRender](https://github.com/aymerick/raymond/blob/v2.0.2/raymond.go#L26) [¶](#MustRender "Go to MustRender")

```
func MustRender(source string, ctx interface{}) string
```

MustRender parses a template and evaluates it with given context. It panics on error.

Note that this function call is not optimal as your template is parsed everytime you call it. You should use Parse() function instead.

Example [¶](#example-MustRender "Go to Example")

```
tpl := "<h1>{{title}}</h1><p>{{body.content}}</p>"

ctx := map[string]interface{}{
	"title": "foo",
	"body":  map[string]string{"content": "bar"},
}

// render template with context
output := MustRender(tpl, ctx)

fmt.Print(output)
```

```
Output:

<h1>foo</h1><p>bar</p>
```

#### func [RegisterHelper](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L38) [¶](#RegisterHelper "Go to RegisterHelper")

```
func RegisterHelper(name string, helper interface{})
```

RegisterHelper registers a global helper. That helper will be available to all templates.

#### func [RegisterHelpers](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L53) [¶](#RegisterHelpers "Go to RegisterHelpers")

```
func RegisterHelpers(helpers map[string]interface{})
```

RegisterHelpers registers several global helpers. Those helpers will be available to all templates.

#### func [RegisterPartial](https://github.com/aymerick/raymond/blob/v2.0.2/partial.go#L35) [¶](#RegisterPartial "Go to RegisterPartial")

```
func RegisterPartial(name string, source string)
```

RegisterPartial registers a global partial. That partial will be available to all templates.

#### func [RegisterPartialTemplate](https://github.com/aymerick/raymond/blob/v2.0.2/partial.go#L54) [¶](#RegisterPartialTemplate "Go to RegisterPartialTemplate")

```
func RegisterPartialTemplate(name string, tpl *Template)
```

RegisterPartialTemplate registers a global partial with given parsed template. That partial will be available to all templates.

#### func [RegisterPartials](https://github.com/aymerick/raymond/blob/v2.0.2/partial.go#L47) [¶](#RegisterPartials "Go to RegisterPartials")

```
func RegisterPartials(partials map[string]string)
```

RegisterPartials registers several global partials. Those partials will be available to all templates.

#### func [Render](https://github.com/aymerick/raymond/blob/v2.0.2/raymond.go#L7) [¶](#Render "Go to Render")

```
func Render(source string, ctx interface{}) (string, error)
```

Render parses a template and evaluates it with given context

Note that this function call is not optimal as your template is parsed everytime you call it. You should use Parse() function instead.

Example [¶](#example-Render "Go to Example")

```
tpl := "<h1>{{title}}</h1><p>{{body.content}}</p>"

ctx := map[string]interface{}{
	"title": "foo",
	"body":  map[string]string{"content": "bar"},
}

// render template with context
output, err := Render(tpl, ctx)
if err != nil {
	panic(err)
}

fmt.Print(output)
```

```
Output:

<h1>foo</h1><p>bar</p>
```

#### func [Str](https://github.com/aymerick/raymond/blob/v2.0.2/string.go#L23) [¶](#Str "Go to Str")

```
func Str(value interface{}) string
```

Str returns string representation of any basic type value.

Example [¶](#example-Str "Go to Example")

```
output := Str(3) + " foos are " + Str(true) + " and " + Str(-1.25) + " bars are " + Str(false) + "\n"
output += "But you know '" + Str(nil) + "' John Snow\n"
output += "map: " + Str(map[string]string{"foo": "bar"}) + "\n"
output += "array: " + Str([]interface{}{true, 10, "foo", 5, "bar"})

fmt.Println(output)
```

```
Output:

3 foos are true and -1.25 bars are false
But you know '' John Snow
map: map[foo:bar]
array: true10foo5bar
```

### Types [¶](#pkg-types "Go to Types")

#### type [DataFrame](https://github.com/aymerick/raymond/blob/v2.0.2/data_frame.go#L8) [¶](#DataFrame "Go to DataFrame")

```
type DataFrame struct {
	// contains filtered or unexported fields
}
```

DataFrame represents a private data frame.

Cf. private variables documentation at: [http://handlebarsjs.com/block\_helpers.html](http://handlebarsjs.com/block_helpers.html)

#### func [NewDataFrame](https://github.com/aymerick/raymond/blob/v2.0.2/data_frame.go#L14) [¶](#NewDataFrame "Go to NewDataFrame")

```
func NewDataFrame() *DataFrame
```

NewDataFrame instanciates a new private data frame.

#### func (\*DataFrame) [Copy](https://github.com/aymerick/raymond/blob/v2.0.2/data_frame.go#L21) [¶](#DataFrame.Copy "Go to DataFrame.Copy")

```
func (p *DataFrame) Copy() *DataFrame
```

Copy instanciates a new private data frame with receiver as parent.

#### func (\*DataFrame) [Get](https://github.com/aymerick/raymond/blob/v2.0.2/data_frame.go#L51) [¶](#DataFrame.Get "Go to DataFrame.Get")

```
func (p *DataFrame) Get(key string) interface{}
```

Get gets a data value.

#### func (\*DataFrame) [Set](https://github.com/aymerick/raymond/blob/v2.0.2/data_frame.go#L46) [¶](#DataFrame.Set "Go to DataFrame.Set")

```
func (p *DataFrame) Set(key string, val interface{})
```

Set sets a data value.

#### type [Options](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L11) [¶](#Options "Go to Options")

```
type Options struct {
	// contains filtered or unexported fields
}
```

Options represents the options argument provided to helpers and context functions.

#### func (\*Options) [Ctx](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L119) [¶](#Options.Ctx "Go to Options.Ctx")

```
func (options *Options) Ctx() interface{}
```

Ctx returns current evaluation context.

#### func (\*Options) [Data](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L170) [¶](#Options.Data "Go to Options.Data")

```
func (options *Options) Data(name string) interface{}
```

Data returns private data value.

#### func (\*Options) [DataFrame](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L180) [¶](#Options.DataFrame "Go to Options.DataFrame")

```
func (options *Options) DataFrame() *DataFrame
```

DataFrame returns current private data frame.

#### func (\*Options) [DataStr](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L175) [¶](#Options.DataStr "Go to Options.DataStr")

```
func (options *Options) DataStr(name string) string
```

DataStr returns string representation of private data value.

#### func (\*Options) [Eval](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L242) [¶](#Options.Eval "Go to Options.Eval")

```
func (options *Options) Eval(ctx interface{}, field string) interface{}
```

Eval evaluates field for given context.

#### func (\*Options) [Fn](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L212) [¶](#Options.Fn "Go to Options.Fn")

```
func (options *Options) Fn() string
```

Fn evaluates block with current evaluation context.

#### func (\*Options) [FnCtxData](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L217) [¶](#Options.FnCtxData "Go to Options.FnCtxData")

```
func (options *Options) FnCtxData(ctx interface{}, data *DataFrame) string
```

FnCtxData evaluates block with given context and private data frame.

#### func (\*Options) [FnData](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L227) [¶](#Options.FnData "Go to Options.FnData")

```
func (options *Options) FnData(data *DataFrame) string
```

FnData evaluates block with given private data frame.

#### func (\*Options) [FnWith](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L222) [¶](#Options.FnWith "Go to Options.FnWith")

```
func (options *Options) FnWith(ctx interface{}) string
```

FnWith evaluates block with given context.

#### func (\*Options) [Hash](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L138) [¶](#Options.Hash "Go to Options.Hash")

```
func (options *Options) Hash() map[string]interface{}
```

Hash returns entire hash.

#### func (\*Options) [HashProp](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L128) [¶](#Options.HashProp "Go to Options.HashProp")

```
func (options *Options) HashProp(name string) interface{}
```

HashProp returns hash property.

#### func (\*Options) [HashStr](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L133) [¶](#Options.HashStr "Go to Options.HashStr")

```
func (options *Options) HashStr(name string) string
```

HashStr returns string representation of hash property.

#### func (\*Options) [Inverse](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L232) [¶](#Options.Inverse "Go to Options.Inverse")

```
func (options *Options) Inverse() string
```

Inverse evaluates "else block".

#### func (\*Options) [NewDataFrame](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L187) [¶](#Options.NewDataFrame "Go to Options.NewDataFrame")

```
func (options *Options) NewDataFrame() *DataFrame
```

NewDataFrame instanciates a new data frame that is a copy of current evaluation data frame.

Parent of returned data frame is set to current evaluation data frame.

#### func (\*Options) [Param](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L147) [¶](#Options.Param "Go to Options.Param")

```
func (options *Options) Param(pos int) interface{}
```

Param returns parameter at given position.

#### func (\*Options) [ParamStr](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L156) [¶](#Options.ParamStr "Go to Options.ParamStr")

```
func (options *Options) ParamStr(pos int) string
```

ParamStr returns string representation of parameter at given position.

#### func (\*Options) [Params](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L161) [¶](#Options.Params "Go to Options.Params")

```
func (options *Options) Params() []interface{}
```

Params returns all parameters.

#### func (\*Options) [Value](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L104) [¶](#Options.Value "Go to Options.Value")

```
func (options *Options) Value(name string) interface{}
```

Value returns field value from current context.

#### func (\*Options) [ValueStr](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go#L114) [¶](#Options.ValueStr "Go to Options.ValueStr")

```
func (options *Options) ValueStr(name string) string
```

ValueStr returns string representation of field value from current context.

#### type [SafeString](https://github.com/aymerick/raymond/blob/v2.0.2/string.go#L12) [¶](#SafeString "Go to SafeString")

```
type SafeString string
```

SafeString represents a string that must not be escaped.

A SafeString can be returned by helpers to disable escaping.

Example [¶](#example-SafeString "Go to Example")

```
RegisterHelper("em", func() SafeString {
	return SafeString("<em>FOO BAR</em>")
})

tpl := MustParse("{{em}}")

result := tpl.MustExec(nil)
fmt.Print(result)
```

```
Output:

<em>FOO BAR</em>
```

#### type [Template](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L15) [¶](#Template "Go to Template")

```
type Template struct {
	// contains filtered or unexported fields
}
```

Template represents a handlebars template.

#### func [MustParse](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L45) [¶](#MustParse "Go to MustParse")

```
func MustParse(source string) *Template
```

MustParse instanciates a template by parsing given source. It panics on error.

#### func [Parse](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L33) [¶](#Parse "Go to Parse")

```
func Parse(source string) (*Template, error)
```

Parse instanciates a template by parsing given source.

#### func [ParseFile](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L54) [¶](#ParseFile "Go to ParseFile") added in v1.1.0

```
func ParseFile(filePath string) (*Template, error)
```

ParseFile reads given file and returns parsed template.

#### func (\*Template) [Clone](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L80) [¶](#Template.Clone "Go to Template.Clone") added in v1.1.0

```
func (tpl *Template) Clone() *Template
```

Clone returns a copy of that template.

#### func (\*Template) [Exec](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L193) [¶](#Template.Exec "Go to Template.Exec")

```
func (tpl *Template) Exec(ctx interface{}) (result string, err error)
```

Exec evaluates template with given context.

Example [¶](#example-Template.Exec "Go to Example")

```
source := "<h1>{{title}}</h1><p>{{body.content}}</p>"

ctx := map[string]interface{}{
	"title": "foo",
	"body":  map[string]string{"content": "bar"},
}

// parse template
tpl := MustParse(source)

// evaluate template with context
output, err := tpl.Exec(ctx)
if err != nil {
	panic(err)
}

fmt.Print(output)
```

```
Output:

<h1>foo</h1><p>bar</p>
```

#### func (\*Template) [ExecWith](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L207) [¶](#Template.ExecWith "Go to Template.ExecWith")

```
func (tpl *Template) ExecWith(ctx interface{}, privData *DataFrame) (result string, err error)
```

ExecWith evaluates template with given context and private data frame.

Example [¶](#example-Template.ExecWith "Go to Example")

```
source := "<h1>{{title}}</h1><p>{{#body}}{{content}} and {{@baz.bat}}{{/body}}</p>"

ctx := map[string]interface{}{
	"title": "foo",
	"body":  map[string]string{"content": "bar"},
}

// parse template
tpl := MustParse(source)

// computes private data frame
frame := NewDataFrame()
frame.Set("baz", map[string]string{"bat": "unicorns"})

// evaluate template
output, err := tpl.ExecWith(ctx, frame)
if err != nil {
	panic(err)
}

fmt.Print(output)
```

```
Output:

<h1>foo</h1><p>bar and unicorns</p>
```

#### func (\*Template) [MustExec](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L198) [¶](#Template.MustExec "Go to Template.MustExec")

```
func (tpl *Template) MustExec(ctx interface{}) string
```

MustExec evaluates template with given context. It panics on error.

Example [¶](#example-Template.MustExec "Go to Example")

```
source := "<h1>{{title}}</h1><p>{{body.content}}</p>"

ctx := map[string]interface{}{
	"title": "foo",
	"body":  map[string]string{"content": "bar"},
}

// parse template
tpl := MustParse(source)

// evaluate template with context
output := tpl.MustExec(ctx)

fmt.Print(output)
```

```
Output:

<h1>foo</h1><p>bar</p>
```

#### func (\*Template) [PrintAST](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L242) [¶](#Template.PrintAST "Go to Template.PrintAST")

```
func (tpl *Template) PrintAST() string
```

PrintAST returns string representation of parsed template.

Example [¶](#example-Template.PrintAST "Go to Example")

```
source := "<h1>{{title}}</h1><p>{{#body}}{{content}} and {{@baz.bat}}{{/body}}</p>"

// parse template
tpl := MustParse(source)

// print AST
output := tpl.PrintAST()

fmt.Print(output)
```

```
Output:

CONTENT[ '<h1>' ]
{{ PATH:title [] }}
CONTENT[ '</h1><p>' ]
BLOCK:
  PATH:body []
  PROGRAM:
    {{     PATH:content []
 }}
    CONTENT[ ' and ' ]
    {{     @PATH:baz/bat []
 }}
  CONTENT[ '</p>' ]
```

#### func (\*Template) [RegisterHelper](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L107) [¶](#Template.RegisterHelper "Go to Template.RegisterHelper")

```
func (tpl *Template) RegisterHelper(name string, helper interface{})
```

RegisterHelper registers a helper for that template.

#### func (\*Template) [RegisterHelpers](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L122) [¶](#Template.RegisterHelpers "Go to Template.RegisterHelpers")

```
func (tpl *Template) RegisterHelpers(helpers map[string]interface{})
```

RegisterHelpers registers several helpers for that template.

#### func (\*Template) [RegisterPartial](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L147) [¶](#Template.RegisterPartial "Go to Template.RegisterPartial")

```
func (tpl *Template) RegisterPartial(name string, source string)
```

RegisterPartial registers a partial for that template.

#### func (\*Template) [RegisterPartialFile](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L159) [¶](#Template.RegisterPartialFile "Go to Template.RegisterPartialFile") added in v1.1.0

```
func (tpl *Template) RegisterPartialFile(filePath string, name string) error
```

RegisterPartialFile reads given file and registers its content as a partial with given name.

#### func (\*Template) [RegisterPartialFiles](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L171) [¶](#Template.RegisterPartialFiles "Go to Template.RegisterPartialFiles") added in v1.1.0

```
func (tpl *Template) RegisterPartialFiles(filePaths ...string) error
```

RegisterPartialFiles reads several files and registers them as partials, the filename base is used as the partial name.

#### func (\*Template) [RegisterPartialTemplate](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L188) [¶](#Template.RegisterPartialTemplate "Go to Template.RegisterPartialTemplate")

```
func (tpl *Template) RegisterPartialTemplate(name string, template *Template)
```

RegisterPartialTemplate registers an already parsed partial for that template.

#### func (\*Template) [RegisterPartials](https://github.com/aymerick/raymond/blob/v2.0.2/template.go#L152) [¶](#Template.RegisterPartials "Go to Template.RegisterPartials")

```
func (tpl *Template) RegisterPartials(partials map[string]string)
```

RegisterPartials registers several partials for that template.

## ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE0IDJINmMtMS4xIDAtMS45OS45LTEuOTkgMkw0IDIwYzAgMS4xLjg5IDIgMS45OSAySDE4YzEuMSAwIDItLjkgMi0yVjhsLTYtNnpNNiAyMFY0aDd2NWg1djExSDZ6Ii8+PC9zdmc+) Source Files [¶](#section-sourcefiles "Go to Source Files")

[View all Source files](https://github.com/aymerick/raymond/tree/v2.0.2)

- [data\_frame.go](https://github.com/aymerick/raymond/blob/v2.0.2/data_frame.go "data_frame.go")
- [escape.go](https://github.com/aymerick/raymond/blob/v2.0.2/escape.go "escape.go")
- [eval.go](https://github.com/aymerick/raymond/blob/v2.0.2/eval.go "eval.go")
- [helper.go](https://github.com/aymerick/raymond/blob/v2.0.2/helper.go "helper.go")
- [partial.go](https://github.com/aymerick/raymond/blob/v2.0.2/partial.go "partial.go")
- [raymond.go](https://github.com/aymerick/raymond/blob/v2.0.2/raymond.go "raymond.go")
- [string.go](https://github.com/aymerick/raymond/blob/v2.0.2/string.go "string.go")
- [template.go](https://github.com/aymerick/raymond/blob/v2.0.2/template.go "template.go")
- [utils.go](https://github.com/aymerick/raymond/blob/v2.0.2/utils.go "utils.go")

## ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=) Directories [¶](#section-directories "Go to Directories")

Show internal Expand all

Path Synopsis

[ast](https://pkg.go.dev/github.com/aymerick/raymond@v2.0.2+incompatible/ast)

Package ast provides structures to represent a handlebars Abstract Syntax Tree, and a Visitor interface to visit that tree.

Package ast provides structures to represent a handlebars Abstract Syntax Tree, and a Visitor interface to visit that tree.

[handlebars](https://pkg.go.dev/github.com/aymerick/raymond@v2.0.2+incompatible/handlebars)

Package handlebars contains all the tests that come from handlebars.js project.

Package handlebars contains all the tests that come from handlebars.js project.

[lexer](https://pkg.go.dev/github.com/aymerick/raymond@v2.0.2+incompatible/lexer)

Package lexer provides a handlebars tokenizer.

Package lexer provides a handlebars tokenizer.

[parser](https://pkg.go.dev/github.com/aymerick/raymond@v2.0.2+incompatible/parser)

Package parser provides a handlebars syntax analyser.

Package parser provides a handlebars syntax analyser.

Click to show internal directories.

Click to hide internal directories.

[Why Go](https://go.dev/solutions) [Use Cases](https://go.dev/solutions#use-cases) [Case Studies](https://go.dev/solutions#case-studies)

[Get Started](https://learn.go.dev/) [Playground](https://play.golang.org) [Tour](https://tour.golang.org) [Stack Overflow](https://stackoverflow.com/questions/tagged/go?tab=Newest) [Help](https://go.dev/help)

[Packages](https://pkg.go.dev) [Standard Library](https://pkg.go.dev/std) [Sub-repositories](https://pkg.go.dev/golang.org/x) [About Go Packages](https://pkg.go.dev/about)

[About](https://go.dev/project) [Download](https://go.dev/dl/) [Blog](https://go.dev/blog) [Issue Tracker](https://github.com/golang/go/issues) [Release Notes](https://go.dev/doc/devel/release.html) [Brand Guidelines](https://go.dev/brand) [Code of Conduct](https://go.dev/conduct)

[Connect](https://www.twitter.com/golang) [Twitter](https://www.twitter.com/golang) [GitHub](https://github.com/golang) [Slack](https://invite.slack.golangbridge.org/) [r/golang](https://reddit.com/r/golang) [Meetup](https://www.meetup.com/pro/go) [Golang Weekly](https://golangweekly.com/)

![Gopher in flight goggles](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQzMSA5MDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIj48cGF0aCBkPSJNMzM1LjYgODY3LjhjLS42LTMzLTEuMS00Ny43LTIuMi02OS42LS42LTEwLjYtLjctMTEuMi0yLjQtMTAtMSAuNy01LjcgNC42LTEwLjYgOC42LTE1LjQgMTIuNS0yNS4xIDE2LjItNDcuNCAxNy43LTEyLjcuOS0xNy4yIDIuMS0zMiA5LTcuNSAzLjUtMTUuNSA2LjgtMTcuOCA3LjUtMy4xLjgtMTUuNi45LTQ1IC40bC00MC43LS43LTkuNSA0Yy0xOC40IDcuOC0zMS45IDExLTQxLjUgOS44LTktMS4yLTIxLjQtNC40LTI2LjQtNy0xMS41LTUuOC0yMy4xLTE4LjMtMzguOC00Mi0xOS43LTI5LjYtMjQuNi00Mi0xOS4yLTQ4LjkgMS4yLTEuNSA0LjktNC4xIDguMy01LjggMTEuMy01LjYgMTEuOS02LjQgMTQuMS0xNy4xIDEuMi02IDcuMy04LjQgMTMuMy01LjMgMy43IDIgOS40IDguMSAxMy40IDE0LjYgNC40IDcuMSA0LjYgNy41IDYuOSAyMC41IDIuOCAxNS41IDguNSAzOC45IDEwLjggNDQgMS44IDQgMi40IDQuNSA3LjcgNi4xIDguNSAyLjQgMjMuNSAxLjUgMzIuOS0yLjEgMy45LTEuNCAxMi4yLTQgMTguNS01LjYgMTEuMS0yLjkgMTIuNS0zLjEgMzYuNS0zLjQgMzUtLjQgNTQuOC0zLjYgNjIuNS0xMC4xIDctNS45IDI4LTU2LjEgMzUuNC04NC44IDUuMi0xOS43IDUuNy0zMC45IDIuMi00Ni41LTUuMy0yMy40LTEzLjMtNzcuOC0xNC4zLTk2LjYtLjYtMTEuNSAxLTIzLjMgNi00NmwyLjItMTAtNS4xLTUuMmMtNi4yLTYuMS0xMS40LTE1LjEtMTQuNC0yNC44LTMtOS42LTMuOC0yOC4xLTEuNi0zOC40LjktNC4xIDEuNS03LjUgMS4zLTcuNi0uMS0uMS0zLjEtMi4yLTYuNy00LjctMjItMTUuNC0zMy4xLTM2LjQtMzMuMy02Mi44LS4xLTEzLjYgMS4zLTIyLjggNS45LTM3IDQuNi0xNC41IDEwLjgtMjQuNiAyMS4zLTM1IDEwLjEtMTAgMTguMS0xNC45IDMwLjgtMTkgMTMuMS00LjIgMjAuOC01LjMgMzguMy01LjNoMTUuNmwyLjMtMTEuMWMzLjQtMTYuMyA4LjYtMzIuOSAxMy43LTQzLjQgNy41LTE1LjUgMjAuNS0yNyA0NS4xLTM5LjkgOC41LTQuNCAxMi42LTcuNCAxOS4zLTEzLjggNS4zLTUuMSAxNC41LTEyLjEgMjQuNS0xOC44IDE4LjMtMTIuMSAzNS44LTI2LjcgNDcuMi0zOS40IDExLjMtMTIuNyAxNC42LTE1LjYgMjYuOC0yMy43IDE4LjgtMTIuNSA1NS0zMS44IDc5LjEtNDIuMSAxNC42LTYuMyAyMy04LjMgNjIuNC0xNC45IDE4LjQtMy4yIDM5LjEtNi45IDQ2LTguNEM2ODkuMi42IDY5MC4zLjUgNzIzLjUuNWMzNS45IDAgNTEuMi45IDgyLjUgNS4xIDIxLjEgMi44IDM0LjYgNiA0NCAxMC4yIDYuOSAzLjIgMzQuNSAxMy4zIDYyIDIyLjcgNDMuNyAxNS4xIDU3IDE5LjkgNjIuNSAyMi43IDE0LjIgNy4xIDM2LjEgMjQuNyA3MCA1Ni4zIDIwLjIgMTguOCAyMiAyMC4yIDQyLjkgMzQuNSAzMi4zIDIyIDM1LjQgMjYuMiA0OC43IDY3LjUgMTIuMyAzOC4yIDExIDM1IDE0LjUgMzQuOCA1LjYtLjMgMjQuNiAxLjcgMzEuMyAzLjMgMy42LjggMTEuMiAzLjggMTYuOCA2LjUgMjEuOCAxMC43IDM1LjMgMjguOCA0My4xIDU3LjggMi4xIDguMSAyLjYgMTEuOCAyLjYgMjQuMS4xIDEzLjQtLjEgMTUuMi0yLjggMjMuMy00LjYgMTQtMTQuMyAyNy4xLTI1LjYgMzQuOGwtNS4xIDMuNC44IDEwYzEuMyAxNi40LjggMzktMS4xIDQ4LjQtMS44IDguOS02LjEgMTkuMy05LjIgMjIuNS0xLjYgMS43LTEuOCAzLjItMS42IDEwLjIuNCA4LjEtMS42IDI2LjktNC4zIDQwLjctMS4zIDctMS4zIDcuMyAxIDExLjIgMS4zIDIuMiA1LjEgNy4yIDguNSAxMSAzLjQgMy45IDcgOC43IDguMSAxMC44IDUuNSAxMC40IDguNiAzNS40IDcuNSA2MC0xLjMgMjkuMy00LjggNDAuOS0yNi42IDg2LjQtOC42IDE4LTExLjQgMjUuNi0xMC42IDI5LjcuOCA0LjMgNS4zIDEwLjcgMTAuNiAxNS4xIDYuNyA1LjYgMjkgMjAuMyA0MC45IDI2LjkgNy43IDQuNCAxMi45IDguMyAyMC41IDE1LjUgMTMuMiAxMi41IDE4LjcgMTUuNSAyOC4xIDE1LjUgMTIuNi0uMSAxOS43LTUuMyAyOC40LTIxIDcuNi0xMy43IDExLTE4IDI2LjktMzQuNSAxNS40LTE1LjkgMjMuNi0yMi41IDM1LjItMjguNCAxOS44LTEwIDM3LjgtOS45IDQ5LjIuMyA1LjcgNS4yIDcuOCA5LjIgNy44IDE1LjEgMCA1LjUtMS4zIDguNC02LjIgMTMuNy04LjIgOC45LTIyIDE2LjUtNDQuMiAyNC4zLTEzLjcgNC45LTE4LjIgNy43LTI5LjggMTkuMWwtMTAuNiAxMC41LTQuMSAxMi44Yy0yLjIgNy01LjMgMTQuNi03IDE3LTYuOCA5LjgtMjQuMiAyMy43LTMxLjUgMjUuMS0yLjUuNS01LjgtLjItMTMtMi44LTExLjgtNC4zLTIxLTYuMy0zNS4yLTcuNS0xOC4yLTEuNy0zMS44LTcuNi02Ni42LTI5LjQtMTYuOS0xMC41LTI3LjgtMTYuNy0yOS4zLTE2LjctLjMgMC0uMyAxNC41LjEgMzIuMy40IDE3LjcuNCAzNi4xIDAgNDFsLS44IDguN0gzMzYuM2wtLjctMzMuMnoiIGZpbGw9IiMwYTBhMGEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxnIGZpbGw9IiNmZWZlZmUiIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZD0iTTM0OCA4NzQuOGMwLTE0LjUtLjctNDIuOS0xLjUtNjMuM2wtMS40LTM3IDMuNy0zYzEzLjUtMTAuOSAyMi43LTIyLjUgMzEuNy0zOS44IDYuNi0xMi45IDYuOS0xNS42IDIuOC0zNS44LTQuOS0yNC44LTMuNy0zOS42IDUuOS03NS45IDEuNy02LjMgMy4zLTEyLjUgMy42LTEzLjcuMi0xLjMuOC0yLjMgMS4xLTIuMy40IDAgNS40IDIuNCAxMS4yIDUuNCAxMi4zIDYuNSAyNy4zIDExLjggNDEuMyAxNC44IDguMSAxLjcgMTMuNiAyLjEgMjcuNiAyLjIgMzYuNi4xIDcxLjMtOC4yIDEwMy40LTI0LjYgMTAuMy01LjMgMjkuOS0xNy45IDMxLjMtMjAuMS40LS42IDEuMiAyLjYgMS45IDcuMSAyLjcgMTkuMiAxMyAzMCAzMiAzMy41bDYuOSAxLjMtLjMgNy41Yy0uMSA0LjEtLjcgMTYuNC0xLjIgMjcuNC0xLjUgMzItMS40IDM3LjIgMS40IDQzLjEgNi42IDE0LjEgMjQgMjEuOSA0MSAxOC40IDcuNS0xLjUgMTkuOS03LjkgMjYuMi0xMy40bDQuOS00LjMgNC40IDMuNGM5LjcgNy40IDI0LjYgMTIuNiAzNi4xIDEyLjUgMTUuOS0uMSAyOS4xLTEwLjQgMzMuNy0yNi40IDIuMy04LjMgMi44LTM1LjQuOS01My40LS45LTguMy0xLjYtMTUuNi0xLjYtMTYuMiAwLS43IDEuMi0xLjIgMi44LTEuMiA0LjYgMCAxNS42LTIuNyAyMC41LTUgMTEuMi01LjMgMTkuMy0xNi44IDIxLjgtMzEuMi43LTQgMS4zLTcuNCAxLjUtNy42LjEtLjIgMi44IDEuMyA2IDMuNCAxNiAxMC4yIDQyLjMgMjAuNiA2NS40IDI1LjggMjEuNSA0LjggMzIuOSA2IDU3IDYgMjQuOS4xIDMzLjctMS4yIDUxLjktNy42IDIxLjUtNy41IDQ5LjEtMjQuNyA2My0zOS4yIDEuOS0yIDMuOC0zLjYgNC4yLTMuNi40IDAgMSA0LjYgMS4zIDEwLjMgMS45IDI4LjggNS4yIDQ0LjUgMTIuNiA1OS4yIDggMTYuMSA5LjQgMjIuNCA5LjQgNDUuNWwuMSAxOS41LTUuMSAxNy41Yy03LjEgMjQuMS05LjYgMzYuNS05LjggNDguNS0uMSA4LjcuMiAxMC42IDIuMyAxNC40IDQuOCA5LjEgMTcuNyAyMC41IDMzLjggMzBsNy4zIDQuMy4yIDQzLjcuMyA0My42djE0Ljk1YzQuNS45LTg2IDMuMjY3LTM5MC43IDMuMzY3TDM0OCA5MTQuMjY0Vjg3NC44eiIvPjxwYXRoIGQ9Ik0xMjg4LjUgODYzLjljLTkuMy0zLjctMjMuMy02LjgtMzUuNC03LjktMTkuMS0xLjYtMzAuNC02LjUtNjUuOC0yOC42LTEwLjEtNi4zLTI1LjEtMTUtMzMuNC0xOS40LTI2LjYtMTQuMi00MC44LTI0LjktNDUuNS0zNC42LTIuNS01LTIuNi02LjItMi4xLTEzLjQuOC05LjggNC40LTI2LjMgMTAuNC00Ni45IDQuMS0xNC4zIDQuNS0xNi44IDUtMjkuOS45LTIzLjItMi41LTQwLjUtMTAuOC01NS43LTYuOS0xMi43LTEwLjUtMzEuMy0xMS41LTU5LjVsLS42LTE2LjUgNS44LTdjOS42LTExLjcgMTguOC0yNi43IDI0LjItMzkuM2wyLjMtNS4zIDQuNy44YzIuNi40IDExLjkuNyAyMC43LjYgMTUuMy0uMSAyMy45LTEuMyAzMi45LTQuOSAxLjgtLjcgMS45LS4zIDEuMiA4LjItLjMgNC45LTEuOCAxNi4zLTMuMiAyNS40LTEuNCA5LTIuMyAxNy43LTIgMTkuMy43IDMuNCA1IDkuOCAxMi45IDE5IDMuMyAzLjggNi44IDkuMiA3LjkgMTEuOSAzLjIgOC40IDQuOCAyMi45IDQuOCA0Mi44IDAgMzQtMi4xIDQxLjYtMjQuNSA4OS41LTUuNyAxMi4xLTEwLjggMjMuOC0xMS40IDI2LTMuNiAxMy40IDEuNyAyNC4yIDE4LjIgMzYuNCAxMC4yIDcuNiAyNyAxOC40IDM4LjcgMjQuOSA0LjYgMi41IDExLjcgOC4xIDE4LjQgMTQuMiA2LjMgNS45IDEzLjUgMTEuNSAxNyAxMy4zIDUuNyAzIDYuOCAzLjIgMTYuMSAzLjIgOC45IDAgMTAuNi0uMyAxNS43LTIuOCA3LjQtMy42IDE1LjQtMTIuNCAyMS4zLTIzLjIgMi42LTQuNyA2LjMtMTAuNyA4LjMtMTMuNCA0LjYtNiAyOC0zMC43IDI4LjUtMzAuMS4yLjMgMi4zIDYgNC41IDEyLjhsNC4xIDEyLjItNS43IDMuNmMtNy4xIDQuNi0yNS44IDIyLjctMjguMiAyNy40LS45IDEuOS0zLjEgOC00LjggMTMuNS0zLjYgMTEuNS03LjIgMTcuNS0xNC41IDI0LjEtNi40IDUuOC0xNSAxMS40LTE3LjQgMTEuNC0xLS4xLTQtMS02LjgtMi4xek03Ny41IDgzMy40Yy0xMC40LTIuMi0xNi44LTUuNi0yNC4yLTEyLjYtNy44LTcuNS0xNS40LTE3LjMtMjYuMy0zNC04LjEtMTIuMi0xOC0zMC43LTE4LTMzLjQgMC0uNyAzLjUtMy4xIDcuOC01LjMgMTAuNi01LjMgMTQuNy0xMC4yIDE2LjQtMTkuNi40LTEuNyAxLTEuNCA0LjYgMi40IDYuNSA3LjEgOC43IDEyLjMgMTEuNyAyNy42IDUuNCAyOC44IDEwLjQgNDUuMiAxNC44IDQ5LjQgOCA3LjUgMzEuNyA4LjcgNDguOCAyLjUgMTkuOC03LjIgMjIuMS03LjYgNTIuOS04LjQgNDYuNy0xLjMgNjQtNS41IDcxLjgtMTcuOCAxMS4zLTE3LjUgMzEuNi03MC45IDM2LjItOTQuOSAyLjktMTUuNSAyLjUtMjktMS44LTQ4LjgtNi40LTMwLjItMTMuNy04NS4zLTEyLjctOTYgLjYtNi4yIDctNDAuNCA3LjctNDEgLjItLjIgNC4xIDEgOC44IDIuNiAxMC44IDMuNiAyMS4zIDUuMiAzMC43IDQuNyA0LjgtLjIgNy4zIDAgNy4zLjggMCAuNiAyIDUuMiA0LjUgMTAuMiAxMi41IDI1LjkgMzkuMiA1Ni44IDYyLjkgNzMuMSAzLjUgMi40IDQuNiAzLjcgNC4xIDQuOS0xLjMgMy40LTkuNSAzNi4xLTExLjcgNDYuNy0zLjEgMTUuNS0zIDMxLjUuNiA0OS40IDMuNSAxOC4yIDMuNCAyMS41LTEgMzAuNC00LjcgOS40LTEzLjIgMjIuMS0xOC42IDI3LjctMi40IDIuNS0xMS4xIDEwLjQtMTkuMiAxNy41LTM0LjEgMjkuOC0zNy4yIDMxLjUtNjIuMiAzMy41LTE2LjkgMS4zLTIxLjIgMi41LTM2LjkgMTAuMmwtMTMgNi4zLTQ0LjUuMS00NC41LjItMTIuNSA1Yy0yMC45IDguNS0yOS40IDkuOC00NC41IDYuNnpNMTM3NS41IDc4NS44Yy0zLjctMTAtNC40LTEzLjItMy4zLTEzLjkgMS45LTEuMiAyLjYtLjMgNC4zIDUuOS45IDMuMSAxLjggNi41IDIuMSA3LjUuNiAyLTIuNCAyLjUtMy4xLjV6TTEzODAuNyA3ODIuNmMtLjQtMSAxLjMtMiA1LjYtMy42IDkuNS0zLjQgMjMuNy0xMC44IDI4LjUtMTQuNyA3LjItNS45IDguOC0xMS4xIDUuMi0xNy4xLTUuNy05LjQtMjQuMy05LjctNDMuNy0uNy04LjYgNC0xMC43IDIuOS0zLjEtMS41IDExLjktNi44IDI1LjUtMTAgMzQuMy04LjEgOS40IDIuMSAxNy41IDkuMyAxNy41IDE1LjUgMCA4LjYtMTEuNiAxOC4xLTMzLjMgMjcuNC01LjQgMi4zLTkuOSA0LjItMTAuMSA0LjItLjIgMC0uNi0uNi0uOS0xLjR6Ii8+PHBhdGggZD0iTTEzNzguMiA3NzQuM2MtMS4xLTMuNy0uOS01LjMgMS01LjMgMS43IDAgMTguMS03LjkgMjAtOS43IDIuNS0yLjIgMi4zLTUuMS0uNS01LjgtMi4zLS42LTEwIDEuNS0xOS41IDUuNGwtNS4zIDIuMS0xLjgtNC4yLTEuOC00LjMgNC42LTIuNGM3LjMtMy44IDE4LTcuMSAyNS4xLTcuNyA1LjQtLjUgNy41LS4zIDExLjMgMS40IDUuMSAyLjMgOSA3LjQgOC4xIDEwLjctMSAzLjctMTAuMSAxMS4xLTE4LjYgMTUuMy04LjcgNC4yLTE4LjUgOC4yLTIwLjQgOC4yLS42IDAtMS42LTEuNi0yLjItMy43eiIvPjxwYXRoIGQ9Ik0xMzY5LjYgNzY5LjNjLTIuMy0yLjMgNC43LTYuNCAxOS4zLTExLjMgMTIuMi00LjEgMTEuOC0xLjUtLjYgNC4zLTEwLjkgNS0xOCA3LjctMTguNyA3ek0xMzY1LjYgNzU2LjVjLTMuMS05LjUtMS42LTEwLjkgMi40LTIuMSAzLjQgNy41IDMuNSA4LjIgMS42IDguOS0xLjEuNC0yLjEtMS40LTQtNi44ek02NzIuMyA3MDcuNGMtNC45LTEuOC0xMi04LjUtMTMtMTIuMy0uNy0yLjYgMS4zLTYwLjMgMi4zLTY3LjdsLjYtNC4yIDUuOC0uNmMzLjMtLjQgOC4zLTEuNCAxMS4yLTIuMiAxNi4yLTQuNSAyNC4xLTYuMyAzMC43LTYuOWw3LjMtLjctLjMgMzguNy0uNCAzOC43LTYgNS42Yy0xMS42IDEwLjgtMjcuMyAxNS42LTM4LjIgMTEuNnpNNzU0LjEgNzA1LjVjLTguMS0xLjgtMTcuNi02LjMtMjIuMi0xMC42bC0zLjctMy40LjUtMzkuNC42LTM5LjQgNy44LjdjOS43LjggNDQuMSA2LjUgNDUuMSA3LjQuNC40IDEuNCA4LjEgMi4zIDE3LjIgMi4xIDIwLjQgMS43IDQ1LS45IDUyLjEtNC42IDEyLjYtMTUuNiAxOC40LTI5LjUgMTUuNHpNNDUzLjggNjE2LjVjLTQzLjUtNi44LTg3LjctMzcuMy0xMTYuNy04MC40LTE2LjQtMjQuMy0yMC0zNi43LTIwLjgtNzIuMi0uNi0yNS4xLjQtMzkuMSA0LjItNTguNCAxMS40LTU3LjMgMzguOC0xMDEgODEuNC0xMjkuNiA0OS0zMyAxMzIuNy01My44IDI0OC42LTYxLjkgMzEuOC0yLjIgMTA3LjgtMy4zIDE0MC45LTIuMSAxMzguMiA1IDIyMi43IDI3IDI3MCA3MC4yIDMzLjQgMzAuNiA1NS4yIDcyLjIgNjMuNiAxMjEuMyA2IDM1LjIgNCA3OC40LTQuNyA5OS0zLjUgOC41LTEyIDIyLjctMTguOCAzMS42LTI2LjkgMzQuOC01OS4zIDU3LjEtOTcgNjYuNy0xMC41IDIuNy0xMi4xIDIuOC0zNCAyLjgtMjguNiAwLTQ0LjUtMi4yLTcwLjQtOS43LTE4LjktNS40LTM5LjMtMTQuNy01Mi42LTIzLjktNi40LTQuNC03LjItNS40LTktMTAuNi01LjItMTUuMi0yMS44LTI5LjctNDQuOS0zOC45bC04LTMuMy0xLjEtNC45Yy0xLjMtNS43LTQuMS05LjktOS4zLTE0LTE3LjQtMTMuOC01Mi4xLTE4LjEtNzkuNy0xMC0yMC4zIDUuOS0zMi4yIDE4LjEtMjkuNSAzMC4ybC43IDMuMy04LjYgMy45Yy0xOC41IDguMy0zNSAyMi4yLTQxLjkgMzUuMi0yLjYgNC45LTUuMSA3LjctMTEgMTIuNC0xOS42IDE1LjctNDMgMjcuNy02OC40IDM1LjQtMjcuMyA4LjItNjAuNyAxMS4zLTgzIDcuOXptODMuNy01MC45YzI5LjctNS4yIDU4LjMtMTcuMiA4MC43LTMzLjggMTEuMS04LjIgMzAuMy0yNS40IDM3LTMzLjEgMTcuMi0xOS43IDI3LjUtMzkuOSAzMi45LTY0LjcgMy4xLTEzLjcgMy4zLTM5LjcuNi01My4zLTkuMS00NC45LTM4LTgxLjgtNzkuOC0xMDEuNi0zOS4zLTE4LjctNzkuNy0xOS45LTEyMy45LTMuOC02Ni4yIDI0LjEtMTA5LjIgNjUuOC0xMjIuNSAxMTguNy0zLjcgMTQuOC00LjggMjQuMi00LjcgNDEgLjEgMTYuOSAxLjYgMjggNS43IDQwLjkgMTMuNSA0Mi43IDQ5LjMgNzQuNCA5Ny41IDg2LjYgOC4zIDIuMSAxMi41IDIuOCAyNy41IDQuOSA2LjEuOSA0MS4zLS40IDQ5LTEuOHptNDEzLTE4LjZjMzcuOS0zLjcgNzAuNi0xNy41IDkzLjUtMzkuNiAxOC40LTE3LjcgMjkuNS0zOS40IDMzLjctNjUuOCAyLjQtMTUuNSAxLjQtNDguOS0yLjEtNjUuMy0xNC40LTY4LjItNjQuNy0xMTAuMS0xNDcuNi0xMjIuOC0xNC41LTIuMi00OC4zLTMuMS01OS4xLTEuNi00NyA2LjgtODYuNSAzMy0xMDkuMyA3Mi44LTEzLjEgMjIuOC0xOC4zIDQ0LjYtMTcuMyA3My4xLjYgMTguMyAyLjcgMjkuMyA4LjcgNDQuNyA5LjUgMjQuNSAyNy45IDQ4IDQ5LjcgNjMuNyAxMC40IDcuNSAzNSAyMC43IDQ4LjMgMjYgMzIuNyAxMi44IDY4LjIgMTggMTAxLjUgMTQuOHoiLz48cGF0aCBkPSJNNDgwLjIgNTU3LjRjLTI0LjUtMy41LTQ4LjUtMTMuMS02Ny4yLTI2LjctMTQuNC0xMC41LTMwLjQtMzAuNS0zNy00Ni4zLTExLjgtMjguMy0xMi44LTYzLjktMi44LTk1LjMgNy4xLTIyLjUgMTcuNC0zOC45IDM1LjctNTcuMSAxMC44LTEwLjcgMjIuMS0yMC4yIDIyLjEtMTguNyAwIC4zLTEuNiAyLjUtMy43IDQuOS05LjYgMTEuNC0xOS4yIDI4LjctMjQuMSA0My41LTUuNyAxNi44LTYuNyAyMy44LTYuNyA0NS4zLjEgMTcgLjQgMjAuNyAyLjQgMjkgNyAyOC40IDIwLjYgNTIgNDEuMyA3MS41IDI2LjUgMjQuOSA1OS42IDM4LjYgOTYuOCA0MC4yIDEzLjEuNSAzMC0uNiAzNC41LTIuMy44LS4zIDEuNS0uMSAxLjUuNCAwIDEuMi0xNC41IDYuMS0yNS41IDguNy0xOS41IDQuNS00Ny45IDUuOC02Ny4zIDIuOXoiLz48cGF0aCBkPSJNNTI3LjUgNTM1LjRjLTE3LjItMi41LTI5LjgtNi4yLTQzLjQtMTIuNS0zOS44LTE4LjYtNjcuNi01NC41LTc0LjctOTYuNC0yLjQtMTQuMy0xLjUtMzcuMyAyLTUwLjUgNi41LTI0LjQgMTYuOC00Mi4zIDM0LjUtNjAuMSAzNC4xLTM0IDg0LjQtNDcuNSAxMzIuMS0zNS40IDUwLjkgMTMgODkuMSA1Mi42IDk5LjEgMTAzIDIuMSAxMC40IDEuOCAzNi44LS41IDQ3LjMtNS40IDI1LjItMTcuMyA0Ny0zNS42IDY1LjItMTguOCAxOC45LTQyLjQgMzEuNS03MCAzNy41LTcuMyAxLjYtMzYuOSAyLjktNDMuNSAxLjl6bTExMC42LTgyLjZjMTIuMS02IDIxLjEtMTYuOSAyNC4zLTI5LjMgNi45LTI2LjEtMTAuMS01Mi0zNy4xLTU2LjctMjEuNi0zLjctNDMuNCA5LjgtNTAuMyAzMS4xLTEuOSA2LjEtMi4yIDguNi0xLjggMTYuNy41IDguNCAxIDEwLjMgNC4yIDE2LjkgNS45IDExLjkgMTUuMiAxOS45IDI4LjEgMjQuMSAyLjUuOSA3LjggMS4zIDE0LjYgMS4xIDkuOS0uMiAxMS0uNCAxOC0zLjl6Ii8+PHBhdGggZD0iTTYyNy44IDQyOC40Yy0zLjEtMS42LTUuOC02LjEtNS44LTkuNSAwLTMuNCAzLjgtOC42IDcuMS05LjggNi0yLjEgMTMgMS43IDE0LjQgNy45LjkgNC0xLjcgOS42LTUuNCAxMS40LTMuNyAyLTYuOCAyLTEwLjMgMHpNOTEyLjUgNTM4LjRjLTE4LjUtMi4xLTI1LjgtNC40LTEzLjctNC40IDEwLjkgMCAyNy44LTMuNCA0Mi4yLTguNSA0Mi43LTE1LjEgNzctNTAuNiA4OS44LTkzIDQuNi0xNSA1LjctMjMuMyA1LjYtNDEtLjEtMTIuNS0uNi0xOC4zLTIuMy0yNi41LTQtMTguOS0xMS44LTM2LjgtMjMuMi01My02LjgtOS43LTI0LjQtMjcuMi0zMy43LTMzLjUtNC0yLjctNi45LTUuMS02LjQtNS4zIDEuNi0uNSAxOS43IDcuNCAyOC43IDEyLjUgMzAuMiAxNy4yIDUyLjEgNDMuMSA2Mi41IDc0LjEgOC45IDI2LjcgMTEgNjUuMiA1IDkwLjEtMTEuOSA0OC45LTUzLjMgODAuNi0xMTUgODguMS03LjguOS0zMi40IDEuMi0zOS41LjR6Ii8+PHBhdGggZD0iTTg4MCA1MjIuM2MtNTEuNi0zLjctOTYuNS0zNC44LTExNi4xLTgwLjMtNi44LTE1LjctOS0yNi4xLTkuNi00NS0uNC0xMi40LS4xLTE4LjcgMS4xLTI1LjUgOC40LTQ4LjUgNDYuNi05MC4xIDk1LjEtMTAzLjYgMTguOS01LjIgNDMuMy02LjYgNjIuMi0zLjMgNTAuNSA4LjUgOTIuNCA0NC41IDEwNi43IDkxLjQgNy41IDI0LjcgNy4yIDUxLjQtLjkgNzUuNy02LjEgMTguMi0xNS4xIDMzLjQtMjguMiA0Ny4zLTIzLjQgMjQuOS01NC4zIDM5LjgtODguOCA0My0xMC43IDEtMTIuMiAxLTIxLjUuM3pNOTgwLjIgNDQxYzEyLjMtNC42IDIzLjItMTUuOSAyNy40LTI4LjIgMi44LTguMiAyLjUtMjEuNS0uNi0zMC4xLTQuNi0xMi45LTE1LjYtMjMuNC0yOS0yNy43LTUuOC0xLjktOC42LTIuMi0xNi40LTEuOC04LjMuMy0xMC4yLjgtMTYuOCA0LjEtOS43IDQuNy0xNi44IDExLjgtMjEuNSAyMS41LTMuMiA2LjQtMy43IDguNS00LjEgMTYuNC0uNiAxMS4xIDEuNSAxOS41IDYuNyAyNy42IDYuNSA5LjkgMTcuNyAxNy45IDI4LjQgMjAuMiA2LjcgMS40IDE5LjUuNSAyNS45LTJ6Ii8+PHBhdGggZD0iTTk3MS4zIDQxMi41Yy0zLjItMy4yLTMuNS0zLjktMy03LjggMS41LTExLjMgMTYtMTMuNCAyMC40LTMgMi44IDYuOS0yLjMgMTQuMy05LjkgMTQuMy0zLjIgMC00LjctLjctNy41LTMuNXpNNjQ2LjUgNjEwLjljLTcuNy0xLjItMTUuNi01LjEtMTguOS05LjQtMy42LTQuNy02LTE0LjUtNS4yLTIxLjUgMS40LTExLjggOS45LTI0LjEgMjMuMi0zMy42IDUuOS00LjIgMjUuNy0xNC40IDI4LTE0LjQuNiAwIDMuOCAxLjYgNyAzLjUgMjEuNiAxMyA2MS43IDEzLjkgODUuNiAxLjkgMy43LTEuOSA4LjMtNC43IDEwLjItNi40bDMuNC0zLjEgNi43IDIuNWMxMyA1IDIyLjcgMTAuNyAzMC4xIDE4LjEgOS45IDkuOCAxMS45IDE0LjMgMTEuOSAyNyAwIDguOS0uNCAxMC43LTIuOSAxNi4zLTcuOCAxNy0yMy4xIDIwLjMtNjIuMSAxMy4zLTMwLjgtNS41LTU4LjctNS4yLTc3LjMuOS0xNC4zIDQuNy0yOSA2LjUtMzkuNyA0Ljl6TTI5MC4xIDUwMC45Yy0yMi40LTQuNC0zNS41LTE1LjItNDEuOS0zNC43LTIuMS02LjUtMi41LTkuNi0yLjYtMjAuMiAwLTYuOS4yLTEzIC42LTEzLjUuNC0uNyA1LjEtLjYgMTQuNS4zIDEyIDEuMSA0MS4zIDEuMiA0NSAuMSAxLS4zIDEuNCA1LjUgMS43IDI1LjYuMyAyMi42IDEgMzEuOCAzLjEgNDEuMy41IDIuMS40IDIuMi03LjcgMi4xLTQuNi0uMS0xMC4zLS41LTEyLjctMXpNMTEzOSA0OTIuMWMtMy0uMy01LjQtMS01LjMtMS42IDIuNC0xNSAzLjQtMjkuNiAzLjEtNDcuN2wtLjMtMjAuOCAzLjUuOGM3LjUgMS42IDI5LjIuNSA0NS40LTIuMiA4LjctMS41IDE2LjEtMi40IDE2LjUtMi4xIDEuMyAxLjQuNiA0MS44LS44IDQ3LjUtMi4xIDguNS01LjUgMTUuMy04LjkgMTguMi04LjUgNy4yLTMwLjEgMTAuNC01My4yIDcuOXpNMjc5LjMgNDIzLjRjLjMtMS4xIDEuOC03LjMgMy4yLTEzLjkgMy42LTE2LjMgMTAuMS00Mi4zIDEzLTUyLjEgNS40LTE3LjggMjAuOC00NS42IDQ3LjktODYuNmwxLjgtMi44LTIuOC0xLjFjLTQuMi0xLjYtMTcuNC00LjktMTkuNi00LjktMyAwLTMtMi0uMy0xNC4xIDMuNi0xNi4yIDgtMzAuMSAxMi41LTM5LjUgNi4xLTEyLjggMTguMy0yMy41IDM5LjEtMzQuOGw4LjYtNC42LjcgMy4xYy4zIDEuNy42IDUuNy42IDguOCAwIDcuOSAyLjYgMzEuNSA1IDQ1LjIgMi4zIDEzLjcgNi4xIDI3LjIgOS41IDM0LjNsMi41IDUuMS0yLjIgMS41Yy0xNi42IDExLjEtMzcgMzAuMi00Ny45IDQ1LTIwLjcgMjguMS0zNC44IDYyLjgtNDAuNSAxMDAuMi0xLjQgOC45LTIuMiAxMS43LTMuNCAxMS43LS44IDAtNy41LjQtMTQuOS43LTEyLjcuNi0xMy4zLjYtMTIuOC0xLjJ6Ii8+PHBhdGggZD0iTTI1Ni41IDQxNi43Yy0yNC40LTkuOS0zOS40LTI2LjQtNDQuMS00OC44LTQuNS0yMSAyLjgtNTIgMTYuMy02OS45IDEwLjctMTQuMSAyOC4xLTIzLjIgNDkuOC0yNi4xIDE0LjUtMS45IDQ3LjQuNyA0Ni44IDMuNy0uMS42LTQuMiA3LjQtOS4xIDE1LjMtNSA3LjgtMTEuMiAxOC4zLTEzLjggMjMuMmwtNC45IDguOS00LjUtLjdjLTE4LjItMi42LTMwLjUgMi4zLTMzLjggMTMuMy0yLjEgNy4xLTEuNSAxNi4zIDEuMyAyMi4xIDIuMyA0LjUgOC43IDExLjcgMTUuMiAxN2wyLjIgMS44LTIuOCAxMmMtMS42IDYuNi0zLjkgMTYuNC01LjEgMjEuOC0xLjcgNy41LTIuNSA5LjctMy44IDkuNy0uOSAwLTUuMy0xLjUtOS43LTMuM3pNMTE0MSA0MTMuN2MtNC43LTEtNS41LTEuNS01LjgtMy43LS45LTcuMi01LjYtMjguNy04LjItMzcuMy0xNi43LTU2LjEtNTMuNC0xMDEuOC0xMDAuNS0xMjUuNC00LjktMi41LTkuMS00LjYtOS4yLTQuNy0uMi0uMiAyLjQtNi41IDUuOC0xNC4yIDMuMy03LjYgNy44LTE4LjQgMTAuMS0yMy45IDMuMS03LjggMjYuMy01OCAyNy4zLTU5LjMuMS0uMiA0LjcgMi44IDEwLjEgNi42IDUuNSAzLjggMTUgMTAuNCAyMS4yIDE0LjcgMTEuNSA4IDIwLjcgMTcuNiAyNS4xIDI2LjMgMSAyLjEgNS45IDE2LjMgMTAuOSAzMS43IDUgMTUuNCA5LjQgMjguOCA5LjcgMjkuNy41IDEuMyAwIDEuOS0yLjIgMi40LTcuNSAxLjYtMTggNC42LTE5LjIgNS40LTEuMS42LjkgNS43IDkuOCAyNSAyMi41IDQ4LjYgMjkuOSA2Ny40IDMyLjcgODMgMS44IDEwLjEgNCA0MSAzLjEgNDMuNC0uNSAxLjMtMiAxLjYtNy45IDEuNS00IDAtOS44LS42LTEyLjgtMS4yeiIvPjxwYXRoIGQ9Ik0xMTczLjYgMzk5LjNjLS4zLTQuMy0xLjEtMTIuOS0xLjctMTkuMS0uNi02LjMtLjktMTEuNS0uNy0xMS42LjItLjIgMi44LTEuNyA1LjgtMy40IDYuNy0zLjcgMTMuNS0xMC4zIDE2LjMtMTUuNyA0LjgtOSAxLjYtMjIuOS03LTMwLjUtNi41LTUuNy0xMi4zLTcuMy0yNC45LTYuOWwtMTAuNS40LTkuOC0yMS4zYy01LjQtMTEuNy05LjYtMjEuNC05LjItMjEuNiAxLjQtLjkgMTYuNi0yLjYgMjMuMS0yLjYgMzggMCA2Mi44IDE4LjQgNzMuNiA1NC41IDIuMSA2LjkgMi44IDExLjkgMy4xIDIxLjUuNiAxNC4xLS42IDIwLjktNS40IDMwLjgtMy45IDgtMTUuOSAxOS44LTI0LjggMjQuNC02LjMgMy4zLTIyLjcgOC44LTI2IDguOC0uOSAwLTEuNS0yLjMtMS45LTcuN3pNNDAyLjIgMjU0LjNjLTYtMTUuNi0xMC4yLTM5LjgtMTIuMy03MC43bC0xLjMtMTcuOSA4LTcuNmM0LjctNC42IDE0LjMtMTEuOSAyMy45LTE4LjMgMTktMTIuNSAzMy4yLTI0LjUgNTEuNS00My41IDE3LjYtMTguMiAyOS40LTI2IDcyLjUtNDcuOCAzNi43LTE4LjYgNDEuMy0yMCA5NS0yOC45IDE0LjktMi41IDMyLjgtNS43IDM5LjktNy4xIDctMS40IDEyLjktMi41IDEzLjEtMi41LjcgMCAxLjUgNS41IDMuOSAyNiA1LjYgNDcuOCA1LjkgNTIuOCA2LjEgMTA1LjUuMSAyNy41LjUgNTIuNS45IDU1LjZsLjggNS43LTE1LjguNmMtMTIyLjcgNS0yMTAuNCAyMi0yNzAuNCA1Mi43LTYuNCAzLjItMTIgNS45LTEyLjMgNS45LS4zIDAtMS45LTMuNS0zLjUtNy43ek0xMDAwLjQgMjM2Yy0zNS41LTEzLjctODkuOS0yNC41LTE0Ny45LTI5LjQtMzYuOC0zLjItNTQuMS0zLjktOTgtNGwtNDUtLjEtLjctMTMuNWMtLjQtNy40LS42LTMxLjctLjYtNTQgLjItNDMuMi0uNi01NS4zLTYuNy0xMDQuOS0xLjQtMTAuNy0yLjItMTkuNy0xLjktMjAgMS0xLjEgNTEuNy0uNCA2Ni40LjggMzMuNCAyLjcgNTguOCA2LjQgNzAuNSAxMC4xIDMuMyAxIDExLjQgNC4xIDE4IDYuOCAxMC43IDQuNCA0My45IDE2LjMgNzAuNSAyNS4zIDIwLjMgNi44IDQxLjcgMTQuNyA0Ni42IDE3LjIgMTEuMyA1LjcgMzcuOCAyNy40IDY4LjYgNTYuMWwxNS43IDE0LjYtMi44IDYuM2MtMS42IDMuNC02LjMgMTMuNC0xMC42IDIyLjItNC4yIDguOC05LjggMjEuMi0xMi40IDI3LjUtMTAgMjQtMTguNCA0My0xOSA0Mi45LS4zIDAtNS4yLTEuOC0xMC43LTMuOXoiLz48L2c+PC9zdmc+)

- [Copyright](https://go.dev/copyright)
- [Terms of Service](https://go.dev/tos)
- [Privacy Policy](http://www.google.com/intl/en/policies/privacy/)
- [Report an Issue](https://go.dev/s/pkgsite-feedback)
- ![System theme](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDE1LjMxTDIzLjMxIDEyIDIwIDguNjlWNGgtNC42OUwxMiAuNjkgOC42OSA0SDR2NC42OUwuNjkgMTIgNCAxNS4zMVYyMGg0LjY5TDEyIDIzLjMxIDE1LjMxIDIwSDIwdi00LjY5ek0xMiAxOFY2YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2eiIvPjwvc3ZnPg==) ![Dark theme](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDJjLTEuODIgMC0zLjUzLjUtNSAxLjM1QzcuOTkgNS4wOCAxMCA4LjMgMTAgMTJzLTIuMDEgNi45Mi01IDguNjVDNi40NyAyMS41IDguMTggMjIgMTAgMjJjNS41MiAwIDEwLTQuNDggMTAtMTBTMTUuNTIgMiAxMCAyeiIvPjwvc3ZnPg==) ![Light theme](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiM0NTVBNjQiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjxwYXRoIGQ9Ik0xMiw3Yy0yLjc2LDAtNSwyLjI0LTUsNXMyLjI0LDUsNSw1czUtMi4yNCw1LTVTMTQuNzYsNywxMiw3TDEyLDd6IE0yLDEzbDIsMGMwLjU1LDAsMS0wLjQ1LDEtMXMtMC40NS0xLTEtMWwtMiwwIGMtMC41NSwwLTEsMC40NS0xLDFTMS40NSwxMywyLDEzeiBNMjAsMTNsMiwwYzAuNTUsMCwxLTAuNDUsMS0xcy0wLjQ1LTEtMS0xbC0yLDBjLTAuNTUsMC0xLDAuNDUtMSwxUzE5LjQ1LDEzLDIwLDEzeiBNMTEsMnYyIGMwLDAuNTUsMC40NSwxLDEsMXMxLTAuNDUsMS0xVjJjMC0wLjU1LTAuNDUtMS0xLTFTMTEsMS40NSwxMSwyeiBNMTEsMjB2MmMwLDAuNTUsMC40NSwxLDEsMXMxLTAuNDUsMS0xdi0yYzAtMC41NS0wLjQ1LTEtMS0xIEMxMS40NSwxOSwxMSwxOS40NSwxMSwyMHogTTUuOTksNC41OGMtMC4zOS0wLjM5LTEuMDMtMC4zOS0xLjQxLDBjLTAuMzksMC4zOS0wLjM5LDEuMDMsMCwxLjQxbDEuMDYsMS4wNiBjMC4zOSwwLjM5LDEuMDMsMC4zOSwxLjQxLDBzMC4zOS0xLjAzLDAtMS40MUw1Ljk5LDQuNTh6IE0xOC4zNiwxNi45NWMtMC4zOS0wLjM5LTEuMDMtMC4zOS0xLjQxLDBjLTAuMzksMC4zOS0wLjM5LDEuMDMsMCwxLjQxIGwxLjA2LDEuMDZjMC4zOSwwLjM5LDEuMDMsMC4zOSwxLjQxLDBjMC4zOS0wLjM5LDAuMzktMS4wMywwLTEuNDFMMTguMzYsMTYuOTV6IE0xOS40Miw1Ljk5YzAuMzktMC4zOSwwLjM5LTEuMDMsMC0xLjQxIGMtMC4zOS0wLjM5LTEuMDMtMC4zOS0xLjQxLDBsLTEuMDYsMS4wNmMtMC4zOSwwLjM5LTAuMzksMS4wMywwLDEuNDFzMS4wMywwLjM5LDEuNDEsMEwxOS40Miw1Ljk5eiBNNy4wNSwxOC4zNiBjMC4zOS0wLjM5LDAuMzktMS4wMywwLTEuNDFjLTAuMzktMC4zOS0xLjAzLTAuMzktMS40MSwwbC0xLjA2LDEuMDZjLTAuMzksMC4zOS0wLjM5LDEuMDMsMCwxLjQxczEuMDMsMC4zOSwxLjQxLDBMNy4wNSwxOC4zNnoiLz48L3N2Zz4=)

  Theme Toggle
- ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTIwIDVINGMtMS4xIDAtMS45OS45LTEuOTkgMkwyIDE3YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWN2MwLTEuMS0uOS0yLTItMnptLTkgM2gydjJoLTJWOHptMCAzaDJ2MmgtMnYtMnpNOCA4aDJ2Mkg4Vjh6bTAgM2gydjJIOHYtMnptLTEgMkg1di0yaDJ2MnptMC0zSDVWOGgydjJ6bTkgN0g4di0yaDh2MnptMC00aC0ydi0yaDJ2MnptMC0zaC0yVjhoMnYyem0zIDNoLTJ2LTJoMnYyem0wLTNoLTJWOGgydjJ6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgwem0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=)

  Shortcuts Modal

[![Google logo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNLjEyOCA5LjI3NmMwLTUuMTA1IDQuMzItOS4yNjEgOS40NTctOS4yNjEgMi44NDIgMCA0Ljg2NSAxLjEwNyA2LjM4OCAyLjU1MmwtMS43OTYgMS43ODVjLTEuMDkxLTEuMDE3LTIuNTY5LTEuODA3LTQuNTkyLTEuODA3LTMuNzUgMC02LjY4MyAzLjAwNC02LjY4MyA2LjczMXMyLjkzMiA2LjczMiA2LjY4MyA2LjczMmMyLjQzMiAwIDMuODItLjk3MSA0LjcwNi0xLjg1My43MjctLjcyMiAxLjIwNC0xLjc2MSAxLjM4Ni0zLjE4NEg5LjU4NVY4LjQ0aDguNTdjLjA5MS40NTEuMTM3Ljk5My4xMzcgMS41OCAwIDEuODk4LS41MjMgNC4yNDgtMi4yMDYgNS45Mi0xLjYzNiAxLjY5My0zLjcyOCAyLjU5Ny02LjUgMi41OTctNS4xMzkgMC05LjQ1OC00LjE1Ni05LjQ1OC05LjI2Mk0yNS4yMTggMTYuMTg5Yy0xLjgxOSAwLTMuMzg3LTEuNDkxLTMuMzg3LTMuNjE1IDAtMi4xNDYgMS41NjgtMy42MTQgMy4zODctMy42MTQgMS44MTggMCAzLjM4NyAxLjQ2OCAzLjM4NyAzLjYxNCAwIDIuMTI0LTEuNTY5IDMuNjE1LTMuMzg3IDMuNjE1bTAtOS41NzhjLTMuMzIgMC02LjAyNCAyLjUwNy02LjAyNCA1Ljk2MyAwIDMuNDM0IDIuNzA1IDUuOTY0IDYuMDI0IDUuOTY0IDMuMzE4IDAgNi4wMjQtMi41MyA2LjAyNC01Ljk2NCAwLTMuNDU2LTIuNzA2LTUuOTYzLTYuMDI0LTUuOTYzTTM4LjM2IDE2LjE4OWMtMS44MiAwLTMuMzg4LTEuNDkxLTMuMzg4LTMuNjE1IDAtMi4xNDYgMS41NjktMy42MTQgMy4zODctMy42MTQgMS44MTkgMCAzLjM4NyAxLjQ2OCAzLjM4NyAzLjYxNCAwIDIuMTI0LTEuNTY4IDMuNjE1LTMuMzg3IDMuNjE1bTAtOS41NzhjLTMuMzE5IDAtNi4wMjQgMi41MDctNi4wMjQgNS45NjMgMCAzLjQzNCAyLjcwNSA1Ljk2NCA2LjAyNCA1Ljk2NHM2LjAyNC0yLjUzIDYuMDI0LTUuOTY0YzAtMy40NTYtMi43MDUtNS45NjMtNi4wMjQtNS45NjNNNTEuNDY2IDE2LjE4OWMtMS44MTggMC0zLjM0MS0xLjUxNC0zLjM0MS0zLjU5MiAwLTIuMSAxLjUyMy0zLjYzNyAzLjM0MS0zLjYzNyAxLjc5NiAwIDMuMjA2IDEuNTM2IDMuMjA2IDMuNjM3IDAgMi4wNzgtMS40MSAzLjU5Mi0zLjIwNiAzLjU5MnptMy4wMjQtOS4yMTd2Ljk3MmgtLjA5MWMtLjU5MS0uNy0xLjcyOC0xLjMzMy0zLjE2LTEuMzMzLTMgMC01Ljc1MSAyLjYyLTUuNzUxIDUuOTg2IDAgMy4zNDMgMi43NSA1Ljk0MSA1Ljc1IDUuOTQxIDEuNDMzIDAgMi41Ny0uNjMzIDMuMTYtMS4zNTZoLjA5MnYuODU5YzAgMi4yODEtMS4yMjggMy41MDEtMy4yMDYgMy41MDEtMS42MTQgMC0yLjYxNC0xLjE1Mi0zLjAyMy0yLjEyM2wtMi4yOTYuOTQ5Yy42NiAxLjU4MSAyLjQxIDMuNTI0IDUuMzIgMy41MjQgMy4wOTEgMCA1LjcwNS0xLjgwOCA1LjcwNS02LjIxMlY2Ljk3MmgtMi41ek02MS40NDYgMTguMTc2aC0yLjYzN1YuNjQ3aDIuNjM3ek02OC40NyA4LjkxNWMxLjA0NiAwIDEuOTMyLjUyIDIuMjI4IDEuMjY1bC01LjM2NSAyLjIxNGMtLjA2OC0yLjMwNSAxLjc5Ni0zLjQ4IDMuMTM3LTMuNDhtLjIwNSA3LjI3NWMtMS4zNDIgMC0yLjI5Ni0uNjEtMi45MS0xLjgwN2w4LjAyNS0zLjI5OC0uMjczLS42NzhjLS41LTEuMzMzLTIuMDI0LTMuNzk1LTUuMTM4LTMuNzk1LTMuMDkyIDAtNS42NiAyLjQxNy01LjY2IDUuOTYzIDAgMy4zNDQgMi41NDYgNS45NjQgNS45NTYgNS45NjQgMi43NSAwIDQuMzQyLTEuNjcyIDUtMi42NDNMNzEuNjMgMTQuNTRjLS42ODIuOTk0LTEuNjE0IDEuNjQ5LTIuOTU1IDEuNjQ5Ii8+PC9nPjwvc3ZnPg==)](https://google.com)

## Jump to

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxeiIvPjwvc3ZnPg==)

Close

## Keyboard shortcuts

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxeiIvPjwvc3ZnPg==)

|                |                 |
|----------------|-----------------|
| **?**          | : This menu     |
| **/**          | : Search site   |
| **f** or **F** | : Jump to       |
| **y** or **Y** | : Canonical URL |

Close

go.dev uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic. [Learn more.](https://policies.google.com/technologies/cookies)

Okay
