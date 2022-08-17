const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtConfig } = require('../../config');
const { authentication } = require('../../utils/auth.js')

const { secret } = jwtConfig;

router.get('/', authentication, (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, secret).data;
    res.json( payload );
});

module.exports = router;