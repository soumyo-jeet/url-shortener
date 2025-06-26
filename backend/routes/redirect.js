const click = require('../model/click')
const url = require('../model/url')
const express = require("express")
const parse = require('ua-parser')

const router = express.Router()

router.get('/:shortUrl', async(req, res) => {
    const shortUrl = req.params.shortUrl
    
    try {
        const link = await url.findOne({ shortUrl: shortUrl })
        if(!link) res.status(404).send("Url not found.")
            
        const devices = await parse.parseDevice().toString()
        const device = ( devices === "Other" ) ? "Desktop" : devices
        
        const response = await fetch("https://ipapi.co/json")
        const { city, country_name } = await response.json()

        const clickdtls = new click ({
            device: device,
            city: city,
            country: country_name,
            time: Date.now()
        })

        await clickdtls.save()
        const clickId = clickdtls._id

        link.clicks.push(clickId)
        await link.save()
        res.redirect(link.actualUrl)   
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router