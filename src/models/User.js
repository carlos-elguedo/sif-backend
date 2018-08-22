/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose')
const {Schema} = mongoose

const User = new Schema({
    email: {type: String},
    password: {type: String},
    city: {type: String},
    createdAt: {type: Date, default: Date.now()},
    tellephone: {type: String},
    status: {type: String}
})


module.exports = mongoose.model("User", User)