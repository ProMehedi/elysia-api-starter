import {} from 'elysia'

/**
 * @api [POST] /users
 * @description: Create a new user
 * @action public
 */
export const createUser = (body: any) => {
  console.log(body)
  return body
}
