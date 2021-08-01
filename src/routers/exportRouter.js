const express = require('express')
const router = new express.Router()
const Export = require('../models/export')
const Exporter = require('../models/exporter')

router.post('/exports', async (req, res) => {
    const exporterInfoId = await Exporter.findOne({ exporterNumber: req.body.exporterNumber })
    let exports = new Export(req.body)

    exports.exporterInfo = exporterInfoId._id


    try{
        await exports.save(exports)
        res.status(201).send(exports)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/exports', async (req, res) => {
    try {
        const exports = await Export.find({})
       
        for (let index = 0; index < exports.length; index++) {
            await exports[index].populate(['directorate', 'exporterInfo']).execPopulate()
          }

        res.send(exports)

    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

router.get('/exports/:id', async (req, res) => {
    try{
        const exports = await Export.findById(req.params.id)
        await exports.populate('directorate').execPopulate()
        await exports.populate('exporterInfo').execPopulate()
        res.send(exports.exporterInfo)


    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})



module.exports = router