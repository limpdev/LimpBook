  * [Go to page content](forms.html.en#container)
  * [Go to main menu](forms.html.en#top_bar)
  * [Go to the search field](forms.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# Forms Dialog

Use the \--forms option to create a forms dialog. 

The forms dialog supports the following options: 

\--add-entry=FieldName
    

Add a new Entry in forms dialog.

\--add-password=FieldName
    

Add a new Password Entry in forms dialog. (Hide text)

\--add-calendar=FieldName
    

Add a new Calendar in forms dialog.

\--text=TEXT
    

Set the dialog text.

\--separator=SEPARATOR
    

Set output separator character. (Default: | )

\--forms-date-format=PATTERN
    

Set the format for the returned date. The default format depends on your locale. format must be a Format that is acceptable to the strftime function, for example %A %d/%m/%y.

The following example script shows how to create a forms dialog: 
``` 
    #!/bin/sh
    
    zenity --forms --title="Add Friend" \
    	--text="Enter information about your friend." \
    	--separator="," \
    	--add-entry="First Name" \
    	--add-entry="Family Name" \
    	--add-entry="Email" \
    	--add-calendar="Birthday" >> addr.csv
    
    case $? in
        0)
            echo "Friend added.";;
        1)
            echo "No friend added."
    	;;
        -1)
            echo "An unexpected error has occurred."
    	;;
    esac
```

[](forms.html.en#)

## Forms Dialog Example

![](figures/zenity-forms-screenshot.png)

Zenity forms dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/forms.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](forms.html.en#)
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
