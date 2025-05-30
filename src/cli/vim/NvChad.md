
                             ▄▄         ▄ ▄▄▄▄▄▄▄  `
                           `▄▀███▄     ▄██ █████▀ `
                           `██▄▀███▄   ███        `
                           `███  ▀███▄ ███        `
                           `███    ▀██ ███        `
                           `███      ▀ ███        `
                           `▀██ █████▄▀█▀▄██████▄ `
                           `  ▀ ▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀▀`
```
CONTENTS                                                         *nvui.contents* 
 
 1. `Introduction`                                      |nvui.intro|
    1.1 UI & Base46 Plugin Install                    |nvui.plugin-install|
 
 2. `Default Chadrc Options`                            |nvui.chadrc.options|
 
 3. `Tabufline`                                         |nvui.tabufline|
    3.1 Api functions                                 |nvui.tabufline.api|
 
 4. `Statusline`                                        |nvui.statusline|
 
 5. `Term`                                              |nvui.term|
    5.1 New Window                                    |nvui.term.new|
    5.2 Toggle Window                                 |nvui.term.toggle|
    5.3 Code Runner                                   |nvui.term.runner|
 
 6. `Base46 Theming`                                    |nvui.base46|
    6.1 Api                                           |nvui.base46.api|
    6.2 Highlight Override                            |nvui.base46.highlights|
    6.3 Customize Themes                              |nvui.base46.edit_themes|
    6.4 Integrations                                  |nvui.base46.integrations|
    6.5 Local Themes                                  |nvui.base46.local_themes|

 7. `Lsp`                                               |nvui.lsp|
    5.1 Signature Help                                |nvui.lsp.signature|
    5.2 Renamer                                       |nvui.lsp.renamer|

 8. `Colorify`                                          |nvui.colorify|
 
 9. `Telescope Extensions`                              |nvui.telescope|
    9.1 Base46 Themes                                 |nvui.telescope.themes|
    9.2 Term Picker                                   |nvui.telescope.terms|

 10. `Cheatsheet`                                       |nvui.cheatsheet|
 11. `Cmp UI`                                           |nvui.cmp|
 12. `Mason`                                            |nvui.mason|
 13. `Modern Theme picker`                              |nvui.theme-picker|
```

==============================================================================
1. Introduction                                                     *nvui.intro*

		   	     How does it work?
                             ─────────────────

      ` ┌────────────────────────┐         ┌────────────────────────────┐
      ` │      nvconfig.lua     │         │        chadrc.lua         │
      ` ├────────────────────────┤         ├────────────────────────────┤
       │  Has default options  │        │  User options             │
       │                        │         │  These override nvconfig  │
       │  {                     │         └────────────┬───────────────┘
       │    ui = {...},         │                      │
       │    base46 = {...},     │                      │
       │  }                     │                      │
       └────────────────────────┘                      │
                    │                                  │
                    └─────────────────┬────────────────┘
                                      │      
                                      ▼      
                      The options are merged 
                      Available in |require('nvconfig')|
     	              Then used by UI & Base46 plugin

The file `lua/chadrc.lua` is user's config file used to customize Base46 & UI
plugin and it needs to return a table, example:
>lua
 local M = {}

 M.base46 = {
   theme = "onedark",
   transparency = true,
 }

 return M
<
------------------------------------------------------------------------------
1.1 UI & Base46 plugin setup                                *nvui.plugin-install*

In your plugins file
>lua
 "nvim-lua/plenary.nvim",

 {
   "nvchad/ui",
    config = function()
      require "nvchad" 
    end
 },

 {
    "nvchad/base46",
    lazy = true,
    build = function()
      require("base46").load_all_highlights()
    end,
 },

 "nvzone/volt", -- optional, needed for theme switcher
