const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc   user signup
// @route  PUT /api/user
// @access Private
const signUp = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {
    id,
    password,
    name,
    phoneNumber,
    lat,
    lon,
    enableNotification,
    interests,
  } = req.body.user

  const user = await User.findOne({ id: id })
  if (user) {
    res.status(404)
    throw new Error(`User with id ${id} already exist, please log in`)
  }

  const newUser = await User.create({
    id,
    password,
    name,
    phoneNumber,
    lat,
    lon,
    enableNotification,
    interests,
  })

  res.status(200).json(newUser)
})

// @desc   user login
// @route  GET /api/:id/:userLoginStatus
// @access Private
const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ id: req.body.user.id })
  if (!user) {
    res.status(404)
    throw new Error(`User with id ${req.body.user.id} not found`)
  }

  if (req.body.user.password == user.password) {
    res.status(200)
  } else {
    res.status(404)
    throw new Error(`Password not correct, please enter again`)
  }
  res.status(200).json(user)
})

// @desc   get users
// @route  GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// @desc   get user
// @route  GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await user.findOne({ id: req.params.id })
  res.status(200).json(user)
})

// @desc   update user
// @route  PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {})

// @desc   create user
// @route  POST /api/users
// @access Private
const createUser = asyncHandler(async (req, res) => {})

// @desc   get nearby users that has three or more common interests within 500 meter radius
// @route  GET /api/nearbyCommonInterestsUsers
// @access Private
const getNearbyCommonInterestsUsers = asyncHandler(async (req, res) => {
  // const users = await user.find()
  // res.status(200).json(users)
})

module.exports = {
  signUp,
  login,
  getUsers,
}
