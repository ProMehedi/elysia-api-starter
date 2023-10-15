import Elysia from 'elysia'
//
import { userRoutes } from './routes'
import { logger } from './middlewares'
import { connectDB } from './config'

// Create Elysia instance
const app = new Elysia()

// Config MongoDB
connectDB()

// Middlewares
app.use(logger())

// Root Routes
app.get('/', () => 'Welcome to our API')

// User Routes [api/v1/users]
app.use(userRoutes)

// Start the server
app.listen(Bun.env.PORT || 9000)

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
)