<
Base46 setup
>lua
 -- put this in your main init.lua file ( before lazy setup )
 vim.g.base46_cache = vim.fn.stdpath "data" .. "/base46_cache/"

 -- put this after lazy setup
 dofile(vim.g.base46_cache .. "defaults")
 dofile(vim.g.base46_cache .. "statusline")

==============================================================================
2. Default Chadrc Options                                  *nvui.chadrc.options*

These are the default options for UI/Base46 plugin. No need to write them all 
Only those you want to change and the it'll override the defaults.

nvconfig file : |https://github.com/NvChad/ui/blob/v3.0/lua/nvconfig.lua|
>lua
 {
   base46 = {
     theme = "onedark",
     hl_add = {},
     hl_override = {},
     integrations = {},
     changed_themes = {},
     transparency = false,
     theme_toggle = { "onedark", "one_light" },
   },

   ui = {
     cmp = {
       lspkind_text = true,
       style = "default", -- default/flat_light/flat_dark/atom/atom_colored
       format_colors = {
         tailwind = false,
       },
     },
 
     telescope = { style = "borderless" }, -- borderless / bordered
 
     statusline = {
       theme = "default", -- default/vscode/vscode_colored/minimal
       -- default/round/block/arrow separators work only for default statusline theme
       -- round and block will work for minimal theme only
       separator_style = "default",
       order = nil,
       modules = nil,
     },
 
     -- lazyload it when there are 1+ buffers
     tabufline = {
       enabled = true,
       lazyload = true,
       order = { "treeOffset", "buffers", "tabs", "btns" },
       modules = nil,
       bufwidth = 21,
     }, 
   },

   nvdash = {
     load_on_startup = false,

     header = {
       "                            ",
       "     ▄▄         ▄ ▄▄▄▄▄▄▄   ",
       "   ▄▀███▄     ▄██ █████▀    ",
       "   ██▄▀███▄   ███           ",
       "   ███  ▀███▄ ███           ",
       "   ███    ▀██ ███           ",
       "   ███      ▀ ███           ",
       "   ▀██ █████▄▀█▀▄██████▄    ",
       "     ▀ ▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀▀   ",
       "                            ",
       "     Powered By  eovim    ",
       "                            ",
     },

     buttons = {
       { txt = "  Find File", keys = "Spc f f", cmd = "Telescope find_files" },
       { txt = "  Recent Files", keys = "Spc f o", cmd = "Telescope oldfiles" },
       -- more... check nvconfig.lua file for full list of buttons
     },
   }
 
   term = {
     winopts = { number = false },
     sizes = { sp = 0.3, vsp = 0.2, ["bo sp"] = 0.3, ["bo vsp"] = 0.2 },
     float = {
       relative = "editor",
       row = 0.3,
       col = 0.25,
       width = 0.5,
       height = 0.4,
       border = "single",
     },
   }, 
 
   lsp = { signature = true },
 
   cheatsheet = {
     theme = "grid", -- simple/grid
     excluded_groups = { "terminal (t)", "autopairs", "Nvim", "Opens" }, -- can add group name or with mode
   },

   mason = { pkgs = {}, skip = {} },

   colorify = {
     enabled = true,
     mode = "virtual", -- fg, bg, virtual
     virt_text = "󱓻 ",
     highlight = { hex = true, lspvars = true },
   },
 }
 
==============================================================================
3. Tabufline                                                    *nvui.tabufline*

A tabline module which shows UI for `buffers` & `tabs`

 - Buffers are tab-scoped too, so buffers from different tabs aren't mixed.
 - Extensible with custom modules 

Example config to add abc module
>lua
 M.ui = {
   tabufline = {
     order = { "treeOffset", "buffers", "tabs", "btns", "abc" },
     modules = {
       abc = function()
         return "hi"
       end,
     }
   }
 }
<
Notes:

- To remove a module, remove it from order.

- To color a text, wrap it with highlight group
  |"%#Test#"| .. |"hi"|  = Test is the hlgroup => |"%#Test#hi"|

