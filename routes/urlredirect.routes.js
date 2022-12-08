const express = require ("express");
const router = express.Router();

const Url = require ("../models/url");


router.get("/:code", async (request, response) => {
    try{
        const url = await Url.findOne({ urlCode: request.params.code });

        if (url) {
            url.clicks++;
            await url.save();
            return response.redirect(url.longUrl);
        } else {
            return response.status(404).json ("No url found");
        }
    } catch (err) {
        console.log(err);
        response.status(500).json("Server error");
    }
})

module.exports = router;