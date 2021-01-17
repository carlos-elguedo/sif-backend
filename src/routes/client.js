/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operaciones referete a los usuarios clientes
 * solicitadad a la api
 */
const express = require('express');
const passportConfig = require('../config/passport');
const router = express.Router();

const clientCtrl = require('../controllers/clientCtrl');

router.get('/', passportConfig.userIsAuthenticated, clientCtrl.getClient);

router.put('/update', passportConfig.userIsAuthenticated, clientCtrl.update);

module.exports = router;
