const { validationResult, check } = require('express-validator');

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


module.exports = { validateSignup, validateSignin, validateSpot, validateImage, validateReview };