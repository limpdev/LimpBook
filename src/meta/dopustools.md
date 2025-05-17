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

## Hash Comparison

> Compare files using their hashes (big-brain shit for photo mngmt.)

<details><summary><i>HASH COMPARISON</i></summary>

```vbs
' HashCompare:
' Revision: v1.2.7 (vb)
' (c) 2016 steje
'
' This is a script for written for Directory Opus v11.
' See http://www.gpsoft.com.au/redirect.asp?page=scripts for development information.

' =====================================================================================
' ==========================   SCRIPT COMMAND: HashCompare   ==========================
'
' This script adds a new RAW 'HashCompare' command to Directory Opus The purpose of the
' command is to compare the hash value of a file (as calculated by Opus) to the hash
' value you may have copied from the website the file was downloaded from to the
' Windows clipboard...
'
' If more then one file is selected, then the clipboard contents are ignored, and the
' script instead compares the specified hash values of the selected files against one
' another.
'
' =====================================================================================

Option Explicit
Dim SCRIPT_DEBUG
SCRIPT_DEBUG = False


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Called by Directory Opus to initialize the script
Function OnInit(ByRef initData)

   DOpus.Output("Initializing...")

   ' Provide basic information about the Script
   initData.min_version = "11.16"
   initData.name = "HashCompare"
   initData.desc = "Adds the 'HashCompare' command to Directory Opus."
   initData.copyright = "(c) 2016 steje"
   initData.version = "v1.2.7 (vb)"
   initData.default_enable = True

   '////////////////////////////////////////////////
   ' The following options are user configurable via the Configure button under the scripts listing in Prefs
   '////////////////////////////////////////////////
   ' Set DEBUG flag to True in order to enable logging messages to the Opus Output Window
   initData.config.DEBUG = False
   '////////////////////////////////////////////////
   ' Set DEBUG_CLEAR flag to True in order to clear log messages from the Opus Output Window between script runs
   initData.config.DEBUG_CLEAR = False
   '////////////////////////////////////////////////
   ' Set descriptions for all script options
   initData.config_desc = DOpus.NewMap("DEBUG", "Set this option to True to enable logging to the Opus script log.", _
                                       "DEBUG_CLEAR", "Set this option to True clear messages logged to the Opus script log between script runs.")

   ' Initialize the command that this script adds
   Dim cmd
   Set cmd = initData.AddCommand()
   cmd.name = "HashCompare"
   cmd.icon = "copyfilenames"
   cmd.method = "OnHashCompare"
   cmd.desc = "If only one file is selected, HashCompare calculates a files hash values using the built-in Opus" &_
              "'Clipboard COPYNAMES=hash*' commands, and compares it to the contents of your clipboard." & vbCrLf & vbCrLf &_
              "This is intended to give you a basic match/mismatch comparison result between a files actual hash " &_
              "and the hash value posted for the file on (for example) the website it was downloaded from, which " &_
              "you've copied to the clipboard from your web browser." & vbCrLf & vbCrLf &_
              "If more than one file is selected, the clipboard contents are ignored and HashCompare instead " &_
              "compares the specified hash values of the selected files against one another."
   cmd.label = "HashCompare"
   cmd.template = "CLIP/S,FILE/S,MD5/S,SHA/S,TOFILE/S"

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Implement the HashCompare command
Function OnHashCompare(ByRef commandData)
   Dim objCmd
   Dim strCLIArgs

   Set objCmd = commandData.func.command
   If (objCmd.IsSet("$glob:SCRIPT_DEBUG")) Then SCRIPT_DEBUG = True
   If ((Script.config.DEBUG) Or (SCRIPT_DEBUG)) And (Script.config.DEBUG_CLEAR) Then DOpus.ClearOutput

   strCLIArgs = ""
   strCLIArgs = commandData.cmdline

   logMsg("")
   logMsg("----------------------------------------------------------------")
   logMsg("OnHashCompare:")
   logMsg("----------------------------------------------------------------")

   '////////////////////////////////////////////////
   ' Check for the FILE option
   If (commandData.func.args.got_arg.file) Then
      Call HashCompare_File(commandData.func)

   '////////////////////////////////////////////////
   ' Check for the TOFILE option
   ElseIf (commandData.func.args.got_arg.tofile) Then
      Call HashCompare_ToFile(commandData.func)

   '////////////////////////////////////////////////
   ' Default to the CLIP option if no arg is specified
   Else
      Call HashCompare_Clip(commandData.func)

   End If

   Set objCmd = Nothing

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Function to save the selected files hash to a text file
Function HashCompare_ToFile(ByRef Func)
   Dim objCmd, objFile
   Dim strClipOrg, strCommand, strSaveCommand, strHashType
   Const vbQuote = """"
   'logMsg("HashCompare_Clip()")

   Set objCmd = Func.command

   ' Check for current clipboard format and clear it if not text
   If (DOpus.GetClipFormat = "text") Then
      strClipOrg = DOpus.GetClip()
   Else
      strClipOrg = ""
      DOpus.SetClip()
   End If

   ' Call sub to get hash type from command line
   Call getHashType(Func.args, strCommand, strHashType)

   For Each objFile in (Func.sourcetab.selected_files)
      logMsg("File:  " & objFile.name)
      objCmd.ClearFiles
      objCmd.AddFile objFile
      objCmd.RunCommand strCommand

      strSaveCommand = "clipboard paste as=" & vbQuote & objFile.path & "/" & objFile.name & "." & strHashType & vbQuote
      logMsg(strHashType & " Hash:  " & DOpus.GetClip())
      objCmd.RunCommand strSaveCommand
   Next

   ' Reset clipboard to original contents
   DOpus.SetClip(strClipOrg)

   Set objFile = Nothing
   Set objCmd = Nothing

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' New function to handle the comparison of multiple files hashes against each other
Function HashCompare_File(ByRef Func)
   Dim objCmd, objDlg, objFile1, objFile2, objProg
   Dim strClipOrg, strFile1Hash, strFile2Hash, strHashesFromClip, strCommand, strHashType, strMessage
   'logMsg("HashCompare_File()")

   If (executeScript(Func, strClipOrg, strMessage, objCmd, objFile1, objFile2, objDlg, objProg)) Then

      ' Get the first 2 selected files for comparison
      'Set objFile1 = objCmd.files(0)
      'Set objFile2 = objCmd.files(1)

      ' Call sub to get hash type from command line
      Call getHashType(Func.args, strCommand, strHashType)

      ' Fix up dialog message
      strMessage = "Comparison of [" & strHashType & "] values:" & vbCrLf & vbCrLf

      '////////////////////////////////////////////////
      ' Add first file to command object
      objCmd.ClearFiles
      objCmd.AddFile objFile1

      ' Fix up a progress dialog to show while the hash calculation runs
      objProg.abort = True
      objProg.bytes = True
      objProg.delay = False
      objProg.full = False
      objProg.owned = True
      objProg.pause = False
      objProg.skip = False
      objProg.Init Func.sourcetab.lister, "HashCompare"
      objProg.AddFiles 2, (objFile1.size + objFile2.size)
      'objProg.HideFileByteCounts False
      objProg.SetFileSize objFile1.size
      objProg.SetFiles 2
      objProg.SetName objFile1.name
      objProg.SetPercentProgress 0
      objProg.SetType "file"

      ' Show progress dialog and run command
      objProg.Show
      objCmd.RunCommand strCommand
      'objProg.Hide

      ' Check for abort
      If (objProg.GetAbortState = "a") Then
         objDlg.title = "HashCompare:  ABORT"
         objDlg.icon = "warning"

         objDlg.message = "Comparison aborted by user..."
         objDlg.Show

         Set objProg = Nothing
         Set objFile1 = Nothing
         Set objFile2 = Nothing
         Set objDlg = Nothing
         Set objCmd = Nothing

         Exit Function
      End If

      strFile1Hash = LCase(Trim(DOpus.GetClip()))
      DOpus.SetClip()

      '////////////////////////////////////////////////
      ' Add second file to command object
      objCmd.ClearFiles
      objCmd.AddFile objFile2

      ' Fix up a progress dialog to show while the hash calculation runs
      'objProg.abort = True
      'objProg.bytes = True
      'objProg.delay = False
      'objProg.full = False
      'objProg.owned = True
      'objProg.pause = False
      'objProg.skip = False
      'objProg.Init Func.sourcetab.lister, "HashCompare"
      'objProg.AddFiles 2, (objFile1.size + objFile2.size)
      'objProg.HideFileByteCounts False
      'objProg.SetFileSize objFile2.size
      'objProg.SetFiles 2
      'objProg.SetName objFile2.name
      'objProg.SetPercentProgress 50
      'objProg.SetType "file"

      ' Show progress dialog and run command
      'objProg.Show
      objCmd.RunCommand strCommand
      objProg.Hide

      ' Check for abort
      If (objProg.GetAbortState = "a") Then
         objDlg.title = "HashCompare:  ABORT"
         objDlg.icon = "warning"

         objDlg.message = "Comparison aborted by user..."
         objDlg.Show

         Set objProg = Nothing
         Set objFile1 = Nothing
         Set objFile2 = Nothing
         Set objDlg = Nothing
         Set objCmd = Nothing

         Exit Function
      End If

      strFile2Hash = LCase(Trim(DOpus.GetClip()))

      Set objProg = Nothing

      ' Reset clipboard to original contents
      DOpus.SetClip(strClipOrg)

      ' Store filenames and hashes for copy to clipboard option
      strHashesFromClip = ""
      strHashesFromClip = strHashesFromClip & objFile1.name & ": " & strFile1Hash & vbCrLf
      strHashesFromClip = strHashesFromClip & objFile2.name & ": " & strFile2Hash

      ' Perform comparison and show result message
      Call HashCompare(objDlg, strMessage, objFile1.name, objFile2.name, strFile1Hash, strFile2Hash, strHashesFromClip)

   End If

   Set objProg = Nothing
   Set objFile1 = Nothing
   Set objFile2 = Nothing
   Set objDlg = Nothing
   Set objCmd = Nothing

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Original function of script to handle the comparison of a single files hash against the clipboard
Function HashCompare_Clip(ByRef Func)
   Dim objCmd, objDlg, objFile1, objFile2, objProg
   Dim strClipOrg, strHashFromClip, strHashFromFile, strCommand, strHashType, strMessage
   'logMsg("HashCompare_Clip()")

   If (executeScript(Func, strClipOrg, strMessage, objCmd, objFile1, objFile2, objDlg, objProg)) Then

      ' Limit the command to only the first file if multiple files are selected
      If (objCmd.files.Count > 1) Then
         objCmd.ClearFiles
         objCmd.AddFile objFile1
      End If

      ' Lower case hash from clipboard for comparison and message purposes
      strHashFromClip = LCase(Trim(strClipOrg))

      ' Call sub to get hash type from command line
      Call getHashType(Func.args, strCommand, strHashType)

      ' Fix up dialog message
      strMessage = "Comparison of [" & strHashType & "] values:" & vbCrLf & vbCrLf

      ' Fix up a progress dialog to show while the hash calculation runs
      objProg.abort = True
      objProg.bytes = True
      objProg.delay = False
      objProg.full = False
      objProg.owned = True
      objProg.pause = False
      objProg.skip = False
      objProg.Init Func.sourcetab.lister, "HashCompare"
      'objProg.AddFiles 1, objFile1.size
      'objProg.HideFileByteCounts False
      'objProg.SetFileSize objFile1.size
      objProg.SetFiles 1
      'objProg.SetName objFile1.name
      objProg.SetPercentProgress 0
      objProg.SetType "file"

      ' Show progress dialog and run command
      objProg.Show
      objCmd.RunCommand strCommand
      objProg.Hide

      ' Check for abort
      If (objProg.GetAbortState = "a") Then
         objDlg.title = "HashCompare:  ABORT"
         objDlg.icon = "warning"

         objDlg.message = "Comparison aborted by user..."
         objDlg.Show

         Set objProg = Nothing
         Set objFile1 = Nothing
         Set objFile2 = Nothing
         Set objDlg = Nothing
         Set objCmd = Nothing

         Exit Function
      End If
      Set objProg = Nothing

      ' Lower case hash from file for comparison and message purposes
      strHashFromFile = LCase(Trim(DOpus.GetClip()))

      ' Reset clipboard to original contents
      DOpus.SetClip(strClipOrg)

      ' Perform comparison and show result message
      Call HashCompare(objDlg, strMessage, "Clipboard", objFile1.name, strHashFromClip, strHashFromFile, strHashFromFile)

   End If

   Set objProg = Nothing
   Set objFile1 = Nothing
   Set objFile2 = Nothing
   Set objDlg = Nothing
   Set objCmd = Nothing

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Main comparison and display of result message
Function HashCompare(ByRef objDlg, ByRef strMessage, ByRef strItem1, ByRef strItem2, ByRef strItem1Hash, ByRef strItem2Hash, ByRef strToClip)
   'logMsg("HashCompare()")

   strMessage = strMessage & strItem1 & ":" & vbCrLf
   strMessage = strMessage & "    " & strItem1Hash & vbCrLf
   strMessage = strMessage & "    " & strItem2Hash & vbCrLf
   strMessage = strMessage & strItem2 & ":" & vbCrLf & vbCrLf

   ' Perform hash comparison and fix up message
   If ((StrComp(strItem1Hash, strItem2Hash, vbTextCompare)) = 0) Then
      objDlg.title = "HashCompare:  OK"
      objDlg.icon = "info"
      strMessage = strMessage & "Result:  OK"
      objDlg.buttons = "Ok+Copy New Hash(es) to Clipboard|Cancel"
   Else
      objDlg.title = "HashCompare:  Failed"
      objDlg.icon = "error"
      strMessage = strMessage & "Result:  FAILED"
      objDlg.buttons = "Ok+Copy New Hash(es) to Clipboard|Cancel"
   End If

   ' Show message
   logMsg(vbCrLf & strMessage)
   objDlg.message = strMessage
   objDlg.Show

   If (objDlg.result = 2) Then DOpus.SetClip(strToClip)

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Check for various things that determine if the script should run or not
Function executeScript(ByRef Func, ByRef strClipOrg, ByRef strMessage, ByRef objCmd, ByRef objFile1, ByRef objFile2, ByRef objDlg, ByRef objProg)
   'logMsg("executeScript()")

   executeScript = False

   ' Initialize empty string values
   strClipOrg = ""
   strMessage = ""

   ' Create the command and dialog objects that will be used here and in the calling functions
   Set objCmd = Func.command
   Set objDlg = Func.Dlg
   Set objProg = objCmd.progress

   '//////////////////////////////////////////////////////////////////////////////////////////////////
   ' Check for dependencies to perform HashCompare of two files
   If (Func.args.got_arg.file) Then

      ' Check for current clipboard format and clear it if not text
      If (DOpus.GetClipFormat = "text") Then
         strClipOrg = DOpus.GetClip()
      Else
         strClipOrg = ""
         DOpus.SetClip()
      End If

      ' If at least 2 files were not selected - abort
      If (objCmd.files.Count >= 2) Then
         Set objFile1 = objCmd.files(0)
         Set objFile2 = objCmd.files(1)
         If ((objFile1.is_dir) Or (objFile2.is_dir)) Then
            strMessage = strMessage & "One of the selected items is a folder, not a file"
         End If
      ElseIf (objCmd.files.Count = 0) Then
         strMessage = strMessage & "At least 2 files must be selected" & vbCrLf
      ElseIf ((objCmd.files.Count >= 1) And Not (Func.desttab = 0)) Then
         logMsg("We have a valid desttab object")
         If (Func.desttab.selected_files.Count = 0) Then
            strMessage = strMessage & "At least 2 files must be selected" & vbCrLf
         ElseIf (Func.desttab.selected_files.Count >= 1) Then
            logMsg("We have a valid desttab object AND selected file")
            Set objFile1 = objCmd.files(0)
            Set objFile2 = Func.desttab.selected_files(0)
            If ((objFile1.is_dir) Or (objFile2.is_dir)) Then
               strMessage = strMessage & "One of the selected items is a folder, not a file"
            End If
         End If
      Else
         strMessage = strMessage & "2 files must be selected" & vbCrLf
      End If

   '//////////////////////////////////////////////////////////////////////////////////////////////////
   ' If the Clip option was used
   ' Check for current clipboard format and abort if not text
   Else
      If (DOpus.GetClipFormat = "text") Then
         strClipOrg = DOpus.GetClip()
         If strClipOrg = "" Then strMessage = "Clipboard is empty" & vbCrLf
      Else
         strMessage = "Clipboard contents do NOT appear to be TEXT, or is empty..." & vbCrLf
      End If

      ' Check if no files were selected
      If (objCmd.files.Count = 0) Then
         strMessage = strMessage & "No files selected" & vbCrLf
      Else
         Set objFile1 = objCmd.files(0)
         If (objFile1.is_dir) Then
            strMessage = strMessage & "One of the selected items is a folder, not a file"
         End If
      End If
   End If

   If Not (strMessage = "") Then
      objDlg.title = "HashCompare:  ABORT"
      objDlg.icon = "warning"
      objDlg.message = strMessage

      objDlg.Show

      Set objProg = Nothing
      Set objFile1 = Nothing
      Set objFile2 = Nothing
      Set objDlg = Nothing
      Set objCmd = Nothing

      Exit Function
   End If

   executeScript = True

End Function


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Subroutine to get the hash type from the command line args
Sub getHashType(ByRef Args, ByRef strCommand, ByRef strHashType)
   'logMsg("getHashType()")

   ' Check for the SHA option
   If (Args.got_arg.sha) Then
      strCommand = "Clipboard COPYNAMES=hash6"
      strHashType = "SHA"
   ' Set the default clipboard command and hashtype to MD5 if nonoe was specified
   Else
      strCommand = "Clipboard COPYNAMES=hash3"
      strHashType = "MD5"
   End If

End Sub


'//////////////////////////////////////////////////////////////////////////////////////////////////
' Subroutine that uses DEBUG variables to control whether logging is performed or not
Sub logMsg(ByRef message)

   If ((Script.config.DEBUG) Or (SCRIPT_DEBUG)) Then DOpus.Output(message)

End Sub
```

