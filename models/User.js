const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: { 
        type: String,
        require: true
    }
})
UserSchema.plugin(findOrCreate)
module.exports = mongoose.model('User', UserSchema)