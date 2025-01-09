import { containsHeaders } from "./core/headerChecker.js";

const plugin = {
  constants: {
  },
  noteOption: {
    "Toggle": {
      check: async function(app, noteUUID) {
        const noteContent = await app.getNoteContent({ uuid: noteUUID });

        // Use the containsHeaders function to check if the note contains headers
        return containsHeaders(noteContent);
      },
      run: async function(app, noteUUID) {
        await app.alert("You clicked the Toggle Header Color command in a note with headers!");
        console.debug("Special message to the DevTools console");
      }
    }
  },
};
export default plugin;
