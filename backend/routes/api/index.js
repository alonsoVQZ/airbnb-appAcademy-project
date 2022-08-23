const router = require('express').Router();

const usersRouter = require('./users-router.js');
const accountRouter = require('./account-router.js');
const spotsRouter = require('./spots-router.js');
const reviewsRouter = require('./reviews-router.js');

router.use('/users', usersRouter);
router.use('/account', accountRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);

// router.get("/csrf/restore", (req, res) => {
//     const csrfToken = req.csrfToken();
//     res.cookie("XSRF-TOKEN", csrfToken);
//     res.status(200).json({
//         'XSRF-Token': csrfToken
//     });
// });

module.exports = router;