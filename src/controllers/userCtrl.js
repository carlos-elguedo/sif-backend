/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */
const passport = require('passport');

const User = require('../models/User')

const validator = require('../utils/validator')

//Controller to export
const userCtrl = {}



userCtrl.register = async (req, res) =>{


    //console.log("validador: " + validator.verifiUserToRegister(req.body))
    // console.log(req.body);
    //we carry out a validation of the data received to give an answaer according to data received
    switch(validator.verifiUserToRegister(req.body)){

        //Info empty
        case 0:
            res.json({
                message: "Por favor llena todos los datos",
                option: "Aceptar",
                type_error: 0,
                req: req.body
            })
        break;

        //Size minimum
        case 1:
            res.json({
                message: "Algunos datos no superan el minimo requerido",
                option: "Aceptar",
                type_error: 1,
                req: req.body
            })
        break;

        //Email or number phone incorrect
        case 2:
            res.json({
                message: "El correo electronico o numero telefonico sumistrado es incorrecto",
                option: "Aceptar",
                type_error: 2
            })
        break;


        /**
         * Correct info
         */

        //Data correct, ready for register with email or number phone

        case 10:
        case 11:

            const {register_name, register_data_register, register_password, register_age, register_type} = req.body

            console.log("User to register: ", register_data_register)
            await User.findOne({data_register: register_data_register}, async (error, data)=>{
                if(error){
                    console.error(error)
                }else{

                    if(data == null){
                        const userToRegister = new User({
                                                        name: register_name,
                                                        data_register: register_data_register,
                                                        password: register_password,
                                                        age: register_age,
                                                        type: register_type})
                        userToRegister.password = await userToRegister.encryptPassword(register_password);
                        await userToRegister.save()
                        console.log("\n\nRegistro añadido");
                        res.json({
                            message: "Registro correcto",
                            option: "Grandioso!",
                            type_error: -1
                            //Redirect
                        })
                    }else{
                        console.log(data)
                        res.json({
                            message: "Hay un registro con el correo electronico o numero telefonico sumistrado",
                            option: "Aceptar",
                            type_error: 9
                        })
                    }
                }
            })
        break;


        //Default
        default:
            res.json({
                message: "Vuelve a intentarlo por favor",
                type_error: 99
            })
        break;


    }//End the switch
}







userCtrl.login = passport.authenticate('local', {
  successRedirect: 'http://localhost:3000/home',
  failureRedirect: 'http://localhost:3000/',
  failureFlash: true
})
// userCtrl.login = async (req, res) =>{
//
//     console.log(req.body);
//     //we carry out a validation of the data received to give an answaer according to data received
//     switch(validator.verifiUserToLogin(req.body)){
//
//         //Info empty
//         case 0:
//             res.json({
//                 message: "Por favor llena todos los datos",
//                 option: "Aceptar",
//                 type_error: 0,
//                 req: req.body
//
//             })
//         break;
//
//         //Size minimum
//         case 1:
//             res.json({
//                 message: "Algunos datos no superan el minimo requerido",
//                 option: "Aceptar",
//                 type_error: 1
//             })
//         break;
//
//         //Email or number phone incorrect
//         case 2:
//             res.json({
//                 message: "El correo electronico o numero telefonico sumistrado es incorrecto",
//                 option: "Aceptar",
//                 type_error: 2
//             })
//         break;
//
//
//         /**
//          * Correct info
//          */
//
//         //Data correct, ready for register with email or number phone
//
//         case 10:
//         case 11:
//             const {login_data, login_password} = req.body
//             await User.find({
//                 $and:[
//                     {data_register: login_data},
//                     {password: login_password}
//                 ]
//             }, (error, data)=>{
//                     if(error){
//                         console.error(error)
//                     }else{
//                         const jsonData = JSON.stringify(data)
//                         console.log(jsonData)
//                         if(data.length == 0){
//                             res.json({
//                                 message: "El usuario no existe registrado",
//                                 option: "OK",
//                                 type_error: 9
//                             })
//                         }else{
//                             //login correct
//
//                             //Search the user type
//                             //const userType = data.register_type;
//
//                             res.json({
//                                 message: "Login exitoso",
//                                 option: "Perfect!",
//                                 type_error: -1,
//                                 user: jsonData
//                             })
//                         }
//                     }
//                 })
//         break;
//
//
//         //Default
//         default:
//             res.json({
//                 message: "Vuelve a intentarlo por favor",
//                 type_error: 99
//             })
//         break;
//
//
//     }//End the switch
//
// }


userCtrl.test = async (req, res) =>{

    res.json({
        status: "Llego al test",
    })

}

/*

//To receive the GET operations, to find all the data
userCtrl.getProviders = async (req, res) =>{
    const providers = await Provider.find()
    res.json(providers)
}


//To create new documents POST
userCtrl.createProvider = async (req, res) =>{
    //A new provider is defined based on the parameters received
    const newProvider = new Provider(req.body)
    //The new document is saved
    newProvider.save();
    //An answer message is sent
    res.json({
        status: "Provider save"
    })
}





//To obtain a specific document
userCtrl.getProvider = async (req, res) =>{
    const provider = await Provider.findById(req.params.id)
    res.json(provider)
}


//To edit a document PUT
userCtrl.editProvider = async (req, res) =>{
    //you get the id of the parameter received
    const {id} = req.params

    //A new document is defined based on the received
    const provider = {
        address: req.body.address,
        city: req.body.city,
        document: req.body.document,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        specialty: req.body.specialty,
        status: req.body.status,
    }

    //The document is found and updated GET
    await Provider.findByIdAndUpdate(id, {$set: provider}, {new: true})
    //A confirmation message was returned
    res.json({
        status: 'Providers update'
    })
}


//To delete a specific document DELETE
userCtrl.deleteProvider = async (req, res) =>{
    //It finds and removes the document to be deleted
    await Provider.findByIdAndRemove(req.params.id)
    //A confirmation message was returned
    res.json({status: "Provider Delete"})
}
*/


module.exports = userCtrl
