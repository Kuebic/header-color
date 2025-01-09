(() => {
  // lib/core/headerChecker.js
  function containsHeaders(noteContent) {
    const headerRegex = /^#{1,6}\s+/m;
    return headerRegex.test(noteContent);
  }

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
        return `${header} ${headerContent} (this is header ${headerLevel})`;
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
          await app.setNoteContent({ uuid: noteUUID, content: updatedContent });
          await app.alert("Headers have been updated in the note!");
          console.debug("Updated headers");
        }
      }
    }
  };
  var plugin_default = plugin;
})();
