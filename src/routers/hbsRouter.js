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

router.get('/opexports', auth, (req, res) => {
    res.render('opexports', {
        title: 'Exports'
    })
})

router.get('/addexport', auth, (req, res) => {
    res.render('addexport', {
        title: 'Exports'
    })
})

module.exports = router