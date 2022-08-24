const spotsRouter = require('express').Router();
const spotByIdRouter = require('express').Router();
const accountSpotsRouter = require('express').Router();

const { Spot } = require('../../db/models');
const { authentication, authorization } = require('../../utils/auth.js')
const { validateSpot } = require('../../utils/validation.js');
const { goodSpot } = require('../../utils/resources-check.js');
const { spotImagesRouter } = require('./imagesRouter.js');

/***********************/
/*** userSpotsRouter ***/
/***********************/

// Get all Spots
spotsRouter.get('/', async (req, res) => {
    const spots = await Spot.getSpots();
    res.json({ Spots: spots })
});

// Create a Spot
spotsRouter.post('/', validateSpot, authentication, async (req, res) => {
    const { currentUserId } = res.locals;
    const spotForm = req.body;
    const spot = await Spot.createSpot(currentUserId, spotForm);
    res.json(spot)
});

// middleware to spotByIdRouter
spotsRouter.use('/:spotId', goodSpot, spotByIdRouter);

/**********************/
/*** spotByIdRouter ***/
/**********************/

// Get details of a Spot from an id
spotByIdRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const spot = await Spot.getSpotDetails(spotId);
    res.json(spot);
});

// Edit a Spot
spotByIdRouter.put('/', validateSpot, authentication, authorization, async (req, res) => {
    const spotForm = req.body;
    const { spotId } = res.locals;
    const spot = await Spot.editSpot(spotId, spotForm);
    res.json(spot);
});

// Delete a Spot
spotByIdRouter.delete('/', authentication, authorization, async (req, res) => {
    const { spotId } = res.locals;
    await Spot.deleteSpot(spotId);
    res.json({})
});

// Middleware to spotReviewsRouter
spotByIdRouter.use('/reviews', spotImagesRouter);

// Middleware to spotBookingsRouter
// spotByIdRouter.use('/bookings', spotBookingsRouter);

// Middleware to spotImagesRouter
spotByIdRouter.use('/images', spotImagesRouter);

/***********************/
/*** userSpotsRouter ***/
/***********************/

// Get all Spots owned by the Current User
accountSpotsRouter.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    const spots = await Spot.getCurrentUserSpots(currentUserId);
    res.json({ Spots: spots })
});

module.exports = { spotsRouter, accountSpotsRouter }