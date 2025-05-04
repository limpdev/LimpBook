# Line Deleter | Powershell Command

> Delete lines one through...

```powershell
Get-ChildItem -Filter *.md | ForEach-Object {
    $path = $_.FullName
    (Get-Content $path | Select-Object -Skip 1) | Set-Content $path
}
```
