const router = require('express').Router();

const imagesRouter = require('./images-router.js');
const reviewsRouter = require('./reviews-router.js');

const { validateSpot } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');
const { Spot } = require('../../db/models');

router.post('/', validateSpot, authentication, async (req, res) => {
    // Create a Spot
    // Authe and Validation
    const { currentUserId } = res.locals;
    const spot = await Spot.createSpot(currentUserId, req.body);
    res.json(spot);
})

router.get('/', async (req, res) => {
    // Get All Spots
    const spots = await Spot.getSpots();
    res.json({ Spots: spots })
});

router.get('/:spotId', goodSpot, async (req, res) => {
    // Get details of a spot from an id
    const { spotId } = res.locals;
    const spot = await Spot.getSpotDetails(spotId);
    res.json(spot);
});

router.put('/:spotId', goodSpot, validateSpot, authentication, authorization, async (req, res) => {
    // Edit a Spot from an Id
    // Authe, Autho and Validation
    const { spotId } = res.locals;
    const spot = await Spot.editSpot(spotId, req.body);
    res.json(spot);
});

router.delete('/:spotId', goodSpot, authentication, authorization, async (req, res) => {
    // Delete a Spot from an Id
    // Authe and Autho
    const { spotId } = res.locals;
    const spot = await Spot.deleteSpot(spotId);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

router.use('/:spotId', goodSpot, imagesRouter);

router.use('/:spotId', goodSpot, reviewsRouter)

async function goodSpot(req, res, next) {
    // Look for the resoruce exists and send the Owner to locals
    try {
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);
        if(!spot) throw new Error ("Spot couldn't be found");
        res.locals.spotId = spot.id;
        res.locals.resourceUserId = spot.ownerId;
        next();
    } catch(e) {
        e.status = 404;
        next(e);
    }
}

module.exports = router;