</details>

---

## IconTools

<details><summary><i>IconTools</i></summary>

# [IconTools (extract single icons from iconset, html reference page)](/t/icontools-extract-single-icons-from-iconset-html-reference-page/51407)

[Buttons/Scripts](/c/buttons-scripts/16)

[script](https://resource.dopus.com/tag/script), [commands](https://resource.dopus.com/tag/commands), [jscript](https://resource.dopus.com/tag/jscript)

[MartO](https://resource.dopus.com/u/MartO) June 20, 2024, 4:50pm 1

I'm (constantly) working on my own iconset and found that a few tools would be very helpful for this.
*(Note: Requires ImageMagick – see below.)*

This script offers a) **the one-click extraction and naming of all single icons** from an iconset and b) the generation of an **html page as an iconset reference** including names and positions. Multiple sets in one .xml file and alternative "dark" icons are supported, but image formats other than PNG aren't.

![:one:](https://resource.dopus.com/images/emoji/twitter/one.png?v=12 ":one:") **Extracting single icons**

Since I'm designing the icons as one complete set in Inkscape, the export is just one image to embed in the DOpus iconset. However, sometimes I need the individual icons as well (eg. for use in dialog buttons) – and exporting them one by one is a pain. So this script allows you to do that more painlessly.

The command is: `GenerateIcons MODE single XMLFILE "c:\\path\\file.xml"`

**The corresponding .png file must be present in the same folder.** The script won't work on files inside a .zip/.dis file.

This will ask you to select a set from the .xml file and then create a subdirectory called "single" and in it all the individual icons with the names from the .xml, **overwriting** any existing files.

Depending on the number of icons, your system's speed etc. this may take a few seconds. Be patient; a popup will inform you when it's done. ![:smiley:](https://resource.dopus.com/images/emoji/twitter/smiley.png?v=12 ":smiley:")

![:two:](https://resource.dopus.com/images/emoji/twitter/two.png?v=12 ":two:") **Generating an HTML reference file**

Another thing I keep needing is a lookup feature: What is that icon called? What row/column is it in? Or what does the "whatever" icon look like in that iconset? I know I can use dopus to achieve that but I wanted a simpler solution.
Using the amazing [Fluent Style Icon Set](https://resource.dopus.com/t/fluent-style-icon-set/46558) by [@skinz](/u/skinz) as an example, this is what that looks like:

[![html1](https://resource.dopus.com/uploads/default/optimized/3X/6/6/668b436a4df926977ad7a3d2ab163f2a1851d8c4_2_478x500.jpeg)
\
html1721×754 232 KB](https://resource.dopus.com/uploads/default/original/3X/6/6/668b436a4df926977ad7a3d2ab163f2a1851d8c4.jpeg "html1")

(Note the extra info at the mouse position.)
...or with an active search:

[![html2](https://resource.dopus.com/uploads/default/optimized/3X/d/9/d9a7d78381e0ce691012960cc774e687a3d3c94f_2_482x500.jpeg)
\
html2720×746 26.3 KB](https://resource.dopus.com/uploads/default/original/3X/d/9/d9a7d78381e0ce691012960cc774e687a3d3c94f.jpeg "html2")

The command for this: `GenerateIcons MODE html XMLFILE {filepath$}`

To change the background colors (eg. to match the ones in your own setup):
`GenerateIcons MODE html XMLFILE {filepath$} COLORDARK #123456 COLORLIGHT #abcdef`

This will create an .html file with the same name as the iconset. Open it in the browser, hover over an icon to see its data or use the search bar to, well, search. ![:wink:](https://resource.dopus.com/images/emoji/twitter/wink.png?v=12 ":wink:")

![:three:](https://resource.dopus.com/images/emoji/twitter/three.png?v=12 ":three:") Installation

a) Download the script and install it as usual:

[IconTools.osp](/uploads/short-url/tDqbAD9NjB4cJ75dJ4hSccB1L2B.osp) (5.7 KB)

Note that it is not mandatory for the included template file (*IconTools\_template.html*) to be residing in the Script Addins folder. Any other location (eg. User Data) is fine, just update the configuration.

b) Download and install [ImageMagick](https://imagemagick.org/). It's free and open source. There's quite a (confusing) choice on the download page; they offer a portable version as well in case you're like me and don't like installers. (I went with the *Portable Win64 static at 8 bits-per-pixel component* option.)
This tool has amazing capabilities but the learning curve is quite steep...

c) In DOpus, configure the script: It needs the locations of magick.exe and the template file.

d) Set up your buttons.

e) That's it. I hope. ![:thinking:](https://resource.dopus.com/images/emoji/twitter/thinking.png?v=12 ":thinking:")

* * *

The "infrasctructure" around my scripts has grown over the years and it's not easy to extract just one stand-alone script, so I had to uglify ![:smile:](https://resource.dopus.com/images/emoji/twitter/smile.png?v=12 ":smile:") it in a few places and to add a few helpers at the end of the file.
**Note that the script extends JScript classes** by adding polyfills: String.trim(), String.endsWith(), Array.forEach()

I'm sure the script offers lots of room for improvement and I *might* continue working on it, but for now it does what I need. I'd be happy if it helped someone else too...


</details>

***

## Tagger

<details><summary><i>SMART FILE TAGGING</i></summary>

[Directory Opus Resource Centre](/)

# [Tagger3 for DOpus12](/t/tagger3-for-dopus12/24248)

[Buttons/Scripts](/c/buttons-scripts/16)

[script](https://resource.dopus.com/tag/script), [vbscript](https://resource.dopus.com/tag/vbscript), [user-interface](https://resource.dopus.com/tag/user-interface)

[kundal](https://resource.dopus.com/u/kundal) November 25, 2016, 7:11pm 1

Many thanks to **abr** for participating in the development of Tagger. Many features are based on his testing, feedback and suggestions.

**This new version requires at least DOpus v.12.2.3 to work. There's an older Version for DOpus 11 [here](https://resource.dopus.com/t/tagger/18010/1).**
**If you're using DOpus v.13.0.36 BETA or higher you'll need another version provided at the bottom of this post.**

**Short description:**
Tagger is a Script Add-In for Directory Opus that provides a resizable dialog. DOpus will remember size and position of the dialog.
The purpose of Tagger is to comfortably show, find, edit, replace, add or delete Tags or Comment and Rating for files and folders. When you start Tagger the tags, comments and ratings of all files in the current folder are read and stored in a dictionary for performance reasons. So if you are in a folder with a lot of files it may take a few seconds until the dialog appears.
The dialog shows all tags or the comment of a single file in a list where you can directly edit each entry.
You can also select a range of files. Tagger will then show tags or comment and rating if they exist in all selected files.
You can search for a certain tag, a rating value (0-5) or for comments containing a certain string by entering the search string in the main input field and pressing the hotkey **alt+f**. Tagger will select all files containing the specified tag, comment or rating and show the shared string in the list or in the rating input field. For comment Tagger will show all comments containing the search string in the list and the index of the file that contains the comment in a second column.
You can sort all tags in all files in the current folder alphabetically by pressing the hotkey **alt+s**.
You can always edit tags or comment in the list, change rating or add/replace/delete tags or comment for each selected file or folder using the "Apply" or "Remove" button.

**Installation:**

- Download the file **Command.File\_Tagger.vbs.txt** and copy it to **/dopusdata/Script AddIns** or drag it into the settings window **Settings =&gt; Preferences =&gt; Toolbar =&gt; Scripts**

**Script Configuration:**

- Go to **Settings =&gt; Preferences =&gt; Toolbar =&gt; Scripts**. Click the entry **Command.File: Tagger**.
- **Language:** Select the language in which you want to show the dialog. Currently available are english, deutsch and français. "default" shows the dialog in the current language of DOpus if available, otherwise in english.
- **ShowIndexColumn:** By default Tagger always shows the column "Index". If you don't want this change this option to "False".
- **Hot\_\[x]:** You can change the default hotkeys here. See the discription of each hotkey at the bottom of the script configuration window.
- **vHot\_\[x]:** These hotkeys are only available when working with the standalone viewer (Argument VIEWER). Nearly all default hotkeys of the viewer are also available from the Tagger GUI. Several of the original hotkeys needed to be modified by an additional modifier key. Download the file TaggerHotkeys.txt for a complete list of supported hotkeys.
- **MyHotkey:** You can specify a user defined hotkey like "alt+v" here.
- **MyCommand:** Specify the command the hotkey "MyHotkey" will execute.

**Create and configure a button or hotkey:**

- Create a button or hotkey with the command **Tagger**. If you want to start Tagger in Comment mode press the modifier key **Strg** on the keyboard when you click the button (not working if Tagger is called by an embedded command).
- You can add several arguments:
- **APP**: provide path and command line options of an application to open the selected file. Example for Foobar2000: APP="/programfilesx86\\foobar2000\\foobar2000.exe /immediate"
- **CLOSEAPP**: together with the Argument **VIEWER** this will close the standalone viewer together with Tagger. For other applications you can provide a command to close the application. Example for Foobar2000: CLOSEAPP="/programfilesx86\\foobar2000\\foobar2000.exe /exit"
- **CONFIRMDELETE**: show a confirmation dialog when deleting Tags or comments.
- **FILTER**: apply a filter if you want to work work with certain file types only. Other files will be hidden. Examples : FILTER=\*.(jpg|png) or FILTER=grp:images
- **NOFOLDERS**: hide folders. If you use the argument **VIEWER** you don't need to provide this argument because folders are always hidden (the standalone viewer doesn't like folders). If this argument was provided and a single folder is selected at start, Tagger will open this folder and select the first file.
- **OPACITY**: make the dialog transparent (0= fully transparent, 255 = opaque). This is especially useful when you're working with the standalone viewer.
- **READONLY:** apply this argument if you only want to watch the metadata of the files and prevent to make any changes to the files. Several dialog controls will be disabled in this mode.
- **VIEWER**: if you want to use the standalone viewer use this argument for a button in the toolbar of the viewer. If you want to start Tagger from a lister toolbar you'll have to start the viewer first and start Tagger with an embedded command like this:

```
Show FULLSCREEN AUTOFILELIST
[
Tagger VIEWER FILTER=grp:images CLOSEAPP CONFIRMDELETE OPACITY=180
]
```

[![](https://resource.dopus.com/uploads/default/original/2X/a/a584253eb7df77aee5584217fc1b0e563bd1734c.jpg)
\
5fba1bc5c7792efe8662de2937ca618402b6c5d4.jpg677×625 73.7 KB](https://resource.dopus.com/uploads/default/original/2X/a/a584253eb7df77aee5584217fc1b0e563bd1734c.jpg "5fba1bc5c7792efe8662de2937ca618402b6c5d4.jpg")

**The dialog and it's controls:**

- **List:** in the listview control you'll see the tags or the comment of the currently selected file. Above the listview control you'll see the count of existing tags. If you select more than one file the list will only show tags or comment if they exist in all selected files. You can inline rename each entry and the changes will be written to the files. If you delete all characters from an entry the tag or comment will be deleted. Doubleclick a listview item to copy it to the main input.
- **Name field:** if only one file is currently selected this field will show the index and the name of the file. Otherwise it will only show how many files are currently selected. In some situations you may see a notification here.
- **Main input:** write tags or comment you want to apply to all selected files using the "Apply" button here. For tags you can enter any semicolon-separated string according to the rules documented in [Keywords for SetAttr META](https://www.gpsoft.com.au/help/opus12/index.html#!Documents/Keywords_for_SetAttr_META.htm). You can also use the main input for the Find feature of Tagger: Enter a string representing a tag and press the hotkey **alt+f** to find and select all files containing this tag ("+" or "-" at the beginning and ";" at the end of the string will be ignored). In comment mode Tagger will find all files with a comment containing the searchstring and show all these comments in the list. In a second column of the listview control the index of the file containing the comment will be shown. If you enter a number between 0 and 5 Tagger will find all files rated with this value. If you want to find all files rated 3,4 or 5 enter "3,4,5".
- **Lock checkbox**: by default, the main input will be cleared when the Apply or Remove button was clicked. Enable the checkbox to preserve the content of the main input. This can be useful to collect tags from several files using the "doubleclick listview item" feature and afterwards write them to others. The hotkey **alt+l** toggles the state of the checkbox.
- **Combobox1:** select Tags or Comment mode. The hotkey **alt+m** toggles this control.
- **Combobox2:** choose the behaviour of Tagger when the Apply or Remove button was clicked: **arrow down:** select next file **arrow up:** select previous file **square:** stay here
- **Button "C" (Copy):** click this button to copy all tags or the comment shown in the list to the main input. Hotkey: **alt+c**
- **Rating input:** provides a scrollable list of rating values 0-5. If more than one file is selected this control will only show a value if all files have the same rating value. Otherwise it will be empty. If you change the value of this control, the rating value will always be written to the selected files when you click the Apply or Remove button. Hotkeys: **alt+\[0-5] or alt+\[NUM0-NUM5]**.
- **Range input:** this control will always show the index or range of the selected files. You can enter a index or range to select files. If you delete the content of the input field Tagger will select the last single selected file. Tagger will also select the last single file if several files are selected and you click the Next or Previous button or the Apply or Remove button according to the setting of Combobox2.
- **Next Button (arrow down):** select the next single file without writing anything to selected files. Hotkeys: **alt++ and alt+NUM+**
- **Previous Button (arrow up):** select the previous single file without writing anything to selected files. Hotkey: **alt+- and alt+NUM-**
- **Apply button:** apply tags or comment written to the main input and rating written to the rating input to all selected files. If the main input is empty or just "+" or "-" nothing new will be written to the files but if you are in Tags mode and a single file is selected the tags of the file will be alphabetically sorted and rewritten to the file. Hotkey: **alt+a**
- **Remove button:** the Remove button will delete all tags or the comment of all selected files if no items are selected in the list. Otherwise the button will only delete the selected items from all selected files. Hotkey: **alt+d**

**Other features:**
Some features are only available by pressing a hotkey on the keyboard:

- **Find (alt+f):.** see short description and description of the main input dialog control.
- **Sort (alt+s):** this will rewrite the tags of all files in the source folder alphabetically sorted. Since this needs some time for many files you'll see a notification in the name field until all files are written.
- **Refresh (alt+F5):** Tagger will notice if the sourcepath from which it was started or the number of files in the folder has changed and automatically refresh the dictionary in which the informations about all files are stored. You will be notified about this event in the name field. However, not all possible changes are detected by Tagger. If you made changes to the files outside of Tagger (replace files, manually write tags to files) you should use this hotkey to refresh Tagger. Otherwise Tagger may show false information about existing tags.
- **TaggerFocus:** Tagger will move the focus from the viewer window to the Tagger GUI when the global Variable TaggerFocus exists. To use this feature create a viewer hotkey with this command:

  ```
  @set glob!:TaggerFocus = True
  ```

  Currently DOpus can't move the focus from the Tagger GUI to the viewer but you can use the command line tool [nircmd.exe](http://www.nirsoft.net/utils/nircmd.html) and MyHotkey/MyCommand described above to do this. To toggle the focus from Tagger to the viewer window MyCommand would be:

  ```
  [path to]nircmd.exe win activate stitle "Tagger - "
  ```

  Apply the same hotkey like "alt+v" to the viewer hotkey and MyHotkey to get a hotkey that toggles the focus between Tagger GUI and viewer window.

**Translations:**
I'm not sure if my french translation is good because I'm not good in french. Please shout if something should be changed.
If you want to have Tagger in your own language feel free to download the provided text file **LanguageStrings.txt**, translate the strings and upload your translation here. I'll be glad to add new languages.
[Tagger\_Hotkeys.txt](https://resource.dopus.com/uploads/default/original/3X/5/8/58b890b76f9081975a7be48ab09e515e9dc08793.txt) (2.07 KB)
[Command.File\_Tagger.vbs.txt](/uploads/short-url/2slU3I7TCd0dZYbMdq8cElKpCKq.txt) (76.6 KB)
[LanguageStrings.txt](https://resource.dopus.com/uploads/default/original/3X/9/e/9e14e12d1900e37862b3f114f7767474358f8917.txt) (1.06 KB)

**Version 3.4 for DOpus v13 (will not work with DOpus v12!)**
[Command.File\_Tagger.vbs.txt](/uploads/short-url/gDRUUMnJV0FdFnB9sXCSyZPr9WU.txt) (75.7 KB)

3 Likes

[Tagger](https://resource.dopus.com/t/tagger/18010/2)

[Using Opus to manage &amp; organise photos](https://resource.dopus.com/t/using-opus-to-manage-organise-photos/25215/2)

[Append Tags](https://resource.dopus.com/t/append-tags/42219/20)

[Any plans to support TagSpace's Sidecar tagging method?](https://resource.dopus.com/t/any-plans-to-support-tagspaces-sidecar-tagging-method/38647/8)

[Picture metadata: "Description" Field](https://resource.dopus.com/t/picture-metadata-description-field/26076/7)

[Tagger3 changed it's behaviour](https://resource.dopus.com/t/tagger3-changed-its-behaviour/46222)

[Tagging Improvements](https://resource.dopus.com/t/tagging-improvements/53570/34)

[kundal](https://resource.dopus.com/u/kundal) November 25, 2016, 7:16pm 2

### 25.11.2016:

- Tagger v3.0 published.

### 26.11.2016: Update to v3.1:

- Bugfix: if the arguments VIEWER and CLOSEAPP where applied and another instance of the viewer got the focus Tagger was closed although the parent viewer window still existed.
- New feature: Tagger will now get notified if the currently shown image in the standalone viewer has changed and select the new image when the dialog gets the focus again.

### 29.11.2016: Update to v3.2:

- Tagger now follows the selection in the viewer in realtime with a 300ms delay.
- Tagger and it's parent viewer window are now working correctly with FlatView.
- Some changes to avoid script errors when a bad button code with the argument VIEWER was used. For example if you use Tagger VIEWER from a button in a lister toolbar without starting Tagger "embedded" (enclosed in square brackets) or without starting a viewer instance first you'll no longer get a script error. If a viewer window exists Tagger will close that window and behave as if the argument VIEWER wasn't given.

### 09.12.2016: Update to v3.3:

- Bugfix: Tagger is no longer steeling the focus when you change the currently displayed image from the viewer window.
- Nearly all default hotkeys of the standalone viewer are also available from the Tagger GUI now. Several hotkeys needed to be modified with an additional modifier key. Download the file "TaggerHotkeys.txt" from the first post for a complete list of supported hotkeys.
- Added "Myhotkey" and "MyCommand" to the script configuration. You can specify your own hotkey that executes a user defined command with these options.
- To toggle the focus from the viewer to the Tagger GUI you can now create a new viewer hotkey that creates a global variable named "TaggerFocus". Tagger will detect this variable and move the focus to it's main input field. The command for the viewer hotkey is: `@set glob!:TaggerFocus = True`
- Updated the first post to describe the new features. Below "Other features" there's also a description how to create a hotkey that toggles the focus between Viewer window and Tagger GUI using "TaggerFocus", "MyHotkey/MyCommand" and the command line tool "nircmd.exe".

### 19.10.2023: Update to v3.4:

Some small fixes for issues with Opus v.13(BETA). will not work with v.12.

</details>
