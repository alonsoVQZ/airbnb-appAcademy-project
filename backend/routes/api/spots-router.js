const router = require('express').Router();

const { authentication } = require('../../utils/auth.js')

router.delete('/:spotId', authentication, (req, res) => {
});

module.exports = router;