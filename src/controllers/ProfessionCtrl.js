/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

const Category = require('../models/ProfessionGroup')
const Profession = require('../models/Profession')




const validator = require('../utils/validator')

//Controller to export
const ProfessionCtrl = {}



ProfessionCtrl.getProfessions = async (req, res) =>{

}


ProfessionCtrl.login = async (req, res) =>{
    

}



ProfessionCtrl.test = async (req, res) =>{

    res.json({
        status: "Llego al test",
    })

}



module.exports = ProfessionCtrl
