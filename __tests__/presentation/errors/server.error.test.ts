import { describe, it, expect } from "vitest";

import { ServerError } from "@presentation/errors";

describe("ServerError", () => {
  it("should create a ServerError instance", () => {
    const serverError = new ServerError();

    expect(serverError).toBeInstanceOf(Error);
    expect(serverError.message).toBe("Internal server error.");
  });
});
