const Exporter = require('../models/exporter')
const express = require('express')
const auth = require('../middleware/auth')
const authObserv = require('../middleware/authObserv')
const router = new express.Router()
const mongoose = require('mongoose')

router.post('/exporters', auth, async (req, res) => {
    const exporter = new Exporter(req.body)

    try{
        await exporter.save()
        res.status(201).send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/exporters', auth, async (req, res) => {
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

router.patch('/exporters/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'city', 'phone', 'address', 'companyName', 'status', 'category', 'product']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    if (mongoose.Types.ObjectId.isValid(req.params.id) == false) {
        return res.status(400).send()
    }

    try {
        const exporter = await Exporter.findById(req.params.id)

        updates.forEach((update) => {
            exporter[update] = req.body[update]
        })

        await exporter.save()

        res.send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/exporters/validate/:id', authObserv, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['authorized']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'})
    }
    
    if (mongoose.Types.ObjectId.isValid(req.params.id) == false) {
        return res.status(400).send()
    }
    try {
        const exporter = await Exporter.findById(req.params.id)

        updates.forEach((update) => {
            exporter[update] = req.body[update]
        })

        await exporter.save()

        res.send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/exporters/:id', auth, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id) == false) {
        return res.status(400).send()
    }
    try {
        const exporter = await Exporter.findByIdAndDelete(req.params.id)
        if (!exporter) {
            return res.status(404).send()
        }
        res.send(exporter)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router