const reviewsRouter = require('express').Router();
const spotReviewsRouter = require('express').Router();

const { Review } = require('../../db/models');
const { validateReview } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');
const { goodReview } = require('../../utils/resources-check.js');
const imagesRouter = require('./images-router.js');

/************************
*** spotReviewsRouter ***
************************/

// spotReviewsRouter.use('/reviews')

// Create a Review for a Spot based on the Spot's id
// Authe and Validation
// spotReviewsRouter.post('/', validateReview, authentication, async (req, res) => {
//     const { spotId, currentUserId } = res.locals;
//     const review = await Review.createReview(spotId, currentUserId, req.body);
//     res.json(review);
// });

// Get all Reviews by a Spot's id
spotReviewsRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const reviews = await Review.getSpotReviews(spotId);
    res.json(reviews);
});

/********************
*** reviewsRouter ***
********************/

// reviewsRouter.use('/:reviewId', goodReview)

// Edit a Review
// Authe, Autho and Validation
reviewsRouter.put('/', validateReview, authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const reviews = await Review.editReview(reviewId);
    res.json(reviews);
});

// Delete a Review
// Authe and Autho
reviewsRouter.delete('/', authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const reviews = await Review.deleteReview(reviewId);
    res.json(reviews);
});

// reviewIdRouter Middleware to imagesRouter
// reviewsRouter.use(imagesRouter);

module.exports = { reviewsRouter, spotReviewsRouter }