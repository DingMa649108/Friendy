const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const accountSid = 'AC64804f4080250946410ba2eefd04702e'
const authToken = 'bbd2f53f0285c08713de33d5308668f2'
const phone_number = '+19705195580'
const client = require('twilio')(accountSid, authToken)

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

// @desc   get nearby users that has three or more common interests within 500 meter radius based on current lat and lon, update
//         the lat and lon for that user and send text message for a list of user's name and common interests if enabled the
//         notification setting
// @route  GET /api/:id
// @access Private
const getNearbyCommonInterestsUsers = asyncHandler(async (req, res) => {
  const lat = req.body.lat
  const lon = req.body.lon
  let user = await User.findOne({ id: req.body.id })
  if (!lat || !lon || !user) {
    res.status(404)
    throw new Error(`Please input lat and lon and an existed id`)
  }
  let otherUsers = await User.find()
  var index = otherUsers
    .map((x) => {
      return x.id
    })
    .indexOf(user.id)
  otherUsers.splice(index, 1)

  const newUser = {
    _id: user._id,
    id: user.id,
    password: user.password,
    name: user.name,
    phoneNumber: user.phoneNumber,
    lat: lat,
    lon: lon,
    enableNotification: user.enableNotification,
    interests: {
      sports: user.interests.sports,
      reading: user.interests.reading,
      music: user.interests.music,
      gaming: user.interests.gaming,
      movie: user.interests.movie,
      academics: user.interests.academics,
      gardening: user.interests.gardening,
      _id: user.interests._id,
    },
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  }

  await User.findByIdAndUpdate(user._id, newUser, {
    new: false,
  })

  user = await User.findOne({ id: req.body.id })
  const commonInterestsUsers = getCommonInterestsUserList(user, otherUsers)
  if (user.enableNotification) {
    client.messages
      .create({
        body: getMessageContent(user, commonInterestsUsers),
        from: phone_number,
        to: user.phoneNumber,
      })
      .then((message) => console.log(message.sid))
  }

  res.status(200).json(commonInterestsUsers)
})

// EFFECTS: get the text message body to send. It includes each commonInterestsUsers's name and common interests
function getMessageContent(user, commonInterestsUsers) {
  let result = 'You are matched with the following users: \n'
  console.log(commonInterestsUsers)
  const userInterest = getUserInterestList(user)
  commonInterestsUsers.forEach((element, i) => {
    const userInterest = getUserInterestList(user)
    const elementInterest = getUserInterestList(element)
    let commonInterest = userInterest.filter((i) => elementInterest.includes(i))
    result =
      result +
      `${i + 1}. ${element.name}, common interests: ${commonInterest}\n`
  })
  return result
}

// EFFECTS: get a list of users that has 3 or more common interests and within 500 m radius
function getCommonInterestsUserList(user, otherUsers) {
  let result = []

  const userInterest = getUserInterestList(user)

  otherUsers.forEach((element) => {
    const elementInterest = getUserInterestList(element)

    let commonInterest = userInterest.filter((i) => elementInterest.includes(i))
    if (commonInterest.length < 3) {
      return
    }

    if (calcCrow(user.lat, user.lon, element.lat, element.lon) > 0.5) {
      return
    }
    result.push(element)
  })
  return result
}

//EFFECTS: takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371 // km
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180
}

function getUserInterestList(user) {
  let interests = []
  if (user.interests.sports) interests.push('sports')
  if (user.interests.reading) interests.push('reading')
  if (user.interests.music) interests.push('music')
  if (user.interests.gaming) interests.push('gaming')
  if (user.interests.movie) interests.push('movie')
  if (user.interests.academics) interests.push('academics')
  if (user.interests.gardening) interests.push('gardening')
  return interests
}

module.exports = {
  signUp,
  login,
  getUsers,
  getNearbyCommonInterestsUsers,
}
