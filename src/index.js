const path = require('path')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const exporterRouter = require('./routers/exporterRouter')
const directorateRouter = require('./routers/directorateRouter')
const exportRouter = require('./routers/exportRouter')
const hbsRouter = require('./routers/hbsRouter')
const hbs = require('hbs')
const cookieP = require('cookie-parser')

const port = process.env.PORT || 3000

const app = express()

// Cookie Parser
app.use(cookieP())

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebares engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Accessing form data from request variable in the routes
app.use(express.urlencoded({ extended: false }))

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.use(express.json())
app.use(userRouter)
app.use(exporterRouter)
app.use(directorateRouter)
app.use(exportRouter)
app.use(hbsRouter)


app.listen(port, () => console.log('Server is up on port', port))
