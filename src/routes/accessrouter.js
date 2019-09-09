/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')
const passport = require('passport')
const passportConfig = require('../config/passport')
const cors = require('cors')

const router = express.Router()

// router.use(cors())

const userCtrl = require('../controllers/userCtrl')

//Get all the data
router.get('/', userCtrl.test)



router.post('/', userCtrl.postLogin)


//Register users
router.post('/signup', userCtrl.postSingup, (err)=>{console.log('Ha ocurrido un error: ', err)})

router.get('/logout', passportConfig.userIsAuthenticated, userCtrl.getLogOut)

// router.options('/info', cors());

router.get('/info', passportConfig.userIsAuthenticated, (req, res)=> {
    res.json(req.user);
})

module.exports = router
