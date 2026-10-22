const express = require('express')
const mongoose = require('mongoose')
const NGO = require('../models/NGO')
const Event = require('../models/Event')
const User = require('../models/User')
const logger = require('../middleware/logger')
const { endpoints } = require('../views/landing')

const router = express.Router()
const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting']

// GET /api  -> list of endpoints as JSON
router.get('/', (req, res) => {
  res.json({ name: 'ImpactConnect API', version: '1.0.0', endpoints })
})

// GET /api/health  -> quick check that the server is alive
router.get('/health', (req, res) => res.json({ ok: true }))

// GET /api/status  -> data for the live status page
router.get('/status', async (req, res) => {
  let counts = { ngos: null, events: null, users: null }
  try {
    const [ngos, events, users] = await Promise.all([NGO.countDocuments(), Event.countDocuments(), User.countDocuments()])
    counts = { ngos, events, users }
  } catch {
    // database unreachable: counts stay null
  }
  res.json({
    status: 'online',
    port: process.env.PORT || 5000,
    uptimeSeconds: Math.round(process.uptime()),
    node: process.version,
    environment: process.env.NODE_ENV || 'development',
    database: { state: DB_STATES[mongoose.connection.readyState] || 'unknown', name: mongoose.connection.name || 'impactconnect' },
    counts,
    recentRequests: logger.recent,
  })
})

module.exports = router
