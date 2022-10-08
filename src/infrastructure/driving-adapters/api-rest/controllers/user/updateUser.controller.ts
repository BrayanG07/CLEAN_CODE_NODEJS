import { NextFunction, Request, Response } from 'express'
import { User } from '../../../../../domain/entities/User'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserUpdateUseCase } from '../../../../../application/usecases/UserUpdater/index'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, age, name } = req.body

  const userId = req.params.userId

  const dynamoDbUserRepo = new DynamoDBUserRepository()
  const userUpdaterUseCase = new UserUpdateUseCase(dynamoDbUserRepo)

  const userToUpdate: User = {
    id: userId,
    name,
    username,
    age
  }

  try {
    const userUpdated = await userUpdaterUseCase.run(userToUpdate)
    res.json(userUpdated)
    return
  } catch (error) {
    return next(error)
  }
}
