require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/db')
const logger = require('./middleware/logger')
const { landingPage } = require('./views/landing')

const authRoutes = require('./routes/authRoutes')
const ngoRoutes = require('./routes/ngoRoutes')
const eventRoutes = require('./routes/eventRoutes')
const statsRoutes = require('./routes/statsRoutes')
const systemRoutes = require('./routes/systemRoutes')

const app = express()

// Middleware runs on every request, in this order
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } })) // safer HTTP headers
app.use(cors())          // allow the React app to call the API
app.use(express.json()) // read JSON request bodies
app.use(logger)          // print each request in the terminal

// Slow down password-guessing: max 100 login/register attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again in a few minutes.' },
})

app.get('/', (req, res) => res.type('html').send(landingPage())) // status page
app.get('/favicon.ico', (req, res) => res.status(204).end())

app.use('/api', systemRoutes) // /api, /api/health, /api/status
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/ngos', ngoRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/stats', statsRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error' })
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✔ Server listening on http://localhost:${PORT}`))
})
