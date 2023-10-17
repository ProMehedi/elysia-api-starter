export {}

import { jwt } from '@elysiajs/jwt'
import { Context } from 'elysia'

declare global {
  type RegBody = {
    name: string
    email: string
    password: string
    isAdmin?: boolean
  }
}
