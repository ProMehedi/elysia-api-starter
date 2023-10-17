import { Context } from 'elysia'
import { User } from '../models'
import { jwt } from '../utils'

/**
 * @name auth
 * @description Middleware to protect routes with JWT
 */
export const auth: any = async (c: Context) => {
  let token
  if (c.headers.authorization && c.headers.authorization.startsWith('Bearer')) {
    try {
      token = c.headers.authorization.split(' ')[1]
      const decoded = await jwt.verify(token)
      const user = await User.findById(decoded.id)

      c.request.headers.set('userId', user?._id.toString())
      c.request.headers.set('isAdmin', user?.isAdmin ? 'true' : 'false')
    } catch (error) {
      c.set.status = 401
      throw new Error('Not authorized, Invalid token!')
    }
  }

  if (!token) {
    c.set.status = 401
    throw new Error('Not authorized, No token found!')
  }
}

/**
 * @name admin
 * @description Middleware to protect routes with JWT and protect routes for admin only
 */
export const admin: any = async (c: Context) => {
  await auth(c)

  const isAdmin = c.request.headers.get('isAdmin')

  if (!isAdmin || isAdmin === 'false') {
    c.set.status = 401
    throw new Error('Not authorized as an Admin!')
  }
}
