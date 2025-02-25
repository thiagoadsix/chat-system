import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

import { userInMemoryMockRepository } from "@tests/mocks/domain/gateways/repositories/user.in-memory-repository.mock";

import { SignInController } from "@presentation/controllers/auth/sign-in/sign-in.controller";

describe("SignInController", () => {
  let sut: SignInController;

  beforeEach(() => {
    sut = new SignInController(userInMemoryMockRepository);
    vi.spyOn(bcrypt, "compare").mockImplementation(vi.fn().mockResolvedValue(true));
  });

  it("should be able to sign in", async () => {
    const jwtSign = vi.fn().mockResolvedValue("token123");
    const httpRequest = {
      body: { username: "testuser", password: "testpass" },
      jwtSign,
    };

    userInMemoryMockRepository.findByUsername.mockResolvedValue({
      id: "1",
      username: "testuser",
      password: "testpass",
    });

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ token: "token123" });
    expect(bcrypt.compare).toHaveBeenCalledWith("testpass", "testpass");
  });

  it("should return 400 if user does not exist", async () => {
    const jwtSign = vi.fn();
    const httpRequest = {
      body: { username: "nonexistent", password: "any" },
      jwtSign,
    };

    userInMemoryMockRepository.findByUsername.mockResolvedValue(null);

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toEqual(400);
  });

  it("should return 400 if password is incorrect", async () => {
    vi.spyOn(bcrypt, "compare").mockImplementation(vi.fn().mockResolvedValue(false));

    const jwtSign = vi.fn();
    const httpRequest = {
      body: { username: "testuser", password: "wrongpass" },
      jwtSign,
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
