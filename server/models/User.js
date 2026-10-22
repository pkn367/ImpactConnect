const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // stored as a bcrypt hash, never plain text
    role: {
      type: String,
      enum: ['Volunteer', 'Donor', 'NGO', 'Corporate'],
      required: true,
    },
    registeredEvents: [{ type: String }], // array of event "id" slugs
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
