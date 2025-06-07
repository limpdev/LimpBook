[Skip to main content](dogsapi.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/tutorials/dogsapi) (v2.10).

- [](https://wails.io/)
- Tutorials
- Dogs API

Version: Next Version 🚧

On this page

# Dogs API

![](../../../assets/images/img-ccbc6791c2af1b4202e500df2db460c3.webp)

note

This tutorial has been kindly provided by [@tatadan](https://twitter.com/tatadan) and forms part of their [Wails Examples Repository](https://github.com/tataDan/wails-v2-examples).

In this tutorial we are going to develop an application that retrieves photos of dogs from the web and then displays them.

### Create the project[​](dogsapi.html#create-the-project "Direct link to heading")

Let's create the application. From a terminal enter: `wails init -n dogs-api -t svelte`

Note: We could optionally add `-ide vscode` or `-ide goland` to the end of this command if you wanted to add IDE support.

Now let's `cd dogs-api` and start editing the project files.

### Remove unused code[​](dogsapi.html#remove-unused-code "Direct link to heading")

We will start by removing some elements that we know we will not use:

- Open `app.go` and remove the following lines:

```go
// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s, It's show time!", name)
}
```

- Open `frontend/src/App.svelte` and delete all lines.
- Delete the `frontend/src/assets/images/logo-universal.png` file

### Creating our application[​](dogsapi.html#creating-our-application "Direct link to heading")

Now let's add our new Go code.

Add the following struct declarations to `app.go` before the function definitions:

```go
type RandomImage struct {
    Message string
    Status  string
}

type AllBreeds struct {
    Message map[string]map[string][]string
    Status  string
}

type ImagesByBreed struct {
    Message []string
    Status  string
}
```

Add the following functions to `app.go` (perhaps after the existing function definitions):

```go
func (a *App) GetRandomImageUrl() string {
    response, err := http.Get("https://dog.ceo/api/breeds/image/random")
    if err != nil {
        log.Fatal(err)
    }

    responseData, err := ioutil.ReadAll(response.Body)
    if err != nil {
        log.Fatal(err)
    }

    var data RandomImage
    json.Unmarshal(responseData, &data)

    return data.Message
}

func (a *App) GetBreedList() []string {
    var breeds []string

    response, err := http.Get("https://dog.ceo/api/breeds/list/all")
    if err != nil {
        log.Fatal(err)
    }

    responseData, err := ioutil.ReadAll(response.Body)
    if err != nil {
        log.Fatal(err)
    }

    var data AllBreeds
    json.Unmarshal(responseData, &data)

    for k := range data.Message {
        breeds = append(breeds, k)
    }

    sort.Strings(breeds)

    return breeds
}

func (a *App) GetImageUrlsByBreed(breed string) []string {

    url := fmt.Sprintf("%s%s%s%s", "https://dog.ceo/api/", "breed/", breed, "/images")
    response, err := http.Get(url)
    if err != nil {
        log.Fatal(err)
    }

    responseData, err := ioutil.ReadAll(response.Body)
    if err != nil {
        log.Fatal(err)
    }

    var data ImagesByBreed
    json.Unmarshal(responseData, &data)

    return data.Message
}
```

Modify the `import` section of `app.go` to look like this:

```go
import (
    "context"
    "fmt"
    "encoding/json"
    "io/ioutil"
    "log"
    "net/http"
    "sort"
)
```

Add the following lines to `frontend/src/App.svelte`:

```html
<script>
  import { GetRandomImageUrl } from "../wailsjs/go/main/App.js";
  import { GetBreedList } from "../wailsjs/go/main/App.js";
  import { GetImageUrlsByBreed } from "../wailsjs/go/main/App.js";

  let randomImageUrl = "";
  let breeds = [];
  let photos = [];
  let selectedBreed;
  let showRandomPhoto = false;
  let showBreedPhotos = false;

  function init() {
    getBreedList();
  }

  init();

  function getRandomImageUrl() {
    showRandomPhoto = false;
    showBreedPhotos = false;
    GetRandomImageUrl().then((result) => (randomImageUrl = result));
    showRandomPhoto = true;
  }

  function getBreedList() {
    GetBreedList().then((result) => (breeds = result));
  }

  function getImageUrlsByBreed() {
    init();
    showRandomPhoto = false;
    showBreedPhotos = false;
    GetImageUrlsByBreed(selectedBreed).then((result) => (photos = result));
    showBreedPhotos = true;
  }
</script>

<h3>Dogs API</h3>
<div>
  <button class="btn" on:click={getRandomImageUrl}>
    Fetch a dog randomly
  </button>
  Click on down arrow to select a breed
  <select bind:value={selectedBreed}>
    {#each breeds as breed}
      <option value={breed}>
        {breed}
      </option>
    {/each}
  </select>
  <button class="btn" on:click={getImageUrlsByBreed}>
    Fetch by this breed
  </button>
</div>
<br />
{#if showRandomPhoto}
  <img id="random-photo" src={randomImageUrl} alt="No dog found" />
{/if}
{#if showBreedPhotos}
  {#each photos as photo}
    <img id="breed-photos" src={photo} alt="No dog found" />
  {/each}
{/if}

<style>
  #random-photo {
    width: 600px;
    height: auto;
  }

  #breed-photos {
    width: 300px;
    height: auto;
  }

  .btn:focus {
    border-width: 3px;
  }
</style>
```

### Testing the application[​](dogsapi.html#testing-the-application "Direct link to heading")

To generate the bindings and test the application, run `wails dev`.

### Compiling the application[​](dogsapi.html#compiling-the-application "Direct link to heading")

To compile the application to a single, production grade binary, run `wails build`.

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/tutorials/dogsapi.mdx)

[Previous  
\
Hello World](helloworld.html)

Hello World | Wails

[Skip to main content](helloworld.html#docusaurus_skipToContent_fallback)

This is unreleased documentation for Wails **Next Version 🚧** version.

For up-to-date documentation, see the [**latest version**](https://wails.io/docs/tutorials/helloworld) (v2.10).

- [](https://wails.io/)
- Tutorials
- Hello World

Version: Next Version 🚧

On this page

# Hello World

The aim of this tutorial is to get you up and running with the most basic application using Wails. You will be able to:

- Create a new Wails application
- Build the application
- Run the application

note

This tutorial uses Windows as the target platform. Output will vary slightly depending on your operating system.

## Create a new Wails application[​](helloworld.html#create-a-new-wails-application "Direct link to heading")

To create a new Wails application using the default vanilla JS template, you need to run the following command:

```bash
wails init -n helloworld
```

You should see something similar to the following:

```text
Wails CLI v2.0.0

Initialising Project 'helloworld'
---------------------------------

Project Name:      helloworld
Project Directory: C:\Users\leaan\tutorial\helloworld
Project Template:  vanilla
Template Support:  https://wails.io

Initialised project 'helloworld' in 232ms.
```

This will create a new directory called `helloworld` in the current directory. In this directory, you will find a number of files:

```text
build/       - Contains the build files + compiled application
frontend/    - Contains the frontend files
app.go       - Contains the application code
main.go      - The main program with the application configuration
wails.json   - The project configuration file
go.mod       - The go module file
go.sum       - The go module checksum file
```

## Build the application[​](helloworld.html#build-the-application "Direct link to heading")

To build the application, change to the new `helloworld` project directory and run the following command:

```bash
wails build
```

You should see something like the following:

```text
Wails CLI v2.0.0

App Type:               desktop
Platforms:              windows/amd64
Compiler:               C:\Users\leaan\go\go1.18.3\bin\go.exe
Build Mode:             Production
Devtools:               false
Skip Frontend:          false
Compress:               false
Package:                true
Clean Build Dir:        false
LDFlags:                ""
Tags:                   []
Race Detector:          false

Building target: windows/amd64
------------------------------
  - Installing frontend dependencies: Done.
  - Compiling frontend: Done.
  - Generating bundle assets: Done.
  - Compiling application: Done.
Built 'C:\Users\leaan\tutorial\helloworld\build\bin\helloworld.exe' in 10.616s.
```

This has compiled the application and saved it in the `build/bin` directory.

## Run the application[​](helloworld.html#run-the-application "Direct link to heading")

If we view the `build/bin` directory in Windows Explorer, we should see our project binary:

![](data:image/webp;base64,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)

We can run it by simply double-clicking the `helloworld.exe` file.

On Mac, Wails generates a `helloworld.app` file which can be run by double-clicking it.

On Linux, you can run the application using `./helloworld` from the `build/bin` directory.

You should see the application working as expected:

![](../../../assets/images/windows-default-app-c9952b68a41c1051af13cd5cce090efe.webp)

[Edit this page](https://github.com/wailsapp/wails/edit/master/website/docs/tutorials/helloworld.mdx)

[Previous  
\
Windows](../guides/windows.html)

[Next  
\
Dogs API](dogsapi.html)