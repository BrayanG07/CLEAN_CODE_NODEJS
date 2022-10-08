import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserDeleterUseCase } from '../../../../../application/usecases/UserDeleter'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.id

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

  try {
    const userDeleted = await userDeleterUseCase.run(userId)
    res.json(userDeleted)
    return
  } catch (error) {
    return next(error)
  }
}
