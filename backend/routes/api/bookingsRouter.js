const bookingsRouter = require('express').Router();
const bookingByIdRouter = require('express').Router();
const spotBookingsRouter = require('express').Router();
const accountBookingsRouter = require('express').Router();

const { Booking } = require('../../db/models');
const { authentication, authorization } = require('../../utils/auth.js');
const { validateBooking } = require('../../utils/validation.js');
const { goodBooking } = require('../../utils/resources-check.js');


/*** bookingsRouter ***/

// Midleware to bookingByIdRouter
bookingsRouter.use('/:bookingId', goodBooking, bookingByIdRouter);


/*** bookingByIdRouter ***/

// Edit a Booking
bookingByIdRouter.put('/', (req, res) => {

});

// Delete a Booking
bookingByIdRouter.delete('/', (req, res) => {

});


/*** spotBookingsRouter ***/

// Get all Bookings for a Spot based on the Spot's id
spotBookingsRouter.get('/', (req, res) => {

});

// Create a Booking from a Spot based on the Spot's id
spotBookingsRouter.post('/', (req, res) => {

});


/*** accountBookingsRouter ***/

// Get all of the Current User's Bookings
accountBookingsRouter.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    const bookings = await Booking.getCurrentUserBookings(currentUserId);
    res.json({ Bookings: bookings });
});


module.exports = { bookingsRouter, spotBookingsRouter, accountBookingsRouter };