const mongoose = require('mongoose')
const Exporter = require('./exporter')

const exportSchema = new mongoose.Schema({
    directorate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Directorate',
        required: true
    },
    inspectorNumber: {
        type: String,
        required: true
    },
    inspectionCertificatNumber: {
        type: String,
        required: true
    },
    exitPoint: {
        type: String,
        required: true
    },
    transportMethod: {
        type: String,
        required: true
    },
    exporterNumber: {
        type: String,
        required: true  
    },
    exporterInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exporter'
    },
    cityOrigin: {
        type: String,
        required: true  
    },
    importerName: {
        type: String,
        required: true  
    },
    importerStatus: {
        type: String,
        required: true  
    },
    importerAddress: {
        type: String,
        required: true  
    },
    importerCountry: {
        type: String,
        required: true  
    },
    productFamily: {
        type: String,
        required: true  
    },
    productDescription: {
        type: String
    },
    unitsNumber: {
        type: String,
        required: true  
    },
    weight: {
        type: String,
        required: true
    },
    surface: {
        type: String
    },
    value: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Export = mongoose.model('Export', exportSchema)

module.exports = Export