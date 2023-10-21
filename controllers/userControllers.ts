import { Context } from 'elysia'
import { User } from '~/models'
import { jwt } from '~/utils'

/**
 * @api [POST] /users
 * @description: Create a new user
 * @action public
 */
export const createUser = async (c: Context) => {
  //   Check for body
  if (!c.body) throw new Error('No body provided')

  const { name, email, password, isAdmin } = c.body as RegBody

  // Check for user
  const userExists = await User.findOne({ email })
  if (userExists) {
    c.set.status = 400
    throw new Error('User already exists!')
  }

  // Create user
  const _user = await User.create({
    name,
    email,
    password,
    isAdmin,
  })

  if (!_user) {
    c.set.status = 400
    throw new Error('Invalid user data!')
  }

  // Generate token
  const accessToken = await jwt.sign({
    data: { id: _user._id, isAdmin: _user.isAdmin },
  })

  // Return success response
  c.set.status = 201
  return {
    status: c.set.status,
    success: true,
    data: { accessToken },
    message: 'User created successfully',
  }
}

/**
 * @api [POST] /users/login
 * @description: Login a user
 * @action public
 */
export const loginUser = async (c: Context) => {
  //   Check for body
  if (!c.body) throw new Error('No body provided')

  const { email, password } = c.body as LoginBody

  if (!email || !password) throw new Error('Invalid email or password!')

  // Check for user
  const user = await User.findOne({ email })
  if (!user) {
    c.set.status = 401
    throw new Error('Invalid email or password!')
  }

  // Check for password
  const isMatch = await user.mathPassword(password)
  console.log(isMatch)
  if (!isMatch) {
    c.set.status = 401
    throw new Error('Invalid email or password!')
  }

  // Generate token
  const accessToken = await jwt.sign({
    data: { id: user._id, isAdmin: user.isAdmin },
  })

  // Return success response
  return {
    status: c.set.status,
    success: true,
    data: { accessToken },
    message: 'User logged in successfully',
  }
}

/**
 * @api [GET] /users
 * @description: Get all users
 * @action public
 */
export const getUsers = async (c: Context) => {
  const users = await User.find()

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
