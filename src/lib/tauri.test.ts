import { expect, test } from "bun:test";

import { isTauri } from "./tauri";

test("is false outside the desktop shell", () => {
  expect(isTauri()).toBe(false);
});
