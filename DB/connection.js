const mongoose  = require('mongoose')

const connectDB = ()=>{
    return mongoose.connect(`mongodb+srv://mahmoud:1478530123@cluster0.ubgjepm.mongodb.net/Day2Must`)
}

module.exports = connectDB