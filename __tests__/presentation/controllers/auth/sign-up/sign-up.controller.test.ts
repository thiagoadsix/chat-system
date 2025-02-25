import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

import { userInMemoryMockRepository } from "@tests/mocks/domain/gateways/repositories/user.in-memory-repository.mock";

import { SignUpController } from "@presentation/controllers/auth/sign-up/sign-up.controller";

describe("SignUpController", () => {
  let sut: SignUpController;

  beforeEach(() => {
    sut = new SignUpController(userInMemoryMockRepository);
    vi.spyOn(bcrypt, "hash").mockImplementation(vi.fn().mockResolvedValue("testpass"));
  });

  it("should be able to sign up", async () => {
    const jwtSign = vi.fn().mockResolvedValue("token123");
    const httpRequest = {
      body: { username: "testuser", password: "testpass" },
      jwtSign,
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toEqual(204);
    expect(bcrypt.hash).toHaveBeenCalledWith("testpass", 10);
  });

  it("should not be able to sign up if user already exists", async () => {
    const httpRequest = {
      body: { username: "testuser", password: "testpass" },
    };

    userInMemoryMockRepository.findByUsername.mockResolvedValue({
      id: "1",
      username: "testuser",
      password: "testpass",
    });

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toEqual(400);
  });
});
