const mongoose = require('mongoose')

const { Schema } = mongoose

const urlSchema = new Schema ({
    title : {
        type: String,
        required: true
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

    totalClicks : [{
        type: Date,
        required: true
    }]
})




module.exports = mongoose.model("Url", urlSchema)