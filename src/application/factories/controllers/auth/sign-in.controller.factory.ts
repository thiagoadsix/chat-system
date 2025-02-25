import { SignInController } from '@presentation/controllers/auth/sign-in/sign-in.controller'
import { userInMemoryRepositoryFactory } from '@application/factories/controllers/user.in-memory-repositoru'

export const signInControllerFactory = () => {
  const userRepository = userInMemoryRepositoryFactory()
  return new SignInController(userRepository)
}