# Color Selection Dialog

Use the \--color-selection option to create a color selection dialog.

The color selection dialog supports the following options:

\--color=VALUE


Set the initial color.(ex: #FF0000)

\--show-palette


Show the palette.

The following example script shows how to create a color selection dialog:
```
    #!/bin/sh

    COLOR=`zenity --color-selection --show-palette`

    case $? in
             0)
    		echo "You selected $COLOR.";;
             1)
                    echo "No color selected.";;
            -1)
                    echo "An unexpected error has occurred.";;
    esac
```

[](color-selection.html.en#)

## Color Selection Dialog Example

![](figures/zenity-colorselection-screenshot.png)

Zenity color selection dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/color-selection.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](color-selection.html.en#)
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
