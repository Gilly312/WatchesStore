const express = require('express')
const router = express.Router()
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')


const User = require('../models/User')

const loginValidator = require('./validators/loginValidator')
const registerValidator = require('./validators/registerValidator')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

router.get('/', (req, res) => {
    if (!req.session.cart) {
        Product.find()
        .then(data => {
            return res.render('account',{product: data, cart: 0, totalPrice: 0  })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find()
        .then(data => {
            return res.render('account',{product: data, cart: cart.totalItems, totalPrice: cart.totalPrice  })
        })
    }
})
router.get('/register', (req, res) => {
    if (!req.session.cart) {
        Product.find()
        .then(data => {
            return res.render('register',{product: data, cart: 0, totalPrice: 0  })
        })
    } else {
        let cart = new Cart(req.session.cart);
        Product.find()
        .then(data => {
            return res.render('register',{product: data, cart: cart.totalItems, totalPrice: cart.totalPrice  })
        })
    }
})
router.get('/logout', (req, res) => {
    console.log('logged out')
    req.session.destroy
    return res.redirect('/account')
})
router.post('/', loginValidator, (req, res) => {
    let result = validationResult(req)
    let errors = []
    //console.log(result)
    if(result.errors.length === 0) {
        let {email, password} = req.body
        let user = undefined
        let role = undefined

        User.findOne({email: email})
        .then(u => {
            if(!u) {
                errors.push({ msg: 'Email not found'})
            }
            role = u.role
            user = u
            //console.log(user._id)
            return bcrypt.compare(password, u.password)
        })
        .then(passwordMatch => {
            if(!passwordMatch) {
                //return res.status(401).json({code: 3, message: })
                errors.push({ msg: 'Mật khẩu không đúng'})
                return res.render('login',{errors: errors})
            }
            req.session._id = user._id
            req.session.role = user.role
            req.session.name = user.name
            res.redirect('/dashboard')
        })
        .catch(e => {
            //return res.status(401).json({code: 2, message: 'Login thất bại' + e.message})
            return res.render('account',{errors: 'Login thất bại' + e.message})
        })
    }else {
        let messages = result.mapped()
        let message = ''
        for(m in messages) {
            message = messages[m].msg
            break
        }
        errors.push({ msg: message})
        //console.log(errors)
        return res.render('account',{errors: errors})
        //return res.json({code: 1, message: message})
    }
})
router.post('/register', registerValidator, (req, res) => {
    let result = validationResult(req)
    let errors = []
    let {email, password, name, number, address } = req.body
    if (result.errors.length === 0) {
        User.findOne({email: email})
        .then(acc => {
            if (acc) {
                errors.push({msg: 'Email Existed'})
                // return res.render('register',{errors: errors, name: name, email: email, password: password})
                return res.send('email fail')
            }
        })
        .then(() => bcrypt.hash(password, 10))
        .then(hashed => {

            let user = new User({
                email: email,
                password: hashed,
                name: name,
                number : number,
                address : address
            })
            req.session._id = user._id
            req.session.role = user.role
            req.session.name = user.name
            return user.save();
        })
        .then(() => {
            // không cần trả về chi tiết tài khoản nữa
            //console.log('OKEEE')
            return res.redirect('/dashboard')
        })
        .catch(e => {
            errors.push({msg: 'Đăng ký tài khoản thất bại: ' + e.message})
            // return res.render('account',{errors: errors, name: name, email: email, password: password})
            return res.send('fail')

        })
    }
    else {
        let messages = result.mapped()
        let message = ''
        for (m in messages) {
            message = messages[m].msg
            break
        }
        errors.push({msg: message})
        // res.render('account',{errors: errors, name: name, email: email, password: password})
        return res.send('fail 3')
    }
})

module.exports = router