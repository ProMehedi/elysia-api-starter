import { Document, Schema, model } from 'mongoose'

interface User {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

interface UserDoc extends User, Document {
  mathPassword: (pass: string) => Promise<boolean>
}

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
)

// Match user entered password to hashed password in database
userSchema.methods.mathPassword = async function (enteredPassword: string) {
  return Bun.password.verifySync(enteredPassword, this.password)
}

// Hash password with Bun
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  // use bcrypt
  this.password = await Bun.password.hash(this.password, {
    algorithm: 'bcrypt',
    cost: 4, // number between 4-31
  })
})

const User = model<UserDoc>('User', userSchema)
export default User
