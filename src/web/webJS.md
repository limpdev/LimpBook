# JavaScript For The Web🚀

#### Scripts & Tags

  * `<head>` -> scripts in the head typically will execute first. Use if the JS needs to be ready prior to content loading + **any libraries/frameworks**.

  * `<body>` -> _usually this tag is injected at the end_ ; thus, ensuring content is loaded first. Can also appear to increase the webpage speed.




> [!TIP] Use the `src` attribute to link paths for scripts

#### Adjust Timings -> DOMContent

`document.addEventListener('DOMContent-Loaded', function() {...});` -> Code sitting inside the `{...}` is ensured to execute _only after_ HTML content has loaded.

#### Interactive Objects
``` 
    <button
        id="coolButt">Click Me!
    </button>
    <script>
    document.getElementId('coolButt').onClick = function()
    {
        alert('Butt was poked!');
        };
    </script>
    
```
