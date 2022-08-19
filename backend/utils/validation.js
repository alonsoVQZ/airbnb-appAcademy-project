const { validationResult, check } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  try {
    const validationErrors = validationResult(req);
    console.log(validationErrors)
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
  check('name', 'Name must be less than 50 characters')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('description', 'Description is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('price', 'Price per day is required')
    .exists({ checkFalsy: true })
    .notEmpty(),
  handleValidationErrors
]

module.exports = { validateSignup, validateSignin, validateSpot};