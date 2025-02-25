import { UserInMemoryRepository } from "@application/repositories/user.in-memory-repository"

let instance: UserInMemoryRepository | null = null;

export const userInMemoryRepositoryFactory = (): UserInMemoryRepository => {
  if (!instance) {
    instance = new UserInMemoryRepository();
  }
  return instance;
}