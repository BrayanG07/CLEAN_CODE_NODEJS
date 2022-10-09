import { NextFunction, Request, Response } from 'express'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, age, name } = req.body

  const dynamoDbUserRepo = new DynamoDBUserRepository()
  const uuidV4Generator = new UuidV4Generator()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDbUserRepo, uuidV4Generator)

  const userToCreate = {
    name,
    username,
    age
  }

  try {
    const userCreated = await userCreatorUseCase.run(userToCreate)
    res.json(userCreated)
    return
  } catch (error) {
    return next(error)
  }
}
