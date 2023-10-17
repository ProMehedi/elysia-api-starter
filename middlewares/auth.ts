import { Context } from 'elysia'

export const auth: any = async (c: Context) => {
  if (!c.headers.authorization) {
    c.set.status = 401
    throw new Error('No token provided!')
  }

  const token = c.headers.authorization.split(' ')[1]

  if (token !== '123456') {
    c.set.status = 401
    throw new Error('Not authorized, Invalid token!')
  }
}
