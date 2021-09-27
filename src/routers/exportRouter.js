const express = require('express')
const router = new express.Router()
const Export = require('../models/export')
const Exporter = require('../models/exporter')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')

router.post('/exports', auth, async (req, res) => {
    const exporter = await Exporter.findOne({ exporterNumber: req.body.exporterNumber })
    
    let exports = new Export(req.body)

    exports.exporterInfo = exporter._id

    try{
        await exports.save(exports)
        res.status(201).send(exports)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/exports', auth, async (req, res) => {
    try {
        let exports = await Export.find({})
        
        for (let index = 0; index < exports.length; index++) {
            await exports[index].populate(['directorate', 'exporterInfo']).execPopulate()
          }
          
        res.send(exports)
        // res.render('exports', {
        //     title: 'Exports',
        //     exports: exports[0]
        // })

    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/exports/:id', auth, async (req, res) => {

    if (mongoose.Types.ObjectId.isValid(req.params.id) == false) {
        return res.status(400).send()
    }
    try{
        const exports = await Export.findById(req.params.id)
        await exports.populate('directorate').execPopulate()
        await exports.populate('exporterInfo').execPopulate()
        res.send(exports)


    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

router.get('/exports/exporters/:exporterId', auth, async (req, res) => {

    try{
        const exports = await Export.find({ exporterNumber: req.params.exporterId })

        if (exports.length === 0) {
            return res.status(404).send('No export operation for this exporter')
        } else {
            for (let index = 0; index < exports.length; index++) {
                await exports[index].populate(['directorate', 'exporterInfo']).execPopulate()
              }
            res.send(exports)
        }

    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports = router