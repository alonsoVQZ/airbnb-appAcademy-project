const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtConfig } = require('../../config');
const { authentication } = require('../../utils/auth.js');
const { Spot, User, Review } = require('../../db/models');

const { secret } = jwtConfig;

router.use(authentication);

router.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    const user = await User.findByPk(currentUserId);
    res.json( user );
});

router.get('/spots', async (req, res) => {
    // Get all spots by the current user
    // Authe
    const { currentUserId } = res.locals;
    const spots = await Spot.getCurrentUserSpots(currentUserId);
    res.json({ Spots: spots })
});

router.get('/reviews', async (req, res) => {
    // Get all Reviews of the Current User
    // Authe
    const { currentUserId } = res.locals;
    const reviews = await Review.getCurrentUserReviews(currentUserId);
    res.json({ Reviews: reviews })
});

module.exports = router;