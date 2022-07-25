const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const Order = require('../models/Order')

router.get('/', (req, res) => {
    if(!req.session.name) {
        return res.redirect('/account')
    }
    let profit = 0
    Order.find()
    .then(data => {
        for(i in data) {
            profit += data[i].cart.totalPrice
        }
        console.log(profit)
        return res.render('ordersmanage', {orders: data, profit: profit})
    })
})
router.post('/add', (req, res) => {
    let {brand, name, price, sex, color, description, picture1, picture2, picture3, kind } = req.body
    let prod = new Product({
        name: name,
        price: price,
        brand: brand,
        sex : sex,
        color : color,
        description: description,
        picture1: picture1,
        picture2: picture2,
        picture3: picture3,
        kind: kind
    })
    prod.save()
    console.log(prod)
    return res.redirect('/product')
})
router.get('/remove/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/account')
    }
    let id = req.params.id
    Product.findOneAndDelete({_id: id})
    .then(data => {
        console.log(data)
    })
    return res.redirect('/admin/products')
})
router.get('/products', (req, res) => {
    let total = 0
    Product.countDocuments()
    .then(data => {
        total = total + data
        console.log(total)
    })
    Product.find()
    .then (data => {
        return res.render('productsmanage',{products: data, total: total})
    })
})
router.get('/removeorder/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/account')
    }
    let id = req.params.id
    Order.findOneAndDelete({_id: id})
    .then(data => {
        console.log(data)
    })
    return res.redirect('/admin')
})
module.exports = router