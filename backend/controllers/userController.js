


// @desc   get users
// @route  GET /api/users
// @access Private
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find()
  res.status(200).json(players)
})


// @desc   get nearby users that has three or more common interests within 500 meter radius 
// @route  GET /api/nearbyCommonInterestsUsers
// @access Private
const getNearbyCommonInterestsUsers = asyncHandler(async (req, res) => {
  // const players = await Player.find()
  // res.status(200).json(players)
})

