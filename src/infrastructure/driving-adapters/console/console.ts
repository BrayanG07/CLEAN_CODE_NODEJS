import { User } from '../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { InMemoryUserRepository } from '../../implementations/InMemory/InMemoryUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { UserUpdateUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'

// IIFE(Inmediately-invoked function expressions) =  ESTA ES UNA FUNCION QUE SE EJECUTA DE FORMA RAPIDA
(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  // CREANDO USUARIOS
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: 'luciana24',
    id: '1'
  }
  await userCreatorUseCase.run(userToCreate)

  // LISTANDO USUARIOS
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  // ACTUALIZAR USUARIOS
  const usertUpdaterUseCase = new UserUpdateUseCase(inMemoryUserRepo)
  await usertUpdaterUseCase.run({
    id: '1',
    username: 'Alejandra'
  })

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)

  // ELIMINAR UN USUARIO
  const userDeleterUseCase = new UserDeleterUseCase(inMemoryUserRepo)
  await userDeleterUseCase.run('1')

  const usersReturned3 = await userGetterUseCase.run()
  console.log(usersReturned3)
})()
