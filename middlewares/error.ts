import Elysia from 'elysia'

export const error = () =>
  new Elysia().onError((c) => {
    if (c.code === 'NOT_FOUND') {
      c.set.status = 501
      return {
        success: false,
        status: 501,
        message: `Not Found - [${c.request.method}]:[${c.path}]`,
        stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
      }
    }

    c.set.status = c.set.status || 500
    return {
      success: false,
      status: c.set.status,
      message: c.error?.message,
      stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
    }
  })
