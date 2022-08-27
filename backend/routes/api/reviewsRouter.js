const reviewsRouter = require('express').Router();
const reviewByIdRouter = require('express').Router();
const spotReviewsRouter = require('express').Router();
const accountReviewsRouter = require('express').Router();

const { Review } = require('../../db/models');
const { authentication, authorization } = require('../../utils/auth.js')
const { validateReview, checkReviewId } = require('../../utils/validation.js');
const { reviewImagesRouter } = require('./imagesRouter.js')


/*** reviewsRouter ***/

// Middleware to reviewByIdRouter
reviewsRouter.use('/:reviewId', checkReviewId, reviewByIdRouter);


/*** reviewByIdRouter ***/

// Edit a Review
reviewByIdRouter.put('/', (req, res) => {

});

// Delete a Review
reviewByIdRouter.delete('/', (req, res) => {

});

// Middleware to reviewImageRouter
reviewByIdRouter.use('/images', reviewImagesRouter);

/*** spotReviewsRouter ***/

// Get all Reviews by a Spot's id
spotReviewsRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const spotReviews = await Review.getSpotReviews(spotId);
    res.json({ spotReviews })
});

//Create a Review for a Spot based on the Spot's id
spotReviewsRouter.post('/', (req, res) => {

});

/*** accountReviewsRouter ***/

// Get all Reviews of the Current User
accountReviewsRouter.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    const reviews = await Review.getCurrentUserReviews(currentUserId);
    res.json({ Reviews: reviews });
});


module.exports = { reviewsRouter, spotReviewsRouter, accountReviewsRouter };