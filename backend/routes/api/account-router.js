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
    // Get all spots by the current user
    // Authe
});

module.exports = router;