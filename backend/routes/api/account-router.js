const router = require('express').Router();

const { authentication } = require('../../utils/auth.js');
const { Spot, User, Review, Booking } = require('../../db/models');

router.use(authentication);

router.get('/', async (req, res) => {
    // Get the Current User Information
    const { currentUserId } = res.locals;
    const user = await User.findByPk(currentUserId);
    res.json( user );
});

router.get('/spots', async (req, res) => {
    // Get all Spots owned by the Current User
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

// Get all of the Current User's Bookings
// Authe
router.get('/bookings', async (req, res) => {
    
    const { currentUserId } = res.locals;
    const bookings = await Booking.getCurrentUserBookings(currentUserId);
    res.json({ Bookings: bookings })
});

module.exports = router;