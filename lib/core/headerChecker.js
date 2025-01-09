// headerChecker.js

/**
 * Checks if the note content contains markdown headers.
 * @param {string} noteContent - The content of the note.
 * @returns {boolean} - True if the note contains headers, false otherwise.
 */
export function containsHeaders(noteContent) {
    // Regex to match markdown headers (#, ##, ###, etc.)
    const headerRegex = /^#{1,6}\s+/m;
    return headerRegex.test(noteContent);
  }
