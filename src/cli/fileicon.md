
# fileicon

> Manage custom file and folder icons.

```
- Set a custom icon for a specific file or directory:
    fileicon set path/to/file_or_directory path/to/icon_file.png

- Remove a custom icon from a specific file or directory:
    fileicon rm path/to/file_or_directory

- Save the custom icon of a file or directory as a `.icns` file into the current directory:
    fileicon get path/to/file_or_directory

- Test if a specific file or directory has a custom icon:
    fileicon test path/to/file_or_directory
```
> Here’s a Zsh shell script that takes one or more PNG files as arguments, converts each into an ICNS file, and outputs the `.icns` files in the same directory as the input PNGs:

### Script: `png_to_icns.sh`

```bash
# Check if at least one PNG file is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <file1.png> [file2.png ...]"
  exit 1
fi
```

```bash
# Loop through each PNG file provided as an argument
for png_file in "$@"; do
  # Check if the file exists and is a PNG
  if [[ ! -f "$png_file" || "${png_file: -4}" != ".png" ]]; then
    echo "Skipping invalid file: $png_file (must be a .png file)"
    continue
  fi

  # Create a temporary iconset directory
  iconset_dir="${png_file%.png}.iconset"
  mkdir -p "$iconset_dir"

  # Generate the required PNG sizes in the iconset directory
  sizes=(16 32 128 256 512)
  for size in "${sizes[@]}"; do
    sips -z $size $size "$png_file" --out "$iconset_dir/icon_${size}x${size}.png" > /dev/null
    sips -z $((size*2)) $((size*2)) "$png_file" --out "$iconset_dir/icon_${size}x${size}@2x.png" > /dev/null
  done

  # Convert the iconset to an ICNS file
  icns_file="${png_file%.png}.icns"
  iconutil -c icns "$iconset_dir" -o "$icns_file"

  # Clean up the temporary iconset directory
  rm -rf "$iconset_dir"

  echo "Created: $icns_file"
done
```

### How to Use:
1. Save the script to a file, e.g., `png_to_icns.sh`.
2. Make the script executable:

```bash
   chmod +x png_to_icns.sh
```

3. Run the script with one or more PNG files as arguments:

```bash
   ./png_to_icns.sh file1.png file2.png
```

### What It Does:
- For each PNG file provided as an argument:
  - Creates a temporary `.iconset` directory.
  - Resizes the PNG into the required sizes for an ICNS file.
  - Converts the `.iconset` directory into an `.icns` file using `iconutil`.
  - Deletes the temporary `.iconset` directory.
  - Outputs the `.icns` file in the same directory as the input PNG.

### Example:
If you run:

```bash
./png_to_icns.sh logo.png icon.png
```

It will create:
- `logo.icns`
- `icon.icns`

This script is efficient and handles multiple PNG files in a single run!
