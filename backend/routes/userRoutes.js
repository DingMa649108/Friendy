const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/userController')

router.route('/:id').put(updateUser).delete(deleteUser).get(getUser)
router.route('/').post(createUser).get(getUsers)

module.exports = router
