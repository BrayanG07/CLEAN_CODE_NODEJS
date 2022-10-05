import { User } from '../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { InMemoryUserRepository } from '../../implementations/InMemory/InMemoryUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'

// IIFE(Inmediately-invoked function expressions) =  ESTA ES UNA FUNCION QUE SE EJECUTA DE FORMA RAPIDA
(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  // CREANDO USUARIOS
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: 'luciana24',
    id: '1234'
  }
  await userCreatorUseCase.run(userToCreate)

  // LISTANDO USUARIOS
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)
})()
