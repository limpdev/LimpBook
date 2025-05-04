  * [Go to page content](scale.html.en#container)
  * [Go to main menu](scale.html.en#top_bar)
  * [Go to the search field](scale.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# Scale Dialog

Use the \--scale option to create a scale dialog. 

The scale dialog supports the following options: 

\--text=TEXT
    

Set the dialog text. (Default: Adjust the scale value)

\--value=VALUE
    

Set initial value. (Default: 0) You must specify value between minimum value to maximum value.

\--min-value=VALUE
    

Set minimum value. (Default: 0)

\--max-value=VALUE
    

Set maximum value. (Default: 100)

\--step=VALUE
    

Set step size. (Default: 1)

\--print-partial
    

Print value to standard output, whenever a value is changed. 

\--hide-value
    

Hide value on dialog.

The following example script shows how to create a scale dialog: 
``` 
    #!/bin/sh
    
    VALUE=`zenity --scale --text="Select window transparency." --value=50`
    
    case $? in
             0)
    		echo "You selected $VALUE%.";;
             1)
                    echo "No value selected.";;
            -1)
                    echo "An unexpected error has occurred.";;
    esac
```

[](scale.html.en#)

## Scale Dialog Example

![](figures/zenity-scale-screenshot.png)

Zenity scale dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/scale.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](scale.html.en#)
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
