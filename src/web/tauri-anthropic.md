## Tauri, From Sonnet

> For Tauri applications, you can control file downloads using the tauri::api::path API
along with the dialog API to handle file downloads to specific directories.
Here's how you can implement this:

First, make sure you have the required permissions in your tauri.conf.json:

```json
{
  "tauri": {
    "allowlist": {
      "fs": {
        "all": true,
        "readFile": true,
        "writeFile": true,
        "createDir": true,
        "scope": ["$APPDATA/*", "$DOWNLOAD/*", "$DOCUMENT/*"]
      },
      "path": {
        "all": true
      },
      "dialog": {
        "all": true
      }
    }
  }
}
```

### For the Rust backend:

```rust
#[tauri::command]
async fn download_file(app_handle: tauri::AppHandle, url: String, filename: String) -> Result<String, String> {
    // Get the app config directory
    let app_dir = app_handle
        .path_resolver()
        .app_data_dir()
        .expect("Failed to get app data directory");

    // Create a "downloads" subdirectory
    let downloads_dir = app_dir.join("downloads");
    std::fs::create_dir_all(&downloads_dir).map_err(|e| e.to_string())?;

    // Create the full file path
    let file_path = downloads_dir.join(filename);

    // Download the file
    let response = reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?;

    let bytes = response.bytes()
        .await
        .map_err(|e| e.to_string())?;

    // Write the file
    std::fs::write(&file_path, bytes)
        .map_err(|e| e.to_string())?;

    Ok(file_path.to_string_lossy().into_owned())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```
### Javascript/Typescript snippet:

```javascript
import { invoke } from '@tauri-apps/api/tauri';

async function downloadFile(url: string, filename: string) {
    try {
        const filePath = await invoke('download_file', {
            url,
            filename
        });
        console.log('File downloaded to:', filePath);
    } catch (error) {
        console.error('Download failed:', error);
    }
}

// Usage example:
downloadFile('https://example.com/file.pdf', 'document.pdf');
```
## If you want to choose the download directory:

```rust
use tauri::api::dialog;

#[tauri::command]
async fn download_file_with_dialog(app_handle: tauri::AppHandle, url: String, filename: String) -> Result<String, String> {
    // Show folder selection dialog
    let folder_path = dialog::blocking::FileDialogBuilder::new()
        .set_title("Choose download location")
        .pick_folder();

    let folder_path = match folder_path {
        Some(path) => path,
        None => return Err("No folder selected".to_string()),
    };

    // Create the full file path
    let file_path = folder_path.join(filename);

    // Download the file
    let response = reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?;

    let bytes = response.bytes()
        .await
        .map_err(|e| e.to_string())?;

    // Write the file
    std::fs::write(&file_path, bytes)
        .map_err(|e| e.to_string())?;

    Ok(file_path.to_string_lossy().into_owned())
}
```

### And finally, progress tracking:

```rust
#[tauri::command]
async fn download_file_with_progress(
    app_handle: tauri::AppHandle,
    window: tauri::Window,
    url: String,
    filename: String
) -> Result<String, String> {
    let response = reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?;

    let total_size = response.content_length().unwrap_or(0);
    let mut downloaded = 0;

    // Stream the download with progress updates
    let mut stream = response.bytes_stream();
    let mut file = std::fs::File::create(filename).map_err(|e| e.to_string())?;

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| e.to_string())?;
        downloaded += chunk.len() as u64;
        file.write_all(&chunk).map_err(|e| e.to_string())?;

        // Emit progress event
        window.emit("download-progress", {
            progress: (downloaded as f64 / total_size as f64) * 100.0
        }).unwrap();
    }

    Ok("Download complete".to_string())
}
```

### For updating the cargo.toml with necessary dependencies:

```rust
[dependencies]
reqwest = { version = "0.11", features = ["stream"] }
tokio = { version = "1.0", features = ["full"] }
futures-util = "0.3"
```
