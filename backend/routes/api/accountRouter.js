const router = require('express').Router();

const { authentication } = require('../../utils/auth.js');
const { accountSpotsRouter } = require('./spotsRouter.js');
const { accountUserRouter } = require('./usersRouter.js');
const { accountReviewsRouter } = require('./reviewsRouter.js');
const { accountBookingsRouter } = require('./bookingsRouter.js');

router.use(authentication);

router.use('/', accountUserRouter);

router.use('/spots', accountSpotsRouter);

router.use('/reviews', accountReviewsRouter);

router.use('/bookings', accountBookingsRouter);

module.exports = router;