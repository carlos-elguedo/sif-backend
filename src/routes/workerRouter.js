/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operaciones referete a los usuarios trabajadores solicitadad a la api
 */
const express = require('express')
const passportConfig = require('../config/passport')
const router = express.Router()


const WorkerCtrl = require('../controllers/WorkerCtrl.js')

//Update profile
router.put('/update', passportConfig.userIsAuthenticated, WorkerCtrl.update)


module.exports = router
