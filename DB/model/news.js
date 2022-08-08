const mongoose = require('mongoose')
const newsSchema = new mongoose.Schema({
    title:String,
    desc:String,
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const newsModel = mongoose.model("News" , newsSchema)
module.exports = newsModel