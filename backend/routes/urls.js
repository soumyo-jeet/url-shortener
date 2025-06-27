const mongoose = require("mongoose")
const express = require("express")
const url = require("../model/url")
const qrcode = require("qrcode")

const router = express.Router()

router.post('/', async (req, res) => {
    const { title, actualUrl } = await req.body
    try {
        // generating shortId
        const shortId = Math.random().toString(36).substring(2, 10)

        const shortUrl = process.env.BACKEND_ENDPOINT + shortId
        const opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.3,
            margin: 1,
            color: {
                dark: "#010599FF",
                light: "#FFBF60FF"
            }
        }

        // generating qr
         const src = await new Promise((resolve, reject) => {
            qrcode.toDataURL(shortUrl, opts, (err, url) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    res.status(400).send("Qr code bad request.")
                } else {
                    resolve(url);
                }
            });
        });

        
        const newUrl = new url({
            title: title,
            actualUrl: actualUrl,
            shortUrl: shortId,
            qr: src
        })

        await newUrl.save();
        res.status(200).json({ flag: "Successfully created"})
    } catch (error) {
        res.status(500).send("Create shortUrl error")
    }
})


router.post('/savedUrl', async (req, res) => {
    const { link } = await req.body
    if (!link) res.status(400).send("Bad request")
    try {
        const savedUrl = await url.findOne({ actualUrl: link }).populate("clicks")
        if (!savedUrl) res.status(404).json("Not Found")
        res.status(200).json(savedUrl)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})





module.exports = router