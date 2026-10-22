const express = require('express')
const { requireAuth } = require('../middleware/auth')
const { register, login, me } = require('../controllers/authController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', requireAuth, me)

module.exports = router
