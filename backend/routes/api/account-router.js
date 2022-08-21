const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtConfig } = require('../../config');
const { authentication } = require('../../utils/auth.js');
const { Spot } = require('../../db/models');

const { secret } = jwtConfig;

router.use(authentication);

router.get('/', (req, res) => {
    const { currentUserData } = req.body;
    res.json( currentUserData );
});

router.get('/spots', async (req, res) => {
    // Get all spots by the current user
    // Authe
    const { id } = req.body.currentUserData;
    const spots = await Spot.getSpots(id);
    res.json({ Spots: spots })
});

module.exports = router;