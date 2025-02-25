import bcrypt from "bcrypt"

import { FindByUsernameRepository } from "@domain/gateways/repositories/user"
import { badRequest, ok } from "@presentation/helpers"
import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols"

export class SignInController implements Controller {
  constructor(private readonly userRepository: FindByUsernameRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password } = httpRequest.body as { username: string, password: string }

    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      return badRequest(new Error('Invalid credentials'))
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return badRequest(new Error('Invalid credentials'))
    }

    const token = await httpRequest.jwtSign!({ id: user.id, username: user.username })

    return ok({ token })
  }
}
