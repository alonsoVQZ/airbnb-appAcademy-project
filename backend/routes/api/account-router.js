const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtConfig } = require('../../config');
const { authentication } = require('../../utils/auth.js')

const { secret } = jwtConfig;

router.use(authentication);

router.get('/', (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, secret).data;
    res.json( payload );
});

router.get('/spots', (req, res) => {
    // Returns all the spots owned (created) by the current user.
});

module.exports = router;