const { Spot, Review, Booking } = require('../db/models');

// Check if a Spot exists based on the params
const goodSpot = async (req, res, next) => {
    try {
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);
        if(!spot) throw new Error ("Spot couldn't be found");
        res.locals.spotId = spot.id;
        res.locals.resourceUserId = spot.ownerId;
        next();
    } catch(e) {
        e.status = 404;
        next(e);
    }
}

// Check if a Review exists based on the params
const goodReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findByPk(reviewId);
        if(!review) throw new Error ("Review couldn't be found");
        res.locals.reviewId = review.id;
        res.locals.resourceUserId = review.userId;
        next();
    } catch(e) {
        e.status = 404;
        next(e);
    }
}

// Check if a Booking exists based on the params
const goodBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findByPk(bookingId);
        if(!booking) throw new Error ("Booking couldn't be found");
        res.locals.bookingId = booking.id;
        res.locals.resourceUserId = booking.userId;
        next();
    } catch(e) {
        e.status = 404;
        next(e);
    }
}

module.exports = { goodSpot, goodReview, goodBooking }