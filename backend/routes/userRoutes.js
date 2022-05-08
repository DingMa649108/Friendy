const express = require('express')
const router = express.Router()
const { signUp, login, getUsers } = require('../controllers/userController')

router.route('/:id').put(signUp)
router.route('/:id/:userLoginStatus').get(login)
router.route('/').get(getUsers)

module.exports = router
