const mongoose = require('mongoose')
const validator = require('validator')

const exporterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        minLength: 10,
        maxLenght: 10
    },
    tradeRegister : {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    }, 
    directorate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Directorate',
        required: true
    },
    taxRegistration: {
        type: String,
        required: true
    },
    exporterNumber: {
        type: String,
        required: true,
        unique: true
    }, 
    status: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    product: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date
    },    
    authorized: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})


const Exporter = mongoose.model('Exporter', exporterSchema)

module.exports = Exporter