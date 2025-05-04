# File Selection Dialog

Use the \--file-selection option to create a file selection dialog. Zenity returns the selected files or directories to standard output. The default mode of the file selection dialog is open.

The file selection dialog supports the following options:

\--filename=filename


Specifies the file or directory that is selected in the file selection dialog when the dialog is first shown.

\--multiple


Allows the selection of multiple filenames in the file selection dialog.

\--directory


Allows only selection of directories in the file selection dialog.

\--save


Set the file selection dialog into save mode.

\--separator=separator


Specifies the string that is used to divide the returned list of filenames.

The following example script shows how to create a file selection dialog:
```
    #!/bin/sh

    FILE=`zenity --file-selection --title="Select a File"`

    case $? in
             0)
                    echo "\"$FILE\" selected.";;
             1)
                    echo "No file selected.";;
            -1)
                    echo "An unexpected error has occurred.";;
    esac
```

[](file-selection.html.en#)

## File Selection Dialog Example

![](figures/zenity-fileselection-screenshot.png)

Zenity file selection dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/file-selection.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](file-selection.html.en#)
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
