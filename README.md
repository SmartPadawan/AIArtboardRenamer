# Artboard Renamer for Adobe Illustrator

A comprehensive Adobe Illustrator script for batch renaming artboards with a variety of customization options, including individual artboard selection, prefixes, suffixes, numbering formats, and live preview functionality.

## Features
- **Batch Rename or Individual Selection**: Rename all artboards or select specific ones, with Shift+click and Ctrl/Cmd+click multiple selection.
- **Custom Prefix and Suffix**: Add a prefix and/or suffix to artboard names.
- **Flexible Numbering Formats**: No numbering, or choose from:
  - `1, 2, 3, ...`
  - `01, 02, 03, ...`
  - `001, 002, 003, ...`
- **Find & Replace**: Search and replace text in existing artboard names, with optional case matching and regular expressions.
- **Live Preview**: The "New Name" column instantly shows how artboard names will look before applying changes.
- **Scrollable Artboard List**: Easily handle documents with a large number of artboards, including mouse wheel scrolling.

## Installation
1. **Download the Script**: Clone this repository or download the `Batch ArtBoard Renamer.jsx` file.
2. **Place the Script**: Move the script to your Adobe Illustrator Scripts folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe Illustrator <version>\Presets\<language>\Scripts`
   - **macOS**: `/Applications/Adobe Illustrator <version>/Presets/<language>/Scripts`
3. **Restart Illustrator**: Relaunch Adobe Illustrator to load the script.

## Usage
1. Open a document in Adobe Illustrator with artboards.
2. Go to `File > Scripts` and select `Batch ArtBoard Renamer`.
3. Customize your options in the dialog box:
   - **Select Artboards**: Click the artboards to rename in the list. Use Shift+click to select a range, Ctrl+click (Cmd+click on macOS) to add or remove a single artboard, or the "Select all" checkbox.
   - **Mode**: Choose `Prefix / Suffix / Numbering` to build new names, or `Find & Replace` to edit the existing ones.
   - **Prefix and Suffix**: Enter desired text to prepend or append to artboard names.
   - **Keep original name**: Keep the current name between prefix and suffix (e.g. `SICIM-` + `Deutchland-color`). Uncheck it to replace the name entirely.
   - **Numbering Format**: Choose `None` or one of the three styles:
     - `1, 2, 3, ...`
     - `01, 02, 03, ...`
     - `001, 002, 003, ...`
   - **Find & Replace**: Enter the text to find and its replacement. Enable `Match case` for case-sensitive search, or `Regular expression` to use a JavaScript regex (with `$1`, `$2`, ... in the replacement).
   - **Live Preview**: The "New Name" column shows the new name of each selected artboard while you type. It stays empty for artboards that are not selected or whose name would not change.
4. Click **Rename** to rename the selected artboards. The dialog stays open and the selection is cleared, so you can apply more changes.
5. Click **OK** to close the script.

## Options Explained
- **Individual Artboard Selection**: Select exactly the artboards to rename, with standard Shift+click and Ctrl/Cmd+click multiple selection.
- **Prefix**: Text added at the beginning of each artboard name.
- **Suffix**: Text added at the end of each artboard name.
- **Keep original name**: The new name is `prefix + original name + number + suffix`. When unchecked, it is `prefix + number + suffix`.
- **Numbering Format**: No numbering (`None`), or auto-number artboards with three options:
  - Simple: `1, 2, 3, ...`
  - Padded with one zero: `01, 02, 03, ...`
  - Padded with two zeros: `001, 002, 003, ...`
- **Find & Replace**: Replaces every occurrence of the searched text in the current name of each selected artboard.
  - **Match case**: Distinguish between uppercase and lowercase.
  - **Regular expression**: Treat the search text as a regular expression (e.g. find `_(\d+)$`, replace with `-$1`).
- **New Name column**: See updated artboard names in real time before applying changes.

## Preview

Check out the script in action on YouTube:  
[![Artboard Renamer Video Preview](https://img.youtube.com/vi/93vuokYAakc/maxresdefault.jpg)](https://www.youtube.com/watch?v=93vuokYAakc)  

Click the image or [here](https://www.youtube.com/watch?v=93vuokYAakc) to watch the video.


## Example Scenarios
- Rename all artboards to `Page_01`, `Page_02`, `Page_03`, ... (uncheck *Keep original name*).
- Add a custom prefix like `Draft_` and suffix like `_v1` to each artboard name.
- Replace `Draft` with `Final` in all artboard names.
- Use live preview to fine-tune naming before applying changes.

## Contributing
We welcome contributions! Feel free to report issues, suggest new features, or submit pull requests to enhance this script.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
## 💸 Donate
If you find this script helpful, consider supporting the development of more scripts by [Abdul Karim Mia] via [PayPal].

[PayPal]: https://paypal.me/akmia51
[Abdul Karim Mia]: https://www.abdulkarimmia.com

<a href="https://paypal.me/akmia51">
  <img width="147" height="40" src="https://i.ibb.co/Z8Wd8Sn/paypal-badge.png" >
</a>

Check My Other Scripts or Contact Me for Custom Script Development [Abdul Karim Mia].

**Happy Renaming!**
