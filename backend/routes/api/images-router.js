const router = require('express').Router();

const { Image } = require('../../db/models');

const { validateImage } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js')

router.post('/images', validateImage, authentication, authorization, async (req, res) => {
    if(req.originalUrl.includes('spots')) {
        const { spotId } = res.locals;
        const { url } = req.body;
        const image = await Image.createSpotImage(spotId, url)
        res.json(image)
    }
    if(req.originalUrl.includes('reviews')) {
        const { reviewId } = res.locals;
        const { url } = req.body;
        const image = await Image.createReviewImage(reviewId, url)
        res.json(image)
    }
});

module.exports = router;