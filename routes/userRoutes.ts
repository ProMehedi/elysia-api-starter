import Elysia from 'elysia'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers'

const userRoutes = (app: Elysia) => {
  app.group('/api/v1/users', (app) =>
    // Create a new user
    app
      .post('/', createUser)

      // Get all users
      .get('/', getUsers)

      // Get a single user
      .get('/:id', getUser)

      // Update a single user
      .put('/:id', updateUser)

      // Delete a single user
      .delete('/:id', deleteUser)
  )
}

export default userRoutes as any
