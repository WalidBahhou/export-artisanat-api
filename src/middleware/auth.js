
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = decodeURI(req.header('Cookie')).replace('Authorization=Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, post: decoded.post, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        console.log('yo')
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate!' })
    }
}


module.exports = auth