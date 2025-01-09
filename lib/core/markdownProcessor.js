// markdownProcessor.js
import { headerColors } from "./colors.js";

export function addTextToHeaders(markdown) {
  let currentHeaderLevel = null;
  let currentColor = null;

  return markdown.split('\n').map(line => {
    let match = line.match(/^#{1,6}\s+(.+)$/);

    if (match) {
      let headerLevel = match[1].length;
      let headerContent = match[2];

      if (headerLevel > currentHeaderLevel) {
        // New header encountered, get its color
        currentColor = headerColors[headerLevel].cycleColor;
      }

      return `${line}<!-- {"cycleColor": "${currentColor}"} -->`;
    }

    return line;
  }).join('\n');
}
