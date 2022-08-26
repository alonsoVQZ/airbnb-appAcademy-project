const bookingsRouter = require('express').Router();
const bookingByIdRouter = require('express').Router();
const spotBookingsRouter = require('express').Router();
const accountBookingsRouter = require('express').Router();

const { Booking } = require('../../db/models');
const { authentication, authorization, authorizationReversed } = require('../../utils/auth.js');
const { validateBooking } = require('../../utils/validation.js');
const { goodBooking } = require('../../utils/resources-check.js');


/*** bookingsRouter ***/

// Midleware to bookingByIdRouter
bookingsRouter.use('/:bookingId', goodBooking, bookingByIdRouter);


/*** bookingByIdRouter ***/

// Edit a Booking
bookingByIdRouter.put('/', validateBooking, authentication, authorization, async (req, res) => {
    const { bookingId } = res.locals;
    const bookingForm = req.body;
    const booking = await Booking.editBooking(bookingId, bookingForm);
    res.json(booking);
});

// Delete a Booking
bookingByIdRouter.delete('/', authentication, authorization, async (req, res) => {
    const { bookingId } = res.locals;
    await Booking.deleteBooking(bookingId);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});


/*** spotBookingsRouter ***/

// Get all Bookings for a Spot based on the Spot's id
spotBookingsRouter.get('/', authentication, async (req, res) => {
    const owner = (idRes, id2Curr) => idRes === id2Curr ? true : false;
    const { spotId, resourceUserId, currentUserId } = res.locals;
    const bookings = await Booking.getSpotBookings(spotId, owner(resourceUserId, currentUserId));
    res.json({ Bookings: bookings });
});

// Create a Booking from a Spot based on the Spot's id
spotBookingsRouter.post('/', validateBooking, authentication, authorizationReversed, async (req, res) => {
    const { spotId, currentUserId } = res.locals;
    const bookingForm = req.body;
    const booking = await Booking.createBooking(spotId, currentUserId, bookingForm);
    res.json(booking);
});


/*** accountBookingsRouter ***/

// Get all of the Current User's Bookings
accountBookingsRouter.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    const bookings = await Booking.getCurrentUserBookings(currentUserId);
    res.json({ Bookings: bookings });
});


module.exports = { bookingsRouter, spotBookingsRouter, accountBookingsRouter };