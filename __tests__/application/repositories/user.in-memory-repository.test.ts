import { describe, it, expect, beforeEach, vi } from "vitest";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { UserInMemoryRepository } from "@application/repositories/user.in-memory-repository";

const filePath = path.join(os.tmpdir(), "users.json");

describe("UserInMemoryRepository", () => {
  let repository: UserInMemoryRepository;
  let fakeFileData: string | undefined;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    fakeFileData = undefined;

    vi.spyOn(fs, "readFile").mockImplementation(async (p, options) => {
      if (p === filePath) {
        if (fakeFileData === undefined) {
          const error: any = new Error("File not found");
          error.code = "ENOENT";
          throw error;
        }
        return fakeFileData;
      }
      throw new Error(`Unexpected file path: ${p}`);
    });

    vi.spyOn(fs, "writeFile").mockImplementation(async (p, data, options) => {
      if (p === filePath) {
        fakeFileData = data.toString();
        return;
      }
      throw new Error(`Unexpected file path: ${p}`);
    });
  });

  it("should return null when no user file exists", async () => {
    const user = await repository.findByUsername("any");
    expect(user).toBeNull();
  });

  it("should save a new user and then find it by username", async () => {
    const userData = { username: "testuser", password: "testpass" };

    await repository.saveUser(userData);

    const foundUser = await repository.findByUsername("testuser");
    expect(foundUser).not.toBeNull();
    expect(foundUser!.username).toEqual("testuser");
    expect(foundUser!.password).toEqual("testpass");

    const parsedData = JSON.parse(fakeFileData!);
    expect(Array.isArray(parsedData)).toBe(true);
    expect(parsedData.length).toBe(1);
    expect(parsedData[0].username).toEqual("testuser");
  });

  it("should return null if the user is not found", async () => {
    const userData = { username: "testuser", password: "testpass" };
    await repository.saveUser(userData);
    const notFound = await repository.findByUsername("nonexistent");
    expect(notFound).toBeNull();
  });

  it("should throw an error if fs.readFile fails with a non-ENOENT error", async () => {
    vi.spyOn(fs, "readFile").mockImplementation(async () => {
      const error: any = new Error("Permission denied");
      error.code = "EACCES";
      throw error;
    });

    await expect(repository.findByUsername("any")).rejects.toThrow("Permission denied");
  });
});
