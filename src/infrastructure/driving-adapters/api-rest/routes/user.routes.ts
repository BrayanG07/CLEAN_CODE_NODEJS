import { Router } from 'express'

import {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController
} from '../controllers'

const route = Router()

route.delete('/:id', deleteUserController)
route.put('/:userId', updateUserController)
route.get('', getAllUsersController)
route.post('', createUserController)

export default route
