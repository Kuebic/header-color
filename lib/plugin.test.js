import { jest } from "@jest/globals";
import { mockAppWithContent, mockPlugin } from "./test-helpers.js";
import { containsHeaders } from "./core/headerChecker.js"; // Import the containsHeaders function
import { addTextToHeaders } from "./core/markdownProcessor.js"; // Import the addTextToHeaders function

// --------------------------------------------------------------------------------------
describe("This here plugin", () => {
  const plugin = mockPlugin();
  plugin.constants.isTestEnvironment = true;

  it("should show the option when headers are present", async () => {
    const { app, note } = mockAppWithContent(`# Header 1\nSome content\n### Header 3\nMore content`);
    expect(await plugin.noteOption["Toggle"].check(app, note.uuid)).toBeTruthy();
  });

  it("should not show the option when headers are not present", async () => {
    const { app, note } = mockAppWithContent(`To be, or not to be, that is the question`);
    expect(await plugin.noteOption["Toggle"].check(app, note.uuid)).toBeFalsy();
  });

  // Additional test to ensure the containsHeaders function works as expected
  it("should correctly identify headers in note content", () => {
    expect(containsHeaders(`# Header 1\nSome content\n### Header 3\nMore content`)).toBeTruthy();
    expect(containsHeaders(`To be, or not to be, that is the question`)).toBeFalsy();
  });

  // Test for addTextToHeaders function
  it("should add text to headers in markdown content", () => {
    const markdown = `# Header 1\nSome content\n## Header 2\nMore content\n### Header 3\nEven more content`;
    const expectedOutput = `# Header 1 (this is header 1)\nSome content\n## Header 2 (this is header 2)\nMore content\n### Header 3 (this is header 3)\nEven more content`;
    expect(addTextToHeaders(markdown)).toBe(expectedOutput);
  });
});
