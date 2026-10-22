require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })
const mongoose = require('mongoose')
const NGO = require('../models/NGO')
const Event = require('../models/Event')
const { ngos, events } = require('./data')

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('✖ MONGO_URI is missing. Copy .env.example to .env and fill it in first.')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log('✔ Connected to MongoDB')

  await NGO.deleteMany({})
  await Event.deleteMany({})

  await NGO.insertMany(ngos)
  await Event.insertMany(events)

  console.log(`✔ Seeded ${ngos.length} NGOs and ${events.length} events`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('✖ Seeding failed:', err.message)
  process.exit(1)
})
