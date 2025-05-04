  * [Go to page content](usage.html.en#container)
  * [Go to main menu](usage.html.en#top_bar)
  * [Go to the search field](usage.html.en#s)



[GNOME.org](https://www.gnome.org/)

[![GNOME: The Free Software Desktop Project](../../../skin/gnome-logo.png)](https://help.gnome.org/ "Go to home page")

  * [About](https://help.gnome.org/about/)
  * [Users](../../index.md)
  * [Administrators](https://help.gnome.org/admin/)
  * [Developers](https://developer.gnome.org/)



Search: 

[Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index") » 

# Usage

When you write scripts, you can use Zenity to create simple dialogs that interact graphically with the user, as follows: 

  * You can create a dialog to obtain information from the user. For example, you can prompt the user to select a date from a calendar dialog, or to select a file from a file selection dialog. 

  * You can create a dialog to provide the user with information. For example, you can use a progress dialog to indicate the current status of an operation, or use a warning message dialog to alert the user. 




When the user closes the dialog, Zenity prints the text produced by the dialog to standard output. 

When you write Zenity commands, ensure that you place quotation marks around each argument. 

For example, use:
``` 
    zenity --calendar --title="Holiday Planner"
```

Do not use:
``` 
    zenity --calendar --title=Holiday Planner
```

If you do not use quotation marks, you might get unexpected results. 

## Access Keys

An access key is a key that enables you to perform an action from the keyboard rather than use the mouse to choose a command from a menu or dialog. Each access key is identified by an underlined letter on a menu or dialog option. 

Some Zenity dialogs support the use of access keys. To specify the character to use as the access key, place an underscore before that character in the text of the dialog. The following example shows how to specify the letter 'C' as the access key: 
``` 
    "_Choose a name".
```

## Exit Codes

Zenity returns the following exit codes: 

Exit Code | Description  
---|---  
0 | The user has pressed either OK or Close.  
1 | The user has either pressed Cancel, or used the window functions to close the dialog.  
-1 | An unexpected error has occurred.  
5 | The dialog has been closed because the timeout has been reached.  
  
## General Options

All Zenity dialogs support the following general options: 

\--title=title
    

Specifies the title of a dialog.

\--window-icon=icon_path
    

Specifies the icon that is displayed in the window frame of the dialog. There are 4 stock icons also available by providing the following keywords - 'info', 'warning', 'question' and 'error'. 

\--width=width
    

Specifies the width of the dialog.

\--height=height
    

Specifies the height of the dialog.

\--timeout=timeout
    

Specifies the timeout in seconds after which the dialog is closed.

## Help Options

Zenity provides the following help options: 

\--help
    

Displays shortened help text.

\--help-all
    

Displays full help text for all dialogs.

\--help-general
    

Displays help text for general dialog options.

\--help-calendar
    

Displays help text for calendar dialog options.

\--help-entry
    

Displays help text for text entry dialog options.

\--help-error
    

Displays help text for error dialog options.

\--help-info
    

Displays help text for information dialog options.

\--help-file-selection
    

Displays help text for file selection dialog options.

\--help-list
    

Displays help text for list dialog options.

\--help-notification
    

Displays help text for notification icon options.

\--help-progress
    

Displays help text for progress dialog options.

\--help-question
    

Displays help text for question dialog options.

\--help-warning
    

Displays help text for warning dialog options.

\--help-text-info
    

Displays help for text information dialog options.

\--help-misc
    

Displays help for miscellaneous options.

\--help-gtk
    

Displays help for GTK+ options.

## Miscellaneous Options

Zenity also provides the following miscellaneous options: 

\--about
    

Displays the About Zenity dialog, which contains Zenity version information, copyright information, and developer information.

\--version
    

Displays the version number of Zenity.

## GTK+ Options

Zenity supports the standard GTK+ options. For more information about the GTK+ options, execute the zenity --help-gtk command. 

## Environment Variables

Normally, Zenity detects the terminal window from which it was launched and keeps itself above that window. This behavior can be disabled by unsetting the WINDOWID environment variable. 

## More Information

  * [Zenity Manual](https://help.gnome.org/users/zenity/stable/index.html.en "index")



Got a comment? Spotted an error? Found the instructions unclear? [Send feedback about this page.](mailto:docs-feedback@gnome.org?subject=Feedback%20on%20users/zenity/3.32/usage.page)

  * [The GNOME Project](https://www.gnome.org/)
    * [About Us](https://www.gnome.org/about/)
    * [Get Involved](https://www.gnome.org/get-involved/)
    * [Teams](https://www.gnome.org/teams/)
    * [The GNOME Foundation](https://foundation.gnome.org)
    * [Support GNOME](https://www.gnome.org/support-gnome/)
    * [Contact](https://www.gnome.org/contact/)



  * [Resources](usage.html.en#)
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
