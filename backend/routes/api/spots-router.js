const router = require('express').Router();


const { validateSpot } = require('../../utils/validation.js');
const { authentication } = require('../../utils/auth.js')
const { Spot } = require('../../db/models');

router.post('/', validateSpot, authentication, async (req, res) => {
    console.log(req.body)
    const spot = await Spot.createSpot(req.body);
    res.json(spot)
})

router.get('/', (req, res) => {
    // Returns all the spots.
})



module.exports = router;