const router = require('express').Router();
const reviewIdRouter = require('express').Router();
const reviewSpotRouter = require('express').Router();

const { Review } = require('../../db/models');
const { validateReview } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');
const { goodReview } = require('../../utils/resources-check.js');
const imagesRouter = require('./images-router.js');


// router middleware to reviewSpotRouter
router.use('/reviews', (req, res, next) => {
    const path = `/api/spots/${res.locals.spotId}/reviews`;
    if(path !== req.originalUrl.toString()) throw new Error('Que chingaos');
    next();
}, reviewSpotRouter);

// router middleware to reviewIdRouter
router.use('/:reviewId', (req, res, next) => {
    const path = `/api/reviews/${req.params.reviewId}`;
    if(path !== req.originalUrl.toString()) throw new Error('Que chingaos');
    next();
}, goodReview, reviewIdRouter);

/***********************
*** reviewSpotRouter ***
***********************/

// Create a Review for a Spot based on the Spot's id
// Authe and Validation
reviewSpotRouter.post('/', validateReview, authentication, async (req, res) => {
    const { spotId, currentUserId } = res.locals;
    const review = await Review.createReview(spotId, currentUserId, req.body);
    res.json(review);
});

// Get all Reviews by a Spot's id
reviewSpotRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const reviews = await Review.getSpotReviews(spotId);
    res.json(reviews);
});

/*********************
*** reviewIdRouter ***
*********************/

// Edit a Review
// Authe, Autho and Validation
reviewIdRouter.put('/', validateReview, authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const reviews = await Review.editReview(reviewId);
    res.json(reviews);
});

// Delete a Review
// Authe and Autho
reviewIdRouter.delete('/', authentication, authorization, async (req, res) => {
    console.log(req.originalUrl)
    const { reviewId } = res.locals;
    const reviews = await Review.deleteReview(reviewId);
    res.json(reviews);
});

// reviewIdRouter Middleware to imagesRouter
reviewIdRouter.use(imagesRouter);

module.exports = router;