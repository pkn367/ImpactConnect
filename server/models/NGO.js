const mongoose = require('mongoose')

const ngoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // url slug, e.g. "hope-foundation"
  name: { type: String, required: true },
  category: { type: String, required: true },
  verified: { type: Boolean, default: false },
  location: String,
  founded: Number,
  volunteers: Number,
  image: String,
  tagline: String,
  about: String,
  needs: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who added it (CRUD ownership)
})

module.exports = mongoose.model('NGO', ngoSchema)
