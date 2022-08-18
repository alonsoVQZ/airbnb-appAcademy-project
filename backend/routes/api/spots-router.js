const router = require('express').Router();

const imagesRouter = require('./images-router.js');

const { validateSpot } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js')
const { Spot } = require('../../db/models');

router.post('/', validateSpot, authentication, async (req, res) => {
    // Create a Spot
    // Authe
    const spot = await Spot.createSpot(req.body);
    console.log(spot)
    res.json(spot);
})

router.get('/', (req, res) => {
    // Get All Spots
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