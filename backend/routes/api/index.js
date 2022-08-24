const router = require('express').Router();

const accountRouter = require('./accountRouter.js');
const { usersRouter } = require('./usersRouter.js');
const { spotsRouter } = require('./spotsRouter.js');
const { reviewsRouter } = require('./reviewsRouter.js');

router.use('/account', accountRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;