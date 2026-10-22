const express = require('express')
const { requireAuth, optionalAuth } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')
const { getAll, getMyRegistrations, toggleRegister, cancelRegistration, switchRegistration } = require('../controllers/eventController')

const router = express.Router()

router.get('/', optionalAuth, asyncHandler(getAll))
router.get('/me/registrations', requireAuth, asyncHandler(getMyRegistrations))
router.post('/:id/register', requireAuth, asyncHandler(toggleRegister))          // join / leave
router.put('/:id/register', requireAuth, asyncHandler(switchRegistration))       // switch to another event
router.delete('/:id/register', requireAuth, asyncHandler(cancelRegistration))    // cancel

module.exports = router
