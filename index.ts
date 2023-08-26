import { Elysia } from 'elysia'
import { createUser } from './controllers'

// Create Elysia instance
const app = new Elysia()

// Root Route
app.get('/', () => 'Welcome to our API')

// User Routes
app.group('/api/v1/users', (app) =>
  // Create a new user
  app.post('/', ({ body }) => createUser(body))
)

// Start the server
app.listen(Bun.env.PORT || 9000)

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
)
