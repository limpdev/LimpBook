# Calendar Dialog

Use the \--calendar option to create a calendar dialog. Zenity returns the selected date to standard output. If no date is specified on the command line, the dialog uses the current date.

The calendar dialog supports the following options:

\--text=text


Specifies the text that is displayed in the calendar dialog.

\--day=day


Specifies the day that is selected in the calendar dialog. day must be a number between 1 and 31 inclusive.

\--month=month


Specifies the month that is selected in the calendar dialog. month must be a number between 1 and 12 inclusive.

\--year=year


Specifies the year that is selected in the calendar dialog.

\--date-format=format


Specifies the format that is returned from the calendar dialog after date selection. The default format depends on your locale. Format must be a format that is acceptable to the strftime function, for example %A %d/%m/%y.

The following example script shows how to create a calendar dialog:
```
    #!/bin/sh


    if zenity --calendar \
    --title="Select a Date" \
    --text="Click on a date to select that date." \
    --day=10 --month=8 --year=2004
      then echo $?
      else echo "No date selected"
    fi
```

[](calendar.html.en#)

## Calendar Dialog Example

![](figures/zenity-calendar-screenshot.png)

Zenity calendar dialog example

## More Information

  * [Dialogs](https://help.gnome.org/users/zenity/stable/index.html.en#dialogs "Dialogs")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/calendar.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](calendar.html.en#)
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