- Color a text & make it clickable
  |"%@foo@"| .. |"%#Test#"| .. |"hi"|  = foo is the vim function name

OR You can use our util functions
>lua
 require("nvchad.tabufline.utils").txt("hi", "Test")
 require("nvchad.tabufline.utils").btn("hi", "Test", "foo")

 -- define the function on the top!
 local txt = require("nvchad.tabufline.utils").txt
 txt("hi", "HlGroup")
<
-----------------------------------------------------------------------------
3.1 Tabufline API                                          *nvui.tabufline.api*

These are some useful |functions| to use the tabufline

`Switch Buffers`
>lua
 require("nvchad.tabufline").prev()
 require("nvchad.tabufline").next()
<
`Close Buffers`
>lua
 require("nvchad.tabufline").close_buffer()

 -- closes all buffers
 require("nvchad.tabufline").closeAllBufs(true) 
 require("nvchad.tabufline").closeAllBufs(false) -- excludes current buf

 require("nvchad.tabufline").closeBufs_at_direction("left") -- or right
<
`Move Buffers`

This moves the buffer's position to left/right (-1 for left)
>lua
 require("nvchad.tabufline").move_buf(1) or -1
<
`API Recipe Example`

All buffer numbers are stored in |vim.t.bufs| (tab-local variable)

This example maps Alt+number keys to switch buffer
>lua
 for i = 1, 9, 1 do
   vim.keymap.set("n", string.format("<A-%s>", i), function()
     vim.api.nvim_set_current_buf(vim.t.bufs[i])
   end)
 end
<
==============================================================================
4. Statusline                                                  *nvui.statusline*

NvChad's statusline is minimal & customizable with less abstraction
for custom modules, it has 4 themes.

Managing modules example: ~
>lua
 M.ui = {
   statusline = {
     theme = "default", 
     separator_style = "default",
     order = { "mode", "f", "git", "%=", "lsp_msg", "%=", "lsp", "cwd", "xyz", "abc" },
     modules = {
       abc = function()
         return "hi"
       end,

       xyz =  "hi",
       f = "%F"
     }
   },
 }
<
Above modules field shows how you can add custom modules to the statusline

Note:  The |"%F"| is a stl modifier, check `stl` to know list of modifiers
 - The module can be a string/function
 - |"%="| is a separator, modules before 1st separator will be on the left 
        and after the last separator on the right

theme: ~
   |values| = default, vscode, vscode_colored, minimal

separator_style: ~
   |values| = default, round, block, arrow
   Note: the style wont work for vscode themes

Order: ~
  - The order can be found at 
    `https://github.com/NvChad/ui/blob/v3.0/lua/nvchad/stl/utils.lua`

==============================================================================
5. Term                                                              *nvui.term*

Terminal module with useful functions to spawn & toggle terminals at different
positions & with commands 

This config applies for all terminals opened through our term functions:
>lua
 M.term = {
   winopts = { number = false },
   sizes = { sp = 0.3, vsp = 0.2, ["bo sp"] = 0.3, ["bo vsp"] = 0.2 },
   float = {
     row = 0.3, col = 0.25,
     width = 0.5, height = 0.4,
     border = "single",
   },
 }
<
Currently only these positions are supported 

- `"sp", "vsp", "bo sp", "bo vsp"` and float is an exception
- sp and vsp are horizontal/vertical splits
- `bo` before their commands makes them occupy full width or height of vim
  window, check |bo|

winopts: ~
 - These are used for setting window options for the terminal window.
 - In the above example, |winhl| is used, which can be used to color the
   terminal window differently.

------------------------------------------------------------------------------
5.1 Terminal API                                                 *nvui.term.api*

These are functions which open the terminal based on options provided.

