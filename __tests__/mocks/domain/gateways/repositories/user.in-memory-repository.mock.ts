import { vi, type Mock } from "vitest"

import { FindByUsernameRepository, SaveUserRepository } from "@domain/gateways/repositories/user";

type UserInMemoryMockRepository = {
  [K in keyof (FindByUsernameRepository & SaveUserRepository)]: Mock
}

export const userInMemoryMockRepository: UserInMemoryMockRepository = {
  findByUsername: vi.fn(),
  saveUser: vi.fn(),
}