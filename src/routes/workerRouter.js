/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operaciones referete a los usuarios trabajadores solicitadad a la api
 */
const express = require('express')
const passportConfig = require('../config/passport')
const router = express.Router()


const WorkerCtrl = require('../controllers/WorkerCtrl.js')

// List of all professions
router.get('/', passportConfig.userIsAuthenticated, (req, res)=> {
    res.json(req.user);
})


module.exports = router
