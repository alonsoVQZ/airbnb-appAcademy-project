const express = require('express');

const { setTokenCookie } = require('../../utils/auth.js');
const { validateSignup, validateSignin } = require('../../utils/validation.js');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/signup', validateSignup, async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const user = await User.signup({ firstName, lastName, username, email, password });
        const token = setTokenCookie(res, user);
        return res.json(user.toSafeObject(token));
    } catch (e) {
        if(e.name === 'SequelizeUniqueConstraintError') {
            e.status = 403;
            e.message = 'User already exists';
            e.errors.forEach((error) => error.message = `User with that ${error.path} already exists`);
            next(e);
        }
    }
});

router.post('/signin', validateSignin, async (req, res, next) => {
    try {
        const { credential, password } = req.body;
        const user = await User.signin({ credential, password });
        if (!user) throw new Error('Invalid credentials');
        const token = setTokenCookie(res, user);
        res.json(user.toSafeObject(token));
    } catch(e) {
        e.status = 401;
        next(e)
    }
});

router.delete('/signout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Singed Out' });
});

module.exports = router;