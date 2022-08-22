const router = require('express').Router();

const imagesRouter = require('./images-router.js');

const { validateSpot } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js')
const { Spot } = require('../../db/models');

router.post('/', authentication, async (req, res) => {
    // Create a Spot
    // Authe
    const spot = await Spot.createSpot(req.body);
    res.json(spot);
})

router.get('/', async (req, res) => {
    // Get All Spots
    const spots = await Spot.getSpots();
    res.json({ Spots: spots })
});

router.get('/:spotId', async (req, res, next) => {
    // Get details of a spot from an id
    try {
        const { spotId } = req.params;
        const spot = await Spot.getSpotDetails(spotId);
        if(!spot) throw new Error("Spot couldn't be found");
        res.json(spot)
    } catch(e) {
        e.status = 404;
        next(e)
    }
});

router.put('/:spotId', (req, res) => {
    // Edit a Spot from an Id
    // Authe and Autho

});

router.delete('/:spotId', (req, res) => {
    // Delete a Spot from an Id
    // Authe and Autho
});

module.exports = router;