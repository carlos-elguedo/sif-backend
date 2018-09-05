/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose')
const {Schema} = mongoose

const User = new Schema({
    register_name: {type: String},
    register_password: {type: String},
    register_data_register: {type: String},
    register_age: {type: Date},
    createdAt: {type: Date, default: Date.now()},
    status: {type: Boolean}
})


module.exports = mongoose.model("User", User)