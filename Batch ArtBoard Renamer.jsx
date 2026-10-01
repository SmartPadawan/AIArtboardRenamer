/**
 * @@@BUILDINFO@@@ Batch-ArtBoard-Renamer.jsx 1.3.0 Oct 01 2026 12:00:00 GMT+0000
 */
/*
<javascriptresource>
<about>$$$/JavaScripts/BatchArtBoardRenamer/About=Batch ArtBoard Renamer - By Abdul Karim Mia.^r^rCopyright 2025 Abdul Karim Mia.^r^rBatch renaming of Illustrator artboards with options for prefix, suffix, auto-numbering in different formats, and find & replace.^r</about>
<category>Abdul's Scripts</category>
</javascriptresource>

Batch-ArtBoard-Renamer
This Adobe Illustrator script automates the renaming of artboards in a document in batch with customizable options for prefix, suffix, and auto-numbering.

Date: Jan 09 2025
Author: Abdul Karim Mia
Mail: akmia51@gmail.com
Website: [https://www.abdulkarimmia.com/]
GitHub: [https://github.com/abdul-karim-mia]

Release Notes:
- 1.0.0: Initial version
  - Provides an interface to rename artboards in batch.
  - Options for prefix, suffix, and numbering formats (1, 2, 3... or 01, 02, 03... or 001, 002, 003...).
  - Preview feature to visualize changes before applying.
  - Tested on Illustrator CC 2015 to CC 2024.
- 1.1.0: Find & Replace
  - New "Find & Replace" mode to search and replace text in existing artboard names.
  - Options for case-sensitive matching and regular expressions.
- 1.2.0: Rename without closing
  - New "Rename" button applies the changes and keeps the dialog open; "OK" closes it.
  - Prefix and suffix are added around the original artboard name ("Keep original name").
  - Numbering is optional ("None" format).
- 1.3.0: New artboard list
  - The list scrolls with the mouse wheel.
  - Multiple selection with Shift+click (range) and Ctrl/Cmd+click.
  - "New Name" column with an always-on live preview (the Preview checkbox is gone).

How to Use:
1. Open the script in Adobe Illustrator.
2. Launch the "Batch ArtBoard Renamer" dialog.
3. Select the artboards you wish to rename (Shift+click for a range, Ctrl/Cmd+click to add or remove) or choose "Select all".
4. Set the desired prefix, suffix, and numbering format.
5. Check the "New Name" column to see how artboard names will change.
6. Click "Rename" to apply the changes (the dialog stays open), then "OK" to close it.

Features:
- Prefix: Add a custom prefix to the artboard name.
- Suffix: Add a custom suffix to the artboard name.
- Keep original name: Keep the current name between prefix and suffix.
- Numbering Format: Choose no numbering or one of 3 formats:
  - 1, 2, 3, 4, ...
  - 01, 02, 03, 04, ...
  - 001, 002, 003, 004, ...
- Auto-numbering: The script automatically numbers artboards sequentially.
- Find & Replace: Replace text in the existing artboard names, optionally
  case-sensitive or using regular expressions.
- Preview: The "New Name" column shows the changes live before applying them.

Note: Ensure that Adobe Illustrator is running before executing the script.

Feel free to contribute, report issues, or suggest enhancements! Happy renaming!

Donate (optional):
If you find this script helpful, you can support the author:
- via PayPal: [https://paypal.me/akmia51]

NOTICE:
This script is provided "as is" without warranty of any kind.
Free to use, not for sale.
Released under the GNU General Public License (GPL).
https://opensource.org/licenses/gpl-license

Check other scripts by the author:
[https://github.com/abdul-karim-mia]
*/


// ARTBOARDRENAMER
// ===============
var artboardRenamer = new Window("dialog");
artboardRenamer.text = "Batch ArtBoard Renamer";
artboardRenamer.orientation = "column";
artboardRenamer.alignChildren = ["left", "top"];
artboardRenamer.spacing = 15;
artboardRenamer.margins = 15;

// LISTG
// =====
var listG = artboardRenamer.add("group", undefined, { name: "listG" });
listG.orientation = "row";
listG.alignChildren = ["left", "center"];
listG.spacing = 10;
listG.margins = 0;

var chkAll = listG.add("checkbox", undefined, undefined, { name: "chkAll" });
chkAll.text = "Select all";

var selHintT = listG.add("statictext", undefined, undefined, { name: "selHintT" });
selHintT.text = "(Shift+click to select a range, Ctrl/Cmd+click to add or remove)";

var doc = app.activeDocument;
var doards = doc.artboards;
var allItms = [];

// ARTLIST
// =======
var artList = artboardRenamer.add("listbox", undefined, undefined, {
    name: "artList",
    multiselect: true,
    numberOfColumns: 3,
    showHeaders: true,
    columnTitles: ["#", "Artboard Name", "New Name"],
    columnWidths: [45, 300, 300]
});
artList.preferredSize.width = 665;
artList.preferredSize.height = 350;
artList.alignment = ["fill", "top"];

