// markdownProcessor.js

/**
 * Processes the markdown content and adds text to headers.
 * @param {string} markdown - The content of the note in markdown format.
 * @returns {string} - The modified markdown content with added text to headers.
 */
export function addTextToHeaders(markdown) {
    // Split markdown by lines for easy line-by-line processing
    let lines = markdown.split('\n');

    // Loop through each line to find headers and modify them accordingly
    lines = lines.map(line => {
      // Regular expression to match headers (e.g., #, ##, ###)
      let headerPattern = /^(#{1,6})\s+(.+)$/;

      // Match the line with the header pattern
      let match = line.match(headerPattern);

      if (match) {
        // Extract the header symbols (#, ##, ###) and content
        let header = match[1];  // the #, ##, ### part
        let headerContent = match[2]; // the content after the header
        let headerLevel = header.length; // the level of the header (1 for #, 2 for ##, etc.)

        // Add the appropriate text to the header
        return `${header} ${headerContent} (this is header ${headerLevel})`;
      }

      // Return the line unchanged if it's not a header
      return line;
    });

    // Join the modified lines back into a single markdown string
    return lines.join('\n');
  }
