import { containsHeaders } from "./core/headerChecker.js";
import { addTextToHeaders } from "./core/markdownProcessor.js";

const plugin = {
  constants: {
  },
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
  },
};
export default plugin;
