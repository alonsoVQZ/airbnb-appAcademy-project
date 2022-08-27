const router = require('express').Router();

const accountRouter = require('./accountRouter.js');
const { usersRouter } = require('./usersRouter.js');
const { spotsRouter } = require('./spotsRouter.js');
const { reviewsRouter } = require('./reviewsRouter.js');
const { bookingsRouter } = require('./bookingsRouter.js');
const { imagesRouter } = require('./imagesRouter.js');

router.use('/account', accountRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);

module.exports = router;