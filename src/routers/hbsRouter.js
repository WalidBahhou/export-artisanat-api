const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()


router.get('/', (req, res) => {
    res.render('index', {
        title: 'Login'
    })
})

router.get('/home', auth,(req, res) => {
        res.render('home', {
        title: 'Home'
    })
})


module.exports = router