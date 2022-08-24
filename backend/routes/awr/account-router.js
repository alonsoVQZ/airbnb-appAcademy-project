const router = require('express').Router();

const { authentication } = require('../../utils/auth.js');
const { userSpotsRouter } = require('./spotsRouter.js');
const { Spot } = require('../../db/models');

router.use(authentication);

router.get('/', async (req, res) => {
    // Get the Current User Information
    const { currentUserId } = res.locals;
    const user = await User.findByPk(currentUserId);
    res.json( user );
});

router.use(userSpotsRouter);

router.get('/reviews', async (req, res) => {
    // Get all Reviews of the Current User
    // Authe
    const { currentUserId } = res.locals;
    const reviews = await Review.getCurrentUserReviews(currentUserId);
    res.json({ Reviews: reviews })
});

// Get all of the Current User's Bookings
// Authe
router.get('/bookings', async (req, res) => {
    
    const { currentUserId } = res.locals;
    const bookings = await Booking.getCurrentUserBookings(currentUserId);
    res.json({ Bookings: bookings })
});

module.exports = router;