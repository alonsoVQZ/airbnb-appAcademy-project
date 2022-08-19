const router = require('express').Router();

const imagesRouter = require('./images-router.js');

const { validateSpot } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js')
const { Spot } = require('../../db/models');

router.post('/', validateSpot, authentication, async (req, res) => {
    // Create a Spot
    // Authe
    const spots = await Spot.createSpot(req.body);
    console.log(spots)
    res.json({ spots });
})

router.get('/', async (req, res) => {
    // Get All Spots
    const spots = await Spot.getSpots();
    res.json({ Spots: spots })
});

router.get('/:spotId', (req, res) => {
    // Get details of a spot from an id
});

router.put('/:spotId', (req, res) => {
    // Edit a Spot from an Id
    // Authe and Autho
});

router.delete('/:spotId', (req, res) => {
    // Delete a Spot from an Id
    // Authe and Autho
});

router.use('/:spotId', imagesRouter)


module.exports = router;