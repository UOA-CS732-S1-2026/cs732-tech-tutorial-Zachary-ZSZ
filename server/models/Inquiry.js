import mongoose from 'mongoose'

// Inquiry captures a public visitor's provenance request for a specific car.
// Inquiries are write-only for visitors (POST /api/inquiries) and read-only
// for the curator (GET /api/inquiries, protected by auth middleware).
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
      // Lightweight format check only — intentionally not RFC 5322 compliant.
      // Full validation is deferred to the email delivery layer.
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

export default mongoose.model('Inquiry', inquirySchema)
