const mongoose = require('mongoose')

// Reuse one connection across calls (important when running as a serverless function)
let connecting = null

async function connectDB() {
  if (mongoose.connection.readyState === 1) return
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI is missing. Set it in .env (locally) or in your Netlify environment variables.')
  }
  if (!connecting) {
    connecting = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then(() => console.log('✔ MongoDB connected'))
      .catch((err) => {
        connecting = null
        throw new Error(`MongoDB connection failed: ${err.message}`)
      })
  }
  await connecting
}

module.exports = connectDB
