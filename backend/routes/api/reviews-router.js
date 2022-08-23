const router = require('express').Router();

const { Review } = require('../../db/models');

const imagesRouter = require('./images-router.js');

const { validateReview } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');

router.post('/reviews', validateReview, authentication, async (req, res) => {
    // Create a Review for a Spot based on the Spot's id
    // Authe and Validation
    const { spotId, currentUserId } = res.locals;
    const review = await Review.createReview(spotId, currentUserId, req.body);
    res.json(review);
});

router.get('/reviews', async (req, res) => {
    // Get all Reviews by a Spot's id
    const { spotId } = res.locals;
    const reviews = await Review.getSpotReviews(spotId);
    res.json(reviews);
});

router.put('/:reviewId', validateReview, goodReview, authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const reviews = await Review.editReview(reviewId);
    res.json(reviews);
});

router.delete('/:reviewId', goodReview, authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const reviews = await Review.deleteReview(reviewId);
    res.json(reviews);
});

router.use('/:reviewId', goodReview, imagesRouter);

async function goodReview(req, res, next) {
    // Look for the resoruce exists and send the Owner to locals
    try {
        const { reviewId } = req.params;
        const review = await Review.findByPk(reviewId);
        if(!review) throw new Error ("Review couldn't be found");
        res.locals.reviewId = review.id;
        res.locals.resourceUserId = review.userId;
        next();
    } catch(e) {
        e.status = 404;
        next(e);
    }
}
module.exports = router;