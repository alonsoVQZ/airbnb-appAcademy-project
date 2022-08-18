const jwt = require('jsonwebtoken');

const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });
    return token;
};

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
        return next();
        }
        try {
        const { id } = jwtPayload.data;
        req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
        res.clearCookie('token');
        return next();
        }
        if (!req.user) res.clearCookie('token');
        return next();
    });
};

const authentication = (req, _res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) throw new Error('Authentication required');
        jwt.verify(token, secret);
        next();
    } catch(e) {
        e.status = 401;
        next(e);
    }
}

const authorization = (currentUserId, resourceUserId, belongsTo) => {
    const error = new Error('Forbidden');
    error.status = 403;
    if(!belongsTo) {
        if(currentUserId === resourceUserId) throw error;
    }
    if(currentUserId !== resourceUserId) throw error;
    return true;
}

module.exports = { setTokenCookie, restoreUser, authentication, authorization};