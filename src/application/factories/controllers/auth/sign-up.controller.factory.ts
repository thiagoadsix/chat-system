import { SignUpController } from '@presentation/controllers/auth/sign-up/sign-up.controller'
import { userInMemoryRepositoryFactory } from '@application/factories/controllers/user.in-memory-repositoru'

export const signUpControllerFactory = () => {
  const userRepository = userInMemoryRepositoryFactory()
  return new SignUpController(userRepository)
}