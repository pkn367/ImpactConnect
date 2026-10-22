const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

function toSafeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinedDate: user.createdAt,
  }
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Fill in every field, including your role.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Your password needs to be at least 6 characters.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed, role })

    const token = signToken(user._id)
    res.status(201).json({ token, user: toSafeUser(user) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong creating your account.' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Enter your email and password to continue.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password.' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Incorrect email or password.' })
    }

    const token = signToken(user._id)
    res.json({ token, user: toSafeUser(user) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong logging you in.' })
  }
}

exports.me = async (req, res) => {
  res.json({ user: toSafeUser(req.user) })
}
