const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // url slug
  title: { type: String, required: true },
  category: String,
  organizer: String,
  organizerId: String,
  date: String,
  time: String,
  location: String,
  capacity: Number,
  baseRegistered: { type: Number, default: 0 }, // simulated existing sign-ups
  image: String,
  description: String,
  registeredUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Event', eventSchema)
