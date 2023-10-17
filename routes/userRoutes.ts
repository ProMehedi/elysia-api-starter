import { Elysia, t } from 'elysia'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '~/controllers'
import { admin, auth } from '~/middlewares'

const userRoutes = (app: Elysia) => {
  app.group('/api/v1/users', (app) =>
    // Create a new user
    app
      .post('/', createUser, {
        body: t.Object({
          name: t.String(),
          email: t.String(),
          password: t.String(),
          isAdmin: t.Optional(t.Boolean()),
        }),
        type: 'json',
      })

      // Get all users
      .get('/', getUsers, {
        beforeHandle: (c) => admin(c),
      })

      // Get a single user
      .get('/:id', getUser, {
        beforeHandle: (c) => auth(c),
      })

      // Update a single user
      .put('/:id', updateUser, {
        beforeHandle: (c) => auth(c),
      })

      // Delete a single user
      .delete('/:id', deleteUser, {
        beforeHandle: (c) => admin(c),
      })
  )
}

export default userRoutes as any
