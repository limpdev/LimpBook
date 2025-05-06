# My Snippet Collection

> `wget`

```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent <LINK>
```

↳ **BEST METHOD FOR FULL-SITE-SCRAPE!** Ensures all links are properly converted to match the mirrored path structure... *will be resource heavy* 🗿.

---

<details><summary> <i>CONFIGURATION FOR <code>ESPANSO</code></i></summary>

```yaml
# espanso match file
# For a complete introduction, visit the official docs at: https://espanso.org/docs/
# You can use this file to define the base matches (aka snippets)
# that will be available in every application when using espanso.
# Matches are substitution rules: when you type the "trigger" string
# it gets replaced by the "replace" string.
matches:
    # Simple text replacement
    - trigger: ":espanso"
      replace: "Hi there!"
    # NOTE: espanso uses YAML to define matches, so pay attention to the indentation!
    # But matches can also be dynamic:
    # Print the current date
    - trigger: ":date"
      replace: "{{mydate}}"
      vars:
          - name: mydate
            type: date
            params:
                format: "%m/%d/%Y"
    # Print the output of a shell command -> RUN ACTUAL COMMANDS
    - trigger: ":shell"
      replace: "{{output}}"
      vars:
          - name: output
            type: shell
            params:
                cmd: "echo 'Hello from your shell'"
    # Pastes the syntax for powershell ENV variables...
    - trigger: ":path"
      replace: "$env:Path += ';'"
    - trigger: ":qq"
      replace: ":q!"
    # Colorful banners for GitHub Flavoured Markdown!
    - trigger: ":tip"
      replace: "> [!TIP] \n> $|$"
    - trigger: ":import"
      replace: "> [!IMPORTANT] \n> $|$"
    - trigger: ":note"
      replace: "> [!NOTE] \n> $|$"
    - trigger: ":warn"
      replace: "> [!WARNING] \n> $|$"
    - trigger: ":caut"
      replace: "> [!CAUTION] \n> $|$"
    # CODEBLOCKS & FRONTMATTER
    - trigger: ":pre"
      replace: "```bash\n$|$\n```"
    - trigger: ":go"
      replace: "```go\n$|$\n```"
    - trigger: ":python"
      replace: "```python\n$|$\n```"
    - trigger: ":javascript"
      replace: "```javascript\n$|$\n```"
    - trigger: ":fm"
      replace: "---\ntitle: $|$\ndraft: false\n---"
    - trigger: ":html"
      replace: "```html\n$|$\n```"
    - trigger: ":css"
      replace: "```css\n$|$\n```"
    # META (ESPANSO)
    - trigger: ":trigger"
      replace: "- trigger: $|$ \nreplace: "
    # HTML Icons & Images
    - trigger: ":img"
      replace: "<img width='96px' height='96px' style='position: relative; display: inline-flex; left: 50px; border-radius:10px;' src='$|$' />"
    - trigger: ":link"
      replace: "[$|$](@)"
    - trigger: ":email"
      replace: "drewjgorbet@outlook.com"
    - trigger: ":gmail"
      replace: "drewjgorbet@gmail.com"
    - trigger: ":devmail"
      replace: "drewgorbet2020@gmail.com"
    - trigger: ":shitmail"
      replace: "andygorbet@gmail.com"
    - trigger: ":icon"
      replace: "<i class='$|$'></i>"
    - trigger: ":div"
      replace: "<div>$|$</div>"
    - trigger: ":body"
      replace: "<body>$|$</body>"
    - trigger: "!import"
      replace: "!important;"
    - trigger: ":comment"
      replace: "/* $|$ */"
    - trigger: ":list"
      replace: "<details><summary><strong>$|$</strong></summary>\n</details>"
    - trigger: ":alias"
      replace: "Set-Alias ^ '$|$'"
    - trigger: ":anchor"
      replace: "<a href='#$|$'>$|$</a>"
    - trigger: ":htmlcom"
      replace: "<!-- $|$ -->"
    - trigger: ":details"
      replace: "<details><summary>🎁<i></i></summary>\n$|$\n</details>\n"
    #################################################################################################
    - trigger: ";js"
      replace: "  "
    - trigger: ";ts"
      replace: "  "
    - trigger: ";py"
      replace: "  "
    - trigger: ";go"
      replace: "  "
    - trigger: ";rs"
      replace: "  "
    - trigger: ";html"
      replace: "  "
    - trigger: ";css"
      replace: "  "
    - trigger: ";rb"
      replace: "  "
    - trigger: ";java"
      replace: "  "
    - trigger: ";cpp"
      replace: "  "
    - trigger: ";tail"
      replace: "  "
    - trigger: ";vue"
      replace: "  "
    - trigger: ";svelte"
      replace: "  "
    - trigger: ";gh"
      replace: "  "
    - trigger: ";git"
      replace: "  "
    - trigger: ";dock"
      replace: "  "
    - trigger: ";app"
      replace: "  "
    - trigger: ";win"
      replace: "  "
    - trigger: ";lin"
      replace: "  "
    - trigger: ";apache"
      replace: "  "
    - trigger: ";vsc"
      replace: "  "
    - trigger: ";vim"
      replace: "  "
    - trigger: ";bolt"
      replace: "  "
    - trigger: ";rock"
      replace: "   "
    - trigger: ";md"
      replace: "  "
    - trigger: ";bash"
      replace: "  "
    - trigger: ";shell"
      replace: " 󰨊 "
    - trigger: ";txt"
      replace: "  "
    - trigger: ";pref"
      replace: "  "
    - trigger: ";wand"
      replace: "  "
    - trigger: ";ext"
      replace: "  "
    - trigger: ";fig"
      replace: "  "
    - trigger: ";tool"
      replace: " 󱁤 "
    - trigger: ";pretty"
      replace: "  "
    - trigger: "nvim"
      replace: "  "
    - trigger: ";GO"
      replace: " 󰟓 "
    - trigger: ";chrome"
      replace: "  "
```
</details>

---

==..more soon..==
