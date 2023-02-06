import { describe, expect, test } from "@jest/globals";
import { myFunction } from "./index";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    const msg = myFunction();
    expect(msg).toBe("Hello");
  });
});