Available options are: 
>lua
 {
   pos = "sp", -- sp/vsp/float
   cmd = "neofetch" -- string or function 
   size = 0.5 -- # for split windows only
   winopts = {}, -- window options
   id =  "any string" -- needed for toggle/runner func
   float_opts = {} -- # for floating window only, options of :h nvim_open_win 
   clear_cmd = true -- needed for runner func*
 }
<
------------------------------------------------------------------------------
5.2 New Window                                                   *nvui.term.new*
>lua
 require("nvchad.term").new { pos = "sp", size = 0.3 }
 require("nvchad.term").new { pos = "vsp", cmd = "neofetch"}
<
-------------------------------------------------------------------------------
5.3 Toggle Window                                              *nvui.term.toggle*

This function toggles the terminal window, make sure to provide an unique id.
>lua
 require("nvchad.term").toggle { pos = "sp", id = "xz" }
 require("nvchad.term").toggle { pos = "float", id = "fa", cmd ='lazygit' }
 require("nvchad.term").toggle { pos = "vsp", id = "floo", size = 0.3 }

 -- always map it in "t" i.e terminal mode too
 vim.keymap.set({ "n", "t" }, "<A-i>", function()
     require("nvchad.term").toggle { pos = "float", id = "floatTerm" }
 end)
<
-------------------------------------------------------------------------------
5.4 Code Runner                                                *nvui.term.runner*

This function will first open a terminal + runs the cmd.
Calling it again will run the cmd in that terminal window
>lua
 require("nvchad.term").runner {
    pos = "vsp",
    cmd = "python test.py",
    id = "ekk",
    clear_cmd = false
 }
<
NOTE:

As Cmd can be a function too, here's a complex example :
>lua
 require("nvchad.term").runner {
   id = "boo",
   pos = "sp",

   cmd = function()
     local file = vim.fn.expand "%"

     local ft_cmds = {
       python = "python3 " .. file,
       cpp = "clear && g++ -o out " .. file .. " && ./out",
     }

     return ft_cmds[vim.bo.ft]
   end,
 }
<
==============================================================================
6. Base46 theming                                                  *nvui.base46*

			     How does it work?
                             ─────────────────

             |Functionality|                           
┌──────────────────────────────────────┐              Base46 compiles them
│  Theme file with colors             │            ┌───────────────────────┬┐
│  Integrations i.e highlight groups  ├───────────►│ `Highlight cache files` ││
│  User highlight groups & overrides  │            └────┬──────────────────┴┘
│  Theme specific highlight overrides │                 │
└──────────────────────────────────────┘                 │
                                                         │ (example)  
                                             ┌───────┬───┴───┬────────┐
                                             │       │       │        │
                                             ▼       ▼       ▼        ▼
                                         defaults   cmp  treesitter  nvim-tree


- So basically base46 compiles the highlight groups with modifications into 
  cache files. Running the cache file will load highlight groups.

Note:
To load the cache file, use the |dofile| function
>lua
 dofile(vim.g.base46_cache .. "syntax")
<
Set the |base46_cache| global before initializing plugins (before lazy.setup)
>lua
 vim.g.base46_cache = vim.fn.stdpath "data" .. "/base46" 
<
These are the default highlight groups, load them in init.lua
>lua
 dofile(vim.g.base46_cache .. "syntax")
 dofile(vim.g.base46_cache .. "defaults")
 dofile(vim.g.base46_cache .. "statusline")
<
Then load the cache files individually, like : 
>lua
  {
    "nvim-treesitter/nvim-treesitter",
    event = { "BufReadPost", "BufNewFile" },
    config = function()
      dofile(vim.g.base46_cache .. "treesitter")
      require("nvim-treesitter.configs").setup()
    end,
  }
<
Note: You can load all cache files at once instead of lazyloading them
>lua
 for _, v in ipairs(vim.fn.readdir(vim.g.base46_cache)) do
   dofile(vim.g.base46_cache .. v)
 end
<
------------------------------------------------------------------------------
6.1 Base46 API                                                 *nvui.base46.api*