for (var i = 0; i < doards.length; i++) {
    var row = artList.add("item", String(i + 1));
    row.subItems[0].text = doards[i].name;
    allItms.push({ row: row, name: doards[i].name, artboard: doards[i] });
}
artList.onChange = previewClick;

chkAll.onClick = function () {
    if (this.value) {
        var all = [];
        for (var i = 0; i < allItms.length; i++) all.push(i);
        artList.selection = all;
    } else {
        artList.selection = null;
    }
    previewClick();
}

// MODEG
// =====
var modeG = artboardRenamer.add("group", undefined, { name: "modeG" });
modeG.orientation = "row";
modeG.alignChildren = ["left", "center"];
modeG.spacing = 10;
modeG.margins = 0;

var modeT = modeG.add("statictext", undefined, undefined, { name: "modeT" });
modeT.text = "Mode";
modeT.preferredSize.width = 50;

var modeNum = modeG.add("radiobutton", undefined, undefined, { name: "modeNum" });
modeNum.text = "Prefix / Suffix / Numbering";
modeNum.value = true;
modeNum.onClick = modeClick;
var modeFR = modeG.add("radiobutton", undefined, undefined, { name: "modeFR" });
modeFR.text = "Find & Replace";
modeFR.onClick = modeClick;

// PRESUG
// ======
var preSuG = artboardRenamer.add("group", undefined, { name: "preSuG" });
preSuG.orientation = "row";
preSuG.alignChildren = ["left", "center"];
preSuG.spacing = 10;
preSuG.margins = 0;

var prefixT = preSuG.add("statictext", undefined, undefined, { name: "prefixT" });
prefixT.text = "Prefix";
prefixT.preferredSize.width = 50;

var prefixV = preSuG.add('edittext {properties: {name: "prefixV"}}');
prefixV.preferredSize.width = 150;
prefixV.onChanging = previewClick;
var postT = preSuG.add("statictext", undefined, undefined, { name: "postT" });
postT.text = "Suffix";
postT.preferredSize.width = 50;

var suffV = preSuG.add('edittext {properties: {name: "suffV"}}');
suffV.preferredSize.width = 150;
suffV.onChanging = previewClick;

// KEEPG
// =====
var keepG = artboardRenamer.add("group", undefined, { name: "keepG" });
keepG.orientation = "row";
keepG.alignChildren = ["left", "center"];
keepG.spacing = 10;
keepG.margins = [60, 0, 0, 0];

var keepName = keepG.add("checkbox", undefined, undefined, { name: "keepName" });
keepName.text = "Keep original name";
keepName.value = true;
keepName.onClick = previewClick;
// ARTBOARDRENAMER
// ===============
var divider1 = artboardRenamer.add("panel", undefined, undefined, { name: "divider1" });
divider1.alignment = "fill";

// NUMFG
// =====
var numFG = artboardRenamer.add("group", undefined, { name: "numFG" });
numFG.orientation = "row";
numFG.alignChildren = ["left", "top"];
numFG.spacing = 10;
numFG.margins = 0;

var nubfT = numFG.add("statictext", undefined, undefined, { name: "nubfT" });
nubfT.text = "Numbering Format";
nubfT.preferredSize.width = 125;

// FORMATG
// =======
var forMatG = numFG.add("group", undefined, { name: "forMatG" });
forMatG.orientation = "column";
forMatG.alignChildren = ["left", "center"];
forMatG.spacing = 10;
forMatG.margins = 0;

var noNum = forMatG.add("radiobutton", undefined, undefined, { name: "noNum" });
noNum.text = "None";
noNum.value = true;
noNum.onClick = previewClick;
var need = forMatG.add("radiobutton", undefined, undefined, { name: "need" });
need.text = "1,2,3,4,5, ...";
need.onClick = previewClick;
var oneZ = forMatG.add("radiobutton", undefined, undefined, { name: "oneZ" });
oneZ.text = "01,02,03,04,05,06, ...";
oneZ.onClick = previewClick;
var tZero = forMatG.add("radiobutton", undefined, undefined, { name: "tZero" });
tZero.text = "001,002,003,004,005,006, ...";
tZero.onClick = previewClick;
// ARTBOARDRENAMER
// ===============
var divider2 = artboardRenamer.add("panel", undefined, undefined, { name: "divider2" });
divider2.alignment = "fill";

// FINDREPG
// ========
var findRepG = artboardRenamer.add("group", undefined, { name: "findRepG" });
findRepG.orientation = "column";
findRepG.alignChildren = ["left", "center"];
findRepG.spacing = 10;
findRepG.margins = 0;

var findRowG = findRepG.add("group", undefined, { name: "findRowG" });
findRowG.orientation = "row";
findRowG.alignChildren = ["left", "center"];
findRowG.spacing = 10;
findRowG.margins = 0;

var findT = findRowG.add("statictext", undefined, undefined, { name: "findT" });
findT.text = "Find";
findT.preferredSize.width = 50;

