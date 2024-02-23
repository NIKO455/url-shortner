const URL = require('../models/Url');
const validUrl = require('valid-url');

async function Index(req, res) {
    const allURLs = await URL.find({})
    res.render('home', {
        urls: allURLs
    })
}

async function Store(req, res) {
    const body = req.body;
    if (!body || !body.url || body.url === '') {
        res.status(400).send({error: 'URL is required'});
    } else {
        try {
            if (validUrl.isUri(body.url)) {
                const shortID = "niko/" + Math.random().toString(36).substring(2, 8);
                await URL.create({
                    shortID: shortID,
                    redirectURL: body.url,
                    visitHistory: []
                })

                return res.redirect('/');

                // return res.status(201).json({
                //     status: 201,
                //     message: "Created short url successfully!",
                //     data: {shortID: shortID, redirectUR: body.url}
                // })
            } else {
                res.status(400).send({error: ' Invalid URL'});
            }
        } catch (error) {
            res.status(400).send({error: 'Invalid URL'});
        }
    }
}

async function Redirect(req, res) {
    const shortID = "niko/" + req.params.shortID;
    try {
        const url = await URL.findOne({shortID: shortID});
        if (url) {
            await URL.findOneAndUpdate(
                {shortID},
                {$push: {visitHistory: {timestamp: Date.now()}}}
            );
            res.redirect(url.redirectURL)
        } else {
            res.status(404).send({error: 'URL not found'});
        }
    } catch (error) {
        res.status(500).send({error: 'Server error'});
    }
}

async function Delete(req, res) {
    const id = req.params.id;
    try {
        const response = await URL.findByIdAndDelete(id);
        if (response) {
            return res.redirect('/')
        } else {
            res.status(404).send({error: 'Id not found'});
        }

    } catch (error) {
        res.status(500).send({error: "Server error"})
    }
}


module.exports = {Index, Store, Redirect, Delete}