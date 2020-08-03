/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')
const passportConfig = require('../config/passport')
const router = express.Router()

const UploadCtrl = require('../controllers/uploadCtrl')


// List of all professions
router.post('/profile', passportConfig.userIsAuthenticated, UploadCtrl.profile)

router.get('/', (req, res)=> {
     res.json('HOLA');
 })


module.exports = router