var findV = findRowG.add('edittext {properties: {name: "findV"}}');
findV.preferredSize.width = 150;
findV.onChanging = previewClick;
var replT = findRowG.add("statictext", undefined, undefined, { name: "replT" });
replT.text = "Replace";
replT.preferredSize.width = 50;

var replV = findRowG.add('edittext {properties: {name: "replV"}}');
replV.preferredSize.width = 150;
replV.onChanging = previewClick;

var findOptG = findRepG.add("group", undefined, { name: "findOptG" });
findOptG.orientation = "row";
findOptG.alignChildren = ["left", "center"];
findOptG.spacing = 10;
findOptG.margins = [60, 0, 0, 0];

var matchCase = findOptG.add("checkbox", undefined, undefined, { name: "matchCase" });
matchCase.text = "Match case";
matchCase.onClick = previewClick;
var useRegex = findOptG.add("checkbox", undefined, undefined, { name: "useRegex" });
useRegex.text = "Regular expression";
useRegex.onClick = previewClick;

function updateMode() {
    preSuG.enabled = modeNum.value;
    keepG.enabled = modeNum.value;
    numFG.enabled = modeNum.value;
    findRepG.enabled = modeFR.value;
}
function modeClick() {
    updateMode();
    previewClick();
}
updateMode();
// MAINUIG
// =======
var mainuiG = artboardRenamer.add("group", undefined, { name: "mainuiG" });
mainuiG.orientation = "row";
mainuiG.alignChildren = ["left", "center"];
mainuiG.spacing = 10;
mainuiG.margins = 0;
mainuiG.alignment = ["fill", "top"];

var statusT = mainuiG.add("statictext", undefined, undefined, { name: "statusT" });
statusT.preferredSize.width = 250;

// Fills the "New Name" column: only selected artboards whose name would change
function previewClick() {
    var selected = 0;
    var error = '';
    for (i = 0; i < allItms.length; i++) {
        var itm = allItms[i];
        var newName = '';
        itm.row.checked = itm.row.selected;
        if (itm.row.selected) {
            selected++;
            try {
                newName = getNewName(i);
            } catch (e) {
                error = "Invalid regular expression";
            }
            if (newName == itm.name) newName = '';
        }
        if (itm.row.subItems[1].text != newName) itm.row.subItems[1].text = newName;
    }
    chkAll.value = allItms.length > 0 && selected == allItms.length;
    statusT.text = error || (selected + " of " + allItms.length + " artboards selected");
}

function getNewName(ind) {
    if (modeFR.value) {
        return findReplace(allItms[ind].name);
    }
    var name = keepName.value ? allItms[ind].name : '';
    if (noNum.value) {
        var num = '';
    } else if (need.value) {
        var num = ind + 1;
    } else if (oneZ.value) {
        var num = zeroPad(ind + 1, 2);
    } else {
        var num = zeroPad(ind + 1, 3);
    }
    return prefixV.text + name + num + suffV.text;
}

function findReplace(name) {
    if (findV.text == '') return name;
    var pattern = findV.text;
    var replacement = replV.text;
    if (!useRegex.value) {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
        replacement = replacement.replace(/\$/g, '$$$$');
    }
    var re = new RegExp(pattern, matchCase.value ? 'g' : 'gi');
    return name.replace(re, replacement);
}
// MAING
// =====
var mainG = mainuiG.add("group", undefined, { name: "mainG" });
mainG.preferredSize.width = 350;
mainG.orientation = "row";
mainG.alignChildren = ["right", "fill"];
mainG.spacing = 10;
mainG.margins = 0;

var rename = mainG.add("button", undefined, undefined, { name: "rename" });
rename.text = "Rename";

// Not named "ok", so that Enter in a text field does not close the dialog
var ok = mainG.add("button", undefined, undefined, { name: "close" });
ok.text = "OK";
artboardRenamer.cancelElement = ok;

function zeroPad(number, size) {
    var minus = (number < 0) ? '-' : '',
        str = '00000000000' + Math.abs(number);

    return minus + str.slice(str.length - size);
}
rename.onClick = function () {
    var newNames = [];
    for (i = 0; i < allItms.length; i++) {
        if (!allItms[i].row.selected) continue;
        try {
            var newName = getNewName(i);
        } catch (e) {
            alert("Invalid regular expression:\n" + e.message);
            return;
        }
        if (newName == '') {
            alert("Artboard " + (i + 1) + " would get an empty name.");
            return;
        }
        newNames.push({ itm: allItms[i], name: newName });
    }
    if (newNames.length == 0) {
        alert("Select at least one artboard to rename.");
        return;
    }
    for (i = 0; i < newNames.length; i++) {
        var itm = newNames[i].itm;
        itm.artboard.name = newNames[i].name;
        itm.name = newNames[i].name;
        itm.row.subItems[0].text = itm.name;
    }
    // Clear the selection, so the same rules are not applied twice by mistake
    artList.selection = null;
    previewClick();
    app.redraw();
}
ok.onClick = function () {
    artboardRenamer.close();
}
previewClick();
artboardRenamer.show();