import { v4 as uuidv4 } from 'uuid'
import { NextFunction, Request, Response } from 'express'
import { User } from '../../../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, age, name } = req.body

  const dynamoDbUserRepo = new DynamoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDbUserRepo)

  const userToCreate: User = {
    id: uuidv4(),
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
