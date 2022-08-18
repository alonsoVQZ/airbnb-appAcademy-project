const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtConfig } = require('../../config');
const { authentication } = require('../../utils/auth.js');
const { Spot } = require('../../db/models');

const { secret } = jwtConfig;

router.use(authentication);

router.get('/', (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, secret).data;
    res.json( payload );
});

router.get('/spots', async (req, res) => {
    // Get all spots by the current user
    // Authe
    const { currentUserId } = req.body;
    const spots = await Spot.getSpots(currentUserId);
    res.json({ spots })
});

module.exports = router;