Get theme colors: ~
>lua
 local colors = dofile(vim.g.base46_cache .. "colors")
 print(colors.black2)
<
Compile: ~

If for some reason you highlights look weird then compile base46 highlights 
>lua
 require("base46").compile()
 require("base46").load_all_highlights() -- compiles+loads them
<
Toggle Theme: ~
>lua
 -- toggles themes from M.base46.theme_toggle
 require("base46").toggle_theme() 
<
Toggle transparency: ~
>lua
 require('base46').toggle_transparency()
<
Theme Switching manually: ~

Users sometimes use scripts or programs that set system theme, like pywal etc
To change the theme without theme switcher:
>lua
 require("nvconfig").base46.theme = 'nord'
 require("base46").load_all_highlights()

Setting themes outside of Neovim: ~
>bash
 # run code that saves theme name in chadrc first
 # then loop over all nvim instances and send the function!
 
 for addr in $XDG_RUNTIME_DIR/nvim.*; do
  nvim --server $addr --remote-send ':lua require("nvchad.utils").reload() <cr>'
 done

------------------------------------------------------------------------------
6.2 Highlight override                                  *nvui.base46.highlights*

- Make sure you use a valid highlight group.
- Check your theme colors in the base46 theme dir
- To know which highlight groups are available, check base46 integrations dir
- You can use the variable names from your theme's base_30 table, like black2,
  one_bg etc.

>lua
 M.base46 = {
   hl_override = {
      Pmenu = { bg = "black2" },
      -- Pmenu = { bg = "#ffffff" }, this works too
        
      -- lighten or darken base46 theme variable
      -- this will use the black color from base46.theme & lighten it by 2x
      -- negative number will darken it
      Normal = {
        bg = { "black", 2 }
      },

      -- mix colors, mixes black/blue from your theme by 10%
      PmenuSel = {
        bg = { "black", "blue", 10 }
      },
   },
 }
<
- To add new highlight groups, use |hl_add|

------------------------------------------------------------------------------
6.3 Customize themes                                   *nvui.base46.edit_themes*

To edit an already existing theme, use `base46.changed_themes` option.
>lua
 M.base46 = {
   changed_themes = {
      nord = {
         base_16 = { base00 = "#mycol" },
         base_30 = {
            red = "#mycol",
            black2 = "#mycol",
         },
      },

      onedark = { ... },
   },
 }
<
------------------------------------------------------------------------------
6.4 Base46 integrations                               *nvui.base46.integrations*

An integration file is a group of highlight groups, for example cmp
integration, telescope etc.

There are many integration files but only few are compiled by default, to 
include other ones, use `base46.integrations` option
>lua
 M.base46 = {
   integrations = { "dap", "hop" },
 }

- The base46 compile function includes the above hl groups for compilation
- To load them, use dofile function + full path of the cache file.

 `dofile(vim.g.base46_cache .. "dap")`

Note: 

It's preferred to put the dofile code in your plugin's config func
>lua
 {
   "folke/trouble.nvim",
    cmd = "Trouble",
    config = function()
       dofile(vim.g.base46_cache .. "trouble")
       require("trouble").setup()
    end
 }
<
------------------------------------------------------------------------------
6.5 Local themes		                      *nvui.base46.local_themes*

- Put the theme file in `lua/themes/` folder 
- Check the base46 readme for theme file structure 

|https://github.com/nvchad/base46#understanding-theme-variables|

==============================================================================
7. LSP                                                                *nvui.lsp*

------------------------------------------------------------------------------
7.1 Signature Help                                          *nvui.lsp.signature*

50 ~ LOC auto-signature previewer whenever inside a function,
>lua
 M.lsp = {
   signature = true,
 }
<
------------------------------------------------------------------------------
7.2 Renamer                                                   *nvui.lsp.renamer*

This is a function will will rename variable under cursor
>lua

