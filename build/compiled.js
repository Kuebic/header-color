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
    let lines = markdown.split("\n");
    lines = lines.map((line) => {
      let headerPattern = /^(#{1,6})\s+(.+)$/;
      let match = line.match(headerPattern);
      if (match) {
        let header = match[1];
        let headerContent = match[2];
        let headerLevel = header.length;
        let { cycleColor } = headerColors[headerLevel] || {};
        return `${header} ==${headerContent}<!-- {"cycleColor": "${cycleColor}"} -->==`;
      }
      return line;
    });
    return lines.join("\n");
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
