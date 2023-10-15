import { Context } from 'elysia'
import { User } from '../models'

/**
 * @api [POST] /users
 * @description: Create a new user
 * @action public
 */
export const createUser = (c: Context) => {
  //   Check for body
  if (!c.body) return 'No body provided'

  return c.body
}

/**
 * @api [GET] /users
 * @description: Get all users
 * @action public
 */
export const getUsers = async (c: Context) => {
  const users = await User.find().select('-password')

  // Check for users
  if (!users || users.length === 0) {
    c.set.status = 404
    throw new Error('No users found!')
  }

  // Return success response
  return {
    status: c.set.status,
    success: true,
    data: users,
    message: 'Users fetched successfully',
  }
}

/**
 * @api [GET] /users/:id
 * @description: Get a single user
 * @action public
 */
export const getUser = async (c: Context<{ params: { id: string } }>) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400
    throw new Error('No id provided')
  }

  return `Get user with id ${c.params.id}`
}

/**
 * @api [PUT] /users/:id
 * @description: Update a single user
 * @action public
 */
export const updateUser = async (c: Context<{ params: { id: string } }>) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400
    throw new Error('No id provided')
  }

  //   Check for body
  if (!c.body) throw new Error('No body provided')

  return `Update user with id ${c.params.id}`
}

/**
 * @api [DELETE] /users/:id
 * @description: Delete a single user
 * @action public
 */
export const deleteUser = async (c: Context<{ params: { id: string } }>) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400
    throw new Error('No id provided')
  }

  return `Delete user with id ${c.params.id}`
}
