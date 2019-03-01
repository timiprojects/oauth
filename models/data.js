const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', UserSchema)

module.exports = User