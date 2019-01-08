/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')

const router = express.Router()

const userCtrl = require('../controllers/userCtrl')

//Get all the data
router.get('/', userCtrl.test)

//Login users
router.post('/', userCtrl.login)// userCtrl.login

//Register users
router.post('/signup', userCtrl.register)

//Obtain a specific document
//router.get('/:id', providersCtrl.getProvider)

//Update a document
//router.put('/:id', providersCtrl.editProvider)

//Delete a specific document
//router.delete('/:id', providersCtrl.deleteProvider)

module.exports = router
