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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Click'
    }]
})




module.exports = mongoose.model("Url", urlSchema)