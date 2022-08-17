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

const requireAuth = (req, _res, next) => {
    if (req.user) return next();
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}

const authentication = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) throw new Error();
        jwt.verify(token, secret);
        return next();
    } catch(e) {
        e.message = 'Authentication required';
        e.status = 401;
        return next({ message: e.message, statusCode: e.status });
    }
}

const authorization = (req, res, next) => {
    try {
        const { id } = jwt.verify(token, secret).data;
        if(req.params.spotId) {
            const user = User.findByPk(1, {
                include: Spots 
            })
        } else if(req.params.reviewId) {

        }
        
        return next();
    } catch(e) {
        e.message = 'Forbidden';
        e.status = 403;
        return next({ message: e.message, statusCode: e.status });
    }
}

module.exports = { setTokenCookie, restoreUser, requireAuth, authentication, authorization};