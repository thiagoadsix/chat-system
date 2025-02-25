import bcrypt from "bcrypt"

import { FindByUsernameRepository, SaveUserRepository } from "@domain/gateways/repositories/user";
import { User } from "@domain/entities";

import { badRequest, noContent } from "@presentation/helpers";
import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";

export class SignUpController implements Controller {
  constructor(private readonly userRepository: FindByUsernameRepository & SaveUserRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password } = httpRequest.body as { username: string, password: string }

    const userExists = await this.userRepository.findByUsername(username)

    if (userExists) {
      return badRequest(new Error("User already exists"))
    }

    const hashedPassword = await bcrypt.hash(String(password), 10)
    const newUser = new User({
      username,
      password: hashedPassword
    })

    await this.userRepository.saveUser(newUser)

    return noContent()
  }
}