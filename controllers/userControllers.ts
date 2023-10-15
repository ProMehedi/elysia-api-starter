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
export const getUsers = () => {
  return 'Get all users'
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
