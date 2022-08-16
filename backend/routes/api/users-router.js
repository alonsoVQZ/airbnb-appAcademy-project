const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.signin({ credential, password });
    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
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