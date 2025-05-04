  * [Go to page content](progress.html.en#container)
  * [Go to main menu](progress.html.en#top_bar)
  * [Go to the search field](progress.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") › [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs") » 

# Progress Dialog

Use the \--progress option to create a progress dialog. 

Zenity reads data from standard input line by line. If a line is prefixed with #, the text is updated with the text on that line. If a line contains only a number, the percentage is updated with that number. 

The progress dialog supports the following options: 

\--text=text
    

Specifies the text that is displayed in the progress dialog.

\--percentage=percentage
    

Specifies the initial percentage that is set in the progress dialog.

\--auto-close
    

Closes the progress dialog when 100% has been reached.

\--pulsate
    

Specifies that the progress bar pulsates until an EOF character is read from standard input.

The following example script shows how to create a progress dialog: 
``` 
    #!/bin/sh
    (
    echo "10" ; sleep 1
    echo "# Updating mail logs" ; sleep 1
    echo "20" ; sleep 1
    echo "# Resetting cron jobs" ; sleep 1
    echo "50" ; sleep 1
    echo "This line will just be ignored" ; sleep 1
    echo "75" ; sleep 1
    echo "# Rebooting system" ; sleep 1
    echo "100" ; sleep 1
    ) |
    zenity --progress \
      --title="Update System Logs" \
      --text="Scanning mail logs..." \
      --percentage=0
    
    if [ "$?" = -1 ] ; then
            zenity --error \
              --text="Update canceled."
    fi
```

[](progress.html.en#)

## Progress Dialog Example

![](figures/zenity-progress-screenshot.png)

Zenity progress dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/progress.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](progress.html.en#)
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
