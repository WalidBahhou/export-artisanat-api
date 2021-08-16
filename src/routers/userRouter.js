const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users', async (req, res) => {
    
    try{
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        await user.populate('directorate').execPopulate()
        const token = await user.generateAuthToken()
        res.cookie('Authorization', `Bearer ${token}`, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000
        }).redirect('/home')
        // .send({ user, token }).
    } catch (e) {
        res.status(400).redirect('/')
    }
})

router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.clearCookie('Authorization')
        res.status(200).redirect('/')
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
})


module.exports = router