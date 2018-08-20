/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')
const router = express.Router()
const providersCtrl = require('../controllers/providersCtrl')

//Get all the data
router.get('/', providersCtrl.getProviders)
//Create a new document
router.post('/', providersCtrl.createProvider)
//Obtain a specific document
router.get('/:id', providersCtrl.getProvider)
//Update a document
router.put('/:id', providersCtrl.editProvider)
//Delete a specific document
router.delete('/:id', providersCtrl.deleteProvider)

module.exports = router