const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const Cart = require('../models/Cart')
const User = require('../models/User')

router.get('/', (req, res) => {
    if(req.session._id) {
        User.findById({_id: req.session._id})
        .then(user => {
            if (!req.session.cart) {
                Product.find()
                .then(data => {
                    return res.render('index',{product: data, cart: 0, totalPrice: 0, user: user  })
                })
            } else {
                let cart = new Cart(req.session.cart);
                Product.find()
                .then(data => {
                    return res.render('index',{product: data, cart: cart.totalItems, totalPrice: cart.totalPrice, user: user  })
                })
            }
        })
    } else {
        if (!req.session.cart) {
            Product.find()
            .then(data => {
                return res.render('index',{product: data, cart: 0, totalPrice: 0 })
            })
        } else {
            let cart = new Cart(req.session.cart);
            Product.find()
            .then(data => {
                return res.render('index',{product: data, cart: cart.totalItems, totalPrice: cart.totalPrice })
            })
        }
    }
    
})


module.exports = router