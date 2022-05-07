const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')

// @desc   get users
// @route  GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await user.find()
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
const updateUser = asyncHandler(async (req, res) => {

})

// @desc   create user
// @route  POST /api/users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  
})



// @desc   get nearby users that has three or more common interests within 500 meter radius
// @route  GET /api/nearbyCommonInterestsUsers
// @access Private
const getNearbyCommonInterestsUsers = asyncHandler(async (req, res) => {
  // const users = await user.find()
  // res.status(200).json(users)
})

module.exports = {
  getusers,
  getuser,
  updateuser,
  createuser,
  deleteuser,
}
