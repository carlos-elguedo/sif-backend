/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

const Category = require('../models/ProfessionGroup')
const Profession = require('../models/Profession')



//Controller to export
const ProfessionCtrl = {}



ProfessionCtrl.getProfessions = async (req, res) =>{    

}

ProfessionCtrl.getCategories = async (req, res) =>{
    const categories = await Category.find().sort({'name_es': 1})
    res.json(categories)
}


ProfessionCtrl.login = async (req, res) =>{
    

}



ProfessionCtrl.test = async (req, res) =>{

    res.json({
        status: "Llego al test",
    })

}



module.exports = ProfessionCtrl
