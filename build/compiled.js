(() => {
  // lib/core/headerChecker.js
  function containsHeaders(noteContent) {
    const headerRegex = /^#{1,6}\s+/m;
    return headerRegex.test(noteContent);
  }

  // lib/core/colors.js
  var headerColors = {
    1: { cycleColor: "23" },
    // Red text
    2: { cycleColor: "29" },
    // Blue text
    3: { cycleColor: "37" },
    // Green text
    4: { cycleColor: "11" },
    // Yellow text
    5: { cycleColor: "45" },
    // Purple text
    6: { cycleColor: "50" }
    // Cyan text
  };

  // lib/core/markdownProcessor.js
  function addTextToHeaders(markdown) {
    let currentHeaderLevel = null;
    let currentColor = null;
    return markdown.split("\n").map((line) => {
      let match = line.match(/^#{1,6}\s+(.+)$/);
      if (match) {
        let headerLevel = match[1].length;
        let headerContent = match[2];
        if (headerLevel > currentHeaderLevel) {
          currentColor = headerColors[headerLevel].cycleColor;
        }
        return `${line}<!-- {"cycleColor": "${currentColor}"} -->`;
      }
      return line;
    }).join("\n");
  }

  // lib/plugin.js
  var plugin = {
    constants: {},
    noteOption: {
      "Toggle": {
        check: async function(app, noteUUID) {
          const noteContent = await app.getNoteContent({ uuid: noteUUID });
          return containsHeaders(noteContent);
        },
        run: async function(app, noteUUID) {
          const noteContent = await app.getNoteContent({ uuid: noteUUID });
          const updatedContent = addTextToHeaders(noteContent);
          await app.replaceNoteContent({ uuid: noteUUID }, updatedContent);
          await app.alert("Headers have been updated in the note!");
          console.debug("Special message to the DevTools console");
        }
      }
    }
  };
  var plugin_default = plugin;
})();
