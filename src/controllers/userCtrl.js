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

userCtrl.postSingup = async (req, res, next) =>{

    const {register_name, register_data_register, register_password, register_age, register_type} = req.body

    const newUser = new User({
        name: register_name,
        data_register: register_data_register,
        password: register_password,
        age: register_age,
        type: register_type
    });
    newUser.password = await newUser.encryptPassword(register_password);
    
    
    User.findOne({data_register: register_data_register}, (err, existUser)=>{
        if(existUser){
            return res.status(400).send('Ya existe un usuario con el dato suministrado');
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
            res.send('Usuario creado exitosamente')
        })
    });
}

userCtrl.postLogin = async (req, res, next) =>{
    
    passport.authenticate('local', (err, user, info)=>{
        
        if(err){
            next(err);
        }
        if(!user){
            return res.status(400).send('Email o contraseña no validos desde el controller');
        }

        req.logIn(user, (err)=>{
            if(err){
                next(err);
            }
            console.log('Passo login ', user)
            res.send('Login exitoso');
        })
    })(req, res, next);
}

userCtrl.getLogOut = async (req, res) =>{
    req.logout();
    res.send('Logout exitoso');
}



userCtrl.test = async (req, res) =>{

    res.json({
        status: "Llego al test",
    })

}

module.exports = userCtrl
