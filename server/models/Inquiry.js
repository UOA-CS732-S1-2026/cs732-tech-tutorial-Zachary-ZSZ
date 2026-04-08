import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    visitorName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

export default mongoose.model('Inquiry', inquirySchema)
