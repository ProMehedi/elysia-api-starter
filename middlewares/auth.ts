import { User } from '../models'

export const auth: any = async (c: AppContext) => {
  let token
  if (c.headers.authorization && c.headers.authorization.startsWith('Bearer')) {
    try {
      token = c.headers.authorization.split(' ')[1]
      const decoded = await c.jwt.verify(token)
      const { _id, isAdmin } = await User.findById(decoded.id)

      c.request.headers.set('userId', _id.toString())
      c.request.headers.set('isAdmin', isAdmin)
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

export const admin: any = async (c: AppContext) => {
  await auth(c)

  const isAdmin = c.request.headers.get('isAdmin')

  if (!isAdmin || isAdmin === 'false') {
    c.set.status = 401
    throw new Error('Not authorized as an Admin!')
  }
}
