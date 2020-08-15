const passport = require('../../config/passport');
//const jwt = require('jwt-simple');
const { AuthenticationError } = require('apollo-server-express');

const contextBuilder = ({ req }) => {
    console.log("passport", passport)
  /* if(passport.userIsAuthenticated()){
    console.log('Esta autenticado');
  }else{
    console.log('No Esta autenticado');
  } */
  console.log('Headers ---->', req.headers);

  return {
    message: 'Hola autenticado'
  };
};

module.exports = { contextBuilder };
