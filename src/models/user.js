const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
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
    post: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to log in')
    }
    return user
}



const User = mongoose.model('User', userSchema)

module.exports = User