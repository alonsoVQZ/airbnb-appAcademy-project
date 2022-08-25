const { validationResult, check } = require('express-validator');
const { Spot, Review, Booking, Image } = require('../db/models');

const handleValidationErrors = (req, _res, next) => {
  try {
    const validationErrors = validationResult(req);
    const errorsObject = new Object();
    if (!validationErrors.isEmpty()) {
      validationErrors
        .array()
        .forEach((error) => {
          if(!errorsObject[error.param]) errorsObject[error.param] = error.msg
        });
      const error = Error('Validation error');
      error.errors = errorsObject;
      error.status = 400;
      throw error;
    }
    next();
  } catch(e) {
    next(e);
  }
};

// Check if a Spot exists based on the params
const checkSpotId = async (req, res, next) => {
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
const checkReviewId = async (req, res, next) => {
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
const checkBookingId = async (req, res, next) => {
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

// Check if a Image exists based on the params
const checkImageId = async (req, res, next) => {
  try {
      const { imageId } = req.params;
      const image = await Image.findByPk(imageId);
      if(!image) throw new Error ("Image couldn't be found");
      res.locals.imageId = image.id;
      res.locals.resourceType = image.imageableType;
      next();
  } catch(e) {
      e.status = 404;
      next(e);
  }
}

const validateSignup = [
  check('email', 'Invalid email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isEmail(),
  check('username', 'Username is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('firstName', 'First Name is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('lastName', 'Last Name is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  handleValidationErrors
];

const validateSignin = [
  check('credential', 'Email or username is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('password', 'Password is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  handleValidationErrors
];

const validateSpot = [
  check('address', 'Street address is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('city', 'City is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('state', 'State is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('country', 'Country is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('lat', 'Latitude is not valid')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDecimal(),
  check('lng', 'Longitude is not valid')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDecimal(),
  check('name', 'Name is required')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description', 'Description is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('price', 'Price per day is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  handleValidationErrors
]

const validateImage = [
  check('url', 'URL is required')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage('URL is not valid'),
  handleValidationErrors
];

const validateReview = [
  check('review', 'Review text is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('stars', 'Stars must be an integer from 1 to 5')
    .exists({ checkFalsy: true })
    .isInt({ min: 0, max: 5 }),
  handleValidationErrors
];

const validateBooking = [
  check('startDate', 'startDate Date is required')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDate()
    .withMessage('startDate not valid')
    .custom((startDateString, { req }) => {
      const todayDate = new Date(Date.now()).toDateString();
      const startDate = new Date(startDateString)
      startDate.setDate(startDate.getDate() + 1);
      if(new Date(startDate) < new Date(todayDate)) {
        throw new Error("startDate cannot come before today's Date");
      }
      return true;
    }),
  check('endDate', 'endDate is required')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDate()
    .withMessage('endDate not valid')
    .custom((endDateString, { req }) => {
      const endDate = new Date(endDateString);
      const startDate = new Date(req.body.startDate)
      if (endDate <= startDate) {
        throw new Error('endDate cannot come before startDate');
      }
      return true;
    }),
  handleValidationErrors
];



module.exports = { 
  validateSignup,
  validateSignin,
  validateSpot,
  validateReview,
  validateBooking,
  validateImage,
  checkSpotId,
  checkReviewId,
  checkBookingId,
  checkImageId
};