This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a ==packed representation== of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

## Additional Info

# Directory Structure
```
themes/
  dwBlur.json
  theme-outline.md
extension.toml
```

# Files

## File: themes/dwBlur.json
````json
{
  "$schema": "https://zed.dev/schema/themes/v0.2.0.json",
  "name": "dwBlur",
  "author": "Limp Cheney <github.com/limpdev>",
  "themes": [
    {
      "name": "dwBlur",
      "appearance": "dark",
      "style": {
        "accents": [
          "#c6aaf666",
          "#bac1f766",
          "#8cc7e766",
          "#add8a866",
          "#e6d4b066",
          "#ecb19766",
          "#e696a966"
        ],
        "background.appearance": "blurred",
        "border": "#303036b2",
        "border.variant": "#303036b2",
        "border.focused": "#303036b2",
        "border.selected": "#303036b2",
        "border.transparent": "#303036b2",
        "border.disabled": "#303036b2",
        "elevated_surface.background": "#0d0d0fb3",
        "surface.background": "#000000f2",
        "background": "#111217bf",
        "element.background": "#0d1117",
        "element.hover": "#494d644d",
        "element.active": "#00000000",
        "element.selected": "#363a4f4d",
        "element.disabled": "#6e738d",
        "drop_target.background": "#0d0d0fb3",
        "ghost_element.background": "#18192659",
        "ghost_element.hover": "#f4dbd608",
        "ghost_element.active": "#f4dbd612",
        "ghost_element.selected": "#f4dbd612",
        "ghost_element.disabled": "#6e738d",
        "text": "#cad3f5",
        "text.muted": "#b8c0e0",
        "text.placeholder": "#5b6078",
        "text.disabled": "#494d64",
        "text.accent": "#c6a0f6",
        "icon": "#dadadad9",
        "icon.muted": "#8087a2",
        "icon.disabled": "#6e738d",
        "icon.placeholder": "#5b6078",
        "icon.accent": "#c6a0f6",
        "status_bar.background": "#0d0d0fb3",
        "title_bar.background": "#0d0d0fb3",
        "title_bar.inactive_background": "#0d0d0fb3",
        "toolbar.background": "#0d0d0fb3",
        "tab_bar.background": "#0d0d0fb3",
        "tab.inactive_background": "#0d0d0fb3",
        "tab.active_background": "#0d0d0fb3",
        "search.match_background": "#8bd5ca33",
        "panel.background": "#00000000",
        "panel.focused_border": "#00000000",
        "panel.indent_guide": "#363a4f99",
        "panel.indent_guide_active": "#5b6078",
        "panel.indent_guide_hover": "#c6a0f6",
        "pane.focused_border": "#cad3f5",
        "pane_group.border": "#363a4f",
        "scrollbar.thumb.background": "#000000",
        "scrollbar.thumb.hover_background": "#6e738d",
        "scrollbar.thumb.border": "#c6a0f6",
        "scrollbar.track.background": "#00000000",
        "scrollbar.track.border": "#00000000",
        "editor.foreground": "#cad3f5",
        "editor.background": "#00000000",
        "editor.gutter.background": "#00000000",
        "editor.subheader.background": "#1e2030",
        "editor.active_line.background": "#00000000",
        "editor.highlighted_line.background": "#f4dbd612",
        "editor.line_number": "#ffffff20",
        "editor.active_line_number": "#f4dbd690",
        "editor.invisible": "#939ab766",
        "editor.wrap_guide": "#5b6078",
        "editor.active_wrap_guide": "#5b6078",
        "editor.document_highlight.bracket_background": "#f4dbd640",
        "editor.document_highlight.read_background": "#a5adcb29",
        "editor.document_highlight.write_background": "#a5adcb29",
        "editor.indent_guide": "#363a4f99",
        "editor.indent_guide_active": "#5b6078",
        "terminal.background": "#09090ad8",
        "terminal.ansi.background": "#09090ad8",
        "terminal.foreground": "#cad3f5",
        "terminal.dim_foreground": "#8087a2",
        "terminal.bright_foreground": "#cad3f5",
        "terminal.ansi.black": "#494d64",
        "terminal.ansi.red": "#ed8796",
        "terminal.ansi.green": "#a6da95",
        "terminal.ansi.yellow": "#eed49f",
        "terminal.ansi.blue": "#8aadf4",
        "terminal.ansi.magenta": "#f5bde6",
        "terminal.ansi.cyan": "#8bd5ca",
        "terminal.ansi.white": "#b8c0e0",
        "terminal.ansi.bright_black": "#5b6078",
        "terminal.ansi.bright_red": "#ed8796",
        "terminal.ansi.bright_green": "#a6da95",
        "terminal.ansi.bright_yellow": "#eed49f",
        "terminal.ansi.bright_blue": "#8aadf4",
        "terminal.ansi.bright_magenta": "#f5bde6",
        "terminal.ansi.bright_cyan": "#8bd5ca",
        "terminal.ansi.bright_white": "#a5adcb",
        "terminal.ansi.dim_black": "#494d64",
        "terminal.ansi.dim_red": "#ed8796",
        "terminal.ansi.dim_green": "#a6da95",
        "terminal.ansi.dim_yellow": "#eed49f",
        "terminal.ansi.dim_blue": "#8aadf4",
        "terminal.ansi.dim_magenta": "#f5bde6",
        "terminal.ansi.dim_cyan": "#8bd5ca",
        "terminal.ansi.dim_white": "#b8c0e0",
        "link_text.hover": "#91d7e3",
        "conflict": "#eed49f",
        "conflict.border": "#eed49f",
        "conflict.background": "#1e2030",
        "created": "#a6da95",
        "created.border": "#a6da95",
        "created.background": "#1e2030",
        "deleted": "#ed8796",
        "deleted.border": "#ed8796",
        "deleted.background": "#1e2030",
        "hidden": "#6e738d",
        "hidden.border": "#6e738d",
        "hidden.background": "#1e2030",
        "hint": "#5b6078",
        "hint.border": "#5b6078",
        "hint.background": "#1a1a1ac0",
        "ignored": "#6e738d",
        "ignored.border": "#6e738d",
        "ignored.background": "#1e2030",
        "modified": "#eed49f",
        "modified.border": "#eed49f",
        "modified.background": "#1e2030",
        "predictive": "#6e738d",
        "predictive.border": "#b7bdf8",
        "predictive.background": "#1e2030",
        "renamed": "#7dc4e4",
        "renamed.border": "#7dc4e4",
        "renamed.background": "#1e2030",
        "info": "#8bd5ca",
        "info.border": "#8bd5ca",
        "info.background": "#7ab3b3",
        "warning": "#eed49f",
        "warning.border": "#eed49f",
        "warning.background": "#d3a168",
        "error": "#ed8796",
        "error.border": "#ed8796",
        "error.background": "#ed8796",
        "success": "#a6da95",
        "success.border": "#a6da95",
        "success.background": "#8cbe6c",
        "unreachable": "#ed8796",
        "unreachable.border": "#ed8796",
        "unreachable.background": "#ed87961f",
        "players": [
          {
            "cursor": "#f4dbd6",
            "selection": "#5b607880",
            "background": "#f4dbd6"
          },
          {
            "cursor": "#c6aaf6",
            "selection": "#c6aaf633",
            "background": "#c6aaf6"
          },
          {
            "cursor": "#bac1f7",
            "selection": "#bac1f733",
            "background": "#bac1f7"
          },
          {
            "cursor": "#8cc7e7",
            "selection": "#8cc7e733",
            "background": "#8cc7e7"
          },
          {
            "cursor": "#add8a8",
            "selection": "#add8a833",
            "background": "#add8a8"
          },
          {
            "cursor": "#e6d4b0",
            "selection": "#e6d4b033",
            "background": "#e6d4b0"
          },
          {
            "cursor": "#ecb197",
            "selection": "#ecb19733",
            "background": "#ecb197"
          },
          {
            "cursor": "#e696a9",
            "selection": "#e696a933",
            "background": "#e696a9"
          }
        ],
        "syntax": {
          "variable": {
            "color": "#4a8c45",
            "font_style": null,
            "font_weight": null
          },
          "variable.builtin": {
            "color": "#ed8796",
            "font_style": null,
            "font_weight": null
          },
          "variable.parameter": {
            "color": "#ee99a0",
            "font_style": null,
            "font_weight": null
          },
          "variable.member": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "variable.special": {
            "color": "#f5bde6",
            "font_style": "italic",
            "font_weight": null
          },
          "constant": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "constant.builtin": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "constant.macro": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "module": {
            "color": "#eed49f",
            "font_style": "italic",
            "font_weight": null
          },
          "label": {
            "color": "#7dc4e4",
            "font_style": null,
            "font_weight": null
          },
          "string": {
            "color": "#6d838c",
            "font_style": null,
            "font_weight": null
          },
          "string.documentation": {
            "color": "#8bd5ca",
            "font_style": null,
            "font_weight": null
          },
          "string.regexp": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "string.escape": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "string.special": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "string.special.path": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "string.special.symbol": {
            "color": "#f0c6c6",
            "font_style": null,
            "font_weight": null
          },
          "string.special.url": {
            "color": "#f4dbd6",
            "font_style": "italic",
            "font_weight": null
          },
          "character": {
            "color": "#8bd5ca",
            "font_style": null,
            "font_weight": null
          },
          "character.special": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "boolean": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "number": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "number.float": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "type": {
            "color": "#eed49f",
            "font_style": null,
            "font_weight": null
          },
          "type.builtin": {
            "color": "#c6a0f6",
            "font_style": "italic",
            "font_weight": null
          },
          "type.definition": {
            "color": "#eed49f",
            "font_style": null,
            "font_weight": null
          },
          "type.interface": {
            "color": "#eed49f",
            "font_style": "italic",
            "font_weight": null
          },
          "type.super": {
            "color": "#eed49f",
            "font_style": "italic",
            "font_weight": null
          },
          "attribute": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "property": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "function": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "function.builtin": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "function.call": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "function.macro": {
            "color": "#8bd5ca",
            "font_style": null,
            "font_weight": null
          },
          "function.method": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "function.method.call": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "constructor": {
            "color": "#f0c6c6",
            "font_style": null,
            "font_weight": null
          },
          "operator": {
            "color": "#91d7e3",
            "font_style": null,
            "font_weight": null
          },
          "keyword": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.modifier": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.type": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.coroutine": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.function": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.operator": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.import": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.repeat": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.return": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.debug": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.exception": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.conditional": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.conditional.ternary": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.directive": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.directive.define": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "keyword.export": {
            "color": "#91d7e3",
            "font_style": null,
            "font_weight": null
          },
          "punctuation": {
            "color": "#939ab7",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.delimiter": {
            "color": "#939ab7",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.bracket": {
            "color": "#939ab7",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.special": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.special.symbol": {
            "color": "#f0c6c6",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.list_marker": {
            "color": "#8bd5ca",
            "font_style": null,
            "font_weight": null
          },
          "comment": {
            "color": "#939ab7",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.doc": {
            "color": "#939ab7",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.documentation": {
            "color": "#939ab7",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.error": {
            "color": "#ed8796",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.warning": {
            "color": "#eed49f",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.hint": {
            "color": "#8aadf4",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.todo": {
            "color": "#f0c6c6",
            "font_style": "italic",
            "font_weight": null
          },
          "comment.note": {
            "color": "#f4dbd6",
            "font_style": "italic",
            "font_weight": null
          },
          "diff.plus": {
            "color": "#a6da95",
            "font_style": null,
            "font_weight": null
          },
          "diff.minus": {
            "color": "#ed8796",
            "font_style": null,
            "font_weight": null
          },
          "tag": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "tag.attribute": {
            "color": "#eed49f",
            "font_style": "italic",
            "font_weight": null
          },
          "tag.delimiter": {
            "color": "#8bd5ca",
            "font_style": null,
            "font_weight": null
          },
          "parameter": {
            "color": "#ee99a0",
            "font_style": null,
            "font_weight": null
          },
          "field": {
            "color": "#b7bdf8",
            "font_style": null,
            "font_weight": null
          },
          "namespace": {
            "color": "#eed49f",
            "font_style": "italic",
            "font_weight": null
          },
          "float": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "symbol": {
            "color": "#f5bde6",
            "font_style": null,
            "font_weight": null
          },
          "string.regex": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "text": {
            "color": "#cad3f5",
            "font_style": null,
            "font_weight": null
          },
          "emphasis.strong": {
            "color": "#ee99a0",
            "font_style": null,
            "font_weight": 700
          },
          "emphasis": {
            "color": "#ee99a0",
            "font_style": "italic",
            "font_weight": null
          },
          "embedded": {
            "color": "#ee99a0",
            "font_style": null,
            "font_weight": null
          },
          "text.literal": {
            "color": "#a6da95",
            "font_style": null,
            "font_weight": null
          },
          "concept": {
            "color": "#7dc4e4",
            "font_style": null,
            "font_weight": null
          },
          "enum": {
            "color": "#8bd5ca",
            "font_style": null,
            "font_weight": 700
          },
          "function.decorator": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "type.class.definition": {
            "color": "#eed49f",
            "font_style": null,
            "font_weight": 700
          },
          "hint": {
            "color": "#5b6078",
            "font_style": "italic",
            "font_weight": null
          },
          "link_text": {
            "color": "#8aadf4",
            "font_style": null,
            "font_weight": null
          },
          "link_uri": {
            "color": "#f4dbd6",
            "font_style": "italic",
            "font_weight": null
          },
          "parent": {
            "color": "#f5a97f",
            "font_style": null,
            "font_weight": null
          },
          "predictive": {
            "color": "#6e738d",
            "font_style": null,
            "font_weight": null
          },
          "predoc": {
            "color": "#ed8796",
            "font_style": null,
            "font_weight": null
          },
          "primary": {
            "color": "#ee99a0",
            "font_style": null,
            "font_weight": null
          },
          "tag.doctype": {
            "color": "#c6a0f6",
            "font_style": null,
            "font_weight": null
          },
          "string.doc": {
            "color": "#8bd5ca",
            "font_style": "italic",
            "font_weight": null
          },
          "title": {
            "color": "#cad3f5",
            "font_style": null,
            "font_weight": 800
          },
          "variant": {
            "color": "#ed8796",
            "font_style": null,
            "font_weight": null
          }
        }
      }
    }
  ]
}
````

## File: themes/theme-outline.md
````markdown
```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "ThemeFamilyContent",
    "description": "The content of a serialized theme family.",
    "type": "object",
    "required": ["author", "name", "themes"],
    "properties": {
        "author": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "themes": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/ThemeContent"
            }
        }
    },
    "definitions": {
        "AccentContent": {
            "type": ["string", "null"]
        },
        "AppearanceContent": {
            "type": "string",
            "enum": ["light", "dark"]
        },
        "FontStyleContent": {
            "type": "string",
            "enum": ["normal", "italic", "oblique"]
        },
        "HighlightStyleContent": {
            "type": "object",
            "properties": {
                "background_color": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "color": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "font_style": {
                    "default": null,
                    "anyOf": [
                        {
                            "$ref": "#/definitions/FontStyleContent"
                        },
                        {
                            "type": "null"
                        }
                    ]
                },
                "font_weight": {
                    "default": null,
                    "anyOf": [
                        {
                            "enum": [
                                100, 200, 300, 400, 500, 600, 700, 800, 900
                            ]
                        },
                        {
                            "type": "null"
                        }
                    ]
                }
            }
        },
        "PlayerColorContent": {
            "type": "object",
            "properties": {
                "background": {
                    "type": ["string", "null"]
                },
                "cursor": {
                    "type": ["string", "null"]
                },
                "selection": {
                    "type": ["string", "null"]
                }
            }
        },
        "ThemeContent": {
            "description": "The content of a serialized theme.",
            "type": "object",
            "required": ["appearance", "name", "style"],
            "properties": {
                "appearance": {
                    "$ref": "#/definitions/AppearanceContent"
                },
                "name": {
                    "type": "string"
                },
                "style": {
                    "$ref": "#/definitions/ThemeStyleContent"
                }
            }
        },
        "ThemeStyleContent": {
            "description": "The content of a serialized theme.",
            "type": "object",
            "properties": {
                "accents": {
                    "default": [],
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/AccentContent"
                    }
                },
                "background": {
                    "description": "Background Color. Used for the app background and blank panels or windows.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "background.appearance": {
                    "default": null,
                    "anyOf": [
                        {
                            "$ref": "#/definitions/WindowBackgroundContent"
                        },
                        {
                            "type": "null"
                        }
                    ]
                },
                "border": {
                    "description": "Border color. Used for most borders, is usually a high contrast color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "border.disabled": {
                    "description": "Border color. Used for disabled elements, like a disabled input or button.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "border.focused": {
                    "description": "Border color. Used for focused elements, like keyboard focused list item.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "border.selected": {
                    "description": "Border color. Used for selected elements, like an active search filter or selected checkbox.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "border.transparent": {
                    "description": "Border color. Used for transparent borders. Used for placeholder borders when an element gains a border on state change.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "border.variant": {
                    "description": "Border color. Used for deemphasized borders, like a visual divider between two sections",
                    "default": null,
                    "type": ["string", "null"]
                },
                "conflict": {
                    "description": "Indicates some kind of conflict, like a file changed on disk while it was open, or merge conflicts in a Git repository.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "conflict.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "conflict.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "created": {
                    "description": "Indicates something new, like a new file added to a Git repository.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "created.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "created.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "deleted": {
                    "description": "Indicates that something no longer exists, like a deleted file.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "deleted.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "deleted.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "drop_target.background": {
                    "description": "Background Color. Used for the area that shows where a dragged element will be dropped.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.active_line.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.active_line_number": {
                    "description": "Text Color. Used for the text of the line number in the editor gutter when the line is highlighted.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.active_wrap_guide": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.document_highlight.bracket_background": {
                    "description": "Highlighted brackets background color.\n\nMatching brackets in the cursor scope are highlighted with this background color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.document_highlight.read_background": {
                    "description": "Read-access of a symbol, like reading a variable.\n\nA document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.document_highlight.write_background": {
                    "description": "Read-access of a symbol, like reading a variable.\n\nA document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.foreground": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.gutter.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.highlighted_line.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.indent_guide": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.indent_guide_active": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.invisible": {
                    "description": "Text Color. Used to mark invisible characters in the editor.\n\nExample: spaces, tabs, carriage returns, etc.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.line_number": {
                    "description": "Text Color. Used for the text of the line number in the editor gutter.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.subheader.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "editor.wrap_guide": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "element.active": {
                    "description": "Background Color. Used for the active state of an element that should have a different background than the surface it's on.\n\nActive states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "element.background": {
                    "description": "Background Color. Used for the background of an element that should have a different background than the surface it's on.\n\nElements might include: Buttons, Inputs, Checkboxes, Radio Buttons...\n\nFor an element that should have the same background as the surface it's on, use `ghost_element_background`.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "element.disabled": {
                    "description": "Background Color. Used for the disabled state of an element that should have a different background than the surface it's on.\n\nDisabled states are shown when a user cannot interact with an element, like a disabled button or input.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "element.hover": {
                    "description": "Background Color. Used for the hover state of an element that should have a different background than the surface it's on.\n\nHover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "element.selected": {
                    "description": "Background Color. Used for the selected state of an element that should have a different background than the surface it's on.\n\nSelected states are triggered by the element being selected (or \"activated\") by the user.\n\nThis could include a selected checkbox, a toggleable button that is toggled on, etc.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "elevated_surface.background": {
                    "description": "Background color. Used for elevated surfaces, like a context menu, popup, or dialog.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "error": {
                    "description": "Indicates a system error, a failed operation or a diagnostic error.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "error.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "error.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "ghost_element.active": {
                    "description": "Background Color. Used for the active state of a ghost element that should have the same background as the surface it's on.\n\nActive states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "ghost_element.background": {
                    "description": "Used for the background of a ghost element that should have the same background as the surface it's on.\n\nElements might include: Buttons, Inputs, Checkboxes, Radio Buttons...\n\nFor an element that should have a different background than the surface it's on, use `element_background`.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "ghost_element.disabled": {
                    "description": "Background Color. Used for the disabled state of a ghost element that should have the same background as the surface it's on.\n\nDisabled states are shown when a user cannot interact with an element, like a disabled button or input.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "ghost_element.hover": {
                    "description": "Background Color. Used for the hover state of a ghost element that should have the same background as the surface it's on.\n\nHover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "ghost_element.selected": {
                    "description": "Background Color. Used for the selected state of a ghost element that should have the same background as the surface it's on.\n\nSelected states are triggered by the element being selected (or \"activated\") by the user.\n\nThis could include a selected checkbox, a toggleable button that is toggled on, etc.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "hidden": {
                    "description": "Represents a hidden status, such as a file being hidden in a file tree.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "hidden.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "hidden.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "hint": {
                    "description": "Indicates a hint or some kind of additional information.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "hint.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "hint.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "icon": {
                    "description": "Fill Color. Used for the default fill color of an icon.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "icon.accent": {
                    "description": "Fill Color. Used for the accent fill color of an icon.\n\nThis might be used to show when a toggleable icon button is selected.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "icon.disabled": {
                    "description": "Fill Color. Used for the disabled fill color of an icon.\n\nDisabled states are shown when a user cannot interact with an element, like a icon button.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "icon.muted": {
                    "description": "Fill Color. Used for the muted or deemphasized fill color of an icon.\n\nThis might be used to show an icon in an inactive pane, or to demphasize a series of icons to give them less visual weight.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "icon.placeholder": {
                    "description": "Fill Color. Used for the placeholder fill color of an icon.\n\nThis might be used to show an icon in an input that disappears when the user enters text.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "ignored": {
                    "description": "Indicates that something is deliberately ignored, such as a file or operation ignored by Git.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "ignored.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "ignored.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "info": {
                    "description": "Represents informational status updates or messages.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "info.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "info.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "link_text.hover": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "modified": {
                    "description": "Indicates a changed or altered status, like a file that has been edited.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "modified.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "modified.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "pane.focused_border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "pane_group.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "panel.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "panel.focused_border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "panel.indent_guide": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "panel.indent_guide_active": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "panel.indent_guide_hover": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "players": {
                    "default": [],
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/PlayerColorContent"
                    }
                },
                "predictive": {
                    "description": "Indicates something that is predicted, like automatic code completion, or generated code.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "predictive.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "predictive.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "renamed": {
                    "description": "Represents a renamed status, such as a file that has been renamed.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "renamed.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "renamed.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "scrollbar.thumb.background": {
                    "description": "The color of the scrollbar thumb.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "scrollbar.thumb.border": {
                    "description": "The border color of the scrollbar thumb.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "scrollbar.thumb.hover_background": {
                    "description": "The color of the scrollbar thumb when hovered over.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "scrollbar.track.background": {
                    "description": "The background color of the scrollbar track.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "scrollbar.track.border": {
                    "description": "The border color of the scrollbar track.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "search.match_background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "status_bar.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "success": {
                    "description": "Indicates a successful operation or task completion.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "success.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "success.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "surface.background": {
                    "description": "Background Color. Used for grounded surfaces like a panel or tab.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "syntax": {
                    "description": "The styles for syntax nodes.",
                    "default": {},
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/HighlightStyleContent"
                    }
                },
                "tab.active_background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "tab.inactive_background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "tab_bar.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.background": {
                    "description": "Terminal ANSI background color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.black": {
                    "description": "Black ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.blue": {
                    "description": "Blue ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_black": {
                    "description": "Bright black ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_blue": {
                    "description": "Bright blue ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_cyan": {
                    "description": "Bright cyan ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_green": {
                    "description": "Bright green ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_magenta": {
                    "description": "Bright magenta ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_red": {
                    "description": "Bright red ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_white": {
                    "description": "Bright white ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.bright_yellow": {
                    "description": "Bright yellow ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.cyan": {
                    "description": "Cyan ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_black": {
                    "description": "Dim black ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_blue": {
                    "description": "Dim blue ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_cyan": {
                    "description": "Dim cyan ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_green": {
                    "description": "Dim green ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_magenta": {
                    "description": "Dim magenta ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_red": {
                    "description": "Dim red ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_white": {
                    "description": "Dim white ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.dim_yellow": {
                    "description": "Dim yellow ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.green": {
                    "description": "Green ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.magenta": {
                    "description": "Magenta ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.red": {
                    "description": "Red ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.white": {
                    "description": "White ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.ansi.yellow": {
                    "description": "Yellow ANSI terminal color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.background": {
                    "description": "Terminal background color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.bright_foreground": {
                    "description": "Bright terminal foreground color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.dim_foreground": {
                    "description": "Dim terminal foreground color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "terminal.foreground": {
                    "description": "Terminal foreground color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "text": {
                    "description": "Text Color. Default text color used for most text.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "text.accent": {
                    "description": "Text Color. Color used for emphasis or highlighting certain text, like an active filter or a matched character in a search.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "text.disabled": {
                    "description": "Text Color. Color used for text denoting disabled elements. Typically, the color is faded or grayed out to emphasize the disabled state.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "text.muted": {
                    "description": "Text Color. Color of muted or deemphasized text. It is a subdued version of the standard text color.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "text.placeholder": {
                    "description": "Text Color. Color of the placeholder text typically shown in input fields to guide the user to enter valid data.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "title_bar.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "title_bar.inactive_background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "toolbar.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "unreachable": {
                    "description": "Indicates some kind of unreachable status, like a block of code that can never be reached.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "unreachable.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "unreachable.border": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "warning": {
                    "description": "Represents a warning status, like an operation that is about to fail.",
                    "default": null,
                    "type": ["string", "null"]
                },
                "warning.background": {
                    "default": null,
                    "type": ["string", "null"]
                },
                "warning.border": {
                    "default": null,
                    "type": ["string", "null"]
                }
            }
        },
        "WindowBackgroundContent": {
            "description": "The background appearance of the window.",
            "type": "string",
            "enum": ["opaque", "transparent", "blurred"]
        }
    }
}
```
````

## File: extension.toml
````toml
id = "dwBlur"
name = "dwBlur Themes"
version = "0.2.0"
schema_version = 1
description = "Reinventing the wheel... what do all these numbers mean?"
repository = "https://github.com/limpdev"
authors = ["Limp Cheney <github.com/limpdev>"]
themes = ["themes/dwBlur.json"]
languages = []

[lib]

[grammars]

[language_servers]

[context_servers]

[slash_commands]

[indexed_docs_providers]
````
