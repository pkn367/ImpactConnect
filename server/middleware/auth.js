const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'You must be logged in to do that.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Your session is no longer valid. Please log in again.' })
    }
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' })
  }
}

async function optionalAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return next()

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')
    if (user) req.user = user
  } catch {
    // invalid/expired token on a public route — just proceed as a logged-out visitor
  }
  next()
}

module.exports = { requireAuth, optionalAuth }
