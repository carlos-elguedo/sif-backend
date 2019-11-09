/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */
const passport = require('passport');
const User = require('../models/User')
const validator = require('../utils/validator')
const utils = require('../utils/index')

//Controller to export
const userCtrl = {}

/*Error types
    -1 No error
    1 User exists
    2 Email or password invalid
*/

userCtrl.postSingup = async (req, res, next) =>{

    const {register_name, register_data_register, register_password, register_age, register_type} = req.body
    let canSaveUser = true;

    const newUser = new User({
        name: register_name,
        data_register: register_data_register,
        password: register_password,
        age: register_age,
        type: register_type
    });
    newUser.password = await newUser.encryptPassword(register_password);
    
    
    await User.findOne({data_register: register_data_register}, (err, existUser)=>{
        if(existUser){
            return res.json({
                message: 'Ya existe un usuario con el dato suministrado',
                option: "OK",	
                type_error: 1,	
            });
        }
    });

    await newUser.save((err)=>{
        if(err){
            next(err);
        }
        req.logIn(newUser, (err)=> {
            if(err){
                next(err);
            }
            let redirect = utils.getUserType(newUser.type)
            res.json({	
                message: "Registro exitoso",	
                option: "Perfect!",	
                type_error: -1,	
                redirect: redirect
            })

        })
    });
    
}

userCtrl.postLogin = async (req, res, next) =>{
    console.log('Llego al login');
    
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.log('Error during the process', err)
        }
        console.log(user);
        if(!user){
            return res.json({	
                message: "Email o contraseña invalidos",	
                option: "OK",	
                type_error: 2
            })
        }

        req.logIn(user, (err)=>{
            if(err){
                next(err);
            }
            let redirect = utils.getUserType(user.type)
             res.json({	
                message: "Login exitoso",	
                option: "Perfect!",	
                type_error: -1,	
                redirect: redirect	
            })
        })
    })(req, res, next);
}

userCtrl.getLogOut = async (req, res) =>{
    req.logout();
    //res.send('Logout exitoso');
    res.json({	
        message: "Logout successfully",	
        option: "Perfect!",	
        type_error: -1,	
        redirect: ''	
    })
}



userCtrl.test = async (req, res) =>{

    res.json({
        status: "Llego al test",
    })

}

module.exports = userCtrl
