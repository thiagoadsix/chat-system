import { promises as fs } from 'fs'
import * as os from 'os'
import * as path from 'path'
import { User } from "@domain/entities"
import { FindByUsernameRepository, SaveUserRepository } from "@domain/gateways/repositories/user"

export class UserInMemoryRepository implements FindByUsernameRepository, SaveUserRepository {
  private filePath: string

  constructor() {
    this.filePath = path.join(os.tmpdir(), 'users.json')
  }

  private async readUsers(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8')
      const json = JSON.parse(data)
      return json.map((u: any) => new User(u))
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return []
      }
      throw err
    }
  }

  private async writeUsers(users: User[]): Promise<void> {
    const data = JSON.stringify(users, null, 2)
    await fs.writeFile(this.filePath, data, 'utf-8')
  }

  async findByUsername(username: string): Promise<User | null> {
    const users = await this.readUsers()
    return users.find(user => user.username === username) || null
  }

  async saveUser(user: Omit<User, "id">): Promise<void> {
    const users = await this.readUsers()
    const newUser = new User({ ...user })
    users.push(newUser)
    await this.writeUsers(users)
  }
}
