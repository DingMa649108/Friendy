const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Please add an ID for this user'],
      unique: [true, 'users id (email) must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password for this user'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name for this user'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number for this user'],
    },
    lat: {
      type: String,
      required: [false, 'Please add lat for this user'],
    },
    lon: {
      type: String,
      required: [false, 'Please add lon for this user'],
    },
    enableNotification: {
      type: Boolean,
      required: [true, 'Please add enableNotification for this user'],
    },
    interests: {
      type: {
        sports: {
          type: Boolean,
          required: [true, 'Please add sports for this user'],
        },
        reading: {
          type: Boolean,
          required: [true, 'Please add reading for this user'],
        },
        music: {
          type: Boolean,
          required: [true, 'Please add music for this user'],
        },
        gaming: {
          type: Boolean,
          required: [true, 'Please add gaming for this user'],
        },
        movie: {
          type: Boolean,
          required: [true, 'Please add movie for this user'],
        },
        academics: {
          type: Boolean,
          required: [true, 'Please add academics for this user'],
        },
        gardening: {
          type: Boolean,
          required: [true, 'Please add gardening for this user'],
        },
      },
      required: [true, 'Please add interests for this user'],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)
