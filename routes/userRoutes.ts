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
      .post('/', ({ body }) => createUser(body))

      // Get all users
      .get('/', () => getUsers())

      // Get a single user
      .get('/:id', ({ params }) => getUser(params.id))

      // Update a single user
      .put('/:id', ({ params, body }) => updateUser(params.id, body))

      // Delete a single user
      .delete('/:id', ({ params }) => deleteUser(params.id))
  )
}

export default userRoutes as any
