  * [Go to page content](list.html.en#container)
  * [Go to main menu](list.html.en#top_bar)
  * [Go to the search field](list.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# List Dialog

Use the \--list option to create a list dialog. Zenity returns the entries in the first column of text of selected rows to standard output. 

Data for the dialog must specified column by column, row by row. Data can be provided to the dialog through standard input. Each entry must be separated by a newline character. 

If you use the \--checklist or \--radiolist options, each row must start with either 'TRUE' or 'FALSE'. 

The list dialog supports the following options: 

\--column=column
    

Specifies the column headers that are displayed in the list dialog. You must specify a \--column option for each column that you want to display in the dialog. 

\--checklist
    

Specifies that the first column in the list dialog contains check boxes. 

\--radiolist
    

Specifies that the first column in the list dialog contains radio boxes. 

\--editable
    

Allows the displayed items to be edited. 

\--separator=separator
    

Specifies what string is used when the list dialog returns the selected entries. 

\--print-column=column
    

Specifies what column should be printed out upon selection. The default column is '1'. 'ALL' can be used to print out all columns in the list. 

The following example script shows how to create a list dialog: 
``` 
    #!/bin/sh
    
    zenity --list \
      --title="Choose the Bugs You Wish to View" \
      --column="Bug Number" --column="Severity" --column="Description" \
        992383 Normal "GtkTreeView crashes on multiple selections" \
        293823 High "GNOME Dictionary does not handle proxy" \
        393823 Critical "Menu editing does not work in GNOME 2.0"
```

[](list.html.en#)

## List Dialog Example

![](figures/zenity-list-screenshot.png)

Zenity list dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/list.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](list.html.en#)
    * [Documentation](https://help.gnome.org)
    * [Wiki](https://wiki.gnome.org)
    * [Mailing Lists](https://mail.gnome.org/mailman/listinfo)
    * [IRC Channels](https://wiki.gnome.org/GnomeIrcChannels)
    * [Bug Tracker](https://gitlab.gnome.org/)
    * [Development Code](https://gitlab.gnome.org/)
    * [Build Tool](https://wiki.gnome.org/Jhbuild)



  * [News](http://www.gnome.org/news/)
    * [Latest Release](https://www.gnome.org/start/stable)
    * [Planet GNOME](https://planet.gnome.org)
    * [Development News](https://news.gnome.org)
    * [Twitter](https://twitter.com/gnome)



  * **This website is available in many languages**
    * [Switch Language](https://help.gnome.org/languages "Switching Language")



Copyright © 2005‒2014 **The GNOME Project**  
Optimised for standards. Hosted by [Red Hat](http://redhat.com).
