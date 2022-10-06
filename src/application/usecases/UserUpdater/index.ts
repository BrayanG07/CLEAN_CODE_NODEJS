import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

export class UserUpdateUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: User): Promise<User> {
    const user = await this._userGetterById.run(data.id)

    const dataToUpdate: User = {
      age: data.age ?? user.age, // Nullish Coalescing Operator = solo evalua null o undefined
      name: data.name ?? user.name,
      id: data.id,
      username: data.username ?? user.username
    }

    const userUpdated: User = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
