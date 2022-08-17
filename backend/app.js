require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError, EmptyResultError } = require('sequelize');

const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}
  
app.use(
    helmet.crossOriginResourcePolicy({ 
        policy: "cross-origin" 
    })
);

// app.use(
//     csurf({
//         cookie: {
//         secure: isProduction,
//         sameSite: isProduction && "Lax",
//         httpOnly: true
//         }
//     })
// );

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError || err instanceof EmptyResultError) {
        const errors = {};
        err.errors.forEach((e) => errors[e.path] = e.message);
        err.errors = errors;
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json(err)
});

module.exports = app;