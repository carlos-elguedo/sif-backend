const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User');


passport.serializeUser((user, done)=> {
  done(null, user._id);
});


passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    done(err, user);
  })
});

passport.use(new LocalStrategy (
  {usernameField: 'data_register'},
  (data_register, password, done) => {
    User.findOne({data_register}, (err, user)=>{
      if(!user){
        return done(null, false, {message: 'El data no existe en nuestra base de datos'});
      }else{
        user.correctPassword(password, (err, match)=>{
          if(match){
            return done(null, user)
          }else{
            return done(null, false, {message: 'La contraseña no es valida'});
          }
        });
      }
    })
  }
));


exports.userIsAuthenticated = (req, res, next) =>{
  console.log(req.headers)
  if(req.isAuthenticated()){
    return next();
  }
  res.status(401).send('Tienes que estar logueado para acceder a este recurso');
}

// passport.use(new LocalStrategy({usernameField: 'data_register'}, async (data_register, password, done) => {

//             console.log("Passsssssssssssssssssssssssssssssssssss")
//             // Match Email's User
//             const user = await User1.findOne({data_register: data_register});
//             if (!user) {
//               console.log('Error buscando en base de datos');
//               return done(null, false, { message: 'Not User found.' });
//             } else {
//               // Match Password's User
//               const match = await user.correctPassword(password);
//               if(match) {
//                 return done(null, user);
//               } else {
//                 return done(null, false, { message: 'Incorrect Password.' });
//               }
//             }

// }));

// passport.use(new LocalStrategy(
//   function(username, password, done){
//     User.findOne({data_register: username}, function (err, user){
//       console.log('Llegoooooooooooooooooooooooooooooooooooooooooooooooooo')
//       if(err){ return done(err)}
//       if(!user){ return done(null, false)}
//       if(!user.correctPassword(password)){ return done(null, false)}
//       return done(null, user)
//     })
//   }
// ))

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
