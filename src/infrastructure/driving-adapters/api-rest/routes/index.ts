import { Request, Response, Router, NextFunction } from 'express'
import userRoutes from './user.routes'
import { Exception } from '@domain/exceptions/Exception'

const route = Router()

route.use('/users', userRoutes)

// DEFINIMOS 2 MIDLEWARES O HANDLER(MANEJADOR) DE ERRORES
// NUESTROS CASOS DE USO MANEJAN ERRORES, ENTONCES DEBEMOS TRATARLOS CON LOS MIDLEWARES
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    res.status(400).json({
      message: err.spanishMessage
    })
  } else {
    next(err)
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
