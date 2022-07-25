const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const Cart = require('../models/Cart')

router.get('/', (req, res) => {
    if (!req.session.cart) {
        Product.find()
        .then(data => {
            return res.render('products',{product: data, cart: 0, totalPrice: 0  })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find()
        .then(data => {
            return res.render('products',{product: data, cart: cart.totalItems, totalPrice: cart.totalPrice  })
        })
    }
})

router.get('/male', (req, res) => {
    if (!req.session.cart) {
        Product.find({sex: 'male'})
        .then(data => {
            Product.find().then(product => { 
            return res.render('products',{product: data, products: product, cart: 0, totalPrice: 0})
            })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find({sex: 'male'})
        .then(data => {
            Product.find().then(product => { 
            return res.render('products',{product: data, products: product, cart: cart.totalItems, totalPrice: cart.totalPrice})
            })
        })
    }
})
router.get('/female', (req, res) => {
    if (!req.session.cart) {
        Product.find({sex: 'female'})
        .then(data => {
            Product.find().then(product => { 
            return res.render('products',{product: data, products: product, cart: 0, totalPrice: 0})
            })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find({sex: 'female'})
        .then(data => {
            Product.find().then(product => { 
            return res.render('products',{product: data, products: product, cart: cart.totalItems, totalPrice: cart.totalPrice})
            })
        })
    }
})
router.get('/:id', (req, res) => {
    let id = req.params.id
    
    if (!req.session.cart) {
        Product.findById({_id: id})
        .then(data => {
            Product.find().then(product => { 
            return res.render('single',{product: data, products: product, cart: 0, totalPrice: 0})
            })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.findById({_id: id})
        .then(data => {
            Product.find().then(product => { 
            return res.render('single',{product: data, products: product, cart: cart.totalItems, totalPrice: cart.totalPrice})
            })
        })
    }
})

router.get('/brand/:brand', (req, res) => {
    let brand = req.params.brand
    
    if (!req.session.cart) {
        Product.find({brand: brand})
        .then(data => {
            console.log(data)
            Product.find().then(product => { 
            return res.render('products',{product: data, products: product, cart: 0, totalPrice: 0})
            })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find({brand: brand})
        .then(data => {
            console.log(data)
            Product.find().then(product => { 
            return res.render('products',{product: data, products: product, cart: cart.totalItems, totalPrice: cart.totalPrice})
            })
        })
    }
})
router.get('/filter/:sex/:kind', (req, res) => {
    let sex = req.params.sex
    let kind = req.params.kind
    if (!req.session.cart) {
        Product.find({sex: sex},{ kind: kind})
        .then(data => {
            console.log(data)
            console.log('======================')
            Product.find().then(product => {
            return res.render('products',{product: data, products: product, cart: 0, totalPrice: 0})
            })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find({sex: sex, kind: kind})
        .then(data => {
            console.log(data)
            console.log('======================')
            Product.find().then(product => {
            return res.render('products',{product: data, products: product, cart: cart.totalItems, totalPrice: cart.totalPrice})
            })
        })
    }
})
module.exports = router
