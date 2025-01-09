(() => {
  // lib/core/headerChecker.js
  function containsHeaders(noteContent) {
    const headerRegex = /^#{1,6}\s+/m;
    return headerRegex.test(noteContent);
  }

  // lib/plugin.js
  var plugin = {
    constants: {},
    noteOption: {
      "Toggle Header Color": {
        check: async function(app, noteUUID) {
          const noteContent = await app.getNoteContent({ uuid: noteUUID });
          return containsHeaders(noteContent);
        },
        run: async function(app, noteUUID) {
          await app.alert("You clicked the Toggle Header Color command in a note with headers!");
          console.debug("Special message to the DevTools console");
        }
      }
    }
  };
  var plugin_default = plugin;
})();
