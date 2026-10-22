const express = require('express')
const NGO = require('../models/NGO')
const Event = require('../models/Event')
const User = require('../models/User')

const router = express.Router()

// GET /api/stats -> live numbers straight from MongoDB (uses aggregation pipelines)
router.get('/', async (req, res) => {
  try {
    const [ngos, events, users, byCategory, volunteers, signups] = await Promise.all([
      NGO.countDocuments(),
      Event.countDocuments(),
      User.countDocuments(),
      NGO.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      NGO.aggregate([{ $group: { _id: null, total: { $sum: '$volunteers' } } }]),
      Event.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $add: ['$baseRegistered', { $size: { $ifNull: ['$registeredUserIds', []] } }] } },
          },
        },
      ]),
    ])
    res.json({
      ngos,
      events,
      users,
      networkVolunteers: volunteers[0] ? volunteers[0].total : 0,
      signups: signups[0] ? signups[0].total : 0,
      ngosByCategory: byCategory.map((c) => ({ category: c._id, count: c.count })),
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not load stats.' })
  }
})

module.exports = router
