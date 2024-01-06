function selectionApiEmulator(
  root,
  anchorNode,
  anchorOffset,
  focusNode,
  focusOffset
) {
  const leaves = [];
  let foundStart = false;
  let foundEnd = false;

  function helper(node) {
    if (node == null) {
      return;
    }

    foundStart = foundStart || node == anchorNode;
    foundEnd = foundEnd || node == focusNode;

    if (node.nodeType === 3) {
      const text = node.textContent;
      let start = node === anchorNode ? anchorOffset : 0;
      let end = node === focusNode ? focusOffset : text.length;
      if (foundStart) {
        leaves.push(text.substring(start, end));
      }
    }

    for (let child of node.childNodes) {
      helper(child);
      if (foundEnd) {
        break;
      }
    }
  }

  helper(root);
  return leaves.join("");
}

function printSelection() {
  const selection = document.getSelection();
  const selectionString = selection.toString();
  console.log("selectionString");
  console.log(selectionString);
  const emulatorSelectionString = selectionApiEmulator(
    document.body,
    selection.anchorNode,
    selection.anchorOffset,
    selection.focusNode,
    selection.focusOffset
  );
  console.log("emulatorSelectionString");
  console.log(emulatorSelectionString);
  if (selectionString === emulatorSelectionString) {
    console.log("passed!");
  }
}

document.addEventListener("selectionchange", printSelection);
