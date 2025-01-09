// markdownProcessor.js
import { headerColors } from "./colors.js";

/**
 * Processes the markdown content and adds text to headers with color.
 * @param {string} markdown - The content of the note in markdown format.
 * @returns {string} - The modified markdown content with added text to headers.
 */
export function addColorToHeaders(markdown) {
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
      let headerLevel = Math.min(header.length, 3); // Limit to headers 1-3

      // Get the color for the header level
      let { hexColor, cycleColor } = headerColors[headerLevel];

      // Add the appropriate text and color to the header
      return `${header} <mark style="color:${hexColor};">${headerContent}<!-- {"cycleColor": "${cycleColor}"} --></mark>`;
    }

    // Return the line unchanged if it's not a header
    return line;
  });

  // Join the modified lines back into a single markdown string
  return lines.join('\n');
}
