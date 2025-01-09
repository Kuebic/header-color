import { jest } from "@jest/globals";
import { mockAppWithContent, mockPlugin } from "./test-helpers.js";
import { containsHeaders } from "./core/headerChecker.js";

// --------------------------------------------------------------------------------------
describe("This here plugin", () => {
  const plugin = mockPlugin();
  plugin.constants.isTestEnvironment = true;

  it("should show the option when headers are present", async () => {
    const { app, note } = mockAppWithContent(`# Header 1\nSome content\n### Header 3\nMore content`);
    expect(await plugin.noteOption["Toggle Header Color"].check(app, note.uuid)).toBeTruthy();
  });

  it("should not show the option when headers are not present", async () => {
    const { app, note } = mockAppWithContent(`To be, or not to be, that is the question`);
    expect(await plugin.noteOption["Toggle Header Color"].check(app, note.uuid)).toBeFalsy();
  });

  // Additional test to ensure the containsHeaders function works as expected
  it("should correctly identify headers in note content", () => {
    expect(containsHeaders(`# Header 1\nSome content\n### Header 3\nMore content`)).toBeTruthy();
    expect(containsHeaders(`To be, or not to be, that is the question`)).toBeFalsy();
  });
});
