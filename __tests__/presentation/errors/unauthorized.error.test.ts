import { describe, it, expect } from "vitest";

import { UnauthorizedError } from "@presentation/errors";

describe("UnauthorizedError", () => {
  it("should create a UnauthorizedError instance", () => {
    const unauthorizedError = new UnauthorizedError();

    expect(unauthorizedError).toBeInstanceOf(Error);
    expect(unauthorizedError.message).toBe("Unauthorized.");
  });
});
