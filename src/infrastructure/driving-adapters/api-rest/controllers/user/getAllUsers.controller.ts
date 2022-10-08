import { Response, Request, NextFunction } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../../../application/usecases/UserGetter/index'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)

  try {
    const users = await userGetterUseCase.run()
    res.json(users)
    return
  } catch (error) {
    return next(error)
  }
}
