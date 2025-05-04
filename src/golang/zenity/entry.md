# Text Entry Dialog

Use the \--entry option to create a text entry dialog. Zenity returns the contents of the text entry to standard output.

The text entry dialog supports the following options:

\--text=text


Specifies the text that is displayed in the text entry dialog.

\--entry-text=text


Specifies the text that is displayed in the entry field of the text entry dialog.

\--hide-text


Hides the text in the entry field of the text entry dialog.

The following example script shows how to create a text entry dialog:
```
    #!/bin/sh

    if zenity --entry \
    --title="Add new profile" \
    --text="Enter name of new profile:" \
    --entry-text "NewProfile"
      then echo $?
      else echo "No name entered"
    fi
```

[](entry.html.en#)

## Text Entry Dialog Example

![](figures/zenity-entry-screenshot.png)

Zenity text entry dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/entry.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](entry.html.en#)
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
