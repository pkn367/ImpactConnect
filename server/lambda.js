// Wraps the Express app as a serverless (Netlify Function) handler.
// Used by netlify/functions/api.js; dependencies resolve from server/node_modules.
const serverless = require('serverless-http')
const app = require('./app')
const connectDB = require('./config/db')

const handler = serverless(app)

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  // If called directly at /.netlify/functions/api/..., map it back to /api/...
  if (event.path && event.path.startsWith('/.netlify/functions/api')) {
    event.path = event.path.replace('/.netlify/functions/api', '/api')
  }
  try {
    await connectDB()
  } catch (err) {
    console.error(err.message)
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Database unavailable. Check MONGO_URI in the Netlify environment variables.' }),
    }
  }
  return handler(event, context)
}
