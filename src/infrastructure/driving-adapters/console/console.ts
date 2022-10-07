import path from 'path'
import * as dotenv from 'dotenv'
import { User } from '../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
// import { InMemoryUserRepository } from '../../implementations/InMemory/InMemoryUserRepository'
import { DynamoDBUserRepository } from '../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { UserUpdateUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'

// IIFE(Inmediately-invoked function expressions) =  ESTA ES UNA FUNCION QUE SE EJECUTA DE FORMA RAPIDA
(async () => {
  dotenv.config({ // CON ESTO LE DECIMOS QUE AQUI PODRA ENCONTRAR LAS CREDENCIALES PARA CONECTARSE A LA BD
    path: path.resolve(__dirname, '../../../../.env')
  })

  // const inMemoryUserRepo = new InMemoryUserRepository()
  const dynamoDBUserRepository = new DynamoDBUserRepository()

  // CREANDO USUARIOS
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepository)
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: 'luciana24',
    id: '1'
  }
  await userCreatorUseCase.run(userToCreate)

  // LISTANDO USUARIOS
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepository)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  // ACTUALIZAR USUARIOS
  const usertUpdaterUseCase = new UserUpdateUseCase(dynamoDBUserRepository)
  await usertUpdaterUseCase.run({
    id: '1',
    username: 'Alejandra'
  })

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)

  // ELIMINAR UN USUARIO
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepository)
  await userDeleterUseCase.run('1')

  const usersReturned3 = await userGetterUseCase.run()
  console.log(usersReturned3)
})()
