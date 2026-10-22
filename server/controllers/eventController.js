const Event = require('../models/Event')

const sameId = (a, b) => a.toString() === b.toString()

function serializeEvent(event, userId) {
  const obj = event.toObject()
  const registeredCount = obj.baseRegistered + obj.registeredUserIds.length
  const isRegistered = userId ? obj.registeredUserIds.some((id) => sameId(id, userId)) : false
  delete obj.registeredUserIds
  return { ...obj, registeredCount, isRegistered }
}

// GET /api/events
exports.getAll = async (req, res) => {
  const events = await Event.find().sort({ date: 1 })
  const userId = req.user ? req.user._id : null
  res.json(events.map((e) => serializeEvent(e, userId)))
}

// GET /api/events/me/registrations
exports.getMyRegistrations = async (req, res) => {
  const events = await Event.find({ registeredUserIds: req.user._id })
  res.json(events.map((e) => e.id))
}

// POST /api/events/:id/register  (join, or leave if already joined)
exports.toggleRegister = async (req, res) => {
  const event = await Event.findOne({ id: req.params.id })
  if (!event) return res.status(404).json({ message: 'Event not found.' })

  const userId = req.user._id
  const alreadyIn = event.registeredUserIds.some((id) => sameId(id, userId))

  if (alreadyIn) {
    event.registeredUserIds = event.registeredUserIds.filter((id) => !sameId(id, userId))
  } else {
    if (event.baseRegistered + event.registeredUserIds.length >= event.capacity) {
      return res.status(400).json({ message: 'This event is fully booked.' })
    }
    event.registeredUserIds.push(userId)
  }

  await event.save()
  res.json(serializeEvent(event, userId))
}

// DELETE /api/events/:id/register  (cancel a registration)
exports.cancelRegistration = async (req, res) => {
  const event = await Event.findOne({ id: req.params.id })
  if (!event) return res.status(404).json({ message: 'Event not found.' })

  const userId = req.user._id
  if (!event.registeredUserIds.some((id) => sameId(id, userId))) {
    return res.status(400).json({ message: 'You are not registered for this event.' })
  }

  event.registeredUserIds = event.registeredUserIds.filter((id) => !sameId(id, userId))
  await event.save()
  res.json(serializeEvent(event, userId))
}

// PUT /api/events/:id/register  body: { newEventId }  (move registration to another event)
exports.switchRegistration = async (req, res) => {
  const { newEventId } = req.body
  if (!newEventId) return res.status(400).json({ message: 'Choose the event you want to switch to.' })
  if (newEventId === req.params.id) return res.status(400).json({ message: 'Choose a different event.' })

  const [oldEvent, newEvent] = await Promise.all([
    Event.findOne({ id: req.params.id }),
    Event.findOne({ id: newEventId }),
  ])
  if (!oldEvent || !newEvent) return res.status(404).json({ message: 'Event not found.' })

  const userId = req.user._id
  if (!oldEvent.registeredUserIds.some((id) => sameId(id, userId))) {
    return res.status(400).json({ message: 'You are not registered for the event you want to leave.' })
  }
  if (newEvent.registeredUserIds.some((id) => sameId(id, userId))) {
    return res.status(409).json({ message: 'You are already registered for that event.' })
  }
  if (newEvent.baseRegistered + newEvent.registeredUserIds.length >= newEvent.capacity) {
    return res.status(400).json({ message: 'That event is fully booked.' })
  }

  // Join the new event first, then leave the old one, so a failure never leaves you with no event
  newEvent.registeredUserIds.push(userId)
  await newEvent.save()
  oldEvent.registeredUserIds = oldEvent.registeredUserIds.filter((id) => !sameId(id, userId))
  await oldEvent.save()

  res.json({ from: serializeEvent(oldEvent, userId), to: serializeEvent(newEvent, userId) })
}
