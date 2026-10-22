const NGO = require('../models/NGO')

const CATEGORIES = ['Education', 'Environment', 'Healthcare', 'Animal Welfare', 'Youth Empowerment']
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80'

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// READ: GET /api/ngos
exports.getAll = async (req, res) => {
  const ngos = await NGO.find().sort({ name: 1 })
  res.json(ngos)
}

// READ: GET /api/ngos/:id
exports.getById = async (req, res) => {
  const ngo = await NGO.findOne({ id: req.params.id })
  if (!ngo) return res.status(404).json({ message: 'Organization not found.' })
  res.json(ngo)
}

// CREATE: POST /api/ngos  (logged in, NGO accounts only)
exports.create = async (req, res) => {
  try {
    if (req.user.role !== 'NGO') {
      return res.status(403).json({ message: 'Only NGO accounts can add organizations.' })
    }
    const { name, category, location, tagline, about, needs, image } = req.body
    if (!name || !category || !location || !tagline) {
      return res.status(400).json({ message: 'name, category, location and tagline are required.' })
    }
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `category must be one of: ${CATEGORIES.join(', ')}` })
    }
    const id = slugify(name)
    if (await NGO.findOne({ id })) {
      return res.status(409).json({ message: 'An organization with this name already exists.' })
    }
    const ngo = await NGO.create({
      id, name, category, location, tagline,
      about: about || tagline,
      needs: Array.isArray(needs) ? needs : [],
      image: image || DEFAULT_IMAGE,
      founded: new Date().getFullYear(),
      volunteers: 0,
      verified: false,
      createdBy: req.user._id,
    })
    res.status(201).json(ngo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not create the organization.' })
  }
}

// UPDATE: PUT /api/ngos/:id  (only the account that created it)
exports.update = async (req, res) => {
  try {
    const ngo = await NGO.findOne({ id: req.params.id })
    if (!ngo) return res.status(404).json({ message: 'Organization not found.' })
    if (!ngo.createdBy || ngo.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit organizations you created.' })
    }
    const allowed = ['name', 'category', 'location', 'tagline', 'about', 'needs', 'image']
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) ngo[field] = req.body[field]
    })
    if (!CATEGORIES.includes(ngo.category)) {
      return res.status(400).json({ message: `category must be one of: ${CATEGORIES.join(', ')}` })
    }
    await ngo.save()
    res.json(ngo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not update the organization.' })
  }
}

// DELETE: DELETE /api/ngos/:id  (only the account that created it)
exports.remove = async (req, res) => {
  try {
    const ngo = await NGO.findOne({ id: req.params.id })
    if (!ngo) return res.status(404).json({ message: 'Organization not found.' })
    if (!ngo.createdBy || ngo.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete organizations you created.' })
    }
    await ngo.deleteOne()
    res.json({ message: 'Organization deleted.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not delete the organization.' })
  }
}
