const mongoose = require("mongoose")
const express = require("express")
const url = require("../model/url")

const router = express.Router()

router.post('/', async (req, res) => {
    const { title, actualUrl } = await req.body
    try {
        const shortUrl = Math.random().toString(36).substring(2,10)
       const newUrl = new url({
        title: title,
        actualUrl: actualUrl,
        shortUrl: shortUrl,
       }) 

       await newUrl.save();
       res.status(200).send("Successfully created")
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/allUrls', async (req, res) => {
    try {
        const allUrls = await url.find({})
        res.status(200).json(allUrls)

    } catch (error) {
        res.status(500).send(error)
    }
})





module.exports = router