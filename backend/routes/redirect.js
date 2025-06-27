const url = require('../model/url')
const express = require("express")

const router = express.Router()


router.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl

    try {
        const link = await url.findOne({ shortUrl: shortUrl })
        if(!link) return res.status(404).send("Url not found.")

        link.clicks.push({ time: Date.now() })
        await link.save()
        res.redirect(link.actualUrl)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router