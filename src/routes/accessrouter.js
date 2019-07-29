/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')
const passport = require('passport')
const passportConfig = require('../config/passport')


const router = express.Router()

// router.use(cors())

const userCtrl = require('../controllers/userCtrl')

//Get all the data
router.get('/', userCtrl.test)



router.post('/', userCtrl.postLogin)


//Register users
router.post('/signup', userCtrl.postSingup, (err)=>{console.log('Ha ocurrido un error: ', err)})

router.get('/logout', passportConfig.userIsAuthenticated, userCtrl.getLogOut)

router.get('/info', passportConfig.userIsAuthenticated, (req, res)=> {
    res.json(req.user);
})

//Obtain a specific document
//router.get('/:id', providersCtrl.getProvider)

//Update a document
//router.put('/:id', providersCtrl.editProvider)

//Delete a specific document
//router.delete('/:id', providersCtrl.deleteProvider)

module.exports = router
