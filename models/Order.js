const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const OrderSchema = new mongoose.Schema({
    country: {
        type: String,
        require: true
    },
    customer: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    code: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        type: Object,
        require: true
    }
})
OrderSchema.plugin(findOrCreate)
module.exports = mongoose.model('Order', OrderSchema)