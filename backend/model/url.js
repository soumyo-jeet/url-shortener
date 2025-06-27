const mongoose = require('mongoose')

const { Schema } = mongoose

const urlSchema = new Schema ({
    title : {
        type: String,
    },

    actualUrl : {
        type: String,
        required: true
    },

    shortUrl : {
        type: String,
        required: true,
        unique: true
    },

    qr: {
        type: String
    },

    clicks : [{
        time: Date
    }]
})




module.exports = mongoose.model("Url", urlSchema)