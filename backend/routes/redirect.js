const url = require('../model/url')
const express = require("express")

const router = express.Router()

router.get('/:shortUrl', async(req, res) => {
    const shortUrl = req.params.shortUrl
    
    try {
        const link = await url.findOne({ shortUrl: shortUrl })
        
        const clickT = Date.now()
        link.totalClicks.push(clickT)
        await link.save()
        res.redirect(link.actualUrl)   
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router