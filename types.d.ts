export {}

import { jwt } from '@elysiajs/jwt'
import { Context } from 'elysia'

declare global {
  interface AppContext extends Context {
    jwt: {
      readonly sign: (
        morePayload: UnwrapSchema<Schema, Record<string, string>> &
          JWTPayloadSpec
      ) => Promise<string>
      readonly verify: (
        jwt?: string
      ) => Promise<
        false | (UnwrapSchema<Schema, Record<string, string>> & JWTPayloadSpec)
      >
    }
  }
}
