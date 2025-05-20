# 󰌝 Link Localization   Relative Links in HTML

> There are tools built to fix up those janky relative links so everything works locally. Here’s the scoop:

#### Best Option: `wget` can already do this!

Before you reach for external tools, double-check how you used `wget`. If you use it like this:

```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent <htmlLink>
```

Then `--convert-links` tells `wget` to rewrite all relative links to point to the downloaded local versions. This is the cleanest and most native way.

If you didn’t use `--convert-links` initially, you might want to just redownload with that flag if possible.

---

#### Already downloaded? Use a post-processor:

If re-downloading isn’t an option, here are some tools that will do a good job:

##### linkchecker + some scripting
•	linkchecker can crawl your downloaded site and identify broken/missing links.
•	You can write a small Python script with BeautifulSoup or lxml to fix them based on local files.

### `htmltools` or `html-xml-utils`

These are CLI tools to manipulate HTML:

```bash
apt install html-xml-utils
hxnormalize -x index.html | hxwls
```

You can combine that with `sed`/`awk` or a Python script to replace links.

⸻

### DIY Python Script (actually not that hard)

If you’re comfortable writing a quick Python fix, here’s a base you can tweak:

from bs4 import BeautifulSoup
from pathlib import Path

root = Path("docs/")  # wherever you downloaded the docs

for html_file in root.rglob("*.html"):
    soup = BeautifulSoup(open(html_file, "r", encoding="utf-8"), "html.parser")

    for tag in soup.find_all(href=True):
        href = tag['href']
        if not href.startswith(("http", "#", "mailto:")) and not Path(href).is_absolute():
            target = (html_file.parent / href).resolve()
            if target.exists():
                tag['href'] = str(target.relative_to(html_file.parent))

    with open(html_file, "w", encoding="utf-8") as f:
        f.write(str(soup))

It rewrites only local links to relative paths based on the file location. You could add logic to fix src attributes too if needed.

⸻

You wanna go fast and clean? Re-run wget with the right flags. Want full control? Script it in Python.

Want me to help write a smarter version of that script for your exact folder structure? Just drop the folder layout or a couple sample HTML snippets.
