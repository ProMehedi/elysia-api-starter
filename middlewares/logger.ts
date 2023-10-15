import Elysia from 'elysia'
import * as pc from 'picocolors'
import process from 'process'

export const logger = () =>
  new Elysia()
    .onRequest((ctx) => {
      ctx.store = { ...ctx.store, beforeTime: process.hrtime.bigint() }
    })
    .onBeforeHandle((ctx) => {
      ctx.store = { ...ctx.store, beforeTime: process.hrtime.bigint() }
    })
    .onAfterHandle(({ request, store }) => {
      const logStr: string[] = []
      if (request.headers.get('X-Forwarded-For')) {
        logStr.push(`[${pc.cyan(request.headers.get('X-Forwarded-For'))}]`)
      }

      logStr.push(methodString(request.method))

      const path = (url: string) => `[[${url}]]`

      logStr.push(path(new URL(request.url).pathname))
      const beforeTime: bigint = (store as any).beforeTime

      logStr.push(durationString(beforeTime))

      console.log(logStr.join(': '))
    })
    .onError(({ request, error, store }) => {
      const logStr: string[] = []

      logStr.push(pc.red(methodString(request.method)))

      logStr.push(new URL(request.url).pathname)

      logStr.push(pc.red('Error'))

      if ('status' in error) {
        logStr.push(String(error.status))
      }

      logStr.push(error.message)
      const beforeTime: bigint = (store as any).beforeTime

      logStr.push(durationString(beforeTime))

      console.log(logStr.join(' - '))
    })

const durationString = (beforeTime: bigint): string => {
  const now = process.hrtime.bigint()
  const timeDifference = now - beforeTime
  const nanoseconds = Number(timeDifference)

  const durationInMicroseconds = (nanoseconds / 1e3).toFixed(0) // Convert to microseconds
  const durationInMilliseconds = (nanoseconds / 1e6).toFixed(0) // Convert to milliseconds
  let timeMessage: string = ''

  if (nanoseconds >= 1e9) {
    const seconds = (nanoseconds / 1e9).toFixed(2)
    timeMessage = `[${seconds}s]`
  } else if (nanoseconds >= 1e6) {
    timeMessage = `[${durationInMilliseconds}ms]`
  } else if (nanoseconds >= 1e3) {
    timeMessage = `[${durationInMicroseconds}µs]`
  } else {
    timeMessage = `[${nanoseconds}ns]`
  }

  return pc.cyan(timeMessage)
}

const methodString = (method: string): string => {
  const maxMethodLength = 9
  const methodStr = (m: string) => m.padEnd(maxMethodLength, ' ')

  switch (method) {
    case 'GET':
      return pc.bgCyan(methodStr('[GET]'))

    case 'POST':
      return pc.bgYellow(methodStr('[POST]'))

    case 'PUT':
      return pc.bgBlue(methodStr('[PUT]'))

    case 'DELETE':
      return pc.bgRed(methodStr('[DELETE]'))

    case 'PATCH':
      return pc.bgGreen(methodStr('[PATCH]'))

    case 'OPTIONS':
      return pc.bgWhite(methodStr('[OPTIONS]'))

    case 'HEAD':
      return pc.bgMagenta(methodStr('[HEAD]'))

    default:
      return method
  }
}
