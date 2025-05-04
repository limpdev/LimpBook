  * [Go to page content](password.html.en#container)
  * [Go to main menu](password.html.en#top_bar)
  * [Go to the search field](password.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# Password Dialog

Use the \--password option to create a password entry dialog. 

The password entry dialog supports the following options: 

\--username
    

Display the username field.

The following example script shows how to create a password entry dialog: 
``` 
    #!/bin/sh
    
    ENTRY=`zenity --password --username`
    
    case $? in
             0)
    	 	echo "User Name: `echo $ENTRY | cut -d'|' -f1`"
    	 	echo "Password : `echo $ENTRY | cut -d'|' -f2`"
    		;;
             1)
                    echo "Stop login.";;
            -1)
                    echo "An unexpected error has occurred.";;
    esac
```

[](password.html.en#)

## Password Entry Dialog Example

![](figures/zenity-password-screenshot.png)

Zenity password entry dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/password.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](password.html.en#)
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
