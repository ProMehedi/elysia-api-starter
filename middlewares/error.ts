import Elysia from 'elysia'

export const error = () =>
  new Elysia().onError((c) => {
    return {
      success: false,
      status: c.set.status,
      message: c.error?.message,
      stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
    }
  })
