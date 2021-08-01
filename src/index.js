const path = require('path')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const exporterRouter = require('./routers/exporterRouter')
const directorateRouter = require('./routers/directorateRouter')
const exportRouter = require('./routers/exportRouter')

const port = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(userRouter)
app.use(exporterRouter)
app.use(directorateRouter)
app.use(exportRouter)


app.listen(port, () => console.log('Server is up on port', port))