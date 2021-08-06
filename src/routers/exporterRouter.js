const Exporter = require('../models/exporter')
const express = require('express')
const auth = require('../middleware/auth')
const authObserv = require('../middleware/authObserv')
const router = new express.Router()

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
        const exporters = await Exporter.find()
    try{

        if (exporters.length === 0) {
            return res.status(404).send({ error: 'No exporters in the database' })
        } else {
            let populated = []
        
            for (let expo of exporters) {
                populated.push(await expo.populate('directorate').execPopulate())
              }
    
            // res.send(populated)
            res.render('exporters', {
                title: 'Exporters',
                populated
            })
        }

    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/exporters/:exporterId', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'city', 'phone', 'address', 'companyName', 'status', 'category', 'product']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const exporter = await Exporter.findOne({ exporterNumber: req.params.exporterId })

        updates.forEach((update) => {
            exporter[update] = req.body[update]
        })

        await exporter.save()

        res.send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/exporters/validate/:exporterId', authObserv, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['authorized']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {
        const exporter = await Exporter.findOne({ exporterNumber: req.params.exporterId })

        updates.forEach((update) => {
            exporter[update] = req.body[update]
        })

        await exporter.save()

        res.send(exporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/exporters/:exporterId', auth, async (req, res) => {

    try {
        const exporter = await Exporter.findOneAndDelete({ exporterNumber: req.params.exporterId })
        if (!exporter) {
            return res.status(404).send()
        }
        res.send(exporter)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router