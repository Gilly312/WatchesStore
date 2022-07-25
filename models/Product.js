const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    picture1: {
        type: String,
        require: true
    },
    picture2: {
        type: String,
        require: true
    },
    picture3: {
        type: String,
        require: true
    },
    kind: {
        type: String,
        require: true
    }
})
ProductSchema.plugin(findOrCreate)
module.exports = mongoose.model('Product', ProductSchema)