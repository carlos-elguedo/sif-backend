const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User');



passport.use(new LocalStrategy({
                                usernameField: 'data_register'
                              },
                              async (data_register, password, done) => {

            console.log("Passsssssssssssssssssssssssssssssssssss")
            // Match Email's User
            const user = await User1.findOne({data_register: data_register});
            if (!user) {
              return done(null, false, { message: 'Not User found.' });
            } else {
              // Match Password's User
              const match = await user.correctPassword(password);
              if(match) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Incorrect Password.' });
              }
            }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
