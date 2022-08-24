const router = require('express').Router();
const spotIdRouter = require('express').Router();

const { Spot } = require('../../db/models');
const { validateSpot } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');
const { goodSpot } = require('../../utils/resources-check.js');
const imagesRouter = require('./images-router.js');
const { spotReviewsRouter } = require('./reviews-router.js');
const bookingsRouter = require('./bookings-router.js');

// Get All Spots
router.get('/', async (req, res) => {
    const spots = await Spot.getSpots();
    res.json({ Spots: spots })
});

// Create a Spot
// Authe and Validation
router.post('/', validateSpot, authentication, async (req, res) => {
    const { currentUserId } = res.locals;
    const spot = await Spot.createSpot(currentUserId, req.body);
    res.json(spot);
});

router.use('/:spotId', goodSpot, spotIdRouter);

/*******************
*** spotIdRouter ***
*******************/

// Get details of a spot from an id
spotIdRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const spot = await Spot.getSpotDetails(spotId);
    res.json(spot);
});

// Edit a Spot from an Id
// Authe, Autho and Validation
spotIdRouter.put('/', validateSpot, authentication, authorization, async (req, res) => {
    const { spotId } = res.locals;
    const spot = await Spot.editSpot(spotId, req.body);
    res.json(spot);
});

// Delete a Spot from an Id
// Authe and Autho
spotIdRouter.delete('/', authentication, authorization, async (req, res) => {
    const { spotId } = res.locals;
    await Spot.deleteSpot(spotId);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

// spotIdRouter.use(imagesRouter);

// spotIdRouter.use(spotReviewsRouter);

// spotIdRouter.use(bookingsRouter);

module.exports = router;