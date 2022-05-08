const express = require('express')
const router = express.Router()
const {
  signUp,
  login,
  getUsers,
  getNearbyCommonInterestsUsers,
} = require('../controllers/userController')

router.route('/:id').put(signUp).get(getNearbyCommonInterestsUsers)
router.route('/:id/:userLoginStatus').get(login)
router.route('/').get(getUsers)

module.exports = router
