import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['curator', 'admin'],
      default: 'curator',
    },
  },
  { timestamps: true }
)

// Instance method: compare plain password against stored hash
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash)
}

// Never expose passwordHash in JSON responses
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash
    return ret
  },
})

export default mongoose.model('User', userSchema)
