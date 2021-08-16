const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGODB_URL , {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
mongoose.connect('mongodb://127.0.0.1:27017/export-artisanat-api' , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})