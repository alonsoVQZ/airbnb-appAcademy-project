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

const authentication = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const data = jwt.verify(token, secret).data;
        res.locals.currentUserId = data.id;
        next();
    } catch(e) {
        e.message = 'Authentication required';
        e.status = 401;
        next(e);
    }
}

const authorization = (req, res, next) => {
    try {
        const { resourceUserId, currentUserId, belongsTo } = res.locals;
        console.log(res.locals)
        if(belongsTo) {
            if(currentUserId === resourceUserId) throw new Error('Forbidden');
        }
        if(currentUserId !== resourceUserId) throw new Error('Forbidden');
        next();
    } catch(e) {
        e.status = 403;
        next(e);
    }
}


module.exports = { setTokenCookie, restoreUser, authentication, authorization};