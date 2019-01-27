/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de establecer la ruta para realizar la operacion solicitadad a la api
 */
const express = require('express')

const router = express.Router()

// router.use(cors())

const ProfessionCtrl = require('../controllers/ProfessionCtrl')

//Get all the data
router.get('/', ProfessionCtrl.test)



router.post('/all', ProfessionCtrl.getProfessions)


//Register users
// router.post('/signup', ProfessionCtrl.register)

module.exports = router
