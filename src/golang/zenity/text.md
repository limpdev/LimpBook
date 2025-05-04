  * [Go to page content](text.html.en#container)
  * [Go to main menu](text.html.en#top_bar)
  * [Go to the search field](text.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# Text Information Dialog

Use the \--text-info option to create a text information dialog. 

The text information dialog supports the following options: 

\--filename=filename
    

Specifies a file that is loaded in the text information dialog.

\--editable
    

Allows the displayed text to be edited. The edited text is returned to standard output when the dialog is closed.

\--font=FONT
    

Specifies the text font.

\--checkbox=TEXT
    

Enable a checkbox for use like a 'I read and accept the terms.'

\--html
    

Enable html support.

\--url=URL
    

Sets an url instead of a file. Only works if you use --html option.

The following example script shows how to create a text information dialog: 
``` 
    #!/bin/sh
    
    # You must place file "COPYING" in same folder of this script.
    FILE=`dirname $0`/COPYING
    
    zenity --text-info \
           --title="License" \
           --filename=$FILE \
           --checkbox="I read and accept the terms."
    
    case $? in
        0)
            echo "Start installation!"
    	# next step
    	;;
        1)
            echo "Stop installation!"
    	;;
        -1)
            echo "An unexpected error has occurred."
    	;;
    esac
```

[](text.html.en#)

## Text Information Dialog Example

![](figures/zenity-text-screenshot.png)

Zenity text information dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/text.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](text.html.en#)
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
