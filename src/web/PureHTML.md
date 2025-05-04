# What is “HTML sanitization” really?

It’s the process of removing or rewriting undesirable parts of HTML. That could mean:
• Stripping tags (like `<span>`, `<script>`, `<style>`)
• Removing unwanted attributes (onclick, class, style)
• Normalizing tag nesting
• Flattening/decoding entities ( , etc.)
• Whitespace cleanup (esp. inside `<pre>`, `<code>`, etc.)

## How to sanitize HTML in Go

You’ve got a couple solid options:

> Use bluemonday (the de facto Go sanitizer)

go get github.com/microcosm-cc/bluemonday

Example:

```go
import "github.com/microcosm-cc/bluemonday"

p := bluemonday.NewPolicy()
p.AllowElements("pre", "code") // whitelist only what you want

clean := p.Sanitize(html) // removes everything else

You can build custom policies:

p := bluemonday.UGCPolicy() // Good base for user content
p.AllowElements("h1", "h2", "pre", "code")
```

✅ 2. Use goquery to surgically remove junk

```go
doc.Find("span").Each(func(i int, s \*goquery.Selection) {
s.ReplaceWithHtml(s.Text()) // nukes <span>, keeps content
})
```

> This is great when you’re only trying to remove visual clutter, like syntax highlight wrappers.

⸻

✅ Non-Security Benefits of Sanitization

1. Simpler, cleaner source
   You won’t be debugging invisible <span> tags or weird inline styles 3 weeks from now.

2. Easier to parse/search/index

You can grep for func main() or render snippets without styling artifacts.

3. Consistency
   Especially helpful if you’re aggregating content from multiple sources (like docs, blogs, StackOverflow, etc.)

4. Performance
   Less markup = smaller payload = faster rendering (especially if you ever export this as static HTML).

5. No CSS/JS surprises
   Unwanted classes/styles/scripts won’t break your layout or cause side effects.

⸻

`TL;DR`

Even for personal docs:
• Sanitization keeps code blocks clean, readable, and consistent
• Use bluemonday for quick, declarative sanitization
• Use goquery for surgical removal of annoying tags like <span>
• You’re not just dodging security issues—you’re future-proofing your workflow
