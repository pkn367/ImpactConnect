const express = require('express')
const { requireAuth } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')
const { getAll, getById, create, update, remove } = require('../controllers/ngoController')

const router = express.Router()

router.get('/', asyncHandler(getAll))                      // anyone
router.get('/:id', asyncHandler(getById))                  // anyone
router.post('/', requireAuth, asyncHandler(create))        // logged in + NGO role
router.put('/:id', requireAuth, asyncHandler(update))      // logged in + owner
router.delete('/:id', requireAuth, asyncHandler(remove))   // logged in + owner

module.exports = router
