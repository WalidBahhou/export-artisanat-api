const mongoose = require('mongoose')

const directorateSchema = new mongoose.Schema({
    city: {
        type: String,
        require: true,
        unique: true
    }
}, {
    timestamps: true
})

const Directorate = new mongoose.model('Directorate', directorateSchema)

module.exports = Directorate