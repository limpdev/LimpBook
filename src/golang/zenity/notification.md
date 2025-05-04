  * [Go to page content](notification.html.en#container)
  * [Go to main menu](notification.html.en#top_bar)
  * [Go to the search field](notification.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# Notification Icon

Use the \--notification option to create a notification icon.

\--text=text
    

Specifies the text that is displayed in the notification area.

\--listen=icon: 'text', message: 'text', tooltip: 'text', visible: 'text',
    

Listens for commands at standard input. At least one command must be specified. Commands are comma separated. A command must be followed by a colon and a value. 

The icon command also accepts four stock icon values such as error, info, question and warning.

The following example script shows how to create a notification icon:
``` 
      #!/bin/sh
    
      zenity --notification\
        --window-icon="info" \
        --text="There are system updates necessary!"
      
```

[](notification.html.en#)

## Notification Icon Example

![](figures/zenity-notification-screenshot.png)

Zenity notification icon example

The following example script shows how to create a notification icon along with \--listen:
``` 
      #!/bin/sh
      cat <<EOH| zenity --notification --listen
      message: this is the message text
      EOH
      
```

[](notification.html.en#)

## Notification Icon with \--listen Example

![](figures/zenity-notification-listen-screenshot.png)

Zenity notification with \--listen example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/notification.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](notification.html.en#)
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
