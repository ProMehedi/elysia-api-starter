import { Context } from 'elysia'
import { User } from '../models'

/**
 * @api [POST] /users
 * @description: Create a new user
 * @action public
 */
export const createUser = (body: any) => {
  //   Check for body
  if (!body) return 'No body provided'

  return body
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
export const getUser = (id: string) => {
  //   Check for id
  if (!id) return 'No id provided'

  return `Get user with id ${id}`
}

/**
 * @api [PUT] /users/:id
 * @description: Update a single user
 * @action public
 */
export const updateUser = (id: string, body: any) => {
  //   Check for id
  if (!id) return 'No id provided'

  //   Check for body
  if (!body) return 'No body provided'

  return `Update user with id ${id}`
}

/**
 * @api [DELETE] /users/:id
 * @description: Delete a single user
 * @action public
 */
export const deleteUser = (id: string) => {
  //   Check for id
  if (!id) return 'No id provided'

  return `Delete user with id ${id}`
}
