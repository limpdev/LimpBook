#  Directory Opus

> Here are some potentially useful `DOpus` commands written in either JavaScript or Visual Basic Script.

---

## Move Selected  New Subfolder

Simplified Approach: new folder will be named after the _first selected file_ automatically. Can be exchanged for a user prompt instead...

```bash
@nofilenamequoting
Copy MOVE HERE CREATE FOLDER="{file|noext}"
```

 (Complicated)

```js
function OnClick(clickData) {
	var cmd = clickData.func.command;
	if (clickData.func.sourcetab.selected.count == 0) {
		cmd.RunCommand("CreateFolder READAUTO=no");
	} else {
		cmd.SetModifier("nofilenamequoting");
		cmd.AddLine("@set dir={dlgstrings|Enter new subfolder name|{file|noext}}");
		cmd.AddLine('Copy MOVE HERE CREATEFOLDER="{$dir}"');
		cmd.Run();
	}
}
```

```xml
<?xml version="1.0"?>
<button backcol="none" display="both" textcol="none">
    <label>Move into new folder</label>
    <icon1>#makedir</icon1>
    <function type="script">
        <instruction>@script JScript</instruction>
        <instruction>function OnClick(clickData)</instruction>
        <instruction>{</instruction>
        <instruction>    var cmd = clickData.func.command;</instruction>
        <instruction>    if (clickData.func.sourcetab.selected.count == 0)</instruction>
        <instruction>    {</instruction>
        <instruction>        cmd.RunCommand(&apos;CreateFolder READAUTO=no&apos;);</instruction>
        <instruction>    }</instruction>
        <instruction>    else</instruction>
        <instruction>    {</instruction>
        <instruction>        cmd.SetModifier(&apos;nofilenamequoting&apos;);</instruction>
        <instruction>        cmd.AddLine(&apos;@set dir={dlgstrings|Enter new subfolder name|{file|noext}}&apos;);</instruction>
        <instruction>        cmd.AddLine(&apos;Copy MOVE HERE CREATEFOLDER="{$dir}"&apos;);</instruction>
        <instruction>        cmd.Run();</instruction>
        <instruction>    }</instruction>
        <instruction>}</instruction>
    </function>
</button>
```

---

## Move Items  , DEL Folder

```bash
@confirm Move all the files/folders in the directory up one level, then delete the current folder?
@set ChildPath={sourcepath$|noterm}
Copy MOVE * TO ..
Go ..
Delete FILE="{$ChildPath}" NORECYCLE SKIPNOTEMPTY QUIET
```

```xml
<?xml version="1.0"?>
<button backcol="none" display="both" textcol="none">
    <label>Delete Folder and move contents up</label>
    <icon1>#opentoolbar</icon1>
    <function type="normal">
        <instruction>@set ChildPath={sourcepath$|noterm}</instruction>
        <instruction>Copy MOVE * TO ..</instruction>
        <instruction>Go ..</instruction>
        <instruction>Delete FILE="{$ChildPath}" NORECYCLE SKIPNOTEMPTY QUIET</instruction>
    </function>
</button>
```

---

## EXIF Tool

> Pass this a file path → miniature window popup featuring all EXIF properties for the image/video.

