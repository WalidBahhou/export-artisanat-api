const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Directorate = require('../models/directorate')


router.post('/directorates', auth, async (req, res) => {
    const directorate = new Directorate(req.body)

    try{
        await directorate.save()
        res.status(201).send(directorate)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/directorates', auth, async (req, res) => {
    try{
        res.send(await Directorate.find({}))
    } catch (e) {
        res.status(404).send()
    }

})

module.exports = router