const express = require('express');
const router = express.Router();


const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

router.get('/', (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', {
          products: null,
          totalPrice: 0
        });
      }
      var cart = new Cart(req.session.cart);
      res.render('cart', {
        products: cart.getItems(),
        totalPrice: cart.totalPrice
      });
})

router.get('/add/:id', (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {})
  Product.findById(productId).then(data => {
    cart.add(data, productId);
    req.session.cart = cart;
    res.redirect('/product')
  })
});

router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('checkout', {
      products: null
    });
  }
  if(req.session._id) {
    User.findById(req.session._id)
    .then(user => {
      var cart = new Cart(req.session.cart)
      res.render('checkout', {
        products: cart.getItems(),
        totalPrice: cart.totalPrice || 0,
        user: user
      });
    })
  }else {
    var cart = new Cart(req.session.cart)
    res.render('checkout', {
      products: cart.getItems(),
      totalPrice: cart.totalPrice || 0

    });
  }
});
router.post('/checkout', (req, res) => {
    let {country, fullname, address, city, code, phone, email} = req.body
    console.log(req.body)
    let order = new Order({
        country : country,
        customer: fullname,
        address: address,
        city: city,
        code: code,
        phone: phone,
        email: email,
        cart: new Cart(req.session.cart)
    })
    // console.log(req.session.cart)
    // console.log(new Cart(req.session.cart))
    order.save(function (err, result) {
        console.log(err)
        console.log(result)
        req.session.cart = null
        res.redirect('/dashboard')
    })
})
router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log('deleted')
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});
router.get('/placeorder', (req, res) => {
    return res.redirect('/dashboard')
})

module.exports = router;
