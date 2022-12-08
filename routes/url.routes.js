const express = require ("express");
const shortid = require("shortid");
const validUrl = require ("valid-url");
const router = express.Router();
const Url = require("../models/url");



router.post("/", async (request, response) => {
    const longUrlPassed = request.body.longUrl;
    const shortUrlPassed = request.body.shortUrl;

    const baseUrl = "http://" + request.headers.host;

    // check base url
    if (!validUrl.isUri(baseUrl)) {
        response.status(401).json("Invalid base url");
    }

    urlCode = shortid.generate();
    if (shortUrlPassed === "") {
        // create url code
    } else {
        urlCode = shortUrlPassed;
        let url = await Url.findOne({ urlCode });
        // if already exists
        if(url){
            //  then redirect to the home page
            return response,direct(baseUrl)
        }
    }

    if (validUrl.isUri(longUrlPassed)) {
        try {
            let url = await Url.findOne({ longUrl: longUrlPassed });
            const shortUrl = baseUrl + "/" + urlCode;

            url = new Url ({
                longUrl: longUrlPassed,
                shortUrl,
                urlCode
            });
            await url.save();

            return response.redirect(baseUrl);
            response.json(url);
            } catch (err) {
                console.log(err);
                response.status(500).json("server error");
            }
    }
    else {
        response.status(401).json ("Invalid long url");
    }
});

module.exports = router;