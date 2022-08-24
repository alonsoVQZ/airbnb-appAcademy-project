const router = require('express').Router();
// const bookingIdRouter = require('express').Router();
const bookingSpotRouter = require('express').Router();

const { Booking } = require('../../db/models');
// const { validateBooking } = require('../../utils/validation.js');
const { authentication, authorization } = require('../../utils/auth.js');
const { goodBooking } = require('../../utils/resources-check.js');

// router middleware to bookingSpotRouter
router.use('/bookings', (req, res, next) => {
    const path = `/api/spots/${res.locals.spotId}/bookings`;
    if(path !== req.originalUrl.toString()) throw new Error('Que chingaos');
    next();
}, bookingSpotRouter);

// // router middleware to bookingIdRouter
// router.use('/:bookingId', (req, res, next) => {
//     const path = `/api/bookings/${req.params.bookingId}`;
//     if(path !== req.originalUrl.toString()) throw new Error('Que chingaos');
//     next();
// }, goodBooking, bookingIdRouter);

// /************************
// *** bookingSpotRouter ***
// ************************/

// // Create a Booking from a Spot based on the Spot's id
// // Authe, Autho, Validation
// bookingSpotRouter.post('/', validateBooking, authentication, authorization, async (req, res) => {
//     const { spotId, currentUserId } = res.locals;
//     const booking = await Booking.createBooking(spotId, currentUserId, req.body);
//     res.json(booking);
// });

// Get all Bookings for a Spot based on the Spot's id
bookingSpotRouter.get('/', async (req, res) => {
    const { spotId } = res.locals;
    const booking = await Booking.getSpotBookings(spotId);
    res.json(booking);
});

// /**********************
// *** bookingIdRouter ***
// **********************/

// // Edit a Booking
// // Authe, Autho and Validation
// bookingIdRouter.put('/', validateBooking, authentication, authorization, async (req, res) => {
//     const { bookingId } = res.locals;
//     const booking = await Booking.editBooking(bookingId);
//     res.json(booking);
// });

// // Delete a Booking
// // Authe and Autho
// bookingIdRouter.delete('/', authentication, authorization, async (req, res) => {
//     const { bookingId } = res.locals;
//     const booking = await Booking.deleteBooking(bookingId);
//     res.json(booking);
// });

module.exports = router;