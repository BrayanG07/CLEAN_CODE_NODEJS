import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { Request, Response, Router, NextFunction } from 'express'
import userRoutes from './user.routes'

const route = Router()

route.use('/users', userRoutes)

// DEFINIMOS 2 MIDLEWARES O HANDLER(MANEJADOR) DE ERRORES
// NUESTROS CASOS DE USO MANEJAN ERRORES, ENTONCES DEBEMOS TRATARLOS CON LOS MIDLEWARES
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlreadyExistsException) { // Validando que el throw que se ejecuta sea de cierto tipo
    res.status(400).json({
      message: 'El usuario ya ha sido registrado'
    })
  } else if (err instanceof UserNotFoundException) {
    res.status(400).json({
      message: 'El usuario no existe'
    })
  } else {
    // SI NO ENCONTRO ESTA RUTA, QUE PASE A LAS SIGUIENTES Y SIGA BUSCANDO
    next(err) // Cuando llegue aca, este ara que caiga en el siguiente metodo
  }
})

// SI NO ES UN ERROR CONTROLADO ENTONCES SE EJECUTA ESTE MIDLEWARE
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route
