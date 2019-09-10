/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')
const passportConfig = require('../config/passport')
const router = express.Router()

// router.use(cors())

const UtilsCtrl = require('../controllers/UtilsCtrl.js')

//Get all the data
router.get('/', UtilsCtrl.test)


// List of all professions
router.get('/userIsLogged', passportConfig.userIsAuthenticated, (req, res)=> {
    if(req.user){
        res.send('Logout exitoso');
    }
})
// router.get('/userIsLogged', (req, res)=> {
//     res.json('hOLA PERRP');
// })


module.exports = router
