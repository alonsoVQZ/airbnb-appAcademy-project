const router = require('express').Router();

const { Review } = require('../../db/models');

const { validateImage } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');

router.get('/reviews', async (req, res) => {
    // Get all Reviews by a Spot's id
    const { spotId } = res.locals;
    const reviews = await Review.getSpotReviews(spotId);
    res.json(reviews)
});

module.exports = router;