import { User } from "@domain/entities";

export interface SaveUserRepository {
  saveUser(user: Omit<User, "id">): Promise<void>
}
