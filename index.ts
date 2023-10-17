import { Elysia } from 'elysia'
//
import { userRoutes } from './routes'
import { error, logger } from './middlewares'
import { connectDB } from './config'
import { jwt } from '@elysiajs/jwt'

// Create Elysia instance
const app = new Elysia()

// Config MongoDB
connectDB()

// Middlewares
app.use(
  // @ts-ignore
  jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || '',
    exp: '7d',
  })
)
app.use(logger())
app.use(error())

// Root Routes
app.get('/', () => 'Welcome to our API')

// User Routes [api/v1/users]
app.use(userRoutes)

// Start the server
app.listen(Bun.env.PORT || 9000)

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
)
