/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express');
const passportConfig = require('../config/passport');
const router = express.Router();


const UtilsCtrl = require('../controllers/utilsCtrl');

//Get all the data
router.get('/', UtilsCtrl.test);

// List of all professions
router.get('/userIsLogged', passportConfig.userIsAuthenticated, (req, res) => {
  if (req.user) {
    res.send('Logout exitoso');
  }
});

module.exports = router;