```js
var exifTool = new ActiveXObject("DOpusScriptingExtensions.ExifTool")
var stringTools = DOpus.Create().StringTools()
var fsUtil = DOpus.FSUtil
var exifToolIcon = getExifToolIcon()
function OnInit(data) {
  data.name = "ExifTool dialog"
  data.desc = "Shows file metadata using ExifTool"
  data.version = "0.0-dev"
  data.url = "https://github.com/PolarGoose/DirectoryOpus-ExifTool-Dialog"
  data.default_enable = true
  var cmd = data.AddCommand()
  cmd.name = "OpenExifToolDialog"
  cmd.method = "onCommandExecuted"
  cmd.template = "FILE"
  cmd.desc = data.desc
  cmd.label = data.desc
}
function onCommandExecuted(/* ScriptCommandData */ scriptCommandData) {
  try {
    var filePath = getFilePathFromCommandArguments(scriptCommandData)
    showExifToolDialog(filePath)
  } catch (error) {
    var dlg = DOpus.Dlg
    dlg.message = error
    dlg.buttons = "OK"
    dlg.icon = "error"
    dlg.show()
  }
}
function addExifToolDataToListView(/* Control */ listView, tagNameAndValueArray) {
  for (var i = new Enumerator(tagNameAndValueArray); !i.atEnd(); i.moveNext()) {
    tag = i.item()
    addItemToListView(listView, tag.TagName, tag.Value)
  }
  listView.columns.autosize()
}
function addItemToListView(/* Control */ listView, /* string */ tagName, /* string */ value) {
  var i = listView.AddItem(tagName)
  listView.GetItemAt(i).subitems(0) = value
  if(tagName === "") {
    listView.GetItemAt(i).style = "b"
  }
}
function showExifToolDialog(/* string */ filePath) {
  var exifToolData = getExifToolData(filePath)
  var dlg = DOpus.Dlg
  dlg.template = "main"
  dlg.icon = exifToolIcon
  dlg.Create()
  addExifToolDataToListView(dlg.Control("ExifTags"), exifToolData)
  dlg.RunDlg()
}
function /* string */ getFilePathFromCommandArguments(/* ScriptCommandData */ scriptCommandData) {
  if(!scriptCommandData.func.args.got_arg.file) {
    throw "FILE argument is not provided"
  }
  var filePath = scriptCommandData.func.args.file
  if(fsUtil.GetType(filePath) === "dir") {
    throw "Provided file is a directory: " + filePath
  }
  return filePath
}
function getExifToolData(/* Path */ filePath) {
  var tags = JSON.parse(exifTool.GetInfoAsJson(filePath))[0]
  var result = []
  var currentShortenedGroupName = ""
  for (var tagFullName in tags) {
    if (tagFullName === "SourceFile") {
      result.push({ "TagName": tagFullName, "Value": tags[tagFullName] })
      continue
    }
    if(tagFullName === "ExifTool:ExifTool:ExifToolVersion") {
      continue
    }
    var shortenedGroupName = getTagGroupShortened(tagFullName)
    if(shortenedGroupName !== currentShortenedGroupName) {
      result.push({ "TagName": "", "Value": "--- " + shortenedGroupName + " ---" })
      currentShortenedGroupName = shortenedGroupName
    }
    result.push({ "TagName": getTagName(tagFullName), "Value": tags[tagFullName].val })
  }
  return result
}
// Extracts the tag name from the full tag name:
//   QuickTime:Meta:TagName => TagName
function getTagName(/* string */ fullTagName) {
  var idx = fullTagName.lastIndexOf(":")
  return fullTagName.substring(idx + 1)
}
// Extract the tag group:
//   QuickTime:QuickTime:TagName => QuickTime
//   QuickTime:Meta:TagName => QuickTime:Meta
function getTagGroupShortened(/* string */ fullTagName) {
  var parts = fullTagName.split(":")
  parts.pop()
  if (parts[0] === parts[1]) {
    return parts[0]
  }
  return parts.join(":")
}
// The icon is taken from https://exiftool.org/forum/index.php?topic=17049.msg91404#msg91404
// The svg was converted to ".ico" BASE64 using the commands:
//   magick favicon.svg -background transparent -resize 256x256 output.ico
//   base64 -w 0 output.ico
function getExifToolIcon() {
  var iconBase64 = // "{PASTE BASE64 HERE}" ← !!!!!!!!!!!!!
  return DOpus.LoadImage(stringTools.Decode(iconBase64, 'base64'), '.ico')
}
```

---

<details><summary> <i>Running scripts contextually, by opening file paths</i></summary>

> → from ThioJoe (YT)

### **Auto Commands For Specific Folders**

