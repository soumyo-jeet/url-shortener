const mongoose = require('mongoose')
const { Schema } = mongoose

const clickSchema =  new Schema({
    device: String,
    city: String,
    country: String,
    time: Date
})

module.exports = mongoose.model("Click", clickSchema)