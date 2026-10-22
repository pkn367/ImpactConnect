const express = require('express')
const { requireAuth, optionalAuth } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')
const { getAll, getMyRegistrations, toggleRegister } = require('../controllers/eventController')

const router = express.Router()

router.get('/', optionalAuth, asyncHandler(getAll))
router.get('/me/registrations', requireAuth, asyncHandler(getMyRegistrations))
router.post('/:id/register', requireAuth, asyncHandler(toggleRegister))

module.exports = router
