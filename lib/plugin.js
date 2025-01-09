import { containsHeaders } from "./core/headerChecker.js";
import { addTextToHeaders } from "./core/markdownProcessor.js";

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
        const noteContent = await app.getNoteContent({ uuid: noteUUID });
        const updatedContent = addTextToHeaders(noteContent);
        await app.setNoteContent({ uuid: noteUUID, content: updatedContent });
        await app.alert("Headers have been updated in the note!");
        console.debug("Updated headers");
      }
    }
  },
};
export default plugin;
