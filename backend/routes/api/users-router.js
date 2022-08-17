const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
    try {
        const { credential, password } = req.body;
        // if(!credential || !password) throw new Error('Validation error');
        const user = await User.signin({ credential, password });
        // if (!user) throw new Error();
        setTokenCookie(res, user);
        return res.json(user);
    } catch(e) {
        return next(e.message)
        // if(e.message === 'Validation error') {
        //     e.status = 400;
        //     return next({
        //         message: e.message,
        //         statusCode: e.status,
        //         errors: {
        //             credential: "Email or username is required",
        //             password: "Password is required"
        //         }
        //     });
        // } else if(e.message === 'Invalid credentials') {
        //     e.status = 401;
        //     return next({
        //         message: e.message,
        //         statusCode: e.status,
        //     })
        // }
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const user = await User.signup({ firstName, lastName, username, email, password });
        setTokenCookie(res, user);
        return res.json(user);
    } catch (e) {
        return next(e)
    }
});

router.delete('/signout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Singed Out' });
});

module.exports = router;