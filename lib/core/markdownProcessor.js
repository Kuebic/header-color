// markdownProcessor.js
import { headerColors } from "./colors.js";

/**
 * Processes the markdown content and adds text to headers with color.
 * @param {string} markdown - The content of the note in markdown format.
 * @returns {string} - The modified markdown content with added text to headers.
 */
export function addTextToHeaders(markdown) {
  // Split markdown by lines for easy line-by-line processing
  let lines = markdown.split('\n');

  // Initialize an array to store the modified lines
  let modifiedLines = [];

  // Loop through each line to find headers and modify them accordingly
  lines.forEach(line => {
    // Regular expression to match headers (e.g., #, ##, ###)
    let headerPattern = /^(#{1,6})\s+(.+)$/;

    // Match the line with the header pattern
    let match = line.match(headerPattern);

    if (match) {
      // Extract the header symbols (#, ##, ###) and content
      let header = match[1];  // the #, ##, ### part
      let headerContent = match[2]; // the content after the header
      let headerLevel = header.length; // the level of the header (1 for #, 2 for ##, etc.)

      // Get the color for the header level
      let { cycleColor } = headerColors[headerLevel] || {};

      // Add the appropriate text and color to the header
      let modifiedLine = `${header} ==${headerContent}<!-- {"cycleColor": "${cycleColor}"} -->==`;

      // Push the modified line to the array
      modifiedLines.push(modifiedLine);
    } else {
      // If it's not a header, push the original line
      modifiedLines.push(line);
    }
  });

  // Join the modified lines back into a single markdown string
  return modifiedLines.join('\n');
}
