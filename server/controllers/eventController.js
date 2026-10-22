const Event = require('../models/Event')

function serializeEvent(event, userId) {
  const obj = event.toObject()
  const registeredCount = obj.baseRegistered + obj.registeredUserIds.length
  const isRegistered = userId
    ? obj.registeredUserIds.some((id) => id.toString() === userId.toString())
    : false
  delete obj.registeredUserIds
  return { ...obj, registeredCount, isRegistered }
}

exports.getAll = async (req, res) => {
  const events = await Event.find().sort({ date: 1 })
  const userId = req.user ? req.user._id : null
  res.json(events.map((e) => serializeEvent(e, userId)))
}

exports.getMyRegistrations = async (req, res) => {
  const events = await Event.find({ registeredUserIds: req.user._id })
  res.json(events.map((e) => e.id))
}

exports.toggleRegister = async (req, res) => {
  const event = await Event.findOne({ id: req.params.id })
  if (!event) return res.status(404).json({ message: 'Event not found.' })

  const userId = req.user._id
  const alreadyIn = event.registeredUserIds.some((id) => id.toString() === userId.toString())

  if (alreadyIn) {
    event.registeredUserIds = event.registeredUserIds.filter((id) => id.toString() !== userId.toString())
  } else {
    if (event.baseRegistered + event.registeredUserIds.length >= event.capacity) {
      return res.status(400).json({ message: 'This event is fully booked.' })
    }
    event.registeredUserIds.push(userId)
  }

  await event.save()
  res.json(serializeEvent(event, userId))
}
