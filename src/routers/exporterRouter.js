const Exporter = require('../models/exporter')
const express = require('express')
const router = new express.Router()

router.post('/exporters', async (req, res) => {
    const exporter = new Exporter(req.body)

    try{
        await exporter.save()
        res.status(201).send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/exporters', async (req, res) => {
    try{
        const exporters = await Exporter.find({})
        let populated = []
    
        for (let expo of exporters) {
            populated.push(await expo.populate('directorate').execPopulate())
          }
    
        res.send(populated)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/exporters/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'city', 'phone', 'address', 'companyName', 'status', 'category', 'product', 'authorized']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const exporter = await Exporter.findById(req.params.id)

        updates.forEach((update) => {
            exporter[update] = req.body[update]
            console.log(exporter[update])
            console.log(req.body[update])
        })

        await exporter.save()

        res.send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router