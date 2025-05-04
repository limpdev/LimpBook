# Utilizing JavaScript Libraries | mdBook

About using slick component libraries (like `RewindUI` or `Flowise`) inside an `mdBook` setup, which is basically a static Markdown-based site generator made in Rust.

*Out of the box*, mdBook **doesn’t** support modern JS frameworks or React-based component libraries — it’s super minimal and kind of old-school (just Markdown → HTML). But with a little hacking, you can totally integrate some of that vibe.

⸻

## What You Can Do (Realistically)

### Inject Custom JS + CSS

This is the most “mdBook-native” way to bring in outside UI components.

1. Copy the RewindUI or Flowise styles/scripts (likely from a CDN or build output).
2. Place them in book/src/ or a theme/ directory.
3. Edit book.toml to include them:


```toml
[output.html]
additional-css = ["theme/rewind.css"]
additional-js = ["theme/rewind.js"]
```

4.	Use raw HTML in your Markdown to reference their components.

BUT: RewindUI is Tailwind/React. Flowise is a whole app. You can’t just drop React components into Markdown and expect magic — unless you add a build pipeline.

⸻

### Build a Hybrid Setup

> [!TIP]
> If you’re feeling spicy, here’s the more forward-thinking, modern path -> Make mdBook serve as the “docs engine”, and embed React micro-frontends (MFE) inside specific pages.

- Wrap your mdBook output in a custom HTML template (via preprocessor or custom theme).
- Mount `<div id="rewind-app"></div>` blocks inside your .md files using raw HTML.
- Bundle your React components with Vite or webpack.
- Inject the bundle + mount logic via custom JS in book.toml.

↪ This is similar to how Docusaurus allows MD + React, but you’re kind of faking it here.

⸻

### Ditch mdBook & Go Full `React`

If you want full RewindUI/Flowise power — honestly — just switch to something like:

- Next.js (React + MDX support out of the box)
- Astro (lets you write Markdown and drop in React components)
- Docusaurus (MDX + versioned docs + React UI)

Those platforms let you **natively** do what you’re trying to hack into mdBook.

⸻
