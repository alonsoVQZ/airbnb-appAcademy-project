const accountUserRouter = require('express').Router();
const usersRouter = require('express').Router();

const { User } = require('../../db/models')
const { setTokenCookie } = require('../../utils/auth.js');
const { validateSignup, validateSignin } = require('../../utils/validation.js');

/*** usersRouter ***/

// Logs in a current user with valid credentials and returns the current user's information.
usersRouter.post('/signin', validateSignin, async (req, res, next) => {
    try {

        const { credential, password } = req.body;
        const user = await User.signin({ credential, password });
        const token = setTokenCookie(res, user);
        user.dataValues.token = token;
        res.json(user);
    } catch(e) {
        next(e)
    }
});

// Creates a new user, logs them in as the current user, and returns the current user's information.
usersRouter.post('/signup', validateSignup, async (req, res) => {
    const userForm = req.body;
        const user = await User.signup(userForm);
        const token = setTokenCookie(res, user);
        user.dataValues.token = token;
        res.json(user);
});

// Logs out current user
usersRouter.delete('/signout', async (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Singed Out' });
});


/*** accountUserRouter ***/

// Get the Current User Information
accountUserRouter.get('/', async (req, res) => {
    const { currentUserId } = res.locals;
    res.json(await User.scope("safeData").findByPk(currentUserId));
});


module.exports = { usersRouter, accountUserRouter };