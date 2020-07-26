/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operaciones referete a los usuarios trabajadores solicitadad a la api
 */
const express = require('express');
const passportConfig = require('../config/passport');
const router = express.Router();

const WorkerCtrl = require('../controllers/workerCtrl');

//Update profile
router.put('/update', passportConfig.userIsAuthenticated, WorkerCtrl.update);

router.get('/', passportConfig.userIsAuthenticated, WorkerCtrl.getWorker);

module.exports = router;
