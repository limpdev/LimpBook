#   Directory Opus

> Here are some potentially useful `DOpus` commands written in either JavaScript or Visual Basic Script.

---

## Move Selected  New Subfolder

Simplified Approach: new folder will be named after the *first selected file* automatically. Can be exchanged for a user prompt instead...

```bash
@nofilenamequoting
Copy MOVE HERE CREATE FOLDER="{file|noext}"
```



  (Complicated)

```js
function OnClick(clickData)
{
    var cmd = clickData.func.command;
    if (clickData.func.sourcetab.selected.count == 0)
    {
        cmd.RunCommand('CreateFolder READAUTO=no');
    }
    else
    {
        cmd.SetModifier('nofilenamequoting');
        cmd.AddLine('@set dir={dlgstrings|Enter new subfolder name|{file|noext}}');
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
