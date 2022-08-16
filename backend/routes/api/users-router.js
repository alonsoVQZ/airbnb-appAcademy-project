const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
    const { credential, password } = req.body;
    if(!credential || !password) {
        const err = new Error('Validation error');
        err.status = 400;
        err.title = 'Validation error';
        err.errors = ['Email or username is required', 'Password is required'];
        return next(err);
    }
    const user = await User.signin({ credential, password });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Invalid Credentials';
      return next(err);
    }
    await setTokenCookie(res, user);
    return res.json({ user });
});

router.post('/signup', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, username, email, password });
    await setTokenCookie(res, user);
    return res.json({ user });
});

router.delete('/signout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Singed Out' });
});

module.exports = router;