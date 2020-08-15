const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'data_register' },
    (data_register, password, done) => {
      User.findOne({ data_register }, (err, user) => {
        if (!user) {
          return done(null, false, {
            message: 'El data no existe en nuestra base de datos'
          });
        } else {
          user.correctPassword(password, (err, match) => {
            if (match) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'La contraseña no es valida'
              });
            }
          });
        }
      });
    }
  )
);

exports.userIsAuthenticated = (req, res, next) => {
  // console.log(req.headers)
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Tienes que estar logueado para acceder a este recurso');
};
