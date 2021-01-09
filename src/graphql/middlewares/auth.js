const passport = require('../../config/passport');
//const jwt = require('jwt-simple');
const { AuthenticationError } = require('apollo-server-express');

const contextBuilder = ({ req }) => {
  /* if(passport.userIsAuthenticated()){
    console.log('Esta autenticado');
  }else{
    console.log('No Esta autenticado');
  } */
  payload = {id: "121212121"}
  return {
    authInfo: payload,
    message: 'Hola autenticado'
  };
};

module.exports = { contextBuilder };
