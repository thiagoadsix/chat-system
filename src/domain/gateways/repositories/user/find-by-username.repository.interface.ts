import { User } from "@domain/entities";

export interface FindByUsernameRepository {
  findByUsername(username: string): Promise<User | null>
}
