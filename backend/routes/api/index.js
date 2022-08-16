const router = require('express').Router();

const usersRouter = require('./users-router.js');
const accountRouter = require('./account-router.js');
const spotsRouter = require('./spots-router.js');
const reviewsRouter = require('./reviews-router.js');
const bookingsRouter = require('./bookings-router.js');
const imagesRouter = require('./images-router.js');

router.use('/users', usersRouter);
router.use('/account', accountRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);

router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});



module.exports = router;