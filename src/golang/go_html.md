---
title: html | Golang
draft: false
---

## Package template

*   `import "html/template"`
*   [Overview](https://devdocs.io/go/fmt/index#pkg-overview)
*   [Index](https://devdocs.io/go/fmt/index#pkg-index)
*   [Examples](https://devdocs.io/go/fmt/index#pkg-examples)

## Overview

Package template (html/template) implements data-driven templates for generating HTML output safe against code injection. It provides the same interface as text/template and should be used instead of text/template whenever the output is HTML.

The documentation here focuses on the security features of the package. For information about how to program the templates themselves, see the documentation for text/template.

### Introduction

This package wraps text/template so you can share its template API to parse and execute HTML templates safely.

```go
tmpl, err := template.New("name").Parse(...)

err = tmpl.Execute(out, data)
```

HTML templates treat data values as plain text which should be encoded so they can be safely embedded in an HTML document. The escaping is contextual, so actions can appear within JavaScript, CSS, and URI contexts.

The security model used by this package assumes that template authors are trusted, while Execute's data parameter is not. More details are provided below.

Example

```go
import "text/template"
...
t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
err = t.ExecuteTemplate(out, "T", "<script>alert('you have been pwned')</script>")
```

```go
Hello, <script>alert('you have been pwned')</script>!
```

```go
import "html/template"
...
t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
err = t.ExecuteTemplate(out, "T", "<script>alert('you have been pwned')</script>")
```

```go
Hello, &lt;script&gt;alert(&#39;you have been pwned&#39;)&lt;/script&gt;!
```

This package understands HTML, CSS, JavaScript, and URIs. It adds sanitizing functions to each simple action pipeline, so given the excerpt

```go
<a href="/search?q={{.}}">{{.}}</a>
```

```go
<a href="/search?q={{. | urlescaper | attrescaper}}">{{. | htmlescaper}}</a>
```

For these internal escaping functions, if an action pipeline evaluates to a nil interface value, it is treated as though it were an empty string.

### Namespaced and data- attributes

Attributes with a namespace are treated as if they had no namespace. Given the excerpt

```go
<a my:href="{{.}}"></a>
```

```go
<a my:href="{{. | urlescaper | attrescaper}}"></a>
```

```go
<a data-href="{{.}}"></a>
```

```go
<a data-href="{{. | urlescaper | attrescaper}}"></a>
```

```go
<a my:data-href="{{.}}"></a>
```

```go
<a my:data-href="{{. | attrescaper}}"></a>
```

```go
<a xmlns:title="{{.}}"></a>
<a xmlns:href="{{.}}"></a>
<a xmlns:onclick="{{.}}"></a>
```

```go
<a xmlns:title="{{. | urlescaper | attrescaper}}"></a>
<a xmlns:href="{{. | urlescaper | attrescaper}}"></a>
<a xmlns:onclick="{{. | urlescaper | attrescaper}}"></a>
```

See the documentation of ErrorCode for details.

### A fuller picture

The rest of this package comment may be skipped on first reading; it includes details necessary to understand escaping contexts and error messages. Most users will not need to understand these details.

### Contexts

Assuming {{.}} is `O'Reilly: How are <i>you</i>?`, the table below shows how {{.}} appears when used in the context to the left.

```go
Context                          {{.}} After
{{.}}                            O'Reilly: How are &lt;i&gt;you&lt;/i&gt;?
<a title='{{.}}'>                O&#39;Reilly: How are you?
<a href="/{{.}}">                O&#39;Reilly: How are %3ci%3eyou%3c/i%3e?
<a href="?q={{.}}">              O&#39;Reilly%3a%20How%20are%3ci%3e...%3f
<a onx='f("{{.}}")'>             O\x27Reilly: How are \x3ci\x3eyou...?
<a onx='f({{.}})'>               "O\x27Reilly: How are \x3ci\x3eyou...?"
<a onx='pattern = /{{.}}/;'>     O\x27Reilly: How are \x3ci\x3eyou...\x3f
```

```go
Context                          {{.}} After
<a href="{{.}}">                 #ZgotmplZ
```

If {{.}} is the innocuous word, `left`, then it can appear more widely,

```go
Context                              {{.}} After
{{.}}                                left
<a title='{{.}}'>                    left
<a href='{{.}}'>                     left
<a href='/{{.}}'>                    left
<a href='?dir={{.}}'>                left
<a style="border-{{.}}: 4px">        left
<a style="align: {{.}}">             left
<a style="background: '{{.}}'>       left
<a style="background: url('{{.}}')>  left
<style>p.{{.}} {color:red}</style>   left
```

```go
struct{A,B string}{ "foo", "bar" }
```

```go
<script>var pair = {{.}};</script>
```

```go
<script>var pair = {"A": "foo", "B": "bar"};</script>
```

### Typed Strings

By default, this package assumes that all pipelines produce a plain text string. It adds escaping pipeline stages necessary to correctly and safely embed that plain text string in the appropriate context.

When a data value is not plain text, you can make sure it is not over-escaped by marking it with its type.

Types HTML, JS, URL, and others from content.go can carry safe content that is exempted from escaping.

The template

```go
Hello, {{.}}!
```

```go
tmpl.Execute(out, template.HTML(`<b>World</b>`))
```

```go
Hello, <b>World</b>!
```

```go
Hello, &lt;b&gt;World&lt;b&gt;!
```

### Security Model

[https://rawgit.com/mikesamuel/sanitized-jquery-templates/trunk/safetemplate.html#problem_definition](https://rawgit.com/mikesamuel/sanitized-jquery-templates/trunk/safetemplate.html#problem_definition) defines "safe" as used by this package.

This package assumes that template authors are trusted, that Execute's data parameter is not, and seeks to preserve the properties below in the face of untrusted data:

Structure Preservation Property: "... when a template author writes an HTML tag in a safe templating language, the browser will interpret the corresponding portion of the output as a tag regardless of the values of untrusted data, and similarly for other structures such as attribute boundaries and JS and CSS string boundaries."

Code Effect Property: "... only code specified by the template author should run as a result of injecting the template output into a page and all code specified by the template author should run as a result of the same."

Least Surprise Property: "A developer (or code reviewer) familiar with HTML, CSS, and JavaScript, who knows that contextual autoescaping happens should be able to look at a {{.}} and correctly infer what sanitization happens."

Previously, ECMAScript 6 template literal were disabled by default, and could be enabled with the GODEBUG=jstmpllitinterp=1 environment variable. Template literals are now supported by default, and setting jstmpllitinterp has no effect.

#### Example

Code:

```go
const tpl = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{{.Title}}</title>
    </head>
    <body>
        {{range .Items}}<div>{{ . }}</div>{{else}}<div><strong>no rows</strong></div>{{end}}
    </body>
</html>`

check := func(err error) {
    if err != nil {
        log.Fatal(err)
    }
}
t, err := template.New("webpage").Parse(tpl)
check(err)

data := struct {
    Title string
    Items []string
}{
    Title: "My page",
    Items: []string{
        "My photos",
        "My blog",
    },
}

err = t.Execute(os.Stdout, data)
check(err)

noItems := struct {
    Title string
    Items []string
}{
    Title: "My another page",
    Items: []string{},
}

err = t.Execute(os.Stdout, noItems)
check(err)

```

```go
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My page</title>
</head>
<body>
<div>My photos</div><div>My blog</div>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My another page</title>
</head>
<body>
<div><strong>no rows</strong></div>
</body>
</html>
```

Code:

```go
check := func(err error) {
    if err != nil {
        log.Fatal(err)
    }
}
t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
check(err)
err = t.ExecuteTemplate(os.Stdout, "T", "<script>alert('you have been pwned')</script>")
check(err)
```

```go
Hello, &lt;script&gt;alert(&#39;you have been pwned&#39;)&lt;/script&gt;!
```

Code:

```go
const s = `"Fran & Freddie's Diner" <tasty@example.com>`
v := []any{`"Fran & Freddie's Diner"`, ' ', `<tasty@example.com>`}

fmt.Println(template.HTMLEscapeString(s))
template.HTMLEscape(os.Stdout, []byte(s))
fmt.Fprintln(os.Stdout, "")
fmt.Println(template.HTMLEscaper(v...))

fmt.Println(template.JSEscapeString(s))
template.JSEscape(os.Stdout, []byte(s))
fmt.Fprintln(os.Stdout, "")
fmt.Println(template.JSEscaper(v...))

fmt.Println(template.URLQueryEscaper(v...))

```

```go
&#34;Fran &amp; Freddie&#39;s Diner&#34; &lt;tasty@example.com&gt;
&#34;Fran &amp; Freddie&#39;s Diner&#34; &lt;tasty@example.com&gt;
&#34;Fran &amp; Freddie&#39;s Diner&#34;32&lt;tasty@example.com&gt;
\"Fran \u0026 Freddie\'s Diner\" \u003Ctasty@example.com\u003E
\"Fran \u0026 Freddie\'s Diner\" \u003Ctasty@example.com\u003E
\"Fran \u0026 Freddie\'s Diner\"32\u003Ctasty@example.com\u003E
%22Fran+%26+Freddie%27s+Diner%2232%3Ctasty%40example.com%3E
```

*   [func HTMLEscape(w io.Writer, b []byte)](https://devdocs.io/go/fmt/index#HTMLEscape)
*   [func HTMLEscapeString(s string) string](https://devdocs.io/go/fmt/index#HTMLEscapeString)
*   [func HTMLEscaper(args ...any) string](https://devdocs.io/go/fmt/index#HTMLEscaper)
*   [func IsTrue(val any) (truth, ok bool)](https://devdocs.io/go/fmt/index#IsTrue)
*   [func JSEscape(w io.Writer, b []byte)](https://devdocs.io/go/fmt/index#JSEscape)
*   [func JSEscapeString(s string) string](https://devdocs.io/go/fmt/index#JSEscapeString)
*   [func JSEscaper(args ...any) string](https://devdocs.io/go/fmt/index#JSEscaper)
*   [func URLQueryEscaper(args ...any) string](https://devdocs.io/go/fmt/index#URLQueryEscaper)
*   [type CSS](https://devdocs.io/go/fmt/index#CSS)
*   [type Error](https://devdocs.io/go/fmt/index#Error)
*   [func (e *Error) Error() string](https://devdocs.io/go/fmt/index#Error.Error)
*   [type ErrorCode](https://devdocs.io/go/fmt/index#ErrorCode)
*   [type FuncMap](https://devdocs.io/go/fmt/index#FuncMap)
*   [type HTML](https://devdocs.io/go/fmt/index#HTML)
*   [type HTMLAttr](https://devdocs.io/go/fmt/index#HTMLAttr)
*   [type JS](https://devdocs.io/go/fmt/index#JS)
*   [type JSStr](https://devdocs.io/go/fmt/index#JSStr)
*   [type Srcset](https://devdocs.io/go/fmt/index#Srcset)
*   [type Template](https://devdocs.io/go/fmt/index#Template)
*   [func Must(t *Template, err error) *Template](https://devdocs.io/go/fmt/index#Must)
*   [func New(name string) *Template](https://devdocs.io/go/fmt/index#New)
*   [func ParseFS(fs fs.FS, patterns ...string) (*Template, error)](https://devdocs.io/go/fmt/index#ParseFS)
*   [func ParseFiles(filenames ...string) (*Template, error)](https://devdocs.io/go/fmt/index#ParseFiles)
*   [func ParseGlob(pattern string) (*Template, error)](https://devdocs.io/go/fmt/index#ParseGlob)
*   [func (t *Template) AddParseTree(name string, tree *parse.Tree) (*Template, error)](https://devdocs.io/go/fmt/index#Template.AddParseTree)
*   [func (t *Template) Clone() (*Template, error)](https://devdocs.io/go/fmt/index#Template.Clone)
*   [func (t *Template) DefinedTemplates() string](https://devdocs.io/go/fmt/index#Template.DefinedTemplates)
*   [func (t *Template) Delims(left, right string) *Template](https://devdocs.io/go/fmt/index#Template.Delims)
*   [func (t *Template) Execute(wr io.Writer, data any) error](https://devdocs.io/go/fmt/index#Template.Execute)
*   [func (t *Template) ExecuteTemplate(wr io.Writer, name string, data any) error](https://devdocs.io/go/fmt/index#Template.ExecuteTemplate)
*   [func (t *Template) Funcs(funcMap FuncMap) *Template](https://devdocs.io/go/fmt/index#Template.Funcs)
*   [func (t *Template) Lookup(name string) *Template](https://devdocs.io/go/fmt/index#Template.Lookup)
*   [func (t *Template) Name() string](https://devdocs.io/go/fmt/index#Template.Name)
*   [func (t *Template) New(name string) *Template](https://devdocs.io/go/fmt/index#Template.New)
*   [func (t *Template) Option(opt ...string) *Template](https://devdocs.io/go/fmt/index#Template.Option)
*   [func (t *Template) Parse(text string) (*Template, error)](https://devdocs.io/go/fmt/index#Template.Parse)
*   [func (t *Template) ParseFS(fs fs.FS, patterns ...string) (*Template, error)](https://devdocs.io/go/fmt/index#Template.ParseFS)
*   [func (t *Template) ParseFiles(filenames ...string) (*Template, error)](https://devdocs.io/go/fmt/index#Template.ParseFiles)
*   [func (t *Template) ParseGlob(pattern string) (*Template, error)](https://devdocs.io/go/fmt/index#Template.ParseGlob)
*   [func (t *Template) Templates() []*Template](https://devdocs.io/go/fmt/index#Template.Templates)
*   [type URL](https://devdocs.io/go/fmt/index#URL)

### Package files

attr.go attr_string.go content.go context.go css.go delim_string.go doc.go element_string.go error.go escape.go html.go js.go jsctx_string.go state_string.go template.go transition.go url.go urlpart_string.go

## func HTMLEscape

```go
func HTMLEscape(w io.Writer, b []byte)
```

## func HTMLEscapeString

```go
func HTMLEscapeString(s string) string
```

## func HTMLEscaper

```go
func HTMLEscaper(args ...any) string
```

## func IsTrue 1.6

```go
func IsTrue(val any) (truth, ok bool)
```

## func JSEscape

```go
func JSEscape(w io.Writer, b []byte)
```

## func JSEscapeString

```go
func JSEscapeString(s string) string
```

## func JSEscaper

```go
func JSEscaper(args ...any) string
```

## func URLQueryEscaper

```go
func URLQueryEscaper(args ...any) string
```

## type CSS

CSS encapsulates known safe content that matches any of:

1.  The CSS3 stylesheet production, such as `p { color: purple }`.
2.  The CSS3 rule production, such as `a[href=~"https:"].foo#bar`.
3.  CSS3 declaration productions, such as `color: red; margin: 2px`.
4.  The CSS3 value production, such as `rgba(0, 0, 255, 127)`.

See [https://www.w3.org/TR/css3-syntax/#parsing](https://www.w3.org/TR/css3-syntax/#parsing) and [https://web.archive.org/web/20090211114933/http://w3.org/TR/css3-syntax#style](https://web.archive.org/web/20090211114933/http://w3.org/TR/css3-syntax#style)

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

```go
type CSS string
```

Error describes a problem encountered during template Escaping.

```go
type Error struct {

    ErrorCode ErrorCode


    Node parse.Node

    Name string

    Line int

    Description string
}
```

```go
func (e *Error) Error() string
```

ErrorCode is a code for a kind of error.

```go
type ErrorCode int
```

Output: "ZgotmplZ" Example:

```go
<img src="{{.X}}">
where {{.X}} evaluates to `javascript:...`
```

```go
"ZgotmplZ" is a special value that indicates that unsafe content reached a
CSS or URL context at runtime. The output of the example will be
  <img src="#ZgotmplZ">
If the data comes from a trusted source, use content types to exempt it
from filtering: URL(`javascript:...`).
```

## type FuncMap

```go
type FuncMap = template.FuncMap
```

HTML encapsulates a known safe HTML document fragment. It should not be used for HTML from a third-party, or HTML with unclosed tags or comments. The outputs of a sound HTML sanitizer and a template escaped by this package are fine for use with HTML.

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

```go
type HTML string
```

HTMLAttr encapsulates an HTML attribute from a trusted source, for example, ` dir="ltr"`.

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

```go
type HTMLAttr string
```

JS encapsulates a known safe EcmaScript5 Expression, for example, `(x + y * z())`. Template authors are responsible for ensuring that typed expressions do not break the intended precedence and that there is no statement/expression ambiguity as when passing an expression like "{ foo: bar() }\n['foo']()", which is both a valid Expression and a valid Program with a very different meaning.

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

Using JS to include valid but untrusted JSON is not safe. A safe alternative is to parse the JSON with json.Unmarshal and then pass the resultant object into the template, where it will be converted to sanitized JSON when presented in a JavaScript context.

```go
type JS string
```

JSStr encapsulates a sequence of characters meant to be embedded between quotes in a JavaScript expression. The string must match a series of StringCharacters:

```go
StringCharacter :: SourceCharacter but not `\` or LineTerminator
                 | EscapeSequence
```

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

```go
type JSStr string
```

Srcset encapsulates a known safe srcset attribute (see [https://w3c.github.io/html/semantics-embedded-content.html#element-attrdef-img-srcset](https://w3c.github.io/html/semantics-embedded-content.html#element-attrdef-img-srcset)).

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

```go
type Srcset string
```

Template is a specialized Template from "text/template" that produces a safe HTML document fragment.

```go
type Template struct {


    Tree *parse.Tree

}
```

Code:

```go
const (
    master  = `Names:{{block "list" .}}{{"\n"}}{{range .}}{{println "-" .}}{{end}}{{end}}`
    overlay = `{{define "list"}} {{join . ", "}}{{end}} `
)
var (
    funcs     = template.FuncMap{"join": strings.Join}
    guardians = []string{"Gamora", "Groot", "Nebula", "Rocket", "Star-Lord"}
)
masterTmpl, err := template.New("master").Funcs(funcs).Parse(master)
if err != nil {
    log.Fatal(err)
}
overlayTmpl, err := template.Must(masterTmpl.Clone()).Parse(overlay)
if err != nil {
    log.Fatal(err)
}
if err := masterTmpl.Execute(os.Stdout, guardians); err != nil {
    log.Fatal(err)
}
if err := overlayTmpl.Execute(os.Stdout, guardians); err != nil {
    log.Fatal(err)
}
```

```go
Names:
- Gamora
- Groot
- Nebula
- Rocket
- Star-Lord
Names: Gamora, Groot, Nebula, Rocket, Star-Lord
```

Here we demonstrate loading a set of templates from a directory.

Code:

```go


dir := createTestDir([]templateFile{

    {"T0.tmpl", `T0 invokes T1: ({{template "T1"}})`},

    {"T1.tmpl", `{{define "T1"}}T1 invokes T2: ({{template "T2"}}){{end}}`},

    {"T2.tmpl", `{{define "T2"}}This is T2{{end}}`},
})

defer os.RemoveAll(dir)


pattern := filepath.Join(dir, "*.tmpl")




tmpl := template.Must(template.ParseGlob(pattern))

err := tmpl.Execute(os.Stdout, nil)
if err != nil {
    log.Fatalf("template execution: %s", err)
}
```

```go
T0 invokes T1: (T1 invokes T2: (This is T2))
```

This example demonstrates one way to share some templates and use them in different contexts. In this variant we add multiple driver templates by hand to an existing bundle of templates.

Code:

```go


dir := createTestDir([]templateFile{

    {"T1.tmpl", `{{define "T1"}}T1 invokes T2: ({{template "T2"}}){{end}}`},

    {"T2.tmpl", `{{define "T2"}}This is T2{{end}}`},
})

defer os.RemoveAll(dir)


pattern := filepath.Join(dir, "*.tmpl")



templates := template.Must(template.ParseGlob(pattern))

_, err := templates.Parse("{{define `driver1`}}Driver 1 calls T1: ({{template `T1`}})\n{{end}}")
if err != nil {
    log.Fatal("parsing driver1: ", err)
}

_, err = templates.Parse("{{define `driver2`}}Driver 2 calls T2: ({{template `T2`}})\n{{end}}")
if err != nil {
    log.Fatal("parsing driver2: ", err)
}


err = templates.ExecuteTemplate(os.Stdout, "driver1", nil)
if err != nil {
    log.Fatalf("driver1 execution: %s", err)
}
err = templates.ExecuteTemplate(os.Stdout, "driver2", nil)
if err != nil {
    log.Fatalf("driver2 execution: %s", err)
}
```

```go
Driver 1 calls T1: (T1 invokes T2: (This is T2))
Driver 2 calls T2: (This is T2)
```

Here we demonstrate loading a set of templates from files in different directories

Code:

```go


dir1 := createTestDir([]templateFile{

    {"T1.tmpl", `T1 invokes T2: ({{template "T2"}})`},
})

dir2 := createTestDir([]templateFile{

    {"T2.tmpl", `{{define "T2"}}This is T2{{end}}`},
})


defer func(dirs ...string) {
    for _, dir := range dirs {
        os.RemoveAll(dir)
    }
}(dir1, dir2)



paths := []string{
    filepath.Join(dir1, "T1.tmpl"),
    filepath.Join(dir2, "T2.tmpl"),
}
tmpl := template.Must(template.ParseFiles(paths...))

err := tmpl.Execute(os.Stdout, nil)
if err != nil {
    log.Fatalf("template execution: %s", err)
}
```

```go
T1 invokes T2: (This is T2)
```

Code:

```go


dir := createTestDir([]templateFile{

    {"T0.tmpl", "T0 ({{.}} version) invokes T1: ({{template `T1`}})\n"},

    {"T1.tmpl", `{{define "T1"}}T1 invokes T2: ({{template "T2"}}){{end}}`},
})

defer os.RemoveAll(dir)


pattern := filepath.Join(dir, "*.tmpl")



drivers := template.Must(template.ParseGlob(pattern))





first, err := drivers.Clone()
if err != nil {
    log.Fatal("cloning helpers: ", err)
}

_, err = first.Parse("{{define `T2`}}T2, version A{{end}}")
if err != nil {
    log.Fatal("parsing T2: ", err)
}



second, err := drivers.Clone()
if err != nil {
    log.Fatal("cloning drivers: ", err)
}

_, err = second.Parse("{{define `T2`}}T2, version B{{end}}")
if err != nil {
    log.Fatal("parsing T2: ", err)
}



err = second.ExecuteTemplate(os.Stdout, "T0.tmpl", "second")
if err != nil {
    log.Fatalf("second execution: %s", err)
}
err = first.ExecuteTemplate(os.Stdout, "T0.tmpl", "first")
if err != nil {
    log.Fatalf("first: execution: %s", err)
}

```

```go
T0 (second version) invokes T1: (T1 invokes T2: (T2, version B))
T0 (first version) invokes T1: (T1 invokes T2: (T2, version A))
```

```go
func Must(t *Template, err error) *Template
```

```go
var t = template.Must(template.New("name").Parse("html"))
```

```go
func New(name string) *Template
```

### func ParseFS 1.16

```go
func ParseFS(fs fs.FS, patterns ...string) (*Template, error)
```

### func ParseFiles

```go
func ParseFiles(filenames ...string) (*Template, error)
```

When parsing multiple files with the same name in different directories, the last one mentioned will be the one that results. For instance, ParseFiles("a/foo", "b/foo") stores "b/foo" as the template named "foo", while "a/foo" is unavailable.

### func ParseGlob

```go
func ParseGlob(pattern string) (*Template, error)
```

When parsing multiple files with the same name in different directories, the last one mentioned will be the one that results.

### func (*Template) AddParseTree

```go
func (t *Template) AddParseTree(name string, tree *parse.Tree) (*Template, error)
```

It returns an error if t or any associated template has already been executed.

### func (*Template) Clone

```go
func (t *Template) Clone() (*Template, error)
```

It returns an error if t has already been executed.

### func (*Template) DefinedTemplates 1.6

```go
func (t *Template) DefinedTemplates() string
```

### func (*Template) Delims

```go
func (t *Template) Delims(left, right string) *Template
```

#### Example

Code:

```go
const text = "<<.Greeting>> {{.Name}}"

data := struct {
    Greeting string
    Name     string
}{
    Greeting: "Hello",
    Name:     "Joe",
}

t := template.Must(template.New("tpl").Delims("<<", ">>").Parse(text))

err := t.Execute(os.Stdout, data)
if err != nil {
    log.Fatal(err)
}

```

```go
Hello {{.Name}}
```

```go
func (t *Template) Execute(wr io.Writer, data any) error
```

### func (*Template) ExecuteTemplate

```go
func (t *Template) ExecuteTemplate(wr io.Writer, name string, data any) error
```

### func (*Template) Funcs

```go
func (t *Template) Funcs(funcMap FuncMap) *Template
```

### func (*Template) Lookup

```go
func (t *Template) Lookup(name string) *Template
```

### func (*Template) Name

```go
func (t *Template) Name() string
```

### func (*Template) New

```go
func (t *Template) New(name string) *Template
```

If a template with the given name already exists, the new HTML template will replace it. The existing template will be reset and disassociated with t.

### func (*Template) Option 1.5

```go
func (t *Template) Option(opt ...string) *Template
```

Known options:

missingkey: Control the behavior during execution if a map is indexed with a key that is not present in the map.

```go
"missingkey=default" or "missingkey=invalid"
The default behavior: Do nothing and continue execution.
If printed, the result of the index operation is the string
"<no value>".
"missingkey=zero"
The operation returns the zero value for the map type's element.
"missingkey=error"
Execution stops immediately with an error.
```

```go
func (t *Template) Parse(text string) (*Template, error)
```

Templates can be redefined in successive calls to Parse, before the first use of [Template.Execute](https://devdocs.io/go/fmt/index#Template.Execute) on t or any associated template. A template definition with a body containing only white space and comments is considered empty and will not replace an existing template's body. This allows using Parse to add new named template definitions without overwriting the main template body.

### func (*Template) ParseFS 1.16

```go
func (t *Template) ParseFS(fs fs.FS, patterns ...string) (*Template, error)
```

### func (*Template) ParseFiles

```go
func (t *Template) ParseFiles(filenames ...string) (*Template, error)
```

When parsing multiple files with the same name in different directories, the last one mentioned will be the one that results.

ParseFiles returns an error if t or any associated template has already been executed.

### func (*Template) ParseGlob

```go
func (t *Template) ParseGlob(pattern string) (*Template, error)
```

When parsing multiple files with the same name in different directories, the last one mentioned will be the one that results.

ParseGlob returns an error if t or any associated template has already been executed.

### func (*Template) Templates

```go
func (t *Template) Templates() []*Template
```

## type URL

URL encapsulates a known safe URL or URL substring (see RFC 3986). A URL like `javascript:checkThatFormNotEditedBeforeLeavingPage()` from a trusted source should go in the page, but by default dynamic `javascript:` URLs are filtered out since they are a frequently exploited injection vector.

Use of this type presents a security risk: the encapsulated content should come from a trusted source, as it will be included verbatim in the template output.

```go
type URL string
```
