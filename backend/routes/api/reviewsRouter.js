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
reviewByIdRouter.put('/', validateReview, authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const review = await Review.editReview(reviewId, req.body);
    res.json(review);
});

// Delete a Review
reviewByIdRouter.delete('/', authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    await Review.deleteReview(reviewId);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });
});

// Middleware to reviewImageRouter
reviewByIdRouter.use('/images', reviewImagesRouter);

/*** spotReviewsRouter ***/

// Get all Reviews by a Spot's id
spotReviewsRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const spotReviews = await Review.getSpotReviews(spotId);
    res.json({ Reviews: spotReviews })
});

//Create a Review for a Spot based on the Spot's id
spotReviewsRouter.post('/', validateReview, authentication, async (req, res) => {
    const { spotId, currentUserId } = res.locals;
    const spotReview = await Review.createReview(spotId, currentUserId, req.body);
    res.status(201).json(spotReview)
});

/*** accountReviewsRouter ***/

// Get all Reviews of the Current User
accountReviewsRouter.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    const reviews = await Review.getCurrentUserReviews(currentUserId);
    res.json({ Reviews: reviews });
});


module.exports = { reviewsRouter, spotReviewsRouter, accountReviewsRouter };