I've created a versatile add-in script that automates executing different arbitrary commands for different corresponding specified folder paths, including with wildcards and several other features.

## **Features:**

**Commands**

- Set any number of path-command pairs with one script
- Run a command upon entering a specific folder path
- Specify an optional _leave_ command in addition to entry command
- Supports exact paths, wildcards, aliases, and windows environment variables

**Smart Execution**

- Works whether navigating into a matching folder, or switching to a matching tab
- Leave command will only trigger when entering a non-matching folder, or switching to a non-matching tab

    - For example, if entering sub-folders of a wildcarded path, it won't re-execute every time (unless optional switch is enabled)

- Optional switches to always run "entry" and/or "leave" command when entering a matched path, even if already coming from a matched path.

    - Switches individually enabled/disabled for each path

**Example Use Case:**

- Automatically opening a toolbar when entering a specific folder or path, and closing it when leaving the folder or switching to a different tab
- Automatically enabling Flat View within a certain folder
- Anything else that can't already be accomplished via a custom folder format
- Redirecting from library "lib://" paths to their true drive path (See [Example](https://resource.dopus.com/t/script-for-running-various-commands-when-entering-specific-paths/51839/3))

## **Usage:**

Open the `FolderCommandPairs` config setting and enter any number of path-command groups with the following format:

```auto
PathX = <folder_path>
EntryCommandX = <command_to_run_on_entry>
LeaveCommandX = <command_to_run_on_leave>
SwitchesX = <comma_separated_switches>
```

==FULL VISUAL BASIC SCRIPT BELOW==

```bash
    ' Script to automatically run Directory Opus commands when entering specific paths with several options.
    ' Version: 1.1.0 - 11/1/24
    ' Author: ThioJoe (https://github.com/ThioJoe)
    '
    ' Available at GitHub repo: https://github.com/ThioJoe/D-Opus-Scripts
    ' Forum Thread: https://resource.dopus.com/t/script-for-running-various-commands-when-entering-specific-paths/51839

    Option Explicit

    Function OnInit(initData)
    initData.name = "Auto Commands For Specific Folders"
    initData.version = "1.1"
    initData.desc = "Automatically run specified commands when entering or leaving configured folders."
    initData.default_enable = true
    initData.min_version = "13.0"

        ' Configuration settings
        Dim config: Set config = initData.config
        Dim config_desc: Set config_desc = DOpus.Create.Map
        Dim config_groups: Set config_groups = DOpus.Create.Map

        ' FolderCommandPairs configuration
        config.FolderCommandPairs = "Path1 = C:\SomeExample\*\Path" & vbNewLine & _
        "EntryCommand1 = Toolbar Example_Toolbar_Name" & vbNewLine & _
        "LeaveCommand1 = Toolbar Example_Toolbar_Name CLOSE" & vbNewLine & _
        "Switches1 = AlwaysRunLeave, AlwaysRunEntry"

        config_desc("FolderCommandPairs") = _
        "Enter path-command pairs, one per line. Use the following format:" & vbNewLine & _
        "     PathX = <folder_path>" & vbNewLine & _
        "     EntryCommandX = command_to_run_on_entry>" & vbNewLine & _
        "     LeaveCommandX = <command_to_run_on_leave>" & vbNewLine & _
        "     SwitchesX = <comma_separated_switches>" & vbNewLine & _
        vbNewLine & _
        "Where:" & vbNewLine & _
        "• X is a number (1, 2, 3, etc.) to group related commands" & vbNewLine & _
        "• Available switches: AlwaysRunEntry, AlwaysRunLeave, DontResolvePath" & vbNewLine & _
        "     -- AlwaysRunEntry, AlwaysRunLeave: Lets you run the entry/leave commands even when the next folder also matches the rule." & vbNewLine & _
        "     -- DontResolvePath: The given path will not be resolved before being checked against the lister path. May be necessary for paths like lib:// which would be re-written as C:\Users\... and therefore might not match when expected" & vbNewLine & _
        vbNewLine & _
        "Notes:" & vbNewLine & _
        "• <folder_path> can include wildcards (*), folder aliases, and Windows environment variables" & vbNewLine & _
        "• Commands can even include built-in Opus function arguments like {sourcepath}" & vbNewLine & _
        "• Lines starting with // are treated as comments. Empty lines are also ignored."

        config_groups("FolderCommandPairs") = "1 - Folder Commands"

        ' Debug logging option
        config_desc("DebugLevel") = "Set the level of debug output"
        config.DebugLevel = DOpus.Create.Vector(0, "0 - Off (Default)", "1 - Info", "2 - Verbose", "3 - Debug", "4 - Debug Extra")
        config_groups("DebugLevel") = "2 - Options"

        ' Disable variable cache for debugging
        config.DisableCache = False
        config_desc("DisableCache") = "Disables using Script.Vars cache and re-parses config on every instance. You might need to enable this temporarily after changing the config."
        config_groups("DisableCache") = "2 - Options"

        initData.config_desc = config_desc
        initData.config_groups = config_groups
        End Function

    Sub DebugOutput(level, message)
    If Script.config.DebugLevel >= level Then
    Dim levelString
    Select Case level
    Case 1
    levelString = "[Info]       | "
    Case 2
    levelString = "[Verbose]    | "
    Case 3
    levelString = "[Debug]      | "
    Case 4
    levelString = "[DebugExtra] | "
    Case Else
    levelString = "[Log]        | "
    End Select

            DOpus.Output levelString & message
            End If
            End Sub

    Function ParseFolderCommandPairs()
    ' Check if we have cached folder command pairs and if caching is not disabled
    If Not Script.config.DisableCache And Script.vars.Exists("CachedFolderCommandPairs") Then
    DebugOutput 4, "------------------------------------------"
    DebugOutput 4, "ParseFolderCommandPairs(): Using cached folder command pairs"
    Set ParseFolderCommandPairs = Script.vars.Get("CachedFolderCommandPairs")
    Exit Function
    End If

        DebugOutput 2, "----------- BEGIN PARSE CONFIGS -----------"

        Dim pairs, line, path, entryCommand, leaveCommand, switches
        Dim result: Set result = CreateObject("Scripting.Dictionary")

        pairs = Split(Script.Config.FolderCommandPairs, vbNewLine)
        path = ""
        entryCommand = ""
        leaveCommand = ""
        switches = Array(False, False, False) ' Array of Bools Per Switch: [AlwaysRunEntry, AlwaysRunLeave, DontResolvePath]

        For Each line In pairs
        line = Trim(line)

            ' Skip blank lines and comments
            If line = "" Or Left(line, 2) = "//" Then
            If line = "" Then
            DebugOutput 4, "Skipping blank line"
            Else
            DebugOutput 4, "Skipping comment: " & line
            End If
            Else
            Dim parts: parts = Split(line, "=", 2)
            If UBound(parts) = 1 Then
            Dim key: key = LCase(Trim(parts(0)))
            Dim value: value = Trim(parts(1))

                    ' Check for the keywords we're looking for.
                    '   "Left" function takes parameters of the string and the number of characters to check (from the left)
                    '   "Key" is the left side of the line split on the equals (=) sign which has been trimmed and converted to lowercase, and should contain the config keyword
                    '   "Value" is the right side of the line split on the equals (=) sign which has been trimmed and should contain the value for that keyword

                    If Left(key, 4) = "path" Then
                    ' We found a new 'path=' line, so save the accumulated commands for the current path before moving on and starting a new group
                    If path <> "" Then
                    result.Add path, Array(entryCommand, leaveCommand, switches)
                    DebugOutput 2, "Added pair - Path: " & path & ", EntryCommand: " & entryCommand & ", LeaveCommand: " & leaveCommand & ", Switches: AlwaysRunEntry=" & switches(0) & ", AlwaysRunLeave=" & switches(1) & ", DontResolvePath=" & switches(2)
                    ' Reset the variables for the next group
                    entryCommand = ""
                    leaveCommand = ""
                    switches = Array(False, False, False)
                    End If

                        path = value  ' Store raw path, will resolve in the other loop later depending on switches

                    ElseIf Left(key, 12) = "entrycommand" Then
                    DebugOutput 3, "Parsing entry command: " & line
                    entryCommand = value
                    ElseIf Left(key, 12) = "leavecommand" Then
                    DebugOutput 3, "Parsing leave command: " & line
                    leaveCommand = value
                    ElseIf Left(key, 8) = "switches" Then
                    DebugOutput 3, "Parsing switches: " & line
                    Dim switchList: switchList = Split(value, ",")
                    Dim switch
                    For Each switch In switchList
                    switch = Trim(LCase(switch))
                    If switch = "alwaysrunentry" Then
                    switches(0) = True
                    ElseIf switch = "alwaysrunleave" Then
                    switches(1) = True
                    ElseIf switch = "dontresolvepath" Then
                    switches(2) = True
                    Else
                    DebugOutput 3, "Ignoring unrecognized switch: " & switch
                    End If
                    Next
                    Else
                    DebugOutput 3, "Ignoring unrecognized line: " & line
                    End If
                    Else
                    DebugOutput 3, "Ignoring malformed line: " & line
                    End If
                    End If
                    Next

        ' Add the last path if there is one
        If path <> "" Then
        result.Add path, Array(entryCommand, leaveCommand, switches)
        DebugOutput 2, "Added pair - Path: " & path & ", EntryCommand: " & entryCommand & ", LeaveCommand: " & leaveCommand & ", Switches: AlwaysRunEntry=" & switches(0) & ", AlwaysRunLeave=" & switches(1) & ", DontResolvePath=" & switches(2)
        End If

        ' Create a new dictionary to store resolved paths
        Dim resolvedResult: Set resolvedResult = CreateObject("Scripting.Dictionary")

        ' Parse and resolve paths here after we know the switches so we can do so based on DontResolvePath switch
        '    If set to not resolve, then paths like lib:// will not be changed to the absolute drive path
        Dim pathKey
        For Each pathKey in result.Keys
        Dim pathData: pathData = result(pathKey)
        Dim resolvedPath

            ' Check if this path should be resolved (based on DontResolvePath switch)
            If pathData(2)(2) Then  ' switches(2) is DontResolvePath
            DebugOutput 3, "Not resolving path: " & pathKey
            resolvedPath = pathKey
            Else
            DebugOutput 3, "Resolving path: " & pathKey
            resolvedPath = DOpus.FSUtil.Resolve(pathKey, "j")
            DebugOutput 3, "   > Resolved to: " & resolvedPath
            End If

            ' Add to new dictionary with resolved path
            resolvedResult.Add resolvedPath, pathData
            Next

        ' Cache the result
        Script.vars.Set "CachedFolderCommandPairs", resolvedResult

        Set ParseFolderCommandPairs = resolvedResult

        DebugOutput 2, "----------- END PARSE CONFIGS -----------"
        End Function

    Function TerminatePath(p)
    TerminatePath = p
    DebugOutput 3, "  Running TerminatePath function for path: " & p

        If (Len(TerminatePath) > 0) Then
        Dim c, pathType, slashToUse
        c = Right(TerminatePath, 1)
        pathType = DOpus.FSUtil.PathType(TerminatePath)

            If pathType = "ftp" Then
            slashToUse = "/"
            DebugOutput 4, "   > FTP path detected, using forward slash (/)"
            Else
            slashToUse = "\"
            DebugOutput 4, "   > Local path detected, using backslash (\)"
            End If

            If (c <> "\" And c <> "/" And c <> "*" And c <> "?") Then
            TerminatePath = TerminatePath & slashToUse
            DebugOutput 4, "   > Appending slash - Path is now: " & TerminatePath
            ElseIf (c = "\" Or c = "/") And c <> slashToUse Then
            ' Replace the existing slash if it's the wrong type
            TerminatePath = Left(TerminatePath, Len(TerminatePath) - 1) & slashToUse
            DebugOutput 4, "   > Replacing slash - Path is now: " & TerminatePath
            End If
            End If

        DebugOutput 3, "   > TerminatePath: Before = " & p & ", After = " & TerminatePath
        End Function

    Sub CheckAndExecuteLeaveCommands(oldPath, newPath, sourceTab)
    Dim fsu, folderPattern, commandArray
    Set fsu = DOpus.FSUtil

        Dim folderCommandPairs: Set folderCommandPairs = ParseFolderCommandPairs()
        Dim leaveCommands: Set leaveCommands = CreateObject("Scripting.Dictionary")

        DebugOutput 3, "*****************************************************"
        'DebugOutput 3, "------------------------------------------"
        DebugOutput 3, "Testing For Leave Commands:"

        For Each folderPattern In folderCommandPairs.Keys
        Dim wildPath: Set wildPath = fsu.NewWild(TerminatePath(folderPattern), "d")
        DebugOutput 3, "- Checking With Pattern: " & folderPattern

            commandArray = folderCommandPairs(folderPattern)
            Dim alwaysRunLeave: alwaysRunLeave = commandArray(2)(1) ' AlwaysRunLeave switch is the second element in the switches array
            DebugOutput 3, "  alwaysRunLeave: " & alwaysRunLeave

            ' Check for leaving a matched folder
            If wildPath.Match(oldPath) Then
            DebugOutput 3, "    > Match Found For Old Path -- " & oldPath

                Dim shouldRunLeaveCommand: shouldRunLeaveCommand = False

                If newPath = "" Then
                DebugOutput 3, "    > New path is empty, will queue leave command"
                shouldRunLeaveCommand = True
                ElseIf Not wildPath.Match(newPath) Then
                DebugOutput 3, "    > No Match For New Path, queuing leave command -- " & newPath
                shouldRunLeaveCommand = True
                ElseIf alwaysRunLeave Then
                DebugOutput 3, "    > New Path matched so leave command wouldn't have been queued, but queuing anyway because AlwaysRunLeave is True"
                shouldRunLeaveCommand = True
                Else
                DebugOutput 3, "    > Match found for new path and AlwaysRunLeave is False, not queuing leave command: " & newPath
                End If

                If shouldRunLeaveCommand Then
                If commandArray(1) <> "" Then
                DebugOutput 3, "Queuing leave command for path: " & folderPattern
                leaveCommands.Add folderPattern, commandArray(1)
                Else
                DebugOutput 3, "Tried to run leave command, but no leave command set for pattern: " & folderPattern
                End If
                End If
                Else
                DebugOutput 3, "    > No match for oldPath, not queuing leave command"
                End If
                Next

        ' Execute leave commands
        For Each folderPattern In leaveCommands.Keys
        DebugOutput 3, "------------------------------------------"
        DebugOutput 2, "Running leave command for path: " & folderPattern
        DebugOutput 2, "   Leave command: " & leaveCommands(folderPattern)

            Dim leaveCmd
            Set leaveCmd = DOpus.Create.Command
            leaveCmd.SetSourceTab sourceTab
            leaveCmd.RunCommand leaveCommands(folderPattern)
            Next
            End Sub

    Sub QueueEntryCommands(oldPath, newPath)
    Dim fsu, folderPattern, commandArray
    Set fsu = DOpus.FSUtil

        Dim folderCommandPairs: Set folderCommandPairs = ParseFolderCommandPairs()
        Dim enterCommands: Set enterCommands = CreateObject("Scripting.Dictionary")

        DebugOutput 3, "*****************************************************"
        DebugOutput 3, "Testing For Entry Commands: "

        For Each folderPattern In folderCommandPairs.Keys
        Dim wildPath: Set wildPath = fsu.NewWild(TerminatePath(folderPattern), "d")
        DebugOutput 3, "- Checking With Pattern: " & folderPattern

            commandArray = folderCommandPairs(folderPattern)
            Dim alwaysRunEntry: alwaysRunEntry = commandArray(2)(0) ' AlwaysRunEntry switch is the first element in the switches array
            DebugOutput 3, "  alwaysRunEntry: " & alwaysRunEntry

            Dim shouldQueueCommand
            shouldQueueCommand = False

            ' Check for entering a matched folder
            If wildPath.Match(newPath) Then
            DebugOutput 3, "    > Match Found For New Path -- " & newPath

                If oldPath = "" Then
                DebugOutput 3, "oldPath is empty - No need to check if still inside rule match, will queue entry command"
                shouldQueueCommand = True
                ElseIf Not wildPath.Match(oldPath) Then
                DebugOutput 3, "    > No Match For Old Path, queuing command -- " & oldPath
                shouldQueueCommand = True
                ElseIf alwaysRunEntry Then
                DebugOutput 3, "    > Old path matched so entry command would not have been queued, but queuing anyway because AlwaysRunEntry is True"
                shouldQueueCommand = True
                Else
                DebugOutput 3, "    > Match Found For Old Path and AlwaysRunEntry is False, not queuing entry command -- " & oldPath
                End If
                Else
                DebugOutput 3, "    > No Match For New Path, not queuing entry command -- " & newPath
                End If

            ' Queue entry command if applicable
            If shouldQueueCommand Then
            If commandArray(0) <> "" Then
            DebugOutput 3, "Queuing entry command for path: " & folderPattern
            enterCommands.Add folderPattern, commandArray(0)
            Else
            DebugOutput 3, "Tried to run entry command, but no entry command set for pattern: " & folderPattern
            End If
            End If
            Next

        ' Store enter commands in Script.vars for later execution
        Script.vars.Set "PendingEntryCommands", enterCommands
        End Sub

    Sub ExecuteQueuedEntryCommands(sourceTab)
    If Script.vars.Exists("PendingEntryCommands") Then
    Dim enterCommands: Set enterCommands = Script.vars.Get("PendingEntryCommands")

            ' Check if enterCommands is not empty
            If enterCommands.Count > 0 Then
            DebugOutput 3, "------------------------------------------"
            ' Execute entry commands
            Dim folderPattern
            For Each folderPattern In enterCommands.Keys
            DebugOutput 2, "Running entry command for path: " & folderPattern
            DebugOutput 2, "   Entry command: " & enterCommands(folderPattern)

                    Dim enterCmd
                    Set enterCmd = DOpus.Create.Command
                    enterCmd.SetSourceTab sourceTab
                    enterCmd.RunCommand enterCommands(folderPattern)
                    Next

                ' Clear pending entry commands
                Script.vars.Delete "PendingEntryCommands"
                Else
                DebugOutput 3, "OnAfterFolderChange - No entry commands were run. (PendingEntryCommands was empty)"
                End If
                Else
                DebugOutput 3, "OnAfterFolderChange - No entry commands were run. (PendingEntryCommands was not set)"
                End If
                End Sub

    Function OnBeforeFolderChange(beforeFolderChangeData)
    If Script.config.DebugLevel >= 2 Then
    DOpus.Output "=====================================  Folder Change ====================================="
    End If

        Dim currentPath, newPath
        currentPath = TerminatePath(beforeFolderChangeData.tab.path)
        newPath = TerminatePath(beforeFolderChangeData.path)

        DebugOutput 2, "OnBeforeFolderChange - Current path : " & currentPath
        DebugOutput 2, "OnBeforeFolderChange - New path     : " & newPath

        ' Execute leave commands
        DebugOutput 2, "------------------------------------------"
        CheckAndExecuteLeaveCommands currentPath, newPath, beforeFolderChangeData.tab

        ' Queue entry commands for execution in OnAfterFolderChange
        QueueEntryCommands currentPath, newPath

        ' Allow the folder change to proceed
        OnBeforeFolderChange = False
        End Function

    Function OnAfterFolderChange(afterFolderChangeData)
    If Not afterFolderChangeData.result Then
    DebugOutput 2, "Folder change failed, not executing entry commands"
    Exit Function
    End If

        ExecuteQueuedEntryCommands afterFolderChangeData.tab
        End Function

    Function OnActivateTab(activateTabData)
    If Script.config.DebugLevel >= 2 Then
    DOpus.Output "===================================== Tab Activation ====================================="
    End If

        Dim oldPath, newPath

        If Not activateTabData.oldtab Is Nothing Then
        'DOpus.Output("OldTab: " + activateTabData.oldtab)
        'DOpus.Output("OldTab Type: " + DOpus.TypeOf(activateTabData.oldtab))
        'DOpus.Output("OldTab Path" + activateTabData.oldtab.Path)
        oldPath = TerminatePath(activateTabData.oldtab.Path)
        Else
        oldPath = ""
        End If

        If Not activateTabData.newtab Is Nothing Then
        newPath = TerminatePath(activateTabData.newtab.Path)
        Else
        newPath = ""
        End If

        DebugOutput 2, "OnActivateTab - Old path: " & oldPath
        DebugOutput 2, "OnActivateTab - New path: " & newPath

        ' Execute leave commands
        CheckAndExecuteLeaveCommands oldPath, newPath, activateTabData.oldtab

        ' Queue and execute entry commands immediately for tab activation
        QueueEntryCommands oldPath, newPath
        ExecuteQueuedEntryCommands activateTabData.newtab
        End Function
```

**Where:**

- X is a number (1, 2, 3, etc.) to group related commands
- Available switches: AlwaysRunEntry, AlwaysRunLeave, DontResolvePath
  \-- `AlwaysRunEntry`, `AlwaysRunLeave`: Lets you run the entry/leave commands even when the next folder also matches the rule.

    \-- `DontResolvePath`: The given path will not be resolved before being checked against the lister path. May be necessary for paths like lib:// which would be re-written as C:\\Users... and therefore might not match when expected. (Detailed Explanation [here](https://resource.dopus.com/t/script-for-running-various-commands-when-entering-specific-paths/51839/3))

**Other Config Notes:**

- The folder path can include wildcards (\*), folder aliases, and Windows environment variables
- Commands can even include built-in Opus function arguments like `{sourcepath}`
- Lines starting with // are treated as comments. Empty lines are also ignored.
- `LeaveCommand` and `Switches` are optional and need not be included.

## Installation

- Open the **Script Management** window (Main Toolbar &gt; Settings &gt; Scripts)
- Drag the downloaded **AutoFolderCommand.vbs.txt** to the list.
- In the Script Management window, click the Gear to open the config settings

**Note:** It's probably necessary to temporarily enable the `DisableCache` option after changing the `FolderCommandPairs` config for changes to take effect. Restarting Opus would work too.

## Examples / Screenshots

**Example Config** (The script does have an example config set by default)

[![image](https://resource.dopus.com/uploads/default/original/3X/6/0/60a5f19869b77a14883972a66c364af92c750e18.png)
\
image721×259 12.1 KB](https://resource.dopus.com/uploads/default/original/3X/6/0/60a5f19869b77a14883972a66c364af92c750e18.png "image")

**Config Window**

[![image](https://resource.dopus.com/uploads/default/original/3X/5/8/58a4be812be0b4aa8dc1da453eb2d951cf429a4d.png)
\
image1026×814 31.3 KB](https://resource.dopus.com/uploads/default/original/3X/5/8/58a4be812be0b4aa8dc1da453eb2d951cf429a4d.png "image")

---

Changelog:

- 1.0.0 → 1.1.0:

    - Added "DontResolvePath" switch
    - Added note that standard function command arguments can be included in commands

</details>

---
