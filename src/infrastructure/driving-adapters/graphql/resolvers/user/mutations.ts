import { UserCreatorUseCase } from '@application/usecases/UserCreator'
import { DynamoDBUserRepository } from '@infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'
import { HandlerError } from '../../utils/HandlerError'

const userMuttations = {
  // createUser = este nombre debe ser igual al que definimos el mutation del tyopesdefs en el archivo index.graphql
  createUser: async (_: any, args: any) => {
    // args = es el tipo de dato que definimos en la Mutation, basicamente el UserCreateInput { user: { name, username, age } }
    const { user: { username, age, name } } = args

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
      return userCreated
    } catch (error) {
      return HandlerError.run(error)
    }
  }
}

export default userMuttations
